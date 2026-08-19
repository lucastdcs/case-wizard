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
class FakeRange {
  constructor(sheet, row, col) { this.sheet = sheet; this.row = row; this.col = col; }
  setValue(v) { this.sheet._data[this.row - 1][this.col - 1] = v; return this; }
  setValues(rows) {
    rows.forEach((r, i) => {
      const target = this.row - 1 + i;
      while (this.sheet._data.length <= target) this.sheet._data.push([]);
      this.sheet._data[target] = r.slice();
    });
    return this;
  }
  getValues() { return this.sheet._data.map(r => r.slice()); }
}

class FakeSheet {
  constructor(name) { this.name = name; this._data = []; }
  appendRow(row) { this._data.push(row.slice()); }
  getDataRange() { return new FakeRange(this, 1, 1); }
  getRange(row, col) { return new FakeRange(this, row, col); }
  getLastRow() { return this._data.length; }
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

const sandbox = {
  SpreadsheetApp: { getActiveSpreadsheet: () => SS },
  Session: { getActiveUser: () => ({ getEmail: () => CURRENT_USER }) },
  MailApp: { sendEmail: (o) => SENT_MAIL.push(o) },
  handleLog: (p) => LOGGED.push(p),
  console,
};

const code = fs.readFileSync(SRC, 'utf8');
const vm = require('node:vm');
const ctx = vm.createContext(sandbox);
vm.runInContext(code, ctx);

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
function throws(fn, re, m) {
  try { fn(); } catch (e) {
    if (re && !re.test(e.message)) throw new Error((m || '') + ' erro inesperado: ' + e.message);
    return;
  }
  throw new Error((m || '') + ' deveria ter lançado erro');
}
function as(ldap, fn) { const old = CURRENT_USER; CURRENT_USER = ldap + '@google.com'; try { return fn(); } finally { CURRENT_USER = old; } }

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
    eq(s.proposableModules, ['call_script', 'case_note_snippet']);
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

check('ADMIN não pode remover o próprio acesso', () => {
  throws(() => api.saveContentAccess('lucaste', 'ADMIN', false), /não pode remover o próprio/);
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
  const entry = LOGGED.filter(l => l.action === 'approve').pop();
  if (!/autoaprovação ADMIN/.test(entry.label)) {
    throw new Error('log não marcou autoaprovação: ' + entry.label);
  }
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

check('validação de módulo desconhecido', () => {
  throws(() => api.listContentItems('inexistente'), /Módulo desconhecido/);
});

console.log('\n' + (fail ? '✗' : '✓') + ` ${pass} passaram, ${fail} falharam\n`);
process.exit(fail ? 1 : 0);
