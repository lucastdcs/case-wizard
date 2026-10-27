// src/precall-standalone.js
//
// Entrada do build avulso do Pre-call Checklist (`npm run build:precall`, ADR-0020):
// só a raspagem do caso e o formulário, para entregar a quem não usa o app
// completo. Sem pílula, sem splash, sem Ctrl+K, sem os outros módulos e sem
// backend. O formulário abre direto; fechar e clicar no favorito de novo reabre.

import './trusted-types-default.js'; // PRIMEIRO: os imports abaixo já usam innerHTML ao carregar
import { initGlobalStylesAndFont } from './modules/shared/utils.js';
import { isModuleOpen } from './modules/shared/animations.js';
import { setLanguage, isSupportedLang } from './modules/shared/i18n.js';
import { initPrecallChecklist } from './modules/notes/precall/precall-checklist.js';

const POPUP_ID = 'cw-precall-popup';

// Sem o perfil da People para dizer o idioma, vale o do navegador. `persist: false`
// é o mesmo caminho do perfil: nunca atropela uma escolha manual já salva.
function applyBrowserLanguage() {
    const lang = String(navigator.language || '').slice(0, 2).toLowerCase();
    if (isSupportedLang(lang)) setLanguage(lang, { persist: false });
}

function launch() {
    // Com o app completo na página, o Pre-call dele já existe (e o mesmo id de
    // janela não pode aparecer duas vezes): abre o dele.
    if (window.techSolInitialized) {
        document.getElementById('cw-btn-precall')?.click();
        return;
    }

    const toggle = window.cwPrecallStandalone;
    if (toggle) {
        // Segundo clique com a janela aberta relê a tela do caso: fecha e abre,
        // porque é a abertura que dispara a captura.
        if (isModuleOpen(document.getElementById(POPUP_ID))) toggle();
        toggle();
        return;
    }

    initGlobalStylesAndFont();
    applyBrowserLanguage();
    window.cwPrecallStandalone = initPrecallChecklist();
    window.cwPrecallStandalone();
}

launch();
