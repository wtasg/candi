/// Color derivation engine based on L and C deltas.
import 'types.dart';
import 'color_conv.dart';
import 'gamut.dart';

class DerivedColor {
  final String oklch;
  final double l;
  final double c;
  final double h;

  const DerivedColor({
    required this.oklch,
    required this.l,
    required this.c,
    required this.h,
  });
}

DerivedColor deriveColor(String oklchStr, DerivationRule rule) {
  final parsed = parseOklch(oklchStr);
  if (parsed == null) throw ArgumentError('Invalid OKLCH string: $oklchStr');

  final newL = (parsed.l + rule.dl).clamp(0.0, 1.0);
  final rawC = parsed.c * rule.dc;
  final newH = parsed.h;

  final newC = fitToGamut(newL, rawC, newH);

  final lPercent = (newL * 100).round();
  final cFormatted = newC
      .toStringAsFixed(4)
      .replaceAll(RegExp(r'0+$'), '')
      .replaceAll(RegExp(r'\.$'), '');
  final cFinal = cFormatted.isEmpty ? '0' : cFormatted;
  final hFormatted = newH
      .toStringAsFixed(2)
      .replaceAll(RegExp(r'0+$'), '')
      .replaceAll(RegExp(r'\.$'), '');
  final hFinal = hFormatted.isEmpty ? '0' : hFormatted;

  return DerivedColor(
    oklch: 'oklch($lPercent% $cFinal $hFinal)',
    l: newL,
    c: newC,
    h: newH,
  );
}
