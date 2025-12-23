# Tailwind CSS Integration

This guide covers integrating the Candi design system into a Tailwind CSS project.

## Installation

```bash
npm install @wtasnorg/candi
```

## Quick Setup

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

### Next.js

```js
const { theme, plugin } = require('@wtasnorg/candi');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: theme },
  plugins: [plugin],
};
```

### Vite / React

```js
const { theme, plugin } = require('@wtasnorg/candi');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: { extend: theme },
  plugins: [plugin],
};
```
