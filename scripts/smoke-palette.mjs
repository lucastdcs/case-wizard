// scripts/smoke-palette.mjs
//
// Smoke da MECÂNICA do Ctrl+K no navegador de verdade, sobre o mock-crm.html:
// mouse, Tab, Esc, foco, tecla segurada, toggles rápidos. É o complemento de
// smoke-shortcuts.mjs, que cobre o fluxo dos atalhos de nota e não o que
// acontece quando o agente usa a palette de um jeito que ninguém previu.
//
// Existe porque tudo isto passava despercebido em teste de unidade e em
// leitura de código: o clique do mouse se perdia porque o hover reconstruía a
// lista ~20×/s; o Tab levava o foco para os campos do CRM por trás do overlay;
// o Esc fechava também a janela de módulo aberta embaixo.
//
// Cada checagem roda numa página nova: estado de palette (aberta/fechada, foco,
// scroll travado) vaza entre passos, e uma palette travada por um defeito faria
// as checagens seguintes falharem por tabela e esconderia qual quebrou.
//
// Uso: npm run smoke:palette

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

// Mesmo gancho dos outros smokes: ambiente com Chromium, mas não o build exato
// que o Playwright fixa.
const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });

// `onboarding: true` deixa o wizard de boas-vindas aparecer (os outros smokes o
// desligam); `viewport` só muda quando a checagem é sobre a altura da janela.
async function paginaNova({ onboarding = false, viewport = { width: 1280, height: 900 } } = {}) {
    const page = await browser.newPage({ viewport });
    // A API real (Apps Script) não responde daqui: cortar na origem deixa o app
    // no caminho "sem nuvem", que é o que precisa continuar funcionando.
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('      ! erro de página: ' + e.message); fail++; });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate((mostrarOnboarding) => {
        if (!mostrarOnboarding) localStorage.setItem('cw_onboarding_seen_v1', 'true');
    }, onboarding);
    await page.addScriptTag({ content: script });
    // O Ctrl+K é registrado na inicialização, sem esperar a splash.
    await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
    await page.waitForTimeout(2500);
    return page;
}

async function check(name, fn, opts) {
    let page;
    try {
        page = await paginaNova(opts);
        await fn(page);
        console.log('  ✓ ' + name);
    } catch (e) {
        console.log('  ✗ ' + name + '\n      ' + e.message.split('\n')[0]);
        fail++;
    } finally {
        if (page) await page.close();
    }
}

const ativa = (page) => page.evaluate(() => !!document.querySelector('.cw-palette-overlay.active'));
const janelasAbertas = (page) => page.evaluate(
    () => [...document.querySelectorAll('.cw-module-window.open')].map((w) => w.id)
);
const selecionado = (page) => page.locator('.cw-palette-item.selected .cw-palette-item-label').textContent();
const foco = (page) => page.evaluate(() => {
    const a = document.activeElement;
    return a ? a.tagName.toLowerCase() + (a.className ? '.' + String(a.className).split(' ')[0] : '') : null;
});

async function abrirPalette(page, busca = '') {
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 3000 });
    if (busca) {
        await page.fill('.cw-palette-input', busca);
        await page.waitForTimeout(150);
    }
}

// Traz o item para a área visível da lista (ela rola) e espera a palette
// terminar de animar antes de medir. Sem o scroll, o clique por coordenada cai
// no fundo do overlay, que fecha a palette - e o teste "passa" sem ter clicado
// em item nenhum.
async function caixaDoItem(page, texto) {
    const item = page.locator('.cw-palette-item', { hasText: texto });
    await item.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    return item.boundingBox();
}

function exige(cond, msg) { if (!cond) throw new Error(msg); }

console.log('\n--- Smoke: mecânica do Ctrl+K no navegador ---');

// ---------- Mouse ----------

