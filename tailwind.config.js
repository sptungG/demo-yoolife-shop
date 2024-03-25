/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#effaf6",
          100: "#d8f3e6",
          200: "#b4e6d1",
          300: "#82d3b7",
          400: "#4fb897",
          500: "#2a9476",
          600: "#1d7e65",
          700: "#186453",
          800: "#155042",
          900: "#124237",
          950: "#09251f",
        },
        green2: {
          50: "#f5f8ed",
          100: "#e7efd8",
          200: "#d0e1b5",
          300: "#acc981",
          400: "#95b764",
          500: "#779c46",
          600: "#5b7b35",
          700: "#475f2c",
          800: "#3b4d27",
          900: "#344225",
          950: "#192310",
        },
        green3: {
          50: "#effaf6",
          100: "#d8f3e6",
          200: "#b4e6d1",
          300: "#82d3b7",
          400: "#4fb897",
          500: "#2a9476",
          600: "#1d7e65",
          700: "#186453",
          800: "#155042",
          900: "#124237",
          950: "#09251f",
        },
      },
      keyframes: {
        gradientText: {
          "0%": {
            "background-position": "0 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0 50%",
          },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        typing: "typing 2.5s steps(20) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")({ nocompatible: true })],
};
