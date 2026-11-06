// scripts/build-note-table-central.mjs
//
// Gera gas-backend/ContentDashboard_NoteTable.html: o renderizador da nota em
// tabela (src/modules/notes-table/note-table-render.js + o modelo) empacotado
// para a Central, que é HTML do Apps Script e não importa módulo ES.
//
// É o MESMO fonte do app, não uma cópia: a prévia "como o agente vê" da Central
// não pode desenhar uma tabela diferente da que o agente cola no caso
// (PLAN.md, passo 7: "nunca duas versões soltas"). test:note-table reconstrói
// isto em memória e reprova se o arquivo do repositório estiver velho.
//
// Uso: npm run build:note-table-central

import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');
export const CENTRAL_INCLUDE = resolve(raiz, 'gas-backend/ContentDashboard_NoteTable.html');

export async function buildCentralInclude() {
    const out = await build({
        stdin: {
            contents: `export { renderNoteHtml, renderBlockTable, valueHtml, escapeHtml, NOTE_FOOTER } from './src/modules/notes-table/note-table-render.js';
export { createNoteState, newCidRow, blockRows, labelText } from './src/modules/notes-table/note-table-model.js';`,
            resolveDir: raiz, sourcefile: 'central-entry.js', loader: 'js',
        },
        bundle: true, write: false, format: 'iife', globalName: 'CwNoteTable',
        target: 'es2018', legalComments: 'none', logLevel: 'silent', charset: 'utf8',
    });
    const js = out.outputFiles[0].text;
    return `<!-- ARQUIVO GERADO - não edite à mão. Origem: npm run build:note-table-central
     (src/modules/notes-table/note-table-render.js e note-table-model.js, os mesmos do app).
     Expõe window.CwNoteTable para a prévia "como o agente vê" da Central. -->
<script>
${js}</script>
`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    writeFileSync(CENTRAL_INCLUDE, await buildCentralInclude());
    process.stdout.write('Gerado: gas-backend/ContentDashboard_NoteTable.html\n');
}
