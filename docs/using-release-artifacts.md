# Using Prebuilt Release Artifacts

Candi provides prebuilt artifacts for each release, allowing you to use the theme without building from source. This is the recommended approach for most users.

## Available Artifacts

Each GitHub release includes the following artifacts:

| Artifact | Contents | Use Case |
| :--- | :--- | :--- |
| `theme.zip` | Web theme (`dist/` folder) | Using Candi with Tailwind CSS or vanilla CSS |
| `vim.zip` | Vim colorschemes | Vim/Neovim users |
| `kde.zip` | KDE color schemes | KDE Plasma desktop users |
| `vscode-theme-candi-*.vsix` | VS Code extension | VS Code users |
| `docs.zip` | Documentation website | Offline documentation reference |

## Downloading Artifacts

1. Visit the [Candi Releases page](https://github.com/wtasg/candi/releases)
2. Choose the latest release
3. Download the artifact(s) you need from the **Assets** section

## Installation Guides by Platform

### Web (theme.zip)

**For Tailwind CSS projects:**

1. Extract `theme.zip`:

   ```bash
   unzip theme.zip
   ```

2. Copy the `dist/` folder to your project or install via npm:

   ```bash
   npm install @wtasnorg/candi
   ```

3. Import in your CSS (Tailwind v4):

   ```css
   @import "tailwindcss";
   @import "@wtasnorg/candi/v4";
   ```

**For vanilla CSS projects:**

1. Extract `theme.zip` and copy the CSS file:

   ```bash
   unzip theme.zip
   cp dist/theme.css your-project/styles/
   ```

2. Link in your HTML:

   ```html
   <link rel="stylesheet" href="styles/theme.css">
   ```

See [Use with Tailwind CSS](use-with-tailwindcss.md) and [Use without Tailwind CSS](use-without-tailwindcss.md) for detailed integration guides.

---

### Vim (vim.zip)

1. Extract `vim.zip`:

   ```bash
   unzip vim.zip
   ```

2. Copy colorschemes to your Vim colors directory:

   ```bash
   cp vim/colors/*.vim ~/.vim/colors/
   ```

   Or for Neovim:

   ```bash
   mkdir -p ~/.config/nvim/colors
   cp vim/colors/*.vim ~/.config/nvim/colors/
   ```

3. Enable in your `.vimrc` or `init.vim`:

   ```vim
   colorscheme candi-dark
   " or
   colorscheme candi-light
   ```

See [Vim Theme Guide](vim-theme.md) for additional configuration options.

---

### KDE Plasma (kde.zip)

1. Extract `kde.zip`:

   ```bash
   unzip kde.zip
   ```

2. Install color schemes based on your Plasma version:

   **Plasma 5/6:**

   ```bash
   cp kde/v5/*.colors ~/.local/share/color-schemes/
   ```

   **Plasma 4:**

   ```bash
   cp kde/v4/*.colors ~/.kde4/share/apps/color-schemes/
   ```

3. Apply via System Settings:
   - Open **System Settings**
   - Navigate to **Appearance → Colors**
   - Select **Candi Light** or **Candi Dark**
   - Click **Apply**

See [KDE Theme Guide](kde-theme.md) for compatibility notes and customization options.

---

### VS Code (vscode-theme-candi-*.vsix)

1. Download the `.vsix` file from the release

2. Install in VS Code:
   - Open VS Code
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
   - Type "Install from VSIX"
   - Select the downloaded `.vsix` file

3. Activate the theme:
   - Open Command Palette (`Ctrl+Shift+P`)
   - Type "Color Theme"
   - Select **Candi Light** or **Candi Dark**

Alternatively, use the Extensions view:

- Click the Extensions icon (`Ctrl+Shift+X`)
- Click the `...` menu → **Install from VSIX...**
- Choose the `.vsix` file

See [VS Code Theme Guide](vscode-theme.md) for more details.

---

### Documentation (docs.zip)

The `docs.zip` artifact contains a static build of the documentation website for offline reference.

1. Extract `docs.zip`:

   ```bash
   unzip docs.zip
   ```

2. Open in a browser:

   ```bash
   cd website/dist
   # Open index.html in your browser
   ```

   Or serve with a local server:

   ```bash
   npx serve website/dist
   ```

## When to Build from Source

You should build from source if you need to:

- **Customize colors** - Modify OKLCH values in `src/css/base.css`
- **Contribute** - Develop new features or fix bugs
- **Use unreleased features** - Test changes from the main branch
- **Integrate into a build pipeline** - Automate theme generation

See the [main README](../README.md#development) for development setup instructions.

## Verifying Artifact Integrity

All release artifacts are generated via automated GitHub Actions. To verify:

1. Check the release was created by the `github-actions` bot
2. Review the build logs in the Actions tab
3. Compare checksums if provided in the release notes

## Support

If you encounter issues with prebuilt artifacts:

1. Check the [documentation website](https://wtasg.github.io/candi/)
2. Review platform-specific guides in the `docs/` folder
3. Open an issue on [GitHub](https://github.com/wtasg/candi/issues)
