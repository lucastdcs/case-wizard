// scripts/smoke-precall-standalone.mjs
//
// Smoke do build avulso do Pre-call (ADR-0020): constrói dist/precall-standalone.js
// e dist/precall-bookmarklet.txt e confere, no que saiu e no navegador de verdade
// (mock-crm.html), as promessas de quem recebe só esse arquivo:
//
//   - o arquivo NÃO leva o endereço do backend nem os outros módulos, e nada sai
//     da página para o Apps Script;
//   - ao carregar, o formulário já abre sozinho, sem pílula, splash nem Ctrl+K;
//   - a captura e a nota são as do app completo;
//   - o favorito `javascript:` funciona de verdade (o parser de URL apaga `#`,
//     tabs e quebras de linha e percent-decodifica o resto);
//   - num CRM com Trusted Types obrigatório, o arquivo carrega e funciona.
//
// Uso: npm run smoke:precall-standalone   (CW_CHROMIUM=/caminho/do/chromium se precisar)
//      CW_SHOT_DIR=/tmp/x npm run smoke:precall-standalone   (salva capturas de tela)

import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

execFileSync(process.execPath, [resolve(here, 'build-precall-standalone.mjs')], { stdio: 'pipe' });
const codigo = readFileSync(resolve(raiz, 'dist/precall-standalone.js'), 'utf8');
const favorito = readFileSync(resolve(raiz, 'dist/precall-bookmarklet.txt'), 'utf8').trim();
const mock = readFileSync(resolve(raiz, 'mock-crm.html'), 'utf8');

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}

console.log('\n--- Build avulso do Pre-call: o que saiu ---');

await check('não leva o endereço do backend nem faz chamada a ele', () => {
    for (const marca of ['script.google.com', 'AKfycb', 'jsonpFetch', 'DEPLOYMENTS', 'logEvent']) {
        igual(codigo.includes(marca), false, `"${marca}" no arquivo`);
    }
});

await check('só entram os módulos do Pre-call e o que ele usa (nada de pílula, Ctrl+K, onboarding…)', () => {
    const entraram = [...codigo.matchAll(/^ {2}\/\/ (src\/\S+)$/gm)].map((m) => m[1]);
    const proibidos = ['command-center', 'command-palette', 'onboarding', 'changelog', 'am-resolver',
        'email-assistant', 'call-script', 'bau-form', 'broadcast', 'links', 'configs', 'timezone'];
    const intrusos = entraram.filter((f) => proibidos.some((p) => f.includes(p)));
    igual(intrusos, [], 'módulos que não deveriam estar no arquivo');
    igual(entraram.includes('src/modules/notes/precall/precall-checklist.js'), true, 'o próprio Pre-call');
});

