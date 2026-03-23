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
      width: 480px;
      max-height: 85vh;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
    }

    .bau-card {
      background: ${COLORS.white};
      border-radius: ${RADIUS.medium};
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: ${SHADOW.subtle};
      border: 1px solid ${COLORS.border};
    }

    .bau-header-banner {
      background: ${COLORS.yellowLight};
      color: #E37400; /* Darker orange for contrast */
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
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
      margin: 4px 0 0 0;
    }

    .bau-accordion-btn {
      background: transparent;
      border: none;
      color: ${COLORS.textSecondary};
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      padding: 8px 0;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: ${TRANSITION};
    }
    .bau-accordion-btn:hover { color: ${COLORS.blue}; }

    .bau-fallback-card {
      background: #FFF4F2; /* Very light red/orange */
      border: 1px solid #FAD2CF;
    }

    .bau-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: ${COLORS.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .bau-input, .bau-select, .bau-textarea {
      width: 100%;
      padding: 12px 16px;
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
      box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
    }

    .bau-chips-container {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .bau-chip {
      padding: 8px 16px;
      border-radius: ${RADIUS.pill};
      border: 1.5px solid ${COLORS.border};
      background: ${COLORS.white};
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: ${TRANSITION};
      display: flex;
      align-items: center;
      gap: 6px;
      user-select: none;
    }
    .bau-chip:hover {
      transform: translateY(-1px);
      background: ${COLORS.blueLight};
      border-color: ${COLORS.blue};
    }
    .bau-chip:active {
      transform: scale(0.97);
    }
    .bau-chip.active {
      background: ${COLORS.blueLight};
      border-color: ${COLORS.blue};
      color: ${COLORS.blue};
    }

    .bau-footer {
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(5px);
      border-top: 1px solid ${COLORS.border};
      position: sticky;
      bottom: 0;
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
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: ${TRANSITION};
      box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .bau-btn-submit:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
      background: #1765CC;
    }
    .bau-btn-submit:active {
      transform: scale(0.97);
    }
  `;
  document.head.appendChild(style);
};
