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
    version: "v6.3.1",

    title: "Case Wizard v6.3.1",

    slides: [
        {
            icon: "🩹",
            title: "Campo que a captura não achava ia para a planilha como a palavra \"null\"",
            text: "Quando a raspagem não encontrava um campo — foi o fuso horário que apareceu assim para um TL —, o que chegava na planilha não era um espaço em branco, e sim as quatro letras de \"null\". Agora o campo vai vazio de verdade, e os casos já gravados param de exibir isso no painel. Na edição de um caso, o mesmo problema podia sobrescrever um campo que você nem tocou; também está resolvido."
        }
    ]
};
