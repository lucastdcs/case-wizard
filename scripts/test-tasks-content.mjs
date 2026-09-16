// scripts/test-tasks-content.mjs
//
// Prova que o catálogo de tasks publicado na Central reconstrói, sem perda, o
// que o agente já vê hoje: as mesmas tasks, com os mesmos screenshots, na mesma
// ordem, e com o MESMO texto em espanhol.
//
// O risco aqui é específico e silencioso. O serviço REESCREVE o TASKS_DB no
// lugar, para que o seletor de tasks, o getTaskScreenshots() e o gerador da nota
// continuem funcionando sem alteração. Se a reescrita errar a forma, nada quebra
// visivelmente: o agente só passa a ver menos campos de evidência — e a nota sai
// incompleta no meio de um atendimento, sem erro em log nenhum.
//
// A comparação do espanhol é o coração do teste. Antes a tradução vinha de um
// mapa por frase (SCREENSHOT_LABEL_ES); agora vem materializada por task, linha
// a linha. As duas rotas têm que devolver exatamente a mesma lista.
//
// Uso: npm run test:tasks

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

const seed = JSON.parse(readFileSync(resolve(here, '../gas-backend/seeds/tasks-seed.json'), 'utf8'));

// Semeia o cache: é o caminho do primeiro render, e evita stubar JSONP.
store['cw_content_task_screenshots'] = JSON.stringify(
    seed.items.map((it, idx) => ({
        id: 'itm_' + idx,
        key: it.key,
        field: it.field || '',
        lang: it.lang,
        label: it.label,
        value: it.value,
        sortOrder: it.sortOrder ?? idx,
    }))
);

async function bundlar(entry, footer) {
    const out = await build({
        entryPoints: [resolve(here, entry)],
        bundle: true,
        write: false,
        format: 'cjs',
        platform: 'node',
        logLevel: 'silent',
        ...(footer ? { footer: { js: footer } } : {}),
    });
    const mod = { exports: {} };
    new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, require);
    return mod.exports;
}

// O catálogo embutido, intocado: é a referência do "antes".
const notesMod = await bundlar('../src/modules/notes/data/notes-data.js');
const antes = JSON.parse(JSON.stringify(notesMod.exports?.TASKS_DB || notesMod.TASKS_DB));
const getTaskScreenshots = notesMod.getTaskScreenshots;

// O serviço reescreve a cópia que ELE importou; o footer expõe essa cópia.
const svc = await bundlar(
    '../src/modules/notes/data/tasks-service.js',
    'module.exports.__tasks = TASKS_DB;'
);
const aplicou = await svc.loadTasks();
const depois = svc.__tasks;

const MODOS = ['implementation', 'education'];

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

console.log('\n--- Catálogo de tasks: round-trip para o agente ---');

check('o conteúdo publicado foi aplicado', () => {
    if (!aplicou) throw new Error('loadTasks() devolveu false');
    if (!Object.keys(depois).length) throw new Error('TASKS_DB ficou vazio');
});

check('nenhuma task se perdeu, e nenhuma apareceu', () => {
    const a = Object.keys(antes).sort().join(',');
    const b = Object.keys(depois).sort().join(',');
    if (a !== b) throw new Error(`chaves diferentes:\n      antes:  ${a}\n      depois: ${b}`);
});

check('a ordem do catálogo é a mesma (é a ordem da tela do agente)', () => {
    const a = Object.keys(antes).join(',');
    const b = Object.keys(depois).join(',');
    if (a !== b) throw new Error(`a ordem mudou:\n      antes:  ${a}\n      depois: ${b}`);
});

check('nome e "Acesso rápido" continuam iguais', () => {
    for (const [key, task] of Object.entries(antes)) {
        if (depois[key].name !== task.name) {
            throw new Error(`${key}: nome "${task.name}" virou "${depois[key].name}"`);
        }
        if (!!depois[key].popular !== !!task.popular) {
            throw new Error(`${key}: popular ${!!task.popular} virou ${!!depois[key].popular}`);
        }
    }
});

check('a lista de screenshots em PT chega byte a byte', () => {
    for (const [key, task] of Object.entries(antes)) {
        for (const modo of MODOS) {
            const a = getTaskScreenshots(task, modo, 'pt');
            const b = getTaskScreenshots(depois[key], modo, 'pt');
            if (JSON.stringify(a) !== JSON.stringify(b)) {
                throw new Error(`${key} (${modo}):\n      antes:  ${JSON.stringify(a)}\n      depois: ${JSON.stringify(b)}`);
            }
        }
    }
});

