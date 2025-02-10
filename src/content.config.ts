import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

// Pricing
const faqCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/faq' }),
  schema: z
    .object({
      categoryName: z.object({
        en: z.string().min(1, 'English category name is required'),
        sv: z.string().min(1, 'Swedish category name is required'),
      }),
      questions: z
        .array(
          z.object({
            featured: z.boolean().default(false),
            question: z.object({
              en: z.string().min(1, 'English question is required'),
              sv: z.string().min(1, 'Swedish question is required'),
            }),
            answer: z.object({
              en: z.string().min(1, 'English answer is required'),
              sv: z.string().min(1, 'Swedish answer is required'),
            }),
          }),
        )
        .min(1, 'At least one question is required'),
    })
    .strict(),
});

// Pricing
const pricingCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pricing' }),
  schema: z
    .object({
      categoryName: z.object({
        en: z.string().min(1, 'English category name is required'),
        sv: z.string().min(1, 'Swedish category name is required'),
      }),
      icon: z.string().min(1, 'Icon is required'),
      color: z.string(),
      services: z
        .array(
          z
            .object({
              price: z.number().positive('Price must be positive'),
              unit: z.object({
                en: z.string().min(1, 'English unit is required'),
                sv: z.string().min(1, 'Swedish unit is required'),
              }),
              name: z.object({
                en: z.string().min(1, 'English name is required'),
                sv: z.string().min(1, 'Swedish name is required'),
              }),
              description: z.object({
                en: z.string().min(1, 'English description is required'),
                sv: z.string().min(1, 'Swedish description is required'),
              }),
            })
            .strict(),
        )
        .nonempty('At least one service is required'),
    })
    .strict(),
});

// Clients
const clientsCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/clients' }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().min(1, 'Client name is required'),
        description: z.object({
          en: z.string().min(1, 'English description is required'),
          sv: z.string().min(1, 'Swedish description is required'),
        }),
        logo: image(),
        logoDark: image().optional(),
        dominantColor: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color')
          .optional(),
        websiteUrl: z.string().url('Must be a valid URL').optional(),
        socialLinks: z
          .object({
            twitter: z.string().url('Must be a valid Twitter URL').optional(),
            linkedin: z.string().url('Must be a valid LinkedIn URL').optional(),
            instagram: z.string().url('Must be a valid Instagram URL').optional(),
            facebook: z.string().url('Must be a valid Facebook URL').optional(),
          })
          .strict()
          .optional(),
        featured: z.boolean().default(false),
        subcontracted: z.boolean().default(false),
      })
      .strict(),
});

// Legal
const baseLegalSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    name: z.string(),
    icon: z.string(),
    publishedDate: z.string().datetime('Invalid date format'),
    lastEdited: z.string().datetime('Invalid date format'),
    version: z.string(),
    effectiveDate: z.string().datetime('Invalid date format'),
    jurisdiction: z.string().optional(),
    audience: z.enum(['B2B', 'B2C', 'Both']).default('Both'),
    compliance: z.array(z.string()).optional(),
    relatedDocuments: z.array(z.string()).optional(),
  })
  .strict();

const legalEnCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/legal/en' }),
  schema: baseLegalSchema.extend({
    documentType: z.enum([
      'Terms',
      'Privacy',
      'Policy',
      'Agreement',
      'Statement',
      'Notice',
      'Procedure',
      'Guidelines',
      'Other',
    ]),
  }),
});

const legalSvCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/legal/sv' }),
  schema: baseLegalSchema.extend({
    documentType: z.enum([
      'Villkor',
      'Integritet',
      'Policy',
      'Avtal',
      'Uttalande',
      'Meddelande',
      'Procedur',
      'Riktlinjer',
      'Annan',
    ]),
    audience: z.enum(['B2B', 'B2C', 'Båda']).default('Båda'),
  }),
});

// Blog
const baseBlogSchema = ({ image }: { image: any }) =>
  z
    .object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      author: z.string().min(1, 'Author is required'),
      publishedDate: z.string().datetime('Invalid date format'),
      updatedDate: z.string().datetime('Invalid date format').optional(),
      tags: z.array(z.string()).min(1, 'At least one tag is required'),
      featured: z.boolean().default(false),
      featuredImage: image(),
      featuredImageAlt: z.string().min(1, 'Image alt text is required'),
      draft: z.boolean().default(false),
      relatedPosts: z.array(z.string()).optional(),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          keywords: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .strict();

const blogEnCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/blog/en' }),
  schema: ({ image }) =>
    baseBlogSchema({ image }).extend({
      category: z.enum([
        'Design',
        'Photography',
        'Video',
        'Marketing',
        'Technology',
        'Business',
        'Tutorials',
        'Insights',
      ]),
    }),
});

const blogSvCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/blog/sv' }),
  schema: ({ image }) =>
    baseBlogSchema({ image }).extend({
      category: z.enum([
        'Design',
        'Fotografi',
        'Video',
        'Marknadsföring',
        'Teknik',
        'Företagande',
        'Guider',
        'Insikter',
      ]),
    }),
});

// Portfolio
const basePortfolioSchema = ({ image }: { image: any }) =>
  z
    .object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      type: z.enum(['case-study', 'portfolio-item']),
      featured: z.boolean().default(false),
      featuredImage: image(),
      featuredImageAlt: z.string().min(1, 'Image alt text is required'),
      client: reference('clientsCollection'),
      date: z.string().datetime('Invalid date format'),
      tags: z.array(z.string()).min(1, 'At least one tag is required'),
      content: z
        .object({
          problem: z.string().optional(),
          solution: z.string().optional(),
          process: z.string().optional(),
          results: z.string().optional(),
          images: z.array(image()).optional(),
          videos: z.array(z.string().url()).optional(),
        })
        .optional(),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url(),
          }),
        )
        .optional(),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          keywords: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .strict();

const portfolioEnCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/portfolio/en' }),
  schema: ({ image }) =>
    basePortfolioSchema({ image }).extend({
      category: z.enum([
        'Web Design',
        'Graphic Design',
        'Photography',
        'Video Production',
        'Branding',
        'Marketing',
        'E-commerce',
        'Other',
      ]),
    }),
});

const portfolioSvCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/portfolio/sv' }),
  schema: ({ image }) =>
    basePortfolioSchema({ image }).extend({
      category: z.enum([
        'Webbdesign',
        'Grafisk Design',
        'Fotografi',
        'Videoproduktion',
        'Varumärkesbyggande',
        'Marknadsföring',
        'E-handel',
        'Annat',
      ]),
      content: z
        .object({
          problem: z.string().optional(),
          lösning: z.string().optional(),
          process: z.string().optional(),
          resultat: z.string().optional(),
          bilder: z.array(image()).optional(),
          videor: z.array(z.string().url()).optional(),
        })
        .optional(),
      links: z
        .array(
          z.object({
            etikett: z.string(),
            url: z.string().url(),
          }),
        )
        .optional(),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          nyckelord: z.array(z.string()).optional(),
        })
        .optional(),
    }),
});

export const collections = {
  faqCollection,
  pricingCollection,
  clientsCollection,
  legalEnCollection,
  legalSvCollection,
  blogEnCollection,
  blogSvCollection,
  portfolioEnCollection,
  portfolioSvCollection,
};
