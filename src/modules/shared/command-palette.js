// src/modules/shared/command-palette.js
//
// Command palette (Ctrl/Cmd+K) - abre um buscador rápido por cima de
// qualquer coisa e liga direto nas mesmas funções de toggle que a pílula
// flutuante já usa. Não duplica lógica de abrir/fechar módulo nenhuma: só
// chama a função de toggle de cada um, exatamente como um clique no ícone
// faria.

import { SoundManager } from './sound-manager.js';
import { lockBodyScroll, unlockBodyScroll, clamp } from './dom-utils.js';
import { getLanguage, onLanguageChange } from './i18n.js';
import { ShortcutService } from './shortcut-service.js';

const ICONS = {
    notes: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    precall: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/></svg>`,
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
    bolt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
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
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        /* Sem pointer-events: none no estado fechado: o overlay fica no DOM
           por 200ms depois de fechar, e nesse intervalo ele precisa continuar
           engolindo o clique. Sem isso, o 2º clique de um duplo clique num item
           atravessava a palette e caía no CRM. */
        .cw-palette-overlay.active { opacity: 1; }

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

        /* O teto de 340px não olhava a janela: com o DevTools encaixado ou
           zoom alto o rodapé saía da tela (overlay não rola). 86vh - 130px é o
           que sobra depois do respiro de cima (14vh), da busca e do rodapé. */
        .cw-palette-list { max-height: min(340px, calc(86vh - 130px)); overflow-y: auto; padding: 8px; }
        .cw-palette-item { display: flex; align-items: center; gap: 14px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s ease; }
        .cw-palette-item.selected { background: #E8F0FE; }
        .cw-palette-item-icon { width: 32px; height: 32px; border-radius: 9px; background: #F1F3F4; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #5F6368; transition: background-color 0.1s ease, color 0.1s ease; }
        .cw-palette-item-icon svg { width: 18px; height: 18px; }
        .cw-palette-item.selected .cw-palette-item-icon { background: #FFFFFF; color: #1A73E8; }
        .cw-palette-item-icon--preset { background: #FEF7E0; color: #F9A825; }
        .cw-palette-item.selected .cw-palette-item-icon--preset { background: #FFFFFF; color: #F9A825; }
        .cw-palette-item-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cw-palette-item-label { font-size: 14px; font-weight: 600; color: #202124; }
        .cw-palette-item-hint { font-size: 12px; color: #5F6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-palette-empty { padding: 32px; text-align: center; color: #9AA0A6; font-size: 13px; }
        .cw-palette-group {
            padding: 10px 12px 4px; font-size: 10.5px; font-weight: 700;
            color: #9AA0A6; text-transform: uppercase; letter-spacing: 0.8px;
        }
        .cw-palette-group:first-child { padding-top: 4px; }

        .cw-palette-footer { display: flex; gap: 16px; padding: 10px 20px; border-top: 1px solid #F1F3F4; background: #FAFAFA; font-size: 11px; color: #9AA0A6; font-weight: 600; }
        .cw-palette-footer span { display: flex; align-items: center; gap: 4px; }
        .cw-palette-footer svg { width: 12px; height: 12px; }
    `;
    document.head.appendChild(style);
}

