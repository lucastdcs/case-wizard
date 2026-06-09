// src/modules/automation/case-log-scraper.js
import { showToast } from '../../shared/utils.js';
import { SoundManager } from '../../shared/sound-manager.js';
import { ensureOriginalLanguage } from '../../shared/page-data.js';

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

function simularClique(el) {
    if (!el) return;
    ['mousedown', 'mouseup', 'click'].forEach(evt => 
        el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }))
    );
}

const styleId = 'cw-automation-styles';
if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        /* Animação da Borda Google */
        @keyframes google-border-spin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .cw-scanning-active {
            /* Borda gradiente animada */
            border: 2px solid transparent !important;
            border-radius: 8px !important;
            background-image: linear-gradient(#fff, #fff), 
                              linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            background-size: 200% 200%;
            animation: google-border-spin 1.5s linear infinite;
            box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3) !important;
            
            /* Traz para frente do Overlay */
            position: relative;
            z-index: 1000000 !important; 
            pointer-events: none;
        }

        /* Overlay Limpo (Sem texto, só Blur) */
        #cw-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.4); /* Branco Translúcido */
            backdrop-filter: blur(5px);           /* O Desfoque Apple Glass */
            -webkit-backdrop-filter: blur(5px);
            z-index: 999999;                      /* Fica atrás do Input (1000000) */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na página */
        }
    `;
    document.head.appendChild(style);
}


function toggleLoadingOverlay(show) {
    let overlay = document.getElementById('cw-loading-overlay');
    
    if (show) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'cw-loading-overlay';
            // Sem conteúdo interno (spinner/texto), apenas o div vazio para o efeito
            document.body.appendChild(overlay);
            
            // Força reflow para animação funcionar
            requestAnimationFrame(() => overlay.style.opacity = '1');
        } else {
            overlay.style.opacity = '1';
        }
    } else {
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }
}

/**
 * Executa a varredura no Case Log e insere o ID no input alvo.
 */
export async function fetchAndInsertSpeakeasyId(targetInputId) {
    console.log("🚀 Iniciando extração automática...");

    // Garante que a página esteja no idioma original antes de iniciar a extração
    await ensureOriginalLanguage();

    const inputWidget = document.getElementById(targetInputId);
    let originalPlaceholder = "";

    // 1. ATIVA OS EFEITOS VISUAIS
    toggleLoadingOverlay(true); // Liga o Blur
    
    if (inputWidget) {
        originalPlaceholder = inputWidget.placeholder;
        inputWidget.placeholder = "Buscando ID...";
        inputWidget.value = ""; 
        inputWidget.classList.add('cw-scanning-active'); // Liga a borda colorida e traz para frente
    }

    try {

        
        // Garante aba Case Log (Navigation)
        const btnCaseLog = document.querySelector('material-button[debug-id="dock-item-case-log"]');
        if (btnCaseLog && !btnCaseLog.classList.contains('selected')) {
            simularClique(btnCaseLog);
            await esperar(1200);
        }

        // Verifica Filtros
        const btnFiltro = document.querySelector('search-filter dropdown-button .button');
        if (btnFiltro) {
            const texto = btnFiltro.innerText || "";
            if (!texto.includes("All")) {
                simularClique(btnFiltro);
                await esperar(600);
                
                const checkAll = document.querySelector('material-checkbox[debug-id="check-all-box"]');
                if (checkAll && checkAll.getAttribute('aria-checked') !== 'true') {
                    simularClique(checkAll);
                    await esperar(300);
                }
                
                const btnApply = document.querySelector('material-button[debug-id="apply-filter"]');
                if (btnApply) {
                    simularClique(btnApply);
                    await esperar(1500); 
                }
            }
        }

        // Scroll Tático
        const scrollContainer = document.querySelector('.scroll-container') || document.querySelector('.case-log-container');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            await esperar(500);
        }

        const headers = Array.from(document.querySelectorAll('.message-header'));
        
        for (let i = headers.length - 1; i >= 0; i--) {
            const header = headers[i];
            

            const icon = header.querySelector('i.material-icons-extended');
            const isPhoneIcon = icon && icon.innerText.trim() === 'phone_in_talk';
            

            const textContent = header.innerText || "";
            const isCallText = textContent.includes("Agent joined") || 
                               textContent.includes("outbound-call") ||
                               textContent.includes("Speakeasy"); // Vai que aparece no título

            if (isPhoneIcon || isCallText) {

                const isExpanded = header.getAttribute('aria-expanded') === 'true';
                
                if (!isExpanded) {
                    console.log("📂 Expandindo mensagem de chamada...", header);
                    if(inputWidget) inputWidget.placeholder = "Lendo mensagem...";
                    
                    simularClique(header);
                    
                    await esperar(1000); 
                }

                break; 
            }
        }


        const seletor = '.preview, .speakeasy-agent-activity, .message-body, .content-container';
        const elementos = Array.from(document.querySelectorAll(seletor));
   
        const regexID = /Speakeasy.*?(P\d{15,25})/i;

        let idEncontrado = null;

        // Varre novamente os conteúdos (agora visíveis)
        for (let i = elementos.length - 1; i >= 0; i--) {
            const el = elementos[i];

            if (el.offsetParent === null) continue; 

            const match = (el.innerText || "").match(regexID);
            if (match && match[1]) {
                idEncontrado = match[1];
                break;
            }
        }


        if (inputWidget) {
            if (idEncontrado) {
                try { await navigator.clipboard.writeText(idEncontrado); } catch(e){}

                if (inputWidget.tagName === 'INPUT' || inputWidget.tagName === 'TEXTAREA') {
                    inputWidget.value = idEncontrado;
                } else {
                    inputWidget.textContent = idEncontrado;
                }
                
                // Dispara eventos para o framework do site reconhecer
                inputWidget.dispatchEvent(new Event('input', { bubbles: true }));
                inputWidget.dispatchEvent(new Event('change', { bubbles: true }));
                
                SoundManager.playSuccess();
                showToast(`ID Localizado: ${idEncontrado}`);

                // Flash Verde de Sucesso
                inputWidget.style.transition = "background-color 0.3s";
                inputWidget.style.backgroundColor = "rgba(15, 157, 88, 0.1)"; // Verde
                setTimeout(() => inputWidget.style.backgroundColor = "", 1000);

            } else {
                SoundManager.playError();
                showToast("Nenhum ID encontrado.", { error: true });
                inputWidget.placeholder = "Não encontrado";
                
                // Flash Vermelho de Erro
                inputWidget.style.transition = "background-color 0.3s";
                inputWidget.style.backgroundColor = "rgba(234, 67, 53, 0.1)"; // Vermelho
                setTimeout(() => inputWidget.style.backgroundColor = "", 1000);
            }
        }

    } catch (error) {
        console.error("Erro na automação:", error);
        showToast("Erro ao processar.", { error: true });
    } finally {
        if (inputWidget) {
            inputWidget.classList.remove('cw-scanning-active');
            if (!inputWidget.value) inputWidget.placeholder = originalPlaceholder;
        }
        toggleLoadingOverlay(false);
    }
}