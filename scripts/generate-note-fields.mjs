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

// O form-builder pula estes na renderização (são toggles/derivados, não
// entradas de texto), então um modelo de nota nunca pode preenchê-los.
const NOT_TEXT_ENTRY = ['TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'CONSENTIU_GRAVACAO', 'CASO_PORTUGAL', 'label_substatus'];

// O universo de campos preenchíveis é a UNIÃO dos templateFields de todos os
// substatus, menos os que não são entrada de texto.
//
// Deliberadamente mais amplo que "campos de texto longo": um modelo de nota
// preenche também os fixos - SPEAKEASY_ID, ON_CALL (Call Started),
// GTM_GA4_VERIFICADO -, e os cenários que já existem hoje fazem exatamente
// isso. Restringir aos textareas deixaria de fora justamente os campos que
// aparecem em toda nota.
const universo = [];
for (const tpl of Object.values(SUBSTATUS_TEMPLATES)) {
    for (const f of tpl.templateFields || []) {
        if (!NOT_TEXT_ENTRY.includes(f) && !universo.includes(f)) universo.push(f);
    }
}

const seen = new Set();
const fields = [];

for (const key of universo) {
    if (seen.has(key)) continue;
    seen.add(key);

    // O rótulo mostrado vem das mesmas traduções que a nota usa, então a
    // Central chama o campo exatamente como a nota chama.
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
        required: requiredFields.includes(key),
    });
}

// Detalhe de cada substatus: a Central precisa saber, para um substatus
// escolhido, QUAIS campos aquela nota tem e quais são obrigatórios - é isso que
// permite montar a nota inteira na tela em vez de escolher campo a campo.
//
// `status` vem do próprio template: o substatus determina o status pai, então
// não há por que guardar os dois no item e arriscar que divirjam.
const substatus = Object.keys(SUBSTATUS_TEMPLATES).sort().map((key) => {
    const tpl = SUBSTATUS_TEMPLATES[key];
    const campos = (tpl.templateFields || []).filter((f) => !NOT_TEXT_ENTRY.includes(f));

    // O que o MODELO precisa trazer preenchido - não é a mesma coisa que o que
    // a nota exige para ser gerada. getEffectiveRequiredFields() também torna
    // GTM_GA4_VERIFICADO obrigatório quando o template exige tarefa, mas isso é
    // trabalho do agente no atendimento, não do modelo: um modelo legitimamente
    // adianta a narrativa e deixa a verificação para quem está na call.
    // REASON_COMMENTS é a exceção, e por isso vem sempre preenchido.
    // Campos que o próprio substatus já entrega com texto (fieldPrefixes).
    // Não podem ser exigidos do modelo: o AS_Reschedule_1, por exemplo, já
    // prefixa REASON_COMMENTS com "Caso Reagendado.", e por isso os cenários
    // de reagendamento preenchem MOTIVO_REAGENDAMENTO em vez dele.
    const comPrefixo = Object.keys(tpl.fieldPrefixes || {});

    return {
        key,
        status: tpl.status || '',
        name: tpl.name || key,
        requiresTasks: !!tpl.requiresTasks,
        fields: campos,
        prefixedFields: comPrefixo.filter((f) => campos.includes(f)),
        requiredFields: requiredFields.filter(
            (f) => campos.includes(f) && !comPrefixo.includes(f)
        ),
    };
});

const payload = { fields, substatus };

writeFileSync(
    resolve(here, '../gas-backend/seeds/note-fields.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:note-fields (lê src/modules/notes/data/notes-data.js)
//
// Catálogo da nota técnica usado pela Central de Conteúdo: a lista de campos de
// texto e, para cada substatus, quais campos aquela nota tem e quais são
// obrigatórios. Não é conteúdo - é a estrutura que permite montar a nota
// inteira na tela e validar o que foi montado.
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

const semCampos = substatus.filter(s => !s.fields.length).map(s => s.key);

process.stdout.write(
    `${fields.length} campos elegíveis, ${substatus.length} substatus\n` +
    (semCampos.length ? `substatus sem campo de texto: ${semCampos.join(', ')}\n` : '') +
    'Gerados: gas-backend/ContentFields_Notes.js e gas-backend/seeds/note-fields.json\n'
);
