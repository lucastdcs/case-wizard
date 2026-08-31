/**
 * CASE WIZARD — GERADOR DE DOCUMENTAÇÃO TÉCNICA (Google Docs)
 * ============================================================
 * Companheiro do CaseWizardDeck.gs (que monta a apresentação).
 * Enquanto o deck é a visão de produto/uso, este arquivo monta o
 * documento de ENGENHARIA: arquitetura, contratos, fluxos de dados,
 * decisões e trade-offs — escrito para outro profissional técnico
 * conseguir entender como o projeto foi construído sem falar com
 * ninguém.
 *
 * Setup (uma vez só):
 *   1. Crie um Google Docs EM BRANCO.
 *   2. Extensões > Apps Script, apague o conteúdo do Código.gs e cole
 *      este arquivo inteiro.
 *   3. Salve, volte ao documento e recarregue a página — vai aparecer
 *      um menu "Case Wizard".
 *   4. Rode "Case Wizard > Montar documentação (do zero)". Na primeira
 *      execução o Google pede autorização (acesso ao próprio documento)
 *      — normal, é o script rodando com a sua conta.
 *
 * Rodar de novo é seguro: a função limpa o corpo, o cabeçalho e o
 * rodapé antes de reconstruir, então dá para ajustar texto/cores aqui
 * e rodar quantas vezes quiser.
 *
 * O documento sai com estilos de Título/Cabeçalho reais (HEADING1..3),
 * então o painel "Resumo / Estrutura do documento" do Docs funciona
 * como índice navegável automaticamente.
 *
 * TEMPO DE EXECUÇÃO: a montagem completa são 25 seções, ~230 tabelas e
 * ~700 parágrafos, o que dá cerca de 4.400 chamadas ao DocumentApp —
 * normalmente 1 a 2 minutos, dentro do limite de 6 minutos do Apps
 * Script. Se você acrescentar muito conteúdo e começar a bater no
 * limite, leia o comentário sobre setAttributes na seção 4: o custo
 * está no NÚMERO de chamadas, não no volume de texto.
 *
 * NOTA SOBRE ACENTOS: comentários e strings usam acentuação normal.
 * Se o seu editor do Apps Script reclamar de encoding ao colar, salve
 * o arquivo como UTF-8 antes de copiar.
 */

// ============================================================
// 1. IDENTIFICAÇÃO DO DOCUMENTO
// ============================================================

var DOC = {
  TITLE: 'Case Wizard — Documentação Técnica',
  SUBTITLE: 'TechSol Operations Assistant: arquitetura, contratos de dados e decisões de engenharia de uma aplicação de sobreposição sem servidor próprio',
  AUTHOR: 'Lucas Teixeira Di Cesare Santos (lucaste)',
  // O repositório foi renomeado em 2026-08-21 (ADR 0003, e seção 21 deste
  // documento). O nome antigo, techsol_DialIn_AutoCopy, só aparece daqui
  // pra frente quando o assunto É o rename — em nenhum outro lugar.
  REPO: 'github.com/lucastdcs/case-wizard',
  // Precisa acompanhar o APP_VERSION de src/app.js — aparece na capa e no
  // cabeçalho de todas as páginas deste documento.
  APP_VERSION: 'v6.0',
  API_VERSION: 'TechSol Backend API v6.0',
  AUDIENCE: 'Engenheiros, TLs técnicos e quem for assumir a manutenção do projeto',
};

// ============================================================
// 2. TEMA — mesmos tokens do deck e do próprio produto
// ============================================================

var COLOR = {
  bg: '#FFFFFF',
  bgAlt: '#F8F9FA',
  surface2: '#F1F3F4',
  ink: '#202124',
  inkSoft: '#5F6368',
  inkFaint: '#80868B',
  border: '#DADCE0',
  dark: '#3D3D3D',

  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',

  modBlue: '#8AB4F8',
  modRed: '#F28B82',
  modPurple: '#C58AF9',
  modGreen: '#81C995',
  modOrange: '#F9AB00',
  modTeal: '#00BFA5',
  modPink: '#F48FB1',
  modGray: '#9AA0A6',
};

// "Google Sans" é a fonte real do produto, mas é interna do Google: em
// contas sem acesso a ela o Docs cai num fallback silencioso. Roboto é a
// outra fonte oficial do produto e está sempre disponível.
var FONT = 'Roboto';
var CODE_FONT = 'Courier New';

var SIZE = {
  body: 10.5,
  small: 9,
  tiny: 8,
  h1: 18,
  h2: 14,
  h3: 11.5,
  code: 8,
};

function monthYearPtBr_() {
  var MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var d = new Date();
  return MESES[d.getMonth()] + ' de ' + d.getFullYear();
}

// ============================================================
// 3. ENTRADA — menu e funções que você roda
// ============================================================

function onOpen() {
  DocumentApp.getUi()
    .createMenu('Case Wizard')
    .addItem('Montar documentação (do zero)', 'buildTechDoc')
    .addItem('Só limpar o documento', 'clearDocument')
    .addToUi();
}

function buildTechDoc() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  resetDocument_(doc, body);
  setupPage_(body);

  var ctx = { doc: doc, body: body, width: Math.round(contentWidth_(body)) };

  buildHeaderAndFooter_(ctx);

  addCoverPage_(ctx);
  addHowToReadPage_(ctx);
  addIndexPage_(ctx);

  SECTION_BUILDERS.forEach(function (fn) { fn(ctx); });

  cleanupLeadingBlank_(body);
  doc.setName(DOC.TITLE);

  DocumentApp.getUi().alert(
    'Pronto! ' + SECTION_BUILDERS.length + ' seções montadas.\n\n' +
    'Dica: abra Ver > Mostrar estrutura do documento para navegar pelos títulos.');
}

function clearDocument() {
  var doc = DocumentApp.getActiveDocument();
  resetDocument_(doc, doc.getBody());
  DocumentApp.getUi().alert('Documento limpo.');
}

// ============================================================
// 4. SETUP DE PÁGINA E HELPERS DE BAIXO NÍVEL
// ============================================================

function resetDocument_(doc, body) {
  body.clear();
  var header = doc.getHeader();
  if (header) header.clear();
  var footer = doc.getFooter();
  if (footer) footer.clear();
}

function setupPage_(body) {
  body.setMarginTop(48).setMarginBottom(48).setMarginLeft(56).setMarginRight(56);
}

function contentWidth_(body) {
  return body.getPageWidth() - body.getMarginLeft() - body.getMarginRight();
}

// IMPORTANTE PARA PERFORMANCE: cada chamada a uma API do DocumentApp
// atravessa a fronteira do serviço e custa caro. Um documento deste tamanho
// tem centenas de tabelas, e fazer setPaddingTop/Bottom/Left/Right +
// setBackgroundColor + setSpacingBefore/After separadamente multiplicaria
// as chamadas por cinco, chegando perto do limite de 6 minutos de execução.
// Por isso TUDO que puder virar atributo é acumulado num mapa e aplicado
// numa única chamada a setAttributes().

// Atributos de texto e de parágrafo (fonte, cor, espaçamento, alinhamento).
function attrs_(o) {
  o = o || {};
  var A = DocumentApp.Attribute;
  var a = {};
  a[A.FONT_FAMILY] = o.font || FONT;
  a[A.FONT_SIZE] = o.size || SIZE.body;
  a[A.FOREGROUND_COLOR] = o.color || COLOR.ink;
  a[A.BOLD] = !!o.bold;
  a[A.ITALIC] = !!o.italic;
  if (o.bg) a[A.BACKGROUND_COLOR] = o.bg;
  if (o.spaceBefore != null) a[A.SPACING_BEFORE] = o.spaceBefore;
  if (o.spaceAfter != null) a[A.SPACING_AFTER] = o.spaceAfter;
  if (o.lineSpacing != null) a[A.LINE_SPACING] = o.lineSpacing;
  if (o.align) a[A.HORIZONTAL_ALIGNMENT] = o.align;
  return a;
}

function codeAttrs_() {
  return attrs_({
    font: CODE_FONT, size: SIZE.code, color: '#E8EAED',
    lineSpacing: 1.15, spaceBefore: 0, spaceAfter: 0,
  });
}

// Atributos de célula: preenchimento e fundo numa chamada só.
// pad aceita 1 valor (todos os lados) ou 4 (topo, direita, baixo, esquerda).
function cellAttrs_(pad, bg) {
  var A = DocumentApp.Attribute;
  var p = Array.isArray(pad) ? pad : [pad, pad, pad, pad];
  var a = {};
  a[A.PADDING_TOP] = p[0];
  a[A.PADDING_RIGHT] = p[1];
  a[A.PADDING_BOTTOM] = p[2];
  a[A.PADDING_LEFT] = p[3];
  if (bg) a[A.BACKGROUND_COLOR] = bg;
  return a;
}

// Aplica estilo a uma célula e devolve o primeiro parágrafo dela, já pronto
// para receber texto — o par de chamadas mais repetido do arquivo.
//
// CUIDADO AO ENCADEAR: Paragraph.setText() retorna VOID no DocumentApp
// (diferente de Text.setText(), que devolve o próprio Text). Então
//     styleCell_(...).setText('x').setAttributes(...)   // TypeError: null
// quebra. Guarde o parágrafo numa variável e chame setText e setAttributes
// como instruções separadas. setAttributes e setHeading, esses sim,
// devolvem o parágrafo e podem ser encadeados à vontade.
function styleCell_(cell, pad, bg) {
  cell.setAttributes(cellAttrs_(pad, bg));
  return cell.getChild(0).asParagraph();
}

// Parágrafo comum. O heading é aplicado ANTES dos atributos, senão o
// estilo nomeado do Docs sobrescreveria fonte/tamanho/cor.
function para_(ctx, text, opts) {
  opts = opts || {};
  var p = ctx.body.appendParagraph(text || '');
  if (opts.heading) p.setHeading(opts.heading);
  p.setAttributes(attrs_({
    font: opts.font, size: opts.size, color: opts.color,
    bold: opts.bold, italic: opts.italic, bg: opts.bg,
    align: opts.align, lineSpacing: opts.lineSpacing,
    spaceBefore: opts.spaceBefore != null ? opts.spaceBefore : 4,
    spaceAfter: opts.spaceAfter != null ? opts.spaceAfter : 6,
  }));
  return p;
}

function spacer_(ctx, points) {
  return ctx.body.appendParagraph('').setAttributes(
    attrs_({ size: points || 6, spaceBefore: 0, spaceAfter: 0 }));
}

function h1_(ctx, number, title, accent) {
  ctx.body.appendPageBreak();

  var t = ctx.body.appendTable([['']]);
  t.setBorderWidth(0);

  var p = styleCell_(t.getCell(0, 0), [16, 18, 16, 18], COLOR.dark);
  p.setText(number + '   ' + title);
  p.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  p.setAttributes(attrs_({
    size: SIZE.h1, bold: true, color: '#FFFFFF', spaceBefore: 0, spaceAfter: 0,
  }));
  p.editAsText().setForegroundColor(0, number.length - 1, accent);

  colorBar_(ctx, accent);
  spacer_(ctx, 8);
}

function h2_(ctx, title, accent) {
  var p = ctx.body.appendParagraph(title);
  p.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  p.setAttributes(attrs_({
    size: SIZE.h2, bold: true, color: COLOR.ink, spaceBefore: 16, spaceAfter: 2,
  }));

  var bar = ctx.body.appendTable([['']]);
  bar.setBorderWidth(0);
  styleCell_(bar.getCell(0, 0), 0, accent || COLOR.blue)
    .setAttributes(attrs_({ size: 1, spaceBefore: 0, spaceAfter: 0 }));
  bar.setColumnWidth(0, 48);
  bar.getRow(0).setMinimumHeight(3);
  spacer_(ctx, 6);
  return p;
}

function h3_(ctx, title) {
  var p = ctx.body.appendParagraph(title);
  p.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  p.setAttributes(attrs_({
    size: SIZE.h3, bold: true, color: COLOR.inkSoft, spaceBefore: 12, spaceAfter: 2,
  }));
  return p;
}

function colorBar_(ctx, singleColor) {
  var colors = singleColor
    ? [singleColor, singleColor, singleColor, singleColor]
    : [COLOR.blue, COLOR.red, COLOR.yellow, COLOR.green];
  var t = ctx.body.appendTable([['', '', '', '']]);
  t.setBorderWidth(0);
  var thin = attrs_({ size: 1, spaceBefore: 0, spaceAfter: 0 });
  for (var i = 0; i < 4; i++) {
    styleCell_(t.getCell(0, i), 0, colors[i]).setAttributes(thin);
    t.setColumnWidth(i, Math.round(ctx.width / 4));
  }
  t.getRow(0).setMinimumHeight(4);
  return t;
}

function bullets_(ctx, items, opts) {
  opts = opts || {};
  var glyph = opts.numbered ? DocumentApp.GlyphType.NUMBER : DocumentApp.GlyphType.BULLET;
  var style = attrs_({
    size: opts.size || SIZE.body, color: opts.color || COLOR.ink,
    spaceBefore: 2, spaceAfter: 2,
  });
  items.forEach(function (text) {
    ctx.body.appendListItem(text)
      .setGlyphType(glyph)
      .setNestingLevel(opts.level || 0)
      .setAttributes(style);
  });
  spacer_(ctx, 4);
}

// Bloco de código / diagrama ASCII: tabela 1x1 com fundo escuro e fonte
// monoespaçada. Cada linha vira um parágrafo próprio para o Docs não
// quebrar o alinhamento do diagrama.
function code_(ctx, lines, caption) {
  var arr = Array.isArray(lines) ? lines : String(lines).split('\n');
  var t = ctx.body.appendTable([['']]);
  t.setBorderWidth(0);

  var cell = t.getCell(0, 0);
  var style = codeAttrs_();

  var first = styleCell_(cell, [12, 14, 12, 14], COLOR.dark);
  first.setText(arr[0] || '');
  first.setAttributes(style);

  for (var i = 1; i < arr.length; i++) {
    cell.appendParagraph(arr[i]).setAttributes(style);
  }

  if (caption) {
    ctx.body.appendParagraph(caption).setAttributes(attrs_({
      size: SIZE.tiny, color: COLOR.inkFaint, italic: true,
      spaceBefore: 3, spaceAfter: 10,
    }));
  } else {
    spacer_(ctx, 8);
  }
  return t;
}

// Caixa de destaque: faixa de 4pt na cor de acento + corpo cinza claro.
function callout_(ctx, label, text, accent) {
  accent = accent || COLOR.blue;
  var t = ctx.body.appendTable([['', '']]);
  t.setBorderWidth(0);
  t.setColumnWidth(0, 4);
  t.setColumnWidth(1, Math.round(ctx.width - 4));

  styleCell_(t.getCell(0, 0), 0, accent)
    .setAttributes(attrs_({ size: 1, spaceBefore: 0, spaceAfter: 0 }));

  var cell = t.getCell(0, 1);
  var head = styleCell_(cell, [10, 14, 10, 14], COLOR.bgAlt);
  head.setText(String(label).toUpperCase());
  head.setAttributes(attrs_({
    size: SIZE.tiny, bold: true, color: accent, spaceBefore: 0, spaceAfter: 3,
  }));

  cell.appendParagraph(text).setAttributes(attrs_({
    size: SIZE.small, color: COLOR.ink, spaceBefore: 0, spaceAfter: 0,
  }));

  spacer_(ctx, 8);
  return t;
}

// Tabela de dados com cabeçalho colorido e zebra nas linhas.
// widths: array de frações (soma 1) ou null para colunas iguais.
// opts.monoCols: índices de colunas que devem sair em fonte monoespaçada.
function table_(ctx, headers, rows, accent, widths, opts) {
  accent = accent || COLOR.blue;
  opts = opts || {};
  var data = [headers].concat(rows);
  var t = ctx.body.appendTable(data);
  t.setBorderWidth(0.5);
  t.setBorderColor(COLOR.border);

  for (var col = 0; col < headers.length; col++) {
    var w = widths ? ctx.width * widths[col] : ctx.width / headers.length;
    t.setColumnWidth(col, Math.max(30, Math.round(w)));
  }

  // Estilos pré-calculados fora do laço: são os mesmos para toda a tabela,
  // e montar o mapa uma vez por célula seria desperdício puro.
  var headStyle = attrs_({
    size: SIZE.tiny, bold: true, color: '#FFFFFF', spaceBefore: 0, spaceAfter: 0,
  });
  var textStyle = attrs_({
    size: SIZE.small, color: COLOR.ink, font: FONT, spaceBefore: 0, spaceAfter: 0,
  });
  var monoStyle = attrs_({
    size: SIZE.small, color: COLOR.ink, font: CODE_FONT, spaceBefore: 0, spaceAfter: 0,
  });
  var pad = [6, 8, 6, 8];

  for (var r = 0; r < data.length; r++) {
    var bg = r === 0 ? accent : (r % 2 === 0 ? COLOR.bgAlt : COLOR.bg);
    for (var c = 0; c < headers.length; c++) {
      var mono = opts.monoCols && opts.monoCols.indexOf(c) !== -1;
      styleCell_(t.getCell(r, c), pad, bg)
        .setAttributes(r === 0 ? headStyle : (mono ? monoStyle : textStyle));
    }
  }
  spacer_(ctx, 10);
  return t;
}

// Linha de "ficha técnica": rótulo à esquerda, valor à direita, sem bordas.
function specList_(ctx, pairs, accent) {
  var rows = pairs.map(function (p) { return [p[0], p[1]]; });
  var t = ctx.body.appendTable(rows);
  t.setBorderWidth(0);
  t.setColumnWidth(0, Math.round(ctx.width * 0.28));
  t.setColumnWidth(1, Math.round(ctx.width * 0.72));
  var labelStyle = attrs_({
    size: SIZE.small, bold: true, color: accent || COLOR.inkSoft,
    spaceBefore: 0, spaceAfter: 0,
  });
  var valueStyle = attrs_({
    size: SIZE.small, color: COLOR.ink, spaceBefore: 0, spaceAfter: 0,
  });

  for (var r = 0; r < rows.length; r++) {
    styleCell_(t.getCell(r, 0), [5, 10, 5, 0]).setAttributes(labelStyle);
    styleCell_(t.getCell(r, 1), [5, 0, 5, 0]).setAttributes(valueStyle);
  }
  spacer_(ctx, 8);
  return t;
}

function buildHeaderAndFooter_(ctx) {
  var header = ctx.doc.getHeader() || ctx.doc.addHeader();
  header.appendParagraph(DOC.TITLE + '  ·  ' + DOC.APP_VERSION)
    .setAttributes(attrs_({
      size: SIZE.tiny, color: COLOR.inkFaint,
      align: DocumentApp.HorizontalAlignment.RIGHT,
    }));

  var footer = ctx.doc.getFooter() || ctx.doc.addFooter();
  footer.appendParagraph(
    'Case Wizard · TechSol Operations Assistant · ' + monthYearPtBr_() +
    '  —  documento gerado por script (CaseWizardTechDoc.gs)')
    .setAttributes(attrs_({
      size: SIZE.tiny, color: COLOR.inkFaint,
      align: DocumentApp.HorizontalAlignment.CENTER,
    }));
}

// body.clear() deixa um parágrafo vazio no topo; removemos só no fim,
// quando já existe outro conteúdo (o corpo não pode ficar sem filhos).
function cleanupLeadingBlank_(body) {
  if (body.getNumChildren() < 2) return;
  var first = body.getChild(0);
  if (first.getType() === DocumentApp.ElementType.PARAGRAPH &&
      first.asParagraph().getText() === '') {
    first.removeFromParent();
  }
}

// ============================================================
// 5. PÁGINAS DE ABERTURA
// ============================================================

function addCoverPage_(ctx) {
  spacer_(ctx, 60);
  colorBar_(ctx);
  spacer_(ctx, 18);

  para_(ctx, 'DOCUMENTAÇÃO TÉCNICA', {
    size: 10, bold: true, color: COLOR.blue, spaceAfter: 10,
  });

  para_(ctx, DOC.TITLE, {
    size: 30, bold: true, color: COLOR.ink, spaceAfter: 12, lineSpacing: 1.1,
  });

  para_(ctx, DOC.SUBTITLE, {
    size: 12.5, color: COLOR.inkSoft, spaceAfter: 28, lineSpacing: 1.3,
  });

  specList_(ctx, [
    ['Autor', DOC.AUTHOR],
    ['Público-alvo', DOC.AUDIENCE],
    ['Versão do app', DOC.APP_VERSION + ' (constante APP_VERSION em src/app.js)'],
    ['Versão do backend', DOC.API_VERSION + ' (cabeçalho de gas-backend/Código.js)'],
    ['Repositório', DOC.REPO],
    ['Data desta geração', monthYearPtBr_()],
  ], COLOR.blue);

  spacer_(ctx, 18);
  callout_(ctx, 'Escopo deste documento',
    'Este é o documento de engenharia. Ele descreve COMO o Case Wizard funciona por dentro: ' +
    'o mecanismo de injeção, a sequência de boot, o transporte de dados, o backend serverless, ' +
    'o modelo de dados em planilha, o modelo de permissão e o pipeline de deploy. ' +
    'A visão de produto (para que serve cada módulo, como o agente usa) está na apresentação ' +
    'gerada por CaseWizardDeck.gs, e não é repetida aqui.', COLOR.blue);
}

function addHowToReadPage_(ctx) {
  ctx.body.appendPageBreak();
  h2_(ctx, 'Como ler este documento', COLOR.blue);

  para_(ctx, 'O documento é linear, mas as seções foram escritas para funcionarem também como ' +
    'consulta isolada. Se você só precisa de uma coisa específica, use o painel de estrutura do ' +
    'Docs (Ver > Mostrar estrutura do documento) — todos os títulos são estilos reais de cabeçalho.',
    { spaceAfter: 12 });

  h3_(ctx, 'Convenções visuais');
  table_(ctx, ['Elemento', 'Significado'], [
    ['Bloco escuro monoespaçado', 'Código real do repositório, diagrama ASCII ou trecho de payload. Copiado do fonte, não reescrito para o documento.'],
    ['Caixa cinza com faixa colorida', 'Nota de contexto: uma decisão de projeto, um alerta de manutenção ou uma armadilha conhecida.'],
    ['Tabela com cabeçalho colorido', 'Contrato: catálogo de operações, mapa de colunas, matriz de estados. É a parte que precisa bater com o código.'],
    ['Faixa de quatro cores', 'Separador de seção. Puramente visual — mesmas quatro cores de marca usadas no produto.'],
  ], COLOR.blue, [0.32, 0.68]);

  h3_(ctx, 'Precedência das fontes');
  para_(ctx, 'Quando este documento e o repositório divergirem, o repositório vence. Dentro do ' +
    'repositório, a ordem de autoridade é: (1) o código em src/ e gas-backend/, (2) a pasta specs/, ' +
    'que é declarada como "lei absoluta do projeto" no _MASTER_RULEBOOK.md, (3) a pasta docs/, que ' +
    'guarda visão geral e histórico de decisões, e (4) este documento, que é uma consolidação ' +
    'datada dos três anteriores.', { spaceAfter: 10 });

  callout_(ctx, 'Aviso de validade',
    'Este documento foi gerado a partir de uma leitura do repositório em ' + monthYearPtBr_() + '. ' +
    'IDs de implantação, limiares de alerta e nomes de aba de planilha são valores reais e mudam ' +
    'com o tempo. Antes de agir sobre um valor específico, confirme no arquivo citado — cada ' +
    'afirmação deste documento nomeia o arquivo de onde veio.', COLOR.yellow);
}

