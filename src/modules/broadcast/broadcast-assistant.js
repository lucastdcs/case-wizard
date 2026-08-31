// src/modules/broadcast/broadcast-assistant.js
//
// Central de Avisos — SOMENTE LEITURA.
//
// Publicar, editar e tirar avisos do ar é trabalho da Central de Conteúdo
// (gas-backend/ContentDashboard.html). Este módulo só mostra o que está no ar.
// Antes ele fazia as duas coisas, e o CRUD respondia por metade do arquivo: um
// editor em overlay, três chamadas de escrita e uma checagem de "é admin?" que
// rodava no front — do lado errado da fronteira, já que as rotas de escrita
// eram URLs públicas.
//
// A fonte agora são dois módulos da Central:
//   broadcast        — o feed de avisos
//   bau_availability — a disponibilidade corrente, em campos de data
//
// Eram um só antes, e a disponibilidade era encontrada procurando um aviso com
// "disponibilidade bau" no título, com as datas extraídas do texto por regex.
// Essa regex tinha um bug real: sem fronteira de palavra, /ES/i casava o "es"
// de qualquer palavra portuguesa, e "Disponibilidades para 15/09" era marcada
// com a bandeira da Espanha.

import {
  stylePopup,
  styleResizeHandle,
  makeResizable,
  parseEmojiCodes
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation, isModuleOpen } from "../shared/animations.js";
import { DataService } from "../shared/data-service.js";
import { getAgentSegment } from "../shared/page-data.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";

// --- CONFIGURAÇÃO ---
const POLL_TIME_MS = 60 * 1000;
const READ_STORAGE_KEY = "cw_read_broadcasts";

