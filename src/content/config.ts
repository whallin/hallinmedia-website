import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		footnote: z.string(),
		language: z.enum(['sv', 'en']),
		image: z.object({
			src: z.string(),
			alt: z.string()
		}),
		publishDate: z.date()
	})
})

const workCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		language: z.enum(['sv', 'en']),
		image: z.object({
			src: z.string(),
			alt: z.string()
		}),
		publishDate: z.date()
	})
})

export const collections = {
	blog: blogCollection,
	work: workCollection
}
