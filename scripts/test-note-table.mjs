// scripts/test-note-table.mjs
//
// Prova as regras da nota em tabela (módulo `notetable`) e o HTML que ela gera.
// O texto da nota é contrato (specs/workflow/case-note-table.md): um rótulo, uma
// ordem ou um NA errado muda a métrica da auditoria sem erro em lugar nenhum.
//
// Os riscos centrais:
//  - linha obrigatória que sai vazia, ou célula "pendente" que vaza para a saída;
//  - HTML com marcação que o editor do CRM não conhece (class, <style>, <script>) ou
//    texto do agente virando marcação;
//  - grade que não fecha (colspan/rowspan) e quebra a tabela no CRM;
//  - regras automáticas (consentimento, Europa, follow-up em dias úteis, Tag Support)
//    que decidem por conta própria sem ninguém perceber.
//
// Uso: npm run test:note-table

import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

async function load(entry, plugins = []) {
    const out = await build({
        entryPoints: [resolve(here, entry)], bundle: true, write: false,
        format: 'cjs', platform: 'node', logLevel: 'silent', plugins,
    });
    const mod = { exports: {} };
    // eslint-disable-next-line no-new-func
    new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, require);
    return mod.exports;
}

const M = await load('../src/modules/notes-table/note-table-model.js');
const R = await load('../src/modules/notes-table/note-table-render.js');

let fail = 0;
let total = 0;
function check(name, fn) {
    total++;
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual);
    const e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}
function ok(cond, oque) { if (!cond) throw new Error(oque); }

// ---- Catálogo de teste: um recorte do catálogo real com cada forma de seção e de regra ----
const Row = (id, en, type, o = {}) => Object.assign({ id, label: { en, pt: '', es: '' }, type, required: true, na: true, visible: true, hint: '' }, o);
const Col = (id, en, type) => ({ id, label: { en, pt: '', es: '' }, type, required: true });
const TS = ['ads_conversion_tracking', 'ads_enhanced_conversions'];
const CAT = {
    blocks: {
        general: { name: 'General details', cols: 4, widths: [16, 16, 46, 22], sections: [
            { kind: 'kv', title: 'General Details (Mandatory)', rows: [
                Row('date', 'Date:', 'date', { auto: 'today', na: false }),
                Row('speakeasy', 'Speakeasy ID:', 'speakeasy'),
                Row('substatus', 'Sub-status:', 'derived', { auto: 'substatus', na: false }),
                Row('next_followup', 'Next Follow-Up Date:', 'date', { auto: 'followup' }),
                Row('task_types', 'Task types:', 'derived', { auto: 'tasks' }),
                Row('cid', 'CID:', 'cid', { auto: 'cid' }),
                Row('consent', 'Checked and obtained recording consent from the customer before proceeding with the call?', 'yesno', { auto: 'consent' }),
                Row('call_summary', 'Call Summary:', 'long', { na: false }),
                Row('additional_info', 'Additional information:', 'long', { required: false }),
            ] },
            { kind: 'kv', title: 'Screenshots (Mandatory)', rows: [
                Row('website', 'Website URL worked upon:', 'link'),
                Row('extra_general', 'Additional Screenshots:', 'link', { required: false }),
            ] },
        ] },
        before: { name: 'Before implementation', cols: 4, widths: [22, 28, 28, 22], sections: [
            { kind: 'group', title: 'Screenshots (Mandatory)', group: 'Before implementation:', rows: [
                Row('b_status', 'Google Ads Conversion Status:', 'link'),
                Row('b_diag', 'Tag Diagnostics:', 'link', { onlyFor: ['ecw'] }),
                Row('b_qual', 'EC Qualdash:', 'link'),
            ] },
        ] },
        after: { name: 'After implementation', cols: 4, widths: [22, 28, 28, 22], sections: [
            { kind: 'group', title: 'Screenshots (Mandatory)', group: 'After implementation:', rows: [
                Row('a_status', 'Google Ads Conversion Status:', 'link'),
            ] },
        ] },
        impl: { name: 'Implementation', cols: 4, widths: [22, 28, 28, 22], sections: [
            { kind: 'group', title: 'Screenshots (Mandatory)', group: 'Implementation:', rows: [
                Row('i_status', 'Google Ads Conversion Status:', 'link'),
            ] },
        ] },
        impl_call: { name: 'Implementation Call', cols: 4, widths: [18, 22, 36, 24], sections: [
            { kind: 'cid', title: 'CID-Level Details', columns: [Col('tbw', 'To Be Worked?', 'tbw'), Col('cid', 'CID', 'cid'), Col('tag', 'Tag implemented?', 'text'), Col('caseid', 'Case ID mapping', 'text')] },
            { kind: 'kv', title: 'General Details (Mandatory)', rows: [
                Row('substatus', 'Current case Sub-status:', 'derived', { auto: 'substatus', na: false }),
                Row('oncall_comments', 'On Call Comments:', 'long', { na: false }),
            ] },
        ] },
        interim: { name: 'Interim check-ins', cols: 3, widths: [30, 48, 22], sections: [
            { kind: 'kv', title: 'General Details (Mandatory)', rows: [
                Row('case_comments', 'Case Comments:', 'long', { na: false }),
            ] },
        ] },
        extras: { name: 'Additional details', cols: 3, widths: [32, 46, 22], sections: [
            { kind: 'kv', title: 'Additional Details', rows: [
                Row('europe_case', 'Europe case?', 'derived', { auto: 'europe', na: false, when: { europe: true } }),
                Row('oncall', 'On Call signaled on time?', 'text', { required: false, when: { flow: 'bau' } }),
                Row('gtm_ga4', 'GTM/GA4 verified:', 'text', { optIn: true, required: false, requiredWhen: { substatusAny: ['SO - Implementation Only', 'NI - Awaiting Validation'] } }),
                Row('ts_used', 'Used Tag Support?', 'yesno', { default: 'No', na: false, when: { tasksAny: TS } }),
                Row('ts_reason', 'Reason:', 'text', { required: false, when: { tasksAny: TS, rowIs: { id: 'ts_used', v: 'No' } } }),
                Row('call_attempt', 'Call attempt:', 'link', { when: { substatusAny: ['IN - Not Reachable'] } }),
            ] },
        ] },
    },
    segments: [
        { key: 'all', name: 'ALL TASKS', select: 'multi', showTitle: false, always: ['general'], blocks: [
            { b: 'general', title: 'General details' },
            { b: 'before', title: 'Before implementation', suggest: { tasksAny: TS } },
            { b: 'impl', title: 'Implementation', suggest: { tasksAny: TS } },
            { b: 'after', title: 'After implementation', suggest: { tasksAny: TS } },
        ] },
        { key: 'sbse', name: 'ECL SBS-E', select: 'single', showTitle: true, blocks: [
            { b: 'impl_call', title: 'Phase 2: Implementation Call' },
            { b: 'interim', title: 'Interim Check-Ins or Pre-Impl. Closure: Seller/Advertiser Engagement & Updates' },
        ] },
    ],
};

