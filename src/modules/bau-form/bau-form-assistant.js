
import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast, formatToLocalUserDate } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { sendBAUEscalation, readAgentBAU, updateBAUEscalation } from '../shared/data-service.js';
import { getPageData } from '../shared/page-data.js';
import { fetchAndInsertSpeakeasyId } from '../notes/automation/case-log-scraper.js';
import { FORM_CONFIG } from './bau-form-config.js';

const ICONS = {
    add: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    back: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
    wand: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.41l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>`,
    send: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
    check: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path class="bau-check-path" d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    folder: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
    empty: `<svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.44 2s2.75-.81 3.44-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z"/></svg>`,
    refresh: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
    expand: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`,
    edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`
};

function createField(fieldConfig) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bau-dynamic-input';
    wrapper.id = `wrapper-${fieldConfig.id}`;

    if (fieldConfig.label) {
        const label = document.createElement('label');
        label.className = 'bau-label';
        label.textContent = fieldConfig.label;
        if (fieldConfig.tooltip) {
            label.setAttribute('data-tooltip', fieldConfig.tooltip);
        }
        wrapper.appendChild(label);
    }

    let input;
    switch (fieldConfig.type) {
        case 'textarea':
            input = document.createElement('textarea');
            input.style.minHeight = '80px';
            wrapper.appendChild(input);
            break;

        case 'select':
            input = document.createElement('select');
            if (fieldConfig.groups) {
                fieldConfig.groups.forEach(group => {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = group.label;
                    group.options.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt.value;
                        option.textContent = opt.text;
                        optgroup.appendChild(option);
                    });
                    input.appendChild(optgroup);
                });
            } else if (fieldConfig.options) {
                fieldConfig.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.text;
                    input.appendChild(option);
                });
            }
            wrapper.appendChild(input);
            break;

        case 'checkbox-grid':
            input = document.createElement('div');
            input.className = 'bau-tasks-grid';
            fieldConfig.options.forEach(task => {
                const item = document.createElement('label');
                item.className = 'bau-task-item';
                item.innerHTML = `<input type="checkbox" name="${fieldConfig.name}" value="${task}"><span>${task}</span>`;
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const chk = item.querySelector('input');
                    chk.checked = !chk.checked;
                    item.classList.toggle('active', chk.checked);
                    SoundManager.playClick();
                });
                input.appendChild(item);
            });
            wrapper.appendChild(input);
            return wrapper; 

        case 'datetime-group':
            input = document.createElement('div');
            input.className = 'bau-availability-container';
            fieldConfig.fields.forEach(f => {
                const fieldWrapper = document.createElement('div');
                fieldWrapper.className = 'bau-availability-field';
                fieldWrapper.innerHTML = `
                    <span class="bau-field-hint">${f.label}</span>
                    <input type="datetime-local" name="${f.name}" class="bau-input" ${f.required ? 'required' : ''}>
                `;
                input.appendChild(fieldWrapper);
            });

            const disclaimer = document.createElement('div');
            disclaimer.className = 'bau-availability-disclaimer';
            disclaimer.innerHTML = `
                <div class="bau-disclaimer-text">
                    <strong>Atenção:</strong> Para clientes fora do fuso horário do Brasil, o horário inserido deve corresponder sempre ao horário local do cliente, e não ao do agente.
                </div>
                <button type="button" class="bau-timezone-link" id="bau-open-timezone">
                    ${ICONS.refresh}
                    Consultar Time Zone
                </button>
            `;

            disclaimer.querySelector('#bau-open-timezone').onclick = () => {
                const tzBtn = document.getElementById('cw-btn-timezone');
                if (tzBtn) {
                    tzBtn.click();
                    SoundManager.playClick();
                } else {
                    showToast("Módulo Time Zone não encontrado.", { error: true });
                }
            };

            wrapper.appendChild(input);
            wrapper.appendChild(disclaimer);
            return wrapper;

        case 'text-with-button':
            const group = document.createElement('div');
            group.className = 'bau-input-group';
            input = document.createElement('input');
            input.type = 'text';
            const button = document.createElement('button');
            button.type = 'button';
            button.id = fieldConfig.button.id;
            button.className = 'bau-mini-btn-input';
            button.title = fieldConfig.button.title;
            button.innerHTML = ICONS[fieldConfig.button.icon] || '';
            group.appendChild(input);
            group.appendChild(button);
            wrapper.appendChild(group);
            break;

        default: // text
            input = document.createElement('input');
            input.type = 'text';
            wrapper.appendChild(input);
    }
    
    if (input && fieldConfig.type !== 'checkbox-grid' && fieldConfig.type !== 'datetime-group') {
        input.id = `bau-form-${fieldConfig.id}`;
        input.name = fieldConfig.name;
        input.className = fieldConfig.type === 'select' ? 'bau-select' : fieldConfig.type === 'textarea' ? 'bau-textarea' : 'bau-input';
        if (fieldConfig.placeholder) input.placeholder = fieldConfig.placeholder;
        if (fieldConfig.required) input.required = true;
    }

    return wrapper;
}


