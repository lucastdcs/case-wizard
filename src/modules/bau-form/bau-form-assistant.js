import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';
import { sendBAUEscalation } from '../shared/data-service.js';
import { getPageData } from '../shared/page-data.js';

export function initBAUForm() {
    injectStyles();

    let isVisible = false;

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
        "v1.0.0",
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
        <button type="button" class="bau-accordion-btn">Ver todos os dados capturados ▼</button>
    `;
    contextCard.appendChild(contextBody);
    form.appendChild(contextCard);

    // 2. FALLBACK CARD
    const fallbackCard = document.createElement("div");
    fallbackCard.className = "bau-card bau-fallback-card";
    fallbackCard.innerHTML = `
        <div style="color: #D93025; font-weight: 700; font-size: 13px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <span>⚠️</span> Preencha os itens não encontrados:
        </div>
        <div class="bau-grid-2">
            <div>
                <label class="bau-label">Fuso Horário</label>
                <input type="text" name="timezone" class="bau-input" placeholder="Ex: America/Sao_Paulo">
            </div>
            <div>
                <label class="bau-label">Site</label>
                <input type="text" name="site" class="bau-input" placeholder="www.exemplo.com">
            </div>
        </div>
    `;
    form.appendChild(fallbackCard);

    // 3. ACTION ZONE
    const actionCard = document.createElement("div");
    actionCard.className = "bau-card";

    // Chips de Ação Rápida
    const chipsLabel = document.createElement("label");
    chipsLabel.className = "bau-label";
    chipsLabel.textContent = "Ações Rápidas (Preenche Motivo e Task)";
    actionCard.appendChild(chipsLabel);

    const chipsContainer = document.createElement("div");
    chipsContainer.className = "bau-chips-container";

    const chipData = [
        { id: 'gtm', text: "🚀 Instalação GTM", reason: "Nova Implementação", task: "Setup GTM" },
        { id: 'ecw4', text: "🛒 ECW4 Purchase", reason: "Nova Implementação", task: "Google Ads Conversion" },
        { id: 'consent', text: "🛡️ Consent Mode", reason: "Correção de Tag", task: "GA4 Events" }
    ];

    chipData.forEach(data => {
        const chip = document.createElement("div");
        chip.className = "bau-chip";
        chip.textContent = data.text;
        chip.dataset.id = data.id;
        
        // Lógica: Clicar preenche os selects automaticamente
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

    // Dropdowns
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

    // Textarea
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

    // Datetime
    const dateLabel = document.createElement("label");
    dateLabel.className = "bau-label";
    dateLabel.textContent = "Disponibilidade do Anunciante";
    dateLabel.style.marginTop = "16px";
    actionCard.appendChild(dateLabel);

    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.name = "availability";
    dateInput.required = true;
    dateInput.className = "bau-input";
    actionCard.appendChild(dateInput);

    form.appendChild(actionCard);

    // --- STICKY FOOTER ---
    const footer = document.createElement("div");
    footer.className = "bau-footer";
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "bau-btn-submit";
    submitBtn.innerHTML = `<span>⚡</span> Enviar para o TL abrir o Caso`;
    footer.appendChild(submitBtn);
    form.appendChild(footer);

    document.body.appendChild(popup);

    // Função de abertura do módulo (injetar dados da tela)
    function populateContextData() {
        const pd = getPageData();
        if (pd) {
            document.getElementById('bau-adv-name').textContent = pd.advName || "Anunciante Desconhecido";
            document.getElementById('bau-adv-details').textContent = `CID: ${pd.cid || "N/A"} • AM: ${pd.amName || "N/A"}`;
            
            // Fallback para campos faltantes
            const inputTimezone = form.querySelector('input[name="timezone"]');
            const inputSite = form.querySelector('input[name="site"]');
            
            if (pd.timezone) { inputTimezone.value = pd.timezone; fallbackCard.style.display = 'none'; }
            if (pd.site) { inputSite.value = pd.site; fallbackCard.style.display = 'none'; }
            
            if (!pd.timezone || !pd.site) fallbackCard.style.display = 'block';
        }
    }

    // --- FORM SUBMISSION LOGIC ---
    form.onsubmit = async (e) => {
        e.preventDefault();

        // 1. Coleta de dados do formulário e da página
        const formData = new FormData(form);
        const escalationData = Object.fromEntries(formData.entries());
        const contextData = getPageData() || {};

        // 2. Mapeamento Exato para o Backend
        const payload = {
            caseId: contextData.caseId || "",
            cid: contextData.cid || "",
            seId: contextData.seId || "",
            advName: contextData.advName || "",
            email: contextData.email || "",
            language: contextData.language || "",
            amName: contextData.amName || "",
            salesProgram: contextData.salesProgram || "",
            // Mistura os dados raspados com o que o agente preencheu manualmente no fallback
            site: escalationData.site || contextData.site || "",
            timezone: escalationData.timezone || contextData.timezone || "",
            // Dados estritamente do formulário
            reason: escalationData.reason,
            taskType: escalationData.taskType,
            description: escalationData.description,
            availability: escalationData.availability
        };

        // 3. Feedback Tátil (Loading)
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Carregando...";

        try {
            // 4. Chamada ao DataService
            await sendBAUEscalation(payload, contextData.agentEmail || "anon");

            // 5. Sucesso
            SoundManager.playSuccess();
            showToast("Escalonamento enviado com sucesso!", "success");
            form.reset();
            chipsContainer.querySelectorAll('.bau-chip.active').forEach(c => c.classList.remove('active'));
            toggleVisibility(); 

        } catch (error) {
            // 6. Erro
            console.error("Erro BAU:", error);
            showToast("Falha ao enviar: " + (error.message || "Erro desconhecido"), "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    };

    function toggleVisibility() {
        isVisible = !isVisible;
        if (isVisible) {
            popup.style.display = "flex";
            populateContextData();
        }
        toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }

    return toggleVisibility;
}