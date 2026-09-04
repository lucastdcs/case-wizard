// scripts/smoke-content-dashboard.mjs
//
// Smoke da Central de Conteúdo (gas-backend/ContentDashboard.html) num
// navegador de verdade.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// A Central é a única tela do projeto sem teste nenhum, e é a maior: mais de
// 2.800 linhas onde estilo, marcação e dez renderizadores convivem no mesmo
// arquivo. A reorganização da navegação (ADR-0007) toca todos eles de uma vez.
// Mexer nisso sem rede é a aposta mais cara do plano — então a rede vem antes.
//
// O QUE ELE PROTEGE
//
// Não a aparência (que vai mudar de propósito), e sim o que precisa continuar
// verdadeiro DEPOIS do redesenho:
//   - quem não tem acesso não vê a tela, e quem tem vê o próprio papel;
//   - cada papel só enxerga o caminho de escrita dos módulos que ele propõe;
//   - trocar de aba mostra um painel e esconde os outros;
//   - a aba de Acessos é exclusiva de quem gerencia acesso;
//   - `people` nunca aparece para quem não propõe (é autorização, não conteúdo);
//   - salvar uma proposta é UMA chamada ao servidor, não duas;
//   - falha ao carregar rascunhos aparece na tela em vez de virar "não há nenhum".
//
// COMO ELE RODA SEM APPS SCRIPT
//
// A tela é servida pelo HtmlService e conversa por `google.script.run`. Aqui o
// HTML é lido do disco, as duas tags de template viram vazio e o bridge é
// substituído por um dublê que responde do fixture abaixo. O dublê registra
// toda chamada, o que permite afirmar quantas viagens uma ação custou — é
// assim que o teste de "uma chamada, não duas" existe.
//
// Uso: npm run smoke:content

