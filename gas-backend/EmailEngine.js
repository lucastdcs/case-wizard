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
    submissionBadges: [
      "✨ MAIS UM CASO, MAIS UM PASSO",
      "🚀 RODANDO LISO COM O CASES WIZARD",
      "🎯 CASO REGISTRADO COM SUCESSO",
      "🤝 TIME TECHSOL CUIDANDO DISSO",
      "📌 SEU CASO ESTÁ NO RADAR",
      "✅ MAIS UM ITEM RISCADO DA LISTA"
    ],
    agentSentGreeting: "Olá, Agente!",
    agentSentMessage: function (adv) { return "A solicitação para o anunciante <strong style=\"color:#202124;\">" + adv + "</strong> foi materializada e já aguarda a análise da liderança."; },
    agentSentSubject: function (adv) { return "⚡ Caso na Fila BAU: " + adv; },
    leadershipGreeting: "Atenção Liderança,",
    leadershipMessage: function (adv) { return "Uma nova solicitação para o anunciante <strong style=\"color:#202124;\">" + adv + "</strong> foi enviada e exige abertura de caso."; },
    leadershipFooter: "AGUARDANDO AÇÃO",
    leadershipSubject: function (adv) { return "🚨 Requer Ação BAU: " + adv; },
    createdGreeting: "Boas notícias!",
    createdMessage: function (adv) { return "A liderança acabou de <strong style=\"color:#202124;\">CRIAR O CASO BAU</strong> para o anunciante <strong style=\"color:#202124;\">" + adv + "</strong>. Tudo pronto para o atendimento."; },
    createdFooter: "SOLICITAÇÃO CONCLUÍDA",
    createdSubject: function (adv) { return "✅ Caso Criado: " + adv; },
    discardSentSubtitle: "Descarte Evaluation",
    discardSentGreeting: "Olá, Agente!",
    discardSentMessage: function (adv) { return "Sua solicitação de <strong style=\"color:#202124;\">DESCARTE</strong> para o anunciante <strong style=\"color:#202124;\">" + adv + "</strong> foi enviada para avaliação do TL."; },
    discardSentFooter: "AVALIAÇÃO PENDENTE",
    discardSentSubject: function (adv) { return "🗑️ Descarte em Avaliação: " + adv; },
    discardDoneSubtitle: "Descarte Concluído",
    discardDoneGreeting: "Aviso Importante,",
    discardDoneMessage: function (adv) { return "O descarte do caso do anunciante <strong style=\"color:#202124;\">" + adv + "</strong> foi <strong style=\"color:#202124;\">APROVADO E CONCLUÍDO</strong> pela liderança."; },
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
    submissionBadges: [
      "✨ UN CASO MÁS, UN PASO MÁS",
      "🚀 FUNCIONANDO SIN PROBLEMAS CON CASES WIZARD",
      "🎯 CASO REGISTRADO CON ÉXITO",
      "🤝 EL EQUIPO TECHSOL SE ENCARGA",
      "📌 TU CASO ESTÁ EN EL RADAR",
      "✅ UN ÍTEM MÁS TACHADO DE LA LISTA"
    ],
    agentSentGreeting: "¡Hola, Agente!",
    agentSentMessage: function (adv) { return "La solicitud para el anunciante <strong style=\"color:#202124;\">" + adv + "</strong> fue registrada y ya espera el análisis de la gerencia."; },
    agentSentSubject: function (adv) { return "⚡ Caso en la Fila BAU: " + adv; },
    leadershipGreeting: "Atención Gerencia,",
    leadershipMessage: function (adv) { return "Una nueva solicitud para el anunciante <strong style=\"color:#202124;\">" + adv + "</strong> fue enviada y requiere la apertura de un caso."; },
    leadershipFooter: "ESPERANDO ACCIÓN",
    leadershipSubject: function (adv) { return "🚨 Requiere Acción BAU: " + adv; },
    createdGreeting: "¡Buenas noticias!",
    createdMessage: function (adv) { return "La gerencia acaba de <strong style=\"color:#202124;\">CREAR EL CASO BAU</strong> para el anunciante <strong style=\"color:#202124;\">" + adv + "</strong>. Todo listo para la atención."; },
    createdFooter: "SOLICITUD CONCLUIDA",
    createdSubject: function (adv) { return "✅ Caso Creado: " + adv; },
    discardSentSubtitle: "Descarte Evaluation",
    discardSentGreeting: "¡Hola, Agente!",
    discardSentMessage: function (adv) { return "Tu solicitud de <strong style=\"color:#202124;\">DESCARTE</strong> para el anunciante <strong style=\"color:#202124;\">" + adv + "</strong> fue enviada para evaluación del TL."; },
    discardSentFooter: "EVALUACIÓN PENDIENTE",
    discardSentSubject: function (adv) { return "🗑️ Descarte en Evaluación: " + adv; },
    discardDoneSubtitle: "Descarte Concluido",
    discardDoneGreeting: "Aviso Importante,",
    discardDoneMessage: function (adv) { return "El descarte del caso del anunciante <strong style=\"color:#202124;\">" + adv + "</strong> fue <strong style=\"color:#202124;\">APROBADO Y CONCLUIDO</strong> por la gerencia."; },
    discardDoneFooter: "CASO DESCARTADO",
    discardDoneSubject: function (adv) { return "❌ Caso Descartado: " + adv; },
    labelContext: "Contexto / Motivo",
    labelDomain: "Dominio Final",
    labelSchedule: "Programación (SLA)",
    labelTask: "Procedimiento / Task BAU"
  }
};

