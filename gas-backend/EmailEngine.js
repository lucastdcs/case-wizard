// =========================================================
// IDIOMA DOS E-MAILS AUTOMÁTICOS
// =========================================================
// Estes e-mails vão para o AGENTE (ou para a liderança), não para o
// anunciante — então o idioma certo é o de quem recebe, e ele já está na
// planilha People: getUserProfileByLdap() (Código.js, mesmo escopo global
// do Apps Script) devolve defaultLanguage a partir do LDAP.
//
// Qualquer falha aqui cai em PT em silêncio, de propósito: um e-mail no
// idioma errado é muito melhor do que um e-mail que não sai.
function getRecipientLang(destinatario) {
  try {
    const ldap = String(destinatario || "").split('@')[0].toLowerCase().trim();
    if (!ldap) return 'pt';
    const profile = getUserProfileByLdap(ldap);
    return String(profile && profile.defaultLanguage) === 'ES' ? 'es' : 'pt';
  } catch (e) {
    return 'pt';
  }
}

const EMAIL_I18N = {
  pt: {
    dateUnavailable: "Data indisponível",
    dateAt: " às ",
    fallbackTeam: "Equipe BAU",
    defaultGreeting: "Olá,",
    defaultSubject: function (adv) { return "Notificação TechSol: " + adv; },
    defaultCase: "Caso",
    footerAutomated: "PROCESSAMENTO AUTOMATIZADO",
    urgentToday: "🚨 URGENTE: Agendado para Hoje/Amanhã!",
    urgentSoon: "⚠️ ATENÇÃO: Agendado para os próximos 3 dias",
    urgentGreen: "📅 STATUS VERDE: Agendado para +5 dias",
    agentSentFooter: "CASO REGISTRADO",
    agentSentGreeting: "Olá, Agente!",
    agentSentMessage: function (adv) { return "A solicitação para o anunciante <strong>" + adv + "</strong> foi materializada e já aguarda a análise da liderança."; },
    agentSentSubject: function (adv) { return "⚡ Caso na Fila BAU: " + adv; },
    leadershipGreeting: "Atenção Liderança,",
    leadershipMessage: function (adv) { return "Uma nova solicitação para o anunciante <strong>" + adv + "</strong> foi enviada e exige abertura de caso."; },
    leadershipFooter: "AGUARDANDO AÇÃO",
    leadershipSubject: function (adv) { return "🚨 Requer Ação BAU: " + adv; },
    createdGreeting: "Boas notícias!",
    createdMessage: function (adv) { return "A liderança acabou de <strong>CRIAR O CASO BAU</strong> para o anunciante <strong>" + adv + "</strong>. Tudo pronto para o atendimento."; },
    createdFooter: "SOLICITAÇÃO CONCLUÍDA",
    createdSubject: function (adv) { return "✅ Caso Criado: " + adv; },
    discardSentSubtitle: "Descarte Evaluation",
    discardSentGreeting: "Olá, Agente!",
    discardSentMessage: function (adv) { return "Sua solicitação de <strong>DESCARTE</strong> para o anunciante <strong>" + adv + "</strong> foi enviada para avaliação do TL."; },
    discardSentFooter: "AVALIAÇÃO PENDENTE",
    discardSentSubject: function (adv) { return "🗑️ Descarte em Avaliação: " + adv; },
    discardDoneSubtitle: "Descarte Concluído",
    discardDoneGreeting: "Aviso Importante,",
    discardDoneMessage: function (adv) { return "O descarte do caso do anunciante <strong>" + adv + "</strong> foi <strong>APROVADO E CONCLUÍDO</strong> pela liderança."; },
    discardDoneFooter: "CASO DESCARTADO",
    discardDoneSubject: function (adv) { return "❌ Caso Descartado: " + adv; },
    labelContext: "Contexto / Motivo",
    labelDomain: "Domínio Final",
    labelSchedule: "Agendamento (SLA)",
    labelTask: "Procedimento / Task BAU"
  },
  es: {
    dateUnavailable: "Fecha no disponible",
    dateAt: " a las ",
    fallbackTeam: "Equipo BAU",
    defaultGreeting: "Hola,",
    defaultSubject: function (adv) { return "Notificación TechSol: " + adv; },
    defaultCase: "Caso",
    footerAutomated: "PROCESAMIENTO AUTOMATIZADO",
    urgentToday: "🚨 URGENTE: ¡Agendado para Hoy/Mañana!",
    urgentSoon: "⚠️ ATENCIÓN: Agendado para los próximos 3 días",
    urgentGreen: "📅 ESTADO VERDE: Agendado para +5 días",
    agentSentFooter: "CASO REGISTRADO",
    agentSentGreeting: "¡Hola, Agente!",
    agentSentMessage: function (adv) { return "La solicitud para el anunciante <strong>" + adv + "</strong> fue registrada y ya espera el análisis de la gerencia."; },
    agentSentSubject: function (adv) { return "⚡ Caso en la Fila BAU: " + adv; },
    leadershipGreeting: "Atención Gerencia,",
    leadershipMessage: function (adv) { return "Una nueva solicitud para el anunciante <strong>" + adv + "</strong> fue enviada y requiere la apertura de un caso."; },
    leadershipFooter: "ESPERANDO ACCIÓN",
    leadershipSubject: function (adv) { return "🚨 Requiere Acción BAU: " + adv; },
    createdGreeting: "¡Buenas noticias!",
    createdMessage: function (adv) { return "La gerencia acaba de <strong>CREAR EL CASO BAU</strong> para el anunciante <strong>" + adv + "</strong>. Todo listo para la atención."; },
    createdFooter: "SOLICITUD CONCLUIDA",
    createdSubject: function (adv) { return "✅ Caso Creado: " + adv; },
    discardSentSubtitle: "Descarte Evaluation",
    discardSentGreeting: "¡Hola, Agente!",
    discardSentMessage: function (adv) { return "Tu solicitud de <strong>DESCARTE</strong> para el anunciante <strong>" + adv + "</strong> fue enviada para evaluación del TL."; },
    discardSentFooter: "EVALUACIÓN PENDIENTE",
    discardSentSubject: function (adv) { return "🗑️ Descarte en Evaluación: " + adv; },
    discardDoneSubtitle: "Descarte Concluido",
    discardDoneGreeting: "Aviso Importante,",
    discardDoneMessage: function (adv) { return "El descarte del caso del anunciante <strong>" + adv + "</strong> fue <strong>APROBADO Y CONCLUIDO</strong> por la gerencia."; },
    discardDoneFooter: "CASO DESCARTADO",
    discardDoneSubject: function (adv) { return "❌ Caso Descartado: " + adv; },
    labelContext: "Contexto / Motivo",
    labelDomain: "Dominio Final",
    labelSchedule: "Programación (SLA)",
    labelTask: "Procedimiento / Task BAU"
  }
};

