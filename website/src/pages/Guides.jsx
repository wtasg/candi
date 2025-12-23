export default function Guides() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Platform Guides</h1>
        <p className="text-xl text-candi-subtle">
          Learn how to integrate Candi Design System across all supported platforms.
        </p>
      </div>

      {/* Web / Tailwind CSS */}
      <div className="mb-12">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-soft bg-candi-accent-subtle flex items-center justify-center text-2xl">
              🌐
            </div>
            <h2 className="text-2xl font-bold">Web (Tailwind CSS)</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation</h3>
              <pre className="text-sm mb-4">
                <code>npm install @wtasnorg/candi</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Configuration</h3>
              <p className="text-candi-subtle mb-3">
                Add Candi to your <code>tailwind.config.js</code>:
              </p>
              <pre className="text-sm">
                <code>{`const { theme, plugin } = require('@wtasnorg/candi');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: theme,
  },
  plugins: [plugin],
};`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Usage Example</h3>
              <pre className="text-sm">
                <code>{`// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Use Candi colors
<div className="bg-candi-bg text-candi-text">
  <button className="bg-candi-accent text-white px-6 py-3 rounded-soft">
    Click me
  </button>
</div>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Available Tokens</h3>
              <ul className="space-y-2 text-candi-subtle">
                <li>• <code>candi-bg</code>, <code>candi-surface</code>, <code>candi-elevated</code> - Backgrounds</li>
                <li>• <code>candi-text</code>, <code>candi-subtle</code>, <code>candi-muted</code> - Text colors</li>
                <li>• <code>candi-border</code>, <code>candi-border-strong</code> - Borders</li>
                <li>• <code>candi-accent</code>, <code>candi-secondary</code> - Action colors</li>
                <li>• <code>candi-success</code>, <code>candi-warning</code>, <code>candi-error</code> - Status colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Flutter */}
      <div className="mb-12">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-soft bg-candi-secondary-subtle flex items-center justify-center text-2xl">
              📱
            </div>
            <h2 className="text-2xl font-bold">Flutter</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation</h3>
              <p className="text-candi-subtle mb-3">
                Add Candi to your <code>pubspec.yaml</code>:
              </p>
              <pre className="text-sm">
                <code>{`dependencies:
  candi: ^0.0.1`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Usage</h3>
              <pre className="text-sm">
                <code>{`import 'package:candi/candi.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Candi Demo',
      theme: ThemeData(
        colorScheme: CandiColors.light,
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        colorScheme: CandiColors.dark,
        useMaterial3: true,
      ),
      home: MyHomePage(),
    );
  }
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Color Properties</h3>
              <p className="text-candi-subtle mb-3">
                Each color includes OKLCH metadata:
              </p>
              <pre className="text-sm">
                <code>{`// Access color with metadata
final accentColor = CandiColors.light.accent;
print(accentColor.l); // Lightness
print(accentColor.c); // Chroma
print(accentColor.h); // Hue`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* VS Code */}
      <div className="mb-12">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-soft flex items-center justify-center text-2xl" style={{backgroundColor: 'oklch(85% 0.04 145)'}}>
              💻
            </div>
            <h2 className="text-2xl font-bold">VS Code Theme</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation</h3>
              <p className="text-candi-subtle mb-3">
                Install from the VS Code Marketplace or manually:
              </p>
              <pre className="text-sm">
                <code>{`# From source
cd vscode
npm install
npx @vscode/vsce package

# Install the .vsix file in VS Code
code --install-extension candi-theme-*.vsix`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Activation</h3>
              <ol className="space-y-2 text-candi-subtle list-decimal list-inside">
                <li>Open VS Code</li>
                <li>Press <code>Ctrl+K Ctrl+T</code> (or <code>Cmd+K Cmd+T</code> on Mac)</li>
                <li>Select "Candi Light" or "Candi Dark"</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-candi-subtle">
                <li>• Consistent colors with web and Flutter versions</li>
                <li>• Optimized syntax highlighting for multiple languages</li>
                <li>• Comfortable for long coding sessions</li>
                <li>• Warm backgrounds reduce eye strain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Vim */}
      <div className="mb-12">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-soft flex items-center justify-center text-2xl" style={{backgroundColor: 'oklch(95% 0.04 70)'}}>
              ⌨️
            </div>
            <h2 className="text-2xl font-bold">Vim Colorscheme</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Installation</h3>
              <p className="text-candi-subtle mb-3">
                Copy the colorscheme files to your Vim colors directory:
              </p>
              <pre className="text-sm">
                <code>{`# Clone the repository
git clone https://github.com/wtasg/candi.git

# Copy colorschemes
cp candi/vim/colors/*.vim ~/.vim/colors/

# Or for Neovim
cp candi/vim/colors/*.vim ~/.config/nvim/colors/`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Activation</h3>
              <p className="text-candi-subtle mb-3">
                Add to your <code>.vimrc</code> or <code>init.vim</code>:
              </p>
              <pre className="text-sm">
                <code>{`" For light theme
colorscheme candi-light

" For dark theme
colorscheme candi-dark

" Auto-switch based on time of day
if strftime("%H") < 18
  colorscheme candi-light
else
  colorscheme candi-dark
endif`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Terminal Support</h3>
              <p className="text-candi-subtle">
                The colorscheme works in both GUI and terminal Vim. For best results in terminal, 
                use a terminal with true color support and add to your config:
              </p>
              <pre className="text-sm mt-3">
                <code>{`set termguicolors`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Build Command */}
      <div className="bg-candi-accent-subtle border border-candi-accent rounded-softer p-8">
        <h2 className="text-2xl font-bold mb-4">Building From Source</h2>
        <p className="text-candi-subtle mb-4">
          To regenerate all platform-specific files from the source:
        </p>
        <pre className="text-sm">
          <code>{`# Clone the repository
git clone https://github.com/wtasg/candi.git
cd candi

# Install dependencies
npm install

# Build all platforms
npm run build:all

# Or build individually
npm run build          # Web/Tailwind
npm run build:flutter  # Flutter
npm run build:vscode   # VS Code
npm run build:vim      # Vim`}</code>
        </pre>
      </div>
    </div>
  )
}
