// scripts/test-timezones.mjs
//
// Testa o catálogo de fusos e a matemática de deslocamento de
// src/modules/shared/timezones.js (ADR-0010).
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O deslocamento gravado no agendamento é calculado, não digitado — e erra em
// silêncio. Um horário uma hora fora não derruba nada: vira uma ligação perdida
// e um anunciante irritado, dias depois, sem nada no log apontando para cá. Os
// casos abaixo são justamente os que um cálculo ingênuo erra:
//
//   - horário de verão do hemisfério norte (a mesma zona muda de -04:00 para
//     -05:00 conforme o MÊS DO AGENDAMENTO, não o mês do envio);
//   - Arizona, que é Mountain e não faz horário de verão;
//   - Brasil, que fazia e deixou de fazer em 2019;
//   - hemisfério sul, onde o verão cai em janeiro.
//
// Não precisa de navegador: `Intl` no Node é o mesmo motor de fusos.
//
// Uso: npm run test:timezones

import {
    TIMEZONE_HUBS,
    offsetMinutesForWallTime,
    formatOffset,
    withZoneOffset,
    zoneFromCrmValue,
} from '../src/modules/shared/timezones.js';

let falhas = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); falhas++; }
}
function igual(atual, esperado, oque) {
    if (atual !== esperado) throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
}

console.log('\n--- Fusos: catálogo e deslocamento ---');

const DESLOCAMENTOS = [
    ['America/New_York', '2026-09-10T14:30', '-04:00', 'Eastern no horário de verão'],
    ['America/New_York', '2026-01-15T14:30', '-05:00', 'Eastern fora do horário de verão'],
    ['America/Chicago', '2026-09-10T14:30', '-05:00', 'Central no horário de verão'],
    ['America/Denver', '2026-09-10T14:30', '-06:00', 'Mountain no horário de verão'],
    ['America/Phoenix', '2026-09-10T14:30', '-07:00', 'Arizona é Mountain e NÃO faz horário de verão'],
    ['America/Phoenix', '2026-01-15T14:30', '-07:00', 'Arizona não muda no inverno tampouco'],
    ['America/Los_Angeles', '2026-01-15T09:00', '-08:00', 'Pacific fora do horário de verão'],
    ['Pacific/Honolulu', '2026-09-10T10:00', '-10:00', 'Havaí nunca faz horário de verão'],
    ['America/Sao_Paulo', '2026-01-15T14:30', '-03:00', 'Brasil não faz horário de verão desde 2019'],
    ['America/Manaus', '2026-09-10T14:30', '-04:00', 'Amazonas'],
    ['Europe/Lisbon', '2026-09-10T14:30', '+01:00', 'Portugal no horário de verão'],
    ['Europe/Madrid', '2026-01-15T14:30', '+01:00', 'Espanha fora do horário de verão'],
    ['America/Santiago', '2026-01-15T14:30', '-03:00', 'Chile: verão em janeiro (hemisfério sul)'],
];

DESLOCAMENTOS.forEach(([zona, parede, esperado, porque]) => {
    check(`${zona} ${parede} → ${esperado} (${porque})`, () => {
        igual(formatOffset(offsetMinutesForWallTime(zona, parede)), esperado, zona);
    });
});

// A regressão que mais importa: duas janelas da MESMA zona, em meses
// diferentes, têm que sair com deslocamentos diferentes. Um cálculo que use
// "agora" em vez da data do agendamento passa em tudo acima e falha aqui.
check('a mesma zona muda de deslocamento conforme a data do agendamento', () => {
    const setembro = withZoneOffset('2026-09-10T14:30', 'America/New_York');
    const janeiro = withZoneOffset('2027-01-15T09:00', 'America/New_York');
    igual(setembro, '2026-09-10T14:30-04:00', 'setembro');
    igual(janeiro, '2027-01-15T09:00-05:00', 'janeiro');
});

check('withZoneOffset é idempotente (não carimba duas vezes)', () => {
    igual(withZoneOffset('2026-09-10T14:30-04:00', 'America/Chicago'), '2026-09-10T14:30-04:00', 'já carimbado');
});

check('withZoneOffset devolve vazio para entrada vazia', () => {
    igual(withZoneOffset('', 'America/Chicago'), '', 'vazio');
});

// Preferimos devolver o que veio a inventar um deslocamento: gravar errado é
// pior do que gravar sem fuso, porque o errado parece confiável.
check('entrada não parseável passa intacta, sem deslocamento inventado', () => {
    igual(withZoneOffset('amanhã de manhã', 'America/Chicago'), 'amanhã de manhã', 'texto livre');
});

check('o instante resultante é o mesmo horário de parede na zona de origem', () => {
    const carimbado = withZoneOffset('2026-09-10T14:30', 'America/New_York');
    const relido = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date(carimbado));
    igual(relido, '14:30', 'ida e volta pela zona de origem');
});

console.log('\n--- Catálogo ---');

check('todo alias do CRM aponta para uma zona que existe no catálogo', () => {
    const zonas = new Set(TIMEZONE_HUBS.map(h => h.zone));
    ['Brazil/East', 'Brazil/West', 'Brazil/Acre', 'US/Eastern', 'US/Central',
     'US/Mountain', 'US/Arizona', 'US/Pacific', 'US/Alaska', 'US/Hawaii',
     'Mexico/General'].forEach(bruto => {
        const zona = zoneFromCrmValue(bruto);
        if (!zona) throw new Error(`${bruto} não resolveu`);
        if (!zonas.has(zona)) throw new Error(`${bruto} → ${zona}, que não está no catálogo (o select cairia na 1ª opção em silêncio)`);
    });
});

// Um valor desconhecido tem que virar null pro formulário cair no padrão e
// deixar o agente escolher. Chutar uma zona seria pior: o select abriria numa
// opção plausível e errada, e ninguém revisa o que já parece preenchido.
check('valor desconhecido do CRM devolve null em vez de chutar', () => {
    igual(zoneFromCrmValue('Planeta/Marte'), null, 'inventado');
    igual(zoneFromCrmValue(''), null, 'vazio');
    igual(zoneFromCrmValue(null), null, 'nulo');
});

check('toda zona do catálogo é válida para o Intl', () => {
    TIMEZONE_HUBS.forEach(h => {
        try { new Intl.DateTimeFormat('en-US', { timeZone: h.zone }).format(new Date()); }
        catch (e) { throw new Error(`${h.id} tem zona inválida: ${h.zone}`); }
    });
});

check('os fusos dos EUA pedidos pelos TLs estão todos presentes', () => {
    const zonas = new Set(TIMEZONE_HUBS.map(h => h.zone));
    ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Phoenix',
     'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'].forEach(z => {
        if (!zonas.has(z)) throw new Error('faltou ' + z);
    });
});

// O consultor de Time Zone esconde os fusos `home`; o formulário BAU precisa
// deles. Se ninguém marcar `home`, o consultor volta a mostrar um cartão
// dizendo ao agente que horas são onde ele já está.
check('os fusos do Brasil estão marcados como `home`', () => {
    const brasil = TIMEZONE_HUBS.filter(h => h.zone.startsWith('America/Sao_Paulo') || h.zone === 'America/Manaus' || h.zone === 'America/Rio_Branco');
    if (brasil.length === 0) throw new Error('nenhum fuso do Brasil no catálogo');
    brasil.forEach(h => { if (!h.home) throw new Error(`${h.id} deveria ter home: true`); });
});

console.log('\n' + (falhas ? '✗' : '✓') + ` ${falhas} falhas\n`);
process.exit(falhas ? 1 : 0);
