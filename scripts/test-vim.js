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

        const guifg = normalLine.match(/guifg=(#[0-9A-Fa-f]+)/)[1].toUpperCase();
        const guibg = normalLine.match(/guibg=(#[0-9A-Fa-f]+)/)[1].toUpperCase();

        console.log(`DEBUG_VIM_DARK: guifg='${guifg}', guibg='${guibg}'`);

        assert.equal(guifg, '#C9CED4', 'Normal foreground mismatch');
        assert.equal(guibg, '#1C2229', 'Normal background mismatch');
        assert.ok(darkContent.includes('hi CursorLine') && darkContent.includes('guibg=#292E34'), 'CursorLine mapping mismatch');
        assert.ok(darkContent.includes('hi Function') && darkContent.includes('guifg=#3D98D1'), 'Function mapping mismatch');
        assert.ok(darkContent.includes('hi StatusLine') && darkContent.includes('guifg=#C9CED4') && darkContent.includes('guibg=#3B5269'), 'StatusLine mapping mismatch');

        // Check terminal colors are present
        assert.ok(darkContent.includes('ctermfg=') && darkContent.includes('ctermbg='), 'Terminal colors should be present');

        if (logger.isVerbose) logger.log('[✓] Dark theme mappings verified');

        // 3. Validate light theme contents
        const lightContent = fs.readFileSync(lightThemePath, 'utf8');
        assert.ok(lightContent.includes('let g:colors_name = "candi-light"'), 'Should set colors_name');
        assert.ok(lightContent.includes('set background=light'), 'Should set background');
        assert.ok(lightContent.includes('hi Normal') && lightContent.includes('guifg=#0E0A05') && lightContent.includes('guibg=#B1ADA7'), 'Light Normal highlight mapping mismatch');
        assert.ok(lightContent.includes('hi StatusLine') && lightContent.includes('guifg=#FFFFFF') && lightContent.includes('guibg=#305880'), 'Light StatusLine mapping mismatch');
        assert.ok(lightContent.includes('hi User1') && lightContent.includes('guifg=#FFFFFF') && lightContent.includes('guibg=#305880'), 'Light User1 mapping mismatch');
        assert.ok(lightContent.includes('hi Airlinea') && lightContent.includes('guifg=#FFFFFF') && lightContent.includes('guibg=#305880'), 'Light Airlinea mapping mismatch');
        assert.ok(lightContent.includes('hi Airlineb') && lightContent.includes('guifg=#0E0A05') && lightContent.includes('guibg=#C1BDB7'), 'Light Airlineb mapping mismatch');

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
