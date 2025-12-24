/**
 * KDE Theme Validation Tests
 *
 * Verifies the generated KDE color scheme files.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

const kdeDir = path.join(__dirname, '..', 'kde');
const v4Dir = path.join(kdeDir, 'v4');
const v5Dir = path.join(kdeDir, 'v5');

const v4LightPath = path.join(v4Dir, 'CandiLight.colors');
const v4DarkPath = path.join(v4Dir, 'CandiDark.colors');
const v5LightPath = path.join(v5Dir, 'CandiLight.colors');
const v5DarkPath = path.join(v5Dir, 'CandiDark.colors');

console.log('--- KDE Theme Validation ---');

function testKdeTheme() {
    try {
        // 1. Check directory structure
        assert.ok(fs.existsSync(kdeDir), 'kde directory should exist');
        assert.ok(fs.existsSync(v4Dir), 'kde/v4 directory should exist');
        assert.ok(fs.existsSync(v5Dir), 'kde/v5 directory should exist');
        console.log('✅ Directory structure verified');

        // 2. Check file existence
        assert.ok(fs.existsSync(v4LightPath), 'kde/v4/CandiLight.colors should exist');
        assert.ok(fs.existsSync(v4DarkPath), 'kde/v4/CandiDark.colors should exist');
        assert.ok(fs.existsSync(v5LightPath), 'kde/v5/CandiLight.colors should exist');
        assert.ok(fs.existsSync(v5DarkPath), 'kde/v5/CandiDark.colors should exist');
        console.log('✅ All theme files exist');

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

        // Check key color mappings (dark theme)
        assert.ok(darkContent.includes('BackgroundNormal=13,18,24'), 'Window background should be dark bg');
        assert.ok(darkContent.includes('ForegroundNormal=232,228,221'), 'Window foreground should be light text');
        assert.ok(darkContent.includes('ForegroundLink=73,137,167'), 'Links should use link color');
        assert.ok(darkContent.includes('ForegroundNegative=206,112,105'), 'Negative should use error color');
        assert.ok(darkContent.includes('ForegroundPositive=88,144,90'), 'Positive should use success color');
        assert.ok(darkContent.includes('activeBackground=79,143,173'), 'WM active should use accent');

        console.log('✅ Dark theme mappings verified');

        // 4. Validate light theme contents
        const lightContent = fs.readFileSync(v4LightPath, 'utf8');

        assert.ok(lightContent.includes('ColorScheme=Candi Light'), 'Should have ColorScheme metadata');
        assert.ok(lightContent.includes('Name=Candi Light'), 'Should have Name metadata');
        assert.ok(lightContent.includes('BackgroundNormal=251,248,242'), 'Window background should be light bg');
        assert.ok(lightContent.includes('ForegroundNormal=35,42,48'), 'Window foreground should be dark text');

        console.log('✅ Light theme mappings verified');

        // 5. Verify v4 and v5 files are identical (same format)
        const v5DarkContent = fs.readFileSync(v5DarkPath, 'utf8');
        const v5LightContent = fs.readFileSync(v5LightPath, 'utf8');

        assert.strictEqual(darkContent, v5DarkContent, 'v4 and v5 dark themes should be identical');
        assert.strictEqual(lightContent, v5LightContent, 'v4 and v5 light themes should be identical');

        console.log('✅ v4 and v5 themes are identical');

        console.log('\nResult: All KDE validation tests passed.');
        return true;
    } catch (err) {
        console.error('\n❌ Validation failed:', err.message);
        process.exit(1);
    }
}

testKdeTheme();
