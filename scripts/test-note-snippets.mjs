// scripts/test-note-snippets.mjs
//
// Testa a filtragem dos trechos de nota no lado do agente: dado o que a Central
// publicou, quais trechos aparecem em qual campo, idioma e substatus.
//
// É onde mora o risco desta fase. Um trecho que vaza para o campo errado não
// quebra nada visivelmente - ele só oferece ao agente, no meio do atendimento,
// um texto que não é daquele campo. Errar para MENOS (não mostrar) é discreto;
// errar para MAIS coloca conteúdo errado na nota do cliente.
//
// Roda o módulo real, empacotado com esbuild porque ele importa o DataService,
// que toca `window` já na carga.
//
// Uso: npm run test:note-snippets

import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// --- Stubs de navegador ---
const store = {};
globalThis.window = { location: { hostname: 'localhost' } };
globalThis.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
};
globalThis.document = { createElement: () => ({}), body: { appendChild() { }, contains: () => false } };

// O serviço lê do cache antes de ir à rede; semear o cache é o jeito de testar
// sem stubar JSONP, e exercita justamente o caminho do primeiro render.
const PUBLICADOS = [
    { id: '1', field: 'RESULTADO', key: 'ALL', lang: 'ALL', label: 'Geral', value: 'Tudo certo.', sortOrder: 2 },
    { id: '2', field: 'RESULTADO', key: 'ALL', lang: 'PT', label: 'Só PT', value: 'Implementado.', sortOrder: 1 },
    { id: '3', field: 'RESULTADO', key: 'ALL', lang: 'ES', label: 'Só ES', value: 'Implementado (es).', sortOrder: 3 },
    { id: '4', field: 'RESULTADO', key: 'SO_Implementation_Only', lang: 'ALL', label: 'Só nesse substatus', value: 'Escopo restrito.', sortOrder: 4 },
    { id: '5', field: 'PASSOS_EXECUTADOS', key: 'ALL', lang: 'ALL', label: 'Outro campo', value: 'Passo a passo.', sortOrder: 5 },
    { id: '6', field: 'RESULTADO', key: 'ALL', lang: 'ALL', label: 'Sem texto', value: '', sortOrder: 6 },
];
store['cw_content_case_note_snippet'] = JSON.stringify(PUBLICADOS);

const bundled = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/note-snippets-service.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});

const mod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', bundled.outputFiles[0].text)(mod, mod.exports, require);

const { loadNoteSnippets, getSnippetsForField, hasSnippetsForField } = mod.exports;

// A rede falha (não há backend aqui); o serviço tem que se virar com o cache.
await loadNoteSnippets();

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
const titles = (arr) => arr.map(s => s.title).join(', ');

console.log('\n--- Filtragem de trechos por campo ---');

check('rede fora do ar não impede usar o cache', () => {
    if (!getSnippetsForField('RESULTADO', 'pt').length) {
        throw new Error('nada carregado do cache');
    }
});

check('trecho de outro campo nunca aparece', () => {
    const got = getSnippetsForField('RESULTADO', 'pt');
    if (got.some(s => s.title === 'Outro campo')) {
        throw new Error('vazou trecho de PASSOS_EXECUTADOS: ' + titles(got));
    }
});

check('PT vê os de PT e os de qualquer idioma, não os de ES', () => {
    const got = getSnippetsForField('RESULTADO', 'pt').map(s => s.title);
    if (!got.includes('Só PT')) throw new Error('faltou o de PT: ' + got.join(', '));
    if (!got.includes('Geral')) throw new Error('faltou o de idioma ALL: ' + got.join(', '));
    if (got.includes('Só ES')) throw new Error('vazou o de ES: ' + got.join(', '));
});

check('ES vê os de ES e os de qualquer idioma, não os de PT', () => {
    const got = getSnippetsForField('RESULTADO', 'es').map(s => s.title);
    if (!got.includes('Só ES')) throw new Error('faltou o de ES: ' + got.join(', '));
    if (!got.includes('Geral')) throw new Error('faltou o de idioma ALL: ' + got.join(', '));
    if (got.includes('Só PT')) throw new Error('vazou o de PT: ' + got.join(', '));
});

check('trecho restrito a um substatus não aparece em outro', () => {
    const got = getSnippetsForField('RESULTADO', 'pt', 'NRP_No_Response').map(s => s.title);
    if (got.includes('Só nesse substatus')) {
        throw new Error('vazou trecho de outro substatus: ' + got.join(', '));
    }
});

check('trecho restrito aparece no substatus dele', () => {
    const got = getSnippetsForField('RESULTADO', 'pt', 'SO_Implementation_Only').map(s => s.title);
    if (!got.includes('Só nesse substatus')) {
        throw new Error('sumiu no substatus certo: ' + got.join(', '));
    }
});

check('trecho sem texto é descartado', () => {
    // Um item vazio viraria uma opção que insere nada - ruído puro no menu.
    const got = getSnippetsForField('RESULTADO', 'pt').map(s => s.title);
    if (got.includes('Sem texto')) throw new Error('trecho vazio entrou na lista');
});

check('a ordem respeita o sortOrder definido na Central', () => {
    const got = getSnippetsForField('RESULTADO', 'pt').map(s => s.title);
    const iPt = got.indexOf('Só PT');
    const iGeral = got.indexOf('Geral');
    if (iPt === -1 || iGeral === -1) throw new Error('faltou item: ' + got.join(', '));
    if (iPt > iGeral) throw new Error('ordem invertida: ' + got.join(', '));
});

check('campo sem trecho nenhum não oferece botão', () => {
    if (hasSnippetsForField('DUVIDAS', 'pt')) {
        throw new Error('ofereceu trechos para um campo que não tem nenhum');
    }
    if (!hasSnippetsForField('RESULTADO', 'pt')) {
        throw new Error('deixou de oferecer num campo que tem');
    }
});

console.log('\n' + (fail ? '✗' : '✓') + ` ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
