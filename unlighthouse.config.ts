/// <reference types="unlighthouse" />
import { defineConfig } from 'unlighthouse'

export default defineConfig({
	debug: true,
	scanner: {
		samples: 3
	},
	puppeteerClusterOptions: {
		maxConcurrency: 1
	}
})
