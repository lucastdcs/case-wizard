<!-- generated-by: groundrules v1.10.0 -->
# Release — Case Wizard

> Operational **runbook** for shipping. The CHANGELOG records *what* shipped; this file records *how* to ship safely. Update it whenever a release reveals a fragility (pair it with a `docs/LEARNINGS.md` entry).

## TL;DR

```bash
# Day-to-day (dev): push to refactor-structure.
# CI builds dist/bundle-dev.js -> GitHub Pages, pushes gas-backend/ -> Apps Script HEAD,
# AND auto-promotes the pinned dev deployment. Nothing further to do.
git push origin refactor-structure

# Production: merge refactor-structure into main and push.
# CI builds dist/bundle.js -> GitHub Pages and pushes the backend HEAD,
# but does NOT promote the production Apps Script deployment (deliberate).
git checkout main && git merge refactor-structure && git push origin main

# Then, manually, promote the production Apps Script deployment:
cd gas-backend
clasp deploy -i <production-deployment-id> -d "Release $(date -u +%F) - $(git rev-parse --short HEAD)"
```

## Environments

| Env | Trigger | Host / target | URL |
|---|---|---|---|
| Development | push to `refactor-structure` | GitHub Pages (`bundle-dev.js`) + Apps Script dev deployment (auto-promoted by CI) | `https://lucastdcs.github.io/techsol_DialIn_AutoCopy/bundle-dev.js`; Apps Script `.../dev` |
| Production | push to `main` (frontend + backend HEAD) then a manual `clasp deploy` (backend deployment) | GitHub Pages (`bundle.js`) + Apps Script production deployment | `https://lucastdcs.github.io/techsol_DialIn_AutoCopy/bundle.js`; Apps Script `.../exec` |

## Pre-release checklist

- [ ] There is no automated lint/test suite today (see `README.md` → Testing) — verify manually: load the Dev bookmarklet against the real CRM and exercise the changed module(s).
- [ ] **Capture before shipping** (cf. `CLAUDE.md` → "Capture at checkpoints"): anything **decided** → an ADR, **learned / blocked** → `docs/LEARNINGS.md`, an **agent mistake/drift** → `docs/AGENT-EVALS.md`. A push/merge-to-main is the most reliable capture moment.
- [ ] If `gas-backend/` changed: confirm the payload contract in `specs/data-models/api-payloads.md` still matches — more than one frontend module depends on it.
- [ ] Confirm the GitHub Actions secret `CLASPRC_JSON` is still valid (CI fails fast at "Validar integridade do JSON" if not).

## Secrets & configuration

- **`CLASPRC_JSON`** (GitHub Actions secret) — `clasp` OAuth credentials CI uses to authenticate before `clasp push`/`clasp deploy`. Regenerate locally with `clasp login`, then update the repo secret (Settings → Secrets → Actions) with the resulting `~/.clasprc.json` contents.
- **`scriptId`** (`gas-backend/.clasp.json`, committed) — identifies which Apps Script project `clasp push` targets. Same for both branches/environments; only the *deployment* differs.
- **`SCRIPT_ID`** (`src/modules/shared/data-service.js`, hardcoded) — used to build the `/exec` and `/dev` API URLs the frontend calls.
- **`DEPLOYMENT_ID`** (`.github/workflows/deploy.yml`, hardcoded) — the pinned *development* deployment CI auto-promotes on `refactor-structure`. Must match the `SCRIPT_ID` in `data-service.js` used by that branch — update both together if the script is ever rotated.
- **Production deployment ID** — intentionally **not** automated/hardcoded in CI; used manually via `clasp deploy -i <id>` or the Apps Script UI (Deploy → Manage deployments).

## Rollback

- **Frontend (GitHub Pages)**: revert the offending commit on the relevant branch and push again — CI rebuilds and republishes `dist/`.
- **Backend HEAD**: `clasp push -f` from a reverted commit re-syncs the Apps Script editor's HEAD.
- **Backend deployment (the part agents actually hit)**: promote a *previous* version into the deployment — via the Apps Script UI (Deploy → Manage deployments → pick a version) or `clasp deploy -i <deployment-id> -V <previous-version-number>`. Pushing/reverting HEAD alone does **not** roll back a live deployment.

## Known fragilities

- **`clasp push` ≠ live**: it only updates the Apps Script HEAD (visible in the editor) — the `/exec` and `/dev` URLs stay pinned to whatever was last *promoted*. Easy to assume a push "deployed" when it didn't; see `docs/WORKFLOW.md` and `README.md` → Deployment.
- **JSONP watchdog**: every backend call times out client-side after 15s (`jsonpFetch` in `data-service.js`) if Apps Script doesn't respond — a slow/erroring deployment surfaces as a generic timeout in the browser console, not a clear backend error.
- **`github.io` reachability**: the bookmarklet hard-depends on reaching `lucastdcs.github.io`; a corporate network block there is silent failure from the agent's point of view (see `README.md` → Troubleshooting).
- <fill in as you learn>
