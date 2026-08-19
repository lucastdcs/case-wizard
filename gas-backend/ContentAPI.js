// =========================================================
// ARQUIVO: ContentAPI.gs (Central de Conteúdo)
// Fase 0 (fundação + controle de acesso) e Fase 1 (Links).
//
// Regra central do módulo: o app em produção só enxerga linhas de
// Content_Items com status 'live'. Rascunho e proposta pendente vivem
// exclusivamente em Content_Drafts, numa aba que a leitura pública nunca
// toca - a barreira é estrutural, não uma regra de UI que dê pra burlar
// chamando o endpoint na mão.
// =========================================================

const SHEET_CONTENT_ITEMS = "Content_Items";
const SHEET_CONTENT_DRAFTS = "Content_Drafts";
const SHEET_CONTENT_ACCESS = "Content_Access";

// Módulos gerenciáveis. Adicionar um módulo novo é acrescentar uma string
// aqui - não uma aba nova, que é justamente a dívida que Tips/Broadcast/
// Database_Snippets acumularam ao ganhar cada um seu próprio schema.
const CONTENT_MODULES = ['links', 'call_script', 'email_template', 'case_note_snippet'];

// Idiomas aceitos na coluna `lang`. 'ALL' = vale para todos (caso dos links,
// cujo par PT/ES mora no próprio valor do item).
const CONTENT_LANGS = ['ALL', 'PT', 'ES', 'EN'];

const CONTENT_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  LIVE: 'live',
  ARCHIVED: 'archived'
};

// Matriz de papéis. É o ponto de partida: quem entra em Content_Access recebe
// um destes papéis, e o ADMIN ajusta a lista de pessoas pela aba "Acessos" da
// tela sem precisar de deploy novo.
const CONTENT_ROLES = {
  ADMIN: {
    propose: CONTENT_MODULES,
    approve: true,
    manageAccess: true,
    // Única exceção à regra de "não aprova a própria proposta": hoje o ADMIN é
    // o único papel ativo, e travar o próprio fluxo não protegeria ninguém.
    // A aprovação continua indo pro log como qualquer outra.
    selfApprove: true
  },
  TL: {
    propose: CONTENT_MODULES,
    approve: true,
    manageAccess: false,
    selfApprove: false
  },
  QA: {
    propose: ['call_script', 'case_note_snippet'],
    approve: false,
    manageAccess: false,
    selfApprove: false
  },
  WFM: {
    propose: ['links'],
    approve: false,
    manageAccess: false,
    selfApprove: false
  }
};

// Semente de acesso: sem isso a tela nasce inacessível para todo mundo,
// inclusive para quem precisa cadastrar os demais.
const CONTENT_BOOTSTRAP_ADMIN = 'lucaste';

// TTL da trava de edição de rascunho. O Sheets não tem lock por linha, então
// a trava é cooperativa: expira sozinha pra nunca deixar um item preso caso
// alguém feche a aba no meio da edição.
const CONTENT_LOCK_TTL_MS = 10 * 60 * 1000;

// `Lineage` é a identidade estável do item ao longo das versões - o `ID` muda a
// cada publicação (cada versão é uma linha nova) e `Key` não serve: em links
// `Key` é a categoria, compartilhada por dezenas de itens. Sem essa coluna, um
// rollback arquivaria a categoria inteira em vez de um link só.
const CONTENT_ITEMS_HEADERS = [
  "ID", "Module", "Key", "Field", "Lang", "Label", "Value",
  "Version", "Status", "Published_By", "Published_At", "Sort_Order", "Lineage"
];

const CONTENT_DRAFTS_HEADERS = [
  "Draft_ID", "Item_ID", "Module", "Key", "Field", "Lang", "Label", "Value",
  "Status", "Proposed_By", "Proposed_At", "Reviewed_By", "Reviewed_At",
  "Review_Note", "Locked_By", "Locked_At", "Sort_Order", "Action"
];

// O que a proposta faz com o item quando aprovada. Coluna explícita em vez de
// inferir pelo valor vazio: "tirar do ar" e "publicar um valor em branco" são
// intenções diferentes, e adivinhar erraria uma das duas.
const CONTENT_ACTIONS = {
  UPSERT: 'upsert',
  REMOVE: 'remove'
};

