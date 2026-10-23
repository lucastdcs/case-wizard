// src/modules/links/links-model.js
//
// A lógica do módulo de Links que não precisa de DOM: montar o catálogo a partir
// do que a Central publicou, resolver os destaques, favoritos e recentes, buscar.
//
// Mora num arquivo à parte — e não dentro de links-assistant.js, que importa
// utilitários que tocam `document` no topo — para o `test:links` conseguir
// importá-la em Node sem subir um DOM falso. Aqui não há import nenhum.
//
// Ver docs/decisions/0018-home-de-links-destaques-e-categorias.md.

// ---------------------------------------------------------------------------
// Cores e ícones: conjuntos FECHADOS.
//
// Os nomes são o contrato com o servidor (CONTENT_LINK_CATEGORY_COLORS/ICONS em
// ContentAPI.js) e com o seletor da Central. Uma categoria criada pela tela
// escolhe uma chave daqui; nunca traz cor ou SVG próprio — HTML escrito por uma
// pessoa e executado no navegador de outra é a classe de problema que
// docs/LEARNINGS.md registrou no Ctrl+K. `test:links` trava a igualdade.
// ---------------------------------------------------------------------------
export const CATEGORY_COLORS = {
    cyan: { color: '#0097A7', bg: '#E0F7FA' },
    blue: { color: '#1967D2', bg: '#E8F0FE' },
    orange: { color: '#E37400', bg: '#FEF7E0' },
    green: { color: '#188038', bg: '#E6F4EA' },
    purple: { color: '#9334E6', bg: '#F3E8FD' },
    red: { color: '#C5221F', bg: '#FCE8E6' },
    slate: { color: '#5F6368', bg: '#F1F3F4' },
    amber: { color: '#F09D00', bg: '#FFF3E0' },
    sky: { color: '#0B57D0', bg: '#D3E3FD' },
    pink: { color: '#D01884', bg: '#FDE7F3' },
    teal: { color: '#00796B', bg: '#E0F2F1' },
    indigo: { color: '#3949AB', bg: '#E8EAF6' },
};

const svg = (d) => `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg>`;

export const CATEGORY_ICONS = {
    description: svg('M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'),
    assignment: svg('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'),
    verified_user: svg('M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'),
    chat: svg('M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'),
    public: svg('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'),
    bar_chart: svg('M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z'),
    shopping_cart: svg('M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z'),
    code: svg('M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'),
    person: svg('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'),
    folder: svg('M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z'),
    bookmark: svg('M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z'),
    star: svg('M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'),
    info: svg('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'),
    help: svg('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z'),
    flag: svg('M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z'),
    school: svg('M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'),
    build: svg('M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z'),
    lightbulb: svg('M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z'),
    event: svg('M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z'),
    feedback: svg('M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z'),
};

// ---------------------------------------------------------------------------
// Categorias embutidas. A ORDEM aqui é a ordem da barra lateral. As criadas
// pela Central entram depois, na ordem em que foram publicadas.
// ---------------------------------------------------------------------------
export const BUILTIN_CATEGORIES = {
    tasks: { color: 'cyan', icon: 'description', label: { pt: 'Tarefas', es: 'Tareas', en: 'Tasks' } },
    ads: { color: 'blue', icon: 'public', label: { pt: 'Ads', es: 'Ads', en: 'Ads' } },
    analytics: { color: 'orange', icon: 'bar_chart', label: { pt: 'GA4', es: 'GA4', en: 'GA4' } },
    shopping: { color: 'green', icon: 'shopping_cart', label: { pt: 'Shop', es: 'Shop', en: 'Shop' } },
    tech: { color: 'purple', icon: 'code', label: { pt: 'Tech', es: 'Tech', en: 'Tech' } },
    hr: { color: 'red', icon: 'person', label: { pt: 'RH', es: 'RRHH', en: 'HR' } },
    lm: { color: 'slate', icon: 'assignment', label: { pt: 'Forms', es: 'Forms', en: 'Forms' } },
    qa: { color: 'amber', icon: 'verified_user', label: { pt: 'QA', es: 'QA', en: 'QA' } },
    suporte: { color: 'sky', icon: 'chat', label: { pt: 'Ajuda', es: 'Ayuda', en: 'Help' } },
    feedback: { color: 'pink', icon: 'feedback', label: { pt: 'Feedback', es: 'Feedback', en: 'Feedback' } },
};

// Chave sem definição nenhuma (dado antigo, categoria removida às pressas): o
// link aparece mesmo assim, numa seção neutra com o próprio nome da chave. Sumir
// com um link porque a categoria dele não é conhecida é o pior desfecho.
const FALLBACK_CATEGORY = { color: 'slate', icon: 'folder' };

