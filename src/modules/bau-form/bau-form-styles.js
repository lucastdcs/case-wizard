
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
  white: "#FFFFFF"
};

export const RADIUS = {
  small: "8px",
  medium: "12px",
  large: "16px",
  pill: "100px"
};

export const SHADOW = {
  deep: "0 12px 40px rgba(0,0,0,0.12)",
  subtle: "0 4px 12px rgba(0,0,0,0.05)"
};

export const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
export const TRANSITION = `all 0.3s ${EASE}`;

export const injectStyles = () => {
  if (document.getElementById('bau-form-global-styles')) return;

  const style = document.createElement('style');
  style.id = 'bau-form-global-styles';
  style.textContent = `
    /* --- 1. POSICIONAMENTO E ANCORAGEM --- */
    .bau-popup {
      width: 650px;
      max-width: 95vw;
      max-height: 90vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      
      background: #ffffff;
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      
      /* Herda a animação de entrada padrão */
      transform-origin: center center;
      animation: cw-genie-effect-in 0.4s ${EASE};
      transition: all 0.3s ease;
    }

    .bau-view-container {
      flex: 1;
      position: relative;
      min-height: 400px;
      overflow: hidden;
    }

    .bau-view {
      display: none;
      flex-direction: column;
      height: 100%;
      padding: 24px;
      animation: bauFadeIn 0.3s ease;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .bau-view.active { display: flex; }
    @keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    /* --- 2. FEEDBACK TÁTIL E MICRO-INTERAÇÕES --- */

    .bau-select, .bau-textarea, .bau-input, .bau-task-item, .bau-btn-primary, .bau-btn-secondary, .bau-back-btn {
      transition: all 0.2s ease;
    }
    
    .bau-select:focus, .bau-textarea:focus, .bau-input:focus {
      border-color: #1a73e8;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
      outline: none;
    }

    .bau-task-item {
      cursor: pointer;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 12px;
      border: 1px solid transparent;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s ease;
    }
    .bau-task-item:hover {
      background-color: #f1f3f4;
      transform: translateY(-1px);
    }
    .bau-task-item.active {
      border-color: #1a73e8;
      background: #e8f0fe;
      color: #1a73e8;
      font-weight: 600;
    }

    .bau-btn-primary:active, .bau-btn-submit:active, .bau-btn-secondary:active {
        transform: scale(0.98);
        filter: brightness(0.95);
    }

    .bau-btn-primary:disabled, .bau-btn-submit:disabled, .bau-btn-secondary:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        background-color: #f1f3f4;
        color: #9aa0a6;
        border-color: #dadce0;
    }


    /* --- 3. ESTILOS GERAIS E CLASSES ADICIONAIS --- */
    
    .bau-dashboard-content {
      flex: 1;
      overflow-y: auto;
      margin: -24px;
      padding: 24px;
      padding-bottom: 100px;

      scrollbar-width: thin;
      scrollbar-color: #DADCE0 transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar {
      width: 8px;
    }
    .bau-dashboard-content::-webkit-scrollbar-track {
      background: transparent;
    }
    .bau-dashboard-content::-webkit-scrollbar-thumb {
      background-color: #DADCE0;
      border-radius: 4px;
      border: 2px solid #ffffff;
    }
    .bau-dashboard-content::-webkit-scrollbar-thumb:hover {
      background-color: #bdc1c6;
    }

    .bau-dashboard-metrics {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    .bau-metric-card {
      flex: 1;
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .bau-metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #1a73e8;
    }
    .bau-metric-label {
      font-size: 11px;
      font-weight: 600;
      color: #5f6368;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .bau-case-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }

    /* GEMINI AURA - CASE CARDS */
    .bau-case-card {
      background: linear-gradient(90deg,
        rgba(66, 133, 244, 0.05) 0%,
        rgba(161, 75, 255, 0.05) 50%,
        rgba(244, 180, 0, 0.05) 100%);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      cursor: default;
    }

    /* Aura Status Overrides */
    .bau-case-card.status-yellow-aura { background: linear-gradient(90deg, rgba(255, 252, 240, 0.8) 0%, rgba(255, 247, 224, 0.8) 100%); border-color: rgba(249, 171, 0, 0.15); }
    .bau-case-card.status-green-aura { background: linear-gradient(90deg, rgba(246, 251, 247, 0.8) 0%, rgba(230, 244, 234, 0.8) 100%); border-color: rgba(30, 142, 62, 0.15); }
    .bau-case-card.status-red-aura { background: linear-gradient(90deg, rgba(254, 247, 246, 0.8) 0%, rgba(252, 232, 230, 0.8) 100%); border-color: rgba(217, 48, 37, 0.15); }

    .bau-case-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.06);
      border-color: rgba(26, 115, 232, 0.4);
      background: linear-gradient(90deg,
        rgba(66, 133, 244, 0.1) 0%,
        rgba(161, 75, 255, 0.1) 50%,
        rgba(244, 180, 0, 0.1) 100%);
    }

    .bau-case-card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.6), transparent);
      transform: translateX(-100%);
      transition: transform 0.8s ease;
      pointer-events: none;
    }
    .bau-case-card:hover::after {
      transform: translateX(100%);
    }

    .bau-case-main { display: flex; align-items: flex-start; gap: 12px; }
    .bau-case-icon { color: #5f6368; margin-top: 2px; }
    .bau-case-info { display: flex; flex-direction: column; gap: 4px; }
    .bau-case-header { display: flex; align-items: baseline; gap: 8px; }
    .bau-case-title { margin: 0; font-size: 15px; font-weight: 600; color: #202124; }
    .bau-case-date { font-size: 11px; color: #9aa0a6; }
    .bau-case-details { margin: 0; font-size: 12px; color: #5f6368; }

    .bau-case-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 100px;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      position: relative;
      z-index: 2;
    }
    .bau-case-status-badge.status-yellow { background: #fff1c1; color: #724c00; }
    .bau-case-status-badge.status-green { background: #ceead6; color: #0d652d; }
    .bau-case-status-badge.status-red { background: #fad2cf; color: #a50e0e; }
    .bau-case-status-badge.status-gray { background: #e8eaed; color: #3c4043; }

    .bau-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #9aa0a6;
    }
    .bau-empty-state svg { margin-bottom: 16px; opacity: 0.5; }
    .bau-empty-title { font-size: 16px; font-weight: 600; color: #5f6368; margin: 0 0 4px 0; }
    .bau-empty-subtitle { font-size: 13px; margin: 0; }

    /* STICKY FAB - NOVO CASO */
    .bau-dashboard-fab {
      position: absolute;
      bottom: 24px;
      right: 24px;
      background: #1a73e8;
      color: #ffffff;
      border: none;
      border-radius: 100px;
      padding: 14px 24px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 6px 16px rgba(26,115,232,0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 10;
    }
    .bau-dashboard-fab:hover {
      background: #1557b0;
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(26,115,232,0.5);
    }
    .bau-dashboard-fab:active { transform: scale(0.98); }

    .bau-view-header { margin-bottom: 20px; }
    .bau-back-btn { background: transparent; border: none; color: #5f6368; font-size: 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
    .bau-back-btn:hover { color: #202124; }

    .bau-progress-indicator { display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; }
    .bau-progress-indicator::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #dadce0; z-index: 1; transform: translateY(-50%); }
    .bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #ffffff; border: 2px solid #dadce0; color: #5f6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; position: relative; z-index: 2; transition: all 0.3s ease; }
    .bau-progress-step.active { border-color: #1a73e8; background: #1a73e8; color: #ffffff; }
    .bau-progress-step.completed { border-color: #1e8e3e; background: #1e8e3e; color: #ffffff; }

    .bau-step { display: none; }
    .bau-step.active { display: block; animation: bauFadeIn 0.3s; }
    .bau-card { background: #ffffff; border: 1px solid #dadce0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .bau-context-card {
      background: linear-gradient(135deg, #0d47a1 0%, #1a237e 100%);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 20px;
    }

    .bau-context-card .bau-label {
        color: #e8f0fe;
    }

    .bau-highlight-panel {
        background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(240, 247, 255, 0.9) 40%,
            rgba(248, 240, 255, 0.85) 100%);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.6);
        padding: 20px;
        border-radius: 16px;
        margin-bottom: 24px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px 32px;
        position: relative;
        overflow: hidden;
        box-shadow:
            0 10px 40px rgba(26, 115, 232, 0.08),
            0 0 20px rgba(161, 75, 255, 0.05),
            inset 0 0 0 1px rgba(255, 255, 255, 0.3);
    }
    .bau-highlight-panel::before {
        content: '';
        position: absolute;
        top: -25%;
        left: -25%;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle at center,
            rgba(66, 133, 244, 0.15) 0%,
            rgba(161, 75, 255, 0.1) 30%,
            transparent 70%);
        pointer-events: none;
        z-index: 0;
        animation: geminiPulse 12s infinite linear;
    }
    @keyframes geminiPulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.1); }
    }
    .bau-highlight-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;
        z-index: 1;
    }
    .bau-highlight-label {
        font-size: 10px;
        font-weight: 800;
        color: #70757a;
        text-transform: uppercase;
        letter-spacing: 0.8px;
    }
    .bau-highlight-value {
        font-size: 14px;
        font-weight: 800;
        color: #1a202c;
        word-break: break-all;
        letter-spacing: -0.2px;
    }

    .bau-dynamic-inputs-container {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 20px;
    }

    .bau-dynamic-input {
      animation: bauFadeIn 0.3s ease;
    }
    
    .bau-label { display: block; font-size: 13px; font-weight: 600; color: #202124; margin-top: 24px; margin-bottom: 8px; }
    .bau-label:first-of-type { margin-top: 0; }

    .bau-select, .bau-textarea, .bau-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #dadce0;
      border-radius: 8px;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #fff;
      transition: all 0.2s ease;
      color: #202124;
    }
    .bau-textarea { min-height: 120px; resize: vertical; }
    

    .bau-tasks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .bau-task-item input { display: none; }
    
    .bau-confirm-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f1f3f4; font-size: 13px; }
    .bau-confirm-row:last-child { border-bottom: none; }
    .bau-confirm-label { width: 120px; color: #5f6368; font-weight: 500; flex-shrink: 0; }
    .bau-confirm-value { flex: 1; color: #202124; }

    .bau-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 24px; margin-top: 24px; border-top: 1px solid #dadce0; }
    
    .bau-btn-primary {
      background: #1a73e8;
      color: #ffffff;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    }
    .bau-btn-submit {
      width: 100%;
      background-color: #1a73e8;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 12px rgba(26,115,232,0.3);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 24px;
      padding: 14px 32px;
      cursor: pointer;
    }
    .bau-btn-submit:hover {
      background-color: #1557b0;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(26,115,232,0.4);
    }
    .bau-btn-submit:active {
      transform: translateY(0);
    }
    .bau-btn-secondary {
      background: #ffffff;
      color: #5f6368;
      border: 1px solid #dadce0;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .bau-btn-secondary:hover { background-color: #f8f9fa; border-color: #cdd1d5; }

    .bau-success-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 40px 20px; }
    .bau-success-icon { color: #1e8e3e; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; }

    .bau-mt-md { margin-top: 20px; }
    .bau-mt-lg { margin-top: 24px; }
    .bau-relative { position: relative; }

    .bau-title { font-size: 20px; font-weight: 700; width: 100%; }

    .bau-input-group {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .bau-mini-btn-input {
      background: #f1f3f4;
      border: 1px solid #dadce0;
      border-radius: 8px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #5f6368;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .bau-mini-btn-input:hover {
      background: #e8eaed;
      color: #202124;
      border-color: #bdc1c6;
    }

    .bau-step-title { margin-top: 0; color: #1a73e8; font-size: 16px; margin-bottom: 20px; font-weight: 600; }
    .bau-error-text { color: #d93025; font-weight: 500; }
    .bau-confirm-divider { margin: 15px 0; border-bottom: 1px solid rgba(0,0,0,0.1); }

    .bau-context-badges-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .bau-context-badge {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(4px);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 11px;
      display: flex;
      gap: 6px;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s ease;
    }
    .bau-context-badge:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
    .bau-badge-label {
      font-weight: 700;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .bau-badge-value {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }

    .bau-availability-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .bau-availability-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .bau-field-hint {
      font-size: 11px;
      font-weight: 600;
      color: #5f6368;
      margin-left: 4px;
    }
    .bau-input[type="datetime-local"] {
      padding: 12px;
      border-radius: 8px;
      font-family: inherit;
      cursor: pointer;
      background-color: #ffffff;
    }

    /* REFRESH BTN ACTIONS */
    .bau-refresh-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      color: #bdc1c6;
      transition: all 0.2s ease;
    }
    .bau-refresh-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }
    .bau-refresh-btn.spinning svg {
      animation: cw-spin 1s linear infinite;
    }
    @keyframes cw-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
};
