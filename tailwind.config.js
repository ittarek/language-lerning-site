/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      // Custom fonts
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        poppins: ['Poppins', 'sans-serif'],
      },

      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },

      // Custom colors (optional)
      colors: {
        // Brand Primary Colors
        brand: {
          primary: '#6366f1', // indigo-500
          'primary-dark': '#4f46e5', // indigo-600
          'primary-darker': '#4338ca', // indigo-700
          secondary: '#a855f7', // purple-500
          'secondary-dark': '#9333ea', // purple-600
          'secondary-darker': '#7e22ce', // purple-700
        },
      },
      backgroundImage: {
        // Button Gradients
        'gradient-primary': 'linear-gradient(to right, #6366f1, #a855f7)',
        'gradient-primary-hover': 'linear-gradient(to right, #4338ca, #7e22ce)',

        // Section Header Gradients
        'gradient-hero': 'linear-gradient(to bottom right, #020617, #64748B, #831843)',

        'gradient-dark': 'linear-gradient(135deg, #1f2937, #4c1d95)',

        // Card Gradients
        'gradient-card': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      },
    },
  },

  // plugins: [require('daisyui')],

  daisyui: {
    themes: ['light'], // ✅ শুধু একটা theme (smaller bundle)
    darkTheme: 'light',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
};

/**
 * ========================================
 * 📝 NOTES & TIPS
 * ========================================
 *
 * 1. JIT Mode:
 *    - JIT mode is now DEFAULT in Tailwind v3+
 *    - No need to specify `mode: 'jit'`
 *    - Automatically enabled
 *
 * 2. Content Paths:
 *    - Only './src/**' needed (simpler)
 *    - './components/**' and './pages/**'
 *      already covered by './src/**'
 *
 * 3. DaisyUI Themes:
 *    - Use only 1 theme for smallest bundle
 *    - Each theme adds ~15-20 KB
 *    - 'light' theme: ~60 KB
 *    - 'light' + 'dark': ~80 KB
 *
 * 4. Custom Animations:
 *    - Use instead of external libraries
 *    - Much smaller bundle size
 *    - Better performance
 *
 * 5. Font Loading:
 *    - Load fonts in index.html or CSS
 *    - Use font-display: swap
 *
 * ========================================
 * 🎨 USAGE EXAMPLES
 * ========================================
 *
 * Animations:
 * <div className="animate-fade-in-up">Content</div>
 * <div className="animate-slide-in-left">Content</div>
 *
 * Custom Colors:
 * <div className="bg-primary-500 text-primary-50">Content</div>
 *
 * Fonts:
 * <h1 className="font-poppins">Heading</h1>
 * <p className="font-sans">Body text</p>
 */
