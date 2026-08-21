<!-- generated-by: groundrules v1.10.0 -->
# Changelog

All notable changes to this project are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
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
- O seletor PT/ES próprio do Notes e o do Call Script foram removidos: os dois
  módulos agora seguem o idioma único da sessão, trocado em Configurações.

### Fixed
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
