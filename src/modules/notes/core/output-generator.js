// src/modules/notes/core/output-generator.js
import { SUBSTATUS_TEMPLATES, TASKS_DB, textareaListFields, textareaParagraphFields, translations } from "../data/notes-data.js";

export function generateOutputHtml(state, stepTasks, tagSupport, evidenceData = null) {
    const selectedSubStatusKey = state.currentSubStatus;
    if (!selectedSubStatusKey) return null;

    const templateDef = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    const langDict = translations[state.currentLang] || translations['pt'];
    const t = (key) => langDict[key] || translations['pt']?.[key] || key;
    const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";

    let htmlOutput = "";

    // Iterate through active fields
    state.activeFields.forEach(fieldKey => {
        let label = t(fieldKey.toLowerCase());
        let finalValue = "N/A";

        // Handle Special Fields
        if (fieldKey === 'label_substatus') {
            label = t('label_substatus');
            finalValue = templateDef.name;
        } else if (fieldKey === 'TAGS_IMPLEMENTED') {
            label = t('tags_implemented');
            const tagNames = [];
            const checkedBoxes = stepTasks.getCheckedElements();
            checkedBoxes.forEach(cb => {
                const taskKey = cb.value;
                const task = TASKS_DB[taskKey];
                const count = cb.count || 1;
                const isTsTarget = taskKey === 'ads_conversion_tracking' || taskKey === 'ads_enhanced_conversions';
                const useTsDisclaimer = state.tagSupportUsed && isTsTarget && !state.forcedScreenshots.has(taskKey);

                if (useTsDisclaimer) {
                    tagNames.push(`${task.name} - ${t('ts_output_disclaimer')}`);
                } else {
                    tagNames.push(count > 1 ? `${task.name} (x${count})` : task.name);
                }
            });
            finalValue = tagNames.join(', ') || 'N/A';
        } else if (fieldKey === 'SCREENSHOTS_LIST') {
            label = t('screenshots_list');
            let screenshotsText = '';
            const screenshotsContainer = stepTasks.screenshotsElement;
            if (screenshotsContainer) {
                const nameInputs = Array.from(screenshotsContainer.querySelectorAll('input[id^="name-"]'));
                nameInputs.forEach(nameInput => {
                    const customName = nameInput.value;
                    const card = nameInput.closest('.cw-screen-card');
                    if (card) {
                        const printInputs = card.querySelectorAll('input[id^="screen-"]');
                        let hasPrints = false;
                        let itemsHtml = '';
                        printInputs.forEach(printInput => {
                            const group = printInput.closest('.cw-input-group');
                            const labelText = group?.querySelector('.cw-input-label')?.textContent || 'Evidência';
                            const val = printInput.value.trim();
                            if (val) {
                               itemsHtml += `<li>${labelText} - ${val}</li>`;
                               hasPrints = true;
                            }
                        });
                        if (hasPrints) {
                            screenshotsText += `<div style="margin-bottom: 8px;"><b>${customName}</b><ul ${ulStyle}>${itemsHtml}</ul></div>`;
                        }
                    }
                });
            }
            finalValue = screenshotsText || 'N/A';
        } else if (fieldKey === 'CASO_PORTUGAL') {
            label = t('caso_portugal');
            finalValue = t('sim');
        } else if (fieldKey === 'CONSENTIU_GRAVACAO') {
            label = t('consentiu_gravacao');
            finalValue = state.consent ? t('sim') : t('nao');
        } else {
            // Standard dynamic form fields
            const fieldId = `field-${fieldKey}`;
            const userInput = state.formData[fieldId];

            // Apply prefixes if defined in template
            let prefix = "";
            if (templateDef.fieldPrefixes && templateDef.fieldPrefixes[fieldKey]) {
                prefix = templateDef.fieldPrefixes[fieldKey] + " ";
            }

            if (userInput && userInput.trim() !== "" && userInput.trim() !== "•") {
                let value = userInput.trim();

                if (textareaListFields.includes(fieldKey)) {
                    const lines = value.split('\n')
                                       .map(l => l.trim())
                                       .filter(l => l !== '' && l !== '•')
                                       .map(l => l.startsWith('• ') ? l.substring(2) : l)
                                       .map(l => `<li>${l}</li>`)
                                       .join('');
                    finalValue = lines ? `${prefix}<ul ${ulStyle}>${lines}</ul>` : "N/A";
                } else if (textareaParagraphFields.includes(fieldKey)) {
                    finalValue = prefix + value.split('\n')
                                 .filter(l => l.trim() !== '')
                                 .map(l => `<p style="margin: 0 0 8px 0;">${l}</p>`)
                                 .join('');
                } else {
                    finalValue = prefix + value;
                }
            } else if (prefix) {
                finalValue = prefix.trim();
            }
        }

        // Add to output if it's not "N/A" (unless specified otherwise by requirement)
        // The requirement says: "If the user did not delete the field but left it blank, we put N/A"

        htmlOutput += `<b>${label}</b><br>${finalValue}<br><br>`;
    });

    // Add Evidence Data if present
    if (evidenceData) {
        let evidenceHtml = "";
        if (evidenceData.l1) evidenceHtml += `<li>${t('ligacao_1')}: ${evidenceData.l1}</li>`;
        if (evidenceData.l2) evidenceHtml += `<li>${t('ligacao_2')}: ${evidenceData.l2}</li>`;
        if (evidenceData.msg) evidenceHtml += `<li>${t('mensagem_am')}: ${evidenceData.msg}</li>`;

        if (evidenceHtml) {
            htmlOutput += `<b>${t('evidencias_contato')}</b><br><ul ${ulStyle}>${evidenceHtml}</ul><br>`;
        }
    }

    // Add template specific footer
    if (templateDef.customFooter) {
        htmlOutput += `${templateDef.customFooter}<br><br>`;
    }

    // Add Tag Support Output if exists
    if (tagSupport?.getOutput) {
        const tsOutput = tagSupport.getOutput();
        if (tsOutput) htmlOutput += `${tsOutput}<br><br>`;
    }

    // Add Global Footer
    htmlOutput += `<i>Nota criada através do Cases Wizard.</i>`;

    // Final cleanup: replace excessive breaks
    return htmlOutput.replace(/(<br>\s*){3,}/g, '<br><br>').trim();
}
