/**
 * CASE WIZARD — GERADOR DE APRESENTAÇÃO
 * ============================================================
 * Cole este arquivo inteiro em Extensões > Apps Script de uma
 * apresentação Google Slides EM BRANCO (Arquivo > Configurar página
 * > Padrão 16:9, se ainda não estiver assim).
 *
 * Setup (uma vez só):
 *   1. Crie uma pasta no Google Drive e faça upload dos 34 PNGs
 *      gerados (23 telas + 11 ícones).
 *   2. Copie o ID dessa pasta (a parte da URL depois de /folders/)
 *      e cole abaixo em CONFIG.DRIVE_FOLDER_ID.
 *   3. Recarregue a apresentação — vai aparecer um menu "Case Wizard".
 *   4. Rode "Case Wizard > Montar apresentação (do zero)". Na primeira
 *      vez o Google vai pedir autorização (acesso ao Drive e à própria
 *      apresentação) — normal, é o próprio script rodando com a sua
 *      conta, aceite.
 *
 * Rodar de novo é seguro: a função limpa os slides existentes antes
 * de reconstruir, então você pode ajustar texto/cores aqui e rodar
 * quantas vezes quiser enquanto ajusta o resultado.
 */

// ============================================================
// 1. CONFIG
// ============================================================

var CONFIG = {
  DRIVE_FOLDER_ID: 'COLOQUE_O_ID_DA_PASTA_AQUI',
};

// Mesmo link usado dentro do próprio app (Configurações > "Reportar
// Bug/Sugestões", src/modules/configs/configs-assistant.js).
var FEEDBACK_FORM_URL = 'forms.gle/8icwk1TejBTDYsJS6';

// Bookmarklet de produção (sempre a branch main / bundle.js), copiado
// literalmente do README.md — não editar sem atualizar lá também.
var INSTALL_BOOKMARKLET = "javascript:(function(){    const scriptUrl = 'https://cases-wizard.web.app/bundle.js';        const policy = trustedTypes.createPolicy('default', {         createHTML: (string) => string,         createScriptURL: string => string,         createScript: string => string,     });    const oldScript = document.getElementById('techsol-app-bundle');    if(oldScript) oldScript.remove();        const script = document.createElement('script');    script.id = 'techsol-app-bundle';    script.src = policy.createScriptURL(scriptUrl);    document.body.appendChild(script);})();";

// ============================================================
// 2. TEMA — tokens extraídos do próprio projeto (não inventados)
// ============================================================

var COLOR = {
  // Neutros (mesmos tokens de --bg-base / --text-primary do
  // ContentDashboard.html / TLDashboard.html)
  bg: '#FFFFFF',
  bgAlt: '#F8F9FA',
  surface2: '#F1F3F4',
  ink: '#202124',
  inkSoft: '#5F6368',
  border: '#DADCE0',
  dark: '#3D3D3D', // mesmo cinza do header/pill glass

  // As 4 cores de marca do Google (usadas no gradiente do logo e
  // nos headers dos e-mails/dashboards do próprio projeto)
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',

  // Cores por módulo (idênticas ao objeto COLORS de
  // src/modules/shared/command-center.js)
  modBlue: '#8AB4F8',
  modRed: '#F28B82',
  modPurple: '#C58AF9',
  modGreen: '#81C995',
  modOrange: '#F9AB00',
  modTeal: '#00BFA5',
  modPink: '#F48FB1',
  modGray: '#9AA0A6',
};

// "Google Sans" é a fonte real do produto, mas é uma fonte interna do
// Google — fora de contas com acesso a ela, o Slides não consegue
// renderizar e cai num fallback silencioso. Para garantir que a
// apresentação renderize igual em qualquer conta, o script usa Roboto
// (a outra fonte oficial do produto, sempre disponível). Se a sua
// conta tiver Google Sans no seletor de fontes do Slides, é seguro
// trocar os valores abaixo manualmente depois — veja o guia de
// melhorias que vem junto com este arquivo.
var FONT = 'Roboto';

// Fonte fixa (não-Google) para o bloco de código do slide de instalação
// — "Courier New" está sempre disponível no Slides, sem o mesmo risco
// de fallback silencioso de uma Google Font.
var CODE_FONT = 'Courier New';

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
  SlidesApp.getUi()
    .createMenu('Case Wizard')
    .addItem('Montar apresentação (do zero)', 'buildPresentation')
    .addItem('Só limpar os slides', 'clearAllSlides')
    .addToUi();
}

