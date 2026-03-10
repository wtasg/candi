# Candi GNOME Theme

Professional Scandinavian-inspired GTK theme for GNOME desktop environment.

## Features

- **GTK3 and GTK4 support** - Works with modern GNOME applications
- **Light and Dark variants** - Seamless theme switching
- **Complete widget coverage** - All GTK widgets styled
- **Semantic colors** - Consistent color usage across applications

## Installation

### Method 1: Manual Installation

1. Download the theme files from [GitHub Releases](https://github.com/wtasg/candi/releases)
2. Extract the archive
3. Copy the theme directory to your themes folder:

   ```bash
   mkdir -p ~/.themes
   cp -r gnome ~/.themes/Candi
   ```

4. Apply the theme:
   - Install GNOME Tweaks: `sudo apt install gnome-tweaks`
   - Open GNOME Tweaks → Appearance
   - Select "Candi" for Applications theme

### Method 2: GNOME Extensions

If using GNOME Shell extensions for theme management:

```bash
gsettings set org.gnome.desktop.interface gtk-theme 'Candi'
```

### Dark Mode

GNOME automatically switches between light and dark variants based on your system preference:

```bash
# Enable dark mode
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'

# Enable light mode
gsettings set org.gnome.desktop.interface color-scheme 'prefer-light'
```

## Included Files

```text
gnome/
├── index.theme          # Theme metadata
├── gtk-3.0/
│   ├── gtk.css         # GTK3 light theme
│   └── gtk-dark.css    # GTK3 dark theme
└── gtk-4.0/
    ├── gtk.css         # GTK4 light theme
    └── gtk-dark.css    # GTK4 dark theme
```

## Color Palette

### Light Theme

- Background: Warm white (#F8F6F3)
- Surface: Light beige (#F1EEE9)
- Text: Deep charcoal (#0D0B07)
- Accent: Steel blue (#0064A3)
- Success: Sage green (#4A754C)
- Warning: Amber (#CB882E)
- Error: Muted red (#B75B55)

### Dark Theme

- Background: Deep navy (#171614)
- Surface: Dark slate (#252421)
- Text: Warm white (#E0DEDA)
- Accent: Sky blue (#2098DB)
- Success: Mint green (#75A776)
- Warning: Gold (#E1AD63)
- Error: Coral (#D47C76)

### Primitive Colors

The theme includes 10 `@define-color` primitive colors for custom styling:

| Variable        | Light Mode       | Dark Mode        |
|-----------------|------------------|------------------|
| candi_red       | rgb(181,74,70)   | rgb(223,127,120) |
| candi_blue      | rgb(34,102,164)  | rgb(109,163,218) |
| candi_green     | rgb(62,131,67)   | rgb(118,175,119) |
| candi_yellow    | rgb(208,169,45)  | rgb(236,202,108) |
| candi_magenta   | rgb(168,64,162)  | rgb(209,121,202) |
| candi_cyan      | rgb(43,161,167)  | rgb(108,190,194) |
| candi_teal      | rgb(17,132,110)  | rgb(101,175,156) |
| candi_pink      | rgb(218,125,155) | rgb(243,163,187) |
| candi_gold      | rgb(206,144,66)  | rgb(231,179,117) |
| candi_silver    | rgb(169,175,180) | rgb(124,129,134) |

## Compatibility

- **GNOME 40+**: Full support
- **GNOME 3.38+**: Full support
- **GTK3 applications**: Full support
- **GTK4 applications**: Full support

## Styled Applications

The theme provides optimized styling for:

- GNOME Files (Nautilus)
- GNOME Terminal
- GNOME Text Editor
- GNOME Settings
- Firefox (GTK theme)
- LibreOffice
- And all GTK-based applications

## Uninstallation

Remove the theme directory:

```bash
rm -rf ~/.themes/Candi
```

Reset to default theme:

```bash
gsettings reset org.gnome.desktop.interface gtk-theme
```

## Troubleshooting

### Theme not appearing in GNOME Tweaks

Ensure the theme is in the correct location:

```bash
ls ~/.themes/Candi/index.theme
```

### Dark mode not switching automatically

Check your GNOME version supports automatic theme switching (GNOME 42+).

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See [LICENSE](LICENSE) for details.

## Credits

Part of the [Candi Design System](https://github.com/wtasg/candi) - A comprehensive design system with themes for multiple platforms.

## Links

- [Main Repository](https://github.com/wtasg/candi)
- [Report Issues](https://github.com/wtasg/candi/issues)
- [Documentation](https://github.com/wtasg/candi#readme)
- [GNOME Look](https://www.gnome-look.org/) (Coming Soon)
