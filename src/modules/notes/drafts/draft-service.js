// src/modules/notes/drafts/draft-service.js

const STORAGE_KEY = "cw_notes_parking_lot";
const EMERGENCY_KEY = "cw_notes_emergency_save"; // <--- NOVO
const MAX_DRAFTS = 5;

export const DraftService = {
    // --- MÉTODOS DE RASCUNHO (Existentes) ---
    getAll: () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch (e) { return []; }
    },

    save: (data) => {
        const drafts = DraftService.getAll();
        const newDraft = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data
        };
        drafts.unshift(newDraft);
        if (drafts.length > MAX_DRAFTS) drafts.pop();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
        return newDraft;
    },

    delete: (id) => {
        let drafts = DraftService.getAll();
        drafts = drafts.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
        return drafts;
    },

    getCount: () => {
        return DraftService.getAll().length;
    },

    // --- NOVO: MÉTODOS DE EMERGÊNCIA (AIRBAG) ---
    saveEmergency: (data) => {
        const payload = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(EMERGENCY_KEY, JSON.stringify(payload));
    },

    getEmergency: () => {
        try {
            const raw = localStorage.getItem(EMERGENCY_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            
            // Validade de 12 horas (evita restaurar coisas muito velhas)
            if (Date.now() - parsed.timestamp > 12 * 60 * 60 * 1000) {
                localStorage.removeItem(EMERGENCY_KEY);
                return null;
            }
            if (!parsed.data || !parsed.data.subStatus) {
                return null;
            }
            return parsed.data;
        } catch (e) { return null; }
    },

    clearEmergency: () => {
        localStorage.removeItem(EMERGENCY_KEY);
    }
};