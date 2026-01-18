# Changelog

## 0.0.32

### Added

- **Theme Completion**:
  - **Neovim UI**: Support for Floating Windows, WinBar, MsgArea, and CurSearch.
  - **Treesitter**: Native highlighting for `@variable`, `@function`, `@keyword`, etc. (guarded for standard Vim).
  - **Plugins**: Explicit support for Telescope, Gitsigns, Nvim-Tree, Bufferline, Airline, Lightline.
  - **Primitives**: Exposed `Candi*` and `CandiOn*` highlight groups for customization.

### Fixed

- **Standard Vim Compatibility**: Resolved `W18` error by guarding Neovim-specific groups.
- **Light Theme**: Restored high-contrast Sapphire Blue statusline.

## 0.0.31

- **Synchronization**: Version bump.
