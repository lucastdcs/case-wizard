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

export function initEmailAssistant() {
    const CURRENT_VERSION = "v5.0.0";
    let visible = false;
    let templates = [];
    let selectedTemplate = null;
    let searchTerm = "";
    let activeCategory = "Todos";

    // --- ESTILOS ---
    const COLORS = {
        bgApp: "#F8F9FA",
        bgSurface: "#FFFFFF",
        borderSubtle: "rgba(0, 0, 0, 0.08)",
        primary: "#1A73E8",
        primaryBg: "#E8F0FE",
        textPrimary: "#202124",
        textSecondary: "#5F6368",
        shadowCard: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
    };

    const popup = document.createElement("div");
    popup.id = "email-assistant-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
        width: "850px",
        height: "650px",
        display: "none",
        flexDirection: "column"
    });

    const header = createStandardHeader(
        popup,
        "Email Assistant",
        CURRENT_VERSION,
        "Refatoração completa do módulo de e-mail para uma experiência moderna e eficiente.",
        { popup },
        () => toggleVisibility()
    );

    const mainContent = document.createElement("div");
    Object.assign(mainContent.style, {
        display: "flex",
        flex: "1",
        overflow: "hidden",
        backgroundColor: COLORS.bgApp
    });

    // --- PAINEL ESQUERDO (LISTA) ---
    const leftPanel = document.createElement("div");
    Object.assign(leftPanel.style, {
        width: "300px",
        borderRight: `1px solid ${COLORS.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: "0"
    });

    const searchContainer = document.createElement("div");
    Object.assign(searchContainer.style, {
        padding: "16px",
        borderBottom: `1px solid ${COLORS.borderSubtle}`
    });

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar templates...";
    Object.assign(searchInput.style, {
        width: "100%",
        padding: "10px 12px 10px 36px",
        borderRadius: "8px",
        border: `1px solid ${COLORS.borderSubtle}`,
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%235F6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "10px center"
    });

    const templateList = document.createElement("div");
    Object.assign(templateList.style, {
        flex: "1",
        overflowY: "auto",
        padding: "8px 0"
    });

    searchContainer.appendChild(searchInput);
    leftPanel.appendChild(searchContainer);
    leftPanel.appendChild(templateList);

    // --- PAINEL DIREITO (TRABALHO) ---
    const rightPanel = document.createElement("div");
    Object.assign(rightPanel.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    });

    // Seção de Campos (Topo)
    const fieldsSection = document.createElement("div");
    Object.assign(fieldsSection.style, {
        padding: "20px",
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
        backgroundColor: "#fff",
        maxHeight: "250px",
        overflowY: "auto"
    });

    // Seção de Preview (Embaixo)
    const previewSection = document.createElement("div");
    Object.assign(previewSection.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: COLORS.bgApp,
        overflow: "hidden"
    });

    const previewHeader = document.createElement("div");
    Object.assign(previewHeader.style, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
    });

    const previewTitle = document.createElement("span");
    previewTitle.textContent = "Preview do E-mail";
    Object.assign(previewTitle.style, {
        fontSize: "12px",
        fontWeight: "700",
        color: COLORS.textSecondary,
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    });

    const previewActions = document.createElement("div");
    Object.assign(previewActions.style, {
        display: "flex",
        gap: "8px"
    });

    const btnCopy = document.createElement("button");
    btnCopy.textContent = "Copiar HTML";
    Object.assign(btnCopy.style, {
        padding: "6px 12px",
        borderRadius: "6px",
        border: `1px solid ${COLORS.primary}`,
        background: "transparent",
        color: COLORS.primary,
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer"
    });

    const btnFill = document.createElement("button");
    btnFill.textContent = "Preencher no CRM";
    Object.assign(btnFill.style, {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        background: COLORS.primary,
        color: "#fff",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer"
    });

    const btnSmartCR = document.createElement("button");
    btnSmartCR.textContent = "Smart CR";
    Object.assign(btnSmartCR.style, {
        padding: "6px 12px",
        borderRadius: "6px",
        border: `1px solid #EA8600`,
        background: "transparent",
        color: "#EA8600",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
        display: "none" // Só mostra se for Smart CR
    });

    previewActions.appendChild(btnSmartCR);
    previewActions.appendChild(btnCopy);
    previewActions.appendChild(btnFill);
    previewHeader.appendChild(previewTitle);
    previewHeader.appendChild(previewActions);

    const previewContent = document.createElement("div");
    previewContent.contentEditable = "true";
    Object.assign(previewContent.style, {
        flex: "1",
        backgroundColor: "#fff",
        border: `1px solid ${COLORS.borderSubtle}`,
        borderRadius: "8px",
        padding: "20px",
        fontSize: "14px",
        lineHeight: "1.6",
        color: COLORS.textPrimary,
        overflowY: "auto",
        outline: "none",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)"
    });

    previewSection.appendChild(previewHeader);
    previewSection.appendChild(previewContent);

    rightPanel.appendChild(fieldsSection);
    rightPanel.appendChild(previewSection);

    mainContent.appendChild(leftPanel);
    mainContent.appendChild(rightPanel);

    popup.appendChild(header);
    popup.appendChild(mainContent);

    // Adiciona o Handle de redimensionamento
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // --- LÓGICA DE INTERAÇÃO ---

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

        if (filteredTemplates.length === 0) {
            templateList.innerHTML = '<div style="padding: 20px; text-align: center; color: #5f6368;">Nenhum template encontrado</div>';
            return;
        }

        // Adicionar Smart CRs à lista
        const smartCRs = Object.entries(SUBSTATUS_SHORTCODES)
            .filter(([key, code]) => code && (key.toLowerCase().includes(searchTerm.toLowerCase()) || code.toLowerCase().includes(searchTerm.toLowerCase())))
            .map(([key, code]) => ({
                id: key,
                name: key.replace(/_/g, ' '),
                category: "⚡ Smart CRs",
                code: code,
                isSmartCR: true
            }));

        // Adicionar Snippets da Biblioteca Pessoal
        const snippets = SnippetService.getSnippets('email')
            .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || (s.subject && s.subject.toLowerCase().includes(searchTerm.toLowerCase())))
            .map(s => {
                // Tenta encontrar placeholders no formato [TEXTO]
                const placeholders = [];
                const matches = s.content.match(/\[([^\]]+)\]/g);
                if (matches) {
                    [...new Set(matches)].forEach(m => {
                        placeholders.push({
                            key: m,
                            label: m.replace('[', '').replace(']', ''),
                            type: m.toLowerCase().includes('data') ? 'date' : 'text',
                            auto: m.toLowerCase().includes('nome') && m.toLowerCase().includes('seu') ? 'agentName' : null
                        });
                    });
                }

                return {
                    id: s.id || `snippet-${Math.random()}`,
                    name: s.title,
                    category: "👤 Pessoal",
                    subject: s.subject || "Sem Assunto",
                    template: s.content,
                    placeholders: placeholders
                };
            });

        const allItems = [...filteredTemplates, ...smartCRs, ...snippets];

        // Agrupar por categoria
        const categories = [...new Set(allItems.map(t => t.category))];

        categories.forEach(cat => {
            const catHeader = document.createElement("div");
            catHeader.textContent = cat;
            Object.assign(catHeader.style, {
                padding: "12px 16px 4px 16px",
                fontSize: "11px",
                fontWeight: "700",
                color: COLORS.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "1px"
            });
            templateList.appendChild(catHeader);

            allItems.filter(t => t.category === cat).forEach(template => {
                const item = document.createElement("div");
                item.textContent = template.name;
                Object.assign(item.style, {
                    padding: "10px 16px",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "background 0.2s"
                });

                if (selectedTemplate && selectedTemplate.id === template.id) {
                    item.style.backgroundColor = COLORS.primaryBg;
                    item.style.color = COLORS.primary;
                    item.style.fontWeight = "600";
                }

                item.onmouseenter = () => { if (!selectedTemplate || selectedTemplate.id !== template.id) item.style.backgroundColor = "#f1f3f4"; };
                item.onmouseleave = () => { if (!selectedTemplate || selectedTemplate.id !== template.id) item.style.backgroundColor = "transparent"; };
                item.onclick = () => selectTemplate(template);

                templateList.appendChild(item);
            });
        });
    }

    async function selectTemplate(template) {
        selectedTemplate = template;

        if (template.isSmartCR) {
            btnSmartCR.style.display = "block";
            btnFill.style.display = "none";
        } else {
            btnSmartCR.style.display = "none";
            btnFill.style.display = "block";
        }

        renderTemplateList();
        renderFields();
        updatePreview();
    }

    function renderFields() {
        fieldsSection.innerHTML = "";
        if (!selectedTemplate || selectedTemplate.isSmartCR) {
            if (selectedTemplate?.isSmartCR) {
                fieldsSection.innerHTML = `<div style="padding: 10px; font-size: 13px; color: #5f6368; background: #FEF7E0; border-radius: 8px;">Este é um Smart CR. Clique em "Smart CR" para aplicar o atalho no CRM.</div>`;
            }
            return;
        }

        const grid = document.createElement("div");
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
        });

        selectedTemplate.placeholders.forEach(ph => {
            const container = document.createElement("div");

            const label = document.createElement("label");
            label.textContent = ph.label;
            Object.assign(label.style, {
                display: "block",
                fontSize: "11px",
                fontWeight: "700",
                color: COLORS.textSecondary,
                marginBottom: "4px",
                textTransform: "uppercase"
            });

            const input = document.createElement("input");
            input.type = ph.type || "text";
            input.dataset.key = ph.key;
            Object.assign(input.style, {
                width: "100%",
                padding: "8px 10px",
                borderRadius: "6px",
                border: `1px solid ${COLORS.borderSubtle}`,
                fontSize: "13px",
                boxSizing: "border-box"
            });

            // Preenchimento Automático
            if (ph.auto === "agentName") {
                const fullName = getAgentName();
                input.value = fullName.split(' ')[0];
            }

            input.addEventListener("input", updatePreview);

            container.appendChild(label);
            container.appendChild(input);
            grid.appendChild(container);
        });

        fieldsSection.appendChild(grid);
    }

    function updatePreview() {
        if (!selectedTemplate) {
            previewContent.innerHTML = '<div style="height: 100%; display: flex; align-items: center; justify-content: center; color: #9aa0a6;">Selecione um template para ver o preview</div>';
            return;
        }

        if (selectedTemplate.isSmartCR) {
            previewContent.innerHTML = `<div style="padding: 20px; text-align: center;"><div style="font-size: 48px; margin-bottom: 12px;">⚡</div><div style="font-size: 16px; font-weight: 600; color: #202124;">Smart CR: ${selectedTemplate.code}</div><div style="font-size: 14px; color: #5f6368; margin-top: 8px;">Este atalho irá preencher automaticamente os destinatários e abrir o menu de Canned Responses do CRM.</div></div>`;
            return;
        }

        let html = selectedTemplate.template;
        const inputs = fieldsSection.querySelectorAll("input");

        inputs.forEach(input => {
            const key = input.dataset.key;
            let val = input.value;

            if (input.type === 'date' && val) {
                const [year, month, day] = val.split('-');
                val = `${month}/${day}/${year}`;
            }

            val = val || `<span style="color: #ea4335; background: #fce8e6; padding: 0 4px; border-radius: 4px;">${key}</span>`;

            // Escapar regex e substituir
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            html = html.replace(new RegExp(escapedKey, 'g'), val);
        });

        previewContent.innerHTML = html;
    }

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderTemplateList();
    });

    btnCopy.onclick = () => {
        const html = previewContent.innerHTML;
        const blob = new Blob([html], { type: 'text/html' });
        const text = previewContent.innerText;

        const data = [new ClipboardItem({
            'text/html': blob,
            'text/plain': new Blob([text], { type: 'text/plain' })
        })];

        navigator.clipboard.write(data).then(() => {
            showToast("E-mail copiado com sucesso!");
        }).catch(err => {
            console.error("Erro ao copiar:", err);
            showToast("Erro ao copiar e-mail", { error: true });
        });
    };

    btnFill.onclick = async () => {
        if (!selectedTemplate) return;

        const finishLoading = triggerProcessingAnimation();

        const filledTemplate = {
            ...selectedTemplate,
            body: previewContent.innerHTML
        };

        try {
            await runQuickEmail(filledTemplate);
            toggleVisibility();
        } catch (error) {
            console.error("Fill error:", error);
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
            console.error("Smart CR error:", error);
            showToast("Erro ao aplicar Smart CR", { error: true });
        } finally {
            finishLoading();
        }
    };

    return toggleVisibility;
}
