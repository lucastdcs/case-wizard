<!-- generated-by: groundrules v1.10.0 -->
# Changelog

All notable changes to this project are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
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

### Changed
- **Central de Conteúdo, fase 1 — correção e carga** (ADR-0008). A leitura
  pública passou a ser servida por `CacheService` (TTL de 5 min, invalidado na
  hora por toda escrita que muda o que está no ar) e aceita `modules=a,b,c`,
  então o boot do agente pede os sete módulos numa execução em vez de sete.
  Salvar uma proposta virou uma viagem ao servidor (`saveAndSubmitContentDraft`)
  no lugar de duas — três nos e-mails e nas notas. As escritas de linha agora
  vão em bloco (`setValues`) em vez de uma chamada por coluna.

### Fixed
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

### Added
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

### Deprecated

### Removed

### Fixed

### Security

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

[Unreleased]: https://github.com/lucastdcs/case-wizard/compare/v6.1.0...HEAD
[6.1.0]: https://github.com/lucastdcs/case-wizard/compare/v6.0.0...v6.1.0
[6.0.0]: https://github.com/lucastdcs/case-wizard/releases/tag/v6.0.0
