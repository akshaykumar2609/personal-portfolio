import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Load env from the repo root, where .env lives. Vite's default envDir is the
// frontend package dir, so without this the VITE_* vars are never picked up.
const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

// The Worker URL. In dev it's localhost:8787 (wrangler).
// In prod, set VITE_API_BASE to your *.workers.dev / custom domain.
export default defineConfig({
  envDir: repoRoot,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Optional convenience: `fetch('/api/...')` in dev proxies to the Worker.
      '/api': {
        target: process.env.VITE_API_BASE || 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true, // needed for Sentry source maps
  },
});
