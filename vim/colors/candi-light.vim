" Candi Light Colorscheme
" Generated from Candi Design System

hi clear
if exists("syntax_on")
    syntax reset
endif

let g:colors_name = "candi-light"
set background=light

" UI Highlighting
hi Normal             guifg=#232A30 ctermfg=235 guibg=#FBF8F2 ctermbg=255
hi CursorLine         guibg=#F4F0E7 ctermbg=255
hi LineNr             guifg=#83878B ctermfg=245 guibg=#FBF8F2 ctermbg=255
hi CursorLineNr       guifg=#437085 ctermfg=67 guibg=#FBF8F2 ctermbg=255
hi Visual             guifg=#FFFFFF ctermfg=231 guibg=#437085 ctermbg=67
hi Search             guifg=#FFFFFF ctermfg=231 guibg=#B0652A ctermbg=137
hi VertSplit          guifg=#E0DED8 ctermfg=253 guibg=#FBF8F2 ctermbg=255
hi StatusLine         guifg=#232A30 ctermfg=235 guibg=#F4F0E7 ctermbg=255
hi StatusLineNC       guifg=#83878B ctermfg=245 guibg=#F4F0E7 ctermbg=255
hi Pmenu              guifg=#232A30 ctermfg=235 guibg=#F4F0E7 ctermbg=255
hi PmenuSel           guifg=#FFFFFF ctermfg=231 guibg=#437085 ctermbg=67
hi MatchParen         guifg=#437085 ctermfg=67 gui=bold cterm=bold

" Syntax Highlighting
hi Comment            guifg=#83878B ctermfg=245 gui=italic cterm=italic
hi Constant           guifg=#B0652A ctermfg=137
hi String             guifg=#4A754C ctermfg=65
hi Character          guifg=#4A754C ctermfg=65
hi Number             guifg=#B0652A ctermfg=137
hi Boolean            guifg=#B0652A ctermfg=137
hi Float              guifg=#B0652A ctermfg=137

hi Identifier         guifg=#232A30 ctermfg=235
hi Function           guifg=#437085 ctermfg=67

hi Statement          guifg=#437085 ctermfg=67 gui=bold cterm=bold
hi Conditional        guifg=#437085 ctermfg=67
hi Repeat             guifg=#437085 ctermfg=67
hi Label              guifg=#437085 ctermfg=67
hi Operator           guifg=#232A30 ctermfg=235
hi Keyword            guifg=#437085 ctermfg=67
hi Exception          guifg=#B75B55 ctermfg=174

hi PreProc            guifg=#B0652A ctermfg=137
hi Type               guifg=#B0652A ctermfg=137
hi Special            guifg=#B0652A ctermfg=137
hi Underlined         guifg=#437085 ctermfg=67 gui=underline cterm=underline
hi Error              guifg=#FFFFFF ctermfg=231 guibg=#B75B55 ctermbg=174
hi Todo               guifg=#FFFFFF ctermfg=231 guibg=#437085 ctermbg=67 gui=bold cterm=bold
