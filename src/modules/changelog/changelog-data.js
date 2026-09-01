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
    version: "v6.1.0",

    title: "Case Wizard v6.1.0",

    slides: [
        {
            icon: "🐞",
            title: "Achou um bug? Agora dá pra contar",
            text: "Tem um formulário de bugs e sugestões dentro do app. Se algo travar, sair errado ou só te irritar, manda por ali — chega direto para quem cuida do Case Wizard, sem precisar caçar ninguém no chat."
        },
        {
            icon: "📢",
            title: "Avisos mais fáceis de ler",
            text: "O painel de avisos foi redesenhado em duas colunas, com o contraste corrigido e um espaço próprio para o estado de cada aviso. Menos rolagem para achar o que importa hoje."
        },
        {
            icon: "🗂️",
            title: "Para a liderança: o time se atualiza pela Central",
            text: "A Central de Conteúdo ganhou a aba Pessoas. Entrada, saída, troca de fluxo e troca de idioma de um agente passam a ser feitas por ali, em vez de na planilha. TL propõe, ADMIN aprova — e o idioma em que o app abre para a pessoa acompanha a mudança."
        }
    ]
};
