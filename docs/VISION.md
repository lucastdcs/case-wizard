<!-- generated-by: groundrules v1.10.0 -->
# Vision — Case Wizard

> Synthesis of the project intent. Source: `README.md` (overview, features, important notes) and `specs/_MASTER_RULEBOOK.md` (project philosophy, stack restrictions), captured verbatim in `intake/INTENT.md` at adoption time. Update when intent evolves (rare; tactical decisions go in `docs/decisions/`).

## Goal

Give TechSol's CRM support agents (working BAU/LM cases in PT/ES) a single productivity overlay — "TechSol Operations Assistant" — that standardizes and speeds up the repetitive parts of casework: writing case notes, drafting/cleaning up emails, running call scripts, escalating to BAU, and tracking timezones for customer meetings. It runs as a JavaScript bookmarklet injected on top of the real CRM (no browser extension, no separate app to install), so agents adopt it with a single click.

## Users / personas

- **Support/BAU agents** working cases in the CRM day-to-day (PT/ES, with EN call scripts also supported) — the primary users of Case Notes, Email Assistant, Call Script, Timezone, and BAU Central.
- **Team leads (TL)** — consume the BAU escalation dashboard (`gas-backend/TLDashboard.html`) to review and approve/discard escalated cases.
- **The maintainer** (Lucas Teixeira / TechSol team) — owns the bookmarklet, the Apps Script backend, and the CI/CD pipeline.

## Constraints

- **Front-end**: HTML, CSS, and Vanilla JavaScript only. External frameworks (React, Angular, Vue) or libraries (jQuery, Axios) are **prohibited unless explicitly authorized** (`specs/_MASTER_RULEBOOK.md`).
- **Backend**: Google Apps Script operating with Google Sheets as the database — no traditional server/DB.
- **Communication**: JSONP (`jsonpFetch`), not `fetch`, due to CORS/environment restrictions in the target CRM.
- **KISS**: code must stay simple, readable, and direct — no premature abstraction.
- **`specs/` is the absolute source of truth**: if legacy code diverges from a rule in `specs/`, the rule wins and the code must be refactored to match, not the other way around.
- **Network dependency**: the bookmarklet depends on reaching `web.app` (Firebase Hosting); a corporate network block there breaks loading entirely. This is a smaller risk than the `github.io` dependency it replaced, since `web.app` is a Google domain, but it is still a single external origin the tool cannot work without.
- **No durable client-side storage beyond `localStorage`**: user preferences (widget position, sound mute) live there and are lost on a browser cache clear.

## Out of scope for V1 (non-goals)

- Becoming a browser extension or standalone app — staying a bookmarklet-injected overlay is a deliberate choice, not a stopgap.
- Replacing the CRM itself or its data model — this is strictly an overlay/automation layer on top of an existing third-party CRM.
- A traditional backend/database — Google Apps Script + Google Sheets is the accepted architecture, not an interim one.
- Formal i18n tooling — PT/ES/EN content is handled as data-driven template strings, not a framework-level i18n system.

## V1 acceptance criteria

- An agent can install the tool via a single bookmarklet click and have it running on top of the CRM with no separate install step.
- Case Notes, Email Assistant, Call Script, Timezone, BAU Central, My Library, Broadcast, and Configs all function as described in `README.md` → Key Features.
- The BAU escalation flow round-trips correctly: an agent escalates a case, and a TL can see and act on it via the TL Dashboard.
- CI (`.github/workflows/deploy.yml`) builds and deploys both the frontend bundle and the Apps Script backend automatically on push, with production promotion staying a deliberate manual step (see `RELEASE.md`).

---

Further reading:
- `intake/` — raw upstream notes (specs, emails, brainstorms)
- `docs/decisions/` — structural decisions made during the project
- `docs/LEARNINGS.md` — non-trivial learnings
- `docs/ARCHITECTURE.md` — architecture snapshot
- `specs/_MASTER_RULEBOOK.md` — the project's actively-maintained rules (source of truth, supersedes this file on any conflict about current constraints)
