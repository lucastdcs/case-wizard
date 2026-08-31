// src/modules/email/email-automation.js
import { showToast } from '../shared/utils.js';
import { getPageData } from '../shared/page-data.js';
import { getAgentName } from '../shared/page-data.js';
import { esperar, simularCliqueReal } from '../shared/dom-utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { getLanguage } from '../shared/i18n.js';
import { Z } from '../shared/z-layers.js';

const EAS_DICT = {
    pt: {
        emailButtonNotFound: "Erro: Botão de email não encontrado.",
        clearingOldDraft: "Limpando rascunho antigo...",
        editorNotLoaded: "Erro: Editor não carregou.",
        cannedResponseApplied: "Canned Response aplicada!",
        cannedResponseTimeout: (name) => `Timeout: Template '${name}' não carregou.`,
        cannedResponseButtonNotFound: "Botão Canned Response não encontrado.",
        emailFilledSuccess: "Email preenchido com sucesso!",
        editorFocusError: "Erro ao focar no editor.",
        // Fallbacks que entram no CORPO do e-mail quando o scraping não
        // encontra o dado — por isso seguem o idioma, não são só UI.
        fallbackClient: "Cliente",
        fallbackSite: "seu site",
    },
    es: {
        emailButtonNotFound: "Error: Botón de email no encontrado.",
        clearingOldDraft: "Limpiando borrador antiguo...",
        editorNotLoaded: "Error: El editor no cargó.",
        cannedResponseApplied: "¡Canned Response aplicada!",
        cannedResponseTimeout: (name) => `Tiempo agotado: la plantilla '${name}' no cargó.`,
        cannedResponseButtonNotFound: "Botón Canned Response no encontrado.",
        emailFilledSuccess: "¡Email completado con éxito!",
        editorFocusError: "Error al enfocar el editor.",
        fallbackClient: "Cliente",
        fallbackSite: "su sitio",
    },
};
function eat(key) {
    const lang = getLanguage();
    return EAS_DICT[lang]?.[key] ?? EAS_DICT.pt[key];
}

// --- UTILITÁRIOS ---
function log(msg, type = 'info') {
    const styles = {
        info: 'background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;',
        warn: 'background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;',
        error: 'background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;',
        success: 'background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;'
    };
    console.log(`%c[EMAIL-BOT] ${msg}`, styles[type] || styles.info);
}

// --- UTILITÁRIO: POPUP DE ALERTA (Google Style) ---
function createFloatingWarning(targetElement, message) {
    if (!targetElement) return;

    // Remove alerta anterior do mesmo elemento
    const existingId = `cw-warning-${targetElement.id || Math.random().toString(36).substr(2, 9)}`;
    const old = document.getElementById(existingId);
    if (old) old.remove();

    const rect = targetElement.getBoundingClientRect();

    const popup = document.createElement('div');
    popup.id = existingId;
    
    popup.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 8}px;
        left: ${rect.left}px;
        min-width: 300px;
        max-width: 400px;
        background: #ffffff;
        border-left: 4px solid #F9AB00;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 12px 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        z-index: ${Z.TOAST};
        font-family: 'Google Sans', Roboto, sans-serif;
        font-size: 13px;
        color: #202124;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: auto;
    `;

    popup.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">⚠️</span>
            <span style="line-height:1.4;">${message}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">×</div>
    `;

    const closeBtn = popup.querySelector('.cw-close-btn');
    closeBtn.onclick = () => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(-5px)';
        setTimeout(() => popup.remove(), 300);
    };

    document.body.appendChild(popup);

    requestAnimationFrame(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translateY(0)';
    });
    
    // Auto-remove após 25s
    setTimeout(() => { if(document.body.contains(popup)) closeBtn.click(); }, 25000);
}

// --- UTILITÁRIO: PREENCHER CAMPO DE EMAIL (CHIP) ---
async function fillField(inputElement, value) {
    if (!inputElement || !value) return;

    inputElement.focus();
    
    // Limpeza
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    await esperar(50);

    // Inserção
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(inputElement, value);
    
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    
    await esperar(100);

    // Enter para criar o Chip
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));
}

