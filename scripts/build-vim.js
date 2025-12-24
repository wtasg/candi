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

const rootMatch = css.match(/:root\s*{([^}]+)}/i);
const darkMatch = css.match(/\.dark\s*{([^}]+)}/i);

if (!rootMatch || !darkMatch) {
    console.error('Failed to find :root or .dark blocks in CSS');
    process.exit(1);
}

function extractColors(content, target) {
    let match;
    const regex = /--candi-([\w-]+):\s*(oklch\([^)]+\))/gi;
    while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        const data = parseOklch(match[2]);
        if (data) target[key] = toHex(data);
    }
}

extractColors(rootMatch[1], lightColors);
extractColors(darkMatch[1], darkColors);

/**
 * Convert hex color to nearest xterm-256 color code
 * @param {string} hex - Hex color like "#RRGGBB"
 * @returns {number} - xterm-256 color code (0-255)
 */
function hexToXterm256(hex) {
    // Parse hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Check for grayscale (approximate)
    const avg = (r + g + b) / 3;
    const isGray = Math.abs(r - avg) < 10 && Math.abs(g - avg) < 10 && Math.abs(b - avg) < 10;

    if (isGray) {
        // Use grayscale ramp (232-255)
        if (avg < 8) return 16; // black
        if (avg > 248) return 231; // white
        return Math.min(255, Math.round(232 + (avg - 8) / 10));
    }

    // Convert to 6x6x6 color cube (16-231)
    const rIndex = Math.round(r / 255 * 5);
    const gIndex = Math.round(g / 255 * 5);
    const bIndex = Math.round(b / 255 * 5);

    return 16 + (36 * rIndex) + (6 * gIndex) + bIndex;
}

function generateVimTheme(name, background, palette) {
    // Helper to generate highlight group with GUI and terminal colors
    const hi = (group, fgKey, bgKey = null, attr = 'none') => {
        const fg = fgKey ? palette[fgKey] : null;
        const bg = bgKey ? palette[bgKey] : null;
        let line = `hi ${group.padEnd(18)}`;

        if (fg) {
            line += ` guifg=${fg} ctermfg=${hexToXterm256(fg)}`;
        }
        if (bg) {
            line += ` guibg=${bg} ctermbg=${hexToXterm256(bg)}`;
        }
        if (attr !== 'none') {
            line += ` gui=${attr} cterm=${attr}`;
        }
        return line;
    };

    return `" Candi ${name} Colorscheme
" Generated from Candi Design System

hi clear
if exists("syntax_on")
    syntax reset
endif

let g:colors_name = "candi-${background}"
set background=${background}

" UI Highlighting
${hi('Normal', 'text', 'bg')}
${hi('CursorLine', null, 'surface')}
${hi('LineNr', 'text-muted', 'bg')}
${hi('CursorLineNr', 'accent', 'bg')}
${hi('Visual', 'elevated', 'accent')}
${hi('Search', 'elevated', 'secondary')}
${hi('VertSplit', 'border', 'bg')}
${hi('StatusLine', 'text', 'surface')}
${hi('StatusLineNC', 'text-muted', 'surface')}
${hi('Pmenu', 'text', 'surface')}
${hi('PmenuSel', 'elevated', 'accent')}
${hi('MatchParen', 'accent', null, 'bold')}

" Syntax Highlighting
${hi('Comment', 'text-muted', null, 'italic')}
${hi('Constant', 'secondary')}
${hi('String', 'success')}
${hi('Character', 'success')}
${hi('Number', 'secondary')}
${hi('Boolean', 'secondary')}
${hi('Float', 'secondary')}

${hi('Identifier', 'text')}
${hi('Function', 'accent')}

${hi('Statement', 'accent', null, 'bold')}
${hi('Conditional', 'accent')}
${hi('Repeat', 'accent')}
${hi('Label', 'accent')}
${hi('Operator', 'text')}
${hi('Keyword', 'accent')}
${hi('Exception', 'error')}

${hi('PreProc', 'secondary')}
${hi('Type', 'secondary')}
${hi('Special', 'secondary')}
${hi('Underlined', 'accent', null, 'underline')}
${hi('Error', 'elevated', 'error')}
${hi('Todo', 'elevated', 'accent', 'bold')}
`;
}

// Ensure directories exist
if (!fs.existsSync(vimDir)) fs.mkdirSync(vimDir);
if (!fs.existsSync(colorsDir)) fs.mkdirSync(colorsDir);

// 2. Generate Themes
fs.writeFileSync(path.join(colorsDir, 'candi-light.vim'), generateVimTheme('Light', 'light', lightColors));
fs.writeFileSync(path.join(colorsDir, 'candi-dark.vim'), generateVimTheme('Dark', 'dark', darkColors));

console.log('Build complete!');
console.log('  - Generated vim/colors/candi-light.vim');
console.log('  - Generated vim/colors/candi-dark.vim');
