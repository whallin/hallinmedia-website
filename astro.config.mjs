// @ts-check
import { defineConfig, envField } from "astro/config";
import { execSync } from "child_process";
import packageJson from "./package.json";

//import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

const getGitHash = () => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch (error) {
    return "dev";
  }
};

// https://astro.build/config
export default defineConfig({
  site: "https://hallin.media",
  trailingSlash: "ignore",

  //adapter: cloudflare({
  //  platformProxy: {
  //    enabled: true,
  //  },
  //}),

  integrations: [
    mdx(),
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-GB",
          sv: "sv-SE",
        },
      },
    }),
    icon(),
    partytown(),
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  image: {
    domains: ["hallin.media"],
    experimentalObjectFit: "responsive",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "sv"],
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
      PACKAGE_VERSION: envField.string({
        context: "client",
        access: "public",
        default: packageJson.version,
      }),
    },
  },

  experimental: {
    responsiveImages: true,
    contentIntellisense: true,
  },
});
