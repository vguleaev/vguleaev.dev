---
title: 'Start building AI apps in 2026'
description: 'Getting started with AI apps and LLM APIs in 2026, a guide for software developers'
pubDate: 2025-12-26
image:
  url: './covers/start-build-ai-apps-2026.png'
  alt: 'Blog post image'
tags: ['LLM', 'AI', 'Software Design']
---

Let me guess: you're a software engineer watching the industry transform with AI tooling, and you feel the need to study more to remain relevant. You guess you should start building AI apps and learning LLM APIs, but you're not sure where to begin.

**You're right to think this way.** The shift has happened, and there's no rolling it back. 2026 is the perfect time to start integrating AI into web apps.

Which tools should you use? Which models? What should you even build?

This post is a helping hand for developers who've been thrown into the ocean of AI and feel lost or frustrated. Let's ride the wave together! 🌊

## Agentic Coding (IDEs)

Funny to say, but to start building AI apps you should use AI 😅.

Specifically you should use **AI agents** inside your favorite IDE to help you generate code faster. That's probably not new to you and you already use them.

There are plenty of IDEs that support coding agents: VS Code, Windsurf, Cursor, Kiro, Antigravity and many more.

Of course you will need some subscription to use AI inside IDE because it's never free. However many have generous free tiers.

My personal recommendations are: **Cursor** and **Antigravity**.

> At the time of writing this article Antigravity is free because its Public Review, this gives you a lot of prompts for free. Use it. Google AI Pro also has 1 month free trial.

Some developers prefer CLI tools like **Codex CLI, Claude Code** are also great. Unfortunately, I haven't tried them yet and I simply prefer staying in full IDE rather than coding in the terminal.

