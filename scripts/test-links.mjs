// scripts/test-links.mjs
//
// Prova a lógica pura do módulo de Links (src/modules/links/links-model.js) e a
// igualdade dos conjuntos fechados entre o bundle, o servidor e a Central.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O módulo de Links ganhou destaques com janela, categorias criadas pela tela,
// favoritos e recentes. Quase tudo isso falha em silêncio:
//   - um destaque cujo link saiu do ar apareceria apontando para lugar nenhum;
//   - um favorito guardado como cópia do link ficaria com a URL velha depois de
//     o SME corrigir o link;
//   - uma cor ou um ícone que o servidor aceita e o bundle não conhece vira uma
//     categoria sem desenho — e nenhum dos dois lados lança erro;
//   - favoritos apagados por uma falha de rede, porque o catálogo veio do
//     fallback embutido e o link "não existia" nele.
//
// Não precisa de navegador: a lógica não toca DOM.
//
// Uso: npm run test:links

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import {
    CATEGORY_COLORS, CATEGORY_ICONS, BUILTIN_CATEGORIES,
    MAX_FAVORITES, MAX_RECENTS, MAX_ACTIVE_HIGHLIGHTS, MAX_ENDED_HIGHLIGHTS,
    pickText, linkId, normalizeLink, normalizeCustomCategories,
    categoryLabel, categoryTheme, categoryIcon, orderedCategoryKeys, groupByCategory,
    resolveHighlights, toggleFavorite, pushRecent, reconcileIds, reconcileRecents, migrateLegacyHistory,
    fold, matchesTerm, formatDay, formatDayTime, formatWhen,
} from '../src/modules/links/links-model.js';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

let falhas = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); falhas++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), b = JSON.stringify(esperado);
    if (a !== b) throw new Error(`${oque || ''} esperado ${b}, veio ${a}`);
}
function verdade(cond, oque) { if (!cond) throw new Error(oque || 'esperado verdadeiro'); }

// ------------------------------------------------------------------ fixtures
const item = (id, cat, over, lineage) => ({
    id, lineage: lineage || id, key: cat,
    value: JSON.stringify(Object.assign({ name: 'Link ' + id, url: 'https://go/' + id, desc: 'Descrição ' + id }, over || {})),
});
const LINKS = [
    item('a', 'tasks', { name: 'Escalação Sellers', desc: 'Form Escalação', desc_es: 'Form Escalación', about: 'Formulário único.', about_es: 'Formulario único.', when: 'Sem retorno em 48h.' }),
    item('b', 'ads', { name: '[SOP] Troubleshooting', desc: 'Resolução problemas' }),
    item('c', 'feedback', { name: 'Elogios', desc: 'Feedback positivo' }),
    item('d', 'treinamento', { name: 'Curso de onboarding', desc: 'Para quem entrou agora' }),
    item('e', 'ads', { name: 'Win Criteria: Code', desc: 'Validação Código' }),
].map(normalizeLink);

const hl = (id, linkLineage, state, over) => ({
    id, state, value: JSON.stringify(Object.assign({
        linkLineage, headline: 'Destaque ' + id, headline_es: 'Destacado ' + id, blurb: 'Resumo',
        position: 'secondary', startsAt: '2026-10-20T08:00', endsAt: '2026-10-31T18:00',
    }, over || {})),
});

console.log('\n--- Conjuntos fechados: bundle x servidor ---');

// Os literais do servidor são lidos do texto-fonte: ContentAPI.js é script do
// Apps Script (sem export) e só roda no vm.
const api = readFileSync(resolve(raiz, 'gas-backend/ContentAPI.js'), 'utf8');
function literalDeArray(fonte, nome) {
    const m = new RegExp(`const ${nome} = (\\[[\\s\\S]*?\\]);`).exec(fonte);
    if (!m) throw new Error(`Não achei ${nome}`);
    // eslint-disable-next-line no-eval
    return eval(m[1]);
}

check('as cores que o servidor aceita são exatamente as que o bundle desenha', () => {
    igual(literalDeArray(api, 'CONTENT_LINK_CATEGORY_COLORS').sort(), Object.keys(CATEGORY_COLORS).sort());
});

check('os ícones que o servidor aceita são exatamente os que o bundle desenha', () => {
    igual(literalDeArray(api, 'CONTENT_LINK_CATEGORY_ICONS').sort(), Object.keys(CATEGORY_ICONS).sort());
});

check('as categorias embutidas do servidor são as do bundle, na mesma ordem', () => {
    igual(literalDeArray(api, 'CONTENT_LINK_BUILTIN_CATEGORIES'), Object.keys(BUILTIN_CATEGORIES));
});

