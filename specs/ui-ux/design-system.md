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
   botão ali é promessa falsa. No topo dele vem o **desfecho pedido**, quando
   houver um (ver abaixo).
3. **Dados** — o que a pessoa leva para outro sistema. Lista de definição com
   hairline (não caixa por campo), botão de copiar no hover/foco.

O botão de copiar tem que significar uma coisa só: *"isto vai para o outro
sistema"*. Espalhá-lo por todo campo esvazia o sinal.

Ações de decisão vivem num rodapé fixo da própria vista — fechar para agir é
uma busca visual a mais por registro. A confirmação continua sendo a fronteira.

### Desfecho pedido: diga os dois lados, e diga "não sei"

Quando um registro carrega o que quem o abriu **pediu que aconteça** (no modal do
TL: descartar o caso, ou deixar o agente implementar), isso é a moldura do resto
— vem como primeira linha do briefing, antes do "por quê".

Três regras, todas aprendidas errando:

- **Diga os dois estados por extenso.** Renderizar só o estado "positivo" (um selo
  que aparece quando é "Sim") faz o outro estado virar tela em branco, e quem lê
  não distingue "o agente escolheu isto" de "o campo não chegou". Foi o que
  aconteceu com a sugestão de descarte: por meses o TL só via alguma coisa quando
  era "Sim".
- **Ausência é um terceiro estado, não o padrão.** Célula vazia (linha anterior à
  coluna existir, campo que não se aplica) não é "Não". Afirmar um desfecho que
  ninguém escolheu, bem no texto que orienta a decisão, é pior que dizer que não
  foi informado.
- **Frase normal com ponto semântico**, não pílula em maiúsculas nem caixa
  própria: o briefing já é um contêiner, e caixa dentro de caixa está proibida
  acima. A cor fica no ponto (âmbar para o que pede atenção, verde para o que
  segue, cinza para o desconhecido) — é o caso de "cor apenas onde ela tem
  função", porque este estado muda a decisão de quem lê.

O texto do desfecho é **chrome**: segue o idioma da tela de quem lê, não o do
registro. (O resumo copiável é o oposto — segue o atendimento, porque é colado
noutro sistema.)

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

## Aviso de passagem: o que a pessoa lê sem parar o que está fazendo

Para o que **informa** e não pede decisão (o lembrete de qualidade do boot é a
referência viva — `modules/disclaimer/`), o toast não serve: some em 4s, sem
pausa, sem botão, e toca o som de *sucesso*. O padrão é um cartão não modal:

- **Nunca bloqueia o CRM**: sem fundo escurecido, sem trava de rolagem, sem roubar
  o foco, sem ouvir o Esc (é do CRM). Só o cartão capta o mouse; o resto da tela
  segue clicável por baixo. `role="status"`, não `role="dialog"`.
- **Canto inferior esquerdo**, a 24px — o lado oposto da pílula. Vidro claro,
  conteúdo sólido por tom, sombra em duas camadas e anel claro no lugar de borda.
- **Some sozinho (~12s), mas pausa** com mouse ou foco dentro dele, e ao soltar
  nunca volta com menos de 4s. Um aviso que some enquanto se lê falha em
  acessibilidade (WCAG 2.2.1). O botão diz a ação ("Entendi"), não "OK".
- **Som próprio e baixo**, mais baixo que o `playReady`, descendente (o `playReady`
  sobe e diz "pronto"; este diz "repare"). Nunca o som de sucesso, e sempre atrás
  do mudo global do `SoundManager`.
- **Espera a vez**: se há modal na tela (splash, tour, novidades), o aviso entra
  depois — com o modal aberto o relógio correria por baixo dele e ninguém leria.
  Quem espera usa a promessa de fechamento do modal, não polling de classe.

## Separação: espaço antes de tom, tom antes de borda

Borda cinza chapada em volta de toda caixa é o sinal mais forte de tela
**gerada** em vez de desenhada — e foi o que envelheceu o dashboard do BAU (dez
bordas `1px solid #DADCE0` numa tela só). A ordem a seguir, sempre:

1. **espaço em branco** — resolve a maioria dos casos sozinho;
2. **degrau de luminosidade** de 3–5% no fundo;
3. **elevação suave** (sombra curta), quando o elemento precisa flutuar;
4. **borda** — só se os três acima falharem, e nunca um cinza chapado.

Três caixas tonais idênticas em fila são o mesmo defeito que a borda, com outra
roupa: é "grade de cards" de novo. Para número + rótulo, o degrau tipográfico
(22 contra 12) e um separador fino entre eles bastam.