const ACT = { key: 'ads_conversion_tracking', name: 'Ads Conversion Tracking', count: 1 };
const ECWT = { key: 'ads_enhanced_conversions', name: 'Ads Enhanced Conversions (ECW4)', count: 1 };
const GA4 = { key: 'ga4_event_tracking', name: 'Analytics Event Tracking (GA4)', count: 2 };
const DISC = 'Tag created/verified by Tag Support, as the note automatically added to the case indicates.';
// Quinta-feira, 2026-11-05, meio-dia local.
const NOW = new Date(2026, 10, 5, 12);
const CTX = { now: NOW, cid: '123-456-7890' };

function fresh(over = {}) {
    const st = M.createNoteState({ active: ['general'], ...over });
    M.applyAuto(CAT, st, CTX);
    return st;
}
const row = (blockId, id) => M.blockRows(CAT.blocks[blockId]).find((r) => r.id === id);
const val = (st, blockId, id) => M.resolveRow(CAT, st, row(blockId, id), { blockId, tsDisclaimer: DISC });
const missingKeys = (st) => M.missingList(CAT, st, { tsDisclaimer: DISC }).map((m) => m.key);
const out = (st, o = {}) => R.renderNoteHtml(CAT, st, { lang: 'en', tsDisclaimer: DISC, ...o });
const live = (st) => out(st, { live: true, pendingLabel: 'pendente' });

// Lê a grade da tabela sem DOM: posição de cada célula respeitando colspan e rowspan.
function gridOf(tableHtml) {
    const trs = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
    const occ = [];
    trs.forEach((tr, ri) => {
        occ[ri] = occ[ri] || [];
        let c = 0;
        for (const m of tr.matchAll(/<(td|th)([^>]*)>/g)) {
            const span = +((m[2].match(/colspan="(\d+)"/) || [])[1] || 1);
            const rs = +((m[2].match(/rowspan="(\d+)"/) || [])[1] || 1);
            while (occ[ri][c]) c++;
            for (let k = 0; k < rs; k++) { occ[ri + k] = occ[ri + k] || []; for (let j = 0; j < span; j++) occ[ri + k][c + j] = (occ[ri + k][c + j] || 0) + 1; }
            c += span;
        }
    });
    return occ.slice(0, trs.length);
}
const tablesOf = (html) => [...html.matchAll(/<table[\s\S]*?<\/table>/g)].map((m) => m[0]);

// Toda tabela de todo bloco, com todas as linhas visíveis (como a prévia da Central), fecha a grade.
function gridProblems(catalog) {
    const bad = [];
    for (const [id, blk] of Object.entries(catalog.blocks)) {
        const sum = blk.widths.reduce((a, b) => a + b, 0);
        if (blk.widths.length !== blk.cols) bad.push(`${id}: ${blk.widths.length} larguras para ${blk.cols} colunas`);
        if (sum !== 100) bad.push(`${id}: larguras somam ${sum}`);
        if (blk.widths[blk.widths.length - 1] < 22) bad.push(`${id}: comentários com ${blk.widths[blk.widths.length - 1]}%`);
        const st = M.createNoteState({ cids: [M.newCidRow('111-222-3333'), M.newCidRow()] });
        const html = R.renderBlockTable(catalog, st, { b: id, title: '' }, { live: true, ignoreWhen: true });
        for (const t of tablesOf(html)) {
            const cols = (t.match(/<col /g) || []).length;
            gridOf(t).forEach((r, ri) => {
                if (r.length !== blk.cols || r.some((x) => x !== 1)) bad.push(`${id}: linha ${ri} ocupa ${JSON.stringify(r)} (cols=${blk.cols}, <col>=${cols})`);
            });
        }
    }
    return bad;
}

console.log('\nGrade e HTML (spec §3)');

check('toda tabela fecha a grade (soma dos colspan = cols, descontados os rowspan) e as larguras somam 100', () => {
    igual(gridProblems(CAT), [], 'problemas de grade');
});

check('a checagem de grade tem dentes: um bloco com 5 colunas declaradas e linhas de 4 reprova', () => {
    const broken = JSON.parse(JSON.stringify(CAT));
    broken.blocks.before.cols = 5; broken.blocks.before.widths = [22, 28, 28, 0, 22];
    ok(gridProblems(broken).some((p) => p.startsWith('before:')), 'a grade quebrada passou');
});

check('seção chave-valor: o rótulo ocupa 1 coluna em grade de 3 e 2 nas demais; o valor, o resto menos o comentário', () => {
    const spans = (blockId, rowId) => {
        const st = fresh({ substatus: 'SO - Implementation Only' });
        const html = R.renderBlockTable(CAT, st, { b: blockId, title: '' }, { live: true, ignoreWhen: true });
        const tr = html.match(new RegExp(`<tr data-row="${rowId}">([\\s\\S]*?)</tr>`))[1];
        return [...tr.matchAll(/<(?:td|th)([^>]*)>/g)].map((m) => +((m[1].match(/colspan="(\d+)"/) || [])[1] || 1));
    };
    igual(spans('general', 'call_summary'), [2, 1, 1], 'grade de 4');
    igual(spans('extras', 'oncall'), [1, 1, 1], 'grade de 3');
});

check('a nota só tem as tags permitidas, sem class, <style>, <script> nem data-row', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT], active: ['general', 'before', 'impl', 'after'] });
    const html = out(st);
    const tags = [...new Set([...html.matchAll(/<([a-z0-9]+)[\s>]/g)].map((m) => m[1]))].sort();
    igual(tags, ['col', 'colgroup', 'div', 'table', 'tbody', 'td', 'th', 'tr'], 'tags');
    ok(!/\sclass=|<style|<script|data-row/.test(html), 'marcação proibida na saída');
});

check('<b> só nasce de **x** num valor; asterisco sem par fica literal', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    M.rowState(st, 'call_summary').v = '**Contexto da call:** cliente pediu ajuda\n**Próximos passos:** validar 2*3';
    M.rowState(st, 'additional_info').v = 'um **só';
    const html = out(st);
    ok(html.includes('<b>Contexto da call:</b> cliente pediu ajuda<br><b>Próximos passos:</b> validar 2*3'), 'negrito do resumo');
    ok(html.includes('um **só'), 'asterisco sem par');
    igual((html.match(/<b>/g) || []).length, 2, 'quantidade de <b>');
    M.rowState(st, 'call_summary').v = 'sem negrito';
    ok(!out(st).includes('<b>'), '<b> sem **x**');
});

