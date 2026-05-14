import { defineConfig } from 'vite';

/** GitHub Project Pages: `https://<kullanıcı>.github.io/<depo>/` — derleme CI’da `GITHUB_REPOSITORY` ile otomatik */
const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const base = repo ? `/${repo}/` : './';

export default defineConfig({
  base,
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ['phaser'],
  },
});
