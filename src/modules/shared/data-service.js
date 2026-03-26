// src/modules/shared/data-service.js

import { getAgentEmail } from './page-data.js'; 

// URL da API atualizada
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycbxx66yAWDKEXgY5gClR3jIa14lkEWbDlzF8nM4pa6bkM42ff6m6xf-fCmEKkjVluL2feg/exec";

const CACHE_KEY_BROADCAST = "cw_data_broadcast";
const CACHE_KEY_TIPS = "cw_data_tips";

const FALLBACK_TIPS = ["Processando...", "Mantenha o foco!", "Aguarde..."];

// --- Helper JSONP Poderoso (Core do Sistema) ---
function jsonpFetch(operation, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = 'cw_cb_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');
        
        window[callbackName] = (data) => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            resolve(data);
        };

        // Converte objeto params em string query
        const queryString = Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            .join('&');

        // Monta URL com Cache Buster (t=...)
        const finalUrl = `${API_URL}?op=${operation}&callback=${callbackName}&t=${Date.now()}&${queryString}`;
        
        script.src = finalUrl;
        
        script.onerror = () => {
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            // Em scripts corporativos, as vezes o onerror dispara mesmo com sucesso 
            // se o mimetype variar, mas geralmente é bloqueio.
            reject(new Error("JSONP Error (Check Corp Login)"));
        };

        document.body.appendChild(script);
    });
}

export const DataService = {
    
    // ==========================================
    // 1. SISTEMA CORE (Dicas e Inicialização)
    // ==========================================
    fetchTips: async () => {
        try {
            const data = await jsonpFetch('tips');
            if (data?.tips) localStorage.setItem(CACHE_KEY_TIPS, JSON.stringify(data.tips));
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
    
    getRandomTip: () => {
        let tips = FALLBACK_TIPS;
        const cached = localStorage.getItem(CACHE_KEY_TIPS);
        if (cached) try { tips = JSON.parse(cached); } catch(e){}
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
            
            if (response && response.status === 'success') {
                return response.cases || [];
            }
            return [];
        } catch (e) {
            console.error("Erro ao buscar casos BAU:", e);
            return [];
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

    // ==========================================
    // 5. USER PROFILE SYSTEM (Dynamic)
    // ==========================================
    fetchUserProfile: async (ldap) => {
        try {
            console.log(`Buscando perfil para: ${ldap}`);
            const response = await jsonpFetch('people');

            if (response && response.status === 'success' && response.people) {
                const user = response.people.find(p => p.ldap.toLowerCase() === ldap.toLowerCase());

                if (user) {
                    const overheadRoles = ["Manager", "Lead", "TL", "Staff"];
                    const isOverhead = overheadRoles.some(r => user.roleCategory.includes(r));

                    return {
                        ...user,
                        isOverhead: isOverhead
                    };
                }
            }
            return null;
        } catch (e) {
            console.error("Erro ao buscar perfil:", e);
            return null;
        }
    }
};

export const sendBAUEscalation = DataService.sendBAUEscalation;
export const readAgentBAU = DataService.readAgentBAU;
export const updateBAUStatus = DataService.updateBAUStatus;
export const fetchUserProfile = DataService.fetchUserProfile;