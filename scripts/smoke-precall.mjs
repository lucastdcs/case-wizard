// scripts/smoke-precall.mjs
//
// Smoke do Pre-call Checklist no navegador de verdade, sobre o mock-crm.html.
//
// O que um teste de unidade não alcança, e este alcança: que a captura lê o DOM
// do CRM e chega ao formulário (inclusive o multivalorado das tasks), que os
// campos capturados aparecem marcados e animados, que NADA capturado
// sobrescreve o que o agente digitou, que outro caso na tela zera o formulário,
// e que o texto que cai no editor de notas é o do contrato — com a interface em
// espanhol e o atendimento em português, o pior cenário para um texto que não
// pode seguir nenhum dos dois idiomas.
//
// O mock não tem editor de notas; o teste injeta o mesmo gatilho que o CRM tem
// (o ícone `description` num `material-fab` que abre um `contenteditable`), que
// é por onde ensureNoteCardIsOpen() entra.
//
// Uso: npm run smoke:precall     (CW_CHROMIUM=/caminho/do/chromium se precisar)
//      CW_SHOT_DIR=/tmp/x npm run smoke:precall   (salva capturas de tela)

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

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}

const executablePath = process.env.CW_CHROMIUM || undefined;
const shotDir = process.env.CW_SHOT_DIR || null;
const browser = await chromium.launch({ headless: true, executablePath });

// Mesmo DOM do mock-crm.html mais o que o checklist lê e escreve: as tasks do
// agendamento (formato multivalorado do Contact Us form) e o gatilho da nota.
async function abrirCrm({ ui = null, saida = null } = {}) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate(({ ui, saida }) => {
        localStorage.setItem('cw_onboarding_seen_v1', 'true');
        if (ui) localStorage.setItem('cw_ui_lang', ui);
        if (saida) localStorage.setItem('cw_output_lang', saida);

        document.querySelector('.content').insertAdjacentHTML('beforeend', `
            <cuf-form-field>
                <div class="form-label">Appointment tasks</div>
                <div debug-id="html-value">ads_conversion_tracking</div>
                <div debug-id="html-value">ga4_setup</div>
                <div debug-id="html-value">ads_conversion_tracking_troubleshooting</div>
            </cuf-form-field>
            <material-fab id="mock-note-fab"><i class="material-icons-extended">description</i></material-fab>`);
        document.getElementById('mock-note-fab').addEventListener('click', () => {
            const editor = document.createElement('div');
            editor.className = 'mock-note-editor';
            editor.style.cssText = 'position:fixed;left:-9999px;top:0';
            editor.contentEditable = 'true';
            document.body.appendChild(editor);
        });

        // Quantas vezes o navegador de fato começou a animação de "chegou
        // preenchido" (e não só se a classe foi posta: com movimento reduzido a
        // classe nem é posta, e o CSS também a desliga).
        window.__fillCount = 0;
        document.addEventListener('animationstart', (e) => {
            if (e.animationName === 'cw-pc-fill') window.__fillCount++;
        }, true);
    }, { ui, saida });
    await page.addScriptTag({ content: script });
    await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
    // A pílula só termina de aparecer depois da animação de abertura (~11s).
    await page.waitForTimeout(12000);
    const cancel = page.locator('#cw-conf-cancel');
    if (await cancel.isVisible().catch(() => false)) await cancel.click();
    return page;
}

const pagina = await abrirCrm();
const popup = pagina.locator('#cw-precall-popup');

async function abrirPelaPaleta(page) {
    if (await page.locator('.cw-palette-overlay.active').isVisible().catch(() => false)) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
    }
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 5000 });
    await page.fill('.cw-palette-input', 'pre-call');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#cw-precall-popup.open', { timeout: 5000 });
}
async function fechar(page) {
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#cw-precall-popup.open'), null, { timeout: 5000 });
}
const valor = (page, id) => page.locator('#cw-pc-' + id).inputValue();
async function esperarCaptura(page, n = 5) {
    await page.waitForFunction(
        (n) => document.querySelectorAll('#cw-precall-popup .cw-pc-field.is-auto').length === n,
        n, { timeout: 8000 },
    );
}
const ultimaNota = (page) => page.evaluate(() => {
    const eds = [...document.querySelectorAll('.mock-note-editor')];
    const ed = eds[eds.length - 1];
    return ed ? { texto: ed.innerText, tags: [...new Set([...ed.querySelectorAll('*')].map((n) => n.tagName))], total: eds.length } : null;
});