function getVisibleEditor() {
    const todos = Array.from(document.querySelectorAll('[id="email-body-content-top-content"]'));
    const editor = todos.find(el => {
        const isVisible = el.offsetParent !== null;
        const isReadOnly = el.closest('case-message-view') !== null;
        const isEditable = el.closest('.editor') !== null || el.closest('write-card') !== null;
        return isVisible && !isReadOnly && isEditable;
    });
    if (editor) log("Editor visualmente detectado.", 'success');
    return editor;
}

// --- NOVA UI DO CRM: SPEED DIAL -> COMPOSE ---
// A atualização da interface escondeu o botão de e-mail atrás de um speed dial:
// primeiro o "+ Open" (#action-bar-speed-dial-container) e depois o mini-fab de
// envelope (material-button.compose) no menu que abre.

// offsetParent sozinho não serve aqui: o menu do speed dial flutua com
// position:fixed, o que zera offsetParent mesmo com o botão visível na tela.
const estaVisivel = (el) =>
    !!el && el.getClientRects().length > 0 && el.getAttribute('aria-disabled') !== 'true';

// Poll no DOM em vez de um delay fixo: a duração da animação do menu varia com a
// carga da página, então esperamos o botão existir de fato (com teto de tempo).
async function esperarPor(buscar, { timeout = 3000, intervalo = 100 } = {}) {
    const limite = Date.now() + timeout;
    while (Date.now() < limite) {
        const alvo = buscar();
        if (alvo) return alvo;
        await esperar(intervalo);
    }
    return null;
}

// Escopo restrito ao menu do speed dial, para não clicar por engano em algum
// outro ícone "email" que exista na página.
function acharBotaoCompose() {
    const candidatos = Array.from(document.querySelectorAll(
        'material-button.compose, material-button.speed-dial-mini-fab[role="menuitem"]'
    ));
    const porClasse = candidatos.find(el => el.classList.contains('compose') && estaVisivel(el));
    if (porClasse) return porClasse;

    // Se a classe .compose sumir numa próxima atualização, ancoramos na ligadura
    // do ícone, que é o que o usuário de fato enxerga.
    return candidatos.find(el => {
        const icone = el.querySelector('i.material-icons-extended');
        return estaVisivel(el) && icone && icone.textContent.trim() === 'email';
    }) || null;
}

async function openEmailComposer() {
    try {
        // Idempotente: se o menu já estiver aberto, reclicar o speed dial o
        // fecharia. Por isso checamos o Compose antes de tocar no "+ Open".
        let compose = acharBotaoCompose();

        if (compose) {
            log("Menu do speed dial já estava aberto.");
        } else {
            const speedDial =
                document.querySelector('#action-bar-speed-dial-container material-button') ||
                document.querySelector('material-button.action-bar-speed-dial-button');

            if (!estaVisivel(speedDial)) {
                log("Speed dial (+ Open) não encontrado.", 'warn');
                return false;
            }

            log("Speed dial (+ Open) encontrado. Abrindo o menu...");
            simularCliqueReal(speedDial);
            await esperar(350);
            compose = await esperarPor(acharBotaoCompose, { timeout: 3000 });
        }

        if (!compose) {
            log("Menu abriu, mas o botão Compose não apareceu.", 'warn');
            return false;
        }

        await esperar(120);
        simularCliqueReal(compose);
        log("Compose clicado via speed dial.", 'success');
        return true;
    } catch (erro) {
        // Falha silenciosa: o caminho manual continua disponível pro usuário.
        log(`Falha no speed dial: ${erro.message}`, 'error');
        return false;
    }
}

// Caminho antigo, mantido como plano B enquanto as duas interfaces convivem:
// em algumas telas o envelope ainda fica solto na action bar.
function clicarBotaoEmailDireto() {
    const icones = Array.from(document.querySelectorAll('i.material-icons-extended'));
    const iconeEmail = icones.find(el => el.innerText.trim() === 'email' && el.offsetParent !== null);
    if (!iconeEmail) return false;

    log("Botão de email direto encontrado.");
    const botaoAlvo = iconeEmail.closest('material-button') || iconeEmail.closest('material-fab') || iconeEmail;
    simularCliqueReal(botaoAlvo);
    return true;
}

