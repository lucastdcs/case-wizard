// scripts/smoke-links.mjs
//
// Smoke da home do módulo de Links no navegador de verdade (ADR-0019).
//
// Existe porque o que mudou não aparece num teste de unidade: a tela é uma
// closure que monta DOM, reage a mouse e teclado e guarda estado em
// localStorage. As regras abaixo custam caro se quebrarem em produção e são
// invisíveis numa revisão de código:
//
//   - o painel de prévia nunca fica vazio e acompanha o mouse E o teclado;
//   - favoritar grava o ID da linhagem (não uma cópia) e respeita o teto;
//   - abrir um link o põe nos recentes, e o histórico antigo é migrado;
//   - uma categoria criada pela Central aparece, e um link em categoria
//     desconhecida NÃO some;
//   - destaque cujo link saiu do ar não aparece quebrado;
//   - texto vindo da Central nunca vira HTML;
//   - com a Central fora do ar, o fallback embutido sobe e NENHUM favorito é
//     apagado por causa da falha de rede.
//
// Uso: npm run smoke:links   (CW_CHROMIUM=/caminho/do/chromium se necessário)

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// Entrada sintética: monta só o módulo de Links e troca a camada de rede por um
// stub controlável. É a fronteira certa — o que se prova é a tela, não o JSONP.
const bundle = await build({
    stdin: {
        contents: `
            import { initGlobalStylesAndFont } from "./src/modules/shared/utils.js";
            import { initLinksAssistant } from "./src/modules/links/links-assistant.js";
            import { DataService } from "./src/modules/shared/data-service.js";
            import { setLanguage } from "./src/modules/shared/i18n.js";

            initGlobalStylesAndFont();

            window.__cw = {
                boot: (cfg) => {
                    setLanguage(cfg.lang || 'pt');

                    const btn = document.createElement('div');
                    btn.id = 'cw-btn-links';
                    document.body.appendChild(btn);

                    // Cache = o que o app já tinha da última vez; módulos = o que
                    // a rede devolve agora (null = fora do ar).
                    DataService.getCachedContent = (m) => (cfg.cache || {})[m] ?? null;
                    DataService.fetchContentModule = async (m) => {
                        if (cfg.offline) throw new Error('offline');
                        return (cfg.modulos || {})[m] ?? null;
                    };

                    window.__cw.toggle = initLinksAssistant();
                    window.__cw.setLanguage = setLanguage;
                },
            };
        `,
        resolveDir: raiz,
        loader: 'js',
    },
    bundle: true,
    write: false,
    logLevel: 'silent',
});
const script = bundle.outputFiles[0].text;

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque}: esperado ${b}, veio ${a}`);
}
function verdade(cond, oque) { if (!cond) throw new Error(oque); }

// ------------------------------------------------------------------ fixtures
const link = (n, cat, over = {}) => ({
    id: 'itm_' + n, lineage: 'lin_' + n, module: 'links', key: cat, status: 'live', sortOrder: 0,
    value: JSON.stringify(Object.assign({ name: 'Link ' + n, url: 'https://go/' + n, desc: 'Descrição ' + n, desc_en: 'Description ' + n }, over)),
});
const highlight = (id, linkN, state, over = {}) => ({
    id, key: id, module: 'link_highlights', state, status: 'live', lineage: id,
    value: JSON.stringify(Object.assign({
        linkLineage: 'lin_' + linkN, headline: 'Destaque ' + id, blurb: 'Resumo ' + id,
        position: 'secondary', startsAt: '2026-10-20T08:00', endsAt: '2026-10-31T18:00',
    }, over)),
});
const categoria = (key, over = {}) => ({
    id: 'cat_' + key, key, module: 'link_categories', status: 'live', lineage: 'cat_' + key,
    value: JSON.stringify(Object.assign({ label: 'Treinamento', label_en: 'Training', color: 'teal', icon: 'school' }, over)),
});

const LINKS = [
    link(1, 'tasks', { name: 'Escalação Sellers', desc: 'Form Escalação', about: 'Formulário único para escalar.', when: 'Seller sem retorno em 48h.' }),
    link(2, 'ads', { name: '[SOP] Troubleshooting', desc: 'Resolução problemas', about: 'Diagnóstico de conversões.' }),
    link(3, 'feedback', { name: 'Elogios', desc: 'Feedback positivo' }),
    link(4, 'treinamento', { name: 'Curso de onboarding', desc: 'Para quem entrou agora' }),
    link(5, 'chave_orfa', { name: 'Link sem categoria definida', desc: 'Ninguém definiu a chave' }),
    link(6, 'tech', { name: 'RegExr', desc: 'Testador Regex' }),
];
const MODULOS = {
    links: LINKS,
    link_categories: [categoria('treinamento')],
    link_highlights: [
        highlight('h1', 1, 'active', { position: 'main', headline: 'Novo formulário de escalação', headline_en: 'New escalation form' }),
        highlight('h2', 2, 'active'),
        highlight('h3', 6, 'ended', { endsAt: '2026-10-20T18:00' }),
        highlight('h4', 99, 'active', { headline: 'Link que saiu do ar' }),
    ],
};

const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });

async function novaPagina(config, storage = {}, viewport = { width: 1280, height: 900 }) {
    const page = await browser.newPage({ viewport });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate((s) => { Object.keys(s).forEach((k) => localStorage.setItem(k, s[k])); }, storage);
    await page.addScriptTag({ content: script });
    await page.evaluate((c) => window.__cw.boot(c), config);
    await page.evaluate(() => window.__cw.toggle());
    await page.waitForSelector('#links-popup .cw-links-body', { state: 'attached' });
    await page.waitForTimeout(500);
    // Abrir um link navegaria para fora: o clique é cancelado depois que o
    // módulo já viu o evento (o handler dele está no elemento, este no document).
    await page.evaluate(() => document.addEventListener('click', (e) => { if (e.target.closest('a[href]')) e.preventDefault(); }));
    return page;
}

const prefs = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('cw_user_prefs_v1') || '{}'));
const paneTitle = (page) => page.evaluate(() => document.querySelector('.cw-links-pane-title')?.textContent || '');
const rowNames = (page) => page.evaluate(() => [...document.querySelectorAll('.cw-links-row-name')].map((e) => e.textContent));
const sidebarLabels = (page) => page.evaluate(() => [...document.querySelectorAll('.cw-links-nav-btn')].map((b) => b.getAttribute('aria-label')));

console.log('\n--- Smoke: home de Links (destaques, painel de prévia, favoritos) ---');

// ------------------------------------------------ destaques e painel
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS });

    await check('a home mostra o destaque principal, os secundários e o painel já preenchido', async () => {
        const hero = await page.locator('.cw-links-hero .cw-links-hero-title').textContent();
        igual(hero, 'Novo formulário de escalação', 'herói');
        igual(await page.locator('.cw-links-mini').count(), 1, 'secundários (o destaque cujo link saiu do ar não conta)');
        igual(await paneTitle(page), 'Escalação Sellers', 'o painel nunca nasce vazio');
        const corpo = await page.locator('.cw-links-pane').textContent();
        verdade(corpo.includes('Formulário único para escalar.') && corpo.includes('Seller sem retorno em 48h.'), 'o painel traz o que é e quando usar');
    });

    await check('destaque cujo link saiu do ar não aparece quebrado', async () => {
        const todos = await page.locator('.cw-links-hero, .cw-links-mini').allTextContents();
        verdade(!todos.some((t) => t.includes('Link que saiu do ar')), 'apareceu o destaque órfão');
    });

    await check('o mouse sobre um destaque troca o painel; sair do card NÃO esvazia o painel', async () => {
        await page.locator('.cw-links-mini').hover();
        igual(await paneTitle(page), '[SOP] Troubleshooting');
        await page.mouse.move(5, 5);
        await page.waitForTimeout(200);
        igual(await paneTitle(page), '[SOP] Troubleshooting', 'continua no último link');
    });

    await check('o foco por teclado faz o mesmo que o mouse', async () => {
        await page.locator('.cw-links-hero').focus();
        igual(await paneTitle(page), 'Escalação Sellers');
    });

    await check('sem prévia escrita, o painel mostra a descrição em vez de buracos', async () => {
        await page.locator('.cw-links-seg button').nth(2).click();
        await page.locator('.cw-links-row').first().hover();
        const t = await page.locator('.cw-links-pane').textContent();
        verdade(t.includes('Testador Regex'), 'faltou a descrição: ' + t);
        verdade(!t.includes('O que é'), 'não pode haver bloco vazio');
    });

    await check('"Saíram do destaque" mostra a data de saída, e o link que voltou ao ar não repete', async () => {
        const meta = await page.locator('.cw-links-row-meta').allTextContents();
        igual(meta, ['saiu em 20/10']);
    });

    await check('a janela cabe na tela e não passa de 860px', async () => {
        const w = await page.evaluate(() => document.querySelector('#links-popup').getBoundingClientRect().width);
        verdade(w <= 860 && w >= 840, 'largura ' + w);
    });

    await page.close();
}

// ------------------------------------------------ favoritos
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS });

    await check('favoritar grava o ID da linhagem — não uma cópia do link', async () => {
        // A biblioteca é o caminho pela barra lateral; de lá, a estrela da linha.
        await page.locator('#cw-sidebar-btn-tech').click();
        await page.locator('.cw-links-row[data-link-id="lin_6"]').hover();
        await page.locator('.cw-links-row[data-link-id="lin_6"] button.star').click();
        igual((await prefs(page)).links_fav, ['lin_6']);
    });

    await check('a estrela reflete o estado e é acessível (aria-pressed e rótulo)', async () => {
        const b = page.locator('.cw-links-row[data-link-id="lin_6"] button.star');
        igual(await b.getAttribute('aria-pressed'), 'true');
        igual(await b.getAttribute('aria-label'), 'Remover dos favoritos');
    });

    await check('desfavoritar tira da lista', async () => {
        await page.locator('.cw-links-row[data-link-id="lin_6"] button.star').click();
        igual((await prefs(page)).links_fav, []);
    });

    await check('sem favoritos, a aba vazia explica e leva à biblioteca', async () => {
        await page.evaluate(() => document.querySelector('#cw-sidebar-btn-home').click());
        await page.locator('.cw-links-seg button').nth(0).click();
        verdade((await page.locator('#links-popup').textContent()).includes('Nenhum favorito ainda'), 'texto do estado vazio');
        await page.getByRole('button', { name: /Ver todos os links/ }).click();
        verdade(await page.locator('.cw-links-cathead').count() > 3, 'abriu a biblioteca');
    });

    await check('o teto de favoritos recusa o novo e não apaga nenhum', async () => {
        const trinta = Array.from({ length: 30 }, (_, i) => 'lin_fav_' + i);
        await page.evaluate((l) => localStorage.setItem('cw_user_prefs_v1', JSON.stringify({ links_fav: l })), trinta);
        await page.evaluate(() => window.__cw.toggle());
        await page.evaluate(() => window.__cw.toggle());
        await page.waitForTimeout(400);
        await page.locator('#cw-sidebar-btn-tasks').click();
        await page.locator('.cw-links-row[data-link-id="lin_1"]').hover();
        await page.locator('.cw-links-row[data-link-id="lin_1"] button.star').click();
        const f = (await prefs(page)).links_fav;
        igual(f.length, 30, 'tamanho');
        verdade(!f.includes('lin_1'), 'entrou o 31º');
    });

    await page.close();
}

// ------------------------------------------------ recentes e histórico antigo
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS });

    await check('abrir um link o põe nos recentes (a nuvem recebe depois, em um lote só)', async () => {
        await page.locator('.cw-links-hero').click();
        await page.waitForTimeout(4600);
        const r = (await prefs(page)).links_recent;
        igual(r.map((x) => x.id), ['lin_1']);
    });

    await check('o clique do meio também conta', async () => {
        await page.locator('.cw-links-mini').click({ button: 'middle' });
        await page.waitForTimeout(4600);
        igual((await prefs(page)).links_recent.map((x) => x.id), ['lin_2', 'lin_1']);
    });

    await check('a aba Recentes lista o que foi aberto, do mais novo para o mais antigo', async () => {
        await page.locator('.cw-links-seg button').nth(1).click();
        igual(await rowNames(page), ['[SOP] Troubleshooting', 'Escalação Sellers']);
    });

    await page.close();
}

{
    const legado = JSON.stringify([
        { name: 'RegExr', url: 'https://go/6', _originalCat: 'tech' },
        { name: 'Sumiu', url: 'https://go/removido' },
        { name: 'Elogios', url: 'https://go/3', _originalCat: 'qa' },
    ]);
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS }, { cw_link_history_v4: legado });
    await page.waitForTimeout(600);

    await check('o histórico antigo (cópias com URL) vira recentes por ID, e a chave velha some', async () => {
        igual((await prefs(page)).links_recent.map((x) => x.id), ['lin_6', 'lin_3']);
        igual(await page.evaluate(() => localStorage.getItem('cw_link_history_v4')), null);
    });

    await page.close();
}

// ------------------------------------------------ categorias
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS });

    await check('categoria criada pela Central entra depois das embutidas, com o nome dela', async () => {
        const rotulos = await sidebarLabels(page);
        verdade(rotulos.indexOf('Treinamento') > rotulos.indexOf('Feedback'), JSON.stringify(rotulos));
    });

    await check('"Feedback" é categoria do sistema e o Elogios mora nela', async () => {
        const rotulos = await sidebarLabels(page);
        verdade(rotulos.includes('Feedback'), JSON.stringify(rotulos));
        await page.locator('#cw-sidebar-btn-feedback').click();
        const cab = await page.locator('#cat-anchor-feedback').textContent();
        igual(cab, 'Feedback');
    });

    await check('link em categoria sem definição NÃO some — aparece sob o nome da chave', async () => {
        await page.locator('#cw-sidebar-btn-home').click();
        await page.getByRole('button', { name: /Ver todos os links/ }).click().catch(() => {});
        await page.locator('.cw-links-search-input').fill('sem categoria');
        igual(await rowNames(page), ['Link sem categoria definida']);
        igual(await page.locator('.cw-links-cathead').textContent(), 'chave_orfa');
    });

    await page.close();
}

// ------------------------------------------------ busca
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS });

    await check('a busca ignora acento: "escalacao" acha "Escalação Sellers", com o trecho realçado', async () => {
        await page.locator('.cw-links-search-input').fill('escalacao');
        igual(await rowNames(page), ['Escalação Sellers']);
        igual(await page.locator('.cw-links-row-name mark').textContent(), 'Escalação');
    });

    await check('a busca olha a prévia, não só o nome', async () => {
        await page.locator('.cw-links-search-input').fill('diagnostico');
        igual(await rowNames(page), ['[SOP] Troubleshooting']);
    });

    await check('sem resultado: estado vazio, e o painel esvazia em vez de mostrar outro link', async () => {
        await page.locator('.cw-links-search-input').fill('xyzxyz');
        igual(await rowNames(page), []);
        igual(await page.locator('.cw-links-pane').count(), 0, 'painel');
        verdade((await page.locator('#links-popup').textContent()).includes('Nenhum link bate com "xyzxyz"'), 'mensagem');
    });

    await check('apagar a busca volta ao que estava na tela', async () => {
        await page.locator('.cw-links-search-input').fill('');
        verdade(await page.locator('.cw-links-hero').count() === 1, 'voltou a home');
    });

    await page.close();
}

// ------------------------------------------------ idioma
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS, lang: 'en' });

    await check('em inglês: título do módulo, abas, destaque e descrição seguem o idioma da interface', async () => {
        verdade((await page.locator('#links-popup').textContent()).includes('Links Central'), 'cabeçalho');
        const abas = await page.locator('.cw-links-seg button').allTextContents();
        igual(abas, ['Favorites', 'Recent', 'No longer featured']);
        igual(await page.locator('.cw-links-hero-title').textContent(), 'New escalation form');
        igual(await page.locator('.cw-links-mini-title').textContent(), 'Destaque h2', 'sem tradução, cai no português');
    });

    await check('em inglês, a categoria criada usa o nome em inglês', async () => {
        verdade((await sidebarLabels(page)).includes('Training'), JSON.stringify(await sidebarLabels(page)));
    });

    await check('trocar o idioma com o módulo aberto refaz a tela', async () => {
        await page.evaluate(() => window.__cw.setLanguage('es'));
        await page.waitForTimeout(300);
        const abas = await page.locator('.cw-links-seg button').allTextContents();
        igual(abas, ['Favoritos', 'Recientes', 'Salieron de destacados']);
    });

    await page.close();
}

// ------------------------------------------------ texto da Central nunca vira HTML
{
    {
        const veneno = '<img src=x onerror="window.__xss=1">';
        const modulos = {
            links: [link(1, 'tasks', { name: veneno, desc: veneno, about: veneno, when: veneno })],
            link_categories: [categoria('treinamento', { label: 'T<b>x</b>' })],
            link_highlights: [highlight('h1', 1, 'active', { headline: veneno, blurb: veneno })],
        };
        const page = await novaPagina({ modulos, cache: modulos });

        await check('nome, descrição, prévia, título e categoria com HTML aparecem como TEXTO', async () => {
            await page.locator('.cw-links-hero').hover();
            await page.waitForTimeout(300);
            igual(await page.evaluate(() => window.__xss), undefined, 'executou script');
            igual(await page.locator('#links-popup img').count(), 0, 'nasceu um <img>');
            verdade((await page.locator('.cw-links-hero-title').textContent()).includes('<img'), 'o texto literal deveria estar visível');
        });

        await page.close();
    }
}

// ------------------------------------------------ Central fora do ar
{
    const page = await novaPagina(
        { modulos: {}, cache: {}, offline: true },
        { cw_user_prefs_v1: JSON.stringify({ links_fav: ['u:https://go/link-so-da-central', 'lin_x'] }) },
    );

    await check('sem Central nem cache, o LINKS_DB embutido sobe — inclusive a categoria Feedback', async () => {
        const rotulos = await sidebarLabels(page);
        verdade(rotulos.includes('Feedback') && rotulos.includes('Tarefas'), JSON.stringify(rotulos));
        await page.locator('#cw-sidebar-btn-feedback').click();
        verdade((await rowNames(page)).includes('Elogios'), 'o Elogios deveria estar em Feedback');
    });

    await check('a falha de rede NÃO apaga favorito: o catálogo embutido pode só não ter o link', async () => {
        await page.waitForTimeout(600);
        igual((await prefs(page)).links_fav, ['u:https://go/link-so-da-central', 'lin_x']);
    });

    await page.close();
}

// ------------------------------------------------ janela estreita
{
    const page = await novaPagina({ modulos: MODULOS, cache: MODULOS }, {}, { width: 1024, height: 768 });

    await check('em tela de 1024px a janela não encosta na pílula (largura limitada)', async () => {
        const r = await page.evaluate(() => document.querySelector('#links-popup').getBoundingClientRect());
        verdade(r.width <= 1024 - 192 + 1, 'largura ' + r.width);
        verdade(r.right <= 1024 - 96, 'borda direita em ' + r.right);
    });

    await page.close();
}

await browser.close();
console.log('\n' + (fail ? '✗ ' + fail + ' falharam' : '✓ tudo certo') + '\n');
process.exit(fail ? 1 : 0);
