// src/modules/notes-table/note-table-model.js
//
// Regras da nota em tabela (módulo `notetable`), sem DOM e sem estado global:
// o catálogo e o estado do agente entram por parâmetro. É o que
// `npm run test:note-table` exercita e o que a tela e a Central reaproveitam.
//
// Contrato: specs/workflow/case-note-table.md (§5 a §9). A lógica nasceu no
// protótipo docs/media/case-notes-table/preview.html; onde a spec diverge do
// protótipo, vale a spec (o Tag Support dispensa prints, a pré-seleção pela data
// do appointment, as tasks somem nos tipos ECL).
//
// Forma do estado (serializável, para o rascunho guardar como está):
//   { seg, flow: 'bau'|'lm', europe, substatus,
//     tasks: [{ key, name, count }], forced: [taskKey],   // de step-tasks.js
//     active: [blockId], optIn: [rowId],
//     vals: { [rowId]: { v, na, comment, touched, auto, defaulted } },
//     cids: [{ tbw, cid, mcc, outcome, alink, sme, tag, caseid, elig, galactic }] }

// Lista do arquivo "Status" (sem os PI, que ficaram de fora) e a regra do follow-up:
// número = dias úteis; 'na' = a linha sai NA; 'optional'|'customer'|'policy' = o agente decide.
export const SUBSTATUS_RULES = [
    ['AS - Acceptable Reschedule', 'optional'], ['AS - Reschedule 1', 'optional'],
    ['NI - Awaiting Inputs', 'customer'], ['NI - In Consult', 3], ['NI - Awaiting Validation', 2],
    ['NI - Attempted Contact', 'policy'],
    ['DC - Test Case', 'na'], ['DC - Not Needed', 'na'], ['DC - No response (Hybrid case)', 'na'],
    ['DC - Out of Scope', 'na'], ['DC - Authentication Failed', 'na'],
    ['IN - Infeasible', 'na'], ['IN - Not Reachable', 'na'], ['IN - Not Interested', 'na'],
    ['IN - Not Ready', 'na'], ['IN - Out of Scope - Rerouted', 'na'],
    ['IN - Reschedule Limit Exceeded', 'na'], ['IN - Troubleshooting [Transferred]', 'na'],
    ['IN - Instruction Shared', 'na'],
    ['SO - Implementation Only', 'na'], ['SO - Educational Only', 'na'], ['SO - Troubleshooting Only', 'na'],
];

// Sem call não há consentimento a pedir (regra do padrão, spec §6).
export const CONSENT_NA_SUBSTATUS = ['NI - Attempted Contact', 'IN - Not Reachable'];

// Tasks que o Tag Support cobre (as mesmas de output-generator.js).
export const TS_TARGETS = ['ads_conversion_tracking', 'ads_enhanced_conversions'];

// Blocos cujas linhas de print o Tag Support com `Yes` dispensa (spec §8).
export const TS_PRINT_BLOCKS = ['before', 'impl', 'after'];

// Pré-seleção pela data do appointment (spec §9): hoje → Before + Implementation; antes → After.
export const PRESELECT_BY_DATE = { today: ['before', 'impl'], past: ['after'] };

// O campo-resumo de cada bloco (onde os cenários rápidos condensam o texto, spec §9).
export const SUMMARY_ROW_IDS = ['call_summary', 'case_comments', 'oncall_comments'];

export const EXTRAS_BLOCK = 'extras';

// O que o código sabe desenhar (spec §10). A Central não cria tipo novo: o servidor
// recusa, e o app ignora com aviso o que não conhecer (learning 2026-10-23).
export const SECTION_KINDS = ['kv', 'group', 'cid'];
export const ROW_TYPES = ['text', 'long', 'date', 'yesno', 'link', 'cid', 'speakeasy', 'derived'];
export const CID_COLUMN_TYPES = ['tbw', 'cid', 'yn', 'text', 'link', 'smeyes'];
export const ROW_ID_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;

