import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#08151F',
          900: '#0E2130',
          800: '#142D3E',
          700: '#1C3D53',
          600: '#285370',
          500: '#3B6C8C',
          300: '#9DB8CB',
        },
        gold: {
          200: '#F1E2AE',
          300: '#E6CC77',
          400: '#DCBB4E',
          500: '#D4AF37',
          600: '#B8922A',
          700: '#8A6B17',
        },
        cream: {
          50: '#FCFAF4',
          100: '#F6F1E4',
          200: '#ECE4CF',
          300: '#DCD0B2',
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
      },
      maxWidth: { site: '76rem' },
    },
  },
  plugins: [],
};
export default config;
