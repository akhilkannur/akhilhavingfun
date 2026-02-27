import type { APIRoute } from 'astro';

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

  const blogPosts = [
    'what-i-learned-from-finally-using-meeting-transcripts',
    'expired-directory-domains--how-i-found-them-for-building-new-directories',
    'beyond-templates--finding-pain-qualified-segments-for-ai-automation-success',
    'a-two-minute-guide-to-setting-up-cold-email',
    'a-google-sheet-script-to-find-linkedin-company-pages',
    '5-ai-prompts-for-deeper-thinking',
    'fixing-google-search-console-sitemap-bug',
    'voice-typing-chrome-extension',
    'using-ai-as-meta-experiment',
    'ai-sniper-workflow',
    'hybrid-prompt-fix',
  ];

  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
  ${staticPages.filter(p => p !== '/').map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
  ${blogPosts.map(slug => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
