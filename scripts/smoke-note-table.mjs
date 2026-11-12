// scripts/smoke-note-table.mjs
//
// Smoke da nota em tabela (módulo `notetable`, ADR-0024) no navegador de verdade,
// sobre o mock-crm.html. É a tela real fazendo o roteiro de
// docs/media/case-notes-table/preview-checks.cjs (que mede o protótipo): as regras
// de comportamento da spec (§5 a §9) e as de desenho (grade de 4px, pesos 400/500,
// sem borda chapada, alvos de 32px, `transition` sem `all`), medidas no DOM.
//
// O mock ganha o que a nota lê e escreve: as tasks e a data do appointment, o
// Sales program e o gatilho do editor de nota (o ícone `description` num
// `material-fab` que abre um `contenteditable`, por onde ensureNoteCardIsOpen()
// entra). Interface em ES e atendimento em PT (o `Business language` do mock é
// português): os dois knobs divergentes, o pior caso para texto com dono errado.
//
// Uso: npm run smoke:note-table   (CW_CHROMIUM=/caminho/do/chromium se precisar)
//      CW_SHOT_DIR=/tmp/x npm run smoke:note-table   (salva capturas de tela)

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

const bundle = await build({ entryPoints: [resolve(raiz, 'src/app.js')], bundle: true, write: false, logLevel: 'silent' });
const script = bundle.outputFiles[0].text;
const modelOut = await build({ entryPoints: [resolve(raiz, 'src/modules/notes-table/note-table-model.js')], bundle: true, write: false, format: 'cjs', platform: 'node', logLevel: 'silent' });
const M = { exports: {} };
new Function('module', 'exports', modelOut.outputFiles[0].text)(M, M.exports);
const { addBusinessDays, isoDate } = M.exports;

let fail = 0;
let total = 0;
async function check(name, fn) {
    total++;
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message.split('\n')[0]); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}
function ok(cond, oque) { if (!cond) throw new Error(oque); }

const executablePath = process.env.CW_CHROMIUM || undefined;
const shotDir = process.env.CW_SHOT_DIR || null;
const browser = await chromium.launch({ headless: true, executablePath });
console.log(`Chromium lançado: ${browser.version()}`);

const POP = '#cw-notetable-popup';

async function abrirCrm({ width = 1440, height = 900, tasks = ['ads_conversion_tracking', 'ga4_event_tracking'], appt = isoDate(new Date()) + ' 12:00' } = {}) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.route('**script.google.com/**', (route) => route.abort());
    const errors = [];
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    page.on('console', (m) => {
        // O mock não tem backend: o JSONP bloqueado acima gera esses dois, que não são da tela.
        if (m.type() === 'error' && !/Failed to load resource|JSONP/.test(m.text())) errors.push('console: ' + m.text());
    });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate(({ tasks, appt }) => {
        localStorage.setItem('cw_onboarding_seen_v1', 'true');
        localStorage.setItem('cw_ui_lang', 'es');
        localStorage.setItem('cw_output_lang', 'pt');
        const field = (label, values) => `<cuf-form-field><div class="form-label">${label}</div>${values.map((v) => `<div debug-id="html-value">${v}</div>`).join('')}</cuf-form-field>`;
        document.querySelector('.content').insertAdjacentHTML('beforeend',
            field('Appointment tasks', tasks) + field('Appointment time', [appt]) + field('Sales program', ['umm_scaled'])
            + '<material-fab id="mock-note-fab"><i class="material-icons-extended">description</i></material-fab>');
        document.getElementById('mock-note-fab').addEventListener('click', () => {
            const editor = document.createElement('div');
            editor.className = 'mock-note-editor';
            editor.style.cssText = 'position:fixed;left:-9999px;top:0';
            editor.contentEditable = 'true';
            document.body.appendChild(editor);
        });
    }, { tasks, appt });
    await page.addScriptTag({ content: script });
    await page.waitForSelector('#cw-btn-notetable', { state: 'attached', timeout: 30000 });
    await page.waitForTimeout(12000);
    const cancel = page.locator('#cw-conf-cancel');
    if (await cancel.count()) await cancel.click().catch(() => {});
    return { page, errors };
}

