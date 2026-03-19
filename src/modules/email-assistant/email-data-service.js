// src/modules/email-assistant/email-data-service.js

export const EmailDataService = {
    _templates: null,

    async getTemplates() {
        if (this._templates) return this._templates;

        try {
            const response = await fetch(this._getJsonUrl());
            if (!response.ok) throw new Error('Falha ao carregar templates de e-mail');

            this._templates = await response.json();
            return this._templates;
        } catch (error) {
            console.error('EmailDataService Error:', error);
            return [];
        }
    },

    _getJsonUrl() {
        // Corrige o caminho para funcionar em ambiente de Extensão Chrome
        try {
            return chrome.runtime.getURL('src/modules/email-assistant/email-templates.json');
        } catch (error) {
            // Fallback para ambiente de desenvolvimento ou bookmarklet
            return 'src/modules/email-assistant/email-templates.json';
        }
    }
};
