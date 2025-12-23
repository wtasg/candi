# VS Code Theme

The Candi VS Code theme provides unified syntax highlighting for light and dark modes.

## Installation

### From VSIX package

1. Open VS Code and the Extensions view (`Ctrl+Shift+X`).
2. Click the "..." menu in the top-right.
3. Select **Install from VSIX...**.
4. Choose the `.vsix` file from the `/vscode` directory.

### From monorepo source

1. Open the `/vscode` folder in VS Code.
2. Press `F5` to launch an Extension Development Host with the theme.
3. To install permanently, copy the `/vscode` folder to:
   - **Linux/macOS**: `~/.vscode/extensions/`
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`

## Usage

1. Open **File > Preferences > Theme > Color Theme**.
2. Select **Candi Light** or **Candi Dark**.

## Development

Modify colors in `src/css/base.css` and run:

```bash
npm run build:vscode
```

Theme files are generated in `vscode/themes/`.
