/// Token structure validation and linting.
import 'types.dart';
import 'logger.dart';

bool validateTokens(Map<String, Map<String, ColorToken>> palette) {
  bool isValid = true;

  if (!palette.containsKey('light') || !palette.containsKey('dark')) {
    logger
        .error('Palette must contain both "light" and "dark" themes at root.');
    return false;
  }

  final lightParams = palette['light']!;
  final darkParams = palette['dark']!;

  final lightKeys = lightParams.keys.toSet();
  final darkKeys = darkParams.keys.toSet();

  final missingInDark = lightKeys.difference(darkKeys);
  final missingInLight = darkKeys.difference(lightKeys);

  if (missingInDark.isNotEmpty) {
    logger.error('Keys in light but missing in dark: \$missingInDark');
    isValid = false;
  }

  if (missingInLight.isNotEmpty) {
    logger.error('Keys in dark but missing in light: \$missingInLight');
    isValid = false;
  }

  for (final themeEntry in palette.entries) {
    final tokens = themeEntry.value;

    for (final tokenEntry in tokens.entries) {
      final key = tokenEntry.key;
      final token = tokenEntry.value;

      if (token.name != key) {
        logger
            .error('Token name mismatch: "\${token.name}" should be "\$key".');
        isValid = false;
      }

      if (token.usage.isEmpty) {
        logger.error('Token \$key missing usage description.');
        isValid = false;
      }

      if ((token.oklch == null && token.value == null) ||
          (token.oklch != null && token.value != null)) {
        logger
            .error('Token \$key must have EXACTLY ONE of "oklch" or "value".');
        isValid = false;
      }

      if (token.oklch != null) {
        final regex = RegExp(
            r'^oklch\(\d+(\.\d+)?%\s+\d+(\.\d+)?\s+\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?\)$');
        if (!regex.hasMatch(token.oklch!)) {
          logger
              .error('Token \$key has invalid OKLCH format: "\${token.oklch}"');
          isValid = false;
        }
      }
    }
  }

  return isValid;
}