// =========================================================
// TOKENS VISUAIS DOS E-MAILS
// =========================================================
// E-mail não tem custom properties de CSS, e o Gmail descarta boa parte do CSS
// declarado por classe — é por isso que o template é todo inline. Para a paleta
// e a escala ainda assim viverem num lugar só, os valores ficam aqui e tanto o
// template quanto os fragmentos montados em JS os referenciam como {{t.chave}}.
// applyEmailTokens() resolve todos numa passada, no fim da montagem.
const EMAIL_TOKENS = {
  // Superfícies
  pageBg: "#F8F9FA",
  cardBg: "#FFFFFF",
  panelBg: "#F8F9FA",
  headerBg: "#3D3D3D",
  chipBg: "#F1F3F4",
  border: "#DADCE0",

  // Texto
  textStrong: "#202124",
  textBody: "#3C4043",
  textMuted: "#5F6368",
  textOnDark: "#FFFFFF",
  link: "#1A73E8",

  // Acentos por tipo de e-mail
  accentBlue: "#8ab4f8",
  accentGreen: "#81c995",
  accentRedSoft: "#f28b82",
  accentRed: "#ea4335",
  accentAmber: "#F9AB00",

  // Estados dos avisos de urgência
  urgentBg: "#FCE8E6",
  urgentBorder: "#F5C1BC",
  urgentText: "#C5221F",
  warnBg: "#FEF7E0",
  warnBorder: "#FADFA1",
  warnText: "#B06000",
  okBg: "#E6F4EA",
  okBorder: "#B7DFC2",
  okText: "#1E8E3E",

  // Modo escuro
  darkPageBg: "#1F1F1F",
  darkCardBg: "#2A2B2E",
  darkPanelBg: "#202124",
  darkChipBg: "#303134",
  darkBorder: "#3C4043",
  darkTextStrong: "#E8EAED",
  darkTextMuted: "#9AA0A6",

  // Tipografia. A Google Sans vinha por <link>, que o Gmail remove — a stack
  // abaixo é a que de fato resolve no cliente, com a webfont só valendo para
  // quem já a tem instalada localmente.
  fontSans: "'Google Sans', Roboto, Helvetica, Arial, sans-serif",
  fontMono: "'Roboto Mono', Consolas, 'Courier New', monospace",
  sizeTitle: "24px",
  sizeGreeting: "18px",
  sizeBody: "15px",
  sizeMeta: "14px",
  sizeSub: "13px",
  sizeLabel: "12px",
  sizeMetric: "48px",

  // Forma
  radiusCard: "16px",
  radiusPanel: "12px",
  radiusPill: "100px"
};

