// src/modules/notes/scenarios/scenario-ui.js
import { ScenarioService } from "./scenario-service.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { showToast, confirmDialog } from "../../shared/utils.js";
import { translations } from "../data/notes-data.js";
import { COLORS, RADIUS, SHADOW, EASE } from "../notes-styles.js";

export function createScenarioSelector(onSelect, state) {
    const container = document.createElement("div"); container.className = "cw-scenario-module";
    const selectedScenarios = new Set();

    // Apple-style Glassmorphism and refined UI
    const styles = `
        .cw-scenario-module {
            background: ${COLORS.surface} !important;
            border: 1.5px solid ${COLORS.bgInput} !important;
            border-radius: ${RADIUS.large} !important;
            padding: 24px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            transition: all 0.4s ${EASE};
        }
        .cw-scenario-module:hover {
            box-shadow: ${SHADOW.card};
            border-color: ${COLORS.border} !important;
        }
        .cw-scenario-tabs {
            background: ${COLORS.bgInput} !important;
            padding: 4px !important;
            border-radius: ${RADIUS.medium} !important;
            margin-bottom: 20px !important;
            display: flex;
            gap: 4px;
        }
        .cw-tab {
            flex: 1;
            border-radius: ${RADIUS.small} !important;
            padding: 8px 0 !important;
            font-size: 12px !important;
            font-weight: 700 !important;
            color: ${COLORS.textSub} !important;
            transition: all 0.3s ${EASE} !important;
            cursor: pointer;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .cw-tab.active {
            background: ${COLORS.surface} !important;
            color: ${COLORS.primary} !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
        }
        .cw-scenario-chip.selected {
            background: ${COLORS.primaryBg} !important;
            border-color: ${COLORS.primary} !important;
            color: ${COLORS.primary} !important;
            box-shadow: 0 4px 10px rgba(26, 115, 232, 0.15) !important;
        }
        .cw-scenario-chip {
            background: ${COLORS.surface} !important;
            border: 1.5px solid ${COLORS.bgInput} !important;
            border-radius: ${RADIUS.pill} !important;
            padding: 8px 18px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: ${COLORS.text} !important;
            transition: all 0.3s ${EASE} !important;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        }
        .cw-scenario-chip:hover {
            background: ${COLORS.surface} !important;
            border-color: ${COLORS.primary} !important;
            color: ${COLORS.primary} !important;
            transform: translateY(-2px);
            box-shadow: 0 6px 14px rgba(26, 115, 232, 0.1);
        }
        .cw-scenario-search input {
            width: 100%;
            padding: 12px 18px 12px 42px;
            border-radius: ${RADIUS.pill};
            border: 1.5px solid ${COLORS.bgInput};
            background: ${COLORS.bgInput};
            font-size: 14px;
            margin-bottom: 20px;
            outline: none;
            transition: all 0.2s;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
            background-repeat: no-repeat;
            background-position: 14px center;
        }
        .cw-scenario-search input:focus {
            background: ${COLORS.surface};
            border-color: ${COLORS.primary};
            box-shadow: 0 0 0 3px rgba(26,115,232,0.1);
        }
    `;
    if (!document.getElementById('cw-scenario-refined-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'cw-scenario-refined-styles';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    let searchQuery = '';
    const render = () => {
        const t = (key) => translations[state.currentLang]?.[key] || translations['pt']?.[key] || key;
        container.innerHTML = `
            <div class="cw-scenario-header">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div class="cw-section-title" style="margin-top:0">${t('cenarios_comuns')}</div>
                    <button class="cw-btn-help-scenarios" title="${t('ajuda_scenarios')}">?</button>
                </div>
                <div class="cw-scenario-search">
                    <input type="text" placeholder="Buscar cenários..." value="${searchQuery}">
                </div>
            </div>
            <div class="cw-scenario-list"></div>
            <div class="cw-scenario-preview">Passe o mouse para ver os detalhes</div>
        `;
        container.querySelector('.cw-scenario-search input').oninput = (e) => { searchQuery = e.target.value.toLowerCase(); renderList(); };
        container.querySelector('.cw-btn-help-scenarios').onclick = (e) => {
            e.preventDefault();
            showScenariosHelp(t);
        };

        if (!document.getElementById('cw-help-btn-style')) {
            const style = document.createElement('style');
            style.id = 'cw-help-btn-style';
            style.innerHTML = `
                .cw-btn-help-scenarios {
                    width: 20px; height: 20px; border-radius: 50%; border: 1px solid #dadce0;
                    background: #f8f9fa; color: #5f6368; font-size: 12px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; font-weight: bold;
                }
                .cw-btn-help-scenarios:hover { background: #eee; }
            `;
            document.head.appendChild(style);
        }

        renderList();
    };

    const renderList = async () => {
        const listContainer = container.querySelector('.cw-scenario-list');
        listContainer.innerHTML = "<div class='cw-loading'>Carregando...</div>";

        const defaults = ScenarioService.getDefaultScenarios();
        const subStatus = state.currentSubStatus;

        let scenarios = Object.entries(defaults).filter(([id]) => {
            if (subStatus.startsWith('NI_')) return id.includes('-ni-') || id.includes('attempted');
            if (subStatus.startsWith('SO_')) return id.includes('gtm') || id.includes('whatsapp') || id.includes('form') || id.includes('ecw4') || id.includes('ga4');
            if (subStatus.startsWith('AS_')) return id.includes('-as-');
            if (subStatus.startsWith('IN_')) return id.includes('-in-');
            if (subStatus.startsWith('DC_')) return id.includes('-dc-');
            return true;
        }).map(([id, data]) => ({
            id,
            title: id.replace('quickfill-', '').replace(/-/g, ' '),
            content: data
        }));

        scenarios = scenarios.filter(s => {
            const matchesSearch = (s.title?.toLowerCase().includes(searchQuery) || (typeof s.content === 'string' && s.content.toLowerCase().includes(searchQuery)));
            const matchesType = (!s.content.type || s.content.type === 'all' || s.content.type === state.currentCaseType);

            // Strict substatus filtering
            let matchesSubStatus = true;
            if (subStatus.startsWith('NI_')) {
                matchesSubStatus = s.id.includes('-ni-') || s.id.includes('attempted');
            } else if (subStatus.startsWith('SO_')) {
                // SO scenarios can be tasks or specific SO closes
                matchesSubStatus = s.id.includes('gtm') || s.id.includes('whatsapp') || s.id.includes('form') || s.id.includes('ecw4') || s.id.includes('ga4') || s.id.includes('-so-');
            } else if (subStatus.startsWith('AS_')) {
                matchesSubStatus = s.id.includes('-as-');
            } else if (subStatus.startsWith('IN_')) {
                matchesSubStatus = s.id.includes('-in-');
            } else if (subStatus.startsWith('DC_')) {
                matchesSubStatus = s.id.includes('-dc-');
            }

            return matchesSearch && matchesType && matchesSubStatus;
        });

        // Sort by favorites
        scenarios.sort((a, b) => {
            const favA = state.favorites.has(a.id) ? 1 : 0;
            const favB = state.favorites.has(b.id) ? 1 : 0;
            return favB - favA;
        });

        listContainer.innerHTML = "";
        if (scenarios.length === 0) {
            listContainer.innerHTML = "<div class='cw-empty'>Nenhum cenário encontrado.</div>";
            return;
        }

        scenarios.forEach(s => {
            const chipWrapper = document.createElement("div");
            chipWrapper.style.position = "relative";
            chipWrapper.style.display = "inline-block";

            const chip = document.createElement("div");
            chip.className = "cw-scenario-chip";
            if (selectedScenarios.has(s.id)) chip.classList.add("selected");
            chip.textContent = s.title || s.id;

            const favBtn = document.createElement("span");
            favBtn.textContent = state.favorites.has(s.id) ? "★" : "☆";
            favBtn.style.cssText = `
                position: absolute; top: -5px; right: -5px; background: #fff;
                border-radius: 50%; width: 16px; height: 16px; display: flex;
                align-items: center; justify-content: center; font-size: 10px;
                cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #fbbc04;
                z-index: 2;
            `;
            favBtn.onclick = (e) => {
                e.stopPropagation();
                state.toggleFavorite(s.id);
                renderList();
            };

            chip.onmouseenter = () => {
                const preview = container.querySelector('.cw-scenario-preview');
                preview.textContent = typeof s.content === 'object' ? s.content['field-REASON_COMMENTS'] || "Cenário de preenchimento múltiplo" : s.content.substring(0, 100);
            };

            chip.onclick = () => {
                SoundManager.playClick();
                if (selectedScenarios.has(s.id)) {
                    selectedScenarios.delete(s.id);
                    chip.classList.remove("selected");
                } else {
                    selectedScenarios.add(s.id);
                    chip.classList.add("selected");
                }
                onSelect(s, selectedScenarios.has(s.id));
            };

            chipWrapper.appendChild(chip);
            chipWrapper.appendChild(favBtn);
            listContainer.appendChild(chipWrapper);
        });
    };
    render(); return container;
}

function showScenariosHelp(t) {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; animation: cwFadeIn 0.3s ease;";

    const modal = document.createElement("div");
        modal.style.cssText = `background: ${COLORS.surface}; width: 90%; max-width: 400px; border-radius: ${RADIUS.large}; padding: 32px; box-shadow: ${SHADOW.apple}; position: relative; animation: cwSlideUp 0.4s ${EASE};`;

    modal.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
            <div style="width:48px; height:48px; border-radius:16px; background:${COLORS.primaryBg}; display:flex; align-items:center; justify-content:center; color:${COLORS.primary};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h3 style="margin:0; font-family:'Google Sans', sans-serif; font-size:18px; color:#202124;">${t('ajuda_scenarios')}</h3>
        </div>
        <p style="font-size:14px; color:#5f6368; line-height:1.6; margin-bottom:24px;">${t('ajuda_scenarios_desc')}</p>
        <button class="cw-btn-primary" style="width:100%; border-radius:12px;">Entendi</button>
    `;

    modal.querySelector('button').onclick = () => {
        overlay.style.opacity = "0";
        modal.style.transform = "translateY(20px)";
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.onclick = (e) => { if(e.target === overlay) modal.querySelector('button').click(); };

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    if (!document.getElementById('cw-modal-animations')) {
        const style = document.createElement('style');
        style.id = 'cw-modal-animations';
        style.innerHTML = `
            @keyframes cwFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes cwSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        `;
        document.head.appendChild(style);
    }
}
