/**
 * WCAG Contrast & Relative Luminance Utilities
 *
 * Implements WCAG 2.1 contrast ratio calculation and automatic
 * accessible text color selection (White or Black on a given background).
 */

import type { Rgb, OnColorResult } from './types.js';
import { parseOklch } from './color-conv.js';

/**
 * Calculates WCAG 2.1 relative luminance from linear sRGB values.
 * @param r - Red channel (0-1, linear)
 * @param g - Green channel (0-1, linear)
 * @param b - Blue channel (0-1, linear)
 */
export function getLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return a[0]! * 0.2126 + a[1]! * 0.7152 + a[2]! * 0.0722;
}

/**
 * Calculates WCAG contrast ratio between two RGB colors.
 * @param rgb1 - First color (0-255 per channel)
 * @param rgb2 - Second color (0-255 per channel)
 * @returns Contrast ratio (1-21)
 */
export function getContrast(rgb1: Rgb, rgb2: Rgb): number {
    const lum1 = getLuminance(rgb1.r / 255, rgb1.g / 255, rgb1.b / 255);
    const lum2 = getLuminance(rgb2.r / 255, rgb2.g / 255, rgb2.b / 255);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Automatically selects White or Black text for accessible contrast
 * on a given background color.
 *
 * - Returns White if contrast >= 4.5 and White >= Black
 * - Returns Black if contrast >= 4.5 and Black > White
 * - Falls back to the higher-contrast option with a warning
 *
 * @param baseOklchStr - OKLCH string of the background color
 */
export function deriveOnColor(baseOklchStr: string): OnColorResult {
    const parsed = parseOklch(baseOklchStr);
    if (!parsed) throw new Error(`Invalid OKLCH: ${baseOklchStr}`);

    const baseRgb: Rgb = { r: parsed.r, g: parsed.g, b: parsed.b };
    const whiteRgb: Rgb = { r: 255, g: 255, b: 255 };
    const blackRgb: Rgb = { r: 0, g: 0, b: 0 };

    const contrastWhite = getContrast(baseRgb, whiteRgb);
    const contrastBlack = getContrast(baseRgb, blackRgb);

    if (contrastWhite >= 4.5 && contrastWhite >= contrastBlack) {
        return { oklch: 'oklch(100% 0 0)', contrast: contrastWhite, color: 'White' };
    } else if (contrastBlack >= 4.5 && contrastBlack > contrastWhite) {
        return { oklch: 'oklch(0% 0 0)', contrast: contrastBlack, color: 'Black' };
    } else {
        // Fallback: pick the best one, even if < 4.5
        const best =
            contrastWhite > contrastBlack
                ? { oklch: 'oklch(100% 0 0)', contrast: contrastWhite, color: 'White' as const }
                : { oklch: 'oklch(0% 0 0)', contrast: contrastBlack, color: 'Black' as const };

        return { ...best, warning: true };
    }
}
