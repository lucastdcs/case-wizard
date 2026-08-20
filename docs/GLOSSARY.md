<!-- generated-by: groundrules v1.10.0 -->
# Glossary — Case Wizard

Domain vocabulary for the project. One entry per term, alphabetical order.

Keep definitions short and precise. The goal: a new developer (or Claude) quickly understands the domain language.

---

## B

**BAU** — "Business As Usual" case type/queue. One of the two main case categories (see LM). Cases can be escalated to a BAU queue via the BAU Central wizard.

**Bookmarklet** — A `javascript:` URI saved as a browser bookmark. Clicking it runs the code immediately in the context of whatever page is open (here, the CRM), injecting the app's `<script>` tag. This project's entire distribution mechanism — no extension, no install.

## C

**CID** — Customer/case identifier captured live during a call (Call Script Assistant) or from the CRM page.

**Command Center** — The floating pill UI (`src/modules/shared/command-center.js`) that is the app's main entry point, surfacing every module and drag-repositionable on screen.

**Command Palette** — The `Ctrl/Cmd+K` quick-search overlay (`command-palette.js`) that calls the same toggle functions as clicking a Command Center icon, without duplicating open/close logic. It lists two groups: the agent's own **Shortcuts** first, then the modules.

**Shortcut (Ctrl+K)** — An agent-owned command in the palette (`shared/shortcut-service.js`): a case type + status + substatus + zero or more scenarios, with a name and a search alias. It stores *references* to scenarios, never their text, so published content corrections reach it for free. Created from Case Notes ("Salvar como atalho") or from Configurações → Meus Atalhos; capped at 8. Not to be confused with a **Scenario**, which is content, or a **Draft**, which is one unfinished note.

## D

**Deployment (Apps Script)** — A *promoted, pinned* version of the Apps Script project, served at a stable `/exec` or `/dev` URL. Distinct from the HEAD (see below): pushing code does not change what a deployment serves until someone explicitly promotes a new version into it.

## G

**Genie Effect** — The open/close animation (`animations.js`) that computes a trajectory between the floating Command Center button and a module's on-screen position, evoking a "genie coming out of the lamp."

**Ghost draft** — A stray/incomplete Gmail draft left behind by a previous run of the Email Assistant. The assistant polls for and clears these before inserting a new template.

## H

**HEAD (Apps Script)** — The latest code visible in the Apps Script editor after `clasp push`. Updating HEAD does **not** update a live deployment URL — see Deployment.

## J

**JSONP** — The transport used for every call between the frontend and the Apps Script backend (`jsonpFetch` in `data-service.js`): a `<script src="...&callback=...">` tag instead of `fetch`, chosen to sidestep CORS restrictions in the CRM's environment. All parameters — including writes — travel in the URL query string.

## L

**LM** — The other main case category alongside BAU (see BAU). Referenced together as "BAU/LM" throughout Case Notes and templates.

## S

**Smart CR** — Email Assistant shortcuts tied to a Case Notes sub-status, letting an agent jump straight to the matching email template from the note-taking flow.

**Speakeasy ID** — An identifier automatically captured by Case Notes from the CRM page during note generation.

**Sub-status** — The second level of the Case Notes generation flow (Status → Sub-status → template): narrows a case's status down to the specific template variant to generate.

## T

**TL Dashboard** — `gas-backend/TLDashboard.html`, a separate Apps Script HTML Service page (`?page=tl`) used by team leads to review and act on escalated BAU cases. Uses `google.script.run`, not the JSONP router.

**trustedTypes policy** — The browser API the production bookmarklet uses to satisfy the CRM's strict Content Security Policy before injecting the app's `<script>` tag.

<!-- Continue alphabetically -->
