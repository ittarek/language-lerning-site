/** @type {import('tailwindcss').Config} */
export default {
  // Enable JIT mode for better performance
  mode: 'jit',

  // Purge unused CSS in production
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    // DaisyUI কম্পোনেন্টগুলোকে সেফলিস্টে রাখুন
    options: {
      safelist: [
        // DaisyUI থিম ক্লাস
        'light',
        'dark',
        'cupcake',
        'corporate',
        // DaisyUI কম্পোনেন্ট ক্লাস (প্রয়োজন হলে)
        'btn',
        'btn-primary',
        'btn-secondary',
        'modal',
        'modal-box',
        'modal-action',
        // অ্যানিমেশন এবং ট্রানজিশন
        /data-theme$/,
        /^theme-/,
      ],
    },
  },

  // Your existing content array (keep this too)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Poppins',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: ['light', 'dark', ],
    darkTheme: 'light', // default light
    // DaisyUI-এর base, component এবং utilities স্টাইলগুলো include করুন
    styled: true,
    base: true,
    utils: true,
    logs: false, // production-এ লগ বন্ধ করুন
    rtl: false,
    prefix: '',
    darkTheme: 'light',
  },
};
