// src/modules/notes-table/note-table-service.js
//
// O catálogo da nota em tabela que o agente usa: o EMBUTIDO (note-table-data.js)
// mesclado, pelo id, com o que a Central publicou em `note_blocks` e `note_layouts`.
//
// Ao contrário dos serviços do Case Notes antigo, isto NÃO reescreve uma estrutura
// no lugar: devolve um catálogo novo, e o embutido fica intacto para servir de
// fallback a cada hidratação.
//
// As três regras que custaram caro nos outros módulos:
//  - um item corrompido não derruba os outros (cada bloco/segmento vale sozinho);
//  - `kind`/`type` que este bundle não conhece é IGNORADO com console.warn, nunca
//    lança: a Central pode publicar dado novo antes do bundle que o desenha
//    (learning 2026-10-23);
//  - espelho que a Central não serviu não é espelho vazio: módulo vazio, offline
//    ou sem cache = o embutido inteiro (learning "Semear não é sincronizar").

import { DataService } from "../shared/data-service.js";
import { NOTE_TABLE_CATALOG } from "./note-table-data.js";
import { CID_COLUMN_TYPES, ROW_ID_PATTERN, ROW_TYPES, SECTION_KINDS } from "./note-table-model.js";

export const NOTE_BLOCKS_MODULE = "note_blocks";
export const NOTE_LAYOUTS_MODULE = "note_layouts";

const clone = (o) => JSON.parse(JSON.stringify(o));
const warn = (msg) => console.warn(`[notetable] ${msg}`);

function parse(raw) {
    try {
        const v = JSON.parse(raw || "null");
        return v && typeof v === "object" && !Array.isArray(v) ? v : null;
    } catch (e) {
        return null;
    }
}

const hasLabel = (x) => !!(x && x.label && typeof x.label === "object" && String(x.label.en || "").trim());

// Um bloco publicado, só com o que este bundle sabe desenhar; null quando não sobra
// uma tabela que feche (aí vale o embutido daquele bloco).
export function sanitizeBlock(key, value) {
    const v = typeof value === "string" ? parse(value) : value;
    if (!v) { warn(`bloco '${key}' ilegível; mantido o embutido.`); return null; }
    const cols = v.cols;
    const widths = Array.isArray(v.widths) ? v.widths : [];
    const sum = widths.reduce((a, b) => a + (Number(b) || 0), 0);
    if (![3, 4, 5, 6].includes(cols) || widths.length !== cols || Math.abs(sum - 100) > 0.001) {
        warn(`bloco '${key}' com grade inválida; mantido o embutido.`);
        return null;
    }
    const sections = [];
    for (const sec of Array.isArray(v.sections) ? v.sections : []) {
        if (!sec || !SECTION_KINDS.includes(sec.kind)) { warn(`bloco '${key}': seção '${sec && sec.kind}' desconhecida, ignorada.`); continue; }
        if (sec.kind === "cid") {
            const columns = Array.isArray(sec.columns) ? sec.columns : [];
            const ok = columns.length === cols && columns.every((c) => c && ROW_ID_PATTERN.test(String(c.id || "")) && CID_COLUMN_TYPES.includes(c.type) && hasLabel(c));
            if (!ok) { warn(`bloco '${key}': seção por CID com coluna desconhecida, ignorada.`); continue; }
            sections.push(sec);
            continue;
        }
        if (sec.kind === "group" && cols !== 4) { warn(`bloco '${key}': grupo fora de 4 colunas, ignorado.`); continue; }
        const seen = new Set();
        const rows = (Array.isArray(sec.rows) ? sec.rows : []).filter((r) => {
            if (!r || !ROW_ID_PATTERN.test(String(r.id || "")) || seen.has(r.id)) { warn(`bloco '${key}': linha sem id válido, ignorada.`); return false; }
            if (!ROW_TYPES.includes(r.type)) { warn(`bloco '${key}': linha '${r.id}' de tipo '${r.type}' desconhecido, ignorada.`); return false; }
            if (!hasLabel(r)) { warn(`bloco '${key}': linha '${r.id}' sem rótulo, ignorada.`); return false; }
            seen.add(r.id);
            return true;
        });
        if (rows.length) sections.push({ ...sec, rows });
    }
    if (!sections.length) { warn(`bloco '${key}' sem seção que este app desenhe; mantido o embutido.`); return null; }
    return { ...v, sections };
}

