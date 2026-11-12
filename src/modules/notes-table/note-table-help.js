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
// As fases ECL (SBS-E e MMS) vêm do Doc "Template 2 e 3" e são chaveadas por
// segmento+bloco (`sbse.audit`, `mms.audit`...), porque o mesmo bloco tem "quando usar" e
// sub-status diferentes em cada segmento. O "?" só aparece onde há texto.
//
// Os dicionários abaixo são DADOS puros {pt, es, en} (o test:i18n confere a
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

// O que as fases ECL repetem. `{impl}` nos sub-status vira `impl` (Phase 2 do SBS-E e Phase 3 do MMS
// têm os mesmos sub-status no Doc).
const ECL_SHARED = {
    pt: {
        impl: [["Em andamento", "Todos os NI (Awaiting Inputs, Awaiting Validation etc.)."], ["Implementado", "SO (Implementation, Troubleshooting e Education Only)."], ["Inativo", "IN (Instructions Shared etc.)."]],
        one: "Uma fase por nota: escolha a que descreve o que você acabou de fazer.",
    },
    es: {
        impl: [["En curso", "Todos los NI (Awaiting Inputs, Awaiting Validation, etc.)."], ["Implementado", "SO (Implementation, Troubleshooting y Education Only)."], ["Inactivo", "IN (Instructions Shared, etc.)."]],
        one: "Una fase por nota: elija la que describe lo que acaba de hacer.",
    },
    en: {
        impl: [["In progress", "All NI (Awaiting Inputs, Awaiting Validation, etc.)."], ["Implemented", "SO (Implementation, Troubleshooting and Education Only)."], ["Inactive", "IN (Instructions Shared, etc.)."]],
        one: "One phase per note: pick the one that describes what you just did.",
    },
};

