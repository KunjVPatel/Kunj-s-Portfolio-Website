import rss, {pagesGlobToRssItems} from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'kunj.ml - portfolio',
    description: 'Exploring Data Science Concepts',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./blogs/*.{md,mdx}'),
    ),
    stylesheet: './rss/styles.xsl',
    customData: `<language>en-us</language>`,
  });
}