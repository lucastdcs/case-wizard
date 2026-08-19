// scripts/generate-call-script-seed.mjs
//
// Gera a semeadura do módulo "call_script" a partir do csaChecklistData que
// hoje está embutido em src/modules/call-script/call-script-data.js.
//
// Escreve dois arquivos, ambos versionados:
//   - gas-backend/seeds/call-script-seed.json  (para inspecionar o conteúdo)
//   - gas-backend/ContentSeed_CallScript.js    (o que realmente roda)
//
// A semeadura é feita escolhendo `seedCallScriptNow` no seletor de função do
// editor do Apps Script e clicando em Executar - o botão Run só aceita funções
// sem argumentos, daí o wrapper.
//
// Rode apenas para regerar os arquivos depois de mexer no csaChecklistData:
//   npm run seed:call-script
//
// --- Normalização aplicada na migração ---
// Hoje a chave é combinada ("PT BAU", "ES LT"), misturando idioma e fluxo num
// campo só. Na Central isso vira `lang` (PT/ES) + `key` (BAU/LT), que é o que
// a coluna `lang` existe para carregar. O front remonta a chave combinada ao
// ler, então o comportamento não muda.
//
// Cada PASSO vira um item próprio (e não a lista inteira num blob), pra poder
// editar, reordenar e traduzir um passo isolado pela tela.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
    resolve(here, '../src/modules/call-script/call-script-data.js'),
    'utf8'
);

// Recorta um literal pelo nome, contando delimitadores. Regex sozinha não
// serve: os textos dos passos contêm chaves, colchetes e aspas.
function extractLiteral(name, open, close) {
    const start = source.indexOf(`const ${name} = ${open}`);
    if (start === -1) throw new Error(`Não encontrei ${name} em call-script-data.js`);

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

// O objeto referencia TAG_SUPPORT_STEPS_PT (a seção de Tag Support é
// compartilhada entre BAU e LT em PT), então essa const precisa existir no
// escopo do eval - senão o literal não resolve.
const tagSupportLiteral = extractLiteral('TAG_SUPPORT_STEPS_PT', '[', ']');
const dataLiteral = extractLiteral('csaChecklistData', '{', '}').replace(/^export\s+/, '');

// eslint-disable-next-line no-new-func
const csaChecklistData = new Function(
    `const TAG_SUPPORT_STEPS_PT = ${tagSupportLiteral};\nreturn (${dataLiteral});`
)();

const GROUPS = ['inicio', 'meio', 'fim'];
const items = [];
let order = 0;

for (const [combinedKey, groups] of Object.entries(csaChecklistData)) {
    const [lang, flow] = combinedKey.split(' ');

    for (const group of GROUPS) {
        const steps = groups[group];
        if (!steps) continue; // ES ainda não tem `meio` - ver nota abaixo.

        steps.forEach((text, idx) => {
            items.push({
                key: flow,        // BAU | LT
                field: group,     // inicio | meio | fim
                lang: lang,       // PT | ES
                label: text,      // o passo é o próprio conteúdo
                value: text,
                sortOrder: order++,
                _stepIndex: idx
            });
        });
    }
}

// A ausência de `meio` em ES é conteúdo que nunca chegou, não bug - está
// documentado no próprio call-script-data.js. Fica registrado aqui pra ser o
// primeiro uso real da Central: dá pra preencher pela tela, sem tocar em código.
const combos = Object.keys(csaChecklistData);
const semMeio = combos.filter(k => !csaChecklistData[k].meio);

// `_stepIndex` era só para conferência; não vai para a planilha.
const clean = items.map(({ _stepIndex, ...rest }) => rest);
const payload = { module: 'call_script', items: clean };

writeFileSync(
    resolve(here, '../gas-backend/seeds/call-script-seed.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:call-script (lê o csaChecklistData de
// src/modules/call-script/call-script-data.js)
//
// Semeia o módulo "call_script" da Central de Conteúdo com o roteiro que hoje
// está embutido no bundle do agente. É migração de conteúdo que já está em
// produção, não mudança nova - por isso publica direto, sem passar pela fila.
//
// COMO RODAR: no editor do Apps Script, escolha "seedCallScriptNow" no seletor
// de função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar, então não há risco de duplicar.

const CONTENT_SEED_CALL_SCRIPT = ${JSON.stringify(payload, null, 2)};

function seedCallScriptNow() {
  const result = seedContentModule(CONTENT_SEED_CALL_SCRIPT);
  Logger.log(result);
  return result;
}
`;

writeFileSync(resolve(here, '../gas-backend/ContentSeed_CallScript.js'), gasFile);

process.stdout.write(
    `${clean.length} passos em ${combos.length} roteiros (${combos.join(', ')})\n` +
    (semMeio.length
        ? `Sem a seção "meio" (Tag Support), a preencher pela Central: ${semMeio.join(', ')}\n`
        : '') +
    'Gerados: gas-backend/seeds/call-script-seed.json e gas-backend/ContentSeed_CallScript.js\n'
);
