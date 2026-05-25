import { getPosts } from '../lib/content';

export async function GET() {
  const posts = await getPosts();
  return new Response(JSON.stringify(posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    category: post.data.category,
    url: `${import.meta.env.BASE_URL}posts/${post.slug}/`
  }))), { headers: { 'Content-Type': 'application/json' } });
}
