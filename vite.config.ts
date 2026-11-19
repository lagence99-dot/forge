import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `vite build --mode artifact` produit un bundle unique (JS + CSS + police intégrés)
// que scripts/build-artifact.mjs assemble en une page publiable comme artefact Claude.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: { port: 5173, proxy: { '/api': 'http://localhost:3001' } },
  build: mode === 'artifact'
    ? { outDir: 'dist-artifact', assetsInlineLimit: 1_000_000, cssCodeSplit: false, modulePreload: false, rollupOptions: { output: { inlineDynamicImports: true } } }
    : { assetsInlineLimit: 1_000_000 },
}));
