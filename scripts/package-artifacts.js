const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function run(command, cwd = process.cwd()) {
    console.log(`\x1b[36m> ${command}\x1b[0m`); // Cyan color for command
    try {
        execSync(command, { stdio: 'inherit', cwd });
    } catch (error) {
        console.error(`\x1b[31mFailed to execute: ${command}\x1b[0m`);
        process.exit(1);
    }
}

const rootDir = process.cwd();
const websiteDir = path.join(rootDir, 'website');

console.log('\x1b[32mStarting artifact generation...\x1b[0m');

// 1. VS Code Package
// vsce package creates a .vsix file. The package.json script runs it in the vscode directory.
console.log('\n\x1b[33m[1/6] Packaging VS Code Extension...\x1b[0m');
run('npm run vscode:package', rootDir);

// 2. Build All
console.log('\n\x1b[33m[2/6] Building all packages (Theme, Vim, Flutter, VS Code, KDE theme files)...\x1b[0m');
run('npm run build:all', rootDir);

// 3. Build Website
console.log('\n\x1b[33m[3/6] Building Website...\x1b[0m');
// Ensure dependencies are installed if node_modules is missing, though usually it's there
if (!fs.existsSync(path.join(websiteDir, 'node_modules'))) {
    run('npm ci', websiteDir);
}
run('npm run build', websiteDir);

// 4. Zip Operations
console.log('\n\x1b[33m[4/6] Generating Zips...\x1b[0m');

// Zip dist/ -> theme.zip
console.log('Creating theme.zip...');
// -r: recursive, -9: best compression, -v: verbose
// Note: We zip 'dist' folder itself, so it appears as a top level folder in the zip?
// "zip -r09v theme.zip dist/" will include "dist/" as a folder in the zip.
run('zip -r -9 -v theme.zip dist/', rootDir);

// Zip website/dist -> docs.zip
console.log('Creating docs.zip from website/dist...');
// We likely want the contents of website/dist, or the folder itself?
// "zip -r09v docs.zip website/dist" will put "website/dist" inside the zip.
// Usually for docs.zip one might expect just the content, but let's stick to what's requested implicitly/explicitly.
// User said "zip -r09v website/dist to docs.zip".
run('zip -r -9 -v docs.zip website/dist', rootDir);

// Zip vim color files -> vim.zip
console.log('Creating vim.zip...');
run('zip -r -9 -v vim.zip vim/colors', rootDir);

// Zip kde color files -> kde.zip
console.log('Creating kde.zip...');
run('zip -r -9 -v kde.zip kde/', rootDir);

console.log('\n\x1b[32mArtifact generation complete! Generated:\x1b[0m');
console.log('- theme.zip');
console.log('- docs.zip');
console.log('- vim.zip');
console.log('- kde.zip');
// Find the vsix file
const vscodeDir = path.join(rootDir, 'vscode');
const vsixFiles = fs.readdirSync(vscodeDir).filter(f => f.endsWith('.vsix'));
vsixFiles.forEach(f => console.log(`- vscode/${f}`));
