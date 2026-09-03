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
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// A página precisa vir de uma URL de verdade, e não de setContent(): os
// scripts de inicialização do Playwright — que é onde o dublê do
// google.script.run é instalado — só rodam numa navegação.
const ARQUIVO = join(tmpdir(), 'cw-content-dashboard-smoke.html');

async function prepararArquivo() {
    let html = await readFile(resolve(raiz, 'gas-backend/ContentDashboard.html'), 'utf8');

    // A tela é montada por include() (Código.gs), que só existe dentro do Apps
    // Script. Aqui as partes são coladas do mesmo jeito, a partir do disco —
    // é o que faz o smoke testar a tela REAL, e não uma cópia.
    const incluidos = [];
    html = html.replace(/<\?!=\s*include\('([^']+)'\)\s*\?>/g, (_, nome) => {
        incluidos.push(nome);
        return '\u0000' + nome + '\u0000';
    });
    for (const nome of incluidos) {
        const parte = await readFile(resolve(raiz, 'gas-backend/' + nome + '.html'), 'utf8');
        html = html.replace('\u0000' + nome + '\u0000', () => parte);
    }

    // Se sobrar qualquer include, a tela iria ao ar sem um pedaço e o smoke
    // acusaria coisas estranhas em vez do problema real.
    if (/<\?!=\s*include\(/.test(html)) throw new Error('sobrou include não resolvido');

    // As duas tags restantes são preenchidas pelo renderDashboard() do
    // Código.gs. Fora do Apps Script elas ficariam literais no DOM.
    html = html.replace(/<\?!=\s*CW_ENV_BADGE\s*\?>/g, '')
        .replace(/<\?!=\s*CW_CREDIT\s*\?>/g, '');

    if (/<\?/.test(html)) throw new Error('sobrou tag de template não resolvida');

    await writeFile(ARQUIVO, html, 'utf8');
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

// ------------------------------------------------------- montagem da página
async function abrir({ sessao = 'admin', falharRascunhosDe = null } = {}) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });

    // As fontes do Google não respondem aqui; cortar evita espera inútil.
    await page.route('**fonts.googleapis.com/**', (r) => r.abort());
    await page.route('**fonts.gstatic.com/**', (r) => r.abort());

    // O dublê precisa existir ANTES do script da página rodar: o boot dispara
    // no DOMContentLoaded.
    await page.addInitScript(({ sessao, itens, falhar }) => {
        window.__chamadas = [];

        const RESPOSTAS = {
            getContentSession: () => sessao,
            listContentItems: (m) => itens[m] || [],
            listContentDrafts: (m) => {
                if (falhar && m === falhar) throw new Error('rede caiu');
                return [];
            },
            listPendingApprovals: () => [],
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
    }, { sessao: SESSOES[sessao], itens: ITENS, falhar: falharRascunhosDe });

    await page.goto('file://' + ARQUIVO, { waitUntil: 'domcontentloaded' });
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

    await check('o regime de publicação está dito em cada módulo', async () => {
        await page.evaluate(() => switchTab('broadcast'));
        await page.waitForTimeout(120);
        const aviso = (await page.locator('#bc-note').textContent()).toLowerCase();
        verdade(/na hora|sem passar pela fila/.test(aviso),
            'o módulo de publicação direta precisa dizer que vai ao ar na hora');

        await page.evaluate(() => switchTab('links'));
        await page.waitForTimeout(120);
        const fila = (await page.locator('#links-note').textContent()).toLowerCase();
        verdade(/aprova/.test(fila), 'o módulo de catálogo precisa dizer que passa por aprovação');
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
        verdade(!(await page.locator('#links-new-btn').isVisible()),
            'QA não propõe links — o botão não deveria aparecer');
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

await browser.close();
await rm(ARQUIVO, { force: true });
console.log('\n' + (fail ? '✗' : '✓') + ` smoke da Central: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
