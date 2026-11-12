// src/modules/shared/pill-layout.js
//
// Onde cada módulo mora na pílula flutuante: fixado nela (na ordem que o agente
// escolheu) ou guardado na gaveta, atrás do botão "Mais".
//
// É preferência do agente, não do catálogo: vive em UserPrefsService (cache local
// na hora, nuvem em segundo plano) pelo mesmo motivo dos atalhos do Ctrl+K - o
// bookmarklet troca de máquina e de perfil do Chrome com frequência. Ver
// docs/decisions/0023-pilula-com-gaveta-e-layout-por-agente.md.
//
// A parte pura (catálogo, resolveLayout, moveModule) não toca em DOM nem em
// nuvem: é o que test:pill-layout exercita.

import { UserPrefsService } from "./user-prefs-service.js";
import { getLanguage } from "./i18n.js";

const PREF_KEY = "pillLayout";

// Ordem histórica da pílula. Também é a ordem em que entram os módulos que o
// agente ainda não posicionou.
export const PILL_MODULE_IDS = [
    "notes", "precall", "bauform", "email", "script", "links",
    "library", "timezone", "configs", "broadcast",
    // Nota em tabela (ADR-0024): entra na gaveta, não nos fixados (ADR-0023). O
    // agente que a usa todo dia a fixa em Configurações.
    "notetable",
];

// 7 é o que cabe: com 10 botões a pílula aberta mede 641px e, num viewport de
// notebook (650px), perde 56px no topo - o punho de arrastar some. 7 fixados +
// o botão Mais medem 533px e cabem com folga. Passar disso devolveria o problema
// que a gaveta existe para resolver, então o teto é deliberado (mesmo precedente
// do MAX_SHORTCUTS).
export const MAX_PINNED = 7;

// Quem nunca configurou nada vê a pílula de sempre, menos Biblioteca, Fusos e
// Configurações, que descem para a gaveta - os três de uso mais esporádico.
export const DEFAULT_LAYOUT = {
    pinned: ["notes", "precall", "bauform", "email", "script", "links", "broadcast"],
    drawer: ["library", "timezone", "configs", "notetable"],
};

const same = (name) => ({ pt: name, es: name, en: name });

// Mesmos nomes do Ctrl+K (command-palette.js): é o mesmo módulo e tem de ter o
// mesmo nome na dica da pílula, na gaveta, em Configurações e na busca.
const MODULE_LABELS = {
    notes: same("Case Notes"),
    precall: same("Pre-call Checklist"),
    bauform: same("BAU Form"),
    email: same("Email Assistant"),
    script: same("Call Script"),
    links: { pt: "Central de Links", es: "Central de Enlaces", en: "Links Central" },
    library: { pt: "Minha Biblioteca", es: "Mi Biblioteca", en: "My Library" },
    timezone: { pt: "Fusos Horários", es: "Husos Horarios", en: "Time Zones" },
    configs: { pt: "Configurações", es: "Configuración", en: "Settings" },
    broadcast: { pt: "Avisos", es: "Avisos", en: "Broadcast" },
    notetable: { pt: "Nota em tabela", es: "Nota en tabla", en: "Table note" },
};

export function moduleLabel(id, lang = getLanguage()) {
    const labels = MODULE_LABELS[id];
    if (!labels) return id;
    return labels[lang] || labels.pt;
}

// Aceita qualquer coisa que tenha sido salvo e devolve sempre um layout válido:
// - id desconhecido (módulo removido) e id repetido são descartados;
// - o que passar do teto de fixados desce para o começo da gaveta;
// - módulo que o layout salvo não conhece (lançado depois) entra no fim da
//   gaveta, e não na pílula - ninguém tem a pílula remexida por uma release.
// Nunca lança: um blob estranho na nuvem não pode derrubar a pílula.
export function resolveLayout(stored) {
    const valid = stored && Array.isArray(stored.pinned) && Array.isArray(stored.drawer)
        ? stored
        : DEFAULT_LAYOUT;

    const known = new Set(PILL_MODULE_IDS);
    const seen = new Set();
    const take = (ids) => {
        const kept = [];
        for (const id of ids) {
            if (known.has(id) && !seen.has(id)) {
                seen.add(id);
                kept.push(id);
            }
        }
        return kept;
    };

    let pinned = take(valid.pinned);
    let drawer = take(valid.drawer);

    if (pinned.length > MAX_PINNED) {
        drawer = [...pinned.slice(MAX_PINNED), ...drawer];
        pinned = pinned.slice(0, MAX_PINNED);
    }

    const missing = PILL_MODULE_IDS.filter((id) => !seen.has(id));
    return { pinned, drawer: [...drawer, ...missing] };
}

// Move `id` para `list` ('pinned' | 'drawer') na posição `index`, entre os itens
// que já estão lá. Devolve { ok, layout } ou { ok: false, reason }.
export function moveModule(layout, id, list, index) {
    if (!PILL_MODULE_IDS.includes(id)) return { ok: false, reason: "unknown" };
    if (list !== "pinned" && list !== "drawer") return { ok: false, reason: "unknown" };

    const pinned = layout.pinned.filter((m) => m !== id);
    const drawer = layout.drawer.filter((m) => m !== id);
    const target = list === "pinned" ? pinned : drawer;

    if (list === "pinned" && pinned.length >= MAX_PINNED) return { ok: false, reason: "full" };

    const at = Math.max(0, Math.min(Number.isFinite(index) ? index : target.length, target.length));
    target.splice(at, 0, id);
    return { ok: true, layout: { pinned, drawer } };
}

const listeners = new Set();
let lastEmitted = null;

function current() {
    return resolveLayout(UserPrefsService.get(PREF_KEY, null));
}

function emitIfChanged() {
    const now = current();
    const serialized = JSON.stringify(now);
    if (serialized === lastEmitted) return;
    lastEmitted = serialized;
    listeners.forEach((fn) => {
        try { fn(now); } catch (e) { console.warn("pill-layout: ouvinte falhou:", e); }
    });
}

// Decisão síncrona, persistência assíncrona. Devolve { ok: true, saved } na hora,
// com os ouvintes já avisados, e `saved` resolve com { synced } quando a nuvem
// responder. UserPrefsService.set() escreve o cache local de forma síncrona e só
// depois espera o JSONP (até 15s de watchdog): quem esperasse a nuvem para
// repintar, focar ou tocar o som responderia ao arrastar com segundos de atraso
// (foi o defeito do foco do teclado na tela de Configurações).
function commit(value) {
    const saved = UserPrefsService.set(PREF_KEY, value).then((result) => ({ synced: result.synced }));
    emitIfChanged();
    return { ok: true, saved };
}

export const PillLayoutService = {
    get: current,

    isFull() {
        return current().pinned.length >= MAX_PINNED;
    },

    // { ok: false, reason } se recusado (nada muda, ninguém é avisado).
    move(id, list, index) {
        const moved = moveModule(current(), id, list, index);
        if (!moved.ok) return moved;
        return commit(moved.layout);
    },

    // null (e não o layout padrão) para o padrão continuar sendo o do código: se
    // a lista padrão mudar numa release, quem restaurou acompanha.
    reset() {
        return commit(null);
    },

    onChange(callback) {
        if (lastEmitted === null) lastEmitted = JSON.stringify(current());
        listeners.add(callback);
        return () => listeners.delete(callback);
    },

    // Chamado quando a sincronia traz o layout da nuvem (máquina nova): só avisa
    // se de fato mudou.
    refresh: emitIfChanged,
};
