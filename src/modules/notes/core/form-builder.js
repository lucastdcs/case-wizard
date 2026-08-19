// src/modules/notes/core/form-builder.js
import { SUBSTATUS_TEMPLATES, textareaListFields, textareaParagraphFields, translations, getEffectiveRequiredFields } from "../data/notes-data.js";
import { fetchAndInsertSpeakeasyId } from "../automation/case-log-scraper.js";
import { enableAutoBullet } from "../components/bullet-editor.js";
import { COLORS, RADIUS, SHADOW, EASE } from "../notes-styles.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { confirmDialog } from "../../shared/utils.js";
import { getSnippetsForField } from "../data/note-snippets-service.js";

// Menu de trechos prontos de um campo (Central de Conteúdo). Só é montado
// quando existe trecho publicado para aquele campo - sem conteúdo, nenhum
// botão aparece e o formulário é exatamente o de antes.
function buildSnippetPicker(fieldName, snippets, targetField, t) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position: relative; display: inline-flex;';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = `${t('trechos')} (${snippets.length})`;
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.style.cssText = `font-size: 11px; font-weight: 700; color: ${COLORS.primary}; background-color: ${COLORS.primaryBg}; border: none; border-radius: ${RADIUS.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${EASE};`;
    btn.onmouseenter = () => btn.style.backgroundColor = "#d2e3fc";
    btn.onmouseleave = () => btn.style.backgroundColor = COLORS.primaryBg;

    const menu = document.createElement('div');
    menu.style.cssText = `position: absolute; top: calc(100% + 6px); right: 0; z-index: 20; min-width: 280px; max-width: 380px; max-height: 260px; overflow-y: auto; background: ${COLORS.surface}; border: 1px solid ${COLORS.border}; border-radius: ${RADIUS.medium}; box-shadow: ${SHADOW.elevated}; padding: 6px; display: none; text-transform: none; letter-spacing: normal;`;

    function closeMenu() {
        menu.style.display = 'none';
        btn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', onOutside, true);
    }
    function onOutside(e) {
        if (!wrap.contains(e.target)) closeMenu();
    }

    btn.onclick = (e) => {
        e.preventDefault();
        SoundManager.playClick();
        const opening = menu.style.display === 'none';
        menu.style.display = opening ? 'block' : 'none';
        btn.setAttribute('aria-expanded', String(opening));
        if (opening) document.addEventListener('click', onOutside, true);
    };

    snippets.forEach((snip) => {
        const opt = document.createElement('button');
        opt.type = 'button';
        opt.style.cssText = `display: block; width: 100%; text-align: left; background: none; border: none; border-radius: ${RADIUS.small}; padding: 8px 10px; cursor: pointer; font-family: inherit; transition: background 0.15s ${EASE};`;
        opt.onmouseenter = () => opt.style.background = COLORS.bgInput;
        opt.onmouseleave = () => opt.style.background = 'none';

        const title = document.createElement('div');
        title.textContent = snip.title;
        title.style.cssText = `font-size: 13px; font-weight: 600; color: ${COLORS.text}; margin-bottom: 2px;`;

        const preview = document.createElement('div');
        preview.textContent = snip.text.length > 90 ? snip.text.slice(0, 90) + '…' : snip.text;
        preview.style.cssText = `font-size: 11px; color: ${COLORS.textSub}; line-height: 1.4;`;

        opt.appendChild(title);
        opt.appendChild(preview);

        opt.onclick = (e) => {
            e.preventDefault();
            SoundManager.playClick();

            // Acrescenta em vez de substituir: o agente costuma montar a nota
            // combinando trechos, e sobrescrever o que ele já digitou seria
            // destrutivo e sem desfazer.
            const current = targetField.value;
            targetField.value = current.trim()
                ? `${current.replace(/\s*$/, '')}\n${snip.text}`
                : snip.text;

            // 'input' é o evento que o state escuta - sem ele o texto aparece na
            // tela mas não entra no rascunho nem na nota gerada.
            targetField.dispatchEvent(new Event('input', { bubbles: true }));
            targetField.focus();
            closeMenu();
        };

        menu.appendChild(opt);
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
}

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
            btnSearch.innerHTML = t('auto_busca');
            btnSearch.style.cssText = `font-size: 11px; font-weight: 700; color: ${COLORS.primary}; background-color: ${COLORS.primaryBg}; border: none; border-radius: ${RADIUS.pill}; padding: 6px 14px; margin-left: 10px; cursor: pointer; transition: all 0.2s ${EASE};`;
            btnSearch.onmouseenter = () => btnSearch.style.backgroundColor = "#d2e3fc";
            btnSearch.onmouseleave = () => btnSearch.style.backgroundColor = COLORS.primaryBg;
            btnSearch.onclick = (e) => { e.preventDefault(); SoundManager.playClick(); fetchAndInsertSpeakeasyId(fieldId); };
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
                SoundManager.playClick();
                const fieldLabel = labelText.textContent.replace(/:\s*$/, "").trim();
                const confirmed = await confirmDialog(t('remover_campo_confirm').replace('{campo}', fieldLabel), { danger: true, confirmText: t('remover') });
                if (!confirmed) return;
                state.removeField(fieldName);
                buildDynamicForm(subStatusKey, container, state);
            };
            label.appendChild(btnDelete);
        }
        let field;
        if (textareaListFields.includes(fieldName)) {
            field = document.createElement("textarea"); field.classList.add("bullet-textarea", "cw-textarea");
            field.placeholder = t('utilize_marcadores');
            enableAutoBullet(field);
        } else if (textareaParagraphFields.includes(fieldName)) {
            field = document.createElement("textarea"); field.classList.add("cw-textarea");
            field.placeholder = t('descreva_consideracoes');
        } else {
            field = document.createElement("input"); field.type = "text"; field.classList.add("cw-input");
        }
        field.id = fieldId; field.value = state.formData[fieldId] || "";
        field.addEventListener('input', (e) => state.updateField(fieldId, e.target.value));

        // Trechos prontos publicados na Central para este campo. Montado depois
        // do input porque o menu precisa escrever nele. Sem trecho publicado o
        // botão nem existe - nada muda para quem não usa.
        const snippets = getSnippetsForField(fieldName, state.currentLang, subStatusKey);
        if (snippets.length) {
            label.appendChild(buildSnippetPicker(fieldName, snippets, field, t));
        }

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

    // Campos não-obrigatórios do template que não estão ativos no momento —
    // seja porque começam escondidos por padrão (ver optionalFields em
    // data/notes-data.js) ou porque o agente os removeu pelo botão "✕" —
    // ficam disponíveis aqui a 1 clique de distância, permitindo desfazer
    // a remoção.
    const hiddenOptional = (templateData.templateFields || []).filter(
        (fieldName) => !requiredNow.includes(fieldName) && !state.activeFields.includes(fieldName)
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
                SoundManager.playClick();
                state.addFieldAt(fieldName, state.activeFields.length);
                buildDynamicForm(subStatusKey, container, state);
            };
            addWrap.appendChild(chip);
        });

        container.appendChild(addWrap);
    }
}
