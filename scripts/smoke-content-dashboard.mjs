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
        canApprove: true, canManageAccess: true, canManageRoles: true,
        canViewAudit: true, canSelfApprove: true,
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

// A matriz como o servidor a devolve. Os eixos vêm de lá de propósito: a tela
// desenha as casas a partir de `actionsByModule`, em vez de repetir a regra de
// regime de cada módulo.
const ACOES = ['view', 'propose', 'approve', 'publish', 'rollback'];
const MODULOS_MATRIZ = ['links', 'call_script', 'note_template', 'email_template',
    'tips', 'broadcast', 'bau_availability', 'people'];
const DIRETOS = ['broadcast', 'bau_availability'];

const ACOES_POR_MODULO = MODULOS_MATRIZ.reduce((acc, m) => {
    acc[m] = DIRETOS.includes(m)
        ? ['view', 'publish', 'rollback']
        : ['view', 'propose', 'approve', 'rollback'];
    return acc;
}, {});

function permsDe(marcadas, global) {
    const modules = {};
    MODULOS_MATRIZ.forEach((m) => {
        modules[m] = {};
        ACOES.forEach((a) => { modules[m][a] = !!(marcadas[m] || []).includes(a); });
    });
    return { modules, global: Object.assign(
        { manageAccess: false, manageRoles: false, viewAudit: false, selfApprove: false },
        global || {}) };
}

