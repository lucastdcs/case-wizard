// scripts/test-people-api.js
//
// Harness local da aba "Pessoas" da Central de Conteúdo (PeopleAPI.gs), que não
// roda no Apps Script sem uma planilha de verdade. Mesmo desenho do
// test-content-api.js, com uma diferença que é o ponto do arquivo: aqui o
// Código.gs entra no mesmo contexto, então dá para provar o round-trip inteiro
// — editar pela Central e conferir o que getUserProfileByLdap() passa a
// devolver, que é o que o app do agente de fato lê.
//
// O que precisa estar provado antes de subir:
//   - proposta de TL NÃO muda a aba People (nem o perfil que o app lê);
//   - só o ADMIN aprova mudança de gente, mesmo que o TL aprove conteúdo;
//   - aprovar aplica de verdade: segmento, idioma e liderança mudam juntos;
//   - baixa devolve a pessoa ao fallback restritivo, sem privilégio;
//   - a operação nunca fica sem nenhuma liderança;
//   - o diretório não sai pela leitura pública (JSONP), em nenhuma hipótese;
//   - LDAP é identidade validada, não texto livre.
//
// Uso: npm run test:people

const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

const GAS = path.join(__dirname, '..', 'gas-backend');

// ---- Stub de planilha ----
// O range real conhece a coluna de origem e sabe escrever um BLOCO:
// getRange(linha, coluna, nLinhas, nColunas).setValues([[...]]) é como o
// ContentAPI grava várias colunas numa ida só ao Sheets. Um dublê sem isso
// falha com "setValues is not a function" — foi o que aconteceu quando as
// escritas em lote entraram e só um harness foi atualizado.
class FakeRange {
  constructor(sheet, row, col, numRows, numCols) {
    this.sheet = sheet; this.row = row; this.col = col;
    this.numRows = numRows; this.numCols = numCols;
  }
  setValue(v) {
    while (this.sheet._data.length < this.row) this.sheet._data.push([]);
    this.sheet._data[this.row - 1][this.col - 1] = v;
    return this;
  }
  setValues(rows) {
    rows.forEach((r, i) => {
      const alvo = this.row - 1 + i;
      while (this.sheet._data.length <= alvo) this.sheet._data.push([]);
      r.forEach((v, j) => { this.sheet._data[alvo][this.col - 1 + j] = v; });
    });
    return this;
  }
  getValue() { return (this.sheet._data[this.row - 1] || [])[this.col - 1]; }
  getValues() {
    // getDataRange() (coluna 1, sem limites) devolve a aba inteira.
    if (this.col === 1 && !this.numCols) return this.sheet._data.map((r) => r.slice());
    return this.sheet._data
      .slice(this.row - 1, this.row - 1 + (this.numRows || 1))
      .map((r) => r.slice(this.col - 1, this.col - 1 + (this.numCols || 1)));
  }
}

