#!/usr/bin/env bash
# =============================================================================
# Local Installation Script for Candi Design System
# Installs all generated themes to their local system locations
#
# Usage:
#   npm run install:local           # Dry-run mode (shows what would be installed)
#   npm run install:local -- --execute  # Actually install themes
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Parse arguments
DRY_RUN=true
for arg in "$@"; do
    case $arg in
        --execute)
            DRY_RUN=false
            shift
            ;;
    esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Log to stderr to avoid capturing in $(...)
info() { echo -e "${BLUE}[INFO]${NC} $1" >&2; }
success() { echo -e "${GREEN}[✓]${NC} $1" >&2; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1" >&2; }
error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }
dry() { echo -e "${MAGENTA}[DRY-RUN]${NC} $1" >&2; }

# Wrapper for commands that would modify the system
run_cmd() {
    if [ "$DRY_RUN" = true ]; then
        dry "Would run: $*"
    else
        "$@"
    fi
}

echo "=============================================" >&2
echo "  Candi Design System - Local Installation" >&2
echo "=============================================" >&2
if [ "$DRY_RUN" = true ]; then
    echo -e "${MAGENTA}  DRY-RUN MODE (use --execute to install)${NC}" >&2
fi
echo "" >&2

# Get version from package.json
VERSION=$(node -p "require('$PROJECT_DIR/package.json').version")
info "Detected version: $VERSION"

# Track what was installed
INSTALLED=()
SKIPPED=()

# Temp directory for unzipping
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Helper to extract zip if it exists
extract_artifact() {
    local name=$1
    local zip_file=$(ls "$PROJECT_DIR/${name}_${VERSION}.zip" 2>/dev/null | head -1)

    # Check if already extracted
    if [ -d "$TEMP_DIR/$name" ]; then
        echo "$TEMP_DIR/$name/$name"
        return
    fi

    if [ -n "$zip_file" ]; then
        info "Found artifact: $(basename "$zip_file")"
        if [ "$DRY_RUN" = true ]; then
            dry "Would extract $(basename "$zip_file") to temp dir"
        fi
        # We actually extract even in dry-run to check directory structure if needed,
        # but realistically we just want to know it exists.
        # Actually, let's just use the source dirs for dry-run if we want to be super safe,
        # but the user wants to see it using the zip.
        mkdir -p "$TEMP_DIR/$name"
        unzip -qo "$zip_file" -d "$TEMP_DIR/$name"
        echo "$TEMP_DIR/$name/$name"
    else
        echo ""
    fi
}

# -----------------------------------------------------------------------------
# KDE Color Schemes
# -----------------------------------------------------------------------------
install_kde() {
    local KDE_DIR="$HOME/.local/share/color-schemes"
    if command -v kreadconfig5 &> /dev/null || command -v kreadconfig6 &> /dev/null; then
        info "Checking KDE color schemes..."

        local artifact_path=$(extract_artifact "kde")
        local src_v5="$PROJECT_DIR/kde/v5"

        if [ -n "$artifact_path" ] && [ -d "$artifact_path" ]; then
            src_v5="$artifact_path/v5"
            info "Using files from kde zip artifact"
        fi

        run_cmd mkdir -p "$KDE_DIR"
        run_cmd cp "$src_v5/"*.colors "$KDE_DIR/"

        if [ "$DRY_RUN" = false ]; then
            success "KDE color schemes → $KDE_DIR"
        fi
        INSTALLED+=("KDE")
    else
        warn "KDE not detected, skipping color schemes"
        SKIPPED+=("KDE")
    fi
}

# -----------------------------------------------------------------------------
# Konsole Terminal
# -----------------------------------------------------------------------------
install_konsole() {
    local KONSOLE_DIR="$HOME/.local/share/konsole"
    if command -v konsole &> /dev/null; then
        info "Checking Konsole color schemes..."

        local artifact_path=$(extract_artifact "kde") # Konsole is in kde zip
        local src_konsole="$PROJECT_DIR/kde/konsole"

        if [ -n "$artifact_path" ] && [ -d "$artifact_path" ]; then
            src_konsole="$artifact_path/konsole"
            info "Using files from kde zip artifact"
        fi

        run_cmd mkdir -p "$KONSOLE_DIR"
        run_cmd cp "$src_konsole/"*.colorscheme "$KONSOLE_DIR/"

        if [ "$DRY_RUN" = false ]; then
            success "Konsole themes → $KONSOLE_DIR"
        fi
        INSTALLED+=("Konsole")
    else
        warn "Konsole not detected, skipping"
        SKIPPED+=("Konsole")
    fi
}

# -----------------------------------------------------------------------------
# Vim/Neovim
# -----------------------------------------------------------------------------
install_vim() {
    local VIM_DIR="$HOME/.vim/colors"
    local NVIM_DIR="$HOME/.config/nvim/colors"

    if command -v vim &> /dev/null || command -v nvim &> /dev/null; then
        info "Checking Vim colorschemes..."

        local artifact_path=$(extract_artifact "vim")
        local src_vim="$PROJECT_DIR/vim/colors"

        if [ -n "$artifact_path" ] && [ -d "$artifact_path" ]; then
            src_vim="$artifact_path/colors"
            info "Using files from vim zip artifact"
        fi

        if command -v vim &> /dev/null; then
            run_cmd mkdir -p "$VIM_DIR"
            run_cmd cp "$src_vim/"*.vim "$VIM_DIR/"
            if [ "$DRY_RUN" = false ]; then
                success "Vim themes → $VIM_DIR"
            fi
        fi

        if command -v nvim &> /dev/null; then
            run_cmd mkdir -p "$NVIM_DIR"
            run_cmd cp "$src_vim/"*.vim "$NVIM_DIR/"
            if [ "$DRY_RUN" = false ]; then
                success "Neovim themes → $NVIM_DIR"
            fi
        fi

        INSTALLED+=("Vim")
    else
        warn "Vim/Neovim not detected, skipping"
        SKIPPED+=("Vim")
    fi
}

