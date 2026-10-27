// src/modules/changelog/changelog-data.js
//
// Conteúdo do modal "o que mudou", exibido quando o APP_VERSION visto pela
// última vez difere do atual.
//
// REGRA: `version` aqui tem que ser igual ao APP_VERSION de src/app.js. Quem
// manda em *quando* o modal aparece é o APP_VERSION; quem manda no *que ele
// diz* é este arquivo. Quando os dois divergem, o modal aparece com o selo da
// versão nova anunciando as novidades da versão velha - foi o que aconteceu
// entre a v5.1 e a v5.2. Ao subir a versão, os dois sobem juntos.
//
// Cada campo de texto carrega os três idiomas (`{ pt, es, en }`) e é resolvido
// pelo idioma da INTERFACE: este modal fala sobre a ferramenta, não vai no caso
// do anunciante. Até a v6.4.0 o conteúdo era só PT, e o agente que usava o app
// em espanhol lia botão traduzido com slide em português.
//
// Numa release de correção (patch), este arquivo guarda só o que mudou nela.
// As notas da v6.0 saíram daqui na v6.0.1 de propósito: quem já viu a v6.0 não
// precisa reler seis slides para chegar no aviso novo, e o modal só consegue
// contar uma release por vez (o localStorage guarda uma única versão vista).

export const RELEASE_NOTES = {
    version: "v6.6.0",

    title: {
        pt: "Case Wizard v6.6.0",
        es: "Case Wizard v6.6.0",
        en: "Case Wizard v6.6.0",
    },

    slides: [
        {
            icon: "📋",
            title: {
                pt: "Pre-call Checklist, direto na nota",
                es: "Pre-call Checklist, directo en la nota",
                en: "Pre-call Checklist, straight into the note",
            },
            text: {
                pt: "Um botão novo na pílula (e no Ctrl+K) abre um formulário curto que escreve o bloco \"Pre-call checklist\" no card de nota do caso — ou só copia. Tasks, telefone, e-mail, site e CID que a tela do caso já mostra chegam preenchidos e marcados como Auto: confira antes de gerar. A nota sai sempre em inglês, que é o que a auditoria procura.",
                es: "Un botón nuevo en la píldora (y en Ctrl+K) abre un formulario corto que escribe el bloque \"Pre-call checklist\" en la tarjeta de nota del caso — o solo lo copia. Las tasks, el teléfono, el correo, el sitio y el CID que la pantalla del caso ya muestra llegan completados y marcados como Auto: revísalos antes de generar. La nota sale siempre en inglés, que es lo que busca la auditoría.",
                en: "A new button on the pill (and in Ctrl+K) opens a short form that writes the \"Pre-call checklist\" block into the case's note card — or just copies it. The tasks, phone, email, website and CID the case screen already shows arrive pre-filled and tagged Auto: check them before generating. The note is always written in English, which is what the audit looks for.",
            }
        },
        {
            icon: "🔗",
            title: {
                pt: "Links ganhou uma home",
                es: "Links ahora tiene una página de inicio",
                en: "Links now has a home screen",
            },
            text: {
                pt: "Ao abrir Links, você vê até 3 destaques do momento e, logo abaixo, seus Favoritos, os Recentes e o que saiu do destaque. A busca agora acha também pela descrição e pelo nome da categoria, sem depender de acento, e um painel de prévia mostra \"O que é\" e \"Quando usar\" ao passar o mouse. Favoritos e recentes ficam salvos na nuvem, então acompanham você.",
                es: "Al abrir Links ves hasta 3 destacados del momento y, justo debajo, tus Favoritos, los Recientes y lo que salió de destacados. La búsqueda ahora también encuentra por descripción y por nombre de categoría, sin depender de las tildes, y un panel de vista previa muestra \"Qué es\" y \"Cuándo usar\" al pasar el mouse. Favoritos y recientes se guardan en la nube, así que te acompañan.",
                en: "When you open Links you see up to 3 current highlights and, right below, your Favorites, Recent and what is no longer featured. Search now also matches the description and the category name, without depending on accents, and a preview panel shows \"What it is\" and \"When to use\" as you hover. Favorites and recents are saved in the cloud, so they follow you.",
            }
        },
        {
            icon: "📖",
            title: {
                pt: "A documentação está a um clique",
                es: "La documentación está a un clic",
                en: "The documentation is one click away",
            },
            text: {
                pt: "O \"?\" do cabeçalho de cada módulo e a seção Suporte & Feedback, em Configurações, agora levam ao deck de documentação do Case Wizard. Travou num módulo? Comece por ele.",
                es: "El \"?\" del encabezado de cada módulo y la sección Soporte y Comentarios, en Configuración, ahora llevan a la presentación de documentación de Case Wizard. ¿Te trabaste en un módulo? Empieza por ahí.",
                en: "The \"?\" in each module's header and the Support & Feedback section in Settings now open the Case Wizard documentation deck. Stuck in a module? Start there.",
            }
        },
    ],
};
