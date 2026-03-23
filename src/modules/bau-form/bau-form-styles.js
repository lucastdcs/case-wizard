// src/modules/bau-form/bau-form-styles.js

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
  surface: "rgba(255, 255, 255, 0.8)", // Glassmorphism base
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

export const TRANSITION = `all 0.2s ${EASE}`;

export const injectStyles = () => {
  if (document.getElementById('bau-form-global-styles')) return;
  const style = document.createElement('style');
  style.id = 'bau-form-global-styles';
  style.innerHTML = `
    .bau-popup {
      display: flex !important;
      flex-direction: column !important;
      width: 480px !important;
      max-height: 85vh !important;
      background: ${COLORS.surface} !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      border-radius: ${RADIUS.large} !important;
      box-shadow: ${SHADOW.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      overflow: hidden !important;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    .bau-content {
      padding: 24px;
      overflow-y: auto;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .bau-card {
      background: ${COLORS.white};
      border-radius: ${RADIUS.medium};
      padding: 16px;
      box-shadow: ${SHADOW.subtle};
      border: 1px solid ${COLORS.border};
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    .bau-header-banner {
      background: ${COLORS.yellowLight};
      color: #E37400;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: -16px -16px 16px -16px;
      border-bottom: 1px solid #FEF1D1;
    }

    .bau-title {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      color: ${COLORS.textPrimary};
    }

    .bau-subtitle {
      font-size: 13px;
      color: ${COLORS.textSecondary};
      margin: 4px 0 12px 0;
    }

    .bau-accordion-btn {
      background: #F8F9FA;
      border: 1px solid ${COLORS.border};
      border-radius: ${RADIUS.small};
      color: ${COLORS.textSecondary};
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: ${TRANSITION};
      width: fit-content;
    }
    .bau-accordion-btn:hover { background: ${COLORS.blueLight}; color: ${COLORS.blue}; border-color: ${COLORS.blue}; }

    .bau-fallback-card {
      background: #FFF4F2;
      border: 1px solid #FAD2CF;
    }

    .bau-label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      color: ${COLORS.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
    }

    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      padding: 12px 14px;
      border-radius: ${RADIUS.medium};
      border: 1.5px solid ${COLORS.border};
      background: ${COLORS.white};
      font-size: 14px;
      color: ${COLORS.textPrimary};
      transition: ${TRANSITION};
      box-sizing: border-box;
      outline: none;
    }
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus {
      border-color: ${COLORS.blue};
      box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
      background: ${COLORS.white};
    }

    .bau-chips-container {
      display: flex;
      gap: 10px;
      margin-bottom: 4px;
      flex-wrap: wrap;
    }

    .bau-chip {
      padding: 8px 18px;
      border-radius: ${RADIUS.pill};
      border: 1.5px solid ${COLORS.border};
      background: ${COLORS.white};
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: ${TRANSITION};
      display: flex;
      align-items: center;
      gap: 8px;
      user-select: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .bau-chip:hover {
      transform: translateY(-1.5px);
      background: ${COLORS.blueLight};
      border-color: ${COLORS.blue};
      box-shadow: 0 4px 8px rgba(26, 115, 232, 0.1);
    }
    .bau-chip:active { transform: scale(0.96); }
    .bau-chip.active {
      background: ${COLORS.blueLight};
      border-color: ${COLORS.blue};
      color: ${COLORS.blue};
      box-shadow: inset 0 1px 2px rgba(26, 115, 232, 0.1);
    }

    .bau-footer {
      padding: 20px 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-top: 1px solid ${COLORS.border};
      margin-top: auto;
      display: flex;
      justify-content: center;
    }

    .bau-btn-submit {
      width: 100%;
      padding: 16px;
      border-radius: ${RADIUS.pill};
      background: ${COLORS.blue};
      color: white;
      border: none;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: ${TRANSITION};
      box-shadow: 0 4px 14px rgba(26, 115, 232, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      letter-spacing: 0.3px;
    }
    .bau-btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 115, 232, 0.5);
      background: #1765CC;
    }
    .bau-btn-submit:active { transform: scale(0.97); }

    .bau-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 4px;
    }
  `;
  document.head.appendChild(style);
};
