// scripts/smoke-wizards.mjs
//
// Smoke dos dois wizards de slides - o Onboarding (primeira vez que alguém
// abre o app) e o Changelog (quando o APP_VERSION muda) - no navegador de
// verdade. Os dois compartilham shared/wizard-shell.js, então este teste
// cobre a casca uma vez e o conteúdo de cada um em cima dela.
//
// Existe porque tudo que quebra nesses dois modais é temporal ou visual, e
// portanto invisível num teste de unidade: cross-fade sincronizado com o
// setTimeout que troca o texto, foco preso no card, scroll travado enquanto
// aberto, prefers-reduced-motion, e o rodapé cabendo numa viewport estreita
// (a versão anterior estourava a 380px com três botões na linha).
//
// Cobre também a guarda de descompasso de versão: se APP_VERSION e
// RELEASE_NOTES.version divergirem, o modal tem que ser suprimido em vez de
// mostrar o selo de uma versão sobre o texto de outra - que foi exatamente o
// que aconteceu em produção entre a v5.1 e a v5.2.
//
// Uso: npm run smoke:wizards

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// Entrada sintética: em vez de subir o app inteiro (que espera o DOM do CRM,
// faz JSONP e leva ~12s de animação de boot), monta só a camada dos wizards e
// expõe gatilhos. É a fronteira certa - o que se quer testar aqui é a casca de
// slides, não a inicialização do app.
const bundle = await build({
    stdin: {
        contents: `
            import { initGlobalStylesAndFont } from "./src/modules/shared/utils.js";
            import { initOnboarding } from "./src/modules/onboarding/onboarding-wizard.js";
            import { checkAndShowChangelog } from "./src/modules/changelog/changelog-wizard.js";
            import { setLanguage } from "./src/modules/shared/i18n.js";

            initGlobalStylesAndFont();

            window.__cw = {
                onboarding: (lang) => {
                    setLanguage(lang || "pt", { persist: false });
                    localStorage.removeItem("cw_onboarding_seen_v1");
                    initOnboarding();
                },
                changelog: (lang) => {
                    setLanguage(lang || "pt", { persist: false });
                    localStorage.setItem("cw_last_version", "v0.0");
                    checkAndShowChangelog(APP_VERSION);
                },
                // APP_VERSION que não existe no changelog-data.js: a guarda
                // tem que suprimir o modal em vez de mentir o selo.
                changelogMismatch: () => {
                    localStorage.setItem("cw_last_version", "v0.0");
                    checkAndShowChangelog("v99.9");
                },
            };
        `,
        resolveDir: raiz,
        loader: 'js',
    },
    bundle: true,
    write: false,
    logLevel: 'silent',
    // A versão real do app, lida de src/app.js, para o teste não fossilizar um
    // número e continuar verde depois de um bump que esqueceu o changelog-data.
    define: { APP_VERSION: JSON.stringify(await lerAppVersion()) },
});
const script = bundle.outputFiles[0].text;

async function lerAppVersion() {
    const { readFile } = await import('node:fs/promises');
    const src = await readFile(resolve(raiz, 'src/app.js'), 'utf8');
    const m = src.match(/APP_VERSION\s*=\s*["']([^"']+)["']/);
    if (!m) throw new Error('não achei APP_VERSION em src/app.js');
    return m[1];
}

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}

const browser = await chromium.launch({ headless: true });

async function novaPagina(opcoes = {}) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, ...opcoes });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.addScriptTag({ content: script });
    return page;
}

const slideAtivo = (page) => page.evaluate(() =>
    Array.from(document.querySelectorAll('.cw-wiz-dot')).findIndex((d) => d.classList.contains('active')));

console.log('\n--- Smoke: wizards de onboarding e changelog ---');

