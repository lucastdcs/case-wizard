# 🎨 DESIGN SYSTEM (Google Material 3 / Gemini Aesthetics)

## Identidade Visual
- **Estética Base:** "Liquid Glass" (Glassmorphism).
- **Painéis (Highlight Panels):** Devem possuir `backdrop-filter: blur(12px)` e backgrounds translúcidos (ex: `rgba(255,255,255,0.1)`).

## Onde cada registro se aplica

O Liquid Glass e o registro Google Material **não são alternativas**: cada um
governa uma camada diferente, e confundir isso já produziu erro nos dois
sentidos (módulos que anularam o vidro com fundos opacos, e conteúdo que ganhou
selos decorativos como se fosse dashboard de SaaS).

- **Superfícies — Liquid Glass.** Janelas de módulo, painéis, sheets e overlays.
  Translúcidos, com `backdrop-filter`, sombra em camadas e cantos suaves.
  Referência viva no repositório: `src/modules/personal-library/`.
  Nunca sobrescreva o `backgroundColor` translúcido de `stylePopup` por uma cor
  opaca — é o que tira o vidro de um módulo só e o deixa fora do conjunto.

- **Conteúdo — Google Material modesto.** O que vive dentro das superfícies:
  tipografia, hierarquia por espaço em branco e hairlines, e cor **apenas onde
  ela tem função** (a ação primária, um aviso de urgência, um estado que muda a
  decisão de quem lê).

O teste para o conteúdo é: *"isso é uma tela que eu receberia do Google?"* Em
particular, evite:

- pílula em maiúsculas com status decorativo — o estado se diz em texto normal,
  com um ponto na cor semântica quando precisar de reforço;
- emoji em cabeçalho, botão, rótulo de estado ou lockup de produto (o texto
  escrito por quem publica um conteúdo segue livre — isso é conteúdo, não chrome);
- caixa dentro de caixa: um contêiner por unidade de informação, com a
  hierarquia interna feita por tipografia e espaço;
- cor decorativa fora da paleta do app.

## Acessibilidade (piso, não extra)

- Todo controle é `<button>`/`<a>` — nunca `<div>` com `onclick`, que o teclado
  não alcança.
- Botão só de ícone precisa de `aria-label` dizendo o que **acontece**, não como
  o ícone se parece.
- Ícone decorativo leva `aria-hidden="true"`.
- Foco visível em todos os controles (`:focus-visible`), sem exceção.
- Região que abre e fecha: `aria-expanded` + `aria-controls`.
- Texto que muda sozinho (sincronização, status de rede): `role="status"` com
  `aria-live="polite"`.
- Data e número por `Intl.*` no idioma da interface — nada de locale fixo.

## Variações Semânticas
- **Fluxo Padrão (Criação BAU):** Utiliza brilhos/auras (pseudo-elemento `::before`) em tons de Azul/Gemini.
- **Fluxo de Descarte (Warning):** Aplica a classe `.discard-theme`. Utiliza paleta de alerta suave (tons sutis de laranja/coral ou #FCE8E6) para indicar fluxo secundário/destrutivo sem parecer um erro de sistema agressivo.

## Componentes UI
- **Tags `<select>`:** Para economizar cliques em listas complexas (como os motivos de descarte), utilizar obrigatoriamente a semântica de agrupamento `<optgroup label="Categoria">`.
- **Botões:** Manter o padrão translúcido/outline com hover states claros. Ao executar ações, os botões devem ser desabilitados temporariamente.