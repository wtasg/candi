#!/usr/bin/env bash

# Install dependencies for all projects in the monorepo
# Usage: ./scripts/install-all.sh

set -e

echo "Installing dependencies for all projects..."

# Root project
echo ""
echo "[1/5] Root project"
npm install

# VS Code
echo ""
echo "[2/5] VS Code"
cd vscode
npm install
cd ..

# Website
echo ""
echo "[3/5] Website"
cd website
npm install
cd ..

# Flutter
echo ""
echo "[4/5] Flutter"
cd flutter
flutter pub get
cd ..

# Showcase Flutter
echo ""
echo "[5/5] Showcase Flutter"
cd showcase_flutter
flutter pub get
cd ..

echo ""
echo "Done! All dependencies installed."

