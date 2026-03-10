import 'package:test/test.dart';
import 'package:candi/candi.dart';

void main() {
  group('Color Conversions', () {
    test('parseOklch parses basic OKLCH string', () {
      final parsed = parseOklch('oklch(50% 0.13 245)');
      expect(parsed, isNotNull);
      expect(parsed!.l, 0.50);
      expect(parsed.c, 0.13);
      expect(parsed.h, 245.0);
    });

    test('oklchToRgb produces correct RGB', () {
      final rgb = oklchToRgb(0.0, 0.0, 0.0);
      expect(rgb.r, 0);
      expect(rgb.g, 0);
      expect(rgb.b, 0);
    });

    test('toHex6 formats output correctly', () {
      final hex = toHex6(const RgbaColor(r: 255, g: 0, b: 0));
      expect(hex, '#FF0000');
    });

    test('toHex8 adds opacity correctly', () {
      final hex = toHex8(const RgbaColor(r: 255, g: 255, b: 255, a: 0.5));
      expect(hex, '0x80FFFFFF'); // 0.5 * 255 = 127.5 ~ 128 = 80
    });
  });

  group('Contrast', () {
    test('Black vs White contrast is 21', () {
      final white = const RgbaColor(r: 255, g: 255, b: 255);
      final black = const RgbaColor(r: 0, g: 0, b: 0);
      final ratio = getContrast(white, black);
      expect(ratio, closeTo(21.0, 0.1));
    });

    test('deriveOnColor selects White for dark bg', () {
      final res = deriveOnColor('oklch(20% 0 0)');
      expect(res.color, 'White');
    });
  });

  group('Palette Generation', () {
    test('Generates fully formed palettes', () {
      final palette = generatePalette();
      expect(palette.containsKey('light'), true);
      expect(palette.containsKey('dark'), true);
      expect(palette['light']!.containsKey('accentSubtle'), true);
    });
  });

  group('Naming Utilities', () {
    test('toKebab transforms camelCase', () {
      expect(toKebab('accentSubtle'), 'accent-subtle');
      expect(toKebab('veryLongTokenName'), 'very-long-token-name');
    });
  });
}
