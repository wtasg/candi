/**
 * Token Validation / Linting
 *
 * Validates design token structures for correctness:
 * - Required fields (name, usage)
 * - OKLCH/value exclusivity
 * - Light/dark key parity
 * - OKLCH format validity
 */

import type { Palette, ValidationResult, ColorToken, SemanticToken } from './types.js';

/** Regex for validating OKLCH CSS string format. */
const OKLCH_REGEX = /^oklch\(\d+(\.\d+)?%\s+\d+(\.\d+)?\s+\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?\)$/;

/**
 * Validates that an OKLCH string is correctly formatted.
 */
export function validateOklchFormat(value: string): boolean {
    return OKLCH_REGEX.test(value);
}

/**
 * Validates that light and dark palettes have identical token keys.
 */
export function validateKeyParity(palette: Palette): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const lightKeys = Object.keys(palette.light).sort();
    const darkKeys = Object.keys(palette.dark).sort();

    const onlyInLight = lightKeys.filter((k) => !darkKeys.includes(k));
    const onlyInDark = darkKeys.filter((k) => !lightKeys.includes(k));

    if (onlyInLight.length > 0) {
        errors.push(`Tokens only in light (missing from dark): ${onlyInLight.join(', ')}`);
    }
    if (onlyInDark.length > 0) {
        errors.push(`Tokens only in dark (missing from light): ${onlyInDark.join(', ')}`);
    }

    return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validates the structure of all tokens in a palette.
 *
 * Checks:
 * - Each token has a `name` string field
 * - Each token has a `usage` string field
 * - Each token has either `oklch` OR `value` (never both, never neither)
 * - OKLCH values match the expected format
 */
export function validateTokenStructure(palette: Palette): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const mode of ['light', 'dark'] as const) {
        const paletteObj = palette[mode];

        for (const [key, token] of Object.entries(paletteObj)) {
            const t = token as ColorToken & SemanticToken;

            // Check required fields
            if (!t.name || typeof t.name !== 'string') {
                errors.push(`${mode}.${key}: Missing or invalid "name" field`);
            }
            if (!t.usage || typeof t.usage !== 'string') {
                errors.push(`${mode}.${key}: Missing or invalid "usage" field`);
            }

            // Check oklch/value exclusivity
            const hasOklch = t.oklch !== undefined;
            const hasValue = (t as ColorToken).value !== undefined;

            if (hasOklch && hasValue) {
                errors.push(`${mode}.${key}: Has both "oklch" and "value" (must be exclusive)`);
            }
            if (!hasOklch && !hasValue) {
                errors.push(`${mode}.${key}: Missing both "oklch" and "value" (one required)`);
            }

            // Validate OKLCH format
            if (hasOklch && !validateOklchFormat(t.oklch!)) {
                errors.push(`${mode}.${key}: Invalid OKLCH format: ${t.oklch}`);
            }

            // Check for unexpected properties
            const allowedProps = ['name', 'usage', 'oklch', 'value'];
            const extraProps = Object.keys(t).filter((p) => !allowedProps.includes(p));
            if (extraProps.length > 0) {
                warnings.push(`${mode}.${key}: Unexpected properties: ${extraProps.join(', ')}`);
            }
        }
    }

    return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validates that a palette has both light and dark sub-palettes
 * and that the root structure contains only allowed keys.
 */
export function validatePaletteStructure(palette: Record<string, unknown>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!palette['light'] || typeof palette['light'] !== 'object') {
        errors.push('Missing or invalid "light" palette');
    }
    if (!palette['dark'] || typeof palette['dark'] !== 'object') {
        errors.push('Missing or invalid "dark" palette');
    }

    const allowedRootKeys = ['light', 'dark'];
    const extraRootKeys = Object.keys(palette).filter((k) => !allowedRootKeys.includes(k));
    if (extraRootKeys.length > 0) {
        warnings.push(`Unexpected root-level keys: ${extraRootKeys.join(', ')}`);
    }

    return { valid: errors.length === 0, errors, warnings };
}
