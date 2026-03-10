/**
 * Shared Type Definitions for Candi Color Utilities
 */

/** RGB color with channels in 0-255 range. */
export interface Rgb {
    r: number;
    g: number;
    b: number;
}

/** RGBA color with channels in 0-255 range (including alpha). */
export interface Rgba extends Rgb {
    a: number;
}

/** Parsed OKLCH components with corresponding RGB values. */
export interface OklchComponents extends Rgba {
    /** Lightness 0-1 */
    l: number;
    /** Chroma ~0-0.4 */
    c: number;
    /** Hue 0-360 degrees */
    h: number;
    /** Alpha/opacity 0-1 */
    opacity: number;
}

/** Rule for deriving a color variant from a base anchor. */
export interface DerivationRule {
    /** Lightness delta (added to base L). Positive = lighter. */
    dl: number;
    /** Chroma multiplier (applied to base C). <1.0 = less saturated. */
    dc: number;
}

/** Result of deriving a single color. */
export interface DerivedColor {
    /** Formatted OKLCH string, e.g. "oklch(83% 0.078 245)" */
    oklch: string;
    l: number;
    c: number;
    h: number;
}

/** Result of the on-color (accessible text) selection. */
export interface OnColorResult {
    oklch: string;
    contrast: number;
    color: 'White' | 'Black';
    warning?: boolean;
}

/** A single color token in the palette. */
export interface ColorToken {
    name: string;
    usage: string;
    /** OKLCH value, e.g. "oklch(50% 0.13 245)" */
    oklch?: string;
    /** Raw CSS value for non-OKLCH tokens (e.g. shadows). */
    value?: string;
}

/** A semantic palette token (output of the derivation engine). */
export interface SemanticToken {
    oklch: string;
    name: string;
    usage: string;
}

/** A set of variant rules for one color mode. */
export type VariantSet = Record<string, DerivationRule>;

/** The full two-mode palette. */
export interface Palette {
    light: Record<string, ColorToken | SemanticToken>;
    dark: Record<string, ColorToken | SemanticToken>;
}

/** Anchor definitions per mode. */
export type Anchors = {
    light: Record<string, string>;
    dark: Record<string, string>;
};

/** Token validation result. */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
