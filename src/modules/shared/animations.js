// src/modules/shared/animations.js

import { SoundManager } from "./sound-manager.js";
// 1. INJEÇÃO DE ESTILOS (CSS do Módulo + Animações)
if (!document.getElementById('cw-module-styles')) {
    const style = document.createElement('style');
    style.id = 'cw-module-styles';
    style.innerHTML = `
        /* MÓDULO BASE */
        .cw-module-window {
            /* Animação Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s var(--cw-ease-decelerate),
                filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05); /* Começa dentro do botão */
            
            /* Visual Ceramic Light */
            background: #F8F9FA;
            backdrop-filter: blur(12px);
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 16px;
            overflow: hidden;
            
            /* Fonte Base */
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* ESTADO ABERTO (Ativo) */
        .cw-module-window.open {
            opacity: 1; 
            transform: scale(1); 
            pointer-events: auto;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* FIX DO DESLOCAMENTO: */
            /* Scale muito sutil (0.99) para não "puxar" para o lado */
            transform: scale(0.99); 
            
            /* O efeito vem daqui: */
            opacity: 0.9;
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */
            
            cursor: pointer; /* Indica clicável */
        }
    `;
    document.head.appendChild(style);
}

// --- ESC GLOBAL: fecha qualquer popup de módulo aberto ---
// Todo módulo (Notes, Email, Call Script, Links, Biblioteca, Timezone,
// Configs, BAU Form, Broadcast) compartilha a mesma marcação via
// createStandardHeader() (.cw-module-window + botão .cw-header-close), então
// um único listener genérico cobre o app inteiro sem cada módulo precisar
// implementar o próprio Esc. Cede a vez se um dialog customizado
// (alertDialog/confirmDialog/promptDialog) estiver por cima, para não fechar
// os dois de uma vez só.
if (!window._cwEscapeListenerActive) {
    window._cwEscapeListenerActive = true;
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (document.querySelector('.cw-dialog-overlay')) return;

        const openWindow = document.querySelector('.cw-module-window.open');
        if (!openWindow) return;

        const closeBtn = openWindow.querySelector('.cw-header-close');
        if (closeBtn) closeBtn.click();
    });
}

/**
 * Gerencia a animação Genie e o Foco
 */
