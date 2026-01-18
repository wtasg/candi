#!/usr/bin/env node
/**
 * Test script for Obsidian theme.
 *
 * Validates the structure and content of generated Obsidian theme files.
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const obsidianDir = path.join(__dirname, '..', 'obsidian');

let exitCode = 0;

function test(name, fn) {
    try {
        fn();
        logger.log(`[✓] ${name}`);
    } catch (err) {
        logger.error(`[✗] ${name}`);
        logger.error(`    ${err.message}`);
        exitCode = 1;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// Test 1: Directory structure
test('Obsidian directory exists', () => {
    assert(fs.existsSync(obsidianDir), 'obsidian/ directory should exist');
});

// Test 2: Required files exist
test('manifest.json exists', () => {
    const manifestPath = path.join(obsidianDir, 'manifest.json');
    assert(fs.existsSync(manifestPath), 'obsidian/manifest.json should exist');
});

test('theme.css exists', () => {
    const themePath = path.join(obsidianDir, 'theme.css');
    assert(fs.existsSync(themePath), 'obsidian/theme.css should exist');
});

// Test 3: manifest.json structure
test('manifest.json has correct structure', () => {
    const manifestPath = path.join(obsidianDir, 'manifest.json');
    const content = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(content);

    assert(manifest.name === 'Candi', 'Should have name "Candi"');
    assert(typeof manifest.version === 'string', 'Should have version string');
    assert(manifest.minAppVersion === '1.0.0', 'Should have minAppVersion "1.0.0"');
    assert(manifest.author === 'wtasg', 'Should have author "wtasg"');
});

test('manifest.json version matches package.json', () => {
    const manifestPath = path.join(obsidianDir, 'manifest.json');
    const packagePath = path.join(__dirname, '..', 'package.json');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    assert(manifest.version === pkg.version, `Manifest version (${manifest.version}) should match package.json (${pkg.version})`);
});

// Test 4: theme.css content validation
test('theme.css has light mode block', () => {
    const themePath = path.join(obsidianDir, 'theme.css');
    const content = fs.readFileSync(themePath, 'utf8');

    assert(content.includes('.theme-light {'), 'Should have .theme-light selector');
});

test('theme.css has dark mode block', () => {
    const themePath = path.join(obsidianDir, 'theme.css');
    const content = fs.readFileSync(themePath, 'utf8');

    assert(content.includes('.theme-dark {'), 'Should have .theme-dark selector');
});

test('theme.css has essential CSS variables', () => {
    const themePath = path.join(obsidianDir, 'theme.css');
    const content = fs.readFileSync(themePath, 'utf8');

    const essentialVars = [
        '--background-primary',
        '--background-secondary',
        '--text-normal',
        '--text-muted',
        '--interactive-accent',
        '--divider-color',
        '--link-color'
    ];

    essentialVars.forEach(varName => {
        assert(
            content.includes(varName),
            `Should define essential variable: ${varName}`
        );
    });
});

// Test 5: Color format validation
test('Colors are in valid hex format', () => {
    const themePath = path.join(obsidianDir, 'theme.css');
    const content = fs.readFileSync(themePath, 'utf8');

    // Check for valid hex color format
    const hexPattern = /#[0-9A-Fa-f]{6}/g;
    const matches = content.match(hexPattern);

    assert(matches && matches.length > 0, 'Should contain hex color definitions');
    assert(matches.length >= 20, `Should have at least 20 color definitions (found ${matches.length})`);
});

// Test 6: File sizes are reasonable
test('Generated files have reasonable sizes', () => {
    const themeCssSize = fs.statSync(path.join(obsidianDir, 'theme.css')).size;
    const manifestSize = fs.statSync(path.join(obsidianDir, 'manifest.json')).size;

    assert(themeCssSize > 1000, 'theme.css should be > 1KB');
    assert(themeCssSize < 50000, 'theme.css should be < 50KB');
    assert(manifestSize > 50, 'manifest.json should be > 50 bytes');
    assert(manifestSize < 1000, 'manifest.json should be < 1KB');
});

// Test 7: Both modes have same variables
test('Light and dark modes define same variables', () => {
    const themePath = path.join(obsidianDir, 'theme.css');
    const content = fs.readFileSync(themePath, 'utf8');

    const lightMatch = content.match(/\.theme-light\s*{([^}]+(?:{[^}]*}[^}]*)*)}/s);
    const darkMatch = content.match(/\.theme-dark\s*{([^}]+(?:{[^}]*}[^}]*)*)}/s);

    assert(lightMatch, 'Should have .theme-light block');
    assert(darkMatch, 'Should have .theme-dark block');

    // Extract variable names from both blocks
    const varPattern = /--([\w-]+):/g;

    const lightVars = new Set();
    const darkVars = new Set();

    let match;
    while ((match = varPattern.exec(lightMatch[1])) !== null) {
        lightVars.add(match[1]);
    }

    varPattern.lastIndex = 0;
    while ((match = varPattern.exec(darkMatch[1])) !== null) {
        darkVars.add(match[1]);
    }

    // Check that both have the same variables
    assert(lightVars.size > 0, 'Light mode should define variables');
    assert(darkVars.size > 0, 'Dark mode should define variables');
    assert(lightVars.size === darkVars.size, `Light (${lightVars.size}) and dark (${darkVars.size}) should have same number of variables`);
});

// Summary
logger.log('\n---');
if (exitCode > 0) {
    logger.dump();
    logger.error('\n[✗] Obsidian theme validation FAILED');
    process.exit(1);
} else {
    if (logger.isVerbose) {
        logger.log('\n[✓] Obsidian theme validation PASSED');
    }
    process.exit(0);
}
