const fs = require('fs');
const path = require('path');
const palette = require('../src/data/colors');

const obsidianDir = path.join(__dirname, '..', 'obsidian');

const { parseOklch, toHex6 } = require('./color-conv');

const version = require('../package.json').version;

const toKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

function getColors(mode) {
    const colors = {};
    for (const [key, data] of Object.entries(palette[mode])) {
        const value = data.oklch || data.value;
        const parsed = parseOklch(value);
        if (parsed) colors[toKebab(key)] = toHex6({ r: parsed.r, g: parsed.g, b: parsed.b });
    }
    return colors;
}

const lightColors = getColors('light');
const darkColors = getColors('dark');

/**
 * Validate that all required color palette keys exist
 */
function validatePalette(palette, themeName) {
    const requiredKeys = [
        'bg',
        'surface',
        'elevated',
        'text',
        'text-subtle',
        'text-muted',
        'border',
        'accent',
        'accent-subtle',
        'secondary',
        'success',
        'warning',
        'error',
        'link',
        'disabled',
        'syntax-keyword',
        'syntax-type',
        'syntax-var',
        'syntax-const',
        'syntax-func',
        'syntax-string'
    ];

    const missingKeys = requiredKeys.filter(key => !palette[key]);

    if (missingKeys.length > 0) {
        console.error(`\x1b[31mError: Missing required color keys in ${themeName} palette:\x1b[0m`);
        missingKeys.forEach(key => {
            console.error(`  - --candi-${key}`);
        });
        console.error('\nPlease ensure all required color variables are defined in src/css/base.css');
        process.exit(1);
    }
}

/**
 * Generate Obsidian theme.css
 */
