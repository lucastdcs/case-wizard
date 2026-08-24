// =========================================================
// ARQUIVO: BAU_Alerts.gs
// Responsabilidade: alertas disparados por gatilho de tempo (não por
// ação de tela) - separado de BAU_Dashboard.js pelo mesmo motivo de
// Backup.js ser um arquivo próprio: ciclo de vida e "caller" diferentes
// (ScriptApp, não google.script.run vindo do TLDashboard.html).
// =========================================================

const BAU_VOLUME_ALERT_THRESHOLD = 10;
const BAU_VOLUME_ALERT_RECIPIENTS = ["lucaste@google.com"]; // adicione mais emails aqui depois

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
    footerNote: motivo
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
    motivo
  ].join("\n");

  MailApp.sendEmail({
    to: BAU_VOLUME_ALERT_RECIPIENTS.join(','),
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
