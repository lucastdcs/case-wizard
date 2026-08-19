// scripts/test-note-templates.mjs
//
// Prova que os modelos publicados na Central reconstroem os cenários do agente
// sem perda: semear a partir do scenarioSnippets e reaplicar tem que devolver os
// mesmos cenários, com os mesmos campos, escopo e substatus.
//
// O risco aqui é específico: o serviço REESCREVE scenarioSnippets e SCENARIO_ES
// no lugar, para que os chips, o applyScenario() e o openWithPreset() continuem
// funcionando sem alteração. Se essa reescrita errar a forma, nada quebra
// visivelmente - o agente só passa a ver menos cenários, ou cenários que
// preenchem campo errado, no meio de um atendimento.
//
// Uso: npm run test:note-templates

import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const store = {};
globalThis.window = { location: { hostname: 'localhost' } };
globalThis.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
};
globalThis.document = { createElement: () => ({}), body: { appendChild() { }, contains: () => false } };

const seed = JSON.parse(
    readFileSync(resolve(here, '../gas-backend/seeds/note-templates-seed.json'), 'utf8')
);

// Semeia o cache: é o caminho do primeiro render, e evita stubar JSONP.
store['cw_content_note_template'] = JSON.stringify(
    seed.items.map((it, idx) => ({
        id: 'itm_' + idx,
        key: it.key,
        field: it.field,
        lang: it.lang,
        label: it.label,
        value: it.value,
        sortOrder: it.sortOrder ?? idx,
    }))
);

const bundled = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/note-templates-service.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});

const mod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', bundled.outputFiles[0].text)(mod, mod.exports, require);

// O bundle traz notes-data junto, então dá pra observar o efeito da reescrita
// nas MESMAS estruturas que o resto do módulo lê.
const notesBundle = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/notes-data.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});
const notesMod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', notesBundle.outputFiles[0].text)(notesMod, notesMod.exports, require);

const originais = JSON.parse(JSON.stringify(notesMod.exports.scenarioSnippets));

const { loadNoteTemplates } = mod.exports;
await loadNoteTemplates();

// O serviço reescreve a cópia que ELE importou; para inspecionar, reimportamos a
// partir do mesmo bundle do serviço.
const svcBundle = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/note-templates-service.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
    footer: { js: 'module.exports.__scenarios = scenarioSnippets; module.exports.__es = SCENARIO_ES;' },
});
const svcMod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', svcBundle.outputFiles[0].text)(svcMod, svcMod.exports, require);
await svcMod.exports.loadNoteTemplates();

const depois = svcMod.exports.__scenarios;
const depoisEs = svcMod.exports.__es;

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

console.log('\n--- Modelos de nota: round-trip para o agente ---');

check('a reescrita aconteceu', () => {
    if (!Object.keys(depois).length) throw new Error('scenarioSnippets ficou vazio');
});

check('todo cenário tem substatus e tipo, como os chips esperam', () => {
    for (const [id, s] of Object.entries(depois)) {
        if (!Array.isArray(s.substatus) || !s.substatus.length) {
            throw new Error(`${id}: sem substatus (o chip nunca apareceria)`);
        }
        if (!['all', 'bau', 'lm'].includes(s.type)) {
            throw new Error(`${id}: tipo inválido "${s.type}"`);
        }
    }
});

check('todo cenário preenche pelo menos um campo', () => {
    for (const [id, s] of Object.entries(depois)) {
        const campos = Object.keys(s).filter((k) => k.startsWith('field-'));
        if (!campos.length) throw new Error(`${id}: nenhum campo`);
    }
});

check('os textos publicados chegam intactos', () => {
    // Compara contra o payload semeado, não contra os originais: a migração
    // descartou de propósito os campos que o substatus não tem (já eram
    // ignorados). O que foi publicado tem que chegar byte a byte.
    for (const item of seed.items) {
        if (item.lang !== 'PT') continue;
        const v = JSON.parse(item.value);

        const alvo = Object.entries(depois).find(
            ([, s]) => s.substatus[0] === item.key &&
                Object.entries(v.fields).every(([k, val]) => s[k] === val)
        );
        if (!alvo) {
            throw new Error(`não achei o cenário publicado "${item.label}" (${item.key}) com os textos originais`);
        }
    }
});

check('cada cenário tem sua tradução em ES', () => {
    const semEs = Object.keys(depois).filter((id) => !depoisEs[id]);
    if (semEs.length) {
        throw new Error(`${semEs.length} cenários sem ES: ${semEs.slice(0, 3).join(', ')}`);
    }
});

check('a tradução ES não muda o substatus nem o tipo', () => {
    // SCENARIO_ES sobrescreve só texto; se vazasse metadado, o cenário
    // apareceria no lugar errado quando o agente trocasse o idioma.
    for (const [id, es] of Object.entries(depoisEs)) {
        if (es.substatus !== undefined) throw new Error(`${id}: ES carregou substatus`);
        if (es.type !== undefined) throw new Error(`${id}: ES carregou type`);
        void depois[id];
    }
});

check('tarefas vinculadas sobrevivem à migração', () => {
    // linkedTask/activeTasks não são campos de texto: se sumissem, o cenário
    // deixaria de marcar a tarefa e ninguém associaria a causa.
    // Só as linhas PT viram cenário: as ES viram overlay de texto em
    // SCENARIO_ES, que de propósito não carrega metadado.
    const comTarefaNoSeed = seed.items.filter((i) => {
        if (i.lang !== 'PT') return false;
        const v = JSON.parse(i.value);
        return v.linkedTask || v.activeTasks;
    });
    const comTarefaDepois = Object.values(depois).filter((s) => s.linkedTask || s.activeTasks);

    if (comTarefaNoSeed.length !== comTarefaDepois.length) {
        throw new Error(`${comTarefaNoSeed.length} no seed viraram ${comTarefaDepois.length}`);
    }
});

check('nenhum cenário preenche campo que o substatus não tem', () => {
    // A falha silenciosa que a migração expôs: applyScenario() ignora campo
    // inexistente sem avisar, e o texto simplesmente nunca aparece.
    const { SUBSTATUS_TEMPLATES } = notesMod.exports;
    for (const [id, s] of Object.entries(depois)) {
        const tpl = SUBSTATUS_TEMPLATES[s.substatus[0]];
        if (!tpl) throw new Error(`${id}: substatus inexistente ${s.substatus[0]}`);

        const fora = Object.keys(s)
            .filter((k) => k.startsWith('field-'))
            .map((k) => k.replace('field-', ''))
            .filter((f) => !(tpl.templateFields || []).includes(f));

        if (fora.length) throw new Error(`${id}: campos fora do template: ${fora.join(', ')}`);
    }
});

console.log(
    '\n' + (fail ? '✗' : '✓') +
    ` ${Object.keys(originais).length} cenários embutidos -> ${Object.keys(depois).length} publicados, ${fail} falhas\n`
);
process.exit(fail ? 1 : 0);
