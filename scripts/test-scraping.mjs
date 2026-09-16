// scripts/test-scraping.mjs
//
// Trava a raspagem do CRM contra duas capturas REAIS da mesma tela de caso:
// uma com o tradutor do CRM ligado e outra no idioma original.
//
// Por que duas variantes, e não uma: o tradutor do CRM traduz os RÓTULOS *e*
// os VALORES ("Given name" vira "Nome dado", "cognizant" vira "ciente"). Um
// teste que rodasse só na variante em inglês passaria feliz com um scraper
// que quebra inteiro na tela de todo mundo que usa o CRM traduzido — que foi
// exatamente o defeito encontrado: 7 das 10 capturas voltavam vazias na
// captura real, e só 3 na variante em inglês.
//
// O `ensureOriginalLanguage()` existe para reverter a tradução antes de
// raspar, e continua sendo a primeira linha de defesa. Mas num fixture
// estático o clique não re-renderiza nada, e é isso que dá o teste que
// interessa: "se a reversão falhar, a captura ainda se vira?". Por isso a
// variante traduzida é raspada SEM reversão, de propósito.
//
// Daí a divisão das asserções:
//   - `igual`  — campos que não dependem de idioma (e-mail, CID, case ID,
//                site, AM). Têm de dar o MESMO valor nas duas variantes; é
//                aqui que mora a maior parte da proteção.
//   - `porVariante` — campos cujo valor o tradutor de fato altera (fuso,
//                programa). Aqui exigimos que o rótulo tenha sido encontrado
//                nas duas, aceitando o valor no idioma de cada uma.
//
// Os fixtures têm PII substituída — veja specs/fixtures/README.md.
//
// Uso: npm run test:scraping

import { chromium } from 'playwright';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(here, '..');

// O repo padroniza `chromium.launch({ headless: true })`. A variável existe
// só para ambientes que já trazem um Chromium instalado fora do cache do
// Playwright (contêineres de CI/sandbox), onde o download é bloqueado.
const executablePath = process.env.CW_CHROMIUM || undefined;

// Expõe o módulo de raspagem no browser sem precisar subir o bundle inteiro
// do app (que dispararia boot, JSONP e áudio).
const { outputFiles } = await build({
    entryPoints: [resolve(here, '..', 'src/modules/shared/page-data.js')],
    bundle: true, write: false, format: 'iife', globalName: 'PD',
    define: { __CW_BUILD_ENV__: '"development"' },
});
const bundle = outputFiles[0].text;

const VARIANTES = {
    original: 'specs/fixtures/crm-case-original.html',
    traduzida: 'specs/fixtures/crm-case-translated.html',
};

// Verdade conhecida dos fixtures (valores já redigidos).
const igual = {
    caseId: '7-1111000011111',
    cid: '123-456-7890',
    clientEmail: 'cliente.teste@example.com',
    advertiserName: 'Ana Teste',
    websiteUrl: 'http://www.exemplo-entregas.com/',
    advLastName: 'Exemplo',
    // PII mascarada: só existe depois do clique no unmask (specs/workflow/scraping-rules.md).
    advPhone: '+55 011999990000',
    // O AM é quem vai no BCC, e nunca é o assignee: no caso real o dono é
    // marco.dias@ e o AM é bianca.alves@, que aparece no To: do e-mail de
    // confirmação e como quem submeteu o Contact Us Form. Esta asserção é a
    // que trava a regra de negócio: se algum dia amEmail voltar igual ao
    // assignee, o BCC está indo para a pessoa errada.
    amEmail: 'bianca.alves@google.com',
    internalEmail: 'bianca.alves@google.com',
    // O que vai para a coluna AM_Nome da planilha e aparece como
    // "AM Responsável" no TL Dashboard. É o E-MAIL, nunca o nome de exibição:
    // o fixture tem `<div debug-id="name">Bianca Alves</div>` ao lado do
    // e-mail, e era ele que vencia — um rótulo traduzível, que não identifica
    // qual LDAP é a pessoa nem permite acionar o AM a partir do dashboard.
    amName: 'bianca.alves@google.com',

    // Cabeçalho do caso (debug-id, não depende de idioma).
    'caseContext.estado': 'Finished',
    'caseContext.slaTexto': 'SLA met',
    'caseContext.tier': 'Silver',
    'caseContext.paisCobranca': 'Brazil',
    'caseContext.assignee': 'marco.dias@',

    // Fatos do case log, tudo dentro do preview truncado em ~152 chars.
    'caseLog.agendamento.data': 'September 10',
    'caseLog.agendamento.hora': '9:00AM',
    'caseLog.agendamento.timezone': 'Brazil/East',
    'caseLog.agendamento.designado': 'marco.dias@google.com',
    'caseLog.transferencia.para': 'Technical Solutions-PT-Cognizant',
    'caseLog.descarte.motivo': 'Abandoned',
    'caseLog.cancelamento.motivo': 'AutoCanceled, All Pending, InitialAppointment',
    // O AppointmentId cai fora do preview truncado; só existe se a mensagem
    // for expandida, e este parser não expande nada por conta própria.
    'caseLog.cancelamento.appointmentId': null,
};

// Lê "a.b.c" no objeto raspado.
const porCaminho = (obj, caminho) =>
    caminho.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const porVariante = {
    timezone: { original: 'Brazil/East', traduzida: 'Brasil/Leste' },
    salesProgram: { original: 'umm_scaled', traduzida: 'escala umm' },
    language: { original: 'portuguese', traduzida: 'português' },
};

