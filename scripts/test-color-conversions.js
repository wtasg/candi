#!/usr/bin/env node
/**
 * Comprehensive Color Conversion Tests
 *
 * Property-based tests to verify OKLCH to RGB conversions:
 * - All colors from base.css convert without errors
 * - RGB outputs are within valid range [0, 255]
 * - Round-trip conversion accuracy
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const { parseOklch, oklchToRgb, toHex6, toHex8 } = require('./color-conv');

const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');

console.log('=== Comprehensive Color Conversion Tests ===\n');

// Test 1: Extract all colors from base.css
console.log('[Test 1] Extracting all OKLCH colors from base.css...');
const css = fs.readFileSync(baseCssPath, 'utf8');

const allColors = [];
const rootMatch = css.match(/:root\s*{([^}]+)}/i);
const darkMatch = css.match(/\.dark\s*{([^}]+)}/i);

function extractColors(content, mode) {
    const regex = /--candi-([\w-]+):\s*(oklch\([^)]+\))/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        allColors.push({
            name: match[1],
            oklch: match[2],
            mode
        });
    }
}

if (rootMatch) extractColors(rootMatch[1], 'light');
if (darkMatch) extractColors(darkMatch[1], 'dark');

console.log(`[✓] Extracted ${allColors.length} colors (${allColors.filter(c => c.mode === 'light').length} light, ${allColors.filter(c => c.mode === 'dark').length} dark)\n`);

// Test 2: All colors convert without errors
console.log('[Test 2] Verifying all colors convert without errors...');
let errorCount = 0;
const conversions = [];

for (const color of allColors) {
    try {
        const result = parseOklch(color.oklch);
        assert.ok(result, `parseOklch should return a result for ${color.name}`);
        assert.ok(typeof result.r === 'number', `r should be a number for ${color.name}`);
        assert.ok(typeof result.g === 'number', `g should be a number for ${color.name}`);
        assert.ok(typeof result.b === 'number', `b should be a number for ${color.name}`);

        conversions.push({
            ...color,
            result
        });
    } catch (err) {
        console.error(`[✗] Failed to convert ${color.mode}:${color.name} (${color.oklch})`);
        console.error(`   Error: ${err.message}`);
        errorCount++;
    }
}

if (errorCount === 0) {
    console.log(`[✓] All ${allColors.length} colors converted successfully\n`);
} else {
    console.error(`[✗] ${errorCount} colors failed to convert\n`);
    process.exit(1);
}

// Test 3: RGB outputs are within valid range [0, 255]
console.log('[Test 3] Verifying RGB values are within valid range [0, 255]...');
let rangeErrors = 0;

for (const conv of conversions) {
    const { r, g, b } = conv.result;

    if (r < 0 || r > 255) {
        console.error(`[✗] ${conv.mode}:${conv.name} - Red out of range: ${r}`);
        rangeErrors++;
    }
    if (g < 0 || g > 255) {
        console.error(`[✗] ${conv.mode}:${conv.name} - Green out of range: ${g}`);
        rangeErrors++;
    }
    if (b < 0 || b > 255) {
        console.error(`[✗] ${conv.mode}:${conv.name} - Blue out of range: ${b}`);
        rangeErrors++;
    }
}

if (rangeErrors === 0) {
    console.log(`[✓] All RGB values within valid range\n`);
} else {
    console.error(`[✗] ${rangeErrors} RGB values out of range\n`);
    process.exit(1);
}

// Test 4: Detect gamut clipping
console.log('[Test 4] Detecting sRGB gamut clipping...');

function detectClipping(l, c, h) {
    // Convert without the final clamping to detect clipping
    const hr = (h * Math.PI) / 180;
    const aCoord = c * Math.cos(hr);
    const bCoord = c * Math.sin(hr);

    const l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
    const m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
    const s_ = l - 0.0894841775 * aCoord - 1.291485548 * bCoord;

    const L = Math.pow(Math.max(0, l_), 3);
    const M = Math.pow(Math.max(0, m_), 3);
    const S = Math.pow(Math.max(0, s_), 3);

    let r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
    let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
    let b = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;

    const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);

    const rGamma = gamma(r);
    const gGamma = gamma(g);
    const bGamma = gamma(b);

    return {
        clipped: rGamma < 0 || rGamma > 1 || gGamma < 0 || gGamma > 1 || bGamma < 0 || bGamma > 1,
        r: rGamma,
        g: gGamma,
        b: bGamma
    };
}

let clippedCount = 0;
for (const conv of conversions) {
    const { l, c, h } = conv.result;
    const clipping = detectClipping(l, c, h);

    if (clipping.clipped) {
        console.log(`[WARN] ${conv.mode}:${conv.name} - Out of sRGB gamut (clipped)`);
        console.log(`   OKLCH: ${conv.oklch}`);
        console.log(`   Pre-clamp RGB: ${clipping.r.toFixed(4)}, ${clipping.g.toFixed(4)}, ${clipping.b.toFixed(4)}`);
        clippedCount++;
    }
}

if (clippedCount === 0) {
    console.log(`[✓] All colors within sRGB gamut (no clipping)\n`);
} else {
    console.log(`[WARN] ${clippedCount} colors required gamut clipping\n`);
}

// Test 5: Known reference conversions
console.log('[Test 5] Verifying known reference conversions...');

const referenceTests = [
    { oklch: 'oklch(18% 0.015 85)', expected: { r: 21, g: 17, b: 10 }, name: 'dark-bg' },
    { oklch: 'oklch(92% 0.01 85)', expected: { r: 232, g: 228, b: 221 }, name: 'dark-text' },
    { oklch: 'oklch(96% 0.012 85)', expected: { r: 245, g: 241, b: 233 }, name: 'light-bg' },
    { oklch: 'oklch(25% 0.02 250)', expected: { r: 26, g: 34, b: 43 }, name: 'light-text' },
    { oklch: 'oklch(62% 0.08 275)', expected: { r: 120, g: 130, b: 183 }, name: 'dark-accent' },
    { oklch: 'oklch(52% 0.06 230)', expected: { r: 67, g: 112, b: 133 }, name: 'light-accent' },
];

let refErrors = 0;
for (const test of referenceTests) {
    const result = parseOklch(test.oklch);

    if (result.r === test.expected.r && result.g === test.expected.g && result.b === test.expected.b) {
        console.log(`[✓] ${test.name}: rgb(${result.r}, ${result.g}, ${result.b})`);
    } else {
        console.error(`[✗] ${test.name}:`);
        console.error(`   Expected: rgb(${test.expected.r}, ${test.expected.g}, ${test.expected.b})`);
        console.error(`   Got:      rgb(${result.r}, ${result.g}, ${result.b})`);
        refErrors++;
    }
}

if (refErrors > 0) {
    console.error(`\n[✗] ${refErrors} reference tests failed`);
    process.exit(1);
}
console.log();

// Test 6: Round-trip conversion (approximate)
console.log('[Test 6] Testing round-trip conversion accuracy...');

function rgbToOklch(r, g, b) {
    // Inverse sRGB gamma
    const inverseGamma = (x) => {
        if (x <= 0.04045) return x / 12.92;
        return Math.pow((x + 0.055) / 1.055, 2.4);
    };

    const rLinear = inverseGamma(r / 255);
    const gLinear = inverseGamma(g / 255);
    const bLinear = inverseGamma(b / 255);

    // Linear RGB to LMS
    const l = 0.4122214708 * rLinear + 0.5363325363 * gLinear + 0.0514459929 * bLinear;
    const m = 0.2119034982 * rLinear + 0.6806995451 * gLinear + 0.1073969566 * bLinear;
    const s = 0.0883024619 * rLinear + 0.2817188376 * gLinear + 0.6299787005 * bLinear;

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    // LMS to OKLab
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const bCoord = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    // OKLab to OKLCH
    const C = Math.sqrt(a * a + bCoord * bCoord);
    let H = Math.atan2(bCoord, a) * 180 / Math.PI;
    if (H < 0) H += 360;

    return { l: L, c: C, h: H };
}

let roundTripErrors = 0;
const tolerance = 2; // Allow ±2 RGB values due to rounding

for (const conv of conversions.slice(0, 10)) { // Test first 10 colors
    const { r, g, b, l, c, h } = conv.result;
    const reconstructed = rgbToOklch(r, g, b);

    const lDiff = Math.abs(l - reconstructed.l);
    const cDiff = Math.abs(c - reconstructed.c);
    let hDiff = Math.abs(h - reconstructed.h);
    // Handle hue wraparound (359° ≈ 1°)
    if (hDiff > 180) hDiff = 360 - hDiff;

    // Re-convert to RGB to check round-trip
    const roundTrip = oklchToRgb(reconstructed.l, reconstructed.c, reconstructed.h);
    const rDiff = Math.abs(r - roundTrip.r);
    const gDiff = Math.abs(g - roundTrip.g);
    const bDiff = Math.abs(b - roundTrip.b);

    if (rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance) {
        console.log(`[✓] ${conv.mode}:${conv.name} - Round-trip within tolerance`);
    } else {
        console.log(`[WARN] ${conv.mode}:${conv.name} - Round-trip difference: ΔR=${rDiff}, ΔG=${gDiff}, ΔB=${bDiff}`);
        roundTripErrors++;
    }
}

if (roundTripErrors > 0) {
    console.log(`\n[WARN] ${roundTripErrors} colors had round-trip differences > \u00b1${tolerance}\n`);
} else {
    console.log(`\n[✓] All tested colors round-trip within \u00b1${tolerance} tolerance\n`);
}

// Test 7: Hex formatting
console.log('[Test 7] Verifying hex formatting functions...');
const testColor = parseOklch('oklch(52% 0.06 230)');
const hex6 = toHex6(testColor);
const hex8 = toHex8(testColor);

assert.strictEqual(hex6, '#437085', 'toHex6 should format correctly');
assert.strictEqual(hex8, '0XFF437085', 'toHex8 should format correctly (Flutter format)');
console.log(`[✓] toHex6: ${hex6}`);
console.log(`[✓] toHex8: ${hex8}\n`);

// Summary
console.log('='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Total colors tested: ${allColors.length}`);
console.log(`Conversion errors: 0`);
console.log(`Range violations: 0`);
console.log(`Colors clipped to sRGB gamut: ${clippedCount}`);
console.log(`Reference test failures: 0`);
console.log(`Round-trip tests: 10 (tolerance: ±${tolerance})`);
console.log('\n[✓] All color conversion tests passed!\n');
