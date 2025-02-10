// @ts-check
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import { execSync } from "child_process";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "hallinmedia-website";
  }
};

// https://astro.build/config
export default defineConfig({
  site: "https://hallin.media",
  trailingSlash: "ignore",

  integrations: [
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push", "_hsq.push"],
      },
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-GB",
          sv: "sv-SE",
        },
      },
      serialize(item) {
        if (item.url.includes("/clients/")) {
          item.changefreq = "monthly";
          item.priority = 0.8;
        } else if (item.url.includes("/legal/")) {
          item.changefreq = "yearly";
          item.priority = 0.5;
        } else if (item.url.includes("/portfolio/")) {
          item.changefreq = "weekly";
          item.priority = 0.9;
        } else if (item.url.includes("/blog/")) {
          item.changefreq = "daily";
          item.priority = 1.0;
        }
        return item;
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
    domains: ["hallin.media"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hallin.media",
      },
    ],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      wrap: true,
    },
    gfm: false,
    smartypants: false,
    remarkPlugins: [remarkReadingTime],
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "sv"],
    fallback: {
      sv: "en",
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
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
