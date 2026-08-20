// src/modules/configs/configs-assistant.js

import { stylePopup, showToast } from "../shared/utils.js";
import { getAgentEmail, captureNameWithMagic } from "../shared/page-data.js";
import { fetchUserProfile } from "../shared/data-service.js"; // Importação crucial adicionada
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "../shared/dom-utils.js";
import { getLanguage, setLanguage, onLanguageChange, createTranslator } from "../shared/i18n.js";
import { createShortcutsSection } from "./shortcuts-section.js";

const CONFIGS_DICT = {
    pt: {
        title: "Configurações",
        headerDesc: "Personalize sua experiência e preferências.",
        profileNotFound: "Perfil não localizado na base de dados.",
        consultant: "Consultor",
        overheadBadge: "Gestão / Overhead",
        soundSectionTitle: "Preferências de Som",
        soundLabel: "Efeitos Sonoros",
        soundDesc: "Ativar ou desativar sons de interface.",
        langSectionTitle: "Idioma da Interface",
        langLabel: "Idioma",
        langDesc: "Escolha o idioma dos menus, botões e mensagens do Case Wizard.",
        supportSectionTitle: "Suporte & Feedback",
        reportBug: "Reportar Bug/Sugestões",
        scSectionTitle: "Meus Atalhos (Ctrl+K)",
        scSortLabel: "Ordenar por frequência de uso",
        scSortDesc: "Desligue para definir você mesmo a ordem, arrastando os atalhos.",
        scEmpty: "Você ainda não tem atalhos. Crie um aqui ou monte uma nota no Case Notes e clique em “Salvar como atalho”.",
        scAdd: "+ Criar atalho",
        scLimit: "Limite de {max} atalhos atingido",
        scEdit: "Editar atalho",
        scDelete: "Excluir atalho",
        scReorder: "Reordenar (arraste ou use as setas)",
        scDeleteConfirm: "Excluir o atalho “{name}”?",
        scBroken: "⚠ cenário indisponível",
        scOneScenario: "1 cenário",
        scNScenarios: "{n} cenários",
        scName: "Nome",
        scNamePlaceholder: "Ex: Fim do 2 Day Rule",
        scAlias: "Apelido de busca",
        scAliasPlaceholder: "Ex: 2day",
        scAliasDesc: "Palavra que encontra este atalho no Ctrl+K, além do nome.",
        scFlow: "Fluxo",
        scStatus: "Status",
        scSubStatus: "Substatus",
        scScenarios: "Cenários",
        scScenariosDesc: "Opcional: sem nenhum, o atalho só abre a nota já no substatus certo.",
        scPickSubStatus: "Escolha um substatus primeiro.",
        scNoScenarios: "Nenhum cenário disponível para esta combinação.",
        scCancel: "Cancelar",
        scSave: "Salvar",
        scSaving: "Salvando…",
        scSaved: "Atalho salvo!",
        scSavedLocal: "Atalho salvo neste navegador (sem conexão com a nuvem).",
    },
    es: {
        title: "Configuración",
        headerDesc: "Personaliza tu experiencia y tus preferencias.",
        profileNotFound: "Perfil no encontrado en la base de datos.",
        consultant: "Consultor",
        overheadBadge: "Gestión / Overhead",
        soundSectionTitle: "Preferencias de Sonido",
        soundLabel: "Efectos de Sonido",
        soundDesc: "Activar o desactivar los sonidos de la interfaz.",
        langSectionTitle: "Idioma de la Interfaz",
        langLabel: "Idioma",
        langDesc: "Elige el idioma de los menús, botones y mensajes del Case Wizard.",
        supportSectionTitle: "Soporte y Comentarios",
        reportBug: "Reportar error o sugerencia",
        scSectionTitle: "Mis Atajos (Ctrl+K)",
        scSortLabel: "Ordenar por frecuencia de uso",
        scSortDesc: "Desactívalo para definir tú mismo el orden, arrastrando los atajos.",
        scEmpty: "Todavía no tienes atajos. Crea uno aquí o arma una nota en Case Notes y haz clic en “Guardar como atajo”.",
        scAdd: "+ Crear atajo",
        scLimit: "Límite de {max} atajos alcanzado",
        scEdit: "Editar atajo",
        scDelete: "Eliminar atajo",
        scReorder: "Reordenar (arrastra o usa las flechas)",
        scDeleteConfirm: "¿Eliminar el atajo “{name}”?",
        scBroken: "⚠ escenario no disponible",
        scOneScenario: "1 escenario",
        scNScenarios: "{n} escenarios",
        scName: "Nombre",
        scNamePlaceholder: "Ej: Fin del 2 Day Rule",
        scAlias: "Apodo de búsqueda",
        scAliasPlaceholder: "Ej: 2day",
        scAliasDesc: "Palabra que encuentra este atajo en el Ctrl+K, además del nombre.",
        scFlow: "Flujo",
        scStatus: "Estado",
        scSubStatus: "Subestado",
        scScenarios: "Escenarios",
        scScenariosDesc: "Opcional: sin ninguno, el atajo solo abre la nota ya en el subestado correcto.",
        scPickSubStatus: "Elige un subestado primero.",
        scNoScenarios: "Ningún escenario disponible para esta combinación.",
        scCancel: "Cancelar",
        scSave: "Guardar",
        scSaving: "Guardando…",
        scSaved: "¡Atajo guardado!",
        scSavedLocal: "Atajo guardado en este navegador (sin conexión con la nube).",
    },
};

