import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
"./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s 0.2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {sm: "100%", md: "100%", lg: "100%", xl: "1200px"},
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        primary: '#4F46E5',
        purple: {
          ...colors.purple,
          DEFAULT: '#6B4DE6',
        },
        red: {
          ...colors.red,
        },
        'deep-blue': '#1B2D45',
        coral: '#FF7676',
        mint: '#7DEDBA',
        light: '#FAFBFF',
      },
    },
  },
  plugins: [],
};
export default config;