await check('clicar num item com o mouse abre o módulo (3 cliques de 90ms)', async (page) => {
    for (let i = 0; i < 3; i++) {
        await abrirPalette(page);
        const box = await caixaDoItem(page, 'Fusos');
        const x = box.x + box.width / 2, y = box.y + box.height / 2;
        await page.mouse.move(x - 60, y - 30);
        await page.mouse.move(x, y, { steps: 3 });
        await page.waitForTimeout(200);
        await page.mouse.down();
        await page.waitForTimeout(45);
        await page.mouse.move(x + 1, y); // o tremor da mão enquanto aperta
        await page.waitForTimeout(45);
        await page.mouse.up();
        await page.waitForTimeout(1300);

        exige((await janelasAbertas(page)).includes('timezone-popup'), `clique ${i + 1}: o módulo não abriu`);

        // volta ao zero: sem palette por cima, o Esc global fecha o módulo
        await page.keyboard.press('Escape');
        await page.waitForTimeout(800);
    }
});

await check('passar o mouse sobre os itens não reconstrói a lista', async (page) => {
    await abrirPalette(page);
    await page.evaluate(() => {
        window.__reconstrucoes = 0;
        new MutationObserver((m) => {
            window.__reconstrucoes += m.filter((x) => x.removedNodes.length).length;
        }).observe(document.querySelector('.cw-palette-list'), { childList: true });
    });
    const box = await caixaDoItem(page, 'Case Notes');
    await page.mouse.move(box.x + 100, box.y + 20, { steps: 4 });
    await page.mouse.move(box.x + 120, box.y + 70, { steps: 4 });
    await page.waitForTimeout(1500);
    const n = await page.evaluate(() => window.__reconstrucoes);
    exige(n === 0, `a lista foi reconstruída ${n}× só com o mouse passando`);
});

await check('o hover muda o item selecionado', async (page) => {
    await abrirPalette(page);
    const box = await caixaDoItem(page, 'Call Script');
    await page.mouse.move(box.x + 60, box.y + 10);
    await page.mouse.move(box.x + 70, box.y + 20, { steps: 3 });
    await page.waitForTimeout(200);
    const sel = await selecionado(page);
    exige(sel === 'Call Script', 'selecionado: ' + sel);
});

await check('duplo clique abre o módulo uma vez só e nenhum clique cai no CRM', async (page) => {
    await abrirPalette(page);
    await page.evaluate(() => {
        window.__foraDaPalette = 0;
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cw-palette-overlay')) window.__foraDaPalette++;
        }, true);
    });
    const box = await caixaDoItem(page, 'Fusos');
    await page.mouse.move(box.x + 50, box.y + 20, { steps: 3 });
    await page.waitForTimeout(200);
    await page.mouse.dblclick(box.x + 50, box.y + 20);
    await page.waitForTimeout(1500);

    const fora = await page.evaluate(() => window.__foraDaPalette);
    exige(fora === 0, `${fora} clique(s) atravessaram a palette e caíram no CRM`);
    const abertas = await janelasAbertas(page);
    exige(abertas.includes('timezone-popup'), 'o 2º clique desfez o 1º: janelas ' + JSON.stringify(abertas));
});

await check('um clique nos 200ms depois de fechar não atravessa para o CRM', async (page) => {
    await abrirPalette(page);
    await page.waitForTimeout(350);
    await page.evaluate(() => {
        window.__foraDaPalette = 0;
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cw-palette-overlay')) window.__foraDaPalette++;
        }, true);
    });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(40);
    await page.mouse.click(640, 700);
    await page.waitForTimeout(400);
    const fora = await page.evaluate(() => window.__foraDaPalette);
    exige(fora === 0, `${fora} clique(s) caíram no CRM durante o fade da palette`);
});

await check('clicar no rodapé não tira o foco do campo, e o Esc ainda fecha', async (page) => {
    await abrirPalette(page);
    const f = await page.locator('.cw-palette-footer').boundingBox();
    await page.mouse.click(f.x + f.width - 20, f.y + f.height / 2);
    await page.waitForTimeout(150);
    exige((await foco(page)) === 'input.cw-palette-input', 'foco foi para ' + (await foco(page)));

    await page.keyboard.press('ArrowDown');
    exige((await selecionado(page)) !== 'NI Attempted — Início 2 Day Rule', 'a seta não respondeu');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    exige(!(await ativa(page)), 'o Esc não fechou a palette');
});

// ---------- Teclado ----------