const ECL_BLOCKS = {
    "sbse.audit": {
        pt: { what: "O registro da auditoria de prontidão: por CID (To Be Worked?, CID, Under MCC?, resultado e link da auditoria e aprovação do SME), os detalhes gerais e os prints da auditoria e do GAM Ping. TBW = CID a trabalhar; N-TBW = não será trabalhado.", when: "Depois que a auditoria é concluída E revisada/aprovada pelo SME." },
        es: { what: "El registro de la auditoría de preparación: por CID (To Be Worked?, CID, Under MCC?, resultado y enlace de la auditoría y aprobación del SME), los detalles generales y las capturas de la auditoría y del GAM Ping. TBW = CID a trabajar; N-TBW = no se trabajará.", when: "Después de que la auditoría se concluya Y sea revisada/aprobada por el SME." },
        en: { what: "The record of the readiness audit: per CID (To Be Worked?, CID, Under MCC?, audit outcome and link, and SME sign-off), the general details and the audit and GAM Ping screenshots. TBW = CID to be worked; N-TBW = will not be worked.", when: "After the audit is completed AND reviewed/signed-off by the SME." },
    },
    "sbse.impl_call": {
        pt: { what: "O registro da call de implementação: por CID (To Be Worked?, CID, tag implementada?, mapeamento do Case ID), sub-status e motivo, follow-up, Speakeasy ID, comentários da call, consentimento de gravação e os prints (da call, do nível de acesso da conta, do GAM Ping e os demais).", when: "Depois que a call de implementação é concluída.", statuses: "{impl}" },
        es: { what: "El registro de la llamada de implementación: por CID (To Be Worked?, CID, ¿etiqueta implementada?, mapeo del Case ID), sub-status y motivo, seguimiento, Speakeasy ID, comentarios de la llamada, consentimiento de grabación y las capturas (de la llamada, del nivel de acceso de la cuenta, del GAM Ping y las demás).", when: "Después de que se concluya la llamada de implementación.", statuses: "{impl}" },
        en: { what: "The record of the implementation call: per CID (To Be Worked?, CID, tag implemented?, Case ID mapping), sub-status and reason, follow-up, Speakeasy ID, on-call comments, recording consent and the screenshots (on-call, account access level, GAM Ping and the rest).", when: "After the implementation call is completed.", statuses: "{impl}" },
    },
    "sbse.interim": {
        pt: { what: "Os acompanhamentos com o seller ou o anunciante e o fechamento antes da implementação: sub-status, follow-up, comentários do caso, GAM Ping e os demais prints.", when: "Sempre que você fecha o caso na pré-call ou faz follow-up com o seller ou o anunciante nas etapas de implementação." },
        es: { what: "Los seguimientos con el seller o el anunciante y el cierre antes de la implementación: sub-status, seguimiento, comentarios del caso, GAM Ping y las demás capturas.", when: "Siempre que cierre el caso en la pre-llamada o haga seguimiento con el seller o el anunciante en las etapas de implementación." },
        en: { what: "The follow-ups with the seller or advertiser and the closure before implementation: sub-status, follow-up, case comments, GAM Ping and the other screenshots.", when: "Whenever you close a case in the pre-call or follow up with the seller or advertiser at the implementation stages." },
    },
    "mms.triage": {
        pt: { what: "O registro da triagem inicial: sub-status, follow-up, comentários do caso e GAM Ping.", when: "Depois que o e-mail FR (CR 0A) é enviado, mas os CIDs ainda não foram confirmados.", flow: "Fases em ordem: 0 Triagem inicial, 1 Verificação de elegibilidade, 2 Auditoria e agendamento, 3 Call de pré-implementação. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.", statuses: [["Sub-status", "PI - Eligibility Check In Progress."]] },
        es: { what: "El registro del triaje inicial: sub-status, seguimiento, comentarios del caso y GAM Ping.", when: "Después de enviar el correo FR (CR 0A), pero con los CID aún sin confirmar.", flow: "Fases en orden: 0 Triaje inicial, 1 Verificación de elegibilidad, 2 Auditoría y programación, 3 Llamada de pre-implementación. El Interim cubre los seguimientos y cierres intermedios.", statuses: [["Sub-status", "PI - Eligibility Check In Progress."]] },
        en: { what: "The record of the initial triage: sub-status, follow-up, case comments and GAM Ping.", when: "After the FR email (CR 0A) has been sent BUT the CID(s) are yet to be confirmed.", flow: "Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.", statuses: [["Sub-status", "PI - Eligibility Check In Progress."]] },
    },
    "mms.eligibility": {
        pt: { what: "A verificação de elegibilidade: por CID (To Be Worked?, CID, Under MCC?, status de elegibilidade e prints do Galactic), sub-status, follow-up, comentários do caso e GAM Ping.", when: "Depois que o e-mail FR (CR 0A) é enviado E a elegibilidade dos CIDs confirmados foi checada no Galactic.", flow: "Fases em ordem: 0 Triagem inicial, 1 Verificação de elegibilidade, 2 Auditoria e agendamento, 3 Call de pré-implementação. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.", statuses: [["Sub-status", "PI - Audit In Progress e PI - Eligibility Check In Progress (CIDs confirmados pelo seller, mas ainda se busca identificar oportunidades específicas de implementação para a TechSol, com base no cenário de Next Step do PCM Power)."]] },
        es: { what: "La verificación de elegibilidad: por CID (To Be Worked?, CID, Under MCC?, estado de elegibilidad y capturas de Galactic), sub-status, seguimiento, comentarios del caso y GAM Ping.", when: "Después de enviar el correo FR (CR 0A) Y de comprobar en Galactic la elegibilidad de los CID confirmados.", flow: "Fases en orden: 0 Triaje inicial, 1 Verificación de elegibilidad, 2 Auditoría y programación, 3 Llamada de pre-implementación. El Interim cubre los seguimientos y cierres intermedios.", statuses: [["Sub-status", "PI - Audit In Progress y PI - Eligibility Check In Progress (CID confirmados por el seller, pero aún se buscan oportunidades específicas de implementación para TechSol, según el escenario de Next Step de PCM Power)."]] },
        en: { what: "The eligibility verification: per CID (To Be Worked?, CID, Under MCC?, eligibility status and Galactic screenshots), sub-status, follow-up, case comments and GAM Ping.", when: "After the FR email (CR 0A) has been sent AND the eligibility of the confirmed CID(s) has been checked in Galactic.", flow: "Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.", statuses: [["Sub-status", "PI - Audit In Progress and PI - Eligibility Check In Progress (CIDs confirmed by the seller, but we are still probing for specific implementation opportunities for TechSol based on the PCM Power Next Step scenario)."]] },
    },
    "mms.audit": {
        pt: { what: "O registro da auditoria de prontidão e do agendamento: por CID (To Be Worked?, CID, Under MCC?, resultado e link da auditoria e aprovação do SME), os detalhes gerais e os prints da auditoria e do GAM Ping. TBW = CID a trabalhar; N-TBW = não será trabalhado.", when: "Depois que a auditoria é concluída E revisada/aprovada pelo SME.", flow: "Fases em ordem: 0 Triagem inicial, 1 Verificação de elegibilidade, 2 Auditoria e agendamento, 3 Call de pré-implementação. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.", statuses: [["Sub-status", "PI - Awaiting Appointment e PI - Appointment Scheduled."]] },
        es: { what: "El registro de la auditoría de preparación y la programación: por CID (To Be Worked?, CID, Under MCC?, resultado y enlace de la auditoría y aprobación del SME), los detalles generales y las capturas de la auditoría y del GAM Ping. TBW = CID a trabajar; N-TBW = no se trabajará.", when: "Después de que la auditoría se concluya Y sea revisada/aprobada por el SME.", flow: "Fases en orden: 0 Triaje inicial, 1 Verificación de elegibilidad, 2 Auditoría y programación, 3 Llamada de pre-implementación. El Interim cubre los seguimientos y cierres intermedios.", statuses: [["Sub-status", "PI - Awaiting Appointment y PI - Appointment Scheduled."]] },
        en: { what: "The record of the readiness audit and scheduling: per CID (To Be Worked?, CID, Under MCC?, audit outcome and link, and SME sign-off), the general details and the audit and GAM Ping screenshots. TBW = CID to be worked; N-TBW = will not be worked.", when: "After the audit is completed AND reviewed/signed-off by the SME.", flow: "Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.", statuses: [["Sub-status", "PI - Awaiting Appointment and PI - Appointment Scheduled."]] },
    },
    "mms.impl_call": {
        pt: { what: "O registro da call de pré-implementação (3-way): por CID (To Be Worked?, CID, tag implementada?, mapeamento do Case ID), sub-status e motivo, follow-up, Speakeasy ID, comentários da call, consentimento de gravação e os prints (da call, do nível de acesso da conta, do GAM Ping e os demais).", when: "Depois que a call de pré-implementação (3-way) é concluída OU ao fechar o caso depois de uma call de pré-implementação bem-sucedida.", flow: "Fases em ordem: 0 Triagem inicial, 1 Verificação de elegibilidade, 2 Auditoria e agendamento, 3 Call de pré-implementação. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.", statuses: "{impl}" },
        es: { what: "El registro de la llamada de pre-implementación (3-way): por CID (To Be Worked?, CID, ¿etiqueta implementada?, mapeo del Case ID), sub-status y motivo, seguimiento, Speakeasy ID, comentarios de la llamada, consentimiento de grabación y las capturas (de la llamada, del nivel de acceso de la cuenta, del GAM Ping y las demás).", when: "Después de que se concluya la llamada de pre-implementación (3-way) O al cerrar el caso tras una llamada de pre-implementación exitosa.", flow: "Fases en orden: 0 Triaje inicial, 1 Verificación de elegibilidad, 2 Auditoría y programación, 3 Llamada de pre-implementación. El Interim cubre los seguimientos y cierres intermedios.", statuses: "{impl}" },
        en: { what: "The record of the pre-implementation call (3-way): per CID (To Be Worked?, CID, tag implemented?, Case ID mapping), sub-status and reason, follow-up, Speakeasy ID, on-call comments, recording consent and the screenshots (on-call, account access level, GAM Ping and the rest).", when: "After the 3-way pre-implementation call is completed OR whenever we close a case after a successful pre-implementation call.", flow: "Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.", statuses: "{impl}" },
    },
    "mms.interim": {
        pt: { what: "Os acompanhamentos com o seller ou o anunciante e o fechamento antes da implementação: sub-status, follow-up, comentários do caso, GAM Ping e os demais prints.", when: "Sempre que você fecha o caso na pré-implementação OU faz follow-up com o seller ou o anunciante, na pré-implementação e na implementação.", flow: "Fases em ordem: 0 Triagem inicial, 1 Verificação de elegibilidade, 2 Auditoria e agendamento, 3 Call de pré-implementação. O Interim cobre os acompanhamentos e fechamentos no meio do caminho.", statuses: [["Fechar na pré-implementação", "PI - Lead Not Ready (Not Reachable, Not Ready, Not Interested) e PI - Ineligible (API, Agency, Bidding, Pitch, Ineligible, Fully Adopted)."], ["Acompanhar", "PI - Eligibility Check In Progress, PI - Awaiting Appointment, NI - Awaiting Inputs e NI - In Consult."]] },
        es: { what: "Los seguimientos con el seller o el anunciante y el cierre antes de la implementación: sub-status, seguimiento, comentarios del caso, GAM Ping y las demás capturas.", when: "Siempre que cierre el caso en la pre-implementación O haga seguimiento con el seller o el anunciante, en la pre-implementación y en la implementación.", flow: "Fases en orden: 0 Triaje inicial, 1 Verificación de elegibilidad, 2 Auditoría y programación, 3 Llamada de pre-implementación. El Interim cubre los seguimientos y cierres intermedios.", statuses: [["Cerrar en la pre-implementación", "PI - Lead Not Ready (Not Reachable, Not Ready, Not Interested) y PI - Ineligible (API, Agency, Bidding, Pitch, Ineligible, Fully Adopted)."], ["Dar seguimiento", "PI - Eligibility Check In Progress, PI - Awaiting Appointment, NI - Awaiting Inputs y NI - In Consult."]] },
        en: { what: "The follow-ups with the seller or advertiser and the closure before implementation: sub-status, follow-up, case comments, GAM Ping and the other screenshots.", when: "Whenever we close a case in the pre-implementation stage OR follow up with the seller or advertiser at both the pre-implementation and implementation stages.", flow: "Phases in order: 0 Initial Triage, 1 Eligibility Verification, 2 Readiness Audit & Scheduling, 3 Pre-Implementation Call. Interim covers the follow-ups and closures in between.", statuses: [["Closing in pre-implementation", "PI - Lead Not Ready (Not Reachable, Not Ready, Not Interested) and PI - Ineligible (API, Agency, Bidding, Pitch, Ineligible, Fully Adopted)."], ["Following up", "PI - Eligibility Check In Progress, PI - Awaiting Appointment, NI - Awaiting Inputs and NI - In Consult."]] },
    },
};

