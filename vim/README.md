# Candi Vim Colorscheme

A professional Scandinavian-inspired colorscheme for Vim and Neovim, featuring warm, muted tones with excellent contrast and readability.

## Features

- **Light and Dark variants** - Carefully crafted for both backgrounds
- **True color support** - Full 24-bit color with fallback to 256-color terminals
- **Highly configurable** - 7 customization options
- **Semantic colors** - Consistent color usage across all highlight groups
- **Plugin support** - Works great with popular plugins
- **Filetype-specific** - Enhanced highlighting for common languages

## Installation

### Using vim-plug

```vim
Plug 'wtasg/candi'
```

### Using Vundle

```vim
Plugin 'wtasg/candi'
```

### Using Pathogen

```bash
cd ~/.vim/bundle
git clone https://github.com/wtasg/candi.git
```

### Manual Installation

1. Download the colorscheme files
2. Copy `candi-light.vim` and `candi-dark.vim` to `~/.vim/colors/`

## Usage

Add to your `.vimrc` or `init.vim`:

```vim
" For true color support
if has('termguicolors')
  set termguicolors
endif

" Set the colorscheme
colorscheme candi-light  " or candi-dark
set background=light     " or dark
```

## Configuration

Customize the colorscheme by setting these variables **before** loading it:

```vim
" Enable/disable bold text (default: 1)
let g:candi_bold = 1

" Enable/disable italic text (default: 1 for GUI, 0 for terminal)
let g:candi_italic = 1

" Enable/disable underlines (default: 1)
let g:candi_underline = 1

" Enable/disable undercurls for spell checking (default: 1)
let g:candi_undercurl = 1

" Enable/disable inverse highlighting (default: 1)
let g:candi_inverse = 1

" Italic comments (default: 1)
let g:candi_italic_comments = 1

" Italic strings (default: 0)
let g:candi_italic_strings = 0

" Then load the colorscheme
colorscheme candi-dark
```

## Supported Plugins

The colorscheme includes optimized highlighting for:

- **Git Integration**: GitGutter, Signify
- **Linting**: ALE (Asynchronous Lint Engine), COC (Conquer of Completion)
- **File Navigation**: NERDTree, CtrlP
- **And more**: Works well with most Vim plugins

## Supported Languages

Enhanced syntax highlighting for:

- Markdown
- HTML
- CSS
- JavaScript
- Python
- JSON
- Vim Script

## Color Palette

### Light Theme

- Background: Warm white (#FBF8F2)
- Text: Deep charcoal (#232A30)
- Accent: Steel blue (#437085)
- Success: Sage green (#4A754C)
- Warning: Amber (#CB882E)
- Error: Muted red (#B75B55)

### Dark Theme

- Background: Deep navy (#0D1218)
- Text: Warm white (#E8E4DD)
- Accent: Sky blue (#4F8FAD)
- Success: Mint green (#5CA368)
- Warning: Gold (#D89A3D)
- Error: Coral (#C76B66)

## Comparison with Popular Themes

| Feature | Gruvbox | Candi |
|---------|---------|-------|
| Configuration Options | ✅ 7+ | ✅ 7 |
| Terminal Colors | ✅ Full | ✅ Full |
| UI Highlight Groups | ✅ 40+ | ✅ 40+ |
| Syntax Highlighting | ✅ Complete | ✅ Complete |
| Plugin Support | ✅ 10+ | ✅ 8 |
| Filetype Specific | ✅ 15+ | ✅ 7 |
| Design Philosophy | Retro groove | Scandinavian minimalism |

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See [LICENSE](LICENSE) for details.

## Credits

Part of the [Candi Design System](https://github.com/wtasg/candi) - A comprehensive design system with themes for multiple platforms.

Inspired by:

- [Gruvbox](https://github.com/morhetz/gruvbox) - For the professional structure and configuration approach
- Scandinavian design principles - For the color palette and aesthetic

## Links

- [Main Repository](https://github.com/wtasg/candi)
- [Report Issues](https://github.com/wtasg/candi/issues)
- [Documentation](https://github.com/wtasg/candi#readme)
