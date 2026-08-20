// src/modules/shared/shortcut-service.js
//
// Atalhos do Ctrl+K escolhidos pelo próprio agente.
//
// Um atalho é uma combinação "status + substatus + cenários" com nome e apelido
// próprios. Ele NÃO guarda o texto da nota: guarda a referência do cenário, e o
// texto vem na hora do catálogo (embutido ou publicado na Central). Assim uma
// correção publicada chega ao atalho sem o agente refazer nada.
//
// Por que uma entidade própria e não um campo dentro do cenário (o antigo
// `quickLaunch`): ver docs/decisions/0002-atalhos-ctrl-k-por-agente.md. Em
// resumo - o catálogo de cenários é reescrito inteiro pela Central de Conteúdo,
// levando junto qualquer campo extra que morasse nele.

import { UserPrefsService } from "./user-prefs-service.js";
import { scenarioSnippets, scenarioSlug } from "../notes/data/notes-data.js";

const PREF_KEY = "shortcuts";
const PREF_KEY_SORT = "shortcutsSortByUsage";
const USAGE_KEY = "cw_shortcut_usage_v1";

// Teto deliberado: o Ctrl+K já lista 9 módulos. Passando disso a busca deixa de
// ser "vejo tudo de relance" e vira rolagem, que é o que ele existe pra evitar.
export const MAX_SHORTCUTS = 8;

// Os dois atalhos que até aqui vinham embutidos em notes-data.js. Continuam
// sendo o ponto de partida de quem nunca configurou nada - só que agora como
// dado editável do agente, não como código.
const DEFAULT_SHORTCUTS = [
    {
        // Id fixo (não gerado): a lista padrão é recalculada a cada leitura
        // enquanto o agente não salva nada, e um id novo a cada chamada faria a
        // contagem de uso e a seleção do Ctrl+K apontarem para o vazio.
        id: "sc_default_ni_attempted",
        kind: "note",
        label: "NI Attempted — Início 2 Day Rule",
        alias: "2day inicio",
        payload: {
            caseType: "bau",
            status: "NI",
            subStatus: "NI_Attempted_Contact",
            scenarios: [{ id: "quickfill-ni-attempted-2day", substatus: "NI_Attempted_Contact" }],
        },
    },
    {
        id: "sc_default_in_not_reachable",
        kind: "note",
        label: "IN Not Reachable — Finalização 2 Day Rule",
        alias: "2day fim",
        payload: {
            caseType: "bau",
            status: "IN",
            subStatus: "IN_Not_Reachable",
            scenarios: [{ id: "quickfill-in-no-show-bau", substatus: "IN_Not_Reachable" }],
        },
    },
];

function newId() {
    return "sc_" + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
}

// Devolve o id que existe HOJE no catálogo para a referência guardada, ou null
// se aquele cenário não existe mais. Nunca lança: um atalho órfão precisa
// aparecer marcado na tela, não derrubar o Ctrl+K inteiro.
export function resolveScenarioId(ref) {
    if (!ref || !ref.id) return null;
    if (scenarioSnippets[ref.id]) return ref.id;

    const alvo = scenarioSlug(ref.id, ref.substatus);
    const entries = Object.entries(scenarioSnippets);

    const mesmoSubstatus = entries.find(([id, data]) =>
        scenarioSlug(id, ref.substatus) === alvo &&
        Array.isArray(data.substatus) && data.substatus.includes(ref.substatus)
    );
    if (mesmoSubstatus) return mesmoSubstatus[0];

    const qualquer = entries.find(([id]) => scenarioSlug(id, ref.substatus) === alvo);
    return qualquer ? qualquer[0] : null;
}

// Um atalho está quebrado quando alguma referência de cenário não resolve mais.
// Sem cenário nenhum (só status+substatus) é um atalho válido e intencional.
export function shortcutIssues(shortcut) {
    const refs = (shortcut.payload && shortcut.payload.scenarios) || [];
    return refs.filter((ref) => !resolveScenarioId(ref)).map((ref) => ref.id);
}

function readUsage() {
    try {
        return JSON.parse(localStorage.getItem(USAGE_KEY) || "{}");
    } catch (e) {
        return {};
    }
}

