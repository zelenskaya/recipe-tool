

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
- **Shared JS = `recipes.js`** — loaded on every page. Holds the shared atoms + data access: `makeRecipeCard`, `makeChip`, `displayRecipes`, `getRecipes`, `leafMaker`. Page-specific logic lives in the page's own file (`index.js`, `search.js`). Load `recipes.js` before any page script (no bundler; tag order = definition order).
  - **`fridge.js` is gone** — folded into `index.js` (the fridge *is* the homepage, so one page file owns it). `index.js` now owns fridge search + the index-page bootstrap.
- **`getRecipes()` = single data-access point** — reads localStorage, seeds from `seedRecipes` + persists on first visit, returns the array. Every page calls it; all surfaces read the same data. Seeding fires on whichever page loads first.
- **`makeRecipeCard(recipe)` = shared card atom** — one recipe in, one detached card out; appends nothing, names no container. Caller appends + adds surface-specific extras. Used by cookbook, fridge-top, fridge-partial, search.
- **`makeChip(label, onRemove)` = shared chip atom** — builds one detached chip (label + ✕ button, `type="button"`), wires ✕ to the caller's `onRemove` callback, returns it. Caller owns the array/index/splice via the callback and appends the result. Used by fridge ingredients + add-recipe ingredients. Does **not** call `lucide.createIcons()` — the caller runs that once after its render loop.
- **`leafMaker(text, className, tag = "div")`** — builds one detached element with text + class. `tag` defaults to `"div"` so existing callers are untouched; pass `"h3"` etc. for headings. (Level = semantics, class = styling — keep both: recipe titles are `<h3 class="recipe-title">`.)
- **`displayRecipes` = card render only** — takes `{recipes}`, fills/clears `#recipe-list`, owns `#index-empty-state` + the add-recipe-button style swap. **Does not touch `#recipes-section` visibility** (single-writer fix — below).
- **Single writer per surface (settled — the rule that kills collisions):** each result element is controlled by exactly one function.
  - `#recipes-section` (cookbook) visibility → owned solely by `handleFindRecipes`, set on **every** branch (incl. the empty-library exit). `displayRecipes` renders cards but never flips this section.
  - **Mutation triggers re-decision:** any change to `selectedIngredients` funnels through `renderSelectedChips`, which calls `handleFindRecipes` at the end, so results/empty-state always reflect the current chips.
- **Two-search model (settled):**
  - **Fridge search** = the homepage. Ingredient-coverage query: selected ingredients → recipes ranked by coverage (top / partial). **Runs instantly on every ingredient change** — no manual search button. No-match falls back to showing the full cookbook (message points to it).
  - **Find-by-name** = nav search box on every page → dedicated `search.html?q=…`. Full-text match over name + description + ingredients (`.includes` today; token-match later).
- **Cost decides the trigger:** cheap local mutations (typing an ingredient) run reactively; expensive async ones (image → ingredients via the vision API) get a deliberate button. Both feed the same `selectedIngredients` → `handleFindRecipes` pipeline.
- **Button tiers (settled):** `.button--primary` (berry, one main CTA per page), `.button--secondary` (outlined; Add / Edit / Clear), `.button--secondary.button--danger` (composed — secondary shape + red hover/focus/active; Delete). Back is a nav **link** (`.navigation-action`), not a button — don't force it into the tier system. Base `.button` owns the shared `transition`. A text-only/ghost tier was discussed but **not built** — don't add it just for one destructive button (which must stay discoverable on touch).
---
 
## Status
 
