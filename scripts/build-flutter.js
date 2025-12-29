const fs = require('fs');
const path = require('path');
const palette = require('../src/data/colors');

const dartColorsPath = path.join(__dirname, '..', 'flutter', 'lib', 'candi_colors.dart');

const { toHex8, parseOklch } = require('./color-conv');

function getColors(mode) {
    const colors = {};
    for (const [key, data] of Object.entries(palette[mode])) {
        const value = data.oklch || data.value;
        const parsed = parseOklch(value);
        if (parsed) {
            colors[key] = {
                hex: toHex8(parsed),
                l: parsed.l,
                c: parsed.c,
                h: parsed.h,
                opacity: parsed.opacity,
                oklch: value
            };
        }
    }
    return colors;
}

const lightColors = getColors('light');
const darkColors = getColors('dark');

// All color keys for Flutter (excludes shadow CSS values, includes all OKLCH colors)
const colorKeys = [
    // Backgrounds
    'bg', 'surface', 'elevated',
    // Text
    'text', 'textSubtle', 'textMuted',
    // Borders
    'border', 'borderStrong', 'divider',
    // Primary
    'accent', 'accentSubtle', 'onAccent',
    // Secondary
    'secondary', 'secondarySubtle', 'onSecondary',
    // Status
    'success', 'onSuccess',
    'warning', 'onWarning',
    'error', 'onError',
    'info', 'onInfo',
    // Interactive
    'link', 'disabled', 'focusRing',
    // Overlays
    'overlay', 'scrim', 'shadowColor',
    // Inverse
    'inverseSurface', 'inverseText',
    // UI States
    'hover', 'active',
];

// Semantic documentation for each color
const colorDocs = {
    bg: 'Page background color.',
    surface: 'Card and section background color.',
    elevated: 'Elevated surface (modals, popups) background color.',
    text: 'Primary text color.',
    textSubtle: 'Secondary/subdued text color.',
    textMuted: 'Tertiary/muted text color for less important content.',
    border: 'Default border color.',
    borderStrong: 'Emphasized border color.',
    divider: 'Divider/separator line color.',
    accent: 'Primary accent color for buttons and interactive elements.',
    accentSubtle: 'Subtle accent for hover states and backgrounds.',
    onAccent: 'Text color on accent backgrounds.',
    secondary: 'Secondary action color (terracotta).',
    secondarySubtle: 'Subtle secondary for backgrounds.',
    onSecondary: 'Text color on secondary backgrounds.',
    success: 'Success state color (green).',
    onSuccess: 'Text color on success backgrounds.',
    warning: 'Warning state color (amber).',
    onWarning: 'Text color on warning backgrounds.',
    error: 'Error state color (coral red).',
    onError: 'Text color on error backgrounds.',
    info: 'Informational state color (blue).',
    onInfo: 'Text color on info backgrounds.',
    link: 'Hyperlink color.',
    disabled: 'Disabled element color.',
    focusRing: 'Focus ring/outline color with opacity.',
    overlay: 'Overlay color for modals (semi-transparent).',
    scrim: 'Scrim color for dimming backgrounds.',
    shadowColor: 'Shadow color with transparency.',
    inverseSurface: 'Inverse surface for contrast elements.',
    inverseText: 'Text color on inverse surfaces.',
    hover: 'Hover state overlay color.',
    active: 'Active/pressed state overlay color.',
};

function generatePaletteFields() {
    return colorKeys.map(key => `    required this.${key},`).join('\n');
}

function generatePaletteMembers() {
    return colorKeys.map(key => {
        const doc = colorDocs[key] || `The ${key} color.`;
        return `  /// ${doc}\n  final CandiColor ${key};`;
    }).join('\n\n');
}

function generatePalette(colors) {
    return colorKeys.map(key => {
        const color = colors[key];
        if (!color) return `    // ${key} missing in source`;

        // Build the constructor call (use candiOpacity to avoid conflict with Color.opacity)
        const params = `lightness: ${color.l}, chroma: ${color.c}, hue: ${color.h}${color.opacity !== 1 ? `, candiOpacity: ${color.opacity}` : ''}`;
        const singleLine = `${key}: CandiColor(${color.hex}, ${params}),`;

        // If line is too long (>80 chars), split it to match dart format (uses 2-space indent)
        if (singleLine.length > 76) { // 76 to account for 4-space indent
            const paramLines = params.split(', ').map(p => `      ${p},`).join('\n');
            return `    // ${color.oklch}\n    ${key}: CandiColor(\n      ${color.hex},\n${paramLines}\n    ),`;
        }

        return `    // ${color.oklch}\n    ${singleLine}`;
    }).join('\n');
}

