// src/modules/personal-library/personal-library-assistant.js

import { stylePopup, styleResizeHandle, makeResizable, showToast, confirmDialog, promptDialog } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { SnippetService } from "./snippet-service.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";

const LIB_DICT = {
    pt: {
        headerTitle: "Minha Biblioteca",
        headerDesc: "Gerencie seus snippets, textos e templates.",
        tabs: { general: "Geral", note: "Notas", email: "Emails" },
        searchPlaceholder: "Buscar por título ou conteúdo...",
        newItem: "Novo item",
        cancel: "Cancelar",
        recentlyUsed: "🕒 Usados recentemente",
        nothingFound: "Nada encontrado",
        nothingHereYet: "Nada aqui ainda",
        noItemMatches: (term) => `Nenhum item bate com "${term}" nesta aba.`,
        clickPlusToStart: "Clique no + para começar sua coleção.",
        copy: "Copiar",
        moreActions: "Mais ações",
        edit: "Editar",
        delete: "Excluir",
        deleteConfirm: (title) => `Excluir "${title}"?`,
        itemDeletedToast: "Item excluído.",
        copiedToast: "Copiado!",
        titleLabel: "Título / Nome",
        subjectLabel: "Assunto do Email",
        contentLabel: "Conteúdo",
        emailBodyLabel: "Corpo do Email (HTML)",
        noteTextLabel: "Texto da Nota",
        editItemTitle: "Editar Item",
        newItemTitle: "Novo Item",
        save: "Salvar",
        saveChanges: "Salvar Alterações",
        saving: "Salvando...",
        bold: "Negrito",
        italic: "Itálico",
        codeFormat: "Formato código",
        insertImage: "Inserir imagem",
        imageUrlPrompt: "Cole a URL da imagem:",
        fillTitleAndContent: "Preencha título e conteúdo.",
        subjectRequired: "Assunto é obrigatório para emails.",
        saveFailedNoUser: "Não foi possível salvar: usuário não identificado. Recarregue a página e tente de novo.",
        savedLocalOnly: "Salvo localmente — sem conexão com a nuvem no momento.",
        savedAndSynced: "Salvo e sincronizado!",
        saveError: "Erro ao salvar item.",
    },
    es: {
        headerTitle: "Mi Biblioteca",
        headerDesc: "Gestiona tus snippets, textos y plantillas.",
        tabs: { general: "General", note: "Notas", email: "Emails" },
        searchPlaceholder: "Buscar por título o contenido...",
        newItem: "Nuevo elemento",
        cancel: "Cancelar",
        recentlyUsed: "🕒 Usados recientemente",
        nothingFound: "No se encontró nada",
        nothingHereYet: "Todavía no hay nada aquí",
        noItemMatches: (term) => `Ningún elemento coincide con "${term}" en esta pestaña.`,
        clickPlusToStart: "Haz clic en + para empezar tu colección.",
        copy: "Copiar",
        moreActions: "Más acciones",
        edit: "Editar",
        delete: "Eliminar",
        deleteConfirm: (title) => `¿Eliminar "${title}"?`,
        itemDeletedToast: "Elemento eliminado.",
        copiedToast: "¡Copiado!",
        titleLabel: "Título / Nombre",
        subjectLabel: "Asunto del Email",
        contentLabel: "Contenido",
        emailBodyLabel: "Cuerpo del Email (HTML)",
        noteTextLabel: "Texto de la Nota",
        editItemTitle: "Editar Elemento",
        newItemTitle: "Nuevo Elemento",
        save: "Guardar",
        saveChanges: "Guardar Cambios",
        saving: "Guardando...",
        bold: "Negrita",
        italic: "Cursiva",
        codeFormat: "Formato código",
        insertImage: "Insertar imagen",
        imageUrlPrompt: "Pega la URL de la imagen:",
        fillTitleAndContent: "Completa el título y el contenido.",
        subjectRequired: "El asunto es obligatorio para emails.",
        saveFailedNoUser: "No se pudo guardar: usuario no identificado. Recarga la página e inténtalo de nuevo.",
        savedLocalOnly: "Guardado localmente — sin conexión con la nube en este momento.",
        savedAndSynced: "¡Guardado y sincronizado!",
        saveError: "Error al guardar el elemento.",
    },
};
function libt(key) {
    const lang = getLanguage();
    return LIB_DICT[lang]?.[key] ?? LIB_DICT.pt[key];
}