const MATRIZ = {
    roles: [
        {
            role: 'ADMIN', people: 1, escalation: ['links'],
            permissions: permsDe(
                MODULOS_MATRIZ.reduce((a, m) => {
                    a[m] = ACOES_POR_MODULO[m];
                    return a;
                }, {}),
                { manageAccess: true, manageRoles: true, viewAudit: true, selfApprove: true }),
        },
        {
            role: 'QA', people: 3, escalation: [],
            permissions: permsDe({
                links: ['view'], call_script: ['view', 'propose'],
                note_template: ['view', 'propose'], email_template: ['view'],
                tips: ['view'], broadcast: ['view'], bau_availability: ['view'],
            }, {}),
        },
    ],
    modules: MODULOS_MATRIZ,
    moduleActions: ACOES,
    globalPerms: ['manageAccess', 'manageRoles', 'viewAudit', 'selfApprove'],
    actionsByModule: ACOES_POR_MODULO,
    approvalRequiresGlobal: { people: 'manageAccess' },
    fallback: false,
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
    // Três avisos que cobrem os três estados da janela: um vigente para sempre,
    // um agendado e um vencido. É o que faz a lista da Central ter o que dizer.
    broadcast: [
        {
            id: 'itm_bc1', module: 'broadcast', key: 'bc1', field: '', lang: 'ALL',
            label: 'Instabilidade no CRM', version: 1, status: 'live',
            publishedBy: 'lucaste', publishedAt: '2026-09-01T10:00:00Z', sortOrder: 0,
            lineage: 'itm_bc1',
            value: JSON.stringify({
                type: 'critical', title: 'Instabilidade no CRM', text: 'O CRM está lento.',
                publishedAt: '2026-09-01T10:00:00Z', author: 'lucaste',
            }),
        },
        {
            id: 'itm_bc2', module: 'broadcast', key: 'bc2', field: '', lang: 'ALL',
            label: 'Manutenção de segunda', version: 1, status: 'live',
            publishedBy: 'lucaste', publishedAt: '2026-09-01T10:00:00Z', sortOrder: 1,
            lineage: 'itm_bc2',
            value: JSON.stringify({
                type: 'info', title: 'Manutenção de segunda', text: 'Sistema fora das 2h às 4h.',
                startsAt: '2099-01-05T08:00', endsAt: '2099-01-05T12:00',
                publishedAt: '2026-09-01T10:00:00Z', author: 'lucaste',
            }),
        },
        {
            id: 'itm_bc3', module: 'broadcast', key: 'bc3', field: '', lang: 'ALL',
            label: 'Fila priorizada', version: 1, status: 'live',
            publishedBy: 'lucaste', publishedAt: '2026-09-01T10:00:00Z', sortOrder: 2,
            lineage: 'itm_bc3',
            value: JSON.stringify({
                type: 'success', title: 'Fila priorizada', text: 'Criação priorizada até quinta.',
                startsAt: '2020-01-01T08:00', endsAt: '2020-01-02T08:00',
                publishedAt: '2026-09-01T10:00:00Z', author: 'lucaste',
            }),
        },
    ],
    bau_availability: [], people: [],
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

// A barra lateral. Três linhas escolhidas de propósito: uma com justificativa
// (texto de gente, tem que aparecer), uma cujo detalhe é ID interno (não tem) e
// uma de publicação direta. As datas são relativas ao agora para o "há X min"
// ser exercitado de verdade.
const agoraMenos = (min) => new Date(Date.now() - min * 60000).toISOString();

const ATIVIDADE = [
    {
        id: 'log_3', at: agoraMenos(4), actor: 'lucaste', action: 'reject',
        module: 'email_template', key: 'boas_vindas', itemId: '',
        label: 'E-mail de boas-vindas', detail: 'Falta citar o CID.',
    },
    {
        id: 'log_2', at: agoraMenos(30), actor: 'anaflor', action: 'draft_submit',
        module: 'call_script', key: 'BAU', itemId: '',
        label: 'Passo de abertura', detail: 'drf_abc123',
    },
    {
        id: 'log_1', at: agoraMenos(180), actor: 'brunocs', action: 'publish_direct',
        module: 'broadcast', key: 'itm_9', itemId: 'itm_9',
        label: 'Instabilidade no CRM', detail: 'v1',
    },
];

// Cinco registros: o bastante para a paginação de duas em duas ter três levas,
// e com uma "agulha" para o filtro de texto ter o que achar.
const AUDITORIA = [
    { id: 'l5', at: agoraMenos(5), actor: 'lucaste', action: 'approve', module: 'links',
      key: 'tasks', itemId: 'itm_1', label: 'Fila de tarefas', detail: 'v3 por anaflor' },
    { id: 'l4', at: agoraMenos(60), actor: 'anaflor', action: 'reject', module: 'email_template',
      key: 'boas_vindas', itemId: '', label: 'E-mail de boas-vindas', detail: 'Falta citar o CID.' },
    { id: 'l3', at: agoraMenos(600), actor: 'brunocs', action: 'publish_direct', module: 'broadcast',
      key: 'bc1', itemId: 'itm_bc1', label: 'Instabilidade no CRM', detail: 'v1' },
    { id: 'l2', at: agoraMenos(2000), actor: 'lucaste', action: 'access_change', module: '',
      key: '', itemId: '', label: 'brunocs', detail: 'TL ativo' },
    { id: 'l1', at: agoraMenos(5000), actor: 'lucaste', action: 'role_update', module: '',
      key: '', itemId: '', label: 'QA', detail: 'links.propose: não → sim' },
];

// ------------------------------------------------------- montagem da página
async function abrir({ sessao = 'admin', falharRascunhosDe = null, hash = '', draftsDe = null,
    fila = [], atividade = [], matriz = MATRIZ, confirmarSalvar = null } = {}) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });

    // As fontes do Google não respondem aqui; cortar evita espera inútil.
    await page.route('**fonts.googleapis.com/**', (r) => r.abort());
    await page.route('**fonts.gstatic.com/**', (r) => r.abort());

    // O endpoint da foto corporativa também não responde daqui, e a imagem tem
    // `onerror` que troca o src pelo ícone genérico. Sem atender ao pedido, o
    // teste da foto olharia sempre para o fallback e nunca veria a URL montada.
    await page.route('**moma-teams-photos.corp.google.com/**', (r) => r.fulfill({
        status: 200,
        contentType: 'image/png',
        body: Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
            'base64'),
    }));

    // O dublê precisa existir ANTES do script da página rodar: o boot dispara
    // no DOMContentLoaded.
    await page.addInitScript(({ sessao, itens, falhar, historico, rascunhos, pendentes, atividade,
        matriz, respostaDoSalvar, auditoria }) => {
        const PENDENTES = pendentes || [];
        const ATIVIDADE = atividade || [];
        const AUDITORIA = auditoria || [];
        const HISTORICO = historico;
        window.__chamadas = [];

        const RESPOSTAS = {
            getContentSession: () => sessao,
            listContentItems: (m) => itens[m] || [],
            listContentDrafts: (m) => {
                if (falhar && m === falhar) throw new Error('rede caiu');
                return (rascunhos && rascunhos[m]) || [];
            },
            listPendingApprovals: () => PENDENTES,
            listContentActivity: () => ATIVIDADE,
            listContentRoles: () => matriz,
            listContentRoleNames: () => ['ADMIN', 'QA'],
            listContentAudit: (f) => {
                const filtro = f || {};
                const casa = (l) => (!filtro.actor || l.actor === filtro.actor) &&
                    (!filtro.action || l.action === filtro.action) &&
                    (!filtro.text || (l.label + ' ' + l.detail).toLowerCase()
                        .indexOf(filtro.text.toLowerCase()) !== -1);
                // O cursor é o índice de onde continuar: o mesmo contrato do
                // servidor, que pagina por posição e não por "pule N".
                const inicio = Number(filtro.cursor) || 0;
                const todas = AUDITORIA.filter(casa);
                const pagina = todas.slice(inicio, inicio + 2);
                const fim = inicio + pagina.length;
                return {
                    rows: pagina,
                    nextCursor: fim < todas.length ? fim : 0,
                    scanned: pagina.length,
                    done: fim >= todas.length,
                };
            },
            exportContentAudit: () => ({
                sheet: 'Content_Audit_Export', rows: 3, truncated: false, url: '',
            }),
            previewContentSession: (papel) => {
                // O servidor devolve a sessão do papel INTERSECTADA com a de
                // quem pergunta, mais o que ficou de fora.
                const base = papel === 'QA'
                    ? {
                        ldap: sessao.ldap, role: 'QA', hasAccess: true,
                        canApprove: false, canManageAccess: false, canManageRoles: false,
                        canViewAudit: false, canSelfApprove: false,
                        proposableModules: ['call_script', 'note_template'],
                    }
                    : Object.assign({}, sessao, { role: papel });
                return Object.assign(base, {
                    preview: true, realRole: sessao.role, beyond: ['links.propose'],
                });
            },
            saveContentRole: (nome, permsJson, opcoes) => {
                // O servidor devolve `confirm` até vir a declaração. O dublê
                // repete esse contrato para o teste poder exercitar o diálogo.
                if (respostaDoSalvar && !(opcoes || {})[respostaDoSalvar.flag]) {
                    return {
                        status: 'confirm',
                        reason: respostaDoSalvar.reason,
                        message: respostaDoSalvar.message,
                        changes: respostaDoSalvar.changes,
                        modules: respostaDoSalvar.modules || [],
                    };
                }
                return { status: 'success', role: nome, changes: [], reloadSession: false };
            },
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
    }, {
        sessao: SESSOES[sessao], itens: ITENS, falhar: falharRascunhosDe,
        historico: HISTORICO, rascunhos: draftsDe, pendentes: fila, atividade,
        matriz, respostaDoSalvar: confirmarSalvar, auditoria: AUDITORIA,
    });

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

// --------------------------------------------------- revisão: diff e prévia
{
    // O algoritmo é lógica pura: vale prová-lo direto, sem passar pela tela.
    const page = await abrir({ sessao: 'admin' });

    await check('o diff marca só o que mudou', async () => {
        const r = await page.evaluate(() => {
            const p = diffDePalavras('o gato subiu no telhado', 'o gato desceu no telhado');
            return p.map(x => [x.tipo, x.texto.trim()]).filter(x => x[1]);
        });
        igual(r, [['igual', 'o gato'], ['saiu', 'subiu'], ['entrou', 'desceu'], ['igual', 'no telhado']],
            'pedaços do diff');
    });

    await check('texto idêntico não produz marcação nenhuma', async () => {
        const tipos = await page.evaluate(() => {
            const p = diffDePalavras('mesma frase exata', 'mesma frase exata');
            return Array.from(new Set(p.map(x => x.tipo)));
        });
        igual(tipos, ['igual'], 'tipos encontrados');
    });

    await check('o diff remonta o texto dos dois lados sem perder nada', async () => {
        // A garantia que impede o realce de comer conteúdo: juntando os pedaços
        // de cada lado, tem que sair exatamente o texto original.
        const r = await page.evaluate(() => {
            const a = 'linha um\nlinha dois\nlinha três';
            const b = 'linha um\nlinha DOIS\nlinha três';
            const p = diffDePalavras(a, b);
            const antes = p.filter(x => x.tipo !== 'entrou').map(x => x.texto).join('');
            const depois = p.filter(x => x.tipo !== 'saiu').map(x => x.texto).join('');
            return { okAntes: antes === a, okDepois: depois === b };
        });
        igual(r, { okAntes: true, okDepois: true }, 'remontagem');
    });

    await check('texto gigante degrada para os dois lados inteiros, sem travar', async () => {
        const r = await page.evaluate(() => {
            const enorme = new Array(1200).fill('palavra').join(' ');
            return diffDePalavras(enorme, enorme + ' extra');
        });
        igual(r, null, 'devolveu diff em vez de recusar');
    });

    await page.close();
}

{
    const fila = [
        {
            draftId: 'drf_1', module: 'tips', key: 'geral', label: 'Dica revisada',
            proposedBy: 'anaflor', isSelfProposed: false, canReview: true,
            currentValue: 'Confira o substatus antes de fechar.',
            value: 'Confira o substatus antes de encerrar.',
        },
        {
            draftId: 'drf_2', module: 'email_template', key: 'boas_vindas', label: 'E-mail de boas-vindas',
            proposedBy: 'brunocs', isSelfProposed: false, canReview: true,
            currentValue: JSON.stringify({ subject: 'Olá', template: '<p>Antigo</p>' }),
            value: JSON.stringify({ subject: 'Olá!', template: '<p>Bem-vindo à <b>TechSol</b></p>' }),
        },
    ];
    const page = await abrir({ sessao: 'admin', fila });
    await page.evaluate(() => switchTab('approvals'));
    await page.waitForTimeout(400);

    await check('a fila realça a palavra trocada nos dois lados', async () => {
        const saiu = await page.locator('mark.dif-saiu').first().textContent();
        const entrou = await page.locator('mark.dif-entrou').first().textContent();
        igual(saiu.trim(), 'fechar.', 'palavra que saiu');
        igual(entrou.trim(), 'encerrar.', 'palavra que entrou');
    });

    await check('e diz que só o que mudou está marcado', async () => {
        verdade(/Só o que mudou está marcado/.test(await page.locator('#approvals-list').textContent()),
            'faltou a legenda do diff');
    });

    await check('quem aprova ganha a prévia do e-mail', async () => {
        verdade(await page.locator('.previa').first().isVisible(), 'faltou a prévia');
        verdade(/Ver como o anunciante recebe/.test(await page.locator('.previa').first().textContent()),
            'rótulo da prévia');
    });

    await check('a prévia roda isolada, sem script e sem mesma origem', async () => {
        // É HTML escrito por OUTRA pessoa numa tela que fala com o backend na
        // autoridade de quem revisa. O sandbox vazio é o que impede isso de ser
        // XSS armazenado entre usuários.
        await page.locator('.previa summary').first().click();
        await page.waitForTimeout(200);
        const frame = page.locator('iframe.previa-frame').first();
        igual(await frame.getAttribute('sandbox'), '', 'atributo sandbox');
        verdade(/TechSol/.test(await frame.getAttribute('srcdoc')), 'o conteúdo chegou ao iframe');
    });

    await check('o e-mail é comparado como conteúdo, não como JSON', async () => {
        // Sem isto o diff marcava aspas e chaves, e a mudança real sumia no meio
        // do objeto serializado.
        const texto = await page.locator('#approvals-list').textContent();
        verdade(/Assunto:/.test(texto), 'faltou o assunto legível');
        igual(/\{"subject"/.test(texto), false, 'o JSON cru vazou para a revisão');
    });

    await check('a prévia aparece só onde faz sentido', async () => {
        // Uma dica não é HTML: prévia ali seria enfeite.
        igual(await page.locator('.previa').count(), 1, 'prévias na fila');
    });

    await page.close();
}

// ------------------------------------------------------ atividade recente
{
    const page = await abrir({ sessao: 'admin', atividade: ATIVIDADE });

    await check('a barra de atividade abre junto com a tela', async () => {
        verdade(await page.locator('#lateral').isVisible(), 'a barra deveria estar visível');
        igual(await page.locator('.atividade-linha').count(), 3, 'linhas na barra');
    });

    await check('cada linha diz QUEM fez, com foto', async () => {
        const fotos = await page.locator('.atividade-linha img.atividade-foto').evaluateAll(
            (imgs) => imgs.map(i => i.getAttribute('src')));
        igual(fotos.length, 3, 'fotos');
        verdade(fotos[0].indexOf('lucaste') !== -1, 'a foto é a de quem fez a ação: ' + fotos[0]);
        // O endpoint da foto corporativa é chamado de dentro do iframe do Apps
        // Script — sem isto ele responde 403 e todo mundo vira ícone genérico.
        const primeira = page.locator('.atividade-linha img.atividade-foto').first();
        igual(await primeira.getAttribute('referrerpolicy'), 'no-referrer', 'referrerpolicy');
        // Quem não tem foto no diretório não vira imagem quebrada.
        verdade(await primeira.getAttribute('onerror'), 'faltou o fallback da foto');
    });

    await check('a ação aparece em português, não com o nome interno', async () => {
        const texto = await page.locator('#atividade-lista').textContent();
        verdade(/rejeitou/.test(texto), 'faltou o verbo em português');
        verdade(/E-mail de boas-vindas/.test(texto), 'faltou o alvo da ação');
        igual(/draft_submit|publish_direct/.test(texto), false,
            'o nome interno da ação vazou para a tela');
    });

    await check('a justificativa da rejeição aparece; o ID interno, não', async () => {
        const texto = await page.locator('#atividade-lista').textContent();
        // É a informação mais útil da linha: sem ela, "rejeitou" manda a pessoa
        // procurar o motivo em outro lugar.
        verdade(/Falta citar o CID/.test(texto), 'faltou a justificativa');
        igual(/drf_abc123/.test(texto), false, 'um ID interno virou ruído na barra');
    });

    await check('a barra pede a atividade UMA vez, não a cada troca de aba', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.evaluate(() => switchTab('tips'));
        await page.waitForTimeout(150);
        await page.evaluate(() => switchTab('links'));
        await page.waitForTimeout(150);

        const pedidos = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'listContentActivity').length);
        igual(pedidos, 0, 'trocar de aba não pode custar uma execução do Apps Script');
    });

    await check('fechar a barra devolve a largura e para de buscar', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#btn-lateral').click();
        await page.waitForTimeout(150);

        igual(await page.locator('#lateral').isVisible(), false, 'a barra deveria sumir');
        igual(await page.locator('#btn-lateral').getAttribute('aria-expanded'), 'false', 'aria-expanded');
        igual(await page.evaluate(() =>
            document.getElementById('shell').classList.contains('com-lateral')), false,
            'a terceira coluna deveria sair do grid');
        igual(await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'listContentActivity').length), 0,
            'barra fechada não pode custar execução');
    });

    await check('reabrir busca de novo — o que ela mostra é o de agora', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#btn-lateral').click();
        await page.waitForTimeout(150);

        verdade(await page.locator('#lateral').isVisible(), 'a barra deveria voltar');
        igual(await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'listContentActivity').length), 1, 'buscas ao reabrir');
    });

    await page.close();
}