function buildPresentation() {
  var pres = SlidesApp.getActivePresentation();
  assertFolderConfigured_();
  assertWidescreen_(pres);

  var leftoverBlank = clearAllSlides_(pres);
  var pageW = pres.getPageWidth();
  var pageH = pres.getPageHeight();
  var ctx = { pres: pres, pageW: pageW, pageH: pageH, pageNum: 0 };

  addCoverSlide_(ctx);
  addAgendaSlide_(ctx);

  addSectionSlide_(ctx, '01', 'O Projeto', COLOR.blue);
  addBulletSlide_(ctx, 'O problema', PROBLEM_BULLETS, { kicker: 'CONTEXTO' });
  addBulletSlide_(ctx, 'A solução: um overlay, um clique', SOLUTION_BULLETS, { kicker: 'PROPOSTA' });
  addBulletSlide_(ctx, 'Como funciona por baixo dos panos', ARCHITECTURE_BULLETS, { kicker: 'ARQUITETURA' });
  addStackSlide_(ctx);
  addBulletSlide_(ctx, 'Um aviso antes de começar', INSTABILITY_BULLETS, { kicker: 'LEIA ANTES' });

  addSectionSlide_(ctx, '02', 'Guia do Usuário — Command Center', COLOR.red);
  addInstallSlide_(ctx);
  addShowcaseSlide_(ctx, {
    kicker: 'COMMAND CENTER', title: 'A pílula flutuante',
    description: 'Um botão só, sempre à mão: clique para abrir e acessar todos os módulos. Ctrl/Cmd+K abre a busca rápida direto.',
    bullets: ['Arrasta e imanta nas bordas da tela', 'Streak de casos concluídos no dia', 'Indicador de "processando" nas automações longas'],
    image: 'pill-aberta.png', icon: 'icon-logo.png', accent: COLOR.blue, imageBg: COLOR.dark,
  });
  USER_MODULES.forEach(function (m) { addShowcaseSlide_(ctx, m); });

  addSectionSlide_(ctx, '03', 'E-mails Automáticos', COLOR.yellow);
  addBulletSlide_(ctx, 'Um motor, várias vozes', EMAIL_ENGINE_BULLETS, { kicker: 'COMO FUNCIONA' });
  EMAIL_SLIDES.forEach(function (m) { addShowcaseSlide_(ctx, m); });

  addSectionSlide_(ctx, '04', 'Guia do TL — BAU Dashboard', COLOR.green, 'go/cw-bau-tl');
  TL_SLIDES.forEach(function (m) { addShowcaseSlide_(ctx, m); });

  addSectionSlide_(ctx, '05', 'Central de Conteúdo', COLOR.blue, 'go/cw-cc');
  addBulletSlide_(ctx, 'Editar sem depender de deploy', CONTENT_CENTRAL_INTRO_BULLETS, { kicker: 'POR QUE EXISTE' });
  CONTENT_CENTRAL_SLIDES.forEach(function (m) { addShowcaseSlide_(ctx, m); });

  addSectionSlide_(ctx, '06', 'Próximos Passos', COLOR.red);
  addBulletSlide_(ctx, 'Roadmap', ROADMAP_BULLETS, { kicker: 'EM ABERTO' });
  addAboutProjectSlide_(ctx);
  addClosingSlide_(ctx);

  if (leftoverBlank) leftoverBlank.remove();
  SlidesApp.getUi().alert('Pronto! ' + ctx.pageNum + ' slides montados.');
}

function clearAllSlides() {
  var pres = SlidesApp.getActivePresentation();
  clearAllSlides_(pres);
  SlidesApp.getUi().alert('Slides limpos.');
}

// ============================================================
// 4. GUARD-RAILS
// ============================================================

function assertFolderConfigured_() {
  if (!CONFIG.DRIVE_FOLDER_ID || CONFIG.DRIVE_FOLDER_ID === 'COLOQUE_O_ID_DA_PASTA_AQUI') {
    throw new Error('Configure CONFIG.DRIVE_FOLDER_ID no topo do script com o ID da pasta do Drive que tem os PNGs.');
  }
}

function assertWidescreen_(pres) {
  var ratio = pres.getPageWidth() / pres.getPageHeight();
  if (Math.abs(ratio - 16 / 9) > 0.05) {
    throw new Error('Esta apresentação não está em 16:9. Vá em Arquivo > Configurar página > Padrão (16:9) antes de rodar de novo.');
  }
}

// clearAllSlides_ deixa 1 slide em branco (mínimo do Slides) e o
// devolve, para ser removido no fim de buildPresentation() depois que
// já existem outros slides.
function clearAllSlides_(pres) {
  var slides = pres.getSlides();
  for (var i = slides.length - 1; i >= 1; i--) slides[i].remove();
  var first = pres.getSlides()[0];
  var els = first.getPageElements();
  for (var j = 0; j < els.length; j++) els[j].remove();
  return first;
}

