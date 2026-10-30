// scripts/smoke-disclaimer.mjs
//
// Smoke do lembrete de qualidade que aparece em todo boot, no navegador de
// verdade. Dois blocos, por custo:
//
//   1. A PEÇA, isolada (rápido, com relógio falso): texto nos três idiomas,
//      "não atrapalha o CRM", som, auto-dispensa de 12s, pausa por mouse/foco e
//      reduced-motion.
//   2. O APP INTEIRO (lento: a splash leva alguns segundos): a SEQUÊNCIA. O
//      aviso mora no app.js e depende de a splash, o onboarding e o changelog
//      terem saído da frente; isolado, nada disso existe para ser testado.
//
// O que a afirmação central protege: "não pode atrapalhar o uso do CRM". Ela
// quebra de forma silenciosa - um fundo escurecido, um foco roubado ou um
// aviso que cobre a pílula não dão erro nenhum, só atrapalham o agente.
//
// Uso: npm run smoke:disclaimer   (CW_CHROMIUM aponta um Chromium alternativo)

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// A peça isolada: sem o boot de ~10s, com gatilhos no window.
const pecaIsolada = (await build({
    stdin: {
        contents: `
            import { initGlobalStylesAndFont } from "./src/modules/shared/utils.js";
            import { showQaDisclaimer } from "./src/modules/disclaimer/qa-disclaimer.js";
            import { setLanguage } from "./src/modules/shared/i18n.js";

            initGlobalStylesAndFont();
            window.__cw = {
                mostrar: (lang) => {
                    setLanguage(lang || "pt", { persist: false });
                    showQaDisclaimer();
                },
                // Troca de idioma com o app aberto (Configurações, ou o perfil
                // chegando tarde): o cartão tem de acompanhar.
                trocar: (lang) => setLanguage(lang, { persist: false }),
            };
        `,
        resolveDir: raiz,
        loader: 'js',
    },
    bundle: true,
    write: false,
    logLevel: 'silent',
})).outputFiles[0].text;

// O app de verdade, o mesmo que o bookmarklet carrega.
const appInteiro = (await build({
    entryPoints: [resolve(raiz, 'src/app.js')],
    bundle: true,
    write: false,
    logLevel: 'silent',
})).outputFiles[0].text;

const appVersion = (await readFile(resolve(raiz, 'src/app.js'), 'utf8'))
    .match(/APP_VERSION\s*=\s*["']([^"']+)["']/)[1];

let fail = 0;
async function check(name, fn) {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}
function igual(atual, esperado, oque) {
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}
function verdade(cond, oque) { if (!cond) throw new Error(oque); }

const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });

// Conta os osciladores criados: é o que distingue "tocou" de "silêncio" sem
// precisar de ouvido. Roda antes de qualquer script da página.
const contarOsciladores = () => {
    window.__osc = 0;
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const original = C.prototype.createOscillator;
    C.prototype.createOscillator = function () { window.__osc++; return original.apply(this, arguments); };
};

async function novaPagina({ script, relogioFalso = false, sons = true, storage = {}, ...opcoes } = {}) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, ...opcoes });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    await page.addInitScript(contarOsciladores);
    if (relogioFalso) await page.clock.install();
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate((s) => {
        for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v);
    }, { ...(sons ? {} : { cw_sounds_muted: 'true' }), ...storage });
    // Um controle do "CRM" no meio da tela e um campo de texto com foco: o que
    // o aviso não pode tomar do agente.
    await page.evaluate(() => {
        document.body.insertAdjacentHTML('beforeend',
            '<button id="crm-probe" style="position:fixed;left:50%;top:50%">CRM</button>' +
            '<input id="crm-campo" style="position:fixed;left:50%;top:30%">');
        window.__cliques = 0;
        document.getElementById('crm-probe').addEventListener('click', () => window.__cliques++);
    });
    if (script) await page.addScriptTag({ content: script });
    return page;
}

const mostrar = async (page, lang = 'pt') => {
    await page.evaluate((l) => window.__cw.mostrar(l), lang);
    await page.clock.runFor(100); // os dois requestAnimationFrame da entrada
    // A transição de entrada (280ms) corre em tempo real, não no relógio falso.
    // Medir antes de ela assentar mede o deslize, não a posição.
    await page.waitForTimeout(350);
};
const presente = (page) => page.locator('.cw-qa-notice').count();
const retangulo = (page) => page.evaluate(() => {
    const r = document.querySelector('.cw-qa-notice').getBoundingClientRect();
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, w: r.width, h: r.height,
        vw: window.innerWidth, vh: window.innerHeight };
});

