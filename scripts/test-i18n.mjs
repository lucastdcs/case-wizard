// scripts/test-i18n.mjs
//
// Paridade dos dicionários de idioma. O app tem ~20 dicionários
// `{ pt: {...}, es: {...}, en: {...} }` espalhados pelos módulos, e nada
// liga um ao outro: adicionar uma chave em PT e esquecer EN não quebra o
// build, não quebra nenhum teste, e só aparece na tela do agente como a
// chave crua ou como texto em português no meio do inglês.
//
// Esse foi exatamente o modo de falha da entrada do espanhol (ver
// docs/LEARNINGS.md, "Conteúdo que vira gerenciável"): a divergência de uma
// lista duplicada é PLAUSÍVEL, então ninguém reclama no primeiro dia.
//
// O harness não importa os módulos — eles dependem de DOM. Ele extrai os
// literais de dicionário do texto-fonte por casamento de chaves e avalia
// só esse literal, que é dado puro.
//
// Uso: node scripts/test-i18n.mjs      (sai != 0 na primeira falha)
//      node scripts/test-i18n.mjs --list   (só lista o que falta)

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { build } from 'esbuild';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const LANGS = ['pt', 'es', 'en'];

// Dicionários cuja ausência de uma língua é deliberada, com o motivo.
// Entrada aqui é decisão, não conveniência: justifique.
const EXEMPT = new Map([
    // (vazio por enquanto — toda exceção precisa de uma linha de motivo)
]);

function walk(dir) {
    return readdirSync(dir).flatMap(name => {
        const full = join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : full.endsWith('.js') ? [full] : [];
    });
}

// Acha o `}` que fecha o `{` em `open`, ignorando chaves dentro de string,
// template literal ou comentário. Ingênuo o bastante para dados, o que é
// tudo que um dicionário é.
function matchBrace(src, open) {
    let depth = 0, i = open, quote = null;
    while (i < src.length) {
        const c = src[i], prev = src[i - 1];
        if (quote) {
            if (c === quote && prev !== '\\') quote = null;
        } else if (c === '"' || c === "'" || c === '`') {
            quote = c;
        } else if (c === '/' && src[i + 1] === '/') {
            i = src.indexOf('\n', i); if (i === -1) break;
        } else if (c === '/' && src[i + 1] === '*') {
            i = src.indexOf('*/', i) + 1;
        } else if (c === '{') depth++;
        else if (c === '}' && --depth === 0) return i;
        i++;
    }
    return -1;
}

