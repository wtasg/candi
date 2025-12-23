" Candi Light Colorscheme
" Generated from Candi Design System

hi clear
if exists("syntax_on")
    syntax reset
endif

let g:colors_name = "candi-light"
set background=light

" UI Highlighting
hi Normal          guifg=#232A30 guibg=#FBF8F2
hi CursorLine      guibg=#F4F0E7 gui=none
hi LineNr          guifg=#83878B guibg=#FBF8F2
hi CursorLineNr    guifg=#437085 guibg=#FBF8F2
hi Visual          guibg=#437085 guifg=#FFFFFF
hi Search          guibg=#B0652A guifg=#FFFFFF
hi VertSplit       guifg=#E0DED8 guibg=#FBF8F2
hi StatusLine      guifg=#232A30 guibg=#F4F0E7 gui=none
hi StatusLineNC    guifg=#83878B guibg=#F4F0E7 gui=none
hi Pmenu           guibg=#F4F0E7 guifg=#232A30
hi PmenuSel        guibg=#437085 guifg=#FFFFFF
hi MatchParen      guifg=#437085 gui=bold

" Syntax Highlighting
hi Comment         guifg=#83878B gui=italic
hi Constant        guifg=#B0652A
hi String          guifg=#4A754C
hi Character       guifg=#4A754C
hi Number          guifg=#B0652A
hi Boolean         guifg=#B0652A
hi Float           guifg=#B0652A

hi Identifier      guifg=#232A30 gui=none
hi Function        guifg=#437085

hi Statement       guifg=#437085 gui=bold
hi Conditional     guifg=#437085
hi Repeat          guifg=#437085
hi Label           guifg=#437085
hi Operator        guifg=#232A30
hi Keyword         guifg=#437085
hi Exception       guifg=#B75B55

hi PreProc         guifg=#B0652A
hi Type            guifg=#B0652A
hi Special         guifg=#B0652A
hi Underlined      guifg=#437085 gui=underline
hi Error           guifg=#FFFFFF guibg=#B75B55
hi Todo            guifg=#FFFFFF guibg=#437085 gui=bold
