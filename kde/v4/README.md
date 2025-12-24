# Candi Theme for KDE Plasma 4

This directory contains KDE color scheme files for the Candi theme, compatible with KDE Plasma 4.

## Installation

1. Copy the `.colors` files to your KDE color schemes directory:
   ```bash
   cp CandiLight.colors ~/.kde4/share/apps/color-schemes/
   cp CandiDark.colors ~/.kde4/share/apps/color-schemes/
   ```

   Or for system-wide installation:
   ```bash
   sudo cp CandiLight.colors /usr/share/apps/color-schemes/
   sudo cp CandiDark.colors /usr/share/apps/color-schemes/
   ```

2. Open KDE System Settings
3. Navigate to Application Appearance → Colors
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
- Window manager (title bars)

All colors are derived from the Candi Design System's OKLCH color space and converted to RGB for KDE compatibility.
