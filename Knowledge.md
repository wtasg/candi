# Knowledge Base

Lessons learned and gotchas encountered during development.

---

## Package.json Exports Order

Vite might show a warning: "The condition 'types' here will never be used as it comes after both 'import' and 'require'".

In the `exports` field, conditions are evaluated in order. If `types` comes after `import` or `require`, TypeScript will not detect it.

Solution: Place `types` first:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",   // ✓ First
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  }
}
```

Not:

```json
"exports": {
  ".": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.js",
    "types": "./dist/index.d.ts"    // ✗ Last - will be ignored
  }
}
```

---

## Tailwind CSS v4 Migration

Key changes from v3 to v4:

1. PostCSS plugin moved: Use `@tailwindcss/postcss` instead of `tailwindcss`.
2. Vite plugin available: `@tailwindcss/vite` for better integration.
3. CSS-first configuration: Use `@theme` block in CSS instead of `tailwind.config.js`.
4. Import syntax: Replace `@tailwind base/components/utilities` with `@import "tailwindcss"`.

Example v4 setup:

```css
@import "tailwindcss";

@theme {
  --color-candi-accent: var(--candi-accent);
  --radius-soft: 0.75rem;
}
```

---

## Monorepo CSS Imports

The website in `website/` must import the theme from the parent `dist/` directory.

Solution: Use a relative path in CSS:

```css
@import "../../dist/v4/theme.css";
```

Add `predev` or `prebuild` scripts to automatically build the parent:

```json
"scripts": {
  "predev": "cd .. && npm run build",
  "prebuild": "cd .. && npm run build"
}
```

This avoids `npm link` complexity and ensures compatibility with CI environments.

---

## GitHub Pages SPA Routing

Single Page Applications (SPAs) on GitHub Pages may encounter 404 errors on page refresh.

Unlike Netlify, GitHub Pages does not support `_redirects` files.

Solution: Use a 404.html file with a JavaScript redirect.

### pathSegmentsToKeep Configuration

The `pathSegmentsToKeep` variable determines how many path segments are preserved during a redirect.

| Deployment Type | Base Path | pathSegmentsToKeep |
| :--- | :--- | :--- |
| Subdirectory (`username.github.io/repo/`) | `/repo/` | 1 |
| Custom domain (`example.com/`) | `/` | 0 |
| Root user site (`username.github.io/`) | `/` | 0 |

Example: For `https://wtasg.github.io/candi/colors`:

- With `pathSegmentsToKeep = 1`: Preserves `/candi/`, redirects to `/candi/?/colors`.
- With `pathSegmentsToKeep = 0`: Loses the `/candi/` segment.

The `base` value in `vite.config.js` must match `pathSegmentsToKeep` in `404.html`.

---

## OKLab/OKLCH Color Conversion

OKLCH to RGB conversion may produce incorrect colors for some values if LMS values are clamped too early.

The OKLab color space uses LMS (cone response) values that can be negative for out-of-gamut colors. Clamping negative values before cubing corrupts the conversion.

Solution: Use a signed cube to preserve the sign through multiplication:

```javascript
// Correct - preserves sign
const L = l_ * l_ * l_;
const M = m_ * m_ * m_;
const S = s_ * s_ * s_;
```

Clamp at the final RGB output stage:

```javascript
r = Math.round(Math.min(1, Math.max(0, gamma(r))) * 255);
```

