import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/utils/readingTime';
import rehypePrettyCode from 'rehype-pretty-code';
import vercelStatic from '@astrojs/vercel/static';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";

import vercel from '@astrojs/vercel/serverless';

const options = {
  //theme: json,
  theme: JSON.parse(fs.readFileSync("./src/themes/gruvbox-dark.json", "utf-8")),
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


// https://astro.build/config
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
