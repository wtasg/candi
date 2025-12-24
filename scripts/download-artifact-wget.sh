#!/bin/bash
# download-artifact-wget.sh - Download Candi artifacts from GitHub releases using wget
#
# Usage:
#   ./download-artifact-wget.sh [artifact] [version]
#
# Arguments:
#   artifact  - Type of artifact to download (default: theme)
#               Options: theme, vim, kde, docs, vscode, all
#   version   - Version to download (default: latest)
#               Use a version number like "0.0.10" or "latest"
#
# Examples:
#   ./download-artifact-wget.sh                    # Download latest theme
#   ./download-artifact-wget.sh theme              # Download latest theme
#   ./download-artifact-wget.sh vim 0.0.10         # Download vim v0.0.10
#   ./download-artifact-wget.sh all                # Download all artifacts

set -e

REPO="wtasg/candi"
ARTIFACT="${1:-theme}"
VERSION="${2:-latest}"

# Fetch latest version from GitHub API if needed
if [ "$VERSION" = "latest" ]; then
  echo "Fetching latest release version..."
  VERSION=$(wget -qO- "https://api.github.com/repos/${REPO}/releases/latest" |
    grep '"tag_name"' |
    sed -E 's/.*"v([^"]+)".*/\1/')

  if [ -z "$VERSION" ]; then
    echo "Error: Could not determine latest version"
    exit 1
  fi
  echo "Latest version: v${VERSION}"
fi

BASE_URL="https://github.com/${REPO}/releases/download/v${VERSION}"

download_file() {
  local filename="$1"
  local url="${BASE_URL}/${filename}"
  echo "Downloading: $url"
  wget --content-disposition "$url"
}

case "$ARTIFACT" in
theme)
  download_file "theme_${VERSION}.zip"
  ;;
vim)
  download_file "vim_${VERSION}.zip"
  ;;
kde)
  download_file "kde_${VERSION}.zip"
  ;;
docs)
  download_file "docs_${VERSION}.zip"
  ;;
vscode)
  download_file "vscode-theme-candi-${VERSION}.vsix"
  ;;
all)
  echo "Downloading all artifacts..."
  download_file "theme_${VERSION}.zip"
  download_file "vim_${VERSION}.zip"
  download_file "kde_${VERSION}.zip"
  download_file "docs_${VERSION}.zip"
  download_file "vscode-theme-candi-${VERSION}.vsix"
  ;;
*)
  echo "Error: Unknown artifact type: $ARTIFACT"
  echo "Valid options: theme, vim, kde, docs, vscode, all"
  exit 1
  ;;
esac

echo "Download complete!"
