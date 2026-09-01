// =========================================================
// ARQUIVO: PeopleAPI.gs (aba "Pessoas" da Central de Conteúdo)
//
// A aba People é o diretório de AUTORIZAÇÃO do produto, não um catálogo de
// conteúdo: getUserProfileByLdap() (Código.gs) a lê para decidir quem é
// liderança (isOverhead) e em que idioma o app abre. Editá-la é, na prática,
// conceder e revogar acesso ao TL Dashboard.
//
// Três consequências, e todas moldam este arquivo:
//
//   1. Nenhuma escrita entra pelo roteador JSONP do doGet(). Lá a identidade é
//      um parâmetro `user` que qualquer um forja - foi por isso que as rotas de
//      escrita de avisos saíram de lá (ver Código.gs, seção 5). Tudo aqui é
//      chamado por google.script.run, onde quem chama é Session.getActiveUser().
//   2. A linha aprovada vai para a aba People, não para Content_Items. A fila,
//      o log e a regra de não-autoaprovação são reaproveitados do ContentAPI;
//      só o destino da escrita muda.
//   3. Aprovar é privilégio exclusivo do ADMIN (CONTENT_ADMIN_ONLY_APPROVAL_MODULES).
//      Promoção de papel aprovada por um par não é revisão, é combinação.
//
// SHEET_PEOPLE, isOverheadRoleCategory() e defaultLanguageForSegment() vêm do
// Código.gs pelo escopo global compartilhado do Apps Script - o mesmo caminho
// pelo qual o EmailEngine.gs já enxerga getUserProfileByLdap().
// =========================================================

const PEOPLE_MODULE = 'people';

// A aba é lida por índice de coluna no Código.gs (data[i][0..3]). Escrever pelo
// mesmo índice mantém as duas pontas de acordo; o cabeçalho existe para quem
// abre a planilha, não para o código.
const PEOPLE_COL_LDAP = 1;
const PEOPLE_COL_ROLE = 2;
const PEOPLE_COL_CATEGORY = 3;
const PEOPLE_COL_SEGMENT = 4;
const PEOPLE_HEADERS = ["LDAP", "Role", "Role_Category", "Segment"];

// LDAP é identidade, não texto livre: entra minúsculo, sem domínio e sem
// espaço. A validação é estrita porque este valor é comparado com o LDAP
// derivado do e-mail autenticado (`email.split('@')[0]`) - se um cadastro
// tiver espaço à direita, a pessoa simplesmente nunca casa com o próprio
// perfil e cai no fallback restritivo, sem erro nenhum.
const PEOPLE_LDAP_RE = /^[a-z0-9][a-z0-9._-]{1,40}$/;

// Teto de tamanho dos campos livres. Não é segurança - é evitar que um
// paste acidental de um parágrafo inteiro vire um "cargo".
const PEOPLE_FIELD_MAX = 60;

// =========================================================
//  LEITURA DA ABA
// =========================================================

function getPeopleSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_PEOPLE);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_PEOPLE);
    sheet.appendRow(PEOPLE_HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// Devolve as pessoas já com o que a regra DERIVA de cada linha (liderança e
// idioma). Derivar aqui, com as mesmas funções que o app usa, é o que permite
// à tela mostrar "este cargo dá acesso de liderança" antes de alguém salvar.
function readPeopleRows_() {
  const sheet = getPeopleSheet_();
  const values = sheet.getDataRange().getValues();
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const ldap = String(values[i][0] || "").toLowerCase().trim();
    if (!ldap) continue;

    const roleCategory = String(values[i][2] || "").trim();
    const segment = String(values[i][3] || "").trim();

    rows.push({
      _row: i + 1,
      ldap: ldap,
      role: String(values[i][1] || "").trim(),
      roleCategory: roleCategory,
      segment: segment,
      isOverhead: isOverheadRoleCategory(roleCategory),
      defaultLanguage: defaultLanguageForSegment(segment)
    });
  }

  return rows;
}

