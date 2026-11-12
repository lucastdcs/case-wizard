// src/precall-standalone-i18n-en.js
//
// Entra no lugar do i18n.js no build avulso EM INGLÊS (scripts/build-precall-standalone.mjs,
// ADR-0020). A interface é sempre `en`: não lê o idioma do navegador nem o
// `cw_ui_lang` salvo — quem usa o app completo e escolheu PT lá veria PT aqui — e
// não grava nada no localStorage, para não mexer nas preferências do app.
//
// Os nomes exportados são os que o grafo do Pre-call importa do i18n.js. Se um dia
// ele importar outro, o build falha em vez de seguir com um undefined.

export const getLanguage = () => 'en';
export const onLanguageChange = () => () => {};

// Datas na tela (formatToLocalUserDate, em utils.js): os mesmos valores que o
// i18n.js devolve para `en` - 24 h e mês por extenso curto. Se mudarem lá, mudam aqui.
export const getLocale = () => 'en-GB';
export const getMonthStyle = () => 'short';

// Sem troca de idioma: a entrada só chama `setLanguage` se `isSupportedLang` disser
// que o idioma do navegador serve, e aqui nenhum serve.
export const setLanguage = () => {};
export const isSupportedLang = () => false;

export function createTranslator(dict) {
    return (key) => dict.en?.[key] ?? key;
}