function addIndexPage_(ctx) {
  ctx.body.appendPageBreak();
  h2_(ctx, 'Índice', COLOR.red);

  var rows = INDEX_ROWS.map(function (r) { return [r[0], r[1], r[2]]; });
  table_(ctx, ['#', 'Seção', 'O que você encontra'], rows, COLOR.dark, [0.06, 0.30, 0.64]);
}

var INDEX_ROWS = [
  ['01', 'Panorama e problema técnico', 'O que o sistema é, em que ambiente roda e qual restrição gerou cada decisão.'],
  ['02', 'Restrições do ambiente', 'CSP, Trusted Types, ausência de servidor, domínio Workspace, DOM de terceiro.'],
  ['03', 'Arquitetura macro', 'Diagrama das quatro camadas e responsabilidade de cada uma.'],
  ['04', 'Mecanismo de injeção', 'O bookmarklet linha a linha: política de Trusted Types, cache busting, idempotência.'],
  ['05', 'Sequência de boot', 'A ordem exata de inicialização em src/app.js e por que ela é essa.'],
  ['06', 'Organização do código-fonte', 'Árvore de src/, convenção de nomes e o contrato initX/toggleX.'],
  ['07', 'Camada compartilhada', 'data-service, page-data, dom-utils, animations, header-factory, sound-manager e afins.'],
  ['08', 'Integração com o DOM do CRM', 'Scraping defensivo, XPath, execCommand, setters nativos e o rascunho fantasma.'],
  ['09', 'Transporte JSONP', 'Por que não fetch, anatomia da chamada, watchdog de 15s e as consequências do GET.'],
  ['10', 'Backend: roteador e operações', 'doGet, o catálogo de op=, o duplo formato de saída e os pontos de entrada alternativos.'],
  ['11', 'Backend: modelo de dados', 'As dez abas da planilha, o mapa de colunas do BAU e a regra anti-apagamento.'],
  ['12', 'Ciclo de vida do caso BAU', 'A máquina de estados, quem pode transicionar o quê e as regras de fila.'],
  ['13', 'Motor de e-mails dinâmicos', 'Template único com placeholders, despacho por tipo de evento e cálculo de urgência.'],
  ['14', 'TL Dashboard', 'A segunda aplicação: HtmlService, google.script.run e por que ela não usa a API JSONP.'],
  ['15', 'Central de Conteúdo', 'A terceira aplicação: conteúdo editável sem deploy, com proposta, aprovação, versionamento e papéis por módulo.'],
  ['16', 'Segurança e permissões', 'Identidade real vs. declarada, a planilha People, isOverhead e o fallback restritivo.'],
  ['17', 'Concorrência e automações', 'LockService, gatilhos de tempo, alerta de volume e backup semanal.'],
  ['18', 'Resiliência e degradação', 'Cache-first, rascunhos de emergência, watchdogs e falha silenciosa.'],
  ['19', 'Design system e UI', 'Glassmorphism, header factory, genie effect e as proibições de UX.'],
  ['20', 'Build, deploy e ambientes', 'esbuild e o define de ambiente, ordem dos jobs, clasp push vs. promoção, os IDs que precisam concordar.'],
  ['21', 'Evolução recente do projeto', 'O rename e o shim, o split de dev e produção, o incidente da v6.0 e a armadilha do bit de execução.'],
  ['22', 'Governança da documentação', 'Como specs/, docs/, ADRs e aprendizados são mantidos em sincronia com o código.'],
  ['23', 'Limitações e trade-offs', 'O que foi trocado por o quê, e onde o desenho vai doer primeiro.'],
  ['24', 'Roadmap técnico', 'Dívidas conhecidas e evoluções previstas.'],
  ['25', 'Guia de retomada', 'O caminho mais curto para alguém novo ficar produtivo.'],
  ['A', 'Apêndice — Glossário', 'Termos internos, siglas e nomes de domínio.'],
  ['B', 'Apêndice — Mapa de arquivos', 'Onde mora cada coisa, arquivo por arquivo.'],
];

// ============================================================
// 6. SEÇÕES — cada função monta uma seção completa do documento
// ============================================================

function sec01_(ctx) {
  h1_(ctx, '01', 'Panorama e problema técnico', COLOR.blue);

  h2_(ctx, 'O que o sistema é', COLOR.blue);
  para_(ctx, 'O Case Wizard (nome interno: TechSol Operations Assistant) é uma Overlay Application: ' +
    'uma aplicação JavaScript injetada em tempo de execução dentro de uma página de terceiro — o CRM ' +
    'interno de atendimento, o Connect Cases. Ele não é uma extensão de navegador, não é uma página ' +
    'própria e não tem processo de instalação: o usuário clica em um favorito (bookmarklet) e o app ' +
    'passa a existir dentro da aba em que ele já estava trabalhando.', { spaceAfter: 8 });

  para_(ctx, 'A consequência arquitetural mais importante disso é que o app compartilha o mesmo ' +
    'documento, o mesmo objeto window e o mesmo ciclo de vida da página hospedeira. Não existe ' +
    'isolamento: se o Connect Cases recarregar, o Case Wizard some junto; se o Connect Cases travar, ' +
    'o overlay trava junto. Todo o desenho de resiliência do projeto (seção 18) existe por causa ' +
    'dessa única característica.', { spaceAfter: 12 });

  h2_(ctx, 'O problema que ele resolve', COLOR.blue);
  bullets_(ctx, [
    'Agentes de suporte executam, dezenas de vezes por dia, o mesmo conjunto de tarefas manuais dentro do CRM: escrever notas padronizadas, redigir e-mails a partir de modelos, seguir scripts de ligação, converter fuso horário e escalar casos para o time BAU.',
    'O CRM não expõe API pública nem automação nativa para esse fluxo, e trocar de ferramenta no meio do atendimento quebra o ritmo do agente.',
    'Divergências de padronização em notas e e-mails geram retrabalho, e a escalação para o time BAU dependia de formulários avulsos, sem rastreio de estado.',
  ]);

  h2_(ctx, 'A forma da solução', COLOR.blue);
  para_(ctx, 'Um único artefato JavaScript, servido estaticamente, que se injeta na página do CRM e ' +
    'oferece um painel flutuante (a "pílula" do Command Center) com todos os módulos. As ações do ' +
    'agente ora manipulam o DOM do próprio CRM (inserir uma nota, preencher um e-mail), ora conversam ' +
    'com um backend serverless em Google Apps Script que usa uma planilha Google Sheets como banco.',
    { spaceAfter: 10 });

  specList_(ctx, [
    ['Front-end', 'Vanilla JavaScript (ES modules), sem framework, empacotado por esbuild'],
    ['Estilos', 'CSS-in-JS e tags <style> injetadas; arquivos .css externos são proibidos por regra'],
    ['Backend', 'Google Apps Script (runtime V8), publicado como Web App'],
    ['Banco de dados', 'Google Sheets (dez abas nomeadas)'],
    ['Transporte', 'JSONP sobre GET, tanto para leitura quanto para escrita'],
    ['Hospedagem do bundle', 'GitHub Pages (branch gh-pages)'],
    ['CI/CD', 'GitHub Actions: esbuild para o front, clasp para o backend'],
    ['Autenticação', 'Delegada ao Google Workspace: o Web App é publicado com access DOMAIN'],
  ], COLOR.blue);

  callout_(ctx, 'Regra de stack (specs/_MASTER_RULEBOOK.md)',
    'O rulebook do projeto proíbe explicitamente frameworks (React, Angular, Vue) e bibliotecas ' +
    '(jQuery, Axios) sem autorização explícita. Isso não é preferência estética: o bundle é injetado ' +
    'dentro de uma aplicação Angular de terceiro, e cada quilobyte e cada global adicional aumentam a ' +
    'chance de colisão com a página hospedeira.', COLOR.red);
}

function sec02_(ctx) {
  h1_(ctx, '02', 'Restrições do ambiente', COLOR.red);

  para_(ctx, 'Praticamente toda decisão não óbvia deste projeto é consequência direta de uma restrição ' +
    'do ambiente. Esta seção lista as restrições primeiro, para que as seções seguintes possam se ' +
    'referir a elas em vez de repetir a justificativa.', { spaceAfter: 12 });

  table_(ctx, ['Restrição', 'Origem', 'Consequência no desenho'], [
    ['Content Security Policy estrita na página do CRM',
     'Configuração do próprio Connect Cases',
     'Uma tag <script src> comum é bloqueada. A injeção precisa passar por uma política de Trusted Types (seção 04).'],
    ['Sem permissão para publicar extensão de navegador',
     'Política interna de dispositivos',
     'A distribuição vira um bookmarklet copiado manualmente. Não há canal de atualização automática além do cache busting.'],
    ['Sem servidor e sem banco de dados provisionáveis',
     'Não há infraestrutura alocada ao projeto',
     'O backend vira Apps Script e o banco vira Sheets, com todas as quotas e limites que isso implica (seção 23).'],
    ['CORS bloqueia XHR/fetch entre o domínio do CRM e o do Apps Script',
     'Política de origem cruzada do navegador',
     'Todo o transporte é JSONP via tag <script>, inclusive as escritas (seção 09).'],
    ['O DOM do CRM não é um contrato: classes e IDs mudam sem aviso',
     'É uma aplicação de terceiro em evolução',
     'Seletores preferem aria-label, debug-id e XPath por texto; toda extração é envolvida em try/catch e falha em silêncio (seção 08).'],
    ['Tradução automática do navegador reescreve o texto da página',
     'Tradutor do Chrome no ambiente do agente',
     'Antes de qualquer captura, o script força o botão "Mostrar original" e espera o re-render (seção 08).'],
    ['O Web App só pode ser chamado por usuários autenticados do domínio',
     'appsscript.json: webapp.access = DOMAIN',
     'Não há autenticação própria; a identidade vem do Google. Isso também impede qualquer chamada anônima ou automação externa.'],
    ['Instabilidade conhecida do CRM hospedeiro',
     'Ambiente de produção de terceiro',
     'Rascunhos automáticos, salvamento de emergência e watchdogs de timeout viram requisito, não polimento (seção 18).'],
  ], COLOR.red, [0.26, 0.24, 0.50]);

  callout_(ctx, 'Leitura recomendada',
    'Se você tem pouco tempo e precisa entender só uma coisa deste projeto, entenda esta tabela. ' +
    'Quase toda escolha que parece estranha à primeira vista (JSONP hoje em dia, planilha como banco, ' +
    'bookmarklet como instalador) é a resposta mínima viável a uma linha aqui.', COLOR.red);
}

function sec03_(ctx) {
  h1_(ctx, '03', 'Arquitetura macro', COLOR.blue);

  h2_(ctx, 'As quatro camadas', COLOR.blue);
  code_(ctx, [
    '  [1] DISTRIBUICAO                      [2] EXECUCAO (aba do agente)',
    '  +---------------------------+         +--------------------------------------+',
    '  | GitHub (repo)             |         | Connect Cases (CRM, Angular)         |',
    '  |   src/**  --esbuild--+    |         |   DOM + window compartilhados        |',
    '  |                      |    |         |                                      |',
    '  | GitHub Actions       |    |         |   +--------------------------------+ |',
    '  |   deploy.yml         v    |  HTTPS  |   | bundle.js (Case Wizard)        | |',
    '  | GitHub Pages -- bundle.js-+-------->|   |  app.js -> modulos -> overlay  | |',
    '  +---------------------------+         |   +---------------+----------------+ |',
    '                                        +-------------------+------------------+',
    '                                                            | JSONP (GET, <script>)',
    '                                                            v',
    '  [4] OPERACAO                          [3] BACKEND (Google Apps Script)',
    '  +---------------------------+         +--------------------------------------+',
    '  | Gmail (motor de e-mails)  |<--------| doGet(e)  -- roteador por op=        |',
    '  | TL Dashboard (?page=tl)   |<--------|   BAU_API . EmailEngine . Snippets   |',
    '  | Gatilhos de tempo         |         |   Broadcast . Logs . Perfil          |',
    '  |   alerta de volume        |         +-------------------+------------------+',
    '  |   backup semanal          |                             | SpreadsheetApp',
    '  +---------------------------+                             v',
    '                                        +--------------------------------------+',
    '                                        | Google Sheets (banco de dados)       |',
    '                                        |  BAU_form_data . People . Broadcast  |',
    '                                        |  Tips . Logs . Database_Snippets     |',
    '                                        +--------------------------------------+',
  ], 'Fluxo completo, do commit ao dado persistido. As setas do bloco [4] indicam efeitos disparados pelo backend, não chamadas do front-end.');

  h2_(ctx, 'Responsabilidade de cada camada', COLOR.blue);
  table_(ctx, ['Camada', 'Onde vive', 'Responsabilidade', 'O que ela NÃO faz'], [
    ['Distribuição', '.github/workflows/deploy.yml, branch gh-pages',
     'Transformar o fonte em um artefato único e publicá-lo em uma URL estável.',
     'Não versiona o backend por conta própria: a promoção da implantação de produção é manual.'],
    ['Execução', 'src/**, servido como dist/bundle.js',
     'Renderizar a UI, ler e escrever no DOM do CRM, orquestrar os módulos e falar com o backend.',
     'Não guarda estado de negócio; o localStorage é só cache e rascunho.'],
    ['Backend', 'gas-backend/**',
     'Rotear operações, aplicar regras de negócio, persistir na planilha e disparar e-mails.',
     'Não serve o front-end — exceto o TL Dashboard, que é uma página HtmlService própria.'],
    ['Operação', 'Gatilhos do Apps Script, Gmail, planilha de arquivo',
     'Alertas de volume, backup semanal e o painel de decisão do TL.',
     'Não é acionada pelo front: roda por agendamento ou por acesso direto à URL do dashboard.'],
  ], COLOR.blue, [0.15, 0.22, 0.36, 0.27]);

  h2_(ctx, 'Os dois caminhos de comunicação', COLOR.blue);
  para_(ctx, 'É importante não confundir os dois canais que chegam ao mesmo projeto Apps Script, ' +
    'porque eles têm modelos de segurança diferentes:', { spaceAfter: 8 });

  table_(ctx, ['Canal', 'Quem usa', 'Mecanismo', 'Identidade do chamador'], [
    ['API JSONP', 'O bundle injetado no CRM',
     'Tag <script> apontando para .../exec?op=...&callback=...',
     'Declarada pelo cliente como parâmetro (user / ldap). Não é confiável por si só.'],
    ['Ponte nativa', 'A página TLDashboard.html',
     'google.script.run.nomeDaFuncao(...)',
     'Real, obtida no servidor via Session.getActiveUser(). É a base do controle de acesso do TL.'],
  ], COLOR.green, [0.14, 0.22, 0.34, 0.30]);

  callout_(ctx, 'Por que isso importa',
    'Ações restritas à liderança vivem no canal da ponte nativa justamente porque lá o servidor sabe ' +
    'quem está chamando. Se uma dessas ações fosse exposta como um op= no roteador JSONP, qualquer ' +
    'usuário do domínio poderia forjar o parâmetro user e executá-la. Ver seção 16.', COLOR.green);
}

function sec04_(ctx) {
  h1_(ctx, '04', 'Mecanismo de injeção', COLOR.yellow);

  para_(ctx, 'O instalador do Case Wizard é um bookmarklet: um favorito do navegador cuja URL, em vez ' +
    'de um endereço, contém um programa JavaScript. Clicar nele executa esse programa no contexto da ' +
    'aba atual. Abaixo, a versão de produção, formatada a partir do que está no README.md do ' +
    'repositório (no favorito real ela é uma única linha):', { spaceAfter: 8 });

  code_(ctx, [
    'javascript:(function(){',
    "  const cacheBuster = '?t=' + new Date().getTime();",
    "  const scriptUrl = 'https://lucastdcs.github.io/case-wizard/bundle.js'",
    '                  + cacheBuster;',
    '',
    "  const policy = trustedTypes.createPolicy('default', {",
    '    createHTML:      (string) => string,',
    '    createScriptURL: (string) => string,',
    '    createScript:    (string) => string,',
    '  });',
    '',
    "  const oldScript = document.getElementById('techsol-app-bundle');",
    '  if (oldScript) oldScript.remove();',
    '',
    "  const script = document.createElement('script');",
    "  script.id  = 'techsol-app-bundle';",
    '  script.src = policy.createScriptURL(scriptUrl);',
    '  document.body.appendChild(script);',
    '})();',
  ], 'Bookmarklet de produção (aponta sempre para a branch main). A versão de desenvolvimento é análoga, mas carrega bundle-dev.js — ver README.md.');

  callout_(ctx, 'A URL contém o nome do repositório',
    'É esse detalhe que transformou um simples rename de repositório numa operação de risco, em ' +
    '2026-08-21: o GitHub redireciona as URLs de git de um repositório renomeado, mas NÃO redireciona ' +
    'o GitHub Pages. Favoritos apontando para o nome antigo (techsol_DialIn_AutoCopy) hoje continuam ' +
    'funcionando por causa de um repositório-shim mantido de propósito sob aquele nome. A história ' +
    'completa está na seção 21 — se você encontrar a URL antiga em algum lugar, é dela que se trata, ' +
    'e o endereço canônico é o de /case-wizard/ acima.', COLOR.yellow);

  h2_(ctx, 'Linha a linha', COLOR.yellow);
  table_(ctx, ['Trecho', 'O que faz', 'Por que existe'], [
    ['cacheBuster', 'Anexa um timestamp à URL do script.',
     'GitHub Pages e o navegador cacheiam agressivamente. Sem isso, o agente continuaria rodando a versão de ontem depois de um deploy.'],
    ["trustedTypes.createPolicy('default', ...)",
     'Registra uma política chamada default com transformações identidade para HTML, URL de script e script.',
     'A CSP do CRM exige Trusted Types. Sem uma política registrada, atribuir uma string a script.src é rejeitado pelo navegador.'],
    ["getElementById('techsol-app-bundle') + remove()",
     'Remove a tag de script de uma injeção anterior, se houver.',
     'Torna o clique repetível: o DOM não acumula tags mortas a cada vez que o agente clica no favorito.'],
    ['script.id fixo',
     'Dá identidade estável à tag injetada (techsol-app-bundle).',
     'É o que permite a limpeza acima e facilita inspecionar no DevTools se o bundle chegou a carregar. O nome desse id é histórico e não tem relação com o nome do repositório — trocá-lo não traria benefício e quebraria a limpeza para quem estivesse com uma instância antiga na página.'],
  ], COLOR.yellow, [0.26, 0.30, 0.44]);

  h2_(ctx, 'Idempotência em duas camadas', COLOR.yellow);
  para_(ctx, 'Remover a tag antiga não desfaz o que o bundle anterior já executou: módulos, listeners e ' +
    'elementos de UI continuam no ar. Por isso a idempotência real é resolvida do lado do app, logo na ' +
    'primeira linha de initApp():', { spaceAfter: 8 });

  code_(ctx, [
    '// src/app.js',
    'function initApp() {',
    '    // Se já iniciou, só toca a animação de novo e sai (evita duplicidade)',
    '    if (window.techSolInitialized) {',
    '        playStartupAnimation();',
    '        return;',
    '    }',
    '    window.techSolInitialized = true;',
    '    ...',
    '}',
  ], 'Guarda de instância única. Um segundo clique no bookmarklet vira apenas um feedback visual.');

  callout_(ctx, 'Efeito colateral desejado',
    'Como o segundo clique só reexecuta a animação de abertura, o favorito acaba servindo de "trazer o ' +
    'app de volta ao foco" para o agente, sem que ele precise saber que já havia uma instância rodando.',
    COLOR.yellow);

  h2_(ctx, 'O que a CSP ainda impede', COLOR.yellow);
  bullets_(ctx, [
    'Não é possível carregar CSS externo: daí a regra de CSS-in-JS e de tags <style> injetadas dinamicamente.',
    'Não é possível abrir conexões XHR/fetch para o Apps Script: daí o JSONP da seção 09.',
    'Qualquer recurso remoto adicional (fontes, ícones, áudio) precisaria passar pela mesma política — na prática o projeto embute o que precisa, incluindo o som de inicialização, que vive como data URI base64 dentro de sound-manager.js.',
  ]);
}

function sec05_(ctx) {
  h1_(ctx, '05', 'Sequência de boot', COLOR.green);

  para_(ctx, 'src/app.js é o único ponto de entrada. Ele não contém lógica de negócio: é uma partitura ' +
    'de inicialização, e a ordem dos movimentos é deliberada. O trecho abaixo resume a estrutura real ' +
    'de initApp(), preservando os rótulos usados no próprio arquivo.', { spaceAfter: 8 });

  code_(ctx, [
    'A.  initGlobalStylesAndFont()             // estilos globais + fonte no <head>',
    'A2. SoundManager.initGlobalListeners()    // dentro de try/catch: audio pode ser bloqueado',
    'B.  DataService.fetchTips()               // dispara (sem await) a busca de dicas',
    'C.  const splashDone = playStartupAnimation()   // guarda a promise da splash',
    'D.  initCaseNotesAssistant() ... initBAUForm()  // cada modulo devolve seu toggle',
    'E.  initCommandCenter(moduleActions, splashDone)',
    'E1. initCommandPalette(moduleActions)     // Ctrl/Cmd+K',
    'F.  setTimeout(2500) -> logEvent("App","Start","Session Start")',
    '                     -> UserPrefsService.sync()      // nao bloqueia nada',
    '                     -> fetchUserProfile(ldap)',
    '                          .then(applyProfileLanguage)',
    '                        .finally(() => {             // so DEPOIS do idioma:',
    '                          initOnboarding();',
    '                          setTimeout(500) -> checkAndShowChangelog(APP_VERSION);',
    '                        })',
  ], 'Todo o corpo está dentro de um try/catch que, em falha, toca um som de erro e mostra um toast — nunca deixa a página do CRM quebrada.');

  h2_(ctx, 'Por que a ordem é essa', COLOR.green);
  table_(ctx, ['Passo', 'Decisão', 'Motivo'], [
    ['A', 'Estilos antes de qualquer UI',
     'Evita flash de conteúdo não estilizado dentro de uma página que já tem CSS próprio competindo.'],
    ['A2', 'Áudio isolado em try/catch',
     'A política de autoplay do navegador pode lançar antes de qualquer interação do usuário. Uma falha de áudio nunca pode derrubar o boot.'],
    ['B', 'fetchTips sem await',
     'As dicas são conteúdo cosmético; a chamada popula o cache em segundo plano e a UI usa FALLBACK_TIPS enquanto isso.'],
    ['C', 'A splash devolve uma promise',
     'A duração real da splash é variável (o efeito de digitação depende do tamanho do nome capturado). Antes havia um tempo fixo, que quase nunca batia.'],
    ['D', 'Módulos antes do Command Center',
     'A pílula é construída a partir das funções toggle que os módulos devolvem: ela precisa delas prontas para montar os botões.'],
    ['E', 'A pílula recebe splashDone',
     'Assim ela só ancora na tela quando a splash de fato saiu do DOM, em vez de adivinhar o próprio tempo de boot.'],
    ['F', 'Delay tático de 2,5 s',
     'A captura do e-mail do agente (o "Sherlock", seção 08) acontece durante a animação. Só depois dela o log de sessão sai com o LDAP correto em vez de "anon".'],
    ['F', 'O idioma é resolvido ANTES do onboarding',
     'O tutorial e o changelog só abrem depois que o perfil da planilha People responde e o idioma é aplicado. Sem esse encadeamento, quem usa o Case Wizard pela primeira vez e é hispanofalante veria o tutorial piscar em português, porque o perfil ainda não teria chegado.'],
    ['F', 'UserPrefsService.sync() não bloqueia',
     'As preferências (hoje, os atalhos do Ctrl+K) seguem o padrão cache-first: a tela já abre com o cache local e se atualiza quando a planilha responde. O Ctrl+K relê a lista a cada abertura.'],
  ], COLOR.green, [0.08, 0.30, 0.62]);

  callout_(ctx, 'Armadilha de manutenção',
    'O delay de 2.500 ms do passo F é um acoplamento temporal implícito entre a animação de entrada e a ' +
    'disponibilidade do e-mail do agente. Se algum dia a splash ficar mais lenta, o log de sessão volta ' +
    'a sair como "anon" silenciosamente — sem erro e sem aviso. Ao mexer em playStartupAnimation(), ' +
    'revise esse número.', COLOR.red);

  h2_(ctx, 'O contrato de módulo', COLOR.green);
  para_(ctx, 'Todo módulo segue a mesma forma: exporta uma função initNomeAssistant() que monta seu DOM ' +
    '(oculto), registra seus listeners e devolve uma função de alternância. O app.js coleta essas ' +
    'funções em um objeto moduleActions e o repassa a dois consumidores — a pílula e a paleta de ' +
    'comandos —, que assim compartilham exatamente a mesma lista de módulos sem duplicar registro.',
    { spaceAfter: 8 });

  code_(ctx, [
    'const moduleActions = {',
    '    toggleNotes, toggleEmail, toggleScript, toggleLinks,',
    '    toggleTimezone, toggleLibrary, toggleConfigs, toggleBAUForm,',
    '    broadcastControl',
    '};',
    '',
    'initCommandCenter(moduleActions, splashDone);  // a pílula flutuante',
    'initCommandPalette(moduleActions);             // Ctrl/Cmd+K',
  ], 'Uma única fonte de verdade para "quais módulos existem".');
}

