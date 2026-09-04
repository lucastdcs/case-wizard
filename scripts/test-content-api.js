// scripts/test-content-api.js
//
// Harness local para exercitar a máquina de estados do ContentAPI.gs, que não
// tem como rodar no Apps Script sem uma planilha de verdade. Stub mínimo de
// SpreadsheetApp/Session/MailApp, o suficiente pra provar as regras que a
// Central de Conteúdo existe pra garantir:
//   - rascunho e proposta pendente nunca aparecem na leitura pública;
//   - só o ADMIN aprova a própria proposta (e isso vai pro log);
//   - aprovar uma remoção arquiva o item, não publica uma linha vazia;
//   - rollback e histórico agem sobre um item, não sobre a categoria inteira;
//   - quem não tem papel ativo não lê nem escreve nada.
//
// Uso: npm run test:content

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'gas-backend', 'ContentAPI.js');

// ---- Stub de planilha ----
// O range real conhece a coluna de origem: setValues() escreve um BLOCO a
// partir de (row, col), não a linha inteira. O stub antigo ignorava a coluna e
// substituía a linha toda - o que passava enquanto todo mundo escrevia célula a
// célula, e mentiria agora que as escritas são em lote.
class FakeRange {
  constructor(sheet, row, col, numRows, numCols) {
    this.sheet = sheet;
    this.row = row;
    this.col = col;
    this.numRows = numRows;
    this.numCols = numCols;
  }
  setValue(v) { this.sheet._data[this.row - 1][this.col - 1] = v; return this; }
  setValues(rows) {
    rows.forEach((r, i) => {
      const target = this.row - 1 + i;
      while (this.sheet._data.length <= target) this.sheet._data.push([]);
      const line = this.sheet._data[target];
      r.forEach((v, j) => { line[this.col - 1 + j] = v; });
    });
    return this;
  }
  // Só o suficiente para o backfill: ordenar um bloco por uma coluna. Existe
  // porque o backfill ANEXA linhas antigas no fim da aba e precisa reordenar -
  // sem isso o teste não veria o bug que a ordenação conserta.
  sort(spec) {
    const col = (typeof spec === 'object' ? spec.column : spec) - 1;
    const asc = (typeof spec === 'object') ? spec.ascending !== false : true;
    const inicio = this.row - 1;
    const quantas = this.numRows || (this.sheet._data.length - inicio);
    const bloco = this.sheet._data.splice(inicio, quantas);
    bloco.sort((a, b) => {
      const x = String(a[col] == null ? '' : a[col]);
      const y = String(b[col] == null ? '' : b[col]);
      return (x < y ? -1 : x > y ? 1 : 0) * (asc ? 1 : -1);
    });
    this.sheet._data.splice(inicio, 0, ...bloco);
    return this;
  }
  getValues() {
    // getDataRange() (col 1, sem limites) segue devolvendo a aba inteira.
    if (this.col === 1 && !this.numCols) return this.sheet._data.map(r => r.slice());
    return this.sheet._data
      .slice(this.row - 1, this.row - 1 + (this.numRows || 1))
      .map(r => r.slice(this.col - 1, this.col - 1 + (this.numCols || 1)));
  }
}

class FakeSheet {
  constructor(name) { this.name = name; this._data = []; }
  appendRow(row) { this._data.push(row.slice()); }
  getDataRange() { return new FakeRange(this, 1, 1); }
  getRange(row, col, numRows, numCols) { return new FakeRange(this, row, col, numRows, numCols); }
  getLastRow() { return this._data.length; }
  // Os outros dublês do projeto já modelavam isto; este ficou para trás até
  // discardContentDraft() precisar remover uma linha de verdade.
  deleteRow(i) { this._data.splice(i - 1, 1); }
  setFrozenRows() { return this; }
}

class FakeSpreadsheet {
  constructor() { this.sheets = {}; }
  getSheetByName(n) { return this.sheets[n] || null; }
  insertSheet(n) { return (this.sheets[n] = new FakeSheet(n)); }
}

// ---- Ambiente ----
let CURRENT_USER = 'lucaste@google.com';
const SS = new FakeSpreadsheet();
const SENT_MAIL = [];
const LOGGED = [];

const LOGGER = [];

// Trava e cache: o código de produção degrada sozinho quando os serviços não
// existem, mas então os testes não exercitariam nem a trava nem a invalidação.
// Com stub, dá pra provar as duas - inclusive que a trava é liberada mesmo
// quando o corpo lança.
const LOCK_STATE = { held: false, acquires: 0, releases: 0, denyNext: false };
const CACHE = new Map();

const sandbox = {
  LockService: {
    getScriptLock: () => ({
      tryLock: () => {
        if (LOCK_STATE.denyNext) { LOCK_STATE.denyNext = false; return false; }
        if (LOCK_STATE.held) return false;
        LOCK_STATE.held = true; LOCK_STATE.acquires++; return true;
      },
      releaseLock: () => { LOCK_STATE.held = false; LOCK_STATE.releases++; }
    })
  },
  CacheService: {
    getScriptCache: () => ({
      get: (k) => (CACHE.has(k) ? CACHE.get(k) : null),
      put: (k, v) => { CACHE.set(k, v); },
      remove: (k) => { CACHE.delete(k); }
    })
  },
  SpreadsheetApp: { getActiveSpreadsheet: () => SS },
  Session: { getActiveUser: () => ({ getEmail: () => CURRENT_USER }) },
  MailApp: { sendEmail: (o) => SENT_MAIL.push(o) },
  Logger: { log: (m) => LOGGER.push(m) },
  Utilities: { getUuid: () => require('node:crypto').randomUUID() },
  handleLog: (p) => LOGGED.push(p),
  console,
};

const vm = require('node:vm');
const ctx = vm.createContext(sandbox);

// Código.gs primeiro: é dele que vêm SHEET_PEOPLE, isOverheadRoleCategory() e
// defaultLanguageForSegment(), que o PeopleAPI.gs usa pelo escopo global
// compartilhado. Ele também DECLARA handleLog(), sobrescrevendo o stub do
// sandbox - por isso a captura de log é reapontada logo abaixo, depois de
// todos os arquivos entrarem.
const CORE_SRC = path.join(__dirname, '..', 'gas-backend', 'Código.js');
vm.runInContext(fs.readFileSync(CORE_SRC, 'utf8'), ctx);

vm.runInContext(fs.readFileSync(SRC, 'utf8'), ctx);

// PeopleAPI.gs não é opcional para o ContentAPI: approveContentDraft(),
// saveContentDraft() e listPendingApprovals() desviam para ele quando o módulo
// é 'people'. No Apps Script os dois arquivos estão sempre no mesmo projeto -
// carregar só um aqui testaria um ambiente que não existe.
const PEOPLE_SRC = path.join(__dirname, '..', 'gas-backend', 'PeopleAPI.js');
vm.runInContext(fs.readFileSync(PEOPLE_SRC, 'utf8'), ctx);

// Devolve o handleLog ao stub que o teste inspeciona (o do Código.gs escreveria
// numa aba Logs de verdade).
// A auditoria da Central não passa mais por aqui — ela escreve na aba
// `Content_Log`. handleLog() continua neutralizado porque ele é o log de SESSÃO
// do agente: deixá-lo escrever criaria uma aba `Logs` de verdade por baixo dos
// testes, justamente a aba de onde o backfill lê seu fixture.
sandbox.__captureLog = (p) => LOGGED.push(p);
vm.runInContext('handleLog = __captureLog;', ctx);

// O arquivo de semeadura entra no mesmo escopo global, como no Apps Script -
// é assim que seedLinksNow() enxerga seedContentModule() sem nenhum import.
const SEED_SRC = path.join(__dirname, '..', 'gas-backend', 'ContentSeed_Links.js');
vm.runInContext(fs.readFileSync(SEED_SRC, 'utf8'), ctx);

// Catálogo de campos da nota: no Apps Script ele é só mais um global, e é assim
// que assertValidNoteField_() o enxerga sem nenhum import.
const FIELDS_SRC = path.join(__dirname, '..', 'gas-backend', 'ContentFields_Notes.js');
vm.runInContext(fs.readFileSync(FIELDS_SRC, 'utf8'), ctx);

const api = sandbox;