// A Central é o terceiro lugar onde cor, ícone e categoria embutida moram. Os
// literais são lidos do texto da tela, que roda no navegador sem export.
const central = readFileSync(resolve(raiz, 'gas-backend/ContentDashboard_Core.html'), 'utf8');

function blocoDe(fonte, nome, abre, fecha) {
    const i = fonte.indexOf(`var ${nome} = ${abre}`);
    if (i === -1) throw new Error(`Não achei ${nome} na Central`);
    const f = fonte.indexOf(fecha + ';', i);
    // eslint-disable-next-line no-eval
    return eval('(' + fonte.slice(i + `var ${nome} = `.length, f + 1) + ')');
}

check('as cores da Central são as do bundle, com o mesmo código', () => {
    const doCentral = blocoDe(central, 'LINK_CAT_COLORS', '{', '}');
    igual(Object.keys(doCentral).sort(), Object.keys(CATEGORY_COLORS).sort(), 'chaves:');
    Object.entries(CATEGORY_COLORS).forEach(([k, t]) => {
        igual([doCentral[k].color, doCentral[k].bg], [t.color, t.bg], k + ':');
    });
});

check('os ícones da Central são os que o bundle desenha', () => {
    igual(blocoDe(central, 'LINK_CAT_ICONS', '[', ']').sort(), Object.keys(CATEGORY_ICONS).sort());
});

check('as categorias embutidas da Central: mesma ordem, cor, ícone e nome em português', () => {
    const doCentral = blocoDe(central, 'LINK_CAT_BUILTIN', '[', ']');
    igual(doCentral.map((c) => c.key), Object.keys(BUILTIN_CATEGORIES), 'ordem:');
    doCentral.forEach((c) => {
        const b = BUILTIN_CATEGORIES[c.key];
        igual([c.label, c.color, c.icon], [b.label.pt, b.color, b.icon], c.key + ':');
    });
});

check('toda categoria embutida usa uma cor e um ícone que existem', () => {
    Object.entries(BUILTIN_CATEGORIES).forEach(([k, def]) => {
        verdade(CATEGORY_COLORS[def.color], `${k}: cor ${def.color}`);
        verdade(CATEGORY_ICONS[def.icon], `${k}: ícone ${def.icon}`);
        ['pt', 'es', 'en'].forEach((l) => verdade(def.label[l], `${k}: rótulo em ${l}`));
    });
});

check('as categorias que já existiam mantêm exatamente as cores de antes', () => {
    // Promessa de "o dia 1 não muda nada": a paleta antiga (CAT_THEMES) é a que o
    // agente já viu. Mover as cores para um mapa por chave não pode mexer nelas.
    const antes = {
        tasks: ['#0097A7', '#E0F7FA'], ads: ['#1967D2', '#E8F0FE'], analytics: ['#E37400', '#FEF7E0'],
        shopping: ['#188038', '#E6F4EA'], tech: ['#9334E6', '#F3E8FD'], hr: ['#C5221F', '#FCE8E6'],
        lm: ['#5F6368', '#F1F3F4'], qa: ['#F09D00', '#FFF3E0'], suporte: ['#0B57D0', '#D3E3FD'],
    };
    Object.entries(antes).forEach(([k, [color, bg]]) => {
        const t = categoryTheme(k);
        igual([t.color, t.bg], [color, bg], k + ':');
    });
});

check('o rótulo da barra lateral cabe: no máximo 12 caracteres em todo idioma embutido', () => {
    Object.entries(BUILTIN_CATEGORIES).forEach(([k, def]) => {
        Object.values(def.label).forEach((r) => verdade(r.length <= 12, `${k}: "${r}"`));
    });
});

console.log('\n--- Texto por idioma ---');

check('pickText cai no português quando o idioma não foi preenchido', () => {
    const l = LINKS[0];
    igual(pickText(l, 'desc', 'pt'), 'Form Escalação');
    igual(pickText(l, 'desc', 'es'), 'Form Escalación');
    igual(pickText(l, 'desc', 'en'), 'Form Escalação', 'EN sem tradução cai no PT:');
    igual(pickText(null, 'desc', 'es'), '');
});

console.log('\n--- Catálogo e categorias ---');

check('a linhagem é a identidade; sem ela a URL é o plano B', () => {
    igual(linkId({ lineage: 'itm_1', url: 'https://x' }), 'itm_1');
    igual(linkId({ lineage: '', url: 'https://x' }), 'u:https://x');
});

