// scripts/test-note-templates.mjs
//
// Prova que os modelos publicados na Central reconstroem os cenários do agente
// sem perda: semear a partir do scenarioSnippets e reaplicar tem que devolver os
// mesmos cenários, com os mesmos campos, escopo e substatus.
//
// O risco aqui é específico: o serviço REESCREVE scenarioSnippets e SCENARIO_ES
// no lugar, para que os chips, o applyScenario() e o openWithPreset() continuem
// funcionando sem alteração. Se essa reescrita errar a forma, nada quebra
// visivelmente - o agente só passa a ver menos cenários, ou cenários que
// preenchem campo errado, no meio de um atendimento.
//
// Uso: npm run test:note-templates

import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const store = {};
globalThis.window = { location: { hostname: 'localhost' } };
globalThis.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
};
globalThis.document = { createElement: () => ({}), body: { appendChild() { }, contains: () => false } };

const seed = JSON.parse(
    readFileSync(resolve(here, '../gas-backend/seeds/note-templates-seed.json'), 'utf8')
);

// Semeia o cache: é o caminho do primeiro render, e evita stubar JSONP.
store['cw_content_note_template'] = JSON.stringify(
    seed.items.map((it, idx) => ({
        id: 'itm_' + idx,
        key: it.key,
        field: it.field,
        lang: it.lang,
        label: it.label,
        value: it.value,
        sortOrder: it.sortOrder ?? idx,
    }))
);

const bundled = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/note-templates-service.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});

const mod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', bundled.outputFiles[0].text)(mod, mod.exports, require);

// O bundle traz notes-data junto, então dá pra observar o efeito da reescrita
// nas MESMAS estruturas que o resto do módulo lê.
const notesBundle = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/notes-data.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});
const notesMod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', notesBundle.outputFiles[0].text)(notesMod, notesMod.exports, require);

const originais = JSON.parse(JSON.stringify(notesMod.exports.scenarioSnippets));

const { loadNoteTemplates } = mod.exports;
await loadNoteTemplates();

