
import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { sendBAUEscalation, readAgentBAU } from '../shared/data-service.js';
import { getPageData } from '../shared/page-data.js';
import { fetchAndInsertSpeakeasyId } from '../notes/automation/case-log-scraper.js';

const ICONS = {
    add: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    back: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
    wand: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>`,
    send: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
    check: `<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    folder: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
    empty: `<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>`,
    refresh: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
    expand: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`
};

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
        "v2.1.0", // Updated version
        "Dashboard de Casos BAU",
        {},
        () => toggleVisibility()
    );

    // ADICIONAR BOTÃO REFRESH NO HEADER
    const headerActions = header.querySelector('div:last-child');
    if (headerActions) {
        const refreshBtn = document.createElement('div');
        refreshBtn.className = 'bau-refresh-btn no-drag';
        refreshBtn.innerHTML = ICONS.refresh;
        refreshBtn.title = "Atualizar Dashboard";

        refreshBtn.onclick = async (e) => {
            e.stopPropagation();
            if (refreshBtn.classList.contains('spinning')) return;

            refreshBtn.classList.add('spinning');
            SoundManager.playClick();
            await loadDashboardData();
            setTimeout(() => refreshBtn.classList.remove('spinning'), 1000);
        };

        headerActions.insertBefore(refreshBtn, headerActions.firstChild);
    }

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
            <div class="bau-dashboard-metrics" id="bau-dashboard-metrics"></div>
            <ul class="bau-case-list" id="bau-case-list-container"></ul>
        </div>
        <button class="bau-dashboard-fab" id="bau-new-case-btn">
            ${ICONS.add}
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
        ${ICONS.back}
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
    
    // --- STEP 1: CONTEXTO E VALIDAÇÃO ---
    const step1 = document.createElement("div");
    step1.className = "bau-step active";
    step1.id = "bau-step-1";

    const contextCard = document.createElement("div");
    contextCard.className = "bau-card bau-context-card";
    contextCard.innerHTML = `
        <div id="bau-vital-highlights" class="bau-highlight-panel"></div>
        <div id="bau-all-data"></div>
    `;

    const dynamicInputsContainer = document.createElement("div");
    dynamicInputsContainer.className = "bau-dynamic-inputs-container";
    dynamicInputsContainer.innerHTML = `
        <div class="bau-dynamic-input" id="wrapper-advName">
            <label class="bau-label">Nome do Anunciante</label>
            <input type="text" name="advName" class="bau-input" placeholder="Nome do Anunciante" required>
        </div>
        <div class="bau-dynamic-input" id="wrapper-cid">
            <label class="bau-label" data-tooltip="Use o formato 000-000-0000 ou 10 dígitos">CID</label>
            <input type="text" id="bau-cid-input" name="cid" class="bau-input" placeholder="000-000-0000" required>
            <div id="bau-cid-error" class="bau-cid-error-hint" style="display: none;">
                Formato de CID incorreto
            </div>
        </div>
        <div class="bau-dynamic-input" id="wrapper-amName">
            <label class="bau-label">Account Manager (AM)</label>
            <input type="text" name="amName" class="bau-input" placeholder="Nome do AM" required>
        </div>
        <div class="bau-dynamic-input" id="wrapper-seId">
            <label class="bau-label">Speakeasy ID (SE ID)</label>
            <div class="bau-input-group">
                <input type="text" id="bau-context-se-id-input" name="seId" class="bau-input" placeholder="Speakeasy ID">
                <button type="button" id="bau-top-se-search" class="bau-mini-btn-input" title="Buscar ID automaticamente">${ICONS.wand}</button>
            </div>
        </div>
    `;

    contextCard.insertBefore(dynamicInputsContainer, contextCard.querySelector('#bau-all-data'));
    step1.appendChild(contextCard);
    form.appendChild(step1);

    // --- STEP 2: TASKS ---
    const step2 = document.createElement("div");
    step2.className = "bau-step";
    step2.id = "bau-step-2";
    const actionCard = document.createElement("div");
    actionCard.className = "bau-card";
    const tasks = [
        'Ads Conversion Tracking', 'Ads Dynamic Remarketing', 'Ads Enhanced Conversions', 'Ads Website Call Conversion',
        'Ads Remarketing', 'Analytics Cross Domain Tracking', 'Analytics E-Commerce Tracking', 'Analytics Enhanced E-Commerce Tracking',
        'Analytics Event Tracking', 'Analytics Health Check', 'Analytics Remarketing', 'Analytics Setup',
        'Fix GA4 implementation', 'Consent Mode', 'Fix Sitewide Tagging (OGT & CT)', 'Google Tag Manager Installation', 'Customer Match'
    ];
    actionCard.innerHTML = `
        <label class="bau-label">O que deve ser feito em BAU</label>
        <textarea name="reason" class="bau-textarea" placeholder="Descreva as ações esperadas..." style="min-height: 80px;" required></textarea>

        <label class="bau-label" data-tooltip="Selecione os tipos de implementação técnica">Tasks para BAU (Selecione 1 ou mais)</label>
        <div class="bau-tasks-grid" id="bau-tasks-container">
            ${tasks.map(task => `
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
        <label class="bau-label">Justificativa / Descrição</label>
        <textarea name="description" required class="bau-textarea" placeholder="Descreva detalhadamente o que precisa ser feito..."></textarea>
        <label class="bau-label">Disponibilidade (mínimo 1 opção)</label>
        <div class="bau-availability-container">
            <div class="bau-availability-field">
                <span class="bau-field-hint">Opção 1 (Prioridade)</span>
                <input type="datetime-local" name="availability_1" required class="bau-input">
            </div>
            <div class="bau-availability-field">
                <span class="bau-field-hint">Opção 2 (Opcional)</span>
                <input type="datetime-local" name="availability_2" class="bau-input">
            </div>
            <div class="bau-availability-field">
                <span class="bau-field-hint">Opção 3 (Opcional)</span>
                <input type="datetime-local" name="availability_3" class="bau-input">
            </div>
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
            <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
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

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.id = "bau-step-next-btn";
    nextBtn.className = "bau-btn-primary";
    nextBtn.textContent = "Próximo";

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "bau-btn-submit";
    submitBtn.innerHTML = `${ICONS.send} Enviar para o TL`;
    submitBtn.style.display = "none";

    // OBRIGATORIAMENTE precisam ser "child" (filho) direto da tag <form>
    form.appendChild(backBtn);
    form.appendChild(nextBtn);
    form.appendChild(submitBtn);
    form.appendChild(footer);

    viewContainer.appendChild(formView);

    // --- VIEW 3: SUCCESS ---
    const successView = document.createElement('div');
    successView.id = 'bau-view-success';
    successView.className = 'bau-view';
    successView.innerHTML = `
        <div class="bau-success-content">
            <div class="bau-success-icon">${ICONS.check}</div>
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
        const targetView = popup.querySelector(`#bau-view-${viewName}`);
        if (targetView) targetView.classList.add('active');

        const titleEl = header.querySelector('.cw-module-header-title') || header.querySelector('h2');
        const subtitleEl = header.querySelector('.cw-module-header-subtitle') || header.querySelector('p');

        if (titleEl) {
            titleEl.textContent = (viewName === 'form') ? 'Novo Caso BAU' : 'BAU Central';
        }
        if (subtitleEl) {
            subtitleEl.textContent = (viewName === 'form') ? 'Preencha os detalhes abaixo' : 'Dashboard de Casos BAU';
        }
    }

    function renderSkeleton() {
        const listEl = popup.querySelector('#bau-case-list-container');
        const metricsEl = popup.querySelector('#bau-dashboard-metrics');
        if (metricsEl) {
            metricsEl.innerHTML = `
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
                <div class="bau-skeleton-metric"><div class="bau-shimmer"></div></div>
            `;
        }
        if (!listEl) return;
        listEl.innerHTML = Array(5).fill(0).map(() => `
            <div class="bau-skeleton-card">
                <div class="bau-shimmer"></div>
            </div>
        `).join('');
    }

    async function loadDashboardData() {
        const listEl = popup.querySelector('#bau-case-list-container');
        const metricsEl = popup.querySelector('#bau-dashboard-metrics');
        if (!listEl) return;

        renderSkeleton();

        try {
            const cases = await readAgentBAU();
            // VALIDAÇÃO DE SEGURANÇA: Garante que o skeleton suma mesmo se cases vier bugado
            if (!Array.isArray(cases)) {
                throw new Error("Resposta da API não é um array válido");
            }
            renderDashboard(cases);
        } catch (error) {
            console.error("Critical Error loading BAU cases:", error);

            // LIMPEZA DE ESTADO: Se falhar, removemos o skeleton e mostramos erro amigável
            if (metricsEl) metricsEl.innerHTML = '';
            listEl.innerHTML = `
                <div class="bau-empty-state bau-error-state">
                    <div style="color: #d93025; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">Não conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `;
            const retryBtn = listEl.querySelector('#bau-retry-btn');
            if (retryBtn) {
                retryBtn.onclick = () => loadDashboardData();
            }
            showToast("Erro ao carregar Dashboard. Verifique sua conexão.", { error: true });
        }
    }

    function renderCaseCard(c) {
        if (!c) return '';

        // Status Mapping
        const getStatusData = (status) => {
            switch(status) {
                case 'PENDING_TL_CREATION': return { text: "Aguardando TL", class: "status-yellow", aura: "status-yellow-aura" };
                case 'CREATED': return { text: "Aprovado / Criado", class: "status-green", aura: "status-green-aura" };
                case 'DISCARDED': return { text: "Descartado pelo TL", class: "status-red", aura: "status-red-aura" };
                case 'CANCELED_BY_AGENT': return { text: "Cancelado", class: "status-gray", aura: "" };
                default: return { text: status || "Pendente", class: "status-gray", aura: "" };
            }
        };
        const statusData = getStatusData(c?.status);
        const dateStr = c?.date ? new Date(c.date).toLocaleDateString('pt-BR') : '';

        // SLA / Urgency Logic
        let slaBadge = '';
        let pulseClass = '';
        if (c?.status === 'PENDING_TL_CREATION' && c?.availability_1) {
            const availDate = new Date(c.availability_1);
            const now = new Date();
            if (availDate <= now || (availDate - now) < 3600000 * 2) { // Vencido ou < 2h
                slaBadge = `<span class="bau-sla-badge">Urgente</span>`;
                pulseClass = 'bau-pulse-attention';
            }
        }

        const reasonDisplay = (c?.reason && c.reason.trim()) ? c.reason : "Nenhum contexto adicional fornecido pelo agente.";
        const cidRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
        const isValidCIDCard = cidRegex.test(c?.cid || '');
        const hasDataError = !c?.caseId || c.caseId === 'N/A' || !isValidCIDCard;

        if (hasDataError && c?.status === 'PENDING_TL_CREATION') {
            pulseClass = 'bau-pulse-attention';
        }

        return `
            <li class="bau-case-card ${statusData.aura} ${pulseClass}" data-case-id="${c?.id || ''}">
                <div class="bau-case-main">
                    <div class="bau-case-icon">${ICONS.folder}</div>
                    <div class="bau-case-info">
                        <div class="bau-case-header">
                            <h3 class="bau-case-title">${c?.advName || 'Nome indefinido'}</h3>
                            ${slaBadge}
                            <span class="bau-case-date">${dateStr}</span>
                        </div>
                        <p class="bau-case-details">
                            <span data-tooltip="Customer ID do Anunciante">Case: ${c?.caseId || 'N/A'}</span> •
                            <span data-tooltip="CID do Anunciante (Formato: 000-000-0000)" class="${!isValidCIDCard ? 'bau-error-text' : ''}">CID: ${c?.cid || 'N/A'}</span> •
                            <span data-tooltip="O que deve ser feito em BAU">Motivo: ${reasonDisplay}</span>
                        </p>
                        ${hasDataError ? `<div class="bau-data-error-hint">${!c?.caseId || c?.caseId === 'N/A' ? 'Dados Incompletos' : 'CID Inválido'} - Contate o Suporte</div>` : ''}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span class="bau-case-status-badge ${statusData.class}">${statusData.text}</span>
                </div>
            </li>
        `;
    }

    function renderDashboard(cases) {
        const listEl = popup.querySelector('#bau-case-list-container');
        const metricsEl = popup.querySelector('#bau-dashboard-metrics');
        if (!listEl || !metricsEl) return;

        // PROTEÇÃO CONTRA UNDEFINED/NULL
        const safeCases = Array.isArray(cases) ? cases : [];

        if (safeCases.length === 0) {
            metricsEl.innerHTML = '';
            listEl.innerHTML = `
                <div class="bau-empty-state">
                    ${ICONS.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecerão aqui</p>
                </div>
            `;
            return;
        }

        // Metrics Calculation - Com Optional Chaining por segurança
        const pendingCount = safeCases.filter(c => c?.status === 'PENDING_TL_CREATION').length;
        const createdCount = safeCases.filter(c => c?.status === 'CREATED').length;

        metricsEl.innerHTML = `
            <div class="bau-metric-card">
                <span class="bau-metric-value">${pendingCount}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${createdCount}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
        `;

        // Clear list before rendering
        listEl.innerHTML = '';

        const recentCases = safeCases.slice(0, 5);
        const olderCases = safeCases.slice(5);

        // Render recent cases directly
        recentCases.forEach(caseItem => {
            if (caseItem) {
                listEl.insertAdjacentHTML('beforeend', renderCaseCard(caseItem));
            }
        });

        // Handle older cases with an accordion
        if (olderCases.length > 0) {
            const accordionContainer = document.createElement('li');
            accordionContainer.className = 'bau-accordion-container';

            const toggleButton = document.createElement('button');
            toggleButton.className = 'bau-accordion-toggle';
            toggleButton.innerHTML = `${ICONS.expand} <span>Mostrar ${olderCases.length} casos mais antigos</span>`;
            
            const olderCasesList = document.createElement('ul');
            olderCasesList.className = 'bau-case-list bau-accordion-content';
            olderCasesList.style.display = 'none'; // Initially hidden
            olderCases.forEach(caseItem => {
                olderCasesList.insertAdjacentHTML('beforeend', renderCaseCard(caseItem));
            });

            toggleButton.onclick = () => {
                const isHidden = olderCasesList.style.display === 'none';
                olderCasesList.style.display = isHidden ? 'block' : 'none';
                toggleButton.classList.toggle('expanded', isHidden);
                const text = toggleButton.querySelector('span');
                if (text) {
                    text.textContent = isHidden ? 'Esconder casos mais antigos' : `Mostrar ${olderCases.length} casos mais antigos`;
                }
                SoundManager.playClick();
            };

            accordionContainer.appendChild(toggleButton);
            accordionContainer.appendChild(olderCasesList);
            listEl.appendChild(accordionContainer);
        }
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
        submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
        if (currentStep === 4) renderConfirmation();
    }
    
    function validateStep(step) {
        const stepEl = popup.querySelector(`#bau-step-${step}`);
        if (!stepEl) return true;

        if (step === 1) {
            const cidInput = popup.querySelector('#bau-cid-input');
            const cidValue = cidInput.value.trim();
            const cidRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
            const isValidCID = cidRegex.test(cidValue);
            const errorHint = popup.querySelector('#bau-cid-error');

            if (!isValidCID && cidInput.parentElement.style.display !== 'none') {
                cidInput.classList.add('invalid-cid');
                if (errorHint) errorHint.style.display = 'flex';
                showToast("Erro: O formato do CID é inválido.", { error: true });
                return false;
            } else {
                cidInput.classList.remove('invalid-cid');
                if (errorHint) errorHint.style.display = 'none';
            }
        }

        if (step === 2) {
            if (!form.querySelector('textarea[name="reason"]').value.trim()) {
                showToast("Erro: A descrição do que deve ser feito é obrigatória.", { error: true });
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

        // AUTO-PREENCHIMENTO AM: Se o nome do AM não foi capturado, usamos o e-mail do BCC (internalEmail)
        if (!pageData.amName || pageData.amName === "N/A") {
            pageData.amName = pageData.internalEmail || "N/A";
        }

        currentContextData = pageData;

        const highlightsContainer = form.querySelector('#bau-vital-highlights');
        if (highlightsContainer) {
            const vitals = [
                { label: "Anunciante", value: pageData.advName },
                { label: "CID", value: pageData.cid },
                { label: "Website", value: pageData.site || pageData.website },
                { label: "Case ID", value: pageData.caseId }
            ];

            highlightsContainer.innerHTML = vitals.map(v => {
                const displayValue = (v.value && v.value !== "N/A" && v.value !== "undefined" && v.value !== "null") ? v.value : "Não capturado";
                return `
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${v.label}</span>
                        <span class="bau-highlight-value">${displayValue}</span>
                    </div>
                `;
            }).join('');
        }

        const smartFields = ['advName', 'cid', 'amName', 'seId'];
        smartFields.forEach(field => {
            const value = pageData[field];
            const input = form.querySelector(`[name="${field}"]`);
            const wrapper = popup.querySelector(`#wrapper-${field}`);

            if (input) input.value = (value && value !== "N/A") ? value : "";

            if (wrapper) {
                const isValid = value && value !== "" && value !== "N/A" && value !== "undefined" && value !== "null";
                wrapper.style.display = isValid ? 'none' : 'block';
            }
        });

        const allDataContainer = popup.querySelector('#bau-all-data');
        if (allDataContainer) {
            const displayFields = [
                { label: "Anunciante", value: pageData.advName },
                { label: "CID", value: pageData.cid },
                { label: "AM", value: pageData.amName },
                { label: "SE ID", value: pageData.seId },
                { label: "Site", value: pageData.site },
                { label: "Email", value: pageData.email },
                { label: "Timezone", value: pageData.timezone },
                { label: "Case ID", value: pageData.caseId },
                { label: "Programa", value: pageData.salesProgram },
                { label: "Idioma", value: pageData.language }
            ];

            allDataContainer.innerHTML = `
                <div class="bau-context-badges-grid">
                    ${displayFields
                        .filter(f => f.value && f.value !== "N/A" && f.value !== "---" && f.value !== "undefined" && f.value !== "null")
                        .map(f => `
                            <div class="bau-context-badge">
                                <span class="bau-badge-label">${f.label}:</span>
                                <span class="bau-badge-value">${f.value}</span>
                            </div>
                        `).join('')}
                </div>
            `;
        }
    }

    popup.querySelector('#bau-top-se-search').onclick = (e) => {
        e.preventDefault();
        fetchAndInsertSpeakeasyId("bau-context-se-id-input");
    };

    // CID Validation Real-time
    const cidInput = popup.querySelector('#bau-cid-input');
    if (cidInput) {
        cidInput.addEventListener('input', () => {
            const cidValue = cidInput.value.trim();
            const cidRegex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
            const isValidCID = cidRegex.test(cidValue);
            const errorHint = popup.querySelector('#bau-cid-error');

            if (!isValidCID && cidValue.length > 0) {
                cidInput.classList.add('invalid-cid');
                if (errorHint) errorHint.style.display = 'flex';
            } else {
                cidInput.classList.remove('invalid-cid');
                if (errorHint) errorHint.style.display = 'none';
            }
        });
    }


    function renderConfirmation() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const tasks = formData.getAll('taskType');
        const container = popup.querySelector('#bau-confirmation-details');
        if (!container) return;

        const tasksText = tasks.length > 0 ? tasks.join(', ') : "Nenhuma";

        container.innerHTML = `
            <div class="bau-confirm-row"><span class="bau-confirm-label">Anunciante:</span><span class="bau-confirm-value">${data.advName || '---'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">CID:</span><span class="bau-confirm-value">${data.cid || '---'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">AM:</span><span class="bau-confirm-value">${data.amName || '---'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Speakeasy ID:</span><span class="bau-confirm-value">${data.seId || 'Não informado'}</span></div>
            <div class="bau-confirm-divider"></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">O que deve ser feito:</span><span class="bau-confirm-value">${data.reason || '---'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Tasks:</span><span class="bau-confirm-value">${tasksText}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Justificativa BAU:</span><span class="bau-confirm-value">${data.nonImplementationReason || '---'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Descrição:</span><span class="bau-confirm-value">${data.description || '---'}</span></div>
            <div class="bau-confirm-row"><span class="bau-confirm-label">Próximo Contato:</span><span class="bau-confirm-value">${data.availability_1 ? data.availability_1.replace('T', ' ') : 'Não definida'}</span></div>
        `;
    }
    form.onsubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(totalSteps)) return;
        
        const submitBtn = popup.querySelector('.bau-btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const tasks = formData.getAll('taskType');
        const context = currentContextData || {};

        // A MÁGICA AQUI: Junta as 3 datas num campo só, ignorando os vazios
        const disponibilidadeUnificada = [data.availability_1, data.availability_2, data.availability_3]
            .filter(d => d && d.trim() !== '')
            .join(' | ');

        // Cria o payload com o campo 'availability' exato que o backend espera
        // O data (form) deve vir depois do context (scraped) para que os overrides manuais funcionem
        const payload = { 
            ...context,
            ...data, 
            advEmail: context.email || "", 
            website: context.site || "",
            taskType: tasks.join(', '), 
            availability: disponibilidadeUnificada
        };

        try {
            await sendBAUEscalation(payload, context.agentEmail || "anon");
            SoundManager.playSuccess();
            switchView('success');
        } catch (error) {
            showToast("Erro: " + (error.message || "Erro desconhecido"), { error: true });
            console.error("Payload que tentou enviar:", payload); // Para debug
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `${ICONS.send} Enviar para o TL`;
        }
    };

    function resetForm() {
        form.reset();
        currentStep = 1;
        updateWizardState();
        actionCard.querySelectorAll('.bau-task-item.active').forEach(item => item.classList.remove('active'));
    }

    const newCaseBtn = popup.querySelector('#bau-new-case-btn');
    if (newCaseBtn) {
        newCaseBtn.onclick = () => {
            resetForm();
            switchView('form');
            populateContextData();
        };
    }

    const formBackBtn = popup.querySelector('#bau-form-back-btn');
    if (formBackBtn) formBackBtn.onclick = () => switchView('dashboard');

    const successBackBtn = popup.querySelector('#bau-success-back-btn');
    if (successBackBtn) successBackBtn.onclick = () => switchView('dashboard');

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
