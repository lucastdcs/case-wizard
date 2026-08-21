# 🎨 DESIGN SYSTEM (Google Material 3 / Gemini Aesthetics)

## Identidade Visual
- **Estética Base:** "Liquid Glass" (Glassmorphism).
- **Painéis (Highlight Panels):** Devem possuir `backdrop-filter: blur(12px)` e backgrounds translúcidos (ex: `rgba(255,255,255,0.1)`).

## Variações Semânticas
- **Fluxo Padrão (Criação BAU):** Utiliza brilhos/auras (pseudo-elemento `::before`) em tons de Azul/Gemini.
- **Fluxo de Descarte (Warning):** Aplica a classe `.discard-theme`. Utiliza paleta de alerta suave (tons sutis de laranja/coral ou #FCE8E6) para indicar fluxo secundário/destrutivo sem parecer um erro de sistema agressivo.

## Componentes UI
- **Tags `<select>`:** Para economizar cliques em listas complexas (como os motivos de descarte), utilizar obrigatoriamente a semântica de agrupamento `<optgroup label="Categoria">`.
- **Botões:** Manter o padrão translúcido/outline com hover states claros. Ao executar ações, os botões devem ser desabilitados temporariamente.