// ---- Runner ----
let pass = 0, fail = 0;
function check(name, fn) {
  try { fn(); console.log('  ✓ ' + name); pass++; }
  catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function eq(a, b, m) {
  const A = JSON.stringify(a), B = JSON.stringify(b);
  if (A !== B) throw new Error((m || '') + ' esperado ' + B + ', veio ' + A);
}
function verdadeiro(cond, m) { if (!cond) throw new Error(m || 'esperado verdadeiro'); }
function throws(fn, re, m) {
  try { fn(); } catch (e) {
    if (re && !re.test(e.message)) throw new Error((m || '') + ' erro inesperado: ' + e.message);
    return;
  }
  throw new Error((m || '') + ' deveria ter lançado erro');
}
function as(ldap, fn) { const old = CURRENT_USER; CURRENT_USER = ldap + '@google.com'; try { return fn(); } finally { CURRENT_USER = old; } }

// A auditoria deixou de ser linha na aba `Logs` genérica e virou a aba
// `Content_Log`, com uma coluna por informação. Lê-la aqui como objeto é o
// mesmo que a tela faz.
function logDaCentral() {
  const aba = SS.getSheetByName('Content_Log');
  if (!aba || aba._data.length < 2) return [];
  const cab = aba._data[0];
  return aba._data.slice(1).map(linha => {
    const o = {};
    cab.forEach((h, i) => { o[h] = linha[i]; });
    return o;
  });
}

console.log('\n--- Acesso e papéis ---');

check('ADMIN semeado automaticamente na criação da aba', () => {
  const s = api.getContentSession();
  eq(s.role, 'ADMIN');
  eq(s.hasAccess, true);
  eq(s.canManageAccess, true);
});

check('LDAP desconhecido não tem acesso nenhum', () => {
  as('estranho', () => {
    const s = api.getContentSession();
    eq(s.hasAccess, false);
    eq(s.role, null);
  });
});

check('LDAP desconhecido não consegue nem listar', () => {
  as('estranho', () => {
    throws(() => api.listContentItems('links'), /Acesso negado/);
  });
});

check('ADMIN concede acesso a um QA', () => {
  api.saveContentAccess('quality1', 'QA', true);
  as('quality1', () => {
    const s = api.getContentSession();
    eq(s.role, 'QA');
    eq(s.canApprove, false);
    eq(s.proposableModules, ['call_script', 'note_template']);
  });
});

check('QA não propõe em links (fora do seu escopo)', () => {
  as('quality1', () => {
    throws(() => api.saveContentDraft({ module: 'links', key: 'tech', label: 'X', value: '{}' }),
      /não edita o módulo/);
  });
});

check('QA não aprova nada', () => {
  as('quality1', () => {
    throws(() => api.listPendingApprovals(), /não aprova/);
  });
});

check('o último que governa a Central não consegue se remover', () => {
  // Antes a regra era "o ADMIN não remove a si mesmo". Agora a pergunta é se
  // SOBRA alguém capaz de devolver o acesso — a mesma trava, generalizada
  // (primeira invariante do ADR-0009).
  throws(() => api.saveContentAccess('lucaste', 'ADMIN', false),
    /sem ninguém capaz de gerenciar papéis e acessos/);
});

console.log('\n--- Rascunho não vaza para produção ---');

let draftId;
check('salvar rascunho não publica nada', () => {
  const r = api.saveContentDraft({
    module: 'links', key: 'tech', lang: 'ALL', label: 'RegExr',
    value: JSON.stringify({ name: 'RegExr', url: 'https://regexr.com', desc: 'Regex' })
  });
  draftId = r.draftId;
  eq(api.listContentItems('links').length, 0, 'nenhum item live após salvar rascunho:');
});

check('leitura pública não enxerga rascunho', () => {
  eq(api.handleContentPublicRead({ module: 'links' }).items.length, 0);
});

check('enviar para revisão ainda não publica', () => {
  api.submitContentDraft(draftId);
  eq(api.listContentItems('links').length, 0, 'nenhum item live após submit:');
  eq(api.handleContentPublicRead({ module: 'links' }).items.length, 0);
});

check('proposta aparece na fila de revisão', () => {
  const q = api.listPendingApprovals();
  eq(q.length, 1);
  eq(q[0].proposedBy, 'lucaste');
  eq(q[0].isNew, true);
});

console.log('\n--- Autoaprovação ---');

check('ADMIN pode aprovar a própria proposta (exceção pedida)', () => {
  const q = api.listPendingApprovals();
  eq(q[0].isSelfProposed, true);
  eq(q[0].canReview, true, 'ADMIN pode revisar o próprio:');
  const r = api.approveContentDraft(draftId, '');
  eq(r.version, 1);
});

check('só agora o item está no ar', () => {
  const live = api.listContentItems('links');
  eq(live.length, 1);
  eq(live[0].label, 'RegExr');
  eq(api.handleContentPublicRead({ module: 'links' }).items.length, 1);
});

check('autoaprovação fica registrada no log', () => {
  const entry = logDaCentral().filter(l => l.Action === 'approve').pop();
  // O sufixo mudou de coluna: era colado na chave, o que fazia a MESMA chave
  // virar duas para quem filtrasse por ela. Agora é detalhe, que é o que ele é.
  if (!/autoaprovação ADMIN/.test(String(entry.Detail))) {
    throw new Error('log não marcou autoaprovação: ' + entry.Detail);
  }
  eq(entry.Module, 'links', 'o módulo tem coluna própria:');
  eq(entry.Key, 'tech', 'a chave não carrega o sufixo:');
});

check('TL NÃO pode aprovar a própria proposta', () => {
  api.saveContentAccess('lider1', 'TL', true);
  as('lider1', () => {
    const d = api.saveContentDraft({
      module: 'links', key: 'tech', lang: 'ALL', label: 'JSFiddle',
      value: JSON.stringify({ name: 'JSFiddle', url: 'https://jsfiddle.net', desc: 'JS' })
    });
    api.submitContentDraft(d.draftId);
    throws(() => api.approveContentDraft(d.draftId, ''), /não pode aprovar a própria/);
  });
});

check('ADMIN aprova a proposta do TL normalmente', () => {
  const pend = api.listPendingApprovals().filter(d => d.proposedBy === 'lider1');
  eq(pend.length, 1);
  api.approveContentDraft(pend[0].draftId, 'ok');
  eq(api.listContentItems('links').length, 2);
});

console.log('\n--- Versionamento e rollback ---');

let itemToEdit;
check('editar item publicado gera v2 e arquiva a v1', () => {
  itemToEdit = api.listContentItems('links').find(i => i.label === 'RegExr');
  const d = api.saveContentDraft({
    itemId: itemToEdit.id, module: 'links', key: 'tech', lang: 'ALL',
    label: 'RegExr (novo)',
    value: JSON.stringify({ name: 'RegExr', url: 'https://regexr.com/v2', desc: 'Regex' })
  });
  api.submitContentDraft(d.draftId);
  const r = api.approveContentDraft(d.draftId, '');
  eq(r.version, 2);

  const live = api.listContentItems('links');
  eq(live.length, 2, 'ainda 2 itens no ar (não duplicou):');
  eq(live.find(i => i.key === 'tech' && i.label === 'RegExr (novo)') !== undefined, true);
});

check('versão anterior fica arquivada, não apagada', () => {
  const cur = api.listContentItems('links').find(i => i.label === 'RegExr (novo)');
  const hist = api.listContentItemHistory(cur.lineage, 'links');
  eq(hist.length, 2, 'duas versões na linhagem:');
  eq(hist.filter(h => h.status === 'archived').length, 1);
});

check('histórico é por item, não pela categoria inteira', () => {
  const regexr = api.listContentItems('links').find(i => i.label === 'RegExr (novo)');
  const jsfiddle = api.listContentItems('links').find(i => i.label === 'JSFiddle');
  eq(regexr.key, 'tech');
  eq(jsfiddle.key, 'tech', 'os dois vivem na mesma categoria:');
  if (regexr.lineage === jsfiddle.lineage) {
    throw new Error('itens diferentes não podem compartilhar linhagem');
  }
  eq(api.listContentItemHistory(jsfiddle.lineage, 'links').length, 1,
    'JSFiddle tem só a própria versão:');
});

check('rollback republica a versão arquivada sem tocar nos vizinhos', () => {
  const cur = api.listContentItems('links').find(i => i.label === 'RegExr (novo)');
  const old = api.listContentItemHistory(cur.lineage, 'links')
    .find(h => h.status === 'archived' && h.label === 'RegExr');

  api.rollbackContentItem(old.id);

  const live = api.listContentItems('links');
  eq(live.filter(i => i.label === 'RegExr').length, 1, 'a versão antiga voltou ao ar:');
  eq(live.filter(i => i.label === 'RegExr (novo)').length, 0, 'a v2 saiu do ar:');
  eq(live.filter(i => i.label === 'JSFiddle').length, 1,
    'o vizinho da mesma categoria continua no ar:');
});

console.log('\n--- Remoção (o bug que o teste existe pra travar) ---');

check('remoção arquiva sem publicar item vazio', () => {
  const before = api.listContentItems('links').length;
  const target = api.listContentItems('links').find(i => i.label === 'JSFiddle');

  const r = api.requestContentRemoval(target.id, 'ferramenta descontinuada');
  api.approveContentDraft(r.draftId, '');

  const live = api.listContentItems('links');
  eq(live.length, before - 1, 'item saiu do ar:');
  eq(live.filter(i => !i.value || i.value === '').length, 0, 'nenhum item fantasma de valor vazio:');
});

check('item removido some da leitura pública', () => {
  const pub = api.handleContentPublicRead({ module: 'links' });
  eq(pub.items.filter(i => i.label === 'JSFiddle').length, 0);
});

console.log('\n--- Rejeição ---');

check('rejeitar exige motivo e devolve como rascunho', () => {
  const d = api.saveContentDraft({
    module: 'links', key: 'ads', lang: 'ALL', label: 'Teste',
    value: JSON.stringify({ name: 'Teste', url: 'https://x.com', desc: '' })
  });
  api.submitContentDraft(d.draftId);

  throws(() => api.rejectContentDraft(d.draftId, ''), /Explique o motivo/);

  api.rejectContentDraft(d.draftId, 'URL inválida');
  const drafts = api.listContentDrafts('links');
  const back = drafts.find(x => x.draftId === d.draftId);
  eq(back.status, 'draft', 'voltou a ser rascunho:');
  eq(back.reviewNote, 'URL inválida');
});

check('rejeitado não entra no ar', () => {
  eq(api.listContentItems('links').filter(i => i.label === 'Teste').length, 0);
});

console.log('\n--- Semeadura ---');

check('seed não roda duas vezes no mesmo módulo', () => {
  const r = api.seedContentModule(JSON.stringify({ module: 'links', items: [] }));
  eq(r.status, 'skipped', 'módulo já tem itens no ar:');
});

// A semeadura de verdade precisa de uma planilha limpa, então roda num
// ambiente próprio. Vale o trabalho: é o caminho que só é exercitado uma vez
// na vida, em produção, e onde um erro custa caro pra desfazer.
check('seedLinksNow() popula o módulo numa planilha zerada', () => {
  const freshSS = new FakeSpreadsheet();
  const freshCtx = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => freshSS },
    Session: { getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }) },
    MailApp: { sendEmail: () => { } },
    Logger: { log: () => { } },
    Utilities: { getUuid: () => require('node:crypto').randomUUID() },
    handleLog: () => { },
    console,
  });

  vm.runInContext(fs.readFileSync(SRC, 'utf8'), freshCtx);
  vm.runInContext(fs.readFileSync(SEED_SRC, 'utf8'), freshCtx);

  // Exatamente o que o botão Executar do editor faz: chama sem argumentos.
  const res = freshCtx.seedLinksNow();
  eq(res.status, 'success');
  if (res.seeded < 50) throw new Error('semeou só ' + res.seeded + ' itens');

  const live = freshCtx.listContentItems('links');
  eq(live.length, res.seeded, 'tudo que foi semeado está no ar:');

  // O que o agente realmente recebe depois da semeadura.
  const pub = freshCtx.handleContentPublicRead({ module: 'links' });
  eq(pub.items.length, res.seeded);

  const first = JSON.parse(pub.items[0].value);
  if (!first.name || !first.url) throw new Error('item semeado sem name/url');

  // Cada item precisa de linhagem própria, senão um rollback futuro
  // arrastaria a categoria inteira junto.
  const lineages = new Set(live.map(i => i.lineage));
  eq(lineages.size, live.length, 'linhagens únicas por item:');
});

check('validação de módulo desconhecido', () => {
  throws(() => api.listContentItems('inexistente'), /Módulo desconhecido/);
});

check('seedCallScriptNow() popula o roteiro numa planilha zerada', () => {
  const freshSS = new FakeSpreadsheet();
  const freshCtx = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => freshSS },
    Session: { getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }) },
    MailApp: { sendEmail: () => { } },
    Logger: { log: () => { } },
    Utilities: { getUuid: () => require('node:crypto').randomUUID() },
    handleLog: () => { },
    console,
  });

  vm.runInContext(fs.readFileSync(SRC, 'utf8'), freshCtx);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'ContentSeed_CallScript.js'), 'utf8'),
    freshCtx
  );

  const res = freshCtx.seedCallScriptNow();
  eq(res.status, 'success');

  const live = freshCtx.listContentItems('call_script');
  eq(live.length, res.seeded);

  // A normalização é o ponto da migração: idioma e fluxo deixam de viver
  // grudados numa chave só ("PT BAU") e passam a ser colunas separadas.
  const langs = new Set(live.map(i => i.lang));
  const flows = new Set(live.map(i => i.key));
  eq([...langs].sort(), ['ES', 'PT']);
  eq([...flows].sort(), ['BAU', 'LT']);

  const groups = new Set(live.map(i => i.field));
  [...groups].forEach(g => {
    if (!['inicio', 'meio', 'fim'].includes(g)) throw new Error('seção inesperada: ' + g);
  });

  const lineages = new Set(live.map(i => i.lineage));
  eq(lineages.size, live.length, 'linhagens únicas por passo:');
});

