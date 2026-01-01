# Color Conversion in Candi

This document explains the color conversion system used in the Candi design system, covering why OKLCH is used, how the conversion pipeline works, and how to verify color accuracy.

## Why OKLCH?

Candi uses the **OKLCH color space** for all color definitions instead of traditional RGB or HSL. This choice provides significant benefits:

### Perceptual Uniformity

OKLCH is based on OKLab, a perceptually uniform color space. This means:

- Equal numerical changes produce visually equal changes in color
- A lightness change of 10% looks the same across all hues
- Chroma adjustments are consistent regardless of lightness or hue

### Design Benefits

```css
/* Traditional HSL - inconsistent perceived brightness */
--color-red: hsl(0, 100%, 50%);    /* Appears bright */
--color-blue: hsl(240, 100%, 50%); /* Appears dark */

/* OKLCH - consistent perceived brightness */
--candi-red: oklch(55% 0.22 25);   /* Perceptually similar */
--candi-blue: oklch(55% 0.18 250); /* brightness to red */
```

### Accessible Color Scales

Generate harmonious color scales by adjusting only lightness:

```css
--candi-accent: oklch(52% 0.06 230);        /* Base */
--candi-accent-subtle: oklch(85% 0.03 230); /* Lighter (same hue) */
```

### Wide Gamut Support

OKLCH can represent colors beyond sRGB, making themes future-proof for wide-gamut displays.

