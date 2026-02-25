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
            const taskKey = cb.value; const task = TASKS_DB[taskKey];
            const count = cb.count || 1;
            tagNames.push(count > 1 ? `${task.name} (x${count})` : task.name);
        });
    }
    const screenshotsContainer = stepTasks.screenshotsElement;
    if (screenshotsContainer) {
        const nameInputs = Array.from(screenshotsContainer.querySelectorAll('input[id^="name-"]'));
        if (nameInputs.length > 0) {
            nameInputs.forEach(nameInput => {
                const customName = nameInput.value; const card = nameInput.closest('.cw-screen-card');
                if (card) {
                    const printInputs = card.querySelectorAll('input[id^="screen-"]');
                    let hasPrints = false; let itemsHtml = '';
                    printInputs.forEach(printInput => {
                        const group = printInput.closest('.cw-input-group');
                        const labelText = group?.querySelector('.cw-input-label')?.textContent || 'Evidência';
                        const val = printInput.value.trim();
                        itemsHtml += `<li>${labelText} -${val ? ' ' + val : ''}</li>`; hasPrints = true;
                    });
                    if (hasPrints) { screenshotsText += `<b>${customName}</b><ul ${ulStyle}>${itemsHtml}</ul>`; }
                }
            });
        }
    }
    if (outputText.includes('{TAGS_IMPLEMENTED}')) outputText = outputText.replace(/{TAGS_IMPLEMENTED}/g, tagNames.join(', ') || 'N/A');
    else if (tagNames.length > 0) outputText += `<br><b>Tags:</b> ${tagNames.join(', ')}<br>`;
    if (outputText.includes('{SCREENSHOTS_LIST}')) outputText = outputText.replace(/{SCREENSHOTS_LIST}/g, screenshotsText || 'N/A');
    else if (screenshotsText !== '') outputText += `<br>${screenshotsText}`;
    const t = (key) => translations[state.currentLang]?.[key] || translations['pt']?.[key] || key;
    if (state.isPortugalCase) {
        const consentValue = state.consent ? t('sim') : t('nao');
        outputText = outputText.replace(/{CONSENTIU_GRAVACAO}/g, `<br><b>${t('consentiu_gravacao')}</b> ${consentValue}<br><br>`).replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('sim')}<br>`);
    } else {
        outputText = outputText.replace(/{CASO_PORTUGAL}/g, `<br><b>${t('caso_portugal')}</b> ${t('nao')}<br>`).replace(/{CONSENTIU_GRAVACAO}/g, '');
    }
    for (const fieldId in state.formData) {
        const fieldName = fieldId.replace('field-', ''); const placeholderRegex = new RegExp(`{${fieldName}}`, 'g');
        let value = state.formData[fieldId];
        if (textareaListFields.includes(fieldName) && value.trim() !== '') {
            const lines = value.split('\n').map(l => l.trim()).filter(l => l !== '' && l !== '•').map(l => l.startsWith('• ') ? l.substring(2) : l).map(l => `<li>${l}</li>`).join('');
            value = lines ? `<ul ${ulStyle}>${lines}</ul>` : '';
        } else if (textareaParagraphFields.includes(fieldName)) {
            value = value.split('\n').filter(l => l.trim() !== '').map(l => `<p style="margin: 0 0 8px 0;">${l}</p>`).join('');
        }
        const textContent = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
        if (textContent === '' || textContent === '•' || textContent.toLowerCase() === 'n/a') {
            const lineRegex = new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${fieldName}\\}(?:<br>\\s*)?`, 'gi');
            outputText = outputText.replace(lineRegex, '').replace(placeholderRegex, '');
        } else { outputText = outputText.replace(placeholderRegex, value.replace(/\$/g, '$$$$')); }
    }
    outputText = outputText.replace(/{([A-Z0-9_]+)}/g, '').replace(/(<br>){3,}/g, '<br><br>');
    if (tagSupport?.getOutput) outputText += tagSupport.getOutput();
    return outputText;
}
