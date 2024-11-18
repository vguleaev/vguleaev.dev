---
title: 'My Javascript tech stack of 2024'
description: 'As this year comes to an end, I want to share the JS tech I loved using in 2024'
pubDate: 2024-11-15
image:
  url: './covers/my-js-techstack-2024.png'
  alt: 'Blog post image'
tags: ['Javascript', 'Typescript']
---

Today, I want to share with you my favorite Javascript tech stack, that I loved to use for my side projects in 2024 😍.

As this year slowly comes to an end, I've worked on two side projects: [Fitbau](https://github.com/vguleaev/fitbau) and [Planner](https://github.com/vguleaev/planner). Both are full-stack JavaScript apps.

Are you planning to start a new side project using JavaScript? Are you interested in modern tech in the JavaScript world?

If you answered **yes**, then I have something for you! Keep reading 🤓.

## Typescript

I know Javascript pretty well, so I build my side projects using it. Even if it's Javascript in the end it's actually always in **Typescript**.

There should be almost no reason to build anything new without Typescript, unless it's maybe an npm package. 🤔

Anyway, I would recommend you always use Typescript for all side projects, both frontend and backend. The tooling around it evolved so much in recent years, so you won't feel any pain adopting the tools.

There are no second thoughts. _Just use Typescript_.

## Frontend

Picking frontend framework is pretty easy for me, it's just always [React](https://react.dev/). It's quite simple and most popular, so I would recommend everyone just stick with it.

