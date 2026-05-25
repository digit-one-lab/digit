import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://digit-one-lab.github.io',
  base: '/digit/',
  output: 'static',
  integrations: [sitemap()]
});
