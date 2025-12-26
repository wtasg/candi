# Candi Colors Example

This example demonstrates how to use the Candi color palette in a Flutter application.

## Features

- **Light and Dark Mode**: Toggle between light and dark color palettes
- **Complete Color Showcase**: Displays all 33 color tokens from the Candi Design System
- **OKLCH Metadata**: Shows the original OKLCH values for each color
- **Material Design 3**: Demonstrates integration with Flutter's Material Design 3 theming
- **Interactive Components**: Example buttons using the color palette

## Running the Example

```bash
flutter run
```

## Usage

### Basic Usage

```dart
import 'package:candi_colors/candi_colors.dart';

// Access light mode colors
final lightBg = CandiColors.light.bg;
final lightAccent = CandiColors.light.accent;

// Access dark mode colors
final darkBg = CandiColors.dark.bg;
final darkAccent = CandiColors.dark.accent;
```

### Material Theme Integration

```dart
ThemeData(
  useMaterial3: true,
  scaffoldBackgroundColor: palette.bg,
  colorScheme: ColorScheme(
    brightness: isDarkMode ? Brightness.dark : Brightness.light,
    primary: palette.accent,
    onPrimary: palette.onAccent,
    secondary: palette.secondary,
    onSecondary: palette.onSecondary,
    error: palette.error,
    onError: palette.onError,
    surface: palette.surface,
    onSurface: palette.text,
  ),
)
```

### Custom Widgets

```dart
Container(
  color: palette.surface,
  child: Text(
    'Hello, Candi!',
    style: TextStyle(color: palette.text),
  ),
)
```

### Accessing OKLCH Metadata

```dart
final accent = CandiColors.light.accent;
print('Lightness: ${accent.lightness}');  // 0.52
print('Chroma: ${accent.chroma}');        // 0.06
print('Hue: ${accent.hue}');              // 230
print(accent);                            // CandiColor(oklch(52% 0.06 230))
```

## Color Categories

- **Background Colors**: bg, surface, elevated
- **Text Colors**: text, textSubtle, textMuted
- **Border Colors**: border, borderStrong, divider
- **Accent Colors**: accent, accentSubtle, onAccent
- **Secondary Colors**: secondary, secondarySubtle, onSecondary
- **Status Colors**: success, warning, error, info
- **Interactive Colors**: link, disabled, hover, active
- **Utility Colors**: overlay, scrim, shadowColor, focusRing
- **Inverse Colors**: inverseSurface, inverseText

## Learn More

- [Candi Design System Documentation](https://wtasg.github.io/candi/)
- [Flutter Integration Guide](https://github.com/wtasg/candi/blob/main/docs/flutter-integration.md)
