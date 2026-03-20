// src/modules/email-assistant/email-data-service.js
import { EMAIL_TEMPLATES } from './email-data.js';

export const EmailDataService = {
    _templates: null,

    async getTemplates() {
        if (this._templates) return this._templates;

        // Agora, em vez de buscar o JSON, usamos o objeto importado diretamente.
        this._templates = EMAIL_TEMPLATES;
        return this._templates;
    }
};
