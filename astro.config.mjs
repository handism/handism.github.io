import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://handism.github.io',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
