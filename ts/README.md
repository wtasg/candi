# Candi Core Utilities (TypeScript)

Reusable color-science utilities from the Candi design system.

## Features

- **OKLCH Math**: Native implementations of OKLCH to sRGB conversion.
- **Contrast Guards**: Programmatic selection of White or Black text based on target contrast ratios.
- **Gamut Mapping**: Binary search algorithms to ensure colors fit within the sRGB gamut while preserving hue.
- **Derivation Engine**: Logic for generating semantic variants (subtle, soft, strong, etc.) from anchors.

## Installation

```bash
npm install @wtasnorg/candi-core
```

## Usage

```typescript
import { parseOklch, oklchToRgb, getContrast } from '@wtasnorg/candi-core';

// Parse and convert
const gold = parseOklch('oklch(70% 0.12 70)');
const rgb = oklchToRgb(gold.l, gold.c, gold.h);

// Check contrast
const contrast = getContrast(rgb, { r: 255, g: 255, b: 255 });
console.log(`Contrast with white: ${contrast}`);
```

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
