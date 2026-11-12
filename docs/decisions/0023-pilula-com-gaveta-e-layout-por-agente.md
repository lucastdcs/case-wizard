# 0023 — Pílula com gaveta: fixados na ordem do agente, o resto atrás do botão Mais

**Date**: 2026-11-05
**Status**: Proposed

## Context

A pílula flutuante (`command-center.js`) é uma coluna vertical, e cada módulo novo
soma ~54px a ela. Medido com `mock-crm.html` no Chromium:

| botões | altura aberta | viewport 650px (notebook 1366×768) |
|---|---|---|
| 10 (antes) | **641px** | topo em **−56px**: o punho de arrastar e o selo Dev ficam fora da tela |
| 7 fixados + Mais (agora) | **533px** | topo em 52px, cabe |

Como ela era construída: dez `<button>` escritos à mão no HTML, mais **três listas
paralelas** que precisavam andar juntas (CSS de cor por módulo, `onclick` por módulo
e os atrasos da cascata de abrir/fechar por `:nth-child(5..15)` com índices fixos).
Reordenar ou esconder um ícone quebrava a cascata sem erro — e ela já errava em
desenvolvimento, onde o selo "Dev" é um filho a mais e empurra todos os índices em 1.

Quem procura o botão de um módulo **por id** (`#cw-btn-<módulo>`): `animations.js`
(de onde o genie da janela nasce e para onde volta), o Avisos (badge de não lidos),
`updateNotesBadge` (ponto de rascunho), o BAU Form (`cw-btn-timezone.click()`) e os
smokes. E o Ctrl+K já lista todos os módulos — a pílula é o atalho de mouse.

Pedido do Lucas: o agente organizar os ícones em Configurações, nem todos precisarem
estar na pílula, e uma gaveta para guardar alguns (ou outra abordagem).

## Decision

1. **Pílula = N módulos fixados (≤ 7) na ordem do agente + um botão "Mais"** (grade
   3×3) que abre uma **gaveta** com os demais, ícone **e nome** (num lugar com vários
   ícones o nome é o que desambigua).
2. **Teto de 7 fixados**, constante `MAX_PINNED`: 7 + Mais = 533px é o maior que ainda
   cabe em 650px. É deliberado (mesmo precedente do `MAX_SHORTCUTS`): sem teto o
   agente refaz o problema que a gaveta resolve. `test:pill-layout` trava que o
   catálogo é maior que o teto, para a gaveta nunca ficar vazia.
3. **O layout é preferência do agente**, em `UserPrefsService` (chave `pillLayout`,
   `{ pinned, drawer }`) — cache local na hora, nuvem em segundo plano, como os atalhos
   do Ctrl+K (ADR-0002). Padrão: os sete de sempre fixados; Biblioteca, Fusos e
   Configurações na gaveta. "Restaurar padrão" grava `null` (e não uma cópia), para o
   padrão continuar sendo o do código.
4. **Tolerância a dado estranho** (`resolveLayout`): id desconhecido ou repetido cai;
   excesso do teto desce ao começo da gaveta; blob inválido vale o padrão; **módulo
   lançado depois do layout salvo entra no fim da gaveta**, nunca na pílula — ninguém
   tem a pílula remexida por uma release.
5. **Cada botão nasce uma vez e só muda de lugar** (pílula ↔ gaveta). O estado que ele
   carrega (`.active`, ponto de rascunho, badge de avisos, `onclick`) viaja junto e o
   id continua único: `animations.js`, Avisos e BAU Form seguem funcionando sem mudança.
6. **A gaveta é um elemento irmão da pílula**, não filho (lição do
   `.cw-processing-card`: abrir algo *dentro* da pílula briga com o CSS dela, e o
   `backdrop-filter` aninhado não borra o que está atrás). Fecha por clique fora, Esc
   (só ela — o Esc não fecha o módulo aberto junto), escolha de módulo, recolher a
   pílula, arrastar e resize. Mouse nela segura o auto-fechamento da pílula.
