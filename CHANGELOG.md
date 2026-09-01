<!-- generated-by: groundrules v1.10.0 -->
# Changelog

All notable changes to this project are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

- Fila do TL Dashboard agora é FIFO de verdade: `getPendingBAUCases` ordena do
  mais antigo pro mais recente pela data de envio, em vez de devolver a planilha
  invertida (mais novo primeiro), como já exigia `specs/workflow/bau-lifecycle.md`.

### Security

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

[Unreleased]: https://github.com/lucastdcs/case-wizard/compare/v6.0.0...HEAD
[6.0.0]: https://github.com/lucastdcs/case-wizard/releases/tag/v6.0.0