// Substituição de slot à prova de "$". String.replace trata $&, $1 e afins como
// referências especiais na string de troca, então um motivo de caso contendo um
// cifrão sairia corrompido. A forma de função devolve o texto literal.
function fillEmailSlot(html, token, value) {
  const safe = (value === null || value === undefined) ? "" : String(value);
  return html.replace(token, function () { return safe; });
}

function applyEmailTokens(html) {
  const resolved = html.replace(/{{t\.([A-Za-z]+)}}/g, function (match, key) {
    return Object.prototype.hasOwnProperty.call(EMAIL_TOKENS, key) ? EMAIL_TOKENS[key] : match;
  });
  // Token inexistente é erro de digitação, não valor vazio: estourar aqui é bem
  // melhor do que entregar "{{t.corDoTexto}}" no meio de um atributo style.
  const unknown = resolved.match(/{{t\.[A-Za-z]+}}/g);
  if (unknown) {
    throw new Error("Token de e-mail desconhecido: " + unknown.join(", "));
  }
  return resolved;
}

// =========================================================
// CASCA COMPARTILHADA
// =========================================================
// Todo e-mail do projeto passa por aqui. Antes existiam duas cascas — esta e
// uma cópia manual dentro de BAU_Alerts.js — que foram divergindo em cor,
// raio e espaçamento. O que varia entre um tipo e outro são os slots.
function renderBauEmail(parts) {
  const template = HtmlService.createHtmlOutputFromFile('EmailTemplateDynamic').getContent();

  let html = template;
  html = fillEmailSlot(html, "{{PREHEADER}}", parts.preheader);
  html = fillEmailSlot(html, "{{HEADER_ICON}}", parts.headerIcon);
  html = fillEmailSlot(html, "{{HEADER_SUBTITLE}}", parts.headerSubtitle);
  html = html.replace(/{{THEME_COLOR}}/g, function () {
    return parts.themeColor || EMAIL_TOKENS.accentBlue;
  });
  html = fillEmailSlot(html, "{{CONTENT_ALIGN}}", parts.contentAlign || "left");
  html = fillEmailSlot(html, "{{INTRO_BLOCK}}", parts.introBlock);
  html = fillEmailSlot(html, "{{MAIN_MESSAGE}}", parts.mainMessage);
  html = fillEmailSlot(html, "{{URGENCY_BADGE}}", parts.urgencyBadge);
  html = fillEmailSlot(html, "{{BODY_BLOCKS}}", parts.bodyBlocks);
  html = fillEmailSlot(html, "{{FOOTER_ACTION}}", parts.footerAction);
  html = fillEmailSlot(html, "{{FOOTER_NOTE}}", parts.footerNote);

  return applyEmailTokens(html);
}

