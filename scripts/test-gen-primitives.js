/**
 * =============================================================================
 * Gen OKLCH Primitives Tests
 * Tests for gen-oklch-primitives.js semantic color generation
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
// Gen OKLCH Primitives Script Tests
// =============================================================================

console.log('\n--- Gen OKLCH Primitives Script Tests ---\n');

// Check gen-oklch-primitives.js exists
const genPrimitivesPath = path.join(PROJECT_ROOT, 'scripts', 'gen-oklch-primitives.js');
if (fs.existsSync(genPrimitivesPath)) {
    pass('gen-oklch-primitives.js exists');

    const content = fs.readFileSync(genPrimitivesPath, 'utf8');

    // Check for anchor definitions
    if (content.includes('anchors') || content.includes('ANCHORS') || content.includes('anchor')) {
        pass('Script defines color anchors');
    } else {
        fail('Script missing color anchors');
    }

    // Check for variant generation
    const variants = ['subtle', 'strong', 'soft'];
    let foundVariants = 0;
    for (const v of variants) {
        if (content.toLowerCase().includes(v)) foundVariants++;
    }

    if (foundVariants >= 2) {
        pass(`Script generates ${foundVariants} color variants`);
    } else {
        fail('Script missing variant generation logic');
    }

    // Check for OKLCH processing
    if (content.includes('oklch') || content.includes('OKLCH')) {
        pass('Script uses OKLCH color space');
    } else {
        fail('Script missing OKLCH processing');
    }

    // Check for exports
    if (content.includes('module.exports') || content.includes('exports')) {
        pass('Script has proper exports');
    } else {
        fail('Script missing exports');
    }
} else {
    fail('gen-oklch-primitives.js does not exist');
}

// =============================================================================
// Colors.js Integration Tests
// =============================================================================

console.log('\n--- Colors.js Integration ---\n');

// Load colors and verify semantic colors exist
const colors = require('../src/data/colors');

// Check for semantic colors that should be generated
const semantics = ['accent', 'accentSubtle', 'accentStrong', 'success', 'error', 'warning', 'info'];
let foundSemantics = 0;

for (const sem of semantics) {
    if (colors.light[sem] && colors.dark[sem]) {
        foundSemantics++;
    }
}

if (foundSemantics === semantics.length) {
    pass(`All ${semantics.length} semantic colors present in palette`);
} else {
    fail(`Only ${foundSemantics}/${semantics.length} semantic colors found`);
}

// Check semantic colors have proper structure
let validSemanticStructure = 0;
for (const sem of semantics) {
    const value = colors.light[sem];
    if (value && (value.oklch || value.value)) {
        validSemanticStructure++;
    }
}

if (validSemanticStructure === semantics.length) {
    pass('All semantic colors have valid structure');
} else {
    fail(`Only ${validSemanticStructure}/${semantics.length} have valid structure`);
}

// =============================================================================
// Light/Dark Semantic Consistency
// =============================================================================

console.log('\n--- Semantic Consistency ---\n');

// Verify light and dark have same semantic keys
const lightSemantics = semantics.filter(s => colors.light[s]);
const darkSemantics = semantics.filter(s => colors.dark[s]);

if (lightSemantics.length === darkSemantics.length) {
    pass(`Light/dark semantic parity: ${lightSemantics.length} semantics each`);
} else {
    fail(`Semantic mismatch: light=${lightSemantics.length}, dark=${darkSemantics.length}`);
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n' + '='.repeat(50));
console.log('  GEN OKLCH PRIMITIVES TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    console.log('\n[✗] Gen OKLCH primitives tests FAILED');
    process.exit(1);
} else {
    console.log('\n[✓] Gen OKLCH primitives tests PASSED');
    process.exit(0);
}