const ECW = 'ads_enhanced_conversions';

export function createNoteState(over = {}) {
    return Object.assign({
        seg: 'all', flow: 'bau', europe: false, substatus: '',
        tasks: [], forced: [], active: [], optIn: [], vals: {}, cids: [],
    }, over);
}

export function newCidRow(cid = '') {
    return { tbw: 'TBW', cid, mcc: '', outcome: '', alink: '', sme: 'YES', tag: '', caseid: '', elig: '', galactic: '' };
}

// Estado de uma linha; cria vazio na primeira leitura.
export function rowState(st, id) {
    if (!st.vals[id]) st.vals[id] = { v: '', na: false, comment: '', touched: false, auto: false, defaulted: false };
    return st.vals[id];
}

export function findSegment(catalog, key) {
    return catalog.segments.find((s) => s.key === key) || null;
}

// O segmento usa tasks quando algum bloco dele tem a linha derivada das tasks
// ("Task types"). Os tipos ECL não têm: lá a linha Tasks e o Tag Support somem.
export function segmentUsesTasks(catalog, segKey) {
    const seg = findSegment(catalog, segKey);
    if (!seg) return false;
    return seg.blocks.some((p) => blockRows(catalog.blocks[p.b]).some((r) => r.type === 'derived' && r.auto === 'tasks'));
}

export function effectiveTasks(catalog, st) {
    return segmentUsesTasks(catalog, st.seg) ? (st.tasks || []) : [];
}

function taskKeys(catalog, st) {
    return effectiveTasks(catalog, st).map((t) => t.key);
}

export function hasTask(catalog, st, key) {
    const keys = taskKeys(catalog, st);
    return keys.includes(key === 'ecw' ? ECW : key);
}

export function blockRows(block) {
    const out = [];
    if (!block) return out;
    for (const sec of block.sections || []) if (sec.rows) out.push(...sec.rows);
    return out;
}

export function matches(catalog, st, when) {
    if (!when) return true;
    if (when.flow && st.flow !== when.flow) return false;
    if (when.europe !== undefined && !!st.europe !== when.europe) return false;
    if (when.substatusAny && !when.substatusAny.includes(st.substatus)) return false;
    if (when.tasksAny) {
        const keys = taskKeys(catalog, st);
        if (!when.tasksAny.some((k) => keys.includes(k))) return false;
    }
    if (when.rowIs && rowState(st, when.rowIs.id).v !== when.rowIs.v) return false;
    return true;
}

export function rowRequired(catalog, st, row) {
    return row.requiredWhen ? matches(catalog, st, row.requiredWhen) : !!row.required;
}

// `ignoreWhen`: a prévia da Central mostra todas as linhas, sem filtrar pelo estado.
export function rowVisible(catalog, st, row, opts = {}) {
    if (row.visible === false) return false;
    if (opts.ignoreWhen) return true;
    if (row.onlyFor && !row.onlyFor.every((k) => hasTask(catalog, st, k))) return false;
    if (!matches(catalog, st, row.when)) return false;
    if (row.optIn && !(st.optIn || []).includes(row.id) && !(row.requiredWhen && matches(catalog, st, row.requiredWhen))) return false;
    return true;
}

export function followupRule(substatus) {
    const f = SUBSTATUS_RULES.find((s) => s[0] === substatus);
    return f ? f[1] : null;
}

export function isOfficialSubstatus(substatus) {
    return SUBSTATUS_RULES.some((s) => s[0] === substatus);
}

// O Tag Support só conta com ACT/ECW marcadas (a linha `ts_used` só existe aí).
export function tagSupportActive(catalog, st) {
    return taskKeys(catalog, st).some((k) => TS_TARGETS.includes(k)) && rowState(st, 'ts_used').v === 'Yes';
}