// Saudação + quem originou a solicitação. O alerta de volume não tem autor
// humano, então passa vazio e o bloco simplesmente não existe.
function renderEmailIntro(greeting, senderLdap) {
  return '<p style="margin: 0 0 6px 0; font-family: {{t.fontSans}}; font-size: {{t.sizeGreeting}}; color: {{t.textStrong}}; font-weight: 500; letter-spacing: -0.2px;" class="dm-text">' + greeting + '</p>'
    + '<p style="margin: 0 0 24px 0; font-family: {{t.fontSans}}; font-size: {{t.sizeSub}}; color: {{t.textMuted}}; font-weight: 500;" class="dm-muted">'
    + 'Solicitado por: <a href="https://moma.corp.google.com/chat?with=' + senderLdap + '" target="_blank" style="color: {{t.link}}; text-decoration: none; font-weight: 600;">@' + senderLdap + '</a>'
    + '</p>';
}

// Selo do rodapé do corpo, nos e-mails transacionais.
function renderEmailBadge(text) {
  return '<table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;"><tr>'
    + '<td align="center" class="dm-chip" style="border-radius: {{t.radiusPill}}; background-color: {{t.chipBg}}; border: 1px solid {{t.border}};">'
    + '<span style="display: inline-block; font-family: {{t.fontSans}}; color: {{t.textBody}}; font-size: {{t.sizeSub}}; font-weight: 600; padding: 12px 28px; text-transform: uppercase; letter-spacing: 0.5px;" class="dm-text">'
    + text + '</span></td></tr></table>';
}

// Botão de ação de verdade, para os e-mails que pedem uma ida ao dashboard.
function renderEmailButton(label, url) {
  return '<table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;"><tr>'
    + '<td align="center" style="border-radius: {{t.radiusPill}}; background-color: {{t.link}};">'
    + '<a href="' + url + '" target="_blank" style="display: inline-block; font-family: {{t.fontSans}}; color: #FFFFFF; font-size: {{t.sizeMeta}}; font-weight: 600; padding: 14px 32px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px;">'
    + label + '</a></td></tr></table>';
}

// Rótulo + valor, a célula que se repete no painel de dados do caso.
function renderEmailField(label, valueHtml, extraClass) {
  return '<div style="font-family: {{t.fontSans}}; font-size: {{t.sizeLabel}}; color: {{t.textMuted}}; font-weight: 500; margin-bottom: 6px;" class="dm-muted">' + label + '</div>'
    + '<div class="dm-text' + (extraClass ? " " + extraClass : "") + '" style="font-family: {{t.fontSans}}; font-size: {{t.sizeMeta}}; color: {{t.textStrong}}; line-height: 1.5; word-break: break-word;">' + valueHtml + '</div>';
}

// Painel "Contexto / Motivo".
function renderEmailContextPanel(label, text) {
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-panel" style="background-color: {{t.panelBg}}; border-radius: {{t.radiusPanel}}; margin-bottom: 24px; border: 1px solid {{t.border}};"><tr>'
    + '<td style="padding: 20px;">'
    + '<div style="font-family: {{t.fontSans}}; font-size: {{t.sizeLabel}}; color: {{t.textMuted}}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-weight: 600;" class="dm-muted">' + label + '</div>'
    + '<div style="font-family: {{t.fontSans}}; font-size: {{t.sizeBody}}; color: {{t.textStrong}}; line-height: 1.6; border-left: 3px solid {{t.border}}; padding-left: 14px;" class="dm-text">' + text + '</div>'
    + '</td></tr></table>';
}