const CONTENT_ACCESS_HEADERS = ["LDAP", "Role", "Active", "Granted_By", "Granted_At"];

// =========================================================
//  INFRAESTRUTURA (abas)
// =========================================================

function getContentSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === SHEET_CONTENT_ITEMS) sheet.appendRow(CONTENT_ITEMS_HEADERS);
    else if (name === SHEET_CONTENT_DRAFTS) sheet.appendRow(CONTENT_DRAFTS_HEADERS);
    else if (name === SHEET_CONTENT_ACCESS) {
      sheet.appendRow(CONTENT_ACCESS_HEADERS);
      // Semeia o ADMIN inicial junto com a aba, pra tela nunca nascer trancada.
      sheet.appendRow([CONTENT_BOOTSTRAP_ADMIN, 'ADMIN', true, 'system', new Date().toISOString()]);
    }
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// Converte a aba inteira em objetos chaveados pelo header, pra nenhum handler
// depender de índice numérico de coluna (a fragilidade que o schema do
// BAU_form_data já cobra caro hoje).
function readContentRows_(sheetName) {
  const sheet = getContentSheet_(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(function (h) { return String(h).trim(); });
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const obj = { _row: i + 1 };
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = values[i][c];
    }
    rows.push(obj);
  }

  return rows;
}

function findContentRow_(sheetName, idHeader, id) {
  const rows = readContentRows_(sheetName);
  const target = String(id || "").trim();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][idHeader]).trim() === target) return rows[i];
  }
  return null;
}

function contentNow_() {
  return new Date().toISOString();
}

// Utilities.getUuid() em vez de timestamp + aleatório: a semeadura cria dezenas
// de linhas dentro do mesmo milissegundo, e sortear 60 números em 1000 valores
// colide com folga (~5 repetidos, medido no teste). ID repetido é grave aqui
// porque findContentRow_() devolve a primeira linha que casa - editar um item
// acabaria editando outro.
function newContentId_(prefix) {
  return prefix + "_" + Utilities.getUuid();
}

// =========================================================
//  IDENTIDADE E PERMISSÃO
// =========================================================

// Identidade sempre do servidor. Nenhum handler aceita LDAP por parâmetro:
// é o mesmo princípio já aplicado em assertCallerIsOverhead() no Código.js -
// quem chama não escolhe quem é.
function getCallerLdap_() {
  const email = Session.getActiveUser().getEmail();
  const ldap = email ? email.split('@')[0].toLowerCase().trim() : "";
  if (!ldap) throw new Error("Não foi possível identificar o usuário autenticado.");
  return ldap;
}

function getContentRoleForLdap_(ldap) {
  const rows = readContentRows_(SHEET_CONTENT_ACCESS);
  const target = String(ldap || "").toLowerCase().trim();

  for (let i = 0; i < rows.length; i++) {
    const rowLdap = String(rows[i].LDAP || "").toLowerCase().trim();
    const active = String(rows[i].Active).toUpperCase().trim();

    if (rowLdap === target && (active === 'TRUE' || active === '1')) {
      const role = String(rows[i].Role || "").toUpperCase().trim();
      if (CONTENT_ROLES[role]) return role;
    }
  }

  return null; // Sem linha ativa = sem acesso. Não há papel padrão.
}

// Sessão da tela: papel + o que ele pode fazer. O front usa isso pra decidir o
// que renderizar, mas cada ação é revalidada no servidor - a UI é conveniência,
// não a fronteira de segurança.
function getContentSession() {
  const ldap = getCallerLdap_();
  const role = getContentRoleForLdap_(ldap);

  if (!role) {
    return { ldap: ldap, role: null, hasAccess: false };
  }

  const perms = CONTENT_ROLES[role];
  return {
    ldap: ldap,
    role: role,
    hasAccess: true,
    canApprove: perms.approve,
    canManageAccess: perms.manageAccess,
    canSelfApprove: perms.selfApprove,
    proposableModules: perms.propose,
    modules: CONTENT_MODULES,
    langs: CONTENT_LANGS
  };
}

