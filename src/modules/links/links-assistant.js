// src/modules/links/links-assistant.js

import { stylePopup, showToast } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation, isModuleOpen } from '../shared/animations.js';
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll, createEmptyState } from "../shared/dom-utils.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";
import { DataService } from "../shared/data-service.js";
import { UserPrefsService } from "../shared/user-prefs-service.js";
import {
    normalizeLink, normalizeCustomCategories, categoryLabel, categoryTheme, categoryIcon,
    groupByCategory, orderedCategoryKeys, resolveHighlights, toggleFavorite, pushRecent,
    reconcileIds, reconcileRecents, migrateLegacyHistory, matchesTerm, pickText, linkId,
    formatDay, formatDayTime, formatWhen, MAX_FAVORITES,
} from "./links-model.js";

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

const LINK_DESC_EN = {
    'Ponto Eletrônico': 'Time Clock',
    'Ferramenta de ajuda': 'Help tool',
    'Intranet Google': 'Google Intranet',
    'Relatório Follow-ups': 'Follow-ups report',
    'Dashboard WFM': 'WFM Dashboard',
    'Tech Solutions SAO': 'Tech Solutions SAO',
    'Form Gravação': 'Recording Form',
    'Form Escalação': 'Escalation Form',
    'Instruções Split': 'Split instructions',
    'Single Page App': 'Single Page App',
    'Procedimento Padrão': 'Standard Procedure',
    'Validação Código': 'Code validation',
    'Conversão Chamada': 'Call conversion',
    'Validação WCC': 'WCC validation',
    'ECW4': 'ECW4',
    'Monitoramento EC': 'EC monitoring',
    'Resolução problemas': 'Troubleshooting',
    'Implementação RMKT': 'RMKT implementation',
    'Pontuação Leads': 'Lead scoring',
    'Instalação Container': 'Container installation',
    'Instalação Config.': 'Config. installation',
    'Validação GA4': 'GA4 validation',
    'Guia Dev': 'Dev guide',
    'Resolução Problemas': 'Troubleshooting',
    'Domínio Cruzado': 'Cross-domain',
    'Lista Oficial': 'Official list',
    'Criador URLs': 'URL builder',
    'Setup Inicial': 'Initial setup',
    'Otimização Feed': 'Feed optimization',
    'Ferramenta Interna': 'Internal tool',
    'Avaliações': 'Reviews',
    'Feeds Offline': 'Offline feeds',
    'Help Center': 'Help Center',
    'Guias CMS': 'CMS guides',
    'Soluções Iframes': 'Iframe solutions',
    'Ghost Ads': 'Ghost Ads',
    'Ghost Analytics': 'Ghost Analytics',
    'Ghost GTM': 'Ghost GTM',
    'Ferramenta': 'Tool',
    'Ghost MC': 'Ghost MC',
    'Playground JS': 'JS Playground',
    'Testador Regex': 'Regex tester',
    'Doc. CSP': 'CSP docs',
    'Guia CoMo': 'CoMo guide',
    'Debug CoMo': 'CoMo debug',
    'Portal Colaborador': 'Employee Portal',
    'Apps e Sistemas': 'Apps and Systems',
    'Folha Pagamento': 'Payroll',
    'Reportar problemas': 'Report problems',
    'Registro chamadas': 'Call log',
    'Erros de sistema': 'System errors',
    'BAU/Descarte/Monitoria': 'BAU/Discard/Monitoring',
    'Feedback positivo': 'Positive feedback',
    'Casos difíceis': 'Difficult cases',
    'Chat/Email Ads': 'Chat/Email Ads',
    'Chat/Email Shopping': 'Chat/Email Shopping',
    'Perfil da Empresa': 'Business Profile',
    'Console API': 'API Console',
    'Lista de números': 'Number list',
    'Cursos': 'Courses',
};


