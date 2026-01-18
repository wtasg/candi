#!/usr/bin/env node
/**
 * Build script for @wtasnorg/candi
 *
 * Copies source files to dist/ for npm publishing.
 */

const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const distDir = path.join(__dirname, '..', 'dist');
const srcDir = path.join(__dirname, '..', 'src');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// 0. Synchronize colors from source of truth
if (logger.isVerbose) {
    logger.log('Synchronizing colors...');
}
require('./sync-colors');

// Copy JS files
const jsFiles = ['index.js', 'theme.js', 'plugin.js'];
jsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(srcDir, file), 'utf8');

    // Write CJS version
    fs.writeFileSync(path.join(distDir, file), content);

    // Write ESM version
    const esmContent = content
        .replace(/module\.exports\s*=\s*/g, 'export default ')
        .replace(/module\.exports\./g, 'export const ')
        .replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g, "import $1 from '$2'");
    fs.writeFileSync(path.join(distDir, file.replace('.js', '.mjs')), esmContent);
});

// Create TypeScript declarations
const dtsContent = `declare module '@wtasnorg/candi' {
  export const theme: {
    colors: { candi: Record<string, string> };
    spacing: Record<string, string>;
    fontFamily: Record<string, string[]>;
    fontSize: Record<string, [string, { lineHeight: string }]>;
    lineHeight: Record<string, string>;
    minHeight: Record<string, string>;
    borderRadius: Record<string, string>;
    boxShadow: Record<string, string>;
    transitionDuration: Record<string, string>;
  };
  export const plugin: { handler: Function };
  export default { theme: typeof theme; plugin: typeof plugin };
}

declare module '@wtasnorg/candi/theme' {
  const theme: Record<string, any>;
  export default theme;
}

declare module '@wtasnorg/candi/plugin' {
  import { PluginCreator } from 'tailwindcss/types/config';
  const plugin: PluginCreator;
  export default plugin;
}

declare module '@wtasnorg/candi/css' {}
declare module '@wtasnorg/candi/css/base' {}
declare module '@wtasnorg/candi/css/components' {}
declare module '@wtasnorg/candi/css/utilities' {}

// Tailwind CSS v4 support
declare module '@wtasnorg/candi/v4' {}
`;
fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent);

// Concatenate and copy CSS files
const cssDir = path.join(srcDir, 'css');
const cssFiles = ['base.css', 'components.css', 'utilities.css'];
let fullCss = '';

cssFiles.forEach(file => {
    const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    fs.writeFileSync(path.join(distDir, file), content);
    fullCss += content + '\n';
});

// Write combined CSS
fs.writeFileSync(path.join(distDir, 'scandinavian.css'), fullCss);

// Copy v4 theme CSS
const v4Dir = path.join(distDir, 'v4');
if (!fs.existsSync(v4Dir)) {
    fs.mkdirSync(v4Dir, { recursive: true });
}
const v4ThemeContent = fs.readFileSync(path.join(srcDir, 'v4', 'theme.css'), 'utf8');
fs.writeFileSync(path.join(v4Dir, 'theme.css'), v4ThemeContent);

if (logger.isVerbose) {
    logger.log('Build complete!');
    logger.log('  - dist/index.js, dist/index.mjs');
    logger.log('  - dist/theme.js, dist/theme.mjs');
    logger.log('  - dist/plugin.js, dist/plugin.mjs');
    logger.log('  - dist/index.d.ts');
    logger.log('  - dist/scandinavian.css');
    logger.log('  - dist/base.css, dist/components.css, dist/utilities.css');
    logger.log('  - dist/v4/theme.css');
}
