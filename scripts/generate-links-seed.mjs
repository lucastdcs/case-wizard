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
// Escreve dois arquivos, ambos versionados:
//   - gas-backend/seeds/links-seed.json  (para inspecionar o conteúdo)
//   - gas-backend/ContentSeed_Links.js   (o que realmente roda)
//
// Não é preciso copiar nada à mão: o .gs sobe junto com o resto do backend no
// deploy, e a semeadura é feita escolhendo a função `seedLinksNow` no editor do
// Apps Script e clicando em Executar. O botão Run só aceita funções sem
// argumentos, e é por isso que existe esse wrapper em vez de chamar
// seedContentModule(payload) direto.
//
// Rode este script apenas para regerar os arquivos depois de mexer no LINKS_DB:
//   npm run seed:links

import { readFileSync, writeFileSync } from 'node:fs';
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
const payload = { module: 'links', items };

// 1) JSON, para inspecionar o conteúdo pelo GitHub sem precisar de checkout.
writeFileSync(
    resolve(here, '../gas-backend/seeds/links-seed.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

// 2) Arquivo .gs com uma função SEM ARGUMENTOS. É o que torna a semeadura
// executável de verdade: o botão Run do editor do Apps Script só lista e roda
// funções sem parâmetros, então não há como passar o JSON na mão por lá.
const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:links (lê o LINKS_DB de src/modules/links/links-assistant.js)
//
// Semeia o módulo "links" da Central de Conteúdo com a lista que hoje está
// embutida no bundle do agente. É migração de conteúdo que já está em produção,
// não mudança nova - por isso publica direto, sem passar pela fila de revisão.
//
// COMO RODAR: no editor do Apps Script, escolha "seedLinksNow" no seletor de
// função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar, então não há risco de duplicar.

const CONTENT_SEED_LINKS = ${JSON.stringify(payload, null, 2)};

function seedLinksNow() {
  const result = seedContentModule(CONTENT_SEED_LINKS);
  Logger.log(result);
  return result;
}
`;

writeFileSync(resolve(here, '../gas-backend/ContentSeed_Links.js'), gasFile);

process.stdout.write(
    `${items.length} links em ${Object.keys(LINKS_DB).length} categorias` +
    (missingEs ? ` · ${missingEs} sem tradução ES` : '') + '\n' +
    'Gerados: gas-backend/seeds/links-seed.json e gas-backend/ContentSeed_Links.js\n'
);
