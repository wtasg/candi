# Candi Design System: Features & Trade-offs Analysis

This document analyzes the architectural decisions, features, and trade-offs inherent in the Candi Design System's current implementation.

## 1. Single Source of Truth ([src/data/colors.js](file:///home/anubhav/src/gh/wtasg/candi/src/data/colors.js))

The core architectural pillar is defining all color tokens in a single JavaScript object using OKLCH values, which is then compiled to various platform formats.

### Features

* **Absolute Consistency**: Guarantees that "Accent Blue" is mathematically identical on a Flutter mobile app, a React web dashboard, and a VS Code editor window.
* **Automated Validation**: Enables build-time checks for accessibility (WCAG contrast ratios) before themes are even generated.
* **scalability**: Adding a new color token (e.g., `terminalCyan`) in one place propagates it to 7+ different platforms automatically.
* **Metadata-Rich**: The data structure includes `name` and `usage` documentation alongside values, allowing docs to be auto-generated from code.

### Trade-offs

* **Build Step Dependency**: Developers cannot simply "tweak a hex code" in a CSS file. Changing a color requires modifying the JS source and running a build script (`npm run build:all`).
* **Abstraction Overhead**: New contributors must understand the data structure schema in [colors.js](file:///home/anubhav/src/gh/wtasg/candi/src/data/colors.js) rather than standard CSS/Sass.
* **Rigidity**: Platform-specific tweaks (e.g., "Make this button slightly darker *only* on VS Code because of its rendering engine") require either complicating the schema or hacking the build script, violating the "clean" architecture.

## 2. OKLCH Color Space

Candi uses the OKLCH color model exclusively for definition, converting to other formats only when necessary.

### Features

* **Perceptual Uniformity**: A 10% change in Lightness `L` is perceived as a 10% change by the human eye, unlike HSL or RGB. This makes generating accessible hover/active states capability predictable.
* **Gamut capabilities**: Access to P3 and Rec.2020 colors that are impossible to represent in standard sRGB hex codes.
* **Predictable Gradients**: Gradients interpolate naturally without the "gray dead zone" often seen in sRGB gradients.

### Trade-offs

* **Tooling Friction**: Most design tools and developer color pickers still default to Hex/RGB. Developers may need specific converters (like the one built into Candi's docs).
* **Browser/Platform Support**: While modern Web/CSS support is good, older platforms or rigid frameworks may require fallback conversions (RGB approximation), potentially losing the vividness of the original color.

## 3. Multi-Platform Monorepo Strategy

The project houses the core design system and all platform implementations (Flutter, VS Code, Vim, etc.) in a single repository.

### Features

* **Synchronized Releases**: A single version bump (e.g., `0.0.23`) applies to the entire ecosystem, preventing version drift between the web app and the mobile app.
* **Shared Tooling**: Scripts like `color-conv.js` are shared across build processes, ensuring that the algorithm to convert OKLCH to Hex for Vim is the exact same one used for VS Code.

### Trade-offs

* **Heavy Checkout**: Developers working solely on the Flutter package still pull down the web, Vim, and KDE code.
* **Complex CI/CD**: The build pipeline is complex (`npm run build:all`), and a failure in one platform's build script (e.g., a breaking change in a generic XML parser for KDE) can theoretically block releases for all other platforms.

## 4. CSS-in-JS / Tailwind Plugin Approach

For the web, Candi opts for a Tailwind plugin + CSS Variables approach rather than a component library (e.g., React components).

### Features

* **Framework Agnostic**: The output ([base.css](file:///home/anubhav/src/gh/wtasg/candi/src/css/base.css) or Tailwind classes) works with React, Vue, Svelte, or plain HTML. It is not tied to a specific JavaScript framework's component lifecycle.
* **Low Bundle Size**: Shipping CSS variables and utility generators is significantly lighter than shipping a full component library runtime.
* **Vivid Customization**: Tailwind v4 integration allows usage of the `@theme` directive for native-feeling integration.

### Trade-offs

* **No Pre-built Components**: Developers get *color tokens* and *utilities*, not *components*. You still have to build your own standard `<Button>` or `<Card>` component to apply these styles consistently.
* **Class Name Verbosity**: Users must adopt semantic class names (e.g., `bg-candi-surface text-candi-text`) which can be verbose compared to a pre-styled `<CandiCard>`.

## Summary

Candi prioritizes **correctness, consistency, and maintenance** over **initial ease of setup** for ad-hoc projects. It is designed for organizations that need strict brand alignment across a diverse technology stack, accepting the trade-off of a build-driven workflow.