// Porta única de todas as ações de escrita. Devolve { ldap, role, perms } pra
// quem chamou não precisar reconsultar a planilha.
function assertContentRole_(action, module) {
  const ldap = getCallerLdap_();
  const role = getContentRoleForLdap_(ldap);

  if (!role) throw new Error("Acesso negado: você não tem permissão na Central de Conteúdo.");

  const perms = CONTENT_ROLES[role];

  if (action === 'propose') {
    if (perms.propose.indexOf(module) === -1) {
      throw new Error("Acesso negado: seu papel (" + role + ") não edita o módulo '" + module + "'.");
    }
  } else if (action === 'approve') {
    if (!perms.approve) throw new Error("Acesso negado: seu papel (" + role + ") não aprova mudanças.");
  } else if (action === 'manageAccess') {
    if (!perms.manageAccess) throw new Error("Acesso negado: apenas o ADMIN gerencia acessos.");
  }

  return { ldap: ldap, role: role, perms: perms };
}

function assertValidModule_(module) {
  if (CONTENT_MODULES.indexOf(module) === -1) {
    throw new Error("Módulo desconhecido: " + module);
  }
}

// Um trecho de case note precisa apontar para um campo que a nota realmente
// tem. A tela já usa um select alimentado pelo catálogo, mas validar aqui é o
// que torna a regra real: a UI é conveniência, o servidor é a fronteira.
//
// O catálogo (CONTENT_NOTE_FIELDS) é gerado a partir do notes-data.js e vive em
// ContentFields_Notes.gs. Se por algum motivo não estiver publicado, a checagem
// é pulada em vez de travar todo o módulo - degradar é melhor que bloquear.
function assertValidNoteField_(field) {
  if (typeof CONTENT_NOTE_FIELDS === 'undefined' || !CONTENT_NOTE_FIELDS.fields) return;

  const known = CONTENT_NOTE_FIELDS.fields.some(function (f) { return f.key === field; });
  if (!known) {
    throw new Error("Campo de nota desconhecido: '" + field + "'. Escolha um campo da lista.");
  }
}

// Auditoria reaproveita a aba Logs que já existe (mesma de logEvent()), em vez
// de criar um log paralelo só deste módulo.
function logContentEvent_(ldap, action, label, value) {
  try {
    handleLog({
      user: ldap,
      version: 'content-central',
      category: 'ContentCentral',
      action: action,
      label: label,
      value: value
    });
  } catch (e) {
    // Log nunca derruba a operação principal.
  }
}

// =========================================================
//  LEITURA
// =========================================================

function mapItemRow_(row) {
  return {
    id: String(row.ID || ""),
    module: String(row.Module || ""),
    key: String(row.Key || ""),
    field: String(row.Field || ""),
    lang: String(row.Lang || "ALL"),
    label: String(row.Label || ""),
    value: String(row.Value || ""),
    version: Number(row.Version) || 1,
    status: String(row.Status || ""),
    publishedBy: String(row.Published_By || ""),
    publishedAt: String(row.Published_At || ""),
    sortOrder: Number(row.Sort_Order) || 0,
    // Linhas semeadas antes desta coluna existir caem no próprio ID, que é
    // exatamente a lineage de um item que nunca foi versionado.
    lineage: String(row.Lineage || row.ID || "")
  };
}

function mapDraftRow_(row) {
  return {
    draftId: String(row.Draft_ID || ""),
    itemId: String(row.Item_ID || ""),
    module: String(row.Module || ""),
    key: String(row.Key || ""),
    field: String(row.Field || ""),
    lang: String(row.Lang || "ALL"),
    label: String(row.Label || ""),
    value: String(row.Value || ""),
    status: String(row.Status || ""),
    proposedBy: String(row.Proposed_By || ""),
    proposedAt: String(row.Proposed_At || ""),
    reviewedBy: String(row.Reviewed_By || ""),
    reviewedAt: String(row.Reviewed_At || ""),
    reviewNote: String(row.Review_Note || ""),
    lockedBy: String(row.Locked_By || ""),
    lockedAt: String(row.Locked_At || ""),
    sortOrder: Number(row.Sort_Order) || 0,
    action: String(row.Action || CONTENT_ACTIONS.UPSERT)
  };
}