const { page, errors } = await abrirCrm();
const row = (id) => page.locator(`${POP} .nt-form [data-row="${id}"]`);
const prev = () => page.locator(`${POP} .nt-note-card`).innerHTML();
const pick = async (name) => {
    await page.click(`${POP} [data-role="substatus"]`);
    await page.locator(`${POP} .nt-pop .nt-opt`, { hasText: new RegExp('^' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).first().click();
};
const openNota = async () => { if ((await page.locator(`${POP} [data-role="note"]`).getAttribute('aria-expanded')) !== 'true') await page.click(`${POP} [data-role="note"]`); };
const closeNota = async () => { if ((await page.locator(`${POP} [data-role="note"]`).getAttribute('aria-expanded')) === 'true') await page.click(`${POP} [data-role="note"]`); };
const shot = async (n) => { if (shotDir) await page.screenshot({ path: `${shotDir}/${n}.png` }); };
const editorHtml = () => page.evaluate(() => [...document.querySelectorAll('.mock-note-editor')].map((e) => e.innerHTML).join('\n---\n'));

console.log('\nAbrir, registro e começo');

await check('o módulo novo está registrado: botão na gaveta da pílula (não fixado) e ação no Ctrl+K', async () => {
    ok(await page.locator('#cw-drawer #cw-btn-notetable').count() === 1, 'não está na gaveta');
    ok(await page.locator('.cw-pill #cw-btn-notetable').count() === 0, 'está fixado na pílula');
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(400);
    await page.keyboard.type('tabla');
    await page.waitForTimeout(200);
    const txt = await page.locator('.cw-palette-overlay').innerText();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    ok(txt.includes('Nota en tabla'), 'a palette não acha "Nota en tabla": ' + txt.slice(0, 120));
});

await page.evaluate(() => document.getElementById('cw-btn-notetable').click());
await page.waitForTimeout(1500);
await shot('01-comeco');

await check('abre em ALL TASKS, BAU, idioma da nota PT (Business language do CRM), sem sub-status; o tipo não está no topo', async () => {
    const nota = await page.locator(`${POP} [data-role="note"]`).innerText();
    ok(nota.includes('PT · BAU') && !nota.includes('ALL TASKS'), nota);
    ok(await page.locator(`${POP} [role=radiogroup][aria-label="Tipo de nota"]`).count() === 0, 'seletor de tipo à vista');
    ok(await page.locator(`${POP} .nt-form .nt-empty-s`).count() === 1 && await page.locator(`${POP} .nt-form .nt-row`).count() === 0, 'formulário sem sub-status');
});

await check('Preencher e Copiar com aparência bloqueada e a gaveta fechada (inerte) ao abrir', async () => {
    ok(await page.locator(`${POP} .nt-btn.p.blocked`).count() === 1 && await page.locator(`${POP} .nt-btn.t.blocked`).count() === 1, 'não bloqueados');
    ok(await page.evaluate((p) => document.querySelector(`${p} .nt-drawer-in`).hasAttribute('inert'), POP), 'gaveta não inerte');
});

await check('as tasks do appointment reconhecidas vêm pré-marcadas, com a marca Auto e "Cambiar"', async () => {
    const t = await page.locator(`${POP} [data-ctx="tasks"]`).innerText();
    ok(t.includes('ACT, GA4') && t.includes('Auto') && t.includes('Cambiar'), t);
});

await check('appointment de hoje pré-seleciona Before e Implementation', async () => {
    const on = await page.locator(`${POP} [data-ctx="blocks"] .nt-chip[aria-pressed=true]`).allInnerTexts();
    igual(on.map((s) => s.trim()), ['Before', 'Implementation'], 'blocos ligados');
});

await check('dentro de "Nota": os 3 tipos e o Sales program do CRM como pista', async () => {
    await openNota();
    ok(await page.locator(`${POP} [role=radiogroup][aria-label="Tipo de nota"] button`).count() === 3, 'tipos');
    ok((await page.locator(`${POP} .nt-cap2`).innerText()).includes('umm_scaled'), 'sales program');
    await closeNota();
});

console.log('\nSub-status e regras automáticas');

await check('buscar pelo atalho (ts so verif) acha o sub-status e Enter escolhe', async () => {
    await page.click(`${POP} [data-role="substatus"]`);
    await page.fill(`${POP} .nt-pop input`, 'ts so verif');
    igual(await page.locator(`${POP} .nt-pop .nt-opt`).count(), 1, 'resultados');
    await page.keyboard.press('Enter');
    ok((await page.locator(`${POP} [data-role="substatus"]`).innerText()).includes('SO - Implementation Only'), 'escolhido');
});

await check('texto fora da lista oferece "Usar …" e vale, com o aviso de fora da lista', async () => {
    await page.click(`${POP} [data-role="substatus"]`);
    await page.fill(`${POP} .nt-pop input`, 'PI - Audit In Progress');
    ok((await page.locator(`${POP} .nt-pop .nt-opt`).first().innerText()).includes('Usar'), 'sem "Usar"');
    await page.keyboard.press('Enter');
    ok((await page.locator(`${POP} .nt-cw .nt-fn`).first().innerText()).includes('Fuera de la lista'), 'sem aviso');
});

await check('NI - In Consult sugere follow-up em 3 dias úteis (Auto)', async () => {
    await pick('NI - In Consult');
    ok((await page.locator(`${POP} .nt-auto-sum`).innerText()).includes(addBusinessDays(3)), 'follow-up');
});

await check('IN - Not Reachable: consentimento NA; SO: Yes por padrão', async () => {
    await pick('IN - Not Reachable');
    ok((await page.locator(`${POP} .nt-auto-sum`).innerText()).includes('Consent NA'), 'NA');
    await pick('SO - Implementation Only');
    ok((await page.locator(`${POP} .nt-auto-sum`).innerText()).includes('Consent Yes'), 'Yes');
});

await check('"Completado automáticamente" reúne Date, CID e Consent; as linhas não aparecem soltas', async () => {
    const sum = await page.locator(`${POP} .nt-auto-sum`).innerText();
    ok(sum.includes('CID 123-456-7890') && sum.includes('Date ') && sum.includes('Consent Yes'), sum);
    ok(await row('date').count() === 0 && await row('cid').count() === 0, 'linhas soltas');
});

await check('abrir o cartão mostra as linhas com a marca Auto; editar tira a marca', async () => {
    await page.click(`${POP} .nt-auto-h`);
    ok(await row('date').locator('.nt-tag').count() === 1, 'sem Auto');
    await row('date').locator('input').fill('2026-12-01');
    ok(await row('date').locator('.nt-tag').count() === 0, 'Auto ficou');
    await page.click(`${POP} .nt-auto-h`);
});

console.log('\nBlocos, tasks e prints');

await check('General não é chip; ACT sugere After (ponto) e as linhas só-ECW ficam fora sem ECW', async () => {
    ok(await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`, { hasText: /^General/ }).count() === 0, 'chip General');
    igual(await page.locator(`${POP} [data-ctx="blocks"] .nt-dot`).count(), 1, 'sugestões');
    ok(!(await prev()).includes('Tag Diagnostics:'), 'linha só-ECW');
});

await check('ACT não repete a lista de prints (as linhas de fase pedem); GA4 mantém a dela', async () => {
    const vis = await page.evaluate((p) => [...document.querySelectorAll(`${p} .cw-screen-card`)].filter((c) => c.offsetParent).map((c) => c.querySelector('input[id^="name-"]').id), POP);
    ok(vis.some((id) => id.startsWith('name-ga4_event_tracking')) && !vis.some((id) => id.startsWith('name-ads_conversion_tracking')), JSON.stringify(vis));
});

await check('Tag Support: cartão destacado ANTES dos blocos e dos prints; as linhas não se repetem e a nota não muda de ordem', async () => {
    const r = await page.evaluate((p) => {
        const form = document.querySelector(`${p} .nt-form`);
        const ts = form.querySelector('.nt-ts');
        const antes = (a, b) => !!(a && b && (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING));
        return {
            tem: !!ts,
            antesDoPrimeiroBloco: antes(ts, form.querySelector('.nt-eyebrow')),
            antesDosPrints: antes(ts, form.querySelector('.nt-prints')),
            noCartao: ts ? ts.querySelectorAll('[data-row="ts_used"]').length : 0,
            noFormulario: form.querySelectorAll('[data-row="ts_used"]').length,
            titulo: ts ? (ts.querySelector('.nt-ts-h b') || {}).textContent : '',
            ajuda: ts ? ((ts.querySelector('.nt-ts-h span') || {}).textContent || '').length : 0,
        };
    }, POP);
    ok(r.tem, 'sem o cartão do Tag Support (.nt-ts)');
    ok(r.antesDoPrimeiroBloco && r.antesDosPrints, 'o cartão devia vir antes do primeiro bloco e dos prints: ' + JSON.stringify(r));
    igual([r.noCartao, r.noFormulario], [1, 1], 'a linha ts_used no cartão e no formulário todo');
    igual(r.titulo, 'Tag Support', 'título do cartão');
    ok(r.ajuda > 20, 'o cartão devia explicar por que vem antes dos prints');
    // só a ordem do FORMULÁRIO mudou: na nota a pergunta segue na tabela Additional Details (a última).
    const html = await prev();
    const iAdd = html.lastIndexOf('Additional Details'), iTs = html.indexOf('Usou o Tag Support?');
    ok(iTs > iAdd && iAdd > html.indexOf('Implementation:'), 'a linha do Tag Support saiu do Additional Details da nota');
});

await check('o print colado na lista do GA4 entra no Additional Details como "<task> — <rótulo>"', async () => {
    const inp = page.locator(`${POP} input[id^="screen-ga4_event_tracking-1-0"]`);
    await inp.fill('https://example.com/ga4/1');
    const html = await prev();
    ok(/Analytics Event Tracking \(GA4\) — [^<]+<\/td><td[^>]*>https:\/\/example\.com\/ga4\/1/.test(html), 'linha do print na prévia');
});

await check('Tag Support: Yes dispensa os prints de ACT (NA Auto) e põe o aviso em Task types', async () => {
    await page.locator(`${POP} .nt-more`).last().click().catch(() => {});
    await row('ts_used').locator('.nt-seg button', { hasText: 'Yes' }).click();
    const html = await prev();
    ok(html.includes('Tag criada/verificada'), 'sem o aviso do Win Criteria no idioma da nota (PT)');
    ok(/Status da conversão no Google Ads:<\/td><td[^>]*>NA</.test(html), 'print de Before não saiu NA na prévia');
    await page.click(`${POP} .nt-auto-h`);
    ok(await row('b_status').locator('input').count() === 0 && (await row('b_status').innerText()).includes('NA') && await row('b_status').locator('.nt-tag').count() === 1, 'linha de Before sem NA Auto');
    await page.click(`${POP} .nt-auto-h`);
});

await check('"Incluir mesmo assim" religa os prints da task forçada', async () => {
    await page.locator(`${POP} .cw-btn-ts-force`).first().click();
    await page.waitForTimeout(200);
    ok(await row('b_status').locator('input').count() === 1, 'b_status não voltou a pedir o print');
    ok(!(await prev()).includes('Tag criada/verificada'), 'o aviso ficou na task forçada');
    await row('ts_used').locator('.nt-seg button', { hasText: 'No' }).click();
});

console.log('\nO "?" de cada bloco');

// A interface está em ES nesta altura (um check anterior espera "Cambiar"); a ajuda segue a
// interface, não o idioma da nota.
await check('"?" em cada bloco do ALL TASKS (Before, Implementation, After, Consult); General não é chip e não tem', async () => {
    const qs = await page.locator(`${POP} .nt-q`).evaluateAll((els) => els.map((e) => e.dataset.q));
    igual(qs, ['all.before', 'all.impl', 'all.after', 'all.consult'], 'botões de ajuda');
    ok((await page.locator(`${POP} .nt-q`).nth(2).getAttribute('aria-label')).includes('After'), 'nome acessível do "?"');
});

await check('"?" abre a explicação do bloco sem ligar nem desligar o bloco, e a explicação não vai para a nota', async () => {
    const chip = page.locator(`${POP} [data-ctx="blocks"] .nt-chip`, { hasText: /^After/ });
    const antes = await chip.getAttribute('aria-pressed');
    await page.locator(`${POP} .nt-q[data-q="all.after"]`).click();
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 1, 'painéis abertos');
    const t = await page.locator(`${POP} #cw-nt-help`).innerText();
    ok(/no vale el día de la cita/i.test(t) && /cuándo usar/i.test(t) && /ACT/.test(t) && /ECW/.test(t) && /tag support/i.test(t), t);
    ok(/sub-status/i.test(t) && /Awaiting Validation/.test(t), 'sub-status aplicáveis do After: ' + t);
    ok(/solo para usted/i.test(t), 'faltou o aviso de que não vai para a nota');
    await shot('ajuda-bloco');
    igual(await chip.getAttribute('aria-pressed'), antes, 'o "?" não pode ligar nem desligar o bloco');
    igual(await page.locator(`${POP} .nt-q[data-q="all.after"]`).getAttribute('aria-expanded'), 'true', 'aria-expanded do "?"');
    // a prévia ganha a faixa de explicação, FORA das tabelas; nenhuma tabela da nota pode carregar o texto
    const nasTabelas = await page.evaluate((p) => [...document.querySelectorAll(`${p} .nt-note-card table`)].map((t) => t.textContent).join(' '), POP);
    ok(!/no va en la nota|cuándo usar|solo para usted/i.test(nasTabelas), 'a explicação vazou para dentro de uma tabela da nota');
});

await check('Before e Implementation têm o mesmo "quando usar" (como no Doc); o Consult traz o que é obrigatório', async () => {
    await page.locator(`${POP} .nt-q[data-q="all.before"]`).click();
    const a = await page.locator(`${POP} #cw-nt-help .nt-help-r`, { hasText: /cuándo usar/i }).innerText();
    await page.locator(`${POP} .nt-q[data-q="all.impl"]`).click();
    const b = await page.locator(`${POP} #cw-nt-help .nt-help-r`, { hasText: /cuándo usar/i }).innerText();
    igual(a, b, 'quando usar de Before × Implementation');
    await page.locator(`${POP} .nt-q[data-q="all.consult"]`).click();
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 1, 'um painel por vez');
    const t = await page.locator(`${POP} #cw-nt-help`).innerText();
    ok(/obligatorio/i.test(t) && /Split & Transfer/.test(t) && /M&A/.test(t), t);
    ok(!/MMS/.test(t), 'o "MMS only" fica escondido, como o Lucas pediu');
});

await check('Esc fecha só a explicação, devolve o foco ao "?" e não fecha a janela; clicar de novo também fecha', async () => {
    await page.keyboard.press('Escape');
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 0, 'Esc não fechou a explicação');
    igual(await page.evaluate(() => document.activeElement && document.activeElement.dataset.q), 'all.consult', 'foco de volta no "?"');
    ok(await page.locator(POP).isVisible(), 'o Esc fechou a janela inteira');
    await page.locator(`${POP} .nt-q[data-q="all.consult"]`).click();
    await page.locator(`${POP} .nt-q[data-q="all.consult"]`).click();
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 0, 'segundo clique não fechou');
});

