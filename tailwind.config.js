/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#797dfa',
          600: '#5d5fdb',
          700: '#4a4bb8',
          800: '#3d3d94',
          900: '#172d9d',
          950: '#1e1e4a',
        },
        secondary: {
          50: '#f0fdff',
          100: '#ccf7ff',
          200: '#99eeff',
          300: '#66e0ff',
          400: '#33cdf5',
          500: '#37c9ee',
          600: '#1ba1c4',
          700: '#147d9a',
          800: '#0f5a70',
          900: '#0a3747',
          950: '#051a23',
        },
        accent: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#8191ff',
          500: '#797dfa',
          600: '#5d5fdb',
          700: '#4a4bb8',
          800: '#3d3d94',
          900: '#172d9d',
          950: '#1e1e4a',
        }
      }
    },
  },
  plugins: [],
};