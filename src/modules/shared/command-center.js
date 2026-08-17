// src/modules/shared/command-center.js

import { DataService } from './data-service.js';
import { showToast, triggerGoogleAnimation } from './utils.js';
import { SoundManager } from './sound-manager.js';
import { ADMINS } from './config.js';
import { getAgentEmail } from './page-data.js';
import { esperar, clamp } from './dom-utils.js';
import { getCaseStreakToday, incrementCaseStreak } from './streak-tracker.js';

// --- 1. CONFIGURAÇÃO VISUAL ---
const COLORS = {
  glassBg: "rgba(61, 61, 61, 0.77)",
  glassBorder: "rgba(255, 255, 255, 0.15)",
  glassActive: "rgba(79, 79, 79, 0.89)",
  glassHighlight: "rgba(255, 255, 255, 0.08)",
  iconIdle: "#c2c5c8ff",
  iconActive: "#FFFFFF",
  
  // Cores de Marca
  blue: "#8AB4F8",   
  red: "#F28B82",    
  purple: "#C58AF9", 
  green: "#81C995",  
  orange: "#F9AB00", 
  teal: "#00BFA5",
  pink: "#F48FB1", // [NOVO] Cor para a Biblioteca
  gray: "#9AA0A6", // [NOVO] Cor para Configurações
};

// --- FUNÇÕES EXPORTADAS ---

export function updateNotesBadge(hasDrafts) {
  const btn = document.getElementById('cw-btn-notes');
  if (!btn) return;

  let badge = btn.querySelector('.cw-dot-dirty');

  if (hasDrafts) {
    if (!badge) {
      badge = document.createElement('div');
      badge.className = 'cw-dot-dirty';
      btn.appendChild(badge);
    }
  } else {
    if (badge) badge.remove();
  }
}

// Sincroniza o badge visual com o valor já salvo (chamado no boot, pra
// mostrar o número certo mesmo se o agente já tiver casos hoje antes de
// concluir mais nenhum nesta sessão).
export function syncStreakBadge() {
  const badge = document.getElementById('cw-streak-badge');
  const countEl = document.getElementById('cw-streak-count');
  if (!badge || !countEl) return;
  const count = getCaseStreakToday();
  countEl.textContent = count;
  badge.classList.toggle('visible', count > 0);

  // "Temperatura" da chama + halo da bolinha fechada (ver CSS) sobem juntos
  // com o count, nos mesmos patamares do MILESTONES que já disparam o toast
  // (5/15/30) - vivem na pílula (não no badge) porque o halo do ícone
  // colapsado também lê essas classes.
  const pill = document.querySelector('.cw-pill');
  if (pill) {
    pill.classList.toggle('has-streak', count > 0);
    pill.classList.toggle('streak-tier-2', count >= 5 && count < 15);
    pill.classList.toggle('streak-tier-3', count >= 15 && count < 30);
    pill.classList.toggle('streak-tier-4', count >= 30);
  }
}

// Chamado quando um caso é efetivamente concluído (nota gerada e inserida).
// Incrementa o contador do dia e, em marcos redondos, toca uma
// microcelebração discreta - mesmo precedente do easter egg "Sextou" em
// utils.js: o produto já aceita um toque de personalidade sem virar
// gamificação forçada.
export function registerCaseCompleted() {
  const { count, isMilestone } = incrementCaseStreak();
  syncStreakBadge();

  if (isMilestone) {
    const pill = document.querySelector('.cw-pill');
    SoundManager.playSuccess();
    if (pill) triggerGoogleAnimation(pill);
    showToast(`🔥 ${count} casos hoje!`);
  }
}

