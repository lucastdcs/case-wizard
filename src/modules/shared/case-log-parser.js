// src/modules/shared/case-log-parser.js
//
// Extrai fatos estruturados do case log: agendamento, transferência,
// cancelamento e descarte.
//
// LIMITE IMPORTANTE, e ele molda tudo aqui: o servidor trunca o preview de
// cada mensagem em ~152 caracteres, terminando com "..." literal. Só dá para
// ler com segurança o que cabe nesse começo. Medido nos fixtures:
//
//   cabe          — data/hora/fuso do agendamento, quem foi designado,
//                   origem e destino da transferência, motivo do descarte,
//                   motivo do cancelamento;
//   NÃO cabe      — o AppointmentId, que vem logo depois do motivo e é
//                   cortado no meio.
//
// Por isso `appointmentId` só é preenchido quando a mensagem está expandida.
// Este módulo não expande nada por conta própria: expandir custa clique e
// espera na tela da pessoa, e quem paga esse preço faz isso explicitamente
// (ver notes/automation/case-log-scraper.js).
//
// O texto do log fica em inglês mesmo quando o painel do caso está
// traduzido — o tradutor do CRM age só no painel. Ainda assim os padrões
// aceitam a variante em português onde ela é barata, porque o custo de
// aceitar a mais é zero e o de faltar é o campo vazio.

const RE_EMAIL_GOOGLE = /[A-Za-z0-9._%+-]+@google\.com/;

function mensagens() {
    return Array.from(document.querySelectorAll('case-message-view'))
        .map((el) => el.textContent.replace(/\s+/g, ' ').trim());
}

const acha = (padrao) => mensagens().find((t) => padrao.test(t)) || null;

// "An appointment has been successfully created with the customer on
//  September 10 at 9:00AM [Brazil/East]. fulano@google.com has been assigned"
export function extrairAgendamento() {
    const texto = acha(/appointment has been successfully created|agendamento foi criado/i);
    if (!texto) return null;

    const quando = texto.match(/on ([A-Z][a-z]+ \d{1,2}) at ([\d:]+\s?[AP]M)/i);
    const fuso = texto.match(/\[([^\]]+)\]/);
    const designado = texto.match(RE_EMAIL_GOOGLE);

    return {
        data: quando?.[1] || null,          // "September 10"
        hora: quando?.[2] || null,          // "9:00AM"
        timezone: fuso?.[1] || null,        // "Brazil/East"
        designado: designado?.[0] || null,  // quem ficou com o agendamento
    };
}

// "Transfer From Robot - Appointment Scheduler to Technical Solutions-PT-Cognizant"
export function extrairTransferencia() {
    const texto = acha(/\bTransfer\b|\bTransferência\b/i);
    if (!texto) return null;

    const m = texto.match(/(?:Transfer|Transferência)\s+(?:From|De)\s+(.+?)\s+(?:to|para)\s+(.+?)(?:\.\.\.|$)/i);
    if (!m) return null;

    return { de: m[1].trim(), para: m[2].trim() };
}

// "The appointment ... was automatically canceled.
//  (Reason: AutoCanceled, All Pending, InitialAppointment). (AppointmentId= ..."
export function extrairCancelamento() {
    const texto = acha(/appointment .*was (?:automatically )?canceled|foi cancelad/i);
    if (!texto) return null;

    const motivo = texto.match(/\(Reason:\s*([^)]+)\)/i);
    // Exige o ")" de fechamento de propósito. No preview truncado o número
    // é cortado no meio ("(AppointmentId= 8888000..."), e um \d+ solto
    // devolveria esse pedaço como se fosse o ID inteiro — um valor que
    // parece válido e não é, que é pior que vazio. Só casa expandido.
    const id = texto.match(/AppointmentId=\s*(\d+)\s*\)/i);

    return {
        motivo: motivo?.[1].trim() || null,
        appointmentId: id?.[1] || null,
    };
}

// "archive Sep 9, 9:07 AM Discard Abandoned"
export function extrairDescarte() {
    const texto = acha(/\bDiscard\b|\bDescarte\b/i);
    if (!texto) return null;

    const m = texto.match(/(?:Discard|Descarte)\s+(.+?)(?:\.\.\.|$)/i);
    return m ? { motivo: m[1].trim() } : null;
}

/**
 * Tudo o que dá para tirar do log sem expandir mensagem nenhuma.
 * Cada bloco vem null quando o caso não tem aquele evento.
 */
export function getCaseLogFacts() {
    return {
        agendamento: extrairAgendamento(),
        transferencia: extrairTransferencia(),
        cancelamento: extrairCancelamento(),
        descarte: extrairDescarte(),
    };
}
