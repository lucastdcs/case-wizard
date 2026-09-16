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
//   - o resumo é o ÚLTIMO bloco do modal (é o que o TL procura no fim);
//   - a headline diz "Caso LM para BAU", literalmente;
//   - o texto copiado preserva as quebras de linha do texto exibido;
//   - o idioma segue o ATENDIMENTO (c.language), não a tela do TL;
//   - "Motivo | Justificativa" é desmesclado em vez de sair com o pipe;
//   - PII (e-mail, telefone) e dado redundante não vazam para o texto;
//   - pedido de descarte NÃO ganha resumo (não há caso BAU para abrir);
//   - o briefing (o que fazer / justificativa / agendamento) é LEITURA: nenhum
//     deles tem botão de copiar, porque o TL não cola isso em lugar nenhum;
//   - nome e sobrenome são campos separados, e sobrenome ausente vira "N/A";
//   - as ações de decisão existem dentro da vista, sem precisar fechar;
//   - Esc fecha o modal e o foco volta para onde estava.
//
// COMO ELE RODA SEM APPS SCRIPT
//
// A tela é servida pelo HtmlService e conversa por `google.script.run`. Aqui o
// HTML é lido do disco, as duas tags de template viram vazio e o bridge é
// substituído por um dublê que responde do fixture abaixo.
//
// Uso: npm run smoke:tl-dash

import { chromium } from 'playwright';
import vm from 'node:vm';
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
    // As notas de versão vêm do arquivo de verdade, e não de um fixture: se
    // alguém quebrar o formato de CW_DASH_RELEASE_NOTES, é aqui que aparece.
    html = html.replace(/<\?!=\s*CW_RELEASE_NOTES\s*\?>/g, () => JSON.stringify(NOTAS));
    if (/<\?/.test(html)) throw new Error('TLDashboard: sobrou tag de template não resolvida');
    await writeFile(ARQUIVO, html, 'utf8');
}

