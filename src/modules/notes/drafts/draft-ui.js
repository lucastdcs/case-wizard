// src/modules/notes/drafts/draft-ui.js

import { DraftService } from "./draft-service.js";
import { showToast, confirmDialog } from "../../shared/utils.js";
import { SoundManager } from "../../shared/sound-manager.js";
import { COLORS, RADIUS, SHADOW, EASE } from "../notes-styles.js";

export function createDraftsManager(callbacks) {
    const { onSaveCurrent, onLoadDraft, t } = callbacks;

    // --- 1. BOTÃO "GUARDAR" (Redesenhado) ---
    const parkButton = document.createElement("button");
    parkButton.className = "js-btn-park";
    
    // Ícone + Texto
    parkButton.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${t('guardar')}</span>
    `;

    // Estilo Geométrico igual ao 'buttonBase' + Visual 'Outlined'
    parkButton.style.cssText = `
        flex: 1 1 0;
        padding: 12px 0;
        margin-top: 24px;
        border-radius: ${RADIUS.pill};
        font-size: 14px;
        font-weight: 700;
        background: ${COLORS.surface};
        color: ${COLORS.textSub};
        border: 1px solid ${COLORS.border};
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ${EASE};
        box-shadow: ${SHADOW.subtle};
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `;

    // Micro-interações (Hover/Active)
    parkButton.onmouseenter = () => {
        parkButton.style.backgroundColor = "#F8F9FA";
        parkButton.style.borderColor = "#202124";
        parkButton.style.color = "#202124";
        parkButton.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        parkButton.style.transform = "translateY(-1px)";
    };
    
    parkButton.onmouseleave = () => {
        parkButton.style.backgroundColor = "#FFFFFF";
        parkButton.style.borderColor = "#DADCE0";
        parkButton.style.color = "#5F6368";
        parkButton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
        parkButton.style.transform = "translateY(0)";
    };

    parkButton.onmousedown = () => parkButton.style.transform = "scale(0.96)";
    parkButton.onmouseup = () => parkButton.style.transform = "scale(1) translateY(-1px)";

    // LÓGICA DE SALVAR
    parkButton.onclick = async () => {
        const confirmed = await confirmDialog("Deseja guardar o rascunho atual e limpar os campos?");
        if(confirmed) {
            try {
                const stateData = await onSaveCurrent();
                if (stateData) {
                    DraftService.save(stateData);
                    renderDrawerList();
                    updateBadge();
                    SoundManager.playSuccess();
                    showToast("Rascunho salvo com sucesso!");
                } else {
                    showToast("Erro: Não foi possível ler os dados.", { error: true });
                }
            } catch (e) {
                console.error("Erro ao salvar rascunho:", e);
                showToast("Erro ao salvar.", { error: true });
            }
        }
    };

    // --- 2. BOTÃO DE HISTÓRICO (No Header) ---
    const historyBtnWrapper = document.createElement("div");
    historyBtnWrapper.title = "Meus Rascunhos";
    historyBtnWrapper.style.cssText = "position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;";
    
    // Ícone de Relógio/Histórico
    historyBtnWrapper.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>`;
    
    // Badge Vermelho (Contador)
    const badge = document.createElement("div");
    badge.style.cssText = "position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;";
    historyBtnWrapper.appendChild(badge);

    historyBtnWrapper.onmouseenter = () => historyBtnWrapper.style.background = "rgba(0,0,0,0.05)";
    historyBtnWrapper.onmouseleave = () => historyBtnWrapper.style.background = "transparent";
    historyBtnWrapper.onclick = (e) => {
        e.stopPropagation();
        toggleDrawer();
    };

    function updateBadge() {
        const count = DraftService.getCount();
        if (count > 0) {
            badge.style.display = "block";
            badge.textContent = count;
            // Animação de "Pop"
            badge.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.5)' },
                { transform: 'scale(1)' }
            ], { duration: 200 });
        } else {
            badge.style.display = "none";
        }
    }

    // --- 3. DRAWER (Gaveta de Rascunhos) ---
    const drawer = document.createElement("div");
    drawer.style.cssText = `
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: ${COLORS.surface}; z-index: 100;
        border-radius: ${RADIUS.large} ${RADIUS.large} 0 0;
        box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
        transform: translateY(110%); transition: transform 0.4s ${EASE};
        display: flex; flex-direction: column; overflow: hidden;
        border-top: 1px solid rgba(255,255,255,0.7);
    `;

    const drawerHeader = document.createElement("div");
    drawerHeader.style.cssText = "padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;";
    drawerHeader.innerHTML = `<span class="js-drawer-title" style="font-size:16px; font-weight:700; color:#202124;">${t('rascunhos_salvos')}</span>`;
    
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    closeBtn.style.cssText = "background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;";
    closeBtn.onmouseenter = () => closeBtn.style.background = "#F1F3F4";
    closeBtn.onmouseleave = () => closeBtn.style.background = "transparent";
    
    closeBtn.onclick = () => toggleDrawer(false);
    drawerHeader.appendChild(closeBtn);

    const drawerList = document.createElement("div");
    drawerList.style.cssText = "flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;";

    drawer.appendChild(drawerHeader);
    drawer.appendChild(drawerList);

    function toggleDrawer(forceState) {
        const isOpen = drawer.style.transform === "translateY(0%)";
        const shouldOpen = forceState !== undefined ? forceState : !isOpen;
        
        if (shouldOpen) {
            renderDrawerList();
            drawer.style.transform = "translateY(0%)";
        } else {
            drawer.style.transform = "translateY(110%)";
        }
    }

    function renderDrawerList() {
        const drafts = DraftService.getAll();
        drawerList.innerHTML = "";

        if (drafts.length === 0) {
            drawerList.innerHTML = `
                <div style="text-align:center; padding:80px 20px; color:${COLORS.textSub};">
                    <div style="font-size:40px; margin-bottom:16px; opacity:0.3;">📭</div>
                    <div style="font-size:14px; font-weight:600;">${t('nenhum_rascunho')}</div>
                </div>`;
            return;
        }

        drafts.forEach(draft => {
            const card = document.createElement("div");
            card.style.cssText = `
                background: ${COLORS.surface}; padding: 20px; border-radius: ${RADIUS.large};
                border: 1.5px solid ${COLORS.bgInput}; box-shadow: ${SHADOW.subtle};
                position: relative; transition: all 0.3s ${EASE};
            `;
            
            // Data formatada
            const date = new Date(draft.timestamp);
            const timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            // Títulos Inteligentes (Tags)
            let tagsHtml = "";
            if (draft.summaryTags && draft.summaryTags.length > 0) {
                const tagsStr = draft.summaryTags.slice(0, 3).join(", ") + (draft.summaryTags.length > 3 ? "..." : "");
                tagsHtml = `<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">🏷️ ${tagsStr}</div>`;
            }

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${draft.clientName || 'Cliente Sem Nome'}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${timeStr}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">🆔 ${draft.cid || '---'}</span>
                    <span style="display:block; color:${draft.status === 'NI' ? '#E37400' : '#1E8E3E'}">● ${draft.subStatus || draft.status || 'Sem Status'}</span>
                    ${tagsHtml}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;
            
            // ... (Listeners de clique do card continuam iguais) ...
            const btnResume = card.querySelector(".cw-resume-btn");
            btnResume.onclick = async () => {
                const confirmed = await confirmDialog("Retomar este rascunho? O formulário atual será substituído.");
                if(confirmed) {
                    onLoadDraft(draft);
                    DraftService.delete(draft.id); 
                    renderDrawerList();
                    updateBadge();
                    toggleDrawer(false);
                    SoundManager.playSwoosh();
                    showToast("Rascunho carregado.");
                }
            };
            const btnDel = card.querySelector(".cw-del-btn");
            btnDel.onclick = async () => {
                const confirmed = await confirmDialog("Excluir este rascunho?", { danger: true });
                if(confirmed) {
                    DraftService.delete(draft.id);
                    renderDrawerList();
                    updateBadge();
                }
            };

            drawerList.appendChild(card);
        });
    }

    // Inicializa o badge na carga
    updateBadge();

    return {
        parkButton,
        historyBtnWrapper,
        drawer
    };
}