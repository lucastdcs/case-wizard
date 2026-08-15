// src/modules/notes/core/form-builder.js
import { SUBSTATUS_TEMPLATES, textareaListFields, textareaParagraphFields, translations, getEffectiveRequiredFields, getEffectiveOptionalFields } from "../data/notes-data.js";
import { fetchAndInsertSpeakeasyId } from "../automation/case-log-scraper.js";
import { enableAutoBullet } from "../components/bullet-editor.js";
import { COLORS, RADIUS, SHADOW, EASE } from "../notes-styles.js";
import { confirmDialog } from "../../shared/utils.js";

export function buildDynamicForm(subStatusKey, container, state) {
    container.innerHTML = "";
    const templateData = SUBSTATUS_TEMPLATES[subStatusKey];
    if (!templateData) return;

    const requiredNow = getEffectiveRequiredFields(templateData);

    state.activeFields.forEach((fieldName) => {
        if (["TAGS_IMPLEMENTED", "SCREENSHOTS_LIST", "CONSENTIU_GRAVACAO", "CASO_PORTUGAL", "label_substatus"].includes(fieldName)) return;

        const fieldId = `field-${fieldName}`;
        const label = document.createElement("label");
        const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
        label.textContent = t(fieldName.toLowerCase()) !== fieldName.toLowerCase() ? t(fieldName.toLowerCase()) : fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + ":";
        Object.assign(label.style, { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: COLORS.textSub, marginBottom: "8px", marginTop: "24px", textTransform: "uppercase", letterSpacing: "0.5px" });
        const isRequired = requiredNow.includes(fieldName);
        const labelText = document.createElement("span");
        labelText.textContent = label.textContent;
        if (isRequired) {
            const asterisk = document.createElement("span");
            asterisk.textContent = " *";
            asterisk.style.color = COLORS.error;
            labelText.appendChild(asterisk);
        }
        label.innerHTML = "";
        label.appendChild(labelText);

        if (fieldName === "SPEAKEASY_ID") {
            const btnSearch = document.createElement('button');
            btnSearch.innerHTML = `✨ Auto Busca`;
            btnSearch.style.cssText = `font-size: 11px; font-weight: 700; color: ${COLORS.primary}; background-color: ${COLORS.primaryBg}; border: none; border-radius: ${RADIUS.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${EASE};`;
            btnSearch.onmouseenter = () => btnSearch.style.backgroundColor = "#d2e3fc";
            btnSearch.onmouseleave = () => btnSearch.style.backgroundColor = COLORS.primaryBg;
            btnSearch.onclick = (e) => { e.preventDefault(); fetchAndInsertSpeakeasyId(fieldId); };
            label.appendChild(btnSearch);
        }

        if (!isRequired) {
            const btnDelete = document.createElement('button');
            btnDelete.innerHTML = "✕";
            btnDelete.style.cssText = `font-size: 14px; background: ${COLORS.bgInput}; border: none; color: ${COLORS.textSub}; cursor: pointer; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-left: auto; transition: all 0.2s ${EASE};`;
            btnDelete.onmouseenter = () => { btnDelete.style.background = COLORS.error; btnDelete.style.color = COLORS.surface; };
            btnDelete.onmouseleave = () => { btnDelete.style.background = COLORS.bgInput; btnDelete.style.color = COLORS.textSub; };
            btnDelete.onclick = async (e) => {
                e.preventDefault();
                const confirmed = await confirmDialog(`Tem certeza que deseja remover o campo "${labelText.textContent.replace(':', '')}"?`);
                if (confirmed) {
                    state.removeField(fieldName);
                    buildDynamicForm(subStatusKey, container, state);
                }
            };
            label.appendChild(btnDelete);
        }
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
        field.id = fieldId; field.value = state.formData[fieldId] || "";
        field.addEventListener('input', (e) => state.updateField(fieldId, e.target.value));
        container.appendChild(label); container.appendChild(field);
    });

    // Handle CONSENTIU_GRAVACAO specifically if it's in activeFields
    if (state.activeFields.includes("CONSENTIU_GRAVACAO")) {
        const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
        const consentLabel = document.createElement("label");
        consentLabel.textContent = t('consentiu_gravacao');
        Object.assign(consentLabel.style, { display: "block", fontSize: "13px", fontWeight: "700", color: COLORS.textSub, marginBottom: "8px", marginTop: "24px", textTransform: "uppercase", letterSpacing: "0.5px" });

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

    // Campos opcionais do template (ver optionalFields em data/notes-data.js)
    // que ainda não estão ativos: ficam escondidos por padrão pra reduzir a
    // carga cognitiva, mas continuam a 1 clique de distância.
    const optionalNow = getEffectiveOptionalFields(templateData);
    const hiddenOptional = (templateData.templateFields || []).filter(
        (fieldName) => optionalNow.includes(fieldName) && !state.activeFields.includes(fieldName)
    );
    if (hiddenOptional.length > 0) {
        const t = (key) => translations[state.currentLang]?.[key] || translations["pt"]?.[key] || key;
        const addWrap = document.createElement("div");
        Object.assign(addWrap.style, { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" });

        hiddenOptional.forEach((fieldName) => {
            const rawLabel = t(fieldName.toLowerCase()) !== fieldName.toLowerCase()
                ? t(fieldName.toLowerCase())
                : fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + ":";

            const chip = document.createElement('button');
            chip.type = 'button';
            chip.textContent = `+ ${rawLabel.replace(/:$/, '')}`;
            chip.style.cssText = `font-size: 12px; font-weight: 600; color: ${COLORS.primary}; background-color: ${COLORS.primaryBg}; border: none; border-radius: ${RADIUS.pill}; padding: 6px 14px; cursor: pointer; transition: all 0.2s ${EASE};`;
            chip.onmouseenter = () => chip.style.backgroundColor = "#d2e3fc";
            chip.onmouseleave = () => chip.style.backgroundColor = COLORS.primaryBg;
            chip.onclick = (e) => {
                e.preventDefault();
                state.addFieldAt(fieldName, state.activeFields.length);
                buildDynamicForm(subStatusKey, container, state);
            };
            addWrap.appendChild(chip);
        });

        container.appendChild(addWrap);
    }
}
