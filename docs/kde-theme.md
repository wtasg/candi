# KDE Plasma Theme

Candi provides color schemes for KDE Plasma desktop environments, supporting versions 4, 5, and 6.

## Installation

### Release Artifacts

1. Download `kde.zip` from the latest GitHub release.

2. Extract the archive:

   ```bash
   unzip kde.zip
   ```

3. Install based on your Plasma version:

   Plasma 5 or 6:

   ```bash
   cp kde/v5/*.colors ~/.local/share/color-schemes/
   ```

   Plasma 4:

   ```bash
   cp kde/v4/*.colors ~/.kde4/share/apps/color-schemes/
   ```

   For system-wide installation (requires sudo):

   ```bash
   # Plasma 5/6
   sudo cp kde/v5/*.colors /usr/share/color-schemes/
   
   # Plasma 4
   sudo cp kde/v4/*.colors /usr/share/apps/color-schemes/
   ```

### From Source

If you're building from the repository:

```bash
# Build KDE color schemes
npm run build:kde

# Install
cp kde/v5/*.colors ~/.local/share/color-schemes/
```

See [Using Release Artifacts](using-release-artifacts.md) for more installation options.

## Applying the Theme

1. Open System Settings
2. Navigate to Appearance → Colors
3. Select Candi Light or Candi Dark from the list
4. Click Apply

The theme will be applied to all KDE applications and window decorations.

## Available Themes

- Candi Light - Warm, soft light theme with hygge aesthetics
- Candi Dark - Balanced dark theme with comfortable contrast

## Color Scheme Structure

The `.colors` files define colors for:

| Section | Elements |
| :--- | :--- |
| Windows | Backgrounds, borders, and chrome |
| Buttons | All button states and controls |
| Selection | Text selection and highlights |
| Views | Lists, tables, and tree views |
| Tooltips | Hover tooltips |
| Headers | Title bars and headers |
| Complementary | Sidebars and secondary areas |
| Window Manager | Title bars and window decorations |

All colors are derived from the Candi Design System's OKLCH color space and converted to RGB for KDE compatibility.

## Plasma 5 vs 6 Compatibility

> [!IMPORTANT]
> While the color scheme format remains compatible across Plasma 5 and 6, color schemes should be updated to include new Plasma 6 color roles for optimal compatibility.

What this means:

- Plasma 5 users: Full support with no known issues
- Plasma 6 users: Themes work but may display minor visual regressions if new color roles aren't defined
- Recommended: Use the theme version matching your Plasma version

The Candi color schemes are actively maintained for Plasma 6 and include definitions for new color roles introduced in that version.

## Customization

To customize colors:

1. Copy a Candi theme to create a new scheme:

   ```bash
   cp ~/.local/share/color-schemes/CandiLight.colors ~/.local/share/color-schemes/MyTheme.colors
   ```

2. Edit the `.colors` file in a text editor

3. Update the `[General]` section with your new name:

   ```ini
   [General]
   ColorScheme=My Theme
   Name=My Theme
   ```

4. Modify color values in RGB format (0-255):

   ```ini
   [Colors:Window]
   BackgroundNormal=249,247,243
   ```

5. Refresh System Settings to see your new theme

For advanced customization using OKLCH, modify `src/data/colors.js` in the repository and rebuild:

```bash
npm run build:kde
```

## Troubleshooting

### Theme not appearing in System Settings

- Ensure files are in the correct directory (`~/.local/share/color-schemes/` for Plasma 5/6)
- Check file permissions: `chmod 644 ~/.local/share/color-schemes/*.colors`
- Restart System Settings or log out and back in

### Colors look wrong in Plasma 6

- Verify you're using the v5 color schemes (compatible with Plasma 6)
- Check for theme updates in newer releases
- Report issues on [GitHub](https://github.com/wtasg/candi/issues)

### Inconsistent colors across applications

- Some applications may override theme colors
- Check application-specific settings
- Ensure you've applied the theme system-wide in System Settings

## Development

The KDE color schemes are generated from the same OKLCH source (`src/data/colors.js`) as all other Candi platforms:

```bash
# Build all platforms including KDE
npm run build:all

# Build only KDE
npm run build:kde

# Package into kde.zip
npm run artifact
```

Color conversion logic is in `scripts/build-kde.js` and uses the centralized converter from `scripts/color-conv.js`.

## Related Documentation

- [Using Release Artifacts](using-release-artifacts.md) - Download and installation guide
- [Color Conversion](color-conversion.md) - OKLCH to RGB conversion details
- [Customizing Colors](customizing-colors.md) - Modify the color palette