// Quantos cabem em cada lista. Os tetos existem para o blob de preferências
// (8 KB para tudo, no servidor) e para a tela — não para economizar memória.
export const MAX_FAVORITES = 30;
export const MAX_RECENTS = 10;
export const MAX_ACTIVE_HIGHLIGHTS = 3;
export const MAX_ENDED_HIGHLIGHTS = 5;

// ---------------------------------------------------------------------------
// Texto por idioma
// ---------------------------------------------------------------------------

export function parseJson(raw) {
    try {
        const v = JSON.parse(raw || '{}');
        return v && typeof v === 'object' ? v : {};
    } catch (e) {
        return {};
    }
}

// O texto no idioma pedido, caindo no português quando o idioma não foi
// preenchido. `base` é o campo sem sufixo (`desc`, `about`, `headline`…) e o
// português é o `base` puro — o mesmo formato de `desc`/`desc_es`/`desc_en`.
export function pickText(obj, base, lang) {
    if (!obj) return '';
    const traduzido = (lang === 'es' || lang === 'en') ? obj[`${base}_${lang}`] : '';
    return String(traduzido || obj[base] || '').trim();
}

// ---------------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------------

// Identidade estável de um link para favoritos, recentes e destaques. A linhagem
// atravessa as versões que o SME publica; a URL é o plano B do fallback embutido,
// que não tem linhagem porque nunca passou pela Central.
export function linkId(link) {
    return link.lineage || `u:${link.url}`;
}

export function normalizeLink(item) {
    const v = parseJson(item.value);
    return {
        id: item.id || '',
        lineage: item.lineage || item.id || '',
        cat: String(item.key || ''),
        name: String(v.name || ''),
        url: String(v.url || ''),
        desc: String(v.desc || ''),
        desc_es: String(v.desc_es || ''),
        desc_en: String(v.desc_en || ''),
        about: String(v.about || ''),
        about_es: String(v.about_es || ''),
        about_en: String(v.about_en || ''),
        when: String(v.when || ''),
        when_es: String(v.when_es || ''),
        when_en: String(v.when_en || ''),
    };
}

// Categorias que a Central criou, no formato da definição embutida.
export function normalizeCustomCategories(items) {
    const out = {};
    (items || []).forEach((item) => {
        const key = String(item.key || '').trim();
        if (!key || BUILTIN_CATEGORIES[key]) return;

        const v = parseJson(item.value);
        if (!v.label) return;

        out[key] = {
            color: CATEGORY_COLORS[v.color] ? v.color : FALLBACK_CATEGORY.color,
            icon: CATEGORY_ICONS[v.icon] ? v.icon : FALLBACK_CATEGORY.icon,
            label: { pt: String(v.label), es: String(v.label_es || v.label), en: String(v.label_en || v.label) },
            custom: true,
        };
    });
    return out;
}

export function categoryDef(key, customDefs) {
    const def = BUILTIN_CATEGORIES[key] || (customDefs && customDefs[key]);
    if (def) return def;
    return { ...FALLBACK_CATEGORY, label: { pt: key, es: key, en: key }, unknown: true };
}

export function categoryLabel(key, lang, customDefs) {
    const def = categoryDef(key, customDefs);
    return def.label[lang] || def.label.pt;
}

export function categoryTheme(key, customDefs) {
    const def = categoryDef(key, customDefs);
    return CATEGORY_COLORS[def.color] || CATEGORY_COLORS[FALLBACK_CATEGORY.color];
}

export function categoryIcon(key, customDefs) {
    const def = categoryDef(key, customDefs);
    return CATEGORY_ICONS[def.icon] || CATEGORY_ICONS[FALLBACK_CATEGORY.icon];
}

// A ordem da barra lateral é DECLARADA — embutidas na ordem do produto, criadas
// na ordem em que a Central as publicou —, e não derivada da posição do primeiro
// link de cada uma. Derivar fazia a categoria nova aparecer em primeiro lugar,
// porque um link recém-criado nasce com `sortOrder` 0.
export function orderedCategoryKeys(links, customDefs) {
    const comLink = new Set(links.map((l) => l.cat));
    const embutidas = Object.keys(BUILTIN_CATEGORIES);
    const criadas = Object.keys(customDefs || {});
    const desconhecidas = [...comLink].filter((k) => !embutidas.includes(k) && !criadas.includes(k));
    return [...embutidas, ...criadas, ...desconhecidas].filter((k) => comLink.has(k));
}