console.log('\n--- Smoke: lembrete de qualidade ---');

// ------------------------------------------------------------------- texto
for (const [lang, esperado] of Object.entries({
    pt: { titulo: 'Lembrete de qualidade', botao: 'Entendi', trecho: 'responsabilidade do agente' },
    es: { titulo: 'Recordatorio de calidad', botao: 'Entendido', trecho: 'responsabilidad del agente' },
    en: { titulo: 'Quality reminder', botao: 'Got it', trecho: 'responsibility' },
})) {
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await mostrar(page, lang);

    await check(`${lang}: título, texto e botão no idioma da interface`, async () => {
        const t = await page.evaluate(() => ({
            titulo: document.querySelector('.cw-qa-notice-title').textContent,
            texto: document.querySelector('.cw-qa-notice-text').textContent,
            botao: document.querySelector('.cw-qa-notice-btn').textContent,
        }));
        igual(t.titulo, esperado.titulo, 'título');
        igual(t.botao, esperado.botao, 'botão');
        verdade(t.texto.includes(esperado.trecho), `texto sem "${esperado.trecho}": ${t.texto}`);
        // Termos que não se traduzem (specs/_MASTER_RULEBOOK.md §4).
        for (const termo of ['QA', 'SOP', 'Case Wizard']) verdade(t.texto.includes(termo), `texto perdeu "${termo}"`);
    });

    if (lang === 'es') {
        // O espanhol é o idioma mais longo; é onde o cartão estoura primeiro.
        await check('es: o cartão cabe na viewport estreita (380px)', async () => {
            await page.setViewportSize({ width: 380, height: 700 });
            const r = await retangulo(page);
            verdade(r.left >= 0 && r.right <= r.vw, `fora da tela: ${JSON.stringify(r)}`);
            verdade(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
                'página rolando na horizontal');
        });
    }
    await page.close();
}

// ------------------------------------------------------ não atrapalha o CRM
{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await page.focus('#crm-campo');
    await mostrar(page);

    await check('é uma região de status (leitor de tela lê sem tirar o foco)', async () =>
        igual(await page.getAttribute('.cw-qa-notice', 'role'), 'status', 'role'));

    await check('não rouba o foco de quem está digitando no CRM', async () => {
        igual(await page.evaluate(() => document.activeElement?.id), 'crm-campo', 'elemento com foco');
        await page.keyboard.type('abc');
        igual(await page.inputValue('#crm-campo'), 'abc', 'texto digitado');
    });

    await check('sem fundo escurecido e sem travar a rolagem da página', async () => {
        igual(await page.evaluate(() => document.body.style.overflow), '', 'body.overflow');
        const cobreTudo = await page.evaluate(() => {
            const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            return !!el?.closest('.cw-qa-notice');
        });
        verdade(!cobreTudo, 'o centro da tela está sob o aviso');
    });

    await check('o resto do CRM segue clicável com o aviso na tela', async () => {
        await page.click('#crm-probe');
        igual(await page.evaluate(() => window.__cliques), 1, 'cliques no controle do CRM');
    });

    await check('ocupa só o canto inferior esquerdo, com 24px de margem', async () => {
        const r = await retangulo(page);
        igual(r.left, 24, 'margem esquerda');
        igual(r.vh - r.bottom, 24, 'margem inferior');
        verdade(r.w <= 360, `largura ${r.w}`);
        verdade(r.right < r.vw / 2, 'passa do meio da tela');
        // A pílula mora na borda direita (right: 24px) - o aviso nunca chega lá.
        // Hoje são ~6% (4 linhas nos três idiomas); o teto de 8% existe para
        // pegar "virou uma faixa que atravessa a tela", não para medir ponto
        // percentual.
        verdade(r.w * r.h < 0.08 * r.vw * r.vh, `área acima de 8% da tela: ${Math.round(100 * r.w * r.h / (r.vw * r.vh))}%`);
    });

    await check('fica abaixo da pílula e dos diálogos (z-index < o teto)', async () => {
        const z = await page.evaluate(() => Number(getComputedStyle(document.querySelector('.cw-qa-notice')).zIndex));
        verdade(z < 2147483647, `z-index ${z}`);
    });

    await check('transição nomeia as propriedades (nunca "all")', async () => {
        const p = await page.evaluate(() => getComputedStyle(document.querySelector('.cw-qa-notice')).transitionProperty);
        verdade(p !== 'all', 'transition: all');
    });

    await page.close();
}