function sanitizeSegment(key, value, blocks) {
    const v = typeof value === "string" ? parse(value) : value;
    if (!v || !["multi", "single"].includes(v.select) || !Array.isArray(v.blocks)) {
        warn(`segmento '${key}' ilegível; mantido o embutido.`);
        return null;
    }
    const placements = v.blocks.filter((p) => {
        if (p && blocks[p.b]) return true;
        warn(`segmento '${key}': bloco '${p && p.b}' desconhecido, ignorado.`);
        return false;
    });
    if (!placements.length) { warn(`segmento '${key}' sem bloco conhecido; mantido o embutido.`); return null; }
    const seg = { key, ...v, blocks: placements };
    if (Array.isArray(v.always)) {
        const inSeg = placements.map((p) => p.b);
        seg.always = v.always.filter((b) => inSeg.includes(b));
    } else delete seg.always;
    return seg;
}

const sorted = (items) => (Array.isArray(items) ? items : []).slice().sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

// Mescla pelo id. Bloco/segmento não publicado continua o embutido; publicado e
// válido substitui o embutido de mesmo id; id novo entra no fim.
export function mergeNoteCatalog(embedded, blockItems, layoutItems) {
    const catalog = clone(embedded);
    let applied = 0;
    for (const it of sorted(blockItems)) {
        const key = String(it && it.key || "").trim();
        if (!key) continue;
        const blk = sanitizeBlock(key, it.value);
        if (blk) { catalog.blocks[key] = blk; applied++; }
    }
    for (const it of sorted(layoutItems)) {
        const key = String(it && it.key || "").trim();
        if (!key) continue;
        const seg = sanitizeSegment(key, it.value, catalog.blocks);
        if (!seg) continue;
        const i = catalog.segments.findIndex((s) => s.key === key);
        if (i >= 0) catalog.segments[i] = seg; else catalog.segments.push(seg);
        applied++;
    }
    return { catalog, applied };
}

let current = clone(NOTE_TABLE_CATALOG);
let fromCentral = false;

export function getNoteCatalog() {
    return current;
}

// O catálogo veio (ao menos em parte) da Central? A tela da Central e a poda de
// rascunhos dependem de saber de onde veio, não só do que veio.
export function isCatalogFromCentral() {
    return fromCentral;
}

function apply(blockItems, layoutItems) {
    const { catalog, applied } = mergeNoteCatalog(NOTE_TABLE_CATALOG, blockItems, layoutItems);
    current = catalog;
    fromCentral = applied > 0;
    return applied > 0;
}

const subscribers = new Set();
let inFlight = null;

function notify() {
    for (const fn of subscribers) {
        try { fn(current); } catch (e) { console.warn("[notetable] assinante do catálogo falhou.", e); }
    }
}

// Cache primeiro (render imediato), rede depois; cada aplicação avisa os assinantes.
async function fetchCatalog() {
    const cachedBlocks = DataService.getCachedContent(NOTE_BLOCKS_MODULE);
    const cachedLayouts = DataService.getCachedContent(NOTE_LAYOUTS_MODULE);
    if (apply(cachedBlocks, cachedLayouts)) notify();
    try {
        const [blocks, layouts] = await Promise.all([
            DataService.fetchContentModule(NOTE_BLOCKS_MODULE),
            DataService.fetchContentModule(NOTE_LAYOUTS_MODULE),
        ]);
        if (apply(blocks, layouts)) notify();
    } catch (e) {
        console.warn("[notetable] catálogo da Central indisponível; usando o embutido.", e);
    }
    return current;
}

export function loadNoteCatalog(onApply) {
    if (onApply) subscribers.add(onApply);
    if (!inFlight) inFlight = fetchCatalog();
    return inFlight;
}
