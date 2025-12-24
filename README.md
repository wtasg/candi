# Candi Design System

A Tailwind CSS design system based on Nordic design principles: Hygge (warmth) and Lagom (balance).

Candi provides a single source of truth for colors using the OKLCH color space, synchronized across Web, Flutter, VS Code, and Vim.

📚 **[View Documentation Website](https://wtasg.github.io/candi/)** - Interactive color explorer, component playground, and comprehensive guides.

---

## Multi-Platform Support

| Platform | Support | Integration |
| :--- | :--- | :--- |
| **Web** | Full | Tailwind CSS Plugin & CSS Variables |
| **Flutter** | Full | Type-safe `CandiColors` with OKLCH metadata |
| **VS Code** | Full | Light & Dark themes with unified syntax highlighting |
| **Vim** | Full | Standalone `.vim` colorschemes (GUI & Terminal) |
| **KDE Plasma** | Full | Color schemes for KDE 4, 5 & 6 |

---

## Architecture: OKLCH-First

Candi uses **OKLCH** as its primary color space instead of Hex codes. Benefits include:

- **Perceptual Uniformity**: Consistent contrast and brightness across the palette.
- **Synchronized Themes**: Updates to `src/css/base.css` propagate to all platforms via `npm run build:all`.
- **Shared Logic**: Centralized conversion in `scripts/color-conv.js` ensures color accuracy across Chrome, VS Code, and mobile.
- **Automated Accessibility**: Integrated WCAG 2.1 contrast ratio validation in the build pipeline.

📖 **[Learn more about OKLCH color conversion](docs/color-conversion.md)** - Detailed explanation of the conversion pipeline and verification methods.

---

## Design & Accessibility

Candi is built with accessibility as a core requirement:

- **WCAG Standards**: Our color extraction pipeline automatically validates contrast ratios between text and backgrounds.
- **Primary Text**: Aimed at **4.5:1** contrast (WCAG AA) for standard text.
- **UI Elements**: Accents and status indicators (Success/Warning/Error) are tuned for **3.0:1** contrast (WCAG Graphical Objects) to maintain the soft Scandinavian aesthetic without sacrificing usability.

---

## Unified Commands

- **Build Everything**: `npm run build:all`
  - Generates assets for Web, Flutter, VS Code, Vim, and KDE.
- **Test Everything**: `npm test`
  - Validates color accuracy and platform-specific exports.
- **Package VS Code**: `npm run vscode:package`
  - Generates a `.vsix` file.
- **Generate Artifacts**: `npm run artifact`
  - Builds all platforms and packages them into zip archives:
    - `theme.zip` (CSS & JS distributions)
    - `docs.zip` (Documentation website)
    - `vim.zip` (Vim color schemes)
    - `vscode/vscode-theme-candi-*.vsix` (VS Code extension)
    - `kde.zip` (KDE color schemes)

---

## Installation & Usage

### Web (Tailwind CSS)

```bash
npm install @wtasnorg/candi
```

**Tailwind v4** (Recommended):

```css
/* In your CSS */
@import "tailwindcss";
@import "@wtasnorg/candi/v4";
```

**Tailwind v3**:

```js
// tailwind.config.js
const { theme, plugin } = require('@wtasnorg/candi');
module.exports = {
  theme: { extend: theme },
  plugins: [plugin],
};
```

[Full Web Setup Guide](docs/use-with-tailwindcss.md)

### Flutter

[Flutter Integration Guide](docs/flutter-integration.md)

### VS Code

[VS Code Theme Guide](docs/vscode-theme.md)

### Vim

[Vim Theme Guide](docs/vim-theme.md)

### KDE Plasma

**Installation:**

1. Copy the color scheme files to your KDE color schemes directory:

   ```bash
   # For KDE Plasma 5/6
   cp kde/v5/*.colors ~/.local/share/color-schemes/
   
   # For KDE Plasma 4
   cp kde/v4/*.colors ~/.kde4/share/apps/color-schemes/
   ```

2. Apply via System Settings → Appearance → Colors

See [kde/v5/README.md](kde/v5/README.md) and [kde/v4/README.md](kde/v4/README.md) for detailed instructions.

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

## Development

### Prerequisites

- Node.js 24+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/wtasg/candi.git
cd candi

# Install dependencies
npm install

# Build all platforms
npm run build:all
```

### Working on the Documentation Website

The docs website lives in `website/` and uses the built theme from `dist/`:

```bash
cd website
npm install
npm run dev     # Starts dev server at http://localhost:3000
```

The `predev` and `prebuild` scripts automatically rebuild the parent package, so changes to `src/v4/theme.css` are reflected immediately.

### Project Structure

```text
candi/
├── src/           # Source files for npm package
│   ├── css/       # Base CSS files
│   ├── v4/        # Tailwind v4 theme
│   ├── plugin.js  # Tailwind v3 plugin
│   └── theme.js   # Tailwind v3 theme extension
├── dist/          # Built output (git-ignored)
├── website/       # Documentation site (Vite + React)
├── flutter/       # Flutter package
├── vscode/        # VS Code extension
├── vim/           # Vim colorschemes
└── scripts/       # Build scripts
```

---

## License

MIT
