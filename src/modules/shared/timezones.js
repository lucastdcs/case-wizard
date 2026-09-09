// src/modules/shared/timezones.js
//
// Catálogo único de fusos do projeto, mais a matemática de deslocamento.
//
// Existe porque dois módulos precisam da MESMA lista por motivos diferentes: o
// assistente de Time Zone, que mostra "que horas são lá agora", e o formulário
// BAU, que precisa saber em que fuso o agendamento foi combinado (ADR-0010).
// Duas listas divergiriam na primeira vez que alguém acrescentasse um país num
// lugar só — e o sintoma seria um fuso escolhível no consultor e ausente no
// formulário, ou o contrário.

// `region` alimenta os filtros do assistente de Time Zone.
// `home: true` marca os fusos do próprio Brasil: o formulário BAU precisa deles
// (a maioria dos anunciantes é daqui), mas o assistente de Time Zone os esconde
// da grade — lá eles seriam um cartão dizendo ao agente que horas são onde ele
// já está, e a faixa "seu fuso" no topo já responde isso.
export const TIMEZONE_HUBS = [
    // --- EUROPA ---
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', zone: 'Europe/Lisbon', label: 'Lisboa', region: 'eu' },
    { id: 'es', name: 'Espanha', flag: '🇪🇸', zone: 'Europe/Madrid', label: 'Madrid', region: 'eu' },

    // --- AMÉRICA DO SUL ---
    { id: 'br', name: 'Brasil — Brasília', flag: '🇧🇷', zone: 'America/Sao_Paulo', label: 'São Paulo', region: 'sa', home: true },
    { id: 'br-am', name: 'Brasil — Amazonas', flag: '🇧🇷', zone: 'America/Manaus', label: 'Manaus', region: 'sa', home: true },
    { id: 'br-ac', name: 'Brasil — Acre', flag: '🇧🇷', zone: 'America/Rio_Branco', label: 'Rio Branco', region: 'sa', home: true },
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', zone: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires', region: 'sa' },
    { id: 'bo', name: 'Bolívia', flag: '🇧🇴', zone: 'America/La_Paz', label: 'La Paz', region: 'sa' },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', zone: 'America/Santiago', label: 'Santiago', region: 'sa' },
    { id: 'co', name: 'Colômbia', flag: '🇨🇴', zone: 'America/Bogota', label: 'Bogotá', region: 'sa' },
    { id: 'ec', name: 'Equador', flag: '🇪🇨', zone: 'America/Guayaquil', label: 'Guayaquil', region: 'sa' },
    { id: 'py', name: 'Paraguai', flag: '🇵🇾', zone: 'America/Asuncion', label: 'Assunção', region: 'sa' },
    { id: 'pe', name: 'Peru', flag: '🇵🇪', zone: 'America/Lima', label: 'Lima', region: 'sa' },
    { id: 'uy', name: 'Uruguai', flag: '🇺🇾', zone: 'America/Montevideo', label: 'Montevidéu', region: 'sa' },
    { id: 've', name: 'Venezuela', flag: '🇻🇪', zone: 'America/Caracas', label: 'Caracas', region: 'sa' },

    // --- ESTADOS UNIDOS ---
    // Um por fuso continental, mais Alasca e Havaí. Os nomes de cidade são o que
    // o agente reconhece; o anunciante fala "Eastern", não "America/New_York".
    { id: 'us-et', name: 'EUA — Eastern', flag: '🇺🇸', zone: 'America/New_York', label: 'Nova York', region: 'us' },
    { id: 'us-ct', name: 'EUA — Central', flag: '🇺🇸', zone: 'America/Chicago', label: 'Chicago', region: 'us' },
    { id: 'us-mt', name: 'EUA — Mountain', flag: '🇺🇸', zone: 'America/Denver', label: 'Denver', region: 'us' },
    // Phoenix é Mountain SEM horário de verão. Sem ela, meio ano de agendamento
    // no Arizona sai uma hora errado — e é o tipo de erro que ninguém atribui ao
    // formulário.
    { id: 'us-az', name: 'EUA — Arizona', flag: '🇺🇸', zone: 'America/Phoenix', label: 'Phoenix', region: 'us' },
    { id: 'us-pt', name: 'EUA — Pacific', flag: '🇺🇸', zone: 'America/Los_Angeles', label: 'Los Angeles', region: 'us' },
    { id: 'us-ak', name: 'EUA — Alaska', flag: '🇺🇸', zone: 'America/Anchorage', label: 'Anchorage', region: 'us' },
    { id: 'us-hi', name: 'EUA — Havaí', flag: '🇺🇸', zone: 'Pacific/Honolulu', label: 'Honolulu', region: 'us' },

    // --- AMÉRICA CENTRAL & CARIBE ---
    { id: 'mx', name: 'México', flag: '🇲🇽', zone: 'America/Mexico_City', label: 'CDMX', region: 'na' },
    { id: 'cr', name: 'Costa Rica', flag: '🇨🇷', zone: 'America/Costa_Rica', label: 'San José', region: 'na' },
    { id: 'sv', name: 'El Salvador', flag: '🇸🇻', zone: 'America/El_Salvador', label: 'San Salvador', region: 'na' },
    { id: 'gt', name: 'Guatemala', flag: '🇬🇹', zone: 'America/Guatemala', label: 'C. da Guatemala', region: 'na' },
    { id: 'hn', name: 'Honduras', flag: '🇭🇳', zone: 'America/Tegucigalpa', label: 'Tegucigalpa', region: 'na' },
    { id: 'ni', name: 'Nicarágua', flag: '🇳🇮', zone: 'America/Managua', label: 'Manágua', region: 'na' },
    { id: 'pa', name: 'Panamá', flag: '🇵🇦', zone: 'America/Panama', label: 'C. do Panamá', region: 'na' },
    { id: 'do', name: 'Rep. Dominicana', flag: '🇩🇴', zone: 'America/Santo_Domingo', label: 'Santo Domingo', region: 'na' },
    { id: 'pr', name: 'Porto Rico', flag: '🇵🇷', zone: 'America/Puerto_Rico', label: 'San Juan', region: 'na' }
];

