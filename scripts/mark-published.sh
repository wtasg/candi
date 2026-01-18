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

# Parse optional arguments for projects and verbose flag
PROJECTS_INPUT=()
VERBOSE=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -v|--verbose) VERBOSE=true ;;
        *) PROJECTS_INPUT+=("$1") ;;
    esac
    shift
done

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version> [-v|--verbose] [--all | --project | project1 project2 ...]"
    echo ""
    echo "Examples:"
    echo "  $0 0.0.28 --all         # Update all projects to 0.0.28"
    echo "  $0 0.0.28 --npm         # Update only npm to 0.0.28"
    exit 1
fi

log() {
    if [ "$VERBOSE" = true ]; then
        echo "$@"
    fi
}

PUBLISHED_FILE="./published_versions.json"

if [ ! -f "$PUBLISHED_FILE" ]; then
    echo "Error: $PUBLISHED_FILE not found"
    exit 1
fi

# Determine which projects to update
PROJECTS=()

if [ ${#PROJECTS_INPUT[@]} -eq 0 ]; then
    echo "Error: No projects specified"
    echo "Use --all to update all projects, or specify project names"
    exit 1
fi

case "${PROJECTS_INPUT[0]}" in
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
        PROJECTS=("${PROJECTS_INPUT[@]}")
        ;;
esac

if [ ${#PROJECTS[@]} -eq 0 ]; then
    echo "Error: No projects specified"
    echo "Use --all to update all projects, or specify project names"
    exit 1
fi

log "Marking version $VERSION as published for: ${PROJECTS[*]}"
log ""

# Update each project using Node.js for JSON manipulation
for PROJECT in "${PROJECTS[@]}"; do
    node -e "
        const fs = require('fs');
        const file = '$PUBLISHED_FILE';
        const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
        const verbose = $VERBOSE;
        if (data.hasOwnProperty('$PROJECT')) {
            const old = data['$PROJECT'];
            data['$PROJECT'] = '$VERSION';
            fs.writeFileSync(file, JSON.stringify(data, null, 4) + '\n');
            if (verbose) console.log('  [✓] $PROJECT: ' + old + ' → $VERSION');
        } else {
            if (verbose) console.log('  [!] $PROJECT: not found in published_versions.json');
        }
    "
done

log ""
log "Done! Run 'npm run build:docs' to inject versions into documentation."

if [ "$VERBOSE" = false ]; then
    echo "Version $VERSION marked as published for selected projects."
fi