{
    // Sessão sem papel: a barra é conteúdo, e conteúdo nenhum aparece antes de
    // saber quem é a pessoa.
    const page = await abrir({ sessao: 'semAcesso', atividade: ATIVIDADE });

    await check('sem papel: nem a barra nem o botão dela existem na tela', async () => {
        igual(await page.locator('#lateral').isVisible(), false, 'a barra não deveria aparecer');
        igual(await page.locator('#btn-lateral').isVisible(), false, 'o botão não deveria aparecer');
        igual(await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'listContentActivity').length), 0,
            'pediu atividade sem ter acesso');
    });

    await page.close();
}

// -------------------------------------------------------- matriz de papéis
{
    const page = await abrir({ sessao: 'qa' });

    await check('quem não gerencia papéis não vê a aba', async () => {
        igual(await page.locator('#tab-roles').isVisible(), false, 'aba Papéis para o QA');
    });

    await page.close();
}

{
    const page = await abrir({ sessao: 'admin', hash: '#/roles' });

    await check('a matriz desenha um módulo por linha e uma ação por coluna', async () => {
        verdade(await page.locator('#tab-roles').isVisible(), 'a aba deveria aparecer para o ADMIN');
        igual(await page.locator('.rol-matriz tbody tr').count(), 8, 'linhas (módulos)');
        igual(await page.locator('.rol-matriz thead th').count(), 6, 'colunas (módulo + 5 ações)');
    });

    await check('casa que não existe naquele regime é traço, não checkbox', async () => {
        // Não existe "aprovar um aviso": avisos não passam por fila nenhuma.
        // Um checkbox desligado ali prometeria uma operação que o módulo não tem.
        igual(await page.locator('#rol-cx-broadcast-approve').count(), 0,
            'aprovar aviso não pode ser um checkbox');
        igual(await page.locator('#rol-cx-broadcast-publish').count(), 1,
            'publicar aviso tem que ser um checkbox');
        igual(await page.locator('#rol-cx-links-publish').count(), 0,
            'não existe publicar direto no catálogo');
        verdade(await page.locator('.rol-na').count() >= 8, 'faltaram os traços das casas inexistentes');
    });

    await check('a matriz abre marcada com o que o papel já pode', async () => {
        igual(await page.locator('#rol-cx-links-propose').isChecked(), true);
        await page.selectOption('#rol-papel', 'QA');
        await page.waitForTimeout(150);
        igual(await page.locator('#rol-cx-links-propose').isChecked(), false, 'QA não propõe links');
        igual(await page.locator('#rol-cx-call_script-propose').isChecked(), true, 'QA propõe call script');
    });

    await check('o contador de alterações acompanha o clique', async () => {
        igual((await page.locator('#rol-mudancas').textContent()).trim(), 'Nada alterado.');
        await page.locator('#rol-cx-links-propose').check();
        await page.waitForTimeout(120);
        igual((await page.locator('#rol-mudancas').textContent()).trim(), '1 alteração');
    });

    await check('o aviso de publicação sem revisão aparece ANTES de salvar', async () => {
        // É a parte que o servidor sozinho não faz: dizer em voz alta o que
        // está prestes a acontecer.
        igual(await page.locator('#rol-escalada').isVisible(), false, 'ainda não é escalada');

        await page.locator('#rol-cx-links-approve').check();
        await page.locator('#rol-gl-selfApprove').check();
        await page.waitForTimeout(150);

        verdade(await page.locator('#rol-escalada').isVisible(), 'o aviso deveria aparecer');
        const texto = await page.locator('#rol-escalada').textContent();
        verdade(/sem revisão/i.test(texto), 'faltou dizer que publica sem revisão');
        verdade(/Links/.test(texto), 'faltou nomear o módulo afetado: ' + texto);
    });

    await check('o que vai para o servidor é o que está NA TELA', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#rol-salvar').click();
        await page.waitForTimeout(200);

        const chamada = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'saveContentRole')[0]);
        igual(chamada.args[0], 'QA', 'papel enviado');

        const perms = JSON.parse(chamada.args[1]);
        igual(perms.modules.links.propose, true, 'a marcação da tela chegou ao servidor');
        igual(perms.global.selfApprove, true);
        // A casa inexistente nem viaja: o payload não diz nada sobre "aprovar
        // aviso", em vez de dizer que é falso. Dizer que é falso seria afirmar
        // que a operação existe.
        igual('approve' in perms.modules.broadcast, false, 'a casa inexistente não deveria viajar');
        igual('publish' in perms.modules.broadcast, true, 'a casa que existe precisa viajar');
    });

    await page.close();
}