export function initBAUForm() {
    injectStyles();

    let isVisible = false;
    let currentView = 'dashboard';
    let currentContextData = null;
    let currentStep = 0;
    let requestType = 'BAU';
    let isEditing = false;
    let editingCaseId = null;
    const totalSteps = FORM_CONFIG.steps.length;

    const popup = document.createElement("div");
    popup.id = "bau-form-popup";
    popup.className = "bau-popup cw-module-window";
    popup.style.display = "none";

    const header = createStandardHeader(
        popup,
        "BAU Central",
        "v2.2.0",
        "Dashboard de Casos BAU",
        {},
        () => toggleVisibility()
    );


    popup.appendChild(header);

    const viewContainer = document.createElement('div');
    viewContainer.className = 'bau-view-container';
    popup.appendChild(viewContainer);

    const detailsView = document.createElement('div');
    detailsView.id = 'bau-view-details';
    detailsView.className = 'bau-details-view';
    viewContainer.appendChild(detailsView);

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
    form.noValidate = true;
    formUiContainer.appendChild(form);
    
    FORM_CONFIG.steps.forEach((stepConfig) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'bau-step' + (stepConfig.id === currentStep ? ' active' : '');
        stepEl.id = `bau-step-${stepConfig.id}`;
        
        if (stepConfig.isBranching) {
            stepEl.innerHTML = `
                <div class="bau-branching-container">
                    <div class="bau-branching-card" id="bau-opt-full">
                        <div class="bau-branching-icon">${ICONS.add}</div>
                        <h3 class="bau-branching-title">Abrir caso para BAU</h3>
                        <p class="bau-branching-subtitle">Fluxo completo para implementações técnicas e suporte especializado.</p>
                    </div>
                    <div class="bau-branching-card" id="bau-opt-discard">
                        <div class="bau-branching-icon">${ICONS.empty}</div>
                        <h3 class="bau-branching-title">Solicitar Descarte</h3>
                        <p class="bau-branching-subtitle">Fluxo simplificado para casos que não requerem implementação.</p>
                    </div>
                </div>
            `;
            stepEl.querySelector('#bau-opt-full').onclick = () => {
                requestType = 'BAU';
                currentStep = 1;
                form.querySelectorAll('.bau-highlight-panel').forEach(p => p.classList.remove('discard-theme'));
                updateWizardState();
                SoundManager.playClick();
            };
            stepEl.querySelector('#bau-opt-discard').onclick = () => {
                requestType = 'DISCARD';
                currentStep = 5;
                form.querySelectorAll('.bau-highlight-panel').forEach(p => p.classList.add('discard-theme'));
                updateWizardState();
                SoundManager.playClick();
            };
        } else if (stepConfig.isConfirmation) {
            stepEl.innerHTML = `
                <div class="bau-card">
                    <h3 class="bau-step-title">Confirme os dados antes de enviar</h3>
                    <div id="bau-confirmation-details"></div>
                </div>
            `;
        } else {
            const card = document.createElement('div');
            card.className = 'bau-card';

            if (stepConfig.id === 1 || stepConfig.id === 5) {
                card.innerHTML = `
                    <div class="bau-vital-highlights bau-highlight-panel"></div>
                    <div class="bau-dynamic-inputs-container"></div>
                    <div class="bau-all-data"></div>
                `;
                const fieldsContainer = card.querySelector('.bau-dynamic-inputs-container');
                stepConfig.fields.forEach(fieldConfig => {
                    fieldsContainer.appendChild(createField(fieldConfig));
                });

                const cidWrapper = card.querySelector('#wrapper-cid');
                if (cidWrapper) {
                    const errorHint = document.createElement('div');
                    errorHint.id = 'bau-cid-error';
                    errorHint.className = 'bau-cid-error-hint';
                    errorHint.style.display = 'none';
                    errorHint.textContent = 'Formato de CID incorreto';
                    cidWrapper.appendChild(errorHint);
                }
            } else {
                 stepConfig.fields.forEach(fieldConfig => {
                    card.appendChild(createField(fieldConfig));
                });
            }
            stepEl.appendChild(card);
        }
        form.appendChild(stepEl);
    });

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

    footer.appendChild(backBtn);
    footer.appendChild(nextBtn);
    footer.appendChild(submitBtn);
    form.appendChild(footer);

    viewContainer.appendChild(formView);

    const successView = document.createElement('div');
    successView.id = 'bau-view-success';
    successView.className = 'bau-view bau-success-view';
    successView.innerHTML = `
        <div class="bau-success-content">
            <div class="bau-success-icon" style="color: ${COLORS.green};">${ICONS.check}</div>
            <h2 class="bau-success-title">Caso enviado com sucesso!</h2>
            <p class="bau-success-subtitle">Sua solicitação foi recebida e será processada em breve.</p>
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
            if (viewName === 'form') {
                titleEl.textContent = isEditing ? `Editando Caso #${editingCaseId}` : 'Novo Caso BAU';
            } else {
                titleEl.textContent = 'BAU Central';
            }
        }
        if (subtitleEl) {
            subtitleEl.textContent = (viewName === 'form') ? 'Preencha os detalhes abaixo' : 'Dashboard de Casos BAU';
        }

        const submitBtn = form.querySelector('.bau-btn-submit');
        if (submitBtn) {
            submitBtn.innerHTML = isEditing ? `${ICONS.send} Salvar Alterações` : `${ICONS.send} Enviar para o TL`;
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
        if (!listEl || !metricsEl) return;

        renderSkeleton();

        try {
            const cases = await readAgentBAU();
            if (!Array.isArray(cases)) {
                throw new Error("API response is not a valid array");
            }
            renderDashboard(cases);
        } catch (error) {
            console.error("Critical Error loading BAU cases:", error);
            if (metricsEl) metricsEl.innerHTML = '';
            listEl.innerHTML = `
                <div class="bau-empty-state bau-error-state">
                    <div style="color: ${COLORS.red}; margin-bottom: 16px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <h3 class="bau-empty-title">Ops! Algo deu errado</h3>
                    <p class="bau-empty-subtitle">Não conseguimos carregar seus casos BAU no momento.</p>
                    <button class="bau-btn-secondary" id="bau-retry-btn" style="margin-top: 16px;">
                        Tentar Novamente
                    </button>
                </div>
            `;
            popup.querySelector('#bau-retry-btn')?.addEventListener('click', () => loadDashboardData());
            showToast("Erro ao carregar Dashboard. Verifique sua conexão.", { error: true });
        }
    }

    function openCaseDetails(c) {
        if (!c) return;

        const getStatusData = (status) => {
            switch(status) {
                case 'PENDING_TL_CREATION': return { text: "Aguardando TL", class: "status-yellow" };
                case 'CREATED': return { text: "Aprovado / Criado", class: "status-green" };
                case 'DISCARDED': return { text: "Descartado pelo TL", class: "status-red" };
                case 'CANCELED_BY_AGENT': return { text: "Cancelado", class: "status-gray" };
                default: return { text: status || "Pendente", class: "status-gray" };
            }
        };
        const statusData = getStatusData(c.status);

        const copyToClipboard = (text, btn) => {
            navigator.clipboard.writeText(text).then(() => {
                showToast("Copiado para a área de transferência!");
                SoundManager.playClick();
                const originalColor = btn.style.color;
                btn.style.color = '#1E8E3E';
                setTimeout(() => { btn.style.color = originalColor; }, 800);
            });
        };

        detailsView.innerHTML = `
            <div class="bau-details-header">
                <h2 class="bau-details-title">Detalhes do Caso</h2>
                <button class="bau-details-close-btn">
                    ${ICONS.back}
                    Voltar
                </button>
            </div>
            <div class="bau-details-content">
                <div class="bau-details-grid">
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Anunciante</span>
                            <span class="bau-details-value">${c.advName || '---'}</span>
                            <button class="bau-copy-btn" title="Copiar">${ICONS.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Status</span>
                            <span class="bau-case-status-badge ${statusData.class}">${statusData.text}</span>
                        </div>
                    </div>
                    <div class="bau-details-card">
                        <div class="bau-details-row">
                            <span class="bau-details-label">CID</span>
                            <span class="bau-details-value">${c.cid || '---'}</span>
                            <button class="bau-copy-btn" title="Copiar">${ICONS.wand}</button>
                        </div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Case ID</span>
                            <span class="bau-details-value">${c.caseId || '---'}</span>
                            <button class="bau-copy-btn" title="Copiar">${ICONS.wand}</button>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Motivo BAU</span>
                            <span class="bau-details-value">${c.reason || 'Não informado'}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Tasks solicitadas</span>
                            <span class="bau-details-value">${c.taskType || 'Nenhuma'}</span>
                        </div>
                    </div>

                    <div class="bau-details-card full-width">
                        <div class="bau-details-row">
                            <span class="bau-details-label">Justificativa</span>
                            <span class="bau-details-value">${c.nonImplementationReason || '---'}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Descrição detalhada</span>
                            <span class="bau-details-value">${c.description || '---'}</span>
                        </div>
                        <div class="bau-details-divider"></div>
                        <div class="bau-details-row">
                            <span class="bau-details-label">Disponibilidade</span>
                            <span class="bau-details-value">${formatToLocalUserDate(c.availability)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const closeBtn = detailsView.querySelector('.bau-details-close-btn');
        closeBtn.onclick = () => {
            detailsView.classList.remove('active');
            SoundManager.playSwoosh();
            setTimeout(() => { detailsView.style.display = 'none'; }, 600);
        };

        detailsView.querySelectorAll('.bau-copy-btn').forEach(btn => {
            btn.onclick = (e) => {
                const value = e.target.closest('.bau-details-row').querySelector('.bau-details-value').textContent;
                copyToClipboard(value, btn);
            };
        });

        detailsView.style.display = 'flex';
        requestAnimationFrame(() => {
            detailsView.classList.add('active');
            SoundManager.playClick();
        });
    }

    function renderCaseCard(c) {
        if (!c) return '';

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
        const dateStr = formatToLocalUserDate(c?.date);

        let slaBadge = '';
        let pulseClass = '';
        if (c?.status === 'PENDING_TL_CREATION' && c?.availability_1) {
            const availDate = new Date(c.availability_1);
            const now = new Date();
            if (availDate <= now || (availDate - now) < 3600000 * 2) { 
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
                    ${c?.status && c.status.includes('PENDING') ? `
                        <button class="bau-case-edit-btn" data-id="${c.id}" title="Editar Solicitação">
                            ${ICONS.edit}
                            Editar
                        </button>
                    ` : ''}
                </div>
            </li>
        `;
    }

    function renderDashboard(cases) {
        const listEl = popup.querySelector('#bau-case-list-container');
        const metricsEl = popup.querySelector('#bau-dashboard-metrics');
        if (!listEl || !metricsEl) return;
        
        const safeCases = Array.isArray(cases) ? cases.filter(Boolean) : [];

        if (safeCases.length === 0) {
            metricsEl.innerHTML = `
                <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard">
                    ${ICONS.refresh}
                    Atualizar
                </button>
            `;
            listEl.innerHTML = `
                <div class="bau-empty-state">
                    ${ICONS.empty}
                    <h3 class="bau-empty-title">Nenhum caso recente</h3>
                    <p class="bau-empty-subtitle">Seus casos BAU aparecerão aqui</p>
                </div>
            `;
            popup.querySelector('#bau-refresh-dashboard')?.addEventListener('click', () => loadDashboardData());
            return;
        }

        const pendingCount = safeCases.filter(c => c.status === 'PENDING_TL_CREATION').length;
        const createdCount = safeCases.filter(c => c.status === 'CREATED').length;

        metricsEl.innerHTML = `
            <div class="bau-metric-card">
                <span class="bau-metric-value">${pendingCount}</span>
                <span class="bau-metric-label">Aguardando TL</span>
            </div>
            <div class="bau-metric-card">
                <span class="bau-metric-value">${createdCount}</span>
                <span class="bau-metric-label">Criados / Aprovados</span>
            </div>
            <button class="bau-metrics-refresh-btn" id="bau-refresh-dashboard" title="Atualizar Dashboard">
                ${ICONS.refresh}
            </button>
        `;

        const refreshBtn = metricsEl.querySelector('#bau-refresh-dashboard');
        refreshBtn?.addEventListener('click', async () => {
            if (refreshBtn.classList.contains('spinning')) return;
            refreshBtn.classList.add('spinning');
            SoundManager.playClick();
            await loadDashboardData();
            setTimeout(() => refreshBtn.classList.remove('spinning'), 1000);
        });

        listEl.innerHTML = '';
        const recentCases = safeCases.slice(0, 5);
        const olderCases = safeCases.slice(5);

        recentCases.forEach(caseItem => {
            const cardHtml = renderCaseCard(caseItem);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cardHtml;
            const cardEl = tempDiv.firstElementChild;

            cardEl.addEventListener('click', (e) => {
                if (e.target.closest('.bau-case-edit-btn')) return;
                openCaseDetails(caseItem);
            });

            const editBtn = cardEl.querySelector('.bau-case-edit-btn');
            if (editBtn) {
                editBtn.onclick = (e) => {
                    e.stopPropagation();
                    handleEditCase(caseItem);
                };
            }

            listEl.appendChild(cardEl);
        });

        if (olderCases.length > 0) {
            const accordionContainer = document.createElement('li');
            accordionContainer.className = 'bau-accordion-container';

            const toggleButton = document.createElement('button');
            toggleButton.className = 'bau-accordion-toggle';
            toggleButton.innerHTML = `${ICONS.expand} <span>Mostrar ${olderCases.length} casos mais antigos</span>`;
            
            const olderCasesList = document.createElement('ul');
            olderCasesList.className = 'bau-case-list bau-accordion-content';
            olderCasesList.style.display = 'none'; 
            olderCases.forEach(caseItem => {
                const cardHtml = renderCaseCard(caseItem);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cardHtml;
                const cardEl = tempDiv.firstElementChild;

                cardEl.addEventListener('click', (e) => {
                    if (e.target.closest('.bau-case-edit-btn')) return;
                    openCaseDetails(caseItem);
                });

                const editBtn = cardEl.querySelector('.bau-case-edit-btn');
                if (editBtn) {
                    editBtn.onclick = (e) => {
                        e.stopPropagation();
                        handleEditCase(caseItem);
                    };
                }

                olderCasesList.appendChild(cardEl);
            });

            toggleButton.addEventListener('click', () => {
                const isHidden = olderCasesList.style.display === 'none';
                olderCasesList.style.display = isHidden ? 'block' : 'none';
                toggleButton.classList.toggle('expanded', isHidden);
                toggleButton.querySelector('span').textContent = isHidden ? 'Esconder casos mais antigos' : `Mostrar ${olderCases.length} casos mais antigos`;
                SoundManager.playClick();
            });

            accordionContainer.appendChild(toggleButton);
            accordionContainer.appendChild(olderCasesList);
            listEl.appendChild(accordionContainer);
        }
    }

    function updateWizardState() {
        const flowSteps = (requestType === 'BAU') ? [1, 2, 3, 4] : [5, 4];

        form.querySelectorAll('.bau-step').forEach((step) => {
            const stepId = parseInt(step.id.replace('bau-step-', ''));
            const isActive = stepId === currentStep;
            const isPartOfFlow = flowSteps.includes(stepId) || stepId === 0;

            step.classList.toggle('active', isActive);
            step.style.display = isActive ? 'block' : 'none';

            // Disable fields NOT in the current flow path to avoid name collisions and skip native validation
            step.querySelectorAll('input, select, textarea').forEach(input => {
                input.disabled = !isPartOfFlow;
            });
        });

        const isBranching = currentStep === 0;
        progressIndicator.style.display = isBranching ? 'none' : 'flex';

        if (!isBranching) {
            progressIndicator.innerHTML = '';
            const flowSteps = requestType === 'BAU' ? [1, 2, 3, 4] : [5, 4];
            flowSteps.forEach((stepId, index) => {
                const stepDot = document.createElement('div');
                const isStepActive = stepId === currentStep;
                const stepIndex = flowSteps.indexOf(currentStep);
                const isStepCompleted = index < stepIndex;

                stepDot.className = `bau-progress-step ${isStepActive ? 'active' : (isStepCompleted ? 'completed' : '')}`;
                stepDot.textContent = index + 1;
                progressIndicator.appendChild(stepDot);
            });
        }

        const isConfirmation = currentStep === 4;
        backBtn.style.display = currentStep > 0 ? 'inline-block' : 'none';
        nextBtn.style.display = (!isBranching && !isConfirmation) ? 'inline-block' : 'none';
        submitBtn.style.display = isConfirmation ? 'flex' : 'none';

        if (isConfirmation) renderConfirmation();
    }
    
    function validateStep(step) {
        const stepConfig = FORM_CONFIG.steps.find(s => s.id === step);
        if (!stepConfig || !stepConfig.fields || stepConfig.isConfirmation) return true;

        for (const fieldConfig of stepConfig.fields) {
            const wrapper = form.querySelector(`#bau-step-${step} #wrapper-${fieldConfig.id}`);
            if (wrapper && wrapper.style.display === 'none') continue;

            if (fieldConfig.validation) {
                const input = form.querySelector(`#bau-step-${step} [name="${fieldConfig.name}"]`);
                if (input && input.offsetParent !== null && input.value.trim()) {
                    const regex = new RegExp(fieldConfig.validation.regex);
                    if (!regex.test(input.value.trim())) {
                        console.warn(`Validation failed for field "${fieldConfig.name}" in step ${step}: Regex mismatch.`);
                        showToast(`Erro: ${fieldConfig.validation.error}`, { error: true });
                        input.classList.add('invalid-cid');
                        const errorHint = form.querySelector('#bau-cid-error');
                        if (errorHint) errorHint.style.display = 'flex';
                        return false;
                    } else {
                        input.classList.remove('invalid-cid');
                        const errorHint = form.querySelector('#bau-cid-error');
                        if (errorHint) errorHint.style.display = 'none';
                    }
                }
            }
        }
        return true;
    }

    function validateRequiredFields(step) {
        const stepEl = form.querySelector(`#bau-step-${step}`);
        if (!stepEl) return false;

        const stepConfig = FORM_CONFIG.steps.find(s => s.id === step);
        if (!stepConfig || !stepConfig.fields || stepConfig.isConfirmation) return true;

        let isValid = true;
        for (const fieldConfig of stepConfig.fields) {
            const wrapper = form.querySelector(`#bau-step-${step} #wrapper-${fieldConfig.id}`);
            // Se o wrapper está explicitamente oculto via style.display ou se o campo pertence ao fluxo não selecionado
            if (wrapper && wrapper.style.display === 'none') continue;

            if (fieldConfig.required) {
                let isFieldValid = true;
                let failureReason = "";

                if (fieldConfig.type === 'checkbox-grid') {
                    const checked = form.querySelector(`#bau-step-${step} input[name="${fieldConfig.name}"]:checked`);
                    if (!checked) {
                        failureReason = "No option selected in checkbox-grid";
                        showToast(`Erro: Selecione pelo menos uma opção para "${fieldConfig.label}".`, { error: true });
                        isFieldValid = false;
                    }
                } else if (fieldConfig.type === 'datetime-group') {
                    const firstInput = form.querySelector(`#bau-step-${step} input[name="${fieldConfig.fields[0].name}"]`);
                    if (!firstInput || firstInput.offsetParent === null) continue; // Skip if input itself is hidden

                    if (!firstInput.value.trim()) {
                        failureReason = "Datetime group first field is empty";
                        showToast(`Erro: O campo "${fieldConfig.fields[0].label}" é obrigatório.`, { error: true });
                        isFieldValid = false;
                    }
                } else {
                    const input = form.querySelector(`#bau-step-${step} [name="${fieldConfig.name}"]`);
                    // Skip validation if input is not part of the active path (hidden)
                    if (!input || input.offsetParent === null) continue;

                    if (!input.value.trim()) {
                        failureReason = "Field is empty";
                        showToast(`Erro: O campo '${fieldConfig.label}' é obrigatório.`, { error: true });
                        isFieldValid = false;
                    }
                }

                if (!isFieldValid) {
                    console.warn(`Validation failed for required field "${fieldConfig.name}" in step ${step}: ${failureReason}`);
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    }

    nextBtn.addEventListener('click',() => {
        if (validateStep(currentStep) && validateRequiredFields(currentStep)) {
            if (requestType === 'BAU') {
                currentStep++;
            } else {
                if (currentStep === 5) currentStep = 4;
                else currentStep++;
            }
            updateWizardState();
            const contentArea = popup.querySelector('.bau-content');
            if (contentArea) contentArea.scrollTop = 0;
            SoundManager.playClick();
        }
    });

    backBtn.addEventListener('click',() => {
        if (currentStep > 0) {
            if (requestType === 'BAU') {
                currentStep--;
            } else {
                if (currentStep === 4) currentStep = 5;
                else if (currentStep === 5) currentStep = 0;
                else currentStep--;
            }
            updateWizardState();
            SoundManager.playClick();
        }
    });
    
    async function populateContextData() {
        const pageData = await getPageData() || {};

        // AM Fallback to internalEmail if missing
        if (!pageData.amName || pageData.amName === "N/A") {
            pageData.amName = pageData.internalEmail || "N/A";
        }
        currentContextData = pageData;

        // Render "Captured Data Hero" panel
        const highlightsContainers = form.querySelectorAll('.bau-vital-highlights');
        highlightsContainers.forEach(container => {
            const vitals = [
                { label: "Anunciante", value: pageData.advName },
                { label: "CID", value: pageData.cid },
                { label: "Website", value: pageData.site || pageData.website },
                { label: "Case ID", value: pageData.caseId }
            ];

            container.innerHTML = vitals.map(v => {
                const displayValue = (v.value && v.value !== "N/A" && v.value !== "undefined" && v.value !== "null") ? v.value : "Não capturado";
                return `
                    <div class="bau-highlight-item">
                        <span class="bau-highlight-label">${v.label}</span>
                        <span class="bau-highlight-value">${displayValue}</span>
                    </div>
                `;
            }).join('');
        });

        // Smart Rendering Logic
        FORM_CONFIG.steps.forEach(step => {
            if(step.fields) {
                step.fields.forEach(field => {
                    if (field.isSmart) {
                        let value = pageData[field.id];

                        // Smart Binding for Language: priority to profile data over scraping
                        if (field.id === 'language' && pageData.userProfile?.defaultLanguage) {
                            value = pageData.userProfile.defaultLanguage;
                        }

                        const input = form.querySelector(`#bau-step-${step.id} [name="${field.name}"]`);
                        const wrapper = form.querySelector(`#bau-step-${step.id} #wrapper-${field.id}`);

                        if (input) {
                            input.value = (value && value !== "N/A") ? value : "";
                            // Special case: Language/Idioma should be read-only if valid
                            if (field.id === 'language' && value && value !== "N/A") {
                                input.readOnly = true;
                                input.style.background = '#F1F3F4';
                                input.style.cursor = 'not-allowed';
                            }
                        }

                        if (wrapper) {
                            const isValid = value && value !== "" && value !== "N/A" && value !== "undefined" && value !== "null";
                            // Smart Rendering: Hide editable input if data is present, except for fields we want to keep visible but read-only
                            if (field.id === 'language') {
                                wrapper.style.display = 'block';
                            } else {
                                wrapper.style.display = isValid ? 'none' : 'block';
                            }
                        }
                    }
                });
            }
        });

        // Context Badges Grid (Read-only visible even if hidden in inputs)
        const allDataContainers = form.querySelectorAll('.bau-all-data');
        allDataContainers.forEach(container => {
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

            container.innerHTML = `
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
        });
    }

    popup.querySelector('#bau-top-se-search')?.addEventListener('click', (e) => {
        e.preventDefault();
        fetchAndInsertSpeakeasyId("bau-form-seId");
    });

    const cidInput = popup.querySelector('#bau-form-cid');
    if (cidInput) {
        cidInput.addEventListener('input', () => validateStep(1));
    }

    function renderConfirmation() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const container = popup.querySelector('#bau-confirmation-details');
        if (!container) return;

        if (requestType === 'BAU') {
            const tasks = formData.getAll('taskType');
            const tasksText = tasks.length > 0 ? tasks.join(', ') : "Nenhuma";

            container.innerHTML = `
                ${isEditing ? `<div class="bau-highlight-panel" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${COLORS.yellow}; background: rgba(255, 186, 0, 0.05); border-radius: 8px; font-weight: 500;">Você está editando o caso #<span style="color: ${COLORS.yellow}">${editingCaseId}</span></div>` : ''}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Anunciante</span>
                        <input class="bau-confirm-value-input" data-field="advName" data-step="1" value="${data.advName || ''}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">CID</span>
                        <input class="bau-confirm-value-input" data-field="cid" data-step="1" value="${data.cid || ''}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">AM</span>
                        <input class="bau-confirm-value-input" data-field="amName" data-step="1" value="${data.amName || ''}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="1" value="${data.seId || ''}" placeholder="Não informado">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">O que deve ser feito</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="reason" data-step="2" placeholder="---">${data.reason || ''}</textarea>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Tasks</span>
                        <span class="bau-confirm-value-input" style="cursor: default; opacity: 0.8;" title="Para editar as tasks, volte ao Passo 2">${tasksText}</span>
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Justificativa BAU</span>
                        <select class="bau-confirm-value-input" data-field="nonImplementationReason" data-step="3">
                            <option value="Tempo da consultoria esgotado" ${data.nonImplementationReason === 'Tempo da consultoria esgotado' ? 'selected' : ''}>Tempo da consultoria esgotado</option>
                            <option value="Solicitação de reagendamento pelo anunciante" ${data.nonImplementationReason === 'Solicitação de reagendamento pelo anunciante' ? 'selected' : ''}>Solicitação de reagendamento pelo anunciante</option>
                            <option value="Falta de acessos ou backup do site" ${data.nonImplementationReason === 'Falta de acessos ou backup do site' ? 'selected' : ''}>Falta de acessos ou backup do site</option>
                            <option value="Anunciante indisponível ou não preparado" ${data.nonImplementationReason === 'Anunciante indisponível ou não preparado' ? 'selected' : ''}>Anunciante indisponível ou não preparado</option>
                            <option value="Implementação parcial (nem todas as tasks concluídas)" ${data.nonImplementationReason === 'Implementação parcial (nem todas as tasks concluídas)' ? 'selected' : ''}>Implementação parcial (nem todas as tasks concluídas)</option>
                            <option value="Solicitação de tarefas (tasks) adicionais" ${data.nonImplementationReason === 'Solicitação de tarefas (tasks) adicionais' ? 'selected' : ''}>Solicitação de tarefas (tasks) adicionais</option>
                            <option value="Necessidade de novas alterações (fase de acompanhamento)" ${data.nonImplementationReason === 'Necessidade de novas alterações (fase de acompanhamento)' ? 'selected' : ''}>Necessidade de novas alterações (fase de acompanhamento)</option>
                            <option value="Retorno de contato após prazo de 14 dias expirado" ${data.nonImplementationReason === 'Retorno de contato após prazo de 14 dias expirado' ? 'selected' : ''}>Retorno de contato após prazo de 14 dias expirado</option>
                        </select>
                    </div>
                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descrição</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="3" placeholder="---">${data.description || ''}</textarea>
                    </div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Disponibilidade (Prioridade)</span>
                        <input type="datetime-local" class="bau-confirm-value-input" data-field="availability_1" data-step="3" value="${data.availability_1 || ''}">
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                ${isEditing ? `<div class="bau-highlight-panel discard-theme" style="margin-bottom: 16px; padding: 12px; border: 1px solid ${COLORS.red}; background: rgba(217, 48, 37, 0.05); border-radius: 8px; font-weight: 500;">Você está editando o descarte do caso #<span style="color: ${COLORS.red}">${editingCaseId}</span></div>` : ''}
                <div class="bau-confirmation-grid">
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Case ID</span>
                        <input class="bau-confirm-value-input" data-field="caseId" data-step="5" value="${data.caseId || ''}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Idioma</span>
                        <input class="bau-confirm-value-input" data-field="language" data-step="5" value="${data.language || ''}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Speakeasy ID</span>
                        <input class="bau-confirm-value-input" data-field="seId" data-step="5" value="${data.seId || ''}" placeholder="---">
                    </div>
                    <div class="bau-confirm-row">
                        <span class="bau-confirm-label">Motivo do Descarte</span>
                        <input class="bau-confirm-value-input" data-field="reason" data-step="5" value="${data.reason || ''}" placeholder="---" readonly style="opacity: 0.7;">
                    </div>

                    <div class="bau-confirm-divider"></div>

                    <div class="bau-confirm-row full-width">
                        <span class="bau-confirm-label">Descrição do Descarte</span>
                        <textarea class="bau-confirm-value-input bau-confirm-textarea" data-field="description" data-step="5" placeholder="---">${data.description || ''}</textarea>
                    </div>
                </div>
            `;
        }

        // Listen for changes and sync back to the original form
        container.querySelectorAll('.bau-confirm-value-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const fieldName = e.target.dataset.field;
                const stepId = e.target.dataset.step;
                if (!fieldName || !stepId) return;

                const originalInput = form.querySelector(`#bau-step-${stepId} [name="${fieldName}"]`);
                if (originalInput) {
                    originalInput.value = e.target.value;

                    // Specific logic for CID validation if edited here
                    if (fieldName === 'cid') {
                        validateStep(1);
                    }
                }
            });
        });
    }
    async function handleEditCase(c) {
        resetForm();
        isEditing = true;
        editingCaseId = c.id;
        requestType = (c.status === 'PENDING_TL_DISCARD' || (c.reason && !c.task)) ? 'DISCARD' : 'BAU';

        switchView('form');
        await populateContextData();

        // Overwrite some context data with actual case data
        currentContextData = {
            ...currentContextData,
            advName: c.advName || currentContextData.advName,
            cid: c.cid || currentContextData.cid,
            caseId: c.caseId || currentContextData.caseId,
            seId: c.seId || currentContextData.seId,
            site: c.site || currentContextData.site,
            email: c.advEmail || currentContextData.email,
            timezone: c.timezone || currentContextData.timezone,
            language: c.language || currentContextData.language,
            amName: c.amName || currentContextData.amName,
            salesProgram: c.salesProgram || currentContextData.salesProgram
        };

        // Populate fields
        const availabilitySlots = c.availability ? c.availability.split('|').map(s => s.trim()) : [];

        form.querySelectorAll('input, select, textarea').forEach(input => {
            const fieldName = input.name;

            // Map common field names to data keys
            const keyMap = {
                'advEmail': 'advEmail',
                'website': 'site',
                'site': 'site'
            };

            if (fieldName === 'taskType') {
                const tasks = (c.task || c.taskType || "").split(',').map(t => t.trim());
                if (input.type === 'checkbox') {
                    input.checked = tasks.includes(input.value);
                    input.closest('.bau-task-item')?.classList.toggle('active', input.checked);
                }
            } else if (fieldName.startsWith('availability_')) {
                const index = parseInt(fieldName.split('_')[1]) - 1;
                const slot = availabilitySlots[index];
                if (slot && input.type === 'datetime-local') {
                    try {
                        const date = new Date(slot);
                        if (!isNaN(date.getTime())) {
                            const localISO = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
                            input.value = localISO;
                        }
                    } catch(e) {}
                }
            } else if (c[fieldName] !== undefined) {
                input.value = c[fieldName];
            } else if (fieldName === 'reason') {
                input.value = c.reason;
            } else if (fieldName === 'description') {
                input.value = c.description;
            } else if (fieldName === 'nonImplementationReason') {
                input.value = c.nonImplementationReason || "";
            }
        });

        currentStep = (requestType === 'BAU') ? 1 : 5;
        updateWizardState();
        SoundManager.playClick();
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const stepsToValidate = requestType === 'BAU' ? [1, 2, 3] : [5];
        for (const stepId of stepsToValidate) {
            const stepConfig = FORM_CONFIG.steps.find(s => s.id === stepId);
            if (stepConfig?.isConfirmation) continue;

            if(!validateStep(stepId) || !validateRequiredFields(stepId)) {
                console.warn(`Form submission blocked by validation failure in step ${stepId}`);
                currentStep = stepId;
                updateWizardState();
                return;
            }
        }
        
        const submitBtn = popup.querySelector('.bau-btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const context = currentContextData || {};
        
        let payload = {
            ...context,
            ...data,
            requestType: requestType
        };

        // Ensure fields that might have different names in context/form match backend expectations
        if (data.advEmail) payload.advEmail = data.advEmail;
        else if (context.email) payload.advEmail = context.email;

        if (data.website) payload.website = data.website;
        else if (context.site) payload.website = context.site;

        if (requestType === 'BAU') {
            const tasks = formData.getAll('taskType');
            const disponibilidadeUnificada = [data.availability_1, data.availability_2, data.availability_3]
                .filter(d => d && d.trim() !== '')
                .join(' | ');

            payload.taskType = tasks.join(', ');
            payload.availability = disponibilidadeUnificada;

            // Fallback preventivo e Auditoria de Dados (Garantir que cheguem à planilha)
            payload.nonImplementationReason = data.nonImplementationReason || "";
            payload.description = data.description || "";

            if (!payload.nonImplementationReason) console.warn("Aviso: Campo 'Justificativa' (nonImplementationReason) está saindo vazio.");
            if (!payload.description) console.warn("Aviso: Campo 'Descrição detalhada' (description) está saindo vazio.");
        } else {
            // Discard Flow: KISS Principle - nullify irrelevant fields
            payload.taskType = "";
            payload.availability = "";
            payload.nonImplementationReason = "";
            payload.reason = data.reason; // This comes from step 5 'reason' field
        }

        try {
            if (isEditing) {
                await updateBAUEscalation(editingCaseId, payload);
            } else {
                await sendBAUEscalation(payload, context.agentEmail || "anon");
            }

            SoundManager.playSuccess();

            // Dynamic Success Message
            const successTitle = popup.querySelector('.bau-success-title');
            if (successTitle) {
                if (isEditing) {
                    successTitle.textContent = 'Caso atualizado com sucesso!';
                } else {
                    successTitle.textContent = requestType === 'DISCARD'
                        ? 'Caso enviado para descarte com sucesso!'
                        : 'Caso enviado com sucesso!';
                }
            }

            switchView('success');
        } catch (error) {
            showToast("Erro: " + (error.message || "Erro desconhecido"), { error: true });
            console.error("Payload que tentou enviar:", payload); 
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `${ICONS.send} Enviar para o TL`;
        }
    };

    function resetForm() {
        form.reset();
        currentStep = 0;
        requestType = 'BAU';
        isEditing = false;
        editingCaseId = null;
        updateWizardState();
        form.querySelectorAll('.bau-task-item.active').forEach(item => item.classList.remove('active'));

        // Ensure language input is reset from readOnly
        const langInput = form.querySelector('[name="language"]');
        if (langInput) {
            langInput.readOnly = false;
            langInput.style.background = '';
            langInput.style.cursor = '';
        }
    }

    popup.querySelector('#bau-new-case-btn').addEventListener('click',() => {
        resetForm();
        switchView('form');
        populateContextData();
    });

    popup.querySelector('#bau-form-back-btn').addEventListener('click', () => switchView('dashboard'));
    popup.querySelector('#bau-success-back-btn').addEventListener('click', () => switchView('dashboard'));

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
