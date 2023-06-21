/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f0f5ff",
          200: "#c3d3f7",
          300: "#94abeb",
          400: "#6884de",
          500: "#415ed1",
          600: "#1d39c4",
          700: "#10239e",
          800: "#061178",
          900: "#000552",
          1000: "#00012b",
          50: "#339FD9",
          150: "#707386",
          
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        rippleClick: {
          from: { transform: "scale(0)", opacity: 1.2 },
          to: { transform: "scale(1.1)", opacity: 0 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")({ nocompatible: true })],
};
