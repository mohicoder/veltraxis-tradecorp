import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05070B',
          900: '#0A0E15',
          800: '#111824',
          700: '#182338',
          600: '#26344B',
          500: '#4A5A72',
          300: '#98A4B5',
        },
        gold: {
          200: '#EFE4C6',
          300: '#E2CC93',
          400: '#D3B572',
          500: '#C4A05A',
          600: '#A6843F',
          700: '#7C6230',
        },
        cream: {
          50: '#F6F5F2',
          100: '#EEECE7',
          200: '#E2DFD8',
          300: '#CCC7BC',
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Geist', 'system-ui', 'sans-serif'],
        // headings use the same grotesk, set tight; "accent" is the italic serif used for single words
        serif: ['"Geist Variable"', 'Geist', 'system-ui', 'sans-serif'],
        accent: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: { site: '76rem' },
    },
  },
  plugins: [],
};
export default config;
