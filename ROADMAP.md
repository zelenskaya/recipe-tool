


Roadmap · MD
# Recipe tool — Product Roadmap


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

## In progress
**Recipe screenshot to digital conversion**
Scope: change recipe ingredients to fused strings. Adding sourceUrl as optional field to the recipe onject, to link to recipe source. For the recipe that is generated from the screenshot, source field is left empty. 

Steps for this scope:
- DONE Step 1, schema reshape + seed cut. Add sourceUrl to the recipe object (save path in add-recipe.js, and the shape the form reads). Cut the seed file to the few recipes I own.
- DONE Step 2, prefill the form from a plain object, no AI. Hand a hardcoded fake recipe object (fused-string ingredients, a category, a description) to the existing edit-prefill path and confirm it populates every field and saves.
- Step 3, the AI call. The AI's JSON must use exactly these field names: title, description, category, ingredients.

- decisions for step 3
- scan of the image is add-only, adding scan to the edit recipe view increases cognitive load without adding much value.
- If a recipe contains base ingredients as well as optional ingredients, then only base ingredients are populated into the ingredients section. 
-  The server reports the error type, not just ok/not-ok.
- Retried once: network failures, 5xx (including 529), and 429
- Retry only if a full attempt still fits in the time budget, after a 1s pause
- If AI returns 400 or 413 , return to user an error that the upload image was invalid, don't retry.
- Any other 4xx means the request was rejected, don't retry.
- AI call timeouts are never retried: a timed-out attempt has already used 25s, so a second one can't fit the 35s budget.
The Client timeout covers the whole Server budget.
Clear the file on parse failure.
- populateForm replaces every field, lowercases the category, and uses "uncategorized" for a missing or invalid category.
-DONE 3a — upload → Function → echo back, no AI. File input, valid file? , read to base64, POST to the Function; Function just replies "got it, N bytes, type X." Proves transport, media_type (the PNG fix lands here), Function routing, size sanity — the environment-specific stuff that breaks in weird ways. Isolate it before spending API calls on top. Verify: screenshot → Function acknowledges correct type + size. disable/enable controls.
- DONE 3a1. Client status check. Make the echo return an error on purpose to test it
-  3a.2. Client timeout: DONE. Make the echo return an error on purpose to test it. Extract the shared transport helper, switch the fridge scan to it. - this was descoped: “extract the shared transport + switch fridge scan to it” (deferred, since I'm hiding fridge scan)
- DONE (off-roadmap, part of the 3a client work): valid-file check (image MIME -> failedInvalidImage), convert-failure catch -> failedInvalidImage, keyed error messages en/uk/de (UI.recipeScan.*), and the upload helper label. Full client state machine - idle / fileReady / inFlight / success / failedCanRetry / failedInvalidImage - complete and config-driven.

3b DONE — Function calls the vision API, returns raw text. Adds exactly one thing: the API call. Model gets image + prompt; you return its raw answer, no parsing. This is where you iterate the prompt — your practice-AI core. Verify: real screenshot → recipe-shaped free text comes back. If it breaks, it's prompt/API, since 3a ruled out transport.
Decided: extract the FULL object (title; description = prose or steps, one per line, unnumbered - steps only if original recipe is formatted in steps; category from the enum; ingredients as fused strings; sourceUrl empty). Return raw text, no parsing yet (that’s 3c). ingredients.js is the reference Function; API key already in .dev.vars from the fridge scan.

3b1. DONE server timeout

3b2. DONE retry once

3c — "parced?" and "valid recipe", with their error states.force strict JSON in your schema; parse + failure states. Tighten the prompt to emit only your recipe object as JSON (category from the enum, fused-string ingredients, method → steps if original recipe is formatted in steps). Client parses. Handle three new modes: unparseable JSON, valid-JSON-but-bad-category, "not a recipe." Verify: parses to a valid object; bad cases are caught, not crashes. Log failure modes: stop_reaon and max_tokens (trunkated reply). After parsing, code adds sourceUrl: ""

3d — feed the parsed object to populateForm. 


## Next



- **Larger controls on mobile** Change sizes via @media (pointer: coarse) OR global bump trhough theme tokens 
- **more focus on homepage search box for finding recipes via ingredients** - white space? size? less focus on default infredients?
- **Handle user typing ingredients for search as one sentence** - Stronger hint then test, maybe also turn leftover text into chip automatically 
- **Sync ukrainain branch to `main`** — `Guard on lang branches: `grep -l "strings.en.js" *.html` empty.
- **Backend integration**
- **Quick-save a link** move the URL field to the top of add-recipe, with a hint that user can just paste a link; autofill title from that where possible
- "AI can make mistakes" warning
- recipe page: white-space: pre-line on the description div, so that line breaks don't collapse.

2. **Shimmer skeleton for the photo scan** — a shimmering placeholder while the vision model thinks.
3. **Dark mode, driven by tokens.** 
4. **Scroll-driven card reveal**
5. **Toast / snackbar**
6. **A count-up number on the fridge result**
7. **Style update.** Look into recommendations from Claude Design.

## Parked work and decisions: see BACKLOG.md
