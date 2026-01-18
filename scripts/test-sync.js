/**
 * =============================================================================
 * Sync Colors Output Tests
 * Tests for sync-colors.js output files
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');

let errors = 0;
let passed = 0;

function pass(msg) { console.log(`[✓] ${msg}`); passed++; }
function fail(msg) { console.error(`[✗] ${msg}`); errors++; }

function readFile(filePath) {
    return fs.readFileSync(path.join(PROJECT_ROOT, filePath), 'utf8');
}

// =============================================================================
// Source vs Output Token Count
// =============================================================================

console.log('\n--- Token Count Verification ---\n');

const sourceColors = require('../src/data/colors');
const sourceLightKeys = Object.keys(sourceColors.light);
const sourceDarkKeys = Object.keys(sourceColors.dark);

// Check light/dark parity at source
if (sourceLightKeys.length === sourceDarkKeys.length) {
    pass(`Source token parity: ${sourceLightKeys.length} tokens each`);
} else {
    fail(`Source mismatch: light=${sourceLightKeys.length}, dark=${sourceDarkKeys.length}`);
}

// Load dist outputs
const distColors = JSON.parse(readFile('dist/colors.json'));
const distLightKeys = Object.keys(distColors.light);
const distDarkKeys = Object.keys(distColors.dark);

// Check dist matches source
if (distLightKeys.length === sourceLightKeys.length) {
    pass(`colors.json light matches source: ${distLightKeys.length} tokens`);
} else {
    fail(`colors.json light mismatch: source=${sourceLightKeys.length}, dist=${distLightKeys.length}`);
}

if (distDarkKeys.length === sourceDarkKeys.length) {
    pass(`colors.json dark matches source: ${distDarkKeys.length} tokens`);
} else {
    fail(`colors.json dark mismatch: source=${sourceDarkKeys.length}, dist=${distDarkKeys.length}`);
}

// =============================================================================
// CSS Variable Format Validation
// =============================================================================

console.log('\n--- CSS Variable Format ---\n');

const baseCss = readFile('dist/base.css');

// Check CSS variable format
const cssVarPattern = /--candi-[\w-]+:\s*[^;]+;/g;
const cssVars = baseCss.match(cssVarPattern) || [];

if (cssVars.length > 0) {
    pass(`base.css has ${cssVars.length} CSS variables`);
} else {
    fail('base.css has no CSS variables');
}

// Check for light theme block
if (baseCss.includes(':root') || baseCss.includes('.light')) {
    pass('base.css has light theme scope');
} else {
    fail('base.css missing light theme scope');
}

// Check for dark theme block
if (baseCss.includes('.dark') || baseCss.includes('[data-theme="dark"]')) {
    pass('base.css has dark theme scope');
} else {
    fail('base.css missing dark theme scope');
}

// =============================================================================
// Tailwind v4 Theme Validation
// =============================================================================

console.log('\n--- Tailwind v4 Theme ---\n');

const v4Theme = readFile('dist/v4/theme.css');

// Check @theme block
if (v4Theme.includes('@theme')) {
    pass('v4/theme.css has @theme block');
} else {
    fail('v4/theme.css missing @theme block');
}

// Check color utility generation
const utilityPattern = /--color-[\w-]+/g;
const utilities = v4Theme.match(utilityPattern) || [];

if (utilities.length >= 50) {
    pass(`v4/theme.css has ${utilities.length} color utilities`);
} else {
    fail(`v4/theme.css has insufficient utilities: ${utilities.length}`);
}

// =============================================================================
// JavaScript/ESM Export Validation
// =============================================================================

console.log('\n--- JS/ESM Exports ---\n');

// Check dist/colors.js exists and has exports
const colorsJs = readFile('dist/colors.js');
if (colorsJs.includes('module.exports') || colorsJs.includes('exports.')) {
    pass('colors.js has CommonJS exports');
} else {
    fail('colors.js missing CommonJS exports');
}

// Check dist/colors.mjs exists and has ESM exports
const colorsMjs = readFile('dist/colors.mjs');
if (colorsMjs.includes('export ')) {
    pass('colors.mjs has ESM exports');
} else {
    fail('colors.mjs missing ESM exports');
}

// =============================================================================
// Key Name Consistency
// =============================================================================

console.log('\n--- Key Name Consistency ---\n');

// Check that all keys follow naming convention
const invalidKeys = sourceLightKeys.filter(key => !/^[a-zA-Z][a-zA-Z0-9]*$/.test(key));

if (invalidKeys.length === 0) {
    pass('All source keys follow camelCase convention');
} else {
    fail(`Invalid key names: ${invalidKeys.slice(0, 5).join(', ')}...`);
}

// Check that light and dark have same keys
const lightOnly = sourceLightKeys.filter(k => !sourceDarkKeys.includes(k));
const darkOnly = sourceDarkKeys.filter(k => !sourceLightKeys.includes(k));

if (lightOnly.length === 0 && darkOnly.length === 0) {
    pass('Light and dark have identical key sets');
} else {
    if (lightOnly.length > 0) fail(`Keys only in light: ${lightOnly.join(', ')}`);
    if (darkOnly.length > 0) fail(`Keys only in dark: ${darkOnly.join(', ')}`);
}

// =============================================================================
// Required Token Presence
// =============================================================================

console.log('\n--- Required Tokens ---\n');

const requiredTokens = [
    // Core UI
    'bg', 'surface', 'elevated', 'text', 'textMuted', 'border', 'accent',
    // Semantic
    'success', 'warning', 'error', 'info', 'link',
    // Syntax
    'syntaxKeyword', 'syntaxType', 'syntaxFunc', 'syntaxString', 'syntaxConst',
    // Primitives (sample)
    'red', 'blue', 'green', 'yellow', 'magenta', 'cyan', 'teal', 'pink', 'gold', 'silver'
];

let missingTokens = [];
for (const token of requiredTokens) {
    if (!sourceLightKeys.includes(token)) {
        missingTokens.push(token);
    }
}

if (missingTokens.length === 0) {
    pass(`All ${requiredTokens.length} required tokens present`);
} else {
    fail(`Missing required tokens: ${missingTokens.join(', ')}`);
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n' + '='.repeat(50));
console.log('  SYNC COLORS TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    console.log('\n[✗] Sync colors tests FAILED');
    process.exit(1);
} else {
    console.log('\n[✓] Sync colors tests PASSED');
    process.exit(0);
}
