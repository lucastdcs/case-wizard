# 0018 — Home do módulo de Links: destaques com janela, prévia no link e categorias criadas pela Central

**Date**: 2026-10-23
**Status**: Accepted

## Context

O módulo de Links guarda os formulários e planilhas que o agente preenche, e já
poupa a busca por URL. Mas o agente ainda precisa **procurar pelo nome** dentro
dele, e a Central só conseguia dizer "este link existe", nunca "este é o que
importa agora". Três pedidos juntos:

1. uma **home** dentro do módulo, com o que está em destaque, por quanto tempo e
   com uma prévia que não seja uma linha genérica — gerida pela Central;
2. sob os destaques, o que **acabou de sair** de destaque, o que a pessoa abriu
   por último e os favoritos, convivendo com a biblioteca pesquisável;
3. uma categoria nova (**Feedback**) para os formulários de feedback e, em geral,
   a possibilidade de a Central **criar categorias** que o app não conhece.

Restrições herdadas: leitura pública é JSONP e cacheada por 300 s
(`readLiveItemsCached_`, ADR-0008); toda escrita passa por `google.script.run`
com papel verificado no servidor (ADR-0009); módulo novo herda o preset
(ADR-0013); a UI do agente é vanilla JS construída no DOM, sem framework.

## Decision

**Dois módulos novos de conteúdo, em vez de campos extras no link:**

- `link_categories` — regime de catálogo (fila de aprovação). Valor
  `{ label, label_es, label_en, color, icon }`. Cor e ícone vêm de **listas fechadas** (12 cores, 20
  ícones), iguais no servidor (`CONTENT_LINK_CATEGORY_COLORS/ICONS`), no pacote
  (`links-model.js`) e na Central (`LINK_CAT_COLORS/ICONS`); o `test:links`
  trava a igualdade. A chave (`^[a-z][a-z0-9_]{1,23}$`) fica travada depois de
  publicada, porque cada link a guarda. Nome de até 12 letras por idioma — o que
  cabe no trilho do agente. A categoria só sai do ar sem link dentro.
- `link_highlights` — regime de **publicação direta**, com confirmação do
  alcance (como `broadcast`). Valor
  `{ linkLineage, headline, blurb, position, startsAt, endsAt }` (título e resumo
  também em `_es` e `_en`).

**A prévia mora no link**, não no destaque: `about` (≤ 200) e `when` (≤ 160) ×
PT/ES/EN. Assim o painel de prévia funciona para a biblioteca inteira, e o
destaque só decide *quando* e *com que manchete* aquele link aparece na home.

**A janela é decidida no servidor.** O destaque é uma linha `live` durante toda a
vida; `state` (`scheduled | active | ended | expired`) é calculado **a cada
leitura**, depois do cache, no fuso da planilha, comparando `YYYY-MM-DDTHH:MM`
como texto (`janelaAgora_`). Agendado e vencido há mais de 30 dias não saem na
resposta; encerrado até 30 dias sai, e alimenta "Saíram do destaque". O cliente
nunca compara datas com o relógio dele.

**Capacidade: no máximo 3 destaques simultâneos em qualquer instante futuro**
(varredura nos inícios de janela, a partir de agora; o passado não conta; a
edição exclui a si mesma). `checkLinkHighlight` valida **antes** do passo de
confirmação da Central, para a pessoa não confirmar o que o servidor vai
recusar. `endLinkHighlight` republica com `endsAt` = agora (ou tira do ar se
começou neste minuto).

**Identidade do link = `Lineage`.** Favoritos, recentes e destaques guardam o ID
estável (`itm_<uuid>`), não cópia de nome ou URL; link do pacote embutido (o
fallback) usa `u:<url>`. Favoritos (máx. 30, recusa o 31º, nunca expulsa) e
recentes (máx. 10) vão para `User_Prefs` (`links_fav`, `links_recent`) com escrita
adiada de 4 s e descarga no `pagehide`. O fallback embutido **nunca poda**
favoritos: sem a Central, ele não sabe quais links existem.

