# 0009 — Papéis da Central como dado editável, não como constante do código

**Date**: 2026-09-02
**Status**: Accepted — implementado no servidor em 2026-09-04

## Context

`CONTENT_ROLES` (`gas-backend/ContentAPI.js`) é uma constante com quatro papéis
fixos — ADMIN, TL, QA, WFM —, cada um com uma lista `propose` de módulos e três
booleanos (`approve`, `manageAccess`, `selfApprove`). A aba `Content_Access`
guarda apenas LDAP → papel.

Isso significa que **toda mudança de permissão custa um deploy**: dar links a um
QA, ou criar um papel que publica aviso mas não mexe no catálogo, exige editar
código, passar pelo CI e promover a implantação. A operação tem segmentos e
cargos com necessidades diferentes, e a granularidade de quatro papéis fixos não
cobre o que o time precisa distinguir.

A pressão já é visível no próprio código: o módulo `people` (ADR-0006) precisou
de duas regras que a matriz de papéis não sabia expressar — só o ADMIN aprova, e
quem não propõe também não lê — e as duas entraram como **constantes novas**
(`CONTENT_ADMIN_ONLY_APPROVAL_MODULES`). Cada exceção de permissão que aparece
vira mais um conjunto no arquivo, ao lado de `CONTENT_DIRECT_PUBLISH_MODULES`.
É o sintoma de um modelo que precisa de mais eixos do que tem.

A restrição que molda o desenho: a UI **não é a fronteira de segurança** —
`assertContentRole_()` já revalida toda ação no servidor, e é assim que deve
continuar. O que muda é apenas de onde vem a resposta de "o que este papel
pode".

## Decision

Os papéis passam a viver numa aba nova, `Content_Roles` (papel → permissões em
JSON, mais `Active`, `Updated_By`, `Updated_At`), semeada com os quatro papéis
atuais para que **nada mude no dia 1**. `Content_Access` continua como está:
LDAP → papel, um eixo só.

O modelo de permissão vira uma **matriz módulo × ação** — `ver`, `propor`,
`aprovar`, `publicar direto`, `reverter` — mais um conjunto de permissões
globais, que não são por módulo: `gerenciar acessos`, `gerenciar papéis`,
`ver auditoria completa` e `aprovar a própria proposta`. `propor` e
`publicar direto` são colunas distintas de propósito: é exatamente essa
diferença que hoje separa TL de WFM, e que a lista única `propose` não consegue
expressar. `ver` também é coluna própria, e não um implícito de quem tem acesso:
o módulo `people` já precisa esconder a leitura de quem não propõe.

Três invariantes vivem **no servidor**, como teste, não como validação de tela:

1. **Anti-lockout.** É impossível salvar um estado em que nenhuma pessoa ativa
   tenha `gerenciar papéis` + `gerenciar acessos`. É a generalização da trava de
   pé-na-porta que hoje só cobre o autorremover.
2. **Escalação declarada.** `propor` + `aprovar` + `aprovar a própria proposta`
   no mesmo papel é publicação unilateral. Continua possível — o ADMIN depende
   disso —, mas a tela precisa dizer isso em voz alta antes de salvar.
3. **Revogação imediata.** Permissão cacheada (ADR-0008) é invalidada no ato da
   alteração, não expirada por TTL.

Se a aba `Content_Roles` não existir ou vier corrompida, o servidor cai para a
constante `CONTENT_ROLES` do código — mesma filosofia já usada em
`getSubstatusDef_()`: degradar é melhor que trancar todo mundo do lado de fora.

## Alternatives considered

- **Permissão por pessoa, sem papel** (matriz direto em `Content_Access`):
  máxima flexibilidade e o pior custo de manutenção — vinte pessoas viram vinte
  matrizes para auditar, e "por que fulano consegue X" deixa de ter resposta
  curta.
- **Manter `CONTENT_ROLES` no código e só adicionar papéis novos**: mantém a
  permissão sob code review, que é uma proteção real, mas não resolve o problema
  declarado (personalizar por segmento sem deploy) e faz a lista de papéis
  crescer indefinidamente.
- **Papel na planilha com herança entre papéis** (TL herda de QA, etc.): elegante
  no papel, difícil de auditar na tela — "o que este papel pode" deixa de ser
  legível numa matriz e passa a exigir resolver uma cadeia.
