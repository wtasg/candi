import 'package:flutter_test/flutter_test.dart';
import 'package:candi_colors/candi.dart';
import 'dart:ui';

void main() {
  group('CandiColor', () {
    test('should store OKLCH properties correctly', () {
      final color = CandiColor(
        0xFF437085,
        lightness: 0.52,
        chroma: 0.06,
        hue: 230.0,
      );

      expect(color.value, 0xFF437085);
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
      expect(light.focusRing.opacity, 0.4);

      final dark = CandiColors.dark;
      expect(dark.focusRing.opacity, 0.5);
    });
  });
}
