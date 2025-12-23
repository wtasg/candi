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

**Solution for GitHub Pages**: Use `404.html` with JavaScript redirect:

```html
<script>
  var l = window.location;
  l.replace(l.protocol + '//' + l.hostname + '/?/' + l.pathname.slice(1));
</script>
```

See `website/public/404.html` for full implementation.