class FakeSheet {
  constructor(name) { this.name = name; this._data = []; }
  appendRow(row) { this._data.push(row.slice()); }
  getDataRange() { return new FakeRange(this, 1, 1); }
  getRange(row, col, numRows, numCols) { return new FakeRange(this, row, col, numRows, numCols); }
  getLastRow() { return this._data.length; }
  // A baixa de uma pessoa apaga a linha - sem isto o teste da baixa passaria
  // por acidente, contra um stub que não faz nada.
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
let SS, SENT_MAIL, LOGGED, ctx, api;

// Cada bloco de teste começa numa planilha limpa: uma aprovação que roda no
// teste anterior não pode ser o que faz o próximo passar.
function reset(people) {
  SS = new FakeSpreadsheet();
  SENT_MAIL = [];
  LOGGED = [];

  const sandbox = {
    SpreadsheetApp: { getActiveSpreadsheet: () => SS },
    Session: { getActiveUser: () => ({ getEmail: () => CURRENT_USER }) },
    MailApp: { sendEmail: (o) => SENT_MAIL.push(o) },
    Logger: { log: () => { } },
    Utilities: { getUuid: () => require('node:crypto').randomUUID() },
    ContentService: {
      MimeType: { JSON: 'json', JAVASCRIPT: 'js' },
      createTextOutput: (t) => ({ _t: t, setMimeType() { return this; }, getContent() { return this._t; } })
    },
    ScriptApp: { getService: () => ({ getUrl: () => '' }) },
    CacheService: { getScriptCache: () => ({ put() { }, getAll: () => ({}) }) },
    console,
  };

  ctx = vm.createContext(sandbox);
  // A ordem é a do Apps Script: todos os arquivos do projeto no mesmo escopo
  // global. O Código.gs precisa vir antes de reapontarmos handleLog, porque é
  // ele quem declara a função.
  ['Código.js', 'ContentAPI.js', 'PeopleAPI.js'].forEach((f) => {
    vm.runInContext(fs.readFileSync(path.join(GAS, f), 'utf8'), ctx);
  });
  // A auditoria da Central escreve em `Content_Log`, não aqui. handleLog()
  // segue neutralizado porque é o log de SESSÃO do agente.
  sandbox.__captureLog = (p) => LOGGED.push(p);
  vm.runInContext('handleLog = __captureLog;', ctx);

  api = sandbox;

  // A aba People como está em produção: cabeçalho + uma linha por pessoa,
  // lida por índice (LDAP, Role, Role_Category, Segment).
  const sheet = SS.insertSheet('People');
  sheet.appendRow(['LDAP', 'Role', 'Role_Category', 'Segment']);
  (people || []).forEach((p) => sheet.appendRow(p));

  // Content_Access nasce com o ADMIN semeado; o TL e o QA entram aqui.
  as('lucaste', () => {
    api.saveContentAccess('tlaine', 'TL', true);
    api.saveContentAccess('qapessoa', 'QA', true);
  });

  return sheet;
}

const TIME_BASE = [
  ['lucaste', 'Team Lead', 'TL', 'PT'],
  ['anaflor', 'Support Agent', 'Agent', 'PT'],
  ['brunocs', 'Support Agent', 'Agent', 'ES'],
  ['carladm', 'Apprentice', 'Apprentice', 'PT'],
];

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
function throws(fn, re, m) {
  try { fn(); } catch (e) {
    if (re && !re.test(e.message)) throw new Error((m || '') + ' erro inesperado: ' + e.message);
    return;
  }
  throw new Error((m || '') + ' deveria ter lançado erro');
}
// A auditoria da Central mora na aba `Content_Log`, uma coluna por informação.
// `SS` é recriada a cada reset(), então isto lê a planilha do bloco atual.
function logDaCentral() {
  const aba = SS.getSheetByName('Content_Log');
  if (!aba || aba._data.length < 2) return [];
  const cab = aba._data[0];
  return aba._data.slice(1).map((linha) => {
    const o = {};
    cab.forEach((h, i) => { o[h] = linha[i]; });
    return o;
  });
}

function as(ldap, fn) {
  const old = CURRENT_USER;
  CURRENT_USER = ldap + '@google.com';
  try { return fn(); } finally { CURRENT_USER = old; }
}
function peopleRows() {
  return SS.getSheetByName('People')._data.slice(1).map((r) => r.slice());
}
function pendingFor(ldap) {
  return as('lucaste', () => api.listPendingApprovals())
    .filter((d) => d.module === 'people' && d.key === ldap);
}

console.log('\n--- Quem enxerga o diretório ---');

check('TL e ADMIN listam o time', () => {
  reset(TIME_BASE);
  eq(as('lucaste', () => api.listPeople()).length, 4);
  eq(as('tlaine', () => api.listPeople()).length, 4);
});

check('QA não lê o diretório (leitura é tão restrita quanto a escrita)', () => {
  reset(TIME_BASE);
  throws(() => as('qapessoa', () => api.listPeople()), /não tem acesso ao módulo/);
});

check('quem não tem papel na Central não chega nem à lista', () => {
  reset(TIME_BASE);
  throws(() => as('estranho', () => api.listPeople()), /não tem permissão/);
});

check('a lista traz o que a regra deriva: liderança e idioma', () => {
  reset(TIME_BASE);
  const time = as('lucaste', () => api.listPeople());
  const porLdap = {};
  time.forEach((p) => { porLdap[p.ldap] = p; });

  eq(porLdap.lucaste.isOverhead, true, 'TL é liderança:');
  eq(porLdap.anaflor.isOverhead, false, 'Agent não é:');
  eq(porLdap.carladm.isOverhead, false, 'Apprentice não é:');
  eq(porLdap.brunocs.defaultLanguage, 'ES', 'segmento ES vira idioma ES:');
  eq(porLdap.anaflor.defaultLanguage, 'PT-BR');
});

console.log('\n--- Proposta do TL não muda nada (a garantia central) ---');

check('TL propõe troca de segmento e a aba People fica intacta', () => {
  reset(TIME_BASE);
  const antes = peopleRows();

  const res = as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  eq(res.applied, false, 'não pode ter aplicado:');
  eq(peopleRows(), antes, 'a aba não pode ter mudado:');
});

check('e o perfil que o APP lê continua o antigo até alguém aprovar', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const perfil = api.getUserProfileByLdap('anaflor');
  eq(perfil.segment, 'PT', 'segmento ainda é o antigo:');
  eq(perfil.defaultLanguage, 'PT-BR', 'idioma ainda é o antigo:');
});

