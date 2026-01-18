# Using Prebuilt Release Artifacts

Candi provides prebuilt artifacts for each release, allowing you to use the theme without building from source. This is the recommended approach for most users.

## Available Artifacts

Each GitHub release includes the following versioned artifacts:

| Artifact | Contents | Use Case |
| :--- | :--- | :--- |
| `theme_VERSION.zip` | Web theme (`dist/` folder) | Tailwind CSS or vanilla CSS projects |
| `vim_VERSION.zip` | Vim colorschemes | Vim/Neovim setup |
| `kde_VERSION.zip` | KDE color schemes | KDE Plasma desktop configuration |
| `vscode-theme-candi-VERSION.vsix` | VS Code extension | VS Code theme installation |
| `docs_VERSION.zip` | Documentation website | Offline reference |

## Downloading Artifacts

### Via Browser

1. Visit the [Candi Releases page](https://github.com/wtasg/candi/releases)
2. Choose the latest release (or a specific version like [v0.0.27](https://github.com/wtasg/candi/releases/tag/v0.0.27))
3. Download the artifact(s) you need from the Assets section

### Via Command Line

Download artifacts directly using `curl` or `wget`. Replace `VERSION` with the desired version (e.g., `0.0.27`):

Using curl:

The `-L` flag follows redirects (GitHub uses redirects for release downloads) and `-O` saves the file with its original name:

```bash
# Download theme
curl -LO https://github.com/wtasg/candi/releases/download/v0.0.27/theme_0.0.27.zip

# Download vim colorschemes
curl -LO https://github.com/wtasg/candi/releases/download/v0.0.27/vim_0.0.27.zip

# Download KDE color schemes
curl -LO https://github.com/wtasg/candi/releases/download/v0.0.27/kde_0.0.27.zip

# Download VS Code extension
curl -LO https://github.com/wtasg/candi/releases/download/v0.0.27/vscode-theme-candi-0.0.27.vsix

# Download documentation
curl -LO https://github.com/wtasg/candi/releases/download/v0.0.27/docs_0.0.27.zip
```

Using wget:

`wget` automatically follows redirects and saves with the original filename. You can use brace expansion `{a,b,c}` to download multiple files:

```bash
# Download theme
wget https://github.com/wtasg/candi/releases/download/v0.0.27/theme_0.0.27.zip

# Download all artifacts at once
wget https://github.com/wtasg/candi/releases/download/v0.0.27/{theme,vim,kde,docs}_0.0.27.zip
wget https://github.com/wtasg/candi/releases/download/v0.0.27/vscode-theme-candi-0.0.27.vsix
```

Get latest release version programmatically:

This script queries the GitHub API's `/releases/latest` endpoint to get the current version tag, then uses that to construct the download URL:

```bash
# Get the latest version tag
LATEST=$(curl -s https://api.github.com/repos/wtasg/candi/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')

# Download latest theme
curl -LO "https://github.com/wtasg/candi/releases/download/v${LATEST}/theme_${LATEST}.zip"
```

## Quick Install One-Liners

For common use cases, here are single commands that download and install:

Vim (latest release):

This command queries the GitHub API to find the vim artifact URL, downloads it, extracts to a temp file, then installs to `~/.vim/colors`:

```bash
curl -sL $(curl -s https://api.github.com/repos/wtasg/candi/releases/latest | grep 'browser_download_url.*vim_' | cut -d'"' -f4) | funzip > /tmp/vim.zip && unzip -o /tmp/vim.zip -d ~/.vim/ && rm /tmp/vim.zip
```

Neovim (latest release):

Similar to Vim, but creates the Neovim colors directory and extracts there:

```bash
mkdir -p ~/.config/nvim/colors && curl -sL $(curl -s https://api.github.com/repos/wtasg/candi/releases/latest | grep 'browser_download_url.*vim_' | cut -d'"' -f4) | funzip | tar -xf - -C ~/.config/nvim/
```

VS Code (specific version):

Downloads the `.vsix` extension file and installs it using VS Code's CLI `--install-extension` flag:

```bash
curl -LO https://github.com/wtasg/candi/releases/download/v0.0.27/vscode-theme-candi-0.0.27.vsix && code --install-extension vscode-theme-candi-0.0.27.vsix
```

## Installation Guides by Platform

### Web (theme_VERSION.zip)

For Tailwind CSS projects:

1. Extract `theme_VERSION.zip`:

   ```bash
   unzip theme_0.0.27.zip
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

For vanilla CSS projects:

1. Extract and copy the CSS file:

   ```bash
   unzip theme_0.0.27.zip
   cp dist/theme.css your-project/styles/
   ```

2. Link in your HTML:

   ```html
   <link rel="stylesheet" href="styles/theme.css">
   ```

See [Use with Tailwind CSS](use-with-tailwindcss.md) and [Use without Tailwind CSS](use-without-tailwindcss.md) for detailed integration guides.

---

### Vim (vim_VERSION.zip)

1. Extract `vim_VERSION.zip`:

   ```bash
   unzip vim_0.0.27.zip
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

### KDE Plasma (kde_VERSION.zip)

1. Extract `kde_VERSION.zip`:

   ```bash
   unzip kde_0.0.27.zip
   ```

2. Install color schemes based on your Plasma version:

   Plasma 5/6:

   ```bash
   cp kde/v5/*.colors ~/.local/share/color-schemes/
   ```

   Plasma 4:

   ```bash
   cp kde/v4/*.colors ~/.kde4/share/apps/color-schemes/
   ```

3. Apply via System Settings:
   - Open System Settings
   - Navigate to Appearance → Colors
   - Select Candi Light or Candi Dark
   - Click Apply

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
   - Select Candi Light or Candi Dark

Alternatively, use the Extensions view:

- Click the Extensions icon (`Ctrl+Shift+X`)
- Click the `...` menu → Install from VSIX...
- Choose the `.vsix` file

See [VS Code Theme Guide](vscode-theme.md) for more details.

---

### Documentation (docs_VERSION.zip)

The `docs_VERSION.zip` artifact contains a static build of the documentation website for offline reference.

1. Extract `docs_VERSION.zip`:

   ```bash
   unzip docs_0.0.27.zip
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

## CI/CD Integration

### GitHub Actions

This workflow example demonstrates fetching the latest Candi version using `jq` to parse the GitHub API response, then downloading and extracting the theme for use in your build:

```yaml
name: Use Candi Theme

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Download Candi theme
        run: |
          # Get latest version
          VERSION=$(curl -s https://api.github.com/repos/wtasg/candi/releases/latest | jq -r '.tag_name' | sed 's/^v//')
          
          # Download and extract theme
          curl -LO "https://github.com/wtasg/candi/releases/download/v${VERSION}/theme_${VERSION}.zip"
          unzip "theme_${VERSION}.zip" -d ./candi-theme
          
      - name: Use theme in build
        run: |
          cp ./candi-theme/dist/theme.css ./src/styles/
          npm run build
```

### Docker

This multi-stage Dockerfile installs `curl` and `unzip`, fetches the latest version from the GitHub API using `grep` and `sed`, downloads the theme, and makes it available for your application:

```dockerfile
FROM node:20-alpine AS builder

# Download and extract Candi theme
RUN apk add --no-cache curl unzip \
    && VERSION=$(curl -s https://api.github.com/repos/wtasg/candi/releases/latest | grep '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/') \
    && curl -LO "https://github.com/wtasg/candi/releases/download/v${VERSION}/theme_${VERSION}.zip" \
    && unzip "theme_${VERSION}.zip" -d /candi

# Copy theme to your project
COPY --from=builder /candi/dist/theme.css /app/styles/
```

### Shell Script

The repository includes reusable download scripts in `scripts/`:

Using curl ([download-artifact.sh](../scripts/download-artifact.sh)):

This script accepts two arguments: the artifact type (`theme`, `vim`, `kde`, `docs`, or `vscode`) and an optional version (defaults to `latest`). It queries the GitHub API when needed and downloads the specified artifact:

```bash
#!/bin/bash
# download-artifact.sh - Download Candi artifacts from GitHub releases using curl

REPO="wtasg/candi"
ARTIFACT="${1:-theme}"
VERSION="${2:-latest}"

# Fetch latest version from GitHub API if needed
if [ "$VERSION" = "latest" ]; then
    VERSION=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" \
        | grep '"tag_name"' \
        | sed -E 's/.*"v([^"]+)".*/\1/')
fi

# Construct filename based on artifact type
case "$ARTIFACT" in
    theme|vim|kde|docs) FILENAME="${ARTIFACT}_${VERSION}.zip" ;;
    vscode) FILENAME="vscode-theme-candi-${VERSION}.vsix" ;;
esac

curl -L -O "https://github.com/${REPO}/releases/download/v${VERSION}/${FILENAME}"
```

Using wget ([download-artifact-wget.sh](../scripts/download-artifact-wget.sh)):

This wget-based alternative supports downloading all artifacts at once with the `all` option:

```bash
./scripts/download-artifact-wget.sh all 0.0.27  # Download everything
```

Usage examples:

```bash
./scripts/download-artifact.sh theme          # Download latest theme
./scripts/download-artifact.sh vim 0.0.27     # Download specific version
./scripts/download-artifact.sh vscode latest  # Download latest VS Code extension
./scripts/download-artifact-wget.sh all       # Download all latest artifacts
```

## When to Build from Source

You should build from source if you need to:

- Customize colors - Modify OKLCH values in `src/css/base.css`
- Contribute - Develop new features or fix bugs
- Use unreleased features - Test changes from the main branch
- Integrate into a build pipeline - Automate theme generation

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
