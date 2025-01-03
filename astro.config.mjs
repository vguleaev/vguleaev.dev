import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';
import { remarkReadingTime } from './src/utils/reading-time.helper';

// https://astro.build/config
export default defineConfig({
  site: 'https://vguleaev.dev',
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  redirects: {
    '/blog': '/',
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
