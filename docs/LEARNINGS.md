<!-- generated-by: groundrules v1.10.0 -->
# Learnings — Case Wizard

Rules learned from corrections and non-trivial discoveries during the project. Reverse-chronological order (newest at the top). **Re-read at session start.**

One entry = one **actionable rule**, not a journal note. Each entry has:
- a title that states the rule (imperative or "X: do Y");
- **Why** — the story behind it: what happened, what it cost (a revert, a lost CI cycle, a confused user…);
- **When to apply** — the concrete trigger conditions, so the rule fires at the right moment instead of being remembered too late.

Include the minimal code snippet / command when it is the fix.

---

## Ao restaurar um caminho que funcionava, transplante o texto original — não reescreva

**Why**: depois que a migração para a UI nova do Connect Cases apagou o fluxo da
UI antiga, a restauração foi feita **reescrevendo** o que aquele fluxo fazia:
`esperarPor()` no lugar dos `esperar(800)` fixos, `estaVisivel()` no ícone,
clique no `.closest('material-button')` em vez do próprio `<i>`, `textContent` no
lugar de `innerText`. Cada uma dessas trocas era defensável isoladamente — e o
conjunto continuou falhando na UI antiga, custando um segundo ciclo inteiro de
correção, PR e report do agente. O erro de raciocínio foi tratar "código antigo"
como rascunho a ser melhorado, quando ele era a **única versão com prova de
funcionamento** naquela tela: rodou meses em produção sem reclamação. Sem acesso
à UI antiga para testar, cada "melhoria" é uma hipótese não testada disfarçada de
boa prática, e todas entram de uma vez.

A forma correta é `git show <commit-anterior>:<arquivo>`, copiar o bloco como
está, adaptar só o mínimo mecânico para ele virar função (`emailAberto = true`
→ `return true`), e deixar um comentário no código dizendo para não "melhorá-lo".
Dá para provar o transplante comparando as linhas de lógica com as do commit
original antes de commitar.

**When to apply**: sempre que a correção for "voltar a fazer o que fazíamos
antes" — regressão, rollback parcial, restauração de fallback. Vale especialmente
quando o ambiente onde aquele código roda **não é testável aqui** (a UI antiga do
CRM, um cliente de e-mail específico, uma versão de navegador). Se você não
consegue rodar, não consegue validar a melhoria — então não faça a melhoria.

---

## Automação de DOM do CRM: o caminho novo entra na frente, o antigo nunca sai

**Why**: o Connect Cases escondeu o botão de e-mail atrás de um speed dial novo
(`#action-bar-speed-dial-container` → `material-button.compose`) e a FASE 1 do
`openAndClearEmail` foi reescrita para segui-lo. Só que a reescrita **removeu** o
caminho da UI antiga (`material-fab-speed-dial` → `.trigger`) em vez de mantê-lo
atrás do novo. Parecia seguro porque sobrou um plano B — o clique no envelope
solto na action bar —, mas esse plano B exige o ícone já visível
(`offsetParent !== null`), e na UI antiga ele está escondido dentro do menu
fechado. Resultado: agente na UI antiga sem nenhuma rota, com o toast genérico de
"botão não encontrado" como única pista. O custo foi alto porque a atualização do
CRM chega **em ondas**: no dia do merge parte da operação já estava na UI nova e
parte não, o bug foi para produção via `main`, e o modal de novidades da v6.0.1
tinha acabado de anunciar que o módulo de e-mails estava corrigido — para quem
estava na UI antiga, a mensagem era o oposto do que a tela fazia.

A forma correta é uma cadeia: cada rota checa o próprio markup antes de agir e
devolve `false` sem clicar em nada quando não reconhece a tela, e a rota nova só
entra **na frente** das que já existiam. No CRM antigo a rota nova custa ~0ms
(seletor por id não casa), então não há preço em mantê-las todas de pé. O log
deve dizer qual rota abriu — é o que transforma o próximo report de "quebrou" em
"quebrou na rota X".

**When to apply**: sempre que uma atualização do CRM mudar o markup que o
Case Wizard clica ou raspa. Antes de apagar um seletor antigo, pergunte "existe
hoje um agente vendo a tela que este seletor atende?" — enquanto a resposta não
for um "não" comprovado, o caminho antigo continua como elo da cadeia. Vale
também para a leitura do `specs/workflow/scraping-rules.md`: a regra da falha
silenciosa só protege quem tem outra rota para tentar.

---

## Antes de mexer no TL Dashboard, confira o código contra `specs/`

