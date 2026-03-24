
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
    const totalSteps = 3;

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
    contextCard.className = "bau-card bau-context-card"; // Nova classe para o estilo Gemini

    const banner = document.createElement("div");
    banner.className = "bau-header-banner";
    contextCard.appendChild(banner);

    const contextBody = document.createElement("div");
    // Acordeão removido, dados sempre visíveis
    contextBody.innerHTML = `
        <h2 class="bau-title" id="bau-adv-name">Carregando...</h2>
        <p class="bau-subtitle" id="bau-adv-details">CID: - • AM: -</p>
        <div id="bau-all-data" style="margin-top: 16px; font-size: 13px; color: #5F6368; line-height: 1.7; border-top: 1px dashed #DADCE0; padding-top: 16px;"></div>
    `;
    contextCard.appendChild(contextBody);
    step1.appendChild(contextCard);

    const fallbackCard = document.createElement("div");
    fallbackCard.id = "bau-dynamic-fallback";
    fallbackCard.className = "bau-card bau-fallback-card";
    fallbackCard.style.display = "none";
    step1.appendChild(fallbackCard);
    form.appendChild(step1);

    // --- STEP 2: AÇÕES RÁPIDAS E TASKS ---
    const step2 = document.createElement("div");
    step2.className = "bau-step";
    step2.id = "bau-step-2";
    // ... (O conteúdo do passo 2 permanece o mesmo)
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
            form.querySelector('select[name="reason"]').value = data.reason;
            form.querySelector('select[name="taskType"]').value = data.task;
        };
        chipsContainer.appendChild(chip);
    });
    actionCard.appendChild(chipsContainer);
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
    }

    function validateStep(step) {
        const inputs = form.querySelectorAll(`#bau-step-${step} [required]`);
        for (const input of inputs) {
            if (!input.value.trim()) {
                const label = input.closest('div').querySelector('.bau-label');
                showToast(`Erro: O campo '${label?.textContent || input.name}' é obrigatório.`, "error");
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

        document.getElementById('bau-adv-name').textContent = pd.advName || "Anunciante Desconhecido";
        document.getElementById('bau-adv-details').textContent = `CID: ${pd.cid || "N/A"} • AM: ${pd.amName || "N/A"}`;
        
        const allDataEl = document.getElementById('bau-all-data');
        if (allDataEl) {
            allDataEl.innerHTML = "";

            const fields = [
                { label: 'Email', value: pd.email },
                { label: 'Idioma', value: pd.language },
                { label: 'Programa', value: pd.salesProgram },
                { label: 'Speakeasy ID', value: pd.seId, isSpeakeasy: true },
                { label: 'Timezone', value: pd.timezone }
            ];

            fields.forEach(f => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '8px';
                row.style.marginBottom = '4px';

                const label = document.createElement('b');
                label.textContent = `${f.label}:`;
                row.appendChild(label);

                const valueSpan = document.createElement('span');
                valueSpan.textContent = f.value || "N/A";
                if (f.isSpeakeasy) valueSpan.id = "bau-context-se-id";
                row.appendChild(valueSpan);

                if (f.isSpeakeasy) {
                    const btnSearch = document.createElement('button');
                    btnSearch.type = "button";
                    btnSearch.innerHTML = `✨ Auto Busca`;
                    btnSearch.style.cssText = `font-size: 10px; font-weight: 700; color: #fff; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 100px; padding: 2px 10px; cursor: pointer; transition: all 0.2s; margin-left: 4px;`;
                    btnSearch.onmouseenter = () => btnSearch.style.background = "rgba(255,255,255,0.3)";
                    btnSearch.onmouseleave = () => btnSearch.style.background = "rgba(255,255,255,0.2)";
                    btnSearch.onclick = async (e) => {
                        e.preventDefault();
                        await fetchAndInsertSpeakeasyId("bau-context-se-id");
                        // Sync back to currentContextData if needed, though sendBAUEscalation uses payload
                        const newValue = document.getElementById("bau-context-se-id").value || document.getElementById("bau-context-se-id").textContent;
                        currentContextData.seId = newValue;
                    };
                    row.appendChild(btnSearch);
                }

                allDataEl.appendChild(row);
            });
        }

        // Atualiza a dica de fuso horário
        availabilityHint.innerHTML = `ℹ️ Lembrete: Os horários são baseados no seu fuso horário atual (${pd.timezone || 'não detectado'}). Fornecer mais de uma opção aumenta a chance de agendamento rápido.`

        const requiredFields = [
            { key: 'advName', label: 'Nome do Anunciante' },
            { key: 'cid', label: 'Customer ID (CID)' },
            { key: 'amName', label: 'Account Manager' },
            { key: 'email', label: 'Email de Contato' },
            // ... outros campos essenciais
        ];

        const missingFields = requiredFields.filter(f => !pd[f.key] || pd[f.key] === "N/A" || pd[f.key].trim() === "---");

        if (missingFields.length > 0) {
            fallbackCard.innerHTML = `
                <div class="bau-fallback-header">
                    <span>⚠️</span> Complete os dados não encontrados:
                </div>
                <div class="bau-grid-2" id="bau-fallback-grid"></div>
            `;
            const grid = fallbackCard.querySelector('#bau-fallback-grid');
            missingFields.forEach(f => {
                const fieldDiv = document.createElement("div");
                fieldDiv.style.position = "relative";

                const labelWrapper = document.createElement("div");
                labelWrapper.style.display = "flex";
                labelWrapper.style.alignItems = "center";
                labelWrapper.style.justifyContent = "space-between";

                const label = document.createElement("label");
                label.className = "bau-label";
                label.textContent = f.label;
                labelWrapper.appendChild(label);

                if (f.key === "seId") {
                    const btnSearch = document.createElement('button');
                    btnSearch.type = "button";
                    btnSearch.innerHTML = `✨ Auto Busca`;
                    btnSearch.style.cssText = `font-size: 11px; font-weight: 700; color: ${COLORS.blue}; background: ${COLORS.blueLight}; border: none; border-radius: 100px; padding: 4px 12px; cursor: pointer; transition: all 0.2s; margin-top: 12px;`;
                    btnSearch.onclick = (e) => {
                        e.preventDefault();
                        fetchAndInsertSpeakeasyId(`fallback-input-${f.key}`);
                    };
                    labelWrapper.appendChild(btnSearch);
                }

                fieldDiv.appendChild(labelWrapper);

                const input = document.createElement("input");
                input.type = "text";
                input.name = f.key;
                input.id = `fallback-input-${f.key}`;
                input.className = "bau-input";
                input.placeholder = `Preencher ${f.label}...`;
                input.required = true;
                fieldDiv.appendChild(input);

                grid.appendChild(fieldDiv);
            });

            fallbackCard.style.display = 'block';
            banner.style.background = 'transparent'; // Fundo do banner fica neutro
            banner.innerHTML = `<span>⚠️</span> Dados ausentes! Por favor, preencha os campos no card abaixo para continuar.`;
        } else {
            fallbackCard.style.display = 'none';
            banner.style.background = 'transparent';
            banner.innerHTML = `<span>✅</span> Dados do CRM carregados com sucesso!`;
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
            availability: `${escalationData.availability_1 || ''} | ${escalationData.availability_2 || ''} | ${escalationData.availability_3 || ''}`.trim()
        };
        try {
            await sendBAUEscalation(payload, currentContextData.agentEmail || "anon");
            SoundManager.playSuccess();
            showToast("Escalonamento enviado com sucesso!", "success");
            form.reset();
            chipsContainer.querySelectorAll('.bau-chip.active').forEach(c => c.classList.remove('active'));
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