**Peso de fonte**: 400 e 500. `600` e `700` em corpo pequeno (rótulo de 11px,
selo de status) é a assinatura de painel administrativo antigo — a hierarquia
vem do tamanho e da cor, não da gordura da letra. Título de card: 500.

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

## Movimento: elástico só no espacial

A regra, em uma linha: **propriedade espacial pode passar do alvo e voltar;
propriedade de efeito, nunca.**

- **Pode** — `transform` (translate/scale/rotate), `border-radius`, altura. O
  olho aceita a sobra porque ela imita massa.
- **Não pode** — `opacity`, `background-color`, `color`, `box-shadow`.
  Overshoot aqui faz a cor *ultrapassar* o valor e voltar: lê-se como defeito de
  render, não como física.

Numa transição com várias propriedades, isso significa declarar a curva **por
propriedade**, não no atalho: o FAB leva `cubic-bezier(.34,1.56,.64,1)` só no
`transform`, e cor e sombra ficam na curva padrão.

**Propriedade de layout nunca leva sobra** (`grid-template-*`, `width`,
`height`, `padding`, `gap`): passar do alvo faz o conteúdo refluir na largura
errada e refluir de novo na certa. Não lê como mola, lê como tremor. Sobra vive
em `transform`, que não reflui. E numa trilha `fr` a sobra nem chega aos pixels —
a resolução por proporção satura antes do fim.

**Ao animar `grid-template-columns`/`rows`, os dois estados declaram cada trilha
da MESMA forma.** `0fr` num estado e `minmax(0, 6fr)` no outro são tipos
diferentes e não interpolam: o resultado estoura o alvo independentemente da
curva (medido: 12% de sobra). Ver `docs/LEARNINGS.md`.

**Orçamento: no máximo um overshoot visível por transição.** Dois elásticos
simultâneos se cancelam — o olho perde qual é o importante e a tela parece
instável em vez de viva. Rotação de spinner é a exceção que confirma: é
espacial, mas `linear` é o ponto (bounce ali lê-se como travamento).

`@media (prefers-reduced-motion: reduce)` derruba **todo** overshoot, mantendo a
duração: some com a sobra e com o deslize, não com a transição — sumir num
quadro também desorienta.

## Dado capturado do CRM: mostre que veio sozinho

Quando um formulário chega com campos já preenchidos pela raspagem da tela do caso
(Pre-call Checklist é a referência viva), a pessoa precisa saber **o que não
precisa digitar**, e o formulário nunca pode mentir sobre de que caso é:

- **Marca no próprio campo**, não um aviso à parte: "Auto" com ícone de check na
  linha do rótulo, e a dica completa no `title`. A barra de status (`role="status"`)
  diz quantos vieram e pede para revisar. Editar o campo tira a marca — deixou de
  ser dado capturado.
- **Entrada animada e curta**: os campos aparecem em sequência (~110ms de
  intervalo), com realce azul que se dissolve. Só `opacity`/`transform`/cor, sem
  overshoot; com `prefers-reduced-motion` aparecem sem animação.
- **Nada capturado sobrescreve o que a pessoa digitou**, e captura que termina
  depois de o caso mudar é descartada.
- **Outro caso na tela zera o formulário antes da captura lenta**, e as ações de
  saída ficam paradas enquanto ela roda. Do contrário o formulário do caso
  anterior fica visível e editável por alguns centenas de milissegundos.
- Valor ausente (`null`, vazio, `N/A`) não é dado capturado: o campo fica vazio.

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
- Data e número por `Intl.*` — nada de locale fixo. **Qual idioma** depende de
  para quem o texto é: cromo da tela usa o da interface, texto que vai no caso
  ou no e-mail do anunciante usa o do atendimento (ADR-0016).
- Controle de idioma: grupo segmentado com um botão por idioma suportado
  (`PT | ES | EN`), nunca um `<select>` — são poucos e a escolha tem de ser
  visível sem abrir nada. O separador é `:not(:last-child)`, não
  `:first-child`: com três opções o do meio some.

