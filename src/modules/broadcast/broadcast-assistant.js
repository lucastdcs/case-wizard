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
        searchPlaceholder: "Buscar avisos…",
        clearSearch: "Limpar a busca",
        markRead: (t) => `Marcar “${t}” como lido`,
        markReadShort: "Marcar como lido",
        publishedBy: (a) => `Publicado por ${a}`,
        system: "Sistema",
        bauAvailability: "Disponibilidade BAU",
        attention: "atenção",
        full: "total",
        noDates: "sem datas publicadas",
        asideLabel: "Estado da operação",
        filtersTitle: "Filtrar por tipo",
        filterAll: "Todos",
        readTitle: "Leitura",
        readCount: (n) => n === 1 ? "1 lido" : `${n} lidos`,
        markAllRead: "Marcar tudo como lido",
        updatedAgo: (q) => `Atualizado ${q}`,
        swapTo: (seg) => `Ver disponibilidade de ${seg}`,
        justNow: "agora",
        minutesAgo: (n) => `há ${n} min`,
        hoursAgo: (n) => `há ${n} h`,
        yesterday: "ontem",
        nothingFound: "Nada encontrado.",
        allRead: "Tudo lido!",
        history: (n) => `Histórico (${n})`,
        typeLabel: { info: "Info", critical: "Alerta", success: "Sucesso" },
        syncing: "Sincronizando…",
        updated: "Atualizado",
        offline: "Sem conexão — mostrando o que já estava aqui",
    },
    es: {
        headerTitle: "Central de Avisos",
        headerDesc: "Comunicación oficial de la operación.",
        searchPlaceholder: "Buscar avisos…",
        clearSearch: "Limpiar la búsqueda",
        markRead: (t) => `Marcar “${t}” como leído`,
        markReadShort: "Marcar como leído",
        publishedBy: (a) => `Publicado por ${a}`,
        system: "Sistema",
        bauAvailability: "Disponibilidad BAU",
        attention: "atención",
        full: "total",
        noDates: "sin fechas publicadas",
        asideLabel: "Estado de la operación",
        filtersTitle: "Filtrar por tipo",
        filterAll: "Todos",
        readTitle: "Lectura",
        readCount: (n) => n === 1 ? "1 leído" : `${n} leídos`,
        markAllRead: "Marcar todo como leído",
        updatedAgo: (q) => `Actualizado ${q}`,
        swapTo: (seg) => `Ver disponibilidad de ${seg}`,
        justNow: "ahora",
        minutesAgo: (n) => `hace ${n} min`,
        hoursAgo: (n) => `hace ${n} h`,
        yesterday: "ayer",
        nothingFound: "No se encontró nada.",
        allRead: "¡Todo leído!",
        history: (n) => `Historial (${n})`,
        typeLabel: { info: "Info", critical: "Alerta", success: "Éxito" },
        syncing: "Sincronizando…",
        updated: "Actualizado",
        offline: "Sin conexión — mostrando lo que ya estaba aquí",
    },
};

function bt(key) {
    const lang = getLanguage();
    return BC_DICT[lang]?.[key] ?? BC_DICT.pt[key];
}

// Segmentos da operação, na ordem em que o swap alterna.
//
// A bandeira é SVG inline, e não emoji, por um motivo antes técnico que
// estético: 🇧🇷 é um par de "regional indicators", e o Chrome no Windows não
// tem a fonte que os compõe — o agente veria as letras B e R em duas
// caixinhas, não uma bandeira. O SVG renderiza igual em qualquer máquina.
//
// PT usa a bandeira do Brasil (e não a de Portugal) porque é a operação que o
// segmento atende — mesma escolha que o código anterior já fazia.
const SEGMENTS = {
    PT: {
        label: "PT-BR",
        flag: `<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#009B3A"/><path d="M10.5 1.9 19.1 7.5 10.5 13.1 1.9 7.5Z" fill="#FEDF00"/><circle cx="10.5" cy="7.5" r="3.3" fill="#002776"/></svg>`
    },
    ES: {
        label: "ES",
        flag: `<svg class="cw-bc-bau-flag" viewBox="0 0 21 15" aria-hidden="true"><rect width="21" height="15" fill="#AA151B"/><rect y="3.75" width="21" height="7.5" fill="#F1BF00"/></svg>`
    }
};

const SWAP_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 2 21 6 17 10"></polyline><path d="M3 12V10a4 4 0 0 1 4-4h14"></path><polyline points="7 22 3 18 7 14"></polyline><path d="M21 12v2a4 4 0 0 1-4 4H3"></path></svg>`;

// Tipos aceitos. O objeto virou só o conjunto de chaves válidas: o ícone SVG
// que morava aqui saiu junto com a pílula — o tipo agora é dito por um ponto
// na cor semântica e pela palavra, em texto normal.
const TYPE_CONFIG = { critical: true, info: true, success: true };


