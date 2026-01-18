/**
 * Candi Color Comparison Script
 *
 * Compares the new "Derived" palette against the old "Hand-Tuned" palette.
 * shows DeltaE or simple visual diffs for L/C/H.
 */

const oldPalette = require('../src/data/colors.js');
const { generatePalette } = require('./gen-oklch-primitives');
const { parseOklch } = require('./color-conv');
const logger = require('./logger');

const newPalette = generatePalette();

function formatDiff(oldVal, newVal) {
    const o = parseOklch(oldVal);
    const n = parseOklch(newVal);

    if (!o || !n) return 'Invalid';

    const dL = (n.l - o.l).toFixed(2);
    const dC = (n.c - o.c).toFixed(3);
    const dH = (n.h - o.h).toFixed(1);

    const L = `L: ${Math.round(o.l * 100)}% -> ${Math.round(n.l * 100)}% (${dL > 0 ? '+' : ''}${dL})`;
    const C = `C: ${o.c} -> ${n.c} (${dC > 0 ? '+' : ''}${dC})`;
    const H = `H: ${o.h} -> ${n.h}`;

    return `${L} | ${C} | ${H}`;
}

logger.log('=== DERIVATION COMPARISON ===\n');

['light', 'dark'].forEach(mode => {
    logger.log(`\n--- MODE: ${mode.toUpperCase()} ---`);
    logger.log(`Token`.padEnd(25) + `Old Value`.padEnd(25) + `New Value`.padEnd(25) + `Diff`);
    logger.log('-'.repeat(100));

    const oldMode = oldPalette[mode];
    const newMode = newPalette[mode];

    // Check only the tokens that exist in the new palette
    Object.keys(newMode).forEach(key => {
        const oldToken = oldMode[key];
        const newToken = newMode[key];

        if (!oldToken) {
            logger.log(`${key.padEnd(25)} [NEW TOKEN]              ${newToken.oklch}`);
            return;
        }

        if (oldToken.oklch === newToken.oklch) {
            logger.log(`${key.padEnd(25)} [MATCH]                  ${newToken.oklch}`);
        } else {
            logger.log(`${key.padEnd(25)} ${oldToken.oklch.padEnd(24)} ${newToken.oklch.padEnd(24)} ${formatDiff(oldToken.oklch, newToken.oklch)}`);
        }
    });
});

if (logger.isVerbose) {
    logger.log('\nComparison complete.');
} else {
    console.log('Derivation comparison complete.');
}