const LANGS = ["pt", "es", "en"];

// Fase ECL: sem relação com ACT/ECW nem com o Tag Support. `{impl}` vira a lista compartilhada; todas
// lembram que a nota leva uma fase só.
function composeEcl(key, lang) {
    const own = ECL_BLOCKS[key][lang];
    const sh = ECL_SHARED[lang];
    const merged = { ...own, one: sh.one };
    if (own.statuses === "{impl}") merged.statuses = sh.impl;
    return merged;
}

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
export const BLOCK_HELP = {
    ...Object.fromEntries(Object.keys(BLOCKS).map((b) => [b, Object.fromEntries(LANGS.map((l) => [l, compose(b, l)]))])),
    ...Object.fromEntries(Object.keys(ECL_BLOCKS).map((k) => [k, Object.fromEntries(LANGS.map((l) => [l, composeEcl(k, l)]))])),
};

// Idioma sem entrada cai no PT, nunca em outro idioma por acaso (learning "Mapa de
// idioma só de ES").
export function helpLabels(lang = getLanguage()) {
    return HELP_LABELS[lang] || HELP_LABELS.pt;
}

// Ajuda do bloco no idioma da interface, ou null quando o bloco não tem. Com o segmento, a entrada
// `segmento.bloco` (fases ECL) vence a do bloco puro (ALL TASKS).
export function blockHelp(blockId, lang = getLanguage(), segKey = "") {
    const h = (segKey && BLOCK_HELP[`${segKey}.${blockId}`]) || BLOCK_HELP[blockId];
    return h ? (h[lang] || h.pt) : null;
}
