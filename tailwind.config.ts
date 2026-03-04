import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe1d2',
          300: '#ddd0b8',
          400: '#c9b494',
          500: '#b89b76',
          600: '#a68560',
          700: '#8b6d4f',
          800: '#735a44',
          900: '#5f4b3a',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e6ece6',
          200: '#cdd9ce',
          300: '#a8bea9',
          400: '#7d9e7f',
          500: '#5c8160',
          600: '#47684b',
          700: '#3a543d',
          800: '#314534',
          900: '#29392c',
        },
        warm: {
          50: '#fdfcfb',
          100: '#faf7f4',
          200: '#f5efe8',
          300: '#ede3d6',
          400: '#e0d0bc',
          800: '#3d3529',
          900: '#2a241c',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
