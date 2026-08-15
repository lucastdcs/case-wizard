
const BACKUP_SPREADSHEET_ID = "1WGXHpFCPwvqpIQ_zROJlswQjeunP9ZCQk7uJ0zkTSzI"; 
const SHEET_BACKUP_NAME = "Archive_BAU";

function runWeeklyBackup() {
  const mainSS = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = mainSS.getSheetByName(SHEET_BAU_FORM); 
  if (!mainSheet) return;

  // 1. Conecta com a Planilha de Backup
  const backupSS = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);
  let backupSheet = backupSS.getSheetByName(SHEET_BACKUP_NAME);
  
  // Se a aba de backup não existir, ele cria e copia o cabeçalho
  if (!backupSheet) {
    backupSheet = backupSS.insertSheet(SHEET_BACKUP_NAME);
    const header = mainSheet.getRange(1, 1, 1, mainSheet.getLastColumn()).getValues();
    backupSheet.appendRow(header[0]);
  }

  const data = mainSheet.getDataRange().getValues();
  const rowsToArchive = [];
  const rowsToDelete = [];

  // 2. Lógica de Varredura (Fazemos de BAIXO PARA CIMA)
  // Varremos ao contrário porque se deletarmos a linha 2, a linha 3 vira a 2, e isso quebra o loop
  for (let i = data.length - 1; i >= 1; i--) { 
    const row = data[i];
    const status = row[3]; // Coluna D (Status)
    
    // REGRA DE BACKUP: Mover tudo que já foi finalizado pelo TL
    // (Você pode adicionar verificação de data aqui depois, se quiser mover os PENDENTES muito antigos)
    if (status === "CREATED" || status === "DISCARDED") {
      rowsToArchive.push(row);
      rowsToDelete.push(i + 1); // +1 porque a array começa no 0 e a planilha começa no 1
    }
  }

  // 3. Execução do Backup (Em Lote, para não dar timeout)
  if (rowsToArchive.length > 0) {
    // Escreve os dados na planilha de backup de uma vez só (super rápido)
    backupSheet.getRange(backupSheet.getLastRow() + 1, 1, rowsToArchive.length, rowsToArchive[0].length).setValues(rowsToArchive.reverse());

    // Deleta as linhas da planilha principal (uma por uma, mas de baixo pra cima é seguro)
    rowsToDelete.forEach(rowNum => {
      mainSheet.deleteRow(rowNum);
    });

    console.log(`✅ Backup concluído: ${rowsToArchive.length} casos foram movidos para o Cold Storage.`);
  } else {
    console.log("ℹ️ Nenhum caso finalizado precisava de backup hoje.");
  }
}

/**
 * ⚠️ AÇÃO MANUAL NECESSÁRIA — rode esta função UMA VEZ pelo editor do Apps Script
 * (seleciona "setupWeeklyBackupTrigger" no dropdown de funções → Executar).
 *
 * Não existia nenhum gatilho (Trigger) configurado por código pra runWeeklyBackup
 * em nenhum lugar do projeto — ela só executava se alguém tivesse configurado um
 * acionador manualmente pela UI (Acionadores ⏰), o que não deixa rastro no código
 * e é fácil de perder/esquecer numa reconfiguração do projeto.
 *
 * Essa função cria (ou recria, se já existir) um acionador baseado em tempo que
 * roda runWeeklyBackup toda segunda-feira de madrugada, no fuso do projeto
 * (America/Sao_Paulo, ver appsscript.json). É idempotente: rodar de novo não
 * duplica o acionador, só substitui pelo mesmo agendamento.
 *
 * Criar acionadores exige uma execução autorizada interativa — não dá pra fazer
 * isso automaticamente via `clasp push`/deploy, por isso precisa ser rodada manualmente.
 */
function setupWeeklyBackupTrigger() {
  const existing = ScriptApp.getProjectTriggers().filter(
    t => t.getHandlerFunction() === 'runWeeklyBackup'
  );
  existing.forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('runWeeklyBackup')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(3)
    .create();

  console.log("✅ Acionador semanal configurado: runWeeklyBackup toda segunda-feira, por volta das 03h.");
}