{
    // O servidor devolve `confirm` e NÃO grava. A tela precisa mostrar o que
    // muda — não o estado final — e só então reenviar com a declaração.
    const page = await abrir({
        sessao: 'admin', hash: '#/roles',
        confirmarSalvar: {
            reason: 'escalation', flag: 'confirmEscalation',
            message: 'Com isto, quem tem o papel QA publica sozinho em links.',
            changes: ['links.approve: não → sim'], modules: ['links'],
        },
    });

    await check('confirmação mostra o que MUDA, não o estado final', async () => {
        await page.locator('#rol-salvar').click();
        await page.waitForTimeout(250);

        const modal = page.locator('.modal-backdrop .modal');
        verdade(await modal.isVisible(), 'o diálogo deveria abrir');
        const texto = await modal.textContent();
        verdade(/publica sozinho/.test(texto), 'faltou a mensagem do servidor');
        verdade(/links\.approve: não → sim/.test(texto), 'faltou o diff: ' + texto);
    });

    await check('voltar não grava nada', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('.modal-actions .btn-ghost').click();
        await page.waitForTimeout(150);
        igual(await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'saveContentRole').length), 0, 'chamadas depois de voltar');
    });

    await check('confirmar reenvia COM a declaração', async () => {
        await page.locator('#rol-salvar').click();
        await page.waitForTimeout(250);
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#rol-cf-go').click();
        await page.waitForTimeout(250);

        const opcoes = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'saveContentRole')[0].args[2]);
        igual(opcoes.confirmEscalation, true, 'a declaração precisa acompanhar o reenvio');
    });

    await page.close();
}