async function responderTudo(page, extra = {}) {
    await page.selectOption('#cw-pc-duplicateCase', 'No');
    await page.selectOption('#cw-pc-suite360', 'No');
    await page.selectOption('#cw-pc-sgtm', 'Yes');
    await page.selectOption('#cw-pc-api', 'No');
    await page.selectOption('#cw-pc-sellerCc', 'Yes');
    await page.selectOption('#cw-pc-nextSteps', 'OOS');
    if (extra.cms) await page.fill('#cw-pc-websiteCms', extra.cms);
    if (extra.instrucoes) await page.fill('#cw-pc-specialInstructions', extra.instrucoes);
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
    'Special instructions: <img src=x onerror=alert(1)> & ligar às 14h',
    'Next steps: OOS',
    'Gerado pelo Cases Wizard',
].join('\n\n');

console.log('\n--- Smoke: Pre-call Checklist no navegador ---');

await check('o Ctrl+K encontra o módulo e abre a janela', async () => {
    await abrirPelaPaleta(pagina);
    igual(await popup.locator('span').filter({ hasText: /^Pre-call Checklist$/ }).count() > 0, true, 'título no cabeçalho');
});

await check('captura: os cinco campos automáticos chegam preenchidos, com as tasks juntas', async () => {
    await esperarCaptura(pagina);
    igual(await valor(pagina, 'tasks'), 'Ads Conversion Tracking, Analytics Set Up (GA4), Ads Conversion Tracking Troubleshooting', 'tasks (slugs do CRM → nomes do catálogo)');
    igual(await valor(pagina, 'contactNumber'), '+55 11 98888-7777', 'telefone');
    igual(await valor(pagina, 'email'), 'customer@example.com', 'e-mail');
    igual(await valor(pagina, 'websiteUrl'), 'https://www.acme.com', 'site');
    igual(await valor(pagina, 'adsCid'), '123-456-7890', 'CID');
});

await check('só os capturados levam a marca "Preenchido automaticamente"', async () => {
    const marcados = await pagina.evaluate(() => [...document.querySelectorAll('#cw-precall-popup .cw-pc-auto')]
        .filter((b) => getComputedStyle(b).display !== 'none')
        .map((b) => b.closest('.cw-pc-field').querySelector('.cw-pc-control').id.replace('cw-pc-', '')));
    igual(marcados, ['tasks', 'contactNumber', 'email', 'websiteUrl', 'adsCid'], 'campos marcados');
    const marca = popup.locator('.cw-pc-field.is-auto .cw-pc-auto').first();
    igual((await marca.textContent()).trim(), 'Auto', 'texto da marca');
    igual(await marca.getAttribute('title'), 'Preenchido automaticamente', 'dica da marca');
});

await check('a barra de status diz quantos campos vieram e é uma região viva', async () => {
    const s = popup.locator('.cw-pc-status');
    igual(await s.getAttribute('role'), 'status', 'role');
    igual((await s.textContent()).trim(), '5 campos preenchidos automaticamente. Revise antes de usar.', 'texto');
});

await check('cada campo chegou com a animação de preenchimento', async () => {
    // O navegador dispara animationstart um quadro depois de a classe entrar.
    await pagina.waitForFunction(() => window.__fillCount === 5, null, { timeout: 3000 })
        .catch(async () => { throw new Error(`campos animados: esperado 5, veio ${await pagina.evaluate(() => window.__fillCount)}`); });
});

