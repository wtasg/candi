# VS Code Theme

The Candi VS Code theme provides unified syntax highlighting for light and dark modes.

## Installation

### GitHub Release

Download the `.vsix` file from the [latest release](https://github.com/wtasg/candi/releases).

Install via Command Palette:

1. Open VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
3. Type "Install from VSIX"
4. Select the downloaded `.vsix` file

Install via Extensions View:

1. Open Extensions view (`Ctrl+Shift+X`)
2. Click the `...` menu in the top-right
3. Select Install from VSIX...
4. Choose the downloaded `.vsix` file

See [Using Release Artifacts](using-release-artifacts.md) for more details.

### From Built VSIX (Source)

If you've built the `.vsix` file from source using `npm run vscode:package`, follow the same installation steps above.

### For Development

1. Open the `/vscode` folder in VS Code.
2. Press `F5` to launch an Extension Development Host with the theme.
3. To install permanently, copy the `/vscode` folder to:
   - Linux/macOS: `~/.vscode/extensions/`
   - Windows: `%USERPROFILE%\.vscode\extensions\`

## Usage

1. Open File > Preferences > Theme > Color Theme.
2. Select Candi Light or Candi Dark.

## Development

Modify colors in `src/data/colors.js` and run:

```bash
npm run build:vscode
```

> [!NOTE]
> The Light Theme uses a refined background strategy where the `editor.background` uses the `surface` token for a subtler, muted feel, while the sidebar uses the `bg` token.

Theme files are generated in `vscode/themes/`.
