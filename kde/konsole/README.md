# Candi Konsole Color Schemes

Professional Scandinavian-inspired color schemes for KDE Konsole terminal emulator.

## Features

- **Light and Dark variants** - Carefully crafted for both themes
- **16-color palette** - Full ANSI color support
- **Semantic colors** - Consistent with Candi Design System
- **Optimized for readability** - Excellent contrast ratios

## Installation

### Method 1: Manual Installation

1. Download the color scheme files from [GitHub Releases](https://github.com/wtasg/candi/releases)
2. Extract the archive
3. Copy the `.colorscheme` files to your Konsole color schemes directory:

   ```bash
   mkdir -p ~/.local/share/konsole
   cp kde/konsole/*.colorscheme ~/.local/share/konsole/
   ```

4. Apply the theme:
   - Open Konsole
   - Settings → Edit Current Profile → Appearance
   - Select "Candi Light" or "Candi Dark" from the Color Scheme list
   - Click "OK"

### Method 2: System-wide Installation

For all users on the system:

```bash
sudo cp kde/konsole/*.colorscheme /usr/share/konsole/
```

## Included Files

- `CandiLight.colorscheme` - Light theme for Konsole
- `CandiDark.colorscheme` - Dark theme for Konsole

## Color Palette

### Light Theme

- Background: Warm white (#FBF8F2)
- Foreground: Deep charcoal (#232A30)
- Black: #1E2226
- Red: #B75B55
- Green: #4A754C
- Yellow: #CB882E
- Blue: #437085
- Magenta: #C5547C
- Cyan: #2BA1A7
- White: #232A30

### Dark Theme

- Background: Deep navy (#0D1218)
- Foreground: Warm white (#E8E4DD)
- Black: #0A0D10
- Red: #C76B66
- Green: #5CA368
- Yellow: #D89A3D
- Blue: #4F8FAD
- Magenta: #D16890
- Cyan: #3AB3BA
- White: #E8E4DD

### Primitive Colors

The `[Candi]` section provides 10 primitive colors for custom theming:

```ini
[Candi]
Red=223,127,120
Blue=109,163,218
Green=118,175,119
Yellow=236,202,108
Magenta=209,121,202
Cyan=108,190,194
Teal=101,175,156
Pink=243,163,187
Gold=231,179,117
Silver=124,129,134
```

## Compatibility

- **Konsole**: All versions
- **Yakuake**: Compatible (uses Konsole color schemes)
- **Other KDE terminal emulators**: Should work with any that support Konsole color schemes

## Switching Themes

You can quickly switch between light and dark themes:

1. Right-click in Konsole window
2. Edit Current Profile → Appearance
3. Select the desired color scheme
4. Click "OK"

Or use keyboard shortcut: `Ctrl+Shift+,` to open settings

## Uninstallation

Remove the color scheme files:

```bash
rm ~/.local/share/konsole/Candi*.colorscheme
```

## Troubleshooting

### Color scheme not appearing

- Ensure files are in the correct location: `~/.local/share/konsole/`
- Check file permissions: `chmod 644 ~/.local/share/konsole/Candi*.colorscheme`
- Restart Konsole

### Colors look wrong

- Verify you're using a terminal with true color support
- Check your Konsole settings for any color adjustments
- Ensure no custom color profiles are interfering

## Creating Custom Variants

You can create your own variants by editing the `.colorscheme` files. Each color is defined in RGB format:

```ini
[Color0]
Color=30,34,38
```

## Development

### Local Installation for Testing

If you're developing or testing changes to the Konsole color schemes:

1. **Build the color schemes**

   ```bash
   npm run build:konsole
   ```

2. **Install locally**

   ```bash
   mkdir -p ~/.local/share/konsole
   cp kde/konsole/*.colorscheme ~/.local/share/konsole/
   ```

3. **Test in Konsole**

   - Open Konsole
   - Settings → Edit Current Profile → Appearance
   - Select "Candi Light" or "Candi Dark"
   - Click "OK"

4. **Verify changes**

   After making changes to `scripts/build-konsole.js` or color definitions:

   ```bash
   npm run build:konsole
   cp kde/konsole/*.colorscheme ~/.local/share/konsole/
   ```

   Then restart Konsole or reload the profile to see changes.

5. **Run tests**

   ```bash
   npm run test:konsole
   ```

### Quick Development Workflow

```bash
# Make changes to scripts/build-konsole.js or src/data/colors.js
npm run build:konsole && cp kde/konsole/*.colorscheme ~/.local/share/konsole/
# Reload Konsole profile to see changes
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See [LICENSE](../LICENSE) for details.

## Credits

Part of the [Candi Design System](https://github.com/wtasg/candi) - A comprehensive design system with themes for multiple platforms.

## Links

- [Main Repository](https://github.com/wtasg/candi)
- [Report Issues](https://github.com/wtasg/candi/issues)
- [KDE Konsole Documentation](https://docs.kde.org/stable5/en/konsole/konsole/)
