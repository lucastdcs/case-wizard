// =========================================================
// ARQUIVO: BAU_Dashboard.gs
// Responsabilidade: Lógica exclusiva da tela do Team Leader
// =========================================================

// Identidade de quem está acessando o dashboard agora - reaproveita o mesmo
// profile (ldap, role, etc.) que assertCallerIsOverhead() já busca na
// planilha People pra checar permissão, exposto pro cliente montar a faixa
// de boas-vindas (foto + saudação).
function getCurrentTLProfile() {
  return assertCallerIsOverhead();
}

function getPendingBAUCases() {
  assertCallerIsOverhead();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM); 
  const data = sheet.getDataRange().getValues();
  
  const cases = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[3]; 
    
    if (status === "PENDING_TL_CREATION" || status === "PENDING_TL_DISCARD") {
      cases.push({
        id: String(row[0] || ""),
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1] || ""), 
        agentEmail: String(row[2] || ""),
        status: String(status || ""),
        caseId: String(row[4] || ""),
        cid: String(row[5] || ""),
        speakeasyId: String(row[6] || ""),
        advName: String(row[7] || ""),
        advEmail: String(row[8] || ""),
        site: String(row[9] || ""),
        timezone: String(row[10] || ""),
        language: String(row[11] || ""),
        amName: String(row[12] || ""),
        salesProgram: String(row[13] || ""),
        reason: String(row[14] || ""),
        task: String(row[15] || ""),
        description: String(row[16] || ""),
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17] || "")
      });
    }
  }
  return cases.reverse(); 
}

function updateBAUCaseStatus(id, newStatus) {
  assertCallerIsOverhead();

  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        sheet.getRange(i + 1, 4).setValue(newStatus);
        
        const rowData = data[i];
        const emailData = {
          advName: rowData[7],
          caseId: rowData[4],
          site: rowData[9],
          availability: rowData[17] instanceof Date ? rowData[17].toISOString() : String(rowData[17] || ""),
          cid: rowData[5],
          taskType: rowData[15],
          reason: rowData[14]
        };
        const agentEmail = rowData[2];
        const tlEmail = Session.getActiveUser().getEmail();

        // O status já foi gravado na planilha (linha acima) antes de chegar aqui -
        // uma falha no envio do email não pode mais derrubar a ação inteira pro
        // cliente (google.script.run reportaria falha mesmo com o status já salvo).
        let emailSent = true;
        try {
          if (newStatus === "CREATED") {
            sendDynamicTechSolEmail(agentEmail, emailData, id, 'AGENT_BAU_CREATED', tlEmail);
          } else if (newStatus === "DISCARDED") {
            sendDynamicTechSolEmail(agentEmail, emailData, id, 'AGENT_DISCARD_DONE', tlEmail);
          }
        } catch (e) {
          emailSent = false;
          console.warn("Aviso: Falha ao enviar email de confirmação de status", e);
        }

        return { success: true, newStatus: newStatus, emailSent: emailSent };
      }
    }
    throw new Error("Caso não encontrado.");
  } catch (e) {
    throw e;
  } finally {
    lock.releaseLock();
  }
}
