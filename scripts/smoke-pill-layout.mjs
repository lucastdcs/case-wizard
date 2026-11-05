// scripts/smoke-pill-layout.mjs
//
// Smoke da pílula com gaveta e do layout por agente, no navegador de verdade,
// sobre o mock-crm.html.
//
// O que isto protege é o que quebra sem erro nenhum:
//  - a pílula aberta voltar a passar da altura da tela (era o motivo da gaveta);
//  - um módulo guardado na gaveta ficar mudo (aviso) ou invisível (aberto);
//  - a janela do módulo nascer/voltar de um botão que ninguém está vendo;
//  - o Esc fechar o módulo junto com a gaveta, ou a pílula recolher por baixo
//    da gaveta enquanto o agente ainda escolhe;
//  - o atraso da cascata de abrir/fechar não acompanhar a ordem escolhida;
//  - Configurações aceitar mais fixados que o teto, ou não refletir na pílula.
//
// Uso: npm run smoke:pill-layout
//      CW_ONLY="gaveta" npm run smoke:pill-layout   (só os testes cujo nome contém o trecho)

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');
const MOCK = 'file://' + resolve(raiz, 'mock-crm.html');

const bundle = (await build({
    entryPoints: [resolve(raiz, 'src/app.js')],
    bundle: true,
    write: false,
    logLevel: 'silent',
    define: { __CW_BUILD_ENV__: JSON.stringify('production') },
})).outputFiles[0].text;

// Mesmo gancho dos outros smokes: ambiente com Chromium mas sem o build exato
// que o Playwright fixa.
const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });

let fail = 0;
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}
function perto(atual, esperado, tol, oque) {
    if (Math.abs(atual - esperado) > tol) throw new Error(`${oque}: esperado ~${esperado} (±${tol}), veio ${atual}`);
}

const PADRAO_FIXADOS = ['notes', 'precall', 'bauform', 'email', 'script', 'links', 'broadcast'];
const PADRAO_GAVETA = ['library', 'timezone', 'configs'];

// A API real não responde daqui; cortar na origem evita 15s de watchdog por
// chamada e deixa o app no caminho "sem nuvem" (só o cache local), que é o que
// interessa aqui.
//
// `nuvem` simula só as preferências do agente por JSONP (get/save_user_prefs):
// o app injeta um <script> com ?op=...&callback=..., e a resposta é o JS que
// chama esse callback.
async function boot({ prefs, nuvem, lang = 'pt', viewport = { width: 1366, height: 650 }, reducedMotion = false } = {}) {
    const page = await browser.newPage({ viewport });
    if (reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
    page.erros = [];
    page.on('pageerror', (e) => page.erros.push(e.message));
    await page.route('**script.google.com/**', (route) => {
        if (!nuvem) return route.abort();
        const url = new URL(route.request().url());
        const op = url.searchParams.get('op');
        const cb = url.searchParams.get('callback');
        const corpo = op === 'get_user_prefs' ? { status: 'success', prefs: nuvem.prefs }
            : op === 'save_user_prefs' ? { status: 'success' } : null;
        if (!corpo) return route.abort();
        return route.fulfill({ contentType: 'application/javascript', body: `${cb}(${JSON.stringify(corpo)});` });
    });
    await page.goto(MOCK);
    await page.evaluate(({ prefs, lang }) => {
        localStorage.setItem('cw_onboarding_seen_v1', 'true');
        localStorage.setItem('cw_ui_lang', lang);
        if (prefs) localStorage.setItem('cw_user_prefs_v1', JSON.stringify(prefs));
    }, { prefs, lang });
    await page.addScriptTag({ content: bundle });
    await page.waitForSelector('#cw-btn-more', { state: 'attached', timeout: 30000 });
    await page.waitForFunction(() => document.querySelector('.cw-pill.arriving'), null, { timeout: 30000 });
    await page.waitForTimeout(600);
    return page;
}

// CW_ONLY=<trecho do nome> roda só os testes que combinam (depuração).
async function check(name, fn, opts) {
    if (process.env.CW_ONLY && !name.includes(process.env.CW_ONLY)) return;
    let page;
    try {
        page = await boot(opts);
        await fn(page);
        igual(page.erros, [], 'erros de página');
        console.log('  ✓ ' + name);
    } catch (e) {
        console.log('  ✗ ' + name + '\n      ' + e.message.split('\n')[0]);
        fail++;
    } finally {
        if (page) await page.close();
    }
}

const ordemPilula = (page) => page.evaluate(
    () => [...document.querySelectorAll('.cw-pill > .cw-btn')].map((b) => b.id.replace('cw-btn-', '')));
const ordemGaveta = (page) => page.evaluate(
    () => [...document.querySelectorAll('.cw-drawer .cw-btn')].map((b) => b.id.replace('cw-btn-', '')));
const salvo = (page) => page.evaluate(
    () => JSON.parse(localStorage.getItem('cw_user_prefs_v1') || '{}').pillLayout);
const classe = (page, sel, nome) => page.evaluate(
    ([s, n]) => document.querySelector(s).classList.contains(n), [sel, nome]);
const centro = (page, sel) => page.evaluate((s) => {
    const r = document.querySelector(s).getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}, sel);

async function abrirPilula(page) {
    await page.locator('.cw-pill').click({ force: true });
    await page.waitForTimeout(1000);
}
async function abrirGaveta(page) {
    await page.locator('#cw-btn-more').click();
    await page.waitForFunction(() => document.querySelector('.cw-drawer.open'));
    await page.waitForTimeout(450); // termina a transição de entrada antes de medir
}
// Configurações pelo Ctrl+K: é o caminho que não mexe na gaveta.
async function abrirConfiguracoes(page) {
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 8000 });
    await page.keyboard.type('config', { delay: 20 });
    await page.waitForTimeout(400);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#configs-popup.open', { timeout: 8000 });
    await page.waitForTimeout(700);
}
// De onde a janela nasce/volta: transform-origin + caixa em repouso.
async function ancoraDa(page, popupId, caixaEmRepouso) {
    return page.evaluate(([id, box]) => {
        const p = document.getElementById(id);
        const [ox, oy] = p.style.transformOrigin.split(' ').map(parseFloat);
        return { x: box.left + ox, y: box.top + oy };
    }, [popupId, caixaEmRepouso]);
}
// O confirmDialog só resolve a promessa DEPOIS de animar a saída (300ms). Esperar
// um tempo fixo lê o estado antes de a ação rodar; o que marca "terminou" é o
// diálogo sair do DOM.
async function confirmar(page, botao) {
    await page.locator(botao).click();
    await page.locator(botao).waitFor({ state: 'detached', timeout: 3000 });
}

