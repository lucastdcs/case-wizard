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
    let currentContextData = {};

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
    dateLabel.textContent = "Disponibilidade (3 opções para reagendamento)";
    dateLabel.style.marginTop = "16px";
    actionCard.appendChild(dateLabel);

    const dateGrid = document.createElement("div");
    dateGrid.className = "bau-grid-2";
    dateGrid.style.gap = "12px";

    const d1 = document.createElement("input");
    d1.type = "datetime-local";
    d1.name = "availability_1";
    d1.required = true;
    d1.className = "bau-input";

    const d2 = document.createElement("input");
    d2.type = "datetime-local";
    d2.name = "availability_2";
    d2.required = true;
    d2.className = "bau-input";

    const d3 = document.createElement("input");
    d3.type = "datetime-local";
    d3.name = "availability_3";
    d3.required = true;
    d3.className = "bau-input";

    dateGrid.appendChild(d1);
    dateGrid.appendChild(d2);
    dateGrid.appendChild(d3);
    actionCard.appendChild(dateGrid);

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

    // Accordion Toggle
    const toggleBtn = document.getElementById('bau-toggle-data');
    const hiddenData = document.getElementById('bau-hidden-data');
    if (toggleBtn && hiddenData) {
        toggleBtn.onclick = () => {
            const isHidden = hiddenData.style.display === 'none';
            hiddenData.style.display = isHidden ? 'block' : 'none';
            toggleBtn.textContent = isHidden ? "Ocultar dados ▲" : "Ver todos os dados capturados ▼";
            SoundManager.playClick();
        };
    }

    // Função de abertura do módulo (injetar dados da tela)
    async function populateContextData() {
        currentContextData = await getPageData() || {};
        const pd = currentContextData;

        if (pd) {
            document.getElementById('bau-adv-name').textContent = pd.advName || "Anunciante Desconhecido";
            document.getElementById('bau-adv-details').textContent = `CID: ${pd.cid || "N/A"} • AM: ${pd.amName || "N/A"}`;
            
            // Injeta dados no accordion oculto
            const hiddenData = document.getElementById('bau-hidden-data');
            if (hiddenData) {
                hiddenData.innerHTML = `
                    <b>Email:</b> ${pd.email || "N/A"}<br>
                    <b>Idioma:</b> ${pd.language || "N/A"}<br>
                    <b>Programa:</b> ${pd.salesProgram || "N/A"}<br>
                    <b>Speakeasy ID:</b> ${pd.seId || "N/A"}
                `;
            }

            // --- DINAMIC FALLBACK LOGIC ---
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

            const missingFields = requiredFields.filter(f => !pd[f.key] || pd[f.key] === "N/A" || pd[f.key] === "---");

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
                banner.innerHTML = `<span>⚠️</span> Dados ausentes. Verifique o fallback abaixo.`;
            } else {
                fallbackCard.style.display = 'none';
                banner.style.background = COLORS.greenLight;
                banner.style.color = COLORS.green;
                banner.style.borderBottomColor = COLORS.green;
                banner.innerHTML = `<span>✅</span> Dados capturados com sucesso!`;
            }
        }
    }

    // --- FORM SUBMISSION LOGIC ---
    form.onsubmit = async (e) => {
        e.preventDefault();

        // 1. Feedback Tátil Imediato (Loading)
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Carregando...";

        // 2. Coleta de dados do formulário e da página (Usa cache currentContextData)
        const formData = new FormData(form);
        const escalationData = Object.fromEntries(formData.entries());
        const contextData = currentContextData;

        // 3. Mapeamento Exato para o Backend
        const availability = `${escalationData.availability_1} | ${escalationData.availability_2} | ${escalationData.availability_3}`;

        const payload = {
            caseId: contextData.caseId || "",
            cid: escalationData.cid || contextData.cid || "",
            seId: escalationData.seId || contextData.seId || "",
            advName: escalationData.advName || contextData.advName || "",
            email: escalationData.email || contextData.email || "",
            language: escalationData.language || contextData.language || "",
            amName: escalationData.amName || contextData.amName || "",
            salesProgram: escalationData.salesProgram || contextData.salesProgram || "",
            site: escalationData.site || contextData.site || "",
            timezone: escalationData.timezone || contextData.timezone || "",
            reason: escalationData.reason,
            taskType: escalationData.taskType,
            description: escalationData.description,
            availability: availability
        };

        // 4. Validação Estrita (Nunca enviar com dados faltando)
        const missingFields = Object.keys(payload).filter(key => !payload[key] || payload[key] === "N/A" || payload[key] === "---");

        if (missingFields.length > 0) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            SoundManager.playClick();
            showToast(`Erro: Preencha todos os campos (${missingFields.join(', ')})`, "error");
            return;
        }

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

    async function toggleVisibility() {
        isVisible = !isVisible;
        if (isVisible) {
            popup.style.display = "flex";
            await populateContextData();
        }
        toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }

    return toggleVisibility;
}