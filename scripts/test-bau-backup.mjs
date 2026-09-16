// scripts/test-bau-backup.mjs
//
// Harness local do arquivamento semanal (gas-backend/Backup.js), que não roda
// no Apps Script sem duas planilhas de verdade.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O job trocou de regime: ele COPIAVA-E-DELETAVA, agora só copia (ADR-0014).
// A versão antiga nunca teve teste nenhum, e o efeito de deletar só aparecia
// uma segunda-feira depois — longe o bastante de quem mexeu no código para
// ninguém ligar uma coisa à outra. O histórico do TL vazio e o Child_Case_ID
// sumindo da aprovação foram os dois sintomas.
//
// O que precisa estar provado antes de subir:
//   - nada é removido da planilha de casos (o ponto inteiro da mudança);
//   - caso pendente não vai para o arquivo — ele ainda não aconteceu;
//   - rodar duas vezes não duplica linha no arquivo;
//   - um caso que resolve DEPOIS é arquivado na execução seguinte;
//   - arquivo mais estreito que a origem ganha colunas em vez de derrubar tudo;
//   - o Child_Case_ID continua legível na planilha de casos depois do backup.
//
// Uso: npm run test:backup

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---- Dublê de planilha -------------------------------------------------
// Só o que o Backup.js usa. Um dublê que aceita qualquer coisa não protege de
// nada: getRange() aqui RECUSA um bloco mais largo que a aba, que é exatamente
// o erro que o Sheets dá e que o código novo existe para evitar.
class FakeRange {
    constructor(sheet, row, col, numRows, numCols) {
        Object.assign(this, { sheet, row, col, numRows, numCols });
    }
    getValues() {
        if (this.col === 1 && !this.numCols) return this.sheet._data.map((r) => r.slice());
        return this.sheet._data
            .slice(this.row - 1, this.row - 1 + (this.numRows || 1))
            .map((r) => r.slice(this.col - 1, this.col - 1 + (this.numCols || 1)));
    }
    setValues(rows) {
        rows.forEach((r, i) => {
            if (this.col - 1 + r.length > this.sheet._maxCols) {
                throw new Error('The number of columns in the data does not match the columns in the range.');
            }
            const alvo = this.row - 1 + i;
            while (this.sheet._data.length <= alvo) this.sheet._data.push([]);
            r.forEach((v, j) => { this.sheet._data[alvo][this.col - 1 + j] = v; });
        });
        return this;
    }
}

class FakeSheet {
    constructor(name, maxCols) { this.name = name; this._data = []; this._maxCols = maxCols || 26; }
    appendRow(row) {
        if (row.length > this._maxCols) this._maxCols = row.length;
        this._data.push(row.slice());
    }
    getDataRange() { return new FakeRange(this, 1, 1); }
    getRange(row, col, numRows, numCols) { return new FakeRange(this, row, col, numRows, numCols); }
    getLastRow() { return this._data.length; }
    getLastColumn() { return this._data.reduce((m, r) => Math.max(m, r.length), 0); }
    getMaxColumns() { return this._maxCols; }
    insertColumnsAfter(depois, quantas) { this._maxCols = depois + quantas; return this; }
    // Existe só para provar que NINGUÉM chama: se o job voltar a deletar, o
    // teste de "nada foi removido" tem que quebrar por chamada, não por sorte.
    deleteRow() { throw new Error('deleteRow() foi chamado — o backup não pode mais remover linhas'); }
}

class FakeSpreadsheet {
    constructor() { this.sheets = {}; }
    getSheetByName(n) { return this.sheets[n] || null; }
    insertSheet(n) { return (this.sheets[n] = new FakeSheet(n)); }
}

// ---- Fixture -----------------------------------------------------------
const CABECALHO = ['ID_Escalacao', 'Data_Envio', 'Agente_Email', 'Status', 'Case_ID'];

// 25 colunas como a planilha real (0 a 24), preenchendo só o que o job lê.
function linha(id, status, extras) {
    const r = new Array(25).fill('');
    r[0] = id;
    r[1] = '2026-09-0' + (Number(String(id).slice(-1)) || 1) + 'T10:00:00Z';
    r[2] = 'agente@google.com';
    r[3] = status;
    r[4] = '0-000000000' + (Number(String(id).slice(-1)) || 1);
    return Object.assign(r, extras || {});
}

let SS, ARQUIVO_SS, api;