const LINKS_DICT = {
    pt: {
        headerTitle: "Central de Links",
        headerDesc: "Navegue pelas categorias ou use a busca.",
        searchPlaceholder: "Buscar ferramenta ou SOP...",
        home: "Início",
        featured: "Em destaque",
        tabFavorites: "Favoritos",
        tabRecent: "Recentes",
        tabEnded: "Saíram do destaque",
        until: (d) => `até ${d}`,
        endedOn: (d) => `saiu em ${d}`,
        liveNow: "Em destaque agora",
        liveUntil: (d) => `Em destaque até ${d}`,
        open: "Abrir",
        openLink: "Abrir link",
        copyUrl: "Copiar URL",
        copied: "Copiado",
        favorite: "Favoritar",
        favorited: "Favorito",
        favoriteAdd: "Adicionar aos favoritos",
        favoriteRemove: "Remover dos favoritos",
        aboutLabel: "O que é",
        whenLabel: "Quando usar",
        emptyFavTitle: "Nenhum favorito ainda",
        emptyFavSub: "Clique na estrela de um link para fixá-lo aqui.",
        emptyRecentTitle: "Nada por aqui ainda",
        emptyRecentSub: "Os links que você abrir aparecem aqui pra acesso rápido depois.",
        emptyEndedTitle: "Nenhum destaque encerrado",
        emptyEndedSub: "Os links que saírem do destaque ficam aqui por 30 dias.",
        browseAll: "Ver todos os links",
        favoritesFull: (n) => `Você chegou a ${n} favoritos. Remova um para adicionar outro.`,
        resultsSummary: (n, c) => `${n} ${n === 1 ? 'resultado' : 'resultados'} em ${c} ${c === 1 ? 'categoria' : 'categorias'}`,
        nothingFound: "Nada encontrado",
        noLinkMatches: (term) => `Nenhum link bate com "${term}".`,
        linkCopiedToast: "Link copiado!",
        copyFailedToast: "Não foi possível copiar o link.",
        favAddedToast: "Adicionado aos favoritos",
        favRemovedToast: "Removido dos favoritos",
    },
    es: {
        headerTitle: "Central de Enlaces",
        headerDesc: "Navega por las categorías o usa la búsqueda.",
        searchPlaceholder: "Buscar herramienta o SOP...",
        home: "Inicio",
        featured: "Destacados",
        tabFavorites: "Favoritos",
        tabRecent: "Recientes",
        tabEnded: "Salieron de destacados",
        until: (d) => `hasta ${d}`,
        endedOn: (d) => `salió el ${d}`,
        liveNow: "Destacado ahora",
        liveUntil: (d) => `Destacado hasta ${d}`,
        open: "Abrir",
        openLink: "Abrir enlace",
        copyUrl: "Copiar URL",
        copied: "Copiado",
        favorite: "Añadir a favoritos",
        favorited: "Favorito",
        favoriteAdd: "Añadir a favoritos",
        favoriteRemove: "Quitar de favoritos",
        aboutLabel: "Qué es",
        whenLabel: "Cuándo usar",
        emptyFavTitle: "Todavía no hay favoritos",
        emptyFavSub: "Haz clic en la estrella de un enlace para fijarlo aquí.",
        emptyRecentTitle: "Todavía no hay nada aquí",
        emptyRecentSub: "Los enlaces que abras aparecen aquí para acceso rápido después.",
        emptyEndedTitle: "Ningún destacado finalizado",
        emptyEndedSub: "Los enlaces que dejen de estar destacados quedan aquí por 30 días.",
        browseAll: "Ver todos los enlaces",
        favoritesFull: (n) => `Llegaste a ${n} favoritos. Quita uno para añadir otro.`,
        resultsSummary: (n, c) => `${n} ${n === 1 ? 'resultado' : 'resultados'} en ${c} ${c === 1 ? 'categoría' : 'categorías'}`,
        nothingFound: "No se encontró nada",
        noLinkMatches: (term) => `Ningún enlace coincide con "${term}".`,
        linkCopiedToast: "¡Enlace copiado!",
        copyFailedToast: "No se pudo copiar el enlace.",
        favAddedToast: "Añadido a favoritos",
        favRemovedToast: "Quitado de favoritos",
    },
    en: {
        headerTitle: "Links Central",
        headerDesc: "Browse the categories or use the search.",
        searchPlaceholder: "Search for a tool or SOP...",
        home: "Home",
        featured: "Featured",
        tabFavorites: "Favorites",
        tabRecent: "Recent",
        tabEnded: "No longer featured",
        until: (d) => `until ${d}`,
        endedOn: (d) => `ended ${d}`,
        liveNow: "Featured now",
        liveUntil: (d) => `Featured until ${d}`,
        open: "Open",
        openLink: "Open link",
        copyUrl: "Copy URL",
        copied: "Copied",
        favorite: "Favorite",
        favorited: "Favorited",
        favoriteAdd: "Add to favorites",
        favoriteRemove: "Remove from favorites",
        aboutLabel: "What it is",
        whenLabel: "When to use",
        emptyFavTitle: "No favorites yet",
        emptyFavSub: "Click the star on a link to pin it here.",
        emptyRecentTitle: "Nothing here yet",
        emptyRecentSub: "The links you open show up here for quick access later.",
        emptyEndedTitle: "No past highlights",
        emptyEndedSub: "Links that stop being featured stay here for 30 days.",
        browseAll: "Browse all links",
        favoritesFull: (n) => `You reached ${n} favorites. Remove one to add another.`,
        resultsSummary: (n, c) => `${n} ${n === 1 ? 'result' : 'results'} in ${c} ${c === 1 ? 'category' : 'categories'}`,
        nothingFound: "Nothing found",
        noLinkMatches: (term) => `No link matches "${term}".`,
        linkCopiedToast: "Link copied!",
        copyFailedToast: "Could not copy the link.",
        favAddedToast: "Added to favorites",
        favRemovedToast: "Removed from favorites",
    },
};
function lt(key) {
    const lang = getLanguage();
    return LINKS_DICT[lang]?.[key] ?? LINKS_DICT.pt[key];
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
  },
  // Formulários de feedback. Categoria do sistema: o servidor a reconhece mesmo
  // antes de existir qualquer link nela, e é aqui que o próximo formulário de
  // feedback deve morar.
  feedback: {
    label: "Feedback",
    links: [
      { name: "Elogios", url: "https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform", desc: "Feedback positivo" }
    ]
  }
};


// --- CATÁLOGO ---
//
// Três fontes, na ordem de confiança: o que a Central publicou (links, categorias
// criadas pela tela e destaques), o cache local da última resposta, e o LINKS_DB
// embutido acima. O embutido só desenha a tela no primeiro load offline — assim
// que a Central responde, a lista publicada vence.
//
// O catálogo é uma variável de módulo reatribuída, e não um objeto mutado no
// lugar: com a identidade trocada de uma vez, a tela nunca vê metade do catálogo
// antigo e metade do novo.
let catalog = buildCatalog(null, null, null);

function fallbackLinks() {
    const lista = [];
    Object.entries(LINKS_DB).forEach(([cat, grupo]) => {
        grupo.links.forEach((l) => {
            lista.push(normalizeLink({
                key: cat,
                value: JSON.stringify({
                    name: l.name, url: l.url, desc: l.desc || '',
                    desc_es: LINK_DESC_ES[l.desc] || '', desc_en: LINK_DESC_EN[l.desc] || '',
                }),
            }));
        });
    });
    return lista;
}

// `linkItems`/`categoryItems`/`highlightItems` são o que a Central devolveu, ou
// null/[] quando ainda não há resposta nem cache.
function buildCatalog(linkItems, categoryItems, highlightItems) {
    const doCentral = (Array.isArray(linkItems) ? linkItems : [])
        .map(normalizeLink)
        // Item malformado não derruba os outros.
        .filter((l) => l.name && l.url);

    const fromCentral = doCentral.length > 0;
    const links = fromCentral ? doCentral : fallbackLinks();
    const custom = normalizeCustomCategories(categoryItems);
    const lang = getLanguage();

    return {
        links,
        custom,
        fromCentral,
        byId: new Map(links.map((l) => [linkId(l), l])),
        highlights: resolveHighlights(highlightItems, links, lang),
        // Guardado para refazer os destaques quando o idioma muda, sem nova ida
        // à rede.
        rawHighlights: highlightItems,
    };
}

async function hydrateFromContentCentral(onReady) {
    const ler = (modulo) => DataService.getCachedContent(modulo);

    // Cache primeiro: a lista renderiza na hora com o que veio da última vez, e
    // a resposta fresca corrige depois, se mudou.
    const doCache = buildCatalog(ler('links'), ler('link_categories'), ler('link_highlights'));
    if (doCache.fromCentral) { catalog = doCache; onReady?.(); }

    try {
        // allSettled: um módulo fora do ar (backend ainda sem os módulos novos,
        // por exemplo) não pode derrubar os links, que são o que importa.
        const [l, c, h] = await Promise.allSettled([
            DataService.fetchContentModule('links'),
            DataService.fetchContentModule('link_categories'),
            DataService.fetchContentModule('link_highlights'),
        ]);
        const valor = (r) => (r.status === 'fulfilled' ? r.value : null);
        const fresco = buildCatalog(valor(l) ?? ler('links'), valor(c) ?? ler('link_categories'), valor(h) ?? ler('link_highlights'));
        if (fresco.fromCentral) { catalog = fresco; onReady?.(); }
    } catch (e) {
        console.warn('Central de Conteúdo indisponível; usando links embutidos.', e);
    }
}

