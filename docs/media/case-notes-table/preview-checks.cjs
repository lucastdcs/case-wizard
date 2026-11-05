// docs/media/case-notes-table/preview-checks.cjs
//
// ROTEIRO de comportamento do protótipo `preview.html` (52 checagens). NÃO é teste de produção:
// os seletores são os do protótipo. Serve para (1) ver o protótipo verde antes de portar e
// (2) listar, uma a uma, as regras que `scripts/smoke-note-table.mjs` precisa provar na tela real.
// As asserções foram validadas por mutação (5 regras quebradas, cada uma reprovou a checagem certa).
//
// Uso (na raiz): CW_CHROMIUM=/opt/pw-browsers/chromium node docs/media/case-notes-table/preview-checks.cjs
// Prints de depuração vão para a pasta temporária do sistema, não para o repositório.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');
const SP = path.join(os.tmpdir(), 'note-table-preview-checks');
fs.mkdirSync(SP, { recursive: true });
const FILE = 'file://' + (process.env.PREVIEW_FILE || path.join(__dirname, 'preview.html'));
const results = [];
const check = (name, ok, extra = '') => { results.push([ok, name, extra]); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  [' + extra + ']' : '')); };

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CW_CHROMIUM || undefined });
  const ctx = await browser.newContext({ viewport: { width: 1300, height: 900 }, deviceScaleFactor: Number(process.argv[2] || 1) });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(FILE);

  // 1. estado inicial
  check('abre em ALL TASKS com o bloco General details', await page.evaluate(() => st.seg === 'all' && st.active.has('general') && st.active.size === 1));
  check('Date e CID chegam como Auto', await page.locator('[data-row="date"] .tag-auto').count() === 1 && await page.locator('[data-row="cid"] .tag-auto').count() === 1);
  const generalRows = await page.evaluate(() => document.querySelectorAll('#preview table')[0].rows.length);
  // 11 + 5 linhas + 2 cabeçalhos de seção = 18, igual ao template de origem
  check('General details tem 18 linhas (como o template)', generalRows === 18, 'veio ' + generalRows);
  check('Inserir bloqueado enquanto há pendência', await page.locator('#bInsert').isDisabled());

  // 2. regras por sub-status
  await page.fill('#subIn', 'NI - In Consult');
  const fu = await page.evaluate(() => ensure('next_followup').v);
  const d3 = await page.evaluate(() => addBusinessDays(3));
  check('NI - In Consult sugere follow-up em 3 dias úteis', fu === d3, `${fu} vs ${d3}`);
  await page.fill('#subIn', 'SO - Implementation Only');
  check('SO tem follow-up NA automático', await page.evaluate(() => ensure('next_followup').na === true && ensure('next_followup').auto === true));
  await page.fill('#subIn', 'IN - Not Reachable');
  check('IN - Not Reachable marca o consentimento como NA', await page.evaluate(() => ensure('consent').na === true));
  await page.fill('#subIn', 'SO - Implementation Only');
  check('SO volta a pedir o consentimento', await page.evaluate(() => ensure('consent').na === false));

  // 3. blocos sugeridos por task (ACT já marcada)
  const sug = await page.locator('.bcard .tag', { hasText: 'sugerido' }).count();
  check('ACT sugere Before, Implementation e After', sug === 3, 'sugeridos: ' + sug);
  const card = (re) => page.locator('.bcard').filter({ has: page.locator('.t', { hasText: re }) });
  for (const re of [/^Before implementation/, /^Implementation/, /^After implementation/]) await card(re).click();
  check('4 blocos ativos', await page.evaluate(() => st.active.size === 4));
  check('linhas só-ECW ocultas sem ECW', await page.locator('[data-row="b_diag"]').count() === 0 && await page.locator('[data-row="i_ec"]').count() === 0);
  await page.locator('#taskChips .chip', { hasText: 'ECW4' }).click();
  check('com ECW as linhas só-ECW aparecem', await page.locator('[data-row="b_diag"]').count() === 1 && await page.locator('[data-row="i_em"]').count() === 1);
  await page.locator('#taskChips .chip', { hasText: 'ECW4' }).click();

  // 4. preencher e inserir
  await page.locator('#scenChips .chip').first().click();
  check('cenário preenche Call Summary e Sub-status Reason', await page.evaluate(() => ensure('call_summary').v.length > 20 && ensure('substatus_reason').v.length > 10));
  await page.click('[data-row="speakeasy"] button:has-text("Auto busca")');
  check('fora da Europa o consentimento já vem Yes, com "Alterar" e sem botões', await page.locator('[data-row="consent"] button:has-text("Alterar")').count() === 1 && await page.locator('[data-row="consent"] .yn').count() === 0 && await page.evaluate(() => resolved(allRows().find(r => r.id === 'consent')) === 'Yes'));
  await page.fill('[data-row="impl_tags"] input', 'Purchase_Shopify');
  await page.fill('[data-row="website"] input', 'https://example.com/ss/1');
  await page.fill('[data-row="date"] input', '05/11/2026');
  check('data fora de AAAA-MM-DD marca o campo como inválido', await page.locator('[data-row="date"] input.bad').count() === 1);
  await page.fill('[data-row="date"] input', await page.evaluate(() => todayISO()));
  check('data válida limpa a marca', await page.locator('[data-row="date"] input.bad').count() === 0);
  const missBefore = await page.evaluate(() => missingList().length);
  check('ainda há pendências antes do NA em lote', missBefore > 5, 'faltam ' + missBefore);
  await page.waitForTimeout(2800);
  await page.evaluate(() => { document.querySelector('#paneForm').scrollTop = 0; });
  await page.screenshot({ path: SP + '/shot-agent-flow.png' });
  await page.evaluate(() => { document.querySelector('#paneForm').scrollTop = document.querySelector('[data-row="date"]').offsetTop - 30; });
  await page.screenshot({ path: SP + '/shot-agent-partial.png' });
  await page.click('#bNaRest');
  const missAfter = await page.evaluate(() => missingList());
  check('NA em lote resolve o que aceita NA', missAfter.length === 0, missAfter.join(' | '));
  check('Inserir liberado', await page.locator('#bInsert').isEnabled());
  await page.screenshot({ path: SP + '/shot-agent-all.png' });
  await page.click('#bInsert');
  const ov = await page.evaluate(() => {
    const t = [...document.querySelectorAll('#crmEd table')];
    return { tables: t.length, pending: document.querySelector('#crmEd').innerHTML.includes('pendente'), hasClass: /\sclass=/.test(document.querySelector('#crmEd').innerHTML), na: document.querySelector('#crmEd').textContent.includes('NA') };
  });
  check('nota inserida tem 5 tabelas (4 blocos + Additional Details), sem "pendente" e sem class', ov.tables === 5 && !ov.pending && !ov.hasClass, JSON.stringify(ov));
  await page.screenshot({ path: SP + '/shot-insert.png' });
  await page.click('#crmClose');

  // 4b. campos do formato anterior, como tabela no fim da nota
  check('Additional Details é a última tabela da nota', await page.evaluate(() => { const t = [...document.querySelectorAll('#preview table')]; return t[t.length - 1].textContent.includes('Additional Details'); }));
  check('ALL TASKS não imprime título acima das tabelas', ((await page.locator('#preview').innerHTML()).match(/margin:16px 0 6px 0/g) || []).length === 0);
  const bd = await page.evaluate(() => { const bad = []; for (let n = 1; n <= 15; n++) { const d = new Date(addBusinessDays(n) + 'T12:00:00'); if ([0, 6].includes(d.getDay())) bad.push(n); } return { bad, zero: addBusinessDays(0) === todayISO() }; });
  check('dias úteis nunca caem em fim de semana', bd.bad.length === 0 && bd.zero, JSON.stringify(bd));
  check('BAU mostra On Call', await page.locator('[data-row="oncall"]').count() === 1);
  await page.locator('#flowSel button', { hasText: 'LM' }).click();
  check('LM esconde On Call', await page.locator('[data-row="oncall"]').count() === 0);
  await page.locator('#flowSel button', { hasText: 'BAU' }).click();
  await page.fill('#subIn', 'NI - Attempted Contact');
  check('NI - Attempted Contact mostra as 3 evidências de contato', await page.locator('[data-row^="ev_"]').count() === 3);
  await page.fill('#subIn', 'IN - Not Reachable');
  check('IN - Not Reachable mostra Call attempt e não as evidências', await page.locator('[data-row="call_attempt"]').count() === 1 && await page.locator('[data-row^="ev_"]').count() === 0);
  await page.fill('#subIn', 'SO - Implementation Only');
  check('Tag Support nasce em No, com motivo opcional', await page.evaluate(() => ensure('ts_used').v === 'No') && await page.locator('[data-row="ts_reason"]').count() === 1);
  await page.locator('[data-row="ts_used"] .yn button:has-text("Yes")').click();
  const tsTxt = await page.locator('#preview').innerText();
  check('Tag Support Yes: o motivo some e a task leva o aviso do Win Criteria', await page.locator('[data-row="ts_reason"]').count() === 0 && tsTxt.includes('Tag created/verified by Tag Support'));
  await page.locator('[data-row="ts_used"] .yn button:has-text("No")').click();
  await page.locator('#taskChips .chip', { hasText: 'Ads Conversion Tracking' }).click();
  check('sem ACT/ECW o Tag Support some', await page.locator('[data-row="ts_used"]').count() === 0);
  await page.locator('#taskChips .chip', { hasText: 'Ads Conversion Tracking' }).click();
  check('GTM/GA4 é obrigatório em SO', await page.locator('[data-row="gtm_ga4"] .req').count() === 1);
  await page.fill('#subIn', 'IN - Infeasible');
  check('em IN - Infeasible a linha GTM/GA4 some e vira o chip "+ GTM/GA4 verified"', await page.locator('[data-row="gtm_ga4"]').count() === 0 && await page.locator('#blocksForm .chip', { hasText: 'GTM/GA4 verified' }).count() === 1);
  await page.locator('#blocksForm .chip', { hasText: 'GTM/GA4 verified' }).click();
  check('o chip traz a linha, agora opcional', await page.locator('[data-row="gtm_ga4"]').count() === 1 && await page.locator('[data-row="gtm_ga4"] .req').count() === 0);
  await page.fill('#subIn', 'SO - Implementation Only');
  // consentimento: Alterar -> No, e a regra da Europa (começa sem resposta)
  await page.locator('[data-row="consent"] button:has-text("Alterar")').click();
  await page.locator('[data-row="consent"] .yn button:has-text("No")').click();
  check('Alterar permite marcar No', await page.evaluate(() => resolved(allRows().find(r => r.id === 'consent')) === 'No'));
  await page.click('#bClear');
  await page.locator('#euSel button', { hasText: 'Sim' }).click();
  check('Europa: sem padrão, o agente precisa marcar', await page.evaluate(() => resolved(allRows().find(r => r.id === 'consent')) === null) && await page.locator('[data-row="consent"] .tag.warn').count() === 1);
  check('Europa: aparece a linha "Europe case?" com Yes', await page.locator('[data-row="europe_case"]').count() === 1 && (await page.locator('#preview').innerText()).includes('Europe case?'));
  await page.screenshot({ path: SP + '/shot-europe-raw.png' });
  await page.locator('#euSel button', { hasText: 'Não' }).click();
  check('Europa desligada: volta o padrão Yes e a linha some', await page.evaluate(() => resolved(allRows().find(r => r.id === 'consent')) === 'Yes') && await page.locator('[data-row="europe_case"]').count() === 0);

  // 5. SBS-E e MMS
  await page.locator('#segSel button', { hasText: 'SBS-E' }).click();
  check('SBS-E é de uma fase por nota, começa na Phase 1', await page.evaluate(() => st.active.size === 1 && st.active.has('audit')));
  await page.locator('.bcard', { hasText: 'Phase 2: Implementation Call' }).click();
  check('Phase 2 troca o bloco (não soma)', await page.evaluate(() => st.active.size === 1 && st.active.has('impl_call')));
  check('fases do SBS-E imprimem o título acima da tabela', ((await page.locator('#preview').innerHTML()).match(/margin:16px 0 6px 0/g) || []).length === 1);
  await page.locator('.cidtbl input[type=text]').nth(0).waitFor();
  await page.locator('button:has-text("+ CID")').click();
  const cidInputs = await page.locator('.cidtbl tr').count();
  check('CID: cabeçalho + 2 linhas', cidInputs === 3, 'tr=' + cidInputs);
  await page.locator('.bcard', { hasText: 'Interim' }).click();
  await page.locator('.bcard', { hasText: 'Phase 2: Implementation Call' }).click();
  check('lista de CIDs sobrevive à troca de fase', await page.evaluate(() => st.cids.length === 2));
  await page.waitForTimeout(2800);
  await page.evaluate(() => { document.querySelector('#paneForm').scrollTop = 0; });
  await page.screenshot({ path: SP + '/shot-agent-sbse.png' });
  await page.locator('#segSel button', { hasText: 'MMS' }).click();
  check('MMS tem 5 fases', await page.locator('.bcard').count() === 5);

  // 6. integridade da grade de todos os blocos de todos os segmentos
  const grid = await page.evaluate(() => {
    const bad = [];
    const jobs = []; for (const s of CATALOG.segments) for (const p of s.blocks) jobs.push([s.key, p]); jobs.push(['all', { b: 'extras', title: '' }]);
    ignoreWhen = true;
    for (const [skey, p] of jobs) {
      st.seg = skey; st.tasks = new Set(['ads_enhanced_conversions']);
      const wrap = document.createElement('div'); wrap.innerHTML = blockTable(p, true);
      const t = wrap.querySelector('table'); const N = t.querySelectorAll('col').length;
      const w = [...t.querySelectorAll('col')].reduce((a, c) => a + parseInt(c.style.width), 0);
      const occ = [];
      [...t.rows].forEach((r, ri) => { occ[ri] = occ[ri] || []; let c = 0; for (const cell of r.cells) { while (occ[ri][c]) c++; for (let k = 0; k < cell.rowSpan; k++) { occ[ri + k] = occ[ri + k] || []; for (let j = 0; j < cell.colSpan; j++) occ[ri + k][c + j] = 1; } c += cell.colSpan; } });
      const ok = [...t.rows].every((r, ri) => occ[ri].length === N && [...Array(N).keys()].every(c => occ[ri][c]));
      if (!ok || w !== 100) bad.push(`${skey}/${p.b} N=${N} soma=${w} ok=${ok}`);
    }
    ignoreWhen = false;
    st.seg = 'mms'; st.tasks = new Set(['ads_conversion_tracking']);
    return bad;
  });
  check('toda tabela fecha a grade e soma 100% nas larguras', grid.length === 0, grid.join(' | '));

  // 7. Central edita o mesmo catálogo
  await page.locator('#segSel button', { hasText: 'ALL TASKS' }).click();
  await page.click('.tabs button[data-view="central"]');
  await page.locator('.rt tr').nth(2).locator('input').first().fill('Date (YYYY-MM-DD):');
  await page.locator('.rt tr').filter({ has: page.locator('input[value="Additional information:"]') }).locator('input[aria-label="visible"]').uncheck();
  check('prévia da Central reflete a edição', (await page.locator('#cpreview').innerText()).includes('Date (YYYY-MM-DD):'));
  await page.screenshot({ path: SP + '/shot-central.png' });
  await page.locator('#rail button', { hasText: 'Additional details' }).click();
  check('Central: Additional details mostra todas as linhas na prévia', (await page.locator('#cpreview').innerText()).includes('Contact evidence: Call 1'));
  await page.locator('#rail button', { hasText: 'Phase 2: Implementation Call' }).click();
  const hasTitle = async () => (await page.locator('#cpreview').innerText()).includes('Phase 2: Implementation Call');
  check('Central: título acima da tabela ligado no SBS-E', await hasTitle());
  await page.locator('#cmain input[type=checkbox]').first().uncheck();
  check('Central: desligar o título tira a linha da prévia', !(await hasTitle()));
  await page.locator('#cmain input[type=checkbox]').first().check();
  await page.click('.tabs button[data-view="agent"]');
  const txt = await page.locator('#preview').innerText();
  check('a edição da Central chegou na tela do agente', txt.includes('Date (YYYY-MM-DD):') && !txt.includes('Additional information'));

  // 8. padrão do segmento nas Configurações
  await page.click('#gear');
  await page.check('input[name=dflt][value=mms]');
  await page.reload();
  check('Configurações: reabre no segmento padrão (MMS)', await page.evaluate(() => st.seg === 'mms'));
  await page.click('#gear'); await page.check('input[name=dflt][value=last]');
  await page.locator('#segSel button', { hasText: 'SBS-E' }).click();
  await page.reload();
  check('Configurações: "o último que usei" lembra o SBS-E', await page.evaluate(() => st.seg === 'sbse'));

  check('sem erros de console', errors.length === 0, errors.join(' | '));
  const bad = results.filter(r => !r[0]);
  console.log(`\n${results.length - bad.length}/${results.length} checagens ok`);
  await browser.close();
  process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('ERRO NO TESTE', e); process.exit(2); });
