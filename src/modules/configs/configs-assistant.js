// src/modules/configs/configs-assistant.js

import { stylePopup, showToast } from "../shared/utils.js";
import { getPageData, getAgentEmail } from "../shared/page-data.js";
import { fetchUserProfile } from "../shared/data-service.js"; // Importação crucial adicionada
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";

export function initConfigsAssistant() {
    const CURRENT_VERSION = "v1.0";
    let visible = false;

    // --- DESIGN SYSTEM ---
    const COLORS = {
        bg: "#F8F9FA",
        surface: "#FFFFFF",
        primary: "#1A73E8",
        text: "#202124",
        textSub: "#5F6368",
        border: "#DADCE0",
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
        popup, "Configurações", CURRENT_VERSION,
        "Personalize sua experiência e preferências.",
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);

    const container = document.createElement("div");
    container.className = "cw-configs-container";
    popup.appendChild(container);

    // --- SEÇÃO: PERFIL ---
    const profileSection = document.createElement("div");
    profileSection.className = "cw-profile-card";
    profileSection.id = "cw-user-profile-section";
    profileSection.style.display = "none";
    container.appendChild(profileSection);

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

        try {
            // Busca o LDAP real do usuário logado
            const agentEmail = getAgentEmail();
            const ldap = agentEmail ? agentEmail.split('@')[0] : "user";
            
            // Faz a chamada real para a base de dados via JSONP
            const profile = await fetchUserProfile(ldap);

            if (!profile) {
                profileSection.innerHTML = `
                    <div class="cw-profile-avatar" style="background: #e8eaed; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #5f6368; font-weight: bold;">
                        ${ldap.charAt(0).toUpperCase()}
                    </div>
                    <div class="cw-profile-info">
                        <h2 class="cw-profile-ldap">@${ldap}</h2>
                        <div class="cw-profile-badges">
                            <span class="cw-profile-badge">Consultor</span>
                        </div>
                        <div style="font-size: 12px; color: ${COLORS.textSub}; margin-top: 4px;">
                            Perfil não localizado na base de dados.
                        </div>
                    </div>
                `;
                return;
            }

            profileSection.innerHTML = `
                <img src="https://moma-teams-photos.corp.google.com/photos/${profile.ldap}?sz=600&type=PLUS"
                     class="cw-profile-avatar" alt="User Photo"
                     onerror="this.style.display='none'">
                <div class="cw-profile-info">
                    <h2 class="cw-profile-ldap">@${profile.ldap}</h2>
                    <div class="cw-profile-badges">
                        <span class="cw-profile-badge">${profile.roleCategory || 'N/A'}</span>
                        <span class="cw-profile-badge">${profile.segment || 'N/A'}</span>
                        <span class="cw-profile-badge">${profile.defaultLanguage || 'N/A'}</span>
                        ${profile.isOverhead ? '<span class="cw-profile-badge overhead">Gestão / Overhead</span>' : ''}
                    </div>
                    <div style="font-size: 12px; color: ${COLORS.textSub}; margin-top: 4px;">
                        ${profile.role || ''}
                    </div>
                </div>
            `;
        } catch (e) {
            console.warn("Erro ao renderizar perfil:", e);
            profileSection.style.display = "none";
        }
    }
    renderUserProfile();

    // --- SEÇÃO: SOM ---
    const soundSection = document.createElement("div");
    soundSection.className = "cw-configs-section";
    soundSection.innerHTML = `
        <div class="cw-configs-section-title">Preferências de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${SoundManager.isMuted() ? '' : 'checked'} style="cursor:pointer; width:20px; height:20px;">
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
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <a class="cw-configs-btn" href="https://forms.gle/8icwk1TejBTDYsJS6" target="_blank">Reportar Bug/Sugestões</a>
            </div>
        </div>
    `;
    container.appendChild(supportSection);

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, 'cw-btn-configs');
        if (visible) {
            SoundManager.playClick();
        }
    }

    document.body.appendChild(popup);
    return toggleVisibility;
}