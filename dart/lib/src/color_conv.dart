/// OKLCH to RGB conversion and utilities.
import 'dart:math' as math;
import 'types.dart';

RgbaColor oklchToRgb(double l, double c, double h, [double a = 1.0]) {
  final hr = h * math.pi / 180.0;
  final aCoord = c * math.cos(hr);
  final bCoord = c * math.sin(hr);

  final l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
  final m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
  final s_ = l - 0.0894841775 * aCoord - 1.2914855480 * bCoord;

  // Signed cubing
  final l3 = l_ * l_ * l_;
  final m3 = m_ * m_ * m_;
  final s3 = s_ * s_ * s_;

  final rLin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  final gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  final bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  double toSrgb(double x) {
    if (x <= 0.0) return 0.0;
    if (x >= 1.0) return 1.0;
    return x <= 0.0031308 ? 12.92 * x : 1.055 * math.pow(x, 1 / 2.4) - 0.055;
  }

  return RgbaColor(
    r: (toSrgb(rLin) * 255.0).round().clamp(0, 255),
    g: (toSrgb(gLin) * 255.0).round().clamp(0, 255),
    b: (toSrgb(bLin) * 255.0).round().clamp(0, 255),
    a: a,
  );
}

String toHex6(RgbaColor rgba) {
  final r = rgba.r.toRadixString(16).padLeft(2, '0');
  final g = rgba.g.toRadixString(16).padLeft(2, '0');
  final b = rgba.b.toRadixString(16).padLeft(2, '0');
  return '#${(r + g + b).toUpperCase()}';
}

String toHex8(RgbaColor rgba) {
  final a =
      (rgba.a * 255.0).round().clamp(0, 255).toRadixString(16).padLeft(2, '0');
  final r = rgba.r.toRadixString(16).padLeft(2, '0');
  final g = rgba.g.toRadixString(16).padLeft(2, '0');
  final b = rgba.b.toRadixString(16).padLeft(2, '0');
  return '0x${(a + r + g + b).toUpperCase()}';
}

OklchParsed? parseOklch(String str) {
  final regex = RegExp(
      r'oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)',
      caseSensitive: false);
  final match = regex.firstMatch(str);
  if (match == null) return null;

  final lStr = match.group(1)!;
  final isPercent = str.substring(match.start, match.end).contains('%');
  double l = double.parse(lStr);
  if (isPercent) l /= 100.0;

  final c = double.parse(match.group(2)!);
  final h = double.parse(match.group(3)!);
  final opacityStr = match.group(4);
  final opacity = opacityStr != null ? double.parse(opacityStr) : 1.0;

  final rgb = oklchToRgb(l, c, h, opacity);

  return OklchParsed(
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    a: opacity,
    l: l,
    c: c,
    h: h,
    opacity: opacity,
  );
}
