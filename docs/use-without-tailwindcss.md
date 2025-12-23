# Pure CSS Integration

Use the Candi design system with standard CSS.

## Installation

### Option 1: npm

```bash
npm install @wtasnorg/candi
```

Import in your JavaScript/TypeScript:

```js
import '@wtasnorg/candi/css';
```

### Option 2: CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@wtasnorg/candi/dist/scandinavian.css">
```

## CSS Variables

All colors are available as custom properties:

```css
:root {
  --candi-bg: oklch(98% 0.008 85);
  --candi-surface: oklch(95.5% 0.012 85);
  --candi-text: oklch(28% 0.015 250);
  --candi-accent: oklch(52% 0.06 230);
  /* ... */
}
```

Usage:

```css
.card {
  background-color: var(--candi-surface);
  color: var(--candi-text);
  border: 1px solid var(--candi-border);
}
```

## Dark Mode

The theme uses the `.dark` class:

```html
<html class="dark">
```

Toggle with JavaScript:

```js
document.documentElement.classList.toggle('dark');
```

## Component Classes

The system includes pre-built classes:

- **Cards**: `.candi-card`, `.candi-card-elevated`
- **Buttons**: `.candi-btn-primary`, `.candi-btn-secondary`, `.candi-btn-ghost`
- **Forms**: `.candi-input`, `.candi-label`, `.candi-input-group`

Example:

```html
<div class="candi-card">
  <h3>Title</h3>
  <p>Content</p>
  <button class="candi-btn candi-btn-primary">Confirm</button>
</div>
```

## Spacing & Radius

- **Padding**: `.candi-p-cozy` (1.5rem), `.candi-p-relaxed` (2.5rem)
- **Radius**: `.candi-rounded` (0.75rem), `.candi-rounded-lg` (1.0rem)
- **Shadows**: `.candi-shadow`, `.candi-shadow-md`
