import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    client: z.string(),
    scope: z.string(),
    image: z.string(),
    logoBg: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    url: z.string().url().optional(),
  }),
});


export const collections = {
  work: workCollection,
};
