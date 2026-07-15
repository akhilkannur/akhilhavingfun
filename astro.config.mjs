import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://akhilneeds.space',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto'
  }
});
