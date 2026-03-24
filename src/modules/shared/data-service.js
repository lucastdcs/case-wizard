// src/modules/shared/data-service.js

import { getAgentEmail } from './page-data.js'; 

// Sempre que atualizar o Apps Script, criar uma nova implantação e gerar um novo link, para garantir que os problemas não apareçam.
const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycby8htUKUI8dTNYBzsP-sObooNJIUi0ZepxbOaky5vRBcbbiwsItWB1KCRaXXuSIrP0DYw/exec";

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

// --- Helper genérico para Operações ---
async function _performOp(op, params) {
    try {
        console.log(`📤 Executando ${op}...`, params);
        const response = await jsonpFetch(op, params);
        if (response && response.status === 'success') {
            console.log("✅ Sucesso:", op);
            return response; // Retornar a resposta completa em caso de sucesso
        }
        console.warn("⚠️ Falha:", response);
        throw new Error(response.message || `Operação ${op} falhou.`);
    } catch (e) {
        console.error(`❌ Erro na operação ${op}:`, e);
        throw e; // Propaga o erro para quem chamou
    }
}


export const DataService = {
    
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

   // 3. ENVIAR (CREATE)
    sendBroadcast: async (payload) => {
        const fullPayload = {
            ...payload,
            date: new Date().toISOString(),
            id: Date.now().toString() 
        };
        return await _performOp('new_broadcast', fullPayload);
    },

    // 4. ATUALIZAR (UPDATE)
    updateBroadcast: async (id, payload) => {
        const fullPayload = { id, ...payload };
        return await _performOp('update_broadcast', fullPayload);
    },

    // 5. DELETAR (DELETE)
    deleteBroadcast: async (id) => {
        return await _performOp('delete_broadcast', { id });
    },
    
    // --- ANALYTICS VIA JSONP (A Correção) ---
    logEvent: (category, action, label = "", value = null) => {
        try {
            let user = "anon";
            try {
                const email = getAgentEmail(); 
                if (email) user = email.split('@')[0].toLowerCase();
            } catch(e){}

            // Prepara o payload
            const payload = {
                timestamp: new Date().toISOString(),
                user: user,
                version: "v5.1",
                category: category,
                action: action,
                label: label,
                value: value || ''
            };

            // USA O JSONP FETCH (Canal Seguro)
            // Não usamos await porque é "fire and forget" (não queremos travar a UI)
            jsonpFetch('log', payload).catch(e => {
                // Silencioso no console para não assustar o usuário, mas útil para debug
                // console.warn("Analytics não enviado:", e); 
            });

        } catch (err) {
            console.warn("Analytics error", err);
        }
    },

    logUsage: () => {} ,

    // Ler todos (GET)
    getUserSnippets: async (userEmail) => {
        try {
            return await jsonpFetch('get_user_snippets', { user: userEmail });
        } catch (e) {
            console.warn("Erro ao buscar snippets:", e);
            return null;
        }
    },

    // Salvar/Editar (CREATE/UPDATE)
    saveSnippet: async (snippet, userEmail) => {
        const payload = { 
            ...snippet, 
            user: userEmail 
        };
        // O ID é gerado/validado no backend se não vier
        return await _performOp('save_snippet', payload);
    },

    // Deletar (DELETE)
    deleteSnippet: async (id, userEmail) => {
        return await _performOp('delete_snippet', { id, user: userEmail });
    },
};

/**
 * Envia os dados do formulário BAU para o backend via JSONP.
 * @param {object} payload - Os dados do formulário a serem enviados.
 * @param {string} userEmail - O email do agente que está enviando.
 * @returns {Promise<any>} A promessa da operação de envio, retornando a resposta do servidor.
 */
export const sendBAUEscalation = (payload, userEmail) => {
    const fullPayload = {
        ...payload,
        user: userEmail,
        date: new Date().toISOString()
    };
    
    // A função agora retorna a promessa diretamente de _performOp para garantir
    // que a resposta do servidor seja propagada corretamente.
    return _performOp('create_bau_escalation', fullPayload);
};
