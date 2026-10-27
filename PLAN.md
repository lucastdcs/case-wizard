<!-- generated-by: groundrules v1.10.0 -->
# PLAN — Case Wizard

**Active** plan/todo for the project. Maintained by Claude during work.

This file differs from the long-term roadmap: it describes what is happening **now**.

## In progress

- [~] **Home de Links: destaques, prévia e categorias (2026-10-23, ADR-0019).**
      Pedido do Lucas: agentes reclamam de procurar formulários/planilhas por
      nome dentro de Links. Entregue o desenho inteiro (variante A, painel de
      prévia fixo, janela de 860px) — backend, Central, app, testes e docs:
      1. [x] **Backend** (`ContentAPI.js`): módulos `link_categories` (catálogo)
         e `link_highlights` (publicação direta), prévia `about`/`when` no
         link, janela e capacidade (máx. 3 no ar em qualquer instante futuro)
         no servidor, `checkLinkHighlight`, `getLinkHighlightsConfig`,
         `endLinkHighlight`, `migrateFeedbackLinksNow`. `test:content` +36.
      2. [x] **App** (`links-model.js` puro + `links-assistant.js` reescrito):
         home com destaques + Favoritos/Recentes/Saíram do destaque, painel de
         prévia, busca sem acento, favoritos/recentes na nuvem por `Lineage`,
         migração do histórico antigo. `test:links`, `smoke:links` (28).
      3. [x] **Central**: Biblioteca | Destaques, editor de destaque com
         prévia do cartão, editor de link com prévia ×3 idiomas, "Nova
         categoria". `smoke:content` +28.
      4. [x] **Categoria Feedback**: do sistema, com "Elogios" movido de QA.
      5. [ ] **Rodar em produção, nesta ordem** (ver Waiting/blocked): frontend
         novo no ar → `migrateFeedbackLinksNow()` → conferir no app.
      6. [x] **Notas de versão**: `CW_CONTENT_RELEASE_NOTES` subiu para 6.6.0 e
         os itens foram reescritos na release v6.6.0 (`RELEASE.md`).
      Fora do escopo, de propósito: tradução dos editores de Links na Central
      (ADR-0017, fase 2 — os textos novos estão em português); painel de
      prévia abaixo de 1000px de largura (a lista fica sozinha).

- [~] **Pre-call Checklist (2026-10-23, ADR-0018).** Formulário que escreve o
      bloco "Pre-call checklist" no card de nota (ou copia), com tasks, telefone,
      e-mail, site e CID capturados da tela do caso e marcados como *Auto*.
      Sub-recurso do Case Notes (`src/modules/notes/precall/`), botão próprio na
      pílula e entrada no Ctrl+K. Nota **sempre em inglês** (exceção à regra dos
      dois idiomas); texto travado em `test:precall` (25) e a tela real em
      `smoke:precall` (22, com interface ES × atendimento PT). Só frontend.
      **Falta confirmar:**
      - com quem audita, a linha de exceção `Completed: No → motivo` (veio do texto
        do SOP, não de uma nota real) e as opções do *Next steps* — o SOP cita só
        OOS e Infeasible como filtros, e a lista `Proceed / OOS / Infeasible` é a
        mais curta que os cobre;
      - no CRM ao vivo, a captura: contra as duas capturas reais de
        `specs/fixtures/` (original e traduzida) ela devolveu tasks, telefone,
        e-mail, site e CID corretos, mas as tasks chegam como **slug** no idioma
        original (mapeadas para o nome do catálogo) e como frase em português na
        tela traduzida (passam como vieram). O CID sai com traços
        (`123-456-7890`, como o BAU Form grava) — confirmar que a auditoria aceita;
      - ~~ao fechar a release: nota de versão do modal do agente
        (`RELEASE_NOTES`) falando do botão novo~~ — feito na v6.6.0 (primeiro
        slide). O slide pede ao agente que **confira** o que veio como *Auto*
        antes de gerar, porque a captura ainda não foi vista no CRM ao vivo.
      **Build avulso (2026-10-27, ADR-0020):** `npm run build:precall` gera um
      arquivo só com raspagem + formulário (`dist/precall-standalone.js` e o
      favorito `dist/precall-bookmarklet.txt`) para enviar ao SME que valida as
      duas dúvidas acima; `smoke:precall-standalone` (29, com a variante `-en`). Falta: o SME rodar no
      CRM ao vivo — a captura e o Trusted Types só foram provados no mock.

- [~] **Idiomas na Central de Conteúdo + novidades da versão (2026-10-14,
      ADR-0017).** Seletor de idioma da **interface** (PT/ES/EN) no topo,
      separado do idioma do **conteúdo** (trilho); abre pelo `defaultLanguage`
      da People, escolha manual salva no navegador. Junto, o modal de novidades
      no padrão do TL (`CW_CONTENT_RELEASE_NOTES`). Tradução por fases:
      1. [x] **Casca** — topo, trilho, boot/recusa, cabeçalho das abas, textos
         fixos dos painéis, aviso de permissão. `smoke:content` (+21),
         `test:content` (+1), `test:dash-changelog` (cobre os dois painéis).
      2. [ ] **Catálogo** (`_Catalog`): listas, editores e estados vazios de
         links, call script, notas, tasks, e-mails e dicas.
      3. [ ] **Operação** (`_Ops`): avisos e disponibilidade, confirmação de
         publicação.
      4. [ ] **Governança** (`_Governance`) e o resto do `_Core`: aprovações,
         pessoas, auditoria, papéis, acessos, histórico, busca, "ver como",
         atividade, home e toasts.
      - [x] "Idioma do conteúdo" ganhou EN, com o conserto do editor de e-mail
        que apagaria os `labels` de um modelo EN (`smoke:content` +2).
      ~~Ao fechar a release: subir `CW_CONTENT_RELEASE_NOTES.version`~~ — feito
      na v6.6.0, a primeira release em que as notas da Central existem. Cada
      fase nova que entregar tradução precisa reescrever os itens na release dela.

