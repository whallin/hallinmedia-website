import { OGImageRoute } from "astro-og-canvas";

const content = import.meta.glob(`/src/content/**/*.md`, { eager: true });

const pages = Object.entries(content).reduce(
  (acc, [path, page]) => ({ ...acc, [path.replace(`/src/content`, "")]: page }),
  {},
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (path, page) => ({
    title: page.frontmatter.title,
    description: page.frontmatter.excerpt,
    padding: 64,
    logo: {
      path: "./public/logomark-white.png",
      size: [256],
    },
    font: {
      title: {
        color: [250, 250, 249],
        size: 48,
        weight: "Bold",
        families: ["DM Sans"],
      },
      description: {
        color: [250, 250, 249],
        size: 24,
        weight: "Normal",
        families: ["DM Sans"],
      },
    },
    bgGradient: [
      [69, 10, 10],
      [12, 10, 9],
    ],
    border: {
      color: [220, 38, 38],
      width: 12,
      sides: ["left"],
    },
    fonts: [
      "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-700-normal.woff2",
      "https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-400-normal.woff2",
    ],
  }),
});
