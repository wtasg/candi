/**
 * Color Derivation Engine
 *
 * Derives color variants from base OKLCH anchors by applying
 * lightness deltas and chroma multipliers, with gamut safety.
 */

import type { DerivationRule, DerivedColor, VariantSet } from './types.js';
import { parseOklch } from './color-conv.js';
import { fitToGamut } from './gamut.js';

/**
 * Clamps a number between min and max.
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

// =============================================================================
// Variant Definitions
// =============================================================================

/** Light mode derivation rules. "Subtle" means lighter but vibrant (Hygge). */
export const VARIANTS_LIGHT: VariantSet = {
    subtle: { dl: +0.33, dc: 0.60 },
    soft: { dl: +0.10, dc: 0.80 },
    warm: { dl: +0.15, dc: 0.85 },
    base: { dl: 0, dc: 1.00 },
    hot: { dl: -0.05, dc: 1.15 },
    strong: { dl: -0.10, dc: 1.10 },
    outline: { dl: -0.15, dc: 0.70 },
};

/** Dark mode derivation rules. "Subtle" means darker and restrained. */
export const VARIANTS_DARK: VariantSet = {
    subtle: { dl: -0.27, dc: 0.60 },
    soft: { dl: +0.10, dc: 0.80 },
    warm: { dl: -0.15, dc: 0.85 },
    base: { dl: 0, dc: 1.00 },
    hot: { dl: -0.05, dc: 1.15 },
    strong: { dl: -0.10, dc: 1.10 },
    outline: { dl: -0.15, dc: 0.70 },
};

/** Combined variant sets by mode. */
export const VARIANTS: Record<string, VariantSet> = {
    light: VARIANTS_LIGHT,
    dark: VARIANTS_DARK,
};

/**
 * Derives a single color variant from a base OKLCH anchor.
 *
 * 1. Parses the base OKLCH string
 * 2. Applies lightness delta (clamped to 0-1)
 * 3. Applies chroma multiplier
 * 4. Runs gamut mapping to ensure sRGB safety
 * 5. Returns formatted OKLCH string + numeric components
 *
 * @param oklchStr - Base OKLCH color string, e.g. "oklch(50% 0.13 245)"
 * @param variantRules - Derivation rules with dl (lightness delta) and dc (chroma multiplier)
 */
export function deriveColor(oklchStr: string, variantRules: DerivationRule): DerivedColor {
    const parsed = parseOklch(oklchStr);
    if (!parsed) throw new Error(`Invalid OKLCH: ${oklchStr}`);

    let newL = parsed.l + variantRules.dl;
    const rawC = parsed.c * variantRules.dc;
    const newH = parsed.h; // Hue is invariant

    // Clamp lightness to 0-1
    newL = clamp(newL, 0, 1);

    // Gamut mapping (binary search downwards)
    const newC = fitToGamut(newL, rawC, newH);

    return {
        oklch: `oklch(${Math.round(newL * 100)}% ${parseFloat(newC.toFixed(4))} ${parseFloat(newH.toFixed(2))})`,
        l: newL,
        c: newC,
        h: newH,
    };
}
