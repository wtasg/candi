/// Gamut mapping logic for OKLCH.
import 'types.dart';
import 'color_conv.dart';

bool inGamut(RgbaColor rgb) {
  return rgb.r >= 0 &&
      rgb.r <= 255 &&
      rgb.g >= 0 &&
      rgb.g <= 255 &&
      rgb.b >= 0 &&
      rgb.b <= 255;
}

double fitToGamut(double l, double c, double h) {
  if (inGamut(oklchToRgb(l, c, h))) return c;

  double low = 0.0;
  double high = c;
  double bestC = 0.0;

  for (int i = 0; i < 10; i++) {
    final mid = (low + high) / 2.0;
    if (inGamut(oklchToRgb(l, mid, h))) {
      bestC = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  return bestC;
}