// ============================================================
// 5. HELPERS DE BAIXO NÍVEL
// ============================================================

function getImageBlob_(fileName) {
  var files = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID).getFilesByName(fileName);
  if (!files.hasNext()) {
    throw new Error('Não achei "' + fileName + '" na pasta do Drive configurada. Confirme o upload e o nome exato do arquivo.');
  }
  return files.next().getBlob();
}

function newSlide_(ctx) {
  var slide = ctx.pres.appendSlide(SlidesApp.PredefinedLayout.BLANK);
  ctx.pageNum++;
  return slide;
}

function addRect_(slide, x, y, w, h, hex) {
  var shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, x, y, w, h);
  shape.getFill().setSolidFill(hex);
  shape.getBorder().setTransparent();
  return shape;
}

function addText_(slide, x, y, w, h, text, opts) {
  opts = opts || {};
  var box = slide.insertTextBox(text, x, y, w, h);
  var style = box.getText().getTextStyle();
  style.setFontFamily(FONT);
  style.setFontSize(opts.size || 14);
  style.setForegroundColor(opts.color || COLOR.ink);
  style.setBold(!!opts.bold);
  if (opts.align) {
    box.getText().getParagraphStyle().setParagraphAlignment(opts.align);
  }
  return box;
}

function addCodeBlock_(slide, x, y, w, h, text) {
  addRect_(slide, x, y, w, h, COLOR.dark);
  var box = slide.insertTextBox(text, x + 16, y + 12, w - 32, h - 24);
  var style = box.getText().getTextStyle();
  style.setFontFamily(CODE_FONT);
  style.setFontSize(9.5);
  style.setForegroundColor('#E8EAED');
  return box;
}

// Insere a imagem encaixada (contain) numa caixa x,y,maxW,maxH,
// centralizada, preservando proporção — não deforma o print.
function addImageFit_(slide, fileName, x, y, maxW, maxH) {
  var img = slide.insertImage(getImageBlob_(fileName));
  var ratio = img.getHeight() / img.getWidth();
  var w = maxW;
  var h = w * ratio;
  if (h > maxH) {
    h = maxH;
    w = h / ratio;
  }
  img.setWidth(w).setHeight(h);
  img.setLeft(x + (maxW - w) / 2).setTop(y + (maxH - h) / 2);
  return img;
}

function addIconBadge_(slide, fileName, cx, cy, size, bgHex) {
  var d = size;
  var circle = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, cx - d / 2, cy - d / 2, d, d);
  circle.getFill().setSolidFill(bgHex, 0.12);
  circle.getBorder().setTransparent();
  var iconSize = d * 0.56;
  var img = slide.insertImage(getImageBlob_(fileName));
  var ratio = img.getHeight() / img.getWidth();
  var w = iconSize, h = iconSize * ratio;
  img.setWidth(w).setHeight(h);
  img.setLeft(cx - w / 2).setTop(cy - h / 2);
  return img;
}

function addFourColorBar_(slide, x, y, w, h) {
  var colors = [COLOR.blue, COLOR.red, COLOR.yellow, COLOR.green];
  var seg = w / colors.length;
  colors.forEach(function (c, i) { addRect_(slide, x + i * seg, y, seg, h, c); });
}

function addKicker_(slide, x, y, w, text, hex) {
  addText_(slide, x, y, w, 18, text.toUpperCase(), { size: 11, bold: true, color: hex });
}

function addFooter_(ctx, slide) {
  var y = ctx.pageH - 24;
  addRect_(slide, 32, y - 6, ctx.pageW - 64, 0.75, COLOR.border);
  addText_(slide, 32, y, 220, 16, 'Case Wizard · TechSol Operations Assistant', { size: 8, color: COLOR.inkSoft });
  addText_(slide, ctx.pageW - 90, y, 60, 16, String(ctx.pageNum), { size: 8, color: COLOR.inkSoft, align: SlidesApp.ParagraphAlignment.END });
}

// ============================================================
// 6. TIPOS DE SLIDE
// ============================================================

function addCoverSlide_(ctx) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.bg);
  addFourColorBar_(slide, 0, ctx.pageH - 10, ctx.pageW, 10);

  var logoSize = 84;
  var logo = slide.insertImage(getImageBlob_('icon-logo.png'));
  var r = logo.getHeight() / logo.getWidth();
  logo.setWidth(logoSize).setHeight(logoSize * r);
  logo.setLeft(ctx.pageW / 2 - logoSize / 2).setTop(ctx.pageH * 0.2);

  addText_(slide, ctx.pageW * 0.1, ctx.pageH * 0.44, ctx.pageW * 0.8, 60,
    'Case Wizard', { size: 40, bold: true, color: COLOR.ink, align: SlidesApp.ParagraphAlignment.CENTER });
  addText_(slide, ctx.pageW * 0.1, ctx.pageH * 0.56, ctx.pageW * 0.8, 30,
    'TechSol Operations Assistant — visão geral do projeto e guia de uso para quem atende no Connect Cases',
    { size: 14.5, color: COLOR.inkSoft, align: SlidesApp.ParagraphAlignment.CENTER });
  addText_(slide, ctx.pageW * 0.1, ctx.pageH * 0.66, ctx.pageW * 0.8, 22,
    monthYearPtBr_(),
    { size: 11.5, color: COLOR.inkFaint || COLOR.inkSoft, align: SlidesApp.ParagraphAlignment.CENTER });
}

