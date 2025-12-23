/**
 * Color Conversion Test Suite
 *
 * Verifies OKLCH to sRGB conversion against known values from OKLCH.com/Chrome/Safari.
 */

const { oklchToRgb, toHex6: toHex } = require('./color-conv');

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