check('texto digitado continua escapado: <script> vira texto, & vira &amp;', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    M.rowState(st, 'call_summary').v = '<script>alert(1)</script> & <b>x</b>';
    M.rowState(st, 'call_summary').comment = '<img src=x onerror=alert(1)>';
    const html = out(st);
    ok(!/<script|<img|<b>x/.test(html), 'marcação do agente entrou como HTML');
    ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt; &amp; &lt;b&gt;x&lt;/b&gt;'), 'valor escapado');
    ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'), 'comentário escapado');
});

check('valor de várias linhas vira <br>, sem linha em branco no meio', () => {
    igual(R.valueHtml('a\n\n\nb\r\nc  '), 'a<br>b<br>c', 'quebras');
});

check('célula pendente nunca vai para a saída; só a prévia viva a marca', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    ok(M.missingList(CAT, st).length > 0, 'deveria haver pendência');
    const o = out(st);
    ok(!o.includes('#fef7e0') && !o.includes('pendente'), 'pendente vazou para a saída');
    const l = live(st);
    ok(l.includes('#fef7e0') && l.includes('pendente') && l.includes('data-row="call_summary"'), 'a prévia viva não marcou');
});

check('Additional Details é sempre a última tabela, qualquer que seja a ordem em que os blocos foram ligados', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT], active: ['after', 'before', 'general'] });
    igual(M.activePlacements(CAT, st).map((p) => p.b), ['general', 'before', 'after', 'extras'], 'ordem');
    const t = tablesOf(out(st));
    ok(t[t.length - 1].includes('Additional Details'), 'a última tabela não é Additional Details');
    igual(M.activePlacements(CAT, fresh({ active: [] })), [], 'sem bloco ativo não há nota');
    igual(out(fresh({ active: [] })), '', 'nota vazia');
});

check('título acima da tabela: impresso nas fases (showTitle) e não no ALL TASKS', () => {
    ok(!/margin:16px 0 6px 0/.test(out(fresh({ substatus: 'SO - Implementation Only' }))), 'ALL TASKS imprimiu título');
    const st = fresh({ seg: 'sbse', active: ['impl_call'], cids: [M.newCidRow('111-222-3333')] });
    const html = out(st);
    igual((html.match(/margin:16px 0 6px 0/g) || []).length, 1, 'títulos em SBS-E');
    ok(html.includes('>Phase 2: Implementation Call</div>'), 'texto do título');
});

check('rodapé no idioma do atendimento; idioma sem texto cai no EN; rótulo sem tradução cai no EN, nunca no PT', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    ok(out(st, { lang: 'pt' }).includes('Nota criada através do Cases Wizard.'), 'rodapé PT');
    ok(out(st, { lang: 'es' }).includes('Nota creada a través de Cases Wizard.'), 'rodapé ES');
    ok(out(st, { lang: 'xx' }).includes('Note created through Cases Wizard.'), 'rodapé fallback');
    const cat = JSON.parse(JSON.stringify(CAT));
    M.blockRows(cat.blocks.general).find((r) => r.id === 'call_summary').label = { en: 'Call Summary:', pt: 'Resumo da call:', es: '' };
    const pt = R.renderNoteHtml(cat, st, { lang: 'pt' });
    const es = R.renderNoteHtml(cat, st, { lang: 'es' });
    ok(pt.includes('Resumo da call:'), 'rótulo PT');
    ok(es.includes('Call Summary:') && !es.includes('Resumo da call:'), 'ES sem tradução caiu fora do EN');
});

console.log('\nValor de cada linha (spec §5)');

check('linha obrigatória vazia fica pendente; opcional vazia sai NA', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    igual(val(st, 'general', 'call_summary'), null, 'Call Summary');
    igual(val(st, 'general', 'additional_info'), 'NA', 'Additional information');
});

check('digitar "na" vale NA onde a linha aceita NA; onde não aceita, fica pendente e o campo é marcado', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    M.rowState(st, 'website').v = 'na';
    igual(val(st, 'general', 'website'), 'NA', 'website');
    M.rowState(st, 'call_summary').v = ' na ';
    igual(val(st, 'general', 'call_summary'), null, 'Call Summary');
    ok(M.isBadValue(row('general', 'call_summary'), 'na'), 'Call Summary com na não foi marcado');
    ok(!M.isBadValue(row('general', 'website'), 'NA'), 'website com NA foi marcado');
    ok(M.isBadValue(row('general', 'website'), 'not-a-url') && !M.isBadValue(row('general', 'website'), 'https://x.y/1'), 'link');
    ok(M.isBadValue(row('general', 'date'), '05/11/2026') && !M.isBadValue(row('general', 'date'), '2026-11-05'), 'data');
});

check('CID de 10 dígitos formata XXX-XXX-XXXX; o resto fica como veio', () => {
    igual(M.formatCid('1234567890'), '123-456-7890', '10 dígitos');
    igual(M.formatCid('123 456 7890'), '123-456-7890', 'com espaços');
    igual(M.formatCid('123-456'), '123-456', 'curto');
});

check('"Marcar o restante como NA" marca só as obrigatórias pendentes que aceitam NA', () => {
    const st = fresh({ substatus: 'NI - Awaiting Inputs', active: ['general'] });
    M.rowState(st, 'speakeasy').v = 'P1';
    const n = M.bulkNA(CAT, st);
    igual(missingKeys(st), ['call_summary'], 'o que sobrou');
    ok(n >= 3, `marcou ${n}`);
    igual(M.rowState(st, 'call_summary').na, false, 'NA em Call Summary');
    igual(M.rowState(st, 'date').na, false, 'NA em Date');
    igual(M.rowState(st, 'speakeasy').na, false, 'NA por cima de valor');
    igual(M.rowState(st, 'additional_info').na, false, 'NA em opcional');
    igual(M.bulkNA(CAT, st), 0, 'segunda passada');
});

console.log('\nRegras automáticas (spec §6 e §7)');