check('a proposta chega à fila do ADMIN com o antes e o depois', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const fila = pendingFor('anaflor');
  eq(fila.length, 1);
  eq(JSON.parse(fila[0].currentValue).segment, 'PT', 'hoje no ar:');
  eq(JSON.parse(fila[0].value).segment, 'ES', 'proposto:');
  eq(fila[0].isNew, false);
  eq(fila[0].proposedBy, 'tlaine');
});

check('o TL é avisado por e-mail? não — quem é avisado é quem aprova', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));
  if (!SENT_MAIL.length) throw new Error('nenhum aviso saiu para os aprovadores');
});

console.log('\n--- Só o ADMIN aprova gente ---');

check('TL não aprova a proposta de outra pessoa em people', () => {
  reset(TIME_BASE);
  as('lucaste', () => api.savePeopleChange({
    ldap: 'brunocs', role: 'Support Agent', roleCategory: 'TL', segment: 'ES'
  }));
  // A do ADMIN já aplicou; o que interessa é a de um TL na fila.
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const draftId = pendingFor('anaflor')[0].draftId;
  throws(() => as('tlaine', () => api.approveContentDraft(draftId, '')), /só o ADMIN aprova/i);
});

check('TL também não REJEITA proposta de gente', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));
  const draftId = pendingFor('anaflor')[0].draftId;
  throws(() => as('tlaine', () => api.rejectContentDraft(draftId, 'não')), /só o ADMIN aprova/i);
});

check('a fila mostra ao TL que aquela linha não é dele para revisar', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const vistaDoTl = as('tlaine', () => api.listPendingApprovals())
    .filter((d) => d.module === 'people');
  eq(vistaDoTl.length, 1, 'o TL enxerga a proposta:');
  eq(vistaDoTl[0].canReview, false, 'mas não pode revisá-la:');

  const vistaDoAdmin = pendingFor('anaflor');
  eq(vistaDoAdmin[0].canReview, true, 'o ADMIN pode:');
});

check('TL segue aprovando CONTEÚDO normalmente (a restrição é só de people)', () => {
  reset(TIME_BASE);
  const d = as('qapessoa', () => api.saveContentDraft({
    module: 'call_script', key: 'BAU', field: 'inicio', lang: 'PT',
    label: 'Passo novo', value: 'Bom dia!'
  }));
  as('qapessoa', () => api.submitContentDraft(d.draftId));

  const res = as('tlaine', () => api.approveContentDraft(d.draftId, 'ok'));
  eq(res.status, 'success');
});

console.log('\n--- Aprovar aplica de verdade (round-trip até o app) ---');

check('ADMIN aprova e a aba People muda', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const draftId = pendingFor('anaflor')[0].draftId;
  const res = as('lucaste', () => api.approveContentDraft(draftId, ''));

  eq(res.outcome, 'updated');
  const linha = peopleRows().find((r) => r[0] === 'anaflor');
  eq(linha, ['anaflor', 'Support Agent', 'Agent', 'ES']);
});

check('e o perfil que o APP lê muda junto — segmento e idioma', () => {
  reset(TIME_BASE);
  eq(api.getUserProfileByLdap('anaflor').defaultLanguage, 'PT-BR', 'antes:');

  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));
  as('lucaste', () => api.approveContentDraft(pendingFor('anaflor')[0].draftId, ''));

  const depois = api.getUserProfileByLdap('anaflor');
  eq(depois.segment, 'ES', 'depois, segmento:');
  eq(depois.defaultLanguage, 'ES', 'depois, idioma:');
});

