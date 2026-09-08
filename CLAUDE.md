<!-- generated-by: groundrules v1.10.0 -->
# CLAUDE.md — Case Wizard

> This file is **mutable and iterative**. Update it after every Claude mistake or newly discovered convention. Target: < 200 lines.

## Session start — read first, in order

1. `PLAN.md` — where the project stands **now**
2. `docs/LEARNINGS.md` — rules learned from past corrections (apply them!)
3. `docs/VISION.md` — goal, scope, non-goals
4. `specs/_MASTER_RULEBOOK.md` — the project's actual coding-conventions law (front-end stack restrictions, naming, banned frameworks) — read before writing any code
5. The artifacts of whatever is in progress per `PLAN.md`

<!-- Adjust this list to your project: keep it short, ordered, and current. -->

## Capture at checkpoints (don't wait to be asked)

The agent can't perceive "end of session" — so capture at the **work boundaries it *can* see**, and **propose it proactively** there without waiting for the user:

- **Before a `git push`, a tag, or a release** — the highest-value, most reliable moment: pause and capture *before* shipping.
- **When a `PLAN.md` milestone is completed**, or after a substantial chunk of work.

You can also trigger it yourself any time with **`/groundrules:checkpoint`**.

At that moment, three questions, each routed to where it belongs:

1. **Decided** anything structural? → `/groundrules:add-adr` (`docs/decisions/`)
2. **Learned** something that changes how to work here (incl. a blocker that cost 30+ min, with its fix)? → `/groundrules:learn` (`docs/LEARNINGS.md`)
3. **Caught the agent** repeating a mistake, hallucinating, or drifting? → note it in `docs/AGENT-EVALS.md` (if present) and add the guard here or in `.claude/rules/`

Capture beats memory: if it's not written to the repo, it's gone next session.

## Description

TechSol Operations Assistant — a productivity and automation suite for a corporate CRM, delivered as a JavaScript bookmarklet. It injects a DOM overlay on top of the native CRM (no browser extension), adding case-note generation, email-draft automation, a BAU escalation workflow, call scripts, timezone planning, and Material-Design-style UX/sound feedback for support agents. Backend is Google Apps Script (JSONP API) over a Google Sheet.

## Setup / Build / Test

> **Critical test**: a new dev (or Claude) should be able to run the project and its tests **first try** using the commands below. If that's not the case, fill this section before anything else.

- Install deps: `npm install`
- Run dev: `npm run dev` — builds `dist/bundle-dev.js`; there is no localhost target, load it into the real CRM via the Dev bookmarklet (see `README.md`)
- Test: `npm run test:content` · `test:call-script` · `test:emails` · `test:note-templates` · `test:shortcuts` · `test:prefs` · `test:deployment-env` — node harnesses that stub the browser/Apps Script globals (there is no runner: each script exits non-zero on failure). `npm run smoke:shortcuts`, `smoke:wizards`, `smoke:env-badge` and `smoke:broadcast` drive the agent UI with Playwright over `mock-crm.html`; `smoke:content` and `smoke:people` drive the Apps Script dashboards, loaded from disk with `google.script.run` doubled. Anything not covered by these is still verified by hand via the Dev bookmarklet on the CRM plus the Apps Script execution log (see `README.md` → Testing)
- Lint: none configured
- Build: `npm run build` — builds `dist/bundle.js` (minified, production)

## Key files and folders

- `README.md` — public presentation
- `CLAUDE.md` — this file
- `PLAN.md` — active todo, maintained during work
- `docs/` — project documentation
  - `docs/decisions/` — ADRs (one file per structural decision)
  - `docs/LEARNINGS.md` — learnings throughout the project (reverse-chronological)
  - `docs/ARCHITECTURE.md` — architecture snapshot
  - `docs/GLOSSARY.md` — domain vocabulary
  - `docs/WORKFLOW.md` — dev/build/deploy process (fills the PROCESS.md role)
- `specs/` — **the team's actively-maintained source of truth** for business rules, payload contracts, DB schema, and UI/DOM standards (`specs/_MASTER_RULEBOOK.md` is the entry point). Kept in sync with the code; overrides code when they diverge.
- `gas-backend/` — Google Apps Script backend, synced via `clasp` (see `RELEASE.md`)
- `intake/` — upstream notes (read this folder for domain context at session start)
- `docs/media/` — visual assets
- `.claude/` — Claude Code config
  - `.claude/settings.json` — team config, checked into git
  - `.claude/rules/*.md` — auto-loaded rules (`paths:` frontmatter for scoping)
  - `.claude/commands/`, `.claude/skills/`, `.claude/agents/`, `.claude/hooks/` — automations