## Variações Semânticas
- **Fluxo Padrão (Criação BAU):** Utiliza brilhos/auras (pseudo-elemento `::before`) em tons de Azul/Gemini.
- **Fluxo de Descarte (Warning):** Aplica a classe `.discard-theme`. Utiliza paleta de alerta suave (tons sutis de laranja/coral ou #FCE8E6) para indicar fluxo secundário/destrutivo sem parecer um erro de sistema agressivo.

## Componentes UI
- **Tags `<select>`:** Para economizar cliques em listas complexas (como os motivos de descarte), utilizar obrigatoriamente a semântica de agrupamento `<optgroup label="Categoria">`.
- **Botões:** Manter o padrão translúcido/outline com hover states claros. Ao executar ações, os botões devem ser desabilitados temporariamente.
- **Mestre-detalhe com prévia (Links, ADR-0019):** lista à esquerda, painel de
  prévia **fixo** à direita (janela de 860px). A prévia segue o `mouseover` e o
  `focusin` — teclado e mouse mostram a mesma coisa — e o painel **nunca fica
  vazio**: sem seleção ele mostra o destaque principal, e na falta dele o
  primeiro favorito, recente ou link da lista; só uma busca sem resultado o
  esvazia. Texto vindo da Central entra por `textContent`, e o ícone só sai de
  uma lista fechada no pacote. Abaixo de 1000px o painel some (a lista não
  comprime).
- **Controle segmentado:** para alternar entre 2–3 vistas irmãs da mesma tela
  (Biblioteca | Destaques na Central; Favoritos | Recentes | Saíram do destaque no
  app) em vez de abas soltas. Estado em `aria-pressed` na Central e
  `role="tab"` + `aria-selected` no app, alvo ≥32px, o selecionado é o único com
  fundo. É a versão Apple do "chip de filtro" do Material: uma só
  escolha, sem rolagem.
- **Pílula e gaveta (ADR-0023):** a pílula mostra **no máximo 7** módulos fixados
  — é o que cabe num viewport de 650px (7 + Mais = 533px; com 10 botões ela
  media 641px e perdia o topo). O resto mora na **gaveta**, atrás do botão de
  grade: ícone **e nome** (o nome é o que desambigua num lugar com vários
  ícones), 3 colunas, aberta **para dentro da tela** e com a base alinhada à do
  botão. A gaveta é um elemento **irmão** da pílula, nunca filho (a pílula é
  fixed, arrastável e tem regras em todo filho direto; dentro dela o vidro
  aninhado também não borra o que está atrás). Fecha por clique fora, Esc (só
  ela), escolha, recolher, arrastar e resize; o mouse nela segura o
  auto-fechamento. **O que mora na gaveta não pode ficar mudo nem invisível:** o
  botão Mais acende (`.active`) com um módulo guardado aberto e mostra o ponto de
  aviso quando algum tem pendência. A ordem dos ícones é **escolha do agente**:
  nada de reordenar sozinho por uso — num dock a memória muscular vale mais, e
  `:nth-child` com posição fixa não serve (a cascata usa `--cw-i`).
- **Vidro só na casca:** superfícies translúcidas (`rgba(248,249,250,.88)` +
  blur) valem para a janela e o trilho; o conteúdo dentro continua sólido e
  recuado por tom, não por borda. Tudo o que anima declara as propriedades
  (`transition: transform, opacity…`), nunca `all`, e respeita
  `prefers-reduced-motion`.

## Case Notes em tabela: a tela (irmã mais velha do Case Notes)

Referência viva: `docs/media/case-notes-table/` (`01-comeco.png` a `05-prints.png` e o `preview.html`).
É a mesma casca do Case Notes de hoje, com **menos informação por vez**: a carga cognitiva sobe com o
que está na tela, e o agente precisa de velocidade ao preencher. O contrato da nota está em
`specs/workflow/case-note-table.md`; esta seção só trata do desenho.

**Princípio — só o que pede a atenção do agente fica à vista:**

- o que o sistema já sabe vira **um resumo** ("Preenchido automaticamente"), com os valores à vista para conferir;
- o que raramente muda vira **uma linha recolhida** ("Nota": idioma, fluxo e Caso da Europa);
- o que é opcional fica atrás de **"Mais opções · N"**;
- a dica de um campo aparece **só quando ele está em foco**, no vão sob o cartão (sem deslocar nada);
- a tela fica **calma até o agente tentar preencher**: só então as linhas pendentes ganham a marca âmbar;
- a **prévia da nota** é uma gaveta **atrás da janela**, aberta por uma aba, e não um painel fixo.

### Casca (reaproveita `stylePopup` e `HEADER_STYLE`; nada novo)

| Parte | Medida |
|---|---|
| Janela | 560×760, redimensionável, raio 20, `SHADOW.apple`, borda `1px rgba(255,255,255,.7)`, fundo `rgba(255,255,255,.98)` |
| Cabeçalho | 56, padding `0 20`, vidro escuro `rgba(28,28,32,.85)` + blur 12, "G" de 20, título 16/500 com `letter-spacing:.5px`, 4 botões de 32 (shuffle = Split & Transfer, histórico = rascunhos, ajuda, fechar), linha Google de 2 (`opacity:.8`). Os SVG são os do código. |
| Corpo | fundo tonal `#f5f5f7`, padding 24, rolagem própria, seções separadas por 24 |
| Rodapé | branco, padding `12 24 0`, sombra `0 -1px 0` hairline; linha de 40 + crédito de 28 (`created by …`, 11px `#9aa0a6`) |

### Tokens e escala (todos já existem em `notes-styles.js` e `header-factory.js`)

- **Cor:** primária `#1a73e8` (ação, foco, seleção), texto `#202124`/`#3c4043`, secundário `#5f6368`, dica `#9aa0a6`
  (só decoração e placeholder; o `NA` usa `#74777c` para ter contraste), tons `#f5f5f7` (fundo), `#f8f9fa`, `#f1f3f4`
  (chip, hover) e `#e8e8ed` (trilho do segmentado), âmbar `#b06000`/`#fef7e0`/`#fbbc05`, verde `#188038`/`#34a853`.
  Cor só onde ela tem função; **nenhuma borda cinza chapada** na casca.
- **Separação:** espaço, depois tom, depois sombra curta; a divisão entre linhas é uma hairline
  `rgba(60,64,67,.12)` com recuo de 16 à esquerda, que **nunca fica pendurada** (só entre irmãos).
- **Grade de 4/8px:** todo padding, margem e gap é múltiplo de 4 (insets de 1 a 2px só dentro de controle,
  como o botão do interruptor).
- **Degraus de fonte:** 11 (eyebrow em caixa alta, `letter-spacing:1px`), 12 (rótulo, dica, legenda), 13 (chip,
  controle), 14 (botão), 15 (valor), 16 (título da janela). **Pesos 400 e 500**, nunca 600/700.
- **Algarismos tabulares** em CID e Speakeasy.

### Componentes

| Componente | Medida e regra |
|---|---|
| Eyebrow | 11/500 caixa alta + hairline que preenche a linha (assinatura do CW); margem de baixo 8 |
| Controle segmentado | trilho `#e8e8ed`, raio 12, padding 4, botões de 32 e raio 8; **só o selecionado tem fundo** (branco, sombra `0 1px 2px`); `role="radiogroup"` com setas |
| Cartão | branco, raio 16; linha com `min-height:52`, padding `8 16`; rótulo 12/500 `#5f6368` à esquerda (136; 88 no cartão de contexto), valor 15/400 `#202124` sem moldura de campo |
| Linha de texto longo | rótulo em cima, `textarea` que cresce (mínimo 44), padding `12 16` |
| Foco da linha | fundo `#f8f9fa` + barra de 2 em `#1a73e8` à esquerda (substitui o contorno do campo) |
| Linha pendente | barra de 2 em `#fbbc05` e rótulo em `#b06000`, **só depois de tentar preencher** |
| Ações da linha (`NA`, comentário) | **só em foco/hover** (opacidade 0 em repouso, `.15s`; sempre visíveis na linha pendente). `NA`: botão de texto 12/500, alvo 32; ligado: fundo `#e8f0fe`, texto "Desfazer", valor "NA" e **sempre visível** (o estado nunca se esconde). Comentário: balão de 20 num alvo de 32; com texto fica preenchido, azul e sempre visível. O campo do comentário abre na própria linha: 32 de altura, raio 8, tom `#f1f3f4`, sem moldura, 13/400. Reservam a largura na linha (não deslocam o valor ao aparecer) |
| ✓ de link válido | check de 20 em `#188038` à direita do link colado (`http(s)://…`); sem fundo nem borda no campo (o verde-claro do `enableFilledCheck` antigo é de painel antigo). Link inválido: texto `#d93025` |
| Chip | 32 de altura, raio 16, 13/500, tonal (`#f1f3f4`); selecionado `#e8f0fe` + `#1967d2`. Sugestão = ponto de 12 com anel branco de 2 no canto do chip (não ocupa largura) |
| Seletor de sub-status | linha do cartão que abre um popover de vidro: busca (por nome **ou atalho**, ex. `ts so verif`), grupos Need Info, Solution Offered, Inactive, Assigned, Discarded, atalho à direita (12px tabular), Enter escolhe o primeiro, setas navegam, Esc fecha. Texto que não casa oferece `Usar “…”` (os `PI - …` se digitam) |
| Interruptor | 52×32, botão de 28, `role="switch"` |
| Linha "Nota" | linha do cartão de contexto, recolhida: `idioma · fluxo · Europa` (âmbar se Europa), mais o **tipo** em azul 500 **só se não for o padrão**. Aberta: Tipo (segmentado de 3, com a pista "Sales program no CRM: …" em 12), Idioma, Fluxo e o interruptor da Europa. Com foco, a dica lembra o que há dentro |
| "Preenchido automaticamente" | cabeçalho de 52 com ícone de check; recolhido mostra `Date`, `Follow-up`, `CID`, `Consent` com o valor; aberto lista as linhas editáveis com a marca **Auto** (check + texto, `title` com a explicação); editar tira a marca e a linha passa para a lista normal |
| "Mais opções · N" | linha de 44, 13/500; chevron gira 180° |
| Faixa de contexto | 48, vidro `rgba(245,245,247,.98)` + blur 20 (.94 deixava passar o texto que rola por baixo), aparece (deslize de `transform`, .25s) ao rolar além do contexto; mostra [tipo, só se não for o padrão] · fluxo · idioma · sub-status; um clique volta ao topo |
| Faixa de pendências | 48, `#fef7e0`, texto 13/500 `#b06000`; só aparece depois de tentar preencher ou clicar no status; ações **Próxima** (texto) e **Marcar o restante como NA** (tonal); substitui a faixa de contexto enquanto está no ar |
| Rodapé | estado à esquerda (ponto âmbar "N pendentes" ou verde "Pronta para preencher"), depois **Limpar** e **Guardar** (texto), **Copiar** (tonal) e **Preencher** (primário, sombra `0 4px 12px rgba(26,115,232,.3)`). Com pendência, Preencher e Copiar ficam com aparência bloqueada **mas clicáveis**: o clique abre a faixa de pendências em vez de ficar mudo |
| Botões | 36 de altura, raio 18, 14/500; de ícone ou de texto curto, alvo mínimo 32×32 |

### Gaveta da prévia

- Fica **atrás** da janela: 560 de largura, 24 deles escondidos sob a janela, raio `20 0 0 20`, fundo `#f1f3f4` (tonal, recuado),
  sombra `0 8px 24px rgba(0,0,0,.08)`, padding `24 48 24 24`. Abre para a **esquerda** (a janela mora ao lado do dock). *Intenção,
  ainda não desenhada no protótipo:* se a janela for arrastada para perto da borda esquerda da tela, espelha para a direita.
- **Aba** de 32×112 colada à borda esquerda da janela (e da gaveta, quando aberta), mesmo vidro escuro do cabeçalho, com
  o ícone da nota, o chevron e um selo de 20: **número de pendências** (âmbar) ou **check** (verde, pronta). `aria-expanded`,
  `aria-controls`, rótulo com a contagem. Fechada, o conteúdo é `inert` (fora da ordem do Tab); Esc fecha.
- Dentro: eyebrow "Prévia da nota" + selo de estado (24 de altura) e o **cartão da nota**, o único elemento elevado da tela
  (branco, raio 12, sombra `0 4px 12px rgba(0,0,0,.05)`): é o que o agente leva para o CRM.
- **Ligação formulário ↔ nota:** a linha em foco acende a linha correspondente da nota (`#e8f0fe`); clicar numa linha da nota
  leva o foco ao campo (abrindo o que estiver recolhido). Só a prévia viva traz `data-row`; a saída nunca.
- **Movimento:** só o `transform` da gaveta (e o botão do interruptor) usa a curva elástica `cubic-bezier(.34,1.56,.64,1)`;
  cor, fundo e opacidade usam `.2s` com a curva padrão. Um overshoot por transição. Com `prefers-reduced-motion` tudo cai para ~0.

### Comportamento da tela (resumo; o contrato está na spec)

Sem sub-status, só o contexto e um estado vazio. O tipo de nota (ALL TASKS, ECL SBS-E, ECL MMS) **não fica no topo**: mora na linha
"Nota" e só aparece quando foge do padrão do agente. **General** não é chip (está sempre ligado); `Fase` é escolha única nos segmentos por fase. Linhas derivadas (sub-status, Europa)
não aparecem no formulário; "Task types" só aparece se não houver task. Cada seção é um cartão; seções depois da primeira levam um
sub-título de 12/500. O que o agente digitou nunca é sobrescrito por captura.

### Como isto é medido

`docs/media/case-notes-table/preview-checks.cjs` mede, no DOM renderizado, a grade de 4px, os degraus e pesos de fonte, a ausência de
borda chapada na casca, o alvo mínimo de 32px, `transition` sem `all` e os algarismos tabulares, além do comportamento. Foi validado
quebrando de propósito cada regra (padding de 10px, peso 700, borda, `transition: all`, alvo de 28px).
