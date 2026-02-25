// src/modules/notes/notes-assistant.js

import { showToast } from "../shared/utils.js";
import { notesState } from "./core/notes-state.js";
import { createNotesPopup } from "./ui/notes-popup.js";
import { buildDynamicForm } from "./core/form-builder.js";
import { generateOutputHtml } from "./core/output-generator.js";
import { createScenarioSelector } from "./scenarios/scenario-ui.js";
import { createStepTasksComponent } from "./components/step-tasks.js";
import { createTagSupportModule } from "./tag-support.js";
import { createDraftsManager } from "./drafts/draft-ui.js";
import { createSplitTransferComponent } from "./components/split-transfer.js";
import { DraftService } from "./drafts/draft-service.js";
import { SoundManager } from "../shared/sound-manager.js";
import { getPageData } from "../shared/page-data.js";
import {
    SUBSTATUS_TEMPLATES,
    SUBSTATUS_SHORTCODES,
    translations,
    scenarioSnippets,
    textareaListFields
} from "./data/notes-data.js";
import {
    copyHtmlToClipboard,
    ensureNoteCardIsOpen,
    triggerInputEvents
} from "./notes-bridge.js";
import { runEmailAutomation } from "../email/email-automation.js";
import { triggerProcessingAnimation } from "../shared/command-center.js";
import { toggleGenieAnimation } from "../shared/animations.js";

