// scripts/test-pill-layout.mjs
//
// Prova as regras do layout da pílula (fixados x gaveta) - as que quebram em
// silêncio. Uma pílula com módulo duplicado, faltando ou acima do teto não dá
// erro nenhum: só aparece como um ícone a mais ou a menos na tela do agente.
//
// Os riscos centrais:
//  - um blob estranho na nuvem (ou um módulo lançado depois do layout salvo)
//    nunca pode deixar um módulo inalcançável nem derrubar a pílula;
//  - o teto de fixados (MAX_PINNED) é o que impede a pílula de voltar a passar
//    da altura da tela;
//  - arrastar tem de refletir na hora: o ouvinte é avisado ANTES da nuvem
//    responder, senão a tela espera um JSONP de até 15s.
//
// Uso: npm run test:pill-layout

import { build } from 'esbuild';
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

// A nuvem e a identidade são trocadas por falsas no próprio bundle, para o
// teste controlar quando o JSONP "responde".
const stubs = {
    name: 'stubs',
    setup(b) {
        b.onLoad({ filter: /data-service\.js$/ }, () => ({
            contents: `export const DataService = {
                saveUserPrefs: (prefs, user) => globalThis.__nuvem.salvar(prefs, user),
                getUserPrefs: (user) => globalThis.__nuvem.ler(user),
            };`,
            loader: 'js',
        }));
        b.onLoad({ filter: /page-data\.js$/ }, () => ({
            contents: `export const getAgentEmail = () => globalThis.__email;`,
            loader: 'js',
        }));
    },
};

