<!-- generated-by: groundrules v1.10.0 -->
# PLAN — Case Wizard

**Active** plan/todo for the project. Maintained by Claude during work.

This file differs from the long-term roadmap: it describes what is happening **now**.

## In progress

- [~] **Fase 0 da Central de Conteúdo — decidir antes de codar.** Três ADRs
      escritos e aguardando validação: `0007` (trilho por regime no lugar das dez
      abas), `0008` (cache da leitura pública + retenção por aba) e `0009`
      (matriz RBAC editável). Falta a **maquete estática** do "Hoje" + trilho
      para validação visual antes de propagar — `docs/LEARNINGS.md` já cobrou
      esse preço uma vez com a paleta. Revisão de UX que originou o plano feita
      em 2026-09-02, revalidada contra a `refactor-structure` depois da entrada
      da aba Pessoas.

## Up next

Plano em seis fases da Central de Conteúdo, em ordem de dependência (não de
prioridade). Cada fase é um ou mais PRs contra `refactor-structure`.

- [~] **Fase 1 — correção e carga** — entregue, aguardando revisão do PR.
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
- [~] **Fase 2 — casca e arquitetura** — entregue em três PRs, aguardando revisão.
      Smoke Playwright da tela **antes** de qualquer mudança — hoje o
      `ContentDashboard.html` não tem teste nenhum; quebra do arquivo em includes
      do `HtmlService` como primeiro commit, mecânico; trilho escuro/glass com os
      três grupos; home "Hoje" moldada pelo papel; idioma único e persistente no
      lugar dos `select` independentes; rota por hash. **PR irmão:** changelog de
      versão na Central e no TL Dash, a partir de fonte única no repo.
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
- [ ] **Fase 4 — RBAC editável** (ADR-0009). Aba `Content_Roles`, matriz módulo
      × ação, permissões globais à parte, papéis atuais como presets para o dia 1
      não mudar nada. As três invariantes (anti-lockout, escalação declarada,
      revogação imediata) nascem como teste no servidor, não como validação de
      tela.
- [ ] **Fase 5 — diferenciais e auditoria.** Prévia "como o agente vê"; busca
      global Ctrl+K; agendamento e validade de aviso; "ver como" por papel e
      segmento; cobrança diária de pendência parada — esta lendo `CW_DEPLOYMENTS`
      e não a URL do serviço, porque em gatilho de tempo a derivação não é
      confiável (ver `Código.js`). **PR final:** aba de auditoria restrita ao
      ADMIN, com filtros, paginação e exportação.

## Ideas — to triage

Raw ideas, captured before they're lost (e.g. via `/groundrules:idea`). Not yet vetted. Each gets triaged later → a **decision** (ADR), a **build** (PRD), a **milestone** (ROADMAP), or dropped.

- [ ] ...

## Waiting / blocked

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
