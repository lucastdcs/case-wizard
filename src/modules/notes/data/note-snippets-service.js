// src/modules/notes/data/note-snippets-service.js
//
// Trechos prontos por campo da nota, vindos da Central de Conteúdo.
//
// Diferente de links e call script, aqui não existe fallback embutido: a
// biblioteca é funcionalidade nova e nasce vazia. Sem conteúdo publicado (ou
// com a API fora do ar) o comportamento é simplesmente o de hoje - nenhum
// botão de trechos aparece, e o agente escreve a nota do mesmo jeito. É por
// isso que nada aqui pode lançar erro para cima: falha de rede não pode
// atrapalhar quem está no meio de uma nota.

import { DataService } from "../../shared/data-service.js";

let snippetsByField = {};
let loaded = false;

function indexItems(items) {
    if (!Array.isArray(items)) return false;

    const next = {};
    for (const item of items) {
        const field = item.field;
        if (!field || !item.value) continue;

        (next[field] = next[field] || []).push({
            id: item.id,
            title: item.label || '',
            text: item.value,
            // 'ALL' = vale para qualquer idioma / qualquer substatus.
            lang: (item.lang || 'ALL').toUpperCase(),
            substatus: item.key || 'ALL',
            sortOrder: item.sortOrder || 0,
        });
    }

    for (const field of Object.keys(next)) {
        next[field].sort((a, b) => a.sortOrder - b.sortOrder);
    }

    snippetsByField = next;
    return true;
}

export async function loadNoteSnippets() {
    // Cache primeiro pra não bloquear a abertura da nota; a resposta fresca
    // corrige depois se algo mudou.
    const cached = DataService.getCachedContent('case_note_snippet');
    if (indexItems(cached)) loaded = true;

    try {
        const items = await DataService.fetchContentModule('case_note_snippet');
        if (indexItems(items)) loaded = true;
    } catch (e) {
        console.warn('Trechos de nota indisponíveis; seguindo sem eles.', e);
    }

    return loaded;
}

/**
 * Trechos aplicáveis a um campo, já filtrados por idioma e substatus atuais.
 *
 * @param {string} fieldName  chave do campo (ex.: 'PASSOS_EXECUTADOS')
 * @param {string} lang       'pt' | 'es' - idioma corrente da nota
 * @param {string} substatus  chave do substatus corrente, se houver
 */
export function getSnippetsForField(fieldName, lang, substatus) {
    const all = snippetsByField[fieldName];
    if (!all || !all.length) return [];

    const wantLang = String(lang || 'pt').toUpperCase();

    return all.filter((s) => {
        const langOk = s.lang === 'ALL' || s.lang === wantLang;
        const scopeOk = s.substatus === 'ALL' || !substatus || s.substatus === substatus;
        return langOk && scopeOk;
    });
}

export function hasSnippetsForField(fieldName, lang, substatus) {
    return getSnippetsForField(fieldName, lang, substatus).length > 0;
}
