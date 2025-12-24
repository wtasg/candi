#!/usr/bin/env bash

# Install dependencies for all projects in the monorepo
# Usage: ./scripts/install-all.sh

set -e

echo "Installing dependencies for all projects..."

# Root project
echo ""
echo "[1/3] Root project"
npm install

# Website
echo ""
echo "[2/3] Website"
cd website
npm install
cd ..

# Flutter
echo ""
echo "[3/3] Flutter"
cd flutter
flutter pub get
cd ..

echo ""
echo "Done! All dependencies installed."
