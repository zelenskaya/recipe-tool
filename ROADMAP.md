


Roadmap · MD
# Maya Approves? — Product Roadmap


## The product
A vanilla-JS, multi-page recipe web app (pages: index, recipe, add-recipe, search).

The app is built to be **re-skinnable and localisable** — each brand/language is a Git branch off `main` swapping a few files. This shapes the theming (`theme.css` tokens) and localisation (`strings.*.js`) design.

## Architecture
- **Hosting:** Cloudflare Pages, per-branch previews. `main` → `recipe-tool-59u.pages.dev` (the canonical live app). Each brand/lang branch → `{branch}.recipe-tool-59u.pages.dev`, automatically.
- **`main` stays clean and generic** — the source every branch inherits from. Brand skin never lands on `main`.
- **Localisation:** `strings.*.js` live on `main`, identical keys, one loads per page via the `<script>` tag.
- **Per-brand swap files** (per `brand-demo.md`): `images/logo.svg`, `images/favicon.svg`, `theme.css`, optionally the language file. Keep structure and asset paths unchanged.
- **Shared JS = `recipes.js`** — loaded on every page before any page-specific script. No bundler, so tag order = load order; you place `recipes.js` first yourself.
- **`getRecipes()` is the single data-access point** — every page reads recipe data through it; nothing reads storage directly, so all pages stay in sync.
- **Single writer per surface** — each DOM element is updated by exactly one function, so writers can't collide and silently overwrite each other.
- **Two-search model:**
  - **Fridge search** (homepage) — selected ingredients → recipes ranked by coverage (top / partial). Runs instantly on every ingredient change; no search button.
  - **Find-by-name** — nav search box on every page → `search.html?q=…`. Full-text match over name + description + ingredients.
- **Cost decides the trigger:** cheap local actions (typing an ingredient) run reactively; expensive async ones (photo → ingredients via the vision API) get a deliberate button.


## Next


1. **Style update.** Look into recommendations from Claude Design.
2. **Shimmer skeleton for the photo scan** — a shimmering placeholder while the vision model thinks.
3. **Dark mode, driven by tokens.** 
4. **Scroll-driven card reveal**
5. **Toast / snackbar**
6. **A count-up number on the fridge result**
7. **Recip screenshot to digital conversion**
8. **Sync all branches to `main`** — `ukrainian-demo`, `german-demo`, `hohenloher-molkerei-demo`, `hubermuehle-demo`, `lifeway-demo` each merge `main`. Guard on lang branches: `grep -l "strings.en.js" *.html` empty.

## Parked

### Scan robustness
_(tackle as a cluster before or with the photo-scan merge)_

- **Repeat-scan stacks duplicates** — pressing Scan twice pushes the same ingredients again. Check whether the shared-dedupe item below fixes it, or if scan needs its own re-run guard.
- **Shared `addIngredient(name)` + dedupe** — fridge + add-recipe + scan all push without trim/lowercase/dedupe. One guarded function for all three. (Live proof: scan read "bananas", recipe had "banana" → no match.)
- **File-format validation** — no check the upload is a supported image type. Untrusted-input guard, separate from the null-check.
- **Clear-vs-retain photo on failure** — decision, not code: remove the photo (force re-pick) or keep it (allow retry)? A failure may be a fixable mislabel, not a bad photo.
- **Remove/replace fridge photo** once uploaded — UX gap now the scan flow exists.

### Known bugs
- **Edit-recipe: save-button label vanishes** after changing an ingredient (saves fine). Likely the same `applyStrings`/`textContent` family as other label-loss bugs. - not reproducing on main
- **Search input too wide in top nav on `recipe.html`** — width inheriting oddly; isolate vs. pages where it's fine. - not reproducing on main
- **Empty-cookbook exit** — verify the add-recipe button works when the library is empty (reproduce by clearing all recipes).
- **Food only** — medicine should not go to ingredients
- **Only absent from fridge in suggested chips** — if an ingredient is recognized in the fridge contents it should disappear from the suggested chips
- **Missing cards ingredient alignment** — in the recipe cards on the index page, in the MISSING part on the card bottom, where the missing ingredients are displayed, if there are more than one line of missing ingredients, lines with the missing ingredients should be top aligned with that MISSING label. now they are center aligned.





- **FLIP multi-row jump** — when chips wrap to 2+ rows, removing a chip from an upper row makes a lower-row chip animate diagonally/weirdly as it reflows up to the row above. FLIP handles x/y translation but the vertical row-jump reads as broken. 
### Features / decisions
- **Add/edit-recipe ingredient suggestions** — chip row or autocomplete below the field. Decide static-staples vs. frequency-ranked-from-recipes (latter also canonicalises spelling → cleaner matching). Add-recipe has no suggestion row today, by design.
- **Input error-hint affordance** — dupe feedback (message + retain typed text), clear-on-keystroke. Check if fridge + add-recipe both need it → shared `showFieldError(field, msg)`.
- **search.html no-results → "Browse all recipes" link** to index.html (decided, not built).
- **Confirm ingredient-chip page count** — does a separate edit-recipe page exist? If so it needs the same `.chip-field`. If add-recipe is the only one, this is closed.

### Polish / someday
- **Scan accurateness** — the model was not good at recognizing my food. result was not accurate. later i am considering testing other models or maybe giving them more detailed instructions.
- **Mobile safe-area** — sticky button `bottom` should clear the home indicator: `calc(var(--ma-5) + env(safe-area-inset-bottom))`.
- **`unpkg.com/lucide@latest`** — third-party CDN on a moving version; pin or vendor if reliability matters.
- **Custom domain** to prettify the `pages.dev` URLs.
