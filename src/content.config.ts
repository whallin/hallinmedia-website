import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

// FAQ
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
      order: z.number().int().min(0).default(0),
      services: z
        .array(
          z.object({
            name: z.object({
              en: z.string().min(1, 'English name is required'),
              sv: z.string().min(1, 'Swedish name is required'),
            }),
            sku: z.string().min(1, 'SKU is required'),
            taxCode: z.string().min(1, 'Stripe tax code is required'),
            description: z.object({
              en: z.string().min(1, 'English description is required'),
              sv: z.string().min(1, 'Swedish description is required'),
            }),
            basePrice: z.number().positive('Price must be positive'),
            unit: z.object({
              en: z.string().min(1, 'English unit is required'),
              sv: z.string().min(1, 'Swedish unit is required'),
            }),
            note: z
              .object({
                en: z.string().optional(),
                sv: z.string().optional(),
              })
              .optional(),
            options: z
              .array(
                z.object({
                  name: z.object({
                    en: z.string().min(1),
                    sv: z.string().min(1),
                  }),
                  sku: z.string().min(1, 'SKU is required'),
                  price: z.number().positive(),
                  unit: z
                    .object({
                      en: z.string().min(1),
                      sv: z.string().min(1),
                    })
                    .optional(),
                }),
              )
              .optional(),
            addons: z
              .array(
                z.object({
                  name: z.object({
                    en: z.string().min(1),
                    sv: z.string().min(1),
                  }),
                  sku: z.string().min(1, 'SKU is required'),
                  taxCode: z.string().min(1, 'Stripe tax code is required'),
                  description: z.object({
                    en: z.string().min(1, 'English description is required'),
                    sv: z.string().min(1, 'Swedish description is required'),
                  }),
                  price: z.number().positive(),
                  unit: z
                    .object({
                      en: z.string().min(1),
                      sv: z.string().min(1),
                    })
                    .optional(),
                  optional: z.boolean().default(true),
                }),
              )
              .optional(),
            bulkDiscounts: z
              .array(
                z.object({
                  threshold: z.number().int().positive('Threshold must be positive'),
                  discount: z.number().min(0).max(100),
                  description: z.object({
                    en: z.string().min(1, 'English description is required'),
                    sv: z.string().min(1, 'Swedish description is required'),
                  }),
                }),
              )
              .optional(),
          }),
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
        avatar: image(),
        logo: image(),
        logoDark: image().optional(),
        dominantColor: z.object({
          light: z
            .string()
            .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
          dark: z
            .string()
            .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color')
            .optional(),
        }),
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
        testimonial: z
          .object({
            quote: z.object({
              en: z.string().min(1, 'English quote is required'),
              sv: z.string().min(1, 'Swedish quote is required'),
            }),
            author: z.object({
              avatar: image().optional(),
              name: z.string().min(1, 'Author name is required'),
              title: z.object({
                en: z.string().min(1, 'English title is required'),
                sv: z.string().min(1, 'Swedish title is required'),
              }),
            }),
            featured: z.boolean().default(false),
          })
          .optional(),
      })
      .strict(),
});

// Services
const servicesCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services' }),
  schema: z
    .object({
      serviceName: z.object({
        en: z.string().min(1, 'English service name is required'),
        sv: z.string().min(1, 'Swedish service name is required'),
      }),
      shortDescription: z.object({
        en: z.string().min(1, 'English short description is required'),
        sv: z.string().min(1, 'Swedish short description is required'),
      }),
      longDescription: z.object({
        en: z.string().min(1, 'English detailed description is required'),
        sv: z.string().min(1, 'Swedish detailed description is required'),
      }),
      icon: z.string().min(1, 'Icon identifier is required'),
      color: z.string().min(1, 'Must be a valid Tailwind color name'),
      pricing: z
        .object({
          startingFrom: z.number().positive('Starting price must be positive').optional(),
          unit: z.object({
            en: z.enum([
              'hour',
              'project',
              'month',
              'unit',
              'word',
              'template',
              'session',
              'image',
              'page',
              'article',
            ]),
            sv: z.enum([
              'timme',
              'projekt',
              'månad',
              'enhet',
              'ord',
              'mall',
              'session',
              'bild',
              'sida',
              'artikel',
            ]),
          }),
          note: z
            .object({
              en: z.string().optional(),
              sv: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      keyFeatures: z
        .array(
          z.object({
            title: z.object({
              en: z.string().min(1),
              sv: z.string().min(1),
            }),
            description: z
              .object({
                en: z.string().optional(),
                sv: z.string().optional(),
              })
              .optional(),
            icon: z.string().optional(),
          }),
        )
        .min(1, 'At least one key feature required'),
      processSteps: z
        .array(
          z.object({
            title: z.object({
              en: z.string().min(1),
              sv: z.string().min(1),
            }),
            description: z.object({
              en: z.string(),
              sv: z.string(),
            }),
          }),
        )
        .optional(),
      cta: z
        .object({
          en: z.string().min(1, 'English CTA is required').max(120),
          sv: z.string().min(1, 'Swedish CTA is required').max(120),
        })
        .optional(),
      relatedServices: z.array(reference('servicesCollection')).optional(),
      featuredClients: z.array(reference('clientsCollection')).optional(),
      featured: z.boolean().default(false),
      seo: z
        .object({
          en: z
            .object({
              title: z.string().optional(),
              description: z.string().optional(),
              keywords: z.array(z.string()).optional(),
            })
            .optional(),
          sv: z
            .object({
              title: z.string().optional(),
              description: z.string().optional(),
              keywords: z.array(z.string()).optional(),
            })
            .optional(),
        })
        .optional(),
      cities: z
        .array(
          z.object({
            name: z.object({
              en: z.string().min(1, 'English city name is required'),
              sv: z.string().min(1, 'Swedish city name is required'),
            }),
            slug: z
              .string()
              .min(1, 'City slug is required')
              .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
            localSeo: z.object({
              en: z.object({
                title: z.string().min(1, 'English SEO title is required'),
                description: z.string().min(1, 'English SEO description is required'),
                keywords: z.array(z.string()).min(1, 'At least one keyword required'),
              }),
              sv: z.object({
                title: z.string().min(1, 'Swedish SEO title is required'),
                description: z.string().min(1, 'Swedish SEO description is required'),
                keywords: z.array(z.string()).min(1, 'At least one keyword required'),
              }),
            }),
            localContent: z.object({
              en: z.object({
                heading: z.string().min(1, 'English heading is required'),
                intro: z.string().min(1, 'English intro is required'),
                specificBenefits: z.array(z.string()).min(3, 'List 3+ local benefits'),
              }),
              sv: z.object({
                heading: z.string().min(1, 'Swedish heading is required'),
                intro: z.string().min(1, 'Swedish intro is required'),
                specificBenefits: z.array(z.string()).min(3, 'List 3+ local benefits'),
              }),
            }),
          }),
        )
        .optional(),
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
    audience: z.enum(['B2B', 'B2C', 'All']).default('All'),
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
    audience: z.enum(['B2B', 'B2C', 'Alla']).default('Alla'),
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
  servicesCollection,
};
