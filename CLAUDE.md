# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

TechSol Operations Assistant — a productivity overlay for agents working in an internal Google-Workspace CRM. It is **not** a normal web app: there's no server the user visits. The front-end is a single bundled script injected into the CRM page via a bookmarklet, and it shares the CRM's live DOM and `window` object. The back-end is Google Apps Script (GAS) backed by a Google Sheet as the database.

- Front-end: Vanilla JS + CSS-in-JS, bundled with esbuild, hosted on GitHub Pages.
- Back-end: Google Apps Script (`gas-backend/`), synced via `clasp`, Google Sheets as DB.
- No frameworks: React/Angular/Vue/jQuery/Axios are explicitly forbidden (`specs/_MASTER_RULEBOOK.md`) unless a spec explicitly authorizes them.

## `specs/` is the source of truth — read it before changing behavior

`specs/_MASTER_RULEBOOK.md` states this explicitly: if legacy code disagrees with `specs/`, the spec wins and the code is what's wrong. `docs/` is high-level/historical context only. Always check the relevant spec file before implementing a feature or fixing a bug:

- `specs/_MASTER_RULEBOOK.md` — tech stack constraints, naming conventions (`camelCase` functions, `UPPER_SNAKE_CASE` constants/statuses, kebab-case CSS classes).
- `specs/data-models/db-schema.md` — the Sheet schema; canonical field names.
- `specs/data-models/api-payloads.md` — front↔back payload contract. Field names must match the schema exactly (e.g. `website`, not `site`). On **edit** flows, never inject `|| ""` fallbacks for untouched fields — omit them or send `undefined` so the backend preserves the existing value instead of wiping it.
- `specs/workflow/bau-lifecycle.md` — BAU case status flow (`PENDING_TL_CREATION`, `PENDING_TL_DISCARD`, `CREATED`, `DISCARDED`, `REJECTED`, `CANCELED_BY_AGENT`), TL Dashboard FIFO ordering by `Data_Envio`, and the rule to never mix creation and discard queues in one view.
- `specs/workflow/scraping-rules.md` — before scraping page data, force-click the CRM's "Show original" translation-toggle button and wait ~300-500ms, or extracted data will be corrupted/anchors broken. All DOM scraping must fail silently (`console.warn` + skip), never throw.
- `specs/ui-ux/design-system.md` — "Liquid Glass" glassmorphism visual language, blue/Gemini glow for the standard flow vs. `.discard-theme` (soft orange/coral) for destructive/secondary flows.
- `specs/ui-ux/dom-standards.md` — never use `window.alert/confirm/prompt`, use the custom modal system only. Every `jsonpFetch` call needs a loading state. Edit flows need a blocking loading overlay until the DOM is fully repopulated (no flicker). Overlays/modals must lock body scroll.

## Commands

```bash
npm install                 # first time only
npm run build                # -> dist/bundle.js (minified, production)
npm run dev                  # -> dist/bundle-dev.js (unminified, debug)
npm run portfolio            # Playwright script: screenshots/video for README (needs `pip install playwright && playwright install`)
```

