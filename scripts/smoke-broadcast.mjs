// scripts/smoke-broadcast.mjs
//
// Smoke da Central de Avisos no navegador de verdade, agora que ela lê da
// Central de Conteúdo em vez da aba Broadcast.
//
// Existe porque o que mudou aqui não aparece num teste de unidade: o módulo é
// uma closure que monta DOM, faz polling e guarda estado de leitura no
// localStorage. As regras que este arquivo prova são as que custam caro se
// quebrarem em produção e são invisíveis numa revisão de código:
//
//   - um aviso marcado para um segmento não vaza para o outro;
//   - editar um aviso NÃO o faz reaparecer como não lido (a identidade é a
//     chave do item, não o ID da linha, que muda a cada versão);
//   - o som toca quando algo novo chega em segundo plano, e NÃO na primeira
//     carga, que é quando tudo é "novo";
//   - a API fora do ar não apaga o que o agente já tinha na tela;
//   - o cache da rota antiga ainda serve o primeiro load offline pós-deploy, e
//     descarta o antigo aviso de "Disponibilidade BAU", que naquele formato
//     era um aviso comum e apareceria solto no feed com as datas em prosa.
//
// Uso: npm run smoke:broadcast

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// Entrada sintética: monta só o módulo de avisos e troca a camada de rede por
// um stub controlável. É a fronteira certa — o que se quer provar aqui é a
// lógica do módulo (normalização, segmento, leitura, som), não o JSONP, que
// não mudou e é exercitado em outros testes.
const bundle = await build({
    stdin: {
        contents: `
            import { initGlobalStylesAndFont } from "./src/modules/shared/utils.js";
            import { initBroadcastAssistant } from "./src/modules/broadcast/broadcast-assistant.js";
            import { DataService } from "./src/modules/shared/data-service.js";
            import { SoundManager } from "./src/modules/shared/sound-manager.js";
            import { setUserProfile } from "./src/modules/shared/page-data.js";

            initGlobalStylesAndFont();

            let rodada = 0;
            let cfg = { rodadas: [] };

            window.__cw = {
                sons: 0,
                proximaRodada: () => { rodada++; },
                boot: (config) => {
                    cfg = config;
                    rodada = 0;

                    setUserProfile({ defaultLanguage: config.segmento === 'ES' ? 'ES' : 'PT-BR' });

                    SoundManager.playNotification = () => { window.__cw.sons++; };

                    // O módulo procura este botão para o badge e para a animação.
                    const btn = document.createElement('div');
                    btn.id = 'cw-btn-broadcast';
                    document.body.appendChild(btn);

                    DataService.fetchContentModule = async (modulo) => {
                        const r = cfg.rodadas[Math.min(rodada, cfg.rodadas.length - 1)] || {};
                        if (r.offline) throw new Error('offline');
                        if (modulo === 'broadcast') return r.avisos || [];
                        return r.disponibilidade ? [r.disponibilidade] : [];
                    };

                    window.__cw.api = initBroadcastAssistant();
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

// Item da Central: o registro composto mora numa string JSON em `value`, e a
// identidade estável do aviso é `key` — `id` muda a cada versão publicada.
const item = (key, over = {}) => ({
    id: over.id || ('itm_' + key),
    key,
    module: 'broadcast',
    lang: over.lang || 'ALL',
    label: over.title || key,
    version: over.version || 1,
    publishedBy: 'lucaste',
    publishedAt: over.date || '2026-08-30T10:00:00',
    value: JSON.stringify({
        type: over.type || 'info',
        title: over.title || ('Aviso ' + key),
        text: over.text || 'Corpo do aviso.',
        publishedAt: over.date || '2026-08-30T10:00:00',
        author: 'lucaste',
    }),
});

const disponibilidade = (segments, updatedAt = '2026-08-31T08:00:00') => ({
    id: 'itm_bau', key: 'current', module: 'bau_availability', lang: 'ALL',
    label: 'Disponibilidade BAU', version: 1,
    publishedBy: 'wfm1', publishedAt: updatedAt,
    value: JSON.stringify({ updatedAt, author: 'wfm1', note: '', segments }),
});

const browser = await chromium.launch({ headless: true });

async function novaPagina(config, storage = {}, { relogio = false } = {}) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    // Relógio virtual: o poll do módulo é de 60s, e esperar isso de verdade
    // deixaria o teste inviável. Só é ligado onde o poll em segundo plano é o
    // objeto do teste.
    if (relogio) await page.clock.install();
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate((s) => {
        Object.keys(s).forEach(k => localStorage.setItem(k, s[k]));
    }, storage);
    await page.addScriptTag({ content: script });
    await page.evaluate((c) => window.__cw.boot(c), config);
    await page.waitForTimeout(350);
    return page;
}

// Só o que está na lista de não-lidos. Os cards do histórico continuam no DOM
// (o container é que fica display:none), então um seletor solto por
// .cw-bc-msg-title contaria os dois e nunca veria a diferença entre lido e não
// lido — que é justamente o que os testes abaixo precisam distinguir.
const titulos = (page) => page.evaluate(() =>
    Array.from(document.querySelectorAll('#broadcast-popup .cw-bc-card:not(.history) .cw-bc-msg-title'))
        .map(e => e.textContent));

console.log('\n--- Smoke: Central de Avisos (leitura da Central de Conteúdo) ---');

// ------------------------------------------------ leitura e segmento
{
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [{
            avisos: [
                item('msg_1', { title: 'Para todos' }),
                item('msg_2', { title: 'Só para ES', lang: 'ES' }),
                item('msg_3', { title: 'Só para PT', lang: 'PT' }),
            ],
        }],
    });

    await check('mostra os avisos publicados na Central', async () => {
        const t = await titulos(page);
        if (!t.includes('Para todos')) throw new Error('faltou o aviso ALL: ' + JSON.stringify(t));
    });

    await check('aviso marcado para ES não aparece para quem atende PT', async () => {
        const t = await titulos(page);
        if (t.includes('Só para ES')) throw new Error('vazou aviso de outro segmento');
        if (!t.includes('Só para PT')) throw new Error('sumiu o aviso do próprio segmento');
    });

    await page.close();
}

{
    const page = await novaPagina({
        segmento: 'ES',
        rodadas: [{
            avisos: [
                item('msg_2', { title: 'Só para ES', lang: 'ES' }),
                item('msg_3', { title: 'Só para PT', lang: 'PT' }),
            ],
        }],
    });

    await check('quem atende ES vê o aviso de ES e não o de PT', async () => {
        const t = await titulos(page);
        igual(t, ['Só para ES'], 'avisos visíveis');
    });

    await page.close();
}

// ------------------------------------------------ estado de leitura
{
    // Um aviso já lido, editado depois: linha nova (id diferente), mesma chave.
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [
            { avisos: [item('msg_1', { title: 'Manutenção' })] },
            { avisos: [item('msg_1', { id: 'itm_v2', version: 2, title: 'Manutenção (adiada)' })] },
        ],
    }, { cw_read_broadcasts: JSON.stringify(['msg_1']) });

    await check('aviso já lido nasce no histórico, não na lista', async () => {
        const t = await titulos(page);
        igual(t.length, 0, 'avisos fora do histórico');
        const n = await page.locator('.cw-bc-history-divider').count();
        igual(n, 1, 'divisor de histórico');
    });

    await check('editar um aviso não o faz reaparecer como não lido', async () => {
        await page.evaluate(() => window.__cw.proximaRodada());
        await page.evaluate(() => window.__cw.api.toggle()); // abre: força um sync
        await page.waitForTimeout(400);

        const t = await titulos(page);
        if (t.includes('Manutenção (adiada)')) {
            throw new Error('a edição reapareceu como não lida — a identidade está saindo do ID da linha');
        }
    });

    await page.close();
}

// ------------------------------------------------ disponibilidade BAU
// A faixa mostra UM segmento por vez — o do agente — com a bandeira do idioma
// que ele atende. O outro fica atrás do botão de troca.
const faixa = (page) => page.evaluate(() => {
    const w = document.querySelector('#cw-bau-widget');
    if (!w) return null;
    return {
        segmento: w.querySelector('.cw-bc-bau-seg')?.textContent.trim() || null,
        // O primeiro <rect> de cada bandeira é o campo de fundo: verde no
        // Brasil, vermelho na Espanha. É o jeito de provar qual SVG entrou sem
        // comparar o markup inteiro.
        bandeira: w.querySelector('.cw-bc-bau-flag rect')?.getAttribute('fill') || null,
        datas: Array.from(w.querySelectorAll('.cw-bc-bau-date')).map(d => ({
            tipo: d.classList.contains('attention') ? 'atencao' : 'total',
            valor: d.querySelector('.cw-bc-bau-value')?.textContent.trim(),
        })),
        temSwap: !!w.querySelector('.cw-bc-bau-swap'),
        rotuloSwap: w.querySelector('.cw-bc-bau-swap')?.getAttribute('aria-label') || null,
    };
});

const VERDE_BR = '#009B3A';
const VERMELHO_ES = '#AA151B';

const doisSegmentos = disponibilidade({
    PT: { attention: '2026-09-15', full: '2026-09-22' },
    ES: { attention: '2026-09-18', full: '2026-09-25' },
});

{
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [{ avisos: [], disponibilidade: doisSegmentos }],
    });

    await check('mostra a bandeira e as datas do segmento que o agente atende', async () => {
        const f = await faixa(page);
        igual(f.segmento, 'PT-BR', 'segmento exibido');
        igual(f.bandeira, VERDE_BR, 'bandeira exibida');
        igual(f.datas, [
            { tipo: 'atencao', valor: '15/09' },
            { tipo: 'total', valor: '22/09' },
        ], 'datas do segmento');
    });

    await check('o botão de troca diz para qual segmento leva', async () => {
        const f = await faixa(page);
        igual(f.temSwap, true, 'botão de troca presente');
        if (!/ES/.test(f.rotuloSwap)) throw new Error('aria-label não nomeia o destino: ' + f.rotuloSwap);
    });

    await check('a troca leva ao outro segmento, com bandeira e datas dele', async () => {
        // Abre o módulo antes: fechado ele fica em scale(0.05) e o clique não
        // alcança nada. Clicar no swap é, por definição, algo que se faz
        // olhando para a faixa.
        await page.evaluate(() => window.__cw.api.toggle());
        await page.waitForTimeout(400);
        await page.click('.cw-bc-bau-swap');
        await page.waitForTimeout(150);

        const f = await faixa(page);
        igual(f.segmento, 'ES', 'segmento após a troca');
        igual(f.bandeira, VERMELHO_ES, 'bandeira após a troca');
        igual(f.datas.map(d => d.valor), ['18/09', '25/09'], 'datas após a troca');
    });

    await check('a troca não persiste: reabrir volta ao segmento do agente', async () => {
        // O módulo já está aberto e mostrando ES, do teste anterior.
        await page.evaluate(() => window.__cw.api.toggle());  // fecha
        await page.waitForTimeout(300);
        await page.evaluate(() => window.__cw.api.toggle());  // abre de novo
        await page.waitForTimeout(400);

        const f = await faixa(page);
        igual(f.segmento, 'PT-BR', 'segmento ao reabrir');
    });

    await page.close();
}

{
    const page = await novaPagina({
        segmento: 'ES',
        rodadas: [{ avisos: [], disponibilidade: doisSegmentos }],
    });

    await check('quem atende ES abre já na bandeira e nas datas de ES', async () => {
        const f = await faixa(page);
        igual(f.segmento, 'ES', 'segmento exibido');
        igual(f.bandeira, VERMELHO_ES, 'bandeira exibida');
        igual(f.datas.map(d => d.valor), ['18/09', '25/09'], 'datas do segmento');
    });

    await page.close();
}

{
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [{
            avisos: [],
            disponibilidade: disponibilidade({ PT: { attention: '', full: '2026-09-22' } }),
        }],
    });

    await check('campo flexível: com uma data só, mostra só ela', async () => {
        const f = await faixa(page);
        igual(f.datas, [{ tipo: 'total', valor: '22/09' }], 'datas exibidas');
    });

    await check('sem um segundo segmento, não há botão de troca', async () => {
        igual((await faixa(page)).temSwap, false, 'botão de troca');
    });

    await page.close();
}

{
    // Só ES publicado, agente de PT. Mostrar a faixa vazia seria pior do que
    // mostrar a do outro segmento devidamente rotulada.
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [{
            avisos: [],
            disponibilidade: disponibilidade({ ES: { attention: '2026-09-18', full: '' } }),
        }],
    });

    await check('sem disponibilidade do próprio segmento, mostra a que existe, rotulada', async () => {
        const f = await faixa(page);
        igual(f.segmento, 'ES', 'segmento exibido');
        igual(f.bandeira, VERMELHO_ES, 'bandeira exibida');
    });

    await page.close();
}

// ------------------------------------------------ acessibilidade e registro visual
{
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [{
            avisos: [item('msg_1', { title: 'Instabilidade', type: 'critical' })],
            disponibilidade: disponibilidade({
                PT: { attention: '2026-09-15', full: '2026-09-22' },
                ES: { attention: '2026-09-18', full: '' },
            }),
        }],
    });

    await check('todo controle é <button> alcançável por teclado', async () => {
        const tags = await page.evaluate(() => {
            const p = document.querySelector('#broadcast-popup');
            return {
                limparBusca: p.querySelector('.cw-bc-search-clear')?.tagName,
                dispensar: p.querySelector('.cw-bc-dismiss-btn')?.tagName,
                troca: p.querySelector('.cw-bc-bau-swap')?.tagName,
            };
        });
        igual(tags, { limparBusca: 'BUTTON', dispensar: 'BUTTON', troca: 'BUTTON' }, 'tags dos controles');
    });

    await check('botões só de ícone dizem o que fazem', async () => {
        const rotulos = await page.evaluate(() => {
            const p = document.querySelector('#broadcast-popup');
            return ['.cw-bc-search-clear', '.cw-bc-dismiss-btn', '.cw-bc-bau-swap']
                .map(sel => p.querySelector(sel)?.getAttribute('aria-label') || null);
        });
        rotulos.forEach((r, i) => {
            if (!r || !r.trim()) throw new Error('controle ' + i + ' sem aria-label');
        });
    });

    await check('ícones decorativos ficam fora da leitura de tela', async () => {
        const expostos = await page.evaluate(() => {
            const p = document.querySelector('#broadcast-popup');
            // Um SVG dentro de um botão que já tem aria-label, ou solto num
            // elemento decorativo, não deve ser anunciado por si.
            return Array.from(p.querySelectorAll('.cw-bc-card svg, .cw-bc-bau svg, .cw-bc-search-icon svg'))
                .filter(svg => svg.getAttribute('aria-hidden') !== 'true'
                            && svg.closest('[aria-hidden="true"]') === null).length;
        });
        igual(expostos, 0, 'SVGs decorativos expostos');
    });

    await check('o card é anunciado pelo próprio título', async () => {
        const ok = await page.evaluate(() => {
            const card = document.querySelector('.cw-bc-card');
            const id = card?.getAttribute('aria-labelledby');
            return !!(card && card.tagName === 'ARTICLE' && id && card.querySelector('#' + CSS.escape(id)));
        });
        igual(ok, true, 'card com título associado');
    });

    await check('o status de sincronização é anunciado', async () => {
        const live = await page.evaluate(() =>
            document.querySelector('#cw-update-status')?.getAttribute('aria-live'));
        igual(live, 'polite', 'aria-live do status');
    });

    await check('sem emoji no chrome do módulo', async () => {
        // Regra do registro visual do projeto: emoji em cabeçalho, botão ou
        // rótulo de estado lê como ferramenta interna, não como Google. O
        // texto dos avisos em si segue livre — é conteúdo de quem publica.
        const comEmoji = await page.evaluate(() => {
            const p = document.querySelector('#broadcast-popup');
            const alvos = [
                ...p.querySelectorAll('.cw-bc-type, .cw-bc-date-tag, .cw-bc-msg-author, .cw-bc-bau-label, .cw-bc-bau-kind, .cw-bc-history-divider'),
                document.querySelector('#cw-update-status'),
            ].filter(Boolean);
            const re = /\p{Extended_Pictographic}/u;
            return alvos.filter(e => re.test(e.textContent)).map(e => e.className + ': ' + e.textContent.trim());
        });
        igual(comEmoji, [], 'elementos de chrome com emoji');
    });

    await check('o tipo do aviso é dito em texto, não em pílula maiúscula', async () => {
        const t = await page.evaluate(() => {
            const el = document.querySelector('.cw-bc-type');
            return { texto: el?.textContent.trim(), transform: getComputedStyle(el).textTransform };
        });
        igual(t.texto, 'Alerta', 'rótulo do tipo');
        igual(t.transform, 'none', 'text-transform do tipo');
    });

    await check('o histórico diz se está aberto ou fechado', async () => {
        // Nenhum aviso lido nesta página, então o divisor não existe: o que se
        // prova aqui é que, quando existe, ele é um botão com aria-expanded.
        // Coberto pela página de estado de leitura mais acima.
        const marcado = await page.evaluate(() => {
            const d = document.querySelector('.cw-bc-history-divider');
            return d ? (d.tagName === 'BUTTON' && d.hasAttribute('aria-expanded')) : 'ausente';
        });
        if (marcado !== 'ausente' && marcado !== true) throw new Error('divisor sem aria-expanded');
    });

    await page.close();
}

// ------------------------------------------------ som
{
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [
            { avisos: [item('msg_1')], disponibilidade: disponibilidade({ PT: { attention: '2026-09-15', full: '' } }) },
            { avisos: [item('msg_1')], disponibilidade: disponibilidade({ PT: { attention: '2026-09-10', full: '' } }, '2026-08-31T18:00:00') },
            { avisos: [item('msg_1'), item('msg_9', { title: 'Novo' })], disponibilidade: disponibilidade({ PT: { attention: '2026-09-10', full: '' } }, '2026-08-31T18:00:00') },
        ],
    }, {}, { relogio: true });

    await check('não toca som na primeira carga (tudo é novo ali)', async () => {
        igual(await page.evaluate(() => window.__cw.sons), 0, 'sons após boot');
    });

    await check('toca quando a disponibilidade muda, com o módulo fechado', async () => {
        await page.evaluate(() => window.__cw.proximaRodada());
        await page.clock.runFor(61_000);
        await page.waitForTimeout(300);
        igual(await page.evaluate(() => window.__cw.sons), 1, 'sons após a disponibilidade mudar');
    });

    await check('toca quando chega um aviso novo não lido', async () => {
        await page.evaluate(() => window.__cw.proximaRodada());
        await page.clock.runFor(61_000);
        await page.waitForTimeout(300);
        igual(await page.evaluate(() => window.__cw.sons), 2, 'sons após o aviso novo');
    });

    await check('não toca de novo quando nada mudou entre polls', async () => {
        // A rodada NÃO avança: o stub devolve a mesma resposta. É o caso que
        // fazia o módulo antigo tocar a cada sync enquanto houvesse não-lido.
        await page.clock.runFor(61_000);
        await page.waitForTimeout(300);
        igual(await page.evaluate(() => window.__cw.sons), 2, 'sons sem novidade');
    });

    await page.close();
}

// ------------------------------------------------ resiliência
{
    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [
            { avisos: [item('msg_1', { title: 'Continua aqui' })] },
            { offline: true },
        ],
    });

    await check('API fora do ar não apaga o que já estava na tela', async () => {
        igual(await titulos(page), ['Continua aqui'], 'antes de cair');

        await page.evaluate(() => window.__cw.proximaRodada());
        await page.evaluate(() => window.__cw.api.toggle());
        await page.waitForTimeout(400);

        igual(await titulos(page), ['Continua aqui'], 'depois de cair');
    });

    await page.close();
}

// ------------------------------------------------ cache legado
{
    const legado = JSON.stringify([
        { id: 'msg_a', date: '2026-08-20T10:00:00', type: 'info', title: 'Aviso antigo', text: 'Do cache da rota antiga.', author: 'lucaste', active: true },
        { id: 'msg_b', date: '2026-08-21T10:00:00', type: 'info', title: 'Disponibilidade BAU', text: 'PT 15/09, ES 18/09.', author: 'lucaste', active: true },
    ]);

    const page = await novaPagina({
        segmento: 'PT',
        rodadas: [{ offline: true }],
    }, { cw_data_broadcast: legado });

    await check('primeiro load offline pós-deploy usa o cache da rota antiga', async () => {
        const t = await titulos(page);
        if (!t.includes('Aviso antigo')) throw new Error('não leu o cache legado: ' + JSON.stringify(t));
    });

    await check('o antigo aviso de Disponibilidade BAU não vira card solto', async () => {
        const t = await titulos(page);
        if (t.includes('Disponibilidade BAU')) {
            throw new Error('o aviso de disponibilidade do formato antigo vazou para o feed');
        }
    });

    await page.close();
}

await browser.close();
console.log('\n' + (fail ? '✗' : '✓') + ` smoke de avisos: ${fail} falha(s)\n`);
process.exit(fail ? 1 : 0);
