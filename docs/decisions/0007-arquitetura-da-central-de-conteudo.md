# 0007 — Arquitetura da Central de Conteúdo: trilho por regime, no lugar de abas

**Date**: 2026-09-02
**Status**: Proposed

## Context

A Central de Conteúdo (`gas-backend/ContentDashboard.html`) nasceu com nove abas
num nível só. Elas parecem a mesma coisa e não são: cinco módulos
(`links`, `call_script`, `note_template`, `email_template`, `tips`) só criam
**proposta** — clicar ali não muda nada até alguém aprovar —, dois
(`broadcast`, `bau_availability`) publicam **direto em `live`**, na frente de
todo agente conectado, e dois (Aprovações, Acessos) são governança.

Hoje, o que distingue os três regimes é um parágrafo azul (`div.note`) no topo
de cada painel. Isso deixa a caixa de texto fazendo o trabalho que deveria ser
da estrutura: a ação mais irreversível da tela — publicar um aviso para toda a
operação — tem exatamente a mesma aparência, o mesmo botão azul e a mesma
posição que propor a troca de uma descrição de link.

Três outras restrições pesaram:

1. **A régua de permissão é horizontal.** `CONTENT_ROLES` dá a um WFM apenas
   `links` e `bau_availability`; ele recebe as outras sete abas em modo leitura,
   cada uma com um aviso dizendo que ele não pode editar aquilo. A tela gasta a
   atenção de quem entra mostrando o que a pessoa não faz.
2. **A fila de abas não escala, e isso já se confirmou.** A revisão foi escrita
   com nove abas; enquanto ela era escrita, o módulo `people` (ADR-0006) entrou
   e a fila virou **dez**. `CONTENT_MODULES` é feito para crescer, e cada
   entrada nova custa uma aba a mais na mesma linha, que já quebra em duas em
   telas estreitas.
3. **Não há endereço para nada.** Sem rota, uma pendência não pode ser colada
   num chat: quem precisa de revisão manda "abre a Central, vai em Aprovações,
   procura".

## Decision

A navegação passa a ser um **trilho lateral com grupos nomeados pelo regime** —
*Catálogo* (passa por revisão), *Operação* (vai ao ar na hora) e *Governança* —
precedidos de uma home **"Hoje"**. O grupo passa a carregar a informação que
hoje mora no parágrafo de aviso, e a tela deixa de explicar por escrito o que a
estrutura pode dizer sozinha.

O trilho herda o **escuro e o vidro** do header do Cases Wizard; a área de
conteúdo continua **Material claro**, conforme `specs/ui-ux/design-system.md`.
A ordem dos grupos é moldada pelo papel de quem entra — quem opera um módulo o
vê primeiro, o resto fica recolhido sob "Consultar", sem nada sumir.

Junto vêm três consequências diretas do mesmo desenho: rota por hash
(`#/aprovacoes/drf_x`), seletor de idioma único e persistente no lugar dos três
`select` independentes de hoje, e inversão da fricção — publicação direta ganha
um passo de confirmação que declara o alcance ("isto vai ao ar agora, para todos
os agentes PT"), enquanto propor segue em um clique.

## Alternatives considered

- **Manter abas e só agrupá-las visualmente** (separadores dentro da mesma
  fila): resolve a leitura, não resolve a escala nem a régua de permissão, e
  continua sem lugar natural para a home "Hoje" — que é o que responde "o que
  está acontecendo no conteúdo agora", pergunta que a tela hoje não responde em
  lugar nenhum.
- **Duas telas separadas** (uma de catálogo, outra de operação): expressa o
  regime da forma mais forte possível, mas duplica header, sessão, permissão e
  fila de aprovação, e obriga quem tem os dois papéis a trocar de aba do
  navegador no meio do trabalho. O ganho de clareza não paga a duplicação.
- **Menu suspenso no header**: economiza espaço lateral, mas esconde a estrutura
  justamente onde ela precisa ser vista, e piora a navegação por teclado.

## Consequences

### Positive
- O regime de publicação vira propriedade da navegação, não de um parágrafo que
  se pode não ler.
- Módulo novo entra num grupo existente sem redesenhar a navegação.
- Cada papel entra numa tela ordenada pelo que ele opera, sem que nada seja
  escondido de quem tem acesso de leitura.
- Uma pendência passa a ter URL, e portanto a caber num chat.

### Negative / Tradeoffs
- É a mudança de maior risco de regressão do plano: toca todos os
  renderizadores de um arquivo de 2.832 linhas que hoje **não tem teste nenhum**.
  Mitigação obrigatória: um smoke Playwright sobre a tela **antes** da mudança
  (nos moldes de `scripts/smoke-broadcast.mjs`), e a quebra do arquivo em
  includes do `HtmlService` como primeiro commit, mecânico e sem mudança de
  comportamento.
- O TL Dashboard (`TLDashboard.html`) fica visualmente divergente até receber o
  mesmo trilho num PR seguinte. A divergência é aceita como temporária e
  datada — não como acidente.
- Trilho lateral custa largura horizontal, que em telas pequenas vira uma folha
  deslizante — mais um estado de UI para manter.

### Neutral
- Nenhuma mudança de backend: `CONTENT_MODULES`, o fluxo
  rascunho → pendente → aprovado → live e `CONTENT_DIRECT_PUBLISH_MODULES`
  continuam exatamente como estão. Esta decisão é sobre como a tela **expressa**
  o modelo que já existe.

## Notes

- Motivada pela revisão de UX de 2026-09-02, que registrou como sintoma o
  desconforto com "opções demais, soltas e juntas".
- A aba "Pessoas" do ADR-0006 é um bom teste do desenho: ela não é catálogo nem
  operação, é **governança** — mesmo grupo de Acessos —, e num trilho por regime
  ela tem lugar óbvio, que na fila plana de hoje não tem.
- O piso de acessibilidade de `specs/ui-ux/design-system.md` vale como critério
  de aceite: `aria-current` no trilho, navegação por setas, foco visível.
- Depende de ADR-0008 para o cache; independe de ADR-0009 (RBAC), que só precisa
  da casca pronta para a matriz caber na tela.
