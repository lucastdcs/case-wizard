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

// Papéis como DADO, não como constante do código (ADR-0009). `Content_Access`
// segue sendo LDAP -> papel; o que cada papel pode fazer mora aqui, e muda sem
// deploy. `CONTENT_ROLES` continua no arquivo como semente e como rede: se a
// aba não existir ou vier corrompida, o servidor cai nela em vez de trancar
// todo mundo do lado de fora.
const SHEET_CONTENT_ROLES = "Content_Roles";

// Auditoria. Aba própria, e não mais linhas na aba `Logs` genérica: ali a ação
// de conteúdo cabia em `Label`, uma string única onde módulo, chave e um
// sufixo " (autoaprovação ADMIN)" viviam grudados. Dava para LER, não para
// FILTRAR - e a barra "Atividade recente" precisa saber de que módulo é cada
// linha para decidir quem pode vê-la. Ver ADR-0008 para a retenção.
const SHEET_CONTENT_LOG = "Content_Log";

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

// Módulos cuja aprovação exige, ALÉM da permissão de aprovar o módulo, uma
// permissão global — a de gerenciar acessos.
//
// TL aprova conteúdo porque conteúdo errado se corrige republicando. Um papel
// errado na aba People não: ele abre o TL Dashboard para quem não devia, e a
// própria pessoa que aprovou pode ser a beneficiada. Promoção aprovada por par
// não é revisão - é combinação.
//
// Com os papéis virando dado editável (ADR-0009), esta regra deixou de poder
// ser um simples "só o ADMIN": o nome do papel passou a ser editável, e
// amarrar segurança a uma string que alguém pode renomear é amarrar a nada. A
// regra passou a ser ESTRUTURAL — quem aprova uma mudança de autorização
// precisa já ser quem controla autorização —, e é a única casa da matriz que um
// checkbox não consegue abrir sozinho.
const CONTENT_APPROVAL_REQUIRES_GLOBAL = { people: 'manageAccess' };

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

// Os quatro papéis do dia 1, no formato antigo (uma lista `propose` e três
// booleanos). Deixaram de ser a autoridade: agora são a SEMENTE da aba
// `Content_Roles` e o FALLBACK para quando ela não puder ser lida.
//
// A conversão para a matriz módulo x ação está em `contentPresetMatrix_()`, e é
// ela que garante a promessa do ADR-0009: no dia da migração ninguém percebe
// nada, porque o preset reproduz exatamente o que estas quatro entradas já
// diziam.
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

// `Item_ID` e `Key` ficam vazios em ações que não têm alvo de conteúdo
// (`access_change` aponta para uma pessoa, `seed` para um módulo inteiro).
// Coluna vazia é mais honesto do que enfiar outra coisa no campo.
const CONTENT_LOG_HEADERS = [
  "Log_ID", "Timestamp", "Actor", "Action", "Module", "Key", "Item_ID", "Label", "Detail"
];

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
    else if (name === SHEET_CONTENT_LOG) sheet.appendRow(CONTENT_LOG_HEADERS);
    else if (name === SHEET_CONTENT_ROLES) {
      sheet.appendRow(CONTENT_ROLES_HEADERS);
      // Semeada com os quatro papéis de hoje: é o que faz o dia da migração
      // não mudar nada para ninguém (ADR-0009).
      const preset = contentPresetMatrix_();
      Object.keys(preset).forEach(function (nome) {
        sheet.appendRow([
          nome,
          JSON.stringify({ modules: preset[nome].modules, global: preset[nome].global }),
          true,
          'system',
          new Date().toISOString()
        ]);
      });
    }
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
//  MATRIZ DE PERMISSÃO (ADR-0009)
// =========================================================

const CONTENT_ROLES_HEADERS = ["Role", "Permissions", "Active", "Updated_By", "Updated_At"];

// As cinco ações por módulo. `propor` e `publicar direto` são colunas
// diferentes de propósito: é exatamente essa diferença que hoje separa TL de
// WFM, e que a lista única `propose` do formato antigo não sabia expressar.
// `ver` também é coluna, e não um implícito de quem tem acesso — o módulo
// `people` precisa esconder a leitura de quem não propõe.
const CONTENT_MODULE_ACTIONS = ['view', 'propose', 'approve', 'publish', 'rollback'];

// Permissões que não pertencem a módulo nenhum.
const CONTENT_GLOBAL_PERMS = ['manageAccess', 'manageRoles', 'viewAudit', 'selfApprove'];

/**
 * Quais ações fazem sentido para um módulo.
 *
 * Um módulo tem um caminho de escrita só: catálogo passa pela fila (`propose` +
 * `approve`), operação publica direto (`publish`). Marcar a casa impossível
 * como inexistente — em vez de existente e falsa — é o que impede a tela de
 * oferecer um checkbox que não faria nada, e o que impede a matriz de dizer
 * "este papel não pode aprovar avisos" sobre um módulo onde aprovar não existe.
 */
function contentActionsForModule_(module) {
  if (CONTENT_DIRECT_PUBLISH_MODULES.indexOf(module) !== -1) {
    return ['view', 'publish', 'rollback'];
  }
  return ['view', 'propose', 'approve', 'rollback'];
}

function emptyModulePerms_() {
  const o = {};
  for (let i = 0; i < CONTENT_MODULE_ACTIONS.length; i++) o[CONTENT_MODULE_ACTIONS[i]] = false;
  return o;
}

/**
 * Converte os quatro papéis do formato antigo na matriz.
 *
 * É esta função que sustenta a promessa de "no dia 1 nada muda". Cada regra
 * abaixo traduz uma que já existia:
 *   - ler tudo, menos o que `CONTENT_RESTRICTED_READ_MODULES` escondia;
 *   - `propose` valia para a fila NOS módulos de catálogo e para a publicação
 *     direta nos de operação — vira `propose` num caso e `publish` no outro;
 *   - reverter exigia aprovar, então herda `approve`;
 *   - aprovar `people` exigia ser ADMIN, e ADMIN era quem gerenciava acesso.
 */
function contentPresetMatrix_() {
  const matriz = {};

  Object.keys(CONTENT_ROLES).forEach(function (nome) {
    const antigo = CONTENT_ROLES[nome];
    const modules = {};

    CONTENT_MODULES.forEach(function (m) {
      const perms = emptyModulePerms_();
      const temModulo = antigo.propose.indexOf(m) !== -1;
      const direto = CONTENT_DIRECT_PUBLISH_MODULES.indexOf(m) !== -1;

      perms.view = (CONTENT_RESTRICTED_READ_MODULES.indexOf(m) === -1) || temModulo;
      if (direto) perms.publish = temModulo;
      else perms.propose = temModulo;

      const exigeGlobal = CONTENT_APPROVAL_REQUIRES_GLOBAL[m];
      perms.approve = !direto && antigo.approve && (!exigeGlobal || !!antigo[exigeGlobal]);
      perms.rollback = antigo.approve;

      modules[m] = perms;
    });

    matriz[nome] = {
      modules: modules,
      global: {
        manageAccess: !!antigo.manageAccess,
        // Quem gerenciava acesso é quem passa a gerenciar papéis e a ver a
        // auditoria completa: era o único papel com poder sobre autorização.
        manageRoles: !!antigo.manageAccess,
        viewAudit: !!antigo.manageAccess,
        selfApprove: !!antigo.selfApprove
      },
      active: true
    };
  });

  return matriz;
}

// Normaliza o que veio da planilha: casa desconhecida é ignorada, casa que
// falta vira `false`, e ação impossível para o módulo é apagada. Um JSON
// editado à mão não pode inventar permissão nem derrubar a leitura.
function normalizeRoleMatrix_(bruto) {
  const entrada = bruto || {};
  const modulesIn = entrada.modules || {};
  const globalIn = entrada.global || {};
  const modules = {};

  CONTENT_MODULES.forEach(function (m) {
    const perms = emptyModulePerms_();
    const possiveis = contentActionsForModule_(m);
    const doModulo = modulesIn[m] || {};

    possiveis.forEach(function (acao) { perms[acao] = doModulo[acao] === true; });
    modules[m] = perms;
  });

  const global = {};
  CONTENT_GLOBAL_PERMS.forEach(function (nome) { global[nome] = globalIn[nome] === true; });

  return { modules: modules, global: global, active: true };
}

/**
 * Lê `Content_Roles`. Devolve `null` quando não há nada utilizável — e é o
 * chamador que decide cair no preset.
 *
 * Uma linha com JSON quebrado é PULADA, não fatal: uma edição errada num papel
 * não pode apagar os outros três. Mas se sobrar zero papel, aí sim é o preset
 * inteiro que volta — mesma filosofia de `getSubstatusDef_()`, degradar em vez
 * de trancar todo mundo do lado de fora.
 */
