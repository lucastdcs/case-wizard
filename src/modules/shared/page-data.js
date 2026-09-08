// src/modules/shared/page-data.js
import { fetchUserProfile } from './data-service.js';
import { esperar } from './dom-utils.js';

// Variável que guarda o nome para usar nos emails depois
let cachedAgentName = "";
let cachedAgentEmail = "";
let cachedUserProfile = null;

/**
 * Garante que a página esteja no idioma original caso o recurso de tradução do CRM esteja ativo.
 * Isso evita falhas de mapeamento e regex durante a raspagem de dados.
 */
export async function ensureOriginalLanguage() {
    try {
        const translateBtn = document.querySelector('material-button[debug-id="toggle-translation-button"]');

        if (translateBtn) {
            const text = translateBtn.textContent.toLowerCase();
            // Verifica se o botão indica que a página está traduzida (exibindo opção de mostrar original)
            if (text.includes('show original') || text.includes('mostrar original')) {
                console.log("TechSol: Tradução detectada. Revertendo para o idioma original...");
                translateBtn.click();
                await esperar(400); // Aguarda renderização da interface original
            }
        }
    } catch (e) {
        // Silencioso: não deve interromper o fluxo principal se o botão falhar
        console.warn("TechSol: Erro ao tentar reverter tradução:", e);
    }
}

// --- 1. SHERLOCK HOLMES (Captura Silenciosa do Nome do Agente) ---
export async function captureNameWithMagic() {
    // Se já temos nome E email, retorna rápido
    if (cachedAgentName && cachedAgentEmail) return cachedAgentName;

    try {
        const btn = document.querySelector('profile-icon material-button') ||
            document.querySelector('a[aria-label*="Account"]');

        if (!btn) return "Agente";

        // Abre o menu
        btn.click();
        await esperar(150); // Tempo para o Angular renderizar o menu

        let name = "Consultor";

        // 1. Captura o NOME
        const elName = document.querySelector('profile-details .name');
        if (elName) {
            const fullName = elName.textContent.trim();
            name = fullName.split(' ')[0];
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        } else {
            // Fallback pela imagem (LDAP)
            const img = document.querySelector('profile-details img');
            if (img && img.src.includes('/photos/')) {
                const ldap = img.src.match(/\/photos\/([^\?]+)/)[1];
                name = ldap.charAt(0).toUpperCase() + ldap.slice(1);
            }
        }

        // 2. Captura o EMAIL (NOVO) 📧
        const elEmail = document.querySelector('profile-details .email');
        if (elEmail) {
            cachedAgentEmail = elEmail.textContent.trim();
            console.log("TechSol: Identidade confirmada ->", cachedAgentEmail);
        }

        // Fecha o menu
        btn.click();
        document.body.click();

        cachedAgentName = name;
        return name;

    } catch (e) {
        console.warn("Sherlock falhou:", e);
        return "Consultor";
    }
}

// --- 2. GETTERS ---
export function getAgentName() {
    return cachedAgentName || "Consultor";
}

// NOVO: Retorna o email capturado
export function getAgentEmail() {
    return cachedAgentEmail || null;
}

