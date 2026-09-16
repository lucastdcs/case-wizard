
const BACKUP_SPREADSHEET_ID = "1WGXHpFCPwvqpIQ_zROJlswQjeunP9ZCQk7uJ0zkTSzI"; 
const SHEET_BACKUP_NAME = "Archive_BAU";

/**
 * Cópia semanal dos casos resolvidos para a planilha de arquivo.
 *
 * O job COPIA e NÃO move: a linha continua na planilha de casos depois de
 * arquivada. Ele nasceu movendo (copiava e deletava), e o preço apareceu de
 * dois jeitos: o histórico do TL só alcançava o que tivesse sobrevivido à
 * última segunda-feira, e o Child_Case_ID gravado na aprovação sumia junto com
 * a linha uma semana depois de ser preenchido. Ver ADR-0014.
 *
 * Idempotência: quem decide se uma linha já foi arquivada são os IDs que já
 * estão NO ARQUIVO, não uma marca deixada na origem. É isso que faz uma
 * execução interrompida no meio (timeout, quota) se consertar sozinha na
 * semana seguinte, em vez de deixar linha marcada como arquivada sem estar.
 */
function runWeeklyBackup() {
  const mainSS = SpreadsheetApp.getActiveSpreadsheet();
  const mainSheet = mainSS.getSheetByName(SHEET_BAU_FORM);
  if (!mainSheet) return;

  const data = mainSheet.getDataRange().getValues();
  if (data.length < 2) {
    console.log("ℹ️ Planilha de casos vazia, nada a arquivar.");
    return;
  }

  const backupSS = SpreadsheetApp.openById(BACKUP_SPREADSHEET_ID);
  let backupSheet = backupSS.getSheetByName(SHEET_BACKUP_NAME);

  if (!backupSheet) {
    backupSheet = backupSS.insertSheet(SHEET_BACKUP_NAME);
    backupSheet.appendRow(data[0]);
  }

  // IDs já arquivados. Uma coluna inteira do arquivo é uma leitura barata (uma
  // célula por caso) e é a única fonte que não mente sobre o que está lá.
  const arquivados = {};
  const ultimaLinha = backupSheet.getLastRow();
  if (ultimaLinha > 0) {
    backupSheet.getRange(1, 1, ultimaLinha, 1).getValues()
      .forEach(linha => { arquivados[String(linha[0])] = true; });
  }

  // Varredura de cima para baixo: sem deleção não há índice se deslocando, e a
  // ordem de append da planilha (cronológica) é a que o arquivo deve preservar.
  const rowsToArchive = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[3];
    if (status !== "CREATED" && status !== "DISCARDED") continue;

    const id = String(row[0] || "");
    if (!id || arquivados[id]) continue;

    arquivados[id] = true;
    rowsToArchive.push(row);
  }

  if (rowsToArchive.length === 0) {
    console.log("ℹ️ Nenhum caso novo para arquivar.");
    return;
  }

  // O arquivo nasceu com o cabeçalho da planilha do dia em que foi criado, e a
  // planilha de casos ganhou colunas depois disso (22 a 24, ver db-schema.md).
  // Escrever um bloco mais largo do que a aba comporta derruba a execução
  // inteira — e derrubaria toda semana, em silêncio, num gatilho que ninguém olha.
  const largura = rowsToArchive[0].length;
  const colunasDoArquivo = backupSheet.getMaxColumns();
  if (colunasDoArquivo < largura) {
    backupSheet.insertColumnsAfter(colunasDoArquivo, largura - colunasDoArquivo);
  }

  backupSheet
    .getRange(backupSheet.getLastRow() + 1, 1, rowsToArchive.length, largura)
    .setValues(rowsToArchive);

  console.log(`✅ Backup concluído: ${rowsToArchive.length} casos copiados para o Cold Storage. Nenhuma linha removida da planilha de casos.`);
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