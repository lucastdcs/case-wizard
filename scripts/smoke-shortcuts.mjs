// scripts/smoke-shortcuts.mjs
//
// Smoke end-to-end dos atalhos do Ctrl+K, no navegador de verdade, sobre o
// mock-crm.html. É o único teste que exercita o que o agente realmente faz:
// abrir o palette, disparar o atalho e ver a nota montada.
//
// Existe porque a parte cara desta feature é temporal - openWithPreset()
// encadeia animação do genie, troca de <select>, rebuild do formulário e clique
// nos chips, tudo com esperas. Nada disso aparece num teste de unidade: se a
// ordem quebrar, o teste de serviço continua verde e a nota abre vazia.
//
// Uso: npm run smoke:shortcuts

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

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// A API real (Apps Script) não responde daqui: qualquer JSONP fica pendurado
// até o watchdog de 15s. Cortar as chamadas na origem deixa o app no caminho
// "sem nuvem", que é justamente o que precisa continuar funcionando.
await page.route('**script.google.com/**', (route) => route.abort());

page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });

await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
await page.evaluate(() => {
    localStorage.setItem('cw_onboarding_seen_v1', 'true');
    localStorage.setItem('cw_changelog_seen_version', '99.9');
});
await page.addScriptTag({ content: script });

// A pílula só termina de aparecer depois da animação de abertura (~11s). O
// Ctrl+K, porém, é registrado no document já na inicialização - e é por ele que
// este teste entra em tudo, justamente como o agente que usa atalhos faria.
await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
await page.waitForTimeout(12000);

const dialogCancel = page.locator('#cw-conf-cancel');
if (await dialogCancel.isVisible().catch(() => false)) await dialogCancel.click();

console.log('\n--- Smoke: atalhos do Ctrl+K no navegador ---');

// Cada verificação abre o palette do zero. A seleção do Ctrl+K é estado
// (selectedIndex) e vaza entre passos: a primeira versão deste teste passou a
// falhar porque um ArrowDown de um passo anterior deslocava o Enter do
// seguinte, e o que abria era o módulo errado.
async function abrirPalette(busca = '') {
    const jaAberto = await page.locator('.cw-palette-overlay.active').isVisible().catch(() => false);
    if (jaAberto) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(400);
    }
    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active', { timeout: 5000 });
    if (busca) {
        await page.fill('.cw-palette-input', busca);
        await page.waitForTimeout(200);
    }
}

await check('Ctrl+K abre o palette com o grupo "Meus atalhos" antes dos módulos', async () => {
    await abrirPalette();

    const grupos = await page.locator('.cw-palette-group').allTextContents();
    if (grupos[0] !== 'Meus atalhos') throw new Error('primeiro grupo: ' + JSON.stringify(grupos));
    if (!grupos.includes('Módulos')) throw new Error('faltou o grupo de módulos: ' + JSON.stringify(grupos));
});

await check('os dois atalhos semeados aparecem no topo', async () => {
    const itens = await page.locator('.cw-palette-item .cw-palette-item-label').allTextContents();
    if (!itens[0].includes('NI Attempted')) throw new Error('primeiro item: ' + itens[0]);
    if (!itens[1].includes('IN Not Reachable')) throw new Error('segundo item: ' + itens[1]);
});

await check('a busca pelo apelido ("2day") encontra os atalhos', async () => {
    await abrirPalette('2day');
    const itens = await page.locator('.cw-palette-item .cw-palette-item-label').allTextContents();
    if (!itens.length) throw new Error('o apelido não encontrou nada');
    if (itens.some((i) => i === 'Case Notes')) throw new Error('a busca não filtrou os módulos');
});

await check('a seta para baixo navega sem travar no cabeçalho de grupo', async () => {
    await abrirPalette();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    const selecionado = await page.locator('.cw-palette-item.selected .cw-palette-item-label').textContent();
    if (!selecionado.includes('IN Not Reachable')) throw new Error('selecionado: ' + selecionado);

    // Terceiro item: o cabeçalho "Módulos" fica entre ele e o anterior no DOM,
    // mas não pode consumir um passo da navegação.
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    const terceiro = await page.locator('.cw-palette-item.selected .cw-palette-item-label').textContent();
    if (terceiro !== 'Case Notes') throw new Error('o cabeçalho engoliu um passo: ' + terceiro);
});

