# Features and Tradeoffs

This document outlines the design decisions, technical features, and inherent tradeoffs of the Candi design system.

## 1. Single Source of Truth

The core architectural pillar is defining all color tokens in the Palette Assembly and Derivation Engine, ensuring consistency across platforms.

### Features

- Absolute Consistency: Guarantees that color tokens are mathematically identical across all supported platforms.
- Automated Validation: Enables build-time checks for accessibility (WCAG contrast ratios) before themes are generated.
- Scalability: Centralized token definitions propagate changes to all platforms automatically.
- Metadata-Rich: Includes name and usage documentation, facilitating automated documentation generation.

### Trade-offs

- Build Step Dependency: Changing a color requires modifying the source and running a build script.
- Abstraction Overhead: Requires understanding the Palette Assembly structure rather than standard CSS.
- Rigidity: Overrides for specific platforms can complicate the simplified single-source model.

## 2. OKLCH Color Space

Candi uses the OKLCH color model exclusively for definition, converting to other formats only when necessary.

### Features

- Perceptual Uniformity: Lightness adjustments are visually consistent, aiding predictable accessibility outcomes.
- Wide Gamut Capability: Access to P3 and Rec.2020 colors beyond standard sRGB.
- Interpolation Quality: Gradients remain vibrant without "gray dead zones."

### Trade-offs

- Tooling Friction: Requires specialized color converters as most legacy tools default to sRGB/HSL.
- Legacy Compatibility: Older platforms may require approximate RGB fallbacks.

## 3. Multi-Platform Monorepo Strategy

The project houses the core design system and all platform implementations (Flutter, VS Code, Vim, etc.) in a single repository.

### Features

- Synchronized Releases: Centralized versioning prevents platform drift.
- Shared Tooling: Core conversion logic is consistent across all platform generators.

### Trade-offs

- Checkout Size: Developers receive code for all platforms regardless of specific focus.
- Build Complexity: Orchestrating builds for multiple platforms requires robust CI/CD logic.

## 4. CSS-in-JS / Tailwind Plugin Approach

For the web, Candi opts for a Tailwind plugin + CSS Variables approach rather than a component library (e.g., React components).

### Features

- Framework Agnostic: Pure CSS variable distribution works with any web stack.
- Minimal Bundle Size: Native CSS variables avoid heavy runtime library overhead.
- Native Tailwind v4 support: Direct integration with the `@theme` directive.

### Trade-offs

- Asset Library Only: Provides tokens and utilities rather than pre-built UI components.
- Semantic Verbosity: Class names are descriptive and detailed.

## Summary

Candi prioritizes correctness, consistency, and maintenance over initial ease of setup for ad-hoc projects. It is designed for organizations that need strict brand alignment across a diverse technology stack, accepting the trade-off of a build-driven workflow.
