// src/modules/shared/data-service.js

import { getAgentEmail } from './page-data.js'; 

// --- ROTEAMENTO DE AMBIENTE ---------------------------------------------
//
// `clasp push` só atualiza o HEAD do projeto Apps Script; as URLs /exec e
// /dev continuam presas à versão que foi *promovida* pela última vez. Por
// isso produção e desenvolvimento têm deployments SEPARADOS, e o frontend
// precisa saber em qual dos dois falar - senão o bundle de produção acaba
// conversando com o deployment que o CI republica a cada push na branch de
// desenvolvimento (foi exatamente o que este split veio corrigir).
//
// Quem decide é o build: o esbuild injeta __CW_BUILD_ENV__ via --define
// (veja .github/workflows/deploy.yml). Sem o define - rodando direto no
// Live Server, sem passar pelo bundler - o `typeof` cai no fallback
// "development", que é o comportamento certo pra máquina local.
//
// QUAL ID É QUAL, e por quê:
//
// A implantação abaixo marcada como `production` é a que sempre esteve em
// uso de fato - a que o CI vinha republicando e contra a qual todo mundo
// trabalha. Ela continua sendo a de produção justamente por isso: ela já
// está em dia, e trocar produção para outro lugar significaria apontá-la
// para uma implantação parada num commit antigo. (Foi o erro da primeira
// versão deste split: ele elegeu como produção a implantação que a `main`
// referenciava, e que não era promovida desde março.)
//
// A de `development` é NOVA, criada só para este split. Ela existe para que
// pushes na branch de desenvolvimento parem de mexer no que os agentes
// usam: antes, um único ID servia aos dois, então cada push republicava o
// backend de todo mundo.
//
// Ao rotacionar um deployment, troque o ID AQUI e também o do
// .github/workflows/deploy.yml - os dois precisam apontar pro mesmo lugar.
const DEPLOYMENTS = {
    // Promovida SÓ quando um merge chega na `main`. Nenhum push na branch de
    // desenvolvimento a toca.
    production:  "AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg",
    // Promovida automaticamente a cada push em refactor-structure.
    development: "AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA",
};

const BUILD_ENV = typeof __CW_BUILD_ENV__ !== "undefined" ? __CW_BUILD_ENV__ : "development";

// Live Server local continua falando com o /dev do deployment de
// desenvolvimento (código não publicado, iteração rápida).
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const SCRIPT_ID = DEPLOYMENTS[BUILD_ENV] || DEPLOYMENTS.development;
const ENDPOINT = isLocalhost ? "dev" : "exec";

const API_URL = `https://script.google.com/a/macros/google.com/s/${SCRIPT_ID}/${ENDPOINT}`;

// Os 6 últimos caracteres do ID da implantação. É a "impressão digital" que
// prova a separação de ambientes: se a pílula, o Configurações e o dashboard
// mostram o mesmo sufixo, os três estão falando com a mesma implantação; se
// divergem, achou-se o vazamento. O ID inteiro não vai pra tela - é longo e
// não acrescenta nada a olho nu.
const DEPLOYMENT_FINGERPRINT = SCRIPT_ID.slice(-6);

/**
 * De onde este bundle está falando. Usado pelo selo da pílula e pelo bloco de
 * diagnóstico em Configurações.
 *
 * @returns {{env: string, isDev: boolean, endpoint: string, fingerprint: string}}
 */
export function getBackendInfo() {
    return {
        env: BUILD_ENV,
        isDev: BUILD_ENV !== "production",
        endpoint: ENDPOINT,
        fingerprint: DEPLOYMENT_FINGERPRINT,
    };
}

// Em produção não há selo na tela (decisão de produto: nada de chrome extra
// pro agente). Este log é, junto com o bloco em Configurações, o caminho
// determinístico pra confirmar o ambiente sem depender de enxergar um badge.
console.log(`[Case Wizard] backend: ${BUILD_ENV}/${ENDPOINT} · implantação …${DEPLOYMENT_FINGERPRINT}`);

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";
const CACHE_KEY_CONTENT_PREFIX = "cw_content_";

