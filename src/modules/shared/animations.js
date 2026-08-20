// src/modules/shared/animations.js

import { SoundManager } from "./sound-manager.js";

// --- PARÂMETROS DA ANIMAÇÃO "GENIE" ---
// Abrir é mais longo que fechar de propósito: entrar em cena merece ser
// admirado, sair da frente do agente não. Os dois tempos são a fonte única
// de verdade - o CSS lá embaixo e o teardown em JS leem daqui, então mudar
// a duração num lugar só não deixa mais os dois fora de sincronia (foi
// exatamente esse descompasso que causava o bug do "fechou e voltou").
const OPEN_MS = 460;
const CLOSE_MS = 280;
// Margem de segurança do fallback: se a página estiver travada e o
// transitionend não chegar, o teardown acontece assim mesmo.
const TEARDOWN_GRACE_MS = 200;
// Escala do estado fechado. Não é 0 porque um elemento com scale(0) é
// descartado do compositor e a volta fica "pipocando".
const CLOSED_SCALE = 0.06;

// 1. INJEÇÃO DE ESTILOS (CSS do Módulo + Animações)
if (!document.getElementById('cw-module-styles')) {
    const style = document.createElement('style');
    style.id = 'cw-module-styles';
    style.innerHTML = `
        /* MÓDULO BASE */
        .cw-module-window {
            /* A transição real de abrir/fechar é aplicada inline por
               toggleGenieAnimation(); esta aqui só cobre as mudanças de
               estado visual (idle/foco) enquanto a janela está aberta. */
            transition:
                opacity 0.3s ease,
                filter 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease;

            opacity: 0;
            pointer-events: none;
            /* Fora de cena de verdade: sem visibility a janela fechada
               continuava no tab order e no leitor de tela, invisível só por
               causa do opacity. */
            visibility: hidden;
            transform: scale(${CLOSED_SCALE});

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
            pointer-events: auto;
            visibility: visible;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* Sem transform aqui: o transform da janela é sempre inline
               (é ele que faz o voo até a pílula), então um scale nesta regra
               nunca chegava a valer nada - e virava alvo fantasma quando o
               inline era limpo no meio do fechamento. O efeito de "encostou
               na mesa" vem todo de opacity/filter/sombra. */
            opacity: 0.9;
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */

            cursor: pointer; /* Indica clicável */
        }

        /* Pulso de "absorção" no ícone da pílula: um anel colapsa pra dentro
           do botão no momento exato em que a janela é sugada (e quando ela
           sai), dando a leitura de que os dois são o mesmo objeto.
           É um anel de box-shadow, e não um scale, porque .cw-btn:hover já
           usa transform com !important - o mouse quase sempre está em cima
           do botão na hora do clique, e um pulso de scale simplesmente não
           apareceria. */
        @keyframes cw-btn-absorb {
            0%   { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.28); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .cw-btn.cw-absorbing { animation: cw-btn-absorb 0.34s var(--cw-ease-decelerate, ease-out); }

        @media (prefers-reduced-motion: reduce) {
            .cw-btn.cw-absorbing { animation: none; }
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

function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/**
 * Onde a janela nasce e para onde ela é sugada.
 *
 * O alvo natural é o ícone do próprio módulo na pílula. Mas quando a pílula
 * está recolhida os ícones ficam com `visibility: hidden` e `scale(0.5)` -
 * o getBoundingClientRect() deles devolve um retângulo que não corresponde a
 * nada na tela (chegava a cair fora da viewport), e a janela voava pra um
 * canto aleatório. Nesse caso o alvo correto é a bolinha recolhida, que é o
 * que o agente de fato está vendo.
 */
function getAnchorPoint(buttonId) {
    const pill = document.querySelector('.cw-pill');
    const btn = buttonId ? document.getElementById(buttonId) : null;
    const pillCollapsed = !!(pill && pill.classList.contains('collapsed'));

    const usable = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    if (!pillCollapsed) {
        const fromBtn = usable(btn);
        if (fromBtn) return fromBtn;
    }
    return usable(pill);
}

/**
 * Retângulo da janela na posição de repouso (aberta), medido sem transform.
 *
 * Precisamos disso porque o transform-origin é expresso em coordenadas da
 * caixa de layout, e a janela pode estar no meio de um voo quando alguém
 * pede a medida.
 */
function measureRestBox(popup, isCustomPosition) {
    const prevTransition = popup.style.transition;
    const prevTransform = popup.style.transform;

    popup.style.transition = 'none';
    popup.style.transform = 'none';
    const box = popup.getBoundingClientRect();

    // O getBoundingClientRect() acima força um recálculo de estilo, então o
    // navegador enxerga o transform zerado como um estado real. Devolver o
    // valor original precisa de outro flush AINDA com transition: none -
    // senão o próprio ato de medir dispararia uma transição fantasma de
    // "none" de volta pro transform de repouso.
    popup.style.transform = prevTransform;
    void popup.offsetWidth;
    popup.style.transition = prevTransition;

    // Sem drag a janela é centralizada com translate(-50%, -50%), então a
    // caixa de layout fica meia largura/altura deslocada do que se vê.
    return {
        left: isCustomPosition ? box.left : box.left - box.width / 2,
        top: isCustomPosition ? box.top : box.top - box.height / 2,
        width: box.width,
        height: box.height,
    };
}

/**
 * Ancora o scale no ponto da pílula.
 *
 * Antes o voo era feito com translate(delta) + scale a partir do centro: a
 * janela encolhia pro próprio miolo enquanto escorregava pro lado, o que lê
 * como "sumiu e foi embora", não como "foi sugada". Colocando o
 * transform-origin em cima do ícone, o scale sozinho já puxa a janela pra
 * dentro dele - é a mesma física do genie do macOS e dispensa qualquer
 * cálculo de delta (que era justamente de onde vinham os destinos errados).
 */
function applyGenieOrigin(popup, anchor, rest) {
    if (!anchor) {
        popup.style.transformOrigin = '50% 50%';
        popup._cwOrigin = null;
        return;
    }
    const origin = `${Math.round(anchor.x - rest.left)}px ${Math.round(anchor.y - rest.top)}px`;
    popup.style.transformOrigin = origin;
    popup._cwOrigin = origin;
}

function closedTransform(isCustomPosition) {
    return isCustomPosition
        ? `translate(0, 0) scale(${CLOSED_SCALE})`
        : `translate(-50%, -50%) scale(${CLOSED_SCALE})`;
}

function restTransform(isCustomPosition) {
    return isCustomPosition ? 'translate(0, 0) scale(1)' : 'translate(-50%, -50%) scale(1)';
}

function pulseButton(btn) {
    if (!btn || prefersReducedMotion()) return;
    btn.classList.remove('cw-absorbing');
    void btn.offsetWidth; // reinicia a animação se dois toggles vierem colados
    btn.classList.add('cw-absorbing');
    setTimeout(() => btn.classList.remove('cw-absorbing'), 400);
}

/**
 * Gerencia a animação Genie e o Foco
 */
export function toggleGenieAnimation(show, popup, buttonId) {
    const btn = buttonId ? document.getElementById(buttonId) : null;
    if (!popup) return;

    // Cada chamada invalida a anterior. Sem isso, o teardown agendado por um
    // fechamento continuava correndo mesmo depois de o módulo ser reaberto -
    // e derrubava a janela recém-aberta na cara do agente.
    const token = (popup._cwAnimToken || 0) + 1;
    popup._cwAnimToken = token;
    const stale = () => popup._cwAnimToken !== token;

    // Limpa qualquer teardown pendente do ciclo anterior.
    if (popup._cwTeardown) {
        popup._cwTeardown();
        popup._cwTeardown = null;
    }

    // A animação mais disparada do app inteiro (9 módulos, várias aberturas
    // por turno) não tinha nenhuma proteção de reduced-motion - a física de
    // voo (scale ancorado na pílula) some, mas o estado final é aplicado do
    // mesmo jeito, só sem o trajeto animado.
    const reduceMotion = prefersReducedMotion();

    // Verifica se é a primeira vez (Centro) ou se já foi movido (Customizado)
    const isCustomPosition = popup.getAttribute("data-moved") === "true";

    if (show) {
        // --- ABRIR ---
        SoundManager.playGenieOpen();

        // A. ANCORAGEM (de onde a janela nasce)
        const rest = measureRestBox(popup, isCustomPosition);
        applyGenieOrigin(popup, getAnchorPoint(buttonId), rest);

        // B. RESET INSTANTÂNEO (colapsada em cima do ícone)
        popup.style.transition = 'none';
        popup.style.opacity = '0';
        popup.style.pointerEvents = 'auto';
        popup.style.transform = closedTransform(isCustomPosition);
        // will-change só durante a animação em si - este popup é 1 de ~9
        // janelas de módulo que existem no DOM o tempo todo, então deixar
        // isso ligado sempre desperdiçaria memória de GPU nas 8 que estão
        // fechadas e paradas.
        popup.style.willChange = 'transform, opacity';

        // C. REFLOW
        void popup.offsetWidth;

        // D. ANIMAÇÃO DE ENTRADA
        requestAnimationFrame(() => {
            if (stale()) return;

            popup.classList.add('open');
            popup.classList.remove('idle');
            if (btn) btn.classList.add('active');
            pulseButton(btn);

            // Física Apple: o transform desacelera devagar (a janela "chega"
            // no lugar), o opacity termina antes pra janela já estar legível
            // enquanto os últimos pixels de escala se acomodam.
            popup.style.transition = reduceMotion
                ? "opacity 0.15s ease"
                : `opacity ${Math.round(OPEN_MS * 0.6)}ms ease-out,`
                  + ` transform ${OPEN_MS}ms var(--cw-ease-decelerate),`
                  + ` filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`;
            popup.style.opacity = '1';
            popup.style.transform = restTransform(isCustomPosition);

            afterTransition(popup, token, reduceMotion ? 150 : OPEN_MS, () => {
                popup.style.willChange = 'auto';
                popup._cwSettled = true;
            });
        });

        popup._cwSettled = false;
        setupIdleListener(popup, buttonId);

    } else {
        // --- FECHAR ---
        SoundManager.playSwoosh();

        // A. ANCORAGEM (pra onde a janela é sugada)
        // Recalculada agora, e não na abertura: entre abrir e fechar a
        // pílula pode ter sido arrastada pro outro lado da tela ou recolhida.
        // Se a janela ainda estiver voando (fechou logo depois de abrir),
        // mantemos a origem do voo em curso pra não dar um salto no meio.
        if (popup._cwSettled || !popup._cwOrigin) {
            const rest = measureRestBox(popup, isCustomPosition);
            applyGenieOrigin(popup, getAnchorPoint(buttonId), rest);
        }

        // B. CONFIGURA SAÍDA
        popup.style.transition = reduceMotion
            ? "opacity 0.15s ease"
            : `opacity ${Math.round(CLOSE_MS * 0.8)}ms ease,`
              + ` transform ${CLOSE_MS}ms var(--cw-ease-accelerate)`;
        popup.style.pointerEvents = 'none';
        popup.style.willChange = 'transform, opacity';

        // Devolve o foco pra pílula se ele estava dentro da janela que está
        // fechando - senão o foco fica órfão num elemento invisível e o
        // próximo Tab reinicia do topo da página do CRM.
        if (btn && popup.contains(document.activeElement)) {
            try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); }
        }

        // C. ANIMAÇÃO DE SAÍDA (SUGADA PRA DENTRO DO ÍCONE)
        requestAnimationFrame(() => {
            if (stale()) return;

            popup.style.opacity = '0';
            popup.style.transform = closedTransform(isCustomPosition);

            // D. LIMPEZA - só depois que a animação REALMENTE terminou.
            //
            // Este era o bug do "fechou e voltou": a limpeza era um
            // setTimeout(300) disparado junto com uma transição de 300ms, ou
            // seja, sempre chegava antes (o timer conta a partir do clique, a
            // transição só começa no frame seguinte - e qualquer travadinha
            // do CRM aumentava a diferença). Ela zerava transform/transition
            // no meio do voo, e a janela, ainda visível, era re-animada de
            // volta pro transform de repouso do CSS. Agora quem manda é o
            // transitionend, com timeout só de rede de segurança.
            afterTransition(popup, token, reduceMotion ? 150 : CLOSE_MS, () => {
                popup.classList.remove('open');
                // O idle nunca era removido: o módulo reabria acinzentado e
                // dessaturado, e a regra .idle ainda disputava o estado de
                // repouso com o transform inline.
                popup.classList.remove('idle');
                popup.style.zIndex = '';
                if (btn) btn.classList.remove('active');
                pulseButton(btn);

                popup.style.willChange = 'auto';
                popup.style.transition = '';
                // transform e opacity ficam onde estão (colapsados sobre o
                // ícone). Limpá-los devolveria a janela pro transform do CSS
                // base, que é outro lugar - era daí que vinha o "puxão de
                // volta" no fim do fechamento.
                // IMPORTANTE: Não limpamos top/left aqui, para a memória persistir
            });
        });

        removeIdleListener(popup);
    }
}

/**
 * Executa `done` quando a transição de transform do popup terminar, com
 * timeout de segurança. Ignora transitionend de elementos filhos (todo módulo
 * tem dezenas deles animando dentro) e desiste em silêncio se outro toggle
 * tiver assumido o controle no meio do caminho.
 */
function afterTransition(popup, token, durationMs, done) {
    let finished = false;

    const cleanup = () => {
        popup.removeEventListener('transitionend', onEnd);
        clearTimeout(timer);
        if (popup._cwTeardown === cleanup) popup._cwTeardown = null;
    };

    const finish = () => {
        if (finished) return;
        finished = true;
        cleanup();
        if (popup._cwAnimToken !== token) return;
        done();
    };

    const onEnd = (e) => {
        if (e.target !== popup) return;
        // Só o transform vale como "acabou": ele é sempre a propriedade mais
        // longa do par (o opacity termina antes de propósito). Aceitar o
        // opacity aqui recriaria em menor escala o mesmo corte que este
        // teardown existe para evitar. Quando o transform não anima
        // (reduced-motion, ou fechar uma janela que já estava colapsada) o
        // transitionend simplesmente não vem e o timer abaixo assume.
        if (e.propertyName !== 'transform') return;
        finish();
    };

    popup.addEventListener('transitionend', onEnd);
    const timer = setTimeout(finish, durationMs + TEARDOWN_GRACE_MS);

    // Handle pro próximo toggle cancelar este teardown sem executá-lo.
    popup._cwTeardown = cleanup;
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
