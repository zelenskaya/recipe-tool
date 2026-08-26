# Brand Demo

## Purpose

The repo has one generic main app. Each brand demo is a branch that swaps branding and localisation. The app structure stays the same.

## Creating a brand branch

1. Start from the latest `main` branch.
2. Create a new branch for the brand.
3. Swap the brand assets at the existing paths:

   * `images/logo.svg`
   * `images/favicon.svg`
   * `theme.css`
4. If needed, switch the language by changing the HTML script references from `strings.en.js` to the appropriate language file.
5. Keep the existing app structure and asset paths unchanged.
6. Commit and push the branch.
7. Verify the deployed Cloudflare Pages branch URL.

## Brand assets

Each brand controls its visual identity by replacing these files:

* `images/logo.svg` - brand logo
* `images/favicon.svg` - browser favicon
* `theme.css` - colours, typography, spacing, radii, and other design tokens

The file paths stay the same across all branches. Brand branches replace the files rather than changing the HTML structure or asset references.

## Localisation

English strings are stored in `strings.en.js`. Other languages have their own string file with the same key structure.

Only one language file is loaded on each page. To create a localised brand demo, update the HTML script references to the required language file.

Category keys such as `breakfast`, `vegetables`, `soups`, `snacks`, and `meat` remain unchanged because they are used as data and CSS keys. Only their UI labels are translated.
