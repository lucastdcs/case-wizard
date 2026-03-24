import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { sendBAUEscalation } from '../shared/data-service.js';
import { getPageData } from '../shared/page-data.js';
import { chipData } from './bau-form-config.js';

export function initBAUForm() {
    injectStyles();

    let isVisible = false;
    let currentContextData = null;

    // --- POPUP CONTAINER ---
    const popup = document.createElement("div");
    popup.id = "bau-form-popup";
    popup.className = "bau-popup cw-module-window";
    popup.style.display = "none";

    // --- HEADER ---
    const animRefs = { googleLine: null };
    const header = createStandardHeader(
        popup,
        "BAU Form",
        "v1.0.3", // Updated version
        "Solicite a abertura de casos BAU rapidamente.",
        animRefs,
        () => toggleVisibility()
    );
    popup.appendChild(header);

    // --- CONTENT AREA ---
    const content = document.createElement("div");
    content.className = "bau-content";
    popup.appendChild(content);

    // --- FORM ELEMENT ---
    const form = document.createElement("form");
    content.appendChild(form);

    // 1. CONTEXT CARD
    const contextCard = document.createElement("div");
    contextCard.className = "bau-card";

    const banner = document.createElement("div");
    banner.className = "bau-header-banner";
    banner.innerHTML = `<span>⚠️</span> Verifique os dados capturados do CRM`;
    contextCard.appendChild(banner);

    const contextBody = document.createElement("div");
    contextBody.innerHTML = `
        <h2 class="bau-title" id="bau-adv-name">Carregando...</h2>
        <p class="bau-subtitle" id="bau-adv-details">CID: - • AM: -</p>
        <button type="button" id="bau-toggle-data" class="bau-accordion-btn">Ver todos os dados capturados ▼</button>
        <div id="bau-hidden-data" style="display: none; margin-top: 12px; font-size: 12px; color: #5F6368; line-height: 1.6; border-top: 1px dashed #DADCE0; padding-top: 12px;"></div>
    `;
    contextCard.appendChild(contextBody);
    form.appendChild(contextCard);

    // 2. DYNAMIC FALLBACK CARD
    const fallbackCard = document.createElement("div");
    fallbackCard.id = "bau-dynamic-fallback";
    fallbackCard.className = "bau-card bau-fallback-card";
    fallbackCard.style.display = "none";
    form.appendChild(fallbackCard);

    // 3. ACTION ZONE
    const actionCard = document.createElement("div");
    actionCard.className = "bau-card";

    const chipsLabel = document.createElement("label");
    chipsLabel.className = "bau-label";
    chipsLabel.textContent = "Ações Rápidas (Preenche Motivo e Task)";
    actionCard.appendChild(chipsLabel);

    const chipsContainer = document.createElement("div");
    chipsContainer.className = "bau-chips-container";

    chipData.forEach(data => {
        const chip = document.createElement("div");
        chip.className = "bau-chip";
        chip.textContent = data.text;
        chip.dataset.id = data.id;
        
        chip.onclick = () => {
            chipsContainer.querySelectorAll('.bau-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            SoundManager.playClick();
            
            const reasonSelect = form.querySelector('select[name="reason"]');
            const taskSelect = form.querySelector('select[name="taskType"]');
            if (reasonSelect) reasonSelect.value = data.reason;
            if (taskSelect) taskSelect.value = data.task;
        };
        chipsContainer.appendChild(chip);
    });
    actionCard.appendChild(chipsContainer);

    // Dropdowns and other fields...
    const dropdownRow = document.createElement("div");
    dropdownRow.className = "bau-grid-2";
    dropdownRow.style.marginTop = "16px";
    dropdownRow.innerHTML = `
        <div>
            <label class="bau-label">Motivo da Abertura</label>
            <select name="reason" required class="bau-select">
                <option value="">Selecione...</option>
                <option value="Nova Implementação">Nova Implementação</option>
                <option value="Correção de Tag">Correção de Tag</option>
                <option value="Upgrade / Migração">Upgrade / Migração</option>
                <option value="Troubleshooting">Troubleshooting</option>
            </select>
        </div>
        <div>
            <label class="bau-label">Task para BAU</label>
            <select name="taskType" required class="bau-select">
                <option value="">Selecione...</option>
                <option value="Setup GTM">Setup GTM</option>
                <option value="Google Ads Conversion">Google Ads Conversion</option>
                <option value="GA4 Events">GA4 Events</option>
                <option value="Outros">Outros</option>
            </select>
        </div>
    `;
    actionCard.appendChild(dropdownRow);

    const textLabel = document.createElement("label");
    textLabel.className = "bau-label";
    textLabel.textContent = "Justificativa / Descrição";
    textLabel.style.marginTop = "16px";
    actionCard.appendChild(textLabel);

    const textarea = document.createElement("textarea");
    textarea.name = "description";
    textarea.required = true;
    textarea.className = "bau-textarea";
    textarea.placeholder = "Descreva detalhadamente o que precisa ser feito...";
    textarea.style.minHeight = "100px";
    actionCard.appendChild(textarea);

    const dateLabel = document.createElement("label");
    dateLabel.className = "bau-label";
    dateLabel.textContent = "Disponibilidade (3 opções para reagendamento)";
    dateLabel.style.marginTop = "16px";
    actionCard.appendChild(dateLabel);

    const dateGrid = document.createElement("div");
    dateGrid.className = "bau-grid-2";
    dateGrid.style.gap = "12px";

    for (let i = 1; i <= 3; i++) {
        const d = document.createElement("input");
        d.type = "datetime-local";
        d.name = `availability_${i}`;
        d.required = true;
        d.className = "bau-input";
        dateGrid.appendChild(d);
    }
    actionCard.appendChild(dateGrid);
    form.appendChild(actionCard);

    // --- STICKY FOOTER ---
    const footer = document.createElement("div");
    footer.className = "bau-footer";
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "bau-btn-submit";
    submitBtn.innerHTML = `<span>📝</span> Enviar para o TL abrir o Caso`;
    footer.appendChild(submitBtn);
    form.appendChild(footer);

    document.body.appendChild(popup);

    // Accordion Toggle
    const toggleBtn = document.getElementById('bau-toggle-data');
    const hiddenDataEl = document.getElementById('bau-hidden-data');
    if (toggleBtn && hiddenDataEl) {
        toggleBtn.onclick = () => {
            const isHidden = hiddenDataEl.style.display === 'none';
            hiddenDataEl.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? "Ocultar dados ▲" : "Ver todos os dados capturados ▼";
            SoundManager.playClick();
        };
    }

    // --- DATA POPULATION ---
    async function populateContextData() {
        const pageData = await getPageData() || {};
        currentContextData = pageData;
        renderData(pageData);
    }

    function renderData(pd) {
        if (!pd) return;

        document.getElementById('bau-adv-name').textContent = pd.advName || "Anunciante Desconhecido";
        document.getElementById('bau-adv-details').textContent = `CID: ${pd.cid || "N/A"} • AM: ${pd.amName || "N/A"}`;
        
        const hiddenData = document.getElementById('bau-hidden-data');
        if (hiddenData) {
            hiddenData.innerHTML = `
                <b>Email:</b> ${pd.email || "N/A"}<br>
                <b>Idioma:</b> ${pd.language || "N/A"}<br>
                <b>Programa:</b> ${pd.salesProgram || "N/A"}<br>
                <b>Speakeasy ID:</b> ${pd.seId || "N/A"}<br>
                <b>Timezone:</b> ${pd.timezone || "N/A"}
            `;
        }

        const requiredFields = [
            { key: 'advName', label: 'Nome do Anunciante' },
            { key: 'cid', label: 'Customer ID (CID)' },
            { key: 'amName', label: 'Account Manager' },
            { key: 'email', label: 'Email de Contato' },
            { key: 'language', label: 'Idioma' },
            { key: 'salesProgram', label: 'Sales Program' },
            { key: 'seId', label: 'Speakeasy ID' },
            { key: 'site', label: 'Site / URL' },
            { key: 'timezone', label: 'Fuso Horário' }
        ];

        const missingFields = requiredFields.filter(f => !pd[f.key] || pd[f.key] === "N/A" || pd[f.key].trim() === "---");

        if (missingFields.length > 0) {
            fallbackCard.innerHTML = `
                <div style="color: #D93025; font-weight: 700; font-size: 13px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <span>⚠️</span> Preencha os itens não encontrados:
                </div>
                <div class="bau-grid-2" id="bau-fallback-grid"></div>
            `;
            const grid = fallbackCard.querySelector('#bau-fallback-grid');
            missingFields.forEach(f => {
                const fieldDiv = document.createElement("div");
                fieldDiv.innerHTML = `
                    <label class="bau-label">${f.label}</label>
                    <input type="text" name="${f.key}" class="bau-input" placeholder="Preencher ${f.label}...">
                `;
                grid.appendChild(fieldDiv);
            });

            fallbackCard.style.display = 'block';
            banner.style.background = COLORS.yellowLight;
            banner.style.color = "#E37400";
            banner.style.borderBottomColor = "#FEF1D1";
            banner.innerHTML = `<span>⚠️</span> Dados ausentes. Preencha os campos abaixo.`;
        } else {
            fallbackCard.style.display = 'none';
            banner.style.background = COLORS.greenLight;
            banner.style.color = COLORS.green;
            banner.style.borderBottomColor = COLORS.green;
            banner.innerHTML = `<span>✅</span> Todos os dados foram capturados do CRM!`;
        }
    }

    // --- FORM SUBMISSION LOGIC ---
    form.onsubmit = async (e) => {
        e.preventDefault();

        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Carregando...";

        const formData = new FormData(form);
        const escalationData = Object.fromEntries(formData.entries());
        
        const payload = {
            caseId: currentContextData.caseId || "",
            cid: escalationData.cid || currentContextData.cid || "",
            seId: escalationData.seId || currentContextData.seId || "",
            advName: escalationData.advName || currentContextData.advName || "",
            email: escalationData.email || currentContextData.email || "",
            language: escalationData.language || currentContextData.language || "",
            amName: escalationData.amName || currentContextData.amName || "",
            salesProgram: escalationData.salesProgram || currentContextData.salesProgram || "",
            site: escalationData.site || currentContextData.site || "",
            timezone: escalationData.timezone || currentContextData.timezone || "",
            reason: escalationData.reason,
            taskType: escalationData.taskType,
            description: escalationData.description,
            availability: `${escalationData.availability_1} | ${escalationData.availability_2} | ${escalationData.availability_3}`
        };

        const validationFields = Object.keys(payload).filter(k => k !== 'caseId');
        const emptyFields = validationFields.filter(key => {
            const value = payload[key];
            return !value || String(value).trim() === "" || String(value).trim() === "N/A" || String(value).trim() === "---";
        });

        if (emptyFields.length > 0) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            SoundManager.playClick();
            showToast(`Erro: Preencha todos os campos (${emptyFields.join(', ')})`, "error");
            
            // Highlight empty fields
            emptyFields.forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.classList.add('input-error');
                    setTimeout(() => field.classList.remove('input-error'), 3000);
                }
            });
            return;
        }

        try {
            await sendBAUEscalation(payload, currentContextData.agentEmail || "anon");
            SoundManager.playSuccess();
            showToast("Escalonamento enviado com sucesso!", "success");
            form.reset();
            chipsContainer.querySelectorAll('.bau-chip.active').forEach(c => c.classList.remove('active'));
            toggleVisibility(); 

        } catch (error) {
            console.error("Erro BAU:", error);
            showToast("Falha ao enviar: " + (error.message || "Erro desconhecido"), "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    };

    async function toggleVisibility() {
        isVisible = !isVisible;
        popup.style.display = isVisible ? "flex" : "none";
        if (isVisible) {
            await populateContextData();
        }
        toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }

    return toggleVisibility;
}
