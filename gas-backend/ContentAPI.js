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
const CONTENT_MODULES = [
  'links', 'call_script', 'email_template', 'note_template', 'tips',
  // Avisos e disponibilidade BAU: eram a aba "Broadcast", com schema próprio e
  // CRUD dentro do módulo do agente. São dois módulos e não um porque têm ciclos
  // de vida diferentes - ver CONTENT_SINGLETON_MODULES logo abaixo.
  'broadcast', 'bau_availability',
  // Diretório de autorização (aba People). Entra na mesma máquina de fila e log
  // do resto, mas com destino, leitura e aprovação próprios - ver os três
  // conjuntos logo abaixo e PeopleAPI.gs.
  'people'
];

// Módulos que publicam direto em 'live', sem passar pela fila de aprovação.
//
// A fila existe para conteúdo que é lido como referência (links, scripts,
// modelos): vale mais revisar do que publicar rápido. Aviso operacional é o
// contrário - um alerta que espera revisor chega depois de já não importar, e
// uma data de disponibilidade BAU que espera aprovação é uma data errada na
// tela do agente. Quem pode publicar é decidido pela matriz de papéis
// (CONTENT_ROLES.propose), não por este conjunto: aqui só se diz que, para
// quem já tem o papel, não há espera.
//
// A publicação direta não abre mão de nada além da fila: continua versionando,
// arquivando a versão anterior e indo para o log.
const CONTENT_DIRECT_PUBLISH_MODULES = ['broadcast', 'bau_availability'];

// Módulos cuja LEITURA é tão restrita quanto a escrita: quem não propõe,
// também não lê.
//
// Vale para o diretório de autorização e não para links ou dicas porque a
// lista de quem tem poder é ela própria informação sensível - saber quem é TL
// é o primeiro passo para escolher a quem se passar. QA e WFM têm acesso à
// Central sem terem nada a ver com o cadastro do time.
const CONTENT_RESTRICTED_READ_MODULES = ['people'];

// Módulos que SÓ o ADMIN aprova, mesmo que outros papéis aprovem o resto.
//
// TL aprova conteúdo porque conteúdo errado se corrige republicando. Um papel
// errado na aba People não: ele abre o TL Dashboard para quem não devia, e a
// própria pessoa que aprovou pode ser a beneficiada. Promoção aprovada por par
// não é revisão - é combinação.
const CONTENT_ADMIN_ONLY_APPROVAL_MODULES = ['people'];

// Módulos que a leitura pública (JSONP, sem identidade) nunca serve, mesmo que
// um dia passem a ter linha em Content_Items. Hoje people não tem - a barreira
// é estrutural, e esta é a segunda tranca, para o dia em que alguém mudar isso
// sem lembrar do porquê.
const CONTENT_PRIVATE_MODULES = ['people'];

// Módulos que guardam UM valor corrente em vez de uma lista.
//
// Disponibilidade BAU é estado, não mensagem: existe exatamente uma resposta
// certa para "qual a disponibilidade hoje", e publicar uma nova substitui a
// anterior. Tratar isso como feed é o que obrigava o código antigo a caçar o
// aviso certo por `title.includes("disponibilidade bau")` e a adivinhar as
// datas com regex em texto livre.
const CONTENT_SINGLETON_MODULES = ['bau_availability'];

