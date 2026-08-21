// src/modules/shared/wizard-shell.js
//
// Casca compartilhada dos dois wizards de slides do app: o Onboarding
// (primeira vez que alguém abre o Case Wizard) e o Changelog (quando o
// APP_VERSION muda). Os dois nasceram como arquivos separados com ~90% do
// mesmo código - overlay, card, dots, troca de slide, animação de entrada -
// e foi exatamente essa duplicação que os deixou pra trás na auditoria de
// movimento: enquanto o resto do app migrou pras 4 curvas canônicas, ganhou
// prefers-reduced-motion e perdeu o `transition: all`, esses dois seguiram
// com hex cravado e curva literal. Uma casca só significa que eles não
// conseguem mais divergir.
//
// O que a casca resolve, além da duplicação:
//  - tokens --cw-* e as 4 curvas canônicas, em vez de valores literais;
//  - prefers-reduced-motion (eram os dois últimos módulos sem cobertura);
//  - transições com propriedades explícitas, nunca `transition: all`;
//  - navegação de teclado completa (Enter, Esc, setas, Tab preso no card)
//    e devolução do foco pra quem estava focado antes do modal abrir;
//  - troca de slide em cross-fade, em vez de o texto trocar seco no meio
//    da animação;
//  - dots clicáveis e anunciados, e uma região aria-live que lê o slide
//    novo pra leitor de tela - antes a troca era completamente silenciosa.

import { SoundManager } from "./sound-manager.js";
import { lockBodyScroll, unlockBodyScroll } from "./dom-utils.js";
import { getLanguage } from "./i18n.js";

const STYLE_ID = "cw-wizard-shell-styles";

// Texto fixo da casca (botões e rótulos de acessibilidade). O conteúdo dos
// slides vem de quem chama - cada wizard traz o seu. O idioma já está
// resolvido quando estes modais abrem (app.js só chama initOnboarding() e
// checkAndShowChangelog() depois da promise do perfil), então basta ler uma
// vez na montagem, sem reagir a troca em runtime: é uma tela única.
const SHELL_DICT = {
    pt: {
        back: "Voltar",
        skip: "Pular",
        next: "Próximo",
        done: "Concluir",
        dotsGroup: "Navegação entre os slides",
        slideLabel: (i, n) => `Slide ${i} de ${n}`,
        announce: (i, n, title, text) => `Slide ${i} de ${n}: ${title}. ${text}`,
    },
    es: {
        back: "Volver",
        skip: "Omitir",
        next: "Siguiente",
        done: "Finalizar",
        dotsGroup: "Navegación entre las diapositivas",
        slideLabel: (i, n) => `Diapositiva ${i} de ${n}`,
        announce: (i, n, title, text) => `Diapositiva ${i} de ${n}: ${title}. ${text}`,
    },
};

function wt(key) {
    const lang = getLanguage();
    return SHELL_DICT[lang]?.[key] ?? SHELL_DICT.pt[key];
}

// Duração do cross-fade entre slides. Precisa bater com --cw-wiz-swap no CSS
// abaixo: é o intervalo em que o conteúdo antigo já sumiu e o novo ainda não
// entrou, ou seja, o momento certo pra trocar o texto sem que ninguém veja a
// troca. Dessincronizar os dois é o bug clássico de "conteúdo trocou no meio
// da animação" que a Fase 5 da auditoria caçou em 4 lugares.
const SWAP_MS = 160;

// Duração da entrada/saída do modal. Espelha --cw-wiz-shell no CSS.
const SHELL_MS = 320;

