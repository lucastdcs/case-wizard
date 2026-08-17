// src/modules/shared/command-palette.js
//
// Command palette (Ctrl/Cmd+K) - abre um buscador rápido por cima de
// qualquer coisa e liga direto nas mesmas funções de toggle que a pílula
// flutuante já usa. Não duplica lógica de abrir/fechar módulo nenhuma: só
// chama a função de toggle de cada um, exatamente como um clique no ícone
// faria.

import { SoundManager } from './sound-manager.js';
import { lockBodyScroll, unlockBodyScroll } from './dom-utils.js';

const ICONS = {
    notes: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
    library: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
    timezone: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
    configs: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    bauform: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>`,
    broadcast: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    enter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>`,
    arrowDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
    arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
};

function injectStyles() {
    if (document.getElementById('cw-palette-styles')) return;
    const style = document.createElement('style');
    style.id = 'cw-palette-styles';
    style.textContent = `
        .cw-palette-overlay {
            position: fixed; inset: 0;
            background: rgba(32,33,36,0.4);
            backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
            z-index: 2147483647;
            display: flex; align-items: flex-start; justify-content: center;
            padding-top: 14vh;
            opacity: 0; pointer-events: none;
            transition: opacity 0.2s ease;
        }
        .cw-palette-overlay.active { opacity: 1; pointer-events: auto; }

        .cw-palette {
            width: 560px; max-width: 90vw;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.5);
            overflow: hidden;
            transform: scale(0.96) translateY(-8px);
            transition: transform 0.25s var(--cw-ease-decelerate);
            font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-palette-overlay.active .cw-palette { transform: scale(1) translateY(0); }
        @media (prefers-reduced-motion: reduce) {
            .cw-palette-overlay, .cw-palette { transition: opacity 0.15s ease !important; transform: none !important; }
        }

        .cw-palette-search { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid #F1F3F4; }
        .cw-palette-search-icon { color: #9AA0A6; display: flex; flex-shrink: 0; }
        .cw-palette-search-icon svg { width: 20px; height: 20px; }
        .cw-palette-input { flex: 1; border: none; outline: none; background: transparent; font-size: 16px; color: #202124; font-family: inherit; }
        .cw-palette-input::placeholder { color: #9AA0A6; }

        .cw-palette-list { max-height: 340px; overflow-y: auto; padding: 8px; }
        .cw-palette-item { display: flex; align-items: center; gap: 14px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s ease; }
        .cw-palette-item.selected { background: #E8F0FE; }
        .cw-palette-item-icon { width: 32px; height: 32px; border-radius: 9px; background: #F1F3F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #5F6368; transition: background-color 0.1s ease, color 0.1s ease; }
        .cw-palette-item-icon svg { width: 18px; height: 18px; }
        .cw-palette-item.selected .cw-palette-item-icon { background: #FFFFFF; color: #1A73E8; }
        .cw-palette-item-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cw-palette-item-label { font-size: 14px; font-weight: 600; color: #202124; }
        .cw-palette-item-hint { font-size: 12px; color: #5F6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-palette-empty { padding: 32px; text-align: center; color: #9AA0A6; font-size: 13px; }

        .cw-palette-footer { display: flex; gap: 16px; padding: 10px 20px; border-top: 1px solid #F1F3F4; background: #FAFAFA; font-size: 11px; color: #9AA0A6; font-weight: 600; }
        .cw-palette-footer span { display: flex; align-items: center; gap: 4px; }
        .cw-palette-footer svg { width: 12px; height: 12px; }
    `;
    document.head.appendChild(style);
}

