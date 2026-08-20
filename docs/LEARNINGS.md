<!-- generated-by: groundrules v1.10.0 -->
# Learnings — Case Wizard

Rules learned from corrections and non-trivial discoveries during the project. Reverse-chronological order (newest at the top). **Re-read at session start.**

One entry = one **actionable rule**, not a journal note. Each entry has:
- a title that states the rule (imperative or "X: do Y");
- **Why** — the story behind it: what happened, what it cost (a revert, a lost CI cycle, a confused user…);
- **When to apply** — the concrete trigger conditions, so the rule fires at the right moment instead of being remembered too late.

Include the minimal code snippet / command when it is the fix.

---

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