check('a ordem dos passos sobrevive à semeadura', () => {
  // Num roteiro, ordem é conteúdo: um passo fora de lugar é um roteiro errado.
  const seed = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'seeds', 'call-script-seed.json'), 'utf8')
  );

  const ptBauInicio = seed.items
    .filter(i => i.lang === 'PT' && i.key === 'BAU' && i.field === 'inicio')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  if (ptBauInicio.length < 5) throw new Error('poucos passos em PT BAU/inicio');
  if (!/Apresenta/i.test(ptBauInicio[0].value)) {
    throw new Error('primeiro passo não é a apresentação: ' + ptBauInicio[0].value);
  }
});

console.log('\n--- Dicas (migração da aba Tips) ---');

// Ambiente próprio com a aba Tips já povoada, como está hoje em produção.
function makeTipsEnv(linhas) {
  const ss = new FakeSpreadsheet();
  const tips = ss.insertSheet('Tips');
  tips.appendRow(['Dica']);
  linhas.forEach(t => tips.appendRow([t]));

  const ctx2 = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => ss },
    Session: { getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }) },
    MailApp: { sendEmail: () => { } },
    Logger: { log: () => { } },
    Utilities: { getUuid: () => require('node:crypto').randomUUID() },
    handleLog: () => { },
    SHEET_TIPS: 'Tips',
    console,
  });

  // Mesmo conjunto de arquivos do contexto principal, e pelo mesmo motivo: o
  // ContentAPI desvia para o PeopleAPI, que por sua vez lê globais do Código.gs.
  vm.runInContext(fs.readFileSync(CORE_SRC, 'utf8'), ctx2);
  vm.runInContext(fs.readFileSync(SRC, 'utf8'), ctx2);
  vm.runInContext(fs.readFileSync(PEOPLE_SRC, 'utf8'), ctx2);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'ContentSeed_Tips.js'), 'utf8'),
    ctx2
  );
  return ctx2;
}

const TIPS_ATUAIS = ['Mantenha o foco!', 'Respire fundo.', 'Quase lá…'];

check('a rota legada serve a aba Tips enquanto não há migração', () => {
  // Compatibilidade é o ponto: bundles antigos em cache seguem chamando op=tips.
  const env = makeTipsEnv(TIPS_ATUAIS);
  eq(env.getTipsForLegacyEndpoint(), TIPS_ATUAIS);
});

check('seedTipsNow() traz as dicas da aba para a Central', () => {
  const env = makeTipsEnv(TIPS_ATUAIS);
  const res = env.seedTipsNow();

  eq(res.status, 'success');
  eq(res.seeded, TIPS_ATUAIS.length);

  const live = env.listContentItems('tips');
  eq(live.map(i => i.value), TIPS_ATUAIS, 'mesmas dicas, mesma ordem:');
});

check('depois da migração a rota legada serve a Central, não mais a aba', () => {
  // Sem isso a aba viraria uma fonte fantasma: editar pela Central não afetaria
  // quem ainda roda o bundle antigo, e ninguém entenderia por quê.
  const env = makeTipsEnv(TIPS_ATUAIS);
  env.seedTipsNow();

  const item = env.listContentItems('tips').find(i => i.value === 'Respire fundo.');
  const d = env.saveContentDraft({
    module: 'tips', itemId: item.id, key: 'geral', lang: 'ALL',
    label: 'Respire fundo, deu tudo certo.', value: 'Respire fundo, deu tudo certo.',
    sortOrder: item.sortOrder
  });
  env.submitContentDraft(d.draftId);
  env.approveContentDraft(d.draftId, '');

  const servidas = env.getTipsForLegacyEndpoint();
  if (!servidas.includes('Respire fundo, deu tudo certo.')) {
    throw new Error('rota legada não pegou a edição: ' + servidas.join(' | '));
  }
  if (servidas.includes('Respire fundo.')) {
    throw new Error('rota legada ainda serve o texto antigo da aba');
  }
});

check('a aba Tips não é apagada pela migração', () => {
  // O caminho de volta é reverter código, não restaurar dado.
  const env = makeTipsEnv(TIPS_ATUAIS);
  env.seedTipsNow();

  const aba = env.SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tips');
  const linhas = aba.getDataRange().getValues().slice(1).map(r => r[0]);
  eq(linhas, TIPS_ATUAIS, 'aba original intacta:');
});

check('aba Tips vazia não quebra a semeadura', () => {
  const env = makeTipsEnv([]);
  const res = env.seedTipsNow();
  eq(res.seeded, 0);
  eq(env.getTipsForLegacyEndpoint(), []);
});

check('dica só entra no ar depois de aprovada', () => {
  const env = makeTipsEnv(TIPS_ATUAIS);
  env.seedTipsNow();
  const antes = env.getTipsForLegacyEndpoint().length;

  const d = env.saveContentDraft({
    module: 'tips', key: 'geral', lang: 'ALL',
    label: 'Dica nova', value: 'Dica nova'
  });
  env.submitContentDraft(d.draftId);

  eq(env.getTipsForLegacyEndpoint().length, antes, 'pendente não vaza pra rota pública:');

  env.approveContentDraft(d.draftId, '');
  eq(env.getTipsForLegacyEndpoint().length, antes + 1);
});

console.log('\n--- E-mails (validação de placeholder) ---');

const emailValue = (subject, body, placeholders) => JSON.stringify({
  subject: subject, template: body, placeholders: placeholders || []
});

check('modelo consistente é aceito', () => {
  const r = api.saveContentDraft({
    module: 'email_template', key: 'attempt_10min', field: 'Tentativas', lang: 'PT',
    label: 'Tentativa',
    value: emailValue('Olá [Nome do Cliente]', '<p>Oi [Nome do Cliente], sou [Seu Nome].</p>',
      [{ key: '[Nome do Cliente]', label: 'Cliente', type: 'text' },
      { key: '[Seu Nome]', label: 'Assinatura', type: 'text', auto: 'agentName' }])
  });
  if (!r.draftId) throw new Error('rascunho não criado');
});

check('campo declarado que não aparece no corpo é recusado', () => {
  // O agente preencheria um campo que não vai a lugar nenhum.
  throws(() => api.saveContentDraft({
    module: 'email_template', key: 'x', field: 'c', lang: 'PT', label: 'X',
    value: emailValue('Assunto', '<p>Sem token nenhum.</p>',
      [{ key: '[Nome do Cliente]', label: 'Cliente', type: 'text' }])
  }), /declarados mas não aparecem/);
});

check('token no corpo sem declaração é recusado', () => {
  // Esse é o caro: sai literal "Olá, [Nome do Cliente]," para o anunciante.
  throws(() => api.saveContentDraft({
    module: 'email_template', key: 'x', field: 'c', lang: 'PT', label: 'X',
    value: emailValue('Assunto', '<p>Olá, [Nome do Cliente], tudo bem?</p>', [])
  }), /não estão declarados/);
});

check('assunto e corpo são obrigatórios', () => {
  throws(() => api.saveContentDraft({
    module: 'email_template', key: 'x', field: 'c', lang: 'PT', label: 'X',
    value: emailValue('', '<p>corpo</p>', [])
  }), /precisa de um assunto/);

  throws(() => api.saveContentDraft({
    module: 'email_template', key: 'x', field: 'c', lang: 'PT', label: 'X',
    value: emailValue('Assunto', '', [])
  }), /precisa de um corpo/);
});

check('o token pode estar só no assunto', () => {
  const r = api.saveContentDraft({
    module: 'email_template', key: 'y', field: 'c', lang: 'PT', label: 'Y',
    value: emailValue('Caso de [Nome do Cliente]', '<p>Texto sem token.</p>',
      [{ key: '[Nome do Cliente]', label: 'Cliente', type: 'text' }])
  });
  if (!r.draftId) throw new Error('recusou token válido no assunto');
});

check('ES não exige declaração própria (as chaves são as de PT)', () => {
  const r = api.saveContentDraft({
    module: 'email_template', key: 'attempt_10min', field: 'Intentos', lang: 'ES',
    label: 'Intento',
    value: JSON.stringify({
      subject: 'Hola [Nome do Cliente]',
      template: '<p>Hola [Nome do Cliente], soy [Seu Nome].</p>',
      labels: { '[Nome do Cliente]': 'Nombre del Cliente', '[Seu Nome]': 'Firma' }
    })
  });
  if (!r.draftId) throw new Error('recusou overlay ES válido');
});

check('checkEmailTemplate devolve o erro em vez de lançar', () => {
  // A tela chama isso antes de gravar, pra avisar com o texto ainda na tela.
  const bad = api.checkEmailTemplate(emailValue('A', '<p>[Fantasma]</p>', []), 'PT');
  eq(bad.ok, false);
  if (!/não estão declarados/.test(bad.error)) throw new Error('erro inesperado: ' + bad.error);

  const good = api.checkEmailTemplate(emailValue('A', '<p>ok</p>', []), 'PT');
  eq(good.ok, true);
});

check('JSON malformado não passa', () => {
  throws(() => api.saveContentDraft({
    module: 'email_template', key: 'x', field: 'c', lang: 'PT', label: 'X',
    value: '{isso não é json'
  }), /JSON malformado/);
});

check('seedEmailsNow() popula os modelos numa planilha zerada', () => {
  const freshSS = new FakeSpreadsheet();
  const freshCtx = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => freshSS },
    Session: { getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }) },
    MailApp: { sendEmail: () => { } },
    Logger: { log: () => { } },
    Utilities: { getUuid: () => require('node:crypto').randomUUID() },
    handleLog: () => { },
    console,
  });

  vm.runInContext(fs.readFileSync(SRC, 'utf8'), freshCtx);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'ContentSeed_Emails.js'), 'utf8'),
    freshCtx
  );

  const res = freshCtx.seedEmailsNow();
  eq(res.status, 'success');

  const live = freshCtx.listContentItems('email_template');
  eq(live.length, res.seeded);

  const pt = live.filter(i => i.lang === 'PT');
  const es = live.filter(i => i.lang === 'ES');
  if (!pt.length || !es.length) throw new Error('faltou algum idioma');

  // Cada template tem exatamente uma linha por idioma - duplicata aqui viraria
  // modelo repetido na lista do agente.
  const ptKeys = pt.map(i => i.key);
  eq(new Set(ptKeys).size, ptKeys.length, 'uma linha PT por template:');

  // E todo modelo semeado tem que passar na própria validação.
  pt.forEach(i => {
    const r = freshCtx.checkEmailTemplate(i.value, 'PT');
    if (!r.ok) throw new Error('modelo semeado inválido [' + i.key + ']: ' + r.error);
  });
});

console.log('\n--- Modelos de nota (nota inteira) ---');

const tplValue = (fields, extra) => JSON.stringify(Object.assign({ fields: fields }, extra || {}));