- [~] **Revisão do fluxo de descarte do BAU Form (2026-09-21).** Três frentes
      levantadas pelo Lucas. A primeira saiu; as outras duas estão abertas.
      1. [x] **E-mail do descarte** — dois defeitos, ambos silenciosos: descarte
         aberto do zero mandava `AGENT_BAU_SENT` (o texto de abertura de caso), e
         a seção de detalhes imprimia "Agendamento (SLA)" e "Procedimento" num
         fluxo que não pergunta nenhum dos dois. Ver CHANGELOG `[Unreleased]`.
         Travado em `test:tl-decision` (+7); nos dois primeiros o código anterior
         falha, e os de campo nem carregam.
      2. [x] **AM sempre igual, mesmo depois da v6.3.3 — RESOLVIDO.** Não era a
         lista dos 50 nem autofill do Chrome: era **resto de DOM**. O relato
         decisivo foi "abro outro caso e vem o AM do caso já FECHADO" — dado do
         caso anterior, não constante. `mensagensDoLog()` varria o `document`
         inteiro, e o CRM mantém o container do log anterior no DOM. Escopado a
         `.active-case-log-container`; reproduzido contra a captura real do CRM
         (o código antigo devolve o AM do caso anterior nos dois cenários) e
         travado em `test:scraping` (`am.escopo/*`, +4 asserções). Junto: botão
         de recaptura no formulário, no molde do call script.
      3. [~] **Repaginação da tela do BAU Form — camada estrutural entregue.**
         As quebras diagnosticadas em navegador real foram consertadas e estão
         no CHANGELOG `[Unreleased]`: o `top: 56px` da vista de detalhes (que
         descontava um header não-ancestral), os três contextos de rolagem
         aninhados, o `margin-top` que estourava o container, o dashboard que
         nunca era escondido, a janela de 650px (agora 900x720, com altura
         fixa), o `PENDING_TL_DISCARD` cru, a fila de descarte fora das
         métricas, o sobrenome sumido no card e o selo de status esticado.
         **Falta a camada sensorial (3b)** e duas decisões com o Lucas:
         - **mestre-detalhe vs. painel sobreposto.** Com 900px cabe lista à
           esquerda + detalhe à direita, sem troca de tela. Mata a classe
           inteira de bugs de sobreposição, mas é reescrita da view, não
           conserto — por isso não entrou aqui.
         - **Material + feedback tátil/sonoro**: elevação com significado na
           transição dashboard→detalhes, som nas transições de status,
           micro-recompensa no envio. É o "dopaminérgico" do `VISION.md`.
         Dois itens de acabamento que ficaram de fora por serem escopo próprio:
         - o FAB "Novo Caso BAU" cobre 7px do acordeão "mostrar casos antigos"
           quando a lista rola pouco. É comportamento padrão de FAB (Material
           manda flutuar sobre o conteúdo, com `padding-bottom` na área
           rolável, que já existe), mas o Material também diz que um FAB não
           deve obstruir controle interativo. Conserto de verdade é tirar o FAB
           do fluxo de rolagem, e isso é decisão de layout.
         - ainda há ~400px de conteúdo abaixo da dobra na vista de detalhes,
           agora numa rolagem só. Menos que os 600px de antes; some de vez com
           o mestre-detalhe.

- [~] **Tasks e screenshots do Win Criteria na Central** (módulo
      `task_screenshots`, aba "Tasks") — entregue, aguardando revisão do PR e a
      semeadura na planilha real. As 13 tasks e os 126 rótulos de evidência
      saíram do `TASKS_DB` do bundle (que ficou como fallback embutido, como
      links e dicas), o espanhol saiu do mapa por frase `SCREENSHOT_LABEL_ES` e
      virou coluna ao lado da lista base — posicional e do mesmo tamanho —, e
      criar task nova passou a ter caminho pela tela. ADRs `0012` (o módulo) e
      `0013` (módulo novo herda o preset nas casas ausentes de `Content_Roles` —
      sem isso o módulo nascia invisível até para o ADMIN). Testes:
      `test:tasks` (round-trip, incluindo a prova de que o ES publicado é igual
      ao do mapa antigo), `test:content` (+20), `smoke:content` (+7) e o novo `smoke:tasks`.
      **Falta**: rodar `seedTasksNow()` na planilha e conferir na tela do agente
      (ver "Waiting / blocked").
