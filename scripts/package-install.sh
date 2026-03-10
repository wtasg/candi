#!/usr/bin/env bash

# Install dependencies for all projects in the monorepo
# Usage: ./scripts/install-all.sh

set -e

# Parse arguments
VERBOSE=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -v|--verbose) VERBOSE=true ;;
    esac
    shift
done

log() {
    if [ "$VERBOSE" = true ]; then
        echo "$@"
    fi
}

# Redirect output to /dev/null unless verbose
REDIRECT_OUT="/dev/null"
if [ "$VERBOSE" = true ]; then
    REDIRECT_OUT="/dev/stdout"
fi

log "Installing dependencies for all projects..."

# Root project
log ""
log "[1/7] Root project"
npm install > $REDIRECT_OUT 2>&1

# VS Code
log ""
log "[2/7] VS Code"
cd vscode
npm install > $REDIRECT_OUT 2>&1
cd ..

# Website
log ""
log "[3/7] Website"
cd website
npm install > $REDIRECT_OUT 2>&1
cd ..

# Flutter
log ""
log "[4/7] Flutter"
cd flutter
flutter pub get > $REDIRECT_OUT 2>&1
cd ..

# Showcase Flutter
log ""
log "[5/7] Showcase Flutter"
cd showcase_flutter
flutter pub get > $REDIRECT_OUT 2>&1
cd ..

# TypeScript Core
log ""
log "[6/7] TypeScript Core"
cd ts
npm install > $REDIRECT_OUT 2>&1
cd ..

# Dart Package
log ""
log "[7/7] Dart Package"
cd dart
dart pub get > $REDIRECT_OUT 2>&1
cd ..

log ""
log "Done! All dependencies installed."

if [ "$VERBOSE" = false ]; then
    echo "All dependencies installed successfully."
fi

