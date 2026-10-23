import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A1A1A',
          light: '#FFFFFF',
          accent: '#1FB4B4',
        },
        cream: { DEFAULT: '#FBF7EF', 100: '#FDFBF6', 200: '#F6EEDD', 300: '#EADBBE' },
        sky: {
          50: '#F2F8FD', 100: '#E3F0FB', 200: '#C8E2F6', 300: '#9FCBEE',
          400: '#6FAFE2', 500: '#4A93D1', 600: '#3477B4', 700: '#2B5F8F',
        },
        ink: { DEFAULT: '#0F1B2D', 700: '#22324A', 500: '#4A5A72', 400: '#6B7A90' },
      },
      borderRadius: {
        card: '30px',
        modal: '26px',
        chip: '14px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(15,27,45,0.18)',
        lift: '0 24px 48px -20px rgba(15,27,45,0.28)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
        roboto: ['var(--font-roboto)'],
      },
      transitionTimingFunction: {
        'ease-custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'luxury': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      letterSpacing: {
        widest: '0.2em',
        luxury: '0.3em',
      }
    },
  },
  plugins: [],
};
export default config;
