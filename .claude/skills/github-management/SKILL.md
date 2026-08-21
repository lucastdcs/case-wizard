---
name: github-management
description: Gerenciar o GitHub do Case Wizard — abrir e curar issues, labels, milestones, Projects, Releases, wiki e discussions pelo `gh` CLI. Use quando pedirem para "abrir issue", "criar label", "organizar o backlog", "montar um project", "publicar release", "criar wiki", ou qualquer curadoria do repositório. Também quando alguém descrever um problema ou uma ideia que deveria virar issue em vez de virar código agora.
metadata:
  author: lucas
  version: "1.0.0"
---

# Gerenciar o GitHub do Case Wizard

Tudo aqui é feito pelo `gh` CLI, no repositório `lucastdcs/case-wizard`.

**Antes de qualquer coisa em lote** (mais de ~3 issues, criar labels, mexer em
milestone): descreva o que vai criar e espere aprovação. Criar 20 issues erradas
custa mais tempo para desfazer do que para revisar antes.

---

## Verificar antes de escrever

Duas checagens que evitam a maior parte do retrabalho:

```bash
gh repo view --json nameWithOwner,defaultBranchRef   # é o repo certo?
gh auth status                                        # tem os escopos? (repo, workflow, project)
```

E, para uma issue de bug: **confirme que o bug ainda existe** na branch de
integração antes de abrir. O checkout local costuma estar atrás.

```bash
git fetch origin
git archive origin/refactor-structure | tar -x -C /tmp/atual
```

Issue de bug já corrigido é ruído que alguém vai gastar tempo investigando.

---

## Issues

### O formato que este projeto usa

Bug — cinco blocos, nesta ordem:

```markdown
**Sintoma.** O que acontece, do ponto de vista de quem usa.

**Causa.** Com `arquivo:linha`. Se não investigou, omita o bloco.

**Correção proposta.** Se depende de uma escolha de produto, escreva a
**pergunta** em vez de uma solução fechada, e marque `precisa decisão`.

**Como verificar.** O `npm run test:*` existente, ou o passo manual.

**Evidência.** Log, medição, saída de console. O que provou que é real.
```

Ideia/melhoria — três blocos: **Contexto** (o que existe hoje, com referências
ao código), **O que fazer**, **Em aberto**.

### Regras que valem mais que o formato

- **Uma issue, um problema.** Agrupe só o que se corrige no mesmo commit.
- **Aponte `arquivo:linha`.** É o que separa uma issue que alguém pega de uma
  que precisa ser reinvestigada do zero.
- **Registre o que você mediu**, não o que você supõe. Se rodou algo e viu a
  saída, cole a saída.
- **Não transcreva o pedido.** Se o usuário descreveu um sintoma, vá ao código
  e descubra a causa antes de abrir. A issue vale pelo que ela acrescenta.
- **Referências cruzadas de verdade.** `#301` cria vínculo navegável; "ver a
  issue de segurança" não.

### Comandos

```bash
gh issue create -R lucastdcs/case-wizard \
  --title "..." --body-file corpo.md \
  --milestone "Backlog" \
  --label "bug" --label "severidade: alta" --label "área: backend"

gh issue list -R lucastdcs/case-wizard --milestone "Backlog" --limit 30
gh issue edit 296 --body-file novo.md      # substitui o corpo
gh issue comment 296 --body "..."          # acrescenta — prefira para correções
gh issue close 296 --reason completed
```

**Corpo sempre por `--body-file`.** Markdown com crase, `$` ou aspas dentro de
`--body` vira escape shell e corrompe silenciosamente.

⚠️ **Em zsh, `$var` não sofre word-splitting.** Um `for pair in "300 d1"; do set -- $pair`
não divide — `$1` recebe a string inteira. Use função com parâmetros nomeados ou `${=var}`.

---

## Labels

Três eixos, e uma label não deve misturar dois:

| Eixo | Valores |
|---|---|
| Severidade | `severidade: crítica` · `alta` · `média` |
| Área | `área: backend` · `frontend` · `ci-cd` · `docs` · `comando` |
| Tipo | `tipo: segurança` · `a11y` · `performance` · `pesquisa` · `design` |

Mais as nativas `bug`, `enhancement`, `documentation`, e `precisa decisão` para
o que está bloqueado numa escolha de produto.

```bash
gh label create "nome" --color RRGGBB --description "..." --force
gh label list --limit 40
```

Antes de criar uma label nova, pergunte se ela é um **quarto eixo** ou só um
valor novo num eixo existente. Taxonomia que cresce sem critério deixa de filtrar.

