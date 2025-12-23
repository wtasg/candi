# Candi Design System

A Tailwind CSS design system based on Nordic design principles: Hygge (warmth) and Lagom (balance).

Candi provides a single source of truth for colors using the OKLCH color space, synchronized across Web, Flutter, VS Code, and Vim.

---

## Multi-Platform Support

| Platform | Support | Integration |
| :--- | :--- | :--- |
| **Web** | Full | Tailwind CSS Plugin & CSS Variables |
| **Flutter** | Full | Type-safe `CandiColors` with OKLCH metadata |
| **VS Code** | Full | Light & Dark themes with unified syntax highlighting |
| **Vim** | Full | Standalone `.vim` colorschemes (GUI & Terminal) |

---

## Architecture: OKLCH-First

Candi uses **OKLCH** as its primary color space instead of Hex codes. Benefits include:

- **Perceptual Uniformity**: Consistent contrast and brightness across the palette.
- **Synchronized Themes**: Updates to `src/css/base.css` propagate to all platforms via `npm run build:all`.
- **Shared Logic**: Centralized conversion in `scripts/color-conv.js` ensures color accuracy across Chrome, VS Code, and mobile.

---

## Unified Commands

- **Build Everything**: `npm run build:all`
  - Generates assets for Web, Flutter, VS Code, and Vim.
- **Test Everything**: `npm test`
  - Validates color accuracy and platform-specific exports.
- **Package VS Code**: `npm run vscode:package`
  - Generates a `.vsix` file.

---

## Installation & Usage

### Web (Tailwind CSS)

```bash
npm install @wtasnorg/candi
```

[Web Setup Guide](docs/use-with-tailwindcss.md)

### Flutter

[Flutter Integration Guide](docs/flutter-integration.md)

### VS Code

[VS Code Theme Guide](docs/vscode-theme.md)

### Vim

[Vim Theme Guide](docs/vim-theme.md)

---

## Color Tokens

| Token | Light | Dark | Usage |
| :--- | :--- | :--- | :--- |
| `bg` | Warm white | Warm dark | Page background |
| `surface` | Soft cream | Card surface | Cards, sections |
| `text` | Warm charcoal | Off-white | Primary text |
| `accent` | Steel blue | Lighter steel | Primary actions |
| `secondary` | Terracotta | Lighter terracotta | Secondary actions |

---

## License

MIT
