// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string(),
    description: z.string(),
    tech: z.array(z.string()).optional(),
  }),
});

export const collections = {
  work,
};
