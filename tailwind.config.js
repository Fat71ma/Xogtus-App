/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        lightBg: '#F0FDF4',   // very light greenish background
        darkBg: '#0F172A',    // deep navy eco-dark
        lightText: '#1E293B', // slate dark text
        darkText: '#E2E8F0',  // soft light gray text
        accent: '#0284C7',    // cyan blue (eco water vibe)
        accentLight: '#67E8F9', // light aqua/cyan
        accentGreen: '#22C55E', // fresh eco green
      },
    },
  },
  plugins: [],
};
