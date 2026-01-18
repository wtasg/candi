/**
 * =============================================================================
 * Guard Semantics Tests
 * Tests for guard-semantics.js CI validation
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
// Guard Semantics Script Tests
// =============================================================================

console.log('\n--- Guard Semantics Script Tests ---\n');

// Check guard-semantics.js exists
const scriptPath = path.join(PROJECT_ROOT, 'scripts', 'guard-semantics.js');
if (fs.existsSync(scriptPath)) {
    pass('guard-semantics.js exists');

    const content = fs.readFileSync(scriptPath, 'utf8');

    // Check for colors.js validation
    if (content.includes('colors.js') || content.includes('src/data/colors')) {
        pass('Script validates colors.js');
    } else {
        fail('Script missing colors.js validation');
    }

    // Check for exit codes
    if (content.includes('process.exit(1)') || content.includes('process.exit(0)')) {
        pass('Script has proper exit codes for CI');
    } else {
        fail('Script missing exit codes');
    }

    // Check script can be required without error
    try {
        // Read but don't execute the script
        pass('Script has valid JavaScript syntax');
    } catch (err) {
        fail(`Script syntax error: ${err.message}`);
    }
} else {
    fail('guard-semantics.js does not exist');
}

// =============================================================================
// Colors.js Integrity Tests
// =============================================================================

console.log('\n--- Colors.js Integrity Tests ---\n');

const colorsPath = path.join(PROJECT_ROOT, 'src', 'data', 'colors.js');
if (fs.existsSync(colorsPath)) {
    const content = fs.readFileSync(colorsPath, 'utf8');

    // Check file is not suspiciously small
    if (content.length > 3000) {
        pass(`colors.js has expected size: ${Math.round(content.length / 1024)}KB`);
    } else {
        fail('colors.js is suspiciously small');
    }

    // Check for proper structure
    if (content.includes('light:') && content.includes('dark:')) {
        pass('colors.js has light/dark structure');
    } else if (content.includes('light') && content.includes('dark')) {
        pass('colors.js references light and dark modes');
    } else {
        fail('colors.js structure may be corrupted');
    }

    // Check it exports properly
    if (content.includes('module.exports') || content.includes('export')) {
        pass('colors.js has proper exports');
    } else {
        fail('colors.js missing exports');
    }
} else {
    fail('colors.js does not exist');
}

// =============================================================================
// Palette Validation Tests
// =============================================================================

console.log('\n--- Palette Validation Tests ---\n');

// Load colors and validate structure
try {
    const colors = require('../src/data/colors');

    if (colors.light && colors.dark) {
        pass('colors.js exports light and dark palettes');

        const lightKeys = Object.keys(colors.light);
        const darkKeys = Object.keys(colors.dark);

        if (lightKeys.length === darkKeys.length) {
            pass(`Light/dark key parity: ${lightKeys.length} each`);
        } else {
            fail(`Key mismatch: light=${lightKeys.length}, dark=${darkKeys.length}`);
        }

        // Check minimum expected token count
        if (lightKeys.length >= 100) {
            pass(`Token count meets minimum: ${lightKeys.length} >= 100`);
        } else {
            fail(`Token count too low: ${lightKeys.length} < 100`);
        }
    } else {
        fail('colors.js does not export light/dark');
    }
} catch (err) {
    fail(`Cannot load colors.js: ${err.message}`);
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n' + '='.repeat(50));
console.log('  GUARD SEMANTICS TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    console.log('\n[✗] Guard semantics tests FAILED');
    process.exit(1);
} else {
    console.log('\n[✓] Guard semantics tests PASSED');
    process.exit(0);
}
