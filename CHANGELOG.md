# Changelog

All notable changes to the Candi Design System will be documented in this file.

## 0.0.32

### Added

- **VS Code Theme Completion**:
  - Deep Dive coverage: Diff Editor, Merge Conflicts, Notebooks, Minimap, Keybinding Labels, Charts.
  - Semantic Highlighting enabled for TypeScript, Python, Rust.
  - Granular syntax token mappings.
- **Vim/Neovim Theme Completion**:
  - Full Neovim UI support (Floating windows, WinBar, Messages).
  - Native Treesitter highlighting (guarded for standard Vim compatibility).
  - Plugin support: Telescope, Gitsigns, Nvim-Tree, Airline, Lightline.
  - "On" color primitives exposed.
- **Build System**:
  - "Silent Success, Roaring Failures" logging pattern implemented across all scripts.
  - `npm run install:local` support extensions.

### Fixed

- **Vim Light Theme**: Restored high-contrast Sapphire Blue statusline for proper legibility (reverted beige regression).
- **Vim Compatibility**: Resolved `W18` invalid group name error in standard Vim by guarding Neovim-specific groups.

## 0.0.31

### Added

- **Primitive Colors**: 10 color families with 6 variants each (60 new tokens)
  - Families: red, blue, green, yellow, magenta, cyan, teal, pink, gold, silver
  - Variants: base, subtle, soft, strong, outline, on*
- **Version Management System**:
  - `published_versions.json` for per-project version tracking
  - `scripts/mark-published.sh` to mark versions after release
  - `scripts/build-docs.js` for placeholder injection in documentation
  - `docs/dev_versioning.md` with workflow diagrams
- **VSCode Bracket Colorization**: 6 distinct primitive colors for bracket pair highlighting
- **Vim Rainbow Brackets**: 7 rainbow colors + 30 `Candi*` highlight groups for customization
- **KDE Primitive Colors**: `[Colors:Candi]` section with 10 primitives in color schemes
- **Konsole Primitive Colors**: `[Candi]` section with 10 primitives in terminal themes
- **Obsidian Primitive Colors**: 22 CSS custom properties (`--candi-*`) for custom styling
- **GNOME Primitive Colors**: 10 `@define-color candi_*` variables in GTK themes
- **COLOR_REFERENCE.md**: Complete color token reference for VSCode extension
- **Regression Tests**: 7 new Flutter tests for primitive color coverage
- **Script Regression Tests**: 8 new test files (110+ assertions) for build scripts
  - `test-scripts.js`, `test-color-conv.js`, `test-sync.js`, `test-lint-tokens.js`
  - `test-gen-primitives.js`, `test-build-docs.js`, `test-guard-semantics.js`, `test-package-artifacts.js`
- **Local Install Script**: `npm run install:local` for one-command theme installation

### Changed

- Expanded palette from 63 to 123 colors per mode
- Added `showcase_flutter` to `package-install.sh` (now 5 components)
- Excluded `.dart_tool` from markdown linting
- Updated README with new test commands table

## 0.0.27

### Added

- Web support for the Flutter showcase application.
- Improved build process and package metadata.

## 0.0.26

### Added

- **Showcase App**: New Flutter-based interactive showcase application in `showcase_flutter/`.
  - Comprehensive gallery of all color-mode-aware components.
  - Interactive playground for accessibility and color vision simulation.
  - Real-time theme switching (Light/Dark).
- **Regression Testing**: Added platform-specific tests for KDE, Flutter, and VS Code.
- **Validation**: JSON Schema for `src/data/colors.js` to ensure token integrity.
- **Linting**: New `npm run lint:tokens` and `npm run lint:all`.

### Changed

- **Terminal Colors**: Refactored terminal color definitions to eliminate redundancy and ensure parity across all platforms.
- **Documentation**: Updated architecture diagrams and platform guides.

## 0.0.25

### Added

- Programmatic color derivation engine in `scripts/gen-oklch-primitives.js`.
- Color system architecture and derivation rules in `ARCHITECTURE.md`.
- Regression guards: `guard-semantics.js` and `compare-derivations.js`.

### Changed

- **Light Mode**: Adjusted editor background to a "warm white" (`oklch(96% 0.012 85)`) for enhanced comfort.
- **Dark Mode**: Shifted neutral palette to Hue 85 for system-wide warmth (Hygge).
- **Subtle Variants**: Increased chroma preservation to 80% to maintain chromatic richness (Lagom).
- **VS Code Light**: Muted editor background by swapping `bg` and `surface` token roles.
- **Synchronization**: Unified palette across Flutter, Vim, GNOME, KDE, and Obsidian.

### Fixed

- Updated test suites and reference values to align with warm neutral architecture.
- Resolved all known parity issues across platform build scripts.

## 0.0.24

### Added

- Flutter package: Convenience aliases for common design system naming patterns
  - `muted` → `textMuted`, `subtle` → `textSubtle`
  - `primary` / `onPrimary` → `accent` / `onAccent`
  - `background` → `bg`
- Flutter package: `toColorScheme()` factory method for Material 3 integration
- Flutter package: `toThemeData()` factory method for complete theme generation

### Changed

- Flutter package: Enhanced dartdoc comments with code examples and property documentation
- Flutter package: File size increased from 360 to 696 lines (improved documentation)

### Fixed

- Flutter package: Resolved 17 deprecation warnings for Flutter 3.x compatibility
  - Replaced deprecated `withOpacity()` with `withValues(alpha:)`
  - Replaced deprecated `.value` with direct Color comparison
  - Updated dartdoc to reference `candiOpacity` instead of deprecated `opacity`

## 0.0.23

### Changed

- Removed GitHub Packages publishing (package now only published to npmjs.com)
- Simplified publishing workflow

## 0.0.22

### Changed

- Package name updated from `@wtasg/candi` to `@wtasnorg/candi` for npmjs.com publication

## 0.0.21

### Added

- Dart lint integration with `lint:dart` and `lint:all` npm scripts
  - Automated dart format checks
  - Automated dart analyze checks
- Lint script (`scripts/lint-dart.js`) for Flutter package quality assurance
- Dual publishing to npmjs.com and GitHub Packages
  - Package now available on npmjs.com as `@wtasnorg/candi` (no authentication required)
  - GitHub Packages publishing maintained for GitHub-native workflows
  - Simplified installation for all users

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