// --- CORE: ABRIR E LIMPAR ---
async function openAndClearEmail() {
    log("🚀 FASE 1: Tentando abrir a janela de email...");

    // O speed dial vem primeiro: é o fluxo da UI nova do CRM. O botão direto fica
    // como plano B para as telas que ainda não migraram.
    let emailAberto = await openEmailComposer();

    if (!emailAberto) {
        log("Speed dial indisponível. Tentando o botão de email direto...", 'warn');
        emailAberto = clicarBotaoEmailDireto();
    }

    if (!emailAberto) {
        SoundManager.playError();
        showToast(eat('emailButtonNotFound'), { error: true });
        return false;
    }
    
    log("🚀 FASE 2: Verificando rascunhos...");
    let draftButton = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 20;

    while (attempts < MAX_ATTEMPTS) {
        await esperar(250);
        const candidates = document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');
        draftButton = Array.from(candidates).find(el => el.offsetParent !== null);    
        if (draftButton) {
            log(`⚠️ Rascunho detectado!`, 'warn');
            break;
        }
        attempts++;
    }

    if (draftButton) {
        log("🗑️ Descartando...");
        simularCliqueReal(draftButton);
        draftButton.click();

        let confirmBtn = null;
        let confirmAttempts = 0;
        
        while (confirmAttempts < 15) {
            await esperar(300);
            const confirms = document.querySelectorAll('material-button[debug-id="confirm-button"]');
            confirmBtn = Array.from(confirms).find(el => el.offsetParent !== null);
            if (confirmBtn) break;
            confirmAttempts++;
        }

        if (confirmBtn) {
            simularCliqueReal(confirmBtn);
            showToast(eat('clearingOldDraft'), { duration: 2000 });
            await esperar(2500); 
        }
    }

    log("🚀 FASE 3: Buscando editor final...");
    let tentativasEditor = 0;
    let editorVisivel = null;
    
    while (tentativasEditor < 20) {
        editorVisivel = getVisibleEditor();
        if (editorVisivel) break;
        await esperar(250);
        tentativasEditor++;
    }

    if (!editorVisivel) {
        SoundManager.playError();
        showToast(eat('editorNotLoaded'), { error: true });
        return false;
    }

    const containerTopo = editorVisivel.closest('[id="email-body-content-top"]');
    const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
    const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');

    if (containerTopo) {
        if (editorPai) {
            const ancestral = editorPai.closest('[aria-hidden="true"]');
            if (ancestral) ancestral.removeAttribute('aria-hidden');
            editorPai.focus();
            simularCliqueReal(editorPai);
        }
        
        await esperar(300);

        containerTopo.innerHTML = `
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;
        
        const novoElementoSagrado = containerTopo.querySelector('#cases-body-field');
        if (novoElementoSagrado) {
            const range = document.createRange();
            range.selectNodeContents(novoElementoSagrado);
            range.collapse(true); 
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        return true; 
    }
    
    return false;
}

// --- FUNÇÕES DE APLICAÇÃO ---

export async function runEmailAutomation(cannedResponseText) {
    if (!cannedResponseText) return;

    // 1. Abre e Limpa o Email
    const emailPronto = await openAndClearEmail();
    if (!emailPronto) return;

    // 2. Coleta os Dados da Página
    const pageData = await getPageData(); 

    // ============================================================
    // 🟢 LÓGICA DE DESTINATÁRIOS
    // ============================================================
    log("📧 Processando destinatários para CR...", 'info');

    // A. Expandir Cabeçalho (CC/BCC) se necessário
    const expandBtn = document.querySelector('material-icon[aria-label="Show CC and BCC fields"]') || 
                      document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');
    if (expandBtn) {
        expandBtn.click();
        await esperar(600);
    }

    // B. Preencher TO (Cliente) + Aviso
    if (pageData.clientEmail && pageData.clientEmail !== "N/A" && pageData.clientEmail !== "N/A (Bloqueado)") {
        const toInput = document.querySelector('input[aria-label="Enter To email address"]');
        if (toInput) {
            await fillField(toInput, pageData.clientEmail);
            createFloatingWarning(toInput, "<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.");
        }
    }

    // C. Preencher BCC (Interno) + Aviso
    if (pageData.internalEmail) {
        const bccInput = document.querySelector('input[aria-label="Enter Bcc email address"]');
        if (bccInput) {
            await fillField(bccInput, pageData.internalEmail);
            const warningMsg = `<strong>Atenção:</strong> Verifique se o e-mail do AM deve estar em cópia.`;
            createFloatingWarning(bccInput, warningMsg);
        }
    }
    // ============================================================

    await esperar(500); 

    // 3. Aplicação da Canned Response
    const btnCanned = document.querySelector('material-button[debug-id="canned_response_button"]');
    
    if (btnCanned) {
        simularCliqueReal(btnCanned);
        // Espera um pouco para o input aparecer
        await esperar(1000);
        const searchInput = document.querySelector('material-auto-suggest-input input');
        
        if (searchInput) {
            simularCliqueReal(searchInput);
            document.execCommand('insertText', false, cannedResponseText);
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            log("⏳ Buscando resultado da Canned Response...", 'info');
            
            // Lógica de Espera Dinâmica
            let primeiraOpcao = null;
            let tempoDecorrido = 0;
            const TEMPO_MAXIMO = 15000;
            const INTERVALO = 500;

            while (tempoDecorrido < TEMPO_MAXIMO) {
                primeiraOpcao = document.querySelector('material-select-dropdown-item');
                if (primeiraOpcao) break; 
                await esperar(INTERVALO);
                tempoDecorrido += INTERVALO;
            }

            if (primeiraOpcao) {
                simularCliqueReal(primeiraOpcao);
                await esperar(1500);

                const editorVisivel = getVisibleEditor();
                if (editorVisivel) {
                    
                    // ===========================================================
                    // 1. MANIPULAÇÃO DE DOM (Tabelas e Estruturas Complexas)
                    // ===========================================================
                    
                    // Identifica se temos o placeholder {Requested Task Type} em spans
                    const spans = Array.from(editorVisivel.querySelectorAll('span.field'));
                    const ecw4Spans = spans.filter(s => s.innerText.includes('{Requested Task Type}'));
                    
                    if (ecw4Spans.length > 0) {
                        // Encontra as linhas (TR) que contêm esses spans
                        const rows = ecw4Spans.map(s => s.closest('tr')).filter(tr => tr !== null);
                        const uniqueRows = [...new Set(rows)];
                        
                        if (uniqueRows.length > 0) {
                            const firstRow = uniqueRows[0];
                            // Tenta achar a célula de conteúdo (geralmente a segunda, ou width=100%)
                            const targetCell = firstRow.querySelector('td[width="100%"]');
                            
                            if (targetCell) {
                                // Substitui o conteúdo da primeira linha
                                targetCell.innerHTML = '<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Validação - Dentro de 7 dias</span>';
                            }
                            
                            // Remove as linhas extras (duplicadas)
                            for (let i = 1; i < uniqueRows.length; i++) {
                                uniqueRows[i].remove();
                            }
                        }
                    }

                    // ===========================================================
                    // 2. SUBSTITUIÇÃO DE STRING (Variáveis Simples)
                    // ===========================================================
                    
                    // Pega o HTML atualizado (já com as linhas removidas)
                    let html = editorVisivel.innerHTML;
                    
                    // Substituição Genérica do Nome
                    if (pageData.advertiserName && html.includes('{%ADVERTISER_NAME%}')) {
                        html = html.replace(/{%ADVERTISER_NAME%}/g, pageData.advertiserName);
                    }

                    // Substituição do ID estranho do site
                    if (html.includes('{%^79285%}')) {
                        html = html.replace(/{%\^79285%}/g, pageData.websiteUrl || eat('fallbackSite'));
                    }

                    // Aplica de volta ao editor
                    editorVisivel.innerHTML = html;
                }
                
                showToast(eat('cannedResponseApplied'));
            } else {
                log(`❌ Timeout: Resultado '${cannedResponseText}' não apareceu após 15s.`, 'error');
                SoundManager.playError();
                showToast(eat('cannedResponseTimeout')(cannedResponseText), { error: true });
            }
        }
    } else {
        SoundManager.playError();
        showToast(eat('cannedResponseButtonNotFound'), { error: true });
    }
}

export async function runQuickEmail(template) {
    log(`🚀 Iniciando Quick Email: ${template.name}`);
    
    // 1. Abre e Limpa
    const emailPronto = await openAndClearEmail(); 
    if (!emailPronto) return;

    // 2. Coleta Dados (Agora com Email)
    const pageData = await getPageData(); 
    const agentName = getAgentName();

    await esperar(600); 

    // FASE 4: PREENCHIMENTO DE DESTINATÁRIOS (Igual acima)
    const expandBtn = document.querySelector('material-icon[aria-label="Show CC and BCC fields"]') || 
                      document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');
    if (expandBtn) {
        expandBtn.click();
        await esperar(600);
    }

    if (pageData.clientEmail && pageData.clientEmail !== "N/A" && pageData.clientEmail !== "N/A (Bloqueado)") {
        const toInput = document.querySelector('input[aria-label="Enter To email address"]');
        if (toInput) {
            await fillField(toInput, pageData.clientEmail);
            createFloatingWarning(toInput, "<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente.");
        }
    }

    if (pageData.internalEmail) {
        const bccInput = document.querySelector('input[aria-label="Enter Bcc email address"]');
        if (bccInput) {
            await fillField(bccInput, pageData.internalEmail);
            const warningMsg = `<strong>Atenção:</strong> Verifique se o e-mail do AM deve estar em cópia.`;
            createFloatingWarning(bccInput, warningMsg);
        }
    }

    // FASE 5: ASSUNTO E CORPO
    const subjectInput = document.querySelector('input[aria-label="Subject"]');
    if (subjectInput && template.subject) {
        subjectInput.focus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(subjectInput, template.subject);
        subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
        await esperar(300); 
    }

    const editorVisivel = getVisibleEditor();
    
    if (editorVisivel) {
         const wrapperGeral = editorVisivel.closest('.email-body-content') || document.body;
         const editorPai = wrapperGeral.querySelector('div[contenteditable="true"][aria-label="Email body"]');
         
         if (editorPai) {
             editorPai.focus();
             simularCliqueReal(editorPai);
         }

        const date = new Date();
        date.setDate(date.getDate() + 3); 
        const day = date.getDay();
        if (day === 6) date.setDate(date.getDate() + 2);
        else if (day === 0) date.setDate(date.getDate() + 1);
        const dataFormatada = date.toLocaleDateString('pt-BR');
        
        let finalBody = template.body;
        finalBody = finalBody.replace(/\[Nome do Cliente\]/g, pageData.advertiserName || eat('fallbackClient'));
        finalBody = finalBody.replace(/\[INSERIR URL\]/g, pageData.websiteUrl || eat('fallbackSite'));
        finalBody = finalBody.replace(/\[URL\]/g, pageData.websiteUrl || eat('fallbackSite'));
        finalBody = finalBody.replace(/\[Seu Nome\]/g, agentName); 
        finalBody = finalBody.replace(/\[MM\/DD\/YYYY\]/g, dataFormatada);

        document.execCommand('insertHTML', false, finalBody);
        
        if (editorPai) {
            editorPai.dispatchEvent(new Event('input', { bubbles: true }));
            editorPai.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        showToast(eat('emailFilledSuccess'), { duration: 2000 });
        log("✅ Processo finalizado com sucesso.", 'success');

    } else {
        SoundManager.playError();
        showToast(eat('editorFocusError'), { error: true });
    }
}