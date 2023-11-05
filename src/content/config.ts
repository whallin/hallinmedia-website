import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    lang: z.enum(["en", "sv"]),
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.date(),
    modifiedDate: z.date(),
    permalink: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
