/// Contrast and automated accessibility rules.
import 'dart:math' as math;
import 'types.dart';
import 'color_conv.dart';

double getLuminance(double r, double g, double b) {
  double toLinear(double v) {
    return v <= 0.03928
        ? v / 12.92
        : math.pow((v + 0.055) / 1.055, 2.4).toDouble();
  }

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

double getContrast(RgbaColor rgb1, RgbaColor rgb2) {
  final l1 = getLuminance(rgb1.r / 255.0, rgb1.g / 255.0, rgb1.b / 255.0);
  final l2 = getLuminance(rgb2.r / 255.0, rgb2.g / 255.0, rgb2.b / 255.0);
  final brighter = math.max(l1, l2);
  final darker = math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

class OnColorResult {
  final String oklch;
  final double contrast;
  final String color;
  final bool warning;

  const OnColorResult({
    required this.oklch,
    required this.contrast,
    required this.color,
    this.warning = false,
  });
}

OnColorResult deriveOnColor(String baseOklchStr) {
  final parsed = parseOklch(baseOklchStr);
  if (parsed == null)
    throw ArgumentError('Invalid OKLCH string: \$baseOklchStr');

  final bgRgb = RgbaColor(r: parsed.r, g: parsed.g, b: parsed.b);
  final white = const RgbaColor(r: 255, g: 255, b: 255);
  final black = const RgbaColor(r: 0, g: 0, b: 0);

  final whiteContrast = getContrast(bgRgb, white);
  final blackContrast = getContrast(bgRgb, black);

  if (whiteContrast >= 4.5 && whiteContrast >= blackContrast) {
    return OnColorResult(
        oklch: 'oklch(100% 0 0)', contrast: whiteContrast, color: 'White');
  } else if (blackContrast >= 4.5 && blackContrast > whiteContrast) {
    return OnColorResult(
        oklch: 'oklch(0% 0 0)', contrast: blackContrast, color: 'Black');
  } else {
    if (whiteContrast >= blackContrast) {
      return OnColorResult(
          oklch: 'oklch(100% 0 0)',
          contrast: whiteContrast,
          color: 'White',
          warning: true);
    } else {
      return OnColorResult(
          oklch: 'oklch(0% 0 0)',
          contrast: blackContrast,
          color: 'Black',
          warning: true);
    }
  }
}
