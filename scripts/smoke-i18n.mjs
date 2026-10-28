// scripts/smoke-i18n.mjs
//
// Smoke do idioma no navegador de verdade. `test:i18n` garante que os
// dicionários TÊM as três línguas; este garante que o app LÊ a certa em
// cada lugar — que é outro problema, e o mais fácil de errar.
//
// A afirmação central é a separação feita no ADR-0016: idioma da interface
// (quem opera) e idioma do atendimento (quem é atendido) são knobs
// independentes. O modo de falha que ele existe para pegar é silencioso e
// caro: um agente põe a ferramenta em inglês por preferência e passa a
// gravar case notes em inglês em casos PT/ES, sem nenhum aviso na tela.
//
// Por isso o teste roda no pior cenário possível — interface EN com
// atendimento PT — e checa os dois lados ao mesmo tempo. Com os dois knobs
// no mesmo valor, qualquer religação errada passaria despercebida.
//
// Uso: npm run smoke:i18n   (CW_CHROMIUM aponta um Chromium alternativo)

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
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
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}
function contem(texto, trecho, oque) {
    if (!String(texto).includes(trecho)) throw new Error(`${oque}: não achei ${JSON.stringify(trecho)} em ${JSON.stringify(String(texto).slice(0, 120))}`);
}

const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });

// Sobe o app com os dois idiomas JÁ divergentes: é o estado que o ADR-0016
// tornou possível, e o único em que uma religação errada aparece.
async function abrirCaseNotes({ ui, saida }) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate(([u, s]) => {
        localStorage.setItem('cw_onboarding_seen_v1', 'true');
        localStorage.setItem('cw_ui_lang', u);
        localStorage.setItem('cw_output_lang', s);
    }, [ui, saida]);
    await page.addScriptTag({ content: script });

    // A pílula só aparece depois da animação de abertura; o Ctrl+K é
    // registrado já na inicialização. Mesmo caminho do smoke de atalhos.
    await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
    await page.waitForTimeout(12000);
    const cancelar = page.locator('#cw-conf-cancel');
    if (await cancelar.isVisible().catch(() => false)) await cancelar.click();

    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active');
    // Lê os grupos da paleta AQUI, com ela aberta: reabri-la depois custaria
    // um Escape, e o Escape fecha o Case Notes junto.
    const gruposPaleta = await page.locator('.cw-palette-group').allTextContents();
    await page.fill('.cw-palette-input', 'Case Notes');
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    return { page, gruposPaleta };
}

const rotulos = (page) => page.evaluate(() =>
    Array.from(document.querySelectorAll('#notes-assistant-popup label'))
        .map((e) => e.textContent.trim()).filter(Boolean));

// O link da documentação mora em dois lugares do bookmarklet: no "?" de todo
// módulo (aqui, o do Case Notes) e em Configurações. Os dois estão no DOM desde
// o boot, mesmo fechados, então dá para lê-los sem abrir nenhum popup.
const DOCS_URL = readFileSync(resolve(raiz, 'src/modules/shared/config.js'), 'utf8')
    .match(/export const DOCS_URL\s*=\s*"([^"]+)"/)[1];
const linksDeDocs = (page) => page.evaluate(() => {
    // No "?" o rótulo é um <span> dentro do <a>, ao lado do emoji; o texto do
    // <a> inteiro traria o emoji junto.
    const rotuloDoHelp = document.querySelector('#notes-assistant-popup .cw-help-docs-link');
    const configs = document.querySelector('#configs-popup .js-docs-link');
    const lerLink = (a, rotulo) => a && { texto: rotulo.textContent.trim(), href: a.href, alvo: a.target };
    return {
        ajuda: rotuloDoHelp && lerLink(rotuloDoHelp.closest('a'), rotuloDoHelp),
        configs: configs && lerLink(configs, configs),
    };
});
async function confereDocs(page, textoEsperado) {
    const { ajuda, configs } = await linksDeDocs(page);
    for (const [onde, l] of [['"?" do Case Notes', ajuda], ['Configurações', configs]]) {
        if (!l) throw new Error(`${onde}: link da documentação não existe`);
        igual(l.texto, textoEsperado, `${onde}: rótulo`);
        igual(l.href, DOCS_URL, `${onde}: destino`);
        igual(l.alvo, '_blank', `${onde}: abre em outra aba`);
    }
}

console.log('\n--- Smoke: idioma da interface x idioma do atendimento ---');

