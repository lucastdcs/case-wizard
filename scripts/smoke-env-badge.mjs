// scripts/smoke-env-badge.mjs
//
// Smoke da marca de ambiente no bookmarklet, no navegador de verdade.
//
// A regra que isto protege é assimétrica e fácil de quebrar sem perceber: em
// DESENVOLVIMENTO a pílula mostra um selo âmbar; em PRODUÇÃO o elemento não
// deve nem existir no DOM. Um teste que só verificasse "o selo aparece em dev"
// passaria feliz com um selo que aparece nos dois — que é justamente o defeito
// que tornaria a marca inútil.
//
// Também confere o bloco Configurações → Diagnóstico, que é o contrapeso da
// decisão de não marcar produção: lá o ambiente aparece SEMPRE, para que
// "estou em produção" seja confirmação positiva e não ausência de badge.
//
// O sufixo da implantação é comparado com o ID esperado de cada ambiente: é
// ele que prova a separação, e é ele que o agente compara com o do dashboard.
//
// Uso: npm run smoke:env-badge

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// Os IDs saem do próprio data-service.js: fixá-los aqui faria o teste continuar
// verde depois de uma rotação de implantação que esquecesse algum arquivo.
const dataService = await readFile(resolve(raiz, 'src/modules/shared/data-service.js'), 'utf8');
function idDe(env) {
    const m = dataService.match(new RegExp(`${env}:\\s*"([^"]+)"`));
    if (!m) throw new Error(`não achei o deployment de ${env} em data-service.js`);
    return m[1];
}
const ESPERADO = {
    production: idDe('production').slice(-6),
    development: idDe('development').slice(-6),
};

async function bundleDe(env) {
    const out = await build({
        entryPoints: [resolve(raiz, 'src/app.js')],
        bundle: true,
        write: false,
        logLevel: 'silent',
        define: { __CW_BUILD_ENV__: JSON.stringify(env) },
    });
    return out.outputFiles[0].text;
}

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}

const browser = await chromium.launch({ headless: true });

async function abrirApp(env) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    // A API real não responde daqui; cortar na origem evita 15s de watchdog por
    // chamada e deixa o app no caminho "sem nuvem", que é o que interessa aqui.
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });

    const logs = [];
    page.on('console', (m) => logs.push(m.text()));

    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate(() => {
        localStorage.setItem('cw_onboarding_seen_v1', 'true');
    });
    await page.addScriptTag({ content: await bundleDe(env) });

    // A pílula só termina de chegar depois da animação de boot.
    await page.waitForSelector('#cw-btn-configs', { state: 'attached', timeout: 30000 });
    await page.waitForTimeout(12000);

    const dialog = page.locator('#cw-conf-cancel');
    if (await dialog.isVisible().catch(() => false)) await dialog.click();

    return { page, logs };
}

// Configurações é aberto pelo Ctrl+K, e não clicando o ícone: com a pílula
// colapsada (o estado em que ela passa a maior parte do tempo) os botões
// existem no DOM mas não são clicáveis. É também o caminho que o agente usa.
async function abrirConfiguracoes(page) {
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 8000 });
    await page.keyboard.type('config', { delay: 20 });
    await page.waitForTimeout(400);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.cw-env-chip', { timeout: 8000 });
}

console.log('\n--- Smoke: marca de ambiente (dev vs prod) ---');