check('dias úteis nunca caem em fim de semana, inclusive cruzando um', () => {
    for (let start = 0; start < 14; start++) {
        const from = new Date(2026, 10, 1 + start, 12);
        for (let n = 1; n <= 15; n++) {
            const d = new Date(M.addBusinessDays(n, from) + 'T12:00:00');
            ok(d.getDay() !== 0 && d.getDay() !== 6, `${M.isoDate(from)} +${n} caiu em ${M.isoDate(d)}`);
        }
    }
    igual(M.addBusinessDays(1, new Date(2026, 10, 6, 12)), '2026-11-09', 'sexta +1');
    igual(M.addBusinessDays(3, NOW), '2026-11-10', 'quinta +3');
    igual(M.addBusinessDays(5, NOW), '2026-11-12', 'quinta +5');
    igual(M.addBusinessDays(1, new Date(2026, 10, 7, 12)), '2026-11-09', 'sábado +1');
    igual(M.addBusinessDays(0, NOW), '2026-11-05', '+0');
});

check('follow-up pelo sub-status: número = dias úteis, na = NA, "o agente decide" limpa o automático', () => {
    const st = fresh({ substatus: 'NI - In Consult' });
    igual(M.rowState(st, 'next_followup').v, '2026-11-10', 'In Consult');
    ok(M.rowState(st, 'next_followup').auto, 'marca Auto');
    st.substatus = 'IN - Infeasible'; M.applyAuto(CAT, st, CTX);
    igual(val(st, 'general', 'next_followup'), 'NA', 'Infeasible');
    st.substatus = 'NI - Awaiting Inputs'; M.applyAuto(CAT, st, CTX);
    igual(val(st, 'general', 'next_followup'), null, 'o agente decide');
    igual(M.rowState(st, 'next_followup').auto, false, 'Auto ficou');
    M.touchRow(st, 'next_followup').v = '2026-12-01';
    st.substatus = 'NI - Awaiting Validation'; M.applyAuto(CAT, st, CTX);
    igual(M.rowState(st, 'next_followup').v, '2026-12-01', 'regra sobrescreveu o digitado');
    igual(M.followupRule('DC - No response (Hybrid case)'), 'na', 'DC Hybrid');
    igual(M.followupRule('DC - Authentication Failed'), 'na', 'DC Auth');
});

check('consentimento, ramo 1: NI - Attempted Contact e IN - Not Reachable saem NA automático', () => {
    for (const s of ['NI - Attempted Contact', 'IN - Not Reachable']) {
        const st = fresh({ substatus: s });
        igual(val(st, 'general', 'consent'), 'NA', s);
        ok(M.rowState(st, 'consent').auto, `${s} sem Auto`);
        const eu = fresh({ substatus: s, europe: true });
        igual(val(eu, 'general', 'consent'), 'NA', `${s} na Europa`);
    }
});

check('consentimento, ramo 2: no Caso da Europa não há padrão (pendente até o agente marcar)', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', europe: true });
    igual(val(st, 'general', 'consent'), null, 'Europa');
    ok(missingKeys(st).includes('consent'), 'não está nas pendências');
    M.touchRow(st, 'consent').v = 'No';
    igual(val(st, 'general', 'consent'), 'No', 'marcado');
});

check('consentimento, ramo 3: fora da Europa é Yes por padrão (marca Padrão)', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    igual(val(st, 'general', 'consent'), 'Yes', 'padrão');
    ok(M.rowState(st, 'consent').defaulted, 'sem marca Padrão');
});

check('trocar a Europa com o consentimento intocado recalcula; tocado, preserva', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    st.europe = true; M.applyAuto(CAT, st, CTX);
    igual(val(st, 'general', 'consent'), null, 'intocado → Europa');
    st.europe = false; M.applyAuto(CAT, st, CTX);
    igual(val(st, 'general', 'consent'), 'Yes', 'intocado → fora');
    st.europe = true; M.applyAuto(CAT, st, CTX);
    M.touchRow(st, 'consent').v = 'No';
    st.europe = false; M.applyAuto(CAT, st, CTX);
    igual(val(st, 'general', 'consent'), 'No', 'tocado');
});

check('Europe case? entra na nota só no caso europeu, como última tabela', () => {
    ok(!out(fresh({ substatus: 'SO - Implementation Only' })).includes('Europe case?'), 'fora da Europa');
    const t = tablesOf(out(fresh({ substatus: 'SO - Implementation Only', europe: true })));
    ok(t[t.length - 1].includes('Europe case?'), 'na Europa');
});

check('data de hoje e CID capturado entram com a marca Auto; editar tira a marca e nada recaptura por cima', () => {
    const st = fresh();
    igual(M.rowState(st, 'date').v, '2026-11-05', 'hoje');
    igual(M.rowState(st, 'cid').v, '123-456-7890', 'CID');
    ok(M.rowState(st, 'date').auto && M.rowState(st, 'cid').auto, 'Auto');
    M.touchRow(st, 'cid').v = '999-999-9999';
    M.applyAuto(CAT, st, { ...CTX, cid: '111-111-1111' });
    igual(M.rowState(st, 'cid').v, '999-999-9999', 'captura sobrescreveu');
    igual(M.rowState(st, 'cid').auto, false, 'Auto depois de editar');
});

console.log('\nCondições: when, requiredWhen, optIn, fluxo, tasks');

check('On Call só no fluxo BAU; no LM some da nota', () => {
    const st = fresh({ substatus: 'SO - Implementation Only' });
    ok(out(st).includes('On Call signaled on time?'), 'BAU');
    st.flow = 'lm';
    ok(!out(st).includes('On Call signaled on time?'), 'LM');
});

check('GTM/GA4: obrigatório (e à vista) em SO; fora dele, só entra pelo "+" (optIn) e como opcional', () => {
    const so = fresh({ substatus: 'SO - Implementation Only' });
    ok(M.rowVisible(CAT, so, row('extras', 'gtm_ga4')) && M.rowRequired(CAT, so, row('extras', 'gtm_ga4')), 'SO');
    ok(missingKeys(so).includes('gtm_ga4'), 'SO sem pendência');
    const inf = fresh({ substatus: 'IN - Infeasible' });
    ok(!M.rowVisible(CAT, inf, row('extras', 'gtm_ga4')), 'Infeasible visível sem optIn');
    ok(!out(inf).includes('GTM/GA4 verified:'), 'Infeasible na nota');
    inf.optIn = ['gtm_ga4'];
    ok(M.rowVisible(CAT, inf, row('extras', 'gtm_ga4')) && !M.rowRequired(CAT, inf, row('extras', 'gtm_ga4')), 'optIn');
    igual(val(inf, 'extras', 'gtm_ga4'), 'NA', 'optIn vazio');
});

