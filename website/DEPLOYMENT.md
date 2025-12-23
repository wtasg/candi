# Deployment Guide for Candi Documentation Website

This guide covers deploying the Candi documentation website to various hosting platforms.

## Table of Contents

- [GitHub Pages (Recommended)](#github-pages)
- [Custom Domain Setup](#custom-domain-setup)
- [Alternative Hosting Options](#alternative-hosting-options)

## GitHub Pages

The repository includes a GitHub Actions workflow that automatically deploys the website to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Trigger Deployment**
   - Push changes to the `main` branch (any changes in the `website/` directory)
   - Or manually trigger the workflow from the "Actions" tab

3. **Access Your Site**
   - Your site will be available at `https://[username].github.io/candi/`
   - Example: `https://wtasg.github.io/candi/`

### Manual Deployment

If you prefer to deploy manually without GitHub Actions:

```bash
# Build the website
cd website
npm install
npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

## Custom Domain Setup

To use a custom subdomain like `candi.wtasg.org`:

### Step 1: DNS Configuration

Add a CNAME record in your DNS settings:

```text
Type: CNAME
Name: candi
Value: [username].github.io
TTL: 3600 (or default)
```

For example:

- Name: `candi`
- Value: `wtasg.github.io`

### Step 2: GitHub Pages Configuration

1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `candi.wtasg.org`
3. Click "Save"
4. Wait for DNS check to complete
5. Enable "Enforce HTTPS" (recommended)

### Step 3: Update Base Path (if needed)

If using a custom domain at the root level, update `website/vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Change from '/candi/' to '/'
  // ... rest of config
})
```

## Alternative Hosting Options

### Netlify

1. **Connect Repository**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Base directory: `website`
   - Build command: `npm run build`
   - Publish directory: `website/dist`

3. **Custom Domain**
   - Go to Site settings → Domain management
   - Add custom domain: `candi.wtasg.org`
   - Follow Netlify's DNS instructions

4. **Deploy**
   - Netlify will automatically deploy on push to main branch

### Vercel

1. **Import Project**
   - Sign up at [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: `website`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Custom Domain**
   - Go to Project Settings → Domains
   - Add: `candi.wtasg.org`
   - Update your DNS with provided CNAME

4. **Deploy**
   - Vercel deploys automatically on push

### Cloudflare Pages

1. **Create Project**
   - Sign in to Cloudflare Dashboard
   - Go to Pages → Create a project
   - Connect your GitHub repository

2. **Build Settings**
   - Framework preset: Vite
   - Build command: `cd website && npm run build`
   - Build output directory: `website/dist`

3. **Custom Domain**
   - Go to Custom domains
   - Add `candi.wtasg.org`
   - Cloudflare will automatically configure DNS if using their nameservers

## Environment Variables

If you need to use environment variables:

### GitHub Actions Secrets

Add secrets in repository Settings → Secrets and variables → Actions

### Netlify/Vercel

Add environment variables in their respective dashboards under project settings.

## Continuous Deployment

All mentioned platforms support automatic deployments:

- **GitHub Pages**: Via included GitHub Actions workflow
- **Netlify**: Automatically on git push
- **Vercel**: Automatically on git push
- **Cloudflare Pages**: Automatically on git push

## Troubleshooting

### 404 Errors on Refresh

If you get 404 errors when refreshing pages (common in Single Page Applications), you need to configure routing for your platform:

**For GitHub Pages**: GitHub Pages does not support `_redirects` files. Instead, use a `404.html` file to handle routing. The repository currently includes a `website/public/404.html` that uses a script to redirect traffic to the main `index.html`.

> [!NOTE]
> GitHub Pages is a static hosting service and doesn't process server-side redirect rules like `_redirects`.

**For Netlify**: Create `website/public/_redirects` (supported natively):

```text
/*    /index.html   200
```

**For Vercel**: Create `website/vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Build Failures

1. Ensure all dependencies are installed
2. Check Node.js version (should be 18+)
3. Clear cache: `rm -rf node_modules package-lock.json && npm install`
4. Test build locally: `npm run build`

### Custom Domain Not Working

1. Wait for DNS propagation (can take up to 48 hours)
2. Verify CNAME record is correct
3. Check DNS with: `dig candi.wtasg.org` or `nslookup candi.wtasg.org`
4. Ensure SSL certificate is provisioned (automatic on most platforms)

## Performance Optimization

The website is already optimized with:

- Code splitting
- Minification
- CSS optimization
- Gzip compression

For additional improvements:

1. Enable HTTP/2
2. Use a CDN (automatic on Netlify, Vercel, Cloudflare)
3. Enable caching headers
4. Consider adding service worker for PWA features

## Monitoring

Consider adding:

- **Analytics**: Google Analytics, Plausible, or Fathom
- **Error Tracking**: Sentry
- **Uptime Monitoring**: UptimeRobot or Better Uptime

Add tracking codes in `website/index.html` before the closing `</head>` tag.

## Support

For issues or questions:

- Check the [website README](../website/README.md)
- Open an issue on GitHub
- Review hosting platform documentation
