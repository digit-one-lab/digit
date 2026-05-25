export function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: https://digit-one-lab.github.io/digit/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