// Itens publicados de um módulo - o que a tela mostra como "no ar".
function listContentItems(module) {
  assertContentRole_('read', module);
  assertValidModule_(module);

  return readContentRows_(SHEET_CONTENT_ITEMS)
    .filter(function (r) {
      return String(r.Module).trim() === module && String(r.Status).trim() === CONTENT_STATUS.LIVE;
    })
    .map(mapItemRow_)
    .sort(function (a, b) { return a.sortOrder - b.sortOrder; });
}

// Todas as versões de um item (a linhagem), da mais nova para a mais antiga.
// Reverter não precisa de rota especial: é reaprovar uma versão que já existe.
function listContentItemHistory(lineage, module) {
  assertContentRole_('read', module);
  const target = String(lineage || "").trim();

  return readContentRows_(SHEET_CONTENT_ITEMS)
    .filter(function (r) { return String(r.Lineage || r.ID) === target; })
    .map(mapItemRow_)
    .sort(function (a, b) { return b.version - a.version; });
}

function listContentDrafts(module) {
  const session = assertContentRole_('read', module);
  const drafts = readContentRows_(SHEET_CONTENT_DRAFTS)
    .filter(function (r) {
      const st = String(r.Status).trim();
      return String(r.Module).trim() === module &&
        (st === CONTENT_STATUS.DRAFT || st === CONTENT_STATUS.PENDING);
    })
    .map(mapDraftRow_);

  // Quem não aprova só enxerga os próprios rascunhos; pendências alheias não
  // são assunto seu e poluiriam a fila.
  if (!session.perms.approve) {
    return drafts.filter(function (d) { return d.proposedBy === session.ldap; });
  }

  return drafts;
}

// Fila de revisão: tudo que está pendente, de todos os módulos.
function listPendingApprovals() {
  const session = assertContentRole_('approve', null);

  return readContentRows_(SHEET_CONTENT_DRAFTS)
    .filter(function (r) { return String(r.Status).trim() === CONTENT_STATUS.PENDING; })
    .map(mapDraftRow_)
    .map(function (d) {
      // O aprovador precisa ver o valor atual ao lado do proposto - sem isso a
      // revisão vira "confie no texto novo", que é exatamente o que o fluxo
      // de aprovação existe pra evitar.
      const current = d.itemId ? findContentRow_(SHEET_CONTENT_ITEMS, 'ID', d.itemId) : null;
      d.currentValue = current ? String(current.Value || "") : "";
      d.currentLabel = current ? String(current.Label || "") : "";
      d.isNew = !d.itemId;
      d.isSelfProposed = (d.proposedBy === session.ldap);
      d.canReview = session.perms.selfApprove || !d.isSelfProposed;
      return d;
    })
    .sort(function (a, b) { return String(a.proposedAt).localeCompare(String(b.proposedAt)); });
}

// =========================================================
//  ESCRITA (rascunho -> pendente -> aprovado)
// =========================================================

function isLockHeldByOther_(draftRow, ldap) {
  const lockedBy = String(draftRow.Locked_By || "").trim();
  if (!lockedBy || lockedBy === ldap) return false;

  const lockedAt = new Date(draftRow.Locked_At);
  if (isNaN(lockedAt.getTime())) return false;

  return (new Date().getTime() - lockedAt.getTime()) < CONTENT_LOCK_TTL_MS;
}

/**
 * Cria ou atualiza um rascunho. Nunca toca em Content_Items - é o que garante
 * que editar aqui não altera nada em produção.
 *
 * payload: { draftId?, itemId?, module, key, field?, lang, label, value, sortOrder? }
 */