function sec06_(ctx) {
  h1_(ctx, '06', 'Organização do código-fonte', COLOR.modBlue);

  h2_(ctx, 'Árvore do front-end', COLOR.modBlue);
  code_(ctx, [
    'src/',
    '|-- app.js                       ponto de entrada (secao 05)',
    '`-- modules/',
    '    |-- shared/                  nucleo compartilhado (secao 07)',
    '    |   |-- data-service.js      cliente da API + jsonpFetch + DEPLOYMENTS',
    '    |   |-- page-data.js         scrapers e identidade do agente',
    '    |   |-- command-center.js    a pilula flutuante',
    '    |   |-- command-palette.js   busca rapida Ctrl/Cmd+K',
    '    |   |-- shortcut-service.js  atalhos do Ctrl+K por agente',
    '    |   |-- user-prefs-service.js  preferencias que seguem a pessoa',
    '    |   |-- i18n.js              idioma de sessao (PT/ES)',
    '    |   |-- header-factory.js    janelas padronizadas (glassmorphism)',
    '    |   |-- wizard-shell.js      casca comum do Onboarding e do Changelog',
    '    |   |-- animations.js        genie effect e idle listener',
    '    |   |-- z-layers.js          escala unica de empilhamento',
    '    |   |-- dom-utils.js         esperar(), cliques sinteticos, scroll lock',
    '    |   |-- sound-manager.js     WebAudio + som de boot em base64',
    '    |   |-- streak-tracker.js    contador diario de casos',
    '    |   |-- utils.js             estilos globais, splash, toast',
    '    |   `-- config.js            lista de ADMINS',
    '    |-- notes/                   Case Notes - o modulo mais complexo',
    '    |   |-- core/                notes-state . form-builder . output-generator',
    '    |   |-- ui/                  notes-popup',
    '    |   |-- data/                notes-data . note-templates-service',
    '    |   |-- components/          step-tasks . step-scenarios . bullet-editor',
    '    |   |                        . split-transfer',
    '    |   |-- drafts/              draft-service . draft-ui',
    '    |   |-- automation/          case-log-scraper',
    '    |   |-- notes-bridge.js      ponte com o editor do CRM',
    '    |   `-- tag-support.js',
    '    |-- email-assistant/         email-data . email-data-service',
    '    |                            . email-automation-service',
    '    |-- bau-form/                assistant . config (FORM_CONFIG) . i18n . styles',
    '    |-- configs/                 configs-assistant . shortcuts-section',
    '    |-- call-script/  links/  timezone/  personal-library/',
    '    `-- broadcast/  changelog/  onboarding/',
  ], 'Módulos simples são um único arquivo *-assistant.js. Só Case Notes cresceu a ponto de exigir subpastas por responsabilidade.');

  h2_(ctx, 'Convenções de nomenclatura', COLOR.modBlue);
  table_(ctx, ['Elemento', 'Padrão', 'Exemplo'], [
    ['Funções JavaScript', 'camelCase', 'sendBAUEscalation, ensureNoteCardIsOpen'],
    ['Constantes globais e status', 'UPPER_SNAKE_CASE', 'PENDING_TL_CREATION, CACHE_KEY_TIPS'],
    ['Classes CSS', 'kebab-case', '.bau-highlight-panel, .discard-theme'],
    ['Arquivo principal de módulo', 'nome-assistant.js', 'timezone-assistant.js'],
    ['Função de inicialização', 'initNomeAssistant', 'initPersonalLibrary, initBAUForm'],
    ['Chaves de localStorage', 'prefixo cw_', 'cw_data_tips, cw_notes_parking_lot'],
  ], COLOR.modBlue, [0.28, 0.28, 0.44], { monoCols: [2] });

  h2_(ctx, 'Como adicionar um módulo', COLOR.modBlue);
  bullets_(ctx, [
    'Crie src/modules/nome-do-modulo/ e um arquivo nome-assistant.js exportando initNomeAssistant().',
    'A função deve montar seu próprio DOM já oculto, registrar listeners e devolver uma função toggle.',
    'Importe e inicialize em src/app.js, no bloco D, e acrescente o toggle a moduleActions.',
    'Adicione o botão correspondente em shared/command-center.js — a paleta de comandos herda automaticamente.',
    'Use header-factory.js para a janela, para não reimplementar o cromo (barra de gradiente, botões, ajuda).',
  ], { numbered: true });

  h2_(ctx, 'Árvore do backend', COLOR.modBlue);
  code_(ctx, [
    'gas-backend/',
    '|-- Codigo.js                doGet(e): roteador + helpers de planilha + perfil',
    '|                            + preferencias do agente',
    '|-- BAU_API.js               handleBAUEscalation . getAgentCases',
    '|                            . update_bau_case . deleteBAUCase',
    '|-- BAU_Dashboard.js         getPendingBAUCases . updateBAUCaseStatus',
    '|                            . getWeeklyHistory . presenca de TLs',
    '|-- BAU_Alerts.js            checkBAUPendingVolume + gatilho de tempo',
    '|-- Backup.js                runWeeklyBackup para a planilha Archive_BAU',
    '|-- EmailEngine.js           sendDynamicTechSolEmail: despacho por tipo',
    '|-- EmailTemplateDynamic.html   template HTML unico com placeholders',
    '|-- TLDashboard.html         a pagina do TL          (?page=tl)',
    '|',
    '|   -- Central de Conteudo (secao 15) --',
    '|-- ContentAPI.js            ~1000 linhas: itens, rascunhos, aprovacao,',
    '|                            papeis, travas e validacoes',
    '|-- ContentDashboard.html    a pagina da Central     (?page=content)',
    '|-- ContentFields_Notes.js   definicao de campos por sub-status',
    '|-- ContentSeed_CallScript.js . ContentSeed_Emails.js',
    '|-- ContentSeed_Links.js      . ContentSeed_NoteTemplates.js',
    '|-- ContentSeed_Tips.js',
    '|-- seeds/                   sementes versionadas',
    '|',
    '|-- Teste.js                 funcoes de execucao manual no editor',
    '|-- appsscript.json          manifesto: V8, fuso, executeAs, access',
    '`-- .clasp.json              scriptId do projeto Apps Script',
  ], 'No Apps Script não existem módulos ES: todos os arquivos compartilham um único escopo global. Os prefixos nos nomes são a única separação real.');

  callout_(ctx, 'Consequência do escopo global do Apps Script',
    'Constantes como SHEET_BAU_FORM são declaradas em Código.js e usadas livremente em BAU_API.js. ' +
    'Isso funciona, mas significa que qualquer colisão de nome entre arquivos é um erro silencioso de ' +
    'sobrescrita. Ao criar uma constante nova no backend, verifique o nome em todos os arquivos.',
    COLOR.red);
}

function sec07_(ctx) {
  h1_(ctx, '07', 'Camada compartilhada', COLOR.modPurple);

  para_(ctx, 'src/modules/shared/ é o núcleo do qual todos os módulos dependem. Vale conhecê-lo antes ' +
    'de qualquer módulo específico, porque quase toda a complexidade real do front-end está aqui.',
    { spaceAfter: 10 });

  table_(ctx, ['Arquivo', 'Responsabilidade', 'Detalhe que importa'], [
    ['data-service.js', 'Único cliente da API. Expõe o objeto DataService com um método por operação.',
     'Contém jsonpFetch, o SCRIPT_ID da implantação e as chaves de cache. É o arquivo que muda ao trocar de ambiente.'],
    ['page-data.js', 'Lê a página do CRM: nome e e-mail do agente, CID, AM, fuso, idioma, Speakeasy ID, Case ID.',
     'Mantém cache em memória (cachedAgentName, cachedAgentEmail, cachedUserProfile) para não repetir scraping caro.'],
    ['command-center.js', 'A pílula flutuante: arraste com imantação nas bordas, estado de processamento, streak.',
     'Define o objeto COLORS com a cor de cada módulo — a mesma paleta usada neste documento e no deck.'],
    ['command-palette.js', 'Busca rápida por Ctrl/Cmd+K sobre a mesma lista de módulos.',
     'Injeta os próprios estilos sob demanda (injectStyles), padrão repetido em vários módulos.'],
    ['shortcut-service.js', 'Atalhos do Ctrl+K montados pelo próprio agente: status + sub-status + cenários, com nome e apelido.',
     'Guarda a REFERÊNCIA do cenário, nunca o texto da nota. Assim uma correção publicada na Central chega ao atalho sem o agente refazer nada.'],
    ['user-prefs-service.js', 'Preferências que seguem a pessoa, não o navegador. Um blob JSON por agente.',
     'Mesmo desenho cache-first da Biblioteca Pessoal. Existe porque trocar de máquina ou de perfil do Chrome é rotina, e é aí que perder a configuração custa caro.'],
    ['i18n.js', 'Idioma de sessão, resolvido em três níveis: override manual salvo no navegador, depois profile.defaultLanguage da planilha People, depois "pt".',
     'Há dicionários só de PT e ES; um perfil marcado como EN cai para PT até existir tradução.'],
    ['header-factory.js', 'createStandardHeader: cromo padronizado de janela, com gradiente e botões de controle.',
     'Também monta o overlay de ajuda por janela, a partir de um texto passado na criação.'],
    ['wizard-shell.js', 'Casca comum dos dois wizards de slides: Onboarding (primeiro uso) e Changelog (quando APP_VERSION muda).',
     'Os dois eram arquivos separados com ~90% do mesmo código, e foi essa duplicação que os deixou para trás na auditoria de movimento. Uma casca só significa que não conseguem mais divergir.'],
    ['animations.js', 'toggleGenieAnimation: abertura e fechamento em "gênio da lâmpada" a partir do botão de origem.',
     'Calcula a geometria entre o botão da pílula e o centro da tela. Também instala um listener de ociosidade.'],
    ['z-layers.js', 'Escala única de empilhamento (z-index) do app inteiro.',
     'Ver a nota abaixo: é um caso exemplar de por que uma constante compartilhada vale mais que a liberdade de cada módulo escolher o próprio número.'],
    ['dom-utils.js', 'esperar(ms), cliques sintéticos, objectToCss, clamp, scroll lock, navegação por setas, estados vazios.',
     'O scroll lock usa contagem de referências (scrollLockCount) para suportar overlays empilhados sem destravar cedo demais.'],
    ['sound-manager.js', 'Feedback sonoro via WebAudio, com mudo persistido em localStorage.',
     'O som de inicialização é um data URI base64 embutido no arquivo — não há request de rede para áudio.'],
    ['streak-tracker.js', 'Contador de casos concluídos no dia, com marcos em 5, 10, 15, 20, 25, 30, 40 e 50.',
     'Chave cw_case_streak_v1, reiniciada por data. Puramente local, não vai para o backend.'],
    ['utils.js', 'Estilos globais, fonte, splash de abertura e o sistema de toast.',
     'initGlobalStylesAndFont é o primeiro efeito colateral do boot.'],
    ['config.js', 'Lista ADMINS de LDAPs com privilégio no cliente.',
     'É conveniência de UI, não segurança: a autorização real acontece no servidor (seção 16).'],
  ], COLOR.modPurple, [0.17, 0.40, 0.43]);

  h2_(ctx, 'O caso do z-index: por que existe z-layers.js', COLOR.modPurple);
  para_(ctx, 'Vale contar essa história porque ela é o argumento mais concreto do projeto a favor de ' +
    'uma constante compartilhada. Antes, cada módulo escolhia o próprio número de empilhamento — 9999, ' +
    '10000, 99999, 999999, 1000000, 2147483648 — e o resultado aparecia na tela:', { spaceAfter: 8 });

  bullets_(ctx, [
    'A janela de módulo nascia em 99999, abaixo do painel lateral do Gmail: quem abria o Case Notes via a metade direita do painel coberta pelo add-on.',
    'Ela só subia para a frente depois do primeiro clique dentro dela, por causa do listener de foco em animations.js.',
    'Arrastar era pior: o contador de "trazer para frente" começava em 10000, então arrastar EMPURRAVA a janela para trás.',
  ]);

  callout_(ctx, 'O teto real é 2147483647',
    'É o maior inteiro de 32 bits com sinal, e o navegador grampeia qualquer valor acima disso. O ' +
    '2147483648 que animations.js usava para "focar" a janela, portanto, não fazia o que aparentava: ' +
    'empatava com a pílula em vez de ficar acima dela. Um número maior que o teto não é mais forte — ' +
    'é apenas igual ao teto, e empate de z-index é resolvido pela ordem no DOM.', COLOR.red);

  h2_(ctx, 'Chaves de armazenamento local', COLOR.modPurple);
  para_(ctx, 'O app não tem estado de negócio próprio, mas mantém cache e rascunhos. Todas as chaves ' +
    'usam o prefixo cw_ para não colidir com o localStorage da aplicação hospedeira, que compartilha ' +
    'a mesma origem:', { spaceAfter: 8 });

  table_(ctx, ['Chave', 'Módulo', 'Conteúdo', 'Se sumir'], [
    ['cw_data_broadcast', 'DataService', 'Cache da rota legada de avisos. Nada mais escreve nele; só é lido no primeiro load pós-migração.', 'Nenhum impacto — a Central tem o próprio cache (cw_content_broadcast).'],
    ['cw_data_tips', 'DataService', 'Lista de dicas exibidas durante esperas.', 'Cai em FALLBACK_TIPS ("Processando...").'],
    ['cw_personal_library_v1', 'SnippetService', 'Snippets pessoais do agente (cache-first).', 'Recarregados da planilha na próxima sincronização.'],
    ['cw_notes_parking_lot', 'DraftService', 'Até 5 rascunhos de nota salvos (MAX_DRAFTS).', 'Perda real de trabalho não enviado.'],
    ['cw_notes_emergency_save', 'DraftService', 'Salvamento de emergência do texto em edição.', 'Perda do texto em edição se a aba morrer.'],
    ['cw_case_streak_v1', 'streak-tracker', 'Contagem de casos do dia.', 'O contador reinicia; sem impacto funcional.'],
    ['cw_sounds_muted', 'SoundManager', 'Preferência de áudio.', 'Volta ao som ligado.'],
    ['cw_user_prefs_v1', 'UserPrefsService', 'Blob de preferências do agente (hoje, os atalhos do Ctrl+K).', 'Recarregado da planilha: este é cache, a fonte é o backend.'],
    ['cw_ui_lang', 'i18n', 'Override manual de idioma feito em Configurações.', 'Volta a seguir o segmento da planilha People.'],
    ['cw_content_*', 'DataService', 'Cache do conteúdo publicado pela Central (um por módulo).', 'Rebuscado na próxima leitura; o app usa o conteúdo embutido enquanto isso.'],
  ], COLOR.modPurple, [0.24, 0.16, 0.34, 0.26], { monoCols: [0] });

  callout_(ctx, 'Duas categorias diferentes na mesma tabela',
    'Vale distinguir: cw_data_*, cw_content_* e cw_user_prefs_v1 são CACHE de algo que vive no ' +
    'backend — perder é inofensivo. Já cw_notes_parking_lot e cw_notes_emergency_save são a ÚNICA ' +
    'cópia de um trabalho do agente. Perder essas duas é perda real, e é por isso que a seção 18 as ' +
    'trata como requisito e não como conveniência.', COLOR.modPurple);
}

function sec08_(ctx) {
  h1_(ctx, '08', 'Integração com o DOM do CRM', COLOR.modOrange);

  para_(ctx, 'Esta é a parte mais frágil do sistema por natureza: o Case Wizard lê e escreve na ' +
    'interface de uma aplicação Angular de terceiro, sem contrato, sem API e sem aviso de mudança. As ' +
    'regras desta seção são normativas — estão em specs/workflow/scraping-rules.md e em ' +
    'specs/ui-ux/dom-standards.md — e não são sugestões de estilo.', { spaceAfter: 10 });

  h2_(ctx, 'Regra 1: forçar o idioma original antes de ler', COLOR.modOrange);
  para_(ctx, 'A tradução automática do navegador reescreve o texto da página e quebra qualquer âncora ' +
    'baseada em conteúdo. Antes de qualquer rotina de captura, o script localiza o botão de tradução ' +
    'do CRM, força um clique e espera o re-render:', { spaceAfter: 8 });

  code_(ctx, [
    '// src/modules/shared/page-data.js',
    'export async function ensureOriginalLanguage() {',
    '    // procura <material-button class="toggle-translation-button ...">',
    '    // forca element.click() e aguarda 300-500 ms',
    '    // para o DOM no idioma original voltar',
    '}',
  ], 'Sem esse passo, XPaths por texto ("Website", "Timezone") deixam de casar em qualquer agente com tradução ligada.');

  h2_(ctx, 'Regra 2: seletores por intenção, não por classe', COLOR.modOrange);
  bullets_(ctx, [
    'Prefira aria-label e debug-id, que costumam sobreviver a refatorações visuais.',
    "Use XPath por texto quando não houver identificador estável — por exemplo //div[contains(text(), 'Website')].",
    'Evite classes CSS do CRM: elas mudam com frequência e sem aviso.',
  ]);

  h2_(ctx, 'Regra 3: falhar em silêncio, nunca travar', COLOR.modOrange);
  para_(ctx, 'Toda extração é envolvida em try/catch. Se um elemento sumir, o sistema registra um ' +
    'console.warn, pula a etapa e deixa o campo para preenchimento manual no formulário. A aplicação ' +
    'nunca deve travar por falha de scraping — um campo vazio é um inconveniente; uma UI congelada em ' +
    'cima do CRM é um incidente.', { spaceAfter: 10 });

  h2_(ctx, 'O "Sherlock": capturar a identidade do agente', COLOR.modOrange);
  para_(ctx, 'O CRM não expõe o usuário logado de forma acessível. A função captureNameWithMagic() ' +
    'resolve isso por interação simulada: clica de forma invisível no avatar do canto superior direito, ' +
    'lê nome e e-mail no dropdown de conta do Google e fecha o menu rapidamente. O resultado é ' +
    'memorizado em cachedAgentName e cachedAgentEmail para o resto da sessão.', { spaceAfter: 8 });

  callout_(ctx, 'Custo escondido',
    'Essa captura é a razão do delay de 2.500 ms no boot (seção 05) e a razão de o log de sessão sair ' +
    'depois de todo o resto. É também o ponto do sistema mais sensível a uma mudança de layout do ' +
    'próprio Google, e não apenas do CRM.', COLOR.red);

  h2_(ctx, 'Catálogo de capturas', COLOR.modOrange);
  table_(ctx, ['Função (page-data.js)', 'O que extrai', 'Usado por'], [
    ['captureNameWithMagic()', 'Nome e e-mail do agente logado.', 'Splash, logs, payload BAU, e-mails'],
    ['getAgentEmail() / getAgentName()', 'Leitura do cache preenchido pela função acima.', 'Praticamente todos os módulos'],
    ['captureCID()', 'Customer ID do anunciante na tela.', 'BAU Central, Call Script'],
    ['captureClientEmail() / captureInternalEmail()', 'E-mail do anunciante e e-mail interno do caso.', 'Email Assistant, BAU Central'],
    ['captureAMName()', 'Nome do Account Manager.', 'BAU Central'],
    ['captureTimezone()', 'Fuso horário do anunciante.', 'BAU Central, Timezone Assistant'],
    ['captureLanguage()', 'Idioma do caso.', 'Case Notes, Email Assistant'],
    ['captureSpeakeasyID()', 'Speakeasy ID do atendimento.', 'Case Notes, BAU Central'],
    ['getCaseId()', 'Identificador do caso aberto.', 'BAU Central, logs'],
    ['getPageData()', 'Agregador: devolve tudo acima em um objeto só.', 'Preenchimento automático de formulários'],
    ['isCurrentUserOverhead()', 'Se o usuário tem papel de liderança (para exibir UI extra).', 'Broadcast, telas administrativas'],
  ], COLOR.modOrange, [0.32, 0.38, 0.30], { monoCols: [0] });

  h2_(ctx, 'Escrita: dois mecanismos diferentes', COLOR.modOrange);
  para_(ctx, 'Inserir texto em uma aplicação Angular não é atribuir value: o framework não observa ' +
    'atribuições diretas e o conteúdo é descartado no próximo ciclo de detecção de mudanças. O projeto ' +
    'usa caminhos distintos conforme o tipo de campo:', { spaceAfter: 8 });

  table_(ctx, ['Alvo', 'Técnica', 'Onde está'], [
    ['Editor de nota (contenteditable)',
     "document.execCommand('insertHTML') — o Angular reconhece a mutação como se viesse do usuário.",
     'notes/notes-bridge.js'],
    ['Assunto do e-mail (input)',
     'Object.getOwnPropertyDescriptor(...).set aplicado ao elemento, seguido do disparo manual dos eventos nativos.',
     'email-assistant/'],
    ['Corpo do e-mail (contenteditable)',
     'Manipulação direta do HTML do editor.',
     'email-assistant/'],
  ], COLOR.modOrange, [0.28, 0.48, 0.24]);

  h2_(ctx, 'Esperar o CRM em vez de cronometrá-lo', COLOR.modOrange);
  para_(ctx, 'ensureNoteCardIsOpen() é o exemplo canônico de como o projeto lida com a latência ' +
    'imprevisível do hospedeiro: em vez de assumir que um clique abriu o editor, ela clica e entra em ' +
    'um laço de verificação do DOM até que um novo elemento contenteditable apareça — só então devolve ' +
    'o controle.', { spaceAfter: 8 });

  code_(ctx, [
    '// src/modules/notes/notes-bridge.js (estrutura)',
    'export async function ensureNoteCardIsOpen() {',
    '    // 1. encontra o botao de "Nova Nota" por icone ou seletor especifico',
    '    // 2. clica',
    '    // 3. while (...) { await esperar(ms); verifica se surgiu um editor novo }',
    '    // 4. devolve o editor encontrado, ou falha silenciosamente',
    '}',
  ], 'Padrão "poll até o efeito acontecer", usado sempre que uma ação do CRM abre modal, card ou menu.');

  h2_(ctx, 'O rascunho fantasma', COLOR.modOrange);
  para_(ctx, 'O CRM frequentemente mantém em memória um rascunho de e-mail sujo, vindo de um caso ' +
    'anterior. Preencher por cima produz um e-mail misturado. A função openAndClearEmail() implementa ' +
    'uma limpeza agressiva antes de qualquer escrita: procura o botão "Descartar Rascunho", clica, ' +
    'confirma a exclusão e só prossegue depois de o DOM refletir a limpeza.', { spaceAfter: 8 });

  callout_(ctx, 'Padrão reaproveitável',
    'É o mesmo desenho do ensureNoteCardIsOpen: nunca confie no estado, force o estado conhecido e ' +
    'verifique. Ao integrar um campo novo do CRM, comece perguntando "qual é o estado sujo possível ' +
    'aqui?" antes de escrever a inserção.', COLOR.modOrange);
}