// =========================================================
// FUNÇÃO MESTRA DE E-MAILS DINÂMICOS
// =========================================================
function sendDynamicTechSolEmail(destinatario, data, escalacaoId, tipoEmail, authorEmailOverride) {
  const L = EMAIL_I18N[getRecipientLang(destinatario)] || EMAIL_I18N.pt;
  const template = HtmlService.createHtmlOutputFromFile('EmailTemplateDynamic').getContent();
  
  // 1. Variáveis Padrão e Captura do Usuário (LDAP)
  // Rastreabilidade: Prioriza o e-mail injetado pelo sistema (autor real) em vez do dono do script
  const senderEmail = authorEmailOverride || Session.getActiveUser().getEmail();
  const senderLdap = senderEmail ? senderEmail.split('@')[0] : L.fallbackTeam; // Fallback de segurança

  let themeColor = "#8ab4f8"; // Azul
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

  // Selo do rodapé do email de submissão: uma frase de identidade sorteada a cada
  // envio, no mesmo espírito do getSmartGreeting() em shared/page-data.js.
  const SUBMISSION_BADGE_PHRASES = L.submissionBadges;
  function getRandomSubmissionBadge() {
    return SUBMISSION_BADGE_PHRASES[Math.floor(Math.random() * SUBMISSION_BADGE_PHRASES.length)];
  }

  let dataFormatada = formatGASDate(data.availability);
  let dateObj = (data.availability && !String(data.availability).includes('|')) ? new Date(data.availability) : null;

  // 3. Calculadora de Urgência (Para a Liderança)
  function getUrgencyHtml(targetDate) {
    if (!targetDate) return "";
    const diffTime = targetDate - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return `<div style="background-color: #FCE8E6; border: 1px solid rgba(217, 48, 37, 0.35); color: #D93025; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">${L.urgentToday}</div>`;
    } else if (diffDays <= 3) {
      return `<div style="background-color: #FEF7E0; border: 1px solid rgba(249, 171, 0, 0.35); color: #B06000; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">${L.urgentSoon}</div>`;
    } else {
      return `<div style="background-color: #E6F4EA; border: 1px solid rgba(30, 142, 62, 0.35); color: #1E8E3E; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">${L.urgentGreen}</div>`;
    }
  }

  // 4. A MÁGICA: Configuração por Tipo de E-mail
  switch(tipoEmail) {
    case 'AGENT_BAU_SENT':
      greeting = L.agentSentGreeting;
      mainMessage = L.agentSentMessage(data.advName);
      footerBadge = getRandomSubmissionBadge();
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
      themeColor = "#81c995"; // Verde
      headerIcon = "✅";
      greeting = L.createdGreeting;
      mainMessage = L.createdMessage(data.advName);
      footerBadge = L.createdFooter;
      subject = L.createdSubject(data.advName);
      break;

    case 'AGENT_DISCARD_SENT':
      themeColor = "#f28b82"; // Vermelho Suave
      headerIcon = "🗑️";
      headerSubtitle = L.discardSentSubtitle;
      greeting = L.discardSentGreeting;
      mainMessage = L.discardSentMessage(data.advName);
      footerBadge = L.discardSentFooter;
      subject = L.discardSentSubject(data.advName);
      break;

    case 'AGENT_DISCARD_DONE':
      themeColor = "#ea4335"; // Vermelho Forte
      headerIcon = "❌";
      headerSubtitle = L.discardDoneSubtitle;
      greeting = L.discardDoneGreeting;
      mainMessage = L.discardDoneMessage(data.advName);
      footerBadge = L.discardDoneFooter;
      subject = L.discardDoneSubject(data.advName);
      break;
  }

  // 5. Substituição final e Envio (Agora com o LDAP mapeado corretamente)

  // Valores resolvidos uma vez só: o corpo HTML e a alternativa em texto puro
  // precisam mostrar exatamente a mesma coisa.
  const caseIdValue = data.caseId || "0-0000000000000";
  const siteValue = data.website || data.site || "N/A";
  const cidValue = data.cid || "N/A";
  const taskValue = data.taskType || "N/A";
  const reasonValue = data.reason || "N/A";

  // Preheader: a linha de resumo que o Gmail mostra na lista, colada ao assunto.
  // Sem ela o cliente repete o começo do corpo — que hoje seria "Olá, Agente!",
  // igual em todos. Anunciante + caso identifica a mensagem sem precisar abrir.
  const preheader = [data.advName, caseIdValue]
    .filter(function (v) { return !!v; })
    .join(" · ");

  const htmlBody = template
    .replace("{{HEADER_ICON}}", headerIcon)
    .replace("{{PREHEADER}}", preheader)
    .replace("{{HEADER_SUBTITLE}}", headerSubtitle)
    .replace(/{{THEME_COLOR}}/g, themeColor)
    .replace("{{GREETING}}", greeting)
    .replace("{{MAIN_MESSAGE}}", mainMessage)
    .replace("{{URGENCY_BADGE}}", urgencyBadge)
    .replace("{{FOOTER_BADGE}}", footerBadge)
    .replace(/{{CASE_ID}}/g, caseIdValue)
    .replace(/{{SENDER_LDAP}}/g, senderLdap) // <-- AQUI ESTÁ A CHAVE DE OURO
    .replace("{{SITE}}", siteValue)
    .replace("{{AVAILABILITY}}", dataFormatada)
    .replace("{{CID}}", cidValue)
    .replace("{{TASK}}", taskValue)
    .replace("{{REASON}}", reasonValue)
    .replace("{{ID_ESCALACAO}}", escalacaoId)
    .replace("{{LABEL_CONTEXT}}", L.labelContext)
    .replace("{{LABEL_DOMAIN}}", L.labelDomain)
    .replace("{{LABEL_SCHEDULE}}", L.labelSchedule)
    .replace("{{LABEL_TASK}}", L.labelTask);

  // Alternativa em texto puro. MailApp.sendEmail vinha mandando só htmlBody, então
  // cliente em modo texto, leitor de tela e prévia de notificação recebiam a
  // marcação crua. As mensagens já trazem <strong> inline, daí a limpeza.
  function stripHtml(value) {
    return String(value === null || value === undefined ? "" : value)
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  }

  const plainLines = [stripHtml(greeting), "", stripHtml(mainMessage)];
  if (urgencyBadge) {
    plainLines.push("", stripHtml(urgencyBadge));
  }
  plainLines.push(
    "",
    L.labelContext + ": " + stripHtml(reasonValue),
    "Case Connect: " + caseIdValue,
    L.labelDomain + ": " + siteValue,
    L.labelSchedule + ": " + dataFormatada,
    "Customer ID: " + cidValue,
    L.labelTask + ": " + taskValue,
    "",
    "https://cases.connect.corp.google.com/#/case/" + caseIdValue,
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