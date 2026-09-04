// scripts/test-user-prefs.js
//
// Harness local para as ops de preferências do agente (get_user_prefs /
// save_user_prefs) do Código.js, que não rodam no Apps Script sem uma planilha
// de verdade. Mesmo desenho do test-content-api.js: stub mínimo de
// SpreadsheetApp/ContentService/Logger e chamadas via doGet(), que é como o
// front realmente as invoca (JSONP).
//
// O que precisa estar provado antes de subir:
//   - a aba nasce com cabeçalho e uma linha por agente (nunca duplica);
//   - salvar de novo SUBSTITUI a linha da pessoa, não empilha;
//   - o blob de um agente nunca vaza para outro;
//   - payload inválido é recusado na escrita, e não descoberto na leitura;
//   - linha corrompida devolve {} em vez de derrubar o agente.
//
// Uso: npm run test:prefs

const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

const SRC = path.join(__dirname, '..', 'gas-backend', 'Código.js');

// ---- Stub de planilha ----
// Mesma forma do range real dos outros harnesses: escrita em BLOCO por
// getRange(linha, coluna, nLinhas, nColunas).setValues([[...]]). O código que
// este arquivo exercita ainda não escreve assim; o dublê acompanha mesmo assim
// para que a próxima escrita em lote não quebre aqui como quebrou em people.
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
  getValue() {
    const linha = this.sheet._data[this.row - 1] || [];
    return linha[this.col - 1];
  }
  getValues() {
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
  deleteRow(i) { this._data.splice(i - 1, 1); }
}

class FakeSpreadsheet {
  constructor() { this.sheets = {}; }
  getSheetByName(n) { return this.sheets[n] || null; }
  insertSheet(n) { return (this.sheets[n] = new FakeSheet(n)); }
}

const SS = new FakeSpreadsheet();
const LOGGER = [];

const sandbox = {
  SpreadsheetApp: { getActiveSpreadsheet: () => SS },
  Session: { getActiveUser: () => ({ getEmail: () => 'lucaste@google.com' }) },
  Logger: { log: (m) => LOGGER.push(String(m)) },
  Utilities: { getUuid: () => require('node:crypto').randomUUID() },
  ContentService: {
    MimeType: { JAVASCRIPT: 'js', JSON: 'json' },
    createTextOutput: (texto) => ({ _texto: texto, setMimeType() { return this; } }),
  },
  HtmlService: { createHtmlOutputFromFile: () => ({ setTitle() { return this; }, setXFrameOptionsMode() { return this; }, addMetaTag() { return this; } }), XFrameOptionsMode: { ALLOWALL: 1 } },
  console,
};

const ctx = vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(SRC, 'utf8'), ctx);

// doGet devolve a resposta JSONP; aqui só interessa o objeto que ela embrulha.
function chamar(params) {
  const saida = ctx.doGet({ parameter: params });
  return JSON.parse(saida._texto);
}

