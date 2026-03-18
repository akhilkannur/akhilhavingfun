import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://akhilhaving.fun',
  adapter: vercel(),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto'
  }
});
