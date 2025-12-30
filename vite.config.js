import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ✅ Build optimization
  build: {
    cssCodeSplit: true,
    minify: 'esbuild', // esbuild থেকে terser-এ change করুন
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          // Tailwind এবং DaisyUI আলাদা chunk করতে পারেন
          'ui-vendor': ['daisyui'],
        },
      },
    },
    // ✅ CSS optimization
    cssMinify: true,
    // ✅ Sourcemap production-এ বন্ধ করুন
    sourcemap: false,
  },

  // ✅ Preview server config
  preview: {
    port: 4173,
    strictPort: true,
  },

  // ✅ Development server config
  server: {
    port: 5173,
    strictPort: true,
  },
});