check('when por sub-status: Call attempt só em IN - Not Reachable', () => {
    ok(!M.rowVisible(CAT, fresh({ substatus: 'SO - Implementation Only' }), row('extras', 'call_attempt')), 'SO');
    ok(M.rowVisible(CAT, fresh({ substatus: 'IN - Not Reachable' }), row('extras', 'call_attempt')), 'Not Reachable');
});

check('linhas só-ECW (onlyFor) só com ECW marcada', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT], active: ['general', 'before'] });
    ok(!out(st).includes('Tag Diagnostics:'), 'sem ECW');
    st.tasks = [ACT, ECWT];
    ok(out(st).includes('Tag Diagnostics:'), 'com ECW');
});

check('Tag Support nasce em No, só com ACT/ECW; o motivo só com No', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [GA4] });
    ok(!M.rowVisible(CAT, st, row('extras', 'ts_used')), 'sem ACT/ECW');
    st.tasks = [ACT]; M.applyAuto(CAT, st, CTX);
    igual(M.rowState(st, 'ts_used').v, 'No', 'padrão');
    ok(M.rowVisible(CAT, st, row('extras', 'ts_reason')), 'motivo com No');
    M.touchRow(st, 'ts_used').v = 'Yes';
    ok(!M.rowVisible(CAT, st, row('extras', 'ts_reason')), 'motivo com Yes');
});

check('nos tipos ECL as tasks somem (e o Tag Support junto)', () => {
    ok(M.segmentUsesTasks(CAT, 'all') && !M.segmentUsesTasks(CAT, 'sbse'), 'quem usa tasks');
    const st = fresh({ seg: 'sbse', active: ['impl_call'], tasks: [ACT], cids: [M.newCidRow('111-222-3333')] });
    igual(M.effectiveTasks(CAT, st), [], 'tasks no ECL');
    ok(!M.rowVisible(CAT, st, row('extras', 'ts_used')), 'Tag Support no ECL');
    ok(!out(st).includes('Used Tag Support?'), 'Tag Support na nota ECL');
});

check('Task types: nome das tasks, (xN) nas repetidas; sem task fica pendente até NA', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT, GA4] });
    igual(val(st, 'general', 'task_types'), 'Ads Conversion Tracking, Analytics Event Tracking (GA4) (x2)', 'texto');
    st.tasks = [];
    igual(val(st, 'general', 'task_types'), null, 'sem task');
    M.rowState(st, 'task_types').na = true;
    igual(val(st, 'general', 'task_types'), 'NA', 'NA');
});

console.log('\nTag Support dispensa os prints de ACT/ECW (spec §8)');

check('Yes: as linhas de print de Before/Implementation/After viram NA e a task leva o aviso', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT], active: ['general', 'before', 'impl', 'after'] });
    igual(val(st, 'before', 'b_status'), null, 'com No');
    M.touchRow(st, 'ts_used').v = 'Yes';
    for (const [b, id] of [['before', 'b_status'], ['before', 'b_qual'], ['impl', 'i_status'], ['after', 'a_status']]) igual(val(st, b, id), 'NA', `${b}/${id}`);
    ok(M.isTsDispensed(CAT, st, row('before', 'b_status'), 'before'), 'isTsDispensed');
    ok(!M.isTsDispensed(CAT, st, row('general', 'website'), 'general'), 'General não é dispensado');
    igual(val(st, 'general', 'task_types'), `Ads Conversion Tracking - ${DISC}`, 'aviso');
    ok(!missingKeys(st).some((k) => /^[bia]_/.test(k)), 'prints ainda pendentes');
});

check('"Incluir mesmo assim" religa os prints da task forçada e tira o aviso dela', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT], active: ['general', 'before'] });
    M.touchRow(st, 'ts_used').v = 'Yes';
    st.forced = ['ads_conversion_tracking'];
    igual(val(st, 'before', 'b_status'), null, 'forçado');
    igual(val(st, 'general', 'task_types'), 'Ads Conversion Tracking', 'aviso na forçada');
});

check('com ACT e ECW, forçar só uma: as linhas comuns voltam; as só-ECW seguem a ECW', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT, ECWT], active: ['general', 'before'] });
    M.touchRow(st, 'ts_used').v = 'Yes';
    igual([val(st, 'before', 'b_status'), val(st, 'before', 'b_diag')], ['NA', 'NA'], 'nenhuma forçada');
    st.forced = ['ads_enhanced_conversions'];
    igual([val(st, 'before', 'b_status'), val(st, 'before', 'b_diag')], [null, null], 'ECW forçada');
    igual(val(st, 'general', 'task_types'), `Ads Conversion Tracking - ${DISC}, Ads Enhanced Conversions (ECW4)`, 'avisos');
    st.forced = ['ads_conversion_tracking'];
    igual([val(st, 'before', 'b_status'), val(st, 'before', 'b_diag')], [null, 'NA'], 'ACT forçada');
});

check('o link que o agente já colou não é trocado por NA quando o Tag Support vira Yes', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [ACT], active: ['general', 'before'] });
    M.touchRow(st, 'b_status').v = 'https://example.com/ss/1';
    M.touchRow(st, 'ts_used').v = 'Yes';
    igual(val(st, 'before', 'b_status'), 'https://example.com/ss/1', 'link');
});

check('Tag Support Yes sem ACT/ECW (só GA4) não dispensa nada', () => {
    const st = fresh({ substatus: 'SO - Implementation Only', tasks: [GA4], active: ['general', 'before'] });
    M.rowState(st, 'ts_used').v = 'Yes';
    igual(val(st, 'before', 'b_status'), null, 'GA4');
});

console.log('\nBlocos pré-selecionados pela data do appointment (spec §9)');

check('data do appointment: PT/ES/EN, ISO e UTC; texto estranho não vira data', () => {
    igual(M.parseAppointmentDate('2026-Set-10 12:00:00 UTC'), '2026-09-10', 'PT');
    igual(M.parseAppointmentDate('2026-Sep-10 12:00:00 UTC'), '2026-09-10', 'EN');
    igual(M.parseAppointmentDate('2026-Sept.-10'), '2026-09-10', 'Sept.');
    igual(M.parseAppointmentDate('2026-Dic-01 09:30'), '2026-12-01', 'ES');
    igual(M.parseAppointmentDate('2026-11-05'), '2026-11-05', 'ISO');
    for (const s of ['', 'amanhã', '2026-Xyz-10', '2026-02-31', '10/09/2026']) igual(M.parseAppointmentDate(s), null, `"${s}"`);
});