check('QA propõe modelo de nota (está no escopo do papel)', () => {
  as('quality1', () => {
    const r = api.saveContentDraft({
      module: 'note_template', key: 'NI_Awaiting_Inputs', field: 'all', lang: 'PT',
      label: 'Sem acesso ao CMS',
      value: tplValue({ 'field-REASON_COMMENTS': 'Aguardando acesso.' })
    });
    if (!r.draftId) throw new Error('rascunho não criado');
  });
});

check('WFM NÃO propõe modelo de nota', () => {
  api.saveContentAccess('wfm1', 'WFM', true);
  as('wfm1', () => {
    throws(() => api.saveContentDraft({
      module: 'note_template', key: 'NI_Awaiting_Inputs', field: 'all', lang: 'PT',
      label: 'X', value: tplValue({ 'field-REASON_COMMENTS': 'y' })
    }), /não edita o módulo/);
  });
});

check('substatus fora do catálogo é recusado', () => {
  throws(() => api.saveContentDraft({
    module: 'note_template', key: 'SUBSTATUS_INVENTADO', field: 'all', lang: 'PT',
    label: 'X', value: tplValue({ 'field-REASON_COMMENTS': 'y' })
  }), /Substatus desconhecido/);
});

check('campo que o substatus não tem é recusado', () => {
  // Esta é a falha silenciosa que a migração expôs: hoje applyScenario()
  // simplesmente ignora o texto, e ninguém percebe que ele nunca apareceu.
  throws(() => api.saveContentDraft({
    module: 'note_template', key: 'IN_Not_Reachable', field: 'all', lang: 'PT',
    label: 'X',
    value: tplValue({ 'field-REASON_COMMENTS': 'ok', 'field-SCREENSHOTS': 'nunca apareceria' })
  }), /não existem em/);
});

check('campo obrigatório vazio é recusado', () => {
  throws(() => api.saveContentDraft({
    module: 'note_template', key: 'NI_Awaiting_Inputs', field: 'all', lang: 'PT',
    label: 'X', value: tplValue({ 'field-CONTEXTO_CALL': 'só isso' })
  }), /campos obrigatórios/);
});

check('modelo sem campo nenhum é recusado', () => {
  throws(() => api.saveContentDraft({
    module: 'note_template', key: 'NI_Awaiting_Inputs', field: 'all', lang: 'PT',
    label: 'X', value: tplValue({})
  }), /pelo menos um campo/);
});

check('checkNoteTemplate devolve o erro em vez de lançar', () => {
  const bad = api.checkNoteTemplate(
    tplValue({ 'field-REASON_COMMENTS': 'ok', 'field-SCREENSHOTS': 'x' }), 'IN_Not_Reachable');
  eq(bad.ok, false);

  const good = api.checkNoteTemplate(
    tplValue({ 'field-REASON_COMMENTS': 'ok' }), 'IN_Not_Reachable');
  eq(good.ok, true);
});

check('modelo aprovado chega ao agente com substatus, escopo e campos', () => {
  const d = api.saveContentDraft({
    module: 'note_template', key: 'IN_Not_Reachable', field: 'bau', lang: 'PT',
    label: 'NRP BAU',
    value: tplValue({ 'field-REASON_COMMENTS': 'Sem contato.', 'field-COMENTARIOS': 'Duas tentativas.' })
  });
  api.submitContentDraft(d.draftId);
  api.approveContentDraft(d.draftId, '');

  const pub = api.handleContentPublicRead({ module: 'note_template' });
  const meu = pub.items.filter(i => i.label === 'NRP BAU');
  eq(meu.length, 1);
  eq(meu[0].key, 'IN_Not_Reachable');
  eq(meu[0].field, 'bau');

  const v = JSON.parse(meu[0].value);
  eq(Object.keys(v.fields).sort(), ['field-COMENTARIOS', 'field-REASON_COMMENTS']);
});

check('o catálogo traz os campos e obrigatórios de cada substatus', () => {
  const cat = api.getNoteFieldCatalog();
  if (!cat.substatus.length) throw new Error('catálogo sem substatus');

  cat.substatus.forEach(s => {
    if (!s.key || !s.name) throw new Error('substatus sem chave/nome');
    if (!Array.isArray(s.fields)) throw new Error(s.key + ': sem lista de campos');
    (s.requiredFields || []).forEach(r => {
      if (!s.fields.includes(r)) throw new Error(s.key + ': obrigatório fora da lista de campos: ' + r);
    });
  });
});

check('seedNoteTemplatesNow() migra os cenários existentes', () => {
  const freshSS = new FakeSpreadsheet();
  const freshCtx = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => freshSS },
    Session: { getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }) },
    MailApp: { sendEmail: () => { } },
    Logger: { log: () => { } },
    Utilities: { getUuid: () => require('node:crypto').randomUUID() },
    handleLog: () => { },
    console,
  });

  vm.runInContext(fs.readFileSync(SRC, 'utf8'), freshCtx);
  vm.runInContext(fs.readFileSync(FIELDS_SRC, 'utf8'), freshCtx);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'ContentSeed_NoteTemplates.js'), 'utf8'),
    freshCtx
  );

  const res = freshCtx.seedNoteTemplatesNow();
  eq(res.status, 'success');
  if (res.seeded < 40) throw new Error('semeou só ' + res.seeded);

  const live = freshCtx.listContentItems('note_template');
  eq(live.length, res.seeded);

  // Todo modelo semeado tem que passar na própria validação - senão a
  // migração estaria publicando algo que a tela recusaria depois.
  live.forEach(i => {
    const r = freshCtx.checkNoteTemplate(i.value, i.key);
    if (!r.ok) throw new Error('modelo semeado inválido [' + i.label + '/' + i.key + ']: ' + r.error);
  });

  const escopos = new Set(live.map(i => i.field));
  [...escopos].forEach(e => {
    if (!['all', 'bau', 'lm'].includes(e)) throw new Error('escopo inesperado: ' + e);
  });
});

check('ES ainda não tem a seção de Tag Support (lacuna conhecida)', () => {
  // Não é bug: é conteúdo que nunca chegou, e agora dá pra preencher pela
  // Central sem tocar em código. O teste existe pra avisar quando mudar.
  const seed = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'seeds', 'call-script-seed.json'), 'utf8')
  );

  const esMeio = seed.items.filter(i => i.lang === 'ES' && i.field === 'meio');
  const ptMeio = seed.items.filter(i => i.lang === 'PT' && i.field === 'meio');

  eq(esMeio.length, 0, 'ES segue sem passos de Tag Support:');
  if (!ptMeio.length) throw new Error('PT deveria ter a seção de Tag Support');
});

// =========================================================
//  AVISOS E DISPONIBILIDADE BAU (publicação direta)
// =========================================================

const bcast = (over) => JSON.stringify(Object.assign(
  { type: 'info', title: 'Título', text: 'Mensagem', publishedAt: '2026-08-31T10:00:00', author: 'lucaste' },
  over || {}
));

const bau = (segments, over) => JSON.stringify(Object.assign(
  { updatedAt: '2026-08-31T10:00:00', author: 'lucaste', note: '', segments: segments },
  over || {}
));

console.log('\n--- Avisos: papéis e caminho de escrita ---');

check('avisos e disponibilidade são módulos da Central', () => {
  const s = api.getContentSession();
  if (s.modules.indexOf('broadcast') === -1) throw new Error('broadcast fora de CONTENT_MODULES');
  if (s.modules.indexOf('bau_availability') === -1) throw new Error('bau_availability fora de CONTENT_MODULES');
});

check('avisos não entram pela fila de aprovação', () => {
  throws(
    () => api.saveContentDraft({ module: 'broadcast', key: 'x', label: 'X', value: bcast() }),
    /publica direto, sem rascunho/
  );
});

check('disponibilidade BAU não entra pela fila de aprovação', () => {
  throws(
    () => api.saveContentDraft({ module: 'bau_availability', key: 'current', label: 'X', value: bau({}) }),
    /publica direto, sem rascunho/
  );
});

check('módulo de fila não aceita publicação direta', () => {
  throws(
    () => api.publishContentDirect({ module: 'links', key: 'tech', label: 'X', value: '{}' }),
    /publica pela fila de aprovação/
  );
});

check('WFM publica disponibilidade BAU', () => {
  api.saveContentAccess('wfm1', 'WFM', true);
  as('wfm1', () => {
    const r = api.publishContentDirect({
      module: 'bau_availability',
      label: 'Disponibilidade BAU',
      value: bau({ PT: { attention: '2026-09-15', full: '2026-09-22' } })
    });
    eq(r.status, 'success');
    eq(r.key, 'current');
  });
});

check('WFM NÃO publica aviso geral', () => {
  as('wfm1', () => {
    throws(
      () => api.publishContentDirect({ module: 'broadcast', label: 'X', value: bcast() }),
      /não publica no módulo 'broadcast'/
    );
  });
});

check('QA não publica aviso nem disponibilidade', () => {
  as('quality1', () => {
    throws(() => api.publishContentDirect({ module: 'broadcast', label: 'X', value: bcast() }), /não publica no módulo/);
    throws(() => api.publishContentDirect({ module: 'bau_availability', label: 'X', value: bau({}) }), /não publica no módulo/);
  });
});

check('LDAP sem papel não publica nada', () => {
  as('estranho', () => {
    throws(() => api.publishContentDirect({ module: 'broadcast', label: 'X', value: bcast() }), /Acesso negado/);
  });
});

console.log('\n--- Avisos: validação ---');

check('tipo de aviso desconhecido é recusado', () => {
  throws(
    () => api.publishContentDirect({ module: 'broadcast', label: 'X', value: bcast({ type: 'urgente' }) }),
    /Tipo de aviso desconhecido/
  );
});

check('aviso sem título ou sem texto é recusado', () => {
  throws(() => api.publishContentDirect({ module: 'broadcast', label: 'X', value: bcast({ title: '  ' }) }), /precisa de um título/);
  throws(() => api.publishContentDirect({ module: 'broadcast', label: 'X', value: bcast({ text: '' }) }), /precisa de uma mensagem/);
});

check('aviso que não é JSON é recusado', () => {
  throws(
    () => api.publishContentDirect({ module: 'broadcast', label: 'X', value: 'texto solto' }),
    /não é um JSON válido/
  );
});

console.log('\n--- Disponibilidade BAU: as duas datas ---');

check('data de atenção depois da data total é recusada', () => {
  // É a regra que dá sentido às cores: laranja é a data mais próxima e mais
  // apertada, verde é a de disponibilidade total. Invertidas, as cores mentem.
  throws(
    () => api.publishContentDirect({
      module: 'bau_availability',
      label: 'X',
      value: bau({ PT: { attention: '2026-09-22', full: '2026-09-15' } })
    }),
    /é posterior à de disponibilidade total/
  );
});

check('data que não existe no calendário é recusada', () => {
  throws(
    () => api.publishContentDirect({
      module: 'bau_availability',
      label: 'X',
      value: bau({ ES: { attention: '2026-02-31', full: '' } })
    }),
    /Data inexistente/
  );
});

