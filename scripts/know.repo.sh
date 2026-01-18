#!/usr/bin/env bash

set -e
set -u
set -o pipefail

mkdir -p tmp/know.repo

echo "Generating tree.L2.txt file\n"
tree -L 2 >tmp/know.repo/tree.L2.txt

# echo "Generating tree.L3.txt file\n"
# tree -L 3 > tmp/know.repo/tree.L3.txt

echo "Git status\n"
git status >tmp/know.repo/git.status.txt

echo "Git diff quick\n"
git diff --stat >tmp/know.repo/git.diff.stat.txt

echo "Git diff full\n"
git diff >tmp/know.repo/git.diff.txt

echo "Git log --oneline: All commit message headers\n"
git log --oneline >tmp/know.repo/git.log.oneline.txt

echo "Git log -n5: Last 5 commits\n"
git log -n5 --stat --oneline >tmp/know.repo/git.log.n5.txt

echo "Last commit details\n"
git log -1 --stat >tmp/know.repo/git.log.last.txt
