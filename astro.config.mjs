// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { execSync } from "child_process";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "local";
  }
};

// https://astro.build/config
export default defineConfig({
  site: "https://hallin.media",
  trailingSlash: "ignore",

  output: "static",
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push", "_hsq.push"],
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
      GIT_HASH: envField.string({
        context: "client",
        access: "public",
        default: getGitHash(),
      }),
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
