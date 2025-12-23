# Vim Theme

Candi provides OKLCH-based colorschemes for terminal and GUI Vim.

## Installation

### Manual

Copy the `.vim` files to your colors directory:

```bash
cp vim/colors/*.vim ~/.vim/colors/
```

### Plugin Manager

Using **vim-plug**:

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
