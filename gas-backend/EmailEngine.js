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
    defaultCase: "Notificação",
    defaultSubject: function (adv) { return "Notificação TechSol: " + adv; },
    requestedBy: function (ldap) { return "Solicitado por @" + ldap; },
    footerTrace: function (id) { return "Cases Wizard · automatizado por @lucaste · rastreio " + id; },
    actionViewCase: "Ver caso no Case Connect",
    actionOpenDashboard: "Abrir TL Dashboard",
    sectionDetails: "Detalhes do caso",

    urgentToday: "Agendado para hoje ou amanhã.",
    urgentSoon: "Agendado para os próximos 3 dias.",

    agentSentTitle: "Caso na fila BAU",
    agentSentMessage: function (adv) { return "A solicitação para <strong style=\"font-weight:500;\">" + adv + "</strong> foi registrada e aguarda análise da liderança."; },
    agentSentSubject: function (adv) { return "Caso na fila BAU: " + adv; },

    leadershipTitle: "Uma solicitação precisa de abertura de caso",
    leadershipMessage: function (adv) { return "Uma nova solicitação para <strong style=\"font-weight:500;\">" + adv + "</strong> foi enviada e exige abertura de caso."; },
    leadershipSubject: function (adv) { return "Requer ação BAU: " + adv; },

    createdTitle: "Caso criado",
    createdMessage: function (adv) { return "A liderança criou o caso BAU para <strong style=\"font-weight:500;\">" + adv + "</strong>. Tudo pronto para o atendimento."; },
    createdSubject: function (adv) { return "Caso criado: " + adv; },

    discardSentTitle: "Descarte em avaliação",
    discardSentMessage: function (adv) { return "Sua solicitação de descarte para <strong style=\"font-weight:500;\">" + adv + "</strong> foi enviada para avaliação do TL."; },
    discardSentSubject: function (adv) { return "Descarte em avaliação: " + adv; },

    discardDoneTitle: "Caso descartado",
    discardDoneMessage: function (adv) { return "O descarte do caso de <strong style=\"font-weight:500;\">" + adv + "</strong> foi aprovado e concluído pela liderança."; },
    discardDoneSubject: function (adv) { return "Caso descartado: " + adv; },

    labelContext: "Motivo",
    labelDomain: "Domínio final",
    labelSchedule: "Agendamento (SLA)",
    labelTask: "Procedimento"
  },
  es: {
    dateUnavailable: "Fecha no disponible",
    dateAt: " a las ",
    fallbackTeam: "Equipo BAU",
    defaultCase: "Notificación",
    defaultSubject: function (adv) { return "Notificación TechSol: " + adv; },
    requestedBy: function (ldap) { return "Solicitado por @" + ldap; },
    footerTrace: function (id) { return "Cases Wizard · automatizado por @lucaste · seguimiento " + id; },
    actionViewCase: "Ver caso en Case Connect",
    actionOpenDashboard: "Abrir TL Dashboard",
    sectionDetails: "Detalles del caso",

    urgentToday: "Agendado para hoy o mañana.",
    urgentSoon: "Agendado para los próximos 3 días.",

    agentSentTitle: "Caso en la fila BAU",
    agentSentMessage: function (adv) { return "La solicitud para <strong style=\"font-weight:500;\">" + adv + "</strong> fue registrada y espera el análisis de la gerencia."; },
    agentSentSubject: function (adv) { return "Caso en la fila BAU: " + adv; },

    leadershipTitle: "Una solicitud requiere la apertura de un caso",
    leadershipMessage: function (adv) { return "Una nueva solicitud para <strong style=\"font-weight:500;\">" + adv + "</strong> fue enviada y requiere la apertura de un caso."; },
    leadershipSubject: function (adv) { return "Requiere acción BAU: " + adv; },

    createdTitle: "Caso creado",
    createdMessage: function (adv) { return "La gerencia creó el caso BAU para <strong style=\"font-weight:500;\">" + adv + "</strong>. Todo listo para la atención."; },
    createdSubject: function (adv) { return "Caso creado: " + adv; },

    discardSentTitle: "Descarte en evaluación",
    discardSentMessage: function (adv) { return "Tu solicitud de descarte para <strong style=\"font-weight:500;\">" + adv + "</strong> fue enviada para evaluación del TL."; },
    discardSentSubject: function (adv) { return "Descarte en evaluación: " + adv; },

    discardDoneTitle: "Caso descartado",
    discardDoneMessage: function (adv) { return "El descarte del caso de <strong style=\"font-weight:500;\">" + adv + "</strong> fue aprobado y concluido por la gerencia."; },
    discardDoneSubject: function (adv) { return "Caso descartado: " + adv; },

    labelContext: "Motivo",
    labelDomain: "Dominio final",
    labelSchedule: "Programación (SLA)",
    labelTask: "Procedimiento"
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
  border: "#DADCE0",
  hairline: "#E8EAED",

  // Texto
  textStrong: "#202124",
  textBody: "#3C4043",
  textMuted: "#5F6368",
  link: "#1A73E8",

  // Acentos por tipo. Tons de superfície clara, e não os pastéis do antigo
  // cabeçalho escuro — num cartão branco aqueles ficavam lavados. Vivem no
  // filete sob o nome do produto, que é o único lugar onde a cor varia por tipo.
  accentBlue: "#1A73E8",
  accentGreen: "#1E8E3E",
  accentAmber: "#E37400",
  accentRed: "#D93025",

  // Avisos. Só aparecem quando há de fato algo a avisar.
  urgentBg: "#FCE8E6",
  urgentBorder: "#F6AEA9",
  urgentText: "#C5221F",
  warnBg: "#FEF7E0",
  warnBorder: "#FDE293",
  warnText: "#B06000",

  // Modo escuro
  darkPageBg: "#1F1F1F",
  darkCardBg: "#2A2B2E",
  darkBorder: "#3C4043",
  darkTextStrong: "#E8EAED",
  darkTextMuted: "#9AA0A6",

  // Tipografia. A Google Sans vinha por <link>, que o Gmail remove — a stack
  // abaixo é a que de fato resolve no cliente, com a webfont só valendo para
  // quem já a tem instalada localmente.
  fontSans: "'Google Sans', Roboto, Helvetica, Arial, sans-serif",
  fontMono: "'Roboto Mono', Consolas, 'Courier New', monospace",
  sizeTitle: "22px",
  sizeBody: "15px",
  sizeMeta: "14px",
  sizeSub: "13px",
  sizeLabel: "12px",

  // Forma. Botão em 4px, o raio de botão do Material — pílula é outra família.
  radiusCard: "8px",
  radiusButton: "4px",
  radiusCallout: "8px"
};

