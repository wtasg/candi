const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

const version = require('../package.json').version;

function getZipName(name) {
    return `${name}_${version}.zip`;
}

function run(command, cwd = process.cwd()) {
    logger.log(`\x1b[36m> ${command}\x1b[0m`); // Cyan color for command
    try {
        const stdio = logger.isVerbose ? 'inherit' : 'pipe';
        const result = execSync(command, { stdio, cwd });
        if (!logger.isVerbose && result) {
            logger.log(result.toString());
        }
    } catch (error) {
        logger.error(`\x1b[31mFailed to execute: ${command}\x1b[0m`);
        if (error.stdout) logger.error(error.stdout.toString());
        if (error.stderr) logger.error(error.stderr.toString());
        process.exit(1);
    }
}

const rootDir = process.cwd();
const websiteDir = path.join(rootDir, 'website');

logger.log('\x1b[32mCleaning existing artifacts...\x1b[0m');
run('rm -rf *.zip *.vsix', rootDir);

logger.log('\x1b[32mStarting artifact generation...\x1b[0m');

// 1. VS Code Package
// vsce package creates a .vsix file. The package.json script runs it in the vscode directory.
logger.log('\n\x1b[33m[1/6] Packaging VS Code Extension...\x1b[0m');
run('npm run vscode:package', rootDir);

// Move the generated .vsix file to root directory
const vscodeDir = path.join(rootDir, 'vscode');
const vsixFiles = fs.readdirSync(vscodeDir).filter(f => f.endsWith('.vsix'));
vsixFiles.forEach(vsix => {
    const src = path.join(vscodeDir, vsix);
    const dest = path.join(rootDir, vsix);
    fs.renameSync(src, dest);
    logger.log(`Moved ${vsix} to root directory`);
});

// 2. Build All
logger.log('\n\x1b[33m[2/8] Building all packages (Theme, Vim, Flutter, VS Code, KDE, GNOME, Obsidian theme files)...\x1b[0m');
run('npm run build:all', rootDir);

// 3. Build Website
logger.log('\n\x1b[33m[3/8] Building Website...\x1b[0m');
// Ensure dependencies are installed if node_modules is missing, though usually it's there
if (!fs.existsSync(path.join(websiteDir, 'node_modules'))) {
    run('npm ci', websiteDir);
}
run('npm run build', websiteDir);

// 4. Zip Operations
logger.log('\n\x1b[33m[4/8] Generating Zips...\x1b[0m');

// Zip dist/ -> theme.zip
logger.log('Creating theme.zip...');
const zipVerbosity = logger.isVerbose ? '-v' : '-q';
run(`zip -r -9 ${zipVerbosity} ${getZipName('theme')} dist/`, rootDir);

// Zip website/dist -> docs.zip
logger.log('Creating docs.zip from website/dist...');
run(`zip -r -9 ${zipVerbosity} ${getZipName('docs')} website/dist`, rootDir);

// Zip vim color files -> vim.zip
logger.log('Creating vim.zip...');
run(`zip -r -9 ${zipVerbosity} ${getZipName('vim')} vim/colors`, rootDir);

// Zip kde color files -> kde.zip
logger.log('Creating kde.zip...');
run(`zip -r -9 ${zipVerbosity} ${getZipName('kde')} kde`, rootDir);

// Zip gnome theme files -> gnome.zip
logger.log('Creating gnome.zip...');
run(`zip -r -9 ${zipVerbosity} ${getZipName('gnome')} gnome`, rootDir);

// Zip obsidian theme files -> obsidian.zip
logger.log('Creating obsidian.zip...');
run(`zip -r -9 ${zipVerbosity} ${getZipName('obsidian')} obsidian`, rootDir);

logger.log('\n\x1b[32mArtifact generation complete! Generated:\x1b[0m');
logger.log(`- ${getZipName('theme')}`);
logger.log(`- ${getZipName('docs')}`);
logger.log(`- ${getZipName('vim')}`);
logger.log(`- ${getZipName('kde')}`);
logger.log(`- ${getZipName('gnome')}`);
logger.log(`- ${getZipName('obsidian')}`);
// Find the vsix files in root directory
const rootVsixFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.vsix'));
rootVsixFiles.forEach(f => logger.log(`- ${f}`));

if (logger.isVerbose) {
    logger.log('Artifacts packaged successfully.');
}