function findPeopleRow_(ldap) {
  const target = String(ldap || "").toLowerCase().trim();
  const rows = readPeopleRows_();
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].ldap === target) return rows[i];
  }
  return null;
}

// O que viaja na coluna Value do rascunho. JSON num campo só, como os links
// já fazem: o registro inteiro da pessoa fica junto, e o revisor compara duas
// versões do MESMO objeto em vez de campos soltos.
function peopleValueJson_(person) {
  return JSON.stringify({
    ldap: person.ldap,
    role: person.role,
    roleCategory: person.roleCategory,
    segment: person.segment
  });
}

/**
 * Lista o time. Restrito a quem propõe o módulo (ADMIN e TL) por
 * assertContentRole_ - o diretório de quem manda não é leitura de referência
 * como um link ou uma dica.
 *
 * Cada pessoa vem com a proposta pendente dela anexada, quando existe: é o que
 * deixa a tela travar a linha em revisão em vez de aceitar uma segunda
 * proposta que a primeira aprovação sobrescreveria em silêncio.
 */
function listPeople() {
  assertContentRole_('propose', PEOPLE_MODULE);

  const pending = readContentRows_(SHEET_CONTENT_DRAFTS).filter(function (r) {
    return String(r.Module).trim() === PEOPLE_MODULE &&
      String(r.Status).trim() === CONTENT_STATUS.PENDING;
  });

  const pendingByLdap = {};
  pending.forEach(function (r) {
    const key = String(r.Key || "").toLowerCase().trim();
    pendingByLdap[key] = {
      draftId: String(r.Draft_ID || ""),
      action: String(r.Action || CONTENT_ACTIONS.UPSERT),
      value: String(r.Value || ""),
      proposedBy: String(r.Proposed_By || ""),
      proposedAt: String(r.Proposed_At || "")
    };
  });

  const people = readPeopleRows_().map(function (p) {
    return {
      ldap: p.ldap,
      role: p.role,
      roleCategory: p.roleCategory,
      segment: p.segment,
      isOverhead: p.isOverhead,
      defaultLanguage: p.defaultLanguage,
      pending: pendingByLdap[p.ldap] || null
    };
  });

  // Entradas propostas (pessoa que ainda não está na aba) não têm linha para se
  // pendurar. Sem isto, quem propõe uma admissão vê a tela igualzinha a antes e
  // propõe de novo.
  const known = {};
  people.forEach(function (p) { known[p.ldap] = true; });

  const incoming = [];
  Object.keys(pendingByLdap).forEach(function (ldap) {
    if (known[ldap]) return;
    const draft = pendingByLdap[ldap];
    if (draft.action === CONTENT_ACTIONS.REMOVE) return;
    const parsed = parsePeopleValue_(draft.value);
    incoming.push({
      ldap: ldap,
      role: parsed.role,
      roleCategory: parsed.roleCategory,
      segment: parsed.segment,
      isOverhead: isOverheadRoleCategory(parsed.roleCategory),
      defaultLanguage: defaultLanguageForSegment(parsed.segment),
      isIncoming: true,
      pending: draft
    });
  });

  return people.concat(incoming).sort(function (a, b) {
    return a.ldap.localeCompare(b.ldap);
  });
}

function parsePeopleValue_(raw) {
  try {
    const v = JSON.parse(raw || '{}');
    return {
      ldap: String(v.ldap || "").toLowerCase().trim(),
      role: String(v.role || ""),
      roleCategory: String(v.roleCategory || ""),
      segment: String(v.segment || "")
    };
  } catch (e) {
    return { ldap: "", role: "", roleCategory: "", segment: "" };
  }
}

// =========================================================
//  VALIDAÇÃO
// =========================================================

