#!/usr/bin/env bash

# Bump version for all packages in the monorepo
# Usage: ./scripts/bump-packages.sh <version>

set -e

VERSION="$1"

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 0.0.4"
    exit 1
fi

echo "Bumping all packages to version $VERSION"

# Main package (package.json)
echo "  - package.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" package.json

# VS Code extension (vscode/package.json)
echo "  - vscode/package.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" vscode/package.json

# Website (website/package.json)
echo "  - website/package.json"
sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" website/package.json

# Flutter package (flutter/pubspec.yaml)
echo "  - flutter/pubspec.yaml"
sed -i "s/^version: .*/version: $VERSION/" flutter/pubspec.yaml

echo "Done!"

echo "Running npm install..."
bash -c ./scripts/package-install.sh

exit 0
