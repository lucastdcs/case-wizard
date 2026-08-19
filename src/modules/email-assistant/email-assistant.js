// src/modules/email-assistant/email-assistant.js

import {
    stylePopup,
    makeResizable,
    showToast,
    constrainToViewport,
    styleResizeHandle
} from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll, enableArrowKeyNav } from "../shared/dom-utils.js";
import { getAgentName, getPageData } from "../shared/page-data.js";
import { EmailDataService } from "./email-data-service.js";
import { getEmailTemplate } from "./email-data.js";
import { runQuickEmail, runEmailAutomation } from "./email-automation-service.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";
import { SUBSTATUS_SHORTCODES } from '../notes/data/notes-data.js';
import { SnippetService } from "../personal-library/snippet-service.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";

// O conteúdo dos templates de e-mail em si (EMAIL_TEMPLATES, em email-data.js)
// continua só em PT por ora — são os corpos reais enviados a clientes
// externos, mesmo escopo de "conteúdo" adiado do changelog e do Call
// Script. Só o chrome do assistente (abaixo) segue o idioma global.
const EMAIL_DICT = {
    pt: {
        headerTitle: "Email Assistant",
        headerDesc: "Refatoração completa do módulo de e-mail para uma experiência moderna e eficiente.",
        searchPlaceholder: "Buscar templates...",
        previewTitle: "Preview do E-mail",
        noSubject: "Sem Assunto",
        emailCopiedToast: "E-mail copiado com sucesso!",
        copyErrorToast: "Erro ao copiar e-mail",
        fillErrorToast: "Erro ao preencher e-mail",
        smartCrErrorToast: "Erro ao aplicar Smart CR",
    },
    es: {
        headerTitle: "Email Assistant",
        headerDesc: "Refactorización completa del módulo de email para una experiencia moderna y eficiente.",
        searchPlaceholder: "Buscar plantillas...",
        previewTitle: "Vista Previa del Email",
        noSubject: "Sin Asunto",
        emailCopiedToast: "¡Email copiado con éxito!",
        copyErrorToast: "Error al copiar el email",
        fillErrorToast: "Error al completar el email",
        smartCrErrorToast: "Error al aplicar Smart CR",
    },
};
function et(key) {
    const lang = getLanguage();
    return EMAIL_DICT[lang]?.[key] ?? EMAIL_DICT.pt[key];
}

// --- ESTILOS (Apple Inspired) ---
const COLORS = {
    bgApp: "#F5F5F7",
    bgSurface: "#FFFFFF",
    borderSubtle: "rgba(0, 0, 0, 0.07)",
    primary: "#007AFF",
    primaryBg: "rgba(0, 122, 255, 0.1)",
    textPrimary: "#1D1D1F",
    textSecondary: "#6E6E73",
    warning: "#E67E22",
    shadowCard: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"
};

