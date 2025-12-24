#!/usr/bin/env bash

# Install dependencies for all projects in the monorepo
# Usage: ./scripts/install-all.sh

set -e

echo "Installing dependencies for all projects..."

# Root project
echo ""
echo "[1/3] Root project"
npm install

# VS Code
echo ""
echo "[2/4] VS Code"
cd vscode
npm install
cd ..

# Website
echo ""
echo "[3/4] Website"
cd website
npm install
cd ..

# Flutter
echo ""
echo "[4/4] Flutter"
cd flutter
flutter pub get
cd ..

echo ""
echo "Done! All dependencies installed."