await check('trocar o idioma da interface com a explicação aberta repinta o texto (EN), sem perder o painel', async () => {
    await page.locator(`${POP} .nt-q[data-q="all.after"]`).click();
    await page.evaluate(() => document.querySelector('#cw-config-lang-toggle button[data-lang="en"]').click());
    await page.waitForTimeout(300);
    const t = await page.locator(`${POP} #cw-nt-help`).innerText();
    ok(/when to use/i.test(t) && /NOT on the day of the appointment/.test(t) && !/cuándo usar/i.test(t), t);
    await page.evaluate(() => document.querySelector('#cw-config-lang-toggle button[data-lang="es"]').click());
    await page.waitForTimeout(300);
    // Fecha pelo próprio "?": com o foco no botão de idioma (fora da janela) o Esc seria o global e fecharia a janela.
    await page.locator(`${POP} .nt-q[data-q="all.after"]`).click();
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 0, 'painel ficou aberto para os próximos checks');
});

console.log('\nA prévia na gaveta (o "?" mostra onde o bloco entra)');

const prevInfo = () => page.evaluate((p) => {
    const card = document.querySelector(`${p} .nt-note-card`);
    const g = card.querySelector('table.nt-pv-ghost');
    const banner = card.querySelector('.nt-pv-note');
    const sc = card.parentElement.getBoundingClientRect();
    const b = banner && banner.getBoundingClientRect();
    return {
        ids: [...card.querySelectorAll('table[data-block]')].map((t) => t.dataset.block),
        ghost: g ? g.dataset.block : null,
        hl: [...card.querySelectorAll('table.nt-pv-hl')].map((t) => t.dataset.block),
        banner: banner ? banner.textContent : '',
        colado: !!(banner && banner.nextElementSibling && banner.nextElementSibling.tagName === 'TABLE'),
        visivel: !!b && b.top >= sc.top - 1 && b.top < sc.bottom,
    };
}, POP);
const drawerOpen = () => page.locator(`${POP} .nt-drawer.open`).count();