// Um dicionário de idioma é um `const X = {` cujo primeiro nível tem `pt:`.
function findDicts(file) {
    const src = readFileSync(file, 'utf8');
    const out = [];
    const re = /(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=\s*\{/g;
    let m;
    while ((m = re.exec(src))) {
        const open = m.index + m[0].length - 1;
        const close = matchBrace(src, open);
        if (close === -1) continue;
        const body = src.slice(open, close + 1);
        if (!/^\s*['"]?pt['"]?\s*:/m.test(body)) continue;
        let value;
        try {
            value = new Function(`"use strict"; return (${body});`)();
        } catch (e) {
            out.push({ name: m[1], error: e.message });
            continue;
        }
        if (!value || typeof value !== 'object' || !value.pt) continue;
        out.push({ name: m[1], value });
    }
    return out;
}

function keysOf(block) {
    if (Array.isArray(block)) {
        // SLIDES_BY_LANG e afins: a "chave" é o índice do slide, e o que
        // importa é o número de slides bater entre os idiomas.
        return block.map((_, i) => `[${i}]`);
    }
    // Forma plana `{ pt: "texto", es: "texto" }` (HEADER_DESC,
    // PREVIEW_PLACEHOLDER): o bloco É o valor. Sem este caso o dicionário
    // contava 0 chaves e passava vazio.
    if (typeof block === 'string') return ['<valor>'];
    if (block && typeof block === 'object') return Object.keys(block);
    return [];
}

const failures = [];
const listOnly = process.argv.includes('--list');
let checked = 0;

for (const file of walk(SRC)) {
    const rel = relative(ROOT, file);
    for (const dict of findDicts(file)) {
        const id = `${rel} :: ${dict.name}`;
        if (dict.error) {
            failures.push({ id, kind: 'parse', detail: dict.error });
            continue;
        }
        if (EXEMPT.has(id)) continue;
        checked++;

        const base = keysOf(dict.value.pt);
        for (const lang of LANGS) {
            if (lang === 'pt') continue;
            if (!dict.value[lang]) {
                failures.push({ id, kind: 'missing-lang', detail: lang, count: base.length });
                continue;
            }
            const have = new Set(
                typeof dict.value[lang] === 'string' && dict.value[lang].trim()
                    ? ['<valor>'] : keysOf(dict.value[lang])
            );
            const missing = base.filter(k => !have.has(k));
            const extra = [...have].filter(k => !base.includes(k));
            if (missing.length) failures.push({ id, kind: 'missing-keys', detail: lang, keys: missing });
            if (extra.length) failures.push({ id, kind: 'extra-keys', detail: lang, keys: extra });
        }

        // Chave presente mas idêntica ao PT é suspeita de tradução esquecida.
        // Não é falha: "Case ID", "BAU", "Status" ficam iguais de propósito
        // (ver o glossário em specs/_MASTER_RULEBOOK.md). Só avisa.
        for (const lang of LANGS.slice(1)) {
            const block = dict.value[lang];
            if (typeof block === 'string') {
                if (block === dict.value.pt && block.length > 24) {
                    console.warn(`  aviso  ${id} [${lang}]: valor idêntico ao PT`);
                }
                continue;
            }
            if (!block || Array.isArray(block)) continue;
            const same = Object.keys(block).filter(k => {
                const a = block[k], b = dict.value.pt[k];
                return typeof a === 'string' && a === b && a.length > 24;
            });
            if (same.length) {
                console.warn(`  aviso  ${id} [${lang}]: ${same.length} valor(es) idêntico(s) ao PT — confira: ${same.slice(0, 4).join(', ')}`);
            }
        }
    }
}

// Pares espelho `X_ES` / `X_EN`: o conteúdo por idioma que não cabe num
// dicionário `{ pt, es, en }` (cenários, modelos de e-mail, rótulos de campo). Um
// `X_ES` sem `X_EN` é o formato da época do PT/ES, e o que ele deixa para trás é
// o inglês caindo em português sem erro nenhum — foi assim que o formulário BAU
// ficou inteiro em PT com a interface em EN. Cobre também as propriedades de cada
// entrada: um `tooltip` esquecido no EN volta ao PT do mesmo jeito calado.
function literalOf(src, name) {
    const m = new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=\\s*\\{`).exec(src);
    if (!m) return null;
    const open = m.index + m[0].length - 1;
    const close = matchBrace(src, open);
    if (close === -1) return null;
    try {
        return new Function(`"use strict"; return (${src.slice(open, close + 1)});`)();
    } catch (e) {
        return null;
    }
}

let mirrors = 0;
for (const file of walk(SRC)) {
    const rel = relative(ROOT, file);
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/(?:export\s+)?const\s+([A-Z][A-Z0-9_]*)_ES\s*=\s*\{/g)) {
        const es = literalOf(src, `${m[1]}_ES`);
        if (!es) continue;
        mirrors++;
        const id = `${rel} :: ${m[1]}_ES/_EN`;
        const en = literalOf(src, `${m[1]}_EN`);
        if (!en) {
            failures.push({ id, kind: 'missing-mirror', detail: `${m[1]}_EN não existe` });
            continue;
        }
        const faltam = Object.keys(es).filter(k => !(k in en));
        if (faltam.length) failures.push({ id, kind: 'missing-keys', detail: 'en', keys: faltam });
        const props = [];
        for (const k of Object.keys(es)) {
            if (!en[k] || typeof es[k] !== 'object' || typeof en[k] !== 'object') continue;
            const sem = Object.keys(es[k]).filter(p => !(p in en[k]));
            if (sem.length) props.push(`${k}.${sem.join('/')}`);
        }
        if (props.length) failures.push({ id, kind: 'missing-keys', detail: 'en', keys: props });
    }
}

// --- Resolução do idioma (shared/i18n.js) ---
//
// Override manual > último idioma de perfil aplicado > "pt". O perfil só chega
// depois do boot (o e-mail que o busca é capturado dentro da splash), então sem
// o passo do meio um agente ES/EN que nunca tocou em Configurações veria a
// splash em português em todo boot. Avalia o módulo real, com um localStorage
// falso por cenário (o estado do módulo é global, por isso um bundle novo cada).
let resolucoes = 0;
{
    const bundle = await build({
        entryPoints: [join(SRC, 'modules/shared/i18n.js')],
        bundle: true, write: false, format: 'cjs', platform: 'node', logLevel: 'silent',
    });
    const carregar = (store) => {
        globalThis.localStorage = {
            getItem: (k) => (k in store ? store[k] : null),
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; },
        };
        const m = { exports: {} };
        // eslint-disable-next-line no-new-func
        new Function('module', 'exports', bundle.outputFiles[0].text)(m, m.exports);
        return m.exports;
    };
    const casos = [
        ['sem nada guardado, abre em pt', {}, null, { ui: 'pt', out: 'pt' }],
        ['o último perfil aplicado vale já no boot seguinte', { cw_profile_lang: 'es' }, null, { ui: 'es', out: 'es' }],
        ['o override manual da interface vence o perfil guardado', { cw_profile_lang: 'es', cw_ui_lang: 'en' }, null, { ui: 'en', out: 'es' }],
        ['valor guardado inválido é ignorado', { cw_profile_lang: 'xx' }, null, { ui: 'pt', out: 'pt' }],
        ['o perfil que chega vira o idioma, sem virar escolha manual', {}, { defaultLanguage: 'EN' }, { ui: 'en', out: 'en', guarda: 'en', manual: false }],
        ['o perfil que chega não atropela a escolha manual, mas é guardado', { cw_ui_lang: 'pt' }, { defaultLanguage: 'EN' }, { ui: 'pt', out: 'en', guarda: 'en' }],
    ];
    for (const [nome, store, perfil, esperado] of casos) {
        const m = carregar(store);
        if (perfil) m.applyProfileLanguage(perfil);
        const veio = { ui: m.getLanguage(), out: m.getOutputLanguage() };
        const problemas = [];
        for (const k of ['ui', 'out']) if (veio[k] !== esperado[k]) problemas.push(`${k}: esperado ${esperado[k]}, veio ${veio[k]}`);
        if ('guarda' in esperado && store.cw_profile_lang !== esperado.guarda) problemas.push(`cw_profile_lang guardado: ${store.cw_profile_lang}`);
        if (esperado.manual === false && ('cw_ui_lang' in store || 'cw_output_lang' in store)) problemas.push('o perfil virou escolha manual');
        resolucoes++;
        if (problemas.length) failures.push({ id: `shared/i18n.js :: ${nome}`, kind: 'resolve', detail: problemas.join('; ') });
    }
}

console.log(`\ni18n: ${checked} dicionário(s) verificado(s) em ${LANGS.join('/')}; ${mirrors} par(es) _ES/_EN; ${resolucoes} caso(s) de resolução do idioma`);

if (!failures.length) {
    console.log('OK — todos os dicionários têm as três línguas com o mesmo conjunto de chaves.\n');
    process.exit(0);
}

console.error(`\n${failures.length} falha(s):\n`);
for (const f of failures) {
    if (f.kind === 'resolve') console.error(`  FALHA  ${f.id}: ${f.detail}`);
    if (f.kind === 'parse') console.error(`  ERRO   ${f.id}: não foi possível avaliar o literal — ${f.detail}`);
    if (f.kind === 'missing-mirror') console.error(`  FALTA  ${f.id}: ${f.detail}`);
    if (f.kind === 'missing-lang') console.error(`  FALTA  ${f.id}: idioma "${f.detail}" ausente (${f.count} chaves a traduzir)`);
    if (f.kind === 'missing-keys') console.error(`  FALTA  ${f.id} [${f.detail}]: ${f.keys.length} chave(s) — ${f.keys.join(', ')}`);
    if (f.kind === 'extra-keys') console.error(`  SOBRA  ${f.id} [${f.detail}]: ${f.keys.length} chave(s) que PT não tem — ${f.keys.join(', ')}`);
}
console.error('');
process.exit(listOnly ? 0 : 1);
