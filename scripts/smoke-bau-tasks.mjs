// scripts/smoke-bau-tasks.mjs
//
// Smoke da grade de tasks do formulário BAU, no navegador, sobre o mock-crm.html.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O form BAU oferecia uma lista de tasks PRÓPRIA, escrita à mão no
// bau-form-config.js. Ela e o catálogo da Central divergiram em silêncio: nomes
// diferentes para a mesma task, opções que a Central nunca conheceu, e uma task
// publicada que o form nunca ofereceu. Nada disso quebra nada — só produz uma
// coluna Task_BAU com vocabulário que o resto do sistema não reconhece.
//
// O `test:tasks` prova que bauTaskOptions() segue o TASKS_DB. Não prova o que
// importa para o agente: que a GRADE muda. E aqui há a mesma armadilha de tempo
// do seletor de tasks da nota — a grade é montada no boot, a partir do catálogo
// embutido, ANTES de a rede responder.
//
// O QUE ELE PROVA
//   - a grade nasce com os nomes do cache, não com a lista antiga do código;
//   - nome é tudo que o form consome: nenhum rótulo de screenshot vaza para lá;
//   - quando o servidor responde no meio do preenchimento, a grade passa a
//     oferecer o catálogo novo E o que o agente já marcou continua marcado;
//   - abrir um caso gravado com uma task que saiu do catálogo não apaga essa
//     task em silêncio — ela volta para a grade, marcada.
//
// Uso: npm run smoke:bau-tasks

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

// O catálogo do CACHE: o primeiro render do dia. Os nomes são deliberadamente
// diferentes dos embutidos — é assim que se prova que a grade leu a Central, e
// não o código.
const DO_CACHE = [
    item('gtm_installation', {
        name: 'GTM Installation do cache',
        popular: true,
        screenshots: { implementation: ['Evidência que não pode aparecer na grade'], education: [] },
    }),
    item('sme_task_nova', {
        name: 'Task criada pelo SME',
        screenshots: { implementation: ['Print do painel novo'] },
    }, { sortOrder: 1 }),
];

// O que o SERVIDOR publica depois, com o agente já na tela: uma task a mais.
const DO_SERVIDOR = [
    item('gtm_installation', {
        name: 'GTM Installation do cache',
        popular: true,
        screenshots: { implementation: ['Evidência que não pode aparecer na grade'], education: [] },
    }),
    item('sme_task_nova', {
        name: 'Task criada pelo SME',
        screenshots: { implementation: ['Print do painel novo'] },
    }, { sortOrder: 1 }),
    item('publicada_agora', {
        name: 'Task publicada durante o atendimento',
        screenshots: { implementation: ['Print novo'] },
    }, { sortOrder: 2 }),
];

// Um caso PENDENTE já gravado, com uma task cujo nome saiu do catálogo. É o
// caso que o agente vai abrir para editar no fim do teste.
const CASO_PENDENTE = {
    id: 'row_7',
    status: 'PENDING_TL_CREATION',
    caseId: '1-234567890',
    cid: '123-456-7890',
    advName: 'Anunciante de Teste',
    advEmail: 'anunciante@exemplo.com',
    reason: 'Implementar o que ficou pendente',
    task: 'Nome antigo que não existe mais, Task criada pelo SME',
    date: new Date().toISOString(),
};

// O "servidor" só responde quando o teste manda. Amarrar a corrida a um relógio
// faria o teste passar ou falhar pela velocidade da máquina.
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

// Mesmo gancho dos outros smokes: num ambiente que já tem Chromium mas não o
// build exato que o Playwright fixa, é o que permite rodar em vez de pular.
const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const nomesDaGrade = () => page.locator('.bau-tasks-grid .bau-task-item span').allTextContents();
const marcadas = () => page.$$eval(
    '.bau-tasks-grid input:checked', (els) => els.map((e) => e.value)
);

