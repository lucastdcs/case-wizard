// scripts/smoke-i18n.mjs
//
// Smoke do idioma no navegador de verdade. `test:i18n` garante que os
// dicionários TÊM as três línguas; este garante que o app LÊ a certa em
// cada lugar — que é outro problema, e o mais fácil de errar.
//
// A afirmação central é a separação feita no ADR-0016: idioma da interface
// (quem opera) e idioma do atendimento (quem é atendido) são knobs
// independentes. O modo de falha que ele existe para pegar é silencioso e
// caro: um agente põe a ferramenta em inglês por preferência e passa a
// gravar case notes em inglês em casos PT/ES, sem nenhum aviso na tela.
//
// Por isso o teste roda no pior cenário possível — interface EN com
// atendimento PT — e checa os dois lados ao mesmo tempo. Com os dois knobs
// no mesmo valor, qualquer religação errada passaria despercebida.
//
// Uso: npm run smoke:i18n   (CW_CHROMIUM aponta um Chromium alternativo)

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

const bundle = await build({
    entryPoints: [resolve(raiz, 'src/app.js')],
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
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}
function contem(texto, trecho, oque) {
    if (!String(texto).includes(trecho)) throw new Error(`${oque}: não achei ${JSON.stringify(trecho)} em ${JSON.stringify(String(texto).slice(0, 120))}`);
}

const executablePath = process.env.CW_CHROMIUM || undefined;
const browser = await chromium.launch({ headless: true, executablePath });

// Sobe o app com os dois idiomas JÁ divergentes: é o estado que o ADR-0016
// tornou possível, e o único em que uma religação errada aparece.
async function abrirCaseNotes({ ui, saida, comEditor = false, storage = {} }) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.route('**script.google.com/**', (route) => route.abort());
    page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
    await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
    await page.evaluate(([u, s, editor, extra]) => {
        localStorage.setItem('cw_onboarding_seen_v1', 'true');
        localStorage.setItem('cw_ui_lang', u);
        localStorage.setItem('cw_output_lang', s);
        for (const [k, v] of Object.entries(extra)) localStorage.setItem(k, v);

        // O mock não tem editor de notas; este é o mesmo gatilho que o CRM tem
        // (o botão "description" que abre o cartão), como no smoke:precall.
        if (editor) {
            document.querySelector('.content').insertAdjacentHTML('beforeend',
                '<material-fab id="mock-note-fab"><i class="material-icons-extended">description</i></material-fab>');
            document.getElementById('mock-note-fab').addEventListener('click', () => {
                const ed = document.createElement('div');
                ed.className = 'mock-note-editor';
                ed.style.cssText = 'position:fixed;left:-9999px;top:0';
                ed.contentEditable = 'true';
                document.body.appendChild(ed);
            });
        }
    }, [ui, saida, comEditor, storage]);
    await page.addScriptTag({ content: script });

    // A pílula só aparece depois da animação de abertura; o Ctrl+K é
    // registrado já na inicialização. Mesmo caminho do smoke de atalhos.
    await page.waitForSelector('#cw-btn-notes', { state: 'attached', timeout: 30000 });
    await page.waitForTimeout(12000);
    const cancelar = page.locator('#cw-conf-cancel');
    if (await cancelar.isVisible().catch(() => false)) await cancelar.click();

    await page.keyboard.press('Control+k');
    await page.waitForSelector('.cw-palette-overlay.active');
    // Lê os grupos da paleta AQUI, com ela aberta: reabri-la depois custaria
    // um Escape, e o Escape fecha o Case Notes junto.
    const gruposPaleta = await page.locator('.cw-palette-group').allTextContents();
    await page.fill('.cw-palette-input', 'Case Notes');
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    return { page, gruposPaleta };
}

const rotulos = (page) => page.evaluate(() =>
    Array.from(document.querySelectorAll('#notes-assistant-popup label'))
        .map((e) => e.textContent.trim()).filter(Boolean));

// O link da documentação mora em dois lugares do bookmarklet: no "?" de todo
// módulo (aqui, o do Case Notes) e em Configurações. Os dois estão no DOM desde
// o boot, mesmo fechados, então dá para lê-los sem abrir nenhum popup.
const DOCS_URL = readFileSync(resolve(raiz, 'src/modules/shared/config.js'), 'utf8')
    .match(/export const DOCS_URL\s*=\s*"([^"]+)"/)[1];
