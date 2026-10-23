// scripts/test-deployment-env.js
//
// Harness local para o detector de ambiente do backend (getDeploymentEnv e
// buildEnvBadgeHtml, em gas-backend/Código.js), que não tem como rodar no
// Apps Script sem uma implantação de verdade. Stub mínimo de ScriptApp.
//
// O que estas regras existem para garantir:
//   - a implantação de produção NÃO mostra selo (decisão de produto: nada de
//     chrome extra na tela de quem está trabalhando);
//   - a de desenvolvimento mostra, em âmbar;
//   - uma implantação que não está no mapa aparece como DESCONHECIDA e em
//     vermelho — é pior que estar em dev, porque significa que alguém publicou
//     de um lugar que este código não conhece;
//   - o sufixo exibido é o mesmo que o frontend mostra em Configurações, que é
//     o que prova a separação de ambientes;
//   - sem contexto de web app (execução manual no editor) nada explode.
//
// Uso: npm run test:deployment-env

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = path.join(__dirname, '..', 'gas-backend', 'Código.js');

const PROD = 'AKfycbxkheuq28ENsHMZMH8t9-u4EIrktHC6cBi-87boDre0jJfl1lnSCPBzaEkw6hy3Cx6fAg';
const DEV = 'AKfycbyUtczRMulDAyO_1ku39Rb01zarPMw1JvO7aNOdJPYeAgCC7G9mmb-P_EuXP6kvo8l2LA';
const url = (id) => `https://script.google.com/a/macros/google.com/s/${id}/exec`;

// Carrega só as declarações de função do arquivo. Código.js depende de um monte
// de serviços do Apps Script no corpo do doGet, mas nada disso roda ao apenas
// avaliar as declarações — e é só getDeploymentEnv/buildEnvBadgeHtml que
// interessa aqui.
function carregar(getUrlImpl) {
    const codigo = fs.readFileSync(SRC, 'utf8');
    const sandbox = {
        ScriptApp: { getService: () => ({ getUrl: getUrlImpl }) },
        SpreadsheetApp: {}, HtmlService: {}, Session: {}, MailApp: {},
        Logger: { log: () => {} }, console,
    };
    vm.createContext(sandbox);
    vm.runInContext(codigo, sandbox);
    // Declarações de função viram globais do contexto e saem no sandbox; `const`
    // no topo do script, não - fica no escopo do script. Por isso ler CW_DEPLOYMENTS
    // exige avaliar uma expressão dentro do contexto, e não acessar sandbox.X.
    sandbox.__ler = (expr) => vm.runInContext(expr, sandbox);
    return sandbox;
}

let falhas = 0;
function check(nome, fn) {
    try { fn(); console.log('  ✓ ' + nome); }
    catch (e) { console.log('  ✗ ' + nome + '\n      ' + e.message); falhas++; }
}
function igual(atual, esperado, oque) {
    if (atual !== esperado) {
        throw new Error(`${oque}: esperado ${JSON.stringify(esperado)}, veio ${JSON.stringify(atual)}`);
    }
}

console.log('\n--- Detector de ambiente da implantação ---');

check('produção é reconhecida e NÃO é dev', () => {
    const s = carregar(() => url(PROD));
    const info = s.getDeploymentEnv();
    igual(info.env, 'production', 'env');
    igual(info.isDev, false, 'isDev');
});

check('produção não renderiza selo nenhum', () => {
    const s = carregar(() => url(PROD));
    igual(s.buildEnvBadgeHtml(s.getDeploymentEnv()), '', 'html do selo');
});

check('desenvolvimento é reconhecido', () => {
    const s = carregar(() => url(DEV));
    const info = s.getDeploymentEnv();
    igual(info.env, 'development', 'env');
    igual(info.isDev, true, 'isDev');
});

check('selo de desenvolvimento sai em âmbar e diz DESENVOLVIMENTO', () => {
    const s = carregar(() => url(DEV));
    const html = s.buildEnvBadgeHtml(s.getDeploymentEnv());
    if (!html.includes('DESENVOLVIMENTO')) throw new Error('rótulo ausente: ' + html.slice(0, 120));
    if (!html.includes('#FEF7E0')) throw new Error('não usou o âmbar esperado');
    if (html.includes('#FCE8E6')) throw new Error('usou a paleta de alerta vermelho em dev');
});

// É o sufixo que o agente compara com o de Configurações → Diagnóstico. Se
// esta regra quebrar, a comparação deixa de provar coisa alguma.
check('o sufixo exibido são os 6 últimos caracteres do ID', () => {
    const s = carregar(() => url(DEV));
    igual(s.getDeploymentEnv().fingerprint, DEV.slice(-6), 'fingerprint');
    const sp = carregar(() => url(PROD));
    igual(sp.getDeploymentEnv().fingerprint, PROD.slice(-6), 'fingerprint prod');
});

