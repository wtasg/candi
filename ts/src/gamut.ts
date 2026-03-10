/**
 * Gamut Mapping Utilities
 *
 * Ensures OKLCH colors fit within the sRGB gamut by reducing chroma
 * via binary search when necessary.
 */

import type { Rgb } from './types.js';
import { oklchToRgb } from './color-conv.js';

/**
 * Checks if an RGB object is within the valid sRGB 0-255 range.
 */
export function inGamut(rgb: Rgb): boolean {
    const { r, g, b } = rgb;
    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

/**
 * Binary-search chroma downward until color fits in sRGB gamut.
 *
 * The algorithm preserves lightness and hue, only reducing chroma.
 * 10 iterations provide ~0.001 precision, sufficient for OKLCH.
 *
 * @param l - Lightness 0-1
 * @param c - Starting chroma
 * @param h - Hue 0-360
 * @returns The maximum chroma that produces a valid sRGB color
 */
export function fitToGamut(l: number, c: number, h: number): number {
    // Optimization: check if already in gamut
    if (inGamut(oklchToRgb(l, c, h))) {
        return c;
    }

    let low = 0;
    let high = c;
    let bestC = 0;

    // Binary search for maximum valid chroma
    for (let i = 0; i < 10; i++) {
        const mid = (low + high) / 2;
        const rgb = oklchToRgb(l, mid, h);
        if (inGamut(rgb)) {
            bestC = mid;
            low = mid;
        } else {
            high = mid;
        }
    }
    return bestC;
}
