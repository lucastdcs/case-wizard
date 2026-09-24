// scripts/test-tl-decision.mjs
//
// Harness local das decisões do TL (gas-backend/BAU_Dashboard.js), que não roda
// no Apps Script sem uma planilha e uma sessão de verdade.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// BAU_Dashboard.js nunca teve teste nenhum, e é onde vivem as duas regras que o
// projeto decidiu que a TELA NÃO PODE SER A FRONTEIRA: o ID do caso filho na
// aprovação (#396) e agora a justificativa na recusa. Uma regra assim só vale se
// o servidor a aplicar sozinho — e não havia nada provando que ele aplica.
//
// Aqui também mora a armadilha do modelo: `Status` vira 'CREATED' ou 'DISCARDED'
// para QUATRO decisões diferentes. 'DISCARDED' tanto confirma um descarte quanto
// rejeita uma criação. Quem desfaz isso é Processed_Action — e já houve um bug
// real de o agente receber "Caso descartado" por um pedido que nunca existiu.
//
// O que precisa estar provado antes de subir:
//   - rejeitar criação sem justificativa é RECUSADO, e nada é gravado;
//   - negar descarte sem justificativa é RECUSADO (é a outra negativa);
//   - aprovar e confirmar descarte NÃO exigem justificativa;
//   - aprovar sem o ID do caso filho continua recusado (não regredimos #396);
//   - a justificativa vai para a coluna 26 e para o e-mail do agente;
//   - o e-mail é escolhido por Processed_Action, nunca por Status;
//   - o mapeador de linha é o MESMO da fila e do histórico.
//
// Uso: npm run test:tl-decision

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (rel) => readFileSync(resolve(raiz, rel), 'utf8');

