import {
    oklchToRgb,
    toHex6,
    toHex8,
    parseOklch,
    inGamut,
    fitToGamut,
    getLuminance,
    getContrast,
    deriveOnColor,
    deriveColor,
    VARIANTS_LIGHT,
    generatePalette,
    toKebab,
    validateOklchFormat
} from '../src/index.js';

let errors = 0;
let passed = 0;

function pass(msg: string) {
    console.log(`[✓] ${msg}`);
    passed++;
}

function fail(msg: string) {
    console.error(`[✗] ${msg}`);
    errors++;
}

function assertEqual<T>(actual: T, expected: T, msg: string) {
    if (actual === expected) {
        pass(msg);
    } else {
        fail(`${msg}: expected ${expected}, got ${actual}`);
    }
}

function assertClose(actual: number, expected: number, tolerance: number, msg: string) {
    if (Math.abs(actual - expected) <= tolerance) {
        pass(msg);
    } else {
        fail(`${msg}: expected ~${expected}, got ${actual}`);
    }
}

function assertNotNull<T>(value: T | null | undefined, msg: string): value is T {
    if (value !== null && value !== undefined) {
        pass(msg);
        return true;
    } else {
        fail(`${msg}: got null/undefined`);
        return false;
    }
}

console.log('=== TypeScript Color Utilities Integration Tests ===\n');

// 1. parseOklch
console.log('--- parseOklch() Tests ---');
const parsed = parseOklch('oklch(50 0.15 30)');
if (assertNotNull(parsed, 'parseOklch parses basic OKLCH string')) {
    assertClose(parsed.l, 0.5, 0.01, 'l mapped correctly');
    assertClose(parsed.c, 0.15, 0.01, 'c mapped correctly');
    assertClose(parsed.h, 30, 0.1, 'h mapped correctly');
}

// 2. oklchToRgb / toHex6 / toHex8
console.log('\n--- Conversion & Hex Formatters Tests ---');
const rgbBlack = oklchToRgb(0, 0, 0);
assertClose(rgbBlack.r, 0, 1, 'oklchToRgb black R');
assertEqual(toHex6({ r: 255, g: 0, b: 0 }), '#FF0000', 'toHex6 formats Red');

const parsedAccent = parseOklch('oklch(52% 0.06 230)');
if (parsedAccent) {
    assertEqual(toHex6(parsedAccent), '#437085', 'toHex6 correctly formats light accent');
    assertEqual(toHex8(parsedAccent), '0XFF437085', 'toHex8 correctly formats for Flutter');
}

// 3. getContrast
console.log('\n--- Contrast Tests ---');
const black = { r: 0, g: 0, b: 0 };
const white = { r: 255, g: 255, b: 255 };
assertClose(getContrast(black, white), 21, 0.1, 'Black vs White is 21:1');

// 4. deriveOnColor
console.log('\n--- deriveOnColor Tests ---');
// Background is dark blue, text should be white
const onResult = deriveOnColor('oklch(20% 0.015 250)');
assertEqual(onResult.color, 'White', 'deriveOnColor selects White for dark bg');
assertEqual(onResult.oklch, 'oklch(100% 0 0)', 'Returns correct OKLCH string');

// 5. Naming & Verification
console.log('\n--- Naming & Structure Tests ---');
assertEqual(toKebab('warningSubtle'), 'warning-subtle', 'toKebab camelCase->kebab-case');
assertEqual(validateOklchFormat('oklch(50% 0.1 200)'), true, 'Valid OKLCH string accepted');
assertEqual(validateOklchFormat('rgb(255,0,0)'), false, 'RGB string rejected');

// 6. generatePalette
console.log('\n--- Palette Generation Tests ---');
const palette = generatePalette({ verbose: false });
assertNotNull(palette.light['accentSoft'], 'Palette generated with variants');
assertNotNull(palette.dark['onWarning'], 'Palette generated with on-colors');

console.log('\n' + '='.repeat(50));
console.log('  TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