There is no test suite and no local server (the CRM the overlay injects into can't be run locally). There is no lint command configured.

**Manual verification loop:** edit files in `src/`, push to a branch (CI builds automatically — no need to build locally before committing), open the target CRM, and load the app via the dev bookmarklet from `README.md` (points at `bundle-dev.js` with a cache-busting timestamp). Console should log `✅ TechSol DEV carregado!`.

## Branches and deployment — read this before pushing

- **`refactor-structure` is the working branch** — day-to-day work and PRs target it, not `main`. `main` only receives a merge when something is production-ready.
- **`main`** → builds `dist/bundle.js` (production, minified) → GitHub Pages.
- **`refactor-structure`** → builds `dist/bundle-dev.js` (dev, unminified) → GitHub Pages.
- Both are driven by the single `.github/workflows/deploy.yml` on every push to either branch — no manual build step needed before committing.
- The GAS backend (`gas-backend/`) is pushed via `clasp push -f` on every push to `main` or `refactor-structure` (separate job in the same workflow). `clasp push` only updates the Apps Script project HEAD (visible in the editor) — it does **not** move the live `/exec` URL, which stays pinned to whatever deployment version was last promoted.
  - On `refactor-structure`, promotion of the **dev** deployment is automated in CI (`clasp deploy -i <deploymentId>`), so dev stays in sync with HEAD automatically.
  - On `main`, promotion of the **production** deployment is deliberately manual (Apps Script UI or `clasp deploy`) — a push to `main` never silently becomes production.
- `main` and `refactor-structure` point at different Apps Script deployment IDs/URLs (hardcoded in `src/modules/shared/data-service.js` as `SCRIPT_ID`), but share the same Apps Script project and the same `gas-backend/` source.
- Backend access is domain-restricted (`gas-backend/appsscript.json`, `access: "DOMAIN"`) — not public.
- Changing anything in `gas-backend/` can break multiple front-end modules at once since they all share the payload contract in `specs/data-models/`. Check callers before renaming a GAS-side field.

## Architecture

### Boot sequence (`src/app.js`)
Single entry point, guarded by `window.techSolInitialized` to prevent double-injection. Order matters:
1. Inject global styles/fonts (`initGlobalStylesAndFont`).
2. Init `SoundManager` global listeners (wrapped in try/catch — audio can be blocked).
3. Kick off async data fetch (`DataService.fetchTips`).
4. Play startup/splash animation (async; other code awaits its completion rather than guessing timing).
5. Init every feature module (each returns a toggle/control function).
6. Init the Command Center (floating pill), wiring in all the module toggle functions.

### Data flow — everything is JSONP, not fetch
`src/modules/shared/data-service.js` is the only front-end↔backend bridge. All calls (including writes like `new_broadcast`, `create_bau`) go out as `<script src="...&callback=cw_cb_XXXX">` tags because `fetch`/CORS is blocked in this environment — meaning **all request data, including writes, travels in the query string**. The backend router is `gas-backend/Código.js`'s `doGet(e)`, dispatching on an `op` param (`op=broadcast`, `op=create_bau`, `op=get_user_profile`, ...) to `BAU_API.js`, `EmailEngine.js`, etc.

Exception: `gas-backend/TLDashboard.html` is served directly by `doGet` (`?page=tl`) as its own HTML Service page, and its actions (`getPendingBAUCases`, `updateBAUCaseStatus`) use `google.script.run` instead of the JSONP router — it runs in the authenticated context of whoever loaded the page.

### Module structure (`src/modules/`)
Each feature is a self-contained folder with an `init<Name>Assistant()` entry point that returns control functions to `app.js`. Adding a new module means: create the folder, export `init<Name>Assistant`, wire it into `app.js`, and add its button to `src/modules/shared/command-center.js`.

Notable modules:
- **`notes/`** — the largest module (Case Notes generator), already decomposed into `core/` (state, form-builder, output-generator), `ui/` (popup), `data/` (`notes-data.js` — templates/tasks/translations, the "database" you edit to change note wording), `components/`, `drafts/`, `automation/`. `notes-bridge.js` bridges into the CRM's native note editor by polling the DOM for the `contenteditable` box to appear, then inserts via `document.execCommand('insertHTML')` so the CRM's Angular layer notices the change.
- **`email-assistant/`** — templates live in `email-data.js` as data (not hardcoded per-template), including "Smart CR" shortcuts tied to Case Notes' `SUBSTATUS_SHORTCODES`. `openAndClearEmail` aggressively discards "ghost" drafts the CRM leaves behind before inserting a new one.
- **`bau-form/`** — BAU escalation wizard. `bau-form-config.js` declares steps/fields as data (`FORM_CONFIG`); `bau-form-assistant.js` builds the DOM from it. Talks to `sendBAUEscalation`/`readAgentBAU`/`updateBAUEscalation` in `data-service.js`. Status rules: `specs/workflow/bau-lifecycle.md`.
- **`personal-library/`** — `snippet-service.js` is cache-first: reads `localStorage` immediately, syncs to the sheet in the background, with an `isMutating` lock to avoid clobbering an in-flight edit.
- **`shared/page-data.js`** — screen-scraping. `captureNameWithMagic` ("Sherlock Holmes") invisibly opens the Google avatar dropdown to read the user's name/email rather than depending on blocked internal APIs. Uses XPath for fields without stable IDs/classes.
- **`shared/command-center.js`** — the floating "pill" widget: custom drag physics that snaps to screen edges, plus a processing/loading animation state.
- **`shared/animations.js`** — the "genie effect" (module windows animate to/from the pill's position).

### Anti-breakage rules for CRM DOM interaction
The target CRM changes its own classes often — see `docs/WORKFLOW.md` §3 and `specs/workflow/scraping-rules.md`:
- Prefer `aria-label`/`debug-id` attributes or XPath text matches over CSS classes for selectors.
- Never assume an action is instant after opening a modal/menu — always `await esperar(ms)`.
- Wrap DOM interactions in `try/catch` so one broken selector doesn't take down the whole overlay.
