// src/modules/personal-library/snippet-service.js

import { DataService } from "../shared/data-service.js";
import { getAgentEmail } from "../shared/page-data.js";
import { showToast } from "../shared/utils.js";

const STORAGE_KEY = "cw_personal_library_v1";

// 🔒 Variável de bloqueio (Resolve o "Efeito Zumbi")
let isMutating = false;

export const SnippetService = {
    
    // --- 1. LEITURA (CACHE-FIRST) ---
    getSnippets: (type = 'all') => {
        // A. Retorno Imediato (Cache)
        const localData = SnippetService._loadFromLocal();
        
        // B. Sincronia em Background (Fire & Forget)
        // Só roda se tivermos um email de usuário válido
        const userEmail = getAgentEmail();

        // Só sincroniza se tivermos email E NÃO estivermos salvando/deletando nada agora
        if (userEmail && userEmail.includes('@') && !isMutating) {
            SnippetService._syncWithServer(userEmail);
        }

        // Retorna filtrado
        if (type === 'all') return localData;
        return localData.filter(s => s.type === type);
    },

    // --- 2. ESCRITA (OTIMISTA) ---
    save: async (snippet) => {
        const userEmail = getAgentEmail();
        if (!userEmail) {
            showToast("Erro: Usuário não identificado.", { error: true });
            return false;
        }

        isMutating = true; // Fecha o cadeado da sincronização

        // A. Salva Localmente (Feedback Instantâneo)
        const localData = SnippetService._loadFromLocal();
        const now = new Date().toISOString();
        
        const newSnippet = {
            id: snippet.id || ("local_" + Date.now()), // ID temporário se for novo
            type: snippet.type || 'general',
            title: snippet.title || 'Sem título',
            content: snippet.content || '',
            subject: snippet.subject || '',
            isCode: snippet.isCode || false,
            isRich: snippet.isRich || false,
            updated: now
        };

        // Remove versão antiga se existir (Update) ou adiciona (Create)
        const updatedList = localData.filter(s => s.id !== newSnippet.id);
        updatedList.unshift(newSnippet); // Adiciona no topo
        
        SnippetService._saveToLocal(updatedList);

        // B. Envia para Nuvem (Async)
        try {
            const success = await DataService.saveSnippet(newSnippet, userEmail);
            if (success) {
                console.log("☁️ Snippet salvo na nuvem!");
            } else {
                console.warn("⚠️ Falha ao salvar na nuvem. Dados apenas locais.");
            }
        } catch (e) {
            console.error("Erro na nuvem:", e);
        } finally {
            // Abre o cadeado 2 segundos após a nuvem responder
            setTimeout(() => { isMutating = false; }, 2000);
        }

        return newSnippet;
    },

    delete: async (id) => {
        const userEmail = getAgentEmail();

        isMutating = true; // Fecha o cadeado da sincronização

        // A. Remove Localmente
        const localData = SnippetService._loadFromLocal();
        const updatedList = localData.filter(s => s.id !== id);
        SnippetService._saveToLocal(updatedList);

        // B. Remove da Nuvem
        if (userEmail) {
            DataService.deleteSnippet(id, userEmail).then(() => {
                // Abre o cadeado 2 segundos após a nuvem responder
                setTimeout(() => { isMutating = false; }, 2000);
            });
        } else {
            isMutating = false;
        }
        return true;
    },

    // --- 3. CORE DE SINCRONIA ---
    _syncWithServer: async (userEmail) => {
        // Evita flood de requisições: só busca no servidor a cada 30 segundos
        if (window._cw_library_syncing) return;
        window._cw_library_syncing = true;
        setTimeout(() => { window._cw_library_syncing = false; }, 30000);

        console.log("🔄 Sincronizando biblioteca...");
        
        const response = await DataService.getUserSnippets(userEmail);
        
        if (response && response.status === 'success' && Array.isArray(response.snippets)) {
            const serverData = response.snippets;
            const localData = SnippetService._loadFromLocal();
            
            // Comparação simples: Se o tamanho ou o timestamp do mais recente mudou
            // (Para uma sincronia real bidirecional precisaríamos de lógica de merge, 
            // mas aqui assumimos que o Server é a verdade absoluta em caso de conflito)
            
            const serverJSON = JSON.stringify(serverData);
            const localJSON = JSON.stringify(localData);

            if (serverJSON !== localJSON) {
                console.log("📥 Atualização encontrada! Atualizando cache.");
                SnippetService._saveToLocal(serverData);
                
                // Dispara evento para a UI se atualizar (Opcional, se a UI for reativa)
                // window.dispatchEvent(new Event('cw_library_updated'));
            }
        }
    },

    // --- HELPERS LOCALSTORAGE ---
    _loadFromLocal: () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch (e) { return []; }
    },

    _saveToLocal: (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};