// ---------------------------------------------------------------- onboarding
{
    const page = await novaPagina();
    const avisos = [];
    page.on('console', (m) => { if (m.type() === 'warning') avisos.push(m.text()); });

    await page.evaluate(() => window.__cw.onboarding());
    await page.waitForSelector('.cw-wiz-overlay.open');
    await page.waitForTimeout(500);

    await check('abre com mais de um slide', async () => {
        const n = await page.locator('.cw-wiz-dot').count();
        if (n < 2) throw new Error(`só ${n} dot(s)`);
    });

    await check('trava o scroll da página de fundo', async () =>
        igual(await page.evaluate(() => document.body.style.overflow), 'hidden', 'body.overflow'));

    await check('entra com foco no botão principal', async () => {
        const cls = await page.evaluate(() => document.activeElement?.className || '');
        if (!cls.includes('cw-wiz-btn-primary')) throw new Error('foco em ' + cls);
    });

    await check('usa o token --cw-primary, não hex cravado', async () =>
        igual(await page.evaluate(() => getComputedStyle(document.querySelector('.cw-wiz-btn-primary')).backgroundColor),
            'rgb(26, 115, 232)', 'cor do botão'));

    await check('"Voltar" escondido no primeiro slide', async () => {
        const escondido = await page.evaluate(() => document.querySelector('.cw-wiz-actions .cw-wiz-btn-ghost').hidden);
        if (!escondido) throw new Error('Voltar visível no slide 1');
    });

    await check('seta direita avança, seta esquerda volta', async () => {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(400);
        igual(await slideAtivo(page), 1, 'após ArrowRight');
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(400);
        igual(await slideAtivo(page), 0, 'após ArrowLeft');
    });

    await check('dots são clicáveis e pulam direto', async () => {
        const ultimo = (await page.locator('.cw-wiz-dot').count()) - 1;
        await page.locator('.cw-wiz-dot').nth(ultimo).click();
        await page.waitForTimeout(400);
        igual(await slideAtivo(page), ultimo, 'após clicar no último dot');
    });

    await check('região aria-live anuncia o slide', async () => {
        const texto = await page.evaluate(() => document.querySelector('.cw-wiz-live').textContent);
        if (!/^Slide \d+ de \d+: .+/.test(texto)) throw new Error('aria-live: ' + JSON.stringify(texto));
    });

    await check('"Pular" some no último slide', async () => {
        const escondido = await page.evaluate(() => document.querySelector('.cw-wiz-skip')?.hidden ?? true);
        if (!escondido) throw new Error('Pular ainda visível no fim');
    });

    // aria-modal informa o leitor de tela mas não prende o foco - isso é
    // trabalho nosso, e é a checagem que pega uma regressão silenciosa.
    await check('Tab fica preso dentro do card', async () => {
        await page.evaluate(() => document.querySelector('.cw-wiz-btn-primary').focus());
        for (let i = 0; i < 20; i++) {
            await page.keyboard.press('Tab');
            const dentro = await page.evaluate(() =>
                document.querySelector('.cw-wiz-card').contains(document.activeElement));
            if (!dentro) throw new Error(`foco escapou no Tab #${i + 1}`);
        }
    });

    await check('fecha, destrava o scroll e persiste a flag', async () => {
        await page.locator('.cw-wiz-btn-primary').click();
        await page.waitForTimeout(700);
        igual(await page.locator('.cw-wiz-overlay').count(), 0, 'overlay no DOM');
        igual(await page.evaluate(() => document.body.style.overflow), '', 'body.overflow');
        igual(await page.evaluate(() => localStorage.getItem('cw_onboarding_seen_v1')), 'true', 'flag');
    });

    await check('segunda chamada não reabre', async () => {
        await page.evaluate(() => {
            localStorage.setItem('cw_onboarding_seen_v1', 'true');
        });
        await page.waitForTimeout(200);
        igual(await page.locator('.cw-wiz-overlay').count(), 0, 'overlay');
    });

    await page.close();
}

// ------------------------------------------------------------------ espanhol
{
    const page = await novaPagina();
    await page.evaluate(() => window.__cw.onboarding('es'));
    await page.waitForSelector('.cw-wiz-overlay.open');
    await page.waitForTimeout(500);

    await check('conteúdo em espanhol quando o perfil é es', async () => {
        const titulo = await page.evaluate(() => document.querySelector('.cw-wiz-title').textContent);
        if (!/Bienvenido/.test(titulo)) throw new Error('título: ' + JSON.stringify(titulo));
    });

    await check('a casca também traduz (Voltar/Volver, aria-live)', async () => {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(400);
        igual(await page.evaluate(() => document.querySelector('.cw-wiz-actions .cw-wiz-btn-ghost').textContent),
            'Volver', 'rótulo do botão de voltar');
        const live = await page.evaluate(() => document.querySelector('.cw-wiz-live').textContent);
        if (!live.startsWith('Diapositiva')) throw new Error('aria-live: ' + JSON.stringify(live));
    });

    // O onboarding é a tela que mais sofre com tradução mais longa: se o
    // espanhol estourar, estoura aqui.
    await check('sem scroll horizontal em espanhol', async () => {
        const ok = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
        if (!ok) throw new Error('página rolando na horizontal');
    });

    await page.close();
}

