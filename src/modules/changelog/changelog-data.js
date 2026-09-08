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
    version: "v6.2.0",

    title: "Case Wizard v6.2.0",

    slides: [
        {
            icon: "📢",
            title: "Aviso velho não fica mais na sua tela",
            text: "Quem publica um aviso agora pode dizer quando ele começa a aparecer e quando sai do ar. Na prática: o aviso da manutenção de segunda aparece na segunda, e o da instabilidade de ontem some sozinho — em vez de continuar dizendo que um problema já resolvido está acontecendo agora."
        },
        {
            icon: "🔎",
            title: "Para a liderança: Ctrl+K acha qualquer coisa na Central",
            text: "A Central ganhou busca global. Ctrl+K, digita, e ela acha o destino e o conteúdo — sem acento, sem lembrar em qual aba o item mora. E cada item publicado agora tem uma prévia \"como o agente vê\", que mostra o texto no idioma do agente e avisa quando falta a tradução."
        },
        {
            icon: "🛡️",
            title: "Para a liderança: acessos e histórico agora se resolvem na tela",
            text: "O que cada papel pode fazer virou uma matriz editável — dá para criar um papel que publica disponibilidade sem tocar no catálogo, sem esperar deploy. E entrou uma aba de auditoria com filtro, período e exportação, mais uma barra de atividade recente com a foto de quem fez cada coisa."
        }
    ]
};
