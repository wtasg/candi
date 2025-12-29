# Changelog

## 0.0.24

### Added

- Convenience aliases for common design system naming patterns:
  - `muted` → `textMuted`
  - `subtle` → `textSubtle`
  - `primary` / `onPrimary` → `accent` / `onAccent`
  - `primarySubtle` → `accentSubtle`
  - `background` → `bg`
- `toColorScheme()` factory method - returns Material 3 ColorScheme
- `toThemeData()` factory method - returns complete ThemeData with:
  - Scaffold, card, and canvas colors
  - AppBar, button, and input decoration themes
  - Text theme with proper color hierarchy
  - Divider, icon, and focus themes

### Changed

- Enhanced dartdoc comments with code examples
- Improved property documentation for all 33 color tokens
- Library-level Quick Start guide

### Fixed

- Resolved 17 deprecation warnings for Flutter 3.x compatibility
- Replaced deprecated `withOpacity()` with `withValues(alpha:)`
- Replaced deprecated `.value` with direct Color comparison
- Updated dartdoc to reference `candiOpacity` instead of deprecated `opacity`

## 0.0.21

### Added

- Automated lint checks with `dart format` and `dart analyze`

## 0.0.20

### Added

- Comprehensive dartdoc comments for all public API members
  - CandiColor class and all properties fully documented
  - CandiPalette class with detailed descriptions for all 33 color tokens
  - CandiColors class with usage examples
- Example application (`example/main.dart`)
  - Interactive light/dark mode switcher
  - Complete showcase of all 33 color tokens
  - OKLCH metadata display for each color
  - Material Design 3 integration example
  - Example buttons and components
- Example README with usage patterns and integration guide

### Changed

- Improved documentation coverage from 15.6% to 100%
- Formatted all Dart code with `dart format`
- Enhanced pub.dev package quality score

## 0.0.19

- Version synchronization update
- No functional changes

## 0.0.18

- Version synchronization update
- No functional changes

## 0.0.17

- Expanded color palette from 16 to 33 colors per mode
- Added contrast colors: onAccent, onSecondary, onSuccess, onWarning, onError, onInfo
- Added UI colors: divider, scrim, shadowColor
- Added inverse colors: inverseSurface, inverseText (for SnackBars)
- Added interactive states: hover, active, link, disabled
- Full Material Design 3 color role coverage

## 0.0.16

- Added markdown linting configuration
- Updated documentation

## 0.0.15

- Initial pub.dev release preparation
- Light and dark mode color palettes
- 16 semantic color tokens per palette
- CandiColor class with OKLCH metadata
- Colors converted from OKLCH to sRGB
