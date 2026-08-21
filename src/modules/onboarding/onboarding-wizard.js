// src/modules/onboarding/onboarding-wizard.js
//
// Primeira coisa que alguém vê ao abrir o Case Wizard. Toda a mecânica de
// slides (overlay, card, dots, teclado, movimento) mora em
// shared/wizard-shell.js, compartilhada com o Changelog - aqui fica só o que
// é do onboarding: o conteúdo, a trava de "já viu" e o que acontece no fim.

import { showToast, confirmDialog } from "../shared/utils.js";
import { openWizardShell } from "../shared/wizard-shell.js";
import { getLanguage } from "../shared/i18n.js";

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
};

export function initOnboarding() {
    // Trava de "já viu". Fica antes de qualquer trabalho de DOM: para a
    // esmagadora maioria dos boots, esta função não deve fazer nada.
    if (localStorage.getItem(SEEN_KEY)) return;

    // Marca como visto na ABERTURA, não no fechamento. Se a pessoa fechar a
    // aba no meio do tour, ela não deve reencontrar o mesmo tour no próximo
    // boot - o objetivo é apresentar o app uma vez, não completar um fluxo.
    localStorage.setItem(SEEN_KEY, "true");

    const lang = getLanguage();
    const slides = SLIDES_BY_LANG[lang] || SLIDES_BY_LANG.pt;
    const ob = OB_DICT[lang] || OB_DICT.pt;

    openWizardShell({
        slides,
        idPrefix: "cw-onboarding",
        nextLabel: ob.next,
        finalLabel: ob.start,
        skipLabel: ob.skip,
        onSkip: () => confirmDialog(ob.skipConfirm),
        onClose: () => showToast(ob.readyToast)
    });
}
