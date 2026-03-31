// src/modules/shared/utils.js

import { SoundManager } from "./sound-manager.js";

// Exporta as cores para serem usadas em outros módulos
export const COLORS = {
  blue: "#1A73E8",
  red: "#D93025",
  yellow: "#F9AB00",
  green: "#1E8E3E",
  blueLight: "#E8F0FE",
  redLight: "#FCE8E6",
  yellowLight: "#FEF7E0",
  greenLight: "#E6F4EA",
  textPrimary: "#202124",
  textSecondary: "#5F6368",
  border: "#DADCE0",
  surface: "rgba(255, 255, 255, 0.8)",
  white: "#FFFFFF",
  glassBg: "rgba(255, 255, 255, 0.6)",
  glassBorder: "rgba(255, 255, 255, 0.7)",
};

export const LOGOS = {
  google: '', 
  gemini: '',
};

// ================================================================================================
// ANIMAÇÃO DE STARTUP
// ================================================================================================
export function playStartupAnimation() {
  const existingSherlock = document.getElementById("sherlock-animation-container");
  if (existingSherlock) {
    existingSherlock.remove();
  }

  const container = document.createElement("div");
  container.id = "sherlock-animation-container";

  const shadow = container.attachShadow({ mode: 'open' });

  shadow.innerHTML = `
        <style>
            :host {
                --sherlock-blue: #1A73E8;
                --sherlock-red: #D93025;
                --sherlock-yellow: #F9AB00;
                --sherlock-green: #1E8E3E;
                --sherlock-text: #202124;
            }
            .sherlock-container {
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 99999;
                display: flex;
                align-items: center;
                gap: 12px;
                background: white;
                padding: 10px 16px;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                transform: translateX(200%);
                animation: slideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards, slideOut 0.7s 3.3s cubic-bezier(0.7, 0, 0.84, 0) forwards;
                font-family: 'Google Sans', sans-serif;
                color: var(--sherlock-text);
                font-size: 14px;
                font-weight: 500;
            }
            .sherlock-icon {
                width: 24px;
                height: 24px;
                position: relative;
            }
            .sherlock-lens {
                position: absolute;
                width: 14px;
                height: 14px;
                border: 2.5px solid var(--sherlock-blue);
                border-radius: 50%;
                top: 0;
                left: 0;
            }
            .sherlock-handle {
                position: absolute;
                width: 3px;
                height: 10px;
                background: var(--sherlock-blue);
                bottom: 2px;
                right: 2px;
                transform: rotate(-45deg);
                border-radius: 2px;
            }
            .sherlock-dots {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 4px;
                transform-origin: center center;
            }
            .dot {
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                animation: dot-orbit 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            }
            .dot-1 { background: var(--sherlock-red); animation-delay: 0s; }
            .dot-2 { background: var(--sherlock-yellow); animation-delay: -0.3s; }
            .dot-3 { background: var(--sherlock-green); animation-delay: -0.6s; }
            .dot-4 { background: var(--sherlock-blue); animation-delay: -0.9s; }

            @keyframes slideIn {
                from { transform: translateX(200%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(200%); opacity: 0; }
            }
            @keyframes dot-orbit {
                0% { transform: rotate(0deg) translateX(12px) scale(1); }
                50% { transform: rotate(180deg) translateX(12px) scale(0.6); }
                100% { transform: rotate(360deg) translateX(12px) scale(1); }
            }
        </style>
        <div class="sherlock-container">
            <div class="sherlock-icon">
                <div class="sherlock-dots">
                    <div class="dot dot-1"></div>
                    <div class="dot dot-2"></div>
                    <div class="dot dot-3"></div>
                </div>
            </div>
            <span id="sherlock-text">Identificando agente...</span>
        </div>
    `;

  document.body.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 4000);
}