await page.route('**script.google.com/**', async (route) => {
    const url = new URL(route.request().url());
    const op = url.searchParams.get('op');
    const callback = url.searchParams.get('callback');

    if (!callback) return route.abort();

    // O dashboard do agente responde na hora: a corrida que interessa é a do
    // conteúdo publicado, não a da lista de casos.
    if (op === 'read_agent_bau') {
        return route.fulfill({
            status: 200,
            contentType: 'text/javascript',
            body: `${callback}(${JSON.stringify({ status: 'success', cases: [CASO_PENDENTE] })});`,
        });
    }

    if (op !== 'content_public') return route.abort();

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

await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
await page.waitForTimeout(2500);

const dialogCancel = page.locator('#cw-conf-cancel');
if (await dialogCancel.isVisible().catch(() => false)) await dialogCancel.click();

console.log('\n--- Smoke: grade de tasks do form BAU ---');

await page.keyboard.press('Control+k');
await page.waitForSelector('.cw-palette-overlay.active', { timeout: 10000 });
await page.fill('.cw-palette-input', 'BAU Form');
await page.waitForTimeout(200);
await page.keyboard.press('Enter');

await page.waitForSelector('#bau-form-popup', { state: 'visible', timeout: 10000 });
await page.waitForTimeout(900);

// Leva o wizard até o passo das Tasks. A grade existe no DOM desde o boot, mas
// um teste que não a enxerga na tela não prova nada sobre o que o agente vê.
async function irAteAsTasks() {
    await page.click('#bau-new-case-btn');
    await page.waitForSelector('#bau-opt-full', { state: 'visible', timeout: 10000 });
    await page.click('#bau-opt-full');
    await page.waitForSelector('#bau-step-1', { state: 'visible', timeout: 10000 });

    // O passo 1 é raspado do CRM. A espera é para a raspagem terminar: ela é
    // assíncrona, sobrescreve o que o teste digitar antes, e é ela que decide
    // quais campos continuam na tela — um campo que veio do CRM some para dentro
    // do painel de destaques, e o "Avançar" também para de cobrá-lo.
    await page.waitForTimeout(1500);

    const preenchimentos = {
        advName: 'Anunciante de Teste',
        advEmail: 'anunciante@exemplo.com',
        cid: '123-456-7890',
        caseId: '1-234567890',
        seId: '987654321',
        amName: 'am@google.com',
        website: 'https://exemplo.com',
    };
    const pendentes = await page.$$eval('#bau-step-1 [name]', (els) => els
        .filter((e) => e.offsetParent !== null && e.tagName !== 'SELECT' && !String(e.value || '').trim())
        .map((e) => e.name));
    for (const nome of pendentes) {
        if (preenchimentos[nome]) await page.fill(`#bau-step-1 [name="${nome}"]`, preenchimentos[nome]);
    }

    await page.click('#bau-step-next-btn');
    await page.waitForSelector('#bau-step-2', { state: 'visible', timeout: 10000 });
    await page.waitForSelector('.bau-tasks-grid .bau-task-item', { state: 'visible', timeout: 10000 });
}

await irAteAsTasks();

await check('a grade nasce com o catálogo do cache, não com a lista do código', async () => {
    const nomes = await nomesDaGrade();
    igual(nomes, ['GTM Installation do cache', 'Task criada pelo SME'], 'nomes na grade');
});

await check('nenhum rótulo de screenshot vaza para o form', async () => {
    const texto = await page.locator('.bau-tasks-grid').innerText();
    verdade(!texto.includes('Evidência'), 'a grade mostrou texto de evidência: ' + texto);
    verdade(!texto.includes('Print'), 'a grade mostrou texto de print: ' + texto);
});

await check('o agente marca uma task', async () => {
    await page.locator('.bau-task-item', { hasText: 'Task criada pelo SME' }).click();
    igual(await marcadas(), ['Task criada pelo SME'], 'tasks marcadas');
});

liberarServidor();

await check('a publicação que chega no meio entra na grade sem desmarcar nada', async () => {
    await page.waitForFunction(
        () => document.querySelectorAll('.bau-tasks-grid .bau-task-item').length === 3,
        null, { timeout: 10000 }
    );
    igual(await nomesDaGrade(), [
        'GTM Installation do cache',
        'Task criada pelo SME',
        'Task publicada durante o atendimento',
    ], 'nomes na grade');
    igual(await marcadas(), ['Task criada pelo SME'], 'tasks marcadas');
});

await check('task que saiu do catálogo volta marcada ao editar um caso antigo', async () => {
    // O caso foi gravado quando a task tinha outro nome. Deixá-la cair fora da
    // grade apagaria em silêncio algo que o TL já leu no caso — e o agente só
    // descobriria ao reenviar.
    await page.click('#bau-form-back-btn');
    await page.waitForSelector('.bau-case-edit-btn', { timeout: 10000 });
    await page.click('.bau-case-edit-btn');

    // Editar pede confirmação ("você está na página certa?") antes de carregar.
    await page.waitForSelector('#cw-conf-ok', { state: 'visible', timeout: 10000 });
    await page.click('#cw-conf-ok');
    await page.waitForTimeout(2500);

    const grade = await page.$$eval('.bau-tasks-grid .bau-task-item', (itens) => itens.map((i) => ({
        nome: i.querySelector('span').textContent,
        marcada: i.querySelector('input').checked,
    })));
    igual(grade, [
        { nome: 'GTM Installation do cache', marcada: false },
        { nome: 'Task criada pelo SME', marcada: true },
        { nome: 'Task publicada durante o atendimento', marcada: false },
        { nome: 'Nome antigo que não existe mais', marcada: true },
    ], 'grade depois de abrir o caso antigo');
});

await check('a task fora de catálogo não sobra para o próximo caso', async () => {
    // Ela pertence ao caso antigo, não ao vocabulário do form: um caso NOVO tem
    // que abrir com o catálogo e nada mais.
    await page.click('#bau-form-back-btn');
    await page.waitForSelector('#bau-new-case-btn', { state: 'visible', timeout: 10000 });
    await irAteAsTasks();

    igual(await nomesDaGrade(), [
        'GTM Installation do cache',
        'Task criada pelo SME',
        'Task publicada durante o atendimento',
    ], 'nomes na grade');
    igual(await marcadas(), [], 'tasks marcadas');
});

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
