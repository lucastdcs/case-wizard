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
// Cada campo de texto carrega os três idiomas (`{ pt, es, en }`) e é resolvido
// pelo idioma da TELA do TL (TL_LANG), não pelo do atendimento: este modal fala
// sobre o dashboard, não sobre o caso. Até a v6.4.0 era só PT, e um TL com a
// tela em espanhol lia as novidades em português.
//
// REGRA: `version` aqui (nos dois objetos) tem que ser igual à `version` do package.json.
// Numa release de correção, este arquivo guarda só o que mudou nela: o modal
// conta uma release por vez (o navegador guarda uma única versão vista).

const CW_DASH_RELEASE_NOTES = {
  version: "6.5.0",
  title: {
    pt: "Novidades do TL Dashboard",
    es: "Novedades del TL Dashboard",
    en: "What's new in the TL Dashboard"
  },
  items: [
    {
      icon: "language",
      title: {
        pt: "O dashboard agora abre em português, espanhol ou inglês",
        es: "El dashboard ahora abre en portugués, español o inglés",
        en: "The dashboard now opens in Portuguese, Spanish or English"
      },
      text: {
        pt: "O idioma da tela vinha só do seu segmento na planilha People, sem como trocar. Agora há um seletor PT/ES/EN na barra de cima, e a sua escolha fica salva neste navegador — ela vence o segmento nas próximas aberturas. Quem não mexer continua vendo exatamente o que via.",
        es: "El idioma de la pantalla venía solo de tu segmento en la hoja People, sin forma de cambiarlo. Ahora hay un selector PT/ES/EN en la barra superior, y tu elección queda guardada en este navegador — vence al segmento en las próximas aperturas. Quien no lo toque sigue viendo exactamente lo que veía.",
        en: "The screen language came only from your segment in the People sheet, with no way to change it. There is now a PT/ES/EN selector in the top bar, and your choice is saved in this browser — it wins over the segment next time you open it. If you do not touch it, nothing changes."
      }
    },
    {
      icon: "flag",
      title: {
        pt: "Casos em inglês passam a existir",
        es: "Los casos en inglés pasan a existir",
        en: "English cases now exist"
      },
      text: {
        pt: "O inglês virou segmento de atendimento de verdade: o agente pode abrir caso BAU com Idioma = EN, e o resumo do caso já sai em inglês para você copiar. A disponibilidade BAU ganhou a terceira linha na Central — enquanto ninguém publicar datas para EN, o painel do agente em inglês cai no primeiro segmento que tiver.",
        es: "El inglés se volvió un segmento de atención real: el agente puede abrir un caso BAU con Idioma = EN, y el resumen del caso ya sale en inglés para que lo copies. La disponibilidad BAU ganó la tercera línea en la Central — mientras nadie publique fechas para EN, el panel del agente en inglés cae en el primer segmento que tenga.",
        en: "English is now a real service segment: the agent can open a BAU case with Language = EN, and the case summary comes out in English for you to copy. BAU availability gained a third row in the Central — until someone publishes dates for EN, the English agent's panel falls back to the first segment that has them."
      }
    },
    {
      icon: "balance",
      title: {
        pt: "O idioma do agente e o do caso são coisas separadas",
        es: "El idioma del agente y el del caso son cosas separadas",
        en: "The agent's language and the case's language are separate"
      },
      text: {
        pt: "No app do agente eles deixaram de ser o mesmo botão. Para você isso significa que o campo Idioma do caso continua dizendo o idioma do ATENDIMENTO — não o que o agente escolheu para a ferramenta dele. O resumo e os e-mails automáticos seguem esse campo, como já seguiam.",
        es: "En la app del agente dejaron de ser el mismo botón. Para ti eso significa que el campo Idioma del caso sigue diciendo el idioma de la ATENCIÓN — no el que el agente eligió para su herramienta. El resumen y los correos automáticos siguen ese campo, como ya lo hacían.",
        en: "In the agent's app they are no longer the same button. For you that means the case's Language field still states the language of the ENGAGEMENT — not the one the agent picked for their own tool. The summary and the automated emails follow that field, as they already did."
      }
    }
  ]
};

