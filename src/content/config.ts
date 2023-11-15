import { z, defineCollection, reference } from "astro:content";

const author = defineCollection({
  type: "data",
  schema: z.object({
    fullName: z.string(),
    description: z.string().optional(),
    avatarUrl: z.string().url(),
    contact: z
      .object({
        email: z.string().email(),
        website: z.string().url(),
        linkedin: z.string().url(),
      })
      .optional(),
  }),
});

const client = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    logoUrl: z.string().url(),
    contact: z.object({
      website: z.string().url(),
      email: z.string().email().optional(),
    }),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    title: z.string(),
    excerpt: z.string(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    title: z.string(),
    excerpt: z.string(),
    authors: z.array(reference("author")),
  }),
});

const guideCollection = defineCollection({
  type: "content",
  schema: z.object({
    isDraft: z.boolean().optional(),
    title: z.string(),
    excerpt: z.string(),
    authors: z.array(reference("author")),
  }),
});

export const collections = {
  author: author,
  client: client,
  project: projectCollection,
  blog: blogCollection,
  guide: guideCollection,
};
