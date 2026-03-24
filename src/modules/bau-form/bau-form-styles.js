
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
        background: linear-gradient(120deg, #13547a, #80d0c7, #2a6c8b, #5ED5D8);
        background-size: 400% 400%;
        animation: gemini-gradient 15s ease infinite;
    }
    .bau-context-card .bau-title, .bau-context-card .bau-subtitle, .bau-context-card b {
        color: #fff !important;
        text-shadow: 0 1px 3px rgba(0,0,0,0.2);
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
    .bau-label { /* ... sem alterações ... */ }
    .bau-input, .bau-select, .bau-textarea { /* ... sem alterações ... */ }
    .bau-select { /* ... sem alterações ... */ }
    .bau-chips-container { /* ... sem alterações ... */ }
    .bau-chip { /* ... sem alterações ... */ }

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
    .bau-footer { /* ... sem alterações ... */ }
    .bau-btn-primary, .bau-btn-secondary, .bau-btn-submit { /* ... sem alterações ... */ }
    .bau-btn-secondary { /* ... sem alterações ... */ }
    .bau-btn-primary { /* ... sem alterações ... */ }
    .bau-btn-submit { /* ... sem alterações ... */ }

    /* --- GRIDS --- */
    .bau-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  `;
  document.head.appendChild(style);
}; 
