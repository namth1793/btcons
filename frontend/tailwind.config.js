/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C41230',
          dark: '#9E0E26',
          light: '#E8213F',
        },
        dark: '#1A1A1A',
        charcoal: '#2D2D2D',
        'mid-gray': '#6B7280',
        'light-gray': '#F5F5F5',
      },
      fontFamily: {
        heading: ['"Roboto Condensed"', 'sans-serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
