# Changelog

All notable changes to the Candi Vim colorscheme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.19] - 2025-12-26

### Changed

- Version synchronization update
- No functional changes

## [0.0.18] - 2025-12-26

### Changed

- Version synchronization update
- No functional changes

## [0.0.17] - 2025-12-26

### Changed - Complete Rewrite

The Vim colorschemes have been completely rewritten to professional standards, matching the quality of popular themes like Gruvbox.

#### Configuration Options

- Added 7 user-configurable options:
  - `g:candi_bold` - Enable/disable bold text
  - `g:candi_italic` - Enable/disable italic text
  - `g:candi_underline` - Enable/disable underlines
  - `g:candi_undercurl` - Enable/disable undercurls
  - `g:candi_inverse` - Enable/disable inverse highlighting
  - `g:candi_italic_comments` - Italic comments
  - `g:candi_italic_strings` - Italic strings

#### Terminal Colors

- Added full 16-color terminal support for Neovim
- Terminal buffers now use the Candi color palette

#### UI Enhancements

- Expanded from 10 to 40+ UI highlight groups:
  - Core UI (Normal, CursorLine, ColorColumn, etc.)
  - Window elements (StatusLine, TabLine, VertSplit, etc.)
  - Messages (ErrorMsg, WarningMsg, ModeMsg, etc.)
  - Completion menu (Pmenu, PmenuSel, etc.)
  - Diffs (DiffAdd, DiffChange, DiffDelete, DiffText)
  - Spelling (SpellBad, SpellCap, SpellLocal, SpellRare)

#### Syntax Highlighting

- Complete syntax highlighting coverage:
  - Statements, conditionals, loops, exceptions
  - Identifiers, functions, types
  - Preprocessor directives
  - Constants, strings, numbers
  - Special characters and delimiters
  - Comments with italic support

#### Plugin Support

- Added highlight groups for popular plugins:
  - **Git**: GitGutter, Signify
  - **Linting**: ALE (Asynchronous Lint Engine)
  - **Completion**: COC (Conquer of Completion)
  - **Navigation**: NERDTree, CtrlP

#### Filetype-Specific Highlighting

- Enhanced highlighting for common file types:
  - **Markdown**: Headers, code blocks, lists, links
  - **HTML**: Tags, attributes, special characters
  - **CSS**: Selectors, properties, !important keyword
  - **JavaScript**: Functions, keywords, braces
  - **Python**: Built-ins, decorators, exceptions
  - **JSON**: Keys, values, braces
  - **Vim Script**: Commands, functions, comments

#### Code Organization

- Professional structure with fold markers for easy navigation
- Sections: Initialization, Settings, Terminal Colors, UI, Syntax, Plugins, Filetypes

#### Metrics

- File size: 2.3 KB → 19.7 KB per theme
- Lines of code: 52 → 373 per theme
- Highlight groups: 24 → 100+

### Comparison with Gruvbox

| Feature | Gruvbox | Candi (Before) | Candi (After) |
|---------|---------|----------------|---------------|
| Configuration Options | ✅ 7+ options | ❌ None | ✅ 7 options |
| Terminal Colors | ✅ Full support | ❌ None | ✅ Full support |
| UI Highlight Groups | ✅ 40+ groups | ⚠️ 10 groups | ✅ 40+ groups |
| Syntax Highlighting | ✅ Complete | ⚠️ Basic | ✅ Complete |
| Plugin Support | ✅ 10+ plugins | ❌ None | ✅ 8 plugins |
| Filetype Specific | ✅ 15+ languages | ❌ None | ✅ 7 languages |
| Code Organization | ✅ Fold markers | ❌ Flat | ✅ Fold markers |
| File Size | ~40 KB | 2.3 KB | 19.7 KB |

## [0.0.16] - Previous Release

### Added

- Initial Candi Light and Candi Dark colorschemes
- Basic UI highlighting (10 groups)
- Basic syntax highlighting (24 groups)
- Support for 256-color terminals
- xterm-256 color conversion
