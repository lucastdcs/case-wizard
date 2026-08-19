// =========================================================
// ARQUIVO: Code.gs (Ponto de Entrada / Router)
// TechSol Backend API v6.0 (User Snippets + Analytics + SME Escalations)
// =========================================================

const SHEET_BROADCAST = "Broadcast";
const SHEET_LOGS = "Logs";
const SHEET_TIPS = "Tips";
const SHEET_SNIPPETS = "Database_Snippets";
const SHEET_BAU_FORM = "BAU_form_data"; 
const SHEET_PEOPLE = "People";

function doGet(e) {
  // Fallback para testes manuais
  if (!e) e = { parameter: { op: 'broadcast' } };
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const p = e.parameter;
  const op = p.op || 'broadcast';
  const callback = p.callback;

  if (e.parameter.page === 'tl') {
    return HtmlService.createHtmlOutputFromFile('TLDashboard')
      .setTitle('Cases Wizard | Visão TL')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  // Central de Conteúdo - página própria, deliberadamente fora do TLDashboard:
  // aquele arquivo já é monolítico, e o dashboard de TL é um braço do processo
  // de casos, não o lugar de gerenciar o conteúdo do produto inteiro.
  // Quem não tem papel em Content_Access vê a tela responder "sem acesso" -
  // o gate real é por ação, no ContentAPI.gs.
  if (e.parameter.page === 'content') {
    return HtmlService.createHtmlOutputFromFile('ContentDashboard')
      .setTitle('Cases Wizard | Central de Conteúdo')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  
  
  let result = {};

  try {
    // ---------------------------------------------------------
    //  ROTEAMENTO DE MÓDULOS
    // ---------------------------------------------------------
    
    // 1. MÓDULO: BAU Escalation (Delega para BAULogic.gs)
    if (op === 'create_bau') {
      result = handleBAUEscalation(ss, p); // O que já temos
    } 
    else if (op === 'read_agent_bau') {
      result = getAgentCases(ss, p.user); // NOVO: Traz os casos do agente
    } 
    else if (op === 'update_bau') {
      result = update_bau_case(ss, p); // NOVO: Edita um caso
    } 
    else if (op === 'delete_bau') {
      result = deleteBAUCase(ss, p); // NOVO: Cancela um caso
    }

    // 2. MÓDULO: User Snippets (Perfil de Usuário)
    else if (op === 'get_user_snippets') {
      const userEmail = (p.user || "").toLowerCase().trim();
      if (!userEmail) throw "User email required";

      const sheet = getOrCreateSheet(ss, SHEET_SNIPPETS);
      const data = sheet.getDataRange().getValues();
      const snippets = [];

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (String(row[1]).toLowerCase() === userEmail && row[6] === true) {
          snippets.push({
            id: row[0],
            type: row[2],
            title: row[3],
            content: row[4],
            updated: row[5],
            subject: row[7] || "",   
            isCode: row[8] || false,
            isRich: row[9] || false
          });
        }
      }
      result = { status: 'success', snippets: snippets };
    }

    else if (op === 'save_snippet') {
      const sheet = getOrCreateSheet(ss, SHEET_SNIPPETS);
      const userEmail = (p.user || "").toLowerCase().trim();
      const id = p.id || ("snp_" + new Date().getTime());
      
      const rowIndex = findRowIndexById(sheet, id);
      const timestamp = new Date().toISOString();

      if (rowIndex > 0) {
        const currentOwner = String(sheet.getRange(rowIndex, 2).getValue()).toLowerCase();
        if (currentOwner !== userEmail) throw "Permission denied";

        if(p.title) sheet.getRange(rowIndex, 4).setValue(p.title);
        if(p.content) sheet.getRange(rowIndex, 5).setValue(p.content);
        sheet.getRange(rowIndex, 6).setValue(timestamp); 
        sheet.getRange(rowIndex, 7).setValue(true); 
        
        sheet.getRange(rowIndex, 8).setValue(p.subject || '');
        sheet.getRange(rowIndex, 9).setValue(p.isCode === 'true' || p.isCode === true); 
        sheet.getRange(rowIndex, 10).setValue(p.isRich === 'true' || p.isRich === true);

        result = { status: 'success', action: 'update', id: id };
      } else {
        sheet.appendRow([
          id, 
          userEmail, 
          p.type || 'general', 
          p.title || 'Sem título', 
          p.content || '', 
          timestamp, 
          true,
          p.subject || '', 
          p.isCode === 'true' || p.isCode === true,
          p.isRich === 'true' || p.isRich === true
        ]);
        result = { status: 'success', action: 'create', id: id };
      }
    }

    else if (op === 'delete_snippet') {
      const sheet = getOrCreateSheet(ss, SHEET_SNIPPETS);
      const userEmail = (p.user || "").toLowerCase().trim();
      const rowIndex = findRowIndexById(sheet, p.id);

      if (rowIndex > 0) {
        const currentOwner = String(sheet.getRange(rowIndex, 2).getValue()).toLowerCase();
        if (currentOwner !== userEmail) throw "Permission denied";

        sheet.deleteRow(rowIndex); 
        result = { status: 'success', action: 'delete' };
      } else {
        result = { status: 'error', msg: 'ID not found' };
      }
    }

    // 3. MÓDULO: Analytics (Logs)
    else if (op === 'log') {
      handleLog(p);
      result = { status: 'logged' };
    }

    // 4. MÓDULO: Leitura (Broadcast/Tips Legado)
    else if (op === 'broadcast') {
      const sheet = ss.getSheetByName(SHEET_BROADCAST);
      let data = getSheetData(sheet);
      data.reverse();
      result = { broadcast: data };
    }
    else if (op === 'tips') {
      // Rota legada, mantida viva porque bundles antigos em cache ainda a
      // chamam. Depois da migração ela serve o conteúdo da Central, e não mais
      // a aba Tips - assim as duas versões do app leem a MESMA fonte, e editar
      // pela Central vale para todo mundo durante a transição.
      result = { tips: getTipsForLegacyEndpoint(ss) };
    }

    // 5. MÓDULO: Escrita (Broadcast Admin)
    else if (op === 'new_broadcast') {
       const sheet = ss.getSheetByName(SHEET_BROADCAST);
       const newId = p.id || ("msg_" + new Date().getTime());
       const newDate = p.date || new Date().toISOString();
       sheet.appendRow([newId, newDate, p.type || 'info', p.title || 'Sem título', p.text || '', p.author || 'Anon', true]);
       result = { status: 'success', action: 'create', id: newId };
    }
    else if (op === 'update_broadcast') {
       const sheet = ss.getSheetByName(SHEET_BROADCAST);
       const rowIndex = findRowIndexById(sheet, p.id);
       if (rowIndex > 0) {
         if(p.type) sheet.getRange(rowIndex, 3).setValue(p.type);
         if(p.title) sheet.getRange(rowIndex, 4).setValue(p.title);
         if(p.text) sheet.getRange(rowIndex, 5).setValue(p.text);
         result = { status: 'success', action: 'update' };
       } else { result = { status: 'error', msg: 'ID not found' }; }
    }
    else if (op === 'delete_broadcast') {
       const sheet = ss.getSheetByName(SHEET_BROADCAST);
       const rowIndex = findRowIndexById(sheet, p.id);
       if (rowIndex > 0) {
         sheet.getRange(rowIndex, 7).setValue(false);
         result = { status: 'success', action: 'delete' };
       } else { result = { status: 'error', msg: 'ID not found' }; }
    }
    // 7. MÓDULO: Central de Conteúdo (leitura pública)
    // Só devolve itens com status 'live'. Não existe parâmetro de status aqui
    // de propósito: conteúdo em revisão não tem rota de leitura nenhuma.
    else if (op === 'content_public') {
      result = handleContentPublicRead(p);
    }

    // 6. MÓDULO: Perfil de Usuário e Permissões (LDAP)
    else if (op === 'get_user_profile') {
      const userEmail = p.user || "";
      const ldap = (p.ldap || userEmail.split('@')[0]).toLowerCase().trim();

      if (!ldap) throw new Error("LDAP/User is required");

      result = { status: 'success', profile: getUserProfileByLdap(ldap) };
    }

  } catch (err) {
    result = { status: 'error', error: err.toString() };
  }

  // ---------------------------------------------------------
  //  RETORNO (JSONP ou JSON simples)
  // ---------------------------------------------------------
  const json = JSON.stringify(result);
  if (callback) {
    return ContentService.createTextOutput(`${callback}(${json})`).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// =========================================================
//  FUNÇÕES AUXILIARES (HELPERS)
// =========================================================

// Regra de permissão (Overhead) compartilhada entre getUserProfileByLdap() e
// getActiveTLs() - qualquer roleCategory que não seja Agent/Apprentice é
// considerada liderança. Extraída pra um só lugar pra não divergir entre os
// dois pontos que hoje decidem "quem é TL".
function isOverheadRoleCategory(roleCategory) {
  const catLower = String(roleCategory || "").toLowerCase();
  return !(catLower.includes('agent') || catLower.includes('apprentice'));
}

// Busca o perfil (papel/segmento/permissão) de um LDAP na planilha "People".
// Extraído do handler de 'get_user_profile' para poder ser reaproveitado
// pela checagem de permissão (assertCallerIsOverhead).
function getUserProfileByLdap(ldap) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_PEOPLE);

  // Objeto de fallback super restrito (caso o LDAP não esteja na planilha)
  let profile = {
    ldap: ldap,
    role: "Unknown",
    roleCategory: "Agent", // Por segurança, desconhecidos são tratados como Agentes (sem admin)
    segment: "PT",
    defaultLanguage: "PT-BR",
    isOverhead: false
  };

  if (sheet) {
    const data = sheet.getDataRange().getValues();

    // Pula o cabeçalho (i=1) e varre a lista
    for (let i = 1; i < data.length; i++) {
      const rowLdap = String(data[i][0]).toLowerCase().trim();

      if (rowLdap === ldap) {
        const role = String(data[i][1] || "").trim();
        const roleCategory = String(data[i][2] || "").trim();
        const segment = String(data[i][3] || "").trim();

        // Regra 1: Permissões (Overhead). Bloqueia APENAS Agent e Apprentice.
        const isOverhead = isOverheadRoleCategory(roleCategory);

        // Regra 2: Idiomas. Staff = PT. PT = PT. ES = ES.
        let lang = "PT-BR"; // Padrão
        const segLower = segment.toLowerCase();
        if (segLower === 'es') {
          lang = "ES";
        } else if (segLower === 'en') {
          lang = "EN";
        }

        profile = {
          ldap: ldap,
          role: role,                 // Capturado exato para a futura Badge
          roleCategory: roleCategory,
          segment: segment,
          defaultLanguage: lang,
          isOverhead: isOverhead
        };
        break; // Achou o usuário, para o loop
      }
    }
  }

  return profile;
}

// Garante que quem está chamando (identidade real, vinda de Session.getActiveUser(),
// não de um parâmetro enviado pelo cliente) tem papel de liderança (isOverhead).
// Lança erro se não tiver — para ser usada no início de ações restritas ao TL,
// chamadas via google.script.run a partir do TLDashboard.html.
function assertCallerIsOverhead() {
  const email = Session.getActiveUser().getEmail();
  const ldap = email ? email.split('@')[0].toLowerCase().trim() : "";

  if (!ldap) {
    throw new Error("Não foi possível identificar o usuário autenticado.");
  }

  const profile = getUserProfileByLdap(ldap);
  if (!profile.isOverhead) {
    throw new Error("Acesso negado: esta ação é restrita à liderança (TL).");
  }

  return profile;
}

function handleLog(p) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_LOGS);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_LOGS);
    sheet.appendRow(["Timestamp", "User", "Version", "Category", "Action", "Label", "Value"]);
  }

  sheet.appendRow([
    new Date(),
    p.user || 'anon',
    p.version || '-',
    p.category || 'Geral',
    p.action || '-',
    p.label || '',
    p.value || ''
  ]);
}

function getOrCreateSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    // Cria cabeçalhos apropriados se a aba for nova
    if (name === SHEET_SNIPPETS) {
      sheet.appendRow(["ID", "User_LDAP", "Type", "Title", "Content", "LastUpdated", "Active", "Subject", "isCode", "isRich"]);
    } else if (name === SHEET_BAU_FORM) {
      // Cabeçalhos para a fila de Escalação BAU
      sheet.appendRow([
        "ID", "Timestamp", "Agent_Email", "Status", "Case_ID", "CID", "Speakeasy_ID",
        "Adv_Name", "Adv_Email", "Website", "Timezone", "Language", "AM_Name",
        "Sales_Program", "Reason", "Task_Type", "Description", "Availability"
      ]);
    }
  }
  return sheet;
}

// Garante que a planilha BAU_form_data tenha as 3 colunas de trilha de
// auditoria (quem processou, quando, e qual decisão) além das 18 colunas
// originais do formulário. Idempotente - chamada em todo write/read que
// depende delas, pra planilhas antigas (já em produção) ganharem as colunas
// sozinhas na primeira chamada, sem precisar de migração manual.
const BAU_HISTORY_HEADERS = ["Processed_By", "Processed_At", "Processed_Action"];
const BAU_HISTORY_FIRST_COL = 19;

