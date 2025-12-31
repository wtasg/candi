# Knowledge Base

Lessons learned and gotchas encountered during development.

---

## Package.json Exports Order

**Problem**: Vite shows warning: "The condition 'types' here will never be used as it comes after both 'import' and 'require'"

**Cause**: In the `exports` field, conditions are evaluated in order. If `types` comes after `import`/`require`, TypeScript won't see it.

**Solution**: Always put `types` first:

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

**Key changes from v3 to v4**:

1. **PostCSS plugin moved**: Use `@tailwindcss/postcss` instead of `tailwindcss`
2. **Vite plugin available**: `@tailwindcss/vite` for better integration
3. **CSS-first config**: Use `@theme` block in CSS instead of `tailwind.config.js`
4. **Import syntax**: Replace `@tailwind base/components/utilities` with `@import "tailwindcss"`

**Example v4 setup**:

```css
@import "tailwindcss";

@theme {
  --color-candi-accent: var(--candi-accent);
  --radius-soft: 0.75rem;
}
```

---

## Monorepo CSS Imports

**Problem**: Website in `website/` needs to import theme from parent `dist/`

**Solution**: Use relative path in CSS:

```css
@import "../../dist/v4/theme.css";
```

Add `predev`/`prebuild` scripts to auto-build parent:

```json
"scripts": {
  "predev": "cd .. && npm run build",
  "prebuild": "cd .. && npm run build"
}
```

This avoids `npm link` complexity and works in CI.

---

## GitHub Pages SPA Routing

**Problem**: 404 errors on page refresh in Single Page Applications

