# Color Customization

Redefine Candi's color tokens to match your brand requirements.

## Basic Customization

Redefine CSS variables after importing Candi:

```css
:root {
  --candi-accent: oklch(65% 0.15 85);        /* Custom yellow */
  --candi-accent-subtle: oklch(92% 0.05 85);
}

.dark {
  --candi-accent: oklch(75% 0.12 85);
  --candi-accent-subtle: oklch(35% 0.05 85);
}
```

## Token Reference

| Token | Default | Usage |
| :--- | :--- | :--- |
| `--candi-bg` | Warm white | Page background |
| `--candi-surface` | Soft cream | Cards, sections |
| `--candi-text` | Charcoal | Primary text |
| `--candi-accent` | Steel blue | Main actions |
| `--candi-secondary` | Terracotta | Secondary accent |
| `--candi-success` | Sage green | Success states |
| `--candi-error` | Dusty rose | Error states |

## OKLCH Format

`oklch(lightness chroma hue)`

- **Lightness** (0-100%): Perceived brightness.
- **Chroma** (0-0.4+): Intensity/saturation.
- **Hue** (0-360): Position on color wheel.

### Common Hues

- **0-30**: Red/Coral
- **30-90**: Orange/Yellow
- **160-240**: Blue/Cyan
- **270-320**: Purple

## Accessibility & Contrast

Maintaining high accessibility is a priority in the Candi design system. When customizing colors, please keep the following WCAG 2.1 contrast ratios in mind:

- **Primary Text**: We target a **4.5:1** ratio against the `bg` color (WCAG AA). This applies to the `text` token.
- **Subtle / Muted Text**: These tokens (`text-subtle`, `text-muted`) may fall below 4.5:1 for decorative purposes but should remain legible.
- **UI Components & Accents**: For focus rings, buttons, and state indicators (`accent`, `success`, `error`), we target a **3.0:1** ratio. This meets the WCAG requirement for user interface components and graphical objects.

# Verifying Color Accuracy

Run the automated test suite to ensure your changes adhere to Hygge and Lagom principles:

```bash
npm run test:color
```

This validates:
- OKLCH format and value ranges
- Contrast ratios against WCAG standards
- Semantic completeness
- Parity between light and dark modes

For advanced modifications, see [ARCHITECTURE.md](../ARCHITECTURE.md) which details the derivation logic for subtle variants.

## Tailwind Usage

Variables are automatically mapped to Tailwind utilities:

```jsx
<button className="bg-candi-accent">Uses custom color</button>
```

## Resources

- [oklch.com](https://oklch.com) - Color picker
- [Huetone](https://huetone.ardov.me) - Palette generator
