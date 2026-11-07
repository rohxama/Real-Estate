import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` + `base` target a GitHub Pages project site:
//   https://rohxama.github.io/Real-Estate/
// If the site moves to a domain root (e.g. Vercel/Netlify), remove `base`
// and update `site` to the production origin.
export default defineConfig({
  site: 'https://rohxama.github.io',
  base: '/Real-Estate',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/design-system/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
});
