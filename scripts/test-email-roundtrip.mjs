// scripts/test-email-roundtrip.mjs
//
// Prova que a migração dos modelos de e-mail é SEM PERDA: semear a partir do
// email-data.js e reconstruir a partir do que foi semeado tem que devolver
// exatamente os mesmos modelos - assunto, corpo HTML, placeholders (chave,
// rótulo, tipo e `auto`) e o overlay ES inteiro.
//
// É o risco central desta fase, e o mais caro do projeto: o resultado vai por
// e-mail para o anunciante. Uma tag HTML perdida, um placeholder que muda de
// chave ou um `auto` que some não quebram nada visivelmente aqui - aparecem
// como e-mail torto na caixa de entrada de terceiro.
//
// Uso: npm run test:emails

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

const bundled = await build({
    entryPoints: [resolve(here, '../src/modules/email-assistant/email-data.js')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    logLevel: 'silent',
});

const mod = { exports: {} };
// eslint-disable-next-line no-new-func
new Function('module', 'exports', 'require', bundled.outputFiles[0].text)(mod, mod.exports, require);

const { EMAIL_TEMPLATES, applyEmailContent, getEmailTemplate } = mod.exports;

// Snapshot ANTES de qualquer hidratação, incluindo a visão em ES que o módulo
// entrega hoje (é ela que o agente vê, não o overlay cru).
const originalPt = JSON.parse(JSON.stringify(EMAIL_TEMPLATES));
const originalEsView = originalPt.map(t => JSON.parse(JSON.stringify(getEmailTemplate(t, 'es'))));
const originalEnView = originalPt.map(t => JSON.parse(JSON.stringify(getEmailTemplate(t, 'en'))));

const seed = JSON.parse(readFileSync(resolve(here, '../gas-backend/seeds/email-seed.json'), 'utf8'));

const asServed = seed.items.map((it, idx) => ({
    key: it.key, field: it.field, lang: it.lang,
    label: it.label, value: it.value, sortOrder: it.sortOrder ?? idx,
}));

// Embaralha: a ordem tem que vir do sortOrder, não de como a planilha devolveu.
for (let i = asServed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [asServed[i], asServed[j]] = [asServed[j], asServed[i]];
}

const applied = applyEmailContent(asServed);

let fail = 0;
function check(name, fn) {
    try { fn(); console.log('  ✓ ' + name); }
    catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++; }
}

console.log('\n--- Round-trip dos modelos de e-mail ---');

check('a hidratação foi aplicada', () => {
    if (!applied) throw new Error('applyEmailContent devolveu false');
});

check('mesmos modelos, na mesma ordem', () => {
    const a = originalPt.map(t => t.id).join('|');
    const b = EMAIL_TEMPLATES.map(t => t.id).join('|');
    if (a !== b) throw new Error(`esperado ${a}\n      veio     ${b}`);
});

check('assunto e corpo HTML idênticos, byte a byte', () => {
    for (const orig of originalPt) {
        const novo = EMAIL_TEMPLATES.find(t => t.id === orig.id);
        if (!novo) throw new Error('sumiu o modelo ' + orig.id);
        if (novo.subject !== orig.subject) {
            throw new Error(`${orig.id}: assunto divergiu\n      antes: ${orig.subject}\n      agora: ${novo.subject}`);
        }
        if (novo.template !== orig.template) {
            throw new Error(`${orig.id}: corpo HTML divergiu (${orig.template.length} -> ${novo.template.length} chars)`);
        }
    }
});

