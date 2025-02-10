import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: {
            DEFAULT: '#050508',
            secondary: '#0A0A14',
            card: '#1A1A24'
          },
          primary: {
            DEFAULT: '#0066FF',
            hover: '#3385ff'
          },
          secondary: {
            DEFAULT: '#00C8C8',
            hover: '#00FFF5'
          }
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
