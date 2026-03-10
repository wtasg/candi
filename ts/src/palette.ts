/**
 * Palette Generation Pipeline
 *
 * Generates a complete semantic color palette from a small set of
 * hand-tuned anchor colors using the derivation engine.
 */

import type { Anchors, SemanticToken } from './types.js';
import { deriveColor, VARIANTS } from './derive.js';
import { deriveOnColor } from './contrast.js';
import { logger } from './logger.js';

// =============================================================================
// Anchor Colors (Hand-Tuned Single Source of Truth)
// =============================================================================

export const ANCHORS: Anchors = {
    light: {
        accent: 'oklch(50% 0.13 245)',    // Balanced Steel Blue
        secondary: 'oklch(55% 0.12 20)',  // Balanced Terracotta
        success: 'oklch(50% 0.10 150)',   // Balanced Forest
        warning: 'oklch(60% 0.13 80)',    // Balanced Amber
        error: 'oklch(50% 0.14 25)',      // Balanced Brick
        info: 'oklch(50% 0.10 225)',      // Balanced Slate
    },
    dark: {
        accent: 'oklch(72% 0.12 245)',    // Balanced Steel Blue
        secondary: 'oklch(75% 0.11 20)',  // Balanced Terracotta
        success: 'oklch(78% 0.10 150)',   // Balanced Forest
        warning: 'oklch(82% 0.12 80)',    // Balanced Amber
        error: 'oklch(78% 0.12 25)',      // Balanced Brick
        info: 'oklch(78% 0.10 225)',      // Balanced Slate
    },
};

export interface GeneratePaletteOptions {
    verbose?: boolean;
}

export interface GeneratedPalette {
    light: Record<string, SemanticToken>;
    dark: Record<string, SemanticToken>;
}

/**
 * Generates a complete semantic palette from anchor definitions.
 *
 * For each mode (light, dark) and each anchor:
 * 1. Stores the base anchor as-is
 * 2. Derives all variants (subtle, soft, warm, hot, strong, outline)
 * 3. Derives a WCAG-accessible "on" color (White or Black)
 *
 * Output keys follow camelCase naming: e.g. "warningSubtle", "onError"
 */
export function generatePalette(opts: GeneratePaletteOptions = {}): GeneratedPalette {
    const palette: GeneratedPalette = { light: {}, dark: {} };
    const verbose = opts.verbose || logger.isVerbose;

    for (const mode of ['light', 'dark'] as const) {
        if (verbose) logger.log(`\n--- Generating [${mode}] ---`);

        for (const [name, anchorValue] of Object.entries(ANCHORS[mode])) {
            if (verbose) logger.log(`Anchor: ${name} (${anchorValue})`);

            // 1. Base (direct anchor)
            palette[mode][name] = {
                oklch: anchorValue,
                name: name.charAt(0).toUpperCase() + name.slice(1),
                usage: `Semantic ${name}`,
            };

            // 2. Variants
            for (const [variantName, rules] of Object.entries(VARIANTS[mode]!)) {
                if (variantName === 'base') continue; // Already handled

                const derived = deriveColor(anchorValue, rules);
                const keyName = name + variantName.charAt(0).toUpperCase() + variantName.slice(1);

                palette[mode][keyName] = {
                    oklch: derived.oklch,
                    name: `${name} ${variantName}`,
                    usage: `Derived ${variantName} of ${name}`,
                };
                if (verbose) logger.log(`  -> ${keyName.padEnd(20)}: ${derived.oklch}`);
            }

            // 3. On-color
            const onResult = deriveOnColor(anchorValue);
            const onKeyName = 'on' + name.charAt(0).toUpperCase() + name.slice(1);
            palette[mode][onKeyName] = {
                oklch: onResult.oklch,
                name: `On ${name}`,
                usage: `Text on ${name}`,
            };

            if (verbose) {
                const status = onResult.warning ? 'WARN (<4.5)' : 'PASS';
                logger.log(
                    `  -> ${onKeyName.padEnd(20)}: ${onResult.oklch} [Contrast: ${onResult.contrast.toFixed(2)} ${status}]`
                );
            }
        }
    }

    return palette;
}
