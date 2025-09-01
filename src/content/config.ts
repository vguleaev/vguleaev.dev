import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
    }),
});

const books = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string(),
      finishedDate: z.date(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { blog, books };
