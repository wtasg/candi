" Candi Dark Colorscheme
" Generated from Candi Design System

hi clear
if exists("syntax_on")
    syntax reset
endif

let g:colors_name = "candi-dark"
set background=dark

" UI Highlighting
hi Normal             guifg=#E8E4DD ctermfg=254 guibg=#0D1218 ctermbg=233
hi CursorLine         guibg=#161B20 ctermbg=234
hi LineNr             guifg=#7C7A76 ctermfg=243 guibg=#0D1218 ctermbg=233
hi CursorLineNr       guifg=#4F8FAD ctermfg=109 guibg=#0D1218 ctermbg=233
hi Visual             guifg=#1C2229 ctermfg=235 guibg=#4F8FAD ctermbg=109
hi Search             guifg=#1C2229 ctermfg=235 guibg=#C77A41 ctermbg=173
hi VertSplit          guifg=#2A2E33 ctermfg=236 guibg=#0D1218 ctermbg=233
hi StatusLine         guifg=#E8E4DD ctermfg=254 guibg=#161B20 ctermbg=234
hi StatusLineNC       guifg=#7C7A76 ctermfg=243 guibg=#161B20 ctermbg=234
hi Pmenu              guifg=#E8E4DD ctermfg=254 guibg=#161B20 ctermbg=234
hi PmenuSel           guifg=#1C2229 ctermfg=235 guibg=#4F8FAD ctermbg=109
hi MatchParen         guifg=#4F8FAD ctermfg=109 gui=bold cterm=bold

" Syntax Highlighting
hi Comment            guifg=#7C7A76 ctermfg=243 gui=italic cterm=italic
hi Constant           guifg=#C77A41 ctermfg=173
hi String             guifg=#58905A ctermfg=108
hi Character          guifg=#58905A ctermfg=108
hi Number             guifg=#C77A41 ctermfg=173
hi Boolean            guifg=#C77A41 ctermfg=173
hi Float              guifg=#C77A41 ctermfg=173

hi Identifier         guifg=#E8E4DD ctermfg=254
hi Function           guifg=#3D98D1 ctermfg=74

hi Statement          guifg=#E7729B ctermfg=211 gui=bold cterm=bold
hi Conditional        guifg=#E7729B ctermfg=211
hi Repeat             guifg=#E7729B ctermfg=211
hi Label              guifg=#E7729B ctermfg=211
hi Operator           guifg=#E8E4DD ctermfg=254
hi Keyword            guifg=#E7729B ctermfg=211
hi Exception          guifg=#CE7069 ctermfg=174

hi PreProc            guifg=#9FA5F9 ctermfg=147
hi Type               guifg=#9FA5F9 ctermfg=147
hi Special            guifg=#9FA5F9 ctermfg=147
hi Underlined         guifg=#4F8FAD ctermfg=109 gui=underline cterm=underline
hi Error              guifg=#1C2229 ctermfg=235 guibg=#CE7069 ctermbg=174
hi Todo               guifg=#1C2229 ctermfg=235 guibg=#4F8FAD ctermbg=109 gui=bold cterm=bold
