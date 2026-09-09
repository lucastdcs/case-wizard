// =========================================================
// ARQUIVO: BAU_Alerts.gs
// Responsabilidade: alertas disparados por gatilho de tempo (não por
// ação de tela) - separado de BAU_Dashboard.js pelo mesmo motivo de
// Backup.js ser um arquivo próprio: ciclo de vida e "caller" diferentes
// (ScriptApp, não google.script.run vindo do TLDashboard.html).
// =========================================================

const BAU_VOLUME_ALERT_THRESHOLD = 10;

// Quem sempre recebe o alerta, esteja ou não na aba People com papel de
// liderança. É o dono do projeto: se a planilha ficar vazia, mal preenchida ou
// ilegível, o alerta ainda chega em alguém em vez de sumir em silêncio.
const BAU_VOLUME_ALERT_ALWAYS = ["lucaste"];

// Destinatários derivados da aba People, não mais uma lista fixa no código.
//
// O critério é o MESMO que abre o TL Dashboard (isOverheadRoleCategory), e não
// uma segunda régua: o alerta chama pra ação "Abrir TL Dashboard", então quem
// não consegue abrir não deveria ser chamado, e quem consegue e pode dar vazão
// à fila deveria. É a mesma lista que getActiveTLs() já usa pra presença.
//
// ⚠️ Essa régua é PERMISSIVA por construção (ver db-schema.md): uma categoria
// nova que não contenha "agent" nem "apprentice" — 'Intern', 'Contractor' —
// entra sozinha, sem mudança de código, e passa a receber este e-mail. Rode
// listBAUVolumeAlertRecipients() antes de ligar o gatilho pra ver a lista de
// verdade; é o mesmo cuidado que listStaleContentApprovals() existe pra dar.
function getBAUVolumeAlertRecipients() {
  const ldaps = {};
  BAU_VOLUME_ALERT_ALWAYS.forEach(function (l) { ldaps[String(l).toLowerCase().trim()] = true; });

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_PEOPLE);
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        const ldap = String(data[i][0] || "").toLowerCase().trim();
        if (ldap && isOverheadRoleCategory(data[i][2])) ldaps[ldap] = true;
      }
    }
  } catch (e) {
    // Falha de leitura não pode zerar o alerta: cai pro BAU_VOLUME_ALERT_ALWAYS,
    // que é o comportamento de antes desta mudança.
    console.warn("Aviso: falha ao ler People para o alerta de volume", e);
  }

  return Object.keys(ldaps).sort().map(function (l) { return l + "@google.com"; });
}

/**
 * Leitura de conferência: devolve quem receberia o alerta AGORA, sem enviar
 * nada. Rode pelo editor do Apps Script antes de ligar o gatilho — o primeiro
 * disparo não deve surpreender ninguém.
 */
function listBAUVolumeAlertRecipients() {
  const lista = getBAUVolumeAlertRecipients();
  console.log("Destinatários do alerta de volume BAU (" + lista.length + "):\n" + lista.join("\n"));
  return lista;
}

// Roda periodicamente (ver setupBAUVolumeAlertTrigger() abaixo). Conta a fila
// combinada (criação + descarte pendentes) e manda um alerta só na TRANSIÇÃO
// de cruzar o limite - não a cada checagem enquanto continuar acima, senão
// vira spam a cada hora até alguém dar vazão na fila.
function checkBAUPendingVolume() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  const data = sheet.getDataRange().getValues();

  let pendingCount = 0;
  let creationCount = 0;
  let discardCount = 0;

  for (let i = 1; i < data.length; i++) {
    const status = data[i][3];
    if (status === "PENDING_TL_CREATION") {
      pendingCount++;
      creationCount++;
    } else if (status === "PENDING_TL_DISCARD") {
      pendingCount++;
      discardCount++;
    }
  }

  const props = PropertiesService.getScriptProperties();
  const alreadyActive = props.getProperty('BAU_VOLUME_ALERT_ACTIVE') === 'true';

  if (pendingCount > BAU_VOLUME_ALERT_THRESHOLD) {
    if (!alreadyActive) {
      try {
        sendBAUVolumeAlertEmail(pendingCount, creationCount, discardCount);
        props.setProperty('BAU_VOLUME_ALERT_ACTIVE', 'true');
      } catch (e) {
        console.warn("Aviso: Falha ao enviar alerta de volume BAU", e);
      }
    }
  } else if (alreadyActive) {
    // Fila voltou ao normal - rearma o alerta pra próxima vez que cruzar o limite
    props.setProperty('BAU_VOLUME_ALERT_ACTIVE', 'false');
  }
}