const CP_DICT = {
    pt: {
        ariaLabel: 'Busca rápida',
        placeholder: 'Buscar um módulo...',
        empty: 'Nada encontrado.',
        navigate: 'navegar',
        select: 'selecionar',
        close: 'esc fechar',
        groupShortcuts: 'Meus atalhos',
        groupModules: 'Módulos',
    },
    en: {
        ariaLabel: 'Quick search',
        placeholder: 'Search for a module...',
        empty: 'Nothing found.',
        navigate: 'navigate',
        select: 'select',
        close: 'esc to close',
        groupShortcuts: 'My shortcuts',
        groupModules: 'Modules',
    },
    es: {
        ariaLabel: 'Búsqueda rápida',
        placeholder: 'Buscar un módulo...',
        empty: 'No se encontró nada.',
        navigate: 'navegar',
        select: 'seleccionar',
        close: 'esc cerrar',
        groupShortcuts: 'Mis atajos',
        groupModules: 'Módulos',
    },
};
function cpt(key) {
    const lang = getLanguage();
    return CP_DICT[lang]?.[key] ?? CP_DICT.pt[key];
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

    // Atalhos do agente: vêm do ShortcutService (preferência da pessoa,
    // sincronizada na nuvem), não mais de um campo dentro do cenário. São
    // relidos a cada abertura porque o agente pode ter acabado de criar um em
    // Configurações ou no próprio Case Notes.
    //
    // O `label` e o `alias` são escritos pelo próprio agente, então não têm
    // versão por idioma; só o hint, que é texto nosso, tem as duas.
    function noteShortcuts() {
        if (typeof actions.toggleNotes !== 'function' ||
            typeof actions.toggleNotes.openWithPreset !== 'function') return [];

        return ShortcutService.list().map((shortcut) => ({
            id: `shortcut-${shortcut.id}`,
            label: shortcut.label,
            hint: { pt: 'Atalho de nota · abre pré-preenchida', es: 'Atajo de nota · abre precompletada' },
            keywords: `nota atalho atajo preset ${shortcut.alias || ''}`,
            icon: ICONS.bolt,
            group: 'shortcuts',
            isPreset: true,
            run: () => {
                ShortcutService.registerUse(shortcut.id);
                actions.toggleNotes.openWithPreset(shortcut);
            }
        }));
    }

    // label fica em português mesmo pra ES: são os nomes dos módulos, e a
    // maioria já é em inglês (Case Notes, Call Script...) ou é curta o
    // bastante (Avisos, Configurações) pra não valer duplicar; só o hint
    // (descrição) e as keywords de busca variam por idioma.
    const MODULE_ACTIONS = [
        { id: 'notes', label: 'Case Notes', hint: { pt: 'Montar a nota técnica do caso', es: 'Armar la nota técnica del caso' }, keywords: 'notas nota caso anotacoes anotaciones', icon: ICONS.notes, run: actions.toggleNotes },
        { id: 'precall', label: 'Pre-call Checklist', hint: { pt: 'Checklist antes da ligação, direto na nota', es: 'Checklist antes de la llamada, directo en la nota', en: 'Checklist before the call, straight into the note' }, keywords: 'precall pre call checklist ligacao llamada verificacao verificacion', icon: ICONS.precall, run: actions.togglePrecall },
        { id: 'bauform', label: 'BAU Form', hint: { pt: 'Solicitação de criação/descarte BAU', es: 'Solicitud de creación/descarte BAU' }, keywords: 'bau formulario solicitacao solicitud criacao creacion descarte', icon: ICONS.bauform, run: actions.toggleBAUForm },
        { id: 'email', label: 'Email Assistant', hint: { pt: 'Templates inteligentes de e-mail', es: 'Plantillas inteligentes de correo' }, keywords: 'email e-mail correio correo template plantilla', icon: ICONS.email, run: actions.toggleEmail },
        { id: 'script', label: 'Call Script', hint: { pt: 'Guia interativo de chamada', es: 'Guía interactiva de llamada' }, keywords: 'script roteiro guion chamada llamada ligacao', icon: ICONS.script, run: actions.toggleScript },
        { id: 'links', label: 'Central de Links', hint: { pt: 'Ferramentas, SOPs e atalhos', es: 'Herramientas, SOPs y atajos' }, keywords: 'links atalhos atajos ferramentas herramientas sop sops', icon: ICONS.links, run: actions.toggleLinks },
        { id: 'library', label: 'Minha Biblioteca', hint: { pt: 'Snippets e respostas salvas', es: 'Snippets y respuestas guardadas' }, keywords: 'biblioteca snippets respostas respuestas salvas guardadas', icon: ICONS.library, run: actions.toggleLibrary },
        { id: 'timezone', label: 'Fusos Horários', hint: { pt: 'Monitoramento e planejador de chamada', es: 'Monitoreo y planificador de llamada' }, keywords: 'fuso horario timezone', icon: ICONS.timezone, run: actions.toggleTimezone },
        { id: 'broadcast', label: 'Avisos', hint: { pt: 'Comunicados e disponibilidade BAU', es: 'Comunicados y disponibilidad BAU' }, keywords: 'avisos broadcast comunicados disponibilidade disponibilidad', icon: ICONS.broadcast, run: () => actions.broadcastControl && actions.broadcastControl.toggle() },
        { id: 'configs', label: 'Configurações', hint: { pt: 'Perfil, som e preferências', es: 'Perfil, sonido y preferencias' }, keywords: 'configuracoes configuracion config preferencias perfil som sonido', icon: ICONS.configs, run: actions.toggleConfigs },
    ].map(a => ({ ...a, group: 'modules' }));

    // Os atalhos do agente vêm primeiro: são dele, e são o que ele repete
    // dezenas de vezes por dia. Os módulos seguem logo abaixo, na ordem de
    // sempre.
    function buildActions() {
        return [...noteShortcuts(), ...MODULE_ACTIONS]
            .filter(a => typeof a.run === 'function')
            .map(a => ({ ...a, _haystack: normalize(`${a.label} ${a.hint.pt} ${a.hint.es} ${a.keywords}`) }));
    }

    // Overlays que mandam na tela e têm o próprio teclado (diálogos, wizards de
    // onboarding/novidades, card de processamento). A pílula já não é clicável
    // enquanto o card de processamento está no ar (.cw-pill.cw-busy); sem esta
    // lista, o Ctrl+K era o caminho que furava essa regra e abria módulo por
    // cima de uma automação rodando, ou ficava mudo atrás do wizard, que engole
    // Enter/Esc/Tab na captura do document.
    const BLOCKING_OVERLAYS = '.cw-dialog-overlay, .cw-wiz-overlay, .cw-ob-lang-overlay, .cw-processing-card';

    let isOpen = false;
    let selectedIndex = 0;
    let allActions = buildActions();
    let filtered = allActions;
    let itemEls = [];
    let removeTimer = null;
    let previouslyFocused = null;

    const overlay = document.createElement('div');
    overlay.className = 'cw-palette-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', cpt('ariaLabel'));

    const palette = document.createElement('div');
    palette.className = 'cw-palette';
    palette.innerHTML = `
        <div class="cw-palette-search">
            <span class="cw-palette-search-icon">${ICONS.search}</span>
            <input type="text" class="cw-palette-input" placeholder="${cpt('placeholder')}" autocomplete="off" spellcheck="false">
        </div>
        <div class="cw-palette-list"></div>
        <div class="cw-palette-footer">
            <span class="js-cp-navigate">${ICONS.arrowDown}${ICONS.arrowUp} ${cpt('navigate')}</span>
            <span class="js-cp-select">${ICONS.enter} ${cpt('select')}</span>
            <span class="js-cp-close">${cpt('close')}</span>
        </div>
    `;
    overlay.appendChild(palette);
    overlay.onmousedown = (e) => { if (e.target === overlay) close(); };

    const input = palette.querySelector('.cw-palette-input');
    const list = palette.querySelector('.cw-palette-list');

    // Clicar em qualquer ponto da palette que não seja o campo (rodapé,
    // cabeçalho de grupo, folga da lista) tirava o foco do input para o body, e
    // as setas/Enter/Esc morriam em silêncio: o teclado só escuta quem está
    // focado. O mousedown sem ação padrão mantém o foco no input; o click nos
    // itens continua chegando normalmente.
    palette.addEventListener('mousedown', (e) => { if (e.target !== input) e.preventDefault(); });

    // Muda só QUAL item está selecionado, sem tocar na lista. Antes a seleção
    // era feita reconstruindo a lista inteira, e o hover chamava isso a cada
    // mouseenter: o navegador, ao ver o DOM trocado debaixo do cursor, emitia
    // outro mouseover, que reconstruía de novo - mais de dez reconstruções por
    // segundo com o mouse PARADO. O clique no item se perdia no meio delas.
    function select(idx, { scroll = false } = {}) {
        selectedIndex = idx;
        itemEls.forEach((el, i) => el.classList.toggle('selected', i === idx));
        if (scroll && itemEls[idx]) itemEls[idx].scrollIntoView({ block: 'nearest' });
    }

    function move(delta) {
        if (!filtered.length) return;
        select(clamp(selectedIndex + delta, 0, filtered.length - 1), { scroll: true });
    }

    function render() {
        list.innerHTML = '';
        itemEls = [];
        if (filtered.length === 0) {
            list.innerHTML = `<div class="cw-palette-empty">${cpt('empty')}</div>`;
            return;
        }
        // Cabeçalhos de grupo são elementos NÃO selecionáveis: entram no DOM
        // mas ficam fora de `filtered`, que continua sendo só a lista de ações.
        // É o que mantém a navegação por setas (selectedIndex) linear - inserir
        // cabeçalho como item quebraria o índice a cada busca.
        let grupoAnterior = null;

        filtered.forEach((action, idx) => {
            if (action.group !== grupoAnterior) {
                grupoAnterior = action.group;
                const header = document.createElement('div');
                header.className = 'cw-palette-group';
                header.textContent = cpt(action.group === 'shortcuts' ? 'groupShortcuts' : 'groupModules');
                header.setAttribute('aria-hidden', 'true');
                list.appendChild(header);
            }

            const item = document.createElement('div');
            item.className = 'cw-palette-item';
            item.dataset.idx = idx;
            item.innerHTML = `
                <span class="cw-palette-item-icon${action.isPreset ? ' cw-palette-item-icon--preset' : ''}">${action.icon}</span>
                <span class="cw-palette-item-text">
                    <span class="cw-palette-item-label"></span>
                    <span class="cw-palette-item-hint"></span>
                </span>
            `;
            // textContent, não interpolação: o rótulo do atalho é digitado pelo
            // agente, e um "<" ou um "<b>" nele era lido como HTML.
            item.querySelector('.cw-palette-item-label').textContent = action.label;
            item.querySelector('.cw-palette-item-hint').textContent = action.hint[getLanguage()] || action.hint.pt;
            list.appendChild(item);
            itemEls.push(item);
        });
        select(selectedIndex, { scroll: true });
    }

    // O mousemove também dispara quando a lista rola ou é reconstruída debaixo
    // de um cursor parado. Sem comparar a posição, uma seta ↓ que rolava a lista
    // devolvia a seleção ao item sob o cursor - e a navegação por teclado
    // empacava no meio da lista sempre que o mouse estava em cima dela.
    let lastMouse = { x: -1, y: -1 };
    list.addEventListener('mousemove', (e) => {
        if (e.clientX === lastMouse.x && e.clientY === lastMouse.y) return;
        lastMouse = { x: e.clientX, y: e.clientY };
        const item = e.target.closest('.cw-palette-item');
        if (item) select(Number(item.dataset.idx));
    });
    list.addEventListener('click', (e) => {
        const item = e.target.closest('.cw-palette-item');
        if (item) activate(Number(item.dataset.idx));
    });

    function activate(idx) {
        // Já fechada = já ativou. O Enter duplo e o duplo clique chegam aqui
        // duas vezes dentro dos 200ms em que o overlay ainda existe, e como os
        // módulos alternam (abre/fecha), a 2ª chamada desfazia a 1ª.
        if (!isOpen) return;
        const action = filtered[idx];
        if (!action) return;
        SoundManager.playClick();
        // O foco não volta ao campo do CRM: a ação que vai rodar assume a tela.
        close({ restoreFocus: false });
        action.run();
    }

    function open() {
        if (isOpen) return;
        // Cancela a remoção agendada por um close() de menos de 200ms atrás.
        // Sem isso, abrir logo depois de fechar (Ctrl+K duas vezes seguidas)
        // deixava o timer antigo tirar o overlay NOVO do DOM: a palette ficava
        // "aberta" por dentro, invisível, com o scroll da página travado.
        clearTimeout(removeTimer);
        isOpen = true;
        previouslyFocused = document.activeElement;
        // Relê os atalhos a cada abertura: o agente pode ter criado ou apagado
        // um segundos atrás, em Configurações ou no Case Notes.
        allActions = buildActions();
        filtered = allActions;
        selectedIndex = 0;
        input.value = '';
        render();
        lockBodyScroll();
        document.body.appendChild(overlay);
        SoundManager.playGenieOpen();
        requestAnimationFrame(() => {
            // Fechou antes do frame: não pode reativar nem tomar o foco de volta
            // do campo para onde o close() acabou de devolvê-lo.
            if (!isOpen) return;
            overlay.classList.add('active');
            input.focus();
        });
    }

    function close({ restoreFocus = true } = {}) {
        if (!isOpen) return;
        isOpen = false;
        unlockBodyScroll();
        overlay.classList.remove('active');
        removeTimer = setTimeout(() => overlay.remove(), 200);
        // Esc/clique no fundo = desistiu: devolve o cursor ao campo do CRM em
        // que o agente estava digitando, em vez de largá-lo no body.
        if (restoreFocus && previouslyFocused && document.contains(previouslyFocused)) {
            try { previouslyFocused.focus({ preventScroll: true }); } catch (_) { /* elemento não focável */ }
        }
        previouslyFocused = null;
    }

    function toggle() {
        if (isOpen) close(); else open();
    }

    input.addEventListener('input', () => {
        const term = normalize(input.value.trim());
        filtered = term
            ? allActions.filter(a => a._haystack.includes(term))
            : allActions;
        selectedIndex = 0;
        render();
    });

    // No overlay, e não só no input: qualquer coisa focada dentro da palette
    // continua respondendo ao teclado.
    overlay.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Tab') {
            // O Tab anda pela lista como a seta (Shift+Tab volta) e nunca sai
            // daqui. Antes ele passava pela lista e depois pelos campos do CRM
            // por trás do overlay - o que o agente digitasse a partir daí caía
            // no CRM, e as setas e o Enter da palette não respondiam mais.
            e.preventDefault();
            move(e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey) ? -1 : 1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            activate(selectedIndex);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            // O Esc global de animations.js fecha a janela de módulo aberta;
            // sem isto, fechar a palette fechava também o módulo por baixo.
            e.stopPropagation();
            close();
        }
    });

    // Ctrl/Cmd+K abre de qualquer lugar - mesmo padrão que Slack/Linear/Notion
    // já consagraram, sobrepondo o atalho nativo do navegador de propósito.
    // Captura (`true`), como no wizard-shell: um campo do CRM que dê
    // stopPropagation no keydown não pode engolir o atalho antes de chegar aqui.
    document.addEventListener('keydown', (e) => {
        // Só Ctrl/Cmd+K puro: Ctrl+Shift+K e Ctrl+Alt+K (AltGr no Windows) são
        // de outras coisas e também abriam a palette.
        if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
        if (typeof e.key !== 'string' || e.key.toLowerCase() !== 'k') return;

        e.preventDefault();
        // Tecla segurada repete o keydown: abria e fechava em rajada, com som.
        if (e.repeat) return;
        if (!isOpen && document.querySelector(BLOCKING_OVERLAYS)) return;
        toggle();
    }, true);

    onLanguageChange(() => {
        overlay.setAttribute('aria-label', cpt('ariaLabel'));
        input.placeholder = cpt('placeholder');
        const navigateEl = palette.querySelector('.js-cp-navigate');
        if (navigateEl) navigateEl.innerHTML = `${ICONS.arrowDown}${ICONS.arrowUp} ${cpt('navigate')}`;
        const selectEl = palette.querySelector('.js-cp-select');
        if (selectEl) selectEl.innerHTML = `${ICONS.enter} ${cpt('select')}`;
        const closeEl = palette.querySelector('.js-cp-close');
        if (closeEl) closeEl.textContent = cpt('close');
        render();
    });

    return { open, close, toggle };
}
