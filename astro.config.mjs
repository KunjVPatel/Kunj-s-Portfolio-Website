import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/utils/readingTime';
import rehypePrettyCode from 'rehype-pretty-code';
import vercelStatic from '@astrojs/vercel/static';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";

import fs from 'fs';
import vercel from '@astrojs/vercel/serverless';

// Determine theme based on environment variable
const theme = process.env.THEME === 'light' ? './src/themes/gruvbox-light.json' : './src/themes/gruvbox-dark.json';

const options = {
  theme: JSON.parse(fs.readFileSync(theme, "utf-8")), // Use the determined theme
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{
        type: 'text',
        value: ' '
      }];
    }
  },
  onVisitHighlightedLine(node) {
    // Adding a class to the highlighted line
    node.properties.className = ['highlighted'];
  }
};

// Astro configuration
export default defineConfig({
    site: 'https://kunj-s-portfolio-website.vercel.app',
    markdown: {
        syntaxHighlight: false,
        rehypePlugins: [[rehypePrettyCode, options]],
        remarkPlugins: [remarkReadingTime]
    },
    integrations: [tailwind(), react(), sitemap()],
    adapter: vercelStatic({
        output: 'server',
        webAnalytics: { enabled: true }
    })
});