function saveContentDraft(payload) {
  const p = payload || {};
  const session = assertContentRole_('propose', p.module);
  assertValidModule_(p.module);

  if (CONTENT_LANGS.indexOf(p.lang || 'ALL') === -1) {
    throw new Error("Idioma inválido: " + p.lang);
  }
  if (!String(p.label || "").trim()) {
    throw new Error("Dê um título ao item antes de salvar.");
  }
  if (p.module === 'case_note_snippet') {
    assertValidNoteField_(String(p.field || ""));
  }

  const sheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  const now = contentNow_();

  if (p.draftId) {
    const existing = findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', p.draftId);
    if (!existing) throw new Error("Rascunho não encontrado: " + p.draftId);

    if (String(existing.Status).trim() === CONTENT_STATUS.PENDING) {
      throw new Error("Este item já está em revisão. Cancele o envio antes de editar.");
    }
    if (existing.Proposed_By !== session.ldap && !session.perms.approve) {
      throw new Error("Este rascunho é de outra pessoa.");
    }
    if (isLockHeldByOther_(existing, session.ldap)) {
      throw new Error("Alguém está editando este item agora (" + existing.Locked_By + "). Tente em alguns minutos.");
    }

    const row = existing._row;
    sheet.getRange(row, 5).setValue(p.field || "");
    sheet.getRange(row, 6).setValue(p.lang || 'ALL');
    sheet.getRange(row, 7).setValue(p.label || "");
    sheet.getRange(row, 8).setValue(p.value || "");
    sheet.getRange(row, 9).setValue(CONTENT_STATUS.DRAFT);
    sheet.getRange(row, 15).setValue(session.ldap);
    sheet.getRange(row, 16).setValue(now);

    logContentEvent_(session.ldap, 'draft_update', p.module + '/' + p.key, p.draftId);
    return { status: 'success', draftId: p.draftId };
  }

  const draftId = newContentId_('drf');
  sheet.appendRow([
    draftId,
    p.itemId || "",
    p.module,
    p.key || "",
    p.field || "",
    p.lang || 'ALL',
    p.label || "",
    p.value || "",
    CONTENT_STATUS.DRAFT,
    session.ldap,
    now,
    "", "", "",
    session.ldap,
    now,
    Number(p.sortOrder) || 0,
    CONTENT_ACTIONS.UPSERT
  ]);

  logContentEvent_(session.ldap, 'draft_create', p.module + '/' + (p.key || 'novo'), draftId);
  return { status: 'success', draftId: draftId };
}

// Manda o rascunho para a fila de revisão.
function submitContentDraft(draftId) {
  const existing = findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', draftId);
  if (!existing) throw new Error("Rascunho não encontrado.");

  const session = assertContentRole_('propose', String(existing.Module).trim());

  if (existing.Proposed_By !== session.ldap && !session.perms.approve) {
    throw new Error("Este rascunho é de outra pessoa.");
  }
  if (String(existing.Status).trim() !== CONTENT_STATUS.DRAFT) {
    throw new Error("Só um rascunho pode ser enviado para revisão.");
  }

  const sheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  sheet.getRange(existing._row, 9).setValue(CONTENT_STATUS.PENDING);
  sheet.getRange(existing._row, 11).setValue(contentNow_());
  // Solta a trava: em revisão ninguém mais edita mesmo.
  sheet.getRange(existing._row, 15).setValue("");
  sheet.getRange(existing._row, 16).setValue("");

  logContentEvent_(session.ldap, 'draft_submit', String(existing.Module) + '/' + String(existing.Key), draftId);
  notifyApprovers_(existing, session.ldap);

  return { status: 'success' };
}

// Avisa quem pode aprovar. Sem isso, "pendente" pode ficar parado indefinidamente
// sem ninguém perceber - o fluxo de aprovação vira um limbo em vez de um portão.
function notifyApprovers_(draftRow, proposedBy) {
  try {
    const approvers = readContentRows_(SHEET_CONTENT_ACCESS)
      .filter(function (r) {
        const role = String(r.Role || "").toUpperCase().trim();
        const active = String(r.Active).toUpperCase().trim();
        return CONTENT_ROLES[role] && CONTENT_ROLES[role].approve && (active === 'TRUE' || active === '1');
      })
      .map(function (r) { return String(r.LDAP).trim() + "@google.com"; })
      .filter(function (mail) { return mail.indexOf(proposedBy + "@") !== 0; });

    if (!approvers.length) return;

    MailApp.sendEmail({
      to: approvers.join(","),
      subject: "📝 Central de Conteúdo: proposta aguardando revisão",
      htmlBody: "<p><strong>" + proposedBy + "</strong> propôs uma alteração em <strong>" +
        String(draftRow.Module) + "</strong> (" + String(draftRow.Label) + ").</p>" +
        "<p>Abra a Central de Conteúdo para revisar e aprovar.</p>",
      name: "Cases Wizard"
    });
  } catch (e) {
    // Falha de e-mail não pode impedir o envio para revisão.
  }
}