// ---- Dublê de planilha -------------------------------------------------
class FakeRange {
    constructor(sheet, row, col, numRows, numCols) {
        Object.assign(this, { sheet, row, col, numRows, numCols });
    }
    getValue() { return (this.sheet._data[this.row - 1] || [])[this.col - 1]; }
    getValues() {
        if (this.col === 1 && !this.numCols) return this.sheet._data.map((r) => r.slice());
        return this.sheet._data
            .slice(this.row - 1, this.row - 1 + (this.numRows || 1))
            .map((r) => r.slice(this.col - 1, this.col - 1 + (this.numCols || 1)));
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
}

class FakeSheet {
    constructor(name) { this.name = name; this._data = []; this._maxCols = 26; }
    appendRow(row) { this._data.push(row.slice()); }
    getDataRange() { return new FakeRange(this, 1, 1); }
    getRange(r, c, nr, nc) { return new FakeRange(this, r, c, nr, nc); }
    getLastRow() { return this._data.length; }
    getMaxColumns() { return this._maxCols; }
    insertColumnsAfter(depois, quantas) { this._maxCols = depois + quantas; return this; }
    setFrozenRows() { return this; }
}

class FakeSpreadsheet {
    constructor() { this.sheets = {}; }
    getSheetByName(n) { return this.sheets[n] || null; }
    insertSheet(n) { return (this.sheets[n] = new FakeSheet(n)); }
}

// ---- Fixture -----------------------------------------------------------
// Uma linha do BAU_form_data com os campos que as funções lêem.
function linhaBAU(id, status) {
    const r = new Array(26).fill('');
    r[0] = id;
    r[1] = new Date('2026-09-08T13:00:00Z');
    r[2] = 'agente@google.com';
    r[3] = status;
    r[4] = '0-1234567890';
    r[5] = '123-456-7890';
    r[6] = '987654';
    r[7] = 'Loja';
    r[8] = 'contato@loja.exemplo';
    r[9] = 'https://loja.exemplo';
    r[10] = 'America/Sao_Paulo';
    r[11] = 'PT-BR';
    r[12] = 'Fulano';
    r[13] = 'Programa X';
    r[14] = 'Concluir o Consent Mode.';
    r[15] = 'Consent Mode';
    r[16] = 'Implementação parcial | Sem acesso ao GTM.';
    r[17] = '2026-09-10T14:30-03:00';
    r[21] = 'Não';
    r[22] = 'Exemplo';
    r[24] = '+55 11 90000-0000';
    return r;
}

const CABECALHO = new Array(26).fill('').map((_, i) => 'Col' + i);

let SS, EMAILS, api, sheet;

function montar(linhas) {
    SS = new FakeSpreadsheet();
    EMAILS = [];
    sheet = new FakeSheet('BAU_form_data');
    sheet.appendRow(CABECALHO);
    linhas.forEach((l) => sheet.appendRow(l));
    SS.sheets['BAU_form_data'] = sheet;

    const sandbox = {
        SpreadsheetApp: { getActiveSpreadsheet: () => SS },
        Session: { getActiveUser: () => ({ getEmail: () => 'tlpessoa@google.com' }) },
        LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
        CacheService: { getScriptCache: () => ({ put() {}, getAll: () => ({}) }) },
        console: { log() {}, warn() {} },
        // Só o que BAU_Dashboard.js chama de fora do próprio arquivo.
        assertCallerIsOverhead: () => ({ ldap: 'tlpessoa', role: 'TL' }),
        getOrCreateSheet: (ss, nome) => ss.getSheetByName(nome) || ss.insertSheet(nome),
        SHEET_BAU_FORM: 'BAU_form_data',
        sendDynamicTechSolEmail: (para, dados, id, tipo, tl) => {
            EMAILS.push({ para, dados, id, tipo, tl });
        }
    };
    sandbox.globalThis = sandbox;
    const ctx = vm.createContext(sandbox);
    // Código.js entra junto: é dele que vêm celulaTexto, as colunas e a régua
    // decisionRequiresJustification — carregar só o BAU_Dashboard testaria uma
    // metade da regra contra dublês da outra.
    vm.runInContext(trechoDeCodigo(), ctx);
    vm.runInContext(ler('gas-backend/BAU_Dashboard.js'), ctx);
    // BAU_API.js entra no MESMO sandbox de propósito: o round-trip que interessa
    // é "o agente edita (BAU_API) e o TL lê (BAU_Dashboard)". Testar os dois
    // contra dublês um do outro provaria os dois separados e o defeito de verdade
    // estava justamente entre eles.
    vm.runInContext(ler('gas-backend/BAU_API.js'), ctx);
    api = ctx;
}

// Código.js inteiro puxa dependências que este teste não quer dublar (e-mail,
// JSONP, conteúdo). Só as declarações que as decisões do TL usam de verdade,
// extraídas POR NOME — uma versão anterior recortava "até a próxima declaração"
// e cortava funções pela metade em silêncio, o que produzia um erro que não
// tinha nada a ver com a regra sob teste.
const DEPENDENCIAS = [
    'BAU_HISTORY_HEADERS', 'BAU_HISTORY_FIRST_COL', 'ensureBAUHistoryColumns',
    'BAU_SUGGEST_DISCARD_HEADER', 'BAU_SUGGEST_DISCARD_COL', 'ensureBAUSuggestDiscardColumn',
    'BAU_ADV_LASTNAME_HEADER', 'BAU_ADV_LASTNAME_COL', 'ensureBAUAdvLastNameColumn',
    'BAU_CHILD_CASE_HEADER', 'BAU_CHILD_CASE_COL', 'ensureBAUChildCaseColumn',
    'BAU_ADV_PHONE_HEADER', 'BAU_ADV_PHONE_COL', 'ensureBAUAdvPhoneColumn',
    'BAU_TL_JUSTIFICATION_HEADER', 'BAU_TL_JUSTIFICATION_COL', 'ensureBAUTLJustificationColumn',
    'decisionRequiresJustification', 'celulaTexto'
];

function extrairDeclaracao(fonte, nome) {
    const comoFuncao = fonte.indexOf('\nfunction ' + nome + '(');
    if (comoFuncao !== -1) {
        // Conta chaves a partir da primeira: é o jeito de pegar a função inteira
        // sem depender de como a PRÓXIMA declaração começa.
        let i = fonte.indexOf('{', comoFuncao);
        let nivel = 0;
        for (let j = i; j < fonte.length; j++) {
            if (fonte[j] === '{') nivel++;
            else if (fonte[j] === '}') {
                nivel--;
                if (nivel === 0) return fonte.slice(comoFuncao, j + 1);
            }
        }
        throw new Error('chaves não fecham em ' + nome);
    }

    const comoConst = fonte.indexOf('\nconst ' + nome + ' =');
    if (comoConst !== -1) {
        const fimLinha = fonte.indexOf('\n', comoConst + 1);
        return fonte.slice(comoConst, fimLinha);
    }

    throw new Error('não achei "' + nome + '" em Código.js — o teste precisa ser reapontado');
}

function trechoDeCodigo() {
    const fonte = ler('gas-backend/Código.js');
    return DEPENDENCIAS.map((nome) => extrairDeclaracao(fonte, nome)).join('\n\n');
}

// ---- Asserções ---------------------------------------------------------
let fail = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque}: esperado ${b}, veio ${a}`);
}
function verdade(cond, oque) { if (!cond) throw new Error(oque); }
function recusa(fn, trecho, oque) {
    try { fn(); } catch (e) {
        if (String(e.message).indexOf(trecho) === -1) {
            throw new Error(`${oque}: recusou, mas com outra mensagem — "${e.message}"`);
        }
        return;
    }
    throw new Error(`${oque}: NÃO recusou`);
}

const COL_STATUS = 3, COL_ACTION = 20, COL_JUST = 25; // índices 0-based

console.log('\n--- Decisões do TL ---\n');

check('rejeitar criação sem justificativa é recusado, e nada é gravado', () => {
    montar([linhaBAU('bau_1', 'PENDING_TL_CREATION')]);
    recusa(() => api.updateBAUCaseStatus('bau_1', 'DISCARDED', '', ''),
        'justificativa', 'rejeição sem justificativa');
    igual(sheet._data[1][COL_STATUS], 'PENDING_TL_CREATION', 'status intacto');
    igual(sheet._data[1][COL_ACTION], '', 'trilha de auditoria não gravada');
    igual(EMAILS.length, 0, 'nenhum e-mail enviado');
});

check('negar descarte sem justificativa também é recusado', () => {
    montar([linhaBAU('bau_2', 'PENDING_TL_DISCARD')]);
    recusa(() => api.updateBAUCaseStatus('bau_2', 'CREATED', '', '   '),
        'justificativa', 'negativa de descarte com justificativa só de espaços');
    igual(sheet._data[1][COL_STATUS], 'PENDING_TL_DISCARD', 'status intacto');
});

check('aprovar criação NÃO exige justificativa', () => {
    montar([linhaBAU('bau_3', 'PENDING_TL_CREATION')]);
    const r = api.updateBAUCaseStatus('bau_3', 'CREATED', '0-9999999999', '');
    verdade(r.success, 'aprovação aceita');
    igual(sheet._data[1][COL_ACTION], 'APPROVED_CREATION', 'ação registrada');
});

check('confirmar descarte NÃO exige justificativa', () => {
    montar([linhaBAU('bau_4', 'PENDING_TL_DISCARD')]);
    const r = api.updateBAUCaseStatus('bau_4', 'DISCARDED', '', '');
    verdade(r.success, 'descarte confirmado');
    igual(sheet._data[1][COL_ACTION], 'CONFIRMED_DISCARD', 'ação registrada');
});

check('aprovar sem o ID do caso filho continua recusado (#396 não regrediu)', () => {
    montar([linhaBAU('bau_5', 'PENDING_TL_CREATION')]);
    recusa(() => api.updateBAUCaseStatus('bau_5', 'CREATED', '', 'qualquer coisa'),
        'caso BAU gerado', 'aprovação sem caso filho');
});

check('a justificativa é gravada na coluna 26 e vai no e-mail', () => {
    montar([linhaBAU('bau_6', 'PENDING_TL_CREATION')]);
    api.updateBAUCaseStatus('bau_6', 'DISCARDED', '', '  Falta contexto do anunciante.  ');
    igual(sheet._data[1][COL_JUST], 'Falta contexto do anunciante.', 'coluna 26, sem espaços nas pontas');
    igual(EMAILS.length, 1, 'um e-mail');
    igual(EMAILS[0].dados.tlJustification, 'Falta contexto do anunciante.', 'justificativa no payload do e-mail');
});

check('o e-mail é escolhido por Processed_Action, não por Status', () => {
    // As duas decisões abaixo gravam Status diferentes do que o nome sugere:
    // rejeitar uma CRIAÇÃO grava 'DISCARDED'; negar um DESCARTE grava 'CREATED'.
    montar([linhaBAU('bau_7', 'PENDING_TL_CREATION')]);
    api.updateBAUCaseStatus('bau_7', 'DISCARDED', '', 'Não procede.');
    igual(EMAILS[0].tipo, 'AGENT_CREATION_REJECTED', 'rejeição de criação (Status=DISCARDED)');

    montar([linhaBAU('bau_8', 'PENDING_TL_DISCARD')]);
    api.updateBAUCaseStatus('bau_8', 'CREATED', '', 'O caso ainda tem ação pendente.');
    igual(EMAILS[0].tipo, 'AGENT_DISCARD_DENIED', 'descarte negado (Status=CREATED)');
});

check('decisão sem justificativa não escreve a coluna à toa', () => {
    montar([linhaBAU('bau_9', 'PENDING_TL_CREATION')]);
    api.updateBAUCaseStatus('bau_9', 'CREATED', '0-1111111111', '');
    igual(sheet._data[1][COL_JUST], '', 'coluna 26 continua vazia');
});

check('a fila e o histórico saem do MESMO mapeador', () => {
    montar([linhaBAU('bau_10', 'PENDING_TL_CREATION')]);
    const daFila = api.getPendingBAUCases()[0];

    // Resolve o caso e lê pelo histórico.
    api.updateBAUCaseStatus('bau_10', 'DISCARDED', '', 'Sem contexto suficiente.');
    const doHistorico = api.getWeeklyHistory(30).cases[0];

    // Todo campo do payload da fila tem que existir no do histórico com o mesmo
    // valor — é o que garante que a mesma vista serve os dois.
    Object.keys(daFila).forEach((campo) => {
        if (campo === 'status') return; // muda ao resolver, de propósito
        igual(doHistorico[campo], daFila[campo], 'campo "' + campo + '"');
    });
    igual(doHistorico.action, 'REJECTED_CREATION', 'e o histórico ainda traz a decisão');
    igual(doHistorico.tlJustification, 'Sem contexto suficiente.', 'e a justificativa');
});

check('caso decidido antes da coluna existir não quebra a leitura', () => {
    // Planilha antiga: 25 colunas, sem TL_Justification.
    const antiga = linhaBAU('bau_velho', 'PENDING_TL_CREATION').slice(0, 25);
    montar([antiga]);
    api.updateBAUCaseStatus('bau_velho', 'CREATED', '0-2222222222', '');
    const h = api.getWeeklyHistory(30).cases[0];
    igual(h.tlJustification, '', 'justificativa ausente vira string vazia');
});

// ---- O e-mail do agente ------------------------------------------------
//
// O teste acima prova que a justificativa chega ao payload do e-mail. Falta
// provar que o EmailEngine a RENDERIZA — e que uma decisão antiga, sem
// justificativa, não produz um bloco tingido vazio.
const ctxEmail = {};
vm.createContext(ctxEmail);
vm.runInContext(
    extrairDeclaracao(ler('gas-backend/EmailEngine.js'), 'renderEmailCallout') + '\n\n' +
    extrairDeclaracao(ler('gas-backend/EmailEngine.js'), 'escapeEmailText') + '\n\n' +
    extrairDeclaracao(ler('gas-backend/EmailEngine.js'), 'renderTLJustificationCallout') +
    '\n;globalThis.__render = renderTLJustificationCallout;', ctxEmail);
const renderJust = ctxEmail.__render;
const L_PT = { labelTLJustification: 'Justificativa da liderança' };
const L_ES = { labelTLJustification: 'Justificación de la gerencia' };

check('a justificativa vira o callout do e-mail, em PT e em ES', () => {
    const pt = renderJust(L_PT, 'Cabe no caso atual.');
    verdade(pt.indexOf('Justificativa da liderança') !== -1, 'rótulo em PT');
    verdade(pt.indexOf('Cabe no caso atual.') !== -1, 'texto do TL');

    const es = renderJust(L_ES, 'Cabe en el caso actual.');
    verdade(es.indexOf('Justificación de la gerencia') !== -1, 'rótulo em ES');
});

check('decisão sem justificativa não gera bloco vazio', () => {
    igual(renderJust(L_PT, ''), '', 'string vazia');
    igual(renderJust(L_PT, '   '), '', 'só espaços');
    igual(renderJust(L_PT, undefined), '', 'ausente');
});

check('texto livre do TL é escapado antes de virar HTML', () => {
    // O corpo do e-mail é montado por concatenação de strings: um `<` solto
    // numa justificativa quebraria a tabela do e-mail inteiro.
    const html = renderJust(L_PT, 'Use <b>o caso atual</b> & pronto');
    verdade(html.indexOf('&lt;b&gt;') !== -1, 'a tag foi escapada');
    verdade(html.indexOf('<b>') === -1, 'e não sobrou tag crua do texto do TL');
    verdade(html.indexOf('&amp;') !== -1, 'o & foi escapado');
});

console.log('\n--- O que o agente edita chega ao TL ---\n');

// O agente edita um caso no bookmarklet e o TL precisa ver o valor novo. As duas
// pontas estão em arquivos diferentes (BAU_API.js escreve, BAU_Dashboard.js lê),
// e o campo "sugestão de descarte" mora na coluna 21 — FORA do bloco contíguo
// 4-18 que o setValues da edição grava de uma vez. Era exatamente aí que ele se
// perdia: o payload chegava com o valor novo e ninguém escrevia a coluna.
//
// Cada asserção abaixo vai até o fim da linha: escreve pela API do agente e lê
// pelo MESMO mapeador que alimenta a fila do TL.
const COL_SUGGEST = 21; // 0-based

function editar(id, patch) {
    // `user` é obrigatório: a edição só aceita o dono do caso, e é o mesmo
    // e-mail que linhaBAU() grava na coluna 3.
    return api.update_bau_case(SS, Object.assign(
        { id: id, requestType: 'BAU', user: 'agente@google.com' }, patch));
}
const comoOTLVe = (id) =>
    api.mapBAURow_(sheet._data.find((r) => r[0] === id));

check('editar a sugestão de descarte chega ao TL', () => {
    montar([linhaBAU('bau_e1', 'PENDING_TL_CREATION')]);
    igual(comoOTLVe('bau_e1').suggestDiscard, 'Não', 'estado inicial');

    editar('bau_e1', { suggestDiscard: 'Sim' });
    igual(sheet._data[1][COL_SUGGEST], 'Sim', 'gravado na coluna 21');
    igual(comoOTLVe('bau_e1').suggestDiscard, 'Sim', 'o TL lê o valor novo');
});

check('e volta atrás também chega', () => {
    montar([linhaBAU('bau_e2', 'PENDING_TL_CREATION')]);
    editar('bau_e2', { suggestDiscard: 'Sim' });
    editar('bau_e2', { suggestDiscard: 'Não' });
    igual(comoOTLVe('bau_e2').suggestDiscard, 'Não', 'o TL lê o valor novo');
});

check('edição que não toca no campo preserva o valor gravado', () => {
    // Regra de não-sobrescrita do api-payloads.md: ausente no payload nunca é "".
    montar([linhaBAU('bau_e3', 'PENDING_TL_CREATION')]);
    editar('bau_e3', { suggestDiscard: 'Sim' });
    editar('bau_e3', { cid: '999-888-7777' });
    igual(comoOTLVe('bau_e3').suggestDiscard, 'Sim', 'sugestão intacta');
    igual(comoOTLVe('bau_e3').cid, '999-888-7777', 'e o campo editado mudou');
});

check('valor fora do domínio vira "Não", como na criação', () => {
    montar([linhaBAU('bau_e4', 'PENDING_TL_CREATION')]);
    editar('bau_e4', { suggestDiscard: '' });
    igual(comoOTLVe('bau_e4').suggestDiscard, 'Não', 'normalizado');
});

check('a lista do agente devolve o campo, senão a edição abre no padrão', () => {
    // Sem isto o <select> do form abria sempre em "Não" — e agora que a edição
    // GRAVA de verdade, reenviar esse padrão apagaria um "Sim" que ninguém tocou.
    montar([linhaBAU('bau_e5', 'PENDING_TL_CREATION')]);
    editar('bau_e5', { suggestDiscard: 'Sim' });
    const meus = api.getAgentCases(SS, 'agente@google.com');
    const caso = meus.cases.find((c) => c.id === 'bau_e5');
    verdade(caso !== undefined, 'o caso aparece na lista do agente');
    igual(caso.suggestDiscard, 'Sim', 'com a sugestão gravada');
});

// ---- O e-mail do PEDIDO de descarte -----------------------------------
//
// Relatado assim: "o e-mail do descarte parece que estou abrindo um caso, e
// ainda tem um campo de horário que não existe". Eram dois defeitos, e o
// segundo só aparece depois de consertar o primeiro.
//
// handleBAUEscalation escolhia o STATUS pelo requestType e o TIPO DE E-MAIL
// não: descarte aberto direto pelo passo 0 gravava PENDING_TL_DISCARD e
// mandava AGENT_BAU_SENT. O caminho de EDIÇÃO já acertava, e é por isso que
// passou — só quem começa pelo descarte via o defeito.

function abrir(payload) {
    montar([]);
    return api.handleBAUEscalation(SS, Object.assign({
        user: 'agente@google.com',
        advName: 'Anunciante Teste',
        caseId: '4-1234567890123',
        cid: '123-456-7890',
        website: 'exemplo.com',
        reason: 'Motivo do pedido'
    }, payload));
}

check('descarte aberto do zero manda o e-mail de DESCARTE, não o de abertura', () => {
    abrir({ requestType: 'DISCARD' });
    igual(EMAILS.length, 1, 'um e-mail para o agente');
    igual(EMAILS[0].tipo, 'AGENT_DISCARD_SENT', 'tipo do e-mail');
});

check('abertura de caso segue mandando o e-mail de abertura', () => {
    abrir({ requestType: 'BAU', taskType: 'Consent Mode', availability: '2026-09-24T14:00-03:00' });
    igual(EMAILS[0].tipo, 'AGENT_BAU_SENT', 'tipo do e-mail');
});

check('o tipo do e-mail e o status gravado contam a MESMA história', () => {
    // O defeito era exatamente os dois discordarem: status de descarte com
    // e-mail de abertura. Amarra um no outro para não voltarem a divergir.
    const pares = [
        ['DISCARD', 'PENDING_TL_DISCARD', 'AGENT_DISCARD_SENT'],
        ['BAU', 'PENDING_TL_CREATION', 'AGENT_BAU_SENT'],
    ];
    pares.forEach(([requestType, statusEsperado, tipoEsperado]) => {
        abrir({ requestType });
        const gravado = String(sheet._data[1][3]);
        igual(gravado, statusEsperado, 'status de ' + requestType);
        igual(EMAILS[0].tipo, tipoEsperado, 'e-mail de ' + requestType);
    });
});

// ---- Os campos que o e-mail de descarte NÃO deve mostrar ----------------
const ctxCampos = {};
vm.createContext(ctxCampos);
vm.runInContext(
    extrairDeclaracao(ler('gas-backend/EmailEngine.js'), 'ehFluxoDeDescarte') + '\n\n' +
    extrairDeclaracao(ler('gas-backend/EmailEngine.js'), 'camposDetalheDoEmail') +
    '\n;globalThis.__campos = camposDetalheDoEmail;', ctxCampos);
const campos = ctxCampos.__campos;

const L_CAMPOS = {
    labelDomain: 'Domínio final', labelSchedule: 'Agendamento (SLA)',
    labelTask: 'Procedimento', labelChildCase: 'Caso BAU gerado'
};
const V_DESCARTE = {
    caseId: '4-111', cid: '111-111-1111', site: 'exemplo.com',
    // É isto que saía impresso no e-mail de descarte: o formulário de descarte
    // não pergunta horário nem task, então os dois chegam no fallback.
    availability: 'Data não disponível', task: 'N/A'
};
const rotulos = (lista) => lista.map((c) => c.label);

check('o e-mail de descarte não mostra Agendamento nem Procedimento', () => {
    ['AGENT_DISCARD_SENT', 'AGENT_DISCARD_DONE', 'AGENT_DISCARD_DENIED'].forEach((tipo) => {
        const r = rotulos(campos(L_CAMPOS, V_DESCARTE, tipo, { caseLink: '<a>4-111</a>' }));
        verdade(r.indexOf('Agendamento (SLA)') === -1, 'sem agendamento em ' + tipo);
        verdade(r.indexOf('Procedimento') === -1, 'sem procedimento em ' + tipo);
        verdade(r.indexOf('Case Connect') !== -1, 'mas o caso continua identificado em ' + tipo);
    });
});

check('os e-mails de ABERTURA continuam mostrando os dois campos', () => {
    // AGENT_CREATION_REJECTED também é uma negativa, mas de um caso que nunca
    // existiu — lá o agendamento pedido ainda é a informação que importa.
    ['AGENT_BAU_SENT', 'LEADERSHIP_BAU_RECEIVED', 'AGENT_BAU_CREATED', 'AGENT_CREATION_REJECTED'].forEach((tipo) => {
        const r = rotulos(campos(L_CAMPOS, V_DESCARTE, tipo, { caseLink: '<a>4-111</a>' }));
        verdade(r.indexOf('Agendamento (SLA)') !== -1, 'com agendamento em ' + tipo);
        verdade(r.indexOf('Procedimento') !== -1, 'com procedimento em ' + tipo);
    });
});

check('o caso filho entra nos dois fluxos, com texto puro próprio', () => {
    const comFilho = campos(L_CAMPOS, V_DESCARTE, 'AGENT_DISCARD_DONE',
        { caseLink: '<a>4-111</a>', childCaseId: '4-999', childLink: '<a>4-999</a>' });
    const filho = comFilho.find((c) => c.label === 'Caso BAU gerado');
    verdade(filho !== undefined, 'a linha existe');
    igual(filho.plain, '4-999', 'a versão texto imprime o ID, não a marcação');
});

check('toda linha sabe se imprimir em texto puro', () => {
    // A lista de texto puro era uma cópia manual da de HTML. Agora ela é
    // derivada, e o que garante isso é todo valor com marcação ter `plain`.
    const todos = campos(L_CAMPOS, V_DESCARTE, 'AGENT_BAU_SENT',
        { caseLink: '<a>4-111</a>', childCaseId: '4-999', childLink: '<a>4-999</a>' });
    todos.forEach((c) => {
        const temMarcacao = String(c.value).indexOf('<') !== -1;
        verdade(!temMarcacao || c.plain !== undefined, 'linha "' + c.label + '" com link precisa de plain');
    });
});

console.log(fail === 0 ? '\n✅ Decisões do TL: tudo certo.\n' : `\n❌ ${fail} falha(s).\n`);
process.exit(fail === 0 ? 0 : 1);
