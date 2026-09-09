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
    // O AM é quem vai no BCC, e nunca é o assignee: no caso real o dono é
    // marco.dias@ e o AM é bianca.alves@, que aparece no To: do e-mail de
    // confirmação e como quem submeteu o Contact Us Form.
    amEmail: 'bianca.alves@google.com',
    internalEmail: 'bianca.alves@google.com',
};

const porVariante = {
    timezone: { original: 'Brazil/East', traduzida: 'Brasil/Leste' },
    salesProgram: { original: 'umm_scaled', traduzida: 'escala umm' },
    language: { original: 'Business language', traduzida: 'Linguagem comercial' },
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
            amEmail: dados.amEmail ?? dados.amName,
            internalEmail: dados.internalEmail,
            timezone: dados.timezone,
            salesProgram: dados.salesProgram,
            language: dados.language,
        };
    });
}

const navegador = await chromium.launch({ headless: true, executablePath });
const pagina = await navegador.newPage();

const obtido = {};
for (const [nome, arquivo] of Object.entries(VARIANTES)) {
    obtido[nome] = await raspar(pagina, arquivo);
}
await navegador.close();

const falhas = [];
const linhas = [];

for (const [campo, esperado] of Object.entries(igual)) {
    for (const variante of Object.keys(VARIANTES)) {
        const valor = obtido[variante][campo];
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
    console.log(`${marca} ${campo.padEnd(16)} ${variante.padEnd(10)} ${detalhe}`);
}

const total = linhas.length;
console.log(`\n${total - falhas.length}/${total} asserções passaram.`);

if (falhas.length) {
    console.error(`\n${falhas.length} falha(s) de raspagem:`);
    for (const f of falhas) console.error('  - ' + f);
    process.exit(1);
}
console.log('Raspagem do CRM: OK nas duas variantes.');
