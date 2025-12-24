# Candi Theme for GNOME

A Nordic-inspired GTK theme with Hygge warmth and Lagom balance, compatible with both X11 and Wayland.

## Quick Installation

```bash
# Install for current user
cp -r gnome ~/.themes/Candi

# Set as active theme
gsettings set org.gnome.desktop.interface gtk-theme "Candi"

# Enable dark mode
gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"
```

## What's Included

- **GTK3**: Full theme support for GTK 3.20+
- **GTK4**: Full theme support for GTK 4.0+
- **Light & Dark**: Automatic switching based on system preference
- **X11 & Wayland**: Compatible with both display servers

## Files

```
gnome/
├── index.theme          # Theme metadata
├── gtk-3.0/
│   ├── gtk.css          # Light theme for GTK3
│   └── gtk-dark.css     # Dark theme for GTK3
└── gtk-4.0/
    ├── gtk.css          # Light theme for GTK4
    └── gtk-dark.css     # Dark theme for GTK4
```

## Color Philosophy

All colors are generated from the Candi design system's OKLCH color space, providing:

- **Perceptual Uniformity**: Consistent visual weight across all colors
- **Accessibility**: WCAG-compliant contrast ratios
- **Nordic Aesthetic**: Warm, balanced, and harmonious

## Full Documentation

See [docs/gnome-theme.md](../docs/gnome-theme.md) for:

- Detailed installation instructions
- Theme customization guide
- Troubleshooting tips
- libadwaita app support
- Color palette reference

## Compatibility

- GNOME Shell (all versions)
- GTK3 applications
- GTK4 applications
- X11 and Wayland display servers

## Building from Source

The theme is automatically generated from `src/css/base.css`:

```bash
npm run build:gnome
```

This extracts OKLCH colors and converts them to GTK-compatible CSS.
