// scripts/smoke-tl-dashboard.mjs
//
// Smoke do TL Dashboard (gas-backend/TLDashboard.html) num navegador de verdade.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O dashboard do TL é a segunda maior tela do projeto e nunca teve teste nenhum
// — toda correção nele até hoje foi validada abrindo a tela e olhando. O resumo
// copiável entra justamente onde olhar não basta: o que o TL LÊ na tela e o que
// ele COPIA são dois caminhos diferentes (texto renderizado x data-copy-value),
// e é trivial um deles perder as quebras de linha sem que o outro mude.
//
// O QUE ELE PROTEGE
//
//   - o resumo é o ÚLTIMO campo do modal (é o que o TL procura no fim da lista);
//   - a headline diz "Caso LM para BAU", literalmente;
//   - o texto copiado preserva as quebras de linha do texto exibido;
//   - o idioma segue o ATENDIMENTO (c.language), não a tela do TL;
//   - "Motivo | Justificativa" é desmesclado em vez de sair com o pipe;
//   - PII (e-mail, telefone) e dado redundante não vazam para o texto;
//   - pedido de descarte NÃO ganha resumo (não há caso BAU para abrir).
//
// COMO ELE RODA SEM APPS SCRIPT
//
// A tela é servida pelo HtmlService e conversa por `google.script.run`. Aqui o
// HTML é lido do disco, as duas tags de template viram vazio e o bridge é
// substituído por um dublê que responde do fixture abaixo.
//
// Uso: npm run smoke:tl-dash

import { chromium } from 'playwright';
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ARQUIVO = join(tmpdir(), 'cw-tl-dashboard-smoke.html');

// Mesma convenção do test-scraping.mjs: o repo padroniza um launch sem caminho,
// e a variável existe só para ambientes que já trazem um Chromium fora do cache
// do Playwright (contêineres de CI/sandbox), onde o download é bloqueado.
const executablePath = process.env.CW_CHROMIUM || undefined;

// A página precisa vir de uma URL de verdade e não de setContent(): o
// addInitScript — que é onde o dublê é instalado — só roda numa navegação.
async function prepararArquivo() {
    let html = await readFile(resolve(raiz, 'gas-backend/TLDashboard.html'), 'utf8');
    html = html.replace(/<\?!=\s*CW_ENV_BADGE\s*\?>/g, '').replace(/<\?!=\s*CW_CREDIT\s*\?>/g, '');
    if (/<\?/.test(html)) throw new Error('TLDashboard: sobrou tag de template não resolvida');
    await writeFile(ARQUIVO, html, 'utf8');
}

// ---------------------------------------------------------------- fixture
//
// Três casos que cobrem os eixos do resumo: um em PT com tudo preenchido, um em
// ES (mesmo TL, idioma diferente — é o que prova que o texto segue o caso) e um
// pedido de descarte, que não deve ganhar resumo nenhum.
const CASOS = [
    {
        id: 'bau_pt', status: 'PENDING_TL_CREATION',
        date: '2026-09-08T13:00:00Z',
        agentEmail: 'lucaste@google.com',
        caseId: '0-1234567890', cid: '123-456-7890', speakeasyId: '987654',
        advName: 'Loja', advLastName: 'Exemplo',
        advEmail: 'contato@loja.exemplo', advPhone: '+55 11 90000-0000',
        site: 'https://loja.exemplo', timezone: 'America/Sao_Paulo', language: 'PT-BR',
        amName: 'Fulano de Tal', salesProgram: 'Programa X',
        reason: 'Concluir a implementação do Consent Mode e validar o Enhanced Conversions.',
        task: 'Consent Mode, Ads Enhanced Conversions',
        description: 'Implementação parcial (nem todas as tasks concluídas) | Cliente não tinha acesso ao GTM no momento da call; ficou de liberar.',
        availability: '2026-09-10T14:30-03:00', suggestDiscard: 'Não',
    },
    {
        id: 'bau_es', status: 'PENDING_TL_CREATION',
        date: '2026-09-09T13:00:00Z',
        agentEmail: 'anaes@google.com',
        caseId: '0-2222222222', cid: '222-222-2222', speakeasyId: '222222',
        advName: 'Tienda', advLastName: 'Ejemplo',
        advEmail: 'hola@tienda.ejemplo', advPhone: '', site: 'https://tienda.ejemplo',
        timezone: 'America/Mexico_City', language: 'ES',
        amName: 'Mengano', salesProgram: 'Programa Y',
        reason: 'Terminar la instalación del GTM.',
        task: 'Google Tag Manager Installation',
        description: 'Tempo da consultoria esgotado | El cliente pidió continuar otro día.',
        availability: '', suggestDiscard: 'Não',
    },
    {
        id: 'bau_descarte', status: 'PENDING_TL_DISCARD',
        date: '2026-09-09T15:00:00Z',
        agentEmail: 'lucaste@google.com',
        caseId: '0-3333333333', cid: '', speakeasyId: '333333',
        advName: 'Outro', advLastName: '', advEmail: '', advPhone: '', site: '',
        timezone: '', language: 'PT-BR', amName: '', salesProgram: '',
        reason: '3ª Tentativa de contato sem sucesso',
        task: '', description: 'Anunciante não retornou nenhum contato.',
        availability: '', suggestDiscard: 'Não',
    },
];

