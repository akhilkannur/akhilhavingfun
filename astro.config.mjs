import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://akhilhaving.fun',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto'
  }
});
