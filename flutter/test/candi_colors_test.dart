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
      expect(light.bg.lightness, 0.96);
      expect(light.bg.chroma, 0.012);
      expect(light.bg.hue, 85.0);
    });

    test('dark palette should have correct background', () {
      final dark = CandiColors.dark;
      expect(dark.bg.lightness, 0.18);
      expect(dark.bg.chroma, 0.015);
      expect(dark.bg.hue, 85.0);
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

  group('Primitive Colors', () {
    // List of all primitive color families
    final primitiveColorFamilies = [
      'red',
      'blue',
      'green',
      'yellow',
      'magenta',
      'cyan',
      'teal',
      'pink',
      'gold',
      'silver',
    ];

    test('light palette should have all 10 primitive color families', () {
      final light = CandiColors.light;

      // Test red family
      expect(light.red, isA<CandiColor>());
      expect(light.redSubtle, isA<CandiColor>());
      expect(light.redSoft, isA<CandiColor>());
      expect(light.redStrong, isA<CandiColor>());
      expect(light.redOutline, isA<CandiColor>());
      expect(light.onRed, isA<CandiColor>());

      // Test blue family
      expect(light.blue, isA<CandiColor>());
      expect(light.blueSubtle, isA<CandiColor>());
      expect(light.blueSoft, isA<CandiColor>());
      expect(light.blueStrong, isA<CandiColor>());
      expect(light.blueOutline, isA<CandiColor>());
      expect(light.onBlue, isA<CandiColor>());

      // Test remaining families exist
      expect(light.green, isA<CandiColor>());
      expect(light.yellow, isA<CandiColor>());
      expect(light.magenta, isA<CandiColor>());
      expect(light.cyan, isA<CandiColor>());
      expect(light.teal, isA<CandiColor>());
      expect(light.pink, isA<CandiColor>());
      expect(light.gold, isA<CandiColor>());
      expect(light.silver, isA<CandiColor>());
    });

    test('dark palette should have all 10 primitive color families', () {
      final dark = CandiColors.dark;

      // Test gold family (representative)
      expect(dark.gold, isA<CandiColor>());
      expect(dark.goldSubtle, isA<CandiColor>());
      expect(dark.goldSoft, isA<CandiColor>());
      expect(dark.goldStrong, isA<CandiColor>());
      expect(dark.goldOutline, isA<CandiColor>());
      expect(dark.onGold, isA<CandiColor>());

      // Test silver family (representative)
      expect(dark.silver, isA<CandiColor>());
      expect(dark.silverSubtle, isA<CandiColor>());
      expect(dark.silverSoft, isA<CandiColor>());
      expect(dark.silverStrong, isA<CandiColor>());
      expect(dark.silverOutline, isA<CandiColor>());
      expect(dark.onSilver, isA<CandiColor>());
    });

    test('primitive colors should have valid OKLCH properties', () {
      final light = CandiColors.light;

      // Base colors should have reasonable lightness (not too dark/light)
      expect(light.red.lightness, greaterThan(0.3));
      expect(light.red.lightness, lessThan(0.8));

      // Subtle variants should have higher lightness (lighter)
      expect(light.redSubtle.lightness, greaterThan(light.red.lightness));

      // Strong variants should have lower lightness (darker)
      expect(light.redStrong.lightness, lessThan(light.red.lightness));

      // on* colors should have readable contrast (high or low lightness)
      expect(
        light.onRed.lightness < 0.3 || light.onRed.lightness > 0.8,
        isTrue,
        reason: 'onRed should be very light or very dark for readability',
      );
    });

    test('primitive colors should maintain hue consistency within families',
        () {
      final light = CandiColors.light;

      // Red family should all have similar hue
      final redHue = light.red.hue;
      expect(light.redSoft.hue, closeTo(redHue, 15));
      expect(light.redStrong.hue, closeTo(redHue, 15));

      // Blue family should all have similar hue
      final blueHue = light.blue.hue;
      expect(light.blueSoft.hue, closeTo(blueHue, 15));
      expect(light.blueStrong.hue, closeTo(blueHue, 15));
    });

    test('light and dark primitives should have different lightness', () {
      // Light mode base colors should be darker than dark mode (for visibility)
      expect(
        CandiColors.light.red.lightness,
        isNot(equals(CandiColors.dark.red.lightness)),
      );
      expect(
        CandiColors.light.blue.lightness,
        isNot(equals(CandiColors.dark.blue.lightness)),
      );
    });
  });

  group('Terminal Colors', () {
    test('should have all 8 terminal colors', () {
      final light = CandiColors.light;
      expect(light.terminalBlack, isA<CandiColor>());
      expect(light.terminalRed, isA<CandiColor>());
      expect(light.terminalGreen, isA<CandiColor>());
      expect(light.terminalYellow, isA<CandiColor>());
      expect(light.terminalBlue, isA<CandiColor>());
      expect(light.terminalMagenta, isA<CandiColor>());
      expect(light.terminalCyan, isA<CandiColor>());
      expect(light.terminalWhite, isA<CandiColor>());
    });
  });
}
