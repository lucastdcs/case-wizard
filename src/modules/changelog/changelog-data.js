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
// Numa release de correção (patch), este arquivo guarda só o que mudou nela.
// As notas da v6.0 saíram daqui na v6.0.1 de propósito: quem já viu a v6.0 não
// precisa reler seis slides para chegar no aviso novo, e o modal só consegue
// contar uma release por vez (o localStorage guarda uma única versão vista).

export const RELEASE_NOTES = {
    version: "v6.3.0",

    title: "Case Wizard v6.3.0",

    slides: [
        {
            icon: "🕐",
            title: "O horário do agendamento agora diz de que fuso ele é",
            text: "Antes você digitava o horário do cliente e o campo não guardava de onde ele era — quem lia depois adivinhava. Agora o fuso é escolhido junto com a data, e a hora virou uma lista em 24h: não tem mais AM/PM para trocar sem perceber. Os fusos dos Estados Unidos entraram (inclusive Arizona, que não faz horário de verão), e a tela mostra ao lado quanto dá em Brasília."
        },
        {
            icon: "🔤",
            title: "A captura parou de falhar com a tela traduzida",
            text: "Se o tradutor do CRM estivesse ligado, 7 dos 10 campos voltavam vazios em silêncio — anunciante virava \"Cliente\", site em branco, fuso nulo — e você preenchia tudo à mão sem saber por quê. Os campos agora são reconhecidos em português, espanhol e inglês. Junto: sobrenome e telefone do anunciante passaram a ser capturados, e o idioma parou de ir como \"N/A\"."
        },
        {
            icon: "📧",
            title: "O BCC vai para o AM certo",
            text: "O e-mail em cópia oculta estava indo para um endereço montado a partir do campo de busca do cabeçalho — que nem sempre é uma pessoa de verdade. Agora o AM é resolvido pelo histórico do caso, e nunca é confundido com o dono do caso."
        },
        {
            icon: "✅",
            title: "Para a liderança: aprovar agora registra o caso gerado",
            text: "Ao aprovar uma abertura, o painel pede o ID do caso BAU que você criou no CRM. Ele fica no histórico como link, entra na busca, e vai no e-mail do agente. O histórico também ganhou período — 7, 30 ou 90 dias — e diz na tela até onde ele alcança, já que o backup semanal arquiva os casos finalizados."
        }
    ]
};
