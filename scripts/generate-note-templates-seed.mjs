// scripts/generate-note-templates-seed.mjs
//
// Gera a semeadura do módulo "note_template" a partir do scenarioSnippets que
// hoje está embutido em src/modules/notes/data/notes-data.js.
//
// São os 27 "cenários rápidos" que o agente já usa: cada um declara em qual
// substatus aparece, para qual fluxo vale (all/bau/lm) e com que texto preenche
// cada campo da nota. É exatamente o conceito de "nota inteira pronta" - só que
// hoje só dá pra mudar mexendo em código.
//
// Escreve:
//   - gas-backend/seeds/note-templates-seed.json  (para inspeção)
//   - gas-backend/ContentSeed_NoteTemplates.js    (roda: seedNoteTemplatesNow())
//
// Uso: npm run seed:note-templates

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
    resolve(here, '../src/modules/notes/data/notes-data.js'),
    'utf8'
);

// Casa pelo texto EXATO da declaração: casar só pelo nome já mordeu antes
// (EMAIL_TEMPLATES_ES é `const`, não `export const`, e o indexOf caía no
// primeiro `{` do arquivo, extraindo o objeto errado em silêncio).
function extractLiteral(decl, open, close) {
    const start = source.indexOf(decl);
    if (start === -1) throw new Error(`Não encontrei a declaração: ${decl}`);

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
    throw new Error(`Literal de ${decl} não fecha`);
}

const evalLiteral = (t) => new Function(`return (${t});`)();

const scenarioSnippets = evalLiteral(
    extractLiteral('export const scenarioSnippets = {', '{', '}')
);
const SCENARIO_ES = evalLiteral(extractLiteral('const SCENARIO_ES = {', '{', '}'));
const SUBSTATUS_TEMPLATES = evalLiteral(
    extractLiteral('export const SUBSTATUS_TEMPLATES = {', '{', '}')
);

// O chip de hoje mostra o id cru sem o prefixo ("ni cms access"). Na Central o
// nome vira campo editável, então a semeadura entrega algo já legível em vez de
// carregar a limitação antiga adiante.
function nomeLegivel(id) {
    return id
        .replace(/^quickfill-/, '')
        .split('-')
        .map((p) => (p.length <= 3 ? p.toUpperCase() : p.charAt(0).toUpperCase() + p.slice(1)))
        .join(' ');
}

// Separa o que é campo de texto do que é metadado/tarefa. `linkedTask` e
// `activeTasks` não são campos da nota - são seleção de tarefas, e viajam à
// parte pra continuarem funcionando ao aplicar o modelo.
function extrairCampos(snippet) {
    const fields = {};
    for (const [k, v] of Object.entries(snippet)) {
        if (k.startsWith('field-') && typeof v === 'string' && v.trim()) {
            fields[k] = v;
        }
    }
    return fields;
}

const items = [];
const problemas = [];
// Não são erros: é o comportamento de hoje, exposto. Vão para o relatório
// porque merecem decisão humana, não porque impedem a migração.
const descartados = [];
const semSubstatus = [];
let order = 0;

// Remove os campos que o substatus não tem. NÃO é uma mudança de
// comportamento: hoje applyScenario() faz getElementById('field-X') e, quando o
// campo não existe naquele substatus, recebe null e ignora o texto em silêncio.
// Esses textos já não aparecem para ninguém. Carregá-los para a planilha só
// criaria itens que a tela mostraria como preenchidos e a nota nunca exibiria.
const NOT_TEXT_ENTRY = ['TAGS_IMPLEMENTED', 'SCREENSHOTS_LIST', 'CONSENTIU_GRAVACAO', 'CASO_PORTUGAL', 'label_substatus'];

function filtrarPeloTemplate(campos, tpl, id, sub) {
    const validos = {};
    const fora = [];

    for (const [k, v] of Object.entries(campos)) {
        const nome = k.replace('field-', '');
        const noTemplate = (tpl.templateFields || []).includes(nome);
        // Mesma regra do catálogo: se não é entrada de texto, não é preenchível.
        if (noTemplate && !NOT_TEXT_ENTRY.includes(nome)) validos[k] = v;
        else fora.push(nome);
    }

    if (fora.length) descartados.push(`${id} (${sub}): ${fora.join(', ')}`);
    return validos;
}