function sec09_(ctx) {
  h1_(ctx, '09', 'Transporte JSONP', COLOR.modTeal);

  para_(ctx, 'O front-end e o backend vivem em domínios diferentes, e a política de origem cruzada do ' +
    'navegador bloqueia fetch e XMLHttpRequest entre eles. A solução adotada é JSONP: em vez de abrir ' +
    'uma conexão, o cliente cria uma tag <script> apontando para o backend; o backend devolve JavaScript ' +
    'que invoca uma função de callback previamente registrada no window. Tags <script> não estão ' +
    'sujeitas ao CORS.', { spaceAfter: 10 });

  h2_(ctx, 'Anatomia de uma chamada', COLOR.modTeal);
  code_(ctx, [
    '// src/modules/shared/data-service.js',
    'function jsonpFetch(operation, params = {}) {',
    '  return new Promise((resolve, reject) => {',
    "    const callbackName = 'cw_cb_' + Math.round(100000 * Math.random());",
    "    const script = document.createElement('script');",
    '',
    '    // WATCHDOG: evita o skeleton infinito',
    '    const timeoutId = setTimeout(() => {',
    '      /* remove a tag, apaga o callback global e rejeita */',
    '    }, 15000);',
    '',
    '    window[callbackName] = (data) => {',
    '      clearTimeout(timeoutId);   // sucesso: cancela a bomba-relogio',
    '      /* remove a tag, apaga o callback global */',
    '      resolve(data);',
    '    };',
    '',
    '    const finalUrl = `${API_URL}?op=${operation}`',
    '                   + `&callback=${callbackName}`',
    '                   + `&t=${Date.now()}&${queryString}`;',
    '    script.src = finalUrl;',
    '    script.onerror = () => { /* limpa tudo e rejeita */ };',
    '    document.body.appendChild(script);',
    '  });',
    '}',
  ], 'jsonpFetch é o único ponto de saída de rede do aplicativo. Toda chamada do produto passa por aqui.');

  h2_(ctx, 'As quatro garantias do wrapper', COLOR.modTeal);
  table_(ctx, ['Garantia', 'Como é obtida', 'Falha que ela previne'], [
    ['Nome de callback único', "'cw_cb_' + número aleatório a cada chamada.",
     'Duas requisições simultâneas resolveriam uma na promise da outra.'],
    ['Timeout duro de 15 s', 'setTimeout que rejeita a promise e limpa tudo.',
     'Skeleton infinito quando o Apps Script está bloqueado, em fila ou devolvendo erro 500.'],
    ['Limpeza determinística', 'Remoção da tag e delete window[callbackName] nos três caminhos: sucesso, erro e timeout.',
     'Vazamento de globais e acúmulo de tags mortas na página do CRM ao longo de uma sessão longa.'],
    ['Cache busting por chamada', 'Parâmetro t=Date.now() em toda URL.',
     'Resposta cacheada devolvendo dados velhos após uma escrita.'],
  ], COLOR.modTeal, [0.22, 0.40, 0.38]);

  h2_(ctx, 'Consequências de usar GET para tudo', COLOR.modTeal);
  para_(ctx, 'JSONP só funciona sobre GET. Isso significa que operações de escrita — criar um caso BAU, ' +
    'publicar um aviso, salvar um snippet — também trafegam como query string. É o trade-off central ' +
    'do transporte, e ele tem efeitos concretos:', { spaceAfter: 8 });

  bullets_(ctx, [
    'Limite prático de tamanho de URL: payloads muito grandes (um snippet longo, uma nota extensa) podem ser truncados pelo navegador ou pelo servidor. É a primeira suspeita quando uma escrita "some" sem erro.',
    'O conteúdo aparece nos logs de execução do Apps Script e no histórico de requisições — nada sensível deve trafegar por aqui.',
    'Não há semântica de idempotência HTTP: dois cliques rápidos podem gerar dois registros. O backend compensa isso com LockService (seção 17), não o transporte.',
    'Todo valor chega como string no backend. Booleanos precisam ser normalizados manualmente — daí construções como p.isCode === \'true\' || p.isCode === true em Código.js.',
    'Não há códigos de status: um erro do backend chega como um objeto JSON com status: \'error\', não como um 4xx/5xx. O front precisa checar o campo, não a rede.',
  ]);

  callout_(ctx, 'Como o erro realmente viaja',
    'O doGet do backend envolve todo o roteamento em um try/catch e, em falha, devolve ' +
    '{ status: "error", error: "..." } com HTTP 200. Do ponto de vista do jsonpFetch isso é um sucesso. ' +
    'Por isso todo consumidor no DataService verifica response.status === "success" antes de tratar o ' +
    'resultado como válido.', COLOR.red);
}

function sec10_(ctx) {
  h1_(ctx, '10', 'Backend: roteador e operações', COLOR.green);

  para_(ctx, 'Todo o backend é uma única função doGet(e) em gas-backend/Código.js, que despacha por um ' +
    'parâmetro op. Não há framework, rotas declarativas nem middleware: é uma cadeia de if/else if ' +
    'sobre uma string, deliberadamente simples.', { spaceAfter: 10 });

  h2_(ctx, 'Esqueleto do roteador', COLOR.green);
  code_(ctx, [
    'function doGet(e) {',
    "  if (!e) e = { parameter: { op: 'broadcast' } };   // fallback p/ teste manual",
    '',
    '  const ss = SpreadsheetApp.getActiveSpreadsheet();',
    '  const p  = e.parameter;',
    "  const op = p.op || 'broadcast';",
    '  const callback = p.callback;',
    '',
    '  // pontos de entrada alternativos: paginas HTML, nao a API',
    "  if (e.parameter.page === 'tl') {",
    "    return HtmlService.createHtmlOutputFromFile('TLDashboard') ... ;",
    '  }',
    "  if (e.parameter.page === 'content') {",
    "    return HtmlService.createHtmlOutputFromFile('ContentDashboard') ... ;",
    '  }',
    '',
    '  let result = {};',
    '  try {',
    "    if      (op === 'create_bau')    result = handleBAUEscalation(ss, p);",
    "    else if (op === 'read_agent_bau')result = getAgentCases(ss, p.user);",
    '    /* ... demais operacoes ... */',
    '  } catch (err) {',
    "    result = { status: 'error', error: err.toString() };",
    '  }',
    '',
    '  const json = JSON.stringify(result);',
    '  if (callback) {',
    '    return ContentService.createTextOutput(`${callback}(${json})`)',
    '      .setMimeType(ContentService.MimeType.JAVASCRIPT);   // resposta JSONP',
    '  }',
    '  return ContentService.createTextOutput(json)',
    '    .setMimeType(ContentService.MimeType.JSON);           // resposta JSON pura',
    '}',
  ], 'A saída dupla (JSONP quando há callback, JSON puro quando não há) permite testar qualquer operação colando a URL no navegador.');

  h2_(ctx, 'Catálogo de operações', COLOR.green);
  table_(ctx, ['op=', 'Implementação', 'Parâmetros principais', 'Efeito'], [
    ['create_bau', 'BAU_API.js · handleBAUEscalation', 'requestType + 17 campos do caso', 'Cria a linha na fila e dispara o e-mail de confirmação ao agente.'],
    ['read_agent_bau', 'BAU_API.js · getAgentCases', 'user', 'Lista os casos escalados pelo próprio agente.'],
    ['update_bau', 'BAU_API.js · update_bau_case', 'id + campos alterados', 'Edita um caso ainda pendente, preservando o que não veio no payload.'],
    ['delete_bau', 'BAU_API.js · deleteBAUCase', 'id, user', 'Cancela um caso antes da avaliação do TL.'],
    ['get_user_snippets', 'Código.js (inline)', 'user', 'Devolve os snippets ativos daquele LDAP.'],
    ['save_snippet', 'Código.js (inline)', 'id?, user, type, title, content, subject, isCode, isRich', 'Cria ou atualiza um snippet; verifica a posse antes de editar.'],
    ['delete_snippet', 'Código.js (inline)', 'id, user', 'Remove a linha; verifica a posse antes.'],
    ['log', 'Código.js · handleLog', 'user, version, category, action, label, value', 'Acrescenta uma linha na aba Logs.'],
    ['broadcast', 'ContentSeed_Broadcast.js · getBroadcastForLegacyEndpoint', '—', 'Rota legada. Serve os avisos da Central, do mais novo para o mais antigo, para bundles antigos em cache.'],
    ['tips', 'ContentSeed_Tips.js · getTipsForLegacyEndpoint', '—', 'Rota legada. Serve as dicas da Central.'],
    ['content_public', 'ContentAPI.js · handleContentPublicRead', 'module, lang', 'Devolve o conteúdo publicado da Central para o app consumir (seção 15).'],
    ['get_user_prefs', 'Código.js · handleGetUserPrefs', 'user', 'Blob JSON de preferências daquele agente.'],
    ['save_user_prefs', 'Código.js · handleSaveUserPrefs', 'user, prefs', 'Grava o blob. Hoje carrega os atalhos do Ctrl+K.'],
    ['get_user_profile', 'Código.js · getUserProfileByLdap', 'user ou ldap', 'Devolve papel, categoria, segmento, idioma padrão e isOverhead.'],
  ], COLOR.green, [0.15, 0.24, 0.31, 0.30], { monoCols: [0] });

  para_(ctx, 'Repare que a Central de Conteúdo expõe exatamente UMA operação aqui — a de leitura. ' +
    'Toda a escrita e a curadoria dela ficam na ponte nativa, pelo mesmo motivo de segurança que vale ' +
    'para o TL Dashboard (seções 15 e 16).', { spaceAfter: 8 });

  para_(ctx, 'As rotas new_broadcast, update_broadcast e delete_broadcast já estiveram nesta tabela e ' +
    'foram removidas. Eram escrita por URL pública: quem descobrisse o endereço do Web App publicava ' +
    'um aviso para toda a operação, e o único controle era o botão só aparecer para quem estava numa ' +
    'lista embutida no bundle — uma checagem de front, do lado errado da fronteira. Publicar um aviso ' +
    'passou a ser ação da Central, por google.script.run com papel verificado no servidor.',
    { spaceAfter: 8 });

  callout_(ctx, 'Divergência conhecida a verificar',
    'O DataService do front-end chama uma operação update_bau_status que não aparece na cadeia de ' +
    'despacho de Código.js. Ou ela foi renomeada e o cliente não acompanhou, ou o handler foi removido. ' +
    'Antes de confiar nesse caminho, confirme no fonte atual — é exatamente o tipo de desalinhamento ' +
    'que o JSONP esconde, porque a operação desconhecida simplesmente devolve um objeto vazio com ' +
    'HTTP 200.', COLOR.red);

  h2_(ctx, 'Exclusão lógica vs. física', COLOR.green);
  para_(ctx, 'Vale notar a inconsistência deliberada: tirar um aviso do ar arquiva a versão na Central ' +
    '(unpublishContentDirect muda o status para archived, e a leitura pública só enxerga live), ' +
    'enquanto delete_snippet chama sheet.deleteRow e apaga a linha de fato. Avisos são conteúdo ' +
    'institucional que alguém pode precisar auditar — e a linha arquivada é o que permite reverter; ' +
    'snippets são conteúdo pessoal do agente, que ele espera ver desaparecer quando apaga.',
    { spaceAfter: 8 });

  h2_(ctx, 'Manifesto do Web App', COLOR.green);
  code_(ctx, [
    '// gas-backend/appsscript.json',
    '{',
    '  "timeZone": "America/Sao_Paulo",',
    '  "dependencies": {},',
    '  "exceptionLogging": "STACKDRIVER",',
    '  "runtimeVersion": "V8",',
    '  "webapp": {',
    '    "executeAs": "USER_DEPLOYING",',
    '    "access": "DOMAIN"',
    '  }',
    '}',
  ], 'executeAs USER_DEPLOYING: o script roda com a conta de quem publicou, e é essa conta que enxerga a planilha e envia os e-mails.');

  table_(ctx, ['Campo', 'Valor', 'Implicação prática'], [
    ['runtimeVersion', 'V8', 'Sintaxe moderna (let/const, arrow functions, template literals) é permitida no backend.'],
    ['executeAs', 'USER_DEPLOYING', 'As quotas de envio de e-mail e de execução consumidas são as da conta que publicou, não as do agente que chamou.'],
    ['access', 'DOMAIN', 'Só usuários autenticados do mesmo domínio Workspace conseguem chamar. A API não é pública.'],
    ['exceptionLogging', 'STACKDRIVER', 'Exceções não capturadas aparecem no Cloud Logging do projeto — é onde investigar um erro que o front só mostrou como toast.'],
    ['timeZone', 'America/Sao_Paulo', 'Base de todo Utilities.formatDate e de todos os gatilhos de tempo.'],
  ], COLOR.green, [0.18, 0.20, 0.62], { monoCols: [0] });
}

function sec11_(ctx) {
  h1_(ctx, '11', 'Backend: modelo de dados', COLOR.modOrange);

  para_(ctx, 'O banco de dados é uma única planilha Google Sheets. Cada "tabela" é uma aba nomeada, e ' +
    'os nomes vivem como constantes no topo de gas-backend/Código.js. Não há schema declarado, ' +
    'migrations nem tipos: a posição da coluna é o contrato.', { spaceAfter: 10 });

  h2_(ctx, 'As abas', COLOR.modOrange);
  table_(ctx, ['Constante', 'Aba', 'Papel', 'Criada automaticamente?'], [
    ['SHEET_BAU_FORM', 'BAU_form_data', 'Fila de escalações BAU: a tabela central do sistema, 18 colunas.', 'Sim, por getOrCreateSheet, com cabeçalho.'],
    ['SHEET_PEOPLE', 'People', 'Cadastro de pessoas: LDAP, papel, categoria e segmento. Fonte da autorização.', 'Não — é mantida manualmente.'],
    ['SHEET_BROADCAST', 'Broadcast', 'Fonte histórica dos avisos. Migrada para a Central por seedBroadcastNow(); mantida intocada como caminho de volta.', 'Não.'],
    ['SHEET_TIPS', 'Tips', 'Frases exibidas durante esperas.', 'Não.'],
    ['SHEET_LOGS', 'Logs', 'Telemetria de uso: timestamp, usuário, versão, categoria, ação, rótulo, valor.', 'Sim, por handleLog, com cabeçalho.'],
    ['SHEET_SNIPPETS', 'Database_Snippets', 'Biblioteca pessoal de cada agente.', 'Sim, por getOrCreateSheet, com cabeçalho.'],
    ['SHEET_USER_PREFS', 'User_Prefs', 'Um blob JSON de preferências por agente (hoje, os atalhos do Ctrl+K).', 'Sim.'],
    ['SHEET_CONTENT_ITEMS', 'Content_Items', 'Conteúdo publicado pela Central. Uma linha por VERSÃO (seção 15).', 'Sim, por getContentSheet_.'],
    ['SHEET_CONTENT_DRAFTS', 'Content_Drafts', 'Propostas de mudança em andamento, com trilha de revisão e trava.', 'Sim, por getContentSheet_.'],
    ['SHEET_CONTENT_ACCESS', 'Content_Access', 'Quem pode propor e aprovar em cada módulo da Central.', 'Sim, por getContentSheet_.'],
  ], COLOR.modOrange, [0.20, 0.18, 0.42, 0.20], { monoCols: [0, 1] });

  callout_(ctx, 'Assimetria importante',
    'Abas com criação automática se recriam vazias se forem apagadas por engano — o sistema continua ' +
    'funcionando, perdendo apenas o histórico. Já People e Broadcast não: se People sumir, ' +
    'getUserProfileByLdap cai no perfil de fallback e TODO MUNDO vira Agent sem privilégio. É uma ' +
    'degradação segura, mas silenciosa.', COLOR.red);

  h2_(ctx, 'BAU_form_data: o mapa de 18 colunas', COLOR.modOrange);
  para_(ctx, 'Esta é a tabela mais importante do projeto e a que mais exige disciplina, porque ' +
    'front-end, backend, motor de e-mail e TL Dashboard escrevem e leem os mesmos índices. O contrato ' +
    'está em specs/data-models/db-schema.md:', { spaceAfter: 8 });

  table_(ctx, ['Índice', 'Coluna', 'Chave no payload', 'Observação'], [
    ['0', 'ID_Escalacao', 'gerado no backend', 'Formato bau_ + timestamp em milissegundos.'],
    ['1', 'Data_Envio', 'date', 'ISO string. É a chave de ordenação FIFO da fila do TL.'],
    ['2', 'Agente_Email', 'user / userEmail', 'Capturado por getAgentEmail() no cliente.'],
    ['3', 'Status', 'status', 'Uma das seis constantes da seção 12.'],
    ['4', 'Case_ID', 'caseId', ''],
    ['5', 'CID', 'cid', 'Customer ID do anunciante.'],
    ['6', 'Speakeasy_ID', 'seId', ''],
    ['7', 'Adv_Nome', 'advName', 'Também usado no assunto dos e-mails.'],
    ['8', 'Adv_Email', 'advEmail', 'Prioriza o input editado; usa o scraping como fallback.'],
    ['9', 'Adv_Site', 'website', 'CRÍTICO: a chave é website, nunca site.'],
    ['10', 'Fuso_Horario', 'timezone', ''],
    ['11', 'Idioma', 'language', 'Deve vir de profile.defaultLanguage, não de um palpite do cliente.'],
    ['12', 'AM_Nome', 'amName', ''],
    ['13', 'Sales_Program', 'salesProgram', ''],
    ['14', 'Motivo_Abertura', 'reason', 'Campo principal de categorização.'],
    ['15', 'Task_BAU', 'taskType', 'Pode ser uma lista separada por vírgula.'],
    ['16', 'Justificativa', 'description ou nonImplementationReason', 'No fluxo BAU com os dois preenchidos, o backend concatena com " | ".'],
    ['17', 'Disponibilidade_Adv', 'availability', 'Datas formatadas e separadas por pipe. Alimenta o cálculo de urgência do e-mail.'],
  ], COLOR.modOrange, [0.08, 0.22, 0.28, 0.42], { monoCols: [0, 2] });

  h2_(ctx, 'A regra anti-apagamento', COLOR.modOrange);
  para_(ctx, 'É a regra de dados mais importante do projeto, e ela existe dos dois lados do contrato. ' +
    'Numa edição parcial, um campo ausente no payload significa "não mexa", nunca "apague":',
    { spaceAfter: 8 });

  code_(ctx, [
    '// Backend (regra de specs/data-models/db-schema.md)',
    'p.chave !== undefined ? p.chave : valorAntigoDaPlanilha',
    '',
    '// Front-end (regra de specs/data-models/api-payloads.md)',
    "// PROIBIDO ao editar:  campo: valorDoInput || \"\"",
    '// O fallback de string vazia transforma "nao mexi nisso"',
    '// em "apague isso" quando o payload chega ao backend.',
  ], 'Sem essa dupla precaução, editar o campo A de um caso zeraria silenciosamente os campos B a R.');

  callout_(ctx, 'Por que isso é fácil de quebrar',
    'O padrão valor || "" é um reflexo natural de quem escreve JavaScript defensivo, e no fluxo de ' +
    'CRIAÇÃO ele é inclusive correto — campos irrelevantes ao fluxo de descarte devem mesmo ir como ' +
    'string vazia. É só no fluxo de EDIÇÃO que ele vira destrutivo. Ao mexer em bau-form, tenha claro ' +
    'em qual dos dois caminhos você está.', COLOR.red);

  h2_(ctx, 'As colunas 19 a 21: a trilha de auditoria', COLOR.modOrange);
  para_(ctx, 'A spec fala em 18 colunas, mas a tabela real tem 21. As três últimas foram acrescentadas ' +
    'depois, para o histórico do TL Dashboard, e são criadas sob demanda por ensureBAUHistoryColumns() ' +
    'em Código.js — uma migração idempotente chamada em toda leitura e escrita que depende delas. ' +
    'Planilhas antigas, já em produção, ganham as colunas sozinhas na primeira chamada, sem passo ' +
    'manual.', { spaceAfter: 8 });

  table_(ctx, ['Índice', 'Coluna', 'Preenchida por', 'Conteúdo'], [
    ['18', 'Processed_By', 'updateBAUCaseStatus', 'E-mail real do TL, vindo de Session.getActiveUser() — não de um parâmetro.'],
    ['19', 'Processed_At', 'updateBAUCaseStatus', 'Data/hora da decisão. É o filtro de janela do histórico e do feed de atividade.'],
    ['20', 'Processed_Action', 'resolveProcessedAction', 'Decisão legível: APPROVED_CREATION, REJECTED_CREATION, CONFIRMED_DISCARD ou KEPT_ACTIVE.'],
  ], COLOR.modOrange, [0.08, 0.20, 0.24, 0.48], { monoCols: [0, 1] });

  callout_(ctx, 'Por que Processed_Action existe',
    'O status final sozinho é ambíguo. "CREATED" pode significar duas coisas muito diferentes: uma ' +
    'criação recém-aprovada, ou um pedido de descarte que o TL negou (o caso volta a CREATED). ' +
    'resolveProcessedAction() olha o par (status anterior, status novo) e resolve essa ambiguidade ' +
    'no momento da decisão, quando a informação ainda existe — depois seria impossível reconstruir.',
    COLOR.modOrange);

  h2_(ctx, 'Database_Snippets e Logs', COLOR.modOrange);
  table_(ctx, ['Aba', 'Colunas', 'Regra de acesso'], [
    ['Database_Snippets',
     'ID · User_LDAP · Type · Title · Content · LastUpdated · Active · Subject · isCode · isRich',
     'Toda escrita compara o User_LDAP da linha com o user da requisição e lança "Permission denied" se diferirem.'],
    ['Logs',
     'Timestamp · User · Version · Category · Action · Label · Value',
     'Append-only. Nenhuma operação do produto lê essa aba de volta.'],
  ], COLOR.modOrange, [0.20, 0.44, 0.36]);

  para_(ctx, 'Note que a checagem de posse dos snippets compara com o parâmetro user enviado pelo ' +
    'cliente. Ela impede um erro de aplicação, não um usuário mal-intencionado — a barreira real ' +
    'contra isso é o access DOMAIN do Web App. Ver seção 16.', { spaceAfter: 8 });
}