// Fixo (não ScriptApp.getService().getUrl()): e-mails saem também por gatilho de
// tempo, e nesse contexto getUrl() pode devolver a URL de OUTRA implantação do
// projeto — não a implantação fixa usada em produção, pinada via clasp deploy -i
// em .github/workflows/deploy.yml e referenciada em src/modules/shared/data-service.js.
const TL_DASHBOARD_URL = "https://script.google.com/a/macros/google.com/s/AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg/exec?page=tl";

const CASE_CONNECT_BASE = "https://cases.connect.corp.google.com/#/case/";

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
  html = fillEmailSlot(html, "{{ACCENT}}", parts.accent || EMAIL_TOKENS.accentBlue);
  html = fillEmailSlot(html, "{{TITLE}}", parts.title);
  html = fillEmailSlot(html, "{{LEAD}}", parts.lead);
  html = fillEmailSlot(html, "{{META}}", parts.meta);
  html = fillEmailSlot(html, "{{CALLOUT}}", parts.callout);
  html = fillEmailSlot(html, "{{ACTION}}", parts.action);
  html = fillEmailSlot(html, "{{BLOCKS}}", parts.blocks);
  html = fillEmailSlot(html, "{{FOOTER_NOTE}}", parts.footerNote);

  return applyEmailTokens(html);
}