// --- 3. ENGINE DE SAUDAÇÃO ---
export function getSmartGreeting(name) {
    const now = new Date();
    const h = now.getHours();
    const d = now.getDay();

    let prefix = "Olá";
    let iconSVG = "";

    if (h >= 5 && h < 12) {
        prefix = "Bom dia";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else if (h >= 12 && h < 18) {
        prefix = "Boa tarde";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else {
        prefix = "Boa noite";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }

    let phrases = [];
    if (h >= 0 && h < 5) {
        phrases = ["Guerreiro da madrugada.", "O mundo dorme, você avança.", "Foco total."];
    } else if (h < 12) {
        if (d === 1) phrases = ["Vamos definir o tom da semana.", "Nova semana, novas conquistas."];
        else if (d === 5) phrases = ["O último gás antes do descanso.", "Vamos fechar com chave de ouro."];
        else phrases = ["Que seu dia seja produtivo.", "Foco e café para hoje."];
    } else if (h < 18) {
        phrases = ["Mantenha o ritmo.", "Tarde produtiva pela frente.", "Seguimos avançando."];
    } else {
        phrases = ["Encerrando o dia com produtividade.", "Excelente dedicação."];
    }

    if (d === 0 || d === 6) phrases = ["Sua dedicação no fim de semana é inspiradora.", "Trabalho excepcional."];

    const randomSuffix = phrases[Math.floor(Math.random() * phrases.length)];

    return {
        prefix: `${prefix},`,
        name: name,
        suffix: randomSuffix,
        icon: iconSVG,
        isFriday: (d === 5)
    };
}

// --- 4. CAPTURA DE EMAIL DO CLIENTE (Com Validação de @) ---
export async function captureClientEmail() {
    try {
        // 1. Acha o label "Contact email"
        const xpath = "//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]";
        const labelNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (!labelNode) return null; // Retorna null se não achar, para tratar depois

        // Sobe para o container pai que guarda Label e Valor
        const container = labelNode.parentElement;

        // 2. Verifica máscara e clica se necessário
        const unmaskBtn = container.querySelector('.unmask-button') ||
            container.querySelector('[aria-label="Click to view"]');

        if (unmaskBtn) {
            unmaskBtn.click();
            // Espera o Angular renderizar o valor real
            await esperar(500);
        }

        // 3. BUSCA INTELIGENTE (Procura por @ e ignora "Is this: Email?")
        const candidates = Array.from(container.querySelectorAll('a, span, div, pii-value'));

        // Filtramos o candidato vencedor
        const emailElement = candidates.find(el => {
            const text = el.innerText.trim();
            // REGRAS: Tem @, não é pergunta do feedback, não é placeholder "Email"
            return text.includes('@') &&
                !text.includes('Is this:') &&
                text.toLowerCase() !== 'email';
        });

        if (emailElement) {
            return emailElement.innerText.trim();
        }

        return null;

    } catch (e) {
        console.warn("Erro ao capturar email do cliente:", e);
        return null;
    }
}

// --- 5. CAPTURA DE EMAIL INTERNO (Rastreabilidade) ---
export function captureInternalEmail() {
    try {
        // Busca o input de busca/conta no topo (Identificador Único do Usuário no CRM)
        const inputWrapper = document.querySelector('material-input[debug-id="account-id-input"]');

        if (inputWrapper) {
            const inputElement = inputWrapper.querySelector('input');
            if (inputElement) {
                const val = inputElement.value.trim();

                // Se tiver valor, resolve dinamicamente o e-mail completo
                if (val) {
                    // Se já for um e-mail completo, retorna. Caso contrário, anexa o domínio corporativo.
                    return val.includes('@') ? val : `${val}@google.com`;
                }
            }
        }
    } catch (e) {
        console.warn("Erro ao capturar email interno:", e);
    }
    return null;
}

// --- 6. CAPTURA DE CID (NOVO) ---
export function captureCID() {
    try {
        // Estratégia 1: Busca pelo Label Específico (Alta Precisão)
        // Busca labels que contenham "Google Ads External Customer ID"
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const cidLabel = labels.find(el => el.textContent.includes('Google Ads External Customer ID') || el.textContent.includes('Customer ID'));

        if (cidLabel) {
            // Tenta achar o container pai <home-data-item> ou similar
            const parent = cidLabel.closest('home-data-item') || cidLabel.parentElement;
            if (parent) {
                const content = parent.querySelector('.data-pair-content');
                if (content) {
                    // Limpa quebras de linha e espaços, formata para XXX-XXX-XXXX
                    return content.textContent.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                }
            }
        }

        // Estratégia 2: Regex Global (Fallback)
        // Procura padrão XXX-XXX-XXXX ou XXXXXXXXXX (10 dígitos) no corpo da página
        const bodyText = document.body.innerText;
        const cidMatch = bodyText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);

        if (cidMatch) {
            // Formata para garantir o padrão visual (123-456-7890)
            return cidMatch[0].replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }

    } catch (e) {
        console.warn("Erro ao capturar CID:", e);
    }
    return "N/A";
}

// --- 7. CAPTURA DE ACCOUNT MANAGER ---
export function captureAMName() {
    try {
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const amLabel = labels.find(el =>
            el.textContent.includes('Account Manager') ||
            el.textContent.includes('AM Name') ||
            el.textContent.includes('Sales Rep')
        );

        if (amLabel) {
            const parent = amLabel.closest('.data-pair') || amLabel.parentElement;
            const content = parent.querySelector('.data-pair-content') || parent.nextElementSibling;
            if (content) return content.textContent.trim();
        }
    } catch (e) { console.warn("Erro ao capturar AM:", e); }
    return null;
}

// --- 8. CAPTURA DE TIMEZONE (ATUALIZADO) ---
export function captureTimezone() {
    try {
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const tzLabel = labels.find(el =>
            el.textContent.toLowerCase().includes('customer time zone') ||
            el.textContent.toLowerCase().includes('time zone') ||
            el.textContent.toLowerCase().includes('timezone')
        );

        if (tzLabel) {
            const parent = tzLabel.parentElement; // O container que agrupa label e valor
            if (parent) {
                // Estratégia 1: Busca por <sanitized-content> dentro do container pai
                const sanitizedNode = parent.querySelector('sanitized-content');
                if (sanitizedNode && sanitizedNode.textContent.trim()) {
                    return sanitizedNode.textContent.trim();
                }

                // Estratégia 2: Fallback para irmão adjacente ou outros seletores
                const content = parent.querySelector('.data-pair-content') || tzLabel.nextElementSibling;
                 if (content && content.textContent.trim()) {
                    // Verifica se o conteúdo é um elemento e tem texto
                    const value = content.textContent.trim();
                    // Evita pegar valores vazios ou placeholders
                    if (value && value !== '---' && value !== 'N/A') {
                        return value;
                    }
                }
            }
        }
    } catch (e) {
        console.warn("Erro ao capturar Timezone:", e);
    }
    return null;
}


export async function getCaseId() {
    let id = "---";
    try {
        let caseUrl = window.location.href;
        id = caseUrl.split("/").pop();
    } catch (e) {
        console.warn("Falha URL:", e);
    }
    return id;
}

    export function captureSalesProgram() {
    try {
        // 1. Encontra a label correta ("Program" ou "Sales Program")
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const programLabel = labels.find(el => 
            el.textContent.toLowerCase().includes('sales program') || 
            el.textContent.toLowerCase().trim() === 'program' ||
            el.textContent.toLowerCase().includes('programa')
        );

        if (programLabel) {
            // 2. Sobe para o bloco pai
            const parent = programLabel.closest('.data-pair') || programLabel.parentElement;
            
            // 3. Mergulha na estrutura que você mapeou (<sanitized-content> -> <ng-template>)
            const valueNode = parent.querySelector('sanitized-content ng-template[debug-id="html-value"]') 
                           || parent.querySelector('sanitized-content');
            
            if (valueNode) {
                return valueNode.textContent.trim(); // Puxa o "umm_scaled" ou "kickstart_scaled"
            }

            // Fallback padrão se não tiver <sanitized-content>
            const content = parent.querySelector('.data-pair-content') || parent.nextElementSibling;
            if (content) return content.textContent.trim();
        }
    } catch (e) {
        console.warn("Erro ao capturar Sales Program:", e);
    }
    return "";
}

// --- 8.5 CAPTURA DE IDIOMA E SPEAKEASY ID ---
export function captureLanguage() {
    try {
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const langLabel = labels.find(el =>
            el.textContent.includes('Language') ||
            el.textContent.includes('Idioma')
        );
        if (langLabel) {
            const parent = langLabel.closest('.data-pair') || langLabel.parentElement;
            const content = parent.querySelector('.data-pair-content') || parent.nextElementSibling;
            if (content) return content.textContent.trim();
        }
    } catch (e) { console.warn("Erro ao capturar Idioma:", e); }
    return "N/A";
}

export function captureSpeakeasyID() {
    try {
        // 1. TENTATIVA PADRÃO: Buscar pelas Labels Estruturadas
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const seLabel = labels.find(el =>
            el.textContent.includes('Speakeasy ID') ||
            el.textContent.includes('SE ID')
        );
        if (seLabel) {
            const parent = seLabel.closest('.data-pair') || seLabel.parentElement;
            const content = parent.querySelector('.data-pair-content') || parent.nextElementSibling;
            if (content && content.textContent.trim()) return content.textContent.trim();
        }

        // 2. TENTATIVA AVANÇADA (O Regex): Buscar varrendo blocos de texto e notas
        const regexID = /Speakeasy.*?(P\d{15,25})/i;
        const textAreas = Array.from(document.querySelectorAll('textarea, .preview, .message-body, .notes-content'));
        
        for (let i = textAreas.length - 1; i >= 0; i--) {
            const text = textAreas[i].value || textAreas[i].innerText || "";
            const match = text.match(regexID);
            if (match && match[1]) {
                return match[1];
            }
        }
    } catch (e) { 
        console.warn("Erro ao capturar SE ID:", e); 
    }
    
    return "N/A";
}

// --- 8.6 UTILITÁRIOS DE PERMISSÃO ---
export function isCurrentUserOverhead() {
    return cachedUserProfile?.isOverhead || false;
}

// Guarda o perfil resolvido no boot do app.
//
// Antes, o perfil só entrava neste cache dentro de getPageData(), que roda
// quando algum módulo precisa raspar a página do CRM. Quem abrisse só a Central
// de Avisos nunca passava por lá, e getAgentSegment() abaixo responderia PT
// para todo mundo — inclusive para quem atende ES. O boot já busca o perfil
// para resolver o idioma da interface; agora ele também o deixa disponível
// aqui, que é onde o resto do app pergunta quem é a pessoa.
export function setUserProfile(profile) {
    if (profile) cachedUserProfile = profile;
}

// Segmento que a pessoa atende, vindo da coluna Segmento da aba People
// (já normalizado pelo backend em profile.defaultLanguage: PT-BR, ES ou EN).
//
// Não é a mesma coisa que getLanguage() do i18n: aquele é o idioma da
// INTERFACE, que a pessoa pode trocar em Configurações. Este é a operação que
// ela atende, e é o que decide qual disponibilidade BAU e quais avisos
// segmentados fazem sentido para ela. Quem atende PT e prefere a interface em
// espanhol continua sendo PT.
//
// EN cai em PT porque não há operação BAU em inglês — mesma decisão já tomada
// em i18n.js, que manda EN para o dicionário PT por não existir tradução.
export function getAgentSegment() {
    const raw = String(cachedUserProfile?.defaultLanguage || "").toUpperCase();
    return raw === 'ES' ? 'ES' : 'PT';
}

// --- 9. COMPILADOR DE DADOS DA PÁGINA ---
export async function getPageData() {
    // Garante que os dados estejam no idioma original para evitar falhas de raspagem
    await ensureOriginalLanguage();

    // Garante que a identidade foi capturada antes de prosseguir
    if (!cachedAgentEmail) {
        await captureNameWithMagic();
    }

    let advertiserName = "Cliente";
    let websiteUrl = "";

    // Captura NOME DO ANUNCIANTE
    try {
        const nameXpath = "//div[contains(text(), 'Given name')]";
        const nameNode = document.evaluate(nameXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (nameNode && nameNode.nextElementSibling) {
            const rawName = nameNode.nextElementSibling.innerText.trim();
            if (rawName) advertiserName = rawName;
        }
    } catch (e) { console.warn("Falha Nome:", e); }

    // Captura WEBSITE
    try {
        const urlXpath = "//div[contains(text(), 'Website')]";
        const urlNode = document.evaluate(urlXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (urlNode && urlNode.nextElementSibling) {
            const rawUrl = urlNode.nextElementSibling.innerText.trim();
            if (rawUrl) websiteUrl = rawUrl;
        }
    } catch (e) { console.warn("Falha URL:", e); }


    // Captura EMAILS
    const clientEmail = await captureClientEmail();
    const internalEmail = captureInternalEmail();

    // Captura CID
    const cid = captureCID();

    // Captura AM e Timezone
    const amName = captureAMName();
    const timezone = captureTimezone();

    const caseId = await getCaseId();
    const salesProgram = captureSalesProgram();
    const language = captureLanguage();
    const seId = captureSpeakeasyID();

    // Novo: Captura de Perfil de Usuário
    const agentEmail = getAgentEmail();
    if (agentEmail && !cachedUserProfile) {
        const ldap = agentEmail.split('@')[0];
        try {
            cachedUserProfile = await fetchUserProfile(ldap);
        } catch (e) {
            console.warn("Falha ao carregar perfil do usuário:", e);
        }
    }

    return {
        // Core fields (Original names)
        advertiserName: advertiserName,
        websiteUrl: websiteUrl,
        clientEmail: clientEmail,
        internalEmail: internalEmail,
        cid: cid,
        amName: amName,
        timezone: timezone,
        agentName: getAgentName(),
        agentEmail: getAgentEmail(),
        caseId: caseId,
        userProfile: cachedUserProfile,

        // Aliases for BAU Form compatibility
        advName: advertiserName,
        site: websiteUrl,
        website: websiteUrl, // bau-form-config.js's campo 'website' lê pageData.website, não .site
        email: clientEmail,
        advEmail: clientEmail, // bau-form-config.js's campo 'advEmail' lê pageData.advEmail
        salesProgram: salesProgram,
        language: language,
        seId: seId
    };
}

//criar função separada case id