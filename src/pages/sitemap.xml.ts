import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const baseUrl = 'https://akhilhaving.fun';

  const staticPages = [
    '/',
    '/about',
    '/no-agenda-call',
    '/cold-email-setup-service',
    '/directory-listing-service',
    '/growth-intent-1k',
    '/personalized_landing_page',
    '/spendsignal',
    '/two-minute-guide-to-cold-email',
  ];

  const blogEntries = await getCollection('blog');
  const blogPosts = blogEntries.map(entry => entry.slug);

  // Use a Set to ensure all URLs are unique, as mentioned in the blog post fix
  const allUrls = new Set([
    ...staticPages.map(page => page === '/' ? `${baseUrl}/` : `${baseUrl}${page}`),
    ...blogPosts.map(slug => `${baseUrl}/blog/${slug}`)
  ]);

  const today = new Date().toISOString().split('T')[0];

  const urlElements = Array.from(allUrls).map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