// Arrasto com a mão, em passos. O dragTo() do Playwright dispara o dragstart e
// para: sem os movimentos intermediários o Chromium nunca emite dragenter/drop,
// o arrasto "começa" e morre, e o teste reprova um produto que funciona (medido
// com os eventos instrumentados). Não troque por dragTo().
async function arrastar(page, origem, destino) {
    const o = await origem.boundingBox();
    const d = await destino.boundingBox();
    await page.mouse.move(o.x + o.width / 2, o.y + o.height / 2);
    await page.mouse.down();
    await page.mouse.move(o.x + o.width / 2 + 5, o.y + o.height / 2 + 5, { steps: 5 });
    await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2, { steps: 15 });
    await page.mouse.up();
    await page.waitForTimeout(200);
}

// A janela de Configurações rola e boundingBox() não: sem trazer a fronteira
// entre as duas listas para o meio da área visível, o mouse solta fora do alvo.
const centralizarFronteira = (page) => page.locator('#configs-popup .js-pl-drawer-title')
    .evaluate((el) => el.scrollIntoView({ block: 'center' }));

const caixa = (page, id) => page.evaluate((i) => {
    const r = document.getElementById(i).getBoundingClientRect();
    return { left: r.left, top: r.top };
}, id);

console.log('\n--- Smoke: pílula com gaveta e layout por agente ---');

// ------------------------------------------------------------------ padrão
await check('padrão: fixados + Mais na pílula, o resto na gaveta, todo id uma vez só', async (page) => {
    igual(await ordemPilula(page), [...PADRAO_FIXADOS, 'more'], 'pílula');
    igual(await ordemGaveta(page), PADRAO_GAVETA, 'gaveta');
    for (const id of [...PADRAO_FIXADOS, ...PADRAO_GAVETA]) {
        const n = await page.locator(`#cw-btn-${id}`).count();
        if (n !== 1) throw new Error(`#cw-btn-${id} aparece ${n}x`);
    }
});

