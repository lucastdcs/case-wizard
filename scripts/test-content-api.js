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

const LOGGER = [];

const sandbox = {
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
vm.runInContext(fs.readFileSync(SRC, 'utf8'), ctx);

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

console.log('\n--- Case Notes (trechos por campo) ---');

check('QA propõe trecho de nota (está no escopo do papel)', () => {
  as('quality1', () => {
    const r = api.saveContentDraft({
      module: 'case_note_snippet',
      key: 'ALL',
      field: 'RESULTADO',
      lang: 'PT',
      label: 'Tag validada',
      value: 'Tag validada no Tag Assistant, disparando corretamente.'
    });
    if (!r.draftId) throw new Error('rascunho não criado');
  });
});

check('WFM NÃO propõe trecho de nota', () => {
  api.saveContentAccess('wfm1', 'WFM', true);
  as('wfm1', () => {
    throws(() => api.saveContentDraft({
      module: 'case_note_snippet', key: 'ALL', field: 'RESULTADO',
      lang: 'PT', label: 'X', value: 'Y'
    }), /não edita o módulo/);
  });
});

check('campo fora do catálogo é recusado pelo servidor', () => {
  // A tela usa select, mas a regra tem que valer mesmo se alguém chamar a API
  // direto - senão o trecho aponta pra um campo que a nota não tem e nunca
  // aparece pra ninguém, sem erro nenhum.
  throws(() => api.saveContentDraft({
    module: 'case_note_snippet', key: 'ALL', field: 'CAMPO_INVENTADO',
    lang: 'PT', label: 'X', value: 'Y'
  }), /Campo de nota desconhecido/);
});

check('todo campo do catálogo é aceito', () => {
  const cat = api.getNoteFieldCatalog();
  if (!cat.fields.length) throw new Error('catálogo vazio');

  cat.fields.forEach(f => {
    const r = api.saveContentDraft({
      module: 'case_note_snippet', key: 'ALL', field: f.key,
      lang: 'ALL', label: 'trecho ' + f.key, value: 'texto'
    });
    if (!r.draftId) throw new Error('rejeitou campo válido: ' + f.key);
  });
});

check('trecho aprovado chega ao agente com campo e escopo', () => {
  const d = api.saveContentDraft({
    module: 'case_note_snippet', key: 'SO_Implementation_Only',
    field: 'PASSOS_EXECUTADOS', lang: 'PT',
    label: 'Instalação GTM', value: 'Instalado o container do GTM no site.'
  });
  api.submitContentDraft(d.draftId);
  api.approveContentDraft(d.draftId, '');

  const pub = api.handleContentPublicRead({ module: 'case_note_snippet' });
  const mine = pub.items.filter(i => i.label === 'Instalação GTM');
  eq(mine.length, 1);
  eq(mine[0].field, 'PASSOS_EXECUTADOS');
  eq(mine[0].key, 'SO_Implementation_Only');
  eq(mine[0].lang, 'PT');
});

check('o catálogo de campos vem do notes-data, não digitado à mão', () => {
  const cat = api.getNoteFieldCatalog();
  const fromSource = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'gas-backend', 'seeds', 'note-fields.json'), 'utf8')
  );
  eq(cat.fields.map(f => f.key).sort(), fromSource.fields.map(f => f.key).sort());
  if (!cat.substatus.length) throw new Error('catálogo sem substatus');
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

console.log('\n' + (fail ? '✗' : '✓') + ` ${pass} passaram, ${fail} falharam\n`);
process.exit(fail ? 1 : 0);