/**
 * Aprova uma proposta: arquiva a versão live anterior e publica a nova.
 * É o único caminho pelo qual algo chega a Content_Items com status 'live'.
 */
function approveContentDraft(draftId, note) {
  const draft = findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', draftId);
  if (!draft) throw new Error("Proposta não encontrada.");

  const session = assertContentRole_('approve', String(draft.Module).trim());

  if (String(draft.Status).trim() !== CONTENT_STATUS.PENDING) {
    throw new Error("Só propostas pendentes podem ser aprovadas.");
  }

  // A regra de não-autoaprovação, com a exceção explícita do ADMIN.
  if (String(draft.Proposed_By).trim() === session.ldap && !session.perms.selfApprove) {
    throw new Error("Você não pode aprovar a própria proposta. Peça a revisão de outra pessoa.");
  }

  const itemsSheet = getContentSheet_(SHEET_CONTENT_ITEMS);
  const now = contentNow_();
  const action = String(draft.Action || CONTENT_ACTIONS.UPSERT);
  let version = 1;
  let newItemId = "";
  let lineage = "";

  // Arquiva a versão no ar (não apaga): reverter depois é reaprovar esta linha.
  if (draft.Item_ID) {
    const current = findContentRow_(SHEET_CONTENT_ITEMS, 'ID', draft.Item_ID);
    if (current) {
      version = (Number(current.Version) || 1) + 1;
      lineage = String(current.Lineage || current.ID);
      itemsSheet.getRange(current._row, 9).setValue(CONTENT_STATUS.ARCHIVED);
    }
  }

  // Numa remoção o trabalho termina aqui: arquivar já tira do ar, porque a
  // leitura pública só enxerga 'live'. Publicar uma linha nova de valor vazio
  // deixaria um item fantasma na lista do agente.
  if (action !== CONTENT_ACTIONS.REMOVE) {
    newItemId = newContentId_('itm');
    itemsSheet.appendRow([
      newItemId,
      String(draft.Module),
      String(draft.Key),
      String(draft.Field || ""),
      String(draft.Lang || 'ALL'),
      String(draft.Label || ""),
      String(draft.Value || ""),
      version,
      CONTENT_STATUS.LIVE,
      session.ldap,
      now,
      Number(draft.Sort_Order) || 0,
      // Item novo inaugura a própria linhagem; edição herda a de quem substitui.
      lineage || newItemId
    ]);
  }

  const draftsSheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  draftsSheet.getRange(draft._row, 9).setValue(CONTENT_STATUS.APPROVED);
  draftsSheet.getRange(draft._row, 12).setValue(session.ldap);
  draftsSheet.getRange(draft._row, 13).setValue(now);
  draftsSheet.getRange(draft._row, 14).setValue(note || "");

  const selfFlag = (String(draft.Proposed_By).trim() === session.ldap) ? ' (autoaprovação ADMIN)' : '';
  logContentEvent_(
    session.ldap,
    action === CONTENT_ACTIONS.REMOVE ? 'approve_removal' : 'approve',
    String(draft.Module) + '/' + String(draft.Key) + selfFlag,
    'v' + version + ' por ' + String(draft.Proposed_By)
  );

  return { status: 'success', itemId: newItemId, version: version, action: action };
}

function rejectContentDraft(draftId, note) {
  const draft = findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', draftId);
  if (!draft) throw new Error("Proposta não encontrada.");

  const session = assertContentRole_('approve', String(draft.Module).trim());

  if (String(draft.Status).trim() !== CONTENT_STATUS.PENDING) {
    throw new Error("Só propostas pendentes podem ser rejeitadas.");
  }
  if (!String(note || "").trim()) {
    throw new Error("Explique o motivo da rejeição para quem propôs.");
  }

  const sheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  // Volta para 'draft', não some: quem propôs corrige e reenvia sem redigitar.
  sheet.getRange(draft._row, 9).setValue(CONTENT_STATUS.DRAFT);
  sheet.getRange(draft._row, 12).setValue(session.ldap);
  sheet.getRange(draft._row, 13).setValue(contentNow_());
  sheet.getRange(draft._row, 14).setValue(note);

  logContentEvent_(session.ldap, 'reject', String(draft.Module) + '/' + String(draft.Key), note);
  return { status: 'success' };
}

