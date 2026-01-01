# Flutter Integration Guide

The Candi Design System provides a Flutter package for using OKLCH-based colors in cross-platform applications.

## Installation

Add the dependency to your `pubspec.yaml`:

```yaml
dependencies:
  candi_colors:
    git:
      url: https://github.com/wtasg/candi.git
      path: flutter
```

For local development within the monorepo:

```yaml
dependencies:
  candi_colors:
    path: ../flutter
```

## Basic Usage

```dart
import 'package:candi_colors/candi.dart';

// Access the light theme
final theme = CandiColors.light;

// Use in widgets
Container(
  color: theme.bg,
  child: Text(
    'Candi Design',
    style: TextStyle(color: theme.text),
  ),
)
```

## The `CandiColor` Class

`CandiColor` extends Flutter's `Color` class and retains OKLCH metadata for advanced UI logic.

### Metadata Access

```dart
final accent = CandiColors.light.accent;

print(accent.lightness); // 0.52
print(accent.chroma);    // 0.06
print(accent.hue);       // 230.0 (Steel Blue)

// Compatible with standard Color parameters
Color standardColor = accent; 
```

## Theme Reference

Semantic tokens available on `CandiColors.light` and `CandiColors.dark`:

| Token | Description |
| :--- | :--- |
| `bg` | Main application background |
| `surface` | Card and secondary section background |
| `elevated` | Modal, popup, and input background |
| `text` | Primary body text |
| `subtle` | Secondary text |
| `muted` | De-emphasized text and dividers |
| `border` | Subtle border color |
| `accent` | Primary action color (Steel Blue) |
| `secondary` | Secondary action color (Terracotta) |
| `success` | Success states |
| `warning` | Warning states |
| `error` | Error states |

## Dynamic Theme Switching

Use standard Flutter state management like `ValueNotifier` or `Provider`:

```dart
ValueNotifier<CandiThemeData> themeNotifier = ValueNotifier(CandiColors.light);

ValueListenableBuilder(
  valueListenable: themeNotifier,
  builder: (context, theme, _) {
    return Container(color: theme.bg);
  },
);

// Toggle
themeNotifier.value = isDark ? CandiColors.dark : CandiColors.light;
```
