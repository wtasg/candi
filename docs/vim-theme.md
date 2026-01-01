# Vim Theme

Candi provides OKLCH-based colorschemes for terminal and GUI Vim.

## Installation

### Release Artifacts

Download `vim.zip` from the latest GitHub release and extract:

```bash
unzip vim.zip
cp vim/colors/*.vim ~/.vim/colors/
```

For Neovim:

```bash
mkdir -p ~/.config/nvim/colors
cp vim/colors/*.vim ~/.config/nvim/colors/
```

See [Using Release Artifacts](using-release-artifacts.md) for detailed instructions.

### Manual (From Source)

Copy the `.vim` files to your colors directory:

```bash
cp vim/colors/*.vim ~/.vim/colors/
```

### Plugin Manager

Using vim-plug:

```vim
Plug 'wtasg/candi', { 'rtp': 'vim/' }
```

## Usage

Enable the theme in your `.vimrc`:

```vim
" Dark mode
set background=dark 
colorscheme candi-dark

" Light mode
set background=light
colorscheme candi-light
```

## Setup

Ensure your terminal supports true color:

```vim
if (has("termguicolors"))
  set termguicolors
endif
```
