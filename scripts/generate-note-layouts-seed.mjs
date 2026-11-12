// scripts/generate-note-layouts-seed.mjs
//
// Gera a semeadura dos módulos `note_blocks` (o corpo das tabelas) e
// `note_layouts` (os segmentos ALL TASKS, ECL SBS-E e ECL MMS) da nota em tabela,
// a partir do catálogo embutido em src/modules/notes-table/note-table-data.js.
//
// Um item por bloco e um por segmento, `lang: 'ALL'`: as traduções dos rótulos
// viajam DENTRO do item (`label: { pt, es, en }`), como os screenshots das tasks,
// porque a linha é uma só e o rótulo é dela. O `key` é o id do bloco/segmento,
// estável como o id da linha.
//
// Escreve:
//   - gas-backend/seeds/note-layouts-seed.json  (para inspeção)
//   - gas-backend/ContentSeed_NoteLayouts.js    (roda: seedNoteLayoutsNow())
//
// ORDEM DE IMPLANTAÇÃO (learning 2026-10-23): frontend no ar → seedNoteLayoutsNow()
// → conferir na Central → só então publicar. Nunca o contrário.
//
// Uso: npm run seed:note-layouts

import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

// Os fontes são módulos ES num pacote sem "type": "module": passam pelo esbuild,
// como nos testes, em vez de depender da detecção de módulo do Node.
async function load(entry) {
    const out = await build({
        entryPoints: [resolve(here, entry)], bundle: true, write: false,
        format: 'cjs', platform: 'node', logLevel: 'silent',
    });
    const mod = { exports: {} };
    // eslint-disable-next-line no-new-func
    new Function('module', 'exports', out.outputFiles[0].text)(mod, mod.exports);
    return mod.exports;
}
const { NOTE_TABLE_CATALOG: CATALOG } = await load('../src/modules/notes-table/note-table-data.js');
const M = await load('../src/modules/notes-table/note-table-model.js');

const problemas = [];
const ids = (list) => list.map((x) => x.id);
const dup = (list) => list.filter((x, i) => list.indexOf(x) !== i);

for (const [id, blk] of Object.entries(CATALOG.blocks)) {
    const sum = (blk.widths || []).reduce((a, b) => a + b, 0);
    if (!Number.isInteger(blk.cols) || blk.cols < 3 || blk.cols > 6) problemas.push(`${id}: cols ${blk.cols}`);
    if ((blk.widths || []).length !== blk.cols || sum !== 100) problemas.push(`${id}: larguras ${JSON.stringify(blk.widths)}`);
    const rows = M.blockRows(blk);
    if (dup(ids(rows)).length) problemas.push(`${id}: id repetido ${dup(ids(rows)).join(', ')}`);
    for (const sec of blk.sections) {
        if (!M.SECTION_KINDS.includes(sec.kind)) problemas.push(`${id}: kind ${sec.kind}`);
        if (sec.kind === 'group' && blk.cols !== 4) problemas.push(`${id}: grupo fora de 4 colunas`);
        for (const r of sec.rows || []) {
            if (!M.ROW_TYPES.includes(r.type) || !M.ROW_ID_PATTERN.test(r.id) || !r.label?.en) problemas.push(`${id}/${r.id}: linha inválida`);
        }
        for (const c of sec.columns || []) {
            if (!M.CID_COLUMN_TYPES.includes(c.type) || !M.ROW_ID_PATTERN.test(c.id) || !c.label?.en) problemas.push(`${id}/${c.id}: coluna inválida`);
        }
    }
}
for (const s of CATALOG.segments) {
    for (const p of s.blocks) if (!CATALOG.blocks[p.b]) problemas.push(`${s.key}: bloco ${p.b} não existe`);
}

if (problemas.length) {
    process.stderr.write('Catálogo da nota em tabela inconsistente — nada gerado:\n  ' + problemas.join('\n  ') + '\n');
    process.exit(1);
}

const blocks = {
    module: 'note_blocks',
    items: Object.entries(CATALOG.blocks).map(([key, blk], i) => ({
        key, lang: 'ALL', label: blk.name, value: JSON.stringify(blk), sortOrder: i,
    })),
};
const layouts = {
    module: 'note_layouts',
    items: CATALOG.segments.map(({ key, ...seg }, i) => ({
        key, lang: 'ALL', label: seg.name, value: JSON.stringify(seg), sortOrder: i,
    })),
};
const payload = [blocks, layouts];

writeFileSync(resolve(here, '../gas-backend/seeds/note-layouts-seed.json'), JSON.stringify(payload, null, 2) + '\n');

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:note-layouts (lê o catálogo embutido de
// src/modules/notes-table/note-table-data.js)
//
// Semeia os módulos "note_blocks" e "note_layouts" da Central de Conteúdo com o
// padrão da nota em tabela (ADR-0022 e ADR-0024). Os blocos vão primeiro: um
// segmento só pode apontar para bloco que já existe no ar.
//
// ORDEM DE IMPLANTAÇÃO: frontend no ar -> seedNoteLayoutsNow() -> conferir na
// Central -> só então publicar. Nunca o contrário (um bundle antigo não sabe
// desenhar o que não conhece).
//
// COMO RODAR: no editor do Apps Script, escolha "seedNoteLayoutsNow" no seletor
// de função e clique em Executar. Semear só escreve em módulo vazio: chamadas
// seguintes devolvem "skipped" se o módulo já tiver itens no ar.

const CONTENT_SEED_NOTE_LAYOUTS = ${JSON.stringify(payload, null, 2)};

function seedNoteLayoutsNow() {
  const result = CONTENT_SEED_NOTE_LAYOUTS.map(function (p) { return seedContentModule(p); });
  Logger.log(result);
  return result;
}
`;
writeFileSync(resolve(here, '../gas-backend/ContentSeed_NoteLayouts.js'), gasFile);

const linhas = Object.values(CATALOG.blocks).reduce((n, b) => n + M.blockRows(b).length, 0);
process.stdout.write(`${blocks.items.length} blocos (${linhas} linhas), ${layouts.items.length} segmentos\n`
    + 'Gerados: gas-backend/seeds/note-layouts-seed.json e gas-backend/ContentSeed_NoteLayouts.js\n');