function readContentRolesMatrix_() {
  let linhas;
  try {
    linhas = readContentRows_(SHEET_CONTENT_ROLES);
  } catch (e) {
    return null;
  }

  const matriz = {};

  for (let i = 0; i < linhas.length; i++) {
    const nome = String(linhas[i].Role || "").toUpperCase().trim();
    if (!nome) continue;

    const ativo = String(linhas[i].Active).toUpperCase().trim();
    if (ativo !== 'TRUE' && ativo !== '1') continue;

    let bruto;
    try {
      bruto = JSON.parse(String(linhas[i].Permissions || "{}"));
    } catch (e) {
      continue;
    }

    matriz[nome] = normalizeRoleMatrix_(bruto);
  }

  return Object.keys(matriz).length ? matriz : null;
}

// =========================================================
//  CACHE DE PERMISSÃO
//
//  Toda ação da Central passa por aqui: sem cache, cada clique custa duas
//  varreduras de planilha (quem é a pessoa, e o que o papel dela pode).
//
//  A invalidação é IMEDIATA e não por TTL — é a terceira invariante do
//  ADR-0009. Cache de permissão que expira por tempo significa que revogar um
//  acesso só vale daqui a cinco minutos, e é a única entrada do ADR-0008 onde
//  atraso não é aceitável.
// =========================================================

const CONTENT_PERMS_CACHE_KEY = 'cw_content_perms_v1';
const CONTENT_PERMS_CACHE_TTL_S = 300;

function invalidateContentPermsCache_() {
  const cache = contentCache_();
  if (!cache) return;
  try { cache.remove(CONTENT_PERMS_CACHE_KEY); } catch (e) { }
}

/**
 * `{ roles, access, fallback }` — a matriz por papel, o mapa LDAP -> papel, e
 * se a matriz veio do código em vez da planilha.
 */
function contentPermsSnapshot_() {
  const cache = contentCache_();

  if (cache) {
    try {
      const bruto = cache.get(CONTENT_PERMS_CACHE_KEY);
      if (bruto) return JSON.parse(bruto);
    } catch (e) {
      // Cache ilegível não pode derrubar o login de ninguém: lê da planilha.
    }
  }

  const daPlanilha = readContentRolesMatrix_();
  const roles = daPlanilha || contentPresetMatrix_();

  const access = {};
  readContentRows_(SHEET_CONTENT_ACCESS).forEach(function (r) {
    const ldap = String(r.LDAP || "").toLowerCase().trim();
    const ativo = String(r.Active).toUpperCase().trim();
    const papel = String(r.Role || "").toUpperCase().trim();
    if (ldap && (ativo === 'TRUE' || ativo === '1') && roles[papel]) access[ldap] = papel;
  });

  const snapshot = { roles: roles, access: access, fallback: !daPlanilha };

  if (cache) {
    try {
      cache.put(CONTENT_PERMS_CACHE_KEY, JSON.stringify(snapshot), CONTENT_PERMS_CACHE_TTL_S);
    } catch (e) { }
  }

  return snapshot;
}

function getContentPermsForRole_(role) {
  const snap = contentPermsSnapshot_();
  return snap.roles[String(role || "").toUpperCase().trim()] || null;
}

// Uma casa da matriz. Ação impossível para o módulo devolve `false` sempre —
// não existe "aprovar um aviso", que não passa por fila nenhuma.
function podeNoModulo_(perms, module, acao) {
  if (!perms || !module) return false;
  if (contentActionsForModule_(module).indexOf(acao) === -1) return false;

  const doModulo = perms.modules[module];
  return !!(doModulo && doModulo[acao]);
}

function podeGlobal_(perms, nome) {
  return !!(perms && perms.global && perms.global[nome]);
}

// Aprovar exige a casa da matriz E, em `people`, a permissão global. Ver
// CONTENT_APPROVAL_REQUIRES_GLOBAL.
function podeAprovarModulo_(perms, module) {
  if (!podeNoModulo_(perms, module, 'approve')) return false;

  const exigeGlobal = CONTENT_APPROVAL_REQUIRES_GLOBAL[module];
  return !exigeGlobal || podeGlobal_(perms, exigeGlobal);
}

// Módulos que o papel escreve, por qualquer caminho. É o que a tela usa para
// decidir se mostra o botão de editar — a fila e a publicação direta são
// caminhos diferentes, mas "posso mexer nisto?" é uma pergunta só.
function modulosEscrevivies_(perms) {
  return CONTENT_MODULES.filter(function (m) {
    return podeNoModulo_(perms, m, 'propose') || podeNoModulo_(perms, m, 'publish');
  });
}

function modulosVisiveis_(perms) {
  return CONTENT_MODULES.filter(function (m) { return podeNoModulo_(perms, m, 'view'); });
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
  const snap = contentPermsSnapshot_();
  // Sem linha ativa = sem acesso. Não há papel padrão.
  return snap.access[String(ldap || "").toLowerCase().trim()] || null;
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

  return sessionParaPapel_(ldap, role, getContentPermsForRole_(role));
}

// O formato que a tela consome. Extraído porque a prévia "ver como" devolve
// exatamente a mesma coisa — se as duas divergirem, a prévia deixa de ser
// prévia.
function sessionParaPapel_(ldap, role, perms) {
  return {
    ldap: ldap,
    role: role,
    hasAccess: true,
    // `canApprove` segue existindo porque a tela pergunta "esta pessoa é
    // revisora?" para decidir se mostra a fila. Com a matriz, a resposta é
    // "aprova ALGUMA coisa" — quais módulos, quem pergunta é a fila.
    canApprove: CONTENT_MODULES.some(function (m) { return podeAprovarModulo_(perms, m); }),
    canManageAccess: podeGlobal_(perms, 'manageAccess'),
    canManageRoles: podeGlobal_(perms, 'manageRoles'),
    canViewAudit: podeGlobal_(perms, 'viewAudit'),
    canSelfApprove: podeGlobal_(perms, 'selfApprove'),
    proposableModules: modulosEscrevivies_(perms),
    readableModules: modulosVisiveis_(perms),
    // A matriz inteira vai junto: é o que a aba "Papéis" edita, e o que
    // permite a tela explicar POR QUE um botão não está lá.
    permissions: perms,
    moduleActions: CONTENT_MODULE_ACTIONS,
    globalPerms: CONTENT_GLOBAL_PERMS,
    modules: CONTENT_MODULES,
    langs: CONTENT_LANGS
  };
}

/**
 * "Ver como": o que a Central mostraria para quem tem o papel `role`.
 *
 * NUNCA devolve mais poder do que quem pergunta já tem — a matriz do papel é
 * INTERSECTADA com a de quem chama. Prévia que concede é escalada com outro
 * nome: o servidor continua julgando pela identidade real, então uma tela
 * otimista ou ofereceria botões que falham, ou — pior — botões que funcionam
 * enquanto a pessoa acredita estar "só olhando".
 *
 * O que ficou de fora vem em `beyond`, para a tela poder dizer o que ela NÃO
 * está mostrando. Prévia silenciosamente incompleta é pior que prévia nenhuma:
 * a pessoa conclui que o papel não pode algo que ele pode.
 */
function previewContentSession(role) {
  const session = assertContentRole_('manageRoles', null);
  const nome = String(role || "").toUpperCase().trim();
  const alvo = getContentPermsForRole_(nome);
  if (!alvo) throw new Error("Papel desconhecido: " + role);

  const meu = session.perms;
  const modules = {};
  const alem = [];

  CONTENT_MODULES.forEach(function (m) {
    modules[m] = {};
    contentActionsForModule_(m).forEach(function (acao) {
      const noAlvo = podeNoModulo_(alvo, m, acao);
      const emMim = podeNoModulo_(meu, m, acao);
      modules[m][acao] = noAlvo && emMim;
      if (noAlvo && !emMim) alem.push(m + '.' + acao);
    });
  });

  const global = {};
  CONTENT_GLOBAL_PERMS.forEach(function (g) {
    const noAlvo = podeGlobal_(alvo, g);
    const emMim = podeGlobal_(meu, g);
    global[g] = noAlvo && emMim;
    if (noAlvo && !emMim) alem.push(g);
  });

  const previa = sessionParaPapel_(session.ldap, nome, normalizeRoleMatrix_({
    modules: modules, global: global
  }));

  previa.preview = true;
  previa.realRole = session.role;
  previa.beyond = alem;

  return previa;
}