**Categoria Feedback** nasce como categoria do sistema (rosa, ícone `feedback`),
entre as embutidas, e `migrateFeedbackLinksNow()` move para ela os links
existentes de feedback (hoje só "Elogios"), de forma idempotente e versionada,
mantendo a `Lineage`.

**Janela do agente: 860 px com painel de prévia fixo** (mestre-detalhe: passar o
mouse ou focar um link mostra a prévia ao lado; nunca fica vazio, exceto numa
busca sem resultado). Abaixo de 1000 px o painel some e a lista fica sozinha.

## Alternatives considered

- **Destaque como campo do link** (`Field = highlight`): rejeitado. O filtro de
  janela do `broadcast` esconde o **item inteiro**; o link sumiria da biblioteca
  quando a janela vencesse. Destaque e link têm ciclos de vida diferentes.
- **Prévia só no destaque**: rejeitado. O pedido era prévia fluida ao passar o
  mouse nos links, não só nos três da home.
- **Cliente decide "agora"**: rejeitado. O relógio do agente erra e o fuso dele
  não é o da operação; a mesma janela precisa valer para todos.
- **Cores e ícones livres (hex, SVG)**: rejeitado. Texto vindo da Central
  chegaria a `style` e a SVG do agente. A lista fechada torna o ícone um dado do
  pacote, não conteúdo de terceiros.
- **Categoria sem módulo próprio** (inferida do `Value` do link): rejeitado.
  Nome, cor, ícone e a regra "só sai sem link dentro" precisam de um lugar para
  existir antes do primeiro link.
- **Semear Feedback só pelo seed** (`seedContentModule`): rejeitado. O seed só
  age em módulo vazio ("semear não é sincronizar"); produção precisa de migração.

## Consequences

### Positive
- O agente abre o módulo e vê o que importa agora, com prévia; a busca por nome
  passa a ser a exceção.
- A operação cria categoria e destaque sem deploy, com fila e papel onde já
  havia, e `Content_Log` registra tudo (`link_move`, `highlight_end`).
- A regra de janela e de capacidade tem um único dono (o servidor), testável.

### Negative / Tradeoffs
- **Ordem de deploy importa.** Um pacote antigo quebra ao renderizar um link
  cuja categoria não tem tema (`CAT_THEMES[key].color`). Rodar
  `migrateFeedbackLinksNow()` ou publicar link em categoria nova **só depois**
  do frontend novo no ar; abas do CRM abertas precisam recarregar.
- Dois módulos novos aumentam a matriz de papéis (ADR-0013 mitiga: herdam o
  preset; WFM propõe `link_categories` e não publica destaque).
- Os textos novos dos editores de Links na Central estão só em português; a
  tradução do catálogo é a fase 2 do ADR-0017.
- Abaixo de 1000 px de largura o painel de prévia some.
- O destaque mostra "até dd/mm" em vez de "· 2 dias": o relativo exigiria o
  relógio do fuso da planilha no cliente.

### Neutral
- A ordem das categorias é **declarada** (embutidas na ordem do produto, criadas
  na ordem de publicação), não derivada de `Sort_Order`.
- O seed (`ContentSeed_Links.js`) segue sendo gerado de `LINKS_DB`
  (`npm run seed:links`); Elogios saiu de `qa` para `feedback`.

## Notes

- Testes: `npm run test:links` (modelo + paridade pacote↔servidor↔Central),
  `test:content` (+36), `smoke:links` (28), `smoke:content` (+28).
- Relacionado: ADR-0007 (Central por regime), ADR-0008 (cache), ADR-0009 (RBAC),
  ADR-0010 (fuso), ADR-0012 (padrão de módulo novo), ADR-0013 (preset),
  ADR-0017 (idioma da Central).