check('promover alguém a liderança abre o TL Dashboard para ela', () => {
  reset(TIME_BASE);
  eq(api.getUserProfileByLdap('anaflor').isOverhead, false, 'antes:');

  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Team Lead', roleCategory: 'TL', segment: 'PT'
  }));
  as('lucaste', () => api.approveContentDraft(pendingFor('anaflor')[0].draftId, ''));

  eq(api.getUserProfileByLdap('anaflor').isOverhead, true, 'depois:');
});

check('rejeitar devolve ao autor e não encosta na aba People', () => {
  reset(TIME_BASE);
  const antes = peopleRows();
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Team Lead', roleCategory: 'TL', segment: 'PT'
  }));
  as('lucaste', () => api.rejectContentDraft(pendingFor('anaflor')[0].draftId, 'combinar antes'));

  eq(peopleRows(), antes, 'aba intacta:');
  eq(api.getUserProfileByLdap('anaflor').isOverhead, false);
});

console.log('\n--- ADMIN aplica na hora ---');

check('mudança do ADMIN não passa pela fila', () => {
  reset(TIME_BASE);
  const res = as('lucaste', () => api.savePeopleChange({
    ldap: 'brunocs', role: 'Senior Agent', roleCategory: 'Agent', segment: 'PT'
  }));

  eq(res.applied, true);
  eq(pendingFor('brunocs').length, 0, 'nada ficou pendente:');
  eq(api.getUserProfileByLdap('brunocs').defaultLanguage, 'PT-BR');
});

check('e não dispara e-mail de "aguardando revisão" para ninguém', () => {
  reset(TIME_BASE);
  as('lucaste', () => api.savePeopleChange({
    ldap: 'brunocs', role: 'Senior Agent', roleCategory: 'Agent', segment: 'PT'
  }));
  eq(SENT_MAIL.length, 0);
});

check('a aplicação direta do ADMIN vai para o log, marcada como tal', () => {
  reset(TIME_BASE);
  as('lucaste', () => api.savePeopleChange({
    ldap: 'brunocs', role: 'Senior Agent', roleCategory: 'Agent', segment: 'PT'
  }));

  // A auditoria deixou de ser linha na aba `Logs` genérica e virou a aba
  // `Content_Log`, com uma coluna por informação.
  const evento = logDaCentral().find((l) => String(l.Action).indexOf('people_') === 0);
  eq(evento.Action, 'people_updated');
  eq(evento.Module, 'people', 'o módulo tem coluna própria:');
  // O LDAP alvo fica limpo na chave: com o sufixo colado ali, a mesma pessoa
  // viraria dois valores para quem filtrar a auditoria por ela.
  eq(evento.Key, 'brunocs', 'a chave é só o LDAP alvo:');
  if (!/próprio ADMIN/.test(String(evento.Detail))) {
    throw new Error('o log não registra que foi o próprio ADMIN: ' + evento.Detail);
  }
});

console.log('\n--- Entrada e saída de agente ---');

check('admissão: pessoa nova entra na aba e ganha perfil real', () => {
  reset(TIME_BASE);
  const antes = api.getUserProfileByLdap('novapes');
  eq(antes.role, 'Unknown', 'antes é o fallback restritivo:');
  eq(antes.isOverhead, false);

  as('lucaste', () => api.savePeopleChange({
    ldap: 'novapes', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const depois = api.getUserProfileByLdap('novapes');
  eq(depois.role, 'Support Agent');
  eq(depois.defaultLanguage, 'ES');
  eq(peopleRows().length, 5);
});

check('admissão proposta por TL aparece na lista como entrada pendente', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'novapes', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));

  const nova = as('tlaine', () => api.listPeople()).find((p) => p.ldap === 'novapes');
  if (!nova) throw new Error('a admissão proposta sumiu da tela de quem propôs');
  eq(nova.isIncoming, true);
  eq(nova.pending.action, 'upsert');
  eq(peopleRows().length, 4, 'e a aba segue sem ela:');
});

check('baixa: a linha some e a pessoa volta ao fallback restritivo', () => {
  reset(TIME_BASE);
  as('lucaste', () => api.requestPeopleRemoval('brunocs', 'saiu do time'));

  eq(peopleRows().length, 3);
  const perfil = api.getUserProfileByLdap('brunocs');
  eq(perfil.role, 'Unknown');
  eq(perfil.isOverhead, false);
  eq(perfil.defaultLanguage, 'PT-BR');
});

