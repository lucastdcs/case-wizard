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

/** Crédito de autoria, no formato único usado em todo o app. */
export const AUTHOR_CREDIT = "@lucaste";
