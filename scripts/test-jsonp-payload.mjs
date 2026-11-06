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

// --- Erros que o agente lê num toast ---
//
// Os erros do servidor chegam com um `code` (BAU_API.js, erroComCodigo_) e o
// cliente mostra a mensagem do idioma da INTERFACE. O texto em português que o
// servidor manda é só o reserva: backend antigo (sem `code`) ou um código que o
// cliente não conhece. O módulo guarda o idioma em estado global, então cada
// idioma é uma cópia nova do bundle, importada com o seu localStorage.
console.log('\n--- Erros do servidor: traduzidos por código ---');

const tela = {};
for (const lang of ['pt', 'es', 'en']) {
    const store = { cw_ui_lang: lang };
    globalThis.localStorage = {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
    };
    console.log = () => {};
    tela[lang] = (await import(
        'data:text/javascript;base64,' + Buffer.from(outputFiles[0].text + `\n// idioma: ${lang}\n`).toString('base64')
    )).serverErrorMessage;
    console.log = logOriginal;
}

const ESPERADO_POR_CODIGO = {
    BAU_NOT_OWNER_EDIT: { pt: 'Acesso negado. Você só pode editar seus próprios casos.', es: 'Acceso denegado. Solo puedes editar tus propios casos.', en: 'Access denied. You can only edit your own cases.' },
    BAU_ALREADY_PROCESSED: { pt: 'Este caso já foi processado pelo TL e não pode mais ser alterado.', es: 'Este caso ya fue procesado por el TL y no se puede modificar.', en: 'This case has already been processed by the TL and can no longer be changed.' },
    BAU_NOT_FOUND: { pt: 'Caso não encontrado.', es: 'Caso no encontrado.', en: 'Case not found.' },
};
for (const [code, porIdioma] of Object.entries(ESPERADO_POR_CODIGO)) {
    check(`${code}: cada idioma lê o seu`, () => {
        for (const [lang, texto] of Object.entries(porIdioma)) {
            // O servidor sempre manda o texto em português junto; o código manda.
            igual(tela[lang]({ status: 'error', error: 'Error: texto em português do servidor', code }, 'BAU_SEND_FAILED'), texto, `${code} em ${lang}`);
        }
    });
}

check('a mensagem em português do PT é a de antes (nada mudou para quem já usava)', () => {
    // As mesmas frases que o servidor mandava, agora vindas do dicionário.
    igual(tela.pt({ code: 'BAU_NOT_FOUND' }, 'BAU_SEND_FAILED'), 'Caso não encontrado.', 'caso não encontrado');
    igual(tela.pt({}, 'BAU_SEND_FAILED'), 'Falha na operação BAU', 'reserva de envio');
    igual(tela.pt({}, 'BAU_UPDATE_FAILED'), 'Falha na atualização BAU', 'reserva de edição');
});

check('backend antigo (sem code) e código desconhecido mostram o texto do servidor', () => {
    for (const lang of ['pt', 'es', 'en']) {
        igual(tela[lang]({ status: 'error', error: 'Error: Caso não encontrado.' }, 'BAU_SEND_FAILED'), 'Error: Caso não encontrado.', `sem code em ${lang}`);
        igual(tela[lang]({ status: 'error', error: 'Error: algo novo', code: 'CODIGO_NOVO' }, 'BAU_SEND_FAILED'), 'Error: algo novo', `código desconhecido em ${lang}`);
    }
});

check('sem texto nem código, a mensagem de reserva da operação, no idioma', () => {
    igual(tela.en({}, 'BAU_SEND_FAILED'), 'BAU operation failed', 'envio em en');
    igual(tela.es({}, 'BAU_UPDATE_FAILED'), 'Falló la actualización BAU', 'edição em es');
    igual(tela.en(null, 'BAU_READ_FAILED'), 'Error returned by the read API', 'leitura em en, resposta nula');
});

console.log('\n' + (falhas ? '✗' : '✓') + ` ${falhas} falhas\n`);
process.exit(falhas ? 1 : 0);
