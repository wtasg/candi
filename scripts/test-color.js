/**
 * Color Conversion Test Suite
 *
 * Verifies OKLCH to sRGB conversion against known values from OKLCH.com/Chrome/Safari.
 * Also validates WCAG contrast ratios for accessibility.
 */

const { oklchToRgb, toHex6: toHex, parseOklch } = require('./color-conv');
const fs = require('fs');
const path = require('path');

const testCases = [
    { name: 'Accent (Steel Blue)', l: 0.52, c: 0.06, h: 230, expected: '#437085' },
    { name: 'Background (Warm White)', l: 0.98, c: 0.008, h: 85, expected: '#FBF8F2' },
    { name: 'Text (Warm Charcoal)', l: 0.28, c: 0.015, h: 250, expected: '#232A30' },
    { name: 'Secondary (Terracotta)', l: 0.58, c: 0.12, h: 55, expected: '#B0652A' },
    { name: 'Success (Sage)', l: 0.52, c: 0.08, h: 145, expected: '#4A754C' },
    { name: 'Pure White', l: 1.0, c: 0, h: 0, expected: '#FFFFFF' },
    { name: 'Dark Mode Bg', l: 0.18, c: 0.015, h: 250, expected: '#0D1218' }
];

console.log('--- OKLCH to sRGB Hex Tests ---');
let passed = 0;

testCases.forEach(tc => {
    const result = toHex(oklchToRgb(tc.l, tc.c, tc.h));
    const status = result === tc.expected ? '✅' : '❌';
    if (result === tc.expected) passed++;
    console.log(`${status} ${tc.name}: expected ${tc.expected}, got ${result}`);
});

console.log(`\nResult: ${passed}/${testCases.length} tests passed.`);

if (passed === testCases.length) {
    console.log('✓ All color conversions align with browser standards.');
} else {
    console.error('! Conversion discrepancy detected.');
    process.exit(1);
}

// WCAG Contrast Ratio Tests
console.log('\n--- WCAG Contrast Ratio Tests ---');

/**
 * Calculate relative luminance for WCAG contrast
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number} Relative luminance (0-1)
 */
function getRelativeLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param {object} rgb1 - First color {r, g, b}
 * @param {object} rgb2 - Second color {r, g, b}
 * @returns {number} Contrast ratio (1-21)
 */
function getContrastRatio(rgb1, rgb2) {
    const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

// Read colors from base.css
const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
const css = fs.readFileSync(baseCssPath, 'utf8');

const lightColors = {};
const darkColors = {};

const rootMatch = css.match(/:root\s*{([^}]+)}/i);
const darkMatch = css.match(/\.dark\s*{([^}]+)}/i);

function extractColors(content, target) {
    let match;
    const regex = /--candi-([\w-]+):\s*(oklch\([^)]+\))/gi;
    while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        const data = parseOklch(match[2]);
        if (data) target[key] = data;
    }
}

extractColors(rootMatch[1], lightColors);
extractColors(darkMatch[1], darkColors);

const contrastTests = [
    { mode: 'light', name: 'text on bg', fg: 'text', bg: 'bg', minRatio: 4.5 },
    { mode: 'light', name: 'subtle on bg', fg: 'text-subtle', bg: 'bg', minRatio: 4.5 },
    { mode: 'light', name: 'accent on bg', fg: 'accent', bg: 'bg', minRatio: 3.0 },
    { mode: 'light', name: 'success on bg', fg: 'success', bg: 'bg', minRatio: 3.0 },
    { mode: 'light', name: 'error on bg', fg: 'error', bg: 'bg', minRatio: 3.0 },
    { mode: 'dark', name: 'text on bg', fg: 'text', bg: 'bg', minRatio: 4.5 },
    { mode: 'dark', name: 'subtle on bg', fg: 'text-subtle', bg: 'bg', minRatio: 4.5 },
    { mode: 'dark', name: 'accent on bg', fg: 'accent', bg: 'bg', minRatio: 3.0 },
    { mode: 'dark', name: 'success on bg', fg: 'success', bg: 'bg', minRatio: 3.0 },
    { mode: 'dark', name: 'error on bg', fg: 'error', bg: 'bg', minRatio: 3.0 },
];

let contrastPassed = 0;
let wcagIssues = [];

contrastTests.forEach(tc => {
    const colors = tc.mode === 'light' ? lightColors : darkColors;
    const fgColor = colors[tc.fg];
    const bgColor = colors[tc.bg];
    
    if (!fgColor || !bgColor) {
        console.log(`⚠️  ${tc.mode} mode: ${tc.name} - Missing color(s)`);
        return;
    }
    
    const ratio = getContrastRatio(fgColor, bgColor);
    const passes = ratio >= tc.minRatio;
    const status = passes ? '✅' : '❌';
    
    if (passes) {
        contrastPassed++;
    } else {
        wcagIssues.push(`${tc.mode} mode: ${tc.name} (${ratio.toFixed(2)}:1 < ${tc.minRatio}:1)`);
    }
    
    console.log(`${status} ${tc.mode} mode: ${tc.name} - ${ratio.toFixed(2)}:1 (min: ${tc.minRatio}:1)`);
});

console.log(`\nResult: ${contrastPassed}/${contrastTests.length} contrast tests passed.`);

if (wcagIssues.length > 0) {
    console.log('\n⚠️  WCAG Contrast Issues Found:');
    wcagIssues.forEach(issue => console.log(`  - ${issue}`));
    console.log('\nNote: Some contrast issues may be acceptable for non-text elements.');
} else {
    console.log('✓ All contrast ratios meet WCAG standards.');
}
