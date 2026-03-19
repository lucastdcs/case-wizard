// src/modules/email-assistant/email-data-service.js

export const EmailDataService = {
    _templates: null,

    async getTemplates() {
        if (this._templates) return this._templates;

        try {
            // No ambiente do Chrome Extension / Bookmarklet, o caminho precisa ser absoluto ou relativo à base de carregamento
            // Mas seguindo a arquitetura do projeto, usaremos fetch para o JSON
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
        // Lógica para obter a URL do JSON (depende de como os arquivos são servidos)
        // Por enquanto, assumimos que está no mesmo diretório relativo
        return 'src/modules/email-assistant/email-templates.json';
    }
};
