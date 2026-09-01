

Roadmap · MD
# Maya Approves? — Product Roadmap
 
_Single source of truth. Lives at the repo root on `main` and in the Claude Project knowledge base. To keep it current: at the end of a session, move items between the sections below — that's the whole ritual. It's a map, not a tracker._
 
## The product
A vanilla-JS, multi-page recipe web app (pages: index [fridge-as-homepage], recipe, add-recipe, search). **Purpose right now: learning and sharpening craft by building and improving the app.** No portfolio or brand-pitch work for the time being.
 
Architecturally the app is built to be **re-skinnable and localisable** — each brand/language is a Git branch off `main` swapping a few files. This shapes the theming (`theme.css` tokens) and localisation (`strings.*.js`) design, and is worth maintaining as an engineering pattern independent of any go-to-market use.
 
## Architecture (settled — don't relitigate)
- **Hosting:** Cloudflare Pages, per-branch previews. `main` → `recipe-tool-59u.pages.dev` (the canonical live app). Each brand/lang branch → `{branch}.recipe-tool-59u.pages.dev`, automatically.
- **`main` stays clean and generic** — the source every branch inherits from. Brand skin never lands on `main`.
- **Localisation:** `strings.en.js` + `strings.uk.js` both live on `main`, identical keys; only one loads per page (the `<script>` tag is the language selector). Translate once on `main`; every branch inherits it.
- **Per-brand swap files** (per `brand-demo.md`): `images/logo.svg`, `images/favicon.svg`, `theme.css`, optionally the language file. Keep structure and asset paths unchanged.
- **Shared JS = `recipes.js`** — loaded on every page. Holds the shared atoms + data access: `makeRecipeCard`, `makeChip`, `displayRecipes`, `getRecipes` (+ `leafMaker`). Page-specific logic lives in the page's own file (`index.js`, `search.js`). Load `recipes.js` before any page script (no bundler; tag order = definition order).
  - **`fridge.js` is gone** — folded into `index.js` (the fridge *is* the homepage, so one page file owns it). `index.js` now owns fridge search + the index-page bootstrap.
- **`getRecipes()` = single data-access point** — reads localStorage, seeds from `seedRecipes` + persists on first visit, returns the array. Every page calls it; all surfaces read the same data. Seeding fires on whichever page loads first.
- **`makeRecipeCard(recipe)` = shared card atom** — one recipe in, one detached card out; appends nothing, names no container. Caller appends + adds surface-specific extras. Used by cookbook, fridge-top, fridge-partial, search.
- **`makeChip(label, onRemove)` = shared chip atom** — builds one detached chip (label + ✕ button, `type="button"`), wires ✕ to the caller's `onRemove` callback, returns it. Caller owns the array/index/splice via the callback and appends the result. Used by fridge ingredients + add-recipe ingredients. Does **not** call `lucide.createIcons()` — the caller runs that once after its render loop.
- **`displayRecipes` = card render only** — takes `{recipes}`, fills/clears `#recipe-list`, owns `#index-empty-state` + the add-recipe-button style swap. **Does not touch `#recipes-section` visibility** (single-writer fix — below).
- **Single writer per surface (settled — the rule that kills collisions):** each result element is controlled by exactly one function.
  - `#recipes-section` (cookbook) visibility → owned solely by `handleFindRecipes`, set on **every** branch (incl. the empty-library exit). `displayRecipes` renders cards but never flips this section.
  - **Mutation triggers re-decision:** any change to `selectedIngredients` funnels through `renderSelectedChips`, which calls `handleFindRecipes` at the end, so results/empty-state always reflect the current chips.
- **Two-search model (settled):**
  - **Fridge search** = the homepage. Ingredient-coverage query: selected ingredients → recipes ranked by coverage (top / partial). **Runs instantly on every ingredient change** — no manual search button.
  - **Find-by-name** = nav search box on every page → dedicated `search.html?q=…`. Full-text match over name + description + ingredients (`.includes` today; token-match later).
- **Cost decides the trigger:** cheap local mutations (typing an ingredient) run reactively; expensive async ones (image → ingredients via the vision API) get a deliberate button. Both feed the same `selectedIngredients` → `handleFindRecipes` pipeline.
---
 
## Status
 
### ✅ Done
- Hosting on Cloudflare Pages (per-branch deploys, one repo).
- **Localisation on a clean, de-branded `main`** — en↔uk key parity ✓, count-neutral ✓, category keys English ✓.
- **Ukrainian demo LIVE** — branch `ukrainian-demo`, all pages load `strings.uk.js`, verified. Bitter font covers Cyrillic.
- **`brand-demo.md`** committed to `main`.
- **Fridge-as-homepage core** built + traced (empty / no-match / matches paths; every return restores the cookbook).
- **Chunk 1 — card dedup:** `makeRecipeCard` atom extracted; 3 copies collapsed to one.
- **2A — `getRecipes()`:** localStorage-or-seed read in one function; returns the array.
- **2B — find-by-name search:** `search.html` + `search.js`, `?q=` full-text match, three states; nav search box on all pages.
- **2C — title-filter path deleted:** removed `filterAndDisplay` / `clearSearch` + buttons/listeners; `displayRecipes` stripped to a pure render. Grep-clean confirmed.
- **Visibility unified to `.hidden`** (earlier pass); this session's single-writer fix removed the last shared-element collision (`#recipes-section`).
- **`index.js` ← `fridge.js` merged** — fridge logic folded into `index.js`, separate script tag removed (resolved the parked merge decision). Two `document.title` writers reconciled to one owner.
- **Add-recipe button overlap fixed** — button is `position: fixed` (out of flow), so `main:has(.button--sticky-on-bottom)` reserves `padding-bottom` = button height + gap; the last card clears it.
- **`#recipes-section` single-writer** — `displayRecipes` no longer flips it; `handleFindRecipes` owns it on all branches; delete-handler re-runs both content + visibility owners; empty-library now shows library-empty copy (was mis-showing "nothing found").
- **Chunk A — chip atom:** `makeChip(label, onRemove)` extracted; both callers (fridge + add-recipe) rewired to pass a closure over their own array/index. Typed-add now dedupes (was quick-pick-only). Pickable quick-pick chips get `cursor: pointer` via `.chip--pickable`; ✕ gets pointer via `.removeIcon`. `type="button"` on ✕ killed a latent add-recipe form-submit bug.
- **Stale empty-state fixed** — search re-runs via the `renderSelectedChips` funnel, so chips + message never disagree.
- **Decision: instant search** — typed ingredient search is reactive; "Add" and "Find recipes" buttons are redundant and will be removed (helper text replaces Add).
- **Decision: keep `recipes.js` name** (not `app.js`) — the name is honest (shared atoms + data access); a rename would churn 4 pages for no gain.
### 🔧 In progress — Chunk B: email-style chip field (Fridge)
The ingredient input is being rebuilt as a "To:"-style field — chips flow inline inside one bordered box with the text input.
 
