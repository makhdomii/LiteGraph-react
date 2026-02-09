import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    // Ensure .js files can be imported as modules
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LightGraph',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        // Optimize chunk size warnings
        manualChunks: undefined,
      },
      // Bundle litegraph.js (it's in src/lib/)
      // Don't externalize it - we want it bundled
    },
    sourcemap: true,
    minify: 'esbuild', // Enable minification to reduce bundle size
    // Increase chunk size warning limit since we're bundling LiteGraph.js
    chunkSizeWarningLimit: 1000,
  },
});
