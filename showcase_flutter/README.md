# Candi Flutter Showcase

An interactive application demonstrating the Candi Design System in Flutter.

## Features

- **Component Gallery**: See how Candi colors look on real Flutter widgets.
- **Accessibility Playground**: Test contrast ratios and simulate color vision deficiencies.
- **Dynamic Theming**: Switch between Light and Dark modes in real-time.

## Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install)

### Running the App

```bash
# Clone the repository (if you haven't)
git clone https://github.com/wtasg/candi.git
cd candi/showcase_flutter

# Get dependencies
flutter pub get

# Run on your preferred device (e.g., linux, chrome)
flutter run -d linux
```

## Development

This app uses a path dependency on the `candi_colors` package located at `../flutter`. Changes made to the parent library's colors will be reflected here after a hard restart.

## Building for Web

```bash
flutter build web
```
