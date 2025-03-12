<div align="center">
  <img src=".github/README.png" alt="HallinMedia Banner" width="100%" />
</div>

<div align="left">
  <br />
  <h1>whallin/hallinmedia-website</h1>
  <p>The official HallinMedia website</p>
</div>

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [🏁 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🔑 Environment Variables](#-environment-variables)
- [📦 Deployment](#-deployment)
- [🔒 Security](#-security)
- [📄 License](#-license)
- [👏 Acknowledgements](#-acknowledgements)

## 🚀 Overview

A modern, high-performance website built with Astro and TailwindCSS. Features include multilingual support, dynamic blog functionality, real-time Spotify integration, and a Resend-powered contact system. The site prioritises accessibility and performance whilst maintaining a clean, responsive design.

## 🏁 Getting Started

### Prerequisites

- Node.js ≥22.0.0 or Bun ≥1.0.0
- A Resend API key for email functionality
- Git for version control

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/whallin/hallinmedia-website.git
   cd hallinmedia-website
   ```

2. Install dependencies (choose one)

   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory and add the relevant variables.

4. Start the development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

The site will be available at `http://localhost:4321`

## 🔑 Environment Variables

**Required** environment variables:

- `RESEND_API_KEY` - Your Resend API key for email forms (default: `null`)

## 📦 Deployment

The website is primarily deployed on Cloudflare Pages, taking advantage of its CDN and development capabilities. The project includes the `@astrojs/cloudflare` adapter by default.

### Build Command

```bash
npm run build
# or
bun run build
```

### Deployment Options

1. **Cloudflare Pages (Recommended)**

   - Connect your GitHub repository to Cloudflare Pages
   - Set build command: `npm run build` or `bun run build`
   - Set build output directory: `dist`
   - Add your environment variables in the Cloudflare Pages dashboard

2. **Other Platforms**
   - The site can be deployed to any static hosting platform by changing the Astro adapter in `astro.config.mjs`
   - Supported platforms include Vercel, Netlify, or any static file host
   - Refer to [Astro's deployment guides](https://docs.astro.build/en/guides/deploy/) for platform-specific instructions

## 🔒 Security

I, William Hallin, prioritise security. For more information, please see my [Security Policy](.github/SECURITY.md), which covers how to report vulnerabilities, the most recent security patches, best practices, and regulatory requirements.

## 📄 License

This project is licensed under the **GPL-3.0 License** - please see the [LICENSE](LICENSE) file for further details.

## 👏 Acknowledgements

- [Astro](https://astro.build/) - Web framework for building fast content sites
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown and JSX integration
- [Cloudflare](https://www.cloudflare.com/) - Hosting and deployment platform
- [Resend](https://resend.com/) - Email delivery service
- [Prettier](https://prettier.io/) - Code formatting and organization
- [Fontsource](https://fontsource.org/) - Self-hosted fonts
- [Iconify](https://iconify.design/) - Icon system