await check('Enter no atalho abre o Case Notes já no substatus certo, com o cenário aplicado', async () => {
    await abrirPalette('Not Reachable');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#sub-status-select', { timeout: 10000 });
    await page.waitForFunction(
        () => document.querySelector('#sub-status-select')?.value === 'IN_Not_Reachable',
        { timeout: 10000 }
    );

    const status = await page.inputValue('#main-status-select');
    if (status !== 'IN') throw new Error('status principal: ' + status);

    // O cenário do atalho preenche o motivo - é a prova de que o chip foi
    // clicado de verdade, não só que o substatus mudou.
    await page.waitForFunction(
        () => (document.querySelector('#field-REASON_COMMENTS')?.value || '').includes('2 Day Rule'),
        { timeout: 10000 }
    );
});

await check('o cursor já fica no campo que falta preencher', async () => {
    // O foco chega DEPOIS do texto dos cenários (fim do openWithPreset), então
    // precisa de espera própria - ler logo após o texto pegava o body.
    await page.waitForFunction(
        () => document.activeElement && document.activeElement.id === 'field-SPEAKEASY_ID',
        { timeout: 10000 }
    );
    // O realce âmbar (cw-quicklaunch-pending) dura 2,4s e some sozinho; o foco
    // é o efeito que permanece - e é o que faz o agente sair do atalho já
    // digitando o SE ID em vez de procurar onde clicar.
    const realce = await page.locator('#field-SPEAKEASY_ID.cw-quicklaunch-pending').count();
    if (!realce) throw new Error('o campo pendente não foi realçado');
});

await check('"Salvar como atalho" cria um terceiro atalho a partir da tela montada', async () => {
    const btn = page.locator('.cw-save-shortcut-btn');
    await btn.scrollIntoViewIfNeeded();
    await btn.click();

    await page.waitForSelector('#cw-prompt-input', { timeout: 5000 });
    await page.fill('#cw-prompt-input', 'Meu atalho de teste');
    await page.click('#cw-prompt-ok');
    await page.waitForTimeout(600);

    const salvos = await page.evaluate(() => {
        const prefs = JSON.parse(localStorage.getItem('cw_user_prefs_v1') || '{}');
        return (prefs.shortcuts || []).map((s) => s.label);
    });
    if (!salvos.includes('Meu atalho de teste')) throw new Error('salvos: ' + JSON.stringify(salvos));
    if (salvos.length !== 3) throw new Error(`esperava 2 padrões + 1 novo, veio ${salvos.length}`);
});

await check('o atalho novo aparece no Ctrl+K na abertura seguinte', async () => {
    await abrirPalette();
    const itens = await page.locator('.cw-palette-item .cw-palette-item-label').allTextContents();
    if (!itens.includes('Meu atalho de teste')) throw new Error('itens: ' + JSON.stringify(itens));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
});

await check('Configurações lista os atalhos e permite excluir um', async () => {
    // Fecha o Case Notes antes: os popups se sobrepõem, e o de Notes ficaria
    // por cima interceptando os cliques de Configurações. O próprio Ctrl+K é o
    // jeito de alternar.
    await abrirPalette('Case Notes');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);

    await abrirPalette('configuracoes');
    await page.keyboard.press('Enter');

    await page.waitForSelector('.cw-sc-item', { timeout: 10000 });
    // Espera o voo do genie terminar: clicar durante a animação é instável.
    await page.waitForTimeout(1000);

    const antes = await page.locator('.cw-sc-item').count();
    if (antes !== 3) throw new Error(`esperava 3 atalhos na lista, veio ${antes}`);

    const alvo = page.locator('.cw-sc-item', { hasText: 'Meu atalho de teste' }).locator('.js-sc-del');
    await alvo.scrollIntoViewIfNeeded();
    await alvo.click();
    await page.waitForSelector('#cw-conf-ok', { timeout: 5000 });
    await page.click('#cw-conf-ok');
    await page.waitForTimeout(600);

    const depois = await page.locator('.cw-sc-item').count();
    if (depois !== 2) throw new Error(`esperava 2 depois de excluir, veio ${depois}`);
});

