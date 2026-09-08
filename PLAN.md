<!-- generated-by: groundrules v1.10.0 -->
# PLAN — Case Wizard

**Active** plan/todo for the project. Maintained by Claude during work.

This file differs from the long-term roadmap: it describes what is happening **now**.

## In progress

- [~] **Feedback dos TLs sobre o form BAU + Dash TL (2026-09-08).** Sete pedidos,
      investigados e abertos como #392–#397. A ordem abaixo é de ataque, não de
      pedido: os dois primeiros já saíram, os do meio dependem de decisão,
      e o último é projeto.
      1. [x] **#392 idioma + #393 sobrenome** — entregues juntos (mesmo módulo,
         mesma migração de coluna). O idioma tinha DOIS defeitos: rótulo comparado
         com caixa (`Business language` nunca casava) e travessia errada do DOM —
         ver `docs/LEARNINGS.md`. E a abertura de caso não tinha campo de idioma
         nenhum, então o `N/A` da raspagem ia direto pra planilha. Agora vem do
         `profile.defaultLanguage` num `select` editável, como o db-schema já
         mandava. Junto: coluna 23 `Adv_LastName` e `npm run smoke:bau-scraping`,
         o primeiro teste que o módulo BAU já teve.
      2. [x] **#397, primeira camada** — seletor de 7/30/90 dias no histórico do
         TL. O backend já aceitava o parâmetro; só a tela é que pedia 7 fixo, e a
         tela agora diz que o backup semanal é o teto do que ela alcança.
      3. [x] **#394 agendamento (24h + fuso na escolha + fusos dos EUA)** —
         decidido e entregue. Formato aprovado e registrado no **ADR-0010**: grava
         com deslocamento resolvido pela data do agendamento. O `datetime-local`
         saiu (o locale do navegador decide 12h/24h, e não há como forçar); no
         lugar, data + `select` de 24h + fuso. Catálogo único de fusos em
         `shared/timezones.js`, agora com os EUA — Arizona à parte, porque é
         Mountain sem horário de verão.
      4. [x] **#396 ID do caso filho na aprovação** — decidido **obrigatório**, sem
         escape, e gravado em coluna (`Child_Case_ID`) e não em aba à parte.
         Validado nos dois lados. **Fica um fio solto conhecido:** o backup semanal
         apaga a linha, e com ela o ID, uma semana depois da aprovação — quem
         resolve isso é o item 6.
      5. [x] **#395 telefone do anunciante** — autorizado a gravar. Coluna 25
         (`Adv_Phone`), captura com unmask em paralelo com a do e-mail, e a regra
         de PII mascarada foi para `specs/workflow/scraping-rules.md`.
         **Falta confirmar no CRM real:** o mock reproduz o unmask, mas só a
         página de verdade diz qual é a marcação DEPOIS do clique — se a
         heurística por dígitos não achar o número lá, é aqui que se ajusta.
      6. [ ] **#397, segunda camada** — histórico além do que o backup arquivou:
         ler o `Archive_BAU`. Não antes de #333/#334 — o TL Dashboard já travou
         ao vivo, e isso soma uma planilha inteira por chamada.

## Up next

Plano em seis fases da Central de Conteúdo, em ordem de dependência (não de
prioridade). Cada fase é um ou mais PRs contra `refactor-structure`.

**Todas as seis fases fecharam e foram para produção na v6.2.0** (2026-09-08).
O que sobrou delas está em *Waiting / blocked* abaixo: são passos que só rodam
com a planilha de produção na frente.

- [x] **Fase 0 da Central de Conteúdo — decidir antes de codar.** Os três ADRs
      foram escritos, validados e implementados: `0007` (trilho por regime no
      lugar das dez abas), `0008` (cache da leitura pública + retenção por aba) e
      `0009` (matriz RBAC editável, com a correção de rota registrada no próprio
      ADR). A maquete estática do "Hoje" não chegou a ser feita: a validação
      visual acabou acontecendo a cada PR, pelas capturas do smoke em navegador
      real — que é a mesma proteção que `docs/LEARNINGS.md` cobrou na paleta, por
      um caminho mais barato. Revisão de UX que originou o plano feita em
      2026-09-02, revalidada contra a `refactor-structure` depois da entrada da
      aba Pessoas.