// Chave única dos módulos singleton - fixa, para que a linhagem do item
// atravesse todas as versões.
const CONTENT_SINGLETON_KEY = 'current';

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
    propose: ['call_script', 'note_template'],
    approve: false,
    manageAccess: false,
    selfApprove: false
  },
  // WFM publica a disponibilidade BAU (é quem tem o dado), mas não publica
  // aviso geral - comunicado da operação continua sendo de ADMIN e TL, que
  // herdam os dois módulos por `propose: CONTENT_MODULES` lá em cima.
  WFM: {
    propose: ['links', 'bau_availability'],
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

// Escreve um bloco de colunas CONTÍGUAS numa linha, numa chamada só.
//
// O padrão anterior era um getRange().setValue() por coluna, e cada um é uma
// ida ao serviço do Sheets: aprovar uma proposta custava cinco. Só colunas
// contíguas entram aqui de propósito - escrever um bloco maior "de uma vez"
// exigiria reescrever colunas que a operação não quer tocar.
function setContentRowBlock_(sheet, row, startCol, values) {
  sheet.getRange(row, startCol, 1, values.length).setValues([values]);
}

// =========================================================
//  TRAVA DE ESCRITA
// =========================================================

// O Sheets não tem transação. Entre ler "esta proposta está pendente?" e
// escrever a linha nova existe uma janela em que outra execução passa pela
// mesma checagem e escreve também - e o resultado são duas linhas 'live' na
// mesma linhagem, que o app do agente renderiza como item duplicado, para
// sempre, sem erro em log nenhum.
//
// A trava é do script inteiro (não por linha, que o Sheets não oferece) e
// cobre o caminho de publicação: aprovar, rejeitar, reverter, publicar direto,
// tirar do ar, enviar para revisão e semear.
//
// Fora dela ficam os caminhos que só anexam linha de rascunho: dois rascunhos
// criados ao mesmo tempo são duas linhas independentes, e serializar isso só
// tornaria a edição mais lenta sem proteger nada.
const CONTENT_WRITE_LOCK_TIMEOUT_MS = 25 * 1000;

function withContentWriteLock_(fn) {
  let lock = null;

  // Contexto sem LockService (execução de teste) não pode derrubar a operação:
  // a trava é proteção contra concorrência, e onde não há concorrência não há
  // o que proteger.
  try {
    lock = LockService.getScriptLock();
  } catch (e) {
    return fn();
  }

  if (!lock.tryLock(CONTENT_WRITE_LOCK_TIMEOUT_MS)) {
    throw new Error(
      "Outra publicação está acontecendo agora. Espere alguns segundos e tente de novo."
    );
  }

  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

// =========================================================
//  CACHE DA LEITURA PÚBLICA
// =========================================================

// A leitura pública varre Content_Items inteira - todas as versões, live e
// arquivadas - a cada chamada, e é o caminho quente do produto: é por ele que
// passa todo agente que abre o app. Sem cache, cem pessoas entrando no turno
// são centenas de execuções numa janela curta, contra o teto de execuções
// simultâneas do Apps Script.
//
// TTL curto E invalidação explícita em toda escrita que muda o que está no ar.
// O TTL sozinho faria conteúdo aprovado demorar até cinco minutos para chegar
// ao agente, que é o oposto do motivo de a Central existir; a invalidação
// sozinha deixaria entrada órfã se uma escrita falhasse no meio.
const CONTENT_PUBLIC_CACHE_TTL_S = 300;
const CONTENT_PUBLIC_CACHE_PREFIX = 'cw_content_pub_v1_';

// O CacheService recusa valores acima de 100 KB por chave. Um módulo grande
// (call_script, note_template) pode passar disso, e nesse caso a resposta é
// servida direto da planilha em vez de estourar: cache é otimização, não
// caminho obrigatório.
const CONTENT_PUBLIC_CACHE_MAX_BYTES = 90 * 1024;

function contentCache_() {
  try {
    return CacheService.getScriptCache();
  } catch (e) {
    return null;
  }
}

function contentCacheKey_(module) {
  return CONTENT_PUBLIC_CACHE_PREFIX + module;
}

// Invalida o módulo cujo conteúdo no ar acabou de mudar. Chamada por toda
// escrita que publica, arquiva ou restaura - se um caminho novo de publicação
// aparecer e esquecer disso, o agente fica com conteúdo velho por até 5 min.
function invalidateContentCache_(module) {
  const cache = contentCache_();
  if (!cache || !module) return;
  try {
    cache.remove(contentCacheKey_(module));
  } catch (e) {
    // Cache indisponível não pode derrubar uma publicação que já aconteceu.
  }
}

// Os itens 'live' de um módulo, do cache quando houver.
function readLiveItemsCached_(module) {
  const cache = contentCache_();

  if (cache) {
    try {
      const hit = cache.get(contentCacheKey_(module));
      if (hit) return JSON.parse(hit);
    } catch (e) {
      // Cache corrompido é o mesmo que cache vazio.
    }
  }

  const items = readContentRows_(SHEET_CONTENT_ITEMS)
    .filter(function (r) {
      return String(r.Module).trim() === module && String(r.Status).trim() === CONTENT_STATUS.LIVE;
    })
    .map(mapItemRow_)
    .sort(function (a, b) { return a.sortOrder - b.sortOrder; });

  if (cache) {
    try {
      const payload = JSON.stringify(items);
      if (payload.length <= CONTENT_PUBLIC_CACHE_MAX_BYTES) {
        cache.put(contentCacheKey_(module), payload, CONTENT_PUBLIC_CACHE_TTL_S);
      }
    } catch (e) {
      // Idem: não cachear é degradar, não falhar.
    }
  }

  return items;
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

  // Restrição de módulo que vale para QUALQUER ação, leitura inclusive. Vem
  // antes do switch de propósito: um `read` em 'people' precisa cair aqui, e
  // o switch abaixo não olha para leitura.
  if (module && CONTENT_RESTRICTED_READ_MODULES.indexOf(module) !== -1 &&
    perms.propose.indexOf(module) === -1) {
    throw new Error("Acesso negado: seu papel (" + role + ") não tem acesso ao módulo '" + module + "'.");
  }

  if (action === 'propose') {
    if (perms.propose.indexOf(module) === -1) {
      throw new Error("Acesso negado: seu papel (" + role + ") não edita o módulo '" + module + "'.");
    }
  } else if (action === 'approve') {
    if (!perms.approve) throw new Error("Acesso negado: seu papel (" + role + ") não aprova mudanças.");
    if (module && CONTENT_ADMIN_ONLY_APPROVAL_MODULES.indexOf(module) !== -1 && role !== 'ADMIN') {
      throw new Error(
        "Acesso negado: alterações no módulo '" + module + "' só o ADMIN aprova."
      );
    }
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

// Devolve a definição de um substatus a partir do catálogo gerado do
// notes-data.js (ContentFields_Notes.gs), ou null se o catálogo não estiver
// publicado - degradar é melhor que travar o módulo inteiro.
function getSubstatusDef_(substatus) {
  if (typeof CONTENT_NOTE_FIELDS === 'undefined' || !CONTENT_NOTE_FIELDS.substatus) return null;

  const found = CONTENT_NOTE_FIELDS.substatus.filter(function (s) { return s.key === substatus; });
  return found.length ? found[0] : null;
}

/**
 * Valida um modelo de nota inteiro.
 *
 * O modelo guarda a nota como o agente vai recebê-la: um substatus e o conjunto
 * de campos já preenchidos. As três checagens abaixo existem porque cada uma
 * falha em silêncio hoje:
 *   - substatus inexistente: o modelo nunca aparece pra ninguém;
 *   - campo que aquele substatus não tem: applyScenario() faz
 *     getElementById() e ignora o texto sem avisar (foi o que a migração
 *     encontrou em 13 dos 27 cenários existentes);
 *   - campo obrigatório vazio: o agente só descobre na hora de gerar a nota.
 */
function assertValidNoteTemplate_(rawValue, substatus) {
  let parsed;
  try {
    parsed = JSON.parse(rawValue || '{}');
  } catch (e) {
    throw new Error("Conteúdo do modelo inválido (JSON malformado).");
  }

  const fields = parsed.fields || {};
  const chaves = Object.keys(fields);

  if (!chaves.length) {
    throw new Error("O modelo precisa preencher pelo menos um campo.");
  }

  const def = getSubstatusDef_(substatus);
  if (!def) {
    // Catálogo ausente: valida o que dá (formato) e segue.
    if (typeof CONTENT_NOTE_FIELDS !== 'undefined' && CONTENT_NOTE_FIELDS.substatus) {
      throw new Error("Substatus desconhecido: '" + substatus + "'. Escolha um da lista.");
    }
    return;
  }

  const forasteiros = chaves
    .map(function (k) { return k.replace('field-', ''); })
    .filter(function (f) { return def.fields.indexOf(f) === -1; });

  if (forasteiros.length) {
    throw new Error(
      "Estes campos não existem em " + def.name + ": " + forasteiros.join(", ") +
      ". O texto seria descartado sem aviso na hora de montar a nota."
    );
  }

  const obrigatoriosVazios = (def.requiredFields || []).filter(function (f) {
    return !String(fields['field-' + f] || "").trim();
  });

  if (obrigatoriosVazios.length) {
    throw new Error(
      "Preencha os campos obrigatórios de " + def.name + ": " + obrigatoriosVazios.join(", ") + "."
    );
  }
}

// A tela chama antes de gravar, pra o erro aparecer com o texto ainda em tela.
function checkNoteTemplate(rawValue, substatus) {
  try {
    assertValidNoteTemplate_(rawValue, substatus);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
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

// Tokens no formato [Alguma Coisa] - o mesmo que os modelos de e-mail já usam.
const EMAIL_TOKEN_RE = /\[[^\][]{2,60}\]/g;

/**
 * Valida um modelo de e-mail antes de virar rascunho.
 *
 * As duas falhas que isso impede são silenciosas e caras, porque o e-mail vai
 * para o anunciante:
 *   - placeholder declarado que não existe no corpo: o agente preenche um campo
 *     que não vai a lugar nenhum;
 *   - token no corpo que ninguém declarou: o agente nem vê o campo, e o texto
 *     sai LITERAL ("Olá, [Nome do Cliente],").
 *
 * Em ES só os rótulos são traduzidos - as chaves seguem as de PT, porque são
 * elas que aparecem no corpo. Por isso a checagem de declaração vale para PT, e
 * em ES o que se exige é que o corpo traduzido não tenha perdido nenhum token.
 */
function assertValidEmailTemplate_(rawValue, lang) {
  let parsed;
  try {
    parsed = JSON.parse(rawValue || '{}');
  } catch (e) {
    throw new Error("Conteúdo do e-mail inválido (JSON malformado).");
  }

  const subject = String(parsed.subject || "").trim();
  const body = String(parsed.template || "").trim();

  if (!subject) throw new Error("O e-mail precisa de um assunto.");
  if (!body) throw new Error("O e-mail precisa de um corpo.");

  const full = subject + " " + body;
  const noCorpo = (full.match(EMAIL_TOKEN_RE) || []).filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });

  if (String(lang).toUpperCase() === 'ES') {
    // Sem `placeholders` próprio: a referência é a linha PT do mesmo template.
    return { tokens: noCorpo };
  }

  const declarados = (parsed.placeholders || []).map(function (p) { return String(p.key || ""); });

  const semUso = declarados.filter(function (k) { return k && full.indexOf(k) === -1; });
  if (semUso.length) {
    throw new Error(
      "Estes campos estão declarados mas não aparecem no e-mail: " + semUso.join(", ") +
      ". Use-os no texto ou remova a declaração."
    );
  }

  const semDeclarar = noCorpo.filter(function (k) { return declarados.indexOf(k) === -1; });
  if (semDeclarar.length) {
    throw new Error(
      "Estes trechos aparecem no e-mail mas não estão declarados como campo: " + semDeclarar.join(", ") +
      ". Sem declarar, o texto sai literal para o anunciante."
    );
  }

  return { tokens: noCorpo };
}

// Exposta para a tela conseguir avisar ANTES de salvar, em vez de o agente
// descobrir o erro só ao tentar enviar.
function checkEmailTemplate(rawValue, lang) {
  try {
    assertValidEmailTemplate_(rawValue, lang);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ---------------------------------------------------------
//  Validação: avisos
// ---------------------------------------------------------

const BROADCAST_TYPES = ['info', 'critical', 'success'];

// Um aviso é um registro composto num `Value` só, no mesmo padrão já usado por
// email_template e note_template. O que a validação garante é o que a tela do
// agente assume sem checar: tipo conhecido, título e texto presentes.
function assertValidBroadcast_(rawValue) {
  let parsed;
  try {
    parsed = JSON.parse(String(rawValue || ""));
  } catch (e) {
    throw new Error("Aviso inválido: o conteúdo não é um JSON válido.");
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error("Aviso inválido: esperado um objeto com tipo, título e texto.");
  }

  const type = String(parsed.type || "").trim();
  if (BROADCAST_TYPES.indexOf(type) === -1) {
    throw new Error("Tipo de aviso desconhecido: '" + type + "'. Use info, critical ou success.");
  }

  if (!String(parsed.title || "").trim()) throw new Error("O aviso precisa de um título.");
  if (!String(parsed.text || "").trim()) throw new Error("O aviso precisa de uma mensagem.");

  return parsed;
}

function checkBroadcast(rawValue) {
  try {
    assertValidBroadcast_(rawValue);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ---------------------------------------------------------
//  Validação: disponibilidade BAU
// ---------------------------------------------------------

// Segmentos atendidos. Espelha os idiomas que o app tem dicionário para
// (src/modules/shared/i18n.js) - EN existe em CONTENT_LANGS mas não há
// operação BAU em inglês hoje.
const BAU_SEGMENTS = ['PT', 'ES'];

// Datas em ISO (YYYY-MM-DD) e não no "15/09" que chega no aviso: ISO ordena e
// compara como string, sem ambiguidade de dia/mês e sem depender do ano
// corrente estar implícito. A formatação curta é trabalho da tela.
const BAU_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function assertValidBauDate_(value, label) {
  const date = String(value || "").trim();
  if (!date) return ""; // Campo flexível: um segmento pode ter só uma das duas datas.

  if (!BAU_DATE_RE.test(date)) {
    throw new Error("Data inválida em " + label + ": use o formato AAAA-MM-DD.");
  }

  // Rejeita 2026-02-31 e afins, que passam no regex mas não existem no calendário.
  const parts = date.split('-');
  const probe = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  if (probe.getMonth() !== Number(parts[1]) - 1 || probe.getDate() !== Number(parts[2])) {
    throw new Error("Data inexistente em " + label + ": " + date + ".");
  }

  return date;
}

// O aviso chega como "disponibilidade para a data X, com melhor disponibilidade
// para a data Y". São dois campos por segmento, ambos opcionais:
//   attention - a data mais próxima, com folga apertada (laranja na tela)
//   full      - a data de disponibilidade total (verde na tela)
// A ordem entre elas não é estilo, é o significado: `attention` só quer dizer
// "atenção" por ser a mais próxima das duas. Invertidas, as cores mentem, então
// a inversão é erro de dado e não passa.
function assertValidBauAvailability_(rawValue) {
  let parsed;
  try {
    parsed = JSON.parse(String(rawValue || ""));
  } catch (e) {
    throw new Error("Disponibilidade inválida: o conteúdo não é um JSON válido.");
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error("Disponibilidade inválida: esperado um objeto com os segmentos.");
  }

  const segments = parsed.segments;
  if (!segments || typeof segments !== 'object') {
    throw new Error("Disponibilidade inválida: falta o bloco 'segments'.");
  }

  const unknown = Object.keys(segments).filter(function (s) {
    return BAU_SEGMENTS.indexOf(s) === -1;
  });
  if (unknown.length) {
    throw new Error("Segmento desconhecido: " + unknown.join(', ') + ". Use PT ou ES.");
  }

  const normalized = {};
  let anyDate = false;

  BAU_SEGMENTS.forEach(function (seg) {
    const raw = segments[seg] || {};
    const attention = assertValidBauDate_(raw.attention, seg + " / atenção");
    const full = assertValidBauDate_(raw.full, seg + " / total");

    if (attention && full && attention > full) {
      throw new Error(
        "Em " + seg + ", a data de atenção (" + attention + ") é posterior à de " +
        "disponibilidade total (" + full + "). A de atenção é a mais próxima das duas."
      );
    }

    if (attention || full) anyDate = true;
    normalized[seg] = { attention: attention, full: full };
  });

  if (!anyDate) {
    throw new Error("Informe ao menos uma data de disponibilidade.");
  }

  return {
    updatedAt: String(parsed.updatedAt || ""),
    author: String(parsed.author || ""),
    note: String(parsed.note || ""),
    segments: normalized
  };
}

function checkBauAvailability(rawValue) {
  try {
    assertValidBauAvailability_(rawValue);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// Porta única de validação por módulo. Deixa `publishContentDirect()` sem um
// if/else por módulo e garante que um módulo novo entre aqui de propósito, e
// não por esquecimento.
function assertValidDirectValue_(module, rawValue) {
  if (module === 'broadcast') return assertValidBroadcast_(rawValue);
  if (module === 'bau_availability') return assertValidBauAvailability_(rawValue);
  throw new Error("Módulo sem validação de publicação direta: " + module);
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
      if (d.module === PEOPLE_MODULE) {
        // People não tem linha em Content_Items: o "hoje no ar" é a própria
        // aba People, lida na hora da revisão e não na hora da proposta.
        const person = findPeopleRow_(d.key);
        d.currentValue = person ? peopleValueJson_(person) : "";
        d.currentLabel = d.key;
        d.isNew = !person;
      } else {
        const current = d.itemId ? findContentRow_(SHEET_CONTENT_ITEMS, 'ID', d.itemId) : null;
        d.currentValue = current ? String(current.Value || "") : "";
        d.currentLabel = current ? String(current.Label || "") : "";
        d.isNew = !d.itemId;
      }
      d.isSelfProposed = (d.proposedBy === session.ldap);
      d.canReview = (session.perms.selfApprove || !d.isSelfProposed) &&
        (CONTENT_ADMIN_ONLY_APPROVAL_MODULES.indexOf(d.module) === -1 || session.role === 'ADMIN');
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

  // Um módulo tem um caminho de escrita só. Deixar avisos entrarem também pela
  // fila criaria duas fontes de verdade para "o que está no ar", e a tela teria
  // de reconciliar as duas.
  if (CONTENT_DIRECT_PUBLISH_MODULES.indexOf(p.module) !== -1) {
    throw new Error(
      "O módulo '" + p.module + "' publica direto, sem rascunho. Use publishContentDirect()."
    );
  }

  if (CONTENT_LANGS.indexOf(p.lang || 'ALL') === -1) {
    throw new Error("Idioma inválido: " + p.lang);
  }
  if (!String(p.label || "").trim()) {
    throw new Error("Dê um título ao item antes de salvar.");
  }
  if (p.module === 'note_template') {
    assertValidNoteTemplate_(String(p.value || ""), String(p.key || ""));
  }
  if (p.module === 'email_template') {
    assertValidEmailTemplate_(String(p.value || ""), String(p.lang || 'PT'));
  }
  if (p.module === PEOPLE_MODULE) {
    assertValidPeopleValue_(String(p.value || ""));
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
    setContentRowBlock_(sheet, row, 5, [
      p.field || "",
      p.lang || 'ALL',
      p.label || "",
      p.value || "",
      CONTENT_STATUS.DRAFT
    ]);
    setContentRowBlock_(sheet, row, 15, [session.ldap, now]);

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
  return withContentWriteLock_(function () {
    return submitContentDraftLocked_(draftId);
  });
}

// Sob trava porque o envio é o que dispara o e-mail aos aprovadores: dois
// cliques simultâneos no mesmo rascunho mandariam dois avisos do mesmo pedido.
function submitContentDraftLocked_(draftId) {
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
  // Solta a trava de edição: em revisão ninguém mais edita mesmo.
  setContentRowBlock_(sheet, existing._row, 15, ["", ""]);

  logContentEvent_(session.ldap, 'draft_submit', String(existing.Module) + '/' + String(existing.Key), draftId);
  notifyApprovers_(existing, session.ldap);

  return { status: 'success' };
}

/**
 * Salva e envia para revisão numa execução só.
 *
 * A tela fazia isso em duas chamadas encadeadas (três nos e-mails, que ainda
 * validavam antes), cada uma com a latência do google.script.run. Além da
 * espera, o encadeamento tinha um estado ruim no meio: falhar no envio deixava
 * um rascunho salvo que a pessoa achava que tinha mandado.
 *
 * A validação não se perdeu no caminho: saveContentDraft() já valida o valor de
 * cada módulo antes de gravar, então o erro continua chegando com o texto ainda
 * na tela - só que numa viagem em vez de duas.
 */
function saveAndSubmitContentDraft(payload) {
  const saved = saveContentDraft(payload);
  submitContentDraft(saved.draftId);
  return { status: 'success', draftId: saved.draftId };
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

// Avisa quem propôs qual foi a decisão. O contrário do notifyApprovers_: lá o
// pedido sai à procura de revisor; aqui a resposta volta para quem esperava.
//
// Sem isto, a rejeição é invisível - o rascunho volta para 'draft' na tela e o
// motivo escrito pelo revisor fica numa coluna que ninguém abre. A justificativa
// vai no corpo justamente porque é a parte acionável: é ela que diz o que
// corrigir antes de reenviar.
function notifyProposerDecision_(draftRow, session, approved, note) {
  const proposer = String(draftRow.Proposed_By || "").trim();
  if (!proposer) return;

  // Quem decide sobre a própria proposta (autoaprovação do ADMIN) já sabe.
  if (proposer === session.ldap) return;

  const label = String(draftRow.Label || draftRow.Key || "").trim();
  const module = String(draftRow.Module || "").trim();

  let url = '';
  try {
    url = buildDeploymentPageUrl('content');
  } catch (e) {
    url = '';
  }

  const botao = url
    ? '<p style="margin:24px 0"><a href="' + url + '" ' +
      'style="background:#1A73E8;color:#fff;text-decoration:none;' +
      'padding:10px 20px;border-radius:4px;display:inline-block;' +
      'font-family:Roboto,Arial,sans-serif;font-size:14px">' +
      'Abrir a Central de Conteúdo</a></p>'
    : '';

  const corpo = approved
    ? '<p><strong>' + session.ldap + '</strong> aprovou sua proposta em <strong>' +
      module + '</strong> (' + label + '). Já está no ar.</p>' +
      (String(note || "").trim()
        ? '<p style="color:#5F6368">Comentário: ' + String(note).trim() + '</p>'
        : '')
    : '<p><strong>' + session.ldap + '</strong> devolveu sua proposta em <strong>' +
      module + '</strong> (' + label + ').</p>' +
      '<p><strong>Motivo:</strong> ' + String(note || "").trim() + '</p>' +
      '<p style="color:#5F6368">Ela voltou como rascunho: corrija e reenvie, ' +
      'sem redigitar do zero.</p>';

  try {
    MailApp.sendEmail({
      to: proposer + "@google.com",
      subject: approved
        ? "✅ Central de Conteúdo: sua proposta foi publicada"
        : "↩️ Central de Conteúdo: sua proposta voltou para ajuste",
      htmlBody: corpo + botao,
      name: "Cases Wizard"
    });
  } catch (e) {
    // A decisão já aconteceu e não pode ser desfeita por falha de e-mail. Mas,
    // diferente do notifyApprovers_, aqui o silêncio total esconderia que a
    // pessoa nunca foi avisada - então fica no log.
    logContentEvent_(session.ldap, 'notify_failed', module + '/' + String(draftRow.Key || ""), String(e));
  }
}

/**
 * Aprova uma proposta: arquiva a versão live anterior e publica a nova.
 * É o único caminho pelo qual algo chega a Content_Items com status 'live'.
 */
function approveContentDraft(draftId, note) {
  return withContentWriteLock_(function () {
    return approveContentDraftLocked_(draftId, note);
  });
}

// O corpo roda SEMPRE dentro da trava: a leitura do rascunho precisa acontecer
// depois de a trava ser obtida, senão a checagem de "ainda está pendente?" é
// feita sobre um estado que outra execução já mudou.
function approveContentDraftLocked_(draftId, note) {
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

  // People é o único módulo cuja aprovação não escreve em Content_Items: a
  // linha aprovada vai para a aba People, que é o que getUserProfileByLdap()
  // lê. Tudo que vem ANTES desta linha (papel, status pendente, regra de
  // não-autoaprovação) vale igual para ele - só o destino muda.
  if (String(draft.Module).trim() === PEOPLE_MODULE) {
    const peopleResult = applyApprovedPeopleDraft_(draft, session, note);
    notifyProposerDecision_(draft, session, true, note);
    return peopleResult;
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
  setContentRowBlock_(draftsSheet, draft._row, 12, [session.ldap, now, note || ""]);

  // O que está no ar mudou: o cache do módulo tem que cair agora, não daqui a
  // cinco minutos.
  invalidateContentCache_(String(draft.Module).trim());

  const selfFlag = (String(draft.Proposed_By).trim() === session.ldap) ? ' (autoaprovação ADMIN)' : '';
  logContentEvent_(
    session.ldap,
    action === CONTENT_ACTIONS.REMOVE ? 'approve_removal' : 'approve',
    String(draft.Module) + '/' + String(draft.Key) + selfFlag,
    'v' + version + ' por ' + String(draft.Proposed_By)
  );

  notifyProposerDecision_(draft, session, true, note);

  return { status: 'success', itemId: newItemId, version: version, action: action };
}

function rejectContentDraft(draftId, note) {
  return withContentWriteLock_(function () {
    return rejectContentDraftLocked_(draftId, note);
  });
}

function rejectContentDraftLocked_(draftId, note) {
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
  setContentRowBlock_(sheet, draft._row, 12, [session.ldap, contentNow_(), note]);

  logContentEvent_(session.ldap, 'reject', String(draft.Module) + '/' + String(draft.Key), note);
  notifyProposerDecision_(draft, session, false, note);

  return { status: 'success' };
}

/**
 * Kill switch: republica uma versão arquivada sem passar pela fila de revisão.
 * Fora do fluxo normal de propósito - existe para resposta a incidente, quando
 * algo ruim passou e o custo de esperar uma segunda revisão é alto demais.
 */
function rollbackContentItem(archivedItemId) {
  return withContentWriteLock_(function () {
    return rollbackContentItemLocked_(archivedItemId);
  });
}

function rollbackContentItemLocked_(archivedItemId) {
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

  invalidateContentCache_(String(archived.Module).trim());

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

  // Mesmo motivo do bloqueio em saveContentDraft(): quem publica sem fila
  // também tira do ar sem fila.
  if (CONTENT_DIRECT_PUBLISH_MODULES.indexOf(String(item.Module).trim()) !== -1) {
    throw new Error(
      "O módulo '" + String(item.Module).trim() + "' sai do ar direto. Use unpublishContentDirect()."
    );
  }

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
//  PUBLICAÇÃO DIRETA (avisos e disponibilidade BAU)
//
//  Mesma máquina de versionamento de approveContentDraft(), sem a etapa de
//  fila. Ver CONTENT_DIRECT_PUBLISH_MODULES para o porquê.
// =========================================================

function assertDirectPublishModule_(module) {
  assertValidModule_(module);
  if (CONTENT_DIRECT_PUBLISH_MODULES.indexOf(module) === -1) {
    throw new Error(
      "O módulo '" + module + "' publica pela fila de aprovação, não direto. " +
      "Use saveContentDraft()."
    );
  }
}

// Item no ar que esta publicação substitui, ou null se é um item novo.
// Singleton: a linha viva do módulo, qualquer que seja a chave. Feed: a linha
// viva com a mesma chave, que é como uma edição encontra o que edita.
function findLiveItemToReplace_(module, key) {
  const isSingleton = CONTENT_SINGLETON_MODULES.indexOf(module) !== -1;

  const live = readContentRows_(SHEET_CONTENT_ITEMS).filter(function (r) {
    if (String(r.Module).trim() !== module) return false;
    if (String(r.Status).trim() !== CONTENT_STATUS.LIVE) return false;
    return isSingleton ? true : String(r.Key).trim() === String(key).trim();
  });

  if (!live.length) return null;

  // Mais de uma linha viva só acontece se alguém editar a planilha na mão.
  // Substituir a mais recente é o comportamento menos surpreendente; as outras
  // seguem no ar e aparecem na tela da Central para serem removidas.
  return live.sort(function (a, b) {
    return String(b.Published_At || "").localeCompare(String(a.Published_At || ""));
  })[0];
}

/**
 * Publica direto em 'live'. Quem pode chamar é decidido pela matriz de papéis:
 * ADMIN e TL nos dois módulos, WFM só em bau_availability.
 *
 * payload: { module, key?, field?, lang?, label, value, sortOrder? }
 *   - `value` é a string JSON do registro (ver assertValidBroadcast_ /
 *     assertValidBauAvailability_).
 *   - `key` é ignorada em módulos singleton, que usam CONTENT_SINGLETON_KEY.
 *     Omitida num módulo de feed, nasce um item novo.
 */
function publishContentDirect(payload) {
  return withContentWriteLock_(function () {
    return publishContentDirectLocked_(payload);
  });
}

function publishContentDirectLocked_(payload) {
  const data = (typeof payload === 'string') ? JSON.parse(payload) : (payload || {});
  const module = String(data.module || "").trim();

  assertDirectPublishModule_(module);
  const session = assertContentRole_('propose', module);

  const isSingleton = CONTENT_SINGLETON_MODULES.indexOf(module) !== -1;
  const key = isSingleton
    ? CONTENT_SINGLETON_KEY
    : (String(data.key || "").trim() || newContentId_('ntc'));

  const lang = String(data.lang || 'ALL').trim().toUpperCase();
  if (CONTENT_LANGS.indexOf(lang) === -1) {
    throw new Error("Idioma desconhecido: " + lang + ".");
  }

  // Valida antes de escrever qualquer coisa: uma publicação recusada não pode
  // ter arquivado a versão que estava no ar.
  const parsed = assertValidDirectValue_(module, data.value);

  const now = contentNow_();
  const sheet = getContentSheet_(SHEET_CONTENT_ITEMS);
  const previous = findLiveItemToReplace_(module, key);

  let version = 1;
  let lineage = "";

  if (previous) {
    version = (Number(previous.Version) || 1) + 1;
    lineage = String(previous.Lineage || previous.ID);
    sheet.getRange(previous._row, 9).setValue(CONTENT_STATUS.ARCHIVED);
  }

  const newItemId = newContentId_('itm');
  sheet.appendRow([
    newItemId,
    module,
    key,
    String(data.field || (isSingleton ? 'availability' : 'notice')),
    lang,
    String(data.label || parsed.title || ""),
    String(data.value || ""),
    version,
    CONTENT_STATUS.LIVE,
    session.ldap,
    now,
    Number(data.sortOrder) || 0,
    lineage || newItemId
  ]);

  invalidateContentCache_(module);

  logContentEvent_(
    session.ldap,
    previous ? 'publish_direct_update' : 'publish_direct',
    module + '/' + key,
    'v' + version
  );

  return { status: 'success', itemId: newItemId, key: key, version: version };
}

/**
 * Tira um item de publicação direta do ar. Arquiva, não apaga: a leitura
 * pública só enxerga 'live', e a linha arquivada é o que permite reverter.
 */
function unpublishContentDirect(itemId) {
  return withContentWriteLock_(function () {
    return unpublishContentDirectLocked_(itemId);
  });
}

function unpublishContentDirectLocked_(itemId) {
  const item = findContentRow_(SHEET_CONTENT_ITEMS, 'ID', itemId);
  if (!item) throw new Error("Item não encontrado.");

  const module = String(item.Module).trim();
  assertDirectPublishModule_(module);
  const session = assertContentRole_('propose', module);

  if (String(item.Status).trim() !== CONTENT_STATUS.LIVE) {
    throw new Error("Este item já não está no ar.");
  }

  getContentSheet_(SHEET_CONTENT_ITEMS)
    .getRange(item._row, 9)
    .setValue(CONTENT_STATUS.ARCHIVED);

  invalidateContentCache_(module);

  logContentEvent_(session.ldap, 'unpublish_direct', module + '/' + String(item.Key), String(item.Label || ""));
  return { status: 'success', itemId: itemId };
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
  // `modules=a,b,c` existe para o boot do agente caber numa execução só. Antes
  // dele o app fazia uma chamada por módulo - sete por sessão -, e cem pessoas
  // entrando no turno estouravam o teto de execuções simultâneas.
  const raw = String((p && p.modules) || "").trim();

  if (raw) {
    const names = raw.split(',')
      .map(function (n) { return String(n).trim(); })
      .filter(function (n) { return n; });

    if (!names.length) throw new Error("Nenhum módulo informado.");
    if (names.length > CONTENT_MODULES.length) {
      throw new Error("Módulos demais numa chamada só.");
    }

    const out = {};
    names.forEach(function (name) {
      out[name] = readPublicModuleItems_(name);
    });

    return { status: 'success', modules: out };
  }

  const module = String((p && p.module) || "").trim();
  return { status: 'success', module: module, items: readPublicModuleItems_(module) };
}

// Valida e devolve os itens no ar de um módulo público. Separado de
// handleContentPublicRead() para que a rota de um módulo e a de vários
// compartilhem exatamente a mesma regra - inclusive a de módulo privado, que é
// o que impede `people` de vazar por uma URL.
function readPublicModuleItems_(module) {
  assertValidModule_(module);

  if (CONTENT_PRIVATE_MODULES.indexOf(module) !== -1) {
    throw new Error("Módulo '" + module + "' não tem leitura pública.");
  }

  return readLiveItemsCached_(module);
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
    invalidateContentCache_(module);
  }

  logContentEvent_(session.ldap, 'seed', module, rows.length + ' itens');
  return { status: 'success', seeded: rows.length };
}
