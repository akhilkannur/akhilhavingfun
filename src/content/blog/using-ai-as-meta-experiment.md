---
title: 'Using AI as a Meta-Experiment for Marketing (Last 30 Days)'
description: 'How I used AI to build and market RealAIExamples.com while documenting the entire process.'
publishedTime: '2025-02-15'
---

I've been messing around with something over the past 30 days while building and marketing RealAIExamples.com, and figured I'd share it here to see what people think.

Most of this work happens directly in the terminal. I mostly use Gemini CLI, and more recently I've started using AMP and Qwen CLI.

I'm not a developer like most people in this group aren't either. My background is marketing/sales prospecting. The only coding I'd done before this was trying to learn a bit of Python at some point and then dropping it.

The setup is pretty straightforward:
- I ask AI to come up with ideas for improving the site.
- If something works, I ask it to note down it exactly as a MD file.
- That ends up published back on the site as a recipe or blueprint others can follow.

So the site is both the thing being built and the place where the learnings live.

## Some things I actually built:

### 1. Directory Listing Automation (Python + Resend API)

- **Why:** Manually emailing hundreds of tool makers is a waste of time.
- **What:** A Python script that reads new submissions from a CSV, checks if they're live on the site, deduplicates against a sent list, and sends personalized emails automatically.
- **How:** Python csv module, subprocess + curl to hit the Resend API, .env checks for security, and UTM tagging for click tracking.

### 2. Screenshot Engine (Puppeteer + Node.js)

- **Why:** Generic "AI-generated" thumbnails look fake and reduce trust.
- **What:** A headless browser system that visits URLs, handles login walls like Twitter/X, and captures clean, consistent screenshots.
- **How:** Puppeteer running headless Chrome, platform detection, DOM-based waits, and custom crop coordinates.

### 3. Programmatic Video Creation (Remotion + React)

- **Why:** Video content performs better but takes forever to edit.
- **What:** React-based video templates that auto-generate promotional videos from screenshots and text.
- **How:** Remotion for programmatic video, with simple transitions and text overlays.

## The Meta Part

Here's where it gets interesting: every working solution gets documented and published back on the site. So visitors can:
1. See the actual tool/example
2. Read exactly how it was built
3. Copy the approach for their own projects

This creates a self-documenting build process where the marketing content writes itself.

## Results So Far

- Built and shipped 3 real tools
- Documented the entire process
- Got actual users trying the approaches
- Learned way more than any tutorial could teach

The key insight: treating your project as both the experiment and the documentation creates a flywheel where building and marketing become the same activity.