const bundle = await build({
    entryPoints: [resolve(here, '../src/modules/shared/pill-layout.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
    plugins: [stubs],
});
const mod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', bundle.outputFiles[0].text)(mod, mod.exports, require);
const {
    PILL_MODULE_IDS, MAX_PINNED, DEFAULT_LAYOUT,
    resolveLayout, moveModule, moduleLabel, PillLayoutService,
} = mod.exports;

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
async function checkAsync(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}
// Apaga o cache por FORA do serviço, o que deixa o "último layout avisado" dele
// desatualizado: um move() que reproduza esse layout velho não seria visto como
// mudança. O refresh() final re-baseia o serviço, como a sincronia faz no app.
function limpar() {
    delete store['cw_user_prefs_v1'];
    delete store['cw_user_prefs_pending_v1'];
    globalThis.__email = undefined;
    if (PillLayoutService) PillLayoutService.refresh();
}
// Todo módulo do catálogo aparece uma vez, em exatamente uma das duas listas.
function cobreOCatalogo(layout) {
    const todos = [...layout.pinned, ...layout.drawer];
    igual([...todos].sort(), [...PILL_MODULE_IDS].sort(), 'união das listas');
}

console.log('\n--- Layout da pílula ---');

// ----------------------------------------------------------------
//  Invariantes do catálogo
// ----------------------------------------------------------------
check('o catálogo tem mais módulos que o teto: a gaveta nunca fica vazia', () => {
    // Se isto virar falso, o botão Mais passaria a abrir uma gaveta vazia e a
    // pílula teria de saber esconder o botão - código que hoje não existe.
    if (PILL_MODULE_IDS.length <= MAX_PINNED) {
        throw new Error(`catálogo ${PILL_MODULE_IDS.length} <= teto ${MAX_PINNED}`);
    }
});

check('o layout padrão cobre o catálogo e respeita o teto', () => {
    cobreOCatalogo(DEFAULT_LAYOUT);
    if (DEFAULT_LAYOUT.pinned.length > MAX_PINNED) throw new Error('padrão passa do teto');
});

check('todo módulo tem nome nos três idiomas', () => {
    for (const id of PILL_MODULE_IDS) {
        for (const lang of ['pt', 'es', 'en']) {
            const nome = moduleLabel(id, lang);
            if (!nome || nome === id) throw new Error(`${id} sem nome em ${lang}`);
        }
    }
});

check('idioma desconhecido cai para PT; id desconhecido devolve o próprio id', () => {
    igual(moduleLabel('configs', 'fr'), 'Configurações', 'fallback PT');
    igual(moduleLabel('nao-existe', 'pt'), 'nao-existe', 'id desconhecido');
});

// ----------------------------------------------------------------
//  resolveLayout: tolerância ao que vier salvo
// ----------------------------------------------------------------
check('sem nada salvo (ou lixo) vale o padrão', () => {
    for (const lixo of [null, undefined, 'x', 42, [], {}, { pinned: 'notes', drawer: [] }, { pinned: [] }]) {
        igual(resolveLayout(lixo), DEFAULT_LAYOUT, `entrada ${JSON.stringify(lixo)}`);
    }
});

check('id desconhecido e id repetido são descartados', () => {
    const r = resolveLayout({
        pinned: ['notes', 'fantasma', 'notes', 'email'],
        drawer: ['email', 'configs', 'outro-fantasma'],
    });
    if (r.pinned.includes('fantasma') || r.drawer.includes('outro-fantasma')) throw new Error('fantasma sobreviveu');
    igual(r.pinned, ['notes', 'email'], 'pinned');
    // `email` já estava nos fixados: a primeira ocorrência vence.
    if (r.drawer.includes('email')) throw new Error('email duplicado na gaveta');
    cobreOCatalogo(r);
});

check('módulo que o layout salvo não conhece entra no FIM da gaveta, não na pílula', () => {
    // Simula uma release que acrescentou um módulo depois do agente salvar:
    // o layout dele tem só 3 ids.
    const r = resolveLayout({ pinned: ['notes'], drawer: ['configs', 'library'] });
    igual(r.pinned, ['notes'], 'a pílula do agente não é remexida');
    igual(r.drawer.slice(0, 2), ['configs', 'library'], 'a ordem dele na gaveta é mantida');
    cobreOCatalogo(r);
});

check('acima do teto, o excesso desce para o COMEÇO da gaveta', () => {
    const r = resolveLayout({ pinned: [...PILL_MODULE_IDS], drawer: [] });
    if (r.pinned.length !== MAX_PINNED) throw new Error(`pinned ${r.pinned.length}`);
    igual(r.drawer, PILL_MODULE_IDS.slice(MAX_PINNED), 'gaveta recebe o excesso, na ordem');
    cobreOCatalogo(r);
});

check('zero fixados é um layout válido (tudo na gaveta)', () => {
    const r = resolveLayout({ pinned: [], drawer: [...PILL_MODULE_IDS] });
    igual(r.pinned, [], 'pinned');
    cobreOCatalogo(r);
});

check('resolveLayout não altera o que recebeu', () => {
    const entrada = { pinned: ['notes', 'fantasma'], drawer: ['configs'] };
    const copia = JSON.stringify(entrada);
    resolveLayout(entrada);
    igual(JSON.stringify(entrada), copia, 'entrada');
    // E o padrão devolvido não pode ser a mesma referência: quem muta o
    // resultado não pode estragar DEFAULT_LAYOUT.
    const r = resolveLayout(null);
    r.pinned.push('x');
    igual(DEFAULT_LAYOUT.pinned.includes('x'), false, 'DEFAULT_LAYOUT intacto');
});

// ----------------------------------------------------------------
//  moveModule
// ----------------------------------------------------------------
check('reordena dentro dos fixados', () => {
    const r = moveModule(DEFAULT_LAYOUT, 'links', 'pinned', 0);
    igual(r.layout.pinned[0], 'links', 'links na frente');
    igual(r.layout.pinned.length, DEFAULT_LAYOUT.pinned.length, 'mesma quantidade');
    cobreOCatalogo(r.layout);
});

check('manda um fixado para a gaveta e traz de volta', () => {
    const ida = moveModule(DEFAULT_LAYOUT, 'email', 'drawer', 0);
    igual(ida.layout.drawer[0], 'email', 'email no começo da gaveta');
    if (ida.layout.pinned.includes('email')) throw new Error('email ficou nos dois lados');

    const volta = moveModule(ida.layout, 'email', 'pinned', 99);
    igual(volta.layout.pinned.at(-1), 'email', 'índice acima do fim cai no fim');
    cobreOCatalogo(volta.layout);
});

check('com a pílula cheia, trazer da gaveta é recusado e nada muda', () => {
    const cheio = resolveLayout({ pinned: PILL_MODULE_IDS.slice(0, MAX_PINNED), drawer: PILL_MODULE_IDS.slice(MAX_PINNED) });
    const antes = JSON.stringify(cheio);
    const r = moveModule(cheio, cheio.drawer[0], 'pinned', 0);
    igual(r.ok, false, 'ok');
    igual(r.reason, 'full', 'motivo');
    igual(JSON.stringify(cheio), antes, 'layout original');
});

check('com a pílula cheia, reordenar dentro dela continua permitido', () => {
    // Regra fácil de errar: contar o item que já está lá e recusar a troca de lugar.
    const cheio = resolveLayout({ pinned: PILL_MODULE_IDS.slice(0, MAX_PINNED), drawer: PILL_MODULE_IDS.slice(MAX_PINNED) });
    const r = moveModule(cheio, cheio.pinned[0], 'pinned', MAX_PINNED);
    igual(r.ok, true, 'ok');
    igual(r.layout.pinned.at(-1), cheio.pinned[0], 'foi para o fim');
});

check('id ou lista desconhecidos são recusados; índice inválido vai para o fim', () => {
    igual(moveModule(DEFAULT_LAYOUT, 'fantasma', 'pinned', 0).reason, 'unknown', 'id');
    igual(moveModule(DEFAULT_LAYOUT, 'notes', 'outra', 0).reason, 'unknown', 'lista');
    const r = moveModule(DEFAULT_LAYOUT, 'library', 'drawer', NaN);
    igual(r.layout.drawer.at(-1), 'library', 'NaN vai para o fim');
    const neg = moveModule(DEFAULT_LAYOUT, 'library', 'drawer', -5);
    igual(neg.layout.drawer[0], 'library', 'negativo vai para o começo');
});

check('moveModule não altera o layout de entrada', () => {
    const antes = JSON.stringify(DEFAULT_LAYOUT);
    moveModule(DEFAULT_LAYOUT, 'notes', 'drawer', 0);
    igual(JSON.stringify(DEFAULT_LAYOUT), antes, 'DEFAULT_LAYOUT');
});

// ----------------------------------------------------------------
//  Serviço: persistência, aviso e sincronia
// ----------------------------------------------------------------
limpar();

await checkAsync('sem nada salvo o serviço devolve o padrão', async () => {
    igual(PillLayoutService.get(), DEFAULT_LAYOUT, 'get');
    igual(PillLayoutService.isFull(), PillLayoutService.get().pinned.length >= MAX_PINNED, 'isFull');
});

await checkAsync('mover grava no cache local e o ouvinte já enxerga o novo layout', async () => {
    limpar();
    const vistos = [];
    const sair = PillLayoutService.onChange((layout) => vistos.push({ layout, doServico: PillLayoutService.get() }));

    const recusado = PillLayoutService.move('library', 'pinned', 0);
    // A pílula do padrão já está no teto (7 fixados): é recusado, e nada deve
    // ter sido avisado.
    igual(recusado.ok, false, 'recusa devolve ok:false na hora');
    if (PillLayoutService.get().pinned.includes('library')) {
        throw new Error('library entrou numa pílula cheia');
    }
    igual(vistos.length, 0, 'recusa não avisa ninguém');

    const feito = PillLayoutService.move('email', 'drawer', 0);
    // Nada de await: decisão e aviso são síncronos, só a nuvem espera.
    igual(feito.ok, true, 'ok na hora');
    igual(vistos.length, 1, 'avisos');
    igual(vistos[0].layout, vistos[0].doServico, 'o que o ouvinte recebeu é o que get() devolve');
    if (!vistos[0].layout.drawer.includes('email')) throw new Error('email não foi para a gaveta');

    const salvo = JSON.parse(store['cw_user_prefs_v1']).pillLayout;
    igual(salvo.drawer[0], 'email', 'persistido no cache local');
    sair();
});

await checkAsync('o ouvinte é avisado ANTES da nuvem responder', async () => {
    limpar();
    globalThis.__email = 'agente@exemplo.com';
    let liberaNuvem;
    globalThis.__nuvem = {
        salvar: () => new Promise((ok) => { liberaNuvem = () => ok(true); }),
        ler: async () => ({}),
    };

    const ordem = [];
    const sair = PillLayoutService.onChange(() => ordem.push('ouvinte'));

    // Fixado -> gaveta: o padrão já está no teto, então o caminho contrário
    // seria recusado na hora e a nuvem nem entraria em jogo.
    const resultado = PillLayoutService.move('email', 'drawer', 0);
    igual(resultado.ok, true, 'decisão síncrona');
    igual(ordem, ['ouvinte'], 'ouvinte avisado antes de a função sequer retornar a promessa');
    const promessa = resultado.saved.then((r) => { ordem.push('nuvem-respondeu'); return r; });
    // Dá uma volta no event loop: a nuvem ainda NÃO respondeu.
    await new Promise((r) => setTimeout(r, 20));
    igual(ordem, ['ouvinte'], 'antes da nuvem');

    liberaNuvem();
    const confirmacao = await promessa;
    igual(ordem, ['ouvinte', 'nuvem-respondeu'], 'depois da nuvem');
    igual(confirmacao.synced, true, 'saved resolve com { synced }');
    sair();
    limpar();
});

await checkAsync('refresh só avisa quando a sincronia trouxe um layout diferente', async () => {
    limpar();
    let avisos = 0;
    const sair = PillLayoutService.onChange(() => { avisos++; });

    PillLayoutService.refresh();
    igual(avisos, 0, 'nada mudou');

    // A sincronia adotou o layout da nuvem (máquina nova): ela escreve direto
    // no cache local, sem passar por move().
    store['cw_user_prefs_v1'] = JSON.stringify({ pillLayout: { pinned: ['configs'], drawer: ['notes'] } });
    PillLayoutService.refresh();
    igual(avisos, 1, 'mudou uma vez');
    igual(PillLayoutService.get().pinned, ['configs'], 'layout adotado');

    PillLayoutService.refresh();
    igual(avisos, 1, 'sem nova mudança, sem novo aviso');
    sair();
});

await checkAsync('restaurar o padrão volta ao layout do código e avisa', async () => {
    limpar();
    let ultimo = null;
    const sair = PillLayoutService.onChange((l) => { ultimo = l; });
    PillLayoutService.move('email', 'drawer', 0);
    PillLayoutService.reset();
    igual(ultimo, DEFAULT_LAYOUT, 'ouvinte recebeu o padrão');
    igual(PillLayoutService.get(), DEFAULT_LAYOUT, 'get');
    sair();
});

await checkAsync('um ouvinte que lança não impede os outros', async () => {
    limpar();
    let chegou = false;
    const sair1 = PillLayoutService.onChange(() => { throw new Error('boom'); });
    const sair2 = PillLayoutService.onChange(() => { chegou = true; });
    const warn = console.warn; console.warn = () => { };
    try { PillLayoutService.move('email', 'drawer', 0); } finally { console.warn = warn; }
    igual(chegou, true, 'segundo ouvinte');
    sair1(); sair2();
});

limpar();
console.log('\n' + (fail ? '✗' : '✓') + ` layout da pílula: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
