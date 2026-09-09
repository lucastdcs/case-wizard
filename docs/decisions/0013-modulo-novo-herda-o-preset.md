# 0013 — Módulo novo herda o preset nas casas que a planilha não tem

**Date**: 2026-09-09
**Status**: Accepted — implementado em 2026-09-09

## Context

Descoberto ao acrescentar o módulo `task_screenshots` (ADR-0012).

O comentário de `CONTENT_MODULES` promete que "adicionar um módulo novo é
acrescentar uma string aqui". Depois do ADR-0009 isso deixou de ser verdade, e o
sintoma é pior que um erro: **um módulo novo nasce invisível para todo mundo.**

O caminho é este. `Content_Roles` guarda, por papel, um JSON com a matriz módulo ×
ação. Uma linha gravada hoje lista os módulos que existiam hoje. Quando o código
ganha um módulo, `normalizeRoleMatrix_()` percorre `CONTENT_MODULES` e preenche
com `false` toda casa que não achar no JSON — que é o comportamento certo para
uma casa desmarcada e o errado para uma casa que nunca existiu. Resultado numa
planilha em produção: nem o ADMIN vê a aba, nem consegue propor nada nela. O
módulo só passa a funcionar depois de alguém abrir a aba **Papéis** e marcar as
casas de cada papel, uma a uma — e nada na tela explica por que ele apareceu
vazio.

A semeadura do preset não resolve: ela só roda quando a aba `Content_Roles` é
criada. Numa planilha que já a tem, o preset nunca é reavaliado.

## Decision

`normalizeRoleMatrix_()` passa a receber o nome do papel e, para um módulo
**ausente** do JSON gravado, usa a linha do preset (`contentPresetMatrix_()`)
daquele papel. Módulo **presente** vale exatamente o que está gravado, inclusive
quando está todo desmarcado.

A distinção é a mesma do learning "trava de segurança se escreve como delta, não
como invariante": `{view:false, propose:false}` é uma decisão que alguém tomou e
ela vale; a *ausência* da chave não é decisão de ninguém.

Papel que não existe no preset — um `EDITOR` criado pela tela — não herda nada,
porque não há de quem herdar. A herança só vale na leitura da planilha:
`saveContentRole()` continua gravando exatamente o que a tela mandou.

## Alternatives considered

- **Não fazer nada e documentar o passo manual.** Rejeitado: o custo cai sobre
  quem não causou o problema, no pior momento (o módulo novo aparece quebrado), e
  o modo de falha é silencioso — uma aba vazia é indistinguível de "ainda não
  semeado".
- **Reescrever as linhas de `Content_Roles` na primeira leitura após o deploy.**
  Rejeitado: escrita implícita disparada por leitura, num arquivo que a auditoria
  observa, gravaria uma mudança de permissão sem ator humano no log.
- **Herdar o preset em qualquer casa `false`.** Rejeitado: desfaria a decisão de
  quem desmarcou de propósito, que é o pior desfecho possível numa matriz de
  permissão.

## Consequences

### Positive
- Acrescentar um módulo volta a ser acrescentar uma string, como o código sempre
  prometeu — e o dia do deploy não exige mexer em permissão.
- A regra é legível na tela: a matriz da aba Papéis mostra o módulo novo já com o
  que o preset dava àquele papel, e quem quiser fecha na hora.

### Negative / Tradeoffs
- O preset volta a ter efeito depois do dia 1, o que enfraquece um pouco o "os
  papéis são dado" do ADR-0009: para módulos novos, o código dá a primeira
  palavra. É deliberado — a alternativa é um módulo que ninguém alcança.
- Renomear um módulo em `CONTENT_MODULES` faz o nome novo parecer "ausente" e
  herdar o preset, enquanto o antigo simplesmente desaparece. Renomear módulo
  continua sendo migração de dado, não troca de string.

### Neutral
- Nada muda para os módulos que já existem na planilha.

## Notes

Testes em `scripts/test-content-api.js`, seção "RBAC editável: bordas": a casa
ausente herda, a desmarcada não, e papel sem preset não herda nada.