### ✅ Done
- Hosting on Cloudflare Pages (per-branch deploys, one repo).
- **Localisation on a clean, de-branded `main`** — en↔uk key parity ✓, count-neutral ✓, category keys English ✓.
- **Ukrainian demo LIVE** — branch `ukrainian-demo`, verified. Bitter font covers Cyrillic.
- **`brand-demo.md`** committed to `main`.
- **Fridge-as-homepage core** built + traced (empty / no-match / matches; every return restores the cookbook).
- **Chunk 1 — card dedup:** `makeRecipeCard` atom; 3 copies → one.
- **2A — `getRecipes()`**; **2B — find-by-name search** (`search.html`/`search.js`, `?q=`, three states, nav box on all pages); **2C — title-filter path deleted** (grep-clean).
- **Visibility unified to `.hidden`**; single-writer fix removed the last shared-element collision (`#recipes-section`).
- **`index.js` ← `fridge.js` merged**; two `document.title` writers reconciled to one owner.
- **Add-recipe button overlap fixed** — `position: fixed` button, `main:has(.button--sticky-on-bottom)` reserves `padding-bottom`.
- **`#recipes-section` single-writer** — `handleFindRecipes` owns visibility on all branches; delete-handler re-runs both content + visibility owners; empty-library shows library-empty copy.
- **Chunk A — chip atom:** `makeChip` extracted; both callers rewired to a closure over their own array/index. Typed-add dedupes. `type="button"` on ✕ killed a latent add-recipe form-submit bug.
- **Chip affordance:** quick-picks are `.chip--pickable` ghost chips (transparent fill, border, `+` prefix via `::before`, hover tint via `color-mix`, `border-color` on hover so width never jumps). In-field committed chips styled as a quieter tier (`.chip-field .chip`, lighter border).
- **Stale empty-state fixed** — search re-runs via the `renderSelectedChips` funnel; chips + message never disagree.
- **Chunk B — email-style chip field (Fridge), core complete:** `.chip-field` wrapper is the flex box (border/radius/padding, `flex-wrap`, `align-items: flex-start`); chips container is `display: contents` so chips flow as siblings of the input; input stripped bare (`.chip-field__input`) with a `:focus` override beating the global `input:focus` outline. **A4 done** — `flex: 1` + `min-width: 6rem` so the caret sits after the last chip and wraps (not collapses) when a line fills. Clear moved below the field (relabeled "Clear"; `.hidden` toggle governs visibility). Find-recipes button removed.
- **Instant search resolved:** typed search is reactive; **Find-recipes dropped**, **Add kept** as the mobile touch affordance (Enter-to-add is weak on soft keyboards). Both Add and Enter dedupe (shared guard in `handleAddIngredientFridgeMode`).
- **Button tiers overhaul:** Delete is `.button--secondary.button--danger` (composed); all danger states unified to the red palette (killed a berry-on-`:active` leftover). Fixed two silent bugs — an `--ma-errir` typo and a `--ma-border` vs `--ma-button-border` undefined-variable (border rendered invisible). Base `.button` `transition` added.
- **Heading hierarchy:** recipe titles are now `<h3 class="recipe-title">` (via `leafMaker` `tag` param), h1 > h2 > h3 contrast widened, h3 UA margin reset. Empty-state titles (fridge + index) removed to cut clutter; empty-state / no-match copy updated to point at the cookbook below.
- **Back-link hover** — colour shift on text + chevron (lucide follows `currentColor`; the `span` needed its own `:hover` rule because a broad `span, div { color }` blocked inheritance).
- **Missing-ingredients row (#5a, functional):** partial cards render a `.missing-row` (sunken background, small radius) with the label ("MISSING", `.missing-label`, uppercase) and the joined items split into two spans. **Visual treatment not final — parked (below).**
- **Decision: keep `recipes.js` name** (not `app.js`).
### 🔧 In progress — Chunk B remainder (small)
1. **A5 — focus pair:** click-to-focus (click anywhere in `.chip-field` → focus input; fixes the dead top-zone above the input line) + `:focus-within` on the wrapper (visible focus state, replacing the stripped outline — a11y). Do both together.
2. **Narrow-width pass** on the field.
### Next
- **Chunk C — chip field on add-recipe:** apply `.chip-field` + `.chip-field__input` + contents div to the add-recipe ingredient input. Reuses everything from A/B. Note: it's inside a `<form>`, so Enter behaves differently (the `type="button"` fix already prevents ✕ submitting).
- **Chunk 3 — merge `main` → `ukrainian-demo`** (branch hygiene). Now much wider — fridge fold, chip atom + field, single-writer, button tiers, hierarchy all landed. Expect a conflict on `index.html`: take main's structure, keep uk's `strings.uk.js` tag. Guard: `grep -l "strings.en.js" *.html` must be empty (covers `search.html`). Re-verify uk pages + flows.
### Backend (server-side)
- **Cloudflare Pages Function holding the vision API key server-side.** The app's backend integration and the **prerequisite that gates every AI feature** — the browser never sees the key. Build the Function, then wire an explicit "analyze photo" trigger that feeds recognised ingredients into `selectedIngredients` → the existing instant-search funnel. (Backend here = the Function; distinct from any hypothetical recipe database.)
### Phase 2 — Photo → ingredients (flagship)
Upload a fridge photo → vision model identifies ingredients → they populate the fridge chips (editable). Downstream of the backend Function. The image button is the *explicit* trigger; its handler only pushes ingredients into the array and lets the funnel re-decide — it must **not** re-implement search. Leads into the broader "cook with what's in my fridge" agent.
 
### Parked / later
- **Claude Design full audit** — briefed (live URL + `theme.css`), pending. When findings return, triage do / park / skip, one commit each — don't clear the whole list.
- **Missing-row visual treatment** — label/items alignment + font mismatch (label font vs items font sit off the shared line; tried same-font and `align-items`, still not liked). Revisit styling; row is functional meanwhile.
- **#5b — matched-ingredient count** — "N of M you have" in a success colour (positive framing of coverage). New DOM + string in the partial-card render; data already in `scoreRecipe` (`matched`/`total`).
- **Top-search vs fridge-input ambiguity** (Claude Design #3) — two search entry points read as competing on Home. Subordinate the nav search (icon that expands?) so the fridge input is unambiguously primary. Structural — touches the shared nav on every page.
- **Icon-row-as-logo** (Claude Design #6) — the three food icons top-left read as a wordmark but aren't one. Decide first: branding (real wordmark) vs functional (labelled category filters). A decision, not a styling task.
- **Mobile-first CSS pass** — base rules should *be* the mobile layout; add `min-width` media queries only where desktop diverges. Methodology refactor — its own deliberate, cross-cutting chunk.
- **Button transitions — verify they fire.** Suspected shorthand/longhand mismatch: transition names `background` / `border-color`, but some state rules set the `border` shorthand → colour may snap. Confirm (exaggerate to 1000ms to test), then set `border-color` in hover/focus/active rules or transition `border`.
- **Clean up commented empty-state `<h3>`s + orphaned string keys** — the removed fridge/index empty-state titles are commented, not deleted; `noIngredientsTitle` / `nothingFoundTitle` now unused in both `strings.*.js`. Delete for real; let git hold the memory.
- **Input error-hint affordance** — dupe-ingredient feedback (message + retain typed text) with clear-on-keystroke lifecycle; check if add-recipe needs the same → possible shared `showFieldError(field, msg)`. Ship message + text-retention together or neither.
- **Search input too wide in top nav on `recipe.html`** — likely tied to the input font fix; width inheriting oddly. Isolate vs pages where it's fine.
- **Empty-cookbook exit** — verify `indexAddRecipeButton` is a working exit when the library is empty; reproduce by clearing all recipes.
- **search.html no-results: "Browse all recipes" link → index.html** (decided; not built).
- **Third add-path refactor** — if a third ingredient-add path appears, extract `addIngredient(name)` owning trim + lowercase + dedupe + render. Not before.
- **Mobile safe-area** — sticky button `bottom` should clear the home indicator: `calc(var(--ma-5) + env(safe-area-inset-bottom))`. Low priority.
- **`unpkg.com/lucide@latest`** — third-party CDN on a moving version; pin or vendor if reliability ever matters.
- **German** (`strings.de.js`) — only if a native reviewer appears.
- **Custom domain** to prettify the `pages.dev` URLs.
---
 
_Two docs, two half-lives: this file is the **whole map** (stable). A per-session scope is **one chunk** (ephemeral). Don't merge them._
 








