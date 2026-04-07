// =========================================================
// ARQUIVO: BAU_Dashboard.gs
// Responsabilidade: Lógica exclusiva da tela do Team Leader
// =========================================================

function getPendingBAUCases() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM); 
  const data = sheet.getDataRange().getValues();
  
  const cases = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[3]; 
    
    if (status === "PENDING_TL_CREATION" || status === "PENDING_DISCARD") {
      // Usamos String() e checagem de Data para garantir que NENHUM objeto complexo quebre o front-end
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
        // O SEGUNDO VILÃO ESTAVA AQUI: A disponibilidade também é lida como Data pelo Sheets
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
      if (data[i][0] === id) {
        // Atualiza a célula de status (Coluna D)
        sheet.getRange(i + 1, 4).setValue(newStatus);
        
        // Reconstrói os dados para disparar o e-mail que fizemos ontem
        const rowData = data[i];
        const emailData = {
          advName: rowData[7],
          caseId: rowData[4],
          site: rowData[9],
          availability: rowData[17],
          cid: rowData[5],
          taskType: rowData[15],
          reason: rowData[14]
        };
        const agentEmail = rowData[2];
        const tlEmail = Session.getActiveUser().getEmail(); // Captura o TL logado no momento

        // Chama a função de e-mail que você já configurou!
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
  
  // Lê de baixo para cima para trazer os mais recentes primeiro
  for (let i = data.length - 1; i >= 1; i--) {
    const row = data[i];
    const rowEmail = String(row[2]).toLowerCase().trim();
    const status = String(row[3]);
    
    // Agora traz TODOS os casos do agente (Pendentes, Criados, Descartados)
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
      
      // Trava de performance: Puxa no máximo os 30 casos mais recentes
      if (myCases.length >= 30) break; 
    }
  }
  return { status: 'success', cases: myCases };
}

// =========================================================
// UPDATE: EDITAR UM CASO PENDENTE
// =========================================================
function updateBAUCase(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    const userEmail = (p.user || "").toLowerCase().trim();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === p.id) {
        // Validação de Segurança: Só o dono do caso pode editar
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado. Você só pode editar seus próprios casos.");
        }
        // Só edita se estiver pendente
        if (!String(data[i][3]).includes("PENDING")) {
          throw new Error("Este caso já foi processado pelo TL e não pode mais ser alterado.");
        }
        
        // Atualiza as células específicas (Ex: Coluna P=Task, O=Reason, R=Disponibilidade)
        // Lembre-se que i+1 é a linha real, e as colunas começam no 1
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

// =========================================================
// DELETE: CANCELAR UM CASO
// =========================================================
function deleteBAUCase(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    const userEmail = (p.user || "").toLowerCase().trim();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === p.id) {
        // Segurança
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado.");
        }
        
        // Em vez de apagar a linha (o que prejudica métricas), mudamos o status para Cancelado
        sheet.getRange(i + 1, 4).setValue("CANCELED_BY_AGENT");
        
        return { status: 'success', message: 'Caso cancelado com sucesso.' };
      }
    }
    throw new Error("Caso não encontrado.");
  } finally {
    lock.releaseLock();
  }
}