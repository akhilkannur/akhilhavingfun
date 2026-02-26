---
title: 'The "AI Sniper" Workflow: High-Touch Outreach via the Terminal'
description: 'A CLI-based AI agent for high-touch B2B outreach that verifies, drafts, and sends emails one-by-one from your own inbox.'
publishedTime: '2025-02-24'
---

Most B2B outreach today is a volume game: buy a massive list, plug it into an automated sequencer, and hope for a 1% reply rate. While this works for scale, it often fails for high-value deals where context and accuracy matter more than numbers.

I've been using a CLI-based AI agent to handle my outreach. It's not a "bot" that blasts emails; it's a research partner that helps me verify, draft, and send emails one-by-one from my own inbox.

## The Workflow: Research, "Jam," and Send

Here is how this interactive workflow looks, using a B2B SaaS company as an example. Let's say a PropTech CRM called "EstateFlow".

### 1. Real-Time Verification
Instead of relying on a static CSV, I have the CLI verify the target live.
*   **The Prompt:** *"Read row 10 (EstateFlow). Find their Head of Sales. Check LinkedIn to see if they recently mentioned expanding their regional teams."*
*   **The Result:** The CLI finds that **Sarah K.** is the Head of Sales and she recently spoke at a conference about "The Future of Digital Real Estate in India." I now have a specific, relevant hook.

### 2. Contextual "Jamming"
I don't use a fixed template. I "jam" with the AI to refine the message.
*   **Drafting:** I tell the AI: *"Sarah spoke about digital real estate. Pitch her our localized UGC video service for property walk-throughs. Make it professional but direct."*
*   **Refining:** The AI drafts a long message. I tell it: *"Too wordy. Cut the intro. Focus on the fact that Indian buyers trust UGC 3x more than professional shoots."*
*   **Final Result:** A 3-sentence email that hits exactly what Sarah cares about.

### 3. Human-Triggered Execution
No email leaves the terminal without an explicit "Send" command. I review the final payload in the terminal window, and once I'm satisfied, I trigger the send.

---

## Technical Setup: Connecting the CLI to Google Workspace

If you use Google Workspace (business email), you can't just use your password in a script. You need an **App Password**.

### Step 1: Google Admin Settings
As the administrator, you must allow these permissions:
1.  Go to **admin.google.com** -> **Security** -> **Authentication** -> **2-Step Verification**.
2.  Enable **"Allow users to turn on 2-Step Verification."**
3.  Search for **"Less secure apps"** in the Admin Console and ensure users are allowed to manage their access.

### Step 2: Generate an App Password
1.  Go to your [Google Account Security](https://myaccount.google.com/security) settings.
2.  Turn **ON** 2-Step Verification for your account.
3.  Search for **"App passwords"** in the search bar.
4.  Create a new one named "CLI Outreach" and copy the 16-character code.

### Step 3: The Sending Script
The CLI agent writes a Python script that uses `smtplib` to connect to Gmail's servers. Store your 16-character code in a local `.env` file (and add it to `.gitignore`) so your credentials stay on your machine, not in your code.

---

## Is This Better Than a Bulk Tool?

### The Pros:
*   **Better Deliverability:** Since you are sending one-by-one from your actual, warmed-up business inbox, you avoid the "bulk sender" flags that often hit mass-outreach tools.
*   **Deep Customization:** You can pivot your strategy mid-batch based on what the AI finds on a founder's Twitter or LinkedIn.
*   **No Monthly Fees:** You aren't paying $100/mo for a sequencer; you're using a simple script.

### The Cons (Where it Doesn't Work):
*   **Not for Volume:** This is not for sending 1,000 emails a day. Google has daily limits (usually 500-2,000), and sending too many too fast will get your account flagged as spam.
*   **No Analytics:** You won't get "Open Rates" or "Click Tracking" unless you manually insert tracking pixels into your HTML body.
*   **Manual Effort:** You have to stay in the terminal and approve each send.

This is a **High-Touch** strategy. Use it for the 20-30 partners that would actually move the needle for your business, not for thousands of cold leads.