await check('seta para baixo percorre a lista toda com o mouse parado em cima dela', async (page) => {
    await abrirPalette(page);
    const lista = await page.locator('.cw-palette-list').boundingBox();
    await page.mouse.move(lista.x + 200, lista.y + 150, { steps: 3 });
    await page.waitForTimeout(300);

    const trilha = [await selecionado(page)];
    for (let i = 0; i < 12; i++) {
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(120);
        trilha.push(await selecionado(page));
    }
    exige(new Set(trilha).size === 12, 'a seleção empacou: ' + JSON.stringify(trilha));
    exige(trilha[11] === 'Configurações', 'último item: ' + trilha[11]);
});

await check('Tab e Shift+Tab ficam na palette e andam pela lista', async (page) => {
    await abrirPalette(page);
    const trilha = [];
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(80);
        trilha.push([await foco(page), await selecionado(page)]);
    }
    exige(trilha.every(([f]) => f === 'input.cw-palette-input'), 'o foco saiu da palette: ' + JSON.stringify(trilha));
    exige(trilha[2][1] === 'Pre-call Checklist', 'o Tab não andou pela lista: ' + JSON.stringify(trilha));

    await page.keyboard.press('Shift+Tab');
    await page.waitForTimeout(80);
    exige((await foco(page)) === 'input.cw-palette-input', 'Shift+Tab tirou o foco');
    exige((await selecionado(page)) === 'Case Notes', 'Shift+Tab não voltou: ' + (await selecionado(page)));
});

await check('o que se digita depois de Tab, Tab, Tab não cai no campo do CRM', async (page) => {
    // Três Tabs: lista, body e, no código antigo, o campo do CRM por trás do overlay.
    const antes = await page.inputValue('material-input input');
    await abrirPalette(page);
    for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
    await page.keyboard.type('xyz');
    exige((await page.inputValue('material-input input')) === antes, 'a digitação vazou para o campo do CRM');
    exige((await page.inputValue('.cw-palette-input')) === 'xyz', 'a palette não recebeu a digitação');
});

await check('Ctrl+K funciona dentro de um campo que engole o keydown', async (page) => {
    // Simula um campo do CRM que dá stopPropagation: o listener do document, em
    // bolha, nunca veria o atalho vindo dali.
    await page.evaluate(() => {
        document.querySelector('material-input input').addEventListener('keydown', (e) => e.stopPropagation());
    });
    await page.focus('material-input input');
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 3000 });
});

await check('Esc fecha só a palette: o módulo aberto por baixo continua aberto', async (page) => {
    await abrirPalette(page, 'configuracoes');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1300);
    exige((await janelasAbertas(page)).includes('configs-popup'), 'Configurações não abriu');

    await abrirPalette(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(900);
    exige(!(await ativa(page)), 'a palette não fechou');
    exige((await janelasAbertas(page)).includes('configs-popup'), 'o Esc da palette fechou também o módulo');
});

await check('Esc devolve o foco ao campo do CRM em que o agente estava', async (page) => {
    await page.focus('material-input input');
    await abrirPalette(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    exige((await foco(page)) === 'input', 'foco depois do Esc: ' + (await foco(page)));
    exige(await page.evaluate(() => document.activeElement.closest('material-input') !== null), 'o foco não voltou ao campo do CRM');
});

await check('Enter duplo (50ms) abre o módulo uma vez só', async (page) => {
    await abrirPalette(page, 'fusos');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1800);
    const abertas = await janelasAbertas(page);
    exige(abertas.includes('timezone-popup'), 'o 2º Enter desfez o 1º: ' + JSON.stringify(abertas));
});

// ---------- O atalho em si ----------

await check('três Ctrl+K em sequência rápida deixam a palette aberta; o quarto fecha e destrava o scroll', async (page) => {
    for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Control+k');
        await page.waitForTimeout(60);
    }
    await page.waitForTimeout(600);
    exige(await ativa(page), 'a palette ficou invisível (timer de remoção velho tirou o overlay novo)');

    await page.keyboard.press('Control+k');
    await page.waitForTimeout(500);
    exige(!(await ativa(page)), 'o 4º Ctrl+K não fechou');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    exige(overflow === '', 'o scroll da página ficou travado: overflow=' + overflow);
});