// Task cujos prints o Tag Support dispensa: ACT/ECW marcada, Tag Support Yes e sem "Incluir mesmo assim".
export function taskDispensed(catalog, st, key) {
    return tagSupportActive(catalog, st) && TS_TARGETS.includes(key)
        && taskKeys(catalog, st).includes(key) && !(st.forced || []).includes(key);
}

// Linha de print de Before/Implementation/After que o Tag Support dispensa. As linhas
// comuns valem para ACT e ECW, então só saem quando TODA task ACT/ECW marcada está
// dispensada; as `onlyFor: ecw` seguem a ECW (spec §8).
export function isTsDispensed(catalog, st, row, blockId) {
    if (row.type !== 'link' || !TS_PRINT_BLOCKS.includes(blockId)) return false;
    if (!tagSupportActive(catalog, st)) return false;
    if (row.onlyFor) return row.onlyFor.every((k) => taskDispensed(catalog, st, k === 'ecw' ? ECW : k));
    const targets = taskKeys(catalog, st).filter((k) => TS_TARGETS.includes(k));
    return targets.length > 0 && targets.every((k) => taskDispensed(catalog, st, k));
}

// Texto de "Task types": como o output-generator.js do módulo antigo (aviso do Win
// Criteria na task dispensada, `(xN)` nas repetidas).
export function tasksText(catalog, st, tsDisclaimer = '') {
    return effectiveTasks(catalog, st).map((t) => {
        if (taskDispensed(catalog, st, t.key)) return `${t.name} - ${tsDisclaimer}`;
        return t.count > 1 ? `${t.name} (x${t.count})` : t.name;
    }).join(', ');
}

// `na` digitado vale NA só onde a linha aceita NA.
const isNaText = (v) => v.trim().toUpperCase() === 'NA';

// Valor final da linha: texto, 'NA' ou null (pendente). Pendente nunca vai para a saída.
export function resolveRow(catalog, st, row, ctx = {}) {
    const s = rowState(st, row.id);
    const acceptsNa = row.na !== false;
    if (row.type === 'derived') {
        if (row.auto === 'substatus') return st.substatus || null;
        if (row.auto === 'europe') return 'Yes';
        if (row.auto === 'tasks') {
            const t = tasksText(catalog, st, ctx.tsDisclaimer);
            if (t) return t;
            return s.na ? 'NA' : null;
        }
        return null;
    }
    if (s.na && acceptsNa) return 'NA';
    const v = String(s.v || '').trim();
    if (v) {
        if (isNaText(v)) return acceptsNa ? 'NA' : null;
        return v;
    }
    if (ctx.blockId && isTsDispensed(catalog, st, row, ctx.blockId)) return 'NA';
    return rowRequired(catalog, st, row) ? null : 'NA';
}

// Valor visível que a tela marca como inválido (não bloqueia sozinho, spec §5).
export function linkOk(v) {
    return /^https?:\/\/\S+$/i.test(String(v || '').trim());
}

export function isBadValue(row, value) {
    const v = String(value || '').trim();
    if (!v) return false;
    if (isNaText(v)) return row.na === false;
    if (row.type === 'date') return !/^\d{4}-\d{2}-\d{2}$/.test(v);
    if (row.type === 'link') return !linkOk(v);
    return false;
}

