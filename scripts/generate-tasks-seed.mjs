// scripts/generate-tasks-seed.mjs
//
// Gera a semeadura do módulo "task_screenshots" a partir do TASKS_DB que hoje
// está embutido em src/modules/notes/data/notes-data.js.
//
// São as 13 tasks do catálogo do Case Notes e, para cada uma, os screenshots que
// o Win Criteria exige em cada modo (implementação e educação). É conteúdo de
// SME: quando o Win Criteria muda, hoje é preciso um deploy do bundle. Depois
// desta migração, muda na Central.
//
// A TRADUÇÃO: o espanhol vive num mapa por frase (SCREENSHOT_LABEL_ES), porque
// os mesmos rótulos se repetem em várias tasks. Aqui ele é MATERIALIZADO por
// task, na mesma ordem da lista base — é o que permite ao SME editar as duas
// redações lado a lado sem caçar um mapa paralelo. Rótulo sem tradução no mapa
// sai como string vazia, que o getTaskScreenshots() resolve caindo no texto
// base: exatamente o que o agente ES já vê hoje.
//
// Escreve:
//   - gas-backend/seeds/tasks-seed.json  (para inspeção)
//   - gas-backend/ContentSeed_Tasks.js   (roda: seedTasksNow())
//
// Uso: npm run seed:tasks

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
    resolve(here, '../src/modules/notes/data/notes-data.js'),
    'utf8'
);

// Casa pelo texto EXATO da declaração — mesmo cuidado dos outros geradores:
// casar só pelo nome já extraiu o objeto errado em silêncio uma vez.
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

const TASKS_DB = evalLiteral(extractLiteral('export const TASKS_DB = {', '{', '}'));
const SCREENSHOT_LABEL_ES = evalLiteral(
    extractLiteral('const SCREENSHOT_LABEL_ES = {', '{', '}')
);

const MODOS = ['implementation', 'education'];

const items = [];
const problemas = [];
const semTraducao = [];
let order = 0;

for (const [key, task] of Object.entries(TASKS_DB)) {
    const nome = String(task.name || '').trim();
    if (!nome) {
        problemas.push(`${key}: sem nome`);
        continue;
    }

    const screenshots = {};
    const screenshotsEs = {};

    for (const modo of MODOS) {
        const labels = (task.screenshots && task.screenshots[modo]) || [];
        if (!Array.isArray(labels)) {
            problemas.push(`${key} (${modo}): screenshots não é lista`);
            continue;
        }

        const limpos = labels.map((l) => String(l).trim()).filter(Boolean);
        if (limpos.length !== labels.length) {
            problemas.push(`${key} (${modo}): rótulo vazio na lista`);
            continue;
        }
        screenshots[modo] = limpos;

        // Só materializa o ES quando existe ao menos uma tradução. Sem isso as
        // tasks cujos rótulos já estão em inglês nasceriam com uma lista de
        // strings vazias na planilha — ruído que o SME teria de decifrar.
        const traduzidos = limpos.map((l) => SCREENSHOT_LABEL_ES[l] || '');
        if (traduzidos.some(Boolean)) {
            screenshotsEs[modo] = traduzidos;
            limpos.forEach((l, i) => {
                if (!traduzidos[i]) semTraducao.push(`${key} (${modo}): ${l}`);
            });
        } else if (limpos.length) {
            semTraducao.push(`${key} (${modo}): ${limpos.length} rótulos, nenhum traduzido`);
        }
    }

    const total = MODOS.reduce((n, m) => n + (screenshots[m] || []).length, 0);
    if (!total) {
        problemas.push(`${key}: nenhum screenshot em nenhum modo`);
        continue;
    }

    const value = { name: nome, popular: task.popular === true, screenshots: screenshots };
    if (Object.keys(screenshotsEs).length) value.screenshots_es = screenshotsEs;

    items.push({
        key: key,
        lang: 'ALL',
        label: nome,
        value: JSON.stringify(value),
        sortOrder: order++,
    });
}

if (problemas.length) {
    process.stderr.write('Tasks inconsistentes — nada gerado:\n  ' + problemas.join('\n  ') + '\n');
    process.exit(1);
}

const payload = { module: 'task_screenshots', items };

writeFileSync(
    resolve(here, '../gas-backend/seeds/tasks-seed.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:tasks (lê o TASKS_DB de
// src/modules/notes/data/notes-data.js)
//
// Semeia o módulo "task_screenshots" da Central de Conteúdo com o catálogo de
// tasks e os screenshots do Win Criteria que o agente já usa hoje. É migração de
// conteúdo que já está em produção, não mudança nova - por isso publica direto,
// sem passar pela fila.
//
// COMO RODAR: no editor do Apps Script, escolha "seedTasksNow" no seletor de
// função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar.

const CONTENT_SEED_TASKS = ${JSON.stringify(payload, null, 2)};

function seedTasksNow() {
  const result = seedContentModule(CONTENT_SEED_TASKS);
  Logger.log(result);
  return result;
}
`;

writeFileSync(resolve(here, '../gas-backend/ContentSeed_Tasks.js'), gasFile);

const populares = items.filter((i) => JSON.parse(i.value).popular).length;
const rotulos = items.reduce((n, i) => {
    const v = JSON.parse(i.value);
    return n + MODOS.reduce((m, modo) => m + (v.screenshots[modo] || []).length, 0);
}, 0);

let relatorio = `${items.length} tasks (${populares} no Acesso rápido), ${rotulos} rótulos de screenshot\n`;

if (semTraducao.length) {
    relatorio += '\nRótulos que seguem em português/inglês para o agente ES — é o\n' +
        'comportamento de hoje (o mapa embutido não os traduz), agora visível e\n' +
        'corrigível na Central:\n  ' + semTraducao.join('\n  ') + '\n';
}

relatorio += '\nGerados: gas-backend/seeds/tasks-seed.json e gas-backend/ContentSeed_Tasks.js\n';
process.stdout.write(relatorio);
