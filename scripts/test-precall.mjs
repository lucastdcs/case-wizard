// scripts/test-precall.mjs
//
// Trava o texto que o Pre-call Checklist escreve na nota.
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O bloco da nota é um contrato: a conformidade do SOP de pre-call é medida
// procurando esse bloco nas case notes. Se um rótulo mudar, ou a ordem, ou
// "None provided" virar "N/A", a métrica cai sem erro em lugar nenhum — o
// agente continua preenchendo, a nota continua saindo, e o que se perde é a
// leitura de quem audita. O primeiro teste abaixo é, de propósito, o texto
// inteiro escrito à mão: ele só deve mudar junto com specs/workflow/precall-checklist.md.
//
// Também cobre o que a tela não consegue provar sozinha: um `<` digitado pelo
// agente não pode virar tag no editor de notas, e toda chave de tela precisa ter
// os três idiomas (o fallback silencioso para PT esconde chave esquecida).
//
// Não precisa de navegador: precall-data.js e precall-i18n.js não tocam em DOM.
//
// Uso: npm run test:precall

import { readFileSync } from 'node:fs';
import {
    PRECALL_FIELDS, AUTO_FIELD_IDS, NEXT_STEPS, EXCEPTION_REASONS,
    FOOTER, missingFields, buildPrecallLines, buildPrecallHtml, normalizeCapture,
} from '../src/modules/notes/precall/precall-data.js';
import { PRECALL_I18N } from '../src/modules/notes/precall/precall-i18n.js';

let falhas = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); falhas++; }
}
function igual(atual, esperado, oque) {
    const a = JSON.stringify(atual), e = JSON.stringify(esperado);
    if (a !== e) throw new Error(`${oque}: esperado ${e}, veio ${a}`);
}

const completo = {
    completed: 'Yes',
    duplicateCase: 'No',
    suite360: 'No',
    sgtm: 'Yes',
    api: 'No',
    sellerCc: 'Yes',
    tasks: 'Ads Conversion Tracking',
    contactNumber: '+55 11 90000-0000',
    email: 'cliente@example.com',
    websiteUrl: 'https://www.example.com/',
    websiteCms: 'Custom',
    adsCid: '123-456-7890',
    ga4Id: 'G-ABC123XYZ',
    specialInstructions: 'Ligar depois das 14h',
    nextSteps: 'OOS',
};

console.log('\n--- Pre-call Checklist: texto da nota ---');

check('o bloco completo sai exatamente neste texto (contrato)', () => {
    igual(buildPrecallLines(completo), [
        'Pre-call checklist',
        'Duplicate Case: No',
        '360 Suite: No',
        'sGTM: Yes',
        'API: No',
        'Seller to be CCed: Yes',
        'Task(s) [copy&paste]: Ads Conversion Tracking',
        'Contact number: +55 11 90000-0000',
        'Email: cliente@example.com',
        'Website URL: https://www.example.com/',
        'Website CMS: Custom',
        'Ads CID: 123-456-7890',
        'GA4 Measurement ID: G-ABC123XYZ',
        'Special instructions: Ligar depois das 14h',
        'Next steps: OOS',
    ], 'linhas');
});

check('campo de texto vazio vira "None provided", nunca vazio nem "N/A"', () => {
    const vazio = { ...completo, tasks: '', contactNumber: '  ', email: '', websiteUrl: '', websiteCms: '', adsCid: '', ga4Id: '', specialInstructions: '' };
    const linhas = buildPrecallLines(vazio).slice(1);
    const textos = PRECALL_FIELDS.filter((f) => f.kind === 'text' || f.kind === 'textarea');
    textos.forEach((f) => {
        const linha = linhas.find((l) => l.startsWith(f.label + ':'));
        igual(linha, `${f.label}: None provided`, f.id);
    });
});

check('a ordem da nota é a ordem de PRECALL_FIELDS', () => {
    const rotulos = buildPrecallLines(completo).slice(1).map((l) => l.split(':')[0]);
    igual(rotulos, PRECALL_FIELDS.map((f) => f.label), 'rótulos');
});

check('exceção: só "Completed: No → motivo", sem os demais campos', () => {
    igual(
        buildPrecallLines({ ...completo, completed: 'No', exceptionReason: 'Live Meet case' }),
        ['Pre-call checklist', 'Completed: No → Live Meet case'],
        'linhas',
    );
    igual(
        buildPrecallLines({ completed: 'No', exceptionReason: 'Case arrived <1h before the call' })[1],
        'Completed: No → Case arrived <1h before the call',
        'motivo 2',
    );
});

check('os valores canônicos não dependem do idioma da tela', () => {
    igual(NEXT_STEPS.map((o) => o.value), ['Proceed', 'OOS', 'Infeasible'], 'Next steps');
    igual(EXCEPTION_REASONS.map((o) => o.value), ['Live Meet case', 'Case arrived <1h before the call'], 'motivos');
});

console.log('\n--- Pre-call Checklist: o que impede gerar a nota ---');

