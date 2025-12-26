# Changelog

All notable changes to the Candi Design System will be documented in this file.

## 0.0.20

### Added

- Comprehensive dartdoc comments for all public API members (100% coverage)
- Flutter example application demonstrating all color tokens
- Example README with usage patterns and integration guide

### Changed

- Improved pub.dev package score with complete documentation
- Formatted all Dart code with `dart format`

## 0.0.19

### Fixed

- Version synchronization across all packages
  - Added `obsidian/manifest.json` to version bump script
  - Ensures Obsidian theme version stays in sync with other packages

## 0.0.18

### Changed

- Internal version bump for consistency

## 0.0.17

### Added

- Terminal colors to source of truth (`src/data/colors.js`)
  - 8 terminal colors for both light and dark themes
  - Maintains single source of truth principle
- Comprehensive VSCode theme enhancements
  - 96 new UI colors across 13 categories (inputs, dropdowns, badges, panels, peek views, git decorations, breadcrumbs, menus, notifications, scrollbars, widgets)
  - 7 additional token scopes (documentation comments, exceptions, CSS !important, markup errors, granular diff support)
  - UI colors expanded from 37 to 133
  - Token scopes expanded from 40 to 47
- **Konsole terminal color schemes** for KDE
  - Light and dark variants
  - 16-color ANSI palette
  - Optimized for readability
- Expanded color palette with 13 new semantic tokens:
  - Contrast colors: `onAccent`, `onSecondary`, `onSuccess`, `onWarning`, `onError`, `onInfo`
  - UI colors: `divider`, `scrim`, `shadowColor`
  - Inverse colors: `inverseSurface`, `inverseText`
- Full Material Design 3 color role coverage for Flutter
- Markdown linting with `markdownlint-cli2`

### Changed

- Tailwind v3 theme (`src/theme.js`) - Added 11 missing color mappings for complete parity with source of truth
- Tailwind v3 plugin (`src/plugin.js`) - Added 17 missing CSS custom properties including syntax highlighting, UI states, and semantic colors
- Flutter palette expanded from 16 to 33 colors per mode
- `build-flutter.js` refactored for dynamic palette generation
- VSCode theme now exceeds professional marketplace standards
- **Vim colorschemes completely rewritten** with Gruvbox-inspired professional features:
  - 7 configuration options (bold, italic, underline, undercurl, inverse, italic comments/strings)
  - 100+ highlight groups (was 24)
  - Neovim terminal color support
  - Plugin support (GitGutter, Signify, ALE, COC, NERDTree, CtrlP)
  - Filetype-specific highlighting (Markdown, HTML, CSS, JavaScript, Python, JSON, Vim)
  - Professional code organization with fold markers
  - File size: 2.3 KB → 19.7 KB per theme

### Fixed

- Tailwind CSS color completeness - All colors from source of truth now available in v3 integration
- Terminal color inconsistency - Terminal colors now properly defined in source of truth

## 0.0.16

### Added

- Markdown linting configuration (`.markdownlint.jsonc`)
- `npm run lint:md` and `npm run lint:md:fix` scripts

### Changed

- Updated documentation formatting

## 0.0.15

### Added

- Initial pub.dev release preparation for Flutter package
- CHANGELOG.md for Flutter package

## 0.0.12

### Added

- KDE Plasma color schemes (v4, v5, v6)
- GNOME GTK3/GTK4 themes
- Obsidian theme with 60+ CSS variables
- Comprehensive documentation website

### Changed

- Migrated to GitHub Packages for npm publishing
- Updated README with multi-platform architecture

## 0.0.10

### Added

- VS Code extension with light and dark themes
- Vim colorschemes with terminal color support
- Flutter package with OKLCH metadata

## 0.0.1

### Added

- Initial release
- OKLCH color palette (light and dark modes)
- Tailwind CSS v3 plugin and theme
- Tailwind CSS v4 theme support
- CSS custom properties export
