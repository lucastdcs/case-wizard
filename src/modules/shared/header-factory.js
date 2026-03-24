// src/modules/shared/header-factory.js

import { makeDraggable } from './utils.js';

// Configuração Visual do Header (Dark Glass)
const HEADER_STYLE = {
    height: '56px',
    padding: '0 20px', 
    backgroundColor: 'rgba(28, 28, 32, 0.85)', 
    backdropFilter: 'blur(12px)',
    webkitBackdropFilter: 'blur(12px)', 
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#E8EAED', 
    fontFamily: "'Google Sans', Roboto, sans-serif",
    fontWeight: '500',
    letterSpacing: '0.5px',
    cursor: 'grab',
    position: 'relative',
    borderRadius: '16px 16px 0 0', 
    flexShrink: '0',
    userSelect: 'none',
    boxSizing: 'border-box'
};
const BTN_STYLE = {
    width: '32px', 
    height: '32px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: '50%', 
    cursor: 'pointer', 
    color: '#9AA0A6', 
    transition: 'all 0.2s ease'
};

export function createStandardHeader(popupElement, titleText, versionText, helpDescription, animRefs, onCloseCallback) {
    const header = document.createElement("div");
    Object.assign(header.style, HEADER_STYLE);
    
    // 1. Aplica Drag
    makeDraggable(popupElement, header);

    // 2. A Linha Gradiente
    const gradientLine = document.createElement("div");
    Object.assign(gradientLine.style, {
        position: 'absolute', bottom: '0', left: '0', width: '100%', height: '2px',
        background: 'linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)',
        backgroundSize: '300% auto',
        zIndex: '10', opacity: '0.8'
    });

    if (!document.getElementById('cw-header-anim')) {
        const style = document.createElement('style');
        style.id = 'cw-header-anim';
        style.innerHTML = `
            @keyframes cw-header-flow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
    gradientLine.style.animation = 'cw-header-flow 6s linear infinite';

    header.appendChild(gradientLine);
    
    if (animRefs) {
        animRefs.googleLine = gradientLine;
    }

    // 3. Lado Esquerdo (Logo + Título)
    const leftDiv = document.createElement("div");
    Object.assign(leftDiv.style, { display: 'flex', alignItems: 'center', gap: '12px' });

    const logo = document.createElement("img");
    logo.src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";
    Object.assign(logo.style, { width: "20px", height: "20px", pointerEvents: "none" });

    const title = document.createElement("span");
    title.textContent = titleText;
    
    leftDiv.appendChild(logo);
    leftDiv.appendChild(title);

    // 4. Lado Direito (Botões)
    const rightDiv = document.createElement("div");
    Object.assign(rightDiv.style, { display: 'flex', alignItems: 'center', gap: '4px' });

    // Ícones SVG
    const helpIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    const closeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    // Botão Ajuda
    const helpBtn = document.createElement("div");
    helpBtn.innerHTML = helpIcon;
    Object.assign(helpBtn.style, BTN_STYLE);
    helpBtn.title = "Sobre & Feedback"; // Tooltip atualizado
    helpBtn.classList.add('no-drag');
    
    helpBtn.onmouseenter = () => { helpBtn.style.background = 'rgba(255,255,255,0.1)'; helpBtn.style.color = '#FFF'; };
    helpBtn.onmouseleave = () => { 
        if (helpBtn.style.color !== 'rgb(138, 180, 248)') { 
            helpBtn.style.background = 'transparent'; helpBtn.style.color = '#9AA0A6'; 
        }
    };

    // Botão Fechar
    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = closeIcon;
    Object.assign(closeBtn.style, BTN_STYLE);
    closeBtn.title = "Fechar";
    closeBtn.classList.add('no-drag', 'cw-header-close');

    closeBtn.onmouseenter = () => { closeBtn.style.background = 'rgba(242, 139, 130, 0.2)'; closeBtn.style.color = '#F28B82'; }; 
    closeBtn.onmouseleave = () => { closeBtn.style.background = 'transparent'; closeBtn.style.color = '#9AA0A6'; };
    
    closeBtn.onmousedown = (e) => e.stopPropagation(); 
    helpBtn.onmousedown = (e) => e.stopPropagation();

    closeBtn.onclick = onCloseCallback;

    // --- HELP OVERLAY (Com Link de Feedback) ---
    const overlay = createHelpOverlay(popupElement, titleText, versionText, helpDescription);
    
    helpBtn.onclick = (e) => {
        e.stopPropagation();
        const isVisible = overlay.style.opacity === "1";
        if (isVisible) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            helpBtn.style.color = "#9AA0A6";
            helpBtn.style.background = "transparent";
        } else {
            overlay.style.opacity = "1";
            overlay.style.pointerEvents = "auto";
            helpBtn.style.color = "#8AB4F8"; 
            helpBtn.style.background = "rgba(138, 180, 248, 0.1)";
        }
    };

    rightDiv.appendChild(helpBtn);
    rightDiv.appendChild(closeBtn);
    
    header.appendChild(leftDiv);
    header.appendChild(rightDiv);

    return header;
}

function createHelpOverlay(parentPopup, title, version, description) {
    const overlay = document.createElement("div");
    
    // Estilo do Overlay
    Object.assign(overlay.style, {
        position: "absolute",
        top: "56px", 
        left: "0",
        width: "100%",
        height: "calc(100% - 56px)",
        backgroundColor: "rgba(255, 255, 255, 0.98)", // Quase sólido para leitura
        backdropFilter: "blur(8px)",
        zIndex: "50",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "24px", boxSizing: "border-box",
        opacity: "0", transition: "opacity 0.2s ease",
        pointerEvents: "none",
        borderRadius: "0 0 16px 16px"
    });

    overlay.innerHTML = `
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${title}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Versão ${version}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${description}
        </div>

        <div style="margin-bottom: 32px;">
            <a href="https://forms.gle/vkvMzSEiuEHpTnKu6" target="_blank" id="cw-feedback-link" style="
                display: inline-flex; align-items: center; gap: 8px;
                padding: 10px 20px;
                background-color: #F8F9FA;
                border: 1px dashed #1a73e8;
                border-radius: 20px;
                color: #1a73e8;
                font-size: 13px;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.2s ease;
            ">
                <span>💬</span> Reportar Bug ou Sugestão
            </a>
        </div>

        <div style="font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `;
    
    // Efeito hover no link de feedback via JS
    setTimeout(() => {
        const link = overlay.querySelector('#cw-feedback-link');
        if(link) {
            link.onmouseenter = () => { link.style.backgroundColor = "#E8F0FE"; link.style.transform = "scale(1.02)"; };
            link.onmouseleave = () => { link.style.backgroundColor = "#F8F9FA"; link.style.transform = "scale(1)"; };
        }

        const btn = overlay.querySelector('#close-help-internal');
        if(btn) {
            btn.onmouseover = () => btn.style.backgroundColor = "#f8f9fa";
            btn.onmouseout = () => btn.style.backgroundColor = "white";
            btn.onclick = () => {
                overlay.style.opacity = "0";
                overlay.style.pointerEvents = "none";
            };
        }
    }, 0);

    parentPopup.appendChild(overlay);
    return overlay;
}