// --- FOLHA DE ESTILOS DEDICADA ---
// Substitui os Object.assign(el.style, {...}) espalhados pelo arquivo (hover
// trocado na mão em onmouseenter/onmouseleave em quase todo botão/item) por
// classes reais — mesmo padrão já usado em broadcast/links/personal-library.
function injectStyles() {
    if (document.getElementById('cw-email-styles')) return;
    const style = document.createElement("style");
    style.id = 'cw-email-styles';
    style.textContent = `
        #email-template-list::-webkit-scrollbar { width: 4px; }
        #email-template-list::-webkit-scrollbar-track { background: transparent; }
        #email-template-list::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        #email-template-list::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        @keyframes cw-floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .cw-animate-float { animation: cw-floating 3s ease-in-out infinite; }

        .cw-email-popup {
            width: 850px; height: 650px;
            font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
            border-radius: 12px; overflow: hidden;
        }
        .cw-email-main { display: flex; flex: 1; overflow: hidden; background-color: ${COLORS.bgApp}; }

        /* --- PAINEL ESQUERDO --- */
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid ${COLORS.borderSubtle}; display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid ${COLORS.borderSubtle}; position: relative; }
        .cw-email-search-input {
            width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
            border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; color: ${COLORS.textPrimary};
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center;
            transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .cw-email-search-input:focus {
            background-color: #FFFFFF; border-color: ${COLORS.primary};
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); transform: scale(1.02);
        }
        .cw-email-clear-btn {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%;
            text-align: center; line-height: 16px; font-weight: bold;
        }

        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }

        .cw-email-list-empty { padding: 40px 20px; text-align: center; color: ${COLORS.textSecondary}; opacity: 0.6; }
        .cw-email-list-empty-icon { font-size: 32px; margin-bottom: 12px; }
        .cw-email-list-empty-text { font-size: 14px; font-weight: 500; }

        .cw-email-cat-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: ${COLORS.textSecondary};
            text-transform: uppercase; letter-spacing: 0.8px; position: sticky; top: -8px;
            background-color: rgba(239, 239, 240, 0.9); z-index: 10; backdrop-filter: blur(20px);
            margin: 0 -8px 8px -8px; border-bottom: 0.5px solid ${COLORS.borderSubtle};
            cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-cat-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-cat-header:focus-visible, .cw-email-list-item:focus-visible { outline: 2px solid ${COLORS.primary}; outline-offset: -2px; }
        .cw-email-cat-right { display: flex; align-items: center; }
        .cw-email-cat-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: ${COLORS.textSecondary}; }
        .cw-email-cat-arrow { margin-left: 8px; transition: transform 0.3s ease; }

        .cw-email-list-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer;
            transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1); border-radius: 10px;
            color: ${COLORS.textPrimary}; margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: ${COLORS.bgSurface}; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            border: 1px solid ${COLORS.borderSubtle}; position: relative; overflow: hidden;
        }
        .cw-email-list-item:hover:not(.selected) {
            /* Sem transform aqui: itens empilhados verticalmente e bem juntos
               são o caso clássico de flicker de hover quando o próprio item
               se desloca. Sombra/borda já comunicam o hover sem mover nada. */
            background-color: #f8f8f9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.08); border-color: rgba(0, 122, 255, 0.2);
        }
        .cw-email-list-item:active:not(.selected) { transform: scale(0.98); }
        .cw-email-list-item.selected {
            background-color: ${COLORS.primary}; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
            border: none; color: #fff; font-weight: 600;
        }
        .cw-email-list-item.selected:active { transform: scale(0.97); }
        .cw-email-list-indicator { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background-color: #fff; border-radius: 0 4px 4px 0; }
        .cw-email-list-icon { font-size: 12px; opacity: 0.7; flex-shrink: 0; }
        .cw-email-list-item.selected .cw-email-list-icon { opacity: 1; }
        .cw-email-list-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

        /* --- PAINEL DIREITO --- */
        /* 0.15s bate com o setTimeout de selectTemplate() (linha ~476) - o
           swap de conteúdo acontece exatamente quando o fade-out termina,
           não no meio dele. */
        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: ${COLORS.bgApp}; transition: opacity 0.15s ease, transform 0.15s ease; }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid ${COLORS.borderSubtle}; background-color: ${COLORS.bgSurface}; max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: ${COLORS.textSecondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input {
            width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
            border: 1.5px solid ${COLORS.borderSubtle}; background-color: #FBFBFD; font-size: 14px;
            transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; outline: none;
        }
        .cw-email-field-input:focus { border-color: ${COLORS.primary}; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }

        .cw-email-smartcr-hint {
            padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA;
            border-radius: 8px; display: flex; align-items: center; gap: 8px;
        }
        .cw-email-smartcr-hint-icon { font-size: 18px; }

        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; background-color: ${COLORS.bgApp}; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: ${COLORS.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }
        .cw-email-preview-content {
            flex: 1; background-color: ${COLORS.bgSurface}; border: 1px solid ${COLORS.borderSubtle};
            border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: ${COLORS.textPrimary};
            overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        /* --- BOTÕES DE AÇÃO --- */
        .cw-email-btn {
            padding: 8px 14px; border-radius: 10px; border: 1.5px solid ${COLORS.primary};
            background: transparent; color: ${COLORS.primary}; font-size: 13px; font-weight: 600;
            cursor: pointer; transition: background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .cw-email-btn:hover { background-color: rgba(0, 122, 255, 0.05); }
        .cw-email-btn:active { transform: scale(0.94); }
        .cw-email-btn.primary {
            border: none; background: ${COLORS.primary}; color: #fff;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }
        .cw-email-btn.primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-email-btn.warning { border-color: ${COLORS.warning}; color: ${COLORS.warning}; display: none; }
        .cw-email-btn.warning:hover { background-color: rgba(230, 126, 34, 0.08); }

        @media (prefers-reduced-motion: reduce) {
            .cw-animate-float { animation: none !important; }
            .cw-email-search-input, .cw-email-list-item, .cw-email-btn, .cw-email-right-panel {
                transition: opacity 0.15s ease, background-color 0.15s ease !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- GERAÇÃO DA LISTA (templates + Smart CRs + snippets pessoais) ---
// A lista junta 3 fontes bem diferentes num só resultado. Cada uma tem sua
// própria função de busca/normalização, e getAllListItems() só concatena.

function getFilteredTemplates(templates, searchTerm) {
    // Localiza ANTES de filtrar pra busca funcionar sobre o texto que o
    // agente está vendo (buscar "programación" tem que achar o template).
    return templates
        .map(t => getEmailTemplate(t, getLanguage()))
        .filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
}

function getMatchingSmartCRs(searchTerm) {
    return Object.entries(SUBSTATUS_SHORTCODES)
        .filter(([key, code]) => code && (key.toLowerCase().includes(searchTerm.toLowerCase()) || code.toLowerCase().includes(searchTerm.toLowerCase())))
        .map(([key, code]) => ({ id: key, name: key.replace(/_/g, ' '), category: "⚡ Smart CRs", code: code, isSmartCR: true }));
}

function getMatchingSnippets(searchTerm) {
    return SnippetService.getSnippets('email')
        .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || (s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase())))
        .map(s => {
            const placeholders = [];
            const matches = s.content.match(/\[([^\]]+)\]/g);
            if (matches) {
                [...new Set(matches)].forEach(m => {
                    placeholders.push({ key: m, label: m.replace('[', '').replace(']', ''), type: m.toLowerCase().includes('data') ? 'date' : 'text', auto: m.toLowerCase().includes('nome') && m.toLowerCase().includes('seu') ? 'agentName' : null });
                });
            }
            return { id: s.id || `snippet-${Math.random()}`, name: s.title, category: "👤 Pessoal", subject: s.subject || et('noSubject'), template: s.content, placeholders: placeholders };
        });
}

function getAllListItems(templates, searchTerm) {
    return [
        ...getFilteredTemplates(templates, searchTerm),
        ...getMatchingSmartCRs(searchTerm),
        ...getMatchingSnippets(searchTerm)
    ];
}

export function initEmailAssistant() {
    const CURRENT_VERSION = "v6.0.0";
    let visible = false;
    let templates = [];
    let selectedTemplate = null;
    let searchTerm = "";
    let expandedCategories = new Set();

    injectStyles();

    const popup = document.createElement("div");
    popup.id = "email-assistant-popup";
    popup.classList.add("cw-module-window", "cw-email-popup");
    // stylePopup traz width:400px inline (tamanho genérico dos outros
    // popups) - sem sobrescrever aqui, esse inline vence o width:850px/
    // height:650px do .cw-email-popup no CSS (inline sempre bate classe),
    // e o layout de 2 painéis (320px fixo + preview) fica espremido num
    // popup real de 400px. Mesmo padrão que call-script/personal-library/
    // links/etc já aplicam depois do spread de stylePopup.
    Object.assign(popup.style, stylePopup, { width: "850px", height: "650px" });
    popup.style.display = "none";
    popup.style.flexDirection = "column";

    const header = createStandardHeader(
        popup,
        et('headerTitle'),
        CURRENT_VERSION,
        et('headerDesc'),
        { popup },
        () => toggleVisibility()
    );

    const mainContent = document.createElement("div");
    mainContent.className = "cw-email-main";

    // --- PAINEL ESQUERDO (LISTA DE TEMPLATES) ---
    const leftPanel = document.createElement("div");
    leftPanel.className = "cw-email-left-panel";

    const searchContainer = document.createElement("div");
    searchContainer.className = "cw-email-search-container";

    const searchInput = document.createElement("input");
    searchInput.className = "cw-email-search-input";
    searchInput.placeholder = et('searchPlaceholder');

    const templateList = document.createElement("div");
    templateList.id = "email-template-list";
    enableArrowKeyNav(templateList, ".cw-email-cat-header, .cw-email-list-item");

    const clearSearch = document.createElement("div");
    clearSearch.className = "cw-email-clear-btn";
    clearSearch.innerHTML = "✕";
    clearSearch.onclick = () => {
        searchInput.value = "";
        searchTerm = "";
        clearSearch.style.display = "none";
        renderTemplateList();
        searchInput.focus();
    };

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearSearch);
    leftPanel.appendChild(searchContainer);
    leftPanel.appendChild(templateList);

    // --- PAINEL DIREITO (PREVIEW) ---
    const rightPanel = document.createElement("div");
    rightPanel.className = "cw-email-right-panel";

    const fieldsSection = document.createElement("div");
    fieldsSection.className = "cw-email-fields-section";

    const previewSection = document.createElement("div");
    previewSection.className = "cw-email-preview-section";

    const previewHeader = document.createElement("div");
    previewHeader.className = "cw-email-preview-header";

    const previewTitle = document.createElement("span");
    previewTitle.textContent = et('previewTitle');
    previewTitle.className = "cw-email-preview-title";

    const previewActions = document.createElement("div");
    previewActions.className = "cw-email-preview-actions";

    const createButton = (text, primary = false) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = "cw-email-btn" + (primary ? " primary" : "");
        return btn;
    }

    const btnCopy = createButton("Copiar HTML");
    const btnFill = createButton("Preencher no CRM", true);
    const btnSmartCR = createButton("Smart CR");
    btnSmartCR.classList.add("warning");

    previewActions.appendChild(btnSmartCR);
    previewActions.appendChild(btnCopy);
    previewActions.appendChild(btnFill);
    previewHeader.appendChild(previewTitle);
    previewHeader.appendChild(previewActions);

    const previewContent = document.createElement("div");
    previewContent.contentEditable = "true";
    previewContent.className = "cw-email-preview-content";

    previewSection.appendChild(previewHeader);
    previewSection.appendChild(previewContent);
    updatePreview();

    rightPanel.appendChild(fieldsSection);
    rightPanel.appendChild(previewSection);

    mainContent.appendChild(leftPanel);
    mainContent.appendChild(rightPanel);

    popup.appendChild(header);
    popup.appendChild(mainContent);

    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // --- LÓGICA DE INTERAÇÃO ---

    function toggleVisibility() {
        visible = !visible;
        if (visible) {
            lockBodyScroll();
            popup.style.display = "flex";
            constrainToViewport(popup);
            if (templates.length === 0) loadTemplates();
        } else {
            unlockBodyScroll();
            popup.style.display = "none";
        }
        toggleGenieAnimation(visible, popup, 'cw-btn-email');
    }

    async function loadTemplates() {
        templateList.innerHTML = '<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>';
        templates = await EmailDataService.getTemplates();
        renderTemplateList();
    }

    function createCategoryHeader(cat, count, isExpanded) {
        const catHeader = document.createElement("div");
        catHeader.className = "cw-email-cat-header";
        catHeader.tabIndex = 0;
        catHeader.setAttribute("role", "button");
        catHeader.setAttribute("aria-expanded", String(isExpanded));

        const headerText = document.createElement("span");
        headerText.textContent = cat;
        catHeader.appendChild(headerText);

        const badge = document.createElement("span");
        badge.className = "cw-email-cat-badge";
        badge.textContent = count;

        const arrow = document.createElement("span");
        arrow.className = "cw-email-cat-arrow";
        arrow.textContent = isExpanded ? '▾' : '▸';

        const rightSide = document.createElement("div");
        rightSide.className = "cw-email-cat-right";
        rightSide.appendChild(badge);
        rightSide.appendChild(arrow);
        catHeader.appendChild(rightSide);

        catHeader.onclick = () => {
            if (expandedCategories.has(cat)) {
                expandedCategories.delete(cat);
            } else {
                expandedCategories.add(cat);
            }
            renderTemplateList();
        };
        catHeader.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); catHeader.click(); }
        });

        return catHeader;
    }

    function createTemplateListItem(template) {
        const isSelected = selectedTemplate && selectedTemplate.id === template.id;
        const item = document.createElement("div");
        item.className = "cw-email-list-item" + (isSelected ? " selected" : "");
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-pressed", String(!!isSelected));

        if (isSelected) {
            const indicator = document.createElement("div");
            indicator.className = "cw-email-list-indicator";
            item.appendChild(indicator);
        }

        const icon = document.createElement("span");
        icon.className = "cw-email-list-icon";
        icon.innerHTML = template.isSmartCR ? '⚡' : (template.category === '👤 Pessoal' ? '👤' : '📄');
        item.appendChild(icon);

        const text = document.createElement("span");
        text.className = "cw-email-list-text";
        text.textContent = template.name;
        item.appendChild(text);

        item.onclick = () => selectTemplate(template);
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.click(); }
        });

        return item;
    }

    function renderTemplateList() {
        templateList.innerHTML = "";
        const allItems = getAllListItems(templates, searchTerm);

        if (allItems.length === 0) {
            templateList.innerHTML = `
                <div class="cw-email-list-empty">
                    <div class="cw-email-list-empty-icon">🔍</div>
                    <div class="cw-email-list-empty-text">Nenhum resultado para "${searchTerm}"</div>
                </div>`;
            return;
        }

        const categories = [...new Set(allItems.map(t => t.category))].sort((a, b) => a.localeCompare(b));

        categories.forEach(cat => {
            const isExpanded = expandedCategories.has(cat) || searchTerm.length > 0;
            const categoryItems = allItems.filter(t => t.category === cat);

            templateList.appendChild(createCategoryHeader(cat, categoryItems.length, isExpanded));

            if (!isExpanded) return;

            categoryItems.forEach(template => {
                templateList.appendChild(createTemplateListItem(template));
            });
        });
    }

    let selectionTimeout = null;
    async function selectTemplate(template) {
        if (selectedTemplate?.id === template.id) return;
        selectedTemplate = template;

        if (selectionTimeout) clearTimeout(selectionTimeout);

        rightPanel.style.opacity = "0";
        rightPanel.style.transform = "translateY(5px)";

        selectionTimeout = setTimeout(() => {
            btnSmartCR.style.display = template.isSmartCR ? "block" : "none";
            btnFill.style.display = template.isSmartCR ? "none" : "block";
            btnCopy.style.display = template.isSmartCR ? "none" : "block";

            renderTemplateList();
            renderFields();
            updatePreview();

            rightPanel.style.opacity = "1";
            rightPanel.style.transform = "translateY(0)";
            selectionTimeout = null;
        }, 150);
    }

    function renderFields() {
        fieldsSection.innerHTML = "";

        if (!selectedTemplate || selectedTemplate.isSmartCR) {
            if (selectedTemplate?.isSmartCR) {
                fieldsSection.style.display = "block";
                fieldsSection.innerHTML = `<div class="cw-email-smartcr-hint">
                    <span class="cw-email-smartcr-hint-icon">💡</span>
                    <span>Este é um <b>Smart CR</b>. Clique no botão laranja acima para aplicar o atalho diretamente no CRM.</span>
                </div>`;
            } else {
                fieldsSection.style.display = "none";
            }
            return;
        }

        const hasPlaceholders = selectedTemplate.placeholders && selectedTemplate.placeholders.length > 0;
        fieldsSection.style.display = hasPlaceholders ? "block" : "none";

        if (!hasPlaceholders) return;

        const grid = document.createElement("div");
        grid.className = "cw-email-fields-grid";

        (selectedTemplate.placeholders || []).forEach(ph => {
            const container = document.createElement("div");
            const label = document.createElement("label");
            label.className = "cw-email-field-label";
            label.textContent = ph.label;

            const input = document.createElement("input");
            input.className = "cw-email-field-input";
            input.type = ph.type || "text";
            input.dataset.key = ph.key;

            if (ph.auto === "agentName") { input.value = getAgentName().split(' ')[0]; }
            input.addEventListener("input", updatePreview);
            container.appendChild(label);
            container.appendChild(input);
            grid.appendChild(container);
        });
        fieldsSection.appendChild(grid);
    }

    function updatePreview() {
        if (!selectedTemplate) {
            previewContent.innerHTML = `
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#f8f9fa"/>
                            <!-- Envelope Base -->
                            <path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/>
                            <!-- Detalhes decorativos (paleta Apple do módulo, não mais as cores oficiais do Google) -->
                            <path d="M30 40L60 60L90 40" stroke="${COLORS.primary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FF9500" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34C759"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="${COLORS.primary}" opacity="0.8"/>
                        </svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: ${COLORS.textPrimary}; margin-bottom: 8px;">
                        Pronto para começar?
                    </div>
                    <div style="font-size: 14px; color: ${COLORS.textSecondary}; line-height: 1.6; max-width: 280px; margin: 0 auto;">
                        Selecione um template à esquerda para<br>gerar o seu e-mail técnico.
                    </div>
                </div>`;
            return;
        }

        if (selectedTemplate.isSmartCR) {
            previewContent.innerHTML = `<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">⚡</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${selectedTemplate.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho irá preencher automaticamente os destinatários e abrir o menu de Canned Responses do CRM.</div></div>`;
            return;
        }

        let html = selectedTemplate.template;
        const inputs = fieldsSection.querySelectorAll("input");
        (inputs || []).forEach(input => {
            const key = input.dataset.key;
            let val = input.value;
            if (input.type === 'date' && val) { const [year, month, day] = val.split('-'); val = `${month}/${day}/${year}`; }
            val = val || `<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${key}</span>`;
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            html = html.replace(new RegExp(escapedKey, 'g'), val);
        });
        previewContent.innerHTML = html;
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        clearSearch.style.display = searchTerm ? "block" : "none";
        renderTemplateList();
    });

    btnCopy.onclick = () => {
        const html = previewContent.innerHTML;
        const blob = new Blob([html], { type: 'text/html' });
        const text = previewContent.innerText;
        const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([text], { type: 'text/plain' }) })];
        navigator.clipboard.write(data).then(() => showToast(et('emailCopiedToast')), () => { SoundManager.playError(); showToast(et('copyErrorToast'), { error: true }); });
    };

    btnFill.onclick = async () => {
        if (!selectedTemplate) return;
        const finishLoading = triggerProcessingAnimation();
        const filledTemplate = { ...selectedTemplate, body: previewContent.innerHTML };
        try {
            await runQuickEmail(filledTemplate);
            toggleVisibility();
        } catch (error) {
            SoundManager.playError();
            showToast(et('fillErrorToast'), { error: true });
        } finally {
            finishLoading();
        }
    };

    btnSmartCR.onclick = async () => {
        if (!selectedTemplate || !selectedTemplate.isSmartCR) return;
        const finishLoading = triggerProcessingAnimation();
        try {
            await runEmailAutomation(selectedTemplate.code);
            toggleVisibility();
        } catch (error) {
            SoundManager.playError();
            showToast(et('smartCrErrorToast'), { error: true });
        } finally {
            finishLoading();
        }
    };

    onLanguageChange(() => {
        const helpTitleEl = popup.querySelector('.cw-help-title');
        if (helpTitleEl) helpTitleEl.textContent = et('headerTitle');
        const helpDescEl = popup.querySelector('.cw-help-description');
        if (helpDescEl) helpDescEl.textContent = et('headerDesc');
        searchInput.placeholder = et('searchPlaceholder');
        previewTitle.textContent = et('previewTitle');
    });

    return toggleVisibility;
}
