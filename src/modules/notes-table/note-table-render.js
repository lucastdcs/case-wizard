// src/modules/notes-table/note-table-render.js
//
// Catálogo + estado → HTML da nota em tabela (spec §3). É o texto que vai para o
// editor do CRM, então:
//   - só as tags table, colgroup, col, tbody, tr, th, td, div, br (e <b> vindo de `**x**`);
//   - só estilo inline (nenhum class, <style> ou <script>: o editor não conhece o CSS do CW);
//   - texto do agente escapado antes de qualquer marcação;
//   - a célula pendente só existe na prévia viva (`live`); a saída nunca a leva.
//
// Sem DOM: a mesma função desenha a prévia do agente, a saída e a prévia da Central.

import {
    activePlacements, cidCellValue, findSegment, labelText, resolveRow, rowState, rowVisible,
} from './note-table-model.js';

const C = { primary: '#1a73e8', primaryBg: '#e8f0fe', text: '#202124', textSub: '#5f6368', bgInput: '#f8f9fa', surface: '#fff' };
const FONT = "'Google Sans', Roboto, Arial, sans-serif";
const HAIR = '1px solid rgba(60,64,67,.16)';
const PENDING_BG = '#fef7e0';
const COMMENTS_HEAD = 'Additional Comments (Optional)';

export const NOTE_FOOTER = {
    pt: 'Nota criada através do Cases Wizard.',
    es: 'Nota creada a través de Cases Wizard.',
    en: 'Note created through Cases Wizard.',
};

