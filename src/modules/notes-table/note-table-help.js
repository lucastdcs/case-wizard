// src/modules/notes-table/note-table-help.js
//
// O "?" ao lado de cada bloco (Before, Implementation, After, Consult): o que o bloco
// é, quando usar, para quais sub-status e tasks, e como o Tag Support o afeta.
//
// É texto de TELA, no idioma da INTERFACE (getLanguage(), como o resto de
// note-table-i18n.js): NADA daqui vai para a nota. O texto da nota é contrato e
// vem do catálogo (ADR-0022); esta ajuda só explica.
//
// Fonte: o Doc "fluxo after implementation before" (Drive do Lucas, 2026-11-12), nos
// campos "When to Use" e "Applicable Statuses" de cada bloco e nas linhas de cada
// tabela. O Doc é a regra ("devemos seguir aquelas regras"): onde ele não diz, aqui
// também não. O "MMS only" e o "M&A" do Consult ficam como o Doc os deixa, sem
// definição (decisão do Lucas: segue como está, escondido, como opção).
//
// Fica num arquivo próprio, e não dentro do catálogo, de propósito: um segmento
// publicado na Central SUBSTITUI o embutido inteiro (note-table-service.js), então um
// campo `help` no catálogo sumiria para quem usa um layout publicado. Passar isto
// para a Central é um passo à parte (campo no catálogo + fallback por bloco).
//
// Os blocos das fases ECL (Phase 0 a 3, Interim) ainda não têm ajuda: o "?" só
// aparece onde há texto.
//
// Os três dicionários abaixo são DADOS puros {pt, es, en} (o test:i18n confere a
// paridade); a composição por bloco fica na função compose(), no fim.

import { getLanguage } from "../shared/i18n.js";

export const HELP_LABELS = {
    pt: { when: "Quando usar", statuses: "Sub-status", tasks: "Tasks", ts: "Tag Support", must: "Obrigatório", flow: "Na linha do tempo",
          close: "Fechar", ask: (n) => `O que é ${n}?`, notInNote: "Esta explicação é só para você: não vai para a nota." },
    es: { when: "Cuándo usar", statuses: "Sub-status", tasks: "Tasks", ts: "Tag Support", must: "Obligatorio", flow: "En la línea de tiempo",
          close: "Cerrar", ask: (n) => `¿Qué es ${n}?`, notInNote: "Esta explicación es solo para usted: no va en la nota." },
    en: { when: "When to use", statuses: "Sub-status", tasks: "Tasks", ts: "Tag Support", must: "Required", flow: "On the timeline",
          close: "Close", ask: (n) => `What is ${n}?`, notInNote: "This explanation is for you only: it does not go into the note." },
};

// O que se repete entre blocos. `{closed}` nos sub-status vira o texto de `closed` (os SO e
// os IN/DC do fechamento são a mesma lista nos quatro blocos). Before e Implementation têm
// o MESMO "quando usar" e os mesmos sub-status no Doc.
const SHARED = {
    pt: {
        closed: "Todos os SO (Implementation, Education e Troubleshooting Only) e os IN/DC (Troubleshooting [Transferred], Out of Scope - Rerouted, Not Reachable, Reschedule Limit Exceeded etc.).",
        flow: "Before, Implementation e After pedem prints em momentos diferentes: antes de mexer, o que foi feito na call e a confirmação depois do follow-up.",
        tasks: "Só ACT (Ads Conversion Tracking) e ECW (Enhanced Conversions for Web).",
        ts: "Com Tag Support = Yes, as linhas de print de ACT/ECW viram NA automático. “Incluir mesmo assim” religa os prints da task.",
        na: "Cada linha aceita NA quando não se aplica.",
        sameDayWhen: "Depois de appointments e de fechamentos no mesmo dia: sempre que você registra a nota depois de uma call do SpeakEasy, de uma tentativa de contato (AC) ou do fechamento do caso no mesmo dia.",
        sameDayStatuses: [
            ["Caso não fechado no mesmo dia", "NI (Awaiting Inputs, Awaiting Validation, In Consult, Attempted Contact) e AS (Acceptable Reschedule, Reschedule 1)."],
            ["Caso fechado no dia do appointment", "{closed}"],
        ],
    },
    es: {
        closed: "Todos los SO (Implementation, Education y Troubleshooting Only) y los IN/DC (Troubleshooting [Transferred], Out of Scope - Rerouted, Not Reachable, Reschedule Limit Exceeded, etc.).",
        flow: "Before, Implementation y After piden capturas en momentos distintos: antes de tocar nada, lo que se hizo en la llamada y la confirmación después del seguimiento.",
        tasks: "Solo ACT (Ads Conversion Tracking) y ECW (Enhanced Conversions for Web).",
        ts: "Con Tag Support = Yes, las líneas de captura de ACT/ECW pasan a NA automático. “Incluir de todos modos” reactiva las capturas de la task.",
        na: "Cada línea acepta NA cuando no aplica.",
        sameDayWhen: "Después de citas y de cierres el mismo día: siempre que registre la nota después de una llamada de SpeakEasy, de un intento de contacto (AC) o del cierre del caso el mismo día.",
        sameDayStatuses: [
            ["Caso no cerrado el mismo día", "NI (Awaiting Inputs, Awaiting Validation, In Consult, Attempted Contact) y AS (Acceptable Reschedule, Reschedule 1)."],
            ["Caso cerrado el día de la cita", "{closed}"],
        ],
    },
    en: {
        closed: "All SO (Implementation, Education and Troubleshooting Only) and IN/DC (Troubleshooting [Transferred], Out of Scope - Rerouted, Not Reachable, Reschedule Limit Exceeded, etc.).",
        flow: "Before, Implementation and After ask for prints at different moments: before you change anything, what was done on the call, and the confirmation after the follow-up.",
        tasks: "ACT (Ads Conversion Tracking) and ECW (Enhanced Conversions for Web) only.",
        ts: "With Tag Support = Yes, the ACT/ECW print rows become automatic NA. “Include anyway” brings the task's prints back.",
        na: "Every row accepts NA when it does not apply.",
        sameDayWhen: "After appointments and same-day closures: whenever you log the note after a SpeakEasy call, an Attempted Contact (AC) dial or a same-day case closure.",
        sameDayStatuses: [
            ["Case not closed the same day", "NI (Awaiting Inputs, Awaiting Validation, In Consult, Attempted Contact) and AS (Acceptable Reschedule, Reschedule 1)."],
            ["Case closed on the day of the appointment", "{closed}"],
        ],
    },
};

