import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
	site: 'https://hallin.media',
	prefetch: true,
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'sv'],
		fallback: {
			sv: 'en'
		}
	},
	integrations: [
		compress(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
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