function addAgendaSlide_(ctx) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.bg);
  addKicker_(slide, 64, 48, 300, 'Agenda', COLOR.blue);
  addText_(slide, 64, 66, ctx.pageW - 128, 40, 'O que vamos ver hoje', { size: 26, bold: true });

  var items = [
    ['01', 'O Projeto', COLOR.blue],
    ['02', 'Guia do Usuário — Command Center', COLOR.red],
    ['03', 'E-mails Automáticos', COLOR.yellow],
    ['04', 'Guia do TL — BAU Dashboard', COLOR.green],
    ['05', 'Central de Conteúdo', COLOR.blue],
    ['06', 'Próximos Passos', COLOR.red],
  ];
  var top = ctx.pageH * 0.32;
  var rowH = (ctx.pageH * 0.58) / items.length;
  items.forEach(function (it, i) {
    var y = top + i * rowH;
    addRect_(slide, 64, y + 6, 34, 34, it[2]);
    addText_(slide, 64, y + 6, 34, 34, it[0], { size: 13, bold: true, color: COLOR.bg, align: SlidesApp.ParagraphAlignment.CENTER });
    addText_(slide, 112, y, ctx.pageW - 200, 34, it[1], { size: 16, color: COLOR.ink });
  });
  addFooter_(ctx, slide);
}

function addSectionSlide_(ctx, number, title, accent, link) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.dark);
  addFourColorBar_(slide, 0, ctx.pageH - 10, ctx.pageW, 10);

  var iconSize = 40;
  var img = slide.insertImage(getImageBlob_('icon-logo-white.png'));
  var r = img.getHeight() / img.getWidth();
  img.setWidth(iconSize).setHeight(iconSize * r);
  img.setLeft(64).setTop(56);

  addText_(slide, ctx.pageW - 220, 56, 156, 60, number, { size: 48, bold: true, color: accent, align: SlidesApp.ParagraphAlignment.END });
  addText_(slide, 64, ctx.pageH * 0.44, ctx.pageW - 128, 60, title, { size: 32, bold: true, color: '#FFFFFF' });
  addRect_(slide, 64, ctx.pageH * 0.44 + 58, 64, 4, accent);
  if (link) {
    addText_(slide, 64, ctx.pageH * 0.44 + 74, ctx.pageW - 128, 20, 'Acesse direto em: ' + link, { size: 12, color: '#C7C9CC' });
  }
}

function addBulletSlide_(ctx, title, bullets, opts) {
  opts = opts || {};
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.bg);
  if (opts.kicker) addKicker_(slide, 64, 48, 300, opts.kicker, COLOR.blue);
  addText_(slide, 64, 66, ctx.pageW - 128, 40, title, { size: 26, bold: true });

  var top = ctx.pageH * 0.32;
  var rowH = Math.min(46, (ctx.pageH * 0.55) / bullets.length);
  bullets.forEach(function (b, i) {
    var y = top + i * rowH;
    addRect_(slide, 64, y + 8, 8, 8, COLOR.blue);
    addText_(slide, 84, y, ctx.pageW - 160, rowH, b, { size: 14, color: COLOR.ink });
  });
  addFooter_(ctx, slide);
}

function addStackSlide_(ctx) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.bg);
  addKicker_(slide, 64, 48, 300, 'STACK TÉCNICA', COLOR.blue);
  addText_(slide, 64, 66, ctx.pageW - 128, 40, 'Feito para rodar sem servidor próprio', { size: 24, bold: true });

  var cards = [
    ['Frontend', 'Vanilla JS (ES modules) + esbuild — sem framework, CSS-in-JS', COLOR.modBlue],
    ['Backend', 'Google Apps Script (V8) — sem servidor/DB tradicional', COLOR.modGreen],
    ['Dados', 'Google Sheets como banco, JSONP como transporte (sem CORS)', COLOR.modOrange],
    ['Deploy', 'GitHub Actions → Firebase Hosting (front) + clasp (backend)', COLOR.modPurple],
  ];
  var margin = 64, gap = 16;
  var cardW = (ctx.pageW - margin * 2 - gap * (cards.length - 1)) / cards.length;
  var cardY = ctx.pageH * 0.34, cardH = ctx.pageH * 0.42;
  cards.forEach(function (c, i) {
    var x = margin + i * (cardW + gap);
    addRect_(slide, x, cardY, cardW, cardH, COLOR.bgAlt);
    addRect_(slide, x, cardY, cardW, 5, c[2]);
    addText_(slide, x + 12, cardY + 18, cardW - 24, 24, c[0], { size: 14, bold: true, color: COLOR.ink });
    addText_(slide, x + 12, cardY + 46, cardW - 24, cardH - 60, c[1], { size: 10.5, color: COLOR.inkSoft });
  });
  addFooter_(ctx, slide);
}

