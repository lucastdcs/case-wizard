# 0015 — A vista de caso separa o que se lê do que se copia

**Date**: 2026-09-16
**Status**: Accepted — implementado em 2026-09-16

## Context

O modal de detalhes do TL Dashboard era uma grade de 16 caixas idênticas em
640px: cada campo com borda, fundo próprio e botão de copiar. Não havia
hierarquia nenhuma — "O que deve ser feito", que **é** a decisão que o TL está
prestes a tomar, tinha exatamente o mesmo peso visual de "Programa de Vendas".

Isso contraria a regra de conteúdo do próprio `specs/ui-ux/design-system.md`:
*"caixa dentro de caixa: um contêiner por unidade de informação, com a hierarquia
interna feita por tipografia e espaço"*. E a largura cobrava o resto: a 640px,
duas colunas dão ~280px por célula, onde `America/Sao_Paulo` quebra em duas
linhas disputando espaço com o ícone de copiar.

O botão de copiar em campos como justificativa e agendamento também era promessa
falsa: ninguém cola isso em lugar nenhum. O que vai para o CRM é o resumo
(ADR anterior, na mesma entrega) e os identificadores.

## Decision

A vista de caso passa a ter **três zonas, separadas por propósito**:

1. **Cabeçalho — de quem é o caso.** Anunciante como título, selos de fluxo e de
   sugestão de descarte, link do caso e autoria (quem enviou e quando). O agente
   deixa de ser um campo copiável: é autoria, não dado.
2. **Briefing — por que o caso está sendo aberto.** Um contêiner único, sem
   caixas dentro, com *o que deve ser feito*, *motivo da não implementação*,
   *justificativa* e *agendamento*. **Leitura, sem botão de copiar.**
3. **Dados — o que o TL leva para o CRM.** Lista de definição com hairline, botão
   de copiar aparecendo no hover/foco, e o resumo fechando o bloco.

Largura de 640px → 900px. As ações de decisão ganham um rodapé fixo dentro da
própria vista, chamando o mesmo `confirmAction()` da fila — o modal de
confirmação continua sendo a fronteira, então nenhuma aprovação vira um clique só.

## Alternatives considered

- **Drawer lateral direito** (padrão de CRM: Linear, Zendesk): manteria a fila
  visível ao lado. Rejeitado pelo fluxo real deste painel — o TL decide e segue,
  não compara casos entre si —, e custaria reescrever overlay, animação e foco.
- **Modal em tela cheia**: rejeitado, sobra espaço vazio com esta quantidade de
  campos e some o contexto da fila por completo.
- **Manter as ações só na fila**: rejeitado. O vai-e-volta (abrir, ler, fechar,
  reachar a linha, aprovar) custa uma busca visual por caso, todo caso.

## Consequences

### Positive
- O TL lê a decisão primeiro e os identificadores depois, que é a ordem em que
  ele trabalha.
- O botão de copiar volta a significar uma coisa só: "isto vai para o CRM".
- Uma decisão a menos de navegação por caso revisado.
- A fila virou alcançável pelo teclado (ver abaixo), o que ela nunca foi.

### Negative / Tradeoffs
- Os 900px pedem tela larga. Abaixo de 720px o grid de dados cai para uma coluna
  e o cabeçalho empilha — funciona, mas fica longo.
- O briefing não é mais copiável. Se algum TL dependia de copiar a justificativa
  crua, perde isso — o resumo cobre o caso de uso real, que é levar o contexto
  para o caso filho.

### Neutral
- `confirmAction()`, `processAction()` e o modal de confirmação não mudaram.

## Notes

- Implementado em `gas-backend/TLDashboard.html`, coberto por
  `npm run smoke:tl-dash`.
- **Achado de acessibilidade durante a implementação:** as linhas da fila eram
  `<div>` com `onclick`, o que o `design-system.md` proíbe explicitamente
  (*"nunca `div` com `onclick`, que o teclado não alcança"*). Na prática, o TL não
  conseguia abrir um caso sem mouse. O nome do anunciante virou um `<button>` de
  verdade — o mouse continua clicando a linha inteira, e o foco volta para esse
  botão quando o modal fecha. Entraram junto: `Esc` fecha, e o foco entra no
  modal ao abrir (com `aria-modal` o leitor de tela já ignorava o resto da
  página, mas o Tab do teclado não).
