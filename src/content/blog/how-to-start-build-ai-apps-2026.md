---
title: 'How to start building AI apps in 2026'
description: 'Getting started with AI apps and LLM APIs in 2026, a guide for Senior Engineers'
pubDate: 2025-12-26
image:
  url: './covers/how-to-start-build-ai-apps-2026.png'
  alt: 'Blog post image'
tags: ['LLM', 'AI', 'Software Design']
---

Let me guess, you are software engineer who thinks the industry is changing rapidly with all this AI tooling.

You want to stay relevant so you think you should practice building AI apps and learn how to work with LLM apis.

**You are probably right. I agree with you,** the shift happened and there is no way this getting rolled back. Next year is going to be the perfect time to start building AI apps.

Don't know where to start from? Which tools to use? Which models to choose? Which app ideas to build?

Don't worry! I've got you covered. 😄

This post is a helping hand for those developers who were unwillingly thrown into the ocean of AI and feeling lost or even frustrated. Let's ride the wave together! 🌊

## Agentic Coding (IDEs)

Funny to say, but to start building AI apps you should use AI 😅.

Specifically you should use AI agents inside your favorite IDE to help you generate code faster. That's probably not new to you and you already use them.

There are plenty of IDEs that support coding agents: **VS Code, Windsurf, Cursor, Kiro, Antigravity** and many more.

Of course you will need some subscription to use AI inside IDE because it's never free. However many have generous free tiers.

My personal recommendations are: **Cursor** and **Antigravity**.

> At the time of writing this article Antigravity is free because its Public Review, this gives you a lot of prompts for free. Use it. Google AI Pro also has 1 month free trial.

Many developers say that some CLI tools like **Codex CLI, Claude Code** are also great. Unfortunately, I haven't tried them yet and I simply prefer staying in full IDE instead of terminal coding.

