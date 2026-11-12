// src/modules/shared/i18n.js
//
// Dois idiomas, não um. O Case Wizard resolve separadamente:
//
//   - IDIOMA DA INTERFACE (`getLanguage`): menus, botões, mensagens. É
//     conforto de quem opera a ferramenta.
//   - IDIOMA DA SAÍDA (`getOutputLanguage`): o que vai para o case note,
//     para o e-mail do anunciante e para o roteiro da chamada. É o idioma
//     do ATENDIMENTO, não o de quem atende.
//
// Eles eram o mesmo botão até a entrada do inglês. Com PT/ES a coincidência
// era inofensiva — quase todo agente PT atende em PT. Com EN deixa de ser:
// um agente que põe a interface em inglês por preferência passaria a gravar
// notas e mandar e-mails em inglês para anunciantes PT/ES, sem aviso. Ver
// docs/decisions/0016-idioma-da-interface-separado-do-idioma-da-saida.md.
//
// Ordem de resolução, idêntica para os dois:
//   1. Override manual salvo neste navegador
//   2. profile.defaultLanguage vindo da planilha "People" (coluna Segmento)
//   3. "pt" como padrão de segurança
//
// O passo 2 só chega DEPOIS do boot (o e-mail que busca o perfil é capturado
// dentro da splash), então a splash e tudo que se desenha antes dele sairia no
// idioma errado para quem depende só do perfil. Por isso o último idioma de
// perfil aplicado fica guardado e vale como passo 2 já na carga seguinte:
// continua abaixo do override manual e é regravado a cada perfil que chega.

const STORAGE_KEY = "cw_ui_lang";
const OUTPUT_STORAGE_KEY = "cw_output_lang";
const PROFILE_STORAGE_KEY = "cw_profile_lang";
export const SUPPORTED_LANGS = ["pt", "es", "en"];
const DEFAULT_LANG = "pt";

// Mapeia o que a planilha People grava em Segmento/Idioma para o código
// interno de 2 letras. Única tradução desse par no frontend.
const PROFILE_LANG_MAP = { "PT-BR": "pt", "PT": "pt", "ES": "es", "EN": "en" };

// Caminho inverso: o que vai GRAVADO na planilha (coluna Idioma do BAU,
// `Idioma:` do case note). O backend e os relatórios do TL só conhecem
// estes três valores — ver specs/data-models/db-schema.md.
const PROFILE_LANG_CODES = { pt: "PT-BR", es: "ES", en: "EN" };

// Locale (BCP-47) da INTERFACE para formatar data e hora na tela. O EN usa
// en-GB de propósito: 24 h, como o resto do produto (ADR-0010) - e o Timezone
// descobre a hora lendo o texto antes do ":", o que quebraria com "3:27 PM".
const LOCALES = { pt: "pt-BR", es: "es-ES", en: "en-GB" };

export function getLocale(lang = getLanguage()) {
    return LOCALES[lang] || LOCALES[DEFAULT_LANG];
}

// 05/09 é 5 de setembro para PT e ES, e 9 de maio para quem lê em inglês
// americano: em EN o mês vai por extenso curto ("05 Sept"), como o resumo do
// TL já faz.
export function getMonthStyle(lang = getLanguage()) {
    return lang === "en" ? "short" : "2-digit";
}

export function toProfileLangCode(lang) {
    return PROFILE_LANG_CODES[lang] || PROFILE_LANG_CODES[DEFAULT_LANG];
}

function readStoredLang(key) {
    try {
        const raw = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
        return SUPPORTED_LANGS.includes(raw) ? raw : null;
    } catch (e) {
        return null;
    }
}

export function isSupportedLang(lang) {
    return SUPPORTED_LANGS.includes(lang);
}

// Fábrica dos dois knobs. Idênticos em mecânica (override manual > perfil >
// padrão) e independentes em valor, então vale uma função em vez de duas
// cópias do mesmo bloco de listeners.
function createLangChannel(storageKey, label) {
    let manualOverride = readStoredLang(storageKey);
    let currentLang = manualOverride || readStoredLang(PROFILE_STORAGE_KEY) || DEFAULT_LANG;
    const listeners = new Set();

    return {
        get: () => currentLang,
        hasManualOverride: () => Boolean(manualOverride),
        // persist=true (padrão) marca como escolha manual do usuário, que
        // passa a ter prioridade sobre o idioma vindo do perfil.
        set(lang, { persist = true } = {}) {
            if (!isSupportedLang(lang) || lang === currentLang) return;
            // Perfil (persist=false) nunca atropela escolha manual salva.
            if (!persist && manualOverride) return;
            currentLang = lang;
            if (persist) {
                manualOverride = lang;
                try {
                    if (typeof localStorage !== "undefined") localStorage.setItem(storageKey, lang);
                } catch (e) { /* localStorage indisponível (ex: aba privada) — segue só em memória */ }
            }
            listeners.forEach(fn => {
                try { fn(currentLang); } catch (e) { console.warn(`i18n listener (${label}) falhou:`, e); }
            });
        },
        onChange(callback) {
            listeners.add(callback);
            return () => listeners.delete(callback);
        },
    };
}

const uiLang = createLangChannel(STORAGE_KEY, "interface");
const outputLang = createLangChannel(OUTPUT_STORAGE_KEY, "saída");

// --- IDIOMA DA INTERFACE ---

export function getLanguage() {
    return uiLang.get();
}

export function setLanguage(lang, opts) {
    uiLang.set(lang, opts);
}

export function onLanguageChange(callback) {
    return uiLang.onChange(callback);
}

// --- IDIOMA DA SAÍDA (case note, e-mail, call script) ---

export function getOutputLanguage() {
    return outputLang.get();
}

export function setOutputLanguage(lang, opts) {
    outputLang.set(lang, opts);
}

export function onOutputLanguageChange(callback) {
    return outputLang.onChange(callback);
}

// Chamado no boot com o profile vindo de fetchUserProfile(). Só aplica o
// idioma da planilha se a pessoa nunca trocou manualmente neste navegador.
//
// O MESMO valor alimenta os dois canais, e é isso que mantém o caso comum
// sem atrito: um agente ES continua vendo a ferramenta em espanhol e
// escrevendo em espanhol, sem tocar em nada. A separação só aparece para
// quem decide trocar um dos dois.
export function applyProfileLanguage(profile) {
    const raw = String(profile?.defaultLanguage || "").toUpperCase();
    const lang = PROFILE_LANG_MAP[raw];
    if (!lang) return;
    try {
        if (typeof localStorage !== "undefined") localStorage.setItem(PROFILE_STORAGE_KEY, lang);
    } catch (e) { /* localStorage indisponível: o próximo boot só volta ao padrão */ }
    setLanguage(lang, { persist: false });
    setOutputLanguage(lang, { persist: false });
}

// Helper para módulos com um dicionário { pt: {...}, es: {...}, en: {...} }
// próprio, no mesmo formato que src/modules/notes/data/notes-data.js usa.
// Chave ausente cai para PT — nunca para a chave crua, que apareceria na
// tela como `scDeleteConfirm`.
export function createTranslator(dict) {
    return function t(key) {
        return dict[getLanguage()]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
    };
}

// Igual ao createTranslator, mas lê o idioma da SAÍDA. Para dicionários que
// produzem texto gravado no caso/enviado ao anunciante, não texto de tela.
export function createOutputTranslator(dict) {
    return function t(key) {
        return dict[getOutputLanguage()]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
    };
}
