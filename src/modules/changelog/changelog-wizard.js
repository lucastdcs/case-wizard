// src/modules/changelog/changelog-wizard.js
//
// Modal "o que mudou nesta versão". Divide a casca de slides com o
// Onboarding (shared/wizard-shell.js); aqui fica só a decisão de mostrar ou
// não, e o texto do release (changelog-data.js).

import { showToast } from "../shared/utils.js";
import { openWizardShell } from "../shared/wizard-shell.js";
import { RELEASE_NOTES } from "./changelog-data.js";
import { getLanguage } from "../shared/i18n.js";

const LAST_VERSION_KEY = "cw_last_version";

// O conteúdo de cada release (RELEASE_NOTES) ainda é só PT — texto editorial
// por versão, deliberadamente fora do escopo da rodada de i18n (vai junto com
// a tradução do conteúdo do Notes numa fase seguinte). Só o texto fixo do
// wizard em si é traduzido aqui; o resto da casca traduz a si mesma.
const CHANGELOG_DICT = {
    pt: {
        updateBadge: (version) => `Atualização ${version}`,
        nextBtn: "Próximo",
        doneBtn: "Entendi, vamos lá! 👍",
        updatedToast: (version) => `Case Wizard atualizado para ${version}!`,
    },
    es: {
        updateBadge: (version) => `Actualización ${version}`,
        nextBtn: "Siguiente",
        doneBtn: "¡Entendido, vamos! 👍",
        updatedToast: (version) => `¡Case Wizard actualizado a ${version}!`,
    },
};

function ct(key) {
    const lang = getLanguage();
    return CHANGELOG_DICT[lang]?.[key] ?? CHANGELOG_DICT.pt[key];
}

/**
 * Decide se o modal de novidades deve aparecer neste boot.
 *
 * @param {string} currentAppVersion APP_VERSION de src/app.js.
 */
export function checkAndShowChangelog(currentAppVersion) {
    const lastSeenVersion = localStorage.getItem(LAST_VERSION_KEY);

    // Usuário novo: não tem o que "mudou" pra contar. Grava a versão em
    // silêncio e sai - quem apresenta o app pra essa pessoa é o Onboarding.
    if (!lastSeenVersion) {
        localStorage.setItem(LAST_VERSION_KEY, currentAppVersion);
        return;
    }

    if (lastSeenVersion === currentAppVersion) return;

    // Guarda contra o descompasso que já aconteceu na prática: se o
    // APP_VERSION subiu mas o changelog-data.js ficou pra trás, o modal
    // apareceria com o selo da versão nova e o conteúdo da anterior. Melhor
    // não mostrar nada do que mostrar informação errada - mas o aviso no
    // console deixa claro pra quem está desenvolvendo que faltou atualizar.
    if (RELEASE_NOTES.version !== currentAppVersion) {
        console.warn(
            `[changelog] APP_VERSION é ${currentAppVersion} mas RELEASE_NOTES.version é ` +
            `${RELEASE_NOTES.version}. Modal suprimido até os dois baterem ` +
            `(veja src/modules/changelog/changelog-data.js).`
        );
        localStorage.setItem(LAST_VERSION_KEY, currentAppVersion);
        return;
    }

    initChangelogModal(currentAppVersion);
}

function initChangelogModal(version) {
    // A versão só é gravada no fechamento: se a pessoa fechar a aba no meio,
    // ela merece rever o que mudou no próximo boot. É o oposto da regra do
    // Onboarding (que grava na abertura) e de propósito - aqui o conteúdo é
    // informação que se perde, lá é uma apresentação que cansa se repetir.
    openWizardShell({
        slides: RELEASE_NOTES.slides,
        idPrefix: "cw-changelog",
        badge: ct("updateBadge")(version),
        nextLabel: ct("nextBtn"),
        finalLabel: ct("doneBtn"),
        // Sem "Pular": são poucos slides e é a única vez que essa informação
        // aparece. Esc ainda fecha, e os dots deixam ir direto ao fim.
        onClose: () => {
            localStorage.setItem(LAST_VERSION_KEY, version);
            showToast(ct("updatedToast")(version));
        }
    });
}
