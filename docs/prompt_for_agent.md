# Agent Generation Prompt

This prompt identifies core requirements for generating the Candi Design System source files, emphasizing Nordic design principles: Hygge (warmth) and Lagom (balance).

## Core Requirements

1. Single Source of Truth: All color definitions originate from the Palette Assembly and Derivation Engine.
2. Color Space: Use OKLCH for all color definitions to ensure perceptual uniformity and accessibility.
3. Tailwind CSS Integration: Provide seamless integration via a plugin and theme extension.
4. Consistency: Use OKLCH function strings exclusively for color definitions.
5. Data Structure: Define colors with metadata (name, usage) to support documentation generation.

## Directory Structure

You must generate the following file structure:

```text
src/
├── data/
│   └── colors.js       # The Single Source of Truth
├── css/
│   └── base.css        # CSS variables (auto-generated representation)
├── index.js            # Main entry point exports
├── plugin.js           # Tailwind CSS plugin
└── theme.js            # Tailwind CSS theme extension
```

## detailed Implementation Instructions

### 1. [src/data/colors.js](file:///home/anubhav/src/gh/wtasg/candi/src/data/colors.js)

This is the most critical file. It exports a `palette` object with `light` and `dark` keys. Each color token must be an object with:

- `oklch`: The color value string (e.g., `'oklch(52% 0.06 230)'`).
- `name`: Human-readable name (e.g., `'Accent'`).
- `usage`: Description of where to use it (e.g., `'Primary actions'`).

Required Color Tokens (for both Light and Dark modes):

- Backgrounds: `bg`, `surface`, `elevated`
- Text: `text`, `textSubtle`, `textMuted`
- Borders: `border`, `borderStrong`, `divider`
- Accents: `accent`, `accentSubtle`, `onAccent`
- Secondary: `secondary`, `secondarySubtle`, `onSecondary`
- Feedback: `success`, `onSuccess`, `warning`, `onWarning`, `error`, `onError`, `info`, `onInfo`
- Interactive: `link`, `disabled`, `focusRing`
- Overlays: `overlay`, `scrim`
- Inverse: `inverseSurface`, `inverseText`
- Shadows: `shadow` (value), `shadowMd` (value), `shadowLg` (value), `shadowColor` (oklch)
- Syntax Highlighting (for code): `syntaxKeyword`, `syntaxType`, `syntaxVar`, `syntaxConst`, `syntaxFunc`, `syntaxString`
- UI States: `hover` (alpha only), `active` (alpha only)
- Terminal: `terminalBlack`, `terminalRed`, `terminalGreen`, `terminalYellow`, `terminalBlue`, `terminalMagenta`, `terminalCyan`, `terminalWhite`

Key Color Characteristics (Nordic/Scandinavian):

- Bg: Warm whites (Light: `oklch(98% 0.008 85)`) and deep warm grays (Dark: `oklch(18% 0.015 250)`).
- Accent: Steel Blue (`oklch(52% 0.06 230)`).
- Secondary: Terracotta (`oklch(58% 0.12 55)`).
- Success: Forest Green.
- Text: Warm Charcoal (not pure black).

### 2. [src/plugin.js](file:///home/anubhav/src/gh/wtasg/candi/src/plugin.js)

Create a Tailwind CSS plugin using `plugin(function ({ addUtilities, addBase, theme, e }) { ... })`.

- `addBase`: Inject CSS custom properties (`:root` and `.dark`) mapping to the OKLCH values.
  - Variable names must be prefixed with `--candi-`.
  - Example: `'--candi-bg': 'oklch(98% 0.008 85)'`.
- `addUtilities`: Generate utility classes based on the theme configuration (optional, but good for specific overrides).

### 3. [src/theme.js](file:///home/anubhav/src/gh/wtasg/candi/src/theme.js)

Export an object that extends the default Tailwind config.

- `colors.candi`: Map semantic names to the CSS variables defined in the plugin.
  - Example: `bg: 'var(--candi-bg)'`.
  - Do not map hardcoded values here; reference the variables.
- Typography: Extend `fontFamily` (Inter/system-ui) and semantic `fontSize`.
- Spacing/Layout: Add specific `borderRadius` tokens (`soft`, `softer`, `pill`) and `boxShadow` (`hygge`, `hygge-md`, `hygge-lg`).

### 4. [src/index.js](file:///home/anubhav/src/gh/wtasg/candi/src/index.js)

Export `theme` and `plugin` for consumption by `tailwind.config.js`.

### 5. [src/css/base.css](file:///home/anubhav/src/gh/wtasg/candi/src/css/base.css)

Generate a CSS file that basically replicates what [plugin.js](file:///home/anubhav/src/gh/wtasg/candi/src/plugin.js) adds to `addBase`. This serves as a standalone CSS variable definition for non-Tailwind projects.

- Include `:root` and `.dark` blocks.
- Add basic HTML/Body styles (font-family, line-height, background-color transition).

## Output Format

Please provide the code for each file in separate code blocks, clearly labeled with the file path.
