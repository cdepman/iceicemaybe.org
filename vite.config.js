import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dedicated port so this app never collides with other local dev servers
    // (e.g. Next.js, which also defaults to 3000). strictPort makes a conflict
    // fail loudly instead of silently drifting to another port and leaving you
    // looking at a stale tab — the usual "HMR is broken" red herring.
    port: 5173,
    strictPort: true,
    open: true,
  },
  build: {
    // Keep `build/` so existing Netlify config keeps working.
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: false,
  },
});