// Lê o CW_DASH_RELEASE_NOTES do gas-backend sem Apps Script: o arquivo é JS de
// verdade, então basta avaliá-lo num contexto vazio e pegar a constante.
async function lerNotasDeVersao() {
    const fonte = await readFile(resolve(raiz, 'gas-backend/DashReleaseNotes.js'), 'utf8');
    const ctx = { };
    vm.createContext(ctx);
    vm.runInContext(fonte + '\n;globalThis.__notas = CW_DASH_RELEASE_NOTES;', ctx);
    return ctx.__notas;
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

CASOS.push({
    id: 'bau_semsobrenome', status: 'PENDING_TL_CREATION',
    date: '2026-09-09T16:00:00Z',
    agentEmail: 'lucaste@google.com',
    caseId: '0-4444444444', cid: '444-444-4444', speakeasyId: '444444',
    advName: 'Padaria', advLastName: '',
    advEmail: 'oi@padaria.exemplo', advPhone: '', site: 'https://padaria.exemplo',
    timezone: 'America/Sao_Paulo', language: 'PT-BR',
    amName: 'Beltrano', salesProgram: 'Programa Z',
    reason: 'Instalar o GTM.', task: 'Google Tag Manager Installation',
    description: 'Falta de acessos ou backup do site | Sem acesso ao servidor.',
    availability: '', suggestDiscard: 'Não',
});

// Histórico: o payload agora é o registro INTEIRO mais os campos de resolução —
// é isso que permite abrir um caso resolvido e ver o mesmo que se vê na fila.
// O segundo caso é anterior à coluna de justificativa e nunca vai ter uma.
const HISTORICO = {
    windowDays: 30,
    cases: [
        {
            id: 'hist_rejeitado', status: 'DISCARDED',
            date: '2026-09-01T10:00:00Z', agentEmail: 'lucaste@google.com',
            caseId: '0-5555555555', cid: '555-555-5555', speakeasyId: '555555',
            advName: 'Mercearia', advLastName: 'Central',
            advEmail: 'oi@mercearia.exemplo', advPhone: '+55 21 98888-8888',
            site: 'https://mercearia.exemplo', timezone: 'America/Sao_Paulo',
            language: 'PT-BR', amName: 'Sicrano', salesProgram: 'Programa W',
            reason: 'Revisar o Enhanced Conversions.',
            task: 'Ads Enhanced Conversions',
            description: 'Solicitação de tarefas (tasks) adicionais | O anunciante pediu mais duas tasks.',
            availability: '2026-09-05T10:00-03:00', suggestDiscard: 'Não',
            action: 'REJECTED_CREATION', processedBy: 'tlpessoa@google.com',
            processedAt: '2026-09-02T14:00:00Z', childCaseId: '',
            tlJustification: 'As tasks pedidas cabem no caso atual, não precisa de BAU.',
        },
        {
            id: 'hist_antigo', status: 'CREATED',
            date: '2026-08-20T10:00:00Z', agentEmail: 'anaes@google.com',
            caseId: '0-6666666666', cid: '666-666-6666', speakeasyId: '666666',
            advName: 'Farmácia', advLastName: '',
            advEmail: '', advPhone: '', site: '', timezone: '',
            language: 'PT-BR', amName: '', salesProgram: '',
            reason: 'Instalar GTM.', task: 'Google Tag Manager Installation',
            description: 'Tempo da consultoria esgotado | Sem tempo.',
            availability: '', suggestDiscard: 'Não',
            action: 'APPROVED_CREATION', processedBy: 'tlpessoa@google.com',
            processedAt: '2026-08-21T09:00:00Z', childCaseId: '0-7777777777',
            tlJustification: '',
        },
    ],
    stats: { approved: 1, discarded: 1, avgResolutionHours: 20, topAgents: [] },
};

const PERFIL = { ldap: 'tlpessoa', role: 'TL', defaultLanguage: 'PT-BR' };

async function abrirPagina(browser, { idiomaDoTL, versaoJaVista } = {}) {
    const page = await browser.newPage();
    page.on('pageerror', (e) => { console.log('      [erro na página] ' + e.message); });

    await page.addInitScript(({ casos, historico, perfil }) => {
        const RESPOSTAS = {
            getPendingBAUCases: () => casos,
            getCurrentTLProfile: () => perfil,
            getActiveTLs: () => [],
            getRecentActivity: () => [],
            getWeeklyHistory: () => historico,
            recordTLPresence: () => ({ ldap: perfil.ldap }),
            updateBAUCaseStatus: () => ({ success: true, emailSent: true }),
        };
        function construir() {
            let ok = null, erro = null;
            const proxy = new Proxy({}, {
                get(_b, prop) {
                    if (prop === 'withSuccessHandler') return function (f) { ok = f; return proxy; };
                    if (prop === 'withFailureHandler') return function (f) { erro = f; return proxy; };
                    return function (...args) {
                        (window.__enviou = window.__enviou || []).push({ metodo: String(prop), args });
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
    }, { casos: CASOS, historico: HISTORICO, perfil: Object.assign({}, PERFIL, idiomaDoTL ? { defaultLanguage: idiomaDoTL } : {}) });

    if (versaoJaVista) {
        await page.addInitScript((v) => {
            try { localStorage.setItem('cw_tl_seen_version', v); } catch (e) { /* ignora */ }
        }, versaoJaVista);
    }

    await page.goto('file://' + ARQUIVO, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.case-row', { timeout: 5000 });
    await page.waitForTimeout(150);
    return page;
}

// Abre o modal do caso e devolve o estado das três zonas.
async function abrirCaso(page, id) {
    await page.evaluate((caseId) => { openDetails(caseId); }, id);
    await page.waitForTimeout(120);
    return page.evaluate(() => {
        const txt = (sel, raiz) => {
            const el = (raiz || document).querySelector(sel);
            return el ? el.textContent.trim() : null;
        };
        const secoes = Array.from(document.querySelectorAll('#modal-body-content > section'));
        const ultima = secoes[secoes.length - 1];
        const resumoEl = document.querySelector('.case-summary-text');
        const botaoResumo = document.querySelector('.btn-copy-summary');
        return {
            titulo: txt('#case-modal-title'),
            cabecalho: txt('#modal-header-content'),
            selos: Array.from(document.querySelectorAll('#modal-header-content .status-badge')).map((b) => b.textContent.trim()),
            briefing: Array.from(document.querySelectorAll('.case-brief .brief-item')).map((i) => ({
                label: txt('.brief-label', i),
                texto: txt('.brief-text', i),
                temBotaoCopiar: !!i.querySelector('.copy-btn'),
            })),
            fatos: Array.from(document.querySelectorAll('.case-facts .fact')).map((f) => ({
                label: txt('.fact-label', f),
                valor: txt('.fact-value', f),
                copia: f.querySelector('.copy-btn').dataset.copyValue,
            })),
            resumoEhUltimaSecao: !!(ultima && ultima.classList.contains('case-summary-block')),
            exibido: resumoEl ? resumoEl.textContent : null,
            copiado: botaoResumo ? botaoResumo.dataset.copyValue : null,
            acoes: Array.from(document.querySelectorAll('#modal-footer-content button')).map((b) => b.textContent.trim()),
            larguraMaxima: getComputedStyle(document.querySelector('#caseModal .modal-content')).maxWidth,
        };
    });
}
const fatoDe = (r, label) => r.fatos.filter((f) => f.label === label)[0];

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

const NOTAS = await lerNotasDeVersao();
await prepararArquivo();
const browser = await chromium.launch({ headless: true, executablePath });

console.log('\n--- Smoke: TL Dashboard (resumo copiável) ---\n');

{
    // versaoJaVista: estes blocos testam a vista de caso, e o aviso de novidades
    // abriria por cima no meio deles. O changelog tem bloco próprio no fim.
    const page = await abrirPagina(browser, { versaoJaVista: NOTAS.version });

    await check('o cabeçalho diz de quem é o caso, não "Detalhes da Solicitação"', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        igual(r.titulo, 'Loja Exemplo', 'título do modal');
        contem(r.cabecalho, 'Enviado por', 'autoria no cabeçalho');
        contem(r.cabecalho, 'lucaste', 'ldap de quem abriu');
        contem(r.selos.join(' § '), 'Criação de BAU', 'selo do fluxo');
    });

    await check('o modal foi ampliado para 900px', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        igual(r.larguraMaxima, '900px', 'max-width do modal');
    });

    await check('o briefing é LEITURA: nenhum dos quatro campos tem botão de copiar', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        const labels = r.briefing.map((b) => b.label);
        igual(labels, ['O que deve ser feito', 'Motivo da não implementação',
            'Justificativa / Detalhes', 'Agendamento'], 'campos do briefing');
        verdade(!r.briefing.some((b) => b.temBotaoCopiar), 'nenhum deles é copiável');
        // E não sobraram como campo de dado, que é o ponto do pedido.
        const dados = r.fatos.map((f) => f.label);
        verdade(dados.indexOf('O que deve ser feito') === -1, 'o que fazer saiu dos copiáveis');
        verdade(dados.indexOf('Justificativa / Detalhes') === -1, 'justificativa saiu dos copiáveis');
        verdade(dados.indexOf('Agendamento') === -1, 'agendamento saiu dos copiáveis');
        verdade(dados.indexOf('Agente') === -1, 'agente saiu dos copiáveis (virou autoria no cabeçalho)');
    });

    await check('o briefing desmescla "Motivo | Justificativa"', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        const porLabel = (l) => r.briefing.filter((b) => b.label === l)[0].texto;
        igual(porLabel('Motivo da não implementação'),
            'Implementação parcial (nem todas as tasks concluídas)', 'motivo isolado');
        igual(porLabel('Justificativa / Detalhes'),
            'Cliente não tinha acesso ao GTM no momento da call; ficou de liberar.', 'detalhe isolado');
        verdade(porLabel('Justificativa / Detalhes').indexOf(' | ') === -1, 'sem o pipe');
    });

    await check('nome e sobrenome são campos separados', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        igual(fatoDe(r, 'Anunciante').valor, 'Loja', 'nome sozinho');
        igual(fatoDe(r, 'Sobrenome do Anunciante').valor, 'Exemplo', 'sobrenome sozinho');
        // O que se copia tem que ser o campo, e não o nome inteiro de novo.
        igual(fatoDe(r, 'Anunciante').copia, 'Loja', 'valor copiado do nome');
    });

    await check('sobrenome ausente vira N/A, e é isso que se copia', async () => {
        const r = await abrirCaso(page, 'bau_semsobrenome');
        igual(fatoDe(r, 'Sobrenome do Anunciante').valor, 'N/A', 'exibido');
        igual(fatoDe(r, 'Sobrenome do Anunciante').copia, 'N/A', 'copiado');
    });

    await check('as ações de decisão existem dentro da vista', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        igual(r.acoes.length, 2, 'dois botões no rodapé');
        contem(r.acoes.join(' § '), 'Aprovar e Notificar', 'ação primária');
        contem(r.acoes.join(' § '), 'Rejeitar Solicitação', 'ação secundária');
    });

    await check('no fluxo de descarte o rodapé inverte as ações', async () => {
        const r = await abrirCaso(page, 'bau_descarte');
        contem(r.acoes.join(' § '), 'Confirmar Descarte', 'ação primária do descarte');
        contem(r.acoes.join(' § '), 'Manter Caso Ativo', 'ação secundária do descarte');
    });

    await check('o resumo é o ÚLTIMO bloco do modal', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        verdade(r.resumoEhUltimaSecao, 'o resumo fecha o modal');
    });

    await check('a headline é "Caso LM para BAU", literal e na primeira linha', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        igual(r.copiado.split('\n')[0], 'Caso LM para BAU', 'primeira linha do texto copiado');
    });

    await check('o texto copiado é igual ao exibido, com as quebras de linha', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        // É este o par que só um navegador de verdade prova: o innerHTML colapsa
        // quebras de linha, o atributo não — ou o contrário, dependendo do escape.
        igual(r.exibido, r.copiado, 'exibido x copiado');
        verdade(r.copiado.split('\n').length >= 9, 'o texto tem as quebras (veio em uma linha só?)');
    });

    await check('diz o que aconteceu, o que fazer, as tasks e o AM', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        contem(r.copiado, 'Caso de origem (LM): 0-1234567890', 'caso de origem');
        contem(r.copiado, 'Aberto por lucaste@ em 08/09/2026', 'quem abriu e quando');
        contem(r.copiado, 'O que aconteceu: Implementação parcial (nem todas as tasks concluídas).', 'motivo');
        contem(r.copiado, 'Cliente não tinha acesso ao GTM', 'justificativa do agente');
        contem(r.copiado, 'O que deve ser feito em BAU:\nConcluir a implementação do Consent Mode', 'o que fazer');
        contem(r.copiado, 'Tasks: Consent Mode · Ads Enhanced Conversions', 'tasks separadas por ponto médio');
        contem(r.copiado, 'AM: Fulano de Tal', 'AM');
        naoContem(r.copiado, ' | ', 'o pipe da coluna 16');
    });

    await check('não carrega PII nem dado que já está no caso do CRM', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        naoContem(r.copiado, 'contato@loja.exemplo', 'e-mail do anunciante');
        naoContem(r.copiado, '90000-0000', 'telefone do anunciante');
        naoContem(r.copiado, '123-456-7890', 'CID');
        naoContem(r.copiado, 'loja.exemplo', 'site');
        naoContem(r.copiado, 'Programa X', 'sales program');
    });

    await check('pedido de descarte não ganha resumo', async () => {
        const r = await abrirCaso(page, 'bau_descarte');
        igual(r.copiado, null, 'bloco de resumo');
        verdade(!r.resumoEhUltimaSecao, 'e nenhuma seção de resumo fecha o modal');
    });

    await check('o texto segue o idioma do ATENDIMENTO, não o da tela do TL', async () => {
        // Mesmo TL (tela em PT), dois casos, dois idiomas.
        const pt = await abrirCaso(page, 'bau_pt');
        const es = await abrirCaso(page, 'bau_es');
        contem(pt.copiado, 'O que aconteceu:', 'caso PT em português');
        contem(es.copiado, 'Qué pasó:', 'caso ES em espanhol');
        contem(es.copiado, 'Qué debe hacerse en BAU:', 'o que fazer, em espanhol');
        contem(es.copiado, 'Caso de origen (LM): 0-2222222222', 'caso de origem, em espanhol');
        contem(es.copiado, 'Abierto por anaes@ el 09/09/2026', 'quem abriu, em espanhol');
        igual(es.copiado.split('\n')[0], 'Caso LM para BAU', 'headline não traduz — é marcador');
    });

    await check('a fila é alcançável pelo teclado e o foco volta no Esc', async () => {
        // As verificações acima abrem o modal por openDetails() e não o fecham.
        // Este é o único caso que precisa do caminho de verdade (clique na fila),
        // porque é o clique que registra o foco a ser devolvido.
        await page.evaluate(() => closeModal('caseModal'));
        await page.waitForTimeout(80);
        await page.click('#row-bau_pt .row-open-btn');
        await page.waitForTimeout(120);
        verdade(await page.evaluate(() => document.getElementById('caseModal').classList.contains('active')),
            'o modal abriu pelo controle da linha');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(120);
        verdade(!(await page.evaluate(() => document.getElementById('caseModal').classList.contains('active'))),
            'Esc fechou');
        igual(await page.evaluate(() => document.activeElement.className), 'row-open-btn text-primary', 'foco devolvido');
    });

    await page.close();
}