async function raspar(pagina, arquivo) {
    const html = await readFile(resolve(raiz, arquivo), 'utf8');
    await pagina.setContent(`<!doctype html><html>${html}</html>`);
    await pagina.addScriptTag({ content: bundle });
    return pagina.evaluate(async () => {
        const dados = await PD.getPageData();
        return {
            caseId: dados.caseId,
            cid: dados.cid,
            clientEmail: dados.clientEmail,
            advertiserName: dados.advertiserName,
            websiteUrl: dados.websiteUrl,
            advLastName: dados.advLastName,
            advPhone: dados.advPhone,
            amEmail: dados.amEmail ?? dados.amName,
            amName: dados.amName,
            internalEmail: dados.internalEmail,
            timezone: dados.timezone,
            salesProgram: dados.salesProgram,
            language: dados.language,
            caseContext: dados.caseContext,
            caseLog: dados.caseLog,
        };
    });
}

const navegador = await chromium.launch({ headless: true, executablePath });
const pagina = await navegador.newPage();

const obtido = {};
for (const [nome, arquivo] of Object.entries(VARIANTES)) {
    obtido[nome] = await raspar(pagina, arquivo);
}

// --- Fallback do AM: o que acontece quando o log NÃO resolve ---
//
// O caminho feliz acima (um candidato no log) é o único que os fixtures
// exercitam sozinhos, e ele escondia o defeito: `<internal-user-info>` lista
// os contatos da CONTA (55 na captura real, todos com o mesmo papel), então
// o "primeiro da tela" é o MESMO em todos os casos daquele anunciante. Todo
// caso sem @google.com no log gravava esse mesmo contato na planilha, calado
// e com cara de raspagem bem-sucedida.
//
// Estes cenários mutam o DOM do fixture para alcançar o fallback e travam a
// regra: com 2+ contatos internos o AM é `null`, não um chute.
const CENARIOS_AM = [
    {
        nome: 'am.fallback/log-sem-candidato',
        // Caso recém-aberto: nenhum e-mail interno no log ainda.
        mutacao: `document.querySelectorAll('case-message-view').forEach(m => m.remove())`,
        esperado: { email: null, origem: 'nao-resolvido' },
    },
    {
        nome: 'am.fallback/2-candidatos-sem-desempate',
        // Dois internos no log e nenhum Contact Us Form para desempatar.
        mutacao: `document.querySelectorAll('case-message-view').forEach(m => m.remove());
                  const d = document.createElement('case-message-view');
                  d.textContent = 'From: carlos.souza@google.com To: diana.reis@google.com';
                  document.body.appendChild(d);`,
        esperado: { email: null, origem: 'nao-resolvido' },
    },
    {
        nome: 'am.fallback/contato-interno-unico',
        // Um único contato interno na tela: aí não há o que chutar, e o
        // fallback continua valendo.
        mutacao: `document.querySelectorAll('case-message-view').forEach(m => m.remove());
                  document.querySelectorAll('internal-user-info').forEach((b, i) => { if (i > 0) b.remove(); })`,
        esperado: { email: 'bianca.alves@google.com', origem: 'internal-user-info' },
    },
];

const htmlOriginal = await readFile(resolve(raiz, VARIANTES.original), 'utf8');
const obtidoAM = {};
for (const cenario of CENARIOS_AM) {
    await pagina.setContent(`<!doctype html><html>${htmlOriginal}</html>`);
    await pagina.addScriptTag({ content: bundle });
    obtidoAM[cenario.nome] = await pagina.evaluate(async (mut) => {
        // eslint-disable-next-line no-eval
        eval(mut);
        // expandir=false: o fixture é estático, clicar não re-renderiza nada,
        // e o passo caro só somaria 400ms por cabeçalho fechado.
        return await PD.captureAM({ expandir: false });
    }, cenario.mutacao);
}

await navegador.close();

const falhas = [];
const linhas = [];

for (const cenario of CENARIOS_AM) {
    for (const [chave, esperado] of Object.entries(cenario.esperado)) {
        const valor = obtidoAM[cenario.nome][chave];
        const ok = valor === esperado;
        if (!ok) falhas.push(`${cenario.nome}.${chave}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(valor)}`);
        linhas.push([ok, `${cenario.nome}.${chave}`, 'fallback', valor, esperado]);
    }
}

for (const [campo, esperado] of Object.entries(igual)) {
    for (const variante of Object.keys(VARIANTES)) {
        const valor = porCaminho(obtido[variante], campo);
        const ok = valor === esperado;
        if (!ok) falhas.push(`${campo} [${variante}]: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(valor)}`);
        linhas.push([ok, campo, variante, valor, esperado]);
    }
}
for (const [campo, esperados] of Object.entries(porVariante)) {
    for (const [variante, esperado] of Object.entries(esperados)) {
        const valor = obtido[variante][campo];
        const ok = valor === esperado;
        if (!ok) falhas.push(`${campo} [${variante}]: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(valor)}`);
        linhas.push([ok, campo, variante, valor, esperado]);
    }
}

for (const [ok, campo, variante, valor, esperado] of linhas) {
    const marca = ok ? 'ok  ' : 'FALHA';
    const detalhe = ok ? String(valor) : `${JSON.stringify(valor)}  (esperado ${JSON.stringify(esperado)})`;
    console.log(`${marca} ${campo.padEnd(44)} ${variante.padEnd(10)} ${detalhe}`);
}

const total = linhas.length;
console.log(`\n${total - falhas.length}/${total} asserções passaram.`);

if (falhas.length) {
    console.error(`\n${falhas.length} falha(s) de raspagem:`);
    for (const f of falhas) console.error('  - ' + f);
    process.exit(1);
}
console.log('Raspagem do CRM: OK nas duas variantes.');