Why [using AI to build AI](https://www.youtube.com/watch?v=-P-ein58laA) is important? Going fast is important. Your focus should be on learning how to integrate AI into standard web applications, not struggling with project setup and tooling.

And let's be honest: agentic coding is likely the future of development anyway. Practicing it more is never wrong.

## AI generated UI

Don't get me wrong, I like very good looking UI but I hate building it. It's always time consuming to build something that looks modern and beautiful _(for me at least)_.

I found a solution to this problem. I will let AI build the UI for me.

**Prefer to use AI to build user interfaces**. Do not lose time on building frontend from scratch, automate it. Nowadays AI can build very decent UI, which is more than enough for your learning project. This will save you a lot of time and frustration.

For a regular web app, my recommendation is always [React](https://react.dev/) with [shadcn/ui](https://ui.shadcn.com/).

These two together are incredibly popular in our community, and AI works perfectly with them. Shadcn UI limits the AI to use only its component library, which guarantees consistency across colors, theming, and UI elements. All you need to do is pick a branding color and a logo svg. Boom... Done! 💣

Use popular vibe codding tools to find inspiration for UI, examples: [Vercel v0](https://v0.dev/) and [Lovable](https://lovable.dev/). Both of them generate shadcn ui components by default.

## Where to use AI?

This is the toughest question: where does AI genuinely add value, and where is it unnecessary?

From my experience, unless you're building a chatbot, you'll likely end up with a standard web app enhanced with AI features. That's the most common pattern right now.

How to identify which parts of your app can benefit from AI? That's where your PM mindset comes in. It's very useful to develop skill of identifying what adds business value.

It is indeed hard to come up with an **AI feature that is somehow useful**. But here is my advice:

We know that LLMs produce non-deterministic output. Every response is different. So build **features where slight variations or minor errors are acceptable**. This typically means text based features: summaries, content generation, reports, analysis or anything where consistency isn't critical.

Don't try to offload your entire app's business logic to AI and let it make all the decisions. You'll probably fail most of the time. I realized that AI is too random to give it full control, old plain `if` conditions still do the job better and much more secure.

That said, I don't want to discourage you from trying [agentic architectures](https://en.wikipedia.org/wiki/Agent_architecture). You should give it a chance, just for me personally I was drowning in infinite attempts of fighting randomness and debugging hell.

Here are some AI apps I built to solve my own problems:

- **AI code review bot:** reads pull request diffs and leaves code review comments
- **AI text beautifier:** transforms poorly written English into polished, professional text with correct grammar
- **AI pull request summarizer:** reads Jira issues and GitLab PRs to create ticket summaries
- **AI error log miner:** analyzes 7 days of error logs to identify patterns and anomalies

These are simple apps, but useful to me. I built them to solve my own problems, and I learned a ton about where AI shines and where miserably fails. To find ideas of AI apps simply automate your daily doings, it can be work or personal life related stuff.

**This learning experience is the goal**. This will help you stay relevant on the tech scene.

## LLM APIs

Learn how to use LLM APIs. This is important. Everything is built on top of them.

The two main LLM API providers I personally use are **OpenAI API** and **Google AI Studio**.

There are multiple LLM clients and SDKs available. Experiment with them and try out features like: structured output, tool calling, streaming responses, audio, video, images, etc.

When selecting models, pay attention to those marked as _"Reasoning"_ or _"Thinking"_. They look cheaper per token, but they are actually using much more tokens for "thinking". Reasoning models usually are more expensive and slower per request.

As a rule of thumb: when you build Agents that need to make decisions you should pick reasoning models, otherwise do not chose them.

The cheapest and smartest models I'd recommend today are `GPT-4.1 mini` and `GPT-4.1 nano`. Medium-sized prompts _(10k tokens)_ cost roughly `$0.001`. Pretty much enough for learning and experimentation. Even if you accidentally spam requests, you're looking at maybe $1 wasted.

Also **use model comparison websites**, OpenAI has [one for their models](https://platform.openai.com/docs/models/compare).

Pay attention to: speed, reasoning capability, price per 1M tokens, context window, and knowledge cutoff date.

From Google models check **Gemini Flash** models. They are budget oriented, but also good.

Do not worry about model intelligence, for most tasks cheap models are enough. Only upgrade to a more powerful model if you notice it's really struggling to deliver good answers.

> I added $5 in credits to my OpenAI account and use it across all my AI apps. Even running multiple projects, my costs never exceed $1 per month.

I am saying its cheap, but it very depends on your usage intensity, how big your inputs and outputs are, and how many API calls you make. That's why **tracking your costs is crucial**. 💰

## LLM Observability

You can't be serious if you are not doing any **LLM observability**. It is essential for understanding costs, tracking requests, and debugging LLM responses.

I highly recommend you to use some tracking tools like [Langfuse](https://langfuse.com/) or [Langsmith](https://smith.langchain.com/). Both are very easy to connect.

These tools use OpenTelemetry standard to track LLM requests and will give you visibility into:

- How much you are spending on LLM requests $
- Review prompts, responses, and latency
- Understand how many tokens are used and for what

**Langfuse** is open source alternative to **Langsmith**. It's free and can be self hosted or even started locally using `docker-compose` file.

**Langsmith** is a paid tool, but it's free tier is quite generous. It's perfect if you are already using [LangChain](https://www.langchain.com/) library.

Debugging LLMs is hard, don't make it harder for yourself.

## Plan and Review

When codding with AI, you should not lose control. You don't want to be in a situation where you are stranger in your own codebase.

To avoid this, you should adopt the **"Plan -> Review -> Agent" working cycle**. This is applicable to any task done with help of AI.

Cursor supports "Plan Mode" and multiple other IDEs also do. Sometimes it's called "Spec Driven development" like in Kiro or Antigravity. But the idea remains the same.

**You first look at the plan, read it, adapt it to your needs, then proceed with code generation.**

The worst experience is when you wait for 30 seconds for Agent to finish, only to realize that's doing something weird 🤦‍♂️.

Review the plan and understand it deeply. Only after you like the plan then allow Agent to make code changes.

This means you write less code manually, significantly less. About how much to generate and how much to write yourself I can't give any tips, this is up to you to decide. In the end, whether you pressed keys to produce code or pressed keys to produce a prompt, does it even matter? The outcome is the same anyway.

**Always review generated code.** Only accept code you fully understand, like you could have written it yourself.

## TODO.md

Plans are great for single prompts, but what about tracking progress across an entire feature or session? Can we make a plan for the whole project?

To solve this issue, many developers use a `TODO.md` file to **build memory for AI agents**. This helps tracking what's done and what's still needs to be done. This file basically contains a plan saved in git.

Plan file _(or files)_ can be read by AI agents, adapted, shared with other developers and committed to the repository.

I use this approach myself, I even created a custom Cursor prompt framework that helps to generate `TODO.md` file of Jira-like tasks, with checkboxes and acceptance criteria for each task. This lets me return to projects later with full context for a new chat session. Highly recommended strategy. 🔥

To guide AI Agents even more, you can use `AGENTS.md` file. This file contains **rules that AI must follow** when doing changes. This is becoming a standard in popular IDEs (Cursor, Kiro, Antigravity).

Example `AGENTS.md` file:

```
- Always use shadcn/ui components
- Always use primary branding colors
- Never add comments to explain code
- Always use pnpm to install dependencies
```

## Python & Typescript

To build AI apps, you need to be good at either **Python** or **TypeScript**. These languages dominate the AI ecosystem. Everything AI-related is built with them and the entire tooling landscape revolves around these two.

If you haven't picked up Python or TypeScript yet, now's the time. They're going to be essential skills in 2026.

**Bonus tip:** Learn to read Python code, even if you don't write it regularly. Python is the king of AI right now 👑, and that won't change anytime soon. Being able **to understand Python** will give you a huge advantage.

## Deployment

**Start local, deploy later.** Yep, keep your apps local just for you. Use them for yourself first to solve your own problems.

In case you feel that is worth sharing with other people and you are ready to pay for hosting + LLM apis then you can think about deploying.

Remember, most of the AI apps you create are never going to make it. It's still very hard to find a good AI use case. You have to experiment a lot and build many "throw-away" apps to learn how to integrate LLMs.

Luckily, building and experimenting with AI apps is cheap now. 😉

## Final

That's it for now. I hope I could motivate you to start building AI apps in 2026.

This year is ending _(ho-ho-ho)_ and it was too much AI for us. We should all take a break and celebrate! 🥂

Wishing you a Merry Christmas and a Happy New Year! 🎄 🎅

For sure see you in 2026! 🍾
