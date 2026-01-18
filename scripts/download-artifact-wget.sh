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
ARTIFACT="theme"
VERSION="latest"
VERBOSE=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -v|--verbose) VERBOSE=true ;;
        theme|vim|kde|docs|vscode|all) ARTIFACT="$1" ;;
        latest|[0-9]*) VERSION="$1" ;;
    esac
    shift
done

log() {
    if [ "$VERBOSE" = true ]; then
        echo "$@"
    fi
}

# Fetch latest version from GitHub API if needed
if [ "$VERSION" = "latest" ]; then
  log "Fetching latest release version..."
  VERSION=$(wget -qO- "https://api.github.com/repos/${REPO}/releases/latest" |
    grep '"tag_name"' |
    sed -E 's/.*"v([^"]+)".*/\1/')

  if [ -z "$VERSION" ]; then
    echo "Error: Could not determine latest version"
    exit 1
  fi
  log "Latest version: v${VERSION}"
fi

BASE_URL="https://github.com/${REPO}/releases/download/v${VERSION}"

download_file() {
  local filename="$1"
  local url="${BASE_URL}/${filename}"
  log "Downloading: $url"
  if [ "$VERBOSE" = true ]; then
      wget --content-disposition "$url"
  else
      wget -q --content-disposition "$url"
  fi
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
  log "Downloading all artifacts..."
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

log "Download complete!"

if [ "$VERBOSE" = false ]; then
    echo "Artifact(s) downloaded successfully."
fi
