// scripts/smoke-tasks.mjs
//
// Smoke do catálogo de tasks publicado, no navegador de verdade, sobre o
// mock-crm.html.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O `test:tasks` prova que o serviço reescreve o TASKS_DB certo. Não prova o que
// importa para o agente: que a TELA muda. E aqui há uma armadilha real de tempo —
// o seletor de tasks é montado no boot, a partir do catálogo embutido, ANTES de a
// rede responder. Sem `refreshCatalog()`, tudo continua verde nos testes de
// unidade e o agente segue vendo o catálogo antigo até recarregar a página.
//
// Os dois momentos são exercitados de verdade: o cache do localStorage, que chega
// na hora e é o primeiro render de todo dia, e a resposta do servidor, servida por
// um dublê de JSONP COM ATRASO — que é onde vive a corrida entre "o agente já
// marcou uma task" e "o conteúdo novo acabou de chegar".
//
// O QUE ELE PROVA
//   - o cache repinta o "Acesso rápido" antes de a rede responder;
//   - uma task que só existe na Central aparece na busca do catálogo;
//   - os campos de evidência usam os rótulos publicados, na ordem publicada;
//   - quando o servidor responde no meio do trabalho, a task que o agente já
//     marcou continua marcada E passa a pedir a lista nova de evidências.
//
// Uso: npm run smoke:tasks

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

const bundle = await build({
    entryPoints: [resolve(raiz, 'src/app.js')],
    bundle: true,
    write: false,
    logLevel: 'silent',
});
const script = bundle.outputFiles[0].text;

const item = (key, valor, over) => Object.assign({
    id: 'itm_' + key, key: key, field: '', lang: 'ALL',
    label: valor.name, sortOrder: 0, value: JSON.stringify(valor),
}, over || {});

// O que está no CACHE: o primeiro render do dia. Diferente do embutido de
// propósito, e nos três eixos que a tela mostra — nome, lista de evidências e
// existência da task.
const DO_CACHE = [
    item('ads_conversion_tracking', {
        name: 'Ads Conversion Tracking 2026',
        popular: true,
        screenshots: {
            implementation: ['Evidência do cache A', 'Evidência do cache B', 'Evidência do cache C'],
            education: [],
        },
        screenshots_es: { implementation: ['Evidencia del caché A', '', ''] },
    }),
    item('sme_task_nova', {
        name: 'Task criada pelo SME',
        popular: false,
        screenshots: { implementation: ['Print do painel novo'] },
    }, { sortOrder: 1 }),
];

// O que o SERVIDOR devolve depois — a publicação que aconteceu enquanto o agente
// já estava com a nota aberta. Mesma chave, lista de evidências menor.
const DO_SERVIDOR = [
    item('ads_conversion_tracking', {
        name: 'Ads Conversion Tracking 2026',
        popular: true,
        screenshots: { implementation: ['Só uma evidência agora'], education: [] },
    }),
    item('sme_task_nova', {
        name: 'Task criada pelo SME',
        popular: false,
        screenshots: { implementation: ['Print do painel novo'] },
    }, { sortOrder: 1 }),
];

