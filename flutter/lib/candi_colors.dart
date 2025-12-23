/// Candi Color Palette for Flutter
///
/// Generated from OKLCH source of truth.
library;

import 'dart:ui';

/// A Color implementation that retains OKLCH metadata.
class CandiColor extends Color {
  final double lightness;
  final double chroma;
  final double hue;
  final double opacity;

  const CandiColor(int value, {
    required this.lightness,
    required this.chroma,
    required this.hue,
    this.opacity = 1.0,
  }) : super(value);

  @override
  String toString() => 'CandiColor(oklch(${(lightness * 100).toStringAsFixed(0)}% $chroma $hue))';
}

/// Semantic color palette for the Candi theme.
class CandiPalette {
  const CandiPalette._({
    required this.bg,
    required this.surface,
    required this.elevated,
    required this.text,
    required this.textSubtle,
    required this.textMuted,
    required this.border,
    required this.borderStrong,
    required this.accent,
    required this.accentSubtle,
    required this.secondary,
    required this.secondarySubtle,
    required this.success,
    required this.warning,
    required this.error,
    required this.focusRing,
  });

  final CandiColor bg;
  final CandiColor surface;
  final CandiColor elevated;
  final CandiColor text;
  final CandiColor textSubtle;
  final CandiColor textMuted;
  final CandiColor border;
  final CandiColor borderStrong;
  final CandiColor accent;
  final CandiColor accentSubtle;
  final CandiColor secondary;
  final CandiColor secondarySubtle;
  final CandiColor success;
  final CandiColor warning;
  final CandiColor error;
  final CandiColor focusRing;
}

abstract final class CandiColors {
  /// Light mode palette
  static const light = CandiPalette._(
    // oklch(98% 0.008 85)
    bg: CandiColor(0XFFFBF8F2, lightness: 0.98, chroma: 0.008, hue: 85),
    // oklch(95.5% 0.012 85)
    surface: CandiColor(0XFFF4F0E7, lightness: 0.955, chroma: 0.012, hue: 85),
    // oklch(100% 0 0)
    elevated: CandiColor(0XFFFFFFFF, lightness: 1, chroma: 0, hue: 0),
    // oklch(28% 0.015 250)
    text: CandiColor(0XFF232A30, lightness: 0.28, chroma: 0.015, hue: 250),
    // oklch(50% 0.01 250)
    textSubtle: CandiColor(0XFF5F6469, lightness: 0.5, chroma: 0.01, hue: 250),
    // oklch(62% 0.008 250)
    textMuted: CandiColor(0XFF83878B, lightness: 0.62, chroma: 0.008, hue: 250),
    // oklch(90% 0.008 85)
    border: CandiColor(0XFFE0DED8, lightness: 0.9, chroma: 0.008, hue: 85),
    // oklch(82% 0.01 85)
    borderStrong: CandiColor(0XFFC7C4BD, lightness: 0.82, chroma: 0.01, hue: 85),
    // oklch(52% 0.06 230)
    accent: CandiColor(0XFF437085, lightness: 0.52, chroma: 0.06, hue: 230),
    // oklch(85% 0.03 230)
    accentSubtle: CandiColor(0XFFBBD2DE, lightness: 0.85, chroma: 0.03, hue: 230),
    // oklch(58% 0.12 55)
    secondary: CandiColor(0XFFB0652A, lightness: 0.58, chroma: 0.12, hue: 55),
    // oklch(88% 0.04 55)
    secondarySubtle: CandiColor(0XFFEDD1BF, lightness: 0.88, chroma: 0.04, hue: 55),
    // oklch(52% 0.08 145)
    success: CandiColor(0XFF4A754C, lightness: 0.52, chroma: 0.08, hue: 145),
    // oklch(68% 0.13 70)
    warning: CandiColor(0XFFCB882E, lightness: 0.68, chroma: 0.13, hue: 70),
    // oklch(58% 0.12 25)
    error: CandiColor(0XFFB75B55, lightness: 0.58, chroma: 0.12, hue: 25),
    // oklch(52% 0.06 230 / 0.4)
    focusRing: CandiColor(0X66437085, lightness: 0.52, chroma: 0.06, hue: 230, opacity: 0.4),
  );

  /// Dark mode palette
  static const dark = CandiPalette._(
    // oklch(18% 0.015 250)
    bg: CandiColor(0XFF0D1218, lightness: 0.18, chroma: 0.015, hue: 250),
    // oklch(22% 0.012 250)
    surface: CandiColor(0XFF161B20, lightness: 0.22, chroma: 0.012, hue: 250),
    // oklch(25% 0.015 250)
    elevated: CandiColor(0XFF1C2229, lightness: 0.25, chroma: 0.015, hue: 250),
    // oklch(92% 0.01 85)
    text: CandiColor(0XFFE8E4DD, lightness: 0.92, chroma: 0.01, hue: 85),
    // oklch(72% 0.008 85)
    textSubtle: CandiColor(0XFFA7A49F, lightness: 0.72, chroma: 0.008, hue: 85),
    // oklch(58% 0.006 85)
    textMuted: CandiColor(0XFF7C7A76, lightness: 0.58, chroma: 0.006, hue: 85),
    // oklch(30% 0.01 250)
    border: CandiColor(0XFF2A2E33, lightness: 0.3, chroma: 0.01, hue: 250),
    // oklch(40% 0.012 250)
    borderStrong: CandiColor(0XFF43484E, lightness: 0.4, chroma: 0.012, hue: 250),
    // oklch(62% 0.08 230)
    accent: CandiColor(0XFF4F8FAD, lightness: 0.62, chroma: 0.08, hue: 230),
    // oklch(35% 0.04 230)
    accentSubtle: CandiColor(0XFF233F4B, lightness: 0.35, chroma: 0.04, hue: 230),
    // oklch(65% 0.12 55)
    secondary: CandiColor(0XFFC77A41, lightness: 0.65, chroma: 0.12, hue: 55),
    // oklch(30% 0.05 55)
    secondarySubtle: CandiColor(0XFF412714, lightness: 0.3, chroma: 0.05, hue: 55),
    // oklch(60% 0.1 145)
    success: CandiColor(0XFF58905A, lightness: 0.6, chroma: 0.1, hue: 145),
    // oklch(72% 0.13 70)
    warning: CandiColor(0XFFD8953D, lightness: 0.72, chroma: 0.13, hue: 70),
    // oklch(65% 0.12 25)
    error: CandiColor(0XFFCE7069, lightness: 0.65, chroma: 0.12, hue: 25),
    // oklch(62% 0.08 230 / 0.5)
    focusRing: CandiColor(0X804F8FAD, lightness: 0.62, chroma: 0.08, hue: 230, opacity: 0.5),
  );
}
