// src/modules/call-script/call-script-assistant.js

import {
  stylePopup,
  styleResizeHandle,
  makeResizable,
  showToast,
  confirmDialog
} from "../shared/utils.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";

import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation, isModuleOpen } from "../shared/animations.js";
import { getPageData } from "../shared/page-data.js";

import { csaChecklistData, hydrateCallScriptFromContentCentral } from "./call-script-data.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";

const CSA_DICT = {
    pt: {
        headerTitle: "Call Script",
        headerDesc: "Guia interativo para condução de chamadas.",
        loading: "Carregando...",
        unknownClient: "Cliente Desconhecido",
        notFound: "Não encontrado",
        activeMonitoring: "Monitoramento Ativo",
        cidLabel: "CID (Conta)",
        emailLabel: "Email de Contato",
        copied: "Copiado!",
        amMessageTitle: "Mensagem AM",
        amMessageSub: "Gerar aviso de insucesso",
        copyFinalMessage: "Copiar Mensagem Final",
        resize: "Redimensionar",
        resetScript: "Resetar Script",
        resetConfirm: "Resetar todo o progresso do script? Essa ação não pode ser desfeita.",
        resetConfirmBtn: "Resetar",
        scriptNotConfigured: "Script não configurado.",
        messageCopiedToast: "Mensagem copiada!",
        amMessage: (data, today) =>
            `Olá. Bom dia!\n\n` +
            `Estou com um caso do seu cliente (${data.advertiserName || "Cliente"}) em andamento hoje (${today}). Fiz a primeira tentativa de contato agora há pouco, mas não tive sucesso.\n\n` +
            `Farei uma nova tentativa em alguns minutos. Caso ele não atenda novamente, seguirei com o e-mail padrão de reagendamento/no-show e te mantenho no radar.\n\n` +
            `Dados do caso para seu controle:\n\n` +
            `Cliente: ${data.advertiserName || "---"}\n` +
            `CID: ${data.cid || "---"}\n` +
            `Case ID: ${data.caseId || "---"}\n` +
            `E-mail: ${data.clientEmail || "---"}`,
        dateLocale: "pt-BR",
    },
    es: {
        headerTitle: "Call Script",
        headerDesc: "Guía interactiva para conducir llamadas.",
        loading: "Cargando...",
        unknownClient: "Cliente Desconocido",
        notFound: "No encontrado",
        activeMonitoring: "Monitoreo Activo",
        cidLabel: "CID (Cuenta)",
        emailLabel: "Email de Contacto",
        copied: "¡Copiado!",
        amMessageTitle: "Mensaje AM",
        amMessageSub: "Generar aviso de contacto fallido",
        copyFinalMessage: "Copiar Mensaje Final",
        resize: "Redimensionar",
        resetScript: "Reiniciar Script",
        resetConfirm: "¿Reiniciar todo el progreso del script? Esta acción no se puede deshacer.",
        resetConfirmBtn: "Reiniciar",
        scriptNotConfigured: "Script no configurado.",
        messageCopiedToast: "¡Mensaje copiado!",
        amMessage: (data, today) =>
            `Hola. ¡Buenos días!\n\n` +
            `Tengo un caso de su cliente (${data.advertiserName || "Cliente"}) en curso hoy (${today}). Hice el primer intento de contacto hace un momento, pero no tuve éxito.\n\n` +
            `Haré un nuevo intento en unos minutos. Si no responde nuevamente, seguiré con el correo estándar de reprogramación/no-show y lo mantendré informado.\n\n` +
            `Datos del caso para su control:\n\n` +
            `Cliente: ${data.advertiserName || "---"}\n` +
            `CID: ${data.cid || "---"}\n` +
            `Case ID: ${data.caseId || "---"}\n` +
            `E-mail: ${data.clientEmail || "---"}`,
        dateLocale: "es-ES",
    },
};
function csaLangKey() {
    return getLanguage() === 'es' ? 'ES' : 'PT';
}
function ct(key) {
    const lang = getLanguage();
    return CSA_DICT[lang]?.[key] ?? CSA_DICT.pt[key];
}

