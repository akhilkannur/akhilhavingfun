---
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');
const baseUrl = 'https://akhilhaving.fun';
---

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{baseUrl}/</loc>
    <lastmod>{new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  {blogPosts.map((post) => (
    <url>
      <loc>{`${baseUrl}/blog/${post.slug}`}</loc>
      <lastmod>{post.data.publishedTime || new Date().toISOString().split('T')[0]}</lastmod>
    </url>
  ))}
</urlset>
