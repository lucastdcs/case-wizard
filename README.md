# TechSol Operations Assistant

[![Status](https://img.shields.io/badge/status-stable-4285F4)](#project-status)
[![Backend](https://img.shields.io/badge/backend-Google%20Apps%20Script-34A853)](#tech-stack)
[![Design](https://img.shields.io/badge/design-Material-FBBC05)](#tech-stack)
[![Bundler](https://img.shields.io/badge/bundler-esbuild-EA4335)](#tech-stack)

A productivity and automation suite for a corporate CRM, delivered as a JavaScript bookmarklet. It runs "on top" of the native CRM as a DOM-injected overlay, adding email automation, case-note generation, a BAU escalation workflow, sound feedback, and a UI built on **Google Material Design** principles — with no browser extension or install step beyond a bookmark.

## Table of Contents

- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Configuration & Secrets](#configuration--secrets)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Visual Portfolio Generation](#visual-portfolio-generation-optional)
- [Project Status](#project-status)

## Key Features

- **Case Notes** — generates standardized case notes (BAU/LM, PT/ES) from a Status → Sub-status → template flow, with a visual task picker, quick scenarios, implementation tags, automatic Speakeasy ID capture, and an emergency-autosave draft system.
- **Email Assistant** — detects and clears "ghost" Gmail drafts before inserting a new one, backed by a template library with placeholders and "Smart CR" shortcuts tied to Case Notes sub-statuses.
- **Call Script Assistant** — interactive call checklist (PT/ES/EN × BAU/LT) with progress tracking and live capture of the customer's CID/email.
- **Timezone Assistant** — live local-time monitoring per supported country and a meeting-time planner for customer calls.
- **BAU Central** — wizard for escalating a case to BAU (open or discard), plus a dashboard and edit flow for the agent's own escalated cases.
- **My Library** — personal snippets (notes, emails, general text), synced across devices via Google Sheets.
- **Broadcast System** — global announcements sourced from the backend, with `localStorage`-based read tracking and a custom emoji-shortcode parser.
- **Links Hub** — curated shortcuts to internal tools and pages, grouped by task.
- **Command Center & Command Palette** — a floating pill that surfaces every module, plus a `Ctrl/Cmd+K` quick-search that calls the same toggle functions as clicking an icon.
- **Per-agent Ctrl+K shortcuts** — each agent configures their own quick commands (status + substatus + scenarios), created either by capturing a Case Notes screen they already built or from a builder in Settings. Stored per person in the backend so they follow the agent across machines.
- **Onboarding & Changelog wizards** — first-run tutorial slides and a "what's new" popup shown automatically when the app version changes.
- **Sound UX & Material Look** — audio feedback for success/error/notification events, a cinematic startup sound, and CSS-in-JS components styled to blend into Google's native UI.

## Screenshots

> _Screenshots and a short demo video will be added here._

| Command Center | Case Notes Assistant | Email Assistant |
| :---: | :---: | :---: |
| _(add screenshot)_ | _(add screenshot)_ | _(add screenshot)_ |

| Call Script Assistant | Timezone Assistant | BAU Central |
| :---: | :---: | :---: |
| _(add screenshot)_ | _(add screenshot)_ | _(add screenshot)_ |

Drop image files into [`docs/media/`](docs/media/) and swap the placeholder cells above for `<img src="docs/media/<file>.png" width="400">`. A demo video can be linked the same way once available. Both can be regenerated automatically — see [Visual Portfolio Generation](#visual-portfolio-generation-optional).

---

## Tech Stack

- **Language**: JavaScript (ES modules), Vanilla JS — no UI framework (no React/Vue)
- **Bundler**: [esbuild](https://esbuild.github.io/)
- **Styling**: CSS-in-JS (no external stylesheets)
- **Design language**: [Google Material Design](https://m3.material.io/) — Roboto/Google Sans typography, Material color accents, and glassmorphism component styling built by hand (no Material UI library)
- **Backend**: Google Apps Script (V8 runtime), synced via [`clasp`](https://github.com/google/clasp)
- **Data store**: Google Sheets (accessed from Apps Script — see `specs/data-models/db-schema.md`)
- **Backend transport**: JSONP (not `fetch`) to avoid CORS restrictions against the Apps Script Web App
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Frontend hosting**: GitHub Pages (serves the built bundle)
- **Visual portfolio generation**: Python 3 + [Playwright](https://playwright.dev/) (optional, dev-only tooling)

## Prerequisites

- Node.js 18+ and npm
- A Google Workspace account with access to the target Apps Script project (for backend development)
- [`clasp`](https://github.com/google/clasp) (`npm install -g @google/clasp`), only if you need to push backend changes manually
- Python 3 + `pip install playwright && playwright install` — optional, only needed to regenerate the screenshots/video in [Visual Portfolio](#visual-portfolio)

---

## Getting Started

There is no traditional "run the app locally" step: the frontend only does anything once it's injected into the real CRM page. Local setup means building the bundle and pointing a bookmarklet at it.

### 1. Clone the repository

```bash
git clone <repository-url>
cd "Case Wizard"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the bundle

```bash
npm run build   # dist/bundle.js — minified, production
# or
npm run dev     # dist/bundle-dev.js — unminified, for debugging
```

CI (`.github/workflows/deploy.yml`) builds and publishes automatically on every push to `main` (production bundle) or `refactor-structure` (dev bundle), so a manual build is only needed to test locally before pushing.

### 4. Inject it into the CRM

Since there's no localhost target, "running" the app means loading the bundle in the browser via a bookmarklet. Create a browser bookmark with one of the following as its URL, then click it while on the CRM page:

**Production** (bypasses CSP via `trustedTypes`, points at the GitHub Pages–hosted `bundle.js`):

```javascript
javascript:(function(){    const cacheBuster = '?t=' + new Date().getTime();    const scriptUrl = 'https://lucastdcs.github.io/case-wizard/bundle.js' + cacheBuster;        const policy = trustedTypes.createPolicy('default', {         createHTML: (string) => string,         createScriptURL: string => string,         createScript: string => string,     });    const oldScript = document.getElementById('techsol-app-bundle');    if(oldScript) oldScript.remove();        const script = document.createElement('script');    script.id = 'techsol-app-bundle';    script.src = policy.createScriptURL(scriptUrl);    document.body.appendChild(script);})();
```

**Development** (points at `bundle-dev.js`, logs to console):

```javascript
javascript:(function(){    var s = document.createElement('script');    s.src = 'https://lucastdcs.github.io/case-wizard/bundle-dev.js?t=' + new Date().getTime();    s.onload = function() { console.log('✅ TechSol DEV carregado!'); };    s.onerror = function() { alert('❌ Erro ao carregar TechSol DEV: Arquivo não encontrado ou bloqueado.'); };    document.body.appendChild(s);})();
```

Push a change to `refactor-structure`, wait for CI to finish, then click the Dev bookmarklet again to pick it up (the cache-busting timestamp forces a fresh download each click).

### 5. Backend changes (optional)

The backend lives in `gas-backend/` and is synced to Apps Script by CI (`clasp push -f` on every push to `main` or `refactor-structure`). To work on it locally:

```bash
cd gas-backend
clasp login          # first time only
clasp push            # push local changes to the Apps Script HEAD
```

Note that `clasp push` only updates the editor's HEAD — the live `/exec` and `/dev` URLs stay pinned to whatever deployment was last promoted (see [Deployment](#deployment)).

---

## Architecture

### Directory Structure

```
├── src/
│   ├── app.js                      # Entry point — boots the overlay in order (styles, sound, data, modules, command center)
│   └── modules/
│       ├── bau-form/                # BAU escalation wizard
│       ├── broadcast/               # Global announcements
│       ├── call-script/             # Call checklist assistant
│       ├── changelog/               # "What's new" wizard
│       ├── configs/                 # Agent profile & preferences
│       ├── email-assistant/         # Gmail draft automation & templates
│       ├── links/                   # Internal links hub
│       ├── notes/                   # Case Notes generator (core module, most files)
│       ├── onboarding/              # First-run tutorial
│       ├── personal-library/        # Cross-device snippet library
│       ├── shared/                  # Command center, DOM utils, sound, animations, data service
│       └── timezone/                # Timezone/meeting planner
├── dist/                            # Build output (gitignored, published to GitHub Pages)
├── gas-backend/                     # Google Apps Script backend, synced via clasp
│   ├── Código.js                    # doGet(e) router — dispatches by `op=`
│   ├── BAU_API.js / BAU_Dashboard.js / BAU_Alerts.js
│   ├── EmailEngine.js
│   ├── TLDashboard.html             # Separate HTML Service page (?page=tl), uses google.script.run
│   ├── appsscript.json
│   └── .clasp.json                  # scriptId + rootDir
├── docs/                            # Architecture, workflow, and business-rule docs (Portuguese)
├── specs/                           # Source of truth for payload contracts, DB schema, UI/DOM standards
├── mock-crm.html                    # Static mock of the CRM, used only for portfolio generation
├── generate-portfolio.py            # Playwright script that drives mock-crm.html to produce screenshots/video
└── .github/workflows/deploy.yml     # CI: build+deploy frontend, sync+deploy backend
```

### Injection Mechanism

The bookmarklet appends a cache-busting timestamp to the script URL, then — in the production variant — creates a `trustedTypes` policy named `default` to satisfy the CRM's strict Content Security Policy before injecting a `<script>` tag pointing at the GitHub Pages–hosted bundle.

### Boot Sequence (`src/app.js`)

1. Guards against double-injection via `window.techSolInitialized`.
2. Injects global styles and the Roboto/Google Sans font.
3. Initializes the sound engine and global hover/click audio listeners.
4. Kicks off async data fetching (tips, broadcasts) via `DataService`.
5. Initializes every module, collecting each one's control functions (e.g. `toggleNotes`).
6. Mounts the floating Command Center pill, wiring each module's toggle into it.

### Backend & Data Flow

There is no traditional server or database — Google Apps Script acts as the API, backed by a Google Sheet (see `specs/data-models/db-schema.md`):

- **Frontend interface**: `src/modules/shared/data-service.js`
- **Backend router**: `gas-backend/Código.js`, `doGet(e)` — dispatches by an `op` query param (`op=broadcast`, `op=create_bau`, `op=get_user_profile`, …) to the matching module (`BAU_API.js`, `EmailEngine.js`, …)
- **Transport**: every call (including writes, like `new_broadcast` or `create_bau`) goes through **JSONP**, not `fetch` — the frontend injects a `<script src="...&callback=cw_cb_XXXX">` tag, and the backend wraps its JSON response in a call to that callback. This sidesteps CORS but means every operation's parameters ride in the URL query string, and the frontend has a 15s watchdog timeout in case Apps Script doesn't respond.
- **TL Dashboard** (`gas-backend/TLDashboard.html`) is a separate HTML Service page served at `?page=tl`, using `google.script.run` instead of the JSONP router — it runs in the authenticated context of whoever loaded the page.
- **Access control**: the Apps Script Web App is configured with `access: "DOMAIN"` (`gas-backend/appsscript.json`) — only authenticated users on the same Google Workspace domain can call it; it is not public.
- **Dev vs. production are separate deployments**, not a shared one: each branch's frontend points at a different deployment ID/URL, hardcoded in `data-service.js` (`SCRIPT_ID` + `/dev` vs `/exec`). Both share the same source (`gas-backend/`) and Apps Script project, but each deployment stays pinned to whatever version was last promoted into it.

### Design System

No UI framework — components are hand-built Vanilla JS with CSS-in-JS. Notable shared pieces: a `header-factory.js` glassmorphism window header, and a "genie effect" open/close animation in `animations.js` that computes a trajectory between the floating button and the module's screen position.

For business rules, payload contracts, and DOM/UI conventions, `specs/` (starting at `specs/_MASTER_RULEBOOK.md`) is the source of truth — it's kept in sync with the code. `docs/` covers architecture at a higher level plus historical decisions.

---

## Configuration & Secrets

There's no `.env` file — this project has no local runtime configuration in the traditional sense, since the frontend only runs injected into the live CRM page and the backend runs entirely inside Google's infrastructure.

| Where | What | Notes |
| --- | --- | --- |
| `gas-backend/.clasp.json` | `scriptId` for the Apps Script project | Committed; identifies which Apps Script project `clasp push` targets |
| `src/modules/shared/data-service.js` | `SCRIPT_ID` used to build the `/exec` and `/dev` API URLs | Hardcoded per branch; must be updated in tandem with the CI deployment-promotion step if the script is ever rotated |
| `.github/workflows/deploy.yml` → `DEPLOYMENT_ID` | Deployment ID promoted automatically on `refactor-structure` | Hardcoded in the workflow; the production deployment ID is not automated on purpose |
| GitHub Actions secret `CLASPRC_JSON` | `clasp` OAuth credentials used by CI to authenticate | Configure under repo Settings → Secrets → Actions; required for the backend deploy job to run |
| `gas-backend/appsscript.json` | Apps Script runtime config (`timeZone`, `webapp.access`, …) | Committed |

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Bundle `src/app.js` into `dist/bundle.js`, minified (production) |
| `npm run dev` | Bundle `src/app.js` into `dist/bundle-dev.js`, unminified (debug) |
| `npm run portfolio` | Run `generate-portfolio.py` via Playwright to regenerate the screenshots/video in `docs/media/` |
| `clasp push` (in `gas-backend/`) | Push local backend changes to the Apps Script project HEAD |
| `clasp deploy -i <id> -d "<desc>"` (in `gas-backend/`) | Promote a deployment to the current HEAD version |

---

## Testing

There is no automated test suite in this repository today. Verification is manual:

- **Frontend**: build with `npm run dev`, load it via the Dev bookmarklet on the real CRM, and exercise the module you changed. Watch the browser console for `✅ TechSol DEV carregado!` and any errors.
- **Backend**: after `clasp push`, use the Apps Script editor's built-in execution log/debugger, or call the deployed `/dev` URL directly with the relevant `op=` query params.
- **Visual regressions / demo assets**: `npm run portfolio` re-renders `mock-crm.html` through Playwright — useful to sanity-check UI changes without touching the real CRM, but it is not a substitute for testing against production.

---

## Deployment

Deployment is fully automated by `.github/workflows/deploy.yml`, triggered on every push to `main` or `refactor-structure`, with two independent jobs:

### Frontend → GitHub Pages

1. Installs `esbuild`.
2. Builds `dist/bundle.js` (on `main`) or `dist/bundle-dev.js` (on `refactor-structure`).
3. Publishes `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`, which GitHub Pages serves from.

### Backend → Google Apps Script

1. Installs `@google/clasp` globally.
2. Reconstructs `clasp`'s OAuth credentials from the `CLASPRC_JSON` secret and validates the JSON before proceeding.
3. Runs `clasp push -f` inside `gas-backend/`, updating the Apps Script project's HEAD.
4. **Only on `refactor-structure`**: automatically promotes the pinned development deployment (`clasp deploy -i <DEPLOYMENT_ID>`) to the new HEAD, and writes a summary (timestamp, commit, deployment ID) to the GitHub Actions job summary.
5. **On `main`**: the production deployment is **not** auto-promoted — `clasp push` updates the HEAD, but someone must manually promote a new production version (via the Apps Script UI: Deploy → Manage deployments → New version, or `clasp deploy -i <production-deployment-id>`). This is deliberate, so a push never silently becomes production.

In practice, day-to-day work happens on `refactor-structure` (which gets both bundle and backend auto-promoted); `main` only receives a merge once something is ready for production.

---

## Troubleshooting

### Bookmarklet does nothing / blocked by network

The script depends on reaching `github.io`. If the corporate network blocks that domain, the bundle will never load — check the browser's Network tab for a blocked/failed request to `lucastdcs.github.io`.

### Dev bookmarklet shows old code

The cache-buster (`?t=...`) forces a fresh download, but GitHub Pages/CI can lag behind a push. Confirm the `build-and-deploy-frontend` job finished for your commit before re-clicking the bookmarklet.

### "Timeout: A API demorou muito para responder" in console

The JSONP call to Apps Script didn't get a response within 15s (see `jsonpFetch` in `data-service.js`). Usually means the Apps Script deployment is erroring or hasn't picked up a recent `clasp push`/promotion — check the Apps Script execution log.

### Backend changes not showing up after `clasp push`

`clasp push` only updates the Apps Script HEAD (visible in the editor), not the live `/exec` or `/dev` URL. Someone needs to promote a deployment — automatic for dev on `refactor-structure`, manual for production on `main` (see [Deployment](#deployment)).

### CI fails at "Validar integridade do JSON"

The `CLASPRC_JSON` GitHub secret isn't valid JSON (or is missing/expired). Regenerate it locally with `clasp login` and update the repo secret with the resulting `~/.clasprc.json` contents.

### User preferences reset unexpectedly

Widget position, sound mute, and onboarding/changelog "seen" flags are stored in the browser's `localStorage`. Clearing browser data resets all of them.

---

## Visual Portfolio Generation (optional)

`generate-portfolio.py` drives `mock-crm.html` (a static stand-in for the real CRM layout) with Playwright, injects the built bundle, and captures the screenshots and video used in this README. It is not a functional test environment and doesn't replace testing against the real CRM — it exists purely to produce demo assets without depending on production access.

```bash
pip install playwright
playwright install
npm run portfolio
```

---

## Project Status

Maintainer: Lucas Teixeira / TechSol Team
