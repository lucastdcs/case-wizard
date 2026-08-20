// src/modules/links/links-assistant.js

import { stylePopup, showToast } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation, isModuleOpen } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll, createEmptyState } from "../shared/dom-utils.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";
import { DataService } from "../shared/data-service.js";

// Descrição de cada link em espanhol, chaveada pelo texto em português.
// Estão aqui as 60 descrições — inclusive as que ficam iguais nos dois
// idiomas (ex: "Setup Inicial") e as que são nome próprio/inglês e não se
// traduzem (ex: "Ghost Ads", "Help Center"). Mapear todas, e não só as que
// mudam, faz "ausente deste mapa" significar inequivocamente "ainda não
// traduzida" — o que torna a checagem de cobertura trivial.
// O `name` de cada link não entra aqui: são nomes de ferramenta/SOP
// (Moma Home, RegExr, [SOP] Split), que não se traduzem.
const LINK_DESC_ES = {
    'Ponto Eletrônico': 'Control de Asistencia',
    'Ferramenta de ajuda': 'Herramienta de ayuda',
    'Intranet Google': 'Intranet Google',
    'Relatório Follow-ups': 'Informe de Follow-ups',
    'Dashboard WFM': 'Dashboard WFM',
    'Tech Solutions SAO': 'Tech Solutions SAO',
    'Form Gravação': 'Form Grabación',
    'Form Escalação': 'Form Escalación',
    'Instruções Split': 'Instrucciones Split',
    'Single Page App': 'Single Page App',
    'Procedimento Padrão': 'Procedimiento Estándar',
    'Validação Código': 'Validación Código',
    'Conversão Chamada': 'Conversión Llamada',
    'Validação WCC': 'Validación WCC',
    'ECW4': 'ECW4',
    'Monitoramento EC': 'Monitoreo EC',
    'Resolução problemas': 'Resolución de problemas',
    'Implementação RMKT': 'Implementación RMKT',
    'Pontuação Leads': 'Puntuación de Leads',
    'Instalação Container': 'Instalación Container',
    'Instalação Config.': 'Instalación Config.',
    'Validação GA4': 'Validación GA4',
    'Guia Dev': 'Guía Dev',
    'Resolução Problemas': 'Resolución de Problemas',
    'Domínio Cruzado': 'Dominio Cruzado',
    'Lista Oficial': 'Lista Oficial',
    'Criador URLs': 'Creador de URLs',
    'Setup Inicial': 'Setup Inicial',
    'Otimização Feed': 'Optimización Feed',
    'Ferramenta Interna': 'Herramienta Interna',
    'Avaliações': 'Reseñas',
    'Feeds Offline': 'Feeds Offline',
    'Help Center': 'Help Center',
    'Guias CMS': 'Guías CMS',
    'Soluções Iframes': 'Soluciones Iframes',
    'Ghost Ads': 'Ghost Ads',
    'Ghost Analytics': 'Ghost Analytics',
    'Ghost GTM': 'Ghost GTM',
    'Ferramenta': 'Herramienta',
    'Ghost MC': 'Ghost MC',
    'Playground JS': 'Playground JS',
    'Testador Regex': 'Probador Regex',
    'Doc. CSP': 'Doc. CSP',
    'Guia CoMo': 'Guía CoMo',
    'Debug CoMo': 'Debug CoMo',
    'Portal Colaborador': 'Portal del Colaborador',
    'Apps e Sistemas': 'Apps y Sistemas',
    'Folha Pagamento': 'Nómina',
    'Reportar problemas': 'Reportar problemas',
    'Registro chamadas': 'Registro de llamadas',
    'Erros de sistema': 'Errores de sistema',
    'BAU/Descarte/Monitoria': 'BAU/Descarte/Monitoreo',
    'Feedback positivo': 'Feedback positivo',
    'Casos difíceis': 'Casos difíciles',
    'Chat/Email Ads': 'Chat/Email Ads',
    'Chat/Email Shopping': 'Chat/Email Shopping',
    'Perfil da Empresa': 'Perfil de la Empresa',
    'Console API': 'Console API',
    'Lista de números': 'Lista de números',
    'Cursos': 'Cursos',
};
// Aceita o objeto do link (não só a string) porque os itens vindos da Central
// de Conteúdo carregam a tradução em `descEs`, editável na tela. O mapa
// LINK_DESC_ES acima segue valendo para os links do fallback embutido.
function linkDesc(link) {
    const obj = (link && typeof link === 'object') ? link : { desc: link };
    const desc = obj.desc || '';
    if (getLanguage() !== 'es') return desc;
    return obj.descEs || LINK_DESC_ES[desc] || desc;
}

