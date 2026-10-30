// src/modules/onboarding/onboarding-wizard.js
//
// Primeira coisa que alguém vê ao abrir o Case Wizard. Toda a mecânica de
// slides (overlay, card, dots, teclado, movimento) mora em
// shared/wizard-shell.js, compartilhada com o Changelog - aqui fica só o que
// é do onboarding: o conteúdo, a trava de "já viu" e o que acontece no fim.

import { showToast, confirmDialog } from "../shared/utils.js";
import { openWizardShell } from "../shared/wizard-shell.js";
import { getLanguage, setLanguage, SUPPORTED_LANGS } from "../shared/i18n.js";

const SEEN_KEY = "cw_onboarding_seen_v1";

// Os módulos citados aqui precisam bater com os rótulos reais da paleta de
// comandos (shared/command-palette.js) - é por esse nome que a pessoa vai
// procurar depois. Ao renomear ou remover um módulo, este texto vem junto:
// a versão anterior deste arquivo ainda anunciava o "Quick Email", que já
// tinha sido substituído pelo Email Assistant e pela Minha Biblioteca - e a
// rodada de i18n acabou traduzindo o slide errado pro espanhol junto.
//
// O idioma já vem resolvido do perfil quando isto roda (app.js só chama
// initOnboarding() depois que a promise do idioma se resolve), então basta
// ler uma vez: é uma tela única, mostrada uma vez só, no boot.
const SLIDES_BY_LANG = {
    pt: [
        {
            icon: "🚀",
            title: "Bem-vindo ao Case Wizard",
            text: "Uma camada de produtividade que roda por cima do CRM. Ela não substitui nada do que você já usa — só tira o trabalho repetitivo do caminho."
        },
        {
            icon: "⌨️",
            title: "Tudo começa em dois lugares",
            text: "A pílula flutuante, sempre no canto da tela, abre qualquer módulo com um clique. E Ctrl+K (ou ⌘K) abre a paleta de comandos: digite o que quer e vá direto, sem tirar a mão do teclado."
        },
        {
            icon: "📝",
            title: "Notas e BAU sem retrabalho",
            text: "O Case Notes monta a nota técnica do caso a partir do status e das tasks que você marcar. O BAU Form cuida das solicitações de criação e descarte, passo a passo."
        },
        {
            icon: "💬",
            title: "Na hora de falar com o cliente",
            text: "O Email Assistant sugere templates que leem o contexto do caso, e o Call Script te guia pela chamada com um roteiro interativo — sem script decorado."
        },
        {
            icon: "📚",
            title: "Seu material e o do time",
            text: "Minha Biblioteca guarda seus snippets e respostas prontas. A Central de Links reúne SOPs e ferramentas, os Avisos trazem disponibilidade BAU, e os Fusos Horários respondem \"que horas são pra ele agora?\"."
        },
        {
            icon: "🛟",
            title: "Nada se perde",
            text: "O que você digita é salvo sozinho a cada poucos segundos, e dá pra estacionar um caso no meio e retomar de onde parou. Fechar a aba sem querer não custa mais nada. Bom trabalho!"
        }
    ],
    es: [
        {
            icon: "🚀",
            title: "Bienvenido a Case Wizard",
            text: "Una capa de productividad que funciona sobre el CRM. No reemplaza nada de lo que ya usas — solo quita el trabajo repetitivo del camino."
        },
        {
            icon: "⌨️",
            title: "Todo empieza en dos lugares",
            text: "La píldora flotante, siempre en la esquina de la pantalla, abre cualquier módulo con un clic. Y Ctrl+K (o ⌘K) abre la paleta de comandos: escribe lo que buscas y ve directo, sin soltar el teclado."
        },
        {
            icon: "📝",
            title: "Notas y BAU sin rehacer trabajo",
            text: "Case Notes arma la nota técnica del caso a partir del estado y de las tareas que marques. BAU Form se encarga de las solicitudes de creación y descarte, paso a paso."
        },
        {
            icon: "💬",
            title: "A la hora de hablar con el cliente",
            text: "Email Assistant sugiere plantillas que leen el contexto del caso, y Call Script te guía por la llamada con un guion interactivo — sin nada memorizado."
        },
        {
            icon: "📚",
            title: "Tu material y el del equipo",
            text: "Mi Biblioteca guarda tus fragmentos y respuestas listas. La Central de Enlaces reúne SOPs y herramientas, los Avisos traen la disponibilidad BAU, y las Zonas Horarias responden \"¿qué hora es para él ahora?\"."
        },
        {
            icon: "🛟",
            title: "Nada se pierde",
            text: "Lo que escribes se guarda solo cada pocos segundos, y puedes aparcar un caso a mitad de camino y retomarlo donde lo dejaste. Cerrar la pestaña sin querer ya no cuesta nada. ¡Buen trabajo!"
        }
    ],
    en: [
        {
            icon: "\ud83d\ude80",
            title: "Welcome to Case Wizard",
            text: "A productivity layer that runs on top of the CRM. It replaces nothing you already use \u2014 it just gets the repetitive work out of your way."
        },
        {
            icon: "\u2328\ufe0f",
            title: "It all starts in two places",
            text: "The floating pill, always in the corner of the screen, opens any module with one click. And Ctrl+K (or \u2318K) opens the command palette: type what you want and go straight there, without leaving the keyboard."
        },
        {
            icon: "\ud83d\udcdd",
            title: "Notes and BAU without rework",
            text: "Case Notes builds the case's technical note from the status and the tasks you select. BAU Form handles creation and discard requests, step by step."
        },
        {
            icon: "\ud83d\udcac",
            title: "When it is time to talk to the customer",
            text: "Email Assistant suggests templates that read the case context, and Call Script guides you through the call with an interactive script \u2014 nothing to memorize."
        },
        {
            icon: "\ud83d\udcda",
            title: "Your material and the team's",
            text: "My Library keeps your snippets and ready-made replies. The Links Central gathers SOPs and tools, Broadcast brings BAU availability, and Timezones answer \"what time is it for them right now?\"."
        },
        {
            icon: "\ud83d\udedf",
            title: "Nothing gets lost",
            text: "What you type is saved on its own every few seconds, and you can park a case halfway through and pick it up where you left off. Closing the tab by accident no longer costs you anything. Have a good shift!"
        }
    ],
};