/**
 * Kill switch: republica uma versão arquivada sem passar pela fila de revisão.
 * Fora do fluxo normal de propósito - existe para resposta a incidente, quando
 * algo ruim passou e o custo de esperar uma segunda revisão é alto demais.
 */
function rollbackContentItem(archivedItemId) {
  const archived = findContentRow_(SHEET_CONTENT_ITEMS, 'ID', archivedItemId);
  if (!archived) throw new Error("Versão não encontrada.");

  const session = assertContentRole_('approve', String(archived.Module).trim());
  const sheet = getContentSheet_(SHEET_CONTENT_ITEMS);
  const now = contentNow_();
  const lineage = String(archived.Lineage || archived.ID);

  // Arquiva só o que estiver no ar para ESTA linhagem. Filtrar por Key aqui
  // derrubaria a categoria inteira quando o módulo usa Key como agrupador.
  readContentRows_(SHEET_CONTENT_ITEMS).forEach(function (r) {
    if (String(r.Lineage || r.ID) === lineage && String(r.Status).trim() === CONTENT_STATUS.LIVE) {
      sheet.getRange(r._row, 9).setValue(CONTENT_STATUS.ARCHIVED);
    }
  });

  const maxVersion = readContentRows_(SHEET_CONTENT_ITEMS)
    .filter(function (r) { return String(r.Lineage || r.ID) === lineage; })
    .reduce(function (acc, r) { return Math.max(acc, Number(r.Version) || 1); }, 1);

  const newItemId = newContentId_('itm');
  sheet.appendRow([
    newItemId,
    String(archived.Module),
    String(archived.Key),
    String(archived.Field || ""),
    String(archived.Lang || 'ALL'),
    String(archived.Label || ""),
    String(archived.Value || ""),
    maxVersion + 1,
    CONTENT_STATUS.LIVE,
    session.ldap,
    now,
    Number(archived.Sort_Order) || 0,
    lineage
  ]);

  logContentEvent_(
    session.ldap,
    'rollback',
    String(archived.Module) + '/' + String(archived.Key),
    'restaurou v' + (Number(archived.Version) || 1)
  );

  return { status: 'success', itemId: newItemId };
}

// Arquiva o item no ar (a tela chama isso de "tirar do ar"). Passa pela fila
// como qualquer mudança: cria um rascunho de remoção em vez de apagar direto.
function requestContentRemoval(itemId, reason) {
  const item = findContentRow_(SHEET_CONTENT_ITEMS, 'ID', itemId);
  if (!item) throw new Error("Item não encontrado.");

  const session = assertContentRole_('propose', String(item.Module).trim());
  const sheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  const now = contentNow_();
  const draftId = newContentId_('drf');

  sheet.appendRow([
    draftId,
    itemId,
    String(item.Module),
    String(item.Key),
    String(item.Field || ""),
    String(item.Lang || 'ALL'),
    "[REMOVER] " + String(item.Label || ""),
    "",
    CONTENT_STATUS.PENDING,
    session.ldap,
    now,
    "", "",
    reason || "",
    "", "",
    Number(item.Sort_Order) || 0,
    CONTENT_ACTIONS.REMOVE
  ]);

  logContentEvent_(session.ldap, 'removal_request', String(item.Module) + '/' + String(item.Key), reason || "");
  return { status: 'success', draftId: draftId };
}

// =========================================================
//  GERENCIAR ACESSOS (só ADMIN)
// =========================================================

function listContentAccess() {
  assertContentRole_('manageAccess', null);

  return readContentRows_(SHEET_CONTENT_ACCESS).map(function (r) {
    return {
      ldap: String(r.LDAP || ""),
      role: String(r.Role || "").toUpperCase(),
      active: String(r.Active).toUpperCase() === 'TRUE' || String(r.Active) === '1',
      grantedBy: String(r.Granted_By || ""),
      grantedAt: String(r.Granted_At || "")
    };
  });
}

