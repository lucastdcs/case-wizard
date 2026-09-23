<!-- generated-by: groundrules v1.10.0 -->
# Changelog

All notable changes to this project are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **Camada sensorial do BAU Form.** Retorno nos três canais que o
  `design-system.md` exige, colocado onde ele significa alguma coisa — e
  **calado onde não significa**. A pesquisa que embasou isso é explícita: em
  ferramenta de produtividade, som demais vira fadiga em uma semana e o agente
  desliga tudo, perdendo junto os avisos que importam.
  - **Tátil** (`vibrar()`, em `shared/utils.js`): três padrões, porque a mão
    distingue ritmo e não intensidade — `confirma` (10ms), `erro` (10-40-10, o
    "não" universal) e `concluido` (10-30-10). Sempre atrás de
    `if (navigator.vibrate)`: a API é efetivamente só Chromium.
  - **Erro de validação passou a aparecer onde a mão está.** Antes era só um
    toast no canto oposto, que conta o que houve mas não diz **qual** campo —
    com sete campos na tela, isso é uma busca visual. Agora o campo treme
    (bounce amortecido, `±6px`, 300ms), recebe foco e dispara o padrão tátil de
    erro.
  - **Hierarquia do som corrigida:** achar o SE ID tocava `playSuccess`, o mesmo
    som do **envio do caso**. Dois momentos com o mesmo som apagam a distinção
    justamente do que deveria ser o pico da sessão. A busca passou a
    `playReady`; `playSuccess` ficou exclusivo do envio.
  - **Elástico só no espacial**, conforme a análise: FAB afunda e volta com
    sobra (`cubic-bezier(.34,1.56,.64,1)` **só no `transform`** — cor e sombra
    ficam na curva padrão), card selecionado dá 1,5% de escala, botões de ação
    afundam sem sobra. `prefers-reduced-motion` derruba todo overshoot mantendo
    a duração. A regra foi escrita em `specs/ui-ux/design-system.md`.

### Fixed
- **Descarte negado aparecia como "Aprovado / Criado" no BAU Central do
  agente.** O descarte negado volta ao status `CREATED`, igual a uma criação
  aprovada; o card agora lê `Processed_Action` e mostra "Mantido ativo pelo TL"
  (o e-mail `AGENT_DISCARD_DENIED` já estava certo).
- **O botão de busca do SE ID saía sem formatação e fora do campo.** As regras
  `.bau-input-group`, `.bau-input-group > .bau-input` e `.bau-mini-btn-input`
  **foram apagadas por engano** no commit do mestre-detalhe: a heurística que
  achava o fim do bloco do painel sobreposto passou do ponto e levou junto o que
  vinha depois. Sem regra base, o botão renderizava como botão cru do navegador
  e o grupo perdia o `display: flex`, jogando-o para fora do campo. Restauradas
  no registro novo (sem moldura, 44px, acopladas ao campo).

### Changed
- **O painel de detalhe virou toggle.** Sem caso escolhido a coluna não existe e
  a lista ocupa a largura toda; reclicar o caso aberto fecha, e `Esc` também. Um
  painel vazio permanente é área morta — pior, lê como parte quebrada da tela. A
  abertura anima `grid-template-columns` e o `gap` (propriedade **espacial**,
  logo com sobra mínima na curva), e a opacidade do conteúdo acompanha **sem**
  sobra, porque é efeito. Com o detalhe fechado o card volta ao layout em linha:
  empilhado só faz sentido na coluna estreita.
- **Os cards da lista ficaram mais leves.** Sai a lavagem de cor por status — o
  ponto do selo já diz o estado, e tingir o card inteiro repetia a informação.
  Fica um tom neutro de ~3%, que é o mínimo para o card existir como unidade sem
  moldura (branco puro sobre branco apagava o card).
- **Varredura no resto do módulo:** mais 6 bordas `1px solid #DADCE0` viraram
  tom, e os 11 pesos `600`/`700` restantes viraram `500`. A borda da janela
  contra a página do CRM permanece — ali ela tem função.
- **A tela inicial do BAU perdeu a cara de sistema antigo.** Auditada em
  navegador e reestruturada contra três tells medidos: **dez bordas
  `1px solid #DADCE0`** (a separação passa a vir de espaço em branco → degrau de
  luminosidade → elevação, e borda só se os três falharem), **peso 700 em selo
  de 11px e em métrica** e 600 em título (produto Google usa 400/500 — peso alto
  em corpo pequeno é assinatura de painel administrativo), e **maiúsculas com
  `letter-spacing`** em rótulo, que o próprio `design-system.md` já proibia.
  Os **selos de status viraram texto com ponto na cor semântica**, que é o que o
  spec manda desde sempre ("pílula em maiúsculas com status decorativo" está na
  lista de proibições). As métricas perderam a caixa: três caixas tonais
  idênticas em fila são o mesmo tell da borda com outra roupa. O card
  selecionado ganhou acento numa aresta em vez de moldura em volta. A regra foi
  escrita em `specs/ui-ux/design-system.md` para não voltar.
- **As tasks do form BAU passam a vir da Central de Conteúdo.** O formulário
  oferecia uma lista de 17 nomes escrita à mão no `bau-form-config.js`, de antes
  da Central existir, e ela divergiu em silêncio do catálogo publicado: 5 tasks
  só existiam no form, 1 (UPD for GA4) só na Central, e 8 eram a mesma task com
  nome diferente ("Google Tag Manager Installation" contra "GTM Installation").
  Nada quebrava — só a coluna `Task_BAU` guardava um vocabulário que o resto do
  sistema não reconhece, e uma task publicada pelo SME nunca chegava à
  escalação. Agora a grade sai do mesmo `TASKS_DB` que a Central reescreve, e
  consome **apenas o nome**: o form não pede evidência nenhuma. As 5 tasks sem
  correspondência somem da grade — quem precisar de uma delas a cria pela tela da
  Central. Caso pendente gravado com um nome antigo não perde a task ao ser
  editado: ela volta para a grade já marcada. Ver
  `docs/decisions/0014-tasks-do-form-bau-vem-da-central.md`.
- **O dashboard do BAU virou mestre-detalhe.** A lista e o detalhe do caso
  convivem lado a lado; abrir um caso deixou de ser troca de tela. O agente não
  perde de vista onde estava na fila, e a classe inteira de bugs de sobreposição
  (offset, z-index, rolagem dupla) deixa de existir porque **não há mais nada
  sobreposto** — o painel absoluto `.bau-details-view` foi removido. Cada coluna
  rola no próprio eixo: uma rolagem só para as duas obrigaria a descer a lista
  para ler o fim do detalhe.
- **A vista de detalhe seguiu as três zonas do `design-system.md`** (as mesmas
  do modal do TL — ADR-0015): cabeçalho, briefing, dados. A versão anterior era
  uma grade de **sete** `.bau-details-card`, ou seja caixa dentro de caixa, que o
  próprio spec proíbe; e tinha botão de copiar em todo campo, inclusive em
  justificativa e fuso. O spec é explícito: o botão de copiar significa "isto vai
  para o outro sistema", e espalhá-lo por todo campo esvazia o sinal — agora ele
  existe só na zona de dados, aparece no hover/foco da linha, e confirma nos três
  canais (visual no próprio controle, som e `navigator.vibrate(10)` atrás da
  guarda de suporte).
- **A janela do BAU Form cresceu para 900x720, com altura fixa.** Era 650px — a
  mais estreita dos módulos principais (o Email Assistant é 850x650) — no módulo
  que carrega mais dado por tela: a vista de detalhes tinha **600px de conteúdo
  abaixo da dobra**. A altura fixa resolve o pulo: a janela ia de 466px (escolha
  do fluxo) para 810px (formulário) a cada passo.

### Fixed
- **A vista de detalhes do caso abria desalinhada, com o dashboard aparecendo
  por trás.** `.bau-details-view` usava `top: 56px` para descontar um header que
  **não é ancestral dela** — o header padrão é irmão do container, não filho —,
  então o painel nascia 38px baixo demais e deixava uma faixa do dashboard
  visível por cima. Junto, três defeitos de rolagem no mesmo lugar:
  `.bau-view-container` tinha `overflow: scroll` literal, criando um segundo
  contexto de rolagem por cima dos painéis que já rolam sozinhos (rolar um não
  movia o outro, e o painel de detalhes deslizava para fora do próprio quadro);
  e `.bau-view` somava `margin-top: 18px` a `height: 100%`, ultrapassando o
  container em exatos 18px. O dashboard também **não era escondido**: seguia
  rolando, alcançável por Tab e visível para leitor de tela atrás de um painel
  opaco.
- **O status "descarte em avaliação" aparecia cru para o agente.**
  `getStatusData()` mapeava quatro status e caía no `default`, que imprime a
  constante do banco: o card mostrava `PENDING_TL_DISCARD`. Dos dois status
  pendentes, só um tinha tradução. Ganhou rótulo e cor própria (laranja) — os
  dois esperam o TL, mas pedem o oposto um do outro, e compartilhar o amarelo
  apagaria a distinção na lista onde aparecem lado a lado.
