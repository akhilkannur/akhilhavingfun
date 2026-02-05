# The "Hybrid" prompt: A simple fix for agents that get stuck or lose context

## Tips and Tricks

I've been testing a lot of automations lately with tools like Gemini CLI. I have a huge list of about 500 prompts that worked fine when I was chatting with them, but they all fell apart once I tried to let them run on their own in the background. So I thought about sharing a few observations I noticed about agents and the fix I came up with. This could be a "too long, didn't read" one, but I'll give it a go!

The issue is that most prompts are built for a back and forth conversation. They expect you to be there to fix things or give them a nudge. If you want a tool to just do the work without you watching it, that conversational style is actually the problem.

I had to stop thinking about prompts as instructions and start thinking of them as Processors. I now use three basic categories for every task.

## The 3 Categories for Reliable Work

- **The Processor:** This is for moving data. You give it a file, it extracts what matters, and it stops. No searching or talking. Just data in and data out.

- **The Researcher:** This starts from zero. You give it a goal and it goes out to find the facts to build a foundation.

- **The Hybrid:** This is the most reliable for long tasks. It checks if you already gave it a list of companies or URLs. If that file is missing, it finds the info itself, then starts the actual work.

## Example: The Product Roadmap Inference Engine (Hybrid)

Instead of just asking for a summary, this is meant to connect dots between different sources to guess what a company is building next.

**Role:** Strategic Market Intelligence Agent.

**Objective:** Guess a competitor's likely product roadmap by connecting signals from their job boards and recent technical documentation.

### Phase 1: The Initial Check

Look for a file called target_competitors.csv. If it is missing, search for the top competitors in this niche and save them to the file. If it is already there, just load it

### Phase 2: The Collection Loop

For each company on the list:

- Check their careers page for technical hires. If they are hiring for a specific skill but do not have that feature yet, that is a signal.

- Check their changelog or "What's New" page for recent releases.

- Look at their public documentation for any new versions or beta features.

### Phase 3: The Guess

Compare the hiring trends against the current product. If they are hiring for a specific tech but the product lacks it, they are likely launching it soon. Save the final guess to a report file. No chat commentary is allowed during the process to keep the results clean.

## TL;DR

The problem I found is that the "social" side of AI is actually a liability for automation. In a normal chat, the model is trained to be helpful, so it wants to give you updates, ask for feedback, or summarize its progress between every step.

When you are trying to process hundreds of rows of data, those small "social" interruptions actually break the logic. All that extra conversational text eventually fills up the model's memory (the context window) until it forgets the original objective. Stripping out the chat and forcing it into a strict phase structure (Check, Loop, Save) is the best way I can get a script to stay on track without me baby-sitting it.