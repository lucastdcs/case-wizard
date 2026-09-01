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
const SHEET_USER_PREFS = "User_Prefs";

// Teto de segurança para o blob de preferências. O transporte é JSONP (GET), e
// uma linha de planilha aceita bem mais do que uma URL — o limite real está no
// caminho, não na célula. Com 8 atalhos o blob fica na casa de 1 KB.
const USER_PREFS_MAX_BYTES = 8000;

// ---------------------------------------------------------------------------
// AMBIENTE DA IMPLANTAÇÃO
//
// Produção e desenvolvimento são duas IMPLANTAÇÕES do mesmo projeto Apps
// Script (ver docs/decisions/0004-implantacoes-apps-script-por-branch.md). O
// código é idêntico nas duas - o que difere é qual delas atendeu a chamada.
//
// `ScriptApp.getService().getUrl()` devolve a URL da implantação que está
// servindo ESTA requisição, e cada implantação tem a sua. É por isso que o
// dashboard descobre o ambiente sozinho, em vez de confiar numa constante
// compilada: uma constante repetiria o que alguém digitou, e o que se quer
// provar aqui é justamente que o roteamento está certo.
//
// Ressalva importante, já registrada em BAU_Alerts.js: em contexto de GATILHO
// DE TEMPO essa chamada pode devolver a URL de outra implantação. Por isso
// esta função só é usada no caminho de doGet (requisição web), nunca em
// gatilho.
const CW_DEPLOYMENTS = {
  // Precisa bater com o mapa DEPLOYMENTS de src/modules/shared/data-service.js
  // e com os DEPLOYMENT_ID do .github/workflows/deploy.yml. Ao rotacionar uma
  // implantação, os três mudam juntos.
  production: 'AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg',
  development: 'AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA',
};

/**
 * Descobre em qual implantação este request está rodando.
 *
 * @returns {{env: string, isDev: boolean, fingerprint: string}}
 *   `env` é 'production', 'development' ou 'unknown'. 'unknown' aparece se a
 *   URL não casar com nenhum dos IDs conhecidos - o caso de uma implantação
 *   nova que ninguém registrou aqui. Mostrar 'unknown' é melhor que assumir
 *   produção: um ambiente não identificado é exatamente o que se quer ver.
 */
