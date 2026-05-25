import rss from '@astrojs/rss';
import { getPosts, entrySlug } from '../lib/content';

export async function GET(context: { site: URL }) {
  const posts = await getPosts();
  return rss({
    title: 'Digit',
    description: 'Personal publishing, essays, notes, and projects.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/articles/${entrySlug(post)}/`
    }))
  });
}
