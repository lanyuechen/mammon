import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

let base = '/';
if (process.env.NODE_ENV === 'production') {
  // base = '/mammon/';
  base = 'https://cdn.jsdelivr.net/gh/lanyuechen/mammon@gh-pages/';
}

// https://vitejs.dev/config/
export default defineConfig({
  base,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsDir: '',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  plugins: [react()],
})
