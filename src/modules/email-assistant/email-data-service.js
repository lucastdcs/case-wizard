// src/modules/email-assistant/email-data-service.js
import { EMAIL_TEMPLATES, hydrateEmailsFromContentCentral } from './email-data.js';

export const EmailDataService = {
    _templates: null,
    _hydrated: false,

    async getTemplates() {
        if (this._templates) return this._templates;

        // Busca o que está publicado na Central antes de devolver. A hidratação
        // reescreve EMAIL_TEMPLATES no lugar, então a referência abaixo continua
        // válida - e se a API falhar, o array segue com os modelos embutidos.
        //
        // Ao contrário dos outros módulos, aqui vale esperar: um e-mail montado
        // com o modelo velho e enviado antes da resposta chegar não tem desfazer.
        if (!this._hydrated) {
            this._hydrated = true;
            await hydrateEmailsFromContentCentral();
        }

        this._templates = EMAIL_TEMPLATES;
        return this._templates;
    }
};