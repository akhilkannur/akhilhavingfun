---
title: 'I Built a Chrome Extension to Type With My Voice'
description: 'How I built a Chrome extension for voice typing without being a coder.'
publishedTime: '2025-10-14'
---

So, I vibe coded a Chrome extension this weekend that lets me type with my voice anywhere on the web.

I was just tired of typing, and now I use this thing every day. It's super handy and works a lot like paid apps (e.g., Wispr Flow).

I'm not a coder, still can't really write code myself, but I love messing with tech.

The best part? Chrome extensions are perfect for this. You just create a few files and upload them to your browser. No messing with GitHub, Vercel, or all the deployment stuff that makes most non-coders give up.

This tool is surprisingly simple under the hood. It's just a few free APIs glued together: a control panel to turn the mic on/off, an invisible cursor tracker, and a speech-to-text service like Deepgram (they give you enough free credits to start). No need to copy paste after recording, it automatically detects the text box upon placing the cursor and inputs text. Added an option to optimize the text further using the Groq API.

The most exciting takeaway is that you don't need a coding degree to build something that solves your own problems. You're building stuff for yourself, not some complex software for others. Put your assumptions aside, start exploring, and just try to "clone stuff."

You can check out the extension I built here: [Voice-activated Typing Chrome Extension](https://1000what.gumroad.com/l/uzurz).