const FALLBACK_TIPS = ["Processando...", "Mantenha o foco!", "Aguarde..."];

// --- Helper JSONP Poderoso (Core do Sistema) ---

function jsonpFetch(operation, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = 'cw_cb_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');
        
        // WATCHDOG TIMEOUT: Evita o Skeleton Infinito
        // Se o Google não responder em 15 segundos, rejeita a promise.
        const timeoutId = setTimeout(() => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            reject(new Error("Timeout: A API demorou muito para responder. (Apps Script bloqueado ou erro 500)"));
        }, 15000); 

        window[callbackName] = (data) => {
            clearTimeout(timeoutId); // Sucesso! Cancela a bomba-relógio.
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            resolve(data);
        };

        const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');

        const finalUrl = `${API_URL}?op=${operation}&callback=${callbackName}&t=${Date.now()}&${queryString}`;
        
        script.src = finalUrl;
        
        script.onerror = () => {
            clearTimeout(timeoutId);
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            reject(new Error("Erro de conexão JSONP."));
        };

        document.body.appendChild(script);
    });
}

export const DataService = {
    
    // ==========================================
    // 1. SISTEMA CORE (Dicas e Inicialização)
    // ==========================================
    // As dicas passaram a ser gerenciadas pela Central de Conteúdo (módulo
    // 'tips'). O contrato público daqui não mudou: quem chama segue usando
    // fetchTips() e getRandomTip() sem saber de onde vem.
    fetchTips: async () => {
        try {
            await DataService.fetchContentModule('tips');
        } catch (err) { console.warn("Tips offline", err); }
    },

    // Cache da rota antiga (op=broadcast). Nada mais escreve nesta chave: os
    // avisos passaram a ser um módulo da Central e são lidos por
    // fetchContentModule('broadcast'). A leitura fica de pé pelo mesmo motivo
    // do fallback legado em getRandomTip(): no primeiro load depois do deploy
    // ainda não existe cache da Central, e se a pessoa estiver offline nesse
    // momento ela veria a Central de Avisos vazia em vez dos avisos que já
    // tinha. Some quando não houver mais bundles antigos em circulação.
    getCachedBroadcasts: () => {
        try {
            return JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]");
        } catch (e) {
            return [];
        }
    },

    // ==========================================
    // 1.5 CENTRAL DE CONTEÚDO (conteúdo gerenciável)
    // ==========================================
    // Busca o conteúdo publicado de um módulo (links, call_script, ...).
    // O backend só devolve itens 'live' - não existe parâmetro de status aqui,
    // então nem por engano o app do agente enxerga algo pendente de aprovação.
    //
    // Mesmo contrato dos tips: cacheia no localStorage e devolve o cache quando
    // a API cai. Quem chama continua responsável por ter um fallback embutido
    // no código para o primeiro load offline, quando não há cache nenhum.
    fetchContentModule: async (module) => {
        const cacheKey = `${CACHE_KEY_CONTENT_PREFIX}${module}`;
        try {
            const data = await jsonpFetch('content_public', { module });
            if (data?.status === 'success' && Array.isArray(data.items)) {
                localStorage.setItem(cacheKey, JSON.stringify(data.items));
                return data.items;
            }
        } catch (err) {
            console.warn(`Conteúdo '${module}' offline`, err);
        }
        return DataService.getCachedContent(module);
    },

    getCachedContent: (module) => {
        try {
            return JSON.parse(localStorage.getItem(`${CACHE_KEY_CONTENT_PREFIX}${module}`) || "null");
        } catch (e) {
            return null;
        }
    },
    
    getRandomTip: () => {
        let tips = null;

        // 1. Central de Conteúdo (fonte atual).
        const items = DataService.getCachedContent('tips');
        if (Array.isArray(items) && items.length) {
            tips = items.map(i => i.value).filter(Boolean);
        }

        // 2. Cache da rota antiga. Só importa no primeiro load depois do
        // deploy, e só se o usuário estiver offline: sem isso ele veria as três
        // frases genéricas do fallback em vez das dicas que já tinha em cache.
        if (!tips || !tips.length) {
            const legado = localStorage.getItem(CACHE_KEY_TIPS);
            if (legado) try { tips = JSON.parse(legado); } catch (e) { }
        }

        // 3. Fallback embutido.
        if (!Array.isArray(tips) || !tips.length) tips = FALLBACK_TIPS;

        return tips[Math.floor(Math.random() * tips.length)];
    },

    // ==========================================
    // 2. AVISOS — ESCRITA REMOVIDA
    // ==========================================
    // sendBroadcast/updateBroadcast/deleteBroadcast (e o _performOp que só
    // elas usavam) saíram daqui junto com as rotas que chamavam. Publicar um
    // aviso é ação da Central de Conteúdo, feita por google.script.run com
    // identidade do servidor e papel verificado — não por uma URL pública que
    // qualquer um podia chamar. O app do agente só lê.

    // ==========================================
    // 3. ANALYTICS
    // ==========================================
    logEvent: (category, action, label = "", value = null) => {
        try {
            let user = "anon";
            try {
                const email = getAgentEmail(); 
                if (email) user = email.split('@')[0].toLowerCase();
            } catch(e){}

            const payload = {
                timestamp: new Date().toISOString(),
                user: user,
                version: "v5.1",
                category: category,
                action: action,
                label: label,
                value: value || ''
            };

            jsonpFetch('log', payload).catch(e => {
                // Silencioso no console
            });

        } catch (err) {
            console.warn("Analytics error", err);
        }
    },

    logUsage: () => {},

    // ==========================================
    // 4. NOVO SISTEMA BAU (Formulário e Dashboard)
    // ==========================================
