# Using AI as a Meta-Experiment for Marketing (Last 30 Days)

I've been messing around with something over the past 30 days while building and marketing RealAIExamples.com, and figured I'd share it here to see what people think.

Most of this work happens directly in the terminal. I mostly use Gemini CLI, and more recently I've started using AMP and Qwen CLI.

I'm not a developer like most people in this group aren't either. My background is marketing/sales prospecting. The only coding I'd done before this was trying to learn a bit of Python at some point and then dropping it.

The setup is pretty straightforward:
- I ask AI to come up with ideas for improving the site.
- If something works, I ask it to note down it exactly as a MD file.
- That ends up published back on the site as a recipe or blueprint others can follow. So the site is both the thing being built and the place where the learnings live.

## Some things I actually built:

### 1. Directory Listing Automation (Python + Resend API) ([ref](https://realaiexamples.com/tools))
- **Why:** Manually emailing hundreds of tool makers is a waste of time.
- **What:** A Python script that reads new submissions from a CSV, checks if they're live on the site, deduplicates against a sent list, and sends personalized emails automatically.
- **How:** Python csv module, subprocess + curl to hit the Resend API, .env checks for security, and UTM tagging for click tracking.

### 2. Screenshot Engine (Puppeteer + Node.js) ([ref](https://realaiexamples.com/ai-examples))
- **Why:** Generic "AI-generated" thumbnails look fake and reduce trust.
- **What:** A headless browser system that visits URLs, handles login walls like Twitter/X, and captures clean, consistent screenshots.
- **How:** Puppeteer running headless Chrome, platform detection, DOM-based waits, and custom crop coordinates. (still haven't nailed generating uniform dimensions for screenshots!)

### 3. Programmatic Video Creation (Remotion + React)
- **Why:** Creating promo videos for every tool or recipe manually doesn't scale.
- **What:** A text-to-video pipeline that generates short vertical videos.
- **How:** Remotion with React, fed by a JSON config (title, hook, screenshot path).

### 4. Internal Linking at Scale (Next.js + JSON Data)
- **Why:** Orphan pages don't rank and manual internal linking breaks at scale.
- **What:** A programmatic internal linking structure across recipes, tools, and role-based pages.
- **How:** A large JSON dataset used during the Next.js build process to generate static pages and auto-link related content.

### 5. Social Content Scraper
- **Why:** Manually curating content is slow.
- **What:** A CLI tool that takes a Twitter/X URL and turns it into a content entry.
- **How:** A Node.js script that scrapes metadata, downloads screenshots, and appends structured entries to the content library.

### 6. Mass Documentation Factory (700+ PDFs) ([ref](https://realaiexamples.com/pdfs/abm-campaign-asset-builder.pdf))
- **Why:** Creating hundreds of documents manually is not realistic.
- **What:** Batch generation of multi-page PDF blueprint manuals.
- **How:** Workflow data injected into HTML templates and rendered into PDFs using Puppeteer.

### 7. AI Discovery Optimization (llms.txt)
- **Why:** To make sure tools like ChatGPT or Perplexity understand what the site contains.
- **What:** A machine-readable map of the site's content.
- **How:** A script that crawls the recipe database and generates an llms.txt file.

### 8. Headless Content Pipeline (Airtable → Next.js)
- **Why:** Editing content directly in code doesn't scale.
- **What:** A no-code content pipeline.
- **How:** Airtable used as a CMS, pulled into Next.js during the build process.

### 9. Programmatic Social Posting
- **Why:** Posting updates manually doesn't scale.
- **What:** Automated posting of new recipes and tools.
- **How:** Scripts that pull entries from a local database and post them to X.

In parallel, I've also been using the terminal for sending cold emails for hyper targeted campaigns with limited number of leads, scraping LinkedIn ad libraries to find high value advertisers and enrich the data using Exa AI etc.