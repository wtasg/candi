#!/usr/bin/env node
/**
 * Build script for Vim themes from Candi colors.
 *
 * Extracts OKLCH colors from src/css/base.css, converts to Hex,
 * and generates Vim colorscheme files in vim/colors/.
 */

const fs = require('fs');
const path = require('path');

const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
const vimDir = path.join(__dirname, '..', 'vim');
const colorsDir = path.join(vimDir, 'colors');

const { toHex6: toHex, parseOklch } = require('./color-conv');

// 1. Read CSS
const css = fs.readFileSync(baseCssPath, 'utf8');

const lightColors = {};
const darkColors = {};

const varRegex = /--candi-([\w-]+):\s*(oklch\([^)]+\))/gi;

const rootMatch = css.match(/:root\s*{([^}]+)}/i);
const darkMatch = css.match(/\.dark\s*{([^}]+)}/i);

if (!rootMatch || !darkMatch) {
    console.error('Failed to find :root or .dark blocks in CSS');
    process.exit(1);
}

function extractColors(content, target) {
    let match;
    const regex = new RegExp(varRegex); // Reset regex
    while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        const data = parseOklch(match[2]);
        if (data) target[key] = toHex(data);
    }
}

extractColors(rootMatch[1], lightColors);
extractColors(darkMatch[1], darkColors);

function generateVimTheme(name, background, palette) {
    return `" Candi ${name} Colorscheme
" Generated from Candi Design System

hi clear
if exists("syntax_on")
    syntax reset
endif

let g:colors_name = "candi-${background}"
set background=${background}

" UI Highlighting
hi Normal          guifg=${palette['text']} guibg=${palette['bg']}
hi CursorLine      guibg=${palette['surface']} gui=none
hi LineNr          guifg=${palette['text-muted']} guibg=${palette['bg']}
hi CursorLineNr    guifg=${palette['accent']} guibg=${palette['bg']}
hi Visual          guibg=${palette['accent']} guifg=${palette['elevated']}
hi Search          guibg=${palette['secondary']} guifg=${palette['elevated']}
hi VertSplit       guifg=${palette['border']} guibg=${palette['bg']}
hi StatusLine      guifg=${palette['text']} guibg=${palette['surface']} gui=none
hi StatusLineNC    guifg=${palette['text-muted']} guibg=${palette['surface']} gui=none
hi Pmenu           guibg=${palette['surface']} guifg=${palette['text']}
hi PmenuSel        guibg=${palette['accent']} guifg=${palette['elevated']}
hi MatchParen      guifg=${palette['accent']} gui=bold

" Syntax Highlighting
hi Comment         guifg=${palette['text-muted']} gui=italic
hi Constant        guifg=${palette['secondary']}
hi String          guifg=${palette['success']}
hi Character       guifg=${palette['success']}
hi Number          guifg=${palette['secondary']}
hi Boolean         guifg=${palette['secondary']}
hi Float           guifg=${palette['secondary']}

hi Identifier      guifg=${palette['text']} gui=none
hi Function        guifg=${palette['accent']}

hi Statement       guifg=${palette['accent']} gui=bold
hi Conditional     guifg=${palette['accent']}
hi Repeat          guifg=${palette['accent']}
hi Label           guifg=${palette['accent']}
hi Operator        guifg=${palette['text']}
hi Keyword         guifg=${palette['accent']}
hi Exception       guifg=${palette['error']}

hi PreProc         guifg=${palette['secondary']}
hi Type            guifg=${palette['secondary']}
hi Special         guifg=${palette['secondary']}
hi Underlined      guifg=${palette['accent']} gui=underline
hi Error           guifg=${palette['elevated']} guibg=${palette['error']}
hi Todo            guifg=${palette['elevated']} guibg=${palette['accent']} gui=bold
`;
}

// Ensure directories exist
if (!fs.existsSync(vimDir)) fs.mkdirSync(vimDir);
if (!fs.existsSync(colorsDir)) fs.mkdirSync(colorsDir);

// 2. Generate Themes
fs.writeFileSync(path.join(colorsDir, 'candi-light.vim'), generateVimTheme('Light', 'light', lightColors));
fs.writeFileSync(path.join(colorsDir, 'candi-dark.vim'), generateVimTheme('Dark', 'dark', darkColors));

console.log('✓ Build complete!');
console.log('  - Generated vim/colors/candi-light.vim');
console.log('  - Generated vim/colors/candi-dark.vim');