Done so far:
- Markup regrouped: `.chip-field` wrapper holds the chips container (`display: contents`, so chips become flex items of the wrapper) + the input. Add button pulled out.
- `.chip-field` is the flex box (border/padding/radius; `flex-wrap: wrap`; `align-items: flex-start`).
- Input stripped to a bare surface (`.chip-field__input`: no border/background/outline/padding) so only the wrapper reads as a field. Focus box fixed via `.chip-field__input:focus` override (beats the global `input:focus` outline).
- In-field chips: transparent fill, lighter border (`--ma-chip-in-input-border` = `#e9ddd6`) so they read as a quieter tier than the field border.
Remaining (in order):
1. **A4 — inline input sizing:** `flex: 1` + `min-width` on `.chip-field__input` so the caret sits after the last chip and wraps (not collapses) when a line fills.
2. **A5 — focus pair:** click-to-focus (click anywhere in `.chip-field` → focus input; fixes the dead top-zone) + `:focus-within` on the wrapper (visible focus state, replacing the stripped outline — a11y).
3. **Clear-search placement:** move it directly below the field; existing `.hidden` toggle governs visibility (shows only when chips exist). One "Clear" = clears ingredients (which, under instant search, clears results too).
4. **Button restructure:** remove Add + Find recipes from markup; add helper text ("Type and hit Enter to add"). **Mobile-first caveat:** Enter-to-add is weak on soft keyboards — decide a touch add affordance.
5. **Narrow-width pass.**
### Next
- **Chunk C — chip field on add-recipe:** apply `.chip-field` + `.chip-field__input` + contents div to the add-recipe ingredient input. Reuses everything from A/B. Note: it's inside a `<form>`, so Enter behaves differently (the `type="button"` fix already prevents ✕ submitting).
- **Chunk 3 — merge `main` → `ukrainian-demo`** (branch hygiene; keep the two in sync). Now wider — the fridge fold, chip atom, and single-writer all landed. Expect a conflict on `index.html`: take main's structure, keep uk's `strings.uk.js` tag. Guard: `grep -l "strings.en.js" *.html` must be empty (covers `search.html` too). Re-verify uk pages + flows.
### Backend (server-side)
- **Cloudflare Pages Function holding the vision API key server-side.** This is the app's backend integration and the **prerequisite that gates every AI feature** — the browser never sees the key. Build the Function, then wire an explicit "analyze photo" trigger that feeds recognised ingredients into `selectedIngredients` → the existing instant-search funnel. (Backend here = the Function; distinct from any hypothetical recipe database — don't conflate the two.)
### Phase 2 — Photo → ingredients (flagship)
Upload a fridge photo → vision model identifies ingredients → they populate the fridge chips (editable). Sits downstream of the backend Function above. The image button is the *explicit* trigger (expensive async action); its handler only pushes ingredients into the array and lets the funnel re-decide — it must **not** re-implement search. Leads into the broader "cook with what's in my fridge" agent.
 
### Parked / later
- **Input error-hint affordance** — dupe-ingredient feedback (message + retain typed text) with a clear-on-keystroke lifecycle; check if add-recipe needs the same → possible shared `showFieldError(field, msg)`. (Deferred with the instant-search decision; ship message + text-retention together or neither.)
- **Search input too wide in top nav on `recipe.html`** — likely tied to the input font fix; width inheriting oddly. Isolate vs pages where it's fine.
- **Empty-cookbook exit** — verify `indexAddRecipeButton` is a working exit when the library is empty; reproduce by clearing all recipes.
- **search.html no-results: "Browse all recipes" link → index.html** (decided; not built).
- **Third add-path refactor** — if a third ingredient-add path appears, extract `addIngredient(name)` owning trim + lowercase + dedupe + render; all paths call it. Not before.
- **Mobile safe-area** — sticky button `bottom` should clear the home indicator: `calc(var(--ma-5) + env(safe-area-inset-bottom))`. Low priority.
- **`unpkg.com/lucide@latest`** is a third-party CDN on a moving version — fine for now; pin or vendor if reliability ever matters.
- **German** (`strings.de.js`) — only if a native reviewer appears. No commercial driver.
- **Custom domain** to prettify the `pages.dev` URLs.
---
 
_Two docs, two half-lives: this file is the **whole map** (stable). A per-session scope is **one chunk** (ephemeral). Don't merge them._
 