function addInstallSlide_(ctx) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.bg);
  addKicker_(slide, 64, 40, 400, 'ANTES DE TUDO', COLOR.blue);
  addText_(slide, 64, 58, ctx.pageW - 128, 34, 'Instale o bookmarklet', { size: 22, bold: true });

  var steps = [
    'Copie o código no bloco abaixo (inteiro, de "javascript:" até o final).',
    'Na barra de favoritos do navegador, clique com o botão direito → "Adicionar página" (ou "Novo favorito").',
    'No campo Nome, escreva exatamente: Cases Wizard',
    'No campo URL, cole o código copiado — no lugar de um endereço normal.',
    'Salve. Daqui pra frente, sempre que estiver no Connect Cases, clique nesse favorito para abrir o Case Wizard — essa versão aponta sempre para a branch main, a mais atual.',
  ];
  var top = ctx.pageH * 0.22;
  var rowH = 24;
  steps.forEach(function (s, i) {
    var y = top + i * rowH;
    addRect_(slide, 64, y + 3, 16, 16, COLOR.blue);
    addText_(slide, 64, y + 1, 16, 16, String(i + 1), { size: 9, bold: true, color: '#FFFFFF', align: SlidesApp.ParagraphAlignment.CENTER });
    addText_(slide, 88, y, ctx.pageW - 152, rowH, s, { size: 11, color: COLOR.ink });
  });

  var codeY = top + steps.length * rowH + 16;
  addCodeBlock_(slide, 64, codeY, ctx.pageW - 128, ctx.pageH - codeY - 36, INSTALL_BOOKMARKLET);
  addFooter_(ctx, slide);
}

function addAboutProjectSlide_(ctx) {
  addBulletSlide_(ctx, 'De onde viemos', ABOUT_BULLETS, { kicker: 'SOBRE O PROJETO' });
}

// O slide-modelo reaproveitado para (quase) toda captura de tela:
// coluna esquerda com ícone/título/descrição, coluna direita com o
// print encaixado sobre um fundo levemente colorido pelo accent.
//
// A coluna esquerda usa um "cursor" vertical (cursorY) que avança depois
// de cada elemento pela altura real dele + um respiro fixo — evita que um
// elemento (ex.: o selo do kicker) fique embaixo do próximo (ex.: o
// círculo do ícone), que é o que acontecia antes com posições fixas.
function addShowcaseSlide_(ctx, opts) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.bg);

  var margin = 56;
  var leftW = ctx.pageW * 0.34;
  var rightX = margin + leftW + 28;
  var rightW = ctx.pageW - rightX - margin;
  var gap = 14;
  var cursorY = 38;

  if (opts.kicker) {
    addKicker_(slide, margin, cursorY, leftW, opts.kicker, opts.accent || COLOR.blue);
    cursorY += 16 + gap * 0.6;
  }
  if (opts.link) {
    addText_(slide, margin, cursorY, leftW, 14, 'Acesse: ' + opts.link, { size: 9.5, bold: true, color: opts.accent || COLOR.blue });
    cursorY += 14 + gap * 0.6;
  }
  if (opts.icon) {
    var badgeSize = 50;
    addIconBadge_(slide, opts.icon, margin + badgeSize / 2, cursorY + badgeSize / 2, badgeSize, opts.accent || COLOR.blue);
    cursorY += badgeSize + gap;
  }

  addText_(slide, margin, cursorY, leftW, 30, opts.title, { size: 21, bold: true, color: COLOR.ink });
  cursorY += 30 + 6;

  var descH = 76;
  addText_(slide, margin, cursorY, leftW, descH, opts.description, { size: 12, color: COLOR.inkSoft });
  cursorY += descH + 2;

  if (opts.bullets && opts.bullets.length) {
    opts.bullets.forEach(function (b) {
      addRect_(slide, margin, cursorY + 6, 6, 6, opts.accent || COLOR.blue);
      addText_(slide, margin + 16, cursorY, leftW - 16, 24, b, { size: 10.5, color: COLOR.ink });
      cursorY += 24;
    });
  }

  var imgBoxY = ctx.pageH * 0.12;
  var imgBoxH = ctx.pageH * 0.78;
  addRect_(slide, rightX, imgBoxY, rightW, imgBoxH, opts.imageBg || COLOR.bgAlt);
  addRect_(slide, rightX, imgBoxY, 4, imgBoxH, opts.accent || COLOR.blue);
  addImageFit_(slide, opts.image, rightX + 20, imgBoxY + 16, rightW - 40, imgBoxH - 32);

  addFooter_(ctx, slide);
}