function sec12_(ctx) {
  h1_(ctx, '12', 'Ciclo de vida do caso BAU', COLOR.modBlue);

  para_(ctx, 'O fluxo BAU é a única parte do sistema com estado de negócio de verdade. Tudo o mais ' +
    '(notas, e-mails, scripts) é geração de conteúdo sem persistência. Aqui existe uma máquina de ' +
    'estados, com dois atores e transições restritas.', { spaceAfter: 10 });

  h2_(ctx, 'Os seis estados', COLOR.modBlue);
  table_(ctx, ['Status', 'Significado', 'Quem chega nele', 'Visível onde'], [
    ['PENDING_TL_CREATION', 'Aguardando o TL aprovar a abertura do caso.', 'Agente, via create_bau com requestType BAU.', 'Aba 1 do TL Dashboard.'],
    ['PENDING_TL_DISCARD', 'Aguardando o TL aprovar o descarte.', 'Agente, via create_bau com requestType DISCARD.', 'Aba 2 do TL Dashboard.'],
    ['CREATED', 'Abertura aprovada e caso criado.', 'TL, via updateBAUCaseStatus.', 'Histórico; some da fila.'],
    ['DISCARDED', 'Descarte confirmado.', 'TL, via updateBAUCaseStatus.', 'Histórico; some da fila.'],
    ['REJECTED', 'O TL recusou a ação pedida.', 'TL, via updateBAUCaseStatus.', 'Histórico; some da fila.'],
    ['CANCELED_BY_AGENT', 'O agente desistiu antes da avaliação.', 'Agente, via delete_bau.', 'Painel do próprio agente.'],
  ], COLOR.modBlue, [0.24, 0.24, 0.28, 0.24], { monoCols: [0] });

  h2_(ctx, 'Diagrama de transições', COLOR.modBlue);
  code_(ctx, [
    '                        (agente preenche o wizard, op=create_bau)',
    '                                        |',
    '                    requestType=BAU     |     requestType=DISCARD',
    '            +---------------------------+---------------------------+',
    '            v                                                       v',
    '  PENDING_TL_CREATION                                     PENDING_TL_DISCARD',
    '            |                                                       |',
    '   +--------+--------+                                     +--------+--------+',
    '   |                 |                                     |                 |',
    '   v                 v                                     v                 v',
    'CREATED          REJECTED                             DISCARDED           CREATED',
    '(aprovado)      (recusado)                            (confirmado)     (descarte negado,',
    '                                                                        caso segue ativo)',
    '',
    '  Processed_Action:                                    Processed_Action:',
    '  APPROVED_CREATION / REJECTED_CREATION                CONFIRMED_DISCARD / KEPT_ACTIVE',
    '',
    '  Em qualquer dos dois estados PENDING, antes da decisao do TL:',
    '  o agente pode chamar op=delete_bau  ->  CANCELED_BY_AGENT',
  ], 'Repare que "descarte negado" volta a CREATED: é exatamente por isso que a coluna Processed_Action existe (seção 11).');

  h2_(ctx, 'Regras de fila', COLOR.modBlue);
  bullets_(ctx, [
    'FIFO obrigatório: as filas são ordenadas pela coluna Data_Envio, do mais antigo para o mais recente. O TL atende primeiro quem espera há mais tempo.',
    'Separação estrita de abas: casos de abertura e de descarte nunca aparecem na mesma visualização. A aba de descarte usa um design simplificado, com a paleta de alerta suave da classe .discard-theme.',
    'getPendingBAUCases() varre a planilha e devolve apenas os dois estados PENDING — casos resolvidos deixam de existir para a fila no mesmo instante da decisão.',
  ]);

  h2_(ctx, 'Regra de segurança na edição', COLOR.modBlue);
  para_(ctx, 'O fluxo de edição de um caso pendente depende de scraping da tela do caso. Se o agente ' +
    'estiver com outro caso aberto, os dados capturados serão os do caso errado. Por isso a edição só ' +
    'pode começar depois de uma confirmação explícita, com texto fixado em spec:', { spaceAfter: 8 });

  callout_(ctx, 'Disclaimer obrigatório (specs/workflow/bau-lifecycle.md)',
    '"Atenção: Para editar as informações, você deve estar com a página deste Caso específico aberta. ' +
    'Caso contrário, os dados capturados estarão incorretos."', COLOR.red);

  para_(ctx, 'Esse aviso não pode ser um window.confirm: as regras de DOM proíbem pop-ups nativos, e a ' +
    'confirmação tem de usar o sistema de modais customizados do projeto (seção 19).', { spaceAfter: 8 });
}

function sec13_(ctx) {
  h1_(ctx, '13', 'Motor de e-mails dinâmicos', COLOR.modRed);

  para_(ctx, 'Cinco e-mails transacionais diferentes saem do sistema, e todos são renderizados a partir ' +
    'de um único arquivo de template. A alternativa — um template por tipo — foi rejeitada porque ' +
    'multiplicaria a manutenção de design por cinco.', { spaceAfter: 10 });

  h2_(ctx, 'Como funciona', COLOR.modRed);
  code_(ctx, [
    '// gas-backend/EmailEngine.js',
    'function sendDynamicTechSolEmail(destinatario, data, escalacaoId,',
    '                                 tipoEmail, authorEmailOverride) {',
    "  const template = HtmlService",
    "    .createHtmlOutputFromFile('EmailTemplateDynamic').getContent();",
    '',
    '  // 1. defaults: cor, icone, subtitulo, saudacao, assunto, selo de rodape',
    '  // 2. formatGASDate(): normaliza datas, inclusive listas separadas por " | "',
    '  // 3. getUrgencyHtml(): calcula o selo de prazo a partir de data.availability',
    '  // 4. switch (tipoEmail) { ... }  <- a unica parte que muda por evento',
    '  // 5. substitui os {{TOKEN}} no template e envia',
    '}',
  ], 'O template é um arquivo HTML com placeholders {{TOKEN}}; o motor decide os valores e faz a substituição antes do envio.');

  h2_(ctx, 'Os cinco tipos de evento', COLOR.modRed);
  table_(ctx, ['tipoEmail', 'Destinatário', 'Disparado por', 'Propósito'], [
    ['AGENT_BAU_SENT', 'O próprio agente', 'handleBAUEscalation, na criação', 'Confirma que o caso entrou na fila e aguarda a liderança.'],
    ['LEADERSHIP_BAU_RECEIVED', 'A liderança', 'Fluxo de escalação', 'Avisa que há um caso novo a avaliar, com selo de urgência conforme o prazo.'],
    ['AGENT_BAU_CREATED', 'O próprio agente', 'updateBAUCaseStatus, ao aprovar', 'Fecha o ciclo: a liderança criou o caso.'],
    ['AGENT_DISCARD_SENT', 'O próprio agente', 'Fluxo de descarte', 'Confirma que o pedido de descarte foi registrado.'],
    ['AGENT_DISCARD_DONE', 'O próprio agente', 'updateBAUCaseStatus, ao confirmar', 'Confirma que o descarte foi aprovado.'],
  ], COLOR.modRed, [0.24, 0.16, 0.28, 0.32], { monoCols: [0] });

  h2_(ctx, 'A calculadora de urgência', COLOR.modRed);
  para_(ctx, 'O e-mail da liderança traz um selo colorido calculado a partir da disponibilidade do ' +
    'anunciante (coluna 17). É a única lógica de negócio dentro do motor de e-mail:', { spaceAfter: 8 });

  table_(ctx, ['Faixa', 'Selo', 'Cor'], [
    ['Até 1 dia', 'URGENTE: Agendado para Hoje/Amanhã', 'Vermelho (#D93025 sobre #FCE8E6)'],
    ['Até 3 dias', 'ATENÇÃO: Agendado para os próximos 3 dias', 'Âmbar (#B06000 sobre #FEF7E0)'],
    ['Acima disso', 'STATUS VERDE: Agendado para +5 dias', 'Verde (#1E8E3E sobre #E6F4EA)'],
  ], COLOR.modRed, [0.20, 0.44, 0.36]);

  h2_(ctx, 'Rastreabilidade do remetente', COLOR.modRed);
  para_(ctx, 'Como o Web App roda com executeAs USER_DEPLOYING, Session.getActiveUser() dentro do motor ' +
    'devolveria sempre a conta que publicou a implantação — não quem de fato causou o e-mail. Por isso ' +
    'a assinatura tem um quinto parâmetro, authorEmailOverride, que o chamador preenche com o autor ' +
    'real da ação: o agente, no caso de uma escalação; o TL, no caso de uma decisão.', { spaceAfter: 8 });

  code_(ctx, [
    'const senderEmail = authorEmailOverride || Session.getActiveUser().getEmail();',
    "const senderLdap  = senderEmail ? senderEmail.split('@')[0] : 'Equipe BAU';",
  ], 'O e-mail continua saindo tecnicamente da conta publicadora; o override serve para a assinatura e a atribuição no corpo da mensagem.');

  h2_(ctx, 'Envio nunca derruba a operação', COLOR.modRed);
  para_(ctx, 'Em todos os pontos de disparo, o envio está isolado em try/catch e acontece DEPOIS da ' +
    'gravação na planilha. A ordem é deliberada: o comentário em BAU_Dashboard.js registra que uma ' +
    'falha de e-mail não pode mais derrubar a ação inteira, porque google.script.run reportaria erro ' +
    'ao cliente mesmo com o status já salvo — e o TL tentaria aprovar de novo um caso já aprovado.',
    { spaceAfter: 8 });

  code_(ctx, [
    '// padrao usado nos dois pontos de disparo',
    'sheet.getRange(...).setValue(newStatus);   // 1. persiste primeiro',
    '',
    'let emailSent = true;',
    'try {',
    "  sendDynamicTechSolEmail(agentEmail, emailData, id, 'AGENT_BAU_CREATED', tlEmail);",
    '} catch (e) {',
    '  emailSent = false;                       // 2. e-mail e best-effort',
    '  console.warn("Falha ao enviar email de confirmacao de status", e);',
    '}',
    'return { success: true, newStatus: newStatus, emailSent: emailSent };',
  ], 'O campo emailSent volta ao cliente, que pode avisar o usuário sem transformar isso em falha da operação.');
}

function sec14_(ctx) {
  h1_(ctx, '14', 'TL Dashboard', COLOR.green);

  para_(ctx, 'O TL Dashboard é, na prática, a segunda aplicação do projeto — e a única que não é ' +
    'injetada em lugar nenhum. É uma página HTML servida pelo próprio Apps Script, acessada por uma ' +
    'URL, com um modelo de comunicação e de segurança completamente diferente do bundle.',
    { spaceAfter: 10 });

  h2_(ctx, 'Como ela é servida', COLOR.green);
  code_(ctx, [
    '// gas-backend/Codigo.js, dentro de doGet(e)',
    "if (e.parameter.page === 'tl') {",
    "  return HtmlService.createHtmlOutputFromFile('TLDashboard')",
    "    .setTitle('Cases Wizard | Visao TL')",
    '    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)',
    "    .addMetaTag('viewport', 'width=device-width, initial-scale=1');",
    '}',
  ], 'O desvio acontece antes de qualquer roteamento por op=: ?page=tl e op= são caminhos mutuamente exclusivos do mesmo doGet.');

  h2_(ctx, 'A ponte nativa', COLOR.green);
  para_(ctx, 'A página não usa jsonpFetch. Ela chama funções do servidor diretamente, por ' +
    'google.script.run, que executa no contexto autenticado de quem carregou a página. Essa é a ' +
    'diferença que sustenta todo o controle de acesso do TL:', { spaceAfter: 8 });

  table_(ctx, ['Função', 'O que faz', 'Nota'], [
    ['getCurrentTLProfile()', 'Devolve o perfil de quem abriu o dashboard.', 'É literalmente um retorno de assertCallerIsOverhead(): valida e devolve o mesmo objeto, sem consulta extra.'],
    ['getPendingBAUCases()', 'Lista os casos nos dois estados PENDING.', 'Varre a planilha inteira a cada chamada — não há índice.'],
    ['updateBAUCaseStatus(id, newStatus)', 'Aplica a decisão do TL.', 'Sob LockService; grava a trilha de auditoria e dispara o e-mail (seção 13).'],
    ['getRecentActivity(limit)', 'Feed lateral das últimas decisões de qualquer TL.', 'Lê direto de BAU_form_data, sem planilha auxiliar — a trilha de auditoria já tem tudo.'],
    ['getWeeklyHistory(days)', 'Casos resolvidos na janela + métricas.', 'Uma única varredura alimenta lista, tempo médio de aprovação e ranking de agentes.'],
    ['recordTLPresence()', 'Heartbeat de presença do TL.', 'Grava no CacheService com TTL de 150 s.'],
    ['getActiveTLs()', 'Lista quem está com o dashboard aberto agora.', 'Ver a nota sobre presença, abaixo.'],
  ], COLOR.green, [0.26, 0.32, 0.42], { monoCols: [0] });

  h2_(ctx, 'Presença sem WebSocket', COLOR.green);
  para_(ctx, 'O Apps Script não oferece push nem WebSocket, então "quem está online agora" é resolvido ' +
    'por heartbeat sobre o polling que a página já faz. Cada TL com o dashboard aberto grava a própria ' +
    'chave no CacheService com TTL curto, renovada a cada tick de 60 s do loadCases(). Quem não renova ' +
    'simplesmente desaparece quando a chave expira — não há lista de "saída" a manter.', { spaceAfter: 8 });

  callout_(ctx, 'O detalhe elegante',
    'O CacheService não permite listar chaves existentes. A solução foi inverter a busca: os candidatos ' +
    'vêm do universo finito de LDAPs de liderança na planilha People, e cache.getAll() filtra sozinho ' +
    'quem não tem heartbeat vivo — chave expirada simplesmente não aparece no resultado. Nenhum índice ' +
    'auxiliar precisou ser mantido. O TTL de 150 s é 2,5x o intervalo de refresh, dando folga para uma ' +
    'renovação atrasada sem derrubar o usuário da lista.', COLOR.green);

  h2_(ctx, 'Métricas do histórico', COLOR.green);
  para_(ctx, 'getWeeklyHistory faz uma varredura só e produz três coisas ao mesmo tempo. A regra de ' +
    'classificação vale a pena registrar: entram nos totais apenas as ações que de fato resolveram um ' +
    'caso — APPROVED_CREATION, REJECTED_CREATION e CONFIRMED_DISCARD. KEPT_ACTIVE (pedido de descarte ' +
    'negado) fica de fora, porque o caso continua ativo e não foi resolvido no sentido que o TL espera ' +
    'ver ali.', { spaceAfter: 8 });

  bullets_(ctx, [
    'Lista de casos resolvidos na janela, mais recentes primeiro.',
    'Tempo médio de aprovação, calculado só sobre APPROVED_CREATION, com uma casa decimal.',
    'Ranking dos cinco agentes que mais enviaram casos na janela — contando todo envio, independentemente do status atual.',
  ]);
}

function sec15_(ctx) {
  h1_(ctx, '15', 'Central de Conteúdo', COLOR.modGreen);

  para_(ctx, 'A Central de Conteúdo é a terceira aplicação do projeto e o subsistema mais recente. ' +
    'Ela resolve um problema que não é técnico, mas de processo: até existir, mudar um link, um passo ' +
    'de script de ligação ou um modelo de e-mail exigia editar código e fazer deploy. Hoje esse ' +
    'conteúdo é dado, editável por quem tem permissão, com fluxo de proposta e aprovação.',
    { spaceAfter: 10 });

  h2_(ctx, 'Onde ela vive', COLOR.modGreen);
  specList_(ctx, [
    ['Interface', 'gas-backend/ContentDashboard.html, servida por ?page=content'],
    ['Lógica', 'gas-backend/ContentAPI.js (cerca de 1.000 linhas)'],
    ['Leitura pelo app', 'op=content_public no roteador JSONP'],
    ['Escrita e curadoria', 'google.script.run a partir do dashboard'],
    ['Sementes iniciais', 'gas-backend/ContentSeed_*.js e a pasta seeds/'],
  ], COLOR.modGreen);

  callout_(ctx, 'A mesma assimetria da seção 14',
    'Vale reparar no padrão que se repete: leitura pública passa pelo JSONP, porque qualquer agente ' +
    'precisa dela; escrita e curadoria passam pela ponte nativa, onde o servidor conhece a identidade ' +
    'real de quem chama. É a mesma separação que sustenta o TL Dashboard.', COLOR.modGreen);

  h2_(ctx, 'Os módulos editáveis', COLOR.modGreen);
  para_(ctx, 'A constante CONTENT_MODULES define o universo do que pode ser editado sem deploy: ' +
    'links, call_script, email_template, note_template e tips. Idiomas possíveis: ALL, PT, ES e EN.',
    { spaceAfter: 10 });

  h2_(ctx, 'As três abas de dados', COLOR.modGreen);
  table_(ctx, ['Aba', 'Colunas', 'Papel'], [
    ['Content_Items',
     'ID · Module · Key · Field · Lang · Label · Value · Version · Status · Published_By · Published_At · Sort_Order · Lineage',
     'O conteúdo publicado. Cada publicação é uma LINHA NOVA, não uma edição — o histórico é o próprio acúmulo de versões.'],
    ['Content_Drafts',
     'Draft_ID · Item_ID · Module · Key · Field · Lang · Label · Value · Status · Proposed_By · Proposed_At · Reviewed_By · Reviewed_At · Review_Note · Locked_By · Locked_At · Sort_Order · Action',
     'As propostas em andamento, com trilha de revisão e trava de edição.'],
    ['Content_Access',
     'LDAP · Role · Active · Granted_By · Granted_At',
     'Quem pode editar o quê. Gerenciada pela própria tela, sem deploy.'],
  ], COLOR.modGreen, [0.18, 0.44, 0.38]);

  h3_(ctx, 'Por que existe uma coluna Lineage');
  para_(ctx, 'É a decisão de modelagem mais sutil do subsistema, e o comentário no código explica o ' +
    'porquê: Lineage é a identidade estável do item ao longo das versões. O ID muda a cada publicação, ' +
    'porque cada versão é uma linha nova. E Key não serve como identidade: em links, Key é a ' +
    'categoria, compartilhada por dezenas de itens.', { spaceAfter: 8 });

  callout_(ctx, 'O que a Lineage evita',
    'Sem essa coluna, um rollback arquivaria a categoria inteira em vez de um link só. É o tipo de ' +
    'erro que só aparece em produção, no dia em que alguém precisa desfazer uma mudança.',
    COLOR.modGreen);

  h2_(ctx, 'O ciclo de vida de uma proposta', COLOR.modGreen);
  code_(ctx, [
    '  saveContentDraft()        -> draft      (rascunho, trava de 10 min)',
    '           |',
    '  submitContentDraft()      -> pending    (notifyApprovers_ avisa quem aprova)',
    '           |',
    '     +-----+-----+',
    '     |           |',
    '  approve      reject',
    '     |           |',
    '     v           v',
    '  approved    rejected',
    '     |',
    '     v',
    '   live        (vira uma linha nova em Content_Items)',
    '     |',
    '     v',
    '  archived     (quando uma versão mais nova a substitui;',
    '                rollbackContentItem() traz uma versão arquivada de volta)',
  ], 'Estados de CONTENT_STATUS. Cada transição vai para o log de eventos por logContentEvent_.');

  h3_(ctx, 'Upsert e remove são intenções diferentes');
  para_(ctx, 'A coluna Action carrega o que a proposta faz com o item quando aprovada: upsert ou ' +
    'remove. O código registra que essa coluna é explícita de propósito, em vez de inferir a intenção ' +
    'a partir de um valor vazio — "tirar do ar" e "publicar um valor em branco" são coisas distintas, ' +
    'e adivinhar erraria uma das duas.', { spaceAfter: 10 });

  h2_(ctx, 'Papéis e permissões', COLOR.modGreen);
  para_(ctx, 'A matriz CONTENT_ROLES é independente do isOverhead da seção 16: aqui a permissão é por ' +
    'módulo, não por senioridade.', { spaceAfter: 8 });

  table_(ctx, ['Papel', 'Pode propor em', 'Aprova?', 'Gerencia acessos?'], [
    ['ADMIN', 'Todos os módulos', 'Sim', 'Sim'],
    ['TL', 'Todos os módulos', 'Sim', 'Não'],
    ['QA', 'call_script e note_template', 'Não', 'Não'],
    ['WFM', 'links', 'Não', 'Não'],
  ], COLOR.modGreen, [0.16, 0.40, 0.20, 0.24], { monoCols: [0] });

  para_(ctx, 'A regra geral é que ninguém aprova a própria proposta. O ADMIN é a única exceção, e o ' +
    'código explica a razão: hoje é o único papel de fato ativo, e travar o próprio fluxo não ' +
    'protegeria ninguém. A aprovação vai para o log como qualquer outra.', { spaceAfter: 8 });

  callout_(ctx, 'A semente de acesso',
    'CONTENT_BOOTSTRAP_ADMIN existe para resolver o problema do ovo e da galinha: sem ele a tela ' +
    'nasceria inacessível para todo mundo, inclusive para quem precisaria cadastrar os demais. É um ' +
    'LDAP fixo no código, e o único privilégio que não vem da planilha.', COLOR.yellow);

  h2_(ctx, 'A trava de edição é cooperativa', COLOR.modGreen);
  para_(ctx, 'O Sheets não tem bloqueio por linha. A concorrência entre editores é resolvida com uma ' +
    'trava cooperativa gravada no próprio rascunho (Locked_By e Locked_At), com TTL de 10 minutos ' +
    '(CONTENT_LOCK_TTL_MS). Ela expira sozinha justamente para nunca deixar um item preso caso alguém ' +
    'feche a aba no meio da edição.', { spaceAfter: 8 });

  callout_(ctx, 'Não confundir com o LockService',
    'São mecanismos diferentes para problemas diferentes. O LockService da seção 17 serializa escritas ' +
    'concorrentes por milissegundos, no servidor. Esta trava é de UX: impede que duas pessoas editem o ' +
    'mesmo rascunho por minutos, e é cooperativa — não impede a escrita, sinaliza a intenção.',
    COLOR.modGreen);

  h2_(ctx, 'Validação antes de publicar', COLOR.modGreen);
  para_(ctx, 'Conteúdo editável por humanos precisa de guardas, porque um placeholder errado só ' +
    'apareceria na frente do anunciante. Duas validações rodam antes de uma proposta virar conteúdo ' +
    'vivo, e ambas têm uma função de checagem exposta à tela para dar retorno enquanto se digita:',
    { spaceAfter: 8 });

  table_(ctx, ['Validação', 'Função', 'O que verifica'], [
    ['Modelo de nota', 'assertValidNoteTemplate_ / checkNoteTemplate',
     'Que o modelo corresponde ao sub-status declarado, conforme a definição de campos em ContentFields_Notes.js.'],
    ['Modelo de e-mail', 'assertValidEmailTemplate_ / checkEmailTemplate',
     'Os placeholders no formato [TOKEN], via expressão regular, e a coerência com o idioma.'],
  ], COLOR.modGreen, [0.20, 0.34, 0.46]);

  h2_(ctx, 'Sementes: migrar conteúdo sem perder o que já existia', COLOR.modGreen);
  para_(ctx, 'Cada módulo migrado para a Central nasceu de um seed: um script que lê o conteúdo que ' +
    'estava hardcoded no front-end e o transforma nas linhas iniciais de Content_Items. Os geradores ' +
    'ficam em scripts/generate-*-seed.mjs, a carga no backend em ContentSeed_*.js, e o resultado ' +
    'versionado na pasta seeds/.', { spaceAfter: 8 });

  bullets_(ctx, [
    'O gerador roda sem argumentos: a fonte é sempre o próprio código do módulo, para o seed não divergir do que estava no ar.',
    'Cada migração tem um teste de ida e volta (npm run test:emails, test:call-script, test:note-templates), que confirma que o conteúdo migrado reproduz exatamente o comportamento anterior.',
    'seedContentModule() é o ponto de entrada no backend, chamado uma vez por módulo.',
  ]);

  callout_(ctx, 'Por que o teste de round-trip importa',
    'A migração troca a fonte do conteúdo sem que o agente perceba diferença. O único jeito de provar ' +
    'isso é comparar a saída antes e depois, item a item — e é exatamente o que esses harnesses fazem.',
    COLOR.modGreen);

  h2_(ctx, 'Preferências do agente', COLOR.modGreen);
  para_(ctx, 'Ao lado da Central, e pelo mesmo espírito de "configurável sem deploy", o roteador ganhou ' +
    'get_user_prefs e save_user_prefs: um blob JSON por pessoa, uma linha por LDAP. Hoje guarda os ' +
    'atalhos configuráveis do Ctrl+K, mas nasceu genérico de propósito, para que som, idioma e ordem ' +
    'da pílula possam migrar para lá sem exigir backend novo. A decisão está registrada no ADR 0002.',
    { spaceAfter: 8 });
}

