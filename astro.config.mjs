import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://hallin.media",
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  experimental: {
    contentCollectionCache: true,
    i18n: {
      defaultLocale: "en",
      locales: ["en", "sv"],
      routingStrategy: "prefix-other-locales",
      //fallback: {
      //  sv: "en",
      //},
    },
  },
  integrations: [
    tailwind(),
    partytown(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          sv: "sv-SE",
        },
      },
    }),
    icon({
      include: {
        ph: ["*"],
      },
    }),
  ],
});
