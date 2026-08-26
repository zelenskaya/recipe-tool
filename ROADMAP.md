# Maya Approves? — Product Roadmap

_Single source of truth. Lives at the repo root on `main` and in the Claude Project knowledge base. To keep it current: at the end of a session, move items between the sections below — that's the whole ritual. It's a map, not a tracker._

## The product
A vanilla-JS, multi-page recipe web app (pages: index, recipe, add-recipe, fridge). Two jobs:
1. A **portfolio piece** for design-engineer roles.
2. A **white-label branded recipe tool** — `main` is the clean English app; each brand demo is a Git branch off `main` swapping a few files.

## Architecture (settled — don't relitigate)
- **Hosting:** Cloudflare Pages, per-branch previews. `main` → `recipe-tool-59u.pages.dev` (the live portfolio link). Each brand demo branch → `{branch}.recipe-tool-59u.pages.dev`, automatically.
- **`main` stays clean and generic** — it's both the portfolio and the source every demo inherits from. Brand skin never lands on `main`.
- **Localisation:** `strings.en.js` + `strings.uk.js` both live on `main`, identical keys; only one loads per page (the `<script>` tag is the language selector). Translate once on `main`; every demo inherits it.
- **Per-brand swap files** (per `brand-demo.md`): `images/logo.svg`, `images/favicon.svg`, `theme.css` (brand fonts + colors as `:root` tokens), optionally the language file. Keep structure and asset paths unchanged. These diverge per branch; `strings.uk.js` is the shared one that merges clean.

---

## Status

### ✅ Done
- Hosting migrated to Cloudflare Pages (per-branch deploys, one repo).
- English **Lifeway** demo shipped + pitch email sent.
- **Localisation promoted to a clean, de-branded `main`** and pushed. Correctness pass: en↔uk key parity ✓, count strings count-neutral ✓, category keys English ✓; `strings.uk.js` typo fixed.
- **Ukrainian demo LIVE** — branch `ukrainian-demo`, all pages load `strings.uk.js`, deployed + verified. Bitter font covers Cyrillic (no font change needed).
- **`brand-demo.md`** written + committed to `main` (the repeatable recipe for spinning up a brand demo).
- Narrow-width responsive check passed (except parked items below).

### 🔧 In progress — 4a: Fridge-as-homepage (on `main`)
Make Fridge Mode the homepage; no separate fridge page as the primary experience. Done so far: fridge UI moved into `index.html` (kept existing IDs so `fridge.js` still binds), old fridge nav/link removed, `fridge.js` added to homepage scripts. Homepage states defined — **A** empty (input + quick picks + invitation + all library recipes), **B** entered/no-match (input + selected + nothing-found + library), **C** matches (input + selected + top + partial + library).
Remaining: finish restructure -> verify A/B/C render with a **clean console** -> commit + push `main` -> **merge `main` -> `ukrainian-demo`** and re-verify Ukrainian.
_JS refactor of `index.js` + `fridge.js` is intentionally parked._

### Next
- **Ingredient-chip UX** (planned next): (a) split the shared `.chip` class so Add-Recipe chips are display-only (remove-button only) and Fridge chips keep their click interaction; (b) email-style ("To:" field) input where entered/quick-pick ingredients populate into the input area as chips, for Fridge and recipe-editing, so clickable vs non-clickable is visually obvious. Do together, on `main`, then merge to `ukrainian-demo`.
- **Portfolio case study** (3b, skipped earlier) — write up Maya Approves? as a design-engineer case study.

### Go to market
- Pitch Ukrainian brands with live per-brand demo links (branch + the swaps in `brand-demo.md`).
- **German** (`strings.de.js`): deferred until a concrete lead **or** a native reviewer appears.

### Phase 2 — 4b: Photo -> ingredients (flagship, after 4a settles)
Upload a fridge photo -> vision model identifies ingredients -> they populate the fridge UI as editable chips. **Prerequisite:** move the API key into a Cloudflare Pages Function (server-side) — gates every AI feature. Do not start until 4a is settled. Leads into the broader "cook with what's in my fridge" agent.

### Parked / later
- Fixed Add-Recipe button overlaps the bottom recipe card on `index.html` (parked pending 4a's new structure).
- `index.js` + `fridge.js` JS refactor (dedupe rendering/listeners now both load on the homepage).
- Custom domain to prettify the `pages.dev` URLs.

---

_Two docs, two half-lives: this file is the **whole map** (stable). A per-session scope is **one chunk** (ephemeral). Don't merge them._
