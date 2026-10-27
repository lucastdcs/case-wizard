// scripts/build-precall-standalone.mjs
//
// Build avulso do Pre-call Checklist (ADR-0020): um arquivo só, com a raspagem e
// o formulário, para entregar a quem não usa o app completo.
//
// Saída em dist/:
//   precall-standalone.js    legível, para ler e para colar no console
//   precall-bookmarklet.txt  minificado, numa linha `javascript:...`, para colar
//                            como URL de um favorito
//
// Uso: npm run build:precall

import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const saida = resolve(raiz, 'dist');

// O data-service tem efeito colateral no topo (um console.log) e carrega os IDs
// de implantação do Apps Script, então o esbuild não o poda mesmo sem uso — e o
// page-data importa dele. O Pre-call não fala com o backend: o arquivo que sai
// daqui não pode levar o endereço dele nem fazer chamada nenhuma. Se um dia o
// grafo do Pre-call passar a importar outro export, o build falha em vez de
// seguir com um undefined.
const semBackend = {
    name: 'sem-backend',
    setup(b) {
        b.onResolve({ filter: /data-service\.js$/ }, () => ({ path: 'data-service', namespace: 'sem-backend' }));
        b.onLoad({ filter: /.*/, namespace: 'sem-backend' }, () => ({
            contents: 'export const fetchUserProfile = async () => null;',
            loader: 'js',
        }));
    },
};

const comum = {
    entryPoints: [resolve(raiz, 'src/precall-standalone.js')],
    bundle: true,
    format: 'iife',
    write: false,
    logLevel: 'warning',
    plugins: [semBackend],
};

const BANNER = `/*
 * Case Wizard — Pre-call Checklist (build avulso). Gerado por \`npm run build:precall\`; não edite.
 *
 * Como usar, na tela de um caso do CRM:
 *   - favorito: crie um favorito e cole o conteúdo de precall-bookmarklet.txt como URL; ou
 *   - console:  cole este arquivo inteiro no console do navegador e dê Enter.
 * O formulário abre já preenchido com o que a tela do caso informa. Fechou? Clique no
 * favorito de novo; com o formulário aberto, o clique relê o caso que está na tela.
 */
`;

const [legivel, minificado] = await Promise.all([
    build({ ...comum, banner: { js: BANNER } }),
    build({ ...comum, minify: true }),
]);

// Num favorito `javascript:` o navegador percent-decodifica a URL antes de
// executar, descarta tudo depois de um `#` (fragmento) e apaga tabs e quebras de
// linha. Sem escapar esses quatro, o código quebra sem erro nenhum: o CSS tem
// `%` e `#` de sobra, e os template literals têm quebras de linha. Escapar só
// eles (em vez de `encodeURIComponent`) mantém o favorito em ~77 KB, e não ~112.
const bookmarklet = 'javascript:' + minificado.outputFiles[0].text.trim()
    .replace(/[%#\n\r\t]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'));

await mkdir(saida, { recursive: true });
await writeFile(resolve(saida, 'precall-standalone.js'), legivel.outputFiles[0].text);
await writeFile(resolve(saida, 'precall-bookmarklet.txt'), bookmarklet + '\n');

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`dist/precall-standalone.js    ${kb(legivel.outputFiles[0].text.length)}`);
console.log(`dist/precall-bookmarklet.txt  ${kb(bookmarklet.length)}`);
