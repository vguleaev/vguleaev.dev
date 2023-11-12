---
title: 'Which Tailwind library to pick for React app'
description: I know that I want to use React and Tailwind but don't want to write Javascript for components to be interactive. I had to choose some Tailwind component library!
pubDate: 2023-09-17
image:
  url: './covers/which-tailwind-library-to-pick-for-react-app.png'
  alt: 'Blog post image'
tags: ['Tailwind', 'React', 'NextJs', 'Javascript']
---

I enjoy creating my frontend projects with **Nextjs** and **React**. Also **Tailwind** is the second must have thing in my tech stack. I wanted to avoid reinventing over and over again the same basic components like Modals, Dropdowns, Selects, Tables and focus on building application logic.

One of the way to solve my problem is to pick a headless component library like [Radix](https://www.radix-ui.com/) or [React Aria](https://react-spectrum.adobe.com/react-aria/) and create styles on top of them. But maybe it's already done for me? 😃

I am pretty sure I want to use React and Tailwind but don't want to write Javascript for components to be interactive. Obviously I had to pick up some **Tailwind** component library. But there are so many of them 😨.

In this article I am going to compare the most popular Tailwind component libraries and also tell which are the best in my opinion.

Let's go! 😀

## Candidates

![Alt text](../../images/posts/tailwinds-libs-comparison.png)

Tailwind CSS libraries:

- **Flowbite**
  https://flowbite.com
- **Material Tailwind**
  https://www.material-tailwind.com
- **Preline**
  https://preline.co
- **Next UI**
  https://nextui.org
- **Wind UI**
  https://wind-ui.com
- **Daisy**
  https://daisyui.com
- **Ripple UI**
  https://www.ripple-ui.com
- **Sira UI**
  https://www.sira-design.party
- **Sailboat UI**
  https://sailboatui.com
- **Meraki UI**
  https://merakiui.com

There two things they all have in common: they all use Tailwind and they all look pretty nice 😍!

Now let's compare them one by one in order by my personal rating:

## Next UI

Top library! Looks extremely elegant and beautiful. Uses [React Aria](https://react-spectrum.adobe.com/react-aria/index.html). Accessible components. You need to import components similar to Bootstrap. Has a lot of components and they look minimal and slim, easy to override styles by just adding Tailwind utility classes to className prop.

## Material Tailwind

Overall a very good library for React, has a lot of components, reminds me of Bootstrap. You just import ready components and use them. It also looks very good. One drawback I notice, if you start to override styles it gets a little bit messy.

## Wind UI

Very interesting and good looking library. It has no npm package, it uses the default Tailwind theme. All you need to do is copy paste the components. It comes with fully ready React components that you can just copy paste into your project. Definitely deserves attention!

## Flowbite

Flowbite is one of the most stable and oldest Tailwind CSS libraries. It does not have JSX and in general can be used with any UI framework. It has interactive components (e.g. modal) but it comes with a small javascript file that you need to import for reactivity. There is a React version of Flowbite which is called Flowbite React. But I would not use it since it's still in version zero and it's not safe to use unstable libraries.

## Daisy

Good library, pure CSS, has a good amount of components, some of them done with default browser implementation (e.g native browsers Modals, Selects etc). No Javascript at all. You need to make components interactive yourself.

## Preline

Looks very nice, has no React version, no JSX copy paste components. You need to add a small javascript file for interactive components.

## Ripple UI

Looks good, no javascript at all, no JSX, installation via Tailwind config plugin.

## Sira UI

Looks decent, no javascript at all, but has JSX, installation via Tailwind config plugin.

## Sailboat UI

Looks nice, uses Alpine.js for interactivity, pure Tailwind no config or npm required.

## Meraki UI

Looks good, uses Alpine.js for interactivity, pure Tailwind no config or npm required.

## Honorable mention - shadcn

[shadcn/ui](https://ui.shadcn.com/) is a copy paste component library for React. It's built on top of [Radix UI](https://www.radix-ui.com/). It basically gives you source code for components written in React. You can just copy paste them or install via npm. Has an amazing good looking style and a good amount of components. All the components are built on top of Radix UI. Radix is a headless component, in other words functional components without styles.
Must have to try it out in my opinion!

## Conclusion

Picking a CSS framework is a hard choice. I hope I could give you a small introduction about what is available for React+Tailwind.

My advice is to check out every one of them and choose something that you like.

Enjoy! Happy hacking! 😀
