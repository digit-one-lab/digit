import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site configuration for https://digit-one-lab.github.io/digit/
// Keep the trailing slash so import.meta.env.BASE_URL becomes /digit/.
export default defineConfig({
  site: 'https://digit-one-lab.github.io',
  base: '/digit/',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      wrap: true
    }
  }
});
