import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  root: resolve(__dirname),
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
    force: true, // Force reload on restart
  },
  resolve: {
    alias: [
      {
        find: 'litegraph-react',
        replacement: resolve(__dirname, '../dist/index.esm.js'),
      },
      {
        find: 'litegraph-react/styles',
        replacement: resolve(__dirname, '../dist/lightgraph.css'),
      },
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
    ],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['litegraph-react'],
  },
});
