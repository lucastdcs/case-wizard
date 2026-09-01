// scripts/smoke-people.mjs
//
// Smoke da aba "Pessoas" da Central de Conteúdo num navegador de verdade.
//
// O HTML da Central só roda no Apps Script, e é justamente por isso que ela
// nunca teve teste de tela: `google.script.run` não existe fora de lá. Aqui a
// ponte é religada — o Chromium carrega o ContentDashboard.html REAL (mesmo
// CSS, mesmo JS) e cada chamada de `google.script.run` é encaminhada para o
// backend GAS REAL rodando num contexto vm do Node, sobre uma planilha falsa.
// Nada de mock da regra: quem responde é o PeopleAPI.gs.
//
// O que isto prova, e que nenhum teste de unidade alcança:
//   - a aba nem aparece para quem não tem papel (QA);
//   - o TL edita e a linha vira "em revisão" — sem a planilha mudar;
//   - o ADMIN edita e a mudança cai na planilha na hora, com o pisca na linha;
//   - o editor abre NO LUGAR da linha (sem modal) e mostra, enquanto se digita,
//     o idioma e o acesso que aquela categoria/segmento vão produzir;
//   - segmento e categoria saem com as cores de identificação certas;
//   - busca e filtro por segmento reduzem a lista.
//
// Uso: npm run smoke:people

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { createContext, runInContext } from 'node:vm';
import { randomUUID } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');
const GAS = join(raiz, 'gas-backend');

// ---------------------------------------------------------------
//  Backend de verdade sobre planilha falsa (mesmo stub do test:people)
// ---------------------------------------------------------------
class FakeRange {
    constructor(sheet, row, col) { this.sheet = sheet; this.row = row; this.col = col; }
    setValue(v) {
        while (this.sheet._data.length < this.row) this.sheet._data.push([]);
        this.sheet._data[this.row - 1][this.col - 1] = v;
        return this;
    }
    getValue() { return (this.sheet._data[this.row - 1] || [])[this.col - 1]; }
    getValues() { return this.sheet._data.map((r) => r.slice()); }
}

class FakeSheet {
    constructor(name) { this.name = name; this._data = []; }
    appendRow(row) { this._data.push(row.slice()); }
    getDataRange() { return new FakeRange(this, 1, 1); }
    getRange(row, col) { return new FakeRange(this, row, col); }
    getLastRow() { return this._data.length; }
    deleteRow(i) { this._data.splice(i - 1, 1); }
    setFrozenRows() { return this; }
}

class FakeSpreadsheet {
    constructor() { this.sheets = {}; }
    getSheetByName(n) { return this.sheets[n] || null; }
    insertSheet(n) { return (this.sheets[n] = new FakeSheet(n)); }
}

let CURRENT_USER = 'lucaste@google.com';
let SS, api;

function bootBackend() {
    SS = new FakeSpreadsheet();

    const sandbox = {
        SpreadsheetApp: { getActiveSpreadsheet: () => SS },
        Session: { getActiveUser: () => ({ getEmail: () => CURRENT_USER }) },
        MailApp: { sendEmail: () => { } },
        Logger: { log: () => { } },
        Utilities: { getUuid: () => randomUUID() },
        ContentService: { MimeType: {}, createTextOutput: (t) => ({ setMimeType() { return this; }, getContent: () => t }) },
        ScriptApp: { getService: () => ({ getUrl: () => '' }) },
        CacheService: { getScriptCache: () => ({ put() { }, getAll: () => ({}) }) },
        console,
    };

    const ctx = createContext(sandbox);
    ['Código.js', 'ContentAPI.js', 'PeopleAPI.js'].forEach((f) => {
        runInContext(readFileSync(join(GAS, f), 'utf8'), ctx);
    });
    sandbox.__noop = () => { };
    runInContext('handleLog = __noop;', ctx);
    api = sandbox;

    const people = SS.insertSheet('People');
    people.appendRow(['LDAP', 'Role', 'Role_Category', 'Segment']);
    [
        ['lucaste', 'Team Lead', 'TL', 'PT'],
        ['anaflor', 'Support Agent', 'Agent', 'PT'],
        ['brunocs', 'Support Agent', 'Agent', 'ES'],
        ['carladm', 'Apprentice', 'Apprentice', 'PT'],
    ].forEach((r) => people.appendRow(r));

    const antes = CURRENT_USER;
    CURRENT_USER = 'lucaste@google.com';
    api.saveContentAccess('tlaine', 'TL', true);
    api.saveContentAccess('qapessoa', 'QA', true);
    CURRENT_USER = antes;
}