// A Central de Conteúdo tem as SUAS notas, com as mesmas regras (versão, uma
// release por vez, `{ pt, es, en }` resolvido pelo idioma da TELA). Quem abre a
// Central (ADMIN, QA, WFM, TL que edita conteúdo) não é o mesmo público do TL
// Dashboard, e um TL que usa as duas telas leria em cada uma o que mudou NELA.
const CW_CONTENT_RELEASE_NOTES = {
  version: "6.5.0",
  title: {
    pt: "Novidades da Central de Conteúdo",
    es: "Novedades de la Central de Contenido",
    en: "What's new in the Content Hub"
  },
  items: [
    {
      icon: "translate",
      title: {
        pt: "A Central agora fala português, espanhol e inglês",
        es: "La Central ahora habla portugués, español e inglés",
        en: "The Hub now speaks Portuguese, Spanish and English"
      },
      text: {
        pt: "Um seletor novo no topo da tela troca o idioma da interface. Ela já abre no idioma cadastrado para você na aba Pessoas, e a sua escolha fica guardada neste navegador. A tradução está entrando por partes: menu, títulos e textos fixos de cada aba primeiro; listas e editores seguem nas próximas versões.",
        es: "Un selector nuevo en la parte superior cambia el idioma de la interfaz. Ya abre en el idioma registrado para ti en la pestaña Personas, y tu elección queda guardada en este navegador. La traducción entra por partes: menú, títulos y textos fijos de cada pestaña primero; listas y editores siguen en las próximas versiones.",
        en: "A new selector at the top switches the interface language. It already opens in the language registered for you in the People tab, and your choice is saved in this browser. The translation is arriving in parts: menu, titles and fixed text of each tab first; lists and editors follow in the next versions."
      }
    },
    {
      icon: "language",
      title: {
        pt: "Idioma da interface e idioma do conteúdo são escolhas separadas",
        es: "Idioma de la interfaz e idioma del contenido son elecciones separadas",
        en: "Interface language and content language are separate choices"
      },
      text: {
        pt: "O seletor do menu lateral passou a se chamar \"Idioma do conteúdo\" e continua decidindo qual catálogo você revisa. Assim dá para ler a tela em português e revisar o conteúdo em espanhol, ou o contrário.",
        es: "El selector del menú lateral pasó a llamarse \"Idioma del contenido\" y sigue decidiendo qué catálogo revisas. Así puedes leer la pantalla en español y revisar el contenido en portugués, o al revés.",
        en: "The side menu selector is now called \"Content language\" and still decides which catalog you are reviewing. So you can read the screen in English and review the content in Spanish, or the other way around."
      }
    },
    {
      icon: "campaign",
      title: {
        pt: "Novidades da versão, aqui mesmo",
        es: "Novedades de la versión, aquí mismo",
        en: "What's new, right here"
      },
      text: {
        pt: "Este aviso é novo: quando a Central mudar, ele abre uma vez sozinho. Depois, o botão de megafone no topo mostra de novo o que mudou nesta versão.",
        es: "Este aviso es nuevo: cuando la Central cambie, se abrirá solo una vez. Después, el botón del megáfono en la parte superior vuelve a mostrar lo que cambió en esta versión.",
        en: "This notice is new: when the Hub changes, it opens once on its own. After that, the megaphone button at the top shows again what changed in this version."
      }
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
 *
 * `fileName` é o do template que está sendo montado: a Central recebe as notas
 * dela, e qualquer outro dashboard (hoje, só o do TL) recebe as do TL.
 */
function buildReleaseNotesJson(fileName) {
  return JSON.stringify(fileName === 'ContentDashboard' ? CW_CONTENT_RELEASE_NOTES : CW_DASH_RELEASE_NOTES);
}
