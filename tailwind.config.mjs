/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Display", defaultTheme.fontFamily.serif],
        sans: ["DM Sans", defaultTheme.fontFamily.sans],
      },
      brightness: {
        25: ".25",
      },
      colors: {
        brand: {
          primary: "#FF3030",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
