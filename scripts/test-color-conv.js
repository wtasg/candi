/**
 * =============================================================================
 * Color Conversion Unit Tests
 * Tests for color-conv.js functions
 * =============================================================================
 */

const { parseOklch, toHex6, oklchToRgb } = require('./color-conv');

let errors = 0;
let passed = 0;

function pass(msg) { console.log(`[✓] ${msg}`); passed++; }
function fail(msg) { console.error(`[✗] ${msg}`); errors++; }

function assertEqual(actual, expected, msg) {
    if (actual === expected) {
        pass(msg);
    } else {
        fail(`${msg}: expected ${expected}, got ${actual}`);
    }
}

function assertClose(actual, expected, tolerance, msg) {
    if (Math.abs(actual - expected) <= tolerance) {
        pass(msg);
    } else {
        fail(`${msg}: expected ~${expected}, got ${actual}`);
    }
}

function assertNotNull(value, msg) {
    if (value !== null && value !== undefined) {
        pass(msg);
    } else {
        fail(`${msg}: got null/undefined`);
    }
}

function assertNull(value, msg) {
    if (value === null || value === undefined) {
        pass(msg);
    } else {
        fail(`${msg}: expected null, got ${JSON.stringify(value)}`);
    }
}

// =============================================================================
// parseOklch Tests
// =============================================================================

console.log('\n--- parseOklch() Tests ---\n');

// Basic parsing - NOTE: parseOklch expects L as 0-100 scale (percentage)
const basic = parseOklch('oklch(50 0.15 30)');
assertNotNull(basic, 'parseOklch parses basic OKLCH string');
if (basic) {
    assertClose(basic.l, 0.5, 0.01, 'parseOklch extracts L correctly (50 -> 0.5)');
    assertClose(basic.c, 0.15, 0.01, 'parseOklch extracts C correctly');
    assertClose(basic.h, 30, 0.1, 'parseOklch extracts H correctly');
}

// With % suffix (same behavior since both are interpreted as percentage)
const withPercent = parseOklch('oklch(50% 0.15 30)');
assertNotNull(withPercent, 'parseOklch handles percentage lightness');
if (withPercent) {
    assertClose(withPercent.l, 0.5, 0.01, 'parseOklch converts percentage to decimal');
}

// Edge cases
const black = parseOklch('oklch(0 0 0)');
assertNotNull(black, 'parseOklch handles black (0 0 0)');
if (black) {
    assertEqual(black.l, 0, 'Black has L=0');
}

const white = parseOklch('oklch(100 0 0)');
assertNotNull(white, 'parseOklch handles white (100 0 0)');
if (white) {
    assertEqual(white.l, 1, 'White has L=1');
}

// Invalid inputs
assertNull(parseOklch('not a color'), 'parseOklch returns null for invalid string');
assertNull(parseOklch('rgb(255, 0, 0)'), 'parseOklch returns null for RGB');
assertNull(parseOklch('#ff0000'), 'parseOklch returns null for hex');
assertNull(parseOklch(''), 'parseOklch returns null for empty string');

// =============================================================================
// toHex6 Tests
// =============================================================================

console.log('\n--- toHex6() Tests ---\n');

// Basic conversions
assertEqual(toHex6({ r: 0, g: 0, b: 0 }), '#000000', 'toHex6 converts black');
assertEqual(toHex6({ r: 255, g: 255, b: 255 }), '#FFFFFF', 'toHex6 converts white');
assertEqual(toHex6({ r: 255, g: 0, b: 0 }), '#FF0000', 'toHex6 converts red');
assertEqual(toHex6({ r: 0, g: 255, b: 0 }), '#00FF00', 'toHex6 converts green');
assertEqual(toHex6({ r: 0, g: 0, b: 255 }), '#0000FF', 'toHex6 converts blue');

// Mixed values
assertEqual(toHex6({ r: 171, g: 205, b: 239 }), '#ABCDEF', 'toHex6 converts mixed values');
assertEqual(toHex6({ r: 18, g: 52, b: 86 }), '#123456', 'toHex6 pads single-digit hex');

// Edge case: rounding
const rounded = toHex6({ r: 127.4, g: 127.5, b: 127.6 });
assertNotNull(rounded, 'toHex6 handles floating point RGB');

// =============================================================================
// oklchToRgb Tests
// =============================================================================

console.log('\n--- oklchToRgb() Tests ---\n');

// Test known colors
const rgbBlack = oklchToRgb(0, 0, 0);
assertClose(rgbBlack.r, 0, 1, 'oklchToRgb black R');
assertClose(rgbBlack.g, 0, 1, 'oklchToRgb black G');
assertClose(rgbBlack.b, 0, 1, 'oklchToRgb black B');

const rgbWhite = oklchToRgb(1, 0, 0);
assertClose(rgbWhite.r, 255, 1, 'oklchToRgb white R');
assertClose(rgbWhite.g, 255, 1, 'oklchToRgb white G');
assertClose(rgbWhite.b, 255, 1, 'oklchToRgb white B');

// Test mid-gray (should be achromatic with c=0)
const rgbGray = oklchToRgb(0.5, 0, 0);
assertClose(rgbGray.r, rgbGray.g, 5, 'oklchToRgb gray R≈G');
assertClose(rgbGray.g, rgbGray.b, 5, 'oklchToRgb gray G≈B');

// Test that colors are in valid range
const testColor = oklchToRgb(0.6, 0.15, 30);
if (testColor.r >= 0 && testColor.r <= 255 &&
    testColor.g >= 0 && testColor.g <= 255 &&
    testColor.b >= 0 && testColor.b <= 255) {
    pass('oklchToRgb produces values in 0-255 range');
} else {
    fail(`oklchToRgb out of range: ${JSON.stringify(testColor)}`);
}

// =============================================================================
// Integration: parseOklch + toHex6
// =============================================================================

console.log('\n--- Integration Tests ---\n');

// Parse and convert a known color
const parsed = parseOklch('oklch(0.5 0 0)');
if (parsed) {
    const hex = toHex6(parsed);
    assertNotNull(hex, 'parseOklch + toHex6 works together');
    if (hex && hex.match(/^#[0-9A-F]{6}$/i)) {
        pass('Integration produces valid hex format');
    } else {
        fail(`Integration produced invalid hex: ${hex}`);
    }
}

// Test multiple colors for consistency
const testCases = [
    'oklch(0.7 0.12 150)',  // Greenish
    'oklch(0.6 0.18 250)',  // Blueish
    'oklch(0.65 0.2 30)',   // Orange/red
    'oklch(0.8 0.1 60)',    // Yellow
];

let allValid = true;
for (const oklch of testCases) {
    const p = parseOklch(oklch);
    if (!p) {
        fail(`Failed to parse: ${oklch}`);
        allValid = false;
        continue;
    }
    const h = toHex6(p);
    if (!h || !h.match(/^#[0-9A-F]{6}$/i)) {
        fail(`Invalid hex for ${oklch}: ${h}`);
        allValid = false;
    }
}
if (allValid) {
    pass(`All ${testCases.length} test colors convert correctly`);
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n' + '='.repeat(50));
console.log('  COLOR CONVERSION UNIT TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    console.log('\n[✗] Color conversion tests FAILED');
    process.exit(1);
} else {
    console.log('\n[✓] Color conversion tests PASSED');
    process.exit(0);
}
