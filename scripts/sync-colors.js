#!/usr/bin/env node

/**
 * Sync Colors Script
 *
 * Generates:
 * - src/css/base.css (variables)
 * - src/v4/theme.css (@theme block and root)
 * - dist/colors.json (data for website/tools)
 */

const fs = require('fs');
const path = require('path');
const palette = require('../src/data/colors');

const baseCssPath = path.join(__dirname, '..', 'src', 'css', 'base.css');
const v4ThemePath = path.join(__dirname, '..', 'src', 'v4', 'theme.css');
const distDir = path.join(__dirname, '..', 'dist');

// Ensure dist exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

function toKebab(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function replaceBetween(content, startMarker, endMarker, replacement) {
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1) {
        console.warn(`Markers ${startMarker} or ${endMarker} not found.`);
        return content;
    }
    return content.substring(0, startIdx + startMarker.length) + '\n' + replacement + '    ' + content.substring(endIdx);
}

// Generate CSS Variable Blocks
function generateVars(modePalette, prefix = '--candi-') {
    let css = '';
    for (const [key, data] of Object.entries(modePalette)) {
        const value = data.oklch || data.value;
        css += `    ${prefix}${toKebab(key)}: ${value};\n`;
    }
    return css;
}


function generateVarMap(modePalette) {
    let css = '';
    for (const key of Object.keys(modePalette)) {
        css += `    --color-candi-${toKebab(key)}: var(--candi-${toKebab(key)});\n`;
    }
    return css;
}


// 1. Update base.css
let baseCss = fs.readFileSync(baseCssPath, 'utf8');
baseCss = replaceBetween(baseCss, '/* @tokens-start-light */', '/* @tokens-end-light */', generateVars(palette.light));
baseCss = replaceBetween(baseCss, '/* @tokens-start-dark */', '/* @tokens-end-dark */', generateVars(palette.dark));
fs.writeFileSync(baseCssPath, baseCss);

// 2. Update v4/theme.css
let v4Theme = fs.readFileSync(v4ThemePath, 'utf8');
v4Theme = replaceBetween(v4Theme, '/* @tokens-start-v4 */', '/* @tokens-end-v4 */', generateVars(palette.light, '--color-candi-'));
v4Theme = replaceBetween(v4Theme, '/* @tokens-start-root */', '/* @tokens-end-root */', generateVars(palette.light));
v4Theme = replaceBetween(v4Theme, '/* @tokens-start-v4-map */', '/* @tokens-end-v4-map */', generateVarMap(palette.light));
v4Theme = replaceBetween(v4Theme, '/* @tokens-start-dark-root */', '/* @tokens-end-dark-root */', generateVars(palette.dark));
v4Theme = replaceBetween(v4Theme, '/* @tokens-start-v4-map-dark */', '/* @tokens-end-v4-map-dark */', generateVarMap(palette.light)); // Map to same vars
fs.writeFileSync(v4ThemePath, v4Theme);

// 3. Generate Colors Data
const { parseOklch } = require('./color-conv');
const exportedPalette = { light: {}, dark: {} };

for (const mode of ['light', 'dark']) {
    for (const [key, data] of Object.entries(palette[mode])) {
        if (data.oklch) {
            const parsed = parseOklch(data.oklch);
            exportedPalette[mode][key] = {
                ...data,
                l: Math.round(parsed.l * 1000) / 10,
                c: Math.round(parsed.c * 1000) / 1000,
                h: Math.round(parsed.h * 10) / 10
            };
        } else {
            exportedPalette[mode][key] = data;
        }
    }
}

const paletteJson = JSON.stringify(exportedPalette, null, 2);
fs.writeFileSync(path.join(distDir, 'colors.json'), paletteJson);
fs.writeFileSync(path.join(distDir, 'colors.js'), `module.exports = ${paletteJson};\n`);
fs.writeFileSync(path.join(distDir, 'colors.mjs'), `export default ${paletteJson};\n`);

console.log('Colors synchronized successfully!');