export function toggleGenieAnimation(show, popup, buttonId) {
    const btn = document.getElementById(buttonId);
    if (!popup) return;

    // A animação mais disparada do app inteiro (9 módulos, várias aberturas
    // por turno) não tinha nenhuma proteção de reduced-motion - a física de
    // voo (translate+scale) some, mas a posição final é aplicada do mesmo
    // jeito, só sem o trajeto animado.
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Verifica se é a primeira vez (Centro) ou se já foi movido (Customizado)
    const isCustomPosition = popup.getAttribute("data-moved") === "true";

    // 1. ONDE ESTÁ O BOTÃO? (Origem)
    let btnCenter = { x: 0, y: 0 };
    if (btn) {
        const btnRect = btn.getBoundingClientRect();
        btnCenter.x = btnRect.left + (btnRect.width / 2);
        btnCenter.y = btnRect.top + (btnRect.height / 2);
    }

    // 2. ONDE É O DESTINO?
    let destX, destY;

    if (!isCustomPosition) {
        // CASO A: Primeira vez -> Centro da Tela
        destX = window.innerWidth / 2;
        destY = window.innerHeight / 2;
    } else {
        // CASO B: Já foi movido -> Posição Atual do DOM
        // Pegamos o boundingBox atual (mesmo oculto, ele guarda a posição top/left setada pelo drag)
        const rect = popup.getBoundingClientRect();
        
        // O centro do popup na posição onde ele foi deixado
        destX = rect.left + (rect.width / 2);
        destY = rect.top + (rect.height / 2);
        
        // Fallback de segurança: Se por algum motivo as coordenadas forem 0 (bug de display none)
        // forçamos voltar ao centro para não quebrar.
        if (destX === 0 && destY === 0) {
            destX = window.innerWidth / 2;
            destY = window.innerHeight / 2;
        }
    }

    // 3. CALCULA O DELTA (Distância do voo)
    const deltaX = btnCenter.x - destX;
    const deltaY = btnCenter.y - destY;

    if (show) {
        // --- ABRIR ---
        SoundManager.playGenieOpen();

        // A. RESET INSTANTÂNEO
        popup.style.transition = 'none';
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'auto';
        // will-change só durante a animação em si (~500ms) - este popup é 1
        // de ~9 janelas de módulo que existem no DOM o tempo todo, então
        // deixar isso ligado sempre desperdiçaria memória de GPU nas 8 que
        // estão fechadas e paradas.
        popup.style.willChange = 'transform, opacity';
        setTimeout(() => { popup.style.willChange = 'auto'; }, 550);

        // B. POSIÇÃO DE PARTIDA (NO BOTÃO)
        if (!isCustomPosition) {
            // Se for centralizado, precisamos manter o offset de -50%
            popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.05)`;
        } else {
            // Se for posição fixa (drag), NÃO usamos translate -50%
            popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.05)`;
        }

        // C. REFLOW
        void popup.offsetWidth;

        // D. ANIMAÇÃO DE ENTRADA
        requestAnimationFrame(() => {
            popup.classList.add('open'); // Suas classes de controle
            if (btn) btn.classList.add('active');

            // Física Apple
            popup.style.transition = reduceMotion
                ? "opacity 0.15s ease"
                : "opacity 0.4s ease-out, transform 0.5s var(--cw-ease-decelerate)";
            popup.style.opacity = '1';

            // POSIÇÃO FINAL (DESTINO)
            if (!isCustomPosition) {
                // Volta para o centro perfeito
                popup.style.transform = "translate(-50%, -50%) scale(1)";
            } else {
                // Fica onde o top/left mandam (sem offset de translate)
                popup.style.transform = "translate(0, 0) scale(1)";
            }
        });
        
        // Listeners (Idle, etc)
        if (typeof setupIdleListener === 'function') setupIdleListener(popup, buttonId);

    } else {
        // --- FECHAR ---
SoundManager.playSwoosh();
        // A. CONFIGURA SAÍDA
        popup.style.transition = reduceMotion
            ? "opacity 0.15s ease"
            : "opacity 0.25s ease, transform 0.3s var(--cw-ease-accelerate)";
        popup.style.pointerEvents = 'none';
        popup.style.willChange = 'transform, opacity';

        // B. ANIMAÇÃO DE SAÍDA (VOLTA PRO BOTÃO)
        requestAnimationFrame(() => {
            popup.style.opacity = '0';
            
            if (!isCustomPosition) {
                popup.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.1)`;
            } else {
                popup.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
            }
        });

        // C. LIMPEZA
        setTimeout(() => {
            popup.classList.remove('open');
            if (btn) btn.classList.remove('active');
            
            // Limpa estilos
            popup.style.transition = '';
            popup.style.transform = '';
            popup.style.willChange = 'auto';
            // IMPORTANTE: Não limpamos top/left aqui, para a memória persistir
        }, 300);

        if (typeof removeIdleListener === 'function') removeIdleListener(popup);
    }
}

// --- GERENCIAMENTO DE FOCO (IDLE SYSTEM) ---

function setupIdleListener(popup, buttonId) {
    // Remove anterior para não acumular
    removeIdleListener(popup);

    const handler = (e) => {
        // Se o popup já fechou, aborta
        if (!popup.classList.contains('open')) return;

        const clickInModule = popup.contains(e.target);
        // Verifica se clicou na Pílula inteira (para não dar idle enquanto arrasta ou clica em outro)
        const pill = document.querySelector('.cw-pill');
        const clickInPill = pill && pill.contains(e.target);

        if (clickInModule) {
            // Clicou no módulo: FOCA
            popup.classList.remove('idle');
            popup.style.zIndex = '2147483648'; // Traz pra frente
        } else if (clickInPill) {
            // Clicou na pílula: 
            // NÃO faz nada aqui. O evento de click do botão vai cuidar de fechar.
            // Se colocarmos 'idle' aqui, ele briga com o toggle de fechar.
        } else {
            // Clicou no vazio: IDLE
            popup.classList.add('idle');
            popup.style.zIndex = '2147483646'; // Recua
        }
    };
    
    popup._idleHandler = handler;
    document.addEventListener('mousedown', handler);
}

function removeIdleListener(popup) {
    if (popup._idleHandler) {
        document.removeEventListener('mousedown', popup._idleHandler);
        popup._idleHandler = null;
    }
}