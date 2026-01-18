/**
 * =============================================================================
 * Script Regression Tests
 * Verifies that all build scripts produce expected outputs with correct content
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const PROJECT_ROOT = path.join(__dirname, '..');

// Primitive color families that should exist in all platform outputs
const PRIMITIVE_FAMILIES = [
    'red', 'blue', 'green', 'yellow', 'magenta',
    'cyan', 'teal', 'pink', 'gold', 'silver'
];

let errors = 0;
let warnings = 0;

function pass(msg) { logger.log(`[✓] ${msg}`); }
function fail(msg) { logger.error(`[✗] ${msg}`); errors++; }
function warn(msg) { logger.warn(`[!] ${msg}`); warnings++; }

// =============================================================================
// Test Helpers
// =============================================================================

function fileExists(filePath) {
    return fs.existsSync(path.join(PROJECT_ROOT, filePath));
}

function readFile(filePath) {
    return fs.readFileSync(path.join(PROJECT_ROOT, filePath), 'utf8');
}

function countMatches(content, pattern) {
    const matches = content.match(pattern);
    return matches ? matches.length : 0;
}

// =============================================================================
// Build Output Existence Tests
// =============================================================================

function testBuildOutputs() {
    logger.log('\n--- Build Output Existence Tests ---\n');

    const expectedFiles = {
        // Core dist
        'dist/index.js': 'Core JS entry',
        'dist/index.mjs': 'Core ESM entry',
        'dist/colors.js': 'Color exports',
        'dist/colors.json': 'Color JSON',
        'dist/base.css': 'Base CSS',
        'dist/v4/theme.css': 'Tailwind v4 theme',

        // Flutter
        'flutter/lib/candi_colors.dart': 'Flutter library',
        'flutter/lib/candi.dart': 'Flutter entry point',

        // VSCode
        'vscode/themes/Candi Light-color-theme.json': 'VSCode light theme',
        'vscode/themes/Candi Dark-color-theme.json': 'VSCode dark theme',

        // Vim
        'vim/colors/candi-light.vim': 'Vim light colorscheme',
        'vim/colors/candi-dark.vim': 'Vim dark colorscheme',

        // KDE
        'kde/v5/CandiLight.colors': 'KDE v5 light',
        'kde/v5/CandiDark.colors': 'KDE v5 dark',
        'kde/v4/CandiLight.colors': 'KDE v4 light',
        'kde/v4/CandiDark.colors': 'KDE v4 dark',

        // Konsole
        'kde/konsole/CandiLight.colorscheme': 'Konsole light',
        'kde/konsole/CandiDark.colorscheme': 'Konsole dark',

        // GNOME
        'gnome/gtk-3.0/gtk.css': 'GTK3 light',
        'gnome/gtk-3.0/gtk-dark.css': 'GTK3 dark',
        'gnome/gtk-4.0/gtk.css': 'GTK4 light',
        'gnome/gtk-4.0/gtk-dark.css': 'GTK4 dark',
        'gnome/index.theme': 'GNOME index.theme',

        // Obsidian
        'obsidian/theme.css': 'Obsidian theme',
        'obsidian/manifest.json': 'Obsidian manifest'
    };

    let passed = 0;
    for (const [file, desc] of Object.entries(expectedFiles)) {
        if (fileExists(file)) {
            passed++;
        } else {
            fail(`Missing: ${file} (${desc})`);
        }
    }

    if (passed === Object.keys(expectedFiles).length) {
        pass(`All ${passed} expected build outputs exist`);
    }
}

// =============================================================================
// Primitive Color Regression Tests
// =============================================================================

function testPrimitiveColorsInVSCode() {
    logger.log('\n--- VSCode Primitive Colors ---\n');

    const darkTheme = readFile('vscode/themes/Candi Dark-color-theme.json');
    const theme = JSON.parse(darkTheme);
    const colors = theme.colors || {};

    // Check bracket pair colorization uses primitives
    const bracketColors = [
        'editorBracketHighlight.foreground1',
        'editorBracketHighlight.foreground2',
        'editorBracketHighlight.foreground3',
        'editorBracketHighlight.foreground4',
        'editorBracketHighlight.foreground5',
        'editorBracketHighlight.foreground6'
    ];

    let found = 0;
    for (const key of bracketColors) {
        if (colors[key]) found++;
    }

    if (found === bracketColors.length) {
        pass(`VSCode has all ${bracketColors.length} bracket colors defined`);
    } else {
        fail(`VSCode missing bracket colors: expected ${bracketColors.length}, found ${found}`);
    }
}

function testPrimitiveColorsInVim() {
    logger.log('\n--- Vim Primitive Colors ---\n');

    const darkVim = readFile('vim/colors/candi-dark.vim');

    // Check rainbow bracket colors
    const rainbowColors = countMatches(darkVim, /hi rainbowcol\d/g);
    if (rainbowColors >= 6) {
        pass(`Vim has ${rainbowColors} rainbow bracket colors`);
    } else {
        fail(`Vim missing rainbow colors: expected >= 6, found ${rainbowColors}`);
    }

    // Check Candi* primitive highlight groups
    const candiGroups = countMatches(darkVim, /hi Candi\w+/g);
    if (candiGroups >= 20) {
        pass(`Vim has ${candiGroups} Candi* highlight groups`);
    } else {
        fail(`Vim missing Candi* groups: expected >= 20, found ${candiGroups}`);
    }
}

function testPrimitiveColorsInKDE() {
    logger.log('\n--- KDE Primitive Colors ---\n');

    const kdeDark = readFile('kde/v5/CandiDark.colors');

    // Check [Colors:Candi] section exists
    if (kdeDark.includes('[Colors:Candi]')) {
        pass('KDE has [Colors:Candi] section');
    } else {
        fail('KDE missing [Colors:Candi] section');
    }

    // Check all primitive families
    let found = 0;
    for (const family of PRIMITIVE_FAMILIES) {
        const pattern = new RegExp(`^${family.charAt(0).toUpperCase() + family.slice(1)}=`, 'mi');
        if (pattern.test(kdeDark)) found++;
    }

    if (found === PRIMITIVE_FAMILIES.length) {
        pass(`KDE has all ${PRIMITIVE_FAMILIES.length} primitive color families`);
    } else {
        fail(`KDE missing primitive families: expected ${PRIMITIVE_FAMILIES.length}, found ${found}`);
    }
}

function testPrimitiveColorsInKonsole() {
    logger.log('\n--- Konsole Primitive Colors ---\n');

    const konsoleDark = readFile('kde/konsole/CandiDark.colorscheme');

    // Check [Candi] section exists
    if (konsoleDark.includes('[Candi]')) {
        pass('Konsole has [Candi] section');
    } else {
        fail('Konsole missing [Candi] section');
    }

    // Check primitive families
    let found = 0;
    for (const family of PRIMITIVE_FAMILIES) {
        const pattern = new RegExp(`^${family.charAt(0).toUpperCase() + family.slice(1)}=`, 'mi');
        if (pattern.test(konsoleDark)) found++;
    }

    if (found === PRIMITIVE_FAMILIES.length) {
        pass(`Konsole has all ${PRIMITIVE_FAMILIES.length} primitive color families`);
    } else {
        fail(`Konsole missing primitive families: expected ${PRIMITIVE_FAMILIES.length}, found ${found}`);
    }
}

function testPrimitiveColorsInGNOME() {
    logger.log('\n--- GNOME Primitive Colors ---\n');

    const gtkDark = readFile('gnome/gtk-3.0/gtk-dark.css');

    // Check @define-color candi_* variables
    let found = 0;
    for (const family of PRIMITIVE_FAMILIES) {
        const pattern = new RegExp(`@define-color candi_${family}`, 'i');
        if (pattern.test(gtkDark)) found++;
    }

    if (found === PRIMITIVE_FAMILIES.length) {
        pass(`GNOME has all ${PRIMITIVE_FAMILIES.length} candi_* color definitions`);
    } else {
        fail(`GNOME missing candi_* colors: expected ${PRIMITIVE_FAMILIES.length}, found ${found}`);
    }
}

function testPrimitiveColorsInObsidian() {
    logger.log('\n--- Obsidian Primitive Colors ---\n');

    const obsidianTheme = readFile('obsidian/theme.css');

    // Check --candi-* CSS variables in both light and dark
    const candiVars = countMatches(obsidianTheme, /--candi-\w+:/g);

    if (candiVars >= 20) {
        pass(`Obsidian has ${candiVars} --candi-* CSS variables`);
    } else {
        fail(`Obsidian missing --candi-* variables: expected >= 20, found ${candiVars}`);
    }

    // Check both themes have primitive section
    const lightHasPrimitives = obsidianTheme.includes('.theme-light') &&
        obsidianTheme.includes('--candi-red');
    const darkHasPrimitives = obsidianTheme.includes('.theme-dark') &&
        obsidianTheme.indexOf('--candi-red', obsidianTheme.indexOf('.theme-dark')) > 0;

    if (lightHasPrimitives && darkHasPrimitives) {
        pass('Obsidian has primitives in both light and dark themes');
    } else {
        fail('Obsidian missing primitives in one or both themes');
    }
}

function testPrimitiveColorsInFlutter() {
    logger.log('\n--- Flutter Primitive Colors ---\n');

    const flutterLib = readFile('flutter/lib/candi_colors.dart');

    // Check all primitive families exist
    let found = 0;
    for (const family of PRIMITIVE_FAMILIES) {
        // Check for the base color (e.g., "final CandiColor red")
        const pattern = new RegExp(`final CandiColor ${family}`, 'i');
        if (pattern.test(flutterLib)) found++;
    }

    if (found === PRIMITIVE_FAMILIES.length) {
        pass(`Flutter has all ${PRIMITIVE_FAMILIES.length} primitive color families`);
    } else {
        fail(`Flutter missing primitive families: expected ${PRIMITIVE_FAMILIES.length}, found ${found}`);
    }

    // Check variants exist (subtle, strong, etc.)
    const variants = ['Subtle', 'Soft', 'Strong', 'Outline'];
    let variantCount = 0;
    for (const variant of variants) {
        const pattern = new RegExp(`final CandiColor red${variant}`, 'i');
        if (pattern.test(flutterLib)) variantCount++;
    }

    if (variantCount >= 4) {
        pass(`Flutter has ${variantCount} color variants per family`);
    } else {
        warn(`Flutter may be missing some color variants: found ${variantCount}`);
    }
}

// =============================================================================
// Color Count Consistency Tests
// =============================================================================

function testColorCountConsistency() {
    logger.log('\n--- Color Count Consistency ---\n');

    // Load source colors
    const colorsJs = require('../src/data/colors');
    const lightCount = Object.keys(colorsJs.light).length;
    const darkCount = Object.keys(colorsJs.dark).length;

    if (lightCount === darkCount) {
        pass(`Light/dark parity: ${lightCount} colors each`);
    } else {
        fail(`Light/dark mismatch: light=${lightCount}, dark=${darkCount}`);
    }

    // Check expected total (original 63 + 60 primitives = 123+)
    if (lightCount >= 120) {
        pass(`Total colors: ${lightCount} (includes primitives)`);
    } else {
        fail(`Expected 120+ colors, found ${lightCount}`);
    }

    // Check colors.json matches
    const colorsJson = JSON.parse(readFile('dist/colors.json'));
    const jsonLightCount = Object.keys(colorsJson.light).length;
    const jsonDarkCount = Object.keys(colorsJson.dark).length;

    if (jsonLightCount === lightCount && jsonDarkCount === darkCount) {
        pass('colors.json matches source color count');
    } else {
        fail(`colors.json mismatch: source=${lightCount}, json=${jsonLightCount}`);
    }
}

// =============================================================================
// Build Script Error Detection
// =============================================================================

function testBuildScriptSyntax() {
    logger.log('\n--- Build Script Syntax Validation ---\n');

    const buildScripts = [
        'build.js',
        'build-flutter.js',
        'build-vscode.js',
        'build-vim.js',
        'build-kde.js',
        'build-konsole.js',
        'build-gnome.js',
        'build-obsidian.js',
        'build-docs.js',
        'sync-colors.js',
        'color-conv.js'
    ];

    let passed = 0;
    for (const script of buildScripts) {
        try {
            require(`./${script}`);
            // If it requires without error, syntax is valid
            // (build scripts may execute on require, but that's OK)
            passed++;
        } catch (err) {
            if (err.code === 'MODULE_NOT_FOUND' && !err.message.includes(script)) {
                // Missing dependency, not syntax error
                passed++;
            } else if (err instanceof SyntaxError) {
                fail(`Syntax error in ${script}: ${err.message}`);
            } else {
                // Runtime error during execution is OK for this test
                passed++;
            }
        }
    }

    pass(`${passed}/${buildScripts.length} build scripts have valid syntax`);
}

// =============================================================================
// Main Test Runner
// =============================================================================

logger.log('='.repeat(60));
logger.log('  SCRIPT REGRESSION TESTS');
logger.log('='.repeat(60));

testBuildOutputs();
testBuildScriptSyntax();
testColorCountConsistency();
testPrimitiveColorsInVSCode();
testPrimitiveColorsInVim();
testPrimitiveColorsInKDE();
testPrimitiveColorsInKonsole();
testPrimitiveColorsInGNOME();
testPrimitiveColorsInObsidian();
testPrimitiveColorsInFlutter();

// Summary
logger.log('\n' + '='.repeat(60));
logger.log('  SUMMARY');
logger.log('='.repeat(60));
logger.log(`Errors: ${errors}`);
logger.log(`Warnings: ${warnings}`);

if (errors > 0) {
    logger.dump();
    logger.error(`\n[✗] Script regression tests FAILED (${errors} errors)`);
    process.exit(1);
} else {
    if (logger.isVerbose) {
        logger.log('\n[✓] All script regression tests PASSED');
    }
    process.exit(0);
}
