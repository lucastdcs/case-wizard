# 0014 — As tasks do form BAU vêm do mesmo catálogo da Central

**Date**: 2026-09-22
**Status**: Accepted

## Context

O ADR-0012 tirou o catálogo de tasks do bundle e o colocou na Central de
Conteúdo (módulo `task_screenshots`). O que ele migrou foi o consumidor que
motivou a migração: o seletor de tasks do Case Notes, que precisa da task **e**
da lista de screenshots do Win Criteria.

O formulário BAU também pede tasks — é a coluna `Task_BAU` (15) da planilha, o
que o TL lê para decidir a abertura. Mas ele nunca leu o catálogo: tinha uma
lista de 17 nomes escrita à mão no `bau-form-config.js`, desde antes da Central
existir.

As duas listas divergiram, e em silêncio, porque nada as compara:

- **5 tasks só existem no form**: Analytics Enhanced E-Commerce Tracking,
  Analytics Health Check, Fix GA4 implementation, Consent Mode, Customer Match.
- **1 task só existe na Central**: UPD for GA4 (User-Provided Data) — publicada
  para o Case Notes, nunca oferecida na escalação.
- **8 são a mesma task com nome diferente**: "Google Tag Manager Installation"
  contra "GTM Installation", "Analytics Setup" contra "Analytics Set Up (GA4)",
  e assim por diante.

O efeito não é uma tela quebrada: é a coluna `Task_BAU` guardando um vocabulário
que o resto do sistema não reconhece, e um SME publicando uma task nova sem que
ela apareça onde o BAU é pedido.

## Decision

O form BAU passa a montar a grade de tasks a partir do **mesmo `TASKS_DB`** que
a Central reescreve no boot (`notes/data/tasks-service.js`), consumindo **apenas
o nome** — o form não pede evidência nenhuma, quem usa a lista de screenshots é
a nota. A lista escrita à mão sai do `bau-form-config.js`.

Consequência aceita explicitamente: as 5 tasks que só existiam no form **somem**
da grade. Quem quiser qualquer uma delas de volta a cria pela tela da Central,
que é o caminho que o módulo de Tasks já tem (ADR-0012).

## Alternatives considered

- **Semear as 5 órfãs na Central, com lista de evidências vazia**: preservaria a
  lista de hoje, mas elas passariam a aparecer *também* no seletor de tasks da
  nota, pedindo zero evidência — um Win Criteria vazio no meio de um
  atendimento. A lista do form não é razão suficiente para poluir o catálogo que
  a nota usa.
- **Um módulo `bau_tasks` separado na Central**: dois catálogos gerenciáveis
  para o mesmo conceito. Traz de volta, com mais passos, exatamente a divergência
  que este ADR fecha.
- **Um mapa de equivalência nome antigo → nome novo no código**: uniformizaria a
  planilha, mas seria uma terceira fonte da verdade escondida no bundle —
  justamente o que o ADR-0012 tirou do caminho com o `SCREENSHOT_LABEL_ES`.

## Consequences

### Positive
- Uma task publicada pelo SME aparece nos dois lugares em que o agente escolhe
  tasks, sem deploy.
- O vocabulário da coluna `Task_BAU` passa a ser o mesmo do Case Notes — o que
  torna possível, mais adiante, cruzar o que foi escalado com o que foi
  implementado.
- O `bau-form-config.js` deixa de carregar conteúdo de negócio que envelhece.

### Negative / Tradeoffs
- A grade do form encolhe de 17 para 13 opções no dia do deploy. Se alguma das 5
  ainda for usada de verdade, o agente descobre na hora do atendimento — a
  correção é criar a task na Central, que é minutos, mas não é instantânea.
- O form fica dependente de um módulo de outro domínio (`notes/data/`). É o mesmo
  acoplamento que o `shared/shortcut-service.js` já tem com `notes-data.js`, e
  que se paga com uma fonte única em vez de duas.

### Neutral
- Casos BAU pendentes gravados com os nomes antigos continuam na planilha por até
  uma semana (o backup os arquiva). Ao abrir um desses para editar, a task cujo
  nome saiu do catálogo **volta para a grade, já marcada**, e é reenviada como
  está: deixá-la cair fora apagaria em silêncio uma task que o TL já leu no caso.
  Mesma regra que o seletor da nota já aplica (`step-tasks.js`).

## Notes

- `docs/decisions/0012-tasks-e-screenshots-na-central.md` — a migração que criou
  o módulo `task_screenshots`.
- Provas: `npm run test:tasks` (a grade segue o catálogo publicado, só nomes, sem
  nome vazio nem repetido) e `npm run smoke:bau-tasks` (a grade no navegador:
  nasce do cache, absorve a publicação que chega no meio do preenchimento sem
  desmarcar nada, e devolve a task fora de catálogo ao editar um caso antigo).