await check('todo controle tem um rótulo associado (acessibilidade)', async () => {
    const semRotulo = await pagina.evaluate(() => [...document.querySelectorAll('#cw-precall-popup select, #cw-precall-popup input, #cw-precall-popup textarea')]
        .filter((c) => c.labels.length !== 1).map((c) => c.id));
    igual(semRotulo, [], 'controles sem rótulo');
});

if (shotDir) {
    await pagina.screenshot({ path: resolve(shotDir, 'precall-aberto.png') });
    await popup.locator('.cw-pc-body').evaluate((e) => { e.scrollTop = e.scrollHeight; });
    await pagina.waitForTimeout(200);
    await pagina.screenshot({ path: resolve(shotDir, 'precall-fim.png') });
    await popup.locator('.cw-pc-body').evaluate((e) => { e.scrollTop = 0; });
}

await check('Inserir sem responder bloqueia, avisa e aponta o primeiro campo que falta', async () => {
    await popup.getByRole('button', { name: 'Inserir na nota' }).click();
    await pagina.waitForSelector('text=Responda “Caso duplicado” antes de continuar.', { timeout: 3000 });
    igual(await pagina.evaluate(() => document.activeElement.id), 'cw-pc-duplicateCase', 'foco');
    igual(await pagina.evaluate(() => !!document.querySelector('.mock-note-editor')), false, 'nota aberta sem querer');
    await pagina.waitForTimeout(2600); // o destaque de "pendente" se dissolve
});

await check('o campo Yes/No não vem com resposta pré-escolhida', async () => {
    for (const id of ['duplicateCase', 'suite360', 'sgtm', 'api', 'sellerCc', 'nextSteps']) {
        igual(await valor(pagina, id), '', id);
    }
});

await check('Copiar confirma no próprio botão', async () => {
    await responderTudo(pagina, { cms: 'Custom', instrucoes: '<img src=x onerror=alert(1)> & ligar às 14h' });
    const botao = popup.locator('.cw-pc-btn.is-outline');
    await botao.click();
    await pagina.waitForSelector('#cw-precall-popup .cw-pc-btn.is-outline.is-done', { timeout: 2000 });
    igual((await botao.textContent()).trim(), 'Copiado', 'rótulo do botão');
});

await check('Inserir põe o bloco no card de nota, com o texto do contrato', async () => {
    await popup.getByRole('button', { name: 'Inserir na nota' }).click();
    await pagina.waitForFunction(() => document.querySelector('.mock-note-editor')?.innerText.includes('Next steps'), null, { timeout: 8000 });
    const nota = await ultimaNota(pagina);
    igual(nota.texto.trim(), TEXTO_ESPERADO, 'texto da nota');
});

await check('no editor, título e rótulos estão em negrito, os valores não, e o rodapé fecha a nota', async () => {
    const forma = await pagina.evaluate(() => {
        const eds = [...document.querySelectorAll('.mock-note-editor')];
        const ed = eds[eds.length - 1];
        return {
            negritos: [...ed.querySelectorAll('b')].map((b) => b.textContent),
            italicos: [...ed.querySelectorAll('i')].map((i) => i.textContent),
            valorEmNegrito: [...ed.querySelectorAll('b')].some((b) => /(None provided|OOS|Yes)$/.test(b.textContent)),
        };
    });
    igual(forma.negritos.length, 15, 'negritos (título + 14 rótulos)');
    igual(forma.negritos[0], 'Pre-call checklist', 'título');
    forma.negritos.slice(1).forEach((n) => { if (!n.endsWith(':')) throw new Error('negrito que não é rótulo: ' + n); });
    igual(forma.valorEmNegrito, false, 'valor dentro do negrito');
    igual(forma.italicos, ['Gerado pelo Cases Wizard'], 'rodapé');
});

await check('o que o agente digitou não virou tag no editor (só <b>, <br> e o <i> do rodapé)', async () => {
    const nota = await ultimaNota(pagina);
    const estranhas = nota.tags.filter((t) => !['B', 'BR', 'I'].includes(t));
    igual(estranhas, [], 'tags no editor');
});