let fail = 0;
function check(name, fn) {
  try { fn(); console.log('  ✓ ' + name); }
  catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

const ATALHOS = JSON.stringify({
  shortcuts: [{
    id: 'sc_1', kind: 'note', label: 'Fim do 2 Day', alias: '2day', order: 0,
    payload: { caseType: 'bau', status: 'IN', subStatus: 'IN_Not_Reachable', scenarios: [{ id: 'quickfill-in-no-show-bau', substatus: 'IN_Not_Reachable' }] },
  }],
});

console.log('\n--- Preferências do agente (User_Prefs) ---');

check('agente sem preferência nenhuma recebe {} , não erro', () => {
  const r = chamar({ op: 'get_user_prefs', user: 'ninguem@google.com' });
  if (r.status !== 'success') throw new Error('status: ' + JSON.stringify(r));
  if (JSON.stringify(r.prefs) !== '{}') throw new Error('esperava {}, veio ' + JSON.stringify(r.prefs));
});

check('a aba nasce com cabeçalho', () => {
  const aba = SS.getSheetByName('User_Prefs');
  if (!aba) throw new Error('a aba não foi criada');
  if (JSON.stringify(aba._data[0]) !== JSON.stringify(['User_Email', 'Prefs_JSON', 'LastUpdated'])) {
    throw new Error('cabeçalho inesperado: ' + JSON.stringify(aba._data[0]));
  }
});

check('salvar e ler de volta devolve o mesmo blob', () => {
  const s = chamar({ op: 'save_user_prefs', user: 'ana@google.com', prefs: ATALHOS });
  if (s.status !== 'success' || s.action !== 'create') throw new Error(JSON.stringify(s));

  const r = chamar({ op: 'get_user_prefs', user: 'ana@google.com' });
  if (JSON.stringify(r.prefs) !== ATALHOS) throw new Error('o blob voltou diferente: ' + JSON.stringify(r.prefs));
});

check('salvar de novo SUBSTITUI a linha, não empilha', () => {
  const novo = JSON.stringify({ shortcuts: [], shortcutsSortByUsage: false });
  const s = chamar({ op: 'save_user_prefs', user: 'ana@google.com', prefs: novo });
  if (s.action !== 'update') throw new Error('esperava update, veio ' + s.action);

  const aba = SS.getSheetByName('User_Prefs');
  const linhasDaAna = aba._data.filter((l) => String(l[0]).includes('ana@'));
  if (linhasDaAna.length !== 1) throw new Error(`a pessoa ficou com ${linhasDaAna.length} linhas`);

  const r = chamar({ op: 'get_user_prefs', user: 'ana@google.com' });
  if (JSON.stringify(r.prefs) !== novo) throw new Error('leu a versão antiga');
});

check('e-mail é normalizado: maiúsculas e espaços não criam uma segunda linha', () => {
  chamar({ op: 'save_user_prefs', user: '  ANA@google.com ', prefs: ATALHOS });
  const aba = SS.getSheetByName('User_Prefs');
  const linhasDaAna = aba._data.filter((l) => String(l[0]).toLowerCase().includes('ana@'));
  if (linhasDaAna.length !== 1) throw new Error(`virou ${linhasDaAna.length} linhas para a mesma pessoa`);
});

check('o blob de um agente não vaza para outro', () => {
  chamar({ op: 'save_user_prefs', user: 'bruno@google.com', prefs: JSON.stringify({ shortcuts: [{ id: 'sc_b', payload: { subStatus: 'NI_Attempted_Contact' } }] }) });

  const ana = chamar({ op: 'get_user_prefs', user: 'ana@google.com' });
  if (JSON.stringify(ana.prefs).includes('sc_b')) throw new Error('a Ana enxergou o atalho do Bruno');

  const bruno = chamar({ op: 'get_user_prefs', user: 'bruno@google.com' });
  if (!JSON.stringify(bruno.prefs).includes('sc_b')) throw new Error('o Bruno perdeu o próprio atalho');
});

check('sem e-mail, a escrita é recusada', () => {
  const r = chamar({ op: 'save_user_prefs', prefs: ATALHOS });
  if (r.status !== 'error') throw new Error('aceitou salvar sem dono');
});

check('sem e-mail, a leitura é recusada', () => {
  const r = chamar({ op: 'get_user_prefs' });
  if (r.status !== 'error') throw new Error('aceitou ler sem dono');
});

check('JSON inválido é recusado na ESCRITA, não descoberto na próxima sessão', () => {
  const r = chamar({ op: 'save_user_prefs', user: 'ana@google.com', prefs: '{isso não é json' });
  if (r.status !== 'error') throw new Error('gravou lixo na planilha');

  const depois = chamar({ op: 'get_user_prefs', user: 'ana@google.com' });
  if (JSON.stringify(depois.prefs) === '{}') throw new Error('a recusa apagou o que já estava salvo');
});

check('payload que não é objeto é recusado', () => {
  const r = chamar({ op: 'save_user_prefs', user: 'ana@google.com', prefs: '[1,2,3]' });
  if (r.status !== 'error') throw new Error('aceitou um array como preferências');
});

check('blob acima do teto é recusado', () => {
  const gigante = JSON.stringify({ lixo: 'x'.repeat(9000) });
  const r = chamar({ op: 'save_user_prefs', user: 'ana@google.com', prefs: gigante });
  if (r.status !== 'error') throw new Error('aceitou um payload maior que o teto');
});

check('linha corrompida na planilha devolve {} em vez de derrubar o agente', () => {
  // Plausível: alguém edita a planilha na mão, ou uma versão futura grava outra
  // coisa. O agente não pode ficar trancado fora das próprias preferências.
  const aba = SS.getSheetByName('User_Prefs');
  const linha = aba._data.findIndex((l) => String(l[0]).toLowerCase().includes('ana@'));
  aba._data[linha][1] = '{quebrado';

  const r = chamar({ op: 'get_user_prefs', user: 'ana@google.com' });
  if (r.status !== 'success') throw new Error('a leitura falhou em vez de degradar');
  if (JSON.stringify(r.prefs) !== '{}') throw new Error('esperava {}, veio ' + JSON.stringify(r.prefs));
  if (!LOGGER.some((m) => m.includes('User_Prefs ilegível'))) throw new Error('o caso não foi registrado no log');
});

console.log('\n' + (fail ? '✗' : '✓') + ` preferências: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
