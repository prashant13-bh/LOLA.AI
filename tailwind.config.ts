import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'blink-random': 'blink 4s infinite',
        'talk': 'talk 0.2s infinite',
      },
      keyframes: {
        blink: {
          '0%, 96%, 100%': { opacity: '0' },
          '98%': { opacity: '1' },
        },
        talk: {
          '0%, 100%': { height: '1rem' },
          '50%': { height: '2rem' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
