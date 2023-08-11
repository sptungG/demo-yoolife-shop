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
          250: "#F1F2F8", // nen o trang homepage
          350: "#878A9C", // nen chu trang homepage
          450: "#78B7EE", // mau chu trang shopping
          460: "#FDCBCB", // am thuc noi bat shopping search
          470: "#CBEBFB", // san pham de xuat shopping search
          480: "#D5FDCB", // thiet bi thong minh shopping search
          490: "#E7CBFD", // set qua tang noi bat shopping search
          150: "#707386",
          160: "#B0DAFF", // background button shoppin search result
          1500: "#A1C4FD", //linear flashsale1
          1600: "#C2E9FB", //linear flashsale1
          1700: "#F6D365", //linear flashsale2
          1800: "#FDA085", //linear flashsale2
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
      width: {
        128: "360px",
        192: "420px",
        256: "480px",
        512: "520px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")({ nocompatible: true })],
};
