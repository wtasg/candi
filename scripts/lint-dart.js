#!/usr/bin/env node

/**
 * Dart Lint Script
 * Runs dart format and dart analyze on the Flutter package
 */

const { execSync } = require('child_process');
const path = require('path');

const FLUTTER_DIR = path.join(__dirname, '..', 'flutter');

console.log('[1/2] Running dart format...');
try {
    execSync('dart format lib', {
        cwd: FLUTTER_DIR,
        stdio: 'inherit'
    });
    console.log('[PASS] Dart format completed');
} catch (error) {
    console.error('[FAIL] Dart format failed');
    process.exit(1);
}

console.log('\n[2/2] Running dart analyze...');
try {
    execSync('dart analyze lib', {
        cwd: FLUTTER_DIR,
        stdio: 'inherit'
    });
    console.log('[PASS] Dart analyze completed');
} catch (error) {
    console.error('[FAIL] Dart analyze failed');
    process.exit(1);
}

console.log('\n[PASS] All Dart lint checks passed');
