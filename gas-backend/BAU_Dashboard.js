// =========================================================
// ARQUIVO: BAU_Dashboard.gs
// Responsabilidade: Lógica exclusiva da tela do Team Leader
// =========================================================

/**
 * Puxa todos os dados necessários para o Dashboard do TL,
 * segregando por Creation, Discard e Histórico.
 */
function getTLDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  const data = sheet.getDataRange().getValues();

  const results = {
    pendingCreation: [],
    pendingDiscard: [],
    history: []
  };

  const historyStatuses = ["CREATED", "DISCARDED", "REJECTED", "CANCELED_BY_AGENT"];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = String(row[3] || "");

    const caseObj = {
      id: String(row[0] || ""),
      date: row[1] instanceof Date ? row[1].toISOString() : String(row[1] || ""),
      agentEmail: String(row[2] || ""),
      status: status,
      caseId: String(row[4] || ""),
      cid: String(row[5] || ""),
      seId: String(row[6] || ""),
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
    };

    if (status === "PENDING_TL_CREATION") {
      results.pendingCreation.push(caseObj);
    } else if (status === "PENDING_TL_DISCARD" || status === "PENDING_DISCARD") {
      caseObj.status = "PENDING_TL_DISCARD"; // Normalização
      results.pendingDiscard.push(caseObj);
    } else if (historyStatuses.includes(status)) {
      results.history.push(caseObj);
    }
  }

  // Ordenação: Pendentes por antiguidade (FIFO), Histórico por novidade (LIFO)
  results.pendingCreation.sort((a, b) => new Date(a.date) - new Date(b.date));
  results.pendingDiscard.sort((a, b) => new Date(a.date) - new Date(b.date));
  results.history.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Limite de performance para o histórico
  if (results.history.length > 100) {
    results.history = results.history.slice(0, 100);
  }

  return results;
}

/**
 * Retorna informações do usuário logado (TL)
 */
function getTLUserInfo() {
  const userEmail = Session.getActiveUser().getEmail();
  return {
    email: userEmail,
    ldap: userEmail ? userEmail.split('@')[0] : 'desconhecido'
  };
}

function getPendingBAUCases() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM); 
  const data = sheet.getDataRange().getValues();
  
  const cases = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[3]; 
    
    if (status === "PENDING_TL_CREATION" || status === "PENDING_DISCARD" || status === "PENDING_TL_DISCARD") {
      cases.push({
        id: String(row[0] || ""),
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1] || ""), 
        agentEmail: String(row[2] || ""),
        status: String(status || ""),
        caseId: String(row[4] || ""),
        cid: String(row[5] || ""),
        advName: String(row[7] || ""),
        site: String(row[9] || ""),
        reason: String(row[14] || ""),
        task: String(row[15] || ""),
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17] || "")
      });
    }
  }
  return cases.reverse(); 
}

function updateBAUCaseStatus(id, newStatus) {
  const lock = LockService.getScriptLock();
  
  try {
    lock.waitLock(10000); 
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        // Atualiza a célula de status (Coluna D)
        sheet.getRange(i + 1, 4).setValue(newStatus);
        
        // Reconstrói os dados para disparar o e-mail
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

        if (newStatus === "CREATED") {
          sendDynamicTechSolEmail(agentEmail, emailData, id, 'AGENT_BAU_CREATED', tlEmail);
        } else if (newStatus === "DISCARDED") {
          sendDynamicTechSolEmail(agentEmail, emailData, id, 'AGENT_DISCARD_DONE', tlEmail);
        }
        
        return { success: true, newStatus: newStatus };
      }
    }
    throw new Error("Caso não encontrado.");
  } catch (e) {
    throw e;
  } finally {
    lock.releaseLock();
  }
}

function getAgentCases(ss, userEmail) {
  if (!userEmail) throw new Error("Email do agente é obrigatório.");
  
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  const data = sheet.getDataRange().getValues();
  const myCases = [];
  
  for (let i = data.length - 1; i >= 1; i--) {
    const row = data[i];
    const rowEmail = String(row[2]).toLowerCase().trim();
    const status = String(row[3]);
    
    if (rowEmail === userEmail.toLowerCase().trim()) {
      myCases.push({
        id: row[0],
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1]),
        status: status,
        caseId: row[4],
        advName: row[7],
        task: row[15],
        reason: row[14],
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17])
      });
      
      if (myCases.length >= 30) break; 
    }
  }
  return { status: 'success', cases: myCases };
}

function updateBAUCase(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    const userEmail = (p.user || "").toLowerCase().trim();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === p.id) {
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado. Você só pode editar seus próprios casos.");
        }
        if (!String(data[i][3]).includes("PENDING")) {
          throw new Error("Este caso já foi processado pelo TL e não pode mais ser alterado.");
        }
        
        if (p.taskType) sheet.getRange(i + 1, 16).setValue(p.taskType);
        if (p.reason) sheet.getRange(i + 1, 15).setValue(p.reason);
        if (p.description) sheet.getRange(i + 1, 17).setValue(p.description);
        if (p.availability) sheet.getRange(i + 1, 18).setValue(p.availability);
        
        return { status: 'success', message: 'Caso atualizado com sucesso.' };
      }
    }
    throw new Error("Caso não encontrado.");
  } finally {
    lock.releaseLock();
  }
}

function deleteBAUCase(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    const userEmail = (p.user || "").toLowerCase().trim();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === p.id) {
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado.");
        }
        
        sheet.getRange(i + 1, 4).setValue("CANCELED_BY_AGENT");
        
        return { status: 'success', message: 'Caso cancelado com sucesso.' };
      }
    }
    throw new Error("Caso não encontrado.");
  } finally {
    lock.releaseLock();
  }
}