- **As métricas do dashboard ignoravam a fila de descarte.** Contavam
  `PENDING_TL_CREATION` e `CREATED`; um caso aguardando descarte não entrava em
  nenhum dos dois números e sumia da leitura do agente.
- **O sobrenome do anunciante sumia no card e reaparecia no detalhe.** O card
  mostrava só `advName`; a vista de detalhes já juntava nome e sobrenome.
- **O selo de status esticava pelo card inteiro** na vista de detalhes (258px de
  barra em vez de uma pílula do tamanho do texto): numa coluna flex o padrão é
  esticar.
- **Código morto:** o fallback `amName = internalEmail` em `populateContextData`
  virou no-op quando os dois passaram a sair da mesma resolução (v6.3.3).
- **O AM do caso ANTERIOR chegava no formulário do caso seguinte.** Relatado
  como "abro um caso, ele puxa o AM; fecho, abro outro, e vem o mesmo AM do caso
  já fechado" — e seguia acontecendo depois da v6.3.3, que consertou outra coisa
  (o fallback do `<internal-user-info>`). A causa é outra e está a montante:
  `mensagensDoLog()` varria `document.querySelectorAll('case-message-view')`, o
  **documento inteiro**. O CRM mantém mais de um container de case log no DOM e
  marca o do caso em foco com `.active-case-log-container`; ao trocar de caso, o
  log do anterior continua pendurado ali, e quando o do caso novo ainda não
  renderizou ele é o **único** com e-mail — então a raspagem devolvia o AM do
  caso fechado com cara de acerto (origem `case-log-visivel`, e às vezes até
  `contact-us-form`). A varredura passa a ser escopada ao log ativo, com
  fallback para o documento onde a classe não existe. Reproduzido contra uma
  captura real da tela e travado em `test:scraping` (+4 asserções, 62 no total).

### Added
- **Botão de recaptura no formulário BAU.** No molde do botão do call script: um
  clique e a raspagem roda de novo **na tela que está na frente**. A janela do
  módulo não fecha quando o agente troca de caso no CRM, e a captura só
  acontecia no clique de "Novo Caso" — quem já estava com o formulário aberto
  seguia vendo o contexto do caso anterior. Sob demanda, e não num `setInterval`
  como o call script: lá o monitor lê três campos de texto; aqui `getPageData()`
  clica no unmask do telefone, pode expandir mensagens do log e faz JSONP do
  perfil, e repetir isso a cada 2s mexeria na tela embaixo de quem está
  digitando.
- **Busca automática do SE ID no fluxo de descarte.** O botão que varre o case
  log atrás do Speakeasy ID existia só no passo de abertura. No de descarte —
  onde o campo é **obrigatório**, e no de abertura não é — o agente tinha que
  garimpar o ID à mão para conseguir enviar. Na mesma mudança, o alvo da busca
  deixou de ser resolvido por `getElementById`: os dois passos renderizam
  `id="bau-form-seId"`, então o botão novo escreveria no campo do passo 1
  (invisível na hora) e deixaria o obrigatório vazio, sem erro na tela. O
  listener passou a resolver o input pelo irmão do botão clicado.

### Fixed
- **Pedir descarte disparava o e-mail de abertura de caso.** Quem começava pelo
  "Solicitar Descarte" no passo 0 do formulário recebia "Caso na fila BAU — a
  solicitação foi registrada e aguarda análise da liderança": o texto de um caso
  sendo **aberto**, para um pedido de **fechar** um caso que já existe.
  `handleBAUEscalation()` escolhia o `Status` pelo `requestType` (gravava
  `PENDING_TL_DISCARD`, correto) e o tipo do e-mail não — mandava
  `AGENT_BAU_SENT` fixo. O `AGENT_DISCARD_SENT`, que existe e está certo desde
  agosto, só disparava no caminho de **edição** (um caso já criado transicionando
  para descarte), e é por isso que o defeito sobreviveu: só aparece para quem
  começa pelo descarte. Agora o status e o e-mail saem do mesmo campo, amarrados
  num teste.
- **O e-mail de descarte anunciava um horário que não existe.** A seção "Detalhes
  do caso" era a mesma para os sete tipos de e-mail, então um pedido de descarte
  — fluxo que nem pergunta agendamento nem task — imprimia "Agendamento (SLA):
  Data indisponível" e "Procedimento: N/A". Os dois campos agora só aparecem nos
  fluxos de **abertura**. `AGENT_CREATION_REJECTED` continua mostrando os dois: é
  uma negativa, mas de um caso que nunca existiu, e ali o agendamento pedido
  ainda é a informação relevante.
- **A versão em texto puro do e-mail era uma cópia manual da versão HTML.** Toda
  regra de campo precisava ser lembrada duas vezes, e as duas listas divergiriam
  em silêncio na primeira que alguém esquecesse. A lista de texto passa a ser
  derivada da mesma estrutura que gera o HTML.

## [6.3.3] - 2026-09-16

### Fixed
- **O TL não via o que o agente pediu que acontecesse com o caso.** A sugestão de
  descarte existia no modal só como selo, e **só quando era "Sim"** — então "o
  agente vai implementar" e "o campo não chegou" eram a mesma tela em branco, e o
  TL decidia sem saber o que tinha sido pedido. Agora é um disclaimer no topo do
  briefing, dizendo por extenso "O caso deve ser descartado pelo TL" ou "O caso
  será implementado pelo agente". Célula vazia (linha anterior à coluna 21) vira
  um terceiro estado, "não informado": afirmar um desfecho que ninguém escolheu,
  bem no texto que orienta a decisão, é pior que admitir que não se sabe. O fluxo
  de descarte não ganha o disclaimer — ali a pergunta não é feita ao agente.
- **Editar a sugestão de descarte no bookmarklet não chegava ao TL.** A coluna 21
  fica fora do bloco contíguo 4-18 que a edição grava de uma vez, e ninguém
  escrevia ela no caminho de edição: o payload chegava com o valor novo e era
  descartado em silêncio, com o TL seguindo a ver o que foi gravado na criação.
  Junto, dois defeitos que só apareciam depois de consertar o primeiro: a lista
  do agente não devolvia o campo (o `<select>` da edição abria sempre em "Não", e
  salvar apagaria um "Sim" que ninguém tocou) e valor gravado fora do domínio
  zerava o `<select>` — a mesma armadilha que o campo de idioma já tinha.
- **O mesmo AM ia para todos os casos de uma conta.** Quando o case log não tinha
  e-mail `@google.com` para resolver — caso recém-aberto, ou 2+ candidatos sem
  Contact Us Form para desempatar — a raspagem caía no **primeiro
  `<internal-user-info>` da tela**. Esse bloco lista os contatos internos da
  **conta**, não do caso (55 na captura real, todos com o mesmo papel), e a lista
  é a mesma, na mesma ordem, em todo caso daquele anunciante: o resultado era o
  mesmo nome gravado em todos eles, calado e com cara de raspagem bem-sucedida.
  O próprio comentário do código já dizia "com 55 indistinguíveis, chutar erra
  quase sempre". Agora o fallback só responde quando há **exatamente um** contato
  interno na tela; com 2+ devolve `null` e o agente preenche — que é o princípio
  que o módulo sempre declarou ("chutar o AM errado é pior que não preencher")
  mas não cumpria.
- **"AM Responsável" mostrava nome, não e-mail.** `captureAMName()` preferia o
  nome de exibição (`am.nome || am.email`), então a coluna `AM_Nome` e o modal do
  TL Dashboard traziam "Bianca Alves" — texto traduzível, que não diz qual LDAP é
  a pessoa e não permite acionar o AM. Passa a ser **sempre o e-mail**, e o campo
  do formulário BAU valida o formato para travar também o que é digitado à mão.
  Linhas antigas continuam com o nome; nada é reescrito.

## [6.3.2] - 2026-09-16

### Added
- **Histórico clicável.** Clicar num caso resolvido abre a mesma vista de
  detalhes da fila, com tudo — anunciante, CID, tasks, justificativa,
  agendamento —, e não só o número do caso. `getWeeklyHistory` devolvia 8 campos
  por caso contra os 20 da fila; agora as duas leituras saem do mesmo
  `mapBAURow_`, que é o que impede elas de divergirem de novo. No topo da vista,
  uma zona "Decisão" diz quem decidiu, quando, o caso filho gerado e a
  justificativa. Caso resolvido não mostra aprovar/rejeitar — a decisão já foi
  tomada. A busca do histórico passou a achar por anunciante e CID.
- **Justificativa obrigatória na recusa.** Ao rejeitar uma abertura ou negar um
  descarte, a liderança escreve o motivo, que vai no e-mail do agente e fica
  gravado na coluna `TL_Justification`. Até aqui o agente recebia o "não" sem
  razão nenhuma e só descobria perguntando no chat. Exigida nos dois lados — a
  tela nunca é a fronteira. **Atenção ao `Status`:** ele não distingue as quatro
  decisões (`DISCARDED` tanto confirma um descarte quanto rejeita uma criação),
  então quem decide se a justificativa é pedida é `Processed_Action`.