{
    const page = await abrir({ sessao: 'admin', hash: '#/access' });

    await check('o seletor de papel vem do servidor, não do HTML', async () => {
        // Uma lista fixa aqui passaria a mentir no primeiro papel novo criado
        // pela aba Papéis.
        await page.waitForTimeout(250);
        const opcoes = await page.locator('#acc-role option').evaluateAll(
            (os) => os.map(o => o.value));
        igual(opcoes, ['ADMIN', 'QA'], 'papéis no seletor');
    });

    await page.close();
}

// ------------------------------------------------------------- ver como
{
    const page = await abrir({ sessao: 'qa' });

    await check('quem não gerencia papéis não tem "ver como"', async () => {
        igual(await page.locator('#btn-ver-como').isVisible(), false, 'botão para o QA');
    });

    await page.close();
}

{
    const fila = [{
        draftId: 'drf_9', module: 'tips', key: 'geral', label: 'Dica revisada',
        proposedBy: 'anaflor', isSelfProposed: false, canReview: true,
        currentValue: 'Confira o substatus antes de fechar.',
        value: 'Confira o substatus antes de encerrar.',
    }];
    const page = await abrir({ sessao: 'admin', fila });

    await check('o ADMIN tem "ver como", e ele abre a escolha de papel', async () => {
        verdade(await page.locator('#btn-ver-como').isVisible(), 'o botão deveria aparecer');
        await page.locator('#btn-ver-como').click();
        await page.waitForTimeout(250);
        verdade(await page.locator('#vc-papel').isVisible(), 'faltou o seletor de papel');
    });

    await check('entrar na prévia troca o papel mostrado e avisa em faixa', async () => {
        await page.selectOption('#vc-papel', 'QA');
        await page.locator('#vc-go').click();
        await page.waitForTimeout(400);

        verdade(await page.locator('#faixa-previa').isVisible(), 'a faixa deveria aparecer');
        igual((await page.locator('#user-role').textContent()).trim(), 'QA', 'selo de papel');

        const texto = await page.locator('#faixa-previa').textContent();
        verdade(/Somente leitura/i.test(texto), 'faltou dizer que é só leitura');
        // Prévia calada sobre o que omitiu faz concluir que o papel não pode
        // algo que ele pode.
        verdade(/não a tem|não aparecem/.test(texto),
            'faltou dizer o que ficou de fora: ' + texto);
    });

    await check('vendo como QA, os botões que o QA não tem somem', async () => {
        await page.evaluate(() => switchTab('links'));
        await page.waitForTimeout(250);
        igual(await page.locator('#links-new-btn').isVisible(), false, 'botão de novo link');
    });

    await check('e a fila de aprovação não oferece decidir', async () => {
        await page.evaluate(() => switchTab('approvals'));
        await page.waitForTimeout(300);
        const texto = await page.locator('#approvals-list').textContent();
        // O QA nem revisa: o painel explica isso em vez de mostrar a fila.
        verdade(/não revisa/i.test(texto), 'o painel deveria explicar que o papel não revisa');
        igual(await page.locator('#approvals-list .btn-success').count(), 0, 'botões de aprovar');
    });

    await check('nem mesmo vendo como um papel que revisa', async () => {
        // O caso que importa: prever um papel que APROVA. A fila aparece
        // inteira — é para isso que se está olhando —, mas decidir não. A
        // decisão sairia no nome de quem clicou, não no do papel previsto.
        await page.locator('#faixa-previa .btn').click();
        await page.waitForTimeout(300);
        await page.locator('#btn-ver-como').click();
        await page.waitForTimeout(250);
        await page.selectOption('#vc-papel', 'ADMIN');
        await page.locator('#vc-go').click();
        await page.waitForTimeout(400);

        await page.evaluate(() => switchTab('approvals'));
        await page.waitForTimeout(350);

        verdade(/Dica revisada/.test(await page.locator('#approvals-list').textContent()),
            'a fila deveria aparecer para um papel que revisa');
        igual(await page.locator('#approvals-list .btn-success').count(), 0,
            'aprovar não pode existir em prévia');
        igual(await page.locator('#approvals-list .btn-danger').count(), 0,
            'rejeitar não pode existir em prévia');
    });

    await check('e escrever também não, mesmo no papel que escreve tudo', async () => {
        // Este é o caso que a prévia como QA não pega: o papel previsto PODE
        // tudo, e é só o modo prévia que segura a mão.
        await page.evaluate(() => switchTab('links'));
        await page.waitForTimeout(300);
        igual(await page.locator('#links-new-btn').isVisible(), false,
            'novo link não pode aparecer em prévia');
        const lista = await page.locator('#links-list').textContent();
        igual(/Editar|Tirar do ar/.test(lista), false, 'nem Editar nem Tirar do ar');
        // Histórico continua: olhar o passado de um item é leitura, e é
        // justamente o tipo de coisa que se quer poder fazer numa conferência.
        verdade(/Histórico/.test(lista), 'Histórico deveria continuar disponível');
        // Editar permissão fingindo ser outra pessoa é como se perde a noção de
        // quem fez o quê.
        igual(await page.locator('#tab-roles').isVisible(), false, 'aba Papéis em prévia');
    });

    await check('sair da prévia devolve a tela de quem você é', async () => {
        await page.locator('#faixa-previa .btn').click();
        await page.waitForTimeout(400);

        igual(await page.locator('#faixa-previa').isVisible(), false, 'a faixa deveria sumir');
        igual((await page.locator('#user-role').textContent()).trim(), 'ADMIN');
        await page.evaluate(() => switchTab('links'));
        await page.waitForTimeout(250);
        verdade(await page.locator('#links-new-btn').isVisible(), 'o botão deveria voltar');
        verdade(await page.locator('#tab-roles').isVisible(), 'a aba Papéis deveria voltar');
    });

    await page.close();
}