// O serviço reescreve a cópia que ELE importou; para inspecionar, reimportamos a
// partir do mesmo bundle do serviço.
const svcBundle = await build({
    entryPoints: [resolve(here, '../src/modules/notes/data/note-templates-service.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
    footer: { js: 'module.exports.__scenarios = scenarioSnippets; module.exports.__es = SCENARIO_ES; module.exports.__en = SCENARIO_EN;' },
});
const svcMod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', svcBundle.outputFiles[0].text)(svcMod, svcMod.exports, require);
await svcMod.exports.loadNoteTemplates();

const depois = svcMod.exports.__scenarios;
const depoisEs = svcMod.exports.__es;
const depoisEn = svcMod.exports.__en;

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

console.log('\n--- Modelos de nota: round-trip para o agente ---');

check('a reescrita aconteceu', () => {
    if (!Object.keys(depois).length) throw new Error('scenarioSnippets ficou vazio');
});

check('todo cenário tem substatus e tipo, como os chips esperam', () => {
    for (const [id, s] of Object.entries(depois)) {
        if (!Array.isArray(s.substatus) || !s.substatus.length) {
            throw new Error(`${id}: sem substatus (o chip nunca apareceria)`);
        }
        if (!['all', 'bau', 'lm'].includes(s.type)) {
            throw new Error(`${id}: tipo inválido "${s.type}"`);
        }
    }
});

check('todo cenário preenche pelo menos um campo', () => {
    for (const [id, s] of Object.entries(depois)) {
        const campos = Object.keys(s).filter((k) => k.startsWith('field-'));
        if (!campos.length) throw new Error(`${id}: nenhum campo`);
    }
});

check('os textos publicados chegam intactos', () => {
    // Compara contra o payload semeado, não contra os originais: a migração
    // descartou de propósito os campos que o substatus não tem (já eram
    // ignorados). O que foi publicado tem que chegar byte a byte.
    for (const item of seed.items) {
        if (item.lang !== 'PT') continue;
        const v = JSON.parse(item.value);

        const alvo = Object.entries(depois).find(
            ([, s]) => s.substatus[0] === item.key &&
                Object.entries(v.fields).every(([k, val]) => s[k] === val)
        );
        if (!alvo) {
            throw new Error(`não achei o cenário publicado "${item.label}" (${item.key}) com os textos originais`);
        }
    }
});

check('cada cenário tem sua tradução em ES', () => {
    const semEs = Object.keys(depois).filter((id) => !depoisEs[id]);
    if (semEs.length) {
        throw new Error(`${semEs.length} cenários sem ES: ${semEs.slice(0, 3).join(', ')}`);
    }
});

check('cada cenário tem sua tradução em EN', () => {
    const semEn = Object.keys(depois).filter((id) => !depoisEn[id]);
    if (semEn.length) {
        throw new Error(`${semEn.length} cenários sem EN: ${semEn.slice(0, 3).join(', ')}`);
    }
});

check('nenhuma tradução muda o substatus nem o tipo', () => {
    // Os espelhos sobrescrevem só texto; se vazasse metadado, o cenário
    // apareceria no lugar errado quando o agente trocasse o idioma.
    for (const [lang, espelho] of [['ES', depoisEs], ['EN', depoisEn]]) {
        for (const [id, tr] of Object.entries(espelho)) {
            if (tr.substatus !== undefined) throw new Error(`${id}: ${lang} carregou substatus`);
            if (tr.type !== undefined) throw new Error(`${id}: ${lang} carregou type`);
            void depois[id];
        }
    }
});

check('a linha EN não sobrescreve o cenário em português', () => {
    // A linha EN tem o MESMO `key` da PT, então um roteamento por "se é ES,
    // espelho; senão, base" a empurrava para a base e trocava o texto do
    // agente PT por inglês, sem erro nenhum. Compara contra o seed PT.
    for (const item of seed.items) {
        if (item.lang !== 'PT') continue;
        const esperado = JSON.parse(item.value).fields;
        const alvo = Object.values(depois).find(
            (sc) => sc.substatus[0] === item.key &&
                Object.entries(esperado).every(([k, v]) => sc[k] === v)
        );
        if (!alvo) throw new Error(`cenário "${item.label}" (${item.key}) não chegou em PT`);
    }
});

check('tarefas vinculadas sobrevivem à migração', () => {
    // linkedTask/activeTasks não são campos de texto: se sumissem, o cenário
    // deixaria de marcar a tarefa e ninguém associaria a causa.
    // Só as linhas PT viram cenário: as ES viram overlay de texto em
    // SCENARIO_ES, que de propósito não carrega metadado.
    const comTarefaNoSeed = seed.items.filter((i) => {
        if (i.lang !== 'PT') return false;
        const v = JSON.parse(i.value);
        return v.linkedTask || v.activeTasks;
    });
    const comTarefaDepois = Object.values(depois).filter((s) => s.linkedTask || s.activeTasks);

    if (comTarefaNoSeed.length !== comTarefaDepois.length) {
        throw new Error(`${comTarefaNoSeed.length} no seed viraram ${comTarefaDepois.length}`);
    }
});

check('nenhum cenário preenche campo que o substatus não tem', () => {
    // A falha silenciosa que a migração expôs: applyScenario() ignora campo
    // inexistente sem avisar, e o texto simplesmente nunca aparece.
    const { SUBSTATUS_TEMPLATES } = notesMod.exports;
    for (const [id, s] of Object.entries(depois)) {
        const tpl = SUBSTATUS_TEMPLATES[s.substatus[0]];
        if (!tpl) throw new Error(`${id}: substatus inexistente ${s.substatus[0]}`);

        const fora = Object.keys(s)
            .filter((k) => k.startsWith('field-'))
            .map((k) => k.replace('field-', ''))
            .filter((f) => !(tpl.templateFields || []).includes(f));

        if (fora.length) throw new Error(`${id}: campos fora do template: ${fora.join(', ')}`);
    }
});

// --- A planilha real ainda não tem as linhas EN ---
//
// `seedContentModule` é semeadura de PRIMEIRA VEZ: num módulo que já tem itens
// no ar ele devolve `skipped`. Então, publicada a versão com EN, a Central
// segue servindo só PT/ES por um tempo indeterminado — e é nesse estado que o
// agente EN vive até alguém traduzir pela tela.
//
// O que se confere é o que o app FAZ: procurar o texto do cenário publicado
// pelo id dele, como `getScenarioFields` faz. Contar entradas do espelho (a
// versão anterior desta checagem) passava verde com 0 de 26 cenários achando o
// EN: o espelho embutido é chaveado por `quickfill-*` e a publicação renomeia
// os ids para `cw-<substatus>-<nome>`.
async function hidratar(linhas) {
    for (const k of Object.keys(store)) delete store[k];
    store['cw_content_note_template'] = JSON.stringify(
        linhas.map((it, idx) => ({
            id: 'itm_' + idx, key: it.key, field: it.field, lang: it.lang,
            label: it.label, value: it.value, sortOrder: it.sortOrder ?? idx,
        }))
    );
    const b = await build({
        entryPoints: [resolve(here, '../src/modules/notes/data/note-templates-service.js')],
        bundle: true,
        write: false,
        format: 'cjs',
        platform: 'node',
        logLevel: 'silent',
        footer: { js: 'module.exports.__en = SCENARIO_EN; module.exports.__es = SCENARIO_ES; module.exports.__sc = scenarioSnippets;' },
    });
    const m = { exports: {} };
    // eslint-disable-next-line no-new-func
    new Function('module', 'exports', 'require', b.outputFiles[0].text)(m, m.exports, require);
    await m.exports.loadNoteTemplates();
    return { en: m.exports.__en, es: m.exports.__es, sc: m.exports.__sc };
}

// O texto embutido de um cenário publicado: o mesmo slug, no espelho que o
// código traz de fábrica (instância separada, nunca reescrita).
const { SCENARIO_EN: EN_DE_FABRICA, SCENARIO_ES: ES_DE_FABRICA, scenarioSlug } = notesMod.exports;
const deFabrica = (mapa, idPublicado, substatus) => {
    const slug = scenarioSlug(idPublicado, substatus);
    const id = Object.keys(mapa).find((k) => scenarioSlug(k, substatus) === slug);
    return id ? mapa[id] : undefined;
};

{
    const semEn = await hidratar(seed.items.filter((it) => it.lang !== 'EN'));

    check('Central sem linhas EN: todo cenário publicado ainda acha o EN', () => {
        const ids = Object.keys(semEn.sc);
        const sem = ids.filter((id) => !semEn.en[id]);
        if (sem.length) {
            throw new Error(`${sem.length} de ${ids.length} cenários publicados sem EN (cairiam no português): ${sem.slice(0, 3).join(', ')}`);
        }
    });

    check('e o EN achado é o embutido do MESMO cenário, não o de outro', () => {
        for (const [id, sc] of Object.entries(semEn.sc)) {
            const esperado = deFabrica(EN_DE_FABRICA, id, sc.substatus[0]);
            if (JSON.stringify(semEn.en[id]) !== JSON.stringify(esperado)) {
                throw new Error(`${id}: o EN veio diferente do embutido de mesmo slug`);
            }
        }
    });

    check('mas o ES publicado continua vencendo o embutido', () => {
        // O contrário também tem de valer: idioma que a Central SERVE manda,
        // senão uma correção publicada nunca chegaria ao agente.
        if (!Object.keys(semEn.es).length) {
            throw new Error('o espelho ES ficou vazio com linhas ES publicadas');
        }
        const primeiro = seed.items.find((it) => it.lang === 'ES');
        const publicado = JSON.parse(primeiro.value).fields;
        const achado = Object.values(semEn.es).find((o) => Object.entries(publicado).every(([k, v]) => o[k] === v));
        if (!achado) throw new Error(`o ES publicado de "${primeiro.label}" não chegou ao espelho`);
    });
}

// --- A Central serve o EN de UM cenário só ---
//
// Quem traduz pela tela publica um cenário de cada vez. Antes, o primeiro EN
// publicado SUBSTITUÍA o espelho inteiro: os outros 26 cenários passavam a sair
// em português para todo agente EN, sem erro nenhum.
{
    const SENTINELA = 'SENTINELA-EN-PUBLICADO';
    const umEn = seed.items.find((it) => it.lang === 'EN');
    const valor = JSON.parse(umEn.value);
    valor.fields['field-REASON_COMMENTS'] = SENTINELA;
    const linhas = [
        ...seed.items.filter((it) => it.lang !== 'EN'),
        { ...umEn, value: JSON.stringify(valor) },
    ];
    const parcial = await hidratar(linhas);

    check('EN publicado só para um cenário: o publicado vence, só nele', () => {
        const vencedores = Object.entries(parcial.en).filter(([, o]) => o['field-REASON_COMMENTS'] === SENTINELA);
        if (vencedores.length !== 1) throw new Error(`${vencedores.length} cenários com o texto publicado (esperado 1)`);
        if (!parcial.sc[vencedores[0][0]]) throw new Error('o EN publicado ficou numa chave que não é cenário');
    });

    check('EN publicado só para um cenário: os demais seguem em EN', () => {
        const ids = Object.keys(parcial.sc);
        const sem = ids.filter((id) => !parcial.en[id]);
        if (sem.length) {
            throw new Error(`${sem.length} de ${ids.length} cenários caíram para o português depois de publicar 1 EN`);
        }
    });

    // O await fica FORA do check: o check deste arquivo é síncrono, e um
    // callback async passaria verde sem que a asserção rodasse.
    const outra = await hidratar(linhas);
    check('hidratar de novo (cache, depois rede) não acumula nem perde entradas', () => {
        const de = Object.keys(parcial.en).sort().join();
        if (Object.keys(outra.en).sort().join() !== de) throw new Error('o espelho mudou entre duas hidratações iguais');
    });
}

console.log(
    '\n' + (fail ? '✗' : '✓') +
    ` ${Object.keys(originais).length} cenários embutidos -> ${Object.keys(depois).length} publicados, ${fail} falhas\n`
);
process.exit(fail ? 1 : 0);