check('categoria criada pela Central entra com cor e ícone da lista fechada', () => {
    const defs = normalizeCustomCategories([{
        key: 'treinamento',
        value: JSON.stringify({ label: 'Treinamento', label_en: 'Training', color: 'teal', icon: 'school' }),
    }]);
    igual(defs.treinamento.color, 'teal');
    igual(categoryLabel('treinamento', 'en', defs), 'Training');
    igual(categoryLabel('treinamento', 'es', defs), 'Treinamento', 'ES sem tradução cai no nome base:');
    verdade(categoryIcon('treinamento', defs).includes('<path'), 'tem desenho');
});

check('cor ou ícone fora da lista não derruba a categoria — cai no neutro', () => {
    const defs = normalizeCustomCategories([{
        key: 'estranha', value: JSON.stringify({ label: 'Estranha', color: '#ff0000', icon: '<svg onload=alert(1)>' }),
    }]);
    igual(defs.estranha.color, 'slate');
    igual(defs.estranha.icon, 'folder');
});

check('uma categoria criada NÃO pode redefinir uma embutida', () => {
    const defs = normalizeCustomCategories([{ key: 'ads', value: JSON.stringify({ label: 'Sequestrada', color: 'red', icon: 'star' }) }]);
    igual(Object.keys(defs), [], 'ignorada:');
    igual(categoryLabel('ads', 'pt', defs), 'Ads');
});

check('categoria sem definição aparece com o nome da chave, em vez de sumir com o link', () => {
    igual(categoryLabel('orfa', 'pt', {}), 'orfa');
    igual(categoryTheme('orfa', {}).color, '#5F6368');
});

check('a ordem da barra lateral é a do produto, depois as criadas — nunca pelo sortOrder', () => {
    const defs = normalizeCustomCategories([{ key: 'treinamento', value: JSON.stringify({ label: 'T', color: 'teal', icon: 'school' }) }]);
    // O link da categoria nova vem PRIMEIRO na lista (sortOrder 0), e ainda assim
    // a categoria entra depois das embutidas.
    const reordenados = [LINKS[3], LINKS[0], LINKS[1], LINKS[2], LINKS[4]];
    igual(orderedCategoryKeys(reordenados, defs), ['tasks', 'ads', 'feedback', 'treinamento']);
});

check('categoria vazia não aparece, e chave desconhecida vai para o fim', () => {
    const extra = normalizeLink(item('z', 'chave_orfa', {}));
    igual(orderedCategoryKeys([LINKS[0], extra], {}), ['tasks', 'chave_orfa']);
    const grupos = groupByCategory([LINKS[0], LINKS[1], LINKS[4]], {});
    igual([...grupos.keys()], ['tasks', 'ads']);
    igual(grupos.get('ads').map((l) => l.name), ['[SOP] Troubleshooting', 'Win Criteria: Code']);
});

console.log('\n--- Destaques ---');

check('destaque no ar vira herói e secundários; o título segue o idioma da interface', () => {
    const r = resolveHighlights([
        hl('h1', 'a', 'active', { position: 'main' }),
        hl('h2', 'b', 'active'),
    ], LINKS, 'es');
    igual(r.active.map((h) => h.headline), ['Destacado h1', 'Destacado h2']);
    igual(r.active[0].position, 'main');
});

check('o título cai no PT quando o idioma não foi preenchido, e no nome do link se faltar tudo', () => {
    const sem = resolveHighlights([hl('h1', 'a', 'active', { headline: '', headline_es: '' })], LINKS, 'es');
    igual(sem.active[0].headline, 'Escalação Sellers');
    const pt = resolveHighlights([hl('h1', 'a', 'active', { headline_en: '' })], LINKS, 'en');
    igual(pt.active[0].headline, 'Destaque h1');
});

check('destaque sem linhagem nunca casa com o fallback embutido, que também não tem linhagem', () => {
    const embutidos = [normalizeLink({ key: 'tasks', value: JSON.stringify({ name: 'X', url: 'https://x' }) })];
    igual(embutidos[0].lineage, '', 'o embutido não tem linhagem:');
    const r = resolveHighlights([hl('h1', '', 'active'), hl('h2', undefined, 'active')], embutidos, 'pt');
    igual(r.active, [], 'nenhum casou:');
});

check('destaque cujo link saiu do ar é ignorado, não mostrado quebrado', () => {
    const r = resolveHighlights([hl('h1', 'link_removido', 'active'), hl('h2', 'a', 'active')], LINKS, 'pt');
    igual(r.active.map((h) => h.id), ['h2']);
});