// ---------------------------------------------- aviso com hora (janela)
{
    const page = await abrir({ sessao: 'admin', hash: '#/broadcast' });

    await check('a lista distingue vigente, agendado e vencido', async () => {
        await page.waitForTimeout(300);
        const texto = await page.locator('#bc-list').textContent();
        // Sem os selos, um aviso agendado pareceria estar no ar e um vencido
        // pareceria vigente: a lista deixaria de responder "o que o agente vê".
        verdade(/agendado para/.test(texto), 'faltou o selo do agendado: ' + texto.slice(0, 200));
        verdade(/saiu do ar em/.test(texto), 'faltou o selo do vencido');
    });

    await check('o editor oferece começar e sair de cena', async () => {
        await page.evaluate(() => openBroadcastEditor(null));
        await page.waitForTimeout(250);
        igual(await page.locator('#bc-inicio').getAttribute('type'), 'datetime-local');
        igual(await page.locator('#bc-fim').getAttribute('type'), 'datetime-local');
        // Um relógio só, declarado: a operação atende fusos diferentes.
        verdade(/Brasília/.test(await page.locator('.modal').textContent()),
            'faltou dizer de que relógio se está falando');
    });

    await check('o editor traz a janela que o aviso já tem', async () => {
        await page.evaluate(() => openBroadcastEditor('itm_bc2'));
        await page.waitForTimeout(250);
        igual(await page.locator('#bc-inicio').inputValue(), '2099-01-05T08:00');
        igual(await page.locator('#bc-fim').inputValue(), '2099-01-05T12:00');
    });

    await check('a confirmação declara o QUANDO, não só o alcance', async () => {
        await page.evaluate(() => openBroadcastEditor(null));
        await page.waitForTimeout(250);
        await page.fill('#bc-title', 'Manutenção');
        await page.fill('#bc-text', 'Sistema fora do ar.');
        await page.fill('#bc-inicio', '2099-03-01T08:00');
        await page.locator('#bc-save').click();
        await page.waitForTimeout(300);

        const texto = await page.locator('#pub-titulo').locator('..').textContent();
        // "Vai ao ar agora" e "vai ao ar em março" são publicações diferentes:
        // uma confirmação que só declara o alcance afirma o que pode não ocorrer.
        verdade(/Só aparece a partir de/.test(texto),
            'a confirmação deveria dizer quando: ' + texto.slice(0, 200));
    });

    await check('a janela viaja no valor publicado', async () => {
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#pub-sim').click();
        await page.waitForTimeout(400);

        const chamada = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'publishContentDirect')[0]);
        const valor = JSON.parse(chamada.args[0].value);
        igual(valor.startsAt, '2099-03-01T08:00');
        igual(valor.endsAt, '', 'sem fim é "não expira", e vai vazio mesmo');
    });

    await check('janela invertida é barrada antes de sair da tela', async () => {
        await page.evaluate(() => openBroadcastEditor(null));
        await page.waitForTimeout(250);
        await page.fill('#bc-title', 'Errado');
        await page.fill('#bc-text', 'Texto.');
        await page.fill('#bc-inicio', '2099-03-02T08:00');
        await page.fill('#bc-fim', '2099-03-01T08:00');
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#bc-save').click();
        await page.waitForTimeout(300);

        igual(await page.locator('#pub-titulo').count(), 0, 'nem deveria chegar à confirmação');
        verdade(/depois do início/.test(await page.locator('#toast').textContent()),
            'faltou explicar por quê');
    });

    await page.close();
}