// ------------------------------------------------- interface EN, nota PT
{
    const { page, gruposPaleta } = await abrirCaseNotes({ ui: 'en', saida: 'pt' });

    await check('a paleta de comandos segue a INTERFACE (en)', async () =>
        igual(gruposPaleta.join('|'), 'My shortcuts|Modules', 'grupos da paleta'));

    await check('o cromo do Case Notes segue a INTERFACE (en)', async () => {
        const t = await page.evaluate(() => ({
            fluxo: document.querySelector('.js-label-fluxo')?.textContent?.trim(),
            status: document.querySelector('.js-label-status')?.textContent?.trim(),
            copiar: document.querySelector('.js-btn-copy')?.textContent?.trim(),
        }));
        igual(t.fluxo, 'Flow:', 'rótulo de fluxo');
        igual(t.status, 'Main Status:', 'rótulo de status');
        igual(t.copiar, 'Copy', 'botão copiar');
    });

    await check('o link da documentação segue a INTERFACE (en), no "?" e em Configurações', () =>
        confereDocs(page, 'Open the documentation'));

    await page.selectOption('#main-status-select', 'NI');
    await page.waitForTimeout(600);
    await page.selectOption('#sub-status-select', 'NI_Awaiting_Inputs');
    await page.waitForTimeout(1500);

    // O coração do teste: estes rótulos são o texto que vai IMPRESSO na nota,
    // então têm de sair em português mesmo com a ferramenta em inglês.
    await check('os rótulos dos campos seguem o ATENDIMENTO (pt)', async () => {
        const ls = (await rotulos(page)).join(' | ');
        for (const esperado of ['Contexto/O que foi feito:', 'Task(s) solicitada(s):', 'Minha Ação:']) {
            contem(ls, esperado, 'rótulos de campo');
        }
        if (/What was done|Requested task|My Action/.test(ls)) {
            throw new Error('rótulo de campo vazou para o inglês: ' + ls.slice(0, 200));
        }
    });

    // O botão de auto-busca mora DENTRO do rótulo do campo, mas é controle da
    // ferramenta e não sai no texto — foi o que o primeiro corte errou.
    await check('controles dentro do rótulo seguem a INTERFACE (en)', async () => {
        const ls = (await rotulos(page)).join(' | ');
        contem(ls, 'Auto Search', 'botão de auto-busca');
        if (ls.includes('Auto Busca')) throw new Error('auto-busca ainda em português');
    });

    await page.close();
}

// ------------------------------- o caso comum: os dois iguais, nada muda
{
    const { page } = await abrirCaseNotes({ ui: 'pt', saida: 'pt' });
    await check('o link da documentação, em pt, no "?" e em Configurações', () =>
        confereDocs(page, 'Abrir a documentação'));
    await check('com os dois knobs em pt, tudo continua em português', async () => {
        igual(await page.evaluate(() => document.querySelector('.js-label-fluxo')?.textContent?.trim()),
            'Fluxo:', 'rótulo de fluxo');
        await page.selectOption('#main-status-select', 'NI');
        await page.waitForTimeout(600);
        await page.selectOption('#sub-status-select', 'NI_Awaiting_Inputs');
        await page.waitForTimeout(1500);
        contem((await rotulos(page)).join(' | '), 'Minha Ação:', 'rótulos de campo');
    });
    await page.close();
}

// --------------------------------------- interface pt, atendimento en
{
    const { page } = await abrirCaseNotes({ ui: 'pt', saida: 'en' });
    await check('o inverso também vale: ferramenta em pt, nota em inglês', async () => {
        igual(await page.evaluate(() => document.querySelector('.js-label-fluxo')?.textContent?.trim()),
            'Fluxo:', 'rótulo de fluxo');
        await page.selectOption('#main-status-select', 'NI');
        await page.waitForTimeout(600);
        await page.selectOption('#sub-status-select', 'NI_Awaiting_Inputs');
        await page.waitForTimeout(1500);
        const ls = (await rotulos(page)).join(' | ');
        contem(ls, 'My Action:', 'rótulos de campo');
        if (ls.includes('Minha Ação:')) throw new Error('rótulo de campo ficou em português');
    });
    await page.close();
}

// ----------------------- troca da interface com o app JÁ montado
// O perfil (que decide o idioma) chega depois do boot, então o app monta a tela
// num idioma e é repintado em outro. O que um módulo desenha uma vez só tem de
// ser repintado pelo handler da troca: o estado vazio do Case Notes e do Email
// Assistant ficava preso em português, e nenhum teste que SOBE o app já no
// idioma certo (os blocos acima) enxerga isso.
{
    const { page } = await abrirCaseNotes({ ui: 'pt', saida: 'pt' });
    const trocar = (lang) => page.evaluate((l) =>
        document.querySelector(`#cw-config-lang-toggle button[data-lang="${l}"]`).click(), lang);
    const lerVazios = () => page.evaluate(() => ({
        notes: document.querySelector('#notes-empty-state')?.textContent.replace(/\s+/g, ' ').trim(),
        email: document.querySelector('.cw-email-preview-content')?.textContent.replace(/\s+/g, ' ').trim(),
        botoes: Array.from(document.querySelectorAll('#email-assistant-popup .cw-email-preview-actions button'))
            .map((b) => b.textContent.trim()),
    }));
    const ESPERADO = {
        es: { titulo: '¿Listo para empezar?', copiar: 'Copiar HTML', preencher: 'Rellenar en el CRM' },
        en: { titulo: 'Ready to start?', copiar: 'Copy HTML', preencher: 'Fill in CRM' },
        pt: { titulo: 'Pronto para começar?', copiar: 'Copiar HTML', preencher: 'Preencher no CRM' },
    };
    for (const lang of ['es', 'en', 'pt']) {
        await check(`o estado vazio do Case Notes e do Email Assistant seguem a troca para ${lang}`, async () => {
            await trocar(lang);
            await page.waitForTimeout(400);
            const v = await lerVazios();
            const e = ESPERADO[lang];
            contem(v.notes, e.titulo, 'estado vazio do Case Notes');
            contem(v.email, e.titulo, 'estado vazio do Email Assistant');
            igual(v.botoes.slice(1).join('|'), `${e.copiar}|${e.preencher}`, 'botões do Email Assistant');
        });
    }
    await page.close();
}

await browser.close();
console.log(fail ? `\n✗ smoke de idioma: ${fail} falha(s)\n` : '\n✓ smoke de idioma: 0 falhas\n');
process.exit(fail ? 1 : 0);
