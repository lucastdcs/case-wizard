
function handleBAUEscalation(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); 
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    
    const newId = "bau_" + new Date().getTime();
    const timestamp = p.date || new Date().toISOString();
    const userEmail = p.user || 'anon';
    
    const status = "PENDING_TL_CREATION"; 

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
      (p.requestType === 'BAU' && p.nonImplementationReason)
        ? p.nonImplementationReason + " | " + (p.description || "")
        : (p.description || p.nonImplementationReason || ''), // 17. Description
      p.availability || ''      // 18. Availability
    ];

    sheet.appendRow(novaLinha);

    try {
      if (typeof sendDynamicTechSolEmail === "function") {
        sendDynamicTechSolEmail(userEmail, p, newId, 'AGENT_BAU_SENT', userEmail);
      }
    } catch(e) {
      console.warn("Aviso: Falha ao enviar email do agente", e);
    }

    return { status: 'success', message: 'Caso BAU enviado com sucesso.', id: newId };
    
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
      // Coluna 16 guarda "Motivo | Descrição" mesclados (ver handleBAUEscalation
      // e update_bau_case) só para o fluxo BAU — o fluxo DISCARD nunca mescla,
      // grava só a descrição pura. Desfazemos a mesma mescla aqui, senão o
      // formulário de edição nunca consegue pré-preencher o dropdown de motivo
      // e acaba jogando a string inteira ("Motivo | Descrição") no campo de texto.
      const rawDescription = String(row[16] || "");
      const isDiscardFlow = status === 'PENDING_TL_DISCARD' || status === 'DISCARDED';
      let nonImplementationReason = "";
      let description = rawDescription;

      if (!isDiscardFlow && rawDescription.includes(" | ")) {
        const descParts = rawDescription.split(" | ");
        nonImplementationReason = descParts[0] || "";
        description = descParts.slice(1).join(" | ") || "";
      }

      myCases.push({
        id: String(row[0]),
        date: row[1] instanceof Date ? row[1].toISOString() : String(row[1]),
        agentEmail: String(row[2]),
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
        nonImplementationReason: nonImplementationReason,
        description: description,
        availability: row[17] instanceof Date ? row[17].toISOString() : String(row[17] || "")
      });

      if (myCases.length >= 30) break;
    }
  }
  return { status: 'success', cases: myCases };
}

function deleteBAUCase(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    const data = sheet.getDataRange().getValues();
    const userEmail = (p.user || "").toLowerCase().trim();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(p.id)) {
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado. Você não é o dono deste caso.");
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

function update_bau_case(ss, p) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);

    // Garantir que a planilha tenha pelo menos 18 colunas
    const currentMaxCols = sheet.getMaxColumns();
    if (currentMaxCols < 18) {
      sheet.insertColumnsAfter(currentMaxCols, 18 - currentMaxCols);
    }

    const data = sheet.getDataRange().getValues();
    const userEmail = (p.user || "").toLowerCase().trim();
    
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(p.id)) {
        if (String(data[i][2]).toLowerCase().trim() !== userEmail) {
          throw new Error("Acesso negado. Você só pode editar seus próprios casos.");
        }
        const currentStatus = String(data[i][3]);
        if (!currentStatus.includes("PENDING")) {
          throw new Error("Este caso já foi processado pelo TL e não pode mais ser alterado.");
        }
        
        let newStatus = currentStatus;
        if (p.requestType) {
             newStatus = p.requestType === 'DISCARD' ? 'PENDING_TL_DISCARD' : 'PENDING_TL_CREATION';
        }

        // Column 17 Logic (Description) - Smart Merge for BAU
        let finalDescription = data[i][16];
        if (p.requestType === 'BAU') {
          const currentDesc = String(data[i][16] || "");
          const parts = currentDesc.split(" | ");
          let oldNIR = parts[0] || "";
          let oldDetail = parts.slice(1).join(" | ") || "";

          const newNIR = p.nonImplementationReason !== undefined ? p.nonImplementationReason : oldNIR;
          const newDetail = p.description !== undefined ? p.description : oldDetail;

          if (p.nonImplementationReason !== undefined || p.description !== undefined) {
            finalDescription = newNIR + " | " + newDetail;
          }
        } else if (p.description !== undefined) {
          finalDescription = p.description;
        }

        const rowUpdate = [
            newStatus,
            p.caseId !== undefined ? p.caseId : data[i][4],
            p.cid !== undefined ? p.cid : data[i][5],
            p.seId !== undefined ? p.seId : data[i][6],
            p.advName !== undefined ? p.advName : data[i][7],
            p.advEmail !== undefined ? p.advEmail : data[i][8],
            p.website !== undefined ? p.website : data[i][9],
            p.timezone !== undefined ? p.timezone : data[i][10],
            p.language !== undefined ? p.language : data[i][11],
            p.amName !== undefined ? p.amName : data[i][12],
            p.salesProgram !== undefined ? p.salesProgram : data[i][13],
            p.reason !== undefined ? p.reason : data[i][14],
            p.taskType !== undefined ? p.taskType : data[i][15],
            finalDescription,
            p.availability !== undefined ? p.availability : data[i][17]
        ];

        sheet.getRange(i + 1, 4, 1, rowUpdate.length).setValues([rowUpdate]);
        console.log("Caso atualizado com sucesso. ID:", p.id, "Row:", i+1);

        return { status: 'success', message: 'Caso atualizado com sucesso.' };
      }
    }
    throw new Error("Caso não encontrado.");
  } finally {
    lock.releaseLock();
  }
}

function runDataIntegrityAudit() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_BAU_FORM);
  if (!sheet) {
    console.error("Planilha BAU não encontrada para auditoria.");
    return;
  }

  const data = sheet.getDataRange().getValues();
  const issues = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const id = row[0];
    const status = row[3];

    if (status === "CANCELED_BY_AGENT") continue;

    const missing = [];
    if (!row[4]) missing.push("Case ID");
    if (!row[5]) missing.push("CID");
    if (!row[14]) missing.push("Reason");
    if (!row[16]) missing.push("Description");

    if (missing.length > 0) {
      issues.push(`Row ${i+1} (ID: ${id}): Missing ${missing.join(", ")}`);
    }
  }

  if (issues.length > 0) {
    console.warn("Auditoria de Integridade de Dados encontrou problemas:\n" + issues.join("\n"));
  } else {
    console.log("Auditoria de Integridade de Dados concluída sem problemas.");
  }
}