// -------------------------------------------------------------------- som
{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await mostrar(page);
    await check('toca um som curto (duas notas) ao aparecer', async () =>
        igual(await page.evaluate(() => window.__osc), 2, 'osciladores'));
    await page.close();

    const calada = await novaPagina({ script: pecaIsolada, relogioFalso: true, sons: false });
    await mostrar(calada);
    await check('respeita o mudo de Configurações: aparece e fica em silêncio', async () => {
        igual(await presente(calada), 1, 'aviso na tela');
        igual(await calada.evaluate(() => window.__osc), 0, 'osciladores');
    });
    await calada.close();
}

// ------------------------------------------------- troca de idioma ao vivo
{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await mostrar(page, 'pt');

    await check('trocar o idioma com o cartão aberto repinta título, texto e botão', async () => {
        await page.evaluate(() => window.__cw.trocar('en'));
        const t = await page.evaluate(() => ({
            titulo: document.querySelector('.cw-qa-notice-title').textContent,
            texto: document.querySelector('.cw-qa-notice-text').textContent,
            botao: document.querySelector('.cw-qa-notice-btn').textContent,
        }));
        igual(t.titulo, 'Quality reminder', 'título');
        igual(t.botao, 'Got it', 'botão');
        verdade(t.texto.startsWith('Follow the QA guidelines'), 'texto: ' + t.texto);
    });

    await check('depois de dispensado, trocar o idioma não repinta o cartão removido (sem ouvinte vazado)', async () => {
        await page.evaluate(() => { window.__velho = document.querySelector('.cw-qa-notice'); });
        await page.click('.cw-qa-notice-btn');
        await page.clock.runFor(300);
        await page.evaluate(() => window.__cw.trocar('es'));
        igual(await presente(page), 0, 'avisos');
        igual(await page.evaluate(() => window.__velho.querySelector('.cw-qa-notice-title').textContent),
            'Quality reminder', 'título do cartão já removido');
    });
    await page.close();
}

// ----------------------------------------------------- tempo e dispensa
{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await mostrar(page);

    await check('continua na tela aos 11s', async () => {
        await page.clock.runFor(10900);
        igual(await presente(page), 1, 'avisos');
    });
    await check('some sozinho aos 12s', async () => {
        await page.clock.runFor(1200);
        igual(await presente(page), 0, 'avisos');
    });

    await mostrar(page);
    await check('chamar de novo não duplica o aviso', async () => {
        await page.evaluate(() => window.__cw.mostrar('pt'));
        igual(await presente(page), 1, 'avisos');
    });

    await check('"Entendi" dispensa na hora', async () => {
        await page.click('.cw-qa-notice-btn');
        await page.clock.runFor(300);
        igual(await presente(page), 0, 'avisos');
    });
    await page.close();
}

{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await mostrar(page);
    await page.clock.runFor(11000); // falta 1s para sumir

    await check('o mouse sobre o cartão segura o relógio', async () => {
        await page.hover('.cw-qa-notice-text');
        await page.clock.runFor(30000);
        igual(await presente(page), 1, 'avisos');
    });
    await check('ao soltar, volta com pelo menos 4s - não some na cara de quem lia', async () => {
        await page.mouse.move(640, 100);
        await page.clock.runFor(3500);
        igual(await presente(page), 1, 'avisos após 3,5s');
        await page.clock.runFor(1000);
        igual(await presente(page), 0, 'avisos após 4,5s');
    });
    await page.close();
}

{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true });
    await mostrar(page);

    await check('o foco no botão (teclado) também segura o relógio', async () => {
        await page.focus('.cw-qa-notice-btn');
        await page.clock.runFor(30000);
        igual(await presente(page), 1, 'avisos');
    });
    await check('Enter no botão dispensa', async () => {
        await page.keyboard.press('Enter');
        await page.clock.runFor(300);
        igual(await presente(page), 0, 'avisos');
    });
    await page.close();
}

// ----------------------------------------------------------- reduced motion
{
    const page = await novaPagina({ script: pecaIsolada, relogioFalso: true, reducedMotion: 'reduce' });
    await mostrar(page);
    await check('prefers-reduced-motion: sem deslize, só opacidade', async () => {
        const cs = await page.evaluate(() => {
            const s = getComputedStyle(document.querySelector('.cw-qa-notice'));
            return { transform: s.transform, transition: s.transitionProperty };
        });
        igual(cs.transform, 'none', 'transform');
        igual(cs.transition, 'opacity', 'propriedades em transição');
    });
    await page.close();
}

// ============================================================ app inteiro
// A splash leva alguns segundos e o aviso vem depois dela, então estes blocos
// esperam por seletor (nunca por tempo fixo) com folga de 40s.
const BOOT_MS = 40000;

