/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        burgundy: {
          50: '#FDF2F3',
          100: '#FBE7EA',
          200: '#F6CCDB',
          300: '#EFA2BF',
          400: '#E8749A',
          500: '#DD4577',
          600: '#CA2260',
          700: '#AB1651',
          800: '#8B1538', // Main burgundy
          900: '#741436',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        cream: {
          50: '#F5F1E8',
          100: '#EDE5D3',
          200: '#DDD0B0',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};