// `XXX-XXX-XXXX` quando o texto tem exatamente 10 dígitos; senão, como veio.
export function formatCid(text) {
    const d = String(text || '').replace(/\D/g, '');
    return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}` : String(text || '');
}

export function cidCellValue(col, cr) {
    if (col.type === 'smeyes') return cr.sme || 'YES';
    if (col.type === 'tbw') return cr.tbw || 'TBW';
    return String(cr[col.id] || '').trim();
}

// ---- Blocos ativos ----

// Colocações ativas, na ordem do segmento, e o bloco `extras` sempre por último.
export function activePlacements(catalog, st) {
    const seg = findSegment(catalog, st.seg);
    if (!seg) return [];
    const act = st.active || [];
    const list = seg.blocks.filter((p) => act.includes(p.b) && p.b !== EXTRAS_BLOCK && catalog.blocks[p.b]);
    if (!list.length) return [];
    if (catalog.blocks[EXTRAS_BLOCK]) list.push({ b: EXTRAS_BLOCK, title: '' });
    return list;
}

export function defaultActive(catalog, segKey) {
    const seg = findSegment(catalog, segKey);
    if (!seg || !seg.blocks.length) return [];
    if (seg.select === 'multi') return [...(seg.always || [])];
    return [seg.blocks[0].b];
}

export function isSuggested(catalog, st, placement) {
    const sg = placement.suggest;
    if (!sg) return false;
    const keys = taskKeys(catalog, st);
    if (sg.tasksAny && sg.tasksAny.some((k) => keys.includes(k))) return true;
    if (sg.substatusAny && sg.substatusAny.includes(st.substatus)) return true;
    return false;
}

// ---- Datas ----

const pad = (n) => String(n).padStart(2, '0');
export const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Dias úteis: pula sábado e domingo; feriados não entram (o CRM não os informa).
export function addBusinessDays(n, from = new Date()) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 12);
    let left = n;
    while (left > 0) {
        d.setDate(d.getDate() + 1);
        const w = d.getDay();
        if (w !== 0 && w !== 6) left--;
    }
    return isoDate(d);
}

// Meses como o CRM escreve em PT, ES e EN (`2026-Set-10 12:00:00 UTC` na tela original).
const MONTHS = {
    jan: 1, ene: 1, fev: 2, feb: 2, mar: 3, abr: 4, apr: 4, mai: 5, may: 5, jun: 6, jul: 7,
    ago: 8, aug: 8, set: 9, sep: 9, sept: 9, out: 10, oct: 10, nov: 11, dez: 12, dec: 12, dic: 12,
};

// Data local (fuso do agente) do `Appointment time` do CRM, ou null se o texto não for reconhecido.
export function parseAppointmentDate(text) {
    const s = String(text || '').trim();
    if (!s) return null;
    const m = s.match(/^(\d{4})-([A-Za-z]{3,4}\.?|\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?\s*(UTC|GMT|Z)?$/i);
    if (!m) return null;
    const y = +m[1];
    const mon = /^\d/.test(m[2]) ? +m[2] : MONTHS[m[2].replace('.', '').toLowerCase()];
    const day = +m[3];
    if (!mon || mon > 12 || day < 1 || day > 31) return null;
    const hasTime = m[4] !== undefined;
    const d = (hasTime && m[7])
        ? new Date(Date.UTC(y, mon - 1, day, +m[4], +m[5], +(m[6] || 0)))
        : new Date(y, mon - 1, day, hasTime ? +m[4] : 12, hasTime ? +m[5] : 0);
    if (Number.isNaN(d.getTime())) return null;
    if (!(hasTime && m[7]) && (d.getMonth() !== mon - 1 || d.getDate() !== day)) return null;
    return isoDate(d);
}

// Blocos pré-selecionados ao abrir (spec §9). Parse que falha não liga nada.
export function preselectBlocks(catalog, segKey, appointmentText, now = new Date()) {
    const base = defaultActive(catalog, segKey);
    const seg = findSegment(catalog, segKey);
    if (!seg || seg.select !== 'multi') return base;
    const day = parseAppointmentDate(appointmentText);
    if (!day) return base;
    const today = isoDate(now);
    const add = day === today ? PRESELECT_BY_DATE.today : (day < today ? PRESELECT_BY_DATE.past : []);
    const inSeg = seg.blocks.map((p) => p.b);
    return [...base, ...add.filter((b) => inSeg.includes(b) && !base.includes(b))];
}

// ---- Regras automáticas (spec §6 e §7) ----

function uniqueRows(catalog) {
    const seen = new Map();
    for (const b of Object.values(catalog.blocks)) for (const r of blockRows(b)) if (!seen.has(r.id)) seen.set(r.id, r);
    return [...seen.values()];
}

// ctx: { today: 'AAAA-MM-DD', now: Date, cid: string }. Nada capturado sobrescreve o que o agente tocou.
export function applyAuto(catalog, st, ctx = {}) {
    const now = ctx.now || new Date();
    const today = ctx.today || isoDate(now);
    for (const r of uniqueRows(catalog)) {
        const s = rowState(st, r.id);
        if (r.default !== undefined && !s.touched && !s.v && !s.na) s.v = r.default;
        if (!r.auto || r.type === 'derived' || s.touched) continue;
        if (r.auto === 'today') { s.v = today; s.auto = true; }
        else if (r.auto === 'cid') { s.v = ctx.cid || ''; s.auto = !!ctx.cid; }
        else if (r.auto === 'followup') {
            const f = followupRule(st.substatus);
            if (typeof f === 'number') { s.v = addBusinessDays(f, now); s.na = false; s.auto = true; }
            else if (f === 'na') { s.v = ''; s.na = true; s.auto = true; }
            else { if (s.auto) { s.v = ''; s.na = false; } s.auto = false; }
        } else if (r.auto === 'consent') {
            if (CONSENT_NA_SUBSTATUS.includes(st.substatus)) { s.na = true; s.auto = true; s.defaulted = false; }
            else if (st.europe) { s.na = false; s.auto = false; if (s.defaulted) s.v = ''; s.defaulted = false; }
            else { s.na = false; s.auto = false; s.v = 'Yes'; s.defaulted = true; }
        }
    }
    return st;
}

// O agente mexeu: some a marca Auto/Padrão e nenhuma regra automática volta a escrever ali.
export function touchRow(st, id) {
    const s = rowState(st, id);
    s.touched = true; s.auto = false; s.defaulted = false;
    return s;
}

// ---- Pendências ----

export const shortLabel = (text) => String(text || '').replace(/[:?]\s*$/, '');

export function labelText(label, lang) {
    if (typeof label === 'string') return label;
    if (!label) return '';
    return label[lang] || label.en || '';
}

// Linhas obrigatórias ainda sem valor nem NA, na ordem da nota. `key` é o id da linha
// (ou `cid:<i>:<coluna>`), o mesmo do `data-row` da prévia viva.
export function missingList(catalog, st, ctx = {}) {
    const out = [];
    const seen = new Set();
    const push = (key, label) => { if (!seen.has(key)) { seen.add(key); out.push({ key, label }); } };
    for (const p of activePlacements(catalog, st)) {
        const blk = catalog.blocks[p.b];
        for (const sec of blk.sections) {
            if (sec.kind === 'cid') {
                const cids = st.cids || [];
                if (!cids.length) push(`cids:${p.b}`, 'CID-Level Details');
                cids.forEach((cr, i) => sec.columns.forEach((c) => {
                    if (c.required !== false && !cidCellValue(c, cr)) push(`cid:${i}:${c.id}`, `CID ${i + 1}: ${shortLabel(labelText(c.label, ctx.lang))}`);
                }));
                continue;
            }
            for (const r of sec.rows || []) {
                if (!rowVisible(catalog, st, r)) continue;
                if (resolveRow(catalog, st, r, { ...ctx, blockId: p.b }) === null) push(r.id, shortLabel(labelText(r.label, ctx.lang)));
            }
        }
    }
    return out;
}

// "Marcar o restante como NA": só as obrigatórias que aceitam NA e ainda estão pendentes.
export function bulkNA(catalog, st, ctx = {}) {
    let n = 0;
    for (const p of activePlacements(catalog, st)) {
        for (const sec of catalog.blocks[p.b].sections) {
            for (const r of sec.rows || []) {
                if (!rowVisible(catalog, st, r) || r.na === false || !rowRequired(catalog, st, r)) continue;
                if (resolveRow(catalog, st, r, { ...ctx, blockId: p.b }) !== null) continue;
                rowState(st, r.id).na = true;
                n++;
            }
        }
    }
    return n;
}