// --- ÍCONES DA INTERFACE (os das categorias moram no modelo) ---
const UI_ICONS = {
    home: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
    starOutline: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`,
    open: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
};

// --- DESIGN SYSTEM ---
//
// Superfícies em vidro (Liquid Glass) e conteúdo em Material modesto — ver
// specs/ui-ux/design-system.md. Grade de 4/8px, pesos 400/500, texto de no
// mínimo 12px. As cores das CATEGORIAS vêm do modelo (paleta fechada), não
// daqui.
const COLORS = {
    textPrimary: "#202124",
    textSecondary: "#5F6368",
    blue: "#1A73E8",
    blueText: "#1967D2",
};

// --- FOLHA DE ESTILOS DEDICADA ---
function injectStyles() {
    if (document.getElementById('cw-links-styles')) return;
    const style = document.createElement("style");
    style.id = 'cw-links-styles';
    style.textContent = `
        .cw-links-layout { display: flex; height: calc(100% - 56px); width: 100%; position: relative; }

        /* --- SIDEBAR --- */
        .cw-links-sidebar {
            width: 88px; flex-shrink: 0; background: rgba(255,255,255,0.64);
            backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            border-right: 1px solid rgba(0,0,0,0.06);
            display: flex; flex-direction: column; align-items: center;
            padding: 16px 0; overflow-y: auto; gap: 8px;
            scrollbar-width: none; z-index: 2;
        }
        .cw-links-nav-btn {
            width: 64px; height: 56px; flex-shrink: 0; border-radius: 16px; border: none; padding: 0;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            cursor: pointer; color: ${COLORS.textSecondary};
            transition: background-color 0.2s var(--cw-ease-standard), color 0.2s ease;
            position: relative; background: transparent; font-family: inherit;
        }
        .cw-links-nav-btn:hover:not(.active) { background: rgba(60,64,67,0.08); }
        .cw-links-nav-btn:hover:not(.active) .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-btn.active { background: var(--cat-bg); color: var(--cat-color); }
        .cw-links-nav-btn.active .cw-links-nav-icon { transform: scale(1.1); }
        .cw-links-nav-icon { width: 24px; height: 24px; margin-bottom: 4px; transition: transform 0.2s; }
        .cw-links-nav-icon svg { width: 100%; height: 100%; }
        .cw-links-nav-label { font-size: 9px; font-weight: 500; opacity: 0.8; letter-spacing: 0.3px; max-width: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-links-nav-sep { width: 40px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0; flex-shrink: 0; }

        /* --- CONTEÚDO --- */
        .cw-links-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: transparent; position: relative; z-index: 1; min-width: 0; }

        .cw-links-search-bar { padding: 16px 24px 8px; flex-shrink: 0; }
        .cw-links-search-wrap {
            position: relative; width: 100%; height: 44px;
            border-radius: 12px; border: 1px solid transparent;
            background: #FFFFFF; transition: box-shadow 0.2s, border-color 0.2s;
            display: flex; align-items: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04); box-sizing: border-box;
        }
        .cw-links-search-wrap:focus-within { box-shadow: 0 4px 12px rgba(26,115,232,0.15); border-color: ${COLORS.blue}; }
        .cw-links-search-icon { margin-left: 16px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .cw-links-search-input {
            flex: 1; height: 100%; border: none; background: transparent;
            padding: 0 12px; font-size: 14px; color: ${COLORS.textPrimary};
            outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
        }

        .cw-links-body { flex: 1; display: flex; min-height: 0; }
        .cw-links-scroll { flex: 1; min-width: 0; overflow-y: auto; padding: 8px 16px 32px 24px; scrollbar-width: thin; }

        .cw-links-label { margin: 8px 0; font-size: 12px; line-height: 16px; font-weight: 500; color: ${COLORS.textSecondary}; }
        .cw-links-cathead { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${COLORS.textSecondary}; margin: 16px 0 4px; padding-left: 12px; }
        .cw-links-cathead:first-child { margin-top: 0; }
        .cw-links-cat-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cat-color); flex-shrink: 0; }

        /* --- ELEMENTOS COMUNS --- */
        .cw-links-ico { width: 32px; height: 32px; border-radius: 12px; background: var(--cat-bg); color: var(--cat-color); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cw-links-ico svg { width: 20px; height: 20px; }
        .cw-links-ico.lg { width: 40px; height: 40px; }
        .cw-links-ico.lg svg { width: 24px; height: 24px; }
        .cw-links-eyebrow { display: flex; align-items: center; gap: 8px; height: 20px; font-size: 12px; line-height: 16px; color: ${COLORS.textSecondary}; }
        .cw-links-eyebrow svg { width: 16px; height: 16px; color: var(--cat-color); flex-shrink: 0; }
        .cw-links-eyebrow b { font-weight: 500; color: ${COLORS.textPrimary}; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .cw-links-eyebrow .cw-links-eyebrow-end { margin-left: auto; white-space: nowrap; font-variant-numeric: tabular-nums; }

        /* --- DESTAQUES --- */
        .cw-links-hero {
            display: block; position: relative; border-radius: 20px; padding: 16px 20px;
            background: rgba(255,255,255,0.92); text-decoration: none; color: inherit; cursor: pointer;
            box-shadow: 0 8px 24px rgba(32,33,36,0.10), 0 1px 2px rgba(32,33,36,0.06);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-hero:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(32,33,36,0.14), 0 1px 2px rgba(32,33,36,0.06); }
        .cw-links-hero-title { margin: 8px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${COLORS.textPrimary}; }
        .cw-links-hero-blurb { margin: 0; font-size: 13px; line-height: 20px; color: ${COLORS.textSecondary}; }
        .cw-links-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
        .cw-links-grid2.single { grid-template-columns: 1fr; }
        .cw-links-mini {
            display: block; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.92);
            text-decoration: none; color: inherit; cursor: pointer; box-shadow: 0 1px 2px rgba(32,33,36,0.08);
            transition: transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1)), box-shadow 0.2s ease;
        }
        .cw-links-mini:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(32,33,36,0.12); }
        .cw-links-mini-title { margin: 8px 0 0; font-size: 14px; line-height: 20px; font-weight: 500; color: ${COLORS.textPrimary}; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cw-links-mini-until { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${COLORS.textSecondary}; font-variant-numeric: tabular-nums; }

        /* --- ABAS (controle segmentado) --- */
        .cw-links-seg { display: flex; background: rgba(60,64,67,0.08); border-radius: 999px; padding: 4px; margin: 24px 0 8px; }
        .cw-links-seg:first-child { margin-top: 0; }
        .cw-links-seg button {
            flex: 1; height: 32px; padding: 0; border: 0; background: transparent; border-radius: 999px;
            font-family: inherit; font-size: 13px; line-height: 20px; font-weight: 500; color: ${COLORS.textSecondary}; cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        }
        .cw-links-seg button:hover { color: ${COLORS.textPrimary}; }
        .cw-links-seg button[aria-selected="true"] { background: #fff; color: ${COLORS.blueText}; box-shadow: 0 1px 3px rgba(32,33,36,0.18); }

        /* --- LINHA --- */
        .cw-links-row {
            display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 8px 0 12px; border-radius: 16px; position: relative;
            transition: background-color 0.15s ease, box-shadow 0.2s ease, transform 0.2s var(--cw-ease-elastic, cubic-bezier(.34,1.56,.64,1));
        }
        .cw-links-row:hover, .cw-links-row:focus-within { background: rgba(255,255,255,0.94); box-shadow: 0 1px 3px rgba(32,33,36,0.12); transform: translateY(-1px); }
        .cw-links-row-link { flex: 1; min-width: 0; height: 100%; display: flex; align-items: center; gap: 16px; text-decoration: none; color: inherit; border-radius: 16px; }
        .cw-links-row-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .cw-links-row-name { font-size: 15px; line-height: 20px; font-weight: 500; color: ${COLORS.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-name mark { background: none; color: ${COLORS.blueText}; font-weight: 500; }
        .cw-links-row-desc { font-size: 12px; line-height: 16px; color: ${COLORS.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cw-links-row-meta { font-size: 12px; color: ${COLORS.textSecondary}; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .cw-links-row-acts { display: flex; align-items: center; }
        .cw-links-row-acts .hid { opacity: 0; transition: opacity 0.15s ease; }
        .cw-links-row:hover .hid, .cw-links-row:focus-within .hid { opacity: 1; }

        .cw-links-ib {
            width: 32px; height: 32px; padding: 0; border-radius: 50%; border: none; background: transparent; color: ${COLORS.textSecondary};
            display: inline-flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
            transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cw-links-ib:hover { background: rgba(60,64,67,0.10); }
        .cw-links-ib svg { width: 20px; height: 20px; }
        .cw-links-ib.star.on { color: #F9AB00; }
        .cw-links-ib.ok { color: #188038; background: #E6F4EA; }

        /* --- PAINEL DE PRÉVIA (recuado, vidro, sem borda) --- */
        .cw-links-pane {
            width: 288px; flex-shrink: 0; background: rgba(60,64,67,0.06);
            backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            padding: 24px; display: flex; flex-direction: column; overflow-y: auto;
        }
        .cw-links-pane.swap > * { animation: cw-links-fade 0.16s ease; }
        @keyframes cw-links-fade { from { opacity: 0; } to { opacity: 1; } }
        .cw-links-pane-title { margin: 16px 0 4px; font-size: 18px; line-height: 24px; font-weight: 500; color: ${COLORS.textPrimary}; }
        .cw-links-pane-sub { display: flex; align-items: center; gap: 8px; font-size: 12px; line-height: 16px; color: ${COLORS.textSecondary}; }
        .cw-links-pane-sub .cw-links-cat-dot { width: 8px; height: 8px; }
        .cw-links-pane-live { margin-top: 8px; font-size: 12px; line-height: 16px; color: ${COLORS.textSecondary}; font-variant-numeric: tabular-nums; }
        .cw-links-pane-block { margin-top: 16px; }
        .cw-links-pane-block h4 { margin: 0 0 4px; font-size: 12px; line-height: 16px; font-weight: 500; color: ${COLORS.textSecondary}; }
        .cw-links-pane-block p { margin: 0; font-size: 14px; line-height: 20px; color: ${COLORS.textPrimary}; }
        .cw-links-pane-plain { margin: 16px 0 0; font-size: 14px; line-height: 20px; color: ${COLORS.textSecondary}; }
        .cw-links-pane-actions { margin-top: auto; padding-top: 24px; display: flex; flex-direction: column; gap: 8px; }
        .cw-links-pane-actions .row2 { display: flex; gap: 8px; }
        .cw-links-btn {
            height: 40px; padding: 0 24px; border-radius: 999px; background: ${COLORS.blue}; color: #fff; font-size: 14px; font-weight: 500;
            display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: none; cursor: pointer; font-family: inherit; text-decoration: none;
            transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .cw-links-btn:hover { background: #1765CC; box-shadow: 0 2px 8px rgba(26,115,232,0.35); }
        .cw-links-btn svg { width: 18px; height: 18px; }
        .cw-links-ghost {
            flex: 1; height: 36px; padding: 0 8px; border-radius: 999px; border: 1px solid rgba(60,64,67,0.24); background: transparent;
            font-size: 13px; font-weight: 500; color: #3C4043; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            cursor: pointer; font-family: inherit; transition: background-color 0.15s ease;
        }
        .cw-links-ghost:hover { background: rgba(255,255,255,0.7); }
        .cw-links-ghost svg { width: 18px; height: 18px; }
        .cw-links-ghost.on svg { color: #F9AB00; }
        .cw-links-ghost.ok { color: #188038; background: #E6F4EA; border-color: #188038; }
        .cw-links-ghost.ok svg { color: #188038; }

        .cw-links-empty-action { margin: 8px auto 0; display: block; background: none; border: none; color: ${COLORS.blueText}; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; padding: 8px 16px; border-radius: 999px; }
        .cw-links-empty-action:hover { background: rgba(26,115,232,0.08); }

        .cw-links-popup :focus-visible { outline: 2px solid ${COLORS.blue}; outline-offset: 2px; }
        /* O campo de busca já mostra o foco no contêiner (:focus-within). */
        .cw-links-popup .cw-links-search-input:focus-visible { outline: none; }

        /* Janela estreita: o painel some e a lista ocupa tudo. A prévia só existe
           para quem tem espaço — o texto do destaque continua no herói. */
        @media (max-width: 1000px) { .cw-links-pane { display: none; } }

        @media (prefers-reduced-motion: reduce) {
            .cw-links-hero, .cw-links-mini, .cw-links-row, .cw-links-nav-btn, .cw-links-nav-icon {
                transition: background-color 0.15s ease, box-shadow 0.15s ease !important;
                transform: none !important;
            }
            .cw-links-pane.swap > * { animation: none; }
        }
    `;
    document.head.appendChild(style);
}

// --- PREFERÊNCIAS (favoritos e recentes seguem a pessoa, não o navegador) ---
const PREF_FAVORITES = 'links_fav';
const PREF_RECENTS = 'links_recent';
const LEGACY_HISTORY_KEY = 'cw_link_history_v4';
const RECENTS_SAVE_DELAY_MS = 4000;

function getLegacyHistory() {
    try { return JSON.parse(localStorage.getItem(LEGACY_HISTORY_KEY) || '[]'); } catch (e) { return []; }
}

// --- DOM helpers: texto vindo da Central NUNCA entra por innerHTML ---
function el(tag, className, text) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
}
function iconEl(svgMarkup, className) {
    // O SVG vem do modelo (conjunto fechado, escrito neste repositório), nunca de
    // quem publica o conteúdo.
    const s = el('span', className);
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = svgMarkup;
    return s;
}
function ibButton(svgMarkup, label, className) {
    const b = el('button', `cw-links-ib ${className || ''}`);
    b.type = 'button';
    b.title = label;
    b.setAttribute('aria-label', label);
    b.innerHTML = svgMarkup;
    return b;
}
function setTheme(node, catKey) {
    const t = categoryTheme(catKey, catalog.custom);
    node.style.setProperty('--cat-color', t.color);
    node.style.setProperty('--cat-bg', t.bg);
}
function vibrate() {
    if (navigator.vibrate) navigator.vibrate(10);
}

export function initLinksAssistant() {
    const CURRENT_VERSION = "v5.0";
    let searchTerm = "";
    let mode = 'home';          // 'home' | 'library'
    let homeTab = null;         // null = a primeira aba que tiver conteúdo
    let activeCategoryKey = null;
    let selectedId = null;      // o link que o painel de prévia mostra
    let favorites = [];
    let recents = [];
    let recentsTimer = null;
    let legacyChecked = false;

    injectStyles();

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "links-popup";
    popup.classList.add("cw-module-window", "cw-links-popup");
    Object.assign(popup.style, stylePopup, {
        right: "100px", width: "860px", height: "650px",
        // Não passa da tela: com a pílula à direita, 860px não cabem abaixo de
        // ~1050px de largura.
        maxWidth: "calc(100vw - 192px)",
        // Vidro: o fundo opaco que o módulo tinha anulava o blur do stylePopup.
        backgroundColor: "rgba(248,249,250,0.88)", overflow: "hidden",
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
    const mainLayout = el("div", "cw-links-layout");
    popup.appendChild(mainLayout);

    const sidebar = el("nav", "cw-links-sidebar");
    mainLayout.appendChild(sidebar);

    const contentWrapper = el("div", "cw-links-content");
    mainLayout.appendChild(contentWrapper);

    // Barra de busca
    const searchBar = el("div", "cw-links-search-bar");
    const searchInputWrapper = el("div", "cw-links-search-wrap");
    const searchIcon = iconEl(UI_ICONS.search, "cw-links-search-icon");
    const searchInput = el("input", "cw-links-search-input");
    searchInput.type = "text";
    searchInput.placeholder = lt('searchPlaceholder');
    searchInput.setAttribute('aria-label', lt('searchPlaceholder'));
    searchInputWrapper.append(searchIcon, searchInput);
    searchBar.appendChild(searchInputWrapper);
    contentWrapper.appendChild(searchBar);

    // Corpo: lista rolável + painel de prévia
    const body = el("div", "cw-links-body");
    const scrollContent = el("div", "cw-links-scroll");
    const paneHost = el("div");
    paneHost.style.display = "contents";
    body.append(scrollContent, paneHost);
    contentWrapper.appendChild(body);

    // --- PREFERÊNCIAS ---
    function loadPrefs() {
        const f = UserPrefsService.get(PREF_FAVORITES, []);
        const r = UserPrefsService.get(PREF_RECENTS, []);
        favorites = Array.isArray(f) ? f.filter((x) => typeof x === 'string') : [];
        recents = Array.isArray(r) ? r.filter((x) => x && typeof x.id === 'string') : [];
    }

    // Roda quando o catálogo é o da Central: converte ids guardados com o
    // fallback, tira o que não existe mais e traz o histórico antigo.
    function reconcilePrefs() {
        const antesF = JSON.stringify(favorites);
        favorites = reconcileIds(favorites, catalog.links, catalog.fromCentral);
        if (JSON.stringify(favorites) !== antesF) UserPrefsService.set(PREF_FAVORITES, favorites).catch(() => {});

        const antesR = JSON.stringify(recents);
        recents = reconcileRecents(recents, catalog.links, catalog.fromCentral);
        if (JSON.stringify(recents) !== antesR) UserPrefsService.set(PREF_RECENTS, recents).catch(() => {});

        if (!legacyChecked) {
            legacyChecked = true;
            const legado = getLegacyHistory();
            if (legado.length && !recents.length) {
                recents = migrateLegacyHistory(legado, catalog.links, Date.now());
                UserPrefsService.set(PREF_RECENTS, recents).catch(() => {});
            }
            // Já migrou (ou não havia o que migrar): a chave antiga não serve mais.
            if (legado.length) { try { localStorage.removeItem(LEGACY_HISTORY_KEY); } catch (e) { /* sem storage */ } }
        }
    }

    function saveFavorites() {
        UserPrefsService.set(PREF_FAVORITES, favorites).catch((e) => console.warn('Favoritos não sincronizaram', e));
    }

    // Um clique por link, e a cada um uma escrita na nuvem seria uma execução do
    // Apps Script. O estado local muda na hora; a nuvem recebe uma vez só, depois
    // de um tempo sem cliques — e na saída da página, para não perder o último.
    function flushRecents() {
        if (!recentsTimer) return;
        clearTimeout(recentsTimer);
        recentsTimer = null;
        UserPrefsService.set(PREF_RECENTS, recents).catch((e) => console.warn('Recentes não sincronizaram', e));
    }
    function recordOpen(id) {
        recents = pushRecent(recents, id, Date.now());
        if (recentsTimer) clearTimeout(recentsTimer);
        recentsTimer = setTimeout(flushRecents, RECENTS_SAVE_DELAY_MS);
    }
    window.addEventListener('pagehide', flushRecents);

    function isFavorite(id) { return favorites.includes(id); }

    function onToggleFavorite(id) {
        const r = toggleFavorite(favorites, id);
        if (r.full) {
            SoundManager.playError();
            showToast(lt('favoritesFull')(MAX_FAVORITES), { error: true });
            return;
        }
        favorites = r.list;
        saveFavorites();
        SoundManager.playClick();
        vibrate();
        showToast(lt(r.added ? 'favAddedToast' : 'favRemovedToast'));
        render();
    }

    function copyUrl(link, buttons) {
        navigator.clipboard.writeText(link.url).then(() => {
            SoundManager.playClick();
            vibrate();
            // Retorno no próprio controle: é onde está a mão.
            buttons.filter(Boolean).forEach(({ node, restore }) => {
                node.classList.add('ok');
                node.replaceChildren();
                node.innerHTML = UI_ICONS.check;
                if (restore.label) node.append(document.createTextNode(restore.label));
                setTimeout(() => {
                    if (!node.isConnected) return;
                    node.classList.remove('ok');
                    node.replaceChildren();
                    node.innerHTML = restore.icon;
                    if (restore.text) node.append(document.createTextNode(restore.text));
                }, 1500);
            });
            recordOpen(linkId(link));
            showToast(lt('linkCopiedToast'));
        }).catch(() => {
            SoundManager.playError();
            showToast(lt('copyFailedToast'), { error: true });
        });
    }

    // --- PAINEL DE PRÉVIA ---
    function highlightFor(id) {
        return catalog.highlights.active.find((h) => h.linkId === id) || null;
    }

    function buildPane(link) {
        const lang = getLanguage();
        const id = linkId(link);
        const pane = el('aside', 'cw-links-pane');
        pane.setAttribute('aria-live', 'polite');
        setTheme(pane, link.cat);

        pane.appendChild(iconEl(categoryIcon(link.cat, catalog.custom), 'cw-links-ico lg'));
        pane.appendChild(el('h3', 'cw-links-pane-title', link.name));

        const sub = el('div', 'cw-links-pane-sub');
        sub.appendChild(el('i', 'cw-links-cat-dot'));
        let host = '';
        try { host = new URL(link.url).host; } catch (e) { host = link.url; }
        sub.appendChild(el('span', '', `${categoryLabel(link.cat, lang, catalog.custom)} · ${host}`));
        pane.appendChild(sub);

        const h = highlightFor(id);
        if (h) {
            pane.appendChild(el('div', 'cw-links-pane-live',
                h.endsAt ? lt('liveUntil')(formatDayTime(h.endsAt, lang)) : lt('liveNow')));
        }

        const about = pickText(link, 'about', lang);
        const when = pickText(link, 'when', lang);
        if (about || when) {
            if (about) {
                const b = el('div', 'cw-links-pane-block');
                b.append(el('h4', '', lt('aboutLabel')), el('p', '', about));
                pane.appendChild(b);
            }
            if (when) {
                const b = el('div', 'cw-links-pane-block');
                b.append(el('h4', '', lt('whenLabel')), el('p', '', when));
                pane.appendChild(b);
            }
        } else {
            // Sem prévia escrita: a descrição é o que há. Melhor isso que um
            // painel com buracos.
            const desc = pickText(link, 'desc', lang);
            if (desc) pane.appendChild(el('p', 'cw-links-pane-plain', desc));
        }

        const actions = el('div', 'cw-links-pane-actions');
        const open = el('a', 'cw-links-btn');
        open.href = link.url; open.target = '_blank'; open.rel = 'noopener noreferrer';
        open.dataset.openId = id;
        open.append(iconEl(UI_ICONS.open), document.createTextNode(lt('openLink')));
        actions.appendChild(open);

        const row2 = el('div', 'row2');
        const copyBtn = el('button', 'cw-links-ghost');
        copyBtn.type = 'button';
        copyBtn.innerHTML = UI_ICONS.copy;
        copyBtn.append(document.createTextNode(lt('copyUrl')));
        copyBtn.addEventListener('click', () => copyUrl(link, [
            { node: copyBtn, restore: { icon: UI_ICONS.copy, text: lt('copyUrl'), label: lt('copied') } },
        ]));

        const fav = isFavorite(id);
        const favBtn = el('button', `cw-links-ghost ${fav ? 'on' : ''}`);
        favBtn.type = 'button';
        favBtn.setAttribute('aria-pressed', String(fav));
        favBtn.innerHTML = fav ? UI_ICONS.star : UI_ICONS.starOutline;
        favBtn.append(document.createTextNode(fav ? lt('favorited') : lt('favorite')));
        favBtn.addEventListener('click', () => onToggleFavorite(id));

        row2.append(copyBtn, favBtn);
        actions.appendChild(row2);
        pane.appendChild(actions);
        return pane;
    }

    function renderPane(animate) {
        const link = catalog.byId.get(selectedId);
        paneHost.replaceChildren();
        if (!link) return;
        const pane = buildPane(link);
        if (animate) pane.classList.add('swap');
        paneHost.appendChild(pane);
    }

    function select(id) {
        if (!id || id === selectedId || !catalog.byId.has(id)) return;
        selectedId = id;
        renderPane(true);
    }

    // O painel nunca fica vazio: sem escolha do mouse, mostra o destaque
    // principal; sem destaque, o primeiro favorito, o primeiro recente, o
    // primeiro link da lista.
    function defaultSelection(visibleIds) {
        if (visibleIds.includes(selectedId)) return selectedId;
        const candidatos = [
            catalog.highlights.active[0]?.linkId,
            favorites.find((f) => catalog.byId.has(f)),
            recents.find((r) => catalog.byId.has(r.id))?.id,
        ].filter(Boolean);
        const doModo = mode === 'home' ? candidatos[0] : null;
        return doModo || visibleIds[0] || candidatos[0] || linkId(catalog.links[0] || { url: '' });
    }

    // --- ITENS DA LISTA ---
    function bindOpen(a, id) {
        a.addEventListener('click', () => recordOpen(id));
        // Clique do meio abre em nova aba sem passar pelo `click`.
        a.addEventListener('auxclick', (e) => { if (e.button === 1) recordOpen(id); });
    }

    function buildHero(h) {
        const lang = getLanguage();
        const a = el('a', 'cw-links-hero');
        a.href = h.link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.dataset.linkId = h.linkId;
        setTheme(a, h.link.cat);
        const eb = el('div', 'cw-links-eyebrow');
        eb.append(iconEl(categoryIcon(h.link.cat, catalog.custom)), el('b', '', h.link.name));
        if (h.endsAt) eb.append(el('span', 'cw-links-eyebrow-end', lt('until')(formatDay(h.endsAt, lang))));
        a.append(eb, el('h2', 'cw-links-hero-title', h.headline));
        if (h.blurb) a.append(el('p', 'cw-links-hero-blurb', h.blurb));
        bindOpen(a, h.linkId);
        return a;
    }

    function buildMini(h) {
        const lang = getLanguage();
        const a = el('a', 'cw-links-mini');
        a.href = h.link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.dataset.linkId = h.linkId;
        setTheme(a, h.link.cat);
        const eb = el('div', 'cw-links-eyebrow');
        eb.append(iconEl(categoryIcon(h.link.cat, catalog.custom)), el('b', '', h.link.name));
        a.append(eb, el('div', 'cw-links-mini-title', h.headline));
        if (h.endsAt) a.append(el('div', 'cw-links-mini-until', lt('until')(formatDay(h.endsAt, lang))));
        bindOpen(a, h.linkId);
        return a;
    }

    function buildRow(link, meta, term) {
        const lang = getLanguage();
        const id = linkId(link);
        const row = el('div', 'cw-links-row');
        row.dataset.linkId = id;
        setTheme(row, link.cat);

        const a = el('a', 'cw-links-row-link');
        a.href = link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        const text = el('div', 'cw-links-row-text');
        const name = el('div', 'cw-links-row-name');
        appendHighlighted(name, link.name, term);
        text.append(name, el('div', 'cw-links-row-desc', pickText(link, 'desc', lang)));
        a.append(iconEl(categoryIcon(link.cat, catalog.custom), 'cw-links-ico'), text);
        if (meta) a.append(el('span', 'cw-links-row-meta', meta));
        bindOpen(a, id);

        const acts = el('div', 'cw-links-row-acts');
        const fav = isFavorite(id);
        const star = ibButton(fav ? UI_ICONS.star : UI_ICONS.starOutline, fav ? lt('favoriteRemove') : lt('favoriteAdd'), `star ${fav ? 'on' : 'hid'}`);
        star.setAttribute('aria-pressed', String(fav));
        star.addEventListener('click', () => onToggleFavorite(id));
        const copy = ibButton(UI_ICONS.copy, lt('copyUrl'), 'hid');
        copy.addEventListener('click', () => copyUrl(link, [{ node: copy, restore: { icon: UI_ICONS.copy } }]));
        acts.append(star, copy);

        row.append(a, acts);
        return row;
    }

    // Marca o trecho que casou com a busca, sem innerHTML: o nome vem da Central.
    function appendHighlighted(node, texto, term) {
        const t = (term || '').trim();
        if (!t) { node.textContent = texto; return; }
        const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
        // A busca ignora acento; o realce precisa casar posições no texto ORIGINAL,
        // e NFD pode mudar o comprimento. Só realça quando as duas versões têm o
        // mesmo tamanho — o que vale para todo nome usual deste catálogo.
        const alvo = fold(texto);
        if (alvo.length !== texto.length) { node.textContent = texto; return; }
        const i = alvo.indexOf(fold(t));
        if (i === -1) { node.textContent = texto; return; }
        node.append(
            document.createTextNode(texto.slice(0, i)),
            Object.assign(el('mark'), { textContent: texto.slice(i, i + t.length) }),
            document.createTextNode(texto.slice(i + t.length)));
    }

    // --- RENDER ---
    function renderSidebar() {
        sidebar.replaceChildren();

        const navBtn = (key, label, svgMarkup, active, theme) => {
            const b = el('button', `cw-links-nav-btn ${active ? 'active' : ''}`);
            b.type = 'button';
            b.title = label;
            b.setAttribute('aria-label', label);
            if (active) b.setAttribute('aria-current', 'page');
            b.dataset.key = key;
            b.style.setProperty('--cat-color', theme.color);
            b.style.setProperty('--cat-bg', theme.bg);
            b.append(iconEl(svgMarkup, 'cw-links-nav-icon'), el('span', 'cw-links-nav-label', label));
            return b;
        };

        const lang = getLanguage();
        const homeActive = mode === 'home' && !searchTerm.trim();
        const home = navBtn('home', lt('home'), UI_ICONS.home, homeActive, { color: COLORS.blue, bg: '#E8F0FE' });
        home.id = 'cw-sidebar-btn-home';
        home.addEventListener('click', () => {
            SoundManager.playClick();
            clearSearch();
            mode = 'home';
            render();
        });
        sidebar.appendChild(home);
        sidebar.appendChild(el('div', 'cw-links-nav-sep'));

        orderedCategoryKeys(catalog.links, catalog.custom).forEach((key) => {
            const theme = categoryTheme(key, catalog.custom);
            const active = mode === 'library' && !searchTerm.trim() && activeCategoryKey === key;
            const btn = navBtn(key, categoryLabel(key, lang, catalog.custom), categoryIcon(key, catalog.custom), active, theme);
            btn.id = `cw-sidebar-btn-${key}`;
            btn.addEventListener('click', () => {
                SoundManager.playClick();
                clearSearch();
                mode = 'library';
                activeCategoryKey = key;
                render();
                const alvo = document.getElementById(`cat-anchor-${key}`);
                if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            sidebar.appendChild(btn);
        });

        // Com muitas categorias a barra rola, e o botão ativo não pode ficar
        // escondido embaixo.
        sidebar.querySelector('.cw-links-nav-btn.active')?.scrollIntoView?.({ block: 'nearest' });
    }

    function clearSearch() {
        searchTerm = '';
        searchInput.value = '';
    }

    function renderHome() {
        const lang = getLanguage();
        const { active, ended } = catalog.highlights;
        const visibleIds = [];

        if (active.length) {
            scrollContent.append(el('div', 'cw-links-label', lt('featured')));
            scrollContent.append(buildHero(active[0]));
            visibleIds.push(active[0].linkId);
            const resto = active.slice(1);
            if (resto.length) {
                const grid = el('div', `cw-links-grid2 ${resto.length === 1 ? 'single' : ''}`);
                resto.forEach((h) => { grid.append(buildMini(h)); visibleIds.push(h.linkId); });
                scrollContent.append(grid);
            }
        }

        const doCatalogo = (ids) => ids.map((id) => catalog.byId.get(id)).filter(Boolean);
        const listas = {
            fav: doCatalogo(favorites).map((l) => ({ link: l, meta: '' })),
            rec: recents.map((r) => ({ link: catalog.byId.get(r.id), meta: formatWhen(r.t, Date.now(), lang) })).filter((x) => x.link),
            ex: ended.map((h) => ({ link: h.link, meta: lt('endedOn')(formatDay(h.endsAt, lang)) })),
        };
        const abas = [['fav', 'tabFavorites'], ['rec', 'tabRecent'], ['ex', 'tabEnded']];
        const tab = homeTab || (abas.find(([k]) => listas[k].length) || abas[0])[0];

        const seg = el('div', 'cw-links-seg');
        seg.setAttribute('role', 'tablist');
        abas.forEach(([k, chave]) => {
            const b = el('button', '', lt(chave));
            b.type = 'button';
            b.setAttribute('role', 'tab');
            b.setAttribute('aria-selected', String(k === tab));
            b.addEventListener('click', () => { homeTab = k; render(); });
            seg.append(b);
        });
        scrollContent.append(seg);

        const lista = listas[tab];
        if (!lista.length) {
            const vazio = {
                fav: ['emptyFavTitle', 'emptyFavSub'], rec: ['emptyRecentTitle', 'emptyRecentSub'], ex: ['emptyEndedTitle', 'emptyEndedSub'],
            }[tab];
            scrollContent.append(createEmptyState({
                icon: UI_ICONS.starOutline, title: lt(vazio[0]), subtitle: lt(vazio[1]),
            }));
            const ver = el('button', 'cw-links-empty-action', lt('browseAll'));
            ver.type = 'button';
            ver.addEventListener('click', () => { mode = 'library'; activeCategoryKey = null; render(); });
            scrollContent.append(ver);
        } else {
            lista.forEach(({ link, meta }) => {
                scrollContent.append(buildRow(link, meta));
                visibleIds.push(linkId(link));
            });
        }
        return visibleIds;
    }

    function renderLibrary() {
        const lang = getLanguage();
        const term = searchTerm.trim();
        const visibleIds = [];

        const links = term
            ? catalog.links.filter((l) => matchesTerm(l, term, lang, catalog.custom))
            : catalog.links;

        if (term && !links.length) {
            scrollContent.append(createEmptyState({
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
                title: lt('nothingFound'),
                subtitle: lt('noLinkMatches')(term),
            }));
            return visibleIds;
        }

        const grupos = groupByCategory(links, catalog.custom);
        if (term) scrollContent.append(el('div', 'cw-links-label', lt('resultsSummary')(links.length, grupos.size)));

        grupos.forEach((lista, key) => {
            const head = el('div', 'cw-links-cathead');
            head.id = `cat-anchor-${key}`;
            setTheme(head, key);
            head.append(el('i', 'cw-links-cat-dot'), document.createTextNode(categoryLabel(key, lang, catalog.custom)));
            scrollContent.append(head);
            lista.forEach((l) => {
                scrollContent.append(buildRow(l, '', term));
                visibleIds.push(linkId(l));
            });
        });
        return visibleIds;
    }

    function render() {
        // Refazer a lista do zero zera a rolagem; quem favorita uma estrela no
        // meio da lista não pode voltar para o topo.
        const rolagem = scrollContent.scrollTop;
        scrollContent.replaceChildren();

        const visibleIds = (searchTerm.trim() || mode === 'library') ? renderLibrary() : renderHome();
        renderSidebar();

        // Busca sem resultado: o painel esvazia. Mostrar a prévia de um link que
        // NÃO está na lista seria responder a uma pergunta que ninguém fez.
        const semResultado = !visibleIds.length && (searchTerm.trim() || mode === 'library');
        selectedId = semResultado ? null : defaultSelection(visibleIds);
        renderPane(false);
        scrollContent.scrollTop = rolagem;
    }

    // --- EVENTOS ---
    // Delegação: uma escuta serve a lista inteira, mesmo refeita a cada render.
    scrollContent.addEventListener('mouseover', (e) => {
        const alvo = e.target.closest?.('[data-link-id]');
        if (alvo) select(alvo.dataset.linkId);
    });
    // O foco por teclado faz o mesmo que o mouse.
    scrollContent.addEventListener('focusin', (e) => {
        const alvo = e.target.closest?.('[data-link-id]');
        if (alvo) select(alvo.dataset.linkId);
    });
    // O botão "Abrir link" do painel é o outro caminho para abrir.
    paneHost.addEventListener('click', (e) => {
        const a = e.target.closest?.('a[data-open-id]');
        if (a) recordOpen(a.dataset.openId);
    });
    paneHost.addEventListener('auxclick', (e) => {
        const a = e.target.closest?.('a[data-open-id]');
        if (a && e.button === 1) recordOpen(a.dataset.openId);
    });

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        render();
    });

    // --- INIT ---
    function toggleVisibility() {
        const abrindo = !isModuleOpen(popup);
        if (abrindo) { loadPrefs(); render(); lockBodyScroll(); } else { flushRecents(); unlockBodyScroll(); }
        toggleGenieAnimation(abrindo, popup, 'cw-btn-links');
    }

    document.body.appendChild(popup);
    loadPrefs();
    render();

    // Busca a lista publicada na Central e repinta quando chegar. Não bloqueia a
    // abertura: a tela já subiu com o fallback embutido, então o pior caso (API
    // fora do ar) é continuar exatamente como era antes.
    hydrateFromContentCentral(() => { reconcilePrefs(); render(); });

    // As preferências da nuvem chegam depois do boot (UserPrefsService.sync) e
    // podem trazer favoritos de outra máquina.
    UserPrefsService.sync().then(() => { loadPrefs(); reconcilePrefs(); render(); }).catch(() => {});

    // Retraduz header/busca e refaz tudo: os destaques dependem do idioma
    // (título e resumo), então são resolvidos de novo.
    onLanguageChange(() => {
        catalog = { ...catalog, highlights: resolveHighlights(catalog.rawHighlights, catalog.links, getLanguage()) };
        if (headerTitleEl) headerTitleEl.textContent = lt('headerTitle');
        const helpTitleEl = popup.querySelector('.cw-help-title');
        if (helpTitleEl) helpTitleEl.textContent = lt('headerTitle');
        const helpDescEl = popup.querySelector('.cw-help-description');
        if (helpDescEl) helpDescEl.textContent = lt('headerDesc');
        searchInput.placeholder = lt('searchPlaceholder');
        searchInput.setAttribute('aria-label', lt('searchPlaceholder'));
        render();
    });

    return toggleVisibility;
}