await check('a pílula aberta cabe num viewport de 650px (antes cortava 56px no topo)', async (page) => {
    await abrirPilula(page);
    const r = await page.evaluate(() => {
        const b = document.querySelector('.cw-pill').getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, vh: innerHeight };
    });
    if (r.top < 0) throw new Error(`topo da pílula em ${Math.round(r.top)}px: o punho de arrastar fica fora da tela`);
    if (r.bottom > r.vh) throw new Error(`base da pílula em ${Math.round(r.bottom)}px, viewport ${r.vh}px`);
});

// ----------------------------------------------------------------- cascata
await check('cascata: o atraso vem do índice e acompanha a ordem escolhida', async (page) => {
    const atraso = (id) => page.evaluate((i) => {
        const v = getComputedStyle(document.getElementById(`cw-btn-${i}`)).transitionDelay.split(',')[0];
        return parseFloat(v);
    }, id);

    // Pílula começa colapsada. Fluxo: punho 0, email 1, notes 2, script 3,
    // separador 4, Mais 5 (--cw-n = 5). Saída = (n - i) * 0.02s.
    perto(await atraso('email'), 0.08, 0.005, 'saída do email');
    perto(await atraso('notes'), 0.06, 0.005, 'saída do notes');
    perto(await atraso('more'), 0, 0.005, 'saída do Mais (último a entrar, primeiro a sair)');

    await abrirPilula(page);
    // Entrada = 0.15s + 0.02s * i.
    perto(await atraso('email'), 0.17, 0.005, 'entrada do email');
    perto(await atraso('notes'), 0.19, 0.005, 'entrada do notes');
    perto(await atraso('more'), 0.25, 0.005, 'entrada do Mais');
}, { prefs: { pillLayout: { pinned: ['email', 'notes', 'script'], drawer: [] } } });

// ------------------------------------------------------------------ gaveta
await check('gaveta: abre para dentro da tela, fecha clicando fora e ao escolher um módulo fixado', async (page) => {
    await abrirPilula(page);
    await abrirGaveta(page);

    igual(await page.getAttribute('#cw-btn-more', 'aria-expanded'), 'true', 'aria-expanded aberta');
    // Não é um menu (os itens são botões navegados por Tab): sem aria-haspopup,
    // que anunciaria "botão de menu" e prometeria navegação por setas.
    igual(await page.getAttribute('#cw-btn-more', 'aria-haspopup'), null, 'sem aria-haspopup="menu"');
    igual(await page.evaluate(() => {
        const alvo = document.getElementById(document.getElementById('cw-btn-more').getAttribute('aria-controls'));
        return !!alvo && alvo.classList.contains('cw-drawer');
    }), true, 'aria-controls aponta para a gaveta');
    const g = await page.evaluate(() => {
        const d = document.querySelector('.cw-drawer').getBoundingClientRect();
        const p = document.querySelector('.cw-pill').getBoundingClientRect();
        return { left: d.left, right: d.right, top: d.top, bottom: d.bottom, pillLeft: p.left, vw: innerWidth, vh: innerHeight };
    });
    if (g.left < 0 || g.top < 0 || g.right > g.vw || g.bottom > g.vh) throw new Error('gaveta fora da tela: ' + JSON.stringify(g));
    if (g.right > g.pillLeft) throw new Error('a gaveta cobre a pílula em vez de abrir ao lado dela');

    await page.mouse.click(300, 300); // vazio da página
    await page.waitForTimeout(350);
    igual(await classe(page, '.cw-drawer', 'open'), false, 'fechou por clique fora');
    igual(await page.getAttribute('#cw-btn-more', 'aria-expanded'), 'false', 'aria-expanded fechada');

    await abrirGaveta(page);
    await page.locator('#cw-btn-notes').click(); // módulo fixado, com a gaveta aberta
    await page.waitForTimeout(350);
    igual(await classe(page, '.cw-drawer', 'open'), false, 'fechou ao escolher um fixado');
});

await check('gaveta: mouse nela segura a pílula; sair das duas recolhe tudo', async (page) => {
    await abrirPilula(page);
    await abrirGaveta(page);
    const c = await centro(page, '.cw-drawer');
    await page.mouse.move(c.x, c.y);
    await page.waitForTimeout(3700); // mais que os 3s do auto-fechamento
    igual(await classe(page, '.cw-pill', 'collapsed'), false, 'pílula aberta com o mouse na gaveta');
    igual(await classe(page, '.cw-drawer', 'open'), true, 'gaveta aberta com o mouse nela');

    await page.mouse.move(200, 200);
    await page.waitForTimeout(3700);
    igual(await classe(page, '.cw-pill', 'collapsed'), true, 'pílula recolheu');
    igual(await classe(page, '.cw-drawer', 'open'), false, 'a gaveta foi junto');
});

