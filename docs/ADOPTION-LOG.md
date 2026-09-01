<!-- generated-by: groundrules v1.10.0 -->
# Adoption log — Case Wizard

> A **dated, frozen** record of the `/groundrules:adopt` run on **2026-08-18**: what was here, and what
> groundrules did. Its purpose is **feedback to the plugin** — add your remarks below and share this
> file back to improve groundrules. This is **not** `docs/AGENT-EVALS.md` (the agent's behaviour here)
> nor `/groundrules:apply-best-practices` (external recommendations); it's the account of *this run*.

## What was here (before)

- **Stack**: Node/JavaScript (`package.json`, `esbuild`, `playwright`), Vanilla JS frontend bundled into a browser bookmarklet, Google Apps Script backend (`gas-backend/`, synced via `clasp`), Google Sheets as the data store, no database/ORM in the traditional sense.
- **Git**: repo with remote `origin` → `github.com/lucastdcs/case-wizard`. No `.env` files (secrets live in a GitHub Actions secret and hardcoded IDs).
- **Existing documentation was already substantial**:
  - `README.md` — detailed, project-specific (Portuguese), with screenshots and a demo video.
  - `docs/ARCHITECTURE.md`, `docs/CORE_MODULES.md`, `docs/TL_DASHBOARD_DIAGNOSTIC.md`, `docs/WORKFLOW.md`, `docs/verification/` — an established `docs/` folder.
  - `docs/BUSINESS_RULES.md` — a thin pointer stub redirecting to `specs/`.
  - `specs/` — an **actively-maintained source of truth** (`_MASTER_RULEBOOK.md`, `data-models/`, `ui-ux/`, `workflow/`), explicitly declared in its own text as "the absolute law of the project," kept in sync with the code.
- **No `CLAUDE.md`** at the project root.
- **No global/enterprise CLAUDE.md** found (`~/.claude/CLAUDE.md`, macOS/Linux managed paths all absent) → no deference note needed, no AI-attribution policy detected anywhere.
- **No `PLAN.md`/`TODO.md`/`TASKS.md`/`BACKLOG.md` equivalent** found anywhere in the repo (case-insensitive search, depth 3).
- **No `docs/superpowers/`** — not in use.
- CI/CD present (`.github/workflows/deploy.yml`): builds + deploys the frontend to Firebase Hosting (and, during the transition, to GitHub Pages in parallel) and syncs/deploys the backend to Apps Script on every push to `main` or `refactor-structure`. Each branch promotes its own Apps Script deployment; the production gate is the merge to `main`.

## What groundrules did

- **Adoption mode: Map in place.** Given `specs/` and `docs/` are pre-existing, actively-maintained conventions with their own internal logic, nothing was moved or reformatted — groundrules only recorded roles and filled genuine gaps.
- **Project name recorded as "Case Wizard"** (the folder/repo name), chosen over the product-facing "TechSol Operations Assistant" branding. The repository and the `package.json` name were later aligned to `case-wizard` to match (see `docs/decisions/0003-rename-repo-to-case-wizard.md`).
- **Generated** (13 new files, all previously absent): `CLAUDE.md`, `PLAN.md`, `docs/VISION.md`, `docs/LEARNINGS.md`, `docs/GLOSSARY.md`, `docs/ROADMAP.md`, `docs/decisions/README.md` + `0000-template.md`, `docs/media/README.md`, `intake/README.md` + `intake/INTENT.md`, `CHANGELOG.md`, `RELEASE.md`.
- **`docs/VISION.md` synthesis**: source was `README.md` (overview + features + important notes) and `specs/_MASTER_RULEBOOK.md` (philosophy + stack restrictions), captured verbatim into `intake/INTENT.md` first, then synthesized — because neither `docs/BUSINESS_RULES.md` (an empty stub) nor `specs/_MASTER_RULEBOOK.md` alone (conventions, not vision) was a clean single source.
- **Declined optional docs, each for a specific reason** (see `.groundrules.json` → `skippedFiles`):
  - `docs/DATA_MODEL.md` and `docs/DESIGN_SYSTEM.md` were **not generated** even though detection would normally pre-check them — `specs/data-models/*` and `specs/ui-ux/*` already fill those exact roles as the team's maintained source of truth, and duplicating them under `docs/` would fragment that convention.
  - `docs/PROCESS.md` was declined — `docs/WORKFLOW.md` already documents the dev/build/deploy process.
  - `docs/SECURITY.md`, `docs/I18N.md`, `docs/AGENT-EVALS.md` were offered and explicitly declined in the interview.
- **`## Invariants` section**: **not** added to the generated `CLAUDE.md`. The `adopt` skill text reads as if it's unconditional on generation, but cross-checking `bootstrap/SKILL.md` and ADR 0030 confirms it's conditional on the loop opt-in (`HAS_LOOP`) — since loop scaffolding was declined, `CLAUDE.md` stayed lean per that ADR's own reasoning ("the verifier is what gives invariants teeth").
- **Loop scaffolding (`loop/`) declined** — off by default, no strong signal it was wanted here.
- **`PLAN.md` generated** despite not being in the standard Call 3a list, via a follow-up question, once the scan confirmed no equivalent existed anywhere in the repo — `CLAUDE.md`'s own "read first" list expects it to exist.
- **CLAUDE.md content beyond the template's placeholders**: added a step 4 to "Session start" pointing at `specs/_MASTER_RULEBOOK.md` (since it's the real coding-conventions law here), and a "Don't" bullet warning against duplicating `specs/` content under `docs/`, since that redundancy risk is specific to this project's layout.
- **Git workflow section**: recorded as feature-branch + PR targeting `refactor-structure` (not `main`), based on observed repo convention.

## Remarks (fill in, then share back)

> Where did groundrules **not** do what you wanted? Be specific — the sections above give the context
> that makes each remark actionable when harvested into the groundrules repo (→ an idea / ADR / LEARNINGS).

- _e.g. "It skipped X but I'd have wanted Y" / "the CLAUDE.md omitted Z which my global doesn't actually cover" / "the mapping of `<file>` to `<role>` was wrong"_
-

---

Machine-readable detail of this run lives in `.groundrules.json` (`answers`, `generatedFiles`,
`adoptedFiles`, `skippedFiles`, `migratedFiles`). This log is a one-time snapshot — it is **not** kept
in sync as the project evolves.
