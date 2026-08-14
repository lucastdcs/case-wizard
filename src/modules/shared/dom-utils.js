// src/modules/shared/dom-utils.js
// Pequenos helpers de DOM/timing reaproveitados por vários módulos
// (extraídos de duplicatas idênticas espalhadas pelo projeto).

export const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simula uma sequência completa de clique (com hover) para elementos
// que dependem de listeners nativos do Angular do CRM.
export function simularCliqueReal(elemento) {
    if (!elemento) return;
    const opts = { bubbles: true, cancelable: true, view: window };
    ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(evt =>
        elemento.dispatchEvent(new MouseEvent(evt, opts))
    );
}

// Versão reduzida (sem mouseover) usada em fluxos onde o hover não é necessário.
export function simularClique(el) {
    if (!el) return;
    ['mousedown', 'mouseup', 'click'].forEach(evt =>
        el.dispatchEvent(new MouseEvent(evt, { bubbles: true, cancelable: true, view: window }))
    );
}

// Converte um objeto de estilos JS (camelCase) numa string CSS inline
// (kebab-case), para montar innerHTML com style="..." dinâmico.
export function objectToCss(obj) {
    if (!obj) return "";
    return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
}

// Prende um valor entre [min, max]. Usado para não deixar elementos
// arrastáveis saírem da viewport (cada chamador mantém seu próprio padding).
export function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
