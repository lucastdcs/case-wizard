// src/modules/notes/data/note-templates-service.js
//
// Modelos de nota inteira publicados na Central de Conteúdo.
//
// Em vez de montar uma estrutura paralela, isto REESCREVE scenarioSnippets e
// SCENARIO_ES no lugar - mesma abordagem já usada em links, call script e
// e-mails. O ganho é que nada mais no módulo precisa mudar: os chips de cenário
// (step-scenarios.js), o applyScenario() e o openWithPreset() continuam lendo
// as mesmas estruturas de sempre, só que agora com conteúdo gerenciável.
//
// Sem resposta da API e sem cache, os cenários embutidos seguem valendo - o
// agente vê exatamente o que via antes.

import { DataService } from "../../shared/data-service.js";
import { scenarioSnippets, SCENARIO_ES, SCENARIO_EN } from "./notes-data.js";

// Um id estável por modelo, derivado de substatus + nome. Precisa ser estável
// porque o chip usa `data-id` e o openWithPreset() procura o chip por ele; e
// precisa casar entre a linha PT e a linha ES do mesmo modelo, que é como as
// duas se encontram.
function idDoModelo(item) {
    const nome = String(item.label || '')
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    return `cw-${String(item.key || '').toLowerCase()}-${nome}`;
}

function camposDoValor(raw) {
    let v;
    try {
        v = JSON.parse(raw || '{}');
    } catch (e) {
        return null;
    }
    const fields = v.fields || {};
    if (!Object.keys(fields).length) return null;
    return { fields, linkedTask: v.linkedTask, activeTasks: v.activeTasks };
}

export function applyNoteTemplateContent(items) {
    if (!Array.isArray(items) || !items.length) return false;

    const pt = {};
    const espelhos = { ES: {}, EN: {} };

    const ordenados = items.slice().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    for (const item of ordenados) {
        if (!item.key) continue;

        const parsed = camposDoValor(item.value);
        if (!parsed) continue; // Modelo corrompido não derruba os outros.

        const id = idDoModelo(item);

        // Roteamento por idioma EXPLÍCITO. Antes era "se é ES, espelho; senão,
        // base" — e a linha EN, que tem o MESMO id da PT, caía no senão e
        // sobrescrevia o cenário português pelo inglês, em silêncio. O agente
        // PT abriria o chip e receberia o texto em inglês.
        const lang = String(item.lang || '').toUpperCase();
        const espelho = espelhos[lang];

        if (espelho) {
            // O espelho sobrescreve só os campos de texto; o metadado
            // (type/substatus) continua vindo da definição base, como já era.
            espelho[id] = { ...parsed.fields };
            continue;
        }
        if (lang && lang !== 'PT' && lang !== 'ALL') continue;

        pt[id] = {
            type: (item.field || 'all').toLowerCase(),
            substatus: [item.key],
            ...parsed.fields,
            ...(parsed.linkedTask ? { linkedTask: parsed.linkedTask } : {}),
            ...(parsed.activeTasks ? { activeTasks: parsed.activeTasks } : {}),
        };
    }

    // Sem nenhum modelo em PT não há o que exibir: melhor manter os embutidos
    // do que deixar o agente sem cenário nenhum.
    if (!Object.keys(pt).length) return false;

    for (const k of Object.keys(scenarioSnippets)) delete scenarioSnippets[k];
    Object.assign(scenarioSnippets, pt);

    // Espelho que a Central não serviu NÃO é espelho vazio: é a Central não
    // tendo nada a dizer sobre aquele idioma. Zerar nesse caso derrubaria o
    // fallback embutido e o agente daquele idioma leria tudo em português —
    // sem erro, como de hábito. Mesma regra que o `if (!pt.length) return
    // false` acima já aplica à base.
    for (const [lang, alvo] of [['ES', SCENARIO_ES], ['EN', SCENARIO_EN]]) {
        if (!Object.keys(espelhos[lang]).length) continue;
        for (const k of Object.keys(alvo)) delete alvo[k];
        Object.assign(alvo, espelhos[lang]);
    }

    return true;
}

export async function loadNoteTemplates() {
    const cached = DataService.getCachedContent('note_template');
    let aplicado = applyNoteTemplateContent(cached);

    try {
        const items = await DataService.fetchContentModule('note_template');
        aplicado = applyNoteTemplateContent(items) || aplicado;
    } catch (e) {
        console.warn('Modelos de nota indisponíveis; usando os embutidos.', e);
    }

    return aplicado;
}
