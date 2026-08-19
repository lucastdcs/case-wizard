// scripts/generate-note-fields.mjs
//
// Gera o CATÁLOGO de campos de nota que a Central de Conteúdo usa para popular
// o seletor "Campo da nota" na aba Case Notes.
//
// Diferente das fases 1 e 2, aqui NÃO há conteúdo para semear: a biblioteca de
// trechos por campo é funcionalidade nova, e nasce vazia. O que precisa viajar
// para o backend é a lista de campos válidos - e ela precisa vir do próprio
// notes-data.js, senão vira uma segunda fonte de verdade que silenciosamente
// diverge quando alguém adicionar um campo à nota.
//
// Foi essa a decisão tomada: o campo-alvo é um select alimentado pela estrutura
// que já existe, nunca texto livre.
//
// Escreve:
//   - gas-backend/ContentFields_Notes.js  (catálogo lido pela tela)
//   - gas-backend/seeds/note-fields.json  (mesmo conteúdo, para inspeção)
//
// Uso: npm run seed:note-fields

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
    resolve(here, '../src/modules/notes/data/notes-data.js'),
    'utf8'
);

function extractLiteral(name, open, close) {
    const decl = `export const ${name} = ${open}`;
    const start = source.indexOf(decl);
    if (start === -1) throw new Error(`Não encontrei ${name} em notes-data.js`);

    const from = source.indexOf(open, start);
    let depth = 0;
    let inString = null;

    for (let i = from; i < source.length; i++) {
        const ch = source[i];
        const prev = source[i - 1];

        if (inString) {
            if (ch === inString && prev !== '\\') inString = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue; }
        if (ch === open) depth++;
        else if (ch === close) {
            depth--;
            if (depth === 0) return source.slice(from, i + 1);
        }
    }
    throw new Error(`Literal de ${name} não fecha`);
}

const evalLiteral = (text) => new Function(`return (${text});`)();

const translations = evalLiteral(extractLiteral('translations', '{', '}'));
const textareaListFields = evalLiteral(extractLiteral('textareaListFields', '[', ']'));
const textareaParagraphFields = evalLiteral(extractLiteral('textareaParagraphFields', '[', ']'));
const requiredFields = evalLiteral(extractLiteral('requiredFields', '[', ']'));
const SUBSTATUS_TEMPLATES = evalLiteral(extractLiteral('SUBSTATUS_TEMPLATES', '{', '}'));

// Campos onde um trecho pronto faz sentido: os de texto longo, mais os
// obrigatórios de texto (REASON_COMMENTS), que os cenários rápidos já preenchem
// com frases prontas hoje. Campos como SPEAKEASY_ID ficam de fora: são
// identificadores, não redação.
const eligible = [
    ...textareaListFields,
    ...textareaParagraphFields,
    ...requiredFields.filter(f => !textareaListFields.includes(f) && !textareaParagraphFields.includes(f)),
];

// O form-builder pula estes na renderização (são toggles/derivados, não
// entradas de texto), então não podem aparecer no seletor.
const NOT_TEXT_ENTRY = ['TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'CONSENTIU_GRAVACAO', 'CASO_PORTUGAL', 'label_substatus'];

const seen = new Set();
const fields = [];

for (const key of eligible) {
    if (NOT_TEXT_ENTRY.includes(key) || seen.has(key)) continue;
    seen.add(key);

    // O rótulo mostrado ao agente vem das mesmas traduções que a nota usa, então
    // a Central chama o campo exatamente como a nota chama.
    const tKey = key.toLowerCase();
    const labelPt = translations.pt?.[tKey] || key;
    const labelEs = translations.es?.[tKey] || labelPt;

    fields.push({
        key,
        labelPt: String(labelPt).replace(/:\s*$/, ''),
        labelEs: String(labelEs).replace(/:\s*$/, ''),
        kind: textareaListFields.includes(key) ? 'lista'
            : textareaParagraphFields.includes(key) ? 'paragrafo'
                : 'texto',
    });
}

// Escopo opcional por substatus: o módulo de notas já trabalha com essa noção
// (scenarioSnippets declara `substatus: [...]`), então um trecho poder valer só
// para um substatus específico não inventa conceito novo.
const substatus = Object.keys(SUBSTATUS_TEMPLATES).sort();

const payload = { fields, substatus };

writeFileSync(
    resolve(here, '../gas-backend/seeds/note-fields.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:note-fields (lê src/modules/notes/data/notes-data.js)
//
// Catálogo de campos da nota técnica, usado pela Central de Conteúdo para
// popular o seletor "Campo da nota" na aba Case Notes. Não é conteúdo: é a
// lista de destinos válidos para um trecho.
//
// Vem do notes-data.js de propósito. Manter uma cópia digitada à mão aqui
// criaria uma segunda fonte de verdade, que divergiria em silêncio na primeira
// vez que alguém adicionasse um campo à nota. Adicionou campo lá? Rode
// \`npm run seed:note-fields\` e publique - nada além disso.

const CONTENT_NOTE_FIELDS = ${JSON.stringify(payload, null, 2)};

function getNoteFieldCatalog() {
  // Sem gate de papel: é metadado de formulário, não conteúdo. Mesmo assim só
  // é chamado de dentro da Central, que já exige acesso para abrir.
  return CONTENT_NOTE_FIELDS;
}
`;

writeFileSync(resolve(here, '../gas-backend/ContentFields_Notes.js'), gasFile);

process.stdout.write(
    `${fields.length} campos elegíveis, ${substatus.length} substatus\n` +
    `campos: ${fields.map(f => f.key).join(', ')}\n` +
    'Gerados: gas-backend/ContentFields_Notes.js e gas-backend/seeds/note-fields.json\n'
);
