# 0003 — Rename the repository to `case-wizard`

**Date**: 2026-08-20
**Status**: Accepted

## Context

The repository is named `techsol_DialIn_AutoCopy` — a name left over from an early
throwaway script that copied a dial-in field. Nothing about it describes what the
project became: a productivity overlay for the CRM, known to everyone involved as
**Case Wizard**. The local folder is `Case Wizard`, `docs/ADOPTION-LOG.md` records
the project name as "Case Wizard", and every localStorage key in the frontend is
prefixed `cw_`. The repository name was the last holdout.

The reason this was not a trivial rename: **the bookmarklet's script URL contains
the repository name**. Agents install the tool by saving a bookmark whose `src` is
`https://lucastdcs.github.io/<repo>/bundle.js`. GitHub redirects a renamed
repository's web, clone and push URLs indefinitely, but it does **not** redirect the
GitHub Pages site — the Pages URL simply moves to the new name and the old one stops
resolving. Every bookmarklet already saved would fail as a silent 404: the injected
`<script>` never loads and nothing at all happens on screen, which is the hardest
failure mode to diagnose from a support agent's side.

## Decision

Rename the repository to `case-wizard`, and immediately create a **new, empty
repository under the old name** (`techsol_DialIn_AutoCopy`) whose `gh-pages` branch
serves a small shim `bundle.js` / `bundle-dev.js` that loads the real bundle from
the new URL.

## Alternatives considered

- **Rename with no shim, and re-distribute the bookmarklet**: rejected. It breaks
  every installed bookmark at once, with no error message, and there is no channel
  that reliably reaches every agent on the same day.
- **Keep the old name forever**: rejected. The cost is permanent confusion for
  anyone new to the project, and it only grows as more docs reference the repo.
- **Serve the frontend from a custom domain instead**: this would decouple the
  bookmarklet from the repository name for good, and is the better long-term answer.
  Rejected *for now* because it needs a domain the team controls plus DNS the
  corporate environment will resolve — a much larger change than this rename.

## Consequences

### Positive
- The repository name finally matches the product, the folder, the docs and the
  `cw_` key prefix.
- Installed bookmarklets keep working through the shim; re-distribution becomes
  something that can happen gradually instead of on a deadline.
- Creating the shim repo also **occupies the old name**, which closes the window in
  which someone else could claim `lucastdcs/techsol_DialIn_AutoCopy` and thereby
  break GitHub's redirect of the old repository URL.

### Negative / Tradeoffs
- One extra repository to keep alive indefinitely. It has no CI and no dependencies,
  but it must not be deleted while old bookmarklets are still in circulation.
- The shim adds a second network hop to the load of anyone still on the old URL.
- Anyone with an existing clone should run `git remote set-url origin
  https://github.com/lucastdcs/case-wizard.git`. The redirect makes this optional,
  but only until the redirect is disturbed.

### Neutral
- GitHub Actions, the `CLASPRC_JSON` secret, `gas-backend/.clasp.json`'s `scriptId`
  and both Apps Script deployment IDs are all independent of the repository name —
  nothing there changes.
- Open pull requests, issues, branches and history survive a rename untouched.

## Notes

Order of operations (the shim must exist before the old URL is relied upon):

1. Merge the docs/`package.json` changes that reference the new name.
2. GitHub → Settings → rename the repository to `case-wizard`.
3. `git remote set-url origin https://github.com/lucastdcs/case-wizard.git` in every
   local clone and worktree.
4. Confirm Pages is publishing at `https://lucastdcs.github.io/case-wizard/bundle.js`
   (Settings → Pages; the `gh-pages` branch carries over with the rename).
5. Create a new empty repo `techsol_DialIn_AutoCopy`, push a `gh-pages` branch
   containing `bundle.js` and `bundle-dev.js`, each just:

   ```js
   // Shim: this repository was renamed to case-wizard.
   // Kept alive so bookmarklets saved before the rename keep working.
   (function () {
     var s = document.createElement('script');
     s.src = 'https://lucastdcs.github.io/case-wizard/bundle.js?t=' + Date.now();
     document.body.appendChild(s);
   })();
   ```

   (`bundle-dev.js` points at `bundle-dev.js` on the new host.) Enable Pages on that
   repo, serving from `gh-pages`.

   The shim must **not** call `trustedTypes.createPolicy('default', …)` itself. The
   production bookmarklet already created that policy before the shim runs, and
   creating a policy named `default` twice throws. Because the default policy is
   already in place, the shim's plain `s.src = '…'` assignment passes through it.
6. Verify the old bookmarklet URL still boots the app, then re-distribute the new
   bookmarklet from `README.md` at a comfortable pace.

Do the rename **after** a production release has settled, never on the same day — a
rename plus a large deploy at once makes any breakage ambiguous.