const linksDeDocs = (page) => page.evaluate(() => {
    // No "?" o rótulo é um <span> dentro do <a>, ao lado do emoji; o texto do
    // <a> inteiro traria o emoji junto.
    const rotuloDoHelp = document.querySelector('#notes-assistant-popup .cw-help-docs-link');
    const configs = document.querySelector('#configs-popup .js-docs-link');
    const lerLink = (a, rotulo) => a && { texto: rotulo.textContent.trim(), href: a.href, alvo: a.target };
    return {
        ajuda: rotuloDoHelp && lerLink(rotuloDoHelp.closest('a'), rotuloDoHelp),
        configs: configs && lerLink(configs, configs),
    };
});
async function confereDocs(page, textoEsperado) {
    const { ajuda, configs } = await linksDeDocs(page);
    for (const [onde, l] of [['"?" do Case Notes', ajuda], ['Configurações', configs]]) {
        if (!l) throw new Error(`${onde}: link da documentação não existe`);
        igual(l.texto, textoEsperado, `${onde}: rótulo`);
        igual(l.href, DOCS_URL, `${onde}: destino`);
        igual(l.alvo, '_blank', `${onde}: abre em outra aba`);
    }
}

console.log('\n--- Smoke: idioma da interface x idioma do atendimento ---');

// ------------------------------------------------- interface EN, nota PT
{
    const { page, gruposPaleta } = await abrirCaseNotes({ ui: 'en', saida: 'pt' });

    await check('a paleta de comandos segue a INTERFACE (en)', async () =>
        igual(gruposPaleta.join('|'), 'My shortcuts|Modules', 'grupos da paleta'));

    await check('o cromo do Case Notes segue a INTERFACE (en)', async () => {
        const t = await page.evaluate(() => ({
            fluxo: document.querySelector('.js-label-fluxo')?.textContent?.trim(),
            status: document.querySelector('.js-label-status')?.textContent?.trim(),
            copiar: document.querySelector('.js-btn-copy')?.textContent?.trim(),
        }));
        igual(t.fluxo, 'Flow:', 'rótulo de fluxo');
        igual(t.status, 'Main Status:', 'rótulo de status');
        igual(t.copiar, 'Copy', 'botão copiar');
    });

    await check('o link da documentação segue a INTERFACE (en), no "?" e em Configurações', () =>
        confereDocs(page, 'Open the documentation'));

    await page.selectOption('#main-status-select', 'NI');
    await page.waitForTimeout(600);
    await page.selectOption('#sub-status-select', 'NI_Awaiting_Inputs');
    await page.waitForTimeout(1500);

    // O coração do teste: estes rótulos são o texto que vai IMPRESSO na nota,
    // então têm de sair em português mesmo com a ferramenta em inglês.
    await check('os rótulos dos campos seguem o ATENDIMENTO (pt)', async () => {
        const ls = (await rotulos(page)).join(' | ');
        for (const esperado of ['Contexto/O que foi feito:', 'Task(s) solicitada(s):', 'Minha Ação:']) {
            contem(ls, esperado, 'rótulos de campo');
        }
        if (/What was done|Requested task|My Action/.test(ls)) {
            throw new Error('rótulo de campo vazou para o inglês: ' + ls.slice(0, 200));
        }
    });

    // O botão de auto-busca mora DENTRO do rótulo do campo, mas é controle da
    // ferramenta e não sai no texto — foi o que o primeiro corte errou.
    await check('controles dentro do rótulo seguem a INTERFACE (en)', async () => {
        const ls = (await rotulos(page)).join(' | ');
        contem(ls, 'Auto Search', 'botão de auto-busca');
        if (ls.includes('Auto Busca')) throw new Error('auto-busca ainda em português');
    });

    await page.close();
}

// ------------------------------- o caso comum: os dois iguais, nada muda
{
    const { page } = await abrirCaseNotes({ ui: 'pt', saida: 'pt' });
    await check('o link da documentação, em pt, no "?" e em Configurações', () =>
        confereDocs(page, 'Abrir a documentação'));
    await check('com os dois knobs em pt, tudo continua em português', async () => {
        igual(await page.evaluate(() => document.querySelector('.js-label-fluxo')?.textContent?.trim()),
            'Fluxo:', 'rótulo de fluxo');
        await page.selectOption('#main-status-select', 'NI');
        await page.waitForTimeout(600);
        await page.selectOption('#sub-status-select', 'NI_Awaiting_Inputs');
        await page.waitForTimeout(1500);
        contem((await rotulos(page)).join(' | '), 'Minha Ação:', 'rótulos de campo');
    });
    await page.close();
}

