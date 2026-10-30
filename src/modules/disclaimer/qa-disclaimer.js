// src/modules/disclaimer/qa-disclaimer.js
//
// Lembrete de qualidade, em todo boot: o Case Wizard só ajuda a preencher, e
// quem responde pelo padrão do tratamento é o agente. app.js o chama depois que
// a splash, o onboarding e o changelog saíram da frente.
//
// Não é showToast() de propósito. O toast some em 4s sem como pausar, não tem
// botão e toca o som de SUCESSO (playSuccess) - um lembrete não é uma
// confirmação, e 4s não bastam para ler duas frases numa segunda língua.
//
// Não atrapalha o CRM: sem fundo escurecido, sem trava de rolagem, sem roubar o
// foco, sem tratar o Esc (que é do CRM). Só o cartão capta o mouse; o resto da
// tela segue clicável por baixo. Some sozinho, e fica parado enquanto o mouse
// ou o foco estiverem nele (um aviso que some enquanto se lê falha em acessibilidade).

import { createTranslator } from "../shared/i18n.js";
import { SoundManager } from "../shared/sound-manager.js";
import { Z } from "../shared/z-layers.js";

// O texto fica na tela e não vai para o caso: segue o idioma da INTERFACE
// (createTranslator), não o do atendimento (ADR-0016).
const DISCLAIMER_DICT = {
    pt: {
        title: "Lembrete de qualidade",
        text: "Siga as diretrizes de QA e o SOP do segmento do caso. O Case Wizard apenas auxilia no preenchimento; a qualidade do tratamento é responsabilidade do agente.",
        ok: "Entendi",
    },
    es: {
        title: "Recordatorio de calidad",
        text: "Sigue las directrices de QA y el SOP del segmento del caso. Case Wizard solo ayuda a rellenar; la calidad del tratamiento es responsabilidad del agente.",
        ok: "Entendido",
    },
    en: {
        title: "Quality reminder",
        text: "Follow the QA guidelines and the SOP for the case segment. Case Wizard only helps with filling things in; handling the case to the quality standard is the agent’s responsibility.",
        ok: "Got it",
    },
};
const dt = createTranslator(DISCLAIMER_DICT);

const NOTICE_ID = "cw-qa-notice";
const STYLE_ID = "cw-qa-notice-style";
// ~30 palavras: 12s dão folga a quem lê na segunda língua.
const SHOW_MS = 12000;
// Depois de uma pausa (mouse/foco), nunca volta com menos que isto - senão
// tirar o mouse a 200ms do fim faria o cartão sumir na cara de quem lia.
const MIN_RESUME_MS = 4000;
const EXIT_MS = 200;

