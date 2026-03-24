
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
    /* --- FONT IMPORT --- */
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    /* --- KEYFRAMES --- */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* --- BASE & UTILITIES --- */
    .bau-popup {
      display: flex !important; flex-direction: column !important;
      width: 650px !important; /* LARGURA AUMENTADA */
      max-width: 90vw !important;
      max-height: 85vh !important;
      background: ${COLORS.surface} !important;
      backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important;
      border-radius: ${RADIUS.large} !important; box-shadow: ${SHADOW.deep} !important;
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      overflow: hidden !important; position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%); z-index: 10000;
      font-family: 'Google Sans', Roboto, sans-serif;
    }

    /* --- VIEW MANAGEMENT --- */
    .bau-view {
      display: none;
      flex-direction: column;
      flex-grow: 1;
      animation: fadeIn 0.4s ${EASE};
    }
    .bau-view.active {
      display: flex;
    }

    /* --- VIEW: DASHBOARD --- */
    .bau-dashboard-content {
      padding: 24px 32px;
      overflow-y: auto;
      flex-grow: 1;
    }
    .bau-case-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .bau-case-card {
      display: flex;
      align-items: center;
      padding: 16px;
      background: ${COLORS.white};
      border-radius: ${RADIUS.medium};
      border: 1px solid ${COLORS.border};
      transition: ${TRANSITION};
      cursor: pointer;
    }
    .bau-case-card:hover {
      border-color: ${COLORS.blue};
      box-shadow: ${SHADOW.subtle};
      transform: translateY(-2px);
    }
    .bau-case-info {
      flex-grow: 1;
    }
    .bau-case-title {
      font-size: 15px;
      font-weight: 700;
      color: ${COLORS.textPrimary};
      margin: 0 0 4px 0;
    }
    .bau-case-details {
      font-size: 13px;
      color: ${COLORS.textSecondary};
    }
    .bau-case-status-badge {
      padding: 4px 10px;
      border-radius: ${RADIUS.pill};
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .bau-case-status-badge[data-status="Pendente"] { background-color: ${COLORS.yellowLight}; color: #A56700; }
    .bau-case-status-badge[data-status="Criado"] { background-color: ${COLORS.greenLight}; color: ${COLORS.green}; }
    .bau-case-status-badge[data-status="Cancelado"] { background-color: ${COLORS.redLight}; color: ${COLORS.red}; }

    .bau-dashboard-fab {
      position: absolute;
      bottom: 24px;
      right: 32px;
      background-color: ${COLORS.blue};
      color: ${COLORS.white};
      border: none;
      border-radius: ${RADIUS.pill};
      padding: 12px 24px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
      transition: ${TRANSITION};
    }
    .bau-dashboard-fab:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
    }

    /* --- VIEW: SUCCESS SCREEN --- */
    .bau-success-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      padding: 32px;
      text-align: center;
    }
    .bau-success-icon .material-icons {
      font-size: 72px;
      color: ${COLORS.green};
    }
    .bau-success-title {
      font-size: 22px;
      font-weight: 700;
      color: ${COLORS.textPrimary};
      margin: 16px 0 8px 0;
    }
    .bau-success-message {
      font-size: 15px;
      color: ${COLORS.textSecondary};
      margin-bottom: 24px;
    }

    /* --- REUSABLE COMPONENTS (MODIFIED/NEW) --- */
    .bau-view-header {
      display: flex;
      align-items: center;
      padding: 12px 24px;
      border-bottom: 1px solid ${COLORS.border};
      background: #F8F9FA;
    }
    .bau-back-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      color: ${COLORS.textSecondary};
      font-size: 14px;
      font-weight: 600;
    }
    .bau-back-btn:hover {
      color: ${COLORS.textPrimary};
    }

    /* --- FORM STYLES (UNCHANGED/EXISTING) --- */
    .bau-content { padding: 32px; overflow-y: auto; flex-grow: 1; }
    .bau-step { display: none; animation: fadeIn 0.5s ${EASE}; opacity: 0; }
    .bau-step.active { display: block; opacity: 1; }
    .bau-card { background: ${COLORS.white}; border-radius: ${RADIUS.medium}; padding: 24px; border: 1px solid ${COLORS.border}; margin-bottom: 24px; }
    /* ... [Rest of the existing styles for form elements, buttons, etc.] ... */
    .bau-progress-indicator { display: flex; justify-content: space-around; padding: 20px 32px; border-bottom: 1px solid ${COLORS.border}; background: rgba(248, 249, 250, 0.7); }
    .bau-progress-step { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background-color: #F1F3F4; color: ${COLORS.textSecondary}; font-weight: 700; font-size: 14px; border: 2px solid #F1F3F4; transition: ${TRANSITION}; position: relative; }
    .bau-progress-step.active { background-color: ${COLORS.blueLight}; color: ${COLORS.blue}; border-color: ${COLORS.blue}; transform: scale(1.1); }
    .bau-progress-step.completed { background-color: ${COLORS.greenLight}; color: ${COLORS.green}; border-color: ${COLORS.green}; }
    .bau-footer { display: flex; justify-content: flex-end; padding: 24px 32px; gap: 12px; border-top: 1px solid ${COLORS.border}; background: #F8F9FA; }
    .bau-btn-primary, .bau-btn-secondary, .bau-btn-submit { padding: 12px 24px; border-radius: ${RADIUS.pill}; font-size: 14px; font-weight: 600; cursor: pointer; transition: ${TRANSITION}; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; outline: none; }
    .bau-btn-primary { background-color: ${COLORS.blue}; color: #fff; box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2); }
    .bau-btn-primary:hover { background-color: #1765cc; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(26, 115, 232, 0.3); }
    .bau-btn-secondary { background-color: transparent; color: ${COLORS.textSecondary}; border: 1px solid ${COLORS.border}; }
    .bau-btn-secondary:hover { background-color: #E8EAED; color: ${COLORS.textPrimary}; }
    .bau-btn-submit { background-color: ${COLORS.green}; color: #fff; box-shadow: 0 4px 12px rgba(30, 142, 62, 0.2); }
    .bau-btn-submit:hover { background-color: #1a7d36; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(30, 142, 62, 0.3); }
    .bau-label { display: block; font-size: 13px; font-weight: 700; color: ${COLORS.textSecondary}; margin-bottom: 8px; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
    .bau-input, .bau-select, .bau-textarea { width: 100%; padding: 12px 16px; border-radius: ${RADIUS.medium}; border: 1.5px solid ${COLORS.border}; background-color: #F8F9FA; font-size: 14px; color: ${COLORS.textPrimary}; transition: ${TRANSITION}; box-sizing: border-box; outline: none; font-family: inherit; }
    .bau-input:focus, .bau-select:focus, .bau-textarea:focus { border-color: ${COLORS.blue}; background-color: #fff; box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.1); }
    .bau-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; padding-right: 40px; cursor: pointer; }
    .bau-tasks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
    .bau-task-item { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #F8F9FA; border: 1px solid ${COLORS.border}; border-radius: ${RADIUS.medium}; cursor: pointer; transition: all 0.2s ${EASE}; }
    .bau-task-item:hover { background: #fff; border-color: ${COLORS.blue}; }
    .bau-task-item.active { background: ${COLORS.blueLight}; border-color: ${COLORS.blue}; color: ${COLORS.blue}; }
    .bau-task-item input { display: none; }
    .bau-task-item span { font-size: 13px; font-weight: 600; }
    .bau-confirm-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    .bau-confirm-label { color: ${COLORS.textSecondary}; font-weight: 600; }
    .bau-confirm-value { color: ${COLORS.textPrimary}; font-weight: 700; text-align: right; max-width: 60%; }
    .bau-availability-container { display: flex; flex-direction: column; gap: 12px; margin-top: 4px; }
    .bau-availability-hint { margin-top: 16px; padding: 12px; font-size: 12px; font-weight: 500; color: ${COLORS.textSecondary}; background-color: #F8F9FA; border-radius: ${RADIUS.medium}; line-height: 1.6; }
  `;
  document.head.appendChild(style);
};
