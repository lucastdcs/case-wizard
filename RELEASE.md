<!-- generated-by: groundrules v1.10.0 -->
# Release — Case Wizard

> Operational **runbook** for shipping. The CHANGELOG records *what* shipped; this file records *how* to ship safely. Update it whenever a release reveals a fragility (pair it with a `docs/LEARNINGS.md` entry).

## TL;DR

```bash
# Day-to-day (dev): push to refactor-structure.
# CI publishes bundle-dev.js and promotes the DEV Apps Script deployment.
# Production is not touched by this, at all.
git push origin refactor-structure

# Production: merge refactor-structure into main and push. That push is the
# release — CI publishes bundle.js and promotes the PRODUCTION deployment.
# There is no manual step afterwards.
git checkout main && git merge refactor-structure && git push origin main
```

**The merge into `main` is the production gate.** Nothing else promotes production:
no push to `refactor-structure`, no `clasp push` from a laptop, no manual step that
someone has to remember. If the merge does not happen, production does not move.

## Environments

Each branch owns one Apps Script deployment and touches only that one.

| Env | Trigger | Frontend | Apps Script deployment |
|---|---|---|---|
| Development | push to `refactor-structure` | GitHub Pages `bundle-dev.js` | dev deployment, promoted by CI on every push |
| Production | merge + push to `main` | GitHub Pages `bundle.js` | production deployment, promoted by CI on that push only |

URLs: `https://lucastdcs.github.io/techsol_DialIn_AutoCopy/bundle{,-dev}.js`; Apps Script `.../exec`.

### Order within a deploy

The `build-and-deploy-frontend` job declares `needs: deploy-backend-gas`, so **the
backend is promoted before the frontend is published**. The two used to run in
parallel, which is what opens the window where a new frontend calls an operation the
live deployment does not have yet — the agent sees only the JSONP watchdog timing out
after 15s. The reverse order has no such window: a new backend under an old frontend
is harmless, because an operation nobody calls yet does nothing.

A consequence worth knowing: if the backend job fails, the frontend is **not**
published. That is deliberate — a half-deploy that leaves the frontend ahead of the
backend is the exact state this ordering exists to prevent.

## Pre-release checklist

- [ ] There is no automated lint/test suite today (see `README.md` → Testing) — verify manually: load the Dev bookmarklet against the real CRM and exercise the changed module(s).
- [ ] **Capture before shipping** (cf. `CLAUDE.md` → "Capture at checkpoints"): anything **decided** → an ADR, **learned / blocked** → `docs/LEARNINGS.md`, an **agent mistake/drift** → `docs/AGENT-EVALS.md`. A push/merge-to-main is the most reliable capture moment.
- [ ] If `gas-backend/` changed: confirm the payload contract in `specs/data-models/api-payloads.md` still matches — more than one frontend module depends on it.
- [ ] Confirm the GitHub Actions secret `CLASPRC_JSON` is still valid (CI fails fast at "Validar integridade do JSON" if not).

## Secrets & configuration

- **`CLASPRC_JSON`** (GitHub Actions secret) — `clasp` OAuth credentials CI uses to authenticate before `clasp push`/`clasp deploy`. Regenerate locally with `clasp login`, then update the repo secret (Settings → Secrets → Actions) with the resulting `~/.clasprc.json` contents.
- **`scriptId`** (`gas-backend/.clasp.json`, committed) — identifies which Apps Script project `clasp push` targets. Same for both branches/environments; only the *deployment* differs.
- **`DEPLOYMENTS`** (`src/modules/shared/data-service.js`, committed) — a map with **both** Apps Script deployment IDs, `production` and `development`. Which one the bundle uses is decided at build time, not at runtime.
- **`__CW_BUILD_ENV__`** (`.github/workflows/deploy.yml`, injected via `esbuild --define`) — `"production"` on `main`, `"development"` on `refactor-structure`. **Any new build step must pass this flag**: without it `data-service.js` falls back to `"development"` silently, and a production bundle would start talking to the dev backend. (That is exactly the state `main` would have inherited from a plain merge before this split existed.) Building locally with no `--define` is the one case where the fallback is correct.
- **`DEPLOYMENT_ID`** (`.github/workflows/deploy.yml`, hardcoded twice — once per branch) — which deployment that branch promotes. **Each ID must match the matching entry in `DEPLOYMENTS`** in `data-service.js`; rotating one means editing both files. `scripts/promote-deployment.sh` refuses to run on a placeholder ID rather than letting `clasp` fail deep in the log.

> **Which ID is which, and why.** `DEPLOYMENTS.production` is the deployment that had always been in real use — the one CI kept republishing and that every agent works against. It stays production precisely because it is the one that is current; pointing production anywhere else would aim it at a deployment frozen on an old commit. The `development` deployment is the **new** one, created for this split so that pushes to `refactor-structure` stop republishing the backend everyone is using.
>
> The first version of this split got that backwards — it treated the ID that `main` happened to reference as production, and that one had not been promoted since March. Worth remembering: "which deployment does this branch name point at" is not the same question as "which deployment is actually live".

### App version

`APP_VERSION` (`src/app.js`) drives *when* the "what's new" modal fires; `RELEASE_NOTES.version` (`src/modules/changelog/changelog-data.js`) drives *what it says*. **Bump both in the same commit.** If they diverge, `checkAndShowChangelog` suppresses the modal and logs a warning rather than showing the new version's badge over the old version's content.

## Rollback

- **Frontend (GitHub Pages)**: revert the offending commit on the relevant branch and push again — CI rebuilds and republishes `dist/`.
- **Backend HEAD**: `clasp push -f` from a reverted commit re-syncs the Apps Script editor's HEAD.
- **Backend deployment (the part agents actually hit)**: promote a *previous* version into the deployment — via the Apps Script UI (Deploy → Manage deployments → pick a version) or `clasp deploy -i <deployment-id> -V <previous-version-number>`. Pushing/reverting HEAD alone does **not** roll back a live deployment.

## Known fragilities

- **`clasp push` ≠ live**: it only updates the Apps Script HEAD (visible in the editor) — the `/exec` and `/dev` URLs stay pinned to whatever was last *promoted*. Easy to assume a push "deployed" when it didn't; see `docs/WORKFLOW.md` and `README.md` → Deployment.
- **JSONP watchdog**: every backend call times out client-side after 15s (`jsonpFetch` in `data-service.js`) if Apps Script doesn't respond — a slow/erroring deployment surfaces as a generic timeout in the browser console, not a clear backend error.
- **`github.io` reachability**: the bookmarklet hard-depends on reaching `lucastdcs.github.io`; a corporate network block there is silent failure from the agent's point of view (see `README.md` → Troubleshooting).
- <fill in as you learn>