const PERFIL = { ldap: 'tlpessoa', role: 'TL', defaultLanguage: 'PT-BR' };

async function abrirPagina(browser, { idiomaDoTL } = {}) {
    const page = await browser.newPage();
    page.on('pageerror', (e) => { console.log('      [erro na página] ' + e.message); });

    await page.addInitScript(({ casos, perfil }) => {
        const RESPOSTAS = {
            getPendingBAUCases: () => casos,
            getCurrentTLProfile: () => perfil,
            getActiveTLs: () => [],
            getRecentActivity: () => [],
            getWeeklyHistory: () => ({ windowDays: 7, cases: [], stats: { approved: 0, discarded: 0, avgResolutionHours: null, topAgents: [] } }),
            recordTLPresence: () => ({ ldap: perfil.ldap }),
            updateBAUCaseStatus: () => ({ status: 'success', emailSent: true }),
        };
        function construir() {
            let ok = null, erro = null;
            const proxy = new Proxy({}, {
                get(_b, prop) {
                    if (prop === 'withSuccessHandler') return function (f) { ok = f; return proxy; };
                    if (prop === 'withFailureHandler') return function (f) { erro = f; return proxy; };
                    return function (...args) {
                        setTimeout(() => {
                            try { const r = (RESPOSTAS[prop] || (() => null))(...args); if (ok) ok(r); }
                            catch (e) { if (erro) erro({ message: e.message }); }
                        }, 5);
                    };
                },
            });
            return proxy;
        }
        Object.defineProperty(window, 'google', {
            value: { script: { get run() { return construir(); } } }, writable: true,
        });
    }, { casos: CASOS, perfil: Object.assign({}, PERFIL, idiomaDoTL ? { defaultLanguage: idiomaDoTL } : {}) });

    await page.goto('file://' + ARQUIVO, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.case-row', { timeout: 5000 });
    await page.waitForTimeout(150);
    return page;
}

// Abre o modal do caso e devolve o que a tela MOSTRA e o que ela COPIA.
async function resumoDoCaso(page, id) {
    await page.evaluate((caseId) => { openDetails(caseId); }, id);
    await page.waitForTimeout(80);
    return page.evaluate(() => {
        const grupos = Array.from(document.querySelectorAll('#modal-body-content .detail-group'));
        const ultimo = grupos[grupos.length - 1];
        const etiqueta = ultimo.querySelector('.detail-label').textContent.trim();
        const botao = ultimo.querySelector('.copy-btn');
        return {
            totalDeGrupos: grupos.length,
            etiquetaDoUltimo: etiqueta,
            exibido: ultimo.querySelector('.summary-text') ? ultimo.querySelector('.summary-text').textContent : null,
            copiado: botao ? botao.dataset.copyValue : null,
            etiquetas: grupos.map((g) => g.querySelector('.detail-label').textContent.trim()),
        };
    });
}

let fail = 0;
async function check(nome, fn) {
    try { await fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque}: esperado ${b}, veio ${a}`);
}
function verdade(cond, oque) { if (!cond) throw new Error(oque); }
function contem(texto, trecho, oque) {
    if (String(texto).indexOf(trecho) === -1) throw new Error(`${oque}: não achei ${JSON.stringify(trecho)} em\n---\n${texto}\n---`);
}
function naoContem(texto, trecho, oque) {
    if (String(texto).indexOf(trecho) !== -1) throw new Error(`${oque}: achei ${JSON.stringify(trecho)} e não devia, em\n---\n${texto}\n---`);
}

await prepararArquivo();
const browser = await chromium.launch({ headless: true, executablePath });

console.log('\n--- Smoke: TL Dashboard (resumo copiável) ---\n');

{
    const page = await abrirPagina(browser);

    await check('o resumo é o ÚLTIMO campo do modal', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        igual(r.etiquetaDoUltimo, 'Resumo para o caso BAU', 'etiqueta do último grupo');
        verdade(r.etiquetas.indexOf('Justificativa / Detalhes') < r.etiquetas.length - 1,
            'o resumo vem depois da justificativa');
    });

    await check('a headline é "Caso LM para BAU", literal e na primeira linha', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        igual(r.copiado.split('\n')[0], 'Caso LM para BAU', 'primeira linha do texto copiado');
    });

    await check('o texto copiado é igual ao exibido, com as quebras de linha', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        // É este o par que só um navegador de verdade prova: o innerHTML colapsa
        // quebras de linha, o atributo não — ou o contrário, dependendo do escape.
        igual(r.exibido, r.copiado, 'exibido x copiado');
        verdade(r.copiado.split('\n').length >= 9, 'o texto tem as quebras (veio em uma linha só?)');
    });

    await check('diz o que aconteceu, o que fazer, as tasks e o AM', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        contem(r.copiado, 'Caso de origem (LM): 0-1234567890', 'caso de origem');
        contem(r.copiado, 'Aberto por lucaste@ em 08/09/2026', 'quem abriu e quando');
        contem(r.copiado, 'O que aconteceu: Implementação parcial (nem todas as tasks concluídas).', 'motivo');
        contem(r.copiado, 'Cliente não tinha acesso ao GTM', 'justificativa do agente');
        contem(r.copiado, 'O que deve ser feito em BAU:\nConcluir a implementação do Consent Mode', 'o que fazer');
        contem(r.copiado, 'Tasks: Consent Mode · Ads Enhanced Conversions', 'tasks separadas por ponto médio');
        contem(r.copiado, 'AM: Fulano de Tal', 'AM');
    });

    await check('desmescla "Motivo | Justificativa" em vez de copiar o pipe', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        naoContem(r.copiado, ' | ', 'o pipe da coluna 16');
    });

    await check('não carrega PII nem dado que já está no caso do CRM', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        naoContem(r.copiado, 'contato@loja.exemplo', 'e-mail do anunciante');
        naoContem(r.copiado, '90000-0000', 'telefone do anunciante');
        naoContem(r.copiado, '123-456-7890', 'CID');
        naoContem(r.copiado, 'loja.exemplo', 'site');
        naoContem(r.copiado, 'Programa X', 'sales program');
    });

    await check('pedido de descarte não ganha resumo', async () => {
        const r = await resumoDoCaso(page, 'bau_descarte');
        naoContem(r.etiquetas.join(' § '), 'Resumo para o caso BAU', 'etiqueta do resumo');
    });

    await check('o texto segue o idioma do ATENDIMENTO, não o da tela do TL', async () => {
        // Mesmo TL (tela em PT), dois casos, dois idiomas.
        const pt = await resumoDoCaso(page, 'bau_pt');
        const es = await resumoDoCaso(page, 'bau_es');
        contem(pt.copiado, 'O que aconteceu:', 'caso PT em português');
        contem(es.copiado, 'Qué pasó:', 'caso ES em espanhol');
        contem(es.copiado, 'Qué debe hacerse en BAU:', 'o que fazer, em espanhol');
        contem(es.copiado, 'Caso de origen (LM): 0-2222222222', 'caso de origem, em espanhol');
        contem(es.copiado, 'Abierto por anaes@ el 09/09/2026', 'quem abriu, em espanhol');
        igual(es.copiado.split('\n')[0], 'Caso LM para BAU', 'headline não traduz — é marcador');
    });

    await page.close();
}

{
    // O TL em ES vê a ETIQUETA do campo em espanhol (é a tela dele), mas o TEXTO
    // continua sendo o do caso. São dois idiomas independentes de propósito.
    const page = await abrirPagina(browser, { idiomaDoTL: 'ES' });
    await check('etiqueta segue a tela do TL; texto segue o caso', async () => {
        const r = await resumoDoCaso(page, 'bau_pt');
        igual(r.etiquetaDoUltimo, 'Resumen para el caso BAU', 'etiqueta em ES');
        contem(r.copiado, 'O que aconteceu:', 'mas o texto do caso PT segue em PT');
    });
    await page.close();
}

await browser.close();
await rm(ARQUIVO, { force: true });

console.log(fail === 0 ? '\n✅ TL Dashboard: tudo certo.\n' : `\n❌ ${fail} falha(s).\n`);
process.exit(fail === 0 ? 0 : 1);