// O que é PRÓPRIO de cada bloco (sobrepõe o SHARED na composição).
const BLOCKS = {
    before: {
        pt: { what: "Os prints de como o caso chegou, antes de você mexer: status da conversão no Google Ads, repeat rate elevado, otimização de lance inicial e EC Qualdash. Só no ECW: o alerta do Tag Diagnostics." },
        es: { what: "Las capturas de cómo llegó el caso, antes de tocar nada: estado de la conversión en Google Ads, repeat rate elevado, optimización de puja inicial y EC Qualdash. Solo en ECW: la alerta de Tag Diagnostics." },
        en: { what: "Prints of how the case arrived, before you touch anything: conversion status in Google Ads, elevated repeat rate, initial bidding optimization and EC Qualdash. ECW only: the Tag Diagnostics alert." },
    },
    impl: {
        pt: { what: "Os prints do que foi feito na call: status da conversão no Google Ads, configurações da conversão (ID e label), GTM/backend do site, Tag Assistant com a tag disparada, termos de dados do cliente aceitos e o hit enviado (200 OK). Só no ECW: Enhanced Conversions ligado e o parâmetro em válido (ou ecsid)." },
        es: { what: "Las capturas de lo que se hizo en la llamada: estado de la conversión en Google Ads, configuración de la conversión (ID y label), GTM/backend del sitio, Tag Assistant con la etiqueta disparada, términos de datos del cliente aceptados y el hit enviado (200 OK). Solo en ECW: Enhanced Conversions activado y el parámetro em válido (o ecsid)." },
        en: { what: "Prints of what was done on the call: conversion status in Google Ads, conversion settings (ID and label), GTM/site backend, Tag Assistant with the tag fired, Customer Data Terms accepted and the hit sent (200 OK). ECW only: Enhanced Conversions turned on and a valid em parameter (or ecsid)." },
    },
    after: {
        pt: {
            what: "Os prints da validação depois da janela de follow-up: status da conversão, repeat rate normalizado (~1,0 depois de 2 dias no ACT e 7 dias no ECW) e otimização de lance depois da mudança. Só no ECW: Tag Diagnostics do dia 7 e/ou EC Qualdash.",
            when: "Em follow-ups ou ao fechar o caso depois de cumprir a janela de follow-up. Não vale no dia do appointment.",
            statuses: [
                ["Ainda há follow-ups", "NI (Awaiting Inputs, Awaiting Validation, In Consult) e AS (Acceptable Reschedule, Reschedule 1)."],
                ["Caso fechado depois da janela de follow-up", "{closed}"],
            ],
        },
        es: {
            what: "Las capturas de la validación después de la ventana de seguimiento: estado de la conversión, repeat rate normalizado (~1,0 tras 2 días en ACT y 7 días en ECW) y optimización de puja después del cambio. Solo en ECW: Tag Diagnostics del día 7 y/o EC Qualdash.",
            when: "En seguimientos o al cerrar el caso después de cumplir la ventana de seguimiento. No vale el día de la cita.",
            statuses: [
                ["Aún hay seguimientos", "NI (Awaiting Inputs, Awaiting Validation, In Consult) y AS (Acceptable Reschedule, Reschedule 1)."],
                ["Caso cerrado después de la ventana de seguimiento", "{closed}"],
            ],
        },
        en: {
            what: "Prints of the validation after the follow-up window: conversion status, normalized repeat rate (~1.0 after 2 days for ACT and 7 days for ECW) and bidding optimization after the change. ECW only: Day 7 Tag Diagnostics and/or EC Qualdash.",
            when: "During follow-ups or when closing the case after completing the follow-up window. NOT on the day of the appointment.",
            statuses: [
                ["More follow-ups are needed", "NI (Awaiting Inputs, Awaiting Validation, In Consult) and AS (Acceptable Reschedule, Reschedule 1)."],
                ["Case closed after the follow-up window", "{closed}"],
            ],
        },
    },
    consult: {
        pt: {
            what: "O caminho da consulta ou transferência para M&A e a aprovação do SME: print confirmando que o caso foi para a fila certa e print (ou nota registrada) com a aprovação do SME para o Split & Transfer ou o descarte.",
            when: "Sempre que você precisar consultar ou transferir o caso para M&A, depois de uma call ou de uma janela de follow-up.",
            statuses: [["Caso fechado depois do Split & Transfer para M&A", "{closed}"]],
            tasks: "Todas as tasks.",
            must: "Em IN - Troubleshooting [Transferred], SO - Troubleshooting Only com Split & Transfer e IN/DC - Out of Scope - Rerouted. Nos outros casos, escreva NA.",
        },
        es: {
            what: "La ruta de la consulta o transferencia a M&A y la aprobación del SME: captura que confirma que el caso fue a la fila correcta y captura (o nota registrada) con la aprobación del SME para el Split & Transfer o el descarte.",
            when: "Siempre que deba consultar o transferir el caso a M&A, después de una llamada o de una ventana de seguimiento.",
            statuses: [["Caso cerrado después del Split & Transfer a M&A", "{closed}"]],
            tasks: "Todas las tasks.",
            must: "En IN - Troubleshooting [Transferred], SO - Troubleshooting Only con Split & Transfer e IN/DC - Out of Scope - Rerouted. En los demás casos, escriba NA.",
        },
        en: {
            what: "The routing path of the consult or transfer to M&A and the SME approval: a screenshot confirming the case went to the right queue and a screenshot (or logged note) of the SME approval for the Split & Transfer or the discard.",
            when: "Whenever you need to consult or transfer the case to M&A, after a call or after a follow-up window.",
            statuses: [["Case closed after splitting & transferring to M&A", "{closed}"]],
            tasks: "All tasks.",
            must: "For IN - Troubleshooting [Transferred], SO - Troubleshooting Only with Split & Transfer, and IN/DC - Out of Scope - Rerouted. Otherwise write NA.",
        },
    },
};

