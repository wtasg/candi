#!/usr/bin/env node
/**
 * Build script for KDE themes from Candi colors.
 *
 * Extracts OKLCH colors from src/css/base.css, converts to RGB,
 * and generates KDE color scheme files in kde/v4/ and kde/v5/.
 */

const fs = require('fs');
const path = require('path');

const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
const kdeDir = path.join(__dirname, '..', 'kde');
const v4Dir = path.join(kdeDir, 'v4');
const v5Dir = path.join(kdeDir, 'v5');

const { parseOklch, oklchToRgb } = require('./color-conv');

// 1. Read CSS
const css = fs.readFileSync(baseCssPath, 'utf8');

const lightColors = {};
const darkColors = {};

const rootMatch = css.match(/:root\s*{([^}]+)}/i);
const darkMatch = css.match(/\.dark\s*{([^}]+)}/i);

if (!rootMatch || !darkMatch) {
    console.error('Failed to find :root or .dark blocks in CSS');
    process.exit(1);
}

function extractColors(content, target) {
    let match;
    const regex = /--candi-([\w-]+):\s*(oklch\([^)]+\))/gi;
    while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        const data = parseOklch(match[2]);
        if (data) {
            target[key] = { r: data.r, g: data.g, b: data.b };
        }
    }
}

extractColors(rootMatch[1], lightColors);
extractColors(darkMatch[1], darkColors);

/**
 * Format RGB values for KDE color scheme (R,G,B)
 */
function formatRgb(color) {
    return `${color.r},${color.g},${color.b}`;
}

function generateKdeTheme(name, background, palette) {
    // KDE uses specific color roles for different UI elements
    const bgNormal = formatRgb(palette['bg']);
    const surface = formatRgb(palette['surface']);
    const elevated = formatRgb(palette['elevated']);
    const text = formatRgb(palette['text']);
    const textSubtle = formatRgb(palette['text-subtle']);
    const textMuted = formatRgb(palette['text-muted']);
    const border = formatRgb(palette['border']);
    const accent = formatRgb(palette['accent']);
    const accentSubtle = formatRgb(palette['accent-subtle']);
    const secondary = formatRgb(palette['secondary']);
    const success = formatRgb(palette['success']);
    const warning = formatRgb(palette['warning']);
    const error = formatRgb(palette['error']);
    const link = formatRgb(palette['link']);
    const disabled = formatRgb(palette['disabled']);

    return `[General]
ColorScheme=Candi ${name}
Name=Candi ${name}

[Colors:Window]
BackgroundNormal=${bgNormal}
BackgroundAlternate=${surface}
ForegroundNormal=${text}
ForegroundInactive=${textMuted}
ForegroundActive=${accent}
ForegroundLink=${link}
ForegroundVisited=${secondary}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[Colors:Button]
BackgroundNormal=${elevated}
BackgroundAlternate=${surface}
ForegroundNormal=${text}
ForegroundInactive=${textMuted}
ForegroundActive=${accent}
ForegroundLink=${link}
ForegroundVisited=${secondary}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[Colors:Selection]
BackgroundNormal=${accent}
BackgroundAlternate=${accentSubtle}
ForegroundNormal=${elevated}
ForegroundInactive=${textMuted}
ForegroundActive=${elevated}
ForegroundLink=${elevated}
ForegroundVisited=${surface}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[Colors:View]
BackgroundNormal=${elevated}
BackgroundAlternate=${surface}
ForegroundNormal=${text}
ForegroundInactive=${textMuted}
ForegroundActive=${accent}
ForegroundLink=${link}
ForegroundVisited=${secondary}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[Colors:Tooltip]
BackgroundNormal=${surface}
BackgroundAlternate=${bgNormal}
ForegroundNormal=${text}
ForegroundInactive=${textMuted}
ForegroundActive=${accent}
ForegroundLink=${link}
ForegroundVisited=${secondary}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[Colors:Complementary]
BackgroundNormal=${secondary}
BackgroundAlternate=${accentSubtle}
ForegroundNormal=${elevated}
ForegroundInactive=${textMuted}
ForegroundActive=${accent}
ForegroundLink=${link}
ForegroundVisited=${secondary}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[Colors:Header]
BackgroundNormal=${accent}
BackgroundAlternate=${accentSubtle}
ForegroundNormal=${elevated}
ForegroundInactive=${textMuted}
ForegroundActive=${elevated}
ForegroundLink=${elevated}
ForegroundVisited=${surface}
ForegroundNegative=${error}
ForegroundNeutral=${warning}
ForegroundPositive=${success}
DecorationFocus=${accent}
DecorationHover=${accentSubtle}

[WM]
activeBackground=${accent}
activeForeground=${elevated}
inactiveBackground=${surface}
inactiveForeground=${textMuted}
activeBlend=${accent}
inactiveBlend=${surface}
`;
}

// Ensure directories exist
if (!fs.existsSync(kdeDir)) fs.mkdirSync(kdeDir);
if (!fs.existsSync(v4Dir)) fs.mkdirSync(v4Dir);
if (!fs.existsSync(v5Dir)) fs.mkdirSync(v5Dir);

// 2. Generate Themes for both v4 and v5 (same format, different directories)
const lightTheme = generateKdeTheme('Light', 'light', lightColors);
const darkTheme = generateKdeTheme('Dark', 'dark', darkColors);

fs.writeFileSync(path.join(v4Dir, 'CandiLight.colors'), lightTheme);
fs.writeFileSync(path.join(v4Dir, 'CandiDark.colors'), darkTheme);
fs.writeFileSync(path.join(v5Dir, 'CandiLight.colors'), lightTheme);
fs.writeFileSync(path.join(v5Dir, 'CandiDark.colors'), darkTheme);

console.log('✓ Build complete!');
console.log('  - Generated kde/v4/CandiLight.colors');
console.log('  - Generated kde/v4/CandiDark.colors');
console.log('  - Generated kde/v5/CandiLight.colors');
console.log('  - Generated kde/v5/CandiDark.colors');