Reference: [OKLab post by Björn Ottosson](https://bottosson.github.io/posts/oklab/)

---

## VS Code VSIX Packaging

Problem: `.vsix` package size is unexpectedly large or contains unwanted files (like `node_modules`).

Cause: `vsce package` includes everything by default unless excluded.

Solution:

1. Add `.vscodeignore` to exclude files.
2. OR explicit use `"files"` array in `package.json` to include only necessary files.

Important: `vsce` will warn if neither exists.

```json
// package.json in extension folder
"files": [
  "themes/*",
  "package.json",
  "icon.png"
]
```

---

## Unicode Symbols for Console Output

Emojis can render inconsistently across different terminals and fonts.

Solution: Use Unicode Dingbat symbols for more consistent pass/fail indicators.

| Symbol | Code | Name | Usage |
| :--- | :--- | :--- | :--- |
| ✓ | U+2713 | Check Mark | Success |
| ✗ | U+2717 | Ballot X | Error |
| ✘ | U+2718 | Heavy Ballot X | Critical Error |

These symbols render more reliably in monospace fonts and avoid variation issues common with emojis.

---

## Color Pipeline Architecture

The color system is governed by a Single Source of Truth (SSOT) with two distinct responsibilities following the Single Responsibility Principle (SRP).

```text
Derivation Engine (scripts/gen-oklch-primitives.js)
    │ (Rules & Anchors)
    ▼
Palette Assembly (src/data/colors.js)
    │ (Neutrals & Composition)
    ▼
Synchronization (scripts/sync-colors.js)
    │ (Export Logic)
    ▼
Generated Outputs (dist/base.css, dist/v4/theme.css, etc.)
```

Key Principles:

- Edit `src/data/colors.js` for color changes.
- Run `npm run build` to regenerate CSS files.
- Platform builds consume `colors.js` directly.

---

## Publishing to npm (GitHub Packages)

The npm package is published to GitHub Packages.

### Configuration

The `package.json` includes the following `publishConfig`:

```json
{
  "name": "@wtasnorg/candi",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Authentication

A GitHub PAT with `write:packages` scope is required for authentication.

```bash
npm login --scope=@wtasg --auth-type=legacy --registry=https://npm.pkg.github.com
```

### Publishing

```bash
npm run build:all
npm publish
```

The `prepublishOnly` script automates the `build:all` step.

---

## Publishing Flutter to pub.dev

### Prerequisites

1. Google account authentication for pub.dev.
2. Complete `pubspec.yaml` with description, homepage, and repository.
3. Relevant documentation (LICENSE, README.md, CHANGELOG.md) in the `flutter/` directory.

### Commands

```bash
# Dry run validation
npm run flutter:pub-publish-dry-run

# Authentication
dart pub login

# Publish
npm run flutter:pub-publish
```

### Important Notes

- Versions are immutable once published.
- The name `candi_colors` follows pub.dev naming conventions.

---

## Packaging VS Code Extension

### Generate .vsix

```bash
npm run vscode:package
```

This runs `npx @vscode/vsce package` in the `vscode/` directory.

### Output

Creates `vscode-theme-candi-{version}.vsix` in `vscode/`.

### Size Optimization

The `vscode/package.json` uses a `files` array to include only necessary files:

```json
"files": [
  "themes/*",
  "package.json",
  "LICENSE",
  "README.md"
]
```

Without this, `vsce` would include everything, inflating package size.

---

## Creating Release Artifacts

The `npm run artifact` command packages all platforms into distributable zip files.

### Generated Files

| Artifact | Contents |
| :--- | :--- |
| `theme_{version}.zip` | CSS & JS distributions |
| `docs_{version}.zip` | Documentation website |
| `vim_{version}.zip` | Vim colorschemes |
| `kde_{version}.zip` | KDE color schemes |
| `gnome_{version}.zip` | GTK3/GTK4 themes |
| `obsidian_{version}.zip` | Obsidian theme |
| `vscode-theme-candi-{version}.vsix` | VS Code extension |

### Version Bumping

To update the version across all packages:

```bash
./scripts/package-bump.sh 0.0.13
```

This updates:

- `package.json` (npm)
- `vscode/package.json` (VS Code extension)
- `flutter/pubspec.yaml` (Flutter)

---

## Hygge & Lagom Design Philosophies

### Hygge (Warmth)

Creating a cozy, inviting atmosphere through warm color temperatures.

- Implementation: Neutral palette uses Hue 85 (warm) across all themes. Previous cool-blue (Hue 275) variants have been phased out.

### Lagom (Balance)

Finding the balance between grayness and over-saturation.

- Implementation: Subtle variants preserve 80% of parent chroma to maintain chromatic richness.
- Logic: Defined in `scripts/gen-oklch-primitives.js`.

---

## Flutter Showcase Application

Visualizing the design system across various components and color modes is facilitated by the `showcase_flutter/` application.

1. Direct Integration: Uses path dependencies for immediate feedback.
2. Gallery View: Displays semantic tokens applied to Material 3 widgets.
3. Playground View: Supports interactive simulations for accessibility and color vision.

This application serves as a development environment and living documentation.

---

## Terminal Color Synchronization

Terminal colors were previously redundantly defined, leading to potential inconsistencies.

Solution: Unified terminal color definitions in `src/data/colors.js` and removed manual overrides in:

- `scripts/sync-colors.js`
- `vscode/` theme generation
- `vim/` template files

Result: Terminal colors follow the Single Source of Truth and match the UI across all platforms.

---

## Token Integrity and Linting

Ensuring token validity is automated through schema validation.

1. JSON Schema: Defined in `schemas/tokens.schema.json`.
2. Automated Linting: `scripts/lint-tokens.js` validates the Palette Assembly.
3. CI Integration: `npm run lint:all` catches structural errors before they propagate.

---

## Dependencies and Security

Perform periodic audits to ensure dependency health.

```bash
# NPM security audit
npm audit

# Outdated packages check
npm outdated

# Flutter/Dart dependencies
cd showcase_flutter && flutter pub outdated
```

### Tailwind CSS Compatibility

Candi supports both Tailwind v3 and v4 through peer dependencies.

- v3: Use `require('@wtasnorg/candi')` in `tailwind.config.js`.
- v4: Use `@import "@wtasnorg/candi/v4"` in CSS.

> [!CAUTION]
> Major upgrades require manual review. Always run the full test suite after updates.