// ------------------------------------------------------------- auditoria
{
    const page = await abrir({ sessao: 'qa' });

    await check('quem não vê a auditoria não tem a aba', async () => {
        igual(await page.locator('#tab-audit').isVisible(), false, 'aba Auditoria para o QA');
    });

    await page.close();
}

{
    const page = await abrir({ sessao: 'admin', hash: '#/audit' });

    await check('a auditoria abre já com os registros mais recentes', async () => {
        await page.waitForTimeout(400);
        verdade(await page.locator('#tab-audit').isVisible(), 'a aba deveria aparecer');
        igual(await page.locator('.aud-tabela tbody tr').count(), 2, 'linhas da primeira leva');
        const texto = await page.locator('#aud-lista').textContent();
        verdade(/aprovou/.test(texto), 'a ação precisa aparecer em português');
        verdade(/Fila de tarefas/.test(texto), 'faltou o alvo da ação');
    });

    await check('"carregar mais" continua de onde parou, sem repetir', async () => {
        await page.locator('#aud-mais').click();
        await page.waitForTimeout(350);
        igual(await page.locator('.aud-tabela tbody tr').count(), 4, 'linhas depois da 2ª leva');

        const ids = await page.evaluate(() => AUD_LINHAS.map(l => l.id));
        igual(ids.length, new Set(ids).size, 'nenhum registro repetido');
    });

    await check('chegando ao fim, o botão some e a tela diz que acabou', async () => {
        await page.locator('#aud-mais').click();
        await page.waitForTimeout(350);
        igual(await page.locator('#aud-mais').isVisible(), false, 'botão de carregar mais');
        verdade(/fim do histórico/.test(await page.locator('#aud-resumo').textContent()),
            'faltou dizer que acabou');
    });

    await check('filtrar por quem fez recomeça a busca, não soma', async () => {
        await page.fill('#aud-quem', 'anaflor');
        await page.locator('#aud-buscar').click();
        await page.waitForTimeout(350);

        const linhas = await page.evaluate(() => AUD_LINHAS.map(l => l.actor));
        igual(linhas, ['anaflor'], 'só o que casa com o filtro');
    });

    await check('filtro sem resultado explica em vez de mostrar tabela vazia', async () => {
        await page.fill('#aud-quem', 'ninguem');
        await page.locator('#aud-buscar').click();
        await page.waitForTimeout(350);
        verdade(/Nada com esses filtros/.test(await page.locator('#aud-lista').textContent()),
            'faltou o estado vazio');
        igual(await page.locator('#aud-mais').isVisible(), false, 'nem carregar mais');
    });

    await check('limpar devolve o histórico inteiro', async () => {
        await page.locator('#aud-limpar').click();
        await page.waitForTimeout(350);
        igual(await page.locator('#aud-tabela').count() >= 0, true);
        igual(await page.evaluate(() => AUD_LINHAS.length), 2, 'volta à primeira leva');
        igual(await page.inputValue('#aud-quem'), '', 'o campo também limpa');
    });

    await check('exportar leva o MESMO filtro da tela', async () => {
        await page.fill('#aud-texto', 'CID');
        await page.evaluate(() => { window.__chamadas.length = 0; });
        await page.locator('#aud-exportar').click();
        await page.waitForTimeout(400);

        const chamada = await page.evaluate(() => window.__chamadas
            .filter(c => c.metodo === 'exportContentAudit')[0]);
        igual(chamada.args[0].text, 'CID', 'o filtro precisa acompanhar a exportação');
        verdade(/Content_Audit_Export/.test(await page.locator('#toast').textContent()),
            'faltou dizer onde a exportação foi parar');
    });

    await page.close();
}

await browser.close();
await rm(ARQUIVO, { force: true });
console.log('\n' + (fail ? '✗' : '✓') + ` smoke da Central: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
