// src/modules/email-assistant/email-assistant.js

import {
    stylePopup,
    makeResizable,
    showToast,
    constrainToViewport,
    makeDraggable,
    styleResizeHandle
} from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from '../shared/animations.js';
import { getAgentName, getPageData } from "../shared/page-data.js";
import { EmailDataService } from "./email-data-service.js";
import { runQuickEmail, runEmailAutomation } from "./email-automation-service.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";
import { SUBSTATUS_SHORTCODES } from '../notes/data/notes-data.js';
import { SnippetService } from "../personal-library/snippet-service.js";

// --- Lógica de Injeção de Estilo ---
let stylesInjected = false;
function injectEmailAssistantStyles() {
    if (stylesInjected) return;
    const styleSheet = `
        :root {
            --cw-color-bg-app: #F5F5F7;
            --cw-color-bg-surface: #FFFFFF;
            --cw-color-border-subtle: rgba(0, 0, 0, 0.07);
            --cw-color-primary: #007AFF;
            --cw-color-primary-bg: rgba(0, 122, 255, 0.1);
            --cw-color-text-primary: #1D1D1F;
            --cw-color-text-secondary: #6E6E73;
            --cw-shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
            --cw-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .cw-email-popup {
            width: 850px;
            height: 650px;
            display: flex;
            flex-direction: column;
            font-family: var(--cw-font-family);
            border-radius: 12px;
            overflow: hidden;
            background-color: var(--cw-color-bg-app);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 15px 15px rgba(0,0,0,0.1);
        }
        .cw-email-main { display: flex; flex: 1; overflow: hidden; }
        .cw-email-left-panel { width: 320px; background-color: #EFEFF0; border-right: 1px solid var(--cw-color-border-subtle); display: flex; flex-direction: column; flex-shrink: 0; }
        .cw-email-search-container { padding: 16px; border-bottom: 1px solid var(--cw-color-border-subtle); position: relative; }
        .cw-email-search-input {
            width: 100%; padding: 10px 14px 10px 36px; border-radius: 10px; border: 1.5px solid transparent; background-color: #E3E3E8;
            font-size: 15px; outline: none; box-sizing: border-box; color: var(--cw-color-text-primary);
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat; background-position: 12px center; transition: all 0.2s ease-in-out;
        }
        .cw-email-search-input:focus { background-color: #FFFFFF; border-color: var(--cw-color-primary); box-shadow: 0 0 0 4px var(--cw-color-primary-bg); transform: scale(1.02); }
        .cw-email-search-clear {
            position: absolute; right: 26px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #fff; cursor: pointer; display: none;
            background-color: #C7C7CC; width: 16px; height: 16px; border-radius: 50%; text-align: center; line-height: 16px; font-weight: bold;
        }
        #email-template-list { flex: 1; overflow-y: auto; padding: 8px; scroll-behavior: smooth; }
        #email-template-list::-webkit-scrollbar { width: 4px; }
        #email-template-list::-webkit-scrollbar-track { background: transparent; }
        #email-template-list::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        #email-template-list::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.2); }

        .cw-email-right-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background-color: var(--cw-color-bg-app); transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); }
        .cw-email-fields-section { padding: 20px; border-bottom: 1px solid var(--cw-color-border-subtle); background-color: var(--cw-color-bg-surface); max-height: 250px; overflow-y: auto; display: none; }
        .cw-email-preview-section { flex: 1; display: flex; flex-direction: column; padding: 20px; overflow: hidden; }
        .cw-email-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cw-email-preview-title { font-size: 12px; font-weight: 600; color: var(--cw-color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-preview-actions { display: flex; gap: 8px; }

        .cw-btn { padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1); border: none; }
        .cw-btn-primary { background: var(--cw-color-primary); color: #fff; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3); }
        .cw-btn-primary:hover { background-color: #0062CC; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.4); }
        .cw-btn-secondary { background: transparent; color: var(--cw-color-primary); border: 1.5px solid var(--cw-color-primary); }
        .cw-btn-secondary:hover { background-color: var(--cw-color-primary-bg); }
        .cw-btn-smart-cr { border-color: #E67E22; color: #E67E22; display: none; }
        .cw-btn-smart-cr:hover { background-color: rgba(230, 126, 34, 0.1); }

        .cw-email-preview-content { flex: 1; background-color: var(--cw-color-bg-surface); border: 1px solid var(--cw-color-border-subtle); border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: var(--cw-color-text-primary); overflow-y: auto; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02); }
        
        .cw-email-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cw-email-field-label { display: block; font-size: 11px; font-weight: 700; color: var(--cw-color-text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-email-field-input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid var(--cw-color-border-subtle); background-color: #FBFBFD; font-size: 14px; box-sizing: border-box; transition: all 0.2s ease; outline: none; }
        .cw-email-field-input:focus { border-color: var(--cw-color-primary); background-color: #FFFFFF; box-shadow: 0 0 0 4px var(--cw-color-primary-bg); }

        .cw-email-category-header {
            padding: 12px 16px 12px 24px; font-size: 11px; font-weight: 700; color: var(--cw-color-text-secondary); text-transform: uppercase;
            letter-spacing: 0.8px; position: sticky; top: -8px; background-color: rgba(239, 239, 240, 0.9); z-index: 10;
            backdrop-filter: blur(20px); margin: 0 -8px 8px -8px; border-bottom: 0.5px solid var(--cw-color-border-subtle);
            cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; transition: background-color 0.2s ease;
        }
        .cw-email-category-header:hover { background-color: rgba(230, 230, 232, 0.9); }
        .cw-email-category-badge { background-color: rgba(0, 0, 0, 0.05); padding: 2px 8px; border-radius: 10px; font-size: 10px; color: var(--cw-color-text-secondary); }

        .cw-email-template-item {
            padding: 12px 14px; font-size: 14px; cursor: pointer; transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            border-radius: 10px; color: var(--cw-color-text-primary); margin: 4px 6px; display: flex; align-items: center; gap: 12px;
            background-color: var(--cw-color-bg-surface); box-shadow: var(--cw-shadow-card); border: 1px solid var(--cw-color-border-subtle);
            position: relative; overflow: hidden;
        }
        .cw-email-template-item:hover { background-color: #f8f8f9; transform: translateY(-1px) scale(1.01); box-shadow: 0 4px 8px rgba(0,0,0,0.08); border-color: rgba(0, 122, 255, 0.2); }
        .cw-email-template-item.selected { background-color: var(--cw-color-primary); color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3); border: none; }
        .cw-email-template-item-icon { font-size: 12px; opacity: 0.7; flex-shrink: 0; }
        .cw-email-template-item.selected .cw-email-template-item-icon { opacity: 1; }
        .cw-email-template-item-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

        @keyframes cw-floating { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .cw-animate-float { animation: cw-floating 3s ease-in-out infinite; }
    `;
    const styleElement = document.createElement("style");
    styleElement.textContent = styleSheet;
    document.head.appendChild(styleElement);
    stylesInjected = true;
}


