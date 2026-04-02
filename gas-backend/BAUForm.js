// =========================================================
// FUNÇÃO MESTRA DE E-MAILS DINÂMICOS
// =========================================================
function sendDynamicTechSolEmail(destinatario, data, escalacaoId, tipoEmail) {
  const template = HtmlService.createHtmlOutputFromFile('EmailTemplateDynamic').getContent();
  
  // 1. Variáveis Padrão e Captura do Usuário (LDAP)
  const senderEmail = Session.getActiveUser().getEmail();
  const senderLdap = senderEmail ? senderEmail.split('@')[0] : "Equipe BAU"; // Fallback de segurança
  
  let themeColor = "#8ab4f8"; // Azul
  let headerIcon = "⚡";
  let headerSubtitle = "BAU Escalation Hub";
  let greeting = "Olá,";
  let mainMessage = "";
  let urgencyBadge = "";
  let footerBadge = "PROCESSAMENTO AUTOMATIZADO";
  let subject = `Notificação TechSol: ${data.advName || "Caso"}`;

  // 2. Formatação da Data (Aproveitada para o cálculo de urgência)
  function formatGASDate(isoStr) {
    if (!isoStr || isoStr === "N/A" || isoStr === "undefined") return "Data indisponível";

    // Suporte para múltiplas datas separadas por pipe
    if (String(isoStr).includes(' | ')) {
      return isoStr.split(' | ')
        .map(function(part) { return formatGASDate(part.trim()); })
        .filter(function(f) { return f !== "Data indisponível"; })
        .join(' | ');
    }

    try {
      var d = new Date(isoStr);
      if (isNaN(d.getTime())) return "Data indisponível";

      var day = ("0" + d.getDate()).slice(-2);
      var month = ("0" + (d.getMonth() + 1)).slice(-2);
      var year = d.getFullYear();
      var hours = ("0" + d.getHours()).slice(-2);
      var minutes = ("0" + d.getMinutes()).slice(-2);

      return day + "/" + month + "/" + year + " às " + hours + ":" + minutes;
    } catch (e) {
      return "Data indisponível";
    }
  }

  let dataFormatada = formatGASDate(data.availability);
  let dateObj = (data.availability && !data.availability.includes('|')) ? new Date(data.availability) : null;

  // 3. Calculadora de Urgência (Para a Liderança)
  function getUrgencyHtml(targetDate) {
    if (!targetDate) return "";
    const diffTime = targetDate - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return `<div style="background-color: #450a0a; border: 1px solid #ef4444; color: #fca5a5; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">🚨 URGENTE: Agendado para Hoje/Amanhã!</div>`;
    } else if (diffDays <= 3) {
      return `<div style="background-color: #422006; border: 1px solid #f97316; color: #fdba74; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">⚠️ ATENÇÃO: Agendado para os próximos 3 dias</div>`;
    } else {
      return `<div style="background-color: #064e3b; border: 1px solid #10b981; color: #6ee7b7; padding: 12px; border-radius: 8px; margin-bottom: 24px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">📅 STATUS VERDE: Agendado para +5 dias</div>`;
    }
  }

  // 4. A MÁGICA: Configuração por Tipo de E-mail
  switch(tipoEmail) {
    case 'AGENT_BAU_SENT':
      greeting = `Olá, Agente!`;
      mainMessage = `A solicitação para o anunciante <strong style="color:#202124;">${data.advName}</strong> foi materializada e já aguarda a análise da liderança.`;
      footerBadge = "⏳ +5 MIN ECONOMIZADOS";
      subject = `⚡ Caso na Fila BAU: ${data.advName}`;
      break;
      
    case 'LEADERSHIP_BAU_RECEIVED':
      greeting = `Atenção Liderança,`;
      mainMessage = `Uma nova solicitação para o anunciante <strong style="color:#202124;">${data.advName}</strong> foi enviada e exige abertura de caso.`;
      urgencyBadge = getUrgencyHtml(dateObj);
      footerBadge = "AGUARDANDO AÇÃO";
      subject = `🚨 Requer Ação BAU: ${data.advName}`;
      break;

    case 'AGENT_BAU_CREATED':
      themeColor = "#81c995"; // Verde
      headerIcon = "✅";
      greeting = `Boas notícias!`;
      mainMessage = `A liderança acabou de **CRIAR O CASO BAU** para o anunciante <strong style="color:#202124;">${data.advName}</strong>. Tudo pronto para o atendimento.`;
      footerBadge = "SOLICITAÇÃO CONCLUÍDA";
      subject = `✅ Caso Criado: ${data.advName}`;
      break;

    case 'AGENT_DISCARD_SENT':
      themeColor = "#f28b82"; // Vermelho Suave
      headerIcon = "🗑️";
      headerSubtitle = "Descarte Evaluation";
      greeting = `Olá, Agente!`;
      mainMessage = `Sua solicitação de **DESCARTE** para o anunciante <strong style="color:#202124;">${data.advName}</strong> foi enviada para avaliação do TL.`;
      footerBadge = "AVALIAÇÃO PENDENTE";
      subject = `🗑️ Descarte em Avaliação: ${data.advName}`;
      break;

    case 'AGENT_DISCARD_DONE':
      themeColor = "#ea4335"; // Vermelho Forte
      headerIcon = "❌";
      headerSubtitle = "Descarte Concluído";
      greeting = `Aviso Importante,`;
      mainMessage = `O descarte do caso do anunciante <strong style="color:#202124;">${data.advName}</strong> foi **APROVADO E CONCLUÍDO** pela liderança.`;
      footerBadge = "CASO DESCARTADO";
      subject = `❌ Caso Descartado: ${data.advName}`;
      break;
  }

  // 5. Substituição final e Envio (Agora com o LDAP mapeado corretamente)
  const htmlBody = template
    .replace("{{HEADER_ICON}}", headerIcon)
    .replace("{{HEADER_SUBTITLE}}", headerSubtitle)
    .replace("{{THEME_COLOR}}", themeColor)
    .replace(/{{THEME_COLOR}}/g, themeColor) 
    .replace("{{GREETING}}", greeting)
    .replace("{{MAIN_MESSAGE}}", mainMessage)
    .replace("{{URGENCY_BADGE}}", urgencyBadge)
    .replace("{{FOOTER_BADGE}}", footerBadge)
    .replace(/{{CASE_ID}}/g, data.caseId || "0-0000000000000")
    .replace(/{{SENDER_LDAP}}/g, senderLdap) // <-- AQUI ESTÁ A CHAVE DE OURO
    .replace("{{SITE}}", data.site || "N/A")
    .replace("{{AVAILABILITY}}", dataFormatada)
    .replace("{{CID}}", data.cid || "N/A")
    .replace("{{TASK}}", data.taskType || "N/A")
    .replace("{{REASON}}", data.reason || "N/A")
    .replace("{{ID_ESCALACAO}}", escalacaoId);
  
  MailApp.sendEmail({
    to: destinatario,
    subject: subject,
    htmlBody: htmlBody,
    name: "Cases Wizard"
  });
}