{
    // O TL em ES vê a ETIQUETA do campo em espanhol (é a tela dele), mas o TEXTO
    // continua sendo o do caso. São dois idiomas independentes de propósito.
    const page = await abrirPagina(browser, { idiomaDoTL: 'ES', versaoJaVista: NOTAS.version });
    await check('rótulos seguem a tela do TL; o texto do resumo segue o caso', async () => {
        const r = await abrirCaso(page, 'bau_pt');
        verdade(!!fatoDe(r, 'Apellido del Anunciante'), 'rótulo de sobrenome em ES');
        contem(r.briefing.map((b) => b.label).join(' § '), 'Qué debe hacerse', 'briefing em ES');
        contem(r.copiado, 'O que aconteceu:', 'mas o texto do caso PT segue em PT');
    });
    await page.close();
}

{
    // Histórico clicável e justificativa da recusa.
    const page = await abrirPagina(browser, { versaoJaVista: NOTAS.version });
    await page.click('#tab-history');
    await page.waitForSelector('.history-row', { timeout: 5000 });
    await page.waitForTimeout(150);

    await check('clicar no histórico abre a MESMA vista da fila, com tudo', async () => {
        const r = await abrirCaso(page, 'hist_rejeitado');
        igual(r.titulo, 'Mercearia Central', 'anunciante no título');
        // Os campos que o histórico antigo não tinha como mostrar:
        igual(fatoDe(r, 'CID').valor, '555-555-5555', 'CID');
        igual(fatoDe(r, 'Email do Anunciante').valor, 'oi@mercearia.exemplo', 'e-mail');
        igual(fatoDe(r, 'AM Responsável').valor, 'Sicrano', 'AM');
        contem(r.briefing.map((b) => b.texto).join(' § '), 'Revisar o Enhanced Conversions.', 'o que fazer');
        contem(r.briefing.map((b) => b.texto).join(' § '), 'O anunciante pediu mais duas tasks.', 'justificativa do agente');
    });

    await check('caso resolvido mostra o bloco da decisão', async () => {
        const r = await abrirCaso(page, 'hist_rejeitado');
        const decisao = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.case-decision .brief-item')).map((i) => ({
                label: i.querySelector('.brief-label').textContent.trim(),
                texto: i.querySelector('.brief-text').textContent.trim(),
            })));
        const porLabel = (l) => (decisao.filter((d) => d.label === l)[0] || {}).texto;
        igual(porLabel('Decidido por'), 'tlpessoa', 'quem decidiu');
        igual(porLabel('Justificativa da liderança'),
            'As tasks pedidas cabem no caso atual, não precisa de BAU.', 'justificativa registrada');
        verdade(!!porLabel('Decidido em'), 'quando');
        contem(r.selos.join(' § '), 'Criação rejeitada', 'selo do desfecho, não do fluxo');
    });

    await check('caso resolvido NÃO oferece aprovar nem rejeitar', async () => {
        const r = await abrirCaso(page, 'hist_rejeitado');
        igual(r.acoes, [], 'rodapé vazio');
        verdade(await page.evaluate(() => document.getElementById('modal-footer-content').hidden),
            'e escondido, para não deixar a borda do rodapé sobrando');
    });

    await check('decisão anterior à coluna não renderiza justificativa vazia', async () => {
        const r = await abrirCaso(page, 'hist_antigo');
        const labels = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.case-decision .brief-label')).map((l) => l.textContent.trim()));
        verdade(labels.indexOf('Justificativa da liderança') === -1,
            'sem bloco de justificativa para caso decidido antes dela existir');
        contem(labels.join(' § '), 'ID do caso BAU gerado', 'mas o caso filho aparece');
        contem(r.selos.join(' § '), 'Criação aprovada', 'selo de aprovado');
    });

    await check('a busca do histórico acha por anunciante e CID', async () => {
        await page.evaluate(() => closeModal('caseModal'));
        await page.fill('#search-input', 'mercearia');
        await page.waitForTimeout(250);
        igual(await page.evaluate(() => document.querySelectorAll('.history-row').length), 1, 'por anunciante');
        await page.fill('#search-input', '666-666');
        await page.waitForTimeout(250);
        igual(await page.evaluate(() => document.querySelectorAll('.history-row').length), 1, 'por CID');
        await page.fill('#search-input', '');
        await page.waitForTimeout(250);
    });

    await page.close();
}

