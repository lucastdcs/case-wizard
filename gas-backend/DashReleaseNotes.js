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
  version: "6.3.3",
  title: "Novidades do TL Dashboard",
  items: [
    {
      icon: "flag",
      title: "A vista de caso agora diz o que o agente pediu que aconteça",
      text: "Logo no topo do bloco de leitura, uma linha diz \"O caso deve ser descartado pelo TL\" ou \"O caso será implementado pelo agente\". Até aqui isso aparecia só como um selo, e só quando o agente sugeria descarte — então \"o agente vai implementar\" e \"o campo não chegou\" eram a mesma tela em branco, e não dava para saber o que tinha sido pedido. Casos antigos, gravados antes desse campo existir, aparecem como \"não informado\" em vez de inventar uma resposta."
    },
    {
      icon: "sync",
      title: "Quando o agente corrige essa resposta, você passa a ver a correção",
      text: "O agente podia alterar a sugestão de descarte ao editar um caso já enviado, mas a mudança nunca chegava aqui: o painel seguia mostrando o que foi gravado no envio original. Agora ela chega. Se você já tinha visto um caso antes desta versão, vale reabrir."
    },
    {
      icon: "alternate_email",
      title: "O AM aparece como e-mail",
      text: "O campo \"AM Responsável\" passa a trazer o e-mail do Account Manager em vez do nome de exibição — é o que permite acionar a pessoa a partir daqui. O mesmo vale para o resumo copiável. Casos abertos antes desta versão continuam com o nome que foi gravado na época. Quando o assistente do agente não consegue determinar o AM com segurança, o campo agora vem vazio em vez de trazer um nome errado: antes ele caía no primeiro contato da conta, que era o mesmo em todos os casos daquele anunciante."
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
