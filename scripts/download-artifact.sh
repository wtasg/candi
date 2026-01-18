#!/bin/bash
# download-artifact.sh - Download Candi artifacts from GitHub releases using curl
#
# Usage:
#   ./download-artifact.sh [artifact] [version]
#
# Arguments:
#   artifact  - Type of artifact to download (default: theme)
#               Options: theme, vim, kde, docs, vscode
#   version   - Version to download (default: latest)
#               Use a version number like "0.0.10" or "latest"
#
# Examples:
#   ./download-artifact.sh                    # Download latest theme
#   ./download-artifact.sh theme              # Download latest theme
#   ./download-artifact.sh vim 0.0.10         # Download vim v0.0.10
#   ./download-artifact.sh vscode latest      # Download latest VS Code extension
#   ./download-artifact.sh kde                # Download latest KDE theme

set -e

REPO="wtasg/candi"
ARTIFACT="theme"
VERSION="latest"
VERBOSE=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -v|--verbose) VERBOSE=true ;;
        theme|vim|kde|docs|vscode) ARTIFACT="$1" ;;
        latest|[0-9]*) VERSION="$1" ;;
    esac
    shift
done

log() {
    if [ "$VERBOSE" = true ]; then
        echo "$@"
    fi
}

REDIRECT_OUT="/dev/null"
if [ "$VERBOSE" = true ]; then
    REDIRECT_OUT="/dev/stdout"
fi

# Fetch latest version from GitHub API if needed
if [ "$VERSION" = "latest" ]; then
  log "Fetching latest release version..."
  VERSION=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" |
    grep '"tag_name"' |
    sed -E 's/.*"v([^"]+)".*/\1/')

  if [ -z "$VERSION" ]; then
    echo "Error: Could not determine latest version"
    exit 1
  fi
  log "Latest version: v${VERSION}"
fi

# Construct download URL based on artifact type
case "$ARTIFACT" in
theme | vim | kde | docs)
  FILENAME="${ARTIFACT}_${VERSION}.zip"
  ;;
vscode)
  FILENAME="vscode-theme-candi-${VERSION}.vsix"
  ;;
*)
  echo "Error: Unknown artifact type: $ARTIFACT"
  echo "Valid options: theme, vim, kde, docs, vscode"
  exit 1
  ;;
esac

URL="https://github.com/${REPO}/releases/download/v${VERSION}/${FILENAME}"

log "Downloading: $URL"
curl -L -O --fail --silent --show-error "$URL"

if [ $? -eq 0 ]; then
  if [ "$VERBOSE" = true ]; then
      echo "Downloaded: $FILENAME"
  else
      echo "Successfully downloaded $FILENAME."
  fi
else
  echo "Error: Download failed"
  exit 1
fi
