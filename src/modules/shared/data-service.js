// src/modules/shared/data-service.js

import { getAgentEmail } from './page-data.js'; 

const API_URL = "https://script.google.com/a/macros/google.com/s/AKfycby8htUKUI8dTNYBzsP-sObooNJIUi0ZepxbOaky5vRBcbbiwsItWB1KCRaXXuSIrP0DYw/exec";

function jsonpFetch(operation, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = 'cw_cb_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');
        
        window[callbackName] = (data) => {
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
            if (document.body.contains(script)) document.body.removeChild(script);
            delete window[callbackName];
            reject(new Error("JSONP Error"));
        };

        document.body.appendChild(script);
    });
}

async function _performOp(op, params) {
    try {
        console.log(`📤 Executando ${op}...`, params);
        const response = await jsonpFetch(op, params);
        if (response && response.status === 'success') {
            console.log("✅ Sucesso:", op);
            return response;
        }
        console.warn("⚠️ Falha:", response);
        throw new Error(response.message || `Operação ${op} falhou.`);
    } catch (e) {
        console.error(`❌ Erro na operação ${op}:`, e);
        throw e;
    }
}

export const sendBAUEscalation = (payload, userEmail) => {
    const fullPayload = {
        ...payload,
        user: userEmail,
        date: new Date().toISOString()
    };
    // CORREÇÃO: Usando a operação 'create_bau' conforme o backend
    return _performOp('create_bau', fullPayload);
};

export const readAgentBAU = async () => {
    const agentEmail = getAgentEmail();
    if (!agentEmail) {
        console.error("Não foi possível obter o email do agente para buscar os casos BAU.");
        return []; // Retorna um array vazio se o email não for encontrado
    }
    const response = await _performOp('read_agent_bau', { user: agentEmail });
    // O backend retorna { status: 'success', cases: [...] }
    return response.cases || []; 
};

// Demais funções do DataService (inalteradas)
export const DataService = { /* ... */ };