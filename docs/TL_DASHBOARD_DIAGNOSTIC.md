# Diagnóstico do TL Dashboard

Para que o TL Dashboard reflita essas edições em tempo real, as seguintes alterações no arquivo **TLDashboard.html** serão necessárias no futuro:

1.  **Auto-Refresh (Polling):** Implementar um mecanismo de atualização automática utilizando `setInterval` que execute a função `loadCases()` em intervalos regulares (ex: a cada 3 ou 5 minutos), garantindo que a lista de casos pendentes esteja sempre sincronizada sem depender exclusivamente do clique manual em "Sincronizar".
2.  **Destaque Visual de Mudanças:** Na função `withSuccessHandler` do `loadCases`, comparar o novo array de casos com o estado anterior (`allCases`). Caso um ID existente possua dados diferentes (como mudança no `reason` ou `task`), aplicar uma classe CSS de animação (ex: um breve pulse ou glow) na linha correspondente para alertar visualmente o TL sobre a edição.
3.  **Badge de Edição:** Adicionar uma propriedade `date_edited` ao objeto retornado pelo backend e, no frontend, exibir um pequeno ícone ou badge de "Editado" nos cards que foram modificados pelo agente após a criação inicial.
4.  **Notificação de Sistema (Toasts):** Se o Auto-Refresh detectar que um caso foi alterado enquanto o TL estava com a aba aberta, disparar um Toast informativo: "O caso [ID] foi atualizado pelo agente".

No arquivo **BAU_Dashboard.js**:
1.  Incluir a coluna de `description` (Índice 16) no objeto retornado pela função `getPendingBAUCases`, permitindo que o TL visualize detalhes adicionais que podem ter sido corrigidos durante a edição.
