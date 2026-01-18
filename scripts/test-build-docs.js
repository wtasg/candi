/**
 * =============================================================================
 * Build Docs Tests
 * Tests for build-docs.js version injection
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const PROJECT_ROOT = path.join(__dirname, '..');

let errors = 0;
let passed = 0;

function pass(msg) { logger.log(`[✓] ${msg}`); passed++; }
function fail(msg) { logger.error(`[✗] ${msg}`); errors++; }

// =============================================================================
// Version Files Tests
// =============================================================================

logger.log('\n--- Version Files Tests ---\n');

// Check package.json has version
const packageJson = require('../package.json');
if (packageJson.version && /^\d+\.\d+\.\d+/.test(packageJson.version)) {
    pass(`package.json version: ${packageJson.version}`);
} else {
    fail('package.json missing or invalid version');
}

// Check published_versions.json exists
const pubVersionsPath = path.join(PROJECT_ROOT, 'published_versions.json');
if (fs.existsSync(pubVersionsPath)) {
    pass('published_versions.json exists');

    try {
        const pubVersions = JSON.parse(fs.readFileSync(pubVersionsPath, 'utf8'));

        // Check expected keys
        const expectedKeys = ['npm', 'flutter', 'vscode'];
        let foundKeys = 0;
        for (const key of expectedKeys) {
            if (pubVersions[key]) foundKeys++;
        }

        if (foundKeys >= 2) {
            pass(`published_versions.json has ${foundKeys} platform versions`);
        } else {
            fail(`published_versions.json missing platform versions`);
        }
    } catch (err) {
        fail(`Cannot parse published_versions.json: ${err.message}`);
    }
} else {
    fail('published_versions.json does not exist');
}

// =============================================================================
// Documentation Placeholder Tests
// =============================================================================

logger.log('\n--- Documentation Placeholder Tests ---\n');

// Check docs directory exists
const docsDir = path.join(PROJECT_ROOT, 'docs');
if (fs.existsSync(docsDir)) {
    pass('docs/ directory exists');

    // Check for markdown files
    const mdFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
    if (mdFiles.length > 0) {
        pass(`Found ${mdFiles.length} markdown files in docs/`);
    } else {
        fail('No markdown files in docs/');
    }
} else {
    fail('docs/ directory does not exist');
}

// Check using-release-artifacts.md exists and has placeholders or versions
const releaseArtifactsPath = path.join(docsDir, 'using-release-artifacts.md');
if (fs.existsSync(releaseArtifactsPath)) {
    pass('using-release-artifacts.md exists');

    const content = fs.readFileSync(releaseArtifactsPath, 'utf8');

    // Check for version references
    if (content.includes('{{') || content.match(/\d+\.\d+\.\d+/)) {
        pass('Document has version references or placeholders');
    } else {
        fail('Document missing version references');
    }
} else {
    // Not a failure, just skip
    pass('using-release-artifacts.md not required');
}

// =============================================================================
// Build Docs Script Tests
// =============================================================================

logger.log('\n--- Build Docs Script Tests ---\n');

// Check build-docs.js exists
const buildDocsPath = path.join(PROJECT_ROOT, 'scripts', 'build-docs.js');
if (fs.existsSync(buildDocsPath)) {
    pass('build-docs.js exists');

    const content = fs.readFileSync(buildDocsPath, 'utf8');

    // Check for placeholder replacement logic
    if (content.includes('{{VERSION}}') || content.includes('{{PUBLISHED}}')) {
        pass('Script handles version placeholders');
    } else if (content.includes('replace') || content.includes('Replace')) {
        pass('Script has replacement logic');
    } else {
        fail('Script missing placeholder handling');
    }

    // Check for published_versions.json usage
    if (content.includes('published_versions')) {
        pass('Script reads published_versions.json');
    } else {
        fail('Script missing published_versions.json integration');
    }
} else {
    fail('build-docs.js does not exist');
}

// =============================================================================
// Summary
// =============================================================================

logger.log('\n' + '='.repeat(50));
logger.log('  BUILD DOCS TEST SUMMARY');
logger.log('='.repeat(50));
logger.log(`Passed: ${passed}`);
logger.log(`Failed: ${errors}`);

if (errors > 0) {
    logger.dump();
    logger.error('\n[✗] Build docs tests FAILED');
    process.exit(1);
} else {
    if (logger.isVerbose) {
        logger.log('\n[✓] Build docs tests PASSED');
    }
    process.exit(0);
}
