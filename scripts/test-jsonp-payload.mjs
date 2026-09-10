// scripts/test-jsonp-payload.mjs
//
// Trava a montagem da query string do JSONP (`buildQueryString`, em
// shared/data-service.js).
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O transporte do projeto é JSONP: todo o payload vira query string, e
// `encodeURIComponent` transforma `null` na STRING "null" e `undefined` em
// "undefined". Nenhum dos dois é rejeitado por ninguém no caminho — o backend
// recebe texto onde deveria receber ausência, grava na planilha, e o TL vê
// `null` escrito num campo do caso.
//
// Foi assim que o fuso horário chegou como `null` no TL Dashboard: `lerCampo`
// devolve `null` quando não acha o rótulo, e `p.timezone || ''` no backend não
// descarta a string "null" porque string não-vazia é truthy.
//
// A metade cara do bug está na EDIÇÃO: `update_bau_case` preserva o valor
// antigo testando `p.chave !== undefined`, e a string "undefined" passa nesse
// teste — o campo seria sobrescrito com o texto. Isso é o oposto da regra de
// não-sobrescrita escrita em `specs/data-models/api-payloads.md`, e some em
// silêncio porque a gravação "funciona".
//
// As DUAS metades do mesmo bug moram aqui: a origem (`buildQueryString`, que
// para de mandar o literal) e a limpeza (`celulaTexto`, no Código.js, que faz
// as linhas JÁ gravadas pararem de exibir `null` para o TL — elas não se curam
// sozinhas até o backup arquivá-las).
//
// Uso: npm run test:jsonp

import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// data-service.js lê __CW_BUILD_ENV__ no topo (roteamento de ambiente), então
// precisa passar pelo esbuild com o mesmo define do build de verdade.
const { outputFiles } = await build({
    entryPoints: [resolve(raiz, 'src/modules/shared/data-service.js')],
    bundle: true, write: false, format: 'esm',
    define: { __CW_BUILD_ENV__: '"development"' },
});

// O módulo decide o endpoint lendo `window.location.hostname` no topo, e
// anuncia o backend escolhido com um console.log. Nada disso é o que este
// arquivo testa — o stub existe só para o import não morrer no Node, e o log
// fica silenciado para a saída do teste não virar duas coisas misturadas.
globalThis.window = { location: { hostname: 'localhost' } };
const logOriginal = console.log;
console.log = () => {};
const { buildQueryString } = await import(
    'data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64')
);
console.log = logOriginal;

// O lado do backend. Código.js roda no escopo global do Apps Script; aqui basta
// um contexto vazio com console, porque celulaTexto() não toca em planilha.
const ctxGas = vm.createContext({ console });
vm.runInContext(readFileSync(resolve(raiz, 'gas-backend/Código.js'), 'utf8'), ctxGas);
const { celulaTexto } = ctxGas;

let falhas = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); falhas++; }
}
function igual(atual, esperado, oque) {
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}

console.log('\n--- JSONP: montagem da query string ---');

// A regressão do relato: fuso não capturado chegando como `null` na planilha.
check('null não vira a string "null" — a chave sai do payload', () => {
    igual(buildQueryString({ timezone: null }), '', 'timezone nulo');
    igual(buildQueryString({ cid: '123', timezone: null }), 'cid=123', 'nulo no meio de campos válidos');
});

// A metade cara: na edição, "undefined" passaria pelo teste de preservação do
// backend e sobrescreveria o valor guardado.
check('undefined não vira a string "undefined" — a chave sai do payload', () => {
    igual(buildQueryString({ advName: undefined }), '', 'undefined sozinho');
    igual(buildQueryString({ id: 'bau_1', advName: undefined }), 'id=bau_1', 'undefined no meio');
});

// String vazia é INSTRUÇÃO, não ausência: o fluxo de descarte zera taskType e
// availability de propósito. Se o filtro comesse "" junto, o descarte pararia
// de limpar esses campos e ninguém veria.
check('string vazia continua sendo enviada (o descarte zera campos de propósito)', () => {
    igual(buildQueryString({ taskType: '', availability: '' }), 'taskType=&availability=', 'campos zerados');
});

check('zero e false sobrevivem (são valores, não ausência)', () => {
    igual(buildQueryString({ n: 0, b: false }), 'n=0&b=false', 'falsy que não é ausência');
});

check('escapa o que precisa ser escapado', () => {
    igual(buildQueryString({ q: 'a b&c=d' }), 'q=a%20b%26c%3Dd', 'valor com separadores');
    igual(buildQueryString({ 'a b': 'x' }), 'a%20b=x', 'chave com espaço');
});

check('payload vazio devolve string vazia, sem "&" solto', () => {
    igual(buildQueryString({}), '', 'objeto vazio');
    igual(buildQueryString(), '', 'sem argumento');
});

// O caso real: um payload de escalação BAU onde a raspagem falhou em dois
// campos. Nenhum "null" pode sobrar na URL.
check('payload BAU com capturas falhas não carrega nenhum literal null', () => {
    const qs = buildQueryString({
        caseId: '9-111', cid: '123-456-7890', advName: 'Acme',
        timezone: null,        // lerCampo não achou o rótulo
        advPhone: null,        // unmask não materializou o valor
        language: 'PT-BR',
    });
    if (/null|undefined/.test(qs)) throw new Error('literal na query: ' + qs);
    igual(qs, 'caseId=9-111&cid=123-456-7890&advName=Acme&language=PT-BR', 'query final');
});

console.log('\n--- Planilha: linhas gravadas antes da correção ---');

// O caso que o TL relatou já está na planilha com o texto "null" na coluna 11.
// Consertar o transporte não o cura; esta é a metade que cura.
check('o literal "null" gravado vira vazio na leitura', () => {
    igual(celulaTexto('null'), '', 'timezone corrompido');
    igual(celulaTexto('undefined'), '', 'campo sobrescrito na edição');
    igual(celulaTexto('  null  '), '', 'com espaços em volta');
});

check('célula de verdade passa intacta', () => {
    igual(celulaTexto('Brazil/East'), 'Brazil/East', 'fuso válido');
    igual(celulaTexto('PT-BR'), 'PT-BR', 'idioma');
    igual(celulaTexto(0), '0', 'número');
});

check('célula vazia continua vazia, sem virar texto', () => {
    igual(celulaTexto(''), '', 'string vazia');
    igual(celulaTexto(null), '', 'null de verdade');
    igual(celulaTexto(undefined), '', 'undefined de verdade');
});

// "Nullable" contém "null" mas é um valor legítimo — o teste é de igualdade,
// não de substring, e este caso é o que impede alguém de "melhorar" para replace().
check('valor que apenas CONTÉM "null" não é apagado', () => {
    igual(celulaTexto('Nullable Corp'), 'Nullable Corp', 'nome de anunciante');
});

console.log('\n' + (falhas ? '✗' : '✓') + ` ${falhas} falhas\n`);
process.exit(falhas ? 1 : 0);
