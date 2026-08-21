# 🖥️ DOM STANDARDS & INTERAÇÕES

## Proibições de UX
- **Sem Pop-ups Nativos:** NUNCA utilize `window.alert()`, `window.confirm()` ou `window.prompt()`. Utilize exclusivamente o sistema de modais customizados do projeto (com backdrop blur).

## Loading e Anti-Flicker
- **Regra do Feedback Visual:** Toda chamada à API (`jsonpFetch`) deve ser acompanhada de um estado visual de loading.
- **Transição de Edição:** Ao clicar em "Editar", aplique uma "cortina de loading" (overlay) bloqueante sobre o formulário. O loading só deve ser removido quando o DOM estiver 100% populado com os dados antigos, evitando que o usuário veja as telas "piscando" ou transicionando de forma abrupta.
- **TL Dashboard:** Ao aprovar/rejeitar um caso, exiba um skeleton/spinner enquanto o Dashboard faz o fetch (re-render) da nova fila.

## Controle de Overlays
- **Scroll Lock:** Sempre que um Overlay ou Modal for aberto no topo da página, aplique `overflow: hidden` na tag `<body>` (ou elemento ancestral) para evitar "scroll duplo" com a página de fundo. O container do overlay deve gerenciar o seu próprio `overflow-y: auto`.