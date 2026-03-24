
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
  style.innerHTML = `
    /* --- BASE & UTILITIES --- */
    .input-error {
      border-color: ${COLORS.red} !important;
      box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.15) !important;
    }

    .bau-popup {
      display: flex !important;
      flex-direction: column !important;
      width: 520px !important; /* Aumentado para melhor espaçamento */
      max-height: 85vh !important;
      background: ${COLORS.surface} !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border-radius: ${RADIUS.large} !important;
      box-shadow: ${SHADOW.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      overflow: hidden !important;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    /* --- PROGRESS INDICATOR --- */
    .bau-progress-indicator {
      display: flex;
      justify-content: space-around;
      padding: 20px 32px;
      border-bottom: 1px solid ${COLORS.border};
      background: rgba(248, 249, 250, 0.7);
    }

    .bau-progress-step {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #F1F3F4;
      color: ${COLORS.textSecondary};
      font-weight: 700;
      font-size: 14px;
      border: 2px solid #F1F3F4;
      transition: ${TRANSITION};
      position: relative;
    }
    
    .bau-progress-step.active {
      background-color: ${COLORS.blueLight};
      color: ${COLORS.blue};
      border-color: ${COLORS.blue};
      transform: scale(1.1);
    }

    .bau-progress-step.completed {
      background-color: ${COLORS.greenLight};
      color: ${COLORS.green};
      border-color: ${COLORS.green};
    }
    
    /* --- CONTENT & STEPS --- */
    .bau-content {
      padding: 32px;
      overflow-y: auto;
      flex-grow: 1;
    }

    .bau-step {
        display: none;
        animation: fadeIn 0.5s ${EASE};
    }

    .bau-step.active {
        display: block;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .bau-card {
      background: ${COLORS.white};
      border-radius: ${RADIUS.medium};
      padding: 24px;
      box-shadow: none; /* Sombra removida para um look mais flat dentro do wizard */
      border: 1px solid ${COLORS.border};
      margin-bottom: 24px;
    }

    /* --- FORM ELEMENTS (sem grandes mudanças, apenas ajustes finos) --- */

    .bau-header-banner {
      background: ${COLORS.yellowLight};
      color: #E37400;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: -24px -24px 24px -24px;
      border-bottom: 1px solid #FEF1D1;
      border-radius: ${RADIUS.medium} ${RADIUS.medium} 0 0;
    }

    .bau-title { font-size: 18px; font-weight: 700; margin: 0; color: ${COLORS.textPrimary}; }
    .bau-subtitle { font-size: 13px; color: ${COLORS.textSecondary}; margin: 4px 0 12px 0; }

    .bau-accordion-btn {
      background: #F8F9FA; border: 1px solid ${COLORS.border}; border-radius: ${RADIUS.small};
      color: ${COLORS.textSecondary}; font-size: 12px; font-weight: 600; cursor: pointer;
      padding: 8px 12px; transition: ${TRANSITION}; width: fit-content;
    }
    .bau-accordion-btn:hover { background: #F1F3F4; }

    .bau-fallback-card { background: #FFF4F2; border: 1px solid #FAD2CF; }

    .bau-label {
      display: block; font-size: 11px; font-weight: 700; color: ${COLORS.textSecondary};
      text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;
    }

    .bau-input, .bau-select, .bau-textarea {
      width: 100%; padding: 12px 14px; border-radius: ${RADIUS.medium}; border: 1.5px solid ${COLORS.border};
      background: #F8F9FA; font-size: 14px; color: ${COLORS.textPrimary}; transition: ${TRANSITION};
      box-sizing: border-box; outline: none;
    }
    
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: ${COLORS.blue}; box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15); background: ${COLORS.white};
    }
    
    .bau-select {
      appearance: none; -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 16px center; padding-right: 44px !important;
    }

    .bau-chips-container { display: flex; gap: 10px; margin-bottom: 4px; flex-wrap: wrap; }
    .bau-chip {
      padding: 8px 18px; border-radius: ${RADIUS.pill}; border: 1.5px solid ${COLORS.border}; background: ${COLORS.white};
      font-size: 13px; font-weight: 600; cursor: pointer; transition: ${TRANSITION}; user-select: none;
    }
    .bau-chip:hover { transform: translateY(-1px); border-color: #C2C3C4; box-shadow: ${SHADOW.subtle}; }
    .bau-chip.active {
      background: ${COLORS.blueLight}; border-color: ${COLORS.blue}; color: ${COLORS.blue};
      box-shadow: none; transform: none;
    }

    /* --- FOOTER & NAVIGATION BUTTONS --- */
    .bau-footer {
      padding: 16px 32px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      border-top: 1px solid ${COLORS.border};
      display: flex;
      justify-content: space-between; /* Alinhado para separar botões */
      align-items: center;
    }

    .bau-btn-primary, .bau-btn-secondary, .bau-btn-submit {
      padding: 12px 24px;
      border-radius: ${RADIUS.pill};
      border: none;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: ${TRANSITION};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .bau-btn-secondary {
        background-color: #F1F3F4;
        color: ${COLORS.textPrimary};
        border: 1px solid ${COLORS.border};
    }
    .bau-btn-secondary:hover { background-color: #E8EAED; border-color: #C2C3C4; }

    .bau-btn-primary {
        background-color: ${COLORS.blue};
        color: white;
    }
    .bau-btn-primary:hover { background-color: #1765CC; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(26, 115, 232, 0.2); }

    .bau-btn-submit {
        background-color: ${COLORS.green};
        color: white;
        flex-grow: 1; /* Ocupa o espaço no final */
    }
    .bau-btn-submit:hover { background-color: #1A7F37; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(24, 127, 55, 0.2); }

    .bau-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .bau-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

  `;
  document.head.appendChild(style);
};
