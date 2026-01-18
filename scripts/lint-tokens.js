#!/usr/bin/env node
/**
 * Token Schema Validator
 *
 * Validates colors.js against the token schema to ensure:
 * 1. Every token has required fields (name, usage)
 * 2. Tokens use either oklch OR value (never both)
 * 3. Light and dark palettes have identical keys
 * 4. OKLCH format is valid
 *
 * Run with: npm run lint:tokens
 */

const fs = require('fs');
const path = require('path');

const colorsPath = path.join(__dirname, '..', 'src', 'data', 'colors.js');
const schemaPath = path.join(__dirname, '..', 'schemas', 'token-schema.json');

console.log('=== Token Schema Validation ===\n');

let errors = [];
let warnings = [];

function error(msg) {
    errors.push(msg);
    console.error(`[✗] ${msg}`);
}

function warn(msg) {
    warnings.push(msg);
    console.log(`[WARN] ${msg}`);
}

function pass(msg) {
    console.log(`[✓] ${msg}`);
}

// Load colors.js
let palette;
try {
    palette = require(colorsPath);
    pass('colors.js loaded successfully');
} catch (err) {
    error(`Failed to load colors.js: ${err.message}`);
    process.exit(1);
}

// Load schema
let schema;
try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    pass('token-schema.json loaded successfully');
} catch (err) {
    error(`Failed to load token-schema.json: ${err.message}`);
    process.exit(1);
}

// ============================================================
// Validation 1: Light and dark palettes exist
// ============================================================
console.log('\n--- Structure Validation ---');

if (!palette.light || typeof palette.light !== 'object') {
    error('Missing or invalid "light" palette');
}

if (!palette.dark || typeof palette.dark !== 'object') {
    error('Missing or invalid "dark" palette');
}

if (errors.length === 0) {
    pass('Both light and dark palettes exist');
}

// ============================================================
// Validation 2: Light/Dark key parity
// ============================================================
console.log('\n--- Key Parity Validation ---');

const lightKeys = Object.keys(palette.light || {}).sort();
const darkKeys = Object.keys(palette.dark || {}).sort();

const onlyInLight = lightKeys.filter(k => !darkKeys.includes(k));
const onlyInDark = darkKeys.filter(k => !lightKeys.includes(k));

if (onlyInLight.length > 0) {
    error(`Tokens only in light (missing from dark): ${onlyInLight.join(', ')}`);
}

if (onlyInDark.length > 0) {
    error(`Tokens only in dark (missing from light): ${onlyInDark.join(', ')}`);
}

if (onlyInLight.length === 0 && onlyInDark.length === 0) {
    pass(`Light/dark key parity verified (${lightKeys.length} tokens each)`);
}

// ============================================================
// Validation 3: Required tokens from schema
// ============================================================
console.log('\n--- Required Tokens Validation ---');

const requiredTokens = schema.definitions?.Palette?.required || [];

for (const mode of ['light', 'dark']) {
    const paletteObj = palette[mode] || {};
    const missing = requiredTokens.filter(t => !paletteObj[t]);

    if (missing.length > 0) {
        error(`${mode} palette missing required tokens: ${missing.join(', ')}`);
    }
}

if (errors.length === 0) {
    pass(`All ${requiredTokens.length} required tokens present in both palettes`);
}

// ============================================================
// Validation 4: Token structure (name, usage, oklch/value)
// ============================================================
console.log('\n--- Token Structure Validation ---');

const oklchRegex = /^oklch\(\d+(\.\d+)?%\s+\d+(\.\d+)?\s+\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?\)$/;

let structureErrors = 0;

for (const mode of ['light', 'dark']) {
    const paletteObj = palette[mode] || {};

    for (const [key, token] of Object.entries(paletteObj)) {
        // Check required fields
        if (!token.name || typeof token.name !== 'string') {
            error(`${mode}.${key}: Missing or invalid "name" field`);
            structureErrors++;
        }

        if (!token.usage || typeof token.usage !== 'string') {
            error(`${mode}.${key}: Missing or invalid "usage" field`);
            structureErrors++;
        }

        // Check oklch/value exclusivity
        const hasOklch = token.oklch !== undefined;
        const hasValue = token.value !== undefined;

        if (hasOklch && hasValue) {
            error(`${mode}.${key}: Has both "oklch" and "value" (must be exclusive)`);
            structureErrors++;
        }

        if (!hasOklch && !hasValue) {
            error(`${mode}.${key}: Missing both "oklch" and "value" (one required)`);
            structureErrors++;
        }

        // Validate OKLCH format
        if (hasOklch && !oklchRegex.test(token.oklch)) {
            error(`${mode}.${key}: Invalid OKLCH format: ${token.oklch}`);
            structureErrors++;
        }

        // Check for unexpected properties
        const allowedProps = ['name', 'usage', 'oklch', 'value'];
        const extraProps = Object.keys(token).filter(p => !allowedProps.includes(p));
        if (extraProps.length > 0) {
            warn(`${mode}.${key}: Unexpected properties: ${extraProps.join(', ')}`);
        }
    }
}

if (structureErrors === 0) {
    pass('All tokens have valid structure');
}

// ============================================================
// Validation 5: No additional properties at root level
// ============================================================
console.log('\n--- Root Structure Validation ---');

const allowedRootKeys = ['light', 'dark'];
const extraRootKeys = Object.keys(palette).filter(k => !allowedRootKeys.includes(k));

if (extraRootKeys.length > 0) {
    warn(`Unexpected root-level keys: ${extraRootKeys.join(', ')}`);
} else {
    pass('Root structure is clean (only light/dark)');
}

// ============================================================
// Summary
// ============================================================
console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Tokens validated: ${lightKeys.length} per palette`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
    console.log('\n[✗] Token validation FAILED');
    console.log('\nErrors:');
    errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
    process.exit(1);
} else {
    console.log('\n[✓] Token validation PASSED');

    if (warnings.length > 0) {
        console.log('\nWarnings (non-blocking):');
        warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
    }
}