function sec16_(ctx) {
  h1_(ctx, '16', 'Segurança e permissões', COLOR.red);

  para_(ctx, 'O modelo de segurança tem três camadas, e entender a diferença entre elas é o que separa ' +
    'uma alteração segura de uma brecha.', { spaceAfter: 10 });

  h2_(ctx, 'Camada 1: o perímetro do Workspace', COLOR.red);
  para_(ctx, 'O Web App é publicado com access DOMAIN. Só usuários autenticados do mesmo domínio Google ' +
    'Workspace conseguem chamar qualquer coisa — a API não é pública na internet, e não existe um ' +
    'caminho anônimo. Esta é a barreira real do sistema; tudo o mais é refinamento dentro dela.',
    { spaceAfter: 10 });

  h2_(ctx, 'Camada 2: identidade real vs. identidade declarada', COLOR.red);
  para_(ctx, 'É a distinção mais importante da seção. Existem duas formas de o backend saber quem está ' +
    'chamando, e elas não têm o mesmo valor:', { spaceAfter: 8 });

  table_(ctx, ['Fonte', 'Como chega', 'Confiabilidade', 'Uso legítimo'], [
    ['Parâmetro do cliente (p.user, p.ldap)',
     'Query string da chamada JSONP.',
     'Baixa: qualquer usuário do domínio pode escrever o que quiser ali.',
     'Atribuição e conveniência: saber de quem é o snippet, quem enviou o caso, quem gerou o log.'],
    ['Session.getActiveUser().getEmail()',
     'Resolvido no servidor, a partir da sessão autenticada.',
     'Alta: é o Google que afirma, não o cliente.',
     'Autorização: toda decisão de "esta pessoa pode fazer isso?".'],
  ], COLOR.red, [0.24, 0.22, 0.26, 0.28]);

  code_(ctx, [
    '// gas-backend/Codigo.js',
    '// Garante que quem esta chamando (identidade REAL, vinda de',
    '// Session.getActiveUser(), nao de um parametro enviado pelo cliente)',
    '// tem papel de lideranca.',
    'function assertCallerIsOverhead() {',
    '  const email = Session.getActiveUser().getEmail();',
    "  const ldap  = email ? email.split('@')[0].toLowerCase().trim() : '';",
    '',
    "  if (!ldap) throw new Error('Nao foi possivel identificar o usuario autenticado.');",
    '',
    '  const profile = getUserProfileByLdap(ldap);',
    '  if (!profile.isOverhead) {',
    "    throw new Error('Acesso negado: esta acao e restrita a lideranca (TL).');",
    '  }',
    '  return profile;',
    '}',
  ], 'Toda função exposta a google.script.run pelo TL Dashboard começa chamando isto. É a única porta de autorização do sistema.');

  callout_(ctx, 'Regra ao adicionar funcionalidade',
    'Se uma ação nova é restrita à liderança, ela precisa viver no canal google.script.run e começar ' +
    'com assertCallerIsOverhead(). Expor a mesma ação como um op= no roteador JSONP a tornaria ' +
    'executável por qualquer usuário do domínio, bastando forjar o parâmetro user.', COLOR.red);

  h2_(ctx, 'Camada 3: papéis na planilha People', COLOR.red);
  para_(ctx, 'A aba People é o diretório de autorização. getUserProfileByLdap() varre a aba procurando ' +
    'o LDAP e devolve um perfil. Duas regras derivadas merecem atenção:', { spaceAfter: 8 });

  code_(ctx, [
    '// Regra 1 - Permissoes (Overhead). Bloqueia APENAS Agent e Apprentice.',
    'const catLower = roleCategory.toLowerCase();',
    "const isOverhead = !(catLower.includes('agent') || catLower.includes('apprentice'));",
    '',
    '// Regra 2 - Idioma padrao, derivado do segmento',
    "let lang = 'PT-BR';",
    "if      (segLower === 'es') lang = 'ES';",
    "else if (segLower === 'en') lang = 'EN';",
  ], 'A regra de overhead é por lista de exclusão, não de inclusão: um papel novo nasce com privilégio de liderança até que alguém o adicione à exclusão.');

  callout_(ctx, 'Risco a conhecer',
    'A lógica de isOverhead é permissiva por construção. Se amanhã surgir uma categoria de papel nova ' +
    'que não contenha "agent" nem "apprentice" no nome — digamos "Intern" ou "Contractor" —, todos os ' +
    'seus membros ganham acesso de liderança automaticamente, sem nenhuma mudança de código. É uma ' +
    'decisão consciente de facilitar o cadastro, e deve ser revisitada a cada papel novo na planilha.',
    COLOR.red);

  h2_(ctx, 'Fallback restritivo', COLOR.red);
  para_(ctx, 'Quando o LDAP não é encontrado, ou quando a aba People não existe, o perfil devolvido é um ' +
    'objeto de segurança mínima: role "Unknown", roleCategory "Agent", segment "PT", ' +
    'defaultLanguage "PT-BR" e isOverhead false. Desconhecido é tratado como agente sem privilégio.',
    { spaceAfter: 8 });

  h2_(ctx, 'O que NÃO é segurança', COLOR.red);
  bullets_(ctx, [
    'A lista ADMINS em src/modules/shared/config.js é conveniência de interface: ela decide o que aparece na tela, não o que pode ser executado. Está no bundle, legível por qualquer um que abra o DevTools.',
    'A checagem de posse nos snippets ("Permission denied") compara com o parâmetro user enviado pelo cliente. Ela previne um erro de aplicação, não um usuário mal-intencionado; quem contém isso de verdade é o access DOMAIN.',
    'isCurrentUserOverhead() no front-end controla exibição de UI administrativa. Nunca deve ser a única barreira antes de uma ação com efeito.',
  ]);
}

function sec17_(ctx) {
  h1_(ctx, '17', 'Concorrência e automações', COLOR.modTeal);

  h2_(ctx, 'LockService: a serialização das escritas', COLOR.modTeal);
  para_(ctx, 'Duas escritas simultâneas na mesma planilha podem se sobrepor, e o JSONP sobre GET não ' +
    'oferece nenhuma proteção contra duplo clique. As duas escritas críticas do fluxo BAU rodam sob ' +
    'trava de script:', { spaceAfter: 8 });

  code_(ctx, [
    'const lock = LockService.getScriptLock();',
    'try {',
    '  lock.waitLock(10000);      // espera ate 10s por acesso exclusivo',
    '  /* leitura + escrita na planilha */',
    '} finally {',
    '  lock.releaseLock();        // liberado mesmo se algo lancar no meio',
    '}',
  ], 'Padrão usado em handleBAUEscalation (criação) e em updateBAUCaseStatus (decisão do TL).');

  bullets_(ctx, [
    'getScriptLock é global ao projeto: serializa todos os chamadores, não só o mesmo usuário. É o que se quer aqui, já que o recurso disputado é a planilha inteira.',
    'O releaseLock em finally é obrigatório. Sem ele, uma exceção no meio da escrita deixaria a trava presa até o timeout, bloqueando todo mundo.',
    'A espera de 10 s é generosa para o volume atual, mas é um limite real: em um pico, uma chamada pode estourar e devolver erro. O front trata isso como qualquer outra falha de operação.',
  ]);

  h2_(ctx, 'Alerta de volume da fila', COLOR.modTeal);
  para_(ctx, 'BAU_Alerts.js roda por gatilho de tempo, conta a fila combinada (criação + descarte ' +
    'pendentes) e avisa quando ela passa do limite. O detalhe interessante é o controle de repetição:',
    { spaceAfter: 8 });

  code_(ctx, [
    'const BAU_VOLUME_ALERT_THRESHOLD = 10;',
    '',
    "const alreadyActive = props.getProperty('BAU_VOLUME_ALERT_ACTIVE') === 'true';",
    '',
    'if (pendingCount > BAU_VOLUME_ALERT_THRESHOLD) {',
    '  if (!alreadyActive) {                 // so na TRANSICAO de cruzar o limite',
    '    sendBAUVolumeAlertEmail(...);',
    "    props.setProperty('BAU_VOLUME_ALERT_ACTIVE', 'true');",
    '  }',
    '} else if (alreadyActive) {',
    "  props.setProperty('BAU_VOLUME_ALERT_ACTIVE', 'false');   // rearma",
    '}',
  ], 'Latch com histerese via PropertiesService: alerta na subida, rearme na descida. Sem isso, viraria spam a cada checagem enquanto a fila continuasse alta.');

  callout_(ctx, 'Por que a URL do dashboard é fixa no alerta',
    'O e-mail de alerta não usa ScriptApp.getService().getUrl(): rodando por gatilho de tempo, essa ' +
    'chamada pode devolver a URL de outra implantação do mesmo projeto — a de desenvolvimento em vez da ' +
    'de produção. O link foi fixado no ID de implantação de produção de propósito. Se esse ID for ' +
    'rotacionado, o link precisa ser atualizado à mão.', COLOR.yellow);

  h2_(ctx, 'Backup semanal (cold storage)', COLOR.modTeal);
  para_(ctx, 'runWeeklyBackup() move os casos já finalizados (CREATED e DISCARDED) da planilha ativa ' +
    'para uma planilha de arquivo separada, na aba Archive_BAU. Não é só higiene: como toda leitura do ' +
    'sistema faz getDataRange().getValues() na tabela inteira, o custo de cada operação cresce ' +
    'linearmente com o histórico. O arquivamento é o que mantém isso viável.', { spaceAfter: 8 });

  bullets_(ctx, [
    'A varredura vai de baixo para cima. Se apagasse a linha 2 primeiro, a linha 3 viraria a 2 e o laço perderia o passo.',
    'A escrita no arquivo é em lote (um setValues com todas as linhas) para não estourar o tempo de execução.',
    'A aba de destino é criada com o cabeçalho da origem, se ainda não existir.',
    'Casos pendentes nunca são movidos, independentemente da idade.',
  ]);

  h2_(ctx, 'Gatilhos: o passo manual inevitável', COLOR.modTeal);
  para_(ctx, 'Tanto setupWeeklyBackupTrigger() quanto setupBAUVolumeAlertTrigger() existem para criar ' +
    'os acionadores por código, em vez de por cliques na interface. Ambas são idempotentes: rodar de ' +
    'novo substitui o acionador existente em vez de duplicá-lo.', { spaceAfter: 8 });

  callout_(ctx, 'Não dá para automatizar isto',
    'Criar acionadores exige uma execução autorizada interativa: clasp push e clasp deploy não ' +
    'conseguem fazê-lo. Depois de reconfigurar o projeto Apps Script — ou de trocar a conta que o ' +
    'publica — alguém precisa abrir o editor, selecionar essas duas funções no dropdown e executá-las ' +
    'uma vez. Se isso for esquecido, o backup e o alerta simplesmente param de acontecer, sem nenhum ' +
    'erro visível.', COLOR.red);
}

function sec18_(ctx) {
  h1_(ctx, '18', 'Resiliência e degradação', COLOR.modGreen);

  para_(ctx, 'O Case Wizard roda dentro de uma aplicação de terceiro com instabilidade conhecida, sobre ' +
    'um transporte sem garantias e um backend com quotas. A postura de projeto que resulta disso é ' +
    'consistente: nunca bloquear, nunca perder o trabalho do usuário e nunca deixar um erro de ' +
    'infraestrutura parecer um erro do agente.', { spaceAfter: 10 });

  h2_(ctx, 'Cache-first na Biblioteca Pessoal', COLOR.modGreen);
  para_(ctx, 'SnippetService lê do localStorage imediatamente e sincroniza com a planilha em segundo ' +
    'plano. O agente nunca espera a rede para ver os próprios snippets. Uma trava isMutating impede ' +
    'que uma resposta atrasada do servidor sobrescreva uma edição em andamento — o clássico problema ' +
    'de escrita perdida em sincronização otimista.', { spaceAfter: 10 });

  h2_(ctx, 'Rascunhos em duas camadas', COLOR.modGreen);
  table_(ctx, ['Camada', 'Chave', 'Quando grava', 'Recupera de'], [
    ['Estacionamento', 'cw_notes_parking_lot', 'Quando o agente salva ou troca de contexto. Guarda até 5 (MAX_DRAFTS).',
     'Trabalho deliberadamente pausado.'],
    ['Emergência', 'cw_notes_emergency_save', 'Continuamente, durante a edição.',
     'Fechamento inesperado da aba, recarregamento do CRM, travamento do hospedeiro.'],
  ], COLOR.modGreen, [0.18, 0.26, 0.34, 0.22], { monoCols: [1] });

  para_(ctx, 'A segunda camada existe especificamente por causa da instabilidade do CRM: como o overlay ' +
    'morre junto com a página, a única defesa possível é gravar antes de precisar.', { spaceAfter: 10 });

  h2_(ctx, 'Watchdogs', COLOR.modGreen);
  bullets_(ctx, [
    'jsonpFetch: timeout duro de 15 s, para que um Apps Script bloqueado vire uma mensagem de erro em vez de um skeleton eterno (seção 09).',
    'TL Dashboard: o carregamento inicial dispara em DOMContentLoaded, e não em window.onload, para não ficar refém de um recurso pendente da página.',
    'ensureNoteCardIsOpen e openAndClearEmail: laços de verificação com limite, para que um elemento que nunca aparece termine em falha silenciosa em vez de laço infinito.',
  ]);

  h2_(ctx, 'Degradação por dependência', COLOR.modGreen);
  table_(ctx, ['Se isto falhar', 'O que acontece', 'O agente percebe?'], [
    ['A API JSONP inteira', 'Módulos de conteúdo local (Notes, Call Script, Timezone) continuam funcionando; BAU Central e Biblioteca ficam degradados.', 'Sim: toast de erro e skeleton que termina em 15 s.'],
    ['A aba Tips', 'A UI usa FALLBACK_TIPS ("Processando...", "Mantenha o foco!").', 'Não.'],
    ['A aba Content_Items', 'O painel de avisos e a faixa de disponibilidade mostram o último cache; se não houver, ficam vazios.', 'Não.'],
    ['A aba People', 'Todo mundo vira o perfil de fallback: Agent, PT-BR, sem privilégio.', 'Só a liderança, ao perder acesso ao dashboard.'],
    ['O scraping de um campo', 'O campo fica vazio para preenchimento manual, com um console.warn.', 'Sim, ao ver o formulário.'],
    ['O envio de e-mail', 'A operação é concluída e persistida; emailSent volta false.', 'Depende de o cliente exibir o aviso.'],
    ['O áudio', 'O boot continua normalmente; só não há som.', 'Não.'],
  ], COLOR.modGreen, [0.20, 0.48, 0.32]);

  callout_(ctx, 'Princípio a preservar',
    'Repare no padrão: nenhuma falha de infraestrutura derruba a aplicação inteira, e quase nenhuma ' +
    'exige ação do agente. Ao adicionar uma dependência nova, pergunte antes qual linha desta tabela ' +
    'ela vai ocupar — e se a resposta for "a tela para de funcionar", o desenho precisa mudar.',
    COLOR.modGreen);
}

function sec19_(ctx) {
  h1_(ctx, '19', 'Design system e camada de UI', COLOR.modPink);

  para_(ctx, 'A interface não usa framework algum. É Vanilla JS com CSS-in-JS, e a coerência visual vem ' +
    'de fábricas compartilhadas em vez de componentes declarativos. As regras estão em ' +
    'specs/ui-ux/design-system.md e specs/ui-ux/dom-standards.md.', { spaceAfter: 10 });

  h2_(ctx, 'Identidade visual', COLOR.modPink);
  specList_(ctx, [
    ['Estética base', 'Liquid Glass (glassmorphism), na linha do Material 3 / Gemini'],
    ['Painéis de destaque', 'backdrop-filter: blur(12px) sobre fundos translúcidos, tipo rgba(255,255,255,0.1)'],
    ['Fluxo padrão (criação BAU)', 'Auras e brilhos em azul, via pseudo-elemento ::before'],
    ['Fluxo de descarte', 'Classe .discard-theme, com paleta de alerta suave (laranja/coral, #FCE8E6)'],
    ['Cores por módulo', 'Objeto COLORS em shared/command-center.js — a mesma paleta deste documento'],
  ], COLOR.modPink);

  para_(ctx, 'A escolha de cor no fluxo de descarte tem intenção explícita na spec: sinalizar um ' +
    'caminho secundário e destrutivo sem parecer um erro de sistema agressivo.', { spaceAfter: 10 });

  h2_(ctx, 'Fábricas compartilhadas', COLOR.modPink);
  table_(ctx, ['Fábrica', 'O que padroniza'], [
    ['createStandardHeader (header-factory.js)', 'O cromo de janela: barra de gradiente nas quatro cores, título, versão, botão de ajuda e botão de fechar. Também constrói o overlay de ajuda a partir de um texto passado na criação.'],
    ['toggleGenieAnimation (animations.js)', 'A abertura e o fechamento em "gênio da lâmpada", calculando a geometria entre o botão de origem na pílula e o centro da tela. Toda janela do produto usa a mesma transição.'],
    ['createEmptyState (dom-utils.js)', 'Estados vazios com ícone, título e subtítulo, para que "nada aqui ainda" tenha a mesma cara em todo lugar.'],
    ['createGoogleSelect (notes-bridge.js)', 'Selects com a aparência do Material, incluindo agrupamento por optgroup.'],
    ['showToast (utils.js)', 'O único canal de notificação transitória do produto.'],
  ], COLOR.modPink, [0.34, 0.66]);

  h2_(ctx, 'O sistema de movimento', COLOR.modPink);
  para_(ctx, 'A animação do projeto passou por uma auditoria que a transformou de valores literais ' +
    'espalhados em um sistema fechado. Hoje existem quatro curvas canônicas, definidas como variáveis ' +
    'CSS em shared/utils.js, e nenhuma transição nova deveria inventar uma quinta:', { spaceAfter: 8 });

  table_(ctx, ['Token', 'Curva', 'Quando usar'], [
    ['--cw-ease-standard', 'cubic-bezier(0.4, 0, 0.2, 1)', 'Material padrão. É a curva mais usada do projeto.'],
    ['--cw-ease-decelerate', 'cubic-bezier(0.19, 1, 0.22, 1)', 'Entrada — é a curva do genie abrindo.'],
    ['--cw-ease-accelerate', 'cubic-bezier(0.5, 0, 1, 1)', 'Saída — a curva do genie fechando.'],
    ['--cw-ease-spring', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'Bounce e overshoot, quando algo deve assentar com mola.'],
  ], COLOR.modPink, [0.26, 0.34, 0.40], { monoCols: [0, 1] });

  bullets_(ctx, [
    'Toda transição declara as propriedades explicitamente. transition: all é proibido — ele anima propriedades que ninguém pretendia animar e é uma fonte silenciosa de engasgo.',
    'prefers-reduced-motion: reduce é respeitado em toda a superfície animada. Foi justamente por não terem essa cobertura que o Onboarding e o Changelog acabaram unificados na wizard-shell (seção 07).',
    'A duração fica junto do token, não espalhada: o genie tem OPEN_MS e CLOSE_MS próprios em animations.js.',
  ]);

  h2_(ctx, 'Proibições de UX', COLOR.modPink);
  callout_(ctx, 'Sem pop-ups nativos',
    'window.alert, window.confirm e window.prompt são proibidos. O motivo é concreto, não estético: um ' +
    'diálogo nativo bloqueia a thread da página HOSPEDEIRA, congelando o CRM do agente junto. Toda ' +
    'confirmação usa o sistema de modais customizados do projeto, com backdrop blur.', COLOR.red);

  bullets_(ctx, [
    'Sem arquivos .css externos: estilos vivem como objetos JavaScript em shared/utils.js, ou como tags <style> injetadas quando é preciso pseudo-seletor (:hover, ::before).',
    'Toda chamada a jsonpFetch precisa de um estado visual de carregamento associado. Nenhuma espera silenciosa.',
    'Na transição para o modo de edição, uma cortina de loading bloqueante cobre o formulário até o DOM estar 100% populado com os dados antigos — o usuário nunca vê os campos piscando enquanto preenchem.',
    'No TL Dashboard, aprovar ou rejeitar exibe skeleton ou spinner enquanto a fila é recarregada.',
    'Botões são desabilitados temporariamente durante a ação que dispararam.',
    'Selects com listas longas (motivos de descarte) usam obrigatoriamente <optgroup> para agrupar.',
  ]);

  h2_(ctx, 'Scroll lock com contagem de referências', COLOR.modPink);
  para_(ctx, 'Sempre que um overlay abre, o body recebe overflow: hidden para evitar rolagem dupla com ' +
    'a página de fundo, e o container gerencia o próprio overflow-y. Como overlays podem se empilhar, ' +
    'dom-utils.js mantém um contador (scrollLockCount) em vez de um booleano: o scroll só é liberado ' +
    'quando o último overlay fecha. Um booleano destravaria a página no primeiro fechamento, com um ' +
    'modal ainda aberto por cima.', { spaceAfter: 8 });
}

