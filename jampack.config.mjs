export default {
  html: {
    sort_attributes: true,
  },
  js: {
    compressor: "swc",
  },
  css: {
    inline_critical_css: true,
  },
  image: {
    external: {
      process: "off",
    },
    cdn: {
      process: "optimize",
    },
    compress: true,
    jpeg: {
      options: {
        quality: 75,
        mozjpeg: true,
      },
    },
    png: {
      options: {
        compressionLevel: 9,
      },
    },
    webp: {
      options_lossless: {
        effort: 4,
        quality: 90,
        mode: "lossless",
      },
      options_lossly: {
        effort: 4,
        quality: 75,
        mode: "lossly",
      },
    },
    svg: {
      optimization: true,
      add_width_and_height: false,
    },
  },
  iframe: {
    lazyload: {
      when: "below-the-fold",
      how: "native",
    },
  },
  video: {
    autoplay_lazyload: {
      when: "below-the-fold",
      how: "js",
    },
  },
  misc: {
    prefetch_links: "off",
  },
};
