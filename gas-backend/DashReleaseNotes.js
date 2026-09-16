// =========================================================
// ARQUIVO: DashReleaseNotes.gs
// Responsabilidade: as notas de versão que os DASHBOARDS mostram
// =========================================================
//
// POR QUE ESTE ARQUIVO EXISTE
//
// O projeto tinha changelog só no bookmarklet (src/modules/changelog/), que é o
// app do AGENTE. O TL nunca carrega o bookmarklet — ele abre uma página do Apps
// Script —, então toda mudança feita no dashboard dele chegava sem aviso: um
// campo novo, um fluxo que mudou, um botão que saiu de lugar apareciam do nada
// entre uma sessão e outra.
//
// FONTE ÚNICA, MANTIDA À MÃO
//
// O Apps Script não lê o CHANGELOG.md em tempo de execução: não há sistema de
// arquivos do repositório do outro lado, só os arquivos do projeto sincronizados
// pelo clasp. Então este arquivo é escrito à mão junto do CHANGELOG.md, e um
// teste (`npm run test:dash-changelog`) falha quando ele fica para trás.
//
// É a mesma guarda que o changelog-wizard.js já tem para o bookmarklet, pelo
// mesmo motivo: quando a versão sobe e as notas ficam, o modal aparece com o
// selo da versão nova anunciando as novidades da versão velha — foi o que
// aconteceu entre a v5.1 e a v5.2.
//
// REGRA: `version` aqui tem que ser igual à `version` do package.json.
// Numa release de correção, este arquivo guarda só o que mudou nela: o modal
// conta uma release por vez (o navegador guarda uma única versão vista).

const CW_DASH_RELEASE_NOTES = {
  version: "6.3.2",
  title: "Novidades do TL Dashboard",
  items: [
    {
      icon: "content_copy",
      title: "Resumo pronto para colar no caso BAU",
      text: "Ao abrir uma solicitação, o último bloco traz o caso escrito em texto corrido — o que aconteceu, o que precisa ser feito, as tasks e o AM — com a chamada \"Caso LM para BAU\". É só copiar e colar no caso que você acabou de criar. O texto sai no idioma do atendimento: caso de ES vem em espanhol, mesmo com o seu painel em português."
    },
    {
      icon: "dashboard_customize",
      title: "A vista de detalhes foi remodelada",
      text: "Ficou mais larga e agora separa o que você LÊ para decidir (o que deve ser feito, o motivo, a justificativa e o agendamento, no bloco do topo) do que você COPIA para o CRM (os dados do caso, logo abaixo). Nome e sobrenome do anunciante viraram campos separados — sem sobrenome, o campo diz N/A. E dá para aprovar ou rejeitar sem fechar a vista: os botões estão no rodapé dela."
    },
    {
      icon: "manage_search",
      title: "O histórico virou clicável",
      text: "Clique em qualquer caso resolvido e você vê tudo o que veria na fila — anunciante, CID, tasks, justificativa, agendamento —, não só o número do caso. No topo, um bloco novo diz quem decidiu, quando, e a justificativa registrada. A busca do histórico também passou a achar por anunciante e CID."
    },
    {
      icon: "edit_note",
      title: "Rejeitar agora pede uma justificativa",
      text: "Ao recusar uma abertura ou negar um descarte, o painel pede o motivo — e ele vai no e-mail que o agente recebe. Até aqui o agente era avisado do \"não\" sem nenhuma razão e tinha que perguntar no chat. A justificativa fica gravada e aparece no histórico junto com a decisão."
    },
    {
      icon: "history",
      title: "O histórico parou de sumir toda segunda-feira",
      text: "O arquivamento semanal copiava os casos resolvidos para a planilha de backup e apagava os originais — por isso a aba Histórico só alcançava o último domingo, mesmo com o filtro de 90 dias. Agora ele só copia. O histórico passa a crescer de verdade, e o ID do caso gerado na aprovação não desaparece mais."
    }
  ]
};

/**
 * Notas de versão em JSON, para o template injetar na página.
 *
 * Injetado como `<?!= CW_RELEASE_NOTES ?>` (ver renderDashboard) em vez de vir
 * por google.script.run: é conteúdo estático que a página já poderia ter no
 * primeiro byte, e uma chamada a mais no boot do dashboard é exatamente o que
 * #333/#334 pediu para evitar.
 */
function buildReleaseNotesJson() {
  return JSON.stringify(CW_DASH_RELEASE_NOTES);
}