function ensureBAUHistoryColumns(sheet) {
  const neededCols = BAU_HISTORY_FIRST_COL - 1 + BAU_HISTORY_HEADERS.length;
  const currentMaxCols = sheet.getMaxColumns();
  if (currentMaxCols < neededCols) {
    sheet.insertColumnsAfter(currentMaxCols, neededCols - currentMaxCols);
  }

  const headerRange = sheet.getRange(1, BAU_HISTORY_FIRST_COL, 1, BAU_HISTORY_HEADERS.length);
  const existing = headerRange.getValues()[0];
  const missing = existing.some(v => !v);
  if (missing) headerRange.setValues([BAU_HISTORY_HEADERS]);
}

function findRowIndexById(sheet, id) {
  if (!sheet) return -1;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) return i + 1; 
  }
  return -1;
}

function getSheetData(sheet) {
  if(!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const valActive = String(row[6]).toUpperCase().trim();
    if ((valActive === 'TRUE' || valActive === '1') && row[0]) {
      let type = String(row[2]).toLowerCase().trim();
      if (type.includes('alerta') || type.includes('critical')) type = 'critical';
      else if (type.includes('sucesso')) type = 'success';
      else type = 'info';
      data.push({
        id: String(row[0]).trim(),
        date: (row[1] instanceof Date) ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss") : String(row[1]),
        type: type,
        title: row[3] || '',
        text: row[4] || '',
        author: row[5] || 'Sistema'
      });
    }
  }
  return data;
}