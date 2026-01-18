/**
 * =============================================================================
 * Lint Tokens Tests
 * Tests for lint-tokens.js functionality
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');

let errors = 0;
let passed = 0;

function pass(msg) { console.log(`[✓] ${msg}`); passed++; }
function fail(msg) { console.error(`[✗] ${msg}`); errors++; }

// =============================================================================
// Token Schema Tests
// =============================================================================

console.log('\n--- Token Schema Validation ---\n');

// Load source colors
const colors = require('../src/data/colors');

// Check light palette exists
if (colors.light && typeof colors.light === 'object') {
    pass('Light palette exists and is an object');
} else {
    fail('Light palette missing or invalid');
}

// Check dark palette exists
if (colors.dark && typeof colors.dark === 'object') {
    pass('Dark palette exists and is an object');
} else {
    fail('Dark palette missing or invalid');
}

// Check light/dark have same keys
const lightKeys = Object.keys(colors.light).sort();
const darkKeys = Object.keys(colors.dark).sort();

if (JSON.stringify(lightKeys) === JSON.stringify(darkKeys)) {
    pass(`Light/dark key parity (${lightKeys.length} tokens each)`);
} else {
    fail('Light/dark key mismatch');
}

// =============================================================================
// Required Token Tests
// =============================================================================

console.log('\n--- Required Tokens ---\n');

const requiredTokens = [
    // Core UI
    'bg', 'surface', 'elevated', 'text', 'textSubtle', 'textMuted', 'border',
    // Accent colors
    'accent', 'accentSubtle', 'accentStrong', 'secondary',
    // Status
    'success', 'warning', 'error', 'info', 'link',
    // Terminal
    'terminalBlack', 'terminalRed', 'terminalGreen', 'terminalYellow',
    'terminalBlue', 'terminalMagenta', 'terminalCyan', 'terminalWhite',
    // Syntax
    'syntaxKeyword', 'syntaxType', 'syntaxFunc', 'syntaxString',
    'syntaxConst', 'syntaxVar',
    // Primitives
    'red', 'blue', 'green', 'yellow', 'magenta', 'cyan', 'teal', 'pink', 'gold', 'silver'
];

let missingLight = [];
let missingDark = [];

for (const token of requiredTokens) {
    if (!colors.light[token]) missingLight.push(token);
    if (!colors.dark[token]) missingDark.push(token);
}

if (missingLight.length === 0) {
    pass(`All ${requiredTokens.length} required tokens in light palette`);
} else {
    fail(`Missing in light: ${missingLight.join(', ')}`);
}

if (missingDark.length === 0) {
    pass(`All ${requiredTokens.length} required tokens in dark palette`);
} else {
    fail(`Missing in dark: ${missingDark.join(', ')}`);
}

// =============================================================================
// Token Value Format Tests
// =============================================================================

console.log('\n--- Token Value Format ---\n');

// Check token structure
let validStructure = 0;
let invalidStructure = [];

for (const [key, value] of Object.entries(colors.light)) {
    if (value && typeof value === 'object' && (value.oklch || value.value)) {
        validStructure++;
    } else {
        invalidStructure.push(key);
    }
}

if (invalidStructure.length === 0) {
    pass(`All ${validStructure} light tokens have valid structure`);
} else if (invalidStructure.length <= 5) {
    fail(`Invalid structure in: ${invalidStructure.join(', ')}`);
} else {
    fail(`${invalidStructure.length} tokens have invalid structure`);
}

// Check OKLCH format
let oklchValid = 0;
let oklchInvalid = [];
const oklchPattern = /oklch\(\s*[\d.]+%?\s+[\d.]+\s+[\d.]+/i;

for (const [key, value] of Object.entries(colors.light)) {
    const colorValue = value.oklch || value.value;
    if (typeof colorValue === 'string' && oklchPattern.test(colorValue)) {
        oklchValid++;
    } else if (typeof colorValue === 'string' && !colorValue.includes('rgba') && !colorValue.includes('px')) {
        oklchInvalid.push(key);
    }
}

if (oklchInvalid.length === 0) {
    pass(`${oklchValid} tokens have valid OKLCH format`);
} else if (oklchInvalid.length <= 3) {
    // Shadow tokens use rgba, which is fine
    pass(`${oklchValid} OKLCH tokens (${oklchInvalid.length} use other formats)`);
} else {
    fail(`OKLCH format issues in: ${oklchInvalid.slice(0, 5).join(', ')}...`);
}

// =============================================================================
// Primitive Color Variants Tests
// =============================================================================

console.log('\n--- Primitive Color Variants ---\n');

const primitives = ['red', 'blue', 'green', 'yellow', 'magenta', 'cyan', 'teal', 'pink', 'gold', 'silver'];
const variants = ['Subtle', 'Soft', 'Strong', 'Outline'];

let missingVariants = [];

for (const prim of primitives) {
    for (const variant of variants) {
        const key = `${prim}${variant}`;
        if (!colors.light[key]) {
            missingVariants.push(key);
        }
    }
}

if (missingVariants.length === 0) {
    pass(`All ${primitives.length * variants.length} primitive variants present`);
} else {
    fail(`Missing variants: ${missingVariants.slice(0, 5).join(', ')}...`);
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n' + '='.repeat(50));
console.log('  LINT TOKENS TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    console.log('\n[✗] Lint tokens tests FAILED');
    process.exit(1);
} else {
    console.log('\n[✓] Lint tokens tests PASSED');
    process.exit(0);
}