await check('apelido com HTML aparece como texto, não é interpretado', async () => {
    // O nome e o apelido são texto do agente. Antes o apelido era interpolado
    // num innerHTML: um "<" quebrava a linha e uma tag executava.
    await page.evaluate(() => {
        const prefs = JSON.parse(localStorage.getItem('cw_user_prefs_v1') || '{}');
        prefs.shortcuts = [{
            id: 'sc_xss', kind: 'note', label: 'Teste', order: 0,
            alias: '<img src=x onerror="window.__executou=true">',
            payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [] },
        }];
        localStorage.setItem('cw_user_prefs_v1', JSON.stringify(prefs));
        window.__executou = false;
    });

    // Reabre Configurações para a seção se redesenhar com o dado plantado.
    await abrirPalette('configuracoes');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(700);
    await abrirPalette('configuracoes');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.cw-sc-item', { timeout: 10000 });
    await page.waitForTimeout(700);

    const executou = await page.evaluate(() => window.__executou === true);
    if (executou) throw new Error('o HTML do apelido foi executado');

    const imgs = await page.locator('.cw-sc-meta img').count();
    if (imgs) throw new Error('o apelido virou elemento no DOM');

    const texto = await page.locator('.cw-sc-meta').first().textContent();
    if (!texto.includes('<img')) throw new Error('o apelido não apareceu como texto: ' + texto);
});

await check('a lista de Configurações segue a mesma ordem do Ctrl+K', async () => {
    await page.evaluate(() => {
        const prefs = JSON.parse(localStorage.getItem('cw_user_prefs_v1') || '{}');
        prefs.shortcuts = [
            { id: 'sc_a', kind: 'note', label: 'Alpha', alias: '', order: 0, payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [] } },
            { id: 'sc_b', kind: 'note', label: 'Beta', alias: '', order: 1, payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [] } },
        ];
        prefs.shortcutsSortByUsage = true;
        localStorage.setItem('cw_user_prefs_v1', JSON.stringify(prefs));
        // Beta usado duas vezes: no modo padrão ele tem que vir primeiro nos DOIS lugares.
        localStorage.setItem('cw_shortcut_usage_v1', JSON.stringify({ sc_b: 2 }));
    });

    await abrirPalette();
    const noPalette = (await page.locator('.cw-palette-item .cw-palette-item-label').allTextContents()).slice(0, 2);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    await abrirPalette('configuracoes');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.cw-sc-item', { timeout: 10000 });
    await page.waitForTimeout(700);
    const emConfigs = await page.locator('.cw-sc-item .cw-sc-label').allTextContents();

    if (noPalette[0] !== 'Beta') throw new Error('o palette não ordenou por uso: ' + JSON.stringify(noPalette));
    if (emConfigs[0] !== 'Beta') throw new Error('Configurações mostrou outra ordem: ' + JSON.stringify(emConfigs));
});

await check('o construtor de Configurações só oferece cenários do substatus escolhido', async () => {
    // O popup ainda está terminando o voo do genie; clicar no meio da animação
    // é instável (o alvo se move debaixo do ponteiro).
    await page.waitForTimeout(1000);
    await page.locator('.cw-sc-add').scrollIntoViewIfNeeded();
    await page.click('.cw-sc-add');
    await page.waitForSelector('#cw-sc-status', { timeout: 5000 });

    await page.selectOption('#cw-sc-status', 'IN');
    await page.selectOption('#cw-sc-sub', 'IN_Not_Reachable');
    await page.waitForTimeout(300);

    const chips = await page.locator('.cw-sc-chip').allTextContents();
    if (!chips.length) throw new Error('nenhum cenário oferecido');
    if (chips.some((c) => c.startsWith('cw ') || c.includes('quickfill'))) {
        throw new Error('nome de cenário cru na tela: ' + JSON.stringify(chips));
    }
});

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
