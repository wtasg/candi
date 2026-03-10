# Candi Core (Dart)

The Dart implementation of Candi utilities for OKLCH and semantic color derivation.

## Features

- **OKLCH color parsing**
- **Semantic color derivation pipeline**
- **Platform-agnostic (Dart-only)**

## Installation

Add it to your `pubspec.yaml`:

```yaml
dependencies:
  candi:
    git:
      url: https://github.com/wtasg/candi.git
      path: dart
```

## Usage

```dart
import 'package:candi/candi.dart';

void main() {
  final color = CandiColor.fromOklch(0.7, 0.12, 70);
  print('Hex: ${color.toHex()}');
}
```

## License

MIT
