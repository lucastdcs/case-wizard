// scripts/generate-links-seed.mjs
//
// Gera o payload de semeadura do módulo "links" a partir do LINKS_DB que hoje
// está embutido em src/modules/links/links-assistant.js, já casando cada
// descrição com a tradução correspondente em LINK_DESC_ES.
//
// Por que ler o arquivo em vez de importar o módulo: links-assistant.js importa
// utilitários que tocam `document` no topo, e não roda fora do navegador. Extrair
// só os dois literais de dados evita subir um DOM falso só pra isso.
//
// Uso:
//   node scripts/generate-links-seed.mjs > links-seed.json
//
// Depois: abra a Central de Conteúdo no Apps Script e rode
//   seedContentModule(<conteúdo do arquivo>)
// uma única vez. A função ignora chamadas repetidas se o módulo já tiver
// itens no ar, então não há risco de duplicar.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
    resolve(here, '../src/modules/links/links-assistant.js'),
    'utf8'
);

// Recorta um literal de objeto pelo nome, contando chaves para achar o fim.
// Uma regex sozinha não dá conta: os valores contêm `{` e `}` dentro de strings.
function extractObjectLiteral(name) {
    const start = source.indexOf(`const ${name} = {`);
    if (start === -1) throw new Error(`Não encontrei ${name} em links-assistant.js`);

    const open = source.indexOf('{', start);
    let depth = 0;
    let inString = null;

    for (let i = open; i < source.length; i++) {
        const ch = source[i];
        const prev = source[i - 1];

        if (inString) {
            if (ch === inString && prev !== '\\') inString = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return source.slice(open, i + 1);
        }
    }

    throw new Error(`Literal de ${name} não fecha`);
}

// eslint-disable-next-line no-eval
const LINKS_DB = eval(`(${extractObjectLiteral('LINKS_DB')})`);
// eslint-disable-next-line no-eval
const LINK_DESC_ES = eval(`(${extractObjectLiteral('LINK_DESC_ES')})`);

const items = [];
let order = 0;

for (const [category, group] of Object.entries(LINKS_DB)) {
    for (const link of group.links) {
        items.push({
            key: category,
            lang: 'ALL',
            label: link.name,
            value: JSON.stringify({
                name: link.name,
                url: link.url,
                desc: link.desc || '',
                // A tradução vem do mapa que hoje é global; ao migrar, ela passa
                // a morar junto do link e vira editável pela tela.
                desc_es: LINK_DESC_ES[link.desc] || ''
            }),
            sortOrder: order++
        });
    }
}

const missingEs = items.filter(i => !JSON.parse(i.value).desc_es).length;

process.stderr.write(
    `${items.length} links em ${Object.keys(LINKS_DB).length} categorias` +
    (missingEs ? ` · ${missingEs} sem tradução ES\n` : '\n')
);

process.stdout.write(JSON.stringify({ module: 'links', items }, null, 2));
