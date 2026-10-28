// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH } from './site.config.mjs';

// Site URL and base path are configured in ./site.config.mjs — not here.
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  // Every page is a folder with index.html, so links always end in "/".
  trailingSlash: 'always',
  build: { format: 'directory' },
  output: 'static',
  // Keep classic HTML whitespace handling (Astro 7 defaults to JSX rules).
  compressHTML: true,
  // A sitemap needs an absolute URL, so it is only generated when one is known.
  integrations: SITE_URL ? [sitemap({ filter: (page) => !page.includes('/404') })] : [],
  // Fonts are downloaded at build time and served from this site (no third-party requests).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Sans',
      cssVariable: '--font-body',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