- **Changelog dos dashboards.** O TL nunca carrega o bookmarklet, então toda
  mudança no painel dele chegava sem aviso — o único changelog do projeto era o
  do agente. Agora o TL Dashboard abre as novidades quando a versão muda, com um
  botão no cabeçalho para reler depois. O conteúdo vem de
  `gas-backend/DashReleaseNotes.js`, injetado pelo servidor na própria página
  (uma chamada a menos no boot, cf. #333/#334), e `npm run test:dash-changelog`
  falha quando a versão dele fica para trás do `package.json` — a mesma guarda
  que o bookmarklet ganhou depois de anunciar as novidades da v5.1 com o selo da
  v5.2.
- **Resumo copiável do caso no TL Dashboard.** Último campo do modal de
  detalhes: o texto pronto, em linguagem humana, que o TL cola dentro do caso BAU
  que acabou de abrir no CRM — headline `Caso LM para BAU`, caso de origem, quem
  abriu e quando, o que aconteceu, o que deve ser feito, as tasks e o AM. Nada é
  pedido a mais ao agente: o texto é concatenado do que ele já preenche no
  formulário. O que já está no caso filho por ser da mesma conta do anunciante
  (nome, CID, site) fica de fora, e e-mail e telefone também — são PII que não
  precisa circular colada num texto. O idioma **não** é o da tela do TL: é o do
  atendimento, então um TL em PT aprovando caso de ES copia texto em ES. Pedido
  de descarte não ganha resumo. De quebra, a coluna 16 (`Motivo | Justificativa`)
  passa a ser desmesclada também na leitura do TL, que era a única que ainda
  mostrava o pipe.
- **Tasks e screenshots do Win Criteria na Central de Conteúdo** (módulo
  `task_screenshots`, aba "Tasks"). As 13 tasks do Case Notes e os 126 rótulos de
  evidência que o Win Criteria exige saíram do `TASKS_DB` do bundle e passaram a
  ser conteúdo gerenciável: quem conhece a régua publica a mudança, sem PR, sem
  CI e sem esperar o `clasp deploy`. Inclui o caminho para **criar uma task
  nova** pela tela — antes só existia editando código. O espanhol dos rótulos,
  que vivia num mapa por frase invisível a qualquer tela
  (`SCREENSHOT_LABEL_ES`), virou uma coluna ao lado da lista base: **posicional e
  do mesmo tamanho**, porque a quantidade de evidências não muda com o idioma, e
  linha em branco cai no texto original. A lista da Central diz a cobertura da
  tradução por task ("ES 1/3") e a prévia "como o agente vê" aponta a linha que
  sai sem espanhol. A chave da task é identidade — modelos de nota, rascunhos
  salvos e atalhos do Ctrl+K a guardam — e por isso não muda depois de criada. O
  `TASKS_DB` embutido continua como fallback do primeiro load offline. Ver
  `docs/decisions/0012-tasks-e-screenshots-na-central.md`.

### Changed
- **Passada de acabamento no painel do TL.** A profundidade passou a significar
  alguma coisa: o bloco da decisão é tingido com a cor de identidade e salta
  primeiro, o briefing recua, e o resumo — a única coisa que sai da tela — é o
  único elevado. Copiar passou a confirmar nos três canais (botão, som e vibração
  onde houver motor) em vez de só num toast no canto oposto. As linhas do
  histórico ganharam o estado de `hover` que faltava desde que viraram clicáveis.
  Entraram junto `tabular-nums` nas colunas de dígitos, a grade de 4/8px,
  `prefers-reduced-motion`, e o diálogo de decisão passou a ter um eixo só
  quando tem campo para preencher, com o botão dizendo a ação em vez de
  "Confirmar". Regras em `specs/ui-ux/design-system.md`.

- **A vista de detalhes do caso foi remodelada.** Era uma grade de 16 caixas
  idênticas em 640px, onde "O que deve ser feito" — a decisão — tinha o mesmo
  peso visual de "Programa de Vendas". Agora são três zonas por propósito
  (ADR-0015): **cabeçalho** com o anunciante, os selos e a autoria; **briefing**
  com o que se lê para decidir (o que fazer, motivo, justificativa, agendamento),
  em contêiner único e **sem botão de copiar**; e **dados** com o que se leva
  para o CRM. Nome e sobrenome viraram campos separados, com `N/A` quando não há
  sobrenome. A vista passou para 900px e ganhou rodapé com aprovar/rejeitar — o
  TL decide sem fechar e reachar a linha na fila.

- **O backup semanal passa a copiar em vez de mover.** A linha arquivada continua
  na planilha de casos, que é o que alimenta o histórico do TL. Antes o job
  deletava a origem, e o efeito aparecia uma segunda-feira depois: a aba
  "Histórico" só alcançava o último domingo (o seletor de 90 dias nunca entregou
  90 dias) e o `Child_Case_ID` exigido na aprovação sumia uma semana depois de
  ser gravado. Idempotente pelos IDs já presentes no arquivo, então uma execução
  interrompida se conserta sozinha na semana seguinte. Sem reset e sem poda: a
  planilha que a operação mantém desde 2024 tem ~5.000 linhas, volume que não
  justifica podar nada. Ver `docs/decisions/0014-arquivo-copia-em-vez-de-mover.md`.

### Fixed
- **O rodapé do modal continuava desenhado num caso resolvido.** O atributo
  `hidden` perde para o `display: flex` da classe, então a faixa cinza e a
  hairline ficavam no fim da vista com o atributo aparentemente correto — e o
  teste, que checava o atributo, passava. Agora o teste compara o `display`
  computado.
- **A aba Histórico dizia que os casos saem da lista no backup semanal.** Deixou
  de ser verdade quando o backup parou de deletar (ADR-0014), na mesma entrega.

- **A fila do TL não era alcançável pelo teclado.** As linhas eram `<div>` com
  `onclick`, o que o `specs/ui-ux/design-system.md` proíbe explicitamente — na
  prática, não havia como abrir um caso sem mouse. O nome do anunciante virou um
  botão de verdade (o clique na linha inteira continua funcionando). Junto:
  `Esc` fecha a vista de detalhes, o foco entra no modal ao abrir e volta para a
  linha ao fechar.

- **O backup podia falhar toda semana, em silêncio.** O job escrevia no arquivo um
  bloco com a largura da planilha de casos sem conferir se a aba de destino
  comporta essa largura — e a planilha de casos ganhou as colunas 22 a 24 depois
  que o arquivo foi criado. Num arquivo mais estreito, a execução inteira caía,
  num gatilho que ninguém olha. Agora o arquivo é alargado antes da escrita.
- **Módulo novo nascia invisível para todo mundo.** Numa planilha que já tem a aba
  `Content_Roles`, um módulo acrescentado ao código depois não aparecia em
  nenhuma linha de papel — e `normalizeRoleMatrix_()` tratava a casa ausente como
  desmarcada. Nem o ADMIN via a aba, e nada na tela explicava por quê. Casa
  **ausente** passa a herdar o preset do papel; casa **desmarcada** continua
  desmarcada, porque é decisão de alguém. Ver
  `docs/decisions/0013-modulo-novo-herda-o-preset.md`.

## [6.3.1] - 2026-09-10

### Fixed
- **Campo não capturado chegava na planilha como o texto `null`.** O transporte é
  JSONP, então o payload vira query string — e `encodeURIComponent(null)` devolve
  a **string** `"null"`. O backend faz `p.timezone || ''`, que não descarta
  `"null"` porque string não-vazia é truthy, e o literal ia para a coluna. Foi o
  que o TL viu no fuso horário de um caso; sete capturas do `page-data.js` podem
  devolver `null`, então valia para qualquer uma delas.
  A metade cara estava na **edição**: `update_bau_case` preserva o valor antigo
  testando `p.chave !== undefined`, e a string `"undefined"` passa nesse teste —
  o campo seria sobrescrito com o texto, que é o oposto da regra de
  não-sobrescrita do `api-payloads.md`. Agora `null` e `undefined` saem do
  payload; string vazia continua indo, porque o fluxo de descarte zera campos de
  propósito e isso é instrução, não ausência.
  As linhas **já gravadas** não se curam sozinhas, então a leitura do
  `BAU_form_data` também passou a tratar `"null"`/`"undefined"` como vazio — é o
  que faz o caso antigo parar de exibir `null` para o TL.

## [6.3.0] - 2026-09-09

### Fixed
- **Raspagem do CRM na tela traduzida.** O tradutor do CRM traduz rótulos *e*
  valores, e a raspagem casava rótulo por texto em inglês: numa captura real da
  tela, 7 das 10 capturas voltavam vazias — nome do anunciante caía no literal
  "Cliente", site vazio, e-mail do cliente e fuso `null`, tudo em silêncio. Os
  campos agora são resolvidos por rótulo normalizado (PT/ES/EN) e por
  igualdade, o que também desfaz a disputa entre "Sales program" e "Program"
  (o tier de suporte).
- **BCC ia para um endereço construído do e-mail do cliente.** A captura do
  e-mail interno lia o campo de *busca de cliente* do cabeçalho e colava
  `@google.com` no valor. O AM — que é quem vai no BCC, e nunca é o dono do
  caso — passa a ser resolvido pelo case log (ver ADR-0011).
- **CID podia vir de qualquer número de 10 dígitos da tela.** O fallback
  varria `body.innerText`; agora só lê pelo rótulo.
- **Case ID dependia só da URL**, embora a tela mostre mais de um (o histórico
  de interações lista casos antigos). Passa a ler `[debug-id="case-id"]`.
- **Identidade do agente dependia de abrir o menu de perfil.** Uma falha ali
  levava junto o e-mail, e com ele o BCC e o carregamento do perfil.
- **Telefone e sobrenome do anunciante também casavam rótulo só em inglês**
  (`contains(text(), 'Phone number')` / `'Family name'`), então voltavam
  vazios na tela traduzida, onde os rótulos são "Número de telefone" e "Nome
  de família". Passam pelo mesmo resolvedor dos demais campos.

- **O selo "Urgente" da lista de casos nunca aparecia** (#398). O card lia
  `c.availability_1` — que é nome de campo do **formulário**, não chave do objeto
  de caso que o backend devolve (`availability`, com as três janelas juntas). O
  `?.` engolia o `undefined` sem erro nem log, então o selo era código morto
  desde que foi escrito, e a tela ficava indistinguível de "nenhum caso urgente".
  Agora lê a primeira janela — a de prioridade — e ignora valor inválido.
- **O idioma parava de chegar como `N/A` na planilha BAU.** Dois defeitos somados
  (#392): `captureLanguage()` comparava com `includes('Language')`, sensível a
  caixa, e o rótulo do CRM é `Business language` com `l` minúsculo — nunca casava;
  e mesmo casando, o valor mora num `<sanitized-content>` dentro do container do
  rótulo, não num irmão seguinte. Além disso o fluxo de abertura **não tinha campo
  de idioma nenhum**, então o `N/A` da raspagem ia direto pro payload. Agora a
  coluna 11 recebe o segmento que o agente atende (`profile.defaultLanguage`),
  como `specs/data-models/db-schema.md` já mandava, num `select` que abre na
  opção certa e continua editável — porque existe caso que foge do segmento de
  quem está atendendo.

### Changed
- **O agendamento do BAU passa a carregar fuso, e a hora vira 24h** (#394, ADR-0010).
  A disponibilidade era gravada como `2026-09-10T14:30` — **sem fuso nenhum**. O
  agente digitava o horário local do cliente (é o que o disclaimer manda) e o TL
  Dashboard exibia aquilo em Brasília; o número só sobrevivia porque o TL também
  está em BRT. Essa é a causa real do "o timezone vai errado": não era o campo
  `Timezone`, era o horário nunca ter estado amarrado a ele.
  Agora grava `2026-09-10T14:30-04:00`, com o deslocamento resolvido para a
  **data do agendamento** (o horário de verão do anunciante entra na conta, e
  duas janelas da mesma zona em meses diferentes saem com deslocamentos
  diferentes). O TL passa a ver as duas leituras: `14:30 (cliente) · 15:30 BRT`.
  Linhas antigas continuam legíveis — nada foi migrado.
  O `<input type="datetime-local">` saiu: o formato dele (12h ou 24h) vem do
  locale do navegador e **não há atributo que force 24h**. No lugar, data +
  `<select>` de 24h + fuso, com o fuso já pré-selecionado a partir do
  `Customer time zone` do CRM e um eco ao vivo mostrando o equivalente em Brasília.
- **CI só promove a implantação do Apps Script quando `gas-backend/` muda.**
  `clasp deploy` sem `-V` cria uma **versão** nova a cada execução, e o Apps
  Script tem teto de **200 versões por projeto** — atingido o teto, nenhuma
  versão nova é criada, a promoção falha e leva o deploy inteiro junto, frontend
  incluído (`needs: deploy-backend-gas`). Metade dos pushes desta branch (31 de
  63, medidos no histórico) é só de frontend e gastava uma versão para
  republicar um backend idêntico ao que já estava no ar. O `clasp push -f`
  continua rodando sempre — ele atualiza o HEAD e não cria versão; só a promoção
  virou condicional. Sem base de comparação (branch nova, force-push) o passo
  promove por precaução, e o job de backend passou a fazer checkout com
  `fetch-depth: 0` porque o clone raso padrão não tem histórico para o diff.
  Limpar versões antigas continua sendo manual (Histórico do projeto → Excluir
  versões em massa): não existe `projects.versions.delete` na API.

### Added
- **Contexto do caso e fatos do case log**: estado, SLA, idade, tier, programa
  e país de cobrança; data/hora/fuso do agendamento e quem foi designado,
  origem e destino da transferência, motivo do cancelamento e do descarte.
  Tudo já estava na tela e nada consumia.
- **`appointmentTasks`** (multivalorado) exposto no `pageData`.
- **`npm run test:scraping`**: trava a raspagem contra duas capturas reais da
  mesma tela — uma traduzida e uma no idioma original. 50 asserções.

- **Telefone do anunciante** (#395). É PII mascarada: o valor não existe no DOM
  até o clique no unmask, e não tem marca óbvia como o `@` do e-mail — o
  reconhecimento é por dígitos, descartando explicitamente o rótulo `Phone` que o
  botão mascarado exibe, que é o engano fácil. Os dois unmasks (e-mail e
  telefone) disparam **em paralelo**: em série custariam 1 s aos sete pontos que
  chamam `getPageData()`; juntos custam os mesmos ~500 ms de antes.
  Aparece no card do caso e na fila do TL, e é editável quando a raspagem falha.
- **O ID do caso BAU gerado passa a ser registrado na aprovação** (#396). O TL
  aprovava a abertura, criava o caso no CRM, e esse número não voltava para lugar
  nenhum — nem para o histórico, nem para o agente. Agora aprovar pede o ID
  (**obrigatório**, validado no modal e de novo no servidor, porque a tela nunca é
  a fronteira), ele fica na coluna `Child_Case_ID`, aparece no histórico como link
  clicável e entra na busca. As outras três decisões do TL não pedem nada: só a
  aprovação de criação gera caso novo.
  De brinde, o e-mail `AGENT_BAU_CREATED` deixa de dizer só "seu caso foi criado"
  e passa a dizer **qual** — antes o agente tinha que ir procurar.
- **Fusos dos Estados Unidos** (#394) — Eastern, Central, Mountain, Pacific,
  Alasca, Havaí e **Arizona** à parte, que é Mountain sem horário de verão: sem
  ela, meio ano de agendamento no Arizona sai uma hora errado, e é o tipo de erro
  que ninguém atribui ao formulário. A lista virou catálogo único em
  `shared/timezones.js`, usado pelo consultor de Time Zone **e** pelo formulário —
  duas cópias divergiriam no primeiro país acrescentado num lugar só.
- **Sobrenome do anunciante** (#393). O caso levava só o primeiro nome; quem
  pegasse depois não tinha o nome completo. O `Family name` do CRM é raspado
  junto com o resto, aparece editável quando a raspagem falha, e a fila do TL
  passa a mostrar "Nome Sobrenome" — na linha, no card e na busca.
- **Período no histórico do TL Dashboard** (#397, primeira camada). `getWeeklyHistory(days)`
  sempre aceitou o parâmetro; só o cliente é que nunca oferecia nada além de 7.
  Agora há um seletor de 7 / 30 / 90 dias, e os rótulos ("Aprovados (7d)") seguem
  a escolha em vez de mentir. Abaixo dele, uma linha diz em voz alta o que o
  seletor **não** alcança: o backup semanal arquiva os casos finalizados em outra
  planilha, e ler aquilo é outro problema.
- **`npm run test:timezones`** — o deslocamento gravado no agendamento é
  calculado, e erra em silêncio: uma hora fora não derruba nada, vira uma ligação
  perdida dias depois. Cobre horário de verão dos dois hemisférios, Arizona, e a
  regressão que mais importa — duas janelas da mesma zona em meses diferentes
  precisam sair com deslocamentos diferentes, que é o que um cálculo baseado em
  "agora" erraria.
- **`npm run smoke:bau-scraping`** — o módulo BAU não tinha teste nenhum, e foi
  exatamente aí que os dois campos acima ficaram errados sem ninguém ver. O smoke
  roda a raspagem contra o `mock-crm.html`, que agora reproduz a forma real do
  Contact Us form (`<sanitized-content>`) além da forma antiga (`.data-pair-content`)
  — um mock que só tivesse a forma fácil nunca teria pegado o bug do idioma.

## [6.2.0] - 2026-09-08

### Added
- **Prévia "como o agente vê"** (fase 5). O editor mostra **campos**; o agente lê
  **texto**. Entre os dois cabe o erro que ninguém pega revisando o formulário: a
  descrição em espanhol que ficou em português, o passo do roteiro que só faz
  sentido com o anterior na frente, o placeholder que sobrou literal. A prévia
  resolve o item no idioma escolhido e **nomeia o que está faltando** em vez de
  mostrar um cartão vazio — o editor, que exibe PT e ES lado a lado, é
  justamente o lugar onde essa falta passa despercebida. Aviso agendado ou
  vencido vem com o aviso de que nenhum agente está vendo aquilo agora.
- **Busca global na Central, por `Ctrl+K`** (fase 5). A tela tem dez destinos e
  centenas de itens; achar *"aquele link do Ads"* custava lembrar em qual aba
  ele mora e rolar a lista — e quem não lembra desiste e cria um item duplicado,
  que é o pior desfecho. A busca acha destino **e** conteúdo, ignora acento
  ("anuncio" acha "anúncio"), respeita o `ver` da matriz de papéis, e leva
  direto ao item, apontando a linha na lista. Duas velocidades de propósito: os
  destinos filtram na tecla, o conteúdo espera 220 ms de silêncio — sem o
  atraso, cada tecla viraria uma execução do Apps Script. E há um botão no
  header: atalho de teclado que ninguém sabe que existe não existe.
- **Cobrança diária das propostas paradas** (fase 5). A fila avisava quem aprova
  **uma vez**, no momento em que a proposta entrava. Quem não abriu o e-mail
  naquele dia nunca mais soube: quem propôs achava que estava em análise, quem
  aprova nunca viu, e o item ficava parado por semanas sem que o sistema tivesse
  errado em nada. Agora um gatilho diário manda **um e-mail por aprovador, só
  com o que ele pode resolver** — mandar a fila inteira para todo mundo é como a
  cobrança vira ruído e passa a ser apagada sem ler —, e não cobra ninguém pela
  própria proposta. O link vem do mapa de implantações e não de
  `getUrl()`: num gatilho de tempo o serviço pode devolver a URL de outra
  implantação, e a pessoa cairia no ambiente errado. O gatilho precisa ser
  criado à mão uma vez, como o do `Backup.js`; `listStaleContentApprovals()`
  mostra quem seria cobrado antes de ligá-lo.
- **Aba de auditoria, restrita a quem tem `ver auditoria completa`** (fase 5).
  A barra lateral responde *"o que está acontecendo"*; esta responde *"o que
  aconteceu"* — com busca por texto, filtro de quem/ação/módulo, período e
  paginação, mais exportação do resultado para uma aba da própria planilha. A
  paginação é por **número de linha**, não por "pule N resultados": é o que
  mantém o custo de cada página igual em vez de refiltrar tudo que já foi
  mostrado. Cada chamada tem teto de varredura, porque o Apps Script tem 6
  minutos e a aba guarda 24 meses — e a tela distingue "acabou o histórico" de
  "acabou o orçamento desta chamada", que é a diferença entre um "carregar mais"
  honesto e um que mente.
- **Aviso com hora: agendamento e validade** (fase 5). Um aviso pode nascer
  agendado e morrer sozinho. Sem isso, *"avisar a operação às 8h de segunda"*
  era alguém acordar e clicar, e *"tirar quando a instabilidade acabar"* era
  alguém lembrar — e o aviso que ninguém lembra de tirar continua na tela do
  agente dizendo que um problema resolvido há três dias está acontecendo agora.
  Aviso velho não é ruído neutro: ele ensina o agente a ignorar avisos. As duas
  pontas são opcionais (sem início já vale, sem fim não expira), então ligar
  isto não muda nenhum aviso existente. A janela é avaliada **no servidor, no
  horário de Brasília**, e a tela diz isso — a operação atende fusos diferentes,
  e três relógios implícitos são piores que um declarado. A lista da Central
  marca cada aviso com o seu estado, e a confirmação de publicação passou a
  declarar **quando**, não só para quem.
- **"Ver como": conferir a Central pelos olhos de outro papel** (fase 5). Quem
  edita a matriz de permissões precisa poder verificar o que configurou — ler
  uma linha de checkboxes e imaginar a tela resultante é o tipo de tradução em
  que se erra sem perceber, e o erro só aparece quando alguém reclama que não
  consegue trabalhar. Escolhe-se um papel e um idioma, e a tela inteira passa a
  mostrar o que aquela pessoa veria: o trilho, os botões, as caixas de "seu
  papel não edita isto". Uma faixa fica na tela o tempo todo dizendo de quem é a
  visão. A prévia **nunca concede**: o servidor intersecta o papel escolhido com
  o de quem pediu, e diz na própria faixa quantas permissões daquele papel não
  estão sendo mostradas porque quem pediu também não as tem. E fica só de
  leitura — conferir não é decidir, e uma decisão tomada "de dentro" da prévia
  sairia no nome de quem clicou, não no do papel previsto.
- **Aba "Papéis" na Central: a matriz de permissões virou tela** (fase 4). Uma
  linha por módulo, uma coluna por ação, e um traço onde a ação não existe
  naquele regime — não existe "aprovar um aviso", e um checkbox desligado ali
  prometeria uma operação que o módulo não tem. O aviso de **publicação sem
  revisão** aparece enquanto se clica, não só ao salvar, e nomeia os módulos
  afetados; a confirmação mostra **o que muda**, não o estado final. Editar o
  próprio papel recarrega a sessão, porque o que a tela tinha em memória deixou
  de valer. O seletor de papel da aba Acessos passou a ler os papéis do
  servidor, em vez dos quatro fixos no HTML.
- **Papéis da Central viraram dado editável** (fase 4, ADR-0009). Eram uma
  constante no código: dar links a um QA, ou criar um papel que publica
  disponibilidade sem tocar no catálogo, custava um deploy. Agora a aba
  `Content_Roles` guarda uma matriz **módulo × ação** — `ver`, `propor`,
  `aprovar`, `publicar direto`, `reverter` — mais quatro permissões globais.
  `propor` e `publicar direto` são colunas distintas, que é o que separa TL de
  WFM e a lista única de antes não sabia dizer; `ver` também é coluna, e não um
  implícito de quem tem acesso. **No dia 1 nada muda**: a aba nasce semeada com
  os quatro papéis de hoje, e há teste comparando o preset contra a constante
  antiga. Aba ausente ou ilegível cai no preset em vez de trancar todo mundo do
  lado de fora.
- **Quatro regras que um checkbox não abre** — no servidor, com teste, porque o
  risco de tirar permissão do code review é que o erro não dá erro, só concede:
  **anti-lockout** (nenhuma alteração deixa a Central sem quem gerencie papéis e
  acessos — substitui a trava antiga de "o ADMIN não se remove", que bloqueava a
  saída legítima de um entre dois admins e não cobria remover o outro);
  **escalação declarada** (ganhar propor + aprovar + aprovar a si mesmo não
  grava sem confirmação explícita); **revogação imediata** (o cache de permissão
  cai no ato, nunca por TTL); e **aprovar autorização exige controlar
  autorização** (aprovar `people` pede a permissão global de gerenciar acessos —
  a regra deixou de ser sobre o *nome* do papel, que agora é editável).
- **Atividade recente na Central, com foto de quem fez** (fase 3). A mesma barra
  lateral do TL Dashboard: quem publicou, aprovou, rejeitou ou reverteu o quê, e
  há quanto tempo — com a justificativa da rejeição na própria linha, que é onde
  ela é útil. O que cada pessoa vê é decidido **no servidor**: mudança de acesso
  só para quem gerencia acesso, e linha do módulo `people` só para quem propõe
  nele. A barra abre por padrão em tela larga, flutua sobre o conteúdo em tela
  estreita, e fechada não custa execução nenhuma do Apps Script.
- **Aba `Content_Log`: a auditoria da Central virou dado, não texto** (fase 3).
  Cada ação tem agora coluna própria para módulo, chave, item e detalhe, no
  lugar da linha na aba `Logs` genérica onde tudo isso vivia concatenado num
  campo só — inclusive um sufixo `" (autoaprovação ADMIN)"` grudado na chave,
  que fazia a mesma chave contar como duas. Sem essas colunas não há como
  filtrar por módulo, e sem filtrar por módulo não há como esconder de um QA o
  que ele já não vê na aba Pessoas. Esquema em
  `specs/data-models/db-schema.md`; retenção de 24 meses pelo ADR-0008.
- **`backfillContentLog()`** traz para a aba nova o histórico que ficou na
  `Logs` (`Category = 'ContentCentral'`), repartindo o campo antigo nas colunas.
  **Simula por padrão** — só `backfillContentLog(true)` escreve — e **copia sem
  apagar** a origem. Restrito a quem gerencia acesso.
- **A revisão passou a mostrar o que mudou** (fase 3). Eram dois blocos de texto
  integral lado a lado, sem realce: num corpo de e-mail de quarenta linhas,
  achar a vírgula alterada era trabalho manual. Agora um diff por palavra marca
  só a diferença nos dois lados, e o valor é lido como conteúdo — assunto e
  corpo do e-mail, tipo/título/texto do aviso, um campo por linha no modelo de
  nota — em vez do JSON cru que escondia a mudança real no meio de aspas e
  chaves. Quem aprova também ganhou a **prévia renderizada** do e-mail, que
  antes só existia para quem editava.

- **Rascunho virou um estado alcançável na Central** (fase 3). Todo editor tinha
  um botão só, que salvava e enviava para revisão no mesmo gesto: não havia como
  guardar trabalho parcial, a pílula "rascunho" que as listas sabiam desenhar
  nunca aparecia, e a trava de edição cooperativa nunca chegava a valer porque
  nada ficava aberto. Agora são dois caminhos — **Salvar rascunho** e **Enviar
  para revisão** —, a linha do item diz se há rascunho seu, se alguém está
  editando (e quem), ou se já foi para a fila, e existe
  `discardContentDraft` para desistir. Sem essa saída o rascunho viraria
  armadilha: ficaria na lista, contaria na home e reabriria na próxima edição.
- **Histórico e "voltar para esta versão" na Central** (fase 3). Cada item
  publicado passou a oferecer o seu histórico: quais versões existiram, quem
  publicou cada uma e quando. `listContentItemHistory` e `rollbackContentItem`
  existiam no backend desde o começo e nunca tinham sido chamados pela tela —
  enquanto isso o modal de remoção prometia que "a versão fica arquivada e pode
  voltar", sem oferecer caminho para fazê-la voltar. Ver o histórico é leitura,
  e aparece para quem enxerga o item; republicar uma versão anterior vai ao ar
  sem passar pela fila, então exige o papel de quem aprova e o mesmo passo de
  confirmação da publicação direta.
- **Smoke da Central de Conteúdo** (`npm run smoke:content`). A maior tela do
  projeto era a única sem teste nenhum, e a reorganização da navegação
  (ADR-0007) toca todos os seus renderizadores de uma vez. O smoke carrega o
  `ContentDashboard.html` num navegador de verdade com o `google.script.run`
  dublado, e trava o que precisa continuar valendo depois do redesenho: acesso,
  régua de papéis, um painel visível por vez, o regime de publicação dito em
  cada módulo, uma chamada por proposta salva e falha de rede aparente.
- **Três ADRs propondo a próxima fase da Central de Conteúdo** (`docs/decisions/`):
  [0007](docs/decisions/0007-arquitetura-da-central-de-conteudo.md) troca as dez
  abas por um trilho agrupado pelo regime de publicação;
  [0008](docs/decisions/0008-cache-e-retencao-do-conteudo.md) define cache da
  leitura pública e retenção por aba (por linhagem em `Content_Items`, 24 meses
  em `Content_Log`, trimestral em `Logs`);
  [0009](docs/decisions/0009-rbac-editavel-da-central.md) tira os papéis do
  código e os move para uma matriz editável. Nenhum código de produção mudou —
  são decisões aguardando validação.
- O índice de `docs/decisions/README.md` voltou a listar todos os ADRs: o 0006
  (aba People) tinha ficado de fora.
- **Crédito de autoria nos dashboards do Apps Script.** A Central de Conteúdo e
  o TL Dashboard eram as únicas telas do projeto sem crédito e sem caminho para
  reportar um bug — não passam pelo `header-factory` do front. Agora recebem um
  rodapé discreto (link do form + "criado por @lucaste") pela mesma injeção de
  template que já servia o selo de ambiente (`CW_CREDIT`, em `Código.js`).
- **"Reportar um problema" traduzido nos e-mails automáticos.** O rótulo estava
  fixo em português dentro do `EmailTemplateDynamic.html`, mesmo nos e-mails que
  saem em espanhol. Virou slot (`{{FEEDBACK_LABEL}}`) alimentado por
  `EMAIL_I18N`, com fallback em PT para quem não passa o rótulo. O link do form
  também passou a aparecer na alternativa em texto puro, que só tinha o rodapé
  de rastreio.
- **Rodapé de crédito no Onboarding e no Changelog.** Os dois wizards de slides
  passam por `wizard-shell.js` e eram as únicas telas do front fora do
  `header-factory` — ficavam sem crédito e sem caminho para reportar. Ganharam
  uma linha só, abaixo dos botões, com o link do form e a autoria (PT/ES).
- **Traço de autoria no alerta de volume BAU.** `BAU_Alerts.js` montava o rodapé
  só com o motivo do disparo; agora fecha com "Cases Wizard · automatizado por
  @lucaste", como os demais e-mails do fluxo.

- **E-mail de decisão para quem propôs.** Aprovação e rejeição avisam o autor da
  proposta, com a justificativa do revisor no corpo e um botão para a Central —
  a URL derivada da implantação em execução, não fixa. Antes a rejeição era
  invisível: o rascunho voltava para "draft" e o motivo ficava numa coluna que
  ninguém abre.
- **Form de bugs e sugestões unificado em uma variável só.** Havia três URLs
  diferentes em produção (overlay de ajuda, Configurações → Suporte e rodapé dos
  e-mails). Agora existe um ponto de verdade por runtime — `FEEDBACK_FORM_URL`
  em `src/modules/shared/config.js` e `CW_FEEDBACK_FORM_URL` em
  `gas-backend/Código.js` — apontando para o form novo.
- **Crédito de autoria em formato único.** Convivia `@lucaste`, `lucaste@` e
  `by lucaste@`. Passou a sair de `AUTHOR_CREDIT` / `CW_AUTHOR_CREDIT`.
### Security
- **A prévia de e-mail passou a rodar em `iframe` fechado** (`sandbox=""`). Um
  modelo é HTML escrito por uma pessoa e lido por outra, numa tela que fala com
  o backend na autoridade de quem revisa — injetá-lo direto no documento seria
  XSS armazenado entre usuários, a classe que `docs/LEARNINGS.md` registrou no
  Ctrl+K. A prévia do editor foi para o mesmo caminho: dois jeitos de renderizar
  a mesma coisa é como um deles fica para trás.

### Changed
- **O botão de desativar acesso passou a aparecer também para si mesmo.** A
  trava deixou de ser "não se remova" e passou a ser "não fique sem ninguém que
  governe" — quem for o último a governar recebe um erro do servidor que explica
  exatamente isso, e quem tem um colega admin pode simplesmente sair.
- **A Central de Conteúdo trocou as dez abas por um trilho agrupado pelo regime
  de publicação** (ADR-0007). Catálogo (passa por revisão), Operação (vai ao ar
  na hora) e Governança: o grupo passa a carregar a informação que antes morava
  num parágrafo dentro de cada painel. A tela abre num **Hoje** — fila de
  revisão, propostas em andamento e o que o seu papel publica sem fila — em vez
  de numa lista de links sem contexto. Cada destino tem endereço próprio
  (`#/aprovacoes`), então uma pendência cabe num chat.
- **O idioma é escolhido uma vez, no trilho.** Eram três seletores independentes
  (call script, notas, e-mails), posicionados de um jeito em cada painel e sem
  nada sincronizando — dava para revisar ES num e PT no outro sem perceber.
- **Publicar um aviso ou uma disponibilidade agora declara o alcance antes.** A
  fricção estava invertida: a ação que muda a produção de todo mundo disparava
  num clique, enquanto rejeitar uma proposta — reversível — exigia modal e
  justificativa. A confirmação é uma camada por cima do editor, então voltar não
  custa o que foi digitado.
- **`ContentDashboard.html` dividido em partes** (`include()` do `HtmlService`).
  Eram ~3.500 linhas com estilo, marcação e dez renderizadores no mesmo arquivo;
  agora a casca tem 413 e o resto está em quatro partes cortadas pelo **regime**
  de cada módulo — catálogo (passa pela fila), operação (publica direto) e
  governança —, o mesmo corte que a navegação vai passar a mostrar. Sem mudança
  de comportamento: o HTML remontado é idêntico ao anterior, exceto pelos dois
  `addEventListener` finais, que foram para junto do `boot`.
- **Central de Conteúdo, fase 1 — correção e carga** (ADR-0008). A leitura
  pública passou a ser servida por `CacheService` (TTL de 5 min, invalidado na
  hora por toda escrita que muda o que está no ar) e aceita `modules=a,b,c`,
  então o boot do agente pede os sete módulos numa execução em vez de sete.
  Salvar uma proposta virou uma viagem ao servidor (`saveAndSubmitContentDraft`)
  no lugar de duas — três nos e-mails e nas notas. As escritas de linha agora
  vão em bloco (`setValues`) em vez de uma chamada por coluna.

### Fixed
- **A auditoria mostrava o nome interno de metade das ações.** `role_update`,
  `audit_export`, `people_updated` e as outras que nasceram depois da barra
  lateral não tinham tradução, e apareciam como jargão de código exatamente na
  tela onde quem lê não sabe o que é `role_update`. Só apareceu ao **olhar a
  tela renderizada** — os testes de estrutura passavam felizes com o slug na
  cara de quem audita. Agora um teste percorre a lista inteira de ações que o
  servidor registra e exige tradução para cada uma, então a próxima ação nova
  que alguém esquecer de traduzir cai no smoke.
- **Dois harnesses de teste ficaram para trás da fase 2 da Central.** As
  escritas em bloco (`setValues`) quebraram `test:people` em 15 testes, porque
  só o dublê de planilha do `test-content-api.js` tinha sido estendido; e a
  divisão da tela em partes quebrou `smoke:people`, que lê o mesmo
  `ContentDashboard.html` do disco e não resolvia os `include()`. A montagem da
  tela virou um módulo compartilhado (`scripts/content-dashboard-html.mjs`) e
  os dublês de planilha passaram todos a modelar
  `getRange(l, c, nL, nC).setValues(...)`. Lição registrada em
  `docs/LEARNINGS.md`.
- **Duas aprovações simultâneas publicavam o mesmo item duas vezes.** Entre o
  `appendRow` da linha nova e a virada do status do rascunho havia uma janela em
  que a proposta ainda constava como pendente; uma segunda execução entrando ali
  passava pela mesma checagem e publicava de novo, deixando duas linhas `live`
  na mesma linhagem — item duplicado na tela do agente, sem erro em log nenhum.
  O caminho de publicação passou a rodar sob `LockService`.
- **Falha ao carregar as propostas em andamento virava "não há nenhuma".** A
  tela desenhava a lista como se o módulo não tivesse pendência, e quem então
  editava um item com proposta em revisão levava uma recusa do servidor sem ter
  como explicar. Agora a falha aparece, com botão de tentar de novo.

- **O atalho de e-mail voltou a funcionar na interface antiga do Connect
  Cases.** A migração para o speed dial da UI nova (`#action-bar-speed-dial-container`
  → `material-button.compose`) removeu o fluxo da UI antiga
  (`material-fab-speed-dial` → `.trigger`) em vez de mantê-lo como alternativa.
  O clique no envelope solto, que ficou como único plano B, exige o ícone já
  visível — e na UI antiga ele está escondido atrás do menu fechado, então o
  agente ficava sem nenhuma rota e via só o toast de erro. As duas interfaces
  convivem enquanto a atualização do CRM chega em ondas, então a FASE 1 tenta a
  UI nova primeiro e, quando o markup dela não está na tela, cai no fluxo antigo
  **transplantado literalmente** do commit anterior à migração (`269127d`), sem
  uma linha de lógica alterada. Uma primeira tentativa de restaurá-lo reescrito
  (polling no lugar dos 800 ms fixos, checagem de visibilidade, clique no
  `<material-button>` em vez do `<i>`) continuou falhando — o texto original é a
  única versão com prova de funcionamento na UI antiga. O log diz qual dos dois
  fluxos abriu o compositor.

### Security
- **A prévia de e-mail passou a rodar em `iframe` fechado** (`sandbox=""`). Um
  modelo é HTML escrito por uma pessoa e lido por outra, numa tela que fala com
  o backend na autoridade de quem revisa — injetá-lo direto no documento seria
  XSS armazenado entre usuários, a classe que `docs/LEARNINGS.md` registrou no
  Ctrl+K. A prévia do editor foi para o mesmo caminho: dois jeitos de renderizar
  a mesma coisa é como um deles fica para trás.

## [6.1.0] - 2026-09-01

### Added
- **Aba "Pessoas" na Central de Conteúdo — a planilha People editável pela
  tela.** Entrada, saída, troca de fluxo e troca de idioma de um agente passam a
  ser feitas ali, por **ADMIN e TL**, em vez de digitando na planilha. O TL
  propõe e a alteração vai para a fila; o **ADMIN aprova** — e, por já poder
  aprovar sozinho, aplica na hora, numa chamada só. A aba People é o diretório de
  autorização (`isOverhead` e idioma padrão saem dela), então a escrita **não
  passa pelo JSONP**, onde a identidade é forjável: tudo por `google.script.run`.
  Aprovação de gente é exclusiva do ADMIN, mesmo que o TL aprove conteúdo.
  Backend em `gas-backend/PeopleAPI.js`; ADR em
  `docs/decisions/0006-aba-people-editavel-na-central.md`.
- **Cor de identificação por segmento e por categoria.** Cada linha traz o
  segmento (o "fluxo") e a categoria como chip colorido — cores fixas para
  PT/ES/EN/Staff e um hash estável para qualquer valor novo, que assim nasce com
  cor própria sem precisar de deploy. Quem tem acesso de liderança leva um escudo
  ao lado do LDAP.
- **Edição no lugar da linha, sem modal.** A linha se abre como editor, mostrando
  enquanto se digita o que a regra do servidor vai derivar: o idioma em que o app
  abrirá e se aquela categoria dá acesso ao TL Dashboard — a regra permissiva do
  `isOverhead` deixa de ser invisível. A linha alterada pisca em verde (aplicada)
  ou âmbar (na fila), com busca e filtro por segmento na mesma tela.
- **`npm run test:people`** (40 checagens da regra, incluindo o round-trip até
  `getUserProfileByLdap()`) e **`npm run smoke:people`** — o primeiro smoke que
  dirige o `ContentDashboard.html` real num Chromium, com `google.script.run`
  ligado ao backend GAS de verdade.
- **Formulário de bugs e sugestões**, com banner no app e script de setup da
  planilha de respostas.
- **Avisos em duas colunas**, com o contraste corrigido e um aside de estado.

### Changed
- **`test:content` passa a carregar `Código.js` e `PeopleAPI.js` no mesmo
  contexto**, como o Apps Script faz — o `ContentAPI` agora desvia para o
  `PeopleAPI` quando o módulo é `people`, e um harness com só um dos arquivos
  testaria um ambiente que não existe.
- **A derivação de idioma a partir do segmento virou `defaultLanguageForSegment()`
  no `Código.js`**, usada tanto por `getUserProfileByLdap()` quanto pela tela.
  Duas cópias fariam a Central prometer um idioma e o app entregar outro.

### Fixed
- **Fila do TL Dashboard em FIFO.** `getPendingBAUCases` devolvia
  `cases.reverse()` (mais novo primeiro), contra a regra de ordenação de
  `specs/workflow/bau-lifecycle.md`. Quem escalava primeiro era atendido por
  último.
- **E-mails:** CTA encurtado e o raio da pill aplicado ao chip de identidade.
- **Form de feedback:** nome correto da aba de respostas, sem coleta forçada de
  e-mail, e o setup passa a exigir planilha ativa.
- **Gerador de doc técnico:** o alerta final não parece mais uma falha.

### Security
- **O diretório de pessoas nunca sai pela leitura pública.** O módulo `people`
  entrou em `CONTENT_PRIVATE_MODULES`: `op=content_public&module=people` é
  recusado, e a escrita não tem rota JSONP nenhuma — a identidade ali é um
  parâmetro forjável.

## [6.0.0] - 2026-08-21

### Added
- **Marca visível de ambiente, no app e nos dashboards.** Em desenvolvimento a
  pílula ganha um anel âmbar (colapsada) e um selo "Dev" (aberta), e os
  dashboards de TL e da Central de Conteúdo mostram um chip âmbar no canto. Em
  produção não aparece nada — a decisão foi não pôr chrome extra na tela de quem
  está trabalhando. O contrapeso é **Configurações → Diagnóstico**, que mostra o
  ambiente SEMPRE, inclusive em produção, para que "estou em produção" seja uma
  confirmação positiva e não a ausência de um selo (ausência também é o que se vê
  quando algo não renderizou).
  Junto vai o sufixo da implantação (últimos 6 caracteres do ID): é ele que prova
  a separação, porque **o sufixo no app tem de bater com o do dashboard**. Os
  dashboards não confiam numa constante compilada — descobrem a implantação pelo
  `ScriptApp.getService().getUrl()` da própria requisição, e uma implantação fora
  do mapa aparece em vermelho como "IMPLANTAÇÃO DESCONHECIDA" em vez de ser
  tratada como produção.
  Coberto por `npm run test:deployment-env` (9 casos) e `npm run smoke:env-badge`
  (11 checagens, os dois builds num navegador real).
- **Uma implantação do Apps Script por branch, promovida pelo CI.** Até aqui
  existia uma implantação só, republicada a cada push em `refactor-structure` —
  e como o frontend inteiro apontava para ela, um push numa branch de
  desenvolvimento republicava o backend que os agentes estavam usando. Agora
  `refactor-structure` promove a implantação de desenvolvimento (nova) e `main`
  promove a de produção (a que já estava em uso real), cada branch tocando
  apenas a sua. **O merge para a `main` passa a ser o portão de produção**, sem
  passo manual depois dele. O job do frontend declara `needs:
  deploy-backend-gas`, de modo que o backend é promovido antes de o frontend ser
  publicado — os dois rodavam em paralelo, e era essa corrida que permitia um
  frontend novo chamar operações que a implantação ainda não conhecia.
  Ver `docs/decisions/0004-implantacoes-apps-script-por-branch.md`.
- **O bundle escolhe seu backend em tempo de build.** Contraparte do item acima,
  no lado do cliente: `data-service.js` carrega os dois IDs num mapa
  `DEPLOYMENTS` e o `esbuild` decide qual vale, pelo `--define:__CW_BUILD_ENV__`
  que o `deploy.yml` injeta por branch. Sem o define o fallback é
  `"development"`, então os scripts locais `npm run build` / `npm run dev`
  também passam a flag — `build` gera o arquivo com nome de produção, e sem isso
  seria uma armadilha silenciosa. Ver `RELEASE.md` → *Secrets & configuration*.
- **`npm run smoke:wizards`** (25 checagens, Playwright sobre o
  `mock-crm.html`): cobre os dois wizards de slides — cross-fade, foco preso no
  card, scroll-lock, `prefers-reduced-motion`, conteúdo e casca em espanhol,
  viewport baixa e estreita, e a guarda de descompasso de versão. Lê o
  `APP_VERSION` de `src/app.js` em vez de fixar um número, para que um bump que
  esqueça o `changelog-data.js` deixe o teste vermelho.
- **Atalhos do Ctrl+K configuráveis por agente.** Cada pessoa escolhe os
  comandos que quer no Ctrl+K: status + substatus + os cenários que quiser (ou
  nenhum), com nome e apelido de busca próprios. Dois caminhos para criar — o
  botão "Salvar como atalho" no Case Notes, que captura a combinação já montada
  na tela, e o construtor em Configurações → **Meus Atalhos**, onde também se
  renomeia, reordena (arrastando ou pelas setas) e exclui. O palette passa a
  agrupar "Meus atalhos" acima de "Módulos" e, por padrão, ordena os atalhos por
  frequência de uso (desligável). Limite de 8 atalhos. Quem nunca configurou
  nada continua recebendo os dois de sempre, agora editáveis.
  Ver `docs/decisions/0002-atalhos-ctrl-k-por-agente.md`.
- **Aba `User_Prefs`** e ops `get_user_prefs`/`save_user_prefs`: preferência de
  agente na nuvem (cache-first, mesmo padrão da Biblioteca Pessoal), para que a
  configuração siga a pessoa ao trocar de máquina ou de perfil do Chrome.
- Suítes `npm run test:shortcuts` (16 casos), `npm run test:prefs` (12) e
  `npm run smoke:shortcuts` (10, Playwright sobre o `mock-crm.html`).
- Project adopted into groundrules on 2026-08-18
- **Suporte a espanhol (PT/ES) em todo o produto.** O idioma da interface é
  herdado do perfil da pessoa na planilha People (`profile.defaultLanguage`) e
  pode ser trocado manualmente em Configurações (persistido por navegador).
  Cobre: toda a interface (Notes, Email Assistant, Call Script, BAU Central,
  Central de Avisos, Central de Links, Minha Biblioteca, Time Zone, Onboarding,
  Changelog, pílula flutuante e Ctrl/Cmd+K) e todo o conteúdo (27 cenários de
  nota, rótulos de screenshot, 8 templates de e-mail, 60 descrições de link).
  No Apps Script, os 5 e-mails automáticos e o TL Dashboard saem no idioma de
  quem recebe/acessa. Ver `docs/decisions/0001-i18n-pt-es.md`.

### Changed
- **Os wizards de Onboarding e de Changelog foram reconstruídos sobre uma casca
  compartilhada** (`shared/wizard-shell.js`). Os dois arquivos eram ~90% o mesmo
  código, e foi essa duplicação que os deixou de fora da auditoria de movimento:
  eram os dois últimos módulos sem `prefers-reduced-motion`. A casca traz os
  tokens `--cw-*` e as 4 curvas canônicas no lugar de hex e `cubic-bezier`
  literais, transições com propriedades explícitas, navegação completa por
  teclado (setas, Voltar, `Tab` preso no card, foco devolvido ao fechar), região
  `aria-live` anunciando cada slide, dots clicáveis e rotulados, e cross-fade na
  troca de slide. O "Pular" saiu do rodapé para o canto superior — com Voltar +
  Pular + Próximo a linha estourava a 380px de viewport.
- **Conteúdo do Onboarding reescrito** (PT e ES): ainda anunciava o "Quick
  Email", módulo removido e substituído por Email Assistant + Minha Biblioteca,
  e não citava Ctrl+K, Minha Biblioteca, BAU Form nem o estacionamento de casos.
  Passa a usar os mesmos rótulos da paleta de comandos, que é por onde a pessoa
  vai procurar depois.
- O seletor PT/ES próprio do Notes e o do Call Script foram removidos: os dois
  módulos agora seguem o idioma único da sessão, trocado em Configurações.

### Fixed
- **O modal de novidades mostrava o selo de uma versão sobre o texto de outra.**
  `APP_VERSION` (`src/app.js`) estava em `v5.2` enquanto `RELEASE_NOTES.version`
  seguia em `v5.1`: o modal abria anunciando "Atualização v5.2" com as
  novidades da v5.1, e `RELEASE_NOTES.title` sequer era renderizado. Ambos vão
  para **v6.0**, com as notas reescritas para o que de fato entrou, e
  `checkAndShowChangelog` passa a suprimir o modal (com `console.warn`) se os
  dois voltarem a divergir — melhor não mostrar nada do que mostrar errado.
- O `confirmDialog` de "pular o tutorial" empatava em `z-index` 2147483647 com o
  overlay do Onboarding e só ficava por cima por ordem de DOM. A casca dos
  wizards passa a usar 2147483646, um abaixo, explicitamente.
- **Atalhos: seis defeitos achados na revisão do próprio código.** Dois cliques
  no "Salvar" criavam dois atalhos idênticos (o id só nascia na escrita; agora
  é carimbado ao abrir o editor, e o botão fica desabilitado com estado
  "Salvando…" enquanto o JSONP não responde). O apelido do agente era
  interpolado num `innerHTML` — um `<` quebrava a linha e uma tag **executava**;
  agora nome e apelido entram só por `textContent`. A lista de Configurações
  mostrava sempre a ordem manual, contradizendo o Ctrl+K no modo padrão
  (ordenado por uso). Uma preferência salva sem rede era descartada em silêncio
  pela sincronia seguinte (portado o `_pendingSync` da Biblioteca Pessoal). A
  seta ↓ no último item perdia o foco do teclado. Soltar o mouse fora do punho
  deixava o item arrastável pelo corpo inteiro.
- **Atalhos: a seção destoava do padrão visual do app** — sem
  `prefers-reduced-motion` (que o próprio `configs-assistant.js` já respeita),
  com foco de teclado visível só no punho de arrastar, transições com `ease` cru
  em vez dos tokens `--cw-ease-*`, e chips de cenário com forma diferente da que
  o Case Notes usa para os mesmos objetos.
- **Os atalhos de nota do Ctrl+K sumiriam sem aviso quando a Central de Conteúdo
  publicasse os modelos de nota.** `applyNoteTemplateContent()` reescreve
  `scenarioSnippets` inteiro com ids derivados e sem o campo `quickLaunch`, do
  qual os atalhos dependiam — o filtro do palette passaria a devolver zero, sem
  erro nenhum. Os atalhos agora vivem fora do catálogo de cenários e referenciam
  o cenário com resolução tolerante (id exato → slug no mesmo substatus).
- Um atalho apontando para um cenário que não existe mais abria a nota pela
  metade em silêncio; agora avisa o agente e aparece marcado em Configurações.
- Cenários publicados pela Central apareciam nos chips com o id cru
  (`cw in_not_reachable in no show bau`); passam pelo mesmo `scenarioLabel()`
  que o construtor de atalhos usa.
- Botões "Não/Sim" do seletor "Caso de Portugal?" (Notes) não retraduziam ao
  trocar de idioma.
- Botão padrão de confirmação destrutiva (`confirmDialog`) ficava em português
  mesmo com a interface em espanhol.

### Deprecated

### Removed

### Fixed

### Security

<!--
## [0.1.0] - YYYY-MM-DD

### Added
- ...
-->

[Unreleased]: https://github.com/lucastdcs/case-wizard/compare/v6.3.3...HEAD
[6.3.3]: https://github.com/lucastdcs/case-wizard/compare/v6.3.2...v6.3.3
[6.3.2]: https://github.com/lucastdcs/case-wizard/compare/v6.3.1...v6.3.2
[6.3.1]: https://github.com/lucastdcs/case-wizard/compare/v6.3.0...v6.3.1
[6.3.0]: https://github.com/lucastdcs/case-wizard/compare/v6.2.0...v6.3.0
[6.2.0]: https://github.com/lucastdcs/case-wizard/compare/v6.1.0...v6.2.0
[6.1.0]: https://github.com/lucastdcs/case-wizard/compare/v6.0.0...v6.1.0
[6.0.0]: https://github.com/lucastdcs/case-wizard/releases/tag/v6.0.0
