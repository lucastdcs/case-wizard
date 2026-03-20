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
    const CURRENT_VERSION = "v6.0.0";
    let visible = false;
    let templates = [];
    let selectedTemplate = null;
    let searchTerm = "";
    let activeCategory = "Todos";
    let expandedCategories = new Set();

    // --- ESTILOS (Apple Inspired) ---
    const COLORS = {
        bgApp: "#F5F5F7",
        bgSurface: "#FFFFFF",
        borderSubtle: "rgba(0, 0, 0, 0.07)",
        primary: "#007AFF",
        primaryBg: "rgba(0, 122, 255, 0.1)",
        textPrimary: "#1D1D1F",
        textSecondary: "#6E6E73",
        shadowCard: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"
    };

    const popup = document.createElement("div");
    popup.id = "email-assistant-popup";
    popup.classList.add("cw-module-window");

    // Custom Scrollbar styles
    const scrollStyles = document.createElement("style");
    scrollStyles.textContent = `
        #email-template-list::-webkit-scrollbar {
            width: 4px;
        }
        #email-template-list::-webkit-scrollbar-track {
            background: transparent;
        }
        #email-template-list::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        #email-template-list::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.2);
        }
        @keyframes cw-floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .cw-animate-float {
            animation: cw-floating 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(scrollStyles);
    Object.assign(popup.style, stylePopup, {
        width: "850px",
        height: "650px",
        display: "none",
        flexDirection: "column",
        fontFamily: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif`,
        borderRadius: '12px',
        overflow: 'hidden'
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

    // --- PAINEL ESQUERDO (LISTA DE TEMPLATES) ---
    const leftPanel = document.createElement("div");
    Object.assign(leftPanel.style, {
        width: "320px",
        backgroundColor: '#EFEFF0',
        borderRight: `1px solid ${COLORS.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: "0"
    });

    const searchContainer = document.createElement("div");
    Object.assign(searchContainer.style, {
        padding: "16px",
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
        position: 'relative'
    });

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar templates...";
    Object.assign(searchInput.style, {
        width: "100%",
        padding: "10px 14px 10px 36px",
        borderRadius: "10px",
        border: '1.5px solid transparent',
        backgroundColor: '#E3E3E8',
        fontSize: "15px",
        outline: "none",
        boxSizing: "border-box",
        color: COLORS.textPrimary,
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%238A8A8E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "12px center",
        transition: 'all 0.2s ease-in-out'
    });
    searchInput.onfocus = () => {
        searchInput.style.backgroundColor = '#FFFFFF';
        searchInput.style.borderColor = COLORS.primary;
        searchInput.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
        searchInput.style.transform = 'scale(1.02)';
    };
    searchInput.onblur = () => {
        searchInput.style.backgroundColor = '#E3E3E8';
        searchInput.style.borderColor = 'transparent';
        searchInput.style.boxShadow = 'none';
        searchInput.style.transform = 'scale(1)';
    };


    const templateList = document.createElement("div");
    templateList.id = "email-template-list";
    Object.assign(templateList.style, {
        flex: "1",
        overflowY: "auto",
        padding: "8px",
        scrollBehavior: "smooth"
    });

    const clearSearch = document.createElement("div");
    clearSearch.innerHTML = "✕";
    Object.assign(clearSearch.style, {
        position: 'absolute',
        right: '26px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '10px',
        color: '#fff',
        cursor: 'pointer',
        display: 'none',
        backgroundColor: '#C7C7CC',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '16px',
        fontWeight: 'bold'
    });
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
    Object.assign(rightPanel.style, {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: COLORS.bgApp,
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
    });

    // Seção de Campos (Topo)
    const fieldsSection = document.createElement("div");
    Object.assign(fieldsSection.style, {
        padding: "20px",
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
        backgroundColor: COLORS.bgSurface,
        maxHeight: "250px",
        overflowY: "auto",
        display: "none"
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
        fontWeight: "600",
        color: COLORS.textSecondary,
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    });

    const previewActions = document.createElement("div");
    Object.assign(previewActions.style, {
        display: "flex",
        gap: "8px"
    });

    const createButton = (text, primary = false) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        Object.assign(btn.style, {
            padding: "8px 14px",
            borderRadius: "10px",
            border: primary ? 'none' : `1.5px solid ${COLORS.primary}`,
            background: primary ? COLORS.primary : "transparent",
            color: primary ? "#fff" : COLORS.primary,
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: primary ? '0 4px 12px rgba(0, 122, 255, 0.3)' : 'none'
        });
        btn.onmouseenter = () => {
            if (primary) {
                btn.style.backgroundColor = '#0062CC';
                btn.style.transform = 'translateY(-1px)';
                btn.style.boxShadow = '0 6px 16px rgba(0, 122, 255, 0.4)';
            } else {
                btn.style.backgroundColor = 'rgba(0, 122, 255, 0.05)';
            }
        };
        btn.onmouseleave = () => {
            if (primary) {
                btn.style.backgroundColor = COLORS.primary;
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 12px rgba(0, 122, 255, 0.3)';
            } else {
                btn.style.backgroundColor = 'transparent';
                btn.style.transform = 'translateY(0)';
            }
        };
        btn.onmousedown = () => btn.style.transform = 'scale(0.94)';
        btn.onmouseup = () => btn.style.transform = 'scale(1)';
        return btn;
    }

    const btnCopy = createButton("Copiar HTML");
    const btnFill = createButton("Preencher no CRM", true);
    const btnSmartCR = createButton("Smart CR");
    btnSmartCR.style.borderColor = '#E67E22';
    btnSmartCR.style.color = '#E67E22';
    btnSmartCR.style.display = 'none';

    previewActions.appendChild(btnSmartCR);
    previewActions.appendChild(btnCopy);
    previewActions.appendChild(btnFill);
    previewHeader.appendChild(previewTitle);
    previewHeader.appendChild(previewActions);

    const previewContent = document.createElement("div");
    previewContent.contentEditable = "true";
    Object.assign(previewContent.style, {
        flex: "1",
        backgroundColor: COLORS.bgSurface,
        border: `1px solid ${COLORS.borderSubtle}`,
        borderRadius: "8px",
        padding: "20px",
        fontSize: "15px",
        lineHeight: "1.6",
        color: COLORS.textPrimary,
        overflowY: "auto",
        outline: "none",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
    });

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
                <div style="padding: 40px 20px; text-align: center; color: ${COLORS.textSecondary}; opacity: 0.6;">
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
            Object.assign(catHeader.style, {
                padding: "12px 16px 12px 24px",
                fontSize: "11px",
                fontWeight: "700",
                color: COLORS.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                position: "sticky",
                top: "-8px",
                backgroundColor: 'rgba(239, 239, 240, 0.9)',
                zIndex: "10",
                backdropFilter: "blur(20px)",
                margin: "0 -8px 8px -8px",
                borderBottom: `0.5px solid ${COLORS.borderSubtle}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                userSelect: 'none',
                transition: 'background-color 0.2s ease'
            });

            catHeader.onmouseenter = () => catHeader.style.backgroundColor = 'rgba(230, 230, 232, 0.9)';
            catHeader.onmouseleave = () => catHeader.style.backgroundColor = 'rgba(239, 239, 240, 0.9)';

            const headerText = document.createElement("span");
            headerText.textContent = cat;
            catHeader.appendChild(headerText);

            const badge = document.createElement("span");
            badge.textContent = categoryItems.length;
            Object.assign(badge.style, {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '10px',
                color: COLORS.textSecondary
            });

            const arrow = document.createElement("span");
            arrow.innerHTML = isExpanded ? '􀄪' : '􀄫'; // SF Pro symbols (fallback if not available)
            // Using simpler chevrons if SF Pro is not there
            arrow.innerHTML = isExpanded ? '▾' : '▸';
            arrow.style.marginLeft = '8px';
            arrow.style.transition = 'transform 0.3s ease';

            const rightSide = document.createElement("div");
            rightSide.style.display = 'flex';
            rightSide.style.alignItems = 'center';
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

            templateList.appendChild(catHeader);

            if (!isExpanded) return;

            categoryItems.forEach(template => {
                const isSelected = selectedTemplate && selectedTemplate.id === template.id;
                const item = document.createElement("div");

                Object.assign(item.style, {
                    padding: "12px 14px",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                    borderRadius: "10px",
                    color: COLORS.textPrimary,
                    margin: '4px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: isSelected ? COLORS.primary : COLORS.bgSurface,
                    boxShadow: isSelected ? '0 4px 12px rgba(0, 122, 255, 0.3)' : '0 1px 2px rgba(0,0,0,0.05)',
                    border: isSelected ? 'none' : `1px solid ${COLORS.borderSubtle}`,
                    position: 'relative',
                    overflow: 'hidden'
                });

                if (isSelected) {
                    const indicator = document.createElement("div");
                    Object.assign(indicator.style, {
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        bottom: '0',
                        width: '4px',
                        backgroundColor: '#fff',
                        borderRadius: '0 4px 4px 0'
                    });
                    item.appendChild(indicator);
                }

                const icon = document.createElement("span");
                icon.innerHTML = template.isSmartCR ? '⚡' : (template.category === '👤 Pessoal' ? '👤' : '📄');
                icon.style.fontSize = '12px';
                icon.style.opacity = '0.7';
                icon.style.flexShrink = '0';
                item.appendChild(icon);

                const text = document.createElement("span");
                text.textContent = template.name;
                text.style.overflow = "hidden";
                text.style.textOverflow = "ellipsis";
                text.style.whiteSpace = "nowrap";
                text.style.flex = "1";
                item.appendChild(text);

                if (isSelected) {
                    item.style.color = "#fff";
                    item.style.fontWeight = "600";
                    icon.style.opacity = '1';
                }

                item.onmouseenter = () => {
                    if (!isSelected) {
                        item.style.backgroundColor = '#f8f8f9';
                        item.style.transform = 'translateY(-1px) scale(1.01)';
                        item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.08)';
                        item.style.borderColor = 'rgba(0, 122, 255, 0.2)';
                    }
                };
                item.onmouseleave = () => {
                    if (!isSelected) {
                        item.style.backgroundColor = COLORS.bgSurface;
                        item.style.transform = 'translateY(0) scale(1)';
                        item.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                        item.style.borderColor = COLORS.borderSubtle;
                    }
                };

                item.onmousedown = () => {
                    item.style.transform = isSelected ? 'scale(0.97)' : 'scale(0.98)';
                };
                item.onmouseup = () => {
                    item.style.transform = isSelected ? 'scale(1)' : 'translateY(-1px) scale(1.01)';
                };
                item.onclick = () => {
                    selectTemplate(template);
                };

                templateList.appendChild(item);
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
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px"
        });

        (selectedTemplate.placeholders || []).forEach(ph => {
            const container = document.createElement("div");
            const label = document.createElement("label");
            label.textContent = ph.label;
            Object.assign(label.style, {
                display: "block",
                fontSize: "11px",
                fontWeight: "700",
                color: COLORS.textSecondary,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
            });
            const input = document.createElement("input");
            input.type = ph.type || "text";
            input.dataset.key = ph.key;
            Object.assign(input.style, {
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: `1.5px solid ${COLORS.borderSubtle}`,
                backgroundColor: '#FBFBFD',
                fontSize: "14px",
                boxSizing: "border-box",
                transition: 'all 0.2s ease',
                outline: 'none'
            });

            input.onfocus = () => {
                input.style.borderColor = COLORS.primary;
                input.style.backgroundColor = '#FFFFFF';
                input.style.boxShadow = '0 0 0 4px rgba(0, 122, 255, 0.1)';
            };
            input.onblur = () => {
                input.style.borderColor = COLORS.borderSubtle;
                input.style.backgroundColor = '#FBFBFD';
                input.style.boxShadow = 'none';
            };

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
                            <!-- Google Colors Stripes on the envelope flap -->
                            <path d="M30 40L60 60L90 40" stroke="#4285F4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 80L50 65" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <path d="M90 80L70 65" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
                            <!-- Small Floating icons -->
                            <circle cx="95" cy="30" r="8" fill="#34A853"/>
                            <path d="M92 30H98M95 27V33" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <rect x="20" y="70" width="12" height="12" rx="3" fill="#4285F4" opacity="0.8"/>
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
