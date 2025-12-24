#!/usr/bin/env node
/**
 * Test script for GNOME themes.
 *
 * Validates the structure and content of generated GTK3/GTK4 themes.
 */

const fs = require('fs');
const path = require('path');

const gnomeDir = path.join(__dirname, '..', 'gnome');
const gtk3Dir = path.join(gnomeDir, 'gtk-3.0');
const gtk4Dir = path.join(gnomeDir, 'gtk-4.0');

let exitCode = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`[✓] ${name}`);
    } catch (err) {
        console.error(`[✗] ${name}`);
        console.error(`    ${err.message}`);
        exitCode = 1;
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// Test 1: Directory structure
test('GNOME directory exists', () => {
    assert(fs.existsSync(gnomeDir), 'gnome/ directory should exist');
});

test('GTK3 directory exists', () => {
    assert(fs.existsSync(gtk3Dir), 'gnome/gtk-3.0/ directory should exist');
});

test('GTK4 directory exists', () => {
    assert(fs.existsSync(gtk4Dir), 'gnome/gtk-4.0/ directory should exist');
});

// Test 2: Required files exist
test('index.theme exists', () => {
    const indexPath = path.join(gnomeDir, 'index.theme');
    assert(fs.existsSync(indexPath), 'gnome/index.theme should exist');
});

test('GTK3 light theme exists', () => {
    const themePath = path.join(gtk3Dir, 'gtk.css');
    assert(fs.existsSync(themePath), 'gnome/gtk-3.0/gtk.css should exist');
});

test('GTK3 dark theme exists', () => {
    const themePath = path.join(gtk3Dir, 'gtk-dark.css');
    assert(fs.existsSync(themePath), 'gnome/gtk-3.0/gtk-dark.css should exist');
});

test('GTK4 light theme exists', () => {
    const themePath = path.join(gtk4Dir, 'gtk.css');
    assert(fs.existsSync(themePath), 'gnome/gtk-4.0/gtk.css should exist');
});

test('GTK4 dark theme exists', () => {
    const themePath = path.join(gtk4Dir, 'gtk-dark.css');
    assert(fs.existsSync(themePath), 'gnome/gtk-4.0/gtk-dark.css should exist');
});

// Test 3: index.theme structure
test('index.theme has correct format', () => {
    const indexPath = path.join(gnomeDir, 'index.theme');
    const content = fs.readFileSync(indexPath, 'utf8');
    
    assert(content.includes('[Desktop Entry]'), 'Should have [Desktop Entry] section');
    assert(content.includes('Type=X-GNOME-Metatheme'), 'Should have Type=X-GNOME-Metatheme');
    assert(content.includes('Name=Candi'), 'Should have Name=Candi');
    assert(content.includes('[X-GNOME-Metatheme]'), 'Should have [X-GNOME-Metatheme] section');
});

// Test 4: GTK CSS content validation
test('GTK3 light theme has color definitions', () => {
    const themePath = path.join(gtk3Dir, 'gtk.css');
    const content = fs.readFileSync(themePath, 'utf8');
    
    assert(content.includes('@define-color theme_bg_color'), 'Should define theme_bg_color');
    assert(content.includes('@define-color theme_fg_color'), 'Should define theme_fg_color');
    assert(content.includes('@define-color theme_selected_bg_color'), 'Should define theme_selected_bg_color');
    assert(content.includes('@define-color borders'), 'Should define borders');
});

test('GTK3 dark theme has color definitions', () => {
    const themePath = path.join(gtk3Dir, 'gtk-dark.css');
    const content = fs.readFileSync(themePath, 'utf8');
    
    assert(content.includes('@define-color theme_bg_color'), 'Should define theme_bg_color');
    assert(content.includes('@define-color theme_fg_color'), 'Should define theme_fg_color');
    assert(content.includes('Candi Dark Theme'), 'Should be labeled as Dark theme');
});

test('GTK3 light theme has widget styles', () => {
    const themePath = path.join(gtk3Dir, 'gtk.css');
    const content = fs.readFileSync(themePath, 'utf8');
    
    assert(content.includes('button'), 'Should have button styles');
    assert(content.includes('entry'), 'Should have entry styles');
    assert(content.includes('headerbar'), 'Should have headerbar styles');
    assert(content.includes('menu'), 'Should have menu styles');
    assert(content.includes('switch'), 'Should have switch styles');
});

test('GTK4 themes match GTK3 themes', () => {
    const gtk3Light = fs.readFileSync(path.join(gtk3Dir, 'gtk.css'), 'utf8');
    const gtk4Light = fs.readFileSync(path.join(gtk4Dir, 'gtk.css'), 'utf8');
    const gtk3Dark = fs.readFileSync(path.join(gtk3Dir, 'gtk-dark.css'), 'utf8');
    const gtk4Dark = fs.readFileSync(path.join(gtk4Dir, 'gtk-dark.css'), 'utf8');
    
    assert(gtk3Light === gtk4Light, 'GTK3 and GTK4 light themes should match');
    assert(gtk3Dark === gtk4Dark, 'GTK3 and GTK4 dark themes should match');
});

// Test 5: Color format validation
test('Colors are in valid RGB format', () => {
    const themePath = path.join(gtk3Dir, 'gtk.css');
    const content = fs.readFileSync(themePath, 'utf8');
    
    // Check for valid rgb() format
    const rgbPattern = /rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/g;
    const matches = content.match(rgbPattern);
    
    assert(matches && matches.length > 0, 'Should contain rgb() color definitions');
    
    // Validate RGB values are in range 0-255
    matches.forEach(rgb => {
        const values = rgb.match(/\d+/g).map(Number);
        values.forEach(val => {
            assert(val >= 0 && val <= 255, `RGB value ${val} should be in range 0-255`);
        });
    });
});

// Test 6: File sizes are reasonable
test('Generated files have reasonable sizes', () => {
    const gtk3LightSize = fs.statSync(path.join(gtk3Dir, 'gtk.css')).size;
    const gtk3DarkSize = fs.statSync(path.join(gtk3Dir, 'gtk-dark.css')).size;
    
    assert(gtk3LightSize > 1000, 'GTK3 light theme should be > 1KB');
    assert(gtk3LightSize < 100000, 'GTK3 light theme should be < 100KB');
    assert(gtk3DarkSize > 1000, 'GTK3 dark theme should be > 1KB');
    assert(gtk3DarkSize < 100000, 'GTK3 dark theme should be < 100KB');
});

// Test 7: Essential GTK color names
test('GTK themes define essential color names', () => {
    const themePath = path.join(gtk3Dir, 'gtk.css');
    const content = fs.readFileSync(themePath, 'utf8');
    
    const essentialColors = [
        'theme_bg_color',
        'theme_fg_color',
        'theme_base_color',
        'theme_text_color',
        'theme_selected_bg_color',
        'theme_selected_fg_color',
        'borders',
        'warning_color',
        'error_color',
        'success_color',
        'link_color'
    ];
    
    essentialColors.forEach(colorName => {
        assert(
            content.includes(`@define-color ${colorName}`),
            `Should define essential color: ${colorName}`
        );
    });
});

// Summary
console.log('\n---');
if (exitCode === 0) {
    console.log('All tests passed! ✓');
} else {
    console.log('Some tests failed. ✗');
}

process.exit(exitCode);
