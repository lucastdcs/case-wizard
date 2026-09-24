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
  version: "6.4.0",
  title: "Novidades do TL Dashboard",
  items: [
    {
      icon: "checklist",
      title: "As tasks dos casos BAU seguem a Central de Conteúdo",
      text: "O formulário do agente passou a oferecer as tasks do catálogo publicado na Central, com os mesmos nomes (\"GTM Installation\" em vez de \"Google Tag Manager Installation\", por exemplo). Casos novos chegam aqui com esse vocabulário; casos abertos antes desta versão mantêm o nome que foi gravado na época."
    },
    {
      icon: "alternate_email",
      title: "O AM deixa de vir trocado quando o agente muda de caso",
      text: "A captura do Account Manager podia ler o case log do caso anterior e gravar o AM errado no caso novo. Agora ela lê só o caso aberto — o \"AM Responsável\" que você vê aqui passa a ser o do caso certo."
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
