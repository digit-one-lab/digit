import fs from 'node:fs';
import path from 'node:path';

const issueTitle = process.env.ISSUE_TITLE || '';
const issueBody = process.env.ISSUE_BODY || '';
const issueNumber = process.env.ISSUE_NUMBER || '';

function readSection(label) {
  const parts = issueBody.split('\n### ');
  for (const part of parts) {
    const clean = part.replace(/^### /, '');
    const lines = clean.split('\n');
    const head = (lines.shift() || '').trim().toLowerCase();
    if (head === label.toLowerCase()) return lines.join('\n').trim();
  }
  return '';
}

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || `post-${Date.now()}`;
}

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function markdownToHtml(value) {
  return value.split(/\n\s*\n/).map(block => {
    const text = block.trim();
    if (!text) return '';
    if (text.startsWith('## ')) return `<h2>${esc(text.slice(3))}</h2>`;
    if (text.startsWith('# ')) return `<h2>${esc(text.slice(2))}</h2>`;
    if (text.startsWith('- ')) return `<ul>${text.split('\n').filter(x => x.trim().startsWith('- ')).map(x => `<li>${esc(x.trim().slice(2))}</li>`).join('')}</ul>`;
    return `<p>${esc(text).replaceAll('\n', '<br />')}</p>`;
  }).join('\n    ');
}

const title = readSection('Post title') || issueTitle.replace(/^\[Post\]\s*/i, '').trim() || 'Untitled Post';
const description = readSection('Short description') || 'New published post.';
const body = readSection('Post body') || 'No content provided.';
const tags = (readSection('Tags') || 'Post').split(',').map(x => x.trim()).filter(Boolean);
const slug = slugify(title);
const date = new Date().toISOString().slice(0, 10);
const displayDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));

fs.mkdirSync('src/pages/posts', { recursive: true });
fs.mkdirSync('src/data', { recursive: true });

const pageFile = path.join('src', 'pages', 'posts', `${slug}.astro`);
if (fs.existsSync(pageFile)) throw new Error(`Post page already exists: ${pageFile}`);

const html = markdownToHtml(body);
const tagHtml = tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
const page = `---\nimport BaseLayout from '../../layouts/BaseLayout.astro';\n---\n<BaseLayout title="${esc(title)}" description="${esc(description)}">\n  <article class="shell prose">\n    <div class="meta"><span>${esc(tags[0] || 'Post')}</span><span>·</span><span>${displayDate}</span></div>\n    <h1>${esc(title)}</h1>\n    <p class="lead">${esc(description)}</p>\n    <div class="article-cover"></div>\n    ${html}\n    <div class="meta" style="margin-top:34px">${tagHtml}</div>\n  </article>\n</BaseLayout>\n`;
fs.writeFileSync(pageFile, page);

const dataFile = path.join('src', 'data', 'posts.json');
const posts = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : [];
posts.unshift({ title, description, date, displayDate, slug, tags, issue: issueNumber });
fs.writeFileSync(dataFile, JSON.stringify(posts, null, 2) + '\n');
console.log(`Published post: ${slug}`);
