// src/modules/notes/drafts/draft-service.js

const STORAGE_KEY = "cw_notes_parking_lot";
const EMERGENCY_KEY = "cw_notes_emergency_save"; // <--- NOVO
const MAX_DRAFTS = 5;

// O mesmo serviço com chaves próprias. Existe para a nota em tabela (módulo
// `notetable`, ADR-0024) ter rascunhos SEPARADOS dos do Case Notes: os dois
// módulos não leem o rascunho um do outro. O DraftService abaixo é esta fábrica
// com as chaves de sempre, então o Case Notes guarda e lê exatamente onde guardava.
export function createDraftService({ storageKey, emergencyKey, maxDrafts = MAX_DRAFTS }) {
    const service = {
        // --- MÉTODOS DE RASCUNHO (Existentes) ---
        getAll: () => {
            try {
                return JSON.parse(localStorage.getItem(storageKey) || "[]");
            } catch (e) { return []; }
        },

        save: (data) => {
            const drafts = service.getAll();
            const newDraft = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...data
            };
            drafts.unshift(newDraft);
            if (drafts.length > maxDrafts) drafts.pop();
            localStorage.setItem(storageKey, JSON.stringify(drafts));
            return newDraft;
        },

        delete: (id) => {
            let drafts = service.getAll();
            drafts = drafts.filter(d => d.id !== id);
            localStorage.setItem(storageKey, JSON.stringify(drafts));
            return drafts;
        },

        getCount: () => {
            return service.getAll().length;
        },

        // --- NOVO: MÉTODOS DE EMERGÊNCIA (AIRBAG) ---
        saveEmergency: (data) => {
            const payload = {
                timestamp: Date.now(),
                data: data
            };
            localStorage.setItem(emergencyKey, JSON.stringify(payload));
        },

        getEmergency: () => {
            try {
                const raw = localStorage.getItem(emergencyKey);
                if (!raw) return null;
                const parsed = JSON.parse(raw);

                // Validade de 12 horas (evita restaurar coisas muito velhas)
                if (Date.now() - parsed.timestamp > 12 * 60 * 60 * 1000) {
                    localStorage.removeItem(emergencyKey);
                    return null;
                }
                if (!parsed.data || !parsed.data.subStatus) {
                    return null;
                }
                return parsed.data;
            } catch (e) { return null; }
        },

        clearEmergency: () => {
            localStorage.removeItem(emergencyKey);
        }
    };
    return service;
}

export const DraftService = createDraftService({ storageKey: STORAGE_KEY, emergencyKey: EMERGENCY_KEY });