function peopleRows() {
    return SS.getSheetByName('People')._data.slice(1).map((r) => r.slice());
}
function linhaDe(ldap) {
    return peopleRows().find((r) => r[0] === ldap);
}

// ---------------------------------------------------------------
//  Página: o ContentDashboard.html real, sem o scriptlet do Apps Script
// ---------------------------------------------------------------
const htmlDir = mkdtempSync(join(tmpdir(), 'cw-people-'));
const htmlPath = join(htmlDir, 'dashboard.html');
writeFileSync(
    htmlPath,
    readFileSync(join(GAS, 'ContentDashboard.html'), 'utf8').replace('<?!= CW_ENV_BADGE ?>', ''),
    'utf8'
);

// A ponte. `google.script.run` é encadeável e assíncrono; o Proxy reproduz a
// forma exata (withSuccessHandler / withFailureHandler / método) para que o JS
// da página não saiba que não está no Apps Script.
const SHIM = `
window.__flashes = [];
window.google = { script: { run: (function make(ok, err) {
  return new Proxy({}, { get: function (_, prop) {
    if (prop === 'withSuccessHandler') return function (fn) { return make(fn, err); };
    if (prop === 'withFailureHandler') return function (fn) { return make(ok, fn); };
    if (typeof prop !== 'string') return undefined;
    return function () {
      var args = Array.prototype.slice.call(arguments);
      window.__gasCall(prop, JSON.stringify(args)).then(function (res) {
        if (res.ok) { if (ok) ok(res.value); }
        else if (err) err(new Error(res.error));
      });
    };
  }});
})(null, null) } };

// O pisca dura menos de um segundo; sem registrar a passagem dele, o teste
// disputaria uma corrida com a própria animação.
document.addEventListener('DOMContentLoaded', function () {
  new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      var cls = m.target.className || '';
      if (typeof cls === 'string' && cls.indexOf('flash-') !== -1) {
        window.__flashes.push({ row: m.target.dataset.row, cls: cls });
      }
    });
  }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
});
`;

let pass = 0, fail = 0;
function check(nome, cond, extra) {
    if (cond) { console.log('  ✓ ' + nome); pass++; }
    else { console.log('  ✗ ' + nome + (extra ? '\n      ' + extra : '')); fail++; }
}

async function abrirComo(browser, ldap) {
    CURRENT_USER = ldap + '@google.com';
    const page = await browser.newPage();
    // Fontes externas não têm o que fazer aqui e só adicionam espera de rede.
    await page.route('https://fonts.googleapis.com/**', (r) => r.abort());
    await page.route('https://fonts.gstatic.com/**', (r) => r.abort());
    await page.exposeFunction('__gasCall', (nome, argsJson) => {
        try {
            const args = JSON.parse(argsJson);
            return { ok: true, value: JSON.parse(JSON.stringify(api[nome].apply(null, args))) };
        } catch (e) {
            return { ok: false, error: e.message };
        }
    });
    await page.addInitScript(SHIM);
    await page.goto('file://' + htmlPath);
    await page.waitForSelector('#app:not(.hidden), #denied-state:not(.hidden)');
    return page;
}

const browser = await chromium.launch();

