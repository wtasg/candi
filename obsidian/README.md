# Candi Obsidian Theme

A professional Scandinavian-inspired theme for Obsidian note-taking app, featuring warm, muted tones with excellent readability.

## Features

- **Light and Dark modes** - Seamless switching between themes
- **80+ CSS variables** - Comprehensive styling coverage
- **22 primitive colors** - Additional color palette for customization
- **Optimized for reading** - Comfortable typography and spacing
- **Markdown-focused** - Beautiful rendering of all Markdown elements
- **Plugin-friendly** - Works well with popular Obsidian plugins

## Installation

### From Obsidian Community Themes (Recommended)

1. Open Obsidian Settings
2. Go to Appearance → Themes
3. Click "Browse" under Community Themes
4. Search for "Candi"
5. Click "Install and use"

### Manual Installation

1. Download `theme.css` from [GitHub Releases](https://github.com/wtasg/candi/releases)
2. Copy it to your vault's `.obsidian/themes/` folder
3. Rename it to `Candi.css`
4. In Obsidian Settings → Appearance → Themes, select "Candi"

## Color Palette

### Light Mode

- Background: Warm white (#FBF8F2)
- Surface: Light beige (#F4F0E7)
- Text: Deep charcoal (#232A30)
- Accent: Steel blue (#437085)
- Code blocks: Subtle green background
- Links: Steel blue with hover effects

### Dark Mode

- Background: Deep navy (#0D1218)
- Surface: Dark slate (#161B20)
- Text: Warm white (#E8E4DD)
- Accent: Sky blue (#4F8FAD)
- Code blocks: Darker background with syntax highlighting
- Links: Sky blue with hover effects

## Styled Elements

### Markdown

- **Headings**: Hierarchical sizing with accent colors
- **Code blocks**: Syntax highlighting with comfortable background
- **Inline code**: Subtle background with monospace font
- **Blockquotes**: Left border with italic text
- **Lists**: Proper indentation and markers
- **Tables**: Clean borders and alternating rows
- **Links**: Underlined on hover with accent color
- **Bold/Italic**: Proper font weights

### UI Elements

- **Sidebar**: Subtle background with clear hierarchy
- **File explorer**: Hover states and active file highlighting
- **Search**: Clear input fields with focus states
- **Tags**: Pill-style with accent background
- **Buttons**: Consistent styling across the app
- **Modals**: Proper layering and shadows

### Editor

- **Active line**: Subtle highlight
- **Selection**: Accent color with transparency
- **Cursor**: Visible accent color
- **Line numbers**: Muted color
- **Fold indicators**: Clear visual markers

## Plugin Compatibility

Tested and optimized for:

- **Dataview**: Table and list styling
- **Calendar**: Date highlighting
- **Kanban**: Card and column styling
- **Graph View**: Node and link colors
- **Excalidraw**: Canvas background
- **Tasks**: Checkbox and status styling

## Customization

You can customize the theme by adding CSS snippets to `.obsidian/snippets/`:

### Example: Custom Accent Color

```css
.theme-light {
  --accent-h: 200;
  --accent-s: 50%;
  --accent-l: 50%;
}

.theme-dark {
  --accent-h: 200;
  --accent-s: 60%;
  --accent-l: 60%;
}
```

### Example: Custom Font

```css
body {
  --font-text: 'Your Font', -apple-system, sans-serif;
  --font-monospace: 'Your Mono Font', 'Courier New', monospace;
}
```

## Switching Between Light and Dark

Obsidian automatically switches themes based on your system preference, or you can:

1. Open Settings → Appearance
2. Toggle "Base color scheme" between Light and Dark
3. The Candi theme adapts automatically

## Troubleshooting

### Theme not appearing

- Ensure the file is in `.obsidian/themes/` folder
- Check the file is named with `.css` extension
- Restart Obsidian

### Colors look wrong

- Check if you have CSS snippets that might override theme colors
- Disable other themes and snippets to isolate the issue
- Try switching between light and dark modes

### Plugin conflicts

Some plugins may have their own styling that conflicts with the theme. Try:

1. Disable plugins one by one to identify conflicts
2. Report issues on GitHub with plugin details

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See [LICENSE](LICENSE) for details.

## Credits

Part of the [Candi Design System](https://github.com/wtasg/candi) - A comprehensive design system with themes for multiple platforms.

## Links

- [Main Repository](https://github.com/wtasg/candi)
- [Report Issues](https://github.com/wtasg/candi/issues)
- [Obsidian Forum](https://forum.obsidian.md/)
- [Submit to Community Themes](https://github.com/obsidianmd/obsidian-releases)
