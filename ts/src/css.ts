/**
 * CSS Variable Generation
 *
 * Converts palette token objects into CSS custom property declarations
 * for :root and .dark selectors, and Tailwind v4 @theme blocks.
 */

import type { ColorToken, SemanticToken } from './types.js';
import { toKebab } from './naming.js';

/**
 * Generates CSS custom property declarations from a mode palette.
 *
 * @param modePalette - Object of token entries (e.g. palette.light)
 * @param prefix - CSS variable prefix (default: '--candi-')
 * @returns CSS variable declarations string
 *
 * @example
 * // Output: "    --candi-accent: oklch(50% 0.13 245);\n"
 */
export function generateVars(
    modePalette: Record<string, ColorToken | SemanticToken>,
    prefix: string = '--candi-'
): string {
    let css = '';
    for (const [key, data] of Object.entries(modePalette)) {
        const value = (data as ColorToken).oklch ?? (data as ColorToken).value ?? '';
        css += `    ${prefix}${toKebab(key)}: ${value};\n`;
    }
    return css;
}

/**
 * Generates Tailwind v4 @theme variable mapping.
 *
 * Maps `--color-candi-{name}` to `var(--candi-{name})` for each token.
 *
 * @param modePalette - Object of token entries
 * @returns CSS variable mapping string
 */
export function generateVarMap(
    modePalette: Record<string, ColorToken | SemanticToken>
): string {
    let css = '';
    for (const key of Object.keys(modePalette)) {
        css += `    --color-candi-${toKebab(key)}: var(--candi-${toKebab(key)});\n`;
    }
    return css;
}