// Porta única de todas as ações de escrita. Devolve { ldap, role, perms } pra
// quem chamou não precisar reconsultar a planilha.
function assertContentRole_(action, module) {
  const ldap = getCallerLdap_();
  const role = getContentRoleForLdap_(ldap);

  if (!role) throw new Error("Acesso negado: você não tem permissão na Central de Conteúdo.");

  const perms = getContentPermsForRole_(role);
  if (!perms) throw new Error("Acesso negado: o papel '" + role + "' não existe mais.");

  // "Este módulo não existe" e "você não pode ver este módulo" são respostas
  // diferentes, e trocar uma pela outra transforma um erro de digitação num
  // falso problema de acesso. A validação vem primeiro por isso.
  if (module) assertValidModule_(module);

  const negado = "Acesso negado: seu papel (" + role + ") ";

  // Ler é uma casa da matriz como qualquer outra, e é checada ANTES do resto:
  // um `propose` num módulo que a pessoa não enxerga não deve vazar sequer a
  // mensagem de erro específica de escrita.
  if (module && !podeNoModulo_(perms, module, 'view')) {
    throw new Error(negado + "não tem acesso ao módulo '" + module + "'.");
  }

  if (action === 'propose') {
    if (!podeNoModulo_(perms, module, 'propose')) {
      throw new Error(negado + "não edita o módulo '" + module + "'.");
    }
  } else if (action === 'publish') {
    if (!podeNoModulo_(perms, module, 'publish')) {
      throw new Error(negado + "não publica no módulo '" + module + "'.");
    }
  } else if (action === 'rollback') {
    if (!podeNoModulo_(perms, module, 'rollback')) {
      throw new Error(negado + "não republica versão anterior do módulo '" + module + "'.");
    }
  } else if (action === 'approve') {
    // Sem módulo, a pergunta é "é revisor de alguma coisa?" — é o que abre a
    // fila, que depois filtra item a item.
    const podeAlgum = module
      ? podeAprovarModulo_(perms, module)
      : CONTENT_MODULES.some(function (m) { return podeAprovarModulo_(perms, m); });

    if (!podeAlgum) {
      if (module && CONTENT_APPROVAL_REQUIRES_GLOBAL[module] &&
        podeNoModulo_(perms, module, 'approve')) {
        throw new Error(
          negado + "aprova o módulo '" + module + "', mas alterações de autorização " +
          "só quem gerencia acessos aprova."
        );
      }
      throw new Error(negado + "não aprova mudanças" + (module ? " no módulo '" + module + "'." : "."));
    }
  } else if (CONTENT_GLOBAL_PERMS.indexOf(action) !== -1) {
    if (!podeGlobal_(perms, action)) {
      throw new Error(negado + "não tem a permissão '" + action + "'.");
    }
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

/**
 * Registra uma ação da Central em `Content_Log`.
 *
 * `alvo` é um objeto e não uma string por um motivo prático: a linha do log
 * precisa ser LIDA POR MÁQUINA depois. A barra "Atividade recente" só pode
 * esconder de um QA as linhas do módulo `people` se souber que a linha é de
 * `people` — com módulo e chave concatenados em texto livre, a alternativa
 * seria adivinhar por prefixo, e adivinhar errado ali vaza o diretório.
 *
 * Nunca derruba a operação principal: um log que falha não pode desfazer uma
 * publicação que já aconteceu.
 */
function logContentEvent_(ldap, action, alvo, detalhe) {
  try {
    const a = alvo || {};
    getContentSheet_(SHEET_CONTENT_LOG).appendRow([
      newContentId_('log'),
      contentNow_(),
      ldap || 'anon',
      action || '-',
      a.module || '',
      a.key || '',
      a.itemId || '',
      a.label || '',
      detalhe == null ? '' : String(detalhe)
    ]);
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

// Janela de exibição: um aviso pode nascer agendado e morrer sozinho.
//
// Sem isto, "avisar a operação às 8h de segunda" é alguém acordar e clicar, e
// "tirar quando acabar a instabilidade" é alguém lembrar — e o aviso que
// ninguém lembra de tirar continua na tela do agente dizendo que um problema
// resolvido há três dias está acontecendo agora. Aviso velho não é ruído
// neutro: ele ensina o agente a ignorar avisos.
const CONTENT_WINDOWED_MODULES = ['broadcast'];

// `YYYY-MM-DDTHH:MM`, que é exatamente o que um <input type="datetime-local">
// produz. Sem fuso na string de propósito — ver janelaAgora_().
const CONTENT_WINDOW_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * O "agora" com que a janela é comparada.
 *
 * A janela é avaliada NO SERVIDOR, no fuso da planilha (America/São Paulo), e
 * não no relógio de quem lê. A operação atende PT e ES em fusos diferentes: se
 * cada navegador decidisse, "vai ao ar às 8h" seria um horário diferente para
 * cada agente, e quem publicou não teria como saber qual. Um relógio só,
 * declarado na tela, é mais honesto que três relógios implícitos.
 *
 * Comparação como TEXTO: as duas pontas estão no formato `YYYY-MM-DDTHH:MM`,
 * onde a ordem alfabética é a ordem cronológica. Isso evita a armadilha de
 * `new Date('2026-09-05T08:00')`, cujo fuso de interpretação muda conforme o
 * ambiente.
 */
function janelaAgora_() {
  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone ? Session.getScriptTimeZone() : 'America/Sao_Paulo',
    "yyyy-MM-dd'T'HH:mm"
  );
}

/** `{ startsAt, endsAt }` de um item, ou vazio quando o módulo não tem janela. */
function janelaDoItem_(item) {
  if (CONTENT_WINDOWED_MODULES.indexOf(String(item.module || "").trim()) === -1) return {};

  let v;
  try { v = JSON.parse(String(item.value || "{}")); } catch (e) { return {}; }

  return {
    startsAt: CONTENT_WINDOW_RE.test(String(v.startsAt || "")) ? String(v.startsAt) : "",
    endsAt: CONTENT_WINDOW_RE.test(String(v.endsAt || "")) ? String(v.endsAt) : ""
  };
}

/**
 * O item está dentro da janela agora?
 *
 * Ausência de ponta é ausência de restrição: sem `startsAt` já vale, sem
 * `endsAt` não expira. É o comportamento de todo aviso que existe hoje, e é o
 * que garante que ligar esta feature não apague nada.
 */
function itemNaJanela_(item, agora) {
  const j = janelaDoItem_(item);
  if (j.startsAt && agora < j.startsAt) return false;
  if (j.endsAt && agora >= j.endsAt) return false;
  return true;
}

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

  const inicio = String(parsed.startsAt || "").trim();
  const fim = String(parsed.endsAt || "").trim();

  if (inicio && !CONTENT_WINDOW_RE.test(inicio)) {
    throw new Error("Data de início inválida. Use o formato AAAA-MM-DDTHH:MM.");
  }
  if (fim && !CONTENT_WINDOW_RE.test(fim)) {
    throw new Error("Data de fim inválida. Use o formato AAAA-MM-DDTHH:MM.");
  }
  // Uma janela invertida não é um aviso "que ninguém vê": é um aviso que a
  // pessoa acredita ter publicado. Recusar é a única forma de ela descobrir.
  if (inicio && fim && fim <= inicio) {
    throw new Error("O fim do aviso precisa vir depois do início.");
  }

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
  // são assunto seu e poluiriam a fila. A pergunta é por MÓDULO: com a matriz,
  // alguém pode revisar call script e não revisar e-mail.
  if (!podeAprovarModulo_(session.perms, module)) {
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
      d.canReview = podeAprovarModulo_(session.perms, d.module) &&
        (podeGlobal_(session.perms, 'selfApprove') || !d.isSelfProposed);
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
  assertValidModule_(p.module);

  // Um módulo tem um caminho de escrita só. Deixar avisos entrarem também pela
  // fila criaria duas fontes de verdade para "o que está no ar", e a tela teria
  // de reconciliar as duas.
  //
  // Vem ANTES da permissão de propósito: com `propor` e `publicar` virando
  // casas diferentes da matriz (ADR-0009), quem publica aviso deixou de ter
  // `propor` em aviso — e sem esta ordem a resposta a "por que não consigo
  // salvar um rascunho de aviso?" viraria "você não tem acesso", escondendo a
  // resposta verdadeira, que é "aqui não existe rascunho". O regime do módulo é
  // informação pública: a própria navegação da tela o anuncia.
  if (CONTENT_DIRECT_PUBLISH_MODULES.indexOf(p.module) !== -1) {
    throw new Error(
      "O módulo '" + p.module + "' publica direto, sem rascunho. Use publishContentDirect()."
    );
  }

  const session = assertContentRole_('propose', p.module);

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
    if (existing.Proposed_By !== session.ldap && !podeAprovarModulo_(session.perms, p.module)) {
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

    logContentEvent_(
      session.ldap,
      'draft_update',
      { module: p.module, key: p.key, itemId: p.itemId || "", label: p.label || "" },
      p.draftId
    );
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

  logContentEvent_(
    session.ldap,
    'draft_create',
    { module: p.module, key: p.key || "", itemId: p.itemId || "", label: p.label || "" },
    draftId
  );
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

  if (existing.Proposed_By !== session.ldap &&
    !podeAprovarModulo_(session.perms, String(existing.Module).trim())) {
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

  logContentEvent_(
    session.ldap,
    'draft_submit',
    {
      module: String(existing.Module),
      key: String(existing.Key),
      itemId: String(existing.Item_ID || ""),
      label: String(existing.Label || "")
    },
    draftId
  );
  notifyApprovers_(existing, session.ldap);

  return { status: 'success' };
}

/**
 * Descarta um rascunho que ainda não foi enviado.
 *
 * Existe porque o rascunho passou a ser um estado de verdade na tela: quem
 * começa uma alteração e muda de ideia precisa de saída. Sem isto o rascunho
 * fica para sempre — aparece na lista como "rascunho", conta na home de quem o
 * criou, e a próxima edição daquele item continua abrindo o texto abandonado.
 *
 * Só rascunho: uma proposta que JÁ foi enviada se resolve pela revisão
 * (aprovar ou rejeitar), não sumindo por baixo de quem ia revisar.
 *
 * Só quem propôs, ou quem aprova. A regra é a mesma de saveContentDraft(): o
 * rascunho é de quem o escreveu.
 */
function discardContentDraft(draftId) {
  return withContentWriteLock_(function () {
    return discardContentDraftLocked_(draftId);
  });
}

function discardContentDraftLocked_(draftId) {
  const draft = findContentRow_(SHEET_CONTENT_DRAFTS, 'Draft_ID', draftId);
  if (!draft) throw new Error("Rascunho não encontrado.");

  const session = assertContentRole_('propose', String(draft.Module).trim());

  if (String(draft.Status).trim() !== CONTENT_STATUS.DRAFT) {
    throw new Error(
      "Só um rascunho pode ser descartado. Uma proposta em revisão se resolve aprovando ou rejeitando."
    );
  }
  if (String(draft.Proposed_By).trim() !== session.ldap &&
    !podeAprovarModulo_(session.perms, String(draft.Module).trim())) {
    throw new Error("Este rascunho é de outra pessoa.");
  }

  getContentSheet_(SHEET_CONTENT_DRAFTS).deleteRow(draft._row);

  logContentEvent_(
    session.ldap,
    'draft_discard',
    {
      module: String(draft.Module),
      key: String(draft.Key),
      itemId: String(draft.Item_ID || ""),
      label: String(draft.Label || "")
    },
    draftId
  );

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
    const module = String(draftRow.Module || "").trim();
    const approvers = readContentRows_(SHEET_CONTENT_ACCESS)
      .filter(function (r) {
        const role = String(r.Role || "").toUpperCase().trim();
        const active = String(r.Active).toUpperCase().trim();
        if (active !== 'TRUE' && active !== '1') return false;
        // Avisa quem aprova ESTE módulo, não quem aprova alguma coisa: com a
        // matriz, mandar a fila inteira para todo revisor seria ruído.
        return podeAprovarModulo_(getContentPermsForRole_(role), module);
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
    logContentEvent_(
      session.ldap,
      'notify_failed',
      { module: module, key: String(draftRow.Key || ""), label: String(draftRow.Label || "") },
      String(e)
    );
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
  if (String(draft.Proposed_By).trim() === session.ldap && !podeGlobal_(session.perms, 'selfApprove')) {
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

  // A autoaprovação continua marcada, mas agora no DETALHE - antes era um
  // sufixo colado na chave, o que fazia a mesma chave virar duas.
  const selfFlag = (String(draft.Proposed_By).trim() === session.ldap) ? ' (autoaprovação ADMIN)' : '';
  logContentEvent_(
    session.ldap,
    action === CONTENT_ACTIONS.REMOVE ? 'approve_removal' : 'approve',
    {
      module: String(draft.Module),
      key: String(draft.Key),
      itemId: newItemId,
      label: String(draft.Label || "")
    },
    'v' + version + ' por ' + String(draft.Proposed_By) + selfFlag
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

  logContentEvent_(
    session.ldap,
    'reject',
    {
      module: String(draft.Module),
      key: String(draft.Key),
      itemId: String(draft.Item_ID || ""),
      label: String(draft.Label || "")
    },
    note
  );
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

  const session = assertContentRole_('rollback', String(archived.Module).trim());
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
    {
      module: String(archived.Module),
      key: String(archived.Key),
      itemId: newItemId,
      label: String(archived.Label || "")
    },
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

  logContentEvent_(
    session.ldap,
    'removal_request',
    {
      module: String(item.Module),
      key: String(item.Key),
      itemId: String(item.ID),
      label: String(item.Label || "")
    },
    reason || ""
  );
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
  const session = assertContentRole_('publish', module);

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
    { module: module, key: key, itemId: newItemId, label: String(data.label || "") },
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
  const session = assertContentRole_('publish', module);

  if (String(item.Status).trim() !== CONTENT_STATUS.LIVE) {
    throw new Error("Este item já não está no ar.");
  }

  getContentSheet_(SHEET_CONTENT_ITEMS)
    .getRange(item._row, 9)
    .setValue(CONTENT_STATUS.ARCHIVED);

  invalidateContentCache_(module);

  logContentEvent_(
    session.ldap,
    'unpublish_direct',
    {
      module: module,
      key: String(item.Key),
      itemId: itemId,
      label: String(item.Label || "")
    },
    ""
  );
  return { status: 'success', itemId: itemId };
}

// =========================================================
//  GERENCIAR PAPÉIS (matriz editável — ADR-0009)
//
//  As invariantes deste bloco vivem no SERVIDOR e não na tela, por um motivo
//  que o próprio ADR nomeia como o risco central: com a permissão fora do code
//  review, um checkbox errado não dá erro, não aparece em teste e não avisa
//  ninguém — só concede. Validar na tela protegeria contra o engano, não contra
//  a chamada direta.
// =========================================================

/**
 * PRIMEIRA INVARIANTE — anti-lockout.
 *
 * É impossível salvar um estado em que nenhuma pessoa ATIVA tenha, ao mesmo
 * tempo, `manageRoles` e `manageAccess`. Sem as duas juntas não há caminho de
 * volta: quem só gerencia acesso não conserta um papel quebrado, e quem só
 * gerencia papéis não consegue se dar acesso.
 *
 * `mudancaAcesso` é `{ ldap, role, active }`; `mudancaPapel` é
 * `{ role, perms, active }`. Os dois são opcionais — a checagem roda sobre o
 * estado que EXISTIRIA depois, não sobre o atual.
 */
function assertGovernancaSobrevive_(mudancaAcesso, mudancaPapel) {
  const snap = contentPermsSnapshot_();

  const roles = {};
  Object.keys(snap.roles).forEach(function (n) { roles[n] = snap.roles[n]; });

  if (mudancaPapel) {
    if (mudancaPapel.active === false) delete roles[mudancaPapel.role];
    else roles[mudancaPapel.role] = mudancaPapel.perms;
  }

  // Lido da planilha e não do snapshot: o snapshot já descarta quem aponta para
  // um papel inexistente, e reativar um papel precisa recuperar essa gente.
  const access = {};
  readContentRows_(SHEET_CONTENT_ACCESS).forEach(function (r) {
    const ativo = String(r.Active).toUpperCase().trim();
    if (ativo !== 'TRUE' && ativo !== '1') return;
    access[String(r.LDAP || "").toLowerCase().trim()] = String(r.Role || "").toUpperCase().trim();
  });

  if (mudancaAcesso) {
    if (mudancaAcesso.active === false) delete access[mudancaAcesso.ldap];
    else access[mudancaAcesso.ldap] = mudancaAcesso.role;
  }

  const sobram = Object.keys(access).filter(function (l) {
    const p = roles[access[l]];
    return p && podeGlobal_(p, 'manageRoles') && podeGlobal_(p, 'manageAccess');
  });

  if (!sobram.length) {
    throw new Error(
      "Esta alteração deixaria a Central sem ninguém capaz de gerenciar papéis e acessos — " +
      "e não haveria caminho de volta. Dê essas duas permissões a outra pessoa antes."
    );
  }
}

/**
 * SEGUNDA INVARIANTE — escalação declarada.
 *
 * `propor` + `aprovar` no mesmo papel, com `aprovar a própria proposta` ligado,
 * é publicação unilateral: a pessoa escreve e publica sem que ninguém veja.
 * Continua possível — o ADMIN depende disso —, mas nunca por acidente.
 *
 * Devolve os módulos em que o papel publica sozinho.
 */
function modulosComEscalada_(perms) {
  if (!podeGlobal_(perms, 'selfApprove')) return [];

  return CONTENT_MODULES.filter(function (m) {
    return podeNoModulo_(perms, m, 'propose') && podeAprovarModulo_(perms, m);
  });
}

// O que MUDOU, em texto — é o que vai para a auditoria e para o diálogo de
// confirmação. O ADR pede o diff e não o estado final: "agora tem 14 permissões"
// não é uma frase sobre a qual alguém consiga decidir.
function diffDePermissoes_(antes, depois) {
  const linhas = [];
  const de = function (v) { return v ? 'sim' : 'não'; };

  CONTENT_MODULES.forEach(function (m) {
    contentActionsForModule_(m).forEach(function (acao) {
      const a = !!(antes && antes.modules[m] && antes.modules[m][acao]);
      const b = !!(depois.modules[m] && depois.modules[m][acao]);
      if (a !== b) linhas.push(m + '.' + acao + ': ' + de(a) + ' → ' + de(b));
    });
  });

  CONTENT_GLOBAL_PERMS.forEach(function (nome) {
    const a = !!(antes && antes.global[nome]);
    const b = !!depois.global[nome];
    if (a !== b) linhas.push(nome + ': ' + de(a) + ' → ' + de(b));
  });

  return linhas;
}

function contentActionsByModule_() {
  const mapa = {};
  CONTENT_MODULES.forEach(function (m) { mapa[m] = contentActionsForModule_(m); });
  return mapa;
}

/**
 * Só os nomes, para o seletor de papel da aba Acessos.
 *
 * Existe separado de `listContentRoles()` porque quem concede acesso não
 * necessariamente edita papéis — e precisar da matriz inteira para preencher um
 * `<select>` obrigaria a dar a permissão maior para fazer a tarefa menor.
 */
function listContentRoleNames() {
  assertContentRole_('manageAccess', null);
  return Object.keys(contentPermsSnapshot_().roles).sort();
}

/** A matriz inteira, para a tela desenhar. */
function listContentRoles() {
  assertContentRole_('manageRoles', null);

  const snap = contentPermsSnapshot_();
  const pessoas = {};
  Object.keys(snap.access).forEach(function (l) {
    pessoas[snap.access[l]] = (pessoas[snap.access[l]] || 0) + 1;
  });

  return {
    roles: Object.keys(snap.roles).sort().map(function (nome) {
      return {
        role: nome,
        permissions: snap.roles[nome],
        people: pessoas[nome] || 0,
        escalation: modulosComEscalada_(snap.roles[nome])
      };
    }),
    modules: CONTENT_MODULES,
    moduleActions: CONTENT_MODULE_ACTIONS,
    globalPerms: CONTENT_GLOBAL_PERMS,
    // A tela desenha as casas a partir daqui em vez de repetir a regra de
    // regime: catálogo tem `propor`/`aprovar`, operação tem `publicar`.
    actionsByModule: contentActionsByModule_(),
    approvalRequiresGlobal: CONTENT_APPROVAL_REQUIRES_GLOBAL,
    // `true` = a aba não pôde ser lida e isto é o preset do código. A tela
    // precisa dizer isso: editar em cima de um fallback é editar no escuro.
    fallback: snap.fallback
  };
}

/**
 * Cria ou altera um papel.
 *
 * Não escreve e devolve `{ status: 'confirm' }` em dois casos, que são pedidos
 * de declaração e não erros:
 *   - a alteração INTRODUZ publicação unilateral num módulo (invariante 2);
 *   - o papel alterado é o de quem está alterando — passa a valer no ato, e a
 *     sessão precisa ser recarregada.
 *
 * Reenviar com `confirmEscalation` / `confirmSelf` grava.
 */
function saveContentRole(role, permissions, options) {
  const session = assertContentRole_('manageRoles', null);
  const o = options || {};
  const nome = String(role || "").toUpperCase().trim();

  // Nome vira chave em `Content_Access` e cabeçalho de coluna na tela.
  if (!/^[A-Z][A-Z0-9_]{1,23}$/.test(nome)) {
    throw new Error(
      "Nome de papel inválido: use de 2 a 24 letras maiúsculas, números ou '_', começando por letra."
    );
  }

  const ativo = o.active !== false;

  let bruto = permissions;
  if (typeof bruto === 'string') {
    try { bruto = JSON.parse(bruto); }
    catch (e) { throw new Error("Permissões inválidas (JSON malformado)."); }
  }
  const novo = normalizeRoleMatrix_(bruto);

  // QUARTA REGRA — a única casa da matriz que um checkbox não abre sozinho.
  //
  // Marcar "aprova people" num papel que não gerencia acessos não daria erro
  // nenhum em tempo de execução: a aprovação simplesmente seria recusada
  // depois, e a matriz ficaria mentindo na tela. Recusar aqui é o que mantém
  // "o que a matriz diz" e "o que acontece" sendo a mesma coisa.
  Object.keys(CONTENT_APPROVAL_REQUIRES_GLOBAL).forEach(function (m) {
    const exigida = CONTENT_APPROVAL_REQUIRES_GLOBAL[m];
    if (novo.modules[m] && novo.modules[m].approve && !novo.global[exigida]) {
      throw new Error(
        "Aprovar o módulo '" + m + "' exige também a permissão '" + exigida + "': " +
        "quem decide uma mudança de autorização precisa já controlar autorização."
      );
    }
  });

  const snap = contentPermsSnapshot_();
  const antes = snap.roles[nome] || null;

  // Desativar um papel que alguém ainda usa tiraria o acesso dessas pessoas
  // sem que ninguém tenha decidido isso sobre elas.
  if (!ativo) {
    const usando = Object.keys(snap.access).filter(function (l) { return snap.access[l] === nome; });
    if (usando.length) {
      throw new Error(
        "O papel " + nome + " ainda é de " + usando.length +
        (usando.length === 1 ? " pessoa" : " pessoas") +
        ". Mova essas pessoas para outro papel antes de desativá-lo."
      );
    }
  }

  assertGovernancaSobrevive_(null, { role: nome, perms: novo, active: ativo });

  const escaladaNova = (ativo ? modulosComEscalada_(novo) : []).filter(function (m) {
    return !antes || modulosComEscalada_(antes).indexOf(m) === -1;
  });

  const mudancas = diffDePermissoes_(antes, novo);

  if (escaladaNova.length && o.confirmEscalation !== true) {
    return {
      status: 'confirm',
      reason: 'escalation',
      modules: escaladaNova,
      changes: mudancas,
      message: "Com isto, quem tem o papel " + nome + " passa a propor E aprovar a própria " +
        "proposta em " + escaladaNova.join(', ') + " — publica sozinho, sem ninguém revisar."
    };
  }

  if (nome === session.role && o.confirmSelf !== true) {
    return {
      status: 'confirm',
      reason: 'self',
      changes: mudancas,
      message: "Este é o seu próprio papel. A alteração vale no ato, inclusive para você."
    };
  }

  const sheet = getContentSheet_(SHEET_CONTENT_ROLES);
  const existente = findContentRow_(SHEET_CONTENT_ROLES, 'Role', nome);
  const linha = [
    nome,
    JSON.stringify({ modules: novo.modules, global: novo.global }),
    ativo,
    session.ldap,
    contentNow_()
  ];

  if (existente) setContentRowBlock_(sheet, existente._row, 1, linha);
  else sheet.appendRow(linha);

  invalidateContentPermsCache_();

  logContentEvent_(
    session.ldap,
    antes ? 'role_update' : 'role_create',
    { label: nome },
    (mudancas.length ? mudancas.join(' · ') : 'sem mudança de permissão') +
    (ativo ? '' : ' · papel desativado')
  );

  return {
    status: 'success',
    role: nome,
    changes: mudancas,
    // A sessão de quem alterou o próprio papel está desatualizada a partir
    // daqui. A tela recarrega.
    reloadSession: nome === session.role
  };
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
  if (!getContentPermsForRole_(targetRole)) throw new Error("Papel inválido: " + role);

  // Trava de pé-na-porta, agora generalizada (primeira invariante do ADR-0009):
  // antes era "o ADMIN não remove a si mesmo", o que bloqueava a saída legítima
  // de um entre dois admins e não cobria remover o OUTRO. A pergunta certa é se
  // sobra alguém capaz de devolver o acesso.
  assertGovernancaSobrevive_({ ldap: targetLdap, role: targetRole, active: active !== false }, null);

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

  // Sem módulo: o alvo é uma pessoa, não conteúdo. É por isso que a barra
  // lateral filtra esta ação pelo NOME dela, e não pelo módulo.
  logContentEvent_(
    session.ldap,
    'access_change',
    { label: targetLdap },
    targetRole + (isActive ? ' ativo' : ' inativo')
  );

  // Terceira invariante: revogação vale AGORA, não quando o TTL expirar.
  invalidateContentPermsCache_();

  return { status: 'success' };
}

// =========================================================
//  ATIVIDADE (barra lateral) E BACKFILL DO LOG
// =========================================================

// Quantas linhas do fim da aba a barra lateral varre.
//
// A barra responde "o que aconteceu agora", não "o que já aconteceu" — a aba
// de auditoria com filtro, paginação e exportação é outra tela. Varrer a aba
// inteira para mostrar vinte linhas faria o custo desta leitura crescer todo
// dia, com a retenção de 24 meses do ADR-0008, para uma resposta que tem
// sempre o mesmo tamanho.
//
// O preço: quem não pode ver nada do que caiu nesta janela vê a barra vazia,
// mesmo havendo algo visível mais atrás. É o comportamento certo para uma
// barra de "recente" — e é o motivo de a janela ser bem maior que o limite.
const CONTENT_ACTIVITY_WINDOW = 200;
const CONTENT_ACTIVITY_DEFAULT = 20;
const CONTENT_ACTIVITY_MAX = 60;

// Ações cujo alvo é uma PESSOA, não conteúdo. Só quem gerencia acesso as vê.
//
// É a mesma informação que CONTENT_RESTRICTED_READ_MODULES protege na aba
// Pessoas, registrada em outro lugar: "fulano virou TL ontem" responde de
// graça a pergunta de quem procura a quem se passar. Filtrar aqui por AÇÃO, e
// não por módulo, porque esta linha não tem módulo — o alvo dela é um LDAP.
const CONTENT_ACTIVITY_PRIVATE_ACTIONS = ['access_change'];

// A coluna de data pode chegar como texto (o que appendRow grava) ou como Date
// (o que a aba Logs guardava, e o backfill traz). O cliente recebe sempre ISO.
function contentIsoDate_(valor) {
  if (valor instanceof Date) return valor.toISOString();
  return String(valor || "");
}

/**
 * Últimas ações da Central, mais recente primeiro, já filtradas pelo que
 * QUEM PERGUNTA pode ver.
 *
 * O filtro é aqui e não na tela: esconder linha no cliente deixaria o dado
 * viajar até o navegador de quem não devia recebê-lo.
 */
function listContentActivity(limite) {
  const ldap = getCallerLdap_();
  const role = getContentRoleForLdap_(ldap);
  if (!role) throw new Error("Acesso negado: você não tem permissão na Central de Conteúdo.");

  const perms = getContentPermsForRole_(role);
  const quantos = Math.min(
    Math.max(Number(limite) || CONTENT_ACTIVITY_DEFAULT, 1),
    CONTENT_ACTIVITY_MAX
  );

  const sheet = getContentSheet_(SHEET_CONTENT_LOG);
  const ultima = sheet.getLastRow();
  if (ultima < 2) return [];

  const primeira = Math.max(2, ultima - CONTENT_ACTIVITY_WINDOW + 1);
  const values = sheet
    .getRange(primeira, 1, ultima - primeira + 1, CONTENT_LOG_HEADERS.length)
    .getValues();

  const saida = [];

  for (let i = values.length - 1; i >= 0 && saida.length < quantos; i--) {
    const linha = values[i];
    const action = String(linha[3] || "").trim();
    const module = String(linha[4] || "").trim();

    if (CONTENT_ACTIVITY_PRIVATE_ACTIONS.indexOf(action) !== -1 &&
      !podeGlobal_(perms, 'viewAudit')) continue;
    if (module && !podeNoModulo_(perms, module, 'view')) continue;

    saida.push({
      id: String(linha[0] || ""),
      at: contentIsoDate_(linha[1]),
      actor: String(linha[2] || ""),
      action: action,
      module: module,
      key: String(linha[5] || ""),
      itemId: String(linha[6] || ""),
      label: String(linha[7] || ""),
      detail: String(linha[8] || "")
    });
  }

  return saida;
}

// =========================================================
//  BUSCA GLOBAL (Ctrl+K)
// =========================================================

const CONTENT_SEARCH_MIN = 2;
const CONTENT_SEARCH_MAX = 30;

// Faixa dos diacríticos combináveis (U+0300–U+036F), montada por fromCharCode
// em vez de literal `\u` — o mesmo cuidado que o bundle já toma com este
// arquivo servido pelo Apps Script.
const CONTENT_DIACRITICOS = new RegExp(
  '[' + String.fromCharCode(768) + '-' + String.fromCharCode(879) + ']', 'g');

// "anuncio" precisa achar "anúncio". Quem busca não digita acento, e uma busca
// que exige acento é uma busca que a pessoa conclui estar quebrada.
function semAcento_(texto) {
  return String(texto == null ? "" : texto)
    .normalize('NFD')
    .replace(CONTENT_DIACRITICOS, '')
    .toLowerCase();
}

/**
 * Procura em tudo que a pessoa PODE VER, numa varredura só.
 *
 * Uma varredura e não uma por módulo: a alternativa seria a tela pedir os oito
 * módulos e juntar, que é oito execuções do Apps Script por tecla digitada —
 * exatamente o padrão que o ADR-0008 existe para não repetir.
 *
 * O filtro de leitura é o mesmo `view` da matriz. Uma busca que ignora
 * permissão é a porta dos fundos mais fácil de esquecer que existe: o módulo
 * `people` sairia inteiro num "a".
 */
function searchContentItems(termo) {
  const ldap = getCallerLdap_();
  const role = getContentRoleForLdap_(ldap);
  if (!role) throw new Error("Acesso negado: você não tem permissão na Central de Conteúdo.");

  const alvo = semAcento_(termo).trim();
  if (alvo.length < CONTENT_SEARCH_MIN) return [];

  const perms = getContentPermsForRole_(role);
  const visiveis = {};
  CONTENT_MODULES.forEach(function (m) {
    if (podeNoModulo_(perms, m, 'view')) visiveis[m] = true;
  });

  const achados = [];

  const linhas = readContentRows_(SHEET_CONTENT_ITEMS);
  for (let i = 0; i < linhas.length && achados.length < CONTENT_SEARCH_MAX; i++) {
    const r = linhas[i];
    if (String(r.Status).trim() !== CONTENT_STATUS.LIVE) continue;

    const module = String(r.Module).trim();
    if (!visiveis[module]) continue;

    const label = String(r.Label || "");
    const key = String(r.Key || "");
    const value = String(r.Value || "");

    if (semAcento_(label + ' ' + key + ' ' + value).indexOf(alvo) === -1) continue;

    achados.push({
      id: String(r.ID || ""),
      module: module,
      key: key,
      label: label,
      lang: String(r.Lang || 'ALL'),
      // Um pedaço do valor ao redor do que casou, para a lista distinguir dois
      // itens de nome parecido sem obrigar a abrir os dois.
      snippet: trechoDaBusca_(value, alvo)
    });
  }

  return achados;
}

// O valor pode ser JSON, e um JSON cru no resultado atrapalha mais do que
// ajuda. Corta ao redor do que casou e tira as marcas de estrutura.
function trechoDaBusca_(value, alvo) {
  const limpo = String(value || "")
    .replace(/[{}"\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const onde = semAcento_(limpo).indexOf(alvo);
  if (onde === -1) return limpo.slice(0, 90);

  const inicio = Math.max(0, onde - 30);
  return (inicio ? '…' : '') + limpo.slice(inicio, inicio + 90) +
    (limpo.length > inicio + 90 ? '…' : '');
}

// =========================================================
//  COBRANÇA DE PENDÊNCIA PARADA
//
//  A fila avisa quem aprova UMA vez, no momento em que a proposta entra. Se
//  ninguém abrir o e-mail naquele dia, a proposta some do radar: quem propôs
//  acha que está em análise, quem aprova nunca soube, e o item fica parado por
//  semanas sem que o sistema tenha errado em nada.
//
//  Roda por gatilho de tempo. Criar o gatilho é passo manual pelo editor do
//  Apps Script, uma vez — mesma nota que o Backup.js já carrega.
// =========================================================

// Dias corridos, não úteis. Contar dias úteis exigiria um calendário de
// feriados que este projeto não tem, e errar para MAIS avisos é o lado barato
// do erro: uma cobrança a mais numa segunda incomoda, uma cobrança a menos
// deixa a proposta parada.
const CONTENT_STALE_DAYS = 2;

// Teto de itens listados por e-mail. Acima disso o e-mail vira parede de texto
// que ninguém lê — e a Central está a um clique.
const CONTENT_STALE_MAX_LISTED = 10;

function contentStaleCutoff_() {
  const d = new Date();
  d.setDate(d.getDate() - CONTENT_STALE_DAYS);
  return d.toISOString();
}

/**
 * As propostas paradas, agrupadas POR QUEM PODE RESOLVÊ-LAS.
 *
 * Agrupar por aprovador e não mandar a fila inteira para todo mundo é o que
 * evita a cobrança virar ruído: um QA recebendo pendência de e-mail que ele não
 * revisa aprende a apagar o e-mail sem ler.
 */
function staleContentApprovals_() {
  const corte = contentStaleCutoff_();

  const paradas = readContentRows_(SHEET_CONTENT_DRAFTS)
    .filter(function (r) {
      return String(r.Status).trim() === CONTENT_STATUS.PENDING &&
        String(r.Proposed_At || "") < corte;
    })
    .map(mapDraftRow_);

  if (!paradas.length) return { stale: [], porPessoa: {} };

  const porPessoa = {};

  readContentRows_(SHEET_CONTENT_ACCESS).forEach(function (r) {
    const ativo = String(r.Active).toUpperCase().trim();
    if (ativo !== 'TRUE' && ativo !== '1') return;

    const ldap = String(r.LDAP || "").toLowerCase().trim();
    const perms = getContentPermsForRole_(String(r.Role || "").toUpperCase().trim());
    if (!ldap || !perms) return;

    const minhas = paradas.filter(function (d) {
      if (!podeAprovarModulo_(perms, d.module)) return false;
      // Não cobrar alguém pela própria proposta: quem não pode se
      // autoaprovar receberia um lembrete de algo que não consegue resolver.
      if (d.proposedBy === ldap && !podeGlobal_(perms, 'selfApprove')) return false;
      return true;
    });

    if (minhas.length) porPessoa[ldap] = minhas;
  });

  return { stale: paradas, porPessoa: porPessoa };
}

/** Leitura da cobrança, para conferir antes de deixar o gatilho rodar sozinho. */
function listStaleContentApprovals() {
  assertContentRole_('approve', null);

  const r = staleContentApprovals_();
  return {
    days: CONTENT_STALE_DAYS,
    stale: r.stale.length,
    recipients: Object.keys(r.porPessoa).sort().map(function (ldap) {
      return { ldap: ldap, items: r.porPessoa[ldap].length };
    })
  };
}

/**
 * O disparo diário. Sem argumentos, para caber num gatilho de tempo.
 *
 * Nunca lança: um gatilho que falha some do radar do mesmo jeito que a
 * pendência que ele existe para lembrar. O que der errado vai para o log.
 */
function notifyStaleContentApprovals() {
  try {
    const r = staleContentApprovals_();
    const destinatarios = Object.keys(r.porPessoa);

    if (!destinatarios.length) {
      return { status: 'ok', stale: r.stale.length, notified: 0 };
    }

    // Link montado a partir do MAPA de implantações, não de getUrl(): num
    // gatilho de tempo o serviço pode devolver a URL de outra implantação, e a
    // pessoa cairia no ambiente errado. Ver buildProductionPageUrl().
    const url = buildProductionPageUrl('content');

    destinatarios.forEach(function (ldap) {
      const itens = r.porPessoa[ldap];
      const listados = itens.slice(0, CONTENT_STALE_MAX_LISTED);

      const linhas = listados.map(function (d) {
        return '<li><strong>' + d.label + '</strong> — ' + d.module +
          ' · proposto por ' + d.proposedBy + '</li>';
      }).join('');

      const sobra = itens.length > listados.length
        ? '<p>…e mais ' + (itens.length - listados.length) + '.</p>' : '';

      MailApp.sendEmail({
        to: ldap + '@google.com',
        subject: '⏳ Central de Conteúdo: ' + itens.length +
          (itens.length === 1 ? ' proposta parada' : ' propostas paradas'),
        htmlBody:
          '<p>Estas propostas estão esperando revisão há mais de ' +
          CONTENT_STALE_DAYS + ' dias:</p><ul>' + linhas + '</ul>' + sobra +
          '<p><a href="' + url + '">Abrir a Central de Conteúdo</a></p>',
        name: 'Cases Wizard'
      });
    });

    logContentEvent_('system', 'stale_digest', {},
      r.stale.length + ' paradas · ' + destinatarios.length + ' avisados');

    return { status: 'ok', stale: r.stale.length, notified: destinatarios.length };
  } catch (e) {
    logContentEvent_('system', 'stale_digest_failed', {}, String(e));
    return { status: 'error', error: String(e) };
  }
}

// =========================================================
//  AUDITORIA COMPLETA (aba restrita)
//
//  A barra lateral responde "o que aconteceu agora"; esta responde "o que
//  aconteceu". São perguntas diferentes e por isso duas portas diferentes: a
//  barra tem janela fixa e nenhum filtro, esta tem filtro, paginação e teto de
//  varredura por chamada.
// =========================================================

// Quantas linhas uma chamada pode VARRER (não devolver). O Apps Script tem 6
// minutos de execução e a aba guarda 24 meses: sem teto, um filtro que casa com
// pouca coisa faria a chamada percorrer a aba inteira e estourar. Com teto, ela
// devolve o que achou mais um cursor, e a tela pede a próxima leva.
const CONTENT_AUDIT_SCAN_MAX = 3000;
const CONTENT_AUDIT_PAGE = 50;
const CONTENT_AUDIT_PAGE_MAX = 200;
const CONTENT_AUDIT_EXPORT_MAX = 5000;
const SHEET_CONTENT_AUDIT_EXPORT = "Content_Audit_Export";

function textoDoFiltro_(f, chave) {
  return String((f && f[chave]) || "").trim();
}

// `from`/`to` são datas (AAAA-MM-DD) e o carimbo é ISO. Comparar como texto
// funciona porque o ISO começa exatamente pela data — e `to` vira `to + 'Z'`
// para o dia final entrar inteiro em vez de parar à meia-noite.
function linhaCasaFiltro_(linha, f) {
  const at = contentIsoDate_(linha[1]);
  const actor = String(linha[2] || "");
  const action = String(linha[3] || "");
  const module = String(linha[4] || "");

  if (f.actor && actor.toLowerCase() !== f.actor.toLowerCase()) return false;
  if (f.action && action !== f.action) return false;
  if (f.module && module !== f.module) return false;
  if (f.from && at < f.from) return false;
  if (f.to && at > f.to + 'Z') return false;

  if (f.text) {
    const alvo = (String(linha[5] || "") + ' ' + String(linha[7] || "") + ' ' +
      String(linha[8] || "")).toLowerCase();
    if (alvo.indexOf(f.text.toLowerCase()) === -1) return false;
  }

  return true;
}

function linhaDeAuditoria_(linha) {
  return {
    id: String(linha[0] || ""),
    at: contentIsoDate_(linha[1]),
    actor: String(linha[2] || ""),
    action: String(linha[3] || ""),
    module: String(linha[4] || ""),
    key: String(linha[5] || ""),
    itemId: String(linha[6] || ""),
    label: String(linha[7] || ""),
    detail: String(linha[8] || "")
  };
}

/**
 * A auditoria, da mais recente para a mais antiga, filtrada e paginada.
 *
 * `cursor` é o número da linha da planilha em que a varredura anterior parou.
 * Paginar por número de linha, e não por "pule N resultados", é o que mantém o
 * custo de cada página igual: pular resultados obrigaria a refiltrar tudo que
 * já foi mostrado.
 *
 * A ordem por linha É a ordem cronológica, e isso não é sorte: a aba só é
 * ANEXADA, e o backfill reordena pela data o que traz da aba `Logs`. Ordenar
 * 15 mil linhas a cada consulta para chegar ao mesmo resultado seria pagar
 * duas vezes.
 */
function listContentAudit(filtro) {
  assertContentRole_('viewAudit', null);

  const f = filtro || {};
  const filtros = {
    actor: textoDoFiltro_(f, 'actor'),
    action: textoDoFiltro_(f, 'action'),
    module: textoDoFiltro_(f, 'module'),
    from: textoDoFiltro_(f, 'from'),
    to: textoDoFiltro_(f, 'to'),
    text: textoDoFiltro_(f, 'text')
  };

  const limite = Math.min(
    Math.max(Number(f.limit) || CONTENT_AUDIT_PAGE, 1), CONTENT_AUDIT_PAGE_MAX);

  const sheet = getContentSheet_(SHEET_CONTENT_LOG);
  const ultima = sheet.getLastRow();
  if (ultima < 2) return { rows: [], nextCursor: 0, scanned: 0, done: true };

  // Sem cursor, começa do fim. Com cursor, continua de onde parou.
  let fim = Number(f.cursor) > 0 ? Number(f.cursor) : ultima;
  if (fim < 2) return { rows: [], nextCursor: 0, scanned: 0, done: true };

  const rows = [];
  let varridas = 0;
  const BLOCO = 200;

  while (fim >= 2 && rows.length < limite && varridas < CONTENT_AUDIT_SCAN_MAX) {
    const inicio = Math.max(2, fim - BLOCO + 1);
    const valores = sheet
      .getRange(inicio, 1, fim - inicio + 1, CONTENT_LOG_HEADERS.length)
      .getValues();

    for (let i = valores.length - 1; i >= 0 && rows.length < limite; i--) {
      varridas++;
      if (linhaCasaFiltro_(valores[i], filtros)) rows.push(linhaDeAuditoria_(valores[i]));
      // A próxima chamada retoma UMA linha acima da última examinada.
      fim = inicio + i - 1;
    }

    if (rows.length < limite) fim = inicio - 1;
  }

  return {
    rows: rows,
    nextCursor: fim >= 2 ? fim : 0,
    scanned: varridas,
    // `done` é sobre a ABA ter acabado, não sobre a página ter enchido: uma
    // página curta porque o teto de varredura foi atingido não significa que
    // não há mais nada.
    done: fim < 2
  };
}

/**
 * Exporta o resultado do filtro para uma aba da própria planilha.
 *
 * Sheets em vez de arquivo: a Central roda dentro de um iframe do Apps Script,
 * onde download iniciado pela página é bloqueado com frequência e sem aviso.
 * Uma aba é o formato que esta operação já sabe abrir, filtrar e baixar — e não
 * pede permissão nenhuma que o projeto ainda não tenha.
 *
 * Sobrescreve sempre a mesma aba, de propósito: uma aba por exportação encheria
 * a planilha de lixo que ninguém apaga.
 */
function exportContentAudit(filtro) {
  const session = assertContentRole_('viewAudit', null);

  const linhas = [];
  let cursor = 0;

  // Pagina pela própria listContentAudit: um caminho de filtro só, para o que
  // se exporta ser exatamente o que se viu na tela.
  while (linhas.length < CONTENT_AUDIT_EXPORT_MAX) {
    const pagina = listContentAudit(Object.assign({}, filtro, {
      cursor: cursor, limit: CONTENT_AUDIT_PAGE_MAX
    }));

    pagina.rows.forEach(function (r) {
      if (linhas.length < CONTENT_AUDIT_EXPORT_MAX) {
        linhas.push([r.at, r.actor, r.action, r.module, r.key, r.itemId, r.label, r.detail]);
      }
    });

    if (pagina.done || !pagina.nextCursor || !pagina.rows.length) break;
    cursor = pagina.nextCursor;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheetByName(SHEET_CONTENT_AUDIT_EXPORT);
  if (aba) aba.clear();
  else aba = ss.insertSheet(SHEET_CONTENT_AUDIT_EXPORT);

  const cabecalho = ["Quando", "Quem", "Ação", "Módulo", "Chave", "Item", "Rótulo", "Detalhe"];
  aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  if (linhas.length) {
    aba.getRange(2, 1, linhas.length, cabecalho.length).setValues(linhas);
  }
  aba.setFrozenRows(1);

  logContentEvent_(session.ldap, 'audit_export', { label: SHEET_CONTENT_AUDIT_EXPORT },
    linhas.length + ' linhas');

  return {
    sheet: SHEET_CONTENT_AUDIT_EXPORT,
    rows: linhas.length,
    truncated: linhas.length >= CONTENT_AUDIT_EXPORT_MAX,
    url: ss.getUrl ? ss.getUrl() : ''
  };
}

// Prefixo do ID das linhas trazidas da aba Logs. É o que torna o backfill
// idempotente: o ID deriva do NÚMERO DA LINHA de origem, então rodar de novo
// reconhece o que já veio em vez de duplicar.
const CONTENT_LOG_BACKFILL_PREFIX = 'log_bf_';

// O sufixo que a autoaprovação colava na chave no formato antigo.
const CONTENT_LEGACY_SELF_APPROVE = ' (autoaprovação ADMIN)';

/**
 * Reparte o `Label` do formato antigo nas colunas novas.
 *
 * O formato era `módulo/chave`, com duas exceções que precisam ser
 * reconhecidas em vez de forçadas: `access_change` guardava um LDAP, e `seed`
 * guardava só o módulo. Um `Label` cujo prefixo não é um módulo conhecido vira
 * rótulo — o log de dois anos atrás não tem obrigação de caber no esquema de
 * hoje, e inventar um módulo para ele seria pior do que deixá-lo sem.
 */
function parseLegacyContentTarget_(action, label) {
  const texto = String(label || "").trim();

  if (action === 'access_change') return { label: texto, autoAprovacao: false };
  if (!texto) return { autoAprovacao: false };

  const auto = texto.slice(-CONTENT_LEGACY_SELF_APPROVE.length) === CONTENT_LEGACY_SELF_APPROVE;
  const limpo = auto ? texto.slice(0, -CONTENT_LEGACY_SELF_APPROVE.length) : texto;

  const corte = limpo.indexOf('/');
  const module = corte === -1 ? limpo : limpo.slice(0, corte);

  if (CONTENT_MODULES.indexOf(module) === -1) {
    return { label: limpo, autoAprovacao: auto };
  }

  return {
    module: module,
    key: corte === -1 ? "" : limpo.slice(corte + 1),
    autoAprovacao: auto
  };
}

/**
 * Traz para `Content_Log` o histórico que ficou na aba `Logs`.
 *
 * COPIA, não move: a aba `Logs` continua intacta. Um backfill que apaga a
 * origem só pode ser conferido depois de já não haver com o que comparar.
 *
 * SIMULA por padrão, como manda o ADR-0008 para todo job que mexe em volume:
 * `backfillContentLog()` só conta o que traria; `backfillContentLog(true)`
 * escreve. É idempotente pelo ID derivado da linha de origem, então rodar de
 * novo depois de novas linhas antigas aparecerem traz só as que faltam.
 */
function backfillContentLog(aplicar) {
  assertContentRole_('viewAudit', null);

  return withContentWriteLock_(function () {
    const origem = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_LOGS);
    if (!origem) {
      return { lidas: 0, candidatas: 0, jaImportadas: 0, novas: 0, aplicado: false };
    }

    const values = origem.getDataRange().getValues();
    const destino = getContentSheet_(SHEET_CONTENT_LOG);

    const jaTem = {};
    const existentes = readContentRows_(SHEET_CONTENT_LOG);
    for (let i = 0; i < existentes.length; i++) {
      jaTem[String(existentes[i].Log_ID || "").trim()] = true;
    }

    let candidatas = 0;
    let jaImportadas = 0;
    const novas = [];

    for (let i = 1; i < values.length; i++) {
      if (String(values[i][3] || "").trim() !== 'ContentCentral') continue;
      candidatas++;

      const id = CONTENT_LOG_BACKFILL_PREFIX + (i + 1);
      if (jaTem[id]) { jaImportadas++; continue; }

      const action = String(values[i][4] || "").trim();
      const alvo = parseLegacyContentTarget_(action, values[i][5]);
      const detalhe = String(values[i][6] == null ? "" : values[i][6]) +
        (alvo.autoAprovacao ? CONTENT_LEGACY_SELF_APPROVE : "");

      novas.push([
        id,
        contentIsoDate_(values[i][0]),
        String(values[i][1] || 'anon'),
        action || '-',
        alvo.module || "",
        alvo.key || "",
        "",
        alvo.label || "",
        detalhe
      ]);
    }

    if (aplicar === true && novas.length) {
      destino
        .getRange(destino.getLastRow() + 1, 1, novas.length, CONTENT_LOG_HEADERS.length)
        .setValues(novas);

      // As linhas trazidas entram no FIM da aba, mas são as mais ANTIGAS.
      // Sem reordenar, a barra lateral — que lê justamente as últimas linhas —
      // mostraria o histórico de dois anos atrás como se fosse o de agora.
      //
      // Ordenar pela coluna de data funciona porque ela é ISO 8601 em texto,
      // onde a ordem alfabética É a ordem cronológica.
      destino
        .getRange(2, 1, destino.getLastRow() - 1, CONTENT_LOG_HEADERS.length)
        .sort({ column: 2, ascending: true });
    }

    return {
      lidas: Math.max(values.length - 1, 0),
      candidatas: candidatas,
      jaImportadas: jaImportadas,
      novas: novas.length,
      aplicado: aplicar === true && novas.length > 0
    };
  });
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

  const itens = readLiveItemsCached_(module);
  if (CONTENT_WINDOWED_MODULES.indexOf(module) === -1) return itens;

  // O filtro vem DEPOIS do cache, não dentro dele. Dentro, um aviso agendado
  // para as 10h ficaria de fora da entrada gravada às 9h58 e só apareceria
  // quando o TTL expirasse — a janela passaria a ter a precisão do cache em vez
  // da sua própria. Assim o cache guarda "o que está publicado" e a janela
  // decide "o que vale agora", que são perguntas diferentes.
  const agora = janelaAgora_();
  return itens.filter(function (it) { return itemNaJanela_(it, agora); });
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
  // Semear escreve direto em Content_Items, então a permissão pedida é a do
  // caminho de escrita do módulo — `publicar` na operação, `propor` no catálogo.
  assertContentRole_(
    CONTENT_DIRECT_PUBLISH_MODULES.indexOf(module) !== -1 ? 'publish' : 'propose',
    module
  );

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

  logContentEvent_(session.ldap, 'seed', { module: module }, rows.length + ' itens');
  return { status: 'success', seeded: rows.length };
}
