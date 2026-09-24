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
    version: "v6.4.0",

    title: "Case Wizard v6.4.0",

    slides: [
        {
            icon: "📧",
            title: "O AM não vem mais do caso anterior",
            text: "Ao trocar de caso, o formulário BAU podia trazer o Account Manager do caso que você acabou de fechar: o CRM mantém o case log antigo na tela por um tempo, e a captura lia os dois. Agora ela lê só o log do caso aberto. E se a janela do BAU já estava aberta quando você trocou de caso, o novo botão de recaptura no formulário puxa de novo os dados da tela que está na frente."
        },
        {
            icon: "🗂️",
            title: "BAU Central de cara nova: lista e detalhe lado a lado",
            text: "Clicar num caso abre o detalhe ao lado da lista, sem trocar de tela — clique de novo (ou Esc) para fechar. A janela ficou maior, os status aparecem por extenso (inclusive \"descarte em avaliação\", \"Mantido ativo pelo TL\" e \"Recusado pelo TL\", que antes saíam errados) e os casos aguardando descarte entram nas métricas."
        },
        {
            icon: "🗑️",
            title: "Pedido de descarte com o e-mail certo e busca do SE ID",
            text: "Quem pedia descarte recebia o e-mail de abertura de caso, com agendamento e procedimento que o fluxo nem pergunta. Agora chega a confirmação de descarte. E o botão que encontra o SE ID no case log também está no passo de descarte, onde o campo é obrigatório."
        },
        {
            icon: "✅",
            title: "As tasks do formulário são as da Central de Conteúdo",
            text: "A lista de tasks do BAU passou a vir do mesmo catálogo publicado na Central, com os mesmos nomes. Algumas tasks que só existiam no formulário saíram da grade; um caso antigo que usava uma delas continua com ela marcada ao ser editado."
        }
    ]
};
