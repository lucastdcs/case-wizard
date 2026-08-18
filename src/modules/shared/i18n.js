// src/modules/shared/i18n.js
//
// Idioma de sessão do Case Wizard. Ordem de resolução:
//   1. Override manual salvo neste navegador (troca em Configurações)
//   2. profile.defaultLanguage vindo da planilha "People" (coluna Segmento)
//   3. "pt" como padrão de segurança
//
// O perfil ainda pode devolver "EN" (planilha suporta 3 segmentos), mas o
// Case Wizard só tem dicionários PT/ES por enquanto — EN cai para PT até
// existir uma tradução em inglês.

const STORAGE_KEY = "cw_ui_lang";
const SUPPORTED_LANGS = ["pt", "es"];
const DEFAULT_LANG = "pt";

function readStoredLang() {
    try {
        const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        return SUPPORTED_LANGS.includes(raw) ? raw : null;
    } catch (e) {
        return null;
    }
}

let manualOverride = readStoredLang();
let currentLang = manualOverride || DEFAULT_LANG;
const listeners = new Set();

export function getLanguage() {
    return currentLang;
}

export function isSupportedLang(lang) {
    return SUPPORTED_LANGS.includes(lang);
}

// persist=true (padrão) marca como escolha manual do usuário, que passa a
// ter prioridade sobre o idioma vindo do perfil da planilha.
export function setLanguage(lang, { persist = true } = {}) {
    if (!isSupportedLang(lang) || lang === currentLang) return;
    currentLang = lang;
    if (persist) {
        manualOverride = lang;
        try {
            if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* localStorage indisponível (ex: aba privada) — segue só em memória */ }
    }
    listeners.forEach(fn => {
        try { fn(currentLang); } catch (e) { console.warn("i18n listener falhou:", e); }
    });
}

// Chamado no boot com o profile vindo de fetchUserProfile(). Só aplica o
// idioma da planilha se a pessoa nunca trocou manualmente neste navegador.
export function applyProfileLanguage(profile) {
    if (manualOverride) return;
    const raw = String(profile?.defaultLanguage || "").toUpperCase();
    const map = { "PT-BR": "pt", "PT": "pt", "ES": "es" };
    const lang = map[raw];
    if (lang) setLanguage(lang, { persist: false });
}

export function onLanguageChange(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

// Helper para módulos com um dicionário { pt: {...}, es: {...} } próprio,
// no mesmo formato que src/modules/notes/data/notes-data.js já usa.
export function createTranslator(dict) {
    return function t(key) {
        return dict[currentLang]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
    };
}
