import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A1A1A',
          light: '#FFFFFF',
          accent: '#1FB4B4',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)'],
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
