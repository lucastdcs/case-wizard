// docs/media/case-notes-table/preview-checks.cjs
//
// ROTEIRO do protótipo `preview.html`. NÃO é teste de produção: os seletores são os do protótipo.
// Serve para (1) ver o protótipo verde antes de portar e (2) listar, uma a uma, as regras de comportamento
// E de desenho que `scripts/smoke-note-table.mjs` precisa provar na tela real.
// Duas famílias: COMPORTAMENTO (regras da spec) e DESENHO (grade de 4/8px, pesos 400/500, sem borda
// chapada, alvos >= 32px, `transition` sem `all`), medidas no DOM renderizado, não olhadas no print.
// As asserções foram validadas por mutação (regras quebradas de propósito reprovam a checagem certa).
//
// Uso (na raiz): CW_CHROMIUM=/opt/pw-browsers/chromium node docs/media/case-notes-table/preview-checks.cjs
const { chromium } = require('playwright');
const path = require('path');
const FILE = 'file://' + (process.env.PREVIEW_FILE || path.join(__dirname, 'preview.html'));
const results = [];
const check = (name, ok, extra = '') => { results.push([ok, name, extra]); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  [' + extra + ']' : '')); };

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CW_CHROMIUM || undefined });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(FILE);
  const row = id => page.locator(`#form [data-row="${id}"]`);
  const pick = async name => { await page.click('#pick'); await page.locator('#pop .opt', { hasText: name }).click(); };
  const val = id => page.evaluate(i => resolved(allRows().find(r => r.id === i)), id);
  const openNota = async () => { if (!(await page.evaluate(() => st.ctxOpen))) await page.locator('#ctx .pick').nth(1).click(); };
  const setSeg = async name => { await openNota(); await page.locator('#ctx [role=radiogroup][aria-label="Tipo de nota"] button', { hasText: name }).click(); };

  // ================= COMPORTAMENTO =================
  // --- começo e seletor de sub-status ---
  check('abre em ALL TASKS, idioma EN, fluxo BAU, sem sub-status', await page.evaluate(() => st.seg === 'all' && st.lang === 'en' && st.flow === 'bau' && st.substatus === ''));
  check('o seletor de tipo de nota NÃO está no topo: some da tela até abrir a linha "Nota"', await page.locator('#ctx [role=radiogroup][aria-label="Tipo de nota"]').count() === 0 && !(await page.locator('#ctx').innerText()).includes('Segmento'));
  check('no tipo padrão, nem a linha "Nota" nem a faixa fixa citam ALL TASKS (só o que foge do padrão aparece)', !(await page.locator('#ctx .pick').nth(1).innerText()).includes('ALL TASKS') && !(await page.locator('#sticky').innerText()).includes('ALL TASKS'));
  await openNota();
  check('dentro de "Nota" estão os 3 tipos, com o Sales program lido do CRM como pista', await page.locator('#ctx [role=radiogroup][aria-label="Tipo de nota"] button').count() === 3 && (await page.locator('#ctx .cap2').innerText()).includes('umm_scaled'));
  await page.locator('#ctx .pick').nth(1).click();
  check('sem sub-status: só o estado vazio, nenhum campo da nota', await page.locator('#form .empty-s').count() === 1 && await page.locator('#form .row').count() === 0);
  check('Preencher bloqueado e a gaveta fechada ao abrir', await page.locator('#bFill.blocked').count() === 1 && !(await page.locator('#drawer.open').count()));
  await page.click('#pick'); await page.fill('#pop input', 'ts so verif');
  check('buscar pelo ATALHO (ts so verif) acha o sub-status', await page.locator('#pop .opt').count() === 1 && (await page.locator('#pop .opt').innerText()).includes('SO - Implementation Only'));
  await page.keyboard.press('Enter');
  check('Enter escolhe o primeiro resultado', await page.evaluate(() => st.substatus === 'SO - Implementation Only'));
  await page.click('#pick'); await page.fill('#pop input', 'PI - Audit In Progress');
  check('texto fora da lista oferece "Usar …" (os PI se digitam)', (await page.locator('#pop .opt').first().innerText()).includes('Usar'));
  await page.keyboard.press('Enter');
  check('sub-status PI digitado vale, com aviso de "fora da lista"', await page.evaluate(() => st.substatus === 'PI - Audit In Progress') && (await page.locator('#ctx .cw>.fn').innerText()).includes('Fora da lista'));
  await pick('SO - Implementation Only');
  check('com sub-status oficial a dica diz que o follow-up não se aplica', (await page.locator('#ctx .cw>.fn').innerText()).includes('não se aplica'));

  // --- regras automáticas (spec §6 e §7) ---
  await pick('NI - In Consult');
  const d3 = await page.evaluate(() => addBusinessDays(3));
  check('NI - In Consult sugere follow-up em 3 dias úteis', await page.evaluate(() => ensure('next_followup').v) === d3);
  await pick('IN - Not Reachable');
  check('IN - Not Reachable marca o consentimento como NA', await page.evaluate(() => ensure('consent').na === true));
  await pick('SO - Implementation Only');
  check('SO volta a ter o consentimento em Yes (padrão)', await page.evaluate(() => ensure('consent').na === false && ensure('consent').v === 'Yes' && ensure('consent').defaulted === true));
  const bd = await page.evaluate(() => { const bad = []; for (let n = 1; n <= 15; n++) { const d = new Date(addBusinessDays(n) + 'T12:00:00'); if ([0, 6].includes(d.getDay())) bad.push(n); } return { bad, zero: addBusinessDays(0) === todayISO() }; });
  check('dias úteis nunca caem em fim de semana', bd.bad.length === 0 && bd.zero, JSON.stringify(bd));

  // --- cartão automático ---
  const autoTxt = await page.locator('.auto-h').innerText();
  check('"Preenchido automaticamente" reúne Date, Follow-up, CID e Consent (4)', autoTxt.includes('4') && (await page.locator('.auto-sum').innerText()).includes('CID 123-456-7890') && (await page.locator('.auto-sum').innerText()).includes('Consent Yes'));
  check('as linhas automáticas NÃO aparecem soltas no formulário (menos para ler)', await row('date').count() === 0 && await row('cid').count() === 0);
  await page.click('.auto-h');
  check('abrir o cartão mostra as linhas, editáveis, com a marca Auto', await row('date').count() === 1 && await row('date').locator('.tag').count() === 1);
  await row('date').locator('input').fill('2026-12-01');
  check('editar uma linha automática tira a marca Auto', await row('date').locator('.tag').count() === 0);
  await page.click('.auto-h');

  // --- contexto: blocos, tasks, Nota ---
  check('o chip General não existe (é sempre ligado); os outros 4 sim', await page.locator('#ctx .chip', { hasText: 'General' }).count() === 0 && await page.locator('#ctx .row.chiprow').nth(1).locator('.chip').count() === 4);
  check('ACT sugere Before, Implementation e After (ponto no chip)', await page.locator('#ctx .row.chiprow').nth(1).locator('.dot').count() === 3);
  await page.locator('#ctx .chip', { hasText: /^Before/ }).click();
  await page.locator('#ctx .chip', { hasText: /^Implementation/ }).click();
  await page.locator('#ctx .chip', { hasText: /^After/ }).click();
  check('4 blocos ativos (General + 3)', await page.evaluate(() => st.active.size === 4));
  check('sugestão some do chip já ligado', await page.locator('#ctx .row.chiprow').nth(1).locator('.dot').count() === 0);
  check('linhas só-ECW ocultas sem ECW', await row('b_diag').count() === 0 && await row('i_ec').count() === 0 && !(await page.evaluate(() => noteHtml(false))).includes('Tag Diagnostics:'));
  await page.locator('#ctx .chip', { hasText: 'ECW' }).click();
  check('com ECW as linhas só-ECW entram na nota', (await page.evaluate(() => noteHtml(false))).includes('Tag Diagnostics:'));
  await page.locator('#ctx .chip', { hasText: 'ECW' }).click();

  // --- pendência e preenchimento ---
  const n0 = await page.evaluate(() => missingList().length);
  check('há pendências no começo e o rodapé diz quantas', n0 > 8 && (await page.locator('#sTxt').innerText()).startsWith(String(n0)));
  check('antes de tentar preencher, a faixa de pendências não aparece (tela calma)', await page.locator('#pbar.on').count() === 0 && await page.locator('#form .row.pending').count() === 0);
  await row('speakeasy').locator('button:has-text("Auto busca")').click();
  await row('impl_tags').locator('input').fill('Purchase_Shopify');
  await row('website').locator('input').fill('https://example.com/ss/1');
  await row('qplus').locator('input').fill('https://example.com/ss/2');
  await row('gam').locator('input').fill('not-a-url');
  check('link fora do formato marca a linha como inválida', await row('gam').evaluate(e => e.classList.contains('bad')));
  await row('gam').locator('input').fill('https://example.com/ss/3');
  check('link válido limpa a marca', !(await row('gam').evaluate(e => e.classList.contains('bad'))));
  await page.click('#bFill');
  check('Preencher com pendência não insere: abre a faixa de pendências e marca as linhas', await page.locator('#pbar.on').count() === 1 && (await page.locator('#pTxt').innerText()).includes('pendente') && await page.locator('#form .row.pending').count() > 0 && !(await page.locator('#toast').innerText()).includes('inserido'));
  await page.click('#pNext');
  check('"Próxima" leva o foco a outra linha pendente', await page.evaluate(() => !!document.activeElement.closest('.row.pending')));
  await page.click('#pNa');
  const rest = await page.evaluate(() => missingList().sort().join(' | '));
  check('"Marcar o restante como NA" resolve o que aceita NA e deixa só o que não aceita', rest === 'Call Summary | Sub-status Reason', rest);
  check('"Marcar o restante como NA" não marca NA nas linhas que não aceitam (Call Summary, Sub-status Reason)', await page.evaluate(() => ensure('call_summary').na === false && ensure('substatus_reason').na === false && ensure('date').na === false));
  check('NA é um clique e vira "Desfazer"', await (async () => { await row('gvc').locator('.na').click(); const t = await row('gvc').locator('.na').innerText(); await row('gvc').locator('.na').click(); return t === 'NA'; })());
  await page.locator('#form .chips .chip').first().click();
  check('cenário preenche Call Summary e Sub-status Reason', await page.evaluate(() => ensure('call_summary').v.length > 20 && ensure('substatus_reason').v.length > 10));
  check('resolvendo as linhas (valor ou NA), não sobra pendência e a faixa some', await page.evaluate(() => missingList().length) === 0 && await page.locator('#pbar.on').count() === 0);
  check('rodapé vira "Pronta para preencher" e Preencher libera', (await page.locator('#sTxt').innerText()) === 'Pronta para preencher' && await page.locator('#bFill.blocked').count() === 0);
  await page.click('#bFill');
  check('Preencher com tudo resolvido confirma', (await page.locator('#toast').innerText()).includes('inserido'));

  // --- nota gerada (contrato HTML, spec §3) ---
  const out = await page.evaluate(() => noteHtml(false));
  const tags = [...new Set([...out.matchAll(/<([a-z0-9]+)[ >]/g)].map(m => m[1]))].sort().join(',');
  check('nota só com tags permitidas, sem class/style/script/data-row', /^(br,)?col,colgroup,div,table,tbody,td,th,tr$/.test(tags) && !/\sclass=|<style|<script|data-row/.test(out), tags);
  check('Additional Details é a última tabela da nota', await page.evaluate(() => { const w = document.createElement('div'); w.innerHTML = noteHtml(false); const t = w.querySelectorAll('table'); return t[t.length - 1].textContent.includes('Additional Details'); }));
  check('ALL TASKS não imprime título acima das tabelas', !/margin:16px 0 6px 0/.test(out));
  check('rodapé da nota segue o idioma da nota (EN) e muda com o seletor', out.includes('Note created through Cases Wizard.') && await (async () => { await page.evaluate(() => { st.lang = 'pt'; }); const o = await page.evaluate(() => noteHtml(false)); await page.evaluate(() => { st.lang = 'en'; }); return o.includes('Nota criada através do Cases Wizard.') && o.includes('Call Summary:'); })());

  // --- Nota (idioma, fluxo, Europa) e consentimento ---
  await page.click('#bClear');
  check('Limpar volta ao estado vazio', await page.evaluate(() => st.substatus === '' && Object.keys(st.vals).length >= 0) && await page.locator('#form .empty-s').count() === 1);
  await pick('SO - Implementation Only');
  check('linha "Nota" recolhida mostra idioma, fluxo e Europa', (await page.locator('#ctx .pick').nth(1).innerText()).includes('EN · BAU · Fora da Europa') && await page.locator('#ctx [role=switch]').count() === 0);
  await openNota();
  check('abrir a linha Nota mostra Idioma, Fluxo e o interruptor da Europa', await page.locator('#ctx [role=switch]').count() === 1 && await page.locator('#ctx [role=radiogroup][aria-label="Idioma"]').count() === 1);
  await page.locator('#ctx [role=switch]').click();
  check('Europa: sem padrão; o agente precisa marcar', await val('consent') === null && await page.locator('#form [data-row="consent"] .tag.warn').count() === 1);
  check('Europa: resumo fica em âmbar e a linha "Europe case?" entra na nota', (await page.locator('#ctx .pick').nth(1).innerText()).includes('Caso da Europa') && (await page.evaluate(() => noteHtml(false))).includes('Europe case?'));
  await page.locator('#form [data-row="consent"] .seg button', { hasText: 'No' }).click();
  check('Europa: o agente marca No e vale', await val('consent') === 'No');
  await page.locator('#ctx [role=switch]').click();
  check('fora da Europa o consentimento marcado à mão é preservado', await val('consent') === 'No');
  await page.click('#bClear'); await pick('SO - Implementation Only');
  check('fora da Europa o consentimento já vem Yes, escondido atrás de "Alterar"', await val('consent') === 'Yes');
  await page.click('.auto-h');
  check('"Alterar" está dentro do cartão automático e revela Yes/No', await row('consent').locator('button:has-text("Alterar")').count() === 1 && await row('consent').locator('.seg').count() === 0);
  await row('consent').locator('button:has-text("Alterar")').click();
  await row('consent').locator('.seg button', { hasText: 'No' }).click();
  check('Alterar permite marcar No', await val('consent') === 'No');
  await page.click('#bClear'); await pick('SO - Implementation Only');
  await openNota();
  await page.locator('#ctx [role=radiogroup][aria-label="Fluxo"] button', { hasText: 'LM' }).click();
  await page.click('.auto-h');
  const lm = await page.evaluate(() => noteHtml(false));
  check('LM tira o On Call da nota; BAU devolve', !lm.includes('On Call signaled') && await (async () => { await page.locator('#ctx [role=radiogroup][aria-label="Fluxo"] button', { hasText: 'BAU' }).click(); return (await page.evaluate(() => noteHtml(false))).includes('On Call signaled'); })());

  // --- Additional Details: Tag Support, GTM/GA4, evidências ---
  await page.click('#bClear'); await pick('SO - Implementation Only');
  check('Tag Support nasce em No e aparece só com ACT/ECW', await page.evaluate(() => ensure('ts_used').v === 'No') && await row('ts_used').count() === 1);
  await row('ts_used').locator('.seg button', { hasText: 'Yes' }).click();
  check('Tag Support Yes: a task leva o aviso do Win Criteria', (await page.evaluate(() => noteHtml(false))).includes('Tag created/verified by Tag Support'));
  await row('ts_used').locator('.seg button', { hasText: 'No' }).click();
  await page.locator('#ctx .chip', { hasText: 'ACT' }).click();
  check('sem ACT/ECW o Tag Support some', await row('ts_used').count() === 0);
  await page.locator('#ctx .chip', { hasText: 'ACT' }).click();
  check('GTM/GA4 é obrigatório em SO (linha à vista)', await row('gtm_ga4').count() === 1);
  await pick('IN - Infeasible');
  check('em IN - Infeasible o GTM/GA4 sai da nota e vira "+" dentro de Mais opções', !(await page.evaluate(() => noteHtml(false))).includes('GTM/GA4 verified:') && await row('gtm_ga4').count() === 0);
  await pick('NI - Attempted Contact');
  await page.locator('#form .more').last().click();
  check('NI - Attempted Contact traz as 3 evidências de contato (em Mais opções)', await page.locator('#form [data-row^="ev_"]').count() === 3);
  await pick('IN - Not Reachable');
  check('IN - Not Reachable traz Call attempt e não as evidências', await row('call_attempt').count() === 1 && await page.locator('#form [data-row^="ev_"]').count() === 0);

  // --- SBS-E e MMS ---
  await setSeg('SBS-E');
  check('fora do padrão, a linha "Nota" e a faixa fixa passam a citar o tipo (ECL SBS-E)', (await page.locator('#ctx .pick').nth(1).innerText()).includes('ECL SBS-E') && (await page.locator('#sticky').innerText()).includes('ECL SBS-E'));
  check('SBS-E: uma fase por nota (3 chips), começa na Phase 1', await page.evaluate(() => st.active.size === 1 && st.active.has('audit')) && await page.locator('#ctx .row.chiprow').nth(1).locator('.chip').count() === 3);
  await page.locator('#ctx .chip', { hasText: 'Phase 2' }).click();
  check('Phase 2 troca o bloco (não soma) e imprime o título acima da tabela', await page.evaluate(() => st.active.size === 1 && st.active.has('impl_call')) && ((await page.evaluate(() => noteHtml(false))).match(/margin:16px 0 6px 0/g) || []).length === 1);
  check('seção por CID: uma lista pequena por CID, com TBW e CID', await page.locator('#form [data-row="cid:0:tbw"]').count() === 1 && await page.locator('#form [data-row="cid:0:cid"]').count() === 1);
  await page.locator('#form .chip', { hasText: '+ CID' }).click();
  check('+ CID acrescenta o segundo CID e o botão de remover aparece', await page.evaluate(() => st.cids.length === 2) && await page.locator('#form [aria-label="Remover CID 1"]').count() === 1);
  await page.locator('#ctx .chip', { hasText: 'Interim' }).click();
  await page.locator('#ctx .chip', { hasText: 'Phase 2' }).click();
  check('a lista de CIDs sobrevive à troca de fase', await page.evaluate(() => st.cids.length === 2));
  await setSeg('MMS');
  check('MMS tem 5 fases', await page.locator('#ctx .row.chiprow').nth(1).locator('.chip').count() === 5);
  await setSeg('ALL TASKS');

  // --- gaveta (prévia) ---
  await pick('SO - Implementation Only');
  check('gaveta fechada: conteúdo inerte (fora da ordem do Tab), aba à vista com o nº de pendências', await page.evaluate(() => document.querySelector('#dIn').hasAttribute('inert')) && /^\d+$/.test((await page.locator('#tBadge').innerText()).trim()));
  await page.click('#tab');
  check('clicar na aba abre a gaveta (aria-expanded) e o conteúdo deixa de ser inerte', await page.locator('#drawer.open').count() === 1 && (await page.locator('#tab').getAttribute('aria-expanded')) === 'true' && !(await page.evaluate(() => document.querySelector('#dIn').hasAttribute('inert'))));
  await row('call_summary').locator('textarea').focus();
  check('a linha em foco acende a linha correspondente da nota', await page.locator('#preview tr.hl[data-row="call_summary"]').count() === 1);
  await page.locator('#preview tr[data-row="impl_tags"]').click();
  check('clicar numa linha da nota leva ao campo do formulário', await page.evaluate(() => document.activeElement && document.activeElement.id === 'f-impl_tags'));
  await page.keyboard.press('Escape');
  check('Esc fecha a gaveta', await page.locator('#drawer.open').count() === 0);

  // --- faixa fixa de contexto ---
  await page.evaluate(() => { document.querySelector('#body').scrollTop = document.querySelector('#ctxEnd').offsetTop + 120; });
  await page.waitForTimeout(350);
  check('rolando além do contexto aparece a faixa fixa com segmento, fluxo, idioma e sub-status', await page.locator('#sticky.on').count() === 1 && (await page.locator('#sticky').innerText()).includes('SO - Implementation Only'));
  await page.click('#sticky'); await page.waitForTimeout(600);
  check('clicar na faixa volta ao topo', await page.evaluate(() => document.querySelector('#body').scrollTop < 8));

  // --- grade e larguras do catálogo ---
  const grid = await page.evaluate(() => {
    const bad = []; const jobs = [];
    for (const s of CATALOG.segments) for (const p of s.blocks) jobs.push([s.key, p]);
    jobs.push(['all', { b: 'extras', title: '' }]); ignoreWhen = true;
    for (const [skey, p] of jobs) {
      st.seg = skey; st.tasks = new Set(['ads_enhanced_conversions']);
      const wrap = document.createElement('div'); wrap.innerHTML = blockTable(p, true);
      const t = wrap.querySelector('table'); const N = t.querySelectorAll('col').length; const ws = [...t.querySelectorAll('col')].map(c => parseInt(c.style.width));
      const occ = [];
      [...t.rows].forEach((r, ri) => { occ[ri] = occ[ri] || []; let c = 0; for (const cell of r.cells) { while (occ[ri][c]) c++; for (let k = 0; k < cell.rowSpan; k++) { occ[ri + k] = occ[ri + k] || []; for (let j = 0; j < cell.colSpan; j++) occ[ri + k][c + j] = 1; } c += cell.colSpan; } });
      const ok = [...t.rows].every((r, ri) => occ[ri].length === N && [...Array(N).keys()].every(c => occ[ri][c]));
      const sum = ws.reduce((a, b) => a + b, 0);
      if (!ok || sum !== 100 || ws[N - 1] < 22) bad.push(`${skey}/${p.b} N=${N} soma=${sum} últ=${ws[N - 1]} grade=${ok}`);
    }
    ignoreWhen = false; st.seg = 'all'; st.tasks = new Set(['ads_conversion_tracking']);
    return bad;
  });
  check('toda tabela fecha a grade, soma 100% e a coluna de comentários tem >= 22%', grid.length === 0, grid.join(' | '));

  await page.evaluate(() => { st.vals = {}; applyAuto(); render(); });
  await row('speakeasy').locator('button:has-text("Auto busca")').click();
  check('o Speakeasy ID capturado cabe inteiro no campo (nenhum dígito cortado) e o chip some', await row('speakeasy').locator('input').evaluate(e => e.scrollWidth <= e.clientWidth + 1 && e.value.length === 19) && await row('speakeasy').locator('.chip').isHidden());
  // --- linhas de print (links): o grosso da nota. Colar avança, o estado aparece, NA e comentário só em foco ---
  await page.evaluate(() => { st.seg = 'all'; resetActive(); st.tasks = new Set(['ads_conversion_tracking']); st.substatus = 'SO - Implementation Only'; st.active.add('before'); st.active.add('impl'); st.vals = {}; st.more = {}; st.optIn = new Set(); applyAuto(); render(); document.activeElement && document.activeElement.blur(); });
  await page.mouse.move(40, 600);
  const opac = id => row(id).locator('.na').evaluate(e => getComputedStyle(e).opacity);
  check('NA e comentário ficam invisíveis em repouso (17 "NA" iguais viravam ruído)', await opac('b_status') === '0' && await row('b_status').locator('.cmt').evaluate(e => getComputedStyle(e).opacity) === '0');
  await row('b_status').locator('input').focus();
  await page.waitForTimeout(260);   // a opacidade transiciona em 150ms
  check('em foco a linha mostra NA e comentário', await opac('b_status') === '1' && await row('b_status').locator('.cmt').evaluate(e => getComputedStyle(e).opacity) === '1');
  await page.keyboard.insertText('https://example.com/ss/1');
  await row('b_status').locator('input').dispatchEvent('paste');   // paste simulado: o Chromium sem permissão de clipboard não cola de verdade
  await page.waitForTimeout(60);
  check('colar um link válido mostra o ✓ na linha', await row('b_status').locator('.rv.ok .ck').count() === 1);
  check('colar um link válido leva o foco ao próximo campo vazio', await page.evaluate(() => document.activeElement && document.activeElement.id === 'f-b_dup'));
  await page.keyboard.press('Enter');
  check('Enter pula para o próximo campo vazio, sem preencher nem marcar NA nada', await page.evaluate(() => document.activeElement && document.activeElement.id === 'f-b_bid') && await val('b_dup') === null);
  await page.keyboard.type('na');
  check('digitar "na" numa linha que aceita NA vira NA (maiúsculo) e resolve a linha', await val('b_bid') === 'NA' && !(await page.evaluate(() => missingList().includes('Bidding Optimization'))));
  await row('call_summary').locator('textarea').fill('na');
  check('digitar "NA" onde o padrão não aceita NA (Call Summary) marca o campo', await row('call_summary').evaluate(e => e.classList.contains('bad')));
  await row('call_summary').locator('textarea').fill('');
  await page.mouse.move(40, 600);
  await row('b_qual').locator('.na').click();
  await page.mouse.move(40, 600); await page.evaluate(() => document.activeElement && document.activeElement.blur()); await page.waitForTimeout(260);
  check('NA marcado fica visível mesmo em repouso (o estado nunca se esconde)', await opac('b_qual') === '1');
  await row('b_qual').locator('.na').click();
  // comentário por linha (spec §5): atrás de um ícone, escrito na coluna "Additional Comments" da nota
  await row('b_status').locator('.cmt').click();
  check('o ícone de comentário abre um campo na própria linha, com o foco', await row('b_status').locator('.cmrow input').count() === 1 && await page.evaluate(() => document.activeElement && document.activeElement.closest('.cmrow') !== null));
  await page.keyboard.type('Cliente só tinha acesso de leitura');
  check('o comentário vai para a coluna "Additional Comments" da MESMA linha da nota', await page.evaluate(() => { const tr = document.querySelector('#preview tr[data-row="b_status"]'); return !!tr && tr.lastElementChild.textContent.includes('acesso de leitura'); }));
  check('com comentário, o ícone fica preenchido e visível em repouso', await row('b_status').locator('.cmt.on').count() === 1);
  await row('b_status').locator('.cmrow input').fill('');
  await row('b_status').locator('.cmrow input').blur();
  await page.waitForTimeout(80);
  check('comentário esvaziado fecha o campo sozinho', await row('b_status').locator('.cmrow').count() === 0);
  await page.evaluate(() => { st.tasks = new Set(); render(); });   // sem task, a linha derivada "Task types" aparece no formulário
  check('linha derivada (Task types, visível sem task marcada) não oferece comentário, só NA', await row('task_types').count() === 1 && await row('task_types').locator('.cmt').count() === 0 && await row('task_types').locator('.na').count() === 1);
  await page.evaluate(() => { st.tasks = new Set(['ads_conversion_tracking']); render(); });

  // ================= DESENHO (medido no DOM renderizado) =================
  await page.evaluate(() => { st.seg = 'all'; resetActive(); st.substatus = 'SO - Implementation Only'; st.autoOpen = true; Object.keys(st.more).length; ['general.0', 'general.1', 'impl.0', 'extras.0'].forEach(k => { st.more[k] = true; }); st.ctxOpen = true; applyAuto(); render(); setDrawer(true); });
  await page.waitForTimeout(700);
  const lint = await page.evaluate(() => {
    const out = { spacing: [], font: [], weight: [], border: [], target: [], trans: [], tab: 0, radius: [] };
    const ok4 = v => { const n = parseFloat(v); return Number.isNaN(n) || n === 0 || n === 1 || n === 2 || n % 4 === 0; };
    const scope = [...document.querySelectorAll('#win *, #drawer *')].filter(e => !e.closest('#preview') && !e.closest('svg') && e.getClientRects().length);
    for (const e of scope) {
      const cs = getComputedStyle(e);
      for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'rowGap', 'columnGap']) {
        const v = cs[p]; if (v === 'normal' || v.includes('%') || v === 'auto') continue;
        if (!ok4(v) && !(p.startsWith('margin') && e.matches('.auto-h .c,.quick'))) out.spacing.push(`${e.className || e.tagName}:${p}=${v}`);
      }
      if (e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
        const fs = parseFloat(cs.fontSize); if (![11, 12, 13, 14, 15, 16].includes(fs)) out.font.push(`${e.className || e.tagName}:${fs}`);
        const fw = parseInt(cs.fontWeight); if (![400, 500].includes(fw)) out.weight.push(`${e.className || e.tagName}:${fw}`);
      }
      const bw = ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'].some(k => parseFloat(cs[k]) > 0);
      if (bw && !e.matches('.win,.hdr')) out.border.push(e.className || e.tagName);
      if (e.matches('button') && !e.closest('svg')) { const r = e.getBoundingClientRect(); if (r.width < 32 || r.height < 32) out.target.push(`${e.className || e.id}:${Math.round(r.width)}x${Math.round(r.height)}`); }
    }
    for (const sh of document.styleSheets) for (const r of sh.cssRules) { const t = r.style && r.style.transition; if (t && /(^|,)\s*all\b/.test(t)) out.trans.push(r.selectorText); }
    out.reduced = [...document.styleSheets].some(sh => [...sh.cssRules].some(r => r.media && /prefers-reduced-motion/.test(r.media.mediaText)));
    out.tabular = getComputedStyle(document.querySelector('#form [data-row="speakeasy"] input') || document.body).fontVariantNumeric;
    return out;
  });
  check('DESENHO · todo padding, margem e gap na grade de 4px (insets de 1-2px permitidos)', lint.spacing.length === 0, lint.spacing.slice(0, 6).join(' | '));
  check('DESENHO · só os degraus de fonte 11, 12, 13, 14, 15 e 16', lint.font.length === 0, lint.font.slice(0, 6).join(' | '));
  check('DESENHO · só pesos 400 e 500 (600/700 é assinatura de painel antigo)', lint.weight.length === 0, lint.weight.slice(0, 6).join(' | '));
  check('DESENHO · nenhuma borda chapada na casca (separa-se por espaço, tom e hairline)', lint.border.length === 0, lint.border.slice(0, 6).join(' | '));
  check('DESENHO · todo botão tem alvo de pelo menos 32x32', lint.target.length === 0, lint.target.slice(0, 6).join(' | '));
  check('DESENHO · nenhum `transition: all` e há prefers-reduced-motion', lint.trans.length === 0 && lint.reduced, lint.trans.join(' | '));
  check('DESENHO · CID e Speakeasy em algarismos tabulares', /tabular-nums/.test(await page.evaluate(() => getComputedStyle(document.querySelector('#form .rv.sp input')).fontVariantNumeric)));

  check('sem erros de console', errors.length === 0, errors.join(' | '));
  const bad = results.filter(r => !r[0]);
  console.log(`\n${results.length - bad.length}/${results.length} checagens ok`);
  await browser.close();
  process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('ERRO NO TESTE', e); process.exit(2); });