async function bootarApp({ storage }) {
    const page = await novaPagina({ script: appInteiro, storage });
    return page;
}
const pilulaVisivel = (page) => page.evaluate(() => {
    const p = document.querySelector('.cw-pill');
    if (!p) return false;
    const r = p.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
});

console.log('\n--- Smoke: sequência no boot do app ---');

{
    // Agente de rotina: tour já visto, versão em dia. O caso de 99% dos boots.
    const page = await bootarApp({ storage: {
        cw_onboarding_seen_v1: 'true', cw_last_version: appVersion, cw_ui_lang: 'en', cw_output_lang: 'pt',
    } });
    await page.waitForSelector('.cw-qa-notice.open', { timeout: BOOT_MS });

    await check('aparece em todo boot, depois que a splash saiu do DOM', async () =>
        igual(await page.locator('#techsol-splash-screen').count(), 0, 'splash no DOM'));

    await check('segue o idioma da INTERFACE (en), não o do atendimento (pt)', async () =>
        igual(await page.textContent('.cw-qa-notice-title'), 'Quality reminder', 'título'));

    await check('não cobre a pílula do app', async () => {
        verdade(await pilulaVisivel(page), 'pílula não está visível');
        const sobrepoe = await page.evaluate(() => {
            const a = document.querySelector('.cw-qa-notice').getBoundingClientRect();
            const b = document.querySelector('.cw-pill').getBoundingClientRect();
            return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
        });
        verdade(!sobrepoe, 'o aviso e a pílula se sobrepõem');
    });

    await check('a pílula segue clicável com o aviso na tela', async () => {
        const dentro = await page.evaluate(() => {
            const b = document.querySelector('.cw-pill').getBoundingClientRect();
            const el = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
            return !!el?.closest('.cw-pill');
        });
        verdade(dentro, 'algo cobre o centro da pílula');
    });

    await check('some sozinho depois de ~12s e deixa a tela como estava', async () => {
        await page.waitForSelector('.cw-qa-notice', { state: 'detached', timeout: 20000 });
        verdade(await pilulaVisivel(page), 'pílula sumiu');
    });
    await page.close();
}

{
    // Primeiro uso: o tour é modal e ocupa a tela. O aviso espera ele acabar -
    // senão o relógio de 12s corre por baixo do modal e ninguém chega a ler.
    const page = await bootarApp({ storage: { cw_ui_lang: 'es', cw_output_lang: 'es' } });
    await page.waitForSelector('.cw-ob-lang-overlay.open', { timeout: BOOT_MS });

    await check('primeiro uso: não aparece enquanto o tour está aberto', async () => {
        await page.waitForTimeout(3000); // bem mais que os 1,2s de respiro
        igual(await presente(page), 0, 'avisos durante a escolha de idioma');
        await page.click('.cw-ob-lang-btn[data-lang="es"]');
        await page.waitForSelector('.cw-wiz-overlay.open');
        await page.waitForTimeout(3000);
        igual(await presente(page), 0, 'avisos durante os slides');
    });

    await check('primeiro uso: aparece logo depois que o tour fecha, no idioma escolhido', async () => {
        await page.locator('.cw-wiz-dot').last().click();
        await page.waitForTimeout(400);
        await page.locator('.cw-wiz-btn-primary').click();
        await page.waitForSelector('.cw-wiz-overlay', { state: 'detached', timeout: 5000 });
        await page.waitForSelector('.cw-qa-notice.open', { timeout: 8000 });
        igual(await page.textContent('.cw-qa-notice-title'), 'Recordatorio de calidad', 'título');
    });
    await page.close();
}

{
    // Versão nova: o changelog é modal também.
    const page = await bootarApp({ storage: {
        cw_onboarding_seen_v1: 'true', cw_last_version: 'v0.0', cw_ui_lang: 'pt', cw_output_lang: 'pt',
    } });
    await page.waitForSelector('.cw-wiz-overlay.open', { timeout: BOOT_MS });

    await check('versão nova: não aparece enquanto o changelog está aberto', async () => {
        await page.waitForTimeout(3000);
        igual(await presente(page), 0, 'avisos');
    });
    await check('versão nova: aparece depois que o changelog fecha', async () => {
        await page.keyboard.press('Escape');
        await page.waitForSelector('.cw-wiz-overlay', { state: 'detached', timeout: 5000 });
        await page.waitForSelector('.cw-qa-notice.open', { timeout: 8000 });
        igual(await page.textContent('.cw-qa-notice-title'), 'Lembrete de qualidade', 'título');
    });
    await page.close();
}

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke do lembrete de qualidade: ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
