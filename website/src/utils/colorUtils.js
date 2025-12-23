// Color conversion utilities
// OKLCH to RGB conversion using OKLab as intermediate
// Reference: https://bottosson.github.io/posts/oklab/
export function oklchToRgb(l, c, h, a = 1) {
  // Convert OKLCH to OKLab (a, b coordinates)
  const hr = (h * Math.PI) / 180;
  const aCoord = c * Math.cos(hr);
  const bCoord = c * Math.sin(hr);

  // OKLab to nonlinear LMS (cone response)
  // These are the cube-root transformed LMS values
  const l_ = l / 100 + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
  const m_ = l / 100 - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
  const s_ = l / 100 - 0.0894841775 * aCoord - 1.291485548 * bCoord;

  // Convert nonlinear LMS to linear LMS by cubing
  // Use signed cube to handle negative values (out-of-gamut colors)
  // See: OKLab spec notes on handling negative LMS values
  const L = l_ * l_ * l_;
  const M = m_ * m_ * m_;
  const S = s_ * s_ * s_;

  // Linear LMS to linear sRGB
  let r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
  let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
  let b = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;

  // Apply sRGB gamma correction and clamp to [0, 255]
  // Clamping handles out-of-gamut colors by clipping
  const gamma = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);

  r = Math.round(Math.min(1, Math.max(0, gamma(r))) * 255);
  g = Math.round(Math.min(1, Math.max(0, gamma(g))) * 255);
  b = Math.round(Math.min(1, Math.max(0, gamma(b))) * 255);

  return { r, g, b, a };
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function oklchToHex(l, c, h) {
  const rgb = oklchToRgb(l, c, h);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// Calculate relative luminance for WCAG contrast
export function getRelativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate WCAG contrast ratio
export function getContrastRatio(rgb1, rgb2) {
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Get WCAG compliance level
export function getWCAGLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

// Check if a color combination passes WCAG standards
export function checkAccessibility(fgColor, bgColor) {
  const fgRgb = oklchToRgb(fgColor.l, fgColor.c, fgColor.h);
  const bgRgb = oklchToRgb(bgColor.l, bgColor.c, bgColor.h);
  const ratio = getContrastRatio(fgRgb, bgRgb);
  const level = getWCAGLevel(ratio);

  return {
    ratio: ratio.toFixed(2),
    level,
    passes: ratio >= 4.5,
    passesLarge: ratio >= 3,
  };
}
