# Backlog for the Recipe tool



### Scan robustness
_(tackle as a cluster before or with the photo-scan merge)_

- **Repeat-scan stacks duplicates** — pressing Scan twice pushes the same ingredients again. Check whether the shared-dedupe item below fixes it, or if scan needs its own re-run guard.
- **Shared `addIngredient(name)` + dedupe** — fridge + add-recipe + scan all push without trim/lowercase/dedupe. One guarded function for all three. (Live proof: scan read "bananas", recipe had "banana" → no match.)
- DONE **File-format validation** — no check the upload is a supported image type. Untrusted-input guard, separate from the null-check.
- **Clear-vs-retain photo on failure** — decision, not code: remove the photo (force re-pick) or keep it (allow retry)? A failure may be a fixable mislabel, not a bad photo.
- **Remove/replace fridge photo** once uploaded — UX gap now the scan flow exists.
- Plural mismatch in fridge matcher. Fridge and recipe ingredients must match in the same grammatical number, or a makeable recipe silently drops from results. Fridge "bananas" fails to match recipe "banana" (and vice versa). Cause: scoreRecipe compares whole words — fridgeIngredients.includes(word) — so "banana" !== "bananas". A false negative (hides recipes you can actually cook), worse than the accepted false positives like potato→sweet potato. Will be common once real content lands, since screenshots and user chips pluralize unpredictably.
Not a one-line fix: normalize runs on the recipe side but not the fridge side, so any fix touches both; and English plurals aren't uniform (tomato→tomatoes, irregulars), so crude trailing-s stripping spawns new mismatches. Decide the approach at build time — canonicalize at source vs. fuzzy-match at compare (both discussed).
-  HEIC format is not parseable yet. Triggered by: when an iPhone user's upload fails:
- **ViewTransition console error** Uncaught (in promise) InvalidStateError: Transition was aborted... opt-in disabled on add-recipe, seen during a recipe scan. It comes from @view-transition { navigation: auto }. 

### Known bugs
- **Edit-recipe: save-button label vanishes** after changing an ingredient (saves fine). Likely the same `applyStrings`/`textContent` family as other label-loss bugs. - not reproducing on main
- **Search input too wide in top nav on `recipe.html`** — width inheriting oddly; isolate vs. pages where it's fine. - not reproducing on main
- **Empty-cookbook exit** — verify the add-recipe button works when the library is empty (reproduce by clearing all recipes).
- **Food only** — medicine should not go to ingredients
- **Only absent from fridge in suggested chips** — if an ingredient is recognized in the fridge contents it should disappear from the suggested chips
- **Missing cards ingredient alignment** — in the recipe cards on the index page, in the MISSING part on the card bottom, where the missing ingredients are displayed, if there are more than one line of missing ingredients, lines with the missing ingredients should be top aligned with that MISSING label. now they are center aligned.
- **Categories localization** - whenever a recipe is displayed, either as a separate page or a list of recipes, all categories are in English even for Ukrainian and German demos.
- **Browser-language validation messages** - on add/edit recipe page, if input field has invalid data or if a required field's data is missing, browser shows a default error and that error is in browser's language
- **Latin-Cyrillic regex check in recipe scan**
- **Singular/plural from scans in recipe scan**
- **Character-level typos in Cyrillyc in recipe scan**



- **FLIP multi-row jump** — when chips wrap to 2+ rows, removing a chip from an upper row makes a lower-row chip animate diagonally/weirdly as it reflows up to the row above. FLIP handles x/y translation but the vertical row-jump reads as broken. 

Trigger unless stated: users need it, or complain about something it solves

### Features / decisions
- **Add/edit-recipe ingredient suggestions** — chip row or autocomplete below the field. Decide static-staples vs. frequency-ranked-from-recipes (latter also canonicalises spelling → cleaner matching). Add-recipe has no suggestion row today, by design.
- **Input error-hint affordance** — dupe feedback (message + retain typed text), clear-on-keystroke. Check if fridge + add-recipe both need it → shared `showFieldError(field, msg)`.
- **search.html no-results → "Browse all recipes" link** to index.html (decided, not built).
- **Confirm ingredient-chip page count** — does a separate edit-recipe page exist? If so it needs the same `.chip-field`. If add-recipe is the only one, this is closed.
- **Scanning into user's selected language** - As for now, images are scanned into the language they are in. Once I introduce language switching recipes are scanned and translated into user's selectedlanguae



### Polish / someday
- **Scan accurateness** — the model was not good at recognizing my food. result was not accurate. later i am considering testing other models or maybe giving them more detailed instructions.
- **Mobile safe-area** — sticky button `bottom` should clear the home indicator: `calc(var(--ma-5) + env(safe-area-inset-bottom))`.
- **`unpkg.com/lucide@latest`** — third-party CDN on a moving version; pin or vendor if reliability matters.
- **Custom domain** to prettify the `pages.dev` URLs.
- **Optional ingredients section** - if a recipe includes variations or optional ingredients per taste then optional ingredients go to the optional ingredients section
- **Regex check for a model response** - if a model's response mixes Latin and Cyrillic letters, regex check flags words mixing Latin and Cyrillic. models re-checks them.
- **Name + quantity only rule for each ingredient** - work to have only these in the ingredients. for now, ingredients is a long string if there is vaque wording.
- **Localization** a switch that allows users to switch languages