// ----------------------------------------------------------------- changelog
{
    const page = await novaPagina();
    const versao = await lerAppVersion();

    await page.evaluate(() => window.__cw.changelog());
    await page.waitForSelector('.cw-wiz-overlay.open');
    await page.waitForTimeout(500);

    await check('badge traz a versão corrente do app', async () =>
        igual(await page.evaluate(() => document.querySelector('.cw-wiz-badge')?.textContent),
            `Atualização ${versao}`, 'badge'));

    await check('não oferece "Pular" (é a única vez que isso aparece)', async () => {
        const escondido = await page.evaluate(() => document.querySelector('.cw-wiz-skip')?.hidden ?? true);
        if (!escondido) throw new Error('Pular presente no changelog');
    });

    // Esc aqui DISPENSA. Uma versão intermediária avançava o slide no Esc,
    // porque reaproveitava o clique do botão principal.
    await check('Esc fecha e grava a versão', async () => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(700);
        igual(await page.locator('.cw-wiz-overlay').count(), 0, 'overlay');
        igual(await page.evaluate(() => localStorage.getItem('cw_last_version')), versao, 'cw_last_version');
    });

    await page.close();
}

// ------------------------------------------------- guarda de versão divergente
{
    const page = await novaPagina();
    const avisos = [];
    page.on('console', (m) => { if (m.type() === 'warning') avisos.push(m.text()); });

    await page.evaluate(() => window.__cw.changelogMismatch());
    await page.waitForTimeout(400);

    await check('APP_VERSION != RELEASE_NOTES.version suprime o modal', async () =>
        igual(await page.locator('.cw-wiz-overlay').count(), 0, 'overlay'));

    await check('e avisa no console em vez de falhar em silêncio', async () => {
        if (!avisos.some((a) => a.includes('[changelog]'))) {
            throw new Error('nenhum warn: ' + JSON.stringify(avisos));
        }
    });

    await page.close();
}

// ----------------------------------------------------------- reduced motion
{
    const page = await novaPagina({ reducedMotion: 'reduce' });
    await page.evaluate(() => window.__cw.onboarding());
    await page.waitForSelector('.cw-wiz-overlay.open');
    await page.waitForTimeout(400);

    await check('respeita prefers-reduced-motion no card', async () => {
        const cs = await page.evaluate(() => {
            const s = getComputedStyle(document.querySelector('.cw-wiz-card'));
            return { transform: s.transform, transition: s.transitionProperty };
        });
        igual(cs.transform, 'none', 'transform do card');
        igual(cs.transition, 'opacity', 'propriedades em transição');
    });

    await check('troca de slide é imediata com movimento reduzido', async () => {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(60); // menos que o cross-fade normal (160ms)
        igual(await slideAtivo(page), 1, 'slide ativo');
    });

    await page.close();
}

// -------------------------------------------------------------- layout apertado
{
    const page = await novaPagina({ viewport: { width: 900, height: 520 } });
    await page.evaluate(() => window.__cw.onboarding());
    await page.waitForSelector('.cw-wiz-overlay.open');
    await page.waitForTimeout(400);

    await check('card cabe numa viewport baixa (900x520)', async () => {
        const r = await page.evaluate(() => {
            const b = document.querySelector('.cw-wiz-card').getBoundingClientRect();
            return { top: b.top, bottom: b.bottom, vh: window.innerHeight };
        });
        if (r.top < -1 || r.bottom > r.vh + 1) throw new Error(JSON.stringify(r));
    });

    await page.close();
}

{
    const page = await novaPagina({ viewport: { width: 380, height: 700 } });
    await page.evaluate(() => window.__cw.onboarding());
    await page.waitForSelector('.cw-wiz-overlay.open');
    await page.waitForTimeout(400);

    await check('sem scroll horizontal numa viewport estreita (380px)', async () => {
        const ok = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
        if (!ok) throw new Error('página rolando na horizontal');
    });

    // Com Voltar + Pular + Próximo no rodapé isto estourava: 294px de conteúdo
    // em 268px úteis, espremendo o botão principal. Por isso o "Pular" foi pro
    // canto superior - e por isso esta checagem existe.
    await check('rodapé não estoura num slide do meio', async () => {
        await page.locator('.cw-wiz-dot').nth(2).click();
        await page.waitForTimeout(400);
        const a = await page.evaluate(() => {
            const el = document.querySelector('.cw-wiz-actions');
            return { scrollW: el.scrollWidth, clientW: el.clientWidth };
        });
        if (a.scrollW > a.clientW + 1) throw new Error(JSON.stringify(a));
    });

    await page.close();
}

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