try {
    // -----------------------------------------------------------
    console.log('\n--- Quem vê a aba ---');
    bootBackend();

    let page = await abrirComo(browser, 'qapessoa');
    check('QA não vê a aba Pessoas', await page.locator('#tab-people').isHidden());
    await page.close();

    page = await abrirComo(browser, 'tlaine');
    check('TL vê a aba Pessoas', await page.locator('#tab-people').isVisible());
    await page.close();

    // -----------------------------------------------------------
    console.log('\n--- A lista, como o ADMIN a vê ---');
    page = await abrirComo(browser, 'lucaste');
    await page.click('#tab-people');
    await page.waitForSelector('.ppl-row');

    check('as quatro pessoas aparecem', (await page.locator('.ppl-row').count()) === 4);
    check(
        'o resumo conta gente e liderança',
        /4 pessoas · 1 com acesso de liderança/.test(await page.locator('#ppl-summary').textContent()),
        await page.locator('#ppl-summary').textContent()
    );
    check(
        'a lista tem cabeçalho de colunas',
        /Pessoa[\s\S]*Categoria e segmento[\s\S]*Idioma/.test(await page.locator('.ppl-head').textContent())
    );
    check(
        'só o TL leva o escudo de liderança',
        (await page.locator('.ppl-row .ppl-lead').count()) === 1 &&
        (await page.locator('[data-row="lucaste"] .ppl-lead').count()) === 1
    );

    const corPt = await page.locator('[data-row="anaflor"] .ppl-chip').last()
        .locator('.ppl-dot').evaluate((el) => getComputedStyle(el).backgroundColor);
    const corEs = await page.locator('[data-row="brunocs"] .ppl-chip').last()
        .locator('.ppl-dot').evaluate((el) => getComputedStyle(el).backgroundColor);
    check('segmento PT e ES saem em cores diferentes', corPt !== corEs, corPt + ' vs ' + corEs);
    check('PT é o azul da paleta', corPt === 'rgb(26, 115, 232)', corPt);

    // A coluna carrega um rótulo só para leitor de tela ("Idioma do app: "),
    // então o que se compara é o texto VISÍVEL.
    const idiomaVisivel = (ldap) => page.locator('[data-row="' + ldap + '"] .ppl-lang-code')
        .textContent().then((t) => t.trim());

    check('o idioma derivado do segmento aparece na linha', (await idiomaVisivel('brunocs')) === 'ES');
    check(
        'e a coluna se explica para quem usa leitor de tela',
        (await page.locator('[data-row="brunocs"] .ppl-lang .sr-only').textContent()).indexOf('Idioma do app') === 0
    );

    // -----------------------------------------------------------
    console.log('\n--- Editar no lugar, sem modal ---');
    await page.click('[data-row="anaflor"] [data-act="edit"]');
    await page.waitForSelector('.ppl-editor');

    check('nenhum modal foi aberto', (await page.locator('.modal-backdrop').count()) === 0);
    check('o foco cai no primeiro campo', await page.evaluate(() => document.activeElement.id) === 'ppl-f-role');
    check(
        'a prévia mostra o idioma atual antes de qualquer alteração',
        /PT-BR/.test(await page.locator('#ppl-derived').textContent())
    );

    await page.fill('#ppl-f-seg', 'ES');
    await page.waitForFunction(() => /\bES\b/.test(document.getElementById('ppl-derived').textContent));
    check('trocar o segmento atualiza o idioma previsto na hora', true);

    await page.fill('#ppl-f-cat', 'TL');
    await page.waitForFunction(() => /liderança/.test(document.getElementById('ppl-derived').textContent));
    check('e uma categoria de liderança é anunciada antes de salvar', true);

    // Volta a categoria: o que se quer testar aqui é a troca de fluxo.
    await page.fill('#ppl-f-cat', 'Agent');
    await page.click('.ppl-editor [data-act="save"]');
    await page.waitForSelector('.ppl-editor', { state: 'detached' });

    check(
        'ADMIN: a planilha muda na hora',
        JSON.stringify(linhaDe('anaflor')) === JSON.stringify(['anaflor', 'Support Agent', 'Agent', 'ES']),
        JSON.stringify(linhaDe('anaflor'))
    );
    check(
        'e o perfil que o app lê muda junto',
        api.getUserProfileByLdap('anaflor').defaultLanguage === 'ES'
    );
    const flashes = await page.evaluate(() => window.__flashes);
    check(
        'a linha alterada pisca em verde (aplicado)',
        flashes.some((f) => f.row === 'anaflor' && /flash-applied/.test(f.cls)),
        JSON.stringify(flashes)
    );
    check(
        'o toast confirma que caiu na planilha',
        /aplicada na aba People/.test(await page.locator('#toast').textContent())
    );
    check('a linha repintada já mostra o segmento novo', (await idiomaVisivel('anaflor')) === 'ES');

    // -----------------------------------------------------------
    console.log('\n--- Busca e filtro ---');
    await page.fill('#ppl-search', 'apprentice');
    await page.waitForFunction(() => document.querySelectorAll('.ppl-row').length === 1);
    check('a busca varre cargo e categoria, não só o LDAP',
        (await page.locator('.ppl-row').first().getAttribute('data-row')) === 'carladm');

    await page.fill('#ppl-search', '');
    await page.waitForFunction(() => document.querySelectorAll('.ppl-row').length === 4);
    await page.click('#ppl-filters [data-seg="es"]');
    await page.waitForFunction(() => document.querySelectorAll('.ppl-row').length === 2);
    check('o filtro de segmento é montado a partir da própria planilha', true);
    await page.click('#ppl-filters [data-seg=""]');
    await page.waitForFunction(() => document.querySelectorAll('.ppl-row').length === 4);

    // -----------------------------------------------------------
    console.log('\n--- Admissão e baixa ---');
    await page.click('#ppl-new-btn');
    await page.waitForSelector('#ppl-f-ldap');
    await page.fill('#ppl-f-ldap', 'novapes');
    await page.fill('#ppl-f-role', 'Support Agent');
    await page.fill('#ppl-f-cat', 'Agent');
    await page.fill('#ppl-f-seg', 'ES');
    await page.click('.ppl-editor [data-act="save"]');
    await page.waitForSelector('[data-row="novapes"]');
    check('admissão entra na planilha', !!linhaDe('novapes'));

    await page.click('[data-row="novapes"] [data-act="remove"]');
    await page.waitForSelector('.modal-backdrop');
    await page.click('#ppl-rm-go');
    check(
        'baixa sem motivo é barrada, e a pessoa continua lá',
        /motivo/i.test(await page.locator('#toast').textContent()) && !!linhaDe('novapes')
    );

    await page.fill('#ppl-rm-note', 'saiu do time');
    await page.click('#ppl-rm-go');
    await page.waitForSelector('[data-row="novapes"]', { state: 'detached' });
    check('com motivo, a linha sai da planilha', !linhaDe('novapes'));
    check(
        'e a pessoa volta ao perfil restritivo',
        api.getUserProfileByLdap('novapes').isOverhead === false &&
        api.getUserProfileByLdap('novapes').role === 'Unknown'
    );
    await page.close();

    // -----------------------------------------------------------
    console.log('\n--- O TL propõe, a planilha espera ---');
    page = await abrirComo(browser, 'tlaine');
    await page.click('#tab-people');
    await page.waitForSelector('.ppl-row');

    check(
        'para o TL o botão diz que aquilo vai para aprovação',
        await page.locator('[data-row="carladm"] [data-act="edit"]').isVisible()
    );

    const antesDoTl = JSON.stringify(linhaDe('carladm'));
    await page.click('[data-row="carladm"] [data-act="edit"]');
    await page.waitForSelector('.ppl-editor');
    check(
        'e o botão de salvar assume outro nome para ele',
        (await page.locator('.ppl-editor [data-act="save"]').textContent()).trim() === 'Enviar para aprovação'
    );

    await page.fill('#ppl-f-seg', 'ES');
    await page.click('.ppl-editor [data-act="save"]');
    await page.waitForSelector('.ppl-row.is-pending');

    check('TL: a planilha NÃO muda', JSON.stringify(linhaDe('carladm')) === antesDoTl, linhaDe('carladm'));
    check(
        'a linha fica marcada como em revisão',
        (await page.locator('[data-row="carladm"]').getAttribute('class')).indexOf('is-pending') !== -1
    );
    check(
        'e diz exatamente o que mudaria',
        /segmento PT → ES/.test(await page.locator('.ppl-pending-note').textContent()),
        await page.locator('.ppl-pending-note').textContent()
    );
    check(
        'a linha em revisão não aceita uma segunda alteração',
        (await page.locator('[data-row="carladm"] [data-act="edit"]').count()) === 0
    );
    const flashesTl = await page.evaluate(() => window.__flashes);
    check(
        'o pisca é âmbar (na fila), não verde',
        flashesTl.some((f) => f.row === 'carladm' && /flash-queued/.test(f.cls)),
        JSON.stringify(flashesTl)
    );
    await page.close();

    // -----------------------------------------------------------
    console.log('\n--- O ADMIN decide ---');
    page = await abrirComo(browser, 'lucaste');
    await page.click('[data-tab="approvals"]');
    await page.waitForSelector('#approvals-list .card');

    const fila = await page.locator('#approvals-list').textContent();
    check('a proposta de gente aparece na mesma fila do conteúdo', /carladm/.test(fila));
    check('e a revisão mostra o idioma e o acesso que ela produz', /Idioma do app: ES/.test(fila), fila.slice(0, 400));

    await page.click('#approvals-list .btn-success');
    await page.waitForFunction(() => /aplicada|Publicado/.test(document.getElementById('toast').textContent));
    check(
        'aprovar aplica na planilha',
        JSON.stringify(linhaDe('carladm')) === JSON.stringify(['carladm', 'Apprentice', 'Apprentice', 'ES']),
        JSON.stringify(linhaDe('carladm'))
    );
    await page.close();

} finally {
    await browser.close();
}

console.log('\n' + (fail ? '✗' : '✓') + ' ' + pass + ' passaram, ' + fail + ' falharam\n');
process.exit(fail ? 1 : 0);
