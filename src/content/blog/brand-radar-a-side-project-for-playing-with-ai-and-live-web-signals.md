---
title: "Brand Radar: A Side Project for Playing With AI and Live Web Signals"
description: "A project I built to experiment with AI, watch live web signals, and see what kinds of patterns showed up."
publishedTime: "2026-05-06"
---

Brand Radar started as a side project. I wanted to mess around with AI, follow a few live signals on the web, and see if I could turn the output into something I could actually scan.

The setup is focused on 50 AI companies across foundation models, applications, infrastructure, and hardware. From there, it watches for signals like funding, leadership changes, product launches, hiring, partnerships, and agency activity.

## Here's how I did it:

### 1. Kept the scope small

I did not want to track everything. A smaller set of companies made it easier to see what was happening and keep the project manageable.

### 2. Pulled in the live signals

I used Firehose by Ahrefs to monitor the web for new mentions and updates tied to those companies. The goal was to catch the kinds of events that usually hint at momentum before they become obvious.

### 3. Cleaned up the noise

Once the updates came in, I grouped them and scored them so I could compare companies more easily. A lot of the raw data was noisy, so the useful part was figuring out what actually deserved attention.

### 4. Wrapped it in a dashboard

I put the results into a dashboard so I could scan the companies quickly, check the latest signals, and see the broader trend without digging through raw logs.

### 5. Used it as a way to learn

The project was mostly a way to test ideas and play with the workflow. I wanted to see how far I could get by combining AI with a simple signal pipeline and a small set of companies that were worth watching.

What made it interesting was how much of the pattern was already there once the data was organized properly. The project was really just a way to surface it.
