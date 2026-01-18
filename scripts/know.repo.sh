#!/usr/bin/env bash

set -e
set -u
set -o pipefail

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
        echo -e "$@"
    fi
}

mkdir -p tmp/know.repo

log "Generating tree.L2.txt file\n"
tree -L 2 >tmp/know.repo/tree.L2.txt 2>&1

# echo "Generating tree.L3.txt file\n"
# tree -L 3 > tmp/know.repo/tree.L3.txt

log "Git status\n"
git status >tmp/know.repo/git.status.txt 2>&1

log "Git diff quick\n"
git diff --stat >tmp/know.repo/git.diff.stat.txt 2>&1

log "Git diff full\n"
git diff >tmp/know.repo/git.diff.txt 2>&1

log "Git log --oneline: All commit message headers\n"
git log --oneline >tmp/know.repo/git.log.oneline.txt 2>&1

log "Git log -n5: Last 5 commits\n"
git log -n5 --stat --oneline >tmp/know.repo/git.log.n5.txt 2>&1

log "Last commit details\n"
git log -1 --stat >tmp/know.repo/git.log.last.txt 2>&1

if [ "$VERBOSE" = false ]; then
    echo "Repository state captured in tmp/know.repo/."
fi
