import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans Variable", ...defaultTheme.fontFamily.sans],
        serif: ["DM Serif Text", ...defaultTheme.fontFamily.serif],
        mono: ["DM Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        live: {
          DEFAULT: "#FF3030",
          50: "#FFF1F1",
          100: "#FFE1E1",
          200: "#FFC7C7",
          300: "#FFA3A3",
          400: "#FF6B6B",
          500: "#FF3030",
          600: "#FF1111",
          700: "#E60000",
          800: "#B80000",
          900: "#8A0000",
          950: "#4D0000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
