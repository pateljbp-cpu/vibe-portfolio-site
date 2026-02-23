# Agent guide — Pete McPherson portfolio

This file gives AI agents and developers context for working in this repo. For user-facing setup and deployment, see [README.md](./README.md). For Windows/Node environment setup, see [docs/WINDOWS-NODE-SETUP.md](./docs/WINDOWS-NODE-SETUP.md).

---

## Project overview

- **What it is:** A minimal, static portfolio site for Pete McPherson. Goal: educate visitors and drive newsletter signups.
- **Stack:** Astro (static), Tailwind CSS, no backend. Deploy target: Cloudflare Pages.
- **Primary CTA:** Newsletter email signup (frontend only; backend to be connected later).

---

## Tech stack

| Layer        | Choice              | Notes                                      |
|-------------|---------------------|--------------------------------------------|
| Framework   | Astro               | Static site; zero JS by default            |
| Styling     | Tailwind CSS        | Utility classes; custom `accent`, fonts     |
| Hosting     | Cloudflare Pages    | Static; build output `dist/`               |
| Fonts       | Fontshare (CDN)     | Khand (headings), Switzer (body)           |

---

## Repository structure

```
vibe-portfolio-site/
├── AGENTS.md                 # This file
├── README.md                 # User setup & deployment
├── package.json
├── astro.config.mjs          # site URL, Tailwind, sitemap
├── tailwind.config.mjs       # colors (accent #E10600), fonts, maxWidth
├── tsconfig.json
├── docs/
│   └── WINDOWS-NODE-SETUP.md # Windows + Node + nvm-windows + Cursor
├── public/
│   ├── favicon.svg           # Placeholder favicon
│   └── robots.txt            # Sitemap URL (update domain after deploy)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro  # HTML shell, meta, fonts, global CSS import
    ├── pages/
    │   ├── index.astro       # Home: hero, newsletter CTA, “View Projects”
    │   ├── about.astro       # About: placeholder bio + newsletter
    │   └── projects.astro    # Projects: ProjectCard grid + newsletter
    ├── components/
    │   ├── Header.astro      # Site title + nav (Home, About, Projects)
    │   ├── Footer.astro      # © {year} Pete McPherson
    │   ├── NewsletterForm.astro  # Email + Submit (no backend)
    │   └── ProjectCard.astro # Title, description, “View project” link
    └── styles/
        └── globals.css       # Tailwind base; body/heading defaults
```

---

## Commands

| Command           | Purpose                                  |
|------------------|------------------------------------------|
| `npm install`    | Install dependencies                     |
| `npm run dev`    | Start dev server (e.g. http://localhost:4321) |
| `npm run build`  | Production build → `dist/`               |
| `npm run preview`| Serve `dist/` locally                    |

All commands are run from the **project root**: `C:\Users\jayep\Coding Projects\vibe-portfolio-site` (or equivalent).

---

## Local development environment (Windows)

- **OS:** Windows 10/11, PowerShell, Cursor.
- **Node:** Required (Node 18+; Node 20 LTS recommended). If `node` or `npm` is not recognized:
  - Use **nvm-windows** (recommended): install from [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases) (`nvm-setup.exe`), then `nvm install 20` and `nvm use 20`.
  - Full step-by-step: **[docs/WINDOWS-NODE-SETUP.md](./docs/WINDOWS-NODE-SETUP.md)** (uninstall old Node first, install nvm-windows, verify PATH, restart Cursor so terminal sees `node`/`npm`).
- **Verify:** `node -v`, `npm -v`, `where.exe node` (should point to nvm’s Node). After changing PATH, fully restart Cursor so new terminals pick up the correct Node.

---

## Build and deployment

- **Build:** `npm run build` → output in `dist/` (static HTML, assets, sitemap).
- **Cloudflare Pages:**
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
  - After deploy: set `site` in `astro.config.mjs` to production URL; update `public/robots.txt` Sitemap URL to the same domain.
- See [README.md](./README.md) for Git-based and Wrangler CLI deploy steps.

---

## Design system

- **Colors:** White `#ffffff`, black `#000000`, accent red `#E10600` (Tailwind `accent` in `tailwind.config.mjs`). Use accent sparingly for CTAs and links.
- **Fonts:** Khand (headings, bold/uppercase), Switzer (body); loaded in `BaseLayout.astro` via Fontshare.
- **Layout:** Max content width 960px (`max-w-content`), centered; generous padding. Clean, minimal, lots of white space.

---

## Placeholder content

All copy and project data are placeholders. When editing:

- **Home:** `src/pages/index.astro` — headline, tagline, intro, “View Projects” CTA.
- **About:** `src/pages/about.astro` — bio/story and newsletter section.
- **Projects:** `src/pages/projects.astro` — list of projects and `ProjectCard` props (title, description, optional href).
- **Newsletter:** `src/components/NewsletterForm.astro` — form is UI only; connect to an email provider later (e.g. ConvertKit, Mailchimp).

---

## Conventions for agents

- **Pages:** Each page uses `BaseLayout.astro` with `title` and `description` props for SEO. Pass `currentPage` to `Header.astro` for active nav (e.g. `"/"`, `"/about"`, `"/projects"`).
- **Styling:** Prefer Tailwind utilities; extend in `tailwind.config.mjs` or `src/styles/globals.css` if needed. Keep the existing color/font system.
- **No backend:** Newsletter form has no server logic; do not add backend code unless the user requests it.
- **Accessibility:** Keep semantic HTML, labels, and focus states (e.g. as in `NewsletterForm.astro` and `Header.astro`).
- **Performance:** Astro ships zero JS by default; keep it that way unless interactivity is required.

---

## SEO and static assets

- **Per-page:** `<title>` and `<meta name="description">` set via `BaseLayout.astro` props from each page.
- **Sitemap:** Generated by `@astrojs/sitemap` when `site` is set in `astro.config.mjs`.
- **robots.txt:** `public/robots.txt` — update the Sitemap URL to the production domain after deployment.
- **Favicon:** `public/favicon.svg` is a placeholder; can be replaced without code changes.

---

## Quick reference

- **Add a page:** New file under `src/pages/` (e.g. `contact.astro`), use `BaseLayout` and `Header`/`Footer`, add nav link in `Header.astro`.
- **Change accent color:** `tailwind.config.mjs` → `theme.extend.colors.accent`.
- **Change site title / nav label:** `Header.astro` (site title and `navLinks`).
- **Node not found in terminal:** See [docs/WINDOWS-NODE-SETUP.md](./docs/WINDOWS-NODE-SETUP.md); ensure nvm-windows is used and Cursor was restarted after PATH changes.
