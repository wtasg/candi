# Candi Design System

A multi-platform design system based on Nordic/Scandinavian design principles: Hygge (warmth) and Lagom (balance).

Candi provides a single source of truth for colors using the OKLCH color space, synchronized across Web, Flutter, VS Code, Vim, KDE, GNOME, and Obsidian.

**[View Documentation Website](https://wtasg.github.io/candi/)** - Interactive color explorer, component playground, and comprehensive guides.

---

## Multi-Platform Support

| Platform | Support | Integration |
| :--- | :--- | :--- |
| **Web** | Full | Tailwind CSS Plugin & CSS Variables |
| **Flutter** | Full | Type-safe `CandiColors` with OKLCH metadata |
| **VS Code** | Full | Light & Dark themes with unified syntax highlighting |
| **Vim** | Full | Standalone `.vim` colorschemes (GUI & Terminal) |
| **KDE Plasma** | Full | Color schemes for KDE 4, 5 & 6 |
| **GNOME** | Full | GTK3 & GTK4 themes for X11 and Wayland |
| **Obsidian** | Full | Light & Dark themes with 60+ CSS variables |

---

## Architecture

### Single Source of Truth

All colors are defined in `src/data/colors.js`. This file is the canonical source for the entire design system.

```text
src/data/colors.js (Source of Truth)
        │
        ▼
scripts/sync-colors.js (Generator)
        │
        ├── src/css/base.css (CSS Variables)
        ├── src/v4/theme.css (Tailwind v4 @theme)
        └── dist/colors.json (Data export)

Platform Builds (all consume colors.js directly):
├── build-flutter.js → flutter/lib/candi_colors.dart
├── build-vscode.js  → vscode/themes/*.json
├── build-vim.js     → vim/colors/*.vim
├── build-kde.js     → kde/v4,v5/*.colors
├── build-gnome.js   → gnome/gtk-*/*.css
└── build-obsidian.js → obsidian/theme.css
```

### OKLCH Color Space

Candi uses OKLCH as its primary color space instead of Hex codes:

- **Perceptual Uniformity**: Consistent contrast and brightness across the palette
- **Synchronized Themes**: Updates to `src/data/colors.js` propagate to all platforms via `npm run build:all`
- **Shared Logic**: Centralized conversion in `scripts/color-conv.js` ensures color accuracy
- **Automated Accessibility**: Integrated WCAG 2.1 contrast ratio validation

**[Learn more about OKLCH color conversion](docs/color-conversion.md)**

---

## Project Structure

```text
candi/
├── src/                    # Source files for npm package
│   ├── css/                # CSS files (base, components, utilities)
│   ├── data/               # Source of truth (colors.js)
│   ├── v4/                 # Tailwind v4 theme
│   ├── index.js            # Main entry point
│   ├── plugin.js           # Tailwind v3 plugin
│   └── theme.js            # Tailwind v3 theme extension
├── scripts/                # Build and test scripts
│   ├── build.js            # Main npm package build
│   ├── build-*.js          # Platform-specific builds
│   ├── test-*.js           # Platform-specific tests
│   ├── sync-colors.js      # Color synchronization
│   └── color-conv.js       # OKLCH/RGB conversion utilities
├── dist/                   # Built output (git-ignored)
├── docs/                   # Documentation guides
├── website/                # Documentation site (Vite + React)
├── flutter/                # Flutter package
├── vscode/                 # VS Code extension
├── vim/                    # Vim colorschemes
├── kde/                    # KDE Plasma color schemes
├── gnome/                  # GTK3/GTK4 themes
└── obsidian/               # Obsidian theme
```

---

## Commands

### Build

| Command | Description |
| :--- | :--- |
| `npm run build` | Build npm package (CSS, JS, TypeScript declarations) |
| `npm run build:all` | Build all platforms (Web, Flutter, VS Code, Vim, KDE, GNOME, Obsidian) |
| `npm run build:flutter` | Build Flutter package only |
| `npm run build:vscode` | Build VS Code extension only |
| `npm run build:vim` | Build Vim colorschemes only |
| `npm run build:kde` | Build KDE color schemes only |
| `npm run build:gnome` | Build GNOME/GTK themes only |
| `npm run build:obsidian` | Build Obsidian theme only |

### Test

| Command | Description |
| :--- | :--- |
| `npm test` | Run all tests |
| `npm run test:color` | Test color definitions |
| `npm run test:colors` | Test color conversions |
| `npm run test:flutter` | Test Flutter package |
| `npm run test:vscode` | Test VS Code extension |
| `npm run test:vim` | Test Vim colorschemes |
| `npm run test:kde` | Test KDE color schemes |
| `npm run test:gnome` | Test GNOME themes |
| `npm run test:obsidian` | Test Obsidian theme |

### Package & Publish

| Command | Description |
| :--- | :--- |
| `npm run artifact` | Package all platforms into zip archives |
| `npm run vscode:package` | Generate `.vsix` VS Code extension |
| `./scripts/package-bump.sh <version>` | Bump version across all packages |

---

## Installation & Usage

### Using Prebuilt Releases

Download ready-to-use artifacts from GitHub releases (recommended for most users).

**[Using Prebuilt Releases Guide](docs/using-release-artifacts.md)**

### Authenticating with GitHub Packages

This package is published to GitHub Packages. To install it, you need to authenticate with GitHub:

1. **Create a Personal Access Token (PAT)**:
   - Go to GitHub Settings → [Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Give it a descriptive name (e.g., "npm packages")
   - Select the `read:packages` scope
   - Click "Generate token" and copy the token

2. **Configure npm authentication**:

```bash
npm login --scope=@wtasg --auth-type=legacy --registry=https://npm.pkg.github.com
```

- Username: Your GitHub username
- Password: The PAT you just created
- Email: Your GitHub email

Or create/update your `~/.npmrc` file:

```text
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
@wtasg:registry=https://npm.pkg.github.com
```

### Web (Tailwind CSS)

```bash
npm install @wtasg/candi
```

**Tailwind v4** (Recommended):

```css
/* In your CSS */
@import "tailwindcss";
@import "@wtasg/candi/v4";
```

**Tailwind v3**:

```js
// tailwind.config.js
const { theme, plugin } = require('@wtasg/candi');
module.exports = {
  theme: { extend: theme },
  plugins: [plugin],
};
```

**[Full Web Setup Guide](docs/use-with-tailwindcss.md)** | **[Use Without Tailwind](docs/use-without-tailwindcss.md)**

### Platform Guides

| Platform | Guide |
| :--- | :--- |
| Flutter | [Flutter Integration Guide](docs/flutter-integration.md) |
| VS Code | [VS Code Theme Guide](docs/vscode-theme.md) |
| Vim | [Vim Theme Guide](docs/vim-theme.md) |
| KDE Plasma | [KDE Theme Guide](docs/kde-theme.md) |
| GNOME | [GNOME Theme Guide](docs/gnome-theme.md) |
| Obsidian | [Obsidian Theme Guide](docs/obsidian-theme.md) |

---

## Color Tokens

| Token | Light | Dark | Usage |
| :--- | :--- | :--- | :--- |
| `bg` | Warm white | Warm dark | Page background |
| `surface` | Soft cream | Card surface | Cards, sections |
| `elevated` | Pure white | Elevated dark | Modals, popups |
| `text` | Warm charcoal | Off-white | Primary text |
| `text-subtle` | Medium gray | Light gray | Secondary text |
| `text-muted` | Light gray | Muted gray | Tertiary text |
| `accent` | Steel blue | Lighter steel | Primary actions |
| `secondary` | Terracotta | Lighter terracotta | Secondary actions |
| `success` | Forest green | Lighter green | Success states |
| `warning` | Amber | Lighter amber | Warning states |
| `error` | Coral red | Lighter coral | Error states |

**[Customize Colors](docs/customizing-colors.md)**

---

## Design & Accessibility

Candi is built with accessibility as a core requirement:

- **WCAG Standards**: Color extraction pipeline automatically validates contrast ratios
- **Primary Text**: Aimed at **4.5:1** contrast (WCAG AA) for standard text
- **UI Elements**: Accents and status indicators tuned for **3.0:1** contrast (WCAG Graphical Objects)

---

## Development

### Prerequisites

- Node.js 24+
- npm
- Flutter SDK (for Flutter package development)

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

The `predev` and `prebuild` scripts automatically rebuild the parent package, so changes to `src/data/colors.js` are reflected immediately.

### Making Color Changes

1. Edit `src/data/colors.js` (the single source of truth)
2. Run `npm run build:all` to regenerate all platform themes
3. Run `npm test` to validate color accuracy and contrast ratios

---

## Related Documentation

- [Knowledge Base](Knowledge.md) - Lessons learned and development gotchas
- [Color Conversion](docs/color-conversion.md) - OKLCH to RGB conversion pipeline

---

## License

MIT
