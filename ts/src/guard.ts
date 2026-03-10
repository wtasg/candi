/**
 * Semantic Integrity Guard
 *
 * CI-level check that ensures engine-generated semantic tokens have not been
 * manually overridden in the palette assembly file.
 */

import type { SemanticToken } from './types.js';

export interface IntegrityViolation {
    mode: 'light' | 'dark';
    key: string;
    expected: SemanticToken;
    found: SemanticToken | undefined;
}

/**
 * Deep-compares engine-generated semantic tokens against an authoritative palette.
 *
 * @param generated - Fresh output from generatePalette()
 * @param authoritative - Loaded palette from the data file
 * @returns List of violations (empty if all tokens match)
 */
export function checkSemanticIntegrity(
    generated: { light: Record<string, SemanticToken>; dark: Record<string, SemanticToken> },
    authoritative: { light: Record<string, unknown>; dark: Record<string, unknown> }
): IntegrityViolation[] {
    const violations: IntegrityViolation[] = [];

    for (const mode of ['light', 'dark'] as const) {
        for (const [key, freshToken] of Object.entries(generated[mode])) {
            const authToken = authoritative[mode][key] as SemanticToken | undefined;

            if (!authToken) {
                violations.push({
                    mode,
                    key,
                    expected: freshToken,
                    found: undefined,
                });
                continue;
            }

            // Deep compare
            if (
                authToken.oklch !== freshToken.oklch ||
                authToken.name !== freshToken.name ||
                authToken.usage !== freshToken.usage
            ) {
                violations.push({
                    mode,
                    key,
                    expected: freshToken,
                    found: authToken,
                });
            }
        }
    }

    return violations;
}