function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    // Vidro na casca, conteúdo sólido por tom: sem borda cinza, o contorno vem
    // do anel claro interno e da sombra em duas camadas (design-system.md).
    style.textContent = `
        .cw-qa-notice {
            position: fixed; left: 24px; bottom: 24px;
            z-index: ${Z.TOAST};
            box-sizing: border-box; width: 360px; max-width: calc(100vw - 48px);
            display: grid; grid-template-columns: 24px 1fr; column-gap: 12px;
            padding: 16px 16px 12px;
            background: rgba(248, 249, 250, 0.88);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
            border-radius: 16px;
            box-shadow: 0 1px 2px rgba(60, 64, 67, 0.12),
                        0 8px 24px rgba(60, 64, 67, 0.18),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.6);
            font-family: 'Google Sans', Roboto, sans-serif;
            color: var(--cw-text, #202124);
            opacity: 0; transform: translateY(8px);
            transition: opacity 280ms var(--cw-ease-decelerate, ease),
                        transform 280ms var(--cw-ease-decelerate, ease);
        }
        .cw-qa-notice.open { opacity: 1; transform: translateY(0); }
        .cw-qa-notice.closing {
            opacity: 0; transform: translateY(4px);
            transition-duration: ${EXIT_MS}ms;
            transition-timing-function: var(--cw-ease-standard, ease);
        }
        .cw-qa-notice-icon { width: 24px; height: 24px; color: var(--cw-primary, #1a73e8); }
        .cw-qa-notice-title { margin: 0 0 4px; font-size: 14px; font-weight: 500; line-height: 24px; }
        .cw-qa-notice-text {
            margin: 0; font-size: 13px; font-weight: 400; line-height: 20px;
            color: var(--cw-text-sub, #5f6368);
        }
        .cw-qa-notice-actions { grid-column: 2; display: flex; justify-content: flex-end; margin-top: 8px; }
        .cw-qa-notice-btn {
            min-height: 32px; padding: 0 12px; border: 0; border-radius: 16px;
            background: transparent; cursor: pointer;
            font: 500 13px 'Google Sans', Roboto, sans-serif; color: var(--cw-primary, #1a73e8);
            transition: background-color 160ms var(--cw-ease-standard, ease);
        }
        .cw-qa-notice-btn:hover { background: rgba(26, 115, 232, 0.08); }
        .cw-qa-notice-btn:focus-visible { outline: 2px solid var(--cw-primary, #1a73e8); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
            .cw-qa-notice, .cw-qa-notice.closing { transform: none !important; transition: opacity 150ms ease !important; }
            .cw-qa-notice-btn { transition: none !important; }
        }
    `;
    document.head.appendChild(style);
}

export function showQaDisclaimer() {
    if (document.getElementById(NOTICE_ID)) return;
    injectStyles();

    const card = document.createElement("aside");
    card.id = NOTICE_ID;
    card.className = "cw-qa-notice";
    // role="status" já implica aria-live="polite": o leitor de tela lê o aviso
    // sem tirar o foco de onde o agente está.
    card.setAttribute("role", "status");
    // Estrutura estática; todo texto entra por textContent logo abaixo.
    card.innerHTML = `
        <svg class="cw-qa-notice-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/>
        </svg>
        <div>
            <p class="cw-qa-notice-title"></p>
            <p class="cw-qa-notice-text"></p>
        </div>
        <div class="cw-qa-notice-actions"><button type="button" class="cw-qa-notice-btn"></button></div>
    `;
    card.querySelector(".cw-qa-notice-title").textContent = dt("title");
    card.querySelector(".cw-qa-notice-text").textContent = dt("text");
    const btn = card.querySelector(".cw-qa-notice-btn");
    btn.textContent = dt("ok");

    let remaining = SHOW_MS;
    let startedAt = 0;
    let timer = null;
    let holds = 0;
    let gone = false;

    function arm() {
        startedAt = Date.now();
        timer = setTimeout(dismiss, remaining);
    }
    function pause() {
        clearTimeout(timer);
        remaining = Math.max(remaining - (Date.now() - startedAt), MIN_RESUME_MS);
    }
    // Mouse e foco seguram o relógio de forma independente: tirar o mouse com o
    // foco ainda no botão não pode religá-lo.
    const hold = () => { if (holds++ === 0) pause(); };
    const release = () => { if (holds > 0 && --holds === 0 && !gone) arm(); };

    function dismiss() {
        if (gone) return;
        gone = true;
        clearTimeout(timer);
        card.classList.remove("open");
        card.classList.add("closing");
        setTimeout(() => card.remove(), EXIT_MS);
    }

    card.addEventListener("mouseenter", hold);
    card.addEventListener("mouseleave", release);
    card.addEventListener("focusin", hold);
    card.addEventListener("focusout", release);
    btn.addEventListener("click", dismiss);

    // O relógio arma ANTES de o cartão entrar no DOM: qualquer foco ou mouse que
    // o segure já encontra um `startedAt` válido para descontar.
    arm();
    document.body.appendChild(card);
    // Dois quadros: o primeiro pinta o estado inicial (invisível), o segundo
    // dispara a transição. Um só e o navegador funde os dois estilos.
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("open")));

    SoundManager.playNotice();
}
