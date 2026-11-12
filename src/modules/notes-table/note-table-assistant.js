// src/modules/notes-table/note-table-assistant.js
//
// Módulo `notetable`: a nota do caso como as TABELAS do padrão novo (ADR-0022),
// ao lado do Case Notes de sempre, que continua vivo e intocado (ADR-0024).
//
// Contrato: specs/workflow/case-note-table.md (§5 a §9). Desenho:
// specs/ui-ux/design-system.md, "Case Notes em tabela: a tela". As regras moram em
// note-table-model.js (puro, testado por test:note-table); aqui só a tela.
//
// Reaproveitado do Case Notes POR IMPORT, sem editar: o seletor de tasks e os
// prints por task (step-tasks.js, alimentado por uma instância própria de
// NotesState), o catálogo de tasks, a captura do CRM, o insertHTML, o Split &
// Transfer, os cenários (getScenariosFor) e a automação de e-mail. Estado,
// rascunhos e preferências são deste módulo: ele não lê o que o antigo guarda.

import { NotesState } from "../notes/core/notes-state.js";
import { createStepTasksComponent } from "../notes/components/step-tasks.js";
import { loadTasks } from "../notes/data/tasks-service.js";
import {
    TASKS_DB, translations, SUBSTATUS_TEMPLATES, SUBSTATUS_SHORTCODES,
    getScenariosFor, getScenarioFields, scenarioSnippets, scenarioLabel,
} from "../notes/data/notes-data.js";
import { createSplitTransferComponent } from "../notes/components/split-transfer.js";
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from "../notes/notes-bridge.js";
import { fetchAndInsertSpeakeasyId } from "../notes/automation/case-log-scraper.js";
import { createDraftService } from "../notes/drafts/draft-service.js";
import { runEmailAutomation } from "../email-assistant/email-automation-service.js";
import { triggerProcessingAnimation, registerCaseCompleted } from "../shared/command-center.js";
import { toggleGenieAnimation, isModuleOpen } from "../shared/animations.js";
import { stylePopup, styleResizeHandle, makeResizable, showToast, confirmDialog } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { captureCID, captureSalesProgram, captureLanguage, getCaseId } from "../shared/page-data.js";
import { lerCampo, lerCampoTodos } from "../shared/crm-labels.js";
import { getLanguage, onLanguageChange, getOutputLanguage, onOutputLanguageChange } from "../shared/i18n.js";
import { openSegment, readFlowPref, rememberSegment } from "./note-table-prefs.js";
import { SoundManager } from "../shared/sound-manager.js";
import { AUTHOR_CREDIT } from "../shared/config.js";
import * as M from "./note-table-model.js";
import { renderNoteHtml } from "./note-table-render.js";
import { getNoteCatalog, loadNoteCatalog } from "./note-table-service.js";
import { injectNoteTableStyles } from "./note-table-styles.js";
import { ntt } from "./note-table-i18n.js";
import { blockHelp, helpLabels } from "./note-table-help.js";

export const NOTE_TABLE_POPUP_ID = "cw-notetable-popup";
export const NOTE_TABLE_BUTTON_ID = "cw-btn-notetable";

const drafts = createDraftService({ storageKey: "cw_notetable_parking_lot", emergencyKey: "cw_notetable_emergency_save" });

// Sub-status oficial → chave do SUBSTATUS_TEMPLATES antigo, que é por onde vêm os
// cenários (getScenariosFor) e o código do e-mail (SUBSTATUS_SHORTCODES). Os dois
// nomes que divergem do arquivo Status estão listados na spec §7.
const OLD_KEY_ALIASES = {
    "SO - Educational Only": "SO_Education_Only",
    "IN - Out of Scope - Rerouted": "IN_Out_of_Scope_Rerouted",
};
function oldKeyOf(substatus) {
    if (OLD_KEY_ALIASES[substatus]) return OLD_KEY_ALIASES[substatus];
    const hit = Object.entries(SUBSTATUS_TEMPLATES).find(([, v]) => v.name === substatus);
    return hit ? hit[0] : null;
}

// Grupos do seletor (nomes do CRM, não se traduzem).
const GROUP_NAME = { NI: "Need Info", SO: "Solution Offered", IN: "Inactive", AS: "Assigned", DC: "Discarded" };
const SUB_GROUPS = ["NI", "SO", "IN", "AS", "DC"].map((k) => [GROUP_NAME[k], M.SUBSTATUS_RULES.filter((s) => s[0].startsWith(k + " ")).map((s) => s[0])]);

// Nomes curtos dos blocos (nomes do padrão, em inglês nos três idiomas).
const SHORT = {
    general: "General details", before: "Before implementation", impl: "Implementation", after: "After implementation",
    consult: "Consult routing path", audit: "Readiness audit", impl_call: "Implementation call", interim: "Interim check-ins",
    triage: "Initial triage", eligibility: "Eligibility verification", extras: "Additional details",
};
// A pergunta do Tag Support decide os prints de ACT/ECW, então o FORMULÁRIO a mostra num
// cartão próprio e destacado, antes de qualquer bloco ou print (Lucas, 2026-11-12). Só a
// ordem da tela muda: as linhas seguem no bloco `extras`, e a nota sai como sempre.
const TS_ROWS = ["ts_used", "ts_reason"];

const CHIP = {
    "all.before": "Before", "all.impl": "Implementation", "all.after": "After", "all.consult": "Consult",
    "sbse.audit": "Phase 1 · Audit", "sbse.impl_call": "Phase 2 · Impl. call", "sbse.interim": "Interim",
    "mms.triage": "Phase 0 · Triage", "mms.eligibility": "Phase 1 · Eligibility", "mms.audit": "Phase 2 · Audit",
    "mms.impl_call": "Phase 3 · Pre-impl.", "mms.interim": "Interim",
};
const AUTO_SHORT = { date: "Date", next_followup: "Follow-up", cid: "CID", consent: "Consent" };
const TSHORT = { ads_conversion_tracking: "ACT", ads_enhanced_conversions: "ECW", ga4_event_tracking: "GA4", gtm_installation: "GTM" };
const MAX_CIDS = 6;

const IC = {
    chev: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    checkc: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    cmt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>',
    cmtOn: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
    split: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>',
};

// ---- utilidades de DOM (o texto do agente entra por textContent, nunca por innerHTML) ----
function h(tag, attrs = {}, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === "class") e.className = v;
        else if (k === "style") e.style.cssText = v;
        else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
        else if (v === true) e.setAttribute(k, "");
        else if (v !== false && v != null) e.setAttribute(k, v);
    }
    for (const c of kids.flat()) {
        if (c == null || c === false) continue;
        e.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return e;
}
function ico(name) {
    const t = document.createElement("template");
    t.innerHTML = IC[name].trim();
    return t.content.firstChild;
}
const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Idioma da nota pelo `Business language` do CRM (já lido por captureLanguage).
function crmLangToCode(value) {
    const v = norm(value);
    if (!v || v === "n a") return null;
    if (/\bportu|\bpt\b/.test(v)) return "pt";
    if (/\bspan|\bespan|\bes\b/.test(v)) return "es";
    if (/\bengl|\bingl|\ben\b/.test(v)) return "en";
    return null;
}

const autosize = (t) => { t.style.height = "auto"; t.style.height = Math.max(44, t.scrollHeight) + "px"; };

