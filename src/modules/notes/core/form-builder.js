// src/modules/notes/core/form-builder.js
import { SUBSTATUS_TEMPLATES, textareaListFields, textareaParagraphFields, translations } from "../data/notes-data.js";
import { fetchAndInsertSpeakeasyId } from "../automation/case-log-scraper.js";
import { enableAutoBullet } from "../components/bullet-editor.js";
export function buildDynamicForm(subStatusKey, container, state) {
    container.innerHTML = "";
    const templateData = SUBSTATUS_TEMPLATES[subStatusKey];
    if (!templateData) return;
    const placeholders = templateData.template.match(/{([A-Z0-9_]+)}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];
    let foundReason = false;
    uniquePlaceholders.forEach((placeholder) => {
        if (["{TAGS_IMPLEMENTED}", "{SCREENSHOTS_LIST}", "{CONSENTIU_GRAVACAO}", "{CASO_PORTUGAL}"].includes(placeholder)) return;
        const fieldName = placeholder.slice(1, -1);
        const fieldId = `field-${fieldName}`;
        if (state.excludedFields.has(fieldId)) return;

        const label = document.createElement("label");
        const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
        label.textContent = t(fieldName.toLowerCase()) !== fieldName.toLowerCase() ? t(fieldName.toLowerCase()) : fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + ":";
        Object.assign(label.style, { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px", fontWeight: "500", color: "#3c4043", marginBottom: "8px", marginTop: "16px" });
        const labelText = document.createElement("span");
        labelText.textContent = label.textContent;
        label.innerHTML = "";
        label.appendChild(labelText);

        if (fieldName === "SPEAKEASY_ID") {
            const btnSearch = document.createElement('button');
            btnSearch.innerHTML = `✨ Auto Busca`;
            btnSearch.style.cssText = "font-size: 11px; font-weight: 500; color: #0b57d0; background-color: #d3e3fd; border: none; border-radius: 100px; padding: 5px 12px; margin-left: 10px; cursor: pointer;";
            btnSearch.onclick = (e) => { e.preventDefault(); fetchAndInsertSpeakeasyId(fieldId); };
            label.appendChild(btnSearch);
        }

        if (foundReason) {
            const btnDelete = document.createElement('button');
            btnDelete.innerHTML = "✕";
            btnDelete.style.cssText = "font-size: 12px; background: none; border: none; color: #5f6368; cursor: pointer; padding: 4px; margin-left: auto;";
            btnDelete.onclick = (e) => {
                e.preventDefault();
                state.toggleFieldExclusion(fieldId, true);
                buildDynamicForm(subStatusKey, container, state);
            };
            label.appendChild(btnDelete);
        }
        if (fieldName === "REASON_COMMENTS") foundReason = true;
        let field;
        if (textareaListFields.includes(fieldName)) {
            field = document.createElement("textarea"); field.classList.add("bullet-textarea", "cw-textarea");
            field.placeholder = "Utilize marcadores para detalhar...";
            enableAutoBullet(field);
        } else if (textareaParagraphFields.includes(fieldName)) {
            field = document.createElement("textarea"); field.classList.add("cw-textarea");
            field.placeholder = "Descreva as considerações...";
        } else {
            field = document.createElement("input"); field.type = "text"; field.classList.add("cw-input");
        }
        if (fieldName === "ON_CALL" && state.currentCaseType === "lm") { label.style.display = "none"; field.style.display = "none"; field.value = "N/A"; }
        field.id = fieldId; field.value = state.formData[fieldId] || "";
        field.addEventListener('input', (e) => state.updateField(fieldId, e.target.value));
        container.appendChild(label); container.appendChild(field);
    });

    // Portugal Case Consent Field
    if (state.isPortugalCase) {
        const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
        const consentLabel = document.createElement("label");
        consentLabel.textContent = t('consentiu_gravacao');
        Object.assign(consentLabel.style, { display: "block", fontSize: "14px", fontWeight: "500", color: "#3c4043", marginBottom: "8px", marginTop: "16px" });

        const consentSelect = document.createElement("select");
        consentSelect.className = "cw-select";
        consentSelect.innerHTML = `
            <option value="false">${t('nao')}</option>
            <option value="true">${t('sim')}</option>
        `;
        consentSelect.value = state.consent ? "true" : "false";
        consentSelect.onchange = () => state.setConsent(consentSelect.value === "true");

        container.appendChild(consentLabel);
        container.appendChild(consentSelect);
    }
}