function sec20_(ctx) {
  h1_(ctx, '20', 'Build, deploy e ambientes', COLOR.modPurple);

  callout_(ctx, 'Não existe localhost',
    'O projeto roda injetado em um ambiente de produção de terceiro. Não há como servir o CRM ' +
    'localmente, então não há ciclo de desenvolvimento local no sentido usual: testar significa ' +
    'publicar a versão de desenvolvimento e injetá-la no CRM real com o bookmarklet de DEV.',
    COLOR.modPurple);

  h2_(ctx, 'Build', COLOR.modPurple);
  code_(ctx, [
    '// package.json',
    '"build": "esbuild src/app.js --bundle --minify --outfile=dist/bundle.js',
    '          --define:__CW_BUILD_ENV__=\'\\"production\\"\'"',
    '"dev":   "esbuild src/app.js --bundle --outfile=dist/bundle-dev.js',
    '          --define:__CW_BUILD_ENV__=\'\\"development\\"\'"',
  ], 'esbuild é a única dependência de build. O --define é o que decide com qual backend o bundle vai falar — ver "Roteamento de ambiente", abaixo.');

  para_(ctx, 'Rodar o build à mão antes de commitar não é necessário: o GitHub Actions o executa a ' +
    'cada push. Há também harnesses de teste em Node (npm run test:content, test:call-script, ' +
    'test:emails, test:note-templates, test:shortcuts, test:prefs) e dois smokes de Playwright sobre ' +
    'o mock-crm.html (smoke:shortcuts, smoke:wizards). Não há runner: cada script sai com código ' +
    'diferente de zero em caso de falha. Não há lint configurado.', { spaceAfter: 10 });

  h2_(ctx, 'O pipeline: backend primeiro, sempre', COLOR.modPurple);
  code_(ctx, [
    '.github/workflows/deploy.yml   (gatilho: push em main ou refactor-structure)',
    '',
    'JOB 1  deploy-backend-gas       (roda nas DUAS branches)',
    '  checkout -> node 18 -> npm install -g @google/clasp',
    '  escreve .clasprc.json a partir do secret CLASPRC_JSON',
    '  valida o JSON com jq   (falha aqui, com mensagem clara, se o secret expirou)',
    '  clasp push -f          -> atualiza o HEAD do projeto Apps Script',
    '  se ref = refactor-structure -> bash scripts/promote-deployment.sh (DEV)',
    '  se ref = main               -> bash scripts/promote-deployment.sh (PROD)',
    '',
    'JOB 2  build-and-deploy-frontend      needs: deploy-backend-gas',
    '  checkout -> node 18 -> npm install esbuild',
    '  se ref = main               -> bundle.js     --define __CW_BUILD_ENV__="production"',
    '  se ref = refactor-structure -> bundle-dev.js --define __CW_BUILD_ENV__="development"',
    '  peaceiris/actions-gh-pages  -> publica ./dist na branch gh-pages',
    '                                 (keep_files: true, os dois bundles coexistem)',
  ], 'O needs: é a peça central. Os dois jobs já rodaram em paralelo, e foi essa corrida que produziu o incidente descrito na seção 21.');

  callout_(ctx, 'Por que o backend vai primeiro',
    'Frontend novo sobre backend antigo chama operações que a implantação ainda não conhece, e o ' +
    'agente vê apenas o watchdog do JSONP estourando em 15 s — sem erro legível. A ordem inversa não ' +
    'tem essa janela: backend novo sob frontend antigo é inofensivo, porque uma operação que ninguém ' +
    'chama ainda não faz nada. O preço é assumido: se o job do backend falhar, o frontend NÃO é ' +
    'publicado. Meio-deploy é exatamente o estado que essa ordem existe para impedir.', COLOR.green);

  h2_(ctx, 'A distinção que mais confunde: push vs. promoção', COLOR.modPurple);
  para_(ctx, 'Este é o ponto que quase todo mundo erra ao mexer no backend pela primeira vez:',
    { spaceAfter: 8 });

  table_(ctx, ['Comando', 'O que atualiza', 'O que NÃO atualiza'], [
    ['clasp push -f', 'O HEAD do projeto — o código que você vê ao abrir o editor do Apps Script.',
     'As URLs /exec e /dev, que continuam presas à versão promovida por último.'],
    ['clasp deploy -i <id>', 'Promove uma implantação existente para a versão que está no HEAD. É isto que muda o que os agentes usam.',
     'Nada mais: não envia código, apenas aponta aquela implantação para o estado atual.'],
  ], COLOR.modPurple, [0.22, 0.40, 0.38], { monoCols: [0] });

  h2_(ctx, 'Os dois ambientes', COLOR.modPurple);
  para_(ctx, 'Cada branch é dona de uma implantação do Apps Script e promove apenas a dela. ' +
    'O merge para a main é o portão de produção — não existe passo manual depois dele.',
    { spaceAfter: 8 });

  table_(ctx, ['', 'Desenvolvimento', 'Produção'], [
    ['Branch', 'refactor-structure', 'main'],
    ['Gatilho', 'Todo push', 'O merge de refactor-structure e o push dele'],
    ['Bundle publicado', 'dist/bundle-dev.js', 'dist/bundle.js'],
    ['__CW_BUILD_ENV__', '"development"', '"production"'],
    ['Implantação Apps Script', 'Dev — promovida pelo CI a cada push', 'Produção — promovida pelo CI só nesse push'],
    ['Uso no dia a dia', 'É a branch de trabalho real', 'Só recebe merge quando algo está pronto'],
  ], COLOR.modPurple, [0.22, 0.39, 0.39]);

  callout_(ctx, 'O portão de produção é o merge',
    'Nada mais promove produção: nem push na branch de desenvolvimento, nem clasp push de uma máquina, ' +
    'nem um passo manual que alguém precise lembrar. Se o merge não acontece, produção não se move — e ' +
    'quando ele acontece, ela se move inteira, frontend e backend juntos.', COLOR.green);

  h2_(ctx, 'Roteamento de ambiente no cliente', COLOR.modPurple);
  para_(ctx, 'Quem escolhe o backend é o BUILD, não o runtime. O esbuild injeta __CW_BUILD_ENV__ e o ' +
    'data-service.js usa esse valor como chave no mapa de implantações:', { spaceAfter: 8 });

  code_(ctx, [
    '// src/modules/shared/data-service.js',
    'const DEPLOYMENTS = {',
    '  production:  "AKfycbxkheuq...",   // promovida só num merge para a main',
    '  development: "AKfycbyUtczR...",   // promovida a cada push em refactor-structure',
    '};',
    '',
    'const BUILD_ENV = typeof __CW_BUILD_ENV__ !== "undefined"',
    '                ? __CW_BUILD_ENV__ : "development";',
    '',
    'const isLocalhost = window.location.hostname === "localhost"',
    '                 || window.location.hostname === "127.0.0.1";',
    '',
    'const SCRIPT_ID = DEPLOYMENTS[BUILD_ENV] || DEPLOYMENTS.development;',
    'const ENDPOINT  = isLocalhost ? "dev" : "exec";',
    '',
    'console.log(`[Case Wizard] backend: ${BUILD_ENV}/${ENDPOINT}`);',
  ], 'O console.log final é o jeito mais rápido de confirmar, na tela do agente, contra qual backend aquele bundle está falando.');

  callout_(ctx, 'O fallback é silencioso — e essa é a armadilha',
    'Sem o --define, BUILD_ENV cai em "development". Isso é correto rodando local, e catastrófico num ' +
    'build de produção: o bundle que os agentes usam passaria a falar com o backend que o CI ' +
    'republica a cada push de desenvolvimento. Qualquer passo de build novo PRECISA passar o define. ' +
    'Não há erro, não há aviso — só o console.log denuncia.', COLOR.red);

  h2_(ctx, 'A versão do app: dois arquivos, um commit', COLOR.modPurple);
  para_(ctx, 'A numeração de versão do produto também é um par que precisa andar junto, e por um ' +
    'motivo não óbvio:', { spaceAfter: 8 });

  table_(ctx, ['Onde', 'O que controla'], [
    ['APP_VERSION, em src/app.js', 'QUANDO o modal de "o que há de novo" dispara.'],
    ['RELEASE_NOTES.version, em changelog-data.js', 'O QUE esse modal diz.'],
  ], COLOR.modPurple, [0.38, 0.62], { monoCols: [0] });

  callout_(ctx, 'Suba os dois no mesmo commit',
    'Se divergirem, checkAndShowChangelog suprime o modal e registra um aviso, em vez de mostrar o ' +
    'selo da versão nova sobre o conteúdo da versão antiga. É uma falha silenciosa deliberada: ' +
    'ninguém vê o changelog, e nada quebra de forma visível.', COLOR.yellow);

  h2_(ctx, 'Os IDs que precisam concordar', COLOR.modPurple);
  table_(ctx, ['Onde', 'O quê', 'Regra'], [
    ['data-service.js', 'Mapa DEPLOYMENTS, com os dois IDs.', 'É o que o bundle usa em runtime.'],
    ['deploy.yml', 'DEPLOYMENT_ID, hardcoded duas vezes — uma por branch.', 'É o que o CI promove.'],
    ['gas-backend/.clasp.json', 'scriptId do projeto Apps Script.', 'Único: é o mesmo projeto nos dois ambientes. Só a implantação difere.'],
  ], COLOR.modPurple, [0.24, 0.38, 0.38], { monoCols: [0] });

  callout_(ctx, 'O erro que ainda passa silencioso',
    'Rotacionar uma implantação exige editar data-service.js E deploy.yml juntos. O ' +
    'scripts/promote-deployment.sh recusa rodar com um ID de placeholder (__ALGO__), mas NÃO detecta ' +
    'os dois arquivos apontando para implantações diferentes e ambas válidas. Esse continua sendo o ' +
    'jeito mais fácil de quebrar o deploy sem que nada reclame.', COLOR.red);

  h2_(ctx, 'Material visual (opcional)', COLOR.modPurple);
  para_(ctx, 'generate-portfolio.py usa Playwright para abrir mock-crm.html — um HTML estático que ' +
    'imita o layout do CRM alvo —, injetar o bundle e gravar prints e vídeo para o README. Não é um ' +
    'ambiente de teste: não valida nada funcionalmente e não substitui testar no CRM real. Exige ' +
    'pip install playwright e playwright install antes do npm run portfolio.', { spaceAfter: 8 });
}

function sec21_(ctx) {
  h1_(ctx, '21', 'Evolução recente do projeto', COLOR.yellow);

  para_(ctx, 'As três mudanças estruturais mais recentes do projeto são todas de infraestrutura, e ' +
    'todas nasceram do mesmo tipo de problema: algo que parecia estar separado e não estava. Elas ' +
    'estão documentadas como ADRs no repositório, e esta seção consolida o essencial — inclusive o ' +
    'que deu errado no caminho, que costuma ser a parte mais útil.', { spaceAfter: 12 });

  h2_(ctx, 'Linha do tempo', COLOR.yellow);
  table_(ctx, ['Quando', 'Mudança', 'Registro'], [
    ['2026-08-20', 'Decisão de renomear o repositório de techsol_DialIn_AutoCopy para case-wizard.', 'ADR 0003'],
    ['2026-08-21', 'Rename executado, com um repo-shim sob o nome antigo.', 'ADR 0003, seção "Execução"'],
    ['2026-08-21', 'Split de ambiente: uma implantação do Apps Script por branch, promovida pelo CI.', 'ADR 0004'],
    ['2026-08-21', 'Ordem no pipeline: backend promovido antes de o frontend ser publicado.', 'ADR 0004'],
    ['2026-08-21', 'Correção do script de promoção: chamado por bash, não pelo bit de execução.', 'docs/LEARNINGS.md'],
  ], COLOR.yellow, [0.14, 0.58, 0.28]);

  h2_(ctx, 'O rename: por que não foi trivial', COLOR.yellow);
  para_(ctx, 'O nome techsol_DialIn_AutoCopy sobrou de um script descartável que copiava um campo de ' +
    'dial-in. Nada nele descrevia o que o projeto virou. A pasta local, o ADOPTION-LOG e o prefixo cw_ ' +
    'de todo o localStorage já diziam "Case Wizard" — o repositório era o último resquício.',
    { spaceAfter: 8 });

  para_(ctx, 'O que tornou a mudança arriscada é uma característica de desenho descrita na seção 04: ' +
    'a URL do bookmarklet contém o nome do repositório. E aqui entra a assimetria que quase ninguém ' +
    'sabe de cabeça:', { spaceAfter: 8 });

  table_(ctx, ['O que o GitHub faz ao renomear um repositório', 'Redireciona?'], [
    ['URLs de web, clone e push do repositório', 'Sim — mas só enquanto o nome antigo ficar livre.'],
    ['O site do GitHub Pages', 'NÃO. O site migra para o nome novo e a URL antiga simplesmente deixa de resolver.'],
  ], COLOR.yellow, [0.55, 0.45]);

  callout_(ctx, 'O modo de falha que se queria evitar',
    'Sem tratamento, todo bookmarklet já salvo viraria um 404 silencioso: o <script> injetado não ' +
    'carrega e absolutamente nada acontece na tela. Do ponto de vista de quem dá suporte, é o pior ' +
    'modo de falha possível — indistinguível de "o CRM travou de novo".', COLOR.red);

  h3_(ctx, 'A solução: um repo-shim sob o nome antigo');
  para_(ctx, 'Junto com o rename foi criado um repositório novo e vazio com o nome ANTIGO, servindo ' +
    'pelo Pages um bundle.js de três linhas que carrega o bundle real da URL nova. Os bookmarklets ' +
    'instalados continuam funcionando, e a redistribuição do favorito novo passa a poder acontecer ' +
    'aos poucos, em vez de num prazo.', { spaceAfter: 8 });

  code_(ctx, [
    '// Shim: this repository was renamed to case-wizard.',
    '// Kept alive so bookmarklets saved before the rename keep working.',
    '(function () {',
    '  var s = document.createElement("script");',
    '  s.src = "https://lucastdcs.github.io/case-wizard/bundle.js?t=" + Date.now();',
    '  document.body.appendChild(s);',
    '})();',
  ], 'O shim NÃO cria uma política de Trusted Types própria: o bookmarklet de produção já criou a política "default" antes dele rodar, e criar duas com o mesmo nome lança exceção. Como a política já existe, a atribuição simples a s.src passa por ela.');

  h3_(ctx, 'A consequência que surpreendeu');
  para_(ctx, 'Ocupar o nome antigo com o shim fecha a janela em que outra pessoa poderia reivindicá-lo ' +
    'e assim quebrar o próprio shim. Mas criar um repositório sob aquele nome CONSOME o nome — e com ' +
    'isso encerra o redirecionamento da URL git do repositório renomeado.', { spaceAfter: 8 });

  callout_(ctx, 'Atualizar o remote virou obrigatório, não opcional',
    'Depois do rename, um git ls-remote na URL antiga responde com o commit único do shim, não com os ' +
    'refs deste projeto. Ou seja: um origin desatualizado deixou de falhar alto com "repository not ' +
    'found" e passou a resolver em silêncio para um repositório com uma main alheia — falha pior que ' +
    'um 404. Quem tiver um clone antigo precisa rodar: ' +
    'git remote set-url origin https://github.com/lucastdcs/case-wizard.git', COLOR.red);

  para_(ctx, 'Duas coisas saíram diferentes do plano, e ambas valem para a próxima vez. O shim ' +
    'dispensou a branch gh-pages: o repositório foi criado com README, o Pages foi apontado direto ' +
    'para a main e os dois arquivos subiram pela Contents API — dois PUT e um POST, sem clone nem ' +
    'branch órfã. E a janela de quebra foi menor que o previsto: a URL nova já respondia 200 no ' +
    'instante seguinte ao rename, porque o site do Pages migra junto e não precisa rebuildar; o que ' +
    'levou alguns minutos foi só o primeiro build do Pages do shim.', { spaceAfter: 8 });

  h2_(ctx, 'O split de ambiente: dev e produção de verdade', COLOR.yellow);
  para_(ctx, 'Até este ponto existia UMA implantação do Apps Script, e o CI a republicava a cada push ' +
    'na branch de desenvolvimento. Como o frontend inteiro apontava para esse mesmo ID, um push numa ' +
    'branch de desenvolvimento republicava o backend de produção. Nas palavras do ADR: não havia ' +
    'ambiente de desenvolvimento de verdade — havia produção, e pessoas empurrando código para dentro ' +
    'dela.', { spaceAfter: 8 });

  para_(ctx, 'O agravante é que o portão que existia no papel não protegia nada. O RELEASE.md ' +
    'registrava que a promoção de produção era manual "de propósito", mas o frontend já ia sozinho ' +
    'para o GitHub Pages a cada push na main, enquanto o backend esperava alguém lembrar de promovê-lo ' +
    'à mão. O efeito real era os dois lados divergirem em silêncio.', { spaceAfter: 8 });

  callout_(ctx, 'O incidente que forçou a mudança',
    'No release da v6.0, o frontend novo subiu para produção conversando com uma implantação de ' +
    'backend de março. Um portão que depende de alguém lembrar não é um portão — e o portão de ' +
    'verdade, decidir o que vai para produção, já era o merge.', COLOR.red);

  para_(ctx, 'A correção está descrita na seção 20: cada branch passa a ter a sua própria implantação, ' +
    'e o CI promove apenas a da branch que recebeu o push. Vale registrar o que foi rejeitado no ' +
    'caminho, porque são as perguntas que qualquer pessoa refaz:', { spaceAfter: 8 });

  table_(ctx, ['Alternativa considerada', 'Por que foi rejeitada'], [
    ['Manter a promoção de produção manual.',
     'Era o estado anterior, e foi o que produziu o skew da v6.0.'],
    ['Eleger como produção a implantação que a main referenciava.',
     'Foi a primeira tentativa do split, e estava errada: aquele ID não era promovido desde março, então adotá-lo teria feito produção REGREDIR para código antigo.'],
    ['Dois projetos Apps Script separados, um por ambiente.',
     'Seria o isolamento mais forte — planilhas, propriedades e gatilhos separados —, mas exige duplicar scriptId, credenciais e a planilha de dados. Fica como o caminho natural caso um dia seja preciso isolar DADOS, e não só versão de código.'],
    ['Publicar o frontend antes do backend, ou em paralelo.',
     'É a origem da janela de erro descrita na seção 20.'],
  ], COLOR.yellow, [0.34, 0.66]);

  callout_(ctx, 'A lição que vale além deste projeto',
    '"Qual implantação a branch tal referencia" não é a mesma pergunta que "qual implantação está de ' +
    'fato no ar". Foi confundir as duas que produziu tanto o skew da v6.0 quanto a primeira versão ' +
    'errada do split.', COLOR.yellow);

  h2_(ctx, 'O bit de execução que só falha no CI', COLOR.yellow);
  para_(ctx, 'A lógica de promoção virou um script (scripts/promote-deployment.sh) em vez de ficar ' +
    'inline no YAML, porque os dois ambientes rodam exatamente o mesmo corpo — só mudam o ID e o ' +
    'rótulo. Duplicar isso no workflow é como uma das metades acaba ficando para trás.',
    { spaceAfter: 8 });

  para_(ctx, 'O script foi criado, o chmod +x rodou sem erro, o bash -n passou, o commit entrou — e o ' +
    'deploy morreu no CI com Permission denied (exit 126). O repositório vive num volume Windows ' +
    'montado (/mnt/c no WSL), e o drvfs não persiste o bit de execução: o chmod "funciona" localmente ' +
    'e o git grava 100644 mesmo assim.', { spaceAfter: 8 });

  code_(ctx, [
    '# no workflow: invoque pelo interpretador, nunca por ./script.sh',
    'run: bash scripts/promote-deployment.sh',
    '',
    '# se ainda quiser o bit correto no git, ele vai no ÍNDICE, não no filesystem:',
    'git update-index --chmod=+x scripts/x.sh',
    'git ls-files -s scripts/x.sh    # confirme 100755',
  ], 'Regra registrada em docs/LEARNINGS.md. Por causa do needs: entre os jobs, essa falha derrubava o deploy inteiro, não só aquele step.');

  callout_(ctx, 'Por que o sintoma é traiçoeiro',
    'Tudo que se testa localmente passa: a sintaxe, a execução via bash, o git add. O único lugar onde ' +
    'a diferença aparece é git ls-files -s, que mostra 100644 onde se esperava 100755. O erro só ' +
    'surge no CI, depois do merge.', COLOR.red);

  h2_(ctx, 'Estado atual das branches', COLOR.yellow);
  para_(ctx, 'Uma observação de quem leu o repositório para montar este documento, e que vale ' +
    'verificar antes de confiar: o split de ambiente já está na main, mas os commits de documentação ' +
    'do rename ainda não. Na prática, a main publica o README com a URL ANTIGA do bookmarklet — a que ' +
    'hoje só resolve através do shim —, enquanto a refactor-structure já traz a URL nova de ' +
    '/case-wizard/. Nada quebra, porque é exatamente para isso que o shim existe, mas quem instalar o ' +
    'favorito a partir da main hoje instala o caminho com o salto extra.', { spaceAfter: 8 });

  callout_(ctx, 'Pendência conhecida',
    'Redistribuir o bookmarklet novo a partir do README, sem pressa — o shim é o que compra esse ' +
    'tempo. E o shim não pode ser apagado enquanto houver bookmarklets antigos em circulação.',
    COLOR.yellow);
}

