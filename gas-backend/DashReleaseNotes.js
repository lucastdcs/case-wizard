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
  version: "6.6.0",
  title: {
    pt: "Novidades do TL Dashboard",
    es: "Novedades del TL Dashboard",
    en: "What's new in the TL Dashboard"
  },
  items: [
    {
      icon: "menu_book",
      title: {
        pt: "A documentação do projeto está no rodapé",
        es: "La documentación del proyecto está en el pie de página",
        en: "The project documentation is in the footer"
      },
      text: {
        pt: "O rodapé do dashboard ganhou o link \"Docs\", ao lado do link de bug e sugestão: ele abre o deck de documentação do Case Wizard. Esta é a única mudança do dashboard nesta versão — a fila, a decisão e o histórico funcionam exatamente como antes.",
        es: "El pie del dashboard ganó el enlace \"Docs\", junto al enlace de bugs y sugerencias: abre la presentación de documentación de Case Wizard. Es el único cambio del dashboard en esta versión — la cola, la decisión y el historial funcionan exactamente como antes.",
        en: "The dashboard footer gained a \"Docs\" link, next to the bug and suggestion link: it opens the Case Wizard documentation deck. It is the only dashboard change in this version — the queue, the decision and the history work exactly as before."
      }
    }
  ]
};

// A Central de Conteúdo tem as SUAS notas, com as mesmas regras (versão, uma
// release por vez, `{ pt, es, en }` resolvido pelo idioma da TELA). Quem abre a
// Central (ADMIN, QA, WFM, TL que edita conteúdo) não é o mesmo público do TL
// Dashboard, e um TL que usa as duas telas leria em cada uma o que mudou NELA.
const CW_CONTENT_RELEASE_NOTES = {
  version: "6.6.0",
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
        pt: "Um seletor novo no topo da tela troca o idioma da interface. Ela já abre no idioma cadastrado para você na aba Pessoas, e a sua escolha fica guardada neste navegador. O seletor do menu lateral passou a se chamar \"Idioma do conteúdo\", ganhou o inglês e segue decidindo qual catálogo você revisa — dá para ler a tela em português e revisar o conteúdo em espanhol ou em inglês. A tradução está entrando por partes: menu, títulos e textos fixos de cada aba primeiro; listas e editores seguem nas próximas versões.",
        es: "Un selector nuevo en la parte superior cambia el idioma de la interfaz. Ya abre en el idioma registrado para ti en la pestaña Personas, y tu elección queda guardada en este navegador. El selector del menú lateral pasó a llamarse \"Idioma del contenido\", ganó el inglés y sigue decidiendo qué catálogo revisas — puedes leer la pantalla en portugués y revisar el contenido en español o en inglés. La traducción entra por partes: menú, títulos y textos fijos de cada pestaña primero; listas y editores siguen en las próximas versiones.",
        en: "A new selector at the top switches the interface language. It already opens in the language registered for you in the People tab, and your choice is saved in this browser. The side menu selector is now called \"Content language\", gained English and still decides which catalog you are reviewing — you can read the screen in Portuguese and review the content in Spanish or English. The translation is arriving in parts: menu, titles and fixed text of each tab first; lists and editors follow in the next versions."
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
    },
    {
      icon: "star",
      title: {
        pt: "Links: destaques, prévia e categorias novas",
        es: "Links: destacados, vista previa y categorías nuevas",
        en: "Links: highlights, preview and new categories"
      },
      text: {
        pt: "Em Links, a nova aba \"Destaques\" publica até 3 itens em evidência no app do agente, com janela de exibição e uma confirmação de quem vai ver e quando. O editor de link ganhou os campos \"O que é\" e \"Quando usar\", em PT/ES/EN, e dá para criar categorias novas de link (nome, cor e ícone), que passam pela fila de aprovação.",
        es: "En Links, la nueva pestaña \"Destaques\" (Destacados) publica hasta 3 elementos en evidencia en la app del agente, con ventana de exhibición y una confirmación de quién los verá y cuándo. El editor de enlaces ganó los campos \"O que é\" (Qué es) y \"Quando usar\" (Cuándo usar), en PT/ES/EN, y se pueden crear categorías nuevas de enlaces (nombre, color e ícono), que pasan por la cola de aprobación.",
        en: "In Links, the new \"Destaques\" (Highlights) tab publishes up to 3 featured items in the agent's app, with a display window and a confirmation of who will see them and when. The link editor gained the \"O que é\" (What it is) and \"Quando usar\" (When to use) fields, in PT/ES/EN, and you can create new link categories (name, color and icon), which go through the approval queue."
      }
    },
    {
      icon: "mail",
      title: {
        pt: "E-mails da Central mais claros, e só para quem está na equipe",
        es: "Correos de la Central más claros, y solo para quien está en el equipo",
        en: "Clearer Hub emails, sent only to people still on the team"
      },
      text: {
        pt: "Os avisos de proposta, de decisão e de pendência parada agora têm o layout dos e-mails do BAU: cartão com os detalhes (módulo, item, ação, autor), botão para abrir a Central e o motivo da devolução em destaque. E quem sai da aba Pessoas deixa de receber esses e-mails — a baixa passa a desativar também o acesso à Central, respeitando a trava de governança.",
        es: "Los avisos de propuesta, de decisión y de pendiente detenida ahora tienen el diseño de los correos de BAU: tarjeta con los detalles (módulo, elemento, acción, autor), botón para abrir la Central y el motivo de la devolución destacado. Y quien sale de la pestaña Personas deja de recibir esos correos — la baja pasa a desactivar también el acceso a la Central, respetando la traba de gobernanza.",
        en: "The proposal, decision and stalled-approval notices now use the BAU email layout: a card with the details (module, item, action, author), a button to open the Hub and the reason for a return highlighted. And anyone removed from the People tab stops receiving these emails — the removal now also deactivates their Hub access, respecting the governance lock."
      }
    },
    {
      icon: "menu_book",
      title: {
        pt: "A documentação do projeto está no rodapé",
        es: "La documentación del proyecto está en el pie de página",
        en: "The project documentation is in the footer"
      },
      text: {
        pt: "O rodapé da Central ganhou o link \"Docs\", que abre o deck de documentação do Case Wizard — inclusive na tela de \"sem acesso\".",
        es: "El pie de la Central ganó el enlace \"Docs\", que abre la presentación de documentación de Case Wizard — también en la pantalla de \"sin acceso\".",
        en: "The Hub footer gained a \"Docs\" link, which opens the Case Wizard documentation deck — including on the \"no access\" screen."
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