check('a lista em ES chega igual — a tradução publicada = o mapa embutido', () => {
    // A prova de que a migração não muda nada para o agente ES. Se cair aqui, a
    // materialização do SCREENSHOT_LABEL_ES por task perdeu ou deslocou linha.
    for (const [key, task] of Object.entries(antes)) {
        for (const modo of MODOS) {
            const a = getTaskScreenshots(task, modo, 'es');
            const b = getTaskScreenshots(depois[key], modo, 'es');
            if (JSON.stringify(a) !== JSON.stringify(b)) {
                throw new Error(`${key} (${modo}):\n      antes:  ${JSON.stringify(a)}\n      depois: ${JSON.stringify(b)}`);
            }
        }
    }
});

check('PT e ES pedem a MESMA quantidade de evidências', () => {
    // A regra que o servidor também cobra: o Win Criteria não muda de tamanho
    // com o idioma, e um campo a menos em ES é uma nota incompleta.
    for (const [key, task] of Object.entries(depois)) {
        for (const modo of MODOS) {
            const pt = getTaskScreenshots(task, modo, 'pt').length;
            const es = getTaskScreenshots(task, modo, 'es').length;
            if (pt !== es) throw new Error(`${key} (${modo}): ${pt} em PT e ${es} em ES`);
        }
    }
});

check('linha em branco na tradução cai no texto original', () => {
    const task = {
        name: 'X',
        screenshots: { implementation: ['Tag criada', 'Um rótulo sem tradução nenhuma'] },
        screenshots_es: { implementation: ['', ''] },
    };
    const es = getTaskScreenshots(task, 'implementation', 'es');
    // Linha 1: cai no mapa embutido. Linha 2: nem mapa nem tradução, sai como está.
    if (es[0] !== 'Etiqueta creada') throw new Error(`linha 1 virou "${es[0]}"`);
    if (es[1] !== 'Um rótulo sem tradução nenhuma') throw new Error(`linha 2 virou "${es[1]}"`);
});

check('task publicada não herda tradução do mapa embutido', () => {
    // A Central é a fonte da verdade do conteúdo publicado. Se o mapa do código
    // entrasse como terceira fonte, a prévia "como o agente vê" da Central — que
    // não conhece esse mapa — mentiria, e uma tradução antiga sobreviveria a uma
    // correção do rótulo em PT.
    const publicada = {
        name: 'X', daCentral: true,
        screenshots: { implementation: ['Tag criada', 'Teste GTM'] },
        screenshots_es: { implementation: ['', 'Prueba GTM publicada'] },
    };
    const es = getTaskScreenshots(publicada, 'implementation', 'es');
    if (es[0] !== 'Tag criada') throw new Error(`linha sem ES virou "${es[0]}"`);
    if (es[1] !== 'Prueba GTM publicada') throw new Error(`linha com ES virou "${es[1]}"`);

    // E o catálogo aplicado pelo serviço carrega essa marca.
    for (const [key, task] of Object.entries(depois)) {
        if (task.daCentral !== true) throw new Error(`${key}: sem a marca de origem`);
    }
});

check('task corrompida não derruba o catálogo inteiro', () => {
    const ok = svc.applyTaskContent([
        { key: 'boa', lang: 'ALL', value: JSON.stringify({ name: 'Boa', screenshots: { implementation: ['A'] } }) },
        { key: 'quebrada', lang: 'ALL', value: '{isso não é json' },
        { key: 'sem_nome', lang: 'ALL', value: JSON.stringify({ screenshots: { implementation: ['B'] } }) },
    ]);
    if (!ok) throw new Error('devolveu false com uma task válida no meio');
    if (!svc.__tasks.boa) throw new Error('a task válida não entrou');
    if (svc.__tasks.quebrada || svc.__tasks.sem_nome) throw new Error('task inválida entrou no catálogo');
});

check('resposta vazia mantém o catálogo embutido', () => {
    // O primeiro load offline: sem conteúdo, o agente tem que ver o de sempre.
    const antesDoTeste = Object.keys(svc.__tasks).length;
    if (svc.applyTaskContent([]) !== false) throw new Error('lista vazia foi aplicada');
    if (svc.applyTaskContent(null) !== false) throw new Error('null foi aplicado');
    if (Object.keys(svc.__tasks).length !== antesDoTeste) throw new Error('o catálogo mudou');
});

console.log(
    '\n' + (fail ? '✗' : '✓') +
    ` ${Object.keys(antes).length} tasks embutidas -> ${seed.items.length} publicadas, ${fail} falhas\n`
);
process.exit(fail ? 1 : 0);