// --------------------------------------- interface pt, atendimento en
{
    const { page } = await abrirCaseNotes({ ui: 'pt', saida: 'en' });
    await check('o inverso também vale: ferramenta em pt, nota em inglês', async () => {
        igual(await page.evaluate(() => document.querySelector('.js-label-fluxo')?.textContent?.trim()),
            'Fluxo:', 'rótulo de fluxo');
        await page.selectOption('#main-status-select', 'NI');
        await page.waitForTimeout(600);
        await page.selectOption('#sub-status-select', 'NI_Awaiting_Inputs');
        await page.waitForTimeout(1500);
        const ls = (await rotulos(page)).join(' | ');
        contem(ls, 'My Action:', 'rótulos de campo');
        if (ls.includes('Minha Ação:')) throw new Error('rótulo de campo ficou em português');
    });
    await page.close();
}

// ----------------------- troca da interface com o app JÁ montado
// O perfil (que decide o idioma) chega depois do boot, então o app monta a tela
// num idioma e é repintado em outro. O que um módulo desenha uma vez só tem de
// ser repintado pelo handler da troca: o estado vazio do Case Notes e do Email
// Assistant ficava preso em português, e nenhum teste que SOBE o app já no
// idioma certo (os blocos acima) enxerga isso.
{
    const { page } = await abrirCaseNotes({ ui: 'pt', saida: 'pt' });
    const trocar = (lang) => page.evaluate((l) =>
        document.querySelector(`#cw-config-lang-toggle button[data-lang="${l}"]`).click(), lang);
    const lerVazios = () => page.evaluate(() => ({
        notes: document.querySelector('#notes-empty-state')?.textContent.replace(/\s+/g, ' ').trim(),
        email: document.querySelector('.cw-email-preview-content')?.textContent.replace(/\s+/g, ' ').trim(),
        botoes: Array.from(document.querySelectorAll('#email-assistant-popup .cw-email-preview-actions button'))
            .map((b) => b.textContent.trim()),
    }));
    // Tudo isto está no DOM desde o boot, mesmo com o módulo fechado.
    const lerNotes = () => page.evaluate(() => {
        const texto = (sel) => document.querySelector(sel)?.textContent.replace(/\s+/g, ' ').trim();
        const botoes = Array.from(document.querySelectorAll('#notes-assistant-popup button')).map((b) => b.textContent.trim());
        return {
            botoes,
            sop: Array.from(document.querySelectorAll('#notes-assistant-popup div'))
                .map((d) => d.textContent.replace(/\s+/g, ' ').trim())
                .filter((t) => /Out of Scope Check/.test(t) && t.length < 140)
                .sort((a, b) => a.length - b.length)[0],
            ajudaTasks: texto('#notes-assistant-popup .cw-helper-text'),
            placeholder: texto('#main-status-select option[value=""]'),
            toggleSplit: Array.from(document.querySelectorAll('#notes-assistant-popup [title]'))
                .map((e) => e.title).find((t) => /Split/.test(t)),
        };
    });
    const lerBau = () => page.evaluate(() => {
        const texto = (sel) => document.querySelector(sel)?.textContent.replace(/\s+/g, ' ').trim();
        const nova = document.querySelector('#bau-form-popup select[name="availabilityTimezone"] option[value="America/New_York"]');
        return {
            cartao: texto('#bau-opt-full .bau-branching-title'),
            confirmacao: texto('#bau-step-4 .bau-step-title'),
            rotulo: texto('#wrapper-advName .bau-label'),
            fuso: nova?.textContent.trim(),
        };
    });

    const ESPERADO = {
        es: {
            titulo: '¿Listo para empezar?', copiar: 'Copiar HTML', preencher: 'Rellenar en el CRM',
            voltar: 'Volver', gerar: 'Generar Nota', sop: 'Asegúrate de consultar el', ajuda: 'Atajos para',
            placeholder: 'Seleccione', toggle: 'Cambiar a Split & Transfer',
            cartao: 'Abrir caso para BAU', confirmacao: 'Confirma los datos antes de enviar',
            rotulo: 'Nombre del Anunciante', fuso: 'EE. UU. — Eastern — Nueva York',
            cancelar: 'Cancelar',
        },
        en: {
            titulo: 'Ready to start?', copiar: 'Copy HTML', preencher: 'Fill in CRM',
            voltar: 'Back', gerar: 'Generate Note', sop: 'Make sure to check the', ajuda: 'Shortcuts for',
            placeholder: 'Select', toggle: 'Switch to Split & Transfer',
            cartao: 'Open a case for BAU', confirmacao: 'Confirm the data before sending',
            rotulo: 'Advertiser Name', fuso: 'USA — Eastern — New York',
            cancelar: 'Cancel',
        },
        pt: {
            titulo: 'Pronto para começar?', copiar: 'Copiar HTML', preencher: 'Preencher no CRM',
            voltar: 'Voltar', gerar: 'Gerar Nota', sop: 'Certifique-se de consultar o', ajuda: 'Atalhos para',
            placeholder: 'Selecione', toggle: 'Alternar para Split & Transfer',
            cartao: 'Abrir caso para BAU', confirmacao: 'Confirme os dados antes de enviar',
            rotulo: 'Nome do Anunciante', fuso: 'EUA — Eastern — Nova York',
            cancelar: 'Cancelar',
        },
    };
    for (const lang of ['es', 'en', 'pt']) {
        const e = ESPERADO[lang];
        await trocar(lang);
        await page.waitForTimeout(400);

        await check(`o estado vazio do Case Notes e do Email Assistant seguem a troca para ${lang}`, async () => {
            const v = await lerVazios();
            contem(v.notes, e.titulo, 'estado vazio do Case Notes');
            contem(v.email, e.titulo, 'estado vazio do Email Assistant');
            igual(v.botoes.slice(1).join('|'), `${e.copiar}|${e.preencher}`, 'botões do Email Assistant');
        });

        await check(`o Split & Transfer e o seletor de tasks do Case Notes seguem a troca para ${lang}`, async () => {
            const n = await lerNotes();
            for (const b of [e.voltar, e.gerar]) {
                if (!n.botoes.includes(b)) throw new Error(`botão "${b}" não achado em ${JSON.stringify(n.botoes.slice(0, 12))}`);
            }
            contem(n.sop, e.sop, 'aviso do SOP do Split & Transfer');
            contem(n.ajudaTasks, e.ajuda, 'ajuda do seletor de tasks');
            igual(n.placeholder, e.placeholder, 'placeholder do status');
            igual(n.toggleSplit, e.toggle, 'título do botão de alternar o Split');
        });

        // O diálogo só existe quando alguém o abre, então nenhuma leitura do DOM
        // do boot o enxerga: abre-se um de verdade ("Resetar Script" usa o
        // confirmDialog compartilhado) e lê-se o botão de cancelar.
        await check(`o diálogo de confirmação compartilhado segue a troca para ${lang}`, async () => {
            await page.evaluate(() => document.querySelector('#call-script-popup .csa-reset-btn').click());
            await page.waitForSelector('#cw-conf-cancel');
            try {
                igual((await page.locator('#cw-conf-cancel').textContent()).trim(), e.cancelar, 'botão cancelar do diálogo');
            } finally {
                // Fecha mesmo falhando: um diálogo esquecido aberto derrubaria os checks seguintes.
                await page.locator('#cw-conf-cancel').click();
                await page.waitForSelector('#cw-conf-cancel', { state: 'detached' });
            }
        });

        // O formulário BAU é montado uma vez, no boot, e "Novo caso" só o reseta:
        // com o dashboard na tela (como aqui) ele tem de ser repintado mesmo assim.
        await check(`o formulário BAU (montado no boot) segue a troca para ${lang}`, async () => {
            const b = await lerBau();
            igual(b.cartao, e.cartao, 'cartão "abrir caso"');
            igual(b.confirmacao, e.confirmacao, 'título da confirmação');
            igual(b.rotulo, e.rotulo, 'rótulo do primeiro campo');
            if (!b.fuso) throw new Error('a opção America/New_York sumiu — o value do fuso mudou');
            contem(b.fuso, e.fuso, 'nome do fuso (só o texto muda, o value é a zona)');
        });
    }
    await page.close();
}