// ================================================================================================
// TOAST / NOTIFICAÇÕES
// ================================================================================================
export function showToast(message, options = {}) {
  const { duration = 3000, error = false, customIcon = '' } = options;

  const containerId = "cw-toast-container";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2147483647;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 90%;
          max-width: 500px;
          pointer-events: none;
      `;
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "cw-toast";
  toast.style.cssText = `
      font-family: 'Google Sans', sans-serif;
      padding: 12px 20px;
      background-color: ${error ? "rgba(217, 48, 37, 0.9)" : "rgba(32, 33, 36, 0.9)"};
      color: white;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: cw-toast-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
  `;

  let iconHTML = customIcon;
  if (!iconHTML) {
    iconHTML = error
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.5,22C11.64,22,11.77,22,11.9,21.96C12.55,21.82,13.09,21.38,13.21,20.73L13.96,17H10.04L10.79,20.73C10.91,21.38,11.45,21.82,12.1,21.96C12.23,22,12.36,22,12.5,22z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c0.69,0,1.36-0.08,2-0.22c-0.34-0.99-0.93-2.34-1.29-3.48c-0.19-0.6-0.04-1.28,0.4-1.71C13.56,16.14,14,15.6,14,14.5C14,13.12,13.3,12,12,12s-2,1.12-2,2.5c0,1.1,0.44,1.64,0.89,2.09c0.44,0.44,0.59,1.12,0.4,1.71c-0.36,1.14-0.95,2.49-1.29,3.48C10.08,21.92,9.41,22,8.71,22C5.56,22,3,19.43,3,16.29C3,14.03,4.24,12.1,6,11.18V9c0-3.31,2.69-6,6-6s6,2.69,6,6v2.18c1.76,1.02,3,2.85,3,5.11C21,19.43,18.44,22,15.29,22C14.59,22,13.92,21.92,13.28,21.78C13.08,20.67,12.5,19,12.5,19s-0.58,2.67-0.78,3.78C12.08,21.92,12.29,22,12.5,22z M12,8c-2.21,0-4,1.79-4,4v2h8v-2C16,9.79,14.21,8,12,8z"/></svg>`;
  }

  toast.innerHTML = iconHTML + `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "cw-toast-out 0.5s cubic-bezier(0.7, 0, 0.84, 0) forwards";
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 500);
  }, duration);

  return toast;
}

// = a FEA (Função de Escuta de Ação) que centraliza os cliques
export function createActionableChip(config) {
  const chip = document.createElement("button");
  chip.className = "cw-action-chip";
  chip.innerHTML = (config.icon || "") + `<span>${config.text}</span>`;
  chip.addEventListener("click", (e) => {
    e.stopPropagation();
    SoundManager.playClick();
    if (config.action) {
      config.action();
    }
  });
  return chip;
}


// ================================================================================================
// ESTILOS GLOBAIS
// ================================================================================================
export function initGlobalStylesAndFont() {
  const styleId = "cw-global-styles";
  if (document.getElementById(styleId)) return;

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap";
  document.head.appendChild(fontLink);

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
      /* Estilos para Toast e Animações */
      @keyframes cw-toast-in {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes cw-toast-out {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to { transform: translateY(20px) scale(0.95); opacity: 0; }
      }
      @keyframes cw-genie-effect-in {
        from { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
      @keyframes cw-genie-effect-out {
        from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        to { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
      }
      
      .cw-module-window {
        box-shadow: 0 16px 40px rgba(0,0,0,0.15);
        border: 1px solid rgba(0,0,0,0.05);
        opacity: 0;
        transform-origin: center bottom;
      }
      
      /* Botões */
      .cw-btn-primary {
        background: ${COLORS.blue};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(26,115,232,0.2);
      }
      .cw-btn-primary:hover {
        background: #1557b0;
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(26,115,232,0.3);
      }

      .cw-btn-secondary {
        background: transparent;
        border: 1px solid ${COLORS.border};
        color: ${COLORS.textSecondary};
        border-radius: 8px;
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .cw-btn-secondary:hover {
        background: rgba(0,0,0,0.05);
        color: ${COLORS.textPrimary};
        border-color: #5f6368;
      }
      
    .bau-input-group {
        display: flex;
        align-items: center;
        gap: 0;
        border: 1px solid #DADCE0;
        border-radius: 8px;
        background: #FFFFFF;
        transition: all 0.2s ease;
    }
    .bau-input-group:focus-within {
        border-color: #1A73E8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    }
    .bau-input-group input {
        border: none !important;
        box-shadow: none !important;
        flex: 1;
        background: transparent;
    }
    .bau-mini-btn-input {
        background: #F1F3F4;
        border: none;
        border-left: 1px solid #DADCE0;
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #5F6368;
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        transition: background 0.2s ease;
    }
    .bau-mini-btn-input:hover {
        background: #E8EAED;
        color: #202124;
    }

    .bau-mini-btn-input.cw-loading {
        pointer-events: none;
        animation: pulse 1.5s infinite;
    }
    .bau-mini-btn-input.cw-not-found {
        background-color: #FCE8E6;
        color: #D93025;
        cursor: not-allowed;
    }

      /* Animações e Efeitos */
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

      [data-tooltip] {
        position: relative;
        cursor: help;
      }
      [data-tooltip]::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #202124;
        color: #fff;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, visibility 0.2s ease;
        z-index: 1000;
      }
      [data-tooltip]:hover::after {
        opacity: 1;
        visibility: visible;
      }
  `;
  document.head.appendChild(style);
}
