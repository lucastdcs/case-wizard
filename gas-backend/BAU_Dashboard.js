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

// Classifica a transição de status numa ação legível, usada tanto pra trilha
// de auditoria (Processed_Action) quanto pro feed "Atividade recente" e pro
// histórico semanal do painel do TL. Sem isso, um Status final "CREATED" é
// ambíguo: pode ser uma criação recém-aprovada OU um pedido de descarte
// negado (o caso volta pro mesmo status CREATED) - duas decisões bem
// diferentes que precisam contar como coisas distintas no histórico.
function resolveProcessedAction(previousStatus, newStatus) {
  if (previousStatus === "PENDING_TL_CREATION") {
    return newStatus === "CREATED" ? "APPROVED_CREATION" : "REJECTED_CREATION";
  }
  if (previousStatus === "PENDING_TL_DISCARD") {
    return newStatus === "DISCARDED" ? "CONFIRMED_DISCARD" : "KEPT_ACTIVE";
  }
  return newStatus;
}

function updateBAUCaseStatus(id, newStatus) {
  assertCallerIsOverhead();

  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
    ensureBAUHistoryColumns(sheet);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        const previousStatus = String(data[i][3] || "");
        sheet.getRange(i + 1, 4).setValue(newStatus);

        const tlEmail = Session.getActiveUser().getEmail();
        const processedAction = resolveProcessedAction(previousStatus, newStatus);
        sheet.getRange(i + 1, 19, 1, 3).setValues([[tlEmail, new Date(), processedAction]]);

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

// Feed "Atividade recente" do painel lateral: últimas N decisões tomadas por
// qualquer TL, mais recentes primeiro. Lê direto de BAU_form_data (sem
// planilha auxiliar) - a trilha de auditoria já grava tudo que essa lista
// precisa nas colunas de histórico.
function getRecentActivity(limit) {
  assertCallerIsOverhead();
  const max = limit || 12;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  ensureBAUHistoryColumns(sheet);
  const data = sheet.getDataRange().getValues();

  const activity = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const processedAt = row[19];
    if (!processedAt) continue;

    activity.push({
      id: String(row[0] || ""),
      caseId: String(row[4] || ""),
      advName: String(row[7] || ""),
      status: String(row[3] || ""),
      action: String(row[20] || ""),
      processedBy: String(row[18] || ""),
      processedAt: processedAt instanceof Date ? processedAt.toISOString() : String(processedAt)
    });
  }

  activity.sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt));
  return activity.slice(0, max);
}

// Histórico + métricas da 3ª aba do dashboard ("Histórico"). Uma única
// varredura da planilha alimenta a lista de casos resolvidos na janela E as
// métricas (tempo médio de aprovação, ranking de agentes que mais abriram
// caso) - não há necessidade de guardar nada agregado à parte.
//
// Regra de classificação: só entram nos totais "Aprovados"/"Descartados" as
// ações que de fato resolveram um caso (APPROVED_CREATION, REJECTED_CREATION,
// CONFIRMED_DISCARD). KEPT_ACTIVE (pedido de descarte negado) fica de fora -
// o caso continua ativo, não foi "resolvido" no sentido que o TL espera ver
// aqui.
function getWeeklyHistory(days) {
  assertCallerIsOverhead();
  const windowDays = days || 7;
  const cutoff = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_BAU_FORM);
  ensureBAUHistoryColumns(sheet);
  const data = sheet.getDataRange().getValues();

  const cases = [];
  let approvedCount = 0;
  let discardedCount = 0;
  let resolutionHoursSum = 0;
  let resolutionSamples = 0;
  const submittedByAgent = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Ranking "quem mais abre casos": conta todo envio dentro da janela,
    // independente do status atual (ainda pendente, aprovado ou descartado).
    const submittedAt = row[1] instanceof Date ? row[1] : new Date(row[1]);
    const agentEmail = String(row[2] || "").toLowerCase().trim();
    if (agentEmail && !isNaN(submittedAt.getTime()) && submittedAt >= cutoff) {
      submittedByAgent[agentEmail] = (submittedByAgent[agentEmail] || 0) + 1;
    }

    const processedAtRaw = row[19];
    if (!processedAtRaw) continue;
    const processedAt = processedAtRaw instanceof Date ? processedAtRaw : new Date(processedAtRaw);
    if (isNaN(processedAt.getTime()) || processedAt < cutoff) continue;

    const action = String(row[20] || "");
    if (action !== "APPROVED_CREATION" && action !== "REJECTED_CREATION" && action !== "CONFIRMED_DISCARD") continue;

    cases.push({
      id: String(row[0] || ""),
      caseId: String(row[4] || ""),
      advName: String(row[7] || ""),
      task: String(row[15] || ""),
      action: action,
      processedBy: String(row[18] || ""),
      processedAt: processedAt.toISOString()
    });

    if (action === "APPROVED_CREATION") {
      approvedCount++;
      if (!isNaN(submittedAt.getTime())) {
        resolutionHoursSum += (processedAt.getTime() - submittedAt.getTime()) / 3600000;
        resolutionSamples++;
      }
    } else {
      discardedCount++;
    }
  }

  cases.sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt));

  const topAgents = Object.keys(submittedByAgent)
    .map(email => ({ email: email, count: submittedByAgent[email] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    windowDays: windowDays,
    cases: cases,
    stats: {
      approved: approvedCount,
      discarded: discardedCount,
      avgResolutionHours: resolutionSamples > 0 ? Math.round((resolutionHoursSum / resolutionSamples) * 10) / 10 : null,
      topAgents: topAgents
    }
  };
}

// Presença "ativos agora": sem WebSocket/push no Apps Script, o melhor que dá
// pra fazer é heartbeat por polling. Cada TL com o dashboard aberto grava um
// registro próprio no CacheService com TTL curto (renovado a cada tick do
// polling de 60s que o loadCases() já faz); quem não renova simplesmente some
// da lista quando o TTL expira. TTL de 150s = 2.5x o intervalo de refresh, dá
// folga pra uma renovação atrasada sem o usuário sumir da lista à toa.
const TL_PRESENCE_TTL_SECONDS = 150;

function recordTLPresence() {
  const profile = assertCallerIsOverhead();
  const cache = CacheService.getScriptCache();
  cache.put(
    "tl_presence_" + profile.ldap,
    JSON.stringify({ ldap: profile.ldap, lastSeen: new Date().toISOString() }),
    TL_PRESENCE_TTL_SECONDS
  );
  return { ldap: profile.ldap };
}

// CacheService não tem como listar chaves existentes - por isso a lista de
// candidatos vem do universo finito de LDAPs de liderança na planilha People
// (mesma regra de isOverheadRoleCategory), e cache.getAll() filtra sozinho
// quem não tem heartbeat vivo no momento (chave expirada = ausente do
// resultado), sem precisar de um registro/índice separado pra manter.
function getActiveTLs() {
  assertCallerIsOverhead();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_PEOPLE);
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  const candidateKeys = [];
  for (let i = 1; i < data.length; i++) {
    const ldap = String(data[i][0] || "").toLowerCase().trim();
    if (ldap && isOverheadRoleCategory(data[i][2])) {
      candidateKeys.push("tl_presence_" + ldap);
    }
  }
  if (candidateKeys.length === 0) return [];

  const cache = CacheService.getScriptCache();
  const found = cache.getAll(candidateKeys);
  return Object.keys(found).map(key => JSON.parse(found[key]));
}