// ------------- o idioma da nota sobrevive ao "reinício" do Case Notes (A1, A2)
// Os blocos acima sobem o app e olham a PRIMEIRA nota - o único momento em que
// o idioma estava certo. NotesState.reset() devolvia o idioma da nota para PT, e
// resetModule() roda em "Limpar", em todo atalho do Ctrl+K e depois de inserir
// uma nota: do 2º caso em diante a nota saía em PT para um agente ES ou EN, sem
// nenhum aviso. Por isso o teste percorre a sessão inteira, com os DOIS knobs
// no mesmo idioma - o que o ADR-0016 diz ser o caso comum.
{
    const NOTA = {
        pt: { contexto: 'Contexto/O que foi feito:', corpo: 'Fiz a primeira tentativa de ligação', rodape: 'Nota criada através do Cases Wizard.' },
        es: { contexto: 'Contexto/Qué se hizo:', corpo: 'Hice el primer intento de llamada', rodape: 'Nota creada a través de Cases Wizard.' },
        en: { contexto: 'Context/What was done:', corpo: 'I made the first call attempt', rodape: 'Note created through Cases Wizard.' },
    };
    const SUBSTATUS = 'NI_Attempted_Contact';

    const escolherSubstatus = async (page) => {
        await page.selectOption('#main-status-select', 'NI');
        await page.waitForTimeout(600);
        await page.selectOption('#sub-status-select', SUBSTATUS);
        await page.waitForTimeout(1500);
    };
    // Rótulo do campo "Contexto" no idioma esperado e em NENHUM dos outros.
    const confereRotulo = async (page, lang, onde) => {
        const ls = (await rotulos(page)).join(' | ');
        contem(ls, NOTA[lang].contexto, `rótulo do campo (${onde})`);
        for (const outro of Object.keys(NOTA).filter((l) => l !== lang)) {
            if (ls.includes(NOTA[outro].contexto)) {
                throw new Error(`${onde}: rótulo em ${outro} com a nota em ${lang}: ${ls.slice(0, 160)}`);
            }
        }
    };
    const dispararAtalhoPadrao = async (page) => {
        await page.keyboard.press('Control+k');
        await page.waitForSelector('.cw-palette-overlay.active');
        await page.keyboard.press('Enter'); // o 1º item é o atalho padrão "NI Attempted"
        // Com a nota suja, o atalho pede confirmação antes de substituí-la.
        const ok = page.locator('#cw-conf-ok');
        try { await ok.waitFor({ state: 'visible', timeout: 2500 }); await ok.click(); } catch (e) { /* nota limpa: sem diálogo */ }
        await page.waitForTimeout(4000);
    };

    for (const lang of ['en', 'es', 'pt']) {
        const e = NOTA[lang];
        const { page } = await abrirCaseNotes({ ui: lang, saida: lang, comEditor: true });
        await escolherSubstatus(page);

        await check(`${lang}/${lang}: a 1ª nota da sessão sai em ${lang} (controle)`, () =>
            confereRotulo(page, lang, '1ª abertura'));

        await check(`${lang}/${lang}: depois de "Limpar" a nota continua em ${lang}`, async () => {
            await page.click('.js-btn-reset');
            await page.waitForTimeout(500);
            await escolherSubstatus(page);
            await confereRotulo(page, lang, 'depois de Limpar');
        });

        await check(`${lang}/${lang}: o atalho do Ctrl+K abre a nota em ${lang}, rótulos e texto do cenário`, async () => {
            await dispararAtalhoPadrao(page);
            await confereRotulo(page, lang, 'atalho do Ctrl+K');
            const corpo = await page.locator('#field-CONTEXTO_CALL').inputValue();
            contem(corpo, e.corpo, 'texto do cenário aplicado pelo atalho');
            for (const outro of Object.keys(NOTA).filter((l) => l !== lang)) {
                if (corpo.includes(NOTA[outro].corpo)) throw new Error(`texto do cenário em ${outro} com a nota em ${lang}`);
            }
        });

        // A nota inserida é o que de fato vai para o CRM: o rodapé fecha o texto
        // e também é do idioma do atendimento (A2).
        await check(`${lang}/${lang}: a nota inserida no CRM termina com o rodapé em ${lang}`, async () => {
            await page.evaluate(() => { const c = document.getElementById('email-automation-checkbox'); if (c) c.checked = false; });
            await page.click('.js-btn-generate');
            await page.waitForFunction(() => /Cases Wizard/.test(document.querySelector('.mock-note-editor')?.innerText || ''), null, { timeout: 15000 });
            const nota = (await page.evaluate(() => document.querySelector('.mock-note-editor').innerText)).trim();
            contem(nota, e.contexto, 'rótulo na nota inserida');
            if (!nota.endsWith(e.rodape)) throw new Error(`rodapé esperado ${JSON.stringify(e.rodape)}, a nota termina em ${JSON.stringify(nota.slice(-60))}`);
            for (const outro of Object.keys(NOTA).filter((l) => l !== lang)) {
                if (nota.includes(NOTA[outro].rodape)) throw new Error(`rodapé em ${outro} na nota em ${lang}`);
            }
        });

        await check(`${lang}/${lang}: depois de inserir a nota, o próximo caso continua em ${lang}`, async () => {
            // Inserir a nota fecha o Case Notes: reabre pela pílula, como o agente.
            await page.waitForTimeout(1500);
            await page.evaluate(() => document.getElementById('cw-btn-notes').click());
            await page.waitForSelector('#notes-assistant-popup #main-status-select', { state: 'visible', timeout: 8000 });
            await page.waitForTimeout(800);
            await escolherSubstatus(page);
            await confereRotulo(page, lang, 'depois de inserir a nota');
        });

        await page.close();
    }
}

