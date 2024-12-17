import { file, glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

const services = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    icon: z.string(), // Icon name
    featured: z.boolean().default(false),
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    description: z.object({
      en: z.string(),
      sv: z.string(),
    }),
    logo: z.string(), // Path to logo image
    logoDark: z.string().optional(), // Path to dark logo image
    websiteUrl: z.string().url().optional(),
    socialLinks: z
      .object({
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        instagram: z.string().url().optional(),
        facebook: z.string().url().optional(),
      })
      .optional(),
    featured: z.boolean().default(false),
    subcontracted: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(), // Path to thumbnail image
    featured: z.boolean().default(false),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    clients: z.array(reference('clients')),
    services: z.array(reference('services')),
  }),
});

const stockPhotosCategory = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/stock-photos/category' }),
  schema: z.object({
    name: z.object({
      en: z.string(),
      sv: z.string(),
    }),
    description: z.object({
      en: z.string(),
      sv: z.string(),
    }),
  }),
});

const stockPhotoTags = defineCollection({
  loader: file('./src/content/tags.json', { parser: text => JSON.parse(text).stockPhotos }),
  schema: z.object({
    name: z.string(),
  }),
});

const stockPhotos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/stock-photos' }),
  schema: z.object({
    name: z.object({
      en: z.string(),
      sv: z.string(),
    }),
    description: z.object({
      en: z.string(),
      sv: z.string(),
    }),
    previewUrl: z.string(), // Small, watermarked version stored in repo
    r2Key: z.string(), // Original file key in R2
    fileDetails: z.object({
      size: z.number(),
      width: z.number(),
      height: z.number(),
    }),
    price: z.object({
      sek: z.number(),
      eur: z.number(),
    }),
    currency: z.enum(['SEK', 'EUR']).default('SEK'),
    categories: z.array(reference('stockPhotosCategory')),
    tags: z.array(reference('stockPhotoTags')),
    license: z.enum(['standard', 'extended', 'exclusive']),
    publishDate: z.date(),
    available: z.boolean().default(true),
  }),
});

const blogTags = defineCollection({
  loader: file('./src/content/tags.json', { parser: text => JSON.parse(text).blog }),
  schema: z.object({
    name: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(), // Path to thumbnail image
    featured: z.boolean().default(false),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(reference('blogTags')),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    purpose: z.string(),
    icon: z.string(), // Icon name
    publishDate: z.date(),
    updatedDate: z.date().optional(),
  }),
});

export const collections = {
  services,
  clients,
  portfolio,
  stockPhotosCategory,
  stockPhotoTags,
  stockPhotos,
  blogTags,
  blog,
  legal,
};
