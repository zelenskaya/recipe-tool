# Maya Approves? — Product Roadmap
 
_Single source of truth. Lives at the repo root on `main` and in the Claude Project knowledge base. To keep it current: at the end of a session, move items between the sections below — that's the whole ritual. It's a map, not a tracker._
 
## The product
A vanilla-JS, multi-page recipe web app (pages: index [fridge-as-homepage], recipe, add-recipe, search). Two jobs:
1. A **portfolio piece** for design-engineer roles.
2. A **white-label branded recipe tool** — `main` is the clean English app; each brand demo is a Git branch off `main` swapping a few files.
## Architecture (settled — don't relitigate)
- **Hosting:** Cloudflare Pages, per-branch previews. `main` → `recipe-tool-59u.pages.dev` (the live portfolio link). Each brand demo branch → `{branch}.recipe-tool-59u.pages.dev`, automatically.
- **`main` stays clean and generic** — it's both the portfolio and the source every demo inherits from. Brand skin never lands on `main`.
- **Localisation:** `strings.en.js` + `strings.uk.js` both live on `main`, identical keys; only one loads per page (the `<script>` tag is the language selector). Translate once on `main`; every demo inherits it.
- **Per-brand swap files** (per `brand-demo.md`): `images/logo.svg`, `images/favicon.svg`, `theme.css` (brand fonts + colors as `:root` tokens), optionally the language file. Keep structure and asset paths unchanged.
- **Shared JS = `recipes.js`** — loaded on every page. Holds `leafMaker`, `makeRecipeCard`, `displayRecipes`, `getRecipes`. Page-specific logic stays in the page's own file (`index.js`, `search.js`). Load `recipes.js` before any page script (no bundler; tag order = definition order).
- **`getRecipes()` = single data-access point** — reads localStorage, seeds from `seedRecipes` + persists on first visit, returns the array. Every page calls it, so all surfaces read the same data (incl. localStorage-added recipes); seeding fires on whichever page loads first.
- **`makeRecipeCard(recipe)` = shared card atom** — one recipe in, one detached card out; appends nothing, names no container. Caller appends + adds surface-specific extras (edit/delete cluster on cookbook; missing-ingredients line on fridge-partial). Used by cookbook, fridge-top, fridge-partial, search.
- **`displayRecipes` = pure cookbook render** — after 2C it has no search awareness; takes `{recipes}`, shows empty-state or renders cards. No `isFiltered`/`searchText`.
- **Two-search model (settled):**
  - **Fridge search** = the homepage. Ingredient-coverage query: selected ingredients -> recipes ranked by how fully covered (top / partial).
  - **Find-by-name** = nav search box on every page -> dedicated `search.html?q=…`. Full-text match over name + description + ingredients (`.includes` substring today; token-match later).
  - **One writer per result surface** — each result element is controlled by exactly one function. This is the rule that killed the cookbook/search collision.
---
 
## Status
 
