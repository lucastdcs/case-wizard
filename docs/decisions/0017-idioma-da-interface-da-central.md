# 0017 — Idioma da interface da Central, separado do idioma do conteúdo

**Date**: 2026-10-14
**Status**: Accepted

## Context

A Central de Conteúdo já tinha um seletor "Idioma" (PT/ES) no trilho, mas ele
decidia o **conteúdo** em revisão (qual catálogo de call script, notas e e-mails
aparece), não a tela. Menus, títulos e botões eram só em português, enquanto o
app do agente e o TL Dashboard já seguiam o idioma de quem lê (ADR-0001). Parte
de quem revisa e publica é hispanofalante, e a planilha People também tem
pessoas com segmento EN.

A tela tem cerca de 6.900 linhas em seis partes, e boa parte do texto é montada
por renderizadores em JS. Traduzir tudo de uma vez seria um PR impossível de
revisar.

O app do agente já separou os dois "idiomas" de uma pessoa (ADR-0016: interface
× saída). A Central tem a mesma dualidade com outros nomes: a tela de quem lê ×
o catálogo em revisão.

## Decision

A Central ganha um **idioma da interface** (PT/ES/EN), independente do **idioma
do conteúdo**:

- seletor próprio no topo (`#lang-ui`), visível desde o boot, com os nomes dos
  idiomas sempre no próprio idioma; o seletor do trilho passa a se chamar
  "Idioma do conteúdo" e não muda de comportamento;
- resolução na ordem do ADR-0001: escolha manual salva no navegador
  (`cw_content_ui_lang`) → `defaultLanguage` da People, que agora vem em
  `getContentSession()` (também para quem não tem acesso, que lê a tela de
  recusa) → PT;
- mesmo mecanismo do TL Dashboard: dicionário `UI_I18N` em
  `ContentDashboard_I18n.html`, marcação `data-i18n*` no HTML fixo e `tt()` no
  que o JS monta. Chave que falta em ES/EN cai no PT, nunca em branco;
- tradução **por fases**. A primeira cobre a casca: topo, trilho, estados de
  boot e recusa, cabeçalho de cada aba, textos fixos dos painéis e o aviso de
  permissão. Listas, editores e modais montados pelos renderizadores seguem
  em português até a fase deles.

Junto, a Central ganha **notas de versão próprias** (`CW_CONTENT_RELEASE_NOTES`
em `DashReleaseNotes.gs`), no mesmo padrão do TL Dashboard: injetadas pelo
servidor, abrem uma vez quando a versão muda, botão no topo para reler, cada
texto em `{ pt, es, en }` resolvido pelo idioma da interface.

## Alternatives considered

- **Um seletor só, para tela e conteúdo**: rejeitado. O caso de uso do seletor
  atual é justamente revisar o catálogo ES lendo a tela em PT (ou o contrário);
  amarrar os dois obrigaria o revisor a ler a tela num idioma que não escolheu.
- **Traduzir tudo num PR**: rejeitado pelo tamanho. Por fases, cada parte tem
  diff revisável e smoke próprio.
- **As mesmas notas de versão do TL**: rejeitado. O público é outro, e um TL que
  usa as duas telas leria em cada uma o que mudou na outra.

## Consequences

### Positive
- Quem lê em ES ou EN recebe a casca da Central no seu idioma sem configurar.
- O idioma do conteúdo continua sendo escolha do revisor.
- Chave nova sem tradução não quebra nada; o smoke acusa chave faltando em ES/EN
  e marcação apontando para chave inexistente.

### Negative / Tradeoffs
- Até as próximas fases a tela é mista para ES/EN: casca traduzida, listas e
  editores em português.
- Um terceiro dicionário de interface fora do bundle (app, TL, Central), pelo
  mesmo motivo do segundo: a página não importa o i18n do front.
- `getContentSession()` passa a ler a aba People a cada carga da Central.

### Neutral
- A escolha manual é por navegador, como no app e no TL.

## Notes

- Mecanismo: `gas-backend/ContentDashboard_I18n.html`; sessão:
  `getContentSession()` em `gas-backend/ContentAPI.js`.
- Testes: `npm run smoke:content` (idioma e novidades), `npm run test:content`
  (idioma na sessão), `npm run test:dash-changelog` (notas dos dois painéis).
