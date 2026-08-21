// src/modules/notes/components/split-transfer.js

import { getPageData } from "../../shared/page-data.js";
import { showToast } from "../../shared/utils.js";
import { copyHtmlToClipboard, ensureNoteCardIsOpen, triggerInputEvents } from "../notes-bridge.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { enableFilledCheck } from "../../shared/dom-utils.js";
import { getLanguage } from "../../shared/i18n.js";

// Labels dos campos ficam em inglês de propósito (já eram assim antes desta
// tradução) - só o chrome próprio do componente (botões/placeholders/toasts)
// segue o idioma global. O template "Split & Transfer : Phone Note Format
// [Mandatory]" também não é traduzido: é um formato fixo esperado por quem
// processa essa nota depois.
const ST_DICT = {
    pt: {
        back: "Voltar",
        generateNote: "Gerar Nota",
        describeIssuePlaceholder: "Descreva o erro, passos para reproduzir...",
        whatTestedPlaceholder: "O que você já testou?",
        fieldsFilledToast: (n) => `${n} campos preenchidos!`,
        noNewDataToast: "Nenhum dado novo encontrado.",
        readPageErrorToast: "Erro ao ler página.",
        fillRequiredToast: "Preencha os campos obrigatórios.",
        noteGeneratedToast: "Nota gerada e inserida!",
        copiedOpenNoteToast: "Copiado! Abra uma nota para colar.",
    },
    es: {
        back: "Volver",
        generateNote: "Generar Nota",
        describeIssuePlaceholder: "Describe el error, pasos para reproducirlo...",
        whatTestedPlaceholder: "¿Qué ya probaste?",
        fieldsFilledToast: (n) => `¡${n} campos completados!`,
        noNewDataToast: "No se encontraron datos nuevos.",
        readPageErrorToast: "Error al leer la página.",
        fillRequiredToast: "Completa los campos obligatorios.",
        noteGeneratedToast: "¡Nota generada e insertada!",
        copiedOpenNoteToast: "¡Copiado! Abre una nota para pegar.",
    },
};
function st(key) {
    const lang = getLanguage();
    return ST_DICT[lang]?.[key] ?? ST_DICT.pt[key];
}

