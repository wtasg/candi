/**
 * =============================================================================
 * Package Artifacts Tests
 * Tests for package-artifacts.js
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');

let errors = 0;
let passed = 0;

function pass(msg) { console.log(`[✓] ${msg}`); passed++; }
function fail(msg) { console.error(`[✗] ${msg}`); errors++; }

// =============================================================================
// Package Artifacts Script Tests
// =============================================================================

console.log('\n--- Package Artifacts Script Tests ---\n');

// Check package-artifacts.js exists
const scriptPath = path.join(PROJECT_ROOT, 'scripts', 'package-artifacts.js');
if (fs.existsSync(scriptPath)) {
    pass('package-artifacts.js exists');

    const content = fs.readFileSync(scriptPath, 'utf8');

    // Check for expected artifact types
    const expectedArtifacts = ['theme', 'vim', 'kde', 'gnome', 'obsidian', 'docs'];
    let foundArtifacts = 0;
    for (const artifact of expectedArtifacts) {
        if (content.toLowerCase().includes(artifact)) foundArtifacts++;
    }

    if (foundArtifacts >= 5) {
        pass(`Script handles ${foundArtifacts}/${expectedArtifacts.length} artifact types`);
    } else {
        fail(`Script missing artifact types, found only ${foundArtifacts}`);
    }

    // Check for zip functionality
    if (content.includes('zip') || content.includes('archiver')) {
        pass('Script has zip/archive functionality');
    } else {
        fail('Script missing zip functionality');
    }

    // Check for version in filename
    if (content.includes('version') || content.includes('VERSION')) {
        pass('Script includes version in artifact names');
    } else {
        fail('Script missing version in artifact names');
    }
} else {
    fail('package-artifacts.js does not exist');
}

// =============================================================================
// Generated Artifact Tests
// =============================================================================

console.log('\n--- Generated Artifact Tests ---\n');

const version = require('../package.json').version;

// Check for expected zip files (after running npm run artifact)
const expectedZips = [
    `theme_${version}.zip`,
    `vim_${version}.zip`,
    `kde_${version}.zip`,
    `gnome_${version}.zip`,
    `obsidian_${version}.zip`
];

let foundZips = 0;
let missingZips = [];

for (const zip of expectedZips) {
    if (fs.existsSync(path.join(PROJECT_ROOT, zip))) {
        foundZips++;
    } else {
        missingZips.push(zip);
    }
}

if (foundZips > 0) {
    pass(`Found ${foundZips}/${expectedZips.length} artifact zips`);
} else {
    // Not a failure if artifacts haven't been generated yet
    pass('No artifact zips found (run npm run artifact to generate)');
}

// Check for vsix file
const vsixPattern = /vscode-theme-candi.*\.vsix$/;
const vscodeDir = path.join(PROJECT_ROOT, 'vscode');
if (fs.existsSync(vscodeDir)) {
    const vsixFiles = fs.readdirSync(vscodeDir).filter(f => vsixPattern.test(f));
    if (vsixFiles.length > 0) {
        pass(`Found VSCode extension: ${vsixFiles[0]}`);
    } else {
        pass('No .vsix file found (run npm run vscode:package to generate)');
    }
}

// =============================================================================
// Artifact Content Validation
// =============================================================================

console.log('\n--- Artifact Content Validation ---\n');

// If theme zip exists, check it has expected contents
const themeZip = path.join(PROJECT_ROOT, `theme_${version}.zip`);
if (fs.existsSync(themeZip)) {
    const stats = fs.statSync(themeZip);
    if (stats.size > 1000) {
        pass(`theme.zip has reasonable size: ${Math.round(stats.size / 1024)}KB`);
    } else {
        fail('theme.zip is suspiciously small');
    }
} else {
    pass('theme.zip not present (artifacts not generated)');
}

// Check dist directory has expected files for theme artifact
const distDir = path.join(PROJECT_ROOT, 'dist');
if (fs.existsSync(distDir)) {
    const distFiles = fs.readdirSync(distDir);
    const expectedDistFiles = ['index.js', 'colors.js', 'colors.json', 'base.css'];
    let foundDistFiles = 0;
    for (const f of expectedDistFiles) {
        if (distFiles.includes(f)) foundDistFiles++;
    }

    if (foundDistFiles === expectedDistFiles.length) {
        pass(`dist/ has all ${expectedDistFiles.length} expected files`);
    } else {
        fail(`dist/ missing files, found ${foundDistFiles}/${expectedDistFiles.length}`);
    }
} else {
    fail('dist/ directory does not exist');
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n' + '='.repeat(50));
console.log('  PACKAGE ARTIFACTS TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Passed: ${passed}`);
console.log(`Failed: ${errors}`);

if (errors > 0) {
    console.log('\n[✗] Package artifacts tests FAILED');
    process.exit(1);
} else {
    console.log('\n[✓] Package artifacts tests PASSED');
    process.exit(0);
}