### ✅ Done
- Hosting migrated to Cloudflare Pages (per-branch deploys, one repo).
- English **Lifeway** demo shipped + pitch email sent.
- **Localisation promoted to a clean, de-branded `main`** and pushed. en↔uk key parity ✓, count strings count-neutral ✓, category keys English ✓.
- **Ukrainian demo LIVE** — branch `ukrainian-demo`, all pages load `strings.uk.js`, deployed + verified. Bitter font covers Cyrillic.
- **`brand-demo.md`** written + committed to `main`.
- Narrow-width responsive check passed (except parked items below).
- **Fridge-as-homepage core built + traced** — A empty -> invitation + cookbook; B no-match -> cookbook fallback; C matches -> top + partial + cookbook hidden; every return path (clear, re-search, no-match->match) restores the cookbook. Empty-library double-message removed.
- **Chunk 1 — card dedup:** extracted `makeRecipeCard` atom into `recipes.js`; collapsed 3 copies of card-building (cookbook, fridge-top, fridge-partial) into one. Fridge inherited the guarded category-color.
- **2A — `getRecipes()` resolve:** localStorage-or-seed read pulled into one self-contained function in `recipes.js`; returns the array. Top-level `recipes = getRecipes()`.
- **2B — find-by-name search:** `search.html` + `search.js` — reads `?q=`, full-text match, three states (empty q -> prompt / matches -> cards + count / zero -> nothing-found). Nav `<form>` search box on all pages -> `search.html?q=…` (Enter submits, `encodeURIComponent` out / `URLSearchParams.get` in, handler in `recipes.js` so one handler serves every page); box pre-fills with the current query on `search.html`.
- **2C — title-filter path deleted; bug dead (committed + pushed):** removed `filterAndDisplay`, `clearSearch`, the empty-state clear-search button + `search-results-clear-search` button and all their listeners/grabs, and stripped `displayRecipes` to a pure cookbook render (no `isFiltered`/`searchText` branches). Cookbook now has one writer (the fridge) -> the `classList`-vs-`style.display` collision is **structurally impossible**. Fixed by deletion, not a patch. Grep-clean confirmed: `filterAndDisplay`, `clearSearch`, `emptyStateClearSearch`, `searchResultsClearSearchButton`, `isFiltered`, `searchText` all zero hits.
- **Off-roadmap prod fixes:** base font set on `body` (`font-family: var(--ma-font-ui)`) — was never set globally, so form controls fell through `inherit` to Times on pages without per-element font. `recipe-method-label` id mismatch fixed.
### 🔧 In progress — 4a: close-out (on `main`)
Search architecture is **complete on `main`** (chunks 1, 2A, 2B, 2C all shipped). One step left to finish 4a:
 
- **Chunk 3 — merge `main` -> `ukrainian-demo`.** `git switch ukrainian-demo && git merge main`. Expect a conflict on `index.html` (main restructured it; uk swapped its script tag) — take main's structure, keep uk's `strings.uk.js` tag. Guard: `grep -l "strings.en.js" *.html` must come back empty — `search.html` is now a 4th file the guard covers, so repoint it too. Re-verify uk pages load uk strings + fridge/search flows work.
### Next
- **Ingredient-chip UX** (planned next): (a) split the shared `.chip` class so Add-Recipe chips are display-only (remove-button only) and Fridge chips keep their click interaction; (b) email-style ("To:" field) input where entered/quick-pick ingredients populate as chips, for Fridge and recipe-editing. Do together, on `main`, then merge to `ukrainian-demo`.

### Go to market
- Pitch Ukrainian brands with live per-brand demo links (branch + the swaps in `brand-demo.md`).
- **German** (`strings.de.js`): deferred until a concrete lead **or** a native reviewer appears.
### Phase 2 — 4b: Photo -> ingredients (flagship, after 4a settles)
Upload a fridge photo -> vision model identifies ingredients -> they populate the fridge UI as editable chips. **Prerequisite:** move the API key into a Cloudflare Pages Function (server-side) — gates every AI feature. Do not start until 4a is settled. Leads into the broader "cook with what's in my fridge" agent.
 
### Parked / later
- **Search input too wide in top nav on `recipe.html`** (next up) — likely tied to the `body`/input font fix; width inheriting oddly. Isolate on recipe.html vs the pages where it's fine.
- **Unify visibility to `.hidden`** — grep every `.style.display` and every `hidden` classList toggle; convert every *shared* element to `.hidden` in one pass (displayRecipes + fridge.js together). Never let one element see both mechanisms — that mix caused the original collision. Confirm `.hidden { display: none }` in CSS first.
- **Empty-cookbook state** — verify the add-recipe action (`indexAddRecipeButton`) is a working exit when the library is empty; reproduce by clearing all recipes.
- **`index.js` vs `fridge.js` merge decision** — with the title-filter path gone, see what's left in `index.js` (likely a thin bootstrap); fold into `fridge.js` or keep as a small file. Decide by inspection, don't merge preemptively.
- **search.html no-results: add "Browse all recipes" link -> index.html** (decided; not built). Skip a clear-search button there — the nav box + pre-fill already handle retry.
- Fixed Add-Recipe button overlaps the bottom recipe card on `index.html` (parked pending 4a's new structure).
- Custom domain to prettify the `pages.dev` URLs.
---
 
_Two docs, two half-lives: this file is the **whole map** (stable). A per-session scope is **one chunk** (ephemeral). Don't merge them._