- [~] **Feedback dos TLs sobre o form BAU + Dash TL (2026-09-08).** Sete pedidos,
      investigados e abertos como #392–#397. A ordem abaixo é de ataque, não de
      pedido: os dois primeiros já saíram, os do meio dependem de decisão,
      e o último é projeto.
      1. [x] **#392 idioma + #393 sobrenome** — entregues juntos (mesmo módulo,
         mesma migração de coluna). O idioma tinha DOIS defeitos: rótulo comparado
         com caixa (`Business language` nunca casava) e travessia errada do DOM —
         ver `docs/LEARNINGS.md`. E a abertura de caso não tinha campo de idioma
         nenhum, então o `N/A` da raspagem ia direto pra planilha. Agora vem do
         `profile.defaultLanguage` num `select` editável, como o db-schema já
         mandava. Junto: coluna 23 `Adv_LastName` e `npm run smoke:bau-scraping`,
         o primeiro teste que o módulo BAU já teve.
      2. [x] **#397, primeira camada** — seletor de 7/30/90 dias no histórico do
         TL. O backend já aceitava o parâmetro; só a tela é que pedia 7 fixo, e a
         tela agora diz que o backup semanal é o teto do que ela alcança.
      3. [x] **#394 agendamento (24h + fuso na escolha + fusos dos EUA)** —
         decidido e entregue. Formato aprovado e registrado no **ADR-0010**: grava
         com deslocamento resolvido pela data do agendamento. O `datetime-local`
         saiu (o locale do navegador decide 12h/24h, e não há como forçar); no
         lugar, data + `select` de 24h + fuso. Catálogo único de fusos em
         `shared/timezones.js`, agora com os EUA — Arizona à parte, porque é
         Mountain sem horário de verão.
      4. [x] **#396 ID do caso filho na aprovação** — decidido **obrigatório**, sem
         escape, e gravado em coluna (`Child_Case_ID`) e não em aba à parte.
         Validado nos dois lados. **Fica um fio solto conhecido:** o backup semanal
         apaga a linha, e com ela o ID, uma semana depois da aprovação — quem
         resolve isso é o item 6.
      5. [x] **#395 telefone do anunciante** — autorizado a gravar. Coluna 25
         (`Adv_Phone`), captura com unmask em paralelo com a do e-mail, e a regra
         de PII mascarada foi para `specs/workflow/scraping-rules.md`.
         **Falta confirmar no CRM real:** o mock reproduz o unmask, mas só a
         página de verdade diz qual é a marcação DEPOIS do clique — se a
         heurística por dígitos não achar o número lá, é aqui que se ajusta.
      6. [x] **#397, segunda camada** — resolvida por outro caminho, mais barato:
         em vez de o dashboard ler o `Archive_BAU` (uma planilha inteira por
         chamada, num painel que já travou ao vivo — #333/#334), o **backup
         parou de deletar**. A linha arquivada continua na planilha de casos, e
         o histórico passa a alcançar tudo que ela tem. Fecha junto o fio solto
         do item 4: o `Child_Case_ID` não some mais uma semana depois da
         aprovação. ADR-0014, coberto por `npm run test:backup`.

- [x] **Fuso chegando como `null` no TL Dash.** Relatado em 2026-09-10. Não era
      raspagem: o `encodeURIComponent` do JSONP transformava `null` na string
      `"null"`, e o `|| ''` do backend não descarta string não-vazia. Consertado
      na origem (`buildQueryString`) e na leitura (`celulaTexto`), porque as
      linhas já gravadas não se curam sozinhas. Coberto por `npm run test:jsonp`.

- [ ] **Alerta de volume da fila BAU — destinatários pelo TL Dashboard (#399).**
      A lista segue **fixa no código**, rodando só para `lucaste`. Chegou a ser
      derivada da aba `People` e foi **revertida por decisão**: a régua de
      `isOverhead` é permissiva por construção, então uma categoria nova
      (`Intern`, `Contractor`) passaria a receber e-mail sem ninguém ter decidido
      isso. O destino é uma configuração explícita na tela.
      **Ação manual pendente:** rodar `setupBAUVolumeAlertTrigger()` pelo editor
      do Apps Script — o gatilho ainda não existe (mesma nota do `Backup.js`).

## Done (esta sessão)

- [~] **Release v6.6.0 cortada (2026-10-27), aguardando revisão do PR para a
      `main`.** Os 19 commits de `refactor-structure` desde a v6.5.0: home de
      Links com destaques, Pre-call Checklist (e o build avulso), idioma da
      interface da Central, link da documentação e os e-mails da Central.
      `CHANGELOG.md` fechado, as cinco fontes de versão alinhadas e as notas dos
      três modais (agente, TL, Central) reescritas. **Correção de registro:** duas
      entradas (e-mails da Central com a casca do BAU e o fix de quem saiu de
      People) estavam arquivadas dentro da seção `[6.5.0]` do CHANGELOG, mas os
      commits delas não estão na v6.5.0 — a seção divergia da `main`. Foram para
      a `[6.6.0]`, e a `[6.5.0]` voltou a ser idêntica à da `main`.
      Suíte rodada antes e depois do corte: tudo verde exceto as 2 falhas
      conhecidas de `smoke:shortcuts`. **Vai para produção sem a validação no CRM
      ao vivo** do Pre-call (captura e Trusted Types provados só no mock e nas
      capturas redigidas) — ver o item do Pre-call acima.

- [~] **Link da documentação (deck de slides) onde o agente trava e nas duas
      telas do Apps Script (2026-10-23).** No bookmarklet: "?" do cabeçalho de
      todo módulo + Configurações → Suporte & Feedback. No TL Dashboard e na
      Central (inclusive na tela de "sem acesso"): rodapé "Docs" do
      `buildCreditHtml()`. Uma URL só, em `shared/config.js` (`DOCS_URL`) e no
      espelho do backend (`CW_DOCS_URL`), travadas iguais por
      `test:deployment-env`. Os smokes dos dashboards deixaram de apagar o
      rodapé. **Falta:** conferir com um agente comum que o deck abre sem
      pedir acesso (ver "Waiting / blocked").

- [x] **Inglês de ponta a ponta (2026-10-13).** Terceiro idioma em toda a
      cadeia: os ~21 dicionários de interface, 76 linhas de conteúdo operacional
      (26 cenários, 8 modelos de e-mail, 42 passos de call script), rótulos de
      evidência, descrições de link, tela do TL, e-mail automático do Apps
      Script e os cinco HTMLs da Central. `BAU_SEGMENTS` ganhou `EN`, então a
      operação BAU em inglês existe de fato.
      - **Decisão estrutural**: idioma da interface e idioma do atendimento
        viraram knobs independentes (ADR-0016), desfazendo em parte a unificação
        do ADR-0001. Sem isso, pôr a ferramenta em inglês passaria a gravar case
        notes em inglês em casos PT/ES, em silêncio.
      - **Dois defeitos reais** achados pelos testes, do mesmo formato
        (`if ES … else base`): a linha EN sobrescrevia o cenário PT em
        `note-templates-service`, e duplicava os modelos de e-mail sem
        placeholders. Regra em `docs/LEARNINGS.md`.
      - **TL Dashboard**: além do dicionário EN, ganhou seletor PT/ES/EN na
        barra — antes o idioma vinha só do segmento, sem como trocar.
      - **Notas de versão dos dois modais** (agente e TL) passaram a carregar os
        três idiomas; eram PT-only, com botão traduzido e slide em português.
      - **Cobertura nova**: `test:i18n` (paridade dos dicionários) e
        `smoke:i18n` (qual knob cada lugar lê, com os knobs divergentes).
      - Suíte: 15/15 `test:*` verdes, `test:scraping` 62/62, smokes verdes
        exceto as 2 falhas de `smoke:shortcuts` já conhecidas desde a v6.3.3
        (reproduzidas na branch limpa antes de começar — não são desta mudança).

- [x] **Release v6.4.0 (2026-09-24).** Os 13 commits acumulados em
      `refactor-structure` desde a v6.3.3 — com o conserto do AM do caso
      anterior à frente — fechados no CHANGELOG, versões alinhadas e notas dos
      dois modais (agente e TL) reescritas. Suíte rodada antes do merge: todos
      os `test:*` verdes, `test:scraping` 62/62, e os smokes verdes exceto
      `smoke:shortcuts` (2 falhas na lista de Configurações que **já existem na
      v6.3.3** — reproduzidas na `main` — e não vieram desta release). Tag
      pendente, ver "Waiting / blocked".
- [x] **As tasks do form BAU não vinham da Central.** Verificado: não vinham —
      o `bau-form-config.js` tinha uma lista de 17 nomes escrita à mão, de antes
      da Central existir, e ela já divergia do catálogo publicado em três eixos
      (5 tasks só no form, 1 só na Central, 8 com nome diferente para a mesma
      coisa). A grade passa a sair do mesmo `TASKS_DB` que a Central reescreve, e
      só o **nome** — o form não pede screenshot, isso é da nota. **ADR-0014**
      registra a consequência aceita: as 5 órfãs somem da grade, e voltar com
      qualquer uma delas é criar pela tela da Central. Caso pendente gravado com
      nome antigo não perde a task ao ser editado (volta marcada). Testes:
      `test:tasks` (+4) e o novo `smoke:bau-tasks`.

- [x] **v6.3.3 cortada e promovida.** Fecha o `[Unreleased]` do CHANGELOG, alinha
      as quatro fontes de versão (`package.json`, `APP_VERSION`,
      `RELEASE_NOTES.version` e `CW_DASH_RELEASE_NOTES.version`) e reescreve os
      dois changelogs: o do bookmarklet conta ao agente que o AM virou e-mail e
      que a sugestão de descarte passou a salvar de verdade; o do TL Dashboard
      conta o disclaimer novo e que as correções do agente agora chegam. Suíte
      completa verde antes do merge, `smoke:env-badge` incluído (é o que prova
      que o build de produção não leva o selo de dev).
      **Depois do merge, conferir no Actions:** o job do backend promove a
      implantação de produção antes de publicar o frontend — se ele falhar, o
      frontend não sai, e é isso que evita meio-deploy.

- [x] **Sugestão de descarte: invisível no modal do TL e não editável de fato.**
      Relatado em 2026-09-16 como "o campo não aparece para o TL". Eram três
      defeitos encadeados:
      1. **Tela** — o campo só renderizava quando era "Sim", e como selo. "O
         agente vai implementar" e "o campo não chegou" eram a mesma tela em
         branco. Virou disclaimer no topo do briefing, com os dois lados por
         extenso e um terceiro estado para célula vazia. Padrão registrado em
         `specs/ui-ux/design-system.md`.
      2. **Escrita** — a edição nunca gravava a coluna 21 (fora do bloco
         contíguo 4-18 do `setValues`): o agente editava, o payload chegava, e o
         valor era descartado em silêncio.
      3. **Leitura** — `getAgentCases` não devolvia o campo, então o `<select>`
         da edição abria sempre em "Não". Consertar só o item 2 teria
         transformado um no-op silencioso em **perda de dado** silenciosa.
      `BAU_API.js` ganhou seu primeiro teste (round-trip agente→TL no
      `test:tl-decision`, +5) e `smoke:tl-dash` foi de 30 para 36.
      Junto: `RELEASE.md` listava **três** fontes de versão e o
      `test:dash-changelog` cobra uma quarta (`CW_DASH_RELEASE_NOTES`) — seguir o
      doc à risca quebrava o teste. Corrigido.
      Notas de versão reescritas nos DOIS changelogs (bookmarklet e TL
      Dashboard) e a v6.3.3 cortada — ver abaixo.


- [x] **AM sempre em e-mail + o fallback que repetia o mesmo AM.** Relatado em
      2026-09-16: "AM Responsável" no modal do TL Dash vinha como nome, e
      suspeita de que o mesmo AM estivesse indo para todos os casos. As duas
      coisas eram verdade e são independentes:
      `captureAMName()` preferia o nome de exibição (`am.nome || am.email`), e o
      fallback do resolver pegava o **primeiro `<internal-user-info>` da tela** —
      um bloco que lista os contatos da **conta** (55, mesmo papel, mesma ordem),
      logo idêntico em todos os casos daquele anunciante. Todo caso que o log não
      resolvia gravava o mesmo nome, em silêncio. Agora: e-mail sempre (com
      validação no campo do formulário) e fallback só com **um** contato interno
      na tela — ambíguo devolve `null`. `test:scraping` passou a cobrir os
      caminhos de fallback (58 asserções, era 50).
      **Falta confirmar no CRM real:** com que frequência o AM passa a vir vazio
      nos casos em que o log não tem `@google.com` — é o custo consciente de não
      chutar, e o número decide se vale caçar outra fonte para o AM.

- [~] **Histórico clicável + justificativa da recusa** (branch
      `feat/historico-clicavel-e-justificativa`, v6.3.2). Terceira rodada sobre o
      painel do TL.
      1. **Histórico** — `getWeeklyHistory` devolvia 8 campos contra os 20 da
         fila, por isso a aba só mostrava o número. As duas leituras saem agora
         do mesmo `mapBAURow_`. Clicar abre a vista de detalhes com uma zona
         "Decisão" (quem/quando/caso filho/justificativa) e **sem** rodapé de
         ação.
      2. **Justificativa** — coluna 26 `TL_Justification`, obrigatória em
         `REJECTED_CREATION` e `KEPT_ACTIVE`, validada nos dois lados e enviada
         no e-mail do agente.
      3. **Bug pego pelo teste:** a tela pedia justificativa nas decisões
         erradas. `isPositive` só diz se o `newStatus` é `CREATED`, e no fluxo de
         descarte `CREATED` significa *negar* o pedido. A régua agora deriva a
         ação como o servidor deriva.
      Testes: `test:tl-decision` (13, o primeiro que o `BAU_Dashboard.js` tem) e
      `smoke:tl-dash` de 21 para 30. **Em produção desde a v6.3.2** (2026-09-16).

- [~] **Vista de caso remodelada + changelog do TL Dashboard.** Segunda rodada
      de feedback sobre o modal do TL.
      1. **Três zonas por propósito** (ADR-0015): cabeçalho (anunciante, selos,
         autoria), briefing (o que fazer / motivo / justificativa / agendamento —
         **leitura, sem copiar**) e dados (o que vai pro CRM). 900px, rodapé com
         aprovar/rejeitar, nome e sobrenome separados com `N/A`. Padrão
         registrado em `specs/ui-ux/design-system.md`.
      2. **Acessibilidade:** a fila era `<div onclick>` e não abria pelo teclado,
         contrariando o próprio design-system. Virou botão; `Esc` fecha e o foco
         volta.
      3. **Changelog do dashboard** — `gas-backend/DashReleaseNotes.js`, injetado
         pelo servidor, com guarda de sincronia de versão em
         `npm run test:dash-changelog`.
      `smoke:tl-dash` foi de 9 para 21 asserções. **Em produção desde a
      v6.3.2** (2026-09-16).

- [~] **Resumo copiável do caso no TL Dashboard + backup que copia em vez de
      mover.** Dois pontos do fluxo BAU, entregues juntos porque o segundo é o
      que faz o primeiro valer depois de uma semana.
      1. **Resumo** — último bloco da vista de detalhes, com a headline
         `Caso LM para BAU`. Texto concatenado do que o agente já preenche
         (nada novo pedido no formulário), no idioma do **atendimento** e não no
         da tela do TL. Conteúdo decidido por subtração: fora o que já está no
         caso filho por ser da mesma conta (nome, CID, site, sales program) e
         fora a PII (e-mail, telefone). Descarte não ganha resumo. Regra em
         `specs/workflow/bau-lifecycle.md`.
      2. **Backup** — `runWeeklyBackup()` copia e não remove (ADR-0014).
         Idempotente pelos IDs já no arquivo. Sem reset e sem poda: a planilha
         que a operação mantém desde 2024 tem ~5.000 linhas.
      Testes novos: `npm run test:backup` (9) e `npm run smoke:tl-dash` (9, a
      tela real no Chromium). **Em produção desde a v6.3.2** (2026-09-16).
      **Falta validar na planilha de verdade** — ver "Waiting / blocked".

- [x] **Auditoria e correção da raspagem do CRM.** Rodando as funções reais
      contra uma captura real da tela, 7 das 10 capturas voltavam vazias — a
      tela estava traduzida e a raspagem casava rótulo em inglês. Corrigido
      via `crm-labels.js` (rótulo normalizado PT/ES/EN, por igualdade),
      `am-resolver.js` (o AM do BCC vem do case log, não do assignee —
      ADR-0011), CID só por rótulo, case ID por `debug-id`, identidade sem
      abrir o menu de perfil. Novos: `case-context.js` e `case-log-parser.js`.
      Travado por `npm run test:scraping` (8/20 → 46/46 asserções).

## Up next

- [ ] **Central de Conteúdo em PT/ES/EN (decidido em 2026-10-13).** A rodada do
      inglês cobriu a dimensão de CONTEÚDO da Central (seletor de idioma dos
      modelos, coluna de tradução das evidências, EN na prévia "como o agente
      vê"), mas **o cromo da própria Central segue 100% em português** — e nunca
      teve espanhol tampouco. São várias centenas de strings cravadas em
      template literals nos 4 HTMLs, sem `t()` e sem dicionário: diferente do
      bundle, onde a estrutura `{pt, es}` já existia, aqui ela precisa ser criada
      antes de traduzir qualquer coisa.
      Ficou fora da v6.5.0 de propósito: o público é SME/maintainer, pequeno e
      interno, enquanto o agente e o TL são a operação. Alvo acordado: **PT + ES
      + EN**, para não deixar o SME espanhol de fora numa segunda passada.
      Ordem sugerida: infra de `t()` compartilhada entre os 4 arquivos →
      extração das strings → tradução → controle de idioma na barra, no molde do
      que o TL Dashboard acabou de ganhar.

- [ ] **Consumir `appointmentTasks`.** Já exposto no `pageData` (multivalorado),
      sem consumidor. A ideia mais valiosa é usá-lo para pré-selecionar script
      de call e template de nota, mas isso depende de uma tabela
      task → script/template que é regra de negócio da operação.
- [ ] **Exibir o contexto do caso e os fatos do log** em algum lugar da UI
      (`caseContext` e `caseLog` já vêm no `pageData`, ninguém lê ainda).
- [ ] **Histórico do anunciante**: o Interaction History lista os casos
      anteriores; daria para avisar "este cliente já abriu N casos". Não
      implementado por falta de consumidor definido.
- [ ] **Telemetria de captura**: registrar qual estratégia resolveu cada campo
      (`debug-id` / rótulo / fallback) para ver o CRM mudando antes de a nota
      sair errada. `amOrigem` já faz isso para o AM.

Plano em seis fases da Central de Conteúdo, em ordem de dependência (não de
prioridade). Cada fase é um ou mais PRs contra `refactor-structure`.

**Todas as seis fases fecharam e foram para produção na v6.2.0** (2026-09-08).
O que sobrou delas está em *Waiting / blocked* abaixo: são passos que só rodam
com a planilha de produção na frente.

- [x] **Fase 0 da Central de Conteúdo — decidir antes de codar.** Os três ADRs
      foram escritos, validados e implementados: `0007` (trilho por regime no
      lugar das dez abas), `0008` (cache da leitura pública + retenção por aba) e
      `0009` (matriz RBAC editável, com a correção de rota registrada no próprio
      ADR). A maquete estática do "Hoje" não chegou a ser feita: a validação
      visual acabou acontecendo a cada PR, pelas capturas do smoke em navegador
      real — que é a mesma proteção que `docs/LEARNINGS.md` cobrou na paleta, por
      um caminho mais barato. Revisão de UX que originou o plano feita em
      2026-09-02, revalidada contra a `refactor-structure` depois da entrada da
      aba Pessoas.
- [x] **Fase 1 — correção e carga** — entregue e em produção na v6.2.0.
      `LockService` em aprovar/publicar/reverter — hoje duas aprovações
      simultâneas do mesmo rascunho publicam o item duas vezes, sem erro em log
      nenhum; `CacheService` na leitura pública com invalidação explícita;
      parâmetro `modules=a,b,c` + manifesto para o boot do agente virar uma
      chamada em vez de sete; leituras/escritas em lote; um
      `saveAndSubmitContentDraft` no lugar das três idas em série de hoje; falha
      de rede visível em vez de lista vazia. **PR irmão:** e-mail de decisão
      (aprovação e rejeição) para o autor da proposta, com a justificativa do
      revisor e link derivado de `getDeploymentEnv()` — corrigindo junto o
      `TL_DASHBOARD_URL` do `EmailEngine.js`, hoje fixo em produção mesmo quando
      o e-mail sai de dev.
      **Correção de rota durante a implementação:** o `TL_DASHBOARD_URL` fixo
      NÃO é bug — o comentário no `EmailEngine.js` explica que aqueles e-mails
      também saem por gatilho de tempo, onde `getUrl()` pode devolver outra
      implantação. Ficou como está; o link novo da Central usa
      `buildDeploymentPageUrl()` porque aprovar/rejeitar só roda em requisição
      web. **Fora do PR:** o manifesto (módulo → versão) foi descartado — com a
      chamada em lote ele não reduz execução nenhuma, só payload, e não paga a
      complexidade. Ver a nota no ADR-0008.
- [x] **Fase 2 — casca e arquitetura** — entregue em três PRs, em produção na v6.2.0.
      Smoke Playwright da tela **antes** de qualquer mudança — hoje o
      `ContentDashboard.html` não tem teste nenhum; quebra do arquivo em includes
      do `HtmlService` como primeiro commit, mecânico; trilho escuro/glass com os
      três grupos; home "Hoje" moldada pelo papel; idioma único e persistente no
      lugar dos `select` independentes; rota por hash.
      **Correção de registro (2026-09-16):** constava aqui um "PR irmão" de
      changelog de versão na Central e no TL Dash como entregue. Ele **nunca
      existiu** — não havia nada de changelog no `gas-backend/` inteiro. O do TL
      Dash saiu agora (ver a entrada no topo); o da Central segue pendente, e a
      constante `CW_DASH_RELEASE_NOTES` já está pronta para ele.
- [x] **Fase 3 — ciclo de vida do item** — completa, em quatro PRs:
      1. **histórico e "voltar para esta versão"** — `listContentItemHistory` e
         `rollbackContentItem` existiam no backend e nunca tinham sido chamados
         pela tela, enquanto o modal de remoção prometia que a versão "pode
         voltar" sem oferecer caminho nenhum;
      2. **rascunho de verdade**, separado do envio, com a trava de edição
         visível e caminho para descartar;
      3. **diff por palavra e prévia renderizada** na revisão;
      4. **aba `Content_Log` + "Atividade recente"** — a auditoria ganhou uma
         coluna por informação no lugar do `módulo/chave` concatenado na aba
         `Logs`, `backfillContentLog()` traz o histórico antigo (simula por
         padrão, copia sem apagar), e a barra lateral mostra quem fez o quê com
         foto, filtrada **no servidor** pelo papel de quem pergunta.
      **Fora da fase:** o job de arquivamento dos 24 meses (ADR-0008), que
      pertence à rotação do `Backup.js`.
- [x] **Fase 4 — RBAC editável** (ADR-0009) — completa, em dois PRs.
      **Entregue:** aba `Content_Roles`, matriz módulo × ação, permissões globais
      à parte, papéis atuais como preset (com teste comparando preset contra a
      constante antiga — é a prova de que o dia 1 não muda nada), cache de
      permissão com invalidação imediata, `listContentRoles`/`saveContentRole`, e
      as invariantes como teste no servidor. Viraram **quatro**: a de aprovar
      autorização entrou porque "só o ADMIN" deixou de ser uma regra defensável
      quando o nome do papel virou editável — ver a correção de rota no ADR-0009.
      **Entregue também (2º PR):** a aba "Papéis" — matriz de checkboxes com
      traço onde a ação não existe, aviso de escalação ao vivo, confirmação
      mostrando o que MUDA, recarregamento da sessão ao editar o próprio papel,
      e o `<select>` da aba Acessos lendo `listContentRoleNames()`.
      **Falta validar na planilha real:** que a aba `Content_Roles` nasce
      semeada e que os quatro papéis continuam se comportando igual.
- [x] **Fase 5 — diferenciais e auditoria** — completa, em seis PRs.
      **Entregue:** "ver como" por papel e idioma — a tela inteira passa a
      mostrar o que aquele papel veria, de leitura, com a prévia intersectada no
      servidor (prévia que concede é escalação com outro nome) e dizendo na
      faixa o que deixou de mostrar.
      **Entregue também:** agendamento e validade de aviso — janela avaliada no
      servidor, no fuso da planilha, e filtrada DEPOIS do cache (dentro dele a
      janela teria a precisão do cache em vez da sua própria).
      **Entregue também:** a aba de auditoria restrita — filtro, período,
      paginação por número de linha e exportação para uma aba da planilha
      (arquivo não serve: download iniciado dentro do iframe do Apps Script é
      bloqueado com frequência e sem aviso).
      **Entregue também:** cobrança diária de pendência parada, lendo
      `CW_DEPLOYMENTS` e não a URL do serviço.
      **Entregue também:** busca global Ctrl+K — destino e conteúdo na mesma
      lista, sem acento, filtrada pelo `ver` da matriz, com duas velocidades
      (destino na tecla, conteúdo depois de 220 ms de silêncio) — e a prévia
      "como o agente vê", que resolve o item no idioma escolhido e nomeia o que
      falta em vez de mostrar cartão vazio.
      **Correção logo depois:** metade das ações apareciam na auditoria com o
      nome interno (`role_update`) porque nasceram depois da barra lateral e
      ninguém traduziu. Só apareceu olhando a tela renderizada.

## Ideas — to triage

Raw ideas, captured before they're lost (e.g. via `/groundrules:idea`). Not yet vetted. Each gets triaged later → a **decision** (ADR), a **build** (PRD), a **milestone** (ROADMAP), or dropped.

- [ ] ...

## Waiting / blocked

- [ ] **Links (ADR-0019): ordem de implantação.** Um pacote **antigo** quebra ao
      desenhar um link cuja categoria não tem tema (`CAT_THEMES[key].color`), e o
      `deploy.yml` sobe o backend **antes** do frontend (`needs: deploy-backend-gas`).
      Em cada ambiente (a branch `refactor-structure` promove o dev, `main` o
      produção): (1) esperar o job do frontend terminar → (2) no editor do Apps Script, rodar
      `migrateFeedbackLinksNow()` com um usuário que **aprova e propõe links**
      (devolve `{ moved, skipped }`; idempotente) → (3) só então publicar links em
      categorias criadas pela Central. Abas do CRM abertas precisam recarregar.
      O seed (`seedLinksNow()`) **não** serve: só escreve em módulo vazio.
- [ ] **Decidir com o Lucas quais outros formulários vão para "Feedback"**
      (hoje só "Elogios" foi movido). Candidatos: "Casos Complexos", "Relatório
      de Bugs". Mover é editar a categoria do link na Central — sem deploy.

- [ ] **Conferir que o deck de documentação abre para quem não é o dono.** A URL
      leva `resourcekey` e termina em `/preview`, mas a permissão do arquivo não
      é verificável daqui. Abrir o link numa conta de agente e numa de TL, fora
      da conta que criou o deck: se cair em "solicitar acesso", ajustar o
      compartilhamento do deck (a URL não muda). O link só chega ao agente com
      a próxima release; no TL e na Central, com o deploy do backend.
- [ ] **Empurrar as tags `v6.4.0`, `v6.5.0` e `v6.6.0`** de um checkout local (o
      proxy da sessão web recusa push de tag — `RELEASE.md` → Known
      fragilities; confirmado de novo na v6.5.0: `HTTP 403` no
      `git push origin v6.5.0`). A `v6.6.0` só existe depois do merge do PR na
      `main`: o sha é o do commit de merge.
      ```
      git fetch origin main
      git tag -a v6.4.0 <sha da release v6.4.0> -m "v6.4.0"
      git tag -a v6.5.0 5193275 -m "v6.5.0"
      git tag -a v6.6.0 <sha do merge da v6.6.0 na main> -m "v6.6.0"
      git push origin v6.4.0 v6.5.0 v6.6.0
      ```
      Sem isso os link refs do rodapé do CHANGELOG (`compare/v6.5.0...v6.6.0`)
      continuam apontando para tags que não existem. Confira depois com
      `git ls-remote --tags origin`.
- [ ] **Rodar `seedMissingLangsNow()` no editor do Apps Script** (a v6.5.0 já
      está em produção, então o arquivo já está lá — falta executá-lo). É o que leva
      as 76 linhas EN para a planilha. NÃO use os `seed*Now()` de sempre:
      `seedContentModule()` é semeadura de primeira vez e, num módulo já no ar,
      devolve `{status:'skipped'}` sem escrever nada.
      `seedMissingLangsNow()` insere só os idiomas que o módulo ainda não tem,
      sem tocar no que está publicado, e é seguro de rodar mais de uma vez.
      Devolve um relatório por módulo — `links` aparece como `skipped` de
      propósito, porque ali a tradução vive dentro do valor e se edita pela tela.
      **Não é bloqueio para o agente**: o bundle traz o EN embutido e a
      hidratação não o derruba quando a Central não serve aquele idioma. O que
      isso destrava é o SME poder editar o conteúdo EN pela Central.
- [ ] **Publicar a disponibilidade BAU do segmento EN.** `BAU_SEGMENTS` aceita
      `EN` e o editor da Central já mostra o terceiro campo, mas enquanto
      ninguém publicar datas para ele o painel do agente EN cai no primeiro
      segmento que tiver — rotulado, mas não é o dele.
- [ ] **Traduzir para EN as evidências das tasks publicadas.** O editor da
      Central ganhou a coluna e a contagem de cobertura por idioma; as tasks já
      publicadas nascem com `EN 0/n` até alguém preencher. O mapa embutido cobre
      o catálogo do bundle, não o que já foi publicado.
- [ ] **`smoke:shortcuts` vermelho desde a v6.3.3** — "a lista de Configurações
      segue a mesma ordem do Ctrl+K" e "o construtor de Configurações só oferece
      cenários do substatus escolhido". Investigar à parte.

> **Correção de rota (2026-09-16):** vários itens abaixo e acima diziam "falta o
> `clasp deploy` manual de produção". Não falta: o `deploy.yml` tem um passo
> **"Promover implantação de produção"** que roda sozinho no merge para a `main`,
> quando o commit toca em `gas-backend/`. Conferido no run 1052 da v6.3.2, que
> promoveu produção sem intervenção nenhuma. O que exige mão continua sendo o que
> roda DENTRO da planilha (semeaduras e gatilhos), listado abaixo.

- [ ] **Ids de campo duplicados entre passos do BAU Form.** `createField()` faz
      `input.id = \`bau-form-${fieldConfig.id}\``, e três campos existem em dois
      passos com o mesmo `id`: `seId`, `language` e `description`. A tela
      renderiza ids repetidos (HTML inválido) e todo `getElementById` cai sempre
      no primeiro. O `seId` já mordeu — ver o botão de busca do descarte, onde o
      conserto foi parar de resolver por id. Os outros dois são **latentes**:
      hoje ninguém os alcança por id (o Smart Rendering busca por
      `#bau-step-N [name=...]`, que é escopado e correto). Conserto de verdade:
      `createField` receber o passo e compor `bau-form-<passo>-<id>` — mas isso
      toca todos os campos de uma vez e merece PR próprio, junto da repaginação.

- [ ] **Duas falhas reais em `smoke:shortcuts`, escondidas pelo ferramental.**
      Apareceram no minuto em que o script passou a rodar (antes ele morria no
      launch do browser, e o ambiente lia isso como "suíte verde"). **Não são
      regressão do commit que as revelou** — conferido rodando o smoke corrigido
      contra o commit anterior. As duas são na tela de Configurações:
      `a lista de Configurações segue a mesma ordem do Ctrl+K` (a tela mostrou só
      `["Teste"]`, ou seja, a lista está incompleta, não só fora de ordem) e
      `o construtor só oferece cenários do substatus escolhido` (timeout de 30s
      esperando `.cw-sc-add` — o botão não existe mais ou mudou de seletor).
      Escopo próprio: não misturar com a repaginação do BAU.

- [ ] **Expor `amOrigem` na tela.** Segue calculado, entrando no `pageData` e
      **nunca usado** — nem tela, nem log, nem planilha. Foi a lacuna que fez o
      diagnóstico do AM virar trabalho manual em duas sessões: o sistema sabe
      qual estratégia resolveu o campo e não conta a ninguém. No mínimo um
      `console.info` e o rótulo de origem ao lado do campo no formulário.

- [ ] **Publicar a tag `v6.3.2`.** A v6.3.2 já está em produção; a tag só publica
      as notas do GitHub Release (o `release.yml` não faz deploy). O push de tag
      **falha nesta sessão** — a credencial do GitHub daqui não escreve refs de
      tag, o mesmo bloqueio já registrado para a v6.1.0 e a v6.2.0. Precisa sair
      de uma máquina com credencial normal:
      `git tag -a v6.3.2 abee437 -m "v6.3.2" && git push origin v6.3.2`
      O `scripts/extract-changelog.sh` já foi rodado contra a seção `[6.3.2]` e
      aceitou — as notas não sairão vazias.

- [ ] **Levar o changelog para a Central de Conteúdo.** A constante
      `CW_DASH_RELEASE_NOTES` e o `template.CW_RELEASE_NOTES` do
      `renderDashboard()` já servem as duas telas — falta o modal no
      `ContentDashboard.html`. Não foi feito junto por não ter sido pedido.

- [ ] **Conferir a largura da aba `Archive_BAU` na planilha de backup.** O job
      antigo escrevia um bloco com a largura da planilha de casos sem conferir se
      o destino comporta — e a planilha de casos ganhou as colunas 22 a 24 depois
      que o arquivo foi criado. Se a aba estiver com menos de 25 colunas, **o
      backup vinha falhando toda semana, em silêncio**, e há casos resolvidos que
      nunca chegaram ao arquivo. O código novo alarga a aba antes de escrever, o
      que conserta daqui pra frente; o que ficou para trás precisa ser conferido
      na mão. Passo: abrir o `Archive_BAU`, ver a última data arquivada e comparar
      com a execução mais recente no log do Apps Script.
- [ ] **Decidir se vale trazer o histórico antigo do `Archive_BAU` de volta.** Com
      o backup copiando, o histórico do TL cresce a partir de agora — mas o que
      foi deletado antes só existe no arquivo. Uma função de uma tacada (mesma
      mecânica do `backfillContentLog()`: simula por padrão, copia sem apagar)
      resolveria. Não foi feita por não ter sido pedida.

- [ ] **Rodar o `seedTasksNow()` na planilha de verdade** (editor do Apps
      Script, mesma mecânica de `seedNoteTemplatesNow`). Roda uma vez: se o
      módulo já tiver item no ar, devolve `skipped` sem duplicar. Depois,
      confira na aba **Tasks** que as 13 tasks apareceram com o mesmo Acesso
      rápido de hoje (5), e no app do agente que o cartão de screenshots segue
      idêntico — em PT e em ES. Enquanto a semeadura não rodar, o agente segue
      vendo o catálogo embutido, que é o mesmo conteúdo.
- [ ] **Conferir a permissão do módulo `task_screenshots` na aba Papéis.** Pelo
      ADR-0013 os quatro papéis herdam o preset (ADMIN/TL propõem e aprovam, QA
      propõe, WFM só vê), mas a herança nunca foi exercitada numa planilha real
      — vale abrir a aba Papéis e conferir a linha nova antes de avisar o time
      de QA que a aba existe.
- [ ] **Limpar as versões antigas do projeto Apps Script** — o editor avisou que
      estamos perto do teto de **200 versões**. Só dá para fazer pela UI:
      Histórico do projeto → **Excluir versões em massa**. Não existe
      `projects.versions.delete` na API nem comando no `clasp`, então nenhum
      passo de CI resolve isso. O diálogo já omite as versões em uso por uma
      implantação ativa (produção `…kw6hy3Cx6fAg` e dev `…uXP6kvo8l2LA`), então
      não há risco de derrubar ambiente. O `deploy.yml` já parou de gerar
      versão em push que não toca em `gas-backend/`, mas isso só segura o
      crescimento — não desfaz o acumulado.

- [ ] **Criar o gatilho diário de `notifyStaleContentApprovals()`** pelo editor
      do Apps Script (o projeto não cria gatilho por código — mesma nota do
      `Backup.js`). Antes de ligar, rode `listStaleContentApprovals()` e confira
      quem seria cobrado e por quantos itens: é a leitura que existe justamente
      para o primeiro disparo não surpreender ninguém.
- [ ] **Rodar o `backfillContentLog()` na planilha de verdade.** Só quem tem
      `manageAccess` roda, e o passo 1 é `backfillContentLog()` **sem argumento**:
      ele apenas relata quantas linhas traria. Confira o número contra a aba
      `Logs` (filtro `Category = ContentCentral`) antes de chamar
      `backfillContentLog(true)`. É idempotente e não apaga a origem, então
      repetir é seguro — mas a simulação existe para o número ser conferido por
      alguém, não pelo código.
- [ ] **Call Script — seção `meio` (Implementação/Tag Support) em ES.** Os blocos
      `ES BAU`/`ES LT` de `call-script-data.js` seguem sem essa seção. Não é
      esquecimento da tradução: o próprio arquivo registra que o conteúdo real
      ainda precisa ser fornecido pelo time ("não inventar texto aqui"). Enquanto
      isso o card de Implementação não aparece para ES — mesmo comportamento de
      antes.
- [ ] **Revisão do espanhol por falante nativo** antes de considerar a tradução
      final, com prioridade para o que chega ao anunciante (os 8 templates de
      e-mail) e para o que vira nota do caso (os 27 cenários).

## Recently done

- [~] **TL Dashboard — três correções + 1 campo novo no formulário BAU:**
      1. fluxo do histórico mostrava `Agente → TL` (invertido); agora `TL → Agente`;
      2. "Tempo médio de aprovação" investigado e **não é bug** — só não há
         aprovações na janela de 7 dias ainda (confirmado com o usuário: 0
         aprovados, 2 descartados). Fica para reconfirmar depois de uma
         aprovação real passar pelo fluxo;
      3. email do anunciante chegava sempre vazio na planilha — o campo
         `advEmail` nunca existia no `FORM_CONFIG` do formulário BAU (Passo 1),
         então dependia 100% da raspagem silenciosa do DOM do CRM
         (`captureClientEmail`), sem visibilidade nem correção manual quando
         ela falhava. Campo adicionado, visível/editável/confirmável como
         `advName`/`cid`/`website`;
      4. nova pergunta opcional no fim do Passo 3 (depois da disponibilidade):
         "O caso deve ser descartado pelo TL?" (Sim/Não). Não muda o roteamento
         do caso (continua `PENDING_TL_CREATION`) — só sinaliza pro TL via selo
         na fila e nos detalhes. Persistido em coluna nova (`Suggest_Discard`,
         col. 22) isolada depois da trilha de auditoria, pra não deslocar
         índices de planilhas já em produção.
      **Falta o `clasp deploy` manual de produção** (`RELEASE.md`) — sem isso
      os agentes continuam vendo o bundle antigo (sem o campo de email nem a
      pergunta nova) e o TL Dashboard antigo (sem os selos/fluxo corrigido).
      (2026-09-04)
- [x] **Fila do TL Dashboard em FIFO** — `getPendingBAUCases` estava devolvendo
      `cases.reverse()` (mais novo primeiro), contrariando a regra de ordenação
      de `specs/workflow/bau-lifecycle.md`. Agora ordena pela data de envio,
      crescente. (2026-09-01)
- [~] **Aba "Pessoas" na Central de Conteúdo** — **em produção desde a v6.1.0**
      (PR #371, merge na `main` em 2026-09-01, deploy verde nos dois jobs). A
      planilha `People` editável pela tela, para ADMIN e TL, com aprovação
      exclusiva do ADMIN (que, por já poder aprovar sozinho, aplica na hora).
      Cobre entrada, saída, troca de fluxo e de idioma. Backend em
      `gas-backend/PeopleAPI.js`, tela na aba "Pessoas" do
      `ContentDashboard.html`. ADR em
      `docs/decisions/0006-aba-people-editavel-na-central.md`; esquema e
      contrato em `specs/data-models/`. Testes: `test:people` (40) e
      `smoke:people` (36, a tela real no Chromium). **Falta validar com a
      planilha de verdade** — em especial: conferir se os nomes das colunas da
      aba People batem com o cabeçalho que a Central cria quando a aba não
      existe, e passar os olhos na lista de segmentos reais para ver se alguma
      cor de chip ficou ruim. (2026-09-01)
- [ ] **Publicar as tags `v6.1.0` e `v6.2.0`** — passo 4 do `RELEASE.md`. Nos dois
      casos produção já está no ar; a tag só publica as notas do GitHub Release
      (o `release.yml` não faz deploy). O link `[6.1.0]` do `CHANGELOG.md` aponta
      para uma tag que ainda não existe até isso ser feito.
      `git tag -a v6.1.0 dbc6eb5 -m "v6.1.0" && git push origin v6.1.0`
      `git tag -a v6.2.0 315b13d -m "v6.2.0" && git push origin v6.2.0`
      **Confirmado nesta sessão:** o bloqueio não é do proxy nem novidade — o
      push de tag responde 403 enquanto o push de branch para o MESMO host passa.
      É a credencial do GitHub da sessão que não escreve refs de tag. As duas
      tags precisam sair de uma máquina com credencial normal; nenhuma delas faz
      deploy (o `release.yml` só publica notas).
- [~] **Atalhos do Ctrl+K por agente** — captura no Case Notes + construtor em
      Configurações, persistência em `User_Prefs` (nuvem, cache-first), grupos e
      ranking por uso no palette. ADR em
      `docs/decisions/0002-atalhos-ctrl-k-por-agente.md`. Testes: `test:shortcuts`,
      `test:prefs`, `smoke:shortcuts`. O merge em `refactor-structure` já leva o
      backend novo ao deployment de **dev** pela CI (a aba `User_Prefs` nasce
      sozinha no primeiro uso). Para **produção**, falta o `clasp deploy` manual
      de sempre (`RELEASE.md`) — até lá, em produção os atalhos funcionam mas
      ficam só no navegador de cada pessoa, que é o fallback previsto. (2026-08-20)
- [x] Project adopted into groundrules (2026-08-18)
- [x] Suporte PT/ES completo — interface, conteúdo (notas, e-mails, links) e
      Apps Script (e-mails automáticos + TL Dashboard). Idioma herdado da
      planilha People, troca manual em Configurações. ADR em
      `docs/decisions/0001-i18n-pt-es.md` (2026-08-19)

---

**Convention**: Claude updates this file at the start/end of each session. Completed tasks stay in "Recently done" for ~1 week then are archived (deleted or moved to CHANGELOG).

**Status vocabulary**: `[ ]` to do · `[~]` delivered, in review / awaiting validation · `[x]` done & validated. Annotate reverts and key commits inline (e.g. `reverted (commit abc123)`) — intermediate states are information, don't erase them.
