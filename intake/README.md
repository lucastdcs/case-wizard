<!-- generated-by: groundrules v1.10.0 -->
# intake/ — Upstream notes

This folder contains anything written **before** starting the project that provides domain context:

- Raw specifications sent by the client / PO
- Brainstorms, mind-maps
- Email or conversation excerpts
- Notes from scoping meetings
- External reference documents (PDFs, screenshots...)

## Conventions

- **Read-only**: files here are *inputs*, captured as received — don't edit them to "fix" them; synthesize into `docs/` instead.
- **Binaries welcome**: spreadsheets, PDFs, logos, screenshots belong here too — not just Markdown.
- No imposed structure. Organize as you wish (subfolders, flat files, mix).
- Prefer explicit names: `2026-05-11-client-call.md` rather than `notes.md`.
- Anything **synthesized and stable** should migrate to `docs/` (vision, architecture, glossary...).
- `intake/` stays draft; `docs/` is the final version.

## For Claude

If you're looking for domain context at session start and the project docs are insufficient, **read this folder**.

## Note for this project

This project's actual domain source of truth is `specs/` (business rules, payload contracts, DB schema, UI/DOM standards), not `intake/` — it's actively maintained in sync with the code, unlike the draft/frozen nature of a typical `intake/` folder. `intake/INTENT.md` here is a one-time snapshot used to synthesize `docs/VISION.md` during adoption; for anything current, read `specs/_MASTER_RULEBOOK.md` first.
