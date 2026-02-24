import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://vibe-portfolio-site.patel-jbp.workers.dev/',
  output: 'static',
  adapter: cloudflare(),
});