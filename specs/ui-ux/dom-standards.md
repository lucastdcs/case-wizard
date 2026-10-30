# 🖥️ DOM STANDARDS & INTERAÇÕES

## Proibições de UX
- **Sem Pop-ups Nativos:** NUNCA utilize `window.alert()`, `window.confirm()` ou `window.prompt()`. Utilize exclusivamente o sistema de modais customizados do projeto (com backdrop blur).

## Loading e Anti-Flicker
- **Regra do Feedback Visual:** Toda chamada à API (`jsonpFetch`) deve ser acompanhada de um estado visual de loading.
- **Transição de Edição:** Ao clicar em "Editar", aplique uma "cortina de loading" (overlay) bloqueante sobre o formulário. O loading só deve ser removido quando o DOM estiver 100% populado com os dados antigos, evitando que o usuário veja as telas "piscando" ou transicionando de forma abrupta.
- **TL Dashboard:** Ao aprovar/rejeitar um caso, exiba um skeleton/spinner enquanto o Dashboard faz o fetch (re-render) da nova fila.

## Controle de Overlays
- **Scroll Lock:** Sempre que um Overlay ou Modal for aberto no topo da página, aplique `overflow: hidden` na tag `<body>` (ou elemento ancestral) para evitar "scroll duplo" com a página de fundo. O container do overlay deve gerenciar o seu próprio `overflow-y: auto`.
- **Teclado e foco:** overlay modal prende o Tab (o foco nunca chega aos campos da página por trás), o Esc fecha **só ele** (`stopPropagation` — o Esc global de `animations.js` fecha a janela de módulo aberta) e, ao desistir por Esc ou clique no fundo, o foco volta a quem o tinha. Clicar dentro do overlay não pode tirar o foco do campo (`mousedown` sem ação padrão fora dele).
- **O fade engole o clique:** o overlay só deixa de receber ponteiro quando sai do DOM, senão o 2º clique de um duplo clique cai na página por baixo. O timer de remoção é guardado e cancelado se o overlay reabrir antes dele disparar; ações disparadas por ele tratam reentrada (os módulos alternam: duas chamadas se desfazem).
- **Ceder a vez:** um overlay que não é wizard/diálogo não abre por cima de `.cw-dialog-overlay`, `.cw-wiz-overlay`, `.cw-ob-lang-overlay` nem `.cw-processing-card` (a pílula já não é clicável com o card no ar). O Ctrl+K segue essa regra.
- **Seleção por hover não reconstrói a lista:** troca-se a classe do item, e só com movimento real do mouse (compare a posição; `mouseenter` também dispara quando o conteúdo rola sob um cursor parado).
