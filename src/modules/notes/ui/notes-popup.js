// src/modules/notes/ui/notes-popup.js
import { stylePopup, styleCredit, styleResizeHandle, makeResizable } from "../../shared/utils.js";
import { createStandardHeader } from "../../shared/header-factory.js";
export function createNotesPopup(version, onToggleVisibility) {
    const popup = document.createElement("div"); popup.id = "notes-assistant-popup"; popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { right: "100px", width: "480px", height: "700px", display: "flex", flexDirection: "column", transition: "width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)" });
    const animRefs = { popup, googleLine: null }; const header = createStandardHeader(popup, "Case Notes", version, "Gera notas padronizadas.", animRefs, onToggleVisibility);
    popup.appendChild(header); const content = document.createElement("div"); content.className = "cw-popup-content";
    Object.assign(content.style, { padding: "0 16px 16px 16px", overflowY: "auto", flexGrow: "1", display: "flex", flexDirection: "column", gap: "16px" });
    popup.appendChild(content);

    // Credit element - assigned to a variable for easier positioning
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit);
    credit.style.marginTop = "auto"; // Push to bottom in flex container
    popup.appendChild(credit);

    const resizeHandle = document.createElement('div'); Object.assign(resizeHandle.style, styleResizeHandle); resizeHandle.className = "no-drag"; popup.appendChild(resizeHandle); makeResizable(popup, resizeHandle);
    injectStyles(); return { popup, content, header, animRefs, credit };
}
function injectStyles() {
    if (document.getElementById('cw-notes-refactor-styles')) return;
    const style = document.createElement('style'); style.id = 'cw-notes-refactor-styles';
    style.innerHTML = `
        .cw-popup-content::-webkit-scrollbar { width: 6px; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; }
        .cw-input, .cw-textarea, .cw-select { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #dadce0; font-size: 14px; font-family: 'Google Sans', Roboto, sans-serif; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; background: #fff; }
        .cw-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; padding-right: 40px !important; }
        .cw-input:focus, .cw-textarea:focus, .cw-select:focus { border-color: #1a73e8; outline: none; box-shadow: 0 0 0 2px rgba(26,115,232,0.1); }
        .cw-textarea { min-height: 80px; resize: vertical; }
        .cw-section-title { font-size: 12px; font-weight: 700; color: #5f6368; text-transform: uppercase; letter-spacing: 0.8px; margin: 16px 0 8px 0; }
        .cw-scenario-module { border: 1px solid #eee; border-radius: 12px; padding: 12px; background: #f8f9fa; }
        .cw-scenario-tabs { display: flex; gap: 4px; margin-bottom: 12px; background: #eee; padding: 4px; border-radius: 8px; }
        .cw-tab { flex: 1; text-align: center; padding: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border-radius: 6px; color: #5f6368; transition: all 0.2s; }
        .cw-tab.active { background: #fff; color: #1a73e8; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .cw-scenario-list { display: flex; flex-wrap: wrap; gap: 6px; max-height: 150px; overflow-y: auto; margin-bottom: 12px; }
        .cw-scenario-chip { padding: 4px 10px; border-radius: 100px; background: #fff; border: 1px solid #dadce0; font-size: 12px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .cw-scenario-chip:hover { border-color: #1a73e8; background: #e8f0fe; }
        .cw-scenario-preview { font-size: 11px; color: #80868b; font-style: italic; min-height: 2em; line-height: 1.4; border-top: 1px dashed #dadce0; paddingTop: 8px; }
        .cw-btn-primary { background: #1a73e8; color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 600; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 1px 2px rgba(66, 133, 244, 0.3); }
        .cw-btn-primary:hover { background: #1765cc; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(66, 133, 244, 0.4); }
        .cw-btn-primary:active { transform: translateY(0); box-shadow: 0 1px 2px rgba(66, 133, 244, 0.3); }
        .cw-btn-secondary { background: #fff; color: #5f6368; border: 1px solid #dadce0; border-radius: 8px; padding: 10px 20px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .cw-btn-secondary:hover { background: #f8f9fa; border-color: #d2d2d2; color: #3c4043; }
    `;
    document.head.appendChild(style);
}
