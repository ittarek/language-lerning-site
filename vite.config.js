import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/language-center-bedfd\.web\.app\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 300, // 5 minutes
              },
            },
          },
        ],
      },
    }),
    react(),
    // ✅ Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // ✅ Brotli compression (better than gzip)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],

  build: {
    // Code splitting
    cssCodeSplit: true,
    minify: 'esbuild',

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion'],
          // Query library
          'query-vendor': ['@tanstack/react-query'],

          // Icons (if you use a lot)
          'icon-vendor': ['react-icons'],

          // Firebase (if used)
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },

        // Asset file names
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },

        // JS file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // CSS minification
    cssMinify: true,

    // Source maps (disable for production)
    sourcemap: false,

    // esbuild options
    esbuild: {
      // Remove console and debugger in production
      drop: ['console', 'debugger'],

      // Pure function calls (won't be called if result not used)
      pure: ['console.log', 'console.debug', 'console.info', 'console.warn'],

      // Minify identifiers
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },

    // Target modern browsers for smaller bundles
    target: 'esnext',

    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },

  // Development server
  server: {
    port: 5173,
    strictPort: true,
    // host: true, // Listen on all addresses
    // open: true, // Auto-open browser
  },

  // Preview server (for testing production build)
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    exclude: ['@firebase/app'],
  },
});

/**
 * ========================================
 * 🧹 CACHE CLEAR COMMANDS
 * ========================================
 *
 * Windows PowerShell:
 * -------------------
 * Remove-Item -Recurse -Force dist
 * Remove-Item -Recurse -Force node_modules\.vite
 * Remove-Item -Recurse -Force node_modules\.cache
 *
 * OR short form:
 * rd -r -force dist
 * rd -r -force node_modules\.vite
 *
 *
 * Linux/Mac:
 * ----------
 * rm -rf dist
 * rm -rf node_modules/.vite
 * rm -rf node_modules/.cache
 *
 *
 * ========================================
 * 📦 BUILD COMMANDS
 * ========================================
 *
 * Clean install:
 * npm install
 *
 * Development:
 * npm run dev
 *
 * Production build:
 * npm run build
 *
 * Preview production:
 * npm run preview
 *
 * Build + Preview:
 * npm run build && npm run preview
 *
 *
 * ========================================
 * 🔍 ANALYZE BUNDLE SIZE
 * ========================================
 *
 * Install:
 * npm install -D rollup-plugin-visualizer
 *
 * Add to plugins array:
 * import { visualizer } from 'rollup-plugin-visualizer';
 *
 * plugins: [
 *   react(),
 *   visualizer({
 *     open: true,
 *     gzipSize: true,
 *     brotliSize: true,
 *   })
 * ],
 *
 *
 * ========================================
 * ⚡ PERFORMANCE TIPS
 * ========================================
 *
 * 1. Lazy load routes:
 *    const Home = lazy(() => import('./pages/Home'));
 *
 * 2. Code split by route:
 *    Use React.lazy() for page components
 *
 * 3. Optimize images:
 *    - Use WebP format
 *    - Compress before upload
 *    - Use appropriate sizes
 *
 * 4. Dynamic imports:
 *    const module = await import('./module');
 *
 * 5. Remove unused dependencies:
 *    npm uninstall <package-name>
 */
