#!/usr/bin/env bash

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

version=$(cat ./version 2>/dev/null || echo "0.0.0")
log "Cleaning up for version $version"

rm -f "theme_$version.zip"
rm -f "vim_$version.zip"
rm -f "kde_$version.zip"
rm -f "docs_$version.zip"
rm -f "vscode-theme-candi-$version.vsix"

if [ "$VERBOSE" = false ]; then
    echo "Cleanup successful."
fi
