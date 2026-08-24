<!-- generated-by: groundrules v1.10.0 -->
# Architecture Decisions (ADR)

This folder contains the project's **Architecture Decision Records**: each structural decision made during the project is recorded in a file.

## Format

Inspired by [Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions). See `0000-template.md`.

## Naming convention

`NNNN-title-kebab.md` where NNNN is a 4-digit incremental integer.

Examples:
- `0001-database-choice.md`
- `0002-auth-pattern.md`

## When to create an ADR

When a decision:
- has a **long-term impact** on the architecture
- is **hard to reverse**
- has **explicit tradeoffs** worth documenting
- might be **revisited later** (better to freeze the context now)

No ADR needed for trivial choices or implementation details.

## Index

| # | Title | Status | Date |
|---|---|---|---|
| 0000 | Template | — | — |
| [0001](0001-i18n-pt-es.md) | Bilinguismo PT/ES: idioma de sessão e separação entre interface e conteúdo | Accepted | 2026-08-19 |
| [0002](0002-atalhos-ctrl-k-por-agente.md) | Atalhos do Ctrl+K por agente e preferências de usuário na nuvem | Accepted | 2026-08-19 |
| [0003](0003-rename-repo-to-case-wizard.md) | Rename the repository to `case-wizard` | Accepted | 2026-08-20 |
| [0004](0004-implantacoes-apps-script-por-branch.md) | Uma implantação do Apps Script por branch, promovida pelo CI | Accepted | 2026-08-21 |
| [0005](0005-hospedagem-e-integridade-do-bundle.md) | Hospedagem e integridade do bundle | **Proposed** | 2026-08-24 |
