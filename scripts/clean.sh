#!/usr/bin/env bash

version=$(cat ./version)
echo "Cleaning up for version $version"

rm "theme_$version.zip"
rm "vim_$version.zip"
rm "kde_$version.zip"
rm "docs_$version.zip"
rm "vscode-theme-candi-$version.vsix"
