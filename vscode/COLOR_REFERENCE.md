# Candi Color Reference

This document lists all available color tokens in the Candi theme. These colors are defined in `src/data/colors.js` and are available across all platforms.

## Semantic Colors

Core colors for UI building. These have derived variants (subtle, soft, strong, outline).

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| accent | Steel blue | Lighter steel | Primary actions |
| secondary | Terracotta | Lighter terracotta | Secondary actions |
| success | Forest green | Lighter green | Success states |
| warning | Amber | Lighter amber | Warning states |
| error | Coral red | Lighter coral | Error states |
| info | Slate blue | Lighter slate | Info states |

### Semantic Variants

Each semantic color has these variants:

- `*-subtle` — Light background tint
- `*-soft` — Softer foreground
- `*-strong` — Darker/stronger variant
- `*-outline` — For borders
- `on-*` — Text color on the base color

## Primitive Colors

Pure color primitives with Tailwind-like variations. Used for bracket colorization and available for custom styling.

| Base | Hue | Variants |
|------|-----|----------|
| red | 25 | red, red-subtle, red-soft, red-strong, red-outline, on-red |
| blue | 250 | blue, blue-subtle, blue-soft, blue-strong, blue-outline, on-blue |
| green | 145 | green, green-subtle, green-soft, green-strong, green-outline, on-green |
| yellow | 90 | yellow, yellow-subtle, yellow-soft, yellow-strong, yellow-outline, on-yellow |
| magenta | 330 | magenta, magenta-subtle, magenta-soft, magenta-strong, magenta-outline, on-magenta |
| cyan | 200 | cyan, cyan-subtle, cyan-soft, cyan-strong, cyan-outline, on-cyan |
| teal | 175 | teal, teal-subtle, teal-soft, teal-strong, teal-outline, on-teal |
| pink | 0 | pink, pink-subtle, pink-soft, pink-strong, pink-outline, on-pink |
| gold | 70 | gold, gold-subtle, gold-soft, gold-strong, gold-outline, on-gold |
| silver | 250 | silver, silver-subtle, silver-soft, silver-strong, silver-outline, on-silver |

## Structural Colors

| Token | Usage |
|-------|-------|
| bg | Page background |
| surface | Cards, sections |
| elevated | Modals, popups |
| text | Primary text |
| text-subtle | Secondary text |
| text-muted | Tertiary text |
| border | Borders |
| border-strong | Strong borders |
| divider | Divider lines |

## Terminal Colors

| Token | Usage |
|-------|-------|
| terminal-black | ANSI Black |
| terminal-red | ANSI Red |
| terminal-green | ANSI Green |
| terminal-yellow | ANSI Yellow |
| terminal-blue | ANSI Blue |
| terminal-magenta | ANSI Magenta |
| terminal-cyan | ANSI Cyan |
| terminal-white | ANSI White |

## Syntax Highlighting

| Token | Usage |
|-------|-------|
| syntax-keyword | Keywords (if, for, const) |
| syntax-type | Types and classes |
| syntax-var | Variables |
| syntax-const | Constants |
| syntax-func | Functions |
| syntax-string | Strings |

## Bracket Pair Colors

The theme uses these primitives for bracket pair colorization:

1. Blue (`editorBracketHighlight.foreground1`)
2. Magenta (`editorBracketHighlight.foreground2`)
3. Cyan (`editorBracketHighlight.foreground3`)
4. Yellow (`editorBracketHighlight.foreground4`)
5. Green (`editorBracketHighlight.foreground5`)
6. Red (`editorBracketHighlight.foreground6`)

---

## Language-Specific Syntax Highlighting

The theme provides semantic token colors and granular token scopes for many languages:

| Language | Semantic Tokens | Token Scopes |
|----------|-----------------|--------------|
| TypeScript/JavaScript | Classes, Interfaces, Enums, Namespaces | Types, Imports, Arrow Functions |
| Python | Classes, Modules, Decorators | Builtins, Docstrings, `self` |
| Rust | Macros, Namespaces, Lifetimes | Traits, `self`, Attributes |
| Go | Namespaces | Packages, Builtins, Types |
| HTML/XML | — | Tags, Attributes, Strings |
| CSS/SASS | — | Properties, Values, Selectors |
| JSX/TSX | Components | Attributes, Tags |
| JSON/YAML | — | Keys, Values, Booleans |
| Shell | — | Variables, Builtins |
| SQL | — | Keywords, Table Names |

---

For more information, see the [Candi Documentation](https://github.com/wtasg/candi).