check('baixa proposta por TL espera o ADMIN e não apaga nada', () => {
  reset(TIME_BASE);
  const res = as('tlaine', () => api.requestPeopleRemoval('brunocs', 'saiu do time'));

  eq(res.applied, false);
  eq(peopleRows().length, 4, 'ninguém saiu ainda:');
  eq(api.getUserProfileByLdap('brunocs').role, 'Support Agent');

  as('lucaste', () => api.approveContentDraft(pendingFor('brunocs')[0].draftId, ''));
  eq(peopleRows().length, 3, 'agora sim:');
});

check('baixa sem motivo é recusada', () => {
  reset(TIME_BASE);
  throws(() => as('lucaste', () => api.requestPeopleRemoval('brunocs', '  ')), /motivo/i);
  eq(peopleRows().length, 4);
});

check('baixa de quem não está na aba é recusada', () => {
  reset(TIME_BASE);
  throws(() => as('lucaste', () => api.requestPeopleRemoval('ninguem', 'x')), /não encontrada/i);
});

console.log('\n--- Travas ---');

check('a operação nunca fica sem liderança: baixa do último TL é recusada', () => {
  reset([['lucaste', 'Team Lead', 'TL', 'PT'], ['anaflor', 'Support Agent', 'Agent', 'PT']]);
  throws(
    () => as('lucaste', () => api.requestPeopleRemoval('lucaste', 'saindo')),
    /sem nenhuma liderança/i
  );
  eq(peopleRows().length, 2);
});

check('nem rebaixando o último TL a agente', () => {
  reset([['lucaste', 'Team Lead', 'TL', 'PT'], ['anaflor', 'Support Agent', 'Agent', 'PT']]);
  throws(() => as('lucaste', () => api.savePeopleChange({
    ldap: 'lucaste', role: 'Support Agent', roleCategory: 'Agent', segment: 'PT'
  })), /sem nenhuma liderança/i);
  eq(api.getUserProfileByLdap('lucaste').isOverhead, true);
});

check('com outra liderança de pé, o rebaixamento passa', () => {
  reset(TIME_BASE.concat([['outrotl', 'Team Lead', 'TL', 'PT']]));
  as('lucaste', () => api.savePeopleChange({
    ldap: 'lucaste', role: 'Support Agent', roleCategory: 'Agent', segment: 'PT'
  }));
  eq(api.getUserProfileByLdap('lucaste').isOverhead, false);
});

check('a trava é revalidada na APROVAÇÃO, não só na proposta', () => {
  // O TL propõe rebaixar a si mesmo enquanto há duas lideranças. Antes de o
  // ADMIN aprovar, a outra liderança sai. Aprovar depois disso zeraria o time.
  reset([
    ['lucaste', 'Team Lead', 'TL', 'PT'],
    ['tlaine', 'Team Lead', 'TL', 'PT'],
    ['anaflor', 'Support Agent', 'Agent', 'PT'],
  ]);

  as('tlaine', () => api.savePeopleChange({
    ldap: 'tlaine', role: 'Support Agent', roleCategory: 'Agent', segment: 'PT'
  }));
  as('lucaste', () => api.requestPeopleRemoval('lucaste', 'saindo da operação'));

  throws(
    () => as('lucaste', () => api.approveContentDraft(pendingFor('tlaine')[0].draftId, '')),
    /sem nenhuma liderança/i
  );
});

check('aba vazia: o primeiro cadastro pode ser um agente', () => {
  // A trava é sobre PERDER a última liderança, não sobre exigir uma. Sem essa
  // distinção, numa planilha nova só daria para cadastrar um TL primeiro — e
  // admitir um agente exigiria editar a aba na mão.
  reset([]);
  as('lucaste', () => api.savePeopleChange({
    ldap: 'novapes', role: 'Support Agent', roleCategory: 'Agent', segment: 'PT'
  }));
  eq(peopleRows(), [['novapes', 'Support Agent', 'Agent', 'PT']]);
});

check('duas propostas pendentes para a mesma pessoa é recusado', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Support Agent', roleCategory: 'Agent', segment: 'ES'
  }));
  throws(() => as('tlaine', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Team Lead', roleCategory: 'TL', segment: 'PT'
  })), /já existe uma alteração em revisão/i);
});

