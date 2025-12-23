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
|-----------------|-----------|-------------------|
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