check('o principal vem primeiro; entre iguais, o que entrou mais recentemente', () => {
    const r = resolveHighlights([
        hl('h1', 'a', 'active', { startsAt: '2026-10-20T08:00' }),
        hl('h2', 'b', 'active', { startsAt: '2026-10-22T08:00' }),
        hl('h3', 'c', 'active', { startsAt: '2026-10-21T08:00', position: 'main' }),
    ], LINKS, 'pt');
    igual(r.active.map((h) => h.id), ['h3', 'h2', 'h1']);
});

check('no máximo 3 no ar, mesmo que a planilha tenha sido editada à mão com mais', () => {
    const muitos = ['a', 'b', 'c', 'd', 'e'].map((l, i) => hl('h' + i, l, 'active', { startsAt: `2026-10-2${i}T08:00` }));
    igual(resolveHighlights(muitos, LINKS, 'pt').active.length, MAX_ACTIVE_HIGHLIGHTS);
});

check('"Saíram do destaque": do mais recente, sem repetir link, sem quem voltou ao ar', () => {
    const r = resolveHighlights([
        hl('h1', 'a', 'active'),
        hl('h2', 'a', 'ended', { endsAt: '2026-10-10T18:00' }),   // o link está no ar de novo
        hl('h3', 'b', 'ended', { endsAt: '2026-10-12T18:00' }),
        hl('h4', 'b', 'ended', { endsAt: '2026-10-15T18:00' }),   // mesmo link: fica a saída mais recente
        hl('h5', 'c', 'ended', { endsAt: '2026-10-13T18:00' }),
    ], LINKS, 'pt');
    igual(r.ended.map((h) => h.id), ['h4', 'h5']);
});

check('"Saíram do destaque" tem teto', () => {
    const muitos = LINKS.concat(['f', 'g', 'h', 'i'].map((id) => normalizeLink(item(id, 'tech', {}))));
    const saidas = muitos.map((l, i) => hl('h' + i, l.lineage, 'ended', { endsAt: `2026-10-0${i + 1}T18:00` }));
    igual(resolveHighlights(saidas, muitos, 'pt').ended.length, MAX_ENDED_HIGHLIGHTS);
});

console.log('\n--- Favoritos e recentes ---');

check('favoritar e desfavoritar guardam o ID, não a cópia do link', () => {
    let r = toggleFavorite([], 'itm_1');
    igual(r, { list: ['itm_1'], added: true, full: false });
    r = toggleFavorite(r.list, 'itm_2');
    igual(r.list, ['itm_2', 'itm_1'], 'o mais novo primeiro:');
    r = toggleFavorite(r.list, 'itm_1');
    igual(r, { list: ['itm_2'], added: false, full: false });
});

check('o teto de favoritos recusa o novo em vez de apagar um antigo', () => {
    const cheia = Array.from({ length: MAX_FAVORITES }, (_, i) => 'itm_' + i);
    const r = toggleFavorite(cheia, 'itm_novo');
    igual(r.full, true);
    igual(r.list, cheia, 'nada mudou:');
    igual(toggleFavorite(cheia, 'itm_0').added, false, 'desfavoritar continua funcionando com a lista cheia:');
});

check('lixo no blob de preferências não derruba a lista', () => {
    igual(toggleFavorite(null, 'x').list, ['x']);
    igual(toggleFavorite([1, null, 'ok', {}], 'y').list, ['y', 'ok']);
    igual(pushRecent('nao-e-lista', 'x', 5), [{ id: 'x', t: 5 }]);
});

check('abrir um link de novo o traz para o topo, sem duplicar', () => {
    let r = pushRecent([], 'a', 1);
    r = pushRecent(r, 'b', 2);
    r = pushRecent(r, 'a', 3);
    igual(r, [{ id: 'a', t: 3 }, { id: 'b', t: 2 }]);
});

check('recentes têm teto', () => {
    let r = [];
    for (let i = 0; i < MAX_RECENTS + 5; i++) r = pushRecent(r, 'l' + i, i);
    igual(r.length, MAX_RECENTS);
    igual(r[0].id, 'l' + (MAX_RECENTS + 4));
});

check('o catálogo da Central apaga o ID que não existe mais', () => {
    igual(reconcileIds(['a', 'fantasma', 'b'], LINKS, true), ['a', 'b']);
});

check('o fallback embutido NUNCA apaga favorito: um link "ausente" pode só não estar nele', () => {
    // Falha de rede no boot: o catálogo é o embutido, que não tem o link novo que
    // o SME publicou ontem. Apagar o favorito aqui seria perda de dado causada
    // por uma queda de rede.
    igual(reconcileIds(['a', 'link_novo_da_central'], LINKS, false), ['a', 'link_novo_da_central']);
});

