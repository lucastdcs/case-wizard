# Diagnóstico do TL Dashboard

> ⚠️ **Status: parcialmente implementado.** Os itens marcados ✅ abaixo já existem no código atual (`gas-backend/BAU_Dashboard.js`, `gas-backend/TLDashboard.html`). Os demais continuam sendo apenas propostas — confirme no código antes de assumir que algo aqui já existe.

No arquivo **TLDashboard.html**:

1.  ✅ **Auto-Refresh (Polling):** implementado — `setInterval` silencioso chamando `loadCases({ silent: true })` a cada 60s, mais um refresh ao focar a aba de novo (`visibilitychange`). Pausa enquanto qualquer modal está aberto. Sem o `setInterval` de 3-5min originalmente cogitado aqui — 60s pareceu um ponto de partida melhor para dar sensação de "tempo real"; é um valor único, fácil de ajustar se ficar muito frequente.
2.  **Destaque Visual de Mudanças:** ainda não implementado. Continua como proposta: comparar o novo array de casos com o estado anterior (`allCases`) no `withSuccessHandler` do `loadCases`, e aplicar uma classe CSS de animação (pulse/glow) na linha correspondente quando um ID existente mudar de dados.
3.  **Badge de Edição:** ainda não implementado. Continua como proposta: propriedade `date_edited` no objeto retornado pelo backend + badge "Editado" no frontend.
4.  ~~Notificação de Sistema (Toasts) quando um caso é alterado enquanto a aba está aberta~~ — depende dos itens 2-3 acima (que ainda não existem), então também não implementado.

No arquivo **BAU_Dashboard.js**:
1.  ✅ **Incluir a coluna de `description`** no retorno de `getPendingBAUCases` — já implementado, junto com Speakeasy ID, Adv Email, Timezone, Language, AM Name e Sales Program.
