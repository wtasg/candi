/// Candi Color Palette for Flutter
///
/// Generated from OKLCH source of truth.
/// Total colors: 33 per palette
library;

import 'dart:ui';

/// A Color implementation that retains OKLCH metadata.
class CandiColor extends Color {
  final double lightness;
  final double chroma;
  final double hue;
  final double opacity;

  const CandiColor(
    int value, {
    required this.lightness,
    required this.chroma,
    required this.hue,
    this.opacity = 1.0,
  }) : super(value);

  @override
  String toString() =>
      'CandiColor(oklch(${(lightness * 100).toStringAsFixed(0)}% $chroma $hue))';
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
    required this.divider,
    required this.accent,
    required this.accentSubtle,
    required this.onAccent,
    required this.secondary,
    required this.secondarySubtle,
    required this.onSecondary,
    required this.success,
    required this.onSuccess,
    required this.warning,
    required this.onWarning,
    required this.error,
    required this.onError,
    required this.info,
    required this.onInfo,
    required this.link,
    required this.disabled,
    required this.focusRing,
    required this.overlay,
    required this.scrim,
    required this.shadowColor,
    required this.inverseSurface,
    required this.inverseText,
    required this.hover,
    required this.active,
  });

  final CandiColor bg;
  final CandiColor surface;
  final CandiColor elevated;
  final CandiColor text;
  final CandiColor textSubtle;
  final CandiColor textMuted;
  final CandiColor border;
  final CandiColor borderStrong;
  final CandiColor divider;
  final CandiColor accent;
  final CandiColor accentSubtle;
  final CandiColor onAccent;
  final CandiColor secondary;
  final CandiColor secondarySubtle;
  final CandiColor onSecondary;
  final CandiColor success;
  final CandiColor onSuccess;
  final CandiColor warning;
  final CandiColor onWarning;
  final CandiColor error;
  final CandiColor onError;
  final CandiColor info;
  final CandiColor onInfo;
  final CandiColor link;
  final CandiColor disabled;
  final CandiColor focusRing;
  final CandiColor overlay;
  final CandiColor scrim;
  final CandiColor shadowColor;
  final CandiColor inverseSurface;
  final CandiColor inverseText;
  final CandiColor hover;
  final CandiColor active;
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
    borderStrong:
        CandiColor(0XFFC7C4BD, lightness: 0.82, chroma: 0.01, hue: 85),
    // oklch(88% 0.006 85)
    divider: CandiColor(0XFFD9D7D3, lightness: 0.88, chroma: 0.006, hue: 85),
    // oklch(52% 0.06 230)
    accent: CandiColor(0XFF437085, lightness: 0.52, chroma: 0.06, hue: 230),
    // oklch(85% 0.03 230)
    accentSubtle:
        CandiColor(0XFFBBD2DE, lightness: 0.85, chroma: 0.03, hue: 230),
    // oklch(100% 0 0)
    onAccent: CandiColor(0XFFFFFFFF, lightness: 1, chroma: 0, hue: 0),
    // oklch(58% 0.12 55)
    secondary: CandiColor(0XFFB0652A, lightness: 0.58, chroma: 0.12, hue: 55),
    // oklch(88% 0.04 55)
    secondarySubtle:
        CandiColor(0XFFEDD1BF, lightness: 0.88, chroma: 0.04, hue: 55),
    // oklch(100% 0 0)
    onSecondary: CandiColor(0XFFFFFFFF, lightness: 1, chroma: 0, hue: 0),
    // oklch(52% 0.08 145)
    success: CandiColor(0XFF4A754C, lightness: 0.52, chroma: 0.08, hue: 145),
    // oklch(100% 0 0)
    onSuccess: CandiColor(0XFFFFFFFF, lightness: 1, chroma: 0, hue: 0),
    // oklch(68% 0.13 70)
    warning: CandiColor(0XFFCB882E, lightness: 0.68, chroma: 0.13, hue: 70),
    // oklch(20% 0.02 70)
    onWarning: CandiColor(0XFF1C140C, lightness: 0.2, chroma: 0.02, hue: 70),
    // oklch(58% 0.12 25)
    error: CandiColor(0XFFB75B55, lightness: 0.58, chroma: 0.12, hue: 25),
    // oklch(100% 0 0)
    onError: CandiColor(0XFFFFFFFF, lightness: 1, chroma: 0, hue: 0),
    // oklch(55% 0.1 240)
    info: CandiColor(0XFF3179A6, lightness: 0.55, chroma: 0.1, hue: 240),
    // oklch(100% 0 0)
    onInfo: CandiColor(0XFFFFFFFF, lightness: 1, chroma: 0, hue: 0),
    // oklch(50% 0.08 230)
    link: CandiColor(0XFF296B88, lightness: 0.5, chroma: 0.08, hue: 230),
    // oklch(75% 0.005 250)
    disabled: CandiColor(0XFFACAEB1, lightness: 0.75, chroma: 0.005, hue: 250),
    // oklch(52% 0.06 230 / 0.4)
    focusRing: CandiColor(0X66437085,
        lightness: 0.52, chroma: 0.06, hue: 230, opacity: 0.4),
    // oklch(0% 0 0 / 0.5)
    overlay:
        CandiColor(0X80000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.5),
    // oklch(0% 0 0 / 0.32)
    scrim:
        CandiColor(0X52000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.32),
    // oklch(25% 0.01 250 / 0.15)
    shadowColor: CandiColor(0X261E2226,
        lightness: 0.25, chroma: 0.01, hue: 250, opacity: 0.15),
    // oklch(25% 0.015 250)
    inverseSurface:
        CandiColor(0XFF1C2229, lightness: 0.25, chroma: 0.015, hue: 250),
    // oklch(92% 0.01 85)
    inverseText: CandiColor(0XFFE8E4DD, lightness: 0.92, chroma: 0.01, hue: 85),
    // oklch(0% 0 0 / 0.05)
    hover:
        CandiColor(0X0D000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.05),
    // oklch(0% 0 0 / 0.1)
    active:
        CandiColor(0X1A000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.1),
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
    borderStrong:
        CandiColor(0XFF43484E, lightness: 0.4, chroma: 0.012, hue: 250),
    // oklch(28% 0.008 250)
    divider: CandiColor(0XFF26292D, lightness: 0.28, chroma: 0.008, hue: 250),
    // oklch(62% 0.08 230)
    accent: CandiColor(0XFF4F8FAD, lightness: 0.62, chroma: 0.08, hue: 230),
    // oklch(35% 0.04 230)
    accentSubtle:
        CandiColor(0XFF233F4B, lightness: 0.35, chroma: 0.04, hue: 230),
    // oklch(15% 0.01 230)
    onAccent: CandiColor(0XFF070C0F, lightness: 0.15, chroma: 0.01, hue: 230),
    // oklch(65% 0.12 55)
    secondary: CandiColor(0XFFC77A41, lightness: 0.65, chroma: 0.12, hue: 55),
    // oklch(30% 0.05 55)
    secondarySubtle:
        CandiColor(0XFF412714, lightness: 0.3, chroma: 0.05, hue: 55),
    // oklch(15% 0.02 55)
    onSecondary: CandiColor(0XFF120904, lightness: 0.15, chroma: 0.02, hue: 55),
    // oklch(60% 0.1 145)
    success: CandiColor(0XFF58905A, lightness: 0.6, chroma: 0.1, hue: 145),
    // oklch(15% 0.02 145)
    onSuccess: CandiColor(0XFF060D06, lightness: 0.15, chroma: 0.02, hue: 145),
    // oklch(72% 0.13 70)
    warning: CandiColor(0XFFD8953D, lightness: 0.72, chroma: 0.13, hue: 70),
    // oklch(15% 0.02 70)
    onWarning: CandiColor(0XFF110A03, lightness: 0.15, chroma: 0.02, hue: 70),
    // oklch(65% 0.12 25)
    error: CandiColor(0XFFCE7069, lightness: 0.65, chroma: 0.12, hue: 25),
    // oklch(15% 0.02 25)
    onError: CandiColor(0XFF130807, lightness: 0.15, chroma: 0.02, hue: 25),
    // oklch(65% 0.1 240)
    info: CandiColor(0XFF5197C6, lightness: 0.65, chroma: 0.1, hue: 240),
    // oklch(15% 0.02 240)
    onInfo: CandiColor(0XFF040C13, lightness: 0.15, chroma: 0.02, hue: 240),
    // oklch(60% 0.08 230)
    link: CandiColor(0XFF4989A7, lightness: 0.6, chroma: 0.08, hue: 230),
    // oklch(45% 0.005 250)
    disabled: CandiColor(0XFF535558, lightness: 0.45, chroma: 0.005, hue: 250),
    // oklch(62% 0.08 230 / 0.5)
    focusRing: CandiColor(0X804F8FAD,
        lightness: 0.62, chroma: 0.08, hue: 230, opacity: 0.5),
    // oklch(0% 0 0 / 0.7)
    overlay:
        CandiColor(0XB3000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.7),
    // oklch(0% 0 0 / 0.6)
    scrim:
        CandiColor(0X99000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.6),
    // oklch(0% 0 0 / 0.4)
    shadowColor:
        CandiColor(0X66000000, lightness: 0, chroma: 0, hue: 0, opacity: 0.4),
    // oklch(92% 0.008 85)
    inverseSurface:
        CandiColor(0XFFE7E4DF, lightness: 0.92, chroma: 0.008, hue: 85),
    // oklch(25% 0.015 250)
    inverseText:
        CandiColor(0XFF1C2229, lightness: 0.25, chroma: 0.015, hue: 250),
    // oklch(100% 0 0 / 0.1)
    hover:
        CandiColor(0X1AFFFFFF, lightness: 1, chroma: 0, hue: 0, opacity: 0.1),
    // oklch(100% 0 0 / 0.2)
    active:
        CandiColor(0X33FFFFFF, lightness: 1, chroma: 0, hue: 0, opacity: 0.2),
  );
}
