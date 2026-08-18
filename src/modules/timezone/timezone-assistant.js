// src/modules/timezone/timezone-assistant.js

import { stylePopup, styleSelect, showToast } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { getLanguage, onLanguageChange } from "../shared/i18n.js";

const PINNED_STORAGE_KEY = "cw_timezone_pinned";

// Nomes/labels em espanhol só onde realmente diferem do português (a
// maioria dos nomes de país/cidade da América Latina é igual nos dois
// idiomas, então só listamos as exceções aqui).
const HUB_ES_OVERRIDES = {
    es: { name: 'España' },
    bo: { name: 'Bolivia' },
    co: { name: 'Colombia' },
    ec: { name: 'Ecuador' },
    py: { name: 'Paraguay', label: 'Asunción' },
    uy: { name: 'Uruguay', label: 'Montevideo' },
    ni: { name: 'Nicaragua', label: 'Managua' },
    pr: { name: 'Puerto Rico' },
    gt: { label: 'C. de Guatemala' },
    pa: { label: 'C. de Panamá' },
};
function hubName(hub) {
    if (getLanguage() === 'es') return HUB_ES_OVERRIDES[hub.id]?.name ?? hub.name;
    return hub.name;
}
function hubLabel(hub) {
    if (getLanguage() === 'es') return HUB_ES_OVERRIDES[hub.id]?.label ?? hub.label;
    return hub.label;
}

const TZ_DICT = {
    pt: {
        headerDesc: "Monitoramento global e planejamento de chamadas.",
        tabLive: "Monitoramento",
        tabPlan: "Planejador",
        searchPlaceholder: "Buscar cidade ou país...",
        noLocationFound: "Nenhum local encontrado",
        unpin: "Desafixar",
        pin: "Fixar",
        statusOpen: "Aberto",
        statusOpening: "Abrindo",
        statusClosing: "Fechando",
        statusClosed: "Fechado",
        whereIsClient: "Onde está o cliente?",
        you: "Você",
        yourTimezone: "Brasília (GMT-3)",
        client: "Cliente",
        dragToSimulate: "Arraste para simular o horário:",
        idealBusinessHours: "Horário Comercial Ideal",
        limitHours: "Horário Limite (Atenção)",
        outOfHours: "Fora de Horário",
        filters: { all: 'Todos', sa: 'América do Sul', na: 'Norte & Central', eu: 'Europa' },
    },
    es: {
        headerDesc: "Monitoreo global y planificación de llamadas.",
        tabLive: "Monitoreo",
        tabPlan: "Planificador",
        searchPlaceholder: "Buscar ciudad o país...",
        noLocationFound: "No se encontró ningún lugar",
        unpin: "Desanclar",
        pin: "Anclar",
        statusOpen: "Abierto",
        statusOpening: "Abriendo",
        statusClosing: "Cerrando",
        statusClosed: "Cerrado",
        whereIsClient: "¿Dónde está el cliente?",
        you: "Tú",
        yourTimezone: "Brasilia (GMT-3)",
        client: "Cliente",
        dragToSimulate: "Arrastra para simular el horario:",
        idealBusinessHours: "Horario Comercial Ideal",
        limitHours: "Horario Límite (Atención)",
        outOfHours: "Fuera de Horario",
        filters: { all: 'Todos', sa: 'América del Sur', na: 'Norte y Central', eu: 'Europa' },
    },
};
function tt(key) {
    const lang = getLanguage();
    return TZ_DICT[lang]?.[key] ?? TZ_DICT.pt[key];
}

