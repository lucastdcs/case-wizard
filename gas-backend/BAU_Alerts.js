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

// Email autocontido (não passa por sendDynamicTechSolEmail/EmailTemplateDynamic.html,
// que são desenhados em torno de um caso só) - mesma paleta clara do resto do
// dashboard/emails (gas-backend/TLDashboard.html, gas-backend/EmailTemplateDynamic.html),
// pra nascer visualmente consistente.
function sendBAUVolumeAlertEmail(pendingCount, creationCount, discardCount) {
  const dashboardUrl = ScriptApp.getService().getUrl() + "?page=tl";

  const html = `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8F9FA;">
      <tr>
        <td align="center" style="padding: 64px 20px; font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" max-width="560" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; width: 100%; background-color: #FFFFFF; border-radius: 32px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08); border: 1px solid #DADCE0; margin: 0 auto;">
            <tr>
              <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #3D3D3D; border-bottom: 1px solid rgba(255,255,255,0.15);">
                  <tr>
                    <td align="center" style="padding: 36px 32px; position: relative;">
                      <div style="position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, #4285f4, #9b72cb, #d96570); opacity: 0.8;"></div>
                      <div style="font-size: 24px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 8px;">
                        <img src="https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/warning/default/48px.svg" width="26" height="26" alt="" style="vertical-align: middle; margin-right: 8px; filter: brightness(0) invert(1);" />
                        <span style="color: #FFFFFF; vertical-align: middle;">BAU Central</span>
                      </div>
                      <p style="margin: 0; font-size: 13px; color: #F9AB00; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">Alerta de Volume</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px; text-align: center;">
                <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #3C4043;">
                  A fila de aprovação do BAU passou de <strong style="color:#202124;">${BAU_VOLUME_ALERT_THRESHOLD} casos</strong> aguardando revisão.
                </p>

                <div style="font-size: 56px; font-weight: 700; color: #B06000; line-height: 1;">${pendingCount}</div>
                <div style="font-size: 12px; color: #5F6368; text-transform: uppercase; letter-spacing: 0.5px; margin: 4px 0 24px 0;">casos pendentes</div>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8F9FA; border-radius: 24px; border: 1px solid #DADCE0; margin-bottom: 32px;">
                  <tr>
                    <td style="padding: 20px; text-align: center; width: 50%; border-right: 1px solid #DADCE0;">
                      <div style="font-size: 12px; color: #5F6368; font-weight: 500; margin-bottom: 6px;">Aprovação de Criação</div>
                      <div style="font-size: 20px; font-weight: 700; color: #1A73E8;">${creationCount}</div>
                    </td>
                    <td style="padding: 20px; text-align: center; width: 50%;">
                      <div style="font-size: 12px; color: #5F6368; font-weight: 500; margin-bottom: 6px;">Aprovação de Descarte</div>
                      <div style="font-size: 20px; font-weight: 700; color: #D93025;">${discardCount}</div>
                    </td>
                  </tr>
                </table>

                <table cellpadding="0" cellspacing="0" border="0" align="center">
                  <tr>
                    <td align="center" style="border-radius: 100px; background-color: #1A73E8;">
                      <a href="${dashboardUrl}" target="_blank" style="display: inline-block; color: #FFFFFF; font-size: 14px; font-weight: 600; font-family: 'Google Sans', sans-serif; padding: 14px 32px; text-decoration: none; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.5px;">
                        Abrir TL Dashboard
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px; text-align: center; border-top: 1px solid #DADCE0;">
                <p style="margin: 0; font-size: 12px; color: #5F6368;">Você recebeu isso porque a fila combinada (criação + descarte) passou do limite configurado. Volta a avisar só depois que a fila cair pra ${BAU_VOLUME_ALERT_THRESHOLD} ou menos e cruzar o limite de novo.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  MailApp.sendEmail({
    to: BAU_VOLUME_ALERT_RECIPIENTS.join(','),
    subject: `🚨 ${pendingCount} casos aguardando revisão no BAU Central`,
    htmlBody: html,
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
