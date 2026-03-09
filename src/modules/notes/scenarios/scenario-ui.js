// src/modules/notes/scenarios/scenario-ui.js
import { ScenarioService } from "./scenario-service.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { showToast, confirmDialog } from "../../shared/utils.js";
import { translations } from "../data/notes-data.js";
export function createScenarioSelector(onSelect, state) {
    const container = document.createElement("div"); container.className = "cw-scenario-module";
    const selectedScenarios = new Set();

    // Apple-style Glassmorphism and refined UI
    const styles = `
        .cw-scenario-module {
            background: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.1);
        }
        .cw-scenario-tabs {
            background: rgba(120, 120, 128, 0.12) !important;
            padding: 2px !important;
            border-radius: 10px !important;
            margin-bottom: 16px !important;
        }
        .cw-tab {
            flex: 1;
            border-radius: 8px !important;
            padding: 8px 0 !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #5f6368 !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer;
            text-align: center;
        }
        .cw-tab.active {
            background: #ffffff !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
        }
        .cw-scenario-chip.selected {
            background: #e8f0fe !important;
            border-color: #1a73e8 !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 4px rgba(26, 115, 232, 0.2) !important;
        }
        .cw-scenario-chip {
            background: #ffffff !important;
            border: 1px solid #e5e5ea !important;
            border-radius: 12px !important;
            padding: 6px 12px !important;
            font-size: 13px !important;
            color: #1c1c1e !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .cw-scenario-chip:hover {
            background: #f2f2f7 !important;
            transform: translateY(-1px);
        }
        .cw-scenario-search input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 10px;
            border: none;
            background: rgba(120, 120, 128, 0.1);
            font-size: 13px;
            margin-bottom: 12px;
            outline: none;
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
            alert(t('ajuda_scenarios_desc'));
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