// Ação primária. Raio 4px e azul sólido: o botão do Material, não uma pílula.
function renderEmailButton(label, url) {
  return '<table cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 32px 0;"><tr>'
    + '<td style="background-color: {{t.link}}; border-radius: {{t.radiusButton}};">'
    + '<a href="' + url + '" target="_blank" style="display: inline-block; padding: 11px 24px; font-family: {{t.fontSans}}; font-size: {{t.sizeMeta}}; font-weight: 500; color: #FFFFFF; text-decoration: none;">'
    + label + '</a></td></tr></table>';
}

// Aviso tingido. Só existe quando há algo a avisar — não há callout "está tudo
// bem", porque um bloco colorido que não pede nada é ruído.
function renderEmailCallout(kind, text) {
  const map = {
    urgent: ["{{t.urgentBg}}", "{{t.urgentBorder}}", "{{t.urgentText}}"],
    warn: ["{{t.warnBg}}", "{{t.warnBorder}}", "{{t.warnText}}"]
  };
  const c = map[kind] || map.warn;
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 28px 0;"><tr>'
    + '<td style="background-color: ' + c[0] + '; border: 1px solid ' + c[1] + '; border-radius: {{t.radiusCallout}}; padding: 14px 16px; font-family: {{t.fontSans}}; font-size: {{t.sizeMeta}}; line-height: 1.5; color: ' + c[2] + ';">'
    + text + '</td></tr></table>';
}

// Pares rótulo/valor. Sem borda e sem caixa: o que separa as linhas é ritmo
// vertical, que é como o Material resolve isso.
function renderEmailFields(rows) {
  const body = rows.map(function (row) {
    const valueFont = row.mono ? "{{t.fontMono}}" : "{{t.fontSans}}";
    return '<tr>'
      + '<td style="padding: 0 0 14px 0; font-family: {{t.fontSans}}; font-size: {{t.sizeSub}}; color: {{t.textMuted}}; width: 38%; vertical-align: top;" class="dm-muted">' + row.label + '</td>'
      + '<td class="dm-text word-break" style="padding: 0 0 14px 0; font-family: ' + valueFont + '; font-size: {{t.sizeMeta}}; color: {{t.textStrong}}; vertical-align: top; word-break: break-word;">' + row.value + '</td>'
      + '</tr>';
  }).join("");
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0">' + body + '</table>';
}

// Seção com hairline acima e um rótulo discreto.
function renderEmailSection(title, inner) {
  return '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 28px 0;">'
    + '<tr><td class="dm-rule" style="border-top: 1px solid {{t.hairline}}; padding: 0 0 20px 0; font-size: 0; line-height: 0;">&nbsp;</td></tr>'
    + '<tr><td style="padding: 0 0 14px 0; font-family: {{t.fontSans}}; font-size: {{t.sizeSub}}; font-weight: 500; color: {{t.textMuted}};" class="dm-muted">' + title + '</td></tr>'
    + '<tr><td>' + inner + '</td></tr></table>';
}

// Parágrafo simples dentro de uma seção.
function renderEmailParagraph(text) {
  return '<p style="margin: 0; font-family: {{t.fontSans}}; font-size: {{t.sizeMeta}}; line-height: 1.6; color: {{t.textBody}};" class="dm-text">' + text + '</p>';
}