check('implantação fora do mapa vira DESCONHECIDA, em vermelho', () => {
    const estranho = 'AKfycbzZZZZnaoRegistradaEmLugarNenhum000000000000000000000';
    const s = carregar(() => url(estranho));
    const info = s.getDeploymentEnv();
    igual(info.env, 'unknown', 'env');
    igual(info.isDev, true, 'isDev (desconhecido nunca é tratado como produção)');
    igual(info.fingerprint, estranho.slice(-6), 'fingerprint extraído da própria URL');
    const html = s.buildEnvBadgeHtml(info);
    if (!html.includes('IMPLANTAÇÃO DESCONHECIDA')) throw new Error('rótulo errado');
    if (!html.includes('#FCE8E6')) throw new Error('desconhecida deveria usar a paleta de alerta');
});

check('sem contexto de web app não explode', () => {
    const s = carregar(() => { throw new Error('sem serviço'); });
    const info = s.getDeploymentEnv();
    igual(info.env, 'unknown', 'env');
    igual(info.fingerprint, '------', 'fingerprint neutro');
});

check('getUrl devolvendo vazio também cai em desconhecida', () => {
    const s = carregar(() => '');
    igual(s.getDeploymentEnv().env, 'unknown', 'env');
});

// Os IDs vivem em três arquivos e precisam concordar. Este teste não alcança o
// deploy.yml, mas alcança os dois que estão no código — e é a divergência que
// o promote-deployment.sh explicitamente NÃO detecta.
check('o mapa do backend bate com o do frontend', () => {
    const front = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'modules', 'shared', 'data-service.js'), 'utf8');
    const s = carregar(() => url(PROD));
    const mapa = s.__ler('CW_DEPLOYMENTS');
    if (!mapa || !mapa.production || !mapa.development) {
        throw new Error('CW_DEPLOYMENTS não tem as duas chaves esperadas');
    }
    for (const [env, id] of Object.entries(mapa)) {
        if (!front.includes(id)) {
            throw new Error(`ID de ${env} (…${id.slice(-6)}) não aparece em data-service.js`);
        }
    }
});

// ---------------------------------------------------------------------------
// Rodapé dos dashboards (buildCreditHtml). Mora neste arquivo porque é o mesmo
// Código.js carregado do mesmo jeito; o assunto é outro: o link da documentação
// que o TL Dashboard e a Central de Conteúdo mostram.
console.log('\n--- Rodapé dos dashboards (documentação) ---');

const lerFront = (...partes) =>
    fs.readFileSync(path.join(__dirname, '..', ...partes), 'utf8');

// São duas cópias porque são dois runtimes, e o único elo entre elas era um
// comentário. Uma URL trocada num lado só deixaria o agente e o TL em decks
// diferentes sem erro nenhum.
check('a URL da documentação do backend é a mesma do frontend', () => {
    const front = lerFront('src', 'modules', 'shared', 'config.js')
        .match(/export const DOCS_URL\s*=\s*"([^"]+)"/);
    if (!front) throw new Error('não achei DOCS_URL em config.js');
    const s = carregar(() => url(PROD));
    igual(s.__ler('CW_DOCS_URL'), front[1], 'CW_DOCS_URL x DOCS_URL');
});

// /edit abriria o editor do deck para quem tem permissão de escrita.
check('a documentação abre em /preview e leva o resourcekey', () => {
    const s = carregar(() => url(PROD));
    const docs = s.__ler('CW_DOCS_URL');
    if (!/\/presentation\/d\/[^/]+\/preview\?resourcekey=/.test(docs)) {
        throw new Error('URL fora do formato /preview?resourcekey=…: ' + docs);
    }
});

check('o rodapé tem o link da documentação, ao lado do de feedback', () => {
    const s = carregar(() => url(PROD));
    const html = s.buildCreditHtml();
    const docs = s.__ler('CW_DOCS_URL');
    const feedback = s.__ler('CW_FEEDBACK_FORM_URL');
    if (!html.includes('href="' + docs + '"')) throw new Error('link da documentação ausente');
    if (!html.includes('href="' + feedback + '"')) throw new Error('o link de feedback sumiu do rodapé');
    if (html.indexOf(docs) > html.indexOf(feedback)) throw new Error('a documentação deveria vir antes do feedback');
});

// O rodapé chega às duas telas pela tag que renderDashboard() preenche. Sem a
// tag no HTML, o link existiria no servidor e não apareceria em tela nenhuma.
for (const [tela, arquivo] of [['TL Dashboard', 'TLDashboard.html'], ['Central de Conteúdo', 'ContentDashboard.html']]) {
    check(`${tela} imprime o rodapé`, () => {
        if (!/<\?!=\s*CW_CREDIT\s*\?>/.test(lerFront('gas-backend', arquivo))) {
            throw new Error(`${arquivo} não tem <?!= CW_CREDIT ?>`);
        }
    });
}

check('as duas telas passam pelo renderDashboard, que injeta o rodapé', () => {
    const codigo = lerFront('gas-backend', 'Código.js');
    for (const arquivo of ['TLDashboard', 'ContentDashboard']) {
        if (!new RegExp(`renderDashboard\\(\\s*['"]${arquivo}['"]`).test(codigo)) {
            throw new Error(`${arquivo} não é servido por renderDashboard()`);
        }
    }
});

console.log('\n' + (falhas ? '✗' : '✓') + ` ${falhas} falhas\n`);
process.exit(falhas ? 1 : 0);