for (const [id, snip] of Object.entries(scenarioSnippets)) {
    const listaSub = Array.isArray(snip.substatus) ? snip.substatus : [snip.substatus].filter(Boolean);

    if (!listaSub.length) {
        // Cenário sem substatus nunca passa pelo filtro da tela: está morto no
        // código de hoje. Não dá pra inventar um substatus, então fica de fora
        // e é reportado - quem conhece o processo decide o que fazer com ele.
        semSubstatus.push(id);
        continue;
    }

    for (const sub of listaSub) {
        const tpl = SUBSTATUS_TEMPLATES[sub];
        if (!tpl) {
            problemas.push(`${id}: substatus inexistente "${sub}"`);
            continue;
        }

        const camposPt = filtrarPeloTemplate(extrairCampos(snip), tpl, id, sub);
        if (!Object.keys(camposPt).length) {
            problemas.push(`${id} (${sub}): sobrou nenhum campo válido`);
            continue;
        }

        const meta = {
            ...(snip.linkedTask ? { linkedTask: snip.linkedTask } : {}),
            ...(snip.activeTasks ? { activeTasks: snip.activeTasks } : {}),
        };

        items.push({
            key: sub,
            field: snip.type || 'all',
            lang: 'PT',
            label: nomeLegivel(id),
            value: JSON.stringify({ fields: camposPt, ...meta }),
            sortOrder: order++,
        });

        // SCENARIO_ES sobrescreve só os campos de texto; metadados seguem os de
        // PT, então a linha ES carrega apenas os campos.
        const es = SCENARIO_ES[id];
        if (es) {
            const camposEs = filtrarPeloTemplate(extrairCampos({ ...snip, ...es }), tpl, id + ' [ES]', sub);
            items.push({
                key: sub,
                field: snip.type || 'all',
                lang: 'ES',
                label: nomeLegivel(id),
                value: JSON.stringify({ fields: camposEs, ...meta }),
                sortOrder: order++,
            });
        }
    }
}

if (problemas.length) {
    process.stderr.write('Cenários inconsistentes — nada gerado:\n  ' + problemas.join('\n  ') + '\n');
    process.exit(1);
}

const payload = { module: 'note_template', items };

writeFileSync(
    resolve(here, '../gas-backend/seeds/note-templates-seed.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:note-templates (lê o scenarioSnippets de
// src/modules/notes/data/notes-data.js)
//
// Semeia o módulo "note_template" da Central de Conteúdo com os cenários
// rápidos que o agente já usa hoje. É migração de conteúdo que já está em
// produção, não mudança nova - por isso publica direto, sem passar pela fila.
//
// COMO RODAR: no editor do Apps Script, escolha "seedNoteTemplatesNow" no
// seletor de função e clique em Executar. Roda uma vez só; chamadas seguintes
// são ignoradas se o módulo já tiver itens no ar.

const CONTENT_SEED_NOTE_TEMPLATES = ${JSON.stringify(payload, null, 2)};

function seedNoteTemplatesNow() {
  const result = seedContentModule(CONTENT_SEED_NOTE_TEMPLATES);
  Logger.log(result);
  return result;
}
`;

writeFileSync(resolve(here, '../gas-backend/ContentSeed_NoteTemplates.js'), gasFile);

const pt = items.filter((i) => i.lang === 'PT').length;
const es = items.filter((i) => i.lang === 'ES').length;
const subs = [...new Set(items.map((i) => i.key))];

let relatorio = `${items.length} itens (${pt} PT + ${es} ES) em ${subs.length} substatus\n`;

if (descartados.length) {
    relatorio += '\nCampos descartados por não existirem no substatus.\n' +
        'Já não apareciam hoje (applyScenario ignora campo inexistente), então\n' +
        'nada muda para o agente — mas o texto existe e ninguém nunca o viu:\n  ' +
        descartados.join('\n  ') + '\n';
}

if (semSubstatus.length) {
    relatorio += `\nCenários sem substatus, fora da migração (hoje já não aparecem\n` +
        `em lugar nenhum): ${semSubstatus.join(', ')}\n`;
}

relatorio += '\nGerados: gas-backend/seeds/note-templates-seed.json e gas-backend/ContentSeed_NoteTemplates.js\n';
process.stdout.write(relatorio);
