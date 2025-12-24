#!/usr/bin/env node
/**
 * Demonstration: KDE Palette Validation
 *
 * Shows how the validation catches missing color keys
 */

console.log('=== KDE Palette Validation Demo ===\n');

// Simulate the validation function from build-kde.js
function validatePalette(palette, themeName) {
    const requiredKeys = [
        'bg', 'surface', 'elevated', 'text', 'text-subtle', 'text-muted',
        'border', 'accent', 'accent-subtle', 'secondary', 'success',
        'warning', 'error', 'link', 'disabled'
    ];

    const missingKeys = requiredKeys.filter(key => !palette[key]);

    if (missingKeys.length > 0) {
        console.error(`\x1b[31mError: Missing required color keys in ${themeName} palette:\x1b[0m`);
        missingKeys.forEach(key => {
            console.error(`  - --candi-${key}`);
        });
        console.error('\nPlease ensure all required color variables are defined in src/css/base.css');
        return false;
    }

    // Warn about any undefined RGB values
    requiredKeys.forEach(key => {
        const color = palette[key];
        if (color && (color.r === undefined || color.g === undefined || color.b === undefined)) {
            console.warn(`\x1b[33mWarning: Color '${key}' has undefined RGB values\x1b[0m`);
        }
    });

    return true;
}

// Test Case 1: Complete palette (should pass)
console.log('Test 1: Complete palette');
const completePalette = {
    'bg': { r: 251, g: 248, b: 242 },
    'surface': { r: 249, g: 247, b: 243 },
    'elevated': { r: 255, g: 255, b: 255 },
    'text': { r: 35, g: 42, b: 48 },
    'text-subtle': { r: 67, g: 78, b: 88 },
    'text-muted': { r: 133, g: 140, b: 146 },
    'border': { r: 213, g: 211, b: 208 },
    'accent': { r: 64, g: 115, b: 138 },
    'accent-subtle': { r: 79, g: 143, b: 173 },
    'secondary': { r: 191, g: 108, b: 91 },
    'success': { r: 72, g: 118, b: 73 },
    'warning': { r: 196, g: 135, b: 59 },
    'error': { r: 177, g: 90, b: 82 },
    'link': { r: 60, g: 112, b: 135 },
    'disabled': { r: 178, g: 181, b: 183 }
};

if (validatePalette(completePalette, 'Complete')) {
    console.log('\x1b[32m[✓] Validation passed\x1b[0m\n');
}

// Test Case 2: Incomplete palette (should fail)
console.log('Test 2: Incomplete palette');
const incompletePalette = {
    'bg': { r: 251, g: 248, b: 242 },
    'text': { r: 35, g: 42, b: 48 },
    'accent': { r: 64, g: 115, b: 138 }
    // Missing: surface, elevated, text-subtle, text-muted, border, etc.
};

if (!validatePalette(incompletePalette, 'Incomplete')) {
    console.log('\x1b[32m[✓] Validation correctly rejected incomplete palette\x1b[0m\n');
}

// Test Case 3: Palette with undefined RGB values (should warn)
console.log('Test 3: Palette with undefined RGB values');
const invalidRgbPalette = {
    'bg': { r: 251, g: 248, b: 242 },
    'surface': { r: 249, g: 247, b: 243 },
    'elevated': { r: 255, g: 255, b: 255 },
    'text': { r: 35, g: undefined, b: 48 },  // Invalid: undefined g value
    'text-subtle': { r: 67, g: 78, b: 88 },
    'text-muted': { r: 133, g: 140, b: 146 },
    'border': { r: 213, g: 211, b: 208 },
    'accent': { r: 64, g: 115, b: 138 },
    'accent-subtle': { r: 79, g: 143, b: 173 },
    'secondary': { r: 191, g: 108, b: 91 },
    'success': { r: 72, g: 118, b: 73 },
    'warning': { r: 196, g: 135, b: 59 },
    'error': { r: 177, g: 90, b: 82 },
    'link': { r: 60, g: 112, b: 135 },
    'disabled': { r: 178, g: 181, b: 183 }
};

if (validatePalette(invalidRgbPalette, 'InvalidRGB')) {
    console.log('\x1b[32m[✓] Warning displayed for undefined RGB values\x1b[0m\n');
}

console.log('=== Demo Complete ===');
console.log('\nThe validation ensures that:');
console.log('1. All 15 required color keys are present');
console.log('2. RGB values are properly defined');
console.log('3. Invalid palettes are caught before theme generation');
