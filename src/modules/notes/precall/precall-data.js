// src/modules/notes/precall/precall-data.js
//
// Campos do Pre-call Checklist e o texto que eles viram na nota. Sem DOM e sem
// imports: o harness de teste carrega este arquivo direto no Node.
//
// O TEXTO DA NOTA É CONTRATO. A auditoria do SOP de pre-call mede conformidade
// procurando o bloco nas case notes, então rótulo, ordem e valor aqui não
// seguem o idioma da interface nem o do atendimento: saem sempre em inglês, do
// jeito que estão abaixo. Mexer num rótulo é mexer na métrica sem erro nenhum
// (ver ADR-0018 e specs/workflow/precall-checklist.md).

export const BLOCK_TITLE = 'Pre-call checklist';
export const NONE_PROVIDED = 'None provided';

export const YES = 'Yes';
export const NO = 'No';

// Exceção do SOP: quem não faz o checklist registra o motivo em vez de omitir o
// bloco, porque a razão de exceções também é medida.
export const EXCEPTION_LABEL = 'Completed';
export const EXCEPTION_REASONS = [
    { value: 'Live Meet case', key: 'reasonLiveMeet' },
    { value: 'Case arrived <1h before the call', key: 'reasonLate' },
];

export const NEXT_STEPS = [
    { value: 'Proceed', key: 'nextProceed' },
    { value: 'OOS', key: 'nextOos' },
    { value: 'Infeasible', key: 'nextInfeasible' },
];

// A ordem do array é a ordem da nota. `auto` marca o que a raspagem do CRM
// consegue preencher; `required` o que não pode ficar sem resposta — "não
// respondeu" não é "No", e um checklist que assume a resposta não checa nada.
export const PRECALL_FIELDS = [
    { id: 'duplicateCase', label: 'Duplicate Case', kind: 'yesno', required: true },
    { id: 'suite360', label: '360 Suite', kind: 'yesno', required: true },
    { id: 'sgtm', label: 'sGTM', kind: 'yesno', required: true },
    { id: 'api', label: 'API', kind: 'yesno', required: true },
    { id: 'sellerCc', label: 'Seller to be CCed', kind: 'yesno', required: true },
    // O "[copy&paste]" faz parte do rótulo que a auditoria procura.
    { id: 'tasks', label: 'Task(s) [copy&paste]', kind: 'textarea', auto: true },
    { id: 'contactNumber', label: 'Contact number', kind: 'text', auto: true },
    { id: 'email', label: 'Email', kind: 'text', auto: true },
    { id: 'websiteUrl', label: 'Website URL', kind: 'text', auto: true },
    { id: 'websiteCms', label: 'Website CMS', kind: 'text' },
    { id: 'adsCid', label: 'Ads CID', kind: 'text', auto: true },
    { id: 'ga4Id', label: 'GA4 Measurement ID', kind: 'text' },
    { id: 'specialInstructions', label: 'Special instructions', kind: 'textarea' },
    { id: 'nextSteps', label: 'Next steps', kind: 'select', required: true },
];

export const AUTO_FIELD_IDS = PRECALL_FIELDS.filter((f) => f.auto).map((f) => f.id);

const clean = (v) => String(v ?? '').trim();

// Ids dos campos que impedem gerar a nota, na ordem da tela.
export function missingFields(values) {
    if (values.completed === NO) {
        return clean(values.exceptionReason) ? [] : ['exceptionReason'];
    }
    return PRECALL_FIELDS
        .filter((f) => f.required && !clean(values[f.id]))
        .map((f) => f.id);
}

// Linhas lógicas do bloco. Um valor de várias linhas (textarea) continua sendo
// UMA entrada daqui; quem renderiza decide como quebrar.
export function buildPrecallLines(values) {
    const lines = [BLOCK_TITLE];

    if (values.completed === NO) {
        lines.push(`${EXCEPTION_LABEL}: ${NO} → ${clean(values.exceptionReason)}`);
        return lines;
    }

    PRECALL_FIELDS.forEach((f) => {
        lines.push(`${f.label}: ${clean(values[f.id]) || NONE_PROVIDED}`);
    });
    return lines;
}

// O que o agente digitou entra como texto, nunca como marcação: um `<` no meio
// de uma instrução não pode virar tag dentro do editor de notas do CRM.
export function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function buildPrecallHtml(values) {
    const [title, ...rest] = buildPrecallLines(values);
    const body = rest.map((line) => escapeHtml(line).replace(/\r?\n/g, '<br>'));
    return [`<b>${escapeHtml(title)}</b>`, ...body].join('<br>');
}

const EMAIL = /[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+/;
const SLUG = /^[a-z0-9]+(_[a-z0-9]+)+$/;

// O CRM entrega as tasks do agendamento como slug (`ads_conversion_tracking`), e
// a nota leva o nome do catálogo. Slug que o catálogo não conhece vira texto
// legível em vez de snake_case; frase (a tela traduzida) passa como veio.
function taskLabel(value, nameOf) {
    const name = SLUG.test(value) ? nameOf(value) : '';
    if (name) return name;
    return SLUG.test(value)
        ? value.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : value;
}

// Raspagem → valores do formulário. Vazio e "N/A" (que é o que `captureCID`
// devolve quando não acha) viram ausência: campo preenchido com "N/A" parece
// dado capturado e não é.
export function normalizeCapture(raw = {}, nameOf = () => '') {
    const found = (v) => {
        const s = clean(v);
        return /^n\/a$/i.test(s) ? '' : s;
    };
    const tasks = [...new Set((raw.tasks || []).map(found).filter(Boolean).map((v) => taskLabel(v, nameOf)))].join(', ');
    return {
        tasks,
        contactNumber: found(raw.phone),
        // captureClientEmail só confere se há um "@": se o container trouxer
        // texto junto ("a@b.com Click to view"), tudo iria para a nota.
        email: found(raw.email).match(EMAIL)?.[0] || '',
        websiteUrl: found(raw.website),
        adsCid: found(raw.cid),
    };
}