// --- ÍCONES (Material Symbols, estilo outline) ---
const ICONS = {
    tabs: {
        general: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
        note: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>`,
        email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
    },
    search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    clear: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    more: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="12" cy="19" r="1.8"></circle></svg>`,
    edit: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
    delete: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    add: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
    bold: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>`,
    italic: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>`,
    code: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    image: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    media: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    empty: `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>`
};

const TABS = [
    { id: 'general', icon: ICONS.tabs.general },
    { id: 'note', icon: ICONS.tabs.note },
    { id: 'email', icon: ICONS.tabs.email }
];

// --- USADOS RECENTEMENTE ---
// Só guarda IDs (não o conteúdo) - a lista de itens de verdade continua
// vindo do SnippetService, isso aqui é só "última ordem de uso" por aba.
const RECENT_KEY = 'cw_lib_recent_v1';
const RECENT_MAX = 4;

function trackRecentUse(itemId) {
    try {
        let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
        recent = recent.filter(id => id !== itemId);
        recent.unshift(itemId);
        recent = recent.slice(0, RECENT_MAX * 3); // folga pra sobreviver a filtros por aba
        localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch (e) { console.warn("Erro ao salvar uso recente", e); }
}

function getRecentItems(tab) {
    try {
        const recentIds = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
        if (recentIds.length === 0) return [];
        const itemsById = new Map(SnippetService.getSnippets(tab).map(item => [item.id, item]));
        return recentIds.map(id => itemsById.get(id)).filter(Boolean).slice(0, RECENT_MAX);
    } catch (e) { return []; }
}

// --- FOLHA DE ESTILOS DEDICADA (Material 3 + Glass) ---
// Substitui o antigo padrão de montar style="..." via objectToCss() elemento a
// elemento: além de mais fácil de manter, evita a classe de bug de vendor-prefix
// que esse padrão tinha (ex: "webkitLineClamp" virava "webkit-line-clamp" sem o
// hífen inicial, uma propriedade CSS inválida — por isso a prévia dos cards nunca
// truncava direito).
function injectStyles() {
    if (document.getElementById('cw-lib-styles-v2')) return;
    const style = document.createElement('style');
    style.id = 'cw-lib-styles-v2';
    style.textContent = `
        #library-popup {
            width: 620px !important;
            max-width: 95vw !important;
            height: 680px !important;
            max-height: 90vh !important;
        }

        .cw-lib-container {
            display: flex; flex-direction: column; height: 100%;
            background: linear-gradient(180deg, #FAFBFC 0%, #F1F3F9 100%);
            font-family: 'Google Sans', Roboto, sans-serif;
            position: relative; overflow: hidden;
        }

        /* --- TOOLBAR: BUSCA + ABAS SEGMENTADAS --- */
        .cw-lib-toolbar { padding: 16px 20px 12px 20px; display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }

        .cw-lib-search-wrap { position: relative; }
        .cw-lib-search-icon {
            position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
            color: #80868b; pointer-events: none; display: flex;
        }
        .cw-lib-search {
            width: 100%; box-sizing: border-box; height: 40px;
            padding: 0 38px 0 40px; border-radius: 12px; border: 1px solid transparent;
            background: rgba(255,255,255,0.75); backdrop-filter: blur(8px);
            font-size: 13.5px; font-family: inherit; color: #202124; outline: none;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04);
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cw-lib-search::placeholder { color: #9aa0a6; }
        .cw-lib-search:focus { background: #fff; border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-lib-search-clear {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            width: 22px; height: 22px; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #80868b; cursor: pointer;
            transition: background 0.15s ease;
        }
        .cw-lib-search-clear:hover { background: rgba(0,0,0,0.06); }
        .cw-lib-search-clear.visible { display: flex; }

        .cw-lib-tabs {
            display: flex; gap: 4px; padding: 4px;
            background: rgba(0,0,0,0.045); border-radius: 100px;
        }
        .cw-lib-tab {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
            padding: 8px 10px; border-radius: 100px; cursor: pointer; user-select: none;
            font-size: 12.5px; font-weight: 500; color: #5f6368;
            transition: background-color 0.25s var(--cw-ease-standard), color 0.25s var(--cw-ease-standard), box-shadow 0.25s var(--cw-ease-standard);
        }
        .cw-lib-tab svg { flex-shrink: 0; }
        .cw-lib-tab:hover { color: #202124; }
        .cw-lib-tab.active { background: #fff; color: #1a73e8; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.12); }

        /* --- GRID DE CARDS --- */
        .cw-lib-grid {
            flex: 1; overflow-y: auto; padding: 4px 20px 96px 20px;
            display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 14px;
            align-content: start;
        }

        .cw-lib-card {
            background: rgba(255,255,255,0.68); backdrop-filter: blur(14px);
            border: 1px solid rgba(255,255,255,0.5);
            border-radius: 18px; padding: 16px 16px 12px 16px;
            position: relative; isolation: isolate;
            box-shadow: 0 1px 3px rgba(60,64,67,0.08);
            transition: box-shadow 0.35s var(--cw-ease-elastic), border-color 0.35s ease;
            display: flex; flex-direction: column;
        }
        /* isolation:isolate dá a cada card seu próprio contexto de empilhamento,
           então um z-index alto só no .cw-lib-menu não basta pra ele ficar
           acima do card da linha seguinte (que vem depois no DOM e por isso
           pinta por cima por padrão) — precisa levantar o card inteiro. */
        .cw-lib-card.menu-open { z-index: 5; }
        .cw-lib-card::before {
            content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
            background: linear-gradient(135deg, rgba(138,180,248,0.16), rgba(197,138,249,0.16), rgba(242,139,130,0.16));
            background-size: 300% 300%; opacity: 0; transition: opacity 0.4s ease;
        }
        /* Sem transform no próprio card - hit-box parado evita flicker de
           hover perto da borda. Elevação só por sombra/borda. */
        .cw-lib-card:hover { box-shadow: 0 10px 24px rgba(60,64,67,0.14); border-color: rgba(255,255,255,0.9); }
        .cw-lib-card:hover::before { opacity: 1; animation: cwLibAura 8s ease infinite; }
        .cw-lib-card.is-code { border-left: 3px solid #1a73e8; }
        @keyframes cwLibAura { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .cw-lib-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .cw-lib-card-title { font-size: 14px; font-weight: 600; color: #202124; letter-spacing: -0.01em; line-height: 1.35; }
        .cw-lib-card-badges { display: flex; gap: 4px; flex-shrink: 0; }
        .cw-lib-badge { font-size: 9.5px; font-weight: 700; letter-spacing: 0.3px; padding: 2px 6px; border-radius: 5px; white-space: nowrap; }
        .cw-lib-badge.code { background: rgba(26,115,232,0.1); color: #1a73e8; font-family: 'Roboto Mono', monospace; }
        .cw-lib-badge.template { background: rgba(0,0,0,0.05); color: #5f6368; }

        .cw-lib-media-tag {
            display: inline-flex; align-items: center; gap: 4px;
            background: rgba(26,115,232,0.1); color: #1a73e8;
            padding: 2px 8px; border-radius: 8px; font-size: 10.5px; font-weight: 600;
            margin-bottom: 6px; width: fit-content;
        }

        .cw-lib-card-preview {
            font-size: 12.5px; color: #5f6368; line-height: 1.55; flex: 1;
            display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
            word-break: break-word;
        }
        .cw-lib-card-preview.code { font-family: 'Roboto Mono', monospace; font-size: 11.5px; background: rgba(0,0,0,0.03); padding: 8px 10px; border-radius: 8px; }

        .cw-lib-card-foot { display: flex; align-items: center; justify-content: flex-end; gap: 2px; margin-top: 10px; }
        .cw-lib-icon-btn {
            width: 30px; height: 30px; border-radius: 50%; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; color: #5f6368;
            transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
            position: relative;
        }
        .cw-lib-icon-btn:hover { background: rgba(26,115,232,0.1); color: #1a73e8; }
        .cw-lib-icon-btn:active { transform: scale(0.92); }
        .cw-lib-icon-btn.danger:hover { background: rgba(217,48,37,0.1); color: #d93025; }

        /* --- MENU DE OVERFLOW (Editar / Excluir) --- */
        .cw-lib-menu {
            position: absolute; top: calc(100% + 4px); right: 0; z-index: 30;
            background: rgba(255,255,255,0.96); backdrop-filter: blur(16px);
            border: 1px solid rgba(0,0,0,0.06); border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.16); padding: 6px; min-width: 140px;
            opacity: 0; transform: translateY(-4px) scale(0.96); pointer-events: none;
            transition: opacity 0.15s ease, transform 0.15s ease; transform-origin: top right;
        }
        .cw-lib-menu.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .cw-lib-menu-item {
            display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px;
            font-size: 13px; font-weight: 500; color: #3c4043; cursor: pointer; transition: background 0.12s ease;
        }
        .cw-lib-menu-item:hover { background: rgba(0,0,0,0.05); }
        .cw-lib-menu-item.danger { color: #d93025; }
        .cw-lib-menu-item.danger:hover { background: rgba(217,48,37,0.08); }

        /* --- ESTADO VAZIO --- */
        .cw-lib-empty {
            grid-column: 1 / -1; padding: 56px 24px; text-align: center;
            display: flex; flex-direction: column; align-items: center; gap: 12px; color: #80868b;
        }
        .cw-lib-empty-title { font-weight: 600; font-size: 15px; color: #3c4043; }
        .cw-lib-empty-sub { font-size: 13px; max-width: 260px; line-height: 1.5; }

        /* --- USADOS RECENTEMENTE --- */
        .cw-lib-recent-section { grid-column: 1 / -1; margin-bottom: 4px; }
        .cw-lib-recent-title {
            font-size: 11px; font-weight: 700; color: #80868b; text-transform: uppercase;
            letter-spacing: 0.6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .cw-lib-recent-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .cw-lib-recent-chip {
            display: flex; align-items: center; gap: 6px; padding: 7px 14px;
            background: rgba(26,115,232,0.08); border: 1px solid rgba(26,115,232,0.18);
            border-radius: 100px; font-size: 12.5px; font-weight: 600; color: #1a73e8;
            cursor: pointer; max-width: 220px; transition: background-color 0.15s ease, transform 0.15s ease;
        }
        .cw-lib-recent-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-lib-recent-chip:hover { background: rgba(26,115,232,0.14); }
        .cw-lib-recent-chip:focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }

        /* --- FAB --- */
        .cw-lib-fab {
            position: absolute; bottom: 24px; right: 24px; z-index: 15;
            width: 56px; height: 56px; border-radius: 18px;
            background: linear-gradient(135deg, #1a73e8, #0059c1); color: #fff;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 6px 20px rgba(26,115,232,0.42); cursor: pointer;
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        .cw-lib-fab:hover { transform: scale(1.08) rotate(90deg); box-shadow: 0 10px 28px rgba(26,115,232,0.5); }
        .cw-lib-fab:active { transform: scale(0.94) rotate(90deg); }

        /* --- SHEET DO EDITOR (Apple glass, translúcido de verdade) --- */
        .cw-lib-sheet {
            position: absolute; inset: 0; z-index: 25;
            background: rgba(250,251,252,0.6); backdrop-filter: blur(36px) saturate(180%); -webkit-backdrop-filter: blur(36px) saturate(180%);
            transform: translateY(100%); transition: transform 0.5s var(--cw-ease-decelerate);
            display: flex; flex-direction: column;
        }
        .cw-lib-sheet.open { transform: translateY(0); }
        .cw-lib-sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px 0; flex-shrink: 0; }
        .cw-lib-sheet-handle::after { content: ''; width: 36px; height: 4px; border-radius: 3px; background: rgba(0,0,0,0.15); }
        .cw-lib-sheet-head {
            padding: 8px 20px 16px 20px; display: flex; align-items: center; gap: 12px; flex-shrink: 0;
            border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .cw-lib-sheet-back {
            width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            color: #5f6368; cursor: pointer; transition: background 0.15s ease; flex-shrink: 0;
        }
        .cw-lib-sheet-back:hover { background: rgba(0,0,0,0.06); }
        .cw-lib-sheet-title { font-weight: 700; font-size: 16px; color: #202124; flex: 1; }
        .cw-lib-sheet-body { flex: 1; overflow-y: auto; padding: 20px; }
        .cw-lib-sheet-foot { padding: 16px 20px; border-top: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: flex-end; }

        .cw-lib-field { margin-bottom: 20px; }
        .cw-lib-label { display: block; font-size: 12px; font-weight: 700; color: #5f6368; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.4px; }
        .cw-lib-input {
            width: 100%; box-sizing: border-box; padding: 12px 14px; border-radius: 12px;
            border: 1px solid rgba(0,0,0,0.1); font-size: 14px; font-family: inherit; outline: none;
            background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-lib-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }

        .cw-lib-toolbar-mini { display: flex; gap: 4px; margin-bottom: 12px; background: rgba(255,255,255,0.6); padding: 6px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); width: fit-content; }
        .cw-lib-tb-btn {
            width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; cursor: pointer; color: #474747;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-lib-tb-btn:hover { background: rgba(0,0,0,0.05); color: #1a73e8; }
        .cw-lib-tb-btn.active { background: rgba(26,115,232,0.12); color: #1a73e8; }

        .cw-lib-editable {
            min-height: 180px; max-height: 340px; overflow-y: auto; white-space: pre-wrap;
            line-height: 1.65; outline: none;
        }

        .cw-lib-save-btn {
            padding: 11px 28px; border-radius: 100px; border: none; cursor: pointer;
            background: linear-gradient(135deg, #1a73e8, #0059c1); color: #fff; font-weight: 600; font-size: 14px;
            box-shadow: 0 4px 14px rgba(26,115,232,0.35); transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
        }
        .cw-lib-save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,115,232,0.44); }
        .cw-lib-save-btn:active { transform: scale(0.97); }
        .cw-lib-save-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

        .cw-lib-loading {
            position: absolute; inset: 0; z-index: 40; background: rgba(255,255,255,0.7); backdrop-filter: blur(6px);
            display: none; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
        }
        .cw-lib-loading.active { display: flex; }
        .cw-lib-spinner { width: 34px; height: 34px; border: 3px solid rgba(26,115,232,0.15); border-top-color: #1a73e8; border-radius: 50%; animation: cwLibSpin 0.8s linear infinite; }
        @keyframes cwLibSpin { to { transform: rotate(360deg); } }
        .cw-lib-loading-text { font-size: 13px; font-weight: 600; color: #1a73e8; }

        .cw-tactile { transition: transform 0.15s ease; }
        .cw-tactile:active { transform: scale(0.94); }

        /* O spinner de carregamento fica de fora de propósito - é
           informativo (comunica "ainda trabalhando"), não decorativo.
           O resto (aura infinita no hover, cards, FAB, painel deslizando)
           é puro movimento e não tinha nenhuma proteção. */
        @media (prefers-reduced-motion: reduce) {
            .cw-lib-card::before { animation: none !important; }
            .cw-lib-card, .cw-lib-recent-chip, .cw-lib-fab, .cw-lib-save-btn,
            .cw-lib-menu, .cw-lib-sheet {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

export function initPersonalLibrary() {
    const CURRENT_VERSION = "v2.0";
    let visible = false;
    let currentTab = 'general';
    let searchTerm = "";
    let currentEditingId = null;
    let openMenuCard = null; // Referência ao card com o menu de overflow aberto (só um por vez)

    injectStyles();

    // --- POPUP SETUP ---
    const popup = document.createElement("div");
    popup.id = "library-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
        right: "auto", left: "50%", width: "620px", height: "680px",
        maxHeight: "90vh",
        transform: "translateX(-50%) scale(0.05)"
    });

    const animRefs = { popup };
    const header = createStandardHeader(
        popup, libt('headerTitle'), CURRENT_VERSION,
        libt('headerDesc'),
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);
    const headerTitleEl = header.querySelector('span');

    const container = document.createElement("div");
    container.className = "cw-lib-container";
    popup.appendChild(container);

    // --- TOOLBAR: BUSCA + ABAS ---
    const toolbar = document.createElement("div");
    toolbar.className = "cw-lib-toolbar";

    const searchWrap = document.createElement("div");
    searchWrap.className = "cw-lib-search-wrap";
    const searchIcon = document.createElement("div");
    searchIcon.className = "cw-lib-search-icon";
    searchIcon.innerHTML = ICONS.search;
    const searchInput = document.createElement("input");
    searchInput.className = "cw-lib-search no-drag";
    searchInput.placeholder = libt('searchPlaceholder');
    searchInput.type = "text";
    const searchClear = document.createElement("div");
    searchClear.className = "cw-lib-search-clear cw-tactile";
    searchClear.innerHTML = ICONS.clear;
    searchWrap.append(searchIcon, searchInput, searchClear);

    const tabsRow = document.createElement("div");
    tabsRow.className = "cw-lib-tabs";
    TABS.forEach(t => {
        const btn = document.createElement("div");
        btn.className = "cw-lib-tab" + (t.id === currentTab ? " active" : "");
        btn.id = `lib-tab-${t.id}`;
        btn.innerHTML = `${t.icon}<span class="js-lib-tab-label">${libt('tabs')[t.id]}</span>`;
        btn.onmouseenter = () => SoundManager.playHover();
        btn.onclick = () => switchTab(t.id);
        tabsRow.appendChild(btn);
    });

    toolbar.append(searchWrap, tabsRow);
    container.appendChild(toolbar);

    // --- GRID ---
    const grid = document.createElement("div");
    grid.className = "cw-lib-grid";
    container.appendChild(grid);

    // --- FAB ---
    const fab = document.createElement("div");
    fab.className = "cw-lib-fab cw-tactile";
    fab.title = libt('newItem');
    fab.innerHTML = ICONS.add;
    fab.onclick = () => openEditor();
    container.appendChild(fab);

    // --- SHEET DO EDITOR ---
    const sheet = document.createElement("div");
    sheet.className = "cw-lib-sheet";

    const sheetHandle = document.createElement("div");
    sheetHandle.className = "cw-lib-sheet-handle";

    const sheetHead = document.createElement("div");
    sheetHead.className = "cw-lib-sheet-head";
    const sheetBack = document.createElement("div");
    sheetBack.className = "cw-lib-sheet-back no-drag";
    sheetBack.innerHTML = ICONS.back;
    sheetBack.title = libt('cancel');
    sheetBack.onclick = closeEditor;
    const sheetTitle = document.createElement("span");
    sheetTitle.className = "cw-lib-sheet-title";
    sheetTitle.textContent = libt('newItemTitle');
    sheetHead.append(sheetBack, sheetTitle);

    const sheetBody = document.createElement("div");
    sheetBody.className = "cw-lib-sheet-body";

    const sheetFoot = document.createElement("div");
    sheetFoot.className = "cw-lib-sheet-foot";
    const saveBtn = document.createElement("button");
    saveBtn.className = "cw-lib-save-btn no-drag";
    saveBtn.textContent = libt('save');
    saveBtn.onclick = handleSave;
    sheetFoot.appendChild(saveBtn);

    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "cw-lib-loading";
    loadingOverlay.innerHTML = `<div class="cw-lib-spinner"></div><div class="cw-lib-loading-text js-lib-saving">${libt('saving')}</div>`;

    sheet.append(sheetHandle, sheetHead, sheetBody, sheetFoot, loadingOverlay);
    container.appendChild(sheet);

    // --- RESIZE HANDLE ---
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // Fecha qualquer menu de card aberto ao clicar fora dele
    document.addEventListener('mousedown', (e) => {
        if (openMenuCard && !openMenuCard.contains(e.target)) closeCardMenu();
    });

    // --- LÓGICA ---

    function switchTab(id) {
        SoundManager.playClick();
        currentTab = id;
        TABS.forEach(t => {
            document.getElementById(`lib-tab-${t.id}`).classList.toggle('active', t.id === id);
        });
        renderList();
    }

    function closeCardMenu() {
        if (openMenuCard) {
            const menu = openMenuCard.querySelector('.cw-lib-menu');
            if (menu) menu.classList.remove('open');
            openMenuCard.classList.remove('menu-open');
            openMenuCard = null;
        }
    }

    function matchesSearch(item, term) {
        if (!term) return true;
        const haystack = `${item.title} ${item.content}`.toLowerCase();
        return haystack.includes(term);
    }

    function createRecentSection(recentItems) {
        const section = document.createElement("div");
        section.className = "cw-lib-recent-section";
        section.innerHTML = `<div class="cw-lib-recent-title">${libt('recentlyUsed')}</div>`;

        const row = document.createElement("div");
        row.className = "cw-lib-recent-row";
        recentItems.forEach(item => {
            const chip = document.createElement("div");
            chip.className = "cw-lib-recent-chip";
            chip.tabIndex = 0;
            chip.setAttribute("role", "button");
            chip.title = item.title;
            chip.innerHTML = `<span>${escapeHtml(item.title)}</span>`;
            chip.onclick = () => { SoundManager.playClick(); copyItem(item); };
            chip.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); chip.click(); }
            });
            row.appendChild(chip);
        });
        section.appendChild(row);
        return section;
    }

    function renderList() {
        closeCardMenu();
        grid.innerHTML = "";
        const term = searchTerm.trim().toLowerCase();
        const items = SnippetService.getSnippets(currentTab).filter(item => matchesSearch(item, term));

        // Atalho de acesso rápido: um clique copia direto, sem abrir o card
        // inteiro - só aparece fora de busca, pra não competir com resultados.
        if (!term) {
            const recentItems = getRecentItems(currentTab);
            if (recentItems.length > 0) grid.appendChild(createRecentSection(recentItems));
        }

        if (items.length === 0) {
            const empty = document.createElement("div");
            empty.className = "cw-lib-empty";
            const isSearching = term.length > 0;
            empty.innerHTML = `
                <div style="opacity:0.5;">${ICONS.empty}</div>
                <div class="cw-lib-empty-title">${isSearching ? libt('nothingFound') : libt('nothingHereYet')}</div>
                <div class="cw-lib-empty-sub">${isSearching ? libt('noItemMatches')(searchTerm.trim()) : libt('clickPlusToStart')}</div>
            `;
            grid.appendChild(empty);
            return;
        }

        items.forEach(item => grid.appendChild(createCard(item)));
    }

    function createCard(item) {
        const card = document.createElement("div");
        card.className = "cw-lib-card" + (item.isCode ? " is-code" : "");

        let previewContent = item.content;
        let mediaTag = "";
        if (item.isRich) {
            const temp = document.createElement('div');
            temp.innerHTML = item.content;
            const hasImages = !!temp.querySelector('img');
            previewContent = temp.innerText.substring(0, 200);
            if (hasImages) mediaTag = `<span class="cw-lib-media-tag">${ICONS.media} Mídia</span>`;
        }

        const badges = [
            item.isCode ? `<span class="cw-lib-badge code">CODE</span>` : '',
            currentTab === 'email' ? `<span class="cw-lib-badge template">TEMPLATE</span>` : ''
        ].join('');

        card.innerHTML = `
            <div class="cw-lib-card-head">
                <div class="cw-lib-card-title">${escapeHtml(item.title)}</div>
                <div class="cw-lib-card-badges">${badges}</div>
            </div>
            ${mediaTag}
            <div class="cw-lib-card-preview${item.isCode ? ' code' : ''}">${escapeHtml(previewContent)}</div>
            <div class="cw-lib-card-foot">
                <div class="cw-lib-icon-btn cw-act-copy cw-tactile" title="${libt('copy')}">${ICONS.copy}</div>
                <div class="cw-lib-icon-btn cw-act-more cw-tactile" title="${libt('moreActions')}">${ICONS.more}</div>
                <div class="cw-lib-menu">
                    <div class="cw-lib-menu-item cw-act-edit">${ICONS.edit} ${libt('edit')}</div>
                    <div class="cw-lib-menu-item danger cw-act-del">${ICONS.delete} ${libt('delete')}</div>
                </div>
            </div>
        `;

        card.querySelector('.cw-act-copy').onclick = (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            copyItem(item);
        };

        const moreBtn = card.querySelector('.cw-act-more');
        const menu = card.querySelector('.cw-lib-menu');
        moreBtn.onclick = (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            const isOpen = menu.classList.contains('open');
            closeCardMenu();
            if (!isOpen) {
                menu.classList.add('open');
                card.classList.add('menu-open');
                openMenuCard = card;
            }
        };

        card.querySelector('.cw-act-edit').onclick = (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            closeCardMenu();
            openEditor(item);
        };

        card.querySelector('.cw-act-del').onclick = async (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            closeCardMenu();
            const confirmed = await confirmDialog(libt('deleteConfirm')(item.title));
            if (confirmed) {
                SnippetService.delete(item.id);
                renderList();
                showToast(libt('itemDeletedToast'));
            }
        };

        return card;
    }

    function copyItem(item) {
        if (item.isRich) {
            const blob = new Blob([item.content], { type: 'text/html' });
            const plainText = document.createElement('div');
            plainText.innerHTML = item.content;
            const blobText = new Blob([plainText.innerText], { type: 'text/plain' });
            navigator.clipboard.write([new ClipboardItem({ 'text/html': blob, 'text/plain': blobText })]);
        } else {
            navigator.clipboard.writeText(item.content);
        }
        trackRecentUse(item.id);
        showToast(libt('copiedToast'));
    }

    function openEditor(item = null) {
        currentEditingId = item ? item.id : null;
        sheetBody.innerHTML = "";

        sheetBody.appendChild(createField("title", libt('titleLabel'), item ? item.title : ""));

        if (currentTab === 'email') {
            sheetBody.appendChild(createField("subject", libt('subjectLabel'), item ? item.subject : ""));
        }

        let contentLabel = libt('contentLabel');
        if (currentTab === 'email') contentLabel = libt('emailBodyLabel');
        if (currentTab === 'note') contentLabel = libt('noteTextLabel');

        sheetBody.appendChild(createField("content", contentLabel, item ? item.content : "", {
            isRich: true,
            isCode: item ? item.isCode : false
        }));

        sheetTitle.textContent = item ? libt('editItemTitle') : libt('newItemTitle');
        saveBtn.textContent = item ? libt('saveChanges') : libt('save');
        sheet.classList.add('open');

        // 500ms = duração real da transição de .cw-lib-sheet (transform 0.5s
        // var(--cw-ease-decelerate)) - focar antes disso rouba o scroll no
        // meio do slide-in.
        setTimeout(() => {
            const firstInput = sheetBody.querySelector("input");
            if (firstInput) firstInput.focus();
        }, 500);
    }

    function closeEditor() {
        SoundManager.playSwoosh();
        sheet.classList.remove('open');
        setTimeout(() => { currentEditingId = null; }, 500);
    }

    async function handleSave() {
        loadingOverlay.classList.add('active');
        saveBtn.disabled = true;

        try {
            const titleInput = sheetBody.querySelector("#cw-lib-inp-title");
            const contentInput = sheetBody.querySelector("#cw-lib-inp-content");

            const title = titleInput.value.trim();
            const content = contentInput.contentEditable === "true" ? contentInput.innerHTML : contentInput.value.trim();
            const isCode = contentInput.getAttribute('data-is-code') === 'true';

            if (!title || !content || content === '<br>') {
                SoundManager.playError();
                showToast(libt('fillTitleAndContent'), { error: true });
                return;
            }

            const payload = {
                id: currentEditingId,
                type: currentTab,
                title, content, isCode,
                isRich: contentInput.contentEditable === "true"
            };

            if (currentTab === 'email') {
                const subject = sheetBody.querySelector("#cw-lib-inp-subject").value.trim();
                if (!subject) {
                    SoundManager.playError();
                    showToast(libt('subjectRequired'), { error: true });
                    return;
                }
                payload.subject = subject;
            }

            const saved = await SnippetService.save(payload);

            // SnippetService.save() retorna o booleano `false` (não um objeto) quando
            // não dá pra identificar o usuário — nesse caso NADA foi salvo, nem local
            // nem na nuvem. `saved && saved.synced === false` cai pro `else` (sucesso)
            // quando `saved` é `false`, escondendo essa falha por trás de um toast de
            // sucesso falso e fechando o editor com o item perdido — era isso que
            // fazia parecer que "nenhuma função rodava".
            if (saved === false) {
                SoundManager.playError();
                showToast(libt('saveFailedNoUser'), { error: true });
                return;
            }

            renderList();
            closeEditor();

            if (saved.synced === false) {
                SoundManager.playError();
                showToast(libt('savedLocalOnly'), { error: true });
            } else {
                showToast(libt('savedAndSynced'));
                SoundManager.playSuccess();
            }
        } catch (error) {
            console.error("Erro ao salvar item da biblioteca:", error);
            SoundManager.playError();
            showToast(libt('saveError'), { error: true });
        } finally {
            loadingOverlay.classList.remove('active');
            saveBtn.disabled = false;
        }
    }

    function createField(id, labelText, value, options = {}) {
        const wrap = document.createElement("div");
        wrap.className = "cw-lib-field";

        const label = document.createElement("label");
        label.className = "cw-lib-label";
        label.textContent = labelText;
        wrap.appendChild(label);

        let input;
        if (options.isRich) {
            const mini = document.createElement("div");
            mini.className = "cw-lib-toolbar-mini";
            mini.innerHTML = `
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-bold" title="${libt('bold')}">${ICONS.bold}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-italic" title="${libt('italic')}">${ICONS.italic}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-code" title="${libt('codeFormat')}">${ICONS.code}</button>
                <button type="button" class="cw-lib-tb-btn cw-tactile cw-tb-img" title="${libt('insertImage')}">${ICONS.image}</button>
            `;

            input = document.createElement("div");
            input.className = "cw-lib-input cw-lib-editable";
            input.contentEditable = "true";
            input.innerHTML = value || "";

            if (options.isCode) {
                input.style.fontFamily = "'Roboto Mono', monospace";
                input.style.background = "#F8F9FA";
                input.setAttribute('data-is-code', 'true');
                mini.querySelector('.cw-tb-code').classList.add('active');
            }

            mini.querySelectorAll('.cw-lib-tb-btn').forEach(btn => {
                btn.onmouseenter = () => SoundManager.playHover();
                btn.onmousedown = () => SoundManager.playClick();
            });

            mini.querySelector('.cw-tb-bold').onclick = () => { document.execCommand('bold'); input.focus(); };
            mini.querySelector('.cw-tb-italic').onclick = () => { document.execCommand('italic'); input.focus(); };
            mini.querySelector('.cw-tb-code').onclick = (e) => {
                const isCode = input.getAttribute('data-is-code') === 'true';
                const newState = !isCode;
                input.setAttribute('data-is-code', String(newState));
                input.style.fontFamily = newState ? "'Roboto Mono', monospace" : "inherit";
                input.style.background = newState ? "#F8F9FA" : "#fff";
                e.currentTarget.classList.toggle('active', newState);
                input.focus();
            };
            mini.querySelector('.cw-tb-img').onclick = async () => {
                const url = await promptDialog(libt('imageUrlPrompt'));
                if (url) {
                    document.execCommand('insertImage', false, url);
                    input.querySelectorAll('img').forEach(img => {
                        img.style.maxWidth = '100%';
                        img.style.borderRadius = '8px';
                    });
                }
            };
            input.onpaste = (e) => {
                const clipItems = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (const clipItem of clipItems) {
                    if (clipItem.kind === 'file' && clipItem.type.startsWith('image/')) {
                        e.preventDefault();
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            document.execCommand('insertHTML', false, `<img src="${ev.target.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;">`);
                        };
                        reader.readAsDataURL(clipItem.getAsFile());
                    }
                }
            };

            wrap.appendChild(mini);
        } else {
            input = document.createElement("input");
            input.className = "cw-lib-input";
            input.type = "text";
            input.value = value || "";
        }

        input.id = `cw-lib-inp-${id}`;
        wrap.appendChild(input);
        return wrap;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str || "";
        return div.innerHTML;
    }

    // --- BUSCA ---
    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        searchClear.classList.toggle('visible', searchTerm.length > 0);
        renderList();
    });
    searchClear.onclick = () => {
        searchInput.value = "";
        searchTerm = "";
        searchClear.classList.remove('visible');
        renderList();
        searchInput.focus();
    };

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, "cw-btn-library");
        if (visible) {
            lockBodyScroll();
            renderList();
        } else {
            unlockBodyScroll();
            closeCardMenu();
        }
    }

    onLanguageChange(() => {
        if (headerTitleEl) headerTitleEl.textContent = libt('headerTitle');
        const helpTitleEl = popup.querySelector('.cw-help-title');
        if (helpTitleEl) helpTitleEl.textContent = libt('headerTitle');
        const helpDescEl = popup.querySelector('.cw-help-description');
        if (helpDescEl) helpDescEl.textContent = libt('headerDesc');
        TABS.forEach(t => {
            const label = document.querySelector(`#lib-tab-${t.id} .js-lib-tab-label`);
            if (label) label.textContent = libt('tabs')[t.id];
        });
        searchInput.placeholder = libt('searchPlaceholder');
        fab.title = libt('newItem');
        sheetBack.title = libt('cancel');
        const savingEl = loadingOverlay.querySelector('.js-lib-saving');
        if (savingEl) savingEl.textContent = libt('saving');
        renderList();
    });

    return toggleVisibility;
}