// --- FOLHA DE ESTILOS DEDICADA ---
function injectStyles() {
    if (document.getElementById('cw-broadcast-styles')) return;
    const style = document.createElement("style");
    style.id = 'cw-broadcast-styles';
    style.textContent = `
        .cw-btn-interactive { transition: transform 0.1s ease, background 0.2s ease; cursor: pointer; user-select: none; }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* --- SUPERFÍCIES ---
           O vidro precisa de um chão. A versão anterior empilhava card branco
           translúcido sobre um popup branco quase sólido, com borda de realce
           branca — medido, a borda dava contraste 1.00 (invisível) e o card não
           se separava do fundo. Era o "tudo branco junto" que tornava a leitura
           difícil.

           A janela SEGUE translúcida (o backgroundColor de stylePopup não é
           sobrescrito). O fundo ambiente vai na área de conteúdo, aqui dentro:
           assim o módulo continua sendo um painel de vidro sobre o CRM, e os
           cards passam a ter sobre o que flutuar. */
        /* O contexto de container fica na JANELA, não no corpo. Um elemento não
           pode ser estilizado pela própria container query: com o
           container-type aqui no .cw-bc-body, a regra que troca o
           flex-direction dele mais abaixo simplesmente não valia, e encolher a
           janela espremia o feed a uma coluna de um caractere. */
        #broadcast-popup { container-type: inline-size; container-name: cwbc; }
        .cw-bc-body {
            flex: 1; min-height: 0; display: flex; gap: 0;
            background: linear-gradient(160deg, #E1E7EF 0%, #EFF2F7 55%, #E6EBF2 100%);
        }

        /* --- BUSCA --- */
        /* O padding e o posicionamento dos ícones ficam em elementos
           DIFERENTES de propósito. Quando estavam no mesmo, o top:50% dos
           ícones era relativo à caixa com padding, não ao input — e qualquer
           padding vertical assimétrico os jogava fora do centro. Foi um bug
           real duas vezes neste arquivo; separar resolve por construção. */
        .cw-bc-search-wrap { padding: 14px 20px; flex-shrink: 0; background: rgba(255,255,255,0.55); border-bottom: 1px solid rgba(0,0,0,0.07); }
        .cw-bc-search-field { position: relative; display: flex; }
        .cw-bc-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #5f6368; pointer-events: none; display: flex; }
        .cw-bc-search-input {
            width: 100%; box-sizing: border-box; height: 38px; padding: 0 36px;
            border-radius: 10px; border: 1px solid rgba(0,0,0,0.10);
            background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
            font-size: 13px; font-family: 'Google Sans', Roboto, sans-serif; color: #202124; outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .cw-bc-search-input::placeholder { color: #70757a; }
        .cw-bc-search-input:focus { background: #fff; border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.14); }
        .cw-bc-search-clear {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            width: 22px; height: 22px; padding: 0; border: none; border-radius: 50%; display: none;
            align-items: center; justify-content: center; color: #5f6368; cursor: pointer;
            background: transparent; touch-action: manipulation;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-bc-search-clear:hover { background: rgba(0,0,0,0.08); color: #202124; }
        .cw-bc-search-clear.visible { display: flex; }

        /* --- FEED --- */
        /* overscroll-behavior: o feed rola dentro de uma janela flutuante, e
           sem isto chegar ao fim dele passa a rolagem para a página do CRM
           atrás. */
        .cw-bc-feed {
            padding: 16px 20px 72px 20px; overflow-y: auto; overscroll-behavior: contain;
            flex: 1; min-width: 0;
            display: flex; flex-direction: column; gap: 12px;
        }

        /* Um contêiner por aviso, e só um. A versão anterior era caixa dentro
           de caixa: o card tinha borda e sombra, o cabeçalho tinha outra borda
           embaixo, e o rodapé de ações tinha fundo próprio. A hierarquia agora
           vem de tipografia e espaço, que é como o Material resolve.

           As duas arestas são o que faz o vidro ler: hairline escura por fora
           para separar do fundo, realce branco por dentro para o painel ter
           volume. Só a de dentro, sobre fundo claro, não separa nada. */
        .cw-bc-card {
            background: rgba(255,255,255,0.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(0,0,0,0.12); border-radius: 14px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(60,64,67,0.14);
            padding: 14px 16px; width: 100%; box-sizing: border-box; flex-shrink: 0;
            display: flex; flex-direction: column; gap: 6px;
            transition: opacity 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cw-bc-card.history { box-shadow: none; opacity: 0.72; background: rgba(255,255,255,0.5); }

        .cw-bc-card-meta { display: flex; align-items: center; gap: 8px; min-width: 0; }
        /* O tipo do aviso é dito em texto normal, com um ponto na cor
           semântica. Era uma pílula em caixa alta sobre fundo colorido, que lê
           como selo decorativo — e disputava com o título a primeira leitura
           do card, sendo a informação menos importante dos dois. */
        .cw-bc-type { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #444746; white-space: nowrap; }
        .cw-bc-type-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .cw-bc-type-dot.critical { background: #C5221F; }
        .cw-bc-type-dot.info { background: #1A73E8; }
        .cw-bc-type-dot.success { background: #188038; }
        .cw-bc-meta-sep { color: #9aa0a6; font-size: 12px; }
        .cw-bc-date-tag { font-size: 12px; color: #5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }

        .cw-bc-msg-title { font-size: 15px; font-weight: 600; color: #202124; line-height: 1.35; margin: 0; text-wrap: pretty; }
        .cw-bc-msg-body { font-size: 13.5px; color: #3c4043; line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere; }
        /* Global (não escopado a .cw-bc-msg-body): parseMessageText() é usada
           tanto nos cards quanto na nota da faixa de disponibilidade. */
        .cw-bc-link { color: #1967d2; text-decoration: none; font-weight: 500; }
        .cw-bc-link:hover { text-decoration: underline; }
        .cw-bc-msg-author { font-size: 11px; color: #5f6368; }

        .cw-bc-dismiss-btn {
            width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.12);
            background: rgba(255,255,255,0.7); color: #444746; cursor: pointer; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center; margin-left: auto;
            padding: 0; touch-action: manipulation;
            transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
        }
        .cw-bc-dismiss-btn:hover { color: #137333; background: #e6f4ea; border-color: #137333; }

        .cw-bc-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 16px; color: #5f6368; gap: 14px; text-align: center; font-size: 13px; }
        .cw-bc-empty svg { color: #9aa0a6; }

        .cw-bc-history-container { display: none; flex-direction: column; gap: 12px; }

        /* --- ASIDE ---
           O que é ESTADO fica aqui; o que é FLUXO fica no feed. A
           disponibilidade BAU era uma faixa fixa em cima da lista, empurrando
           os avisos para baixo em toda abertura — estado ocupando o lugar do
           fluxo. Junto com ela vieram os filtros, o histórico e o estado de
           sincronização, que também são estado e também estavam espalhados
           dentro do feed. */
        .cw-bc-aside {
            width: 264px; flex-shrink: 0; overflow-y: auto; overscroll-behavior: contain;
            padding: 16px 16px 72px 0;
            display: flex; flex-direction: column; gap: 12px;
        }
        /* A janela é redimensionável. Abaixo de 620px as duas colunas ficariam
           espremidas, então o aside passa para cima do feed, em linha. */
        @container cwbc (max-width: 620px) {
            .cw-bc-body { flex-direction: column-reverse; }
            .cw-bc-aside {
                width: auto; padding: 12px 20px 0 20px; overflow: visible;
                flex-direction: row; flex-wrap: wrap; align-items: flex-start; gap: 8px;
            }
            /* align-items: flex-start acima, senão os painéis esticam para a
               altura da linha e viram três retângulos vazios. */
            .cw-bc-aside .cw-bc-panel { flex: 1 1 200px; }
            .cw-bc-feed { padding-top: 12px; }
        }

        .cw-bc-panel {
            background: rgba(255,255,255,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0,0,0,0.11); border-radius: 12px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.85);
            padding: 12px 14px; display: flex; flex-direction: column; gap: 10px;
        }
        .cw-bc-panel-title {
            font-size: 11px; font-weight: 600; color: #444746;
            letter-spacing: 0.3px;
        }

        /* --- Disponibilidade BAU (agora um item do aside) --- */
        .cw-bc-bau-top { display: flex; align-items: center; gap: 8px; }
        /* O contorno de 1px existe para a faixa amarela da bandeira da Espanha
           e o verde claro da do Brasil não encostarem no fundo claro. */
        .cw-bc-bau-flag { width: 16px; height: 11px; border-radius: 1px; box-shadow: 0 0 0 1px rgba(0,0,0,0.25); flex-shrink: 0; display: block; }
        .cw-bc-bau-label { font-size: 12px; font-weight: 600; color: #202124; white-space: nowrap; }
        .cw-bc-bau-seg { font-size: 11px; color: #5f6368; }
        .cw-bc-bau-swap {
            width: 26px; height: 26px; border-radius: 50%; border: none; padding: 0;
            background: transparent; color: #5f6368; cursor: pointer; flex-shrink: 0;
            margin-left: auto;
            display: flex; align-items: center; justify-content: center;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-bc-bau-swap:hover { background: rgba(0,0,0,0.07); color: #202124; }
        .cw-bc-bau-dates { display: flex; flex-direction: column; gap: 6px; }
        .cw-bc-bau-date { display: flex; align-items: center; gap: 7px; }
        .cw-bc-bau-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .cw-bc-bau-date.attention .cw-bc-bau-dot { background: #B06000; }
        .cw-bc-bau-date.full .cw-bc-bau-dot { background: #137333; }
        .cw-bc-bau-kind { font-size: 11.5px; color: #5f6368; flex: 1; }
        /* tabular-nums para as datas não dançarem de largura entre um poll e
           outro (o "1" é mais estreito que os outros dígitos em Google Sans). */
        .cw-bc-bau-value { font-size: 14px; font-weight: 600; color: #202124; font-variant-numeric: tabular-nums; }
        .cw-bc-bau-empty { font-size: 12px; color: #5f6368; }
        .cw-bc-bau-note { font-size: 11.5px; line-height: 1.45; color: #5f6368; }

        /* --- Filtros por tipo ---
           A contagem não muda com a busca de propósito: um número que dança
           enquanto se digita não serve para nada. Ela conta os avisos do
           segmento; a busca estreita o que aparece, não o que existe. */
        .cw-bc-filters { display: flex; flex-direction: column; gap: 2px; }
        .cw-bc-filter {
            display: flex; align-items: center; gap: 8px; width: 100%;
            padding: 7px 8px; border: none; border-radius: 8px; cursor: pointer;
            background: transparent; font-family: inherit; font-size: 12.5px; color: #3c4043;
            text-align: left; touch-action: manipulation;
            transition: background-color 0.15s ease;
        }
        .cw-bc-filter:hover { background: rgba(0,0,0,0.055); }
        .cw-bc-filter[aria-pressed="true"] { background: #E8F0FE; color: #1967d2; font-weight: 600; }
        .cw-bc-filter-count { margin-left: auto; font-size: 12px; color: #5f6368; font-variant-numeric: tabular-nums; }
        .cw-bc-filter[aria-pressed="true"] .cw-bc-filter-count { color: #1967d2; }

        /* --- Histórico, limpar e sincronização --- */
        .cw-bc-history-divider {
            display: flex; align-items: center; gap: 8px; width: 100%;
            padding: 7px 8px; border: none; border-radius: 8px; cursor: pointer;
            background: transparent; font-family: inherit; font-size: 12.5px; color: #3c4043;
            text-align: left; touch-action: manipulation; transition: background-color 0.15s ease;
        }
        .cw-bc-history-divider:hover { background: rgba(0,0,0,0.055); }
        .cw-bc-history-divider svg { margin-left: auto; transition: transform 0.25s ease; color: #5f6368; }
        .cw-bc-history-divider[aria-expanded="true"] { background: #E8F0FE; color: #1967d2; font-weight: 600; }
        .cw-bc-history-divider[aria-expanded="true"] svg { transform: rotate(180deg); }

        .cw-bc-clear-btn {
            border: none; background: transparent; color: #1967d2; cursor: pointer;
            font-family: inherit; font-size: 12.5px; font-weight: 500;
            padding: 7px 8px; border-radius: 8px; text-align: left; touch-action: manipulation;
            transition: background-color 0.15s ease;
        }
        .cw-bc-clear-btn:hover { background: rgba(26,115,232,0.10); }
        .cw-bc-clear-btn:disabled { color: #70757a; cursor: default; background: transparent; }

        /* O texto "Sincronizando" morava numa faixa no topo do feed, que
           aparecia e sumia empurrando a lista inteira. Virou um ponto fixo no
           aside: gira enquanto busca, e fora disso diz quando foi a última vez. */
        .cw-bc-sync { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: #5f6368; }
        .cw-bc-sync.offline { color: #9A5400; }
        .cw-bc-spinner {
            width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; box-sizing: border-box;
            border: 2px solid rgba(0,0,0,0.14); border-top-color: #1a73e8;
            animation: cw-bc-spin 0.7s linear infinite;
        }
        @keyframes cw-bc-spin { to { transform: rotate(360deg); } }
        .cw-bc-sync-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; background: #137333; }
        .cw-bc-sync.offline .cw-bc-sync-dot { background: #9A5400; }

        /* --- FOCO ---
           Uma regra só, para todo controle do módulo. Antes nenhum tinha foco
           visível: quem navega por teclado percorria o feed às cegas. */
        .cw-bc-search-input:focus-visible,
        .cw-bc-search-clear:focus-visible,
        .cw-bc-dismiss-btn:focus-visible,
        .cw-bc-history-divider:focus-visible,
        .cw-bc-filter:focus-visible,
        .cw-bc-clear-btn:focus-visible,
        .cw-bc-bau-swap:focus-visible {
            outline: 2px solid #1a73e8;
            outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-bc-spinner { animation: none; border-top-color: rgba(0,0,0,0.14); }
            .cw-bc-card {
                transition: opacity 0.15s ease !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- PARSERS & UTILS (puros, sem dependência de closure) ---

// Formata no idioma da interface, e não sempre em pt-BR como antes: quem
// atende ES via a interface em espanhol e as datas em português.
const DATE_LOCALE = { pt: 'pt-BR', es: 'es-ES' };

function formatFriendlyDate(dateInput) {
    if (!dateInput) return "";
    try {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return String(dateInput);
        return new Intl.DateTimeFormat(DATE_LOCALE[getLanguage()] || 'pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(date);
    } catch (e) { return String(dateInput); }
}

// A data de disponibilidade vem em ISO (AAAA-MM-DD) e aparece curta, sem ano:
// a fila de BAU se planeja em semanas, e o ano só ocuparia espaço.
function formatShortDate(iso) {
    const parts = String(iso || "").split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}` : String(iso || "");
}

