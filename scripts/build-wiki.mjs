#!/usr/bin/env node
//
// Gera as páginas da wiki do GitHub a partir de docs/media/CaseWizardTechDoc.gs
// — o mesmo arquivo que monta o documento técnico no Google Docs.
//
// Por que executar o .gs em vez de ler o texto dele: o arquivo é JavaScript ES5
// comum, e cada seção é uma função pura que só chama helpers de layout
// (h1_, para_, bullets_, table_, code_, callout_, specList_). Dá para carregá-lo
// num contexto de VM, **substituir esses helpers por emissores de Markdown** e
// deixar o próprio motor do JS resolver a concatenação de strings. Fazer isso por
// regex sobre o texto quebraria no primeiro `'a' + 'b'` multilinha — e o arquivo
// inteiro é feito disso.
//
// A consequência que importa: a wiki é **saída de build**, não uma segunda cópia
// do conteúdo. Quando o .gs for atualizado, roda-se isto de novo e as duas
// renderizações continuam dizendo a mesma coisa. Editar a wiki à mão pelo site
// do GitHub perde a alteração na próxima geração.
//
// Uso:
//   npm run wiki:build              → escreve em .wiki-build/
//   npm run wiki:build -- --out DIR → escreve em DIR
//
// Publicar é um passo separado e manual (a wiki é outro repositório git):
//   git -C <clone-da-wiki> add -A && git commit && git push

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEM = path.join(raiz, 'docs', 'media', 'CaseWizardTechDoc.gs');

const argOut = process.argv.indexOf('--out');
const SAIDA = argOut > -1 && process.argv[argOut + 1]
  ? path.resolve(process.argv[argOut + 1])
  : path.join(raiz, '.wiki-build');

// ------------------------------------------------------------------
// Emissores de Markdown
// ------------------------------------------------------------------

let buffer = [];
const texto = (v) => (v === null || v === undefined ? '' : String(v));

// Numa célula de tabela, `|` encerra a coluna e uma quebra de linha encerra a
// linha inteira — os dois precisam virar outra coisa antes de entrar na grade.
const celula = (v) => texto(v).replace(/\|/g, '\\|').replace(/\n+/g, ' ');

function emitir(md) { buffer.push(md); }

const HELPERS = {
  h1_: (_ctx, numero, titulo) => emitir(`# ${texto(numero)} · ${texto(titulo)}\n`),
  h2_: (_ctx, titulo) => emitir(`\n## ${texto(titulo)}\n`),
  h3_: (_ctx, titulo) => emitir(`\n### ${texto(titulo)}\n`),

  para_: (_ctx, t) => emitir(`${texto(t)}\n`),

  bullets_: (_ctx, itens, opts) => {
    const numerado = !!(opts && (opts.numbered || opts.ordered));
    emitir(
      (itens || [])
        .map((it, i) => (numerado ? `${i + 1}. ` : '- ') + texto(it))
        .join('\n') + '\n'
    );
  },

  code_: (_ctx, linhas, legenda) => {
    const corpo = Array.isArray(linhas) ? linhas.join('\n') : texto(linhas);
    emitir((legenda ? `*${texto(legenda)}*\n\n` : '') + '```\n' + corpo + '\n```\n');
  },

  // Blockquote com rótulo em negrito é o que mais se aproxima do callout do
  // Docs sem depender de HTML — a wiki do GitHub renderiza isso bem.
  callout_: (_ctx, rotulo, t) =>
    emitir(`> **${texto(rotulo)}**\n>\n> ${texto(t).replace(/\n/g, '\n> ')}\n`),

  specList_: (_ctx, pares) =>
    emitir((pares || []).map((p) => `- **${texto(p[0])}** — ${texto(p[1])}`).join('\n') + '\n'),

  table_: (_ctx, cabecalhos, linhas) => {
    const h = (cabecalhos || []).map(celula);
    emitir(`\n| ${h.join(' | ')} |`);
    emitir(`|${h.map(() => ' --- ').join('|')}|`);
    (linhas || []).forEach((r) => emitir(`| ${(r || []).map(celula).join(' | ')} |`));
    emitir('');
  },

  // Puramente visuais no Docs — não têm equivalente e não devem virar ruído.
  spacer_: () => {},
  colorBar_: () => {},
};

