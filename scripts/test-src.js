#!/usr/bin/env node
/**
 * Source File Regression Tests
 *
 * Comprehensive tests for src/ files to track regressions and document issues.
 * Run with: npm run test:src
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

const srcDir = path.join(__dirname, '..', 'src');

console.log('=== Source File Regression Tests ===\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let knownIssues = [];

function pass(message) {
    totalTests++;
    passedTests++;
    console.log(`[✓] ${message}`);
}

function fail(message) {
    totalTests++;
    failedTests++;
    console.error(`[✗] ${message}`);
}

function knownIssue(message) {
    knownIssues.push(message);
    console.log(`[KNOWN ISSUE] ${message}`);
}

function section(name) {
    console.log(`\n--- ${name} ---`);
}

// ============================================================
// Test 1: colors.js
// ============================================================
section('colors.js Tests');

const palette = require(path.join(srcDir, 'data', 'colors.js'));

// Test: Light and dark palettes exist
if (palette.light && typeof palette.light === 'object') {
    pass('Light palette exists');
} else {
    fail('Light palette missing or invalid');
}

if (palette.dark && typeof palette.dark === 'object') {
    pass('Dark palette exists');
} else {
    fail('Dark palette missing or invalid');
}

// Test: Expected color tokens exist
const expectedTokens = [
    'bg', 'surface', 'elevated', 'text', 'textSubtle', 'textMuted',
    'border', 'borderStrong', 'divider', 'accent', 'accentSubtle', 'onAccent',
    'secondary', 'secondarySubtle', 'onSecondary', 'success', 'onSuccess',
    'warning', 'onWarning', 'error', 'onError', 'info', 'onInfo',
    'link', 'disabled', 'overlay', 'scrim', 'inverseSurface', 'inverseText',
    'shadow', 'shadowMd', 'shadowLg', 'shadowColor', 'focusRing',
    'syntaxKeyword', 'syntaxType', 'syntaxVar', 'syntaxConst', 'syntaxFunc', 'syntaxString',
    'hover', 'active',
    'terminalBlack', 'terminalRed', 'terminalGreen', 'terminalYellow',
    'terminalBlue', 'terminalMagenta', 'terminalCyan', 'terminalWhite',
    // Primitive Colors with variations
    'red', 'redSubtle', 'redSoft', 'redStrong', 'redOutline', 'onRed',
    'blue', 'blueSubtle', 'blueSoft', 'blueStrong', 'blueOutline', 'onBlue',
    'green', 'greenSubtle', 'greenSoft', 'greenStrong', 'greenOutline', 'onGreen',
    'yellow', 'yellowSubtle', 'yellowSoft', 'yellowStrong', 'yellowOutline', 'onYellow',
    'magenta', 'magentaSubtle', 'magentaSoft', 'magentaStrong', 'magentaOutline', 'onMagenta',
    'cyan', 'cyanSubtle', 'cyanSoft', 'cyanStrong', 'cyanOutline', 'onCyan',
    'teal', 'tealSubtle', 'tealSoft', 'tealStrong', 'tealOutline', 'onTeal',
    'pink', 'pinkSubtle', 'pinkSoft', 'pinkStrong', 'pinkOutline', 'onPink',
    'gold', 'goldSubtle', 'goldSoft', 'goldStrong', 'goldOutline', 'onGold',
    'silver', 'silverSubtle', 'silverSoft', 'silverStrong', 'silverOutline', 'onSilver'
];

let lightMissing = [];
let darkMissing = [];

for (const token of expectedTokens) {
    if (!palette.light[token]) lightMissing.push(token);
    if (!palette.dark[token]) darkMissing.push(token);
}

if (lightMissing.length === 0) {
    pass(`Light palette has all ${expectedTokens.length} expected tokens`);
} else {
    fail(`Light palette missing tokens: ${lightMissing.join(', ')}`);
}

if (darkMissing.length === 0) {
    pass(`Dark palette has all ${expectedTokens.length} expected tokens`);
} else {
    fail(`Dark palette missing tokens: ${darkMissing.join(', ')}`);
}

// Test: OKLCH format validation
const oklchRegex = /^oklch\(\d+(\.\d+)?%\s+\d+(\.\d+)?\s+\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?\)$/;

let formatErrors = [];
for (const mode of ['light', 'dark']) {
    for (const [key, value] of Object.entries(palette[mode])) {
        if (value.oklch && !oklchRegex.test(value.oklch)) {
            formatErrors.push(`${mode}.${key}: ${value.oklch}`);
        }
    }
}

if (formatErrors.length === 0) {
    pass('All OKLCH values have valid format');
} else {
    fail(`Invalid OKLCH format: ${formatErrors.slice(0, 3).join('; ')}${formatErrors.length > 3 ? ` (+${formatErrors.length - 3} more)` : ''}`);
}

// Test: Light/dark mode parity
const lightKeys = Object.keys(palette.light).sort();
const darkKeys = Object.keys(palette.dark).sort();

if (JSON.stringify(lightKeys) === JSON.stringify(darkKeys)) {
    pass('Light and dark modes have matching token keys');
} else {
    const onlyLight = lightKeys.filter(k => !darkKeys.includes(k));
    const onlyDark = darkKeys.filter(k => !lightKeys.includes(k));
    fail(`Token key mismatch - Light only: [${onlyLight.join(', ')}], Dark only: [${onlyDark.join(', ')}]`);
}

// ============================================================
// Test 2: theme.js
// ============================================================
section('theme.js Tests');

const theme = require(path.join(srcDir, 'theme.js'));

// Test: Expected structure
const expectedThemeKeys = ['colors', 'spacing', 'fontFamily', 'fontSize', 'lineHeight', 'minHeight', 'borderRadius', 'boxShadow', 'transitionDuration'];
let themeMissing = expectedThemeKeys.filter(k => !theme[k]);

if (themeMissing.length === 0) {
    pass(`Theme has all ${expectedThemeKeys.length} expected keys`);
} else {
    fail(`Theme missing keys: ${themeMissing.join(', ')}`);
}

// Test: colors.candi uses var() format
if (theme.colors && theme.colors.candi) {
    const candiColors = theme.colors.candi;
    let varFormatErrors = [];

    for (const [key, value] of Object.entries(candiColors)) {
        if (!value.startsWith('var(--candi-')) {
            varFormatErrors.push(key);
        }
    }

    if (varFormatErrors.length === 0) {
        pass('All candi colors use var(--candi-*) format');
    } else {
        fail(`Colors not using var() format: ${varFormatErrors.join(', ')}`);
    }
} else {
    fail('theme.colors.candi missing');
}

// Test: Terminal colors in theme reference CSS variables
const terminalThemeTokens = ['terminal-black', 'terminal-red', 'terminal-green', 'terminal-yellow',
    'terminal-blue', 'terminal-magenta', 'terminal-cyan', 'terminal-white'];
let terminalMissing = [];

if (theme.colors && theme.colors.candi) {
    for (const token of terminalThemeTokens) {
        if (!theme.colors.candi[token]) {
            terminalMissing.push(token);
        }
    }
}

if (terminalMissing.length === 0) {
    pass('Theme includes all terminal color tokens');
} else {
    fail(`Theme missing terminal tokens: ${terminalMissing.join(', ')}`);
}

// ============================================================
// Test 3: plugin.js
// ============================================================
section('plugin.js Tests');

const plugin = require(path.join(srcDir, 'plugin.js'));

// Test: Exports a function (Tailwind plugin wrapper)
if (typeof plugin === 'function' || (plugin && typeof plugin.handler === 'function')) {
    pass('plugin.js exports a Tailwind plugin');
} else {
    fail('plugin.js does not export a valid Tailwind plugin');
}

// Test: Plugin source contains :root and .dark
const pluginSource = fs.readFileSync(path.join(srcDir, 'plugin.js'), 'utf8');

if (pluginSource.includes("':root'") || pluginSource.includes('":root"')) {
    pass('Plugin defines :root CSS properties');
} else {
    fail('Plugin missing :root CSS properties');
}

if (pluginSource.includes("'.dark'") || pluginSource.includes('".dark"')) {
    pass('Plugin defines .dark CSS properties');
} else {
    fail('Plugin missing .dark CSS properties');
}

// Test: Plugin should include terminal colors (known missing issue)
if (pluginSource.includes('--candi-terminal-')) {
    pass('Plugin includes terminal color variables');
} else {
    knownIssue('Plugin does not define --candi-terminal-* variables (missing feature)');
}

// ============================================================
// Test 4: types.d.ts
// ============================================================
section('types.d.ts Tests');

const typesContent = fs.readFileSync(path.join(srcDir, 'types.d.ts'), 'utf8');

// Test: CandiColorTokens interface exists
if (typesContent.includes('interface CandiColorTokens')) {
    pass('CandiColorTokens interface exists');
} else {
    fail('CandiColorTokens interface missing');
}

// Test: CandiTheme interface exists
if (typesContent.includes('interface CandiTheme')) {
    pass('CandiTheme interface exists');
} else {
    fail('CandiTheme interface missing');
}

// Test: Check for missing tokens in TypeScript definitions
const themeTokens = theme.colors?.candi ? Object.keys(theme.colors.candi) : [];
const missingFromTypes = [];

// Parse interface members (simplified)
const interfaceMatch = typesContent.match(/interface CandiColorTokens\s*{([^}]+)}/);
if (interfaceMatch) {
    const interfaceBody = interfaceMatch[1];
    for (const token of themeTokens) {
        // Convert camelCase to kebab-case for comparison
        const kebabToken = token.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        if (!interfaceBody.includes(token) && !interfaceBody.includes(`'${kebabToken}'`) && !interfaceBody.includes(`"${kebabToken}"`)) {
            missingFromTypes.push(token);
        }
    }
}

if (missingFromTypes.length === 0) {
    pass('TypeScript definitions include all theme tokens');
} else {
    knownIssue(`TypeScript definitions missing ${missingFromTypes.length} tokens: ${missingFromTypes.slice(0, 5).join(', ')}${missingFromTypes.length > 5 ? '...' : ''}`);
}

// ============================================================
// Test 5: CSS Files
// ============================================================
section('CSS Files Tests');

// Test: base.css structure
const baseCss = fs.readFileSync(path.join(srcDir, 'css', 'base.css'), 'utf8');

if (baseCss.includes('@tokens-start-light') && baseCss.includes('@tokens-end-light')) {
    pass('base.css has light mode token markers');
} else {
    fail('base.css missing light mode token markers');
}

if (baseCss.includes('@tokens-start-dark') && baseCss.includes('@tokens-end-dark')) {
    pass('base.css has dark mode token markers');
} else {
    fail('base.css missing dark mode token markers');
}

// Test: Detect duplicate variable definitions (known issue)
function findDuplicateVars(css) {
    const varRegex = /--(candi-[\w-]+):/g;
    const varCounts = {};
    let match;

    while ((match = varRegex.exec(css)) !== null) {
        const varName = match[1];
        varCounts[varName] = (varCounts[varName] || 0) + 1;
    }

    return Object.entries(varCounts).filter(([_, count]) => count > 2).map(([name]) => name);
}

const baseDuplicates = findDuplicateVars(baseCss);
if (baseDuplicates.length === 0) {
    pass('base.css has no excessively duplicated variables');
} else {
    knownIssue(`base.css has duplicated terminal variables: ${baseDuplicates.join(', ')}`);
}

// Test: components.css has expected classes
const componentsCss = fs.readFileSync(path.join(srcDir, 'css', 'components.css'), 'utf8');
const expectedComponents = ['.candi-card', '.candi-btn', '.candi-input', '.candi-nav', '.candi-badge'];

let componentMissing = expectedComponents.filter(c => !componentsCss.includes(c));
if (componentMissing.length === 0) {
    pass(`components.css has all ${expectedComponents.length} expected component classes`);
} else {
    fail(`components.css missing classes: ${componentMissing.join(', ')}`);
}

// Test: utilities.css has expected classes
const utilitiesCss = fs.readFileSync(path.join(srcDir, 'css', 'utilities.css'), 'utf8');
const expectedUtilities = ['.candi-surface', '.candi-elevated', '.candi-shadow', '.candi-rounded'];

let utilityMissing = expectedUtilities.filter(u => !utilitiesCss.includes(u));
if (utilityMissing.length === 0) {
    pass(`utilities.css has all ${expectedUtilities.length} expected utility classes`);
} else {
    fail(`utilities.css missing classes: ${utilityMissing.join(', ')}`);
}

// ============================================================
// Test 6: v4/ Files
// ============================================================
section('v4/ Files Tests');

// Test: v4/theme.css structure
const v4ThemeCss = fs.readFileSync(path.join(srcDir, 'v4', 'theme.css'), 'utf8');

if (v4ThemeCss.includes('@theme {')) {
    pass('v4/theme.css has @theme block');
} else {
    fail('v4/theme.css missing @theme block');
}

if (v4ThemeCss.includes(':root {')) {
    pass('v4/theme.css has :root block');
} else {
    fail('v4/theme.css missing :root block');
}

if (v4ThemeCss.includes('.dark {')) {
    pass('v4/theme.css has .dark block');
} else {
    fail('v4/theme.css missing .dark block');
}

// Test: v4/theme.css uses --color-candi-* naming
if (v4ThemeCss.includes('--color-candi-')) {
    pass('v4/theme.css uses Tailwind v4 variable naming (--color-candi-*)');
} else {
    fail('v4/theme.css missing Tailwind v4 variable naming');
}

// Test: Detect duplicate variables in v4/theme.css
const v4Duplicates = findDuplicateVars(v4ThemeCss);
if (v4Duplicates.length === 0) {
    pass('v4/theme.css has no excessively duplicated variables');
} else {
    knownIssue(`v4/theme.css has duplicated terminal variables: ${v4Duplicates.join(', ')}`);
}

// Test: v4/index.js exports themePath
const v4Index = require(path.join(srcDir, 'v4', 'index.js'));
if (v4Index.themePath && typeof v4Index.themePath === 'string') {
    pass('v4/index.js exports themePath');
} else {
    fail('v4/index.js missing themePath export');
}

// ============================================================
// Test 7: KDE Theme Files
// ============================================================
section('KDE Theme Tests');

const kdeDir = path.join(__dirname, '..', 'kde');

// Test: KDE directory structure
const kdeV4Dir = path.join(kdeDir, 'v4');
const kdeV5Dir = path.join(kdeDir, 'v5');

if (fs.existsSync(kdeV4Dir) && fs.existsSync(kdeV5Dir)) {
    pass('KDE v4 and v5 directories exist');
} else {
    fail('KDE v4/v5 directories missing');
}

// Test: KDE theme files exist
const kdeFiles = [
    path.join(kdeV4Dir, 'CandiLight.colors'),
    path.join(kdeV4Dir, 'CandiDark.colors'),
    path.join(kdeV5Dir, 'CandiLight.colors'),
    path.join(kdeV5Dir, 'CandiDark.colors')
];

const kdeMissingFiles = kdeFiles.filter(f => !fs.existsSync(f));
if (kdeMissingFiles.length === 0) {
    pass('All KDE theme files exist (v4 + v5)');
} else {
    fail(`Missing KDE files: ${kdeMissingFiles.map(f => path.basename(f)).join(', ')}`);
}

// Test: KDE dark theme structure
if (fs.existsSync(kdeFiles[1])) {
    const kdeDarkContent = fs.readFileSync(kdeFiles[1], 'utf8');
    const requiredSections = ['[General]', '[Colors:Window]', '[Colors:Button]', '[Colors:Selection]', '[WM]'];
    const missingSections = requiredSections.filter(s => !kdeDarkContent.includes(s));

    if (missingSections.length === 0) {
        pass('KDE dark theme has all required sections');
    } else {
        fail(`KDE dark theme missing sections: ${missingSections.join(', ')}`);
    }

    // Test: KDE theme metadata
    if (kdeDarkContent.includes('Name=Candi Dark')) {
        pass('KDE dark theme has correct Name metadata');
    } else {
        fail('KDE dark theme missing Name metadata');
    }

    // Test: KDE color format (R,G,B)
    const rgbPattern = /BackgroundNormal=(\d+),(\d+),(\d+)/;
    const bgMatch = kdeDarkContent.match(rgbPattern);
    if (bgMatch) {
        const [, r, g, b] = bgMatch.map(Number);
        if (r <= 255 && g <= 255 && b <= 255 && r < 50) {
            pass('KDE dark theme has valid dark background color');
        } else {
            fail(`KDE dark theme background too bright: ${r},${g},${b}`);
        }
    } else {
        fail('KDE dark theme missing BackgroundNormal');
    }
}

// Test: v4 and v5 parity
if (fs.existsSync(kdeFiles[0]) && fs.existsSync(kdeFiles[2])) {
    const v4Light = fs.readFileSync(kdeFiles[0], 'utf8');
    const v5Light = fs.readFileSync(kdeFiles[2], 'utf8');

    if (v4Light === v5Light) {
        pass('KDE v4 and v5 light themes are identical');
    } else {
        knownIssue('KDE v4 and v5 light themes differ');
    }
}

// ============================================================
// Test 8: Flutter Package
// ============================================================
section('Flutter Package Tests');

const flutterDir = path.join(__dirname, '..', 'flutter');

// Test: Flutter package structure
const flutterFiles = [
    path.join(flutterDir, 'pubspec.yaml'),
    path.join(flutterDir, 'lib', 'candi.dart'),
    path.join(flutterDir, 'lib', 'candi_colors.dart')
];

const flutterMissing = flutterFiles.filter(f => !fs.existsSync(f));
if (flutterMissing.length === 0) {
    pass('Flutter package structure complete');
} else {
    fail(`Flutter missing files: ${flutterMissing.map(f => path.basename(f)).join(', ')}`);
}

// Test: pubspec.yaml structure
if (fs.existsSync(flutterFiles[0])) {
    const pubspec = fs.readFileSync(flutterFiles[0], 'utf8');

    if (pubspec.includes('name: candi_colors')) {
        pass('Flutter pubspec has correct package name');
    } else {
        fail('Flutter pubspec missing package name');
    }

    if (pubspec.includes('flutter:')) {
        pass('Flutter pubspec has flutter dependency');
    } else {
        fail('Flutter pubspec missing flutter dependency');
    }
}

// Test: candi_colors.dart structure
if (fs.existsSync(flutterFiles[2])) {
    const candiColors = fs.readFileSync(flutterFiles[2], 'utf8');

    // Test: CandiColor class exists
    if (candiColors.includes('class CandiColor')) {
        pass('Flutter CandiColor class exists');
    } else {
        fail('Flutter CandiColor class missing');
    }

    // Test: CandiPalette class exists
    if (candiColors.includes('class CandiPalette')) {
        pass('Flutter CandiPalette class exists');
    } else {
        fail('Flutter CandiPalette class missing');
    }

    // Test: CandiColors class exists with light/dark
    if (candiColors.includes('class CandiColors') &&
        candiColors.includes('static const light') &&
        candiColors.includes('static const dark')) {
        pass('Flutter CandiColors has light and dark palettes');
    } else {
        fail('Flutter CandiColors missing light/dark palettes');
    }

    // Test: toColorScheme method exists
    if (candiColors.includes('ColorScheme toColorScheme')) {
        pass('Flutter has toColorScheme() method');
    } else {
        fail('Flutter missing toColorScheme() method');
    }

    // Test: Terminal colors (Flutter package focuses on core colors, terminal colors may not be present)
    const terminalTokens = ['terminalBlack', 'terminalRed', 'terminalGreen', 'terminalWhite'];
    const flutterTerminalMissing = terminalTokens.filter(t => !candiColors.includes(t));

    if (flutterTerminalMissing.length === 0) {
        pass('Flutter has terminal color tokens');
    } else {
        knownIssue('Flutter package focuses on core UI colors (terminal colors not included)');
    }
}

// Test: Flutter test file exists
const flutterTestFile = path.join(flutterDir, 'test', 'candi_colors_test.dart');
if (fs.existsSync(flutterTestFile)) {
    pass('Flutter test file exists');
} else {
    fail('Flutter test file missing');
}

// ============================================================
// Test 9: VSCode Extension
// ============================================================
section('VSCode Extension Tests');

const vscodeDir = path.join(__dirname, '..', 'vscode');

// Test: VSCode directory structure
const vscodeFiles = [
    path.join(vscodeDir, 'package.json'),
    path.join(vscodeDir, 'themes', 'Candi Light-color-theme.json'),
    path.join(vscodeDir, 'themes', 'Candi Dark-color-theme.json')
];

const vscodeMissing = vscodeFiles.filter(f => !fs.existsSync(f));
if (vscodeMissing.length === 0) {
    pass('VSCode extension structure complete');
} else {
    fail(`VSCode missing files: ${vscodeMissing.map(f => path.basename(f)).join(', ')}`);
}

// Test: VSCode package.json
if (fs.existsSync(vscodeFiles[0])) {
    const vscodePkg = JSON.parse(fs.readFileSync(vscodeFiles[0], 'utf8'));

    if (vscodePkg.name === 'vscode-theme-candi') {
        pass('VSCode package has correct name');
    } else {
        fail(`VSCode package name incorrect: ${vscodePkg.name}`);
    }

    if (vscodePkg.contributes?.themes?.length === 2) {
        pass('VSCode package contributes 2 themes');
    } else {
        fail('VSCode package should contribute 2 themes');
    }
}

// Test: VSCode dark theme structure
if (fs.existsSync(vscodeFiles[2])) {
    const vscodeDark = JSON.parse(fs.readFileSync(vscodeFiles[2], 'utf8'));

    if (vscodeDark.type === 'dark') {
        pass('VSCode dark theme has correct type');
    } else {
        fail(`VSCode dark theme type incorrect: ${vscodeDark.type}`);
    }

    // Test: Required color keys
    const requiredColors = ['editor.background', 'editor.foreground', 'activityBar.background'];
    const missingColors = requiredColors.filter(c => !vscodeDark.colors?.[c]);

    if (missingColors.length === 0) {
        pass('VSCode dark theme has required editor colors');
    } else {
        fail(`VSCode dark theme missing colors: ${missingColors.join(', ')}`);
    }

    // Test: Token colors exist
    if (vscodeDark.tokenColors && vscodeDark.tokenColors.length > 0) {
        pass(`VSCode dark theme has ${vscodeDark.tokenColors.length} token color rules`);
    } else {
        fail('VSCode dark theme missing tokenColors');
    }

    // Test: Terminal colors exist
    if (vscodeDark.colors?.['terminal.ansiBlack'] && vscodeDark.colors?.['terminal.ansiWhite']) {
        pass('VSCode dark theme has terminal colors');
    } else {
        fail('VSCode dark theme missing terminal colors');
    }
}

// Test: VSCode light theme structure
if (fs.existsSync(vscodeFiles[1])) {
    const vscodeLight = JSON.parse(fs.readFileSync(vscodeFiles[1], 'utf8'));

    if (vscodeLight.type === 'light') {
        pass('VSCode light theme has correct type');
    } else {
        fail(`VSCode light theme type incorrect: ${vscodeLight.type}`);
    }
}

// ============================================================
// Summary
// ============================================================
console.log('\n' + '='.repeat(50));
console.log('SUMMARY');
console.log('='.repeat(50));
console.log(`Total tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Known issues: ${knownIssues.length}`);

if (knownIssues.length > 0) {
    console.log('\nKnown Issues (documented, not failures):');
    knownIssues.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
}

if (failedTests > 0) {
    console.log('\n[✗] Some tests failed!');
    process.exit(1);
} else {
    console.log('\n[✓] All tests passed!');
}