export function createSplitTransferComponent(onBack) {
    // --- 1. LAYOUT & STRUCTURE ---
    const container = document.createElement("div");
    container.style.cssText = "display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";

    const scrollArea = document.createElement("div");
    scrollArea.style.cssText = "flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";

    // Header Shadow Element (UX Polish)
    const headerShadow = document.createElement("div");
    headerShadow.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;";
    container.appendChild(headerShadow);
    container.appendChild(scrollArea);

    scrollArea.addEventListener('scroll', () => {
        headerShadow.style.boxShadow = scrollArea.scrollTop > 10 ? "0 4px 12px rgba(0,0,0,0.05)" : "none";
    });

    // --- 2. STYLES (Consolidated) ---
    const styles = {
        section: `margin-bottom: 24px; animation: fadeIn 0.3s ease;`,
        sectionTitle: `font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;`,
        label: `display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;`,
        inputWrapper: `margin-bottom: 14px; position: relative;`,
        input: `width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;`,
        inputError: `border-color: #D93025; background: #FFF4F4;`,
        textarea: `min-height: 80px; resize: vertical; line-height: 1.5;`,
        
        // Segmented Control (Radios)
        radioGroup: `display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;`,
        radioLabel: `flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;`,
        radioActive: `background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);`,
        
        // Banner
        banner: `background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;`,
        
        // Hidden Field Transition
        hiddenField: `display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;`,
        visibleField: `display: block; opacity: 1; transform: translateY(0);`
    };

    // --- 3. COMPONENT BUILDERS ---

    // Generic Input Builder
    const fields = {}; // Store references for easy access later

    function createField({ id, label, type = "text", placeholder = "", required = false, autocomplete = "", parent = scrollArea }) {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = styles.inputWrapper;

        const lbl = document.createElement("label");
        lbl.setAttribute("for", id);
        lbl.style.cssText = styles.label;
        lbl.innerHTML = `${label} ${required ? '<span style="color:#D93025">*</span>' : ''}`;

        let input;
        if (type === "textarea") {
            input = document.createElement("textarea");
            input.style.cssText = styles.input + styles.textarea;
        } else {
            input = document.createElement("input");
            input.type = type;
            input.style.cssText = styles.input;
        }

        input.id = id;
        input.placeholder = placeholder;
        if (autocomplete) input.setAttribute("autocomplete", autocomplete);
        
        // Focus Effects
        input.addEventListener('focus', () => {
            input.style.borderColor = "#1a73e8";
            input.style.boxShadow = "0 0 0 2px rgba(26,115,232,0.15)";
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = "#DADCE0";
            input.style.boxShadow = "none";
            if(required && input.value.trim() !== "") {
                input.style.backgroundColor = "#FFF"; // Remove error bg if fixed
            }
        });

        // Store reference
        fields[id] = { input, wrapper, required };

        wrapper.appendChild(lbl);
        wrapper.appendChild(input);
        // "Check verde" só faz sentido num campo de uma linha - numa textarea
        // grande (descrição, checks) o ícone fixo no canto não acompanha bem
        // o conteúdo que cresce em altura.
        if (type !== "textarea") enableFilledCheck(input);
        parent.appendChild(wrapper);
        return wrapper;
    }

    // Segmented Radio Builder
    function createRadio({ id, label, options = ["Yes", "No"], defaultValue = "No", onChange = null }) {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = styles.inputWrapper;
        
        const lbl = document.createElement("label");
        lbl.style.cssText = styles.label;
        lbl.textContent = label;
        wrapper.appendChild(lbl);

        const group = document.createElement("div");
        group.style.cssText = styles.radioGroup;

        // Hidden input to store value for easier retrieval
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = id;
        hiddenInput.value = defaultValue;
        wrapper.appendChild(hiddenInput);

        options.forEach(opt => {
            const btn = document.createElement("div");
            btn.textContent = opt;
            btn.style.cssText = styles.radioLabel;
            
            const isActive = opt === defaultValue;
            if (isActive) btn.style.cssText += styles.radioActive;

            btn.onclick = () => {
                // Visual Toggle
                Array.from(group.children).forEach(c => c.style.cssText = styles.radioLabel);
                btn.style.cssText += styles.radioActive;
                
                // Logic Update
                hiddenInput.value = opt;
                if (onChange) onChange(opt);
            };

            group.appendChild(btn);
        });

        fields[id] = { input: hiddenInput, wrapper, required: false }; // Store ref
        
        wrapper.appendChild(group);
        scrollArea.appendChild(wrapper);
        return wrapper;
    }

    // --- 4. UI CONSTRUCTION ---

    // A. Warning Banner
    const banner = document.createElement("div");
    banner.style.cssText = styles.banner;
    banner.innerHTML = `
        <span>⚠️</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `;
    scrollArea.appendChild(banner);

    // B. Magic Fill Button
    const magicContainer = document.createElement("div");
    magicContainer.style.marginBottom = "24px";
    const btnMagic = document.createElement("button");
    btnMagic.innerHTML = `✨ &nbsp; Auto-Preencher Dados da Página`;
    btnMagic.style.cssText = "width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;";
    
    btnMagic.onmouseover = () => btnMagic.style.background = "#E1EFFF";
    btnMagic.onmouseout = () => btnMagic.style.background = "#F0F7FF";
    
    magicContainer.appendChild(btnMagic);
    scrollArea.appendChild(magicContainer);

    // C. Technical Data
    const techSection = document.createElement("div");
    techSection.style.cssText = styles.section;
    techSection.innerHTML = `<div style="${styles.sectionTitle}">🛠️ Dados Técnicos</div>`;
    scrollArea.appendChild(techSection);

    createField({ id: "cid", label: "Ads CID", placeholder: "000-000-0000", required: true, parent: techSection });
    createField({ id: "ga4", label: "GA4 Property ID", parent: techSection });
    createField({ id: "gtm", label: "GTM Container ID", parent: techSection });
    
    // Dynamic Logic: Access Email
    const emailWrapper = document.createElement("div");
    emailWrapper.style.cssText = styles.hiddenField;
    techSection.appendChild(emailWrapper); // Placeholder for ordering

    createRadio({ 
        id: "hasAccess", 
        label: "Advertiser has access to GA4/GTM?", 
        defaultValue: "No", 
        onChange: (val) => {
            if (val === "Yes") {
                emailWrapper.style.cssText = styles.visibleField + "margin-bottom:14px;";
            } else {
                emailWrapper.style.cssText = styles.hiddenField;
                fields['accessEmail'].input.value = ""; // Clear if hidden
            }
        }
    });

    // Create the conditional field inside the wrapper
    createField({ id: "accessEmail", label: "User Access Email", parent: emailWrapper });
    
    createRadio({ id: "ghosting", label: "Ghosting Available?", defaultValue: "No" }); // Appended to scrollArea by default

    // D. Contact & Issue
    const contactSection = document.createElement("div");
    contactSection.style.cssText = styles.section;
    contactSection.innerHTML = `<div style="${styles.sectionTitle}">📞 Contato & Problema</div>`;
    scrollArea.appendChild(contactSection);

    createField({ id: "name", label: "Advertiser Name", required: true, autocomplete: "name", parent: contactSection });
    createField({ id: "url", label: "Website URL", type: "url", autocomplete: "url", parent: contactSection });
    createField({ id: "phone", label: "Phone Number", type: "tel", autocomplete: "tel", parent: contactSection });
    createField({ id: "email", label: "Contact Email", type: "email", autocomplete: "email", parent: contactSection });
    createField({ id: "callback", label: "Preferred Callback Time (Timezone)", parent: contactSection });
    
    createField({ id: "desc", label: "Detailed Issue Description", type: "textarea", placeholder: st('describeIssuePlaceholder'), required: true, parent: contactSection });
    createField({ id: "checks", label: "Troubleshooting Performed", type: "textarea", placeholder: st('whatTestedPlaceholder'), parent: contactSection });
    createField({ id: "screens", label: "Screenshots (Links)", type: "textarea", parent: contactSection });

    // E. CC Contacts
    const copySection = document.createElement("div");
    copySection.style.cssText = styles.section;
    copySection.innerHTML = `<div style="${styles.sectionTitle}">📧 Cópias (CC)</div>`;
    scrollArea.appendChild(copySection);

    createField({ id: "cc_adv", label: "Advertiser Contact", parent: copySection });
    createField({ id: "cc_am", label: "Account Manager", parent: copySection });


    // --- 5. FOOTER & ACTIONS ---
    const footer = document.createElement("div");
    footer.style.cssText = "padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";

    const btnBack = document.createElement("button");
    btnBack.innerHTML = st('back');
    btnBack.style.cssText = "border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;";
    btnBack.onclick = onBack;

    const btnGenerate = document.createElement("button");
    btnGenerate.textContent = st('generateNote');
    btnGenerate.style.cssText = "padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;";
    
    footer.appendChild(btnBack);
    footer.appendChild(btnGenerate);
    container.appendChild(footer);


    // --- 6. LOGIC IMPLEMENTATION ---

    // Magic Fill Logic
    btnMagic.onclick = async () => {
        const oldText = btnMagic.innerHTML;
        btnMagic.innerHTML = "⏳ Buscando dados...";
        
        try {
            const data = await getPageData();
            let filledCount = 0;

            const safeFill = (id, val) => {
                const f = fields[id];
                if (val && f && f.input.value === "") { // Only fill if empty
                    f.input.value = val;
                    // Visual Flash Effect
                    f.input.style.backgroundColor = "#E6F4EA";
                    f.input.style.borderColor = "#34A853";
                    setTimeout(() => {
                        f.input.style.backgroundColor = "#FFF";
                        f.input.style.borderColor = "#DADCE0";
                    }, 1000);
                    filledCount++;
                }
            };

            safeFill("name", data.advertiserName);
            safeFill("url", data.websiteUrl);
            if (data.clientEmail) {
                safeFill("email", data.clientEmail);
                safeFill("cc_adv", data.clientEmail);
            }

            // Simple Regex for CID (Basic heuristic)
            const bodyText = document.body.innerText;
            const cidMatch = bodyText.match(/\d{3}-\d{3}-\d{4}/);
            if (cidMatch) safeFill("cid", cidMatch[0]);

            if (filledCount > 0) {
                showToast(st('fieldsFilledToast')(filledCount));
            } else {
                showToast(st('noNewDataToast'));
            }

        } catch (e) {
            console.error(e);
            showToast(st('readPageErrorToast'));
        } finally {
            btnMagic.innerHTML = oldText;
        }
    };

    // Validation Logic
    const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const validate = () => {
        let isValid = true;
        let firstError = null;
        const reduceMotion = prefersReducedMotion();

        Object.values(fields).forEach(field => {
            if (field.required && !field.input.value.trim()) {
                isValid = false;
                field.input.style.cssText += styles.inputError;
                // Shake animation
                if (!reduceMotion) {
                    field.wrapper.animate([
                        { transform: 'translateX(0)' },
                        { transform: 'translateX(-5px)' },
                        { transform: 'translateX(5px)' },
                        { transform: 'translateX(0)' }
                    ], { duration: 300 });
                }

                if (!firstError) firstError = field.input;
            }
        });

        if (firstError) firstError.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        return isValid;
    };

    // Generation Logic
    btnGenerate.onclick = async () => {
        if (!validate()) {
            SoundManager.playError();
            showToast(st('fillRequiredToast'), { error: true });
            return;
        }

        const getVal = (id) => fields[id].input.value || "N/A";
        
        // Handling the Access Logic for template
        const hasAccess = getVal("hasAccess");
        const accessEmail = hasAccess === "Yes" ? getVal("accessEmail") : "N/A";

        const template = `Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser’s info:</b>
<b>Ads CID:</b> ${getVal('cid')}
<b>GA4 ID:</b> ${getVal('ga4')}
<b>GTM ID:</b> ${getVal('gtm')}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${hasAccess === "Yes" ? "Y" : "N"}
<b>If Yes, user access email:</b> ${accessEmail}
<b>Ghosting Access Available (Y/N):</b> ${getVal('ghosting') === "Yes" ? "Y" : "N"}
<b>Name of advertiser:</b> ${getVal('name')}
<b>Website:</b> ${getVal('url')}
<b>Phone Number:</b> ${getVal('phone')}
<b>Preferred Callback:</b> ${getVal('callback')}
<b>Email Address:</b> ${getVal('email')}

<b>Detailed Issue Description:</b>
${getVal('desc')}

<b>Uncropped screenshots:</b>
${getVal('screens')}

<b>Checks performed by Technical Solutions Team:</b>
${getVal('checks')}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${getVal('cc_adv')}
<b>Account Manager:</b> ${getVal('cc_am')}
`;

        const htmlToInsert = template.replace(/\n/g, '<br>');
        copyHtmlToClipboard(htmlToInsert);
        
        const editor = await ensureNoteCardIsOpen();
        if (editor) {
            if (editor.innerText.trim() === "") editor.innerHTML = "";
            document.execCommand("insertHTML", false, htmlToInsert);
            triggerInputEvents(editor);
            SoundManager.playSuccess();
            showToast(st('noteGeneratedToast'));
        } else {
            showToast(st('copiedOpenNoteToast'));
        }
    };
    return container;
}