import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const baseUrl = 'https://akhilneeds.space';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/no-agenda-call', priority: '0.8', changefreq: 'monthly' },
    { url: '/cold-email-setup-service', priority: '0.8', changefreq: 'monthly' },
    { url: '/directory-listing-service', priority: '0.8', changefreq: 'monthly' },
    { url: '/growth-intent-1k', priority: '0.8', changefreq: 'monthly' },
    { url: '/personalized_landing_page', priority: '0.8', changefreq: 'monthly' },
    { url: '/spendsignal', priority: '0.8', changefreq: 'monthly' },
    { url: '/two-minute-guide-to-cold-email', priority: '0.8', changefreq: 'monthly' },
  ];

  const blogEntries = await getCollection('blog');

  const urlElements: string[] = [];

  const addUrl = (loc: string, lastmod: string, priority: string, changefreq?: string) => {
    urlElements.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq || 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  };

  staticPages.forEach(page => {
    const loc = page.url === '/' ? `${baseUrl}/` : `${baseUrl}${page.url}`;
    addUrl(loc, today, page.priority, page.changefreq);
  });

  blogEntries.forEach(entry => {
    const loc = `${baseUrl}/blog/${entry.slug}`;
    const lastmod = entry.data.publishedTime || today;
    addUrl(loc, lastmod, '0.6', 'monthly');
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
