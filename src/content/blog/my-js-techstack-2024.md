---
title: 'My Javascript tech stack of 2024'
description: 'This year is about to end and I want to share which JS tech I loved to use in 2024'
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

There should be almost no reason to build anything new without Typescript. Unless its maybe an npm package. 🤔

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

I would be pretty short here, css is quite boring and time consuming to write. Since the day I discovered [Tailwind](https://tailwindcss.com/), I use it in absolutely every project I have.

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

Both options are fine in my opinion but I prefer traditional **API server** 💪. Simply because it doesnt limit me. If i want persistent connection, I can do it. If I want to run a long running job, I can do it. Also there is no surprises because locally I am using same runtime as when it's deployed.

**Serverless functions** can be picked as a cheap backend, most of the providers will let you run thousands of them almost for free! Which is very cool for a side project!

But please, please.. **don't use Express!**

Just forget about [Express](https://www.youtube.com/watch?v=dQw4w9WgXcQ) framework in 2024! It has horrible support for Typescript 🤮 and there are much better options nowadays.

When I write a **REST api in Nodejs** I use: [Hono](https://hono.dev/) or [Elysia](https://elysiajs.com/). Both of them support [Bun](https://bun.sh/) runtime so I would use **Bun** in most of cases. Simply for faster npm installs 😅.

**Bun** has quite good compatibility with Nodejs, so most of the packages work fine and it even has `sleep()` built-in function 😍!

Some honorable tech on backend side are [zod](https://zod.dev/) and [tRPC](https://trpc.io/).

**zod** is a schema validation library that allows type inference. It is perfect for DTO types and it's validation. And since we know the gold rule of always validate on frontend and backend, this exactly helps you with it and code sharing.

**tRPC** or any form of RPC is just fantastic idea for my side projects. I am not building a public API but just an API for my app. So why would I ever care how much RESTfull it is? I can just name things like `/do-this-thing-for-that-user` and don't think a second about resources, collections and status codes 😆.

My API should be simple and easy!

## Persistance (Database)

TBD

## Hosting

TBD

## Final

This list provides several **lightweight design patterns** that should help you simplify everyday coding tasks and keep the code clean and readable 😍.

Do you think the list is not complete? Please reach me out so I can add more patterns to the list!

Happy hacking! 😃