sendBAUEscalation: async (payload, userEmail) => {
        const fullPayload = {
            ...payload,
            user: userEmail,
            date: new Date().toISOString()
        };
        try {
            console.log(`Executando create_bau...`, fullPayload);
            const response = await jsonpFetch('create_bau', fullPayload);
            if (response && response.status === 'success') {
                console.log("Sucesso: create_bau");
                return response;
            }
            // AGORA SIM ELE VAI MOSTRAR O ERRO REAL DO APPS SCRIPT:
            throw new Error(response?.error || response?.message || "Falha na operação BAU");
        } catch (e) {
            console.error("Erro JSONP (BAU):", e);
            throw e;
        }
    },

    readAgentBAU: async () => {
        const agentEmail = getAgentEmail();
        if (!agentEmail) {
            console.warn("Email não encontrado. Não foi possível buscar casos BAU.");
            return [];
        }
        
        try {
            console.log("Buscando casos BAU para:", agentEmail);
            const response = await jsonpFetch('read_agent_bau', { user: agentEmail });
            
            // VALIDAÇÃO RIGOROSA DA RESPOSTA
            if (response && response.status === 'success' && Array.isArray(response.cases)) {
                return response.cases;
            }

            if (response && response.status === 'error') {
                throw new Error(response.message || "Erro retornado pela API de leitura");
            }

            return [];
        } catch (e) {
            console.error("Erro ao buscar casos BAU:", e);
            // Propaga o erro para que a UI possa reagir (limpar skeleton)
            throw e;
        }
    },

    updateBAUStatus: async (id, status, extra = {}) => {
        const agentEmail = getAgentEmail();
        try {
            console.log(`Atualizando status BAU ${id} para ${status}...`);
            const response = await jsonpFetch('update_bau_status', {
                id,
                status,
                user: agentEmail,
                ...extra
            });
            return response && response.status === 'success';
        } catch (e) {
            console.error("Erro ao atualizar status BAU:", e);
            return false;
        }
    },

    updateBAUEscalation: async (id, payload) => {
        const agentEmail = getAgentEmail();
        const fullPayload = {
            ...payload,
            id: id,
            user: agentEmail,
            date_edited: new Date().toISOString()
        };
        try {
            console.log(`Executando update_bau para ${id}...`, fullPayload);
            const response = await jsonpFetch('update_bau', fullPayload);
            if (response && response.status === 'success') {
                console.log("Sucesso: update_bau");
                return response;
            }
            throw new Error(response?.error || response?.message || "Falha na atualização BAU");
        } catch (e) {
            console.error("Erro JSONP (Update BAU):", e);
            throw e;
        }
    },

    // ==========================================
    // 5. USER PROFILE SYSTEM (Dynamic)
    // ==========================================
    fetchUserProfile: async (ldap) => {
        try {
            console.log(`Buscando perfil para: ${ldap}`);

            // AQUI ESTÁ A CORREÇÃO: Enviando o parâmetro 'ldap' para o backend
            const response = await jsonpFetch('get_user_profile', { ldap: ldap });
            console.log("Resposta bruta do servidor:", response);
    
            if (response && response.status === 'success' && response.profile) {
                return response.profile;
            }
            
            return null;
        } catch (e) {
            console.error("Erro ao buscar perfil:", e);
            return null;
        }
    },

    getUserSnippets: async (userEmail) => {
        try {
            console.log("Buscando snippets para:", userEmail);
            const response = await jsonpFetch('get_user_snippets', { user: userEmail });
            return response;
        } catch (e) {
            console.error("Erro ao carregar snippets:", e);
            return { status: 'error', snippets: [] };
        }
    },

    saveSnippet: async (snippet, userEmail) => {
        const payload = {
            id: snippet.id,
            type: snippet.type,
            title: snippet.title,
            content: snippet.content,
            subject: snippet.subject || '',
            isCode: snippet.isCode,
            isRich: snippet.isRich,
            user: userEmail
        };
        try {
            console.log("Salvando snippet na nuvem:", payload);
            const response = await jsonpFetch('save_snippet', payload);
            return response && response.status === 'success';
        } catch (e) {
            console.error("Erro ao salvar snippet:", e);
            return false;
        }
    },

    deleteSnippet: async (id, userEmail) => {
        try {
            console.log(`Deletando snippet ${id}...`);
            const response = await jsonpFetch('delete_snippet', { id: id, user: userEmail });
            return response && response.status === 'success';
        } catch (e) {
            console.error("Erro ao deletar snippet:", e);
            return false;
        }
    },

    // --- Preferências do agente (blob único por pessoa) ---
    // Devolve null - e não {} - quando a busca falha: quem chama precisa saber
    // distinguir "esta pessoa não tem preferência nenhuma" de "não deu pra
    // perguntar", senão o cache local seria zerado por uma falha de rede.
    getUserPrefs: async (userEmail) => {
        try {
            const response = await jsonpFetch('get_user_prefs', { user: userEmail });
            if (response && response.status === 'success') return response.prefs || {};
            return null;
        } catch (e) {
            console.warn("Erro ao carregar preferências:", e);
            return null;
        }
    },

    saveUserPrefs: async (prefs, userEmail) => {
        try {
            const response = await jsonpFetch('save_user_prefs', {
                user: userEmail,
                prefs: JSON.stringify(prefs || {})
            });
            return !!(response && response.status === 'success');
        } catch (e) {
            console.warn("Erro ao salvar preferências:", e);
            return false;
        }
    }
};

export const sendBAUEscalation = DataService.sendBAUEscalation;
export const readAgentBAU = DataService.readAgentBAU;
export const updateBAUStatus = DataService.updateBAUStatus;
export const updateBAUEscalation = DataService.updateBAUEscalation;
export const fetchUserProfile = DataService.fetchUserProfile;
export const getUserSnippets = DataService.getUserSnippets;
export const saveSnippet = DataService.saveSnippet;
export const deleteSnippet = DataService.deleteSnippet;
export const getUserPrefs = DataService.getUserPrefs;
export const saveUserPrefs = DataService.saveUserPrefs;