// --------------------------- textos soltos do Case Notes, BAU Form e Biblioteca
// Três textos cravados em PT que nenhum dicionário alcançava: o aviso do Win
// Criteria na lista de screenshots, a dica de erro do CID sob o campo (o toast
// já era traduzido; a dica era gravada uma vez, na criação) e a etiqueta de
// mídia dos snippets da biblioteca. O EN abre em pt e troca depois do boot,
// que é como o perfil faz.
{
    const ESPERADO = {
        pt: { aviso: 'Os screenshots seguem as diretrizes atuais do Win Criteria e políticas de Tag Support.', cid: 'Formato de CID incorreto', midia: 'Mídia' },
        es: { aviso: 'Los screenshots siguen las directrices actuales de Win Criteria y las políticas de Tag Support.', cid: 'Formato de CID incorrecto', midia: 'Multimedia' },
        en: { aviso: 'Screenshots follow the current Win Criteria guidelines and Tag Support policies.', cid: 'Incorrect CID format', midia: 'Media' },
    };
    // Um snippet rico com imagem; _pendingSync impede a sincronia de descartá-lo.
    const BIBLIOTECA = JSON.stringify([{
        id: 'local_teste', type: 'general', title: 'Teste', subject: '', isCode: false, isRich: true,
        content: '<p>texto</p><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">',
        updated: new Date().toISOString(), _pendingSync: true,
    }]);

    for (const [lang, abreEm] of [['es', 'es'], ['pt', 'pt'], ['en', 'pt']]) {
        const e = ESPERADO[lang];
        const { page } = await abrirCaseNotes({ ui: abreEm, saida: abreEm, storage: { cw_personal_library_v1: BIBLIOTECA } });
        if (lang !== abreEm) {
            await page.evaluate((l) => document.querySelector(`#cw-config-lang-toggle button[data-lang="${l}"]`).click(), lang);
            await page.waitForTimeout(400);
        }

        await check(`${lang}: o aviso do Win Criteria na lista de screenshots`, async () => {
            await page.selectOption('#main-status-select', 'SO');
            await page.waitForTimeout(600);
            await page.selectOption('#sub-status-select', 'SO_Implementation_Only');
            await page.waitForTimeout(1500);
            await page.evaluate(() => document.querySelector('[data-id="quickfill-gtm-install"]').click());
            await page.waitForTimeout(1200);
            const avisos = await page.$$eval('#notes-assistant-popup .cw-info-banner', (els) => els.map((x) => x.textContent.replace(/\s+/g, ' ').trim()));
            if (!avisos.some((a) => a.includes(e.aviso))) throw new Error(`não achei ${JSON.stringify(e.aviso)} em ${JSON.stringify(avisos)}`);
        });

        await check(`${lang}: a dica de erro do CID sob o campo${lang !== abreEm ? ' (troca depois do boot)' : ''}`, async () => {
            igual(await page.evaluate(() => document.querySelector('#bau-cid-error')?.textContent.trim()), e.cid, 'dica do CID');
        });

        await check(`${lang}: a etiqueta de mídia do snippet`, async () => {
            await page.evaluate(() => document.getElementById('cw-btn-library').click());
            await page.waitForSelector('#library-popup .cw-lib-media-tag', { timeout: 8000 });
            igual(await page.locator('#library-popup .cw-lib-media-tag').first().textContent().then((t) => t.trim()), e.midia, 'etiqueta de mídia');
        });
        await page.close();
    }
}

