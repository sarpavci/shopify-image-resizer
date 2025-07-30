/// <reference types='vitest' />
import * as path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web',
  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      '/api': {
        target: process.env.API_URL ?? 'http://localhost:5000',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/uploads': {
        target: process.env.API_URL ?? 'http://localhost:5000',
      },
    },
  },
  preview: {
    port: 3000,
    host: 'localhost',
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
}));