check('o ID `u:<url>` (guardado com o fallback) vira a linhagem quando a Central responde', () => {
    igual(reconcileIds(['u:https://go/b'], LINKS, true), ['b']);
    igual(reconcileIds(['u:https://go/b', 'b'], LINKS, true), ['b'], 'sem duplicar:');
    igual(reconcileIds(['u:https://go/nao-existe'], LINKS, true), []);
});

check('os recentes seguem a mesma regra, levando o instante junto', () => {
    const r = reconcileRecents([
        { id: 'u:https://go/b', t: 30 }, { id: 'fantasma', t: 25 }, { id: 'b', t: 20 }, { id: 'a', t: 10 },
    ], LINKS, true);
    igual(r, [{ id: 'b', t: 30 }, { id: 'a', t: 10 }], 'a entrada mais recente vence a duplicata:');
    igual(reconcileRecents([{ id: 'fantasma', t: 1 }], LINKS, false), [{ id: 'fantasma', t: 1 }], 'fallback não apaga:');
    igual(reconcileRecents('lixo', LINKS, true), []);
    igual(reconcileRecents([null, { id: 5 }, {}], LINKS, true), [], 'lixo no blob:');
});

check('o histórico antigo (cópias com URL) migra para os recentes, na mesma ordem', () => {
    const legado = [
        { name: 'Elogios', url: 'https://go/c', _originalCat: 'qa' },
        { name: 'Removido', url: 'https://go/sumiu' },
        { name: 'Escalação', url: 'https://go/a' },
        { name: 'Elogios de novo', url: 'https://go/c' },
    ];
    const r = migrateLegacyHistory(legado, LINKS, 1_000_000);
    igual(r.map((x) => x.id), ['c', 'a'], 'só o que ainda existe, sem duplicar:');
    verdade(r[0].t > r[1].t, 'a ordem se preserva:');
    igual(migrateLegacyHistory('lixo', LINKS, 1), []);
});

console.log('\n--- Busca ---');

check('a busca ignora acento e caixa', () => {
    igual(fold('Escalação'), 'escalacao');
    verdade(matchesTerm(LINKS[0], 'escalacao', 'pt'), 'sem acento acha com acento');
    verdade(matchesTerm(LINKS[0], 'ESCALAÇÃO', 'pt'), 'com acento e caixa');
    verdade(!matchesTerm(LINKS[0], 'inexistente', 'pt'));
});

check('a busca olha a descrição NO IDIOMA da tela, a prévia e o nome da categoria', () => {
    verdade(matchesTerm(LINKS[0], 'escalacion', 'es'), 'descrição em ES');
    verdade(!matchesTerm(LINKS[0], 'escalacion', 'pt'), 'e não em PT');
    verdade(matchesTerm(LINKS[0], 'formulario unico', 'es'), 'o que é');
    verdade(matchesTerm(LINKS[0], '48h', 'pt'), 'quando usar');
    verdade(matchesTerm(LINKS[2], 'feedback', 'pt'), 'categoria');
});

check('termo vazio casa tudo', () => {
    verdade(matchesTerm(LINKS[0], '', 'pt'));
    verdade(matchesTerm(LINKS[0], '   ', 'pt'));
});

console.log('\n--- Datas ---');

check('o horário do destaque é lido como relógio de parede, no formato do idioma', () => {
    igual(formatDay('2026-10-31T18:00', 'pt'), '31/10');
    igual(formatDay('2026-10-31T18:00', 'en'), '10/31');
    igual(formatDayTime('2026-10-31T18:00', 'pt'), '31/10, 18:00');
    igual(formatDay('lixo', 'pt'), '');
    igual(formatDay('', 'pt'), '');
});

check('"hoje", "ontem" e a data, no idioma da interface', () => {
    const agora = new Date(2026, 9, 23, 15, 0).getTime();
    const ontem = new Date(2026, 9, 22, 9, 0).getTime();
    const antes = new Date(2026, 9, 20, 9, 0).getTime();

    verdade(/^hoje, 10:42$/i.test(formatWhen(new Date(2026, 9, 23, 10, 42).getTime(), agora, 'pt')), formatWhen(new Date(2026, 9, 23, 10, 42).getTime(), agora, 'pt'));
    igual(formatWhen(ontem, agora, 'pt'), 'ontem');
    igual(formatWhen(ontem, agora, 'es'), 'ayer');
    igual(formatWhen(ontem, agora, 'en'), 'yesterday');
    igual(formatWhen(antes, agora, 'pt'), '20/10');
});

console.log('\n' + (falhas ? '✗ ' + falhas + ' falharam' : '✓ tudo certo') + '\n');
process.exit(falhas ? 1 : 0);
