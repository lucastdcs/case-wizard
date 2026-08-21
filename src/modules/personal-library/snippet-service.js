// src/modules/personal-library/snippet-service.js

import { DataService } from "../shared/data-service.js";
import { getAgentEmail } from "../shared/page-data.js";
import { showToast } from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";

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
            SoundManager.playError();
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
            updated: now,
            _pendingSync: true // otimista até a nuvem confirmar (ou não) logo abaixo
        };

        // Remove versão antiga se existir (Update) ou adiciona (Create)
        const updatedList = localData.filter(s => s.id !== newSnippet.id);
        updatedList.unshift(newSnippet); // Adiciona no topo

        SnippetService._saveToLocal(updatedList);

        // B. Envia para Nuvem (Async)
        let synced = false;
        try {
            synced = await DataService.saveSnippet(newSnippet, userEmail);
            if (synced) {
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

        // Grava se a sincronia realmente confirmou ou não — _pendingSync é o
        // que impede _syncWithServer() de descartar esse item do cache local
        // caso a resposta do servidor ainda não o inclua (ver nota lá embaixo).
        newSnippet._pendingSync = !synced;
        const finalList = SnippetService._loadFromLocal().filter(s => s.id !== newSnippet.id);
        finalList.unshift(newSnippet);
        SnippetService._saveToLocal(finalList);

        return { ...newSnippet, synced };
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

            // O servidor é a verdade absoluta pra tudo que ele já conhece —
            // mas um item local com _pendingSync (a última tentativa de save
            // dele falhou) não pode ser descartado só porque ainda não
            // aparece na resposta do servidor. Sobrescrever a lista local
            // inteira pela do servidor apagava exatamente esses itens assim
            // que a próxima sincronia de fundo rodava (ex: ao trocar de aba).
            const pendingLocal = localData.filter(s => s._pendingSync);
            const merged = [...pendingLocal, ...serverData];

            const mergedJSON = JSON.stringify(merged);
            const localJSON = JSON.stringify(localData);

            if (mergedJSON !== localJSON) {
                console.log("📥 Atualização encontrada! Atualizando cache.");
                SnippetService._saveToLocal(merged);

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