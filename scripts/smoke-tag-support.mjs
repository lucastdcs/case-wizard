// scripts/smoke-tag-support.mjs
//
// Smoke da pergunta "Você utilizou o Tag Support?" do Case Notes, no navegador de
// verdade, sobre o mock-crm.html.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// A pergunta tem dois papéis, e a tela precisa deixar claro qual é o dela:
//   - com Ads Conversion Tracking (ACT) ou Enhanced Conversions (EC) entre as
//     tasks, a resposta decide se os prints DESSAS tasks saem. Por isso ela vem
//     ANTES dos links: o agente responde antes de gastar tempo colando prints que
//     o Sim dispensaria;
//   - sem ACT/EC não há pergunta: a nota já sai "Não" + o motivo "task não se aplica
//     ao uso do TSA" (Lucas 2026-11-12); a pergunta, quando existe, fica sempre antes
//     do lugar onde colamos os prints e a linha dela sai sempre na nota.
// Antes, sem ACT/EC o módulo se escondia e se zerava. Nenhum teste olhava a
// posição da pergunta nem a nota que sai quando ela aparece sem ACT/EC.
//
// O QUE ELE PROVA (nos três modos de SO e no NI_Awaiting_Validation)
//   - só ACT / só EC / ACT + outra task: pergunta visível ANTES dos links; o Sim
//     tira os prints de ACT/EC e só deles; o Não os devolve;
//   - nenhuma ACT/EC: sem pergunta, e os prints seguem inalterados;
//   - a pergunta acompanha a seleção (só com ACT/EC; some sem elas, sem task ou sem
//     substatus) sem roubar o foco de quem digita o motivo;
//   - o cartão traz o aviso de que a resposta vem antes dos prints (destaque);
//   - a nota: a linha do Tag Support sai sempre que há task (perguntada com ACT/EC,
//     já preenchida sem elas); uma resposta "Sim" antiga não sobrevive à saída da ACT.
//
// Uso: npm run smoke:tag-support

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
function verdade(cond, oque) { if (!cond) throw new Error(oque); }
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque}: esperado ${b}, veio ${a}`);
}

const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Sem nuvem: o app precisa funcionar só com o catálogo embutido.
await page.route('**script.google.com/**', (route) => route.abort());
page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
// Falha rápida: um seletor que não existe é defeito do produto, não motivo para esperar 30s.
page.setDefaultTimeout(5000);

await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
await page.evaluate(() => localStorage.setItem('cw_onboarding_seen_v1', 'true'));
await page.addScriptTag({ content: script });

await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
await page.waitForTimeout(2500);
const dialogCancel = page.locator('#cw-conf-cancel');
if (await dialogCancel.isVisible().catch(() => false)) await dialogCancel.click();

// A nota sai por execCommand('copy') sobre um nó temporário. Interceptar o comando
// devolve o HTML exato que o agente colaria, sem depender da área de transferência.
await page.evaluate(() => {
    window.__nota = null;
    const original = document.execCommand.bind(document);
    document.execCommand = (cmd, ...resto) => {
        if (cmd !== 'copy') return original(cmd, ...resto);
        const sel = window.getSelection();
        const caixa = document.createElement('div');
        if (sel.rangeCount) caixa.appendChild(sel.getRangeAt(0).cloneContents());
        window.__nota = caixa.innerHTML;
        return true;
    };
});

await page.keyboard.press('Control+k');
await page.waitForSelector('.cw-palette-overlay.active', { timeout: 10000 });
await page.fill('.cw-palette-input', 'Case Notes');
await page.waitForTimeout(200);
await page.keyboard.press('Enter');
await page.waitForSelector('#main-status-select', { timeout: 10000 });
await page.waitForTimeout(900); // voo do genie

const TS = '#tag-support-container';
const ACT = 'ads_conversion_tracking';
const EC = 'ads_enhanced_conversions';
const GA4 = 'ga4_event_tracking';
const ESPERA = 150;

// Quantos campos de link a task pede na tela.
const prints = (key) => page.locator(`input[id^="screen-${key}-"]`).count();

// Onde a pergunta está em relação ao bloco de links (o pai de .cw-screens-container).
// A ordem do DOM é a ordem de leitura e de Tab; a coordenada confirma que o
// navegador desenha na mesma ordem.
const lugar = () => page.evaluate(() => {
    const ts = document.querySelector('#tag-support-container');
    const links = document.querySelector('.cw-screens-container').parentElement;
    const visivel = getComputedStyle(ts).display !== 'none';
    const linksVisiveis = getComputedStyle(links).display !== 'none';
    const pos = ts.compareDocumentPosition(links);
    return {
        visivel,
        domAntes: !!(pos & Node.DOCUMENT_POSITION_FOLLOWING),
        yAntes: visivel && linksVisiveis ? ts.getBoundingClientRect().y < links.getBoundingClientRect().y : null,
    };
});
const antesDosLinks = async () => {
    const l = await lugar();
    return l.visivel && l.domAntes && l.yAntes !== false;
};

const alternar = async (key) => {
    await page.evaluate((k) => document.querySelector('#hero-' + k).click(), key);
    await page.waitForTimeout(ESPERA);
};
const limparTasks = async () => {
    await page.evaluate(() => document.querySelectorAll('.cw-hero-card.active').forEach((c) => c.click()));
    await page.waitForTimeout(ESPERA);
};
const responder = async (valor) => {
    await page.locator(`${TS} input[value="${valor}"]`).click();
    await page.waitForTimeout(ESPERA);
};
const copiarNota = async () => {
    await page.evaluate(() => { window.__nota = null; });
    await page.click('.js-btn-copy');
    await page.waitForTimeout(ESPERA);
    return page.evaluate(() => window.__nota || '');
};
const caixasTS = () => page.locator('.cw-ts-disclaimer-box').count();

// Cada verificação monta o que precisa e devolve a tela limpa, mesmo quando falha:
// sem isso uma falha deixa task marcada e o resto vira ruído em cascata, e a saída
// não diz mais qual comportamento quebrou.
async function limpar() {
    if ((await lugar()).visivel) {
        await page.locator(`${TS} input[value="Não"]`).click();
        await page.fill(`${TS} input[type="text"]`, '');
    }
    await limparTasks();
}
async function isolado(name, fn, modo) {
    await check(name, async () => {
        try { await fn(); } finally {
            await limpar().catch(() => {});
            const sub = await page.inputValue('#sub-status-select').catch(() => '');
            if (sub !== modo.sub) await escolherSubstatus(modo.status, modo.sub).catch(() => {});
        }
    });
}

const PERGUNTA = 'Utilizou Tag Support?';
const DISCLAIMER_NOTA = 'Tag criada/verificada pelo Tag Support';

async function escolherSubstatus(status, sub) {
    await page.selectOption('#main-status-select', status);
    await page.waitForTimeout(200);
    await page.selectOption('#sub-status-select', sub);
    await page.waitForTimeout(400);
}

console.log('\n--- Smoke: pergunta do Tag Support ---');

// Prints esperados por modo (catálogo embutido). O modo "education" só vale para
// SO_Education_Only; Troubleshooting e Awaiting_Validation pedem os de implementação.
const MODOS = [
    { nome: 'Implementation', status: 'SO', sub: 'SO_Implementation_Only', act: 5, ec: 6, ga4: 10 },
    { nome: 'Education', status: 'SO', sub: 'SO_Education_Only', act: 2, ec: 6, ga4: 10 },
    { nome: 'Troubleshooting', status: 'SO', sub: 'SO_Troubleshooting_Only', act: 5, ec: 6, ga4: 10 },
    { nome: 'Awaiting Validation', status: 'NI', sub: 'NI_Awaiting_Validation', act: 5, ec: 6, ga4: 10 },
];

for (const modo of MODOS) {
    console.log(`\n[${modo.nome}]`);
    await escolherSubstatus(modo.status, modo.sub);
    const cada = (name, fn) => isolado(name, fn, modo);

    await cada('sem task, a pergunta não aparece', async () => {
        igual((await lugar()).visivel, false, 'pergunta visível');
    });

    for (const [rotulo, key, n] of [['ACT', ACT, modo.act], ['EC', EC, modo.ec]]) {
        await cada(`só ${rotulo}: a pergunta vem ANTES dos links`, async () => {
            await alternar(key);
            verdade(await antesDosLinks(), 'esperava a pergunta visível antes do bloco de links: ' + JSON.stringify(await lugar()));
            igual(await prints(key), n, `campos de link de ${rotulo} antes de responder`);
        });

        await cada(`só ${rotulo}: o Sim dispensa os prints; o Não os devolve`, async () => {
            await alternar(key);
            await responder('Sim');
            igual(await prints(key), 0, `campos de link de ${rotulo} com Sim`);
            igual(await caixasTS(), 1, 'avisos de "não são necessários prints"');
            await responder('Não');
            igual(await prints(key), n, `campos de link de ${rotulo} de volta com Não`);
        });
    }

    await cada('ACT + outra task: pergunta ANTES dos links; o Sim só tira os prints da ACT', async () => {
        await alternar(ACT);
        await alternar(GA4);
        verdade(await antesDosLinks(), 'esperava a pergunta antes dos links: ' + JSON.stringify(await lugar()));

        await responder('Sim');
        igual(await prints(ACT), 0, 'prints da ACT com Sim');
        igual(await prints(GA4), modo.ga4, 'prints da outra task com Sim');
        verdade((await lugar()).visivel, 'a pergunta tem de continuar visível com a task que não é ACT/EC');

        await responder('Não');
        igual(await prints(ACT), modo.act, 'prints da ACT de volta com Não');
        igual(await prints(GA4), modo.ga4, 'prints da outra task com Não');
    });

    await cada('sem ACT/EC: não há pergunta e os prints seguem como estavam', async () => {
        await alternar(GA4);
        igual((await lugar()).visivel, false, 'a pergunta não devia aparecer só com uma task que não é ACT/EC');
        igual(await prints(GA4), modo.ga4, 'prints da task que não é ACT/EC');
        igual(await caixasTS(), 0, 'avisos de "não são necessários prints"');
    });

    await cada('a pergunta acompanha a seleção: só com ACT/EC, antes dos links; sem elas some; sem task nada', async () => {
        await alternar(GA4);
        igual((await lugar()).visivel, false, 'só GA4: a pergunta devia estar escondida');
        await alternar(EC);
        verdade(await antesDosLinks(), 'com EC deveria aparecer antes dos links');
        await alternar(EC);
        igual((await lugar()).visivel, false, 'sem EC a pergunta devia sumir');
        await alternar(GA4);
        igual((await lugar()).visivel, false, 'pergunta visível sem nenhuma task');
    });

    await cada('destaque: o cartão explica que a resposta vem antes dos prints', async () => {
        await alternar(EC);
        const info = await page.evaluate((sel) => {
            const c = document.querySelector(sel);
            const h = c && c.querySelector('.js-ts-helper');
            return { texto: h ? h.textContent.trim() : '', borda: c ? getComputedStyle(c).borderLeftWidth : '' };
        }, TS);
        verdade(info.texto.length > 20, 'o cartão devia trazer a linha de ajuda: ' + JSON.stringify(info));
        igual(info.borda, '8px', 'faixa lateral de destaque');
        await alternar(EC);
    });
}

// O resto não depende do modo: roda no SO_Implementation_Only.
console.log('\n[Foco, nota e estado]');
const IMPL = MODOS[0];
await escolherSubstatus(IMPL.status, IMPL.sub);
const resto = (name, fn) => isolado(name, fn, IMPL);

await resto('marcar outra task não tira o foco de quem digita o motivo', async () => {
    await alternar(ACT);
    await page.focus(`${TS} input[type="text"]`);
    // .click() por script não move o foco para o cartão, como o mouse moveria.
    await alternar('gtm_installation'); // outra task que não é ACT/EC: a pergunta não se move
    const foco = await page.evaluate(() => document.activeElement && document.activeElement.closest('#tag-support-container') ? 'motivo' : 'outro');
    igual(foco, 'motivo', 'elemento com foco depois de marcar outra task');
});

await resto('sem substatus a pergunta some junto com o resto', async () => {
    await alternar(ACT);
    verdade((await lugar()).visivel, 'a pergunta devia estar visível com a ACT');
    await page.selectOption('#main-status-select', 'NI');
    await page.waitForTimeout(400);
    igual((await lugar()).visivel, false, 'pergunta visível sem substatus');
});

await resto('nota, só ACT: a linha do Tag Support sai sempre, como antes', async () => {
    await alternar(ACT);
    const nota = await copiarNota();
    verdade(nota.includes(PERGUNTA), 'a nota deveria trazer "' + PERGUNTA + '": ' + nota);
    verdade(nota.includes('❌ Não'), 'a resposta padrão (Não) deveria constar: ' + nota);
    await responder('Sim');
    const comSim = await copiarNota();
    verdade(comSim.includes('✅ Sim'), 'a nota deveria trazer o Sim: ' + comSim);
    verdade(comSim.includes(DISCLAIMER_NOTA), 'a task ACT deveria sair com o texto do Tag Support: ' + comSim);
});

await resto('nota, ACT + outra task, sem tocar na pergunta: a linha sai (há ACT)', async () => {
    await alternar(ACT);
    await alternar(GA4);
    const nota = await copiarNota();
    verdade(nota.includes(PERGUNTA), 'a nota deveria trazer "' + PERGUNTA + '": ' + nota);
});

const MOTIVO_AUTO = 'Task não se aplica ao uso do TSA.';

await resto('nota, sem ACT/EC: já sai "Não" e o motivo "task não se aplica ao uso do TSA", sem pergunta', async () => {
    await alternar(GA4);
    igual((await lugar()).visivel, false, 'a pergunta não devia estar visível');
    const nota = await copiarNota();
    verdade(nota.length > 0, 'a cópia da nota não foi capturada');
    verdade(nota.includes(PERGUNTA) && nota.includes('❌ Não'), 'a nota deveria trazer "' + PERGUNTA + ' ❌ Não": ' + nota);
    verdade(nota.includes(MOTIVO_AUTO), 'a nota deveria trazer o motivo "' + MOTIVO_AUTO + '": ' + nota);
    verdade(!nota.includes(DISCLAIMER_NOTA), 'a GA4 não devia sair como "criada pelo Tag Support": ' + nota);
});

await resto('nota, ACT com Sim e depois sem ACT: a resposta antiga não vale; sai "Não" + o motivo automático', async () => {
    await alternar(ACT);
    await responder('Sim');
    await alternar(GA4);
    await alternar(ACT); // fica só a GA4
    igual((await lugar()).visivel, false, 'a pergunta devia sumir');
    const nota = await copiarNota();
    verdade(!nota.includes('✅ Sim') && nota.includes('❌ Não') && nota.includes(MOTIVO_AUTO), 'a nota devia sair "Não" + motivo automático: ' + nota);
});

await resto('nota, sem task nenhuma: sem a linha do Tag Support', async () => {
    const nota = await copiarNota();
    verdade(!nota.includes(PERGUNTA), 'sem task não devia haver linha do Tag Support: ' + nota);
});

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke do Tag Support: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
