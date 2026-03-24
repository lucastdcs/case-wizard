
import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { sendBAUEscalation, readAgentBAU } from '../shared/data-service.js';
import { getPageData } from '../shared/page-data.js';
import { fetchAndInsertSpeakeasyId } from '../notes/automation/case-log-scraper.js';

export function initBAUForm() {
    injectStyles();

    let isVisible = false;
    let currentView = 'dashboard';
    let currentContextData = null;
    let currentStep = 1;
    const totalSteps = 4;

    const popup = document.createElement("div");
    popup.id = "bau-form-popup";
    popup.className = "bau-popup cw-module-window";
    popup.style.display = "none";

    const header = createStandardHeader(
        popup,
        "BAU Central",
        "v2.0.0",
        "Dashboard de Casos BAU",
        {},
        () => toggleVisibility()
    );
    popup.appendChild(header);

    const viewContainer = document.createElement('div');
    viewContainer.className = 'bau-view-container';
    popup.appendChild(viewContainer);

    // --- VIEW 1: DASHBOARD ---
    const dashboardView = document.createElement('div');
    dashboardView.id = 'bau-view-dashboard';
    dashboardView.className = 'bau-view active';
    dashboardView.innerHTML = `
        <div class="bau-dashboard-content">
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            <span class="material-icons">add</span>
            Novo Caso BAU
        </button>
    `;
    viewContainer.appendChild(dashboardView);

    // --- VIEW 2: FORM ---
    const formView = document.createElement('div');
    formView.id = 'bau-view-form';
    formView.className = 'bau-view';

    const formHeader = document.createElement('div');
    formHeader.className = 'bau-view-header';
    formHeader.innerHTML = `
      <button class="bau-back-btn" id="bau-form-back-btn">
        <span class="material-icons">arrow_back</span>
        Voltar ao Dashboard
      </button>
    `;
    formView.appendChild(formHeader);

    const formUiContainer = document.createElement('div');
    formUiContainer.className = "bau-content"; 
    formView.appendChild(formUiContainer);

    const progressIndicator = document.createElement("div");
    progressIndicator.className = "bau-progress-indicator";
    formUiContainer.appendChild(progressIndicator);

    const form = document.createElement("form");
    form.id = "bau-escalation-form";
    formUiContainer.appendChild(form);

    const languageInput = document.createElement('input');
    languageInput.type = 'hidden';
    languageInput.name = 'language';
    form.appendChild(languageInput);
    
    // --- STEP 1: CONTEXTO E VALIDAÇÃO ---
    const step1 = document.createElement("div");
    step1.className = "bau-step active";
    step1.id = "bau-step-1";
    const contextCard = document.createElement("div");
    contextCard.className = "bau-card bau-context-card";
    contextCard.innerHTML = `
        <div class="bau-inline-field" style="margin-bottom: 4px;">
            <input type="text" name="advName" class="bau-title bau-inline-input" style="border-bottom: none; font-size: 20px;" placeholder="Nome do Anunciante" required>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-left: 10px; opacity: 0.9;">
            <div class="bau-inline-field" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">CID:</span>
                 <input type="text" name="cid" class="bau-inline-input" style="width: 110px; font-size: 13px;" placeholder="CID" required>
            </div>
            <span style="color: #fff; opacity: 0.5;">•</span>
            <div class="bau-inline-field" style="padding: 2px 6px;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">AM:</span>
                 <input type="text" name="amName" class="bau-inline-input" style="width: 130px; font-size: 13px;" placeholder="Account Manager" required>
            </div>
            <span style="color: #fff; opacity: 0.5;">•</span>
            <div class="bau-inline-field" style="padding: 2px 6px; position: relative;">
                 <span style="color: #fff; font-size: 13px; font-weight: 700;">SE ID:</span>
                 <input type="text" id="bau-context-se-id-input" name="seId" class="bau-inline-input" style="width: 160px; font-size: 13px;" placeholder="Speakeasy ID">
                 <button type="button" id="bau-top-se-search" class="bau-mini-btn" title="Buscar ID automaticamente"><span class="material-icons" style="font-size: 14px;">magic_wand</span></button>
            </div>
        </div>
        <div id="bau-all-data"></div>
    `;
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
    actionCard.querySelectorAll('.bau-task-item').forEach(item => {
        const input = item.querySelector('input');
        item.addEventListener('click', () => { input.checked = !input.checked; item.classList.toggle('active', input.checked); SoundManager.playClick(); });
    });
    step2.appendChild(actionCard);
    form.appendChild(step2);

    // --- STEP 3: JUSTIFICATIVA E AGENDAMENTO ---
    const step3 = document.createElement("div");
    step3.className = "bau-step";
    step3.id = "bau-step-3";
    const detailsCard = document.createElement("div");
    detailsCard.className = "bau-card";
    detailsCard.innerHTML = `
        <label class="bau-label">Motivo da Não Implementação (Justificativa BAU)</label>
        <select name="nonImplementationReason" required class="bau-select">
            <option value="">Selecione um motivo...</option>
            ${["Tempo da consultoria esgotado", "Solicitação de reagendamento pelo anunciante", "Falta de acessos ou backup do site", "Anunciante indisponível ou não preparado", "Implementação parcial (nem todas as tasks concluídas)", "Solicitação de tarefas (tasks) adicionais", "Necessidade de novas alterações (fase de acompanhamento)", "Retorno de contato após prazo de 14 dias expirado"].map(r => `<option value="${r}">${r}</option>`).join('')}
        </select>
        <label class="bau-label" style="margin-top: 20px;">Justificativa / Descrição</label>
        <textarea name="description" required class="bau-textarea" placeholder="Descreva detalhadamente o que precisa ser feito..." style="min-height: 120px;"></textarea>
        <label class="bau-label" style="margin-top: 20px;">Disponibilidade (mínimo 1 opção)</label>
        <div class="bau-availability-container">
            <input type="datetime-local" name="availability_1" required class="bau-input">
            <input type="datetime-local" name="availability_2" class="bau-input">
            <input type="datetime-local" name="availability_3" class="bau-input">
        </div>
        <div class="bau-availability-hint"></div>
    `;
    step3.appendChild(detailsCard);
    form.appendChild(step3);
    
    // --- STEP 4: CONFIRMAÇÃO ---
    const step4 = document.createElement("div");
    step4.className = "bau-step";
    step4.id = "bau-step-4";
    step4.innerHTML = `
        <div class="bau-card">
            <h3 style="margin-top: 0; color: ${COLORS.blue}; font-size: 16px; margin-bottom: 20px;">Confirme os dados antes de enviar</h3>
            <div id="bau-confirmation-details"></div>
        </div>
    `;
    form.appendChild(step4);

    // --- FOOTER & NAVIGATION ---
    const footer = document.createElement("div");
    footer.className = "bau-footer";
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.id = "bau-step-back-btn";
    backBtn.className = "bau-btn-secondary";
    backBtn.textContent = "Voltar";
    footer.appendChild(backBtn);
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.id = "bau-step-next-btn";
    nextBtn.className = "bau-btn-primary";
    nextBtn.textContent = "Próximo";
    footer.appendChild(nextBtn);
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "bau-btn-submit";
    submitBtn.setAttribute("form", "bau-escalation-form");
    submitBtn.innerHTML = `<span class="material-icons">send</span> Enviar para o TL`;
    submitBtn.style.display = "none";
    footer.appendChild(submitBtn);
    formUiContainer.appendChild(footer);

    viewContainer.appendChild(formView);

    // --- VIEW 3: SUCCESS ---
    const successView = document.createElement('div');
    successView.id = 'bau-view-success';
    successView.className = 'bau-view';
    successView.innerHTML = `
        <div class="bau-success-content">
            <div class="bau-success-icon"><span class="material-icons">check_circle</span></div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-message">Sua solicitação foi recebida e será processada em breve.</p>
            <button class="bau-btn-primary" id="bau-success-back-btn">Voltar ao Dashboard</button>
        </div>
    `;
    viewContainer.appendChild(successView);
    document.body.appendChild(popup);

    function switchView(viewName) {
        currentView = viewName;
        popup.querySelectorAll('.bau-view').forEach(v => v.classList.remove('active'));
        popup.querySelector(`#bau-view-${viewName}`).classList.add('active');

        const titleEl = header.querySelector('.cw-module-header-title');
        const subtitleEl = header.querySelector('.cw-module-header-subtitle');
        if (viewName === 'form') {
            titleEl.textContent = 'Novo Caso BAU';
            subtitleEl.textContent = 'Preencha os detalhes abaixo';
        } else {
            titleEl.textContent = 'BAU Central';
            subtitleEl.textContent = 'Dashboard de Casos BAU';
        }
    }

    async function loadDashboardData() {
        const listEl = document.getElementById('bau-case-list-container');
        listEl.innerHTML = '<p>Carregando casos...</p>';
        try {
            const cases = await readAgentBAU();
            renderDashboard(cases);
        } catch (error) {
            listEl.innerHTML = '<p style="color: red;">Erro ao carregar casos.</p>';
        }
    }

    function renderDashboard(cases) {
        const listEl = document.getElementById('bau-case-list-container');
        if (!cases || cases.length === 0) {
            listEl.innerHTML = '<p>Nenhum caso BAU encontrado.</p>';
            return;
        }
        listEl.innerHTML = cases.map(c => `
            <li class="bau-case-card" data-case-id="${c.id}">
                <div class="bau-case-info">
                    <h3 class="bau-case-title">${c.advName || 'Nome indefinido'}</h3>
                    <p class="bau-case-details">CID: ${c.cid || 'N/A'} • Motivo: ${c.reason || 'N/A'}</p>
                </div>
                <span class="bau-case-status-badge" data-status="${c.status || 'Pendente'}">${c.status || 'Pendente'}</span>
            </li>
        `).join('');
    }

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
        if (currentStep === 4) renderConfirmation();
    }
    
    function validateStep(step) {
        const stepEl = document.getElementById(`bau-step-${step}`);
        if (!stepEl) return true;
        if (step === 2) {
            if (!form.querySelector('select[name="reason"]').value) {
                showToast("Erro: O Motivo da Abertura é obrigatório.", { error: true });
                return false;
            }
            if (!form.querySelector('input[name="taskType"]:checked')) {
                showToast("Erro: Selecione pelo menos uma Task.", { error: true });
                return false;
            }
            return true;
        }
        for (const input of stepEl.querySelectorAll('[required]')) {
            if (!input.value.trim()) {
                showToast(`Erro: O campo '${input.name || input.placeholder}' é obrigatório.`, { error: true });
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
    
    async function populateContextData() {
        const pageData = await getPageData() || {};
        currentContextData = pageData;
        form.querySelector('[name="advName"]').value = pageData.advName || "";
        form.querySelector('[name="cid"]').value = pageData.cid || "";
        form.querySelector('[name="amName"]').value = pageData.amName || "";
        form.querySelector('[name="seId"]').value = pageData.seId || "";
    }

    popup.querySelector('#bau-top-se-search').onclick = (e) => {
        e.preventDefault();
        fetchAndInsertSpeakeasyId("bau-context-se-id-input");
    };

    function renderConfirmation() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const tasks = formData.getAll('taskType');
        const container = document.getElementById('bau-confirmation-details');
        container.innerHTML = `
            <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante:</span><span class="bau-confirm-value">${data.advName}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">CID:</span><span class="bau-confirm-value">${data.cid}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Motivo:</span><span class="bau-confirm-value">${data.reason}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Tasks:</span><span class="bau-confirm-value">${tasks.join(', ')}</span></div>
        `;
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(totalSteps)) return;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const tasks = formData.getAll('taskType');
        const payload = { ...data, taskType: tasks.join(', '), ...currentContextData };

        try {
            await sendBAUEscalation(payload, currentContextData.agentEmail || "anon");
            SoundManager.playSuccess();
            switchView('success');
        } catch (error) {
            showToast("Falha ao enviar: " + (error.message || "Erro desconhecido"), "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="material-icons">send</span> Enviar para o TL`;
        }
    };

    function resetForm() {
        form.reset();
        currentStep = 1;
        updateWizardState();
        actionCard.querySelectorAll('.bau-task-item.active').forEach(item => item.classList.remove('active'));
    }

    document.getElementById('bau-new-case-btn').onclick = () => {
        resetForm();
        switchView('form');
        populateContextData();
    };

    document.getElementById('bau-form-back-btn').onclick = () => switchView('dashboard');
    document.getElementById('bau-success-back-btn').onclick = () => switchView('dashboard');

    async function toggleVisibility() {
        isVisible = !isVisible;
        popup.style.display = isVisible ? "flex" : "none";
        if (isVisible) {
            switchView('dashboard');
            loadDashboardData();
        }
        toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }

    updateWizardState();
    return toggleVisibility;
}