export function initEmailAssistant() {
    injectEmailAssistantStyles(); // Garante que os estilos estão na página

    const CURRENT_VERSION = "v6.1.1"; // Version bump for bugfix
    let visible = false;
    let templates = [];
    let selectedTemplate = null;
    let searchTerm = "";
    let expandedCategories = new Set();

    const popup = document.createElement("div");
    popup.id = "email-assistant-popup";
    popup.className = "cw-module-window cw-email-popup"; // Usando classes
    Object.assign(popup.style, stylePopup, { display: "none" }); // Apenas estilos dinâmicos

    const header = createStandardHeader(
        popup,
        "Email Assistant",
        CURRENT_VERSION,
        "UI Refatorada com CSS-in-JS Injetado e Classes.",
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
    searchInput.placeholder = "Buscar templates...";
    searchInput.className = "cw-email-search-input";
    
    const clearSearch = document.createElement("div");
    clearSearch.innerHTML = "✕";
    clearSearch.className = "cw-email-search-clear";
    clearSearch.onclick = () => {
        searchInput.value = "";
        searchTerm = "";
        clearSearch.style.display = "none";
        renderTemplateList();
        searchInput.focus();
    };
    
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearSearch);

    const templateList = document.createElement("div");
    templateList.id = "email-template-list";
    
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
    previewTitle.textContent = "Preview do E-mail";
    previewTitle.className = "cw-email-preview-title";

    const previewActions = document.createElement("div");
    previewActions.className = "cw-email-preview-actions";
    
    const createButton = (text, type = 'secondary', customClass = '') => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = `cw-btn cw-btn-${type} ${customClass}`;
        return btn;
    }

    const btnCopy = createButton("Copiar HTML", "secondary");
    const btnFill = createButton("Preencher no CRM", "primary");
    const btnSmartCR = createButton("Smart CR", "secondary", "cw-btn-smart-cr");

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

    updatePreview(); // Chamar para mostrar o estado inicial

    // --- LÓGICA DE INTERAÇÃO (praticamente inalterada) ---

    function toggleVisibility() {
        visible = !visible;
        if (visible) {
            popup.style.display = "flex";
            constrainToViewport(popup);
            if (templates.length === 0) loadTemplates();
        } else {
            popup.style.display = "none";
        }
        toggleGenieAnimation(visible, popup, 'cw-btn-email');
    }

    async function loadTemplates() {
        templateList.innerHTML = '<div style="padding: 20px; text-align: center; color: #5f6368;">Carregando...</div>';
        templates = await EmailDataService.getTemplates();
        renderTemplateList();
    }

    function renderTemplateList() {
        templateList.innerHTML = "";
        const filteredTemplates = templates.filter(t =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const smartCRs = Object.entries(SUBSTATUS_SHORTCODES)
            .filter(([key, code]) => code && (key.toLowerCase().includes(searchTerm.toLowerCase()) || code.toLowerCase().includes(searchTerm.toLowerCase())))
            .map(([key, code]) => ({ id: key, name: key.replace(/_/g, ' '), category: "⚡ Smart CRs", code: code, isSmartCR: true }));

        const snippets = SnippetService.getSnippets('email')
            .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || (s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase())))
            .map(s => {
                const placeholders = [];
                const matches = s.content.match(/\[([^\]]+)\]/g);
                if (matches) {
                    [...new Set(matches)].forEach(m => {
                        placeholders.push({ key: m, label: m.replace('[', '').replace(']', ''), type: m.toLowerCase().includes('data') ? 'date' : 'text', auto: m.toLowerCase().includes('nome') && m.toLowerCase().includes('seu') ? 'agentName' : null });
                    });
                }
                return { id: s.id || `snippet-${Math.random()}`, name: s.title, category: "👤 Pessoal", subject: s.subject || "Sem Assunto", template: s.content, placeholders: placeholders };
            });

        const allItems = [...filteredTemplates, ...smartCRs, ...snippets];

        if (allItems.length === 0) {
            templateList.innerHTML = `
                <div style="padding: 40px 20px; text-align: center; color: var(--cw-color-text-secondary); opacity: 0.6;">
                    <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
                    <div style="font-size: 14px; font-weight: 500;">Nenhum resultado para "${searchTerm}"</div>
                </div>`;
            return;
        }

        const categories = [...new Set(allItems.map(t => t.category))].sort((a,b) => a.localeCompare(b));

        categories.forEach(cat => {
            const isExpanded = expandedCategories.has(cat) || searchTerm.length > 0;
            const categoryItems = allItems.filter(t => t.category === cat);

            const catHeader = document.createElement("div");
            catHeader.className = "cw-email-category-header";
            
            const headerText = document.createElement("span");
            headerText.textContent = cat;

            const rightSide = document.createElement("div");
            rightSide.style.display = 'flex';
            rightSide.style.alignItems = 'center';

            const badge = document.createElement("span");
            badge.textContent = categoryItems.length;
            badge.className = "cw-email-category-badge";

            const arrow = document.createElement("span");
            arrow.innerHTML = isExpanded ? '▾' : '▸';
            arrow.style.marginLeft = '8px';
            arrow.style.transition = 'transform 0.3s ease';

            rightSide.appendChild(badge);
            rightSide.appendChild(arrow);
            catHeader.appendChild(headerText);
            catHeader.appendChild(rightSide);

            catHeader.onclick = () => {
                if (expandedCategories.has(cat)) expandedCategories.delete(cat);
                else expandedCategories.add(cat);
                renderTemplateList();
            };

            templateList.appendChild(catHeader);

            if (!isExpanded) return;

            categoryItems.forEach(template => {
                const item = document.createElement("div");
                item.className = "cw-email-template-item";
                if (selectedTemplate && selectedTemplate.id === template.id) {
                    item.classList.add("selected");
                }

                const icon = document.createElement("span");
                icon.className = 'cw-email-template-item-icon';
                icon.innerHTML = template.isSmartCR ? '⚡' : (template.category === '👤 Pessoal' ? '👤' : '📄');

                const text = document.createElement("span");
                text.className = 'cw-email-template-item-text';
                text.textContent = template.name;
                
                item.appendChild(icon);
                item.appendChild(text);
                
                item.onclick = () => selectTemplate(template);
                templateList.appendChild(item);
            });
        });
    }

    let selectionTimeout = null;
    function selectTemplate(template) {
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
                fieldsSection.innerHTML = `<div style="padding: 12px; font-size: 13px; color: #856404; background: #FFF3CD; border: 1px solid #FFEEBA; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">💡</span>
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
            label.textContent = ph.label;
            label.className = "cw-email-field-label";

            const input = document.createElement("input");
            input.type = ph.type || "text";
            input.dataset.key = ph.key;
            input.className = "cw-email-field-input";
            
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
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--cw-color-text-secondary);">
                    <div class="cw-animate-float" style="width: 140px; height: 140px; margin-bottom: 24px;">
                        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="55" fill="#f8f9fa"/><path d="M30 40C30 37.7909 31.7909 36 34 36H86C88.2091 36 90 37.7909 90 40V80C90 82.2091 88.2091 84 86 84H34C31.7909 84 30 82.2091 30 80V40Z" fill="white" stroke="#e8eaed" stroke-width="2"/><path d="M30 40L60 60L90 40" stroke="#4285F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 80L50 65" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><path d="M90 80L70 65" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><circle cx="95" cy="30" r="8" fill="#34A853"/><path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/><rect x="20" y="70" width="12" height="12" rx="3" fill="#4285F4" opacity="0.8"/></svg>
                    </div>
                    <div style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 600; color: var(--cw-color-text-primary); margin-bottom: 8px;">Pronto para começar?</div>
                    <div style="font-size: 14px; line-height: 1.6; max-width: 280px; margin: 0 auto;">Selecione um template à esquerda para<br>gerar o seu e-mail técnico.</div>
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
            // FIX: Correctly escape special characters for the RegExp
            const escapedKey = key.replace(/[.*+?^${}()|[\\\]]/g, '\\$&');
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
        navigator.clipboard.write(data).then(() => showToast("E-mail copiado com sucesso!"), () => showToast("Erro ao copiar e-mail", { error: true }));
    };

    btnFill.onclick = async () => {
        if (!selectedTemplate) return;
        const finishLoading = triggerProcessingAnimation();
        const filledTemplate = { ...selectedTemplate, body: previewContent.innerHTML };
        try {
            await runQuickEmail(filledTemplate);
            toggleVisibility();
        } catch (error) {
            showToast("Erro ao preencher e-mail", { error: true });
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
            showToast("Erro ao aplicar Smart CR", { error: true });
        } finally {
            finishLoading();
        }
    };

    return toggleVisibility;
}
