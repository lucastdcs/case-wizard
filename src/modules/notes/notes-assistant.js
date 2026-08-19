// src/modules/notes/notes-assistant.js

import { showToast, confirmDialog } from "../shared/utils.js";
import { notesState } from "./core/notes-state.js";
import { createNotesPopup, HEADER_DESC } from "./ui/notes-popup.js";
import { COLORS, RADIUS, SHADOW, EASE } from "./notes-styles.js";
import { buildDynamicForm } from "./core/form-builder.js";
import { generateOutputHtml } from "./core/output-generator.js";
import { createScenariosComponent } from "./components/step-scenarios.js";
import { createStepTasksComponent } from "./components/step-tasks.js";
import { createTagSupportModule } from "./tag-support.js";
import { createDraftsManager } from "./drafts/draft-ui.js";
import { createSplitTransferComponent } from "./components/split-transfer.js";
import { DraftService } from "./drafts/draft-service.js";
import { SoundManager } from "../shared/sound-manager.js";
import { enableFilledCheck, lockBodyScroll, unlockBodyScroll, markPendingField } from "../shared/dom-utils.js";
import { getPageData } from "../shared/page-data.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";
import {
    SUBSTATUS_TEMPLATES,
    SUBSTATUS_SHORTCODES,
    translations,
    scenarioSnippets,
    textareaListFields,
    TASKS_DB,
    getEffectiveRequiredFields,
    getEffectiveOptionalFields,
    getScenarioFields
} from "./data/notes-data.js";
import {
    copyHtmlToClipboard,
    ensureNoteCardIsOpen,
    triggerInputEvents
} from "./notes-bridge.js";
import { runEmailAutomation } from "../email-assistant/email-automation-service.js";
import { triggerProcessingAnimation, updateNotesBadge, registerCaseCompleted } from "../shared/command-center.js";
import { toggleGenieAnimation } from "../shared/animations.js";

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v4.0.0";

    // 1. Initialize UI
    const { popup, content, header, animRefs, credit } = createNotesPopup(CURRENT_VERSION, toggleVisibility);

    // 2. Initialize Sub-modules
    const tagSupport = createTagSupportModule(t);
    const stepTasks = createStepTasksComponent(() => {
        updateTagSupport();
        notesState.setActiveTasks(stepTasks.getCheckedElements());
    }, t, notesState);

    const scenariosContainer = document.createElement("div");
    scenariosContainer.style.display = "none";
    const scenarioSelector = createScenariosComponent((scenarioId, isSelected) => {
        applyScenario(scenarioId, isSelected);
    });
    scenariosContainer.appendChild(scenarioSelector);

    // --- Evidence Container (Attempted Contact) ---
    const evidenceContainer = document.createElement("div");
    evidenceContainer.id = "evidence-container";
    Object.assign(evidenceContainer.style, {
        display: "none",
        marginTop: "16px",
        padding: "16px",
        background: COLORS.bgInput,
        border: `1px solid ${COLORS.border}`,
        borderRadius: RADIUS.medium,
        boxShadow: SHADOW.subtle
    });

    const evidenceTitle = document.createElement("div");
    evidenceTitle.className = "cw-section-title";
    evidenceTitle.textContent = t('evidencias_contato');
    evidenceContainer.appendChild(evidenceTitle);

    const evidenceInputs = {};
    const createEvidenceInput = (id, labelText) => {
        const wrapper = document.createElement("div");
        wrapper.style.marginBottom = "12px";
        const label = document.createElement("label");
        label.textContent = labelText;
        label.setAttribute("for", id);
        label.style.cssText = `display: block; font-size: 11px; font-weight: 700; color: ${COLORS.textSub}; margin-bottom: 6px; text-transform: uppercase;`;
        const input = document.createElement("input");
        input.type = "text";
        input.id = id;
        input.className = "cw-input";
        input.placeholder = "https://screenshot.googleplex.com/...";
        input.style.marginBottom = "0";
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        enableFilledCheck(input, { minLength: 8 }); // link de evidência - poucos caracteres ainda não é um link válido
        evidenceInputs[id] = input;
        return wrapper;
    };

    evidenceContainer.appendChild(createEvidenceInput("evidence-l1", t('ligacao_1')));
    evidenceContainer.appendChild(createEvidenceInput("evidence-l2", t('ligacao_2')));
    evidenceContainer.appendChild(createEvidenceInput("evidence-msg", t('mensagem_am')));

    // 3. Drafts Manager (Needs to be initialized before actions)
    const draftsManager = createDraftsManager({
        onSaveCurrent: async () => {
            const state = await collectFullState();
            resetModule();
            return state;
        },
        onLoadDraft: (draft) => {
            restoreFullState(draft);
        },
        t: (key) => t(key)
    });

    // 4. Build Main Layout Sections
    const langTypeSection = createLangTypeSection();
    const statusSection = createStatusSection();
    const dynamicFormContainer = document.createElement("div");
    const emptyStateContainer = createEmptyState();
    const actionsSection = createActionsSection(draftsManager, t);

    content.appendChild(langTypeSection);
    content.appendChild(statusSection);
    content.appendChild(emptyStateContainer);
    content.appendChild(scenariosContainer);
    content.appendChild(dynamicFormContainer);
    content.appendChild(evidenceContainer);

    // Hide tasks and screenshots initially
    stepTasks.selectionElement.style.display = "none";
    stepTasks.screenshotsElement.style.display = "none";

    // Manual Task Toggle Button
    const manualTaskBtn = document.createElement("button");
    manualTaskBtn.id = "manual-task-toggle";
    manualTaskBtn.textContent = t('gostaria_de_adicionar_uma_task') || "Gostaria de adicionar uma task";
    manualTaskBtn.style.cssText = `display: none; width: 100%; padding: 14px; border: 2px dashed ${COLORS.primary}; background: ${COLORS.surface}; color: ${COLORS.primary}; border-radius: ${RADIUS.medium}; cursor: pointer; font-size: 13px; font-weight: 700; margin-top: 8px; transition: all 0.2s ${EASE}; text-transform: uppercase; letter-spacing: 0.5px;`;
    manualTaskBtn.onmouseenter = () => { manualTaskBtn.style.background = COLORS.primaryBg; };
    manualTaskBtn.onmouseleave = () => { manualTaskBtn.style.background = COLORS.surface; };
    manualTaskBtn.onclick = () => {
        stepTasks.selectionElement.style.display = "block";
        stepTasks.screenshotsElement.style.display = "block";
        manualTaskBtn.style.display = "none";
    };
    content.appendChild(manualTaskBtn);

    content.appendChild(stepTasks.selectionElement);
    content.appendChild(tagSupport.element);
    content.appendChild(stepTasks.screenshotsElement);

    content.appendChild(actionsSection);

    // 5. Split View Integration
    const splitContent = document.createElement("div");
    splitContent.style.display = "none";
    splitContent.style.flexGrow = "1";
    splitContent.style.minHeight = "0";
    splitContent.style.overflow = "hidden";
    const splitComponent = createSplitTransferComponent(() => toggleSplitView());
    splitComponent.style.height = "100%";
    splitContent.appendChild(splitComponent);
    popup.insertBefore(splitContent, credit);

    // 6. Header Integration
    const headerActions = header.lastElementChild;
    if (headerActions) {
        headerActions.insertBefore(draftsManager.historyBtnWrapper, headerActions.firstChild);
        headerActions.insertBefore(createSplitToggleButton(), headerActions.firstChild);
    }
    popup.appendChild(draftsManager.drawer);

    // 7. State Synchronization & Autosave (Airbag)
    let autosaveTimeout = null;
    notesState.subscribe((state) => {
        updateUIFromState(state);
        refreshGlobalBadge();

        // Autosave logic
        if (state.isDirty) {
            if (autosaveTimeout) clearTimeout(autosaveTimeout);
            autosaveTimeout = setTimeout(async () => {
                const fullState = await collectFullState(true); // Fast save
                if (fullState.subStatus) {
                    DraftService.saveEmergency(fullState);
                } else {
                    DraftService.clearEmergency();
                }
                state.isDirty = false;
            }, 2000);
        } else {
            if (autosaveTimeout) {
                clearTimeout(autosaveTimeout);
                autosaveTimeout = null;
            }
        }
    });

    // --- Helper Functions ---

    function refreshGlobalBadge() {
        const hasDrafts = DraftService.getCount() > 0;
        const isWriting = !!notesState.currentSubStatus;
        updateNotesBadge(hasDrafts || isWriting);
    }

    function toggleVisibility() {
        notesState.visible = !notesState.visible;
        if (notesState.visible) lockBodyScroll(); else unlockBodyScroll();
        toggleGenieAnimation(notesState.visible, popup, "cw-btn-notes");
    }

    function toggleSplitView() {
        notesState.isSplitView = !notesState.isSplitView;
        if (notesState.isSplitView) {
            content.style.display = 'none';
            splitContent.style.display = 'flex';
            splitContent.style.flexDirection = 'column';
            if(animRefs.googleLine) animRefs.googleLine.style.background = "linear-gradient(to right, #8e24aa, #7b1fa2)";
        } else {
            content.style.display = 'flex';
            splitContent.style.display = 'none';
            if(animRefs.googleLine) animRefs.googleLine.style.background = 'linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)';
        }
    }

    function createLangTypeSection() {
        const div = document.createElement("div");
        div.innerHTML = `
            <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-fluxo" style="font-size: 10px; margin-bottom: 6px;">${t('fluxo')}</div>
                    <div class="cw-segmented-control" id="type-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-type="bau" class="active" style="z-index:2">BAU</button>
                        <button data-type="lm" style="z-index:2">LM</button>
                    </div>
                </div>
                <div style="flex: 1;">
                    <div class="cw-section-title js-label-portugal" style="font-size: 10px; margin-bottom: 6px;">${t('caso_portugal')}</div>
                    <div class="cw-segmented-control" id="portugal-selector">
                        <div class="cw-segmented-indicator"></div>
                        <button data-val="false" class="active" style="z-index:2">${t('nao')}</button>
                        <button data-val="true" style="z-index:2">${t('sim')}</button>
                    </div>
                </div>
            </div>
        `;
        
        // CSS for Segmented Control
        if (!document.getElementById('cw-segmented-styles')) {
            const style = document.createElement('style');
            style.id = 'cw-segmented-styles';
            style.innerHTML = `
                .cw-segmented-control {
                    display: flex;
                    background: ${COLORS.bgInput};
                    padding: 3px;
                    border-radius: 100px;
                    gap: 2px;
                    border: 1px solid ${COLORS.border};
                    position: relative;
                    overflow: hidden;
                }
                .cw-segmented-control button {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 6px 4px;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.3s ${EASE};
                    color: ${COLORS.textSub};
                    position: relative;
                }
                .cw-segmented-control button.active {
                    color: #fff;
                }
                .cw-segmented-control button:hover:not(.active) {
                    background: rgba(0,0,0,0.03);
                    color: ${COLORS.text};
                }
                .cw-segmented-indicator {
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    bottom: 3px;
                    width: calc(50% - 4px);
                    background: ${COLORS.primary};
                    border-radius: 100px;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
                }
            `;
            document.head.appendChild(style);
        }

        const updateIndicator = (selectorId, index) => {
            const selector = div.querySelector(`#${selectorId}`);
            const indicator = selector.querySelector('.cw-segmented-indicator');
            if (indicator) {
                indicator.style.transform = `translateX(${index * 100}%) translateX(${index * 2}px)`;
            }
        };

        div.querySelectorAll('#type-selector button').forEach((btn, idx) => {
            btn.onclick = () => {
                notesState.setCaseType(btn.dataset.type);
                div.querySelectorAll('#type-selector button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateIndicator('type-selector', idx);
                SoundManager.playClick();
                if (notesState.currentSubStatus) {
                    onSubStatusChange(notesState.currentSubStatus);
                }
            };
        });

        div.querySelectorAll('#portugal-selector button').forEach((btn, idx) => {
            btn.onclick = () => {
                notesState.setPortugalCase(btn.dataset.val === "true");
                div.querySelectorAll('#portugal-selector button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateIndicator('portugal-selector', idx);
                SoundManager.playClick();
                if (notesState.currentSubStatus) {
                    onSubStatusChange(notesState.currentSubStatus);
                }
            };
        });

        return div;
    }

    function createStatusSection() {
        const div = document.createElement("div");
        div.className = "cw-status-section";
        div.style.cssText = "display: flex; flex-direction: column; gap: 8px;";
        div.innerHTML = `
            <label class="cw-section-title js-label-status" for="main-status-select" style="margin-top: 8px;">${t('status_principal')}</label>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${t('select_status')}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <label class="cw-section-title js-label-substatus" for="sub-status-select" style="margin-top: 8px;">${t('substatus')}</label>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${t('select_substatus')}</option>
            </select>
        `;

        const mainSelect = div.querySelector('#main-status-select');
        const subSelect = div.querySelector('#sub-status-select');

        mainSelect.onchange = () => {
            notesState.setStatus(mainSelect.value);
            updateSubStatusOptions(mainSelect.value, subSelect);
            notesState.setSubStatus("");
            onSubStatusChange(""); // Clear UI when main status changes
        };

        subSelect.onchange = () => {
            notesState.setSubStatus(subSelect.value);
            onSubStatusChange(subSelect.value);
        };

        return div;
    }

    function getEvidenceData() {
        if (evidenceContainer.style.display === "none") return null;
        return {
            l1: evidenceInputs["evidence-l1"]?.value.trim() || "",
            l2: evidenceInputs["evidence-l2"]?.value.trim() || "",
            msg: evidenceInputs["evidence-msg"]?.value.trim() || ""
        };
    }

    function updateSubStatusOptions(status, subSelect) {
        subSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
        if (!status) {
            subSelect.disabled = true;
            return;
        }

        // IN é a única lista longa o bastante (8 itens) pra ter um subgrupo
        // real dentro dela: "Fora de Escopo" já é uma categoria com nome
        // próprio nos dados (Out_of_Scope_*), então o <optgroup> aqui separa
        // informação de verdade, não só decora. Os demais status têm poucos
        // itens (2 a 4) e nenhum subgrupo natural — envolvê-los num optgroup
        // não ajudaria em nada a escanear a lista.
        const outOfScopeGroup = status === 'IN'
            ? (() => {
                const g = document.createElement("optgroup");
                g.label = "Fora de Escopo";
                return g;
            })()
            : null;

        for (const key in SUBSTATUS_TEMPLATES) {
            if (SUBSTATUS_TEMPLATES[key].status === status) {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = SUBSTATUS_TEMPLATES[key].name;

                if (outOfScopeGroup && key.startsWith('IN_Out_of_Scope')) {
                    outOfScopeGroup.appendChild(opt);
                } else {
                    subSelect.appendChild(opt);
                }
            }
        }
        if (outOfScopeGroup && outOfScopeGroup.children.length > 0) {
            subSelect.appendChild(outOfScopeGroup);
        }
        subSelect.disabled = false;
    }

    function onSubStatusChange(subStatusKey) {
        const templateData = SUBSTATUS_TEMPLATES[subStatusKey];
        const isAttemptedContact = subStatusKey === "NI_Attempted_Contact" ||
                                   (templateData && templateData.name && templateData.name.toLowerCase().includes("attempted contact"));

        if (scenarioSelector.render) {
            scenarioSelector.render(subStatusKey, notesState.currentCaseType);
        }

        if (!subStatusKey) {
            evidenceContainer.style.display = "none";
            if (evidenceInputs["evidence-l1"]) evidenceInputs["evidence-l1"].value = "";
            if (evidenceInputs["evidence-l2"]) evidenceInputs["evidence-l2"].value = "";
            if (evidenceInputs["evidence-msg"]) evidenceInputs["evidence-msg"].value = "";

            scenariosContainer.style.display = "none";
            dynamicFormContainer.style.display = "none";
            const manualBtn = document.getElementById("manual-task-toggle");
            if (manualBtn) manualBtn.style.display = "none";
            stepTasks.selectionElement.style.display = "none";
            stepTasks.screenshotsElement.style.display = "none";

            // Show Empty State
            emptyStateContainer.style.display = "flex";
            emptyStateContainer.style.opacity = "1";
            actionsSection.style.display = "none";
            return;
        }

        // Toggle Evidence Container
        if (isAttemptedContact) {
            evidenceContainer.style.display = "block";
        } else {
            evidenceContainer.style.display = "none";
            if (evidenceInputs["evidence-l1"]) evidenceInputs["evidence-l1"].value = "";
            if (evidenceInputs["evidence-l2"]) evidenceInputs["evidence-l2"].value = "";
            if (evidenceInputs["evidence-msg"]) evidenceInputs["evidence-msg"].value = "";
        }

        // Hide Empty State
        emptyStateContainer.style.opacity = "0";
        setTimeout(() => {
            if (notesState.currentSubStatus) emptyStateContainer.style.display = "none";
        }, 400);

        // Show Actions
        actionsSection.style.display = "grid";

        // 1. Initialize Active Fields from Template
        // Campos opcionais (sensíveis ao template — ver getEffectiveOptionalFields)
        // começam escondidos — o agente adiciona pelo "+ adicionar campo" se precisar.
        if (templateData && templateData.templateFields) {
            const optionalNow = getEffectiveOptionalFields(templateData);
            notesState.setActiveFields(
                templateData.templateFields.filter((f) => !optionalNow.includes(f))
            );
        }

        // 2. Adjust for Case Type (LM/BAU) and Portugal Case
        adjustActiveFieldsForContext();

        // 3. Rebuild Form
        buildDynamicForm(subStatusKey, dynamicFormContainer, notesState);
        dynamicFormContainer.style.display = "block";

        // 4. Show Scenarios if applicable
        scenariosContainer.style.display = "block";

        // 5. Update Tasks focus
        const isSo = subStatusKey.startsWith("SO_");
        const isAv = subStatusKey === "NI_Awaiting_Validation";
        const manualTaskBtn = document.getElementById("manual-task-toggle");

        if (isSo || isAv) {
            stepTasks.selectionElement.style.display = "block";
            manualTaskBtn.style.display = "none";
        } else {
            stepTasks.selectionElement.style.display = "none";
            stepTasks.screenshotsElement.style.display = "none";
            manualTaskBtn.style.display = "block";
        }

        const mode = subStatusKey === "SO_Education_Only" ? "education" : "implementation";
        notesState.setScreenshotMode(mode);

        stepTasks.updateSubStatus(subStatusKey);
        updateTagSupport();

        // Show/Hide Email Toggle based on shortcode availability
        const emailToggle = document.getElementById('email-automation-toggle-row');
        if (emailToggle) {
            emailToggle.style.display = SUBSTATUS_SHORTCODES[subStatusKey] ? "flex" : "none";
        }
    }

    function updateTagSupport() {
        const checked = stepTasks.getCheckedElements().map(c => c.value);
        tagSupport.updateVisibility(notesState.currentSubStatus, checked);
    }

    function applyScenario(scenarioId, isSelected) {
        const data = getScenarioFields(scenarioSnippets[scenarioId], notesState.currentLang, scenarioId);
        if (!data) return;

        for (const key in data) {
            if (key === 'linkedTask') {
                stepTasks.toggleTask(data.linkedTask, isSelected);
            } else if (key === 'activeTasks') {
                data.activeTasks.forEach(t => {
                    if (isSelected) {
                        stepTasks.setTaskCount(t.value, t.count);
                    } else {
                        // Ao desmarcar, removemos se o contador for igual ao do snippet
                        // (Lógica simplificada para evitar remover tasks de outros snippets)
                        stepTasks.setTaskCount(t.value, 0);
                    }
                });
            } else if (key.startsWith('field-')) {
                const fieldId = key;
                const value = data[key];
                const el = document.getElementById(fieldId);
                if (el) {
                    const isListField = textareaListFields.includes(fieldId.replace('field-', ''));
                    if (isSelected) {
                        if (isListField) {
                            const currentVal = el.value.trim();
                            if (!currentVal.includes(value.trim())) {
                                el.value = currentVal ? (currentVal + "\n" + value.trim()) : value.trim();
                            }
                        } else {
                            el.value = value;
                        }
                    } else {
                        // LOGICA DE REMOÇÃO (UNSELECT)
                        if (isListField) {
                            const currentVal = el.value.trim();
                            const snippetVal = value.trim();
                            if (currentVal.includes(snippetVal)) {
                                // Remove o snippet e limpa quebras de linha duplicadas
                                el.value = currentVal.replace(snippetVal, "").trim().replace(/\n{3,}/g, '\n\n');
                            }
                        } else {
                            // Para campos normais, limpa se for exatamente igual
                            if (el.value.trim() === value.trim()) {
                                el.value = "";
                            }
                        }
                    }
                    notesState.updateField(fieldId, el.value);
                    el.dispatchEvent(new Event('input'));
                }
            }
        }
    }

    function createActionsSection(draftsManager, t) {
        const div = document.createElement("div");
        div.className = "cw-actions-section";
        div.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 10px;
            margin-top: 16px;
            background: ${COLORS.bgInput};
            border-radius: 12px;
            border: 1px solid ${COLORS.border};
        `;

        if (!document.getElementById('cw-actions-hover-styles')) {
            const style = document.createElement('style');
            style.id = 'cw-actions-hover-styles';
            style.innerHTML = `
                .cw-actions-section button {
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    position: relative;
                    overflow: hidden;
                }
                .cw-actions-section button:active {
                    transform: scale(0.98) !important;
                }
                .cw-actions-section .js-btn-generate:hover {
                    background: #1765cc !important;
                    box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-copy:hover {
                    background: #f8f9fa !important;
                    border-color: ${COLORS.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.1) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-reset:hover {
                    background: #fff5f5 !important;
                    border-color: #ff8787 !important;
                    color: #e03131 !important;
                    box-shadow: 0 2px 8px rgba(234, 67, 53, 0.1) !important;
                    transform: translateY(-1px);
                }
                .cw-actions-section .js-btn-park:hover {
                    background: #f0f7ff !important;
                    color: ${COLORS.primary} !important;
                    box-shadow: 0 2px 8px rgba(66, 133, 244, 0.05) !important;
                    transform: translateY(-1px);
                }
            `;
            document.head.appendChild(style);
        }

        const emailRow = document.createElement("div");
        emailRow.id = "email-automation-toggle-row";
        emailRow.style.cssText = "grid-column: 1 / -1; display: none; align-items: center; justify-content: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 2px;";
        emailRow.innerHTML = `
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 10.5px; font-weight: 600; color: ${COLORS.textSub};">
                <input type="checkbox" id="email-automation-checkbox" checked style="width: 13px; height: 13px; accent-color: ${COLORS.primary};">
                <span class="js-label-email-toggle">${t('preencher_email_automaticamente')}</span>
            </label>
        `;
        
        const parkBtn = draftsManager.parkButton;
        parkBtn.classList.add('js-btn-park');
        parkBtn.style.cssText = `width: 100%; margin: 0; border-radius: 10px; height: 34px; font-weight: 600; font-size: 11.5px;`;

        const btnReset = document.createElement("button");
        btnReset.className = "cw-btn-secondary js-btn-reset";
        btnReset.textContent = t('limpar');
        btnReset.style.cssText = `width: 100%; height: 34px; background: ${COLORS.surface}; color: ${COLORS.textSub}; border: 1px solid ${COLORS.border}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`;
        btnReset.onclick = () => resetModule();

        const btnCopy = document.createElement("button");
        btnCopy.className = "cw-btn-secondary js-btn-copy";
        btnCopy.textContent = t('copiar');
        btnCopy.style.cssText = `width: 100%; height: 34px; background: ${COLORS.surface}; color: ${COLORS.primary}; border: 1px solid ${COLORS.primary}; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 11.5px;`;
        btnCopy.onclick = () => handleCopy();

        const btnGenerate = document.createElement("button");
        btnGenerate.className = "cw-btn-primary js-btn-generate";
        btnGenerate.textContent = t('preencher');
        btnGenerate.style.cssText = `width: 100%; height: 38px; background: ${COLORS.primary}; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; grid-column: 1 / -1; font-size: 12.5px; box-shadow: 0 4px 10px rgba(26, 115, 232, 0.2); margin-top: 0px;`;
        btnGenerate.onclick = () => handleGenerate();

        div.appendChild(emailRow);
        div.appendChild(parkBtn);
        div.appendChild(btnReset);
        div.appendChild(btnCopy);
        div.appendChild(btnGenerate);

        return div;
    }

    async function handleCopy() {
        if (!notesState.currentSubStatus) {
            SoundManager.playError();
            showToast(t('select_substatus'), { error: true });
            return;
        }
        const html = generateOutputHtml(notesState, stepTasks, tagSupport, getEvidenceData());
        if (html) {
            copyHtmlToClipboard(html);
            showToast(t('copiado_sucesso'));
            SoundManager.playClick();
        } else {
            SoundManager.playError();
            showToast(t('select_substatus'), { error: true });
        }
    }

    async function handleGenerate() {
        if (!notesState.currentSubStatus) {
            SoundManager.playError();
            showToast(t('select_substatus'), { error: true });
            return;
        }

        const templateData = SUBSTATUS_TEMPLATES[notesState.currentSubStatus];

        const missingRequired = getEffectiveRequiredFields(templateData).filter((fieldName) => {
            if (!notesState.activeFields.includes(fieldName)) return false;
            const value = notesState.formData[`field-${fieldName}`];
            return !value || !value.trim();
        });
        if (missingRequired.length > 0) {
            SoundManager.playError();
            showToast(`Preencha o campo obrigatório antes de gerar: ${t(missingRequired[0].toLowerCase())}`, { error: true });
            return;
        }

        if (templateData?.requiresTasks && stepTasks.getCheckedElements().length === 0) {
            SoundManager.playError();
            showToast("Selecione ao menos uma tarefa antes de gerar a nota.", { error: true });
            return;
        }

        const html = generateOutputHtml(notesState, stepTasks, tagSupport, getEvidenceData());

        copyHtmlToClipboard(html);
        toggleVisibility();
        const finishLoading = triggerProcessingAnimation();

        const field = await ensureNoteCardIsOpen();
        if (field) {
            field.focus();
            document.execCommand("insertHTML", false, html);
            triggerInputEvents(field);

            const emailCheckbox = document.getElementById('email-automation-checkbox');
            const emailEnabled = emailCheckbox ? emailCheckbox.checked : true;

            if (emailEnabled && notesState.currentSubStatus && SUBSTATUS_SHORTCODES[notesState.currentSubStatus]) {
                await runEmailAutomation(SUBSTATUS_SHORTCODES[notesState.currentSubStatus]);
            }

            showToast(t('inserido_copiado'));
            SoundManager.playSuccess();
            registerCaseCompleted(); // nota inserida com sucesso = 1 caso concluído no ritmo do turno
            resetModule();
        } else {
            // ensureNoteCardIsOpen() não achou/abriu o editor de nota no CRM
            // a tempo. O HTML já foi copiado pra área de transferência antes
            // (linha acima), então o conteúdo não se perde — mas o popup
            // tinha sido fechado como se tivesse dado certo, deixando o
            // agente sem nenhum aviso de que a nota não foi inserida.
            SoundManager.playError();
            showToast("Não foi possível abrir a nota no CRM. O conteúdo já está copiado — cole manualmente.", { error: true });
            toggleVisibility();
        }
        finishLoading();
    }

    function adjustActiveFieldsForContext() {
        if (!notesState.currentSubStatus) return;

        // Auto-remove ON_CALL for LM
        if (notesState.currentCaseType === "lm") {
            notesState.removeField("ON_CALL");
        } else {
            // Restore ON_CALL for BAU if it was in the template but removed by LM
            const templateData = SUBSTATUS_TEMPLATES[notesState.currentSubStatus];
            if (templateData && templateData.templateFields.includes("ON_CALL")) {
                notesState.addFieldAt("ON_CALL", 1); // Usually after SPEAKEASY_ID
            }
        }

        // Handle Portugal Case fields
        if (notesState.isPortugalCase) {
            notesState.addFieldAt("CASO_PORTUGAL", 1);
            notesState.addFieldAt("CONSENTIU_GRAVACAO", 2);
        } else {
            notesState.removeField("CASO_PORTUGAL");
            notesState.removeField("CONSENTIU_GRAVACAO");
        }
    }

    function resetModule() {
        notesState.reset();
        stepTasks.reset();
        tagSupport.reset();
        refreshGlobalBadge();
        DraftService.clearEmergency();
        // Reset UI elements
        content.querySelectorAll('select').forEach(s => s.value = "");
        content.querySelector('#sub-status-select').disabled = true;
        const emailRow = document.getElementById('email-automation-toggle-row');
        if (emailRow) emailRow.style.display = 'none';
        dynamicFormContainer.innerHTML = "";
        scenariosContainer.style.display = "none";
        emptyStateContainer.style.display = "flex";
        emptyStateContainer.style.opacity = "1";
        actionsSection.style.display = "none";
        if (document.getElementById("manual-task-toggle")) {
            document.getElementById("manual-task-toggle").style.display = "none";
        }
        stepTasks.selectionElement.style.display = "none";
        stepTasks.screenshotsElement.style.display = "none";

        // Reset Evidence UI
        evidenceContainer.style.display = "none";
        if (evidenceInputs["evidence-l1"]) evidenceInputs["evidence-l1"].value = "";
        if (evidenceInputs["evidence-l2"]) evidenceInputs["evidence-l2"].value = "";
        if (evidenceInputs["evidence-msg"]) evidenceInputs["evidence-msg"].value = "";
    }

    async function collectFullState(isEmergency = false) {
        // Collect everything needed for a draft
        const formData = {};
        dynamicFormContainer.querySelectorAll('input, textarea, select').forEach(el => {
            if (el.id.startsWith('field-') || el.id === 'consent-select') {
                formData[el.id] = el.value;
            }
        });

        let clientName = "Cliente";
        let cid = "---";

        if (!isEmergency) {
            try {
                const pageData = await getPageData();
                clientName = pageData.advertiserName;
                cid = pageData.cid;
            } catch (e) { console.warn("Erro ao coletar pageData:", e); }
        }

        const activeTasks = stepTasks.getCheckedElements().map(c => ({
            key: c.value,
            count: c.count
        }));

        // Generate Summary Tags for the UI
        const summaryTags = activeTasks.map(t => {
            const taskInfo = TASKS_DB[t.key];
            return taskInfo ? taskInfo.name : t.key;
        });

        return {
            currentCaseType: notesState.currentCaseType,
            currentLang: notesState.currentLang,
            isPortugalCase: notesState.isPortugalCase,
            consent: notesState.consent,
            tagSupportUsed: notesState.tagSupportUsed,
            forcedScreenshots: [...notesState.forcedScreenshots],
            activeFields: notesState.activeFields,
            status: notesState.currentStatus,
            subStatus: notesState.currentSubStatus,
            formData: formData,
            activeTasks: activeTasks,
            summaryTags: summaryTags,
            clientName: clientName,
            cid: cid,
            timestamp: new Date().toISOString()
        };
    }

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function restoreFullState(draft) {
        // O idioma da nota não é mais restaurado do rascunho: ele segue o
        // idioma global do Case Wizard (Configurações), unificado com a
        // interface, então continua o que já estiver ativo no momento.
        notesState.setCaseType(draft.currentCaseType || "bau");
        notesState.setPortugalCase(draft.isPortugalCase || false);
        notesState.setConsent(draft.consent || false);
        if (draft.activeFields) {
            notesState.setActiveFields(draft.activeFields);
        }

        // Update Segmented Controls visually
        const typeBtn = content.querySelector(`#type-selector button[data-type="${notesState.currentCaseType}"]`);
        if (typeBtn) typeBtn.classList.add('active');
        content.querySelectorAll('#type-selector button').forEach(b => { if(b !== typeBtn) b.classList.remove('active'); });

        const portBtn = content.querySelector(`#portugal-selector button[data-val="${notesState.isPortugalCase}"]`);
        if (portBtn) portBtn.classList.add('active');
        content.querySelectorAll('#portugal-selector button').forEach(b => { if(b !== portBtn) b.classList.remove('active'); });

        if (draft.status) {
            const mainSelect = content.querySelector('#main-status-select');
            mainSelect.value = draft.status;
            notesState.setStatus(draft.status);

            const subSelect = content.querySelector('#sub-status-select');
            updateSubStatusOptions(draft.status, subSelect);

            await wait(50);
            if (draft.subStatus) {
                subSelect.value = draft.subStatus;
                notesState.setSubStatus(draft.subStatus);
                onSubStatusChange(draft.subStatus);

                await wait(100);

                // Restore Tag Support
                if (draft.tagSupportUsed !== undefined) {
                    notesState.setTagSupportUsed(draft.tagSupportUsed);
                    const tsSim = tagSupport.element.querySelector('input[value="Sim"]');
                    const tsNao = tagSupport.element.querySelector('input[value="Não"]');
                    if (draft.tagSupportUsed && tsSim) tsSim.checked = true;
                    else if (tsNao) tsNao.checked = true;
                    tagSupport.element.querySelector('div:last-child').style.display = draft.tagSupportUsed ? 'none' : 'block';
                }

                if (draft.forcedScreenshots) {
                    notesState.setForcedScreenshots(draft.forcedScreenshots);
                }

                // Restore Form Fields
                for (const id in draft.formData) {
                    const el = document.getElementById(id);
                    if (el) {
                        el.value = draft.formData[id];
                        notesState.updateField(id, el.value);
                    }
                }

                // Restore Tasks
                if (draft.activeTasks) {
                    draft.activeTasks.forEach(t => stepTasks.setTaskCount(t.key, t.count));
                    notesState.setActiveTasks(stepTasks.getCheckedElements());
                }
            }
        }
        notesState.isDirty = false;
    }

    // Quick Launch (Ctrl+K -> preset de nota): abre o Case Notes já no
    // status/substatus certo e com o cenário mais usado aplicado, pra quem
    // hoje copia e cola essas notas em vez de passar pelo fluxo normal. Não
    // reimplementa nada - só encadeia as mesmas peças que o clique manual já
    // usa (troca de select, onSubStatusChange, clique no chip do cenário),
    // então herda de graça qualquer ajuste futuro nelas.
    async function openWithPreset(scenarioId) {
        const scenario = scenarioSnippets[scenarioId];
        const preset = scenario && scenario.quickLaunch;
        if (!preset) return;

        if (notesState.isDirty) {
            const confirmed = await confirmDialog("Isso vai substituir o rascunho atual da nota. Deseja continuar?");
            if (!confirmed) return;
        }

        const wasVisible = notesState.visible;
        if (!wasVisible) toggleVisibility();
        resetModule();

        // Se o popup ainda não estava aberto, dá tempo do voo do genie
        // (~550ms, ver animations.js) terminar antes de mexer nos campos -
        // trocar os selects no meio da animação de abertura ficava estranho.
        if (!wasVisible) await wait(550);

        const mainSelect = content.querySelector('#main-status-select');
        const subSelect = content.querySelector('#sub-status-select');
        mainSelect.value = preset.status;
        notesState.setStatus(preset.status);
        updateSubStatusOptions(preset.status, subSelect);

        await wait(60);

        subSelect.value = preset.subStatus;
        notesState.setSubStatus(preset.subStatus);
        onSubStatusChange(preset.subStatus);

        await wait(160);

        // Clique real no chip (não chama applyScenario direto): assim o
        // cenário aparece visualmente selecionado, com o mesmo som de clique
        // de sempre - igual a um agente teria feito na mão.
        const chip = scenariosContainer.querySelector(`[data-id="${scenarioId}"]`);
        if (chip) chip.click();

        await wait(120);
        SoundManager.playSuccess();

        const pendingId = (preset.focusIds || []).find((id) => {
            const el = document.getElementById(id);
            return el && !el.value.trim();
        });
        if (pendingId) markPendingField(document.getElementById(pendingId));
    }

    function t(key) {
        return translations[notesState.currentLang]?.[key] || translations['pt']?.[key] || key;
    }

    function createSplitToggleButton() {
        const btn = document.createElement("div");
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`;
        btn.style.cssText = "width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;";
        btn.onclick = (e) => { e.stopPropagation(); toggleSplitView(); };
        btn.title = "Alternar para Split & Transfer";
        return btn;
    }

    function createEmptyState() {
        const div = document.createElement("div");
        div.id = "notes-empty-state";
        div.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            flex-grow: 1;
            transition: all 0.4s ${EASE};
        `;

        div.innerHTML = `
            <div style="width: 140px; height: 140px; margin-bottom: 8px;">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="50" fill="#f8f9fa"/>
                    <rect x="35" y="25" width="50" height="70" rx="8" fill="white" stroke="#e8eaed" stroke-width="2"/>
                    <rect x="45" y="40" width="30" height="4" rx="2" fill="#4285F4" opacity="0.6"/>
                    <rect x="45" y="52" width="30" height="4" rx="2" fill="#EA4335" opacity="0.6"/>
                    <rect x="45" y="64" width="20" height="4" rx="2" fill="#FBBC05" opacity="0.6"/>
                    <circle cx="85" cy="85" r="18" fill="#34A853"/>
                    <path d="M85 77V93M77 85H93" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </div>
            <div style="text-align: center;">
                <div style="font-family: 'Google Sans', sans-serif; font-size: 16px; font-weight: 600; color: ${COLORS.text}; margin-bottom: 4px;">
                    ${t('pronto_comecar') || 'Pronto para começar?'}
                </div>
                <div style="font-size: 13px; color: ${COLORS.textSub}; line-height: 1.6; opacity: 0.8;">
                    ${t('selecione_status_ajuda') || 'Selecione um status e substatus para<br>começar a sua nota técnica.'}
                </div>
            </div>
        `;
        return div;
    }


    function updateUIFromState(state) {
        // Sync labels when language changes
        const lFluxo = content.querySelector('.js-label-fluxo');
        if (lFluxo) lFluxo.textContent = t('fluxo');
        const lPortugal = content.querySelector('.js-label-portugal');
        if (lPortugal) lPortugal.textContent = t('caso_portugal');
        const portugalBtns = content.querySelectorAll('#portugal-selector button');
        if (portugalBtns.length === 2) {
            portugalBtns[0].textContent = t('nao');
            portugalBtns[1].textContent = t('sim');
        }
        const lStatus = content.querySelector('.js-label-status');
        if (lStatus) lStatus.textContent = t('status_principal');
        const lSubstatus = content.querySelector('.js-label-substatus');
        if (lSubstatus) lSubstatus.textContent = t('substatus');

        const btnCopy = content.querySelector('.js-btn-copy');
        if (btnCopy) btnCopy.textContent = t('copiar');
        const btnGenerate = content.querySelector('.js-btn-generate');
        if (btnGenerate) btnGenerate.textContent = t('preencher');

        const btnReset = content.querySelector('.js-btn-reset');
        if (btnReset) btnReset.textContent = t('limpar');

        const manualBtn = document.getElementById('manual-task-toggle');
        if (manualBtn) manualBtn.textContent = t('gostaria_de_adicionar_uma_task') || "Gostaria de adicionar uma task";

        const parkBtn = content.querySelector('.js-btn-park span');
        if (parkBtn) parkBtn.textContent = t('guardar');

        evidenceTitle.textContent = t('evidencias_contato');
        const l1 = evidenceContainer.querySelector('label[for="evidence-l1"]');
        if (l1) l1.textContent = t('ligacao_1');
        const l2 = evidenceContainer.querySelector('label[for="evidence-l2"]');
        if (l2) l2.textContent = t('ligacao_2');
        const lmsg = evidenceContainer.querySelector('label[for="evidence-msg"]');
        if (lmsg) lmsg.textContent = t('mensagem_am');

        const drawerTitle = popup.querySelector('.js-drawer-title');
        if (drawerTitle) drawerTitle.textContent = t('rascunhos_salvos');

        const historyBtn = popup.querySelector('.js-history-btn');
        if (historyBtn) historyBtn.title = t('meus_rascunhos');

        const lEmail = content.querySelector('.js-label-email-toggle');
        if (lEmail) lEmail.textContent = t('preencher_email_automaticamente');

        if (tagSupport && tagSupport.setLanguage) tagSupport.setLanguage(t);
        if (stepTasks && stepTasks.setLanguage) stepTasks.setLanguage(t);
    }

    // Initial UI Adjustments
    emptyStateContainer.style.display = "flex";
    actionsSection.style.display = "none";

    // Initialize with defaults
    notesState.setLanguage(getLanguage());
    notesState.setCaseType("bau");

    // O idioma da nota acompanha o idioma global da interface (trocado em
    // Configurações). Se houver uma nota em andamento, regenera a saída
    // já traduzida, igual ao antigo seletor PT/ES fazia ao clicar.
    onLanguageChange((lang) => {
        notesState.setLanguage(lang);
        const helpDescEl = popup.querySelector('.cw-help-description');
        if (helpDescEl) helpDescEl.textContent = HEADER_DESC[lang] || HEADER_DESC.pt;
        if (notesState.currentSubStatus) {
            onSubStatusChange(notesState.currentSubStatus);
        }
    });

    // Initial Badge Check
    refreshGlobalBadge();

    // Emergency Recovery (Airbag) Check
    setTimeout(async () => {
        const emergencyData = DraftService.getEmergency();
        if (emergencyData) {
            const confirmed = await confirmDialog("Detectamos um rascunho não salvo da sua última sessão. Deseja restaurar?");
            if (confirmed) {
                restoreFullState(emergencyData);
                showToast("Sessão restaurada!");
            } else {
                DraftService.clearEmergency();
            }
        }
    }, 3000);

    document.body.appendChild(popup);

    // Pendurado na própria função (em vez de trocar o retorno por um objeto)
    // pra não quebrar os callers existentes que chamam initCaseNotesAssistant()
    // esperando só a função de toggle (app.js, command-center.js, command-palette.js).
    toggleVisibility.openWithPreset = openWithPreset;
    return toggleVisibility;
}
