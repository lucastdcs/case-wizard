
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
.bau-popup { width: 650px !important; max-width: 95vw; background-color: #f8f9fa; display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
.bau-view-container { flex: 1; position: relative; min-height: 400px; overflow-y: auto; }
.bau-view { display: none; flex-direction: column; height: 100%; padding: 24px; animation: bauFadeIn 0.3s ease; }
.bau-view.active { display: flex; }
@keyframes bauFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.bau-dashboard-content { flex: 1; }
.bau-case-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.bau-case-card { background: #ffffff; border: 1px solid #dadce0; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
.bau-case-info { display: flex; flex-direction: column; gap: 4px; }
.bau-case-title { margin: 0; font-size: 15px; font-weight: 500; color: #202124; }
.bau-case-details { margin: 0; font-size: 12px; color: #5f6368; }
.bau-case-status-badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; background: #f1f3f4; color: #5f6368; }
.bau-dashboard-fab { position: absolute; bottom: 24px; right: 24px; background: #1a73e8; color: #ffffff; border: none; border-radius: 100px; padding: 12px 20px; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(26,115,232,0.3); }
.bau-view-header { margin-bottom: 20px; }
.bau-back-btn { background: transparent; border: none; color: #5f6368; font-size: 14px; display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 4px 0; }
.bau-progress-indicator { display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; }
.bau-progress-indicator::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: #dadce0; z-index: 1; transform: translateY(-50%); }
.bau-progress-step { width: 28px; height: 28px; border-radius: 50%; background: #ffffff; border: 2px solid #dadce0; color: #5f6368; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; position: relative; z-index: 2; }
.bau-progress-step.active { border-color: #1a73e8; background: #1a73e8; color: #ffffff; }
.bau-progress-step.completed { border-color: #1a73e8; color: #1a73e8; }
.bau-step { display: none; }
.bau-step.active { display: block; animation: bauFadeIn 0.3s; }
.bau-card { background: #ffffff; border: 1px solid #dadce0; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
.bau-context-card { background: #202124; color: #ffffff; border: none; }
.bau-label { display: block; font-size: 13px; font-weight: 500; color: #202124; margin-bottom: 8px; }
.bau-select, .bau-textarea, .bau-input { width: 100%; padding: 10px 12px; border: 1px solid #dadce0; border-radius: 4px; font-size: 14px; box-sizing: border-box; }
.bau-inline-input { background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.3); color: #ffffff; }
.bau-tasks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.bau-task-item { display: flex; align-items: center; padding: 10px 12px; border: 1px solid #dadce0; border-radius: 4px; cursor: pointer; font-size: 13px; }
.bau-task-item input { display: none; }
.bau-task-item.active { border-color: #1a73e8; background: #e8f0fe; color: #1557b0; font-weight: 500; }
.bau-confirm-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f1f3f4; font-size: 13px; }
.bau-confirm-label { width: 100px; color: #5f6368; font-weight: 500; }
.bau-confirm-value { flex: 1; color: #202124; }
.bau-footer { display: flex; justify-content: flex-end; gap: 12px; padding-top: 16px; border-top: 1px solid #dadce0; margin-top: 16px; }
.bau-btn-primary, .bau-btn-submit { background: #1a73e8; color: #ffffff; border: none; border-radius: 4px; padding: 10px 24px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.bau-btn-secondary { background: #ffffff; color: #5f6368; border: 1px solid #dadce0; border-radius: 4px; padding: 10px 24px; font-size: 14px; font-weight: 500; cursor: pointer; }
.bau-success-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 40px 20px; }
.bau-success-icon .material-icons { font-size: 64px; color: #1e8e3e; margin-bottom: 16px; }
`;
  document.head.appendChild(style);
};