function assertPeopleField_(value, label) {
  const v = String(value == null ? "" : value).trim();
  if (!v) throw new Error("Preencha o campo " + label + ".");
  if (v.length > PEOPLE_FIELD_MAX) {
    throw new Error("O campo " + label + " passa de " + PEOPLE_FIELD_MAX + " caracteres.");
  }
  return v;
}

/**
 * Valida o registro de uma pessoa. Chamada tanto em saveContentDraft() quanto
 * na aprovação - uma proposta fica na fila por dias, e a aba pode ter mudado
 * nesse meio-tempo.
 */
function assertValidPeopleValue_(rawValue) {
  const p = parsePeopleValue_(rawValue);

  if (!p.ldap) throw new Error("Informe o LDAP da pessoa.");
  if (!PEOPLE_LDAP_RE.test(p.ldap)) {
    throw new Error(
      "LDAP inválido: \"" + p.ldap + "\". Use só o usuário (sem @), em minúsculas."
    );
  }

  return {
    ldap: p.ldap,
    role: assertPeopleField_(p.role, "Cargo"),
    roleCategory: assertPeopleField_(p.roleCategory, "Categoria"),
    segment: assertPeopleField_(p.segment, "Segmento")
  };
}

/**
 * Trava de pé-na-porta, irmã da que saveContentAccess() já faz na Central.
 *
 * A aba People é o que decide quem entra no TL Dashboard. Uma alteração que
 * zere a liderança (rebaixar o último TL, ou dar baixa nele) não quebra nada na
 * hora - ela quebra na próxima vez que alguém precisar do dashboard, longe da
 * causa, e o conserto passa a exigir editar a planilha na mão.
 *
 * `change` é { ldap, roleCategory } para admissão/alteração, ou
 * { ldap, removed: true } para baixa.
 */
function assertPeopleLeadershipSurvives_(change) {
  const target = String(change.ldap || "").toLowerCase().trim();
  const rows = readPeopleRows_();

  let before = 0;
  let after = 0;
  let found = false;

  rows.forEach(function (p) {
    if (p.isOverhead) before++;

    if (p.ldap === target) {
      found = true;
      if (change.removed) return;
      if (isOverheadRoleCategory(change.roleCategory)) after++;
      return;
    }
    if (p.isOverhead) after++;
  });

  if (!found && !change.removed && isOverheadRoleCategory(change.roleCategory)) after++;

  // A trava é sobre a QUEDA de 1 para 0, não sobre haver liderança.
  //
  // Exigir `after > 0` sempre parece a mesma coisa e não é: numa aba vazia
  // (planilha nova, ou a primeira vez que a Central cria a aba) o primeiro
  // cadastro seria obrigatoriamente o de um líder, e admitir um agente ficaria
  // impossível sem editar a planilha na mão. Quem não tinha liderança antes
  // não a está perdendo agora.
  if (before > 0 && after === 0) {
    throw new Error(
      "Esta alteração deixaria a operação sem nenhuma liderança na aba People — " +
      "ninguém abriria o TL Dashboard depois dela. Promova outra pessoa antes."
    );
  }
}

// =========================================================
//  PROPOSTA (TL) E APLICAÇÃO DIRETA (ADMIN)
// =========================================================

// Cria o rascunho já como pendente e sem avisar ninguém. É o caminho do ADMIN,
// que aprova em seguida na mesma chamada: mandar e-mail de "aguardando revisão"
// para uma proposta que já nasce aprovada é ruído.
function markPeopleDraftPending_(draftId) {
  const existing = findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', draftId);
  if (!existing) throw new Error("Rascunho não encontrado: " + draftId);

  const sheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  sheet.getRange(existing._row, 9).setValue(CONTENT_STATUS.PENDING);
  sheet.getRange(existing._row, 15).setValue("");
  sheet.getRange(existing._row, 16).setValue("");
}