function getDeploymentEnv() {
  var url = '';
  try {
    url = ScriptApp.getService().getUrl() || '';
  } catch (err) {
    // Sem contexto de web app (execução manual no editor, por exemplo).
    return { env: 'unknown', isDev: true, fingerprint: '------' };
  }

  for (var env in CW_DEPLOYMENTS) {
    var id = CW_DEPLOYMENTS[env];
    if (url.indexOf(id) !== -1) {
      return { env: env, isDev: env !== 'production', fingerprint: id.slice(-6) };
    }
  }

  // Extrai o ID da própria URL para que o selo mostre ALGO comparável mesmo
  // sem casar com o mapa - é essa string que denuncia qual implantação
  // desconhecida respondeu.
  var m = url.match(/\/s\/([^\/]+)\//);
  return {
    env: 'unknown',
    isDev: true,
    fingerprint: m ? m[1].slice(-6) : '------',
  };
}

/**
 * HTML do selo de ambiente, ou string vazia em produção.
 *
 * Fica montado aqui, e não repetido dentro de cada dashboard, para que os dois
 * não possam divergir - mesma razão pela qual os wizards do frontend passaram
 * a dividir uma casca só.
 *
 * Em PRODUÇÃO não devolve nada: a decisão foi não pôr chrome extra na tela de
 * quem está trabalhando. Quem precisa confirmar produção compara o sufixo em
 * Configurações → Diagnóstico, no app.
 *
 * Chip flutuante no canto inferior esquerdo, de propósito: uma faixa no topo
 * empurraria o layout dos dois dashboards, e o canto não disputa espaço com a
 * topnav nem com os cards.
 */
function buildEnvBadgeHtml(info) {
  if (!info.isDev) return '';

  var desconhecido = info.env === 'unknown';
  // Vermelho para implantação não reconhecida - esse caso merece mais alarme
  // que "estou em dev", porque significa que alguém publicou de um lugar que
  // este código não conhece.
  var fundo = desconhecido ? '#FCE8E6' : '#FEF7E0';
  var borda = desconhecido ? '#F5C6C1' : '#FEEFC3';
  var texto = desconhecido ? '#C5221F' : '#B06000';
  var rotulo = desconhecido ? 'IMPLANTAÇÃO DESCONHECIDA' : 'DESENVOLVIMENTO';

  return '' +
    '<div id="cw-env-banner" role="status" style="' +
      'position:fixed; left:16px; bottom:16px; z-index:99999;' +
      'display:flex; align-items:center; gap:8px;' +
      'padding:8px 14px; border-radius:100px;' +
      'background:' + fundo + '; border:1px solid ' + borda + '; color:' + texto + ';' +
      'font-family:\'Google Sans\', Roboto, sans-serif; font-size:11px; font-weight:700;' +
      'letter-spacing:0.6px; box-shadow:0 2px 10px rgba(0,0,0,0.12); pointer-events:none;' +
    '">' +
      '<span>' + rotulo + '</span>' +
      '<span style="font-family:ui-monospace, monospace; font-weight:600; opacity:0.85;">' +
        '…' + info.fingerprint +
      '</span>' +
    '</div>';
}

/**
 * Serve um dashboard já com o selo de ambiente injetado.
 *
 * Usa createTemplateFromFile (e não createHtmlOutputFromFile) só por causa
 * dessa injeção. Os dois HTML não contêm nenhuma sequência `<?`, então passar
 * pelo avaliador de template é seguro - se um dia passarem a conter, é aqui
 * que vai quebrar.
 */
function renderDashboard(fileName, title) {
  var info = getDeploymentEnv();
  var template = HtmlService.createTemplateFromFile(fileName);

  // Consumido por <?!= CW_ENV_BADGE ?> logo depois do <body> de cada dashboard.
  template.CW_ENV_BADGE = buildEnvBadgeHtml(info);

  return template.evaluate()
    .setTitle(title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doGet(e) {
  // Fallback para testes manuais
  if (!e) e = { parameter: { op: 'broadcast' } };
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const p = e.parameter;
  const op = p.op || 'broadcast';
  const callback = p.callback;

  if (e.parameter.page === 'tl') {
    return renderDashboard('TLDashboard', 'Cases Wizard | Visão TL');
  }

  // Central de Conteúdo - página própria, deliberadamente fora do TLDashboard:
  // aquele arquivo já é monolítico, e o dashboard de TL é um braço do processo
  // de casos, não o lugar de gerenciar o conteúdo do produto inteiro.
  // Quem não tem papel em Content_Access vê a tela responder "sem acesso" -
  // o gate real é por ação, no ContentAPI.gs.
  if (e.parameter.page === 'content') {
    return renderDashboard('ContentDashboard', 'Cases Wizard | Central de Conteúdo');
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
      // Mesma situação do 'tips' logo abaixo: rota legada, mantida viva porque
      // bundles antigos em cache ainda a chamam, mas servindo o conteúdo da
      // Central em vez da aba Broadcast.
      result = { broadcast: getBroadcastForLegacyEndpoint(ss) };
    }
    else if (op === 'tips') {
      // Rota legada, mantida viva porque bundles antigos em cache ainda a
      // chamam. Depois da migração ela serve o conteúdo da Central, e não mais
      // a aba Tips - assim as duas versões do app leem a MESMA fonte, e editar
      // pela Central vale para todo mundo durante a transição.
      result = { tips: getTipsForLegacyEndpoint(ss) };
    }

    // 5. MÓDULO: Escrita de avisos — REMOVIDO.
    //
    // new_broadcast, update_broadcast e delete_broadcast saíram daqui: o
    // controle de avisos vive na Central de Conteúdo (publishContentDirect /
    // unpublishContentDirect em ContentAPI.gs), chamada pela tela da Central
    // via google.script.run, com identidade do servidor e papel verificado.
    //
    // Estas rotas eram escrita por URL pública: quem descobrisse o endereço do
    // web app publicava um aviso para toda a operação, sem papel nenhum. O
    // único controle era o botão só aparecer para quem estava na lista ADMINS
    // do bundle — uma checagem de front, do lado errado da fronteira.
    //
    // A leitura (`op=broadcast`, logo acima) continua pública de propósito: é
    // como o app do agente recebe os avisos.

    // 7. MÓDULO: Central de Conteúdo (leitura pública)
    // Só devolve itens com status 'live'. Não existe parâmetro de status aqui
    // de propósito: conteúdo em revisão não tem rota de leitura nenhuma.
    else if (op === 'content_public') {
      result = handleContentPublicRead(p);
    }

    // 8. MÓDULO: Preferências do agente (blob JSON, uma linha por pessoa)
    // Hoje guarda os atalhos do Ctrl+K; nasceu genérico de propósito para que
    // som, idioma e ordem da pílula possam migrar pra cá sem novo backend.
    // Ver docs/decisions/0002-atalhos-ctrl-k-por-agente.md.
    else if (op === 'get_user_prefs') {
      result = handleGetUserPrefs(ss, p);
    }
    else if (op === 'save_user_prefs') {
      result = handleSaveUserPrefs(ss, p);
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

// ---------------------------------------------------------
//  PREFERÊNCIAS DO AGENTE (aba User_Prefs)
// ---------------------------------------------------------
// Uma linha por pessoa, um blob JSON. Diferente de Database_Snippets, que é
// uma lista de itens, aqui o registro inteiro é substituído a cada escrita -
// o cliente sempre manda o estado completo das preferências dele.

function handleGetUserPrefs(ss, p) {
  const userEmail = String(p.user || "").toLowerCase().trim();
  if (!userEmail) throw new Error("User email required");

  const sheet = getOrCreateSheet(ss, SHEET_USER_PREFS);
  const rowIndex = findUserPrefsRow(sheet, userEmail);
  if (rowIndex < 0) return { status: 'success', prefs: {} };

  const raw = sheet.getRange(rowIndex, 2).getValue();
  let prefs = {};
  try {
    prefs = raw ? JSON.parse(raw) : {};
  } catch (e) {
    // Blob corrompido não pode travar o agente fora das próprias preferências:
    // devolve vazio (o cliente segue com o cache local) e registra o caso.
    Logger.log("User_Prefs ilegível para " + userEmail + ": " + e);
    prefs = {};
  }
  return { status: 'success', prefs: prefs };
}

function handleSaveUserPrefs(ss, p) {
  const userEmail = String(p.user || "").toLowerCase().trim();
  if (!userEmail) throw new Error("User email required");

  const raw = String(p.prefs || "");
  if (raw.length > USER_PREFS_MAX_BYTES) throw new Error("Preferences payload too large");

  // Valida antes de gravar: um blob inválido só apareceria como erro na
  // PRÓXIMA sessão do agente, longe da causa.
  let parsed;
  try {
    parsed = JSON.parse(raw || "{}");
  } catch (e) {
    throw new Error("Preferences payload is not valid JSON");
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error("Preferences payload must be an object");
  }

  const sheet = getOrCreateSheet(ss, SHEET_USER_PREFS);
  const timestamp = new Date().toISOString();
  const rowIndex = findUserPrefsRow(sheet, userEmail);

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 2).setValue(raw);
    sheet.getRange(rowIndex, 3).setValue(timestamp);
    return { status: 'success', action: 'update' };
  }

  sheet.appendRow([userEmail, raw, timestamp]);
  return { status: 'success', action: 'create' };
}

// A chave aqui é o e-mail (coluna 1), não um ID gerado - por isso não dá pra
// reusar findRowIndexById().
function findUserPrefsRow(sheet, userEmail) {
  if (!sheet) return -1;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase().trim() === userEmail) return i + 1;
  }
  return -1;
}

// Regra de permissão (Overhead) compartilhada entre getUserProfileByLdap() e
// getActiveTLs() - qualquer roleCategory que não seja Agent/Apprentice é
// considerada liderança. Extraída pra um só lugar pra não divergir entre os
// dois pontos que hoje decidem "quem é TL".
function isOverheadRoleCategory(roleCategory) {
  const catLower = String(roleCategory || "").toLowerCase();
  return !(catLower.includes('agent') || catLower.includes('apprentice'));
}

// Idioma padrão derivado do segmento da planilha People. Mesma extração de
// isOverheadRoleCategory() e pelo mesmo motivo: a aba "Pessoas" da Central
// mostra ao TL qual idioma o segmento digitado vai produzir ANTES de ele
// salvar, e uma segunda cópia dessa regra faria a tela prometer um idioma e o
// app entregar outro - divergência que ninguém veria, porque as duas telas
// nunca aparecem juntas.
function defaultLanguageForSegment(segment) {
  const segLower = String(segment || "").toLowerCase().trim();
  if (segLower === 'es') return "ES";
  if (segLower === 'en') return "EN";
  return "PT-BR";
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
        const lang = defaultLanguageForSegment(segment);

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
    } else if (name === SHEET_USER_PREFS) {
      sheet.appendRow(["User_Email", "Prefs_JSON", "LastUpdated"]);
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