// ------------------------------------------ datas e horas na tela (C3)
// O eco do horário do BAU Form e as horas do Timezone liam o locale `pt-BR` (o
// Timezone, `es-ES` para ES); a data do detalhe do caso, também. O formato da
// data em si está em `test:i18n`; aqui, o que só o navegador mostra. 14:00 em
// Nova York (setembro, horário de verão) são 15:00 em Brasília, no mesmo dia.
{
    const ECO = { pt: /05\/09,? 15:00/, es: /5\/9,? 15:00/, en: /05 Sept?,? 15:00/ };
    for (const lang of ['en', 'es', 'pt']) {
        const { page } = await abrirCaseNotes({ ui: lang, saida: lang });

        await check(`${lang}: o eco "Nova York -> Brasília" do BAU Form usa o formato do idioma`, async () => {
            const eco = await page.evaluate(() => {
                const tz = document.querySelector('select[name="availabilityTimezone"]');
                const set = (el, v) => { el.value = v; el.dispatchEvent(new Event('change', { bubbles: true })); };
                set(document.querySelector('input[name="availability_1_date"]'), '2026-09-05');
                set(document.querySelector('select[name="availability_1_time"]'), '14:00');
                set(tz, 'America/New_York');
                return document.querySelector('#bau-availability-echo')?.textContent.replace(/\s+/g, ' ').trim();
            });
            if (!ECO[lang].test(eco || '')) throw new Error(`eco ${JSON.stringify(eco)} não casa com ${ECO[lang]}`);
            if (lang === 'en' && /\b\d\d\/\d\d\b/.test(eco)) throw new Error('EN com dia/mês numérico ambíguo: ' + eco);
        });

        if (lang === 'en') {
            // O Timezone descobre a hora lendo o texto antes do ":" - com 12 h
            // ("3:27 PM") o status aberto/fechado dos cartões erraria em silêncio.
            await check('en: as horas do Timezone são 24 h (o status aberto/fechado depende disso)', async () => {
                await page.evaluate(() => document.getElementById('cw-btn-timezone').click());
                await page.waitForTimeout(1800);
                const texto = await page.evaluate(() => document.querySelector('#timezone-popup').innerText);
                if (/\b(AM|PM)\b/i.test(texto)) throw new Error('hora em 12 h no Timezone');
                if (!/\b\d{2}:\d{2}\b/.test(texto)) throw new Error('nenhuma hora HH:MM no Timezone');
            });
        }
        await page.close();
    }
}