// Adicionei a propriedade 'region' para os filtros
const HUBS = [
    // --- EUROPA ---
    { id: 'pt', name: 'Portugal', flag: '🇵🇹', zone: 'Europe/Lisbon', label: 'Lisboa', region: 'eu' },
    { id: 'es', name: 'Espanha', flag: '🇪🇸', zone: 'Europe/Madrid', label: 'Madrid', region: 'eu' },

    // --- AMÉRICA DO SUL ---
    { id: 'ar', name: 'Argentina', flag: '🇦🇷', zone: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires', region: 'sa' },
    { id: 'bo', name: 'Bolívia', flag: '🇧🇴', zone: 'America/La_Paz', label: 'La Paz', region: 'sa' },
    { id: 'cl', name: 'Chile', flag: '🇨🇱', zone: 'America/Santiago', label: 'Santiago', region: 'sa' },
    { id: 'co', name: 'Colômbia', flag: '🇨🇴', zone: 'America/Bogota', label: 'Bogotá', region: 'sa' },
    { id: 'ec', name: 'Equador', flag: '🇪🇨', zone: 'America/Guayaquil', label: 'Guayaquil', region: 'sa' },
    { id: 'py', name: 'Paraguai', flag: '🇵🇾', zone: 'America/Asuncion', label: 'Assunção', region: 'sa' },
    { id: 'pe', name: 'Peru', flag: '🇵🇪', zone: 'America/Lima', label: 'Lima', region: 'sa' },
    { id: 'uy', name: 'Uruguai', flag: '🇺🇾', zone: 'America/Montevideo', label: 'Montevidéu', region: 'sa' },
    { id: 've', name: 'Venezuela', flag: '🇻🇪', zone: 'America/Caracas', label: 'Caracas', region: 'sa' },

    // --- AMÉRICA DO NORTE & CENTRAL ---
    { id: 'mx', name: 'México', flag: '🇲🇽', zone: 'America/Mexico_City', label: 'CDMX', region: 'na' },
    { id: 'cr', name: 'Costa Rica', flag: '🇨🇷', zone: 'America/Costa_Rica', label: 'San José', region: 'na' },
    { id: 'sv', name: 'El Salvador', flag: '🇸🇻', zone: 'America/El_Salvador', label: 'San Salvador', region: 'na' },
    { id: 'gt', name: 'Guatemala', flag: '🇬🇹', zone: 'America/Guatemala', label: 'C. da Guatemala', region: 'na' },
    { id: 'hn', name: 'Honduras', flag: '🇭🇳', zone: 'America/Tegucigalpa', label: 'Tegucigalpa', region: 'na' },
    { id: 'ni', name: 'Nicarágua', flag: '🇳🇮', zone: 'America/Managua', label: 'Manágua', region: 'na' },
    { id: 'pa', name: 'Panamá', flag: '🇵🇦', zone: 'America/Panama', label: 'C. do Panamá', region: 'na' },
    { id: 'do', name: 'Rep. Dominicana', flag: '🇩🇴', zone: 'America/Santo_Domingo', label: 'Santo Domingo', region: 'na' },
    { id: 'pr', name: 'Porto Rico', flag: '🇵🇷', zone: 'America/Puerto_Rico', label: 'San Juan', region: 'na' }
];

const FILTERS = [
    { id: 'all' },
    { id: 'sa' },
    { id: 'na' },
    { id: 'eu' }
];

// --- FOLHA DE ESTILOS DEDICADA (estados interativos) ---
// Este módulo ainda montava hover via onmouseenter/onmouseleave em JS
// (único no app a não ter migrado pro padrão usado em call-script/broadcast/
// personal-library) - isso significa nenhum :focus-visible de graça e nenhum
// respeito a prefers-reduced-motion nesses hovers. O layout/cores estático
// continua no objeto `styles` local (não há necessidade de reescrever tudo),
// só os estados de interação (hover/focus) viram classes CSS reais aqui.
function injectInteractiveStyles() {
    if (document.getElementById('cw-timezone-interactive-styles')) return;
    const style = document.createElement('style');
    style.id = 'cw-timezone-interactive-styles';
    style.textContent = `
        .tz-tab-btn:focus-visible,
        .tz-chip:focus-visible,
        .tz-hub-card:focus-visible,
        .tz-pin-btn:focus-visible {
            outline: 2px solid #1A73E8;
            outline-offset: 2px;
        }
        .tz-chip:hover { border-color: #1A73E8; }
        .tz-hub-card {
            transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease;
        }
        .tz-hub-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(60,64,67,0.1);
        }
        .tz-pin-btn { transition: background-color 0.2s ease; }
        .tz-pin-btn:hover { background-color: #F1F3F4; }
        @media (prefers-reduced-motion: reduce) {
            .tz-hub-card { transition: box-shadow 0.2s ease !important; }
            .tz-hub-card:hover { transform: none !important; }
        }
    `;
    document.head.appendChild(style);
}

export function initTimezoneAssistant() {
    injectInteractiveStyles();
    const CURRENT_VERSION = "v2.2 Pro"; 
    let visible = false;
    let updateInterval = null;
    
    // Estado
    let selectedHubId = 'mx'; 
    let pinnedHubs = JSON.parse(localStorage.getItem(PINNED_STORAGE_KEY) || "[]");
    let searchTerm = "";
    let activeFilter = "all";
    
    // Data Base para o Planejador
    let plannerDate = new Date();
    plannerDate.setHours(14, 0, 0, 0);

    // --- DESIGN SYSTEM ---
    const COLORS = {
        bg: "#F8F9FA",           
        surface: "#FFFFFF",
        primary: "#1A73E8",      
        primaryBg: "#E8F0FE",    
        text: "#202124",         
        textSub: "#5F6368",      
        border: "#DADCE0",       
        success: "#1E8E3E",      
        successBg: "#E6F4EA",    
        warning: "#E37400",      
        warningBg: "#FEF7E0",    
        error: "#D93025",        
        errorBg: "#FCE8E6",      
    };

    const styles = {
        container: { 
            display: 'flex', flexDirection: 'column', height: '100%', 
            background: COLORS.bg, fontFamily: "'Google Sans', Roboto, sans-serif" 
        },
        
        // Tabs
        tabHeader: { 
            display: 'flex', background: COLORS.surface, 
            borderBottom: `1px solid ${COLORS.border}`, padding: '8px 16px 0 16px' 
        },
        tabBtn: { 
            flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', 
            fontSize: '13px', fontWeight: '500', color: COLORS.textSub, 
            borderBottom: '3px solid transparent', transition: 'all 0.2s ease',
            userSelect: 'none'
        },
        tabActive: { 
            color: COLORS.primary, borderBottomColor: COLORS.primary, fontWeight: '600' 
        },

        // Toolbar (Search + Chips)
        toolbar: {
            padding: '12px 16px 8px 16px',
            background: COLORS.bg,
            display: 'flex', flexDirection: 'column', gap: '12px',
            borderBottom: '1px solid rgba(0,0,0,0.03)'
        },
        
        // Search Input Estilo iOS/Google
        searchInputWrapper: {
            position: 'relative', width: '100%',
        },
        searchInput: {
            width: '100%', boxSizing: 'border-box',
            padding: '10px 12px 10px 38px',
            borderRadius: '10px', border: '1px solid transparent',
            background: '#FFFFFF',
            fontSize: '14px', color: COLORS.text, outline: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            fontFamily: "'Google Sans', Roboto, sans-serif"
        },
        searchIcon: {
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            width: '16px', height: '16px', color: '#9AA0A6', pointerEvents: 'none'
        },

        // Chips
        chipsRow: {
            display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px',
            scrollbarWidth: 'none', msOverflowStyle: 'none'
        },
        chip: {
            whiteSpace: 'nowrap', padding: '6px 12px', borderRadius: '16px',
            fontSize: '12px', fontWeight: '500', cursor: 'pointer',
            border: `1px solid ${COLORS.border}`, background: COLORS.surface,
            color: COLORS.textSub, transition: 'all 0.2s'
        },
        chipActive: {
            background: COLORS.primaryBg, color: COLORS.primary, borderColor: COLORS.primaryBg, fontWeight: '600'
        },

        // Live View (Lista)
        listContainer: { 
            padding: '16px 16px 40px 16px', // Padding bottom extra para o último card
            overflowY: 'auto', flex: 1, 
            display: 'flex', flexDirection: 'column', gap: '12px',
            scrollbarWidth: 'none' 
        },
        hubCard: { 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            padding: '16px 20px', background: COLORS.surface, borderRadius: '16px', 
            border: `1px solid transparent`, 
            boxShadow: '0 2px 6px rgba(60,64,67,0.05)',
            transition: 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease',
            cursor: 'pointer', position: 'relative',
        },
        hubCardPinned: { 
            borderLeft: `4px solid ${COLORS.primary}`, 
            paddingLeft: '16px' 
        },
        
        // Planner
        plannerWrapper: { 
            padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', 
            flex: 1, overflowY: 'auto' 
        },
        timeComparisonRow: { display: 'flex', gap: '16px', alignItems: 'stretch' },
        timeCard: { 
            flex: 1, padding: '20px', borderRadius: '20px', background: COLORS.surface, 
            border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column', 
            alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(60,64,67,0.05)',
        },
        
        timelineContainer: { position: 'relative', height: '60px', marginTop: '16px', userSelect: 'none' },
        timelineTrack: { position: 'absolute', top: '26px', left: '0', right: '0', height: '6px', borderRadius: '3px', background: '#E0E0E0', overflow: 'hidden' },
        dayZone: { position: 'absolute', top: '0', bottom: '0', left: '37.5%', width: '37.5%', background: 'rgba(52, 168, 83, 0.3)', pointerEvents: 'none' },
        hdInput: { fontSize: '28px', fontWeight: '700', color: COLORS.text, border: 'none', background: 'transparent', width: '100%', textAlign: 'center', outline: 'none', fontFamily: "'Google Sans', sans-serif", cursor: 'text' },
        statusBadge: { padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', alignSelf: 'center', transition: 'background-color 0.3s' }
    };

    // --- POPUP ---
    const popup = document.createElement("div");
    popup.id = "timezone-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { 
        right: "100px", width: "450px", height: "720px", overflow: "hidden", 
        borderRadius: "24px"
    });

    const animRefs = { popup };
    const header = createStandardHeader(
        popup, "Time Zone Traveler", CURRENT_VERSION,
        tt('headerDesc'),
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);

    const container = document.createElement("div");
    Object.assign(container.style, styles.container);
    popup.appendChild(container);

    // --- TABS ---
    const tabContainer = document.createElement("div");
    Object.assign(tabContainer.style, styles.tabHeader);
    
    const btnLive = document.createElement("div");
    btnLive.textContent = tt('tabLive');
    btnLive.className = "tz-tab-btn";
    btnLive.tabIndex = 0;
    btnLive.setAttribute("role", "tab");
    Object.assign(btnLive.style, styles.tabBtn, styles.tabActive);

    const btnPlan = document.createElement("div");
    btnPlan.textContent = tt('tabPlan');
    btnPlan.className = "tz-tab-btn";
    btnPlan.tabIndex = 0;
    btnPlan.setAttribute("role", "tab");
    Object.assign(btnPlan.style, styles.tabBtn);

    [btnLive, btnPlan].forEach(btn => {
        btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); }
        });
    });

    tabContainer.appendChild(btnLive);
    tabContainer.appendChild(btnPlan);
    container.appendChild(tabContainer);

    // --- TOOLBAR (PESQUISA + FILTROS) ---
    const toolbar = document.createElement("div");
    Object.assign(toolbar.style, styles.toolbar);
    
    // Search
    const searchWrapper = document.createElement("div");
    Object.assign(searchWrapper.style, styles.searchInputWrapper);
    
    const icon = document.createElement("div");
    icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
    Object.assign(icon.style, styles.searchIcon);
    
    const input = document.createElement("input");
    input.placeholder = tt('searchPlaceholder');
    Object.assign(input.style, styles.searchInput);
    
    input.onfocus = () => { input.style.boxShadow = "0 2px 8px rgba(26,115,232,0.15)"; input.style.borderColor = "rgba(26,115,232,0.3)"; };
    input.onblur = () => { input.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"; input.style.borderColor = "transparent"; };
    
    input.oninput = (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderLive();
    };

    searchWrapper.appendChild(icon);
    searchWrapper.appendChild(input);
    toolbar.appendChild(searchWrapper);

    // Chips
    const chipsRow = document.createElement("div");
    Object.assign(chipsRow.style, styles.chipsRow);
    
    FILTERS.forEach(f => {
        const chip = document.createElement("div");
        chip.textContent = tt('filters')[f.id];
        chip.id = `tz-filter-${f.id}`;
        chip.className = "tz-chip";
        chip.tabIndex = 0;
        chip.setAttribute("role", "button");
        Object.assign(chip.style, styles.chip);

        if (f.id === activeFilter) Object.assign(chip.style, styles.chipActive);

        chip.onclick = () => {
            SoundManager.playClick();
            activeFilter = f.id;

            // Atualiza visual dos chips
            Array.from(chipsRow.children).forEach(c => {
                Object.assign(c.style, styles.chip);
            });
            Object.assign(chip.style, styles.chipActive);

            renderLive();
        };
        chip.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); chip.click(); }
        });

        chipsRow.appendChild(chip);
    });

    toolbar.appendChild(chipsRow);
    container.appendChild(toolbar);


    // --- VIEWS ---
    const viewLive = document.createElement("div");
    Object.assign(viewLive.style, styles.listContainer);
    // Remove scrollbar nativa para visual clean
    const styleTag = document.createElement('style');
    styleTag.textContent = `#timezone-popup ::-webkit-scrollbar { display: none; }`;
    container.appendChild(styleTag);
    
    const viewPlan = document.createElement("div");
    Object.assign(viewPlan.style, styles.plannerWrapper, { display: 'none' });

    container.appendChild(viewLive);
    container.appendChild(viewPlan);

    // --- LOGICA TABS ---
    btnLive.onclick = () => switchTab('live');
    btnPlan.onclick = () => switchTab('plan');

    function switchTab(tab) {
        SoundManager.playClick();
        if (tab === 'live') {
            Object.assign(btnLive.style, styles.tabActive);
            Object.assign(btnPlan.style, styles.tabBtn);
            btnPlan.style.borderBottomColor = 'transparent';
            btnLive.setAttribute("aria-selected", "true");
            btnPlan.setAttribute("aria-selected", "false");

            viewLive.style.display = 'flex';
            toolbar.style.display = 'flex'; // Mostra toolbar
            viewPlan.style.display = 'none';
            
            startClock();
        } else {
            Object.assign(btnPlan.style, styles.tabActive);
            Object.assign(btnLive.style, styles.tabBtn);
            btnLive.style.borderBottomColor = 'transparent';
            
            viewPlan.style.display = 'flex';
            viewLive.style.display = 'none';
            toolbar.style.display = 'none'; // Esconde toolbar
            
            stopClock(); 
            renderPlanner();
        }
    }

    // ============================================================
    //  VIEW 1: MONITORAMENTO (LIVE)
    // ============================================================
    
    function getBusinessStatus(hours) {
        if (hours >= 9 && hours < 17) return { color: COLORS.success, bg: COLORS.successBg, label: tt('statusOpen'), icon: '🟢' };
        if (hours >= 8 && hours < 9) return { color: COLORS.warning, bg: COLORS.warningBg, label: tt('statusOpening'), icon: '🟡' };
        if (hours >= 17 && hours < 19) return { color: COLORS.warning, bg: COLORS.warningBg, label: tt('statusClosing'), icon: '🟡' };
        return { color: COLORS.textSub, bg: '#F1F3F4', label: tt('statusClosed'), icon: '🔴' };
    }

    function togglePin(hubId) {
        if (pinnedHubs.includes(hubId)) {
            pinnedHubs = pinnedHubs.filter(id => id !== hubId);
        } else {
            pinnedHubs.push(hubId);
        }
        localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedHubs));
        renderLive();
        SoundManager.playClick();
    }

    function renderLive() {
        viewLive.innerHTML = "";
        const now = new Date();

        // 1. Filtra
        let filteredHubs = HUBS.filter(h => {
            const matchesSearch = hubName(h).toLowerCase().includes(searchTerm) || hubLabel(h).toLowerCase().includes(searchTerm);
            const matchesRegion = activeFilter === 'all' || h.region === activeFilter;
            return matchesSearch && matchesRegion;
        });

        // 2. Ordena (Pinados primeiro)
        filteredHubs.sort((a, b) => {
            const aPinned = pinnedHubs.includes(a.id);
            const bPinned = pinnedHubs.includes(b.id);
            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;
            return hubName(a).localeCompare(hubName(b));
        });

        if (filteredHubs.length === 0) {
            viewLive.innerHTML = `
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">${tt('noLocationFound')}</div>
                </div>
            `;
            return;
        }

        filteredHubs.forEach(hub => {
            const isPinned = pinnedHubs.includes(hub.id);
            const timeString = now.toLocaleTimeString(getLanguage() === 'es' ? 'es-ES' : 'pt-BR', { timeZone: hub.zone, hour: '2-digit', minute: '2-digit' });
            const hour = parseInt(timeString.split(':')[0]);
            const status = getBusinessStatus(hour);
            const isNight = hour < 6 || hour > 18;

            const card = document.createElement("div");
            card.className = "tz-hub-card";
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `${hubName(hub)}, ${timeString}`);
            Object.assign(card.style, styles.hubCard);
            if (isPinned) Object.assign(card.style, styles.hubCardPinned);

            const pinIcon = isPinned ? '★' : '☆';
            const pinColor = isPinned ? '#F9AB00' : '#DADCE0';

            card.innerHTML = `
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn tz-pin-btn" tabindex="0" role="button" aria-label="${isPinned ? tt('unpin') : tt('pin')} ${hubName(hub)}" style="cursor:pointer; font-size:22px; color:${pinColor}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${pinIcon}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${hub.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${COLORS.text}; letter-spacing:-0.2px;">${hubName(hub)}</div>
                        <div style="font-size:12px; color:${COLORS.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${isNight ? '🌙' : '☀️'} ${hubLabel(hub)}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${COLORS.text}; font-family:'Google Sans', sans-serif;">${timeString}</div>
                    <div style="font-size:11px; font-weight:600; color:${status.color}; background:${status.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${status.label}
                    </div>
                </div>
            `;

            const btnPin = card.querySelector('.cw-pin-btn');
            btnPin.onclick = (e) => {
                e.stopPropagation();
                togglePin(hub.id);
            };
            btnPin.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    togglePin(hub.id);
                }
            });

            card.onclick = () => {
                selectedHubId = hub.id;
                switchTab('plan');
            };
            card.addEventListener("keydown", (e) => {
                if ((e.key === "Enter" || e.key === " ") && e.target === card) {
                    e.preventDefault();
                    card.click();
                }
            });

            viewLive.appendChild(card);
        });

        // Espaçador final para garantir que o último card não seja cortado
        const spacer = document.createElement('div');
        spacer.style.height = "20px";
        spacer.style.width = "100%";
        viewLive.appendChild(spacer);
    }

    // ============================================================
    //  VIEW 2: PLANEJADOR
    // ============================================================
    
    function renderPlanner() {
        viewPlan.innerHTML = "";

        const selectContainer = document.createElement("div");
        const selectLabel = document.createElement("label");
        selectLabel.textContent = tt('whereIsClient');
        selectLabel.style.cssText = "display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";

        const select = document.createElement("select");
        Object.assign(select.style, styleSelect);
        select.style.padding = "14px";

        // Ordena select alfabeticamente
        const sortedForSelect = [...HUBS].sort((a,b) => hubName(a).localeCompare(hubName(b)));

        sortedForSelect.forEach(hub => {
            const opt = document.createElement("option");
            opt.value = hub.id;
            opt.textContent = `${hub.flag} ${hubName(hub)} (${hub.zone})`;
            if (hub.id === selectedHubId) opt.selected = true;
            select.appendChild(opt);
        });

        select.onchange = (e) => {
            selectedHubId = e.target.value;
            updatePlannerUI();
            SoundManager.playClick();
        };

        selectContainer.appendChild(selectLabel);
        selectContainer.appendChild(select);
        viewPlan.appendChild(selectContainer);

        // Clocks
        const clockRow = document.createElement("div");
        Object.assign(clockRow.style, styles.timeComparisonRow);

        const myCard = document.createElement("div");
        Object.assign(myCard.style, styles.timeCard);
        myCard.style.backgroundColor = "#F8FAFF"; 
        myCard.style.borderColor = "#E8F0FE";
        
        myCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">🇧🇷 ${tt('you')}</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">${tt('yourTimezone')}</div>
        `;

        const clientCard = document.createElement("div");
        Object.assign(clientCard.style, styles.timeCard);
        clientCard.style.backgroundColor = "#FFF8E1";
        clientCard.style.borderColor = "#FEF7E0";

        clientCard.innerHTML = `
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">${tt('client')}</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `;

        clockRow.appendChild(myCard);
        clockRow.appendChild(clientCard);
        viewPlan.appendChild(clockRow);

        // Status
        const statusBadge = document.createElement("div");
        statusBadge.id = "cw-planner-status";
        Object.assign(statusBadge.style, styles.statusBadge);
        viewPlan.appendChild(statusBadge);

        // Timeline
        const timelineWrapper = document.createElement("div");
        Object.assign(timelineWrapper.style, { padding: '0 4px', marginTop: '12px' });
        
        const rangeLabel = document.createElement("div");
        rangeLabel.textContent = tt('dragToSimulate');
        rangeLabel.style.cssText = "font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";
        
        const sliderContainer = document.createElement("div");
        Object.assign(sliderContainer.style, styles.timelineContainer);

        const track = document.createElement("div");
        Object.assign(track.style, styles.timelineTrack);
        
        const dayZone = document.createElement("div");
        Object.assign(dayZone.style, styles.dayZone);
        track.appendChild(dayZone);

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "1439"; 
        slider.step = "15"; 
        slider.style.cssText = "position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";
        
        const markers = document.createElement("div");
        markers.style.cssText = "position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;";
        markers.innerHTML = `<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>`;

        sliderContainer.appendChild(track);
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(markers);
        timelineWrapper.appendChild(rangeLabel);
        timelineWrapper.appendChild(sliderContainer);
        viewPlan.appendChild(timelineWrapper);

        // Logic
        const timeInputBR = myCard.querySelector('#cw-time-input-br');
        const clientDisplay = clientCard.querySelector('#cw-time-display-client');
        const clientLabel = clientCard.querySelector('#cw-client-label');

        function updatePlannerUI() {
            const hub = HUBS.find(h => h.id === selectedHubId);
            clientLabel.textContent = `${hub.flag} ${hubLabel(hub)} (${hub.zone})`;

            const hours = plannerDate.getHours();
            const minutes = plannerDate.getMinutes();
            const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

            timeInputBR.value = timeStr;
            slider.value = (hours * 60) + minutes;

            const clientTimeString = plannerDate.toLocaleTimeString(getLanguage() === 'es' ? 'es-ES' : 'pt-BR', {
                timeZone: hub.zone, hour: '2-digit', minute: '2-digit'
            });
            clientDisplay.textContent = clientTimeString;

            const clientHour = parseInt(clientTimeString.split(':')[0]);

            if (clientHour >= 9 && clientHour < 17) {
                statusBadge.style.background = COLORS.successBg;
                statusBadge.style.color = COLORS.success;
                statusBadge.innerHTML = `<span style="font-size:16px">✅</span> ${tt('idealBusinessHours')}`;
            } else if ((clientHour >= 8 && clientHour < 9) || (clientHour >= 17 && clientHour < 19)) {
                statusBadge.style.background = COLORS.warningBg;
                statusBadge.style.color = COLORS.warning;
                statusBadge.innerHTML = `<span style="font-size:16px">⚠️</span> ${tt('limitHours')}`;
            } else {
                statusBadge.style.background = COLORS.errorBg;
                statusBadge.style.color = COLORS.error;
                statusBadge.innerHTML = `<span style="font-size:16px">⛔</span> ${tt('outOfHours')}`;
            }
        }

        slider.oninput = (e) => {
            const totalMins = parseInt(e.target.value);
            plannerDate.setHours(Math.floor(totalMins / 60));
            plannerDate.setMinutes(totalMins % 60);
            updatePlannerUI();
        };

        timeInputBR.oninput = (e) => {
            const [h, m] = e.target.value.split(':');
            if (h && m) {
                plannerDate.setHours(parseInt(h));
                plannerDate.setMinutes(parseInt(m));
                updatePlannerUI();
            }
        };

        updatePlannerUI();
    }

    // --- CONTROLES ---
    function startClock() {
        renderLive();
        if (!updateInterval) updateInterval = setInterval(renderLive, 60000);
    }

    function stopClock() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-timezone'); 
        
        if (visible) {
            lockBodyScroll();
            switchTab('live');
        } else {
            unlockBodyScroll();
            stopClock();
        }
    }

    document.body.appendChild(popup);

    // Retraduz os pedaços fixos (header, abas, busca, filtros) e refaz a
    // view atual, que já é montada do zero a cada render.
    onLanguageChange(() => {
        const helpDescEl = popup.querySelector('.cw-help-description');
        if (helpDescEl) helpDescEl.textContent = tt('headerDesc');
        btnLive.textContent = tt('tabLive');
        btnPlan.textContent = tt('tabPlan');
        input.placeholder = tt('searchPlaceholder');
        Array.from(chipsRow.children).forEach(chip => {
            const f = FILTERS.find(f => `tz-filter-${f.id}` === chip.id);
            if (f) chip.textContent = tt('filters')[f.id];
        });
        if (viewLive.style.display !== 'none') renderLive();
        if (viewPlan.style.display !== 'none') renderPlanner();
    });

    return toggleVisibility;
}