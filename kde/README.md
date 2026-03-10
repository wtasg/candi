# Candi KDE Plasma Color Schemes

Professional Scandinavian-inspired color schemes for KDE Plasma desktop environment.

## Features

- **Light and Dark variants** - Carefully crafted for both themes
- **Complete color coverage** - All KDE color roles defined
- **Semantic colors** - Consistent color usage across the desktop
- **Multiple versions** - Support for KDE Plasma 5 and 6

## Installation

### Method 1: Manual Installation

1. Download the color scheme files from [GitHub Releases](https://github.com/wtasg/candi/releases)
2. Extract the archive
3. Copy the `.colors` files to your color schemes directory:

   ```bash
   cp kde/v5/*.colors ~/.local/share/color-schemes/
   ```

4. Apply the theme:
   - Open System Settings → Appearance → Colors
   - Select "Candi Light" or "Candi Dark"
   - Click "Apply"

### Method 2: KDE Store (Coming Soon)

Search for "Candi" in System Settings → Appearance → Colors → Get New Color Schemes

## Included Files

### Plasma Color Schemes

- `v4/CandiLight.colors` - Light theme for KDE Plasma 4
- `v4/CandiDark.colors` - Dark theme for KDE Plasma 4
- `v5/CandiLight.colors` - Light theme for KDE Plasma 5/6
- `v5/CandiDark.colors` - Dark theme for KDE Plasma 5/6

### Konsole Terminal Color Schemes

- `konsole/CandiLight.colorscheme` - Light theme for Konsole
- `konsole/CandiDark.colorscheme` - Dark theme for Konsole

See [konsole/README.md](konsole/README.md) for Konsole-specific installation instructions.

## Color Palette

### Light Theme

- Background: Warm white (#F8F6F3)
- Text: Deep charcoal (#0D0B07)
- Accent: Steel blue (#0064A3)
- Success: Sage green (#4A754C)
- Warning: Amber (#CB882E)
- Error: Muted red (#B75B55)

### Dark Theme

- Background: Deep navy (#171614)
- Text: Warm white (#E0DEDA)
- Accent: Sky blue (#2098DB)
- Success: Mint green (#75A776)
- Warning: Gold (#E1AD63)
- Error: Coral (#D47C76)

### Primitive Colors

The `[Colors:Candi]` section provides 10 primitive colors for custom theming:

| Color   | Light Mode    | Dark Mode     |
|---------|---------------|---------------|
| Red     | 181,74,70     | 223,127,120   |
| Blue    | 34,102,164    | 109,163,218   |
| Green   | 62,131,67     | 118,175,119   |
| Yellow  | 208,169,45    | 236,202,108   |
| Magenta | 168,64,162    | 209,121,202   |
| Cyan    | 43,161,167    | 108,190,194   |
| Teal    | 17,132,110    | 101,175,156   |
| Pink    | 218,125,155   | 243,163,187   |
| Gold    | 206,144,66    | 231,179,117   |
| Silver  | 169,175,180   | 124,129,134   |

## Compatibility

- **KDE Plasma 5**: Use files from `v5/` directory
- **KDE Plasma 6**: Use files from `v5/` directory (compatible)
- **KDE Plasma 4**: Use files from `v4/` directory (legacy)

## Uninstallation

Remove the color scheme files:

```bash
rm ~/.local/share/color-schemes/Candi*.colors
```

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