# -----------------------------------------------------------------------------
# GNOME GTK Theme
# -----------------------------------------------------------------------------
install_gnome() {
    local THEMES_DIR="$HOME/.themes"
    if [ "$XDG_CURRENT_DESKTOP" = "GNOME" ] || command -v gnome-shell &> /dev/null; then
        info "Checking GNOME GTK theme..."

        local artifact_path=$(extract_artifact "gnome")
        local src_gnome="$PROJECT_DIR/gnome"

        if [ -n "$artifact_path" ] && [ -d "$artifact_path" ]; then
            src_gnome="$artifact_path"
            info "Using files from gnome zip artifact"
        fi

        run_cmd mkdir -p "$THEMES_DIR/Candi"
        run_cmd cp -rf "$src_gnome/"* "$THEMES_DIR/Candi/"

        if [ "$DRY_RUN" = false ]; then
            success "GNOME theme → $THEMES_DIR/Candi"
        fi
        INSTALLED+=("GNOME")
    else
        warn "GNOME not detected, skipping GTK theme"
        SKIPPED+=("GNOME")
    fi
}

# -----------------------------------------------------------------------------
# Obsidian Theme
# -----------------------------------------------------------------------------
install_obsidian() {
    # Check common Obsidian vault locations
    local OBSIDIAN_THEMES=""

    # Look for .obsidian directories in home
    if [ -d "$HOME" ]; then
        local found=$(find "$HOME" -maxdepth 4 -type d -name ".obsidian" 2>/dev/null | head -1)
        if [ -n "$found" ]; then
            OBSIDIAN_THEMES="$found/themes"
        fi
    fi

    if [ -n "$OBSIDIAN_THEMES" ]; then
        info "Checking Obsidian theme..."

        local artifact_path=$(extract_artifact "obsidian")
        local src_file="$PROJECT_DIR/obsidian/theme.css"

        if [ -n "$artifact_path" ] && [ -d "$artifact_path" ]; then
            src_file="$artifact_path/theme.css"
            info "Using file from obsidian zip artifact"
        fi

        run_cmd mkdir -p "$OBSIDIAN_THEMES"
        run_cmd cp "$src_file" "$OBSIDIAN_THEMES/Candi.css"

        if [ "$DRY_RUN" = false ]; then
            success "Obsidian theme → $OBSIDIAN_THEMES/Candi.css"
        fi
        INSTALLED+=("Obsidian")
    else
        warn "Obsidian vault not found, skipping"
        SKIPPED+=("Obsidian")
    fi
}

# -----------------------------------------------------------------------------
# VSCode Extension
# -----------------------------------------------------------------------------
install_vscode() {
    # Look in root first for vsix
    local VSIX_FILE=$(ls "$PROJECT_DIR/vscode-theme-candi-${VERSION}.vsix" 2>/dev/null | head -1)

    # Fallback to vscode/ dir
    if [ -z "$VSIX_FILE" ]; then
        VSIX_FILE=$(ls "$PROJECT_DIR/vscode/"*.vsix 2>/dev/null | head -1)
    fi

    if command -v code &> /dev/null && [ -n "$VSIX_FILE" ]; then
        info "Checking VSCode extension..."
        info "Found artifact: $(basename "$VSIX_FILE")"
        run_cmd code --install-extension "$VSIX_FILE" --force

        if [ "$DRY_RUN" = false ]; then
            success "VSCode extension installed"
        fi
        INSTALLED+=("VSCode")
    elif ! command -v code &> /dev/null; then
        warn "VSCode not detected, skipping"
        SKIPPED+=("VSCode")
    else
        warn "No .vsix file found, run 'npm run vscode:package' first"
        SKIPPED+=("VSCode")
    fi
}

# -----------------------------------------------------------------------------
# Run all installations
# -----------------------------------------------------------------------------
install_kde
install_konsole
install_vim
install_gnome
install_obsidian
install_vscode

# -----------------------------------------------------------------------------
# Summary
# -----------------------------------------------------------------------------
echo "" >&2
echo "=============================================" >&2
echo "  Installation Summary" >&2
echo "=============================================" >&2

if [ ${#INSTALLED[@]} -gt 0 ]; then
    if [ "$DRY_RUN" = true ]; then
        echo -e "${MAGENTA}Would install:${NC} ${INSTALLED[*]}" >&2
    else
        echo -e "${GREEN}Installed:${NC} ${INSTALLED[*]}" >&2
    fi
fi

if [ ${#SKIPPED[@]} -gt 0 ]; then
    echo -e "${YELLOW}Skipped:${NC} ${SKIPPED[*]}" >&2
fi

echo "" >&2
if [ "$DRY_RUN" = true ]; then
    echo -e "${MAGENTA}This was a dry-run. To actually install, run:${NC}" >&2
    echo "  npm run install:local -- --execute" >&2
    echo "" >&2
else
    echo "To apply themes, you may need to:" >&2
    echo "  - KDE: System Settings → Appearance → Colors" >&2
    echo "  - Konsole: Settings → Edit Current Profile → Appearance" >&2
    echo "  - Vim: Add 'colorscheme candi-dark' to .vimrc" >&2
    echo "  - GNOME: gnome-tweaks → Appearance → Applications" >&2
    echo "  - Obsidian: Settings → Appearance → Themes" >&2
    echo "  - VSCode: Ctrl+K Ctrl+T → Select 'Candi Dark' or 'Candi Light'" >&2
    echo "" >&2
fi
