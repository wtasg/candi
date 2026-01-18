#!/usr/bin/env bash

# Mark versions as published in published_versions.json
# Human-edited values are respected unless explicitly overwritten.
#
# Usage:
#   ./scripts/mark-published.sh <version> --all        # Update all projects
#   ./scripts/mark-published.sh <version> --npm        # Update only npm
#   ./scripts/mark-published.sh <version> --flutter    # Update only flutter
#   ./scripts/mark-published.sh <version> --github     # Update only github
#   ./scripts/mark-published.sh <version> npm flutter  # Update specific projects

set -e

VERSION="$1"
shift || true

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version> [--all | --project | project1 project2 ...]"
    echo ""
    echo "Examples:"
    echo "  $0 0.0.28 --all         # Update all projects to 0.0.28"
    echo "  $0 0.0.28 --npm         # Update only npm to 0.0.28"
    echo "  $0 0.0.28 npm flutter   # Update npm and flutter to 0.0.28"
    echo ""
    echo "Projects: github, npm, flutter, vscode, kde, gnome, obsidian, vim"
    exit 1
fi

PUBLISHED_FILE="./published_versions.json"

if [ ! -f "$PUBLISHED_FILE" ]; then
    echo "Error: $PUBLISHED_FILE not found"
    exit 1
fi

# Determine which projects to update
PROJECTS=()

case "$1" in
    --all)
        PROJECTS=(github npm flutter vscode kde gnome obsidian vim)
        ;;
    --github)
        PROJECTS=(github)
        ;;
    --npm)
        PROJECTS=(npm)
        ;;
    --flutter)
        PROJECTS=(flutter)
        ;;
    --vscode)
        PROJECTS=(vscode)
        ;;
    --kde)
        PROJECTS=(kde)
        ;;
    --gnome)
        PROJECTS=(gnome)
        ;;
    --obsidian)
        PROJECTS=(obsidian)
        ;;
    --vim)
        PROJECTS=(vim)
        ;;
    *)
        # Accept project names as positional arguments
        PROJECTS=("$@")
        ;;
esac

if [ ${#PROJECTS[@]} -eq 0 ]; then
    echo "Error: No projects specified"
    echo "Use --all to update all projects, or specify project names"
    exit 1
fi

echo "Marking version $VERSION as published for: ${PROJECTS[*]}"
echo ""

# Update each project using Node.js for JSON manipulation
for PROJECT in "${PROJECTS[@]}"; do
    node -e "
        const fs = require('fs');
        const file = '$PUBLISHED_FILE';
        const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (data.hasOwnProperty('$PROJECT')) {
            const old = data['$PROJECT'];
            data['$PROJECT'] = '$VERSION';
            fs.writeFileSync(file, JSON.stringify(data, null, 4) + '\n');
            console.log('  [✓] $PROJECT: ' + old + ' → $VERSION');
        } else {
            console.log('  [!] $PROJECT: not found in published_versions.json');
        }
    "
done

echo ""
echo "Done! Run 'npm run build:docs' to inject versions into documentation."
