import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
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
