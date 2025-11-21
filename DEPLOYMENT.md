# Deploying to Cloudflare Pages - Manual Upload

## Prerequisites

- A Cloudflare account (free tier works fine)
- Node.js installed on your machine

## Step 1: Build Your Project

Run the build command to generate the static files:

```bash
npm run build
```

This will create a `dist/` folder with all your optimized static files.

## Step 2: Manual Deployment to Cloudflare Pages

### Option A: Using NPM Script (Easiest & Recommended) ⭐

1. **Install Wrangler** (Cloudflare's CLI tool):

```bash
npm install -g wrangler
```

2. **Login to Cloudflare** (one-time setup):

```bash
wrangler login
```

3. **Deploy with a single command**:

```bash
npm run deploy
```

This will automatically:

- Build your project (`npm run build`)
- Deploy to Cloudflare Pages
- Use the project name `hangman-game`

**For production deployment**:

```bash
npm run deploy:production
```

### Option B: Using Wrangler CLI Directly

If you prefer to use wrangler commands directly:

```bash
npm run build
wrangler pages deploy dist --project-name=hangman-game
```

Replace `hangman-game` with your desired project name.

### Option C: Manual Upload via Dashboard

1. **Go to Cloudflare Dashboard**:
   - Visit https://dash.cloudflare.com/
   - Login to your account

2. **Create a New Pages Project**:
   - Click on "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Select "Pages" tab
   - Click "Upload assets"

3. **Upload Your Build**:
   - Give your project a name (e.g., "hangman-game")
   - Drag and drop the entire `dist/` folder OR click "Select from computer"
   - Click "Deploy site"

4. **Wait for Deployment**:
   - Cloudflare will process and deploy your files
   - You'll get a URL like: `https://hangman-game.pages.dev`

## Step 3: Custom Domain (Optional)

1. In your Cloudflare Pages project settings
2. Go to "Custom domains"
3. Click "Set up a custom domain"
4. Follow the instructions to connect your domain

## Build Settings (For Future Reference)

If you connect via Git instead of manual upload:

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 20

## Troubleshooting

### Sound Files Not Loading

- Make sure the `public/sounds/` folder is included in the build
- Check browser console for any CORS or file path errors

### Pages Not Found (404)

- Astro uses client-side routing by default
- Cloudflare Pages should handle this automatically

### Build Fails

- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Try building locally first with `npm run build`

## Re-deployment

To update your site with one command:

```bash
npm run deploy
```

Or manually:

1. Make changes to your code
2. Run `npm run build` again
3. Upload the new `dist/` folder to Cloudflare Pages
   - Or run `wrangler pages deploy dist --project-name=hangman-game`

## Available NPM Scripts

| Script                      | Command               | Description                           |
| --------------------------- | --------------------- | ------------------------------------- |
| `npm run dev`               | `astro dev`           | Start development server              |
| `npm run build`             | `astro build`         | Build for production                  |
| `npm run preview`           | `astro preview`       | Preview production build locally      |
| `npm run deploy`            | Build + Deploy        | Build and deploy to Cloudflare Pages  |
| `npm run deploy:production` | Build + Deploy (main) | Build and deploy to production branch |

## Notes

- The `dist/` folder contains all optimized assets including:
  - HTML files
  - CSS files
  - JavaScript bundles
  - Images and fonts
  - Sound files
- First deployment may take 1-2 minutes
- Subsequent deployments are usually faster
- Cloudflare Pages provides automatic HTTPS
- Free tier includes unlimited bandwidth and requests
