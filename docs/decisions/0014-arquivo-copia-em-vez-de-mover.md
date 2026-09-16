# 0014 — O backup semanal copia em vez de mover

**Date**: 2026-09-16
**Status**: Accepted — implementado em 2026-09-16

## Context

`runWeeklyBackup()` nasceu movendo: toda segunda-feira de madrugada ele copiava
para `Archive_BAU` (outra planilha) todo caso `CREATED` ou `DISCARDED` e
**deletava a linha** da planilha de casos. A intenção era manter a planilha
quente pequena.

O preço apareceu longe, o que é o pior lugar para um preço aparecer — uma
segunda-feira depois de quem mexeu no código ter saído da frente do problema:

- **O histórico do TL só alcança a última segunda-feira.** A aba "Histórico" do
  TL Dashboard (`getWeeklyHistory`) lê a planilha de casos. O seletor de 7/30/90
  dias (#397) é honesto sobre o teto, mas o teto é o backup, não o seletor: em
  90 dias o TL vê, no máximo, os casos resolvidos desde o último domingo.
- **O `Child_Case_ID` evapora.** O ID do caso BAU gerado na aprovação (#396) é
  gravado na linha — e some com ela uma semana depois de ter sido exigido. O
  campo existe justamente para que nenhum caso aprovado fique sem rastro.
- **Uma segunda leitura do arquivo seria cara.** O plano para o histórico
  profundo era ler `Archive_BAU` (#397, segunda camada), o que soma uma planilha
  inteira por chamada num dashboard que já travou ao vivo (#333/#334).

O que destravou a decisão foi uma medida real: a planilha que a operação mantém
desde 2024, com todos os casos enviados até março de 2026, tem pouco mais de
5.000 linhas. O volume não justifica podar nada.

## Decision

O job **copia e não move**: a linha arquivada continua na planilha de casos. Não
há reset, nem poda, nem janela de retenção.

A idempotência vem dos **IDs que já estão no arquivo**, lidos da coluna A de
`Archive_BAU` a cada execução, e não de uma marca deixada na origem.

## Alternatives considered

- **Reset trimestral, com a data no código** (a primeira forma da ideia):
  rejeitado por dois motivos. O histórico ficaria em dente de serra — em 2 de
  janeiro o TL abre "últimos 90 dias" e vê dois casos; em 30 de março vê tudo —,
  que é o mesmo problema mudando de lugar. E uma data fixa num gatilho semanal é
  frágil: se a semana do dia 1º falhar, o reset não acontece; se a comparação for
  por data e não por estado, acontece duas vezes.
- **Retenção deslizante (apagar o arquivado com mais de 90 dias)**: daria
  profundidade constante ao histórico com o mesmo código, e era a contraproposta.
  Rejeitada pela medida acima: com ~5.000 linhas em dois anos, qualquer poda é
  complexidade paga por um problema que não existe.
- **Marcar a linha de origem com `Archived_At`** em vez de conferir o arquivo:
  rejeitado. Uma execução que morre no meio (timeout, quota) deixaria linha
  marcada como arquivada sem estar, e o erro seria silencioso e permanente.
  Conferir o arquivo faz a execução seguinte se consertar sozinha.

## Consequences

### Positive
- O histórico do TL passa a alcançar tudo que a planilha tem — o seletor de 90
  dias finalmente entrega 90 dias.
- O `Child_Case_ID` sobrevive à aprovação.
- A segunda camada do #397 (ler `Archive_BAU` pelo dashboard) deixa de ser
  necessária, e com ela some a chamada cara que ela exigiria.
- O arquivo vira o que sempre deveria ter sido: uma cópia de segurança fora da
  planilha de trabalho, não o único lugar onde o dado existe.

### Negative / Tradeoffs
- A planilha de casos cresce sem teto. As três leituras do dashboard
  (`getPendingBAUCases`, `getRecentActivity`, `getWeeklyHistory`) fazem
  `getDataRange().getValues()` da planilha inteira, e a primeira roda a cada 60s
  por TL com o painel aberto. Em ~5.000 linhas isso é tolerável; não é para
  sempre. Quando incomodar, o caminho é limitar a leitura por janela de linhas
  (as linhas estão em ordem de append, que é cronológica) ou cachear — e não
  voltar a deletar.
- A PII do anunciante (telefone, e-mail) passa a ficar indefinidamente na
  planilha quente, e não só sete dias. Já ficava para sempre no arquivo, então a
  mudança é de exposição, não de retenção.

### Neutral
- O gatilho e o horário não mudam (segunda-feira, ~03h). Nenhuma ação manual é
  necessária para adotar a mudança.

## Notes

- `gas-backend/Backup.js`, coberto por `npm run test:backup`.
- Durante a implementação apareceu um defeito latente da versão antiga: ela
  escrevia no arquivo um bloco com a largura da planilha de casos, sem conferir
  se a aba de destino comporta essa largura. Como a planilha de casos ganhou as
  colunas 22 a 24 depois que o arquivo foi criado, uma aba de arquivo mais
  estreita derruba a execução inteira — toda semana, em silêncio, num gatilho que
  ninguém olha. O job agora alarga o arquivo antes de escrever.
