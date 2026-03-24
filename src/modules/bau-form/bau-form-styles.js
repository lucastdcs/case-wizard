
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
    /* --- FONT IMPORT (REQUISITO) --- */
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    /* --- KEYFRAMES --- */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bauFadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* --- BASE & POPUP (REQUISITO DE LARGURA) --- */
    .bau-popup {
      display: flex !important;
      flex-direction: column !important;
      width: 650px !important; /* LARGURA AUMENTADA */
      max-width: 90vw !important;
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

    /* --- GERENCIAMENTO DE VIEWS (REQUISITO) --- */
    .bau-view-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: hidden; /* Garante que o conteúdo não vaze */
    }
    .bau-view {
        display: none;
        flex-direction: column;
        height: 100%;
    }
    .bau-view.active {
        display: flex;
        animation: bauFadeIn 0.3s ease;
    }

    /* --- VIEW 1: DASHBOARD (REQUISITO) --- */
    .bau-dashboard-content {
      padding: 16px 32px 80px 32px; /* Padding inferior para não sobrepor o FAB */
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
      margin-right: 16px;
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
      margin: 0;
    }
    .bau-case-status-badge {
      padding: 5px 12px;
      border-radius: ${RADIUS.pill};
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    /* Status Badges (REQUISITO) */
    .bau-case-status-badge[data-status="Pendente"] { background-color: ${COLORS.yellowLight}; color: #A56700; }
    .bau-case-status-badge[data-status="Criado"] { background-color: ${COLORS.greenLight}; color: ${COLORS.green}; }
    .bau-case-status-badge[data-status="Cancelado"] { background-color: ${COLORS.redLight}; color: ${COLORS.red}; }
    .bau-case-status-badge[data-status="Descartado"] { background-color: ${COLORS.redLight}; color: ${COLORS.red}; }

    .bau-dashboard-fab {
      position: absolute;
      bottom: 24px;
      right: 32px;
      background-color: ${COLORS.blue};
      color: ${COLORS.white};
      border: none;
      border-radius: ${RADIUS.pill};
      height: 48px;
      padding: 0 24px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
      transition: ${TRANSITION};
      z-index: 10;
    }
    .bau-dashboard-fab:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
    }
    .bau-dashboard-fab .material-icons {
      font-size: 20px;
    }

    /* --- VIEW 2: FORM (REQUISITO) --- */
    .bau-view-header {
      display: flex;
      align-items: center;
      padding: 12px 24px;
      border-bottom: 1px solid ${COLORS.border};
      background: rgba(248, 249, 250, 0.9);
      flex-shrink: 0;
    }
    .bau-back-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${COLORS.textSecondary};
      font-size: 14px;
      font-weight: 600;
      padding: 8px;
      margin-left: -8px;
      border-radius: ${RADIUS.pill};
      transition: ${TRANSITION};
    }
    .bau-back-btn:hover {
      background-color: rgba(0,0,0,0.05);
      color: ${COLORS.textPrimary};
    }
    .bau-back-btn .material-icons {
      font-size: 20px;
    }
    
    .bau-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-y: auto;
    }
    .bau-content form {
      padding: 0 32px;
    }
    
    /* --- VIEW 3: SUCESSO (REQUISITO) --- */
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
      font-size: 64px;
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
      margin-bottom: 32px;
      max-width: 400px;
    }

    /* --- ESTILOS DO FORMULÁRIO (adaptados) --- */
    .bau-progress-indicator { padding: 20px 32px; border-bottom: 1px solid ${COLORS.border}; background: rgba(248, 249, 250, 0.7); }
    .bau-step { display: none; animation: fadeIn 0.4s ${EASE}; }
    .bau-step.active { display: block; }
    .bau-card { background: ${COLORS.white}; border-radius: ${RADIUS.medium}; padding: 24px; border: 1px solid ${COLORS.border}; margin: 24px 0; }
    .bau-context-card { background: linear-gradient(135deg, #0d47a1, #1565c0); color: white; margin-top: 24px; }
    .bau-inline-input { color: white; border-bottom-color: rgba(255,255,255,0.4); }
    .bau-inline-input::placeholder { color: rgba(255,255,255,0.5); }
    .bau-inline-input:focus { border-bottom-color: white; }
    .bau-mini-btn { font-size: 10px; color: #fff; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); }
    .bau-mini-btn .material-icons { font-size: 14px; vertical-align: middle; }
    .bau-footer { padding: 24px 32px; border-top: 1px solid ${COLORS.border}; background: #F8F9FA; }
    
    /* Demais estilos (label, input, select, etc) permanecem os mesmos */
    .bau-label{display:block;font-size:13px;font-weight:700;color:${COLORS.textSecondary};margin-bottom:8px;margin-top:20px;text-transform:uppercase;letter-spacing:.5px}.bau-input,.bau-select,.bau-textarea{width:100%;padding:12px 16px;border-radius:${RADIUS.medium};border:1.5px solid ${COLORS.border};background-color:#F8F9FA;font-size:14px;color:${COLORS.textPrimary};transition:${TRANSITION};box-sizing:border-box;outline:none;font-family:inherit}.bau-input:focus,.bau-select:focus,.bau-textarea:focus{border-color:${COLORS.blue};background-color:#fff;box-shadow:0 0 0 4px rgba(26,115,232,.1)}.bau-select{-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:16px;padding-right:40px;cursor:pointer}.bau-tasks-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.bau-task-item{display:flex;align-items:center;gap:10px;padding:12px 16px;background:#F8F9FA;border:1px solid ${COLORS.border};border-radius:${RADIUS.medium};cursor:pointer;transition:all .2s ${EASE}}.bau-task-item:hover{background:#fff;border-color:${COLORS.blue}}.bau-task-item.active{background:${COLORS.blueLight};border-color:${COLORS.blue};color:${COLORS.blue}}.bau-task-item input{display:none}.bau-task-item span{font-size:13px;font-weight:600}.bau-confirm-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px}.bau-confirm-label{color:${COLORS.textSecondary};font-weight:600}.bau-confirm-value{color:${COLORS.textPrimary};font-weight:700;text-align:right;max-width:60%}.bau-availability-container{display:flex;flex-direction:column;gap:12px;margin-top:4px}.bau-availability-hint{margin-top:16px;padding:12px;font-size:12px;font-weight:500;color:${COLORS.textSecondary};background-color:#F8F9FA;border-radius:${RADIUS.medium};line-height:1.6}.bau-footer{display:flex;justify-content:flex-end;gap:12px}.bau-btn-primary,.bau-btn-secondary,.bau-btn-submit{padding:12px 24px;border-radius:${RADIUS.pill};font-size:14px;font-weight:600;cursor:pointer;transition:${TRANSITION};border:none;display:flex;align-items:center;justify-content:center;gap:8px;outline:none}.bau-btn-primary{background-color:${COLORS.blue};color:#fff;box-shadow:0 4px 12px rgba(26,115,232,.2)}.bau-btn-primary:hover{background-color:#1765cc;transform:translateY(-1px);box-shadow:0 6px 16px rgba(26,115,232,.3)}.bau-btn-secondary{background-color:transparent;color:${COLORS.textSecondary};border:1px solid ${COLORS.border}}.bau-btn-secondary:hover{background-color:#E8EAED;color:${COLORS.textPrimary}}.bau-btn-submit{background-color:${COLORS.green};color:#fff;box-shadow:0 4px 12px rgba(30,142,62,.2)}.bau-btn-submit:hover{background-color:#1a7d36;transform:translateY(-1px);box-shadow:0 6px 16px rgba(30,142,62,.3)}
  `;
  document.head.appendChild(style);
};