// O "servidor" só responde quando o teste manda — e não depois de N segundos.
// A corrida que se quer exercitar é "a resposta chega DEPOIS de o agente marcar a
// task"; amarrar isso a um relógio faz o teste passar ou falhar pela velocidade da
// máquina, que é a definição de teste instável.
let liberarServidor;
const servidorLiberado = new Promise((r) => { liberarServidor = r; });

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function verdade(cond, oque) { if (!cond) throw new Error(oque); }
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque}: esperado ${b}, veio ${a}`);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Dublê de JSONP. A resposta real é um `<script>` que CHAMA a função de callback
// cujo nome vem na URL — servir isso aqui é o que permite testar a chegada do
// conteúdo pela rede, e não só pelo cache.
//
// Só `op=content_public` é atendido; todo o resto é cortado, que é o caminho "sem
// nuvem" que o app precisa continuar suportando.
await page.route('**script.google.com/**', async (route) => {
    const url = new URL(route.request().url());
    const op = url.searchParams.get('op');
    const callback = url.searchParams.get('callback');

    if (op !== 'content_public' || !callback) return route.abort();

    const pedidos = (url.searchParams.get('modules') || url.searchParams.get('module') || '')
        .split(',').filter(Boolean);

    const modules = {};
    pedidos.forEach((m) => { modules[m] = m === 'task_screenshots' ? DO_SERVIDOR : []; });

    const corpo = url.searchParams.get('modules')
        ? { status: 'success', modules: modules }
        : { status: 'success', items: modules[pedidos[0]] || [] };

    await servidorLiberado;
    await route.fulfill({
        status: 200,
        contentType: 'text/javascript',
        body: `${callback}(${JSON.stringify(corpo)});`,
    });
});

page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });

await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
await page.evaluate((itens) => {
    localStorage.setItem('cw_onboarding_seen_v1', 'true');
    localStorage.setItem('cw_content_task_screenshots', JSON.stringify(itens));
}, DO_CACHE);

await page.addScriptTag({ content: script });

// O Ctrl+K é registrado no document já na inicialização, e é por ele que este
// teste abre o módulo — o mesmo caminho que o smoke dos atalhos usa. Clicar na
// pílula dependeria de a animação de docking ter terminado (~11s), que é tempo de
// animação e não comportamento.
//
// A espera é curta de propósito: a resposta do "servidor" fica presa até o teste
// liberá-la, e o `jsonpFetch` tem um watchdog de 15s. Passar desse tempo faria a
// requisição ser abandonada, e o teste exercitaria o caminho do timeout achando
// que exercita o da rede.
await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
await page.waitForTimeout(2500);

const dialogCancel = page.locator('#cw-conf-cancel');
if (await dialogCancel.isVisible().catch(() => false)) await dialogCancel.click();

console.log('\n--- Smoke: catálogo de tasks publicado ---');

await page.keyboard.press('Control+k');
await page.waitForSelector('.cw-palette-overlay.active', { timeout: 10000 });
await page.fill('.cw-palette-input', 'Case Notes');
await page.waitForTimeout(200);
await page.keyboard.press('Enter');

await page.waitForSelector('#main-status-select', { timeout: 10000 });
// Espera o voo do genie terminar: mexer nos campos durante a animação é instável.
await page.waitForTimeout(900);

// SO_* é onde o seletor de tasks aparece (ver onSubStatusChange).
await page.selectOption('#main-status-select', 'SO');
await page.waitForTimeout(200);
await page.selectOption('#sub-status-select', 'SO_Implementation_Only');
await page.waitForTimeout(400);

await check('o cache já repinta o "Acesso rápido", sem esperar a rede', async () => {
    const rotulos = await page.locator('.cw-hero-card .cw-hero-label').allTextContents();
    verdade(rotulos.includes('Ads Conversion Tracking 2026'),
        'o nome publicado deveria estar no Acesso rápido: ' + JSON.stringify(rotulos));
    verdade(!rotulos.includes('Ads Conversion Tracking'),
        'o nome embutido não deveria mais aparecer: ' + JSON.stringify(rotulos));
});

await check('o catálogo é SUBSTITUÍDO pelo publicado, não somado a ele', async () => {
    // O embutido tem 13 tasks; o publicado, 2. Se a reescrita tivesse somado, a
    // tela mostraria as duas listas e ninguém notaria.
    const heros = await page.locator('.cw-hero-card').count();
    const lista = await page.locator('.cw-acc-body .cw-task-item').count();
    igual({ heros, lista }, { heros: 1, lista: 1 }, 'cartões no Acesso rápido e linhas no catálogo');
});

await check('uma task que só existe na Central aparece na busca', async () => {
    await page.fill('.cw-search-input', 'SME');
    await page.waitForTimeout(250);
    const achados = await page.locator('.cw-results-container .cw-task-label').allTextContents();
    igual(achados, ['Task criada pelo SME'], 'resultados da busca');
    await page.fill('.cw-search-input', '');
    await page.waitForTimeout(250);
});

await check('os campos de evidência usam os rótulos publicados, na ordem', async () => {
    await page.click('.cw-hero-card');
    await page.waitForTimeout(400);

    const labels = await page.locator('.cw-screen-card .cw-input-label').allTextContents();
    igual(labels, ['Evidência do cache A', 'Evidência do cache B', 'Evidência do cache C'],
        'legendas dos campos de link');
});

await check('conteúdo que chega no meio do trabalho não perde a seleção nem a lista', async () => {
    // A corrida: a task está marcada quando a resposta do servidor chega. Perder a
    // seleção seria ruim; manter a lista ANTIGA no cartão seria pior — é evidência
    // errada colada na nota.
    liberarServidor();

    await page.waitForFunction(
        () => document.querySelectorAll('.cw-screen-card .cw-input-label').length === 1,
        null,
        { timeout: 20000 }
    );

    const marcados = await page.locator('.cw-hero-card.active').count();
    igual(marcados, 1, 'a task marcada deveria continuar marcada');

    const labels = await page.locator('.cw-screen-card .cw-input-label').allTextContents();
    igual(labels, ['Só uma evidência agora'], 'legendas depois da publicação nova');
});

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke de tasks: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
