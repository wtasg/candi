# Tailwind CSS Integration

This guide covers integrating the Candi design system into a Tailwind CSS project.

## Installation

> [!IMPORTANT]
> The `@wtasnorg/candi` package is published to GitHub Packages. Authentication is required before installation.

```bash
npm install @wtasnorg/candi
```

## Tailwind v4 (Recommended)

Tailwind CSS v4 uses CSS-first configuration. Import the theme directly in your CSS:

### 1. Install Tailwind v4

```bash
npm install tailwindcss@latest @tailwindcss/vite
```

### 2. Configure Vite

```js
// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### 3. Import in CSS

```css
/* src/index.css */
@import "tailwindcss";
@import "@wtasnorg/candi/v4";
```

That's it! All Candi utilities are now available.

#### Understanding v4 Utility Naming

The v4 theme defines CSS variables with the `--color-candi-` prefix. Tailwind automatically generates utility classes from these variables:

| CSS Variable | Tailwind Utility Class | Example Usage |
| :--- | :--- | :--- |
| `--color-candi-bg` | `bg-candi-bg` | `<div className="bg-candi-bg">` |
| `--color-candi-text` | `text-candi-text` | `<p className="text-candi-text">` |
| `--color-candi-accent` | `bg-candi-accent`, `text-candi-accent`, `border-candi-accent` | `<button className="bg-candi-accent">` |
| `--color-candi-surface` | `bg-candi-surface` | `<div className="bg-candi-surface">` |

You can also use CSS variables directly:

```css
body {
  background-color: var(--color-candi-bg);
  color: var(--color-candi-text);
}
```

### Usage

```jsx
<div className="bg-candi-surface text-candi-text rounded-soft shadow-hygge">
  <h1 className="text-candi-accent">Hello Candi</h1>
  <p className="text-candi-subtle">Nordic design system</p>
</div>
```

---

## Tailwind v3

For Tailwind v3, use the JavaScript plugin and theme:

### 1. Configure `tailwind.config.js`

```js
const { theme, plugin } = require('@wtasnorg/candi');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: theme,
  },
  plugins: [plugin],
};
```

### 2. Enable Dark Mode

The theme uses the `.dark` class for switching:

```js
document.documentElement.classList.toggle('dark');
```

---

## Available Tokens

### CSS Variables

The plugin injects variables for direct CSS usage:

```css
:root {
  --candi-bg: oklch(98% 0.008 85);
  --candi-text: oklch(28% 0.015 250);
  /* ... */
}
```

### Tailwind Classes

Use `candi-*` prefix for colors:

```jsx
// Colors
<div className="bg-candi-bg text-candi-text" />
<button className="bg-candi-accent border-candi-border" />

// Extended Tokens
<div className="shadow-hygge rounded-soft" />
<input className="min-h-input p-18" />
```

## Component Examples

### Card

```jsx
function Card({ title, children }) {
  return (
    <div className="bg-candi-surface border border-candi-border rounded-softer p-8 shadow-hygge">
      <h3 className="text-candi-text text-xl font-medium mb-2">{title}</h3>
      <p className="text-candi-subtle">{children}</p>
    </div>
  );
}
```

### Button

```jsx
// Primary
<button className="bg-candi-accent text-white px-6 py-3 rounded-soft font-medium">
  Confirm
</button>

// Outline
<button className="text-candi-text border border-candi-border-strong px-6 py-3 rounded-soft font-medium">
  Cancel
</button>
```

## Color Reference

| Token | Light | Dark | Usage |
| :--- | :--- | :--- | :--- |
| `candi-bg` | Warm white | Warm dark | Page background |
| `candi-surface` | Soft cream | Card dark | Sections |
| `candi-text` | Charcoal | Off-white | Primary text |
| `candi-accent` | Steel blue | Lighter blue | Main actions |
| `candi-secondary` | Terracotta | Lighter red | Secondary |
| `candi-success` | Sage green | Light green | Success |
| `candi-error` | Dusty rose | Light rose | Errors |

## Framework Guides

### Next.js (v3)

```js
const { theme, plugin } = require('@wtasnorg/candi');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: theme },
  plugins: [plugin],
};
```

### Vite / React (v3)

```js
const { theme, plugin } = require('@wtasnorg/candi');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: theme },
  plugins: [plugin],
};
```
