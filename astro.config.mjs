import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mankancommunication.com',
  trailingSlash: 'always',
  // Garde les espaces entre texte et balises (ex. « des <em>films</em> et »).
  compressHTML: false,
  integrations: [sitemap()],
});