const COLORS = {
    bgApp: "#F5F5F7",
    bgSurface: "#FFFFFF",
    borderSubtle: "rgba(0, 0, 0, 0.07)",
    primary: "#007AFF",
    primaryBg: "rgba(0, 122, 255, 0.1)",
    textPrimary: "#1D1D1F",
    textSecondary: "#6E6E73",
    danger: "#D93025",
    dangerBg: "#FCE8E6",
    success: "#34A853",
    successBg: "#E6F4EA"
};

const GROUP_TITLES = {
    inicio: { PT: "Abertura", ES: "Apertura" },
    meio: { PT: "Implementação (Tag Support)", ES: "Implementación" },
    fim: { PT: "Fechamento", ES: "Cierre" }
};

// --- FOLHA DE ESTILOS DEDICADA ---
// Substitui os três mecanismos que coexistiam aqui antes: um objeto `styles`
// JS aplicado via Object.assign(el.style, ...), um <style> só de animações, e
// dezenas de style="..." hardcoded dentro do template do banner de contexto
// (que também vazavam cores/fonte do Google numa paleta que é deliberadamente
// Apple-inspired). Tudo consolidado numa única injeção, como no padrão
// adotado pela Minha Biblioteca.
function injectStyles() {
    if (document.getElementById('csa-styles-v2')) return;
    const style = document.createElement('style');
    style.id = 'csa-styles-v2';
    style.textContent = `
        #call-script-popup { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        /* --- BANNER DE CONTEXTO --- */
        .csa-context-banner {
            padding: 20px 20px 16px 20px;
            background: ${COLORS.bgSurface};
            border-bottom: 1px solid #F1F3F4;
            display: flex; flex-direction: column; gap: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            position: relative; z-index: 5;
        }
        .csa-ctx-top { display: flex; justify-content: space-between; align-items: center; }
        .csa-ctx-name-wrap { display: flex; align-items: center; gap: 10px; }
        .csa-ctx-name { font-size: 16px; font-weight: 500; color: ${COLORS.textPrimary}; }
        .csa-live-badge {
            font-size: 10px; font-weight: 700; color: ${COLORS.primary}; background: ${COLORS.primaryBg};
            padding: 2px 8px; border-radius: 4px; text-transform: uppercase;
        }
        .csa-live-dot {
            width: 8px; height: 8px; background: #10B981; border-radius: 50%;
            animation: csaPulseGreen 2s infinite;
        }
        @keyframes csaPulseGreen {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .csa-ctx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .csa-data-pill {
            background: #F8F9FA; border: 1px solid transparent; border-radius: 10px; padding: 8px 12px;
            cursor: pointer; position: relative; overflow: hidden;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .csa-data-pill:hover { background: ${COLORS.bgSurface}; border-color: #DADCE0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transform: translateY(-1px); }
        .csa-data-pill:active { transform: scale(0.98); }
        .csa-data-pill.copied { background: ${COLORS.successBg} !important; border-color: ${COLORS.success} !important; }
        .csa-pill-label { font-size: 9px; font-weight: 700; color: ${COLORS.textSecondary}; text-transform: uppercase; margin-bottom: 2px; letter-spacing: 0.5px; }
        .csa-data-value { font-size: 13px; color: ${COLORS.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .csa-data-value.mono { font-family: 'SF Mono', 'Roboto Mono', monospace; font-weight: 500; color: ${COLORS.primary}; }
        .csa-copy-hint {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #1E8E3E; font-weight: 700; text-transform: uppercase;
            opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .csa-data-pill.copied .csa-copy-hint { opacity: 1; }
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; }

        /* --- MENSAGEM AM (opções extras) --- */
        .csa-more-options { margin-top: 8px; }
        .csa-toggle-options-btn {
            width: 100%; background: transparent; border: none; padding: 4px 0;
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            color: #9AA0A6; transition: color 0.2s;
        }
        .csa-options-arrow { transition: transform 0.3s ease; }
        .csa-options-arrow.expanded { transform: rotate(180deg); }
        .csa-options-content {
            max-height: 0; overflow: hidden; opacity: 0; padding: 0 4px;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, margin-top 0.4s ease;
        }
        .csa-options-content.expanded { max-height: 400px; opacity: 1; margin-top: 8px; }

        .csa-am-card { padding: 12px; background: #F8F9FA; border: 1px solid #DADCE0; border-radius: 12px; margin-bottom: 8px; }
        .csa-am-btn {
            width: 100%; background: ${COLORS.bgSurface}; border: 1px solid #DADCE0; border-radius: 10px; padding: 10px;
            display: flex; align-items: center; gap: 12px; cursor: pointer; box-sizing: border-box;
            transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .csa-am-btn:hover { border-color: ${COLORS.primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .csa-am-icon { background: ${COLORS.primaryBg}; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .csa-am-btn-text { text-align: left; }
        .csa-am-btn-title { font-size: 11px; font-weight: 700; color: #3C4043; }
        .csa-am-btn-sub { font-size: 10px; color: ${COLORS.textSecondary}; }

        .csa-am-review-container { display: none; max-height: 0; opacity: 0; overflow: hidden; margin-top: 0; transition: all 0.3s ease; }
        .csa-am-review-container.visible { display: block; max-height: 300px; opacity: 1; margin-top: 12px; }
        .csa-am-message-area {
            width: 100%; height: 120px; border: 1px solid #DADCE0; border-radius: 8px; padding: 10px;
            font-family: inherit; font-size: 13px; color: #3C4043; outline: none; resize: none;
            box-sizing: border-box; background: ${COLORS.bgSurface}; line-height: 1.4;
        }
        .csa-am-copy-final {
            width: 100%; margin-top: 8px; padding: 10px; background: ${COLORS.primary}; color: white; border: none;
            border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s;
        }
        .csa-am-copy-final.copied-flash { background: ${COLORS.success}; }

        /* --- BARRA DE PROGRESSO --- */
        .csa-progress-container { height: 6px; background: ${COLORS.borderSubtle}; width: 100%; position: relative; overflow: hidden; }
        .csa-progress-fill {
            height: 100%; width: 0%; border-radius: 0 3px 3px 0;
            transition: width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            background: linear-gradient(90deg, ${COLORS.primary}, #00C6FF, ${COLORS.primary});
            background-size: 200% 100%;
            animation: csaShimmer 2s infinite linear;
        }
        .csa-progress-fill.complete { background: ${COLORS.success}; animation: none; }
        @keyframes csaShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

        /* --- SEGMENTED CONTROL (Tipo / Idioma) --- */
        .csa-content-area { padding: 16px; overflow-y: auto; flex-grow: 1; background: ${COLORS.bgApp}; scroll-behavior: smooth; }
        .csa-controls { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .csa-segmented-control { display: flex; background: #E3E3E8; padding: 2px; border-radius: 10px; gap: 2px; position: relative; margin-bottom: 16px; }
        .csa-segmented-control button {
            flex: 1; border: none; background: transparent; padding: 8px 4px; font-size: 12px; font-weight: 600;
            border-radius: 8px; cursor: pointer; transition: color 0.3s ease; color: ${COLORS.textSecondary};
            position: relative; z-index: 2;
        }
        .csa-segmented-control button.active { color: ${COLORS.textPrimary}; }
        .csa-segmented-indicator {
            position: absolute; top: 2px; left: 2px; bottom: 2px; background: ${COLORS.bgSurface};
            border-radius: 8px; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        /* --- CARDS DO CHECKLIST --- */
        .csa-card { background: ${COLORS.bgSurface}; border: 1px solid ${COLORS.borderSubtle}; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02); }
        .csa-card.done { box-shadow: inset 4px 0 0 ${COLORS.success}, 0 1px 3px rgba(0,0,0,0.05); }
        .csa-card-title { font-size: 11px; font-weight: 700; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; user-select: none; }
        .csa-card-counter { font-size: 11px; opacity: 0.7; font-weight: 500; background: #f1f3f4; padding: 2px 8px; border-radius: 10px; }
        .csa-card-counter.done { opacity: 1; color: #1e8e3e; background: ${COLORS.successBg}; }

        .csa-item-row { display: flex; align-items: flex-start; padding: 10px 8px; cursor: pointer; border-radius: 10px; transition: background 0.2s ease; color: ${COLORS.textPrimary}; font-size: 14px; line-height: 1.5; margin-bottom: 2px; }
        .csa-item-row:not(.completed):hover { background: rgba(0, 0, 0, 0.03); }
        .csa-item-row:not(.completed):hover .csa-checkbox { border-color: ${COLORS.primary}; }
        .csa-item-row.completed { background: rgba(0, 0, 0, 0.02); }

        .csa-checkbox {
            min-width: 20px; height: 20px; border-radius: 50%; border: 2px solid ${COLORS.borderSubtle};
            margin-right: 12px; margin-top: 1px; display: flex; align-items: center; justify-content: center;
            transition: border-color 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease;
            background: #fff;
        }
        .csa-checkbox.checked { background: ${COLORS.primary}; border-color: ${COLORS.primary}; }
        .csa-checkbox.pulse { transform: scale(1.15); }

        .csa-item-text { position: relative; display: inline-block; flex: 1; transition: color 0.3s ease; }
        .csa-item-text.completed { color: ${COLORS.textSecondary}; }
        .csa-item-text::after { content: ''; position: absolute; left: 0; top: 50%; width: 0; height: 1.5px; background: ${COLORS.textSecondary}; transition: width 0.3s ease; }
        .csa-item-text.completed::after { width: 100%; }

        .csa-empty-state { padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .csa-empty-state-icon { font-size: 24px; }

        /* --- FOOTER --- */
        .csa-footer { padding: 12px 16px; border-top: 1px solid #F1F3F4; background: ${COLORS.bgSurface}; display: flex; justify-content: space-between; align-items: center; }
        .csa-credit { font-size: 10px; color: #bdc1c6; }
        .csa-reset-btn {
            background: transparent; border: none; color: ${COLORS.danger}; font-size: 12px; font-weight: 600;
            cursor: pointer; padding: 6px 12px; border-radius: 20px; transition: background 0.2s ease, transform 0.15s ease;
            display: flex; align-items: center; gap: 4px;
        }
        .csa-reset-btn:hover { background: ${COLORS.dangerBg}; }
        .csa-reset-btn:active { transform: scale(0.9); }

        /* Duas animações infinite (dot "ao vivo" e shimmer da barra de
           progresso) rodando o tempo inteiro que o script fica aberto,
           sem nenhuma proteção de reduced-motion. */
        @media (prefers-reduced-motion: reduce) {
            .csa-live-dot { animation: none !important; }
            .csa-progress-fill { animation: none !important; }
            .csa-checkbox, .csa-checkbox.pulse, .cw-step-btn-hero,
            .csa-data-pill, .csa-segmented-indicator {
                transition: opacity 0.15s ease, background-color 0.15s ease, border-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

export function initCallScriptAssistant() {
  const CURRENT_VERSION = "v3.1.0";

  injectStyles();

  const csaCompletedTasks = {};
  let csaCurrentLang = csaLangKey();
  let csaCurrentType = "BAU";
  let csaVisible = false;

  const csaPopup = document.createElement("div");
  csaPopup.id = "call-script-popup";
  csaPopup.classList.add("cw-module-window");

  Object.assign(csaPopup.style, stylePopup, {
    right: "auto", left: "50%", width: "420px", height: "700px",
    display: "flex", flexDirection: "column", transform: "translateX(-50%) scale(0.05)",
  });

  const animRefs = { popup: csaPopup, googleLine: null };

  // --- LOGICA DE MONITORAMENTO ---
  let monitorInterval = null;

  function updateContextData() {
      if (!csaVisible) return;

      getPageData().then(data => {
          const elName = csaPopup.querySelector('#cw-ctx-name');
          const elCid = csaPopup.querySelector('#cw-ctx-cid');
          const elEmail = csaPopup.querySelector('#cw-ctx-email');

          if(elName) elName.textContent = data.advertiserName || ct('unknownClient');

          if(elCid) {
              const cidTxt = data.cid || "---";
              if (elCid.textContent !== cidTxt) elCid.textContent = cidTxt;
          }

          if(elEmail) {
              const emailTxt = data.clientEmail || ct('notFound');
              if (elEmail.textContent !== emailTxt) {
                  elEmail.textContent = emailTxt;
                  elEmail.title = emailTxt;
              }
          }
      });
  }

  function populateMessageArea() {
    getPageData().then(data => {
      const today = new Date().toLocaleDateString(ct('dateLocale'));
      const area = csaPopup.querySelector('#cw-am-message-area');
      const container = csaPopup.querySelector('#cw-am-review-container');

      let message = ct('amMessage')(data, today);

      if (area) area.value = message;
      if (container) {
          container.classList.add('visible');
          container.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }

  function toggleVisibility() {
    csaVisible = !isModuleOpen(csaPopup);
    toggleGenieAnimation(csaVisible, csaPopup, 'cw-btn-script');

    if (csaVisible) {
        lockBodyScroll();
        updateContextData();
        if (!monitorInterval) monitorInterval = setInterval(updateContextData, 2000);
    } else {
        unlockBodyScroll();
        if (monitorInterval) { clearInterval(monitorInterval); monitorInterval = null; }
    }
  }

  const csaHeader = createStandardHeader(
    csaPopup, ct('headerTitle'), CURRENT_VERSION, ct('headerDesc'),
    animRefs, () => { toggleVisibility(); }
  );
  csaPopup.appendChild(csaHeader);
  const csaHeaderTitleEl = csaHeader.querySelector('span');

  // === BANNER DE CONTEXTO ===
  const contextBanner = document.createElement("div");
  contextBanner.className = "csa-context-banner";

  contextBanner.innerHTML = `
      <div class="csa-ctx-top">
          <div class="csa-ctx-name-wrap">
              <div class="csa-live-dot js-csa-monitoring" title="${ct('activeMonitoring')}"></div>
              <span id="cw-ctx-name" class="csa-ctx-name">${ct('loading')}</span>
          </div>
          <div class="csa-live-badge">Live</div>
      </div>

      <div class="csa-ctx-grid">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div class="csa-pill-label js-csa-cid-label">${ct('cidLabel')}</div>
              <div id="cw-ctx-cid" class="csa-data-value mono">---</div>
              <div class="csa-copy-hint">${ct('copied')}</div>
          </div>

          <div class="csa-data-pill" id="cw-pill-email">
              <div class="csa-pill-label js-csa-email-label">${ct('emailLabel')}</div>
              <div id="cw-ctx-email" class="csa-data-value">---</div>
              <div class="csa-copy-hint">${ct('copied')}</div>
          </div>
      </div>

      <div class="csa-more-options">
          <button id="csa-toggle-options" class="csa-toggle-options-btn">
              <svg id="csa-options-arrow" class="csa-options-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>

          <div id="csa-options-content" class="csa-options-content">
              <div class="csa-am-card">
                  <button id="cw-pill-message" class="csa-am-btn">
                      <div class="csa-am-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${COLORS.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <div class="csa-am-btn-text">
                          <div class="csa-am-btn-title js-csa-am-title">${ct('amMessageTitle')}</div>
                          <div class="csa-am-btn-sub js-csa-am-sub">${ct('amMessageSub')}</div>
                      </div>
                  </button>

                  <div id="cw-am-review-container" class="csa-am-review-container">
                      <textarea id="cw-am-message-area" class="csa-am-message-area"></textarea>
                      <button id="cw-am-copy-final" class="csa-am-copy-final">${ct('copyFinalMessage')}</button>
                  </div>
              </div>
          </div>
      </div>
  `;

  const optionsBtn = contextBanner.querySelector('#csa-toggle-options');
  const optionsContent = contextBanner.querySelector('#csa-options-content');
  const optionsArrow = contextBanner.querySelector('#csa-options-arrow');

  let optionsExpanded = false;
  optionsBtn.onclick = () => {
      optionsExpanded = !optionsExpanded;
      optionsArrow.classList.toggle('expanded', optionsExpanded);
      optionsContent.classList.toggle('expanded', optionsExpanded);
      SoundManager.playClick();
  };

  const messageBtn = contextBanner.querySelector('#cw-pill-message');
  const finalCopyBtn = contextBanner.querySelector('#cw-am-copy-final');
  const messageArea = contextBanner.querySelector('#cw-am-message-area');

  messageBtn.addEventListener('click', () => {
    populateMessageArea();
  });

  finalCopyBtn.addEventListener('click', () => {
      if (messageArea.value) {
          navigator.clipboard.writeText(messageArea.value);
          showToast(ct('messageCopiedToast'));
          SoundManager.playSuccess();

          finalCopyBtn.classList.add('copied-flash');
          finalCopyBtn.textContent = ct('copied');
          setTimeout(() => {
              finalCopyBtn.classList.remove('copied-flash');
              finalCopyBtn.textContent = ct('copyFinalMessage');
          }, 2000);
      }
  });

  // Lógica de Cópia (Click to Copy)
  const setupCopy = (id, textId) => {
      const pill = contextBanner.querySelector(id);
      const textEl = contextBanner.querySelector(textId);

      pill.onclick = () => {
          const text = textEl.textContent;
          if (!text || text.includes("---") || text === ct('notFound')) return;

          navigator.clipboard.writeText(text);
          SoundManager.playSuccess();

          pill.classList.add("copied");
          setTimeout(() => pill.classList.remove("copied"), 1500);
      };
  };

  csaPopup.appendChild(contextBanner);

  // 2. PROGRESS BAR
  const progressContainer = document.createElement("div");
  progressContainer.className = "csa-progress-container";
  const progressFill = document.createElement("div");
  progressFill.className = "csa-progress-fill";
  progressContainer.appendChild(progressFill);
  csaPopup.appendChild(progressContainer);

  // 3. CONTEÚDO
  const csaContent = document.createElement("div");
  csaContent.id = "csa-content";
  csaContent.className = "csa-content-area";
  csaPopup.appendChild(csaContent);

  // 4. FOOTER
  const footer = document.createElement("div");
  footer.className = "csa-footer";
  const credit = document.createElement("span");
  credit.className = "csa-credit";
  credit.textContent = "by lucaste@";

  const resetBtn = document.createElement("button");
  resetBtn.className = "csa-reset-btn";
  resetBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> <span class="js-csa-reset-label">${ct('resetScript')}</span>`;
  resetBtn.onclick = async () => {
    const confirmed = await confirmDialog(ct('resetConfirm'), { danger: true, confirmText: ct('resetConfirmBtn') });
    if (!confirmed) return;
    for (let key in csaCompletedTasks) delete csaCompletedTasks[key];
    csaBuildChecklist();
  };

  footer.appendChild(credit);
  footer.appendChild(resetBtn);
  csaPopup.appendChild(footer);

  // 5. CONTROLES (SEGMENTED TABS)
  const csaControlsDiv = document.createElement("div");
  csaControlsDiv.className = "csa-controls";

  // Type Selector (BAU/LT)
  const typeControl = document.createElement("div");
  typeControl.className = "csa-segmented-control";
  typeControl.innerHTML = `
      <div class="csa-segmented-indicator" id="type-indicator" style="width: calc(50% - 2px); transform: translateX(0px);"></div>
      <button class="active" data-type="BAU">BAU</button>
      <button data-type="LT">LT</button>
  `;

  csaControlsDiv.appendChild(typeControl);
  csaContent.appendChild(csaControlsDiv);

  // Type Interaction
  const typeButtons = typeControl.querySelectorAll('button');
  const typeIndicator = typeControl.querySelector('#type-indicator');
  typeButtons.forEach((btn, idx) => {
      btn.onclick = () => {
          typeButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          typeIndicator.style.transform = `translateX(${idx * (typeControl.offsetWidth / 2 - 2)}px)`;
          csaCurrentType = btn.dataset.type;
          SoundManager.playClick();
          csaBuildChecklist();
      };
  });

  // O idioma do script (PT/ES) segue o idioma global da interface, trocado
  // em Configurações — não tem mais seletor próprio aqui.
  onLanguageChange(() => {
      csaCurrentLang = csaLangKey();
      if (csaHeaderTitleEl) csaHeaderTitleEl.textContent = ct('headerTitle');
      const helpTitleEl = csaPopup.querySelector('.cw-help-title');
      if (helpTitleEl) helpTitleEl.textContent = ct('headerTitle');
      const helpDescEl = csaPopup.querySelector('.cw-help-description');
      if (helpDescEl) helpDescEl.textContent = ct('headerDesc');
      const monitoringDot = contextBanner.querySelector('.js-csa-monitoring');
      if (monitoringDot) monitoringDot.title = ct('activeMonitoring');
      const cidLabel = contextBanner.querySelector('.js-csa-cid-label');
      if (cidLabel) cidLabel.textContent = ct('cidLabel');
      const emailLabel = contextBanner.querySelector('.js-csa-email-label');
      if (emailLabel) emailLabel.textContent = ct('emailLabel');
      contextBanner.querySelectorAll('.csa-copy-hint').forEach(el => el.textContent = ct('copied'));
      const amTitle = contextBanner.querySelector('.js-csa-am-title');
      if (amTitle) amTitle.textContent = ct('amMessageTitle');
      const amSub = contextBanner.querySelector('.js-csa-am-sub');
      if (amSub) amSub.textContent = ct('amMessageSub');
      if (finalCopyBtn) finalCopyBtn.textContent = ct('copyFinalMessage');
      const resetLabel = resetBtn.querySelector('.js-csa-reset-label');
      if (resetLabel) resetLabel.textContent = ct('resetScript');
      csaBuildChecklist();
  });

  const csaChecklistArea = document.createElement("div");
  csaChecklistArea.id = "csa-checklist-area";
  csaContent.appendChild(csaChecklistArea);

  const resizeHandle = document.createElement('div');
  Object.assign(resizeHandle.style, styleResizeHandle);
  resizeHandle.className = "no-drag"; resizeHandle.title = ct('resize');
  csaPopup.appendChild(resizeHandle);
  makeResizable(csaPopup, resizeHandle);

  document.body.appendChild(csaPopup);

  // --- ATIVAÇÃO DOS CLICKS DE CÓPIA ---
  setupCopy('#cw-pill-cid', '#cw-ctx-cid');
  setupCopy('#cw-pill-email', '#cw-ctx-email');

  // Converte quebras de linha do texto-fonte (usadas em itens com sub-listas,
  // ex: "ES LT" inicio) em <br>, já que \n dentro de innerHTML é ignorado pelo HTML.
  function formatScriptText(text) {
      return text.replace(/\n/g, '<br>');
  }

  function createChecklistItemRow(combinedKey, groupKey, itemText, index) {
    const key = `${combinedKey}-${groupKey}-${index}`;
    const isDone = !!csaCompletedTasks[key];

    const row = document.createElement("div");
    row.className = "csa-item-row" + (isDone ? " completed" : "");

    const chk = document.createElement("div");
    chk.className = "csa-checkbox" + (isDone ? " checked" : "");
    chk.innerHTML = isDone
        ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : "";

    const textSpan = document.createElement("span");
    textSpan.className = "csa-item-text" + (isDone ? " completed" : "");
    textSpan.innerHTML = formatScriptText(itemText);

    row.onclick = () => {
      const newState = !csaCompletedTasks[key];
      csaCompletedTasks[key] = newState;
      SoundManager.playClick();

      row.classList.toggle("completed", newState);
      textSpan.classList.toggle("completed", newState);
      chk.classList.toggle("checked", newState);
      chk.innerHTML = newState
          ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
          : "";

      if (newState) {
          chk.classList.add("pulse");
          setTimeout(() => chk.classList.remove("pulse"), 150);
      }

      updateProgressAndCounters(combinedKey, csaChecklistData[combinedKey]);
    };

    row.appendChild(chk);
    row.appendChild(textSpan);
    return { row, isDone };
  }

  function createChecklistCard(combinedKey, groupKey, items) {
    const card = document.createElement("div");
    card.className = "csa-card";

    const cardTitle = document.createElement("div");
    cardTitle.className = "csa-card-title";
    cardTitle.textContent = GROUP_TITLES[groupKey][csaCurrentLang] || "";

    const counter = document.createElement("span");
    counter.className = "csa-card-counter";
    cardTitle.appendChild(counter);
    card.appendChild(cardTitle);

    let groupDoneCount = 0;
    items.forEach((itemText, index) => {
      const { row, isDone } = createChecklistItemRow(combinedKey, groupKey, itemText, index);
      if (isDone) groupDoneCount++;
      card.appendChild(row);
    });

    const allDone = groupDoneCount === items.length && items.length > 0;
    card.classList.toggle("done", allDone);
    counter.classList.toggle("done", allDone);
    counter.textContent = `${groupDoneCount}/${items.length}`;

    return card;
  }

  function csaBuildChecklist() {
    csaChecklistArea.innerHTML = "";
    const combinedKey = `${csaCurrentLang} ${csaCurrentType}`;
    const data = csaChecklistData[combinedKey];

    if (!data) {
      csaChecklistArea.innerHTML = `<div class="csa-empty-state"><div class="csa-empty-state-icon">☕</div><div>${ct('scriptNotConfigured')}</div></div>`;
      progressFill.style.width = "0%";
      return;
    }

    let totalItems = 0; let completedItems = 0;
    ["inicio", "meio", "fim"].forEach(k => { if (data[k]) totalItems += data[k].length; });

    ["inicio", "meio", "fim"].forEach(groupKey => {
      const items = data[groupKey];
      if (!items || items.length === 0) return;

      items.forEach((_, index) => {
        const key = `${combinedKey}-${groupKey}-${index}`;
        if (csaCompletedTasks[key]) completedItems++;
      });

      csaChecklistArea.appendChild(createChecklistCard(combinedKey, groupKey, items));
    });

    updateProgressUI(totalItems, completedItems);
  }

  function updateProgressAndCounters(combinedKey, data) {
    let total = 0; let completed = 0;
    ["inicio", "meio", "fim"].forEach(groupKey => {
      const items = data[groupKey] || [];
      total += items.length;
      items.forEach((_, idx) => { if (csaCompletedTasks[`${combinedKey}-${groupKey}-${idx}`]) completed++; });
    });
    updateProgressUI(total, completed);
    setTimeout(() => csaBuildChecklist(), 200);
  }

  function updateProgressUI(total, completed) {
    const pct = total === 0 ? 0 : (completed / total) * 100;
    progressFill.style.width = `${pct}%`;
    progressFill.classList.toggle("complete", pct === 100);
  }

  csaBuildChecklist();

  // Busca o roteiro publicado na Central de Conteúdo e repinta quando chegar.
  // Não bloqueia: a tela já subiu com o roteiro embutido, então API fora do ar
  // deixa tudo exatamente como era antes.
  hydrateCallScriptFromContentCentral(() => csaBuildChecklist());

  return toggleVisibility;
}