export function initCommandPalette(actions) {
    injectStyles();

    // Remove acentos pra busca tolerar "notas"/"nota", com ou sem acento -
    // o resto do app inteiro é em PT-BR, mas os módulos em si têm nome em
    // inglês (Case Notes, Call Script...); sem os `keywords` em português,
    // digitar a palavra óbvia ("notas", "script", "fuso") não achava nada.
    function normalize(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    const ALL_ACTIONS = [
        { id: 'notes', label: 'Case Notes', hint: 'Montar a nota técnica do caso', keywords: 'notas nota caso anotacoes', icon: ICONS.notes, run: actions.toggleNotes },
        { id: 'bauform', label: 'BAU Form', hint: 'Solicitação de criação/descarte BAU', keywords: 'bau formulario solicitacao criacao descarte', icon: ICONS.bauform, run: actions.toggleBAUForm },
        { id: 'email', label: 'Email Assistant', hint: 'Templates inteligentes de e-mail', keywords: 'email e-mail correio template', icon: ICONS.email, run: actions.toggleEmail },
        { id: 'script', label: 'Call Script', hint: 'Guia interativo de chamada', keywords: 'script roteiro chamada ligacao', icon: ICONS.script, run: actions.toggleScript },
        { id: 'links', label: 'Central de Links', hint: 'Ferramentas, SOPs e atalhos', keywords: 'links atalhos ferramentas sop sops', icon: ICONS.links, run: actions.toggleLinks },
        { id: 'library', label: 'Minha Biblioteca', hint: 'Snippets e respostas salvas', keywords: 'biblioteca snippets respostas salvas', icon: ICONS.library, run: actions.toggleLibrary },
        { id: 'timezone', label: 'Fusos Horários', hint: 'Monitoramento e planejador de chamada', keywords: 'fuso horario timezone', icon: ICONS.timezone, run: actions.toggleTimezone },
        { id: 'broadcast', label: 'Avisos', hint: 'Comunicados e disponibilidade BAU', keywords: 'avisos broadcast comunicados disponibilidade', icon: ICONS.broadcast, run: () => actions.broadcastControl && actions.broadcastControl.toggle() },
        { id: 'configs', label: 'Configurações', hint: 'Perfil, som e preferências', keywords: 'configuracoes config preferencias perfil som', icon: ICONS.configs, run: actions.toggleConfigs },
    ]
        .filter(a => typeof a.run === 'function')
        .map(a => ({ ...a, _haystack: normalize(`${a.label} ${a.hint} ${a.keywords}`) }));

    let isOpen = false;
    let selectedIndex = 0;
    let filtered = ALL_ACTIONS;

    const overlay = document.createElement('div');
    overlay.className = 'cw-palette-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Busca rápida');

    const palette = document.createElement('div');
    palette.className = 'cw-palette';
    palette.innerHTML = `
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${ICONS.search}</span>
            <input type="text" class="cw-palette-input" placeholder="Buscar um módulo..." autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span>${ICONS.arrowDown}${ICONS.arrowUp} navegar</span>
            <span>${ICONS.enter} selecionar</span>
            <span>esc fechar</span>
        </div>
    `;
    overlay.appendChild(palette);
    overlay.onmousedown = (e) => { if (e.target === overlay) close(); };

    const input = palette.querySelector('.cw-palette-input');
    const list = palette.querySelector('.cw-palette-list');

    function render() {
        list.innerHTML = '';
        if (filtered.length === 0) {
            list.innerHTML = `<div class="cw-palette-empty">Nada encontrado.</div>`;
            return;
        }
        filtered.forEach((action, idx) => {
            const item = document.createElement('div');
            item.className = 'cw-palette-item' + (idx === selectedIndex ? ' selected' : '');
            item.innerHTML = `
                <span class="cw-palette-item-icon">${action.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label">${action.label}</span>
                    <span class="cw-palette-item-hint">${action.hint}</span>
                </span>
            `;
            item.onmouseenter = () => { selectedIndex = idx; render(); };
            item.onclick = () => activate(idx);
            list.appendChild(item);
        });
        const selectedEl = list.children[selectedIndex];
        if (selectedEl) selectedEl.scrollIntoView({ block: 'nearest' });
    }

    function activate(idx) {
        const action = filtered[idx];
        if (!action) return;
        SoundManager.playClick();
        close();
        action.run();
    }

    function open() {
        if (isOpen) return;
        isOpen = true;
        filtered = ALL_ACTIONS;
        selectedIndex = 0;
        input.value = '';
        render();
        lockBodyScroll();
        document.body.appendChild(overlay);
        SoundManager.playGenieOpen();
        requestAnimationFrame(() => {
            overlay.classList.add('active');
            input.focus();
        });
    }

    function close() {
        if (!isOpen) return;
        isOpen = false;
        unlockBodyScroll();
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 200);
    }

    function toggle() {
        if (isOpen) close(); else open();
    }

    input.addEventListener('input', () => {
        const term = normalize(input.value.trim());
        filtered = term
            ? ALL_ACTIONS.filter(a => a._haystack.includes(term))
            : ALL_ACTIONS;
        selectedIndex = 0;
        render();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
            render();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            render();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            activate(selectedIndex);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        }
    });

    // Ctrl/Cmd+K abre de qualquer lugar - mesmo padrão que Slack/Linear/Notion
    // já consagraram, sobrepondo o atalho nativo do navegador de propósito.
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggle();
        }
    });

    return { open, close, toggle };
}