const OB_DICT = {
    pt: {
        next: "Próximo",
        start: "Começar 🚀",
        skip: "Pular",
        skipConfirm: "Pular a apresentação? Você pode explorar tudo pelo menu flutuante.",
        readyToast: "Tudo pronto! Use o menu flutuante ou Ctrl+K.",
    },
    es: {
        next: "Siguiente",
        start: "Empezar 🚀",
        skip: "Omitir",
        skipConfirm: "¿Omitir la presentación? Puedes explorar todo desde el menú flotante.",
        readyToast: "¡Todo listo! Usa el menú flotante o Ctrl+K.",
    },
    en: {
        next: "Next",
        start: "Get started \ud83d\ude80",
        skip: "Skip",
        skipConfirm: "Skip the walkthrough? You can explore everything from the floating menu.",
        readyToast: "All set! Use the floating menu or Ctrl+K.",
    },
};

// Nomes de idioma em si mesmos. Esta tela é a única do app que não pode
// assumir um idioma: ela existe justamente para descobrir qual é.
const LANG_CHOICES = [
    { lang: "pt", flag: "\ud83c\udde7\ud83c\uddf7", name: "Portugu\u00eas" },
    { lang: "es", flag: "\ud83c\uddea\ud83c\uddf8", name: "Espa\u00f1ol" },
    { lang: "en", flag: "\ud83c\uddfa\ud83c\uddf8", name: "English" },
];

