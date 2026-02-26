# Fixing the Google Search Console "Couldn't Fetch" Sitemap Bug

I've been stuck for a week trying to get Google Search Console to read my sitemap. It kept throwing a "Couldn't fetch" error, even though every validator and even Bing Webmaster Tools said the XML was perfect.

Here is how I finally fixed it.

## 1. Kill the Conflicts

I had a static `sitemap.xml` in my public folder and a dynamic `sitemap.ts` in Next.js. They were clashing. I deleted the static file and the old generation scripts. Next.js now handles everything dynamically so it actually stays in sync with my tool database.

## 2. Force Deduplication

Google is extremely picky about XML structure. My database had some duplicate slugs from a messy sync, and Google hates seeing the same URL twice in one file. I added a `Set` to my sitemap logic to filter out duplicates on the fly. This keeps the XML clean and valid every time it's crawled.

## 3. The "Rename Trick"

This was the most important step. Google Search Console often gets "stuck" on a specific filename if it fails once. Even after the file is fixed, Google keeps looking at its own internal cache of the old failure.

To bypass this, I added a rewrite in `next.config.mjs` to map `/sitemap_index.xml` to my dynamic sitemap. I updated `robots.txt` and submitted the new filename to Google.

It went green instantly. If you are stuck on "Couldn't fetch" and your XML is valid, just rename the file. Google treats it as a fresh start and finally clears the error.
