
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