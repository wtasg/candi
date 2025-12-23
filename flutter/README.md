# Candi Colors for Flutter

A Dart package providing Scandinavian design system colors for Flutter applications.

## Features

- **OKLCH-First**: Colors defined using native OKLCH values for uniform design.
- **Dynamic Themes**: Predefined light and dark mode palettes.
- **Zero Runtime Overhead**: OKLCH to sRGB conversion occurs at build-time.
- **Compatibility**: Supports all platforms (iOS, Android, Web, etc.).

## Installation

Add to `pubspec.yaml`:

```yaml
dependencies:
  candi_colors:
    git:
      url: https://github.com/wtasg/candi.git
      path: flutter
```

## Usage

```dart
import 'package:candi_colors/candi.dart';

final theme = CandiColors.light;

Widget build(BuildContext context) {
  return Container(
    color: theme.bg,
    child: Text(
      'Hygge Style',
      style: TextStyle(color: theme.text),
    ),
  );
}
```

## The `CandiColor` Class

`CandiColor` extends Flutter's `Color` and includes OKLCH metadata.

```dart
final accent = CandiColors.light.accent;
print(accent.lightness); // 0.52
print(accent.chroma);    // 0.06
print(accent.hue);       // 230.0
```

## License

MIT