- **Seguir criando constantes por exceção** (o caminho que
  `CONTENT_ADMIN_ONLY_APPROVAL_MODULES` inaugurou): é o menor esforço a cada
  caso isolado, e o que produz, em algumas iterações, uma matriz implícita
  espalhada por vários conjuntos — impossível de ler numa tela e fácil de
  contradizer.
- **Permissão por segmento (PT/ES) além de por módulo**: rejeitada por ora. É
  uma terceira dimensão na matriz, e o caso de uso ("quem publica aviso em ES")
  ainda não apareceu de fato. Fica registrado como extensão possível.

## Consequences

### Positive
- Criar ou ajustar um papel deixa de exigir deploy.
- `propor` e `publicar direto` viram permissões separadas, o que permite montar
  papéis que hoje não existem — por exemplo, quem publica disponibilidade sem
  tocar no catálogo.
- A matriz é uma resposta legível a "o que este papel pode", que hoje só existe
  lendo código.

### Negative / Tradeoffs
- **A permissão sai do code review.** Hoje um papel errado é pego na revisão do
  PR; depois desta mudança, um *checkbox* errado não dá erro, não aparece em
  teste e não avisa ninguém — só concede. É o risco central deste ADR, e o que
  justifica as três invariantes serem servidor + teste, e não validação de tela.
- Toda alteração de papel precisa ir para a auditoria com **antes e depois**, e
  o diálogo de confirmação precisa mostrar o que *muda*, não o estado final.
- Editar o próprio papel passa a valer imediatamente, o que exige confirmação
  à parte e recarregar a sessão.
- Mais uma aba na planilha para semear, migrar e fazer backup.

### Neutral
- Nenhuma mudança em `assertContentRole_()` como *porta*: continua sendo o
  ponto único de verificação de escrita. Só a origem do dado muda.
- Os quatro papéis atuais viram presets, então quem já tem acesso não percebe
  nada no dia da migração.

## Notes

- Pedido explícito do dono do produto em 2026-09-02, revertendo a recomendação
  inicial da revisão de UX (que sugeria adiar). A ordem no plano — depois do
  cache e da casca nova — é dependência técnica, não prioridade: precisa do
  cache do ADR-0008 para poder invalidá-lo e da casca do ADR-0007 para a matriz
  caber na tela.
- Esquema da aba nova em `specs/data-models/db-schema.md`; contrato das funções
  em `specs/data-models/api-payloads.md`.

## Correção de rota durante a implementação

**"Só o ADMIN aprova `people`" não podia continuar sendo sobre o nome do
papel.** O ADR previa `CONTENT_ADMIN_ONLY_APPROVAL_MODULES` deixando de ser
necessário, com a matriz expressando a regra. Só que a regra de ADR-0006 não é
"quem se chama ADMIN decide": é "quem decide uma mudança de autorização precisa
já controlar autorização" — e amarrar isso a uma string que a própria matriz
torna editável é amarrar a nada.

A constante virou `CONTENT_APPROVAL_REQUIRES_GLOBAL = { people: 'manageAccess' }`
e ganhou o papel de **quarta regra estrutural**: aprovar `people` exige a casa da
matriz *e* a permissão global de gerenciar acessos. É a única casa que um
checkbox não abre sozinho, e ela é recusada duas vezes — ao salvar o papel (para
a matriz nunca mentir na tela) e de novo na aprovação (para uma edição à mão na
planilha não valer).

**A trava de pé-na-porta foi substituída, não somada.** Antes: "o ADMIN não
remove o próprio acesso". Isso bloqueava a saída legítima de um entre dois
admins e não cobria remover o *outro*. A invariante 1 responde a pergunta certa
— *sobra alguém capaz de devolver o acesso?* — e vale igual para uma mudança de
acesso e para uma mudança de papel.

**`propor` num módulo de publicação direta não existe**, e vice-versa: um módulo
tem um caminho de escrita só. Marcar a casa impossível como inexistente (e não
como existente e falsa) é o que impede a tela de oferecer um checkbox inócuo e o
que impede a matriz de afirmar "este papel não aprova avisos" sobre um módulo em
que aprovar não é uma operação.
