// src/modules/notes/tag-support.js

// Importamos estilos genéricos do utils para manter consistência
import { styleLabel } from '../shared/utils.js';
import {styleCheckboxInput} from '../notes/notes-styles.js'
import { notesState } from './core/notes-state.js';
import { SoundManager } from '../shared/sound-manager.js';

// Estilos locais específicos deste módulo
const styleContainer = { 
    marginTop: "24px", marginBottom: "16px", padding: "20px",
    background: "#fff9e6", borderRadius: "20px", border: "2px solid #fbbc05",
    borderLeft: "8px solid #f29900",
    display: "none",
    boxShadow: "0 6px 18px rgba(251, 188, 5, 0.18)"
};
const styleWarning = { fontSize: "12px", color: "#b06000", marginTop: "8px", lineHeight: "1.4" };
const styleInputLocal = { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid #dadce0", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box", background: "#fff" };
const styleHelper = { fontSize: "12px", color: "#5f6368", lineHeight: "1.4", margin: "4px 0 14px 0" };
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

    // Por que a pergunta vem antes dos prints: a resposta decide quais prints saem.
    const helper = document.createElement("div");
    helper.className = "js-ts-helper";
    helper.textContent = t('ts_antes_dos_prints');
    Object.assign(helper.style, styleHelper);

    // Radio Buttons Container
    const radioContainer = document.createElement("div");
    Object.assign(radioContainer.style, styleRadioGroup);

    // Opção Sim
    const rSim = document.createElement("input"); rSim.type = "radio"; rSim.name = "ts_usage_mod"; rSim.value = "Sim";
    Object.assign(rSim.style, styleCheckboxInput);
    const lSim = document.createElement("label"); lSim.className = "js-ts-sim-label"; lSim.textContent = t('sim');
    const divSim = document.createElement("div"); Object.assign(divSim.style, { display: 'flex', alignItems: 'center' });
    divSim.appendChild(rSim); divSim.appendChild(lSim);

    // Opção Não
    const rNao = document.createElement("input"); rNao.type = "radio"; rNao.name = "ts_usage_mod"; rNao.value = "Não"; rNao.checked = true;
    Object.assign(rNao.style, styleCheckboxInput);
    const lNao = document.createElement("label"); lNao.className = "js-ts-nao-label"; lNao.textContent = t('nao');
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
    warningText.innerHTML = `⚠️ <strong>${t('lembre_preencher_form')}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#e37400; text-decoration:underline;">${t('link_aqui')}</a>`;
    Object.assign(warningText.style, styleWarning);

    reasonDiv.appendChild(reasonLabel);
    reasonDiv.appendChild(reasonInput);
    reasonDiv.appendChild(warningText);

    container.appendChild(mainLabel);
    container.appendChild(helper);
    container.appendChild(radioContainer);
    container.appendChild(reasonDiv);

    // --- 2. EVENTOS INTERNOS ---
    rSim.onchange = () => {
        SoundManager.playClick();
        reasonDiv.style.display = 'none';
        notesState.setTagSupportUsed(true);
    };
    rNao.onchange = () => {
        SoundManager.playClick();
        reasonDiv.style.display = 'block';
        notesState.setTagSupportUsed(false);
    };

    // --- 3. API PÚBLICA (Métodos que o pai vai chamar) ---

    // A pergunta aparece com qualquer task selecionada e fica SEMPRE antes dos
    // links/prints (a ordem do DOM está em notes-assistant.js). Quem usa a resposta
    // é step-tasks.js: o Sim dispensa os prints só de ACT/EC; as demais seguem.
    function updateVisibility(subStatus, selectedTasksArray) {
        container.style.display = 'none';

        if (!subStatus) return;
        if (!selectedTasksArray || selectedTasksArray.length === 0) return;

        container.style.display = 'block';
    }

    // Gera o texto para a nota final
    function getOutput() {
        // Visível = a linha sai, sempre (decisão do Lucas, 2026-11-12), tenha o
        // agente mexido na pergunta ou não.
        if (container.style.display === 'none') return '';

        let text = `<br><b>${t('tag_support_output_label')}</b> ${rSim.checked ? `✅ ${t('sim')}` : `❌ ${t('nao')}`}`;
        if (rNao.checked && reasonInput.value.trim() !== "") {
            text += `<br><b>${t('motivo_output_label')}</b> ${reasonInput.value}`;
        }
        text += `<br>`;
        return text;
    }

    function setLanguage(newT) {
        t = newT;
        mainLabel.textContent = t('utilizou_tag_support');
        helper.textContent = t('ts_antes_dos_prints');
        reasonLabel.textContent = t('motivo_ts');
        lSim.textContent = t('sim');
        lNao.textContent = t('nao');
        warningText.innerHTML = `⚠️ <strong>${t('lembre_preencher_form')}</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" rel="noopener noreferrer" style="color:#b06000; text-decoration:underline;">${t('link_aqui')}</a>`;
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
