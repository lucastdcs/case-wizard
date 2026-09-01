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
- [ ] **Publicar a tag `v6.1.0`** — passo 4 do `RELEASE.md`. Produção já está no
      ar; a tag só publica as notas do GitHub Release (o `release.yml` não faz
      deploy). Não subiu da sessão que fez o merge porque o proxy de lá bloqueia
      escrita de tag, tanto no push quanto na API:
      `git tag -a v6.1.0 dbc6eb5 -m "v6.1.0" && git push origin v6.1.0`
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