// Painel com os dados do caso, em duas fileiras de três e duas colunas.
function renderEmailCasePanel(L, v) {
  const caseLink = '<a href="https://cases.connect.corp.google.com/#/case/' + v.caseId + '" target="_blank" style="font-family: {{t.fontMono}}; font-size: {{t.sizeMeta}}; color: {{t.link}}; font-weight: 500; text-decoration: none;" class="word-break">' + v.caseId + ' &#8599;</a>';
  const siteValue = '<span style="color: {{t.link}}; font-weight: 600;">' + v.site + '</span>';
  const monoValue = function (text) {
    return '<span class="text-mono" style="font-family: {{t.fontMono}};">' + text + '</span>';
  };

  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-panel" style="background-color: {{t.panelBg}}; border-radius: {{t.radiusPanel}}; border: 1px solid {{t.border}}; margin-bottom: 28px;"><tr>'
    + '<td style="padding: 20px;">'

    + '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;"><tr>'
    + '<td valign="top" style="width: 34%; padding-right: 12px;">' + renderEmailField("Case Connect", caseLink) + '</td>'
    + '<td valign="top" style="width: 33%; padding-right: 12px;">' + renderEmailField(L.labelDomain, siteValue, "word-break") + '</td>'
    + '<td valign="top" style="width: 33%;">' + renderEmailField(L.labelSchedule, monoValue(v.availability)) + '</td>'
    + '</tr></table>'

    + '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid {{t.border}};"><tr>'
    + '<td valign="top" style="width: 34%; padding: 20px 12px 0 0;">' + renderEmailField("Customer ID", monoValue(v.cid)) + '</td>'
    + '<td valign="top" style="width: 66%; padding: 20px 0 0 0;">' + renderEmailField(L.labelTask, v.task, "word-break") + '</td>'
    + '</tr></table>'

    + '</td></tr></table>';
}

// Número grande + repartição, o painel do alerta de volume.
function renderEmailMetricPanel(bigNumber, bigLabel, cells) {
  const columns = cells.map(function (cell, index) {
    const divider = index < cells.length - 1 ? ' border-right: 1px solid {{t.border}};' : '';
    return '<td style="padding: 20px; text-align: center; width: ' + Math.floor(100 / cells.length) + '%;' + divider + '">'
      + '<div style="font-family: {{t.fontSans}}; font-size: {{t.sizeLabel}}; color: {{t.textMuted}}; font-weight: 500; margin-bottom: 6px;" class="dm-muted">' + cell.label + '</div>'
      + '<div style="font-family: {{t.fontSans}}; font-size: 20px; font-weight: 700; color: ' + cell.color + ';">' + cell.value + '</div>'
      + '</td>';
  }).join("");

  return '<div style="text-align: center; font-family: {{t.fontSans}}; font-size: {{t.sizeMetric}}; font-weight: 700; color: {{t.warnText}}; line-height: 1;">' + bigNumber + '</div>'
    + '<div style="text-align: center; font-family: {{t.fontSans}}; font-size: {{t.sizeLabel}}; color: {{t.textMuted}}; text-transform: uppercase; letter-spacing: 0.5px; margin: 6px 0 24px 0;" class="dm-muted">' + bigLabel + '</div>'
    + '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-panel" style="background-color: {{t.panelBg}}; border-radius: {{t.radiusPanel}}; border: 1px solid {{t.border}}; margin-bottom: 28px;"><tr>'
    + columns + '</tr></table>';
}

// Linha discreta do rodapé (rastreio, ou o porquê de o e-mail ter chegado).
function renderEmailFooterNote(text) {
  return '<p style="margin: 0 0 10px 0; font-family: {{t.fontSans}}; font-size: {{t.sizeLabel}}; color: {{t.textMuted}};" class="dm-muted">' + text + '</p>';
}