- [x] **Fase 1 — correção e carga** — entregue e em produção na v6.2.0.
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
- [x] **Fase 2 — casca e arquitetura** — entregue em três PRs, em produção na v6.2.0.
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
- [x] **Fase 4 — RBAC editável** (ADR-0009) — completa, em dois PRs.
      **Entregue:** aba `Content_Roles`, matriz módulo × ação, permissões globais
      à parte, papéis atuais como preset (com teste comparando preset contra a
      constante antiga — é a prova de que o dia 1 não muda nada), cache de
      permissão com invalidação imediata, `listContentRoles`/`saveContentRole`, e
      as invariantes como teste no servidor. Viraram **quatro**: a de aprovar
      autorização entrou porque "só o ADMIN" deixou de ser uma regra defensável
      quando o nome do papel virou editável — ver a correção de rota no ADR-0009.
      **Entregue também (2º PR):** a aba "Papéis" — matriz de checkboxes com
      traço onde a ação não existe, aviso de escalação ao vivo, confirmação
      mostrando o que MUDA, recarregamento da sessão ao editar o próprio papel,
      e o `<select>` da aba Acessos lendo `listContentRoleNames()`.
      **Falta validar na planilha real:** que a aba `Content_Roles` nasce
      semeada e que os quatro papéis continuam se comportando igual.
- [x] **Fase 5 — diferenciais e auditoria** — completa, em seis PRs.
      **Entregue:** "ver como" por papel e idioma — a tela inteira passa a
      mostrar o que aquele papel veria, de leitura, com a prévia intersectada no
      servidor (prévia que concede é escalação com outro nome) e dizendo na
      faixa o que deixou de mostrar.
      **Entregue também:** agendamento e validade de aviso — janela avaliada no
      servidor, no fuso da planilha, e filtrada DEPOIS do cache (dentro dele a
      janela teria a precisão do cache em vez da sua própria).
      **Entregue também:** a aba de auditoria restrita — filtro, período,
      paginação por número de linha e exportação para uma aba da planilha
      (arquivo não serve: download iniciado dentro do iframe do Apps Script é
      bloqueado com frequência e sem aviso).
      **Entregue também:** cobrança diária de pendência parada, lendo
      `CW_DEPLOYMENTS` e não a URL do serviço.
      **Entregue também:** busca global Ctrl+K — destino e conteúdo na mesma
      lista, sem acento, filtrada pelo `ver` da matriz, com duas velocidades
      (destino na tecla, conteúdo depois de 220 ms de silêncio) — e a prévia
      "como o agente vê", que resolve o item no idioma escolhido e nomeia o que
      falta em vez de mostrar cartão vazio.
      **Correção logo depois:** metade das ações apareciam na auditoria com o
      nome interno (`role_update`) porque nasceram depois da barra lateral e
      ninguém traduziu. Só apareceu olhando a tela renderizada.

## Ideas — to triage

Raw ideas, captured before they're lost (e.g. via `/groundrules:idea`). Not yet vetted. Each gets triaged later → a **decision** (ADR), a **build** (PRD), a **milestone** (ROADMAP), or dropped.

- [ ] ...

## Waiting / blocked

- [ ] **Criar o gatilho diário de `notifyStaleContentApprovals()`** pelo editor
      do Apps Script (o projeto não cria gatilho por código — mesma nota do
      `Backup.js`). Antes de ligar, rode `listStaleContentApprovals()` e confira
      quem seria cobrado e por quantos itens: é a leitura que existe justamente
      para o primeiro disparo não surpreender ninguém.
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
- [ ] **Publicar as tags `v6.1.0` e `v6.2.0`** — passo 4 do `RELEASE.md`. Nos dois
      casos produção já está no ar; a tag só publica as notas do GitHub Release
      (o `release.yml` não faz deploy). O link `[6.1.0]` do `CHANGELOG.md` aponta
      para uma tag que ainda não existe até isso ser feito.
      `git tag -a v6.1.0 dbc6eb5 -m "v6.1.0" && git push origin v6.1.0`
      `git tag -a v6.2.0 315b13d -m "v6.2.0" && git push origin v6.2.0`
      **Confirmado nesta sessão:** o bloqueio não é do proxy nem novidade — o
      push de tag responde 403 enquanto o push de branch para o MESMO host passa.
      É a credencial do GitHub da sessão que não escreve refs de tag. As duas
      tags precisam sair de uma máquina com credencial normal; nenhuma delas faz
      deploy (o `release.yml` só publica notas).
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
