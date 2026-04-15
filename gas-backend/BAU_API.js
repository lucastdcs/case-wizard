
function handleBAUEscalation(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); 
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    
    const newId = "bau_" + new Date().getTime();
    const timestamp = p.date || new Date().toISOString();
    const userEmail = p.user || 'anon';
    
    // Define o status inicial vindo do payload ou fallback para criação
    const status = p.status || "PENDING_TL_CREATION";

    // Monta a linha respeitando a ordem estrita das 18 colunas do Code.gs
    const novaLinha = [
      newId,                    // 1. ID
      timestamp,                // 2. Timestamp
      userEmail,                // 3. Agent_Email
      status,                   // 4. Status
      p.caseId || '',           // 5. Case_ID
      p.cid || '',              // 6. CID
      p.seId || '',             // 7. Speakeasy_ID
      p.advName || '',          // 8. Adv_Name
      p.advEmail || '',         // 9. Adv_Email
      p.website || '',          // 10. Website
      p.timezone || '',         // 11. Timezone
      p.language || '',         // 12. Language
      p.amName || '',           // 13. AM_Name
      p.salesProgram || '',     // 14. Sales_Program
      p.reason || '',           // 15. Reason
      p.taskType || '',         // 16. Task_Type
      p.description || p.nonImplementationReason || '', // 17. Description
      p.availability || ''      // 18. Availability
    ];

    sheet.appendRow(novaLinha);

    // Feedback transacional para o Agente
    try {
      if (typeof sendDynamicTechSolEmail === "function") {
        // Define o tipo de e-mail de feedback com base no status
        const tipoEmail = (status === 'PENDING_TL_DISCARD') ? 'AGENT_DISCARD_SENT' : 'AGENT_BAU_SENT';
        sendDynamicTechSolEmail(userEmail, p, newId, tipoEmail, userEmail);
      }
    } catch(e) {
      console.warn("Aviso: Falha ao enviar email do agente", e);
    }

    return { status: 'success', message: 'Caso BAU enviado com sucesso.', id: newId };
    
  } finally {
    lock.releaseLock();
  }
}

// =========================================================
// 2. READ (AGENTE): BUSCAR HISTÓRICO DO AGENTE
// Chamado via JSONP (doGet -> getAgentCases)
// =========================================================
function getAgentCases(ss, userEmail) {
  if (!userEmail) throw new Error("Email do agente é obrigatório.");
  
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  const data = sheet.getDataRange().getValues();
  const myCases = [];
  
  // Lê de baixo para cima (mais recentes primeiro)
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
        cid: row[5],
        advName: row[7],
        reason: row[14],
        task: row[15],
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17])
      });
      
      // Limite de performance: Traz apenas os 30 mais recentes do agente
      if (myCases.length >= 30) break; 
    }
  }
  return { status: 'success', cases: myCases };
}

// =========================================================
// 3. DELETE (AGENTE): CANCELAR UM CASO PRÓPRIO
// Chamado via JSONP (doGet -> deleteBAUCase)
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
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado. Você não é o dono deste caso.");
        }
        
        // Soft Delete (Muda o status em vez de apagar a linha para manter métricas)
        sheet.getRange(i + 1, 4).setValue("CANCELED_BY_AGENT");
        return { status: 'success', message: 'Caso cancelado com sucesso.' };
      }
    }
    throw new Error("Caso não encontrado.");
  } finally {
    lock.releaseLock();
  }
}


// =========================================================
// 4. READ (TL): BUSCAR CASOS PENDENTES PARA O DASHBOARD HTML
// Chamado nativamente via google.script.run
// =========================================================
function getPendingBAUCases() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  const data = sheet.getDataRange().getValues();
  const pendingCases = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = String(row[3]);
    
    // Puxa tudo que estiver com "PENDING" no status
    if (status.includes("PENDING")) {
      pendingCases.push({
        id: row[0],
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1]),
        agentEmail: row[2],
        status: status,
        caseId: row[4],
        cid: row[5],
        advName: row[7],
        reason: row[14],
        task: row[15],
        description: row[16],
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17])
      });
    }
  }
  
  // Ordena do mais antigo para o mais novo (Fila FIFO)
  return pendingCases.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// =========================================================
// 5. UPDATE (TL): APROVAR OU DESCARTAR UM CASO
// Chamado nativamente via google.script.run
// =========================================================
function updateBAUCaseStatus(id, newStatus) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        // Atualiza a coluna D (Status)
        sheet.getRange(i + 1, 4).setValue(newStatus);
        
        // Dispara e-mail para o Agente informando a decisão do TL
        try {
          const agentEmail = data[i][2];
          const tlEmail = Session.getActiveUser().getEmail(); // Captura o TL logado no momento

          // Recria o objeto P para o template de e-mail ler os dados básicos
          const pData = {
            advName: data[i][7],
            caseId: data[i][4],
            cid: data[i][5],
            taskType: data[i][15],
            reason: data[i][14],
            availability: data[i][17] instanceof Date ? data[i][17].toISOString() : String(data[i][17])
          };
          
          if (newStatus === 'CREATED') {
            sendDynamicTechSolEmail(agentEmail, pData, id, 'AGENT_BAU_CREATED', tlEmail);
          } else if (newStatus === 'DISCARDED') {
            sendDynamicTechSolEmail(agentEmail, pData, id, 'AGENT_DISCARD_DONE', tlEmail);
          }
        } catch (emailError) {
          console.error("Erro ao notificar decisão do TL:", emailError);
        }

        return true;
      }
    }
    throw new Error("ID não encontrado na fila.");
  } finally {
    lock.releaseLock();
  }
}