export function groupByCategory(links, customDefs) {
    const grupos = new Map();
    orderedCategoryKeys(links, customDefs).forEach((k) => grupos.set(k, []));
    links.forEach((l) => grupos.get(l.cat).push(l));
    return grupos;
}

// ---------------------------------------------------------------------------
// Destaques
// ---------------------------------------------------------------------------

// Cruza os destaques publicados com os links. Um destaque cujo link saiu do ar é
// IGNORADO, e não mostrado quebrado: o cartão apontaria para lugar nenhum.
//
// O estado (`active` | `ended`) vem do servidor, que o calcula no fuso da
// planilha. O agente não recalcula: com o relógio do navegador, "vai ao ar às 8h"
// seria um horário diferente para cada fuso.
export function resolveHighlights(items, links, lang) {
    // Só links COM linhagem entram: os do fallback embutido não têm, e uma chave
    // vazia casaria com qualquer destaque cujo `linkLineage` viesse em branco.
    const porLinhagem = new Map(links.filter((l) => l.lineage).map((l) => [l.lineage, l]));
    const ativos = [];
    const encerrados = [];

    (items || []).forEach((item) => {
        const v = parseJson(item.value);
        const link = porLinhagem.get(String(v.linkLineage || ''));
        if (!link) return;
        // (linhagem vazia nunca está no mapa)

        const entrada = {
            id: item.id,
            link,
            linkId: linkId(link),
            headline: pickText(v, 'headline', lang) || link.name,
            blurb: pickText(v, 'blurb', lang),
            position: v.position === 'main' ? 'main' : 'secondary',
            startsAt: String(v.startsAt || ''),
            endsAt: String(v.endsAt || ''),
        };

        if (item.state === 'active') ativos.push(entrada);
        else if (item.state === 'ended') encerrados.push(entrada);
    });

    // O principal primeiro; entre iguais, o que entrou mais recentemente. Dois
    // "principais" ao mesmo tempo não são erro: o mais novo é o herói e o outro
    // vira secundário.
    ativos.sort((a, b) =>
        (a.position === 'main' ? 0 : 1) - (b.position === 'main' ? 0 : 1) ||
        b.startsAt.localeCompare(a.startsAt) ||
        a.id.localeCompare(b.id));

    const noAr = ativos.slice(0, MAX_ACTIVE_HIGHLIGHTS);
    const idsNoAr = new Set(noAr.map((h) => h.linkId));

    // Quem saiu e já voltou ao ar não está "saindo": está no ar. E o mesmo link
    // destacado três vezes é uma linha só.
    encerrados.sort((a, b) => b.endsAt.localeCompare(a.endsAt));
    const vistos = new Set();
    const saidas = encerrados.filter((h) => {
        if (idsNoAr.has(h.linkId) || vistos.has(h.linkId)) return false;
        vistos.add(h.linkId);
        return true;
    }).slice(0, MAX_ENDED_HIGHLIGHTS);

    return { active: noAr, ended: saidas };
}

// ---------------------------------------------------------------------------
// Favoritos e recentes — guardam IDs, nunca cópias.
//
// O histórico antigo guardava o objeto inteiro do link: editar o link na Central
// deixava o recente apontando para a URL velha. Com o ID, a lista é sempre
// resolvida contra o catálogo de agora.
// ---------------------------------------------------------------------------

export function toggleFavorite(list, id, max = MAX_FAVORITES) {
    const atual = Array.isArray(list) ? list.filter((x) => typeof x === 'string') : [];
    if (atual.includes(id)) return { list: atual.filter((x) => x !== id), added: false, full: false };
    if (atual.length >= max) return { list: atual, added: false, full: true };
    return { list: [id, ...atual], added: true, full: false };
}

export function pushRecent(list, id, now, max = MAX_RECENTS) {
    const atual = Array.isArray(list) ? list.filter((r) => r && typeof r.id === 'string') : [];
    return [{ id, t: now }, ...atual.filter((r) => r.id !== id)].slice(0, max);
}

// Resolve UM id guardado contra o catálogo, ou devolve null quando ele deve sair.
// Duas correções silenciosas:
//   - id `u:<url>` (guardado enquanto só havia o fallback embutido) vira a
//     linhagem do link que tem aquela URL, quando a Central responde;
//   - id que não existe mais some — mas só quando o catálogo veio da Central.
//     Com o fallback embutido (API fora do ar) um link "ausente" pode só não
//     estar na lista embutida, e apagar o favorito de alguém por causa de uma
//     falha de rede seria perda de dado.
function resolveStoredId(id, porId, porUrl, fromCentral) {
    if (typeof id !== 'string') return null;
    let alvo = id;
    if (!porId.has(id) && id.startsWith('u:') && porUrl.has(id.slice(2))) {
        alvo = linkId(porUrl.get(id.slice(2)));
    }
    if (!porId.has(alvo) && fromCentral) return null;
    return alvo;
}

