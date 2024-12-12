// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://hallin.media",
  trailingSlash: "ignore",
  output: "static",

  //adapter: cloudflare({
  //  platformProxy: {
  //    enabled: true,
  //  },
  //}),

  integrations: [
    tailwind(),
    partytown({
      config: {
        forward: [],
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: "sv",
        locales: {
          sv: "sv-SE",
          en: "en-GB",
        },
      },
    }),
    mdx({
      optimize: true,
    }),
  ],

  security: {
    checkOrigin: true,
  },

  build: {
    inlineStylesheets: "auto",
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  image: {
    domains: ["hallin.media"],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    gfm: true,
  },

  i18n: {
    defaultLocale: "sv",
    locales: ["sv", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
      fallbackType: "redirect",
    },
  },
});
