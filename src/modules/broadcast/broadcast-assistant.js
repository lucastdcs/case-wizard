// src/modules/broadcast/broadcast-assistant.js

import {
  stylePopup,
  styleResizeHandle,
  makeResizable,
  showToast,
  parseEmojiCodes,
  confirmDialog
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { BROADCAST_MESSAGES, setBroadcastMessages } from "./broadcast-data.js";
import { DataService } from "../shared/data-service.js";
import { getAgentEmail } from "../shared/page-data.js";
import { ADMINS } from "../shared/config.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";

// --- CONFIGURAÇÃO ---
const POLL_TIME_MS = 60 * 1000;

const BC_DICT = {
    pt: {
        headerTitle: "Central de Avisos",
        headerDesc: "Comunicação oficial da operação.",
        newNotice: "Novo Aviso",
        clear: "Limpar",
        searchPlaceholder: "Buscar avisos...",
        editNotice: "Editar Aviso",
        saveChanges: "Salvar Alterações",
        publish: "Publicar",
        saving: "Salvando...",
        noticeTypeLabel: "TIPO DO COMUNICADO",
        typeInfo: "ℹ️ Info",
        typeCritical: "🚨 Alerta",
        typeSuccess: "✅ Sucesso",
        titleLabel: "TÍTULO",
        titlePlaceholder: "Resumo do assunto",
        messageLabel: "MENSAGEM",
        messagePlaceholder: "Escreva os detalhes aqui... Suporta HTML e Emojis :)",
        cancel: "Cancelar",
        fillAllFields: "Preencha todos os campos!",
        updatedToast: "Atualizado!",
        publishedToast: "Publicado!",
        saveErrorToast: "Erro ao salvar. Verifique a conexão.",
        deleteConfirm: "Confirma a exclusão deste aviso?",
        deletedToast: "Aviso removido.",
        deleteErrorToast: "Erro ao excluir.",
        details: "Detalhes",
        hide: "Ocultar",
        bauAvailability: "Disponibilidade BAU",
        dates: "datas",
        date: "data",
        viewDetails: "Ver detalhes",
        nothingFound: "Nada encontrado.",
        allRead: "Tudo lido!",
        history: (n) => `Histórico (${n})`,
        edit: "Editar",
        delete: "Excluir",
        typeLabel: { info: "Info", critical: "Alerta", success: "Sucesso" },
        syncing: "🔄 Sincronizando...",
        updated: '<span style="color:#137333">✓ Atualizado</span>',
        offline: "⚠️ Offline",
    },
    es: {
        headerTitle: "Central de Avisos",
        headerDesc: "Comunicación oficial de la operación.",
        newNotice: "Nuevo Aviso",
        clear: "Limpiar",
        searchPlaceholder: "Buscar avisos...",
        editNotice: "Editar Aviso",
        saveChanges: "Guardar Cambios",
        publish: "Publicar",
        saving: "Guardando...",
        noticeTypeLabel: "TIPO DE COMUNICADO",
        typeInfo: "ℹ️ Info",
        typeCritical: "🚨 Alerta",
        typeSuccess: "✅ Éxito",
        titleLabel: "TÍTULO",
        titlePlaceholder: "Resumen del asunto",
        messageLabel: "MENSAJE",
        messagePlaceholder: "Escribe los detalles aquí... Admite HTML y Emojis :)",
        cancel: "Cancelar",
        fillAllFields: "¡Complete todos los campos!",
        updatedToast: "¡Actualizado!",
        publishedToast: "¡Publicado!",
        saveErrorToast: "Error al guardar. Verifique la conexión.",
        deleteConfirm: "¿Confirma la eliminación de este aviso?",
        deletedToast: "Aviso eliminado.",
        deleteErrorToast: "Error al eliminar.",
        details: "Detalles",
        hide: "Ocultar",
        bauAvailability: "Disponibilidad BAU",
        dates: "fechas",
        date: "fecha",
        viewDetails: "Ver detalles",
        nothingFound: "No se encontró nada.",
        allRead: "¡Todo leído!",
        history: (n) => `Historial (${n})`,
        edit: "Editar",
        delete: "Eliminar",
        typeLabel: { info: "Info", critical: "Alerta", success: "Éxito" },
        syncing: "🔄 Sincronizando...",
        updated: '<span style="color:#137333">✓ Actualizado</span>',
        offline: "⚠️ Sin conexión",
    },
};
function bt(key) {
    const lang = getLanguage();
    return BC_DICT[lang]?.[key] ?? BC_DICT.pt[key];
}

const TYPE_CONFIG = {
    critical: { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>` },
    info: { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>` },
    success: { icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` }
};

// --- FOLHA DE ESTILOS DEDICADA ---
// Substitui os 4 mecanismos de estilo que coexistiam aqui (classes injetadas,
// objeto JS aplicado via Object.assign, objectToCss() embutido em template
// literals do widget BAU, e style="..." cru no HTML do editor) por um só
// bloco de classes reais — mesmo padrão já usado em personal-library/
// call-script/configs.
function injectStyles() {
    if (document.getElementById('cw-broadcast-styles')) return;
    const style = document.createElement("style");
    style.id = 'cw-broadcast-styles';
    style.textContent = `
        @keyframes cw-bc-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }

        .cw-btn-interactive { transition: transform 0.1s ease, background 0.2s ease; cursor: pointer; user-select: none; }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* --- BUSCA --- */
        /* padding vertical simétrico (12px em cima E embaixo) é o que importa
           aqui: os ícones são posicionados com top:50% relativo à caixa do
           wrap, que inclui o padding. Com padding-top/bottom diferentes
           (era 12px/0), os 50% do wrap não batiam com o centro vertical
           real do input — os ícones ficavam "flutuando" alguns pixels acima. */
        .cw-bc-search-wrap { position: relative; padding: 12px 24px; flex-shrink: 0; background: #FAFAFA; }
        .cw-bc-search-icon { position: absolute; left: 36px; top: 50%; transform: translateY(-50%); color: #80868b; pointer-events: none; display: flex; }
        .cw-bc-search-input {
            width: 100%; box-sizing: border-box; height: 36px; padding: 0 34px 0 34px;
            border-radius: 10px; border: 1px solid #DADCE0; background: #fff;
            font-size: 13px; font-family: 'Google Sans', Roboto, sans-serif; color: #202124; outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-bc-search-input::placeholder { color: #9aa0a6; }
        .cw-bc-search-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-bc-search-clear {
            position: absolute; right: 30px; top: 50%; transform: translateY(-50%);
            width: 20px; height: 20px; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #80868b; cursor: pointer;
        }
        .cw-bc-search-clear:hover { background: rgba(0,0,0,0.06); }
        .cw-bc-search-clear.visible { display: flex; }

        /* --- FEED --- */
        .cw-bc-feed { padding: 20px 24px 80px 24px; overflow-y: auto; flex-grow: 1; background: #F8F9FA; display: flex; flex-direction: column; gap: 20px; }

        .cw-bc-card {
            background: #FFFFFF; border-radius: 16px; border: 1px solid rgba(0,0,0,0.12);
            box-shadow: 0 4px 12px rgba(60,64,67,0.08);
            overflow: hidden; transition: opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; position: relative; width: 100%; box-sizing: border-box; flex-shrink: 0;
        }
        .cw-bc-card.history {
            border: 1px solid rgba(0,0,0,0.05); box-shadow: none; opacity: 0.6; filter: grayscale(0.8);
            margin-bottom: 16px;
        }

        .cw-bc-card-head { padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-bc-type-tag { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 4px 8px; border-radius: 6px; }
        .cw-bc-type-tag.critical { color: #991B1B; background: #FEF2F2; }
        .cw-bc-type-tag.info { color: #1E40AF; background: #EFF6FF; }
        .cw-bc-type-tag.success { color: #166534; background: #F0FDF4; }
        .cw-bc-date-tag { font-size: 11px; color: #5f6368; font-weight: 500; }
        .cw-bc-card-content { padding: 16px 20px 20px 20px; }
        .cw-bc-msg-title { font-size: 16px; font-weight: 700; color: #202124; margin-bottom: 8px; line-height: 1.4; }
        .cw-bc-msg-body { font-size: 14px; color: #3c4043; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
        /* Global (não escopado a .cw-bc-msg-body): parseMessageText() é usada
           tanto nos cards normais quanto no texto do widget BAU. */
        .cw-bc-link { color: #1967d2; text-decoration: none; font-weight: 500; }
        .cw-bc-msg-meta { font-size: 11px; color: #9aa0a6; margin-top: 12px; display: flex; align-items: center; gap: 6px; }

        .cw-bc-dismiss-btn {
            width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1);
            background: #fff; color: #5f6368; cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; margin-left: 12px;
        }
        .cw-bc-dismiss-btn:hover { color: #1e8e3e; background: #e6f4ea; border-color: #1e8e3e; }

        .cw-card-actions { display: flex; justify-content: flex-end; gap: 12px; padding: 12px 20px; background: #F8F9FA; border-top: 1px solid #F1F3F4; }
        .cw-action-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid transparent; background: transparent; transition: background-color 0.2s; }
        .cw-action-btn.edit { color: #1967D2; }
        .cw-action-btn.edit:hover { background: #E8F0FE; }
        .cw-action-btn.delete { color: #D93025; }
        .cw-action-btn.delete:hover { background: #FCE8E6; }

        .cw-bc-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; color: #BDC1C6; gap: 16px; text-align: center; }
        .cw-bc-history-divider { display: flex; align-items: center; justify-content: center; margin: 20px 0; cursor: pointer; color: #1a73e8; font-size: 13px; font-weight: 500; gap: 8px; padding: 8px 16px; border-radius: 20px; background: #E8F0FE; }
        .cw-bc-history-container { display: none; flex-direction: column; gap: 16px; opacity: 0.8; }

        /* --- WIDGET BAU (destaque proposital, paleta roxa própria) ---
           Papel secundário por padrão: só a faixa de resumo (cw-bc-bau-header)
           fica sempre visível, compacta. O conteúdo completo (mesmo layout de
           sempre — slots, botões, texto integral) só aparece expandido, com
           1 clique na faixa. Quem usa BAU com frequência (LM) expande e o
           app lembra disso enquanto o popup ficar aberto; pra todo mundo
           que só passa o olho nos avisos gerais, ele ocupa bem menos espaço. */
        .cw-bc-bau { margin: 16px 24px 0 24px; padding: 12px 16px; background: #F3E8FD; border: 1px solid #D8B4FE; border-radius: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 4px 12px rgba(147, 51, 234, 0.1); transition: padding 0.25s ease; }
        .cw-bc-bau.expanded { padding: 16px; }
        .cw-bc-bau-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; cursor: pointer; }
        .cw-bc-bau.expanded .cw-bc-bau-header { margin-bottom: -4px; }
        .cw-bc-bau-timestamp { font-size: 10px; opacity: 0.7; color: #7E22CE; flex-shrink: 0; }
        .cw-bc-live-indicator { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .cw-bc-pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #9333EA; box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); animation: cw-bc-pulse 2s infinite; flex-shrink: 0; }
        .cw-bc-bau-label { font-size: 11px; font-weight: 800; color: #7E22CE; text-transform: uppercase; letter-spacing: 0.8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-bc-bau-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .cw-bc-bau-hint { font-size: 11px; font-weight: 600; color: #6D28D9; white-space: nowrap; }
        .cw-bc-bau.expanded .cw-bc-bau-hint { display: none; }
        .cw-bc-bau-chevron { color: #7E22CE; transition: transform 0.25s ease; flex-shrink: 0; }
        .cw-bc-bau.expanded .cw-bc-bau-chevron { transform: rotate(180deg); }
        .cw-bc-bau-detail { display: none; flex-direction: column; gap: 12px; }
        .cw-bc-bau.expanded .cw-bc-bau-detail { display: flex; }
        .cw-bc-bau-slots { display: flex; justify-content: space-between; align-items: center; }
        .cw-bc-bau-slots-row { flex: 1; display: flex; gap: 8px; }
        .cw-bc-bau-slot { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.5); border-radius: 8px; flex: 1; justify-content: center; }
        .cw-bc-bau-flag { font-size: 18px; line-height: 1; }
        .cw-bc-bau-date { font-size: 16px; font-weight: 700; color: #581C87; letter-spacing: -0.5px; }
        .cw-bc-bau-actions { display: flex; gap: 8px; margin-left: 12px; align-items: center; }
        .cw-bc-bau-toggle-btn { background: rgba(255,255,255,0.7); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 12px; padding: 8px 12px; color: #6D28D9; font-size: 12px; font-weight: 600; }
        .cw-bc-bau-edit-btn { border: 1px solid rgba(139, 92, 246, 0.2); background: rgba(255,255,255,0.5); border-radius: 12px; padding: 8px; color: #6D28D9; display: flex; align-items: center; justify-content: center; }
        .cw-bc-bau-edit-btn.compact { border: none; border-radius: 6px; padding: 6px; }
        .cw-bc-bau-full { display: none; margin-top: 12px; padding-top: 12px; border-top: 1px dashed rgba(139, 92, 246, 0.3); font-size: 13px; line-height: 1.5; color: #581C87; }
        .cw-bc-bau-plain { display: flex; justify-content: space-between; align-items: flex-start; }
        .cw-bc-bau-plain-text { font-size: 13px; color: #581C87; line-height: 1.5; flex: 1; }

        /* --- EDITOR --- */
        .cw-editor-overlay {
            position: absolute; inset: 0; background: rgba(255, 255, 255, 0.98);
            z-index: 200; display: flex; flex-direction: column;
            transform: translateY(100%); transition: transform 0.35s var(--cw-ease-elastic);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-editor-overlay.active { transform: translateY(0); }
        .cw-bc-editor-body { flex: 1; overflow-y: auto; padding: 24px; }
        .cw-bc-editor-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .cw-bc-editor-title { font-size: 20px; font-weight: 700; color: #202124; }
        .cw-bc-editor-field { margin-bottom: 20px; }
        .cw-bc-field-label { font-size: 12px; font-weight: 700; color: #5f6368; margin-bottom: 8px; display: block; }
        .cw-bc-editor-foot { padding: 16px 24px; border-top: 1px solid #F1F3F4; background: #fff; display: flex; justify-content: flex-end; gap: 12px; }

        .cw-hd-input {
            width: 100%; padding: 12px 14px; border: 1px solid #DADCE0; border-radius: 12px;
            font-size: 14px; color: #202124; background: #FFF;
            transition: border 0.2s, box-shadow 0.2s; box-sizing: border-box; outline: none; font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-hd-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
        .cw-hd-input::placeholder { color: #9AA0A6; }

        .cw-radio-group { display: flex; gap: 12px; }
        .cw-radio-option {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 12px; border-radius: 12px; border: 1px solid #E0E0E0;
            font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s, color 0.2s, border-color 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }

        .cw-bc-btn-secondary { padding: 10px 20px; background: white; border: 1px solid #dadce0; color: #5f6368; border-radius: 24px; font-weight: 600; font-size: 13px; }
        .cw-bc-btn-primary { padding: 10px 24px; background: #1a73e8; color: white; border: none; border-radius: 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(26,115,232,0.3); font-size: 13px; }
        .cw-bc-editor-close { background: none; border: none; color: #5f6368; padding: 8px; }

        @media (prefers-reduced-motion: reduce) {
            .cw-bc-pulse-dot { animation: none !important; }
            .cw-bc-card, .cw-bc-bau, .cw-bc-bau-chevron, .cw-editor-overlay {
                transition: opacity 0.15s ease !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- PARSERS & UTILS (puros, sem dependência de closure) ---

function formatFriendlyDate(dateInput) {
    if (!dateInput) return "";
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);
        return date.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).replace(',', ' às');
    } catch (e) { return String(dateInput); }
}

function parseMessageText(rawText) {
    if (!rawText || typeof rawText !== 'string') return "";
    let html = rawText;
    html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="cw-bc-link">$1</a>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    html = html.replace(/_(.*?)_/g, '<i>$1</i>');
    html = html.replace(/\n/g, '<br>');
    html = parseEmojiCodes(html);
    return html;
}

// Extrai os slots de disponibilidade (bandeira + data) do texto do aviso de
// "Disponibilidade BAU". Mesma heurística de sempre (regex de data +
// keyword-sniffing de região/país, com "memória" do último contexto visto
// pra linhas de data sem bandeira própria) — só isolada do renderFeed() pra
// ficar testável/legível separadamente, o comportamento não muda.
function extractBauSlots(text) {
    const extractedSlots = [];
    const lines = (text || "").split('\n');
    const dateRegex = /\d{1,2}\/\d{1,2}/;
    let currentContextFlag = "📅";

    lines.forEach(line => {
        if (/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(line)) {
            currentContextFlag = "🇧🇷";
        } else if (/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(line)) {
            currentContextFlag = "🇪🇸";
        }

        const dateMatch = line.match(dateRegex);
        if (dateMatch) {
            const date = dateMatch[0];
            let lineFlag = currentContextFlag;
            if (/🇧🇷|🇵🇹|PT|BR/i.test(line)) lineFlag = "🇧🇷";
            else if (/🇪🇸|🇲🇽|ES|LATAM/i.test(line)) lineFlag = "🇪🇸";

            const exists = extractedSlots.some(s => s.flag === lineFlag && s.date === date);
            if (!exists) extractedSlots.push({ flag: lineFlag, date });
        }
    });

    if (extractedSlots.length === 0) {
        const anyDates = (text || "").match(/\d{1,2}\/\d{1,2}/g);
        if (anyDates) [...new Set(anyDates)].forEach(d => extractedSlots.push({ flag: "📅", date: d }));
    }

    return extractedSlots;
}

export function initBroadcastAssistant() {
  const CURRENT_VERSION = "v4.9";
  let visible = false;
  let pollInterval = null;
  let currentEditingId = null;
  let searchTerm = "";
  // Sobrevive a re-renders (busca, polling) enquanto o popup ficar aberto —
  // mesma ideia do searchTerm logo acima.
  let bauExpanded = false;

  // Estado de admin — escopo do módulo em vez de window (nada mais no repo
  // lê essas 3 variáveis; não precisavam estar globais).
  let isAdmin = false;
  let currentUser = null;
  let adminRetries = 0;

  // IDs vistos no fetch anterior — usado só para saber se algo *novo* chegou
  // entre polls (pra tocar playNotification só uma vez por aviso, não a cada
  // sync). Começa null de propósito: no primeiro fetch (carga inicial) ainda
  // não há "anterior" pra comparar, então não soa nada nesse momento.
  let knownMessageIds = null;

  injectStyles();

  // --- UI SETUP ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, {
    right: "auto", left: "50%", width: "420px", height: "680px",
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)",
    backgroundColor: '#FAFAFA', overflow: "hidden"
  });

  const animRefs = { popup, googleLine: null };

  function toggleVisibility() {
    visible = !visible;
    toggleGenieAnimation(visible, popup, "cw-btn-broadcast");
    if (visible) {
      lockBodyScroll();
      const btn = document.getElementById("cw-btn-broadcast");
      if (btn) btn.classList.remove("has-new");
      checkForUpdates();
    } else {
      unlockBodyScroll();
    }
  }

  const header = createStandardHeader(
    popup, bt('headerTitle'), CURRENT_VERSION, bt('headerDesc'),
    animRefs, () => toggleVisibility()
  );
  const headerTitleEl = header.querySelector('span');

  const actionContainer = header.querySelector('.cw-header-actions') || header.lastElementChild;
  let editorOverlay = null;

  function tryInjectAdminButton() {
      let email = null;
      try { email = getAgentEmail(); } catch(e) { console.warn("TechSol: Auth Pending"); }

      if (email) {
          currentUser = email.split('@')[0].toLowerCase();
          isAdmin = ADMINS.includes(currentUser);

          if (isAdmin && actionContainer && !actionContainer.querySelector('#cw-admin-btn')) {
              const addBtn = document.createElement("div");
              addBtn.id = 'cw-admin-btn';
              addBtn.className = "cw-btn-interactive";
              addBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
              Object.assign(addBtn.style, {
                  width: "32px", height: "32px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#1a73e8", background: "rgba(26, 115, 232, 0.1)",
                  marginRight: "8px"
              });
              addBtn.title = bt('newNotice');
              addBtn.onclick = (e) => { e.stopPropagation(); openEditor(); };
              actionContainer.insertBefore(addBtn, actionContainer.firstChild);

              if (!editorOverlay) createEditorOverlay();
              renderFeed();
          }
      } else {
          if (adminRetries < 5) {
              adminRetries++;
              setTimeout(tryInjectAdminButton, 2000);
          }
      }
  }

  // Botão Limpar
  if (actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = bt('clear');
      markAll.className = "cw-btn-interactive";
      Object.assign(markAll.style, { fontSize: "12px", color: "#1a73e8", background: "transparent", border: "none", padding: "8px", fontWeight: "600" });
      markAll.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playSuccess();
          const allIds = BROADCAST_MESSAGES.map(m => m.id);
          localStorage.setItem("cw_read_broadcasts", JSON.stringify(allIds));
          renderFeed();
          updateBadge();
      };
      actionContainer.insertBefore(markAll, actionContainer.firstChild);
  }

  popup.appendChild(header);

  // --- BUSCA ---
  const searchWrap = document.createElement("div");
  searchWrap.className = "cw-bc-search-wrap";
  const searchIcon = document.createElement("div");
  searchIcon.className = "cw-bc-search-icon";
  searchIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
  const searchInput = document.createElement("input");
  searchInput.className = "cw-bc-search-input no-drag";
  searchInput.type = "text";
  searchInput.placeholder = bt('searchPlaceholder');
  const searchClear = document.createElement("div");
  searchClear.className = "cw-bc-search-clear cw-btn-interactive";
  searchClear.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  searchWrap.append(searchIcon, searchInput, searchClear);
  popup.appendChild(searchWrap);

  searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      searchClear.classList.toggle('visible', searchTerm.length > 0);
      renderFeed();
  });
  searchClear.onclick = () => {
      searchInput.value = "";
      searchTerm = "";
      searchClear.classList.remove('visible');
      renderFeed();
      searchInput.focus();
  };

  // --- ELEMENTO DE STATUS (FIXO NO TOPO) ---
  const statusEl = document.createElement('div');
  statusEl.id = 'cw-update-status';
  statusEl.style.cssText = "padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;";
  popup.appendChild(statusEl);

  // --- EDITOR OVERLAY ---
  function createEditorOverlay() {
      editorOverlay = document.createElement("div");
      editorOverlay.className = "cw-editor-overlay";

      editorOverlay.innerHTML = `
        <div class="cw-bc-editor-body">
            <div class="cw-bc-editor-head">
                <span id="cw-editor-title-label" class="cw-bc-editor-title">${bt('newNotice')}</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive cw-bc-editor-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>

            <div class="cw-bc-editor-field">
                <label class="cw-bc-field-label js-bc-type-label">${bt('noticeTypeLabel')}</label>
                <div class="cw-radio-group">
                    <div class="cw-radio-option info" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="info" checked> <span class="js-bc-type-info">${bt('typeInfo')}</span>
                    </div>
                    <div class="cw-radio-option critical" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="critical"> <span class="js-bc-type-critical">${bt('typeCritical')}</span>
                    </div>
                    <div class="cw-radio-option success" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="success"> <span class="js-bc-type-success">${bt('typeSuccess')}</span>
                    </div>
                </div>
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label js-bc-title-label">${bt('titleLabel')}</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="${bt('titlePlaceholder')}">
            </div>

            <div class="cw-bc-editor-field">
                 <label class="cw-bc-field-label js-bc-message-label">${bt('messageLabel')}</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="${bt('messagePlaceholder')}" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div class="cw-bc-editor-foot">
            <button id="cw-bc-cancel" class="cw-btn-interactive cw-bc-btn-secondary">${bt('cancel')}</button>
            <button id="cw-bc-send" class="cw-btn-interactive cw-bc-btn-primary">${bt('publish')}</button>
        </div>
      `;

      editorOverlay.querySelectorAll('input[name="cw-bc-type"]').forEach(radio => {
          radio.addEventListener('change', () => {
              editorOverlay.querySelectorAll('.cw-radio-option').forEach(opt => opt.classList.remove('checked'));
              radio.parentElement.classList.add('checked');
          });
      });
      setTimeout(() => {
          const def = editorOverlay.querySelector('.cw-radio-option.info');
          if (def) def.classList.add('checked');
      }, 100);

      const btnCancel = editorOverlay.querySelector('#cw-bc-cancel');
      const btnCloseX = editorOverlay.querySelector('#cw-bc-close-x');
      const btnSend = editorOverlay.querySelector('#cw-bc-send');

      btnCancel.onclick = closeEditor;
      btnCloseX.onclick = closeEditor;
      btnSend.onclick = handleSend;

      popup.appendChild(editorOverlay);
  }

  function openEditor(editData = null) {
      if (!editorOverlay) return;

      const titleLabel = editorOverlay.querySelector('#cw-editor-title-label');
      const inputTitle = editorOverlay.querySelector('#cw-bc-title');
      const inputText = editorOverlay.querySelector('#cw-bc-text');
      const btnSend = editorOverlay.querySelector('#cw-bc-send');

      if (editData) {
          currentEditingId = editData.id;
          titleLabel.textContent = bt('editNotice');
          inputTitle.value = editData.title || "";
          inputText.value = editData.text || "";
          btnSend.textContent = bt('saveChanges');

          const type = editData.type || 'info';
          const radio = editorOverlay.querySelector(`input[name="cw-bc-type"][value="${type}"]`);
          if (radio) radio.click();
      } else {
          currentEditingId = null;
          titleLabel.textContent = bt('newNotice');
          inputTitle.value = "";
          inputText.value = "";
          btnSend.textContent = bt('publish');
          const infoRadio = editorOverlay.querySelector(`input[name="cw-bc-type"][value="info"]`);
          if (infoRadio) infoRadio.click();
      }

      editorOverlay.classList.add('active');
      setTimeout(() => inputTitle.focus(), 300);
  }

  function closeEditor() {
      if (editorOverlay) editorOverlay.classList.remove('active');
      currentEditingId = null;
  }

  async function handleSend() {
      const btnSend = editorOverlay.querySelector('#cw-bc-send');
      const inputTitle = editorOverlay.querySelector('#cw-bc-title');
      const inputText = editorOverlay.querySelector('#cw-bc-text');
      const typeInput = editorOverlay.querySelector('input[name="cw-bc-type"]:checked');
      const type = typeInput ? typeInput.value : 'info';

      if (!inputTitle.value.trim() || !inputText.value.trim()) {
          SoundManager.playError();
          showToast(bt('fillAllFields'), { error: true });
          return;
      }

      btnSend.textContent = bt('saving');
      btnSend.style.opacity = "0.7";

      let success = false;

      if (currentEditingId) {
          success = await DataService.updateBroadcast(currentEditingId, {
              title: inputTitle.value,
              text: inputText.value,
              type: type
          });
      } else {
          success = await DataService.sendBroadcast({
              title: inputTitle.value,
              text: inputText.value,
              type: type,
              author: currentUser || 'admin'
          });
      }

      if (success) {
          showToast(currentEditingId ? bt('updatedToast') : bt('publishedToast'));
          SoundManager.playSuccess();
          closeEditor();
          setTimeout(() => checkForUpdates(), 1500);
      } else {
          SoundManager.playError();
          showToast(bt('saveErrorToast'), { error: true });
          btnSend.textContent = currentEditingId ? bt('saveChanges') : bt('publish');
          btnSend.style.opacity = "1";
      }
  }

  async function handleDelete(id) {
      const confirmed = await confirmDialog(bt('deleteConfirm'), { danger: true });
      if (confirmed) {
          const success = await DataService.deleteBroadcast(id);
          if (success) {
              showToast(bt('deletedToast'));
              SoundManager.playClick();
              const oldMsg = BROADCAST_MESSAGES.findIndex(m => m.id === id);
              if (oldMsg > -1) BROADCAST_MESSAGES.splice(oldMsg, 1);
              renderFeed();
              setTimeout(() => checkForUpdates(), 1500);
          } else {
              SoundManager.playError();
              showToast(bt('deleteErrorToast'), { error: true });
          }
      }
  }

  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll cw-bc-feed";
  popup.appendChild(feed);

  async function checkForUpdates() {
      if (visible) {
          statusEl.style.display = 'block';
          statusEl.innerHTML = bt('syncing');
      }

      try {
          const data = await DataService.fetchData();
          if (data && data.broadcast) {
              // Toca só quando um aviso novo e não lido chega num poll em
              // segundo plano (pílula fechada/idle) - com o popup aberto o
              // próprio feed atualizando já é o feedback, um som ali em cima
              // seria redundante.
              if (knownMessageIds && !visible) {
                  const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
                  const hasNewUnread = data.broadcast.some(m => !knownMessageIds.has(m.id) && !readMessages.includes(m.id));
                  if (hasNewUnread) SoundManager.playNotification();
              }
              knownMessageIds = new Set(data.broadcast.map(m => m.id));

              setBroadcastMessages(data.broadcast);
              updateBadge();
              if (visible) {
                  renderFeed();
                  statusEl.innerHTML = bt('updated');
                  setTimeout(() => { statusEl.style.display = 'none'; }, 1500);
              }
          }
      } catch (error) {
          if (visible) statusEl.innerHTML = bt('offline');
      }
  }

  function updateBadge() {
      const btn = document.getElementById("cw-btn-broadcast");
      if (!btn) return;
      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      const hasUnread = BROADCAST_MESSAGES.some(m => !readMessages.includes(m.id));
      if (hasUnread) {
          btn.classList.add("has-new");
          if (!btn.querySelector('.cw-badge')) {
              const badge = document.createElement('div');
              badge.className = 'cw-badge';
              Object.assign(badge.style, {
                  position: "absolute", top: "8px", right: "8px",
                  width: "8px", height: "8px", backgroundColor: "#d93025",
                  borderRadius: "50%", border: "1px solid #fff", zIndex: "10"
              });
              btn.appendChild(badge);
          }
      } else {
          btn.classList.remove("has-new");
          const badge = btn.querySelector('.cw-badge');
          if (badge) badge.remove();
      }
  }

  function matchesSearch(msg, term) {
      if (!term) return true;
      const haystack = `${msg.title || ""} ${msg.text || ""}`.toLowerCase();
      return haystack.includes(term);
  }

  // Monta e insere o widget de "Disponibilidade BAU" logo após o status.
  // Widget fica sempre visível quando existe (não é filtrado pela busca —
  // é um card operacional fixo, não uma "mensagem" pra procurar), mas tem
  // papel secundário por padrão: só a faixa de resumo aparece de cara, o
  // conteúdo completo (mesmo de sempre) só mostra expandido — a maioria de
  // quem abre a Central de Avisos não é LM e não precisa ver isso em
  // destaque toda vez.
  function renderBauWidget(bauMessage) {
      const oldBau = popup.querySelector('#cw-bau-widget');
      if (oldBau) oldBau.remove();

      const bauWidget = document.createElement("div");
      bauWidget.id = "cw-bau-widget";
      bauWidget.className = "cw-bc-bau";

      const extractedSlots = extractBauSlots(bauMessage.text);

      let contentHTML = "";
      let buttonsHTML = `<button id="cw-bau-toggle-btn" class="cw-btn-interactive cw-bc-bau-toggle-btn">${bt('details')}</button>`;

      if (isAdmin) {
          buttonsHTML = `
            <button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            ${buttonsHTML}
          `;
      }

      if (extractedSlots.length > 0) {
          const slotsHTML = extractedSlots.map(slot => `
              <div class="cw-bc-bau-slot">
                  <span class="cw-bc-bau-flag">${slot.flag}</span>
                  <span class="cw-bc-bau-date">${slot.date}</span>
              </div>
          `).join('');

          contentHTML = `
              <div class="cw-bc-bau-slots">
                  <div class="cw-bc-bau-slots-row">${slotsHTML}</div>
                  <div class="cw-bc-bau-actions">${buttonsHTML}</div>
              </div>
              <div id="cw-bau-full" class="cw-bc-bau-full">${parseMessageText(bauMessage.text)}</div>
          `;
      } else {
          contentHTML = `
            <div class="cw-bc-bau-plain">
                <div class="cw-bc-bau-plain-text">${parseMessageText(bauMessage.text)}</div>
                ${isAdmin ? `<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive cw-bc-bau-edit-btn compact">✏️</button></div>` : ''}
            </div>
          `;
      }

      const uniqueFlags = [...new Set(extractedSlots.map(s => s.flag))].join('');
      const hintText = extractedSlots.length > 0
          ? `${uniqueFlags} · ${extractedSlots.length} ${extractedSlots.length > 1 ? bt('dates') : bt('date')}`
          : bt('viewDetails');

      bauWidget.className = "cw-bc-bau" + (bauExpanded ? " expanded" : "");
      bauWidget.innerHTML = `
          <div class="cw-bc-bau-header cw-btn-interactive">
              <div class="cw-bc-live-indicator">
                  <div class="cw-bc-pulse-dot"></div>
                  <span class="cw-bc-bau-label">${bt('bauAvailability')}</span>
              </div>
              <div class="cw-bc-bau-right">
                  <span class="cw-bc-bau-hint">${hintText}</span>
                  <span class="cw-bc-bau-timestamp">${formatFriendlyDate(bauMessage.date)}</span>
                  <svg class="cw-bc-bau-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
          </div>
          <div class="cw-bc-bau-detail">${contentHTML}</div>
      `;

      statusEl.after(bauWidget);

      const headerRow = bauWidget.querySelector('.cw-bc-bau-header');
      headerRow.onclick = () => {
          bauExpanded = !bauExpanded;
          bauWidget.classList.toggle('expanded', bauExpanded);
          SoundManager.playClick();
      };

      const toggleBtn = bauWidget.querySelector('#cw-bau-toggle-btn');
      const fullText = bauWidget.querySelector('#cw-bau-full');
      if (toggleBtn && fullText) {
          toggleBtn.onclick = (e) => {
              e.stopPropagation();
              const isHidden = fullText.style.display === "none" || !fullText.style.display;
              fullText.style.display = isHidden ? "block" : "none";
              toggleBtn.textContent = isHidden ? bt('hide') : bt('details');
          };
      }
      if (isAdmin) {
          const editBtn = bauWidget.querySelector('.cw-bau-edit');
          if (editBtn) editBtn.onclick = (e) => { e.stopPropagation(); openEditor(bauMessage); };
      }
  }

  // Monta a lista de mensagens não-lidas + histórico colapsável de lidas.
  function renderMessageList(messages, readMessages, hasBauWidget) {
      const sortedMessages = messages.sort((a, b) => {
          const aRead = readMessages.includes(a.id);
          const bRead = readMessages.includes(b.id);
          return aRead === bRead ? 0 : aRead ? 1 : -1;
      });

      const isSearching = searchTerm.trim().length > 0;

      if (sortedMessages.length === 0 && !hasBauWidget) {
           const empty = document.createElement("div");
           empty.className = "cw-bc-empty";
           empty.innerHTML = isSearching
               ? `<div style="font-weight:500;">${bt('nothingFound')}</div>`
               : `
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
                <div style="font-weight:500;">${bt('allRead')}</div>
               `;
           feed.appendChild(empty);
           return;
      }

      const unreadMsgs = sortedMessages.filter(m => !readMessages.includes(m.id));
      const readMsgs = sortedMessages.filter(m => readMessages.includes(m.id));

      unreadMsgs.forEach(msg => feed.appendChild(createCard(msg, false)));

      if (readMsgs.length > 0) {
          const divider = document.createElement("div");
          divider.className = "cw-bc-history-divider";
          divider.innerHTML = `<span>${bt('history')(readMsgs.length)}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

          const historyContainer = document.createElement("div");
          historyContainer.className = "cw-bc-history-container";
          readMsgs.forEach(msg => historyContainer.appendChild(createCard(msg, true)));

          let isHistoryOpen = false;
          divider.onclick = () => {
              SoundManager.playClick();
              isHistoryOpen = !isHistoryOpen;
              historyContainer.style.display = isHistoryOpen ? "flex" : "none";
              divider.querySelector('svg').style.transform = isHistoryOpen ? "rotate(180deg)" : "rotate(0deg)";
          };
          feed.appendChild(divider);
          feed.appendChild(historyContainer);
      }
  }

  function renderFeed() {
      feed.innerHTML = "";
      const oldBau = popup.querySelector('#cw-bau-widget');
      if (oldBau) oldBau.remove();

      const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
      let allMessages = [...BROADCAST_MESSAGES].sort((a, b) => {
          const dateA = new Date(a.date).getTime() || 0;
          const dateB = new Date(b.date).getTime() || 0;
          return dateB - dateA;
      });

      // 1. WIDGET BAU (nunca filtrado pela busca)
      const bauIndex = allMessages.findIndex(m => m.title && m.title.toLowerCase().includes("disponibilidade bau"));
      let hasBauWidget = false;
      if (bauIndex !== -1) {
          const bauMessage = allMessages[bauIndex];
          allMessages.splice(bauIndex, 1);
          renderBauWidget(bauMessage);
          hasBauWidget = true;
      }

      // 2. LISTA (filtrada pela busca, se houver termo)
      const term = searchTerm.trim().toLowerCase();
      const filteredMessages = allMessages.filter(m => matchesSearch(m, term));
      renderMessageList(filteredMessages, readMessages, hasBauWidget);
  }

  function createCard(msg, isHistory) {
    const card = document.createElement("div");
    card.className = "cw-bc-card" + (isHistory ? " history" : "");
    const theme = TYPE_CONFIG[msg.type] || TYPE_CONFIG.info;

    // Header
    const cardHead = document.createElement("div");
    cardHead.className = "cw-bc-card-head";

    const typeKey = TYPE_CONFIG[msg.type] ? msg.type : 'info';
    const typeLabel = document.createElement("div");
    typeLabel.className = "cw-bc-type-tag " + typeKey;
    typeLabel.innerHTML = `${theme.icon} <span>${bt('typeLabel')[typeKey]}</span>`;

    const dateLabel = document.createElement("span");
    dateLabel.className = "cw-bc-date-tag";
    dateLabel.textContent = formatFriendlyDate(msg.date);

    cardHead.appendChild(typeLabel);

    // Dismiss
    if (!isHistory) {
        const dismissBtn = document.createElement("button");
        dismissBtn.className = "cw-btn-interactive cw-bc-dismiss-btn";
        dismissBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        dismissBtn.onclick = (e) => {
            e.stopPropagation();
            SoundManager.playClick();
            card.style.transform = "translateX(20px)";
            card.style.opacity = "0";
            // 300ms = duração real da transição de .cw-bc-card (opacity/transform);
            // removia o card da lista no meio do slide-out antes.
            setTimeout(() => {
                const currentRead = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
                currentRead.push(msg.id);
                localStorage.setItem("cw_read_broadcasts", JSON.stringify(currentRead));
                renderFeed();
                updateBadge();
            }, 300);
        };
        cardHead.appendChild(dismissBtn);
    } else {
        cardHead.appendChild(dateLabel);
    }

    // Content
    const bodyContainer = document.createElement("div");
    bodyContainer.className = "cw-bc-card-content";

    const title = document.createElement("div");
    title.className = "cw-bc-msg-title";
    title.textContent = msg.title;

    const text = document.createElement("div");
    text.className = "cw-bc-msg-body";
    text.innerHTML = parseMessageText(msg.text);

    const meta = document.createElement("div");
    meta.className = "cw-bc-msg-meta";
    meta.innerHTML = `Publicado por <b>${msg.author || 'Sistema'}</b>`;
    if (!isHistory) meta.innerHTML += ` • ${formatFriendlyDate(msg.date)}`;

    bodyContainer.appendChild(title);
    bodyContainer.appendChild(text);
    bodyContainer.appendChild(meta);

    card.appendChild(cardHead);
    card.appendChild(bodyContainer);

    // --- CRUD FOOTER (Admin) ---
    if (isAdmin) {
        const cardActions = document.createElement("div");
        cardActions.className = "cw-card-actions";

        const btnEdit = document.createElement("button");
        btnEdit.className = "cw-action-btn edit";
        btnEdit.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> ${bt('edit')}`;
        btnEdit.onclick = () => openEditor(msg);

        const btnDel = document.createElement("button");
        btnDel.className = "cw-action-btn delete";
        btnDel.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> ${bt('delete')}`;
        btnDel.onclick = () => handleDelete(msg.id);

        cardActions.appendChild(btnEdit);
        cardActions.appendChild(btnDel);
        card.appendChild(cardActions);
    }

    return card;
  }

  // --- STARTUP ---
  const cachedData = DataService.getCachedBroadcasts();
  if (cachedData.length > 0) {
      setBroadcastMessages(cachedData);
      renderFeed();
  }

  setTimeout(tryInjectAdminButton, 500);
  checkForUpdates();
  if (!pollInterval) pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);

  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  popup.appendChild(resizeHandle);
  makeResizable(popup, resizeHandle);
  document.body.appendChild(popup);

  const readMessages = JSON.parse(localStorage.getItem("cw_read_broadcasts") || "[]");
  const hasUnread = BROADCAST_MESSAGES.some((m) => !readMessages.includes(m.id));

  // Retraduz os pedaços montados uma única vez (header, busca, botão "Limpar"
  // e os rótulos fixos do editor) e refaz o feed, que já é gerado do zero a
  // cada render e por isso pega o idioma atual sozinho.
  onLanguageChange(() => {
      if (headerTitleEl) headerTitleEl.textContent = bt('headerTitle');
      const helpTitleEl = popup.querySelector('.cw-help-title');
      if (helpTitleEl) helpTitleEl.textContent = bt('headerTitle');
      const helpDescEl = popup.querySelector('.cw-help-description');
      if (helpDescEl) helpDescEl.textContent = bt('headerDesc');
      searchInput.placeholder = bt('searchPlaceholder');
      const addBtn = document.getElementById('cw-admin-btn');
      if (addBtn) addBtn.title = bt('newNotice');
      if (actionContainer) {
          const clearBtn = [...actionContainer.children].find(el => el.tagName === 'BUTTON');
          if (clearBtn) clearBtn.textContent = bt('clear');
      }
      if (editorOverlay) {
          const q = (sel) => editorOverlay.querySelector(sel);
          const typeLabel = q('.js-bc-type-label');
          if (typeLabel) typeLabel.textContent = bt('noticeTypeLabel');
          const typeInfo = q('.js-bc-type-info');
          if (typeInfo) typeInfo.textContent = bt('typeInfo');
          const typeCritical = q('.js-bc-type-critical');
          if (typeCritical) typeCritical.textContent = bt('typeCritical');
          const typeSuccess = q('.js-bc-type-success');
          if (typeSuccess) typeSuccess.textContent = bt('typeSuccess');
          const titleLabel = q('.js-bc-title-label');
          if (titleLabel) titleLabel.textContent = bt('titleLabel');
          const inputTitle = q('#cw-bc-title');
          if (inputTitle) inputTitle.placeholder = bt('titlePlaceholder');
          const messageLabel = q('.js-bc-message-label');
          if (messageLabel) messageLabel.textContent = bt('messageLabel');
          const inputText = q('#cw-bc-text');
          if (inputText) inputText.placeholder = bt('messagePlaceholder');
          const cancelBtn = q('#cw-bc-cancel');
          if (cancelBtn) cancelBtn.textContent = bt('cancel');
          const sendBtn = q('#cw-bc-send');
          if (sendBtn) sendBtn.textContent = currentEditingId ? bt('saveChanges') : bt('publish');
      }
      renderFeed();
  });

  return { toggle: toggleVisibility, hasUnread };
}