// ------------------------------------------- módulo aberto a partir da gaveta
await check('módulo da gaveta: Mais espelha, pílula não recolhe, genie sai e volta pelo Mais, Esc fecha só a gaveta', async (page) => {
    await abrirPilula(page);
    await abrirGaveta(page);
    const botaoAberto = await centro(page, '#cw-btn-configs'); // gaveta aberta: posição real

    await page.locator('#cw-btn-configs').click();
    await page.waitForSelector('#configs-popup.open', { timeout: 8000 });
    await page.waitForTimeout(900);

    igual(await classe(page, '.cw-drawer', 'open'), false, 'gaveta fecha ao escolher');
    igual(await classe(page, '#cw-btn-configs', 'active'), true, 'botão do módulo ativo');
    igual(await classe(page, '#cw-btn-more', 'active'), true, 'Mais espelha o módulo guardado aberto');

    // O genie nasceu do botão visível na gaveta aberta...
    const repouso = await caixa(page, 'configs-popup');
    const abertura = await ancoraDa(page, 'configs-popup', repouso);
    perto(abertura.x, botaoAberto.x, 3, 'origem da janela (x)');
    perto(abertura.y, botaoAberto.y, 3, 'origem da janela (y)');

    // ...e a pílula não recolhe por baixo de um módulo aberto, mesmo sem mouse.
    await page.mouse.move(200, 200);
    await page.waitForTimeout(3700);
    igual(await classe(page, '.cw-pill', 'collapsed'), false, 'pílula aberta com módulo guardado aberto');

    await page.locator('#cw-btn-more').click();
    await page.waitForFunction(() => document.querySelector('.cw-drawer.open'));
    await page.waitForTimeout(450);

    // Clicar na gaveta não é "clicar no vazio": o módulo aberto não pode ir para
    // idle (esmaecido, atrás das outras janelas) só porque o clique foi nela.
    const gav = await page.evaluate(() => {
        const r = document.querySelector('.cw-drawer').getBoundingClientRect();
        // Meio da borda superior: padding retilíneo, fora de qualquer botão. O
        // canto não serve - o border-radius (22px) deixa o clique passar pela
        // curva para a página por baixo.
        return { x: r.left + r.width / 2, y: r.top + 4 };
    });
    await page.mouse.click(gav.x, gav.y);
    await page.waitForTimeout(150);
    igual(await classe(page, '#configs-popup', 'idle'), false, 'clique na gaveta não põe o módulo em idle');
    igual(await classe(page, '.cw-drawer', 'open'), true, 'clique no padding da gaveta não a fecha');

    // Esc com a gaveta aberta fecha SÓ a gaveta; o segundo Esc fecha o módulo.
    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);
    igual(await classe(page, '.cw-drawer', 'open'), false, 'Esc fechou a gaveta');
    igual(await classe(page, '#configs-popup', 'open'), true, 'Esc NÃO fechou o módulo junto');

    // Na volta, a gaveta está fechada: a janela é sugada pelo Mais, não por um
    // botão escondido.
    const mais = await centro(page, '#cw-btn-more');
    await page.waitForTimeout(450);
    await page.locator('#configs-popup .cw-header-close').click();
    const volta = await ancoraDa(page, 'configs-popup', repouso);
    perto(volta.x, mais.x, 3, 'destino da janela (x)');
    perto(volta.y, mais.y, 3, 'destino da janela (y)');
    await page.waitForTimeout(700);
    igual(await classe(page, '#cw-btn-more', 'active'), false, 'Mais volta ao normal com o módulo fechado');
});

