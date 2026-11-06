// src/modules/configs/notetable-section.js
//
// Seção "Nota em tabela" de Configurações (módulo `notetable`, ADR-0024): o tipo de
// nota em que o módulo abre (ALL TASKS, ECL SBS-E, ECL MMS ou o último usado) e o
// fluxo padrão (BAU ou LM). Quem usa ECL todo dia escolhe aqui e nunca mais abre a
// linha "Nota" para isso (spec workflow/case-note-table.md §9).
//
// Preferência do agente, não catálogo: vive em UserPrefsService (cache local na
// hora, nuvem depois), como os favoritos do Links. Os botões reusam o visual do
// seletor de idioma desta mesma tela (.cw-lang-toggle).

import { SoundManager } from "../shared/sound-manager.js";
import { UserPrefsService } from "../shared/user-prefs-service.js";
import { getLanguage } from "../shared/i18n.js";
import {
    PREF_DEFAULT_SEGMENT, PREF_DEFAULT_FLOW, readSegmentPref, readFlowPref,
} from "../notes-table/note-table-prefs.js";

const DICT = {
    pt: {
        title: "Nota em tabela",
        segLabel: "Abrir em",
        segDesc: "O tipo de nota que a Nota em tabela mostra ao abrir. \"Último\" retoma o que você usou por último.",
        flowLabel: "Fluxo padrão",
        flowDesc: "BAU ou LM ao abrir. Você ainda troca na linha \"Nota\".",
        last: "Último",
        saved: "Preferência salva.",
    },
    es: {
        title: "Nota en tabla",
        segLabel: "Abrir en",
        segDesc: "El tipo de nota que muestra Nota en tabla al abrirse. \"Último\" retoma el que usó por última vez.",
        flowLabel: "Flujo predeterminado",
        flowDesc: "BAU o LM al abrir. Igual puede cambiarlo en la fila \"Nota\".",
        last: "Último",
        saved: "Preferencia guardada.",
    },
    en: {
        title: "Table note",
        segLabel: "Open in",
        segDesc: "The note type Table note shows when it opens. \"Last\" picks up the one you used last.",
        flowLabel: "Default flow",
        flowDesc: "BAU or LM when it opens. You can still switch it in the \"Note\" row.",
        last: "Last",
        saved: "Preference saved.",
    },
};
const tt = (k) => (DICT[getLanguage()] || DICT.pt)[k] || DICT.pt[k];

export function createNoteTableSection() {
    const section = document.createElement("div");
    section.className = "cw-configs-section";
    section.innerHTML = `
        <div class="cw-configs-section-title js-nt-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-nt-seg-label"></div>
                    <div class="cw-configs-desc js-nt-seg-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-nt-segment" role="group">
                    <button type="button" data-v="all">ALL</button>
                    <button type="button" data-v="sbse">SBS-E</button>
                    <button type="button" data-v="mms">MMS</button>
                    <button type="button" data-v="last" class="js-nt-last"></button>
                </div>
            </div>
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-nt-flow-label"></div>
                    <div class="cw-configs-desc js-nt-flow-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-nt-flow" role="group">
                    <button type="button" data-v="bau">BAU</button>
                    <button type="button" data-v="lm">LM</button>
                </div>
            </div>
        </div>
    `;
    const segGroup = section.querySelector("#cw-config-nt-segment");
    const flowGroup = section.querySelector("#cw-config-nt-flow");

    function sync() {
        const seg = readSegmentPref();
        const flow = readFlowPref();
        segGroup.querySelectorAll("button").forEach((b) => {
            b.classList.toggle("active", b.dataset.v === seg);
            b.setAttribute("aria-pressed", String(b.dataset.v === seg));
        });
        flowGroup.querySelectorAll("button").forEach((b) => {
            b.classList.toggle("active", b.dataset.v === flow);
            b.setAttribute("aria-pressed", String(b.dataset.v === flow));
        });
    }

    // Decisão síncrona (o cache local já mudou quando set() retorna), nuvem em segundo plano.
    const bind = (group, key) => group.querySelectorAll("button").forEach((b) => {
        b.onclick = () => {
            UserPrefsService.set(key, b.dataset.v).catch((e) => console.warn("Preferência da Nota em tabela não sincronizou", e));
            sync();
            SoundManager.playClick();
        };
    });
    bind(segGroup, PREF_DEFAULT_SEGMENT);
    bind(flowGroup, PREF_DEFAULT_FLOW);

    section.applyTexts = () => {
        section.querySelector(".js-nt-title").textContent = tt("title");
        section.querySelector(".js-nt-seg-label").textContent = tt("segLabel");
        section.querySelector(".js-nt-seg-desc").textContent = tt("segDesc");
        section.querySelector(".js-nt-flow-label").textContent = tt("flowLabel");
        section.querySelector(".js-nt-flow-desc").textContent = tt("flowDesc");
        section.querySelector(".js-nt-last").textContent = tt("last");
        sync();
    };
    section.refresh = sync;
    section.applyTexts();
    return section;
}
