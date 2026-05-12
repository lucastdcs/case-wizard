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
    
    if (status === "PENDING_TL_CREATION" || status === "PENDING_TL_DISCARD") {
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
    
    // Agora traz TODOS os campos para permitir edição completa no frontend
    if (rowEmail === userEmail.toLowerCase().trim()) {
      myCases.push({
        id: row[0],
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1]),
        agentEmail: row[2],
        status: status,
        caseId: row[4],
        cid: row[5],
        seId: row[6],
        advName: row[7],
        advEmail: row[8],
        site: row[9],
        timezone: row[10],
        language: row[11],
        amName: row[12],
        salesProgram: row[13],
        reason: row[14],
        task: row[15],
        description: row[16],
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17])
      });
      
      // Trava de performance: Puxa no máximo os 30 casos mais recentes
      if (myCases.length >= 30) break; 
    }
  }
  return { status: 'success', cases: myCases };
}

// =========================================================
// UPDATE: EDITAR UM CASO PENDENTE (Otimizado com setValues)
// =========================================================
function update_bau_case(ss, p) {
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
        const currentStatus = String(data[i][3]);
        if (!currentStatus.includes("PENDING")) {
          throw new Error("Este caso já foi processado pelo TL e não pode mais ser alterado.");
        }
        
        let newStatus = currentStatus;
        if (p.requestType) {
             newStatus = p.requestType === 'DISCARD' ? 'PENDING_TL_DISCARD' : 'PENDING_TL_CREATION';
        }

        // Prepara o array de valores para atualização em massa (Colunas D até R, índices 3 a 17)
        // Mantemos os valores atuais se não forem passados no payload (p)
        const rowUpdate = [
            newStatus,                                          // Col D (Índice 3)
            p.caseId !== undefined ? p.caseId : data[i][4],     // Col E (Índice 4)
            p.cid !== undefined ? p.cid : data[i][5],           // Col F (Índice 5)
            p.seId !== undefined ? p.seId : data[i][6],         // Col G (Índice 6)
            p.advName !== undefined ? p.advName : data[i][7],   // Col H (Índice 7)
            p.advEmail !== undefined ? p.advEmail : data[i][8], // Col I (Índice 8)
            p.website !== undefined ? p.website : data[i][9],   // Col J (Índice 9)
            p.timezone !== undefined ? p.timezone : data[i][10],// Col K (Índice 10)
            p.language !== undefined ? p.language : data[i][11],// Col L (Índice 11)
            p.amName !== undefined ? p.amName : data[i][12],     // Col M (Índice 12)
            p.salesProgram !== undefined ? p.salesProgram : data[i][13], // Col N (Índice 13)
            p.reason !== undefined ? p.reason : data[i][14],     // Col O (Índice 14)
            p.taskType !== undefined ? p.taskType : data[i][15], // Col P (Índice 15)
            p.description !== undefined ? p.description : data[i][16], // Col Q (Índice 16)
            p.availability !== undefined ? p.availability : data[i][17] // Col R (Índice 17)
        ];

        // Aplica a atualização em uma única chamada ao SpreadsheetApp (Performance)
        sheet.getRange(i + 1, 4, 1, rowUpdate.length).setValues([rowUpdate]);
        
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