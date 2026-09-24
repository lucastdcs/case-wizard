// src/modules/notes/data/tasks-service.js
//
// Catálogo de tasks (e os screenshots do Win Criteria) publicado na Central de
// Conteúdo.
//
// Mesma abordagem de links, call script, e-mails e modelos de nota: em vez de
// uma estrutura paralela, isto REESCREVE o TASKS_DB no lugar. O ganho é que
// nada mais no módulo precisa mudar — o seletor de tasks (step-tasks.js), o
// getTaskScreenshots(), o resumo do rascunho e o output-generator continuam
// lendo a mesma estrutura de sempre, só que agora com conteúdo gerenciável.
//
// Sem resposta da API e sem cache, o catálogo embutido segue valendo: o agente
// vê exatamente o que via antes.

import { DataService } from "../../shared/data-service.js";
import { TASKS_DB } from "./notes-data.js";

// Uma task corrompida não pode derrubar as outras doze: o agente ficaria sem
// catálogo nenhum no meio de um atendimento por causa de uma linha só.
function taskDoValor(raw) {
    let v;
    try {
        v = JSON.parse(raw || '{}');
    } catch (e) {
        return null;
    }

    const nome = String(v.name || '').trim();
    if (!nome) return null;

    const listas = v.screenshots || {};
    const impl = Array.isArray(listas.implementation) ? listas.implementation : [];
    const educ = Array.isArray(listas.education) ? listas.education : [];

    const task = {
        name: nome,
        // Marca a origem: o getTaskScreenshots() não aplica o mapa de tradução
        // embutido em conteúdo publicado (ver o comentário lá). O que a Central
        // publica é o que o agente vê, sem uma terceira fonte escondida no código.
        daCentral: true,
        screenshots: { implementation: impl, education: educ }
    };

    // `popular` só existe quando é verdadeiro: é o que o step-tasks filtra para
    // montar o "Acesso rápido", e um `false` explícito não muda nada.
    if (v.popular === true) task.popular = true;

    // A tradução viaja no MESMO item (lang 'ALL'), como o par desc/desc_es dos
    // links: a quantidade de evidências é uma decisão só, e separar em duas
    // linhas por idioma abriria espaço para PT e ES pedirem números diferentes
    // de screenshot para o mesmo Win Criteria.
    const es = v.screenshots_es;
    if (es && (Array.isArray(es.implementation) || Array.isArray(es.education))) {
        task.screenshots_es = {};
        if (Array.isArray(es.implementation)) task.screenshots_es.implementation = es.implementation;
        if (Array.isArray(es.education)) task.screenshots_es.education = es.education;
    }

    return task;
}

export function applyTaskContent(items) {
    if (!Array.isArray(items) || !items.length) return false;

    const catalogo = {};

    // A ordem da planilha é a ordem da tela: `sortOrder` decide quem aparece
    // primeiro no Acesso rápido e dentro de cada categoria do acordeão.
    const ordenados = items.slice().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    for (const item of ordenados) {
        const chave = String(item.key || '').trim();
        if (!chave) continue;

        const task = taskDoValor(item.value);
        if (!task) continue;

        catalogo[chave] = task;
    }

    // Sem nenhuma task válida não há o que exibir: melhor manter o catálogo
    // embutido do que deixar o agente sem tarefa nenhuma para selecionar.
    if (!Object.keys(catalogo).length) return false;

    for (const k of Object.keys(TASKS_DB)) delete TASKS_DB[k];
    Object.assign(TASKS_DB, catalogo);

    return true;
}

// Duas telas leem o MESMO catálogo: o seletor de tasks da nota e a grade de
// tasks do form BAU. As duas se inscrevem aqui, e a busca é uma só — o lote do
// app.js ainda está em voo quando os módulos inicializam, então o cache de
// sessão do DataService não pegaria a segunda ida, e o agente gastaria duas
// execuções do Apps Script pelo mesmo conteúdo.
const assinantes = new Set();
let emVoo = null;

function avisarTodos() {
    for (const fn of assinantes) {
        try {
            fn();
        } catch (e) {
            // Uma tela que falha ao repintar não pode impedir a outra de repintar.
            console.warn('Assinante do catálogo de tasks falhou.', e);
        }
    }
}

// Avisa a CADA aplicação, e não uma vez no fim, porque são dois momentos
// diferentes: o cache chega na hora e a rede chega depois. Repintar só no fim
// faria o agente olhar para o catálogo embutido enquanto o JSONP viaja —
// justamente o cenário em que o cache existe para ajudar.
async function buscarCatalogo() {
    const cached = DataService.getCachedContent('task_screenshots');
    let aplicado = applyTaskContent(cached);
    if (aplicado) avisarTodos();

    try {
        const items = await DataService.fetchContentModule('task_screenshots');
        if (applyTaskContent(items)) {
            aplicado = true;
            avisarTodos();
        }
    } catch (e) {
        console.warn('Catálogo de tasks indisponível; usando o embutido.', e);
    }

    return aplicado;
}

export function loadTasks(aoAplicar) {
    if (aoAplicar) assinantes.add(aoAplicar);
    if (!emVoo) emVoo = buscarCatalogo();
    return emVoo;
}