const LINKS_DICT = {
    pt: {
        headerTitle: "Central de Links",
        headerDesc: "Navegue pelas categorias ou use a busca.",
        searchPlaceholder: "Buscar ferramenta ou SOP...",
        recent: "Recentes",
        nothingHereYet: "Nada por aqui ainda",
        nothingHereSub: "Os links que você abrir aparecem aqui pra acesso rápido depois.",
        searchResults: "Resultados da busca",
        nothingFound: "Nada encontrado",
        noLinkMatches: (term) => `Nenhum link bate com "${term}".`,
        copyUrl: "Copiar URL",
        linkCopiedToast: "Link copiado!",
        copyFailedToast: "Não foi possível copiar o link.",
        categoryLabels: { tasks: "Tarefas", ads: "Ads", analytics: "GA4", shopping: "Shop", tech: "Tech", hr: "RH", lm: "Forms", qa: "QA", suporte: "Ajuda" },
    },
    es: {
        headerTitle: "Central de Enlaces",
        headerDesc: "Navega por las categorías o usa la búsqueda.",
        searchPlaceholder: "Buscar herramienta o SOP...",
        recent: "Recientes",
        nothingHereYet: "Todavía no hay nada aquí",
        nothingHereSub: "Los enlaces que abras aparecen aquí para acceso rápido después.",
        searchResults: "Resultados de la búsqueda",
        nothingFound: "No se encontró nada",
        noLinkMatches: (term) => `Ningún enlace coincide con "${term}".`,
        copyUrl: "Copiar URL",
        linkCopiedToast: "¡Enlace copiado!",
        copyFailedToast: "No se pudo copiar el enlace.",
        categoryLabels: { tasks: "Tareas", ads: "Ads", analytics: "GA4", shopping: "Shop", tech: "Tech", hr: "RRHH", lm: "Forms", qa: "QA", suporte: "Ayuda" },
    },
};
function lt(key) {
    const lang = getLanguage();
    return LINKS_DICT[lang]?.[key] ?? LINKS_DICT.pt[key];
}
function catLabel(key) {
    return lt('categoryLabels')[key] ?? LINKS_DB[key]?.label ?? key;
}

