import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://akhilhaving.fun';
  const today = new Date().toISOString();

  const staticPages = [
    { url: '/', priority: '1.0' },
    { url: '/about', priority: '0.8' },
    { url: '/no-agenda-call', priority: '0.8' },
    { url: '/cold-email-setup-service', priority: '0.8' },
    { url: '/directory-listing-service', priority: '0.8' },
    { url: '/growth-intent-1k', priority: '0.8' },
    { url: '/personalized_landing_page', priority: '0.8' },
    { url: '/spendsignal', priority: '0.8' },
    { url: '/two-minute-guide-to-cold-email', priority: '0.8' },
  ];

  const blogEntries = await getCollection('blog');
  
  const urlElements = [
    ...staticPages.map(page => `
  <url>
    <loc>${page.url === '/' ? baseUrl : `${baseUrl}${page.url}`}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`),
    ...blogEntries.map(entry => `
  <url>
    <loc>${baseUrl}/blog/${entry.slug}</loc>
    <lastmod>${entry.data.publishedTime ? new Date(entry.data.publishedTime).toISOString() : today}</lastmod>
    <priority>0.6</priority>
  </url>`)
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
