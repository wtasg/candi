/**
 * Candi Core — Public API
 *
 * Reusable color-science utilities from the Candi design system:
 * OKLCH conversions, gamut mapping, contrast, palette generation,
 * token validation, and CSS variable generation.
 */

// Types
export type {
    Rgb,
    Rgba,
    OklchComponents,
    DerivationRule,
    DerivedColor,
    OnColorResult,
    ColorToken,
    SemanticToken,
    VariantSet,
    Palette,
    Anchors,
    ValidationResult,
} from './types.js';

// Color Conversions
export { oklchToRgb, toHex6, toHex8, parseOklch } from './color-conv.js';

// Gamut Mapping
export { inGamut, fitToGamut } from './gamut.js';

// Contrast & Accessibility
export { getLuminance, getContrast, deriveOnColor } from './contrast.js';

// Color Derivation
export { clamp, deriveColor, VARIANTS_LIGHT, VARIANTS_DARK, VARIANTS } from './derive.js';

// Palette Generation
export { ANCHORS, generatePalette } from './palette.js';
export type { GeneratePaletteOptions, GeneratedPalette } from './palette.js';

// Naming Utilities
export { toKebab, replaceBetween } from './naming.js';

// Token Validation
export {
    validateOklchFormat,
    validateKeyParity,
    validateTokenStructure,
    validatePaletteStructure,
} from './tokens.js';

// CSS Generation
export { generateVars, generateVarMap } from './css.js';

// Semantic Integrity
export { checkSemanticIntegrity } from './guard.js';
export type { IntegrityViolation } from './guard.js';

// Logger
export { logger } from './logger.js';
export type { Logger } from './logger.js';