import { chromium } from 'playwright';
import { writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { montarContentDashboard } from './content-dashboard-html.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// A página precisa vir de uma URL de verdade, e não de setContent(): os
// scripts de inicialização do Playwright — que é onde o dublê do
// google.script.run é instalado — só rodam numa navegação.
const ARQUIVO = join(tmpdir(), 'cw-content-dashboard-smoke.html');

async function prepararArquivo() {
    // A montagem mora em content-dashboard-html.mjs: o smoke da aba Pessoas lê
    // a mesma tela, e quando a divisão em partes entrou só este arquivo foi
    // ajustado — o outro passou a carregar uma casca sem estilo nem script.
    await writeFile(ARQUIVO, await montarContentDashboard(raiz), 'utf8');
}

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque}: esperado ${b}, veio ${a}`);
}
function verdade(cond, oque) {
    if (!cond) throw new Error(oque);
}

// ---------------------------------------------------------------- fixture
//
// Papéis reais da matriz de CONTENT_ROLES. QA e WFM existem aqui porque são os
// que provam a régua: cada um propõe um subconjunto diferente, e é isso que a
// tela tem que refletir sem depender de o servidor recusar depois.
const SESSOES = {
    admin: {
        ldap: 'lucaste', role: 'ADMIN', hasAccess: true,
        canApprove: true, canManageAccess: true, canSelfApprove: true,
        proposableModules: ['links', 'call_script', 'email_template', 'note_template',
            'tips', 'broadcast', 'bau_availability', 'people'],
    },
    qa: {
        ldap: 'qapessoa', role: 'QA', hasAccess: true,
        canApprove: false, canManageAccess: false, canSelfApprove: false,
        proposableModules: ['call_script', 'note_template'],
    },
    wfm: {
        ldap: 'wfmpessoa', role: 'WFM', hasAccess: true,
        canApprove: false, canManageAccess: false, canSelfApprove: false,
        proposableModules: ['links', 'bau_availability'],
    },
    semAcesso: { ldap: 'estranho', role: null, hasAccess: false },
};

const ITENS = {
    links: [{
        id: 'itm_1', module: 'links', key: 'tasks', field: '', lang: 'ALL',
        label: 'Fila de tarefas', version: 1, status: 'live',
        publishedBy: 'lucaste', publishedAt: '2026-09-01T10:00:00Z', sortOrder: 0,
        lineage: 'itm_1',
        value: JSON.stringify({ name: 'Fila de tarefas', url: 'https://go/fila', desc: 'Fila do dia', desc_es: 'Cola del día' }),
    }],
    tips: [{
        id: 'itm_2', module: 'tips', key: 'geral', field: '', lang: 'PT',
        label: 'Dica', version: 1, status: 'live', publishedBy: 'lucaste',
        publishedAt: '2026-09-01T10:00:00Z', sortOrder: 0, lineage: 'itm_2',
        value: 'Confira o substatus antes de fechar.',
    }],
    call_script: [], email_template: [], note_template: [],
    broadcast: [], bau_availability: [], people: [],
};

// Duas versões do mesmo link: é o mínimo para provar que a versão arquivada
// aparece e que só ela oferece "voltar para esta versão".
const HISTORICO = {
    itm_1: [
        {
            id: 'itm_1', module: 'links', key: 'tasks', lang: 'ALL', label: 'Fila de tarefas',
            version: 2, status: 'live', publishedBy: 'lucaste', publishedAt: '2026-09-01T10:00:00Z',
            lineage: 'itm_1',
            value: JSON.stringify({ name: 'Fila de tarefas', url: 'https://go/fila', desc: 'Fila do dia' }),
        },
        {
            id: 'itm_0', module: 'links', key: 'tasks', lang: 'ALL', label: 'Fila de tarefas',
            version: 1, status: 'archived', publishedBy: 'anaflor', publishedAt: '2026-08-20T09:00:00Z',
            lineage: 'itm_1',
            value: JSON.stringify({ name: 'Fila antiga', url: 'https://go/antiga', desc: 'Versão anterior' }),
        },
    ],
};

// ------------------------------------------------------- montagem da página
async function abrir({ sessao = 'admin', falharRascunhosDe = null, hash = '', draftsDe = null } = {}) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });

    // As fontes do Google não respondem aqui; cortar evita espera inútil.
    await page.route('**fonts.googleapis.com/**', (r) => r.abort());
    await page.route('**fonts.gstatic.com/**', (r) => r.abort());

    // O dublê precisa existir ANTES do script da página rodar: o boot dispara
    // no DOMContentLoaded.
    await page.addInitScript(({ sessao, itens, falhar, historico, rascunhos }) => {
        const HISTORICO = historico;
        window.__chamadas = [];

        const RESPOSTAS = {
            getContentSession: () => sessao,
            listContentItems: (m) => itens[m] || [],
            listContentDrafts: (m) => {
                if (falhar && m === falhar) throw new Error('rede caiu');
                return (rascunhos && rascunhos[m]) || [];
            },
            listPendingApprovals: () => [],
            listContentItemHistory: (lineage) => (HISTORICO[lineage] || []),
            rollbackContentItem: () => ({ status: 'success', itemId: 'itm_revivido' }),
            saveContentDraft: () => ({ status: 'success', draftId: 'drf_rascunho' }),
            discardContentDraft: () => ({ status: 'success' }),
            listContentAccess: () => [{ ldap: 'lucaste', role: 'ADMIN', active: true, grantedBy: 'system' }],
            listPeople: () => [],
            getNoteFieldCatalog: () => ({ fields: {}, substatus: [] }),
            saveAndSubmitContentDraft: () => ({ status: 'success', draftId: 'drf_novo' }),
            publishContentDirect: () => ({ status: 'success', itemId: 'itm_novo', version: 1 }),
            unpublishContentDirect: () => ({ status: 'success' }),
            approveContentDraft: () => ({ status: 'success', version: 1, action: 'upsert' }),
            rejectContentDraft: () => ({ status: 'success' }),
            requestContentRemoval: () => ({ status: 'success' }),
            requestPeopleRemoval: () => ({ status: 'success' }),
            savePeopleChange: () => ({ status: 'success' }),
            saveContentAccess: () => ({ status: 'success' }),
        };

        function construir() {
            let ok = null, erro = null;

            // O encadeamento precisa devolver o PRÓPRIO proxy: devolver o alvo
            // cru faria a terceira chamada da cadeia
            // (.withSuccessHandler().withFailureHandler().metodo()) cair num
            // objeto que não conhece método nenhum.
            const proxy = new Proxy({}, {
                get(_base, prop) {
                    if (prop === 'withSuccessHandler') return function (f) { ok = f; return proxy; };
                    if (prop === 'withFailureHandler') return function (f) { erro = f; return proxy; };
                    return function (...args) {
                        window.__chamadas.push({ metodo: String(prop), args });
                        // Assíncrono como o bridge real: síncrono esconderia
                        // corrida de renderização que na tela existe.
                        setTimeout(() => {
                            try {
                                const r = (RESPOSTAS[prop] || (() => null))(...args);
                                if (ok) ok(r);
                            } catch (e) {
                                if (erro) erro({ message: e.message });
                            }
                        }, 5);
                    };
                },
            });

            return proxy;
        }

        Object.defineProperty(window, 'google', {
            value: { script: { get run() { return construir(); } } },
            writable: true,
        });
    }, { sessao: SESSOES[sessao], itens: ITENS, falhar: falharRascunhosDe, historico: HISTORICO, rascunhos: draftsDe });

    await page.goto('file://' + ARQUIVO + hash, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    return page;
}

await prepararArquivo();
const browser = await chromium.launch({ headless: true });

console.log('\n--- Smoke: Central de Conteúdo ---');

// ------------------------------------------------------------------ acesso
{
    const page = await abrir({ sessao: 'semAcesso' });

    await check('sem papel: a tela não aparece, e o motivo sim', async () => {
        verdade(await page.locator('#denied-state').isVisible(), 'estado de acesso negado deveria estar visível');
        verdade(!(await page.locator('#app').isVisible()), 'o app não deveria aparecer');
    });

    await check('sem papel: nenhum conteúdo é carregado', async () => {
        const chamadas = await page.evaluate(() => window.__chamadas.map(c => c.metodo));
        igual(chamadas.includes('listContentItems'), false, 'buscou conteúdo sem ter acesso');
    });

    await page.close();
}

{
    const page = await abrir({ sessao: 'admin' });

    await check('ADMIN: a tela abre e mostra o papel', async () => {
        verdade(await page.locator('#app').isVisible(), 'o app deveria aparecer');
        igual((await page.locator('#user-role').textContent()).trim(), 'ADMIN', 'selo de papel');
        igual((await page.locator('#user-ldap').textContent()).trim(), 'lucaste', 'ldap');
    });

    await check('ADMIN: enxerga a aba de Acessos', async () => {
        verdade(await page.locator('#tab-access').isVisible(), 'aba Acessos deveria aparecer para quem gerencia acesso');
    });

    // A navegação é o que o ADR-0007 vai reescrever. O contrato que precisa
    // sobreviver não é "existem abas", é "escolher um destino mostra um painel
    // e esconde os outros".
    await check('trocar de destino mostra um painel só', async () => {
        const panes = ['links', 'callscript', 'notes', 'emails', 'tips', 'broadcast', 'bau', 'approvals'];
        for (const destino of ['tips', 'broadcast', 'links']) {
            await page.evaluate((d) => switchTab(d), destino);
            await page.waitForTimeout(120);
            const visiveis = [];
            for (const p of panes) {
                const el = page.locator('#pane-' + p);
                if (await el.count() && await el.isVisible()) visiveis.push(p);
            }
            igual(visiveis, [destino], `ao ir para "${destino}", painéis visíveis`);
        }
    });

    // O regime deixou de ser um parágrafo dentro do painel e passou a ser a
    // estrutura da navegação. O teste segue a mudança: o que precisa continuar
    // verdadeiro é que a pessoa consiga saber o regime SEM abrir o módulo.
    await check('o regime de publicação é dito pela navegação', async () => {
        const grupos = await page.evaluate(() => Array.from(
            document.querySelectorAll('.rail-group')).map((g) => {
                const t = g.querySelector('.rail-group-title');
                return {
                    titulo: t ? t.textContent.replace(/\s+/g, ' ').trim() : '',
                    destinos: Array.from(g.querySelectorAll('.rail-item')).map(b => b.dataset.tab),
                };
            }).filter(g => g.titulo));

        const catalogo = grupos.filter(g => /passa por revisão/i.test(g.titulo))[0];
        const operacao = grupos.filter(g => /vai ao ar na hora/i.test(g.titulo))[0];

        verdade(catalogo, 'faltou o grupo que diz que passa por revisão');
        verdade(operacao, 'faltou o grupo que diz que vai ao ar na hora');

        igual(operacao.destinos, ['broadcast', 'bau'], 'destinos que publicam direto');
        verdade(catalogo.destinos.indexOf('links') !== -1, 'links deveria estar no catálogo');
        verdade(catalogo.destinos.indexOf('broadcast') === -1,
            'um módulo de publicação direta não pode aparecer no catálogo');
    });

    await check('cada destino de publicação direta é marcado no trilho', async () => {
        const marcados = await page.evaluate(() => Array.from(
            document.querySelectorAll('.rail-item')).filter(b => b.querySelector('.ao-vivo'))
            .map(b => b.dataset.tab));
        igual(marcados, ['broadcast', 'bau'], 'itens marcados como ao vivo');
    });

    await page.close();
}

// -------------------------------------------------------------------- papéis
{
    const page = await abrir({ sessao: 'qa' });

    await check('QA: não enxerga a aba de Acessos', async () => {
        verdade(!(await page.locator('#tab-access').isVisible()), 'QA não gerencia acesso');
    });

    await check('QA: não recebe caminho de escrita em links', async () => {
        // A Central abre no "Hoje", então é preciso ir até o módulo para julgar
        // o que ele mostra.
        await page.evaluate(() => switchTab('links'));
        await page.waitForTimeout(150);

        verdade(!(await page.locator('#links-new-btn').isVisible()),
            'QA não propõe links — o botão não deveria aparecer');
        // isVisible(), e não textContent(): texto num elemento escondido passa
        // no teste e não chega em ninguém.
        verdade(await page.locator('#links-note').isVisible(),
            'a explicação precisa estar visível, não só presente no DOM');
        const nota = (await page.locator('#links-note').textContent()).toLowerCase();
        verdade(/não propõe/.test(nota), 'a tela precisa dizer por que não há botão');
    });

    await check('QA: recebe caminho de escrita no que propõe', async () => {
        await page.evaluate(() => switchTab('callscript'));
        await page.waitForTimeout(150);
        verdade(await page.locator('#cs-new-btn').isVisible(),
            'QA propõe call_script — o botão deveria aparecer');
    });

    await page.close();
}

{
    const page = await abrir({ sessao: 'wfm' });

    await check('WFM: publica disponibilidade, mas não aviso', async () => {
        await page.evaluate(() => switchTab('bau'));
        await page.waitForTimeout(150);
        verdade(await page.locator('#bau-editor').isVisible(),
            'WFM publica disponibilidade — o formulário deveria aparecer');

        await page.evaluate(() => switchTab('broadcast'));
        await page.waitForTimeout(150);
        verdade(!(await page.locator('#bc-new-btn').isVisible()),
            'WFM não publica aviso — o botão não deveria aparecer');
    });

    await page.close();
}

// ------------------------------------------------------- viagens ao servidor
{
    const page = await abrir({ sessao: 'admin' });

    await check('salvar uma proposta custa UMA chamada ao servidor', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; openLinkEditor(null); });
        await page.waitForTimeout(150);

        await page.fill('#lnk-name', 'Link novo');
        await page.fill('#lnk-url', 'https://go/novo');
        await page.click('#lnk-save');
        await page.waitForTimeout(400);

        // Lista explícita: filtrar por padrão pegaria também a releitura que
        // vem depois do sucesso, que é leitura e não custa escrita nenhuma.
        const ESCRITAS = ['saveContentDraft', 'submitContentDraft',
            'saveAndSubmitContentDraft', 'publishContentDirect'];
        const escritas = await page.evaluate((nomes) => window.__chamadas
            .filter(c => nomes.includes(c.metodo))
            .map(c => c.metodo), ESCRITAS);

        // O encadeamento antigo era saveContentDraft -> submitContentDraft.
        igual(escritas, ['saveAndSubmitContentDraft'], 'chamadas de escrita');
    });

    await page.close();
}

// --------------------------------------------------------- falha aparente
{
    const page = await abrir({ sessao: 'admin', falharRascunhosDe: 'links' });

    await check('falha ao ler rascunhos aparece na tela', async () => {
        const texto = (await page.locator('#links-list').textContent()).toLowerCase();
        verdade(/não foi possível carregar as propostas/.test(texto),
            'a falha precisa aparecer, não virar silêncio');
        verdade(/tentar de novo/.test(texto), 'precisa oferecer nova tentativa');
    });

    await check('a lista do que está no ar continua sendo desenhada', async () => {
        // Degradar é mostrar menos, não mostrar nada: o conteúdo publicado
        // carregou normalmente e não pode sumir junto com os rascunhos.
        const texto = await page.locator('#links-list').textContent();
        verdade(/Fila de tarefas/.test(texto), 'o item publicado deveria continuar na lista');
    });

    await page.close();
}

// ------------------------------------------------------------- trilho novo
{
    const page = await abrir({ sessao: 'admin' });

    await check('a Central abre no "Hoje", não numa lista de conteúdo', async () => {
        verdade(await page.locator('#pane-home').isVisible(), 'o painel Hoje deveria abrir primeiro');
        igual((await page.locator('#page-title').textContent()).trim(), 'Hoje', 'título');
    });

    await check('o destino atual é anunciado, não só pintado', async () => {
        await page.evaluate(() => switchTab('tips'));
        await page.waitForTimeout(150);
        const marcados = await page.evaluate(() => Array.from(
            document.querySelectorAll('.rail-item[aria-current="page"]')).map(b => b.dataset.tab));
        igual(marcados, ['tips'], 'itens com aria-current');
    });

    await check('o endereço acompanha o destino', async () => {
        await page.evaluate(() => switchTab('broadcast'));
        await page.waitForTimeout(150);
        igual(new URL(page.url()).hash, '#/broadcast', 'hash');
    });

    await check('um endereço colado abre direto no destino', async () => {
        const outra = await abrir({ sessao: 'admin', hash: '#/approvals' });
        verdade(await outra.locator('#pane-approvals').isVisible(), 'deveria abrir em Aprovações');
        verdade(!(await outra.locator('#pane-home').isVisible()), 'Hoje não deveria estar visível');
        await outra.close();
    });

    await check('endereço inválido cai no padrão em vez de tela vazia', async () => {
        const outra = await abrir({ sessao: 'admin', hash: '#/inventado' });
        verdade(await outra.locator('#pane-home').isVisible(), 'deveria cair no Hoje');
        await outra.close();
    });

    await check('as setas andam pelo trilho', async () => {
        await page.evaluate(() => document.getElementById('tab-home').focus());
        await page.keyboard.press('ArrowDown');
        const foco = await page.evaluate(() => document.activeElement.dataset.tab);
        igual(foco, 'links', 'destino focado depois de ArrowDown');
    });

    await check('o teclado pula o que está escondido', async () => {
        // Em ADMIN, Pessoas e Acessos aparecem; o que não pode acontecer é o
        // foco parar num item que a pessoa não enxerga.
        const alcancaveis = await page.evaluate(() => {
            const itens = Array.from(document.querySelectorAll('.rail-item'))
                .filter(b => !b.classList.contains('hidden'));
            return itens.every(b => b.offsetParent !== null);
        });
        igual(alcancaveis, true, 'todo item navegável está visível');
    });

    await check('o idioma é escolhido uma vez só', async () => {
        igual(await page.locator('#lang-global').count(), 1, 'seletores globais');
        igual(await page.locator('#cs-lang, #nt-lang, #em-lang').count(), 0,
            'seletores por painel que sobraram');
    });

    await page.close();
}

// --------------------------------------------------- fricção da publicação
{
    const page = await abrir({ sessao: 'admin' });

    await check('publicar um aviso pede confirmação e diz para quem', async () => {
        await page.evaluate(() => { switchTab('broadcast'); });
        await page.waitForTimeout(200);
        await page.evaluate(() => openBroadcastEditor(null));
        await page.waitForTimeout(150);

        await page.fill('#bc-title', 'Instabilidade no CRM');
        await page.fill('#bc-text', 'O Connect Cases está lento.');
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.click('#bc-save');
        await page.waitForTimeout(200);

        // Nada foi publicado ainda: o clique abriu a confirmação.
        const publicou = await page.evaluate(() => window.__chamadas
            .some(c => c.metodo === 'publishContentDirect'));
        igual(publicou, false, 'publicou sem confirmar');

        const texto = await page.locator('#pub-titulo').isVisible();
        verdade(texto, 'a confirmação deveria aparecer');

        const alcance = await page.evaluate(() =>
            document.querySelector('#pub-titulo').closest('.modal').textContent);
        verdade(/todos os agentes/.test(alcance), 'a confirmação precisa dizer o alcance');
    });

    await check('voltar preserva o que foi digitado', async () => {
        await page.click('#pub-nao');
        await page.waitForTimeout(150);
        igual(await page.inputValue('#bc-title'), 'Instabilidade no CRM', 'título preservado');
        igual(await page.inputValue('#bc-text'), 'O Connect Cases está lento.', 'texto preservado');
    });

    await check('confirmar publica de verdade', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.click('#bc-save');
        await page.waitForTimeout(150);
        await page.click('#pub-sim');
        await page.waitForTimeout(300);

        const publicou = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'publishContentDirect').length);
        igual(publicou, 1, 'chamadas de publicação');
    });

    await page.close();
}

// ------------------------------------------------------ histórico do item
{
    const page = await abrir({ sessao: 'admin' });
    await page.evaluate(() => switchTab('links'));
    await page.waitForTimeout(200);

    await check('todo item publicado oferece o histórico', async () => {
        verdade(await page.locator('button:has-text("Histórico")').first().isVisible(),
            'o botão de histórico deveria aparecer na linha do item');
    });

    await check('o histórico lista as versões, da mais nova para a mais antiga', async () => {
        await page.locator('button:has-text("Histórico")').first().click();
        await page.waitForTimeout(300);

        const versoes = await page.evaluate(() => Array.from(
            document.querySelectorAll('#hist-corpo .item-name')).map(e => e.textContent.trim()));
        igual(versoes.length, 2, 'versões listadas');
        verdade(/Versão 2/.test(versoes[0]), 'a mais nova vem primeiro');
        verdade(/no ar/.test(versoes[0]), 'a versão no ar é identificada');
        verdade(/Versão 1/.test(versoes[1]), 'a anterior vem depois');
    });

    await check('só a versão arquivada oferece voltar', async () => {
        const botoes = await page.locator('#hist-corpo button:has-text("Voltar para esta versão")').count();
        igual(botoes, 1, 'botões de reverter');
    });

    await check('reverter declara o alcance antes de acontecer', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#hist-corpo button:has-text("Voltar para esta versão")').click();
        await page.waitForTimeout(200);

        const reverteu = await page.evaluate(() => window.__chamadas
            .some(c => c.metodo === 'rollbackContentItem'));
        igual(reverteu, false, 'reverteu sem confirmar');
        verdade(await page.locator('#pub-titulo').isVisible(), 'a confirmação deveria aparecer');
    });

    await check('confirmar republica a versão escolhida', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.click('#pub-sim');
        await page.waitForTimeout(300);

        const chamadas = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'rollbackContentItem'));
        igual(chamadas.length, 1, 'chamadas de rollback');
        igual(chamadas[0].args[0], 'itm_0', 'reverteu para a versão arquivada, não para a que já está no ar');
    });

    await page.close();
}

{
    // Quem não aprova vê por onde o item passou, mas não republica: reverter
    // vai ao ar sem revisão, e isso é decisão de quem aprova.
    const page = await abrir({ sessao: 'wfm' });
    await page.evaluate(() => switchTab('links'));
    await page.waitForTimeout(200);

    await check('quem não aprova vê o histórico, mas não o botão de reverter', async () => {
        await page.locator('button:has-text("Histórico")').first().click();
        await page.waitForTimeout(300);

        const versoes = await page.locator('#hist-corpo .item-name').count();
        igual(versoes, 2, 'versões listadas');
        igual(await page.locator('#hist-corpo button:has-text("Voltar para esta versão")').count(), 0,
            'botões de reverter');
        verdade(/não republica/.test(await page.locator('#hist-corpo').textContent()),
            'a tela precisa dizer por que não há o botão');
    });

    await page.close();
}

// -------------------------------------------------------- rascunho de verdade
{
    const page = await abrir({ sessao: 'admin' });
    await page.evaluate(() => switchTab('links'));
    await page.waitForTimeout(200);

    await check('o editor oferece guardar E enviar, não só enviar', async () => {
        await page.evaluate(() => openLinkEditor(null));
        await page.waitForTimeout(200);
        verdade(await page.locator('#lnk-draft').isVisible(), 'faltou "Salvar rascunho"');
        verdade(await page.locator('#lnk-save').isVisible(), 'faltou "Enviar para revisão"');
        igual((await page.locator('#lnk-save').textContent()).trim(), 'Enviar para revisão',
            'rótulo do botão de enviar');
    });

    await check('guardar rascunho NÃO manda para a fila', async () => {
        await page.fill('#lnk-name', 'Link guardado');
        await page.fill('#lnk-url', 'https://go/guardado');
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.click('#lnk-draft');
        await page.waitForTimeout(300);

        // Lista explícita de ESCRITAS: filtrar por padrão pegaria também a
        // releitura de rascunhos, que é leitura. Mesmo tropeço de antes.
        const ESCRITAS = ['saveContentDraft', 'submitContentDraft', 'saveAndSubmitContentDraft'];
        const escritas = await page.evaluate((nomes) => window.__chamadas
            .filter(c => nomes.includes(c.metodo)).map(c => c.metodo), ESCRITAS);
        igual(escritas, ['saveContentDraft'], 'chamadas de escrita');
    });

    await check('a validação vale para os dois caminhos', async () => {
        // Guardar um rascunho inválido seria guardar algo que o servidor
        // recusaria na hora de enviar.
        await page.evaluate(() => openLinkEditor(null));
        await page.waitForTimeout(200);
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.click('#lnk-draft');
        await page.waitForTimeout(200);

        const escreveu = await page.evaluate(() => window.__chamadas
            .some(c => ['saveContentDraft', 'saveAndSubmitContentDraft'].includes(c.metodo)));
        igual(escreveu, false, 'guardou sem nome nem URL');
        await page.evaluate(() => closeModal());
    });

    await page.close();
}

{
    // Um rascunho meu, não enviado.
    const meu = {
        links: [{
            draftId: 'drf_meu', itemId: 'itm_1', module: 'links', key: 'tasks', lang: 'ALL',
            label: 'Fila de tarefas', value: '{}', status: 'draft',
            proposedBy: 'lucaste', lockedBy: 'lucaste', lockedAt: new Date().toISOString(),
        }],
    };
    const page = await abrir({ sessao: 'admin', draftsDe: meu });
    await page.evaluate(() => switchTab('links'));
    await page.waitForTimeout(300);

    await check('o item diz que existe um rascunho seu', async () => {
        const texto = await page.locator('#links-list').textContent();
        verdade(/rascunho seu/.test(texto), 'a linha precisa dizer que há rascunho seu');
    });

    await check('e oferece descartá-lo', async () => {
        verdade(await page.locator('button:has-text("Descartar rascunho")').isVisible(),
            'faltou o botão de descartar');
    });

    await check('descartar pede confirmação antes', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.click('button:has-text("Descartar rascunho")');
        await page.waitForTimeout(200);

        const descartou = await page.evaluate(() => window.__chamadas
            .some(c => c.metodo === 'discardContentDraft'));
        igual(descartou, false, 'descartou sem confirmar');
        verdade(await page.locator('#desc-titulo').isVisible(), 'faltou a confirmação');

        await page.click('#desc-go');
        await page.waitForTimeout(300);
        const chamadas = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'discardContentDraft'));
        igual(chamadas.length, 1, 'chamadas de descarte');
        igual(chamadas[0].args[0], 'drf_meu', 'descartou o rascunho certo');
    });

    await page.close();
}

{
    // Rascunho de OUTRA pessoa, com a trava ainda viva.
    const alheio = {
        links: [{
            draftId: 'drf_ana', itemId: 'itm_1', module: 'links', key: 'tasks', lang: 'ALL',
            label: 'Fila de tarefas', value: '{}', status: 'draft',
            proposedBy: 'anaflor', lockedBy: 'anaflor', lockedAt: new Date().toISOString(),
        }],
    };
    const page = await abrir({ sessao: 'admin', draftsDe: alheio });
    await page.evaluate(() => switchTab('links'));
    await page.waitForTimeout(300);

    await check('a tela diz QUEM está editando agora', async () => {
        const texto = await page.locator('#links-list').textContent();
        verdade(/anaflor está editando/.test(texto),
            'a trava precisa dizer de quem é, não só que existe');
    });

    await check('e não oferece descartar o rascunho de outra pessoa', async () => {
        igual(await page.locator('button:has-text("Descartar rascunho")').count(), 0,
            'botões de descarte');
    });

    await page.close();
}

{
    // A mesma trava, expirada: o servidor já não a respeita, e a tela não pode
    // anunciar uma trava que não existe mais.
    const velho = {
        links: [{
            draftId: 'drf_ana', itemId: 'itm_1', module: 'links', key: 'tasks', lang: 'ALL',
            label: 'Fila de tarefas', value: '{}', status: 'draft',
            proposedBy: 'anaflor', lockedBy: 'anaflor',
            lockedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        }],
    };
    const page = await abrir({ sessao: 'admin', draftsDe: velho });
    await page.evaluate(() => switchTab('links'));
    await page.waitForTimeout(300);

    await check('trava expirada não é anunciada', async () => {
        const texto = await page.locator('#links-list').textContent();
        igual(/está editando/.test(texto), false, 'anunciou trava vencida');
    });

    await page.close();
}

await browser.close();
await rm(ARQUIVO, { force: true });
console.log('\n' + (fail ? '✗' : '✓') + ` smoke da Central: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