const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
        .cw-wiz-overlay {
            --cw-wiz-swap: ${SWAP_MS}ms;
            --cw-wiz-shell: ${SHELL_MS}ms;

            position: fixed; inset: 0;
            background: rgba(32, 33, 36, 0.62);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 2147483646;
            display: flex; align-items: center; justify-content: center;
            padding: 24px;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity var(--cw-wiz-shell) var(--cw-ease-standard);
        }
        .cw-wiz-overlay.open { opacity: 1; }

        .cw-wiz-card {
            position: relative;
            width: 400px;
            max-width: 100%;
            max-height: 100%;
            overflow-y: auto;
            box-sizing: border-box;
            background: var(--cw-surface, #fff);
            border-radius: 24px;
            padding: 32px;
            text-align: center;
            font-family: 'Google Sans', Roboto, sans-serif;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
            /* A entrada é o único momento em que o card se move, então
               will-change entra aqui e sai (removeProperty) assim que a
               animação de abertura termina - Fase 2 da auditoria. */
            opacity: 0;
            transform: translateY(24px) scale(0.96);
            transition:
                opacity var(--cw-wiz-shell) var(--cw-ease-decelerate),
                transform var(--cw-wiz-shell) var(--cw-ease-decelerate);
        }
        .cw-wiz-overlay.open .cw-wiz-card {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        /* Saída usa a curva de aceleração - sai mais rápido do que entrou,
           que é a assimetria que o resto do app já segue (genie open/close). */
        .cw-wiz-overlay.closing .cw-wiz-card {
            transition:
                opacity var(--cw-wiz-shell) var(--cw-ease-accelerate),
                transform var(--cw-wiz-shell) var(--cw-ease-accelerate);
        }

        /* "Pular" vive no canto, não no rodapé. Com ele lá embaixo eram três
           botões numa linha de 336px úteis, e a 380px de viewport a linha
           estourava (scrollWidth > clientWidth) espremendo o botão principal.
           No canto ele também para de competir visualmente com a ação que a
           gente de fato quer que a pessoa tome. */
        .cw-wiz-card.has-skip { padding-top: 48px; }
        .cw-wiz-skip {
            position: absolute;
            top: 14px; right: 16px;
            padding: 6px 12px;
            border: none; border-radius: 14px;
            background: transparent;
            color: var(--cw-text-sub, #5f6368);
            font-family: inherit; font-size: 13px; font-weight: 600;
            cursor: pointer;
            transition:
                background-color 0.2s var(--cw-ease-standard),
                color 0.2s var(--cw-ease-standard);
        }
        .cw-wiz-skip:hover {
            background: rgba(60, 64, 67, 0.08);
            color: var(--cw-text, #202124);
        }
        .cw-wiz-skip:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 2px;
        }
        .cw-wiz-skip[hidden] { display: none; }

        .cw-wiz-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            background: #E8F0FE;
            color: #1967D2;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 16px;
        }

        /* O "palco": tudo que troca de um slide pro outro vive aqui dentro,
           pra que o cross-fade seja UM efeito só, e não três elementos
           desaparecendo em tempos ligeiramente diferentes. */
        .cw-wiz-stage {
            transition:
                opacity var(--cw-wiz-swap) var(--cw-ease-standard),
                transform var(--cw-wiz-swap) var(--cw-ease-standard);
        }
        .cw-wiz-stage.swapping-next { opacity: 0; transform: translateX(-10px); }
        .cw-wiz-stage.swapping-prev { opacity: 0; transform: translateX(10px); }

        .cw-wiz-icon { font-size: 44px; line-height: 1; margin-bottom: 18px; display: block; }
        .cw-wiz-title {
            font-size: 21px; font-weight: 700; line-height: 1.3;
            color: var(--cw-text, #202124); margin-bottom: 10px;
        }
        .cw-wiz-text {
            font-size: 14.5px; line-height: 1.6;
            color: var(--cw-text-sub, #5f6368);
            /* Reserva a altura de ~3 linhas pra que slides curtos não encolham
               o card e slides longos não o estiquem de repente - o card
               "pulando" entre slides era o efeito mais perceptível dos dois
               wizards antigos. */
            min-height: 4.8em;
            margin-bottom: 28px;
        }

        .cw-wiz-dots {
            display: flex; justify-content: center; align-items: center;
            gap: 8px; margin-bottom: 22px;
        }
        .cw-wiz-dot {
            width: 8px; height: 8px; padding: 0;
            border: none; border-radius: 50%;
            background: var(--cw-border, #dadce0);
            cursor: pointer; appearance: none;
            transition:
                width var(--cw-wiz-swap) var(--cw-ease-spring),
                background-color var(--cw-wiz-swap) var(--cw-ease-standard);
        }
        .cw-wiz-dot:hover { background: #bdc1c6; }
        .cw-wiz-dot.active {
            width: 24px; border-radius: 4px;
            background: var(--cw-primary, #1a73e8);
        }
        .cw-wiz-dot:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 3px;
        }

        .cw-wiz-actions {
            display: flex; align-items: center; gap: 8px;
        }
        .cw-wiz-btn {
            padding: 11px 24px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            /* Propriedades explícitas: "transition: all" foi removido de ~25
               regras na Fase 5 e não volta por aqui. */
            transition:
                background-color 0.2s var(--cw-ease-standard),
                box-shadow 0.2s var(--cw-ease-standard),
                color 0.2s var(--cw-ease-standard);
        }
        .cw-wiz-btn:focus-visible {
            outline: 2px solid var(--cw-primary, #1a73e8);
            outline-offset: 2px;
        }
        /* Hover é background/sombra, nunca transform. O transform no hover é o
           anti-padrão auto-referencial que a Fase 5 removeu de 7 lugares: o
           elemento cresce, sai de baixo do cursor, dispara mouseout, encolhe,
           volta pro cursor - e treme. */
        .cw-wiz-btn-primary {
            background: var(--cw-primary, #1a73e8);
            color: #fff;
            box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
            flex: 1;
        }
        .cw-wiz-btn-primary:hover {
            background: var(--cw-primary-hover, #1557b0);
            box-shadow: 0 6px 18px rgba(26, 115, 232, 0.38);
        }
        .cw-wiz-btn-ghost {
            background: transparent;
            color: var(--cw-text-sub, #5f6368);
        }
        .cw-wiz-btn-ghost:hover {
            background: rgba(60, 64, 67, 0.08);
            color: var(--cw-text, #202124);
        }
        .cw-wiz-btn[hidden] { display: none; }

        /* Só existe pra leitor de tela: anuncia o slide novo. Sem isso, avançar
           o wizard é uma troca de conteúdo completamente silenciosa. */
        .cw-wiz-live {
            position: absolute;
            width: 1px; height: 1px;
            margin: -1px; padding: 0; border: 0;
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            overflow: hidden; white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
            .cw-wiz-overlay,
            .cw-wiz-overlay .cw-wiz-card,
            .cw-wiz-overlay.closing .cw-wiz-card {
                transition: opacity 0.15s linear !important;
                transform: none !important;
            }
            .cw-wiz-stage {
                transition: none !important;
                transform: none !important;
            }
            /* O conteúdo ainda precisa sumir e voltar (senão a troca acontece
               "por baixo" e some o feedback de que algo mudou), mas sem
               deslocamento lateral. */
            .cw-wiz-stage.swapping-next,
            .cw-wiz-stage.swapping-prev { opacity: 0; }
            .cw-wiz-dot { transition: none !important; }
        }

        /* Telas baixas (notebook em CRM com várias barras): o card encosta nas
           bordas e o conteúdo rola por dentro, em vez de estourar a viewport. */
        @media (max-height: 560px) {
            .cw-wiz-card { padding: 24px; }
            .cw-wiz-icon { font-size: 34px; margin-bottom: 12px; }
            .cw-wiz-text { min-height: 0; margin-bottom: 20px; }
        }
    `;
    document.head.appendChild(style);
}

const FOCUSABLE = 'button:not([hidden]):not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Abre um wizard de slides.
 *
 * @param {Object}   cfg
 * @param {Array}    cfg.slides      [{ icon, title, text }] - pelo menos um.
 * @param {string}   cfg.idPrefix    Prefixo pros ids de acessibilidade.
 * @param {string}  [cfg.badge]      Selo acima do ícone (ex.: "Atualização v6.0").
 * @param {string}  [cfg.nextLabel]  Rótulo do botão em slides intermediários.
 * @param {string}  [cfg.finalLabel] Rótulo do botão no último slide.
 * @param {string}  [cfg.skipLabel]  Se vier, mostra o botão de pular.
 * @param {Function}[cfg.onSkip]     async () => boolean - confirma o skip.
 *                                   Sem isso, pular fecha direto.
 * @param {Function}[cfg.onClose]    Chamado quando o wizard some do DOM.
 * @returns {{ close: Function }}
 */
export function openWizardShell({
    slides,
    idPrefix,
    badge = null,
    nextLabel = null,
    finalLabel = null,
    skipLabel = null,
    onSkip = null,
    onClose = () => {},
}) {
    // Os rótulos padrão saem do dicionário da casca; quem chama só passa
    // um label quando quer algo mais específico que "Próximo"/"Concluir".
    const labels = {
        next: nextLabel || wt("next"),
        final: finalLabel || wt("done"),
        skip: skipLabel,
    };
    if (!Array.isArray(slides) || slides.length === 0) {
        console.warn("[wizard-shell] chamado sem slides; nada a mostrar.");
        return { close: () => {} };
    }

    injectStyles();

    const titleId = `${idPrefix}-title`;
    const textId = `${idPrefix}-text`;

    // Quem estava focado antes do modal abrir. Devolvemos o foco no fechamento
    // pra não largar o usuário no <body> - especialmente relevante aqui, onde
    // o modal abre sozinho 2,5s depois do boot, sem ninguém ter clicado nada.
    const previouslyFocused = document.activeElement;

    let currentSlide = 0;
    let isClosing = false;
    let swapTimer = null;

    // --- DOM ---
    const overlay = document.createElement("div");
    overlay.className = "cw-wiz-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", titleId);
    overlay.setAttribute("aria-describedby", textId);

    const card = document.createElement("div");
    card.className = "cw-wiz-card";

    if (badge) {
        const badgeEl = document.createElement("div");
        badgeEl.className = "cw-wiz-badge";
        badgeEl.textContent = badge;
        card.appendChild(badgeEl);
    }

    const stage = document.createElement("div");
    stage.className = "cw-wiz-stage";

    const iconEl = document.createElement("div");
    iconEl.className = "cw-wiz-icon";
    // O ícone é decorativo - o título logo abaixo já diz a mesma coisa em
    // palavras, então deixá-lo no fluxo faria o leitor de tela anunciar
    // "foguete" antes de "Bem-vindo".
    iconEl.setAttribute("aria-hidden", "true");

    const titleEl = document.createElement("div");
    titleEl.className = "cw-wiz-title";
    titleEl.id = titleId;

    const textEl = document.createElement("div");
    textEl.className = "cw-wiz-text";
    textEl.id = textId;

    stage.appendChild(iconEl);
    stage.appendChild(titleEl);
    stage.appendChild(textEl);

    const liveEl = document.createElement("div");
    liveEl.className = "cw-wiz-live";
    liveEl.setAttribute("aria-live", "polite");
    liveEl.setAttribute("aria-atomic", "true");

    const dotsEl = document.createElement("div");
    dotsEl.className = "cw-wiz-dots";
    dotsEl.setAttribute("role", "group");
    dotsEl.setAttribute("aria-label", wt("dotsGroup"));

    const actionsEl = document.createElement("div");
    actionsEl.className = "cw-wiz-actions";

    const btnBack = document.createElement("button");
    btnBack.type = "button";
    btnBack.className = "cw-wiz-btn cw-wiz-btn-ghost";
    btnBack.textContent = wt("back");

    const btnSkip = document.createElement("button");
    btnSkip.type = "button";
    btnSkip.className = "cw-wiz-skip";
    btnSkip.textContent = skipLabel || wt("skip");
    if (!skipLabel) btnSkip.hidden = true;

    const btnNext = document.createElement("button");
    btnNext.type = "button";
    btnNext.className = "cw-wiz-btn cw-wiz-btn-primary";

    actionsEl.appendChild(btnBack);
    actionsEl.appendChild(btnNext);

    // Primeiro no DOM (e portanto primeiro no Tab) porque é o primeiro
    // elemento na leitura visual do card - canto superior direito.
    //
    // A folga no topo é decidida UMA vez, no mount, e não slide a slide: o
    // "Pular" some no último slide, e alternar o padding junto faria o card
    // encolher 16px bem no meio do cross-fade. Um vão constante é menos
    // perceptível do que geometria que muda.
    if (skipLabel) {
        card.classList.add("has-skip");
        card.appendChild(btnSkip);
    }
    card.appendChild(stage);
    card.appendChild(liveEl);
    card.appendChild(dotsEl);
    card.appendChild(actionsEl);
    overlay.appendChild(card);

    // --- DOTS ---
    const dots = slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "cw-wiz-dot";
        dot.setAttribute("aria-label", wt("slideLabel")(i + 1, slides.length));
        dot.onmouseenter = () => SoundManager.playHover();
        dot.onclick = () => {
            if (i === currentSlide) return;
            SoundManager.playClick();
            goTo(i);
        };
        dotsEl.appendChild(dot);
        return dot;
    });

    // --- RENDER ---
    function paint(index) {
        const slide = slides[index];
        iconEl.textContent = slide.icon || "";
        titleEl.textContent = slide.title || "";
        textEl.textContent = slide.text || "";

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
            dot.setAttribute("aria-current", i === index ? "true" : "false");
        });

        const isLast = index === slides.length - 1;
        btnNext.textContent = isLast ? labels.final : labels.next;
        btnBack.hidden = index === 0;
        // "Pular" some no último slide: não há mais nada a pular, e a única
        // ação que faz sentido ali é a principal.
        btnSkip.hidden = !skipLabel || isLast;

        liveEl.textContent = wt("announce")(index + 1, slides.length, slide.title, slide.text);
    }

    function goTo(index) {
        if (isClosing || index === currentSlide) return;
        if (index < 0 || index >= slides.length) return;

        const direction = index > currentSlide ? "swapping-next" : "swapping-prev";
        currentSlide = index;

        if (prefersReducedMotion()) {
            paint(index);
            return;
        }

        // Fade out -> troca o conteúdo no ponto invisível -> fade in.
        clearTimeout(swapTimer);
        stage.classList.add(direction);
        swapTimer = setTimeout(() => {
            paint(index);
            stage.classList.remove("swapping-next", "swapping-prev");
        }, SWAP_MS);
    }

    function close({ silent = false } = {}) {
        if (isClosing) return;
        isClosing = true;
        clearTimeout(swapTimer);

        document.removeEventListener("keydown", handleKeydown, true);

        overlay.classList.add("closing");
        overlay.classList.remove("open");
        card.style.willChange = "opacity, transform";

        if (!silent) SoundManager.playSuccess();

        setTimeout(() => {
            overlay.remove();
            unlockBodyScroll();
            // Devolve o foco pra onde ele estava, se aquele elemento ainda
            // existe e ainda é focável.
            if (previouslyFocused && document.contains(previouslyFocused)) {
                try { previouslyFocused.focus({ preventScroll: true }); } catch (_) {}
            }
            onClose();
        }, SHELL_MS);
    }

    // --- TECLADO ---
    // Captura (`true`) porque este modal cobre a página inteira do CRM, que
    // tem os próprios handlers globais de tecla; sem capturar, um Enter aqui
    // pode disparar algo por baixo antes de chegar no wizard.
    function handleKeydown(e) {
        if (isClosing) return;

        if (e.key === "Tab") {
            // Prende o Tab dentro do card. `aria-modal` informa o leitor de
            // tela, mas não impede o foco de sair - isso é com a gente.
            const focusables = Array.from(card.querySelectorAll(FOCUSABLE))
                .filter((el) => !el.hidden && el.offsetParent !== null);
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
            return;
        }

        if (e.key === "Enter") {
            // Enter em cima de um dot deve ativar o dot, não pular pro próximo.
            if (document.activeElement && document.activeElement.classList.contains("cw-wiz-dot")) return;
            e.preventDefault();
            e.stopPropagation();
            btnNext.click();
        } else if (e.key === "Escape") {
            // Esc sempre DISPENSA o modal - nunca avança slide. Quando existe
            // um "Pular" visível, passa pela confirmação dele; senão, fecha
            // direto (é o caso do Changelog, onde não há o que confirmar).
            e.preventDefault();
            e.stopPropagation();
            if (!btnSkip.hidden) btnSkip.click();
            else close();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            if (currentSlide < slides.length - 1) { SoundManager.playClick(); goTo(currentSlide + 1); }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (currentSlide > 0) { SoundManager.playClick(); goTo(currentSlide - 1); }
        }
    }

    // --- LISTENERS ---
    [btnBack, btnSkip, btnNext].forEach((b) => {
        b.onmouseenter = () => SoundManager.playHover();
    });

    btnNext.onclick = () => {
        SoundManager.playClick();
        if (currentSlide < slides.length - 1) goTo(currentSlide + 1);
        else close();
    };

    btnBack.onclick = () => {
        SoundManager.playClick();
        goTo(currentSlide - 1);
    };

    btnSkip.onclick = async () => {
        SoundManager.playClick();
        if (typeof onSkip === "function") {
            const confirmed = await onSkip();
            if (!confirmed) return;
        }
        close({ silent: true });
    };

    // --- MONTAGEM ---
    document.body.appendChild(overlay);
    lockBodyScroll();
    paint(0);

    card.style.willChange = "opacity, transform";
    requestAnimationFrame(() => {
        overlay.classList.add("open");
    });

    setTimeout(() => {
        // will-change só vale enquanto algo se move; deixá-lo permanente
        // segura uma camada de composição à toa pelo resto da sessão.
        card.style.removeProperty("will-change");
        btnNext.focus({ preventScroll: true });
    }, SHELL_MS);

    document.addEventListener("keydown", handleKeydown, true);

    return { close };
}
