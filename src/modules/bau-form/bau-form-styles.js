
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
    /* --- KEYFRAMES PARA ANIMAÇÃO --- */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes gemini-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* --- BASE & UTILITIES --- */
    .input-error {
      border-color: ${COLORS.red} !important;
      box-shadow: 0 0 0 3px rgba(217, 48, 37, 0.15) !important;
    }

    .bau-popup {
      display: flex !important; flex-direction: column !important;
      width: 520px !important; max-height: 85vh !important;
      background: ${COLORS.surface} !important;
      backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important;
      border-radius: ${RADIUS.large} !important; box-shadow: ${SHADOW.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      overflow: hidden !important; position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%); z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    /* --- PROGRESS INDICATOR --- */
    .bau-progress-indicator { /* ... sem alterações ... */
      display: flex; justify-content: space-around; padding: 20px 32px;
      border-bottom: 1px solid ${COLORS.border};
      background: rgba(248, 249, 250, 0.7);
    }
    .bau-progress-step {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%;
      background-color: #F1F3F4; color: ${COLORS.textSecondary};
      font-weight: 700; font-size: 14px; border: 2px solid #F1F3F4;
      transition: ${TRANSITION}; position: relative;
    }
    .bau-progress-step.active { background-color: ${COLORS.blueLight}; color: ${COLORS.blue}; border-color: ${COLORS.blue}; transform: scale(1.1); }
    .bau-progress-step.completed { background-color: ${COLORS.greenLight}; color: ${COLORS.green}; border-color: ${COLORS.green}; }
    
    /* --- CONTENT & STEPS --- */
    .bau-content { padding: 32px; overflow-y: auto; flex-grow: 1; }
    .bau-step { display: none; animation: fadeIn 0.5s ${EASE}; }
    .bau-step.active { display: block; }

    .bau-card {
      background: ${COLORS.white}; border-radius: ${RADIUS.medium};
      padding: 24px; border: 1px solid ${COLORS.border};
      margin-bottom: 24px;
    }

    /* --- CARD DE CONTEXTO (NOVO ESTILO GEMINI) --- */
    .bau-context-card {
        color: #fff;
        border: none;
        background: linear-gradient(135deg, #0d47a1, #1976d2, #1565c0, #1a237e);
        background-size: 400% 400%;
        animation: gemini-gradient 10s ease infinite;
        box-shadow: 0 10px 30px rgba(13, 71, 161, 0.2);
    }
    .bau-context-card .bau-title {
        color: #fff !important;
        font-weight: 800 !important;
        font-size: 20px !important;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .bau-context-card .bau-subtitle, .bau-context-card b {
        color: #fff !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
     .bau-context-card #bau-all-data {
        color: #E0F5F5 !important;
        border-top-color: rgba(255, 255, 255, 0.3) !important;
    }
    .bau-context-card .bau-header-banner {
        color: #fff; 
        background: transparent !important;
        border-bottom: none !important;
        margin-bottom: 8px;
        padding: 0;
        font-weight: 700;
    }

    /* --- CARD DE FALLBACK (ESTILO SUAVIZADO) --- */
    .bau-fallback-card {
        background-color: ${COLORS.yellowLight};
        border: 1.5px dashed #FBC02D; /* Borda tracejada para diferenciar */
        padding: 16px;
    }
    .bau-fallback-header {
        color: #BF360C; /* Tom de laranja mais escuro para o texto */
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    /* --- FORM ELEMENTS --- */
    .bau-label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      color: ${COLORS.textSecondary};
      margin-bottom: 8px;
      margin-top: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: ${RADIUS.medium};
      border: 1.5px solid ${COLORS.border};
      background-color: #F8F9FA;
      font-size: 14px;
      color: ${COLORS.textPrimary};
      transition: ${TRANSITION};
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
    }
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: ${COLORS.blue};
      background-color: #fff;
      box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.1);
    }
    .bau-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 40px;
      cursor: pointer;
    }
    .bau-chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .bau-chip {
      padding: 8px 16px;
      border-radius: ${RADIUS.pill};
      background-color: ${COLORS.blueLight};
      color: ${COLORS.blue};
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: ${TRANSITION};
      border: 1px solid transparent;
    }
    .bau-chip:hover {
      background-color: #d2e3fc;
    }
    .bau-chip.active {
      background-color: ${COLORS.blue};
      color: #fff;
    }

    /* --- SEÇÃO DE DISPONIBILIDADE (NOVO LAYOUT) --- */
    .bau-availability-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 4px;
    }
    .bau-availability-hint {
        margin-top: 16px;
        padding: 12px;
        font-size: 12px;
        font-weight: 500;
        color: ${COLORS.textSecondary};
        background-color: #F8F9FA;
        border-radius: ${RADIUS.medium};
        line-height: 1.6;
    }

    /* --- FOOTER & NAVIGATION BUTTONS --- */
    .bau-footer {
      display: flex;
      justify-content: flex-end;
      padding: 24px 32px;
      gap: 12px;
      border-top: 1px solid ${COLORS.border};
      background: #F8F9FA;
    }
    .bau-btn-primary, .bau-btn-secondary, .bau-btn-submit {
      padding: 12px 24px;
      border-radius: ${RADIUS.pill};
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: ${TRANSITION};
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
    }
    .bau-btn-primary {
      background-color: ${COLORS.blue};
      color: #fff;
      box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);
    }
    .bau-btn-primary:hover {
      background-color: #1765cc;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(26, 115, 232, 0.3);
    }
    .bau-btn-primary:active {
      transform: translateY(0);
    }
    .bau-btn-secondary {
      background-color: transparent;
      color: ${COLORS.textSecondary};
      border: 1px solid ${COLORS.border};
    }
    .bau-btn-secondary:hover {
      background-color: #E8EAED;
      color: ${COLORS.textPrimary};
    }
    .bau-btn-submit {
      background-color: ${COLORS.green};
      color: #fff;
      box-shadow: 0 4px 12px rgba(30, 142, 62, 0.2);
    }
    .bau-btn-submit:hover {
      background-color: #1a7d36;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(30, 142, 62, 0.3);
    }
    .bau-btn-submit:active {
      transform: translateY(0);
    }

    /* --- GRIDS --- */
    .bau-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  `;
  document.head.appendChild(style);
}; 