function indicesDoCatalogo(links) {
    return {
        porId: new Map(links.map((l) => [linkId(l), l])),
        porUrl: new Map(links.map((l) => [l.url, l])),
    };
}

export function reconcileIds(ids, links, fromCentral) {
    const { porId, porUrl } = indicesDoCatalogo(links);
    const vistos = new Set();
    const saida = [];

    (ids || []).forEach((id) => {
        const alvo = resolveStoredId(id, porId, porUrl, fromCentral);
        if (alvo === null || vistos.has(alvo)) return;
        vistos.add(alvo);
        saida.push(alvo);
    });
    return saida;
}

// O mesmo para os recentes, que carregam o instante junto do id. Em duplicata
// (o `u:` e a linhagem do mesmo link) vale a entrada mais recente — a lista já
// vem do mais novo para o mais antigo.
export function reconcileRecents(recents, links, fromCentral) {
    const { porId, porUrl } = indicesDoCatalogo(links);
    const vistos = new Set();
    const saida = [];

    (Array.isArray(recents) ? recents : []).forEach((r) => {
        const alvo = r && resolveStoredId(r.id, porId, porUrl, fromCentral);
        if (!alvo || vistos.has(alvo)) return;
        vistos.add(alvo);
        saida.push({ id: alvo, t: r.t });
    });
    return saida;
}

// Converte o histórico antigo (cópias de link, com URL) para a lista nova de
// recentes. Itens cuja URL já não está no catálogo ficam de fora.
export function migrateLegacyHistory(legacy, links, now) {
    const porUrl = new Map(links.map((l) => [l.url, l]));
    const vistos = new Set();
    const saida = [];

    (Array.isArray(legacy) ? legacy : []).forEach((h, i) => {
        const link = h && porUrl.get(h.url);
        if (!link || vistos.has(linkId(link))) return;
        vistos.add(linkId(link));
        // Só a ORDEM do histórico antigo é conhecida, não a hora. Espaçar por
        // minuto preserva a ordem sem inventar um horário.
        saida.push({ id: linkId(link), t: now - i * 60000 });
    });
    return saida.slice(0, MAX_RECENTS);
}

// ---------------------------------------------------------------------------
// Busca — sem acento e sem caixa. Quem busca não digita acento, e uma busca que
// o exige é uma busca que a pessoa conclui estar quebrada.
// ---------------------------------------------------------------------------

const DIACRITICOS = new RegExp('[' + String.fromCharCode(768) + '-' + String.fromCharCode(879) + ']', 'g');

export function fold(texto) {
    return String(texto == null ? '' : texto).normalize('NFD').replace(DIACRITICOS, '').toLowerCase();
}

export function matchesTerm(link, termo, lang, customDefs) {
    const alvo = fold(termo).trim();
    if (!alvo) return true;

    const campos = [
        link.name,
        pickText(link, 'desc', lang),
        pickText(link, 'about', lang),
        pickText(link, 'when', lang),
        categoryLabel(link.cat, lang, customDefs),
    ];
    return campos.some((c) => fold(c).includes(alvo));
}

// ---------------------------------------------------------------------------
// Datas — Intl no idioma da interface. Os horários dos destaques vêm como
// `YYYY-MM-DDTHH:MM` no relógio da planilha e são lidos como relógio de parede,
// sem conversão de fuso: a pessoa lê o horário que quem publicou escolheu.
// ---------------------------------------------------------------------------

const LOCALES = { pt: 'pt-BR', es: 'es-ES', en: 'en-US' };

function paredeParaDate(texto) {
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(texto || ''));
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]));
}

export function formatDay(texto, lang) {
    const d = paredeParaDate(texto);
    if (!d) return '';
    return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.pt, { day: '2-digit', month: '2-digit' }).format(d);
}

export function formatDayTime(texto, lang) {
    const d = paredeParaDate(texto);
    if (!d) return '';
    return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.pt, {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(d);
}

// "hoje, 10:42" · "ontem" · "21/10". O instante vem em ms e é de um relógio
// real (o do navegador, que é quem registrou o clique).
export function formatWhen(t, now, lang) {
    const locale = LOCALES[lang] || LOCALES.pt;
    const d = new Date(t);
    const hoje = new Date(now);
    const dias = Math.round(
        (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) -
            new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 86400000);

    if (dias <= 0) {
        const hora = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
        const rel = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'day');
        return `${rel}, ${hora}`;
    }
    if (dias === 1) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-1, 'day');
    return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit' }).format(d);
}
