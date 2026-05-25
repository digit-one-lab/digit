import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ') || 'Untitled Post';
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const date = new Date().toISOString().slice(0, 10);
const dir = join(process.cwd(), 'src', 'content', 'posts');
mkdirSync(dir, { recursive: true });
const file = join(dir, `${slug}.md`);
if (existsSync(file)) throw new Error(`Post already exists: ${file}`);
writeFileSync(file, `---\ntitle: "${title}"\ndate: ${date}\ntags: ["Notes"]\ncategory: "Notes"\ndescription: "Add a clear one-sentence description."\ndraft: true\nfeatured: false\nauthor: "Damir"\n---\n\nWrite the article here.\n`);
console.log(`Created ${file}`);