function addClosingSlide_(ctx) {
  var slide = newSlide_(ctx);
  addRect_(slide, 0, 0, ctx.pageW, ctx.pageH, COLOR.dark);
  addFourColorBar_(slide, 0, ctx.pageH - 10, ctx.pageW, 10);

  var logoSize = 56;
  var img = slide.insertImage(getImageBlob_('icon-logo.png'));
  var r = img.getHeight() / img.getWidth();
  img.setWidth(logoSize).setHeight(logoSize * r);
  img.setLeft(ctx.pageW / 2 - logoSize / 2).setTop(ctx.pageH * 0.09);

  addText_(slide, ctx.pageW * 0.1, ctx.pageH * 0.25, ctx.pageW * 0.8, 40,
    'Obrigado!', { size: 28, bold: true, color: '#FFFFFF', align: SlidesApp.ParagraphAlignment.CENTER });

  addText_(slide, ctx.pageW * 0.12, ctx.pageH * 0.4, ctx.pageW * 0.76, 24,
    'Case Wizard é mantido por Lucas Teixeira Di Cesare Santos (lucaste).',
    { size: 13.5, color: '#E8EAED', align: SlidesApp.ParagraphAlignment.CENTER });
  addText_(slide, ctx.pageW * 0.12, ctx.pageH * 0.48, ctx.pageW * 0.76, 24,
    'Encontrou um bug ou tem uma sugestão? ' + FEEDBACK_FORM_URL,
    { size: 13, color: COLOR.modBlue, align: SlidesApp.ParagraphAlignment.CENTER });
  addText_(slide, ctx.pageW * 0.14, ctx.pageH * 0.6, ctx.pageW * 0.72, 40,
    'Agradecimentos especiais a joaovi, por testar o projeto e trazer ideias ao longo do caminho, e a ricardogi e santosrafael, pelo incentivo.',
    { size: 11.5, color: '#9AA0A6', align: SlidesApp.ParagraphAlignment.CENTER });
}

// ============================================================
// 7. CONTEÚDO — textos extraídos de README.md / VISION.md / docs/
//    (não inventados — ajuste livremente para o tom da sua empresa)
// ============================================================

var PROBLEM_BULLETS = [
  'Agentes de suporte BAU/LM (PT/ES) fazem tarefas repetitivas dentro do Connect Cases: notas, e-mails, scripts de ligação, fuso horário.',
  'O Connect Cases não tem automação nativa para esse fluxo, e trocar de ferramenta quebra o ritmo do atendimento.',
  'Erros de padronização em notas e e-mails geram retrabalho e demoram a escalar para o time BAU.',
];

var SOLUTION_BULLETS = [
  '"TechSol Operations Assistant": um overlay injetado sobre o Connect Cases via bookmarklet — sem extensão de navegador, sem instalação.',
  'Um clique no favorito e a Command Center aparece flutuando sobre a tela do agente.',
  'Padroniza o repetitivo (notas, e-mails, scripts) e automatiza a escalação para o time BAU.',
];

var ARCHITECTURE_BULLETS = [
  'O bookmarklet injeta um <script> que carrega o bundle (Firebase Hosting) direto na página do Connect Cases.',
  'Frontend fala com o backend via JSONP (não fetch) para não esbarrar em CORS — Google Apps Script responde por trás de um roteador único (op=...).',
  'Google Sheets é o banco de dados; não existe servidor ou banco tradicional.',
  'Deploy 100% automatizado por GitHub Actions a cada push — front pro Firebase Hosting, backend via clasp, sem credencial de longa duração no repositório.',
];

var INSTABILITY_BULLETS = [
  'O Connect Cases tem instabilidades conhecidas — travamentos, campos que não carregam, timeouts. Isso não é causado pelo Case Wizard, mas como ele roda em cima do Connect Cases, os dois efeitos aparecem juntos na mesma tela.',
  'Se uma nota ou e-mail não inserir de primeira, tente de novo antes de suspeitar do app — na maioria das vezes é o Connect Cases, não o Case Wizard.',
  'Por isso o Case Wizard tem redundância própria: notas ficam salvas em rascunho automático (mesmo se a aba fechar ou o Connect Cases travar, o texto não se perde), e o Email Assistant limpa rascunhos "fantasmas" do Gmail antes de preencher um novo.',
  'Encontrou um bug? Reporte pelo formulário no fim desta apresentação — cada relato ajuda a separar "bug do Case Wizard" de "instabilidade do Connect Cases".',
];