## Conventions

### Commits

Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Small and atomic. Don't mix refactor and feature.

### Code

JavaScript (ES modules), Vanilla JS only — **no framework** (React/Angular/Vue/jQuery/Axios are explicitly banned by `specs/_MASTER_RULEBOOK.md` unless authorized), bundled with esbuild. Styling is CSS-in-JS, no external stylesheets. Backend is Google Apps Script (V8 runtime). Naming: `camelCase` functions, `UPPER_SNAKE_CASE` constants/status values, kebab-case CSS classes — see `specs/_MASTER_RULEBOOK.md` for the full convention set.

Readability > cleverness. No premature abstractions. No comments paraphrasing code — reserve them for non-obvious "why".

### Permissions and settings

- Pre-allow safe permissions via `/permissions` (e.g., `"Bash(npm run *)"`, `"Bash(git status)"`)
- Team config in `.claude/settings.json`, checked into git
- For subfolder-specific rules: `.claude/rules/<topic>.md` with `paths:` frontmatter rather than bloating this file

## Posture

How I want you to work with me — not just *what* to do.

**Push back.** Don't be sycophantic — your job is to help me be *right*, not to agree with me.
- Challenge a plan that looks off-strategy, technically wrong, or inconsistent with a past decision (`docs/decisions/`, `docs/LEARNINGS.md`).
- Surface tradeoffs I may have missed ("this works, but costs you in perf/maintainability").
- If a request is ambiguous, **ask before acting** — don't guess.
- To stress-test a plan, ask for a **premortem** ("assume it failed — why?"), not a thumbs-up: reframing the request as a critique elicits far less sycophancy than asking "is this good?" (`/groundrules:premortem`).

**Stay reversible.** Interrupting with a question is always cheaper than destroying something silently.
- **Confirm before any hard-to-undo action**: deletion, migration, mass rewrite, destructive command. When in doubt, stop and ask.
- Safety nets to lean on: work in git and commit often (the ultimate net); `/rewind` (or `Esc Esc`) restores pre-edit checkpoints. Optionally add a `.claude/settings.json` `deny` list and a `PreToolUse` guard for destructive commands (harness-specific — not generated for you).

**Keep the diff small.** *Would a senior engineer call this overcomplicated?* — if yes, it probably is.
- **Simplicity first** — write the minimum that solves the *stated* problem; no speculative features, no abstraction you don't need yet.
- **Surgical changes** — touch only what the task requires; match the surrounding style; don't refactor unrelated code in passing.
- **Clean up only your own mess** — remove an import or helper only when *your* change is what orphaned it.

## Verifying the work

Before declaring a task done:

- Run the test command above
- For UI: actually use the feature — load the Dev bookmarklet on the real CRM (or `npm run portfolio` against `mock-crm.html` for a quick visual check), not just compile
- For backend changes: check the Apps Script execution log, not just the absence of a client-side error
- Produce a **behavior diff** (before/after) — not just "I ran the tests"

> *"Prove to me this works"* — if you can't prove it, it's not done.

## When to document

### ADR — `docs/decisions/`

When a **structural decision** is made (tech, pattern, tradeoff), propose an ADR. Copy `0000-template.md` → `NNNN-title-kebab.md`. Keep it < 1 page.

### LEARNINGS — `docs/LEARNINGS.md`

When a **non-trivial learning** emerges (pitfall avoided, subtle bug, discovered convention), add a dated entry at the top.

### PLAN.md

Keep current: check off done, add emerging tasks, note blockers.

### The repo is the only memory

All project knowledge lives **in this repo** (`docs/LEARNINGS.md`, `docs/decisions/`, `PLAN.md`, this file) — never in machine-local agent state (`~/.claude/` memories or plans). Something learned in a session gets written into the repo docs, not into agent memory; agent memory is for cross-project/personal facts only. **Never reference `~/.claude/*` paths from repo docs** — they don't survive a clone or a machine change. A plan-mode file worth keeping gets copied into the repo before the session ends.

### Keep generated docs current (living docs)