// ------------------------------------------------------------------
// Carga e execução
// ------------------------------------------------------------------

if (!fs.existsSync(ORIGEM)) {
  console.error(`ERRO: não encontrei ${path.relative(raiz, ORIGEM)}.`);
  console.error('Esse arquivo é a fonte do documento técnico e da wiki.');
  process.exit(1);
}

const fonte = fs.readFileSync(ORIGEM, 'utf8');

// Stubs mínimos: o .gs só toca nos serviços do Apps Script dentro de funções que
// nós não chamamos (buildTechDoc, onOpen, clearDocument). Estão aqui para o caso
// de alguma referência de topo aparecer numa edição futura.
const sandbox = vm.createContext({
  console,
  DocumentApp: { getUi: () => ({ alert() {}, createMenu: () => ({ addItem: () => ({ addToUi() {} }) }) }), getActiveDocument: () => ({}) },
  SpreadsheetApp: {},
  Utilities: {},
  Session: {},
});

try {
  vm.runInContext(fonte, sandbox);
} catch (e) {
  console.error('ERRO ao avaliar o .gs:', e.message);
  process.exit(1);
}

if (!Array.isArray(sandbox.SECTION_BUILDERS) || !sandbox.SECTION_BUILDERS.length) {
  console.error('ERRO: SECTION_BUILDERS não foi encontrado no .gs.');
  console.error('O gerador depende desse array — se ele foi renomeado, atualize este script.');
  process.exit(1);
}

// Troca os helpers pelos emissores **depois** da avaliação: as declarações de
// função do .gs viraram propriedades do contexto, então sobrescrevê-las aqui é o
// que faz as seções escreverem Markdown em vez de chamar o Google Docs.
for (const [nome, fn] of Object.entries(HELPERS)) {
  if (typeof sandbox[nome] !== 'function') {
    console.error(`ERRO: helper "${nome}" não existe no .gs — o gerador está dessincronizado da fonte.`);
    process.exit(1);
  }
  sandbox[nome] = fn;
}

// ------------------------------------------------------------------
// Geração
// ------------------------------------------------------------------

const semAcento = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '');

const paraSlug = (numero, titulo) =>
  `${numero}-` +
  semAcento(titulo)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

fs.rmSync(SAIDA, { recursive: true, force: true });
fs.mkdirSync(SAIDA, { recursive: true });

const paginas = [];