Why [using AI to build AI](https://www.youtube.com/watch?v=-P-ein58laA) is important? Going fast is important. Your focus should be on learning how to integrate AI into standard web applications, not struggling with project setup and tooling.

And let's be honest: agentic coding is likely the future of development anyway. Practicing it more is never wrong.

## AI generated UI

Don't get me wrong, I like very good looking UI but I hate building it. It's always time consuming to build something that looks modern and beautiful _(for me at least)_.

I found a solution to this problem. I will let AI build the UI for me.

**Prefer to use AI to build user interfaces**. Do not lose time on building frontend from scratch, automate it. Nowadays AI can build very decent UI, which is more than enough for your learning project. This will save you a lot of time and frustration.

For a regular web app, my recommendation is always [React](https://react.dev/) with [shadcn/ui](https://ui.shadcn.com/).

These two together are incredibly popular in our community, and AI works perfectly with them. **Shadcn UI** limits the AI to use only its component library, which guarantees consistency across colors, theming, and UI elements. All you need to do is pick a branding color and add a logo svg. Boom... Done! 💣

Use popular vibe codding tools to find inspiration for your UI, examples: [Vercel v0](https://v0.dev/) and [Lovable](https://lovable.dev/). Both of them use shadcn ui components by default.

## Where to use AI?

This is the most challenging question and something that we should all figure out together. How to use AI responsibly? Where does it genuinely add value, and where is it unnecessary?

From my experience, unless you're building a chatbot, you'll likely end up with a mix of standard web app with AI features. That's the most common pattern right now.

But how do you identify which parts of your app can actually benefit from AI? That's where your PM mindset comes in 🧠.

I understand, it is indeed hard to come up with **AI feature that is somehow useful**. But here are my recommendations:

**LLMs produce non-deterministic output**. Every response is different. So build features where slight variations or minor errors are acceptable. This typically means text-based features: summaries, content generation, reports, analysis anything where perfection isn't critical.

Don't try to offload your entire app's business logic to AI and let it make all the decisions. You'll probably fail most of the time. I realized that AI is too random to give it full control, old plain "if" conditions still do job better and much more secure.

That said, I don't want to discourage you to try implementing [agentic architectures](https://en.wikipedia.org/wiki/Agent_architecture). You should give it a chance, just for me personally I was drowning in infinite attempts of fighting randomness and debugging hell.

Here are some AI apps I built for myself just to give you a couple of examples:

- **AI code review bot:** reads pull request diffs and leaves code review comments
- **AI text beautifier:** transforms poorly written English into polished, professional text with correct grammar
- **AI pull request summarizer:** reads Jira issues and GitLab PRs to create ticket summaries
- **AI error log miner:** analyzes 7 days of error logs to identify patterns and anomalies

These are simple apps, but they're useful at least to me. I built them to solve my own problems, and I learned a ton about where AI shines and where miserably fails. To find ideas of AI apps simply automate your daily doings, it can be work or personal life related stuff.

**This learning experience is the goal**. This will help you stay relevant in the tech scene.

## LLM APIs

Learn how to use LLM APIs. This is important. Everything is built on top of them.

The two main LLM API providers I personally use are **OpenAI API** and **Google AI Studio**.

There are multiple LLM clients and SDKs available. Experiment with them and try out features like: structured output, tool calling, streaming responses, audio, video, images, etc.

When selecting models pay attention to models which marked as _"Reasoning"_ or _"Thinking"_. Even if their price per token can look cheaper, they are actually using much more tokens for "thinking". Reasoning models usually are more expensive per request and slower.

As a rule of thumb: when you build Agents that need to make decisions you should pick reasoning models, otherwise do not chose them.

The cheapest and smartest models I'd recommend today are `GPT-4.1 mini` and `GPT-4.1 nano`. Medium-sized prompts _(10k tokens)_ cost roughly `$0.001`. Pretty much enough for learning and experimentation. Even if you accidentally spam requests, you're looking at maybe $1 wasted.

**Use model comparison websites**, OpenAI has [one for their models](https://platform.openai.com/docs/models/compare).

Pay attention to: speed, reasoning capability, price per 1M tokens, context window, and knowledge cutoff date.

From Google models check **Gemini Flash** models. They are budget oriented, but also good.

Do not worry about model intelligence, for most tasks cheap models are enough. Only upgrade to a more powerful model if you notice it's really struggling to deliver good answers.

> I added $5 in credits to my OpenAI account and use it across all my AI apps. Even running multiple projects, my costs never exceed $1 per month.

I am saying its cheap, but it depends on your usage intensity how big your inputs and outputs are, and how many API calls you make. That's why **tracking your costs is crucial**. 💰

## LLM Observability

You are not serious if you are not doing any **LLM observability**. It is essential for understanding costs, tracking requests, and debugging LLM responses.

I highly recommend you to use some tracking tools like [Langfuse](https://langfuse.com/) or [Langsmith](https://smith.langchain.com/). Both are very easy to connect.

These tools use OpenTelemetry standard to track LLM requests and will give you visibility into:

- How much you are spending on LLM requests $
- Review prompts, responses, and latency
- Understand how many tokens are used and for what

**Langfuse** is open source alternative to **Langsmith**. It's free and can be self hosted or even started locally using `docker-compose` file.

**Langsmith** is a paid tool, but it's free tier is quite generous. It's perfect if you are using [LangChain](https://www.langchain.com/) library already.

## TODO.md

When codding with AI, you should not lose control. You don't want to be in a situation where you are stranger in your own code.

To avoid this, you should **adopt the "Plan -> Review -> Agent" working cycle**. This is applicable to any task done with help of AI.

Cursor supports "Plan mode" and multiple other IDEs also do. Sometimes it's called spec driven development like in Kiro or Antigravity. But the idea remains the same.

**You first look at the plan, read it, adapt plan, then proceed with code generation.**

The worst is when you wait for 30 seconds for Agent to finish to realize that's not doing what you wanted. 🤦‍♂️

Always review the plan and understand it deeply. Only after you like the plan then allow Agent to make changes.

This means you write less code manually, well significantly less. About how much to generate and how much to write yourself I can't give any tips, this is up to you to decide. In the end if you typed keystrokes to produce code or you typed keystrokes to produce prompt, does it even matter? Outcome anyway is the same.

Only accept generated code you fully understand. Code that looks like you could have written it yourself. So **you must read it**.

_Plans are great, but IDEs currently only support them for a single prompt. You can't have a plan for a session or even for a single feature out of the box._

To solve this issue, many developers are using something like `TODO.md` file **to build memory for AI Agents** of what was done and what still needs to be done. This file basically contains a plan or a to do list.

There is no standard format or way how to create and share plans. I personally use `TODO.md` file.

I even created my own Cursor prompt framework that helps me to build agent memory of Jira-like items in `TODO.md` file. This allows me to comeback latter and continue building so new chat sessions has a memory of everything that was done and still needs to be done. This helps a lot while building side projects. Highly recommended strategy. 🔥

To guide AI Agents even more, you can use `AGENTS.md` file. This file contains a **list of rules that AI must follow** when doing changes. This file is an emerging standard in the AI community, most popular IDEs support it (Cursor, Kiro, Antigravity).

An example of an `AGENTS.md` file:

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

**Never deploy**. Yep, keep your apps local just for you. Use them for yourself first locally to solve your own problems.

In case you feel that is worth sharing with other people and you are ready to pay for hosting + LLM apis then you can think about deploying.

Remember that most of the AI apps you create are never going to make it, it's still very hard to find a good AI use case, you have to experiment a lot and build many throw-away apps to learn how to integrate AI. Luckily it's cheap now to build those 😉

## Final

This year is ending soon _(ho-ho-ho)_ and it was too much AI for us. We should all take a break and celebrate! 🥂

Wishing you a Merry Christmas and a Happy New Year! 🎄 🎅

For sure see you in 2026! 🍾
