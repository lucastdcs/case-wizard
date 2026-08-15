// src/modules/notes/tag-support.js

// Importamos estilos genéricos do utils para manter consistência
import { styleLabel } from '../shared/utils.js';
import {styleCheckboxInput} from '../notes/notes-styles.js'
import { notesState } from './core/notes-state.js';

// Estilos locais específicos deste módulo
const styleContainer = { 
    marginTop: "24px", marginBottom: "16px", padding: "20px",
    background: "#fff9e6", borderRadius: "20px", border: "1.5px solid #fbbc0540",
    display: "none",
    boxShadow: "0 4px 12px rgba(251, 188, 5, 0.05)"
};
const styleWarning = { fontSize: "12px", color: "#b06000", marginTop: "8px", lineHeight: "1.4" };
const styleInputLocal = { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid #dadce0", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box", background: "#fff" };
const styleRadioGroup = { display: 'flex', gap: '20px', marginBottom: '12px' };

export function createTagSupportModule(t) {
    // --- 1. CONSTRUÇÃO DA UI ---
    const container = document.createElement("div");
    container.id = "tag-support-container";
    Object.assign(container.style, styleContainer);

    const mainLabel = document.createElement("label");
    mainLabel.className = "js-ts-main-label";
    mainLabel.textContent = t('utilizou_tag_support');
    Object.assign(mainLabel.style, styleLabel, { marginTop: "0" });

    // Radio Buttons Container
    const radioContainer = document.createElement("div");
    Object.assign(radioContainer.style, styleRadioGroup);

    // Opção Sim
    const rSim = document.createElement("input"); rSim.type = "radio"; rSim.name = "ts_usage_mod"; rSim.value = "Sim"; 
    Object.assign(rSim.style, styleCheckboxInput);
    const lSim = document.createElement("label"); lSim.textContent = "Sim";
    const divSim = document.createElement("div"); Object.assign(divSim.style, { display: 'flex', alignItems: 'center' });
    divSim.appendChild(rSim); divSim.appendChild(lSim);

    // Opção Não
    const rNao = document.createElement("input"); rNao.type = "radio"; rNao.name = "ts_usage_mod"; rNao.value = "Não"; rNao.checked = true;
    Object.assign(rNao.style, styleCheckboxInput);
    const lNao = document.createElement("label"); lNao.textContent = "Não";
    const divNao = document.createElement("div"); Object.assign(divNao.style, { display: 'flex', alignItems: 'center' });
    divNao.appendChild(rNao); divNao.appendChild(lNao);

    radioContainer.appendChild(divSim); radioContainer.appendChild(divNao);

    // Área do Motivo (Só aparece se "Não")
    const reasonDiv = document.createElement("div");
    reasonDiv.style.display = "block"; // Default visível pois "Não" é default

    const reasonLabel = document.createElement("label");
    reasonLabel.className = "js-ts-reason-label";
    reasonLabel.textContent = t('motivo_ts');
    Object.assign(reasonLabel.style, styleLabel, { fontSize: "12px" });

    const reasonInput = document.createElement("input");
    reasonInput.type = "text";
    Object.assign(reasonInput.style, styleInputLocal);

    const warningText = document.createElement("div");
    warningText.className = "js-ts-warning";
    warningText.innerHTML = `⚠️ <strong>${t('lembre_preencher_form')}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>`;
    Object.assign(warningText.style, styleWarning);

    reasonDiv.appendChild(reasonLabel);
    reasonDiv.appendChild(reasonInput);
    reasonDiv.appendChild(warningText);

    container.appendChild(mainLabel);
    container.appendChild(radioContainer);
    container.appendChild(reasonDiv);

    // --- 2. EVENTOS INTERNOS ---
    rSim.onchange = () => {
        reasonDiv.style.display = 'none';
        notesState.setTagSupportUsed(true);
    };
    rNao.onchange = () => {
        reasonDiv.style.display = 'block';
        notesState.setTagSupportUsed(false);
    };

    // --- 3. API PÚBLICA (Métodos que o pai vai chamar) ---

    // Decide se mostra ou esconde o módulo baseado nas tasks
    function updateVisibility(subStatus, selectedTasksArray) {
        // Reset inicial
        container.style.display = 'none';

        if (!subStatus) return;
        if (!selectedTasksArray || selectedTasksArray.length === 0) return;

        // Regra específica: Apenas Ads Conversion Tracking ou Enhanced Conversions
        const hasTargetTasks = selectedTasksArray.some(t =>
            t === 'ads_conversion_tracking' || t === 'ads_enhanced_conversions'
        );

        if (hasTargetTasks) {
            container.style.display = 'block';
        } else {
            reset();
            notesState.setTagSupportUsed(false);
        }
    }

    // Gera o texto para a nota final
    function getOutput() {
        if (container.style.display === 'none') return '';

        let text = `<br><b>Utilizou Tag Support?</b> ${rSim.checked ? "✅ Sim" : "❌ Não"}`;
        if (rNao.checked && reasonInput.value.trim() !== "") {
            text += `<br><b>Motivo:</b> ${reasonInput.value}`;
        }
        text += `<br>`;
        return text;
    }

    function setLanguage(newT) {
        t = newT;
        mainLabel.textContent = t('utilizou_tag_support');
        reasonLabel.textContent = t('motivo_ts');
        warningText.innerHTML = `⚠️ <strong>${t('lembre_preencher_form')}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#b06000; text-decoration:underline;">Link aqui</a>`;
    }

    // Reseta o estado (chamado ao mudar de passo)
    function reset() {
        container.style.display = 'none';
        rNao.checked = true;
        rSim.checked = false;
        reasonDiv.style.display = 'block';
        reasonInput.value = '';
    }

    return {
        element: container, // O elemento HTML para dar append
        updateVisibility,
        getOutput,
        setLanguage,
        reset
    };
}
