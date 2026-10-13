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
    version: "v6.5.0",

    title: {
        pt: "Case Wizard v6.5.0",
        es: "Case Wizard v6.5.0",
        en: "Case Wizard v6.5.0",
    },

    slides: [
        {
            icon: "\ud83c\udf10",
            title: {
                pt: "O Case Wizard agora fala inglês",
                es: "Case Wizard ahora habla inglés",
                en: "Case Wizard now speaks English",
            },
            text: {
                pt: "Menus, botões, mensagens, modelos de nota, templates de e-mail e roteiros de chamada: tudo passa a existir também em inglês. Troque em Configurações → Idioma da Interface, no novo botão EN.",
                es: "Menús, botones, mensajes, plantillas de nota, plantillas de correo y guiones de llamada: todo pasa a existir también en inglés. Cámbialo en Configuración → Idioma de la Interfaz, en el nuevo botón EN.",
                en: "Menus, buttons, messages, note templates, email templates and call scripts: all of it now exists in English too. Switch it in Settings → Interface Language, on the new EN button.",
            }
        },
        {
            icon: "\u2696\ufe0f",
            title: {
                pt: "O idioma da ferramenta não é mais o idioma do caso",
                es: "El idioma de la herramienta ya no es el idioma del caso",
                en: "The tool's language is no longer the case's language",
            },
            text: {
                pt: "Antes eram o mesmo botão. Agora são dois: o da interface é o seu conforto, e o do atendimento é o do anunciante — é ele que decide o idioma do case note, do e-mail e do roteiro. Você pode usar o Case Wizard em inglês e continuar escrevendo em português. Os dois começam no idioma do seu segmento, então só muda algo se você quiser.",
                es: "Antes eran el mismo botón. Ahora son dos: el de la interfaz es tu comodidad, y el de la atención es el del anunciante — es el que decide el idioma del case note, del correo y del guion. Puedes usar Case Wizard en inglés y seguir escribiendo en español. Ambos empiezan en el idioma de tu segmento, así que solo cambia algo si tú quieres.",
                en: "They used to be the same button. Now there are two: the interface one is your own comfort, and the case one is the advertiser's — it decides the language of the case note, the email and the call script. You can run Case Wizard in English and keep writing in Portuguese. Both start on your segment's language, so nothing changes unless you want it to.",
            }
        },
        {
            icon: "\ud83d\udcc4",
            title: {
                pt: "Na nota, você vê o que vai gravar",
                es: "En la nota, ves lo que vas a guardar",
                en: "In the note, you see what you are going to save",
            },
            text: {
                pt: "Os rótulos dos campos do Case Notes seguem o idioma do atendimento, e não o da interface: eles são, literalmente, o texto que sai impresso na nota. Os botões em volta (Copiar, Limpar, a busca) seguem a interface. Assim nada é gravado num idioma que você não escolheu.",
                es: "Las etiquetas de los campos de Case Notes siguen el idioma de la atención, no el de la interfaz: son, literalmente, el texto que sale impreso en la nota. Los botones alrededor (Copiar, Limpiar, la búsqueda) siguen la interfaz. Así nada se guarda en un idioma que no elegiste.",
                en: "The Case Notes field labels follow the case language, not the interface one: they are, literally, the text printed in the note. The buttons around them (Copy, Clear, the search) follow the interface. That way nothing gets saved in a language you did not pick.",
            }
        },
    ],
};
