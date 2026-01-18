#!/usr/bin/env bash

# Bump version for all packages in the monorepo
# Usage: ./scripts/bump-packages.sh <version>

set -e

# Parse arguments
VERSION=""
VERBOSE=false

for arg in "$@"; do
    case $arg in
        -v|--verbose) VERBOSE=true ;;
        *)
            if [ -z "$VERSION" ]; then
                VERSION="$arg"
            fi
            ;;
    esac
done

if [ -z "$VERSION" ]; then
  echo "Usage: $0 <version> [-v|--verbose]"
  echo "Example: $0 0.0.4"
  exit 1
fi

log() {
    if [ "$VERBOSE" = true ]; then
        echo "$@"
    fi
}

log "Bumping all packages to version $VERSION"
echo "$VERSION" > ./version

# Main package (package.json)
log "  - package.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" package.json

# VS Code extension (vscode/package.json)
log "  - vscode/package.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" vscode/package.json

# Website (website/package.json)
log "  - website/package.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" website/package.json

# Flutter package (flutter/pubspec.yaml)
log "  - flutter/pubspec.yaml"
sed -i "s/^version: .*/version: $VERSION/" flutter/pubspec.yaml

# Obsidian theme (obsidian/manifest.json)
log "  - obsidian/manifest.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" obsidian/manifest.json

# Showcase Flutter (showcase_flutter/pubspec.yaml)
log "  - showcase_flutter/pubspec.yaml"
sed -i "s/^version: .*/version: $VERSION/" showcase_flutter/pubspec.yaml

log "Done!"

INSTALL_FLAGS=""
if [ "$VERBOSE" = true ]; then
    INSTALL_FLAGS="-v"
fi

log "Running npm install..."
bash ./scripts/package-install.sh $INSTALL_FLAGS

if [ "$VERBOSE" = false ]; then
    echo "Packages bumped to v$VERSION successfully."
fi

exit 0
