import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mankancommunication.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
