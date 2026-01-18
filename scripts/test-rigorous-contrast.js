const { oklchToRgb, toHex6: toHex, parseOklch } = require('./color-conv');
const fs = require('fs');
const path = require('path');
const palette = require('../src/data/colors');
const logger = require('./logger');

function getRelativeLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
    const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

function checkContrast(mode, fgKey, bgKey, minRatio = 4.5) {
    const colors = palette[mode];
    const fgData = colors[fgKey];
    const bgData = colors[bgKey];

    if (!fgData || !bgData) return null;

    const fgColor = parseOklch(fgData.oklch || fgData.value);
    const bgColor = parseOklch(bgData.oklch || bgData.value);

    const ratio = getContrastRatio(fgColor, bgColor);
    const passes = ratio >= minRatio;

    return { mode, fgKey, bgKey, ratio, passes, minRatio };
}

const tests = [
    // Core Backgrounds
    { fg: 'text', bg: 'bg', min: 4.5 },
    { fg: 'textSubtle', bg: 'bg', min: 4.5 },
    { fg: 'textMuted', bg: 'bg', min: 4.5 },
    { fg: 'text', bg: 'surface', min: 4.5 },
    { fg: 'textSubtle', bg: 'surface', min: 4.5 },

    // Semantics
    { fg: 'onAccent', bg: 'accent', min: 4.5 },
    { fg: 'onSecondary', bg: 'secondary', min: 4.5 },
    { fg: 'onSuccess', bg: 'success', min: 4.5 },
    { fg: 'onWarning', bg: 'warning', min: 4.5 },
    { fg: 'onError', bg: 'error', min: 4.5 },
    { fg: 'onInfo', bg: 'info', min: 4.5 },

    // Primitives
    { fg: 'onRed', bg: 'red', min: 4.5 },
    { fg: 'onBlue', bg: 'blue', min: 4.5 },
    { fg: 'onGreen', bg: 'green', min: 4.5 },
    { fg: 'onYellow', bg: 'yellow', min: 4.5 },

    // Borders (UI elements min 3:1)
    { fg: 'border', bg: 'bg', min: 1.5 }, // Borders can be subtle
    { fg: 'borderStrong', bg: 'bg', min: 2.0 },
];

logger.log('--- Rigorous Contrast Audit ---');
let allPassed = true;

['light', 'dark'].forEach(mode => {
    logger.log(`\nMode: ${mode.toUpperCase()}`);
    tests.forEach(t => {
        const result = checkContrast(mode, t.fg, t.bg, t.min);
        if (result) {
            const status = result.passes ? '[✓]' : '[✗]';
            if (!result.passes) allPassed = false;
            logger.log(`${status} ${result.fgKey.padEnd(15)} on ${result.bgKey.padEnd(10)}: ${result.ratio.toFixed(2)}:1 (min: ${result.minRatio}:1)`);
        }
    });
});

if (!allPassed) {
    logger.dump();
    logger.error('\n[!] Contrast issues detected! Please refine the palette.');
    process.exit(1);
} else {
    if (logger.isVerbose) logger.log('\n[✓] All rigorous contrast tests passed!');
    console.log('Rigorous contrast tests passed.');
}