export function initNoteTable() {
    const VERSION = "v1.0.0";
    injectNoteTableStyles();

    // ---- estado ----
    let catalog = getNoteCatalog();
    let st = M.createNoteState();
    // O idioma da NOTA é o idioma do atendimento (vem do CRM): não é estado de
    // formulário, então fica fora do reset() (learning 2026-10-29).
    let noteLang = getOutputLanguage();
    let noteLangManual = false;
    const ui = { helpBlock: null, ctxOpen: false, autoOpen: false, more: {}, drawer: false, showPending: false, pick: false, tasksOpen: false, tasksAuto: false, scenOpen: false, draftsOpen: false, pi: 0, split: false, blocksTouched: false };
    const cap = { caseKey: null, cid: "", salesProgram: "", capturing: false, restoredChecked: false };
    let visible = false;
    let emailAuto = true;

    // ---- adaptador do step-tasks (uma instância PRÓPRIA de NotesState, com a forma que o componente lê) ----
    const tasksState = new NotesState();
    tasksState.currentLang = noteLang;
    const tOld = (key) => (translations[getLanguage()] || translations.pt)[key] || translations.pt[key] || key;
    const stepTasks = createStepTasksComponent(() => onTasksChanged(), tOld, tasksState);
    tasksState.subscribe(() => {
        const forced = [...tasksState.forcedScreenshots];
        if (JSON.stringify(forced) !== JSON.stringify(st.forced)) { st.forced = forced; dirty(); render(); }
    });

    // ---- casca: popup = palco (a gaveta sai pela esquerda), .nt-win = a janela ----
    const popup = h("div", { id: NOTE_TABLE_POPUP_ID, class: "cw-module-window" });
    Object.assign(popup.style, stylePopup, {
        right: "100px", width: "560px", height: "760px", overflow: "visible",
        backgroundColor: "transparent", boxShadow: "none", backdropFilter: "none", webkitBackdropFilter: "none", borderRadius: "20px",
    });
    const win = h("section", { class: "nt-win", role: "dialog", "aria-label": ntt("title") });
    win.style.boxShadow = "0 20px 40px rgba(0,0,0,.12)";
    const animRefs = { popup, googleLine: null };
    const header = createStandardHeader(popup, ntt("title"), VERSION, ntt("help"), animRefs, () => toggleVisibility());
    header.style.flex = "none";

    const splitBtn = h("div", { class: "nt-hbtn no-drag", role: "button", tabindex: "0", title: ntt("split"), "aria-label": ntt("split"), onclick: (e) => { e.stopPropagation(); toggleSplit(); } }, ico("split"));
    const draftsBtn = h("div", { class: "nt-hbtn no-drag", role: "button", tabindex: "0", title: ntt("drafts"), "aria-label": ntt("drafts"), onclick: (e) => { e.stopPropagation(); ui.draftsOpen = !ui.draftsOpen; renderDrafts(); } }, ico("history"));
    [splitBtn, draftsBtn].forEach((b) => b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); b.click(); } }));
    const headerActions = header.lastElementChild;
    if (headerActions) { headerActions.insertBefore(draftsBtn, headerActions.firstChild); headerActions.insertBefore(splitBtn, headerActions.firstChild); }

    const sticky = h("button", { class: "nt-sticky", type: "button", "aria-label": ntt("stickyAria") });
    const pTxt = h("span");
    const pNext = h("button", { class: "nt-btn sm", type: "button" });
    const pNa = h("button", { class: "nt-btn sm t", type: "button" });
    const pbar = h("div", { class: "nt-pbar", role: "status", "aria-live": "polite" }, h("span", { class: "nt-d" }), pTxt, h("span", { class: "nt-grow" }), pNext, pNa);
    const ctxHost = h("div");
    const ctxEnd = h("div");
    const formHost = h("div", { class: "nt-form" });
    const body = h("div", { class: "nt-body" }, ctxHost, ctxEnd, formHost);
    const bw = h("div", { class: "nt-bw" }, sticky, pbar, body);

    const sTxt = h("span");
    const status = h("button", { class: "nt-status", type: "button" }, h("span", { class: "nt-d" }), sTxt);
    const bClear = h("button", { class: "nt-btn", type: "button" });
    const bDraft = h("button", { class: "nt-btn", type: "button" });
    const bCopy = h("button", { class: "nt-btn t", type: "button" });
    const bFill = h("button", { class: "nt-btn p", type: "button" });
    const emailBox = h("input", { type: "checkbox", checked: true });
    const emailTxt = h("span");
    const emailRow = h("label", { class: "nt-emailrow" }, emailBox, emailTxt);
    emailBox.addEventListener("change", () => { emailAuto = emailBox.checked; });
    const foot = h("footer", { class: "nt-foot" },
        emailRow,
        h("div", { class: "nt-foot-row" }, status, h("span", { class: "nt-grow" }), bClear, bDraft, bCopy, bFill),
        h("div", { class: "nt-credit" }, `created by ${AUTHOR_CREDIT}`));

    const splitHost = h("div", { class: "nt-split" });
    const splitComponent = createSplitTransferComponent(() => toggleSplit());
    splitComponent.style.height = "100%";
    splitHost.append(splitComponent);

    const draftsPop = h("div", { class: "nt-drafts", hidden: true, role: "dialog", "aria-label": ntt("drafts") });
    win.append(header, bw, splitHost, foot, draftsPop);

    const tBadge = h("span", { class: "nt-bd" });
    const tab = h("button", { class: "nt-tab", type: "button", "aria-expanded": "false", "aria-controls": "cw-nt-drawer-in" }, tBadge, ico("note"), (() => { const c = ico("left"); c.classList.add("nt-chev"); return c; })());
    const dState = h("span", { class: "nt-pill" });
    const dEyebrow = h("div", { class: "nt-eyebrow" });
    const preview = h("div", { class: "nt-note-card" });
    const dIn = h("div", { class: "nt-drawer-in", id: "cw-nt-drawer-in", inert: true },
        h("div", { class: "nt-d-head" }, dEyebrow, dState),
        h("div", { class: "nt-d-scroll" }, preview));
    const drawer = h("aside", { class: "nt-drawer" }, tab, dIn);
    popup.append(drawer, win);

    const resizeHandle = h("div", { class: "no-drag" });
    Object.assign(resizeHandle.style, styleResizeHandle);
    popup.append(resizeHandle);
    makeResizable(popup, resizeHandle);
    document.body.appendChild(popup);

    // Os prints por task (step-tasks) ficam fora do formulário re-renderizado, para
    // o que o agente colou ali sobreviver a cada repintura.
    const printsWrap = h("div", { class: "nt-prints" }, stepTasks.screenshotsElement);
    const tasksWrap = h("div", { class: "nt-tasks" }, stepTasks.selectionElement);

    // ACT e ECW não repetem a lista de prints: as linhas de fase (Before,
    // Implementation, After) já os pedem (spec §8). O componente fica intocado:
    // escondemos só os cartões dessas duas tasks, menos o do Tag Support, que carrega
    // o "Incluir mesmo assim".
    function hideRepeatedPrints() {
        let any = false;
        stepTasks.screenshotsElement.querySelectorAll(".cw-screen-card").forEach((card) => {
            const id = card.querySelector('input[id^="name-"]')?.id || "";
            const key = M.TS_TARGETS.find((k) => id.startsWith(`name-${k}-`));
            const hide = !!key && !card.classList.contains("ts-success");
            card.style.display = hide ? "none" : "";
            if (!hide) any = true;
        });
        printsWrap.style.display = any && M.segmentUsesTasks(catalog, st.seg) ? "" : "none";
    }
    new MutationObserver(() => { hideRepeatedPrints(); collectTaskPrints(); }).observe(stepTasks.screenshotsElement, { childList: true, subtree: true });
    stepTasks.screenshotsElement.addEventListener("input", () => { collectTaskPrints(); dirty(); refresh(); });

    // Os prints colados no step-tasks vão para o Additional Details, `<task> — <rótulo>`.
    function collectTaskPrints() {
        const out = [];
        stepTasks.screenshotsElement.querySelectorAll(".cw-screen-card").forEach((card) => {
            if (card.style.display === "none") return;
            const name = card.querySelector('input[id^="name-"]')?.value || "";
            card.querySelectorAll('input[id^="screen-"]').forEach((inp) => {
                const label = inp.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent || "";
                out.push({ label: `${name} — ${label}`.trim(), v: inp.value });
            });
        });
        st.taskPrints = out;
    }

    // ---- ajudantes de estado ----
    const seg = () => M.findSegment(catalog, st.seg) || catalog.segments[0];
    const lbl = (r) => M.labelText(r.label, noteLang);
    const labUi = (r) => lbl(r).replace(/:\s*$/, "");
    const hint = (r) => (r.hint && typeof r.hint === "object" ? (r.hint[getLanguage()] || r.hint.pt || "") : String(r.hint || ""));
    const secUi = (t) => M.labelText(t, "en").replace(/\s*\(Mandatory\)/, "").replace(/^General Details$/, "Details");
    const tsDisclaimer = () => (translations[noteLang] || translations.pt).ts_output_disclaimer || "";
    const ctxOf = () => ({ lang: noteLang, tsDisclaimer: tsDisclaimer() });
    const rs = (id) => M.rowState(st, id);
    const resolved = (r, blockId) => M.resolveRow(catalog, st, r, { ...ctxOf(), blockId });
    const visibleRow = (r) => M.rowVisible(catalog, st, r);
    const required = (r) => M.rowRequired(catalog, st, r);
    const auto = () => M.applyAuto(catalog, st, { cid: cap.cid });

    const hiddenDerived = (r, b) => r.type === "derived" && (r.auto === "substatus" || r.auto === "europe" || (r.auto === "tasks" && resolved(r, b) !== null));
    const isAutoRow = (r, b) => {
        if (r.type === "derived") return false;
        const s = rs(r.id);
        return resolved(r, b) !== null && !!(s.auto || s.defaulted || (M.isTsDispensed(catalog, st, r, b) && !String(s.v || "").trim() && !s.na));
    };
    const isOpt = (r) => !required(r) && !(r.optIn && st.optIn.includes(r.id));
    const secRows = (sec, b) => (sec.rows || []).filter(visibleRow).filter((r) => !hiddenDerived(r, b));
    function visibleRowsAll() {
        const out = [];
        for (const p of M.activePlacements(catalog, st)) for (const sec of catalog.blocks[p.b].sections) for (const r of secRows(sec, p.b)) out.push([r, p.b]);
        return out;
    }
    const missing = () => M.missingList(catalog, st, ctxOf());

    let saveTimer = null;
    function dirty() {
        clearTimeout(saveTimer);
        // Airbag: 2s depois da última edição (o "Guardar" é o rascunho estacionado, outra coisa).
        saveTimer = setTimeout(() => {
            if (st.substatus) drafts.saveEmergency(serialize()); else drafts.clearEmergency();
        }, 2000);
    }

    function serialize() {
        return {
            subStatus: st.substatus,
            st: JSON.parse(JSON.stringify(st)),
            noteLang, caseKey: cap.caseKey,
            tasks: stepTasks.getCheckedElements(),
            prints: [...stepTasks.screenshotsElement.querySelectorAll('input[id^="screen-"]')].map((i) => [i.id, i.value]),
        };
    }
    function restore(data) {
        if (!data || !data.st) return;
        stepTasks.reset();
        (data.tasks || []).forEach((t) => stepTasks.setTaskCount(t.value, t.count));
        st = Object.assign(M.createNoteState(), data.st);
        if (data.noteLang) { noteLang = data.noteLang; noteLangManual = true; tasksState.currentLang = noteLang; }
        tasksState.tagSupportUsed = rs("ts_used").v === "Yes";
        tasksState.forcedScreenshots = new Set(st.forced || []);
        tasksState.notify();
        for (const [id, v] of data.prints || []) { const i = stepTasks.screenshotsElement.querySelector(`#${CSS.escape(id)}`); if (i) i.value = v; }
        collectTaskPrints();
        render();
    }

    // Nota nova (outro caso, Limpar, depois de inserir) abre no tipo e no fluxo padrão do agente.
    function resetForm() {
        st = M.createNoteState({ seg: defaultSegment(), flow: readFlowPref(), cids: [M.newCidRow(cap.cid)] });
        st.active = M.preselectBlocks(catalog, st.seg, lerCampo("appointmentTime") || "", new Date());
        Object.assign(ui, { ctxOpen: false, autoOpen: false, more: {}, showPending: false, scenOpen: false, pi: 0, blocksTouched: false });
        stepTasks.reset();
        tasksState.setTagSupportUsed(false);
        premarkTasks();
        auto();
    }

    // ---- captura do caso: "mudou o caso?" decide-se ANTES de qualquer leitura lenta ----
    async function syncCase() {
        const caseKey = `${await getCaseId()}|${captureCID()}`;
        if (cap.caseKey !== null && cap.caseKey !== caseKey) {
            cap.caseKey = caseKey;
            cap.cid = "";
            resetForm();
            render();
        }
        cap.caseKey = caseKey;
        cap.capturing = true;
        refresh();
        try {
            const cid = captureCID();
            cap.cid = cid && cid !== "N/A" ? cid : "";
            cap.salesProgram = captureSalesProgram();
            const fromCrm = crmLangToCode(captureLanguage());
            if (!noteLangManual) noteLang = fromCrm || getOutputLanguage();
            tasksState.currentLang = noteLang;
            if (!st.cids.length || (st.cids.length === 1 && !st.cids[0].cid)) st.cids = [Object.assign(st.cids[0] || M.newCidRow(), { cid: cap.cid })];
            // Blocos pela data do appointment, enquanto o agente não mexeu neles.
            if (!ui.blocksTouched) st.active = M.preselectBlocks(catalog, st.seg, lerCampo("appointmentTime") || "", new Date());
            if (!stepTasks.getCheckedElements().length) premarkTasks();
            auto();
        } finally {
            cap.capturing = false;
            render();
        }
    }

    // Tasks do appointment pré-marcadas só quando o texto é reconhecido com segurança
    // (chave ou nome exato do catálogo). Na tela traduzida o texto não casa e o
    // seletor de hoje aparece aberto.
    function premarkTasks() {
        const names = lerCampoTodos("appointmentTasks");
        if (!names.length || !M.segmentUsesTasks(catalog, st.seg)) { ui.tasksAuto = false; ui.tasksOpen = false; return; }
        const known = Object.entries(TASKS_DB).map(([k, v]) => [k, norm(k), norm(v.name)]);
        const hits = names.map((n) => known.find(([, a, b]) => norm(n) === a || norm(n) === b)).filter(Boolean);
        hits.forEach(([k]) => stepTasks.toggleTask(k, true));
        ui.tasksAuto = hits.length > 0 && hits.length === names.length;
        ui.tasksOpen = !ui.tasksAuto;
    }

    function onTasksChanged() {
        st.tasks = stepTasks.getCheckedElements().map((c) => ({ key: c.value, name: TASKS_DB[c.value]?.name || c.value, count: c.count }));
        ui.tasksAuto = false;
        auto();
        syncTagSupport();
        dirty();
        render();
    }

    function syncTagSupport() {
        const yes = M.tagSupportActive(catalog, st);
        if (tasksState.tagSupportUsed !== yes) tasksState.setTagSupportUsed(yes);
    }

    // ---- controles ----
    function segCtl(label, opts, val, onPick, small) {
        const g = h("div", { class: "nt-seg" + (small ? " sm" : ""), role: "radiogroup", "aria-label": label });
        opts.forEach(([k, t]) => {
            const b = h("button", { type: "button", role: "radio", "aria-checked": String(k === val), tabindex: k === val ? "0" : "-1", onclick: () => onPick(k) }, t);
            b.addEventListener("keydown", (e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const i = opts.findIndex((o) => o[0] === val);
                const j = (i + (e.key === "ArrowRight" ? 1 : opts.length - 1)) % opts.length;
                onPick(opts[j][0]);
                queueMicrotask(() => { const n = popup.querySelector(`[aria-label="${CSS.escape(label)}"] [aria-checked=true]`); if (n) n.focus(); });
            });
            g.append(b);
        });
        return g;
    }
    function cw(card, note) { const fn = h("div", { class: "nt-fn" }, note || ""); fn.dataset.def = note || ""; return h("div", { class: "nt-cw" }, card, fn); }
    function setFn(el, text) { const box = el.closest(".nt-cw"); const fn = box && box.querySelector(":scope>.nt-fn"); if (fn) fn.textContent = text || fn.dataset.def || ""; }
    function hl(id, on) { preview.querySelectorAll("tr[data-row]").forEach((tr) => tr.classList.toggle("nt-hl", on && tr.dataset.row === id)); }

    // Enter, ou colar um link válido: o foco vai ao próximo campo vazio.
    function advance(from) {
        const rows = [...formHost.querySelectorAll(".nt-row[data-row]")];
        const i = rows.indexOf(from.closest(".nt-row[data-row]"));
        for (let j = i + 1; j < rows.length; j++) {
            const f = rows[j].querySelector("input[type=text],textarea");
            if (f && !f.value.trim() && !rows[j].querySelector('.nt-na[aria-pressed=true]')) { f.focus(); return true; }
        }
        return false;
    }

    // ---- uma linha do formulário ----
    function mkRow(r, blockId, pend) {
        const s = rs(r.id);
        const na = s.na && r.na !== false;
        const v = resolved(r, blockId);
        const dispensed = M.isTsDispensed(catalog, st, r, blockId) && !String(s.v || "").trim() && !s.na;
        const row = h("div", { class: "nt-row" + (r.type === "long" ? " stack" : "") + (pend ? " pending" : ""), "data-row": r.id });
        const tags = [];
        if (s.auto || dispensed) tags.push(h("span", { class: "nt-tag", title: ntt("autoTitle") }, ico("check"), ntt("autoTag")));
        if (s.defaulted) tags.push(h("span", { class: "nt-tag", title: ntt("defaultTitle") }, ntt("defaultTag")));
        if (r.auto === "consent" && st.europe && !na && v === null) tags.push(h("span", { class: "nt-tag warn" }, ntt("europeMark")));
        row.append(h("label", { class: "nt-rl", for: `nt-f-${r.id}` }, labUi(r), ...tags));
        const rv = h("div", { class: "nt-rv" + (r.type === "date" ? " date" : "") + (r.type === "speakeasy" ? " sp" : "") + (r.type === "cid" ? " cidv" : "") + (r.type === "link" ? " lk" : "") + (r.type === "link" && M.linkOk(s.v) ? " ok" : "") });
        let extra = null;
        const touch = () => { M.touchRow(st, r.id); row.querySelectorAll(".nt-tag").forEach((e) => e.remove()); dirty(); };
        const field = (tag) => {
            const e = tag === "input"
                ? h("input", { id: `nt-f-${r.id}`, type: "text", autocomplete: "off", spellcheck: "false", placeholder: placeholderOf(r) })
                : h("textarea", { id: `nt-f-${r.id}`, rows: "3", placeholder: ntt("phText") });
            e.value = s.v || "";
            e.addEventListener("input", () => {
                touch(); s.v = e.value;
                row.classList.toggle("bad", M.isBadValue(r, e.value));
                if (r.type === "link") rv.classList.toggle("ok", M.linkOk(e.value));
                if (tag === "textarea") autosize(e);
                if (r.id === "ts_used") syncTagSupport();
                refresh();
            });
            if (tag === "input") {
                e.addEventListener("keydown", (ev) => { if (ev.key === "Enter") { ev.preventDefault(); advance(row); } });
                if (r.type === "link") e.addEventListener("paste", () => setTimeout(() => { if (M.linkOk(e.value)) advance(row); }, 0));
            }
            if (r.type === "cid") e.addEventListener("blur", () => { const f = M.formatCid(e.value); if (f !== e.value) { e.value = s.v = f; refresh(); } });
            return e;
        };
        if (na) rv.append(h("span", { class: "nt-val muted" }, "NA"));
        else if (dispensed) rv.append(h("span", { class: "nt-val muted" }, "NA"));
        else if (r.type === "derived") {
            const txt = r.auto === "tasks" ? (v ? st.tasks.map((t) => t.name).join(", ") : ntt("tasksNone")) : (v || "—");
            rv.append(h("span", { class: "nt-val" + (v ? "" : " empty") }, txt));
        } else if (r.type === "yesno") {
            if (r.auto === "consent" && !st.europe && s.defaulted && !s.altOpen) {
                rv.append(h("span", { class: "nt-val" }, "Yes"));
                extra = h("button", { class: "nt-na", type: "button", onclick: () => { s.altOpen = true; render(); } }, ntt("change"));
            } else {
                rv.append(segCtl(labUi(r), [["Yes", "Yes"], ["No", "No"]], s.v, (k) => {
                    touch(); s.v = k; s.na = false;
                    if (r.id === "ts_used") syncTagSupport();
                    render();
                }, true));
            }
        } else if (r.type === "long") {
            const t = field("textarea"); rv.append(t); queueMicrotask(() => autosize(t));
        } else {
            rv.append(field("input"));
            if (r.type === "link") rv.append(h("span", { class: "nt-ck", "aria-hidden": "true" }, ico("check")));
            if (r.type === "date" && r.auto === "followup") {
                rv.append(h("div", { class: "nt-quick" }, [2, 3, 5].map((n) => h("button", { class: "nt-chip", type: "button", title: ntt("bdTitle", n), "aria-label": ntt("bdAria", n), onclick: () => { touch(); s.v = M.addBusinessDays(n); s.na = false; render(); } }, "+" + n))));
            }
            if (r.type === "speakeasy") {
                rv.append(h("button", {
                    class: "nt-chip", type: "button", onclick: async () => {
                        const inp = rv.querySelector("input");
                        await fetchAndInsertSpeakeasyId(inp);
                        if (inp.value && inp.value.trim()) { touch(); s.v = inp.value.trim(); s.na = false; render(); showToast(ntt("speakeasyFound")); }
                    },
                }, ntt("autoSearch")));
            }
        }
        row.append(rv);
        const hasNA = (r.na !== false && r.type !== "derived") || (r.type === "derived" && r.auto === "tasks");
        if (extra) row.append(extra);
        else {
            const acts = h("div", { class: "nt-acts" });
            if (r.type !== "derived") {
                acts.append(h("button", {
                    class: "nt-cmt" + (s.comment || s.commentOpen ? " on" : " nt-ghost"), type: "button", "aria-label": ntt("commentBtn"),
                    "aria-pressed": String(!!s.commentOpen), title: s.comment ? ntt("commentIs", s.comment) : ntt("commentAdd"),
                    onclick: () => { s.commentOpen = !s.commentOpen; render(); if (s.commentOpen) queueMicrotask(() => { const f = formHost.querySelector(`[data-row="${r.id}"] .nt-cmrow input`); if (f) f.focus(); }); },
                }, ico(s.comment ? "cmtOn" : "cmt")));
            }
            if (hasNA) acts.append(h("button", { class: "nt-na nt-ghost", "aria-pressed": String(na), type: "button", title: na ? ntt("naUndo") : ntt("naMark"), onclick: () => { touch(); s.na = !s.na; render(); } }, na ? ntt("undo") : "NA"));
            row.append(acts);
        }
        if (s.commentOpen && r.type !== "derived") {
            const ci = h("input", { type: "text", autocomplete: "off", spellcheck: "false", placeholder: ntt("phComment"), "aria-label": ntt("commentOf", labUi(r)) });
            ci.value = s.comment || "";
            ci.addEventListener("input", () => { s.comment = ci.value; const cb = row.querySelector(".nt-cmt"); if (cb) cb.replaceChildren(ico(ci.value.trim() ? "cmtOn" : "cmt")); dirty(); refresh(); });
            ci.addEventListener("blur", () => { if (!ci.value.trim() && s.commentOpen) { s.commentOpen = false; render(); } });
            row.append(h("div", { class: "nt-cmrow" }, ci));
        }
        row.addEventListener("focusin", () => { setFn(row, hint(r)); hl(r.id, true); });
        row.addEventListener("focusout", () => { setFn(row, ""); hl(r.id, false); });
        return row;
    }
    function placeholderOf(r) {
        return { date: ntt("phDate"), cid: "XXX-XXX-XXXX", link: ntt("phLink"), speakeasy: ntt("phSpeakeasy") }[r.type] || ntt("phText");
    }

    // ---- cartão de uma seção (principais + "Mais opções") ----
    function sectionCard(key, sec, blockId, pend, top) {
        const all = secRows(sec, blockId);
        const rest = all.filter((r) => !isAutoRow(r, blockId) && !TS_ROWS.includes(r.id));
        const main = rest.filter((r) => !isOpt(r));
        const opt = rest.filter(isOpt);
        const add = (sec.rows || []).filter((r) => r.optIn && r.visible !== false && !st.optIn.includes(r.id) && !(r.requiredWhen && M.matches(catalog, st, r.requiredWhen)) && M.matches(catalog, st, r.when));
        if (!main.length && !opt.length && !add.length && !top) return null;
        const card = h("div", { class: "nt-card" });
        if (top) card.append(top);
        main.forEach((r) => card.append(mkRow(r, blockId, pend(r.id))));
        const n = opt.length + add.length;
        const open = !!ui.more[key];
        if (n) {
            card.append(h("button", { class: "nt-more", type: "button", "aria-expanded": String(open), onclick: () => { ui.more[key] = !open; render(); } }, h("span", {}, open ? ntt("less") : ntt("more", n)), ico("chev")));
            if (open) {
                opt.forEach((r) => card.append(mkRow(r, blockId, pend(r.id))));
                add.forEach((r) => card.append(h("div", { class: "nt-row add" }, h("span"), h("button", { class: "nt-add-btn", type: "button", onclick: () => { st.optIn.push(r.id); dirty(); render(); } }, "+ " + labUi(r)), h("span"))));
            }
        }
        return cw(card, "");
    }

    function tsCard(rows, pend) {
        const card = h("div", { class: "nt-card nt-ts" },
            h("div", { class: "nt-ts-h" }, h("b", {}, ntt("tsTitle")), h("span", {}, ntt("tsHelp"))));
        rows.forEach(([r, b]) => card.append(mkRow(r, b, pend(r.id))));
        return cw(card, "");
    }

    function autoCard(rows, pend) {
        const open = ui.autoOpen;
        const head = h("button", { class: "nt-auto-h", type: "button", "aria-expanded": String(open), onclick: () => { ui.autoOpen = !open; render(); } },
            h("span", { class: "nt-ic" }, ico("checkc")), ntt("autoCard"), h("span", { class: "nt-c" }, String(rows.length), ico("chev")));
        const card = h("div", { class: "nt-card" }, head);
        if (!open) card.append(h("div", { class: "nt-auto-sum" }, rows.map(([r, b]) => h("span", {}, (AUTO_SHORT[r.id] || labUi(r)) + " ", h("b", {}, resolved(r, b))))));
        else rows.forEach(([r, b]) => card.append(mkRow(r, b, pend(r.id))));
        return cw(card, "");
    }

    function cidSection(sec, pend) {
        const wrap = h("div", {});
        wrap.append(h("div", { class: "nt-eyebrow" }, ntt("cidDetails")));
        st.cids.forEach((cr, i) => {
            const card = h("div", { class: "nt-card" });
            sec.columns.forEach((c, ci) => {
                const key = `cid:${i}:${c.id}`;
                const row = h("div", { class: "nt-row" + (pend(key) ? " pending" : ""), "data-row": key });
                const colLabel = M.labelText(c.label, noteLang).replace(/:\s*$/, "");
                row.append(h("label", { class: "nt-rl", for: `nt-c-${i}-${c.id}` }, colLabel + (ci === 0 && st.cids.length > 1 ? ` ${i + 1}` : "")));
                const rv = h("div", { class: "nt-rv" + (c.type === "cid" ? " cidv" : "") });
                const pickSeg = (opts, val, set) => rv.append(segCtl(`${colLabel} ${i + 1}`, opts, val, (k) => { set(k); dirty(); render(); }, true));
                if (c.type === "tbw") pickSeg([["TBW", "TBW"], ["N-TBW", "N-TBW"]], cr.tbw, (k) => { cr.tbw = k; });
                else if (c.type === "yn") pickSeg([["YES", "YES"], ["NO", "NO"]], cr[c.id], (k) => { cr[c.id] = k; });
                else if (c.type === "smeyes") pickSeg([["YES", "YES"], ["NO", "NO"]], cr.sme || "YES", (k) => { cr.sme = k; });
                else {
                    const e = h("input", { id: `nt-c-${i}-${c.id}`, type: "text", autocomplete: "off", spellcheck: "false", placeholder: c.type === "cid" ? "XXX-XXX-XXXX" : (c.type === "link" ? ntt("phLink") : ntt("phText")) });
                    e.value = cr[c.id] || "";
                    e.addEventListener("input", () => { cr[c.id] = e.value; dirty(); refresh(); });
                    if (c.type === "cid") e.addEventListener("blur", () => { const f = M.formatCid(e.value); if (f !== e.value) { e.value = cr[c.id] = f; refresh(); } });
                    rv.append(e);
                }
                row.append(rv);
                if (ci === 0 && st.cids.length > 1) row.append(h("button", { class: "nt-na", type: "button", "aria-label": ntt("removeCid", i + 1), onclick: () => { st.cids.splice(i, 1); dirty(); render(); } }, ico("close")));
                else row.append(h("span"));
                row.addEventListener("focusin", () => setFn(row, ntt("cidHint")));
                row.addEventListener("focusout", () => setFn(row, ""));
                card.append(row);
            });
            wrap.append(cw(card, ""));
        });
        wrap.append(h("div", { class: "nt-sec" }, h("button", { class: "nt-chip", type: "button", onclick: () => { if (st.cids.length >= MAX_CIDS) { showToast(ntt("maxCid")); return; } st.cids.push(M.newCidRow()); dirty(); render(); } }, ntt("addCid"))));
        return wrap;
    }

    // ---- cenários rápidos (getScenariosFor do Case Notes, regra de destino da spec §9) ----
    function scenarioRow() {
        const key = oldKeyOf(st.substatus);
        const list = key ? getScenariosFor(key, st.flow) : [];
        if (!list.length) return null;
        const chip = ([id]) => h("button", { class: list.length > 3 ? "nt-opt" : "nt-chip", type: "button", onclick: () => applyScenario(id, key) }, scenarioLabel(id, key));
        if (list.length <= 3) return h("div", { class: "nt-row stackc" }, h("div", { class: "nt-rl" }, ntt("scenario")), h("div", { class: "nt-chips" }, list.map(chip)));
        const toggle = h("button", { class: "nt-chip", type: "button", "aria-expanded": String(ui.scenOpen), onclick: () => { ui.scenOpen = !ui.scenOpen; render(); } }, ntt("scenarioMenu", list.length), ico("chev"));
        return h("div", { class: "nt-row stackc" }, h("div", { class: "nt-rl" }, ntt("scenario")), h("div", { class: "nt-chips" }, toggle), ui.scenOpen ? h("div", { class: "nt-scen-menu" }, list.map(chip)) : null);
    }

    function applyScenario(id, key) {
        const data = getScenarioFields(scenarioSnippets[id], noteLang, id) || {};
        const visibleIds = new Set(visibleRowsAll().map(([r]) => r.id));
        const summaryId = M.SUMMARY_ROW_IDS.find((i) => visibleIds.has(i));
        const dict = translations[noteLang] || translations.pt;
        const put = (rowId, text) => { const s = M.touchRow(st, rowId); const cur = String(s.v || "").trim(); if (!cur.includes(text.trim())) s.v = cur ? `${cur}\n${text}` : text; s.na = false; };
        const blocks = [];
        for (const [field, value] of Object.entries(data)) {
            if (!field.startsWith("field-") || typeof value !== "string" || !value.trim()) continue;
            const f = field.slice(6);
            if (f === "SCREENSHOTS") { ui.more["extras.0"] = true; continue; }        // print: as linhas do Additional pedem
            if (["SPEAKEASY_ID", "ON_CALL", "GTM_GA4_VERIFICADO"].includes(f)) {
                const rowId = { SPEAKEASY_ID: "speakeasy", ON_CALL: "oncall", GTM_GA4_VERIFICADO: "gtm_ga4" }[f];
                if (/^n\/?a$/i.test(value.trim()) && visibleIds.has(rowId)) { M.touchRow(st, rowId).na = true; }
                continue;
            }
            if (f === "REASON_COMMENTS" && visibleIds.has("substatus_reason")) { put("substatus_reason", value); continue; }
            if (f === "DIA" && visibleIds.has("next_followup")) { M.touchRow(st, "next_followup").v = value.trim(); continue; }
            const title = String(dict[f.toLowerCase()] || f).replace(/^[^\p{L}\p{N}]+/u, "").replace(/:\s*$/, "").trim();
            blocks.push(`**${title}:** ${value.trim()}`);
        }
        if (summaryId && blocks.length) put(summaryId, blocks.join("\n"));
        const linked = scenarioSnippets[id] && scenarioSnippets[id].linkedTask;
        if (linked && M.segmentUsesTasks(catalog, st.seg) && TASKS_DB[linked]) stepTasks.toggleTask(linked, true);
        dirty();
        render();
        showToast(ntt("scenarioApplied"));
        void key;
    }

    // ---- contexto (topo) ----
    function ctxNote() {
        if (!st.substatus) return ntt("ctxPick");
        if (!M.isOfficialSubstatus(st.substatus)) return ntt("ctxOffList");
        const f = M.followupRule(st.substatus);
        if (typeof f === "number") return ntt("ctxFuDays", f);
        if (f === "na") return ntt("ctxFuNa");
        return ntt("ctxFuAgent");
    }
    const defaultSegment = () => openSegment(catalog.segments.map((s) => s.key));

    // ---- o "?" de cada bloco: explica o bloco (só tela; nada disto vai para a nota) ----
    function withHelp(s, p, name, chip) {
        if (!blockHelp(p.b)) return chip;
        const key = `${s.key}.${p.b}`;
        const ask = helpLabels().ask(name);
        const q = h("button", { class: "nt-q", type: "button", "data-q": key, "aria-expanded": String(ui.helpBlock === key), "aria-controls": "cw-nt-help", "aria-label": ask, title: ask, onclick: () => toggleHelp(key) }, "?");
        return h("span", { class: "nt-chipw" }, chip, q);
    }
    function helpPanel(s) {
        if (!ui.helpBlock) return null;
        const p = s.blocks.find((b) => `${s.key}.${b.b}` === ui.helpBlock);
        const info = p && blockHelp(p.b);
        if (!info) return null;
        const L = helpLabels();
        const title = M.labelText(p.title, "en");
        const line = (label, text, cls = "") => (text ? h("div", { class: "nt-help-r" + cls }, h("b", {}, label), h("span", {}, text)) : null);
        return h("div", { class: "nt-help", id: "cw-nt-help", role: "region", "aria-label": title },
            h("div", { class: "nt-help-h" }, h("b", {}, title),
                h("button", { class: "nt-help-x", type: "button", "aria-label": L.close, title: L.close, onclick: closeHelp }, "×")),
            h("p", { class: "nt-help-w" }, info.what),
            line(L.flow, info.flow),
            line(L.when, info.when),
            h("div", { class: "nt-help-g" }, L.statuses),
            ...(info.statuses || []).map(([k, v]) => line(k, v, " s")),
            line(L.tasks, info.tasks),
            line(L.must, info.must),
            line(L.ts, info.ts),
            info.na ? h("div", { class: "nt-help-n" }, info.na) : null,
            h("div", { class: "nt-help-f" }, L.notInNote));
    }
    function focusQ(key) { const q = ctxHost.querySelector(`[data-q="${key}"]`); if (q) q.focus(); }
    function toggleHelp(key) {
        ui.helpBlock = ui.helpBlock === key ? null : key;
        renderCtx(); updateSticky();
        focusQ(key);
    }
    function closeHelp() {
        const key = ui.helpBlock;
        if (!key) return;
        ui.helpBlock = null;
        renderCtx(); updateSticky();
        focusQ(key);
    }

    function renderCtx() {
        ctxHost.innerHTML = "";
        const s = seg();
        const card = h("div", { class: "nt-card ctx" });
        const pick = h("button", { class: "nt-pick", type: "button", "aria-haspopup": "listbox", "aria-expanded": String(ui.pick), onclick: (e) => { e.stopPropagation(); if (ui.pick) closePick(); else openPick(pick); } },
            h("span", { class: "nt-rl" }, ntt("substatus")), h("span", { class: "nt-v" + (st.substatus ? "" : " empty") }, st.substatus || ntt("choose")), ico("chev"));
        pick.dataset.role = "substatus";
        card.append(pick);

        if (M.segmentUsesTasks(catalog, st.seg)) {
            const names = st.tasks.map((t) => TSHORT[t.key] || t.name);
            const row = h("div", { class: "nt-row chiprow", "data-ctx": "tasks" }, h("span", { class: "nt-rl" }, ntt("tasks")));
            // Resumo recolhido (com a marca Auto quando veio do CRM); o seletor de hoje
            // (step-tasks) só se abre quando o agente pede ou quando o CRM não foi reconhecido.
            const summary = st.tasks.length ? h("span", { class: "nt-tasks-sum" }, names.join(", ")) : h("span", { class: "nt-val empty" }, ntt("tasksNone"));
            const tag = ui.tasksAuto && !ui.tasksOpen ? h("span", { class: "nt-tag", title: ntt("autoTitle") }, ico("check"), ntt("autoTag")) : null;
            const btnText = ui.tasksOpen ? ntt("tasksClose") : (st.tasks.length ? ntt("change") : ntt("choose"));
            row.append(h("div", { class: "nt-rv" }, summary, tag),
                h("button", { class: "nt-na", type: "button", "aria-expanded": String(ui.tasksOpen), onclick: () => { ui.tasksOpen = !ui.tasksOpen; render(); } }, btnText));
            card.append(row);
            if (ui.tasksOpen) card.append(tasksWrap);
        }

        const chips = s.blocks.filter((p) => !(s.select === "multi" && (s.always || []).includes(p.b))).map((p) => {
            const on = st.active.includes(p.b);
            const sug = M.isSuggested(catalog, st, p) && !on;
            const name = CHIP[`${s.key}.${p.b}`] || M.labelText(p.title, "en");
            const chip = h("button", {
                class: "nt-chip", type: "button", "aria-pressed": String(on), title: (p.when || "") + (sug ? ntt("suggested") : ""),
                onclick: () => {
                    ui.blocksTouched = true;
                    if (s.select === "single") st.active = [p.b];
                    else st.active = on ? st.active.filter((b) => b !== p.b) : [...st.active, p.b];
                    dirty(); render();
                },
            }, name, sug ? h("span", { class: "nt-dot", "aria-hidden": "true" }) : null);
            return withHelp(s, p, name, chip);
        });
        card.append(h("div", { class: "nt-row chiprow", "data-ctx": "blocks" }, h("span", { class: "nt-rl" }, s.select === "multi" ? ntt("blocks") : ntt("phase")), h("div", { class: "nt-chips" }, chips), h("span")));
        const hp = helpPanel(s);
        if (hp) card.append(hp);

        const sum = [noteLang.toUpperCase(), st.flow.toUpperCase(), st.europe ? ntt("inEurope") : ntt("outEurope")].join(" · ");
        const notePick = h("button", { class: "nt-pick", type: "button", "aria-expanded": String(ui.ctxOpen), onclick: () => { ui.ctxOpen = !ui.ctxOpen; render(); } },
            h("span", { class: "nt-rl" }, ntt("note")), h("span", { class: "nt-v" + (st.europe ? " warn" : "") }, st.seg !== defaultSegment() ? h("b", { class: "nt-segtag" }, s.name) : null, sum), ico("chev"));
        notePick.dataset.role = "note";
        notePick.addEventListener("focusin", () => setFn(notePick, ntt("noteFocus")));
        notePick.addEventListener("focusout", () => setFn(notePick, ""));
        card.append(notePick);
        if (ui.ctxOpen) {
            const line = (label, opts, val, fn) => h("div", { class: "nt-row" }, h("span", { class: "nt-rl" }, label), h("div", { class: "nt-rv" }, segCtl(label, opts, val, fn, true)), h("span"));
            card.append(h("div", { class: "nt-row" }, h("span", { class: "nt-rl" }, ntt("type")),
                h("div", { class: "nt-rv" }, segCtl(ntt("typeLabel"), catalog.segments.map((x) => [x.key, x.name]), st.seg, (k) => setSegment(k), true),
                    h("div", { class: "nt-cap2" }, ntt("salesHint"), h("span", {}, cap.salesProgram || "—"))), h("span")));
            card.append(line(ntt("lang"), [["pt", "PT"], ["es", "ES"], ["en", "EN"]], noteLang, (k) => { noteLang = k; noteLangManual = true; tasksState.setLanguage(k); dirty(); render(); }));
            card.append(line(ntt("flow"), [["bau", "BAU"], ["lm", "LM"]], st.flow, (k) => { st.flow = k; auto(); dirty(); render(); }));
            card.append(h("div", { class: "nt-row" }, h("span", { class: "nt-rl" }, ntt("europe")), h("span", { class: "nt-val muted", style: "font-size:12px;line-height:16px" }, ntt("europeHint")),
                h("button", { class: "nt-sw", type: "button", role: "switch", "aria-checked": String(st.europe), "aria-label": ntt("europeLabel"), onclick: () => { st.europe = !st.europe; auto(); dirty(); render(); } })));
        }
        ctxHost.append(cw(card, ctxNote()));
    }

    function setSegment(k) {
        if (st.seg === k) return;
        st.seg = k;
        st.active = M.preselectBlocks(catalog, k, lerCampo("appointmentTime") || "", new Date());
        rememberSegment(k);
        auto(); syncTagSupport(); dirty(); render();
    }

    // ---- seletor de sub-status (popover com busca por nome ou atalho) ----
    let pop = null;
    function closePick() { if (pop) pop.remove(); pop = null; ui.pick = false; const b = ctxHost.querySelector('[data-role="substatus"]'); if (b) b.setAttribute("aria-expanded", "false"); }
    function openPick(btn) {
        closePick();
        ui.pick = true;
        const top = btn.getBoundingClientRect().bottom - bw.getBoundingClientRect().top + 4;
        pop = h("div", { class: "nt-pop", role: "dialog", "aria-label": ntt("pickLabel"), style: `top:${top}px` });
        const inp = h("input", { type: "text", placeholder: ntt("searchPh"), autocomplete: "off", "aria-label": ntt("searchLabel") });
        const list = h("div", { class: "nt-pop-l", role: "listbox" });
        list.style.maxHeight = Math.max(160, bw.clientHeight - top - 72) + "px";
        pop.append(h("div", { class: "nt-pop-s" }, ico("search"), inp), list);
        const hk = (n) => SUBSTATUS_SHORTCODES[oldKeyOf(n)] || "";
        const choose = (n) => {
            st.substatus = n;
            closePick();
            auto(); dirty(); render();
            const b = ctxHost.querySelector('[data-role="substatus"]'); if (b) b.focus();
        };
        const opt = (n) => h("button", { class: "nt-opt" + (n === st.substatus ? " on" : ""), type: "button", role: "option", "aria-selected": String(n === st.substatus), onclick: () => choose(n) },
            h("span", {}, n), n === st.substatus ? h("span", { class: "nt-ck" }, ico("check")) : h("span", { class: "nt-hk" }, hk(n)));
        const draw = (q) => {
            list.innerHTML = "";
            const ql = q.trim().toLowerCase();
            let any = false;
            for (const [g, items] of SUB_GROUPS) {
                const m = items.filter((n) => !ql || n.toLowerCase().includes(ql) || hk(n).toLowerCase().includes(ql));
                if (!m.length) continue;
                any = true;
                list.append(h("div", { class: "nt-pop-g" }, g));
                m.forEach((n) => list.append(opt(n)));
            }
            if (ql && !any) list.append(h("div", { class: "nt-pop-g" }, ntt("noResult")), h("button", { class: "nt-opt", type: "button", onclick: () => choose(q.trim()) }, h("span", {}, ntt("useTyped", q.trim())), h("span", { class: "nt-hk" }, ntt("useHint"))));
        };
        inp.addEventListener("input", () => draw(inp.value));
        inp.addEventListener("keydown", (e) => {
            if (e.key === "Escape") { e.stopPropagation(); closePick(); btn.focus(); }
            if (e.key === "Enter") { e.preventDefault(); const f = list.querySelector(".nt-opt"); if (f) f.click(); }
            if (e.key === "ArrowDown") { e.preventDefault(); const f = list.querySelector(".nt-opt"); if (f) f.focus(); }
        });
        list.addEventListener("keydown", (e) => {
            const os = [...list.querySelectorAll(".nt-opt")];
            const i = os.indexOf(document.activeElement);
            if (e.key === "ArrowDown") { e.preventDefault(); os[Math.min(os.length - 1, i + 1)].focus(); }
            if (e.key === "ArrowUp") { e.preventDefault(); if (i <= 0) inp.focus(); else os[i - 1].focus(); }
            if (e.key === "Escape") { e.stopPropagation(); closePick(); btn.focus(); }
        });
        draw("");
        bw.append(pop);
        btn.setAttribute("aria-expanded", "true");
        inp.focus();
    }
    popup.addEventListener("mousedown", (e) => { if (ui.pick && !e.target.closest(".nt-pop") && !e.target.closest('[data-role="substatus"]')) closePick(); });

    // ---- formulário ----
    function renderForm() {
        formHost.innerHTML = "";
        if (!st.substatus) {
            formHost.append(h("div", { class: "nt-empty-s" }, h("b", {}, ntt("emptyTitle")), ntt("emptySub")));
            printsWrap.remove();
            return;
        }
        const missKeys = new Set(missing().map((m) => m.key));
        const pend = (id) => ui.showPending && missKeys.has(id);
        const tsRows = visibleRowsAll().filter(([r]) => TS_ROWS.includes(r.id));
        if (tsRows.length) formHost.append(tsCard(tsRows, pend));
        const autoRows = [];
        const seen = new Set();
        visibleRowsAll().forEach(([r, b]) => { if (isAutoRow(r, b) && !seen.has(r.id)) { seen.add(r.id); autoRows.push([r, b]); } });
        if (autoRows.length) formHost.append(autoCard(autoRows, pend));
        for (const p of M.activePlacements(catalog, st)) {
            const blk = catalog.blocks[p.b];
            const isX = p.b === M.EXTRAS_BLOCK;
            const parts = [];
            blk.sections.forEach((sec, si) => {
                if (sec.kind === "cid") { parts.push(cidSection(sec, pend)); return; }
                const key = `${p.b}.${si}`;
                const top = (!isX && secRows(sec, p.b).some((r) => M.SUMMARY_ROW_IDS.includes(r.id))) ? scenarioRow() : null;
                const cd = sectionCard(key, sec, p.b, pend, top);
                if (!cd) return;
                if (si > 0) parts.push(h("div", { class: "nt-sub-h" }, secUi(sec.title)));
                parts.push(cd);
            });
            if (isX && M.segmentUsesTasks(catalog, st.seg)) {
                parts.push(h("div", { class: "nt-sub-h" }, ntt("prints")), printsWrap);
            }
            if (!parts.length) continue;
            formHost.append(h("div", { class: "nt-eyebrow" }, SHORT[p.b] || M.labelText(p.title, "en")), ...parts);
        }
        hideRepeatedPrints();
    }

    // ---- rodapé, aba, prévia, faixas ----
    function refresh() {
        const miss = missing();
        const n = miss.length;
        const ready = !n && !!st.substatus && M.activePlacements(catalog, st).length > 0;
        preview.innerHTML = renderNoteHtml(catalog, st, { ...ctxOf(), live: true, pendingLabel: ntt("pendingCell") }) || "";
        sTxt.textContent = cap.capturing ? ntt("capturing") : (ready ? ntt("ready") : ntt("pending", n || (st.substatus ? 0 : 1)));
        status.classList.toggle("ready", ready);
        bFill.classList.toggle("blocked", !ready || cap.capturing);
        bCopy.classList.toggle("blocked", !ready || cap.capturing);
        tBadge.className = "nt-bd" + (ready ? " ok" : "");
        tBadge.replaceChildren(ready ? ico("check") : document.createTextNode(String(n)));
        dState.className = "nt-pill" + (ready ? " ok" : "");
        dState.textContent = ready ? ntt("readyPill") : ntt("pending", n);
        tab.setAttribute("aria-label", ntt("tabAria", ready ? 0 : n));
        sticky.replaceChildren();
        [...(st.seg !== defaultSegment() ? [seg().name] : []), st.flow.toUpperCase(), noteLang.toUpperCase(), st.substatus || ntt("noSubstatus")].forEach((t, i) => { if (i) sticky.append(h("i", {}, "·")); sticky.append(t); });
        sticky.append(ico("up"));
        if (!n) ui.showPending = false;
        pbar.classList.toggle("on", ui.showPending && n > 0);
        pTxt.textContent = ntt("pending", n);
        const code = SUBSTATUS_SHORTCODES[oldKeyOf(st.substatus)];
        emailRow.hidden = !code;
        updateSticky();
    }
    function updateSticky() { sticky.classList.toggle("on", body.scrollTop > ctxEnd.offsetTop - 8 && !pbar.classList.contains("on")); }

    function paintChrome() {
        const title = header.querySelector("span");
        if (title) title.textContent = ntt("title");
        win.setAttribute("aria-label", ntt("title"));
        const help = popup.querySelector(".cw-help-description");
        if (help) help.textContent = ntt("help");
        const helpTitle = popup.querySelector(".cw-help-title");
        if (helpTitle) helpTitle.textContent = ntt("title");
        splitBtn.title = ntt("split"); splitBtn.setAttribute("aria-label", ntt("split"));
        draftsBtn.title = ntt("drafts"); draftsBtn.setAttribute("aria-label", ntt("drafts"));
        sticky.setAttribute("aria-label", ntt("stickyAria"));
        pNext.textContent = ntt("next"); pNa.textContent = ntt("markRest");
        bClear.textContent = ntt("clear"); bDraft.textContent = ntt("save"); bCopy.textContent = ntt("copy"); bFill.textContent = ntt("fill");
        emailTxt.textContent = ntt("emailAuto");
        dEyebrow.textContent = ntt("preview");
    }

    function render() {
        const top = body.scrollTop;
        closePick();
        catalog = getNoteCatalog();
        st.taskPrints = st.taskPrints || [];
        paintChrome();
        renderCtx();
        renderForm();
        refresh();
        renderDrafts();
        body.scrollTop = top;
        updateSticky();
    }

    function setDrawer(on) {
        ui.drawer = on;
        // Sem 536px livres à esquerda (tela de ~1196px ou janela arrastada para a borda),
        // a gaveta sobrepõe a janela em vez de sair da tela.
        const left = popup.getBoundingClientRect().left;
        drawer.classList.toggle("over", on && left < 536 + 16);
        drawer.classList.toggle("open", on);
        tab.setAttribute("aria-expanded", String(on));
        if (on) dIn.removeAttribute("inert"); else dIn.setAttribute("inert", "");
    }
    function focusRow(id) {
        let el = formHost.querySelector(`[data-row="${CSS.escape(id)}"]`);
        if (!el) {
            ui.autoOpen = true;
            M.activePlacements(catalog, st).forEach((p) => catalog.blocks[p.b].sections.forEach((s, si) => { ui.more[`${p.b}.${si}`] = true; }));
            render();
            el = formHost.querySelector(`[data-row="${CSS.escape(id)}"]`);
        }
        if (!el) return;
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        const f = el.querySelector("input,textarea,button");
        if (f) f.focus({ preventScroll: true });
    }
    function showPending() {
        ui.showPending = true; ui.pi = 0; render();
        const first = missing()[0];
        if (first) focusRow(first.key);
    }
    function nextPending() { const ids = missing().map((m) => m.key); if (!ids.length) return; ui.pi = (ui.pi + 1) % ids.length; focusRow(ids[ui.pi]); }

    // ---- ações ----
    function guard() {
        if (!st.substatus) { SoundManager.playError(); showToast(ntt("needSubstatus"), { error: true }); return false; }
        if (cap.capturing) return false;
        if (missing().length || !M.activePlacements(catalog, st).length) { SoundManager.playError(); showPending(); return false; }
        return true;
    }
    const outputHtml = () => renderNoteHtml(catalog, st, ctxOf());

    function doCopy() {
        if (!guard()) return;
        copyHtmlToClipboard(outputHtml());
        SoundManager.playClick();
        showToast(ntt("copied"));
    }
    async function doFill() {
        if (!guard()) return;
        const html = outputHtml();
        const code = SUBSTATUS_SHORTCODES[oldKeyOf(st.substatus)];
        copyHtmlToClipboard(html);
        toggleVisibility();
        const finish = triggerProcessingAnimation();
        try {
            const field = await ensureNoteCardIsOpen();
            if (field) {
                field.focus();
                document.execCommand("insertHTML", false, html);
                triggerInputEvents(field);
                if (emailAuto && code) await runEmailAutomation(code);
                showToast(ntt("inserted"));
                SoundManager.playSuccess();
                registerCaseCompleted();
                resetForm();
                drafts.clearEmergency();
                render();
            } else {
                SoundManager.playError();
                showToast(ntt("notOpened"), { error: true });
                toggleVisibility();
            }
        } finally {
            finish();
        }
    }
    function doClear() {
        resetForm();
        drafts.clearEmergency();
        render();
        showToast(ntt("cleared"));
    }
    function doPark() {
        if (!st.substatus) { SoundManager.playError(); showToast(ntt("needSubstatus"), { error: true }); return; }
        drafts.save(serialize());
        resetForm();
        drafts.clearEmergency();
        render();
        showToast(ntt("draftSaved"));
    }
    function bulkNA() {
        const n = M.bulkNA(catalog, st, ctxOf());
        dirty(); render();
        showToast(n ? ntt("marked", n) : ntt("nothingNa"));
    }

    function renderDrafts() {
        const list = drafts.getAll();
        draftsBtn.querySelector(".nt-hcount")?.remove();
        if (list.length) draftsBtn.append(h("span", { class: "nt-hcount", "aria-hidden": "true" }));
        draftsPop.hidden = !ui.draftsOpen;
        if (!ui.draftsOpen) return;
        draftsPop.replaceChildren();
        if (!list.length) { draftsPop.append(h("div", { class: "nt-empty-s" }, ntt("draftsEmpty"))); return; }
        list.forEach((d) => {
            const when = new Date(d.timestamp).toLocaleString();
            draftsPop.append(h("div", { class: "nt-opt", role: "button", tabindex: "0", "data-draft": d.id, onclick: (e) => {
                if (e.target.closest(".nt-na")) return;
                restore(d); drafts.delete(d.id); ui.draftsOpen = false; renderDrafts(); showToast(ntt("draftOpened"));
            } }, h("span", {}, `${d.subStatus} · ${when}`), h("button", { class: "nt-na", type: "button", onclick: () => { drafts.delete(d.id); renderDrafts(); } }, ntt("draftDelete"))));
        });
    }

    function toggleSplit() {
        ui.split = !ui.split;
        popup.classList.toggle("nt-split-on", ui.split);
        if (animRefs.googleLine) animRefs.googleLine.style.background = ui.split ? "linear-gradient(to right, #8e24aa, #7b1fa2)" : "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)";
    }

    // ---- ligações ----
    tab.addEventListener("click", () => setDrawer(!ui.drawer));
    sticky.addEventListener("click", () => body.scrollTo({ top: 0, behavior: "smooth" }));
    body.addEventListener("scroll", updateSticky, { passive: true });
    pNext.addEventListener("click", nextPending);
    pNa.addEventListener("click", bulkNA);
    status.addEventListener("click", () => { if (missing().length) showPending(); else showToast(ntt("nothingPending")); });
    bClear.addEventListener("click", doClear);
    bDraft.addEventListener("click", doPark);
    bCopy.addEventListener("click", doCopy);
    bFill.addEventListener("click", doFill);
    preview.addEventListener("click", (e) => { const tr = e.target.closest("tr[data-row]"); if (tr) focusRow(tr.dataset.row); });
    // Esc fecha primeiro o que está por cima (seletor, rascunhos, "?", gaveta); só depois a
    // janela, pelo Esc global de animations.js.
    popup.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (ui.pick) { e.stopPropagation(); closePick(); return; }
        if (ui.draftsOpen) { e.stopPropagation(); ui.draftsOpen = false; renderDrafts(); return; }
        if (ui.helpBlock) { e.stopPropagation(); closeHelp(); return; }
        if (ui.drawer) { e.stopPropagation(); setDrawer(false); }
    });

    async function toggleVisibility() {
        // A janela é a fonte de verdade (learning do Case Notes): uma flag local que
        // envelhece inverte o toggle e reabre o módulo no X.
        visible = !isModuleOpen(popup);
        if (visible) lockBodyScroll(); else unlockBodyScroll();
        toggleGenieAnimation(visible, popup, NOTE_TABLE_BUTTON_ID);
        if (!visible) { setDrawer(false); return; }
        render();
        await syncCase();
        if (!cap.restoredChecked) {
            cap.restoredChecked = true;
            const em = drafts.getEmergency();
            if (em && !st.substatus) {
                if (await confirmDialog(ntt("restoreConfirm"))) { restore(em); showToast(ntt("restored")); }
                else drafts.clearEmergency();
            }
        }
    }

    onLanguageChange(() => { if (stepTasks.setLanguage) stepTasks.setLanguage(tOld); render(); });
    onOutputLanguageChange((lang) => { if (!noteLangManual && !crmLangToCode(captureLanguage())) { noteLang = lang; tasksState.setLanguage(lang); render(); } });
    loadTasks(() => { stepTasks.refreshCatalog(); onTasksChanged(); });
    loadNoteCatalog(() => render());

    // Padrões do agente (Configurações): tipo de nota e fluxo.
    st.seg = defaultSegment();
    st.flow = readFlowPref();
    st.active = M.defaultActive(catalog, st.seg);
    st.cids = [M.newCidRow("")];
    auto();
    render();

    toggleVisibility.isOpen = () => visible;
    return toggleVisibility;
}
