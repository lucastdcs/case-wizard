// src/modules/bau-form/bau-form-assistant.js

import { injectStyles, COLORS } from './bau-form-styles.js';
import { createStandardHeader } from '../shared/header-factory.js';
import { toggleGenieAnimation } from '../shared/animations.js';
import { showToast } from '../shared/utils.js';
import { SoundManager } from '../shared/sound-manager.js';

export function initBAUForm() {
    injectStyles();

    let isVisible = false;

    // --- POPUP CONTAINER ---
    const popup = document.createElement("div");
    popup.id = "bau-form-popup";
    popup.className = "bau-popup cw-module-window"; // Added cw-module-window for animation compatibility
    popup.style.display = "none";
    popup.style.transformOrigin = "center center"; // Ensure transition starts from center if no button

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
    content.style.padding = "20px";
    content.style.overflowY = "auto";
    content.style.flexGrow = "1";
    popup.appendChild(content);

    // 1. CONTEXT CARD
    const contextCard = document.createElement("div");
    contextCard.className = "bau-card";
    contextCard.style.padding = "0";
    contextCard.style.overflow = "hidden";

    const banner = document.createElement("div");
    banner.className = "bau-header-banner";
    banner.innerHTML = `<span>⚠️</span> 2 dados ausentes no CRM`;
    contextCard.appendChild(banner);

    const contextBody = document.createElement("div");
    contextBody.style.padding = "16px";
    contextBody.innerHTML = `
        <h2 class="bau-title">Marffen Saneantes</h2>
        <p class="bau-subtitle">CID: 123-456-7890 • AM: Lucas Teixeira</p>
        <button class="bau-accordion-btn">Ver todos os dados capturados ▼</button>
    `;
    contextCard.appendChild(contextBody);
    content.appendChild(contextCard);

    // 2. FALLBACK CARD
    const fallbackCard = document.createElement("div");
    fallbackCard.className = "bau-card bau-fallback-card";
    fallbackCard.innerHTML = `
        <div style="color: #D93025; font-weight: 700; font-size: 13px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span>⚠️</span> Preencha os itens não encontrados:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
                <label class="bau-label">Fuso Horário</label>
                <input type="text" class="bau-input" placeholder="Ex: GMT-3">
            </div>
            <div>
                <label class="bau-label">Site</label>
                <input type="text" class="bau-input" placeholder="www.exemplo.com">
            </div>
        </div>
    `;
    content.appendChild(fallbackCard);

    // 3. ACTION ZONE
    const actionCard = document.createElement("div");
    actionCard.className = "bau-card";

    // Chips de Ação Rápida
    const chipsLabel = document.createElement("label");
    chipsLabel.className = "bau-label";
    chipsLabel.textContent = "Ações Rápidas";
    actionCard.appendChild(chipsLabel);

    const chipsContainer = document.createElement("div");
    chipsContainer.className = "bau-chips-container";

    const chipData = [
        { id: 'gtm', text: "🚀 Instalação GTM" },
        { id: 'ecw4', text: "🛒 ECW4 Purchase" },
        { id: 'consent', text: "🛡️ Consent Mode" }
    ];

    chipData.forEach(data => {
        const chip = document.createElement("div");
        chip.className = "bau-chip";
        chip.textContent = data.text;
        chip.onclick = () => {
            chip.classList.toggle('active');
            SoundManager.playClick();
        };
        chipsContainer.appendChild(chip);
    });
    actionCard.appendChild(chipsContainer);

    // Dropdowns
    const dropdownRow = document.createElement("div");
    dropdownRow.style.display = "grid";
    dropdownRow.style.gridTemplateColumns = "1fr 1fr";
    dropdownRow.style.gap = "12px";
    dropdownRow.style.marginBottom = "16px";
    dropdownRow.innerHTML = `
        <div>
            <label class="bau-label">Motivo da Abertura</label>
            <select class="bau-select">
                <option value="">Selecione...</option>
                <option value="new">Nova Implementação</option>
                <option value="fix">Correção de Tag</option>
                <option value="upgrade">Upgrade / Migração</option>
            </select>
        </div>
        <div>
            <label class="bau-label">Task para BAU</label>
            <select class="bau-select">
                <option value="">Selecione...</option>
                <option value="gtm">Setup GTM</option>
                <option value="ads">Google Ads Conversion</option>
                <option value="ga4">GA4 Events</option>
            </select>
        </div>
    `;
    actionCard.appendChild(dropdownRow);

    // Textarea
    const textLabel = document.createElement("label");
    textLabel.className = "bau-label";
    textLabel.textContent = "Justificativa / Descrição";
    actionCard.appendChild(textLabel);

    const textarea = document.createElement("textarea");
    textarea.className = "bau-textarea";
    textarea.placeholder = "Descreva detalhadamente o que precisa ser feito...";
    textarea.style.minHeight = "80px";
    textarea.style.marginBottom = "16px";
    actionCard.appendChild(textarea);

    // Datetime
    const dateLabel = document.createElement("label");
    dateLabel.className = "bau-label";
    dateLabel.textContent = "Disponibilidade do Anunciante";
    actionCard.appendChild(dateLabel);

    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.className = "bau-input";
    actionCard.appendChild(dateInput);

    content.appendChild(actionCard);

    // --- STICKY FOOTER ---
    const footer = document.createElement("div");
    footer.className = "bau-footer";
    const submitBtn = document.createElement("button");
    submitBtn.className = "bau-btn-submit";
    submitBtn.innerHTML = `<span>⚡</span> Enviar para o TL abrir o Caso`;
    submitBtn.onclick = () => {
        showToast("Solicitação enviada com sucesso!");
        SoundManager.playSuccess();
        toggleVisibility();
    };
    footer.appendChild(submitBtn);
    popup.appendChild(footer);

    document.body.appendChild(popup);

    function toggleVisibility() {
        isVisible = !isVisible;
        if (isVisible) popup.style.display = "flex";
        toggleGenieAnimation(isVisible, popup, "cw-btn-bauform");
    }

    return toggleVisibility;
}
