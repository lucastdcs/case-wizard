// src/modules/shared/case-context.js
//
// Lê o cabeçalho do caso: estado, SLA, idade, tier, programa e país de
// cobrança.
//
// Tudo aqui sai de `debug-id`, que é o contrato mais estável que essa app
// Angular expõe — e, ao contrário dos rótulos do formulário, o tradutor do
// CRM não mexe nesta área. Por isso não passa pelo crm-labels.js: seria
// dicionário para um problema que não existe aqui.
//
// Nada disso era capturado antes, embora já estivesse na tela.

const texto = (debugId) => {
    const el = document.querySelector(`[debug-id="${debugId}"]`);
    const valor = el?.textContent.replace(/\s+/g, ' ').trim();
    return valor || null;
};

// O título do caso é um <material-input>: o textContent traz o placeholder
// ("Enter a case title"), não o que a pessoa digitou. O valor real está no
// <input> de dentro, e vazio quer dizer sem título — não "sem campo".
function tituloDoCaso() {
    const input = document.querySelector('[debug-id="case-summary-input"] input');
    return input?.value.trim() || null;
}

/**
 * Contexto do caso, direto do cabeçalho.
 * Campos ausentes voltam null — a tela varia conforme o tipo de caso.
 */
export function getCaseContext() {
    return {
        titulo: tituloDoCaso(),
        estado: texto('state-button'),                  // ex.: "Finished"
        slaRotulo: texto('due-in-label'),               // ex.: "Due (reply)"
        slaTexto: texto('due-in-text'),                 // ex.: "SLA met"
        criadoEm: texto('date-created-value'),          // ex.: "4 days ago"
        tier: texto('badge-text'),                      // ex.: "Silver"
        programaBadge: texto('sales-program-badge'),    // ex.: "SMB Growth"
        paisCobranca: texto('adwords-billing-country'), // ex.: "Brazil"
        // O dono do caso. Não confundir com o AM: quem vai no BCC é o AM
        // (ver am-resolver.js), e os dois são pessoas diferentes.
        assignee: texto('assignee'),
    };
}