check('aprovar uma baixa de alguém que já saiu na mão não escreve lixo', () => {
  reset(TIME_BASE);
  as('tlaine', () => api.requestPeopleRemoval('brunocs', 'saiu'));
  // Alguém apagou a linha direto na planilha nesse meio-tempo.
  const sheet = SS.getSheetByName('People');
  sheet.deleteRow(sheet._data.findIndex((r) => r[0] === 'brunocs') + 1);

  throws(
    () => as('lucaste', () => api.approveContentDraft(pendingFor('brunocs')[0].draftId, '')),
    /já não está na aba/i
  );
});

console.log('\n--- LDAP é identidade, não texto livre ---');

check('LDAP com @ é recusado', () => {
  reset(TIME_BASE);
  throws(() => as('lucaste', () => api.savePeopleChange({
    ldap: 'ana@google.com', role: 'Agent', roleCategory: 'Agent', segment: 'PT'
  })), /LDAP inválido/i);
});

check('LDAP com espaço é recusado (casaria com ninguém, em silêncio)', () => {
  reset(TIME_BASE);
  throws(() => as('lucaste', () => api.savePeopleChange({
    ldap: 'ana flor', role: 'Agent', roleCategory: 'Agent', segment: 'PT'
  })), /LDAP inválido/i);
});

check('LDAP em maiúsculas é normalizado, não recusado', () => {
  reset(TIME_BASE);
  as('lucaste', () => api.savePeopleChange({
    ldap: '  ANAFLOR  ', role: 'Senior Agent', roleCategory: 'Agent', segment: 'PT'
  }));
  eq(peopleRows().find((r) => r[0] === 'anaflor')[1], 'Senior Agent');
  eq(peopleRows().length, 4, 'atualizou a linha, não criou outra:');
});

check('cargo, categoria e segmento em branco são recusados', () => {
  reset(TIME_BASE);
  ['role', 'roleCategory', 'segment'].forEach((campo) => {
    const p = { ldap: 'anaflor', role: 'Agent', roleCategory: 'Agent', segment: 'PT' };
    p[campo] = '   ';
    throws(() => as('lucaste', () => api.savePeopleChange(p)), /Preencha o campo/i, campo + ':');
  });
});

console.log('\n--- O diretório não sai pela porta pública ---');

check('handleContentPublicRead recusa o módulo people', () => {
  reset(TIME_BASE);
  throws(() => api.handleContentPublicRead({ module: 'people' }), /não tem leitura pública/i);
});

check('e pela URL do web app (JSONP) também não vaza', () => {
  reset(TIME_BASE);
  const out = api.doGet({ parameter: { op: 'content_public', module: 'people' } }).getContent();
  const body = JSON.parse(out);

  eq(body.status, 'error', 'a rota pública tem de falhar:');
  if (/anaflor|brunocs|Support Agent/.test(out)) {
    throw new Error('vazou gente na resposta pública: ' + out);
  }
});

console.log('\n--- Convivência com o resto da planilha ---');

check('coluna extra na aba People sobrevive à edição', () => {
  reset(TIME_BASE);
  const sheet = SS.getSheetByName('People');
  sheet._data[0].push('Observacao');
  sheet._data[2].push('entrou em 2024');   // anaflor

  as('lucaste', () => api.savePeopleChange({
    ldap: 'anaflor', role: 'Senior Agent', roleCategory: 'Agent', segment: 'PT'
  }));

  const linha = peopleRows().find((r) => r[0] === 'anaflor');
  eq(linha[1], 'Senior Agent', 'o cargo mudou:');
  eq(linha[4], 'entrou em 2024', 'e a coluna extra ficou de pé:');
});

check('a aba People nasce com cabeçalho se não existir', () => {
  reset(TIME_BASE);
  delete SS.sheets.People;

  as('lucaste', () => api.savePeopleChange({
    ldap: 'novapes', role: 'Support Agent', roleCategory: 'Agent', segment: 'PT'
  }));

  eq(SS.getSheetByName('People')._data[0], ['LDAP', 'Role', 'Role_Category', 'Segment']);
  eq(peopleRows(), [['novapes', 'Support Agent', 'Agent', 'PT']]);
});

console.log('\n' + (fail ? '✗' : '✓') + ' ' + pass + ' passaram, ' + fail + ' falharam\n');
process.exit(fail ? 1 : 0);