export function escapeHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Valor do agente: escapa, depois `**x**` vira <b>x</b> (asterisco sem par fica literal) e
// as quebras viram <br>, sem linha em branco no meio (spec §1).
export function valueHtml(v) {
    return String(v ?? '').replace(/\r\n?/g, '\n').split('\n')
        .filter((line) => line.trim())
        .map((line) => escapeHtml(line.replace(/\s+$/, '')).replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>'))
        .join('<br>');
}

function cellHtml({ row, span = 1, rowspan = 1, head, bg, bold, color, valign = 'top', vline }, html) {
    const style = [
        'padding:8px 12px', 'font-size:13px', 'line-height:1.45', `vertical-align:${valign}`,
        'word-break:break-word', 'overflow-wrap:anywhere',
        row > 0 ? `border-top:${HAIR}` : '', vline ? `border-left:${HAIR}` : '',
        `background-color:${bg || C.surface}`, `color:${color || C.text}`,
        (bold || head) ? 'font-weight:700' : 'font-weight:400', 'text-align:left',
    ].filter(Boolean).join(';');
    const tag = head ? 'th' : 'td';
    return `<${tag}${span > 1 ? ` colspan="${span}"` : ''}${rowspan > 1 ? ` rowspan="${rowspan}"` : ''} style="${style}">${html}</${tag}>`;
}

// Monta as linhas respeitando os rowspan de cima: a borda de esquerda (`vline`) só vale em
// coluna > 0 pela posição real da célula, não pelo índice dela na linha.
function gridHtml(rows, live) {
    const busy = [];
    let out = '';
    rows.forEach((cells, r) => {
        busy[r] = busy[r] || [];
        let c = 0;
        let html = '';
        for (const cell of cells) {
            while (busy[r][c]) c++;
            const span = cell.span || 1;
            const rs = cell.rowspan || 1;
            for (let k = 0; k < rs; k++) {
                busy[r + k] = busy[r + k] || [];
                for (let j = 0; j < span; j++) busy[r + k][c + j] = true;
            }
            html += cellHtml({ ...cell, row: r, vline: !!cell.vline && c > 0 }, cell.html);
            c += span;
        }
        out += `<tr${live && cells.rowId ? ` data-row="${escapeHtml(cells.rowId)}"` : ''}>${html}</tr>`;
    });
    return out;
}

const withRowId = (cells, rowId) => Object.assign(cells, { rowId });

// opts: { live, lang, pendingLabel, tsDisclaimer, ignoreWhen }
export function renderBlockTable(catalog, st, placement, opts = {}) {
    const blk = catalog.blocks[placement.b];
    if (!blk) return '';
    const N = blk.cols;
    const lang = opts.lang || 'en';
    const live = !!opts.live;
    const pending = () => (live
        ? { bg: PENDING_BG, html: `<span style="color:#b06000;font-style:italic">${escapeHtml(opts.pendingLabel || 'pending')}</span>` }
        : { html: 'NA' });
    const rows = [];
    for (const sec of blk.sections) {
        if (sec.kind === 'cid') {
            rows.push([{ span: N, head: true, bg: C.primaryBg, html: escapeHtml(labelText(sec.title, lang)) }]);
            rows.push(sec.columns.map((c) => ({ head: true, vline: true, bg: C.bgInput, color: C.textSub, html: escapeHtml(labelText(c.label, lang)) })));
            const cids = st.cids || [];
            if (!cids.length) rows.push([{ span: N, ...pending() }]);
            cids.forEach((cr, ci) => rows.push(withRowId(sec.columns.map((c, i) => {
                const v = cidCellValue(c, cr);
                if (!v) return { bold: i === 0, vline: true, ...pending() };
                return { bold: i === 0, vline: true, html: valueHtml(v) };
            }), `cid:${ci}:${sec.columns[0].id}`)));
            continue;
        }
        const vis = (sec.rows || []).filter((r) => rowVisible(catalog, st, r, { ignoreWhen: opts.ignoreWhen }));
        if (!vis.length) continue;
        const head = [
            { span: N - 1, head: true, bg: C.primaryBg, html: escapeHtml(labelText(sec.title, lang)) },
            { head: true, vline: true, bg: C.bgInput, color: C.textSub, html: COMMENTS_HEAD },
        ];
        rows.push(head);
        const ctx = { blockId: placement.b, tsDisclaimer: opts.tsDisclaimer };
        if (sec.kind === 'group') {
            vis.forEach((r, i) => {
                const v = resolveRow(catalog, st, r, ctx);
                const line = [];
                if (i === 0) line.push({ rowspan: vis.length, bold: true, bg: C.bgInput, color: C.primary, valign: 'middle', html: escapeHtml(labelText(sec.group, lang)) });
                line.push({ bold: true, html: escapeHtml(labelText(r.label, lang)) });
                line.push(v === null ? pending() : { html: valueHtml(v) });
                line.push({ vline: true, html: valueHtml(rowState(st, r.id).comment) });
                rows.push(withRowId(line, r.id));
            });
        } else {
            const ls = N === 3 ? 1 : 2;
            const vs = N - ls - 1;
            for (const r of vis) {
                const v = resolveRow(catalog, st, r, ctx);
                rows.push(withRowId([
                    { span: ls, bold: true, bg: C.bgInput, html: escapeHtml(labelText(r.label, lang)) },
                    v === null ? { span: vs, ...pending() } : { span: vs, html: valueHtml(v) },
                    { vline: true, html: valueHtml(rowState(st, r.id).comment) },
                ], r.id));
            }
        }
    }
    if (!rows.length) return '';
    const tableStyle = `width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0;border:${HAIR};border-radius:12px;overflow:hidden;font-family:${FONT};margin:0 0 4px 0`;
    const cols = `<colgroup>${blk.widths.map((w) => `<col style="width:${w}%">`).join('')}</colgroup>`;
    const seg = findSegment(catalog, st.seg);
    const title = labelText(placement.title, lang);
    const heading = (seg && seg.showTitle && title)
        ? `<div style="font-family:${FONT};font-size:13px;font-weight:700;color:${C.primary};margin:16px 0 6px 0">${escapeHtml(title)}</div>`
        : '';
    return `${heading}<table style="${tableStyle}">${cols}<tbody>${gridHtml(rows, live)}</tbody></table>`;
}

// A nota inteira: as tabelas dos blocos ativos (Additional Details por último) e o rodapé
// no idioma do atendimento. Sem bloco ativo, string vazia.
export function renderNoteHtml(catalog, st, opts = {}) {
    const lang = opts.lang || 'en';
    const parts = activePlacements(catalog, st).map((p) => renderBlockTable(catalog, st, p, opts)).filter(Boolean);
    if (!parts.length) return '';
    const footer = opts.footer || NOTE_FOOTER[lang] || NOTE_FOOTER.en;
    return parts.join('<div style="height:10px"></div>')
        + `<div style="font-family:${FONT};font-size:12px;font-style:italic;color:${C.textSub};margin-top:8px">${escapeHtml(footer)}</div>`;
}
