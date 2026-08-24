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
// divergindo em cor, raio e espacamento, e esta aqui carregava os mesmos
// problemas de Gmail que a outra (icone SVG que nao renderiza, gradiente
// posicionado por coordenada, sem modo escuro e sem alternativa em texto).
// O que este e-mail tem de proprio sao os slots: metricas no lugar dos dados
// do caso, e um botao de verdade no lugar do selo.
function sendBAUVolumeAlertEmail(pendingCount, creationCount, discardCount) {
  // Fixo (não ScriptApp.getService().getUrl()): esse email é enviado por gatilho de
  // tempo, e nesse contexto getUrl() pode devolver a URL de OUTRA implantação do
  // projeto (não a implantação fixa usada em produção, pinada via clasp deploy -i
  // em .github/workflows/deploy.yml e referenciada em src/modules/shared/data-service.js).
  const dashboardUrl = "https://script.google.com/a/macros/google.com/s/AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg/exec?page=tl";

  const motivo = "Você recebeu isso porque a fila combinada (criação + descarte) passou do limite configurado. "
    + "Volta a avisar só depois que a fila cair pra " + BAU_VOLUME_ALERT_THRESHOLD + " ou menos e cruzar o limite de novo.";

  const htmlBody = renderBauEmail({
    preheader: pendingCount + " casos pendentes · " + creationCount + " criação, " + discardCount + " descarte",
    headerIcon: "⚠️",
    headerSubtitle: "Alerta de Volume",
    themeColor: EMAIL_TOKENS.accentAmber,
    contentAlign: "center",
    mainMessage: 'A fila de aprovação do BAU passou de <strong>'
      + BAU_VOLUME_ALERT_THRESHOLD + ' casos</strong> aguardando revisão.',
    bodyBlocks: renderEmailMetricPanel(pendingCount, "casos pendentes", [
      { label: "Aprovação de Criação", value: creationCount, color: "{{t.link}}" },
      { label: "Aprovação de Descarte", value: discardCount, color: "{{t.accentRed}}" }
    ]),
    footerAction: renderEmailButton("Abrir TL Dashboard", dashboardUrl),
    footerNote: renderEmailFooterNote(motivo)
  });

  const plainBody = [
    "A fila de aprovacao do BAU passou de " + BAU_VOLUME_ALERT_THRESHOLD + " casos aguardando revisao.",
    "",
    pendingCount + " casos pendentes",
    "Aprovacao de Criacao: " + creationCount,
    "Aprovacao de Descarte: " + discardCount,
    "",
    "Abrir TL Dashboard: " + dashboardUrl,
    "",
    stripEmailHtml(motivo)
  ].join("\n");

  MailApp.sendEmail({
    to: BAU_VOLUME_ALERT_RECIPIENTS.join(','),
    subject: `🚨 ${pendingCount} casos aguardando revisão no BAU Central`,
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
