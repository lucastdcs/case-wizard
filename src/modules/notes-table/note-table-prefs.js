// src/modules/notes-table/note-table-prefs.js
//
// Preferências do agente para a nota em tabela (spec §9): em que tipo de nota o
// módulo abre e qual o fluxo padrão. Vivem em UserPrefsService (cache local na
// hora, nuvem depois), como os favoritos do Links. Configurações escreve; a janela lê.

import { UserPrefsService } from "../shared/user-prefs-service.js";

export const PREF_DEFAULT_SEGMENT = "notes_default_segment";
export const PREF_LAST_SEGMENT = "notes_last_segment";
export const PREF_DEFAULT_FLOW = "notes_default_flow";

export const SEGMENT_OPTIONS = ["all", "sbse", "mms", "last"];
export const FLOW_OPTIONS = ["bau", "lm"];

// Puro: o segmento em que a nota abre. `last` retoma o último usado; valor fora do
// domínio (nuvem antiga, edição à mão) ou segmento que o catálogo não tem cai em `all`.
export function resolveOpenSegment(pref, last, segmentKeys) {
    const has = (k) => segmentKeys.includes(k);
    const p = SEGMENT_OPTIONS.includes(pref) ? pref : "all";
    const key = p === "last" ? last : p;
    return has(key) ? key : "all";
}

export function resolveFlow(pref) {
    return FLOW_OPTIONS.includes(pref) ? pref : "bau";
}

export function readSegmentPref() {
    const v = UserPrefsService.get(PREF_DEFAULT_SEGMENT, "all");
    return SEGMENT_OPTIONS.includes(v) ? v : "all";
}

export function readFlowPref() {
    return resolveFlow(UserPrefsService.get(PREF_DEFAULT_FLOW, "bau"));
}

export function openSegment(segmentKeys) {
    return resolveOpenSegment(readSegmentPref(), UserPrefsService.get(PREF_LAST_SEGMENT, "all"), segmentKeys);
}

export function rememberSegment(key) {
    UserPrefsService.set(PREF_LAST_SEGMENT, key).catch(() => {});
}