// ------------------------------------------------------------ desenvolvimento
{
    const { page, logs } = await abrirApp('development');

    await check('dev: a pílula mostra o selo', async () => {
        igual(await page.locator('#cw-env-tag').count(), 1, 'nós #cw-env-tag');
        igual((await page.locator('#cw-env-tag').textContent()).trim(), 'Dev', 'rótulo');
    });

    await check('dev: o selo é âmbar, não vermelho de erro', async () => {
        const cor = await page.evaluate(() =>
            getComputedStyle(document.querySelector('#cw-env-tag')).backgroundColor);
        igual(cor, 'rgb(242, 153, 0)', 'cor de fundo');
    });

    // O estado que mais importa: a pílula passa a maior parte do tempo
    // colapsada, e é aí que o selo escrito não cabe. Sem o anel, a marca
    // desapareceria justamente quando o agente está trabalhando.
    await check('dev: a pílula COLAPSADA carrega o anel âmbar', async () => {
        const r = await page.evaluate(() => {
            const p = document.querySelector('.cw-pill');
            return {
                colapsada: p.classList.contains('collapsed'),
                marcada: p.classList.contains('cw-env-dev'),
                sombra: getComputedStyle(p).boxShadow,
            };
        });
        if (!r.colapsada) throw new Error('a pílula não estava colapsada neste ponto do teste');
        if (!r.marcada) throw new Error('classe cw-env-dev ausente');
        if (!r.sombra.includes('242, 153, 0')) throw new Error('anel âmbar ausente: ' + r.sombra);
    });

    await check('dev: o title do selo traz o sufixo da implantação de dev', async () => {
        const t = await page.locator('#cw-env-tag').getAttribute('title');
        if (!t.includes(ESPERADO.development)) {
            throw new Error(`title "${t}" não contém …${ESPERADO.development}`);
        }
    });

    await check('dev: o console anuncia o ambiente e a implantação', async () => {
        const linha = logs.find((l) => l.includes('[Case Wizard] backend:'));
        if (!linha) throw new Error('nenhum log de backend: ' + JSON.stringify(logs.slice(0, 5)));
        if (!linha.includes('development')) throw new Error('log: ' + linha);
        if (!linha.includes(ESPERADO.development)) throw new Error('log sem o sufixo: ' + linha);
    });

    await check('dev: Configurações → Diagnóstico mostra DEV e o sufixo certo', async () => {
        await abrirConfiguracoes(page);
        const txt = (await page.locator('.cw-env-chip').textContent()).trim();
        if (!txt.startsWith('DEV')) throw new Error('chip: ' + txt);
        if (!txt.includes(ESPERADO.development)) throw new Error('chip sem o sufixo: ' + txt);
        const cls = await page.locator('.cw-env-chip').getAttribute('class');
        if (!cls.includes('is-dev')) throw new Error('classe: ' + cls);
    });

    await page.close();
}

// -------------------------------------------------------------------- produção
{
    const { page, logs } = await abrirApp('production');

    // A checagem central deste arquivo.
    await check('prod: o selo NÃO existe no DOM (não basta estar invisível)', async () => {
        igual(await page.locator('#cw-env-tag').count(), 0, 'nós #cw-env-tag');
    });

    await check('prod: a pílula não recebe nem a classe nem o anel', async () => {
        const r = await page.evaluate(() => {
            const p = document.querySelector('.cw-pill');
            return { marcada: p.classList.contains('cw-env-dev'), sombra: getComputedStyle(p).boxShadow };
        });
        if (r.marcada) throw new Error('classe cw-env-dev presente em produção');
        if (r.sombra.includes('242, 153, 0')) throw new Error('anel âmbar em produção: ' + r.sombra);
    });

    await check('prod: o console ainda permite confirmar o ambiente', async () => {
        const linha = logs.find((l) => l.includes('[Case Wizard] backend:'));
        if (!linha) throw new Error('nenhum log de backend');
        if (!linha.includes('production')) throw new Error('log: ' + linha);
        if (!linha.includes(ESPERADO.production)) throw new Error('log sem o sufixo: ' + linha);
    });

    // Sem selo na pílula, este bloco é a única confirmação visual de produção -
    // por isso ele precisa estar lá mesmo (e não só em dev).
    await check('prod: Configurações → Diagnóstico mostra PROD e o sufixo certo', async () => {
        await abrirConfiguracoes(page);
        const txt = (await page.locator('.cw-env-chip').textContent()).trim();
        if (!txt.startsWith('PROD')) throw new Error('chip: ' + txt);
        if (!txt.includes(ESPERADO.production)) throw new Error('chip sem o sufixo: ' + txt);
        const cls = await page.locator('.cw-env-chip').getAttribute('class');
        if (!cls.includes('is-prod')) throw new Error('classe: ' + cls);
    });

    await check('prod e dev mostram sufixos DIFERENTES', async () => {
        if (ESPERADO.production === ESPERADO.development) {
            throw new Error('os dois ambientes apontam para a mesma implantação — a separação não existe');
        }
    });

    await page.close();
}

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