check('hoje liga Before e Implementation; data anterior liga After; parse que falha não liga nada', () => {
    const today = `${NOW.getFullYear()}-${String(NOW.getMonth() + 1).padStart(2, '0')}-${String(NOW.getDate()).padStart(2, '0')}`;
    igual(M.preselectBlocks(CAT, 'all', today, NOW), ['general', 'before', 'impl'], 'hoje');
    igual(M.preselectBlocks(CAT, 'all', '2026-Out-30 15:00:00', NOW), ['general', 'after'], 'antes');
    igual(M.preselectBlocks(CAT, 'all', '2026-Dez-30 15:00:00', NOW), ['general'], 'depois');
    igual(M.preselectBlocks(CAT, 'all', 'sei lá', NOW), ['general'], 'falhou');
    igual(M.preselectBlocks(CAT, 'sbse', today, NOW), ['impl_call'], 'fase única não pré-seleciona');
});

check('sugestão de blocos: ACT/ECW sugerem Before, Implementation e After', () => {
    const st = fresh({ tasks: [ACT] });
    const seg = M.findSegment(CAT, 'all');
    igual(seg.blocks.filter((p) => M.isSuggested(CAT, st, p)).map((p) => p.b), ['before', 'impl', 'after'], 'sugeridos');
});

console.log('\nCIDs (seção por CID)');

check('seção por CID: uma linha por CID; coluna vazia fica pendente; sem CID, pendente', () => {
    const st = fresh({ seg: 'sbse', substatus: 'NI - Awaiting Inputs', active: ['impl_call'], cids: [] });
    ok(missingKeys(st).includes('cids:impl_call'), 'sem CID');
    st.cids = [M.newCidRow('111-222-3333'), M.newCidRow('444-555-6666')];
    const keys = missingKeys(st);
    ok(keys.includes('cid:0:tag') && keys.includes('cid:1:caseid') && !keys.includes('cid:0:tbw'), JSON.stringify(keys));
    st.cids.forEach((c) => { c.tag = 'Yes'; c.caseid = '123'; });
    M.rowState(st, 'oncall_comments').v = 'ok';
    igual(missingKeys(st), [], 'tudo resolvido');
    const html = out(st);
    ok(html.includes('444-555-6666') && (html.match(/>TBW</g) || []).length === 2, 'linhas por CID');
});

// ================= Catálogo embutido e semente (passo 2) =================
const { NOTE_TABLE_CATALOG: EMB } = await load('../src/modules/notes-table/note-table-data.js');
const seedPath = resolve(here, '../gas-backend/seeds/note-layouts-seed.json');
const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const specText = readFileSync(resolve(here, '../specs/workflow/case-note-table.md'), 'utf8');

console.log('\nCatálogo embutido (note-table-data.js) contra a spec §4');

check('todo bloco do catálogo real fecha a grade, soma 100% e dá >= 22% aos comentários', () => {
    igual(gridProblems(EMB), [], 'problemas de grade');
});

check('grupo só em grade de 4 colunas; id de linha no formato e único no bloco; kind e type conhecidos', () => {
    const bad = [];
    for (const [id, blk] of Object.entries(EMB.blocks)) {
        const rows = M.blockRows(blk);
        const seen = new Set();
        for (const r of rows) {
            if (seen.has(r.id)) bad.push(`${id}: ${r.id} repetido`);
            seen.add(r.id);
            if (!M.ROW_ID_PATTERN.test(r.id)) bad.push(`${id}: id ${r.id}`);
            if (!M.ROW_TYPES.includes(r.type)) bad.push(`${id}/${r.id}: type ${r.type}`);
        }
        for (const s of blk.sections) {
            if (!M.SECTION_KINDS.includes(s.kind)) bad.push(`${id}: kind ${s.kind}`);
            if (s.kind === 'group' && blk.cols !== 4) bad.push(`${id}: grupo em ${blk.cols} colunas`);
            for (const c of s.columns || []) if (!M.CID_COLUMN_TYPES.includes(c.type)) bad.push(`${id}/${c.id}: type ${c.type}`);
        }
        if (!rows.some((r) => r.required || r.requiredWhen) && !blk.sections.some((s) => s.kind === 'cid')) bad.push(`${id}: nenhuma linha obrigatória`);
    }
    igual(bad, [], 'catálogo');
});

