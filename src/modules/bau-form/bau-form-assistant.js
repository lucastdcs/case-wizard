
import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { sendBAUEscalation } from '../shared/data-service.js';
import { getPageData } from '../shared/page-data.js';
import { chipData } from './bau-form-config.js';
import { fetchAndInsertSpeakeasyId } from '../notes/automation/case-log-scraper.js';

export function initBAUForm() {
    injectStyles();

    let isVisible = false;
    let currentContextData = null;
    let currentStep = 1;
    const totalSteps = 4;

    const popup = document.createElement("div");
    popup.id = "bau-form-popup";
    popup.className = "bau-popup cw-module-window";
    popup.style.display = "none";

    const animRefs = { googleLine: null };
    const header = createStandardHeader(
        popup,
        "BAU Form",
        "v1.2.0", 
        "Solicite a abertura de casos BAU em um fluxo guiado.",
        animRefs,
        () => toggleVisibility()
    );
    popup.appendChild(header);

    const progressIndicator = document.createElement("div");
    progressIndicator.className = "bau-progress-indicator";
    popup.appendChild(progressIndicator);

    const content = document.createElement("div");
    content.className = "bau-content";
    popup.appendChild(content);

    const form = document.createElement("form");
    content.appendChild(form);

    // --- STEP 1: CONTEXTO E VALIDAÇÃO ---
    const step1 = document.createElement("div");
    step1.className = "bau-step active";
    step1.id = "bau-step-1";

    const contextCard = document.createElement("div");
    contextCard.className = "bau-card bau-context-card";

    const banner = document.createElement("div");
    banner.className = "bau-header-banner";
    contextCard.appendChild(banner);

    const contextBody = document.createElement("div");
    contextBody.innerHTML = `
        <div class="bau-inline-field" title="Clique para editar" style="margin-bottom: 4px;">
            <input type="text" id="bau-adv-name-input" name="advName" class="bau-title bau-inline-input" style="border-bottom: none; font-size: 20px;" placeholder="Nome do Anunciante">
        </div>
        <div style="display: flex; align-items: center; gap: 8px; margin-left: 10px; opacity: 0.9;">
            <div class="bau-inline-field" title="Clique para editar" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">CID:</span>
                 <input type="text" id="bau-cid-input" name="cid" class="bau-inline-input" style="width: 120px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="CID">
            </div>
            <span style="color: #fff; opacity: 0.5;">•</span>
            <div class="bau-inline-field" title="Clique para editar" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">AM:</span>
                 <input type="text" id="bau-am-name-input" name="amName" class="bau-inline-input" style="width: 150px; font-size: 13px; border-bottom-color: rgba(255,255,255,0.3);" placeholder="Account Manager">
            </div>
        </div>
        <div id="bau-all-data"></div>
    `;
    contextCard.appendChild(contextBody);
    step1.appendChild(contextCard);
    form.appendChild(step1);

    // --- STEP 2: TASKS ---
    const step2 = document.createElement("div");
    step2.className = "bau-step";
    step2.id = "bau-step-2";

    const actionCard = document.createElement("div");
    actionCard.className = "bau-card";

    actionCard.innerHTML = `
        <label class="bau-label">Motivo da Abertura</label>
        <select name="reason" required class="bau-select">
            <option value="">Selecione...</option>
            <option value="Nova Implementação">Nova Implementação</option>
            <option value="Correção de Tag">Correção de Tag</option>
            <option value="Upgrade / Migração">Upgrade / Migração</option>
            <option value="Troubleshooting">Troubleshooting</option>
        </select>

        <label class="bau-label" style="margin-top: 24px;">Tasks para BAU (Selecione 1 ou mais)</label>
        <div class="bau-tasks-grid" id="bau-tasks-container">
            ${['Setup GTM', 'Google Ads Conversion', 'GA4 Events', 'Enhanced Conversions', 'Offline Conversions', 'Consent Mode', 'Troubleshooting', 'Outros'].map(task => `
                <label class="bau-task-item">
                    <input type="checkbox" name="taskType" value="${task}">
                    <span>${task}</span>
                </label>
            `).join('')}
        </div>
    `;

    // Lógica para toggle visual dos itens de task
    actionCard.querySelectorAll('.bau-task-item').forEach(item => {
        const input = item.querySelector('input');
        item.onclick = (e) => {
            // Se clicar no label, o input já troca. Se clicar no item, trocamos manualmente.
            if (e.target !== input) {
                input.checked = !input.checked;
            }
            item.classList.toggle('active', input.checked);
            SoundManager.playClick();
        };
    });

    step2.appendChild(actionCard);
    form.appendChild(step2);

    // --- STEP 3: JUSTIFICATIVA E AGENDAMENTO ---
    const step3 = document.createElement("div");
    step3.className = "bau-step";
    step3.id = "bau-step-3";

    const detailsCard = document.createElement("div");
    detailsCard.className = "bau-card";

    const textLabel = document.createElement("label");
    textLabel.className = "bau-label";
    textLabel.textContent = "Justificativa / Descrição";
    detailsCard.appendChild(textLabel);

    const textarea = document.createElement("textarea");
    textarea.name = "description";
    textarea.required = true;
    textarea.className = "bau-textarea";
    textarea.placeholder = "Descreva detalhadamente o que precisa ser feito...";
    textarea.style.minHeight = "120px";
    detailsCard.appendChild(textarea);

    const dateLabel = document.createElement("label");
    dateLabel.className = "bau-label";
    dateLabel.textContent = "Disponibilidade (mínimo 1 opção)";
    dateLabel.style.marginTop = "20px";
    detailsCard.appendChild(dateLabel);

    const availabilityContainer = document.createElement("div");
    availabilityContainer.className = "bau-availability-container";

    for (let i = 1; i <= 3; i++) {
        const d = document.createElement("input");
        d.type = "datetime-local";
        d.name = `availability_${i}`;
        d.required = i === 1;
        d.className = "bau-input";
        availabilityContainer.appendChild(d);
    }
    detailsCard.appendChild(availabilityContainer);

    const availabilityHint = document.createElement("div");
    availabilityHint.className = "bau-availability-hint";
    detailsCard.appendChild(availabilityHint);
    
    step3.appendChild(detailsCard);
    form.appendChild(step3);

    // --- STEP 4: CONFIRMAÇÃO ---
    const step4 = document.createElement("div");
    step4.className = "bau-step";
    step4.id = "bau-step-4";

    const confirmCard = document.createElement("div");
    confirmCard.className = "bau-card";
    confirmCard.innerHTML = `
        <h3 style="margin-top: 0; color: ${COLORS.blue}; font-size: 16px; margin-bottom: 20px;">Confirme os dados antes de enviar</h3>
        <div id="bau-confirmation-details"></div>
    `;
    step4.appendChild(confirmCard);
    form.appendChild(step4);

    // --- FOOTER & NAVIGATION ---
    const footer = document.createElement("div");
    footer.className = "bau-footer";

    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "bau-btn-secondary";
    backBtn.textContent = "Voltar";
    footer.appendChild(backBtn);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "bau-btn-primary";
    nextBtn.textContent = "Próximo";
    footer.appendChild(nextBtn);
    
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "bau-btn-submit";
    submitBtn.innerHTML = `<span>📝</span> Enviar para o TL`;
    submitBtn.style.display = "none";
    footer.appendChild(submitBtn);
    
    popup.appendChild(footer);
    document.body.appendChild(popup);

    // --- WIZARD LOGIC ---
    function updateWizardState() {
        form.querySelectorAll('.bau-step').forEach((step, index) => {
            step.classList.toggle('active', (index + 1) === currentStep);
        });

        progressIndicator.innerHTML = '';
        for (let i = 1; i <= totalSteps; i++) {
            const stepDot = document.createElement('div');
            stepDot.className = `bau-progress-step ${i === currentStep ? 'active' : (i < currentStep ? 'completed' : '')}`;
            stepDot.textContent = i;
            progressIndicator.appendChild(stepDot);
        }

        backBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        nextBtn.style.display = currentStep < totalSteps ? 'inline-block' : 'none';
        submitBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';

        if (currentStep === 4) {
            renderConfirmation();
        }
    }

    function renderConfirmation() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const tasks = formData.getAll('taskType');
        const availabilities = [data.availability_1, data.availability_2, data.availability_3]
            .filter(v => v && v.trim() !== "")
            .map(v => v.replace('T', ' '))
            .join(' | ');

        const container = document.getElementById('bau-confirmation-details');
        container.innerHTML = `
            <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante:</span><span class="bau-confirm-value">${data.advName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">CID:</span><span class="bau-confirm-value">${data.cid}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">AM:</span><span class="bau-confirm-value">${data.amName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Email:</span><span class="bau-confirm-value">${data.email || 'N/A'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Programa:</span><span class="bau-confirm-value">${data.salesProgram || 'N/A'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Speakeasy ID:</span><span class="bau-confirm-value">${data.seId || 'N/A'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Motivo:</span><span class="bau-confirm-value">${data.reason}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Tasks:</span><span class="bau-confirm-value">${tasks.join(', ')}</span></div>
            <div class="bau-confirm-row" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                <span class="bau-confirm-label">Descrição:</span>
                <div style="font-size: 13px; color: ${COLORS.textPrimary}; background: #f8f9fa; padding: 12px; border-radius: 8px; width: 100%; box-sizing: border-box; white-space: pre-wrap;">${data.description}</div>
            </div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Disponibilidade:</span><span class="bau-confirm-value">${availabilities || 'N/A'}</span></div>
        `;
    }

    function validateStep(step) {
        if (step === 2) {
            const reason = form.querySelector('select[name="reason"]').value;
            const tasks = Array.from(form.querySelectorAll('input[name="taskType"]:checked'));
            if (!reason) {
                showToast("Erro: O Motivo da Abertura é obrigatório.", "error");
                return false;
            }
            if (tasks.length === 0) {
                showToast("Erro: Selecione pelo menos uma Task.", "error");
                return false;
            }
            return true;
        }

        const inputs = form.querySelectorAll(`#bau-step-${step} [required]`);
        for (const input of inputs) {
            if (!input.value.trim()) {
                let labelText = "";
                const label = input.closest('div').querySelector('.bau-label');
                if (label) {
                    labelText = label.textContent;
                } else {
                    const inlineLabel = input.closest('.bau-inline-field')?.querySelector('span');
                    labelText = inlineLabel ? inlineLabel.textContent : input.placeholder || input.name;
                }

                showToast(`Erro: O campo '${labelText.replace(':', '')}' é obrigatório.`, "error");
                input.classList.add('input-error');
                setTimeout(() => input.classList.remove('input-error'), 3000);
                return false;
            }
        }
        return true;
    }

    nextBtn.onclick = () => {
        if (validateStep(currentStep)) {
            currentStep++;
            updateWizardState();
            SoundManager.playClick();
        }
    };

    backBtn.onclick = () => {
        if (currentStep > 1) {
            currentStep--;
            updateWizardState();
            SoundManager.playClick();
        }
    };

    // --- DATA POPULATION ---
    async function populateContextData() {
        const pageData = await getPageData() || {};
        currentContextData = pageData;
        renderData(pageData);
    }

    function renderData(pd) {
        if (!pd) return;

        form.querySelector('[name="advName"]').value = pd.advName || "";
        form.querySelector('[name="cid"]').value = pd.cid || "";
        form.querySelector('[name="amName"]').value = pd.amName || "";
        
        const allDataEl = document.getElementById('bau-all-data');
        if (allDataEl) {
            allDataEl.innerHTML = "";

            const fields = [
                { label: 'Email', name: 'email', value: pd.email },
                { label: 'Idioma', name: 'language', value: pd.language },
                { label: 'Programa', name: 'salesProgram', value: pd.salesProgram },
                { label: 'Speakeasy ID', name: 'seId', value: pd.seId, isSpeakeasy: true },
                { label: 'Timezone', name: 'timezone', value: pd.timezone }
            ];

            fields.forEach(f => {
                const row = document.createElement('div');
                row.className = "bau-inline-field";
                row.title = "Clique para editar";

                const label = document.createElement('b');
                label.textContent = `${f.label}:`;
                row.appendChild(label);

                const input = document.createElement('input');
                input.type = "text";
                input.name = f.name;
                input.className = "bau-inline-input";
                input.value = f.value || "";
                input.placeholder = `Preencher ${f.label}...`;
                if (f.isSpeakeasy) input.id = "bau-context-se-id-input";

                // Se o valor for vazio, destacamos visualmente (opcional, já tem o placeholder)
                if (!f.value || f.value === "N/A" || f.value === "---") {
                    input.value = "";
                }

                row.appendChild(input);

                if (f.isSpeakeasy) {
                    const btnSearch = document.createElement('button');
                    btnSearch.type = "button";
                    btnSearch.innerHTML = `✨ Auto Busca`;
                    btnSearch.style.cssText = `font-size: 10px; font-weight: 700; color: #fff; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 100px; padding: 2px 10px; cursor: pointer; transition: all 0.2s; margin-left: 4px; flex-shrink: 0;`;
                    btnSearch.onmouseenter = () => btnSearch.style.background = "rgba(255,255,255,0.3)";
                    btnSearch.onmouseleave = () => btnSearch.style.background = "rgba(255,255,255,0.2)";
                    btnSearch.onclick = async (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        await fetchAndInsertSpeakeasyId("bau-context-se-id-input");
                        currentContextData.seId = input.value;
                    };
                    row.appendChild(btnSearch);
                }

                // Ao clicar na linha, foca o input
                row.onclick = () => input.focus();

                allDataEl.appendChild(row);
            });
        }

        // Atualiza a dica de fuso horário
        availabilityHint.innerHTML = `ℹ️ Lembrete: Os horários são baseados no seu fuso horário atual (${pd.timezone || 'não detectado'}). Fornecer mais de uma opção aumenta a chance de agendamento rápido.`

        const requiredFields = [
            { key: 'advName', label: 'Nome do Anunciante' },
            { key: 'cid', label: 'Customer ID (CID)' },
            { key: 'amName', label: 'Account Manager' }
        ];

        const missingFields = requiredFields.filter(f => !pd[f.key] || pd[f.key] === "N/A" || pd[f.key].trim() === "---");

        if (missingFields.length > 0) {
            banner.innerHTML = `<span>⚠️</span> Alguns dados não foram encontrados. Por favor, complete os campos editáveis acima.`;
        } else {
            banner.innerHTML = `<span>✅</span> Dados do CRM carregados. Você pode editar qualquer campo clicando nele.`;
        }
    }

    // --- FORM SUBMISSION & OTHER LOGIC ---
    form.onsubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(totalSteps)) return;
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";
        const formData = new FormData(form);
        const escalationData = Object.fromEntries(formData.entries());
        const tasks = formData.getAll('taskType');

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
            taskType: tasks.join(', '),
            description: escalationData.description,
            availability: `${escalationData.availability_1 || ''} | ${escalationData.availability_2 || ''} | ${escalationData.availability_3 || ''}`.trim()
        };
        try {
            await sendBAUEscalation(payload, currentContextData.agentEmail || "anon");
            SoundManager.playSuccess();
            showToast("Escalonamento enviado com sucesso!", "success");
            form.reset();
            currentStep = 1;
            updateWizardState();
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
            currentStep = 1;
            updateWizardState();
            await populateContextData();
        }
        toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }
    
    updateWizardState();
    return toggleVisibility;
}
