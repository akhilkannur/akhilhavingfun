---
title: "I Put an AI Agent on a Server. Here's When It's Worth It (And When It's Not)"
description: "After running Hermes on AWS for my newsletter automation, I learned that most tasks don't need a full AI agent. A simple script with one API call works better."
publishedTime: "2026-05-13"
---

I've been tinkering with [Hermes](https://github.com/Hermes-AI/hermes-agent), an open-source AI agent you can run in your terminal. Think of it as having a developer on call who can write code, run commands, browse the web, and remember what you told it last week.

The cool part? You can install Hermes on a cloud server and let it run tasks on autopilot, like a personal assistant that never sleeps. But after a few weeks of doing this, I realized something: **most of the time, I didn't need the full agent. A much simpler setup worked better.**

Let me explain.

## What I Was Building

I run a weekly newsletter about domain name disputes. Every Monday, a script on my AWS server:
1. Scrapes 350+ legal cases from the internet
2. Uses Google's Gemini AI to pick the best ones and write them up
3. Emails me a preview draft

I reply with stuff like "make the intro shorter" or "swap the 4th story for something about banking." A background process reads my reply, applies the edit, and sends me an updated draft. When I'm happy, I reply "approved" and it goes out.

My first thought was: **"Let me have Hermes run the whole thing."** An AI agent watching my inbox, deciding what to do with each reply, managing the whole back-and-forth.

## What Actually Worked Better

A simple Python script that:
- Checks my inbox every 30 seconds
- Sends my reply to Gemini with one instruction: "apply this edit to the newsletter"
- Sends me back the updated version

No agent. No reasoning. No conversation memory. Just a loop with one AI call where I need it.

**The cost difference?** About $0.002 per edit with the simple script. Hermes doing the same thing would cost 10-50x more, because an agent "thinks" through every step, even when the steps are always the same.

## So When Is Hermes Actually Worth It?

Here's what I learned. An AI agent like Hermes is basically **a cron job that can think.** A cron job is just a scheduled task, like "do this every Monday at 9am." It runs the same steps every time. If something breaks, it just fails and waits for you to fix it.

Hermes can **figure out what went wrong and try a different approach.** That's its superpower. But it's also expensive and occasionally unpredictable.

### Use Hermes when:

- **Things break unpredictably**. You have a scraper that stops working every few weeks because websites change their layout. Hermes can detect the breakage and adapt, instead of just crashing.
- **The task changes every time**. "Research this company, find their latest funding round, check if they're hiring marketers, and write me a brief." The steps depend on what it finds along the way.
- **You want a daily briefing that requires judgment**. Not just "send me data," but "tell me what's interesting and why."
- **You're monitoring something complex**. Like watching 50 companies for signals that they're about to start advertising. Each company needs a different approach.

### Use a simple script + one AI call when:

- **The steps are always the same**. Scrape → process → send. Every time.
- **You only need AI for one specific thing**. Writing the copy, applying an edit, scoring relevance.
- **You need it to be reliable**. Scripts do the same thing every time. Agents can get creative in ways you didn't ask for.
- **You want to understand what went wrong**. With a script, you read the error log. With an agent, you're asking "why did it decide to do that?"

## The Simple Test

Before putting Hermes on a server, ask yourself one question:

**"Do I already know the steps, or does the AI need to figure them out?"**

If you know the steps → write a script, add one Gemini API call where you need AI judgment, schedule it. Done. Cheap, reliable, boring in the best way.

If the answer is "it depends on what it finds" → that's where Hermes earns its keep.

## The Bottom Line

Hermes on a server is powerful. But it's like hiring a full-time assistant to do a job that a checklist could handle. Save the agent for the tasks where you genuinely need someone to *think*, not just *execute*.

Most of my automations are now dumb scripts with one smart API call. The only one that truly benefits from a persistent agent is a brand monitoring dashboard that needs to adapt its research strategy every day based on what it finds.

**An AI agent is an intelligent cron job.** And like most intelligence, it's expensive, occasionally unpredictable, and usually unnecessary. Use it when you're tired of fixing things yourself. Use a script for everything else.
