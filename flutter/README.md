# Candi Colors for Flutter

A Dart package providing Scandinavian design system colors for Flutter applications.

## Features

- **OKLCH-First**: Colors defined using native OKLCH values for uniform design.
- **Dynamic Themes**: Predefined light and dark mode palettes.
- **Zero Runtime Overhead**: OKLCH to sRGB conversion occurs at build-time.
- **Compatibility**: Supports all platforms (iOS, Android, Web, etc.).
- **123 Colors**: Including 60 primitive color tokens with variants.

## Installation

The Flutter package is published as `candi_colors`. Add it to `pubspec.yaml`:

```yaml
dependencies:
  candi_colors:
    git:
      url: https://github.com/wtasg/candi.git
      path: flutter
```

## Flutter Quick Start

Build a `ThemeData` from a `CandiPalette` so light and dark modes stay in sync:

```dart
import 'package:candi_colors/candi.dart';
import 'package:flutter/material.dart';

ThemeData buildTheme(CandiPalette palette, Brightness brightness) {
  return ThemeData(
    brightness: brightness,
    scaffoldBackgroundColor: palette.bg,
    colorScheme: ColorScheme.fromSeed(
      seedColor: palette.accent,
      brightness: brightness,
    ),
  );
}

void main() {
  runApp(
    MaterialApp(
      theme: buildTheme(CandiColors.light, Brightness.light),
      darkTheme: buildTheme(CandiColors.dark, Brightness.dark),
      themeMode: ThemeMode.system,
    ),
  );
}
```

## Usage

```dart
import 'package:candi_colors/candi.dart';

// Quick theming
MaterialApp(
  theme: CandiColors.light.toThemeData(),
  darkTheme: CandiColors.dark.toThemeData(),
);

// Direct color access
Container(color: CandiColors.light.surface);
Text('Hello', style: TextStyle(color: CandiColors.dark.text));
```

## Primitive Colors

10 color families with 6 variants each:

| Family  | Base     | Subtle      | Soft      | Strong      | Outline      | On*      |
|---------|----------|-------------|-----------|-------------|--------------|----------|
| Red     | `red`    | `redSubtle` | `redSoft` | `redStrong` | `redOutline` | `onRed`  |
| Blue    | `blue`   | `blueSubtle`| `blueSoft`| `blueStrong`| `blueOutline`| `onBlue` |
| Green   | `green`  | etc.        |           |             |              |          |
| Yellow  | `yellow` |             |           |             |              |          |
| Magenta | `magenta`|             |           |             |              |          |
| Cyan    | `cyan`   |             |           |             |              |          |
| Teal    | `teal`   |             |           |             |              |          |
| Pink    | `pink`   |             |           |             |              |          |
| Gold    | `gold`   |             |           |             |              |          |
| Silver  | `silver` |             |           |             |              |          |

```dart
// Use primitives directly
Container(color: CandiColors.light.gold);
Container(color: CandiColors.dark.cyanSubtle);
Text('Alert', style: TextStyle(color: CandiColors.light.redStrong));
```

## The `CandiColor` Class

`CandiColor` extends Flutter's `Color` and includes OKLCH metadata.

```dart
final accent = CandiColors.light.accent;
print(accent.lightness); // 0.52
print(accent.chroma);    // 0.06
print(accent.hue);       // 230.0
```

## Development

1. Update Changelog.md with changes
2. Run `flutter pub publish --dry-run` to validate changes
3. Run `flutter pub publish` to publish to pub.dev

## License

MIT License - See [LICENSE](LICENSE) for details.