// Remove marcação para a alternativa em texto puro. As mensagens já trazem
// <strong> inline, daí a limpeza em vez de um "escape".
function stripEmailHtml(value) {
  return String((value === null || value === undefined) ? "" : value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8599;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// =========================================================
// FUNÇÃO MESTRA DE E-MAILS DINÂMICOS
// =========================================================
function sendDynamicTechSolEmail(destinatario, data, escalacaoId, tipoEmail, authorEmailOverride) {
  const L = EMAIL_I18N[getRecipientLang(destinatario)] || EMAIL_I18N.pt;

  // 1. Variáveis Padrão e Captura do Usuário (LDAP)
  // Rastreabilidade: Prioriza o e-mail injetado pelo sistema (autor real) em vez do dono do script
  const senderEmail = authorEmailOverride || Session.getActiveUser().getEmail();
  const senderLdap = senderEmail ? senderEmail.split('@')[0] : L.fallbackTeam; // Fallback de segurança

  let themeColor = EMAIL_TOKENS.accentBlue;
  // Ícone do header como emoji, e não como <img> de SVG do fonts.gstatic.com:
  // o Gmail não renderiza SVG, então os ícones anteriores simplesmente não
  // apareciam em produção. O emoji é o mesmo glifo usado na linha de assunto de
  // cada tipo, de modo que a mensagem lê como contínua desde a lista da caixa.
  let headerIcon = "⚡";
  let headerSubtitle = "BAU Escalation Hub";
  let greeting = L.defaultGreeting;
  let mainMessage = "";
  let urgencyBadge = "";
  let footerBadge = L.footerAutomated;
  let subject = L.defaultSubject(data.advName || L.defaultCase);

  // 2. Formatação da Data (Aproveitada para o cálculo de urgência)
  function formatGASDate(isoStr) {
    if (!isoStr || isoStr === "N/A" || isoStr === "undefined") return L.dateUnavailable;

    // Suporte para múltiplas datas separadas por pipe
    if (String(isoStr).includes(' | ')) {
      return isoStr.split(' | ')
        .map(function(part) { return formatGASDate(part.trim()); })
        .filter(function(f) { return f !== L.dateUnavailable; })
        .join(' | ');
    }

    try {
      var d = new Date(isoStr);
      if (isNaN(d.getTime())) return L.dateUnavailable;

      var day = ("0" + d.getDate()).slice(-2);
      var month = ("0" + (d.getMonth() + 1)).slice(-2);
      var year = d.getFullYear();
      var hours = ("0" + d.getHours()).slice(-2);
      var minutes = ("0" + d.getMinutes()).slice(-2);

      return day + "/" + month + "/" + year + L.dateAt + hours + ":" + minutes;
    } catch (e) {
      return L.dateUnavailable;
    }
  }

  let dataFormatada = formatGASDate(data.availability);
  let dateObj = (data.availability && !String(data.availability).includes('|')) ? new Date(data.availability) : null;

  // 3. Calculadora de Urgência (Para a Liderança)
  function urgencyBanner(bg, border, color, text) {
    return '<div style="background-color: ' + bg + '; border: 1px solid ' + border + '; color: ' + color + '; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-family: {{t.fontSans}}; font-size: {{t.sizeMeta}}; font-weight: 600; text-align: center; letter-spacing: 0.3px;">' + text + '</div>';
  }

  function getUrgencyHtml(targetDate) {
    if (!targetDate) return "";
    const diffTime = targetDate - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return urgencyBanner("{{t.urgentBg}}", "{{t.urgentBorder}}", "{{t.urgentText}}", L.urgentToday);
    } else if (diffDays <= 3) {
      return urgencyBanner("{{t.warnBg}}", "{{t.warnBorder}}", "{{t.warnText}}", L.urgentSoon);
    }
    return urgencyBanner("{{t.okBg}}", "{{t.okBorder}}", "{{t.okText}}", L.urgentGreen);
  }

  // 4. A MÁGICA: Configuração por Tipo de E-mail
  switch(tipoEmail) {
    case 'AGENT_BAU_SENT':
      greeting = L.agentSentGreeting;
      mainMessage = L.agentSentMessage(data.advName);
      footerBadge = L.agentSentFooter;
      subject = L.agentSentSubject(data.advName);
      break;

    case 'LEADERSHIP_BAU_RECEIVED':
      headerIcon = "🚨";
      greeting = L.leadershipGreeting;
      mainMessage = L.leadershipMessage(data.advName);
      urgencyBadge = getUrgencyHtml(dateObj);
      footerBadge = L.leadershipFooter;
      subject = L.leadershipSubject(data.advName);
      break;

    case 'AGENT_BAU_CREATED':
      themeColor = EMAIL_TOKENS.accentGreen;
      headerIcon = "✅";
      greeting = L.createdGreeting;
      mainMessage = L.createdMessage(data.advName);
      footerBadge = L.createdFooter;
      subject = L.createdSubject(data.advName);
      break;

    case 'AGENT_DISCARD_SENT':
      themeColor = EMAIL_TOKENS.accentRedSoft;
      headerIcon = "🗑️";
      headerSubtitle = L.discardSentSubtitle;
      greeting = L.discardSentGreeting;
      mainMessage = L.discardSentMessage(data.advName);
      footerBadge = L.discardSentFooter;
      subject = L.discardSentSubject(data.advName);
      break;

    case 'AGENT_DISCARD_DONE':
      themeColor = EMAIL_TOKENS.accentRed;
      headerIcon = "❌";
      headerSubtitle = L.discardDoneSubtitle;
      greeting = L.discardDoneGreeting;
      mainMessage = L.discardDoneMessage(data.advName);
      footerBadge = L.discardDoneFooter;
      subject = L.discardDoneSubject(data.advName);
      break;
  }

  // 5. Montagem final e envio
  // Valores resolvidos uma vez só: o corpo HTML e a alternativa em texto puro
  // precisam mostrar exatamente a mesma coisa.
  const v = {
    caseId: data.caseId || "0-0000000000000",
    site: data.website || data.site || "N/A",
    cid: data.cid || "N/A",
    task: data.taskType || "N/A",
    reason: data.reason || "N/A",
    availability: dataFormatada
  };

  // Preheader: a linha de resumo que o Gmail mostra na lista, colada ao assunto.
  // Sem ela o cliente repete o começo do corpo — que seria "Olá, Agente!" em
  // todos. Anunciante + caso identifica a mensagem sem precisar abrir.
  const preheader = [data.advName, v.caseId]
    .filter(function (item) { return !!item; })
    .join(" · ");

  const htmlBody = renderBauEmail({
    preheader: preheader,
    headerIcon: headerIcon,
    headerSubtitle: headerSubtitle,
    themeColor: themeColor,
    introBlock: renderEmailIntro(greeting, senderLdap),
    mainMessage: mainMessage,
    urgencyBadge: urgencyBadge,
    bodyBlocks: renderEmailContextPanel(L.labelContext, v.reason) + renderEmailCasePanel(L, v),
    footerAction: renderEmailBadge(footerBadge),
    footerNote: renderEmailFooterNote('Rastreio: <span class="text-mono dm-muted" style="font-family: {{t.fontMono}}; color: {{t.textBody}};">' + escalacaoId + '</span>')
  });

  // Alternativa em texto puro. MailApp.sendEmail vinha mandando só htmlBody, então
  // cliente em modo texto, leitor de tela e prévia de notificação recebiam a
  // marcação crua.
  const plainLines = [stripEmailHtml(greeting), "", stripEmailHtml(mainMessage)];
  if (urgencyBadge) {
    plainLines.push("", stripEmailHtml(urgencyBadge));
  }
  plainLines.push(
    "",
    L.labelContext + ": " + stripEmailHtml(v.reason),
    "Case Connect: " + v.caseId,
    L.labelDomain + ": " + v.site,
    L.labelSchedule + ": " + v.availability,
    "Customer ID: " + v.cid,
    L.labelTask + ": " + v.task,
    "",
    "https://cases.connect.corp.google.com/#/case/" + v.caseId,
    "ID: " + escalacaoId
  );

  MailApp.sendEmail({
    to: destinatario,
    subject: subject,
    htmlBody: htmlBody,
    body: plainLines.join("\n"),
    name: "Cases Wizard"
  });
}
