#!/usr/bin/env node
/**
 * Build script for VS Code theme from Candi colors.
 *
 * Extracts OKLCH colors from src/css/base.css, converts to Hex,
 * and generates a VS Code extension in vscode/.
 */

const fs = require('fs');
const path = require('path');

const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
const vscodeDir = path.join(__dirname, '..', 'vscode');
const themesDir = path.join(vscodeDir, 'themes');

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
    while ((match = varRegex.exec(content)) !== null) {
        const key = match[1];
        const data = parseOklch(match[2]);
        if (data) target[key] = toHex(data);
    }
}

extractColors(rootMatch[1], lightColors);
extractColors(darkMatch[1], darkColors);

function generateTheme(name, type, palette) {
    return {
        "name": `Candi ${name}`,
        "type": type,
        "colors": {
            // General
            "focusBorder": palette['accent'],
            "foreground": palette['text'],
            "widget.shadow": palette['border'],
            "selection.background": palette['accent'] + "40", // 25% opacity
            "descriptionForeground": palette['text-subtle'],
            "errorForeground": palette['error'],

            // Buttons
            "button.background": palette['accent'],
            "button.foreground": palette['elevated'],
            "button.hoverBackground": palette['accent'], // Should ideally be slightly different

            // Editor
            "editor.background": palette['bg'],
            "editor.foreground": palette['text'],
            "editorLineNumber.foreground": palette['text-muted'],
            "editorLineNumber.activeForeground": palette['text'],
            "editorCursor.foreground": palette['accent'],
            "editor.selectionBackground": palette['accent'] + "30",
            "editor.lineHighlightBackground": palette['surface'],
            "editorIndentGuide.background": palette['border'],
            "editorIndentGuide.activeBackground": palette['border-strong'],

            // Sidebar
            "sideBar.background": palette['surface'],
            "sideBar.foreground": palette['text-subtle'],
            "sideBar.border": palette['border'],
            "sideBarTitle.foreground": palette['text'],
            "sideBarSectionHeader.background": palette['surface'],
            "sideBarSectionHeader.foreground": palette['text'],
            "sideBarSectionHeader.border": palette['border'],

            // Activity Bar
            "activityBar.background": palette['bg'],
            "activityBar.foreground": palette['text'],
            "activityBar.inactiveForeground": palette['text-muted'],
            "activityBar.border": palette['border'],
            "activityBar.activeBorder": palette['accent'],

            // Tabs
            "editorGroupHeader.tabsBackground": palette['surface'],
            "tab.activeBackground": palette['bg'],
            "tab.activeForeground": palette['text'],
            "tab.inactiveBackground": palette['surface'],
            "tab.inactiveForeground": palette['text-muted'],
            "tab.border": palette['border'],
            "tab.activeBorderTop": palette['accent'],

            // Status Bar
            "statusBar.background": palette['bg'],
            "statusBar.foreground": palette['text-subtle'],
            "statusBar.border": palette['border'],

            // Title Bar
            "titleBar.activeBackground": palette['bg'],
            "titleBar.activeForeground": palette['text'],
            "titleBar.inactiveBackground": palette['bg'],
            "titleBar.inactiveForeground": palette['text-muted'],
            "titleBar.border": palette['border'],

            // Lists
            "list.activeSelectionBackground": palette['accent'] + "20",
            "list.activeSelectionForeground": palette['text'],
            "list.hoverBackground": palette['surface'],
            "list.inactiveSelectionBackground": palette['surface'],
        },
        "tokenColors": [
            {
                "scope": ["comment", "punctuation.definition.comment"],
                "settings": { "foreground": palette['text-muted'], "fontStyle": "italic" }
            },
            {
                "scope": ["string", "punctuation.definition.string"],
                "settings": { "foreground": palette['success'] }
            },
            {
                "scope": ["keyword", "storage.type", "storage.modifier"],
                "settings": { "foreground": palette['accent'], "fontStyle": "bold" }
            },
            {
                "scope": ["constant.numeric", "constant.language", "constant.character", "constant.other"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["variable", "variable.other", "variable.language"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["variable.parameter", "meta.parameters"],
                "settings": { "foreground": palette['text-subtle'] }
            },
            {
                "scope": ["entity.name.function", "support.function"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["entity.name.type", "entity.name.class", "support.type", "support.class"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["entity.name.tag", "punctuation.definition.tag"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["entity.other.attribute-name"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["entity.name.namespace", "entity.name.module"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["punctuation.separator", "punctuation.terminator", "punctuation.accessor"],
                "settings": { "foreground": palette['text-subtle'] }
            },
            {
                "scope": ["markup.heading", "entity.name.section"],
                "settings": { "foreground": palette['accent'], "fontStyle": "bold" }
            },
            {
                "scope": ["markup.bold"],
                "settings": { "foreground": palette['text'], "fontStyle": "bold" }
            },
            {
                "scope": ["markup.italic"],
                "settings": { "foreground": palette['text'], "fontStyle": "italic" }
            },
            {
                "scope": ["markup.inline.raw", "markup.fenced_code"],
                "settings": { "foreground": palette['success'] }
            },
            {
                "scope": ["markup.quote"],
                "settings": { "foreground": palette['text-subtle'], "fontStyle": "italic" }
            },
            {
                "scope": ["markup.list"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["markup.underline.link", "string.other.link"],
                "settings": { "foreground": palette['accent'], "fontStyle": "underline" }
            },
            {
                "scope": ["constant.character.escape", "constant.other.placeholder"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["string.regexp", "constant.regexp"],
                "settings": { "foreground": palette['warning'] }
            },
            {
                "scope": ["support.constant", "meta.property-name"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["entity.other.inherited-class"],
                "settings": { "foreground": palette['secondary'], "fontStyle": "italic" }
            },
            {
                "scope": ["storage", "storage.type.function"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["support.variable", "variable.other.readwrite"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["support.module", "support.node"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["punctuation.definition.template-expression"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["meta.embedded", "source.groovy.embedded"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["support.type.property-name", "meta.object-literal.key"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["entity.name.operator"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["keyword.operator"],
                "settings": { "foreground": palette['text-subtle'] }
            },
            {
                "scope": ["invalid", "invalid.illegal"],
                "settings": { "foreground": palette['error'] }
            },
            {
                "scope": ["invalid.deprecated"],
                "settings": { "foreground": palette['warning'] }
            },
            {
                "scope": ["meta.diff", "meta.diff.header"],
                "settings": { "foreground": palette['text-muted'], "fontStyle": "italic" }
            },
            {
                "scope": ["markup.inserted"],
                "settings": { "foreground": palette['success'] }
            },
            {
                "scope": ["markup.deleted"],
                "settings": { "foreground": palette['error'] }
            },
            {
                "scope": ["markup.changed"],
                "settings": { "foreground": palette['warning'] }
            },
            {
                "scope": ["meta.selector", "entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["support.type.property-name.css"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["constant.other.color"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["entity.other.attribute-name.html", "entity.other.attribute-name.xml"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["punctuation.definition.entity"],
                "settings": { "foreground": palette['text-muted'] }
            },
            {
                "scope": ["support.type.vendored.property-name"],
                "settings": { "foreground": palette['text-subtle'] }
            },
            {
                "scope": ["source.css support.type.property-name", "source.sass support.type.property-name", "source.scss support.type.property-name", "source.less support.type.property-name", "source.stylus support.type.property-name"],
                "settings": { "foreground": palette['text'] }
            },
            {
                "scope": ["support.constant.mathematical-symbols"],
                "settings": { "foreground": palette['secondary'] }
            },
            {
                "scope": ["token.info-token"],
                "settings": { "foreground": palette['accent'] }
            },
            {
                "scope": ["token.warn-token"],
                "settings": { "foreground": palette['warning'] }
            },
            {
                "scope": ["token.error-token"],
                "settings": { "foreground": palette['error'] }
            },
            {
                "scope": ["token.debug-token"],
                "settings": { "foreground": palette['text-muted'] }
            }
        ]
    };
}

// Ensure directories exist
if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir);
if (!fs.existsSync(themesDir)) fs.mkdirSync(themesDir);

// 2. Generate Themes
fs.writeFileSync(path.join(themesDir, 'Candi Light-color-theme.json'), JSON.stringify(generateTheme('Light', 'light', lightColors), null, 4));
fs.writeFileSync(path.join(themesDir, 'Candi Dark-color-theme.json'), JSON.stringify(generateTheme('Dark', 'dark', darkColors), null, 4));

// 3. Generate extension package.json

const version = require('../package.json').version;

const extensionPackage = {
    "name": "vscode-theme-candi",
    "displayName": "Candi Theme",
    "description": "Scandinavian design theme.",
    "repository": {
        "type": "git",
        "url": "https://github.com/wtasg/candi.git"
    },
    "version": version,
    "publisher": "wtasg",
    "engines": { "vscode": "^1.0.0" },
    "categories": ["Themes"],
    "contributes": {
        "themes": [
            {
                "label": "Candi Light",
                "uiTheme": "vs",
                "path": "./themes/Candi Light-color-theme.json"
            },
            {
                "label": "Candi Dark",
                "uiTheme": "vs-dark",
                "path": "./themes/Candi Dark-color-theme.json"
            }
        ]
    }
};

fs.writeFileSync(path.join(vscodeDir, 'package.json'), JSON.stringify(extensionPackage, null, 4));

console.log('Build complete!');
console.log('  - Generated vscode/ extension');
