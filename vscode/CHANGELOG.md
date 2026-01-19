# Changelog

## 0.0.33

### Added

- **Semantic Token Colors**: Language-aware highlighting for TypeScript, JavaScript, Python, Rust, and Go
- **Language-Specific Token Scopes**: 55+ new scopes for:
  - HTML/XML: Tags, attributes, strings
  - CSS/SASS/SCSS: Properties, values, units, pseudo-classes
  - JavaScript/TypeScript: Arrow functions, type annotations, imports/exports
  - JSX/TSX: Component tags, attribute names
  - Python: Decorators, builtins, docstrings
  - Go: Package names, builtin functions
  - Rust: Macros, lifetimes, attributes
  - JSON/YAML: Keys, values, booleans
  - Shell: Variables, builtins
  - SQL: Keywords, table names
  - Dockerfile: Instructions
  - GraphQL: Types, variables

### Changed

- Theme file size increased from ~815 to 1359 lines (67% increase in token coverage)

### Fixed

- **Light Theme**: Editor background now uses `surface` token for warmer, subtler tone (was too bright)

## 0.0.32

### Added

- **Theme Completion**:
  - **Deep Dive UI**: Diff Editor, Merge Conflicts, Notebooks, Minimap, Keybinding Labels, Charts.
  - **Semantic Highlighting**: Enabled for TypeScript, Python, Rust.
  - **Syntax Tokens**: Granular mapping for `punctuation`, `meta`, `entity`, etc.
  
## 0.0.31

- **Synchronization**: Version bump.