await check('a janela fecha ao inserir e devolve a rolagem da página', async () => {
    await pagina.waitForFunction(() => !document.querySelector('#cw-precall-popup.open'), null, { timeout: 5000 });
    igual(await pagina.evaluate(() => document.body.style.overflow), '', 'overflow do body');
});

await check('reabrir no MESMO caso preserva o que foi digitado e não sobrescreve com a captura', async () => {
    await abrirPelaPaleta(pagina);
    await pagina.fill('#cw-pc-email', 'agente-digitou@example.com');
    await fechar(pagina);
    await abrirPelaPaleta(pagina);
    await pagina.waitForTimeout(1500);
    igual(await valor(pagina, 'email'), 'agente-digitou@example.com', 'e-mail digitado');
    igual(await valor(pagina, 'specialInstructions'), '<img src=x onerror=alert(1)> & ligar às 14h', 'instruções');
    igual(await valor(pagina, 'sgtm'), 'Yes', 'resposta Yes/No');
    igual(await pagina.locator('#cw-pc-email').evaluate((e) => e.closest('.cw-pc-field').classList.contains('is-auto')), false, 'o e-mail editado perdeu a marca de automático');
});

await check('Limpar zera tudo e a captura preenche de novo, com animação', async () => {
    const antes = await pagina.evaluate(() => window.__fillCount);
    await popup.getByRole('button', { name: 'Limpar' }).click();
    await esperarCaptura(pagina);
    igual(await valor(pagina, 'email'), 'customer@example.com', 'e-mail recapturado');
    igual(await valor(pagina, 'sgtm'), '', 'resposta Yes/No');
    igual(await valor(pagina, 'specialInstructions'), '', 'instruções');
    await pagina.waitForFunction((antes) => window.__fillCount - antes === 5, antes, { timeout: 3000 })
        .catch(async () => { throw new Error(`animações novas: esperado 5, veio ${(await pagina.evaluate(() => window.__fillCount)) - antes}`); });
});

await check('movimento reduzido: os campos chegam preenchidos, sem a animação', async () => {
    await pagina.emulateMedia({ reducedMotion: 'reduce' });
    const antes = await pagina.evaluate(() => window.__fillCount);
    await popup.getByRole('button', { name: 'Limpar' }).click();
    await esperarCaptura(pagina);
    igual(await valor(pagina, 'adsCid'), '123-456-7890', 'CID');
    igual((await pagina.evaluate(() => window.__fillCount)) - antes, 0, 'animações');
    await pagina.emulateMedia({ reducedMotion: 'no-preference' });
});

await check('OUTRO caso na tela zera o formulário e captura o novo', async () => {
    await pagina.fill('#cw-pc-specialInstructions', 'instrução do caso ANTERIOR');
    await pagina.selectOption('#cw-pc-api', 'Yes');
    await fechar(pagina);
    await pagina.evaluate(() => {
        document.querySelector('home-data-item .data-pair-content').textContent = '987-654-3210';
        document.querySelector('#website-container .data-pair-content').textContent = 'https://www.outro-caso.com';
    });
    await abrirPelaPaleta(pagina);
    // Logo ao abrir, ANTES de a captura lenta terminar: o caso anterior já saiu
    // do formulário, e copiar/inserir ficam parados até os campos chegarem.
    igual(await valor(pagina, 'specialInstructions'), '', 'instrução do caso anterior ainda visível');
    igual(await valor(pagina, 'api'), '', 'resposta do caso anterior ainda visível');
    igual(await pagina.locator('#cw-precall-popup .cw-pc-btn.is-filled').isDisabled(), true, 'Inserir durante a captura');
    await pagina.waitForFunction(() => document.getElementById('cw-pc-adsCid').value === '987-654-3210', null, { timeout: 8000 });
    await esperarCaptura(pagina);
    igual(await valor(pagina, 'websiteUrl'), 'https://www.outro-caso.com', 'site do caso novo');
    await pagina.waitForFunction(() => !document.querySelector('#cw-precall-popup .cw-pc-btn.is-filled').disabled, null, { timeout: 5000 });
});

