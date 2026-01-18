/**
 * Shared Color Conversion Utility for Candi Design System.
 * Reference: https://bottosson.github.io/posts/oklab/
 */

/**
 * Converts OKLCH values to sRGB.
 * @param {number} l - Lightness (0-1)
 * @param {number} c - Chroma (0-~0.4)
 * @param {number} h - Hue (0-360)
 * @param {number} a - Alpha (0-1)
 * @returns {object} {r, g, b, a} in 0-255 range
 */
function oklchToRgb(l, c, h, a = 1) {
    const hr = (h * Math.PI) / 180;
    const aCoord = c * Math.cos(hr);
    const bCoord = c * Math.sin(hr);

    const l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
    const m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
    const s_ = l - 0.0894841775 * aCoord - 1.291485548 * bCoord;

    const L = Math.pow(Math.max(0, l_), 3);
    const M = Math.pow(Math.max(0, m_), 3);
    const S = Math.pow(Math.max(0, s_), 3);

    let r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
    let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
    let b = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;

    const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);

    r = Math.round(Math.min(1, Math.max(0, gamma(r))) * 255);
    g = Math.round(Math.min(1, Math.max(0, gamma(g))) * 255);
    b = Math.round(Math.min(1, Math.max(0, gamma(b))) * 255);
    const alpha = Math.round(Math.min(1, Math.max(0, a)) * 255);

    return { r, g, b, a: alpha };
}

/**
 * Formats RGB to 6-digit Hex (e.g. #FFFFFF)
 */
function toHex6(rgba) {
    const r = rgba.r.toString(16).padStart(2, '0').toUpperCase();
    const g = rgba.g.toString(16).padStart(2, '0').toUpperCase();
    const b = rgba.b.toString(16).padStart(2, '0').toUpperCase();
    return `#${r}${g}${b}`;
}

/**
 * Formats RGB to 8-digit Hex with Alpha (e.g. 0XFFFFFFFF)
 * Used by Flutter.
 */
function toHex8(rgba) {
    const alpha = rgba.a.toString(16).padStart(2, '0').toUpperCase();
    const r = rgba.r.toString(16).padStart(2, '0').toUpperCase();
    const g = rgba.g.toString(16).padStart(2, '0').toUpperCase();
    const b = rgba.b.toString(16).padStart(2, '0').toUpperCase();
    return `0X${alpha}${r}${g}${b}`;
}

/**
 * Parses an oklch(...) string into its components and RGB values.
 */
function parseOklch(str) {
    const match = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
    if (!match) return null;

    const l = parseFloat(match[1]) / 100;
    const c = parseFloat(match[2]);
    const h = parseFloat(match[3]);
    const a = match[4] ? parseFloat(match[4]) : 1;

    const rgb = oklchToRgb(l, c, h, a);
    return {
        ...rgb,
        l, c, h, opacity: a
    };
}

module.exports = {
    oklchToRgb,
    toHex6,
    toHex8,
    parseOklch
};