// Lê as tabelas de linhas da spec §4: o texto da nota é contrato, e a spec vence o protótipo.
function specRows() {
    const out = {};
    let block = null;
    for (const line of specText.split('\n')) {
        const h = line.match(/^#### `([a-z_]+)`/);
        if (h) { block = h[1]; out[block] = out[block] || []; continue; }
        if (/^## /.test(line)) block = null;
        const m = block && line.match(/^\| `([a-z0-9_]+)` \| (.+?) \| ([a-z]+) \| (sim|não|conforme regra)( \| (sim|não) \| .*)? \|$/);
        if (m) out[block].push({ id: m[1], en: m[2].trim(), type: m[3], required: m[4], na: m[6] || null });
    }
    return out;
}

check('cada linha do catálogo bate com a spec §4: id, rótulo EN, tipo, obrigatória e aceita NA, na mesma ordem', () => {
    const spec = specRows();
    igual(Object.keys(spec).sort(), Object.keys(EMB.blocks).sort(), 'blocos da spec');
    const bad = [];
    for (const [id, blk] of Object.entries(EMB.blocks)) {
        const cat = blk.sections.flatMap((s) => (s.columns || s.rows).map((r) => ({
            id: r.id, en: r.label.en, type: r.type,
            required: r.requiredWhen ? 'conforme regra' : (r.required ? 'sim' : 'não'),
            na: s.columns ? null : (r.na === false ? 'não' : 'sim'),
        })));
        if (JSON.stringify(cat) !== JSON.stringify(spec[id])) bad.push(`${id}:\n        spec:     ${JSON.stringify(spec[id])}\n        catálogo: ${JSON.stringify(cat)}`);
    }
    if (bad.length) throw new Error(bad.join('\n      '));
});

check('segmentos como na spec §2: ordem dos blocos, seleção, título só nas fases, títulos impressos', () => {
    igual(EMB.segments.map((s) => [s.key, s.select, s.showTitle]), [['all', 'multi', false], ['sbse', 'single', true], ['mms', 'single', true]], 'segmentos');
    igual(EMB.segments.map((s) => s.blocks.map((p) => p.b)), [
        ['general', 'before', 'impl', 'after', 'consult'],
        ['audit', 'impl_call', 'interim'],
        ['triage', 'eligibility', 'audit', 'impl_call', 'interim'],
    ], 'blocos por segmento');
    for (const s of EMB.segments) for (const p of s.blocks) ok(specText.includes(`\`${p.b}\` — ${p.title}`), `título de ${s.key}/${p.b} fora da spec: ${p.title}`);
    igual(EMB.segments[0].always, ['general'], 'General sempre ligado');
});

check('rótulos PT e ES vazios por ora (passo 8) e o EN completo', () => {
    for (const blk of Object.values(EMB.blocks)) for (const s of blk.sections) for (const r of s.columns || s.rows) {
        ok(r.label.en && r.label.pt === '' && r.label.es === '', `${r.id}: ${JSON.stringify(r.label)}`);
    }
});

console.log('\nSemente (note_blocks e note_layouts)');

check('a semente reconstrói o catálogo embutido sem perda (round-trip)', () => {
    const [blocks, layouts] = seed;
    igual([blocks.module, layouts.module], ['note_blocks', 'note_layouts'], 'módulos');
    const rebuilt = {
        blocks: Object.fromEntries(blocks.items.slice().sort((a, b) => a.sortOrder - b.sortOrder).map((it) => [it.key, JSON.parse(it.value)])),
        segments: layouts.items.slice().sort((a, b) => a.sortOrder - b.sortOrder).map((it) => ({ key: it.key, ...JSON.parse(it.value) })),
    };
    igual(rebuilt, EMB, 'catálogo reconstruído');
    ok(blocks.items.every((it) => it.lang === 'ALL' && it.label), 'lang/label');
});

check('o arquivo do Apps Script carrega a MESMA semente do JSON (nenhum dos dois está velho)', () => {
    const gas = readFileSync(resolve(here, '../gas-backend/ContentSeed_NoteLayouts.js'), 'utf8');
    // eslint-disable-next-line no-new-func
    const payload = new Function(gas + '\nreturn CONTENT_SEED_NOTE_LAYOUTS;')();
    igual(payload, seed, 'ContentSeed_NoteLayouts.js × note-layouts-seed.json');
    ok(/function seedNoteLayoutsNow\(\)/.test(gas), 'seedNoteLayoutsNow()');
});

console.log('\nServiço de hidratação (note-table-service.js)');

// A Central é trocada por uma falsa no próprio bundle: o teste decide o que o
// cache tem e o que a rede devolve (ou se ela cai).
const central = { cache: {}, net: {}, offline: false, calls: [] };
globalThis.__central = central;
const stubData = {
    name: 'stub-data-service',
    setup(b) {
        b.onLoad({ filter: /data-service\.js$/ }, () => ({
            contents: `export const DataService = {
                getCachedContent: (m) => globalThis.__central.cache[m] ?? null,
                fetchContentModule: async (m) => {
                    const c = globalThis.__central; c.calls.push(m);
                    if (c.offline) return c.cache[m] ?? null;
                    return c.net[m] ?? [];
                },
            };`,
            loader: 'js',
        }));
    },
};
const loadService = () => load('../src/modules/notes-table/note-table-service.js', [stubData]);
const asCentral = (items) => items.map((it, i) => ({ id: 'itm_' + i, field: '', ...it }));
const [seedBlocks, seedLayouts] = seed;
const warns = [];
const origWarn = console.warn;
const quiet = async (fn) => { console.warn = (...a) => warns.push(a.join(' ')); try { return await fn(); } finally { console.warn = origWarn; } };
const svcChecks = [];
const checkAsync = (name, fn) => svcChecks.push([name, fn]);

checkAsync('estado real da planilha (módulos criados, nada publicado): o agente vê o embutido inteiro', async () => {
    Object.assign(central, { cache: {}, net: { note_blocks: [], note_layouts: [] }, offline: false, calls: [] });
    const S = await loadService();
    const cat = await S.loadNoteCatalog();
    igual(cat, EMB, 'catálogo');
    igual(S.isCatalogFromCentral(), false, 'veio da Central?');
    igual(central.calls.sort(), ['note_blocks', 'note_layouts'], 'módulos pedidos');
});

checkAsync('offline e sem cache: o embutido, sem lançar', async () => {
    Object.assign(central, { cache: {}, net: {}, offline: true, calls: [] });
    const S = await loadService();
    igual(await S.loadNoteCatalog(), EMB, 'catálogo');
});

checkAsync('round-trip semente → serviço = embutido (a semente publicada não muda nada para o agente)', async () => {
    Object.assign(central, { cache: {}, net: { note_blocks: asCentral(seedBlocks.items), note_layouts: asCentral(seedLayouts.items) }, offline: false, calls: [] });
    const S = await loadService();
    const cat = await S.loadNoteCatalog();
    igual(cat, EMB, 'catálogo');
    igual(S.isCatalogFromCentral(), true, 'veio da Central?');
});

checkAsync('publicar só um bloco muda só aquele bloco (mescla pelo id)', async () => {
    const interim = JSON.parse(seedBlocks.items.find((i) => i.key === 'interim').value);
    interim.sections[0].rows.find((r) => r.id === 'case_comments').label.pt = 'Comentários do caso:';
    Object.assign(central, { cache: {}, net: { note_blocks: asCentral([{ key: 'interim', lang: 'ALL', label: 'Interim', value: JSON.stringify(interim), sortOrder: 0 }]), note_layouts: [] }, offline: false, calls: [] });
    const S = await loadService();
    const cat = await S.loadNoteCatalog();
    igual(cat.blocks.interim, interim, 'bloco publicado');
    const rest = Object.keys(EMB.blocks).filter((k) => k !== 'interim');
    igual(rest.map((k) => cat.blocks[k]), rest.map((k) => EMB.blocks[k]), 'os outros blocos');
    igual(cat.segments, EMB.segments, 'segmentos');
    ok(R.renderNoteHtml(cat, M.createNoteState({ seg: 'sbse', substatus: 'NI - Awaiting Inputs', active: ['interim'] }), { lang: 'pt' }).includes('Comentários do caso:'), 'rótulo PT na nota');
});

checkAsync('item corrompido não derruba os outros', async () => {
    const items = asCentral(seedBlocks.items).map((it) => (it.key === 'general' ? { ...it, value: '{quebrado' } : it));
    Object.assign(central, { cache: {}, net: { note_blocks: items, note_layouts: asCentral(seedLayouts.items) }, offline: false, calls: [] });
    const S = await loadService();
    const cat = await quiet(() => S.loadNoteCatalog());
    igual(cat, EMB, 'catálogo (o general corrompido cai no embutido)');
    ok(warns.some((w) => w.includes("'general' ilegível")), 'sem aviso');
});

checkAsync('kind/type desconhecido: a linha (ou seção) some com console.warn, e nada lança', async () => {
    warns.length = 0;
    const general = JSON.parse(seedBlocks.items.find((i) => i.key === 'general').value);
    general.sections[0].rows.splice(1, 0, { id: 'nova_linha', label: { en: 'Brand new:' }, type: 'dropdown', required: true, na: true, visible: true });
    general.sections.push({ kind: 'carousel', title: 'X', rows: [] });
    const audit = JSON.parse(seedBlocks.items.find((i) => i.key === 'audit').value);
    audit.sections[0].columns[2].type = 'slider';
    Object.assign(central, { cache: {}, net: { note_blocks: asCentral([
        { key: 'general', lang: 'ALL', label: 'General', value: JSON.stringify(general), sortOrder: 0 },
        { key: 'audit', lang: 'ALL', label: 'Audit', value: JSON.stringify(audit), sortOrder: 1 },
    ]), note_layouts: [] }, offline: false, calls: [] });
    const S = await loadService();
    const cat = await quiet(() => S.loadNoteCatalog());
    igual(M.blockRows(cat.blocks.general).map((r) => r.id), M.blockRows(EMB.blocks.general).map((r) => r.id), 'linhas do general');
    igual(cat.blocks.general.sections.length, 2, 'seções do general');
    igual(cat.blocks.audit.sections.map((s) => s.kind), ['kv'], 'seção por CID com coluna desconhecida');
    ok(warns.some((w) => w.includes("'nova_linha' de tipo 'dropdown'")), 'aviso da linha');
    ok(warns.some((w) => w.includes("'carousel' desconhecida")), 'aviso da seção');
    const st = M.createNoteState({ substatus: 'SO - Implementation Only', active: ['general'] });
    M.applyAuto(cat, st, CTX);
    ok(R.renderNoteHtml(cat, st, { lang: 'en' }).includes('Call Summary:'), 'a nota continua saindo');
});

checkAsync('segmento que cita bloco desconhecido perde só aquele bloco', async () => {
    warns.length = 0;
    const all = JSON.parse(seedLayouts.items.find((i) => i.key === 'all').value);
    all.blocks.splice(2, 0, { b: 'bloco_futuro', title: 'Futuro' });
    Object.assign(central, { cache: {}, net: { note_blocks: [], note_layouts: asCentral([{ key: 'all', lang: 'ALL', label: 'ALL TASKS', value: JSON.stringify(all), sortOrder: 0 }]) }, offline: false, calls: [] });
    const S = await loadService();
    const cat = await quiet(() => S.loadNoteCatalog());
    igual(cat.segments[0].blocks.map((p) => p.b), ['general', 'before', 'impl', 'after', 'consult'], 'blocos do ALL TASKS');
    ok(warns.some((w) => w.includes("'bloco_futuro' desconhecido")), 'sem aviso');
});

checkAsync('cache primeiro, rede depois: o assinante é avisado a cada aplicação', async () => {
    const interim = JSON.parse(seedBlocks.items.find((i) => i.key === 'interim').value);
    interim.name = 'Do cache';
    const net = JSON.parse(JSON.stringify(interim)); net.name = 'Da rede';
    Object.assign(central, {
        cache: { note_blocks: asCentral([{ key: 'interim', value: JSON.stringify(interim) }]) },
        net: { note_blocks: asCentral([{ key: 'interim', value: JSON.stringify(net) }]), note_layouts: [] }, offline: false, calls: [],
    });
    const S = await loadService();
    const seen = [];
    await S.loadNoteCatalog((c) => seen.push(c.blocks.interim.name));
    igual(seen, ['Do cache', 'Da rede'], 'avisos');
    igual(S.getNoteCatalog().blocks.interim.name, 'Da rede', 'catálogo final');
});

// ---- Rascunhos: o DraftService do Case Notes continua igual, e o novo tem chave própria ----
const lsStore = {};
globalThis.localStorage = { getItem: (k) => (k in lsStore ? lsStore[k] : null), setItem: (k, v) => { lsStore[k] = String(v); }, removeItem: (k) => { delete lsStore[k]; } };
const DS = await load('../src/modules/notes/drafts/draft-service.js');

checkAsync('DraftService do Case Notes: mesmas chaves, teto de 5, airbag de 12h e só com sub-status', async () => {
    for (const k of Object.keys(lsStore)) delete lsStore[k];
    const D = DS.DraftService;
    for (let i = 0; i < 7; i++) D.save({ subStatus: 'S' + i });
    igual([D.getCount(), D.getAll().map((d) => d.subStatus).join(','), Object.keys(lsStore)], [5, 'S6,S5,S4,S3,S2', ['cw_notes_parking_lot']], 'parking lot');
    D.saveEmergency({ subStatus: 'X', a: 1 });
    igual([D.getEmergency(), Object.keys(lsStore).sort()], [{ subStatus: 'X', a: 1 }, ['cw_notes_emergency_save', 'cw_notes_parking_lot']], 'airbag');
    D.saveEmergency({ a: 1 });
    igual(D.getEmergency(), null, 'airbag sem sub-status');
    lsStore.cw_notes_emergency_save = JSON.stringify({ timestamp: Date.now() - 13 * 3600e3, data: { subStatus: 'velho' } });
    igual([D.getEmergency(), 'cw_notes_emergency_save' in lsStore], [null, false], 'airbag vencido');
    lsStore.cw_notes_parking_lot = '{quebrado';
    igual(D.getAll(), [], 'parking lot corrompido');
});

checkAsync('a nota em tabela guarda em chaves próprias e não lê nem apaga os rascunhos do Case Notes', async () => {
    for (const k of Object.keys(lsStore)) delete lsStore[k];
    DS.DraftService.save({ subStatus: 'antigo' });
    DS.DraftService.saveEmergency({ subStatus: 'antigo' });
    const N = DS.createDraftService({ storageKey: 'cw_notetable_parking_lot', emergencyKey: 'cw_notetable_emergency_save' });
    igual([N.getCount(), N.getEmergency()], [0, null], 'o novo não lê o antigo');
    N.save({ subStatus: 'novo' }); N.saveEmergency({ subStatus: 'novo' }); N.clearEmergency();
    igual([DS.DraftService.getCount(), DS.DraftService.getEmergency()], [1, { subStatus: 'antigo' }], 'o antigo segue intacto');
    igual(Object.keys(lsStore).sort(), ['cw_notes_emergency_save', 'cw_notes_parking_lot', 'cw_notetable_parking_lot'], 'chaves');
});

for (const [name, fn] of svcChecks) {
    total++;
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

console.log(`\n${total - fail}/${total} checagens ok`);
process.exit(fail ? 1 : 0);