const LANGS = ["pt", "es", "en"];

// Junta o que o bloco divide com os outros (SHARED) ao que é só dele (BLOCKS). O Consult
// não divide nada: não é de ACT/ECW e não tem relação com o Tag Support.
function compose(blockId, lang) {
    const sh = SHARED[lang];
    const base = blockId === "consult" ? {} : { flow: sh.flow, tasks: sh.tasks, ts: sh.ts, na: sh.na };
    const sameDay = blockId === "before" || blockId === "impl" ? { when: sh.sameDayWhen, statuses: sh.sameDayStatuses } : {};
    const merged = { ...base, ...sameDay, ...BLOCKS[blockId][lang] };
    merged.statuses = merged.statuses.map(([k, v]) => [k, v.replace("{closed}", sh.closed)]);
    return merged;
}

// Ajuda já composta, por bloco e idioma: { before: { pt, es, en }, ... }.
export const BLOCK_HELP = Object.fromEntries(Object.keys(BLOCKS).map((b) => [b, Object.fromEntries(LANGS.map((l) => [l, compose(b, l)]))]));

// Idioma sem entrada cai no PT, nunca em outro idioma por acaso (learning "Mapa de
// idioma só de ES").
export function helpLabels(lang = getLanguage()) {
    return HELP_LABELS[lang] || HELP_LABELS.pt;
}

// Ajuda do bloco no idioma da interface, ou null quando o bloco não tem (fases ECL).
export function blockHelp(blockId, lang = getLanguage()) {
    const h = BLOCK_HELP[blockId];
    return h ? (h[lang] || h.pt) : null;
}
