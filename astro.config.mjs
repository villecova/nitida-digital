import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nitidadigital.com',
  integrations: [
    svelte(),
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/specialist'),
    }),
  ],
});