check('placeholders preservam chave, rótulo, tipo e preenchimento automático', () => {
    for (const orig of originalPt) {
        const novo = EMAIL_TEMPLATES.find(t => t.id === orig.id);
        const a = orig.placeholders || [];
        const b = novo.placeholders || [];

        if (a.length !== b.length) {
            throw new Error(`${orig.id}: ${a.length} campos viraram ${b.length}`);
        }
        for (let i = 0; i < a.length; i++) {
            // `auto` é o que faz o campo se preencher sozinho (ex.: agentName).
            // Perder isso não quebra o envio, só devolve trabalho manual ao
            // agente em silêncio - o tipo de regressão que ninguém reporta.
            for (const prop of ['key', 'label', 'type', 'auto']) {
                if (a[i][prop] !== b[i][prop]) {
                    throw new Error(
                        `${orig.id}.placeholders[${i}].${prop}: ${JSON.stringify(a[i][prop])} -> ${JSON.stringify(b[i][prop])}`
                    );
                }
            }
        }
    }
});

for (const [lang, originalView] of [['es', originalEsView], ['en', originalEnView]]) {
    const LANG = lang.toUpperCase();

    check(`a visão em ${LANG} continua idêntica`, () => {
        for (const orig of originalView) {
            const base = EMAIL_TEMPLATES.find(t => t.id === orig.id);
            if (!base) throw new Error('sumiu o modelo ' + orig.id);
            const novo = getEmailTemplate(base, lang);

            for (const prop of ['name', 'category', 'subject', 'template']) {
                if (novo[prop] !== orig[prop]) {
                    throw new Error(`${orig.id}.${prop} divergiu em ${LANG}`);
                }
            }
            const a = orig.placeholders || [];
            const b = novo.placeholders || [];
            for (let i = 0; i < a.length; i++) {
                if (a[i].key !== b[i].key) throw new Error(`${orig.id}: chave mudou em ${LANG} (${a[i].key} -> ${b[i].key})`);
                if (a[i].label !== b[i].label) throw new Error(`${orig.id}: rótulo ${LANG} divergiu em ${a[i].key}`);
            }
        }
    });

    check(`as chaves dos placeholders continuam em português no corpo em ${LANG}`, () => {
        // Traduzir a chave quebraria o preenchimento: é ela que o corpo contém
        // e que o assistente procura para substituir.
        for (const base of EMAIL_TEMPLATES) {
            const tr = getEmailTemplate(base, lang);
            for (const ph of base.placeholders || []) {
                const corpo = (tr.subject || '') + ' ' + (tr.template || '');
                if (!corpo.includes(ph.key)) {
                    throw new Error(`${base.id}: chave ${ph.key} não está no corpo em ${LANG}`);
                }
            }
        }
    });
}

check('a linha EN não vira um modelo base duplicado', () => {
    // As três linhas de um template compartilham o `key`. Um roteamento por
    // "se é ES, overlay; senão, base" empurrava a EN para a lista base: os
    // modelos apareciam duplicados no assistente e a cópia vinha sem
    // placeholders, porque um overlay só carrega rótulos.
    const ids = EMAIL_TEMPLATES.map(t => t.id);
    const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (repetidos.length) throw new Error('modelo duplicado na base: ' + [...new Set(repetidos)].join(', '));
    for (const t of EMAIL_TEMPLATES) {
        if (!(t.placeholders || []).length && /\[[^\][]{2,60}\]/.test(t.template || '')) {
            throw new Error(`${t.id}: modelo base sem placeholders declarados`);
        }
    }
});

check('nenhum modelo publicado ficaria com placeholder inconsistente', () => {
    const TOKEN = /\[[^\][]{2,60}\]/g;
    for (const t of EMAIL_TEMPLATES) {
        const corpo = (t.subject || '') + ' ' + (t.template || '');
        const declarados = (t.placeholders || []).map(p => p.key);
        const soltos = [...new Set(corpo.match(TOKEN) || [])].filter(k => !declarados.includes(k));
        if (soltos.length) throw new Error(`${t.id}: token sem declaração: ${soltos.join(', ')}`);
    }
});

console.log('\n' + (fail ? '✗' : '✓') + ` round-trip de ${EMAIL_TEMPLATES.length} modelos (PT + ES + EN), ${fail} falhas\n`);
process.exit(fail ? 1 : 0);