await check('exceção: "Checklist concluído? Não" esconde o formulário e exige o motivo', async () => {
    await pagina.selectOption('#cw-pc-completed', 'No');
    igual(await pagina.locator('#cw-pc-exceptionReason').isVisible(), true, 'motivo visível');
    igual(await pagina.locator('.cw-pc-stack').isVisible(), false, 'formulário escondido');
    await popup.getByRole('button', { name: 'Inserir na nota' }).click();
    await pagina.waitForSelector('text=Responda “Motivo da exceção” antes de continuar.', { timeout: 3000 });
    await pagina.waitForTimeout(2600);
});

await check('exceção: o bloco vira só "Completed: No → motivo"', async () => {
    await pagina.selectOption('#cw-pc-exceptionReason', 'Live Meet case');
    await popup.getByRole('button', { name: 'Inserir na nota' }).click();
    await pagina.waitForFunction(() => document.querySelector('.mock-note-editor:last-of-type')?.innerText.includes('Completed'), null, { timeout: 8000 });
    const nota = await ultimaNota(pagina);
    igual(nota.texto.trim(), 'Pre-call checklist\n\nCompleted: No → Live Meet case\n\nGerado pelo Cases Wizard', 'texto da exceção');
});

await check('o botão da pílula existe, abre a janela e fica marcado como ativo', async () => {
    await pagina.waitForFunction(() => !document.querySelector('#cw-precall-popup.open'), null, { timeout: 5000 });
    await pagina.evaluate(() => document.getElementById('cw-btn-precall').click());
    await pagina.waitForSelector('#cw-precall-popup.open', { timeout: 5000 });
    igual(await pagina.evaluate(() => document.getElementById('cw-btn-precall').classList.contains('active')), true, 'ativo');
    igual(await pagina.evaluate(() => document.getElementById('cw-btn-precall').dataset.label), 'Pre-call Checklist', 'rótulo da pílula');
    await fechar(pagina);
});

if (shotDir) {
    await pagina.click('.cw-pill');
    await pagina.waitForTimeout(900);
    await pagina.screenshot({ path: resolve(shotDir, 'precall-pilula.png') });
}
await pagina.close();

console.log('\n--- Smoke: interface em espanhol, atendimento em português ---');
// Os dois knobs divergentes: a nota não pode seguir nenhum dos dois.
const pg2 = await abrirCrm({ ui: 'es', saida: 'pt' });
const popup2 = pg2.locator('#cw-precall-popup');

await check('a tela fala espanhol', async () => {
    await abrirPelaPaleta(pg2);
    await esperarCaptura(pg2);
    igual(await pg2.locator('label[for="cw-pc-duplicateCase"]').textContent(), 'Caso duplicado', 'rótulo');
    igual(await pg2.locator('label[for="cw-pc-sellerCc"]').textContent(), 'Vendedor en copia (CC)', 'rótulo');
    igual((await pg2.locator('.cw-pc-note').textContent()).startsWith('La nota siempre sale en inglés'), true, 'aviso de saída');
    igual(await pg2.locator('#cw-pc-sgtm option').allTextContents(), ['Selecciona…', 'Sí', 'No'], 'opções traduzidas');
    igual(await pg2.locator('#cw-pc-sgtm option').evaluateAll((o) => o.map((x) => x.value)), ['', 'Yes', 'No'], 'valores canônicos');
});

if (shotDir) await pg2.screenshot({ path: resolve(shotDir, 'precall-es.png') });

await check('a nota sai em inglês, idêntica à de qualquer outro idioma', async () => {
    await responderTudo(pg2, { cms: 'Custom', instrucoes: '<img src=x onerror=alert(1)> & ligar às 14h' });
    await popup2.getByRole('button', { name: 'Insertar en la nota' }).click();
    await pg2.waitForFunction(() => document.querySelector('.mock-note-editor')?.innerText.includes('Next steps'), null, { timeout: 8000 });
    igual((await ultimaNota(pg2)).texto.trim(), TEXTO_ESPERADO, 'texto da nota');
});

await pg2.close();
await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