Nowadays, React alone is not enough 😆. We will need a build tool and dev server for it, here I have two options: [Nextjs](https://nextjs.org/) and [Vite](https://vite.dev/).

Both options are great in my opinion, but have a different use case.

- **Nextjs** is a solid choice when you want SSR or deploy to [Vercel](https://vercel.com/).
- **Vite** is great when you want traditional SPA or deploy to static site hosting.

**Nextjs** is more complete solution because it has Page and App router. In case of **Vite** it is simply a dev server and bundler, so you highly likely end up picking something like [TanStack Router](https://tanstack.com/router/latest) with it.

**Vercel** is key point here because its actually pretty good. It has generous free tier and very easy deployment. Allowing you to have **fullstack apps deployed for free** 💰 and never care about CI/CD setup. _Just connect git repo and push!_

If my project is a static site like blog or docs, then I will use [Astro](https://astro.build/) instead of React.

## State Management

State Management on client side was always a painful topic for me 🤕. I think I found a silver bullet for me here.

By default I assume my app has no client state and go with [React Query](https://tanstack.com/query/latest). This library is magnificent because it eliminates very common data fetching pattern like `[isLoading, data, error]` states. I am pretty sure most of the apps are doing exactly this 😅.

In case I need some client state for modals and filters I try to use `useState` hook first where its possible for local state. Otherwise if client state need to be shared between many components I will use [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction). It's a very simple state management solution without any additional configuration, just install and it just works... The best 😎!

I would generally avoid using built-in **React Context Provider** or **Redux**.

## CSS

I'll be pretty brief here, css is quite boring and time consuming to write. Since the day I discovered [Tailwind](https://tailwindcss.com/), I use it in absolutely every project I have.

For me it is just **faster way** of writing css. So I enjoy it a lot 🧡!

I was always against any CSS-in-JS solution and the only one that I like is [CSS Modules](https://github.com/css-modules/css-modules). I can use them from time to time where I can't use Tailwind.

My favorite Tailwind component libraries are: [shadcn](https://ui.shadcn.com/) and [NextUI](https://nextui.org/).

## Monorepo

For most of the projects you will highly likely have frontend and backend. I find it convenient to have both of them in one git repo.

They can be built/deployed together or separate but they are in one single repo. This allows you benefit from code sharing between frontend and backend, which is good for **Typescript interfaces sharing**. Also I simply find it easier to search and navigate since my side projects are never big.

I have all my side projects public on [Github](https://github.com/vguleaev).

## Backend

When I write backend for my apps I usually choose between two paths:

- Serverless functions
- API server

Both options are fine in my opinion, but I prefer traditional **API server** 💪. Simply because it doesn't limit me.
If I want persistent connection, I can do it. If I want to run a long running job, I can do it.
Also, there is no surprises because locally I am using same runtime as when it's deployed.

**Serverless functions** can be picked as a cheap backend, most of the providers (e.g. Netlify, Vercel) will let you run thousands of them almost for free!
Which is very cool for a side project!

But please, please.. **don't use Express!**

Just forget about [Express](https://www.youtube.com/watch?v=dQw4w9WgXcQ) framework in 2024! It has horrible support for Typescript 🤮 and there are much better options nowadays.

When I write a **REST API** in Javascript I use mostly [Hono](https://hono.dev/) or sometimes [Elysia](https://elysiajs.com/). Both of them support [Bun](https://bun.sh/) runtime so I would use Bun in most of cases. Simply for faster npm installs 😅.

Some honorable mentions on the backend side are [Zod](https://zod.dev/) and [tRPC](https://trpc.io/).

**tRPC** or any form of RPC is a fantastic idea for my side projects.
Since I'm not building a public API but rather an API for my own app, I don't need to worry about following strictly to RESTful principles.

> **Hono** also has RPC-like feature with zod built-in. More info [here](https://hono.dev/docs/guides/rpc).

Why should I care about how much RESTful my own API is? I can simply name endpoints like `/do-this-thing-for-that` and
never worry about resources, collections, or status codes 😆.

## Persistence (Database)

I generally prefer SQL databases like [PostgreSQL](https://www.postgresql.org/). It's very popular nowadays and works great.
I mostly avoid NoSQL because I use it at work, so I want to practice more with regular SQL relations in my free time.

For an **ORM in JavaScript**, I would choose [Prisma](https://www.prisma.io/) or [Drizzle](https://orm.drizzle.team/).
Both are excellent code-first ORMs with built-in database migrations and UIs.
Prisma is more popular but a bit more complex than Drizzle. Both have fantastic TypeScript support!

This year, I tried multiple database hosting services, including [Planetscale](https://planetscale.com/), [Supabase](https://supabase.com/),
and [Railway](https://railway.app/). In the end, I decided to self-host my database on my own VM.
Managed databases are often expensive, and the free tiers for databases are **really bad**.

What I realized is that for a reliable database service, **you will mostly have to pay** or self-host it. _So I chose the second._

## Authentication

Your side project will most likely have users, authentication, and registration.
I made a big mistake by creating users and saving user passwords myself, and I would never do it again 🛑.

I think implementing an authentication yourself is **very hard and time consuming** task 😫. If you never did it before, then do it.
Otherwise don't waste your time and save some hair on your head.

I can recommend several solutions I've used for user management:

- [NextAuth](https://authjs.dev/): An auth library to connect OAuth2 providers like Github and Google
- [Clerk](https://clerk.com/): A user management platform
- [Kinde](https://kinde.com/): A user management platform

For hosted options, I like **Clerk** and **Kinde**. Both have amazing free tiers and no credit card required.
They provide SDKs, React Hooks, and sometimes ready components to perform all necessary authentication actions like login, registration, checking user authentication,
and retrieving user info.

In my last project, I used **Kinde** and liked it very much.
It's free for up to 10,500 monthly active users, so it's essentially free forever for my side projects 😆.
The same goes for **Clerk**, so give it a try!

## Hosting

I tried multiple hosting services this year, maybe even too many 😃.
Specifically, I experimented with [Fly.io](https://fly.io/), [Render](https://render.com/), [Vercel](https://vercel.com/), and [DigitalOcean](https://www.digitalocean.com/).

For a Next.js app, I recommend sticking with **Vercel**.
It allows you to host both the frontend and backend for free, have https and pretty much ok domain name, and even provides a database.

The problem with most of the hosting services is that their free tiers are often only suitable for experimentation.
Basically, all apps and resources go to sleep after a period of inactivity 😴.

> I can point out **Render** for its ability to deploy an app from just a Dockerfile.

In my case, I decided to spend **$6 monthly** for a single VM on DigitalOcean and host all my projects there, including databases.
While this approach requires more setup for your Linux machine, I managed it using [Ansible](https://www.ansible.com/) and ChatGPT without much prior knowledge.

I installed an Nginx reverse proxy to route HTTPS traffic to different applications running in Docker on my VM.
To have HTTPS working I created a free certificate with [Let's Encrypt](https://letsencrypt.org/).
Since I host my projects on Github then I deiced to go with [Github Actions](https://github.com/features/actions) for CI/CD and I left pretty much satisfied with it 💪!

I also bought a single domain name and I just create a subdomain for every side project I have. Subdomains are usually free to create.

## Final

These are the tech I used for my side projects in 2024, and I highly recommend giving them a try.

What is your Javascript tech stack? Share with me and happy hacking! 😃