**Reference**: [A Perceptual Color Space for Image Processing](https://bottosson.github.io/posts/oklab/) by Björn Ottosson

---

## The Conversion Pipeline

Candi's multi-platform theme generation requires converting OKLCH colors to various formats. The conversion pipeline follows these steps:

### Step 1: Parse OKLCH from colors.js

Extract OKLCH values from `src/data/colors.js`:

```javascript
// Input: "oklch(98% 0.008 85)"
const match = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);

const l = parseFloat(match[1]) / 100;  // 0.98
const c = parseFloat(match[2]);         // 0.008
const h = parseFloat(match[3]);         // 85
const a = match[4] ? parseFloat(match[4]) : 1;
```

### Step 2: OKLCH → OKLab

Convert cylindrical (LCH) to rectangular (Lab) coordinates:

```javascript
const hr = (h * Math.PI) / 180;    // Hue in radians
const aCoord = c * Math.cos(hr);   // a* coordinate
const bCoord = c * Math.sin(hr);   // b* coordinate
```

Result: `{ L: 0.98, a: 0.001, b: 0.008 }`

### Step 3: OKLab → Linear RGB

Apply the OKLab → Linear RGB matrix:

```javascript
// Transform to LMS cone response
const l_ = l + 0.3963377774 * aCoord + 0.2158037573 * bCoord;
const m_ = l - 0.1055613458 * aCoord - 0.0638541728 * bCoord;
const s_ = l - 0.0894841775 * aCoord - 1.291485548 * bCoord;

// Cube to get LMS
const L = Math.pow(Math.max(0, l_), 3);
const M = Math.pow(Math.max(0, m_), 3);
const S = Math.pow(Math.max(0, s_), 3);

// Transform to linear RGB
let r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
let g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
let b = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S;
```

Result: `{ r: 0.985, g: 0.973, b: 0.949 }` (linear RGB, 0-1 range)

### Step 4: Linear RGB → sRGB

Apply gamma correction for display:

```javascript
const gamma = (x) => {
    if (x <= 0.0031308) {
        return 12.92 * x;
    }
    return 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
};

r = Math.round(Math.min(1, Math.max(0, gamma(r))) * 255);
g = Math.round(Math.min(1, Math.max(0, gamma(g))) * 255);
b = Math.round(Math.min(1, Math.max(0, gamma(b))) * 255);
```

Result: `{ r: 251, g: 248, b: 242 }` (sRGB, 0-255 range)

### Full Pipeline Example

```text
oklch(98% 0.008 85)
    ↓ Parse
{ l: 0.98, c: 0.008, h: 85, a: 1 }
    ↓ To OKLab
{ L: 0.98, a: 0.001, b: 0.008 }
    ↓ To Linear RGB
{ r: 0.985, g: 0.973, b: 0.949 }
    ↓ Apply Gamma
{ r: 251, g: 248, b: 242 }
```

---

## Platform-Specific Outputs

The conversion utility generates different formats for each platform:

### Web (CSS)

```css
/* Direct OKLCH (modern browsers) */
--candi-bg: oklch(98% 0.008 85);
```

### Flutter/Dart

```dart
// 8-digit ARGB hex
static const Color bg = Color(0xFFFBF8F2);
```

### VS Code

```json
{
  "colors": {
    "editor.background": "#FBF8F2"
  }
}
```

### Vim

```vim
hi Normal guifg=#FBF8F2 guibg=#0D1218
```

### KDE Plasma

```ini
[Colors:Window]
BackgroundNormal=251,248,242
```

All formats are generated from the same OKLCH source, ensuring perfect color consistency across platforms.

---

## Verifying Color Accuracy

### Method 1: Automated Tests

Run the color conversion test suite:

```bash
npm run test:colors
```

This validates:

- All OKLCH values convert without errors
- RGB outputs are within valid range [0, 255]
- Specific known conversions match expected values

### Method 2: Manual Verification

Verify a specific color conversion:

```bash
node -e "
const { parseOklch } = require('./scripts/color-conv.js');
const result = parseOklch('oklch(98% 0.008 85)');
console.log('RGB:', result.r, result.g, result.b);
console.log('Expected: 251 248 242');
"
```

### Method 3: Visual Comparison

Compare generated colors against reference:

```bash
# Build all themes
npm run build:all

# Open demo in browser
open website/dist/index.html
```

Visually inspect colors match design intent.

### Method 4: Reference Validation

Use external OKLCH converters to validate:

- [OKLCH Color Picker](https://oklch.com/)
- [Colorjs.io Playground](https://colorjs.io/apps/convert/)

Enter `oklch(98% 0.008 85)` and compare RGB output.

### Expected Tolerance

Due to rounding differences, expect ±1 variation in RGB values between implementations. For example:

- Our converter: `rgb(251, 248, 242)`
- External tool: `rgb(251, 248, 243)` (within tolerance)

---

## Gamut Clipping

Some OKLCH colors fall outside the sRGB gamut. The conversion pipeline clips these to valid sRGB:

```javascript
// Clamp to [0, 1] before converting to 0-255
r = Math.min(1, Math.max(0, gamma(r)));
```

### How to Avoid Clipping

Keep chroma values conservative:

- **Low lightness** (0-30%): chroma ≤ 0.1
- **Mid lightness** (30-70%): chroma ≤ 0.15
- **High lightness** (70-100%): chroma ≤ 0.1

Candi's color palette is designed to stay within sRGB gamut.

---

## Implementation Reference

The shared color conversion utility is in [`scripts/color-conv.js`](../scripts/color-conv.js):

```javascript
const { parseOklch, oklchToRgb, toHex6, toHex8 } = require('./scripts/color-conv');

// Parse and convert
const color = parseOklch('oklch(52% 0.06 230)');
// → { r: 49, g: 114, b: 150, a: 255, l: 0.52, c: 0.06, h: 230 }

// Format as hex
const hex6 = toHex6(color);  // → "#317296"
const hex8 = toHex8(color);  // → "0xFF317296" (Flutter)
```

Used by:

- `scripts/build.js` (Web CSS theme)
- `scripts/build-flutter.js` (Flutter theme)
- `scripts/build-vscode.js` (VS Code theme)
- `scripts/build-vim.js` (Vim colorscheme)
- `scripts/build-kde.js` (KDE Plasma color scheme)

---

## Further Reading

- [OKLAB Color Space](https://bottosson.github.io/posts/oklab/) - Original specification
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#ok-lab) - OKLCH in CSS
- [LCH colors in CSS](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/) - Benefits of LCH color spaces
- [Color.js](https://colorjs.io/) - JavaScript color manipulation library with OKLCH support