const dartTemplate = `/// Candi Color Palette for Flutter
///
/// A Scandinavian-inspired color palette based on Nordic design principles:
/// Hygge (warmth) and Lagom (balance).
///
/// ## Quick Start
///
/// \`\`\`dart
/// import 'package:candi_colors/candi.dart';
///
/// // Access colors directly
/// Container(color: CandiColors.light.surface);
///
/// // Use convenience aliases
/// Text('Hello', style: TextStyle(color: CandiColors.dark.muted));
///
/// // Create a ThemeData
/// MaterialApp(theme: CandiColors.light.toThemeData());
/// \`\`\`
///
/// Generated from OKLCH source of truth.
/// Total colors: ${colorKeys.length} per palette
library;

import 'package:flutter/material.dart';

/// A [Color] implementation that retains OKLCH metadata.
///
/// OKLCH is a perceptually uniform color space that provides better
/// color manipulation and contrast calculations than traditional RGB.
///
/// ## Properties
///
/// - [lightness]: Perceived lightness (0.0 = black, 1.0 = white)
/// - [chroma]: Color intensity (0.0 = gray, higher = more saturated)
/// - [hue]: Color angle in degrees (0-360)
/// - [opacity]: Alpha channel (0.0 = transparent, 1.0 = opaque)
///
/// ## Example
///
/// \`\`\`dart
/// final accent = CandiColors.light.accent;
/// print(accent.lightness); // 0.52
/// print(accent.chroma);    // 0.06
/// print(accent.hue);       // 230.0
/// \`\`\`
class CandiColor extends Color {
  /// Perceived lightness in OKLCH (0.0-1.0).
  final double lightness;

  /// Color intensity/saturation in OKLCH.
  final double chroma;

  /// Hue angle in degrees (0-360).
  final double hue;

  /// Opacity/alpha value (0.0-1.0).
  final double candiOpacity;

  /// Creates a [CandiColor] with OKLCH metadata.
  const CandiColor(
    int value, {
    required this.lightness,
    required this.chroma,
    required this.hue,
    this.candiOpacity = 1.0,
  }) : super(value);

  @override
  String toString() =>
      'CandiColor(oklch(\${(lightness * 100).toStringAsFixed(0)}% \$chroma \$hue))';
}

/// Semantic color palette for the Candi theme.
///
/// Provides a complete set of colors for building UIs with consistent
/// visual hierarchy and accessibility.
///
/// ## Color Categories
///
/// - **Backgrounds**: [bg], [surface], [elevated]
/// - **Text**: [text], [textSubtle], [textMuted]
/// - **Borders**: [border], [borderStrong], [divider]
/// - **Accent**: [accent], [accentSubtle], [onAccent]
/// - **Secondary**: [secondary], [secondarySubtle], [onSecondary]
/// - **Status**: [success], [warning], [error], [info] (with \`on*\` variants)
/// - **Interactive**: [link], [disabled], [focusRing], [hover], [active]
/// - **Overlays**: [overlay], [scrim], [shadowColor]
/// - **Inverse**: [inverseSurface], [inverseText]
///
/// ## Convenience Aliases
///
/// Common naming patterns from other design systems:
/// - [muted] → [textMuted]
/// - [subtle] → [textSubtle]
/// - [primary] → [accent]
/// - [onPrimary] → [onAccent]
class CandiPalette {
  const CandiPalette._({
${generatePaletteFields()}
  });

${generatePaletteMembers()}

  // ─────────────────────────────────────────────────────────────────────────
  // Convenience Aliases
  // ─────────────────────────────────────────────────────────────────────────

  /// Alias for [textMuted]. Common in design systems.
  CandiColor get muted => textMuted;

  /// Alias for [textSubtle]. Common in design systems.
  CandiColor get subtle => textSubtle;

  /// Alias for [accent]. Maps to Material's primary concept.
  CandiColor get primary => accent;

  /// Alias for [accentSubtle]. Subtle primary variant.
  CandiColor get primarySubtle => accentSubtle;

  /// Alias for [onAccent]. Text on primary backgrounds.
  CandiColor get onPrimary => onAccent;

  /// Alias for [bg]. Alternative naming convention.
  CandiColor get background => bg;

  // ─────────────────────────────────────────────────────────────────────────
  // Flutter Integration
  // ─────────────────────────────────────────────────────────────────────────

  /// Creates a [ColorScheme] from this palette.
  ///
  /// Maps Candi semantic colors to Material 3 color roles.
  ///
  /// ## Example
  ///
  /// \`\`\`dart
  /// final scheme = CandiColors.light.toColorScheme();
  /// ThemeData(colorScheme: scheme);
  /// \`\`\`
  ColorScheme toColorScheme({Brightness? brightness}) {
    final isDark = bg.lightness < 0.5;
    return ColorScheme(
      brightness: brightness ?? (isDark ? Brightness.dark : Brightness.light),
      primary: accent,
      onPrimary: onAccent,
      primaryContainer: accentSubtle,
      onPrimaryContainer: text,
      secondary: secondary,
      onSecondary: onSecondary,
      secondaryContainer: secondarySubtle,
      onSecondaryContainer: text,
      tertiary: info,
      onTertiary: onInfo,
      tertiaryContainer: info,
      onTertiaryContainer: onInfo,
      error: error,
      onError: onError,
      errorContainer: error,
      onErrorContainer: onError,
      surface: surface,
      onSurface: text,
      onSurfaceVariant: textSubtle,
      outline: border,
      outlineVariant: borderStrong,
      shadow: shadowColor,
      scrim: scrim,
      inverseSurface: inverseSurface,
      onInverseSurface: inverseText,
      inversePrimary: accent,
      surfaceTint: accent,
    );
  }

  /// Creates a complete [ThemeData] from this palette.
  ///
  /// Provides a ready-to-use Material 3 theme with Candi colors.
  ///
  /// ## Example
  ///
  /// \`\`\`dart
  /// MaterialApp(
  ///   theme: CandiColors.light.toThemeData(),
  ///   darkTheme: CandiColors.dark.toThemeData(),
  /// );
  /// \`\`\`
  ///
  /// ## Parameters
  ///
  /// - [useMaterial3]: Use Material 3 design (default: true)
  ThemeData toThemeData({
    bool useMaterial3 = true,
  }) {
    final colorScheme = toColorScheme();
    return ThemeData(
      useMaterial3: useMaterial3,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: bg,
      canvasColor: surface,
      cardColor: surface,
      dividerColor: divider,
      disabledColor: disabled,
      hoverColor: hover,
      focusColor: focusRing,
      highlightColor: active,
      splashColor: active,
      shadowColor: shadowColor,
      appBarTheme: AppBarTheme(
        backgroundColor: surface,
        foregroundColor: text,
        elevation: 0,
        surfaceTintColor: Colors.transparent,
      ),
      cardTheme: CardThemeData(
        color: surface,
        elevation: 1,
        shadowColor: shadowColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: accent,
          foregroundColor: onAccent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: accent,
          side: BorderSide(color: border),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: accent,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surface,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: accent, width: 2),
        ),
      ),
      dividerTheme: DividerThemeData(
        color: divider,
        thickness: 1,
      ),
      iconTheme: IconThemeData(
        color: textSubtle,
      ),
      textTheme: TextTheme(
        displayLarge: TextStyle(color: text),
        displayMedium: TextStyle(color: text),
        displaySmall: TextStyle(color: text),
        headlineLarge: TextStyle(color: text),
        headlineMedium: TextStyle(color: text),
        headlineSmall: TextStyle(color: text),
        titleLarge: TextStyle(color: text),
        titleMedium: TextStyle(color: text),
        titleSmall: TextStyle(color: text),
        bodyLarge: TextStyle(color: text),
        bodyMedium: TextStyle(color: text),
        bodySmall: TextStyle(color: textSubtle),
        labelLarge: TextStyle(color: text),
        labelMedium: TextStyle(color: textSubtle),
        labelSmall: TextStyle(color: textMuted),
      ),
    );
  }
}

/// Static access to light and dark Candi palettes.
///
/// ## Usage
///
/// \`\`\`dart
/// // Direct color access
/// Container(color: CandiColors.light.surface);
/// Text('Hello', style: TextStyle(color: CandiColors.dark.text));
///
/// // With theme
/// MaterialApp(
///   theme: CandiColors.light.toThemeData(),
///   darkTheme: CandiColors.dark.toThemeData(),
/// );
/// \`\`\`
abstract final class CandiColors {
  /// Light mode palette with warm, Nordic-inspired colors.
  ///
  /// Optimized for readability with WCAG AA contrast ratios.
  static const light = CandiPalette._(
${generatePalette(lightColors)}
  );

  /// Dark mode palette with cool, muted tones.
  ///
  /// Maintains visual consistency with the light theme while
  /// reducing eye strain in low-light environments.
  static const dark = CandiPalette._(
${generatePalette(darkColors)}
  );
}
`;

fs.writeFileSync(dartColorsPath, dartTemplate);

console.log('Build complete!');
console.log(`  - Generated flutter/lib/candi_colors.dart (${colorKeys.length} colors per palette)`);
console.log('  - Added comprehensive dartdoc comments');
console.log('  - Added convenience aliases (muted, subtle, primary, etc.)');
console.log('  - Added toColorScheme() and toThemeData() factory methods');