export function initConfigsAssistant() {
    const t = createTranslator(CONFIGS_DICT);
    const CURRENT_VERSION = "v1.1";
    let visible = false;

    // --- DESIGN SYSTEM ---
    const COLORS = {
        bg: "#F8F9FA",
        surface: "#FFFFFF",
        primary: "#1A73E8",
        text: "#202124",
        textSub: "#5F6368",
        border: "#DADCE0",
        // Alerta suave, no tom que o design system pede para fluxo secundário:
        // chama atenção sem parecer erro de sistema (ver specs/ui-ux).
        warnBorder: "#F9AB00",
        warnBg: "#FFFBF0",
        warnText: "#B06000",
    };

    const styleId = "cw-configs-styles";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            .cw-configs-container {
                display: flex; flex-direction: column; height: 100%;
                background: ${COLORS.bg}; font-family: 'Google Sans', Roboto, sans-serif;
                padding: 20px; gap: 24px; overflow-y: auto;
            }
            .cw-configs-section { display: flex; flex-direction: column; gap: 12px; }
            .cw-configs-section-title {
                font-size: 12px; font-weight: 700; color: ${COLORS.textSub};
                text-transform: uppercase; letter-spacing: 0.8px;
            }
            .cw-configs-card {
                background: ${COLORS.surface}; border-radius: 12px; padding: 16px;
                border: 1px solid ${COLORS.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; flex-direction: column; gap: 16px;
            }
            .cw-configs-row { display: flex; align-items: center; justify-content: space-between; }
            .cw-configs-label { font-size: 14px; font-weight: 500; color: ${COLORS.text}; }
            .cw-configs-desc { font-size: 12px; color: ${COLORS.textSub}; margin-top: 2px; }
            .cw-configs-btn {
                padding: 10px; border-radius: 8px; border: 1px solid ${COLORS.border};
                background: white; cursor: pointer; font-weight: 500; font-family: inherit;
                transition: all 0.2s;
            }
            .cw-configs-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }

            /* --- PROFILE CARD PREMIUM --- */
            .cw-profile-card {
                background: ${COLORS.surface}; border-radius: 12px; padding: 20px;
                border: 1px solid ${COLORS.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; align-items: center; gap: 20px; margin-bottom: 8px;
            }
            .cw-profile-avatar {
                width: 80px; height: 80px; border-radius: 50%; object-fit: cover;
                border: 2px solid #e8f0fe; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .cw-profile-info { display: flex; flex-direction: column; gap: 4px; flex: 1; }
            .cw-profile-ldap {
                font-size: 18px; font-weight: 700; color: ${COLORS.text}; margin: 0;
                font-family: 'Google Sans', sans-serif;
            }
            .cw-profile-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
            .cw-profile-badge {
                padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
                background: #f1f3f4; color: #5f6368; border: 1px solid #dadce0;
                text-transform: uppercase; letter-spacing: 0.3px;
            }
            .cw-profile-badge.overhead {
                background: #e8f0fe; color: #1a73e8; border-color: #d2e3fc;
            }

            /* --- SKELETON LOADING --- */
            .cw-skeleton {
                background: #eee;
                background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
                border-radius: 5px;
                background-size: 200% 100%;
                animation: 1.5s shine linear infinite;
            }
            .cw-skeleton-avatar { width: 80px; height: 80px; border-radius: 50%; }
            .cw-skeleton-text { height: 14px; width: 120px; margin-bottom: 8px; }
            .cw-skeleton-title { height: 22px; width: 100px; margin-bottom: 12px; }
            .cw-skeleton-badge { width: 60px; height: 22px; border-radius: 6px; }

            @keyframes shine {
                to { background-position-x: -200%; }
            }

            /* --- TOGGLE SWITCH --- */
            /* O checkbox nativo continua no DOM (checked/foco/teclado de graça),
               só o visual é trocado - único controle de OS "cru" que sobrava
               no popup inteiro, destoando do resto do design system. */
            .cw-toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
            .cw-toggle-switch input {
                position: absolute; inset: 0; width: 100%; height: 100%; margin: 0;
                opacity: 0; cursor: pointer; z-index: 1;
            }
            .cw-toggle-track {
                position: absolute; inset: 0; background: ${COLORS.border};
                border-radius: 100px; transition: background-color 0.2s ease; pointer-events: none;
            }
            .cw-toggle-track::before {
                content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
                background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-toggle-switch input:checked + .cw-toggle-track { background: ${COLORS.primary}; }
            .cw-toggle-switch input:checked + .cw-toggle-track::before { transform: translateX(18px); }
            .cw-toggle-switch input:focus-visible + .cw-toggle-track { outline: 2px solid ${COLORS.primary}; outline-offset: 2px; }
            @media (prefers-reduced-motion: reduce) {
                .cw-toggle-track, .cw-toggle-track::before { transition: none !important; }
            }
        `;
        document.head.appendChild(style);
    }

    const popup = document.createElement("div");
    popup.id = "configs-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, {
        right: "100px", width: "400px", height: "600px", overflow: "hidden",
        borderRadius: "24px"
    });

    const animRefs = { popup };
    const header = createStandardHeader(
        popup, t('title'), CURRENT_VERSION,
        t('headerDesc'),
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);
    const headerTitleEl = header.querySelector('span');

    const container = document.createElement("div");
    container.className = "cw-configs-container";
    popup.appendChild(container);

    // --- SEÇÃO: PERFIL ---
    const profileSection = document.createElement("div");
    profileSection.className = "cw-profile-card";
    profileSection.id = "cw-user-profile-section";
    profileSection.style.display = "none";
    container.appendChild(profileSection);

    let lastRenderedProfile; // { ldap, profile } — usado por applyTexts() pra re-traduzir sem novo fetch
    function renderProfileCard(ldap, profile) {
        lastRenderedProfile = { ldap, profile };

        if (!profile) {
            profileSection.innerHTML = `
                <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                    ${ldap.charAt(0).toUpperCase()}
                </div>
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${ldap}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${t('consultant')}</span>
                    </div>
                    <div style="font-size: 12px; color: ${COLORS.textSub}; margin-top: 4px;">
                        ${t('profileNotFound')}
                    </div>
                </div>
            `;
            return;
        }

        profileSection.innerHTML = `
        <img src="https://moma-teams-photos.corp.google.com/photos/${ldap}?sz=600&type=PLUS"
             class="cw-profile-avatar" alt="User Photo"
             onerror="this.style.display='none'">
        <div class="cw-profile-info">
            <h2 class="cw-profile-ldap">@${profile.ldap}</h2>
            <div class="cw-profile-badges">
                <span class="cw-profile-badge">${profile.roleCategory || 'N/A'}</span>
                <span class="cw-profile-badge">${profile.segment || 'N/A'}</span>
                <span class="cw-profile-badge">${profile.defaultLanguage || 'N/A'}</span>
                ${profile.isOverhead ? `<span class="cw-profile-badge overhead">${t('overheadBadge')}</span>` : ''}
            </div>
            <div style="font-size: 12px; color: ${COLORS.textSub}; margin-top: 4px;">
                ${profile.role || ''}
            </div>
        </div>
    `;
    }

    async function renderUserProfile() {
        profileSection.style.display = "flex";
        profileSection.innerHTML = `
            <div class="cw-skeleton cw-skeleton-avatar"></div>
            <div class="cw-profile-info">
                <div class="cw-skeleton cw-skeleton-title"></div>
                <div class="cw-profile-badges">
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                    <div class="cw-skeleton cw-skeleton-badge"></div>
                </div>
                <div class="cw-skeleton cw-skeleton-text" style="margin-top: 8px;"></div>
            </div>
        `;
        (async () => {
            try {
                // renderUserProfile() roda no boot, síncrono, logo depois de
                // initConfigsAssistant() ser chamado em app.js - a captura real
                // da identidade (captureNameWithMagic, disparada dentro de
                // playStartupAnimation) só começa ~200ms depois e nunca é
                // esperada ali. Sem esse guard, getAgentEmail() sempre voltava
                // null nesse ponto, o LDAP caía no fallback "user", e como
                // isso só roda uma vez, o card ficava preso no genérico pra
                // sempre (mesmo abrindo Configs bem depois, com a identidade
                // já capturada). Mesmo guard que getPageData() já usa.
                if (!getAgentEmail()) await captureNameWithMagic();

                // Busca o LDAP real do usuário logado
                const agentEmail = getAgentEmail();
                const ldap = agentEmail ? agentEmail.split('@')[0] : "user";

                // Faz a chamada real para a base de dados via JSONP
                const profile = await fetchUserProfile(ldap);

                renderProfileCard(ldap, profile);
            } catch (e) {
                console.warn("Erro ao renderizar perfil:", e);
                profileSection.style.display = "none";
            }
        })();
    }
    renderUserProfile();

    // --- SEÇÃO: IDIOMA ---
    // A troca aqui é a única forma manual de mudar o idioma da interface;
    // por padrão ele já vem do perfil na planilha People (ver app.js).
    const langSection = document.createElement("div");
    langSection.className = "cw-configs-section";
    langSection.innerHTML = `
        <div class="cw-configs-section-title js-lang-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-lang-label"></div>
                    <div class="cw-configs-desc js-lang-desc"></div>
                </div>
                <div class="cw-lang-toggle" id="cw-config-lang-toggle" role="group">
                    <button type="button" data-lang="pt">PT</button>
                    <button type="button" data-lang="es">ES</button>
                </div>
            </div>
        </div>
    `;
    if (!document.getElementById("cw-lang-toggle-styles")) {
        const langStyle = document.createElement("style");
        langStyle.id = "cw-lang-toggle-styles";
        langStyle.innerHTML = `
            .cw-lang-toggle { display: flex; border: 1px solid ${COLORS.border}; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
            .cw-lang-toggle button {
                border: none; background: white; padding: 8px 14px; font-size: 12px; font-weight: 700;
                cursor: pointer; color: ${COLORS.textSub}; font-family: inherit; transition: all 0.2s;
            }
            .cw-lang-toggle button:first-child { border-right: 1px solid ${COLORS.border}; }
            .cw-lang-toggle button.active { background: ${COLORS.primary}; color: #fff; }
            .cw-lang-toggle button:hover:not(.active) { background: #f1f3f4; }
        `;
        document.head.appendChild(langStyle);
    }
    const langToggle = langSection.querySelector("#cw-config-lang-toggle");
    function syncLangToggleButtons() {
        langToggle.querySelectorAll("button").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.lang === getLanguage());
        });
    }
    syncLangToggleButtons();
    langToggle.querySelectorAll("button").forEach(btn => {
        btn.onclick = () => {
            setLanguage(btn.dataset.lang);
            SoundManager.playClick();
        };
    });
    container.appendChild(langSection);

    // --- SEÇÃO: MEUS ATALHOS (Ctrl+K) ---
    // Fica logo abaixo do perfil, antes de som/idioma: é a única seção com
    // conteúdo do agente, e a razão mais provável de ele abrir Configurações.
    const shortcutsSection = createShortcutsSection(t, COLORS);
    container.appendChild(shortcutsSection);

    // --- SEÇÃO: SOM ---
    const soundSection = document.createElement("div");
    soundSection.className = "cw-configs-section";
    soundSection.innerHTML = `
        <div class="cw-configs-section-title js-sound-section-title"></div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label js-sound-label"></div>
                    <div class="cw-configs-desc js-sound-desc"></div>
                </div>
                <label class="cw-toggle-switch">
                    <input type="checkbox" id="cw-config-sound-toggle" ${SoundManager.isMuted() ? '' : 'checked'}>
                    <span class="cw-toggle-track"></span>
                </label>
            </div>
        </div>
    `;
    const soundToggle = soundSection.querySelector("#cw-config-sound-toggle");
    soundToggle.onchange = (e) => {
        SoundManager.setMuted(!e.target.checked);
        if (e.target.checked) SoundManager.playClick();
    };
    container.appendChild(soundSection);

    // --- SEÇÃO: SUPORTE ---
    const supportSection = document.createElement("div");
    supportSection.className = "cw-configs-section";
    supportSection.innerHTML = `
        <div class="cw-configs-section-title js-support-section-title"></div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn js-support-link" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank"></a>
            </div>
        </div>
    `;
    container.appendChild(supportSection);

    // --- TEXTOS TRADUZIDOS (aplica na criação e sempre que o idioma mudar) ---
    function applyTexts() {
        if (lastRenderedProfile) renderProfileCard(lastRenderedProfile.ldap, lastRenderedProfile.profile);

        langSection.querySelector(".js-lang-section-title").textContent = t('langSectionTitle');
        langSection.querySelector(".js-lang-label").textContent = t('langLabel');
        langSection.querySelector(".js-lang-desc").textContent = t('langDesc');
        syncLangToggleButtons();

        shortcutsSection.applyTexts();

        soundSection.querySelector(".js-sound-section-title").textContent = t('soundSectionTitle');
        soundSection.querySelector(".js-sound-label").textContent = t('soundLabel');
        soundSection.querySelector(".js-sound-desc").textContent = t('soundDesc');

        supportSection.querySelector(".js-support-section-title").textContent = t('supportSectionTitle');
        supportSection.querySelector(".js-support-link").textContent = t('reportBug');

        if (headerTitleEl) headerTitleEl.textContent = t('title');
        const helpTitleEl = popup.querySelector('.cw-help-title');
        if (helpTitleEl) helpTitleEl.textContent = t('title');
        const helpDescEl = popup.querySelector('.cw-help-description');
        if (helpDescEl) helpDescEl.textContent = t('headerDesc');
    }
    applyTexts();
    onLanguageChange(applyTexts);

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-configs');
        if (visible) {
            // A lista de atalhos é montada uma vez, no boot, mas o agente pode
            // ter criado um no Case Notes ("Salvar como atalho") desde então -
            // sem isto, ele abriria Configurações e não veria o que acabou de
            // salvar.
            shortcutsSection.refresh();
            lockBodyScroll();
            SoundManager.playClick();
        } else {
            unlockBodyScroll();
        }
    }

    document.body.appendChild(popup);
    return toggleVisibility;
}