var EMAIL_ENGINE_BULLETS = [
  'Um único template HTML (EmailTemplateDynamic.html) com placeholders {{TOKEN}} — sem duplicar design por tipo de e-mail.',
  'O backend (EmailEngine.js) escolhe cor, ícone, saudação e assunto de acordo com o tipo de evento (caso enviado, ação necessária, caso criado, descarte...).',
  'Mesmo idioma de quem recebe (PT/ES), detectado automaticamente pelo perfil do usuário.',
];

var CONTENT_CENTRAL_INTRO_BULLETS = [
  'Antes: mudar um link, um script de ligação ou um template de e-mail exigia editar código e fazer deploy.',
  'Agora: a Central de Conteúdo edita esse conteúdo direto, sem tocar em código.',
  'Toda alteração vira uma proposta (rascunho) — só entra no ar depois de aprovada por quem tem permissão.',
  'Controle de acesso próprio: cada pessoa só edita os módulos liberados para ela.',
];

var ROADMAP_BULLETS = [
  'Personalização por segmento do agente (Gold/Silver, OCT) chegando em breve — conteúdo e fluxos ajustados automaticamente a quem está atendendo.',
  'Completar a seção "Implementação/Tag Support" do Call Script em ES (aguardando conteúdo real do time).',
  'Revisão do espanhol por um falante nativo — prioridade para os 8 templates de e-mail e os 27 cenários de nota.',
  'Abrir espaço aqui para o que a sua equipe quiser priorizar a seguir.',
];

var ABOUT_BULLETS = [
  'O Case Wizard começou a ser desenvolvido em outubro de 2025 e já passou por diversas atualizações até chegar nesta versão — ainda não é um projeto "fechado", e continua evoluindo.',
  'Uma parte dos agentes já usa o Case Wizard no dia a dia, mesmo com o projeto em constante mudança.',
  'A empresa já tem um projeto parecido, o "Case Notes 3.0" (de filipepereira) — o Case Wizard não é uma substituição a ele, é uma alternativa. Aliás, foi a inspiração inicial para começar este projeto.',
];

var USER_MODULES = [
  { kicker: 'MÓDULO', title: 'Case Notes', accent: COLOR.modBlue, icon: 'icon-notes.png', image: 'modulo-case-notes.png',
    description: 'Gera notas padronizadas (BAU/LM, PT/ES) a partir de um fluxo Status → Sub-status → template.',
    bullets: ['Captura automática do Speakeasy ID', 'Seletor visual de tarefas e cenários rápidos', 'Rascunho salvo automaticamente'] },
  { kicker: 'MÓDULO', title: 'BAU Central', accent: COLOR.modBlue, icon: 'icon-bauform.png', image: 'modulo-bau-form.png',
    description: 'Wizard de escalação de caso para o time BAU — abertura ou descarte.',
    bullets: ['Dashboard dos próprios casos escalados', 'Fluxo de edição antes da aprovação do TL', 'Acompanhamento do status em tempo real'] },
  { kicker: 'MÓDULO', title: 'Email Assistant', accent: COLOR.modRed, icon: 'icon-email.png', image: 'modulo-email-assistant.png',
    description: 'Biblioteca de templates de e-mail com placeholders e atalhos "Smart CR".',
    bullets: ['Detecta e limpa rascunhos "fantasmas" do Gmail', 'Templates ligados ao sub-status da nota', 'Prévia antes de preencher no Connect Cases'] },
  { kicker: 'MÓDULO', title: 'Call Script Assistant', accent: COLOR.modPurple, icon: 'icon-script.png', image: 'modulo-call-script.png',
    description: 'Checklist interativo de ligação — PT/ES/EN, fluxos BAU e LT.',
    bullets: ['Progresso visual passo a passo', 'Captura ao vivo do CID/e-mail do cliente'] },
  { kicker: 'MÓDULO', title: 'Links Hub', accent: COLOR.modGreen, icon: 'icon-links.png', image: 'modulo-links.png',
    description: 'Atalhos internos organizados por categoria — sem precisar decorar URL.',
    bullets: ['Categorias: Tarefas, Ads, Analytics, Shop, Tech, RH, QA...', 'Editável pela Central de Conteúdo, sem deploy'] },
  { kicker: 'MÓDULO', title: 'My Library', accent: COLOR.modPink, icon: 'icon-library.png', image: 'modulo-my-library.png',
    description: 'Snippets pessoais do agente — notas, e-mails, textos gerais.',
    bullets: ['Sincroniza entre dispositivos via Google Sheets', 'Estratégia cache-first: nunca trava esperando rede'] },
  { kicker: 'MÓDULO', title: 'Timezone Assistant', accent: COLOR.modTeal, icon: 'icon-timezone.png', image: 'modulo-timezones.png',
    description: 'Horário local ao vivo por país e planejador de horário de reunião.',
    bullets: ['Evita marcar call no fuso errado do cliente', 'Direto na pílula, sem trocar de aba para converter horário'] },
  { kicker: 'MÓDULO', title: 'Configurações', accent: COLOR.modGray, icon: 'icon-configs.png', image: 'modulo-configuracoes.png',
    description: 'Perfil do agente — papel, segmento, idioma — e preferências de som.',
    bullets: ['Idioma herdado da planilha People, troca manual aqui', 'É também onde fica o link de feedback do projeto'] },
  { kicker: 'MÓDULO', title: 'Avisos (Broadcast)', accent: COLOR.modOrange, icon: 'icon-broadcast.png', image: 'modulo-avisos.png',
    description: 'Comunicados globais vindos do backend, com marcação de lido.',
    bullets: ['Suporte a emoji-shortcodes customizados', 'Editável pela Central de Conteúdo'] },
];

