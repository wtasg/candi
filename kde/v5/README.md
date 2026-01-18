# Candi Theme for KDE Plasma 5

This directory contains KDE color scheme files for the Candi theme, compatible with KDE Plasma 5.

## Installation

1. Copy the `.colors` files to your KDE color schemes directory:

   ```bash
   cp CandiLight.colors ~/.local/share/color-schemes/
   cp CandiDark.colors ~/.local/share/color-schemes/
   ```

   Or for system-wide installation:

   ```bash
   sudo cp CandiLight.colors /usr/share/color-schemes/
   sudo cp CandiDark.colors /usr/share/color-schemes/
   ```

2. Open KDE System Settings
3. Navigate to Appearance → Colors
4. Select "Candi Light" or "Candi Dark" from the list
5. Click "Apply"

## Files

- `CandiLight.colors` - Light theme variant
- `CandiDark.colors` - Dark theme variant

## Color Scheme Structure

The color scheme files define colors for:

- Windows (backgrounds and borders)
- Buttons and controls
- Text selection
- Views (lists, tables)
- Tooltips
- Headers
- Complementary areas
- Window manager (title bars)
- Primitive colors (`[Colors:Candi]` section with Red, Blue, Green, Yellow, Magenta, Cyan, Teal, Pink, Gold, Silver)

All colors are derived from the Candi Design System's OKLCH color space and converted to RGB for KDE compatibility.

## Compatibility

While the color scheme format remains compatible across Plasma 5 and 6, color schemes should be updated to include new Plasma 6 color roles for optimal compatibility. These files will work on both versions, but may display visual regressions on Plasma 6 if they don't account for new color roles introduced in that version.
