
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cherry: "#B5122B",
        rose: "#F4A6B8",
        blush: "#FFF0F3",
        champagne: "#E8C98B",
        burgundy: "#390713",
        ivory: "#FFFBF7",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
