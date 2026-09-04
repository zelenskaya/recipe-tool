


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
- **Chip system (settled — two treatments, don't add a third):** committed = base `.chip` (transparent fill + `--ma-chip-in-input-border` 1px border); pickable = `.chip--pickable` (adds `+ `, tan border, hover fill). Committed is the *default* — no `.chip--committed`. The chip *input* is a shared pattern: `.chip-field` (bordered flex box) + `.chip-field__input` (bare input) + `.chip-field__chips` (`display: contents`, so chips are flex siblings of the input, not trapped in a sub-box). Fridge + add-recipe use it identically. `--ma-chips` retired.
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
- **`index.js` ← `fridge.js` merged** — fridge logic folded into `index.js`, separate script tag removed. Two `document.title` writers reconciled to one owner.
- **Add-recipe button overlap fixed** — button is `position: fixed` (out of flow), so `main:has(.button--sticky-on-bottom)` reserves `padding-bottom` = button height + gap; the last card clears it.
- **`#recipes-section` single-writer** — `displayRecipes` no longer flips it; `handleFindRecipes` owns it on all branches; delete-handler re-runs both content + visibility owners; empty-library shows library-empty copy.
- **Chunk A — chip atom:** `makeChip(label, onRemove)` extracted; both callers (fridge + add-recipe) rewired to pass a closure over their own array/index. Typed-add dedupes. Pickable quick-pick chips get `cursor: pointer` via `.chip--pickable`; ✕ gets pointer via `.removeIcon`. `type="button"` on ✕ killed a latent add-recipe form-submit bug.
- **Stale empty-state fixed** — search re-runs via the `renderSelectedChips` funnel, so chips + message never disagree.
- **Chip treatments collapsed to two (colour, CSS-only).** Base `.chip` is now committed-style: transparent fill + `1px solid var(--ma-chip-in-input-border)` (was grey `--ma-chips` fill + transparent border). Redundant `.chip-field .chip` override deleted — base *is* that now. `--ma-chips` removed from `theme.css` (no brand inherits a dead token). Suggestion chips safe: `.chip--pickable` re-specifies both fill *and* full border shorthand, so the base change can't reach them (equal specificity, pickable later in source → wins). Faint-contrast on page background verified when add-recipe chips flipped in place. Result: two treatments only — committed `.chip`, pickable `.chip--pickable`.
- **Chunk C — chip field on add-recipe.** Add-recipe ingredients wrapped in `.chip-field`; chips container class swapped `tags` → `.chip-field__chips` (reuses the fridge's `display: contents` class), `#chips-container` id kept as the render hook, input got `.chip-field__input`. Field now identical to the fridge (screenshot-1 parity). Enter guarded — `keydown` → `e.key === "Enter"` → `preventDefault()` → `handleAddIngredient()`, so the `<form>` doesn't submit/reload; Add button kept *outside* `.chip-field` as the safe commit path. A5 click-to-focus + `:focus-within` inherited free (bound to `.chip-field`, not the fridge element). No suggestion row (parked).
- **Decision: instant search** — typed ingredient search is reactive; helper text replaces Add on the fridge.
- **Decision: keep `recipes.js` name** (not `app.js`) — honest name; rename would churn 4 pages for no gain.
### 🔧 In progress — Chunk B: email-style chip field (Fridge)
The ingredient input is a "To:"-style field — chips flow inline inside one bordered box with the text input.

Done so far:
- Markup regrouped: `.chip-field` wrapper holds the chips container (`.chip-field__chips`, `display: contents`) + the input. Add button pulled out.
- `.chip-field` is the flex box (border/padding/radius; `flex-wrap: wrap`; `align-items: center` — centres chip + caret together on a single row).
- Input stripped to a bare surface (`.chip-field__input`) so only the wrapper reads as a field.
- In-field chips read as the committed tier (base `.chip` after the colour collapse).
- **A5 — focus pair: ✅ done.** `.chip-field:focus-within` lights the wrapper; click-to-focus inherited by add-recipe.
- **A4 — inline input sizing: ✅ done.** `flex: 1` + `min-width: 6rem` on `.chip-field__input`: caret sits after the last chip; when a row fills, the input wraps whole to a new line (not a sliver). Verified both fields (shared CSS).
- **Empty-state height fixed.** Root cause: the generic `input,select,textarea { height }` rule still hit `.chip-field__input` (padding/border were overridden, height wasn't), and the wrapper's vertical padding stacked on top → box too tall. Fix: `height: auto` on `.chip-field__input` (class beats element selector), `min-height: var(--ma-input-height)` moved onto the wrapper as the empty-state floor. Empty field now matches the search box; chip rows are legitimately a touch taller (chip padding) — expected.
- **Clear-search placement + lifecycle: ✅ done.** Clear shows only when `selectedIngredients.length > 0` (toggled through the `renderSelectedChips` funnel); clicking it clears ingredients → results reset under instant search. Add + Clear paired below the field.

Remaining (in order):
1. **Button restructure — decision, not build.** Add + Clear already exist. Open call = helper-text copy + affordance. Keep Add as the touch path (Enter weak on soft keyboards); helper text teaches the Enter path without removing Add. **Watch overlap:** results area already shows empty-state helper ("Enter some ingredients to find recipes…") — decide which surface teaches the input gesture so they don't duplicate.
2. **Narrow-width pass.**
### Focus system — unified to berry (Claude Design)
 
✅ Done:
- **Universal ring:** `:focus-visible { outline: 1px solid var(--ma-focus) }` — no element list; one rule paints focus on every interactive element (buttons, links, inputs, chip ✕), replacing the browser (UA) default. Opt-out model: any custom-focus element must beat (0,1,0).
- **Fake-textarea focus:** `.chip-field:focus-within { outline: 1px solid var(--ma-focus) }`. The wrapper `<div>` never gets `:focus-visible` itself, so this is the only thing lighting it when the inner input is focused. Delegation: inner ring off (`.chip-field__input:focus { outline: none }`), wrapper ring on. Chunk C's add-recipe field inherits this free.
- **Token** `--ma-focus` → `rgba(var(--ma-primary-rgb), …)`; alpha raised from .35 (too faint on a 1px line).
- Loose token change (unrelated): `--ma-warning` → `#e0773a`.
Open (decided direction, not yet executed):
- **Delete redundant rule:** `:is(input,select,textarea):focus-visible` now produces an identical ring to universal — pure no-op. Remove it.
- **Button ring decision:** `.button:focus-visible { 3px + offset }` — keep (emphasised ring on big targets) or delete (uniform 1px everywhere). Not a bug either way; pick the look.
Keep — load-bearing, don't "clean up":
- `.chip-field:focus-within` — sole lighter of the wrapper.
- `.chip-field__input:focus { outline: none }` — kills the inner ring so only the wrapper shows; beats universal by specificity.
- `:is(…):user-invalid { … --ma-error }` — validity trigger, not focus. On a focused+invalid input, error wins by specificity (intentional).
Single-writer (CSS): focus now has one base owner (`:focus-visible`) + intentional per-surface overrides. No stray `:focus` rules, so no click-vs-keyboard divergence.
 
### Next
- **Chunk 3 — merge `main` → `ukrainian-demo`** (branch hygiene; keep the two in sync). Drift is now wider — landed on `main` since last sync: fridge fold, chip atom, single-writer, **chip-collapse (two treatments, `--ma-chips` gone), `.chip-field` on add-recipe, and the focus system**. Expect a conflict on `index.html` (and `add-recipe.html` now): take main's structure, keep uk's `strings.uk.js` tags. Guard: `grep -l "strings.en.js" *.html` must be empty (covers `search.html` too). Re-verify uk pages + flows.
### Backend (server-side)
- **Cloudflare Pages Function holding the vision API key server-side.** This is the app's backend integration and the **prerequisite that gates every AI feature** — the browser never sees the key. Build the Function, then wire an explicit "analyze photo" trigger that feeds recognised ingredients into `selectedIngredients` → the existing instant-search funnel. (Backend here = the Function; distinct from any hypothetical recipe database — don't conflate the two.)
### Phase 2 — Photo → ingredients (flagship)
Upload a fridge photo → vision model identifies ingredients → they populate the fridge chips (editable). Sits downstream of the backend Function above. The image button is the *explicit* trigger (expensive async action); its handler only pushes ingredients into the array and lets the funnel re-decide — it must **not** re-implement search. Leads into the broader "cook with what's in my fridge" agent.
 
### Parked / later
- **Add/edit-recipe ingredient suggestions** — chip row or autocomplete below the ingredient field. Decide static-staples vs. frequency-ranked-from-existing-recipes (the latter also canonicalises ingredient spelling → cleaner `.includes` matching). Parked behind the chip-collapse refactor (now shipped) — pick static-vs-autocomplete on purpose when it comes up. Note: add-recipe has **no** suggestion row today, by design; this would add one.
- **Shared `addIngredient(name)` + dedupe** — both add paths (fridge + add-recipe `handleAddIngredient`) push without a dupe check; the add-recipe screenshot shows two `eggs`. Extract `addIngredient(name)` owning trim + lowercase + dedupe + render; both paths call it, fix lands once for both. Supersedes the old "only extract when a 3rd path appears" framing — the dupe bug is the trigger. Pair with the error-hint affordance below if shipping user-facing dupe feedback.
- **Input error-hint affordance** — dupe-ingredient feedback (message + retain typed text) with a clear-on-keystroke lifecycle; check if fridge + add-recipe both need it → shared `showFieldError(field, msg)`. Ship message + text-retention together or neither.
- **Confirm ingredient-chip page count** — header reads *Add recipe*; earlier an "edit recipe" page was mentioned as older. If a separate edit page exists, it needs the same `.chip-field` treatment or the inconsistency survives there. If add-recipe is the only such page, this is closed.
- **Search input too wide in top nav on `recipe.html`** — likely tied to the input font fix; width inheriting oddly. Isolate vs pages where it's fine.
- **Empty-cookbook exit** — verify `indexAddRecipeButton` is a working exit when the library is empty; reproduce by clearing all recipes.
- **search.html no-results: "Browse all recipes" link → index.html** (decided; not built).
- **Mobile safe-area** — sticky button `bottom` should clear the home indicator: `calc(var(--ma-5) + env(safe-area-inset-bottom))`. Low priority.
- **`unpkg.com/lucide@latest`** is a third-party CDN on a moving version — fine for now; pin or vendor if reliability ever matters.
- **German** (`strings.de.js`) — only if a native reviewer appears. No commercial driver.
- **Custom domain** to prettify the `pages.dev` URLs.
---
 
_Two docs, two half-lives: this file is the **whole map** (stable). A per-session scope is **one chunk** (ephemeral). Don't merge them._
 




