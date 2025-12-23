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
        console.log('✅ Structure verified');

        // 2. Validate dark theme contents
        const darkContent = fs.readFileSync(darkThemePath, 'utf8');

        // Check for boilerplate
        assert.ok(darkContent.includes('hi clear'), 'Should clear highlights');
        assert.ok(darkContent.includes('let g:colors_name = "candi-dark"'), 'Should set colors_name');
        assert.ok(darkContent.includes('set background=dark'), 'Should set background');

        // Check key UI colors
        assert.ok(darkContent.includes('hi Normal          guifg=#E8E4DD guibg=#0D1218'), 'Normal highlight group mapping mismatch');
        assert.ok(darkContent.includes('hi CursorLine      guibg=#161B20 gui=none'), 'CursorLine mapping mismatch');
        assert.ok(darkContent.includes('hi Function        guifg=#4F8FAD'), 'Function mapping mismatch');

        console.log('✅ Dark theme mappings verified');

        // 3. Validate light theme contents
        const lightContent = fs.readFileSync(lightThemePath, 'utf8');
        assert.ok(lightContent.includes('let g:colors_name = "candi-light"'), 'Should set colors_name');
        assert.ok(lightContent.includes('set background=light'), 'Should set background');
        assert.ok(lightContent.includes('hi Normal          guifg=#232A30 guibg=#FBF8F2'), 'Light Normal highlight mapping mismatch');

        console.log('✅ Light theme mappings verified');

        console.log('\nResult: All Vim validation tests passed.');
        return true;
    } catch (err) {
        console.error('\n❌ Validation failed:', err.message);
        process.exit(1);
    }
}

testVimTheme();