await check('o favorito é uma linha só, sem os caracteres que um `javascript:` perde', () => {
    igual(favorito.startsWith('javascript:'), true, 'prefixo');
    const corpo = favorito.slice('javascript:'.length);
    igual(/[#\n\r\t]/.test(corpo), false, '# ou quebra de linha ou tab soltos');
    igual(/%(?![0-9A-F]{2})/.test(corpo), false, '% que não é escape');
    const decodificado = decodeURIComponent(corpo);
    igual(decodificado.includes('cw-precall-popup'), true, 'o código decodificado é o do formulário');
});

const executablePath = process.env.CW_CHROMIUM || undefined;
const shotDir = process.env.CW_SHOT_DIR || null;
const browser = await chromium.launch({ headless: true, executablePath });

const TASKS_HTML = `
    <cuf-form-field>
        <div class="form-label">Appointment tasks</div>
        <div debug-id="html-value">ads_conversion_tracking</div>
        <div debug-id="html-value">ga4_setup</div>
        <div debug-id="html-value">ads_conversion_tracking_troubleshooting</div>
    </cuf-form-field>
    <material-fab id="mock-note-fab"><i class="material-icons-extended">description</i></material-fab>`;

// O mesmo DOM do mock-crm.html mais o que o checklist lê (as tasks) e escreve (o
// gatilho do card de nota, como o CRM tem). As tasks entram no HTML servido, e
// não por innerHTML depois: o caso do Trusted Types recusaria o fixture antes de
// o arquivo sob teste sequer carregar.
const CRM_HTML = mock.replace('<div class="content">', '<div class="content">' + TASKS_HTML);

const prepararCrm = () => {
    document.getElementById('mock-note-fab').addEventListener('click', () => {
        const editor = document.createElement('div');
        editor.className = 'mock-note-editor';
        editor.style.cssText = 'position:fixed;left:-9999px;top:0';
        editor.contentEditable = 'true';
        document.body.appendChild(editor);
    });
};

async function abrirCrm({ locale = 'en-US', ui = null, csp = null } = {}) {
    const context = await browser.newContext({ locale, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    const pedidos = [];
    page.on('request', (r) => { if (/^https?:/.test(r.url())) pedidos.push(new URL(r.url()).hostname); });
    const erros = [];
    page.on('pageerror', (e) => { erros.push(e.message); fail++; console.log('  ! erro de página: ' + e.message); });
    await page.route('**/*', (route) => {
        if (route.request().url() !== 'https://crm.test/') return route.abort();
        return route.fulfill({ contentType: 'text/html', body: CRM_HTML, headers: csp ? { 'content-security-policy': csp } : {} });
    });
    await page.goto('https://crm.test/');
    await page.evaluate((ui) => { if (ui) localStorage.setItem('cw_ui_lang', ui); }, ui);
    await page.evaluate(prepararCrm);
    return { page, pedidos, erros };
}

const popup = (page) => page.locator('#cw-precall-popup');
const aberto = (page, timeout = 4000) => page.waitForSelector('#cw-precall-popup.open', { timeout });
const valor = (page, id) => page.locator('#cw-pc-' + id).inputValue();
async function esperarCaptura(page, n = 5) {
    await page.waitForFunction(
        (n) => document.querySelectorAll('#cw-precall-popup .cw-pc-field.is-auto').length === n,
        n, { timeout: 8000 },
    );
}

const TEXTO_ESPERADO = [
    'Pre-call checklist',
    'Duplicate Case: No',
    '360 Suite: No',
    'sGTM: Yes',
    'API: No',
    'Seller to be CCed: Yes',
    'Task(s) [copy&paste]: Ads Conversion Tracking, Analytics Set Up (GA4), Ads Conversion Tracking Troubleshooting',
    'Contact number: +55 11 98888-7777',
    'Email: customer@example.com',
    'Website URL: https://www.acme.com',
    'Website CMS: Custom',
    'Ads CID: 123-456-7890',
    'GA4 Measurement ID: None provided',
    'Special instructions: ligar às 14h',
    'Next steps: OOS',
    'Gerado pelo Cases Wizard',
].join('\n\n');

console.log('\n--- Build avulso do Pre-call: no navegador ---');

const { page, pedidos, erros } = await abrirCrm();

await check('ao carregar, o formulário abre sozinho (sem Ctrl+K nem pílula)', async () => {
    await page.evaluate(codigo);
    await aberto(page);
});

await check('não existe pílula, splash, nem outro módulo na página; só uma janela', async () => {
    igual(await page.evaluate(() => ({
        pilula: document.querySelectorAll('.cw-pill, [id^="cw-btn-"]').length,
        splash: document.querySelectorAll('.splash-container').length,
        paleta: document.querySelectorAll('.cw-palette-overlay').length,
        janelas: document.querySelectorAll('.cw-module-window').length,
        appCompleto: !!window.techSolInitialized,
    })), { pilula: 0, splash: 0, paleta: 0, janelas: 1, appCompleto: false }, 'o que há na página');
});

await check('captura: os cinco campos automáticos chegam preenchidos, como no app', async () => {
    await esperarCaptura(page);
    igual(await valor(page, 'tasks'), 'Ads Conversion Tracking, Analytics Set Up (GA4), Ads Conversion Tracking Troubleshooting', 'tasks');
    igual(await valor(page, 'contactNumber'), '+55 11 98888-7777', 'telefone');
    igual(await valor(page, 'email'), 'customer@example.com', 'e-mail');
    igual(await valor(page, 'websiteUrl'), 'https://www.acme.com', 'site');
    igual(await valor(page, 'adsCid'), '123-456-7890', 'CID');
});

if (shotDir) await page.screenshot({ path: resolve(shotDir, 'precall-avulso-aberto.png') });

await check('a interface segue o idioma do navegador (en-US → inglês)', async () => {
    igual(await popup(page).getByRole('button', { name: 'Insert into note' }).count(), 1, 'botão em inglês');
});

await check('Inserir põe no card de nota o MESMO bloco do app, em inglês', async () => {
    await page.selectOption('#cw-pc-duplicateCase', 'No');
    await page.selectOption('#cw-pc-suite360', 'No');
    await page.selectOption('#cw-pc-sgtm', 'Yes');
    await page.selectOption('#cw-pc-api', 'No');
    await page.selectOption('#cw-pc-sellerCc', 'Yes');
    await page.selectOption('#cw-pc-nextSteps', 'OOS');
    await page.fill('#cw-pc-websiteCms', 'Custom');
    await page.fill('#cw-pc-specialInstructions', 'ligar às 14h');
    await popup(page).getByRole('button', { name: 'Insert into note' }).click();
    await page.waitForFunction(() => document.querySelector('.mock-note-editor')?.innerText.includes('Next steps'), null, { timeout: 8000 });
    igual((await page.evaluate(() => document.querySelector('.mock-note-editor').innerText)).trim(), TEXTO_ESPERADO, 'texto da nota');
    await page.waitForFunction(() => !document.querySelector('#cw-precall-popup.open'), null, { timeout: 5000 });
});

await check('clicar no favorito de novo reabre a MESMA janela (sem duplicar janela nem estilos)', async () => {
    await page.evaluate(codigo);
    await aberto(page);
    igual(await page.evaluate(() => ({
        janelas: document.querySelectorAll('#cw-precall-popup').length,
        estilos: document.querySelectorAll('#cw-precall-styles').length,
    })), { janelas: 1, estilos: 1 }, 'janelas e estilos');
});

await check('clicar com a janela aberta, em OUTRO caso, relê a tela e zera o formulário', async () => {
    await esperarCaptura(page);
    await page.fill('#cw-pc-specialInstructions', 'instrução do caso ANTERIOR');
    await page.evaluate(() => {
        document.querySelector('home-data-item .data-pair-content').textContent = '987-654-3210';
    });
    await page.evaluate(codigo);
    await page.waitForFunction(() => document.getElementById('cw-pc-adsCid').value === '987-654-3210', null, { timeout: 8000 });
    igual(await valor(page, 'specialInstructions'), '', 'instrução do caso anterior');
    await aberto(page);
});

await check('o X e o Esc fecham a janela', async () => {
    await page.locator('#cw-precall-popup .cw-header-close').click();
    await page.waitForFunction(() => !document.querySelector('#cw-precall-popup.open'), null, { timeout: 5000 });
    await page.evaluate(codigo);
    await aberto(page);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#cw-precall-popup.open'), null, { timeout: 5000 });
});

await check('nada sai da página para o backend; só a fonte do Google é pedida', () => {
    igual([...new Set(pedidos)].filter((h) => h !== 'crm.test').sort(), ['fonts.googleapis.com'], 'hosts pedidos');
    igual(erros, [], 'erros de página');
});

await page.context().close();

console.log('\n--- Idioma da interface ---');

for (const [locale, ui, botao, rotulo] of [
    ['pt-BR', null, 'Inserir na nota', 'pt-BR → português'],
    ['es-ES', null, 'Insertar en la nota', 'es-ES → espanhol'],
    ['fr-FR', null, 'Inserir na nota', 'idioma sem tradução → português (o padrão)'],
    ['pt-BR', 'en', 'Insert into note', 'escolha manual salva (en) vence o idioma do navegador'],
]) {
    await check(rotulo, async () => {
        const crm = await abrirCrm({ locale, ui });
        await crm.page.evaluate(codigo);
        await aberto(crm.page);
        igual(await popup(crm.page).getByRole('button', { name: botao }).count(), 1, `botão "${botao}"`);
        await crm.page.context().close();
    });
}

console.log('\n--- O favorito `javascript:` de verdade ---');

await check('clicar no favorito abre o formulário já preenchido', async () => {
    const crm = await abrirCrm();
    await crm.page.evaluate((href) => {
        const a = document.createElement('a');
        a.id = 'favorito';
        a.href = href;
        a.textContent = 'Pre-call';
        document.body.appendChild(a);
    }, favorito);
    await crm.page.click('#favorito');
    await aberto(crm.page);
    await esperarCaptura(crm.page);
    igual(await valor(crm.page, 'adsCid'), '123-456-7890', 'CID capturado');
    igual(crm.erros, [], 'erros de página');
    await crm.page.context().close();
});

console.log('\n--- CRM com Trusted Types obrigatório ---');

await check('o arquivo carrega, abre e captura num CRM que exige Trusted Types', async () => {
    const crm = await abrirCrm({ csp: "require-trusted-types-for 'script'; trusted-types default" });
    igual(await crm.page.evaluate(() => {
        try { document.createElement('div').innerHTML = '<b>x</b>'; return 'aceitou'; } catch (e) { return 'recusou'; }
    }), 'recusou', 'a página realmente exige Trusted Types antes do arquivo');
    await crm.page.evaluate(codigo);
    await aberto(crm.page);
    await esperarCaptura(crm.page);
    igual(crm.erros, [], 'erros de página');
    if (shotDir) await crm.page.screenshot({ path: resolve(shotDir, 'precall-avulso-trusted-types.png') });
    await crm.page.context().close();
});

console.log('\n--- Com o app completo na página ---');

await check('o favorito não abre uma segunda janela: chama o Pre-call do app', async () => {
    const crm = await abrirCrm();
    await crm.page.evaluate(() => {
        window.techSolInitialized = true;
        const botao = document.createElement('button');
        botao.id = 'cw-btn-precall';
        botao.addEventListener('click', () => { window.__precallDoApp = true; });
        document.body.appendChild(botao);
    });
    await crm.page.evaluate(codigo);
    igual(await crm.page.evaluate(() => window.__precallDoApp === true), true, 'botão do app acionado');
    igual(await crm.page.locator('#cw-precall-popup').count(), 0, 'janela do avulso');
    await crm.page.context().close();
});

await browser.close();
console.log(fail ? `\n✗ ${fail} falha(s)` : '\n✓ 0 falhas');
process.exit(fail ? 1 : 0);
