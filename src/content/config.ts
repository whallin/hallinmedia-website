import { z, defineCollection } from "astro:content";

const portfolioCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      language: z.enum(["sv", "en"]),
      thumbnail: z.object({
        src: image().refine((img) => img.width === 1280 && img.height === 720),
        alt: z.string(),
      }),
      publishDate: z.date(),
      modifiedDate: z.date(),
    }),
});

export const collections = {
  portfolio: portfolioCollection,
};