function normalize(list) {
    if (!Array.isArray(list)) return [];
    return list
        .filter((s) => s && s.id && s.payload && s.payload.subStatus)
        .map((s, idx) => ({
            id: s.id,
            kind: s.kind || "note",
            label: String(s.label || "Atalho"),
            alias: String(s.alias || ""),
            order: Number.isFinite(s.order) ? s.order : idx,
            payload: {
                caseType: s.payload.caseType || "bau",
                status: s.payload.status || String(s.payload.subStatus).split("_")[0],
                subStatus: s.payload.subStatus,
                scenarios: Array.isArray(s.payload.scenarios)
                    ? s.payload.scenarios.filter((r) => r && r.id).map((r) => ({
                        id: r.id,
                        substatus: r.substatus || s.payload.subStatus,
                    }))
                    : [],
            },
        }));
}

export const ShortcutService = {
    // Lista na ordem de exibição. Por padrão os mais usados vêm primeiro (o
    // agente não precisa configurar nada pra melhorar); trocando o modo em
    // Configurações vale a ordem manual, e o arrastar passa a valer.
    list() {
        const stored = UserPrefsService.get(PREF_KEY, null);
        const list = normalize(stored === null ? ShortcutService.defaults() : stored);
        const usage = readUsage();

        return list.slice().sort((a, b) => {
            if (ShortcutService.isSortedByUsage()) {
                const diff = (usage[b.id] || 0) - (usage[a.id] || 0);
                if (diff) return diff;
            }
            return a.order - b.order;
        });
    },

    // A lista crua, na ordem manual - é o que a tela de gerenciamento edita.
    listRaw() {
        const stored = UserPrefsService.get(PREF_KEY, null);
        return normalize(stored === null ? ShortcutService.defaults() : stored)
            .sort((a, b) => a.order - b.order);
    },

    defaults() {
        return DEFAULT_SHORTCUTS.map((s, idx) => ({ ...s, order: idx }));
    },

    isSortedByUsage() {
        return UserPrefsService.get(PREF_KEY_SORT, true) !== false;
    },

    setSortedByUsage(value) {
        return UserPrefsService.set(PREF_KEY_SORT, !!value);
    },

    async save(shortcut) {
        const list = ShortcutService.listRaw();
        const idx = list.findIndex((s) => s.id === shortcut.id);

        if (idx === -1 && list.length >= MAX_SHORTCUTS) {
            return { ok: false, reason: "limit" };
        }

        const entry = normalize([{ ...shortcut, id: shortcut.id || newId() }])[0];
        if (!entry) return { ok: false, reason: "invalid" };

        if (idx === -1) {
            entry.order = list.length;
            list.push(entry);
        } else {
            entry.order = list[idx].order;
            list[idx] = entry;
        }

        const result = await UserPrefsService.set(PREF_KEY, list);
        return { ok: true, synced: result.synced, shortcut: entry };
    },

    async remove(id) {
        const list = ShortcutService.listRaw()
            .filter((s) => s.id !== id)
            .map((s, idx) => ({ ...s, order: idx }));
        await UserPrefsService.set(PREF_KEY, list);
    },

    // Reordena movendo um item para uma posição. A lista inteira é reescrita com
    // `order` sequencial pra nunca depender de índices antigos.
    async reorder(id, novoIndice) {
        const list = ShortcutService.listRaw();
        const atual = list.findIndex((s) => s.id === id);
        if (atual === -1) return;

        const [item] = list.splice(atual, 1);
        const destino = Math.max(0, Math.min(novoIndice, list.length));
        list.splice(destino, 0, item);

        await UserPrefsService.set(PREF_KEY, list.map((s, idx) => ({ ...s, order: idx })));
    },

    // Contagem local, de propósito: é sinal de conveniência, não dado do agente.
    // Sincronizar isso significaria uma escrita na nuvem a cada Ctrl+K.
    registerUse(id) {
        try {
            const usage = readUsage();
            usage[id] = (usage[id] || 0) + 1;
            localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
        } catch (e) { /* contador é acessório: nunca pode atrapalhar o atalho */ }
    },

};
