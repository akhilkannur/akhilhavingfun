# SpendSignal Monthly Curation Process

## Overview
Each month, curate 500 hand-picked companies running LinkedIn ads. Deliver on the 1st of each month.

---

## Step 1: Scrape LinkedIn Ad Library

Start with the Ad Library — this is the source of truth.

### Keywords to scrape (rotate/expand monthly)
```
# Verticals (pick 10-12 per month)
- fintech, payments, banking software
- hr software, hris, people ops
- regtech, compliance software
- devtools, developer platform
- cybersecurity, security software
- martech, marketing automation
- healthtech, digital health
- supply chain software, logistics
- legal tech, contract management
- proptech, real estate software
- ai platform, machine learning
- sales enablement, revenue ops
```

### Scrape criteria
- Has active ads (not just historic)
- Verified advertiser = Yes
- Ad count: prioritize 5+ ads

### Expected output
~1,500-2,000 raw companies across all keywords

---

## Step 2: Clean & Dedupe

1. Remove duplicates (same company from multiple keyword searches)
2. Remove companies without LinkedIn company URL
3. Remove obvious non-B2B (universities, govt, NGOs)

### Expected output
~1,000-1,200 clean companies

---

## Step 3: Enrich

Add the following data points:

| Field | Source |
|-------|--------|
| Company LinkedIn URL | Already have from scrape |
| Ad count | Already have from scrape |
| Ad format | Scrape or enrich script |
| Sample ad URL | Scrape |
| Funding status | Crunchbase / PitchBook / manual |
| Company size | LinkedIn or Apollo |
| Decision-maker contact | Apollo / FullEnrich |

---

## Step 4: Score & Prioritize

Assign a priority score to pick the top 500:

| Signal | Points |
|--------|--------|
| Recently funded (last 6 months) | +3 |
| High ad count (20+) | +2 |
| Video ads (higher budget) | +2 |
| Mid-size company (50-500 employees) | +1 |
| Has decision-maker contact | +1 |

Sort by score, take top 500.

---

## Step 5: Final Review

Quick manual scan for:
- Any weird/spam companies that slipped through
- Balance across verticals (don't want 200 fintech and 10 healthtech)
- Remove any direct competitors of subscribers (if known)

---

## Step 6: Package & Deliver

### CSV columns (final export)
```
Company Name
Company LinkedIn URL
Has Ads (Yes)
Ad Count
Ad Format (Video/Image/Carousel)
Sample Ad URL
Verified Advertiser
Industry/Vertical
Funding Status (Funded/Unknown)
Decision Maker Name
Decision Maker Title
Decision Maker Email
Decision Maker LinkedIn
```

---

## Monthly Vertical Rotation

Don't scrape all verticals every month. Rotate to keep lists fresh.

### Example rotation:
- **January**: Fintech, HR Tech, DevTools, Cybersecurity, MarTech, HealthTech, RegTech, AI/ML
- **February**: Fintech, LegalTech, PropTech, Supply Chain, Sales Tech, EdTech, CleanTech, RevOps
- **March**: Mix based on subscriber feedback + new trending verticals

Always include **Fintech** and **MarTech** — highest demand.

---

## Tools Used

| Task | Tool |
|------|------|
| Scrape Ad Library | Custom Playwright script (adlibraryscraper/) |
| Deduplication | Python/Pandas |
| Funding data | Crunchbase API / manual |
| Contact enrichment | Apollo / FullEnrich |
| Final delivery | Google Sheets or CSV via email |

---

## Timeline

| Day | Task |
|-----|------|
| 25th | Start scraping keywords |
| 27th | Clean, dedupe, enrich |
| 29th | Score and select top 500 |
| 30th | Final review + package |
| 1st | Deliver to subscribers |

---

## Notes

- Cap subscribers at 50 to protect data value
- Custom list requests: charge $299+ and build separately
- Track which companies were in previous months to avoid repeats
