// src/modules/shared/user-prefs-service.js
//
// Preferências do agente que precisam seguir a pessoa, não o navegador.
//
// Mesmo desenho da Biblioteca Pessoal (snippet-service.js): lê do cache local
// na hora (a tela nunca espera a rede) e sincroniza com a planilha em segundo
// plano. A diferença é que aqui é UM blob por agente, não uma lista - o que
// cabe numa linha só e numa query string de JSONP.
//
// Por que não localStorage puro: o Case Wizard é um bookmarklet injetado no
// CRM. Trocar de máquina ou de perfil do Chrome é rotina, e é exatamente aí que
// perder a configuração custa mais caro. Ver docs/decisions/0002.

import { DataService } from "./data-service.js";
import { getAgentEmail } from "./page-data.js";

const STORAGE_KEY = "cw_user_prefs_v1";

// Enquanto uma escrita está em voo, a sincronia de leitura não pode sobrescrever
// o que acabou de ser salvo localmente - mesmo "cadeado" que a Biblioteca usa.
let isMutating = false;
let syncPromise = null;

function loadLocal() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
        return {};
    }
}

function saveLocal(prefs) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
        console.warn("Não consegui gravar as preferências localmente:", e);
    }
}

export const UserPrefsService = {
    // Leitura síncrona: sempre do cache. Quem quiser o dado fresco da nuvem
    // chama sync(); as telas releem a lista ao abrir.
    get(key, fallback = null) {
        const prefs = loadLocal();
        return key in prefs ? prefs[key] : fallback;
    },

    // Escrita otimista: grava local e devolve na hora; a nuvem confirma depois.
    // Devolve { saved, synced } pra quem quiser avisar o usuário que ficou só
    // local (ex: sem e-mail capturado ainda).
    async set(key, value) {
        const prefs = loadLocal();
        prefs[key] = value;
        saveLocal(prefs);

        const userEmail = getAgentEmail();
        if (!userEmail) return { saved: true, synced: false };

        isMutating = true;
        let synced = false;
        try {
            synced = await DataService.saveUserPrefs(prefs, userEmail);
        } catch (e) {
            console.warn("Falha ao salvar preferências na nuvem:", e);
        } finally {
            // Mesma folga de 2s da Biblioteca: dá tempo da planilha refletir a
            // escrita antes de uma leitura de fundo poder sobrescrever o local.
            setTimeout(() => { isMutating = false; }, 2000);
        }
        return { saved: true, synced };
    },

    // Busca o blob da nuvem e adota o que vier, exceto se houver escrita em voo.
    // Chamada uma vez no boot; deduplicada porque vários módulos a pedem.
    sync() {
        if (syncPromise) return syncPromise;

        syncPromise = (async () => {
            const userEmail = getAgentEmail();
            if (!userEmail) return loadLocal();

            try {
                const remote = await DataService.getUserPrefs(userEmail);
                if (remote && typeof remote === "object" && !isMutating) {
                    const local = loadLocal();
                    if (JSON.stringify(remote) !== JSON.stringify(local)) {
                        saveLocal(remote);
                    }
                }
            } catch (e) {
                console.warn("Preferências indisponíveis; seguindo com o cache local.", e);
            } finally {
                // Uma nova chamada depois desta pode querer buscar de novo (ex:
                // o e-mail do agente só ficou disponível agora).
                syncPromise = null;
            }
            return loadLocal();
        })();

        return syncPromise;
    },
};
