// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://hallin.media",
  trailingSlash: "ignore",

  redirects: {
    "/hem": "/",
    "/arbeten": "/portfolio",
    "/tjanster": "/services",
    "/anlita-mig": "/hire",
    "/home": "/en",
    "/works": "/en/portfolio",
    "/services": "/en/services",
    "/hire-me": "/en/hire",
  },

  output: "static",
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: false,
    },
  }),

  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    icon(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: "sv",
        locales: {
          en: "en-GB",
          sv: "sv-SE",
        },
      },
    }),
  ],

  compressHTML: true,
  scopedStyleStrategy: "attribute",

  security: {
    checkOrigin: true,
  },

  build: {
    inlineStylesheets: "auto",
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  image: {
    domains: ["hallin.media", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hallin.media",
      },
      {
        protocol: "https",
        hostname: "**.picsum.photos",
      },
    ],
  },

  markdown: {
    shikiConfig: {
      theme: "everforest-dark",
      wrap: true,
    },
    gfm: true,
    smartypants: true,
  },

  i18n: {
    defaultLocale: "sv",
    locales: ["en", "sv"],
    fallback: {
      en: "sv",
    },
    routing: {
      prefixDefaultLocale: false,
    },
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
