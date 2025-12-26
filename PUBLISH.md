# Publishing Guide

This document describes the publishing process for each Candi Design System product/project.

## Table of Contents

- [NPM Package (Core Library)](#npm-package-core-library)
- [Flutter Package (pub.dev)](#flutter-package-pubdev)
- [VSCode Extension](#vscode-extension)
- [Vim Colorscheme](#vim-colorscheme)
- [KDE Plasma Themes](#kde-plasma-themes)
- [GNOME Themes](#gnome-themes)
- [Obsidian Theme](#obsidian-theme)
- [Website (GitHub Pages)](#website-github-pages)

---

## NPM Package (Core Library)

The core Candi Design System library for Tailwind CSS.

### Prerequisites

- npm account with publish access
- GitHub Packages configured (currently publishing to `@wtasg` scope)

### Publishing Steps

1. **Update version in `package.json`**

   ```bash
   npm version patch  # or minor, major
   ```

2. **Build the package**

   ```bash
   npm run build:all
   ```

3. **Run tests**

   ```bash
   npm run test:all
   ```

4. **Update CHANGELOG.md**

   Document all changes in the root `CHANGELOG.md`

5. **Commit and tag**

   ```bash
   git add .
   git commit -m "Release v0.0.X"
   git tag v0.0.X
   git push origin main --tags
   ```

6. **Publish to GitHub Packages**

   The GitHub Actions workflow will automatically publish when a tag is pushed.

   Or manually:

   ```bash
   npm publish
   ```

### Files Included

- `dist/` - Built files
- `src/` - Source files
- `README.md`, `LICENSE`, `CHANGELOG.md`

---

## Flutter Package (pub.dev)

Flutter package for the Candi color palette.

### Prerequisites

- pub.dev account
- Flutter SDK installed

### Publishing Steps

1. **Update version in `flutter/pubspec.yaml`**

   ```yaml
   version: 0.0.X
   ```

2. **Update `flutter/CHANGELOG.md`**

   Document changes specific to the Flutter package

3. **Build and test**

   ```bash
   npm run build:flutter
   npm run test:flutter
   ```

4. **Dry run publish**

   ```bash
   cd flutter
   flutter pub publish --dry-run
   ```

5. **Publish to pub.dev**

   ```bash
   flutter pub publish
   ```

6. **Commit changes**

   ```bash
   git add flutter/
   git commit -m "Publish Flutter package v0.0.X"
   git push
   ```

### Package URL

`https://pub.dev/packages/candi_colors`

---

## VSCode Extension

Visual Studio Code theme extension.

### Prerequisites

- VSCode Marketplace publisher account
- `vsce` (Visual Studio Code Extension Manager) installed:

  ```bash
  npm install -g @vscode/vsce
  ```

### Publishing Steps

1. **Update version in `vscode/package.json`**

   ```json
   {
     "version": "0.0.X"
   }
   ```

2. **Update `vscode/CHANGELOG.md`**

   Document all theme changes

3. **Build the extension**

   ```bash
   npm run build:vscode
   npm run test:vscode
   ```

4. **Package the extension**

   ```bash
   cd vscode
   vsce package
   ```

   This creates `vscode-theme-candi-0.0.X.vsix`

5. **Test the extension locally**

   ```bash
   code --install-extension vscode-theme-candi-0.0.X.vsix
   ```

6. **Publish to VSCode Marketplace**

   ```bash
   vsce publish
   ```

   Or manually upload the `.vsix` file to the [VSCode Marketplace](https://marketplace.visualstudio.com/manage)

7. **Commit and tag**

   ```bash
   git add vscode/
   git commit -m "Publish VSCode extension v0.0.X"
   git push
   ```

### Extension URL

`https://marketplace.visualstudio.com/items?itemName=wtasg.vscode-theme-candi`

---

## Vim Colorscheme

Vim/Neovim colorscheme files.

### Prerequisites

- vim.org account (optional, for vim.org submission)
- GitHub repository (primary distribution method)

### Publishing Steps

1. **Update `vim/CHANGELOG.md`**

   Document colorscheme changes

2. **Build and test**

   ```bash
   npm run build:vim
   npm run test:vim
   ```

3. **Create release archive**

   ```bash
   npm run artifact
   ```

   This creates `artifacts/vim.zip` containing the colorscheme files

4. **Tag release**

   ```bash
   git add vim/
   git commit -m "Update Vim colorscheme v0.0.X"
   git tag vim-v0.0.X
   git push origin main --tags
   ```

5. **Create GitHub Release**

   - Go to [GitHub Releases](https://github.com/wtasg/candi/releases)
   - Click "Draft a new release"
   - Tag: `vim-v0.0.X`
   - Title: "Vim Colorscheme v0.0.X"
   - Description: Copy from `vim/CHANGELOG.md`
   - Attach `artifacts/vim.zip`
   - Publish release

6. **Submit to vim.org** (Optional)

   - Visit [vim.org script submission](https://www.vim.org/scripts/add_script_version.php)
   - Upload the colorscheme files
   - Provide description and changelog

### Installation for Users

Users can install via:

- **vim-plug**: `Plug 'wtasg/candi'`
- **Manual**: Download from GitHub releases

---

## KDE Plasma Themes

KDE Plasma color schemes for desktop environments.

### Prerequisites

- KDE Store account (optional)

### Publishing Steps

1. **Build themes**

   ```bash
   npm run build:kde
   npm run test:kde
   ```

2. **Create release archive**

   ```bash
   npm run artifact
   ```

   This creates `artifacts/kde.zip`

3. **Tag and release**

   ```bash
   git add kde/
   git commit -m "Update KDE themes v0.0.X"
   git tag kde-v0.0.X
   git push origin main --tags
   ```

4. **Create GitHub Release**

   - Tag: `kde-v0.0.X`
   - Attach `artifacts/kde.zip`

5. **Submit to KDE Store** (Optional)

   - Visit [KDE Store](https://store.kde.org/)
   - Upload color scheme files
   - Provide screenshots and description

### Installation for Users

```bash
# Extract kde.zip
unzip kde.zip

# Install color schemes
cp kde/v5/*.colors ~/.local/share/color-schemes/
```

---

## GNOME Themes

GTK3/GTK4 themes for GNOME desktop.

### Prerequisites

- GNOME Look account (optional)

### Publishing Steps

1. **Build themes**

   ```bash
   npm run build:gnome
   npm run test:gnome
   ```

2. **Create release archive**

   ```bash
   npm run artifact
   ```

   This creates `artifacts/gnome.zip`

3. **Tag and release**

   ```bash
   git add gnome/
   git commit -m "Update GNOME themes v0.0.X"
   git tag gnome-v0.0.X
   git push origin main --tags
   ```

4. **Create GitHub Release**

   - Tag: `gnome-v0.0.X`
   - Attach `artifacts/gnome.zip`

5. **Submit to GNOME Look** (Optional)

   - Visit [GNOME Look](https://www.gnome-look.org/)
   - Upload theme files
   - Provide screenshots

### Installation for Users

```bash
# Extract gnome.zip
unzip gnome.zip

# Install theme
mkdir -p ~/.themes
cp -r gnome ~/.themes/Candi
```

---

## Obsidian Theme

Theme for Obsidian note-taking app.

### Prerequisites

- Obsidian Community Themes submission access

### Publishing Steps

1. **Build theme**

   ```bash
   npm run build:obsidian
   npm run test:obsidian
   ```

2. **Update `obsidian/manifest.json`**

   ```json
   {
     "version": "0.0.X"
   }
   ```

3. **Tag and release**

   ```bash
   git add obsidian/
   git commit -m "Update Obsidian theme v0.0.X"
   git tag obsidian-v0.0.X
   git push origin main --tags
   ```

4. **Submit to Obsidian Community Themes**

   - Fork [obsidian-releases](https://github.com/obsidianmd/obsidian-releases)
   - Add theme to `community-css-themes.json`
   - Create pull request

### Installation for Users

Users can install directly from Obsidian:

1. Settings → Appearance → Themes → Browse
2. Search for "Candi"
3. Click Install

---

## Website (GitHub Pages)

Documentation and demo website.

### Prerequisites

- GitHub Pages enabled on repository

### Publishing Steps

1. **Build website**

   ```bash
   cd website
   npm run build
   ```

2. **Deploy to GitHub Pages**

   The GitHub Actions workflow automatically deploys when changes are pushed to `main`.

   Or manually:

   ```bash
   npm run deploy
   ```

3. **Verify deployment**

   Visit `https://wtasg.github.io/candi`

### Workflow File

`.github/workflows/deploy-docs.yml`

---

## Release Checklist

Use this checklist for a complete release:

- [ ] Update version in all `package.json` files
- [ ] Update all CHANGELOG files
- [ ] Run `npm run build:all`
- [ ] Run `npm run test:all`
- [ ] Run `npm run lint:md`
- [ ] Update root `CHANGELOG.md`
- [ ] Commit all changes
- [ ] Create and push git tag
- [ ] Publish NPM package
- [ ] Publish Flutter package
- [ ] Publish VSCode extension
- [ ] Create GitHub releases for Vim, KDE, GNOME, Obsidian
- [ ] Deploy website
- [ ] Announce release (Twitter, Reddit, etc.)

---

## Automation

Consider automating the release process with:

- **GitHub Actions** - Automated publishing on tag push
- **Release Please** - Automated changelog and version management
- **Semantic Release** - Automated versioning based on commit messages

---

## Support

For questions or issues with publishing:

- Open an issue: [GitHub Issues](https://github.com/wtasg/candi/issues)
- Email: [maintainer email]
- Discord: [community link]
