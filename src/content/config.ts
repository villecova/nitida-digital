import { defineCollection, z } from 'astro:content';

const testimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
});

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
    galleryMobile: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    serviceCategories: z
      .array(z.enum(['web', 'branding', 'digital']))
      .default([]),
    problem: z.string().optional(),
    solution: z.string().optional(),
    deliverables: z.array(z.string()).optional(),
    outcome: z.string().optional(),
    role: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    visible: z.boolean().default(true),
    order: z.number().optional(),
    testimonial: testimonialSchema.optional(),
  }),
});

export const collections = {
  work: workCollection,
};