{
    // O campo de justificativa no modal de confirmação.
    const page = await abrirPagina(browser, { versaoJaVista: NOTAS.version });

    const estadoDoModal = () => page.evaluate(() => ({
        pedeJustificativa: !document.getElementById('confirm-justification').hidden,
        pedeCasoFilho: !document.getElementById('confirm-child-case').hidden,
        erroVisivel: !document.getElementById('confirm-justification-error').hidden,
    }));

    await check('rejeitar pede justificativa; aprovar não', async () => {
        await page.evaluate(() => confirmAction('bau_pt', 'DISCARDED'));
        await page.waitForTimeout(100);
        igual(await estadoDoModal(), { pedeJustificativa: true, pedeCasoFilho: false, erroVisivel: false },
            'rejeição de criação');

        await page.evaluate(() => { closeModal('confirmModal'); confirmAction('bau_pt', 'CREATED'); });
        await page.waitForTimeout(100);
        igual(await estadoDoModal(), { pedeJustificativa: false, pedeCasoFilho: true, erroVisivel: false },
            'aprovação de criação');
    });

    await check('negar um descarte também pede justificativa', async () => {
        await page.evaluate(() => { closeModal('confirmModal'); confirmAction('bau_descarte', 'CREATED'); });
        await page.waitForTimeout(100);
        igual((await estadoDoModal()).pedeJustificativa, true, 'manter caso ativo é a outra negativa');

        await page.evaluate(() => { closeModal('confirmModal'); confirmAction('bau_descarte', 'DISCARDED'); });
        await page.waitForTimeout(100);
        igual((await estadoDoModal()).pedeJustificativa, false, 'confirmar o descarte é aceitar o pedido');
    });

    await check('enviar sem justificativa é barrado, e nada vai ao servidor', async () => {
        await page.evaluate(() => { closeModal('confirmModal'); window.__enviou = []; confirmAction('bau_pt', 'DISCARDED'); });
        await page.waitForTimeout(100);
        await page.click('#confirm-submit-btn');
        await page.waitForTimeout(200);
        igual((await estadoDoModal()).erroVisivel, true, 'erro na tela');
        igual(await page.evaluate(() => window.__enviou.length), 0, 'nenhuma chamada ao servidor');
        verdade(await page.evaluate(() => document.getElementById('confirmModal').classList.contains('active')),
            'o modal continua aberto');
    });

    await check('com justificativa, ela viaja para o servidor', async () => {
        await page.fill('#confirm-justification-input', 'Cabe no caso atual.');
        await page.click('#confirm-submit-btn');
        await page.waitForTimeout(250);
        const chamada = await page.evaluate(() => window.__enviou[0]);
        igual(chamada.metodo, 'updateBAUCaseStatus', 'método');
        igual(chamada.args[3], 'Cabe no caso atual.', 'justificativa no 4º argumento');
    });

    await page.close();
}