check('data fora do formato ISO é recusada', () => {
  throws(
    () => api.publishContentDirect({
      module: 'bau_availability',
      label: 'X',
      value: bau({ PT: { attention: '15/09', full: '' } })
    }),
    /use o formato AAAA-MM-DD/
  );
});

check('campo é flexível: só uma das duas datas basta', () => {
  const r = api.publishContentDirect({
    module: 'bau_availability',
    label: 'Disponibilidade BAU',
    value: bau({ PT: { attention: '', full: '2026-09-22' } })
  });
  eq(r.status, 'success');
});

check('publicação sem nenhuma data é recusada', () => {
  throws(
    () => api.publishContentDirect({
      module: 'bau_availability',
      label: 'X',
      value: bau({ PT: { attention: '', full: '' }, ES: { attention: '', full: '' } })
    }),
    /ao menos uma data/
  );
});

check('segmento fora de PT/ES é recusado', () => {
  throws(
    () => api.publishContentDirect({
      module: 'bau_availability',
      label: 'X',
      value: bau({ EN: { attention: '2026-09-15', full: '' } })
    }),
    /Segmento desconhecido/
  );
});

check('publicação recusada não derruba a versão que estava no ar', () => {
  const antes = api.listContentItems('bau_availability');
  eq(antes.length, 1, 'pré-condição:');

  throws(() => api.publishContentDirect({
    module: 'bau_availability', label: 'X', value: bau({ PT: { attention: '2026-13-01', full: '' } })
  }));

  const depois = api.listContentItems('bau_availability');
  eq(depois.length, 1, 'segue exatamente uma linha no ar:');
  eq(depois[0].id, antes[0].id, 'e é a mesma linha:');
});

console.log('\n--- Ciclo de vida ---');

check('disponibilidade é singleton: republicar arquiva a anterior', () => {
  const r = api.publishContentDirect({
    module: 'bau_availability',
    label: 'Disponibilidade BAU',
    value: bau({
      PT: { attention: '2026-09-15', full: '2026-09-22' },
      ES: { attention: '2026-09-18', full: '2026-09-25' }
    })
  });

  const live = api.listContentItems('bau_availability');
  eq(live.length, 1, 'exatamente uma disponibilidade no ar:');
  eq(live[0].id, r.itemId);
  if (r.version < 2) throw new Error('deveria ter versionado, veio v' + r.version);

  // Versão nova herda a linhagem: o histórico é de UM item ao longo do tempo.
  const todas = api.listContentItems('bau_availability');
  const linhagens = new Set(todas.map(i => i.lineage));
  eq(linhagens.size, 1, 'uma linhagem só:');
});

check('avisos são feed: cada um é sua própria linhagem', () => {
  const a = api.publishContentDirect({ module: 'broadcast', label: 'Primeiro', value: bcast({ title: 'Primeiro' }) });
  const b = api.publishContentDirect({ module: 'broadcast', label: 'Segundo', value: bcast({ title: 'Segundo' }) });

  const live = api.listContentItems('broadcast');
  eq(live.length, 2, 'dois avisos no ar:');
  if (a.key === b.key) throw new Error('dois avisos novos não podem dividir a mesma chave');
});

check('editar um aviso versiona, não duplica', () => {
  const a = api.publishContentDirect({ module: 'broadcast', label: 'Manutenção', value: bcast({ title: 'Manutenção' }) });
  const antes = api.listContentItems('broadcast').length;

  const b = api.publishContentDirect({
    module: 'broadcast', key: a.key, label: 'Manutenção (adiada)',
    value: bcast({ title: 'Manutenção (adiada)', type: 'critical' })
  });

  eq(b.version, 2);
  const depois = api.listContentItems('broadcast');
  eq(depois.length, antes, 'a contagem no ar não muda numa edição:');

  const vivo = depois.filter(i => i.key === a.key);
  eq(vivo.length, 1, 'uma versão viva por chave:');
  eq(JSON.parse(vivo[0].value).type, 'critical');
});

check('tirar um aviso do ar arquiva, não apaga', () => {
  const a = api.publishContentDirect({ module: 'broadcast', label: 'Temporário', value: bcast({ title: 'Temporário' }) });

  api.unpublishContentDirect(a.itemId);

  eq(api.listContentItems('broadcast').filter(i => i.id === a.itemId).length, 0, 'saiu do ar:');

  // listContentItems() devolve só o que está no ar; a linha arquivada continua
  // existindo e aparece no histórico da linhagem, que é o que permite reverter.
  // Item novo inaugura a própria linhagem, então lineage === itemId aqui.
  const historico = api.listContentItemHistory(a.itemId, 'broadcast');
  eq(historico.length, 1, 'a linha continua existindo no histórico:');
  eq(historico[0].status, 'archived');
});

check('tirar do ar duas vezes é recusado', () => {
  const a = api.publishContentDirect({ module: 'broadcast', label: 'Dupla', value: bcast({ title: 'Dupla' }) });
  api.unpublishContentDirect(a.itemId);
  throws(() => api.unpublishContentDirect(a.itemId), /já não está no ar/);
});

check('remoção pela fila é recusada em módulo de publicação direta', () => {
  const a = api.publishContentDirect({ module: 'broadcast', label: 'Fila', value: bcast({ title: 'Fila' }) });
  throws(() => api.requestContentRemoval(a.itemId, 'motivo'), /sai do ar direto/);
});

check('leitura pública só enxerga o que está no ar', () => {
  const a = api.publishContentDirect({ module: 'broadcast', label: 'Some', value: bcast({ title: 'Some' }) });
  api.unpublishContentDirect(a.itemId);

  const pub = api.handleContentPublicRead({ module: 'broadcast' });
  eq(pub.status, 'success');
  eq(pub.items.filter(i => i.id === a.itemId).length, 0, 'item arquivado não vaza:');
  pub.items.forEach(i => eq(i.status, 'live', 'tudo que sai é live:'));
});

check('leitura pública da disponibilidade devolve uma linha só', () => {
  const pub = api.handleContentPublicRead({ module: 'bau_availability' });
  eq(pub.items.length, 1);
  const parsed = JSON.parse(pub.items[0].value);
  eq(Object.keys(parsed.segments).sort(), ['ES', 'PT']);
});

console.log('\n--- Migração da aba Broadcast ---');

check('seedBroadcastNow() migra a aba numa planilha zerada, sem argumentos', () => {
  // Caminho que só roda UMA vez em produção e onde um erro custa caro pra
  // desfazer — por isso é exercitado num contexto limpo, chamado sem
  // parâmetros, exatamente como o botão Executar do editor do Apps Script faz.
  const freshSS = new FakeSpreadsheet();
  const freshCtx = vm.createContext({
    SpreadsheetApp: { getActiveSpreadsheet: () => freshSS },
    Session: {
      getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }),
      getScriptTimeZone: () => 'America/Sao_Paulo'
    },
    MailApp: { sendEmail: () => { } },
    Logger: { log: () => { } },
    Utilities: {
      getUuid: () => require('node:crypto').randomUUID(),
      formatDate: (d) => d.toISOString().slice(0, 19)
    },
    handleLog: () => { },
    console,
  });

  vm.runInContext(fs.readFileSync(SRC, 'utf8'), freshCtx);
  // Código.gs entra junto porque é lá que moram SHEET_BROADCAST e
  // getSheetData(), que o arquivo de migração usa — no Apps Script os dois
  // arquivos dividem o mesmo escopo global.
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'Código.js'), 'utf8'), freshCtx);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'ContentSeed_Broadcast.js'), 'utf8'),
    freshCtx
  );

  const sheet = freshSS.insertSheet('Broadcast');
  sheet.appendRow(['ID', 'Date', 'Type', 'Title', 'Text', 'Author', 'Active']);
  sheet.appendRow(['msg_1', '2026-08-01T09:00:00', 'Alerta', 'Instabilidade', 'CRM fora do ar.', 'lucaste', true]);
  sheet.appendRow(['msg_2', '2026-08-10T09:00:00', 'info', 'Nova política', 'Detalhes no link.', 'lucaste', true]);
  sheet.appendRow(['msg_3', '2026-08-05T09:00:00', 'info', 'Aviso apagado', 'Não deve migrar.', 'lucaste', false]);
  sheet.appendRow(['msg_4', '2026-08-20T09:00:00', 'info', 'Disponibilidade BAU', 'PT 15/09, ES 18/09.', 'lucaste', true]);
  sheet.appendRow(['', '2026-08-21T09:00:00', 'info', 'Sem ID', 'Linha órfã.', 'lucaste', true]);

  const res = freshCtx.seedBroadcastNow();
  eq(res.status, 'success');
  eq(res.seeded, 2, 'só os dois avisos ativos e não-BAU migram:');

  const live = freshCtx.listContentItems('broadcast');
  eq(live.map(i => i.key).sort(), ['msg_1', 'msg_2'], 'preserva os IDs antigos:');

  // O ID antigo é o que o localStorage de "lido" guarda. Trocá-lo faria todo
  // aviso já lido reaparecer como novo para a operação inteira.
  const alerta = live.filter(i => i.key === 'msg_1')[0];
  eq(JSON.parse(alerta.value).type, 'critical', '"Alerta" normaliza para critical:');

  // Todo item semeado tem que passar na própria validação — senão a migração
  // publicaria algo que a tela recusaria depois.
  live.forEach(i => {
    const r = freshCtx.checkBroadcast(i.value);
    if (!r.ok) throw new Error('aviso semeado inválido [' + i.label + ']: ' + r.error);
  });

  // Idempotência: rodar de novo não duplica.
  eq(freshCtx.seedBroadcastNow().status, 'skipped');

  // E a rota legada passa a servir da Central, mais novo primeiro.
  const legado = freshCtx.getBroadcastForLegacyEndpoint(freshSS);
  eq(legado.map(m => m.id), ['msg_2', 'msg_1'], 'mais novo primeiro:');
  eq(legado[0].active, true);
});

console.log('\n--- Rascunho de verdade ---');

check('salvar sem enviar deixa o rascunho fora da fila', () => {
  const d = api.saveContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica em rascunho',
    value: 'Ainda pensando na frase.'
  });

  const meus = api.listContentDrafts('tips').filter(x => x.draftId === d.draftId);
  eq(meus.length, 1, 'o rascunho existe:');
  eq(meus[0].status, 'draft');

  // O que separa rascunho de proposta: um não chega a quem revisa.
  eq(api.listPendingApprovals().filter(x => x.draftId === d.draftId).length, 0,
    'não apareceu na fila de revisão:');
});

check('descartar um rascunho o remove de vez', () => {
  const d = api.saveContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica descartável',
    value: 'Melhor não.'
  });
  eq(api.discardContentDraft(d.draftId).status, 'success');
  eq(api.listContentDrafts('tips').filter(x => x.draftId === d.draftId).length, 0,
    'sumiu da lista:');
});

check('proposta JÁ enviada não some por descarte', () => {
  // Quem ia revisar não pode ver o item desaparecer por baixo. Uma proposta em
  // revisão se resolve aprovando ou rejeitando.
  const d = api.saveAndSubmitContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica enviada',
    value: 'Já foi para a fila.'
  });
  throws(() => api.discardContentDraft(d.draftId), /Só um rascunho pode ser descartado/);
  eq(api.listPendingApprovals().filter(x => x.draftId === d.draftId).length, 1,
    'continua na fila:');
});

