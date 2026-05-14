---
title: "Turning Unstructured Data into a Weekly Newsletter"
description: "How I used Claude and Hermes to automate domain dispute scraping, enrichment, and newsletter generation."
publishedTime: "2026-05-07"
---

> **Update (May 14, 2026):** I’ve since moved this entire setup to **AWS**, running on a small EC2 instance via cron jobs. I also realized that using a full AI agent (Hermes) for a recurring task was overkill. I’ve swapped the agent for a modular Python script, which is more reliable and cheaper to run. [Read why I made the switch here](/blog/when-to-use-an-ai-agent-on-a-server).

My favorite use case for LLMs is still turning unstructured data into a structured format.

![Screenshot of the workflow](/domain-dispute-newsletter-screenshot.jpeg)

I’ve also been waiting for a good excuse to test Hermes out, so I had Claude write the initial scraping scripts, then let Hermes handle the rest. It ended up becoming a fun automated weekly newsletter that pulls domain dispute rulings from each week and summarizes them for domain investors, trademark lawyers, and brand managers.

Instead of manually digging through official verdicts, they get a weekly summary that helps them stay informed on trends, understand legal precedents, and refine their strategies for brand protection and domain investment.

## Here’s how it works

1. **Scraping decisions:** The process starts by automatically gathering new domain dispute decisions from the major resolution providers: WIPO, NAF, and CAC. It collects basic information like case IDs and decision URLs.
2. **Enriching details:** For each decision, the system visits the individual ruling page and extracts more comprehensive details. This includes the complainant and respondent names, the domain name in dispute, the outcome of the case (`Transfer`, `Denied`, `Cancelled`), and a summary of the panel’s reasoning.
3. **Curating content:** The enriched decisions get passed to a content generation phase. The system selects the most interesting or newsworthy cases based on certain criteria. For the selected disputes, it creates concise summaries that highlight key facts, legal reasoning, and the implications for domain investors, trademark lawyers, and brand managers. It also generates a subject line, an introductory paragraph, and a concluding remark for the newsletter.
4. **Formatting and sending:** All the curated content gets formatted into an HTML email template and sent through the Brevo API to the subscriber list.

I think there are a lot more use cases for this, especially in niches like regulatory changes for startups where the information is basically buried in PDFs.
