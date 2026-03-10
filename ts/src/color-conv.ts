/**
 * Color Conversion Utilities for OKLCH ↔ sRGB.
 * Reference: https://bottosson.github.io/posts/oklab/
 */

import type { Rgba, OklchComponents } from './types.js';

/**
 * Converts OKLCH values to sRGB.
 * @param l - Lightness (0-1)
 * @param c - Chroma (0-~0.4)
 * @param h - Hue (0-360)
 * @param a - Alpha (0-1), default 1
 * @returns {r, g, b, a} in 0-255 range
 */
export function oklchToRgb(l: number, c: number, h: number, a: number = 1): Rgba {
    const hr = (h * Math.PI) / 180;
    const aCoord = c * Math.cos(hr);
    const bCoord = c * Math.sin(hr);

    // OKLab → LMS (cone response)
    const l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
    const m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
    const s_ = l - 0.0894841775 * aCoord - 1.291485548 * bCoord;

    // Cube LMS values (clamped to prevent negative)
    const L = Math.pow(Math.max(0, l_), 3);
    const M = Math.pow(Math.max(0, m_), 3);
    const S = Math.pow(Math.max(0, s_), 3);

    // LMS³ → Linear sRGB
    let r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
    let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
    let b = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;

    // sRGB gamma correction
    const gamma = (x: number): number =>
        x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

    // Clamp and scale to 0-255
    const rOut = Math.round(Math.min(1, Math.max(0, gamma(r))) * 255);
    const gOut = Math.round(Math.min(1, Math.max(0, gamma(g))) * 255);
    const bOut = Math.round(Math.min(1, Math.max(0, gamma(b))) * 255);
    const aOut = Math.round(Math.min(1, Math.max(0, a)) * 255);

    return { r: rOut, g: gOut, b: bOut, a: aOut };
}

/**
 * Formats RGB to 6-digit Hex (e.g. #FFFFFF).
 */
export function toHex6(rgba: { r: number; g: number; b: number }): string {
    const r = rgba.r.toString(16).padStart(2, '0').toUpperCase();
    const g = rgba.g.toString(16).padStart(2, '0').toUpperCase();
    const b = rgba.b.toString(16).padStart(2, '0').toUpperCase();
    return `#${r}${g}${b}`;
}

/**
 * Formats RGB to 8-digit Hex with Alpha (e.g. 0XFFFFFFFF).
 * Used by Flutter.
 */
export function toHex8(rgba: Rgba): string {
    const alpha = rgba.a.toString(16).padStart(2, '0').toUpperCase();
    const r = rgba.r.toString(16).padStart(2, '0').toUpperCase();
    const g = rgba.g.toString(16).padStart(2, '0').toUpperCase();
    const b = rgba.b.toString(16).padStart(2, '0').toUpperCase();
    return `0X${alpha}${r}${g}${b}`;
}

/**
 * Parses an oklch(...) string into its components and RGB values.
 * @returns Parsed components or null if the string is invalid.
 */
export function parseOklch(str: string): OklchComponents | null {
    const match = str.match(
        /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i
    );
    if (!match) return null;

    const l = parseFloat(match[1]!) / 100;
    const c = parseFloat(match[2]!);
    const h = parseFloat(match[3]!);
    const a = match[4] ? parseFloat(match[4]) : 1;

    const rgb = oklchToRgb(l, c, h, a);
    return {
        ...rgb,
        l,
        c,
        h,
        opacity: a,
    };
}
