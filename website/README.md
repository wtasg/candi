# Candi Design System Documentation Website

Interactive documentation website for the Candi Design System.

## Features

- 🎨 **Interactive Color Palette Explorer** - Explore all color tokens with OKLCH values, hex codes, and RGB values
- 🧩 **Component Playground** - Live preview of all UI components with code samples
- 📚 **Platform Guides** - Comprehensive guides for Web, Flutter, VS Code, and Vim
- ♿ **Accessibility Checker** - Test color contrast ratios and WCAG compliance
- 🧘 **Design Philosophy** - Learn about Hygge and Lagom principles
- 🌓 **Dark/Light Mode** - Responsive theme switching

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Option 1: GitHub Pages

Add to your repository's `.github/workflows/deploy.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          cd website
          npm ci
          npm run build
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/dist
```

### Option 2: Netlify

1. Connect your repository to Netlify
2. Set build settings:
   - Build command: `cd website && npm run build`
   - Publish directory: `website/dist`
3. Deploy!

### Option 3: Vercel

1. Import your repository in Vercel
2. Set root directory to `website`
3. Framework preset: Vite
4. Deploy!

### Custom Domain

For a subdomain like `candi.wtasg.org`:

1. Add a CNAME record pointing to your hosting provider
2. Configure the custom domain in your hosting platform
3. Enable HTTPS

## Technology Stack

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **OKLCH** - Color space

## License

MIT
