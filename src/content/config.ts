import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedTime: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'blog': blog,
};
