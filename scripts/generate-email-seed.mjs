// scripts/generate-email-seed.mjs
//
// Gera a semeadura do módulo "email_template" a partir de
// src/modules/email-assistant/email-data.js.
//
// Escopo: só os modelos do ASSISTENTE DE E-MAIL do agente. Ficam de fora, por
// decisão do produto, os e-mails de CR e os disparados pelo Dashboard de TL -
// esses vivem em gas-backend/EmailEngine.js, são enviados pelo próprio Apps
// Script e não passam por aqui.
//
// Escreve:
//   - gas-backend/seeds/email-seed.json      (para inspeção)
//   - gas-backend/ContentSeed_Emails.js      (o que roda: seedEmailsNow())
//
// Uso: npm run seed:emails
//
// --- Como o par PT/ES é modelado ---
// Hoje há uma lista PT e um overlay EMAIL_TEMPLATES_ES chaveado por id, onde as
// CHAVES dos placeholders continuam em português ("[Nome do Cliente]") e só os
// rótulos mudam. Isso é proposital: a chave é o que o corpo do e-mail contém.
// Na planilha cada idioma vira uma linha (lang = PT | ES) do mesmo template
// (key = id), e a hidratação remonta as duas estruturas originais - por isso
// getEmailTemplate() não precisou mudar.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
    resolve(here, '../src/modules/email-assistant/email-data.js'),
    'utf8'
);

// Recorta pelo texto EXATO da declaração. Casar só pelo nome já mordeu uma vez:
// EMAIL_TEMPLATES_ES é `const`, não `export const`, e um prefixo errado faz o
// indexOf falhar e a busca cair no primeiro `{` do arquivo - extraindo o objeto
// errado sem erro nenhum.
function extractLiteral(decl, open, close) {
    const start = source.indexOf(decl);
    if (start === -1) throw new Error(`Não encontrei a declaração: ${decl}`);

    const from = source.indexOf(open, start);
    let depth = 0;
    let inString = null;

    for (let i = from; i < source.length; i++) {
        const ch = source[i];
        const prev = source[i - 1];

        if (inString) {
            if (ch === inString && prev !== '\\') inString = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue; }
        if (ch === open) depth++;
        else if (ch === close) {
            depth--;
            if (depth === 0) return source.slice(from, i + 1);
        }
    }
    throw new Error(`Literal de ${decl} não fecha`);
}

const evalLiteral = (t) => new Function(`return (${t});`)();

const EMAIL_TEMPLATES = evalLiteral(
    extractLiteral('export const EMAIL_TEMPLATES = [', '[', ']')
);
const EMAIL_TEMPLATES_ES = evalLiteral(
    extractLiteral('const EMAIL_TEMPLATES_ES = {', '{', '}')
);

const TOKEN = /\[[^\][]{2,60}\]/g;

// Um placeholder declarado que não aparece no corpo nunca é preenchido; um
// token no corpo que ninguém declarou vai embora LITERALMENTE para o anunciante
// ("Olá, [Nome do Cliente]"). Semear com qualquer um dos dois seria publicar o
// defeito - então o gerador falha em vez de gerar.
const problemas = [];

for (const tpl of EMAIL_TEMPLATES) {
    const corpo = `${tpl.subject || ''} ${tpl.template || ''}`;
    const declarados = (tpl.placeholders || []).map(p => p.key);

    const semUso = declarados.filter(k => !corpo.includes(k));
    const semDeclarar = [...new Set(corpo.match(TOKEN) || [])].filter(k => !declarados.includes(k));

    if (semUso.length) problemas.push(`PT[${tpl.id}] declarado mas ausente do corpo: ${semUso.join(', ')}`);
    if (semDeclarar.length) problemas.push(`PT[${tpl.id}] no corpo mas não declarado: ${semDeclarar.join(', ')}`);
}

for (const [id, es] of Object.entries(EMAIL_TEMPLATES_ES)) {
    const pt = EMAIL_TEMPLATES.find(t => t.id === id);
    if (!pt) { problemas.push(`ES[${id}] não tem correspondente em PT`); continue; }

    const corpo = `${es.subject || ''} ${es.template || ''}`;
    const faltando = (pt.placeholders || []).map(p => p.key).filter(k => !corpo.includes(k));
    if (faltando.length) problemas.push(`ES[${id}] placeholder ausente no corpo: ${faltando.join(', ')}`);
}

if (problemas.length) {
    process.stderr.write('Placeholders inconsistentes — nada gerado:\n  ' + problemas.join('\n  ') + '\n');
    process.exit(1);
}

const items = [];
let order = 0;

for (const tpl of EMAIL_TEMPLATES) {
    items.push({
        key: tpl.id,
        field: tpl.category || '',
        lang: 'PT',
        label: tpl.name || tpl.id,
        value: JSON.stringify({
            subject: tpl.subject || '',
            template: tpl.template || '',
            placeholders: (tpl.placeholders || []).map(p => ({
                key: p.key,
                label: p.label || '',
                type: p.type || 'text',
                ...(p.auto ? { auto: p.auto } : {}),
            })),
        }),
        sortOrder: order++,
    });

    const es = EMAIL_TEMPLATES_ES[tpl.id];
    if (!es) continue;

    items.push({
        key: tpl.id,
        field: es.category || tpl.category || '',
        lang: 'ES',
        label: es.name || tpl.name || tpl.id,
        value: JSON.stringify({
            subject: es.subject || '',
            template: es.template || '',
            // Em ES só os RÓTULOS mudam; as chaves seguem as de PT, porque são
            // elas que aparecem no corpo do e-mail.
            labels: es.labels || {},
        }),
        sortOrder: order++,
    });
}

const payload = { module: 'email_template', items };

writeFileSync(
    resolve(here, '../gas-backend/seeds/email-seed.json'),
    JSON.stringify(payload, null, 2) + '\n'
);

const gasFile = `// ARQUIVO GERADO - não edite à mão.
// Origem: npm run seed:emails (lê src/modules/email-assistant/email-data.js)
//
// Semeia o módulo "email_template" da Central de Conteúdo com os modelos do
// assistente de e-mail. NÃO inclui os e-mails de CR nem os disparados pelo
// Dashboard de TL - esses vivem em EmailEngine.gs e seguem fora da Central.
//
// COMO RODAR: no editor do Apps Script, escolha "seedEmailsNow" no seletor de
// função e clique em Executar. Roda uma vez só; chamadas seguintes são
// ignoradas se o módulo já tiver itens no ar.

const CONTENT_SEED_EMAILS = ${JSON.stringify(payload, null, 2)};

function seedEmailsNow() {
  const result = seedContentModule(CONTENT_SEED_EMAILS);
  Logger.log(result);
  return result;
}
`;

writeFileSync(resolve(here, '../gas-backend/ContentSeed_Emails.js'), gasFile);

const pt = items.filter(i => i.lang === 'PT').length;
const es = items.filter(i => i.lang === 'ES').length;

process.stdout.write(
    `${items.length} itens (${pt} PT + ${es} ES) — placeholders conferidos, nenhum inconsistente\n` +
    'Gerados: gas-backend/seeds/email-seed.json e gas-backend/ContentSeed_Emails.js\n'
);