// ------------------------------------------- o Ctrl+K nos três idiomas (C2)
// 11 das 12 linhas ficavam em PT com a ferramenta em EN: o hint só existia em
// PT/ES (menos o Pre-call) e cinco rótulos eram texto fixo. Confere as 10 linhas
// de módulo, inteiras (rótulo + hint), e a busca entre idiomas: o agente que
// digita "biblioteca" com a ferramenta em EN acha "My Library".
{
    const MODULOS = {
        pt: [
            ['Case Notes', 'Montar a nota técnica do caso'], ['Pre-call Checklist', 'Checklist antes da ligação, direto na nota'],
            ['BAU Form', 'Solicitação de criação/descarte BAU'], ['Email Assistant', 'Templates inteligentes de e-mail'],
            ['Call Script', 'Guia interativo de chamada'], ['Central de Links', 'Ferramentas, SOPs e atalhos'],
            ['Minha Biblioteca', 'Snippets e respostas salvas'], ['Fusos Horários', 'Monitoramento e planejador de chamada'],
            ['Avisos', 'Comunicados e disponibilidade BAU'], ['Configurações', 'Perfil, som e preferências'],
        ],
        es: [
            ['Case Notes', 'Armar la nota técnica del caso'], ['Pre-call Checklist', 'Checklist antes de la llamada, directo en la nota'],
            ['BAU Form', 'Solicitud de creación/descarte BAU'], ['Email Assistant', 'Plantillas inteligentes de correo'],
            ['Call Script', 'Guía interactiva de llamada'], ['Central de Enlaces', 'Herramientas, SOPs y atajos'],
            ['Mi Biblioteca', 'Snippets y respuestas guardadas'], ['Husos Horarios', 'Monitoreo y planificador de llamada'],
            ['Avisos', 'Comunicados y disponibilidad BAU'], ['Configuración', 'Perfil, sonido y preferencias'],
        ],
        en: [
            ['Case Notes', 'Build the technical note for the case'], ['Pre-call Checklist', 'Checklist before the call, straight into the note'],
            ['BAU Form', 'Request to create/discard a BAU case'], ['Email Assistant', 'Smart email templates'],
            ['Call Script', 'Interactive call guide'], ['Links Central', 'Tools, SOPs and shortcuts'],
            ['My Library', 'Saved snippets and replies'], ['Time Zones', 'Monitoring and call planner'],
            ['Broadcast', 'Announcements and BAU availability'], ['Settings', 'Profile, sound and preferences'],
        ],
    };
    const DICA_ATALHO = { pt: 'Atalho de nota · abre pré-preenchida', es: 'Atajo de nota · abre precompletada', en: 'Note shortcut · opens pre-filled' };
    const linhasDaPaleta = (page) => page.$$eval('.cw-palette-item', (els) => els.map((e) => [
        e.querySelector('.cw-palette-item-label').textContent.trim(),
        e.querySelector('.cw-palette-item-hint').textContent.trim(),
    ]));

    // [idioma, idioma de abertura, busca entre idiomas e o que ela deve achar]
    for (const [lang, abreEm, busca, acha] of [
        ['es', 'es', 'settings', 'Configuración'],
        ['pt', 'pt', 'library', 'Minha Biblioteca'],
        // O caso real: o app sobe em pt e o perfil troca o idioma depois do boot.
        ['en', 'pt', 'biblioteca', 'My Library'],
    ]) {
        const { page } = await abrirCaseNotes({ ui: abreEm, saida: abreEm });
        if (lang !== abreEm) {
            await page.evaluate((l) => document.querySelector(`#cw-config-lang-toggle button[data-lang="${l}"]`).click(), lang);
            await page.waitForTimeout(400);
        }
        await page.keyboard.press('Control+k');
        await page.waitForSelector('.cw-palette-overlay.active');
        const linhas = await linhasDaPaleta(page);

        await check(`palette ${lang}${lang !== abreEm ? ` (troca depois do boot, vinda de ${abreEm})` : ''}: os 10 módulos, rótulo e hint, no idioma`, async () => {
            igual(JSON.stringify(linhas.slice(-10)), JSON.stringify(MODULOS[lang]), 'linhas de módulo');
        });
        await check(`palette ${lang}: o hint dos atalhos do agente também`, async () => {
            for (const [, hint] of linhas.slice(0, -10)) igual(hint, DICA_ATALHO[lang], 'hint do atalho');
        });
        await check(`palette ${lang}: digitar "${busca}" (outro idioma) acha "${acha}"`, async () => {
            await page.fill('.cw-palette-input', busca);
            await page.waitForTimeout(300);
            const achados = (await linhasDaPaleta(page)).map(([l]) => l);
            if (!achados.includes(acha)) throw new Error(`${JSON.stringify(acha)} não está em ${JSON.stringify(achados)}`);
        });
        await page.close();
    }
}