// "há 3 min" em vez de um carimbo completo. A faixa é sobre estado corrente:
// o que importa é se o dado é de agora ou de ontem, não a hora exata. Passado
// um dia, volta a mostrar a data — "há 37 h" não ajuda ninguém.
function formatRelative(iso) {
    const then = new Date(iso).getTime();
    if (!then || isNaN(then)) return "";

    const minutos = Math.floor((Date.now() - then) / 60000);
    if (minutos < 1) return bt('justNow');
    if (minutos < 60) return bt('minutesAgo')(minutos);

    const horas = Math.floor(minutos / 60);
    if (horas < 24) return bt('hoursAgo')(horas);
    if (horas < 48) return bt('yesterday');

    return formatFriendlyDate(iso).split(',')[0];
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
  // Segmento em exibição na faixa de disponibilidade. null = o do agente.
  //
  // Sobrevive a re-renders (busca, polling) enquanto o popup ficar aberto, e é
  // zerado ao reabrir: trocar de segmento é uma consulta rápida ao outro time,
  // não uma preferência. Quem atende PT tem que reencontrar PT ao abrir de
  // novo, sem depender de lembrar que deixou o swap ligado.
  let shownSegment = null;

  // Tipo selecionado nos filtros do aside. null = todos.
  let activeType = null;
  // Histórico (avisos já lidos) aberto no feed. O controle vive no aside.
  let historyOpen = false;

  let notices = [];
  let availability = null;

  // IDs vistos no fetch anterior e carimbo da última disponibilidade — usados
  // só para saber se algo *novo* chegou entre polls, e tocar o som uma vez por
  // novidade em vez de a cada sync. Começam null de propósito: na carga
  // inicial ainda não há "anterior" pra comparar, então não soa nada.
  let knownNoticeIds = null;
  let knownAvailabilityStamp = null;

  // Quando a Central respondeu pela última vez. Alimenta a linha de
  // sincronização do aside ("Atualizado há 2 min").
  let lastSyncAt = null;

  injectStyles();

  // --- UI SETUP ---
  const popup = document.createElement("div");
  popup.id = "broadcast-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, {
    // 760 e não 420: a 420 o texto de um aviso quebrava em ~45 caracteres,
    // estreito demais para leitura corrida, e não havia onde pôr o estado
    // (disponibilidade, filtros, histórico) sem empurrar a lista para baixo.
    // Agora são duas colunas — feed com ~70 caracteres de medida, e o aside.
    right: "auto", left: "50%", width: "760px", height: "680px",
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)",
    overflow: "hidden"
    // Sem backgroundColor aqui de propósito: o de stylePopup é translúcido
    // (rgba branco + backdrop-filter). Sobrescrever por #FAFAFA opaco era o que
    // tirava o vidro só deste módulo.
  });

  const animRefs = { popup, googleLine: null };

  function toggleVisibility() {
    visible = !isModuleOpen(popup);
    toggleGenieAnimation(visible, popup, "cw-btn-broadcast");
    if (visible) {
      lockBodyScroll();
      const btn = document.getElementById("cw-btn-broadcast");
      if (btn) btn.classList.remove("has-new");
      shownSegment = null;
      activeType = null;
      historyOpen = false;
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

  popup.appendChild(header);

  // --- BUSCA (largura inteira, acima das duas colunas) ---
  const searchWrap = document.createElement("div");
  searchWrap.className = "cw-bc-search-wrap";
  const searchIcon = document.createElement("div");
  searchIcon.className = "cw-bc-search-icon";
  searchIcon.setAttribute('aria-hidden', 'true');
  searchIcon.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
  const searchInput = document.createElement("input");
  searchInput.className = "cw-bc-search-input no-drag";
  searchInput.type = "search";
  searchInput.name = "cw-broadcast-search";
  searchInput.autocomplete = "off";
  searchInput.spellcheck = false;
  searchInput.placeholder = bt('searchPlaceholder');
  // Sem rótulo visível: o campo é o único da tela e o placeholder já explica.
  searchInput.setAttribute('aria-label', bt('searchPlaceholder'));
  // <button> e não <div>: era um div com onclick, invisível para o teclado.
  const searchClear = document.createElement("button");
  searchClear.type = "button";
  searchClear.className = "cw-bc-search-clear";
  searchClear.setAttribute('aria-label', bt('clearSearch'));
  searchClear.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  const searchField = document.createElement("div");
  searchField.className = "cw-bc-search-field";
  searchField.append(searchIcon, searchInput, searchClear);
  searchWrap.appendChild(searchField);
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

  // --- CORPO: feed (fluxo) + aside (estado) ---
  const body = document.createElement("div");
  body.className = "cw-bc-body";
  popup.appendChild(body);

  const feed = document.createElement("div");
  feed.className = "cw-nice-scroll cw-bc-feed";
  feed.setAttribute('role', 'feed');
  feed.setAttribute('aria-label', bt('headerTitle'));
  body.appendChild(feed);

  const aside = document.createElement("aside");
  aside.className = "cw-nice-scroll cw-bc-aside";
  aside.setAttribute('aria-label', bt('asideLabel'));
  body.appendChild(aside);

  // Painel da disponibilidade. Fica escondido enquanto não houver nada
  // publicado — um painel vazio no aside seria só um buraco.
  const bauPanel = document.createElement("div");
  bauPanel.id = "cw-bau-widget";
  bauPanel.className = "cw-bc-panel";
  bauPanel.style.display = "none";
  aside.appendChild(bauPanel);

  const filtersPanel = document.createElement("div");
  filtersPanel.className = "cw-bc-panel";
  aside.appendChild(filtersPanel);

  const readPanel = document.createElement("div");
  readPanel.className = "cw-bc-panel";
  aside.appendChild(readPanel);

  // Estado da sincronização. Mantém o id e os atributos que já existiam: o
  // texto muda sozinho quando o poll responde, e sem aria-live um leitor de
  // tela nunca fica sabendo que sincronizou nem que caiu a conexão.
  const statusEl = document.createElement('div');
  statusEl.id = 'cw-update-status';
  statusEl.className = 'cw-bc-sync';
  statusEl.setAttribute('role', 'status');
  statusEl.setAttribute('aria-live', 'polite');
  aside.appendChild(statusEl);

  function renderSync({ syncing = false, online = true } = {}) {
      statusEl.classList.toggle('offline', !syncing && !online);
      if (syncing) {
          statusEl.innerHTML = `<span class="cw-bc-spinner" aria-hidden="true"></span><span>${bt('syncing')}</span>`;
          return;
      }
      const quando = lastSyncAt ? formatRelative(lastSyncAt) : '';
      const texto = online
          ? (quando ? bt('updatedAgo')(quando) : bt('updated'))
          : bt('offline');
      statusEl.innerHTML = `<span class="cw-bc-sync-dot" aria-hidden="true"></span><span>${texto}</span>`;
  }

  // --- CARGA ---

  // Nunca lança: API fora do ar não pode apagar o que o agente já tinha na
  // tela. Devolve true se conseguiu falar com a Central nesta rodada.
  async function checkForUpdates() {
      renderSync({ syncing: true });

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

      if (online) lastSyncAt = new Date().toISOString();

      announceNews();
      updateBadge();

      // Repinta sempre, mesmo com o popup fechado. Antes isto ficava atrás de
      // um `if (visible)`, e o conteúdo recém-buscado só chegava à tela quando
      // alguém abria o módulo — que dispara outro sync e mostra o render
      // anterior enquanto a resposta não volta. O custo de manter o feed
      // pintado é um punhado de nós de DOM a cada 60s; o benefício é o módulo
      // abrir já certo, sem piscar o estado velho.
      renderFeed();
      renderSync({ online });
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

  // --- RENDER ---

  // --- ASIDE: disponibilidade ---
  //
  // Mostra UM segmento por vez — o que a pessoa atende — porque é a resposta
  // que ela precisa em 99% das vezes. O outro fica a um clique no botão de
  // troca, para quem eventualmente cobre os dois.
  function renderBauPanel() {
      if (!availability) {
          bauPanel.style.display = "none";
          bauPanel.innerHTML = "";
          return;
      }

      const codes = Object.keys(SEGMENTS).filter(c => availability.segments[c]);
      if (!codes.length) {
          bauPanel.style.display = "none";
          bauPanel.innerHTML = "";
          return;
      }

      // Sem escolha explícita, mostra o segmento do agente. Se ele não tem
      // disponibilidade publicada, cai no primeiro que tiver — melhor mostrar
      // a do outro segmento, rotulada, do que uma faixa vazia.
      const preferido = shownSegment && codes.includes(shownSegment)
          ? shownSegment
          : (codes.includes(getAgentSegment()) ? getAgentSegment() : codes[0]);

      const seg = SEGMENTS[preferido];
      const datas = availability.segments[preferido] || {};

      const linha = (kind, iso) => `
          <span class="cw-bc-bau-date ${kind}">
              <span class="cw-bc-bau-dot"></span>
              <span class="cw-bc-bau-kind">${bt(kind)}</span>
              <span class="cw-bc-bau-value">${formatShortDate(iso)}</span>
          </span>`;

      const linhas = [
          datas.attention ? linha('attention', datas.attention) : '',
          datas.full ? linha('full', datas.full) : ''
      ].join('');

      // O botão de troca só existe quando há de fato outro segmento para ver.
      const outro = codes.find(c => c !== preferido);
      const swapHTML = outro
          ? `<button class="cw-bc-bau-swap" type="button"
                     aria-label="${bt('swapTo')(SEGMENTS[outro].label)}"
                     title="${bt('swapTo')(SEGMENTS[outro].label)}">${SWAP_ICON}</button>`
          : '';

      bauPanel.style.display = "flex";
      bauPanel.innerHTML = `
          <div class="cw-bc-bau-top">
              ${seg.flag}
              <span class="cw-bc-bau-label">${bt('bauAvailability')}</span>
              <span class="cw-bc-bau-seg">${seg.label}</span>
              ${swapHTML}
          </div>
          <div class="cw-bc-bau-dates">
              ${linhas || `<span class="cw-bc-bau-empty">${bt('noDates')}</span>`}
          </div>
          ${availability.note ? `<div class="cw-bc-bau-note">${parseMessageText(availability.note)}</div>` : ''}
      `;

      const swapBtn = bauPanel.querySelector('.cw-bc-bau-swap');
      if (swapBtn) {
          swapBtn.onclick = () => {
              shownSegment = outro;
              SoundManager.playClick();
              renderBauPanel();
          };
      }
  }

  // --- ASIDE: filtros por tipo ---
  //
  // A contagem é sobre os avisos do segmento, e NÃO é afetada pela busca: um
  // número que muda enquanto se digita não serve de panorama. A busca estreita
  // o que aparece no feed, não o que existe.
  function renderFiltersPanel() {
      const contagem = { critical: 0, info: 0, success: 0 };
      notices.forEach(n => { contagem[n.type] = (contagem[n.type] || 0) + 1; });

      const linha = (tipo, rotulo, n) => `
          <button class="cw-bc-filter" type="button" data-tipo="${tipo}"
                  aria-pressed="${activeType === tipo}">
              ${tipo === 'all' ? '' : `<span class="cw-bc-type-dot ${tipo}"></span>`}
              <span>${rotulo}</span>
              <span class="cw-bc-filter-count">${n}</span>
          </button>`;

      filtersPanel.innerHTML = `
          <div class="cw-bc-panel-title">${bt('filtersTitle')}</div>
          <div class="cw-bc-filters">
              ${linha('all', bt('filterAll'), notices.length)}
              ${Object.keys(contagem).map(t => linha(t, bt('typeLabel')[t], contagem[t])).join('')}
          </div>
      `;

      filtersPanel.querySelectorAll('.cw-bc-filter').forEach(btn => {
          btn.onclick = () => {
              const tipo = btn.dataset.tipo;
              // Clicar no filtro já ativo o desliga: sair de um filtro não deve
              // exigir achar o "Todos".
              activeType = (tipo === 'all' || tipo === activeType) ? null : tipo;
              SoundManager.playClick();
              renderFeed();
          };
      });

      // "Todos" fica marcado quando não há filtro nenhum.
      const todos = filtersPanel.querySelector('[data-tipo="all"]');
      if (todos) todos.setAttribute('aria-pressed', String(activeType === null));
  }

  // --- ASIDE: lidos ---
  //
  // O divisor de histórico morava dentro do feed, entre os cards. Aqui ele é
  // estado ("12 lidos") e um controle, que é o que sempre foi. O botão de
  // marcar tudo como lido veio do cabeçalho para junto dele, que é onde
  // pertence semanticamente.
  function renderReadPanel() {
      const readIds = readReadIds();
      const lidos = notices.filter(m => readIds.includes(m.id)).length;
      const naoLidos = notices.length - lidos;

      readPanel.innerHTML = `
          <div class="cw-bc-panel-title">${bt('readTitle')}</div>
          <button class="cw-bc-history-divider" type="button"
                  aria-expanded="${historyOpen}" aria-controls="cw-bc-history">
              <span>${bt('readCount')(lidos)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <button class="cw-bc-clear-btn" type="button" ${naoLidos ? '' : 'disabled'}>
              ${bt('markAllRead')}
          </button>
      `;

      readPanel.querySelector('.cw-bc-history-divider').onclick = () => {
          SoundManager.playClick();
          historyOpen = !historyOpen;
          renderFeed();
      };

      readPanel.querySelector('.cw-bc-clear-btn').onclick = () => {
          if (!naoLidos) return;
          SoundManager.playSuccess();
          writeReadIds(notices.map(m => m.id));
          renderFeed();
          updateBadge();
      };
  }

  let cardSeq = 0;

  function createCard(msg, isHistory) {
    const card = document.createElement("article");
    card.className = "cw-bc-card" + (isHistory ? " history" : "");

    const typeKey = TYPE_CONFIG[msg.type] ? msg.type : 'info';
    const titleId = `cw-bc-title-${++cardSeq}`;
    // O card é anunciado pelo próprio título, que é a informação que
    // identifica o aviso — sem isto, um leitor de tela lê "artigo" e nada mais.
    card.setAttribute('aria-labelledby', titleId);

    // Linha de contexto: tipo, data e a ação de dispensar. Uma linha só, em
    // texto normal — não um cabeçalho com borda própria.
    const meta = document.createElement("div");
    meta.className = "cw-bc-card-meta";
    meta.innerHTML = `
        <span class="cw-bc-type">
            <span class="cw-bc-type-dot ${typeKey}"></span>${bt('typeLabel')[typeKey]}
        </span>
        <span class="cw-bc-meta-sep" aria-hidden="true">·</span>
        <span class="cw-bc-date-tag">${formatFriendlyDate(msg.date)}</span>
    `;

    if (!isHistory) {
        const dismissBtn = document.createElement("button");
        dismissBtn.type = "button";
        dismissBtn.className = "cw-bc-dismiss-btn";
        // Botão só de ícone precisa dizer o que faz, e dizer o que ACONTECE
        // (marcar como lido) e não como parece (um check).
        dismissBtn.setAttribute('aria-label', bt('markRead')(msg.title));
        dismissBtn.title = bt('markReadShort');
        dismissBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
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
        meta.appendChild(dismissBtn);
    }

    const title = document.createElement("h3");
    title.className = "cw-bc-msg-title";
    title.id = titleId;
    title.textContent = msg.title;

    const text = document.createElement("div");
    text.className = "cw-bc-msg-body";
    text.innerHTML = parseMessageText(msg.text);

    const author = document.createElement("div");
    author.className = "cw-bc-msg-author";
    author.textContent = bt('publishedBy')(msg.author || bt('system'));

    card.append(meta, title, text, author);
    return card;
  }

  function matchesFilters(msg, term) {
      if (activeType && msg.type !== activeType) return false;
      if (!term) return true;
      const haystack = `${msg.title || ""} ${msg.text || ""}`.toLowerCase();
      return haystack.includes(term);
  }

  // O feed é só o FLUXO: não-lidos, e os lidos abaixo quando o aside pede.
  // O divisor, os filtros e a disponibilidade saíram daqui — eram estado
  // ocupando o lugar da lista.
  function renderMessageList(messages, readIds) {
      const naoLidos = messages.filter(m => !readIds.includes(m.id));
      const lidos = messages.filter(m => readIds.includes(m.id));

      if (!naoLidos.length && !(historyOpen && lidos.length)) {
          const filtrando = searchTerm.trim().length > 0 || activeType !== null;
          const empty = document.createElement("div");
          empty.className = "cw-bc-empty";
          empty.innerHTML = filtrando
              ? `<div>${bt('nothingFound')}</div>`
              : `
               <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
               <div>${bt('allRead')}</div>
              `;
          feed.appendChild(empty);
          return;
      }

      naoLidos.forEach(msg => feed.appendChild(createCard(msg, false)));

      if (historyOpen && lidos.length) {
          const historyContainer = document.createElement("div");
          historyContainer.className = "cw-bc-history-container";
          historyContainer.id = "cw-bc-history";
          historyContainer.style.display = "flex";
          lidos.forEach(msg => historyContainer.appendChild(createCard(msg, true)));
          feed.appendChild(historyContainer);
      }
  }

  function renderFeed() {
      renderBauPanel();
      renderFiltersPanel();
      renderReadPanel();

      feed.innerHTML = "";
      const readIds = readReadIds();
      const term = searchTerm.trim().toLowerCase();
      renderMessageList(notices.filter(m => matchesFilters(m, term)), readIds);
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
      searchInput.setAttribute('aria-label', bt('searchPlaceholder'));
      searchClear.setAttribute('aria-label', bt('clearSearch'));
      feed.setAttribute('aria-label', bt('headerTitle'));
      aside.setAttribute('aria-label', bt('asideLabel'));
      // O botão de marcar tudo como lido não está mais no cabeçalho: ele é
      // remontado pelo renderReadPanel() dentro do renderFeed() logo abaixo.
      renderFeed();
      renderSync({ online: true });
  });

  return { toggle: toggleVisibility, hasUnread };
}
