// scripts/test-shortcuts.mjs
//
// Prova as regras dos atalhos do Ctrl+K - as que quebram em silêncio.
//
// O risco central é este: o atalho guarda a REFERÊNCIA de um cenário, e o
// catálogo de cenários é reescrito inteiro quando a Central de Conteúdo publica
// os modelos de nota (note-templates-service.js), trocando ids embutidos
// (`quickfill-in-no-show-bau`) por ids derivados (`cw-in_not_reachable-in-no-
// show-bau`). Se a resolução falhar, o atalho abre a nota sem o texto e o
// agente só descobre lendo a nota - por isso o teste exercita os dois mundos.
//
// Uso: npm run test:shortcuts

import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ---- Ambiente de navegador mínimo ----
const store = {};
globalThis.window = { location: { hostname: 'localhost' } };
globalThis.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
};
globalThis.document = { createElement: () => ({}), body: { appendChild() { }, contains: () => false } };

// Sem e-mail do agente capturado, o serviço de preferências fica só no cache
// local - que é exatamente o caminho que queremos exercitar aqui, sem JSONP.
async function carregar() {
    const bundle = await build({
        entryPoints: [resolve(here, '../src/modules/shared/shortcut-service.js')],
        bundle: true,
        write: false,
        format: 'cjs',
        platform: 'node',
        logLevel: 'silent',
        footer: { js: 'module.exports.__scenarios = scenarioSnippets;' },
    });
    const mod = { exports: {} };
    // eslint-disable-next-line no-new-func
    new Function('module', 'exports', 'require', bundle.outputFiles[0].text)(mod, mod.exports, require);
    return mod.exports;
}

const sc = await carregar();
const { ShortcutService, resolveScenarioId, shortcutIssues, MAX_SHORTCUTS } = sc;

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
async function checkAsync(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function limparPrefs() {
    delete store['cw_user_prefs_v1'];
    delete store['cw_shortcut_usage_v1'];
}

console.log('\n--- Atalhos do Ctrl+K ---');

// ----------------------------------------------------------------
//  Semeadura
// ----------------------------------------------------------------
limparPrefs();

check('quem nunca configurou nada recebe os dois atalhos de sempre', () => {
    const lista = ShortcutService.list();
    if (lista.length !== 2) throw new Error(`esperava 2 atalhos padrão, veio ${lista.length}`);
    const subs = lista.map((s) => s.payload.subStatus).sort();
    const esperado = ['IN_Not_Reachable', 'NI_Attempted_Contact'];
    if (JSON.stringify(subs) !== JSON.stringify(esperado)) {
        throw new Error(`substatus inesperados: ${subs.join(', ')}`);
    }
});

check('os atalhos padrão têm id estável entre leituras', () => {
    // Id gerado a cada chamada faria a contagem de uso e a seleção do Ctrl+K
    // apontarem para o vazio, sem erro nenhum.
    const a = ShortcutService.list().map((s) => s.id);
    const b = ShortcutService.list().map((s) => s.id);
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`ids mudaram: ${a} -> ${b}`);
});

check('os cenários dos atalhos padrão existem no catálogo embutido', () => {
    for (const atalho of ShortcutService.list()) {
        const problemas = shortcutIssues(atalho);
        if (problemas.length) throw new Error(`${atalho.label}: ${problemas.join(', ')}`);
    }
});

// ----------------------------------------------------------------
//  Resolução tolerante de cenário (o coração do risco)
// ----------------------------------------------------------------
console.log('\n--- Resolução do cenário nos dois mundos ---');

check('id embutido resolve para ele mesmo', () => {
    const id = 'quickfill-in-no-show-bau';
    const r = resolveScenarioId({ id, substatus: 'IN_Not_Reachable' });
    if (r !== id) throw new Error(`esperava ${id}, veio ${r}`);
});

check('id publicado pela Central resolve para o embutido equivalente', () => {
    // É o caso real do rollback: o agente salvou o atalho com a Central no ar,
    // a Central sai do ar, e o catálogo volta a ser o embutido.
    const publicado = 'cw-in_not_reachable-in-no-show-bau';
    const r = resolveScenarioId({ id: publicado, substatus: 'IN_Not_Reachable' });
    if (r !== 'quickfill-in-no-show-bau') throw new Error(`esperava o embutido, veio ${r}`);
});

check('id embutido resolve para o publicado quando a Central reescreve o catálogo', () => {
    // Simula exatamente o que applyNoteTemplateContent() faz: apaga tudo e
    // repovoa com ids derivados. É este caminho que fazia os atalhos antigos
    // sumirem do Ctrl+K sem erro nenhum.
    const catalogo = sc.__scenarios;
    const original = JSON.parse(JSON.stringify(catalogo));
    try {
        for (const k of Object.keys(catalogo)) delete catalogo[k];
        catalogo['cw-in_not_reachable-in-no-show-bau'] = {
            type: 'bau',
            substatus: ['IN_Not_Reachable'],
            'field-REASON_COMMENTS': 'Sem resposta ao 2 Day Rule.',
        };

        const r = resolveScenarioId({ id: 'quickfill-in-no-show-bau', substatus: 'IN_Not_Reachable' });
        if (r !== 'cw-in_not_reachable-in-no-show-bau') {
            throw new Error(`o atalho não se reencontrou no catálogo publicado (veio ${r})`);
        }
    } finally {
        for (const k of Object.keys(catalogo)) delete catalogo[k];
        Object.assign(catalogo, original);
    }
});