await check('bloco DESLIGADO: "Ver na prévia" abre a gaveta e mostra a tabela "fantasma" na posição do segmento, com a faixa, sem mexer na nota', async () => {
    const chip = page.locator(`${POP} [data-ctx="blocks"] .nt-chip`, { hasText: /^Consult/ });
    igual(await chip.getAttribute('aria-pressed'), 'false', 'o Consult devia estar desligado');
    const pendentes = await page.locator(`${POP} .nt-tab .nt-bd`).innerText();
    await page.locator(`${POP} .nt-q[data-q="all.consult"]`).click();
    igual(await drawerOpen(), 0, 'sobreposta, a gaveta esconderia o painel: o "?" não a abre à força');
    await page.locator(`${POP} #cw-nt-help .nt-na`).click();
    await page.waitForTimeout(900);
    igual(await drawerOpen(), 1, 'a gaveta não abriu');
    const r = await prevInfo();
    igual(r.ghost, 'consult', 'bloco fantasma');
    igual(r.ids.slice(-2), ['consult', 'extras'], 'ordem: o Consult entra antes do Additional Details');
    ok(r.colado, 'a faixa devia estar colada na tabela do bloco');
    ok(/no va en la nota/i.test(r.banner) && /aún no está en la nota/i.test(r.banner) && /cuándo usar/i.test(r.banner), r.banner);
    ok(r.visivel, 'a faixa não está visível: a gaveta não rolou até o bloco');
    const v = await page.evaluate((p) => { const g = document.querySelector(`${p} .nt-note-card table.nt-pv-ghost`); const cs = getComputedStyle(g); return { op: parseFloat(cs.opacity), h: g.getBoundingClientRect().height, borda: cs.outlineStyle }; }, POP);
    ok(v.op > 0.3 && v.op < 1 && v.h > 40 && v.borda === 'dashed', 'o fantasma não se vê (esmaecido, tracejado e com altura): ' + JSON.stringify(v));
    igual(await chip.getAttribute('aria-pressed'), 'false', 'o "?" não pode ligar o bloco');
    igual(await page.locator(`${POP} .nt-tab .nt-bd`).innerText(), pendentes, 'o fantasma não pode mexer nas pendências');
    await shot('previa-fantasma');
    // clicar numa linha do fantasma não leva a campo nenhum (o bloco nem está no formulário)
    const auto = await page.locator(`${POP} .nt-auto-h`).getAttribute('aria-expanded');
    await page.locator(`${POP} table.nt-pv-ghost tr[data-row]`).first().click();
    igual(await page.locator(`${POP} .nt-auto-h`).getAttribute('aria-expanded'), auto, 'clicar no fantasma mexeu no formulário');
    // clicar numa célula (não focável) leva o foco ao body, e aí o Esc seria o global: volta o foco à gaveta
    await page.locator(`${POP} .nt-tab`).focus();
});

await check('Esc com a gaveta sobreposta fecha primeiro a gaveta (o que está por cima), depois o painel; fechar tira o fantasma e a faixa', async () => {
    await page.keyboard.press('Escape');
    igual(await drawerOpen(), 0, 'o Esc não fechou a gaveta');
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 1, 'o painel tinha de continuar aberto');
    await page.keyboard.press('Escape');
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 0, 'o segundo Esc não fechou o painel');
    const r = await prevInfo();
    igual([r.ghost, r.banner], [null, ''], 'ficou fantasma ou faixa na prévia');
    ok(!r.ids.includes('consult'), 'o fantasma continuou na prévia');
});