// -------------------------------------------------------------------- sinais
await check('módulo guardado não fica mudo: aviso de Avisos e rascunho do Notes acendem o Mais', async (page) => {
    await abrirPilula(page);
    const temSinal = () => classe(page, '#cw-btn-more', 'has-signal');
    igual(await ordemGaveta(page), ['notes', 'broadcast', 'configs'], 'notes e broadcast guardados');
    igual(await temSinal(), false, 'sem aviso nenhum');

    // O que broadcast-assistant (updateBadge) e updateNotesBadge fazem: mexem só
    // no botão do próprio módulo, achado por id.
    await page.evaluate(() => {
        const b = document.createElement('div'); b.className = 'cw-badge';
        document.getElementById('cw-btn-broadcast').appendChild(b);
    });
    await page.waitForTimeout(50);
    igual(await temSinal(), true, 'badge de Avisos acende o Mais');
    await page.evaluate(() => document.querySelector('#cw-btn-broadcast .cw-badge').remove());
    await page.waitForTimeout(50);
    igual(await temSinal(), false, 'apagou ao ler');

    await page.evaluate(() => {
        const d = document.createElement('div'); d.className = 'cw-dot-dirty';
        document.getElementById('cw-btn-notes').appendChild(d);
    });
    await page.waitForTimeout(50);
    igual(await temSinal(), true, 'rascunho do Case Notes acende o Mais');
}, { prefs: { pillLayout: { pinned: ['email', 'script', 'links', 'precall', 'bauform', 'library', 'timezone'], drawer: ['notes', 'broadcast', 'configs'] } } });

// -------------------------------------------------------------- persistência
await check('persistência: o layout salvo vale no boot; módulo que ele não conhece vai para a gaveta', async (page) => {
    igual(await ordemPilula(page), ['notes', 'more'], 'pílula do agente');
    // configs e library na ordem dele; o resto, no fim, na ordem histórica.
    igual((await ordemGaveta(page)).slice(0, 2), ['configs', 'library'], 'ordem dele na gaveta');
    igual((await ordemGaveta(page)).length, 9, 'nenhum módulo ficou inalcançável');
}, { prefs: { pillLayout: { pinned: ['notes'], drawer: ['configs', 'library'] } } });

await check('persistência: lixo salvo na nuvem não derruba a pílula (vale o padrão)', async (page) => {
    igual(await ordemPilula(page), [...PADRAO_FIXADOS, 'more'], 'pílula');
}, { prefs: { pillLayout: { pinned: 'notes', drawer: 7 } } });

await check('sincronia: o layout da nuvem chega depois do primeiro frame e a pílula se reorganiza', async (page) => {
    // Máquina nova: o cache local está vazio, a pílula nasce com o padrão e só
    // depois (UserPrefsService.sync, ~2.5s após o boot) a nuvem entrega o layout
    // do agente. Sem o refresh() ligado em app.js, a sincronia grava no cache e
    // a pílula, desenhada uma vez, fica no padrão até o próximo boot.
    await page.waitForFunction(
        () => [...document.querySelectorAll('.cw-pill > .cw-btn')].map((b) => b.id).join() === 'cw-btn-configs,cw-btn-notes,cw-btn-more',
        null, { timeout: 8000 },
    ).catch(() => { });
    igual(await ordemPilula(page), ['configs', 'notes', 'more'], 'pílula depois da sincronia');
    igual((await ordemGaveta(page)).slice(0, 1), ['email'], 'gaveta depois da sincronia');
}, { nuvem: { prefs: { pillLayout: { pinned: ['configs', 'notes'], drawer: ['email'] } } } });

