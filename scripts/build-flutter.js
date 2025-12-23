#!/usr/bin/env node
/**
 * Build script for Flutter theme from CSS variables.
 *
 * Extracts OKLCH color tokens from src/css/base.css,
 * converts them to RGB, and generates flutter/lib/candi_colors.dart.
 */

const fs = require('fs');
const path = require('path');

const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
const dartColorsPath = path.join(__dirname, '..', 'flutter', 'lib', 'candi_colors.dart');

const { toHex8, parseOklch } = require('./color-conv');

// 1. Read CSS
const css = fs.readFileSync(baseCssPath, 'utf8');

const lightColors = {};
const darkColors = {};

const varRegex = /--candi-([\w-]+):\s*(oklch\([^)]+\))/gi;

const rootMatch = css.match(/:root\s*{([^}]+)}/i);
const darkMatch = css.match(/\.dark\s*{([^}]+)}/i);

if (!rootMatch || !darkMatch) {
  console.error('Failed to find :root or .dark blocks in CSS');
  process.exit(1);
}

const rootContent = rootMatch[1];
const darkContent = darkMatch[1];

function extractColors(content, target) {
  let match;
  while ((match = varRegex.exec(content)) !== null) {
    const key = match[1].replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const data = parseOklch(match[2]);
    if (data) {
      target[key] = {
        hex: toHex8(data),
        l: data.l,
        c: data.c,
        h: data.h,
        opacity: data.opacity,
        oklch: match[2]
      };
    }
  }
}

extractColors(rootContent, lightColors);
extractColors(darkContent, darkColors);

// Define keys to ensure consistent order
const colorKeys = [
  'bg', 'surface', 'elevated', 'text', 'textSubtle', 'textMuted',
  'border', 'borderStrong', 'accent', 'accentSubtle', 'secondary',
  'secondarySubtle', 'success', 'warning', 'error', 'focusRing'
];

function generatePalette(colors) {
  return colorKeys.map(key => {
    const color = colors[key];
    if (!color) return `    // ${key} missing in CSS`;
    return `    // ${color.oklch}\n    ${key}: CandiColor(${color.hex}, lightness: ${color.l}, chroma: ${color.c}, hue: ${color.h}${color.opacity !== 1 ? `, opacity: ${color.opacity}` : ''}),`;
  }).join('\n');
}

const dartTemplate = `/// Candi Color Palette for Flutter
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
  String toString() => 'CandiColor(oklch(\${(lightness * 100).toStringAsFixed(0)}% \$chroma \$hue))';
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
${generatePalette(lightColors)}
  );

  /// Dark mode palette
  static const dark = CandiPalette._(
${generatePalette(darkColors)}
  );
}
`;

fs.writeFileSync(dartColorsPath, dartTemplate);

console.log('✓ Build complete!');
console.log('  - Generated flutter/lib/candi_colors.dart');
