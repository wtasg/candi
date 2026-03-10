/// Candi palette generation pipeline.
import 'types.dart';
import 'derive.dart';
import 'contrast.dart';

const Map<String, String> LIGHT_ANCHORS = {
  'accent': 'oklch(50% 0.13 245)',
  'secondary': 'oklch(55% 0.12 20)',
  'success': 'oklch(50% 0.10 150)',
  'warning': 'oklch(60% 0.13 80)',
  'error': 'oklch(50% 0.14 25)',
  'info': 'oklch(50% 0.10 225)',
};

const Map<String, String> DARK_ANCHORS = {
  'accent': 'oklch(72% 0.12 245)',
  'secondary': 'oklch(75% 0.11 20)',
  'success': 'oklch(78% 0.10 150)',
  'warning': 'oklch(82% 0.12 80)',
  'error': 'oklch(78% 0.12 25)',
  'info': 'oklch(78% 0.10 225)',
};

const Map<String, DerivationRule> LIGHT_VARIANTS = {
  'subtle': DerivationRule(dl: 0.33, dc: 0.60),
  'soft': DerivationRule(dl: 0.10, dc: 0.80),
  'warm': DerivationRule(dl: 0.15, dc: 0.85),
  'base': DerivationRule(dl: 0.0, dc: 1.00),
  'hot': DerivationRule(dl: -0.05, dc: 1.15),
  'strong': DerivationRule(dl: -0.10, dc: 1.10),
  'outline': DerivationRule(dl: -0.15, dc: 0.70),
};

const Map<String, DerivationRule> DARK_VARIANTS = {
  'subtle': DerivationRule(dl: -0.27, dc: 0.60),
  'soft': DerivationRule(dl: 0.10, dc: 0.80),
  'warm': DerivationRule(dl: -0.15, dc: 0.85),
  'base': DerivationRule(dl: 0.0, dc: 1.00),
  'hot': DerivationRule(dl: -0.05, dc: 1.15),
  'strong': DerivationRule(dl: -0.10, dc: 1.10),
  'outline': DerivationRule(dl: -0.15, dc: 0.70),
};

String _capitalize(String s) =>
    s.isEmpty ? '' : '${s[0].toUpperCase()}${s.substring(1)}';

Map<String, Map<String, ColorToken>> generatePalette() {
  final result = <String, Map<String, ColorToken>>{'light': {}, 'dark': {}};

  for (final mode in ['light', 'dark']) {
    final anchors = mode == 'light' ? LIGHT_ANCHORS : DARK_ANCHORS;
    final variants = mode == 'light' ? LIGHT_VARIANTS : DARK_VARIANTS;
    final palette = result[mode]!;

    for (final entry in anchors.entries) {
      final name = entry.key;
      final baseStr = entry.value;

      palette[name] = ColorToken(
        name: name,
        usage: 'Base $name color',
        oklch: baseStr,
      );

      for (final variantEntry in variants.entries) {
        final variantName = variantEntry.key;
        if (variantName == 'base') continue;

        final rule = variantEntry.value;
        final derived = deriveColor(baseStr, rule);
        final tokenName = '$name${_capitalize(variantName)}';

        palette[tokenName] = ColorToken(
          name: tokenName,
          usage: '${_capitalize(variantName)} variant of $name',
          oklch: derived.oklch,
        );
      }

      final onColor = deriveOnColor(baseStr);
      final onTokenName = 'on${_capitalize(name)}';
      palette[onTokenName] = ColorToken(
        name: onTokenName,
        usage: 'Text or icons on top of $name backgrounds',
        oklch: onColor.oklch,
      );
    }
  }

  return result;
}