export function initCommandCenter(actions, splashDone) {
  // 1. ESTILOS
  const styleId = "cw-command-center-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            /* Google Sans (400/500/700) já vem via <link> em initGlobalStylesAndFont()
               (utils.js), que roda antes de qualquer módulo inicializar - esse @import
               era uma segunda requisição redundante e bloqueava o parse do CSSOM. */

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.3s ease;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- PILL PRINCIPAL --- */
            .cw-pill {
                position: fixed; bottom: 10%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                padding: 18px 8px;
                
                background: ${COLORS.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0;
                width: 56px;
                /* Único elemento persistente do app que anima quase o tempo
                   todo (hover em 9 botões, abrir/fechar, drag) - único caso
                   onde will-change estático (em vez de ligar/desligar por
                   interação) compensa, já que é sempre 1 elemento só. */
                will-change: transform, opacity, width;

                overflow: visible;

                /* ABRIR: A pílula expande PRIMEIRO. Curva de entrada
                   (--cw-ease-decelerate) - mesma usada pelo genie dos módulos,
                   pra parar de ser a única transição do app na curva
                   "standard" sem direção. (max-height saiu da lista: o estado
                   aberto nunca define um valor numérico pra ela, então ia de
                   /para "none" - não interpolável, a transição não fazia nada.) */
                transition:
                    width 0.3s var(--cw-ease-decelerate),
                    padding 0.3s var(--cw-ease-decelerate),
                    opacity 0.2s ease,
                    transform 0.3s var(--cw-ease-decelerate);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill { transition: opacity 0.2s ease !important; transform: none !important; }
            }

            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                max-height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;
                
                overflow: hidden !important;

                /* FECHAR: A pílula colapsa DEPOIS dos ícones (delay 0.15s -
                   mesmo instante em que o logo da bolinha começa a aparecer,
                   ver .cw-pill.collapsed .cw-main-logo abaixo, pra não sobrar
                   uma casca vazia encolhendo sem nada dentro). Curva de saída
                   (--cw-ease-accelerate), espelhando --cw-ease-decelerate da
                   abertura acima. */
                transition:
                    width 0.3s var(--cw-ease-accelerate) 0.15s,
                    padding 0.3s var(--cw-ease-accelerate) 0.15s,
                    border-radius 0.3s var(--cw-ease-accelerate) 0.15s,
                    opacity 0.2s ease 0s,
                    transform 0.3s var(--cw-ease-accelerate) 0.15s !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.collapsed { transition: opacity 0.2s ease !important; }
            }
            
            /* --- LOGO DA BOLINHA --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; 
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
                color: #fff;
                transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
            }
            /* Duas camadas de SVG empilhadas (base branca + spark com
               gradiente já embutido no próprio <linearGradient>) que fazem
               cross-fade de opacidade no hover - troca real e animável, em
               vez do mask/background-image de antes: essas duas propriedades
               não são interpoláveis em CSS, então a cor "estalava" no meio
               de um scale que era o único pedaço realmente animando. */
            .cw-main-logo svg { position: absolute; inset: 0; margin: auto; width: 24px; height: 24px; pointer-events: none; }
            .cw-main-logo .cw-logo-base { fill: #fff; opacity: 1; transition: opacity 0.25s var(--cw-ease-standard); }
            .cw-main-logo .cw-logo-spark { opacity: 0; transition: opacity 0.25s var(--cw-ease-standard); }
            @media (prefers-reduced-motion: reduce) {
                .cw-main-logo .cw-logo-base, .cw-main-logo .cw-logo-spark { transition: opacity 0.15s ease !important; }
            }

            .cw-pill:not(.collapsed) .cw-main-logo {
                transform: rotate(360deg) scale(0);
                opacity: 0;
                transition: opacity 0.2s var(--cw-ease-accelerate), transform 0.2s var(--cw-ease-accelerate);
            }
            .cw-pill.collapsed .cw-main-logo {
                opacity: 1;
                transform: rotate(0) scale(1);
                /* Aparece no mesmo instante em que a cápsula começa a
                   encolher (delay 0.15s, ver .cw-pill.collapsed acima) -
                   antes ficava 0.3s, criando ~150ms de bolha vazia entre os
                   ícones sumindo e o logo aparecer. */
                transition: opacity 0.3s var(--cw-ease-decelerate) 0.15s, transform 0.3s var(--cw-ease-decelerate) 0.15s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill:not(.collapsed) .cw-main-logo,
                .cw-pill.collapsed .cw-main-logo { transition: opacity 0.15s ease !important; transform: none !important; }
            }
            .cw-pill.collapsed:hover .cw-main-logo {
                transform: scale(1.15) rotate(0deg);
                transition-delay: 0s;
            }
            .cw-pill.collapsed:hover .cw-main-logo .cw-logo-base { opacity: 0; }
            .cw-pill.collapsed:hover .cw-main-logo .cw-logo-spark { opacity: 1; }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.collapsed:hover .cw-main-logo { transform: none !important; }
            }

            /* Halo quente atrás do raio quando há streak do dia, só na
               bolinha fechada (já que o badge com o número não aparece mais
               aí - ver .cw-streak-badge). Intensifica junto dos mesmos
               patamares do toast de marco (5/15/30, ver MILESTONES). */
            .cw-pill.collapsed.has-streak .cw-main-logo { filter: drop-shadow(0 0 6px rgba(253, 214, 99, 0.5)); transition: filter 0.3s ease; }
            .cw-pill.collapsed.streak-tier-2 .cw-main-logo { filter: drop-shadow(0 0 6px rgba(251, 188, 5, 0.55)); }
            .cw-pill.collapsed.streak-tier-3 .cw-main-logo { filter: drop-shadow(0 0 7px rgba(249, 171, 0, 0.6)); }
            .cw-pill.collapsed.streak-tier-4 .cw-main-logo { filter: drop-shadow(0 0 8px rgba(234, 67, 53, 0.65)); }

            /* --- CONTEÚDO INTERNO --- */
            .cw-pill > *:not(.cw-main-logo) {
                opacity: 1; transform: scale(1) translateY(0); visibility: visible;
                /* Aparece depois que a pílula expandiu (delay 0.15s para ser produtivo) */
                transition:
                    opacity 0.2s ease 0.15s,
                    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.15s,
                    visibility 0s linear 0.15s,
                    filter 0.15s ease 0.15s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill > *:not(.cw-main-logo) { transition: opacity 0.2s ease 0.1s !important; transform: none !important; }
            }

            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Desaparece imediatamente */
                transition:
                    opacity 0.15s ease 0s,
                    transform 0.15s ease 0s,
                    filter 0.15s ease 0s,
                    visibility 0s linear 0.15s;
            }

            /* --- CASCATAS DE ENTRADA ---
               Índices recalculados pro DOM atual (admin-tag e streak-badge
               entraram no meio do markup depois que isso foi escrito
               originalmente, empurrando todo mundo 2 posições - a lista
               antiga estava aplicando o delay do "Grip" no .cw-main-logo, o
               do "Notes" no admin-tag, etc. Efeito colateral: o logo ganhava
               um delay de abertura de 0.15s que não devia existir (ver
               .cw-pill:not(.collapsed) .cw-main-logo acima, que quer delay
               0). admin-tag/streak-badge saem da lista de propósito: cada
               um já tem sua própria transição dedicada. */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.15s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.17s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.19s; } /* BAU Form */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.21s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.23s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.25s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.27s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(12) { transition-delay: 0.29s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(13) { transition-delay: 0.31s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(14) { transition-delay: 0.33s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(15) { transition-delay: 0.35s; } /* Broadcast */

            /* --- ESTILOS DOS BOTÕES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${COLORS.iconIdle};
                flex-shrink: 0;
                transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn { transition: background 0.2s ease, color 0.2s ease !important; }
            }
            .cw-btn:hover {
                background: ${COLORS.glassHighlight};
                color: ${COLORS.iconActive};
                /* Só scale (cresce do centro), sem translateY: botões redondos
                   colados lado a lado numa fileira única - um lift vertical
                   é o caso clássico de flicker quando o mouse passa raspando
                   a borda entre dois ícones adjacentes. */
                transform: scale(1.18) !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn:hover { transform: none !important; }
            }

            .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${COLORS.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${COLORS.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${COLORS.gray} !important; background: rgba(154, 160, 166, 0.15); }
            .cw-btn.bauform.active { color: ${COLORS.blue} !important; background: rgba(66, 133, 244, 0.15); }

            .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${COLORS.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${COLORS.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${COLORS.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${COLORS.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0); opacity: 0; visibility: hidden;
                transition: transform 0.2s, opacity 0.2s; pointer-events: none;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn::before { transition: opacity 0.2s ease !important; transform: translateX(-50%) !important; }
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); opacity: 1; visibility: visible; }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
                opacity: 0; visibility: hidden; pointer-events: none; 
                transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
                border: 1px solid rgba(255,255,255,0.15); z-index: 2147483648; 
            }
            .cw-btn:hover::after { opacity: 1; visibility: visible; transform: translateY(-50%) scale(1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-btn::after { transition: opacity 0.2s ease !important; }
                .cw-btn:hover::after { transform: translateY(-50%) !important; }
            }
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            @media (prefers-reduced-motion: reduce) {
                .cw-grip:hover .cw-grip-bar { transform: none !important; }
            }
            .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.blue}; width: 16px; opacity: 1; }

            .cw-pill.dragging {
                box-shadow:
                    0 8px 32px rgba(0,0,0,0.3),
                    0 0 20px rgba(138, 180, 248, 0.4);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                transform: scale(1.02) !important;
                transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.2s ease !important;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.dragging { transform: none !important; }
            }

            /* ============================================================
               PROCESSING CENTER
               ============================================================ */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 340px !important; 
                height: auto !important; 
                min-height: 160px !important; 
                border-radius: 24px !important; 
                background: #202124 !important; 
                padding: 32px 24px !important; 
                box-shadow: 0 24px 64px rgba(0,0,0,0.6) !important; 
                display: flex !important; flex-direction: column !important; 
                justify-content: center !important; align-items: center !important;
                gap: 0 !important;
                z-index: 2147483647 !important;
            }
            .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
            
            .cw-center-stage { 
                display: flex; flex-direction: column; align-items: center; 
                gap: 20px;
                width: 100%; opacity: 0; 
                animation: fadeIn 0.3s ease forwards 0.1s;
                position: relative; 
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-stage { animation: fadeIn 0.3s ease forwards; }
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
            
            .cw-center-text { 
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 15px;
                color: #E8EAED;
                text-align: center; 
                max-width: 100%; 
                font-weight: 500; 
                line-height: 1.5; 
                letter-spacing: 0.2px;
                opacity: 0; 
                transform: translateY(10px); 
                animation: textSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                animation-delay: 0.1s;
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-text { animation: fadeIn 0.3s ease forwards; transform: none !important; }
            }

            .cw-dot-dirty {
                position: absolute; top: 8px; right: 8px;
                width: 6px; height: 6px;
                background-color: #F9AB00;
                border-radius: 50%;
                border: 1px solid #3c4043;
                pointer-events: none;
                z-index: 11;
                animation: popIn 0.3s;
            }

            .cw-admin-badge {
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%) scale(0);
                background: linear-gradient(135deg, #1a73e8, #4285f4);
                color: white;
                font-size: 8px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 20;
                white-space: nowrap;
            }
            .cw-pill:not(.collapsed) .cw-admin-badge.visible {
                transform: translateX(-50%) scale(1);
            }

            /* --- RITMO DO TURNO (contador de casos hoje) --- */
            /* Só aparece com a pílula ABERTA - é um indicador de contexto (tem
               espaço pro número, não corta em overflow:hidden), não uma
               notificação que precise brigar pela atenção na bolinha fechada.
               Segue a regra geral de "esconder no collapsed" (seletor lá em
               cima) como qualquer outro conteúdo interno; o que sobra aqui é
               só o gate extra de "só se tiver streak" pro estado aberto -
               mesmo formato de .cw-admin-badge.visible logo acima, que já
               resolve esse specificity certo. */
            .cw-streak-badge {
                position: absolute; top: -6px; right: -6px;
                background: #202124; color: #FDD663;
                font-size: 10px; font-weight: 800;
                padding: 3px 7px; border-radius: 100px;
                display: flex; align-items: center; gap: 3px;
                border: 1px solid rgba(255,255,255,0.15);
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                pointer-events: none; z-index: 25;
                transition: opacity 0.2s ease, transform 0.2s var(--cw-ease-spring), color 0.3s ease;
            }
            .cw-pill:not(.collapsed) .cw-streak-badge:not(.visible) { opacity: 0; transform: scale(0.5); }
            .cw-pill:not(.collapsed) .cw-streak-badge.visible { opacity: 1; transform: scale(1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-streak-badge { transition: opacity 0.15s ease !important; transform: none !important; }
            }
            /* Temperatura da chama sobe com o count - mesmos patamares do
               MILESTONES (5/15/30) que já disparam o toast de marco. */
            .cw-pill.streak-tier-2 #cw-streak-count { color: #FBBC05; }
            .cw-pill.streak-tier-3 #cw-streak-count { color: #F9AB00; }
            .cw-pill.streak-tier-4 #cw-streak-count { color: #EA4335; }

            .cw-center-success { display: none; color: ${COLORS.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            @media (prefers-reduced-motion: reduce) {
                .cw-center-success.show { animation: fadeIn 0.3s ease forwards; }
            }
            
            .cw-abort-btn { 
                position: relative; 
                bottom: auto; margin-top: 8px; 
                font-size: 12px; color: #9AA0A6; 
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; 
                padding: 8px 16px; border-radius: 20px; 
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                transition: all 0.2s ease; user-select: none; 
                display: flex; align-items: center; gap: 6px;
            }
            .cw-abort-btn:hover { 
                color: #F28B82; background: rgba(242, 139, 130, 0.1); border-color: rgba(242, 139, 130, 0.3);
                transform: translateY(-1px);
            }
            .cw-abort-btn:active { transform: scale(0.95); }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }

            @keyframes cw-system-ready {
                0% { transform: scale(1); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
                50% { transform: scale(1.02); box-shadow: 0 0 20px ${COLORS.blue}; }
                100% { transform: scale(1); box-shadow: 0 12px 32px rgba(0,0,0,0.25); }
            }
            .cw-pill.system-ready {
                animation: cw-system-ready 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @media (prefers-reduced-motion: reduce) {
                .cw-pill.system-ready { animation: fadeIn 0.3s ease; }
            }
        `;
    document.head.appendChild(style);
  }

  // 2. CONSTRUÇÃO DO DOM
  const ICONS = {
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    notes: `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    script: `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    links: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
    broadcast: `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    main: `<svg class="cw-logo-base" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    // Camada de cima do cross-fade do hover (bug/2 do fogo): mesmo path do
    // "main", com o gradiente das 4 cores de marca já embutido no próprio
    // SVG (em vez de mask+background-image, que não animam).
    mainSpark: `<svg class="cw-logo-spark" viewBox="0 0 24 24"><defs><linearGradient id="cw-spark-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4285F4"/><stop offset="33%" stop-color="#EA4335"/><stop offset="66%" stop-color="#FBBC05"/><stop offset="100%" stop-color="#34A853"/></linearGradient></defs><path fill="url(#cw-spark-grad)" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    timezone: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
    library: `<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`, // [NOVO]
    configs: `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    bauform: `<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3v3h-2v-3H8v-2h3V8h2v3h3v2z"/></svg>`,
  };

  const pill = document.createElement("div");
  pill.id = "cw-floating-trigger";
  pill.className = "cw-pill side-right collapsed";

  pill.innerHTML = `
        <div id="cw-command-center" style="display:none;"></div>
        <div class="cw-main-logo" title="Busca rápida: Ctrl/Cmd+K">${ICONS.main}${ICONS.mainSpark}</div>
        <div id="cw-admin-tag" class="cw-admin-badge">Admin</div>
        <div id="cw-streak-badge" class="cw-streak-badge" title="Casos concluídos hoje">🔥 <span id="cw-streak-count">0</span></div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${ICONS.notes}</button>
        <button class="cw-btn bauform" id="cw-btn-bauform" data-label="BAU Form">${ICONS.bauform}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Email Assistant">${ICONS.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${ICONS.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${ICONS.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${ICONS.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${ICONS.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configurações">${ICONS.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${ICONS.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${ICONS.check}</div>
        </div>
    `;

  const overlay = document.createElement('div');
  overlay.className = 'cw-focus-backdrop';
  document.body.appendChild(overlay);
  document.body.appendChild(pill);
  syncStreakBadge();

  // 3. LISTENERS
  const toggleModule = (btnClass, actionFn) => {
    SoundManager.playClick();
    const btn = pill.querySelector(`.${btnClass}`);
    btn.classList.toggle('active');
    actionFn();
  };

  pill.querySelector(".notes").onclick = (e) => { e.stopPropagation(); toggleModule('notes', actions.toggleNotes); };
  pill.querySelector(".bauform").onclick = (e) => { e.stopPropagation(); toggleModule('bauform', actions.toggleBAUForm); };
  pill.querySelector(".email").onclick = (e) => { e.stopPropagation(); toggleModule('email', actions.toggleEmail); };
  pill.querySelector(".script").onclick = (e) => { e.stopPropagation(); toggleModule('script', actions.toggleScript); };
  pill.querySelector(".links").onclick = (e) => { e.stopPropagation(); toggleModule('links', actions.toggleLinks); };
  pill.querySelector(".library").onclick = (e) => { e.stopPropagation(); toggleModule('library', actions.toggleLibrary); }; // [NOVO]
  pill.querySelector(".timezone").onclick = (e) => { e.stopPropagation(); toggleModule('timezone', actions.toggleTimezone); };
  pill.querySelector(".configs").onclick = (e) => { e.stopPropagation(); toggleModule('configs', actions.toggleConfigs); };

  pill.querySelector(".broadcast").onclick = (e) => {
    e.stopPropagation();
    toggleModule('broadcast', () => {
      const badge = e.currentTarget.querySelector('.cw-badge');
      if (badge) badge.remove();
      if (actions.broadcastControl) actions.broadcastControl.toggle();
    });
  };

  // Hover sounds for all buttons
  pill.querySelectorAll('.cw-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => SoundManager.playHover());
  });

  if (actions.broadcastControl && actions.broadcastControl.hasUnread) {
    const badge = document.createElement('div');
    badge.className = 'cw-badge';
    pill.querySelector('.broadcast').appendChild(badge);
  }

  // --- LÓGICA DE FECHAMENTO AUTOMÁTICO ---
  let closeTimer = null;

  pill.onmouseleave = () => {
    if (pill.classList.contains('processing-center')) return;

    // 'isAnyActive' precisa ser reavaliado aqui dentro, no momento em que o
    // timer dispara - não só uma vez ao agendar. Um módulo pode abrir nesses
    // 3s por um caminho que não passa pela pílula (ex: Command Palette,
    // Ctrl/Cmd+K, que chama actions.toggleX direto) sem o mouse nunca
    // reentrar pra disparar o mouseenter que cancelaria o timer; sem essa
    // checagem no disparo, a pílula colapsava por baixo de um módulo aberto.
    closeTimer = setTimeout(() => {
      const isAnyActive = pill.querySelector('.cw-btn.active');
      if (isAnyActive) return;
      SoundManager.playSwoosh();
      pill.classList.add('collapsed');
    }, 3000);
  };

  pill.onmouseenter = () => {
    if (closeTimer) clearTimeout(closeTimer);
  };

  // 4. ANIMAÇÃO INICIAL
  (async function startAnimation() {
    // Check Admin status
    const checkAdmin = () => {
      const email = getAgentEmail();
      if (email) {
        const user = email.split('@')[0].toLowerCase();
        if (ADMINS.includes(user)) {
          const badge = pill.querySelector('#cw-admin-tag');
          if (badge) badge.classList.add('visible');
        }
      } else {
        setTimeout(checkAdmin, 2000); // Retry if email not captured yet
      }
    };
    checkAdmin();

    // A pílula só assume a cena depois que a splash de fato terminou e saiu
    // do DOM - antes disso era um esperar(2800) fixo, adivinhado sem relação
    // com a duração real da splash (que varia com o tamanho do nome no
    // typewriter). Os dois podiam ficar até ~1.5s fora de sincronia: a
    // pílula já 100% visível, botões "popados", por cima de uma splash ainda
    // intacta. Fallback pro tempo antigo só se por algum motivo a promise não
    // for passada (nunca deve travar o boot por causa disso).
    if (splashDone && typeof splashDone.then === 'function') {
      try { await splashDone; } catch (e) { /* a splash já trata os próprios erros; só não travamos o dock por causa disso */ }
      await esperar(150);
    } else {
      await esperar(2800);
    }
    pill.classList.add("docked");
    await esperar(300);
    const items = pill.querySelectorAll(".cw-btn");
    pill.querySelectorAll(".cw-sep").forEach((s) => s.classList.add("visible"));
    for (let i = 0; i < items.length; i++) { items[i].classList.add("popped"); await esperar(40); }
    await esperar(100);
    pill.classList.add("system-check");

    // Microinteração 'Ready'
    await esperar(100);
    pill.classList.add("system-ready");
    setTimeout(() => pill.classList.remove("system-ready"), 400);
  })();

  // 5. DRAG & DROP
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;
  const DRAG_THRESHOLD = 3;

  pill.onmousedown = (e) => {
    if (e.target.closest("button")) return;
    e.preventDefault();
    startX = e.clientX; startY = e.clientY;
    const rect = pill.getBoundingClientRect();
    initialLeft = rect.left; initialTop = rect.top;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!isDragging && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
      isDragging = true;
      pill.classList.add('dragging');
      pill.style.transition = "none";
      if (closeTimer) clearTimeout(closeTimer);
    }
    if (isDragging) {
      pill.style.left = `${initialLeft + dx}px`;
      pill.style.top = `${initialTop + dy}px`;
      pill.style.right = "auto"; pill.style.bottom = "auto"; pill.style.transform = "none";
    }
  }

  function onMouseUp(e) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    if (isDragging) {
      isDragging = false;
      pill.classList.remove('dragging');
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const rect = pill.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      let targetLeft;
      if (centerX < screenW / 2) {
        targetLeft = 24;
        pill.classList.remove("side-right"); pill.classList.add("side-left");
      } else {
        targetLeft = screenW - rect.width - 24;
        pill.classList.remove("side-left"); pill.classList.add("side-right");
      }
      let targetTop = clamp(rect.top, 24, screenH - rect.height - 24);

      setTimeout(() => {
        pill.style.setProperty('transition', 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
        pill.style.left = `${targetLeft}px`;
        pill.style.top = `${targetTop}px`;
        pill.style.bottom = "auto";
        pill.style.transform = "";
      }, 10);

      setTimeout(() => {
        pill.style.transition = "";
        pill.style.removeProperty('transition');
      }, 700);

    } else {
      const isAnyActive = pill.querySelector('.cw-btn.active');
      const isBtnClick = e.target.closest('button');

      if (pill.classList.contains('collapsed')) {
        const rect = pill.getBoundingClientRect();
        const screenH = window.innerHeight;
        const isBottomHalf = rect.top > (screenH / 2);

        pill.style.setProperty('transition', 'none', 'important');

        if (isBottomHalf) {
          const currentBottom = screenH - rect.bottom;
          pill.style.top = 'auto';
          pill.style.bottom = `${currentBottom}px`;
        } else {
          pill.style.bottom = 'auto';
          pill.style.top = `${rect.top}px`;
        }

        void pill.offsetWidth;
        pill.style.removeProperty('transition');
        pill.classList.remove('collapsed');
        SoundManager.playGenieOpen();

      } else {
        if (!isAnyActive && !isBtnClick) {
          pill.classList.add('collapsed');
          SoundManager.playSwoosh();
        }
      }

      if (isBtnClick) {
        isBtnClick.style.transform = "scale(0.9)";
        setTimeout(() => (isBtnClick.style.transform = ""), 150);
      }
    }
  }
}

// --- FUNÇÃO DE PROCESSAMENTO COM CANCELAMENTO ---
export function triggerProcessingAnimation() {
  const pill = document.querySelector('.cw-pill');
  const overlay = document.querySelector('.cw-focus-backdrop');
  if (!pill) return () => {};

  pill.classList.remove('collapsed');
  window._CW_ABORT_PROCESS = false;

  const stage = document.createElement('div');
  stage.className = 'cw-center-stage';
  
  // HTML do Stage (Dots + Texto + Sucesso)
  stage.innerHTML = `
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${DataService.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;

  // Botão Cancelar (Agora relativo e estilizado)
  const abortBtn = document.createElement('div');
  abortBtn.className = 'cw-abort-btn';
  abortBtn.textContent = 'Cancelar';
  abortBtn.onclick = (e) => {
    e.stopPropagation();
    window._CW_ABORT_PROCESS = true;
    showToast("Cancelado!", { duration: 3000 });
    stage.remove();
    pill.classList.remove('processing-center');
    pill.classList.remove('success');
    pill.classList.add('collapsed');
    if (overlay) overlay.classList.remove('active');
  };
  
  stage.appendChild(abortBtn);
  pill.appendChild(stage);

  const startTime = Date.now();
  pill.classList.add('processing-center');
  if (overlay) overlay.classList.add('active');

  return function finish() {
    if (window._CW_ABORT_PROCESS || !pill.contains(stage)) return;
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, 2000 - elapsed);

    setTimeout(() => {
      if (window._CW_ABORT_PROCESS || !pill.contains(stage)) return;
      
      const dots = stage.querySelector('.cw-center-dots');
      const text = stage.querySelector('.cw-center-text');
      const success = stage.querySelector('.cw-center-success');
      const abort = stage.querySelector('.cw-abort-btn');

      if (dots) dots.style.display = 'none';
      if (text) text.style.display = 'none';
      if (abort) abort.style.display = 'none';
      if (success) success.classList.add('show');

      pill.classList.add('success');
      setTimeout(() => {
        pill.classList.remove('processing-center');
        setTimeout(() => {
          stage.remove();
          pill.classList.remove('success');
          pill.classList.add('collapsed');
          if (overlay) overlay.classList.remove('active');
        }, 400);
      }, 1000);
    }, remaining);
  };
}