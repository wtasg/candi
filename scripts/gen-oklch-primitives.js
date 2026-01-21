/**
 * Semantic Color Generator
 *
 * Implements the "Derivation Contract" to generate a deterministic palette
 * from a small set of hand-tuned Anchor Colors.
 *
 * Rules:
 * 1. Anchors are the ONLY freeform OKLCH values.
 * 2. All variants (subtle, soft, strong, outline, on) are mathematically derived.
 * 3. "On" colors are automatically selected for accessible contrast (White/Black).
 */

const { oklchToRgb, parseOklch, toHex6 } = require('./color-conv');
const logger = require('./logger');

// =============================================================================
// 1. Define Anchor Colors (Hand-Tuned Singles Source of Truth)
// =============================================================================
const ANCHORS = {
    light: {
        accent: 'oklch(45% 0.08 250)',    // Muted Identity
        secondary: 'oklch(50% 0.07 15)',  // Muted Companion
        success: 'oklch(45% 0.06 145)',   // Muted Moss
        warning: 'oklch(50% 0.07 75)',    // Muted Ochre
        error: 'oklch(45% 0.08 25)',      // Muted Brick
        info: 'oklch(45% 0.06 225)',      // Muted Slate
    },
    dark: {
        accent: 'oklch(70% 0.08 250)',    // Muted Identity
        secondary: 'oklch(75% 0.07 15)',  // Muted Companion
        success: 'oklch(80% 0.06 145)',   // Muted Moss
        warning: 'oklch(85% 0.07 75)',    // Muted Ochre
        error: 'oklch(80% 0.08 25)',      // Muted Brick
        info: 'oklch(80% 0.06 225)',      // Muted Slate
    }
};

// =============================================================================
// 2. Define Derivation Contract
// =============================================================================
// =============================================================================
// 2. Define Derivation Contract (Tuned for Non-Regression)
// =============================================================================
// Light Mode: "Subtle" means lighter but VIBRANT (Hygge).
const VARIANTS_LIGHT = {
    subtle: { dl: +0.33, dc: 0.60 },
    soft: { dl: +0.10, dc: 0.80 },
    warm: { dl: +0.15, dc: 0.85 },
    base: { dl: 0, dc: 1.00 },
    hot: { dl: -0.05, dc: 1.15 },
    strong: { dl: -0.10, dc: 1.10 },
    outline: { dl: -0.15, dc: 0.70 },
};

// Dark Mode: "Subtle" means darker and restrained.
const VARIANTS_DARK = {
    subtle: { dl: -0.27, dc: 0.60 },
    soft: { dl: +0.10, dc: 0.80 },
    warm: { dl: -0.15, dc: 0.85 },
    base: { dl: 0, dc: 1.00 },
    hot: { dl: -0.05, dc: 1.15 },
    strong: { dl: -0.10, dc: 1.10 },
    outline: { dl: -0.15, dc: 0.70 },
};

const VARIANTS = {
    light: VARIANTS_LIGHT,
    dark: VARIANTS_DARK
};

// =============================================================================
// Utilities
// =============================================================================

// =============================================================================
// Naming Contract
// =============================================================================
// Internal JS: camelCase (e.g. warningSubtle)
// Serialized tokens (CSS): kebab-case (e.g. --candi-warning-subtle)
// The output of this script follows the Internal JS contract (camelCase).
// =============================================================================

// Utilities
// =============================================================================

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