function sec22_(ctx) {
  h1_(ctx, '22', 'Governança da documentação', COLOR.blue);

  para_(ctx, 'O projeto mantém três corpos de documentação com papéis distintos. Confundi-los leva a ' +
    'documentar no lugar errado e a divergências que ninguém percebe.', { spaceAfter: 10 });

  table_(ctx, ['Onde', 'Papel', 'Regra'], [
    ['specs/', 'Fonte da verdade normativa: regras que o código DEVE seguir.',
     'Declarada como "lei absoluta" no _MASTER_RULEBOOK.md. Se o código divergir de uma regra, a regra prevalece e o código deve ser refatorado.'],
    ['docs/', 'Visão geral, decisões e aprendizados: como as coisas são e por que ficaram assim.',
     'Descreve o macro. Não é normativa e aponta para specs/ quando o detalhe importa.'],
    ['docs/decisions/', 'ADRs — uma decisão estrutural por arquivo, com alternativas e consequências.',
     'É onde a pergunta "por que foi feito assim?" tem resposta. Menos de uma página cada.'],
    ['docs/LEARNINGS.md', 'Regras aprendidas com correções e descobertas não triviais.',
     'Uma entrada = uma regra acionável, com a história por trás e o gatilho de quando aplicar. Ordem cronológica inversa.'],
    ['RELEASE.md', 'Runbook de publicação: como entregar com segurança.',
     'O CHANGELOG diz o que subiu; este diz como subir. Atualizado sempre que um release revela uma fragilidade.'],
    ['README.md', 'Porta de entrada: o que é o projeto, como instalar o bookmarklet, material visual.',
     'É onde vivem os bookmarklets canônicos — de produção e de DEV.'],
    ['CLAUDE.md', 'Instruções de trabalho para agentes de IA no repositório.',
     'Mapa, não território: aponta para os docs em vez de duplicá-los.'],
  ], COLOR.blue, [0.16, 0.36, 0.48], { monoCols: [0] });

  para_(ctx, 'Além desses, o repositório mantém PLAN.md (o todo ativo), CHANGELOG.md, e em docs/ ' +
    'ainda VISION.md, ROADMAP.md, GLOSSARY.md, ARCHITECTURE.md, CORE_MODULES.md, WORKFLOW.md e ' +
    'ADOPTION-LOG.md.', { spaceAfter: 10 });

  h2_(ctx, 'A disciplina de captura', COLOR.blue);
  para_(ctx, 'O projeto trata a escrita da documentação como parte do trabalho, não como um passo ' +
    'posterior, e ancora isso num momento concreto: antes de um push, de uma tag ou de um release. ' +
    'A pergunta se divide em três destinos:', { spaceAfter: 8 });
  bullets_(ctx, [
    'Decidiu algo estrutural? Vira um ADR em docs/decisions/.',
    'Aprendeu algo que muda como se trabalha aqui — inclusive um bloqueio que custou tempo, com a solução? Vira uma entrada em docs/LEARNINGS.md.',
    'Flagrou o agente repetindo um erro ou derivando? Vira uma regra no CLAUDE.md ou em .claude/rules/.',
  ]);
  para_(ctx, 'A justificativa é explícita no CLAUDE.md: captura vence memória — se não foi escrito no ' +
    'repositório, se perde na próxima sessão. As seções 20 e 22 deste documento são, em boa medida, ' +
    'apenas a consolidação do que essa disciplina já havia registrado.', { spaceAfter: 10 });

  h2_(ctx, 'O que há dentro de specs/', COLOR.blue);
  table_(ctx, ['Arquivo', 'Cobre'], [
    ['_MASTER_RULEBOOK.md', 'Filosofia do projeto (KISS), stack permitida e proibida, padrões de nomenclatura.'],
    ['data-models/db-schema.md', 'O mapa de colunas da planilha e a regra anti-apagamento.'],
    ['data-models/api-payloads.md', 'O contrato de chaves entre front e back, e as regras de payload de criação e edição.'],
    ['workflow/bau-lifecycle.md', 'Estados do caso BAU, ordenação FIFO, separação de abas e o disclaimer de edição.'],
    ['workflow/case-notes-status-rules.md', 'Regras de status e sub-status das notas — a base que a Central de Conteúdo valida ao publicar um modelo.'],
    ['workflow/scraping-rules.md', 'Proteção de idioma, seletores e falha silenciosa.'],
    ['ui-ux/design-system.md', 'Estética, variações semânticas e componentes.'],
    ['ui-ux/dom-standards.md', 'Proibições de UX, loading, anti-flicker e scroll lock.'],
  ], COLOR.blue, [0.30, 0.70], { monoCols: [0] });

  callout_(ctx, 'Ao mudar comportamento, mude a spec junto',
    'A spec é normativa: código que a contradiz é, por definição, um bug — mesmo que funcione. Se uma ' +
    'mudança de produto invalida uma regra, a spec precisa ser atualizada na mesma alteração. Uma ' +
    'divergência não resolvida entre specs/ e o código é a pior situação possível, porque as duas ' +
    'fontes parecem autoritativas.', COLOR.red);

  para_(ctx, 'docs/BUSINESS_RULES.md é um exemplo dessa disciplina em ação: em vez de manter um resumo ' +
    'de negócio que fatalmente divergiria, o arquivo foi reduzido a um índice apontando para specs/, ' +
    'com uma nota explicando a decisão.', { spaceAfter: 8 });
}

function sec23_(ctx) {
  h1_(ctx, '23', 'Limitações e trade-offs', COLOR.red);

  para_(ctx, 'Nada aqui é surpresa para quem escreveu o sistema: são consequências aceitas ' +
    'conscientemente, dado o ambiente da seção 02. O que esta seção acrescenta é onde cada uma vai ' +
    'doer primeiro, para que quem assumir o projeto saiba o que monitorar.', { spaceAfter: 10 });

  table_(ctx, ['Limitação', 'Por que foi aceita', 'Onde vai doer primeiro'], [
    ['Escrita por GET (JSONP)',
     'É a única forma de contornar o CORS sem servidor intermediário.',
     'Payloads longos truncados sem erro visível — um snippet grande ou uma nota extensa que "não salva".'],
    ['Planilha como banco de dados',
     'Não há infraestrutura alocada; o Sheets vem de graça com o Workspace.',
     'Toda leitura é getDataRange().getValues() na tabela inteira: o custo cresce linearmente com o histórico. O backup semanal é o que segura isso.'],
    ['Sem índices, sem consultas',
     'Consequência do item acima.',
     'getPendingBAUCases, getRecentActivity e getWeeklyHistory varrem a tabela toda a cada chamada — inclusive no polling de 60 s do dashboard.'],
    ['Quotas do Apps Script',
     'Idem: não há alternativa sem infraestrutura.',
     'Limite diário de envio de e-mail (consumido pela conta publicadora), tempo máximo de execução por chamada e execuções simultâneas.'],
    ['Dependência do DOM de terceiro',
     'É a essência do produto: sem isso não há overlay.',
     'Qualquer atualização do CRM pode quebrar um scraper. A falha é silenciosa por design, então aparece como campo vazio, não como erro.'],
    ['Cobertura de teste parcial',
     'Não há como instanciar o CRM alvo em um ambiente de teste; o que dá para cobrir é a lógica que não depende dele.',
     'Existem harnesses em Node e dois smokes de Playwright sobre o mock-crm.html, mas nada exercita o CRM real. Regressões de integração continuam sendo descobertas por um agente, em produção.'],
    ['Sem versionamento de schema',
     'A planilha não tem migrations.',
     'Mudanças de coluna exigem coordenação manual. ensureBAUHistoryColumns é o único padrão de migração que existe, e foi escrito à mão.'],
    ['Sem observabilidade real',
     'A aba Logs é append-only e ninguém a lê de volta.',
     'Não há alerta de erro, taxa de falha nem dashboard de saúde. O canal de detecção de bug é o formulário de feedback.'],
    ['Segredo de deploy em um único secret',
     'É como o clasp autentica em CI.',
     'A expiração ou rotação de CLASPRC_JSON derruba o deploy do backend. A validação com jq no workflow existe para tornar essa falha legível.'],
    ['Dois IDs de implantação em dois arquivos',
     'É o preço do split de ambiente, que resolveu um problema maior (seção 21).',
     'Os dois apontarem para implantações diferentes e ambas válidas é um erro que nenhuma guarda detecta.'],
    ['Um repositório-shim a manter vivo',
     'Mantém funcionando os bookmarklets instalados antes do rename.',
     'Não pode ser apagado enquanto houver favoritos antigos em circulação, e adiciona um salto de rede a quem ainda usa a URL velha.'],
  ], COLOR.red, [0.22, 0.34, 0.44]);

  h2_(ctx, 'Divergências conhecidas entre código e spec', COLOR.red);
  bullets_(ctx, [
    'A spec de banco descreve 18 colunas; a tabela real tem 21, por causa da trilha de auditoria acrescentada depois (seção 11).',
    'O front-end chama a operação update_bau_status, que não tem handler correspondente na cadeia de despacho do backend — verifique antes de confiar nesse caminho (seção 10).',
    'O script npm run dev não minifica, mas o job de CI passa --minify também no build de desenvolvimento.',
  ]);
}

function sec24_(ctx) {
  h1_(ctx, '24', 'Roadmap técnico', COLOR.modOrange);

  h2_(ctx, 'Evoluções previstas', COLOR.modOrange);
  bullets_(ctx, [
    'Personalização por segmento do agente (Gold/Silver, OCT), ajustando conteúdo e fluxos automaticamente ao perfil de quem está atendendo.',
    'Completar a seção de Implementação/Tag Support do Call Script em espanhol, pendente de conteúdo real do time.',
    'Revisão do espanhol por falante nativo, com prioridade para os templates de e-mail e os cenários de nota.',
    'Central de Conteúdo: mover conteúdo hoje hardcoded para edição sem deploy, com fluxo de proposta e aprovação e controle de acesso por módulo.',
  ]);

  h2_(ctx, 'Dívidas técnicas em ordem de risco', COLOR.modOrange);
  table_(ctx, ['#', 'Dívida', 'Impacto se ignorada'], [
    ['1', 'Nenhum teste exercita o CRM real; a integração só é validada à mão.', 'Regressões de integração chegam ao agente. Cresce com o tamanho da base.'],
    ['2', 'Divergência update_bau_status entre cliente e servidor.', 'Uma funcionalidade que parece funcionar e não faz nada, sem erro.'],
    ['3', 'Nenhuma observabilidade de erro do lado do produto.', 'Falhas só são descobertas por relato humano.'],
    ['4', 'Varredura completa da planilha em toda leitura.', 'Degradação progressiva de latência à medida que o histórico cresce.'],
    ['5', 'isOverhead por lista de exclusão.', 'Um papel novo na planilha People pode ganhar acesso de liderança sem ninguém notar.'],
    ['6', 'Delay fixo de 2.500 ms acoplado à splash.', 'Logs de sessão anônimos se a animação ficar mais lenta.'],
    ['7', 'Gatilhos que exigem execução manual pós-reconfiguração.', 'Backup e alerta silenciosamente inativos.'],
  ], COLOR.modOrange, [0.05, 0.40, 0.55]);

  callout_(ctx, 'Sugestão de primeiro passo',
    'A dívida 1 é a que destrava as outras. Um harness mínimo — testar as funções puras do backend ' +
    '(resolveProcessedAction, getUserProfileByLdap, a formatação de data do motor de e-mail) e a ' +
    'montagem de payload do front — já cobriria a maior parte da lógica que não depende do DOM do CRM, ' +
    'sem precisar simular o hospedeiro.', COLOR.modOrange);
}

function sec25_(ctx) {
  h1_(ctx, '25', 'Guia de retomada', COLOR.green);

  para_(ctx, 'Se você acabou de herdar este projeto, este é o caminho mais curto até ser produtivo.',
    { spaceAfter: 10 });

  h2_(ctx, 'Dia 1 — entender o formato', COLOR.green);
  bullets_(ctx, [
    'Leia as seções 02 e 03 deste documento: as restrições e o desenho macro. Sem elas, o resto parece arbitrário.',
    'Leia specs/_MASTER_RULEBOOK.md inteiro. São poucas páginas e é normativo.',
    'Instale o bookmarklet de DEV (README.md) e abra o Case Wizard no CRM real. Nada substitui ver funcionando.',
    'Abra o DevTools e observe as chamadas JSONP saindo: é a forma mais rápida de entender o transporte.',
  ], { numbered: true });

  h2_(ctx, 'Dia 2 — mapear o código', COLOR.green);
  bullets_(ctx, [
    'Leia src/app.js de ponta a ponta. São cerca de 120 linhas e contêm o mapa mental inteiro do front.',
    'Leia src/modules/shared/data-service.js: é o único ponto de saída de rede e o arquivo que muda ao trocar de ambiente.',
    'Leia gas-backend/Código.js: o roteador, os helpers de planilha e as funções de perfil e permissão.',
    'Abra a planilha e olhe a aba BAU_form_data com o mapa da seção 11 ao lado.',
  ], { numbered: true });

  h2_(ctx, 'Dia 3 — fazer a primeira mudança', COLOR.green);
  bullets_(ctx, [
    'Comece por algo de conteúdo, não de arquitetura: um texto em notes-data.js ou um template em email-data.js.',
    'Faça push na branch de desenvolvimento e confirme que o Actions ficou verde nos dois jobs.',
    'Recarregue o CRM, injete o bundle de DEV e confirme a mudança no ar.',
    'Só depois disso mexa em algo que atravesse a fronteira front/backend — e, quando fizer, revise as duas specs de data-models antes.',
  ], { numbered: true });

  h2_(ctx, 'Perguntas de verificação', COLOR.green);
  para_(ctx, 'Se você consegue responder a estas cinco sem consultar nada, entendeu o sistema:',
    { spaceAfter: 8 });
  bullets_(ctx, [
    'Por que uma escrita usa GET e o que isso implica para um payload grande?',
    'Qual é a diferença entre clasp push e clasp deploy, e o que exatamente promove produção hoje?',
    'O que acontece se um passo de build novo esquecer o --define de __CW_BUILD_ENV__?',
    'Por que o job do backend roda antes do job do frontend, e o que se perde se essa ordem cair?',
    'Por que uma ação restrita ao TL não pode virar um op= no roteador JSONP?',
    'O que acontece se a aba People for renomeada?',
    'Por que o padrão campo || "" é correto na criação de um caso e destrutivo na edição?',
  ]);

  h2_(ctx, 'Onde pedir ajuda', COLOR.green);
  specList_(ctx, [
    ['Autor / mantenedor', DOC.AUTHOR],
    ['Repositório', DOC.REPO],
    ['Erros do backend', 'Cloud Logging do projeto Apps Script (exceptionLogging: STACKDRIVER)'],
    ['Estado das implantações', 'Editor do Apps Script > Implantar > Gerenciar implantações'],
    ['Histórico de deploy de dev', 'Job Summary da execução correspondente no GitHub Actions'],
  ], COLOR.green);
}

function apxA_(ctx) {
  h1_(ctx, 'A', 'Apêndice — Glossário', COLOR.modGray);

  table_(ctx, ['Termo', 'Significado'], [
    ['Overlay Application', 'Aplicação injetada em tempo de execução numa página de terceiro, compartilhando DOM e window com ela.'],
    ['Bookmarklet', 'Favorito do navegador cuja URL contém JavaScript em vez de um endereço. É o instalador do projeto.'],
    ['Trusted Types', 'Mecanismo de segurança do navegador que exige que strings destinadas a sinks perigosos (script.src, innerHTML) passem por uma política registrada.'],
    ['JSONP', 'Técnica de contorno de CORS: o servidor devolve JavaScript que invoca uma função de callback registrada pelo cliente.'],
    ['clasp', 'CLI oficial do Google para sincronizar código local com um projeto Apps Script.'],
    ['Implantação (deployment)', 'Uma versão publicada e endereçável de um projeto Apps Script. Um mesmo projeto pode ter várias, cada uma travada numa versão.'],
    ['HEAD (Apps Script)', 'O estado atual do código no editor, atualizado por clasp push. Não é o que a URL /exec serve.'],
    ['Promoção', 'O ato de apontar uma implantação para a versão que está no HEAD. É o que muda o que os agentes usam.'],
    ['Shim', 'O repositório vazio mantido sob o nome antigo, que serve um bundle de três linhas redirecionando para a URL nova. Mantém vivos os bookmarklets instalados antes do rename.'],
    ['__CW_BUILD_ENV__', 'Constante injetada pelo esbuild em tempo de build, que decide se aquele bundle fala com o backend de produção ou o de desenvolvimento.'],
    ['Skew', 'O estado em que frontend e backend estão em versões incompatíveis — no caso da v6.0, um frontend novo conversando com uma implantação de março.'],
    ['LDAP', 'Identificador de usuário interno — a parte do e-mail corporativo antes do arroba.'],
    ['Overhead', 'No vocabulário do projeto, quem não é Agent nem Apprentice: papéis de liderança e suporte com privilégio elevado.'],
    ['TL', 'Team Leader. O papel que aprova, rejeita e descarta casos no dashboard.'],
    ['BAU', 'Business As Usual. O time e o fluxo para os quais os casos são escalados.'],
    ['CID', 'Customer ID: identificador do anunciante no CRM.'],
    ['Speakeasy ID', 'Identificador do atendimento, capturado da tela do CRM.'],
    ['Genie effect', 'A transição de abertura e fechamento das janelas, que emana do botão de origem na pílula.'],
    ['Command Center', 'A pílula flutuante que dá acesso a todos os módulos.'],
    ['Rascunho fantasma', 'Rascunho de e-mail sujo que o CRM mantém em memória entre casos, e que precisa ser limpo antes de qualquer escrita.'],
    ['Sherlock', 'Apelido interno de captureNameWithMagic(), a rotina que descobre a identidade do agente por interação simulada.'],
    ['Cold storage', 'A planilha de arquivo (Archive_BAU) para onde os casos finalizados são movidos semanalmente.'],
  ], COLOR.modGray, [0.24, 0.76]);
}

function apxB_(ctx) {
  h1_(ctx, 'B', 'Apêndice — Mapa de arquivos', COLOR.modGray);

  para_(ctx, 'Onde procurar quando a pergunta é "onde isso acontece?".', { spaceAfter: 10 });

  h2_(ctx, 'Front-end', COLOR.modGray);
  table_(ctx, ['Arquivo', 'Procure aqui quando'], [
    ['src/app.js', 'A pergunta é sobre ordem de inicialização, ou sobre adicionar/remover um módulo.'],
    ['shared/data-service.js', 'A pergunta envolve rede, cache, URL de API ou troca de ambiente.'],
    ['shared/page-data.js', 'Um dado capturado da tela veio errado ou vazio.'],
    ['shared/command-center.js', 'A pílula, o arraste, o estado de processamento ou a cor de um módulo.'],
    ['shared/header-factory.js', 'O cromo de uma janela, o botão de ajuda ou a barra de gradiente.'],
    ['shared/animations.js', 'Uma transição de abertura/fechamento está estranha.'],
    ['shared/dom-utils.js', 'Scroll travado, clique sintético, espera, estado vazio ou navegação por teclado.'],
    ['shared/z-layers.js', 'Algo aparece atrás do que deveria, ou arrastar uma janela a manda para trás.'],
    ['shared/i18n.js', 'A interface apareceu no idioma errado.'],
    ['shared/shortcut-service.js', 'Um atalho do Ctrl+K sumiu, duplicou ou aponta para o cenário errado.'],
    ['shared/user-prefs-service.js', 'Uma preferência não seguiu a pessoa para outra máquina.'],
    ['shared/wizard-shell.js', 'O Onboarding ou o Changelog: layout, teclado, foco ou animação.'],
    ['notes/notes-bridge.js', 'A inserção de nota no CRM falhou.'],
    ['notes/data/notes-data.js', 'O texto de uma nota, um template de sub-status ou uma tradução.'],
    ['notes/drafts/draft-service.js', 'Um rascunho foi perdido ou não foi recuperado.'],
    ['email-assistant/', 'Assunto ou corpo de e-mail preenchido errado, ou rascunho fantasma.'],
    ['bau-form/bau-form-config.js', 'Um campo do wizard de escalação precisa mudar (a config é declarativa).'],
    ['personal-library/snippet-service.js', 'Sincronização de snippets, cache-first ou escrita perdida.'],
  ], COLOR.modGray, [0.34, 0.66], { monoCols: [0] });

  h2_(ctx, 'Backend', COLOR.modGray);
  table_(ctx, ['Arquivo', 'Procure aqui quando'], [
    ['gas-backend/Código.js', 'Uma operação da API, um helper de planilha, o perfil de usuário ou a checagem de permissão.'],
    ['gas-backend/BAU_API.js', 'A criação, leitura, edição ou cancelamento de um caso pelo agente.'],
    ['gas-backend/BAU_Dashboard.js', 'Qualquer coisa que o TL Dashboard chama: fila, decisão, histórico, presença.'],
    ['gas-backend/BAU_Alerts.js', 'O alerta de volume da fila ou seu gatilho.'],
    ['gas-backend/EmailEngine.js', 'O conteúdo, o assunto, a cor ou a urgência de um e-mail transacional.'],
    ['gas-backend/EmailTemplateDynamic.html', 'A estrutura visual dos e-mails (é um template só, para todos os tipos).'],
    ['gas-backend/TLDashboard.html', 'A interface do TL: layout, abas, polling, skeletons.'],
    ['gas-backend/Backup.js', 'O arquivamento semanal ou seu gatilho.'],
    ['gas-backend/ContentAPI.js', 'Qualquer coisa da Central de Conteúdo: proposta, aprovação, papéis, trava ou validação.'],
    ['gas-backend/ContentDashboard.html', 'A interface da Central: abas, formulários, diff de aprovação.'],
    ['gas-backend/ContentSeed_*.js', 'A carga inicial de um módulo migrado para a Central.'],
    ['gas-backend/appsscript.json', 'Fuso, runtime, executeAs ou nível de acesso do Web App.'],
  ], COLOR.modGray, [0.34, 0.66], { monoCols: [0] });

  h2_(ctx, 'Infraestrutura e documentação', COLOR.modGray);
  table_(ctx, ['Arquivo', 'Procure aqui quando'], [
    ['.github/workflows/deploy.yml', 'O deploy falhou, ou você precisa entender o que roda em cada branch.'],
    ['scripts/promote-deployment.sh', 'A promoção de uma implantação do Apps Script pelo CI.'],
    ['RELEASE.md', 'Você vai publicar e quer o runbook, os segredos ou o procedimento de rollback.'],
    ['docs/decisions/', 'Você quer saber POR QUE algo estrutural foi decidido assim (ADRs 0003 e 0004 cobrem rename e ambientes).'],
    ['docs/LEARNINGS.md', 'Você quer as armadilhas já pagas por alguém, com o gatilho de quando elas mordem.'],
    ['package.json', 'Os scripts de build e teste e as dependências.'],
    ['specs/**', 'Você precisa saber qual é a regra, não como o código a implementa.'],
    ['docs/ARCHITECTURE.md', 'Você quer a visão macro em texto curto, ou o histórico de uma decisão.'],
    ['README.md', 'Você precisa dos bookmarklets canônicos ou do material visual.'],
    ['generate-portfolio.py + mock-crm.html', 'Você precisa gerar prints ou vídeo para apresentação.'],
    ['docs/media/CaseWizardDeck.gs', 'Você quer regenerar a apresentação de produto.'],
    ['docs/media/CaseWizardTechDoc.gs', 'Você quer regenerar este documento.'],
  ], COLOR.modGray, [0.34, 0.66], { monoCols: [0] });

  spacer_(ctx, 16);
  colorBar_(ctx);
  spacer_(ctx, 10);
  para_(ctx, 'Fim do documento.', { size: SIZE.small, color: COLOR.inkFaint, italic: true });
}

// ============================================================
// 7. ORDEM DAS SEÇÕES
//    Comente uma linha aqui para tirar a seção do documento —
//    a numeração das demais não muda (ela é literal, não calculada).
// ============================================================

var SECTION_BUILDERS = [
  sec01_, sec02_, sec03_, sec04_, sec05_, sec06_,
  sec07_, sec08_, sec09_, sec10_, sec11_, sec12_,
  sec13_, sec14_, sec15_, sec16_, sec17_, sec18_,
  sec19_, sec20_, sec21_, sec22_, sec23_, sec24_,
  sec25_,
  apxA_, apxB_,
];
