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

## Vista de registro: leitura x área de transferência

Numa tela que mostra um registro (o modal de caso do TL Dashboard é a referência
viva), o layout segue o **propósito** de cada informação, não a ordem da planilha:

1. **Cabeçalho** — de quem é o registro: título, selos que mudam a decisão de
   quem lê, e autoria. Autoria não é campo copiável.
2. **Briefing** — por que ele existe. Um contêiner só, hierarquia por tipografia.
   **Sem botão de copiar**: ninguém cola uma justificativa em lugar nenhum, e o
   botão ali é promessa falsa.
3. **Dados** — o que a pessoa leva para outro sistema. Lista de definição com
   hairline (não caixa por campo), botão de copiar no hover/foco.

O botão de copiar tem que significar uma coisa só: *"isto vai para o outro
sistema"*. Espalhá-lo por todo campo esvazia o sinal.

Ações de decisão vivem num rodapé fixo da própria vista — fechar para agir é
uma busca visual a mais por registro. A confirmação continua sendo a fronteira.

Ver `docs/decisions/0015-vista-de-caso-leitura-e-copiavel.md`.

## Profundidade diz o que a coisa é

O Material 3 manda preferir **elevação tonal** e guardar a **sombra** para o que
precisa de foco. Aqui isso vira três níveis com significado, e não três caixas
com a mesma cor:

- **recuado (tonal)** — material de referência, o que a pessoa *lê*: fundo
  tingido, sem sombra;
- **plano** — dados, direto sobre a superfície;
- **elevado (sombra)** — o que a pessoa *leva embora* dali. Um por tela.

Quando um bloco recuado carrega um estado (um desfecho, um alerta), ele leva a
**tinta da cor semântica** em vez do cinza neutro: é a cor que faz o olho achar o
bloco primeiro, antes de qualquer texto ser lido.

## Retorno de ação nos três canais

Todo gesto que produz um resultado invisível — copiar, sobretudo — confirma
**onde a mão está**, não só num toast no canto oposto da tela:

- **visual** no próprio controle (ícone e cor, ~1,5s);
- **sonoro** pelo `SoundKit`/`SoundManager`;
- **tátil** por `navigator.vibrate(10)`, sempre atrás de `if (navigator.vibrate)`
  — não existe em desktop nem no Safari.

Um controle com `cursor: pointer` e nenhum estado de `:hover` é um defeito, não
um descuido: é o detalhe que faz uma tela parecer montada em vez de desenhada.

## Acabamento (o que separa desenhado de gerado)

- **Grade de 4/8px.** `10px`, `14px`, `6px` não existem.
- **Degrau tipográfico real.** 12px de rótulo contra 15px de valor; dois pixels
  de diferença não estabelecem hierarquia, e sem degrau a diferenciação fica toda
  por conta da cor.
- **`font-variant-numeric: tabular-nums`** em tudo que mostre CID, número de caso,
  telefone ou horário — sem isso, cada linha de uma coluna de dígitos alinha num
  ponto diferente.
- **Um eixo de alinhamento por caixa.** Diálogo com campo para preencher é
  formulário, não alerta: o corpo inteiro vai para a esquerda. Texto corrido
  centralizado em várias linhas é difícil de ler, e título ao centro com campo à
  esquerda cria dois eixos competindo.
- **Botão diz a ação**, não "Confirmar". Com dois botões, "Confirmar" obriga a
  reler o título para saber o que se está confirmando.
- **Separador não fica pendurado**: o último item de uma lista não leva hairline.
- **`@media (prefers-reduced-motion: reduce)`** é obrigatório onde há animação.
- **`transition` nomeia as propriedades.** `transition: all` anima o que você não
  pretendia e custa o que você não mediu.

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