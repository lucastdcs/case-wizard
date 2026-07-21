// src/modules/personal-library/personal-library-assistant.js

import { stylePopup, styleResizeHandle, makeResizable, showToast, confirmDialog, promptDialog } from "../shared/utils.js";
import { createStandardHeader } from "../shared/header-factory.js";
import { toggleGenieAnimation } from "../shared/animations.js";
import { SoundManager } from "../shared/sound-manager.js";
import { SnippetService } from "./snippet-service.js";

export function initPersonalLibrary() {
    const CURRENT_VERSION = "v1.1";
    let visible = false;
    let currentTab = 'general'; // general, note, email
    let editorOverlay = null;
    let currentEditingId = null;

    // --- GEMINI ASSETS ---
    const GEMINI_ASSETS = {
        tabs: {
            general: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
            note: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z"></path><path d="M15 3v6h6"></path><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>`,
            email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
        },
        actions: {
            copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
            edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
            delete: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
            add: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
        },
        toolbar: {
            bold: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>`,
            italic: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>`,
            code: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
            image: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
        },
        empty: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(26, 115, 232, 0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>`,
        media: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
    };

    // --- INJEÇÃO DE ESTILOS GLOBAIS (GEMINI AURA) ---
    if (!document.getElementById('cw-lib-styles')) {
        const style = document.createElement('style');
        style.id = 'cw-lib-styles';
        style.innerHTML = `
            @keyframes geminiAura {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            .cw-aura-card {
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
                background: rgba(255, 255, 255, 0.7) !important;
                backdrop-filter: blur(16px) !important;
                border: 1px solid rgba(255, 255, 255, 0.4) !important;
                position: relative;
                z-index: 1;
            }
            .cw-aura-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(135deg, rgba(138, 180, 248, 0.15), rgba(197, 138, 249, 0.15), rgba(242, 139, 130, 0.15));
                background-size: 400% 400%;
                z-index: -1;
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .cw-aura-card:hover {
                transform: translateY(-6px) scale(1.01);
                box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
                border-color: rgba(255, 255, 255, 0.8) !important;
            }
            .cw-aura-card:hover::before {
                opacity: 1;
                animation: geminiAura 8s ease infinite;
            }
            .cw-tactile { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.96) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #474747; }
            .cw-toolbar-btn:hover { background: rgba(0,0,0,0.04); color: #1a73e8; }
            .cw-toolbar-btn.active { background: rgba(26, 115, 232, 0.1); color: #1a73e8; border-color: rgba(26, 115, 232, 0.2); }
            .cw-shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
            #library-popup {
                width: 650px !important;
                max-width: 95vw !important;
                height: 700px !important;
                max-height: 90vh !important;
            }
            .cw-lib-loading-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(8px);
                z-index: 1000;
                display: none;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 16px;
                animation: cwLibFadeIn 0.3s ease;
            }
            .cw-lib-loading-overlay.active {
                display: flex;
            }
            .cw-lib-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(26, 115, 232, 0.1);
                border-top-color: #1a73e8;
                border-radius: 50%;
                animation: cwLibRotate 0.8s linear infinite;
                margin-bottom: 12px;
            }
            .cw-lib-loading-text {
                font-size: 14px;
                font-weight: 600;
                color: #1a73e8;
                letter-spacing: 0.3px;
            }
            @keyframes cwLibRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes cwLibFadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // --- DESIGN SYSTEM ---
    const COLORS = {
        bg: "linear-gradient(180deg, #F8FAFD 0%, #EEF2F8 100%)",
        surface: "rgba(255, 255, 255, 0.85)",
        glass: "rgba(255, 255, 255, 0.7)",
        primary: "#1a73e8",
        primaryLight: "rgba(26, 115, 232, 0.1)",
        text: "#1f1f1f",
        textSub: "#474747",
        border: "rgba(0, 0, 0, 0.06)",
        danger: "#d93025"
    };

    const styles = {
        container: { display: 'flex', flexDirection: 'column', height: '100%', background: COLORS.bg, fontFamily: "'Google Sans', Roboto, sans-serif" },
        
        // Tabs
        tabHeader: { display: 'flex', padding: '16px 24px 0 24px', background: 'transparent', borderBottom: `1px solid ${COLORS.border}`, gap: '8px' },
        tabBtn: { 
            flex: 1, padding: '14px 16px', textAlign: 'center', cursor: 'pointer',
            fontSize: '14px', fontWeight: '500', color: COLORS.textSub,
            borderBottom: '3px solid transparent', transition: 'all 0.3s ease', userSelect: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            borderRadius: '12px 12px 0 0'
        },
        tabActive: { color: COLORS.primary, borderBottomColor: COLORS.primary, fontWeight: '600', background: 'rgba(26, 115, 232, 0.04)' },

        // List
        listContainer: {
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
            alignContent: 'start'
        },
        emptyState: { padding: '60px 24px', textAlign: 'center', color: COLORS.textSub, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', gridColumn: '1 / -1' },

        // Card
        card: {
            background: COLORS.surface, borderRadius: '24px', padding: '20px',
            border: `1px solid ${COLORS.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)', cursor: 'default',
            position: 'relative',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        },
        cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
        cardTitle: { fontSize: '15px', fontWeight: '600', color: COLORS.text, letterSpacing: '-0.01em' },
        cardPreview: { fontSize: '13px', color: COLORS.textSub, lineHeight: '1.6', display: '-webkit-box', webkitLineClamp: '3', webkitBoxOrient: 'vertical', overflow: 'hidden' },
        
        // Actions
        cardActions: { 
            display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px',
            paddingTop: '16px', borderTop: `1px solid ${COLORS.border}`
        },
        actionBtn: { 
            padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '500',
            cursor: 'pointer', border: 'none', background: 'transparent', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: '6px'
        },

        // Floating Action Button (FAB)
        fab: {
            position: 'absolute', bottom: '32px', right: '32px',
            width: '64px', height: '64px', borderRadius: '20px',
            background: `linear-gradient(135deg, ${COLORS.primary}, #0059c1)`, color: '#FFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(26, 115, 232, 0.4)',
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 10
        },

        // Editor Overlay
        editorOverlay: {
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(30px) saturate(180%)',
            webkitBackdropFilter: 'blur(30px) saturate(180%)',
            zIndex: 20, transform: 'translateY(100%)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex', flexDirection: 'column'
        },
        editorHeader: {
            padding: '24px 32px', background: 'transparent', borderBottom: `1px solid ${COLORS.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        },
        editorBody: { flex: 1, padding: '32px', overflowY: 'auto' },
        
        // Inputs
        inputGroup: { marginBottom: '24px' },
        label: { display: 'block', fontSize: '13px', fontWeight: '600', color: COLORS.textSub, marginBottom: '10px', letterSpacing: '0.02em' },
        input: {
            width: '100%', padding: '14px 18px', borderRadius: '14px', border: `1px solid ${COLORS.border}`,
            fontSize: '15px', fontFamily: 'inherit', outline: 'none', background: COLORS.surface,
            transition: 'all 0.2s ease', boxSizing: 'border-box'
        }
    };

    // --- POPUP SETUP ---
    const popup = document.createElement("div");
    popup.id = "library-popup";
    popup.classList.add("cw-module-window");
    Object.assign(popup.style, stylePopup, { 
        right: "auto", left: "50%", width: "650px", height: "700px",
        maxHeight: "90vh",
        transform: "translateX(-50%) scale(0.05)"
    });

    const animRefs = { popup };
    const header = createStandardHeader(
        popup, "Minha Biblioteca", CURRENT_VERSION, 
        "Gerencie seus snippets, textos e templates.", 
        animRefs, () => toggleVisibility()
    );
    popup.appendChild(header);

    const container = document.createElement("div");
    Object.assign(container.style, styles.container);
    popup.appendChild(container);

    // --- TABS ---
    const tabHeader = document.createElement("div");
    Object.assign(tabHeader.style, styles.tabHeader);

    const tabs = [
        { id: 'general', label: 'Geral', icon: GEMINI_ASSETS.tabs.general },
        { id: 'note', label: 'Notas', icon: GEMINI_ASSETS.tabs.note },
        { id: 'email', label: 'Emails', icon: GEMINI_ASSETS.tabs.email }
    ];

    tabs.forEach(t => {
        const btn = document.createElement("div");
        btn.innerHTML = `${t.icon} <span>${t.label}</span>`;
        btn.id = `lib-tab-${t.id}`;
        Object.assign(btn.style, styles.tabBtn);
        if(t.id === currentTab) Object.assign(btn.style, styles.tabActive);
        
        btn.onmouseenter = () => SoundManager.playHover();
        btn.onclick = () => switchTab(t.id);
        tabHeader.appendChild(btn);
    });
    container.appendChild(tabHeader);

    // --- LISTA ---
    const listContainer = document.createElement("div");
    Object.assign(listContainer.style, styles.listContainer);
    container.appendChild(listContainer);

    // --- FAB (Add Button) ---
    const fab = document.createElement("div");
    fab.className = "cw-fab cw-tactile";
    Object.assign(fab.style, styles.fab);
    fab.innerHTML = GEMINI_ASSETS.actions.add;
    fab.onmouseenter = () => { fab.style.transform = "scale(1.1)"; fab.style.boxShadow = "0 12px 32px rgba(26, 115, 232, 0.5)"; };
    fab.onmouseleave = () => { fab.style.transform = "scale(1)"; fab.style.boxShadow = "0 8px 24px rgba(26, 115, 232, 0.4)"; };
    fab.onclick = () => openEditor();
    container.appendChild(fab);

    // --- EDITOR OVERLAY ---
    editorOverlay = document.createElement("div");
    Object.assign(editorOverlay.style, styles.editorOverlay);
    
    // Header do Editor
    const edHead = document.createElement("div");
    Object.assign(edHead.style, styles.editorHeader);
    edHead.innerHTML = `<span style="font-weight:700; font-size:16px;">Novo Item</span>`;
    
    const closeEd = document.createElement("button");
    closeEd.innerHTML = "Cancelar";
    closeEd.style.cssText = "background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;";
    closeEd.onclick = closeEditor;
    edHead.appendChild(closeEd);
    editorOverlay.appendChild(edHead);

    // Body do Editor
    const edBody = document.createElement("div");
    Object.assign(edBody.style, styles.editorBody);
    editorOverlay.appendChild(edBody);

    // Footer do Editor (Save)
    const edFooter = document.createElement("div");
    edFooter.style.cssText = "padding:24px 32px; border-top:1px solid rgba(0,0,0,0.06); background:transparent; display:flex; justify-content:flex-end;";
    
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Salvar";
    saveBtn.style.cssText = "padding:12px 32px; background:linear-gradient(135deg, #1a73e8, #0059c1); color:white; border:none; border-radius:14px; font-weight:600; cursor:pointer; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition: all 0.2s;";
    saveBtn.onclick = handleSave;
    edFooter.appendChild(saveBtn);
    editorOverlay.appendChild(edFooter);

    // Blocking Loading Overlay
    const libLoadingOverlay = document.createElement("div");
    libLoadingOverlay.className = "cw-lib-loading-overlay";
    libLoadingOverlay.innerHTML = `
        <div class="cw-lib-spinner"></div>
        <div class="cw-lib-loading-text">Salvando...</div>
    `;
    editorOverlay.appendChild(libLoadingOverlay);

    container.appendChild(editorOverlay);

    // --- RESIZE HANDLE ---
    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, styleResizeHandle);
    resizeHandle.className = "no-drag";
    popup.appendChild(resizeHandle);
    makeResizable(popup, resizeHandle);

    document.body.appendChild(popup);

    // --- LÓGICA ---

    function switchTab(id) {
        SoundManager.playClick();
        currentTab = id;
        
        // Atualiza UI Tabs
        tabs.forEach(t => {
            const btn = document.getElementById(`lib-tab-${t.id}`);
            if (t.id === id) {
                Object.assign(btn.style, styles.tabActive);
            } else {
                Object.assign(btn.style, styles.tabBtn);
            }
        });

        renderList();
    }

    function renderList() {
        listContainer.innerHTML = "";
        const items = SnippetService.getSnippets(currentTab);

        if (items.length === 0) {
            listContainer.innerHTML = `
                <div style="${objectToCss(styles.emptyState)}">
                    <div style="opacity:0.8;">${GEMINI_ASSETS.empty}</div>
                    <div style="font-weight:600; font-size:16px; color:${COLORS.text};">Nada aqui ainda.</div>
                    <div style="font-size:14px; opacity:0.7;">Clique no botão de adicionar para começar sua coleção.</div>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "cw-aura-card";
            Object.assign(card.style, styles.card);

            if (item.isCode) {
                card.style.borderLeft = `4px solid ${COLORS.primary}`;
                card.style.background = "rgba(26, 115, 232, 0.02)";
            }

            // Sanitização básica ou processamento para preview
            let previewContent = item.content;
            let mediaIndicator = "";
            if (item.isRich) {
                const temp = document.createElement('div');
                temp.innerHTML = item.content;
                const hasImages = temp.querySelector('img');
                previewContent = temp.innerText.substring(0, 150) + (temp.innerText.length > 150 ? '...' : '');
                if (hasImages) {
                    mediaIndicator = `<span style="display:inline-flex; align-items:center; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:2px 8px; border-radius:10px; font-size:11px; margin-bottom:8px; font-weight:600;">${GEMINI_ASSETS.media} Media</span>`;
                }
            }

            card.innerHTML = `
                <div style="${objectToCss(styles.cardHeader)}">
                    <div style="${objectToCss(styles.cardTitle)}">${item.title}</div>
                    <div style="display:flex; gap:6px;">
                        ${item.isCode ? `<span style="font-size:10px; background:rgba(0,0,0,0.05); color:#474747; padding:3px 8px; border-radius:6px; font-family:monospace; font-weight:700;">CODE</span>` : ''}
                        ${currentTab === 'email' ? `<span style="font-size:10px; background:rgba(26, 115, 232, 0.1); color:#1a73e8; padding:3px 8px; border-radius:6px; font-weight:700;">TEMPLATE</span>` : ''}
                    </div>
                </div>
                ${mediaIndicator}
                <div style="${objectToCss(styles.cardPreview)}; ${item.isCode ? "font-family:'Roboto Mono', monospace; font-size:12px; background:rgba(0,0,0,0.02); padding:12px; border-radius:12px;" : ""}">${previewContent}</div>
                <div style="${objectToCss(styles.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${objectToCss(styles.actionBtn)}; color:#1a73e8;">
                        ${GEMINI_ASSETS.actions.copy}
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${objectToCss(styles.actionBtn)}; color:#474747;">
                        ${GEMINI_ASSETS.actions.edit}
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${objectToCss(styles.actionBtn)}; color:#d93025;">
                        ${GEMINI_ASSETS.actions.delete}
                        <span>Excluir</span>
                    </button>
                </div>
            `;

            // Listeners
            card.onmouseenter = () => { 
                SoundManager.playHover();
                // O efeito de lift agora é via classe CSS cw-lib-card
            };

            card.querySelector('.cw-act-copy').onclick = (e) => {
                e.stopPropagation();
                SoundManager.playClick();

                if (item.isRich) {
                    const blob = new Blob([item.content], { type: 'text/html' });
                    const plainText = document.createElement('div');
                    plainText.style.whiteSpace = 'pre-wrap'; // Mantém formatação de código
                    plainText.innerHTML = item.content;
                    const blobText = new Blob([plainText.innerText], { type: 'text/plain' });
                    const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': blobText })];
                    navigator.clipboard.write(data);
                } else {
                    navigator.clipboard.writeText(item.content);
                }

                showToast("Copiado!");
            };

            card.querySelector('.cw-act-edit').onclick = (e) => {
                e.stopPropagation();
                SoundManager.playClick();
                openEditor(item);
            };

            card.querySelector('.cw-act-del').onclick = async (e) => {
                e.stopPropagation();
                SoundManager.playClick();
                const confirmed = await confirmDialog("Excluir este item?");
                if(confirmed) {
                    SnippetService.delete(item.id);
                    renderList();
                    showToast("Item excluído.");
                }
            };

            listContainer.appendChild(card);
        });
    }

    function openEditor(item = null) {
        currentEditingId = item ? item.id : null;
        
        // Limpa e Reconstrói o Form baseado na Tab
        edBody.innerHTML = "";
        
        // Campo Título (Comum a todos)
        edBody.appendChild(createInputBlock("title", "Título / Nome", item ? item.title : ""));

        // Campos Específicos
        if (currentTab === 'email') {
            edBody.appendChild(createInputBlock("subject", "Assunto do Email", item ? item.subject : ""));
        }

        // Campo Conteúdo (Comum, mas label varia)
        let contentLabel = "Conteúdo";
        if (currentTab === 'email') contentLabel = "Corpo do Email (HTML)";
        if (currentTab === 'note') contentLabel = "Texto da Nota (Reason)";
        
        edBody.appendChild(createInputBlock("content", contentLabel, item ? item.content : "", {
            isRich: true,
            isCode: item ? item.isCode : false
        }));

        // Feedback visual da abertura
        edHead.querySelector("span").textContent = item ? "Editar Item" : "Novo Item";
        editorOverlay.style.transform = "translateY(0)";
        
        setTimeout(() => {
            const firstInput = edBody.querySelector("input");
            if(firstInput) firstInput.focus();
        }, 300);
    }

    function closeEditor() {
        editorOverlay.style.transform = "translateY(100%)";
        // Pequeno delay para resetar estado
        setTimeout(() => currentEditingId = null, 300);
    }

    async function handleSave() {
        const titleInput = edBody.querySelector("#cw-inp-title");
        const contentInput = edBody.querySelector("#cw-inp-content");
        
        const title = titleInput.value.trim();
        // Se for contenteditable, pegamos o innerHTML
        const content = contentInput.contentEditable === "true" ? contentInput.innerHTML : contentInput.value.trim();
        const isCode = contentInput.getAttribute('data-is-code') === 'true';

        if (!title || (!content || content === '<br>')) {
            showToast("Preencha título e conteúdo.", { error: true });
            return;
        }

        const payload = {
            id: currentEditingId, // Se null, cria novo
            type: currentTab,
            title: title,
            content: content,
            isCode: isCode,
            isRich: contentInput.contentEditable === "true"
        };

        if (currentTab === 'email') {
            const subject = edBody.querySelector("#cw-inp-subject").value.trim();
            if(!subject) {
                showToast("Assunto é obrigatório para emails.", { error: true });
                return;
            }
            payload.subject = subject;
        }

        // Exibe overlay de carregamento bloqueante
        libLoadingOverlay.classList.add('active');
        saveBtn.disabled = true;

        try {
            await SnippetService.save(payload);

            // Re-renderiza a lista automaticamente por trás da tela
            renderList();

            // Fecha o editor automaticamente
            closeEditor();

            showToast("Salvo com sucesso!");
            SoundManager.playSuccess();
        } catch (error) {
            console.error("Erro ao salvar nota:", error);
            showToast("Erro ao salvar nota.", { error: true });
        } finally {
            libLoadingOverlay.classList.remove('active');
            saveBtn.disabled = false;
        }
    }

    // --- HELPER DE UI ---
    function createInputBlock(id, labelText, value, options = {}) {
        const div = document.createElement("div");
        Object.assign(div.style, styles.inputGroup);
        
        const label = document.createElement("label");
        label.textContent = labelText;
        Object.assign(label.style, styles.label);
        
        let input;
        if (options.isRich) {
            const toolbar = document.createElement("div");
            toolbar.style.cssText = "display:flex; gap:8px; margin-bottom:14px; background:rgba(255, 255, 255, 0.5); padding:8px; border-radius:14px; border:1px solid rgba(0,0,0,0.06); backdrop-filter: blur(10px); width: fit-content;";

            toolbar.innerHTML = `
                <button type="button" class="cw-toolbar-btn cw-tb-bold cw-tactile" title="Negrito">
                    ${GEMINI_ASSETS.toolbar.bold}
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-italic cw-tactile" title="Itálico">
                    ${GEMINI_ASSETS.toolbar.italic}
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-code cw-tactile" title="Formato Código">
                    ${GEMINI_ASSETS.toolbar.code}
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-img cw-tactile" title="Inserir Imagem">
                    ${GEMINI_ASSETS.toolbar.image}
                </button>
            `;

            input = document.createElement("div");
            input.contentEditable = "true";
            Object.assign(input.style, styles.input, {
                minHeight: '180px', maxHeight: '350px', overflowY: 'auto',
                whiteSpace: 'pre-wrap', lineHeight: '1.6', outline: 'none'
            });
            input.innerHTML = value || "";

            if (options.isCode) {
                input.style.fontFamily = "'Roboto Mono', monospace";
                input.style.backgroundColor = "#F8F9FA";
                input.setAttribute('data-is-code', 'true');
            }

            toolbar.querySelectorAll('.cw-toolbar-btn').forEach(btn => {
                btn.onmouseenter = () => SoundManager.playHover();
                btn.onmousedown = () => SoundManager.playClick();
            });

            toolbar.querySelector('.cw-tb-bold').onclick = () => { document.execCommand('bold'); input.focus(); };
            toolbar.querySelector('.cw-tb-italic').onclick = () => { document.execCommand('italic'); input.focus(); };
            toolbar.querySelector('.cw-tb-code').onclick = (e) => {
                 const isCode = input.getAttribute('data-is-code') === 'true';
                 const newState = !isCode;
                 input.setAttribute('data-is-code', newState);
                 input.style.fontFamily = newState ? "'Roboto Mono', monospace" : "inherit";
                 input.style.backgroundColor = newState ? "rgba(0, 122, 255, 0.03)" : COLORS.surface;

                 if (newState) {
                     e.currentTarget.classList.add('active');
                 } else {
                     e.currentTarget.classList.remove('active');
                 }
                 input.focus();
            };

            toolbar.querySelector('.cw-tb-img').onclick = async () => {
                const url = await promptDialog("Cole a URL da imagem:");
                if(url) {
                    document.execCommand('insertImage', false, url);
                    const imgs = input.querySelectorAll('img');
                    imgs.forEach(img => { img.style.maxWidth = '100%'; img.style.borderRadius = '8px'; });
                }
            };

            input.onpaste = (e) => {
                const items = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (const item of items) {
                    if (item.kind === 'file' && item.type.startsWith('image/')) {
                        e.preventDefault();
                        const blob = item.getAsFile();
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const img = `<img src="${event.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;
                            document.execCommand('insertHTML', false, img);
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            };

            div.appendChild(label);
            div.appendChild(toolbar);
        } else {
            input = document.createElement("input");
            input.type = "text";
            Object.assign(input.style, styles.input);
            input.value = value || "";
            div.appendChild(label);
        }
        
        input.id = `cw-inp-${id}`;
        
        // Efeito focus
        input.onfocus = () => { input.style.borderColor = COLORS.primary; input.style.boxShadow = `0 0 0 2px ${COLORS.primaryBg}`; };
        input.onblur = () => { input.style.borderColor = COLORS.border; input.style.boxShadow = "none"; };

        div.appendChild(input);
        return div;
    }

    function objectToCss(obj) {
        return Object.entries(obj).map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`).join(';');
    }

    function toggleVisibility() {
        visible = !visible;
        toggleGenieAnimation(visible, popup, "cw-btn-library");
        if (visible) {
            document.body.style.overflow = "hidden";
            renderList(); // Refresh ao abrir
        } else {
            document.body.style.overflow = "";
        }
    }

    return toggleVisibility;
}
