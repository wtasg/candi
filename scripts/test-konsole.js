/**
 * Konsole Color Scheme Validation Tests
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const assert = require('assert').strict;

const konsoleDir = path.join(__dirname, '..', 'kde', 'konsole');
const lightSchemePath = path.join(konsoleDir, 'CandiLight.colorscheme');
const darkSchemePath = path.join(konsoleDir, 'CandiDark.colorscheme');

if (logger.isVerbose) {
    logger.log('--- Konsole Color Scheme Validation ---');
}

function testKonsoleSchemes() {
    let errors = 0;
    try {
        // 1. Check file existence
        assert.ok(fs.existsSync(konsoleDir), 'kde/konsole directory should exist');
        assert.ok(fs.existsSync(lightSchemePath), 'CandiLight.colorscheme should exist');
        assert.ok(fs.existsSync(darkSchemePath), 'CandiDark.colorscheme should exist');
        logger.log('[✓] Structure verified');

        // 2. Validate light scheme
        const lightContent = fs.readFileSync(lightSchemePath, 'utf8');

        // Check required sections
        assert.ok(lightContent.includes('[Background]'), 'Should have Background section');
        assert.ok(lightContent.includes('[Foreground]'), 'Should have Foreground section');
        assert.ok(lightContent.includes('[General]'), 'Should have General section');

        // Check all 8 colors (0-7)
        for (let i = 0; i < 8; i++) {
            assert.ok(lightContent.includes(`[Color${i}]`), `Should have Color${i} section`);
            assert.ok(lightContent.includes(`[Color${i}Faint]`), `Should have Color${i}Faint section`);
            assert.ok(lightContent.includes(`[Color${i}Intense]`), `Should have Color${i}Intense section`);
        }

        // Check description
        assert.ok(lightContent.includes('Description=Candi Light'), 'Should have description');

        // Check RGB format (should be numbers separated by commas)
        const rgbPattern = /Color=\d+,\d+,\d+/;
        assert.ok(rgbPattern.test(lightContent), 'Colors should be in RGB format');

        logger.log('[✓] Light scheme validated');

        // 3. Validate dark scheme
        const darkContent = fs.readFileSync(darkSchemePath, 'utf8');

        assert.ok(darkContent.includes('[Background]'), 'Dark: Should have Background section');
        assert.ok(darkContent.includes('[Foreground]'), 'Dark: Should have Foreground section');
        assert.ok(darkContent.includes('Description=Candi Dark'), 'Dark: Should have description');
        assert.ok(rgbPattern.test(darkContent), 'Dark: Colors should be in RGB format');

        logger.log('[✓] Dark scheme validated');

        // 4. Validate color values are different between light and dark
        try {
            if (lightContent && darkContent) { // Only proceed if both contents were read successfully
                const lightBgMatch = lightContent.match(/\[Background\]\nColor=(\d+,\d+,\d+)/);
                const darkBgMatch = darkContent.match(/\[Background\]\nColor=(\d+,\d+,\d+)/);

                assert.ok(lightBgMatch && darkBgMatch, 'Should extract background colors');
                assert.notEqual(lightBgMatch[1], darkBgMatch[1], 'Light and dark backgrounds should differ');

                logger.log('[✓] Light/dark differentiation verified');
            } else {
                logger.error('[✗] Cannot verify light/dark differentiation due to previous errors.');
                errors++;
            }
        } catch (e) {
            logger.error(`[✗] Light/dark differentiation verification failed: ${e.message}`);
            errors++;
        }

        if (errors > 0) {
            logger.dump();
            logger.error('\n[✗] Konsole color scheme validation FAILED');
            process.exit(1);
        } else {
            if (logger.isVerbose) {
                logger.log('\n[✓] Konsole color scheme validation PASSED');
            }
            process.exit(0);
        }
    } catch (err) { // This catch block will now only catch unexpected errors outside the specific test assertions
        logger.dump();
        logger.error('\n[✗] An unexpected error occurred during validation:', err.message);
        process.exit(1);
    }
}

testKonsoleSchemes();