sandbox.SECTION_BUILDERS.forEach((construir, i) => {
  buffer = [];
  try {
    construir({});
  } catch (e) {
    console.error(`ERRO na seção de índice ${i}: ${e.message}`);
    process.exit(1);
  }

  const md = buffer.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';

  const cabecalho = md.match(/^#\s+(\S+)\s+·\s+(.+)$/m);
  if (!cabecalho) {
    console.error(`ERRO: a seção de índice ${i} não emitiu um h1 reconhecível.`);
    process.exit(1);
  }
  const [, numero, titulo] = cabecalho;
  const slug = paraSlug(numero, titulo);

  const rodape =
    `\n\n---\n\n` +
    `*Página gerada de \`docs/media/CaseWizardTechDoc.gs\` por \`npm run wiki:build\`. ` +
    `Edições feitas aqui pelo site do GitHub se perdem na próxima geração — ` +
    `altere o \`.gs\` e gere de novo.*\n`;

  fs.writeFileSync(path.join(SAIDA, `${slug}.md`), md + rodape, 'utf8');
  paginas.push({ numero, titulo, slug });
});

// --- Home ---------------------------------------------------------

const secoes = paginas.filter((p) => /^\d+$/.test(p.numero));
const apendices = paginas.filter((p) => !/^\d+$/.test(p.numero));

const linhaIndice = (p) => `| \`${p.numero}\` | [[${p.titulo}\|${p.slug}]] |`;

const home = `# Case Wizard — documentação técnica

Referência técnica do Case Wizard: uma *overlay application* injetada por
bookmarklet dentro do CRM Connect Cases, com backend serverless em Google Apps
Script sobre Google Sheets.

Estas páginas são **geradas** a partir de \`docs/media/CaseWizardTechDoc.gs\`, o
mesmo arquivo que monta a versão em Google Docs. As duas renderizações dizem a
mesma coisa por construção — não são cópias mantidas em paralelo.

> **Não edite estas páginas pelo site do GitHub.**
> Altere \`docs/media/CaseWizardTechDoc.gs\` no repositório e rode
> \`npm run wiki:build\`. Qualquer edição feita aqui se perde na próxima geração.

## Por onde começar

- Nunca viu o projeto: [[${secoes[0].titulo}|${secoes[0].slug}]] e depois [[${secoes[2].titulo}|${secoes[2].slug}]].
- Vai mexer no código: [[${secoes[5].titulo}|${secoes[5].slug}]] e [[${secoes[6].titulo}|${secoes[6].slug}]].
- Vai publicar: [[${secoes[19].titulo}|${secoes[19].slug}]] — e o \`RELEASE.md\` no repositório, que é o runbook operacional.
- Voltando depois de um tempo: [[${secoes[24].titulo}|${secoes[24].slug}]].

## Seções

| | |
| --- | --- |
${secoes.map(linhaIndice).join('\n')}

## Apêndices

| | |
| --- | --- |
${apendices.map(linhaIndice).join('\n')}

## O que vive no repositório, não aqui

Esta wiki é uma renderização de leitura. O que precisa andar junto com o código
mora no repositório e é revisado por PR:

| Conteúdo | Onde |
| --- | --- |
| Regras de negócio e contratos de dados | \`specs/\` — é a lei do projeto |
| Decisões arquiteturais e o porquê | \`docs/decisions/\` |
| Como publicar, ambientes, rollback | \`RELEASE.md\` |
| O que mudou em cada versão | \`CHANGELOG.md\` |
| Como contribuir | \`CONTRIBUTING.md\` |
| Convenções para agentes | \`CLAUDE.md\` |
`;

fs.writeFileSync(path.join(SAIDA, 'Home.md'), home, 'utf8');

// --- Sidebar ------------------------------------------------------

const sidebar = `### Case Wizard

[[Início|Home]]

**Seções**

${secoes.map((p) => `- [[${p.numero} · ${p.titulo}|${p.slug}]]`).join('\n')}

**Apêndices**

${apendices.map((p) => `- [[${p.numero} · ${p.titulo}|${p.slug}]]`).join('\n')}
`;

fs.writeFileSync(path.join(SAIDA, '_Sidebar.md'), sidebar, 'utf8');

// --- Footer -------------------------------------------------------

fs.writeFileSync(
  path.join(SAIDA, '_Footer.md'),
  `Gerado de \`docs/media/CaseWizardTechDoc.gs\` · ` +
  `[repositório](https://github.com/lucastdcs/case-wizard) · ` +
  `[issues](https://github.com/lucastdcs/case-wizard/issues)\n`,
  'utf8'
);

// ------------------------------------------------------------------

const total = fs.readdirSync(SAIDA).length;
console.log(`✓ ${total} páginas em ${path.relative(raiz, SAIDA)}/`);
console.log(`  ${secoes.length} seções, ${apendices.length} apêndices, mais Home, _Sidebar e _Footer.`);
console.log('');
console.log('Publicar (a wiki é outro repositório git):');
console.log('  git clone https://github.com/lucastdcs/case-wizard.wiki.git /tmp/cw-wiki');
console.log(`  cp ${path.relative(raiz, SAIDA)}/*.md /tmp/cw-wiki/`);
console.log('  git -C /tmp/cw-wiki add -A && git -C /tmp/cw-wiki commit -m "docs(wiki): regenera" && git -C /tmp/cw-wiki push');
