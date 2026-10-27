// src/modules/shared/config.js

/**
 * List of LDAP usernames with administrative privileges.
 * Moving this to a global file to centralize admin features.
 */
export const ADMINS = ["lucaste", "ricardogi"];

/**
 * Form único de report de bugs e sugestões do Case Wizard.
 *
 * Antes existiam três links diferentes espalhados (overlay de ajuda,
 * Configurações e o rodapé dos e-mails automáticos), e trocar o form
 * significava caçar os três. Aqui é o único ponto de verdade do front —
 * o backend tem a sua própria cópia em gas-backend/Código.js
 * (CW_FEEDBACK_FORM_URL), porque o Apps Script não importa deste módulo.
 *
 * O sufixo /viewform é obrigatório: sem ele a URL abre o EDITOR do form,
 * que o agente não tem permissão para ver.
 */
export const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/1v8mi4eLmx3a2GX2lEMmxMDR2n8AdzGL9WP_p_YEaveg/viewform";

/**
 * Documentação do projeto (deck de slides), para o agente que travou.
 *
 * Mesmo arranjo do FEEDBACK_FORM_URL: este é o ponto de verdade do front e o
 * backend tem a sua cópia em gas-backend/Código.js (CW_DOCS_URL), porque o
 * Apps Script não importa deste módulo. `test:deployment-env` trava as duas
 * cópias iguais.
 *
 * O sufixo /preview é de propósito: /edit abre o EDITOR do deck, e quem tem
 * permissão de edição poderia alterá-lo sem querer ao só consultar. O
 * `resourcekey` precisa acompanhar a URL: sem ele, quem recebe o deck por
 * link cai numa tela de "solicitar acesso".
 *
 * Hoje é um deck único para os três idiomas. Se virar um por idioma, esta
 * constante vira um mapa `{ pt, es, en }`, e a cópia do backend também.
 */
export const DOCS_URL =
  "https://docs.google.com/presentation/d/1EOBUyK0xK2hXv29939NjIEJpgHsKeNG37HHgI8jWTc0/preview?resourcekey=0-_ct0TKJgzoEhOkhlxz6ZbA";

/** Crédito de autoria, no formato único usado em todo o app. */
export const AUTHOR_CREDIT = "@lucaste";
