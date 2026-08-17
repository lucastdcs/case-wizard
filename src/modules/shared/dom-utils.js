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

// Scroll-lock do <body> com contagem de referências: mais de um módulo pode
// estar aberto ao mesmo tempo (a pílula não fecha os outros ao abrir um
// novo), então destravar direto no fechamento de UM popup reabriria o scroll
// da página de fundo mesmo com outro popup ainda aberto por cima. Cada
// módulo chama lockBodyScroll() ao abrir e unlockBodyScroll() ao fechar; só
// o último a fechar de fato libera o scroll.
let scrollLockCount = 0;
export function lockBodyScroll() {
    scrollLockCount++;
    document.body.style.overflow = "hidden";
}
export function unlockBodyScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.style.overflow = "";
}

// "Check verde" (dopamina) ao preencher um campo - padrão promovido de
// components/step-tasks.js pro resto do app: ao digitar algo válido, o
// campo ganha um fundo/borda verdes e um check anima "encaixando", reforço
// visual instantâneo de "isso está certo" sem esperar validação no fim do
// formulário. O input precisa já estar no DOM (dentro do wrapper) quando
// isso é chamado - o ícone é inserido logo depois dele como irmão.
let filledCheckStylesInjected = false;
function injectFilledCheckStyles() {
    if (filledCheckStylesInjected || document.getElementById('cw-filled-check-styles')) return;
    const style = document.createElement('style');
    style.id = 'cw-filled-check-styles';
    style.textContent = `
        .cw-dopamine-field.filled {
            background-color: #F0FDF4 !important;
            border-color: #86EFAC !important;
            color: #166534;
            padding-right: 36px !important;
        }
        .cw-dopamine-check {
            position: absolute; right: 10px; top: 50%; transform: translateY(-50%) scale(0.5);
            color: #16A34A; width: 16px; height: 16px;
            opacity: 0; pointer-events: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cw-dopamine-check.show { opacity: 1; transform: translateY(-50%) scale(1); }
        @media (prefers-reduced-motion: reduce) {
            .cw-dopamine-check { transition: opacity 0.15s ease !important; }
        }
    `;
    document.head.appendChild(style);
    filledCheckStylesInjected = true;
}

// Estado vazio ilustrado (ícone num badge circular + título + subtítulo),
// no mesmo espírito do que notes-assistant.js já fazia sozinho - só que
// genérico o bastante pra qualquer módulo usar em vez de cair de volta pra
// uma linha de texto solta sem nada. Aceita qualquer SVG/emoji como ícone.
let emptyStateStylesInjected = false;
function injectEmptyStateStyles() {
    if (emptyStateStylesInjected || document.getElementById('cw-empty-state-styles')) return;
    const style = document.createElement('style');
    style.id = 'cw-empty-state-styles';
    style.textContent = `
        .cw-empty-illustrated { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 32px 20px; }
        .cw-empty-illustrated-badge { border-radius: 50%; background: #F8F9FA; display: flex; align-items: center; justify-content: center; color: #9AA0A6; flex-shrink: 0; }
        .cw-empty-illustrated-badge svg { width: 44%; height: 44%; }
        .cw-empty-illustrated-title { font-family: 'Google Sans', Roboto, sans-serif; font-size: 15px; font-weight: 600; color: #202124; }
        .cw-empty-illustrated-subtitle { font-size: 12px; color: #5F6368; line-height: 1.5; max-width: 240px; }
    `;
    document.head.appendChild(style);
    emptyStateStylesInjected = true;
}

export function createEmptyState({ icon, title, subtitle = "", size = 88 }) {
    injectEmptyStateStyles();
    const el = document.createElement("div");
    el.className = "cw-empty-illustrated";
    el.innerHTML = `
        <div class="cw-empty-illustrated-badge" style="width:${size}px;height:${size}px;">${icon}</div>
        <div class="cw-empty-illustrated-title">${title}</div>
        ${subtitle ? `<div class="cw-empty-illustrated-subtitle">${subtitle}</div>` : ""}
    `;
    return el;
}

// Navegação por seta numa lista de itens focáveis (catálogo de tasks,
// templates de e-mail, etc.): ↓/↑ move o foco pro próximo/anterior item
// visível de `itemSelector` dentro de `container`, sem precisar reconstruir
// nada quando a lista é re-renderizada (a busca é feita a cada tecla, ao
// vivo, contra o DOM atual). Enter/Espaço continuam ativando o item porque
// cada item já tem seu próprio keydown handler - isso só cobre o "andar"
// entre eles.
export function enableArrowKeyNav(container, itemSelector) {
    container.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        const active = document.activeElement;
        if (!active || !active.matches(itemSelector)) return;

        const items = Array.from(container.querySelectorAll(itemSelector)).filter(el => el.offsetParent !== null);
        const idx = items.indexOf(active);
        if (idx === -1) return;

        e.preventDefault();
        const nextIdx = e.key === 'ArrowDown' ? Math.min(idx + 1, items.length - 1) : Math.max(idx - 1, 0);
        items[nextIdx].focus();
    });
}

export function enableFilledCheck(input, { minLength = 2 } = {}) {
    injectFilledCheckStyles();

    const parent = input.parentElement;
    if (parent && getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
    }
    input.classList.add('cw-dopamine-field');

    const check = document.createElement('span');
    check.className = 'cw-dopamine-check';
    check.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    input.insertAdjacentElement('afterend', check);

    const sync = () => {
        const isFilled = input.value.trim().length >= minLength;
        input.classList.toggle('filled', isFilled);
        check.classList.toggle('show', isFilled);
    };
    input.addEventListener('input', sync);
    sync();
}
