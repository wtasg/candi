# Obsidian Theme

Candi theme for Obsidian, featuring light and dark modes with OKLCH-derived colors.

---

## Installation

### Manual Installation

1. Download `obsidian.zip` from the [latest release](https://github.com/wtasg/candi/releases)
2. Extract the contents
3. Copy the `obsidian` folder to your vault's theme directory:

   ```text
   <your-vault>/.obsidian/themes/Candi/
   ```

4. The folder should contain:
   - `manifest.json`
   - `theme.css`

### Option 2: Build from Source

```bash
git clone https://github.com/wtasg/candi.git
cd candi
npm install
npm run build:obsidian
```

Copy the generated `obsidian/` directory to your vault's themes folder.

---

## Enabling the Theme

1. Open Obsidian
2. Go to Settings > Appearance
3. Under Themes, click the dropdown
4. Select Candi
5. Toggle between light and dark mode using Obsidian's base theme setting

---

## Color Mapping

| Candi Token | Obsidian Variable | Usage |
| ----------- | ----------------- | ----- |
| `bg` | `--background-primary` | Main background |
| `surface` | `--background-secondary` | Sidebar, secondary areas |
| `elevated` | `--background-secondary-alt` | Elevated surfaces |
| `text` | `--text-normal` | Primary text |
| `text-muted` | `--text-muted` | Secondary text |
| `accent` | `--interactive-accent` | Buttons, links, selections |
| `link` | `--link-color` | Internal links |
| `secondary` | `--link-external-color` | External links |
| `border` | `--divider-color` | Dividers, borders |
| `success` | `--text-success` | Success indicators |
| `warning` | `--text-warning` | Warning indicators |
| `error` | `--text-error` | Error indicators |

---

## Customization

You can override specific colors by creating a CSS snippet in your vault:

1. Create a file at `<vault>/.obsidian/snippets/candi-overrides.css`
2. Add your custom overrides:

```css
.theme-light {
    --interactive-accent: #your-color;
}

.theme-dark {
    --interactive-accent: #your-color;
}
```

1. Enable the snippet in Settings > Appearance > CSS snippets

---

## Compatibility

- Requires Obsidian 1.0.0 or later
- Supports both light and dark base themes
- Compatible with Style Settings plugin for additional customization
