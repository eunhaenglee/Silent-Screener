// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#8c4df7",
          DEFAULT: "#7b3fe4",
          dark: "#662dc1",
        },
        secondary: {
          light: "#fd89ff",
          DEFAULT: "#fc67fa",
          dark: "#d44bd3",
        },
        bg: "#0d0d14",
        cardBg: "rgba(255,255,255,0.05)",
        cardBorder: "rgba(255,255,255,0.15)",
        text: "#e0e0e0",
        textMuted: "#a0a0a0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