// Check if an RGB object is within the valid 0-255 range
function inGamut(rgb) {
    const { r, g, b } = rgb;
    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

// Binary search Chroma downward until color fits in sRGB gamut
function fitToGamut(l, c, h) {
    let low = 0;
    let high = c;
    let bestC = 0;

    // optimization: check strict bounds first
    if (inGamut(oklchToRgb(l, c, h))) {
        return c;
    }

    // Binary search for maximum valid Chroma
    // Precision: 0.001 is sufficient for OKLCH
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

// Simple relative luminance for contrast calculation (from sRGB 0-1)
function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(rgb1, rgb2) {
    const lum1 = getLuminance(rgb1.r / 255, rgb1.g / 255, rgb1.b / 255);
    const lum2 = getLuminance(rgb2.r / 255, rgb2.g / 255, rgb2.b / 255);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

// Derive a single color variant
function deriveColor(oklchStr, variantRules) {
    const parsed = parseOklch(oklchStr);
    if (!parsed) throw new Error(`Invalid OKLCH: ${oklchStr}`);

    let newL = parsed.l + variantRules.dl;
    let rawC = parsed.c * variantRules.dc;
    let newH = parsed.h; // Hue is invariant

    // 1. Clamp Lightness to 0-1
    newL = clamp(newL, 0, 1);

    // 2. Gamut Mapping (Binary Search Downwards)
    // Ensures we don't return invalid RGB colors that would clip unpredictably
    let newC = fitToGamut(newL, rawC, newH);

    return {
        oklch: `oklch(${Math.round(newL * 100)}% ${parseFloat(newC.toFixed(4))} ${parseFloat(newH.toFixed(2))})`,
        l: newL, c: newC, h: newH
    };
}

// Automatic On-Color Selection
function deriveOnColor(baseOklchStr) {
    const parsed = parseOklch(baseOklchStr);
    const baseRgb = { r: parsed.r, g: parsed.g, b: parsed.b }; // 0-255 from parseOklch

    const whiteRgb = { r: 255, g: 255, b: 255 };
    const blackRgb = { r: 0, g: 0, b: 0 };

    const contrastWhite = getContrast(baseRgb, whiteRgb);
    const contrastBlack = getContrast(baseRgb, blackRgb);

    if (contrastWhite >= 4.5 && contrastWhite >= contrastBlack) {
        return { oklch: 'oklch(100% 0 0)', contrast: contrastWhite, color: 'White' };
    } else if (contrastBlack >= 4.5 && contrastBlack > contrastWhite) {
        return { oklch: 'oklch(0% 0 0)', contrast: contrastBlack, color: 'Black' };
    } else {
        // Fallback: Pick the best one, even if < 4.5
        const best = contrastWhite > contrastBlack ?
            { oklch: 'oklch(100% 0 0)', contrast: contrastWhite, color: 'White' } :
            { oklch: 'oklch(0% 0 0)', contrast: contrastBlack, color: 'Black' };

        return { ...best, warning: true };
    }
}

// =============================================================================
// Main Generation
// =============================================================================

function generatePalette({ verbose = false } = {}) {
    const palette = {};

    ['light', 'dark'].forEach(mode => {
        palette[mode] = {};
        if (verbose || logger.isVerbose) logger.log(`\n--- Generating [${mode}] ---`);

        Object.entries(ANCHORS[mode]).forEach(([name, anchorValue]) => {
            if (verbose || logger.isVerbose) logger.log(`Anchor: ${name} (${anchorValue})`);

            // 1. Base (Direct anchor)
            palette[mode][name] = {
                oklch: anchorValue,
                name: name.charAt(0).toUpperCase() + name.slice(1),
                usage: `Semantic ${name}`
            };

            // 2. Variants
            Object.entries(VARIANTS[mode]).forEach(([variantName, rules]) => {
                if (variantName === 'base') return; // Already handled

                const derived = deriveColor(anchorValue, rules);
                const fullName = `${name}-${variantName}`;
                const keyName = name + variantName.charAt(0).toUpperCase() + variantName.slice(1);

                palette[mode][keyName] = {
                    oklch: derived.oklch,
                    name: `${name} ${variantName}`,
                    usage: `Derived ${variantName} of ${name}`
                };
                if (verbose || logger.isVerbose) logger.log(`  -> ${keyName.padEnd(20)}: ${derived.oklch}`);
            });

            // 3. On-Color
            const onResult = deriveOnColor(anchorValue);
            const onKeyName = 'on' + name.charAt(0).toUpperCase() + name.slice(1);
            palette[mode][onKeyName] = {
                oklch: onResult.oklch,
                name: `On ${name}`,
                usage: `Text on ${name}`
            };

            if (verbose || logger.isVerbose) {
                const status = onResult.warning ? 'WARN (<4.5)' : 'PASS';
                logger.log(`  -> ${onKeyName.padEnd(20)}: ${onResult.oklch} [Contrast: ${onResult.contrast.toFixed(2)} ${status}]`);
            }
        });
    });

    return palette;
}

// Run if executed directly
if (require.main === module) {
    const generated = generatePalette();
    logger.log('\n--- Generated JSON Structure (Preview) ---');
    logger.log(JSON.stringify(generated, null, 2));
    if (logger.isVerbose) {
        logger.log('\nGeneration complete.');
    } else {
        console.log('Semantic color generation complete.');
    }
}

module.exports = { generatePalette, ANCHORS, VARIANTS };