**GitHub Pages**: Does NOT support `_redirects` files (that's Netlify-only)

**Solution for GitHub Pages**: Use `404.html` with JavaScript redirect (see [spa-github-pages](https://github.com/rafgraph/spa-github-pages))

### pathSegmentsToKeep Configuration

The `pathSegmentsToKeep` variable controls how many path segments are preserved during the redirect:

| Deployment Type | Base Path | pathSegmentsToKeep |
| ----------------- | ----------- | ------------------- |
| Subdirectory (`username.github.io/repo/`) | `/repo/` | `1` |
| Custom domain (`example.com/`) | `/` | `0` |
| Root user site (`username.github.io/`) | `/` | `0` |

**Example**: For `https://wtasg.github.io/candi/colors`:

- With `pathSegmentsToKeep = 1`: Preserves `/candi/`, redirects to `/candi/?/colors`
- With `pathSegmentsToKeep = 0`: Would incorrectly lose the `/candi/` segment

**Both must match**: If you change `base` in `vite.config.js`, you must also change `pathSegmentsToKeep` in `404.html`.

---

## OKLab/OKLCH Color Conversion

**Problem**: OKLCH to RGB conversion produces incorrect colors for some values

**Cause**: Clamping negative LMS values to zero before cubing:

```javascript
// ✗ Wrong - loses negative values
const L = Math.pow(Math.max(0, l_), 3);
```

**Why it matters**: The OKLab color space uses LMS (cone response) values that can be negative for out-of-gamut or mathematically extended colors. Clamping before cubing corrupts the conversion.

**Solution**: Use signed cube (preserves sign through multiplication):

```javascript
// ✓ Correct - preserves sign
const L = l_ * l_ * l_;  // negative³ = negative
const M = m_ * m_ * m_;
const S = s_ * s_ * s_;
```

Then clamp at the **final RGB output stage**:

```javascript
r = Math.round(Math.min(1, Math.max(0, gamma(r))) * 255);
```

**Reference**: [bottosson.github.io/posts/oklab](https://bottosson.github.io/posts/oklab/)

---

## VS Code VSIX Packaging

**Problem**: `.vsix` package size is unexpectedly large or contains unwanted files (like `node_modules`).

**Cause**: `vsce package` includes everything by default unless excluded.

**Solution**:

1. Add `.vscodeignore` to exclude files.
2. OR explicit use `"files"` array in `package.json` to include only necessary files.

**Important**: `vsce` will warn if neither exists.

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

**Problem**: Emojis (✅ ❌) can render inconsistently across terminals and fonts.

**Solution**: Use Unicode Dingbat symbols instead of emojis for pass/fail indicators:

| Symbol | Code | Name | Usage |
| -------- | ------ | ------ | ------- |
| ✓ | U+2713 | Check Mark | Pass/success |
| ✗ | U+2717 | Ballot X | Fail/error |
| ✘ | U+2718 | Heavy Ballot X | Fail (bold) |

**Why these work better**:

- Part of Unicode since 1.1 (1993), not emoji
- Render correctly in monospace fonts
- No color/emoji variation issues
- Work in all terminals

**Example usage**:

```javascript
const status = passed ? '[✓]' : '[✗]';
console.log(`${status} Test name`);
```

---

## Color Pipeline Architecture

The color system uses a single source of truth with generated CSS outputs.

```text
                    npm run build
                         │
                         ▼
        ┌────────────────────────────────────┐
        │     src/data/colors.js             │
        │     (Authoritative Anchors)        │
        └────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │   scripts/gen-oklch-primitives.js  │
        │   (Lagom Derivation Engine)        │
        └────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │     scripts/sync-colors.js         │
        │     (Sync & Export Logic)          │
        └────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
  src/css/base.css              src/v4/theme.css
  (CSS Variables)               (Tailwind v4 theme)
          │                             │
          ▼                             ▼
  dist/base.css                 dist/v4/theme.css
  (Published)                   (Published)
```

**Key points**:

- Edit only `src/data/colors.js` to change colors
- Run `npm run build` to regenerate CSS files
- Both `base.css` and `theme.css` have "do not edit" warnings
- Platform builds (VSCode, Vim, KDE, etc.) consume `colors.js` directly

---

## Publishing to npm (GitHub Packages)

The npm package is published to GitHub Packages, not npmjs.com.

### Configuration

`package.json` must include:

```json
{
  "name": "@wtasnorg/candi",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Authentication

Create a GitHub PAT with `write:packages` scope, then:

```bash
npm login --scope=@wtasg --auth-type=legacy --registry=https://npm.pkg.github.com
```

Or add to `~/.npmrc`:

```text
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
@wtasg:registry=https://npm.pkg.github.com
```

### Publishing

```bash
npm run build:all
npm publish
```

The `prepublishOnly` script runs `build:all` automatically.

---

## Publishing Flutter to pub.dev

### Prerequisites

1. Google account for pub.dev authentication
2. Complete `pubspec.yaml` with description, homepage, repository
3. LICENSE, README.md, and CHANGELOG.md in `flutter/`

### Commands

```bash
# Validate without publishing
npm run flutter:pub-publish-dry-run

# Authenticate (opens browser)
dart pub login

# Publish
npm run flutter:pub-publish
```

### Important Notes

- Package versions are immutable once published
- Package name `candi_colors` follows pub.dev conventions (lowercase, underscores)
- After publishing, transfer to a verified publisher at pub.dev/packages/candi_colors/admin

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

The `npm run artifact` command packages all platforms into distributable zip files:

```bash
npm run artifact
```

### Generated Files

| Artifact | Contents |
| ---------- | ---------- |
| `theme_{version}.zip` | CSS & JS distributions |
| `docs_{version}.zip` | Documentation website |
| `vim_{version}.zip` | Vim colorschemes |
| `kde_{version}.zip` | KDE color schemes |
| `gnome_{version}.zip` | GTK3/GTK4 themes |
| `obsidian_{version}.zip` | Obsidian theme |
| `vscode-theme-candi-{version}.vsix` | VS Code extension |

### Version Bumping

To update version across all packages:

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
- **Implementation**: Neutral palette uses Hue 85 (warm) across all themes. Previous cool-blue (Hue 275) variants have been phased out.

### Lagom (Balance)
Finding the balance between grayness and over-saturation.
- **Implementation**: Subtle variants preserve 80% of parent chroma to maintain chromatic richness.
- **Logic**: Defined in `scripts/gen-oklch-primitives.js`.
