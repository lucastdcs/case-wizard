// scripts/test-call-script-roundtrip.mjs
//
// Prova que a migração do Call Script é SEM PERDA: semear a planilha a partir do
// csaChecklistData e depois reconstruir a partir do que foi semeado tem que
// devolver exatamente o roteiro original - mesmos passos, mesma ordem, mesmas
// seções, mesmos idiomas e fluxos.
//
// É o risco central desta fase. O seed reorganiza a chave combinada ("PT BAU")
// em colunas separadas (lang + key), e um erro nessa tradução ida-e-volta
// entregaria ao agente um roteiro fora de ordem ou incompleto - sem quebrar
// nada visivelmente, que é o pior tipo de falha.
//
// Roda o módulo real (não uma cópia da lógica), empacotado com esbuild porque
// ele importa o DataService, que toca `window` já na carga.
//
// Uso: npm run test:call-script

import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// --- Stubs de navegador, o mínimo pra importar o módulo ---
const store = {};
globalThis.window = { location: { hostname: 'localhost' } };
globalThis.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
};
globalThis.document = { createElement: () => ({}), body: { appendChild() { }, contains: () => false } };

const bundled = await build({
    entryPoints: [resolve(here, '../src/modules/call-script/call-script-data.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});

const mod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', bundled.outputFiles[0].text)(mod, mod.exports, require);

const { csaChecklistData, applyCallScriptContent } = mod.exports;

// Snapshot do roteiro original ANTES de qualquer hidratação.
const original = JSON.parse(JSON.stringify(csaChecklistData));

// O payload que a semeadura publica.
const seed = JSON.parse(
    readFileSync(resolve(here, '../gas-backend/seeds/call-script-seed.json'), 'utf8')
);

// A Central devolve os itens como o backend os entrega ao front.
const asServed = seed.items.map((it, idx) => ({
    key: it.key,
    field: it.field,
    lang: it.lang,
    label: it.label,
    value: it.value,
    sortOrder: it.sortOrder ?? idx,
}));

// Embaralha de propósito: a ordem correta tem que vir do sortOrder, não da
// ordem em que as linhas voltaram da planilha.
for (let i = asServed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [asServed[i], asServed[j]] = [asServed[j], asServed[i]];
}

const applied = applyCallScriptContent(asServed);

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

console.log('\n--- Round-trip do Call Script ---');

check('a hidratação foi aplicada', () => {
    if (!applied) throw new Error('applyCallScriptContent devolveu false');
});

check('mesmos roteiros, sem sobrar nem faltar', () => {
    const a = Object.keys(original).sort().join('|');
    const b = Object.keys(csaChecklistData).sort().join('|');
    if (a !== b) throw new Error(`esperado ${a}, veio ${b}`);
});

check('cada roteiro tem as mesmas seções', () => {
    for (const key of Object.keys(original)) {
        const a = Object.keys(original[key]).sort().join(',');
        const b = Object.keys(csaChecklistData[key]).sort().join(',');
        if (a !== b) throw new Error(`${key}: esperado [${a}], veio [${b}]`);
    }
});

check('todos os passos batem, na ordem exata', () => {
    for (const key of Object.keys(original)) {
        for (const group of Object.keys(original[key])) {
            const a = original[key][group];
            const b = csaChecklistData[key][group];

            if (a.length !== b.length) {
                throw new Error(`${key}/${group}: ${a.length} passos viraram ${b.length}`);
            }
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    throw new Error(
                        `${key}/${group}[${i}] divergiu:\n        original: ${JSON.stringify(a[i])}\n        veio:     ${JSON.stringify(b[i])}`
                    );
                }
            }
        }
    }
});

check('quebras de linha dentro de um passo sobrevivem', () => {
    // "ES LT" tem um passo com \n separando alternativas (A/B/C/D). Se algum dia
    // o pipeline achatar isso, o agente lê um passo ilegível na ligação.
    const comQuebra = Object.values(original)
        .flatMap(g => Object.values(g).flat())
        .filter(s => s.includes('\n'));

    if (!comQuebra.length) throw new Error('nenhum passo multilinha no original — teste perdeu o alvo');

    const depois = Object.values(csaChecklistData)
        .flatMap(g => Object.values(g).flat())
        .filter(s => s.includes('\n'));

    if (depois.length !== comQuebra.length) {
        throw new Error(`${comQuebra.length} passos multilinha viraram ${depois.length}`);
    }
});

const total = Object.values(original).flatMap(g => Object.values(g).flat()).length;
console.log('\n' + (fail ? '✗' : '✓') + ` round-trip de ${total} passos, ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
