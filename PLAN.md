<!-- generated-by: groundrules v1.10.0 -->
# PLAN — Case Wizard

**Active** plan/todo for the project. Maintained by Claude during work.

This file differs from the long-term roadmap: it describes what is happening **now**.

## In progress

- [ ] (add the first active tasks here)

## Up next

- [ ] ...

## Ideas — to triage

Raw ideas, captured before they're lost (e.g. via `/groundrules:idea`). Not yet vetted. Each gets triaged later → a **decision** (ADR), a **build** (PRD), a **milestone** (ROADMAP), or dropped.

- [ ] ...

## Waiting / blocked

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
