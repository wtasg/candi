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

function generatePaletteFields() {
    return colorKeys.map(key => `    required this.${key},`).join('\n');
}

function generatePaletteMembers() {
    return colorKeys.map(key => `  final CandiColor ${key};`).join('\n');
}

function generatePalette(colors) {
    return colorKeys.map(key => {
        const color = colors[key];
        if (!color) return `    // ${key} missing in source`;
        return `    // ${color.oklch}\n    ${key}: CandiColor(${color.hex}, lightness: ${color.l}, chroma: ${color.c}, hue: ${color.h}${color.opacity !== 1 ? `, opacity: ${color.opacity}` : ''}),`;
    }).join('\n');
}

const dartTemplate = `/// Candi Color Palette for Flutter
///
/// Generated from OKLCH source of truth.
/// Total colors: ${colorKeys.length} per palette
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
  String toString() => 'CandiColor(oklch(\${(lightness * 100).toStringAsFixed(0)}% \$chroma \$hue))';
}

/// Semantic color palette for the Candi theme.
class CandiPalette {
  const CandiPalette._({
${generatePaletteFields()}
  });

${generatePaletteMembers()}
}

abstract final class CandiColors {
  /// Light mode palette
  static const light = CandiPalette._(
${generatePalette(lightColors)}
  );

  /// Dark mode palette
  static const dark = CandiPalette._(
${generatePalette(darkColors)}
  );
}
`;

fs.writeFileSync(dartColorsPath, dartTemplate);

console.log('Build complete!');
console.log(`  - Generated flutter/lib/candi_colors.dart (${colorKeys.length} colors per palette)`);