Every file created at bootstrap/adopt is **living** — keep it in sync **in the same change** that makes it stale; don't let it drift. Updating an affected doc is **part of the task**, not a follow-up. Whenever your work touches one of these areas, update the matching file (if present):

- `README.md` — when a change makes it inaccurate
- `docs/VISION.md` — goal / users / scope / constraints change
- `docs/ARCHITECTURE.md` — structure / components / stack change
- `specs/data-models/*` — schema / entities / access rules change (this project's DATA_MODEL role)
- `specs/ui-ux/*` — visual/interaction rules change (this project's DESIGN_SYSTEM role)
- `docs/GLOSSARY.md` · `docs/ROADMAP.md` · `docs/WORKFLOW.md` — their domain changes
- `RELEASE.md` — the release procedure or an observed fragility changes
- `docs/AGENT-EVALS.md` (if present) — when the agent repeats a mistake, hallucinates, or drifts
- `CHANGELOG.md` — add an entry under `[Unreleased]` for any notable change
- `PLAN.md` · `docs/LEARNINGS.md` · `docs/decisions/` — as described above

## Updating this file

This file is alive — but keep it a **map, not the territory**. It is loaded into context at *every* session start, so link to docs and let them be read on demand; don't paste doc content here "to be safe". Oversized always-on context dilutes attention (models degrade as input grows) and busts the prompt cache on every edit.

- When Claude makes a mistake: add a rule so it doesn't recur
- When you spot an unwritten convention: codify it here
- For a rule that **must absolutely survive** file growth: `<important if="situation">rule</important>`
- If the file exceeds 200 lines or a section swells: extract to `docs/` or `.claude/rules/`
- For rules applicable to a certain type of file: prefer `.claude/rules/` with `paths:` rather than putting everything here

> *"Anytime we see Claude do something incorrectly we add it to the CLAUDE.md"* — iterate until the error rate is acceptable.

## Claude Code workflow

- **Match the work to the regime** before diving in (reflection before realization — know your phase):
  - a **decision / fork** (an unsettled choice) → capture it as an **ADR** (`/groundrules:add-adr`) *before* acting
  - a **non-trivial feature** → a **PRD** (`/groundrules:prd`) first, then build against it
  - an **interactive, non-trivial** change → **plan mode** (`shift+tab`) before you start
  - this repo has no `loop/` scaffolding — just build atomic tasks directly
- **`/compact [hint]`** mid-task to compress context; **`/clear`** when switching tasks
- **Git worktrees** for parallel sessions: `claude --worktree <name>`
- **Custom skills/commands** in `.claude/` — if you do something more than once a day, automate it
- **Delegation > pair-programming**: give **goal**, **constraints**, and **acceptance criteria** in the first message, rather than guiding line by line

## Git workflow

- **Feature-branch + PR**: this repo pushes work branches and opens PRs rather than committing straight to `main`. PRs target **`refactor-structure`**, not `main` — `main` only receives a merge once something is ready for production (see `RELEASE.md`).
- Only commit on **explicit request** (never auto-commit at end of task)
- Verify no secrets or debug files are included before committing (watch for `gas-backend/.clasprc.json`, real script/deployment IDs beyond the ones already committed intentionally)

## Don't

- Don't add dependencies without confirming
- Don't commit without explicit request
- Don't create new doc files without need (prefer enriching existing — `specs/` already owns data-model and design-system content, don't duplicate it under `docs/`)
- Don't do opportunistic refactoring mid-feature
- Don't ignore a rule in this file — if it doesn't fit, **modify it**, don't bypass it
- Don't park project knowledge in agent memory or reference `~/.claude/*` from the docs — the repo is the only memory
- Don't use a banned front-end framework/library (React, Angular, Vue, jQuery, Axios) without explicit authorization — see `specs/_MASTER_RULEBOOK.md`

## Tech stack

- **Language**: JavaScript (ES modules), Vanilla JS — no UI framework
- **Bundler**: esbuild
- **Styling**: CSS-in-JS
- **Backend**: Google Apps Script (V8 runtime), synced via `clasp`
- **Data store**: Google Sheets
- **Backend transport**: JSONP (not `fetch`)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages (frontend) + Apps Script deploy (backend)
- **Portfolio/demo assets**: Python 3 + Playwright, driving a static `mock-crm.html` mock

## Notes

Project adopted into [groundrules](https://github.com/lozit/groundrules) on 2026-08-18.