export function initCaseNotesAssistant() {
    const CURRENT_VERSION = "v4.0.0";

    // 1. Initialize UI
    const { popup, content, header, animRefs, credit } = createNotesPopup(CURRENT_VERSION, toggleVisibility);

    // 2. Initialize Sub-modules
    const tagSupport = createTagSupportModule(t);
    const stepTasks = createStepTasksComponent(() => {
        updateTagSupport();
        notesState.activeTasks = stepTasks.getCheckedElements();
    }, t);

    const scenariosContainer = document.createElement("div");
    scenariosContainer.style.display = "none";
    const scenarioSelector = createScenarioSelector((scenario, isSelected) => {
        applyScenario(scenario, isSelected);
    }, notesState);
    scenariosContainer.appendChild(scenarioSelector);

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
    const actionsSection = createActionsSection(draftsManager);

    content.appendChild(langTypeSection);
    content.appendChild(statusSection);
    content.appendChild(scenariosContainer);
    content.appendChild(dynamicFormContainer);

    // Hide tasks and screenshots initially
    stepTasks.selectionElement.style.display = "none";
    stepTasks.screenshotsElement.style.display = "none";

    // Manual Task Toggle Button
    const manualTaskBtn = document.createElement("button");
    manualTaskBtn.id = "manual-task-toggle";
    manualTaskBtn.textContent = t('gostaria_de_adicionar_uma_task') || "Gostaria de adicionar uma task";
    manualTaskBtn.style.cssText = "display: none; width: 100%; padding: 10px; border: 1px solid #dadce0; background: #f8f9fa; color: #1a73e8; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; margin-top: 8px;";
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

    // 7. State Synchronization
    notesState.subscribe((state) => {
        updateUIFromState(state);
    });

    // --- Helper Functions ---

    function toggleVisibility() {
        notesState.visible = !notesState.visible;
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
            <div class="cw-section-title js-label-idioma">${t('idioma')}</div>
            <div class="cw-segmented-control" id="lang-selector">
                <button data-lang="pt" class="active">Português</button>
                <button data-lang="es">Español</button>
            </div>
            <div class="cw-section-title js-label-fluxo">${t('fluxo')}</div>
            <div class="cw-segmented-control" id="type-selector">
                <button data-type="bau" class="active">BAU</button>
                <button data-type="lm">LM</button>
            </div>
        `;
        
        // CSS for Segmented Control
        if (!document.getElementById('cw-segmented-styles')) {
            const style = document.createElement('style');
            style.id = 'cw-segmented-styles';
            style.innerHTML = `
                .cw-segmented-control { display: flex; background: #f1f3f4; padding: 4px; border-radius: 12px; gap: 4px; }
                .cw-segmented-control button { flex: 1; border: none; background: transparent; padding: 8px; font-size: 13px; font-weight: 500; border-radius: 8px; cursor: pointer; transition: all 0.2s; color: #5f6368; }
                .cw-segmented-control button.active { background: #fff; color: #1a73e8; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            `;
            document.head.appendChild(style);
        }

        div.querySelectorAll('#lang-selector button').forEach(btn => {
            btn.onclick = () => {
                notesState.setLanguage(btn.dataset.lang);
                div.querySelectorAll('#lang-selector button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });

        div.querySelectorAll('#type-selector button').forEach(btn => {
            btn.onclick = () => {
                notesState.setCaseType(btn.dataset.type);
                div.querySelectorAll('#type-selector button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });

        return div;
    }

    function createStatusSection() {
        const div = document.createElement("div");
        div.className = "cw-status-section";
        div.style.cssText = "display: flex; flex-direction: column; gap: 8px;";
        div.innerHTML = `
            <div class="cw-section-title js-label-status" style="margin-top: 8px;">${t('status_principal')}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${t('select_status')}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title js-label-substatus" style="margin-top: 8px;">${t('substatus')}</div>
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

    function updateSubStatusOptions(status, subSelect) {
        subSelect.innerHTML = `<option value="">${t('select_substatus')}</option>`;
        if (!status) {
            subSelect.disabled = true;
            return;
        }
        for (const key in SUBSTATUS_TEMPLATES) {
            if (SUBSTATUS_TEMPLATES[key].status === status) {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = SUBSTATUS_TEMPLATES[key].name;
                subSelect.appendChild(opt);
            }
        }
        subSelect.disabled = false;
    }

    function onSubStatusChange(subStatusKey) {
        if (!subStatusKey) {
            scenariosContainer.style.display = "none";
            dynamicFormContainer.style.display = "none";
            document.getElementById("manual-task-toggle").style.display = "none";
            stepTasks.selectionElement.style.display = "none";
            stepTasks.screenshotsElement.style.display = "none";
            return;
        }

        // 1. Rebuild Form
        buildDynamicForm(subStatusKey, dynamicFormContainer, notesState);
        dynamicFormContainer.style.display = "block";

        // 2. Show Scenarios if applicable
        scenariosContainer.style.display = "block";

        // 3. Update Tasks focus
        const templateData = SUBSTATUS_TEMPLATES[subStatusKey];
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

        stepTasks.updateSubStatus(subStatusKey);
        updateTagSupport();
    }

    function updateTagSupport() {
        const checked = stepTasks.getCheckedElements().map(c => c.value);
        tagSupport.updateVisibility(notesState.currentSubStatus, checked);
    }

    function applyScenario(scenario, isSelected) {
        const data = scenario.content;
        if (typeof data === 'object') {
            for (const key in data) {
                if (key === 'linkedTask') {
                    stepTasks.toggleTask(data.linkedTask, isSelected);
                } else if (key === 'activeTasks') {
                    if (isSelected) {
                        data.activeTasks.forEach(t => stepTasks.setTaskCount(t.value, t.count));
                    }
                } else if (key.startsWith('field-')) {
                    if (isSelected) {
                        notesState.updateField(key, data[key]);
                        const el = document.getElementById(key);
                        if (el) {
                            // Cumulative text if it's a list field
                            if (textareaListFields.includes(key.replace('field-', ''))) {
                                const currentVal = el.value.trim();
                                if (currentVal && !currentVal.includes(data[key].trim())) {
                                    el.value = currentVal + "\n" + data[key];
                                } else {
                                    el.value = data[key];
                                }
                            } else {
                                el.value = data[key];
                            }
                            el.dispatchEvent(new Event('input'));
                        }
                    } else {
                        // Removal logic is complex for fields; usually users just want to add.
                        // For simplicity, we mostly support cumulative addition.
                    }
                }
            }
        } else {
            // Simple text snippet - find the first textarea
            const firstTextarea = dynamicFormContainer.querySelector('textarea');
            if (firstTextarea) {
                if (isSelected) {
                    const currentVal = firstTextarea.value.trim();
                    if (currentVal && !currentVal.includes(data.trim())) {
                        firstTextarea.value = currentVal + "\n" + data;
                    } else {
                        firstTextarea.value = data;
                    }
                }
                firstTextarea.dispatchEvent(new Event('input'));
            }
        }
    }

    function createActionsSection(draftsManager) {
        const div = document.createElement("div");
        div.className = "cw-actions-section";
        div.style.display = "flex";
        div.style.flexWrap = "wrap";
        div.style.gap = "8px";
        div.style.paddingTop = "16px";
        div.style.marginTop = "16px";
        div.style.borderTop = "1px solid #eee";
        
        const parkBtn = draftsManager.parkButton;
        parkBtn.style.marginTop = "0"; // Normalize margin to align with others

        const btnReset = document.createElement("button");
        btnReset.className = "cw-btn-secondary js-btn-reset";
        btnReset.textContent = t('limpar');
        btnReset.style.cssText = "flex: 1; background: #fff; color: #5f6368; border: 1px solid #dadce0;";
        btnReset.onclick = () => resetModule();

        const btnCopy = document.createElement("button");
        btnCopy.className = "cw-btn-secondary js-btn-copy";
        btnCopy.textContent = t('copiar');
        btnCopy.style.flex = "1";
        btnCopy.onclick = () => handleCopy();

        const btnGenerate = document.createElement("button");
        btnGenerate.className = "cw-btn-primary js-btn-generate";
        btnGenerate.textContent = t('preencher');
        btnGenerate.style.flex = "1";
        btnGenerate.onclick = () => handleGenerate();

        div.appendChild(parkBtn);
        div.appendChild(btnReset);
        div.appendChild(btnCopy);
        div.appendChild(btnGenerate);

        return div;
    }

    async function handleCopy() {
        if (!notesState.currentSubStatus) {
            showToast(t('select_substatus'), { error: true });
            return;
        }
        const html = generateOutputHtml(notesState, stepTasks, tagSupport);
        if (html) {
            copyHtmlToClipboard(html);
            showToast(t('copiado_sucesso'));
            SoundManager.playClick();
        } else {
            showToast(t('select_substatus'), { error: true });
        }
    }

    async function handleGenerate() {
        if (!notesState.currentSubStatus) {
            showToast(t('select_substatus'), { error: true });
            return;
        }
        const html = generateOutputHtml(notesState, stepTasks, tagSupport);

        copyHtmlToClipboard(html);
        toggleVisibility();
        const finishLoading = triggerProcessingAnimation();

        const field = await ensureNoteCardIsOpen();
        if (field) {
            field.focus();
            document.execCommand("insertHTML", false, html);
            triggerInputEvents(field);

            if (notesState.currentSubStatus && SUBSTATUS_SHORTCODES[notesState.currentSubStatus]) {
                await runEmailAutomation(SUBSTATUS_SHORTCODES[notesState.currentSubStatus]);
            }

            showToast(t('inserido_copiado'));
            SoundManager.playSuccess();
            resetModule();
        }
        finishLoading();
    }

    function resetModule() {
        notesState.reset();
        stepTasks.reset();
        tagSupport.reset();
        // Reset UI elements
        content.querySelectorAll('select').forEach(s => s.value = "");
        content.querySelector('#sub-status-select').disabled = true;
        dynamicFormContainer.innerHTML = "";
        scenariosContainer.style.display = "none";
        if (document.getElementById("manual-task-toggle")) {
            document.getElementById("manual-task-toggle").style.display = "none";
        }
        stepTasks.selectionElement.style.display = "none";
        stepTasks.screenshotsElement.style.display = "none";
    }

    async function collectFullState() {
        // Collect everything needed for a draft
        const formData = {};
        dynamicFormContainer.querySelectorAll('input, textarea').forEach(el => formData[el.id] = el.value);

        const pageData = await getPageData();

        return {
            currentCaseType: notesState.currentCaseType,
            currentLang: notesState.currentLang,
            status: notesState.currentStatus,
            subStatus: notesState.currentSubStatus,
            formData: formData,
            activeTasks: stepTasks.getCheckedElements().map(c => ({
                key: c.value,
                count: c.count
            })),
            clientName: pageData.advertiserName,
            cid: pageData.cid,
            timestamp: new Date().toISOString()
        };
    }

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function restoreFullState(draft) {
        notesState.setLanguage(draft.currentLang);
        notesState.setCaseType(draft.currentCaseType);

        // Update Segmented Controls visually
        const langBtn = content.querySelector(`#lang-selector button[data-lang="${draft.currentLang}"]`);
        if (langBtn) langBtn.click();
        const typeBtn = content.querySelector(`#type-selector button[data-type="${draft.currentCaseType}"]`);
        if (typeBtn) typeBtn.click();

        if (draft.status) {
            const mainSelect = content.querySelector('#main-status-select');
            mainSelect.value = draft.status;
            mainSelect.dispatchEvent(new Event('change'));

            await wait(50);
            if (draft.subStatus) {
                const subSelect = content.querySelector('#sub-status-select');
                subSelect.value = draft.subStatus;
                subSelect.dispatchEvent(new Event('change'));

                await wait(100);
                // Restore Form Fields
                for (const id in draft.formData) {
                    const el = document.getElementById(id);
                    if (el) {
                        el.value = draft.formData[id];
                        el.dispatchEvent(new Event('input'));
                    }
                }
                // Restore Tasks
                if (draft.activeTasks) {
                    draft.activeTasks.forEach(t => stepTasks.setTaskCount(t.key, t.count));
                }
            }
        }
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

    function updateUIFromState(state) {
        // Sync labels when language changes
        const lIdioma = content.querySelector('.js-label-idioma');
        if (lIdioma) lIdioma.textContent = t('idioma');
        const lFluxo = content.querySelector('.js-label-fluxo');
        if (lFluxo) lFluxo.textContent = t('fluxo');
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

        const drawerTitle = popup.querySelector('.js-drawer-title');
        if (drawerTitle) drawerTitle.textContent = t('rascunhos_salvos');

        if (tagSupport && tagSupport.setLanguage) tagSupport.setLanguage(t);
        if (stepTasks && stepTasks.setLanguage) stepTasks.setLanguage(t);
    }

    // Initialize with defaults
    notesState.setLanguage("pt");
    notesState.setCaseType("bau");

    document.body.appendChild(popup);

    return toggleVisibility;
}
