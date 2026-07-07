import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'tactil-plitka-installation-guide';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : './',
  build: {
    emptyOutDir: process.env.VITE_KEEP_DIST !== 'true',
  },
});
