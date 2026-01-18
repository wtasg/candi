#!/usr/bin/env node

/**
 * build-docs.js - Replace version placeholders in documentation
 *
 * Placeholders:
 *   {{VERSION}}        - Current dev version from `version` file
 *   {{PUBLISHED}}      - GitHub release version (artifacts)
 *   {{NPM_VERSION}}    - npm package version
 *   {{FLUTTER_VERSION}} - Flutter package version
 *   {{VSCODE_VERSION}}  - VSCode extension version
 *   {{KDE_VERSION}}     - KDE theme version
 *   etc.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VERSION_FILE = path.join(ROOT, 'version');
const PUBLISHED_FILE = path.join(ROOT, 'published_versions.json');
const DOCS_DIR = path.join(ROOT, 'docs');

// Files to process
const TARGET_FILES = [
    path.join(ROOT, 'README.md'),
    path.join(ROOT, 'vscode', 'COLOR_REFERENCE.md'),
];

// Read version files
function getVersions() {
    const versions = {};

    // Current dev version
    if (fs.existsSync(VERSION_FILE)) {
        versions.VERSION = fs.readFileSync(VERSION_FILE, 'utf-8').trim();
    } else {
        console.warn('[WARN] version file not found, using package.json');
        versions.VERSION = require(path.join(ROOT, 'package.json')).version;
    }

    // Published versions per project
    if (fs.existsSync(PUBLISHED_FILE)) {
        let published;
        try {
            published = JSON.parse(fs.readFileSync(PUBLISHED_FILE, 'utf-8'));
        } catch (e) {
            console.error(`[ERROR] Invalid JSON in ${PUBLISHED_FILE}: ${e.message}`);
            process.exit(1);
        }
        versions.PUBLISHED = published.github || versions.VERSION;
        versions.NPM_VERSION = published.npm || versions.VERSION;
        versions.FLUTTER_VERSION = published.flutter || versions.VERSION;
        versions.VSCODE_VERSION = published.vscode || versions.VERSION;
        versions.KDE_VERSION = published.kde || versions.VERSION;
        versions.GNOME_VERSION = published.gnome || versions.VERSION;
        versions.OBSIDIAN_VERSION = published.obsidian || versions.VERSION;
        versions.VIM_VERSION = published.vim || versions.VERSION;
    } else {
        console.warn('[WARN] published_versions.json not found, using VERSION for all');
        versions.PUBLISHED = versions.VERSION;
        versions.NPM_VERSION = versions.VERSION;
        versions.FLUTTER_VERSION = versions.VERSION;
        versions.VSCODE_VERSION = versions.VERSION;
        versions.KDE_VERSION = versions.VERSION;
        versions.GNOME_VERSION = versions.VERSION;
        versions.OBSIDIAN_VERSION = versions.VERSION;
        versions.VIM_VERSION = versions.VERSION;
    }

    return versions;
}

// Replace all placeholders in content
function replacePlaceholders(content, versions) {
    let result = content;
    for (const [key, value] of Object.entries(versions)) {
        const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        result = result.replace(pattern, value);
    }
    return result;
}

// Process a single file
function processFile(filePath, versions) {
    if (!fs.existsSync(filePath)) return 0;

    const content = fs.readFileSync(filePath, 'utf-8');
    const updated = replacePlaceholders(content, versions);

    // Count replacements
    let count = 0;
    for (const key of Object.keys(versions)) {
        const matches = content.match(new RegExp(`\\{\\{${key}\\}\\}`, 'g'));
        if (matches) count += matches.length;
    }

    if (count > 0) {
        fs.writeFileSync(filePath, updated, 'utf-8');
        console.log(`[✓] ${path.relative(ROOT, filePath)} - ${count} replacement(s)`);
    }

    return count;
}

// Main
function main() {
    console.log('Injecting versions into documentation...\n');

    const versions = getVersions();
    console.log('Versions:');
    for (const [key, value] of Object.entries(versions)) {
        console.log(`  ${key}: ${value}`);
    }
    console.log('');

    let totalReplacements = 0;
    let filesProcessed = 0;

    // Process specific target files
    for (const file of TARGET_FILES) {
        totalReplacements += processFile(file, versions);
        filesProcessed++;
    }

    // Process docs/*.md (except dev_versioning.md which documents placeholders)
    if (fs.existsSync(DOCS_DIR)) {
        const files = fs.readdirSync(DOCS_DIR)
            .filter(f => f.endsWith('.md'))
            .filter(f => f !== 'dev_versioning.md');
        for (const file of files) {
            totalReplacements += processFile(path.join(DOCS_DIR, file), versions);
            filesProcessed++;
        }
    }

    console.log(`\nBuild complete!`);
    console.log(`  - Files scanned: ${filesProcessed}`);
    console.log(`  - Replacements: ${totalReplacements}`);
}

main();
