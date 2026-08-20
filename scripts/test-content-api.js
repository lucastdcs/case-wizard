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

  vm.runInContext(fs.readFileSync(SRC, 'utf8'), ctx2);
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

console.log('\n' + (fail ? '✗' : '✓') + ` ${pass} passaram, ${fail} falharam\n`);
process.exit(fail ? 1 : 0);
