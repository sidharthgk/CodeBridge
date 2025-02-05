/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#1A1A1A',
          surface: '#2D2D2D',
          divider: '#404040',
        },
        accent: {
          primary: '#FFD700',
          secondary: '#FFDF50',
          highlight: '#FFF3B0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};