// Remove marcação para a alternativa em texto puro. As mensagens já trazem
// <strong> inline, daí a limpeza em vez de um "escape".
function stripEmailHtml(value) {
  return String((value === null || value === undefined) ? "" : value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
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

  let accent = EMAIL_TOKENS.accentBlue;
  let title = L.defaultCase;
  let lead = "";
  let callout = "";
  let actionLabel = L.actionViewCase;
  let actionUrl = CASE_CONNECT_BASE + (data.caseId || "");
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
  // Só devolve aviso quando há urgência real. O antigo "STATUS VERDE: agendado
  // para +5 dias" era um bloco colorido que não pedia nada — e a data já está
  // nos detalhes logo abaixo.
  function getUrgencyHtml(targetDate) {
    if (!targetDate) return "";
    const diffDays = Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return renderEmailCallout("urgent", L.urgentToday);
    if (diffDays <= 3) return renderEmailCallout("warn", L.urgentSoon);
    return "";
  }

  // 4. Configuração por Tipo de E-mail
  switch(tipoEmail) {
    case 'AGENT_BAU_SENT':
      title = L.agentSentTitle;
      lead = L.agentSentMessage(data.advName);
      subject = L.agentSentSubject(data.advName);
      break;

    case 'LEADERSHIP_BAU_RECEIVED':
      accent = EMAIL_TOKENS.accentAmber;
      title = L.leadershipTitle;
      lead = L.leadershipMessage(data.advName);
      callout = getUrgencyHtml(dateObj);
      actionLabel = L.actionOpenDashboard;
      actionUrl = TL_DASHBOARD_URL;
      subject = L.leadershipSubject(data.advName);
      break;

    case 'AGENT_BAU_CREATED':
      accent = EMAIL_TOKENS.accentGreen;
      title = L.createdTitle;
      lead = L.createdMessage(data.advName);
      subject = L.createdSubject(data.advName);
      break;

    case 'AGENT_DISCARD_SENT':
      accent = EMAIL_TOKENS.accentAmber;
      title = L.discardSentTitle;
      lead = L.discardSentMessage(data.advName);
      subject = L.discardSentSubject(data.advName);
      break;

    case 'AGENT_DISCARD_DONE':
      accent = EMAIL_TOKENS.accentRed;
      title = L.discardDoneTitle;
      lead = L.discardDoneMessage(data.advName);
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
  // Sem ela o cliente repete o começo do corpo — que seria igual em todos.
  const preheader = [data.advName, v.caseId]
    .filter(function (item) { return !!item; })
    .join(" · ");

  const caseLink = '<a href="' + CASE_CONNECT_BASE + v.caseId + '" target="_blank" style="font-family: {{t.fontMono}}; color: {{t.link}}; text-decoration: none;">' + v.caseId + '</a>';

  const blocks = renderEmailSection(L.sectionDetails, renderEmailFields([
    { label: "Case Connect", value: caseLink },
    { label: "Customer ID", value: v.cid, mono: true },
    { label: L.labelDomain, value: v.site },
    { label: L.labelSchedule, value: v.availability },
    { label: L.labelTask, value: v.task }
  ])) + renderEmailSection(L.labelContext, renderEmailParagraph(v.reason));

  const htmlBody = renderBauEmail({
    preheader: preheader,
    accent: accent,
    title: title,
    lead: lead,
    meta: L.requestedBy(senderLdap),
    callout: callout,
    action: renderEmailButton(actionLabel, actionUrl),
    blocks: blocks,
    footerNote: L.footerTrace(escalacaoId)
  });

  // Alternativa em texto puro. MailApp.sendEmail vinha mandando só htmlBody, então
  // cliente em modo texto, leitor de tela e prévia de notificação recebiam a
  // marcação crua.
  const plainLines = [title, "", stripEmailHtml(lead), L.requestedBy(senderLdap)];
  if (callout) {
    plainLines.push("", stripEmailHtml(callout));
  }
  plainLines.push(
    "",
    actionLabel + ": " + actionUrl,
    "",
    L.sectionDetails,
    "Case Connect: " + v.caseId,
    "Customer ID: " + v.cid,
    L.labelDomain + ": " + v.site,
    L.labelSchedule + ": " + v.availability,
    L.labelTask + ": " + v.task,
    "",
    L.labelContext + ": " + stripEmailHtml(v.reason),
    "",
    stripEmailHtml(L.footerTrace(escalacaoId))
  );

  MailApp.sendEmail({
    to: destinatario,
    subject: subject,
    htmlBody: htmlBody,
    body: plainLines.join("\n"),
    name: "Cases Wizard"
  });
}