function montar({ casos, arquivoExistente, colunasDoArquivo }) {
    SS = new FakeSpreadsheet();
    const principal = new FakeSheet('Respostas_BAU', 25);
    principal.appendRow(new Array(25).fill('').map((_, i) => CABECALHO[i] || 'Col' + i));
    casos.forEach((c) => principal.appendRow(c));
    SS.sheets['Respostas_BAU'] = principal;

    ARQUIVO_SS = new FakeSpreadsheet();
    if (arquivoExistente) {
        const arq = new FakeSheet('Archive_BAU', colunasDoArquivo || 25);
        arq.appendRow(new Array(colunasDoArquivo || 25).fill('').map((_, i) => CABECALHO[i] || 'Col' + i));
        arquivoExistente.forEach((c) => arq.appendRow(c));
        ARQUIVO_SS.sheets['Archive_BAU'] = arq;
    }

    const sandbox = {
        SHEET_BAU_FORM: 'Respostas_BAU',
        SpreadsheetApp: {
            getActiveSpreadsheet: () => SS,
            openById: () => ARQUIVO_SS,
        },
        ScriptApp: { getProjectTriggers: () => [], newTrigger: () => ({}) },
        console: { log: () => {} },
    };
    sandbox.globalThis = sandbox;
    const ctx = vm.createContext(sandbox);
    vm.runInContext(readFileSync(resolve(raiz, 'gas-backend/Backup.js'), 'utf8'), ctx);
    api = ctx;
    return { principal, arquivo: () => ARQUIVO_SS.sheets['Archive_BAU'] };
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

const idsDoArquivo = (arq) => arq._data.slice(1).map((r) => r[0]);

console.log('\n--- Backup semanal do BAU ---\n');

check('copia só o que foi resolvido; pendente fica de fora', () => {
    const { arquivo } = montar({
        casos: [
            linha('bau_1', 'CREATED'),
            linha('bau_2', 'PENDING_TL_CREATION'),
            linha('bau_3', 'DISCARDED'),
            linha('bau_4', 'PENDING_TL_DISCARD'),
        ],
        arquivoExistente: [],
    });
    api.runWeeklyBackup();
    igual(idsDoArquivo(arquivo()), ['bau_1', 'bau_3'], 'IDs arquivados');
});

check('NÃO remove nada da planilha de casos', () => {
    const { principal, arquivo } = montar({
        casos: [linha('bau_1', 'CREATED'), linha('bau_2', 'DISCARDED')],
        arquivoExistente: [],
    });
    api.runWeeklyBackup();
    igual(principal._data.length, 3, 'linhas na planilha de casos (cabeçalho + 2)');
    igual(principal._data.slice(1).map((r) => r[0]), ['bau_1', 'bau_2'], 'casos preservados');
    igual(idsDoArquivo(arquivo()).length, 2, 'e mesmo assim foram arquivados');
});

check('rodar duas vezes não duplica', () => {
    const { arquivo } = montar({
        casos: [linha('bau_1', 'CREATED'), linha('bau_2', 'DISCARDED')],
        arquivoExistente: [],
    });
    api.runWeeklyBackup();
    api.runWeeklyBackup();
    api.runWeeklyBackup();
    igual(idsDoArquivo(arquivo()), ['bau_1', 'bau_2'], 'IDs após três execuções');
});

check('caso que resolve depois é arquivado na execução seguinte', () => {
    const { principal, arquivo } = montar({
        casos: [linha('bau_1', 'CREATED'), linha('bau_2', 'PENDING_TL_CREATION')],
        arquivoExistente: [],
    });
    api.runWeeklyBackup();
    igual(idsDoArquivo(arquivo()), ['bau_1'], 'primeira semana');

    principal._data[2][3] = 'CREATED';       // o TL aprovou
    principal._data[2][23] = '0-9999999999'; // e gravou o caso filho
    api.runWeeklyBackup();
    igual(idsDoArquivo(arquivo()), ['bau_1', 'bau_2'], 'segunda semana');
    igual(arquivo()._data[2][23], '0-9999999999', 'Child_Case_ID foi junto');
});

check('Child_Case_ID continua na planilha de casos depois do backup', () => {
    // A regressão que motivou a mudança: o ID do caso filho era gravado na
    // aprovação e desaparecia no domingo seguinte, junto com a linha.
    const aprovado = linha('bau_1', 'CREATED');
    aprovado[23] = '0-1234567890';
    const { principal } = montar({ casos: [aprovado], arquivoExistente: [] });
    api.runWeeklyBackup();
    igual(principal._data[1][23], '0-1234567890', 'Child_Case_ID na origem');
});

check('arquivo mais estreito que a origem ganha colunas em vez de derrubar tudo', () => {
    // O arquivo de verdade nasceu antes das colunas 22-24 existirem.
    const { arquivo } = montar({
        casos: [linha('bau_1', 'CREATED')],
        arquivoExistente: [],
        colunasDoArquivo: 22,
    });
    api.runWeeklyBackup();
    verdade(arquivo().getMaxColumns() >= 25, 'arquivo alargado para caber a linha');
    igual(idsDoArquivo(arquivo()), ['bau_1'], 'e a linha entrou');
});

check('cria a aba de arquivo com cabeçalho quando ela não existe', () => {
    const { arquivo } = montar({ casos: [linha('bau_1', 'CREATED')], arquivoExistente: null });
    api.runWeeklyBackup();
    igual(arquivo()._data[0][0], 'ID_Escalacao', 'cabeçalho copiado da origem');
    igual(idsDoArquivo(arquivo()), ['bau_1'], 'caso arquivado');
});

check('respeita a ordem cronológica da planilha', () => {
    const { arquivo } = montar({
        casos: [linha('bau_1', 'CREATED'), linha('bau_2', 'CREATED'), linha('bau_3', 'DISCARDED')],
        arquivoExistente: [],
    });
    api.runWeeklyBackup();
    igual(idsDoArquivo(arquivo()), ['bau_1', 'bau_2', 'bau_3'], 'ordem preservada');
});

check('planilha só com cabeçalho não quebra', () => {
    const { arquivo } = montar({ casos: [], arquivoExistente: [] });
    api.runWeeklyBackup();
    igual(idsDoArquivo(arquivo()), [], 'nada arquivado');
});

console.log(fail === 0 ? '\n✅ Backup: tudo certo.\n' : `\n❌ ${fail} falha(s).\n`);
process.exit(fail === 0 ? 0 : 1);