---

## Milestones

Milestone é **quando**; label é **o quê**. Não crie milestone para agrupar tema —
isso é label, ou Project.

```bash
gh api repos/lucastdcs/case-wizard/milestones -f title="..." -f description="..."
gh api repos/lucastdcs/case-wizard/milestones --jq '.[] | "#\(.number) \(.title)"'
```

Os que existem: `v6.1 — Correções da auditoria`, `v6.2 — Fluxo BAU`,
`v6.3 — Segurança do backend`, `E-mails`, `Comando como centro`,
`Estudos e decisões`, `Backlog`.

---

## Projects (v2)

Precisa do escopo `project`: `gh auth refresh -s project`.

```bash
gh project list --owner lucastdcs
gh project create --owner lucastdcs --title "Roadmap Case Wizard"
gh project item-add <número> --owner lucastdcs --url <url-da-issue>
gh project field-list <número> --owner lucastdcs
```

Use Project quando precisar de **ordem e estado** (backlog → fazendo → revisão),
que milestone não expressa. Não duplique no Project o que já está em label.

---

## Releases

**O `release.yml` já faz isso.** Uma tag `vX.Y.Z` empurrada dispara o workflow,
que extrai a seção do `CHANGELOG.md` e publica o Release. Não crie release à mão
— você contorna as duas guardas (tag × `package.json`, e existência da seção).

Antes de criar a tag, na ordem do `RELEASE.md`:

1. fechar a seção no `CHANGELOG.md` (`[Unreleased]` → `[X.Y.Z] - data`)
2. alinhar `package.json`, `APP_VERSION` e `RELEASE_NOTES.version` no mesmo commit
3. merge para a `main` ← **isto é o que promove produção**
4. tag na `main` ← isto só publica as notas

```bash
git checkout main && git pull
git tag -a v6.0.0 -m "v6.0.0"
git push origin v6.0.0
gh release list
```

⚠️ **Tag não faz deploy, e não pode passar a fazer.** O `RELEASE.md` estabelece
que o merge para a `main` é o único portão de produção. Se alguém pedir para a
tag disparar deploy, isso quebra a invariante — levante antes de implementar.

---

## Wiki

A wiki é um repositório git separado (`<repo>.wiki.git`), não versionado junto.

Por isso, **prefira `docs/` no próprio repo** para qualquer coisa que precise
andar junto com o código: revisão por PR, histórico no mesmo lugar, e o
`CLAUDE.md` já manda enriquecer doc existente em vez de criar novo. O projeto já
tem `docs/`, `specs/` e `docs/decisions/` com dono claro.

A wiki serve para o que **não** é versionado com o código: onboarding de pessoa
nova, notas de reunião, links úteis.

```bash
git clone https://github.com/lucastdcs/case-wizard.wiki.git
```

---

## Onde cada coisa mora neste projeto

Antes de criar documento novo, confira se já não existe dono:

| Conteúdo | Lugar |
|---|---|
| Como publicar, ambientes, rollback, tags | `RELEASE.md` |
| O que mudou em cada versão | `CHANGELOG.md` |
| Decisão arquitetural e o porquê | `docs/decisions/` (ADR) |
| Regra de negócio, contrato de dados | `specs/` — **é a lei; se o código diverge, o código é que corrige** |
| Visão geral da arquitetura | `docs/ARCHITECTURE.md` |
| Convenções para o agente | `CLAUDE.md` |
| Como contribuir (humano) | `CONTRIBUTING.md` |
| Aprendizado, armadilha encontrada | `docs/LEARNINGS.md` |

---

## Armadilhas já encontradas

- **Sessão isolada em worktree recusa comando composto.** Rode `gh` a partir do
  diretório principal, ou saia do worktree (`ExitWorktree`) antes do lote.
- **`--body-file` só lê caminho existente.** Se o heredoc que criava o arquivo
  estava no mesmo comando que foi recusado, o arquivo não existe — confira antes.
- **Placeholder de referência cruzada.** Ao criar issues em lote que se citam,
  escreva `#<ID>` e resolva depois com `gh issue edit`, quando os números
  existirem. Não chute número.
- **O repo foi renomeado** de `techsol_DialIn_AutoCopy` para `case-wizard`. O
  nome antigo hoje é um **repositório shim** que mantém os bookmarklets vivos —
  criar o shim **consumiu o nome e encerrou o redirect do git**. Não confie no
  nome antigo em script nenhum; ver `docs/decisions/0003-rename-repo-to-case-wizard.md`.
