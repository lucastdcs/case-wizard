// scripts/test-dash-changelog.mjs
//
// Guarda de sincronia das notas de versão dos dashboards
// (gas-backend/DashReleaseNotes.js).
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O Apps Script não lê o CHANGELOG.md em tempo de execução, então as notas que o
// TL vê são escritas à mão num arquivo separado. Isso tem um modo de falha
// conhecido e já vivido no bookmarklet, entre a v5.1 e a v5.2: a versão sobe, as
// notas ficam, e o modal aparece com o selo da versão NOVA anunciando as
// novidades da versão VELHA. O changelog-wizard.js ganhou um aviso em console
// por causa disso; aqui a guarda falha o teste, que é melhor — ninguém lê o
// console do iframe do Apps Script.
//
// O que precisa estar provado antes de subir:
//   - a versão das notas é a mesma do package.json;
//   - as notas têm conteúdo (um modal vazio é pior que nenhum modal);
//   - cada item tem ícone, título e texto — o render conta com os três;
//   - o TLDashboard.html consome a tag que o renderDashboard() injeta, e o
//     renderDashboard() de fato a define (é um contrato entre dois arquivos, e
//     quebrá-lo deixa a página com `<?!= ... ?>` literal na tela).
//
// Uso: npm run test:dash-changelog

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (rel) => readFileSync(resolve(raiz, rel), 'utf8');

let fail = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    if (String(atual) !== String(esperado)) throw new Error(`${oque}: esperado ${esperado}, veio ${atual}`);
}
function verdade(cond, oque) { if (!cond) throw new Error(oque); }

const ctx = {};
vm.createContext(ctx);
vm.runInContext(ler('gas-backend/DashReleaseNotes.js') + '\n;globalThis.__notas = CW_DASH_RELEASE_NOTES;', ctx);
const notas = ctx.__notas;

const pkg = JSON.parse(ler('package.json'));
const dashboard = ler('gas-backend/TLDashboard.html');
const codigo = ler('gas-backend/Código.js');

console.log('\n--- Notas de versão dos dashboards ---\n');

check('a versão das notas é a mesma do package.json', () => {
    igual(notas.version, pkg.version,
        'CW_DASH_RELEASE_NOTES.version x package.json. Ao subir a versão, os dois sobem juntos');
});

check('as notas têm título e pelo menos um item', () => {
    verdade(notas.title && notas.title.trim(), 'título vazio');
    verdade(Array.isArray(notas.items) && notas.items.length > 0,
        'nenhum item — um modal vazio é pior que nenhum modal');
});

check('todo item tem ícone, título e texto', () => {
    notas.items.forEach((item, i) => {
        ['icon', 'title', 'text'].forEach((campo) => {
            verdade(item[campo] && String(item[campo]).trim(),
                `item ${i}: campo "${campo}" vazio — o render conta com os três`);
        });
    });
});

check('buildReleaseNotesJson() devolve JSON válido e igual à constante', () => {
    vm.runInContext('globalThis.__json = buildReleaseNotesJson();', ctx);
    igual(JSON.stringify(JSON.parse(ctx.__json)), JSON.stringify(notas), 'round-trip do JSON');
});

check('o contrato da tag de template fecha nos dois arquivos', () => {
    // Uma ponta sem a outra deixa `<?!= CW_RELEASE_NOTES ?>` literal na página
    // (ou um ReferenceError no boot), e nenhum teste de tela pegaria isso se os
    // dois lados fossem lidos do mesmo fixture.
    verdade(/<\?!=\s*CW_RELEASE_NOTES\s*\?>/.test(dashboard),
        'TLDashboard.html não consome a tag CW_RELEASE_NOTES');
    verdade(/template\.CW_RELEASE_NOTES\s*=/.test(codigo),
        'renderDashboard() não define template.CW_RELEASE_NOTES');
});

console.log(fail === 0 ? '\n✅ Notas de versão: em dia.\n' : `\n❌ ${fail} falha(s).\n`);
process.exit(fail === 0 ? 0 : 1);
