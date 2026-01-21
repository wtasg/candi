/**
 * KDE Theme Validation Tests
 *
 * Verifies the generated KDE color scheme files.
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const assert = require('assert').strict;

const kdeDir = path.join(__dirname, '..', 'kde');
const v4Dir = path.join(kdeDir, 'v4');
const v5Dir = path.join(kdeDir, 'v5');

const v4LightPath = path.join(v4Dir, 'CandiLight.colors');
const v4DarkPath = path.join(v4Dir, 'CandiDark.colors');
const v5LightPath = path.join(v5Dir, 'CandiLight.colors');
const v5DarkPath = path.join(v5Dir, 'CandiDark.colors');

logger.log('--- KDE Theme Validation ---');

function testKdeTheme() {
    let errors = 0;
    try {
        // 1. Check directory structure
        assert.ok(fs.existsSync(kdeDir), 'kde directory should exist');
        assert.ok(fs.existsSync(v4Dir), 'kde/v4 directory should exist');
        assert.ok(fs.existsSync(v5Dir), 'kde/v5 directory should exist');
        logger.log('[✓] Directory structure verified');

        // 2. Check file existence
        assert.ok(fs.existsSync(v4LightPath), 'kde/v4/CandiLight.colors should exist');
        assert.ok(fs.existsSync(v4DarkPath), 'kde/v4/CandiDark.colors should exist');
        assert.ok(fs.existsSync(v5LightPath), 'kde/v5/CandiLight.colors should exist');
        assert.ok(fs.existsSync(v5DarkPath), 'kde/v5/CandiDark.colors should exist');
        logger.log('[✓] All theme files exist');

        // 3. Validate dark theme contents
        const darkContent = fs.readFileSync(v4DarkPath, 'utf8');

        // Check for required sections
        assert.ok(darkContent.includes('[General]'), 'Should have [General] section');
        assert.ok(darkContent.includes('[Colors:Window]'), 'Should have [Colors:Window] section');
        assert.ok(darkContent.includes('[Colors:Button]'), 'Should have [Colors:Button] section');
        assert.ok(darkContent.includes('[Colors:Selection]'), 'Should have [Colors:Selection] section');
        assert.ok(darkContent.includes('[Colors:View]'), 'Should have [Colors:View] section');
        assert.ok(darkContent.includes('[Colors:Tooltip]'), 'Should have [Colors:Tooltip] section');
        assert.ok(darkContent.includes('[WM]'), 'Should have [WM] section');

        // Check metadata
        assert.ok(darkContent.includes('ColorScheme=Candi Dark'), 'Should have ColorScheme metadata');
        assert.ok(darkContent.includes('Name=Candi Dark'), 'Should have Name metadata');

        // Validate color format and semantic correctness (dark theme)
        const rgbPattern = /=(\d{1,3}),(\d{1,3}),(\d{1,3})/;

        // Helper to extract and validate RGB values
        function extractRgb(content, key) {
            const match = content.match(new RegExp(`${key}=(\\d{1,3}),(\\d{1,3}),(\\d{1,3})`));
            if (!match) return null;
            const [, r, g, b] = match.map(Number);
            // Validate RGB range (0-255)
            if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null;
            return { r, g, b };
        }

        // Validate BackgroundNormal has valid RGB format
        const darkBg = extractRgb(darkContent, 'BackgroundNormal');
        assert.ok(darkBg, 'Window background should have valid RGB format');

        // Dark theme background should have low RGB values (dark colors)
        assert.ok(darkBg.r < 80 && darkBg.g < 80 && darkBg.b < 80,
            `Dark theme background should have low RGB values (got ${darkBg.r},${darkBg.g},${darkBg.b})`);

        // Validate ForegroundNormal has valid RGB format
        const darkFg = extractRgb(darkContent, 'ForegroundNormal');
        assert.ok(darkFg, 'Window foreground should have valid RGB format');

        // Dark theme foreground should have higher values than background (readable contrast)
        const bgLuminance = (darkBg.r + darkBg.g + darkBg.b) / 3;
        const fgLuminance = (darkFg.r + darkFg.g + darkFg.b) / 3;
        assert.ok(fgLuminance > bgLuminance + 100,
            `Foreground should be significantly lighter than background for contrast`);

        // Validate semantic color roles exist with valid RGB format
        const linkColor = extractRgb(darkContent, 'ForegroundLink');
        assert.ok(linkColor, 'ForegroundLink should have valid RGB format');

        const negativeColor = extractRgb(darkContent, 'ForegroundNegative');
        assert.ok(negativeColor, 'ForegroundNegative should have valid RGB format');

        const positiveColor = extractRgb(darkContent, 'ForegroundPositive');
        assert.ok(positiveColor, 'ForegroundPositive should have valid RGB format');

        const wmActive = extractRgb(darkContent, 'activeBackground');
        assert.ok(wmActive, 'WM activeBackground should have valid RGB format');

        logger.log('[✓] Dark theme color format and semantics verified');

        // 4. Validate light theme contents
        const lightContent = fs.readFileSync(v4LightPath, 'utf8');

        assert.ok(lightContent.includes('ColorScheme=Candi Light'), 'Should have ColorScheme metadata');
        assert.ok(lightContent.includes('Name=Candi Light'), 'Should have Name metadata');

        // Validate color format and semantic correctness (light theme)
        const lightBg = extractRgb(lightContent, 'BackgroundNormal');
        assert.ok(lightBg, 'Light theme background should have valid RGB format');

        // Light theme background should have moderate RGB values for 75% L (Lagom)
        assert.ok(lightBg.r > 150 && lightBg.g > 150 && lightBg.b > 150,
            `Light theme background should have moderate RGB values (got ${lightBg.r},${lightBg.g},${lightBg.b})`);

        const lightFg = extractRgb(lightContent, 'ForegroundNormal');
        assert.ok(lightFg, 'Light theme foreground should have valid RGB format');

        // Light theme foreground should have lower values than background (readable contrast)
        const lightBgLuminance = (lightBg.r + lightBg.g + lightBg.b) / 3;
        const lightFgLuminance = (lightFg.r + lightFg.g + lightFg.b) / 3;
        assert.ok(lightBgLuminance > lightFgLuminance + 70,
            `Light theme background should be significantly lighter than foreground for contrast`);

        logger.log('[✓] Light theme color format and semantics verified');

        // 5. Verify v4 and v5 files are identical (same format)
        const v5DarkContent = fs.readFileSync(v5DarkPath, 'utf8');
        const v5LightContent = fs.readFileSync(v5LightPath, 'utf8');

        assert.strictEqual(darkContent, v5DarkContent, 'v4 and v5 dark themes should be identical');
        assert.strictEqual(lightContent, v5LightContent, 'v4 and v5 light themes should be identical');

        logger.log('[✓] v4 and v5 themes are identical');

        // All tests passed
        if (logger.isVerbose) {
            logger.log('\n[✓] KDE theme validation PASSED');
        }
        process.exit(0);
    } catch (err) {
        logger.dump();
        logger.error('\n[✗] Validation failed:', err.message);
        process.exit(1);
    }
}

/**
 * Test that base.css defines all required color keys
 */