// --------------------------------------------------- a splash de abertura (C1)
// A saudação não consultava idioma nenhum: PT até com a ferramenta em EN ou ES.
// E ela roda ANTES de o perfil chegar (o e-mail que o busca é capturado dentro
// dela), então quem depende só do perfil precisa do último idioma guardado.
// O relógio é fixado numa sexta de manhã: prefixo, selo e a frase (uma de duas)
// ficam determinísticos.
{
    const SAUDACAO = {
        pt: { prefixo: 'Bom dia,', frases: ['O último gás antes do descanso.', 'Vamos fechar com chave de ouro.'], selo: '🎉 Sextou!' },
        es: { prefixo: 'Buenos días,', frases: ['El último empujón antes del descanso.', 'Cerremos con broche de oro.'], selo: '🎉 ¡Es viernes!' },
        en: { prefixo: 'Good morning,', frases: ['Last push before the break.', "Let's close the week strong."], selo: "🎉 It's Friday!" },
    };

    async function lerSplash(chaves) {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        await page.route('**script.google.com/**', (route) => route.abort());
        page.on('pageerror', (e) => { console.log('  ! erro de página: ' + e.message); fail++; });
        await page.clock.setFixedTime(new Date('2026-10-30T09:00:00'));
        await page.goto('file://' + resolve(raiz, 'mock-crm.html'));
        await page.evaluate((c) => {
            localStorage.setItem('cw_onboarding_seen_v1', 'true');
            for (const [k, v] of Object.entries(c)) localStorage.setItem(k, v);
        }, chaves);
        await page.addScriptTag({ content: script });

        const lido = { prefixo: '', frase: '', selo: '' };
        const inicio = Date.now();
        while (Date.now() - inicio < 12000) {
            const f = await page.evaluate(() => {
                const s = document.getElementById('techsol-splash-screen');
                if (!s) return null;
                const txt = (sel) => s.querySelector(sel)?.textContent.trim() || '';
                return { prefixo: txt('#p1'), frase: txt('#p3'), selo: txt('.sextou-badge') };
            });
            if (f) for (const k of Object.keys(lido)) if (f[k]) lido[k] = f[k];
            await page.waitForTimeout(250);
        }
        await page.close();
        return lido;
    }

    const confereSplash = (lido, lang) => {
        const e = SAUDACAO[lang];
        igual(lido.prefixo, e.prefixo, 'prefixo da saudação');
        if (!e.frases.includes(lido.frase)) throw new Error(`frase ${JSON.stringify(lido.frase)} não é uma das de ${lang}: ${JSON.stringify(e.frases)}`);
        igual(lido.selo, e.selo, 'selo de sexta');
        for (const outro of Object.keys(SAUDACAO).filter((l) => l !== lang)) {
            if (lido.prefixo === SAUDACAO[outro].prefixo || lido.selo === SAUDACAO[outro].selo) throw new Error(`splash em ${outro} com a ferramenta em ${lang}`);
        }
    };

    await check('splash: escolha manual da interface em en', async () =>
        confereSplash(await lerSplash({ cw_ui_lang: 'en', cw_output_lang: 'en' }), 'en'));
    await check('splash: só o último perfil guardado (es), sem escolha manual, já abre em es', async () =>
        confereSplash(await lerSplash({ cw_profile_lang: 'es' }), 'es'));
    await check('splash: só o último perfil guardado (en), sem escolha manual, já abre em en', async () =>
        confereSplash(await lerSplash({ cw_profile_lang: 'en' }), 'en'));
    await check('splash: sem nada guardado abre em pt (controle)', async () =>
        confereSplash(await lerSplash({}), 'pt'));
}

await browser.close();
console.log(fail ? `\n✗ smoke de idioma: ${fail} falha(s)\n` : '\n✓ smoke de idioma: 0 falhas\n');
process.exit(fail ? 1 : 0);
