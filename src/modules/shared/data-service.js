// src/modules/shared/data-service.js

import { getAgentEmail } from './page-data.js'; 

// 1. Verifica se está rodando localmente (Live Server no VS Code/Workstation)
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// 2. Isola o ID do seu script para manter o código limpo
const SCRIPT_ID = "AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg";

// 3. Roteia automaticamente para o endpoint correto
const API_URL = isDevelopment 
    ? `https://script.google.com/a/macros/google.com/s/${SCRIPT_ID}/dev` 
    : `https://script.google.com/a/macros/google.com/s/${SCRIPT_ID}/exec`;

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

    fetchData: async () => {
        try {
            const data = await jsonpFetch('broadcast');
            if (data?.broadcast) {
                localStorage.setItem(CACHE_KEY_BROADCAST, JSON.stringify(data.broadcast));
                return data;
            }
        } catch (err) { console.warn("Broadcast offline", err); }
        return { broadcast: JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]") };
    },

    getCachedBroadcasts: () => JSON.parse(localStorage.getItem(CACHE_KEY_BROADCAST) || "[]"),

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
    // 2. SISTEMA DE BROADCASTS (Avisos)
    // ==========================================
    sendBroadcast: async (payload) => {
        const fullPayload = {
            ...payload,
            date: new Date().toISOString(),
            id: Date.now().toString() 
        };
        return await DataService._performOp('new_broadcast', fullPayload);
    },

    updateBroadcast: async (id, payload) => {
        const fullPayload = { id, ...payload };
        return await DataService._performOp('update_broadcast', fullPayload);
    },

    deleteBroadcast: async (id) => {
        return await DataService._performOp('delete_broadcast', { id });
    },

    _performOp: async (op, params) => {
        try {
            console.log(`Executando ${op}...`, params);
            const response = await jsonpFetch(op, params);
            if (response && response.status === 'success') {
                console.log("Sucesso:", op);
                return true; // Mantido true para não quebrar a lógica antiga do broadcast
            }
            console.warn("Falha:", response);
            return false;
        } catch (e) {
            console.error("Erro JSONP:", e);
            return false;
        }
    },
    
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