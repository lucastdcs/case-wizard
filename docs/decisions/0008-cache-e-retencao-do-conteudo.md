# 0008 — Cache da leitura pública e retenção das abas de conteúdo

**Date**: 2026-09-02
**Status**: Proposed

## Context

`handleContentPublicRead()` é a única porta de leitura do app do agente. Ela
chama `readContentRows_(SHEET_CONTENT_ITEMS)`, que faz
`getDataRange().getValues()` da aba **inteira** — todas as versões, `live` e
`archived` — e só então filtra pelo módulo pedido. Não existe
`CacheService` em nenhum ponto do módulo.

Do lado do cliente, `DataService.fetchContentModule()` é *network-first*: busca
sempre, e só cai no `localStorage` quando a chamada falha. O app pede sete
módulos por sessão (`tips`, `broadcast`, `bau_availability` no boot; os demais
ao abrir cada módulo). Cem agentes entrando no turno são da ordem de 700
execuções numa janela curta, contra o teto de 30 execuções simultâneas do Apps
Script. O modo de falha não é a Central ficar lenta: é o app do agente degradar
em silêncio para o cache e servir conteúdo velho sem dizer.

Sobre volume, três abas com perfis completamente diferentes foram medidas:

| Aba | Cresce por | ~3 meses | Lida no caminho quente |
|---|---|---|---|
| `Content_Items` | versão publicada | depende da edição | **sim, toda leitura** |
| `Content_Log` (nova, ADR de histórico) | ação de conteúdo | ~1.800 linhas | não — só a aba de auditoria |
| `Logs` | sessão de agente (1 linha por sessão) | ~6.000 linhas | não |

O teto de uma planilha Google é de 10 milhões de células: três meses de
`Content_Log` são cerca de 0,02% disso. O risco real nunca foi armazenamento —
é a varredura de `Content_Items` no caminho quente.

## Decision

**Cache.** `CacheService.getScriptCache()` na leitura pública, com chave por
módulo e TTL de 5 minutos, **invalidado explicitamente** em toda escrita que
muda o que está no ar (`approveContentDraft`, `publishContentDirect`,
`unpublishContentDirect`, `rollbackContentItem`, `seedContentModule`). O boot do
agente ganha um parâmetro `modules=a,b,c` para virar uma chamada em vez de sete,
e uma rota de manifesto (módulo → versão) que permite ao cliente pular a busca
quando seu `localStorage` já está em dia.

**Retenção**, por aba, com regra própria para cada perfil:

- `Content_Items` — **por linhagem, nunca por data**: a versão `live` mais as N
  anteriores permanecem; o excedente vai para a planilha fria. Um link editado
  20 vezes numa semana são 20 linhas; um link parado há dois anos é uma linha
  só — cortar por idade preservaria exatamente o caso barato e apagaria o caro.
- `Content_Log` — **24 meses** na aba principal, com arquivamento disparado por
  limiar de linhas.
- `Logs` — arquivamento trimestral, como o `Backup.js` já faz com
  `BAU_Form_Data`.

O arquivamento reaproveita o mecanismo do `Backup.js` (planilha fria + limpeza
da principal) com duas correções: bloco contíguo via `deleteRows(start, count)`
em vez de `deleteRow` por linha dentro de um `forEach`, e **modo de simulação**
como primeiro estado — a execução inicial só relata quantas linhas moveria.

## Alternatives considered

- **Só cachear, sem retenção**: o cache esconde o crescimento até o dia em que
  a varredura passa a estourar o tempo de execução no *cache miss* — e o miss
  acontece justamente no pico, quando o TTL expira com todo mundo entrando.
- **Só retenção, sem cache**: reduz o tamanho da varredura mas não o **número**
  de execuções, que é o que esbarra no teto de simultaneidade.
- **Retenção por data em `Content_Items`** (a intuição inicial, e o que o
  `Backup.js` faz para casos BAU): rejeitada porque a idade da linha não tem
  relação com o custo que ela impõe, e porque apagaria as versões arquivadas
  para as quais o "voltar para esta versão" aponta.
- **`CacheService` com TTL longo (1h) sem invalidação explícita**: mais simples,
  mas faz o conteúdo aprovado demorar até uma hora para chegar ao agente —
  destrói o motivo de a Central existir.
- **Migrar de Sheets para outro armazenamento**: fora de escopo; o volume não
  justifica, e o Sheets é o que a operação sabe abrir e auditar à mão.

## Consequences

### Positive
- O pico de início de turno passa a ser servido pelo cache, não por N
  varreduras da planilha.
- O custo de leitura deixa de crescer com o histórico de edições.
- O histórico de auditoria de 24 meses sobrevive ao arquivamento, em vez de ser
  esvaziado junto com o resto.

### Negative / Tradeoffs
- Conteúdo aprovado pode levar até 5 minutos para aparecer para quem já estava
  com a sessão aberta, quando a invalidação falhar. É o preço aceito; a
  invalidação explícita cobre o caminho normal.
- **Invalidação vira assunto de segurança quando o ADR-0009 entrar**: com papel
  vindo da planilha, cachear permissão significa que revogar acesso só vale
  depois do TTL. Por isso a chave de permissão é invalidada na hora, e não
  apenas expirada — é a única entrada deste ADR onde atraso não é aceitável.
- Um job destrutivo agendado por gatilho de tempo passa a existir. Como dev e
  produção compartilham a mesma planilha, ele roda igual nas duas: daí o modo
  de simulação obrigatório antes do primeiro corte real.

### Neutral
- O `localStorage` do cliente continua sendo o fallback offline; o manifesto só
  evita a busca redundante, não substitui o cache local.

## Notes

- Números medidos em 2026-09-02 sobre `refactor-structure`: ~200 itens semeados
  (60 links, 71 passos de call script, 52 modelos de nota, 16 e-mails); a aba
  `Logs` tem apenas dois escritores (`op=log`, disparado uma vez por sessão em
  `src/app.js`, e `logContentEvent_`).
- `gas-backend/Backup.js` é o precedente de rotação, inclusive a nota sobre o
  gatilho precisar ser criado manualmente uma vez pelo editor.
- Pré-requisito do ADR-0009 (o cache precisa existir para poder ser invalidado).
