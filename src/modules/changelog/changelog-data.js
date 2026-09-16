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
    version: "v6.3.3",

    title: "Case Wizard v6.3.3",

    slides: [
        {
            icon: "📧",
            title: "O AM agora vem como e-mail — e vem vazio quando não dá para ter certeza",
            text: "O campo Account Manager passou a trazer o e-mail do AM, não o nome: é o que a liderança usa para acionar a pessoa a partir do painel dela, e um nome próprio não diz qual LDAP é. Junto, o assistente parou de chutar: quando o case log não deixa claro quem é o AM, o campo vem em branco em vez de preenchido com o primeiro contato da conta — que era sempre o mesmo em todos os casos daquele anunciante. Se vier vazio, preencha; o campo aceita só e-mail."
        },
        {
            icon: "💾",
            title: "Editar a sugestão de descarte agora salva de verdade",
            text: "No Passo 3, a resposta para \"o caso deve ser descartado pelo TL?\" podia ser alterada na edição de um caso já enviado, mas a mudança não chegava à liderança: o TL continuava vendo o que foi gravado no envio original. Agora ela é gravada, e ao reabrir um caso para editar o campo já vem marcado com o que está valendo."
        }
    ]
};
