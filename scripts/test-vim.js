/**
 * Vim Theme Validation Tests
 *
 * Verifies the generated vim colorscheme files.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

const vimColorsDir = path.join(__dirname, '..', 'vim', 'colors');
const lightThemePath = path.join(vimColorsDir, 'candi-light.vim');
const darkThemePath = path.join(vimColorsDir, 'candi-dark.vim');

console.log('--- Vim Theme Validation ---');

function testVimTheme() {
    try {
        // 1. Check file existence
        assert.ok(fs.existsSync(vimColorsDir), 'vim/colors directory should exist');
        assert.ok(fs.existsSync(lightThemePath), 'candi-light.vim should exist');
        assert.ok(fs.existsSync(darkThemePath), 'candi-dark.vim should exist');
        console.log('[✓] Structure verified');

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

        assert.equal(guifg.toUpperCase(), '#E8E4DD', 'Normal foreground mismatch');
        assert.equal(guibg.toUpperCase(), '#15110A', 'Normal background mismatch');
        assert.ok(darkContent.includes('hi CursorLine') && darkContent.includes('guibg=#1D1A14'), 'CursorLine mapping mismatch');
        assert.ok(darkContent.includes('hi Function') && darkContent.includes('guifg=#7987DE'), 'Function mapping mismatch');

        // Check terminal colors are present
        assert.ok(darkContent.includes('ctermfg=') && darkContent.includes('ctermbg='), 'Terminal colors should be present');

        console.log('[✓] Dark theme mappings verified');

        // 3. Validate light theme contents
        const lightContent = fs.readFileSync(lightThemePath, 'utf8');
        assert.ok(lightContent.includes('let g:colors_name = "candi-light"'), 'Should set colors_name');
        assert.ok(lightContent.includes('set background=light'), 'Should set background');
        assert.ok(lightContent.includes('hi Normal') && lightContent.includes('guifg=#1A222B') && lightContent.includes('guibg=#F5F1E9'), 'Light Normal highlight mapping mismatch');

        console.log('[✓] Light theme mappings verified');

        console.log('\nResult: All Vim validation tests passed.');
        return true;
    } catch (err) {
        console.error('\n[✗] Validation failed:', err.message);
        process.exit(1);
    }
}

testVimTheme();