check('cenário que não existe mais devolve null em vez de lançar', () => {
    const r = resolveScenarioId({ id: 'quickfill-nao-existe-mais', substatus: 'IN_Not_Reachable' });
    if (r !== null) throw new Error(`esperava null, veio ${r}`);
});

check('atalho órfão é reportado como quebrado, não silenciosamente vazio', () => {
    const orfao = {
        id: 'sc_x', kind: 'note', label: 'Órfão', alias: '', order: 0,
        payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [{ id: 'quickfill-sumiu', substatus: 'IN_Not_Reachable' }] },
    };
    const problemas = shortcutIssues(orfao);
    if (problemas.length !== 1) throw new Error(`esperava 1 problema, veio ${problemas.length}`);
});

check('atalho sem cenário nenhum é válido (abre só no substatus certo)', () => {
    const semCenario = {
        id: 'sc_y', kind: 'note', label: 'Só o substatus', alias: '', order: 0,
        payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [] },
    };
    if (shortcutIssues(semCenario).length) throw new Error('atalho sem cenário foi marcado como quebrado');
});

// ----------------------------------------------------------------
//  CRUD e limites
// ----------------------------------------------------------------
console.log('\n--- Criação, limite e ordem ---');

function novoAtalho(label) {
    return {
        kind: 'note',
        label,
        alias: '',
        payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [] },
    };
}

await checkAsync('salvar um atalho materializa a lista (os padrões param de ser virtuais)', async () => {
    limparPrefs();
    await ShortcutService.save(novoAtalho('Meu primeiro'));
    const lista = ShortcutService.listRaw();
    if (lista.length !== 3) throw new Error(`esperava 2 padrões + 1 novo, veio ${lista.length}`);
    if (!lista.some((s) => s.label === 'Meu primeiro')) throw new Error('o atalho novo não entrou');
});

await checkAsync('apagar um atalho padrão não o ressuscita na leitura seguinte', async () => {
    limparPrefs();
    const alvo = ShortcutService.listRaw()[0];
    await ShortcutService.remove(alvo.id);
    const depois = ShortcutService.listRaw();
    if (depois.some((s) => s.id === alvo.id)) throw new Error('o atalho apagado voltou');
    if (depois.length !== 1) throw new Error(`esperava 1 restante, veio ${depois.length}`);
});

await checkAsync(`o limite de ${MAX_SHORTCUTS} atalhos é recusado com motivo`, async () => {
    limparPrefs();
    for (let i = ShortcutService.listRaw().length; i < MAX_SHORTCUTS; i++) {
        const r = await ShortcutService.save(novoAtalho('Atalho ' + i));
        if (!r.ok) throw new Error(`recusou cedo demais, no ${i}`);
    }
    const excedente = await ShortcutService.save(novoAtalho('Um a mais'));
    if (excedente.ok) throw new Error('aceitou passar do limite');
    if (excedente.reason !== 'limit') throw new Error(`motivo inesperado: ${excedente.reason}`);
});

await checkAsync('editar um atalho existente não cria outro nem muda a posição', async () => {
    limparPrefs();
    const lista = ShortcutService.listRaw();
    const alvo = lista[1];
    await ShortcutService.save({ ...alvo, label: 'Renomeado' });
    const depois = ShortcutService.listRaw();
    if (depois.length !== lista.length) throw new Error('a edição duplicou o atalho');
    if (depois[1].label !== 'Renomeado') throw new Error('a edição mudou a posição');
});

await checkAsync('reordenar reescreve a ordem inteira, sem buracos', async () => {
    limparPrefs();
    await ShortcutService.save(novoAtalho('Terceiro'));
    const antes = ShortcutService.listRaw();
    const ultimo = antes[antes.length - 1];

    await ShortcutService.reorder(ultimo.id, 0);
    const depois = ShortcutService.listRaw();

    if (depois[0].id !== ultimo.id) throw new Error('o item não foi para o topo');
    const ordens = depois.map((s) => s.order);
    if (JSON.stringify(ordens) !== JSON.stringify(depois.map((_, i) => i))) {
        throw new Error(`ordem com buraco: ${ordens.join(',')}`);
    }
});

await checkAsync('ordenar por uso põe o mais usado na frente sem perder ninguém', async () => {
    limparPrefs();
    const lista = ShortcutService.listRaw();
    const segundo = lista[1];

    await ShortcutService.setSortedByUsage(true);
    ShortcutService.registerUse(segundo.id);
    ShortcutService.registerUse(segundo.id);

    const ordenada = ShortcutService.list();
    if (ordenada[0].id !== segundo.id) throw new Error('o mais usado não ficou em primeiro');
    if (ordenada.length !== lista.length) throw new Error('a ordenação perdeu um atalho');

    await ShortcutService.setSortedByUsage(false);
    const manual = ShortcutService.list();
    if (manual[0].id !== lista[0].id) throw new Error('desligar a ordenação por uso não voltou à ordem manual');
});

check('dado corrompido nas preferências não derruba a lista', () => {
    // Um blob inválido é plausível: vem da nuvem, de outra versão do app.
    store['cw_user_prefs_v1'] = JSON.stringify({ shortcuts: [null, { id: 'x' }, 'lixo'] });
    const lista = ShortcutService.list();
    if (!Array.isArray(lista)) throw new Error('a lista não é um array');
    if (lista.length !== 0) throw new Error(`esperava descartar tudo que é inválido, sobrou ${lista.length}`);
});

limparPrefs();

console.log('\n' + (fail ? '✗' : '✓') + ` atalhos: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
