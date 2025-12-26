# Candi Theme for GNOME

This directory contains GTK3 and GTK4 theme files for the Candi design system, compatible with both X11 and Wayland.

## Overview

The Candi GNOME theme provides a cohesive visual experience across GTK applications, featuring:

- **Nordic Design**: Hygge warmth and Lagom balance
- **OKLCH Color Space**: Perceptually uniform colors converted to CSS
- **GTK3 & GTK4**: Full support for modern GNOME applications
- **Light & Dark Variants**: Automatic theme switching support
- **X11 & Wayland**: Compatible with both display servers

## Installation

### User Installation (Recommended)

Install the theme for your user account only:

```bash
# Create themes directory if it doesn't exist
mkdir -p ~/.themes

# Copy the Candi theme
cp -r gnome ~/.themes/Candi

# Or create a symlink (useful for development)
ln -s /path/to/candi/gnome ~/.themes/Candi
```

### System-wide Installation

Install the theme for all users (requires sudo):

```bash
sudo cp -r gnome /usr/share/themes/Candi
```

## Activation

### Using GNOME Tweaks (GUI)

1. Install GNOME Tweaks:

   ```bash
   # Ubuntu/Debian
   sudo apt install gnome-tweaks
   
   # Fedora
   sudo dnf install gnome-tweaks
   
   # Arch
   sudo pacman -S gnome-tweaks
   ```

2. Open GNOME Tweaks
3. Navigate to "Appearance" → "Themes"
4. Set "Applications" to "Candi"
5. For dark mode, enable "Dark Mode" in the "Appearance" section

### Using gsettings (Command Line)

```bash
# Set GTK theme
gsettings set org.gnome.desktop.interface gtk-theme "Candi"

# Enable dark mode (GTK will automatically use gtk-dark.css)
gsettings set org.gnome.desktop.interface color-scheme "prefer-dark"

# Disable dark mode (use light theme)
gsettings set org.gnome.desktop.interface color-scheme "prefer-light"
```

### For GTK4 Applications with libadwaita

Some modern GNOME applications use libadwaita, which has its own theming system. You can force them to use your theme:

```bash
# Create config directory
mkdir -p ~/.config/gtk-4.0

# Copy theme to GTK4 config
cp gnome/gtk-4.0/gtk.css ~/.config/gtk-4.0/gtk.css
cp gnome/gtk-4.0/gtk-dark.css ~/.config/gtk-4.0/gtk-dark.css

# Set environment variable (add to ~/.bashrc or ~/.zshrc)
export GTK_THEME=Candi
```

## Theme Files

```text
gnome/
├── index.theme          # Theme metadata
├── gtk-3.0/
│   ├── gtk.css          # Light theme for GTK3
│   └── gtk-dark.css     # Dark theme for GTK3
└── gtk-4.0/
    ├── gtk.css          # Light theme for GTK4
    └── gtk-dark.css     # Dark theme for GTK4
```

## Automatic Dark Mode Switching

GNOME automatically switches between light and dark themes based on your system preference:

1. Open GNOME Settings
2. Navigate to "Appearance"
3. Toggle "Dark Mode" on or off

GTK applications will automatically load `gtk-dark.css` when dark mode is enabled.

## Color Palette

The theme uses these semantic color tokens:

| Token | Light | Dark | Usage |
| ------- | ------- | ------- | ------- |
| `theme_bg_color` | Warm white | Warm dark | Window backgrounds |
| `theme_base_color` | Pure white | Card surface | Input fields, views |
| `theme_fg_color` | Warm charcoal | Off-white | Primary text |
| `theme_selected_bg_color` | Steel blue | Lighter steel | Selected items |
| `borders` | Soft grey | Dark grey | Borders, separators |
| `link_color` | Deep blue | Sky blue | Hyperlinks |
| `warning_color` | Amber | Light amber | Warnings |
| `error_color` | Terracotta | Light terracotta | Errors |
| `success_color` | Forest green | Light green | Success states |

All colors are derived from the Candi design system's OKLCH color space, ensuring perceptual uniformity and accessibility.

## Customization

To customize the theme:

1. Edit the source colors in `src/css/base.css`
2. Rebuild the theme:

   ```bash
   npm run build:gnome
   ```

3. Restart your GTK applications or re-apply the theme

## Compatibility

- **GTK3**: 3.20 and later
- **GTK4**: 4.0 and later
- **GNOME Shell**: All versions (theme affects applications only, not Shell itself)
- **Display Servers**: X11 and Wayland

## Troubleshooting

### Theme not appearing in GNOME Tweaks

- Ensure the theme is installed in `~/.themes/Candi` or `/usr/share/themes/Candi`
- Check that `index.theme` exists in the theme directory
- Restart GNOME Tweaks

### Colors look wrong

- Verify the theme files are up to date: `npm run build:gnome`
- Check for theme caching: `rm -rf ~/.cache/gtk-*`
- Restart your GTK applications

### Dark theme not working

- Ensure dark mode is enabled in GNOME Settings
- Check the setting: `gsettings get org.gnome.desktop.interface color-scheme`
- Verify `gtk-dark.css` exists in both gtk-3.0 and gtk-4.0 directories

### libadwaita apps not themed

- Copy theme files to `~/.config/gtk-4.0/`
- Set `GTK_THEME=Candi` environment variable
- Note: Some libadwaita apps may ignore custom themes by design

## Related Themes

Candi also provides themes for:

- **KDE Plasma**: See [kde-theme.md](kde-theme.md)
- **VS Code**: See [vscode-theme.md](vscode-theme.md)
- **Vim**: See [vim-theme.md](vim-theme.md)
- **Flutter**: See [flutter-integration.md](flutter-integration.md)

All themes share the same OKLCH color palette for a consistent experience across platforms.