check('sem nenhuma resposta, faltam as cinco Yes/No e o Next steps, nessa ordem', () => {
    igual(
        missingFields({ completed: 'Yes' }),
        ['duplicateCase', 'suite360', 'sgtm', 'api', 'sellerCc', 'nextSteps'],
        'faltando',
    );
});

check('"não respondeu" não é "No": campo Yes/No vazio continua faltando', () => {
    igual(missingFields({ ...completo, api: '' }), ['api'], 'faltando');
});

check('campo de texto vazio não impede (vira None provided)', () => {
    igual(missingFields({ ...completo, tasks: '', email: '', ga4Id: '' }), [], 'faltando');
});

check('exceção exige o motivo, e com ele não exige mais nada', () => {
    igual(missingFields({ completed: 'No', exceptionReason: '' }), ['exceptionReason'], 'sem motivo');
    igual(missingFields({ completed: 'No', exceptionReason: 'Live Meet case' }), [], 'com motivo');
});

console.log('\n--- Pre-call Checklist: HTML da nota ---');

// Reverte o HTML para texto do jeito que o editor o mostraria.
function htmlParaTexto(html) {
    return html
        .replace(/<br>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

check('uma linha em branco entre as linhas, e o texto do HTML é o das linhas mais o rodapé', () => {
    const html = buildPrecallHtml(completo);
    if (!html.startsWith('<b>Pre-call checklist</b><br><br><b>Duplicate Case:</b> No<br><br>')) throw new Error('começo inesperado: ' + html.slice(0, 90));
    igual(htmlParaTexto(html), [...buildPrecallLines(completo), FOOTER].join('\n\n'), 'texto');
});

check('título e rótulos em negrito, valores normais', () => {
    const html = buildPrecallHtml(completo);
    // Tudo que está em <b> é o título ou um rótulo terminado em ":" — nunca um valor.
    const negritos = [...html.matchAll(/<b>(.*?)<\/b>/g)].map((m) => m[1]);
    igual(negritos.length, PRECALL_FIELDS.length + 1, 'quantidade de negritos');
    igual(negritos[0], 'Pre-call checklist', 'título');
    negritos.slice(1).forEach((n) => { if (!n.endsWith(':')) throw new Error('negrito sem ser rótulo: ' + n); });
    // O valor vem logo depois do rótulo, fora do negrito.
    if (!html.includes('<b>Next steps:</b> OOS')) throw new Error('valor dentro ou longe do rótulo');
    if (!html.includes('<b>Task(s) [copy&amp;paste]:</b> Ads Conversion Tracking')) throw new Error('rótulo das tasks');
});

check('"Gerado pelo Cases Wizard" fecha a nota, fora do bloco auditado', () => {
    igual(FOOTER, 'Gerado pelo Cases Wizard', 'texto do rodapé');
    for (const valores of [completo, { completed: 'No', exceptionReason: 'Live Meet case' }]) {
        const html = buildPrecallHtml(valores);
        if (!html.endsWith('<br><br><i>Gerado pelo Cases Wizard</i>')) throw new Error('fim inesperado: ' + html.slice(-60));
        if (buildPrecallLines(valores).includes(FOOTER)) throw new Error('o rodapé entrou nas linhas do bloco');
    }
});

check('exceção: mesma forma (título e rótulo em negrito, linha em branco, rodapé)', () => {
    igual(
        buildPrecallHtml({ completed: 'No', exceptionReason: 'Live Meet case' }),
        '<b>Pre-call checklist</b><br><br><b>Completed:</b> No → Live Meet case<br><br><i>Gerado pelo Cases Wizard</i>',
        'HTML da exceção',
    );
});

check('o "&" do rótulo "[copy&paste]" sai escapado e volta idêntico', () => {
    const html = buildPrecallHtml(completo);
    if (!html.includes('[copy&amp;paste]')) throw new Error('rótulo sem escape no HTML');
});

check('o que o agente digita entra como texto, nunca como marcação', () => {
    const html = buildPrecallHtml({ ...completo, specialInstructions: '<img src=x onerror=alert(1)> & "aspas"' });
    if (/<img/i.test(html)) throw new Error('o <img> digitado virou tag: ' + html);
    igual(
        htmlParaTexto(html).split('\n').find((l) => l.startsWith('Special instructions:')),
        'Special instructions: <img src=x onerror=alert(1)> & "aspas"',
        'texto de volta',
    );
});

check('instrução de várias linhas vira <br>, sem quebrar o bloco', () => {
    const html = buildPrecallHtml({ ...completo, specialInstructions: 'linha 1\nlinha 2' });
    if (!html.includes('<b>Special instructions:</b> linha 1<br>linha 2<br><br><b>Next steps:</b> OOS')) throw new Error(html);
});

console.log('\n--- Pre-call Checklist: captura automática ---');

check('captura vira valores de formulário, com tasks juntas por vírgula e sem repetição', () => {
    igual(
        normalizeCapture({
            tasks: ['Ads Conversion Tracking', ' GA4 Setup ', 'Ads Conversion Tracking', ''],
            phone: ' +55 11 90000-0000 ', email: 'a@b.com', website: 'https://x.com', cid: '123-456-7890',
        }),
        { tasks: 'Ads Conversion Tracking, GA4 Setup', contactNumber: '+55 11 90000-0000', email: 'a@b.com', websiteUrl: 'https://x.com', adsCid: '123-456-7890' },
        'normalizeCapture',
    );
});

check('"N/A" do captureCID e null da raspagem viram ausência, não dado capturado', () => {
    igual(
        normalizeCapture({ tasks: [], phone: null, email: null, website: null, cid: 'N/A' }),
        { tasks: '', contactNumber: '', email: '', websiteUrl: '', adsCid: '' },
        'normalizeCapture',
    );
    igual(normalizeCapture(), { tasks: '', contactNumber: '', email: '', websiteUrl: '', adsCid: '' }, 'sem argumento');
});

check('do e-mail capturado só o endereço vai para o formulário, nunca o texto vizinho', () => {
    igual(normalizeCapture({ email: 'cliente@example.com Click to view' }).email, 'cliente@example.com', 'texto depois');
    igual(normalizeCapture({ email: 'Email: cliente@example.com' }).email, 'cliente@example.com', 'texto antes');
    igual(normalizeCapture({ email: 'Email' }).email, '', 'rótulo do botão mascarado');
    igual(normalizeCapture({ email: 'sem-arroba.com' }).email, '', 'sem @');
});

check('as tasks do CRM chegam como slug e viram o nome do catálogo', () => {
    const nomes = { ads_conversion_tracking: 'Ads Conversion Tracking', ads_enhanced_conversions: 'Ads Enhanced Conversions (ECW4)' };
    igual(
        normalizeCapture({ tasks: ['ads_conversion_tracking', 'ads_enhanced_conversions'] }, (slug) => nomes[slug]).tasks,
        'Ads Conversion Tracking, Ads Enhanced Conversions (ECW4)',
        'slugs do catálogo',
    );
});

check('slug fora do catálogo vira texto legível; frase da tela traduzida passa como veio', () => {
    igual(
        normalizeCapture({ tasks: ['ads_conversion_tracking_troubleshooting'] }, () => undefined).tasks,
        'Ads Conversion Tracking Troubleshooting',
        'slug desconhecido',
    );
    igual(
        normalizeCapture({ tasks: ['rastreamento de conversões de anúncios'] }, () => 'NUNCA').tasks,
        'rastreamento de conversões de anúncios',
        'frase traduzida',
    );
    igual(normalizeCapture({ tasks: ['ads_remarketing', 'Ads Remarketing'] }, () => 'Ads Remarketing').tasks, 'Ads Remarketing', 'repetição depois de mapear');
});

check('só campos marcados `auto` são oferecidos à captura', () => {
    igual(AUTO_FIELD_IDS, ['tasks', 'contactNumber', 'email', 'websiteUrl', 'adsCid'], 'AUTO_FIELD_IDS');
    igual(Object.keys(normalizeCapture({})).sort(), [...AUTO_FIELD_IDS].sort(), 'chaves da captura');
});

console.log('\n--- Pre-call Checklist: idiomas da tela ---');

check('pt, es e en têm exatamente as mesmas chaves', () => {
    const pt = Object.keys(PRECALL_I18N.pt).sort();
    ['es', 'en'].forEach((l) => igual(Object.keys(PRECALL_I18N[l]).sort(), pt, `chaves de ${l}`));
});

check('toda chave que a tela pede existe nos três idiomas', () => {
    const usadas = new Set([
        ...PRECALL_FIELDS.map((f) => f.id),
        ...NEXT_STEPS.map((o) => o.key),
        ...EXCEPTION_REASONS.map((o) => o.key),
        'exceptionReason', 'completed',
    ]);
    // As literais passadas a t(...) no código da tela.
    const fonte = readFileSync(new URL('../src/modules/notes/precall/precall-checklist.js', import.meta.url), 'utf8');
    for (const chamada of fonte.matchAll(/\bt\(([^)]*)\)/g)) {
        for (const literal of chamada[1].matchAll(/'([A-Za-z0-9]+)'/g)) usadas.add(literal[1]);
    }
    ['pt', 'es', 'en'].forEach((l) => {
        const faltando = [...usadas].filter((k) => !(k in PRECALL_I18N[l]));
        if (faltando.length) throw new Error(`${l} sem: ${faltando.join(', ')}`);
    });
});

check('os marcadores {n} e {field} sobrevivem em todos os idiomas', () => {
    ['pt', 'es', 'en'].forEach((l) => {
        if (!PRECALL_I18N[l].capturedN.includes('{n}')) throw new Error(`${l}.capturedN sem {n}`);
        if (!PRECALL_I18N[l].needAnswer.includes('{field}')) throw new Error(`${l}.needAnswer sem {field}`);
    });
});

console.log('\n' + (falhas ? '✗' : '✓') + ` ${falhas} falhas\n`);
process.exit(falhas ? 1 : 0);