**Why**: a fila do TL saía do caso mais novo pro mais antigo porque
`getPendingBAUCases` terminava em `cases.reverse()` — enquanto
`specs/workflow/bau-lifecycle.md` já mandava, desde sempre, ordenar do mais
antigo pro mais recente por `Data_Envio` ("o TL aprova primeiro quem está
esperando há mais tempo"). O spec estava certo e o código, calado, fazia LIFO:
quem escalava primeiro era atendido por último. Ninguém tinha percebido porque a
ordem "parece plausível" na tela. `specs/` é lei e vence o código quando os dois
divergem — mas isso **não** quer dizer que o código já obedece.

**When to apply**: ao tocar em qualquer leitura da aba `BAU_Form` ou em
ordenação/filtro de fila — abra a regra em `specs/` primeiro e compare, em vez
de assumir que o comportamento atual é o desejado. Cuidado com `Data_Envio`: o
timestamp pode vir do cliente (`p.date` em `handleBAUEscalation`), então a ordem
de append da planilha não é fonte confiável de ordem de chegada.
## Trava de segurança se escreve como delta (de 1 para 0), não como invariante

**Why**: a trava que impede a aba People de ficar sem nenhuma liderança nasceu
como `if (lideres === 0) throw`. Parecia obviamente certo — e passou em 38 dos 39
testes. O que caiu foi o cadastro numa aba **vazia**: numa planilha nova, o
primeiro registro só poderia ser o de um TL, e admitir um agente ficaria
impossível pela tela, exigindo editar a planilha na mão. A regra que se queria
nunca foi "tem de haver liderança"; era "esta alteração não pode **tirar** a
última". Escrita como invariante absoluta, ela cobra de quem não causou o
problema — e o bloqueio aparece justamente no pior momento, o da configuração
inicial, quando ninguém ainda sabe como a tela funciona.

A forma correta compara os dois estados:

```js
if (antes > 0 && depois === 0) throw new Error(...);
```

**When to apply**: em qualquer guarda de "não pode ficar sem X" — o último
ADMIN em `Content_Access`, a última liderança em `People`, o último item de uma
lista obrigatória. Pergunte sempre: *e se já estivesse em zero antes?* Se a
resposta bloqueia quem está tentando **sair** do zero, a trava está escrita como
invariante e precisa virar delta. O teste que pega isso é o do estado vazio, que
é fácil de não escrever porque parece um caso degenerado sem interesse.

---

## Tela do Apps Script se testa de verdade: dá para ligar `google.script.run` a um backend real

**Why**: o `ContentDashboard.html` e o `TLDashboard.html` nunca tiveram teste de
tela, e a razão parecia definitiva — `google.script.run` não existe fora do Apps
Script, então a página não roda em lugar nenhum. Na prática, a ponte é
reconstruível em ~20 linhas, e sem mock de regra nenhuma: o Chromium carrega o
HTML **real** e cada chamada é encaminhada para o backend GAS **real** rodando
num contexto `vm` do Node sobre a planilha falsa que os harnesses já usam.

```js
window.google = { script: { run: (function make(ok, err) {
  return new Proxy({}, { get: function (_, prop) {
    if (prop === 'withSuccessHandler') return function (f) { return make(f, err); };
    if (prop === 'withFailureHandler') return function (f) { return make(ok, f); };
    return function () { /* encaminha para o Node via page.exposeFunction */ };
  }});
})(null, null) } };
```

Foi isso que provou o que nenhum teste de unidade alcançava: que a aba nem
aparece para QA, que a linha do TL vira "em revisão" **sem a planilha mudar**, e
que o pisca é verde quando aplica e âmbar quando enfileira. Duas asserções
minhas quebraram ao acrescentar um rótulo de leitor de tela na coluna de idioma —
o teste estava lendo `textContent` e passou a enxergar o texto do `.sr-only`.
Lição de brinde: asserção de tela compara o **visível**, então o valor merece um
elemento próprio em vez de dividir o nó com o rótulo acessível.

**When to apply**: ao mexer em qualquer coisa dentro de `ContentDashboard.html`
ou `TLDashboard.html`. Ver `scripts/smoke-people.mjs` — é o molde. Também vale
como aviso: se um arquivo do `gas-backend/` desvia para outro (hoje o
`ContentAPI` chama o `PeopleAPI`), o harness precisa carregar **todos** eles no
mesmo contexto, porque é isso que o Apps Script faz; carregar só um testa um
ambiente que não existe.

---

## Estudo de viabilidade traz números medidos e a conta explícita, não adjetivos

**Why**: no estudo de #332 (hospedagem do bundle), a primeira versão da análise
comparou as alternativas qualitativamente e chegou a escrever "precisa ser medido,
não estimado" — sem medir. Lucas devolveu pedindo o estudo "com base em dados
reais e cálculos baseados na infra". Ao medir de fato, a conclusão **se inverteu**:
a opção recomendada uma seção antes (servir o bundle pelo Apps Script) caiu, porque
o TTFB medido é 0,49–0,90 s contra 0,068–0,078 s do CDN, e a resposta do Apps
Script vem com `no-cache, no-store` — cada carregamento rebaixaria 668 KB.
Identificar que algo precisa de medição não substitui a medição, e uma
recomendação dada antes dos números não sobrevive a eles por inércia.

**When to apply**: em qualquer issue `tipo: pesquisa` — hoje #331 (escala), #333
(Sheets como banco), #334 (peso dos dashboards) — e sempre que a pergunta for de
capacidade, cota ou desempenho. O mínimo aceitável:

1. buscar os **limites oficiais** da plataforma em vez de citá-los de memória
   (eles mudam, e a página de quotas do Apps Script diz isso explicitamente);
2. **medir a linha de base** do que já existe, quando for alcançável — `curl -w`
   resolve latência, tamanho e cabeçalhos de cache em um comando;
3. mostrar a **aritmética**: usuários × requisições × duração, e o ponto em que o
   limite é atingido;
4. separar o **verificado** do **inferido**, dizendo qual é qual.

Cuidado com uma armadilha específica do Apps Script: as cotas são por *usuário
efetivo*. Com `executeAs: "USER_DEPLOYING"`, todos os agentes dividem o pool de 30
execuções simultâneas **do mantenedor** — não têm 30 cada. Isso já vale para o
`jsonpFetch` de hoje, não só para propostas futuras.

---

## Script versionado é chamado pelo interpretador (`bash x.sh`), nunca por `./x.sh`

**Why**: o `scripts/promote-deployment.sh` foi criado, `chmod +x` rodou sem erro,
`bash -n` passou, o commit entrou — e o deploy da `refactor-structure` morreu com
`Permission denied` / exit 126 (2026-08-21). O motivo: este repositório vive num
volume Windows montado (`/mnt/c/...` no WSL), e o drvfs não persiste o bit de
execução. O `chmod` "funciona" localmente e o git grava `100644` mesmo assim, então
o erro só aparece no CI, depois do merge — e, por causa do `needs:` entre os jobs,
derruba o deploy inteiro, não só aquele step.

O sintoma é traiçoeiro porque tudo que se testa localmente passa: a sintaxe, a
execução via `bash`, o `git add`. O único lugar onde a diferença aparece é
`git ls-files -s`, que mostra `100644` onde se esperava `100755`.

**When to apply**: ao adicionar **qualquer** arquivo executável ao repositório.

- No workflow/`package.json`, invoque pelo interpretador — `bash scripts/x.sh`,
  `node scripts/x.mjs` —, que é o que o resto do `scripts/` já faz.
- Se ainda assim quiser o bit correto no git (para quem clona em Linux), ele
  precisa ser setado no índice, não no filesystem:
  ```bash
  git update-index --chmod=+x scripts/x.sh
  git ls-files -s scripts/x.sh   # confirme 100755
  ```

---

## Texto escrito pelo agente entra no DOM por `textContent`, nunca por `innerHTML`

**Why**: na revisão dos atalhos do Ctrl+K (2026-08-20), o **nome** do atalho
estava correto (`textContent`) mas o **apelido de busca** era interpolado num
template de `innerHTML`, junto com o resto da linha de metadados. Um apelido com
`<` já quebrava a exibição, e um apelido com `<img src=x onerror=...>`
**executava** — provado revertendo a correção e vendo o smoke acusar "o HTML do
apelido foi executado". É self-XSS (dado do próprio agente), mas o blob de
preferências passa pela planilha e volta, e o custo de errar isso é zero-benefício.

O padrão que evita a classe inteira: montar a linha com `document.createElement`
+ `textContent` para as partes que vêm da pessoa, e reservar `innerHTML` para
markup **nosso** (ícones, estrutura). Quando os dois se misturam numa string, é
questão de tempo até um campo novo entrar na parte errada.

**When to apply**: em qualquer render que interpole valor digitado pelo agente —
atalhos, snippets da Biblioteca, nomes de rascunho, campos do BAU Form. Vale
também para `title=`/`aria-label=` dentro de template string, e para o
`promptDialog()` de `utils.js`, que hoje injeta o `defaultValue` num
`value="${...}"`.

## Não pendure dado novo dentro de uma estrutura que a Central de Conteúdo reescreve

**Why**: os atalhos do Ctrl+K nasceram como um campo `quickLaunch` dentro de dois
cenários de `notes-data.js`. Parecia o lugar óbvio — o atalho *é sobre* aquele
cenário. Mas `applyNoteTemplateContent()` (note-templates-service.js) **apaga
`scenarioSnippets` inteiro** e o repovoa com o que veio da Central, cujos ids são
derivados (`cw-<substatus>-<slug>`) e cujo payload carrega apenas `type`,
`substatus` e os campos de texto. No dia em que o módulo `note_template` fosse
publicado, o `filter(([, d]) => d.quickLaunch)` do palette passaria a devolver
zero e os dois atalhos sumiriam da tela do agente **sem erro nenhum, sem log,
sem nada**. Ninguém teria ligado o desaparecimento à publicação do conteúdo.

A mesma armadilha vale para qualquer campo extra pendurado ali: `linkedTask` e
`activeTasks` só sobrevivem porque o serviço os copia explicitamente.

**When to apply**: antes de adicionar um campo a `scenarioSnippets`,
`EMAIL_TEMPLATES`, `LINKS_DB`, `callScriptData` ou qualquer outra estrutura que
um serviço da Central reescreva — pergunte "quem reconstrói isto, e vai copiar
meu campo?". Se o dado é do **agente** (preferência, configuração), ele não
pertence ao catálogo de conteúdo de jeito nenhum: guarde numa entidade própria e
referencie o item do catálogo por id, com resolução tolerante para o caso de o
id mudar de forma. Se é conteúdo mesmo, o serviço e o gerador de seed precisam
carregá-lo explicitamente — e um teste tem que provar o round-trip.

## Ao traduzir, separe "texto que a pessoa lê" de "texto que atravessa fronteira de sistema"

**Why**: na tradução PT→ES (2026-08-19), três textos pareciam iguais aos outros mas
não eram, e traduzir qualquer um deles teria quebrado o produto **sem erro
visível**:

- os tokens dos templates de e-mail (`[Nome do Cliente]`, `[INSERIR URL]`) são a
  chave que casa o corpo do e-mail com o campo preenchido pelo agente
  (`placeholders[].key` → `input.dataset.key`) e com os `replace()` de
  `email-automation-service.js`. Traduzidos, o e-mail sairia com o placeholder
  cru no lugar do dado;
- o `value` dos menus "Motivo da Não Implementação"/"Motivo do Descarte" do BAU
  Form é gravado na coluna `Motivo_Abertura` da planilha, usada para agrupar
  casos. Traduzido, os relatórios passariam a contar PT e ES como categorias
  diferentes;
- o placeholder `{DIA}` dentro dos cenários de nota é substituído em runtime.

A regra que saiu disso: o texto exibido e o valor transmitido são coisas
distintas mesmo quando hoje são a mesma string. Ao traduzir, desacople os dois —
mostre no idioma da pessoa, transmita sempre no valor canônico (PT).

**When to apply**: antes de traduzir qualquer string, pergunte "alguém além do
olho humano lê isso?" — backend, planilha, `replace()`, `dataset`, chave de
objeto, comparação `===`. Se sim, o valor não pode mudar por idioma. Vale também
para o caminho inverso: ao ler de volta (ex: desmarcar um cenário comparando o
texto atual do campo), compare contra a origem canônica, não contra o que está
renderizado.

## Cobertura de tradução se verifica com script, não com leitura

**Why**: os mapas de tradução (`SCENARIO_ES`, `EMAIL_TEMPLATES_ES`,
`SCREENSHOT_LABEL_ES`, `LINK_DESC_ES`) caem no português quando a chave não
existe — o que é o comportamento certo (nunca quebra), mas torna um erro de
digitação numa chave **invisível**: o item simplesmente aparece em PT, igual a um
item ainda não traduzido. Rodar um script sobre os dados reais (importando o
próprio módulo) achou o que a leitura não acharia e provou de uma vez: todos os
itens cobertos, nenhum campo de texto esquecido, placeholders preservados e PT
idêntico ao original.

**When to apply**: sempre que a tradução usar fallback silencioso. O script deve
checar as duas direções — item sem tradução **e** chave de tradução que não
corresponde a nenhum item. Vale o mesmo para dicionário de UI: comparar as chaves
`pt` e `es` e conferir que toda chave usada em `t()`/`data-i18n` existe.

<!-- Example:

## Palette changes: one mock screen first, then propagate

**Why**: a new primary color was propagated to all 7 prototypes before the user
saw it in context. Verdict: "revert it all" — one full commit/push/deploy cycle lost.

**When to apply**: any *substitutive* visual change (primary color, font, layout
overhaul). Apply on ONE representative screen, get a visual validation, then
propagate. Additive changes (a new utility class) are lower-risk.

-->