/**
 * Admissão ou alteração de uma pessoa.
 *
 * Uma chamada só, com dois desfechos, porque a diferença é de papel e não de
 * intenção: o TL propõe e espera; o ADMIN, que já pode aprovar sozinho
 * (selfApprove), aplica na hora. Quebrar isso em "salvar" + "enviar" +
 * "aprovar" cobraria três cliques do ADMIN para trocar o segmento de alguém -
 * exatamente a operação que precisa ser trivial.
 *
 * payload: { ldap, role, roleCategory, segment }
 */
function savePeopleChange(payload) {
  const session = assertContentRole_('propose', PEOPLE_MODULE);
  const p = payload || {};

  const record = assertValidPeopleValue_(JSON.stringify({
    ldap: p.ldap,
    role: p.role,
    roleCategory: p.roleCategory,
    segment: p.segment
  }));

  const existing = findPeopleRow_(record.ldap);
  const isNew = !existing;

  // Uma proposta pendente é uma alteração já em curso. Aceitar uma segunda
  // faria a segunda aprovação sobrescrever a primeira sem que o aprovador
  // soubesse que decidiu duas vezes sobre a mesma pessoa.
  const pending = findPendingPeopleDraft_(record.ldap);
  if (pending) {
    throw new Error(
      "Já existe uma alteração em revisão para " + record.ldap +
      " (proposta por " + String(pending.Proposed_By) + "). Resolva-a antes de propor outra."
    );
  }

  assertPeopleLeadershipSurvives_({ ldap: record.ldap, roleCategory: record.roleCategory });

  const draft = saveContentDraft({
    module: PEOPLE_MODULE,
    key: record.ldap,
    lang: 'ALL',
    label: record.ldap,
    value: peopleValueJson_(record)
  });

  // O ADMIN aplica na hora; qualquer outro papel entra na fila do ADMIN.
  if (session.perms.selfApprove) {
    markPeopleDraftPending_(draft.draftId);
    const applied = approveContentDraft(draft.draftId, 'Aplicado direto pelo ADMIN.');
    return {
      status: 'success',
      applied: true,
      isNew: isNew,
      ldap: record.ldap,
      action: applied.action
    };
  }

  submitContentDraft(draft.draftId);
  return {
    status: 'success',
    applied: false,
    isNew: isNew,
    ldap: record.ldap,
    draftId: draft.draftId
  };
}

function findPendingPeopleDraft_(ldap) {
  const target = String(ldap || "").toLowerCase().trim();
  const rows = readContentRows_(SHEET_CONTENT_DRAFTS);

  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i].Module).trim() === PEOPLE_MODULE &&
      String(rows[i].Status).trim() === CONTENT_STATUS.PENDING &&
      String(rows[i].Key || "").toLowerCase().trim() === target) {
      return rows[i];
    }
  }

  return null;
}

/**
 * Baixa de uma pessoa (saiu da operação). Mesmo desenho do save: o ADMIN
 * aplica, o TL propõe.
 *
 * A linha some da aba People, e é isso que se quer: o perfil de quem não está
 * mais lá tem de cair no fallback restritivo do getUserProfileByLdap(). O
 * histórico não se perde - a proposta fica em Content_Drafts com o motivo, e o
 * evento vai para a aba Logs.
 */
