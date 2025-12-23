" Candi Dark Colorscheme
" Generated from Candi Design System

hi clear
if exists("syntax_on")
    syntax reset
endif

let g:colors_name = "candi-dark"
set background=dark

" UI Highlighting
hi Normal          guifg=#E8E4DD guibg=#0D1218
hi CursorLine      guibg=#161B20 gui=none
hi LineNr          guifg=#7C7A76 guibg=#0D1218
hi CursorLineNr    guifg=#4F8FAD guibg=#0D1218
hi Visual          guibg=#4F8FAD guifg=#1C2229
hi Search          guibg=#C77A41 guifg=#1C2229
hi VertSplit       guifg=#2A2E33 guibg=#0D1218
hi StatusLine      guifg=#E8E4DD guibg=#161B20 gui=none
hi StatusLineNC    guifg=#7C7A76 guibg=#161B20 gui=none
hi Pmenu           guibg=#161B20 guifg=#E8E4DD
hi PmenuSel        guibg=#4F8FAD guifg=#1C2229
hi MatchParen      guifg=#4F8FAD gui=bold

" Syntax Highlighting
hi Comment         guifg=#7C7A76 gui=italic
hi Constant        guifg=#C77A41
hi String          guifg=#58905A
hi Character       guifg=#58905A
hi Number          guifg=#C77A41
hi Boolean         guifg=#C77A41
hi Float           guifg=#C77A41

hi Identifier      guifg=#E8E4DD gui=none
hi Function        guifg=#4F8FAD

hi Statement       guifg=#4F8FAD gui=bold
hi Conditional     guifg=#4F8FAD
hi Repeat          guifg=#4F8FAD
hi Label           guifg=#4F8FAD
hi Operator        guifg=#E8E4DD
hi Keyword         guifg=#4F8FAD
hi Exception       guifg=#CE7069

hi PreProc         guifg=#C77A41
hi Type            guifg=#C77A41
hi Special         guifg=#C77A41
hi Underlined      guifg=#4F8FAD gui=underline
hi Error           guifg=#1C2229 guibg=#CE7069
hi Todo            guifg=#1C2229 guibg=#4F8FAD gui=bold
