// src/trusted-types-default.js
//
// O CRM exige Trusted Types e o Pre-call monta parte da tela com innerHTML. O
// bookmarklet do app completo cria a política `default` ANTES de carregar o
// bundle; o build avulso não tem esse passo, então ele a cria aqui.
//
// Tem de ser o PRIMEIRO import de precall-standalone.js: animations.js grava um
// <style> com innerHTML no próprio import, antes de o corpo da entrada rodar.
// Sem a política já criada nesse instante, o arquivo inteiro cai ao carregar.

if (window.trustedTypes?.createPolicy) {
    try {
        window.trustedTypes.createPolicy('default', {
            createHTML: (s) => s,
            createScriptURL: (s) => s,
            createScript: (s) => s,
        });
    } catch (e) { /* já existe uma `default` (a do bookmarklet do app): serve */ }
}
