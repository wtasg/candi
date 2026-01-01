# Candi System Architecture

## 1. Core Philosophy

**"Expose intent, derive variation."**
We define a minimal set of semantic anchors and programmatically derive all variants. This ensures consistency, accessibility, and maintainability.

## 2. Token Pipeline

```mermaid
graph TD
    A[Anchors (Concept)] -->|Manual Import| B(gen-oklch-primitives.js)
    B -->|Derive Variants| C{Derivation Engine}
    C -->|Auto-Contrast| D[Accessible Text Colors]
    C -->|Gamut Mapping| E[Valid sRGB Colors]
    D & E -->|Export| F[src/data/colors.js]
    G[Neutrals (Hand-Tuned)] -->|Merge| F
    F -->|Build Scripts| H[Dist & Platforms]
```

### 2.1 The Source of Truth

`src/data/colors.js` is the **Authoritative Palette Assembly**.

- **Neutrals**: Defined statically in-file.
- **Semantics**: Imported dynamically from the Engine.

### 2.2 The Engine (`scripts/gen-oklch-primitives.js`)

Responsible for:

1. **Defining Anchors**: `accent`, `secondary`, `success`, `warning`, `error`, `info`.
2. **Derivation Rules**:
    - `Light`: `subtle` (L+33, C*0.80 - Lagom), `soft`, `strong`, `outline`.
    - `Dark`: `subtle` (L-27, C*0.80 - Lagom), `soft`, `strong`, `outline`.
3. **Guardrails**:
    - **WCAG Contrast**: Automatically selects White or Black for text on anchors.
    - **Gamut Correction**: Binary search reduces Chroma if OKLCH -> sRGB clips.

## 3. Naming Contract

- **Internal (JS)**: `camelCase` (e.g., `warningSubtle`).
- **External (CSS/Public)**: `kebab-case` (e.g., `--candi-warning-subtle`).

## 4. Maintenance

- **To Change an Anchor**: Edit `ANCHORS` in `scripts/gen-oklch-primitives.js`.
- **To Change a Rule**: Edit `VARIANTS` in `scripts/gen-oklch-primitives.js`.
- **NEVER** manually edit a semantic token's value in `colors.js` output or intermediate files.