// ------------------------------------------------------------ Configurações
await check('Configurações: mover, reordenar por teclado, arrastar, teto e restaurar — a pílula acompanha', async (page) => {
    await abrirConfiguracoes(page);
    const item = (id) => page.locator(`#configs-popup .cw-pl-item[data-id="${id}"]`);
    const contador = () => page.locator('#configs-popup .js-pl-count');

    // a) padrão: a pílula está no teto, então trazer da gaveta está bloqueado.
    igual(await contador().textContent(), '7/7', 'contador');
    igual(await contador().evaluate((e) => e.classList.contains('full')), true, 'contador marcado como cheio');
    for (const id of PADRAO_GAVETA) {
        igual(await item(id).locator('.cw-pl-move').isDisabled(), true, `mover ${id} para a pílula bloqueado`);
    }

    // b) pílula -> gaveta
    await item('email').locator('.cw-pl-move').click();
    igual(await ordemPilula(page), ['notes', 'precall', 'bauform', 'script', 'links', 'broadcast', 'more'], 'pílula sem email');
    igual(await ordemGaveta(page), [...PADRAO_GAVETA, 'email'], 'email no fim da gaveta');
    igual(await contador().textContent(), '6/7', 'contador depois de guardar');
    igual((await salvo(page)).drawer.at(-1), 'email', 'persistido no cache local');

    // c) gaveta -> pílula (agora há vaga)
    await item('library').locator('.cw-pl-move').click();
    igual((await ordemPilula(page)).slice(-2), ['library', 'more'], 'library no fim dos fixados');

    // d) teclado: seta para cima no punho
    await item('library').locator('.cw-pl-grip').focus();
    await page.keyboard.press('ArrowUp');
    igual((await ordemPilula(page)).slice(-3), ['library', 'broadcast', 'more'], 'library subiu uma posição');
    igual(await page.evaluate(() => document.activeElement.closest('.cw-pl-item')?.dataset.id), 'library',
        'o foco do teclado ficou no mesmo módulo');

    // e) arrastar: links (fixado) para cima do configs (gaveta) = entra antes dele
    await centralizarFronteira(page);
    await arrastar(page, item('links').locator('.cw-pl-grip'), item('configs'));
    igual((await ordemGaveta(page)).slice(0, 3), ['timezone', 'links', 'configs'], 'links entrou antes do configs');
    igual((await ordemPilula(page)).includes('links'), false, 'saiu da pílula');

    // f) teto: encher a pílula e tentar passar
    await item('configs').locator('.cw-pl-move').click();
    igual(await contador().textContent(), '7/7', 'pílula cheia de novo');
    const antes = await salvo(page);
    await centralizarFronteira(page);
    await arrastar(page, item('timezone').locator('.cw-pl-grip'), item('broadcast'));
    await page.getByText('A pílula comporta no máximo 7 módulos').waitFor({ timeout: 3000 });
    igual(await salvo(page), antes, 'o arrasto recusado não alterou nada');
    igual((await ordemPilula(page)).includes('timezone'), false, 'timezone não entrou na pílula cheia');

    // g) restaurar padrão (com confirmação)
    await page.locator('#configs-popup .js-pl-reset').click();
    await confirmar(page, '#cw-conf-ok');
    igual(await ordemPilula(page), [...PADRAO_FIXADOS, 'more'], 'pílula restaurada');
    igual(await ordemGaveta(page), PADRAO_GAVETA, 'gaveta restaurada');
    igual(await salvo(page), null, 'padrão do código, e não uma cópia dele, fica salvo');
});

await check('Configurações: restaurar pede confirmação e cancelar não muda nada', async (page) => {
    await abrirConfiguracoes(page);
    await page.locator('#configs-popup .cw-pl-item[data-id="email"] .cw-pl-move').click();
    const customizado = await ordemPilula(page);
    await page.locator('#configs-popup .js-pl-reset').click();
    await confirmar(page, '#cw-conf-cancel');
    igual(await ordemPilula(page), customizado, 'cancelou: a pílula segue customizada');
});

// -------------------------------------------------------------------- idioma
await check('idioma: dicas, gaveta e seção seguem a troca com o app aberto', async (page) => {
    await abrirConfiguracoes(page);
    igual(await page.getAttribute('#cw-btn-broadcast', 'data-label'), 'Avisos', 'PT');
    igual(await page.locator('#configs-popup .js-pl-title').textContent(), 'Pílula e Gaveta', 'seção PT');

    await page.locator('#cw-config-lang-toggle button[data-lang="en"]').click();
    await page.waitForTimeout(200);
    igual(await page.getAttribute('#cw-btn-broadcast', 'data-label'), 'Broadcast', 'dica da pílula em EN');
    igual(await page.getAttribute('#cw-btn-more', 'aria-label'), 'More modules', 'botão Mais em EN');
    igual(await page.locator('.cw-drawer-tile', { has: page.locator('#cw-btn-timezone') }).locator('.cw-drawer-label').textContent(),
        'Time Zones', 'rótulo da gaveta em EN');
    igual(await page.locator('#configs-popup .js-pl-title').textContent(), 'Pill & Drawer', 'seção EN');

    await page.locator('#cw-config-lang-toggle button[data-lang="es"]').click();
    await page.waitForTimeout(200);
    igual(await page.getAttribute('#cw-btn-configs', 'data-label'), 'Configuración', 'dica da pílula em ES');
});

// ------------------------------------------------------------- sem movimento
await check('prefers-reduced-motion: a gaveta abre e fecha sem depender de transição', async (page) => {
    await abrirPilula(page);
    await abrirGaveta(page);
    const visivel = await page.evaluate(() => {
        const d = getComputedStyle(document.querySelector('.cw-drawer'));
        return d.visibility === 'visible' && Number(d.opacity) > 0.99;
    });
    igual(visivel, true, 'gaveta visível');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    igual(await classe(page, '.cw-drawer', 'open'), false, 'fechou');
}, { reducedMotion: true });

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke da pílula: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