7. **"Mais" espelha o que acontece lá dentro**: `.active` quando um módulo guardado
   está aberto (e isso impede a pílula de recolher por baixo dele) e um ponto quando
   há aviso pendente (`.cw-badge`, `.cw-dot-dirty`). Um `MutationObserver` na gaveta
   faz isso sem tocar em `broadcast-assistant` nem em `updateNotesBadge`.
8. **O genie de um módulo guardado sai e volta pelo "Mais"** (`getAnchorPoint`): o botão
   dentro de uma gaveta fechada continua com retângulo real, mas de algo que ninguém
   vê.
9. **Cascata por índice** (`--cw-i` por item, `--cw-n` na pílula, gravados por
   `applyLayout()`), no lugar de `:nth-child`. A ordem passa a ser dado.
10. **`PillLayoutService.move()` é síncrono**: devolve `{ ok, saved }` com a pílula e a
    tela já repintadas; só `saved` (a nuvem) é assíncrono. Esperar o JSONP para
    repintar, focar ou tocar o som atrasava o gesto em segundos.
11. **Configurações → "Pílula e Gaveta"**: duas listas (na pílula `n/7`, na gaveta),
    arrastar pelo punho, setas no teclado, botão de mover (bloqueado com o teto à
    vista) e "Restaurar padrão" com confirmação. Tudo continua no Ctrl+K.
12. **Os nomes são os do Ctrl+K** (um módulo, um nome). Efeito colateral bom: as dicas da
    pílula passam a seguir o idioma da interface — "Configurações" e "Avisos" eram texto
    fixo em português com a ferramenta em ES/EN.

## Alternatives considered

- **Só esconder, sem gaveta** (o Ctrl+K cobre o resto): é a opção mais barata, mas
  Ctrl+K é teclado e a pílula é mouse; o agente que escondesse um módulo perderia o
  único caminho de um clique e o aviso dele ficaria mudo.
- **"Mais" abre o Ctrl+K**: zero UI nova, mas é um modal com fundo escurecido e busca
  para algo que deveria ser um clique, e mistura os atalhos de nota na lista.
- **Ordenar a pílula por uso**, como os atalhos do Ctrl+K: lá funciona porque se *lê* a
  lista; ícones que se mexem sozinhos destroem a memória muscular de um dock.
- **Pílula horizontal ou em duas colunas**: muda toda a geometria (drag, `side-left/right`,
  dicas, genie) para um problema que se resolve tirando botões.
- **Gaveta como filha da pílula**: ver decisão 6.

## Consequences

### Positive
- A pílula aberta cabe em viewport de notebook (641 → 533px); módulo novo passa a custar
  0px nela (vai para a gaveta).
- O agente organiza o próprio espaço e o layout o segue entre máquinas.
- A cascata deixa de depender de posição, e módulo guardado não fica mudo nem invisível.

### Negative / Tradeoffs
- **Todo agente vê Biblioteca, Fusos e Configurações um clique mais longe no próximo
  boot** (o padrão novo vale para quem nunca configurou nada, ou seja, para todos).
  Mitigação pendente: nota de versão (`RELEASE_NOTES`) avisando e apontando o Ctrl+K.
- O espelho do "Mais" conhece só `.cw-badge` e `.cw-dot-dirty`: um módulo futuro que
  sinalize por outro mecanismo ficaria mudo dentro da gaveta.
- Os nomes de módulo agora vivem em dois lugares (`pill-layout.js` e a lista do
  `command-palette.js`); unificar é um item de acompanhamento, não desta mudança.
- Mudança colateral necessária: `UserPrefsService.sync()` ficava preso sem e-mail (ver
  `docs/LEARNINGS.md`); sem ela o layout de uma máquina nova nunca chegava.

### Neutral
- Sem mudança de backend: `User_Prefs` aceita qualquer chave e o layout tem ~150 bytes.

## Notes

Decisões do Lucas ainda abertas: (1) a composição padrão da gaveta; (2) o teto de 7;
(3) se quem já usa a pílula deveria ver o aviso antes de o padrão mudar. Código:
`shared/pill-layout.js`, `shared/command-center.js`, `configs/pill-section.js`. Testes:
`npm run test:pill-layout` (modelo) e `npm run smoke:pill-layout` (navegador).
