import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import { remarkReadingTime } from './remark-reading-time.mjs'
import mdx from '@astrojs/mdx'
import embeds from 'astro-embed/integration'

// https://astro.build/config
export default defineConfig({
	site: 'https://hallin.media',
	prefetch: true,
	i18n: {
		defaultLocale: 'sv',
		locales: ['sv']
	},
	markdown: {
		remarkPlugins: [remarkReadingTime]
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'sv',
				locales: {
					sv: 'sv-SE'
				}
			}
		}),
		tailwind(),
		embeds(),
		mdx({
			remarkPlugins: [remarkReadingTime]
		}),
		partytown({
			config: {
				forward: ['dataLayer.push']
			}
		})
	]
})