var EMAIL_SLIDES = [
  { kicker: 'E-MAIL', title: 'Caso enviado (agente)', accent: COLOR.modBlue, image: 'email-agente-caso-enviado.png',
    description: 'Confirma pro agente que o caso BAU entrou na fila e já aguarda a liderança.' },
  { kicker: 'E-MAIL', title: 'Ação necessária (liderança)', accent: COLOR.yellow, image: 'email-lideranca-acao-necessaria.png',
    description: 'Avisa o TL que um novo caso precisa de abertura — com selo de urgência conforme o prazo do agendamento.' },
  { kicker: 'E-MAIL', title: 'Caso criado (agente)', accent: COLOR.green, image: 'email-agente-caso-criado.png',
    description: 'Fecha o ciclo: avisa o agente que a liderança já criou o caso e está tudo pronto para o atendimento.' },
];

var TL_SLIDES = [
  { kicker: 'TL DASHBOARD', title: 'Aprovação de Criação', accent: COLOR.blue, image: 'tl-dashboard-aprovacao-criacao.png',
    description: 'Fila de casos BAU aguardando abertura, com contexto, CID e agendamento.',
    bullets: ['Aprovar ou rejeitar em um clique', 'Painel lateral com TLs ativos e atividade recente'] },
  { kicker: 'TL DASHBOARD', title: 'Aprovação de Descarte', accent: COLOR.red, image: 'tl-dashboard-aprovacao-descarte.png',
    description: 'Mesma fila, para pedidos de descarte — o TL confirma ou mantém o caso ativo.' },
  { kicker: 'TL DASHBOARD', title: 'Histórico & Métricas', accent: COLOR.green, image: 'tl-dashboard-historico.png',
    description: 'Casos aprovados/descartados nos últimos 7 dias, tempo médio de aprovação e ranking de quem mais abriu casos.' },
];

var CONTENT_CENTRAL_SLIDES = [
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'Links', accent: COLOR.modGreen, image: 'central-conteudo-links.png',
    description: 'Gerencia os atalhos do Links Hub por categoria, sem tocar em código.' },
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'Call Script', accent: COLOR.modPurple, image: 'central-conteudo-call-script.png',
    description: 'Edita os passos do checklist de ligação por fluxo e idioma.' },
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'Case Notes', accent: COLOR.modBlue, image: 'central-conteudo-case-notes.png',
    description: 'Cada modelo é uma nota pronta: o agente clica e ela nasce com o sub-status certo e os campos já preenchidos.' },
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'E-mails', accent: COLOR.modRed, image: 'central-conteudo-emails.png',
    description: 'Biblioteca de templates do Email Assistant, editável por categoria.' },
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'Dicas', accent: COLOR.modOrange, image: 'central-conteudo-dicas.png',
    description: 'As frases que aparecem para os agentes durante o uso do app.' },
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'Aprovações', accent: COLOR.yellow, image: 'central-conteudo-aprovacoes.png',
    description: 'Toda proposta de mudança passa por aqui antes de virar conteúdo ao vivo — diff lado a lado.' },
  { kicker: 'CENTRAL DE CONTEÚDO', title: 'Acessos', accent: COLOR.modGray, image: 'central-conteudo-acessos.png',
    description: 'Quem pode editar o quê — controle de permissão por pessoa e por módulo.' },
];
