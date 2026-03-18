import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const baseUrl = 'https://akhilhaving.fun';
  const today = new Date().toISOString().split('T')[0];

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
  
  const urls = new Set<string>();
  
  const addUrl = (loc: string, lastmod: string, priority: string) => {
    urls.add(`<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`);
  };

  staticPages.forEach(page => {
    const loc = page.url === '/' ? `${baseUrl}/` : `${baseUrl}${page.url}`;
    addUrl(loc, today, page.priority);
  });

  blogEntries.forEach(entry => {
    const loc = `${baseUrl}/blog/${entry.slug}`;
    const lastmod = entry.data.publishedTime || today;
    addUrl(loc, lastmod, '0.6');
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Array.from(urls).join('')}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