check('o rascunho é de quem escreveu', () => {
  api.saveContentAccess('qa_rascunho', 'QA', true);
  const d = as('qa_rascunho', () => api.saveContentDraft({
    module: 'call_script', key: 'BAU', field: 'inicio', lang: 'PT',
    label: 'Passo do QA', value: 'Rascunho alheio.'
  }));

  api.saveContentAccess('qa_outro', 'QA', true);
  throws(() => as('qa_outro', () => api.discardContentDraft(d.draftId)),
    /de outra pessoa/, 'outro QA descartando:');

  // Quem aprova pode: é quem destrava a fila quando alguém sai de férias.
  eq(api.discardContentDraft(d.draftId).status, 'success');
});

check('salvar registra quem está editando, para a tela poder avisar', () => {
  const d = as('qa_rascunho', () => api.saveContentDraft({
    module: 'call_script', key: 'BAU', field: 'inicio', lang: 'PT',
    label: 'Passo travado', value: 'Editando agora.'
  }));

  const meu = api.listContentDrafts('call_script').filter(x => x.draftId === d.draftId)[0];
  eq(meu.lockedBy, 'qa_rascunho', 'a trava diz quem:');
  eq(!!meu.lockedAt, true, 'e desde quando:');

  api.discardContentDraft(d.draftId);
});

console.log('\n--- Trava de escrita (concorrência) ---');

// A corrida real não é "aprovar duas vezes em sequência" — essa a máquina de
// estados já barra sozinha. É uma segunda execução entrando na janela ENTRE o
// appendRow da linha nova e a virada do status do rascunho, quando a proposta
// ainda consta como pendente. Este gancho reproduz exatamente essa janela.
function duranteOAppendDeItems(fn) {
  const sheet = SS.getSheetByName('Content_Items');
  const original = sheet.appendRow.bind(sheet);
  const capturado = { erro: null };
  let disparou = false;

  sheet.appendRow = (row) => {
    original(row);
    if (!disparou) {
      disparou = true;
      try { fn(); } catch (e) { capturado.erro = e; }
    }
  };

  capturado.restaurar = () => { sheet.appendRow = original; };
  return capturado;
}

function proposta(label) {
  const d = api.saveContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: label,
    value: 'Feche o caso com o substatus certo.'
  });
  api.submitContentDraft(d.draftId);
  return d.draftId;
}

check('SEM a trava, a reentrância publica o item duas vezes', () => {
  // Contraprova: sem esta demonstração, o teste seguinte passaria mesmo que a
  // trava não estivesse fazendo nada.
  const draftId = proposta('Dica sem trava');
  const lockReal = sandbox.LockService;
  sandbox.LockService = { getScriptLock: () => { throw new Error('sem LockService'); } };

  const hook = duranteOAppendDeItems(() => api.approveContentDraft(draftId, ''));
  try {
    api.approveContentDraft(draftId, '');
  } finally {
    hook.restaurar();
    sandbox.LockService = lockReal;
  }

  const live = api.handleContentPublicRead({ module: 'tips' }).items
    .filter(i => i.label === 'Dica sem trava');
  eq(live.length, 2, 'duplicou, como se esperava sem trava:');
});

check('COM a trava, a mesma reentrância é barrada e publica uma linha só', () => {
  const draftId = proposta('Dica com trava');

  const hook = duranteOAppendDeItems(() => api.approveContentDraft(draftId, ''));
  try {
    api.approveContentDraft(draftId, '');
  } finally {
    hook.restaurar();
  }

  eq(hook.erro !== null, true, 'a segunda execução foi recusada:');
  eq(/Outra publicação/.test(hook.erro.message), true, 'recusada pela trava:');

  const live = api.handleContentPublicRead({ module: 'tips' }).items
    .filter(i => i.label === 'Dica com trava');
  eq(live.length, 1, 'uma linha só no ar:');
});

check('trava ocupada recusa a publicação em vez de escrever junto', () => {
  const d = api.saveContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica travada',
    value: 'Confira o idioma do anunciante.'
  });
  api.submitContentDraft(d.draftId);

  LOCK_STATE.denyNext = true;
  throws(() => api.approveContentDraft(d.draftId, ''), /Outra publicação/, 'com a trava ocupada:');

  // E nada foi escrito: a recusa acontece antes de qualquer setValue.
  const pub = api.handleContentPublicRead({ module: 'tips' }).items;
  eq(pub.filter(i => i.label === 'Dica travada').length, 0, 'nada publicado:');

  // Com a trava livre de novo, a mesma proposta publica normalmente.
  api.approveContentDraft(d.draftId, '');
  eq(api.handleContentPublicRead({ module: 'tips' }).items
    .filter(i => i.label === 'Dica travada').length, 1);
});

check('a trava é liberada mesmo quando a operação falha', () => {
  const acquiresAntes = LOCK_STATE.releases;
  throws(() => api.approveContentDraft('drf_inexistente', ''), /não encontrada/);
  eq(LOCK_STATE.held, false, 'trava solta depois do erro:');
  eq(LOCK_STATE.releases > acquiresAntes, true, 'releaseLock foi chamado:');
});

console.log('\n--- Cache da leitura pública ---');

check('publicar invalida o cache do módulo na hora', () => {
  const antes = api.handleContentPublicRead({ module: 'tips' }).items.length;

  // A leitura acima populou o cache. Sem invalidação, a próxima devolveria a
  // lista velha — e o agente veria conteúdo aprovado só depois do TTL.
  const d = api.saveContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica nova',
    value: 'Revise o caso antes de fechar.'
  });
  api.submitContentDraft(d.draftId);
  api.approveContentDraft(d.draftId, '');

  const depois = api.handleContentPublicRead({ module: 'tips' }).items;
  eq(depois.length, antes + 1, 'a lista nova chegou sem esperar o TTL:');
  eq(depois.filter(i => i.label === 'Dica nova').length, 1);
});

check('tirar do ar por publicação direta também invalida', () => {
  const pub = api.publishContentDirect({
    module: 'broadcast', key: 'aviso_cache', lang: 'ALL',
    value: JSON.stringify({ type: 'info', title: 'Cache', text: 'Teste de cache.' })
  });
  eq(api.handleContentPublicRead({ module: 'broadcast' }).items
    .filter(i => i.key === 'aviso_cache').length, 1, 'no ar:');

  api.unpublishContentDirect(pub.itemId);
  eq(api.handleContentPublicRead({ module: 'broadcast' }).items
    .filter(i => i.key === 'aviso_cache').length, 0, 'saiu do ar na hora:');
});

check('cache não vaza entre módulos', () => {
  const tips = api.handleContentPublicRead({ module: 'tips' }).items;
  const links = api.handleContentPublicRead({ module: 'links' }).items;
  tips.forEach(i => eq(i.module, 'tips', 'item de tips:'));
  links.forEach(i => eq(i.module, 'links', 'item de links:'));
});

console.log('\n--- Leitura pública em lote ---');

check('modules=a,b devolve os dois numa chamada só', () => {
  const r = api.handleContentPublicRead({ modules: 'tips,links' });
  eq(r.status, 'success');
  eq(Object.keys(r.modules).sort(), ['links', 'tips']);

  // Mesmo conteúdo da rota de um módulo: o lote é transporte, não regra nova.
  eq(r.modules.tips.length, api.handleContentPublicRead({ module: 'tips' }).items.length);
});

check('lote recusa módulo desconhecido', () => {
  throws(() => api.handleContentPublicRead({ modules: 'tips,inventado' }), /desconhecido/i);
});

check('lote NÃO é caminho para vazar módulo privado', () => {
  // A regra do módulo privado é a mesma nas duas rotas — é o que impede que a
  // aba People escape por uma URL só porque a chamada agora aceita lista.
  throws(() => api.handleContentPublicRead({ modules: 'tips,people' }), /não tem leitura pública/);
  throws(() => api.handleContentPublicRead({ module: 'people' }), /não tem leitura pública/);
});

console.log('\n--- Salvar e enviar numa viagem ---');

check('saveAndSubmitContentDraft deixa a proposta pendente', () => {
  const r = api.saveAndSubmitContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica de uma viagem',
    value: 'Use o atalho para abrir a nota.'
  });
  eq(r.status, 'success');

  const pend = api.listPendingApprovals().filter(d => d.draftId === r.draftId);
  eq(pend.length, 1, 'está na fila de revisão:');
  eq(pend[0].status, 'pending');
});

check('validação continua acontecendo antes de gravar', () => {
  // O ganho é de viagens, não de rigor: um valor inválido tem que ser recusado
  // igual, e sem deixar rascunho órfão para trás.
  const antes = api.listContentDrafts('email_template').length;
  throws(() => api.saveAndSubmitContentDraft({
    module: 'email_template', key: 'x', lang: 'PT', label: 'Quebrado',
    value: JSON.stringify({ subject: '', template: '' })
  }));
  eq(api.listContentDrafts('email_template').length, antes, 'nenhum rascunho órfão:');
});

console.log('\n--- E-mail de decisão ---');

check('rejeição avisa quem propôs, com o motivo', () => {
  as('qa_pessoa', () => { });
  api.saveContentAccess('qa_pessoa', 'QA', true);

  const d = as('qa_pessoa', () => api.saveAndSubmitContentDraft({
    module: 'call_script', key: 'BAU', field: 'inicio', lang: 'PT',
    label: 'Passo proposto', value: 'Confirme o nome do anunciante.'
  }));

  const antes = SENT_MAIL.length;
  api.rejectContentDraft(d.draftId, 'Falta citar o CID.');

  const enviados = SENT_MAIL.slice(antes);
  const paraAutor = enviados.filter(m => m.to === 'qa_pessoa@google.com');
  eq(paraAutor.length, 1, 'o autor foi avisado:');
  eq(/Falta citar o CID/.test(paraAutor[0].htmlBody), true, 'o motivo vai no corpo:');
  eq(/voltou para ajuste/.test(paraAutor[0].subject), true);
});

check('aprovação avisa o autor, e só ele', () => {
  const d = as('qa_pessoa', () => api.saveAndSubmitContentDraft({
    module: 'call_script', key: 'BAU', field: 'inicio', lang: 'PT',
    label: 'Passo aprovado', value: 'Pergunte o melhor horário de retorno.'
  }));

  const antes = SENT_MAIL.length;
  api.approveContentDraft(d.draftId, '');

  const enviados = SENT_MAIL.slice(antes);
  eq(enviados.length, 1, 'um e-mail só:');
  eq(enviados[0].to, 'qa_pessoa@google.com', 'endereçado ao autor:');
  eq(/publicada/.test(enviados[0].subject), true);
});