await check('bloco LIGADO: o "?" destaca a tabela real, sem fantasma, e a faixa só explica', async () => {
    const ligado = await page.evaluate((p) => [...document.querySelectorAll(`${p} [data-ctx="blocks"] .nt-chip[aria-pressed="true"]`)].map((c) => c.textContent.trim().replace(/\s+/g, ' ')), POP);
    ok(ligado.length > 0, 'nenhum bloco ligado para testar');
    const nome = ligado[0].startsWith('Before') ? 'before' : 'impl';
    const antes = (await prevInfo()).ids;
    await page.locator(`${POP} .nt-q[data-q="all.${nome}"]`).click();
    await page.locator(`${POP} #cw-nt-help .nt-na`).click();
    await page.waitForTimeout(900);
    const r = await prevInfo();
    igual(r.hl, [nome], 'bloco destacado');
    igual(r.ghost, null, 'não devia haver fantasma');
    igual(r.ids, antes, 'a prévia ganhou ou perdeu uma tabela');
    ok(/no va en la nota/i.test(r.banner) && !/aún no está en la nota/i.test(r.banner), r.banner);
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    igual(await drawerOpen(), 0, 'gaveta aberta para os próximos checks');
    igual(await page.locator(`${POP} #cw-nt-help`).count(), 0, 'painel aberto para os próximos checks');
});

console.log('\nPendências e preenchimento');

await check('Preencher com pendência não insere: abre a faixa e marca as linhas', async () => {
    await page.click(`${POP} .nt-btn.p`);
    ok(await page.locator(`${POP} .nt-pbar.on`).count() === 1 && await page.locator(`${POP} .nt-form .nt-row.pending`).count() > 0, 'sem faixa');
    igual(await page.locator('.mock-note-editor').count(), 0, 'editor aberto');
});

await check('"Siguiente" leva a outra linha pendente', async () => {
    await page.click(`${POP} .nt-pbar .nt-btn:not(.t)`);
    await page.waitForTimeout(500);
    ok(await page.evaluate(() => !!document.activeElement.closest('.nt-row.pending')), 'foco fora de pendente');
});

await check('"Marcar el resto como NA" resolve o que aceita NA e não toca Call Summary nem Sub-status Reason', async () => {
    await page.click(`${POP} .nt-pbar .nt-btn.t`);
    const left = await page.locator(`${POP} .nt-form .nt-row.pending .nt-rl`).allInnerTexts();
    // Os rótulos do formulário são os da nota (atendimento PT), não os da interface (ES).
    igual(left.map((s) => s.trim()).sort(), ['Motivo do sub-status', 'Resumo da call'], 'pendentes');
});

await check('cenário rápido: o texto vai ao resumo em blocos com título em negrito e o motivo ao Sub-status Reason', async () => {
    await page.locator(`${POP} .nt-form .nt-chip`, { hasText: /escenarios/ }).click();
    await page.locator(`${POP} .nt-scen-menu .nt-opt`).first().click();
    const sum = await row('call_summary').locator('textarea').inputValue();
    ok(/^\*\*[^*]+:\*\* /.test(sum), sum.slice(0, 80));
    ok((await row('substatus_reason').locator('textarea').inputValue()).length > 5, 'motivo vazio');
    ok(/<b>[^<]+:<\/b>/.test(await prev()), 'negrito na prévia');
});

await check('tudo resolvido: "Lista para completar" e Preencher libera', async () => {
    await page.locator(`${POP} .nt-more`).first().click().catch(() => {});
    igual((await page.locator(`${POP} .nt-status`).innerText()).trim(), 'Lista para completar', 'status');
    ok(await page.locator(`${POP} .nt-btn.p.blocked`).count() === 0, 'ainda bloqueado');
});

await shot('02-preenchendo');

await check('Preencher insere no editor do CRM a tabela do contrato (sem pendente, sem class), com rodapé no idioma do atendimento, mesmo com o "?" aberto', async () => {
    // com a explicação aberta de um bloco desligado, a prévia tem o fantasma e a faixa; a nota não pode levá-los
    await page.locator(`${POP} .nt-q[data-q="all.consult"]`).click();
    ok(await page.evaluate((p) => !!document.querySelector(`${p} .nt-note-card table.nt-pv-ghost`), POP), 'o fantasma devia estar na prévia');
    await page.click(`${POP} .nt-btn.p`);
    await page.waitForTimeout(4000);
    const html = await editorHtml();
    ok(html.includes('<table') && html.includes('Additional Details') && html.includes('Resumo da call:'), html.slice(0, 200));
    ok(!html.includes('Resumen de la llamada:') && !html.includes('Call Summary:'), 'rótulo fora do idioma do atendimento');
    ok(html.includes('Nota criada através do Cases Wizard.'), 'rodapé não está em PT');
    ok(!/class=|pendente|data-row|data-block|#fef7e0/.test(html), 'marcação de tela vazou');
    ok(!html.includes('Consult Routing Path') && !/no va en la nota|Explicación/i.test(html), 'a explicação ou o bloco fantasma vazou para a nota');
});

console.log('\nNota: Europa, fluxo e tipos');

await page.evaluate(() => document.getElementById('cw-btn-notetable').click());
await page.waitForTimeout(1500);

await check('depois de inserir, o formulário volta limpo e o idioma da nota segue PT', async () => {
    ok(await page.locator(`${POP} .nt-form .nt-empty-s`).count() === 1, 'não limpou');
    ok((await page.locator(`${POP} [data-role="note"]`).innerText()).includes('PT ·'), 'idioma');
});

await pick('SO - Implementation Only');

await check('Europa: sem padrão de consentimento (marque), resumo em âmbar e "Europe case?" na nota; marcado à mão, preservado ao sair', async () => {
    await openNota();
    await page.click(`${POP} [role=switch]`);
    ok((await page.locator(`${POP} [data-role="note"] .nt-v.warn`).count()) === 1, 'resumo sem âmbar');
    ok(await row('consent').locator('.nt-tag.warn').count() === 1, 'sem a etiqueta');
    ok((await prev()).includes('Caso da Europa?'), 'linha Europe case?');
    await row('consent').locator('.nt-seg button', { hasText: 'No' }).click();
    await page.click(`${POP} [role=switch]`);
    await page.click(`${POP} .nt-auto-h`);
    ok(await row('consent').locator('.nt-seg button[aria-checked=true]', { hasText: 'No' }).count() === 1, 'No não preservado');
    await page.click(`${POP} .nt-auto-h`);
});

await check('LM tira o On Call da nota; BAU devolve', async () => {
    await page.locator(`${POP} [role=radiogroup][aria-label="Flujo"] button`, { hasText: 'LM' }).click();
    ok(!(await prev()).includes('On Call signaled'), 'LM com On Call');
    await page.locator(`${POP} [role=radiogroup][aria-label="Flujo"] button`, { hasText: 'BAU' }).click();
    ok((await prev()).includes('On Call signaled'), 'BAU sem On Call');
});

await check('SBS-E: a linha Nota e a faixa citam o tipo; sem linha Tasks; uma fase por nota, com título impresso', async () => {
    await page.locator(`${POP} [role=radiogroup][aria-label="Tipo de nota"] button`, { hasText: 'SBS-E' }).click();
    ok((await page.locator(`${POP} [data-role="note"]`).innerText()).includes('ECL SBS-E'), 'Nota sem o tipo');
    ok((await page.locator(`${POP} .nt-sticky`).innerText()).includes('ECL SBS-E'), 'faixa sem o tipo');
    ok(await page.locator(`${POP} [data-ctx="tasks"]`).count() === 0, 'linha Tasks no ECL');
    igual(await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`).count(), 3, 'fases');
    await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`, { hasText: 'Phase 2' }).click();
    igual(((await prev()).match(/margin:16px 0 6px 0/g) || []).length, 1, 'títulos');
    ok(!(await prev()).includes('Usou o Tag Support?'), 'Tag Support no ECL');
});

await check('seção por CID: + CID e a lista sobrevive à troca de fase', async () => {
    ok(await row('cid:0:cid').locator('input').inputValue() === '123-456-7890', 'CID capturado');
    await page.locator(`${POP} .nt-form .nt-chip`, { hasText: '+ CID' }).click();
    await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`, { hasText: 'Interim' }).click();
    await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`, { hasText: 'Phase 2' }).click();
    igual(await page.locator(`${POP} .nt-form [data-row="cid:1:tbw"]`).count(), 1, 'segundo CID');
});

