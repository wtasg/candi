/**
 * CI Guard: Semantic Integrity Check
 *
 * This script ensures that the authoritative `src/data/colors.js`
 * has NOT tampered with the output of the Derivation Engine.
 *
 * Rule: Semantic tokens in the final palette must EXACTLY match
 * the output of `generatePalette()`. No manual overrides allowed.
 */

const { generatePalette } = require('./gen-oklch-primitives');
const palette = require('../src/data/colors');
const assert = require('assert');
const logger = require('./logger');

logger.log('🛡️  Running Semantic Integrity Guard...');

const generated = generatePalette();

// 1. Check Light Mode
Object.keys(generated.light).forEach(key => {
    const fresh = generated.light[key];
    const authoritative = palette.light[key];

    try {
        assert.deepStrictEqual(authoritative, fresh);
    } catch (e) {
        logger.dump();
        logger.error(`❌ Semantic Integrity Violated for token: 'light.${key}'`);
        logger.error(`   Expected (Engine):`, fresh);
        logger.error(`   Found (Source):   `, authoritative);
        logger.error(`   Action: Remove manual overrides in src/data/colors.js`);
        process.exit(1);
    }
});

// 2. Check Dark Mode
Object.keys(generated.dark).forEach(key => {
    const fresh = generated.dark[key];
    const authoritative = palette.dark[key];

    try {
        assert.deepStrictEqual(authoritative, fresh);
    } catch (e) {
        logger.dump();
        logger.error(`❌ Semantic Integrity Violated for token: 'dark.${key}'`);
        logger.error(`   Expected (Engine):`, fresh);
        logger.error(`   Found (Source):   `, authoritative);
        logger.error(`   Action: Remove manual overrides in src/data/colors.js`);
        process.exit(1);
    }
});

if (logger.isVerbose) {
    logger.log('✅ Semantic Integrity Verified. No manual tampering detected.');
} else {
    console.log('Semantic integrity verification passed.');
}
