
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
    let currentStep = 1;
    const totalSteps = 3;

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
        "v1.1.0", // Versão atualizada para refletir a nova UX
        "Solicite a abertura de casos BAU em um fluxo guiado.",
        animRefs,
        () => toggleVisibility()
    );
    popup.appendChild(header);

    // --- PROGRESS INDICATOR (WIZARD STEPS) ---
    const progressIndicator = document.createElement("div");
    progressIndicator.className = "bau-progress-indicator";
    popup.appendChild(progressIndicator);

    // --- CONTENT AREA ---
    
    const content = document.createElement("div");
    content.className = "bau-content";
    popup.appendChild(content);

    // --- FORM ELEMENT ---
    
    const form = document.createElement("form");
    content.appendChild(form);

    // --- STEP 1: CONTEXTO E VALIDAÇÃO ---
    const step1 = document.createElement("div");
    step1.className = "bau-step active";
    step1.id = "bau-step-1";

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
dateLabel.textContent = "Disponibilidade (3 opções para reagendamento)";
dateLabel.style.marginTop = "16px";
detailsCard.appendChild(dateLabel);

const dateGrid = document.createElement("div");
dateGrid.className = "bau-grid-2"; // Reutilizando a classe para um grid de 2, mas pode ser ajustado
dateGrid.style.gap = "12px";

// Criando 3 campos de data
for (let i = 1; i <= 3; i++) {
    const d = document.createElement("input");
    d.type = "datetime-local";
    d.name = `availability_${i}`;
    d.required = i === 1; // Apenas o primeiro é obrigatório
    d.className = "bau-input";
    dateGrid.appendChild(d);
}
    detailsCard.appendChild(dateGrid);
    step3.appendChild(detailsCard);
    form.appendChild(step3);

    // --- STICKY FOOTER & NAVIGATION ---
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
    
    popup.appendChild(footer); // Adicionando o footer ao popup, não ao form

    document.body.appendChild(popup);

    // --- WIZARD LOGIC ---
    function updateWizardState() {
        // Atualiza os steps
        form.querySelectorAll('.bau-step').forEach((step, index) => {
            step.classList.toggle('active', (index + 1) === currentStep);
        });

        // Atualiza o indicador de progresso
        progressIndicator.innerHTML = '';
        for (let i = 1; i <= totalSteps; i++) {
            const stepDot = document.createElement('div');
            stepDot.className = `bau-progress-step ${i === currentStep ? 'active' : (i < currentStep ? 'completed' : '')}`;
            stepDot.textContent = i;
            progressIndicator.appendChild(stepDot);
        }

        // Atualiza os botões de navegação
        backBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
        nextBtn.style.display = currentStep < totalSteps ? 'inline-block' : 'none';
        submitBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';
    }

    function validateStep(step) {
        const inputs = form.querySelectorAll(`#bau-step-${step} [required]`);
        for (const input of inputs) {
            if (!input.value.trim()) {
                showToast(`Erro: O campo '${input.previousElementSibling?.textContent || input.name}' é obrigatório.`, "error");
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
        // ... (lógica de renderização dos dados do CRM e fallback - SEM ALTERAÇÕES)
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
                    <input type="text" name="${f.key}" class="bau-input" placeholder="Preencher ${f.label}..." required>
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

        if (!validateStep(totalSteps)) return; // Valida a última etapa antes de enviar

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
    
    // Inicialização do Wizard
    updateWizardState();

    return toggleVisibility;
}