{
    // Changelog do dashboard. O do bookmarklet é do agente — o TL nunca o carrega.
    const page = await abrirPagina(browser);

    await check('o changelog abre sozinho quando a versão ainda não foi vista', async () => {
        await page.waitForSelector('#releaseModal.active', { timeout: 4000 });
        const visto = await page.evaluate(() => ({
            versao: document.getElementById('release-version').textContent,
            titulo: document.getElementById('release-title').textContent,
            itens: document.querySelectorAll('#release-body .release-item').length,
            gravado: localStorage.getItem('cw_tl_seen_version'),
        }));
        igual(visto.versao, 'v' + NOTAS.version, 'versão exibida');
        igual(visto.titulo, NOTAS.title, 'título');
        igual(visto.itens, NOTAS.items.length, 'itens renderizados');
        igual(visto.gravado, NOTAS.version, 'versão marcada como vista');
    });

    await check('não rouba a tela de quem abriu o painel para aprovar', async () => {
        // A fila tem que estar renderizada ANTES do aviso aparecer.
        const filaPrimeiro = await page.evaluate(() => document.querySelectorAll('.case-row').length > 0);
        verdade(filaPrimeiro, 'a fila carregou antes');
    });

    await page.close();
}

{
    const page = await abrirPagina(browser, { versaoJaVista: NOTAS.version });
    await check('quem já viu esta versão não é interrompido de novo', async () => {
        await page.waitForTimeout(1800);
        verdade(!(await page.evaluate(() => document.getElementById('releaseModal').classList.contains('active'))),
            'o modal não abriu sozinho');
        verdade(await page.evaluate(() => document.getElementById('whats-new-dot').hidden),
            'e o ponto de aviso não aparece');
    });

    await check('mas o botão do cabeçalho reabre as novidades', async () => {
        await page.click('#btn-whats-new');
        await page.waitForTimeout(150);
        verdade(await page.evaluate(() => document.getElementById('releaseModal').classList.contains('active')),
            'reabriu pelo botão');
    });
    await page.close();
}

await browser.close();
await rm(ARQUIVO, { force: true });

console.log(fail === 0 ? '\n✅ TL Dashboard: tudo certo.\n' : `\n❌ ${fail} falha(s).\n`);
process.exit(fail === 0 ? 0 : 1);
