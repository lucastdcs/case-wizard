// src/modules/shared/page-data.js
import { fetchUserProfile } from './data-service.js';
import { esperar } from './dom-utils.js';
import { lerCampo, lerCampoTodos, acharRotulo } from './crm-labels.js';
import { resolveAM, ldapLogado } from './am-resolver.js';
import { getCaseContext } from './case-context.js';
import { getCaseLogFacts } from './case-log-parser.js';

// Variável que guarda o nome para usar nos emails depois
let cachedAgentName = "";
let cachedAgentEmail = "";
let cachedUserProfile = null;

/**
 * Garante que a página esteja no idioma original caso o recurso de tradução do CRM esteja ativo.
 * Isso evita falhas de mapeamento e regex durante a raspagem de dados.
 */
export async function ensureOriginalLanguage() {
    try {
        // A marca de "está traduzido" é a classe .translated-form no painel,
        // não o texto do botão: o texto é ele próprio localizado ("Show
        // original" / "Mostrar original" / ...), então casá-lo por string é
        // depender de conhecer todos os idiomas de antemão.
        if (!document.querySelector('.translated-form')) return true;

        const translateBtn = document.querySelector('material-button[debug-id="toggle-translation-button"]');
        if (!translateBtn) return false;

        console.log("TechSol: Tradução detectada. Revertendo para o idioma original...");
        translateBtn.click();

        // Espera a reversão ACONTECER em vez de torcer por um tempo fixo: o
        // 400ms anterior era chute, e quando o Angular demorava mais que
        // isso a raspagem seguia lendo a tela traduzida.
        for (let i = 0; i < 20; i++) {
            if (!document.querySelector('.translated-form')) return true;
            await esperar(100);
        }

        // Não reverteu: seguimos assim mesmo. O crm-labels.js reconhece os
        // rótulos traduzidos, então a captura ainda funciona — só os VALORES
        // é que virão no idioma da tradução.
        console.warn("TechSol: tradução não reverteu; seguindo pelos rótulos traduzidos.");
        return false;
    } catch (e) {
        // Silencioso: não deve interromper o fluxo principal se o botão falhar
        console.warn("TechSol: Erro ao tentar reverter tradução:", e);
        return false;
    }
}

// --- 1. SHERLOCK HOLMES (Captura Silenciosa do Nome do Agente) ---
//
// Duas coisas diferentes saem daqui, e elas têm custos diferentes:
//
//   - a IDENTIDADE (LDAP/e-mail), que o CRM já entrega de graça no
//     aria-label do botão da conta e na URL da foto;
//   - o NOME DE EXIBIÇÃO, que só existe depois de abrir o menu de perfil
//     (com o menu fechado, <material-popup class="profile-popup"> vem vazio).
//
// Antes, as duas dependiam de abrir o menu — então uma falha ali levava
// junto o e-mail, e com ele o BCC e o carregamento do perfil. Agora a
// identidade é resolvida primeiro e sem clique; o menu continua sendo aberto
// só pelo nome, que é o que dá personalidade à animação de entrada.
export async function captureNameWithMagic() {
    // Se já temos nome E email, retorna rápido
    if (cachedAgentName && cachedAgentEmail) return cachedAgentName;

    // Identidade primeiro, sem tocar na tela.
    const ldap = ldapLogado();
    if (ldap && !cachedAgentEmail) {
        cachedAgentEmail = `${ldap}@google.com`;
    }

    // Primeiro nome derivado do LDAP ("marco.dias" -> "Marco"). É o que a
    // saudação usa se o menu não abrir: melhor que devolver o LDAP cru ou
    // um "Consultor" genérico.
    const nomeDoLdap = ldap
        ? ldap.split(/[._-]/)[0].replace(/^./, (c) => c.toUpperCase())
        : null;

    try {
        const btn = document.querySelector('profile-icon material-button') ||
            document.querySelector('a[aria-label*="Account"]');

        if (!btn) {
            cachedAgentName = nomeDoLdap || "Consultor";
            return cachedAgentName;
        }

        // Abre o menu
        btn.click();
        await esperar(150); // Tempo para o Angular renderizar o menu

        let name = nomeDoLdap || "Consultor";

        // 1. Captura o NOME
        const elName = document.querySelector('profile-details .name');
        if (elName) {
            const fullName = elName.textContent.trim();
            const primeiro = fullName.split(' ')[0];
            if (primeiro) {
                name = primeiro.charAt(0).toUpperCase() + primeiro.slice(1).toLowerCase();
            }
        }

        // 2. Captura o EMAIL (o do menu é a fonte mais confiável do domínio)
        const elEmail = document.querySelector('profile-details .email');
        if (elEmail) {
            cachedAgentEmail = elEmail.textContent.trim();
            console.log("TechSol: Identidade confirmada ->", cachedAgentEmail);
        }

        // Fecha o menu
        btn.click();
        document.body.click();

        cachedAgentName = name;
        return name;

    } catch (e) {
        console.warn("Sherlock falhou:", e);
        cachedAgentName = nomeDoLdap || "Consultor";
        return cachedAgentName;
    }
}