// --- DADOS (Links) ---
const LINKS_DB = {
  tasks: {
    label: "Tarefas",
    links: [
      { name: "Web Clock Punch", url: "https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT", desc: "Ponto Eletrônico" },
      { name: "Webão Help Deluxe", url: "http://go/webao-help-deluxe", desc: "Ferramenta de ajuda" },
      { name: "Moma Home", url: "https://moma.corp.google.com/", desc: "Intranet Google" },
      { name: "Plx DataSites", url: "https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/", desc: "Relatório Follow-ups" },
      { name: "Escala & Aderência", url: "https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid", desc: "Dashboard WFM" },
      { name: "Performance Indiv.", url: "https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce", desc: "Tech Solutions SAO" },
      { name: "Solicitar Gravação", url: "https://support.google.com/policies/contact/sar", desc: "Form Gravação" },
      { name: "Escalação Sellers", url: "https://forms.gle/HWMhML56eE4CPZCs5", desc: "Form Escalação" },
      { name: "[SOP] Split", url: "https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o", desc: "Instruções Split" },
    ]
  },
  ads: {
    label: "Ads",
    links: [
      { name: "SPA (Tag Support)", url: "https://tagsupport.corp.google.com/create-session", desc: "Single Page App" },
      { name: "[SOP] Conv. Tracking", url: "https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit", desc: "Procedimento Padrão" },
      { name: "Win Criteria: Code", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit", desc: "Validação Código" },
      { name: "[SOP] Call Conv.", url: "https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit", desc: "Conversão Chamada" },
      { name: "Win Criteria: WCC", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15", desc: "Validação WCC" },
      { name: "[SOP] Enhanced Conv.", url: "https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit", desc: "ECW4" },
      { name: "Ads EC Dashboard", url: "https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69", desc: "Monitoramento EC" },
      { name: "[SOP] Troubleshooting", url: "https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit", desc: "Resolução problemas" },
      { name: "[SOP] Remarketing", url: "https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit", desc: "Implementação RMKT" },
      { name: "[SOP] Lead Scoring", url: "https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit", desc: "Pontuação Leads" },
      { name: "[SOP] GTM Install", url: "https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit", desc: "Instalação Container" }
    ]
  },
  analytics: {
    label: "GA4",
    links: [
      { name: "[SOP] GA4 Setup", url: "https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit", desc: "Instalação Config." },
      { name: "Win Criteria: GA4", url: "https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51", desc: "Validação GA4" },
      { name: "GA4 E-commerce", url: "https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br", desc: "Guia Dev" },
      { name: "[SOP] Troubleshoot GA4", url: "https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit", desc: "Resolução Problemas" },
      { name: "[SOP] Cross Domain", url: "https://support.google.com/ads-help/answer/12282402", desc: "Domínio Cruzado" },
      { name: "Eventos Recomendados", url: "https://developers.google.com/analytics/devguides/collection/ga4/reference/events", desc: "Lista Oficial" },
      { name: "UTM Builder", url: "https://ga-dev-tools.google/ga4/campaign-url-builder/", desc: "Criador URLs" }
    ]
  },
  shopping: {
    label: "Shop",
    links: [
      { name: "[SOP] Onboarding MC", url: "https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit", desc: "Setup Inicial" },
      { name: "[SOP] Feed Opt", url: "https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit", desc: "Otimização Feed" },
      { name: "ShopTroubleshooting", url: "http://go/shoptroubleshooting", desc: "Ferramenta Interna" },
      { name: "[SOP] Product Reviews", url: "https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit", desc: "Avaliações" },
      { name: "[SOP] Offline Feed", url: "https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit", desc: "Feeds Offline" },
      { name: "Especificação Dados", url: "https://support.google.com/merchants/answer/7052112", desc: "Help Center" }
    ]
  },
  tech: {
    label: "Tech",
    links: [
       { name: "Soluções por CMS", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0", desc: "Guias CMS" },
       { name: "Iframes & Cross-Origin", url: "https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0", desc: "Soluções Iframes" },
       { name: "Ads ICS Ghost", url: "http://go/pqp", desc: "Ghost Ads" },
       { name: "Analytics ICS Ghost", url: "http://go/analytics-ics", desc: "Ghost Analytics" },
       { name: "GTM ICS Ghost", url: "http://go/tagmanager-ics", desc: "Ghost GTM" },
       { name: "Gearloose", url: "http://go/gearloose", desc: "Ferramenta" },
       { name: "MC ICS Ghost", url: "https://mcn-ics.corp.google.com/mc/overview", desc: "Ghost MC" },
       { name: "JSFiddle", url: "https://jsfiddle.net/", desc: "Playground JS" },
       { name: "RegExr", url: "https://regexr.com/", desc: "Testador Regex" },
       { name: "Doc. CSP", url: "https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.", desc: "Doc. CSP" },
       { name: "Consent Mode Install", url: "https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced", desc: "Guia CoMo" },
       { name: "Consent Mode Debug", url: "https://developers.google.com/tag-platform/security/guides/consent-debugging", desc: "Debug CoMo" },
    ]
  },
  hr: {
    label: "RH",
    links: [
      { name: "Be.Cognizant", url: "https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx", desc: "Portal Colaborador" },
      { name: "OneCognizant", url: "https://onecognizant.cognizant.com/Home", desc: "Apps e Sistemas" },
      { name: "ADP eXpert", url: "https://expert.cloud.brasil.adp.com/expert2/v4/", desc: "Folha Pagamento" }
    ]
  },
  lm: {
    label: "Forms",
    links: [
      { name: "Ocorrências e Pausas", url: "https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform", desc: "Reportar problemas" },
      { name: "Chamadas >50min", url: "https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform", desc: "Registro chamadas" },
      { name: "Relatório de Bugs", url: "https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform", desc: "Erros de sistema" },
      { name: "Suporte LM", url: "https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec", desc: "BAU/Descarte/Monitoria" },
    ]
  },
  qa: {
    label: "QA",
    links: [
      { name: "Elogios", url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform", desc: "Feedback positivo" },
      { name: "Casos Complexos", url: "https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw", desc: "Casos difíceis" },
    ]
  },
  suporte: {
    label: "Ajuda",
    links: [
      { name: "Fale Conosco Ads", url: "https://support.google.com/google-ads/gethelp", desc: "Chat/Email Ads" },
      { name: "Fale Conosco Merchant", url: "https://support.google.com/merchants/gethelp", desc: "Chat/Email Shopping" },
      { name: "Fale Conosco GMB", url: "https://support.google.com/business/gethelp", desc: "Perfil da Empresa" },
      { name: "Suporte API", url: "https://support.google.com/googleapi", desc: "Console API" },
      { name: "Telefones Suporte", url: "https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers", desc: "Lista de números" },
      { name: "Skill Shop", url: "https://skillshop.withgoogle.com/intl/pt-BR_ALL/", desc: "Cursos" }

    ]
  }
};

// --- HIDRATAÇÃO PELA CENTRAL DE CONTEÚDO ---
// O LINKS_DB acima deixa de ser a fonte da verdade e passa a ser o fallback:
// é o que aparece no primeiro load offline, quando ainda não há nem resposta da
// API nem cache local. Assim que a Central responde, a lista publicada vence.
//
// Cada item publicado traz `key` = categoria e `value` = JSON com
// { name, url, desc, desc_es } — o par PT/ES viaja junto do link que descreve,
// em vez de num mapa paralelo (LINK_DESC_ES) que precisa ser editado à parte.
function applyContentItems(items) {
    if (!Array.isArray(items) || !items.length) return false;

    const rebuilt = {};

    for (const item of items) {
        const cat = item.key;
        if (!cat) continue;

        let parsed;
        try {
            parsed = JSON.parse(item.value || '{}');
        } catch (e) {
            continue; // Item malformado não derruba os outros.
        }
        if (!parsed.name || !parsed.url) continue;

        if (!rebuilt[cat]) {
            rebuilt[cat] = { label: LINKS_DB[cat]?.label || cat, links: [] };
        }
        rebuilt[cat].links.push({
            name: parsed.name,
            url: parsed.url,
            desc: parsed.desc || '',
            descEs: parsed.desc_es || ''
        });
    }

    if (!Object.keys(rebuilt).length) return false;

    // Substitui o conteúdo preservando a identidade do objeto: o módulo inteiro
    // já capturou a referência de LINKS_DB, então reatribuir a const quebraria.
    for (const key of Object.keys(LINKS_DB)) delete LINKS_DB[key];
    Object.assign(LINKS_DB, rebuilt);
    return true;
}

async function hydrateLinksFromContentCentral(onReady) {
    // Cache primeiro: a lista renderiza na hora com o que já veio da última vez,
    // sem esperar a rede — e a resposta fresca corrige depois, se mudou.
    const cached = DataService.getCachedContent('links');
    if (applyContentItems(cached)) onReady?.();

    try {
        const items = await DataService.fetchContentModule('links');
        if (applyContentItems(items)) onReady?.();
    } catch (e) {
        console.warn('Central de Conteúdo indisponível; usando links embutidos.', e);
    }
}

const CATEGORY_ICONS = {
    tasks: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    lm: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    qa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    suporte: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`,
    ads: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    analytics: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    shopping: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    tech: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    hr: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    history: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`
};

// --- DESIGN SYSTEM (tokens unificados — antes eram COLORS + CAT_THEMES
// desconectados; mesmas cores de sempre, só num lugar só) ---
const COLORS = {
    bgApp: "#F8F9FA",
    bgSidebar: "#FFFFFF",
    bgSurface: "#FFFFFF",
    textPrimary: "#202124",
    textSecondary: "#5F6368",
    borderSubtle: "rgba(0,0,0,0.06)"
};

const CAT_THEMES = {
    tasks:   { color: "#0097A7", bg: "#E0F7FA" }, // Cyan
    ads:     { color: "#1967D2", bg: "#E8F0FE" }, // Google Blue
    analytics:{ color: "#E37400", bg: "#FEF7E0" }, // Orange
    shopping:{ color: "#188038", bg: "#E6F4EA" }, // Green
    tech:    { color: "#9334E6", bg: "#F3E8FD" }, // Purple
    hr:      { color: "#C5221F", bg: "#FCE8E6" }, // Red
    lm:      { color: "#5F6368", bg: "#F1F3F4" }, // Slate
    qa:      { color: "#F09D00", bg: "#FFF3E0" }, // Amber
    suporte: { color: "#0B57D0", bg: "#D3E3FD" }, // Light Blue
    history: { color: "#5F6368", bg: "#FFFFFF" }  // Default
};

// --- FOLHA DE ESTILOS DEDICADA ---
// Substitui os cssText espalhados (cada elemento montado com string CSS
// crua, hover trocado na mão via onmouseenter/onmouseleave) por classes
// reais — mesmo padrão já usado em broadcast/personal-library/call-script.
function injectStyles() {
    if (document.getElementById('cw-links-styles')) return;
    const style = document.createElement("style");
    style.id = 'cw-links-styles';
    style.textContent = `
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 80px; flex-shrink: 0; background: ${COLORS.bgSidebar};
            border-right: 1px solid ${COLORS.borderSubtle};
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 56px; height: 56px; border-radius: 16px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${COLORS.textSecondary};
            transition: background 0.2s var(--cw-ease-standard), color 0.2s ease;
            position: relative; background: transparent;
        }
        .cw-links-nav-btn:hover:not(.active) { background: #F1F3F4; }
        .cw-links-nav-btn:hover:not(.active) .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.active { background: var(--cat-bg); color: var(--cat-color); }
        .cw-links-nav-btn.active .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.history-open { background: #3C4043; color: #FFFFFF; }
        .cw-links-nav-icon { width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s; }
        .cw-links-nav-label { font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px; }
        .cw-links-nav-sep { width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0; }

        /* --- CONTEÚDO --- */
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: ${COLORS.bgApp}; position: relative; z-index: 1; }

        .cw-links-search-bar { padding: 16px 24px; flex-shrink: 0; }
        .cw-links-search-wrap {
            position: relative; width: 100%; height: 44px;
            border-radius: 12px; border: 1px solid transparent;
            background: #FFFFFF; transition: all 0.2s;
            display: flex; align-items: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04); box-sizing: border-box;
        }
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: #1a73e8; }
        .cw-links-search-icon { margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${COLORS.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-scroll { flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth; }
        .cw-links-search-results-label { font-size: 12px; font-weight: 700; color: #5f6368; margin: 20px 0 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .cw-links-empty { text-align: center; padding: 60px; color: #999; font-size: 13px; }

        .cw-links-cat-header {
            display: flex; align-items: center; gap: 8px;
            font-size: 13px; font-weight: 800; color: var(--cat-color);
            text-transform: uppercase; letter-spacing: 0.5px;
            margin: 32px 0 12px 0; padding-top: 10px;
        }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); }
        .cw-links-cat-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .cw-links-spacer { height: 80px; }

        /* --- CARD --- */
        .cw-links-card {
            display: flex; align-items: center; gap: 16px;
            padding: 12px 16px;
            background: #FFFFFF;
            border: 1px solid transparent;
            border-left: 4px solid transparent;
            border-radius: 16px;
            cursor: pointer;
            text-decoration: none; color: inherit;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: transform 0.2s var(--cw-ease-elastic), box-shadow 0.2s var(--cw-ease-elastic), border-color 0.2s ease;
            position: relative; overflow: hidden; box-sizing: border-box;
        }
        .cw-links-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border-color: rgba(0,0,0,0.05);
            border-left-color: var(--cat-color);
        }
        .cw-links-card:hover .cw-links-copy-btn { opacity: 1; background: #F1F3F4; }
        .cw-links-card:focus-visible { outline: 2px solid var(--cat-color); outline-offset: 2px; }

        .cw-links-icon-box {
            width: 40px; height: 40px; border-radius: 12px;
            background: var(--cat-bg); color: var(--cat-color);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .cw-links-icon-box svg { width: 22px; height: 22px; }

        .cw-links-card-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
        .cw-links-card-title { font-size: 14px; font-weight: 600; color: ${COLORS.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-card-desc { font-size: 12px; color: ${COLORS.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .cw-links-copy-btn {
            width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent;
            display: flex; align-items: center; justify-content: center;
            color: #9AA0A6; transition: all 0.2s; opacity: 0; cursor: pointer; flex-shrink: 0;
        }

        /* --- OVERLAY DE HISTÓRICO --- */
        .cw-links-history-overlay {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255,255,255,0.98); z-index: 20;
            display: flex; flex-direction: column;
            transform: translateY(100%); transition: transform 0.3s var(--cw-ease-elastic);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-links-history-head { padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4; }
        .cw-links-history-title { font-size: 16px; font-weight: 700; color: #202124; }
        .cw-links-history-close { background: none; border: none; cursor: pointer; color: #5f6368; padding: 4px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
        .cw-links-history-close:hover { background: #F1F3F4; }
        .cw-links-history-list { flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA; }
        .cw-links-history-empty { text-align: center; color: #999; margin-top: 60px; font-size: 13px; }

        @media (prefers-reduced-motion: reduce) {
            .cw-links-card, .cw-links-nav-btn, .cw-links-nav-icon, .cw-links-history-overlay {
                transition: opacity 0.15s ease, background 0.15s ease !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- LOGICA DE HISTÓRICO ---
const HISTORY_KEY = 'cw_link_history_v4';
const HISTORY_MAX = 10; // Era 3 - pouco pra quem alterna entre várias ferramentas no mesmo turno

function addToHistory(linkObj, catKey) {
    try {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        history = history.filter(h => h.url !== linkObj.url);
        history.unshift({ ...linkObj, _originalCat: catKey });
        history = history.slice(0, HISTORY_MAX);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) { console.warn("Erro ao salvar histórico", e); }
}

function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch (e) { return []; }
}

export function initLinksAssistant() {
  const CURRENT_VERSION = "v4.6";
  let searchTerm = "";
  let visible = false;
  let activeCategoryKey = null;
  let isHistoryOpen = false; // Controle de estado do histórico

  injectStyles();

  // --- POPUP ---
  const popup = document.createElement("div");
  popup.id = "links-popup";
  popup.classList.add("cw-module-window");
  Object.assign(popup.style, stylePopup, {
      right: "100px", width: "600px", height: "650px",
      background: COLORS.bgApp, overflow: "hidden"
  });

  const animRefs = { popup, googleLine: null };

  // 1. HEADER
  const header = createStandardHeader(
    popup, lt('headerTitle'), CURRENT_VERSION,
    lt('headerDesc'),
    animRefs, () => toggleVisibility()
  );
  popup.appendChild(header);
  const headerTitleEl = header.querySelector('span');

  // --- LAYOUT PRINCIPAL ---
  const mainLayout = document.createElement("div");
  mainLayout.className = "cw-links-layout";
  popup.appendChild(mainLayout);

  // 2. SIDEBAR
  const sidebar = document.createElement("div");
  sidebar.className = "cw-links-sidebar";
  mainLayout.appendChild(sidebar);

  // 3. CONTEÚDO
  const contentWrapper = document.createElement("div");
  contentWrapper.className = "cw-links-content";
  mainLayout.appendChild(contentWrapper);

  // 3.1. Barra de Busca
  const searchBar = document.createElement("div");
  searchBar.className = "cw-links-search-bar";

  const searchInputWrapper = document.createElement("div");
  searchInputWrapper.className = "cw-links-search-wrap";

  const searchIcon = document.createElement("div");
  searchIcon.className = "cw-links-search-icon";
  searchIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

  const searchInput = document.createElement("input");
  searchInput.className = "cw-links-search-input";
  searchInput.type = "text";
  searchInput.placeholder = lt('searchPlaceholder');

  searchInputWrapper.appendChild(searchIcon);
  searchInputWrapper.appendChild(searchInput);
  searchBar.appendChild(searchInputWrapper);
  contentWrapper.appendChild(searchBar);

  // 3.2. Scroll Content
  const scrollContent = document.createElement("div");
  scrollContent.className = "cw-links-scroll";
  contentWrapper.appendChild(scrollContent);

  // --- OVERLAY DE HISTÓRICO ---
  let historyOverlay = null;

  function createHistoryOverlay() {
      if (historyOverlay) return;

      historyOverlay = document.createElement("div");
      historyOverlay.className = "cw-links-history-overlay";

      const hHead = document.createElement("div");
      hHead.className = "cw-links-history-head";
      hHead.innerHTML = `<span class="cw-links-history-title js-links-recent">🕒 ${lt('recent')}</span>`;

      const closeBtn = document.createElement("button");
      closeBtn.className = "cw-links-history-close";
      closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

      // Fecha ao clicar no X
      closeBtn.onclick = () => closeHistory();

      hHead.appendChild(closeBtn);
      historyOverlay.appendChild(hHead);

      const hList = document.createElement("div");
      hList.id = "cw-history-list";
      hList.className = "cw-links-history-list";
      historyOverlay.appendChild(hList);

      contentWrapper.appendChild(historyOverlay);
  }

  // Fecha o histórico e sincroniza o estado (usado pelo X, clique fora e Esc)
  function closeHistory() {
      if (!isHistoryOpen) return;
      isHistoryOpen = false;
      hideHistoryOverlay();
      updateSidebarVisuals();
  }

  function showHistoryOverlay() {
      if (!historyOverlay) createHistoryOverlay();
      const list = historyOverlay.querySelector("#cw-history-list");
      list.innerHTML = "";
      const history = getHistory();

      if (history.length === 0) {
          list.appendChild(createEmptyState({
              icon: CATEGORY_ICONS.history,
              title: lt('nothingHereYet'),
              subtitle: lt('nothingHereSub'),
          }));
      } else {
          history.forEach(link => {
              const card = createLinkCard(link, CATEGORY_ICONS[link._originalCat], true, link._originalCat);
              list.appendChild(card);
          });
      }
      requestAnimationFrame(() => historyOverlay.style.transform = "translateY(0)");
  }

  function hideHistoryOverlay() {
      if (historyOverlay) historyOverlay.style.transform = "translateY(100%)";
  }

  // Fecha o histórico clicando fora dele (mesmo padrão de outros
  // overlays/drawers do app, ex: a gaveta de rascunhos do notes/) ou com Esc.
  document.addEventListener('mousedown', (e) => {
      if (!isHistoryOpen || !historyOverlay) return;
      if (!historyOverlay.contains(e.target) && !sidebar.contains(e.target)) {
          closeHistory();
      }
  });
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isHistoryOpen) closeHistory();
  });

  // --- RENDERIZAÇÃO ---

  function renderSidebar() {
      sidebar.innerHTML = "";

      // Botão "Recentes" (Com Toggle)
      const histBtn = createNavBtn('history', lt('recent'), CATEGORY_ICONS.history);
      histBtn.id = "cw-sidebar-btn-history";

      histBtn.onclick = () => {
          SoundManager.playClick();
          isHistoryOpen = !isHistoryOpen; // Inverte Estado

          if (isHistoryOpen) {
              showHistoryOverlay();
          } else {
              hideHistoryOverlay();
          }
          updateSidebarVisuals();
      };

      sidebar.appendChild(histBtn);

      // Separador
      const div = document.createElement('div');
      div.className = "cw-links-nav-sep";
      sidebar.appendChild(div);

      // Botões de Categoria
      Object.keys(LINKS_DB).forEach(key => {
          const btn = createNavBtn(key, catLabel(key), CATEGORY_ICONS[key]);
          btn.id = `cw-sidebar-btn-${key}`;

          btn.onclick = () => {
              SoundManager.playClick();
              // Se clicar numa categoria, fecha o histórico se estiver aberto
              if (isHistoryOpen) closeHistory();
              scrollToSection(key);
          };
          sidebar.appendChild(btn);
      });
  }

  function createNavBtn(key, label, iconSvg) {
      const btn = document.createElement("div");
      btn.className = "cw-links-nav-btn";
      btn.title = label;
      btn.dataset.key = key;

      const theme = CAT_THEMES[key];
      if (theme) {
          btn.style.setProperty('--cat-color', theme.color);
          btn.style.setProperty('--cat-bg', theme.bg);
      }

      const iconDiv = document.createElement("div");
      iconDiv.className = "cw-links-nav-icon";
      iconDiv.innerHTML = iconSvg || CATEGORY_ICONS.tasks;

      const labelDiv = document.createElement("div");
      labelDiv.className = "cw-links-nav-label";
      labelDiv.textContent = label;

      btn.appendChild(iconDiv);
      btn.appendChild(labelDiv);

      return btn;
  }

  function scrollToSection(key) {
      const target = document.getElementById(`cat-anchor-${key}`);
      if(target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          activeCategoryKey = key;
          updateSidebarVisuals();
      }
  }

  function updateSidebarVisuals() {
      // 1. Atualiza Categorias
      Object.keys(LINKS_DB).forEach(key => {
          const btn = sidebar.querySelector(`#cw-sidebar-btn-${key}`);
          if(!btn) return;
          btn.classList.toggle('active', activeCategoryKey === key && !isHistoryOpen);
      });

      // 2. Atualiza Botão de Histórico
      const histBtn = sidebar.querySelector(`#cw-sidebar-btn-history`);
      if (histBtn) histBtn.classList.toggle('history-open', isHistoryOpen);
  }

  function renderContent() {
      scrollContent.innerHTML = "";

      // MODO BUSCA
      if (searchTerm.trim() !== "") {
          let results = [];
          Object.entries(LINKS_DB).forEach(([key, cat]) => {
              // Busca sobre a descrição JÁ traduzida, pra digitar
              // "resolución" achar o link no idioma que está na tela.
              const filtered = cat.links.filter(l =>
                  l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  linkDesc(l).toLowerCase().includes(searchTerm.toLowerCase())
              );
              results.push(...filtered.map(l => ({...l, _cat: key})));
          });

          if(results.length === 0) {
              scrollContent.appendChild(createEmptyState({
                  icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
                  title: lt('nothingFound'),
                  subtitle: lt('noLinkMatches')(searchTerm.trim()),
              }));
              return;
          }

          const searchHeader = document.createElement("div");
          searchHeader.className = "cw-links-search-results-label";
          searchHeader.textContent = lt('searchResults');
          scrollContent.appendChild(searchHeader);

          results.forEach(link => {
              const card = createLinkCard(link, CATEGORY_ICONS[link._cat], false, link._cat);
              scrollContent.appendChild(card);
          });
          return;
      }

      // MODO LISTA (Renderiza todas as categorias)
      Object.entries(LINKS_DB).forEach(([key, cat]) => {
          const theme = CAT_THEMES[key];
          const catSection = document.createElement("div");

          const catHeader = document.createElement("div");
          catHeader.id = `cat-anchor-${key}`;
          catHeader.className = "cw-links-cat-header";
          catHeader.style.setProperty('--cat-color', theme.color);
          catHeader.innerHTML = `<div class="cw-links-cat-dot"></div>${catLabel(key)}`;

          catSection.appendChild(catHeader);

          const grid = document.createElement("div");
          grid.className = "cw-links-cat-grid";

          cat.links.forEach(link => {
              const card = createLinkCard(link, CATEGORY_ICONS[key], false, key);
              grid.appendChild(card);
          });

          catSection.appendChild(grid);
          scrollContent.appendChild(catSection);
      });

      const spacer = document.createElement("div");
      spacer.className = "cw-links-spacer";
      scrollContent.appendChild(spacer);
  }

  function createLinkCard(link, iconSvg, isHistory, catKey) {
      // <a> real em vez de <div onclick> + window.open(): preserva Ctrl/Cmd-click
      // e clique do meio para abrir em nova aba, e fica focável/ativável por
      // teclado (Enter) de graça, sem precisar de tabindex nem handler próprio.
      const card = document.createElement("a");
      card.className = "cw-links-card";
      card.href = link.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      const theme = CAT_THEMES[catKey] || CAT_THEMES.history; // Pega o tema da categoria
      card.style.setProperty('--cat-color', theme.color);
      card.style.setProperty('--cat-bg', theme.bg);

      // Icon Box Colorido
      const iconBox = document.createElement("div");
      iconBox.className = "cw-links-icon-box";
      iconBox.innerHTML = iconSvg || CATEGORY_ICONS.tasks;

      const meta = document.createElement("div");
      meta.className = "cw-links-card-meta";

      const title = document.createElement("div");
      title.className = "cw-links-card-title";
      title.textContent = link.name;

      const desc = document.createElement("div");
      desc.className = "cw-links-card-desc";
      desc.textContent = linkDesc(link);

      meta.appendChild(title);
      meta.appendChild(desc);

      // Botão de Copiar (Só aparece no hover)
      const copyBtn = document.createElement("div");
      copyBtn.className = "cw-links-copy-btn";
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      copyBtn.title = lt('copyUrl');

      card.onclick = () => {
          if(!isHistory && catKey) addToHistory(link, catKey);
          // A navegação em si já acontece nativamente via href/target do <a>.
      };

      copyBtn.onclick = (e) => {
          // preventDefault, não só stopPropagation: sem isso o clique no botão
          // de copiar, por estar dentro do <a>, ainda dispararia a navegação.
          e.preventDefault();
          e.stopPropagation();
          navigator.clipboard.writeText(link.url).then(() => {
              SoundManager.playClick();
              if(!isHistory && catKey) addToHistory(link, catKey);
              showToast(lt('linkCopiedToast'));
          }).catch(() => {
              SoundManager.playError();
              showToast(lt('copyFailedToast'), { error: true });
          });
      };

      card.appendChild(iconBox);
      card.appendChild(meta);
      card.appendChild(copyBtn);

      return card;
  }

  // --- LISTENERS ---
  searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderContent();
  });

  // --- INIT ---
  function toggleVisibility() {
      visible = !isModuleOpen(popup);
      if (visible) lockBodyScroll(); else unlockBodyScroll();
      toggleGenieAnimation(visible, popup, 'cw-btn-links');
  }

  document.body.appendChild(popup);
  renderSidebar();
  renderContent();

  // Busca a lista publicada na Central de Conteúdo e repinta quando chegar.
  // Não bloqueia a abertura: a tela já subiu com o fallback embutido, então o
  // pior caso (API fora do ar) é continuar exatamente como era antes.
  hydrateLinksFromContentCentral(() => {
      renderSidebar();
      renderContent();
      updateSidebarVisuals();
  });

  // Retraduz header/busca e refaz sidebar+conteúdo, que já são montados do
  // zero a cada render (inclusive o overlay de histórico, se estiver aberto).
  onLanguageChange(() => {
      if (headerTitleEl) headerTitleEl.textContent = lt('headerTitle');
      const helpTitleEl = popup.querySelector('.cw-help-title');
      if (helpTitleEl) helpTitleEl.textContent = lt('headerTitle');
      const helpDescEl = popup.querySelector('.cw-help-description');
      if (helpDescEl) helpDescEl.textContent = lt('headerDesc');
      searchInput.placeholder = lt('searchPlaceholder');
      renderSidebar();
      renderContent();
      updateSidebarVisuals();
      if (isHistoryOpen) showHistoryOverlay();
  });

  return toggleVisibility;
}
