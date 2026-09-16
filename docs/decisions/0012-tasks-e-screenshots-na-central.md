# 0012 — Catálogo de tasks e screenshots do Win Criteria na Central de Conteúdo

**Date**: 2026-09-09
**Status**: Accepted — implementado em 2026-09-09, aguardando semeadura na planilha real

## Context

`TASKS_DB` (`src/modules/notes/data/notes-data.js`) é o catálogo das 13 tasks que
o agente marca na nota e, para cada uma, a lista de screenshots que o **Win
Criteria** exige como evidência — em dois modos, `implementation` (o agente
implementou pelo anunciante) e `education` (ensinou o anunciante a implementar).
São 126 rótulos hoje.

Esse conteúdo é do time de qualidade, não do código:

- **Quem sabe não pode mudar.** O Win Criteria vive numa planilha mantida pelos
  SMEs. Quando ele muda — uma evidência nova, um passo que saiu —, a mudança
  precisa de um PR, CI e promoção de implantação. O SME abre um pedido e espera.
- **O bundle mente sem avisar.** Como o `dist/bundle.js` de produção só troca com
  o deploy manual (`RELEASE.md`), um Win Criteria atualizado convive com um
  catálogo antigo na tela do agente por dias, sem nada indicar isso.
- **A tradução mora num mapa paralelo.** O espanhol dos rótulos está em
  `SCREENSHOT_LABEL_ES`, um mapa por frase — a mesma estrutura que os links já
  abandonaram por causa do `LINK_DESC_ES`. Rótulo sem entrada no mapa sai em
  português para o agente ES, e não há tela nenhuma que mostre isso.
- **Criar uma task exige código.** Uma implementação nova (um produto novo, um
  fluxo novo) não tem caminho pela tela: só editando o `TASKS_DB`.

Os outros seis módulos de conteúdo já fizeram essa travessia (links, call script,
modelos de e-mail, modelos de nota, dicas, avisos). Este é o que restava com
conteúdo de SME preso em código.

## Decision

O catálogo de tasks vira o módulo **`task_screenshots`** da Central de Conteúdo,
no grupo **Catálogo** — passa pela fila de aprovação como o resto do catálogo.

**Um item por task**, com `lang: 'ALL'` e a tradução dentro do próprio valor:

```json
{
  "name": "Ads Conversion Tracking",
  "popular": true,
  "screenshots":    { "implementation": ["Tag criada", "Teste GTM"], "education": [] },
  "screenshots_es": { "implementation": ["Etiqueta creada", "Prueba GTM"] }
}
```

Quatro regras sustentam o desenho:

1. **A tradução é posicional, e do mesmo tamanho da lista base.** A linha 3 do ES
   traduz o screenshot 3; linha em branco quer dizer "sem redação própria" e o
   agente ES lê o texto original. O servidor recusa uma tradução com número de
   linhas diferente da base. O motivo é de conteúdo, não de forma: a
   *quantidade* de evidências que o Win Criteria exige não muda com o idioma, e
   um campo a menos em ES é uma nota incompleta que ninguém percebe.
2. **A chave é identidade e não muda.** `linkedTask` nos modelos de nota, os
   rascunhos salvos do agente e os atalhos do Ctrl+K todos guardam a string da
   chave. Renomear desligaria tudo isso em silêncio, então a chave é validada no
   formato, é única entre as tasks no ar, e é de leitura depois de criada —
   trocar exige tirar do ar e criar outra.
3. **Conteúdo publicado é autossuficiente.** O mapa embutido
   (`SCREENSHOT_LABEL_ES`) não entra como terceira fonte para uma task que veio da
   Central: se entrasse, a prévia "como o agente vê" — que não conhece o código do
   bundle — mentiria justamente no caso que ela existe para mostrar, e uma
   tradução antiga do código sobreviveria a uma correção do rótulo em PT. A
   semeadura materializa o mapa por task, então no dia 1 nada muda (o
   `test:tasks` compara as duas rotas rótulo a rótulo).
4. **O `TASKS_DB` continua no código como fallback**, exatamente como links,
   dicas e cenários: primeiro load sem cache e offline, e Central fora do ar no
   meio de um atendimento. Deixa de ser a fonte da verdade, e o comentário no
   arquivo diz isso.

O `QA` ganha o módulo no preset de papéis: é o papel que já cura roteiro e
modelos de nota pelo mesmo motivo — correção de conteúdo.

## Alternatives considered

- **Uma linha por idioma (`lang: PT` e `lang: ES`), como os modelos de nota.**
  Rejeitado: o número de screenshots passaria a ser duas decisões
  independentes, e nada impediria PT pedir seis evidências e ES pedir quatro
  para o mesmo Win Criteria. O par PT/ES dentro do valor é a escolha que os
  links já fizeram, e aqui ela protege uma regra de negócio, não só bytes.
- **Um item por screenshot, com a task na coluna `Key`.** Rejeitado: a ordem
  passaria a depender de `Sort_Order` espalhado por 126 linhas, cada mexida na
  lista viraria N propostas, e o histórico deixaria de responder "como esta task
  era antes" — que é justamente a pergunta de auditoria do Win Criteria.
- **Manter o `SCREENSHOT_LABEL_ES` como mapa e publicar só o PT.** Rejeitado:
  metade do conteúdo continuaria exigindo deploy, e é justamente a metade que
  ninguém enxerga hoje.
- **Traduzir também o nome da task.** Rejeitado por ora: hoje o nome nunca foi
  traduzido (são nomes de produto), e um campo a mais no editor pediria trabalho
  de tradução que não muda nada para o agente.

## Consequences

### Positive
- O Win Criteria muda sem deploy, e quem o conhece publica a mudança.
- A cobertura da tradução fica visível: a lista mostra "ES 1/3" por task, e a
  prévia "como o agente vê" aponta a linha que sai sem espanhol.
- Task nova tem caminho pela tela — era o pedido que originou esta mudança.
- Toda alteração passa por revisão, fica versionada e vai para a auditoria, como
  o resto do catálogo.

### Negative / Tradeoffs
- Mais uma migração que precisa ser rodada à mão na planilha (`seedTasksNow()`),
  com a janela de risco de sempre: se o módulo tiver conteúdo publicado pela
  metade, o agente vê o que está no ar, não o embutido.
- O `TASKS_DB` embutido tende a envelhecer em relação à planilha. É o mesmo custo
  que links, dicas e cenários já pagam, e a semeadura regenerável (`npm run
  seed:tasks`) é o que mantém as duas pontas comparáveis.
- Duas caixas de texto lado a lado não impedem o SME de traduzir a linha errada —
  só de desalinhar as posições. A prévia é a rede.
- Um rótulo NOVO que por acaso repita um dos 37 do mapa embutido não ganha a
  tradução de graça (regra 3): o editor mostra quantas linhas seguem sem ES, mas o
  SME digita a redação.

### Neutral
- O `isTagSupportTarget()` (as duas tasks que dispensam evidência quando o Tag
  Support foi usado) segue em código: é regra de fluxo, não conteúdo.

## Notes

- Contrato do payload: `specs/data-models/api-payloads.md` → "Catálogo de tasks".
- Semeadura: `npm run seed:tasks` gera `gas-backend/ContentSeed_Tasks.js`.
- Testes: `npm run test:tasks` (round-trip para o agente, incluindo a prova de
  que o espanhol publicado é igual ao do mapa embutido), `npm run test:content`
  (validação no servidor) e `npm run smoke:content` (a tela real).
- A permissão de um módulo recém-criado numa planilha que já tem `Content_Roles`:
  ADR-0013.