function requestPeopleRemoval(ldap, reason) {
  const session = assertContentRole_('propose', PEOPLE_MODULE);
  const target = String(ldap || "").toLowerCase().trim();

  const person = findPeopleRow_(target);
  if (!person) throw new Error("Pessoa não encontrada na aba People: " + target);

  if (!String(reason || "").trim()) {
    throw new Error("Diga o motivo da baixa (saiu do time, mudou de área…).");
  }

  const pending = findPendingPeopleDraft_(target);
  if (pending) {
    throw new Error(
      "Já existe uma alteração em revisão para " + target + ". Resolva-a antes de propor a baixa."
    );
  }

  assertPeopleLeadershipSurvives_({ ldap: target, removed: true });

  const sheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  const now = contentNow_();
  const draftId = newContentId_('drf');

  sheet.appendRow([
    draftId,
    "",
    PEOPLE_MODULE,
    target,
    "",
    'ALL',
    "[BAIXA] " + target,
    // O registro atual viaja no rascunho para que a fila mostre o que se está
    // apagando, e não uma linha vazia.
    peopleValueJson_(person),
    CONTENT_STATUS.PENDING,
    session.ldap,
    now,
    "", "",
    String(reason).trim(),
    "", "",
    0,
    CONTENT_ACTIONS.REMOVE
  ]);

  logContentEvent_(session.ldap, 'people_removal_request', target, String(reason).trim());

  if (session.perms.selfApprove) {
    const applied = approveContentDraft(draftId, 'Aplicado direto pelo ADMIN.');
    return { status: 'success', applied: true, ldap: target, action: applied.action };
  }

  notifyApprovers_(findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', draftId), session.ldap);
  return { status: 'success', applied: false, ldap: target, draftId: draftId };
}

/**
 * Aplica na aba People uma proposta aprovada. Chamada por approveContentDraft()
 * quando o módulo é 'people' - toda a checagem de papel, de status e de
 * não-autoaprovação já aconteceu lá.
 *
 * Revalida antes de escrever de propósito: entre a proposta e a aprovação a aba
 * pode ter mudado (outra baixa aprovada, a pessoa readmitida na mão). O que se
 * aprova é a INTENÇÃO; o que se valida é o estado no instante da escrita.
 */
function applyApprovedPeopleDraft_(draft, session, note) {
  const action = String(draft.Action || CONTENT_ACTIONS.UPSERT);
  const targetLdap = String(draft.Key || "").toLowerCase().trim();
  const sheet = getPeopleSheet_();
  const existing = findPeopleRow_(targetLdap);

  let outcome;

  if (action === CONTENT_ACTIONS.REMOVE) {
    if (!existing) throw new Error("A pessoa " + targetLdap + " já não está na aba People.");
    assertPeopleLeadershipSurvives_({ ldap: targetLdap, removed: true });
    sheet.deleteRow(existing._row);
    outcome = 'removed';
  } else {
    const record = assertValidPeopleValue_(String(draft.Value || ""));
    assertPeopleLeadershipSurvives_({ ldap: record.ldap, roleCategory: record.roleCategory });

    if (existing) {
      // Só as quatro colunas do contrato. Qualquer coluna extra que alguém
      // tenha acrescentado na planilha à mão fica de pé - a regra de "nunca
      // reescrever o que não veio no payload" do db-schema.md vale aqui também.
      sheet.getRange(existing._row, PEOPLE_COL_ROLE).setValue(record.role);
      sheet.getRange(existing._row, PEOPLE_COL_CATEGORY).setValue(record.roleCategory);
      sheet.getRange(existing._row, PEOPLE_COL_SEGMENT).setValue(record.segment);
      outcome = 'updated';
    } else {
      sheet.appendRow([record.ldap, record.role, record.roleCategory, record.segment]);
      outcome = 'created';
    }
  }

  const draftsSheet = getContentSheet_(SHEET_CONTENT_DRAFTS);
  const now = contentNow_();
  draftsSheet.getRange(draft._row, 9).setValue(CONTENT_STATUS.APPROVED);
  draftsSheet.getRange(draft._row, 12).setValue(session.ldap);
  draftsSheet.getRange(draft._row, 13).setValue(now);
  if (note) draftsSheet.getRange(draft._row, 14).setValue(note);

  const selfFlag = (String(draft.Proposed_By).trim() === session.ldap) ? ' (aplicado pelo próprio ADMIN)' : '';
  logContentEvent_(
    session.ldap,
    'people_' + outcome,
    PEOPLE_MODULE + '/' + targetLdap + selfFlag,
    'proposto por ' + String(draft.Proposed_By)
  );

  return { status: 'success', action: action, outcome: outcome, ldap: targetLdap };
}
