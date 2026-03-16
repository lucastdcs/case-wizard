// src/modules/notes/core/output-generator.js
import { SUBSTATUS_TEMPLATES, TASKS_DB, textareaListFields, textareaParagraphFields, scenarioSnippets, translations } from "../data/notes-data.js";

export function generateOutputHtml(state, stepTasks, tagSupport) {
    const selectedSubStatusKey = state.currentSubStatus;
    if (!selectedSubStatusKey) return null;

    const templateData = SUBSTATUS_TEMPLATES[selectedSubStatusKey];
    let outputText = templateData.template.replace(/\n/g, "<br>");

    const ulStyle = "style=\"margin-bottom: 12px; padding-left: 30px;\"";
    let tagNames = [];
    let screenshotsText = '';

    const checkedBoxes = stepTasks.getCheckedElements();
    if (checkedBoxes.length > 0) {
        checkedBoxes.forEach(cb => {
            const taskKey = cb.value;
            const task = TASKS_DB[taskKey];
            const count = cb.count || 1;
            const isTsTarget = taskKey === 'ads_conversion_tracking' || taskKey === 'ads_enhanced_conversions';
            const useTsDisclaimer = state.tagSupportUsed && isTsTarget && !state.forcedScreenshots.has(taskKey);

            if (useTsDisclaimer) {
                const t = (key) => translations[state.currentLang]?.[key] || translations['pt']?.[key] || key;
                tagNames.push(`${task.name} - ${t('ts_output_disclaimer')}`);
            } else {
                tagNames.push(count > 1 ? `${task.name} (x${count})` : task.name);
            }
        });
    }

    const screenshotsContainer = stepTasks.screenshotsElement;
    if (screenshotsContainer) {
        const nameInputs = Array.from(screenshotsContainer.querySelectorAll('input[id^="name-"]'));
        if (nameInputs.length > 0) {
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
    }

    if (outputText.includes('{TAGS_IMPLEMENTED}')) {
        outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
    } else if (tagNames.length > 0) {
        outputText += `<br><b>Tags:</b> ${tagNames.join(', ')}<br>`;
    }

    if (outputText.includes('{SCREENSHOTS_LIST}')) {
        outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText || 'N/A');
    } else if (screenshotsText !== '') {
        outputText += `<br>${screenshotsText}`;
    }

    const t = (key) => translations[state.currentLang]?.[key] || translations['pt']?.[key] || key;

    if (state.isPortugalCase) {
        const consentValue = state.consent ? t('sim') : t('nao');
        outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, `<br><b>⏺️ ${t('consentiu_gravacao')}</b> ${consentValue}<br><br>`)
                               .replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('sim')}<br>`);
    } else {
        outputText = outputText.replace(/{CASO_PORTUGAL}/g, '').replace(/{CONSENTIU_GRAVACAO}/g, '');
    }

    // Get all unique placeholders in the template to ensure we process everything, even untouched fields
    const placeholders = outputText.match(/{([A-Z0-9_]+)}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];

    uniquePlaceholders.forEach((placeholder) => {
        const fieldName = placeholder.slice(1, -1);
        const fieldId = `field-${fieldName}`;
        const placeholderRegex = new RegExp(`{${fieldName}}`, 'g');

        let rawValue = state.formData[fieldId] || '';
        let value = rawValue.trim();

        const isExcluded = state.excludedFields.has(fieldId);

        // Treat "N/A", ".", "-", "•" or empty values as "to be removed"
        const isEmptyValue = !value || value.toLowerCase() === 'n/a' || value === '.' || value === '-' || value === '•';

        if (isExcluded || isEmptyValue) {
            // Regex to catch the labeled line if the placeholder is the ONLY content after the colon
            const lineRegex = new RegExp(`(?:<br>\\s*)?(?:<p[^>]*>)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*{${fieldName}}(?:<\\/p>)?(?:<br>\\s*)?`, 'gi');

            const newOutput = outputText.replace(lineRegex, '');
            if (newOutput !== outputText) {
                outputText = newOutput;
            } else {
                outputText = outputText.replace(placeholderRegex, '');
            }
            return;
        }

        if (textareaListFields.includes(fieldName)) {
            const lines = value.split('\n')
                               .map(l => l.trim())
                               .filter(l => l !== '' && l !== '•')
                               .map(l => l.startsWith('• ') ? l.substring(2) : l)
                               .map(l => `<li>${l}</li>`)
                               .join('');
            value = lines ? `<ul ${ulStyle}>${lines}</ul>` : '';
            if (!lines) {
                 const lineRegex = new RegExp(`(?:<br>\\s*)?(?:<p[^>]*>)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*{${fieldName}}(?:<\\/p>)?(?:<br>\\s*)?`, 'gi');
                 const newOutput = outputText.replace(lineRegex, '');
                 if (newOutput !== outputText) {
                     outputText = newOutput;
                 } else {
                     outputText = outputText.replace(placeholderRegex, '');
                 }
                return;
            }
        } else if (textareaParagraphFields.includes(fieldName)) {
            value = value.split('\n')
                         .filter(l => l.trim() !== '')
                         .map(l => `<p style="margin: 0 0 8px 0;">${l}</p>`)
                         .join('');
        }

        outputText = outputText.replace(placeholderRegex, value.replace(/\$/g, '$$$$'));
    });

    // Final clean up for any missed placeholders and excessive breaks
    outputText = outputText.replace(/{([A-Z0-9_]+)}/g, '')
                           .replace(/(<br>\s*){3,}/g, '<br><br>')
                           .trim();

    if (tagSupport?.getOutput) {
        const tsOutput = tagSupport.getOutput();
        if (tsOutput) outputText += `<br><br>${tsOutput}`;
    }

    return outputText;
}