await check('MMS tem 5 fases; voltar a ALL TASKS', async () => {
    await page.locator(`${POP} [role=radiogroup][aria-label="Tipo de nota"] button`, { hasText: 'MMS' }).click();
    igual(await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`).count(), 5, 'fases');
    await page.locator(`${POP} [role=radiogroup][aria-label="Tipo de nota"] button`, { hasText: 'ALL TASKS' }).click();
    await closeNota();
});

console.log('\nGaveta, faixa e linhas de print');

await check('a aba abre a gaveta (aria-expanded, não inerte), a linha em foco acende na nota e clicar na nota leva ao campo', async () => {
    await page.click(`${POP} .nt-tab`);
    await page.waitForTimeout(600);
    ok((await page.locator(`${POP} .nt-tab`).getAttribute('aria-expanded')) === 'true', 'aria-expanded');
    ok(!(await page.evaluate((p) => document.querySelector(`${p} .nt-drawer-in`).hasAttribute('inert'), POP)), 'inerte');
    await shot('03-gaveta');
    await row('call_summary').locator('textarea').focus();
    ok(await page.locator(`${POP} .nt-note-card tr.nt-hl[data-row="call_summary"]`).count() === 1, 'sem destaque');
    await page.locator(`${POP} .nt-note-card tr[data-row="website"]`).click();
    ok(await page.evaluate(() => document.activeElement && document.activeElement.id === 'nt-f-website'), 'foco não foi ao campo');
});

await check('Esc fecha a gaveta e não fecha a janela', async () => {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    ok(await page.locator(`${POP} .nt-drawer.open`).count() === 0, 'gaveta aberta');
    ok(await page.evaluate((p) => document.querySelector(p).classList.contains('open'), POP), 'a janela fechou');
});

await check('rolando além do contexto aparece a faixa fixa; clicar volta ao topo', async () => {
    await page.evaluate((p) => { const b = document.querySelector(`${p} .nt-body`); b.scrollTop = 600; b.dispatchEvent(new Event('scroll')); }, POP);
    await page.waitForTimeout(350);
    ok(await page.locator(`${POP} .nt-sticky.on`).count() === 1, 'sem faixa');
    await page.click(`${POP} .nt-sticky`);
    await page.waitForTimeout(700);
    ok(await page.evaluate((p) => document.querySelector(`${p} .nt-body`).scrollTop < 8, POP), 'não voltou');
});

await check('colar link válido mostra ✓ e avança; Enter avança sem preencher; "na" vira NA', async () => {
    await page.click(`${POP} .nt-btn:has-text("Limpiar")`);
    await pick('SO - Implementation Only');
    await row('b_status').locator('input').focus();
    await page.keyboard.insertText('https://example.com/ss/1');
    await row('b_status').locator('input').dispatchEvent('paste');
    await page.waitForTimeout(60);
    ok(await row('b_status').locator('.nt-rv.ok .nt-ck').count() === 1, 'sem ✓');
    igual(await page.evaluate(() => document.activeElement.id), 'nt-f-b_dup', 'foco depois de colar');
    await page.keyboard.press('Enter');
    igual(await page.evaluate(() => document.activeElement.id), 'nt-f-b_bid', 'foco depois do Enter');
    await page.keyboard.type('na');
    ok(/Otimização de lances:<\/td><td[^>]*>NA</.test(await prev()), 'na não virou NA');
});

await check('NA onde o padrão não aceita (Call Summary) marca o campo', async () => {
    await row('call_summary').locator('textarea').fill('na');
    ok(await row('call_summary').evaluate((e) => e.classList.contains('bad')), 'não marcou');
    await row('call_summary').locator('textarea').fill('');
});

await check('comentário por linha: abre na linha, escreve na coluna Additional Comments da mesma linha, esvaziado fecha', async () => {
    await row('b_status').locator('.nt-cmt').click();
    await page.keyboard.type('Cliente só tinha acesso de leitura');
    ok(await page.evaluate((p) => document.querySelector(`${p} .nt-note-card tr[data-row="b_status"]`).lastElementChild.textContent.includes('acesso de leitura'), POP), 'comentário fora da linha');
    await row('b_status').locator('.nt-cmrow input').fill('');
    await row('b_status').locator('.nt-cmrow input').blur();
    await page.waitForTimeout(80);
    igual(await row('b_status').locator('.nt-cmrow').count(), 0, 'campo aberto');
});

console.log('\nRascunhos, idioma e o módulo antigo');

await check('autosave de emergência em 2s, na chave própria (o rascunho do Case Notes não é tocado)', async () => {
    await page.waitForTimeout(2300);
    const keys = await page.evaluate(() => ({ nt: JSON.parse(localStorage.getItem('cw_notetable_emergency_save') || 'null'), old: localStorage.getItem('cw_notes_emergency_save') }));
    ok(keys.nt && keys.nt.data.subStatus === 'SO - Implementation Only', 'sem airbag');
    igual(keys.old, null, 'airbag do Case Notes');
});

await check('Guardar estaciona o rascunho e limpa; abrir pela lista devolve sub-status e valores', async () => {
    await page.click(`${POP} .nt-btn:has-text("Guardar")`);
    ok(await page.locator(`${POP} .nt-form .nt-empty-s`).count() === 1, 'não limpou');
    await page.click(`${POP} .nt-hbtn[aria-label="Borradores"]`);
    await page.locator(`${POP} .nt-drafts [data-draft]`).first().click();
    ok((await page.locator(`${POP} [data-role="substatus"]`).innerText()).includes('SO - Implementation Only'), 'sub-status');
    ok((await row('b_status').locator('input').inputValue()) === 'https://example.com/ss/1', 'valor');
    igual(await page.evaluate(() => localStorage.getItem('cw_notes_parking_lot')), null, 'rascunho no Case Notes');
});

await check('trocar o idioma da INTERFACE com a janela aberta repinta o cromo; a nota segue no idioma do atendimento', async () => {
    await page.evaluate(() => document.querySelector('#cw-config-lang-toggle button[data-lang="en"]').click());
    await page.waitForTimeout(300);
    ok((await page.locator(`${POP} .nt-btn.p`).innerText()).trim() === 'Fill', 'Preencher não repintou');
    ok((await page.locator(`${POP} .nt-foot .nt-btn.t`).innerText()).trim() === 'Copy', 'Copiar não repintou');
    ok((await prev()).includes('Nota criada através do Cases Wizard.'), 'rodapé mudou com a interface');
    await page.evaluate(() => document.querySelector('#cw-config-lang-toggle button[data-lang="es"]').click());
});

await check('o Case Notes antigo continua abrindo como antes, com o próprio cabeçalho', async () => {
    await page.evaluate(() => document.getElementById('cw-btn-notetable').click());
    await page.waitForTimeout(800);
    await page.evaluate(() => document.getElementById('cw-btn-notes').click());
    await page.waitForTimeout(1200);
    ok(await page.evaluate(() => document.getElementById('notes-assistant-popup').classList.contains('open')), 'Case Notes não abriu');
    await page.evaluate(() => document.getElementById('cw-btn-notes').click());
    await page.waitForTimeout(800);
    await page.evaluate(() => document.getElementById('cw-btn-notetable').click());
    await page.waitForTimeout(1200);
});

console.log('\nDesenho (medido no DOM)');

await page.evaluate((p) => {
    document.querySelector(`${p} .nt-auto-h`)?.click();
    document.querySelectorAll(`${p} .nt-more[aria-expanded=false]`).forEach((b) => b.click());
    document.querySelector(`${p} [data-role="note"]`)?.click();
}, POP);
await page.click(`${POP} .nt-tab`);
await page.waitForTimeout(700);
await shot('05-prints');

const lint = await page.evaluate((p) => {
    const out = { spacing: [], font: [], weight: [], border: [], target: [], trans: [] };
    const ok4 = (v) => { const n = parseFloat(v); return Number.isNaN(n) || n === 0 || n === 1 || n === 2 || n % 4 === 0; };
    // O que é nosso: a casca nova. O cabeçalho (createStandardHeader), o step-tasks e o Split & Transfer
    // são reaproveitados do Case Notes e não se medem aqui.
    // Só a janela e a gaveta: o painel de ajuda do cabeçalho padrão é filho direto do popup.
    const scope = [...document.querySelectorAll(`${p} > .nt-win *, ${p} > .nt-drawer *`)].filter((e) => !e.closest('.nt-note-card') && !e.closest('svg') && !e.closest('.nt-tasks') && !e.closest('.nt-prints')
        && !e.closest('.nt-split') && !e.closest('.cw-help-overlay') && !e.closest('.nt-win > div:first-child') && e.getClientRects().length);
    for (const e of scope) {
        const cs = getComputedStyle(e);
        for (const prop of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'rowGap', 'columnGap']) {
            const v = cs[prop];
            if (v === 'normal' || v.includes('%') || v === 'auto') continue;
            if (!ok4(v) && !(prop.startsWith('margin') && e.matches('.nt-auto-h .nt-c,.nt-quick'))) out.spacing.push(`${e.className || e.tagName}:${prop}=${v}`);
        }
        if ([...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) {
            const fs = parseFloat(cs.fontSize); if (![11, 12, 13, 14, 15, 16].includes(fs)) out.font.push(`${e.className || e.tagName}:${fs}`);
            const fw = parseInt(cs.fontWeight, 10); if (![400, 500].includes(fw)) out.weight.push(`${e.className || e.tagName}:${fw}`);
        }
        if (['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'].some((k) => parseFloat(cs[k]) > 0) && !e.matches('.nt-win')) out.border.push(e.className || e.tagName);
        if (e.matches('button')) { const r = e.getBoundingClientRect(); if (r.width < 32 || r.height < 32) out.target.push(`${e.className}:${Math.round(r.width)}x${Math.round(r.height)}`); }
    }
    const sheet = document.getElementById('cw-notetable-styles').sheet;
    const walk = (rules) => { for (const r of rules) { if (r.cssRules) walk(r.cssRules); const t = r.style && r.style.transition; if (t && /(^|,)\s*all\b/.test(t)) out.trans.push(r.selectorText); } };
    walk(sheet.cssRules);
    out.reduced = [...sheet.cssRules].some((r) => r.media && /prefers-reduced-motion/.test(r.media.mediaText));
    out.tabular = getComputedStyle(document.querySelector(`${p} .nt-rv.cidv input, ${p} .nt-rv.sp input`) || document.body).fontVariantNumeric;
    return out;
}, POP);
await check('DESENHO · padding, margem e gap na grade de 4px', async () => igual(lint.spacing.slice(0, 6), [], 'fora da grade'));
await check('DESENHO · só os degraus de fonte 11 a 16', async () => igual(lint.font.slice(0, 6), [], 'fontes'));
await check('DESENHO · só pesos 400 e 500', async () => igual(lint.weight.slice(0, 6), [], 'pesos'));
await check('DESENHO · nenhuma borda chapada na casca', async () => igual(lint.border.slice(0, 6), [], 'bordas'));
await check('DESENHO · todo botão com alvo de pelo menos 32x32', async () => igual(lint.target.slice(0, 6), [], 'alvos'));
await check('DESENHO · nenhum `transition: all` e há prefers-reduced-motion', async () => { igual(lint.trans, [], 'transition all'); ok(lint.reduced, 'sem reduced-motion'); });
await check('DESENHO · CID e Speakeasy em algarismos tabulares', async () => ok(/tabular-nums/.test(lint.tabular), lint.tabular));

console.log('\nConfigurações');
// Abre/fecha um módulo pelo botão da pílula só quando ele não está no estado pedido.
const janela = async (btn, popupId, aberta) => {
    const now = await page.evaluate((id) => { const p = document.getElementById(id); return !!(p && (p._cwOpen ?? p.classList.contains('open'))); }, popupId);
    if (now !== aberta) { await page.evaluate((b) => document.getElementById(b).click(), btn); await page.waitForTimeout(1000); }
};

await check('Configurações: "Abrir en" SBS-E e fluxo LM valem para a próxima nota (depois de Limpiar)', async () => {
    await janela('cw-btn-notetable', 'cw-notetable-popup', false);
    await janela('cw-btn-configs', 'configs-popup', true);
    const txt = await page.locator('#cw-config-nt-segment').evaluate((e) => e.closest('.cw-configs-section').innerText);
    ok(txt.includes('Nota en tabla') && txt.includes('Abrir en') && txt.includes('Flujo predeterminado'), txt.slice(0, 120));
    await page.click('#cw-config-nt-segment button[data-v="sbse"]');
    await page.click('#cw-config-nt-flow button[data-v="lm"]');
    ok(await page.locator('#cw-config-nt-segment button.active[data-v="sbse"]').count() === 1, 'botão não marcou');
    await janela('cw-btn-configs', 'configs-popup', false);
    await janela('cw-btn-notetable', 'cw-notetable-popup', true);
    await page.click(`${POP} .nt-btn:has-text("Limpiar")`);
    const nota = await page.locator(`${POP} [data-role="note"]`).innerText();
    ok(nota.includes('LM'), 'fluxo padrão não valeu: ' + nota);
    igual(await page.locator(`${POP} [data-ctx="blocks"] .nt-chip`).count(), 3, 'fases do SBS-E');
    ok(!nota.includes('ECL SBS-E'), 'o tipo padrão do agente não deveria aparecer como "fora do padrão"');
    // Volta ao padrão para o resto do roteiro.
    await janela('cw-btn-notetable', 'cw-notetable-popup', false);
    await janela('cw-btn-configs', 'configs-popup', true);
    await page.click('#cw-config-nt-segment button[data-v="all"]');
    await page.click('#cw-config-nt-flow button[data-v="bau"]');
    await janela('cw-btn-configs', 'configs-popup', false);
    await janela('cw-btn-notetable', 'cw-notetable-popup', true);
    await page.click(`${POP} .nt-btn:has-text("Limpiar")`);
    ok((await page.locator(`${POP} [data-role="note"]`).innerText()).includes('BAU'), 'não voltou a BAU');
});

await check('sem erros de página nem de console', async () => igual(errors, [], 'erros'));
await page.close();

console.log('\nTela estreita (~1196px)');
const narrow = await abrirCrm({ width: 1196, height: 800 });
await check('a gaveta sobrepõe a janela em vez de sair da tela', async () => {
    const p = narrow.page;
    await p.evaluate(() => document.getElementById('cw-btn-notetable').click());
    await p.waitForTimeout(1500);
    await p.click(`${POP} .nt-tab`);
    await p.waitForTimeout(700);
    const r = await p.evaluate((sel) => document.querySelector(`${sel} .nt-drawer-in`).getBoundingClientRect().left, POP);
    ok(r >= 0, `a gaveta começa em x=${r}`);
    await p.close();
});

console.log('\nTela larga (~1920px): a gaveta cabe ao lado da janela');
const wide = await abrirCrm({ width: 1920, height: 900 });
await check('o "?" abre a gaveta sozinho, ao lado (sem cobrir a janela), e o Esc fecha primeiro o painel, depois a gaveta', async () => {
    const p = wide.page;
    await p.evaluate(() => document.getElementById('cw-btn-notetable').click());
    await p.waitForTimeout(1500);
    await p.click(`${POP} [data-role="substatus"]`);
    await p.locator(`${POP} .nt-pop .nt-opt`, { hasText: /^SO - Implementation Only/ }).first().click();
    await p.locator(`${POP} .nt-q[data-q="all.consult"]`).click();
    await p.waitForTimeout(900);
    igual(await p.locator(`${POP} .nt-drawer.open`).count(), 1, 'a gaveta devia abrir sozinha');
    igual(await p.locator(`${POP} .nt-drawer.over`).count(), 0, 'com espaço, a gaveta não pode sobrepor a janela');
    if (shotDir) await p.screenshot({ path: `${shotDir}/previa-tela-larga.png` });
    ok(await p.evaluate((q) => !!document.querySelector(`${q} .nt-note-card table.nt-pv-ghost[data-block="consult"]`), POP), 'sem fantasma do Consult na prévia');
    // a janela segue clicável: trocar para outro bloco funciona (a gaveta não cobre os "?")
    await p.locator(`${POP} .nt-q[data-q="all.after"]`).click();
    ok(await p.evaluate((q) => !!document.querySelector(`${q} .nt-note-card table.nt-pv-ghost[data-block="after"]`), POP), 'a prévia não seguiu para o After');
    await p.keyboard.press('Escape');
    igual([await p.locator(`${POP} #cw-nt-help`).count(), await p.locator(`${POP} .nt-drawer.open`).count()], [0, 1], 'primeiro Esc: fecha o painel e deixa a gaveta');
    await p.keyboard.press('Escape');
    igual(await p.locator(`${POP} .nt-drawer.open`).count(), 0, 'segundo Esc não fechou a gaveta');
    await p.close();
});

console.log(`\n${fail ? '✗' : '✓'} smoke da nota em tabela: ${total - fail}/${total}, ${fail} falha(s)`);
await browser.close();
process.exit(fail ? 1 : 0);