function testPaletteCompleteness() {
    logger.log('\n--- Palette Completeness Validation ---');

    const palette = require('../src/data/colors');

    const requiredKeys = [
        'bg', 'surface', 'elevated', 'text', 'textSubtle', 'textMuted',
        'border', 'accent', 'accentSubtle', 'secondary', 'success',
        'warning', 'error', 'link', 'disabled'
    ];

    let allKeysFound = true;
    const missingInLight = [];
    const missingInDark = [];

    requiredKeys.forEach(key => {
        if (!palette.light[key]) {
            missingInLight.push(key);
            allKeysFound = false;
        }

        if (!palette.dark[key]) {
            missingInDark.push(key);
            allKeysFound = false;
        }
    });

    if (!allKeysFound) {
        if (missingInLight.length > 0) {
            console.error('[✗] Missing color keys in light theme (colors.js):');
            missingInLight.forEach(key => console.error(`  - ${key}`));
        }
        if (missingInDark.length > 0) {
            console.error('[✗] Missing color keys in dark theme (colors.js):');
            missingInDark.forEach(key => console.error(`  - ${key}`));
        }
        process.exit(1);
    }

    logger.log(`[✓] All ${requiredKeys.length} required color keys found in colors.js`);
}

testPaletteCompleteness();
testKdeTheme();