await check('abrir logo depois de fechar (menos de 200ms) mantém a palette visível', async (page) => {
    await abrirPalette(page);
    await page.waitForTimeout(300);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(60);
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(700);
    exige(await ativa(page), 'a palette reaberta sumiu');
    exige((await foco(page)) === 'input.cw-palette-input', 'foco: ' + (await foco(page)));
});

await check('só Ctrl/Cmd+K puro abre: Ctrl+Shift+K e Ctrl+Alt+K não', async (page) => {
    for (const combo of ['Control+Shift+k', 'Control+Alt+k']) {
        await page.keyboard.press(combo);
        await page.waitForTimeout(400);
        exige(!(await ativa(page)), combo + ' abriu a palette');
    }
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 3000 });
});

await check('segurar Ctrl+K alterna uma vez só', async (page) => {
    await page.keyboard.down('Control');
    // 4 keydown: o 1º é a pressão, os 3 seguintes são repetição do teclado. Um
    // toggle por evento deixaria a palette fechada (par).
    for (let i = 0; i < 4; i++) {
        await page.keyboard.down('k');
        await page.waitForTimeout(40);
    }
    await page.keyboard.up('k');
    await page.keyboard.up('Control');
    await page.waitForTimeout(600);
    exige(await ativa(page), 'a repetição da tecla abriu e fechou a palette em rajada');
});

await check('rótulo de atalho com HTML aparece como texto na palette', async (page) => {
    const rotulo = 'Retorno <b>48h</b> & mais';
    await page.evaluate((r) => {
        const prefs = JSON.parse(localStorage.getItem('cw_user_prefs_v1') || '{}');
        prefs.shortcuts = [{
            id: 'sc_html', kind: 'note', label: r, alias: '', order: 0,
            payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [] },
        }];
        localStorage.setItem('cw_user_prefs_v1', JSON.stringify(prefs));
    }, rotulo);
    await abrirPalette(page);
    const texto = await page.locator('.cw-palette-item-label').first().textContent();
    exige(texto === rotulo, 'a palette mostrou: ' + texto);
    exige((await page.locator('.cw-palette-list b').count()) === 0, 'o rótulo virou elemento no DOM');
});

// ---------- Quando não é a hora de abrir ----------

for (const [classe, descricao] of [
    ['cw-dialog-overlay', 'de um diálogo do app'],
    ['cw-wiz-overlay', 'de um wizard'],
    ['cw-processing-card', 'do card de processamento'],
]) {
    await check(`Ctrl+K não abre por cima ${descricao}`, async (page) => {
        await page.evaluate((c) => {
            const el = document.createElement('div');
            el.className = c;
            el.style.cssText = 'position:fixed;inset:0;z-index:2147483646';
            document.body.appendChild(el);
        }, classe);
        await page.keyboard.press('Control+k');
        await page.waitForTimeout(500);
        exige(!(await ativa(page)), `a palette abriu por cima de .${classe}`);
    });
}

await check('Ctrl+K não abre por cima do wizard de boas-vindas de verdade', async (page) => {
    // As classes acima são as que o código lista; esta confere que o wizard real
    // ainda usa uma delas - se alguém o renomear, só este teste percebe.
    await page.waitForSelector('.cw-wiz-overlay, .cw-ob-lang-overlay', { timeout: 20000 });
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(500);
    exige(!(await ativa(page)), 'a palette abriu por cima do wizard');
}, { onboarding: true });

// ---------- Janela pequena ----------

await check('em janela baixa (420px, DevTools encaixado) o rodapé da palette cabe na tela', async (page) => {
    await abrirPalette(page);
    await page.waitForTimeout(350);
    const r = await page.evaluate(() => ({
        rodape: Math.round(document.querySelector('.cw-palette-footer').getBoundingClientRect().bottom),
        janela: innerHeight,
    }));
    exige(r.rodape <= r.janela, `o rodapé termina em ${r.rodape}px numa janela de ${r.janela}px`);
}, { viewport: { width: 1280, height: 420 } });

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
