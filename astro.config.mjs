import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import { remarkReadingTime } from './remark-reading-time.mjs'

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
		compress(),
		sitemap({
			i18n: {
				defaultLocale: 'sv',
				locales: {
					sv: 'sv-SE'
				}
			}
		}),
		tailwind(),
		partytown({
			config: {
				forward: ['dataLayer.push']
			}
		})
	]
})
