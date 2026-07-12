import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Worker URL. In dev it's localhost:8787 (wrangler).
// In prod, set VITE_API_BASE to your *.workers.dev / custom domain.
export default defineConfig({
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
