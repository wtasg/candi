/**
 * VS Code Theme Validation Tests
 *
 * Verifies the generated vscode extension structure and contents.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const logger = require('./logger');

const vscodeDir = path.join(__dirname, '..', 'vscode');
const pkgPath = path.join(vscodeDir, 'package.json');
const lightThemePath = path.join(vscodeDir, 'themes', 'Candi Light-color-theme.json');
const darkThemePath = path.join(vscodeDir, 'themes', 'Candi Dark-color-theme.json');

if (logger.isVerbose) {
    console.log('--- VS Code Theme Validation ---');
}

function testExtension() {
    try {
        // 1. Check directory structure
        assert.ok(fs.existsSync(vscodeDir), 'vscode directory should exist');
        assert.ok(fs.existsSync(pkgPath), 'package.json should exist');
        assert.ok(fs.existsSync(lightThemePath), 'Light theme JSON should exist');
        assert.ok(fs.existsSync(darkThemePath), 'Dark theme JSON should exist');
        logger.log('[✓] Structure verified');

        // 2. Validate package.json
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        assert.equal(pkg.name, 'vscode-theme-candi');
        assert.ok(pkg.contributes && pkg.contributes.themes, 'package.json should contribute themes');
        assert.equal(pkg.contributes.themes.length, 2);
        logger.log('[✓] package.json contributions verified');

        // 3. Validate Theme Contents (Dark Theme example)
        const darkTheme = JSON.parse(fs.readFileSync(darkThemePath, 'utf8'));
        assert.equal(darkTheme.type, 'dark');

        // Check key UI colors from base.css (verified hex values)
        assert.equal(darkTheme.colors['editor.background'], '#0D1218');
        assert.equal(darkTheme.colors['editorCursor.foreground'], '#6993BE');
        assert.equal(darkTheme.colors['activityBar.activeBorder'], '#6993BE');

        // Deep Dive Check: Diff Editor (palette['success'] + "15") - roughly #SuccessHex + opacity
        // Just checking existence to avoid fragile hex opacity math in test
        assert.ok(darkTheme.colors['diffEditor.insertedTextBackground'], 'Diff editor colors should exist');

        // Check token colors
        const keywordToken = darkTheme.tokenColors.find(tc => tc.scope.includes('keyword'));
        assert.ok(keywordToken, 'Theme should highlight keywords');
        // Final keyword color is syntaxKeyword (#E7729B)
        assert.equal(keywordToken.settings.foreground.toUpperCase(), '#E7729B');

        if (logger.isVerbose) {
            logger.log('[✓] Theme color mappings verified');
            logger.log('\nResult: All VS Code validation tests passed.');
        }
        return true;
    } catch (err) {
        logger.dump();
        logger.error('\n[✗] Validation failed:', err.message);
        process.exit(1);
    }
}

testExtension();
