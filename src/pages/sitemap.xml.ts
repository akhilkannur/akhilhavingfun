import { getCollection } from 'astro:content';

export async function GET() {
  const blogPosts = await getCollection('blog');
  const baseUrl = 'https://akhilhaving.fun';

  // Static pages that exist in public/ folder
  const staticPages = [
    '/about',
    '/no-agenda-call',
    '/cold-email-setup-service',
    '/directory-listing-service',
    '/growth-intent-1k',
    '/personalized_landing_page',
    '/spendsignal',
    '/two-minute-guide-to-cold-email',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  ${staticPages.map((page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  `).join('')}
  ${blogPosts.map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.data.publishedTime || new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  `).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