// --- 2. GETTERS ---
export function getAgentName() {
    return cachedAgentName || "Consultor";
}

// NOVO: Retorna o email capturado
export function getAgentEmail() {
    return cachedAgentEmail || null;
}

// --- 3. ENGINE DE SAUDAÇÃO ---
export function getSmartGreeting(name) {
    const now = new Date();
    const h = now.getHours();
    const d = now.getDay();

    let prefix = "Olá";
    let iconSVG = "";

    if (h >= 5 && h < 12) {
        prefix = "Bom dia";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else if (h >= 12 && h < 18) {
        prefix = "Boa tarde";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>`;
    } else {
        prefix = "Boa noite";
        iconSVG = `<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }

    let phrases = [];
    if (h >= 0 && h < 5) {
        phrases = ["Guerreiro da madrugada.", "O mundo dorme, você avança.", "Foco total."];
    } else if (h < 12) {
        if (d === 1) phrases = ["Vamos definir o tom da semana.", "Nova semana, novas conquistas."];
        else if (d === 5) phrases = ["O último gás antes do descanso.", "Vamos fechar com chave de ouro."];
        else phrases = ["Que seu dia seja produtivo.", "Foco e café para hoje."];
    } else if (h < 18) {
        phrases = ["Mantenha o ritmo.", "Tarde produtiva pela frente.", "Seguimos avançando."];
    } else {
        phrases = ["Encerrando o dia com produtividade.", "Excelente dedicação."];
    }

    if (d === 0 || d === 6) phrases = ["Sua dedicação no fim de semana é inspiradora.", "Trabalho excepcional."];

    const randomSuffix = phrases[Math.floor(Math.random() * phrases.length)];

    return {
        prefix: `${prefix},`,
        name: name,
        suffix: randomSuffix,
        icon: iconSVG,
        isFriday: (d === 5)
    };
}

// --- 4. CAPTURA DE EMAIL DO CLIENTE (Com Validação de @) ---
export async function captureClientEmail() {
    try {
        // 1. Acha o campo "Contact email" (em qualquer idioma da tela)
        const labelNode = acharRotulo('contactEmail');
        if (!labelNode) return null; // Retorna null se não achar, para tratar depois

        const container = labelNode.closest('cuf-form-field') || labelNode.parentElement;

        // 2. Verifica máscara e clica se necessário
        const unmaskBtn = container.querySelector('.unmask-button') ||
            container.querySelector('[aria-label="Click to view"]');

        if (unmaskBtn) {
            unmaskBtn.click();
            // Espera o Angular renderizar o valor real
            await esperar(500);
        }

        // 3. Lê a área de VALOR do campo, não o container inteiro: o
        // container inclui o rótulo, e uma busca por "elemento que tem @"
        // acabava devolvendo "Contact email\ncliente@..." grudado.
        const valor = lerCampo('contactEmail');

        // Continua valendo a validação de @: enquanto o campo está
        // mascarado o valor renderizado é o texto do botão ("Email"), não
        // um endereço.
        if (valor && valor.includes('@') && !valor.includes('Is this:')) {
            return valor.trim();
        }

        return null;

    } catch (e) {
        console.warn("Erro ao capturar email do cliente:", e);
        return null;
    }
}

// --- 4.5 CAPTURA DE TELEFONE DO CLIENTE (PII mascarada) ---
//
// Mesmo padrão do e-mail acima: o valor NÃO existe no DOM até alguém clicar no
// unmask. A diferença que custa trabalho é o reconhecimento — e-mail se acha
// pelo "@", telefone não tem marca dessas, então a heurística é por dígitos.
//
// Devolve null (e não "") quando não acha, pra quem consome distinguir "não tem
// telefone" de "não consegui ler".
function pareceTelefone(texto) {
    const t = String(texto || "").trim();
    if (!t || t.length > 30) return false;

    // "Phone" é o rótulo que o próprio botão de unmask mostra enquanto o valor
    // está escondido — sem esta linha, o estado mascarado seria lido como se
    // fosse o dado.
    if (/^phone$/i.test(t)) return false;
    if (t.includes("Is this:")) return false;

    // Só dígitos e pontuação de telefone. É o que descarta "Click to view",
    // datas e IDs que por acaso morem no mesmo container.
    if (!/^[\d\s()+\-.]+$/.test(t)) return false;

    const digitos = t.replace(/\D/g, "");
    return digitos.length >= 8 && digitos.length <= 15;
}

export async function captureClientPhone() {
    try {
        // Pelo resolvedor de rótulos, e não pelo XPath em inglês: numa tela
        // traduzida o rótulo é "Número de telefone", e o contains(text(),
        // 'Phone number') não casava — mesmo defeito que esvaziava as outras
        // capturas.
        const labelNode = acharRotulo('phoneNumber');
        if (!labelNode) return null;

        const container = labelNode.closest('cuf-form-field') || labelNode.parentElement;
        if (!container) return null;

        const unmaskBtn = container.querySelector('.unmask-button') ||
            container.querySelector('[aria-label="Click to view"]');

        if (unmaskBtn) {
            unmaskBtn.click();
            await esperar(500); // Espera o Angular renderizar o valor real
        }

        // Lê a área de VALOR do campo. O container inclui o rótulo, e varrer
        // todos os descendentes atrás de "algo que pareça telefone" já trouxe
        // rótulo grudado no valor uma vez (ver captureClientEmail).
        const valor = lerCampo('phoneNumber');
        return pareceTelefone(valor) ? valor.trim() : null;

    } catch (e) {
        console.warn("Erro ao capturar telefone do cliente:", e);
        return null;
    }
}

// --- 5. CAPTURA DO AM (vai no BCC) ---
//
// Regra de negócio: o BCC é o AM, e o AM nunca é o dono do caso. A versão
// anterior lia material-input[debug-id="account-id-input"] — que é o campo
// de BUSCA DE CLIENTE — e colava "@google.com" no que achasse ali, podendo
// mandar BCC para um endereço que não existe. Ver am-resolver.js e ADR-0011.
export async function captureAM() {
    try {
        return await resolveAM();
    } catch (e) {
        console.warn("Erro ao resolver AM:", e);
        return { email: null, nome: null, origem: 'erro' };
    }
}

// --- 6. CAPTURA DE CID ---
export function captureCID() {
    try {
        // Só pelo rótulo. O fallback antigo varria body.innerText atrás de
        // \d{3}-?\d{3}-?\d{4} — e qualquer telefone ou ID de 10 dígitos na
        // tela virava "o CID", silenciosamente e sem como perceber depois.
        const bruto = lerCampo('externalCustomerId');
        if (!bruto) return "N/A";

        const digitos = bruto.replace(/\D/g, '');
        if (digitos.length !== 10) return "N/A";

        return digitos.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } catch (e) {
        console.warn("Erro ao capturar CID:", e);
    }
    return "N/A";
}

// --- 7. NOME DO AM ---
// Mesma fonte do BCC: AM e BCC são o mesmo endereço, então ter duas
// resoluções independentes só criaria como divergirem entre si.
export function captureAMName(am) {
    return am?.nome || am?.email || null;
}

// --- 8. CAPTURA DE TIMEZONE ---
export function captureTimezone() {
    try {
        return lerCampo('customerTimezone');
    } catch (e) {
        console.warn("Erro ao capturar Timezone:", e);
    }
    return null;
}


export async function getCaseId() {
    try {
        // O caso tem um widget próprio com o ID e um botão de copiar. A URL
        // é só o fallback: a tela mostra mais de um case ID (o histórico de
        // interações lista casos antigos), então varrer texto erra o alvo.
        const doWidget = document.querySelector('[debug-id="case-id"]')?.textContent;
        const id = doWidget?.match(/\d-\d{6,}/)?.[0];
        if (id) return id;

        return window.location.href.split("/").pop() || "---";
    } catch (e) {
        console.warn("Falha ao capturar Case ID:", e);
        return "---";
    }
}

export function captureSalesProgram() {
    try {
        // Casa o rótulo por igualdade, não por "contém": a tela também tem
        // "Program" (o tier de suporte, ex.: Silver), que é outro campo.
        // Com "contém", qual dos dois vencia dependia da ordem do DOM.
        return lerCampo('salesProgram') || "";
    } catch (e) {
        console.warn("Erro ao capturar Sales Program:", e);
    }
    return "";
}

// Sobrenome do anunciante ("Family name" no Contact Us form). Mesmo formato do
// "Given name" raspado em getPageData(): texto puro no irmão seguinte do rótulo,
// sem máscara de PII — diferente do e-mail e do telefone, que exigem clique no
// unmask antes de o valor sequer existir no DOM.
//
// Devolve "" (e não "N/A") quando não acha: quem consome trata string vazia como
// "campo aparece editável no formulário", que é o comportamento certo aqui.
export function captureAdvertiserLastName() {
    try {
        // Pelo resolvedor de rótulos: numa tela traduzida o rótulo é "Nome de
        // família", e o contains(text(), 'Family name') não casava.
        return lerCampo('familyName') || "";
    } catch (e) { console.warn("Falha Sobrenome:", e); }
    return "";
}

// --- 8.5 CAPTURA DE IDIOMA E SPEAKEASY ID ---
// Idioma do NEGÓCIO do anunciante, raspado do CRM. Não é o que vai para a
// coluna Idioma do BAU_form_data — lá vai o segmento que o AGENTE atende
// (profile.defaultLanguage, ver db-schema.md índice 11). Esta captura é só
// fallback para quando não há perfil carregado.
//
// Duas correções de uma vez, porque a função nunca devolveu nada útil:
//   1. o rótulo no Contact Us form é "Business language", com l minúsculo — o
//      includes('Language') sensível a caixa jamais casava;
//   2. mesmo casando, o valor mora num <sanitized-content> DENTRO do container
//      do rótulo, não num irmão seguinte. É o mesmo formato que captureTimezone()
//      logo acima já trata — e é por isso que aquela funciona e esta não.
export function captureLanguage() {
    try {
        // O crm-labels.js já faz as duas correções descritas acima (casa o
        // rótulo sem caixa e lê o <sanitized-content> de dentro do container),
        // e ainda casa "Linguagem comercial" na tela traduzida.
        return lerCampo('businessLanguage') || "N/A";
    } catch (e) { console.warn("Erro ao capturar Idioma:", e); }
    return "N/A";
}

export function captureSpeakeasyID() {
    try {
        // Só pelas labels estruturadas. A varredura de .preview que existia
        // aqui não tinha como funcionar: o servidor trunca o preview do case
        // log em ~152 caracteres (termina com "..." literal), e um
        // P\\d{15,25} praticamente nunca cabe. Quem acha o SE ID de verdade
        // é o botão de busca (notes/automation/case-log-scraper.js), que
        // expande a mensagem antes de ler.
        const labels = Array.from(document.querySelectorAll('.data-pair-label, .form-label'));
        const seLabel = labels.find(el =>
            el.textContent.includes('Speakeasy ID') ||
            el.textContent.includes('SE ID')
        );
        if (seLabel) {
            const parent = seLabel.closest('.data-pair') || seLabel.parentElement;
            const content = parent.querySelector('.data-pair-content') || parent.nextElementSibling;
            if (content && content.textContent.trim()) return content.textContent.trim();
        }
    } catch (e) {
        console.warn("Erro ao capturar SE ID:", e);
    }

    return "N/A";
}

// --- 8.6 UTILITÁRIOS DE PERMISSÃO ---
export function isCurrentUserOverhead() {
    return cachedUserProfile?.isOverhead || false;
}

// Guarda o perfil resolvido no boot do app.
//
// Antes, o perfil só entrava neste cache dentro de getPageData(), que roda
// quando algum módulo precisa raspar a página do CRM. Quem abrisse só a Central
// de Avisos nunca passava por lá, e getAgentSegment() abaixo responderia PT
// para todo mundo — inclusive para quem atende ES. O boot já busca o perfil
// para resolver o idioma da interface; agora ele também o deixa disponível
// aqui, que é onde o resto do app pergunta quem é a pessoa.
export function setUserProfile(profile) {
    if (profile) cachedUserProfile = profile;
}

// Segmento que a pessoa atende, vindo da coluna Segmento da aba People
// (já normalizado pelo backend em profile.defaultLanguage: PT-BR, ES ou EN).
//
// Não é a mesma coisa que getLanguage() do i18n: aquele é o idioma da
// INTERFACE, que a pessoa pode trocar em Configurações. Este é a operação que
// ela atende, e é o que decide qual disponibilidade BAU e quais avisos
// segmentados fazem sentido para ela. Quem atende PT e prefere a interface em
// espanhol continua sendo PT.
//
// EN cai em PT porque não há operação BAU em inglês — mesma decisão já tomada
// em i18n.js, que manda EN para o dicionário PT por não existir tradução.
export function getAgentSegment() {
    const raw = String(cachedUserProfile?.defaultLanguage || "").toUpperCase();
    return raw === 'ES' ? 'ES' : 'PT';
}

// --- 9. COMPILADOR DE DADOS DA PÁGINA ---
export async function getPageData() {
    // Garante que os dados estejam no idioma original para evitar falhas de raspagem
    await ensureOriginalLanguage();

    // Garante que a identidade foi capturada antes de prosseguir
    if (!cachedAgentEmail) {
        await captureNameWithMagic();
    }

    // Nome do anunciante e site: pelo rótulo, que o resolvedor reconhece
    // traduzido ou não. O XPath anterior casava o texto em inglês, então na
    // tela traduzida o nome caía no literal "Cliente" e o site vinha vazio.
    const advertiserName = lerCampo('givenName') || "Cliente";
    const websiteUrl = lerCampo('website') || "";

    // Tarefas do agendamento: multivalorado (um caso real trouxe seis).
    const appointmentTasks = lerCampoTodos('appointmentTasks');

    // Captura EMAILS e TELEFONE
    // Em paralelo de propósito: os dois clicam no próprio unmask e esperam 500ms
    // pelo Angular. Em série isso custaria 1s no caminho que TODO módulo chama
    // (sete pontos de chamada de getPageData); juntos, custa os mesmos 500ms de
    // antes do telefone existir.
    const [clientEmail, clientPhone] = await Promise.all([
        captureClientEmail(),
        captureClientPhone(),
    ]);

    // O AM é uma resolução só, usada tanto no campo AM quanto no BCC. Fica
    // fora do Promise.all acima porque mexe noutra área da tela (o case log),
    // e no caminho barato nem chega a clicar.
    const am = await captureAM();

    // Captura CID
    const cid = captureCID();

    const amName = captureAMName(am);
    const timezone = captureTimezone();

    // Contexto do cabeçalho e fatos do case log. Ambos já estavam na tela e
    // nada consumia: leitura direta, sem clique e sem depender de idioma.
    const caseContext = getCaseContext();
    const caseLog = getCaseLogFacts();

    const caseId = await getCaseId();
    const salesProgram = captureSalesProgram();
    const language = captureLanguage();
    const seId = captureSpeakeasyID();
    const advLastName = captureAdvertiserLastName();

    // Novo: Captura de Perfil de Usuário
    const agentEmail = getAgentEmail();
    if (agentEmail && !cachedUserProfile) {
        const ldap = agentEmail.split('@')[0];
        try {
            cachedUserProfile = await fetchUserProfile(ldap);
        } catch (e) {
            console.warn("Falha ao carregar perfil do usuário:", e);
        }
    }

    return {
        // Core fields (Original names)
        advertiserName: advertiserName,
        websiteUrl: websiteUrl,
        clientEmail: clientEmail,
        internalEmail: am.email,
        cid: cid,
        amName: amName,
        amEmail: am.email,
        amOrigem: am.origem,
        appointmentTasks: appointmentTasks,
        caseContext: caseContext,
        caseLog: caseLog,
        timezone: timezone,
        agentName: getAgentName(),
        agentEmail: getAgentEmail(),
        caseId: caseId,
        userProfile: cachedUserProfile,

        // Aliases for BAU Form compatibility
        advName: advertiserName,
        site: websiteUrl,
        website: websiteUrl, // bau-form-config.js's campo 'website' lê pageData.website, não .site
        email: clientEmail,
        advEmail: clientEmail, // bau-form-config.js's campo 'advEmail' lê pageData.advEmail
        salesProgram: salesProgram,
        language: language,
        seId: seId,
        advLastName: advLastName,
        advPhone: clientPhone
    };
}

//criar função separada case id