function saveContentAccess(ldap, role, active) {
  const session = assertContentRole_('manageAccess', null);
  const targetLdap = String(ldap || "").toLowerCase().trim().split('@')[0];
  const targetRole = String(role || "").toUpperCase().trim();

  if (!targetLdap) throw new Error("Informe o LDAP da pessoa.");
  if (!CONTENT_ROLES[targetRole]) throw new Error("Papel inválido: " + role);

  // Trava de pé-na-porta: o ADMIN não pode remover a si mesmo e deixar a
  // Central sem ninguém que consiga conceder acesso de volta.
  if (targetLdap === session.ldap && active === false) {
    throw new Error("Você não pode remover o próprio acesso de ADMIN.");
  }

  const sheet = getContentSheet_(SHEET_CONTENT_ACCESS);
  const existing = findContentRow_(SHEET_CONTENT_ACCESS, 'LDAP', targetLdap);
  const isActive = (active !== false);

  if (existing) {
    sheet.getRange(existing._row, 2).setValue(targetRole);
    sheet.getRange(existing._row, 3).setValue(isActive);
    sheet.getRange(existing._row, 4).setValue(session.ldap);
    sheet.getRange(existing._row, 5).setValue(contentNow_());
  } else {
    sheet.appendRow([targetLdap, targetRole, isActive, session.ldap, contentNow_()]);
  }

  logContentEvent_(session.ldap, 'access_change', targetLdap, targetRole + (isActive ? ' ativo' : ' inativo'));
  return { status: 'success' };
}

// =========================================================
//  LEITURA PÚBLICA (consumida pelo bookmarklet via JSONP)
// =========================================================

// Único ponto de leitura aberto ao app do agente. Devolve apenas 'live' - e não
// aceita nenhum parâmetro de status, para não existir sequer a possibilidade de
// alguém pedir o conteúdo pendente pela URL.
function handleContentPublicRead(p) {
  const module = String((p && p.module) || "").trim();
  assertValidModule_(module);

  const items = readContentRows_(SHEET_CONTENT_ITEMS)
    .filter(function (r) {
      return String(r.Module).trim() === module && String(r.Status).trim() === CONTENT_STATUS.LIVE;
    })
    .map(mapItemRow_)
    .sort(function (a, b) { return a.sortOrder - b.sortOrder; });

  return { status: 'success', module: module, items: items };
}

// =========================================================
//  SEMEADURA (Fase 1: migra o LINKS_DB hardcoded para a planilha)
// =========================================================

/**
 * Publica direto em Content_Items, sem passar pela fila. É migração de conteúdo
 * que já está em produção hoje (o LINKS_DB do bundle), não mudança nova - por
 * isso não há o que revisar. Roda uma vez; chamadas seguintes não duplicam.
 *
 * payload: JSON string { module, items: [{ key, field?, lang?, label, value, sortOrder? }] }
 */
function seedContentModule(payloadJson) {
  const session = assertContentRole_('approve', null);
  const payload = (typeof payloadJson === 'string') ? JSON.parse(payloadJson) : payloadJson;
  const module = String(payload.module || "").trim();

  assertValidModule_(module);
  assertContentRole_('propose', module);

  const existing = readContentRows_(SHEET_CONTENT_ITEMS).filter(function (r) {
    return String(r.Module).trim() === module && String(r.Status).trim() === CONTENT_STATUS.LIVE;
  });

  if (existing.length) {
    return { status: 'skipped', reason: 'Módulo já semeado (' + existing.length + ' itens no ar).' };
  }

  const sheet = getContentSheet_(SHEET_CONTENT_ITEMS);
  const now = contentNow_();
  const rows = (payload.items || []).map(function (it, idx) {
    const id = newContentId_('itm');
    return [
      id,
      module,
      String(it.key || ""),
      String(it.field || ""),
      String(it.lang || 'ALL'),
      String(it.label || ""),
      String(it.value || ""),
      1,
      CONTENT_STATUS.LIVE,
      session.ldap,
      now,
      Number(it.sortOrder) || idx,
      id // Cada item semeado inaugura a própria linhagem.
    ];
  });

  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, CONTENT_ITEMS_HEADERS.length).setValues(rows);
  }

  logContentEvent_(session.ldap, 'seed', module, rows.length + ' itens');
  return { status: 'success', seeded: rows.length };
}
