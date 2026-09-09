// src/modules/shared/am-resolver.js
//
// Descobre o Account Manager do caso — que é quem vai no BCC dos e-mails.
//
// A regra de negócio que motiva este módulo: **o BCC é o AM, e o AM nunca é
// o dono do caso (assignee)**. A versão anterior lia o e-mail interno de
// `material-input[debug-id="account-id-input"]`, que é o campo de BUSCA DE
// CLIENTE do cabeçalho, e colava "@google.com" no que achasse ali — ou seja,
// podia gerar `email-do-cliente@google.com` e mandar BCC para um endereço
// inexistente sem ninguém perceber.
//
// Onde o AM realmente aparece: no case log. Os e-mails automáticos de
// confirmação de agendamento saem de `ads-support@google.com` e vão para o
// cliente **e para o AM**; e o Contact Us Form registra quem o submeteu, que
// também é o AM. Numa captura real, filtrar os `@google.com` do log tirando
// o robô e o dono do caso deixou exatamente um candidato — o AM correto.
//
// Ordem de resolução (decidida com a operação):
//   1. o que já está VISÍVEL no log — sem clicar em nada, sem custo;
//   2. se não achou, aí sim expande as mensagens de e-mail e tenta de novo;
//   3. com 2+ candidatos, desempata pelo submitter do Contact Us Form;
//   4. sem candidato, cai no primeiro <internal-user-info> da tela;
//   5. ainda ambíguo, devolve null — que a UI trata pedindo confirmação.
//
// Devolver null é de propósito: este valor vai para a planilha BAU e para o
// BCC de um e-mail de verdade. Chutar o AM errado é pior que não preencher.

import { esperar, simularClique } from './dom-utils.js';

const RE_EMAIL_GOOGLE = /[A-Za-z0-9._%+-]+@google\.com/g;

// Remetentes automáticos: aparecem em todo caso e nunca são o AM.
const ROBOS = [/^ads-support@/i, /^noreply@/i, /^no-reply@/i, /-bot@/i];

const ehRobo = (email) => ROBOS.some((re) => re.test(email));

// LDAP do dono do caso. Vem de [debug-id="assignee"], que traz "fulano@"
// (sem domínio) — é a única parte estável, então comparamos só o LDAP.
function ldapDoAssignee() {
    const el = document.querySelector('[debug-id="assignee"]');
    const bruto = el?.textContent.trim() || '';
    return bruto.replace(/@.*$/, '').toLowerCase() || null;
}

// LDAP de quem está logado, sem abrir o menu de perfil: o CRM já expõe isso
// no botão da conta e na URL da foto.
export function ldapLogado() {
    const rotulo = document.querySelector('[aria-label^="Signed in as"]')
        ?.getAttribute('aria-label');
    const doRotulo = rotulo?.replace(/^Signed in as\s+/i, '').trim();
    if (doRotulo) return doRotulo.toLowerCase();

    const foto = document.querySelector('img.photo[src*="/photos/"]')?.src;
    return foto?.match(/\/photos\/([^?/]+)/)?.[1]?.toLowerCase() || null;
}

function mensagensDoLog() {
    return Array.from(document.querySelectorAll('case-message-view'));
}

// Candidatos a AM no que está visível: e-mails @google.com do log, menos os
// robôs, menos o dono do caso, menos quem está com a tela aberta.
function candidatos() {
    const excluir = new Set([ldapDoAssignee(), ldapLogado()].filter(Boolean));
    const achados = mensagensDoLog()
        .flatMap((m) => m.textContent.match(RE_EMAIL_GOOGLE) || [])
        .map((e) => e.toLowerCase());

    return [...new Set(achados)].filter((email) => {
        if (ehRobo(email)) return false;
        return !excluir.has(email.replace(/@.*$/, ''));
    });
}

// Desempate: quem submeteu o Contact Us Form. O log não é traduzido junto
// com o painel do caso, mas aceitamos a variante traduzida por segurança.
function submitterDoFormulario(lista) {
    const mensagem = mensagensDoLog().find((m) =>
        /contact us form|formul[áa]rio de contato|formulario de contacto/i.test(m.textContent));
    const email = (mensagem?.textContent.match(RE_EMAIL_GOOGLE) || [])
        .map((e) => e.toLowerCase())
        .find((e) => lista.includes(e));
    return email || null;
}

// Último recurso: a tela lista os contatos internos da conta. Numa captura
// real eram 55, todos com o mesmo papel — por isso isto é FALLBACK, e não a
// fonte principal: com 55 indistinguíveis, chutar erra quase sempre.
function primeiroContatoInterno() {
    const bloco = document.querySelector('internal-user-info');
    if (!bloco) return null;
    const email = bloco.querySelector('.email')?.textContent.trim().toLowerCase();
    return email && !ehRobo(email) ? email : null;
}

// Expande as mensagens de e-mail do log para revelar os cabeçalhos
// From/To, onde o AM aparece. Só é chamado quando o passo barato falhou.
async function expandirEmails() {
    const fechados = Array.from(document.querySelectorAll('.message-header'))
        .filter((h) => h.getAttribute('aria-expanded') === 'false');

    for (const header of fechados) {
        simularClique(header);
        await esperar(400);
        if (candidatos().length) return;
    }
}

// Nome de exibição do AM, quando a tela tiver o bloco de contato interno.
export function nomeDoContato(email) {
    if (!email) return null;
    const bloco = Array.from(document.querySelectorAll('internal-user-info'))
        .find((u) => u.querySelector('.email')?.textContent.trim().toLowerCase() === email);
    return bloco?.querySelector('[debug-id="name"]')?.textContent.trim() || null;
}

/**
 * Resolve o AM do caso.
 * @param {{expandir?: boolean}} opcoes  expandir=false pula o passo caro.
 * @returns {Promise<{email: string|null, nome: string|null, origem: string}>}
 */
export async function resolveAM({ expandir = true } = {}) {
    let lista = candidatos();
    let origem = 'case-log-visivel';

    if (!lista.length && expandir) {
        await expandirEmails();
        lista = candidatos();
        origem = 'case-log-expandido';
    }

    let email = null;
    if (lista.length === 1) {
        email = lista[0];
    } else if (lista.length > 1) {
        email = submitterDoFormulario(lista);
        origem = email ? 'contact-us-form' : origem;
    }

    if (!email) {
        email = primeiroContatoInterno();
        origem = email ? 'internal-user-info' : 'nao-resolvido';
    }

    return { email: email || null, nome: nomeDoContato(email), origem };
}
