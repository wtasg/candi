import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:candi_colors/candi.dart';

void main() {
  group('CandiColor', () {
    test('should store OKLCH properties correctly', () {
      final color = CandiColor(
        0xFF437085,
        lightness: 0.52,
        chroma: 0.06,
        hue: 230.0,
      );

      expect(color.toARGB32(), 0xFF437085);
      expect(color.lightness, 0.52);
      expect(color.chroma, 0.06);
      expect(color.hue, 230.0);
    });

    test('should be compatible with standard Color', () {
      final color = CandiColors.light.accent;
      expect(color, isA<Color>());
    });
  });

  group('CandiPalette', () {
    test('light palette should have correct background', () {
      final light = CandiColors.light;
      expect(light.bg.lightness, 0.98);
      expect(light.bg.chroma, 0.008);
      expect(light.bg.hue, 85.0);
    });

    test('dark palette should have correct background', () {
      final dark = CandiColors.dark;
      expect(dark.bg.lightness, 0.18);
      expect(dark.bg.chroma, 0.015);
      expect(dark.bg.hue, 250.0);
    });

    test('focusRing should have correct opacity', () {
      final light = CandiColors.light;
      expect(light.focusRing.candiOpacity, 0.4);

      final dark = CandiColors.dark;
      expect(dark.focusRing.candiOpacity, 0.5);
    });
  });

  group('Convenience Aliases', () {
    test('muted should reference textMuted', () {
      expect(CandiColors.light.muted, equals(CandiColors.light.textMuted));
      expect(CandiColors.dark.muted, equals(CandiColors.dark.textMuted));
    });

    test('subtle should reference textSubtle', () {
      expect(CandiColors.light.subtle, equals(CandiColors.light.textSubtle));
      expect(CandiColors.dark.subtle, equals(CandiColors.dark.textSubtle));
    });

    test('primary should reference accent', () {
      expect(CandiColors.light.primary, equals(CandiColors.light.accent));
      expect(CandiColors.dark.primary, equals(CandiColors.dark.accent));
    });

    test('onPrimary should reference onAccent', () {
      expect(CandiColors.light.onPrimary, equals(CandiColors.light.onAccent));
      expect(CandiColors.dark.onPrimary, equals(CandiColors.dark.onAccent));
    });

    test('background should reference bg', () {
      expect(CandiColors.light.background, equals(CandiColors.light.bg));
      expect(CandiColors.dark.background, equals(CandiColors.dark.bg));
    });
  });

  group('Flutter Integration', () {
    test('toColorScheme should return valid ColorScheme', () {
      final lightScheme = CandiColors.light.toColorScheme();
      expect(lightScheme, isA<ColorScheme>());
      expect(lightScheme.brightness, Brightness.light);
      expect(lightScheme.primary, equals(CandiColors.light.accent));
      expect(lightScheme.error, equals(CandiColors.light.error));
      expect(lightScheme.surface, equals(CandiColors.light.surface));

      final darkScheme = CandiColors.dark.toColorScheme();
      expect(darkScheme.brightness, Brightness.dark);
      expect(darkScheme.primary, equals(CandiColors.dark.accent));
    });

    test('toThemeData should return valid ThemeData', () {
      final lightTheme = CandiColors.light.toThemeData();
      expect(lightTheme, isA<ThemeData>());
      expect(lightTheme.useMaterial3, true);
      expect(lightTheme.scaffoldBackgroundColor, equals(CandiColors.light.bg));
      expect(lightTheme.colorScheme.primary, equals(CandiColors.light.accent));

      final darkTheme = CandiColors.dark.toThemeData();
      expect(darkTheme.useMaterial3, true);
      expect(darkTheme.colorScheme.brightness, Brightness.dark);
    });
  });
}