// Passa pela mesma casca dos e-mails do fluxo BAU (renderBauEmail, em
// EmailEngine.js). Antes este arquivo montava um HTML proprio "pra nascer
// visualmente consistente", e o resultado foi o oposto: as duas copias foram
// divergindo em cor, raio e espacamento. O que este e-mail tem de proprio sao
// os slots: a fila no lugar dos dados do caso, e nenhum bloco de motivo.
function sendBAUVolumeAlertEmail(pendingCount, creationCount, discardCount) {
  const motivo = "Você recebeu isso porque a fila combinada (criação + descarte) passou do limite configurado. "
    + "O aviso volta só depois que a fila cair para " + BAU_VOLUME_ALERT_THRESHOLD + " ou menos e cruzar o limite de novo.";

  // Mesmo traço de autoria dos e-mails do fluxo BAU (EMAIL_I18N.footerTrace).
  // Aqui não há ID de escalação para rastrear - o que identifica o e-mail é a
  // origem: é a verificação automática da fila, não uma ação de alguém.
  const rodape = motivo + " · Cases Wizard · automatizado por " + CW_AUTHOR_CREDIT;

  const htmlBody = renderBauEmail({
    preheader: pendingCount + " casos aguardando revisão no BAU",
    accent: EMAIL_TOKENS.accentAmber,
    title: pendingCount + " casos aguardando revisão no BAU",
    lead: "A fila de aprovação passou de " + BAU_VOLUME_ALERT_THRESHOLD + " casos pendentes.",
    meta: "Verificação automática da fila",
    action: renderEmailButton("Abrir TL Dashboard", TL_DASHBOARD_URL),
    blocks: renderEmailSection("Fila atual", renderEmailFields([
      { label: "Aprovação de criação", value: creationCount },
      { label: "Aprovação de descarte", value: discardCount },
      { label: "Total pendente", value: pendingCount }
    ])),
    footerNote: rodape
  });

  const plainBody = [
    pendingCount + " casos aguardando revisão no BAU",
    "",
    "A fila de aprovação passou de " + BAU_VOLUME_ALERT_THRESHOLD + " casos pendentes.",
    "",
    "Abrir TL Dashboard: " + TL_DASHBOARD_URL,
    "",
    "Fila atual",
    "Aprovação de criação: " + creationCount,
    "Aprovação de descarte: " + discardCount,
    "Total pendente: " + pendingCount,
    "",
    rodape
  ].join("\n");

  MailApp.sendEmail({
    to: getBAUVolumeAlertRecipients().join(','),
    subject: pendingCount + " casos aguardando revisão no BAU Central",
    htmlBody: htmlBody,
    body: plainBody,
    name: "Cases Wizard"
  });
}

/**
 * ⚠️ AÇÃO MANUAL NECESSÁRIA — rode esta função UMA VEZ pelo editor do Apps Script
 * (seleciona "setupBAUVolumeAlertTrigger" no dropdown de funções → Executar).
 *
 * Mesmo raciocínio de setupWeeklyBackupTrigger() em Backup.js: criar acionadores
 * exige uma execução autorizada interativa, não dá pra fazer via `clasp push`/deploy.
 *
 * Cria (ou recria, se já existir) um acionador baseado em tempo que roda
 * checkBAUPendingVolume() de hora em hora. É idempotente: rodar de novo não
 * duplica o acionador, só substitui pelo mesmo agendamento. Ajuste o intervalo
 * aqui se 1h não for a cadência certa.
 */
function setupBAUVolumeAlertTrigger() {
  const existing = ScriptApp.getProjectTriggers().filter(
    t => t.getHandlerFunction() === 'checkBAUPendingVolume'
  );
  existing.forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('checkBAUPendingVolume')
    .timeBased()
    .everyHours(1)
    .create();

  console.log("✅ Acionador configurado: checkBAUPendingVolume de hora em hora.");
}
