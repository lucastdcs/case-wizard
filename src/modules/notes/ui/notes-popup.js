// src/modules/notes/ui/notes-popup.js
import { stylePopup, styleCredit, styleResizeHandle, makeResizable } from "../../shared/utils.js";
import { createStandardHeader } from "../../shared/header-factory.js";
import { COLORS, RADIUS, SHADOW, EASE } from "../notes-styles.js";

export function createNotesPopup(version, onToggleVisibility) {
    const popup = document.createElement("div"); popup.id = "notes-assistant-popup"; popup.classList.add("cw-module-window");

    // Customizing the base popup style from utils
    Object.assign(popup.style, stylePopup, {
        right: "100px",
        width: "520px", // Increased width
        height: "740px", // Increased height
        display: "flex",
        flexDirection: "column",
        transition: `width 0.4s ${EASE}, height 0.4s ${EASE}, transform 0.4s ${EASE}, opacity 0.3s ease`,
        borderRadius: RADIUS.large,
        boxShadow: SHADOW.apple,
        border: `1px solid rgba(255, 255, 255, 0.7)`
    });

    const animRefs = { popup, googleLine: null };
    const header = createStandardHeader(popup, "Case Notes", version, "Gera notas padronizadas com excelência visual.", animRefs, onToggleVisibility);
    popup.appendChild(header);

    const content = document.createElement("div");
    content.className = "cw-popup-content";
    Object.assign(content.style, {
        padding: "24px", // Increased padding
        overflowY: "auto",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        gap: "24px", // Increased gap
        background: COLORS.surface
    });
    popup.appendChild(content);

    // Credit element
    const credit = document.createElement("div");
    credit.textContent = "created by lucaste@";
    Object.assign(credit.style, styleCredit, {
        padding: "16px 24px",
        borderTop: `1px solid ${COLORS.bgInput}`,
        color: COLORS.textSub,
        fontSize: "11px",
        marginTop: "auto",
        fontWeight: "500",
        letterSpacing: "0.5px"
    });
    popup.appendChild(credit);

    const resizeHandle = document.createElement('div');
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);

    makeResizable(popup, resizeHandle);
    injectStyles();

    return { popup, content, header, animRefs, credit };
}

function injectStyles() {
    if (document.getElementById('cw-notes-refactor-styles')) return;
    const style = document.createElement('style'); style.id = 'cw-notes-refactor-styles';
    style.innerHTML = `
        .cw-popup-content::-webkit-scrollbar { width: 8px; }
        .cw-popup-content::-webkit-scrollbar-track { background: transparent; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; border: 2px solid #fff; }
        .cw-popup-content::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }

        .cw-input, .cw-textarea, .cw-select {
            width: 100%;
            padding: 12px 16px;
            border-radius: ${RADIUS.medium};
            border: 1px solid ${COLORS.border};
            font-size: 14px;
            font-family: 'Google Sans', Roboto, sans-serif;
            transition: all 0.2s ${EASE};
            box-sizing: border-box;
            background: ${COLORS.bgInput};
            color: ${COLORS.text};
            outline: none;
        }

        .cw-select {
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
            background-repeat: no-repeat;
            background-position: right 16px center;
            background-size: 18px;
            padding-right: 44px !important;
            cursor: pointer;
        }

        .cw-input:hover, .cw-textarea:hover, .cw-select:hover {
            border-color: #bdc1c6;
            background: #f1f3f4;
        }

        .cw-input:focus, .cw-textarea:focus, .cw-select:focus {
            border-color: ${COLORS.primary};
            background: #fff;
            box-shadow: 0 0 0 3px rgba(26,115,232,0.15);
        }

        .cw-textarea { min-height: 100px; resize: vertical; line-height: 1.5; }

        .cw-section-title {
            font-size: 11px;
            font-weight: 700;
            color: ${COLORS.textSub};
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 8px 0 12px 0;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .cw-section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: ${COLORS.bgInput};
        }

        .cw-btn-primary {
            background: ${COLORS.primary};
            color: #fff;
            border: none;
            border-radius: ${RADIUS.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${EASE};
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .cw-btn-primary:hover {
            background: #1765cc;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(26, 115, 232, 0.4);
        }
        .cw-btn-primary:active { transform: translateY(0); }

        .cw-btn-secondary {
            background: #fff;
            color: ${COLORS.textSub};
            border: 1px solid ${COLORS.border};
            border-radius: ${RADIUS.pill};
            padding: 12px 24px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ${EASE};
        }
        .cw-btn-secondary:hover {
            background: ${COLORS.bgInput};
            border-color: #bdc1c6;
            color: ${COLORS.text};
        }
    `;
    document.head.appendChild(style);
}