export const DEFAULT_TIMEZONE = 'America/Sao_Paulo';

// Deslocamento, em minutos, de uma zona IANA num INSTANTE dado.
// Formata o instante na zona, relê como se fosse UTC, e a diferença é o
// deslocamento. É o caminho que só usa Intl — sem tabela de fusos embarcada,
// que envelheceria no bundle.
function offsetMinutesAtInstant(zone, date) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: zone, hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const p = {};
    dtf.formatToParts(date).forEach(part => { p[part.type] = part.value; });

    const comoUTC = Date.UTC(
        Number(p.year), Number(p.month) - 1, Number(p.day),
        Number(p.hour) % 24, Number(p.minute), Number(p.second)
    );
    return Math.round((comoUTC - date.getTime()) / 60000);
}

// Deslocamento de uma zona para um horário de PAREDE ("2026-09-10T14:30" lido
// como hora local daquela zona), que é o que o agente digita.
//
// Precisa de iteração porque a pergunta é circular: para saber o deslocamento é
// preciso o instante, e para saber o instante é preciso o deslocamento. Chuta o
// horário de parede como se fosse UTC, mede, corrige, mede de novo. Duas
// passadas bastam — a segunda só se move em cima de transição de horário de
// verão, onde o primeiro chute cai do lado errado da mudança.
export function offsetMinutesForWallTime(zone, isoLocal) {
    const m = String(isoLocal || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!m) return null;

    const [, ano, mes, dia, hora, minuto] = m.map(Number);
    const comoUTC = Date.UTC(ano, mes - 1, dia, hora, minuto);

    let offset = offsetMinutesAtInstant(zone, new Date(comoUTC));
    offset = offsetMinutesAtInstant(zone, new Date(comoUTC - offset * 60000));
    return offset;
}

// -180 → "-03:00". O sinal é o do deslocamento em relação a UTC, como no ISO.
export function formatOffset(minutos) {
    const sinal = minutos < 0 ? '-' : '+';
    const abs = Math.abs(minutos);
    const hh = String(Math.floor(abs / 60)).padStart(2, '0');
    const mm = String(abs % 60).padStart(2, '0');
    return `${sinal}${hh}:${mm}`;
}

// "2026-09-10T14:30" + zona → "2026-09-10T14:30-04:00" (ADR-0010).
// Devolve a entrada intacta se ela já tiver deslocamento ou não for parseável:
// é melhor gravar o que veio do que gravar algo inventado.
export function withZoneOffset(isoLocal, zone) {
    if (!isoLocal) return '';
    if (/[+-]\d{2}:\d{2}$/.test(isoLocal) || /Z$/.test(isoLocal)) return isoLocal;

    const offset = offsetMinutesForWallTime(zone, isoLocal);
    if (offset === null) return isoLocal;
    return `${isoLocal.slice(0, 16)}${formatOffset(offset)}`;
}

// O CRM entrega coisas como "Brazil/East", "US/Eastern" ou "America/New_York" no
// campo Customer time zone. Isso vira a zona pré-selecionada do formulário.
//
// Não é uma tabela completa de aliases da tz database de propósito: cobre o que
// a operação atende, e devolve null no resto — o agente escolhe, e um select
// aberto na opção errada é pior do que um select que admite não saber.
const ALIAS_CRM = {
    'brazil/east': 'America/Sao_Paulo',
    'brazil/west': 'America/Manaus',
    'brazil/acre': 'America/Rio_Branco',
    'us/eastern': 'America/New_York',
    'us/central': 'America/Chicago',
    'us/mountain': 'America/Denver',
    'us/arizona': 'America/Phoenix',
    'us/pacific': 'America/Los_Angeles',
    'us/alaska': 'America/Anchorage',
    'us/hawaii': 'Pacific/Honolulu',
    'america/argentina/buenos_aires': 'America/Argentina/Buenos_Aires',
    'mexico/general': 'America/Mexico_City',
};

export function zoneFromCrmValue(valorDoCrm) {
    const bruto = String(valorDoCrm || '').trim();
    if (!bruto) return null;

    const chave = bruto.toLowerCase();
    if (ALIAS_CRM[chave]) return ALIAS_CRM[chave];

    const direto = TIMEZONE_HUBS.find(h => h.zone.toLowerCase() === chave);
    return direto ? direto.zone : null;
}