check('autoaprovação do ADMIN não manda e-mail para si mesmo', () => {
  const d = api.saveAndSubmitContentDraft({
    module: 'tips', key: 'geral', lang: 'PT', label: 'Dica do admin',
    value: 'Confirme o substatus antes de salvar.'
  });

  const antes = SENT_MAIL.length;
  api.approveContentDraft(d.draftId, '');
  eq(SENT_MAIL.length, antes, 'nenhum e-mail:');
});

console.log('\n--- Atividade e auditoria estruturada ---');

check('toda ação vira uma linha com módulo e chave em colunas próprias', () => {
  const linha = logDaCentral().filter(l => l.Action === 'publish_direct').pop();
  eq(linha.Module, 'broadcast');
  // Cai aqui se alguém voltar a concatenar: o `Key` de um aviso é o ID do item,
  // e ele NÃO pode vir com o módulo grudado na frente.
  eq(/\//.test(String(linha.Key)), false, 'a chave não é "módulo/chave":');
  eq(String(linha.Item_ID).slice(0, 4), 'itm_', 'a linha aponta para o item publicado:');
});

check('a atividade chega da mais recente para a mais antiga', () => {
  const a = api.listContentActivity(10);
  const datas = a.map(l => l.at);
  eq(datas.slice().sort().reverse(), datas, 'ordem decrescente por data:');
});

check('o limite é respeitado, e tem teto', () => {
  eq(api.listContentActivity(3).length, 3);
  // 999 não vira 999 leituras: o servidor corta no teto.
  if (api.listContentActivity(999).length > 60) throw new Error('teto ignorado');
});

check('quem não tem papel não lê a atividade', () => {
  as('estranho', () => throws(() => api.listContentActivity(5), /Acesso negado/));
});

check('QA não vê no log o que não vê na tela de Pessoas', () => {
  // A linha existe: foi o ADMIN quem a criou.
  api.saveContentAccess('ana_ppl', 'TL', true);
  const doAdmin = api.listContentActivity(60);
  if (!doAdmin.some(l => l.action === 'access_change')) {
    throw new Error('o ADMIN deveria ver a mudança de acesso');
  }

  as('quality1', () => {
    const doQa = api.listContentActivity(60);
    eq(doQa.some(l => l.action === 'access_change'), false, 'QA não vê mudança de acesso:');
    eq(doQa.some(l => l.module === 'people'), false, 'QA não vê o módulo people:');
  });
});

check('o filtro é do SERVIDOR: a linha proibida nem viaja', () => {
  // Prova que não é a tela que esconde - o que sai daqui é o que chega no
  // navegador de quem perguntou.
  as('quality1', () => {
    const bruto = JSON.stringify(api.listContentActivity(60));
    eq(/access_change/.test(bruto), false);
  });
});

console.log('\n--- Backfill da aba Logs ---');

function semearLogsAntigos() {
  const logs = SS.insertSheet('Logs');
  logs.appendRow(['Timestamp', 'User', 'Version', 'Category', 'Action', 'Label', 'Value']);
  logs.appendRow(['2024-01-02T10:00:00.000Z', 'lucaste', 'content-central', 'ContentCentral',
    'approve', 'links/tech (autoaprovação ADMIN)', 'v1 por lucaste']);
  logs.appendRow(['2024-01-03T10:00:00.000Z', 'anaflor', 'content-central', 'ContentCentral',
    'access_change', 'brunocs', 'TL ativo']);
  logs.appendRow(['2024-01-04T10:00:00.000Z', 'lucaste', 'content-central', 'ContentCentral',
    'seed', 'tips', '12 itens']);
  // Ruído de outra categoria: a aba Logs é compartilhada com a sessão do agente.
  logs.appendRow(['2024-01-05T10:00:00.000Z', 'agente1', '6.1.0', 'Geral', 'session', '', '']);
  return logs;
}

check('sem `true`, o backfill só simula — não escreve nada', () => {
  semearLogsAntigos();
  const antes = logDaCentral().length;
  const r = api.backfillContentLog();
  eq(r.novas, 3, 'contou as três linhas de conteúdo:');
  eq(r.aplicado, false);
  eq(logDaCentral().length, antes, 'nada foi escrito:');
});

check('o backfill ignora o que não é da Central', () => {
  const r = api.backfillContentLog();
  eq(r.candidatas, 3, 'a linha de sessão do agente ficou de fora:');
});

let totalAposBackfill = 0;
check('aplicado, traz as linhas e reparte o Label em colunas', () => {
  const r = api.backfillContentLog(true);
  eq(r.aplicado, true);
  totalAposBackfill = logDaCentral().length;

  const linhas = logDaCentral();
  const aprov = linhas.find(l => String(l.Log_ID).indexOf('log_bf_') === 0 && l.Action === 'approve');
  eq(aprov.Module, 'links');
  eq(aprov.Key, 'tech', 'o sufixo saiu da chave:');
  eq(/autoaprovação ADMIN/.test(String(aprov.Detail)), true, 'e virou detalhe:');

  // `access_change` guardava um LDAP, não `módulo/chave`. Forçar um módulo aí
  // seria inventar dado.
  const acesso = linhas.find(l => String(l.Log_ID).indexOf('log_bf_') === 0 && l.Action === 'access_change');
  eq(acesso.Module, '');
  eq(acesso.Label, 'brunocs');

  // `seed` guardava só o módulo, sem barra.
  const seed = linhas.find(l => String(l.Log_ID).indexOf('log_bf_') === 0 && l.Action === 'seed');
  eq(seed.Module, 'tips');
  eq(seed.Key, '');
});

check('rodar de novo não duplica nada', () => {
  const r = api.backfillContentLog(true);
  eq(r.novas, 0);
  eq(r.jaImportadas, 3);
  eq(logDaCentral().length, totalAposBackfill, 'a aba não cresceu:');
});

check('a aba Logs continua intacta — o backfill COPIA', () => {
  eq(SS.getSheetByName('Logs')._data.length, 5, 'cabeçalho + 4 linhas:');
});

check('depois do backfill, a atividade recente segue sendo a recente', () => {
  // Este é o bug que a ordenação conserta: as linhas trazidas são as MAIS
  // ANTIGAS e entram no FIM da aba. Sem reordenar, a barra lateral - que lê o
  // fim - mostraria 2024 como "agora".
  const a = api.listContentActivity(5);
  eq(a.some(l => String(l.at).indexOf('2024-') === 0), false, 'nada de 2024 no topo:');
  const datas = a.map(l => l.at);
  eq(datas.slice().sort().reverse(), datas, 'e a ordem continua decrescente:');
});

check('só quem gerencia acesso roda o backfill', () => {
  as('quality1', () => throws(() => api.backfillContentLog(), /Acesso negado/));
});

console.log('\n--- RBAC editável: o dia 1 não muda nada ---');

// Cópia profunda para montar variações sem contaminar o preset.
const clonar = (o) => JSON.parse(JSON.stringify(o));

// `const` no topo de um script do vm NÃO vira propriedade do objeto global —
// só `function` e `var` viram. Por isso as constantes do módulo se leem
// avaliando o nome dentro do contexto, e não por `api.NOME`.
const constante = (nome) => vm.runInContext(nome, ctx);

function presetDe(papel) {
  return clonar(api.contentPresetMatrix_()[papel]);
}

// Devolve a matriz de um papel como ela está VALENDO agora (planilha ou preset).
function matrizAtual(papel) {
  return clonar(api.contentPermsSnapshot_().roles[papel]);
}

check('a aba Content_Roles nasce semeada com os quatro papéis de hoje', () => {
  const aba = SS.getSheetByName('Content_Roles');
  eq(aba._data[0], ['Role', 'Permissions', 'Active', 'Updated_By', 'Updated_At']);
  eq(aba._data.slice(1).map(r => r[0]).sort(), ['ADMIN', 'QA', 'TL', 'WFM']);
});

check('o preset reproduz EXATAMENTE o que a constante antiga dizia', () => {
  // Esta é a promessa do ADR-0009: no dia da migração ninguém percebe nada.
  // Comparar contra a constante, e não contra um literal escrito à mão, é o que
  // faz o teste continuar valendo se a constante mudar.
  const antigos = constante('CONTENT_ROLES');
  Object.keys(antigos).forEach((papel) => {
    const antigo = antigos[papel];
    const novo = api.contentPresetMatrix_()[papel];

    eq(api.modulosEscrevivies_(novo), antigo.propose.slice(),
      papel + ': módulos que escreve —');
    eq(api.podeGlobal_(novo, 'manageAccess'), antigo.manageAccess, papel + ': gerencia acesso —');
    eq(api.podeGlobal_(novo, 'selfApprove'), antigo.selfApprove, papel + ': aprova a si —');
    eq(constante('CONTENT_MODULES').some((m) => api.podeAprovarModulo_(novo, m)), antigo.approve,
      papel + ': aprova algo —');
  });
});

check('propor e publicar direto viraram casas diferentes', () => {
  const wfm = matrizAtual('WFM');
  // WFM tem os dois módulos, mas por caminhos diferentes: links passa pela
  // fila, disponibilidade vai ao ar na hora. A lista `propose` antiga não
  // sabia dizer isso.
  eq(api.podeNoModulo_(wfm, 'links', 'propose'), true);
  eq(api.podeNoModulo_(wfm, 'links', 'publish'), false, 'não existe publicar direto no catálogo:');
  eq(api.podeNoModulo_(wfm, 'bau_availability', 'publish'), true);
  eq(api.podeNoModulo_(wfm, 'bau_availability', 'propose'), false, 'não existe fila na operação:');
});

check('ver virou coluna: QA enxerga links, não enxerga people', () => {
  const qa = matrizAtual('QA');
  eq(api.podeNoModulo_(qa, 'links', 'view'), true);
  eq(api.podeNoModulo_(qa, 'people', 'view'), false);
});

console.log('\n--- RBAC editável: mudar sem deploy ---');

check('só quem gerencia papéis lê a matriz', () => {
  as('quality1', () => throws(() => api.listContentRoles(), /Acesso negado/));
  const r = api.listContentRoles();
  eq(r.roles.map(x => x.role), ['ADMIN', 'QA', 'TL', 'WFM']);
  eq(r.fallback, false, 'está lendo da planilha, não do preset:');
});

check('dar links ao QA passa a valer na hora, sem deploy', () => {
  as('quality1', () => throws(
    () => api.saveContentDraft({ module: 'links', key: 'tech', label: 'X', value: '{}' }),
    /não edita o módulo/));

  const qa = presetDe('QA');
  qa.modules.links.propose = true;
  eq(api.saveContentRole('QA', qa, {}).status, 'success');

  // Terceira invariante: vale AGORA. Sem invalidar o cache, este mesmo teste
  // passaria só depois de cinco minutos.
  as('quality1', () => {
    const d = api.saveContentDraft({
      module: 'links', key: 'tech', lang: 'ALL', label: 'Link do QA',
      value: JSON.stringify({ name: 'QA', url: 'https://go/qa', desc: 'x' })
    });
    eq(!!d.draftId, true);
  });
});

check('e tirar também vale na hora', () => {
  const qa = presetDe('QA');
  eq(api.saveContentRole('QA', qa, {}).status, 'success');
  as('quality1', () => throws(
    () => api.saveContentDraft({ module: 'links', key: 'tech', label: 'X', value: '{}' }),
    /não edita o módulo/));
});

check('um papel novo que publica disponibilidade e nada mais', () => {
  // É o exemplo que o ADR-0009 dá para justificar separar propor de publicar.
  const so = api.normalizeRoleMatrix_({ modules: {}, global: {} });
  so.modules.bau_availability.publish = true;
  so.modules.bau_availability.view = true;

  eq(api.saveContentRole('PLANNER', so, {}).status, 'success');
  api.saveContentAccess('plan1', 'PLANNER', true);

  as('plan1', () => {
    const s = api.getContentSession();
    eq(s.proposableModules, ['bau_availability']);
    eq(s.canApprove, false);
    // Não enxerga nem os links, porque `ver` é casa própria e ninguém marcou.
    throws(() => api.listContentItems('links'), /não tem acesso ao módulo/);
    const r = api.publishContentDirect({
      module: 'bau_availability', label: 'Disponibilidade',
      value: JSON.stringify({ segments: { PT: { attention: '2026-10-01' }, ES: {} } })
    });
    eq(r.status, 'success');
  });
});

console.log('\n--- RBAC editável: as invariantes ---');

check('1. não dá para deixar a Central sem quem governe (pelo papel)', () => {
  const admin = presetDe('ADMIN');
  admin.global.manageRoles = false;
  throws(() => api.saveContentRole('ADMIN', admin, { confirmSelf: true }),
    /sem ninguém capaz de gerenciar papéis e acessos/);
});

check('1. nem pelo acesso — e a checagem é sobre quem SOBRA', () => {
  throws(() => api.saveContentAccess('lucaste', 'ADMIN', false),
    /sem ninguém capaz de gerenciar papéis e acessos/);

  // Com um segundo governante, sair passa a ser permitido: a trava é sobre
  // ficar sem ninguém, não sobre a pessoa.
  api.saveContentAccess('admin2', 'ADMIN', true);
  eq(api.saveContentAccess('lucaste', 'ADMIN', false).status, 'success');

  as('admin2', () => { eq(api.saveContentAccess('lucaste', 'ADMIN', true).status, 'success'); });
});

check('2. escalação nova exige declaração — e não escreve enquanto não vier', () => {
  const tl = presetDe('TL');
  tl.global.selfApprove = true;

  const r = api.saveContentRole('TL', tl, {});
  eq(r.status, 'confirm');
  eq(r.reason, 'escalation');
  eq(r.modules.indexOf('links') !== -1, true, 'nomeia os módulos afetados:');
  // O importante: nada foi gravado.
  eq(api.podeGlobal_(matrizAtual('TL'), 'selfApprove'), false, 'nada foi gravado:');

  const ok = api.saveContentRole('TL', tl, { confirmEscalation: true });
  eq(ok.status, 'success');
  eq(api.podeGlobal_(matrizAtual('TL'), 'selfApprove'), true);

  api.saveContentRole('TL', presetDe('TL'), {});
});

check('2. o que já era escalada não pede declaração de novo', () => {
  // O ADMIN já publica sozinho por desenho. Pedir confirmação a cada ajuste
  // de outra coisa transformaria o aviso em ruído — e aviso que vira ruído
  // deixa de ser lido justamente quando importa.
  const admin = presetDe('ADMIN');
  admin.global.viewAudit = false;
  const r = api.saveContentRole('ADMIN', admin, { confirmSelf: true });
  eq(r.status, 'success');
  api.saveContentRole('ADMIN', presetDe('ADMIN'), { confirmSelf: true });
});

check('3. revogação é imediata, não por TTL', () => {
  api.saveContentAccess('temp1', 'TL', true);
  as('temp1', () => eq(api.getContentSession().hasAccess, true));

  api.saveContentAccess('temp1', 'TL', false);
  as('temp1', () => eq(api.getContentSession().hasAccess, false, 'ainda tinha acesso:'));
});

check('4. aprovar people exige gerenciar acessos, e isso é recusado ao salvar', () => {
  const tl = presetDe('TL');
  tl.modules.people.approve = true;
  throws(() => api.saveContentRole('TL', tl, {}),
    /exige também a permissão 'manageAccess'/);
});

console.log('\n--- RBAC editável: bordas ---');

check('editar o próprio papel pede confirmação à parte', () => {
  const admin = presetDe('ADMIN');
  admin.global.viewAudit = false;

  const r = api.saveContentRole('ADMIN', admin, {});
  eq(r.status, 'confirm');
  eq(r.reason, 'self');
  eq(api.podeGlobal_(matrizAtual('ADMIN'), 'viewAudit'), true, 'nada foi gravado:');

  const ok = api.saveContentRole('ADMIN', admin, { confirmSelf: true });
  eq(ok.reloadSession, true, 'a tela precisa recarregar a sessão:');
  api.saveContentRole('ADMIN', presetDe('ADMIN'), { confirmSelf: true });
});

check('papel em uso não pode ser desativado', () => {
  throws(() => api.saveContentRole('PLANNER', matrizAtual('PLANNER'), { active: false }),
    /ainda é de 1 pessoa/);
});

check('nome de papel inválido é recusado', () => {
  throws(() => api.saveContentRole('mi nusculo', presetDe('QA'), {}), /Nome de papel inválido/);
  throws(() => api.saveContentRole('X', presetDe('QA'), {}), /Nome de papel inválido/);
});

check('permissão desconhecida não entra pela porta dos fundos', () => {
  const inventada = api.normalizeRoleMatrix_({
    modules: { links: { view: true, propose: true, voar: true }, naoexiste: { view: true } },
    global: { manageAccess: false, virarDeus: true }
  });
  eq(inventada.modules.links.voar, undefined, 'ação inventada não vira casa:');
  eq(inventada.modules.naoexiste, undefined, 'módulo inventado não vira linha:');
  eq(inventada.global.virarDeus, undefined, 'permissão global inventada não entra:');
});

check('aprovar não existe em módulo que publica direto, nem marcado à mão', () => {
  const m = api.normalizeRoleMatrix_({
    modules: { broadcast: { view: true, publish: true, approve: true } }, global: {}
  });
  eq(m.modules.broadcast.approve, false, 'não existe aprovar um aviso:');
});

check('a alteração de papel vai para a auditoria com o que MUDOU', () => {
  const qa = presetDe('QA');
  qa.modules.tips.propose = true;
  api.saveContentRole('QA', qa, {});

  const linha = logDaCentral().filter(l => l.Action === 'role_update').pop();
  eq(linha.Label, 'QA');
  eq(/tips\.propose: não → sim/.test(String(linha.Detail)), true,
    'o log precisa dizer o que mudou, não o estado final: ' + linha.Detail);

  api.saveContentRole('QA', presetDe('QA'), {});
});

check('planilha ilegível cai no preset em vez de trancar todo mundo', () => {
  const aba = SS.getSheetByName('Content_Roles');
  const guardado = aba._data.map(r => r.slice());

  // JSON quebrado em TODAS as linhas: nenhum papel utilizável sobra.
  for (let i = 1; i < aba._data.length; i++) aba._data[i][1] = '{quebrado';
  api.invalidateContentPermsCache_();

  const snap = api.contentPermsSnapshot_();
  eq(snap.fallback, true, 'deveria estar no preset:');
  eq(api.getContentSession().role, 'ADMIN', 'e o ADMIN continua entrando:');

  aba._data.length = 0;
  guardado.forEach(r => aba._data.push(r));
  api.invalidateContentPermsCache_();
  eq(api.contentPermsSnapshot_().fallback, false);
});

check('uma linha quebrada não derruba os outros papéis', () => {
  const aba = SS.getSheetByName('Content_Roles');
  const alvo = aba._data.findIndex(r => r[0] === 'QA');
  const guardado = aba._data[alvo][1];

  aba._data[alvo][1] = '{quebrado';
  api.invalidateContentPermsCache_();

  const snap = api.contentPermsSnapshot_();
  eq(snap.fallback, false, 'não é caso de fallback geral:');
  eq(!!snap.roles.ADMIN, true, 'ADMIN sobreviveu:');
  eq(!!snap.roles.QA, false, 'e o papel quebrado simplesmente não existe:');

  // Quem tinha o papel quebrado perde o acesso, em vez de herdar um papel
  // qualquer — desconhecido é sem privilégio, como no resto do produto.
  as('quality1', () => eq(api.getContentSession().hasAccess, false));

  aba._data[alvo][1] = guardado;
  api.invalidateContentPermsCache_();
});

console.log('\n--- Ver como: a prévia nunca concede ---');

check('só quem gerencia papéis pode ver como outro', () => {
  as('quality1', () => throws(() => api.previewContentSession('ADMIN'), /Acesso negado/));
});

check('a prévia devolve a sessão do papel escolhido', () => {
  const p = api.previewContentSession('QA');
  eq(p.role, 'QA');
  eq(p.preview, true);
  eq(p.realRole, 'ADMIN', 'a prévia diz de quem ela é:');
  eq(p.ldap, 'lucaste', 'a identidade real não muda:');
  eq(p.proposableModules, ['call_script', 'note_template']);
  eq(p.canManageAccess, false);
});

check('a prévia é INTERSECTADA com quem pergunta — nunca amplia', () => {
  // Um papel que governa mas não toca no catálogo. É o caso que importa:
  // ver como ADMIN, sendo ele, não pode virar um caminho para agir como ADMIN.
  const gov = api.normalizeRoleMatrix_({ modules: {}, global: {} });
  gov.global.manageRoles = true;
  gov.global.manageAccess = true;
  gov.modules.links.view = true;
  eq(api.saveContentRole('GOV', gov, {}).status, 'success');
  api.saveContentAccess('gov1', 'GOV', true);

  as('gov1', () => {
    const p = api.previewContentSession('ADMIN');
    eq(p.role, 'ADMIN', 'o rótulo é o do papel previsto:');
    // ...mas nada do poder que gov1 não tem atravessa.
    eq(p.proposableModules, [], 'a prévia não deu escrita nenhuma:');
    eq(p.canSelfApprove, false, 'nem aprovar a si mesmo:');
    eq(p.canApprove, false);
    verdadeiro(p.beyond.length > 0, 'o que ficou de fora precisa ser dito');
    verdadeiro(p.beyond.indexOf('links.propose') !== -1,
      'links.propose deveria estar no que ficou de fora: ' + p.beyond.join(','));
  });
});

check('a prévia não é caminho de escrita: o servidor segue julgando quem clicou', () => {
  as('gov1', () => {
    api.previewContentSession('ADMIN');
    // Mesmo "sendo ADMIN" na tela, escrever continua sendo recusado.
    throws(() => api.saveContentDraft({ module: 'links', key: 'tech', label: 'X', value: '{}' }),
      /não edita o módulo/);
  });
});

check('papel inexistente na prévia é recusado', () => {
  throws(() => api.previewContentSession('NAOEXISTE'), /Papel desconhecido/);
});

console.log('\n' + (fail ? '✗' : '✓') + ` ${pass} passaram, ${fail} falharam\n`);
process.exit(fail ? 1 : 0);
