# Jay Patel — Portfolio Site

A minimal, bold portfolio site for Jay Patel built with **Astro** and **Tailwind CSS**. The site is static, fast, and focused on educating visitors and driving newsletter signups.

## Tech Stack

- **Astro** — Static site generator (zero JS by default)
- **Tailwind CSS** — Utility-first styling
- **Cloudflare Pages** — Hosting (free tier)

## Setup

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### Install and run locally

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build for production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Project structure

```
src/
  pages/
    index.astro      → Home page (/)
    about.astro      → About page (/about)
    projects.astro   → Projects page (/projects)
  components/
    Header.astro     → Site header and navigation
    Footer.astro     → Footer with copyright
    NewsletterForm.astro → Email signup form (frontend only)
    ProjectCard.astro   → Project preview cards
  layouts/
    BaseLayout.astro → HTML shell, meta tags, fonts
  styles/
    globals.css      → Tailwind base and custom styles
public/
  favicon.svg        → Placeholder favicon (replace as needed)
  robots.txt         → SEO robots file
```

## Deployment to Cloudflare Pages

### Option 1: Connect via Git (recommended)

1. Push this repo to GitHub (or GitLab).
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select your repo and configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (leave blank if project is at repo root)
   - **Environment variables:** None required for a static build.
4. Click **Save and Deploy**. Cloudflare will build and deploy on every push to your default branch.

### Option 2: Deploy with Wrangler (CLI)

1. Install Wrangler: `npm install -g wrangler`
2. Log in: `wrangler login`
3. From the project root, run:
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=pete-mcpherson-portfolio
   ```
4. Follow prompts to create the project if it’s your first time.

### After deployment

- Set your custom domain in Cloudflare Pages (e.g. `petemcpherson.com`).
- In `astro.config.mjs`, set `site` to your production URL (e.g. `https://petemcpherson.com`) so the sitemap and canonical URLs are correct.
- In `public/robots.txt`, update the `Sitemap` URL to your real domain.

## Placeholder content

All copy and project entries are **placeholders**. Replace them with real content:

- **Home:** Headline, tagline, and intro in `src/pages/index.astro`.
- **About:** Bio and story in `src/pages/about.astro`.
- **Projects:** Titles, descriptions, and links in `src/pages/projects.astro` (and optionally in `ProjectCard.astro`).
- **Newsletter:** The form in `NewsletterForm.astro` has no backend; connect it to your email provider (e.g. ConvertKit, Mailchimp, Buttondown) when ready.

## Design notes

- **Colors:** White (`#ffffff`), black (`#000000`), accent red (`#E10600`). Edit `tailwind.config.mjs` to change the accent.
- **Fonts:** Khand (headings), Switzer (body), loaded from Fontshare in `BaseLayout.astro`.
- **Content width:** Max width 960px, centered; adjust in `tailwind.config.mjs` under `maxWidth.content`.

## SEO

- Each page has a unique `<title>` and `<meta name="description">` in `BaseLayout.astro` (via page props).
- The `@astrojs/sitemap` integration generates a sitemap when `site` is set in `astro.config.mjs`.
- `public/robots.txt` allows all crawlers and points to the sitemap (update the domain after deployment).

---

Built for Jay Patel. Replace placeholders, add your domain, and ship.
