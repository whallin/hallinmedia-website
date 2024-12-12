import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const portfolioCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/portfolio" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      language: z.enum(["sv", "en"]),
      thumbnail: z.object({
        src: image(),
        alt: z.string(),
      }),
      publishDate: z.date(),
      modifiedDate: z.date(),
    }),
});

export const collections = {
  portfolio: portfolioCollection,
};
