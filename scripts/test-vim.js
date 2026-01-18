/**
 * Vim Theme Validation Tests
 *
 * Verifies the generated vim colorscheme files.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const logger = require('./logger');

const vimColorsDir = path.join(__dirname, '..', 'vim', 'colors');
const lightThemePath = path.join(vimColorsDir, 'candi-light.vim');
const darkThemePath = path.join(vimColorsDir, 'candi-dark.vim');

if (logger.isVerbose) {
    console.log('--- Vim Theme Validation ---');
}

function testVimTheme() {
    try {
        // 1. Check file existence
        assert.ok(fs.existsSync(vimColorsDir), 'vim/colors directory should exist');
        assert.ok(fs.existsSync(lightThemePath), 'candi-light.vim should exist');
        assert.ok(fs.existsSync(darkThemePath), 'candi-dark.vim should exist');
        logger.log('[✓] Structure verified');

        // 2. Validate dark theme contents
        const darkContent = fs.readFileSync(darkThemePath, 'utf8');

        // Check for boilerplate
        assert.ok(darkContent.includes('hi clear'), 'Should clear highlights');
        assert.ok(darkContent.includes('let g:colors_name = "candi-dark"'), 'Should set colors_name');
        assert.ok(darkContent.includes('set background=dark'), 'Should set background');

        // Check key UI colors
        const normalLine = darkContent.split('\n').find(line => line.startsWith('hi Normal'));
        assert.ok(normalLine, 'Should have Normal highlight group');

        const guifg = normalLine.match(/guifg=(#[0-9A-Fa-f]+)/)[1];
        const guibg = normalLine.match(/guibg=(#[0-9A-Fa-f]+)/)[1];

        assert.equal(guifg.toUpperCase(), '#E0E5EB', 'Normal foreground mismatch');
        assert.equal(guibg.toUpperCase(), '#0D1218', 'Normal background mismatch');
        assert.ok(darkContent.includes('hi CursorLine') && darkContent.includes('guibg=#161B20'), 'CursorLine mapping mismatch');
        assert.ok(darkContent.includes('hi Function') && darkContent.includes('guifg=#3D98D1'), 'Function mapping mismatch');

        // Check terminal colors are present
        assert.ok(darkContent.includes('ctermfg=') && darkContent.includes('ctermbg='), 'Terminal colors should be present');

        if (logger.isVerbose) logger.log('[✓] Dark theme mappings verified');

        // 3. Validate light theme contents
        const lightContent = fs.readFileSync(lightThemePath, 'utf8');
        assert.ok(lightContent.includes('let g:colors_name = "candi-light"'), 'Should set colors_name');
        assert.ok(lightContent.includes('set background=light'), 'Should set background');
        assert.ok(lightContent.includes('hi Normal') && lightContent.includes('guifg=#232A30') && lightContent.includes('guibg=#F6F9FC'), 'Light Normal highlight mapping mismatch');

        if (logger.isVerbose) {
            logger.log('[✓] Light theme mappings verified');
            logger.log('\n--- Vim Theme Validation ---');
            logger.log(`[✓] ${lightVim} verified`);
            logger.log(`[✓] ${darkVim} verified`);
            logger.log('Theme validation complete.');
        }
        return true;
    } catch (err) {
        logger.dump();
        logger.error('\n[✗] Validation failed:', err.message);
        process.exit(1);
    }
}

testVimTheme();
