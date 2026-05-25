import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingTime(body = '') {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export function allTags(posts: Awaited<ReturnType<typeof getPosts>>) {
  return [...new Set(posts.flatMap((post) => post.data.tags))].sort();
}

export function allCategories(posts: Awaited<ReturnType<typeof getPosts>>) {
  return [...new Set(posts.map((post) => post.data.category))].sort();
}

export function relatedPosts(current: any, posts: any[], limit = 3) {
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({
      post,
      score: post.data.tags.filter((tag: string) => current.data.tags.includes(tag)).length + (post.data.category === current.data.category ? 2 : 0)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}
