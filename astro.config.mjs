import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://brianjin.eu',
  base: '/',
  output: 'static',
  build: {
    assets: '_astro'
  }
});
