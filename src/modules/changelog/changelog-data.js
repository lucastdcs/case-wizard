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

export const RELEASE_NOTES = {
    version: "v6.0",

    title: "Case Wizard v6.0",

    slides: [
        {
            icon: "⌨️",
            title: "Ctrl+K abre tudo",
            text: "A nova paleta de comandos chega em qualquer módulo por um atalho. Digite parte do nome — com ou sem acento, \"fusos\" acha \"Fusos Horários\" — e vá direto."
        },
        {
            icon: "📚",
            title: "Minha Biblioteca",
            text: "Seus snippets, templates de e-mail e respostas prontas agora vivem num módulo só, com busca e uma fila de \"usados recentemente\" pra copiar sem procurar."
        },
        {
            icon: "📝",
            title: "Case Notes reconstruído",
            text: "Campos que você apaga viram chips para readicionar, transferências dividem a nota corretamente, e o rascunho é salvo continuamente. Estacionar um caso e retomar depois ficou confiável."
        },
        {
            icon: "🧾",
            title: "BAU Form e Avisos",
            text: "O formulário de criação e descarte BAU ganhou fluxo próprio em etapas, e a leitura dos comunicados de disponibilidade agora entende datas e bandeiras quebradas em várias linhas."
        },
        {
            icon: "♿",
            title: "Teclado e leitor de tela",
            text: "Navegação completa por teclado em todos os módulos, foco visível, rolagem travada corretamente com popups abertos e estados vazios que explicam o que fazer em vez de ficarem em branco."
        },
        {
            icon: "🎬",
            title: "Movimento revisado de ponta a ponta",
            text: "Todas as animações passaram para quatro curvas canônicas, o descompasso entre a splash e a pílula acabou, e quem usa \"reduzir movimento\" no sistema agora é respeitado em todo o app."
        }
    ]
};