const BC_DICT = {
    pt: {
        headerTitle: "Central de Avisos",
        headerDesc: "Comunicação oficial da operação.",
        clear: "Limpar",
        searchPlaceholder: "Buscar avisos...",
        details: "Detalhes",
        hide: "Ocultar",
        bauAvailability: "Disponibilidade BAU",
        attention: "atenção",
        full: "total",
        dates: "datas",
        date: "data",
        viewDetails: "Ver detalhes",
        nothingFound: "Nada encontrado.",
        allRead: "Tudo lido!",
        history: (n) => `Histórico (${n})`,
        typeLabel: { info: "Info", critical: "Alerta", success: "Sucesso" },
        syncing: "🔄 Sincronizando...",
        updated: '<span style="color:#137333">✓ Atualizado</span>',
        offline: "⚠️ Offline",
    },
    es: {
        headerTitle: "Central de Avisos",
        headerDesc: "Comunicación oficial de la operación.",
        clear: "Limpiar",
        searchPlaceholder: "Buscar avisos...",
        details: "Detalles",
        hide: "Ocultar",
        bauAvailability: "Disponibilidad BAU",
        attention: "atención",
        full: "total",
        dates: "fechas",
        date: "fecha",
        viewDetails: "Ver detalles",
        nothingFound: "No se encontró nada.",
        allRead: "¡Todo leído!",
        history: (n) => `Historial (${n})`,
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

        .cw-bc-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 0; color: #BDC1C6; gap: 16px; text-align: center; }
        .cw-bc-history-divider { display: flex; align-items: center; justify-content: center; margin: 20px 0; cursor: pointer; color: #1a73e8; font-size: 13px; font-weight: 500; gap: 8px; padding: 8px 16px; border-radius: 20px; background: #E8F0FE; }
        .cw-bc-history-container { display: none; flex-direction: column; gap: 16px; opacity: 0.8; }

        /* --- WIDGET BAU ---
           O visual desta faixa (paleta roxa, ponto pulsante) é o que estava
           aqui antes e segue por ora: esta seção trocou a FONTE do dado, de
           texto livre para campos, e misturar o redesenho no mesmo passo
           tornaria as duas mudanças impossíveis de revisar separadas. */
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
        .cw-bc-bau-slots-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .cw-bc-bau-slot { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.5); border-radius: 8px; flex: 1; justify-content: center; }
        .cw-bc-bau-seg { font-size: 11px; font-weight: 800; color: #6D28D9; letter-spacing: 0.5px; }
        .cw-bc-bau-date { font-size: 16px; font-weight: 700; color: #581C87; letter-spacing: -0.5px; }
        .cw-bc-bau-date-label { font-size: 10px; color: #7E22CE; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-bc-bau-note { font-size: 13px; line-height: 1.5; color: #581C87; }

        @media (prefers-reduced-motion: reduce) {
            .cw-bc-pulse-dot { animation: none !important; }
            .cw-bc-card, .cw-bc-bau, .cw-bc-bau-chevron {
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

// A data de disponibilidade vem em ISO (AAAA-MM-DD) e aparece curta, sem ano:
// a fila de BAU se planeja em semanas, e o ano só ocuparia espaço.
function formatShortDate(iso) {
    const parts = String(iso || "").split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}` : String(iso || "");
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

// Item da Central -> aviso. Um item com JSON quebrado (edição na planilha à
// mão) é descartado em vez de derrubar o feed inteiro.
//
// O `id` sai de item.key, e não de item.id, de propósito: editar um aviso
// publica uma LINHA nova, com ID novo, mas a mesma chave. Usar o ID faria todo
// aviso já lido reaparecer como não lido a cada correção de digitação.
function normalizeNotice(item) {
    if (!item) return null;

    let payload = {};
    try { payload = JSON.parse(item.value || "{}"); } catch (e) { return null; }

    const title = String(payload.title || item.label || "").trim();
    const text = String(payload.text || "").trim();
    if (!title || !text) return null;

    return {
        id: String(item.key || item.id || ""),
        type: TYPE_CONFIG[payload.type] ? payload.type : 'info',
        title: title,
        text: text,
        date: String(payload.publishedAt || item.publishedAt || ""),
        author: String(payload.author || item.publishedBy || ""),
        lang: String(item.lang || 'ALL').toUpperCase()
    };
}

// Cache da rota antiga, lido só quando a Central ainda não respondeu nenhuma
// vez neste navegador. Descarta os avisos de disponibilidade: naquele formato
// eles eram um aviso comum, e apareceriam soltos no feed com as datas em prosa.
function normalizeLegacyNotice(msg) {
    if (!msg) return null;

    const title = String(msg.title || "").trim();
    const text = String(msg.text || "").trim();
    if (!title || !text) return null;
    if (title.toLowerCase().includes("disponibilidade bau")) return null;

    return {
        id: String(msg.id || ""),
        type: TYPE_CONFIG[msg.type] ? msg.type : 'info',
        title: title,
        text: text,
        date: String(msg.date || ""),
        author: String(msg.author || ""),
        lang: 'ALL'
    };
}

// Módulo singleton: a lista tem no máximo um item. Segmentos sem nenhuma data
// são descartados aqui para a tela não precisar checar isso em cada render.
function normalizeAvailability(items) {
    const item = (items || [])[0];
    if (!item) return null;

    let payload = {};
    try { payload = JSON.parse(item.value || "{}"); } catch (e) { return null; }

    const raw = payload.segments || {};
    const segments = {};
    Object.keys(raw).forEach(code => {
        const attention = String(raw[code]?.attention || "");
        const full = String(raw[code]?.full || "");
        if (attention || full) segments[code] = { attention, full };
    });

    if (!Object.keys(segments).length) return null;

    return {
        updatedAt: String(payload.updatedAt || item.publishedAt || ""),
        author: String(payload.author || item.publishedBy || ""),
        note: String(payload.note || ""),
        segments: segments
    };
}

// Um aviso marcado para um segmento não aparece para quem atende o outro.
// 'ALL' vale para todo mundo, e é o padrão de quem publica sem escolher.
function isForSegment(notice, segment) {
    return notice.lang === 'ALL' || notice.lang === segment;
}

function readReadIds() {
    try {
        const parsed = JSON.parse(localStorage.getItem(READ_STORAGE_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function writeReadIds(ids) {
    try {
        localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));
    } catch (e) { /* localStorage indisponível — segue só em memória nesta sessão */ }
}

export function initBroadcastAssistant() {
  const CURRENT_VERSION = "v5.0";
  let visible = false;
  let pollInterval = null;
  let searchTerm = "";
  // Sobrevive a re-renders (busca, polling) enquanto o popup ficar aberto —
  // mesma ideia do searchTerm logo acima.
  let bauExpanded = false;

  let notices = [];
  let availability = null;

  // IDs vistos no fetch anterior e carimbo da última disponibilidade — usados
  // só para saber se algo *novo* chegou entre polls, e tocar o som uma vez por
  // novidade em vez de a cada sync. Começam null de propósito: na carga
  // inicial ainda não há "anterior" pra comparar, então não soa nada.
  let knownNoticeIds = null;
  let knownAvailabilityStamp = null;

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
    visible = !isModuleOpen(popup);
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

  // Botão Limpar
  if (actionContainer) {
      const markAll = document.createElement("button");
      markAll.textContent = bt('clear');
      markAll.className = "cw-btn-interactive";
      Object.assign(markAll.style, { fontSize: "12px", color: "#1a73e8", background: "transparent", border: "none", padding: "8px", fontWeight: "600" });
      markAll.onclick = (e) => {
          e.stopPropagation();
          SoundManager.playSuccess();
          writeReadIds(notices.map(m => m.id));
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

  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll cw-bc-feed";
  popup.appendChild(feed);

  // --- CARGA ---

  // Nunca lança: API fora do ar não pode apagar o que o agente já tinha na
  // tela. Devolve true se conseguiu falar com a Central nesta rodada.
  async function checkForUpdates() {
      if (visible) {
          statusEl.style.display = 'block';
          statusEl.innerHTML = bt('syncing');
      }

      let online = true;
      const segment = getAgentSegment();

      try {
          const [rawNotices, rawAvailability] = await Promise.all([
              DataService.fetchContentModule('broadcast'),
              DataService.fetchContentModule('bau_availability')
          ]);

          if (Array.isArray(rawNotices)) {
              const parsed = rawNotices
                  .map(normalizeNotice)
                  .filter(Boolean)
                  .filter(n => isForSegment(n, segment));

              // Uma resposta vazia é informação legítima (todo aviso saiu do
              // ar), mas só se a Central de fato respondeu. Aqui ela respondeu.
              notices = sortByDateDesc(parsed);
          } else {
              online = false;
          }

          availability = normalizeAvailability(rawAvailability);
      } catch (error) {
          online = false;
      }

      announceNews();
      updateBadge();

      // Repinta sempre, mesmo com o popup fechado. Antes isto ficava atrás de
      // um `if (visible)`, e o conteúdo recém-buscado só chegava à tela quando
      // alguém abria o módulo — que dispara outro sync e mostra o render
      // anterior enquanto a resposta não volta. O custo de manter o feed
      // pintado é um punhado de nós de DOM a cada 60s; o benefício é o módulo
      // abrir já certo, sem piscar o estado velho.
      renderFeed();

      // O texto de status, esse sim, só faz sentido para quem está olhando.
      if (visible) {
          statusEl.innerHTML = online ? bt('updated') : bt('offline');
          if (online) setTimeout(() => { statusEl.style.display = 'none'; }, 1500);
      }
  }

  // Toca só quando algo novo e não lido chega num poll em segundo plano
  // (pílula fechada/idle). Com o popup aberto, o próprio feed atualizando já é
  // o feedback — um som ali seria redundante.
  function announceNews() {
      const stamp = availability ? availability.updatedAt : null;
      const primeiraCarga = knownNoticeIds === null;

      if (!primeiraCarga && !visible) {
          const readIds = readReadIds();
          const avisoNovo = notices.some(n => !knownNoticeIds.has(n.id) && !readIds.includes(n.id));
          // A disponibilidade não é um aviso não-lido: ela se sobrescreve. O
          // que marca "chegou coisa nova" aqui é o carimbo ter mudado.
          const disponibilidadeNova = !!stamp && stamp !== knownAvailabilityStamp;

          if (avisoNovo || disponibilidadeNova) SoundManager.playNotification();
      }

      knownNoticeIds = new Set(notices.map(n => n.id));
      knownAvailabilityStamp = stamp;
  }

  function sortByDateDesc(list) {
      return list.slice().sort((a, b) => {
          const dateA = new Date(a.date).getTime() || 0;
          const dateB = new Date(b.date).getTime() || 0;
          return dateB - dateA;
      });
  }

  function updateBadge() {
      const btn = document.getElementById("cw-btn-broadcast");
      if (!btn) return;
      const readIds = readReadIds();
      const hasUnread = notices.some(m => !readIds.includes(m.id));
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

  // --- RENDER ---

  // Faixa de disponibilidade, logo abaixo do status. Nunca é filtrada pela
  // busca: é estado operacional fixo, não uma mensagem para procurar.
  function renderBauWidget() {
      const old = popup.querySelector('#cw-bau-widget');
      if (old) old.remove();
      if (!availability) return;

      const codes = Object.keys(availability.segments);

      const slotsHTML = codes.map(code => {
          const seg = availability.segments[code];
          const datas = [];
          if (seg.attention) {
              datas.push(`<span class="cw-bc-bau-date-label">${bt('attention')}</span>
                          <span class="cw-bc-bau-date">${formatShortDate(seg.attention)}</span>`);
          }
          if (seg.full) {
              datas.push(`<span class="cw-bc-bau-date-label">${bt('full')}</span>
                          <span class="cw-bc-bau-date">${formatShortDate(seg.full)}</span>`);
          }
          return `<div class="cw-bc-bau-slot">
                      <span class="cw-bc-bau-seg">${code}</span>
                      ${datas.join('')}
                  </div>`;
      }).join('');

      const totalDatas = codes.reduce((n, code) => {
          const seg = availability.segments[code];
          return n + (seg.attention ? 1 : 0) + (seg.full ? 1 : 0);
      }, 0);

      const hintText = totalDatas
          ? `${codes.join(' · ')} · ${totalDatas} ${totalDatas > 1 ? bt('dates') : bt('date')}`
          : bt('viewDetails');

      const widget = document.createElement("div");
      widget.id = "cw-bau-widget";
      widget.className = "cw-bc-bau" + (bauExpanded ? " expanded" : "");
      widget.innerHTML = `
          <div class="cw-bc-bau-header cw-btn-interactive">
              <div class="cw-bc-live-indicator">
                  <div class="cw-bc-pulse-dot"></div>
                  <span class="cw-bc-bau-label">${bt('bauAvailability')}</span>
              </div>
              <div class="cw-bc-bau-right">
                  <span class="cw-bc-bau-hint">${hintText}</span>
                  <span class="cw-bc-bau-timestamp">${formatFriendlyDate(availability.updatedAt)}</span>
                  <svg class="cw-bc-bau-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
          </div>
          <div class="cw-bc-bau-detail">
              <div class="cw-bc-bau-slots-row">${slotsHTML}</div>
              ${availability.note ? `<div class="cw-bc-bau-note">${parseMessageText(availability.note)}</div>` : ''}
          </div>
      `;

      statusEl.after(widget);

      widget.querySelector('.cw-bc-bau-header').onclick = () => {
          bauExpanded = !bauExpanded;
          widget.classList.toggle('expanded', bauExpanded);
          SoundManager.playClick();
      };
  }

  // Lista de não-lidos + histórico colapsável de lidos.
  function renderMessageList(messages, readIds, hasBauWidget) {
      const isSearching = searchTerm.trim().length > 0;

      if (messages.length === 0 && !hasBauWidget) {
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

      const unreadMsgs = messages.filter(m => !readIds.includes(m.id));
      const readMsgs = messages.filter(m => readIds.includes(m.id));

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

      renderBauWidget();

      const readIds = readReadIds();
      const term = searchTerm.trim().toLowerCase();
      renderMessageList(notices.filter(m => matchesSearch(m, term)), readIds, !!availability);
  }

  function createCard(msg, isHistory) {
    const card = document.createElement("div");
    card.className = "cw-bc-card" + (isHistory ? " history" : "");
    const typeKey = TYPE_CONFIG[msg.type] ? msg.type : 'info';
    const theme = TYPE_CONFIG[typeKey];

    const cardHead = document.createElement("div");
    cardHead.className = "cw-bc-card-head";

    const typeLabel = document.createElement("div");
    typeLabel.className = "cw-bc-type-tag " + typeKey;
    typeLabel.innerHTML = `${theme.icon} <span>${bt('typeLabel')[typeKey]}</span>`;
    cardHead.appendChild(typeLabel);

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
                const currentRead = readReadIds();
                currentRead.push(msg.id);
                writeReadIds(currentRead);
                renderFeed();
                updateBadge();
            }, 300);
        };
        cardHead.appendChild(dismissBtn);
    } else {
        const dateLabel = document.createElement("span");
        dateLabel.className = "cw-bc-date-tag";
        dateLabel.textContent = formatFriendlyDate(msg.date);
        cardHead.appendChild(dateLabel);
    }

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

    bodyContainer.append(title, text, meta);
    card.append(cardHead, bodyContainer);

    return card;
  }

  // --- STARTUP ---
  // Pinta do cache antes de qualquer rede, como os outros módulos da Central.
  const cachedNotices = DataService.getCachedContent('broadcast');
  if (Array.isArray(cachedNotices) && cachedNotices.length) {
      notices = sortByDateDesc(
          cachedNotices.map(normalizeNotice).filter(Boolean)
              .filter(n => isForSegment(n, getAgentSegment()))
      );
  } else {
      // Primeiro load depois do deploy: ainda não há cache da Central, mas
      // pode haver o da rota antiga. Sem isto, quem abrir offline veria a
      // Central de Avisos vazia em vez dos avisos que já tinha.
      notices = sortByDateDesc(
          DataService.getCachedBroadcasts().map(normalizeLegacyNotice).filter(Boolean)
      );
  }
  availability = normalizeAvailability(DataService.getCachedContent('bau_availability'));
  renderFeed();

  checkForUpdates();
  if (!pollInterval) pollInterval = setInterval(checkForUpdates, POLL_TIME_MS);

  const resizeHandle = document.createElement("div");
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag";
  popup.appendChild(resizeHandle);
  makeResizable(popup, resizeHandle);
  document.body.appendChild(popup);

  const hasUnread = notices.some((m) => !readReadIds().includes(m.id));

  // Retraduz os pedaços montados uma única vez (header, busca e o botão
  // "Limpar") e refaz o feed, que já é gerado do zero a cada render e por isso
  // pega o idioma atual sozinho.
  onLanguageChange(() => {
      if (headerTitleEl) headerTitleEl.textContent = bt('headerTitle');
      const helpTitleEl = popup.querySelector('.cw-help-title');
      if (helpTitleEl) helpTitleEl.textContent = bt('headerTitle');
      const helpDescEl = popup.querySelector('.cw-help-description');
      if (helpDescEl) helpDescEl.textContent = bt('headerDesc');
      searchInput.placeholder = bt('searchPlaceholder');
      if (actionContainer) {
          const clearBtn = [...actionContainer.children].find(el => el.tagName === 'BUTTON');
          if (clearBtn) clearBtn.textContent = bt('clear');
      }
      renderFeed();
  });

  return { toggle: toggleVisibility, hasUnread };
}
