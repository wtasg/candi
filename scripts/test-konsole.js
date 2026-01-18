/**
 * Konsole Color Scheme Validation Tests
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

const konsoleDir = path.join(__dirname, '..', 'kde', 'konsole');
const lightSchemePath = path.join(konsoleDir, 'CandiLight.colorscheme');
const darkSchemePath = path.join(konsoleDir, 'CandiDark.colorscheme');

console.log('--- Konsole Color Scheme Validation ---');

function testKonsoleSchemes() {
    try {
        // 1. Check file existence
        assert.ok(fs.existsSync(konsoleDir), 'kde/konsole directory should exist');
        assert.ok(fs.existsSync(lightSchemePath), 'CandiLight.colorscheme should exist');
        assert.ok(fs.existsSync(darkSchemePath), 'CandiDark.colorscheme should exist');
        console.log('[✓] Structure verified');

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

        console.log('[✓] Light scheme validated');

        // 3. Validate dark scheme
        const darkContent = fs.readFileSync(darkSchemePath, 'utf8');

        assert.ok(darkContent.includes('[Background]'), 'Dark: Should have Background section');
        assert.ok(darkContent.includes('[Foreground]'), 'Dark: Should have Foreground section');
        assert.ok(darkContent.includes('Description=Candi Dark'), 'Dark: Should have description');
        assert.ok(rgbPattern.test(darkContent), 'Dark: Colors should be in RGB format');

        console.log('[✓] Dark scheme validated');

        // 4. Validate color values are different between light and dark
        const lightBgMatch = lightContent.match(/\[Background\]\nColor=(\d+,\d+,\d+)/);
        const darkBgMatch = darkContent.match(/\[Background\]\nColor=(\d+,\d+,\d+)/);

        assert.ok(lightBgMatch && darkBgMatch, 'Should extract background colors');
        assert.notEqual(lightBgMatch[1], darkBgMatch[1], 'Light and dark backgrounds should differ');

        console.log('[✓] Light/dark differentiation verified');

        console.log('\nResult: All Konsole validation tests passed.');
        return true;
    } catch (err) {
        console.error('\n[✗] Validation failed:', err.message);
        process.exit(1);
    }
}

testKonsoleSchemes();