function generateThemeCss(lightPalette, darkPalette) {
    return `/*
 * Candi Theme for Obsidian
 * A Nordic-inspired theme with Hygge warmth and Lagom balance.
 * Generated from OKLCH color space.
 */

.theme-light {
    /* Backgrounds */
    --background-primary: ${lightPalette['bg']};
    --background-primary-alt: ${lightPalette['surface']};
    --background-secondary: ${lightPalette['surface']};
    --background-secondary-alt: ${lightPalette['elevated']};
    --background-modifier-border: ${lightPalette['border']};
    --background-modifier-form-field: ${lightPalette['elevated']};
    --background-modifier-form-field-highlighted: ${lightPalette['accent-subtle']};
    --background-modifier-box-shadow: rgba(0, 0, 0, 0.1);
    --background-modifier-success: ${lightPalette['success']};
    --background-modifier-error: ${lightPalette['error']};
    --background-modifier-error-rgb: 148, 85, 77;
    --background-modifier-cover: rgba(0, 0, 0, 0.6);

    /* Text */
    --text-normal: ${lightPalette['text']};
    --text-muted: ${lightPalette['text-muted']};
    --text-faint: ${lightPalette['disabled']};
    --text-on-accent: ${lightPalette['elevated']};
    --text-error: ${lightPalette['error']};
    --text-success: ${lightPalette['success']};
    --text-warning: ${lightPalette['warning']};
    --text-selection: ${lightPalette['accent-subtle']};
    --text-accent: ${lightPalette['accent']};
    --text-accent-hover: ${lightPalette['link']};

    /* Interactive elements */
    --interactive-normal: ${lightPalette['elevated']};
    --interactive-hover: ${lightPalette['surface']};
    --interactive-accent: ${lightPalette['accent']};
    --interactive-accent-rgb: 103, 126, 145;
    --interactive-accent-hover: ${lightPalette['link']};
    --interactive-success: ${lightPalette['success']};

    /* Scrollbar */
    --scrollbar-active-thumb-bg: ${lightPalette['text-muted']};
    --scrollbar-bg: ${lightPalette['surface']};
    --scrollbar-thumb-bg: ${lightPalette['border']};

    /* UI elements */
    --divider-color: ${lightPalette['border']};
    --divider-color-hover: ${lightPalette['text-muted']};
    --tab-text-color: ${lightPalette['text-subtle']};
    --tab-text-color-focused: ${lightPalette['text']};
    --tab-text-color-focused-active: ${lightPalette['accent']};
    --tab-background-active: ${lightPalette['elevated']};
    --tab-divider-color: ${lightPalette['border']};

    /* Headings */
    --h1-color: ${lightPalette['text']};
    --h2-color: ${lightPalette['text']};
    --h3-color: ${lightPalette['text']};
    --h4-color: ${lightPalette['text-subtle']};
    --h5-color: ${lightPalette['text-subtle']};
    --h6-color: ${lightPalette['text-muted']};

    /* Links */
    --link-color: ${lightPalette['link']};
    --link-color-hover: ${lightPalette['accent']};
    --link-external-color: ${lightPalette['secondary']};
    --link-external-color-hover: ${lightPalette['accent']};
    --link-unresolved-color: ${lightPalette['text-muted']};

    /* Tags */
    --tag-color: ${lightPalette['accent']};
    --tag-color-hover: ${lightPalette['link']};
    --tag-background: ${lightPalette['accent-subtle']};
    --tag-background-hover: ${lightPalette['surface']};

    /* Code */
    --code-normal: ${lightPalette['text']};
    --code-background: ${lightPalette['surface']};
    --code-comment: ${lightPalette['text-muted']};
    --code-keyword: ${lightPalette['syntax-keyword']};
    --code-type: ${lightPalette['syntax-type']};
    --code-var: ${lightPalette['syntax-var']};
    --code-const: ${lightPalette['syntax-const']};
    --code-func: ${lightPalette['syntax-func']};
    --code-string: ${lightPalette['syntax-string']};

    /* Checkbox */
    --checkbox-color: ${lightPalette['accent']};
    --checkbox-color-hover: ${lightPalette['link']};
    --checkbox-border-color: ${lightPalette['border']};

    /* Blockquote */
    --blockquote-border-color: ${lightPalette['accent']};

    /* Table */
    --table-header-background: ${lightPalette['surface']};
    --table-header-background-hover: ${lightPalette['accent-subtle']};
    --table-row-even-background: ${lightPalette['bg']};
    --table-row-odd-background: ${lightPalette['surface']};
    --table-row-background-hover: ${lightPalette['accent-subtle']};

    /* Graph */
    --graph-line: ${lightPalette['border']};
    --graph-node: ${lightPalette['accent']};
    --graph-node-focused: ${lightPalette['link']};
    --graph-node-tag: ${lightPalette['secondary']};
    --graph-node-attachment: ${lightPalette['success']};

    /* Icons */
    --icon-color: ${lightPalette['text-subtle']};
    --icon-color-hover: ${lightPalette['text']};
    --icon-color-active: ${lightPalette['accent']};
    --icon-color-focused: ${lightPalette['accent']};

    /* Nav */
    --nav-item-color: ${lightPalette['text-subtle']};
    --nav-item-color-hover: ${lightPalette['text']};
    --nav-item-color-active: ${lightPalette['accent']};
    --nav-item-background-hover: ${lightPalette['surface']};
    --nav-item-background-active: ${lightPalette['accent-subtle']};

    /* Prompt/Modal */
    --prompt-border-color: ${lightPalette['border']};

    /* Focus */
    --shadow-focus: 0 0 0 2px ${lightPalette['accent-subtle']};
}

.theme-dark {
    /* Backgrounds */
    --background-primary: ${darkPalette['bg']};
    --background-primary-alt: ${darkPalette['surface']};
    --background-secondary: ${darkPalette['surface']};
    --background-secondary-alt: ${darkPalette['elevated']};
    --background-modifier-border: ${darkPalette['border']};
    --background-modifier-form-field: ${darkPalette['elevated']};
    --background-modifier-form-field-highlighted: ${darkPalette['accent-subtle']};
    --background-modifier-box-shadow: rgba(0, 0, 0, 0.3);
    --background-modifier-success: ${darkPalette['success']};
    --background-modifier-error: ${darkPalette['error']};
    --background-modifier-error-rgb: 166, 103, 103;
    --background-modifier-cover: rgba(0, 0, 0, 0.8);

    /* Text */
    --text-normal: ${darkPalette['text']};
    --text-muted: ${darkPalette['text-muted']};
    --text-faint: ${darkPalette['disabled']};
    --text-on-accent: ${darkPalette['bg']};
    --text-error: ${darkPalette['error']};
    --text-success: ${darkPalette['success']};
    --text-warning: ${darkPalette['warning']};
    --text-selection: ${darkPalette['accent-subtle']};
    --text-accent: ${darkPalette['accent']};
    --text-accent-hover: ${darkPalette['link']};

    /* Interactive elements */
    --interactive-normal: ${darkPalette['elevated']};
    --interactive-hover: ${darkPalette['surface']};
    --interactive-accent: ${darkPalette['accent']};
    --interactive-accent-rgb: 127, 153, 179;
    --interactive-accent-hover: ${darkPalette['link']};
    --interactive-success: ${darkPalette['success']};

    /* Scrollbar */
    --scrollbar-active-thumb-bg: ${darkPalette['text-muted']};
    --scrollbar-bg: ${darkPalette['surface']};
    --scrollbar-thumb-bg: ${darkPalette['border']};

    /* UI elements */
    --divider-color: ${darkPalette['border']};
    --divider-color-hover: ${darkPalette['text-muted']};
    --tab-text-color: ${darkPalette['text-subtle']};
    --tab-text-color-focused: ${darkPalette['text']};
    --tab-text-color-focused-active: ${darkPalette['accent']};
    --tab-background-active: ${darkPalette['elevated']};
    --tab-divider-color: ${darkPalette['border']};

    /* Headings */
    --h1-color: ${darkPalette['text']};
    --h2-color: ${darkPalette['text']};
    --h3-color: ${darkPalette['text']};
    --h4-color: ${darkPalette['text-subtle']};
    --h5-color: ${darkPalette['text-subtle']};
    --h6-color: ${darkPalette['text-muted']};

    /* Links */
    --link-color: ${darkPalette['link']};
    --link-color-hover: ${darkPalette['accent']};
    --link-external-color: ${darkPalette['secondary']};
    --link-external-color-hover: ${darkPalette['accent']};
    --link-unresolved-color: ${darkPalette['text-muted']};

    /* Tags */
    --tag-color: ${darkPalette['accent']};
    --tag-color-hover: ${darkPalette['link']};
    --tag-background: ${darkPalette['accent-subtle']};
    --tag-background-hover: ${darkPalette['surface']};

    /* Code */
    --code-normal: ${darkPalette['text']};
    --code-background: ${darkPalette['surface']};
    --code-comment: ${darkPalette['text-muted']};
    --code-keyword: ${darkPalette['syntax-keyword']};
    --code-type: ${darkPalette['syntax-type']};
    --code-var: ${darkPalette['syntax-var']};
    --code-const: ${darkPalette['syntax-const']};
    --code-func: ${darkPalette['syntax-func']};
    --code-string: ${darkPalette['syntax-string']};

    /* Checkbox */
    --checkbox-color: ${darkPalette['accent']};
    --checkbox-color-hover: ${darkPalette['link']};
    --checkbox-border-color: ${darkPalette['border']};

    /* Blockquote */
    --blockquote-border-color: ${darkPalette['accent']};

    /* Table */
    --table-header-background: ${darkPalette['surface']};
    --table-header-background-hover: ${darkPalette['accent-subtle']};
    --table-row-even-background: ${darkPalette['bg']};
    --table-row-odd-background: ${darkPalette['surface']};
    --table-row-background-hover: ${darkPalette['accent-subtle']};

    /* Graph */
    --graph-line: ${darkPalette['border']};
    --graph-node: ${darkPalette['accent']};
    --graph-node-focused: ${darkPalette['link']};
    --graph-node-tag: ${darkPalette['secondary']};
    --graph-node-attachment: ${darkPalette['success']};

    /* Icons */
    --icon-color: ${darkPalette['text-subtle']};
    --icon-color-hover: ${darkPalette['text']};
    --icon-color-active: ${darkPalette['accent']};
    --icon-color-focused: ${darkPalette['accent']};

    /* Nav */
    --nav-item-color: ${darkPalette['text-subtle']};
    --nav-item-color-hover: ${darkPalette['text']};
    --nav-item-color-active: ${darkPalette['accent']};
    --nav-item-background-hover: ${darkPalette['surface']};
    --nav-item-background-active: ${darkPalette['accent-subtle']};

    /* Prompt/Modal */
    --prompt-border-color: ${darkPalette['border']};

    /* Focus */
    --shadow-focus: 0 0 0 2px ${darkPalette['accent-subtle']};
}
`;
}

/**
 * Generate manifest.json
 */
function generateManifest() {
    return JSON.stringify({
        name: 'Candi',
        version: version,
        minAppVersion: '1.0.0',
        author: 'wtasg',
        authorUrl: 'https://github.com/wtasg/candi'
    }, null, 4);
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Validate palettes
validatePalette(lightColors, 'Light');
validatePalette(darkColors, 'Dark');

// Ensure directory exists
ensureDir(obsidianDir);

// Generate theme files
const themeCss = generateThemeCss(lightColors, darkColors);
const manifest = generateManifest();

// Write files
fs.writeFileSync(path.join(obsidianDir, 'theme.css'), themeCss);
fs.writeFileSync(path.join(obsidianDir, 'manifest.json'), manifest);

console.log('Build complete!');
console.log('  - Generated obsidian/manifest.json');
console.log('  - Generated obsidian/theme.css');
