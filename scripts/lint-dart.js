#!/usr/bin/env node

/**
 * Dart Lint Script
 * Runs dart format and dart analyze on the Flutter package
 */

const { execSync } = require('child_process');
const path = require('path');
const logger = require('./logger');

const FLUTTER_DIR = path.join(__dirname, '..', 'flutter');
const DART_DIR = path.join(__dirname, '..', 'dart');

logger.log('[1/4] Running dart format (flutter)...');
try {
    const stdio = logger.isVerbose ? 'inherit' : 'pipe';
    const output = execSync('dart format lib', {
        cwd: FLUTTER_DIR,
        stdio
    });
    if (!logger.isVerbose && output) logger.log(output.toString());
    logger.log('[PASS] Dart format completed');
} catch (error) {
    logger.error('[FAIL] Dart format (flutter) failed');
    if (error.stdout) logger.error(error.stdout.toString());
    if (error.stderr) logger.error(error.stderr.toString());
    process.exit(1);
}

logger.log('\n[2/4] Running dart analyze (flutter)...');
try {
    const stdio = logger.isVerbose ? 'inherit' : 'pipe';
    const output = execSync('dart analyze lib', {
        cwd: FLUTTER_DIR,
        stdio
    });
    if (!logger.isVerbose && output) logger.log(output.toString());
    logger.log('[PASS] Dart analyze completed');
} catch (error) {
    logger.error('[FAIL] Dart analyze (flutter) failed');
    if (error.stdout) logger.error(error.stdout.toString());
    if (error.stderr) logger.error(error.stderr.toString());
    process.exit(1);
}

logger.log('\n[3/4] Running dart format (dart)...');
try {
    const stdio = logger.isVerbose ? 'inherit' : 'pipe';
    const output = execSync('dart format lib', {
        cwd: DART_DIR,
        stdio
    });
    if (!logger.isVerbose && output) logger.log(output.toString());
    logger.log('[PASS] Dart format (dart) completed');
} catch (error) {
    logger.error('[FAIL] Dart format (dart) failed');
    if (error.stdout) logger.error(error.stdout.toString());
    if (error.stderr) logger.error(error.stderr.toString());
    process.exit(1);
}

logger.log('\n[4/4] Running dart analyze (dart)...');
try {
    const stdio = logger.isVerbose ? 'inherit' : 'pipe';
    const output = execSync('dart analyze lib', {
        cwd: DART_DIR,
        stdio
    });
    if (!logger.isVerbose && output) logger.log(output.toString());
    logger.log('[PASS] Dart analyze (dart) completed');
} catch (error) {
    logger.error('[FAIL] Dart analyze (dart) failed');
    if (error.stdout) logger.error(error.stdout.toString());
    if (error.stderr) logger.error(error.stderr.toString());
    process.exit(1);
}

logger.log('\n[PASS] All Dart lint checks passed');

if (logger.isVerbose) {
    logger.log('Dart lint checks passed.');
}
