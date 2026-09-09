// scripts/smoke-bau-scraping.mjs
//
// Smoke da raspagem que alimenta o formulário BAU, contra o mock-crm.html.
//
// Existe porque o módulo BAU não tinha teste nenhum - nem unitário nem smoke -
// e foi exatamente aí que dois campos chegaram errado na planilha por meses:
// o idioma (captureLanguage devolvia "N/A" pra todo caso, ver #392) e o
// sobrenome (nunca foi raspado, ver #393). Os dois são invisíveis num teste de
// unidade: o que quebra é o casamento entre um seletor de CSS/XPath e a forma
// real do DOM do CRM, e isso só um navegador com o DOM na frente responde.
//
// O mock reproduz as DUAS formas em que o CRM entrega um par rótulo/valor:
// `.data-pair-content` (telas antigas) e `<sanitized-content>` dentro do
// container do rótulo (Contact Us form). A segunda é a que estava quebrada.
//
// Uso: npm run smoke:bau-scraping

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// Entrada sintética: só as funções de captura, sem subir o app. getPageData()
// inteiro não serve aqui - ele abre o menu de perfil, faz JSONP pro Apps Script
// e espera unmask de PII. O que se quer provar é o casamento seletor ↔ DOM.
const bundle = await build({
    stdin: {
        contents: `
            import {
                captureLanguage,
                captureAdvertiserLastName,
                captureClientPhone,
                captureTimezone,
                captureAMName,
            } from "./src/modules/shared/page-data.js";

            window.__cw = { captureLanguage, captureAdvertiserLastName, captureClientPhone, captureTimezone, captureAMName };
        `,
        resolveDir: raiz,
        loader: 'js',
    },
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

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.route('**script.google.com/**', (route) => route.abort());
page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
await page.addScriptTag({ content: script });

console.log('\n--- Smoke: raspagem do formulário BAU ---');

// O rótulo no mock é "Business language", com l minúsculo - igual ao CRM. A
// versão anterior comparava com includes('Language') e nunca casava, então
// esta asserção é a regressão do #392 em si.
await check('idioma do CRM é lido do <sanitized-content>', async () => {
    const v = await page.evaluate(() => window.__cw.captureLanguage());
    igual(v, 'portuguese', 'captureLanguage');
});

await check('idioma não devolve N/A quando o campo existe', async () => {
    const v = await page.evaluate(() => window.__cw.captureLanguage());
    if (v === 'N/A') throw new Error('voltou a devolver N/A - o seletor deixou de casar com o DOM');
});

await check('sobrenome do anunciante é raspado', async () => {
    const v = await page.evaluate(() => window.__cw.captureAdvertiserLastName());
    igual(v, 'Corporation', 'captureAdvertiserLastName');
});

// Ausência tem que virar string vazia, não "N/A" nem undefined: é isso que faz
// o campo aparecer editável no formulário em vez de mandar lixo pra planilha.
await check('sobrenome ausente devolve string vazia', async () => {
    const v = await page.evaluate(() => {
        const el = document.getElementById('advertiser-lastname-container');
        const pai = el.parentElement;
        el.remove();
        const r = window.__cw.captureAdvertiserLastName();
        pai.appendChild(el);
        return r;
    });
    igual(v, '', 'captureAdvertiserLastName sem o campo');
});

// Telefone é PII mascarada: o valor não existe no DOM antes do clique. Se esta
// asserção passar sem o clique acontecer, a captura está lendo outra coisa.
await check('telefone só aparece depois do unmask', async () => {
    const antes = await page.evaluate(() => {
        const el = document.querySelector('#client-phone-container .real');
        return getComputedStyle(el).display;
    });
    igual(antes, 'none', 'telefone antes do clique');

    const v = await page.evaluate(() => window.__cw.captureClientPhone());
    igual(v, '+55 11 98888-7777', 'captureClientPhone');
});

// O rótulo "Phone" que o botão mascarado exibe é o candidato mais provável de
// ser lido por engano — foi exatamente esse tipo de engano que o filtro do
// captureClientEmail já precisou tratar para "Is this:" e "email".
await check('o rótulo "Phone" do estado mascarado não é confundido com o número', async () => {
    const v = await page.evaluate(() => {
        const c = document.getElementById('client-phone-container');
        const real = c.querySelector('.real');
        const texto = real.textContent;
        real.textContent = 'Phone';           // finge que o unmask não materializou nada
        return window.__cw.captureClientPhone().then(r => { real.textContent = texto; return r; });
    });
    igual(v, null, 'captureClientPhone sem número de verdade');
});

await check('telefone ausente devolve null', async () => {
    const v = await page.evaluate(() => {
        const el = document.getElementById('client-phone-container');
        const pai = el.parentElement;
        el.remove();
        return window.__cw.captureClientPhone().then(r => { pai.appendChild(el); return r; });
    });
    igual(v, null, 'captureClientPhone sem o campo');
});

// Guarda de não-regressão: o timezone já usava o caminho do <sanitized-content>
// e é o que provou que aquele caminho funciona. Se ele quebrar junto, o problema
// é do seletor compartilhado, não do campo novo.
await check('timezone continua sendo lido (não-regressão)', async () => {
    const v = await page.evaluate(() => window.__cw.captureTimezone());
    igual(v, 'America/Sao_Paulo', 'captureTimezone');
});

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