// Primeira tela do primeiro boot, antes dos slides. Até a entrada do inglês
// o idioma vinha só do segmento da planilha People e nunca era confirmado;
// quem não se encaixava no segmento só descobria o seletor se fosse procurar
// em Configurações. O passo custa um clique e troca um palpite por uma
// escolha.
//
// Resolve com o idioma escolhido, e só então os slides são montados — a
// casca do wizard lê o idioma uma vez na montagem (shared/wizard-shell.js),
// então trocar depois não re-renderizaria os botões.
function askLanguage() {
    return new Promise(resolve => {
        const STYLE_ID = "cw-ob-lang-styles";
        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement("style");
            style.id = STYLE_ID;
            style.textContent = `
                .cw-ob-lang-overlay {
                    position: fixed; inset: 0; z-index: 2147483646;
                    background: rgba(32, 33, 36, 0.62);
                    backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
                    display: flex; align-items: center; justify-content: center;
                    padding: 24px; box-sizing: border-box; opacity: 0;
                    transition: opacity 320ms var(--cw-ease-standard, ease);
                }
                .cw-ob-lang-overlay.open { opacity: 1; }
                .cw-ob-lang-card {
                    width: 400px; max-width: 100%; box-sizing: border-box;
                    background: var(--cw-surface, #fff); border-radius: 24px;
                    padding: 32px; text-align: center;
                    font-family: 'Google Sans', Roboto, sans-serif;
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
                }
                .cw-ob-lang-icon { font-size: 44px; line-height: 1; margin-bottom: 16px; }
                .cw-ob-lang-title {
                    font-size: 20px; font-weight: 700; color: var(--cw-text, #202124);
                    margin: 0 0 6px;
                }
                .cw-ob-lang-sub {
                    font-size: 13px; color: var(--cw-text-sub, #5F6368);
                    margin: 0 0 24px; line-height: 1.5;
                }
                .cw-ob-lang-options { display: flex; flex-direction: column; gap: 10px; }
                .cw-ob-lang-btn {
                    display: flex; align-items: center; gap: 14px;
                    padding: 14px 18px; border-radius: 12px; cursor: pointer;
                    border: 1px solid var(--cw-border, #DADCE0); background: #fff;
                    font-family: inherit; font-size: 15px; font-weight: 500;
                    color: var(--cw-text, #202124); text-align: left;
                    transition: background-color 160ms var(--cw-ease-standard, ease),
                                border-color 160ms var(--cw-ease-standard, ease);
                }
                .cw-ob-lang-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }
                .cw-ob-lang-btn:focus-visible {
                    outline: 2px solid var(--cw-primary, #1A73E8); outline-offset: 2px;
                }
                .cw-ob-lang-btn .flag { font-size: 22px; }
                @media (prefers-reduced-motion: reduce) {
                    .cw-ob-lang-overlay, .cw-ob-lang-btn { transition: none !important; }
                }
            `;
            document.head.appendChild(style);
        }

        const overlay = document.createElement("div");
        overlay.className = "cw-ob-lang-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Choose your language");

        const card = document.createElement("div");
        card.className = "cw-ob-lang-card";
        // O subtítulo repete a pergunta nos três idiomas de propósito: é o
        // único texto do app que ninguém garante que a pessoa leia.
        card.innerHTML = `
            <div class="cw-ob-lang-icon">\ud83c\udf10</div>
            <h2 class="cw-ob-lang-title">Case Wizard</h2>
            <p class="cw-ob-lang-sub">
                Escolha o idioma da interface<br>
                Elige el idioma de la interfaz<br>
                Choose your interface language
            </p>
            <div class="cw-ob-lang-options"></div>
        `;

        const options = card.querySelector(".cw-ob-lang-options");
        const buttons = LANG_CHOICES.filter(c => SUPPORTED_LANGS.includes(c.lang)).map(choice => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "cw-ob-lang-btn";
            btn.dataset.lang = choice.lang;
            btn.innerHTML = `<span class="flag" aria-hidden="true">${choice.flag}</span><span>${choice.name}</span>`;
            btn.onclick = () => pick(choice.lang);
            options.appendChild(btn);
            return btn;
        });

        let settled = false;
        function pick(lang) {
            if (settled) return;
            settled = true;
            // Só o idioma da INTERFACE. O idioma da saída é o do anunciante
            // e continua vindo do segmento do perfil — deduzi-lo de uma
            // preferência de tela é exatamente o acoplamento que o
            // ADR-0016 desfez.
            setLanguage(lang);
            document.removeEventListener("keydown", onKeydown, true);
            overlay.classList.remove("open");
            setTimeout(() => overlay.remove(), 320);
            resolve(lang);
        }

        // Esc não fecha: sem idioma escolhido não há slide para mostrar.
        // Setas e Tab navegam; Enter/Espaço o próprio <button> já resolve.
        function onKeydown(e) {
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            e.preventDefault();
            const i = buttons.indexOf(document.activeElement);
            const step = e.key === "ArrowDown" ? 1 : -1;
            const next = (i < 0 ? 0 : i + step + buttons.length) % buttons.length;
            buttons[next].focus();
        }
        document.addEventListener("keydown", onKeydown, true);

        overlay.appendChild(card);
        document.body.appendChild(overlay);
        requestAnimationFrame(() => {
            overlay.classList.add("open");
            // `?.focus() ?? fallback.focus()` NÃO funciona aqui: focus()
            // devolve undefined, então o lado direito do ?? rodava sempre e
            // o foco voltava pro primeiro botão. Resolve o elemento primeiro.
            const preferred = buttons.find(b => b.dataset.lang === getLanguage()) || buttons[0];
            preferred?.focus();
        });
    });
}

// Resolve quando o tour sai da tela (ou já na hora, se não há tour a mostrar):
// app.js espera por isto para o lembrete de qualidade não competir com ele.
export function initOnboarding() {
    // Trava de "já viu". Fica antes de qualquer trabalho de DOM: para a
    // esmagadora maioria dos boots, esta função não deve fazer nada.
    if (localStorage.getItem(SEEN_KEY)) return Promise.resolve();

    // Marca como visto na ABERTURA, não no fechamento. Se a pessoa fechar a
    // aba no meio do tour, ela não deve reencontrar o mesmo tour no próximo
    // boot - o objetivo é apresentar o app uma vez, não completar um fluxo.
    localStorage.setItem(SEEN_KEY, "true");

    return askLanguage().then(showSlides);
}

function showSlides(lang) {
    const slides = SLIDES_BY_LANG[lang] || SLIDES_BY_LANG.pt;
    const ob = OB_DICT[lang] || OB_DICT.pt;

    return new Promise(resolve => {
        openWizardShell({
            slides,
            idPrefix: "cw-onboarding",
            nextLabel: ob.next,
            finalLabel: ob.start,
            skipLabel: ob.skip,
            onSkip: () => confirmDialog(ob.skipConfirm),
            onClose: () => {
                showToast(ob.readyToast);
                resolve();
            }
        });
    });
}
